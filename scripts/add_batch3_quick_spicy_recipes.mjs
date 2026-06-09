import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const frontendRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const generatedRecipesPath = path.join(root, 'database', 'generated', 'recipes.json');
const pantryJsonPath = path.join(root, 'database', 'generated', 'pantry_ingredient_catalog.json');
const pantryCsvPath = path.join(root, 'database', 'generated', 'pantry_ingredient_catalog.csv');
const pantryJsPath = path.join(root, 'frontend', 'local-pantry-catalog.js');
const reportsDir = path.join(root, 'database', 'generated', 'reports');

const validationCsvPath = path.join(reportsDir, 'batch3_ingredient_validation.csv');
const missingCsvPath = path.join(reportsDir, 'batch3_missing_ingredients_added.csv');
const insertedCsvPath = path.join(reportsDir, 'batch3_inserted_recipes.csv');
const moodCountsCsvPath = path.join(reportsDir, 'batch3_updated_mood_count_report.csv');
const rankingCsvPath = path.join(reportsDir, 'batch3_updated_mood_ranking_preview.csv');
const summaryJsonPath = path.join(reportsDir, 'batch3_recipe_import_summary.json');

fs.mkdirSync(reportsDir, { recursive: true });

const newRecipeInputs = [
  { title: 'Bread Upma', tags: ['breakfast', 'vegetarian', 'quick'], primary: ['Bread', 'Onion'], proteinScore: 3, comfortScore: 7, rainyDayScore: 5, nostalgiaScore: 6, homeStyleScore: 8, primaryMood: 'Quick & Easy', secondaryMood: 'Comfort Food', timeMinutes: 20 },
  { title: 'Tomato Rice', tags: ['lunch', 'vegetarian', 'quick'], primary: ['Rice', 'Tomato'], proteinScore: 2, comfortScore: 7, rainyDayScore: 4, nostalgiaScore: 6, homeStyleScore: 8, primaryMood: 'Quick & Easy', secondaryMood: 'Comfort Food', timeMinutes: 25 },
  { title: 'Coconut Rice', tags: ['lunch', 'vegetarian', 'quick'], primary: ['Rice', 'Coconut'], proteinScore: 2, comfortScore: 7, rainyDayScore: 4, nostalgiaScore: 7, homeStyleScore: 8, primaryMood: 'Quick & Easy', secondaryMood: 'Soul Food', timeMinutes: 25 },
  { title: 'Lemon Sevai', tags: ['breakfast', 'vegetarian', 'quick'], primary: ['Sevai', 'Lemon'], proteinScore: 2, comfortScore: 6, rainyDayScore: 4, nostalgiaScore: 6, homeStyleScore: 8, primaryMood: 'Quick & Easy', secondaryMood: 'Soul Food', timeMinutes: 20 },
  { title: 'Egg Toast', tags: ['breakfast', 'non-vegetarian', 'quick', 'high-protein'], primary: ['Egg', 'Bread'], proteinScore: 8, comfortScore: 5, rainyDayScore: 4, nostalgiaScore: 5, homeStyleScore: 6, primaryMood: 'Quick & Easy', secondaryMood: 'High Protein', timeMinutes: 15 },
  { title: 'Veg Sandwich', tags: ['snacks', 'vegetarian', 'quick'], primary: ['Bread', 'Vegetables'], proteinScore: 2, comfortScore: 5, rainyDayScore: 3, nostalgiaScore: 4, homeStyleScore: 5, primaryMood: 'Quick & Easy', secondaryMood: '', timeMinutes: 15 },
  { title: 'Paneer Sandwich', tags: ['breakfast', 'vegetarian', 'quick', 'high-protein'], primary: ['Bread', 'Paneer'], proteinScore: 8, comfortScore: 5, rainyDayScore: 3, nostalgiaScore: 4, homeStyleScore: 5, primaryMood: 'Quick & Easy', secondaryMood: 'High Protein', timeMinutes: 15 },
  { title: 'Corn Chaat', tags: ['snacks', 'vegetarian', 'quick'], primary: ['Corn', 'Onion'], proteinScore: 3, comfortScore: 5, rainyDayScore: 4, nostalgiaScore: 4, homeStyleScore: 5, primaryMood: 'Quick & Easy', secondaryMood: '', timeMinutes: 15 },
  { title: 'Peanut Sundal', tags: ['snacks', 'vegetarian', 'quick'], primary: ['Peanut', 'Coconut'], proteinScore: 7, comfortScore: 6, rainyDayScore: 4, nostalgiaScore: 6, homeStyleScore: 7, primaryMood: 'Quick & Easy', secondaryMood: 'High Protein', timeMinutes: 20 },
  { title: 'Instant Rava Upma', tags: ['breakfast', 'vegetarian', 'quick'], primary: ['Rava', 'Onion'], proteinScore: 2, comfortScore: 7, rainyDayScore: 4, nostalgiaScore: 6, homeStyleScore: 8, primaryMood: 'Quick & Easy', secondaryMood: 'Comfort Food', timeMinutes: 15 },
  { title: 'Chicken 555', tags: ['snack', 'spicy-food', 'high-protein'], primary: ['Chicken', 'Chilli'], proteinScore: 8, comfortScore: 3, rainyDayScore: 2, nostalgiaScore: 2, homeStyleScore: 3, primaryMood: 'Spicy Food', secondaryMood: 'High Protein', timeMinutes: 35 },
  { title: 'Chicken Majestic', tags: ['snack', 'spicy-food', 'high-protein'], primary: ['Chicken', 'Curd'], proteinScore: 8, comfortScore: 3, rainyDayScore: 2, nostalgiaScore: 2, homeStyleScore: 3, primaryMood: 'Spicy Food', secondaryMood: 'High Protein', timeMinutes: 35 },
  { title: 'Guntur Chicken Fry', tags: ['lunch', 'spicy-food', 'andhra', 'high-protein'], primary: ['Chicken', 'Guntur Chilli'], proteinScore: 8, comfortScore: 4, rainyDayScore: 2, nostalgiaScore: 3, homeStyleScore: 4, primaryMood: 'Spicy Food', secondaryMood: 'High Protein', timeMinutes: 40 },
  { title: 'Andhra Kodi Vepudu', tags: ['lunch', 'spicy-food', 'andhra'], primary: ['Chicken', 'Chilli'], proteinScore: 8, comfortScore: 4, rainyDayScore: 2, nostalgiaScore: 3, homeStyleScore: 5, primaryMood: 'Spicy Food', secondaryMood: 'High Protein', timeMinutes: 40 },
  { title: 'Chilli Mushroom', tags: ['snack', 'spicy-food'], primary: ['Mushroom', 'Chilli'], proteinScore: 3, comfortScore: 3, rainyDayScore: 2, nostalgiaScore: 2, homeStyleScore: 3, primaryMood: 'Spicy Food', secondaryMood: '', timeMinutes: 25 },
  { title: 'Dragon Chicken', tags: ['snack', 'spicy-food', 'high-protein'], primary: ['Chicken', 'Chilli'], proteinScore: 8, comfortScore: 3, rainyDayScore: 2, nostalgiaScore: 2, homeStyleScore: 3, primaryMood: 'Spicy Food', secondaryMood: 'High Protein', timeMinutes: 35 },
  { title: 'Gunpowder Idli', tags: ['breakfast', 'spicy-food', 'south-indian'], primary: ['Idli', 'Podi'], proteinScore: 2, comfortScore: 6, rainyDayScore: 4, nostalgiaScore: 8, homeStyleScore: 8, primaryMood: 'Spicy Food', secondaryMood: 'Soul Food', timeMinutes: 15 },
  { title: 'Kaaram Dosa', tags: ['breakfast', 'spicy-food', 'south-indian'], primary: ['Dosa', 'Chilli'], proteinScore: 2, comfortScore: 6, rainyDayScore: 4, nostalgiaScore: 8, homeStyleScore: 8, primaryMood: 'Spicy Food', secondaryMood: 'Soul Food', timeMinutes: 20 },
  { title: 'Andhra Egg Fry', tags: ['lunch', 'spicy-food', 'high-protein'], primary: ['Egg', 'Chilli'], proteinScore: 8, comfortScore: 4, rainyDayScore: 2, nostalgiaScore: 3, homeStyleScore: 4, primaryMood: 'Spicy Food', secondaryMood: 'High Protein', timeMinutes: 25 },
  { title: 'Mirapakaya Bajji', tags: ['snack', 'spicy-food', 'rainy-day'], primary: ['Green Chilli', 'Besan'], proteinScore: 6, comfortScore: 4, rainyDayScore: 8, nostalgiaScore: 4, homeStyleScore: 4, primaryMood: 'Spicy Food', secondaryMood: 'Rainy Day', timeMinutes: 25 },
];

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
}

function kebab(value) {
  return normalize(value).replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function uuidFor(value) {
  const hash = crypto.createHash('sha1').update(`cookbuddy:${value}`).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-5${hash.slice(13, 16)}-${((parseInt(hash.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hash.slice(18, 20)}-${hash.slice(20, 32)}`;
}

function readFrontendRecipes() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(frontendRecipesPath, 'utf8'), context);
  return context.window.COOKBUDDY_LOCAL_RECIPES || [];
}

function readPantryCatalog() {
  return JSON.parse(fs.readFileSync(pantryJsonPath, 'utf8'));
}

function writeRecipes(recipes) {
  fs.writeFileSync(frontendRecipesPath, `window.COOKBUDDY_LOCAL_RECIPES = ${JSON.stringify(recipes, null, 2)};\n`);
  fs.writeFileSync(generatedRecipesPath, `${JSON.stringify(recipes, null, 2)}\n`);
}

function writePantryCatalog(catalog) {
  catalog.sort((a, b) => Number(b.used_by_recipe_count || 0) - Number(a.used_by_recipe_count || 0) || a.ingredient_name.localeCompare(b.ingredient_name));
  fs.writeFileSync(pantryJsonPath, `${JSON.stringify(catalog, null, 2)}\n`);
  const csvHeaders = ['ingredient_name', 'ingredient_key', 'used_by_recipe_count'];
  fs.writeFileSync(pantryCsvPath, [
    csvHeaders.join(','),
    ...catalog.map((item) => csvHeaders.map((header) => `"${String(item[header] ?? '').replace(/"/g, '""')}"`).join(',')),
  ].join('\n') + '\n');
  fs.writeFileSync(pantryJsPath, `window.COOKBUDDY_PANTRY_CATALOG = ${JSON.stringify(catalog, null, 2)};\n`);
}

const existingRecipes = readFrontendRecipes();
const existingRecipeIds = new Set(existingRecipes.map((recipe) => recipe.sourceId));
const existingTitles = new Set(existingRecipes.map((recipe) => normalize(recipe.title)));
const pantryCatalog = readPantryCatalog();
const pantryByKey = new Map(pantryCatalog.map((item) => [normalize(item.ingredient_key || item.ingredient_name), item]));

const primaryIngredients = [...new Set(newRecipeInputs.flatMap((recipe) => recipe.primary))];
const validationRows = primaryIngredients.map((ingredient) => ({
  ingredient,
  ingredientKey: normalize(ingredient),
  status: pantryByKey.has(normalize(ingredient)) ? 'exists' : 'missing',
}));
const missingIngredients = validationRows.filter((row) => row.status === 'missing');

for (const row of missingIngredients) {
  pantryByKey.set(row.ingredientKey, {
    ingredient_name: row.ingredient,
    ingredient_key: row.ingredientKey,
    used_by_recipe_count: 0,
  });
}

for (const input of newRecipeInputs) {
  for (const ingredient of input.primary) {
    const item = pantryByKey.get(normalize(ingredient));
    if (item) item.used_by_recipe_count = Number(item.used_by_recipe_count || 0) + 1;
  }
}

const updatedPantryCatalog = [...pantryByKey.values()];
writePantryCatalog(updatedPantryCatalog);

function imageFor(input) {
  const slug = kebab(input.title);
  return `/assets/images/dishes/${slug}.png`;
}

function mealType(input) {
  if (input.tags.includes('breakfast')) return 'breakfast';
  if (input.tags.includes('lunch')) return 'lunch';
  if (input.tags.includes('dinner')) return 'dinner';
  return 'snack';
}

function dietType(input) {
  if (input.tags.includes('non-vegetarian')) return 'non-vegetarian';
  return 'vegetarian';
}

function secondaryIngredients(input) {
  const tags = input.tags.map(normalize);
  if (tags.includes('spicy food')) return ['Onion', 'Curry Leaves', 'Garlic', 'Ginger', 'Oil'];
  if (input.title.includes('Sandwich')) return ['Butter', 'Black Pepper', 'Tomato', 'Onion', 'Coriander'];
  if (input.title.includes('Rice')) return ['Curry Leaves', 'Mustard Seeds', 'Peanut', 'Oil', 'Coriander'];
  if (input.title.includes('Upma')) return ['Curry Leaves', 'Mustard Seeds', 'Green Chilli', 'Oil', 'Coriander'];
  return ['Curry Leaves', 'Mustard Seeds', 'Onion', 'Oil', 'Coriander'];
}

function description(input) {
  const primary = input.primary.join(' and ');
  if (input.primaryMood === 'Quick & Easy') {
    return `${input.title} is a quick home-style idea made with ${primary}. It is built for low-effort cooking when you want something practical without losing the comfort of a familiar Indian kitchen. Tomo would keep this close for busy mornings, simple lunches, or snack-time fixes.`;
  }
  return `${input.title} is a bold Indian spicy dish made with ${primary}. It brings heat, punch, and strong regional flavor while staying useful for CookBuddy's spicy recommendations. Tomo would suggest it when the mood calls for something lively and satisfying.`;
}

function buildRecipe(input) {
  const sourceId = kebab(input.title);
  const prepTime = Math.min(10, Math.max(5, Math.round(input.timeMinutes * 0.35 / 5) * 5));
  const cookTime = Math.max(5, input.timeMinutes - prepTime);
  const secondaries = secondaryIngredients(input).filter((ingredient) => !input.primary.map(normalize).includes(normalize(ingredient))).slice(0, 5);
  const moodTags = [input.primaryMood, input.secondaryMood].filter(Boolean).map((mood) => {
    if (mood === 'Comfort Food') return 'comfort';
    if (mood === 'Soul Food') return 'soul-food';
    if (mood === 'High Protein') return 'high-protein';
    if (mood === 'Quick & Easy') return 'quick';
    if (mood === 'Spicy Food') return 'spicy-food';
    if (mood === 'Rainy Day') return 'rainy-day';
    return '';
  }).filter(Boolean);
  const tags = [...new Set([...input.tags, ...moodTags])];
  return {
    id: uuidFor(sourceId),
    sourceId,
    title: input.title,
    description: description(input),
    prepTimeMinutes: prepTime,
    cookTimeMinutes: cookTime,
    timeMinutes: input.timeMinutes,
    servings: 2,
    cuisine: input.tags.includes('andhra') ? 'Andhra' : input.tags.includes('south-indian') ? 'South Indian' : 'Indian',
    dietType: dietType(input),
    difficulty: input.timeMinutes <= 20 ? 'easy' : 'medium',
    imageUrl: imageFor(input),
    tags,
    lateNight: input.tags.includes('snack') || input.tags.includes('snacks'),
    lowEffort: input.primaryMood === 'Quick & Easy',
    sickDay: false,
    budgetFriendly: input.primaryMood === 'Quick & Easy',
    summerCooling: false,
    lightMeal: input.primaryMood === 'Quick & Easy' && input.comfortScore <= 5,
    onePot: ['Tomato Rice', 'Coconut Rice', 'Peanut Sundal', 'Instant Rava Upma', 'Bread Upma'].includes(input.title),
    minimalCleanup: input.primaryMood === 'Quick & Easy',
    studySnack: input.tags.includes('snack') || input.tags.includes('snacks'),
    weekendSpecial: input.primaryMood === 'Spicy Food',
    effortScore: input.primaryMood === 'Quick & Easy' ? 3 : 6,
    comfortScore: input.comfortScore,
    energyScore: input.proteinScore >= 8 ? 7 : 5,
    instructions: [
      `Prep ${input.primary.join(' and ')} so the cooking stays smooth.`,
      'Start with a simple Indian home base of oil, onion, herbs, or spices as needed.',
      `Cook until the flavours come together, then finish ${input.title} with salt, heat, and texture adjusted to taste.`,
      'Serve warm while it still feels fresh and satisfying.'
    ],
    ingredients: [
      ...input.primary.map((name) => ({ name, quantity: 1, unit: 'portion', role: 'required', isMain: true })),
      ...secondaries.slice(0, 3).map((name) => ({ name, quantity: 1, unit: 'small', role: 'flavor-base', isMain: false })),
    ],
    recipe_type: 'core',
    recipeType: 'core',
    primary_ingredient_1: input.primary[0],
    primary_ingredient_2: input.primary[1],
    primaryIngredient1: input.primary[0],
    primaryIngredient2: input.primary[1],
    secondary_ingredient_1: secondaries[0] || null,
    secondaryIngredient1: secondaries[0] || null,
    secondary_ingredient_2: secondaries[1] || null,
    secondaryIngredient2: secondaries[1] || null,
    secondary_ingredient_3: secondaries[2] || null,
    secondaryIngredient3: secondaries[2] || null,
    secondary_ingredient_4: secondaries[3] || null,
    secondaryIngredient4: secondaries[3] || null,
    secondary_ingredient_5: secondaries[4] || null,
    secondaryIngredient5: secondaries[4] || null,
    primaryIngredients: input.primary,
    proteinScore: input.proteinScore,
    nostalgiaScore: input.nostalgiaScore,
    homeStyleScore: input.homeStyleScore,
    rainyDayScore: input.rainyDayScore,
    primaryMood: input.primaryMood,
    secondaryMood: input.secondaryMood,
  };
}

const inserted = [];
for (const input of newRecipeInputs) {
  const sourceId = kebab(input.title);
  if (existingRecipeIds.has(sourceId) || existingTitles.has(normalize(input.title))) continue;
  const recipe = buildRecipe(input);
  existingRecipes.push(recipe);
  inserted.push(recipe);
}

writeRecipes(existingRecipes);

const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
function writeCsv(filePath, headers, rows) {
  fs.writeFileSync(filePath, [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n') + '\n');
}

writeCsv(validationCsvPath, ['ingredient', 'ingredientKey', 'status'], validationRows);
writeCsv(missingCsvPath, ['ingredient', 'ingredientKey', 'status'], missingIngredients.map((row) => ({ ...row, status: 'added' })));
writeCsv(insertedCsvPath, ['Recipe', 'RecipeId', 'PrimaryMood', 'SecondaryMood', 'PrimaryIngredients', 'Tags', 'TimeMinutes'], inserted.map((recipe) => ({
  Recipe: recipe.title,
  RecipeId: recipe.sourceId,
  PrimaryMood: recipe.primaryMood,
  SecondaryMood: recipe.secondaryMood,
  PrimaryIngredients: recipe.primaryIngredients.join(' + '),
  Tags: recipe.tags.join('; '),
  TimeMinutes: recipe.timeMinutes,
})));

const coreRecipes = existingRecipes.filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');
const moodLabels = ['Comfort Food', 'Soul Food', 'High Protein', 'Quick & Easy', 'Spicy Food', 'Rainy Day'];
const moodRows = moodLabels.map((mood) => ({
  Mood: mood,
  RecipeCount: coreRecipes.filter((recipe) => recipe.primaryMood === mood || recipe.secondaryMood === mood).length,
  PrimaryMoodCount: coreRecipes.filter((recipe) => recipe.primaryMood === mood).length,
  SecondaryMoodCount: coreRecipes.filter((recipe) => recipe.secondaryMood === mood).length,
}));
writeCsv(moodCountsCsvPath, ['Mood', 'RecipeCount', 'PrimaryMoodCount', 'SecondaryMoodCount'], moodRows);

function rankingScore(recipe, mood) {
  let score = 0;
  if (recipe.primaryMood === mood) score += 1000;
  if (recipe.secondaryMood === mood) score += 500;
  if (mood === 'Comfort Food') score += Number(recipe.comfortScore || 0) * 10;
  if (mood === 'Soul Food') score += Number(recipe.nostalgiaScore || 0) * 10 + Number(recipe.homeStyleScore || 0) * 3;
  if (mood === 'High Protein') score += Number(recipe.proteinScore || 0) * 12;
  if (mood === 'Quick & Easy') score += Math.max(0, 60 - Number(recipe.timeMinutes || (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)));
  if (mood === 'Spicy Food') score += (recipe.tags || []).includes('spicy-food') ? 100 : 0;
  if (mood === 'Rainy Day') score += Number(recipe.rainyDayScore || 0) * 12;
  return score;
}
const rankingRows = [];
for (const mood of moodLabels) {
  coreRecipes
    .map((recipe) => ({ recipe, score: rankingScore(recipe, mood) }))
    .sort((a, b) => b.score - a.score || a.recipe.title.localeCompare(b.recipe.title))
    .slice(0, 25)
    .forEach((item, index) => rankingRows.push({
      Mood: mood,
      Rank: index + 1,
      Recipe: item.recipe.title,
      RecipeId: item.recipe.sourceId,
      Score: Math.round(item.score),
      PrimaryMood: item.recipe.primaryMood,
      SecondaryMood: item.recipe.secondaryMood,
    }));
}
writeCsv(rankingCsvPath, ['Mood', 'Rank', 'Recipe', 'RecipeId', 'Score', 'PrimaryMood', 'SecondaryMood'], rankingRows);

fs.writeFileSync(summaryJsonPath, JSON.stringify({
  validatedIngredients: validationRows.length,
  missingIngredientsAdded: missingIngredients,
  insertedRecipes: inserted.length,
  skippedExisting: newRecipeInputs.length - inserted.length,
  moodCounts: moodRows,
  outputs: {
    validationCsv: validationCsvPath,
    missingCsv: missingCsvPath,
    insertedCsv: insertedCsvPath,
    moodCountsCsv: moodCountsCsvPath,
    rankingCsv: rankingCsvPath,
    summaryJson: summaryJsonPath,
  },
}, null, 2));

console.log(JSON.stringify({
  validatedIngredients: validationRows.length,
  missingIngredientsAdded: missingIngredients,
  insertedRecipes: inserted.length,
  skippedExisting: newRecipeInputs.length - inserted.length,
  moodCounts: moodRows,
  outputs: {
    validationCsv: validationCsvPath,
    missingCsv: missingCsvPath,
    insertedCsv: insertedCsvPath,
    moodCountsCsv: moodCountsCsvPath,
    rankingCsv: rankingCsvPath,
    summaryJson: summaryJsonPath,
  },
}, null, 2));
