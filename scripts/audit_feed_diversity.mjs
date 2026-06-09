import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const recipesPath = path.join(rootDir, 'database', 'generated', 'recipes.json');
const reportsDir = path.join(rootDir, 'database', 'generated', 'reports');

const moods = [
  { key: 'comfort', label: 'Comfort Food' },
  { key: 'soul', label: 'Soul Food' },
  { key: 'protein', label: 'High Protein' },
  { key: 'quick', label: 'Quick & Easy' },
  { key: 'spicy', label: 'Spicy Food' },
  { key: 'rainy', label: 'Rainy Day' },
];

const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'))
  .filter((recipe) => (recipe.recipeType || recipe.recipe_type || 'core') === 'core');

fs.mkdirSync(reportsDir, { recursive: true });

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(filePath, headers, rows) {
  const lines = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ];
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`);
}

function tagsOf(recipe) {
  return Array.isArray(recipe.tags) ? recipe.tags.map((tag) => String(tag).toLowerCase()) : [];
}

function textOf(recipe) {
  return [recipe.title, recipe.sourceId, ...(recipe.tags || [])].join(' ').toLowerCase();
}

function totalTime(recipe) {
  return Number(recipe.timeMinutes || ((recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)) || 0);
}

function hasHighProteinCore(recipe) {
  const text = [
    recipe.title,
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2,
    ...(recipe.tags || []),
  ].join(' ').toLowerCase();
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

function mealTypes(recipe) {
  const raw = [
    recipe.mealType,
    recipe.meal_type,
    recipe.meal_type_name,
    recipe.meal,
  ].filter(Boolean).join(',');
  const tags = tagsOf(recipe);
  const found = new Set();
  const combined = `${raw},${tags.join(',')}`.toLowerCase();
  if (/\bbreakfast\b/.test(combined)) found.add('Breakfast');
  if (/\blunch\b/.test(combined)) found.add('Lunch');
  if (/\bdinner\b/.test(combined)) found.add('Dinner');
  if (/\bsnack|snacks\b/.test(combined)) found.add('Snacks');
  if (!found.size) found.add('Unknown');
  return [...found];
}

function rankedForMood(mood) {
  return recipes
    .map((recipe) => ({
      recipe,
      fitScore: moodLensScore(recipe, mood.key),
      matchesMood: recipeMatchesMood(recipe, mood.key),
    }))
    .sort((a, b) => (
      Number(b.matchesMood) - Number(a.matchesMood)
      || b.fitScore - a.fitScore
      || String(a.recipe.title).localeCompare(String(b.recipe.title))
    ));
}

function countMealTypes(items) {
  const counts = {
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0,
    Snacks: 0,
    Unknown: 0,
  };
  for (const item of items) {
    for (const type of mealTypes(item.recipe)) counts[type] += 1;
  }
  return counts;
}

function topMealType(counts) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return entries[0];
}

const distributionRows = [];
const dinnerRows = [];
const dominanceRows = [];
const top20Rows = [];
const summary = {};

for (const mood of moods) {
  const ranked = rankedForMood(mood);
  const top20 = ranked.slice(0, 20);
  const counts = countMealTypes(top20);
  const [dominantType, dominantCount] = topMealType(counts);
  const topMealTypePct = Math.round((dominantCount / 20) * 100);
  const dinnerTop = top20.filter((item) => mealTypes(item.recipe).includes('Dinner'));
  const dinnerAvailable = ranked.filter((item) => mealTypes(item.recipe).includes('Dinner') && item.matchesMood);
  const dinnerMissing = dinnerAvailable.filter((item) => !top20.includes(item));
  const possibleDinnerCandidates = dinnerMissing.slice(0, 8).map((item) => `${item.recipe.title} (${item.fitScore})`).join('; ');
  const flags = [];
  if (topMealTypePct > 70) flags.push(`${dominantType} dominates ${topMealTypePct}% of Top 20`);
  if (dinnerTop.length <= 1) flags.push(`Dinner count is ${dinnerTop.length} in Top 20`);
  if (counts.Unknown > 0) flags.push(`${counts.Unknown} unknown mealType item(s) in Top 20`);
  if (mood.key === 'soul' && counts.Breakfast / 20 > 0.5) flags.push('Soul Food is breakfast-heavy');
  if (mood.key === 'quick' && (counts.Breakfast + counts.Snacks) / 20 > 0.7) flags.push('Quick & Easy is breakfast/snack-heavy');
  if (mood.key === 'rainy' && counts.Snacks / 20 > 0.5) flags.push('Rainy Day is snack-heavy');
  if (dinnerMissing.length >= 5) flags.push('Valid dinner recipes are being pushed below Top 20');

  const suggestions = [];
  if (counts.Unknown > 0) suggestions.push('Fix missing mealType tags for Top 20 recipes.');
  if (topMealTypePct > 70 || dinnerTop.length <= 1 || dinnerMissing.length >= 5) suggestions.push('Add a feed diversity boost so strong dinner candidates are surfaced.');
  if (dinnerAvailable.length < 6) suggestions.push('Add or re-tag more dinner recipes for this mood.');
  if (mood.key === 'quick' && dinnerTop.length <= 1) suggestions.push('Add quick dinner recipes or give quick lunch/dinner meals a small boost.');
  if (mood.key === 'soul' && counts.Breakfast / 20 > 0.5) suggestions.push('Broaden Soul Food with more dinner/lunch home-style classics.');
  if (mood.key === 'rainy' && counts.Snacks / 20 > 0.5) suggestions.push('Balance rainy snacks with soups, rasam, khichdi, and warm dinners.');

  distributionRows.push({
    Mood: mood.label,
    'Breakfast Count': counts.Breakfast,
    'Lunch Count': counts.Lunch,
    'Dinner Count': counts.Dinner,
    'Snacks Count': counts.Snacks,
    'Unknown Count': counts.Unknown,
    'Top Meal Type': dominantType,
    'Top Meal Type Percentage': `${topMealTypePct}%`,
  });

  dinnerRows.push({
    Mood: mood.label,
    'Dinner Recipes in Top 20': dinnerTop.length,
    'Dinner Recipes Available Overall': dinnerAvailable.length,
    'Dinner Recipes Missing From Top 20': dinnerMissing.length,
    'Possible Dinner Candidates': possibleDinnerCandidates,
  });

  dominanceRows.push({
    Mood: mood.label,
    Flags: flags.length ? flags.join('; ') : 'SAFE',
    Recommendation: suggestions.length ? [...new Set(suggestions)].join('; ') : 'No action needed.',
  });

  top20.forEach((item, index) => {
    top20Rows.push({
      Mood: mood.label,
      Rank: index + 1,
      Recipe: item.recipe.title,
      RecipeId: item.recipe.id,
      SourceId: item.recipe.sourceId,
      MealTypes: mealTypes(item.recipe).join('; '),
      FitScore: item.fitScore,
      PrimaryMood: item.recipe.primaryMood || '',
      SecondaryMood: item.recipe.secondaryMood || '',
      MatchesMood: item.matchesMood ? 'TRUE' : 'FALSE',
    });
  });

  summary[mood.label] = {
    mealTypeDistribution: counts,
    topMealType: dominantType,
    topMealTypePercentage: `${topMealTypePct}%`,
    dinnerRecipesInTop20: dinnerTop.length,
    dinnerRecipesAvailableOverall: dinnerAvailable.length,
    dinnerRecipesMissingFromTop20: dinnerMissing.length,
    possibleDinnerCandidates: dinnerMissing.slice(0, 8).map((item) => item.recipe.title),
    flags,
    recommendations: [...new Set(suggestions)],
  };
}

const distributionPath = path.join(reportsDir, 'feed_diversity_meal_type_distribution.csv');
const dinnerPath = path.join(reportsDir, 'feed_diversity_dinner_availability.csv');
const flagsPath = path.join(reportsDir, 'feed_diversity_flags.csv');
const top20Path = path.join(reportsDir, 'feed_diversity_top20_by_mood.csv');
const summaryPath = path.join(reportsDir, 'feed_diversity_audit_summary.json');

writeCsv(distributionPath, [
  'Mood',
  'Breakfast Count',
  'Lunch Count',
  'Dinner Count',
  'Snacks Count',
  'Unknown Count',
  'Top Meal Type',
  'Top Meal Type Percentage',
], distributionRows);

writeCsv(dinnerPath, [
  'Mood',
  'Dinner Recipes in Top 20',
  'Dinner Recipes Available Overall',
  'Dinner Recipes Missing From Top 20',
  'Possible Dinner Candidates',
], dinnerRows);

writeCsv(flagsPath, ['Mood', 'Flags', 'Recommendation'], dominanceRows);
writeCsv(top20Path, ['Mood', 'Rank', 'Recipe', 'RecipeId', 'SourceId', 'MealTypes', 'FitScore', 'PrimaryMood', 'SecondaryMood', 'MatchesMood'], top20Rows);
fs.writeFileSync(summaryPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  recipeCount: recipes.length,
  reports: {
    distribution: distributionPath,
    dinnerAvailability: dinnerPath,
    flags: flagsPath,
    top20: top20Path,
    summary: summaryPath,
  },
  summary,
}, null, 2)}\n`);

console.log(JSON.stringify({
  recipeCount: recipes.length,
  distributionRows,
  dinnerRows,
  dominanceRows,
  reports: {
    distribution: distributionPath,
    dinnerAvailability: dinnerPath,
    flags: flagsPath,
    top20: top20Path,
    summary: summaryPath,
  },
}, null, 2));
