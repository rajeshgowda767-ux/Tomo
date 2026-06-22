const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const recipes = JSON.parse(fs.readFileSync(path.join(root, 'database/generated/recipes.json'), 'utf8'));

function normalizeIngredientName(name) {
  const normalized = String(name).toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
  const canonical = {
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
  const gunpowderAliases = ['podi', 'gunpowder', 'gun powder'];
  return gunpowderAliases.includes(leftName) && gunpowderAliases.includes(rightName);
}

function uniqueNormalizedIngredients(values) {
  return [...new Set((values || []).filter(Boolean).map(normalizeIngredientName))];
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
  const staple = core.map(stapleBaseForIngredient).find(Boolean);
  return staple || core[0] || '';
}

function dishFamilyIngredientAllowed(family, ingredient) {
  const normalized = normalizeIngredientName(ingredient);
  const base = stapleBaseForIngredient(normalized);
  const dalLike = /\bdal\b/.test(normalized);
  const paneerLike = pantryIngredientEquals(normalized, 'paneer');
  const eggLike = pantryIngredientEquals(normalized, 'egg');
  const vegetableLike = ['onion', 'tomato', 'potato', 'carrot', 'capsicum', 'peas', 'corn', 'spinach', 'palak'].some((name) => pantryIngredientEquals(normalized, name));
  const seasoningLike = ['spices', 'cumin', 'pepper', 'ghee', 'oil', 'garlic', 'ginger', 'green chilli', 'coriander', 'curry leaves', 'soy sauce'].some((name) => pantryIngredientEquals(normalized, name));
  if (family === 'rice-dal') return base === 'rice' || dalLike || seasoningLike;
  if (family === 'rice-meal' || family === 'fried-rice') return base === 'rice' || paneerLike || eggLike || vegetableLike || seasoningLike;
  if (family === 'paratha') return base === 'wheat flour' || ['potato', 'paneer', 'onion'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  if (family === 'idli') return base === 'idli batter' || ['idli', 'gunpowder', 'podi'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  return true;
}

function breakdown(recipe, selected) {
  const selectedIngredients = uniqueNormalizedIngredients(selected);
  const core = coreIngredients(recipe);
  const required = requiredIngredients(recipe, core);
  const optional = optionalIngredients(recipe, core);
  const base = baseIngredient(recipe, core);
  const baseStaple = stapleBaseForIngredient(base) || base;
  const family = normalizeIngredientName(recipe.dishFamily || recipe.dish_family || baseStaple || 'general');
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

function validate(recipe, selected, data) {
  const selectedStaples = [...new Set(data.selectedIngredients.map(stapleBaseForIngredient).filter(Boolean))];
  const matchedCoreOrRequired = data.selectedIngredients.filter((selectedName) => {
    return data.core.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || data.required.some((ingredient) => pantryIngredientEquals(selectedName, ingredient));
  });
  const unmatchedSelected = data.selectedIngredients.filter((selectedName) => !data.matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName)));
  const familyMismatches = data.selectedIngredients.filter((selectedName) => {
    if (data.matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName))) return false;
    return !dishFamilyIngredientAllowed(data.family, selectedName);
  });
  const incompatible = uniqueNormalizedIngredients(recipe.incompatibleWith || recipe.incompatible_with || [])
    .filter((ingredient) => data.selectedIngredients.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const baseMismatch = selectedStaples.length && data.baseStaple && selectedStaples.some((staple) => staple !== data.baseStaple);
  const blocked = !data.matchedCore.length
    || incompatible.length
    || baseMismatch
    || (data.selectedIngredients.length >= 2 && matchedCoreOrRequired.length < Math.min(2, data.selectedIngredients.length))
    || (data.selectedIngredients.length >= 2 && data.missingRequired.length)
    || (data.missingRequired.length && unmatchedSelected.length)
    || (data.missingRequired.length && familyMismatches.length);
  return {
    valid: !blocked,
    strict: !blocked && data.selectedIngredients.length >= 2 && matchedCoreOrRequired.length >= Math.min(2, data.selectedIngredients.length) && !data.missingRequired.length
  };
}

function rank(selected) {
  const selectedIngredients = uniqueNormalizedIngredients(selected);
  const matches = recipes
    .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core')
    .map((recipe) => {
      const data = breakdown(recipe, selectedIngredients);
      const validity = validate(recipe, selectedIngredients, data);
      const score = (data.matchedCore.length * 50)
        + (data.matchedSelected.length * 20)
        + (data.matchedOptional.length * 8)
        - (data.missingRequired.length * 45)
        - (data.unmatchedSelected.length * 55);
      return { title: recipe.title, core: data.core, family: data.family, validity, matchedSelected: data.matchedSelected.length, unmatchedSelected: data.unmatchedSelected.length, matchedCore: data.matchedCore.length, missingRequired: data.missingRequired.length, score };
    })
    .filter((match) => match.validity.valid && match.matchedSelected > 0);
  const strict = matches.filter((match) => match.validity.strict);
  return (strict.length ? strict : matches)
    .sort((a, b) => b.matchedSelected - a.matchedSelected
      || b.matchedCore - a.matchedCore
      || a.missingRequired - b.missingRequired
      || b.score - a.score
      || a.title.localeCompare(b.title));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const tomato = rank(['rice', 'tomato']);
assert(tomato[0]?.title === 'Tomato Rice', `Expected Tomato Rice first, got ${tomato[0]?.title || 'none'}`);

const potato = rank(['rice', 'potato']);
assert(potato[0]?.core.includes('rice'), `Expected a rice-based potato match first, got ${potato[0]?.title || 'none'}`);
assert(potato[0]?.title !== 'Aloo Paratha', 'Aloo Paratha must not be the best match for rice + potato');

const onion = rank(['rice', 'onion']);
assert(onion[0]?.core.includes('rice'), `Expected a rice-based onion match first, got ${onion[0]?.title || 'none'}`);
assert(onion[0]?.title !== 'Gunpowder Idli', 'Gunpowder Idli must not be the best match for rice + onion');

const paneer = rank(['rice', 'paneer']);
assert(['Paneer Pulao', 'Paneer Fried Rice'].includes(paneer[0]?.title), `Expected recognized paneer-rice match first, got ${paneer[0]?.title || 'none'}`);
assert(paneer[0]?.title !== 'Pongal', 'Pongal must not be the best match for rice + paneer');

const wheatUrad = rank(['wheat flour', 'urad dal']);
assert(!wheatUrad.some((item) => item.title === 'Aloo Paratha'), 'Aloo Paratha must not appear for wheat flour + urad dal');
assert(!wheatUrad.some((item) => item.score >= 80), 'Wheat flour + urad dal should not have a confident pantry match');

for (const selected of [
  ['wheat flour', 'fish'],
  ['fish', 'banana'],
  ['milk', 'tamarind'],
  ['fish', 'wheat flour']
]) {
  const results = rank(selected);
  assert(!results.some((item) => item.score >= 80 && item.unmatchedSelected > 0), `${selected.join(' + ')} must not produce a strong match that ignores a selected ingredient`);
  assert(!results.some((item) => ['Plain Chapati', 'Wheat Dosa'].includes(item.title) && item.score >= 80), `${selected.join(' + ')} must not force wheat-only recipes as strong matches`);
}

const wheatOnion = rank(['wheat flour', 'onion']);
assert(wheatOnion[0]?.title === 'Onion Paratha', `Expected Onion Paratha first, got ${wheatOnion[0]?.title || 'none'}`);
assert(wheatOnion[0]?.title !== 'Aloo Paratha', 'Aloo Paratha must not be the best match for wheat flour + onion');

const tamarind = rank(['rice', 'tamarind']);
assert(tamarind[0]?.title === 'Puliyogare', `Expected Puliyogare first, got ${tamarind[0]?.title || 'none'}`);

const fishTamarind = rank(['fish', 'tamarind']);
assert(fishTamarind[0]?.title === 'Fish Curry', `Expected Fish Curry first for fish + tamarind, got ${fishTamarind[0]?.title || 'none'}`);
assert(fishTamarind[0]?.title !== 'Goan Fish Curry', 'Goan Fish Curry must not beat canonical Fish Curry for plain fish + tamarind');

const fishKokum = rank(['fish', 'kokum']);
assert(fishKokum[0]?.title === 'Kerala Fish Curry', `Expected Kerala Fish Curry first for fish + kokum, got ${fishKokum[0]?.title || 'none'}`);

const fishKokkum = rank(['fish', 'kokkum']);
assert(fishKokkum[0]?.title === 'Kerala Fish Curry', `Expected Kerala Fish Curry first for fish + kokkum, got ${fishKokkum[0]?.title || 'none'}`);

const paneerTomato = rank(['rice', 'paneer', 'tomato']);
assert(['Paneer Pulao', 'Paneer Fried Rice'].includes(paneerTomato[0]?.title), `Expected recognized paneer rice/pulao family first, got ${paneerTomato[0]?.title || 'none'}`);

const eggOnion = rank(['egg', 'onion']);
assert(['Egg Bhurji', 'Onion Omelette'].includes(eggOnion[0]?.title), `Expected Egg Bhurji or Onion Omelette first for egg + onion, got ${eggOnion[0]?.title || 'none'}`);
const keralaEggRoastIndex = eggOnion.findIndex((item) => item.title === 'Kerala Egg Roast');
assert(keralaEggRoastIndex === -1 || keralaEggRoastIndex > 0, 'Kerala Egg Roast must not beat Egg Bhurji / Onion Omelette for egg + onion alone');

const pohaPeanut = rank(['poha', 'peanut']);
assert(pohaPeanut[0]?.title === 'Peanut Poha', `Expected Peanut Poha first for poha + peanut, got ${pohaPeanut[0]?.title || 'none'}`);
assert(pohaPeanut[0]?.title !== 'Poha', 'Generic Poha must not beat Peanut Poha when peanut is selected');

const riceEgg = rank(['rice', 'egg']);
assert(riceEgg[0]?.title === 'Egg Fried Rice', `Expected Egg Fried Rice first for rice + egg, got ${riceEgg[0]?.title || 'none'}`);

const ricePaneer = rank(['rice', 'paneer']);
assert(ricePaneer[0]?.title === 'Paneer Fried Rice', `Expected Paneer Fried Rice first for rice + paneer, got ${ricePaneer[0]?.title || 'none'}`);

const riceCoconut = rank(['rice', 'coconut']);
assert(riceCoconut[0]?.title === 'Coconut Rice', `Expected Coconut Rice first for rice + coconut, got ${riceCoconut[0]?.title || 'none'}`);

console.log('Pantry validity tests passed');
console.log(`rice + tomato: ${tomato.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`rice + potato: ${potato.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`rice + onion: ${onion.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`rice + paneer: ${paneer.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`wheat flour + urad dal: ${wheatUrad.slice(0, 3).map((item) => item.title).join(', ') || 'no confident match'}`);
console.log(`wheat flour + onion: ${wheatOnion.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`wheat flour + fish: ${rank(['wheat flour', 'fish']).slice(0, 3).map((item) => `${item.title} (${item.score})`).join(', ') || 'no strong match'}`);
console.log(`fish + banana: ${rank(['fish', 'banana']).slice(0, 3).map((item) => `${item.title} (${item.score})`).join(', ') || 'no strong match'}`);
console.log(`milk + tamarind: ${rank(['milk', 'tamarind']).slice(0, 3).map((item) => `${item.title} (${item.score})`).join(', ') || 'no strong match'}`);
console.log(`fish + wheat flour: ${rank(['fish', 'wheat flour']).slice(0, 3).map((item) => `${item.title} (${item.score})`).join(', ') || 'no strong match'}`);
console.log(`rice + tamarind: ${tamarind.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`fish + tamarind: ${fishTamarind.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`fish + kokum: ${fishKokum.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`rice + paneer + tomato: ${paneerTomato.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`egg + onion: ${eggOnion.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`poha + peanut: ${pohaPeanut.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`rice + egg: ${riceEgg.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`rice + paneer: ${ricePaneer.slice(0, 3).map((item) => item.title).join(', ')}`);
console.log(`rice + coconut: ${riceCoconut.slice(0, 3).map((item) => item.title).join(', ')}`);
