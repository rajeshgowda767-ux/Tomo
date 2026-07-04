#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const packagePath = path.join(root, 'package.json');
const outputJson = path.join(root, 'intelligence-audit.json');
const outputMarkdown = path.join(root, 'intelligence-audit.md');

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function list(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function statusFrom(failures, warnings) {
  if (failures > 0) return 'FAIL';
  if (warnings > 0) return 'WARNING';
  return 'PASS';
}

function reportPath(fileName) {
  return path.join(root, fileName);
}

function npmScripts() {
  const pkg = readJson(packagePath) || {};
  return pkg.scripts || {};
}

function runNpmScript(scriptName, scripts) {
  if (!scripts[scriptName]) return { ran: false, reason: `npm script ${scriptName} is not defined.` };
  try {
    execFileSync('npm', ['run', scriptName], {
      cwd: root,
      stdio: 'pipe',
      env: { ...process.env, NO_COLOR: '1' },
    });
    return { ran: true };
  } catch (error) {
    return {
      ran: false,
      reason: `npm run ${scriptName} exited with ${error.status || 'an error'}.`,
      error: String(error.stderr || error.message || '').slice(0, 1200),
    };
  }
}

function extractSummary(json, scoreKeys) {
  const summary = json && json.summary || {};
  const score = scoreKeys.map((key) => json && json[key]).find((value) => Number.isFinite(Number(value)));
  const failures = number(summary.failures, number(summary.failCount, number(summary.failureCount, 0)));
  const warnings = number(summary.warnings, number(summary.warningCount, 0));
  const contentGaps = number(summary.contentGaps, list(json && json.contentGaps).length);
  return {
    score: Number.isFinite(Number(score)) ? Math.round(Number(score)) : null,
    status: json && json.status || statusFrom(failures, warnings),
    failures,
    warnings,
    contentGaps,
  };
}

function systemNotRun(name, scriptName, reportFile, reason) {
  return {
    name,
    scriptName,
    score: null,
    status: 'NOT RUN',
    failures: 0,
    warnings: 0,
    contentGaps: 0,
    reportPath: reportPath(reportFile),
    reason,
  };
}

function runSystem(definition, scripts) {
  const run = runNpmScript(definition.scriptName, scripts);
  if (!run.ran) return systemNotRun(definition.name, definition.scriptName, definition.reportFile, run.reason);
  const json = readJson(reportPath(definition.reportFile));
  if (!json) return systemNotRun(definition.name, definition.scriptName, definition.reportFile, `Report ${definition.reportFile} was not generated.`);
  const summary = definition.extract ? definition.extract(json) : extractSummary(json, definition.scoreKeys);
  return {
    name: definition.name,
    scriptName: definition.scriptName,
    score: summary.score,
    status: summary.status,
    failures: summary.failures,
    warnings: summary.warnings,
    contentGaps: summary.contentGaps,
    reportPath: reportPath(definition.reportFile),
  };
}

function knowledgeBridgeSystem() {
  const json = readJson(reportPath('knowledge-coverage-audit.json'));
  if (!json) {
    return systemNotRun('Knowledge Bridges', 'audit:knowledge', 'knowledge-coverage-audit.json', 'Knowledge report is unavailable.');
  }
  const bridgeChecks = list(json.bridgeChecks);
  if (!bridgeChecks.length) {
    return systemNotRun('Knowledge Bridges', 'audit:knowledge', 'knowledge-coverage-audit.json', 'Knowledge report has no bridge checks.');
  }
  const failures = bridgeChecks.filter((check) => String(check.status || '').toUpperCase() === 'FAIL').length;
  const warnings = bridgeChecks.filter((check) => !['PASS', 'FAIL'].includes(String(check.status || '').toUpperCase())).length;
  const passed = bridgeChecks.length - failures - warnings;
  return {
    name: 'Knowledge Bridges',
    scriptName: 'audit:knowledge',
    score: Math.round((passed / bridgeChecks.length) * 100),
    status: statusFrom(failures, warnings),
    failures,
    warnings,
    contentGaps: 0,
    reportPath: reportPath('knowledge-coverage-audit.json'),
  };
}

function pad(label, width = 30) {
  return `${label}${'.'.repeat(Math.max(1, width - label.length))}`;
}

function main() {
  const scripts = npmScripts();
  const definitions = [
    {
      name: 'Ingredient Knowledge',
      scriptName: 'audit:knowledge',
      reportFile: 'knowledge-coverage-audit.json',
      scoreKeys: ['knowledgeScore'],
      extract: (json) => {
        const summary = json.summary || {};
        return {
          score: Math.round(number(json.knowledgeScore)),
          status: json.status || statusFrom(number(summary.failCount), number(summary.warningCount)),
          failures: number(summary.failCount),
          warnings: number(summary.warningCount),
          contentGaps: number(summary.knowledgeRecordsWithoutRecipePaths),
        };
      },
    },
    {
      name: 'Relationship Graph',
      scriptName: 'audit:relationships',
      reportFile: 'ingredient-relationship-audit.json',
      scoreKeys: ['relationshipScore'],
    },
    {
      name: 'Flavor Graph',
      scriptName: 'audit:flavor',
      reportFile: 'flavor-graph-audit.json',
      scoreKeys: ['flavorGraphScore'],
    },
    {
      name: 'Regional Matrix',
      scriptName: 'audit:regional-ingredients',
      reportFile: 'regional-ingredient-audit.json',
      scoreKeys: ['regionalIngredientScore'],
    },
    {
      name: 'Seasonal Intelligence',
      scriptName: 'audit:seasonal',
      reportFile: 'seasonal-intelligence-audit.json',
      scoreKeys: ['seasonalIntelligenceScore'],
    },
    {
      name: 'Substitutions',
      scriptName: 'audit:substitutions',
      reportFile: 'substitution-audit.json',
      scoreKeys: ['substitutionScore'],
    },
    {
      name: 'Explainability',
      scriptName: 'audit:explainability',
      reportFile: 'explainability-audit.json',
      scoreKeys: ['explainabilityScore'],
    },
    {
      name: 'Pantry Intelligence',
      scriptName: 'audit:pantry:v3',
      reportFile: 'pantry-intelligence-v3-audit.json',
      scoreKeys: ['pantryIntelligenceScore'],
    },
  ];

  const systems = definitions.map((definition) => runSystem(definition, scripts));
  systems.push(knowledgeBridgeSystem());

  const runnableSystems = systems.filter((system) => system.status !== 'NOT RUN' && Number.isFinite(Number(system.score)));
  const notRun = systems.filter((system) => system.status === 'NOT RUN');
  const failures = systems.reduce((total, system) => total + number(system.failures), 0);
  const warnings = systems.reduce((total, system) => total + number(system.warnings), 0);
  const contentGaps = systems.reduce((total, system) => total + number(system.contentGaps), 0);
  const overallScore = runnableSystems.length
    ? Math.round(runnableSystems.reduce((total, system) => total + number(system.score), 0) / runnableSystems.length)
    : 0;
  const allRan = notRun.length === 0;
  const allPass = runnableSystems.every((system) => system.status === 'PASS');
  const status = allRan && allPass && overallScore === 100
    ? 'INTELLIGENCE LOCKED'
    : failures > 0
      ? 'INTELLIGENCE NOT LOCKED'
      : 'INTELLIGENCE READY WITH GAPS';

  const report = {
    generatedAt: new Date().toISOString(),
    title: 'TOMO INTELLIGENCE PLATFORM AUDIT',
    overallIntelligenceScore: overallScore,
    status,
    summary: {
      systemsRun: runnableSystems.length,
      systemsNotRun: notRun.length,
      failures,
      warnings,
      contentGaps,
    },
    systems,
    systemsNotRun: notRun,
    recommendedNextActions: [
      ...notRun.map((system) => `Add ${system.scriptName} so ${system.name} can be included in the unified lock decision.`),
      ...(warnings ? ['Review warning items in the underlying intelligence audit reports.'] : []),
      ...(contentGaps ? ['Use content gaps as future recipe/knowledge expansion opportunities; they are reported separately from warnings.'] : []),
    ],
  };

  const scoreLines = systems.map((system) => {
    const value = system.status === 'NOT RUN' ? 'NOT RUN' : String(system.score).padStart(3, ' ');
    return `${pad(system.name)} ${value}`;
  }).join('\n');
  const issueLines = systems
    .filter((system) => system.failures || system.warnings)
    .map((system) => `- ${system.name}: ${system.failures} failures, ${system.warnings} warnings`)
    .join('\n') || '- None';
  const notRunLines = notRun.map((system) => `- ${system.name}: ${system.reason}`).join('\n') || '- None';
  const contentGapLines = systems
    .filter((system) => system.contentGaps)
    .map((system) => `- ${system.name}: ${system.contentGaps} content gaps`)
    .join('\n') || '- None';
  const actionLines = report.recommendedNextActions.length
    ? report.recommendedNextActions.map((action) => `- ${action}`).join('\n')
    : '- No action required. Intelligence layer is locked.';

  const markdown = `# TOMO INTELLIGENCE PLATFORM AUDIT\n\n${scoreLines}\n\nOverall Intelligence Score: ${overallScore}/100\nStatus: ${status}\n\n## Systems Not Run\n\n${notRunLines}\n\n## Failures And Warnings\n\n${issueLines}\n\n## Content Gaps\n\n${contentGapLines}\n\n## Report Paths\n\n${systems.map((system) => `- ${system.name}: ${system.reportPath}`).join('\n')}\n\n## Recommended Next Actions\n\n${actionLines}\n`;

  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMarkdown, markdown);
  console.log(JSON.stringify({
    overallIntelligenceScore: overallScore,
    status,
    systemsRun: runnableSystems.length,
    systemsNotRun: notRun.length,
    failures,
    warnings,
    contentGaps,
    json: outputJson,
    markdown: outputMarkdown,
  }, null, 2));
}

main();
