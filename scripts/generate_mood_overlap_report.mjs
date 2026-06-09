import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const localRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const topCsvPath = path.join(reportsDir, 'mood_top20_report.csv');
const overlapCsvPath = path.join(reportsDir, 'mood_overlap_report.csv');
const summaryJsonPath = path.join(reportsDir, 'mood_overlap_summary.json');

fs.mkdirSync(reportsDir, { recursive: true });

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(localRecipesPath, 'utf8'), context);
const recipes = (context.window.COOKBUDDY_LOCAL_RECIPES || [])
  .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');

const normalize = (value) => String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
const tagsFor = (recipe) => (recipe.tags || []).map(normalize);
const hasTag = (recipe, tag) => tagsFor(recipe).includes(normalize(tag));
const textFor = (recipe) => [
  recipe.title,
  ...(recipe.tags || []),
  recipe.primaryIngredient1,
  recipe.primaryIngredient2,
  recipe.secondaryIngredient1,
  recipe.secondaryIngredient2,
  recipe.secondaryIngredient3,
  ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || ''),
].filter(Boolean).join(' ').toLowerCase();
const totalTime = (recipe) => Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);

function hasHighProteinCore(recipe) {
  const text = textFor(recipe);
  const title = normalize(recipe.title);
  const obviousProtein = /\b(chicken|egg|fish|mutton|prawn|pork|keema|kheema|paneer|rajma|chole|chana|chickpea|sprout|sprouts|besan|sattu|soya|soy)\b/;
  if (obviousProtein.test(text)) return true;
  const dalForwardDish = /\b(dal|lentil)\b/.test(title) || /\b(toor dal|moong dal|urad dal|masoor dal|chana dal)\b/.test(text);
  const grainForwardException = /\b(idli|dosa|pongal|khichdi|porridge|upma|poha|rice)\b/.test(title);
  return dalForwardDish && !grainForwardException;
}

const moods = [
  { key: 'comfort', label: 'Comfort Food' },
  { key: 'soul', label: 'Soul Food' },
  { key: 'protein', label: 'High Protein' },
  { key: 'quick', label: 'Quick & Easy' },
  { key: 'spicy', label: 'Spicy Food' },
  { key: 'rainy', label: 'Rainy Day' },
];

function moodScore(recipe, mood) {
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
      ? Number(recipe.proteinScore || 0) * 12 + (hasTag(recipe, 'high-protein') || hasTag(recipe, 'protein-rich') ? 16 : 0)
      : Number(recipe.proteinScore || 0);
  }
  if (mood === 'quick') {
    return Math.max(0, 60 - totalTime(recipe))
      + Number(recipe.effortScore ? 10 - recipe.effortScore : 5) * 4
      + (hasTag(recipe, 'quick') || hasTag(recipe, 'quick-meal') ? 24 : 0);
  }
  if (mood === 'spicy') {
    return (hasTag(recipe, 'spicy-food') || hasTag(recipe, 'spicy') ? 45 : 0)
      + (/\b(chilli|chili|mirchi|pepper|podi|chettinad|kolhapuri|schezwan|laal|salan|guntur|madras)\b/.test(text) ? 35 : 0)
      + Number(recipe.comfortScore || 0);
  }
  if (mood === 'rainy') {
    return Number(recipe.rainyDayScore || 0) * 11
      + (hasTag(recipe, 'rainy-day') || hasTag(recipe, 'monsoon-favorite') ? 22 : 0)
      + (/\b(pakora|bajji|bonda|chai|rasam|soup|khichdi|pongal)\b/.test(text) ? 20 : 0);
  }
  return 0;
}

function recipeKey(recipe) {
  return String(recipe.id || recipe.sourceId || recipe.title);
}

const topRows = [];
const topByMood = new Map();
for (const mood of moods) {
  const top = [...recipes]
    .map((recipe) => ({ recipe, score: moodScore(recipe, mood.key) }))
    .sort((a, b) => b.score - a.score || a.recipe.title.localeCompare(b.recipe.title))
    .slice(0, 20);
  topByMood.set(mood.key, top);
  top.forEach((item, index) => {
    topRows.push({
      mood: mood.label,
      rankPosition: index + 1,
      recipe: item.recipe.title,
      recipeId: recipeKey(item.recipe),
      score: Math.round(item.score * 10) / 10,
    });
  });
}

const appearances = new Map();
for (const mood of moods) {
  for (const item of topByMood.get(mood.key)) {
    const key = recipeKey(item.recipe);
    if (!appearances.has(key)) appearances.set(key, { recipe: item.recipe.title, entries: [] });
    appearances.get(key).entries.push({
      mood: mood.label,
      rankPosition: topByMood.get(mood.key).indexOf(item) + 1,
    });
  }
}

const overlapRows = [...appearances.values()]
  .filter((item) => item.entries.length > 1)
  .sort((a, b) => b.entries.length - a.entries.length || a.recipe.localeCompare(b.recipe))
  .map((item) => ({
    Recipe: item.recipe,
    'Appears In': item.entries.map((entry) => entry.mood).join('; '),
    'Rank Position': item.entries.map((entry) => `${entry.mood}: ${entry.rankPosition}`).join('; '),
    'Mood Count': item.entries.length,
  }));

const totalSlots = moods.length * 20;
const uniqueTopRecipes = appearances.size;
const repeatedRecipeCount = overlapRows.length;
const overlapPercentage = Math.round(((totalSlots - uniqueTopRecipes) / totalSlots) * 1000) / 10;

const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
function writeCsv(filePath, headers, rows) {
  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n') + '\n';
  fs.writeFileSync(filePath, csv);
}

writeCsv(topCsvPath, ['mood', 'rankPosition', 'recipe', 'recipeId', 'score'], topRows);
writeCsv(overlapCsvPath, ['Recipe', 'Appears In', 'Rank Position', 'Mood Count'], overlapRows);
fs.writeFileSync(summaryJsonPath, JSON.stringify({
  totalMoodSlots: totalSlots,
  uniqueTopRecipes,
  repeatedRecipeCount,
  overlapPercentage,
  topRepeatedRecipes: overlapRows.slice(0, 20),
}, null, 2));

console.log(JSON.stringify({
  topCsv: topCsvPath,
  overlapCsv: overlapCsvPath,
  summaryJson: summaryJsonPath,
  totalMoodSlots: totalSlots,
  uniqueTopRecipes,
  repeatedRecipeCount,
  overlapPercentage,
}, null, 2));
