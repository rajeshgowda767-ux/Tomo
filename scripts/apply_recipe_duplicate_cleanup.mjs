import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const recipesJsonPath = path.join(root, 'database', 'generated', 'recipes.json');
const localRecipesPath = path.join(root, 'frontend', 'local-recipes.js');

const moodDefs = [
  { key: 'comfort', label: 'Comfort Food' },
  { key: 'soul', label: 'Soul Food' },
  { key: 'protein', label: 'High Protein' },
  { key: 'quick', label: 'Quick & Easy' },
  { key: 'spicy', label: 'Spicy Food' },
  { key: 'rainy', label: 'Rainy Day' }
];

function csvEscape(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function writeCsv(filename, headers, rows) {
  fs.writeFileSync(
    path.join(reportsDir, filename),
    `${[headers.join(','), ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(','))].join('\n')}\n`
  );
}

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function readLocalRecipes() {
  const text = fs.readFileSync(localRecipesPath, 'utf8');
  const match = text.match(/window\.COOKBUDDY_LOCAL_RECIPES\s*=\s*(\[[\s\S]*\]);/);
  if (!match) throw new Error('Could not parse frontend/local-recipes.js');
  return JSON.parse(match[1]);
}

function writeLocalRecipes(recipes) {
  fs.writeFileSync(localRecipesPath, `window.COOKBUDDY_LOCAL_RECIPES = ${JSON.stringify(recipes, null, 2)};\n`);
}

function readRecipesFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeRecipesFile(filePath, recipes) {
  fs.writeFileSync(filePath, `${JSON.stringify(recipes, null, 2)}\n`);
}

function coreRecipes(recipes) {
  return recipes.filter((recipe) => String(recipe.recipe_type || recipe.recipeType || 'core').toLowerCase() === 'core');
}

function tags(recipe) {
  return (recipe.tags || []).map((tag) => String(tag).toLowerCase());
}

function totalTime(recipe) {
  return Number(recipe.timeMinutes || 0) || Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0) || 0;
}

function textFor(recipe) {
  return `${recipe.title || ''} ${(recipe.tags || []).join(' ')} ${recipe.primaryIngredient1 || ''} ${recipe.primaryIngredient2 || ''} ${recipe.primary_ingredient_1 || ''} ${recipe.primary_ingredient_2 || ''} ${(recipe.ingredients || []).map((ingredient) => ingredient.name).join(' ')}`.toLowerCase();
}

function mealType(recipe) {
  const explicit = String(recipe.meal_type || recipe.mealType || recipe.category || '').trim();
  if (explicit) return explicit;
  const recipeTags = tags(recipe);
  const meals = [];
  if (recipeTags.includes('breakfast')) meals.push('Breakfast');
  if (recipeTags.includes('lunch')) meals.push('Lunch');
  if (recipeTags.includes('dinner')) meals.push('Dinner');
  if (recipeTags.includes('snack') || recipeTags.includes('snacks')) meals.push('Snacks');
  return meals.join(',') || 'Unknown';
}

function primaryIngredients(recipe) {
  return [
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2
  ].filter(Boolean).map(normalize).filter((value, index, list) => list.indexOf(value) === index).join(' + ');
}

function secondaryIngredients(recipe) {
  return [
    recipe.secondaryIngredient1,
    recipe.secondaryIngredient2,
    recipe.secondaryIngredient3,
    recipe.secondaryIngredient4,
    recipe.secondaryIngredient5,
    recipe.secondary_ingredient_1,
    recipe.secondary_ingredient_2,
    recipe.secondary_ingredient_3,
    recipe.secondary_ingredient_4,
    recipe.secondary_ingredient_5
  ].filter(Boolean).map(normalize).filter((value, index, list) => list.indexOf(value) === index).join(' + ');
}

function hasHighProteinCore(recipe) {
  const combined = textFor(recipe);
  const obviousProtein = /\b(chicken|egg|fish|mutton|prawn|pork|keema|kheema|paneer|rajma|chole|chana|chickpea|sprout|sprouts|besan|sattu|soya|soy)\b/;
  if (obviousProtein.test(combined)) return true;
  const title = String(recipe.title || '').toLowerCase();
  const dalForwardDish = /\b(dal|lentil)\b/.test(title) || /\b(toor dal|moong dal|urad dal|masoor dal|chana dal)\b/.test(combined);
  const grainForwardException = /\b(idli|dosa|pongal|khichdi|porridge|upma|poha|rice)\b/.test(title);
  return dalForwardDish && !grainForwardException;
}

function recipeMatchesMood(recipe, mood) {
  const recipeTags = tags(recipe);
  const text = textFor(recipe);
  if (mood === 'spicy') {
    return recipeTags.includes('spicy-food')
      || recipeTags.includes('spicy')
      || /\b(chilli|chili|mirchi|pepper|podi|chettinad|kolhapuri|schezwan|laal|salan|guntur)\b/.test(text);
  }
  if (mood === 'quick') return recipeTags.includes('quick') || recipeTags.includes('quick-meal') || totalTime(recipe) <= 25;
  if (mood === 'rainy') return recipeTags.includes('rainy-day') || /\b(rasam|soup|chai|pakora|bajji|bonda)\b/.test(text);
  if (mood === 'protein') return hasHighProteinCore(recipe);
  if (mood === 'soul') return recipeTags.includes('soul-food');
  return recipeTags.includes('comfort') || recipeTags.includes('comfort-food') || Number(recipe.comfortScore || 0) >= 7;
}

function moodLensScore(recipe, mood) {
  const recipeTags = tags(recipe);
  const text = textFor(recipe);
  const time = totalTime(recipe);
  if (mood === 'comfort') return Number(recipe.comfortScore || 0) * 10 + Number(recipe.homeStyleScore || 0) * 3 + (recipeMatchesMood(recipe, mood) ? 18 : 0);
  if (mood === 'soul') return Number(recipe.nostalgiaScore || 0) * 8 + Number(recipe.homeStyleScore || 0) * 5 + Number(recipe.comfortScore || 0) * 3 + (recipeTags.includes('soul-food') ? 20 : 0);
  if (mood === 'protein') return hasHighProteinCore(recipe) ? Number(recipe.proteinScore || 0) * 12 + (recipeTags.includes('high-protein') || recipeTags.includes('protein-rich') ? 16 : 0) : Number(recipe.proteinScore || 0);
  if (mood === 'quick') return Math.max(0, 60 - time) + (recipeTags.includes('quick') || recipeTags.includes('quick-meal') ? 24 : 0) + Math.max(0, 10 - Number(recipe.effortScore || 5)) * 4;
  if (mood === 'spicy') return (recipeTags.includes('spicy-food') || recipeTags.includes('spicy') ? 45 : 0) + (/\b(chilli|chili|mirchi|pepper|podi|chettinad|kolhapuri|schezwan|laal|salan|guntur|madras)\b/.test(text) ? 35 : 0) + Number(recipe.comfortScore || 0);
  if (mood === 'rainy') return Number(recipe.rainyDayScore || 0) * 11 + (recipeTags.includes('rainy-day') || recipeTags.includes('monsoon-favorite') ? 22 : 0) + (/\b(pakora|bajji|bonda|chai|rasam|soup|khichdi|pongal)\b/.test(text) ? 20 : 0);
  return 0;
}

function moodCounts(recipes) {
  const counts = Object.fromEntries(moodDefs.map((mood) => [mood.label, { primary: 0, secondary: 0, total: 0 }]));
  for (const recipe of coreRecipes(recipes)) {
    if (counts[recipe.primaryMood]) {
      counts[recipe.primaryMood].primary += 1;
      counts[recipe.primaryMood].total += 1;
    }
    if (counts[recipe.secondaryMood]) {
      counts[recipe.secondaryMood].secondary += 1;
      counts[recipe.secondaryMood].total += 1;
    }
  }
  return counts;
}

function top20Rows(recipes) {
  const rows = [];
  for (const mood of moodDefs) {
    const ranked = [...coreRecipes(recipes)]
      .sort((a, b) => moodLensScore(b, mood.key) - moodLensScore(a, mood.key) || String(a.title).localeCompare(String(b.title)))
      .slice(0, 20);
    ranked.forEach((recipe, index) => rows.push({
      mood: mood.label,
      rank: index + 1,
      recipe: recipe.title,
      recipe_id: recipe.id || recipe.sourceId || '',
      source_id: recipe.sourceId || '',
      mealType: mealType(recipe),
      primaryMood: recipe.primaryMood || '',
      secondaryMood: recipe.secondaryMood || '',
      fitScore: moodLensScore(recipe, mood.key),
      tags: (recipe.tags || []).join('; ')
    }));
  }
  return rows;
}

function duplicateGroups(recipes) {
  const byTitle = new Map();
  for (const recipe of coreRecipes(recipes)) {
    const key = normalize(recipe.title);
    if (!byTitle.has(key)) byTitle.set(key, []);
    byTitle.get(key).push(recipe);
  }
  const groups = [];
  for (const [key, list] of byTitle.entries()) {
    if (list.length <= 1) continue;
    const mealTypes = [...new Set(list.map(mealType))];
    const signatures = [...new Set(list.map((recipe) => [
      primaryIngredients(recipe),
      secondaryIngredients(recipe),
      totalTime(recipe),
      recipe.primaryMood || '',
      recipe.secondaryMood || '',
      tags(recipe).sort().join('|')
    ].join(' :: ')))];
    const primarySet = [...new Set(list.map(primaryIngredients))];
    const secondarySet = [...new Set(list.map(secondaryIngredients))];
    const timeSet = [...new Set(list.map(totalTime))];
    const moods = [...new Set(list.flatMap((recipe) => [recipe.primaryMood, recipe.secondaryMood].filter(Boolean)))];
    let status = 'SAFE DUPLICATE';
    let rationale = 'Intentional variant appears to differ by meal type or preparation context.';
    if (signatures.length === 1) {
      status = 'PROBLEM DUPLICATE';
      rationale = 'Records have identical recipe signature and should be merged.';
    } else if (primarySet.length === 1 && secondarySet.length === 1 && timeSet.length === 1 && moods.length <= 2) {
      status = 'PROBLEM DUPLICATE';
      rationale = 'Same core ingredients/time/mood with only small metadata differences; likely should merge.';
    } else if (mealTypes.length > 1) {
      status = 'SAFE DUPLICATE';
      rationale = 'Same recipe name appears as meal-type variant; keep only if product intentionally supports meal-specific cards.';
    } else {
      status = 'PROBLEM DUPLICATE';
      rationale = 'Same recipe name under same meal context with different metadata; review and merge or rename.';
    }
    groups.push({
      recipe: list[0].title,
      recipe_key: key,
      recipe_ids: list.map((recipe) => recipe.id || recipe.sourceId || '').join('; '),
      record_count: list.length,
      mealTypes: mealTypes.join('; '),
      primaryIngredientSets: primarySet.join(' || '),
      secondaryIngredientSets: secondarySet.join(' || '),
      timeMinutesSet: timeSet.join('; '),
      moods: moods.join('; '),
      status,
      rationale
    });
  }
  return groups;
}

function summarize(recipes) {
  const duplicateRows = duplicateGroups(recipes);
  return {
    recipeCount: recipes.length,
    coreRecipeCount: coreRecipes(recipes).length,
    moodCounts: moodCounts(recipes),
    duplicateNameGroups: duplicateRows.length,
    problemDuplicateGroups: duplicateRows.filter((row) => row.status === 'PROBLEM DUPLICATE').length,
    safeDuplicateGroups: duplicateRows.filter((row) => row.status === 'SAFE DUPLICATE').length
  };
}

function bySourceId(recipes, sourceId) {
  const recipe = recipes.find((item) => item.sourceId === sourceId);
  if (!recipe) throw new Error(`Missing recipe ${sourceId}`);
  return recipe;
}

function maxScore(records, key) {
  return Math.max(...records.map((record) => Number(record[key] || 0)));
}

function setSecondary(recipe, values) {
  for (let index = 1; index <= 5; index += 1) {
    recipe[`secondary_ingredient_${index}`] = values[index - 1] || null;
    recipe[`secondaryIngredient${index}`] = values[index - 1] || null;
  }
}

function mergeRecipes(recipes) {
  const beforeRecords = recipes
    .filter((recipe) => ['khichdi-dinner', 'khichdi-lunch', 'dal-makhani-dinner', 'dal-makhani-lunch', 'mirchi-bajji', 'mirchi-bajji-snack'].includes(recipe.sourceId))
    .map((recipe) => ({
      action: 'before',
      title: recipe.title,
      id: recipe.id || '',
      sourceId: recipe.sourceId || '',
      mealType: mealType(recipe),
      tags: (recipe.tags || []).join('; '),
      timeMinutes: totalTime(recipe),
      primaryMood: recipe.primaryMood || '',
      secondaryMood: recipe.secondaryMood || ''
    }));

  const khichdiDinner = bySourceId(recipes, 'khichdi-dinner');
  const khichdiLunch = bySourceId(recipes, 'khichdi-lunch');
  khichdiDinner.sourceId = 'khichdi';
  khichdiDinner.mealType = 'Lunch,Dinner';
  khichdiDinner.meal_type = 'Lunch,Dinner';
  khichdiDinner.tags = ['lunch', 'dinner', 'vegetarian', 'one-pot', 'comfort', 'rainy-day'];
  khichdiDinner.timeMinutes = 30;
  khichdiDinner.prepTimeMinutes = 10;
  khichdiDinner.cookTimeMinutes = 20;
  khichdiDinner.comfortScore = maxScore([khichdiDinner, khichdiLunch], 'comfortScore');
  khichdiDinner.rainyDayScore = maxScore([khichdiDinner, khichdiLunch], 'rainyDayScore');
  khichdiDinner.nostalgiaScore = maxScore([khichdiDinner, khichdiLunch], 'nostalgiaScore');
  khichdiDinner.homeStyleScore = maxScore([khichdiDinner, khichdiLunch], 'homeStyleScore');
  khichdiDinner.primaryMood = 'Comfort Food';
  khichdiDinner.secondaryMood = 'Rainy Day';
  khichdiDinner.mergedSourceIds = ['khichdi-dinner', 'khichdi-lunch'];

  const dalDinner = bySourceId(recipes, 'dal-makhani-dinner');
  const dalLunch = bySourceId(recipes, 'dal-makhani-lunch');
  dalDinner.sourceId = 'dal-makhani';
  dalDinner.mealType = 'Lunch,Dinner';
  dalDinner.meal_type = 'Lunch,Dinner';
  dalDinner.tags = ['lunch', 'dinner', 'vegetarian', 'comfort'];
  dalDinner.timeMinutes = 30;
  dalDinner.prepTimeMinutes = 10;
  dalDinner.cookTimeMinutes = 20;
  dalDinner.comfortScore = maxScore([dalDinner, dalLunch], 'comfortScore');
  dalDinner.rainyDayScore = maxScore([dalDinner, dalLunch], 'rainyDayScore');
  dalDinner.nostalgiaScore = maxScore([dalDinner, dalLunch], 'nostalgiaScore');
  dalDinner.homeStyleScore = maxScore([dalDinner, dalLunch], 'homeStyleScore');
  dalDinner.primaryMood = 'Comfort Food';
  dalDinner.secondaryMood = '';
  dalDinner.mergedSourceIds = ['dal-makhani-dinner', 'dal-makhani-lunch'];

  const mirchi = bySourceId(recipes, 'mirchi-bajji');
  const mirchiSnack = bySourceId(recipes, 'mirchi-bajji-snack');
  mirchi.mealType = 'Snacks';
  mirchi.meal_type = 'Snacks';
  mirchi.tags = ['snack', 'south-indian', 'vegetarian', 'rainy-day', 'late-night-food'];
  mirchi.timeMinutes = 25;
  mirchi.prepTimeMinutes = 8;
  mirchi.cookTimeMinutes = 17;
  mirchi.dietType = 'vegetarian';
  mirchi.primaryMood = 'Rainy Day';
  mirchi.secondaryMood = '';
  mirchi.proteinScore = maxScore([mirchi, mirchiSnack], 'proteinScore');
  mirchi.comfortScore = maxScore([mirchi, mirchiSnack], 'comfortScore');
  mirchi.rainyDayScore = maxScore([mirchi, mirchiSnack], 'rainyDayScore');
  mirchi.homeStyleScore = maxScore([mirchi, mirchiSnack], 'homeStyleScore');
  mirchi.primary_ingredient_1 = 'Green Chilli';
  mirchi.primary_ingredient_2 = 'Besan';
  mirchi.primaryIngredient1 = 'Green Chilli';
  mirchi.primaryIngredient2 = 'Besan';
  mirchi.primaryIngredients = ['Green Chilli', 'Besan'];
  setSecondary(mirchi, ['Ajwain', 'Oil', 'Chilli']);
  mirchi.ingredients = [
    { name: 'Green Chilli', quantity: 1, unit: 'g', role: 'required', isMain: true },
    { name: 'Besan', quantity: 1, unit: 'g', role: 'required', isMain: true },
    { name: 'Ajwain', quantity: 1, unit: 'g', role: 'flavor-base', isMain: false },
    { name: 'Oil', quantity: 1, unit: 'g', role: 'cooking-fat', isMain: false },
    { name: 'Chilli', quantity: 1, unit: 'g', role: 'flavor-base', isMain: false }
  ];
  mirchi.mergedSourceIds = ['mirchi-bajji', 'mirchi-bajji-snack'];

  const removeSourceIds = new Set(['khichdi-lunch', 'dal-makhani-lunch', 'mirchi-bajji-snack']);
  const merged = recipes.filter((recipe) => !removeSourceIds.has(recipe.sourceId));

  const afterRecords = merged
    .filter((recipe) => ['khichdi', 'dal-makhani', 'mirchi-bajji'].includes(recipe.sourceId))
    .map((recipe) => ({
      action: 'after',
      title: recipe.title,
      id: recipe.id || '',
      sourceId: recipe.sourceId || '',
      mealType: mealType(recipe),
      tags: (recipe.tags || []).join('; '),
      timeMinutes: totalTime(recipe),
      primaryMood: recipe.primaryMood || '',
      secondaryMood: recipe.secondaryMood || ''
    }));

  return { recipes: merged, records: [...beforeRecords, ...afterRecords] };
}

function runDuplicateAudit(recipes, filenamePrefix) {
  const groups = duplicateGroups(recipes);
  writeCsv(`${filenamePrefix}_groups.csv`, ['recipe', 'recipe_key', 'recipe_ids', 'record_count', 'mealTypes', 'primaryIngredientSets', 'secondaryIngredientSets', 'timeMinutesSet', 'moods', 'status', 'rationale'], groups);
  writeCsv(`${filenamePrefix}_problem_duplicates.csv`, ['recipe', 'recipe_key', 'recipe_ids', 'record_count', 'mealTypes', 'primaryIngredientSets', 'secondaryIngredientSets', 'timeMinutesSet', 'moods', 'status', 'rationale'], groups.filter((row) => row.status === 'PROBLEM DUPLICATE'));
  writeCsv(`${filenamePrefix}_safe_duplicates.csv`, ['recipe', 'recipe_key', 'recipe_ids', 'record_count', 'mealTypes', 'primaryIngredientSets', 'secondaryIngredientSets', 'timeMinutesSet', 'moods', 'status', 'rationale'], groups.filter((row) => row.status === 'SAFE DUPLICATE'));
  return groups;
}

fs.mkdirSync(reportsDir, { recursive: true });

const beforeRecipes = readRecipesFile(recipesJsonPath);
const beforeSummary = summarize(beforeRecipes);
const beforeTop20 = top20Rows(beforeRecipes);
const beforeDuplicateGroups = runDuplicateAudit(beforeRecipes, 'duplicate_cleanup_before_duplicate_audit');

const jsonMerge = mergeRecipes(readRecipesFile(recipesJsonPath));
writeRecipesFile(recipesJsonPath, jsonMerge.recipes);

const localMerge = mergeRecipes(readLocalRecipes());
writeLocalRecipes(localMerge.recipes);

const afterRecipes = readRecipesFile(recipesJsonPath);
const afterSummary = summarize(afterRecipes);
const afterTop20 = top20Rows(afterRecipes);
const afterDuplicateGroups = runDuplicateAudit(afterRecipes, 'duplicate_cleanup_after_duplicate_audit');

writeCsv('duplicate_cleanup_records_changed.csv', ['action', 'title', 'id', 'sourceId', 'mealType', 'tags', 'timeMinutes', 'primaryMood', 'secondaryMood'], jsonMerge.records);

const moodComparisonRows = moodDefs.map((mood) => ({
  mood: mood.label,
  beforePrimary: beforeSummary.moodCounts[mood.label].primary,
  afterPrimary: afterSummary.moodCounts[mood.label].primary,
  primaryDelta: afterSummary.moodCounts[mood.label].primary - beforeSummary.moodCounts[mood.label].primary,
  beforeSecondary: beforeSummary.moodCounts[mood.label].secondary,
  afterSecondary: afterSummary.moodCounts[mood.label].secondary,
  secondaryDelta: afterSummary.moodCounts[mood.label].secondary - beforeSummary.moodCounts[mood.label].secondary,
  beforeTotalMembership: beforeSummary.moodCounts[mood.label].total,
  afterTotalMembership: afterSummary.moodCounts[mood.label].total,
  totalMembershipDelta: afterSummary.moodCounts[mood.label].total - beforeSummary.moodCounts[mood.label].total
}));

writeCsv('duplicate_cleanup_mood_counts_before_after.csv', ['mood', 'beforePrimary', 'afterPrimary', 'primaryDelta', 'beforeSecondary', 'afterSecondary', 'secondaryDelta', 'beforeTotalMembership', 'afterTotalMembership', 'totalMembershipDelta'], moodComparisonRows);
writeCsv('duplicate_cleanup_top20_before.csv', ['mood', 'rank', 'recipe', 'recipe_id', 'source_id', 'mealType', 'primaryMood', 'secondaryMood', 'fitScore', 'tags'], beforeTop20);
writeCsv('duplicate_cleanup_top20_after.csv', ['mood', 'rank', 'recipe', 'recipe_id', 'source_id', 'mealType', 'primaryMood', 'secondaryMood', 'fitScore', 'tags'], afterTop20);

const summary = {
  generatedAt: new Date().toISOString(),
  before: beforeSummary,
  after: afterSummary,
  deltas: {
    recipeCount: afterSummary.recipeCount - beforeSummary.recipeCount,
    coreRecipeCount: afterSummary.coreRecipeCount - beforeSummary.coreRecipeCount,
    duplicateNameGroups: afterSummary.duplicateNameGroups - beforeSummary.duplicateNameGroups,
    problemDuplicateGroups: afterSummary.problemDuplicateGroups - beforeSummary.problemDuplicateGroups,
    safeDuplicateGroups: afterSummary.safeDuplicateGroups - beforeSummary.safeDuplicateGroups
  },
  merged: [
    { recipe: 'Khichdi', keptSourceId: 'khichdi', removedSourceIds: ['khichdi-lunch'], mealType: 'Lunch,Dinner' },
    { recipe: 'Dal Makhani', keptSourceId: 'dal-makhani', removedSourceIds: ['dal-makhani-lunch'], mealType: 'Lunch,Dinner' },
    { recipe: 'Mirchi Bajji', keptSourceId: 'mirchi-bajji', removedSourceIds: ['mirchi-bajji-snack'], mealType: 'Snacks', timeMinutes: 25 }
  ],
  notMerged: ['Egg Curry'],
  beforeDuplicateGroups,
  afterDuplicateGroups
};

fs.writeFileSync(path.join(reportsDir, 'duplicate_cleanup_summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
