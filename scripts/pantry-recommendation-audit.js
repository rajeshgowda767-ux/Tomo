const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const recipes = JSON.parse(fs.readFileSync(path.join(root, 'database/generated/recipes.json'), 'utf8'));
const confidenceThreshold = 80;
const noStrongMatch = 'NO_STRONG_MATCH';

const auditCsv = `Category,Ingredient 1,Ingredient 2,Expected Result
Rice,Rice,Egg,Egg Fried Rice
Rice,Rice,Tomato,Tomato Rice
Rice,Rice,Onion,Veg Fried Rice
Rice,Rice,Potato,Veg Pulao
Rice,Rice,Paneer,Paneer Fried Rice
Rice,Rice,Tamarind,Puliyogare
Rice,Rice,Lemon,Lemon Rice
Rice,Rice,Coconut,Coconut Rice
Rice,Rice,Curd,Curd Rice
Rice,Rice,Peanuts,Peanut Rice
Rice,Rice,Capsicum,Veg Fried Rice
Rice,Rice,Carrot,Carrot Rice
Rice,Rice,Beans,Veg Rice
Rice,Rice,Green Peas,Peas Pulao
Rice,Rice,Mushroom,Mushroom Rice
Rice,Rice,Chicken,Chicken Fried Rice
Rice,Rice,Fish,Fish Rice
Rice,Rice,Mutton,Mutton Pulao
Rice,Rice,Garlic,Garlic Rice
Rice,Rice,Coriander,Coriander Rice
Rice,Rice,Mint,Mint Rice
Rice,Rice,Spinach,Spinach Rice
Rice,Rice,Beetroot,Beetroot Rice
Rice,Rice,Corn,Corn Rice
Rice,Rice,Soya Chunks,Soya Fried Rice
Wheat,Wheat Flour,Potato,Aloo Paratha
Wheat,Wheat Flour,Onion,Onion Paratha
Wheat,Wheat Flour,Paneer,Paneer Paratha
Wheat,Wheat Flour,Egg,Egg Paratha
Wheat,Wheat Flour,Spinach,Palak Paratha
Wheat,Wheat Flour,Methi,Methi Paratha
Wheat,Wheat Flour,Garlic,Garlic Paratha
Wheat,Wheat Flour,Beetroot,Beetroot Paratha
Wheat,Wheat Flour,Carrot,Carrot Paratha
Wheat,Wheat Flour,Radish,Mooli Paratha
Wheat,Wheat Flour,Cabbage,Cabbage Paratha
Wheat,Wheat Flour,Cheese,Cheese Paratha
Wheat,Wheat Flour,Corn,Corn Paratha
Wheat,Wheat Flour,Peas,Peas Paratha
Wheat,Wheat Flour,Jaggery,Sweet Holige
Dosa/Idli,Dosa Batter,Potato,Masala Dosa
Dosa/Idli,Dosa Batter,Onion,Onion Dosa
Dosa/Idli,Dosa Batter,Paneer,Paneer Dosa
Dosa/Idli,Dosa Batter,Cheese,Cheese Dosa
Dosa/Idli,Dosa Batter,Egg,Egg Dosa
Dosa/Idli,Idli Batter,Gunpowder,Gunpowder Idli
Dosa/Idli,Idli Batter,Onion,Onion Uttapam
Dosa/Idli,Idli Batter,Tomato,Tomato Uttapam
Dosa/Idli,Idli Batter,Cheese,Cheese Uttapam
Dosa/Idli,Idli Batter,Vegetable Mix,Vegetable Uttapam
Paneer,Paneer,Tomato,Paneer Bhurji
Paneer,Paneer,Onion,Paneer Bhurji
Paneer,Paneer,Capsicum,Kadai Paneer
Paneer,Paneer,Spinach,Palak Paneer
Paneer,Paneer,Peas,Matar Paneer
Paneer,Paneer,Mushroom,Paneer Mushroom Masala
Paneer,Paneer,Corn,Corn Paneer Masala
Paneer,Paneer,Rice,Paneer Fried Rice
Paneer,Paneer,Cheese,Cheesy Paneer Tikka
Paneer,Paneer,Garlic,Garlic Paneer
Egg,Egg,Onion,Onion Omelette
Egg,Egg,Tomato,Tomato Omelette
Egg,Egg,Bread,Egg Toast
Egg,Egg,Rice,Egg Fried Rice
Egg,Egg,Cheese,Cheese Omelette
Egg,Egg,Capsicum,Masala Omelette
Egg,Egg,Potato,Spanish Omelette
Egg,Egg,Mushroom,Mushroom Omelette
Egg,Egg,Spinach,Spinach Omelette
Egg,Egg,Paneer,Paneer Omelette
Chicken,Chicken,Onion,Chicken Fry
Chicken,Chicken,Tomato,Chicken Curry
Chicken,Chicken,Rice,Chicken Fried Rice
Chicken,Chicken,Egg,Chicken Egg Fried Rice
Chicken,Chicken,Potato,Chicken Potato Curry
Chicken,Chicken,Capsicum,Chilli Chicken
Chicken,Chicken,Mushroom,Chicken Mushroom Stir Fry
Chicken,Chicken,Garlic,Garlic Chicken
Chicken,Chicken,Coriander,Coriander Chicken
Chicken,Chicken,Mint,Mint Chicken
Fish,Fish,Tamarind,Fish Curry
Fish,Fish,Kokum,Kerala Fish Curry
Fish,Fish,Kokkum,Kerala Fish Curry
South Indian,Poha,Onion,Kanda Poha
South Indian,Poha,Potato,Batata Poha
South Indian,Poha,Peanuts,Peanut Poha
South Indian,Rava,Onion,Rava Upma
South Indian,Rava,Tomato,Tomato Upma
South Indian,Rava,Vegetable Mix,Vegetable Upma
South Indian,Avalakki,Coconut,Coconut Avalakki
South Indian,Avalakki,Onion,Avalakki Uppittu
South Indian,Rice,Tamarind,Puliyogare
South Indian,Rice,Curd,Curd Rice
Stress,Rice,Bread,NO_STRONG_MATCH
Stress,Rice,Paneer,Paneer Fried Rice
Stress,Rice,Jaggery,Sweet Rice
Stress,Paneer,Coconut,NO_STRONG_MATCH
Stress,Chicken,Jaggery,NO_STRONG_MATCH
Stress,Wheat Flour,Urad Dal,NO_STRONG_MATCH
Stress,Egg,Tamarind,NO_STRONG_MATCH
Stress,Poha,Paneer,NO_STRONG_MATCH
Stress,Fish,Cheese,NO_STRONG_MATCH
Stress,Curd,Bread,NO_STRONG_MATCH`;

function parseAuditRows(csv) {
  return csv.trim().split('\n').slice(1).map((line, index) => {
    const [category, ingredient1, ingredient2, expected] = line.split(',').map((value) => value.trim());
    return { id: index + 1, category, pantry: [ingredient1, ingredient2], expected };
  });
}

const auditRows = parseAuditRows(auditCsv);

const expectedOverrides = {
  'rice + onion': {
    primary: ['Onion Rice'],
    acceptable: ['Veg Fried Rice', 'Onion Pulao', 'Masala Rice'],
    suggested: ['Onion Rice', 'Veg Fried Rice', 'Onion Pulao', 'Masala Rice']
  },
  'rice + potato': {
    primary: ['Veg Pulao'],
    acceptable: [],
    suggested: ['Veg Pulao']
  },
  'rice + paneer': {
    primary: ['Paneer Fried Rice'],
    acceptable: ['Paneer Pulao'],
    suggested: ['Paneer Fried Rice', 'Paneer Pulao']
  },
  'rice + egg': {
    primary: ['Egg Fried Rice'],
    acceptable: ['Egg Rice', 'Egg Biryani', 'Egg Curry Rice'],
    suggested: ['Egg Fried Rice', 'Egg Rice', 'Egg Biryani', 'Egg Curry Rice']
  },
  'egg + rice': {
    primary: ['Egg Fried Rice'],
    acceptable: ['Egg Rice', 'Egg Biryani', 'Egg Curry Rice'],
    suggested: ['Egg Fried Rice', 'Egg Rice', 'Egg Biryani', 'Egg Curry Rice']
  },
  'rice + chicken': {
    primary: ['Chicken Fried Rice'],
    acceptable: ['Chicken Biryani', 'Biryani', 'Chicken Curry Rice'],
    secondary: ['Chicken Pulao'],
    suggested: ['Chicken Fried Rice', 'Chicken Biryani', 'Chicken Curry Rice', 'Chicken Pulao']
  },
  'rice + fish': {
    primary: ['Fish Rice'],
    acceptable: ['Fish Curry Rice'],
    suggested: ['Fish Curry Rice']
  },
  'chicken + rice': {
    primary: ['Chicken Fried Rice'],
    acceptable: ['Chicken Biryani', 'Biryani', 'Chicken Curry Rice'],
    secondary: ['Chicken Pulao'],
    suggested: ['Chicken Fried Rice', 'Chicken Biryani', 'Chicken Curry Rice', 'Chicken Pulao']
  },
  'wheat flour + methi': {
    primary: ['Methi Paratha'],
    acceptable: ['Mathri'],
    suggested: ['Methi Paratha']
  },
  'idli batter + gunpowder': {
    primary: ['Gunpowder Idli'],
    acceptable: ['Andhra Podi Idli'],
    suggested: ['Gunpowder Idli']
  },
  'paneer + capsicum': {
    primary: ['Kadai Paneer'],
    acceptable: ['Chilli Paneer'],
    suggested: ['Kadai Paneer']
  },
  'paneer + tomato': {
    primary: ['Paneer Bhurji'],
    acceptable: ['Paneer Tomato Curry', 'Paneer Tikka Masala', 'Paneer Masala'],
    suggested: ['Paneer Bhurji', 'Paneer Tomato Curry', 'Paneer Tikka Masala', 'Paneer Masala']
  },
  'egg + bread': {
    primary: ['Egg Toast'],
    acceptable: ['Bread Omelette'],
    suggested: ['Egg Toast', 'Bread Omelette']
  },
  'chicken + tomato': {
    primary: ['Chicken Curry'],
    acceptable: ['Butter Chicken', 'Tomato Chicken Masala'],
    suggested: ['Chicken Curry', 'Butter Chicken', 'Tomato Chicken Masala']
  },
  'fish + tamarind': {
    primary: ['Fish Curry'],
    acceptable: [],
    suggested: ['Fish Curry']
  },
  'fish + kokum': {
    primary: ['Kerala Fish Curry'],
    acceptable: [],
    suggested: ['Kerala Fish Curry']
  },
  'wheat flour + urad dal': {
    primary: [noStrongMatch],
    acceptable: [],
    secondary: [],
    suggested: []
  }
};

const knownWrongMatches = {
  'rice + paneer': ['Pongal', 'Sweet Pongal', 'Plain Rice'],
  'paneer + rice': ['Pongal', 'Sweet Pongal', 'Plain Rice'],
  'wheat flour + onion': ['Aloo Paratha', 'Plain Chapati'],
  'rice + onion': ['Gunpowder Idli', 'Plain Rice'],
  'onion + rice': ['Gunpowder Idli', 'Plain Rice'],
  'rice + potato': ['Aloo Paratha', 'Plain Rice'],
  'potato + rice': ['Aloo Paratha', 'Plain Rice'],
  'wheat flour + urad dal': ['Plain Chapati', 'Aloo Paratha']
};

function normalizeIngredientName(name) {
  const normalized = String(name).toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
  const canonical = {
    atta: 'wheat flour',
    wheat: 'wheat flour',
    eggs: 'egg',
    'boiled egg': 'egg',
    'boiled eggs': 'egg',
    omelette: 'egg',
    omelet: 'egg',
    'egg omelette': 'egg',
    'egg omelet': 'egg',
    'cooked rice': 'rice',
    'leftover rice': 'rice',
    'steamed rice': 'rice',
    'plain rice': 'rice',
    peas: 'green peas',
    'green pea': 'green peas',
    avalakki: 'poha',
    podi: 'gunpowder',
    'gun powder': 'gunpowder',
    palak: 'spinach',
    kokkum: 'kokum',
    kokam: 'kokum'
  };
  return canonical[normalized] || normalized;
}

const stapleIngredientBaseMap = {
  rice: ['rice', 'cooked rice', 'leftover rice', 'plain rice', 'steamed rice'],
  'wheat flour': ['wheat', 'wheat flour', 'atta', 'chapati flour'],
  bread: ['bread', 'pav'],
  'dosa batter': ['dosa batter', 'dosa'],
  'idli batter': ['idli', 'idli batter', 'idli rice'],
  poha: ['poha', 'avalakki'],
  pasta: ['pasta'],
  noodles: ['noodle', 'noodles']
};

function stapleBaseForIngredient(name) {
  const normalized = normalizeIngredientName(name);
  for (const [base, aliases] of Object.entries(stapleIngredientBaseMap)) {
    if (aliases.includes(normalized)) return base;
  }
  return '';
}

function pantryIngredientEquals(left, right) {
  const leftName = normalizeIngredientName(left);
  const rightName = normalizeIngredientName(right);
  if (!leftName || !rightName) return false;
  if (leftName === rightName) return true;
  const leftStaple = stapleBaseForIngredient(leftName);
  const rightStaple = stapleBaseForIngredient(rightName);
  if (leftStaple || rightStaple) return Boolean(leftStaple && rightStaple && leftStaple === rightStaple);
  return false;
}

function uniqueNormalizedIngredients(values) {
  return [...new Set((values || []).filter(Boolean).map(normalizeIngredientName))];
}

function normalizeDishFamilyName(value) {
  const normalized = normalizeIngredientName(value);
  const familyMap = {
    'rice meal': 'rice-meal',
    'fried rice': 'fried-rice',
    'rice dal': 'rice-dal',
    'paneer curry': 'paneer-curry',
    'fish curry': 'fish-curry'
  };
  return familyMap[normalized] || normalized;
}

function recipeTitleKey(title) {
  return normalizeIngredientName(title);
}

function recipeNames(recipe) {
  return [recipe.title, recipe.name, ...(recipe.aliases || [])].filter(Boolean);
}

function recipeMatchesTitle(recipe, expectedTitle) {
  return recipeNames(recipe).some((name) => recipeTitleKey(name) === recipeTitleKey(expectedTitle));
}

function titleMatches(left, right) {
  const recipe = recipes.find((item) => recipeTitleKey(item.title) === recipeTitleKey(left));
  return recipe ? recipeMatchesTitle(recipe, right) : recipeTitleKey(left) === recipeTitleKey(right);
}

function pantryKey(pantry) {
  return pantry.map(normalizeIngredientName).join(' + ');
}

function expectedConfig(row) {
  const key = pantryKey(row.pantry);
  const reversedKey = pantryKey([...row.pantry].reverse());
  const override = expectedOverrides[key] || expectedOverrides[reversedKey];
  if (override) return override;
  return {
    primary: [row.expected],
    acceptable: [],
    secondary: [],
    suggested: row.expected === noStrongMatch ? [] : [row.expected]
  };
}

function knownWrongForPantry(pantry) {
  const key = pantryKey(pantry);
  const reversedKey = pantryKey([...pantry].reverse());
  return knownWrongMatches[key] || knownWrongMatches[reversedKey] || [];
}

function topMatchesAny(title, values) {
  return values.some((value) => titleMatches(title, value));
}

function coreIngredients(recipe) {
  return uniqueNormalizedIngredients(recipe.coreIngredients || recipe.core_ingredients || [
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2
  ]);
}

function requiredIngredients(recipe, core) {
  return uniqueNormalizedIngredients(recipe.requiredIngredients || recipe.required_ingredients || core);
}

function optionalIngredients(recipe, core) {
  return uniqueNormalizedIngredients(recipe.optionalIngredients || recipe.optional_ingredients || [
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
  ]).filter((name) => !core.some((coreName) => pantryIngredientEquals(name, coreName)));
}

function baseIngredient(recipe, core) {
  const configured = normalizeIngredientName(recipe.baseIngredient || recipe.base_ingredient || '');
  if (configured) return configured;
  const title = recipeTitleKey(recipe.title);
  if (/\b(idli|uttapam)\b/.test(title)) return 'idli batter';
  if (/\b(dosa)\b/.test(title)) return 'dosa batter';
  if (/\b(paratha|roti|chapati|holige)\b/.test(title)) return 'wheat flour';
  if (/\b(poha|avalakki)\b/.test(title)) return 'poha';
  if (/\b(upma)\b/.test(title)) return 'rava';
  const staple = core.map(stapleBaseForIngredient).find(Boolean);
  return staple || core[0] || '';
}

function dishFamily(recipe, core, base) {
  const configured = normalizeDishFamilyName(recipe.dishFamily || recipe.dish_family || '');
  if (configured) return configured;
  const title = recipeTitleKey(recipe.title);
  if (/\b(pongal|khichdi|dal rice|sambar rice|rasam rice|curd rice)\b/.test(title)) return 'rice-dal';
  if (base === 'rice' && title.includes('fried rice')) return 'fried-rice';
  if (base === 'rice') return 'rice-meal';
  if (base === 'wheat flour') return 'paratha';
  if (base === 'idli batter') return 'idli';
  if (base === 'dosa batter') return 'dosa';
  if (base === 'poha') return 'poha';
  return base || 'general';
}

function dishFamilyIngredientAllowed(family, ingredient) {
  const dishFamily = normalizeDishFamilyName(family);
  const normalized = normalizeIngredientName(ingredient);
  const base = stapleBaseForIngredient(normalized);
  const dalLike = /\bdal\b/.test(normalized);
  const paneerLike = pantryIngredientEquals(normalized, 'paneer');
  const eggLike = pantryIngredientEquals(normalized, 'egg');
  const meatLike = ['chicken', 'fish', 'mutton'].some((name) => pantryIngredientEquals(normalized, name));
  const vegetableLike = ['onion', 'tomato', 'potato', 'carrot', 'capsicum', 'green peas', 'peas', 'corn', 'spinach', 'beetroot', 'mushroom', 'beans', 'coconut', 'lemon', 'tamarind', 'curd', 'peanuts', 'mint', 'coriander'].some((name) => pantryIngredientEquals(normalized, name));
  const seasoningLike = ['spices', 'cumin', 'pepper', 'ghee', 'oil', 'garlic', 'ginger', 'green chilli', 'curry leaves', 'soy sauce'].some((name) => pantryIngredientEquals(normalized, name));
  if (dishFamily === 'rice-dal') return base === 'rice' || dalLike || seasoningLike;
  if (dishFamily === 'rice-meal' || dishFamily === 'fried-rice') return base === 'rice' || paneerLike || eggLike || meatLike || vegetableLike || seasoningLike;
  if (dishFamily === 'paratha') return base === 'wheat flour' || paneerLike || eggLike || ['potato', 'onion', 'spinach', 'methi', 'garlic', 'beetroot', 'carrot', 'radish', 'cabbage', 'cheese', 'corn', 'green peas', 'peas', 'jaggery'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  if (dishFamily === 'idli') return base === 'idli batter' || ['gunpowder', 'podi', 'onion', 'tomato', 'cheese', 'vegetable mix'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  if (dishFamily === 'uttapam') return base === 'idli batter' || ['onion', 'tomato', 'cheese', 'vegetable mix'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  if (dishFamily === 'dosa') return base === 'dosa batter' || ['potato', 'onion', 'paneer', 'cheese', 'egg'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  if (dishFamily === 'poha') return base === 'poha' || ['onion', 'potato', 'peanuts', 'coconut'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  return true;
}

function breakdown(recipe, selected) {
  const selectedIngredients = uniqueNormalizedIngredients(selected);
  const core = coreIngredients(recipe);
  const required = requiredIngredients(recipe, core);
  const optional = optionalIngredients(recipe, core);
  const base = baseIngredient(recipe, core);
  const baseStaple = stapleBaseForIngredient(base) || base;
  const family = dishFamily(recipe, core, base);
  const matchedCore = core.filter((ingredient) => selectedIngredients.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const matchedRequired = required.filter((ingredient) => selectedIngredients.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const matchedOptional = optional.filter((ingredient) => selectedIngredients.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const matchedSelected = selectedIngredients.filter((selectedName) => {
    return core.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || required.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || optional.some((ingredient) => pantryIngredientEquals(selectedName, ingredient));
  });
  const unmatchedSelected = selectedIngredients.filter((selectedName) => !matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName)));
  const missingRequired = required.filter((ingredient) => !selectedIngredients.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  return { selectedIngredients, core, required, optional, base, baseStaple, family, matchedCore, matchedRequired, matchedOptional, matchedSelected, unmatchedSelected, missingRequired };
}

function validate(recipe, data) {
  const selectedStaples = [...new Set(data.selectedIngredients.map(stapleBaseForIngredient).filter(Boolean))];
  const supportingIngredients = uniqueNormalizedIngredients(recipe.pantrySupportingIngredients || recipe.pantry_supporting_ingredients || []);
  const partialMissingRequired = uniqueNormalizedIngredients(recipe.pantryPartialMissingRequired || recipe.pantry_partial_missing_required || []);
  const matchedCoreOrRequired = data.selectedIngredients.filter((selectedName) => {
    return data.core.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || data.required.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || supportingIngredients.some((ingredient) => pantryIngredientEquals(selectedName, ingredient));
  });
  const permitsPartialMissingRequired = data.missingRequired.length > 0
    && data.missingRequired.every((ingredient) => partialMissingRequired.some((allowed) => pantryIngredientEquals(ingredient, allowed)))
    && matchedCoreOrRequired.length >= Math.min(2, data.selectedIngredients.length);
  const unmatchedSelected = data.selectedIngredients.filter((selectedName) => !data.matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName)));
  const familyMismatches = data.selectedIngredients.filter((selectedName) => {
    if (data.matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName))) return false;
    return !dishFamilyIngredientAllowed(data.family, selectedName);
  });
  const incompatible = uniqueNormalizedIngredients(recipe.incompatibleWith || recipe.incompatible_with || [])
    .filter((ingredient) => data.selectedIngredients.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const baseMismatch = selectedStaples.length && data.baseStaple && selectedStaples.some((staple) => staple !== data.baseStaple);
  const reasons = [];
  if (!data.matchedCore.length) reasons.push('no selected core ingredient');
  if (incompatible.length) reasons.push(`incompatible with ${incompatible.join(', ')}`);
  if (baseMismatch) reasons.push(`base mismatch: ${selectedStaples.join(', ')} vs ${data.base}`);
  if (data.selectedIngredients.length >= 2 && matchedCoreOrRequired.length < Math.min(2, data.selectedIngredients.length)) reasons.push(`unused selected ingredient: ${data.unmatchedSelected.join(', ')}`);
  if (data.selectedIngredients.length >= 2 && data.missingRequired.length && !permitsPartialMissingRequired) reasons.push(`missing required: ${data.missingRequired.join(', ')}`);
  if (data.missingRequired.length && unmatchedSelected.length && !permitsPartialMissingRequired) reasons.push(`unrelated selected ingredient: ${unmatchedSelected.join(', ')}`);
  if (data.missingRequired.length && familyMismatches.length && !permitsPartialMissingRequired) reasons.push(`family mismatch: ${familyMismatches.join(', ')} not ${data.family}`);
  const blocked = reasons.length > 0;
  return {
    valid: !blocked,
    strict: !blocked && data.selectedIngredients.length >= 2 && matchedCoreOrRequired.length >= Math.min(2, data.selectedIngredients.length) && !data.missingRequired.length,
    reasons
  };
}

function metadataWarnings(recipe) {
  const warnings = [];
  if (!recipe.name) warnings.push('missing name');
  if (!Array.isArray(recipe.coreIngredients || recipe.core_ingredients)) warnings.push('missing coreIngredients');
  if (!Array.isArray(recipe.requiredIngredients || recipe.required_ingredients)) warnings.push('missing requiredIngredients');
  if (!Array.isArray(recipe.optionalIngredients || recipe.optional_ingredients)) warnings.push('missing optionalIngredients');
  if (!recipe.baseIngredient && !recipe.base_ingredient) warnings.push('missing baseIngredient');
  if (!recipe.dishFamily && !recipe.dish_family) warnings.push('missing dishFamily');
  if (!recipe.cuisine) warnings.push('missing cuisine');
  if (recipe.isRealDish !== true) warnings.push('missing isRealDish true');
  return warnings;
}

function scoreMatch(data) {
  const unusedPenalty = data.selectedIngredients.length >= 2 ? data.unmatchedSelected.length * 35 : 0;
  return Math.max(0, Math.min(100, (data.matchedSelected.length / Math.max(1, data.selectedIngredients.length)) * 58
    + (data.matchedCore.length / Math.max(1, data.core.length || 1)) * 37
    + (data.matchedOptional.length ? 5 : 0)
    - unusedPenalty));
}

function rank(selected) {
  const selectedIngredients = uniqueNormalizedIngredients(selected);
  const candidates = recipes
    .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core')
    .filter((recipe) => recipe.isRealDish === true)
    .map((recipe) => {
      const data = breakdown(recipe, selectedIngredients);
      const validity = validate(recipe, data);
      const score = Math.round(scoreMatch(data));
      return {
        recipe,
        title: recipe.title,
        score,
        validity,
        data,
        metadataWarnings: metadataWarnings(recipe),
        optionalOnly: data.matchedCore.length === 0 && data.matchedOptional.length > 0
      };
    })
    .filter((match) => match.validity.valid && match.data.matchedSelected.length > 0);
  const strict = candidates.filter((match) => match.validity.strict);
  return (strict.length ? strict : candidates)
    .sort((a, b) => b.score - a.score
      || b.data.matchedCore.length - a.data.matchedCore.length
      || a.data.missingRequired.length - b.data.missingRequired.length
      || a.title.localeCompare(b.title));
}

function hasRecipe(title) {
  return recipes.some((recipe) => recipeMatchesTitle(recipe, title));
}

function titleCase(value) {
  return String(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function suggestedAdditionsFor(row, missingExpected, best) {
  const suggestions = new Set(missingExpected);
  if (row.expected !== noStrongMatch && !missingExpected.length && best?.metadataWarnings.length) {
    suggestions.add(`${row.expected} metadata cleanup`);
  }
  if (row.status === 'LOW_CONFIDENCE' && row.expected !== noStrongMatch && !best) {
    suggestions.add(row.expected);
  }
  return [...suggestions];
}

function auditPair(row) {
  const config = expectedConfig(row);
  const expected = config.primary[0] || row.expected;
  const expectedIsNoStrongMatch = config.primary.includes(noStrongMatch);
  const preferredExpected = config.primary.filter((title) => title !== noStrongMatch);
  const acceptableExpected = config.acceptable || [];
  const secondaryExpected = config.secondary || [];
  const semanticFamily = [...preferredExpected, ...acceptableExpected, ...secondaryExpected];
  const missingExpected = preferredExpected.filter((title) => !hasRecipe(title));
  const topMatches = rank(row.pantry).slice(0, 3);
  const confidentMatches = topMatches.filter((match) => match.score >= confidenceThreshold);
  const best = confidentMatches[0] || null;
  const visibleTop = best || (expectedIsNoStrongMatch ? null : topMatches[0]) || null;
  const weakTop = topMatches[0] || null;
  const wrongMatches = knownWrongForPantry(row.pantry);
  const reasons = [];
  let status = 'PASS';

  if (expectedIsNoStrongMatch) {
    if (best) {
      if (topMatchesAny(best.title, wrongMatches) || best.data.matchedSelected.length < best.data.selectedIngredients.length) {
        status = 'FAIL';
        reasons.push(`expected no strong match, but ${best.title} scored ${best.score}`);
      } else {
        status = 'RANKING_IMPROVEMENT';
        reasons.push(`expected no strong match, but ${best.title} is ingredient-valid and should be reviewed`);
      }
    } else {
      reasons.push('No confident recommendation forced.');
    }
  } else if (missingExpected.includes(expected) && best && topMatchesAny(best.title, acceptableExpected)) {
    reasons.push(`Expected dish is covered by semantically equivalent existing recipe ${best.title}.`);
  } else if (missingExpected.includes(expected)) {
    status = 'MISSING_RECIPE';
    reasons.push(`primary expected recipe missing from database: ${expected}`);
  } else if (!best) {
    status = 'LOW_CONFIDENCE';
    reasons.push(`no confident top recommendation for expected dish ${expected}`);
  } else if (topMatchesAny(best.title, semanticFamily)) {
    reasons.push('Top recommendation matches the expected semantic dish family.');
  } else {
    status = topMatchesAny(best.title, wrongMatches) ? 'FAIL' : 'RANKING_IMPROVEMENT';
    reasons.push(`expected semantic family ${semanticFamily.join(', ') || expected}, but top recommendation was ${best.title}`);
  }

  if (weakTop && weakTop.score < confidenceThreshold && weakTop.data.matchedSelected.length < weakTop.data.selectedIngredients.length) {
    if (status === 'PASS') status = 'LOW_CONFIDENCE';
    reasons.push(`weak candidate ${weakTop.title} ignores selected ingredient ${weakTop.data.selectedIngredients.filter((selectedName) => !weakTop.data.matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName))).join(', ')}`);
  }
  if (best && best.data.matchedSelected.length < best.data.selectedIngredients.length) {
    status = best.score >= confidenceThreshold ? 'FAIL' : 'LOW_CONFIDENCE';
    reasons.push(`confident top recommendation ignores selected ingredient ${best.data.selectedIngredients.filter((selectedName) => !best.data.matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName))).join(', ')}`);
  }
  if (best?.optionalOnly) {
    status = 'FAIL';
    reasons.push('top recommendation matched only optional ingredients');
  }
  if (best && !best.validity.valid) {
    status = 'FAIL';
    reasons.push(best.validity.reasons.join('; '));
  }
  if (status === 'PASS' && best?.metadataWarnings.length) {
    status = 'PASS_WITH_METADATA_FIX';
    reasons.push(`top recommendation metadata needs cleanup: ${best.metadataWarnings.join(', ')}`);
  }

  const result = {
    id: row.id,
    category: row.category,
    pantry: row.pantry,
    expected: expectedIsNoStrongMatch ? noStrongMatch : expected,
    acceptableExpected: [...acceptableExpected, ...secondaryExpected],
    topRecommendation: visibleTop?.title || 'None',
    top3: topMatches.map((match) => `${match.title} (${match.score}%)`).join(' | ') || 'None',
    score: visibleTop?.score || 0,
    confidentTop: best?.title || 'None',
    confidentScore: best?.score || 0,
    status,
    reason: reasons.join('; '),
    missingLikelyDishes: missingExpected,
    missingRequiredIngredients: visibleTop?.data.missingRequired.join(', ') || '',
    suggestedDatabaseAdditions: []
  };
  result.suggestedDatabaseAdditions = [...new Set([
    ...suggestedAdditionsFor(result, missingExpected, best),
    ...(config.suggested || []).filter((title) => !hasRecipe(title) || missingExpected.includes(title))
  ])];
  return result;
}

function printSummary(rows) {
  const counts = rows.reduce((summary, row) => {
    summary[row.status] = (summary[row.status] || 0) + 1;
    return summary;
  }, { PASS: 0, PASS_WITH_METADATA_FIX: 0, MISSING_RECIPE: 0, RANKING_IMPROVEMENT: 0, LOW_CONFIDENCE: 0, FAIL: 0 });

  console.log('\nSummary Table');
  console.table([
    { status: 'PASS', count: counts.PASS || 0 },
    { status: 'PASS_WITH_METADATA_FIX', count: counts.PASS_WITH_METADATA_FIX || 0 },
    { status: 'MISSING_RECIPE', count: counts.MISSING_RECIPE || 0 },
    { status: 'RANKING_IMPROVEMENT', count: counts.RANKING_IMPROVEMENT || 0 },
    { status: 'LOW_CONFIDENCE', count: counts.LOW_CONFIDENCE || 0 },
    { status: 'FAIL', count: counts.FAIL || 0 },
    { status: 'TOTAL', count: rows.length }
  ]);

  const byCategory = [...new Set(rows.map((row) => row.category))].map((category) => {
    const categoryRows = rows.filter((row) => row.category === category);
    return {
      category,
      total: categoryRows.length,
      pass: categoryRows.filter((row) => row.status === 'PASS').length,
      metadataFix: categoryRows.filter((row) => row.status === 'PASS_WITH_METADATA_FIX').length,
      missingRecipe: categoryRows.filter((row) => row.status === 'MISSING_RECIPE').length,
      rankingImprovement: categoryRows.filter((row) => row.status === 'RANKING_IMPROVEMENT').length,
      lowConfidence: categoryRows.filter((row) => row.status === 'LOW_CONFIDENCE').length,
      fail: categoryRows.filter((row) => row.status === 'FAIL').length
    };
  });
  console.log('\nCategory Summary');
  console.table(byCategory);
}

function printResultTable(rows) {
  console.log('\nFull Pair Audit');
  console.table(rows.map((row) => ({
    id: row.id,
    category: row.category,
    pantry: row.pantry.join(' + '),
    expected: row.expected,
    topRecommendation: row.topRecommendation,
    score: row.score,
    status: row.status,
    reason: row.reason
  })));
}

function printWarnDetails(rows) {
  const warnRows = rows.filter((row) => row.status === 'MISSING_RECIPE' || row.status === 'LOW_CONFIDENCE');
  console.log('\nMissing Recipes Database Backlog');
  if (!warnRows.length) {
    console.log('None');
    return;
  }
  warnRows.forEach((row) => {
    console.log('\n---');
    console.log(`Pantry: ${row.pantry.map(titleCase).join(' + ')}`);
    console.log(`Top recommendation: ${row.topRecommendation}`);
    console.log(`Recommendation score: ${row.score}`);
    console.log(`Status: ${row.status}`);
    console.log(`Reason: ${row.reason}`);
    console.log(`Missing likely dishes: ${row.missingLikelyDishes.length ? row.missingLikelyDishes.join(', ') : 'None detected'}`);
    console.log('Suggested database additions:');
    const suggestions = row.suggestedDatabaseAdditions.length
      ? row.suggestedDatabaseAdditions
      : row.status === 'LOW_CONFIDENCE'
        ? ['No confident real dish yet; ask user to add one more ingredient']
        : ['Add/complete coreIngredients, requiredIngredients, baseIngredient, and dishFamily metadata'];
    suggestions.forEach((dish) => console.log(`- ${dish}`));
  });
}

function printFailDetails(rows) {
  const failRows = rows.filter((row) => row.status === 'FAIL');
  console.log('\nRecommendation Logic Issues');
  if (!failRows.length) {
    console.log('None');
    return;
  }
  failRows.forEach((row) => {
    console.log('\n---');
    console.log(`Pantry: ${row.pantry.map(titleCase).join(' + ')}`);
    console.log(`Expected: ${row.expected}`);
    console.log(`Top recommendation: ${row.topRecommendation}`);
    console.log(`Recommendation score: ${row.score}`);
    console.log(`Top 3: ${row.top3}`);
    console.log(`Reason: ${row.reason}`);
    if (row.missingRequiredIngredients) console.log(`Missing required ingredients on top recommendation: ${row.missingRequiredIngredients}`);
  });
}

function runPantryRecommendationAudit() {
  const rows = auditRows.map(auditPair);
  printSummary(rows);
  printResultTable(rows);
  printWarnDetails(rows);
  printFailDetails(rows);
  const counts = rows.reduce((summary, row) => {
    summary[row.status] = (summary[row.status] || 0) + 1;
    return summary;
  }, { PASS: 0, PASS_WITH_METADATA_FIX: 0, MISSING_RECIPE: 0, RANKING_IMPROVEMENT: 0, LOW_CONFIDENCE: 0, FAIL: 0 });
  console.log(`\nPantry recommendation audit complete: ${rows.length} pairs, ${counts.PASS || 0} pass, ${counts.PASS_WITH_METADATA_FIX || 0} metadata fix, ${counts.MISSING_RECIPE || 0} missing recipe, ${counts.RANKING_IMPROVEMENT || 0} ranking improvement, ${counts.LOW_CONFIDENCE || 0} low confidence, ${counts.FAIL || 0} fail.`);
  return rows;
}

if (require.main === module) {
  runPantryRecommendationAudit();
}

module.exports = { runPantryRecommendationAudit };
