import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const recipesPath = path.join(root, 'database/generated/recipes.json');
const catalogJsonPath = path.join(root, 'database/generated/pantry_ingredient_catalog.json');
const catalogCsvPath = path.join(root, 'database/generated/pantry_ingredient_catalog.csv');
const localCatalogPath = path.join(root, 'frontend/local-pantry-catalog.js');

function normalizeIngredientName(name) {
  return String(name || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatIngredientName(name) {
  return normalizeIngredientName(name).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const categoryOrder = [
  'Vegetables',
  'Fruits',
  'Grains & Dals',
  'Proteins',
  'Dairy',
  'Spices & Seasonings',
  'Chillies',
  'Oils & Fats',
  'Sauces & Condiments'
];

const ingredientCategories = new Map(Object.entries({
  onion: 'Vegetables',
  tomato: 'Vegetables',
  potato: 'Vegetables',
  carrot: 'Vegetables',
  cabbage: 'Vegetables',
  capsicum: 'Vegetables',
  corn: 'Vegetables',
  mushroom: 'Vegetables',
  drumstick: 'Vegetables',
  gongura: 'Vegetables',
  methi: 'Vegetables',
  palak: 'Vegetables',
  shallots: 'Vegetables',
  'spring onion': 'Vegetables',
  vegetables: 'Vegetables',

  apple: 'Fruits',
  banana: 'Fruits',

  lemon: 'Spices & Seasonings',
  kokum: 'Spices & Seasonings',
  tamarind: 'Spices & Seasonings',
  rice: 'Grains & Dals',
  wheat: 'Grains & Dals',
  'whole wheat': 'Grains & Dals',
  'wheat flour': 'Grains & Dals',
  besan: 'Grains & Dals',
  bread: 'Grains & Dals',
  maida: 'Grains & Dals',
  poha: 'Grains & Dals',
  rava: 'Grains & Dals',
  oats: 'Grains & Dals',
  ragi: 'Grains & Dals',
  noodles: 'Grains & Dals',
  sevai: 'Grains & Dals',
  sabudana: 'Grains & Dals',
  'rice flour': 'Grains & Dals',
  'dosa rice': 'Grains & Dals',
  'idli rice': 'Grains & Dals',
  pav: 'Grains & Dals',
  'moong dal': 'Grains & Dals',
  'toor dal': 'Grains & Dals',
  'urad dal': 'Grains & Dals',
  'black urad dal': 'Grains & Dals',
  dal: 'Grains & Dals',
  rajma: 'Grains & Dals',
  chana: 'Grains & Dals',
  chole: 'Grains & Dals',
  matki: 'Grains & Dals',
  sesame: 'Grains & Dals',
  peanut: 'Grains & Dals',
  idli: 'Grains & Dals',
  'idli batter': 'Grains & Dals',
  dosa: 'Grains & Dals',
  'dosa batter': 'Grains & Dals',

  chicken: 'Proteins',
  'country chicken': 'Proteins',
  egg: 'Proteins',
  fish: 'Proteins',
  mutton: 'Proteins',
  prawn: 'Proteins',
  'minced meat': 'Proteins',
  keema: 'Proteins',
  pork: 'Proteins',
  paneer: 'Proteins',

  milk: 'Dairy',
  curd: 'Dairy',
  khoya: 'Dairy',
  butter: 'Dairy',
  'coconut milk': 'Dairy',

  coconut: 'Spices & Seasonings',
  'dry coconut': 'Spices & Seasonings',
  ajwain: 'Spices & Seasonings',
  'curry leaves': 'Spices & Seasonings',
  'black pepper': 'Spices & Seasonings',
  'garam masala': 'Spices & Seasonings',
  garlic: 'Spices & Seasonings',
  ginger: 'Spices & Seasonings',
  'mustard seeds': 'Spices & Seasonings',
  podi: 'Spices & Seasonings',
  cumin: 'Spices & Seasonings',
  mint: 'Spices & Seasonings',
  turmeric: 'Spices & Seasonings',
  lemon: 'Spices & Seasonings',
  kokum: 'Spices & Seasonings',
  tamarind: 'Spices & Seasonings',
  jaggery: 'Spices & Seasonings',
  'dry fruits': 'Spices & Seasonings',
  'chaat masala': 'Spices & Seasonings',
  'kolhapuri masala': 'Spices & Seasonings',
  'madras curry powder': 'Spices & Seasonings',
  'misal masala': 'Spices & Seasonings',
  tea: 'Spices & Seasonings',

  chilli: 'Chillies',
  'green chilli': 'Chillies',
  'red chilli': 'Chillies',
  'guntur chilli': 'Chillies',
  'byadgi chilli': 'Chillies',
  'mathania chilli': 'Chillies',

  oil: 'Oils & Fats',
  ghee: 'Oils & Fats',
  'sesame oil': 'Oils & Fats',

  'schezwan sauce': 'Sauces & Condiments',
  'soy sauce': 'Sauces & Condiments'
}));

const preparedDishReview = new Map(Object.entries({
  idli: 'Prepared dish. Keep in database for leftover-idli recipes; visible pantry uses Idli Batter as the friendly input.',
  dosa: 'Prepared dish. Keep in database for leftover/ready-dosa recipes; visible pantry uses Dosa Rice and Urad Dal.',
  'dosa batter': 'Prepared batter. Hidden from pantry chips and kept as an alias for Dosa Rice.',
  chole: 'Common finished-dish name; visible pantry uses Chana with Chole as an alias.'
}));

const hiddenDatabaseIngredients = new Set([
  'idli',
  'dosa',
  'dosa batter',
  'chole',
  'chilli',
  'byadgi chilli',
  'mathania chilli',
  'oil',
  'ghee',
  'sesame oil',
  'schezwan sauce',
  'soy sauce',
  'ajwain',
  'cumin',
  'turmeric',
  'black pepper',
  'mustard seeds',
  'tea',
  'jaggery'
]);

const hiddenIngredientNotes = new Map(Object.entries({
  idli: 'Hidden from visible pantry selection. Kept in database and aliases; users select Idli Rice and Urad Dal.',
  dosa: 'Hidden from visible pantry selection. Kept in database and aliases; users select Dosa Rice and Urad Dal.',
  'dosa batter': 'Hidden from visible pantry selection. Kept as an alias; users select Dosa Rice and Urad Dal.',
  chole: 'Hidden from visible pantry selection. Kept in database and aliases; users select Chana.',
  chilli: 'Hidden generic chilli. Mapped to Red Chilli for visible pantry selection.',
  'byadgi chilli': 'Hidden regional chilli. Mapped to Red Chilli for visible pantry selection.',
  'mathania chilli': 'Hidden regional chilli. Mapped to Red Chilli for visible pantry selection.',
  oil: 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  ghee: 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  'sesame oil': 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  'schezwan sauce': 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  'soy sauce': 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  ajwain: 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  cumin: 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  turmeric: 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  'black pepper': 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  'mustard seeds': 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  tea: 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.',
  jaggery: 'Hidden from visible pantry selection for V1. Kept in database for matching/reference.'
}));

function categoryForIngredient(name) {
  return ingredientCategories.get(normalizeIngredientName(name)) || 'Spices & Seasonings';
}

function categorySortIndex(category) {
  const index = categoryOrder.indexOf(category);
  return index === -1 ? 99 : index + 1;
}

function recipeIngredientNames(recipe) {
  const names = [
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2,
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.secondary_ingredient_1,
    recipe.secondary_ingredient_2,
    recipe.secondary_ingredient_3,
    recipe.secondary_ingredient_4,
    recipe.secondary_ingredient_5,
    recipe.secondaryIngredient1,
    recipe.secondaryIngredient2,
    recipe.secondaryIngredient3,
    recipe.secondaryIngredient4,
    recipe.secondaryIngredient5,
    ...(recipe.ingredients || []).map((ingredient) => ingredient.name)
  ];
  const seen = new Set();
  return names
    .map(normalizeIngredientName)
    .filter(Boolean)
    .filter((name) => {
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
}

const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
const counts = new Map();

for (const recipe of recipes) {
  if (String(recipe.recipe_type || recipe.recipeType || 'core').toLowerCase() !== 'core') continue;
  for (const ingredient of recipeIngredientNames(recipe)) {
    counts.set(ingredient, (counts.get(ingredient) || 0) + 1);
  }
}

const catalog = [...counts.entries()]
  .map(([ingredient_name, used_by_recipe_count]) => ({
    ingredient_name: formatIngredientName(ingredient_name),
    ingredient_key: ingredient_name,
    used_by_recipe_count,
    category: categoryForIngredient(ingredient_name),
    category_order: categorySortIndex(categoryForIngredient(ingredient_name)),
    display_status: hiddenDatabaseIngredients.has(ingredient_name) ? 'hidden' : 'visible',
    review_note: hiddenIngredientNotes.get(ingredient_name) || preparedDishReview.get(ingredient_name) || ''
  }))
  .sort((a, b) => a.category_order - b.category_order || b.used_by_recipe_count - a.used_by_recipe_count || a.ingredient_name.localeCompare(b.ingredient_name));

const userIngredientGroups = [
  { label: 'Onion', aliases: ['Onion', 'Shallots'] },
  { label: 'Spring Onion', aliases: ['Spring Onion'] },
  { label: 'Tomato', aliases: ['Tomato'] },
  { label: 'Potato', aliases: ['Potato'] },
  { label: 'Carrot', aliases: ['Carrot'] },
  { label: 'Cabbage', aliases: ['Cabbage'] },
  { label: 'Capsicum', aliases: ['Capsicum'] },
  { label: 'Corn', aliases: ['Corn'] },
  { label: 'Mushroom', aliases: ['Mushroom'] },
  { label: 'Palak', aliases: ['Palak', 'Spinach'] },
  { label: 'Drumstick', aliases: ['Drumstick'] },
  { label: 'Gongura', aliases: ['Gongura'] },
  { label: 'Methi', aliases: ['Methi', 'Fenugreek Leaves'] },
  { label: 'Apple', aliases: ['Apple'] },
  { label: 'Banana', aliases: ['Banana'] },
  { label: 'Lemon', aliases: ['Lemon'] },
  { label: 'Tamarind', aliases: ['Tamarind'] },
  { label: 'Kokum', aliases: ['Kokum'] },
  { label: 'Rice', aliases: ['Rice'] },
  { label: 'Wheat', aliases: ['Wheat', 'Whole Wheat', 'Wheat Flour'] },
  { label: 'Rava', aliases: ['Rava', 'Semolina'] },
  { label: 'Poha', aliases: ['Poha', 'Avalakki'] },
  { label: 'Ragi', aliases: ['Ragi'] },
  { label: 'Oats', aliases: ['Oats'] },
  { label: 'Moong Dal', aliases: ['Moong Dal'] },
  { label: 'Toor Dal', aliases: ['Toor Dal'] },
  { label: 'Urad Dal', aliases: ['Urad Dal', 'Black Urad Dal'] },
  { label: 'Besan', aliases: ['Besan'] },
  { label: 'Maida', aliases: ['Maida', 'All Purpose Flour'] },
  { label: 'Rice Flour', aliases: ['Rice Flour'] },
  { label: 'Dosa Rice', aliases: ['Dosa Rice', 'Dosa Batter', 'Dosa'] },
  { label: 'Sabudana', aliases: ['Sabudana'] },
  { label: 'Noodles', aliases: ['Noodles'] },
  { label: 'Sevai', aliases: ['Sevai', 'Vermicelli', 'Seviyan'] },
  { label: 'Bread', aliases: ['Bread', 'Pav'] },
  { label: 'Idli Rice', aliases: ['Idli Rice', 'Idli'] },
  { label: 'Rajma', aliases: ['Rajma'] },
  { label: 'Chana', aliases: ['Chana', 'Chickpea', 'Chole'] },
  { label: 'Peanut', aliases: ['Peanut'] },
  { label: 'Chicken', aliases: ['Chicken', 'Country Chicken'] },
  { label: 'Egg', aliases: ['Egg'] },
  { label: 'Fish', aliases: ['Fish'] },
  { label: 'Mutton', aliases: ['Mutton'] },
  { label: 'Prawn', aliases: ['Prawn'] },
  { label: 'Minced Meat', aliases: ['Minced Meat', 'Keema', 'Kheema'] },
  { label: 'Pork', aliases: ['Pork'] },
  { label: 'Paneer', aliases: ['Paneer'] },
  { label: 'Milk', aliases: ['Milk'] },
  { label: 'Curd', aliases: ['Curd', 'Yogurt'] },
  { label: 'Khoya', aliases: ['Khoya', 'Milk Solids'] },
  { label: 'Coconut Milk', aliases: ['Coconut Milk'] },
  { label: 'Butter', aliases: ['Butter'] },
  { label: 'Coconut', aliases: ['Coconut', 'Dry Coconut'] },
  { label: 'Curry Leaves', aliases: ['Curry Leaves'] },
  { label: 'Garlic', aliases: ['Garlic'] },
  { label: 'Ginger', aliases: ['Ginger'] },
  { label: 'Podi', aliases: ['Podi', 'Gunpowder', 'Idli Podi'] },
  { label: 'Green Chilli', aliases: ['Green Chilli'] },
  { label: 'Red Chilli', aliases: ['Red Chilli', 'Chilli', 'Mathania Chilli', 'Byadgi Chilli', 'Byadagi Chilli'] },
  { label: 'Guntur Chilli', aliases: ['Guntur Chilli'] }
];

const categoryCounters = new Map();
const userIngredients = userIngredientGroups.map((group, index) => {
  const category = group.category || categoryForIngredient(group.label);
  const categoryCount = (categoryCounters.get(category) || 0) + 1;
  categoryCounters.set(category, categoryCount);
  return {
  ingredient_name: group.label,
  ingredient_key: normalizeIngredientName(group.label),
  aliases: [...new Set(group.aliases.map(formatIngredientName))],
    category,
    category_order: categorySortIndex(category),
    display_order: (categorySortIndex(category) * 100) + categoryCount,
    global_display_order: index + 1
  };
});

const displayAliasMap = {};
for (const group of userIngredients) {
  const aliases = [...new Set([group.ingredient_name, ...group.aliases].map(formatIngredientName))];
  for (const alias of aliases) {
    displayAliasMap[normalizeIngredientName(alias)] = aliases;
  }
}

const aliasMap = JSON.parse(JSON.stringify(displayAliasMap));
aliasMap.idli = ['Idli Rice', 'Urad Dal'];

const compoundMatchMap = {
  idli: ['idli rice', 'urad dal'],
  dosa: ['dosa rice', 'urad dal'],
  'idli rice': ['rice']
};

const csv = [
  'ingredient_name,used_by_recipe_count,category,category_order,display_status,review_note',
  ...catalog.map((item) => [
    item.ingredient_name,
    item.used_by_recipe_count,
    item.category,
    item.category_order,
    item.display_status,
    item.review_note
  ].map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
].join('\n');

fs.writeFileSync(catalogJsonPath, `${JSON.stringify(catalog, null, 2)}\n`);
fs.writeFileSync(catalogCsvPath, `${csv}\n`);
fs.writeFileSync(localCatalogPath, [
  `window.COOKBUDDY_PANTRY_CATALOG = ${JSON.stringify(catalog, null, 2)};`,
  `window.COOKBUDDY_USER_INGREDIENTS = ${JSON.stringify(userIngredients, null, 2)};`,
  `window.COOKBUDDY_PANTRY_DISPLAY_ALIAS_MAP = ${JSON.stringify(displayAliasMap, null, 2)};`,
  `window.COOKBUDDY_INGREDIENT_ALIAS_MAP = ${JSON.stringify(aliasMap, null, 2)};`,
  `window.COOKBUDDY_COMPOUND_INGREDIENT_MATCH_MAP = ${JSON.stringify(compoundMatchMap, null, 2)};`,
  ''
].join('\n'));

console.log(`Generated ${catalog.length} database pantry ingredients and ${userIngredients.length} user pantry ingredients.`);
