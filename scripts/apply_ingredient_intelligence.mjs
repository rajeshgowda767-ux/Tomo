import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const recipesPath = path.join(root, 'database', 'generated', 'recipes.json');
const collectionsPath = path.join(root, 'database', 'generated', 'collections.json');
const localRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const localCollectionsPath = path.join(root, 'frontend', 'local-collections.js');
const ingredientIntelligenceSqlPath = path.join(root, 'database', 'ingredient_intelligence.sql');

const secondaryFlavorIngredients = new Set([
  'ajwain',
  'black pepper',
  'byadgi chilli',
  'chaat masala',
  'chilli',
  'coriander',
  'cumin',
  'curry leaves',
  'garam masala',
  'garlic',
  'ghee',
  'green chilli',
  'guntur chilli',
  'kolhapuri masala',
  'madras curry powder',
  'mathania chilli',
  'misal masala',
  'mustard seeds',
  'pepper',
  'podi',
  'red chilli',
  'schezwan sauce',
  'sesame',
  'sesame oil',
  'soy sauce',
  'spices',
  'spring onion',
  'tamarind',
  'turmeric'
]);

const titleIngredientRules = [
  [/chicken|nattu kozhi/i, 'Chicken'],
  [/egg|omelette|bhurji/i, 'Egg'],
  [/fish/i, 'Fish'],
  [/paneer/i, 'Paneer'],
  [/mutton|laal maas/i, 'Mutton'],
  [/prawn/i, 'Prawn'],
  [/keema|kheema/i, 'Keema'],
  [/aloo|potato/i, 'Potato'],
  [/palak/i, 'Palak'],
  [/gongura/i, 'Gongura'],
  [/coconut|sukka|ghee roast/i, 'Coconut'],
  [/rice|biryani|pulao|khichdi|bisibelebath/i, 'Rice'],
  [/lemon/i, 'Lemon'],
  [/dosa/i, 'Dosa Batter'],
  [/idli/i, 'Idli'],
  [/paratha|roti|chapati/i, 'Wheat'],
  [/poha|avalakki/i, 'Poha'],
  [/upma|rava|suji/i, 'Rava'],
  [/besan|chilla/i, 'Besan'],
  [/curd|lassi|buttermilk/i, 'Curd'],
  [/chai/i, 'Tea'],
  [/coffee/i, 'Coffee'],
  [/soup/i, 'Vegetables']
];

const primaryOverrides = new Map(Object.entries({
  'Chicken Sukka': ['Chicken', 'Coconut', 'Onion'],
  'Palak Paneer': ['Palak', 'Paneer', 'Onion'],
  'Lemon Rice': ['Rice', 'Lemon', 'Mustard Seeds'],
  'Paneer Bhurji': ['Paneer', 'Onion', 'Tomato'],
  'Masala Chai': ['Tea', 'Milk', 'Ginger'],
  'Biryani': ['Rice', 'Chicken', 'Onion'],
  'Chicken Biryani': ['Rice', 'Chicken', 'Onion'],
  'Egg Fried Rice': ['Rice', 'Egg', 'Vegetables'],
  'Chicken Fried Rice': ['Rice', 'Chicken', 'Vegetables'],
  'Fish Pakora': ['Fish', 'Besan', 'Wheat'],
  'Fish Curry': ['Fish', 'Tomato', 'Onion'],
  'Fish Curry Rice': ['Fish', 'Rice', 'Tomato'],
  'Egg Curry': ['Egg', 'Onion', 'Tomato'],
  'Egg Curry Rice': ['Egg', 'Rice', 'Tomato'],
  'Andhra Chicken Curry': ['Chicken', 'Onion', 'Red Chilli'],
  'Chicken Chettinad': ['Chicken', 'Coconut', 'Onion'],
  'Guntur Chilli Chicken': ['Chicken', 'Guntur Chilli', 'Onion'],
  'Butter Chicken': ['Chicken', 'Butter', 'Tomato'],
  'Kerala Fish Curry': ['Fish', 'Coconut Milk', 'Tomato'],
  'Prawn Ghee Roast': ['Prawn', 'Ghee', 'Red Chilli'],
  'Paneer Tikka Masala': ['Paneer', 'Tomato', 'Onion'],
  'Chilli Paneer': ['Paneer', 'Capsicum', 'Green Chilli'],
  'Mirchi Bajji': ['Green Chilli', 'Besan', 'Oil'],
  'Mirchi Ka Salan': ['Green Chilli', 'Peanut', 'Sesame'],
  'Schezwan Fried Rice': ['Rice', 'Schezwan Sauce', 'Vegetables'],
  'Pongal': ['Rice', 'Moong Dal', 'Ghee'],
  'Dosa': ['Rice', 'Urad Dal', 'Ghee'],
  'Spicy Masala Dosa': ['Rice', 'Urad Dal', 'Potato'],
  'Andhra Podi Idli': ['Idli', 'Podi', 'Ghee'],
  'Idli': ['Idli', 'Rice', 'Urad Dal'],
  'Soft Idli': ['Idli', 'Rice', 'Urad Dal'],
  'Curd Rice': ['Rice', 'Curd', 'Mustard Seeds'],
  'Rasam Rice': ['Rice', 'Tamarind', 'Tomato'],
  'Sambar Rice': ['Rice', 'Toor Dal', 'Vegetables'],
  'Dal Rice': ['Rice', 'Toor Dal', 'Ghee'],
  'Dal Roti': ['Toor Dal', 'Wheat', 'Onion'],
  'Dal Makhani': ['Black Urad Dal', 'Rajma', 'Butter'],
  'Rajma Chawal': ['Rajma', 'Rice', 'Onion'],
  'Chole Chawal': ['Chole', 'Rice', 'Onion'],
  'Khichdi': ['Rice', 'Moong Dal', 'Ghee'],
  'Bisibelebath': ['Rice', 'Toor Dal', 'Vegetables'],
  'Aloo Paratha': ['Wheat', 'Potato', 'Ghee'],
  'Spicy Aloo Paratha': ['Wheat', 'Potato', 'Red Chilli'],
  'Paneer Paratha': ['Wheat', 'Paneer', 'Onion'],
  'Bread Omelette': ['Bread', 'Egg', 'Onion'],
  'Besan Chilla': ['Besan', 'Curd', 'Onion'],
  'Avalakki': ['Poha', 'Onion', 'Peanut'],
  'Poha': ['Poha', 'Onion', 'Peanut'],
  'Upma': ['Rava', 'Onion', 'Vegetables'],
  'Ragi Porridge': ['Ragi', 'Milk', 'Jaggery'],
  'Oats Porridge': ['Oats', 'Milk', 'Banana'],
  'Suji Porridge': ['Rava', 'Milk', 'Ghee']
}));

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function titleCase(value) {
  return normalize(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function unique(values) {
  const seen = new Set();
  return values.filter((value) => {
    const key = normalize(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function existingIngredientNames(recipe) {
  return (recipe.ingredients || []).map((item) => item.name || item.ingredientName || item);
}

function titleImpliedIngredients(recipe) {
  const title = recipe.title || '';
  return titleIngredientRules
    .filter(([pattern]) => pattern.test(title))
    .map(([, ingredient]) => ingredient);
}

function inferPrimaryIngredients(recipe) {
  const override = primaryOverrides.get(recipe.title);
  if (override) return override.slice(0, 3);

  const ingredients = recipe.ingredients || [];
  const required = ingredients
    .filter((item) => item.isMain && normalize(item.role || 'required') === 'required')
    .map((item) => item.name)
    .filter((name) => !secondaryFlavorIngredients.has(normalize(name)));
  const mains = ingredients
    .filter((item) => item.isMain)
    .map((item) => item.name)
    .filter((name) => !secondaryFlavorIngredients.has(normalize(name)));
  const implied = titleImpliedIngredients(recipe);
  const fallback = ingredients
    .map((item) => item.name)
    .filter((name) => !secondaryFlavorIngredients.has(normalize(name)));

  let primary = unique([...implied, ...required, ...mains]).slice(0, 2);
  if (primary.length < 2) primary = unique([...primary, ...fallback]).slice(0, 2);
  if (!primary.length) primary = existingIngredientNames(recipe).slice(0, 2);
  return primary.map(titleCase).slice(0, 2);
}

function inferSecondaryIngredients(recipe, primary) {
  const primaryKeys = new Set(primary.map(normalize));
  const ingredients = (recipe.ingredients || [])
    .map((item) => item.name)
    .filter((name) => !primaryKeys.has(normalize(name)));
  const flavorFirst = ingredients.filter((name) => secondaryFlavorIngredients.has(normalize(name)));
  const other = ingredients.filter((name) => !secondaryFlavorIngredients.has(normalize(name)));
  return unique([...flavorFirst, ...other]).map(titleCase).slice(0, 5);
}

function setIngredientFields(target, primary, secondary = []) {
  const p = [...primary, '', ''].slice(0, 2);
  target.primary_ingredient_1 = p[0] || null;
  target.primary_ingredient_2 = p[1] || null;
  target.primaryIngredient1 = p[0] || null;
  target.primaryIngredient2 = p[1] || null;
  delete target[`primary_${'ingredient'}_3`];
  delete target[`primary${'Ingredient'}3`];

  for (let index = 0; index < 5; index += 1) {
    const value = secondary[index] || null;
    target[`secondary_ingredient_${index + 1}`] = value;
    target[`secondaryIngredient${index + 1}`] = value;
  }
}

function enrichCoreRecipe(recipe) {
  const primary = inferPrimaryIngredients(recipe);
  const secondary = inferSecondaryIngredients(recipe, primary);
  recipe.recipe_type = 'core';
  recipe.recipeType = 'core';
  setIngredientFields(recipe, primary, secondary);
  delete recipe[`minimum${'Primary'}Matches`];
  delete recipe[`minimum_${'primary'}_matches`];
  delete recipe[`minimum${'Match'}Threshold`];
  delete recipe[`minimum_${'match'}_threshold`];
  delete recipe[`ingredient${'Weights'}`];
  return recipe;
}

function enrichCollectionItem(item) {
  const primary = unique((item.ingredients || []).map(titleCase)).slice(0, 2);
  item.recipe_type = 'collection';
  item.recipeType = 'collection';
  const p = [...primary, '', ''].slice(0, 2);
  item.primary_ingredient_1 = p[0] || null;
  item.primary_ingredient_2 = p[1] || null;
  item.primaryIngredient1 = p[0] || null;
  item.primaryIngredient2 = p[1] || null;
  delete item[`primary_${'ingredient'}_3`];
  delete item[`primary${'Ingredient'}3`];
  for (let index = 1; index <= 5; index += 1) {
    delete item[`secondary_ingredient_${index}`];
    delete item[`secondaryIngredient${index}`];
  }
  delete item[`ingredient${'Weights'}`];
  delete item[`minimum${'Primary'}Matches`];
  delete item[`minimum_${'primary'}_matches`];
  delete item[`minimum${'Match'}Threshold`];
  delete item[`minimum_${'match'}_threshold`];
  return item;
}

const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
const recipeList = Array.isArray(recipes) ? recipes : recipes.recipes;
recipeList.forEach(enrichCoreRecipe);
fs.writeFileSync(recipesPath, `${JSON.stringify(Array.isArray(recipes) ? recipeList : recipes, null, 2)}\n`);
fs.writeFileSync(localRecipesPath, `window.COOKBUDDY_LOCAL_RECIPES = ${JSON.stringify(recipeList, null, 2)};\n`);

function sqlValue(value) {
  if (value === null || value === undefined || value === '') return 'NULL';
  if (typeof value === 'number') return String(value);
  return `'${String(value).replace(/'/g, "''")}'`;
}

const intelligenceSql = [
  '-- Generated by scripts/apply_ingredient_intelligence.mjs.',
  '-- Run after database/seed.sql when using PostgreSQL.',
  'BEGIN;',
  '',
  ...recipeList.map((recipe) => `UPDATE recipes SET recipe_type = 'core', primary_ingredient_1 = ${sqlValue(recipe.primary_ingredient_1)}, primary_ingredient_2 = ${sqlValue(recipe.primary_ingredient_2)}, secondary_ingredient_1 = ${sqlValue(recipe.secondary_ingredient_1)}, secondary_ingredient_2 = ${sqlValue(recipe.secondary_ingredient_2)}, secondary_ingredient_3 = ${sqlValue(recipe.secondary_ingredient_3)}, secondary_ingredient_4 = ${sqlValue(recipe.secondary_ingredient_4)}, secondary_ingredient_5 = ${sqlValue(recipe.secondary_ingredient_5)} WHERE source_id = ${sqlValue(recipe.sourceId)};`),
  '',
  'COMMIT;',
  ''
].join('\n');
fs.writeFileSync(ingredientIntelligenceSqlPath, intelligenceSql);

const collections = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));
(collections.collections || []).forEach((collection) => {
  (collection.items || []).forEach(enrichCollectionItem);
});
fs.writeFileSync(collectionsPath, `${JSON.stringify(collections, null, 2)}\n`);
fs.writeFileSync(localCollectionsPath, `window.COOKBUDDY_LOCAL_COLLECTIONS = ${JSON.stringify(collections, null, 2)};\n`);

console.log(`Enriched ${recipeList.length} core recipes and ${(collections.collections || []).reduce((sum, collection) => sum + (collection.items || []).length, 0)} collection recipes.`);
