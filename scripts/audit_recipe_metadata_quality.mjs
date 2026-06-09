import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const localRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const outputPath = path.join(reportsDir, 'recipe_metadata_quality_audit.csv');
const outputJsonPath = path.join(reportsDir, 'recipe_metadata_quality_audit.json');

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
  recipe.dietType,
  recipe.diet_type,
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
const hasMeat = (recipe) => /\b(chicken|fish|mutton|prawn|pork|egg|keema|kheema|meat|kozhi)\b/.test(textFor(recipe));
const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const rows = [];
const push = (recipe, issueType, details, suggestion = '') => {
  rows.push({
    issueType,
    recipeName: recipe.title,
    recipeId: recipe.id || '',
    sourceId: recipe.sourceId || '',
    tags: (recipe.tags || []).join('; '),
    dietType: recipe.dietType || recipe.diet_type || '',
    primaryIngredients: [recipe.primaryIngredient1, recipe.primaryIngredient2].filter(Boolean).join(' + '),
    scores: `homeStyleScore=${recipe.homeStyleScore ?? ''}; nostalgiaScore=${recipe.nostalgiaScore ?? ''}; proteinScore=${recipe.proteinScore ?? ''}; rainyDayScore=${recipe.rainyDayScore ?? ''}`,
    details,
    suggestion,
  });
};

for (const recipe of recipes) {
  const vegetarianTag = hasTag(recipe, 'vegetarian') || normalize(recipe.dietType || recipe.diet_type) === 'vegetarian';
  const nonVegTag = hasTag(recipe, 'non-vegetarian') || hasTag(recipe, 'non-veg') || normalize(recipe.dietType || recipe.diet_type) === 'non-vegetarian';
  const meat = hasMeat(recipe);
  if (vegetarianTag && nonVegTag) {
    push(recipe, 'Conflicting diet tags', 'Recipe is marked both vegetarian and non-vegetarian.', meat ? 'Keep non-vegetarian only.' : 'Keep vegetarian only.');
  } else if (vegetarianTag && meat) {
    push(recipe, 'Conflicting diet tags', 'Recipe is marked vegetarian but contains meat/egg/fish ingredient signals.', 'Change diet/tags to non-vegetarian or remove meat ingredient.');
  } else if (nonVegTag && !meat) {
    push(recipe, 'Conflicting diet tags', 'Recipe is marked non-vegetarian but has no meat/egg/fish ingredient signal.', 'Change diet/tags to vegetarian if ingredients are accurate.');
  }
}

const byTitle = new Map();
for (const recipe of recipes) {
  const key = normalize(recipe.title);
  if (!byTitle.has(key)) byTitle.set(key, []);
  byTitle.get(key).push(recipe);
}
for (const group of byTitle.values()) {
  if (group.length <= 1) continue;
  const signatures = group.map((recipe) => [
    [recipe.primaryIngredient1, recipe.primaryIngredient2].filter(Boolean).map(normalize).join('+'),
    [recipe.secondaryIngredient1, recipe.secondaryIngredient2, recipe.secondaryIngredient3].filter(Boolean).map(normalize).join('+'),
    (recipe.tags || []).map(normalize).sort().join('+'),
    recipe.prepTimeMinutes,
    recipe.cookTimeMinutes,
  ].join('|'));
  const uniqueSignatureCount = new Set(signatures).size;
  group.forEach((recipe, index) => {
    push(
      recipe,
      'Duplicate recipe title',
      `Duplicate title appears ${group.length} times.`,
      uniqueSignatureCount === 1
        ? `Records look similar. Keep the highest quality ${recipe.title} record and remove duplicate.`
        : `${recipe.title} variant ${index + 1}: rename based on ingredients/meal, or merge if not meaningfully different.`
    );
  });
}

const restaurantPattern = /\b(tikka|65|schezwan|chilli paneer|chilli-paneer|fried rice|roll|momos|pav|bajji|pakora|bonda|samosa|kachori)\b/;
for (const recipe of recipes) {
  if (Number(recipe.homeStyleScore || 0) >= 8 && (hasTag(recipe, 'spicy-food') || restaurantPattern.test(textFor(recipe)))) {
    push(recipe, 'Home-style score audit', 'High homeStyleScore on spicy/street/restaurant-style recipe.', 'Reduce homeStyleScore to 4-6 unless this is genuinely homemade.');
  }
}

const nostalgiaCharacteristic = (recipe) => {
  const text = textFor(recipe);
  return hasTag(recipe, 'comfort')
    || hasTag(recipe, 'comfort-food')
    || hasTag(recipe, 'soul-food')
    || hasTag(recipe, 'traditional')
    || hasTag(recipe, 'home-style')
    || /\b(childhood|traditional|home|homestyle|home-style|idli|dosa|pongal|khichdi|curd rice|dal rice|rasam rice|aloo paratha|porridge|ladoo|modak|gujiya)\b/.test(text);
};

for (const recipe of recipes) {
  if (Number(recipe.nostalgiaScore || 0) >= 7 && !nostalgiaCharacteristic(recipe)) {
    push(recipe, 'Nostalgia score audit', 'High nostalgiaScore without comfort/soul/traditional/home-style characteristics.', 'Reduce nostalgiaScore or add/validate traditional/home-style context.');
  }
}

const headers = ['issueType', 'recipeName', 'recipeId', 'sourceId', 'tags', 'dietType', 'primaryIngredients', 'scores', 'details', 'suggestion'];
const csv = [
  headers.map(csvEscape).join(','),
  ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
].join('\n') + '\n';

fs.writeFileSync(outputPath, csv);
fs.writeFileSync(outputJsonPath, JSON.stringify(rows, null, 2));

console.log(JSON.stringify({
  checkedCoreRecipes: recipes.length,
  issues: rows.length,
  csv: outputPath,
  json: outputJsonPath,
}, null, 2));
