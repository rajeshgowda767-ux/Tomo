const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'frontend', 'local-recipes.js');
const outputPath = path.join(root, 'frontend', 'mobile', 'mobile-recipes-lite.js');
const context = { window: {} };

vm.createContext(context);
vm.runInContext(fs.readFileSync(sourcePath, 'utf8'), context, { filename: sourcePath });

const detailOnlyFields = new Set([
  'name',
  'quickGuide',
  'instructions',
  'cookingNotes',
  'foodHeritage',
  'regionalNotes',
  'pairings',
  'requiredIngredients',
  'required_ingredients',
  'optionalIngredients',
  'optional_ingredients',
  'recipe_type',
  'primary_ingredient_1',
  'primary_ingredient_2',
  'secondary_ingredient_1',
  'secondary_ingredient_2',
  'secondary_ingredient_3',
  'secondary_ingredient_4',
  'secondary_ingredient_5',
  'base_ingredient',
  'core_ingredients',
  'dish_family',
  'required_primary_matches',
  'incompatible_with',
  'image_url',
  'image'
]);

const recipes = (context.window.COOKBUDDY_LOCAL_RECIPES || []).map((recipe) => {
  const lite = Object.fromEntries(
    Object.entries(recipe).filter(([field]) => !detailOnlyFields.has(field))
  );
  lite.ingredients = (recipe.ingredients || []).map((ingredient) => ({
    ...(ingredient.name ? { name: ingredient.name } : {}),
    ...(ingredient.ingredient ? { ingredient: ingredient.ingredient } : {}),
    ...(ingredient.role ? { role: ingredient.role } : {}),
    ...(ingredient.isMain ? { isMain: true } : {})
  }));
  return lite;
});

fs.writeFileSync(
  outputPath,
  `window.COOKBUDDY_LOCAL_RECIPES=${JSON.stringify(recipes)};\n`
);

console.log(`Wrote ${recipes.length} compact recipes to ${path.relative(root, outputPath)}`);
