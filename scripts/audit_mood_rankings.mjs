import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const localRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const reportsDir = path.join(root, 'database', 'generated', 'reports');

const violationsCsvPath = path.join(reportsDir, 'mood_ranking_3plus_violations.csv');
const removalsCsvPath = path.join(reportsDir, 'mood_ranking_suggested_removals.csv');
const previewCsvPath = path.join(reportsDir, 'mood_ranking_updated_preview.csv');
const summaryJsonPath = path.join(reportsDir, 'mood_ranking_audit_summary.json');

fs.mkdirSync(reportsDir, { recursive: true });

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(localRecipesPath, 'utf8'), context);
const recipes = (context.window.COOKBUDDY_LOCAL_RECIPES || [])
  .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');

const moods = [
  { key: 'comfort', label: 'Comfort Food' },
  { key: 'soul', label: 'Soul Food' },
  { key: 'protein', label: 'High Protein' },
  { key: 'quick', label: 'Quick & Easy' },
  { key: 'spicy', label: 'Spicy Food' },
  { key: 'rainy', label: 'Rainy Day' },
];

const priorityByMood = {
  comfort: [
    'khichdi',
    'pongal',
    'curd rice',
    'dal rice',
    'rasam rice',
    'idli',
    'oats porridge',
  ],
  rainy: [
    'pakora',
    'bajji',
    'chai',
    'soup',
    'rasam',
    'khichdi',
    'pongal',
    'bonda',
  ],
};

const spicyRegionalTerms = [
  'andhra',
  'chettinad',
  'kolhapuri',
  'guntur',
  'laal',
  'madras',
  'salan',
  'schezwan',
  'mirchi',
  'chilli',
  'chili',
  'pepper',
  'podi',
];

const strongSpicyTerms = spicyRegionalTerms.filter((term) => term !== 'pepper');

const proteinTerms = [
  'chicken',
  'egg',
  'fish',
  'mutton',
  'prawn',
  'pork',
  'keema',
  'kheema',
  'paneer',
  'rajma',
  'chole',
  'chana',
  'chickpea',
  'sprout',
  'sprouts',
  'besan',
  'sattu',
  'dal',
  'lentil',
];

const soulTerms = [
  'idli',
  'dosa',
  'pongal',
  'khichdi',
  'curd rice',
  'dal rice',
  'rasam rice',
  'aloo paratha',
  'ragi porridge',
  'rice porridge',
  'oats porridge',
  'poha',
  'avalakki',
  'upma',
  'kheer',
];

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
}

function titleOf(recipe) {
  return String(recipe.title || recipe.dish_name || recipe.recipe_name || '').trim();
}

function recipeKey(recipe) {
  return String(recipe.sourceId || recipe.id || titleOf(recipe));
}

function tagsFor(recipe) {
  return (recipe.tags || []).map(normalize);
}

function hasTag(recipe, tag) {
  return tagsFor(recipe).includes(normalize(tag));
}

function textFor(recipe) {
  return [
    titleOf(recipe),
    recipe.cuisine,
    recipe.dietType,
    recipe.spiceLevel,
    ...(recipe.tags || []),
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.secondaryIngredient1,
    recipe.secondaryIngredient2,
    recipe.secondaryIngredient3,
    recipe.secondaryIngredient4,
    recipe.secondaryIngredient5,
    ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || ''),
  ].filter(Boolean).join(' ').toLowerCase();
}

function totalTime(recipe) {
  return Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
}

function hasAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function priorityHit(recipe, mood) {
  const title = normalize(titleOf(recipe));
  return (priorityByMood[mood] || []).some((term) => title.includes(term));
}

function isSpicyIdentity(recipe) {
  const tags = tagsFor(recipe);
  const text = textFor(recipe);
  const title = normalize(titleOf(recipe));
  const spiceLevel = normalize(recipe.spiceLevel);
  return tags.includes('spicy-food')
    || tags.includes('spicy')
    || ['spicy', 'very spicy', 'very-spicy', 'extreme'].includes(spiceLevel)
    || hasAny(text, strongSpicyTerms)
    || title.includes('pepper rasam');
}

function hasHighProteinCore(recipe) {
  const text = textFor(recipe);
  const title = normalize(titleOf(recipe));
  const proteinScore = Number(recipe.proteinScore || 0);
  if (proteinScore < 6) return false;
  if (/\b(chicken|egg|fish|mutton|prawn|pork|keema|kheema|paneer|rajma|chole|chana|chickpea|sprout|sprouts|besan|sattu|soya|soy)\b/.test(text)) return true;
  const dalForwardDish = /\b(dal|lentil)\b/.test(title) || /\b(toor dal|moong dal|urad dal|masoor dal|chana dal)\b/.test(text);
  const grainForwardException = /\b(idli|dosa|pongal|khichdi|porridge|upma|poha|rice)\b/.test(title);
  return dalForwardDish && !grainForwardException;
}

function currentMoodScore(recipe, mood) {
  const tags = tagsFor(recipe);
  const text = textFor(recipe);
  if (mood === 'comfort') {
    return Number(recipe.comfortScore || 0) * 10
      + Number(recipe.homeStyleScore || 0) * 3
      + (hasTag(recipe, 'comfort') || hasTag(recipe, 'comfort-food') ? 18 : 0)
      + (hasTag(recipe, 'quick') ? 3 : 0);
  }
  if (mood === 'soul') {
    return Number(recipe.nostalgiaScore || 0) * 8
      + Number(recipe.homeStyleScore || 0) * 5
      + Number(recipe.comfortScore || 0) * 3
      + (hasTag(recipe, 'soul-food') ? 20 : 0);
  }
  if (mood === 'protein') {
    return hasHighProteinCore(recipe)
      ? Number(recipe.proteinScore || 0) * 12 + (tags.includes('high-protein') || tags.includes('protein-rich') ? 16 : 0)
      : Number(recipe.proteinScore || 0);
  }
  if (mood === 'quick') {
    return Math.max(0, 60 - totalTime(recipe))
      + Number(recipe.effortScore ? 10 - recipe.effortScore : 5) * 4
      + (tags.includes('quick') || tags.includes('quick-meal') ? 24 : 0);
  }
  if (mood === 'spicy') {
    return (tags.includes('spicy-food') || tags.includes('spicy') ? 45 : 0)
      + (hasAny(text, spicyRegionalTerms) ? 35 : 0)
      + Number(recipe.comfortScore || 0);
  }
  if (mood === 'rainy') {
    return Number(recipe.rainyDayScore || 0) * 11
      + (tags.includes('rainy-day') || tags.includes('monsoon-favorite') ? 22 : 0)
      + (hasAny(text, priorityByMood.rainy) ? 20 : 0);
  }
  return 0;
}

function auditMoodScore(recipe, mood) {
  const tags = tagsFor(recipe);
  const text = textFor(recipe);
  const title = normalize(titleOf(recipe));
  const spiceMap = { medium: 10, spicy: 25, 'very-spicy': 40, extreme: 55 };
  if (mood === 'comfort') {
    return Number(recipe.comfortScore || 0) * 12
      + Number(recipe.homeStyleScore || 0) * 5
      + Number(recipe.nostalgiaScore || 0) * 2
      + (priorityHit(recipe, mood) ? 90 : 0)
      + (tags.includes('comfort') || tags.includes('comfort-food') ? 20 : 0)
      - (tags.includes('spicy-food') ? 12 : 0);
  }
  if (mood === 'soul') {
    return Number(recipe.nostalgiaScore || 0) * 10
      + Number(recipe.homeStyleScore || 0) * 8
      + Number(recipe.comfortScore || 0) * 3
      + (hasAny(title, soulTerms) ? 45 : 0)
      + (tags.includes('soul-food') || tags.includes('traditional') || tags.includes('home-style') ? 24 : 0)
      - (tags.includes('spicy-food') ? 10 : 0);
  }
  if (mood === 'protein') {
    if (!hasHighProteinCore(recipe)) return -1;
    return Number(recipe.proteinScore || 0) * 16
      + (tags.includes('high-protein') || tags.includes('protein-rich') ? 24 : 0)
      + (hasAny(text, proteinTerms) ? 18 : 0);
  }
  if (mood === 'quick') {
    return Math.max(0, 70 - totalTime(recipe))
      + Number(recipe.effortScore ? 10 - recipe.effortScore : 5) * 5
      + (tags.includes('quick') || tags.includes('quick-meal') ? 30 : 0)
      + (recipe.lowEffort ? 10 : 0);
  }
  if (mood === 'spicy') {
    if (!isSpicyIdentity(recipe)) return -1;
    return (spiceMap[normalize(recipe.spiceLevel)] || 0)
      + (tags.includes('spicy-food') || tags.includes('spicy') ? 55 : 0)
      + (hasAny(text, strongSpicyTerms) || title.includes('pepper rasam') ? 45 : 0)
      + (title.includes('curry') ? 6 : 0);
  }
  if (mood === 'rainy') {
    return Number(recipe.rainyDayScore || 0) * 13
      + (priorityHit(recipe, mood) ? 80 : 0)
      + (tags.includes('rainy-day') || tags.includes('monsoon-favorite') ? 30 : 0)
      + (hasAny(text, priorityByMood.rainy) ? 30 : 0)
      - (tags.includes('street-food') ? 0 : 0);
  }
  return 0;
}

function moodIdentityFit(recipe, mood) {
  const tags = tagsFor(recipe);
  const text = textFor(recipe);
  const title = normalize(titleOf(recipe));
  if (mood === 'protein') {
    return hasHighProteinCore(recipe) ? 220 + Number(recipe.proteinScore || 0) * 8 : -100;
  }
  if (mood === 'spicy') {
    return isSpicyIdentity(recipe)
      ? 210 + auditMoodScore(recipe, mood)
      : auditMoodScore(recipe, mood);
  }
  if (mood === 'rainy') {
    return (priorityHit(recipe, mood) || tags.includes('rainy-day') || tags.includes('monsoon-favorite') || hasAny(text, priorityByMood.rainy))
      ? 200 + auditMoodScore(recipe, mood)
      : auditMoodScore(recipe, mood);
  }
  if (mood === 'comfort') {
    return (priorityHit(recipe, mood) || tags.includes('comfort') || tags.includes('comfort-food'))
      ? 190 + auditMoodScore(recipe, mood)
      : auditMoodScore(recipe, mood);
  }
  if (mood === 'soul') {
    return (hasAny(title, soulTerms) || tags.includes('soul-food') || tags.includes('traditional') || Number(recipe.nostalgiaScore || 0) >= 8)
      ? 175 + auditMoodScore(recipe, mood)
      : auditMoodScore(recipe, mood);
  }
  if (mood === 'quick') {
    return (tags.includes('quick') || tags.includes('quick-meal') || totalTime(recipe) <= 30)
      ? 80 + auditMoodScore(recipe, mood)
      : auditMoodScore(recipe, mood);
  }
  return auditMoodScore(recipe, mood);
}

function rankRecipes(scoreFn, mood, limit = 20, blockedKeys = new Set(), appearanceCounts = new Map(), preferredMoodsByRecipe = new Map()) {
  const rows = recipes
    .map((recipe) => ({ recipe, score: scoreFn(recipe, mood) }))
    .filter((item) => item.score >= 0)
    .filter((item) => !blockedKeys.has(`${recipeKey(item.recipe)}::${mood}`))
    .filter((item) => {
      const preferred = preferredMoodsByRecipe.get(recipeKey(item.recipe));
      return !preferred || preferred.has(mood);
    })
    .filter((item) => (appearanceCounts.get(recipeKey(item.recipe)) || 0) < 2)
    .sort((a, b) => b.score - a.score || titleOf(a.recipe).localeCompare(titleOf(b.recipe)));
  return rows.slice(0, limit);
}

function buildTopMap(scoreFn) {
  const map = new Map();
  for (const mood of moods) {
    map.set(mood.key, rankRecipes(scoreFn, mood.key));
  }
  return map;
}

const currentTopByMood = buildTopMap(currentMoodScore);
const appearances = new Map();
for (const mood of moods) {
  const list = currentTopByMood.get(mood.key);
  list.forEach((item, index) => {
    const key = recipeKey(item.recipe);
    if (!appearances.has(key)) {
      appearances.set(key, { recipe: item.recipe, entries: [] });
    }
    appearances.get(key).entries.push({
      moodKey: mood.key,
      mood: mood.label,
      rankPosition: index + 1,
      score: item.score,
      auditFit: auditMoodScore(item.recipe, mood.key),
      identityFit: moodIdentityFit(item.recipe, mood.key),
    });
  });
}

const violationRows = [...appearances.values()]
  .filter((item) => item.entries.length >= 3)
  .sort((a, b) => b.entries.length - a.entries.length || titleOf(a.recipe).localeCompare(titleOf(b.recipe)))
  .map((item) => ({
    Recipe: titleOf(item.recipe),
    RecipeId: recipeKey(item.recipe),
    MoodCount: item.entries.length,
    AppearsIn: item.entries.map((entry) => entry.mood).join('; '),
    RankPositions: item.entries.map((entry) => `${entry.mood}: ${entry.rankPosition}`).join('; '),
    CurrentScores: item.entries.map((entry) => `${entry.mood}: ${Math.round(entry.score)}`).join('; '),
  }));

const removalRows = [];
for (const item of [...appearances.values()].filter((entry) => entry.entries.length >= 3)) {
  const rankedFits = [...item.entries].sort((a, b) => b.identityFit - a.identityFit || b.auditFit - a.auditFit || a.rankPosition - b.rankPosition);
  const keep = new Set(rankedFits.slice(0, 2).map((entry) => entry.moodKey));
  for (const entry of item.entries) {
    if (keep.has(entry.moodKey)) continue;
    const reason = entry.moodKey === 'protein' && Number(item.recipe.proteinScore || 0) < 6
      ? 'Remove from High Protein because proteinScore is below 6.'
      : `Keep stronger identity moods: ${rankedFits.slice(0, 2).map((kept) => kept.mood).join(' and ')}.`;
    removalRows.push({
      Recipe: titleOf(item.recipe),
      RecipeId: recipeKey(item.recipe),
      RemoveFromMood: entry.mood,
      CurrentRank: entry.rankPosition,
      KeepInMoods: rankedFits.slice(0, 2).map((kept) => kept.mood).join('; '),
      Reason: reason,
    });
  }
}

for (const item of [...appearances.values()]) {
  const proteinEntry = item.entries.find((entry) => entry.moodKey === 'protein');
  if (proteinEntry && Number(item.recipe.proteinScore || 0) < 6) {
    removalRows.push({
      Recipe: titleOf(item.recipe),
      RecipeId: recipeKey(item.recipe),
      RemoveFromMood: 'High Protein',
      CurrentRank: proteinEntry.rankPosition,
      KeepInMoods: item.entries.filter((entry) => entry.moodKey !== 'protein').map((entry) => entry.mood).slice(0, 2).join('; '),
      Reason: `proteinScore is ${Number(item.recipe.proteinScore || 0)}, below required 6.`,
    });
  }
}

const blockedPairs = new Set(removalRows.map((row) => `${row.RecipeId}::${moods.find((mood) => mood.label === row.RemoveFromMood)?.key}`));
const preliminaryAuditAppearances = new Map();
for (const mood of moods) {
  const ranked = rankRecipes(auditMoodScore, mood.key, 40);
  ranked.forEach((item, index) => {
    const key = recipeKey(item.recipe);
    if (!preliminaryAuditAppearances.has(key)) preliminaryAuditAppearances.set(key, []);
    preliminaryAuditAppearances.get(key).push({
      moodKey: mood.key,
      rankPosition: index + 1,
      identityFit: moodIdentityFit(item.recipe, mood.key),
      auditFit: auditMoodScore(item.recipe, mood.key),
    });
  });
}

const preferredMoodsByRecipe = new Map();
for (const [key, entries] of preliminaryAuditAppearances.entries()) {
  if (entries.length <= 2) continue;
  const preferred = new Set(
    [...entries]
      .sort((a, b) => b.identityFit - a.identityFit || b.auditFit - a.auditFit || a.rankPosition - b.rankPosition)
      .slice(0, 2)
      .map((entry) => entry.moodKey),
  );
  preferredMoodsByRecipe.set(key, preferred);
}

const previewRows = [];
const previewAppearanceCounts = new Map();
for (const mood of moods) {
  const ranked = rankRecipes(auditMoodScore, mood.key, recipes.length, blockedPairs, previewAppearanceCounts, preferredMoodsByRecipe)
    .slice(0, 20);
  ranked.forEach((item, index) => {
    const key = recipeKey(item.recipe);
    previewAppearanceCounts.set(key, (previewAppearanceCounts.get(key) || 0) + 1);
    previewRows.push({
      Mood: mood.label,
      Rank: index + 1,
      Recipe: titleOf(item.recipe),
      RecipeId: key,
      PreviewScore: Math.round(item.score * 10) / 10,
      ProteinScore: Number(item.recipe.proteinScore || 0),
      ComfortScore: Number(item.recipe.comfortScore || 0),
      RainyDayScore: Number(item.recipe.rainyDayScore || 0),
      NostalgiaScore: Number(item.recipe.nostalgiaScore || 0),
      HomeStyleScore: Number(item.recipe.homeStyleScore || 0),
    });
  });
}

const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
function writeCsv(filePath, headers, rows) {
  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n') + '\n';
  fs.writeFileSync(filePath, csv);
}

writeCsv(violationsCsvPath, ['Recipe', 'RecipeId', 'MoodCount', 'AppearsIn', 'RankPositions', 'CurrentScores'], violationRows);
writeCsv(removalsCsvPath, ['Recipe', 'RecipeId', 'RemoveFromMood', 'CurrentRank', 'KeepInMoods', 'Reason'], removalRows);
writeCsv(previewCsvPath, ['Mood', 'Rank', 'Recipe', 'RecipeId', 'PreviewScore', 'ProteinScore', 'ComfortScore', 'RainyDayScore', 'NostalgiaScore', 'HomeStyleScore'], previewRows);

fs.writeFileSync(summaryJsonPath, JSON.stringify({
  checkedCoreRecipes: recipes.length,
  moods: moods.map((mood) => mood.label),
  violationCount3PlusMoods: violationRows.length,
  suggestedRemovalCount: removalRows.length,
  updatedPreviewRows: previewRows.length,
  outputs: {
    violationsCsv: violationsCsvPath,
    suggestedRemovalsCsv: removalsCsvPath,
    updatedPreviewCsv: previewCsvPath,
    summaryJson: summaryJsonPath,
  },
  topViolations: violationRows.slice(0, 12),
  topSuggestedRemovals: removalRows.slice(0, 20),
}, null, 2));

console.log(JSON.stringify({
  checkedCoreRecipes: recipes.length,
  violationCount3PlusMoods: violationRows.length,
  suggestedRemovalCount: removalRows.length,
  updatedPreviewRows: previewRows.length,
  violationsCsv: violationsCsvPath,
  suggestedRemovalsCsv: removalsCsvPath,
  updatedPreviewCsv: previewCsvPath,
  summaryJson: summaryJsonPath,
}, null, 2));
