function normalized(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
}

const ingredientAliasGroups = [
  ['rice', 'idli rice'],
  ['poha', 'avalakki'],
  ['rava', 'semolina'],
  ['curd', 'yogurt'],
  ['palak', 'spinach'],
  ['chicken', 'country chicken'],
  ['red chilli', 'chilli', 'guntur chilli', 'mathania chilli', 'byadgi chilli'],
  ['wheat', 'whole wheat', 'wheat flour'],
  ['urad dal', 'black urad dal'],
  ['maida', 'all purpose flour'],
  ['bread', 'pav'],
  ['chana', 'chickpea', 'chole'],
  ['keema', 'kheema', 'minced meat'],
  ['coconut', 'dry coconut', 'coconut milk'],
  ['onion', 'shallots', 'spring onion'],
  ['ghee', 'butter'],
  ['tamarind', 'kokum']
];

const ingredientAliasMap = ingredientAliasGroups.reduce((map, group) => {
  const aliases = group.map(normalized);
  for (const alias of aliases) map[alias] = aliases;
  return map;
}, {});

function ingredientAliases(ingredient) {
  const key = normalized(ingredient);
  return ingredientAliasMap[key] || [key];
}

function selectedCoversIngredient(selectedIngredients, ingredient) {
  const ingredientName = normalized(ingredient);
  return selectedIngredients.flatMap(ingredientAliases).includes(ingredientName);
}

function numberValue(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function hourFromContext(currentTime) {
  const date = currentTime ? new Date(currentTime) : new Date();
  return Number.isFinite(date.getTime()) ? date.getHours() : new Date().getHours();
}

function isMorning(hour) {
  return hour >= 5 && hour < 11;
}

function isLateNight(hour) {
  return hour >= 22 || hour < 4;
}

function isSchoolMorning(hour) {
  return hour >= 6 && hour < 9;
}

function boolValue(recipe, camelKey, snakeKey) {
  return Boolean(recipe[camelKey] || recipe[snakeKey]);
}

function ingredientMatchCount(recipe, selectedIngredients) {
  if (!selectedIngredients.length) return 0;
  return primaryIngredients(recipe).filter((ingredient) => selectedCoversIngredient(selectedIngredients, ingredient)).length;
}

function secondaryIngredientMatchCount(recipe, selectedIngredients) {
  if (!selectedIngredients.length) return 0;
  return secondaryIngredientsForRecipe(recipe).filter((ingredient) => selectedCoversIngredient(selectedIngredients, ingredient)).length;
}

function recipeIsCore(recipe) {
  return normalized(recipe.recipeType || recipe.recipe_type || 'core') === 'core';
}

function primaryIngredients(recipe) {
  const explicit = [
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2
  ].filter(Boolean);
  if (explicit.length) return [...new Set(explicit.map((item) => String(item)))].slice(0, 2);
  const mains = (recipe.ingredients || []).filter((item) => item.isMain).map((item) => item.name);
  return (mains.length ? mains : (recipe.ingredients || []).map((item) => item.name)).slice(0, 2);
}

function secondaryIngredientsForRecipe(recipe) {
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
  ].filter(Boolean);
}

function requiredPrimaryMatches(recipe, primaryCount = 2) {
  const configured = Number(recipe.requiredPrimaryMatches || recipe.required_primary_matches || primaryCount);
  if (!Number.isFinite(configured)) return primaryCount;
  return Math.max(1, Math.min(primaryCount || 2, Math.round(configured)));
}

function ingredientMatchDetail(recipe, selectedIngredients) {
  const primary = primaryIngredients(recipe);
  const secondary = secondaryIngredientsForRecipe(recipe);
  const required = requiredPrimaryMatches(recipe, primary.length || 2);
  const matchedPrimary = primary.filter((ingredient) => selectedCoversIngredient(selectedIngredients, ingredient));
  const matchedSecondary = secondary.filter((ingredient) => selectedCoversIngredient(selectedIngredients, ingredient));
  const primaryRatio = Math.min(matchedPrimary.length, required) / Math.max(1, required);
  const secondaryRatio = secondary.length ? matchedSecondary.length / secondary.length : 0;
  let score = Math.min(100, Math.round((primaryRatio * 80) + (secondaryRatio * 15)));
  if (selectedIngredients.length === 1) score = Math.min(30, score);
  const missingPrimary = primary.filter((ingredient) => !selectedCoversIngredient(selectedIngredients, ingredient));
  const missingSecondary = secondary.filter((ingredient) => !selectedCoversIngredient(selectedIngredients, ingredient));
  const unlockIngredient = missingPrimary[0] || missingSecondary[0] || '';
  const tier = score >= 80 ? 'Top Match' : score >= 50 ? 'Close Match' : 'Add One More Ingredient';
  return {
    score,
    tier,
    matchedPrimary,
    matchedSecondary,
    missingPrimary,
    missingSecondary,
    unlockIngredient,
  };
}

function passesPrimaryIngredientGate(recipe, selectedIngredients) {
  if (!selectedIngredients.length) return true;
  const primary = primaryIngredients(recipe);
  const matched = primary.filter((ingredient) => selectedCoversIngredient(selectedIngredients, ingredient)).length;
  const required = requiredPrimaryMatches(recipe, primary.length || 2);
  return primary.length >= required && matched >= required;
}

function hasTag(recipe, tag) {
  return (recipe.tags || []).map(normalized).includes(normalized(tag));
}

function hasHighProteinCore(recipe) {
  const titleText = normalized(recipe.title);
  const ingredientText = [
    ...primaryIngredients(recipe),
    ...secondaryIngredientsForRecipe(recipe),
    ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || '')
  ].filter(Boolean).join(' ').toLowerCase();
  const combined = `${titleText} ${ingredientText}`;
  const obviousProtein = /\b(chicken|egg|fish|mutton|prawn|pork|keema|kheema|paneer|rajma|chole|chana|chickpea|sprout|sprouts|besan|sattu|soya|soy)\b/;
  if (obviousProtein.test(combined)) return true;
  const dalForwardDish = /\b(dal|lentil)\b/.test(titleText)
    || /\b(toor dal|moong dal|urad dal|masoor dal|chana dal)\b/.test(ingredientText);
  const grainForwardException = /\b(idli|dosa|pongal|khichdi|porridge|upma|poha|rice)\b/.test(titleText);
  return dalForwardDish && !grainForwardException;
}

function baseScore(recipe) {
  return numberValue(recipe.comfortScore, 5) * 2
    + numberValue(recipe.proteinScore, 0)
    + Math.max(0, 10 - numberValue(recipe.effortScore, 5));
}

function mealTypeBonus(recipe, context = {}) {
  const meal = normalized(context.mealType || context.meal || context.selectedMeal);
  if (!meal) return 0;
  return hasTag(recipe, meal) || (meal === 'snack' && hasTag(recipe, 'snacks')) ? 10 : 0;
}

function moodBonus(recipe, selectedMood) {
  if (selectedMood === 'comfort') return numberValue(recipe.comfortScore, 0);
  if (selectedMood === 'protein') return hasHighProteinCore(recipe) ? numberValue(recipe.proteinScore, 0) : 0;
  if (selectedMood === 'rainy') return numberValue(recipe.rainyDayScore ?? recipe.rainy_day_score, 0);
  if (selectedMood === 'quick') return recipe.lowEffort || recipe.onePot || recipe.minimalCleanup ? 10 : 0;
  if (selectedMood === 'soul') return numberValue(recipe.soulFoodScore ?? recipe.soul_food_score, 0);
  if (selectedMood === 'spicy') return hasTag(recipe, 'spicy-food') || hasTag(recipe, 'spicy') ? 10 : 0;
  return 0;
}

function userPreferenceScore(recipe, context = {}) {
  const interactions = context.userInteractions || {};
  const interaction = Array.isArray(interactions)
    ? interactions.find((item) => item.recipeId === recipe.id || item.recipe_id === recipe.id)
    : interactions[recipe.id];
  if (!interaction) return 0;
  return (numberValue(interaction.viewCount ?? interaction.view_count, 0) * 1)
    + (numberValue(interaction.saveCount ?? interaction.save_count, 0) * 3)
    + (numberValue(interaction.cookCount ?? interaction.cook_count, 0) * 5);
}

function scoreRecipe(recipe, context = {}) {
  if (!recipeIsCore(recipe)) {
    return {
      ...recipe,
      recommendationScore: 0,
      scoreReasons: ['collection_browsing_only'],
    };
  }
  const selectedMood = normalized(context.selectedMood);
  const selectedIngredients = context.selectedIngredients || [];
  const hour = hourFromContext(context.currentTime);
  const weather = normalized(context.weather);
  const energyState = normalized(context.energyState);
  const scoreReasons = [];
  const hasSelectedIngredients = selectedIngredients.length > 0;
  let score = hasSelectedIngredients
    ? 0
    : baseScore(recipe);

  const secondaryMatches = secondaryIngredientMatchCount(recipe, selectedIngredients);
  if (hasSelectedIngredients) {
    const match = ingredientMatchDetail(recipe, selectedIngredients);
    score += match.score
      + (secondaryMatches * 10)
      + moodBonus(recipe, selectedMood)
      + mealTypeBonus(recipe, context)
      + Math.min(20, userPreferenceScore(recipe, context));
    scoreReasons.push(match.tier.toLowerCase().replace(/\s+/g, '_'));
  }

  if (isLateNight(hour) && recipe.lateNight) {
    score += 5;
    scoreReasons.push('late_night');
  }

  if (isMorning(hour) && hasTag(recipe, 'breakfast')) {
    score += 5;
    scoreReasons.push('morning_breakfast');
  }

  const schoolLunch = boolValue(recipe, 'schoolLunch', 'school_lunch')
    || hasTag(recipe, 'school-lunch')
    || hasTag(recipe, 'lunchbox');
  if (isSchoolMorning(hour) && schoolLunch) {
    score += 8;
    scoreReasons.push('school_lunch_morning');
    if (boolValue(recipe, 'quickMeal', 'quick_meal') || hasTag(recipe, 'quick-meal')) {
      score += 3;
      scoreReasons.push('quick_lunchbox');
    }
    if (boolValue(recipe, 'kidFavorite', 'kid_favorite') || hasTag(recipe, 'kid-favorite')) {
      score += 3;
      scoreReasons.push('kid_favorite');
    }
  }

  if (weather.includes('rain') && (hasTag(recipe, 'rainy-day') || recipe.rainyDayScore || recipe.comfortScore)) {
    score += 5 + numberValue(recipe.rainyDayScore, 0);
    scoreReasons.push('rainy_weather');
  }

  if (selectedMood === 'quick' && (recipe.lowEffort || recipe.onePot || recipe.minimalCleanup)) {
    score += 4 + Math.max(0, 10 - numberValue(recipe.effortScore, 5));
    scoreReasons.push('low_effort');
  }

  if (selectedMood === 'comfort') {
    score += numberValue(recipe.comfortScore, 5) * 2 + numberValue(recipe.soulFoodScore, 0);
    scoreReasons.push('comfort');
  }

  if (selectedMood === 'rainy' && (hasTag(recipe, 'rainy-day') || recipe.rainyDayScore)) {
    score += 7 + numberValue(recipe.rainyDayScore, 0);
    scoreReasons.push('rainy_day');
  }

  if (selectedMood === 'protein' && hasHighProteinCore(recipe)) {
    score += numberValue(recipe.proteinScore, 0) * 2;
    scoreReasons.push('protein');
  }

  if (energyState === 'low' && (recipe.lowEffort || recipe.lightMeal || recipe.minimalCleanup)) {
    score += 6;
    scoreReasons.push('low_energy');
  }

  if ((context.recentRecipeIds || []).includes(recipe.id)) score -= 8;
  if ((context.savedRecipeIds || []).includes(recipe.id)) score += 2;
  const preferenceScore = userPreferenceScore(recipe, context);
  if (preferenceScore > 0) {
    score += Math.min(100, preferenceScore) * 0.1;
    scoreReasons.push('user_preference');
  }

  return {
    ...recipe,
    recommendationScore: Math.round(score * 10) / 10,
    ingredientMatch: hasSelectedIngredients ? ingredientMatchDetail(recipe, selectedIngredients) : undefined,
    scoreReasons,
  };
}

function recommendRecipes(recipes, context = {}) {
  const limit = Math.min(context.limit || 4, 4);
  const scoredRecipes = recipes
    .filter(recipeIsCore)
    .filter((recipe) => normalized(context.selectedMood) !== 'protein' || hasHighProteinCore(recipe))
    .filter((recipe) => {
      const selectedIngredients = context.selectedIngredients || [];
      if (!selectedIngredients.length) return true;
      return ingredientMatchDetail(recipe, selectedIngredients).score > 0;
    })
    .map((recipe) => scoreRecipe(recipe, context))
    .sort((a, b) => b.recommendationScore - a.recommendationScore || a.title.localeCompare(b.title));
  const byRecipeId = new Map();
  for (const recipe of scoredRecipes) {
    const key = String(recipe.id || recipe.sourceId || normalized(recipe.title));
    const current = byRecipeId.get(key);
    if (!current || recipe.recommendationScore > current.recommendationScore) byRecipeId.set(key, recipe);
  }
  const byTitle = new Map();
  for (const recipe of byRecipeId.values()) {
    const key = normalized(recipe.title);
    const current = byTitle.get(key);
    if (!current || recipe.recommendationScore > current.recommendationScore) byTitle.set(key, recipe);
  }
  const deduped = [...byTitle.values()]
    .sort((a, b) => b.recommendationScore - a.recommendationScore || a.title.localeCompare(b.title))
  const selectedIngredients = context.selectedIngredients || [];
  if (!selectedIngredients.length) return deduped.slice(0, limit);
  const strong = deduped.filter((recipe) => (recipe.ingredientMatch?.score || 0) >= 50).slice(0, limit);
  if (strong.length >= limit) return strong;
  const used = new Set(strong.map((recipe) => recipe.id));
  const partials = deduped
    .filter((recipe) => (recipe.ingredientMatch?.score || 0) > 0 && !used.has(recipe.id))
    .slice(0, limit - strong.length);
  return [...strong, ...partials].slice(0, limit);
}

module.exports = {
  recommendRecipes,
  scoreRecipe,
};
