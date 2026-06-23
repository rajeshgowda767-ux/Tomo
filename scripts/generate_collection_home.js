const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const backendPath = path.join(root, 'database', 'generated', 'recipes.json');
const frontendPath = path.join(root, 'frontend', 'local-recipes.js');

const COLLECTIONS_BY_HUB = Object.freeze({
  'Regional Journeys': Object.freeze([
    'Karnataka',
    'Andhra & Telangana',
    'Tamil Nadu',
    'Kerala',
    'Bengal',
    'Maharashtra',
    'Northeast',
    'North & West India',
    'Jammu & Kashmir',
  ]),
  'Everyday Cooking': Object.freeze([
    'Daily Comforts',
    'Tea Time Favourites',
    'Home Staples',
  ]),
  'Healthy Living': Object.freeze([
    'Healthy Plates',
    'Warm & Light Bowls',
  ]),
  'Family Favorites': Object.freeze([
    'Tiny Tummy Favorites',
    'Lunch Box & Tiffin',
  ]),
  'Global Bites': Object.freeze([
    'Global Breakfasts',
    'Global Bowls',
    'Global Mains',
    'Global Snacks',
    'Global Soups',
    'Global Street Food',
  ]),
  'Kitchen Essentials': Object.freeze([
    'Sides, Salads & Add-ons',
    'Chutneys, Podis & Condiments',
  ]),
  'Seasonal Specials': Object.freeze([
    'Summer Cooling',
    'Rainy Day Cravings',
  ]),
  'Celebrations & Traditions': Object.freeze([
    'Festival Sweets',
    'Regional Sweets',
    'Everyday Desserts',
    'Prasadam & Temple Foods',
  ]),
});

const COLLECTION_HUBS = Object.freeze(Object.keys(COLLECTIONS_BY_HUB));

const MANUAL_OVERRIDES = Object.freeze({
  'Ragi Mudde': ['Regional Journeys', 'Karnataka'],
  'Soppu Saaru': ['Regional Journeys', 'Karnataka'],
  Bassaru: ['Regional Journeys', 'Karnataka'],
  'Udupi Sambar': ['Regional Journeys', 'Karnataka'],
  'Egg Bhurji': ['Healthy Living', 'Healthy Plates'],
  'Besan Chilla': ['Healthy Living', 'Healthy Plates'],
  'Masala Chai': ['Everyday Cooking', 'Tea Time Favourites'],
  'Masala Bun': ['Everyday Cooking', 'Tea Time Favourites'],
  'Iyengar Bakery Toast': ['Everyday Cooking', 'Tea Time Favourites'],
  'Congress Kadlekai': ['Everyday Cooking', 'Tea Time Favourites'],
  'Dharwad Peda': ['Celebrations & Traditions', 'Regional Sweets'],
  'Gulab Jamun': ['Celebrations & Traditions', 'Everyday Desserts'],
});

const GLOBAL_COLLECTION_OVERRIDES = Object.freeze({
  'Spanish Omelette': 'Global Breakfasts',
  'Chicken Egg Rice Bowl': 'Global Bowls',
  'Chicken Fried Rice': 'Global Mains',
  'Chicken Mushroom Stir Fry': 'Global Mains',
  'Egg Fried Rice': 'Global Mains',
  'Garlic Chicken': 'Global Mains',
  'Garlic Egg Rice': 'Global Mains',
  'Paneer Fried Rice': 'Global Mains',
  'Schezwan Fried Rice': 'Global Mains',
  'Veg Fried Rice': 'Global Mains',
  'Chilli Mushroom': 'Global Snacks',
  'Chilli Paneer': 'Global Snacks',
  'Dragon Chicken': 'Global Snacks',
  'Veg Manchurian': 'Global Snacks',
  'Corn Soup': 'Global Soups',
  'Hot and Sour Soup': 'Global Soups',
  'Lemon Coriander Soup': 'Global Soups',
  'Manchow Soup': 'Global Soups',
  'Noodle Soup': 'Global Soups',
  'Sweet Corn Soup': 'Global Soups',
});

function normalize(value) {
  return String(value || '').toLowerCase();
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function recipeTitle(recipe) {
  return recipe.title || recipe.name || '';
}

function flattenRecipeText(recipe) {
  const values = [
    recipe.title,
    recipe.name,
    recipe.cuisine,
    recipe.dietType,
    recipe.recipeRole,
    recipe.dishFamily,
    recipe.dish_family,
    recipe.primaryMood,
    recipe.secondaryMood,
    recipe.description,
    ...(recipe.tags || []),
    ...(recipe.mealTags || []),
    ...(recipe.moodTags || []),
    ...(recipe.dietaryTags || []),
    ...(recipe.requiredIngredients || []),
    ...(recipe.optionalIngredients || []),
  ];

  if (recipe.regionTags && typeof recipe.regionTags === 'object') {
    Object.values(recipe.regionTags).flat().forEach((value) => values.push(value));
  }

  return normalize(values.join(' | '));
}

function regionCollection(recipe) {
  const text = flattenRecipeText(recipe);
  const checks = [
    ['Karnataka', ['karnataka', 'kodagu', 'coorg', 'malnad', 'mangalur', 'udupi', 'mysore', 'mandya', 'dharwad', 'davangere', 'bengaluru', 'north karnataka', 'coastal karnataka', 'akki roti', 'ragi mudde', 'bisibele', 'bisi bele', 'saaru', 'palya', 'kadambuttu']],
    ['Andhra & Telangana', ['andhra', 'telangana', 'hyderabad', 'telugu', 'guntur', 'rayalaseema', 'gongura', 'podi idli', 'kodi', 'pulusu', 'pesarattu']],
    ['Tamil Nadu', ['tamil', 'chettinad', 'kongu', 'madurai', 'chennai', 'poriyal', 'kuzhambu', 'pongal', 'nattu kozhi', 'rasam']],
    ['Kerala', ['kerala', 'malabar', 'travancore', 'kochi', 'onam', 'appam', 'puttu', 'kadala', 'avial', 'meen']],
    ['Bengal', ['bengal', 'bengali', 'kolkata', 'macher', 'posto', 'ilish', 'mishti', 'sandesh', 'ghugni', 'jhalmuri']],
    ['Maharashtra', ['maharashtra', 'maharashtrian', 'mumbai', 'konkan', 'puneri', 'pav', 'poha', 'modak', 'kolhapuri', 'misal', 'thecha', 'matki', 'sabudana']],
    ['Northeast', ['assam', 'assamese', 'naga', 'manipur', 'meghalaya', 'mizoram', 'tripura', 'arunachal', 'sikkim', 'northeast', 'north east', 'eromba', 'galho', 'jadoh', 'bamboo shoot']],
    ['Jammu & Kashmir', ['jammu', 'kashmir', 'kashmiri', 'wazwan', 'rogan josh']],
    ['North & West India', ['north indian', 'punjabi', 'gujarati', 'rajasthani', 'bihari', 'odia', 'goan', 'uttar pradesh', 'delhi', 'chole', 'rajma', 'thepla', 'dhokla', 'kadhi', 'litti', 'laal maas', 'dalma', 'pakhala']],
  ];

  const match = checks.find(([, terms]) => includesAny(text, terms));
  return match ? match[0] : '';
}

function isFamilyRecipe(recipe) {
  const text = flattenRecipeText(recipe);
  const title = normalize(recipeTitle(recipe));
  return includesAny(text, ['baby', 'toddler', 'school', 'lunchbox', 'tiffin', 'tiny tummy'])
    || (includesAny(title, ['puree', 'porridge']) && text.includes('baby'));
}

function isCelebrationRecipe(recipe) {
  const text = flattenRecipeText(recipe);
  const title = normalize(recipeTitle(recipe));
  const role = normalize(recipe.recipeRole);
  if (role === 'dessert') return true;
  if (includesAny(text, ['festival', 'festive', 'celebration', 'prasadam', 'prasad', 'diwali', 'christmas', 'eid'])) return true;
  return [
    'ladoo',
    'laddu',
    'peda',
    'mysore pak',
    'katli',
    'barfi',
    'burfi',
    'halwa',
    'kheer',
    'payasam',
    'jamun',
    'jalebi',
    'sandesh',
    'rasmalai',
    'modak',
    'puran poli',
    'holige',
    'gujiya',
    'pitha',
    'plum cake',
    'rose cookies',
    'kalkals',
    'marzipan',
    'macaroons',
  ].some((term) => title === term || title.includes(term));
}

function isGlobalRecipe(recipe) {
  const text = flattenRecipeText(recipe);
  return !regionCollection(recipe) && includesAny(text, [
    'italian',
    'mexican',
    'thai',
    'chinese',
    'korean',
    'japanese',
    'middle eastern',
    'mediterranean',
    'continental',
    'american',
    'spanish',
    'pasta',
    'taco',
    'quesadilla',
    'noodle',
    'momo',
    'momos',
    'pizza',
    'burger',
  ]);
}

function kitchenEssentialsCollection(recipe) {
  const text = flattenRecipeText(recipe);
  const title = normalize(recipeTitle(recipe));
  const role = normalize(recipe.recipeRole);
  if (
    role === 'condiment'
    || includesAny(title, ['chutney', 'podi', 'pickle'])
  ) {
    return 'Chutneys, Podis & Condiments';
  }
  if (
    role === 'side'
    || includesAny(title, ['raita', 'palya', 'poriyal', 'thoran', 'kosambari', 'salad'])
    || includesAny(text, ['add-on', 'addon', 'side-dish'])
  ) {
    return 'Sides, Salads & Add-ons';
  }
  return '';
}

function healthyLivingCollection(recipe) {
  const text = flattenRecipeText(recipe);
  const title = normalize(recipeTitle(recipe));
  const role = normalize(recipe.recipeRole);
  const healthSignal = includesAny(title, [
    'chilla',
    'oats',
    'sprout',
    'salad',
    'soup',
    'clear',
    'protein',
    'tofu',
    'egg',
    'paneer bowl',
    'rice bowl',
    'millet bowl',
    'khichdi bowl',
    'smoothie',
  ]) || includesAny(text, ['healthy', 'high-protein', 'protein-rich', 'light meal', 'light_meal', 'gym-foods', 'salad']);

  if (!healthSignal || regionCollection(recipe)) return '';
  if (role === 'soup' || title.includes('soup')) return 'Warm & Light Bowls';
  return 'Healthy Plates';
}

function seasonalCollection(recipe) {
  const text = flattenRecipeText(recipe);
  const role = normalize(recipe.recipeRole);
  if (includesAny(text, ['summer cooling', 'cooling']) && role === 'drink') return 'Summer Cooling';
  if (includesAny(text, ['rainy-day-only', 'monsoon-special'])) return 'Rainy Day Cravings';
  return '';
}

function manualOverride(recipe) {
  const override = MANUAL_OVERRIDES[recipeTitle(recipe)];
  if (!override) return null;
  return { hub: override[0], collection: override[1], rule: 'manualOverride' };
}

function familyRule(recipe) {
  if (!isFamilyRecipe(recipe)) return null;
  const text = flattenRecipeText(recipe);
  const collection = includesAny(text, ['baby', 'toddler', 'puree', 'porridge'])
    ? 'Tiny Tummy Favorites'
    : 'Lunch Box & Tiffin';
  return { hub: 'Family Favorites', collection, rule: 'familyRule' };
}

function celebrationRule(recipe) {
  if (!isCelebrationRecipe(recipe)) return null;
  const text = flattenRecipeText(recipe);
  const title = normalize(recipeTitle(recipe));
  let collection = 'Everyday Desserts';
  if (includesAny(text, ['prasadam', 'prasad'])) collection = 'Prasadam & Temple Foods';
  else if (includesAny(text, ['festival', 'festive', 'celebration', 'diwali', 'christmas', 'eid'])) collection = 'Festival Sweets';
  else if (includesAny(text, ['karnataka', 'bengal', 'maharashtra', 'kerala', 'tamil', 'andhra', 'telangana', 'regional']) || includesAny(title, ['peda', 'mysore pak', 'sandesh', 'rasgulla', 'payasam', 'modak', 'puran poli', 'holige'])) collection = 'Regional Sweets';
  return { hub: 'Celebrations & Traditions', collection, rule: 'celebrationRule' };
}

function globalRule(recipe) {
  if (!isGlobalRecipe(recipe)) return null;
  return { hub: 'Global Bites', collection: globalCollection(recipe), rule: 'globalRule' };
}

function globalCollection(recipe) {
  const title = recipeTitle(recipe);
  if (GLOBAL_COLLECTION_OVERRIDES[title]) return GLOBAL_COLLECTION_OVERRIDES[title];

  const text = flattenRecipeText(recipe);
  const role = normalize(recipe.recipeRole);
  if (role === 'soup' || includesAny(text, ['soup', 'stew', 'broth', 'ramen'])) return 'Global Soups';
  if (includesAny(text, ['breakfast', 'omelette', 'omelet', 'toast', 'pancake', 'waffle', 'oats'])) return 'Global Breakfasts';
  if (includesAny(text, ['bowl', 'rice bowl', 'poke', 'bibimbap'])) return 'Global Bowls';
  if (role === 'snack' && includesAny(text, ['street', 'taco', 'quesadilla', 'wrap', 'roll', 'burger', 'pizza', 'fries', 'nachos', 'falafel'])) return 'Global Street Food';
  if (role === 'snack') return 'Global Snacks';
  return 'Global Mains';
}

function kitchenEssentialsRule(recipe) {
  const collection = kitchenEssentialsCollection(recipe);
  if (!collection) return null;
  return { hub: 'Kitchen Essentials', collection, rule: 'kitchenEssentialsRule' };
}

function healthyLivingRule(recipe) {
  const collection = healthyLivingCollection(recipe);
  if (!collection) return null;
  return { hub: 'Healthy Living', collection, rule: 'healthyLivingRule' };
}

function regionalRule(recipe) {
  const collection = regionCollection(recipe);
  if (!collection) return null;
  return { hub: 'Regional Journeys', collection, rule: 'regionalRule' };
}

function seasonalRule(recipe) {
  const collection = seasonalCollection(recipe);
  if (!collection) return null;
  return { hub: 'Seasonal Specials', collection, rule: 'seasonalRule' };
}

function everydayFallback(recipe) {
  const role = normalize(recipe.recipeRole);
  if (role === 'drink') return { hub: 'Everyday Cooking', collection: 'Tea Time Favourites', rule: 'everydayFallback' };
  if (role === 'snack') return { hub: 'Everyday Cooking', collection: 'Tea Time Favourites', rule: 'everydayFallback' };
  if (role === 'main') return { hub: 'Everyday Cooking', collection: 'Daily Comforts', rule: 'everydayFallback' };
  return { hub: 'Everyday Cooking', collection: 'Home Staples', rule: 'everydayFallback' };
}

const RULES = Object.freeze([
  manualOverride,
  familyRule,
  celebrationRule,
  globalRule,
  kitchenEssentialsRule,
  healthyLivingRule,
  regionalRule,
  seasonalRule,
  everydayFallback,
]);

function collectionSignals(recipe) {
  return [
    manualOverride(recipe) && 'manualOverride',
    isFamilyRecipe(recipe) && 'familyRule',
    isCelebrationRecipe(recipe) && 'celebrationRule',
    isGlobalRecipe(recipe) && 'globalRule',
    kitchenEssentialsCollection(recipe) && 'kitchenEssentialsRule',
    healthyLivingCollection(recipe) && 'healthyLivingRule',
    regionCollection(recipe) && 'regionalRule',
    seasonalCollection(recipe) && 'seasonalRule',
  ].filter(Boolean);
}

function assignCollectionHome(recipe) {
  const match = RULES.map((rule) => rule(recipe)).find(Boolean);
  if (!match) {
    return {
      collectionHome: null,
      rule: null,
      signals: collectionSignals(recipe),
      valid: false,
    };
  }

  return {
    collectionHome: {
      hub: match.hub,
      collection: match.collection,
    },
    rule: match.rule,
    signals: collectionSignals(recipe),
    valid: isValidCollectionHome({ hub: match.hub, collection: match.collection }),
  };
}

function isValidCollectionHome(collectionHome) {
  if (!collectionHome || typeof collectionHome !== 'object' || Array.isArray(collectionHome)) return false;
  if (Object.hasOwn(collectionHome, 'subcollection')) return false;
  const allowed = COLLECTIONS_BY_HUB[collectionHome.hub];
  return Array.isArray(allowed) && allowed.includes(collectionHome.collection);
}

function countBy(items, keyFn) {
  return Object.fromEntries(
    Object.entries(
      items.reduce((counts, item) => {
        const key = keyFn(item);
        counts[key] = (counts[key] || 0) + 1;
        return counts;
      }, {})
    ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  );
}

function readBackendRecipes() {
  return JSON.parse(fs.readFileSync(backendPath, 'utf8'));
}

function readFrontendRecipes() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(frontendPath, 'utf8'), sandbox, { filename: frontendPath });
  return sandbox.window.COOKBUDDY_LOCAL_RECIPES;
}

function writeBackendRecipes(recipes) {
  fs.writeFileSync(backendPath, `${JSON.stringify(recipes, null, 2)}\n`);
}

function writeFrontendRecipes(recipes) {
  const prefix = '// TODO(Beta 3): Replace temporary shared fallback images with dedicated recipe images when approved assets are available.\nwindow.COOKBUDDY_LOCAL_RECIPES = ';
  fs.writeFileSync(frontendPath, `${prefix}${JSON.stringify(recipes, null, 2)};\n`);
}

function applyCollectionHome(recipes) {
  const assignments = [];
  const updatedRecipes = recipes.map((recipe) => {
    const assignment = assignCollectionHome(recipe);
    assignments.push({
      id: recipe.id,
      title: recipeTitle(recipe),
      rule: assignment.rule,
      signals: assignment.signals,
      collectionHome: assignment.collectionHome,
      valid: assignment.valid,
    });
    return {
      ...recipe,
      collectionHome: assignment.collectionHome,
    };
  });

  const invalid = assignments.filter((assignment) => !assignment.valid);
  const conflicts = assignments.filter((assignment) => assignment.signals.length > 1);
  const fallbacks = assignments.filter((assignment) => assignment.rule === 'everydayFallback');
  const hubCounts = countBy(assignments, (assignment) => assignment.collectionHome?.hub || '(invalid)');
  const collectionCounts = countBy(assignments, (assignment) => {
    const home = assignment.collectionHome;
    return home ? `${home.hub} > ${home.collection}` : '(invalid)';
  });

  return {
    recipes: updatedRecipes,
    report: {
      recipeCount: recipes.length,
      collectionHomeCount: updatedRecipes.filter((recipe) => recipe.collectionHome).length,
      hubCounts,
      collectionCounts,
      conflictCount: conflicts.length,
      fallbackCount: fallbacks.length,
      invalidCount: invalid.length,
      conflicts,
      fallbacks,
      invalid,
    },
  };
}

function generateCollectionHome() {
  const backendRecipes = readBackendRecipes();
  const frontendRecipes = readFrontendRecipes();
  if (!Array.isArray(backendRecipes) || !Array.isArray(frontendRecipes)) {
    throw new Error('Both recipe sources must be arrays.');
  }
  if (backendRecipes.length !== frontendRecipes.length) {
    throw new Error(`Recipe source count mismatch: backend=${backendRecipes.length}, frontend=${frontendRecipes.length}`);
  }

  const { recipes: updatedBackend, report } = applyCollectionHome(backendRecipes);
  const { recipes: updatedFrontend } = applyCollectionHome(frontendRecipes);
  writeBackendRecipes(updatedBackend);
  writeFrontendRecipes(updatedFrontend);
  return report;
}

function printReport(report) {
  console.log(`Collection home generation: ${report.invalidCount ? 'FAIL' : 'PASS'}`);
  console.log(`Recipes: ${report.recipeCount}`);
  console.log(`collectionHome fields: ${report.collectionHomeCount}`);
  console.log(`Conflicts: ${report.conflictCount}`);
  console.log(`Fallbacks: ${report.fallbackCount}`);
  console.log(`Invalid: ${report.invalidCount}`);
  console.log('\nHub counts:');
  Object.entries(report.hubCounts).forEach(([key, count]) => console.log(`- ${key}: ${count}`));
  console.log('\nCollection counts:');
  Object.entries(report.collectionCounts).forEach(([key, count]) => console.log(`- ${key}: ${count}`));
}

if (require.main === module) {
  try {
    const report = generateCollectionHome();
    printReport(report);
    process.exitCode = report.invalidCount ? 1 : 0;
  } catch (error) {
    console.error(`Collection home generation: FAIL\n${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  COLLECTIONS_BY_HUB,
  COLLECTION_HUBS,
  MANUAL_OVERRIDES,
  assignCollectionHome,
  applyCollectionHome,
  collectionSignals,
  generateCollectionHome,
  isValidCollectionHome,
};
