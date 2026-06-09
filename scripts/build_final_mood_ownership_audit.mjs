import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const recipesPath = path.join(rootDir, 'database', 'generated', 'recipes.json');
const reportsDir = path.join(rootDir, 'database', 'generated', 'reports');
const outputDir = path.join(rootDir, 'outputs', 'final_mood_ownership_audit');
const outputPath = path.join(outputDir, 'CookBuddy_Final_Mood_Ownership_Audit.xlsx');

const moods = [
  { key: 'comfort', label: 'Comfort Food' },
  { key: 'soul', label: 'Soul Food' },
  { key: 'protein', label: 'High Protein' },
  { key: 'quick', label: 'Quick & Easy' },
  { key: 'spicy', label: 'Spicy Food' },
  { key: 'rainy', label: 'Rainy Day' },
];

const recipes = JSON.parse(await fs.readFile(recipesPath, 'utf8'))
  .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');

const csvEscape = (value) => {
  if (value === undefined || value === null) return '';
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

async function writeCsv(filePath, headers, rows) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const lines = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ];
  await fs.writeFile(filePath, `${lines.join('\n')}\n`);
}

function tagsOf(recipe) {
  return Array.isArray(recipe.tags) ? recipe.tags.map((tag) => String(tag).toLowerCase()) : [];
}

function textOf(recipe) {
  return [recipe.title, recipe.sourceId, ...(recipe.tags || []), recipe.primaryIngredient1, recipe.primaryIngredient2]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function totalTime(recipe) {
  return Number(recipe.timeMinutes || ((recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)) || 0);
}

function mealTypes(recipe) {
  const combined = [recipe.mealType, recipe.meal_type, ...(recipe.tags || [])].filter(Boolean).join(' ').toLowerCase();
  const set = new Set();
  if (/\bbreakfast\b/.test(combined)) set.add('Breakfast');
  if (/\blunch\b/.test(combined)) set.add('Lunch');
  if (/\bdinner\b/.test(combined)) set.add('Dinner');
  if (/\bsnack|snacks\b/.test(combined)) set.add('Snacks');
  if (!set.size) set.add('Unknown');
  return [...set];
}

function hasHighProteinCore(recipe) {
  const text = [
    recipe.title,
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2,
    ...(recipe.tags || []),
  ].filter(Boolean).join(' ').toLowerCase();
  return /\b(chicken|egg|fish|prawn|mutton|paneer|rajma|chole|dal|lentil|keema|kheema|pork)\b/.test(text);
}

function recipeMatchesMood(recipe, mood) {
  const tags = tagsOf(recipe);
  const text = textOf(recipe);
  if (mood === 'spicy') {
    return tags.includes('spicy-food') || tags.includes('spicy')
      || /\b(chilli|chili|mirchi|pepper|podi|chettinad|kolhapuri|schezwan|laal|salan|guntur|madras)\b/.test(text);
  }
  if (mood === 'quick') {
    return tags.includes('quick') || tags.includes('quick-meal') || totalTime(recipe) <= 25 || recipe.lowEffort === true;
  }
  if (mood === 'rainy') {
    return tags.includes('rainy-day') || tags.includes('monsoon-favorite') || Number(recipe.rainyDayScore || 0) >= 7;
  }
  if (mood === 'protein') {
    return hasHighProteinCore(recipe) && Number(recipe.proteinScore || 0) >= 6;
  }
  if (mood === 'soul') {
    return tags.includes('soul-food') || Number(recipe.nostalgiaScore || 0) >= 7;
  }
  return tags.includes('comfort') || tags.includes('comfort-food') || Number(recipe.comfortScore || 0) >= 7;
}

function moodLensScore(recipe, mood) {
  const tags = tagsOf(recipe);
  const text = textOf(recipe);
  const time = totalTime(recipe);
  if (mood === 'comfort') {
    return Number(recipe.comfortScore || 0) * 10
      + Number(recipe.homeStyleScore || 0) * 3
      + (recipeMatchesMood(recipe, mood) ? 18 : 0);
  }
  if (mood === 'soul') {
    return Number(recipe.nostalgiaScore || 0) * 8
      + Number(recipe.homeStyleScore || 0) * 5
      + Number(recipe.comfortScore || 0) * 3
      + (tags.includes('soul-food') ? 20 : 0);
  }
  if (mood === 'protein') {
    return hasHighProteinCore(recipe)
      ? Number(recipe.proteinScore || 0) * 12 + (tags.includes('high-protein') || tags.includes('protein-rich') ? 16 : 0)
      : Number(recipe.proteinScore || 0);
  }
  if (mood === 'quick') {
    return Math.max(0, 60 - time)
      + (tags.includes('quick') || tags.includes('quick-meal') ? 24 : 0)
      + Math.max(0, 10 - Number(recipe.effortScore || 5)) * 4;
  }
  if (mood === 'spicy') {
    return (tags.includes('spicy-food') || tags.includes('spicy') ? 45 : 0)
      + (/\b(chilli|chili|mirchi|pepper|podi|chettinad|kolhapuri|schezwan|laal|salan|guntur|madras)\b/.test(text) ? 35 : 0)
      + Number(recipe.comfortScore || 0);
  }
  if (mood === 'rainy') {
    return Number(recipe.rainyDayScore || 0) * 11
      + (tags.includes('rainy-day') || tags.includes('monsoon-favorite') ? 22 : 0)
      + (/\b(pakora|bajji|bonda|chai|rasam|soup|khichdi|pongal)\b/.test(text) ? 20 : 0);
  }
  return 0;
}

function moodScores(recipe) {
  return moods.map((mood) => ({
    ...mood,
    score: moodLensScore(recipe, mood.key),
    matches: recipeMatchesMood(recipe, mood.key),
  })).sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
}

function rankedForMood(mood) {
  return recipes
    .map((recipe) => ({ recipe, fitScore: moodLensScore(recipe, mood.key), matches: recipeMatchesMood(recipe, mood.key) }))
    .sort((a, b) => Number(b.matches) - Number(a.matches)
      || b.fitScore - a.fitScore
      || String(a.recipe.title).localeCompare(String(b.recipe.title)));
}

function currentMoodAssignments(recipe) {
  return [recipe.primaryMood, recipe.secondaryMood].filter(Boolean);
}

function recommendationForGap(gap) {
  if (gap === 0) return 'Manual review required';
  if (gap <= 2) return 'Strong overlap';
  return 'Acceptable overlap';
}

const ownershipConflicts = [];
const allRecipeScoreSummaries = [];

for (const recipe of recipes) {
  const scores = moodScores(recipe);
  const best = scores[0];
  const second = scores[1];
  const fitScoreGap = Math.round((best.score - second.score) * 100) / 100;
  allRecipeScoreSummaries.push({ recipe, best, second, fitScoreGap });
  if (fitScoreGap <= 5) {
    ownershipConflicts.push({
      recipe: recipe.title,
      recipe_id: recipe.id,
      currentPrimaryMood: recipe.primaryMood || '',
      bestMood: best.label,
      bestScore: best.score,
      secondBestMood: second.label,
      secondBestScore: second.score,
      fitScoreGap,
      recommendation: recommendationForGap(fitScoreGap),
    });
  }
}

const soulFoodAudit = recipes
  .filter((recipe) => recipe.primaryMood === 'Soul Food' || recipe.secondaryMood === 'Soul Food')
  .map((recipe) => {
    const scores = moodScores(recipe);
    const soulScore = moodLensScore(recipe, 'soul');
    const comfortLensScore = moodLensScore(recipe, 'comfort');
    const rainyLensScore = moodLensScore(recipe, 'rainy');
    const notes = [];
    if (scores[0].label !== 'Soul Food') notes.push(`Flag: strongest mood is ${scores[0].label}`);
    if (comfortLensScore >= soulScore) notes.push('Flag: Comfort score >= Soul score');
    if (Number(recipe.homeStyleScore || 0) >= 8) notes.push('Note: high home-style score');
    if (Number(recipe.nostalgiaScore || 0) >= 8) notes.push('Note: high nostalgia score');
    return {
      recipe: recipe.title,
      currentPrimaryMood: recipe.primaryMood || '',
      currentSecondaryMood: recipe.secondaryMood || '',
      soulScore,
      comfortScore: comfortLensScore,
      rainyDayScore: rainyLensScore,
      mealType: mealTypes(recipe).join('; '),
      homeStyleScore: Number(recipe.homeStyleScore || 0),
      nostalgiaScore: Number(recipe.nostalgiaScore || 0),
      recommendation: notes.join('; ') || 'Soul ownership looks reasonable',
    };
  }).sort((a, b) => b.soulScore - a.soulScore || a.recipe.localeCompare(b.recipe));

const highProteinAudit = recipes
  .filter((recipe) => recipe.primaryMood === 'High Protein' || recipe.secondaryMood === 'High Protein')
  .map((recipe) => {
    const scores = moodScores(recipe);
    const proteinLensScore = moodLensScore(recipe, 'protein');
    const comfortLensScore = moodLensScore(recipe, 'comfort');
    const soulScore = moodLensScore(recipe, 'soul');
    const fitScoreGap = Math.round((scores[0].score - scores[1].score) * 100) / 100;
    const flags = [];
    if (proteinLensScore < comfortLensScore) flags.push('Flag: protein score < comfort score');
    if (proteinLensScore < soulScore) flags.push('Flag: protein score < soul score');
    return {
      recipe: recipe.title,
      proteinScore: proteinLensScore,
      comfortScore: comfortLensScore,
      soulScore,
      bestMood: scores[0].label,
      secondBestMood: scores[1].label,
      fitScoreGap,
      recommendation: flags.join('; ') || 'Protein ownership looks reasonable',
    };
  }).sort((a, b) => {
    const aFlag = a.recommendation.startsWith('Flag') ? 1 : 0;
    const bFlag = b.recommendation.startsWith('Flag') ? 1 : 0;
    return bFlag - aFlag || a.fitScoreGap - b.fitScoreGap || a.recipe.localeCompare(b.recipe);
  });

const top20Membership = new Map();
for (const mood of moods) {
  rankedForMood(mood).slice(0, 20).forEach((item, index) => {
    if (!top20Membership.has(item.recipe.id)) top20Membership.set(item.recipe.id, []);
    top20Membership.get(item.recipe.id).push({ mood: mood.label, rank: index + 1, fitScore: item.fitScore });
  });
}
const recipeById = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const top20Crossover = [...top20Membership.entries()]
  .filter(([, memberships]) => memberships.length >= 3)
  .map(([recipeId, memberships]) => {
    const recipe = recipeById.get(recipeId);
    return {
      recipe: recipe.title,
      recipe_id: recipeId,
      currentMoodAssignments: currentMoodAssignments(recipe).join('; '),
      appearsIn: memberships.map((entry) => `${entry.mood} #${entry.rank}`).join('; '),
      MoodCount: memberships.length,
    };
  })
  .sort((a, b) => b.MoodCount - a.MoodCount || a.recipe.localeCompare(b.recipe));

const currentMoodCounts = Object.fromEntries(moods.map((mood) => [mood.label, recipes.filter((recipe) => recipe.primaryMood === mood.label).length]));
const protectedDropLimit = Object.fromEntries(moods.map((mood) => [mood.label, Math.floor(currentMoodCounts[mood.label] * 0.1)]));
const proposedPrimaryById = new Map(recipes.map((recipe) => [recipe.id, recipe.primaryMood || '']));
const recommendedChanges = [];

const candidateChanges = allRecipeScoreSummaries
  .filter(({ recipe, best, fitScoreGap }) => fitScoreGap <= 5 && (recipe.primaryMood || '') !== best.label)
  .sort((a, b) => a.fitScoreGap - b.fitScoreGap || b.best.score - a.best.score || a.recipe.title.localeCompare(b.recipe.title));

function proposedCounts() {
  return Object.fromEntries(moods.map((mood) => [mood.label, [...proposedPrimaryById.values()].filter((primaryMood) => primaryMood === mood.label).length]));
}

for (const candidate of candidateChanges) {
  const currentPrimary = candidate.recipe.primaryMood || '';
  const suggestedPrimary = candidate.best.label;
  const beforeCounts = proposedCounts();
  const currentDrop = currentPrimary ? currentMoodCounts[currentPrimary] - (beforeCounts[currentPrimary] - 1) : 0;
  const wouldReduceTooMuch = currentPrimary && currentDrop > protectedDropLimit[currentPrimary];
  if (wouldReduceTooMuch) continue;
  proposedPrimaryById.set(candidate.recipe.id, suggestedPrimary);
  recommendedChanges.push({
    recipe: candidate.recipe.title,
    currentPrimaryMood: currentPrimary,
    suggestedPrimaryMood: suggestedPrimary,
    reason: `${recommendationForGap(candidate.fitScoreGap)}: ${suggestedPrimary} score ${candidate.best.score} vs ${candidate.second.label} ${candidate.second.score}; gap ${candidate.fitScoreGap}`,
  });
}

const finalCounts = proposedCounts();
const moodCountImpact = moods.map((mood) => ({
  Mood: mood.label,
  CurrentCount: currentMoodCounts[mood.label],
  ProposedCount: finalCounts[mood.label],
  Delta: finalCounts[mood.label] - currentMoodCounts[mood.label],
}));

const finalRecommendation = (
  ownershipConflicts.some((row) => row.fitScoreGap === 0)
  || top20Crossover.length > 0
  || highProteinAudit.some((row) => row.recommendation.startsWith('Flag'))
  || soulFoodAudit.some((row) => row.recommendation.includes('Flag'))
) ? 'MANUAL REVIEW REQUIRED' : 'SAFE TO APPLY';

await writeCsv(path.join(reportsDir, 'final_mood_ownership_conflicts.csv'), Object.keys(ownershipConflicts[0] || {
  recipe: '', recipe_id: '', currentPrimaryMood: '', bestMood: '', bestScore: '', secondBestMood: '', secondBestScore: '', fitScoreGap: '', recommendation: '',
}), ownershipConflicts);
await writeCsv(path.join(reportsDir, 'final_mood_soul_food_audit.csv'), Object.keys(soulFoodAudit[0] || {
  recipe: '', currentPrimaryMood: '', currentSecondaryMood: '', soulScore: '', comfortScore: '', rainyDayScore: '', mealType: '', homeStyleScore: '', nostalgiaScore: '', recommendation: '',
}), soulFoodAudit);
await writeCsv(path.join(reportsDir, 'final_mood_high_protein_audit.csv'), Object.keys(highProteinAudit[0] || {
  recipe: '', proteinScore: '', comfortScore: '', soulScore: '', bestMood: '', secondBestMood: '', fitScoreGap: '', recommendation: '',
}), highProteinAudit);
await writeCsv(path.join(reportsDir, 'final_mood_top20_crossover.csv'), Object.keys(top20Crossover[0] || {
  recipe: '', recipe_id: '', currentMoodAssignments: '', appearsIn: '', MoodCount: '',
}), top20Crossover);
await writeCsv(path.join(reportsDir, 'final_mood_recommended_changes.csv'), Object.keys(recommendedChanges[0] || {
  recipe: '', currentPrimaryMood: '', suggestedPrimaryMood: '', reason: '',
}), recommendedChanges);
await writeCsv(path.join(reportsDir, 'final_mood_count_impact.csv'), Object.keys(moodCountImpact[0]), moodCountImpact);
await fs.writeFile(path.join(reportsDir, 'final_mood_ownership_audit_summary.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  recipeCount: recipes.length,
  finalRecommendation,
  counts: {
    ownershipConflicts: ownershipConflicts.length,
    soulFoodAudit: soulFoodAudit.length,
    highProteinAudit: highProteinAudit.length,
    top20Crossover: top20Crossover.length,
    recommendedChanges: recommendedChanges.length,
  },
  currentMoodCounts,
  proposedMoodCounts: finalCounts,
}, null, 2)}\n`);

function tableData(headers, rows) {
  return [headers, ...rows.map((row) => headers.map((header) => row[header] ?? ''))];
}

function excelColumn(index) {
  let number = index + 1;
  let column = '';
  while (number > 0) {
    const remainder = (number - 1) % 26;
    column = String.fromCharCode(65 + remainder) + column;
    number = Math.floor((number - 1) / 26);
  }
  return column;
}

async function addSheet(workbook, name, headers, rows, existingSheet = null) {
  const sheet = existingSheet || workbook.worksheets.add(name);
  sheet.name = name;
  const values = tableData(headers, rows);
  const endColumn = excelColumn(headers.length - 1);
  const endRow = values.length;
  sheet.getRange(`A1:${endColumn}${endRow}`).values = values;
  return sheet;
}

const workbook = Workbook.create();
const firstSheet = workbook.worksheets.add('Ownership_Conflicts');

await addSheet(workbook, 'Ownership_Conflicts', [
  'recipe', 'recipe_id', 'currentPrimaryMood', 'bestMood', 'bestScore', 'secondBestMood', 'secondBestScore', 'fitScoreGap', 'recommendation',
], ownershipConflicts, firstSheet);
await addSheet(workbook, 'SoulFood_Audit', [
  'recipe', 'currentPrimaryMood', 'currentSecondaryMood', 'soulScore', 'comfortScore', 'rainyDayScore', 'mealType', 'homeStyleScore', 'nostalgiaScore', 'recommendation',
], soulFoodAudit);
await addSheet(workbook, 'HighProtein_Audit', [
  'recipe', 'proteinScore', 'comfortScore', 'soulScore', 'bestMood', 'secondBestMood', 'fitScoreGap', 'recommendation',
], highProteinAudit);
await addSheet(workbook, 'Top20_Crossover', [
  'recipe', 'recipe_id', 'currentMoodAssignments', 'appearsIn', 'MoodCount',
], top20Crossover);
await addSheet(workbook, 'Recommended_Changes', [
  'recipe', 'currentPrimaryMood', 'suggestedPrimaryMood', 'reason',
], recommendedChanges);
await addSheet(workbook, 'Mood_Count_Impact', [
  'Mood', 'CurrentCount', 'ProposedCount', 'Delta',
], moodCountImpact);

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(JSON.stringify({
  outputPath,
  finalRecommendation,
  counts: {
    ownershipConflicts: ownershipConflicts.length,
    soulFoodAudit: soulFoodAudit.length,
    highProteinAudit: highProteinAudit.length,
    top20Crossover: top20Crossover.length,
    recommendedChanges: recommendedChanges.length,
  },
  currentMoodCounts,
  proposedMoodCounts: finalCounts,
}, null, 2));
