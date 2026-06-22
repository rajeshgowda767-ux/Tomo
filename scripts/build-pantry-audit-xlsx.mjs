import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const require = createRequire(import.meta.url);
const { runPantryRecommendationAudit } = require('./pantry-recommendation-audit.js');

const projectRoot = path.resolve(import.meta.dirname, '..');
const outputDir = path.join(projectRoot, 'outputs', 'pantry-audit');
const outputPath = path.join(outputDir, 'pantry-recommendation-audit.xlsx');

function getRows() {
  const originalLog = console.log;
  const originalTable = console.table;
  try {
    console.log = () => {};
    console.table = () => {};
    return runPantryRecommendationAudit();
  } finally {
    console.log = originalLog;
    console.table = originalTable;
  }
}

function countsByStatus(rows) {
  return rows.reduce((counts, row) => {
    counts[row.status] = (counts[row.status] || 0) + 1;
    return counts;
  }, { PASS: 0, PASS_WITH_METADATA_FIX: 0, MISSING_RECIPE: 0, RANKING_IMPROVEMENT: 0, LOW_CONFIDENCE: 0, FAIL: 0 });
}

function categorySummary(rows) {
  return [...new Set(rows.map((row) => row.category))].map((category) => {
    const categoryRows = rows.filter((row) => row.category === category);
    return [
      category,
      categoryRows.length,
      categoryRows.filter((row) => row.status === 'PASS').length,
      categoryRows.filter((row) => row.status === 'PASS_WITH_METADATA_FIX').length,
      categoryRows.filter((row) => row.status === 'MISSING_RECIPE').length,
      categoryRows.filter((row) => row.status === 'RANKING_IMPROVEMENT').length,
      categoryRows.filter((row) => row.status === 'LOW_CONFIDENCE').length,
      categoryRows.filter((row) => row.status === 'FAIL').length
    ];
  });
}

function matrix(sheetRows) {
  return sheetRows.map((row) => row.map((value) => value ?? ''));
}

function setValues(sheet, startCell, rows) {
  const startCol = startCell.match(/[A-Z]+/)[0];
  const startRow = Number(startCell.match(/\d+/)[0]);
  const startColNumber = startCol.split('').reduce((sum, letter) => sum * 26 + letter.charCodeAt(0) - 64, 0);
  const endRow = startRow + rows.length - 1;
  const endColNumber = startColNumber + rows[0].length - 1;
  let endCol = '';
  let n = endColNumber;
  while (n > 0) {
    const rem = (n - 1) % 26;
    endCol = String.fromCharCode(65 + rem) + endCol;
    n = Math.floor((n - 1) / 26);
  }
  sheet.getRange(`${startCell}:${endCol}${endRow}`).values = matrix(rows);
}

function styleHeader(range) {
  range.format.font = { bold: true, color: '#FFFFFF' };
  range.format.fill = '#B85D3C';
}

function styleTitle(range) {
  range.format.font = { bold: true, size: 18, color: '#7B3F2C' };
}

function statusFill(status) {
  if (status === 'PASS') return '#DDEED7';
  if (status === 'PASS_WITH_METADATA_FIX') return '#FFF0C9';
  if (status === 'MISSING_RECIPE') return '#FFE3BA';
  if (status === 'RANKING_IMPROVEMENT') return '#DDEBFF';
  if (status === 'LOW_CONFIDENCE') return '#EAE2FF';
  if (status === 'FAIL') return '#FAD5CF';
  return '#FFFFFF';
}

function applyTableStyle(sheet, headerRange, bodyStatusColumn, rowCount) {
  styleHeader(sheet.getRange(headerRange));
  if (!bodyStatusColumn || rowCount <= 0) return;
  const col = bodyStatusColumn;
  for (let row = 2; row <= rowCount + 1; row += 1) {
    const range = sheet.getRange(`${col}${row}:${col}${row}`);
    const status = range.values?.[0]?.[0];
    range.format.fill = statusFill(status);
    range.format.font = { bold: true };
  }
}

function setWidths(sheet, widths) {
  Object.entries(widths).forEach(([col, width]) => {
    sheet.getRange(`${col}:${col}`).format.columnWidthPx = width;
  });
}

const rows = getRows();
const counts = countsByStatus(rows);
const missingRows = rows.filter((row) => row.status === 'MISSING_RECIPE' || row.status === 'LOW_CONFIDENCE');
const metadataRows = rows.filter((row) => row.status === 'PASS_WITH_METADATA_FIX');
const rankingRows = rows.filter((row) => row.status === 'RANKING_IMPROVEMENT');
const failRows = rows.filter((row) => row.status === 'FAIL');

const workbook = Workbook.create();
const summary = workbook.worksheets.add('Audit Summary');
const fullAudit = workbook.worksheets.add('Full Audit');
const backlog = workbook.worksheets.add('Missing Recipes Backlog');
const metadata = workbook.worksheets.add('Metadata Cleanup Backlog');
const ranking = workbook.worksheets.add('Ranking Improvement Backlog');
const logic = workbook.worksheets.add('Logic Issues');

setValues(summary, 'A1', [['Pantry Recommendation Audit']]);
styleTitle(summary.getRange('A1:A1'));
setValues(summary, 'A3', [
  ['Status', 'Count'],
  ['PASS', counts.PASS],
  ['PASS_WITH_METADATA_FIX', counts.PASS_WITH_METADATA_FIX],
  ['MISSING_RECIPE', counts.MISSING_RECIPE],
  ['RANKING_IMPROVEMENT', counts.RANKING_IMPROVEMENT],
  ['LOW_CONFIDENCE', counts.LOW_CONFIDENCE],
  ['FAIL', counts.FAIL],
  ['TOTAL', rows.length]
]);
applyTableStyle(summary, 'A3:B3', 'A', 7);
setValues(summary, 'D3', [['Category', 'Total', 'PASS', 'PASS_WITH_METADATA_FIX', 'MISSING_RECIPE', 'RANKING_IMPROVEMENT', 'LOW_CONFIDENCE', 'FAIL'], ...categorySummary(rows)]);
applyTableStyle(summary, 'D3:K3', null, 0);
setWidths(summary, { A: 220, B: 90, D: 160, E: 90, F: 190, G: 150, H: 190, I: 150, J: 90, K: 90 });

const fullAuditRows = [
  ['#', 'Category', 'Pantry', 'Expected', 'Top Recommendation', 'Score', 'Status', 'Reason', 'Top 3'],
  ...rows.map((row) => [
    row.id,
    row.category,
    row.pantry.join(' + '),
    row.expected,
    row.topRecommendation,
    row.score,
    row.status,
    row.reason,
    row.top3
  ])
];
setValues(fullAudit, 'A1', fullAuditRows);
applyTableStyle(fullAudit, 'A1:I1', 'G', rows.length);
setWidths(fullAudit, { A: 55, B: 130, C: 210, D: 210, E: 230, F: 80, G: 90, H: 520, I: 520 });
fullAudit.getRange('H:I').format.wrapText = true;

const backlogRows = [
  ['Pantry Ingredients', 'Top Recommendation', 'Score', 'Why Not PASS', 'Missing Likely Dishes', 'Suggested Database Additions'],
  ...missingRows.map((row) => [
    row.pantry.join(' + '),
    row.topRecommendation,
    row.score,
    row.reason,
    row.missingLikelyDishes.length ? row.missingLikelyDishes.join(', ') : 'None detected',
    row.suggestedDatabaseAdditions.length
      ? row.suggestedDatabaseAdditions.join(', ')
      : row.status === 'LOW_CONFIDENCE'
        ? 'No confident real dish yet; ask user to add one more ingredient'
        : 'Add/complete pantry metadata'
  ])
];
setValues(backlog, 'A1', backlogRows);
applyTableStyle(backlog, 'A1:F1', null, 0);
setWidths(backlog, { A: 230, B: 230, C: 80, D: 520, E: 300, F: 360 });
backlog.getRange('D:F').format.wrapText = true;

const metadataRowsForSheet = [
  ['Pantry Ingredients', 'Top Recommendation', 'Score', 'Metadata Cleanup Needed', 'Suggested Action'],
  ...metadataRows.map((row) => [
    row.pantry.join(' + '),
    row.topRecommendation,
    row.score,
    row.reason,
    row.suggestedDatabaseAdditions.length ? row.suggestedDatabaseAdditions.join(', ') : 'Complete pantry metadata for this recipe'
  ])
];
setValues(metadata, 'A1', metadataRowsForSheet);
applyTableStyle(metadata, 'A1:E1', null, 0);
setWidths(metadata, { A: 230, B: 230, C: 80, D: 520, E: 360 });
metadata.getRange('D:E').format.wrapText = true;

const rankingRowsForSheet = [
  ['Pantry Ingredients', 'Expected', 'Top Recommendation', 'Score', 'Ranking Improvement', 'Top 3'],
  ...rankingRows.map((row) => [
    row.pantry.join(' + '),
    row.expected,
    row.topRecommendation,
    row.score,
    row.reason,
    row.top3
  ])
];
setValues(ranking, 'A1', rankingRowsForSheet);
applyTableStyle(ranking, 'A1:F1', null, 0);
setWidths(ranking, { A: 220, B: 220, C: 230, D: 80, E: 520, F: 520 });
ranking.getRange('E:F').format.wrapText = true;

const logicRows = [
  ['Pantry Ingredients', 'Expected', 'Top Recommendation', 'Score', 'Recommendation Logic Issue', 'Top 3'],
  ...failRows.map((row) => [
    row.pantry.join(' + '),
    row.expected,
    row.topRecommendation,
    row.score,
    row.reason,
    row.top3
  ])
];
setValues(logic, 'A1', logicRows);
applyTableStyle(logic, 'A1:F1', null, 0);
setWidths(logic, { A: 220, B: 220, C: 230, D: 80, E: 520, F: 520 });
logic.getRange('E:F').format.wrapText = true;

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(outputPath);
