const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const baselinePath = path.join(root, 'validation', 'beta-2-recipe-baseline.json');
const recipesPath = path.join(root, 'database', 'generated', 'recipes.json');
const reportJsonPath = path.join(root, 'validation', 'recipe-validation-report.json');
const reportMarkdownPath = path.join(root, 'validation', 'recipe-validation-report.md');
const { COLLECTIONS_BY_HUB } = require('./generate_collection_home.js');

const STATUS_RANK = { PASS: 0, WARNING: 1, FAIL: 2 };

const metricDefinitions = [
  { key: 'recipeCount', label: 'Recipe count', blocker: true, kind: 'count' },
  { key: 'uniqueIds', label: 'Unique IDs', blocker: true, kind: 'identity' },
  { key: 'uniqueSourceIds', label: 'Unique source IDs', blocker: true, kind: 'identity' },
  { key: 'imageCoverage', label: 'Image coverage', blocker: true, kind: 'coverage' },
  { key: 'quickGuideCoverage', label: 'Quick Guide coverage', blocker: true, kind: 'coverage' },
  { key: 'pairingCoverage', label: 'Pairing coverage', blocker: true, kind: 'coverage' },
  { key: 'dietaryTagCoverage', label: 'Dietary tag coverage', blocker: false, kind: 'coverage' },
  { key: 'mealTagCoverage', label: 'Meal tag coverage', blocker: false, kind: 'coverage' },
  { key: 'moodTagCoverage', label: 'Mood tag coverage', blocker: false, kind: 'coverage' },
  { key: 'moodTagNonEmptyCoverage', label: 'Non-empty mood tag coverage', blocker: false, kind: 'coverage' },
  { key: 'regionTagCoverage', label: 'Region tag coverage', blocker: false, kind: 'coverage' },
  { key: 'aliasCoverage', label: 'Alias field coverage', blocker: false, kind: 'coverage' },
  { key: 'aliasNonEmptyCoverage', label: 'Non-empty alias coverage', blocker: false, kind: 'coverage' },
  { key: 'recipeTypeCoverage', label: 'Recipe type coverage', blocker: false, kind: 'coverage' },
  { key: 'dishFamilyCoverage', label: 'Dish family coverage', blocker: false, kind: 'coverage' },
  { key: 'schemaFieldCount', label: 'Schema field count', blocker: true, kind: 'schema' },
];

function collectionHomeDiagnostics(recipes) {
  const allowedHubs = new Set(Object.keys(COLLECTIONS_BY_HUB));
  const collectionCounts = {};
  const missing = [];
  const invalid = [];
  const withSubcollection = [];
  let collectionHomeCount = 0;

  recipes.forEach((recipe, index) => {
    const label = recipe.title || recipe.name || recipe.id || `recipe at index ${index}`;
    const home = recipe.collectionHome;
    if (!home || typeof home !== 'object' || Array.isArray(home)) {
      missing.push(label);
      return;
    }

    collectionHomeCount += 1;
    if (Object.hasOwn(home, 'subcollection')) {
      withSubcollection.push(label);
    }

    const allowedCollections = COLLECTIONS_BY_HUB[home.hub];
    if (!allowedHubs.has(home.hub)) {
      invalid.push(`${label}: unknown hub "${home.hub}"`);
      return;
    }
    if (!allowedCollections.includes(home.collection)) {
      invalid.push(`${label}: collection "${home.collection}" is not allowed under "${home.hub}"`);
      return;
    }

    const key = `${home.hub} > ${home.collection}`;
    collectionCounts[key] = (collectionCounts[key] || 0) + 1;
  });

  const sizeWarnings = Object.entries(collectionCounts)
    .filter(([, count]) => count < 8 || count > 60)
    .map(([collection, count]) => ({
      collection,
      count,
      reason: count < 8 ? 'fewer than 8 recipes' : 'more than 60 recipes',
    }));

  return {
    collectionHomeCount,
    collectionCounts: Object.fromEntries(
      Object.entries(collectionCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    ),
    missing,
    invalid,
    withSubcollection,
    sizeWarnings,
  };
}

function collectionHomeChecks(recipes) {
  const diagnostics = collectionHomeDiagnostics(recipes);
  const checks = [
    {
      metric: 'collectionHomeCoverage',
      label: 'Collection home coverage',
      baseline: recipes.length,
      current: diagnostics.collectionHomeCount,
      delta: diagnostics.collectionHomeCount - recipes.length,
      releaseBlocker: true,
      status: diagnostics.collectionHomeCount === recipes.length ? 'PASS' : 'FAIL',
      message: diagnostics.collectionHomeCount === recipes.length
        ? 'Every recipe has a collectionHome.'
        : `${recipes.length - diagnostics.collectionHomeCount} recipes are missing collectionHome.`,
    },
    {
      metric: 'collectionHomeValidity',
      label: 'Collection home hub/collection validity',
      baseline: 0,
      current: diagnostics.invalid.length,
      delta: diagnostics.invalid.length,
      releaseBlocker: true,
      status: diagnostics.invalid.length === 0 ? 'PASS' : 'FAIL',
      message: diagnostics.invalid.length === 0
        ? 'All collectionHome values use frozen hubs and allowed collections.'
        : `${diagnostics.invalid.length} recipes have invalid hub/collection values.`,
    },
    {
      metric: 'collectionHomeNoSubcollection',
      label: 'No stored collection subcollection',
      baseline: 0,
      current: diagnostics.withSubcollection.length,
      delta: diagnostics.withSubcollection.length,
      releaseBlocker: true,
      status: diagnostics.withSubcollection.length === 0 ? 'PASS' : 'FAIL',
      message: diagnostics.withSubcollection.length === 0
        ? 'No recipe stores collectionHome.subcollection.'
        : `${diagnostics.withSubcollection.length} recipes store collectionHome.subcollection.`,
    },
  ];

  return { checks, diagnostics };
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required ${label}: ${path.relative(root, filePath)}`);
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Could not parse ${label} ${path.relative(root, filePath)}: ${error.message}`);
  }
}

function hasField(recipes, field) {
  return recipes.filter((recipe) => Object.hasOwn(recipe, field)).length;
}

function hasNonEmptyField(recipes, field) {
  return recipes.filter((recipe) => {
    if (!Object.hasOwn(recipe, field)) return false;
    const value = recipe[field];
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === 'object') return Object.keys(value).length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== null && value !== undefined;
  }).length;
}

function uniqueNonEmptyValues(recipes, field) {
  return new Set(
    recipes
      .map((recipe) => recipe[field])
      .filter((value) => value !== null && value !== undefined && String(value).trim() !== '')
  ).size;
}

function imageExists(imageUrl) {
  const value = String(imageUrl || '').trim();
  if (!value || !/^\/?assets\//.test(value)) return false;
  const relativePath = value.replace(/^\/?assets\//, '').split(/[?#]/, 1)[0];
  const resolvedPath = path.resolve(root, 'frontend', 'assets', relativePath);
  const assetsRoot = `${path.resolve(root, 'frontend', 'assets')}${path.sep}`;
  if (!resolvedPath.startsWith(assetsRoot)) return false;
  return fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile();
}

function calculateMetrics(recipes) {
  return {
    recipeCount: recipes.length,
    uniqueIds: uniqueNonEmptyValues(recipes, 'id'),
    uniqueSourceIds: uniqueNonEmptyValues(recipes, 'sourceId'),
    imageCoverage: recipes.filter((recipe) => imageExists(recipe.imageUrl)).length,
    quickGuideCoverage: hasNonEmptyField(recipes, 'quickGuide'),
    pairingCoverage: hasNonEmptyField(recipes, 'pairings'),
    dietaryTagCoverage: hasField(recipes, 'dietaryTags'),
    mealTagCoverage: hasField(recipes, 'mealTags'),
    moodTagCoverage: hasField(recipes, 'moodTags'),
    moodTagNonEmptyCoverage: hasNonEmptyField(recipes, 'moodTags'),
    regionTagCoverage: hasField(recipes, 'regionTags'),
    aliasCoverage: hasField(recipes, 'aliases'),
    aliasNonEmptyCoverage: hasNonEmptyField(recipes, 'aliases'),
    recipeTypeCoverage: hasNonEmptyField(recipes, 'recipeType'),
    dishFamilyCoverage: hasNonEmptyField(recipes, 'dishFamily'),
    schemaFieldCount: new Set(recipes.flatMap((recipe) => Object.keys(recipe))).size,
  };
}

function coverageRate(value, recipeCount) {
  return recipeCount > 0 ? value / recipeCount : 0;
}

function formatPercent(rate) {
  return `${(rate * 100).toFixed(2)}%`;
}

function validateMetric(definition, baseline, current) {
  const baselineValue = Number(baseline[definition.key]);
  const currentValue = Number(current[definition.key]);
  const result = {
    metric: definition.key,
    label: definition.label,
    baseline: baselineValue,
    current: currentValue,
    delta: currentValue - baselineValue,
    releaseBlocker: definition.blocker,
    status: 'PASS',
    message: 'Matches the Beta 2 baseline.',
  };

  if (!Number.isFinite(baselineValue)) {
    return {
      ...result,
      status: 'FAIL',
      message: `Baseline metric ${definition.key} is missing or invalid.`,
    };
  }

  if (definition.kind === 'identity') {
    const duplicateOrMissing = currentValue !== current.recipeCount;
    if (duplicateOrMissing) {
      return {
        ...result,
        status: 'FAIL',
        message: `${definition.label} must equal the current recipe count; IDs are missing or duplicated.`,
      };
    }
  }

  if (definition.kind === 'coverage') {
    const baselineRate = coverageRate(baselineValue, baseline.recipeCount);
    const currentRate = coverageRate(currentValue, current.recipeCount);
    result.baselineRate = baselineRate;
    result.currentRate = currentRate;

    if (currentValue < baselineValue || currentRate < baselineRate) {
      result.status = definition.blocker ? 'FAIL' : 'WARNING';
      result.message = `${definition.label} decreased from ${baselineValue}/${baseline.recipeCount} (${formatPercent(baselineRate)}) to ${currentValue}/${current.recipeCount} (${formatPercent(currentRate)}).`;
      return result;
    }
  } else if (currentValue < baselineValue) {
    result.status = definition.blocker ? 'FAIL' : 'WARNING';
    result.message = `${definition.label} decreased from ${baselineValue} to ${currentValue}.`;
    return result;
  }

  if (currentValue > baselineValue) {
    result.message = `${definition.label} increased from ${baselineValue} to ${currentValue}.`;
  }

  return result;
}

function overallStatus(checks) {
  return checks.reduce(
    (status, check) => STATUS_RANK[check.status] > STATUS_RANK[status] ? check.status : status,
    'PASS'
  );
}

function markdownReport(report) {
  const lines = [
    '# Recipe Validation Report',
    '',
    `- Status: **${report.status}**`,
    `- Exit code: \`${report.exitCode}\``,
    `- Baseline: \`${report.baselineVersion}\``,
    `- Generated at: \`${report.generatedAt}\``,
    `- Recipe source: \`${report.inputs.recipes}\``,
    '',
    '## Summary',
    '',
    `- PASS: ${report.summary.PASS}`,
    `- WARNING: ${report.summary.WARNING}`,
    `- FAIL: ${report.summary.FAIL}`,
    '',
    '## Checks',
    '',
    '| Status | Metric | Baseline | Current | Delta | Release blocker |',
    '| --- | --- | ---: | ---: | ---: | :---: |',
  ];

  report.checks.forEach((check) => {
    lines.push(`| ${check.status} | ${check.label} | ${check.baseline} | ${check.current} | ${check.delta >= 0 ? '+' : ''}${check.delta} | ${check.releaseBlocker ? 'Yes' : 'No'} |`);
  });

  const findings = report.checks.filter((check) => check.status !== 'PASS');
  lines.push('', '## Findings', '');
  if (!findings.length) {
    lines.push('No regressions detected against the frozen Beta 2 baseline.');
  } else {
    findings.forEach((check) => lines.push(`- **${check.status} — ${check.label}:** ${check.message}`));
  }

  if (report.collectionHome?.sizeWarnings?.length) {
    lines.push('', '## Collection home warnings', '');
    report.collectionHome.sizeWarnings.forEach((warning) => {
      lines.push(`- ${warning.collection}: ${warning.count} recipes (${warning.reason})`);
    });
  }

  lines.push(
    '',
    '## Release decision',
    '',
    report.releaseBlocked
      ? 'Release is **blocked** because one or more required invariants failed.'
      : report.status === 'WARNING'
        ? 'Release is not blocked, but warnings should be reviewed.'
        : 'Release validation passed.',
    ''
  );

  return lines.join('\n');
}

function writeFailureReport(error) {
  const generatedAt = new Date().toISOString();
  const report = {
    status: 'FAIL',
    exitCode: 1,
    releaseBlocked: true,
    generatedAt,
    baselineVersion: null,
    inputs: {
      baseline: path.relative(root, baselinePath),
      recipes: path.relative(root, recipesPath),
    },
    summary: { PASS: 0, WARNING: 0, FAIL: 1 },
    checks: [],
    error: error.message,
  };

  fs.mkdirSync(path.dirname(reportJsonPath), { recursive: true });
  fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(
    reportMarkdownPath,
    `# Recipe Validation Report\n\n- Status: **FAIL**\n- Exit code: \`1\`\n- Generated at: \`${generatedAt}\`\n\n## Error\n\n${error.message}\n`
  );
  return report;
}

function validateRecipeData() {
  const baseline = readJson(baselinePath, 'recipe baseline');
  const recipes = readJson(recipesPath, 'recipe catalog');
  if (!Array.isArray(recipes)) {
    throw new Error('Recipe catalog must be a JSON array.');
  }
  if (recipes.some((recipe) => !recipe || typeof recipe !== 'object' || Array.isArray(recipe))) {
    throw new Error('Every recipe catalog entry must be an object.');
  }

  const current = calculateMetrics(recipes);
  const baseChecks = metricDefinitions.map((definition) => validateMetric(definition, baseline, current));
  const collectionHome = collectionHomeChecks(recipes);
  const checks = [...baseChecks, ...collectionHome.checks];
  const status = overallStatus(checks);
  const summary = checks.reduce(
    (counts, check) => {
      counts[check.status] += 1;
      return counts;
    },
    { PASS: 0, WARNING: 0, FAIL: 0 }
  );
  const report = {
    status,
    exitCode: status === 'FAIL' ? 1 : 0,
    releaseBlocked: status === 'FAIL',
    generatedAt: new Date().toISOString(),
    baselineVersion: baseline.baselineVersion,
    inputs: {
      baseline: path.relative(root, baselinePath),
      recipes: path.relative(root, recipesPath),
    },
    summary,
    baselineMetrics: Object.fromEntries(metricDefinitions.map(({ key }) => [key, baseline[key]])),
    currentMetrics: current,
    collectionHome: collectionHome.diagnostics,
    checks,
  };

  fs.mkdirSync(path.dirname(reportJsonPath), { recursive: true });
  fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(reportMarkdownPath, `${markdownReport(report)}\n`);
  return report;
}

function printSummary(report) {
  console.log(`Recipe validation: ${report.status}`);
  console.log(`PASS ${report.summary.PASS} | WARNING ${report.summary.WARNING} | FAIL ${report.summary.FAIL}`);
  console.log(`JSON: ${path.relative(root, reportJsonPath)}`);
  console.log(`Markdown: ${path.relative(root, reportMarkdownPath)}`);
}

if (require.main === module) {
  let report;
  try {
    report = validateRecipeData();
  } catch (error) {
    report = writeFailureReport(error);
  }
  printSummary(report);
  process.exitCode = report.exitCode;
}

module.exports = {
  calculateMetrics,
  collectionHomeDiagnostics,
  validateRecipeData,
};
