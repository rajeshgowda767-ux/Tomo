#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const childProcess = require('child_process');

const root = process.argv[2] || path.resolve(__dirname, '..');
const outDir = process.argv[3] || root;
const outputJson = path.join(outDir, 'release-audit.json');
const outputMarkdown = path.join(outDir, 'release-audit.md');

const weights = {
  images: 15,
  collections: 15,
  intelligencePlatform: 15,
  pantryIntelligence: 20,
  recipeAuthoring: 15,
  pairings: 10,
  metadata: 10,
};

function norm(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function list(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  if (value && typeof value === 'object') return Object.values(value).flatMap(list);
  return [];
}

function loadWindowFile(relativePath, property) {
  const fullPath = path.join(root, relativePath);
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(fullPath, 'utf8'), context, { filename: fullPath });
  return context.window[property] || [];
}

function readJson(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch {
    return null;
  }
}

function run(command, args) {
  const result = childProcess.spawnSync(command, args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return { ok: result.status === 0, stdout: result.stdout || '', stderr: result.stderr || '', status: result.status };
}

function activeRecipes() {
  return loadWindowFile('frontend/local-recipes.js', 'COOKBUDDY_LOCAL_RECIPES')
    .filter((recipe) => norm(recipe.recipeType || recipe.recipe_type || 'core') === 'core');
}

function title(recipe) {
  return recipe.title || recipe.name || 'Untitled recipe';
}

function issue(severity, area, message, recommendation) {
  return { severity, area, message, recommendation };
}

function status(failures, warnings) {
  if (failures > 0) return 'FAIL';
  if (warnings > 0) return 'WARNING';
  return 'PASS';
}

function result(key, label, score, statusValue, failures, warnings, reportPath, issues, details = {}) {
  return {
    key,
    label,
    score: score === null ? null : Math.max(0, Math.min(100, Math.round(Number(score) || 0))),
    status: statusValue,
    failures: Number(failures || 0),
    warnings: Number(warnings || 0),
    reportPath: reportPath || '',
    issues: issues || [],
    details,
  };
}

function notRun(key, label, reason) {
  return result(key, label, null, 'NOT RUN', 0, 0, '', [issue('WARNING', label, reason, 'Add or restore this audit when the surface is ready.')], { reason });
}

function imageExists(imageUrl) {
  const value = String(imageUrl || '').trim().split('?')[0].replace(/^\//, '');
  return value ? fs.existsSync(path.join(root, 'frontend', value)) : false;
}

function placeholder(imageUrl) {
  return /placeholder|default|home-bowl|common-kitchen/i.test(String(imageUrl || ''));
}

function auditImages(recipes) {
  const broken = recipes.filter((recipe) => recipe.imageUrl && !imageExists(recipe.imageUrl));
  const missing = recipes.filter((recipe) => !recipe.imageUrl);
  const placeholders = recipes.filter((recipe) => placeholder(recipe.imageUrl));
  const failures = broken.length;
  const warnings = missing.length + placeholders.length;
  return result(
    'images',
    'Images',
    100 - failures * 2.5 - warnings * 0.4,
    status(failures, warnings),
    failures,
    warnings,
    '',
    [
      ...broken.slice(0, 60).map((recipe) => issue('FAIL', 'Images', `${title(recipe)} has a broken image path.`, 'Fix or replace the image path.')),
      ...missing.slice(0, 60).map((recipe) => issue('WARNING', 'Images', `${title(recipe)} has no image.`, 'Add a dish image.')),
      ...placeholders.slice(0, 60).map((recipe) => issue('WARNING', 'Images', `${title(recipe)} still uses placeholder imagery.`, 'Replace placeholder imagery.')),
    ],
    { activeRecipes: recipes.length, brokenImages: broken.length, missingImages: missing.length, placeholderImages: placeholders.length }
  );
}

function issuesFrom(area, report, failures, warnings) {
  if (Array.isArray(report?.issues) && report.issues.length) {
    return report.issues.map((item) => issue(item.severity || 'WARNING', item.area || area, item.message || item.finding || JSON.stringify(item), item.recommendation || 'Review the audit report.'));
  }
  const output = [];
  if (failures) output.push(issue('FAIL', area, `${failures} failure(s) reported.`, 'Review the audit report.'));
  if (warnings) output.push(issue('WARNING', area, `${warnings} warning(s) reported.`, 'Review the audit report.'));
  return output;
}

function auditCollections() {
  if (!fs.existsSync(path.join(root, 'scripts/collections-integrity-audit.js'))) return notRun('collections', 'Collections', 'Collections audit script not found.');
  run('npm', ['run', 'audit:collections']);
  const report = readJson('collections-integrity-audit.json');
  if (!report) return notRun('collections', 'Collections', 'Collections audit report not generated.');
  const failures = Number(report.summary?.failCount || 0);
  const warnings = Number(report.summary?.warningCount || 0);
  const score = report.overallScore ?? report.collectionsIntegrityScore ?? report.score ?? 0;
  return result('collections', 'Collections', score, failures ? 'FAIL' : warnings ? 'WARNING' : 'PASS', failures, warnings, 'collections-integrity-audit.md', issuesFrom('Collections', report, failures, warnings), report.summary || {});
}

function auditKnowledge() {
  if (!fs.existsSync(path.join(root, 'scripts/knowledge-coverage-audit.js'))) return notRun('knowledge', 'Knowledge', 'Knowledge audit script not found.');
  run('npm', ['run', 'audit:knowledge']);
  const report = readJson('knowledge-coverage-audit.json');
  if (!report) return notRun('knowledge', 'Knowledge', 'Knowledge audit report not generated.');
  const failures = Number(report.summary?.failCount || 0);
  const warnings = Number(report.summary?.warningCount || 0);
  return result('knowledge', 'Knowledge', report.knowledgeScore || 0, report.status || status(failures, warnings), failures, warnings, 'knowledge-coverage-audit.md', issuesFrom('Knowledge', report, failures, warnings), report.summary || {});
}

function intelligenceContentGaps(report) {
  if (Array.isArray(report?.contentGaps)) return report.contentGaps;
  if (Array.isArray(report?.futureCatalogOpportunities)) return report.futureCatalogOpportunities;
  if (Array.isArray(report?.systems)) {
    return report.systems
      .filter((system) => Number(system.contentGaps || 0) > 0)
      .map((system) => ({
        area: system.name,
        count: Number(system.contentGaps || 0),
        recommendation: 'Treat as future recipe or catalog expansion opportunity.',
      }));
  }
  return [];
}

function auditIntelligencePlatform() {
  if (!fs.existsSync(path.join(root, 'scripts/unified-intelligence-audit.js'))) {
    return notRun('intelligencePlatform', 'Intelligence Platform', 'Unified intelligence audit script not found.');
  }
  run('npm', ['run', 'audit:intelligence']);
  const report = readJson('intelligence-audit.json');
  if (!report) return notRun('intelligencePlatform', 'Intelligence Platform', 'Unified intelligence audit report not generated.');

  const summary = report.summary || {};
  const failures = Number(summary.failures || summary.failCount || report.failures || 0);
  const warnings = Number(summary.warnings || summary.warningCount || report.warnings || 0);
  const score = report.overallIntelligenceScore ?? report.overallScore ?? report.score ?? 0;
  const contentGaps = intelligenceContentGaps(report);
  const systemsNotRun = Array.isArray(report.systemsNotRun) ? report.systemsNotRun : [];
  const statusValue = failures
    ? 'FAIL'
    : warnings || systemsNotRun.length
      ? 'WARNING'
      : 'PASS';

  const issues = [
    ...systemsNotRun.map((system) => issue('WARNING', 'Intelligence Platform', `${system.name || 'An intelligence system'} was not run.`, system.reason || 'Restore this audit command.')),
    ...issuesFrom('Intelligence Platform', report, failures, warnings).filter((item) => item.severity === 'FAIL' || item.severity === 'WARNING'),
  ];

  return result(
    'intelligencePlatform',
    'Intelligence Platform',
    score,
    statusValue,
    failures,
    warnings + systemsNotRun.length,
    'intelligence-audit.md',
    issues,
    {
      status: report.status,
      summary,
      systems: report.systems || [],
      systemsNotRun,
      contentGaps,
      contentGapCount: Number(summary.contentGaps || contentGaps.reduce((total, item) => total + Number(item.count || 1), 0)),
      legacyKnowledge: readJson('knowledge-coverage-audit.json'),
    }
  );
}

function auditPantryV3() {
  if (!fs.existsSync(path.join(root, 'scripts/pantry-intelligence-v3-audit.js'))) return notRun('pantryIntelligence', 'Pantry Intelligence', 'Pantry Intelligence V3 audit script not found.');
  run('npm', ['run', 'audit:pantry:v3']);
  const report = readJson('pantry-intelligence-v3-audit.json');
  if (!report) return notRun('pantryIntelligence', 'Pantry Intelligence', 'Pantry Intelligence V3 report not generated.');
  const failures = report.status === 'FAIL' ? Math.max(1, Number(report.summary?.warningCount || 0)) : 0;
  const warnings = report.status === 'WARNING' ? Number(report.summary?.warningCount || 1) : 0;
  const issues = (report.scenarios || [])
    .filter((scenario) => scenario.status !== 'PASS')
    .map((scenario) => issue(scenario.status === 'FAIL' ? 'FAIL' : 'WARNING', 'Pantry Intelligence', `${scenario.name} scenario is ${scenario.status}.`, 'Review scenario ranking and bridge use.'));
  return result('pantryIntelligence', 'Pantry Intelligence', report.pantryIntelligenceScore || 0, report.status || status(failures, warnings), failures, warnings, 'pantry-intelligence-v3-audit.md', issues, report.summary || {});
}

function auditAuthoring(recipes) {
  const summary = readJson('recipe-authoring-summary.json');
  const missing = recipes.filter((recipe) => !list(recipe.instructions).filter(Boolean).length);
  const exactlyFive = recipes.filter((recipe) => list(recipe.instructions).filter(Boolean).length === 5);
  const warningCount = exactlyFive.length > recipes.length * 0.45 ? 1 : 0;
  return result('recipeAuthoring', 'Recipe Authoring', 100 - missing.length * 4 - warningCount * 4, status(missing.length, warningCount), missing.length, warningCount, fs.existsSync(path.join(root, 'recipe-authoring-summary.md')) ? 'recipe-authoring-summary.md' : '', [
    ...missing.map((recipe) => issue('FAIL', 'Recipe Authoring', `${title(recipe)} has no instructions.`, 'Add cooking instructions.')),
    ...(warningCount ? [issue('WARNING', 'Recipe Authoring', `${exactlyFive.length} recipes are exactly five steps.`, 'Continue improving natural instruction variation.')] : []),
  ], { summary, missingInstructions: missing.length, exactlyFiveStepRecipes: exactlyFive.length });
}

function pairings(recipe) {
  return list(recipe.pairings).map(norm).filter(Boolean);
}

function hasPairings(recipe) {
  return pairings(recipe).length > 0;
}

function auditPairings(recipes) {
  const missing = recipes.filter((recipe) => !hasPairings(recipe));
  const duplicate = recipes.filter((recipe) => {
    const values = pairings(recipe);
    return values.length !== new Set(values).size;
  });
  const warnings = missing.length + duplicate.length;
  return result('pairings', 'Pairings', 100 - missing.length * 0.35 - duplicate.length * 1.5, warnings ? 'WARNING' : 'PASS', 0, warnings, '', [
    ...missing.slice(0, 60).map((recipe) => issue('WARNING', 'Pairings', `${title(recipe)} has no pairings.`, 'Add contextual pairings.')),
    ...duplicate.slice(0, 60).map((recipe) => issue('WARNING', 'Pairings', `${title(recipe)} has duplicate pairings.`, 'Deduplicate pairings.')),
  ], { recipesWithPairings: recipes.length - missing.length, missingPairings: missing.length, duplicatePairingRecipes: duplicate.length });
}

function hasValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === 'object') return Object.keys(value).length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
}

function auditMetadata(recipes) {
  let external = null;
  if (fs.existsSync(path.join(root, 'scripts/audit_recipe_metadata_quality.mjs'))) {
    const runResult = run('node', ['scripts/audit_recipe_metadata_quality.mjs']);
    try { external = JSON.parse(runResult.stdout); } catch { external = null; }
  }
  const report = readJson('database/generated/reports/recipe_metadata_quality_audit.json');
  if (report?.metadataIntegrityScore !== undefined) {
    const integrityIssues = Number(report.summary?.metadataIntegrityIssues || report.metadataIntegrityIssues?.length || 0);
    const editorialWarnings = Number(report.summary?.editorialMetadataWarnings || report.editorialMetadataWarnings?.length || 0);
    return result(
      'metadata',
      'Metadata',
      report.metadataIntegrityScore,
      integrityIssues ? 'FAIL' : editorialWarnings ? 'WARNING' : 'PASS',
      integrityIssues,
      editorialWarnings,
      'database/generated/reports/recipe_metadata_quality_audit.json',
      [
        ...(report.metadataIntegrityIssues || []).slice(0, 80).map((item) => issue('FAIL', 'Metadata Integrity', `${item.recipeName} has ${item.issueType}: ${item.details}`, item.suggestion || 'Fix objective metadata.')),
        ...(editorialWarnings ? [issue('WARNING', 'Editorial Metadata', `${editorialWarnings} editorial metadata warning(s) remain.`, 'Review subjective scores separately; do not block integrity freeze.')] : []),
      ],
      {
        metadataIntegrityScore: report.metadataIntegrityScore,
        editorialMetadataScore: report.editorialMetadataScore,
        metadataIntegrityIssues: integrityIssues,
        editorialMetadataWarnings: editorialWarnings,
        integrityCounts: report.summary?.integrityCounts || {},
        editorialCounts: report.summary?.editorialCounts || {},
        external,
      }
    );
  }

  const required = ['id', 'sourceId', 'title', 'description', 'dietType', 'mealTags', 'moodTags', 'dishFamily', 'ingredients'];
  const missing = [];
  recipes.forEach((recipe) => required.forEach((field) => {
    if (!hasValue(recipe[field])) missing.push({ recipe, field });
  }));
  const warnings = Number(external?.issues || 0);
  return result('metadata', 'Metadata', 100 - missing.length * 0.8 - warnings * 0.3, status(missing.length, warnings), missing.length, warnings, external?.json ? path.relative(root, external.json) : '', [
    ...missing.slice(0, 80).map((item) => issue('FAIL', 'Metadata', `${title(item.recipe)} is missing ${item.field}.`, 'Complete required metadata.')),
    ...(warnings ? [issue('WARNING', 'Metadata', `${warnings} metadata quality issue(s) found.`, 'Review metadata quality audit.')] : []),
  ], { missingRequiredFields: missing.length, externalMetadataIssues: warnings, external });
}

function weightedScore(audits) {
  let total = 0;
  let weighted = 0;
  for (const [key, weight] of Object.entries(weights)) {
    if (!audits[key] || audits[key].score === null) continue;
    total += weight;
    weighted += audits[key].score * weight;
  }
  return total ? Math.round(weighted / total) : 0;
}

function overallStatus(score, audits) {
  const available = Object.values(audits).filter((audit) => audit.status !== 'NOT RUN');
  if (available.some((audit) => audit.status === 'FAIL' || audit.failures > 0) || score < 80) return 'NOT READY';
  if (available.some((audit) => audit.status === 'WARNING' || audit.warnings > 0) || score < 95) return 'READY WITH WARNINGS';
  return 'READY';
}

function allIssues(audits, severity) {
  return Object.values(audits).flatMap((audit) => audit.issues.map((item) => ({ audit: audit.label, ...item }))).filter((item) => item.severity === severity);
}

function checklist(audits) {
  return [
    { item: 'No broken images', ok: audits.images.failures === 0 },
    { item: 'No orphan recipes', ok: audits.collections.failures === 0 },
    { item: 'Pantry bridges pass', ok: audits.pantryIntelligence.status === 'PASS' },
    { item: 'Intelligence platform locked', ok: audits.intelligencePlatform.status === 'PASS' && audits.intelligencePlatform.score === 100 },
    { item: 'Recipe instructions complete', ok: audits.recipeAuthoring.failures === 0 },
    { item: 'Collections structurally valid', ok: audits.collections.failures === 0 },
    { item: 'Recommendation engine validated', ok: audits.pantryIntelligence.status === 'PASS' },
    { item: 'Metadata validated', ok: audits.metadata.status !== 'NOT RUN' && audits.metadata.failures === 0 },
  ];
}

function futureCatalogOpportunities(audits) {
  const gaps = audits.intelligencePlatform?.details?.contentGaps || [];
  if (!gaps.length) return [];
  return gaps.map((gap) => {
    if (typeof gap === 'string') return gap;
    const area = gap.area || gap.name || gap.system || 'Intelligence Platform';
    const count = gap.count ? `${gap.count} ` : '';
    return `${area}: ${count}content gap${gap.count === 1 ? '' : 's'} for future catalog expansion.`;
  });
}

function nextActions(audits) {
  return [...new Set(Object.values(audits).filter((audit) => audit.status !== 'PASS').map((audit) => {
    if (audit.status === 'NOT RUN') return `Restore ${audit.label} audit coverage.`;
    return `${audit.label}: ${(audit.issues[0] && audit.issues[0].recommendation) || 'Review audit findings.'}`;
  }))];
}

function dots(label, score) {
  const name = `${label} `;
  return `${name}${'.'.repeat(Math.max(1, 25 - name.length))} ${score === null ? 'NOT RUN' : score}`;
}

function render(report) {
  const a = report.audits;
  const fails = allIssues(a, 'FAIL');
  const warnings = allIssues(a, 'WARNING');
  const opportunities = report.futureCatalogOpportunities || [];
  return `================================================

TOMO RELEASE READINESS REPORT

================================================

Generated: ${report.generatedAt}

Recipe Catalog
- Active recipes: ${report.catalog.activeRecipes}
- Images: ${a.images.status}
- Collections: ${a.collections.status}
- Intelligence Platform: ${a.intelligencePlatform.status}
- Pantry Intelligence: ${a.pantryIntelligence.status}
- Recipe Authoring: ${a.recipeAuthoring.status}
- Pairings: ${a.pairings.status}
- Metadata: ${a.metadata.status}

------------------------------------------------

Quality Scores

${dots('Images', a.images.score)}

${dots('Collections', a.collections.score)}

${dots('Intelligence Platform', a.intelligencePlatform.score)}

${dots('Pantry Intelligence', a.pantryIntelligence.score)}

${dots('Recipe Authoring', a.recipeAuthoring.score)}

${dots('Pairings', a.pairings.score)}

${dots('Metadata Integrity', a.metadata.details?.metadataIntegrityScore ?? a.metadata.score)}

${dots('Editorial Metadata', a.metadata.details?.editorialMetadataScore ?? 'NOT RUN')}

------------------------------------------------

Overall Release Score

${report.overallScore} / 100

Status

${report.overallStatus}

------------------------------------------------

Outstanding Issues

FAIL

${fails.length ? fails.map((item) => `- [${item.audit}] ${item.message} Recommendation: ${item.recommendation}`).join('\n') : '- None'}

WARNING

${warnings.length ? warnings.map((item) => `- [${item.audit}] ${item.message} Recommendation: ${item.recommendation}`).join('\n') : '- None'}

------------------------------------------------

Future Catalog Opportunities

${opportunities.length ? opportunities.map((item) => `- ${item}`).join('\n') : '- None'}

------------------------------------------------

Release Checklist

${report.releaseChecklist.map((item) => `${item.ok ? '✓' : '✗'} ${item.item}`).join('\n\n')}

------------------------------------------------

Recommended Next Actions

${report.recommendedNextActions.length ? report.recommendedNextActions.map((item) => `- ${item}`).join('\n') : '- None. Release checks are clean.'}

================================================
`;
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const recipes = activeRecipes();
  const audits = {
    images: auditImages(recipes),
    collections: auditCollections(),
    intelligencePlatform: auditIntelligencePlatform(),
    pantryIntelligence: auditPantryV3(),
    recipeAuthoring: auditAuthoring(recipes),
    pairings: auditPairings(recipes),
    metadata: auditMetadata(recipes),
  };
  const legacyKnowledge = auditKnowledge();
  const overallScore = weightedScore(audits);
  const report = {
    generatedAt: new Date().toISOString(),
    targetRoot: root,
    catalog: { activeRecipes: recipes.length },
    weights,
    audits,
    legacyKnowledge,
    overallScore,
    overallStatus: overallStatus(overallScore, audits),
    releaseChecklist: checklist(audits),
    recommendedNextActions: nextActions(audits),
    futureCatalogOpportunities: futureCatalogOpportunities(audits),
  };
  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMarkdown, render(report));
  console.log(`Overall Release Score: ${report.overallScore}/100`);
  console.log(`Overall Status: ${report.overallStatus}`);
  Object.values(audits).forEach((audit) => {
    console.log(`${audit.label}: ${audit.score === null ? 'NOT RUN' : `${audit.score}/100`} (${audit.status}) failures=${audit.failures} warnings=${audit.warnings}`);
  });
  console.log(`Wrote ${outputMarkdown}`);
  console.log(`Wrote ${outputJson}`);
}

main();
