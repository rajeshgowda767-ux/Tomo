const fs = require('fs');
const path = require('path');
const { runPantryRecommendationAudit } = require('./pantry-recommendation-audit');

const root = path.resolve(__dirname, '..');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const createdPath = path.join(reportsDir, 'approved_recipes_created.json');
const aliasesPath = path.join(reportsDir, 'recipe_aliases_added.json');
const jsonPath = path.join(root, 'approved-recipe-implementation-report.json');
const markdownPath = path.join(root, 'approved-recipe-implementation-report.md');

const originalLog = console.log;
const originalTable = console.table;
console.log = () => {};
console.table = () => {};
const rows = runPantryRecommendationAudit();
console.log = originalLog;
console.table = originalTable;

const createdDishes = JSON.parse(fs.readFileSync(createdPath, 'utf8'));
const aliasesAdded = JSON.parse(fs.readFileSync(aliasesPath, 'utf8'));
const summary = rows.reduce((counts, row) => {
  counts[row.status] = (counts[row.status] || 0) + 1;
  return counts;
}, {});
const remainingMissingRecipes = rows
  .filter((row) => row.status === 'MISSING_RECIPE')
  .map((row) => ({
    pantry: row.pantry,
    expected: row.expected,
    topRecommendation: row.topRecommendation,
    reason: row.reason,
  }));
const remainingLowConfidence = rows
  .filter((row) => row.status === 'LOW_CONFIDENCE')
  .map((row) => ({
    pantry: row.pantry,
    expected: row.expected,
    topRecommendation: row.topRecommendation,
    reason: row.reason,
  }));

const report = {
  generatedAt: new Date().toISOString(),
  databasePath: path.join(root, 'database', 'generated', 'recipes.json'),
  auditCommand: 'node scripts/pantry-recommendation-audit.js',
  npmCommandAttempted: 'npm run audit:pantry',
  npmAvailable: false,
  auditSummary: {
    total: rows.length,
    PASS: summary.PASS || 0,
    PASS_WITH_METADATA_FIX: summary.PASS_WITH_METADATA_FIX || 0,
    MISSING_RECIPE: summary.MISSING_RECIPE || 0,
    RANKING_IMPROVEMENT: summary.RANKING_IMPROVEMENT || 0,
    LOW_CONFIDENCE: summary.LOW_CONFIDENCE || 0,
    FAIL: summary.FAIL || 0,
  },
  createdDishes,
  aliasesAdded,
  remainingMissingRecipes,
  remainingLowConfidence,
};

fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);

const lines = [
  '# Approved Recipe Implementation Report',
  '',
  `Generated: ${report.generatedAt}`,
  '',
  '## Pantry Audit Summary',
  '',
  `- Total pairs: ${report.auditSummary.total}`,
  `- PASS: ${report.auditSummary.PASS}`,
  `- PASS_WITH_METADATA_FIX: ${report.auditSummary.PASS_WITH_METADATA_FIX}`,
  `- MISSING_RECIPE: ${report.auditSummary.MISSING_RECIPE}`,
  `- RANKING_IMPROVEMENT: ${report.auditSummary.RANKING_IMPROVEMENT}`,
  `- LOW_CONFIDENCE: ${report.auditSummary.LOW_CONFIDENCE}`,
  `- FAIL: ${report.auditSummary.FAIL}`,
  '',
  'The configured npm command could not run because npm is unavailable, so its exact Node script was run directly.',
  '',
  `## Created Dishes (${createdDishes.length})`,
  '',
  ...createdDishes.map((dish) => `- **${dish.name}** — aliases: ${dish.aliases.join(', ') || 'none'}; moodTags: []`),
  '',
  `## Aliases Added (${aliasesAdded.length})`,
  '',
  ...aliasesAdded.map((item) => `- **${item.recipe}**: ${item.aliases.join(', ')}`),
  '',
  `## Remaining Missing Recipes (${remainingMissingRecipes.length})`,
  '',
  ...remainingMissingRecipes.map((item) => `- **${item.expected}** — ${item.pantry.join(' + ')}`),
  '',
  `## Remaining Low-Confidence Cases (${remainingLowConfidence.length})`,
  '',
  ...remainingLowConfidence.map((item) => `- **${item.expected}** — ${item.pantry.join(' + ')}; top: ${item.topRecommendation}`),
  '',
];

fs.writeFileSync(markdownPath, `${lines.join('\n')}\n`);
console.log(JSON.stringify({ jsonPath, markdownPath, auditSummary: report.auditSummary }, null, 2));
