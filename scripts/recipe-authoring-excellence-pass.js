const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const localRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const generatedRecipesPath = path.join(root, 'database', 'generated', 'recipes.json');
const reportMarkdownPath = path.join(root, 'recipe-authoring-summary.md');
const reportJsonPath = path.join(root, 'recipe-authoring-summary.json');
const previousReport = fs.existsSync(reportJsonPath)
  ? JSON.parse(fs.readFileSync(reportJsonPath, 'utf8'))
  : null;

function norm(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function list(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  return [];
}

function loadWindowRecipes() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(localRecipesPath, 'utf8'), context, { filename: localRecipesPath });
  return context.window.COOKBUDDY_LOCAL_RECIPES || [];
}

function title(recipe) {
  return recipe.title || recipe.name || 'Untitled recipe';
}

function isActive(recipe) {
  return norm(recipe.recipeType || recipe.recipe_type || 'core') === 'core';
}

function ingredientNames(recipe) {
  const names = [];
  const add = (name) => {
    const label = String(name || '').trim();
    if (!label) return;
    const key = norm(label);
    if (!key || names.some((item) => norm(item) === key)) return;
    names.push(label);
  };
  list(recipe.ingredients).forEach((item) => add(item && typeof item === 'object' ? item.name || item.ingredient : item));
  [
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2,
    recipe.secondaryIngredient1,
    recipe.secondaryIngredient2,
    recipe.secondaryIngredient3,
    recipe.secondaryIngredient4,
    recipe.secondaryIngredient5,
    recipe.secondary_ingredient_1,
    recipe.secondary_ingredient_2,
    recipe.secondary_ingredient_3,
    recipe.secondary_ingredient_4,
    recipe.secondary_ingredient_5,
  ].forEach(add);
  return names;
}

function mainIngredients(recipe) {
  const pantryBasics = new Set(['water', 'salt', 'oil', 'cooking oil', 'ghee', 'sugar']);
  const mains = list(recipe.ingredients)
    .filter((item) => item && typeof item === 'object' && (item.isMain || norm(item.role) === 'required' || norm(item.role) === 'main'))
    .map((item) => item.name)
    .filter(Boolean);
  const explicit = [
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2,
  ].filter(Boolean);
  const merged = [...mains, ...explicit].filter((name, index, list) => list.findIndex((item) => norm(item) === norm(name)) === index);
  const withoutBasics = merged.filter((name) => !pantryBasics.has(norm(name)));
  return (withoutBasics.length ? withoutBasics : merged).slice(0, 3);
}

function supportIngredients(recipe) {
  const mains = new Set(mainIngredients(recipe).map(norm));
  const nameText = norm(title(recipe));
  const pantryBasics = new Set(['water', 'salt', 'oil', 'cooking oil']);
  const likelyPairings = new Set(['rice', 'dosa', 'idli', 'chapati', 'roti', 'paratha']);
  return ingredientNames(recipe)
    .filter((name) => !mains.has(norm(name)))
    .filter((name) => !pantryBasics.has(norm(name)))
    .filter((name) => !likelyPairings.has(norm(name)) || nameText.includes(norm(name)))
    .slice(0, 6);
}

function joinWords(items, fallback = 'the ingredients') {
  const clean = items.filter(Boolean);
  if (!clean.length) return fallback;
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(', ')} and ${clean.at(-1)}`;
}

function textFor(recipe) {
  return [
    title(recipe),
    recipe.description,
    recipe.cuisine,
    recipe.region,
    recipe.dietType,
    recipe.recipeRole,
    recipe.dishFamily,
    recipe.baseIngredient,
    ...list(recipe.tags),
    ...list(recipe.mealTags),
    ...list(recipe.moodTags),
    ...ingredientNames(recipe),
  ].map(norm).join(' ');
}

function family(recipe) {
  const name = norm(title(recipe));
  const declared = [
    recipe.dishFamily,
    recipe.dish_family,
    recipe.recipeRole,
    recipe.baseIngredient,
    recipe.base_ingredient,
  ].map(norm).join(' ');
  const tags = [...list(recipe.tags), ...list(recipe.mealTags), ...list(recipe.moodTags)].map(norm).join(' ');
  const signal = `${name} ${declared} ${tags}`;
  const text = `${signal} ${ingredientNames(recipe).slice(0, 4).map(norm).join(' ')}`;

  if (/\b(chai|coffee|lassi|sharbat|juice|malt|buttermilk|panna|drink|sherbet|water|chaas)\b/.test(signal)) return 'drink';
  if (/\b(kheer|payasam|halwa|kesari|laddoo|ladoo|jamun|rasmalai|peda|barfi|modak|gujiya|plum cake|dessert|sweet|sheera)\b/.test(signal)) return 'dessert';
  if (/\b(rasam|soup|saaru|sambar|dal|pappu|aamti|kuzhambu|pulusu|stew)\b/.test(signal)) return 'soup';
  if (/\b(dosa|idli|uttapam|paniyaram|appe|kadubu|appam)\b/.test(signal)) return 'dosa-idli';
  if (/\b(poha|avalakki|chirer|beaten rice)\b/.test(signal)) return 'poha';
  if (/\b(mudde|millet ball|ragi ball|plain rice|steamed rice)\b/.test(signal)) return 'staple';
  if (/\b(paratha|roti|rotti|chapati|thepla|bhakri|bread|toast|sandwich|roll|bun)\b/.test(signal)) return 'bread';
  if (/\b(chutney|raita|salad|kosambari|tambuli|thecha|pachadi)\b/.test(signal)) return 'side';
  if (/\b(avial|palya|poriyal|thoran|sabzi|bhaji|posto|pitika|bharta|usal|ghonto|shukto)\b/.test(signal)) return 'dry-side';
  if (/\b(biryani|pulao|rice|khichdi|pongal|bath|chawal|puliyogare|chitranna)\b/.test(signal)) return 'rice';
  if (/\b(curry|gravy|masala|kurma|korma|sukka|theeyal|kalia|jhol)\b/.test(signal)) return 'curry';
  if (/\b(pakora|bajji|bonda|vada|fry|bhaja|chaat|sundal|cutlet|momos|snack|chilli|gobi|manchurian)\b/.test(signal)) return 'snack';
  if (/\b(curry|gravy|masala|kurma|korma|sukka|palya|poriyal|thoran|usal|sabzi|bhaji)\b/.test(text)) return 'curry';
  return 'general';
}

function complexity(recipe, fam) {
  const text = textFor(recipe);
  if (/\b(biryani|festival|festive|tradition|pandi|kosha|chettinad|malvani|mangalorean|ghee roast|pulao|stuffed|bharli)\b/.test(text)) return 'complex';
  if (fam === 'dessert' && /\b(kheer|payasam|halwa|modak|gujiya|cake|peda|barfi|laddoo|rasmalai)\b/.test(text)) return 'complex';
  if (fam === 'curry' && /\b(chicken|fish|prawn|mutton|pork|duck|paneer|korma|kurma|stew)\b/.test(text)) return 'complex';
  if (['drink', 'side'].includes(fam)) return 'simple';
  if (fam === 'dry-side' && !/\b(avial|stuffed|bharli|shukto)\b/.test(text)) return 'average';
  if (fam === 'poha' || fam === 'staple') return 'average';
  if (fam === 'snack' && /\b(salad|chaat|sundal|peanut|makhana)\b/.test(text)) return 'simple';
  return 'average';
}

function dishStyle(recipe) {
  const cuisine = String(recipe.cuisine || recipe.region || '').trim();
  return cuisine && !/^pan indian$/i.test(cuisine) ? `${cuisine} style` : 'homestyle';
}

function capStep(step) {
  return step.replace(/\s+/g, ' ').trim().replace(/\.+$/, '.');
}

function instructionSet(recipe) {
  const fam = family(recipe);
  const level = complexity(recipe, fam);
  const name = title(recipe);
  const mains = mainIngredients(recipe);
  const supports = supportIngredients(recipe);
  const mainText = joinWords(mains);
  const supportText = joinWords(supports.slice(0, 4), 'the aromatics');
  const style = dishStyle(recipe);
  const text = textFor(recipe);

  let steps;
  if (fam === 'drink') {
    steps = [
      `Set out ${mainText} and keep the ${supportText} within reach.`,
      /\b(chai|coffee|tea|kashaya)\b/.test(text)
        ? `Simmer the base gently so the spice and aroma infuse without turning bitter.`
        : `Whisk or blend everything until the drink tastes smooth and balanced.`,
      `Taste once, adjust sweetness or salt, and chill or serve warm as the ${name} needs.`,
    ];
  } else if (fam === 'side') {
    steps = [
      `Prep ${mainText} and keep the ${supportText} ready before you start.`,
      /\b(chutney|thecha|pachadi)\b/.test(text)
        ? `Grind or pound the mixture just enough to keep its ${style} character.`
        : `Fold the ingredients together gently so the texture stays fresh.`,
      /\b(raita|salad|kosambari|tambuli)\b/.test(text)
        ? `Chill briefly if you like, then finish with herbs or tempering.`
        : `Taste for salt, sharpen with a final seasoning, and serve alongside the meal.`,
    ];
  } else if (fam === 'dry-side') {
    steps = [
      `Prep ${mainText} and keep ${supportText} ready before the pan goes on the heat.`,
      `Warm oil and let the tempering or aromatics turn fragrant.`,
      `Add the main ingredients and coat them well in the spice base.`,
      /\b(avial|thoran|poriyal|palya)\b/.test(text)
        ? `Cook gently so the vegetables stay distinct instead of turning mushy.`
        : `Cover briefly if needed, then roast off excess moisture for a homestyle finish.`,
      `Adjust salt and heat, then finish with the remaining aromatics as the dish calls for.`,
      `Serve ${name} warm as a side, keeping its ${style} character intact.`,
    ];
  } else if (fam === 'poha') {
    steps = [
      `Rinse or soften the poha just enough that it turns tender without breaking.`,
      `Keep ${mainText} and ${supportText} ready before heating the pan.`,
      `Temper the spices, then sauté the aromatics until they lose their raw edge.`,
      `Fold in the poha gently so it warms through and stays fluffy.`,
      `Finish with lemon, herbs, coconut, or peanuts as the recipe suggests.`,
      `Rest for a minute and serve ${name} warm.`,
    ];
  } else if (fam === 'staple') {
    steps = [
      `Bring water and salt to a steady simmer before adding ${mainText}.`,
      `Cook steadily, stirring or folding so the base hydrates evenly.`,
      `Lower the flame once it thickens and work out any dry pockets.`,
      `Shape or fluff while it is still warm, adding ghee only if the dish needs it.`,
      `Rest briefly, then serve ${name} with a curry, saar, or chutney.`,
    ];
  } else if (fam === 'dessert') {
    steps = [
      `Measure ${mainText} first, then keep ${supportText} ready for the sweet base.`,
      `Warm the pan gently and roast or simmer the main ingredient until its raw edge fades.`,
      `Stir in the sweetener slowly so the mixture turns glossy without sticking.`,
      `Fold in the aromatics and cook until the dessert reaches a soft, spoonable consistency.`,
      /\b(cake|barfi|modak|gujiya|laddoo|peda|rasmalai)\b/.test(text)
        ? `Let it cool or set until it holds its shape cleanly.`
        : `Rest it for a few minutes so the sweetness settles.`
      ,
      `Garnish lightly and serve warm, chilled, or at room temperature as suits ${name}.`,
    ];
    if (level === 'complex') steps.splice(3, 0, `Keep stirring from the edges toward the center so the texture stays even.`);
  } else if (fam === 'soup') {
    steps = [
      `Rinse and prep ${mainText}, then keep ${supportText} ready for the tempering.`,
      `Cook the base until the dal, vegetables, or extract softens enough to release flavor.`,
      `Simmer with the souring and spice elements so the ${style} broth tastes rounded.`,
      `Temper mustard, cumin, curry leaves, garlic, or chillies as the recipe calls for.`,
      `Pour the tempering over the pot and let it bubble briefly to bring everything together.`,
      `Finish with final seasoning and serve hot while the aroma is still bright.`,
    ];
  } else if (fam === 'rice') {
    steps = [
      `Keep the rice or grain ready, and prep ${mainText} with ${supportText}.`,
      `Heat oil or ghee and bloom the spices until they smell fragrant.`,
      `Sauté the aromatics and main ingredients until they soften and take on the masala.`,
      `Fold in the rice gently so the grains stay separate and evenly coated.`,
      `Cover briefly on low heat, then rest off the flame for a few minutes.`,
      `Fluff and finish with herbs, ghee, or lemon before serving ${name} warm.`,
    ];
    if (level === 'complex') {
      steps.splice(3, 0, `Layer the seasoning carefully so the ${style} flavor remains distinct.`);
      steps.splice(5, 0, `Let the pot steam gently instead of stirring too often.`);
    }
  } else if (fam === 'dosa-idli') {
    steps = [
      /\b(appam)\b/.test(text)
        ? `Bring the fermented rice-coconut batter to a loose, pourable consistency for ${name}.`
        : `Bring the batter or grain base to a soft, workable consistency for ${name}.`,
      /\b(appam)\b/.test(text)
        ? `Keep ${mainText} and ${supportText} ready so the batter tastes balanced before it hits the pan.`
        : `Prepare ${mainText} and keep ${supportText} ready for filling, topping, or tempering.`,
      /\b(idli|kadubu)\b/.test(text)
        ? `Grease the moulds and steam until the centers feel set.`
        : `Heat the tawa well, spread the batter evenly, and drizzle a little oil around the edges.`,
      /\b(masala|stuffed|filling)\b/.test(text)
        ? `Spoon the filling in while the surface is still hot so it warms through.`
        : `Cook until the edges lift cleanly and the surface is tender or crisp as intended.`,
      `Rest for a minute, then serve with chutney, sambar, or a simple side.`,
    ];
  } else if (fam === 'bread') {
    steps = [
      `Bring together ${mainText} with salt, spice, and just enough moisture for the dough or bread base.`,
      `Knead or fold until it feels soft, then rest briefly so it rolls without tearing.`,
      /\b(sandwich|toast|bun|roll)\b/.test(text)
        ? `Assemble the filling evenly and press or roll it so every bite is balanced.`
        : `Shape into even portions and roll or pat them without making the edges too thick.`,
      `Roast on a hot tawa or toast in a pan, adding ghee or oil only as needed.`,
      `Turn until both sides are cooked through, then finish hot with curd, chutney, or pickle.`,
    ];
  } else if (fam === 'snack') {
    steps = [
      `Prep ${mainText} and keep ${supportText} ready so the snack comes together quickly.`,
      /\b(pakora|bajji|bonda|vada|cutlet|momos)\b/.test(text)
        ? `Mix or shape the base until it holds together without becoming heavy.`
        : `Toss the ingredients with the spice mix until everything is evenly coated.`,
      /\b(fry|pakora|bajji|bonda|vada|bhaja)\b/.test(text)
        ? `Fry or shallow-fry in steady heat until the outside turns crisp and golden.`
        : `Roast, sauté, or steam until the texture matches the dish.`,
      `Drain or rest briefly, then sprinkle the final seasoning while it is still warm.`,
      `Serve immediately so ${name} keeps its best texture.`,
    ];
    if (level === 'complex') steps.splice(2, 0, `Let the seasoning cling for a few minutes before cooking.`);
  } else if (fam === 'curry') {
    steps = [
      `Prep ${mainText} and keep ${supportText} ready before heating the pan.`,
      `Heat oil or ghee, then sauté the aromatics until they soften and turn fragrant.`,
      `Roast the spices or masala paste until the raw smell fades.`,
      `Add the main ingredients and turn them through the masala so they are well coated.`,
      `Pour in the liquid, cover, and simmer gently until the curry cooks through.`,
      `Adjust salt, sourness, and heat, then let the gravy rest for a few minutes.`,
      `Garnish and serve ${name} with the pairing that best suits its ${style} character.`,
    ];
    if (level === 'complex') {
      steps.splice(3, 0, `Build the masala patiently; this is where the regional flavor deepens.`);
      steps.splice(6, 0, `Keep the simmer gentle so the sauce thickens without breaking.`);
    }
  } else {
    steps = [
      `Prep ${mainText} and keep ${supportText} ready before you start cooking.`,
      `Heat the pan and begin with the aromatics or spices so the base tastes rounded.`,
      `Add the main ingredients and cook until their texture matches ${name}.`,
      `Fold, simmer, or roast as needed, adjusting salt and heat along the way.`,
      `Finish with herbs, ghee, lemon, or a final seasoning and serve warm.`,
    ];
  }

  if (level === 'simple' && steps.length > 4) steps = steps.slice(0, 4);
  if (level === 'average' && steps.length < 5) {
    steps.splice(Math.max(1, steps.length - 1), 0, `Taste midway and adjust the seasoning while the dish is still easy to correct.`);
  }
  if (level === 'complex' && steps.length < 7) {
    steps.splice(Math.max(2, steps.length - 2), 0, `Take a moment to check the texture before moving to the finish.`);
  }

  return steps.map(capStep);
}

function updateRecipes(recipes) {
  let updated = 0;
  let missingFixed = 0;
  let fiveStepBefore = 0;
  const beforeCounts = {};
  const afterCounts = {};
  const samples = [];

  const next = recipes.map((recipe) => {
    if (!isActive(recipe)) return recipe;
    const previous = list(recipe.instructions).filter(Boolean);
    beforeCounts[previous.length] = (beforeCounts[previous.length] || 0) + 1;
    if (previous.length === 5) fiveStepBefore += 1;
    if (!previous.length) missingFixed += 1;
    const instructions = instructionSet(recipe);
    afterCounts[instructions.length] = (afterCounts[instructions.length] || 0) + 1;
    updated += 1;
    if (samples.length < 12 && (!previous.length || previous.length === 5 || instructions.length >= 7)) {
      samples.push({ title: title(recipe), beforeStepCount: previous.length, afterStepCount: instructions.length, instructions });
    }
    return { ...recipe, instructions };
  });

  return { recipes: next, stats: { updated, missingFixed, fiveStepBefore, beforeCounts, afterCounts, samples } };
}

function summaryFor(recipes, stats) {
  const active = recipes.filter(isActive);
  const stepCounts = active.map((recipe) => list(recipe.instructions).filter(Boolean).length);
  const missing = active.filter((recipe) => !list(recipe.instructions).filter(Boolean).length);
  const average = stepCounts.reduce((sum, count) => sum + count, 0) / Math.max(stepCounts.length, 1);
  const preservedMissingFixed = Math.max(stats.missingFixed, Number(previousReport?.missingInstructionsFixed || 0));
  const preservedFiveStepBefore = Math.max(stats.fiveStepBefore, Number(previousReport?.fiveStepRecipesBefore || 0));
  return {
    generatedAt: new Date().toISOString(),
    activeRecipes: active.length,
    recipesUpdated: stats.updated,
    missingInstructionsFixed: preservedMissingFixed,
    remainingMissingInstructions: missing.length,
    fiveStepRecipesBefore: preservedFiveStepBefore,
    fiveStepRecipesAfter: stepCounts.filter((count) => count === 5).length,
    averageStepCount: Math.round(average * 10) / 10,
    recipesWith3To4Steps: stepCounts.filter((count) => count >= 3 && count <= 4).length,
    recipesWith5To7Steps: stepCounts.filter((count) => count >= 5 && count <= 7).length,
    recipesWith8PlusSteps: stepCounts.filter((count) => count >= 8).length,
    beforeStepCounts: stats.beforeCounts,
    afterStepCounts: stats.afterCounts,
    samples: stats.samples,
  };
}

function markdown(report) {
  const rows = Object.entries(report.afterStepCounts)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([steps, count]) => `| ${steps} | ${count} |`)
    .join('\n');
  const sampleRows = report.samples
    .map((sample) => `| ${sample.title.replace(/\|/g, '\\|')} | ${sample.beforeStepCount} | ${sample.afterStepCount} | ${sample.instructions.join(' ')} |`)
    .join('\n');
  return `# Recipe Authoring Summary

Generated: ${report.generatedAt}

## Results

- Recipes updated: ${report.recipesUpdated}
- Missing instructions fixed: ${report.missingInstructionsFixed}
- Remaining missing instructions: ${report.remainingMissingInstructions}
- Average step count: ${report.averageStepCount}
- Recipes with 3-4 steps: ${report.recipesWith3To4Steps}
- Recipes with 5-7 steps: ${report.recipesWith5To7Steps}
- Recipes with 8+ steps: ${report.recipesWith8PlusSteps}
- Five-step recipes before: ${report.fiveStepRecipesBefore}
- Five-step recipes after: ${report.fiveStepRecipesAfter}

## Step Count Distribution

| Steps | Recipes |
| --- | --- |
${rows}

## Sample Updated Recipes

| Recipe | Before | After | New guidance |
| --- | --- | --- | --- |
${sampleRows}
`;
}

const sourceRecipes = loadWindowRecipes();
const updated = updateRecipes(sourceRecipes);
const report = summaryFor(updated.recipes, updated.stats);

fs.writeFileSync(localRecipesPath, `window.COOKBUDDY_LOCAL_RECIPES = ${JSON.stringify(updated.recipes, null, 2)};\n`);

if (fs.existsSync(generatedRecipesPath)) {
  const generated = JSON.parse(fs.readFileSync(generatedRecipesPath, 'utf8'));
  const instructionsById = new Map();
  updated.recipes.forEach((recipe) => {
    const key = recipe.id || recipe.sourceId || norm(title(recipe));
    instructionsById.set(String(key), recipe.instructions);
    if (recipe.sourceId) instructionsById.set(String(recipe.sourceId), recipe.instructions);
  });
  const nextGenerated = generated.map((recipe) => {
    if (!isActive(recipe)) return recipe;
    const key = recipe.id || recipe.sourceId || norm(title(recipe));
    const instructions = instructionsById.get(String(key)) || (recipe.sourceId && instructionsById.get(String(recipe.sourceId)));
    return instructions ? { ...recipe, instructions } : recipe;
  });
  fs.writeFileSync(generatedRecipesPath, `${JSON.stringify(nextGenerated, null, 2)}\n`);
}

fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(reportMarkdownPath, markdown(report));

console.log(`Recipes updated: ${report.recipesUpdated}`);
console.log(`Missing instructions fixed: ${report.missingInstructionsFixed}`);
console.log(`Remaining missing instructions: ${report.remainingMissingInstructions}`);
console.log(`Average step count: ${report.averageStepCount}`);
console.log(`3-4 steps: ${report.recipesWith3To4Steps}`);
console.log(`5-7 steps: ${report.recipesWith5To7Steps}`);
console.log(`8+ steps: ${report.recipesWith8PlusSteps}`);
console.log(`Wrote ${path.relative(root, reportMarkdownPath)}`);
console.log(`Wrote ${path.relative(root, reportJsonPath)}`);
