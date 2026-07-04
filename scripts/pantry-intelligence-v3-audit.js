const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const recipesPath = path.join(root, 'frontend', 'local-recipes.js');
const knowledgePath = path.join(root, 'frontend', 'mobile', 'ingredient-knowledge.js');
const outputMarkdown = path.join(root, 'pantry-intelligence-v3-audit.md');
const outputJson = path.join(root, 'pantry-intelligence-v3-audit.json');

const scenarios = [
  {
    name: 'Rice + Tomato + Onion',
    selected: ['rice', 'tomato', 'onion'],
    expected: [/tomato rice/i, /rasam rice/i, /tomato chutney/i, /tomato rasam/i, /onion rice/i],
  },
  {
    name: 'Horse Gram',
    selected: ['horse gram'],
    expected: [/bassaru/i, /kollu rasam/i, /ulavacharu/i, /huruli/i],
  },
  {
    name: 'Palak',
    selected: ['palak'],
    expected: [/palak/i, /soppu/i, /saag/i],
  },
  {
    name: 'Coconut',
    selected: ['coconut'],
    expected: [/coconut chutney/i, /avial/i, /thoran/i, /coconut rice/i],
  },
  {
    name: 'Tamarind',
    selected: ['tamarind'],
    expected: [/rasam/i, /pulusu/i, /puliyogare/i, /sambar/i],
  },
  {
    name: 'Rice + Egg',
    selected: ['rice', 'egg'],
    expected: [/egg fried rice/i, /egg rice/i, /egg tomato rice/i, /egg curry rice/i, /egg tomato rice bowl/i],
  },
  {
    name: 'Paneer + Capsicum',
    selected: ['paneer', 'capsicum'],
    expected: [/kadai paneer/i, /chilli paneer/i, /paneer capsicum/i],
  },
  {
    name: 'Fish',
    selected: ['fish'],
    expected: [/fish fry/i, /fish curry/i, /meen/i],
  },
  {
    name: 'Prawns',
    selected: ['prawns'],
    expected: [/prawn/i, /royyala/i, /chemmeen/i, /chingri/i],
  },
  {
    name: 'Chicken',
    selected: ['chicken'],
    expected: [/chicken curry/i, /chicken sukka/i, /chicken fry/i, /kodi/i],
  },
];

function loadWindowFile(filePath, property) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(filePath, 'utf8'), context, { filename: filePath });
  return context.window[property] || [];
}

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
  if (value && typeof value === 'object') return Object.values(value).flatMap(list);
  return [];
}

function title(recipe) {
  return recipe.title || recipe.name || 'Untitled recipe';
}

function slug(recipe) {
  return recipe.sourceId || recipe.slug || recipe.id || norm(title(recipe)).replace(/[^a-z0-9]+/g, '-');
}

function isCoreRecipe(recipe) {
  return norm(recipe.recipeType || recipe.recipe_type || 'core') === 'core';
}

function unique(values) {
  const seen = new Set();
  return values.filter((value) => {
    const key = norm(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pantryStaple(name) {
  return /^(water|salt|oil|cooking oil|sugar|pepper|turmeric|chilli powder|cumin|mustard seeds)$/.test(norm(name));
}

function ingredientStrength(source, mainFallback = false) {
  const role = norm(source?.role || '');
  const name = norm(source?.name || source?.ingredient || source);
  if (['pantry staple', 'pantry-staple', 'staple'].includes(role) || pantryStaple(name)) return 'pantryStaple';
  if (['garnish', 'topping'].includes(role)) return 'garnish';
  if (['optional', 'nice to have', 'nice-to-have'].includes(role)) return 'optional';
  if (['support', 'supporting', 'secondary', 'flavor-base', 'flavour-base', 'seasoning', 'cooking-fat', 'texture', 'binding', 'filling'].includes(role)) return 'support';
  if (mainFallback || source?.isMain || ['required', 'main', 'core', 'primary'].includes(role)) return 'core';
  return 'support';
}

function strengthWeight(strength) {
  return {
    core: 520,
    support: 220,
    optional: 55,
    pantryStaple: 20,
    garnish: 12,
  }[strength] || 80;
}

function recipeIngredients(recipe) {
  const ingredients = list(recipe.ingredients).map((raw) => {
    const source = raw && typeof raw === 'object' ? raw : { name: raw };
    const name = String(source.name || source.ingredient || '').trim();
    return {
      name,
      normalized: norm(name),
      role: source.role || '',
      required: !source.role || source.role === 'required' || source.role === 'main' || source.isMain === true,
      main: Boolean(source.isMain) || source.role === 'main',
      strength: ingredientStrength(source),
      source: 'ingredients',
    };
  }).filter((item) => item.normalized);

  [
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2,
  ].forEach((name) => addRecipeIngredient(ingredients, name, true));
  [
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
  ].forEach((name) => addRecipeIngredient(ingredients, name, false));
  return ingredients;
}

function addRecipeIngredient(ingredients, name, main) {
  const label = String(name || '').trim();
  const normalized = norm(label);
  if (!normalized || ingredients.some((item) => item.normalized === normalized)) return;
  ingredients.push({
    name: label,
    normalized,
    role: main ? 'primary' : 'secondary',
    required: main,
    main,
    strength: main ? 'core' : 'support',
    source: main ? 'primary-field' : 'secondary-field',
  });
}

function ingredientMatchesSelection(ingredientKey, selectedKey) {
  const ingredient = norm(ingredientKey);
  const selected = norm(selectedKey);
  if (ingredient === selected) return true;
  const aliases = {
    rice: /^(rice|cooked rice|steamed rice)$/,
    egg: /^eggs?$/,
    chicken: /^(chicken|country chicken|kodi)$/,
    paneer: /^paneer$/,
    fish: /^(fish|seer fish|surmai|vanjaram|pomfret|mackerel|basa|tilapia)$/,
    prawns: /^(prawn|prawns|shrimp|royyala|chemmeen|chingri)$/,
    prawn: /^(prawn|prawns|shrimp|royyala|chemmeen|chingri)$/,
    onion: /^(onion|onions|shallot|shallots)$/,
    tomato: /^(tomato|tomatoes)$/,
    palak: /^(palak|spinach|soppu|greens)$/,
    spinach: /^(palak|spinach|soppu|greens)$/,
    'horse gram': /^(horse gram|huruli|kollu|ulavalu)$/,
    tamarind: /^(tamarind|imli|puli|hunase|chintapandu)$/,
    coconut: /^(coconut|grated coconut|coconut milk|kayi|nariyal|thengai)$/,
    capsicum: /^(capsicum|bell pepper)$/,
  };
  if (aliases[selected]) return aliases[selected].test(ingredient);
  if (selected.length <= 3) return false;
  return ingredient === selected || ingredient.startsWith(`${selected} `);
}

function recipeText(recipe, ingredients = recipeIngredients(recipe)) {
  return [
    title(recipe),
    recipe.description,
    recipe.dishFamily,
    recipe.dish_family,
    recipe.baseIngredient,
    recipe.base_ingredient,
    recipe.cuisine,
    recipe.region,
    recipe.dietType,
    ...(recipe.tags || []),
    ...(recipe.mealTags || []),
    ...(recipe.moodTags || []),
    ...ingredients.map((item) => item.name),
  ].map(norm).join(' ');
}

function recipeFamilies(recipe) {
  const signal = [
    title(recipe),
    recipe.dishFamily,
    recipe.dish_family,
    recipe.baseIngredient,
    recipe.base_ingredient,
    recipe.recipeRole,
  ].map(norm).join(' ');
  const families = [];
  const add = (family) => {
    if (!families.includes(family)) families.push(family);
  };
  if (/\b(rice|pulao|biryani|khichdi|pongal|bath|chawal|puliyogare|rice bowl)\b/.test(signal)) add('rice');
  if (/\b(chutney|thecha|pachadi)\b/.test(signal)) add('chutney');
  if (/\b(rasam|saaru)\b/.test(signal)) add('rasam');
  if (/\bsambar\b/.test(signal)) add('sambar');
  if (/\bpulusu\b/.test(signal)) add('pulusu');
  if (/\btheeyal\b/.test(signal)) add('theeyal');
  if (/\b(xaak|saag|greens?)\b/.test(signal)) add('greens');
  if (/\b(soup|shorba|thukpa)\b/.test(signal)) add('soup');
  if (/\b(curry|gravy|masala|kurma|korma|stew|jhol|theeyal|sukka)\b/.test(signal)) add('curry');
  if (/\b(bhaji|sabzi|palya|poriyal|thoran|posto|bharta)\b/.test(signal)) add('bhaji');
  if (/\b(pakoda|pakora|bajji|bonda|vada)\b/.test(signal)) add('pakoda');
  if (/\b(egg|omelette|bhurji)\b/.test(signal)) add('egg');
  if (/\b(avial)\b/.test(signal)) add('avial');
  if (/\b(paratha|roti|chapati|roll|sandwich)\b/.test(signal)) add('bread');
  if (/\b(fry|fried)\b/.test(signal)) add('fry');
  return families;
}

function knowledgeNames(record) {
  return [
    record.canonicalName,
    ...list(record.aliases),
    ...list(record.regionalNames),
  ].map(norm).filter(Boolean);
}

function knowledgeForSelection(knowledge, selected) {
  return selected.map((selectedKey) => {
    const exact = knowledge.find((record) => knowledgeNames(record).includes(norm(selectedKey)));
    if (exact) return exact;
    return knowledge.find((record) => knowledgeNames(record).some((name) => {
      return name === norm(selectedKey) || ingredientMatchesSelection(name, selectedKey) || ingredientMatchesSelection(selectedKey, name);
    }));
  }).filter(Boolean);
}

function knowledgeFamilies(record) {
  return unique([
    ...list(record.recipeFamilies),
    ...list(record.recommendedRecipeFamilies),
  ].map(norm));
}

function recipeMatchesKnowledgeFamily(recipe, family, families, haystack) {
  const signal = [
    title(recipe),
    recipe.dishFamily,
    recipe.dish_family,
    recipe.baseIngredient,
    recipe.base_ingredient,
    recipe.recipeRole,
  ].map(norm).join(' ');
  const checks = {
    rice: /\b(rice|pulao|biryani|khichdi|pongal|bath|chawal|puliyogare)\b/,
    chutney: /\b(chutney|thecha|pachadi)\b/,
    rasam: /\b(rasam|saaru)\b/,
    saaru: /\b(saaru|rasam)\b/,
    soup: /\b(soup|shorba|thukpa)\b/,
    'curry base': /\b(curry|gravy|masala|bhaji|sabzi|palya|poriyal|thoran|stew)\b/,
    curry: /\b(curry|gravy|masala|kurma|korma|stew|jhol|theeyal|sukka)\b/,
    bhaji: /\b(bhaji|sabzi|palya|poriyal|thoran|posto|bharta)\b/,
    pakoda: /\b(pakoda|pakora|bajji|bonda|vada)\b/,
    egg: /\b(egg|omelette|bhurji)\b/,
    sambar: /\bsambar\b/,
    pulusu: /\bpulusu\b/,
    avial: /\bavial\b/,
    thoran: /\bthoran\b/,
    dal: /\b(dal|pappu)\b/,
    fry: /\bfry\b/,
  };
  const pattern = checks[family] || new RegExp(`\\b${family.replace(/\s+/g, '\\s+')}\\b`);
  if (pattern.test(signal)) return true;
  return families.includes(family) && pattern.test(haystack);
}

function ingredientStrengthScore(ingredients, selected) {
  const selectedBreakdown = selected.map((selectedKey) => {
    const best = ingredients
      .filter((item) => ingredientMatchesSelection(item.normalized, selectedKey))
      .sort((a, b) => strengthWeight(b.strength) - strengthWeight(a.strength))[0];
    return {
      ingredient: selectedKey,
      strength: best?.strength || 'unused',
      score: best ? strengthWeight(best.strength) : 0,
    };
  });
  return {
    score: selectedBreakdown.reduce((sum, item) => sum + item.score, 0),
    selectedBreakdown,
  };
}

function familyScore(recipe, ingredients, selected, knowledge) {
  const records = knowledgeForSelection(knowledge, selected);
  const families = recipeFamilies(recipe);
  const haystack = recipeText(recipe, ingredients);
  const familyOwners = new Map();
  records.forEach((record) => {
    knowledgeFamilies(record).forEach((family) => {
      if (!familyOwners.has(family)) familyOwners.set(family, new Set());
      familyOwners.get(family).add(norm(record.canonicalName));
    });
  });
  const usedFamilies = [];
  let score = 0;
  familyOwners.forEach((owners, family) => {
    if (!recipeMatchesKnowledgeFamily(recipe, family, families, haystack)) return;
    const usedOwners = [...owners].filter((owner) => ingredients.some((item) => {
      return ingredientMatchesSelection(item.normalized, owner)
        || selected.some((selectedKey) => ingredientMatchesSelection(item.normalized, selectedKey) && ingredientMatchesSelection(owner, selectedKey));
    }));
    if (!usedOwners.length) return;
    const familyScoreValue = usedOwners.length > 1 ? 18000 : 9000;
    score += familyScoreValue;
    usedFamilies.push({ family, ingredients: usedOwners, score: familyScoreValue });
  });
  if (familyOwners.has('curry base')) {
    ['rice', 'rasam', 'saaru', 'soup', 'chutney'].forEach((family) => {
      if (!recipeMatchesKnowledgeFamily(recipe, family, families, haystack)) return;
      score += 8000;
      if (!usedFamilies.some((item) => item.family === family)) usedFamilies.push({ family, ingredients: ['curry base'], score: 8000 });
    });
  }
  return {
    score: Math.min(score, 42000),
    usedFamilies,
    records: records.map((record) => record.canonicalName),
  };
}

function regionalScore(recipe, selected, knowledge) {
  const records = knowledgeForSelection(knowledge, selected);
  const regionText = [
    recipe.cuisine,
    recipe.region,
    ...list(recipe.regionTags),
    ...list(recipe.tags),
  ].map(norm).join(' ');
  return records.reduce((sum, record) => {
    return sum + (list(record.regionalRelevance).some((region) => regionText.includes(norm(region))) ? 1200 : 0);
  }, 0);
}

function recipeProteins(recipe, ingredients) {
  const text = recipeText(recipe, ingredients);
  return ['fish', 'prawn', 'chicken', 'egg', 'paneer', 'mutton', 'pork', 'tofu'].filter((protein) => new RegExp(`\\b${protein}\\b`).test(text));
}

function majorProtein(value) {
  return /^(fish|prawns|prawn|chicken|egg|paneer|tofu|mutton|pork)$/.test(norm(value));
}

function scoreRecipe(recipe, selected, knowledge) {
  const ingredients = recipeIngredients(recipe);
  const text = recipeText(recipe, ingredients);
  const matchedSelected = selected.filter((name) => ingredients.some((item) => ingredientMatchesSelection(item.normalized, name)));
  const ignoredSelected = selected.filter((name) => !matchedSelected.includes(name));
  if (!matchedSelected.length) return null;

  const selectedProteins = selected.filter(majorProtein);
  const proteins = recipeProteins(recipe, ingredients);
  if (selectedProteins.length && proteins.some((protein) => !selectedProteins.some((selected) => ingredientMatchesSelection(protein, selected)))) return null;
  if (!selectedProteins.length && proteins.some((protein) => ['fish', 'prawn', 'chicken', 'mutton', 'pork'].includes(protein))) return null;

  const titleWords = norm(title(recipe)).split(' ').filter(Boolean);
  const titleHits = selected.filter((name) => titleWords.includes(norm(name))).length;
  const pantryMatchScore = matchedSelected.length * 1000;
  const strength = ingredientStrengthScore(ingredients, selected);
  const family = familyScore(recipe, ingredients, selected, knowledge);
  const region = regionalScore(recipe, selected, knowledge);
  const conciseTitleBoost = titleHits && titleWords.length <= 4 ? titleHits * 2600 : titleHits * 1200;
  const completeMatchBoost = matchedSelected.length === selected.length ? 9000 : 0;
  const ignoredPenalty = ignoredSelected.length * 6500;
  const finalScore = pantryMatchScore + strength.score + family.score + region + conciseTitleBoost + completeMatchBoost - ignoredPenalty;
  return {
    recipe,
    title: title(recipe),
    slug: slug(recipe),
    pantryMatchScore,
    ingredientStrengthScore: strength.score,
    ingredientStrengthBreakdown: strength.selectedBreakdown,
    familyScore: family.score,
    knowledgeBridgeUsed: family.usedFamilies,
    knowledgeRecords: family.records,
    regionalScore: region,
    finalScore,
    families: recipeFamilies(recipe),
    matchedSelected,
    ignoredSelected,
  };
}

function diversify(scored) {
  const preferred = [];
  const overflow = [];
  const familyCounts = new Map();
  scored.forEach((item) => {
    const primary = item.families[0] || 'other';
    const count = familyCounts.get(primary) || 0;
    familyCounts.set(primary, count + 1);
    (count < 2 ? preferred : overflow).push(item);
  });
  return [...preferred, ...overflow];
}

function scenarioStatus(scenario, top) {
  const hits = scenario.expected.filter((pattern) => top.some((item) => pattern.test(item.title))).length;
  const repetitive = top.slice(0, 5).filter((item, index, list) => list.filter((candidate) => candidate.families[0] === item.families[0]).length >= 4).length > 0;
  return {
    status: hits >= Math.min(2, scenario.expected.length) && !repetitive ? 'PASS' : 'WARNING',
    expectedHits: hits,
    repetitive,
  };
}

function analyze() {
  const recipes = loadWindowFile(recipesPath, 'COOKBUDDY_LOCAL_RECIPES').filter(isCoreRecipe);
  const knowledge = loadWindowFile(knowledgePath, 'TOMO_INGREDIENT_KNOWLEDGE');
  const scenarioReports = scenarios.map((scenario) => {
    const selected = scenario.selected.map(norm);
    const ranked = diversify(recipes
      .map((recipe) => scoreRecipe(recipe, selected, knowledge))
      .filter(Boolean)
      .sort((a, b) => b.finalScore - a.finalScore || a.title.localeCompare(b.title)));
    const top = ranked.slice(0, 8);
    const quality = scenarioStatus(scenario, top);
    return {
      name: scenario.name,
      selected: scenario.selected,
      status: quality.status,
      expectedHits: quality.expectedHits,
      repetitive: quality.repetitive,
      topRecommendations: top.map((item, index) => ({
        rank: index + 1,
        title: item.title,
        slug: item.slug,
        finalScore: item.finalScore,
        pantryMatchScore: item.pantryMatchScore,
        ingredientStrengthScore: item.ingredientStrengthScore,
        ingredientStrengthBreakdown: item.ingredientStrengthBreakdown,
        familyScore: item.familyScore,
        knowledgeBridgeUsed: item.knowledgeBridgeUsed,
        regionalScore: item.regionalScore,
        families: item.families,
      })),
    };
  });

  const passCount = scenarioReports.filter((scenario) => scenario.status === 'PASS').length;
  const tomatoOnion = scenarioReports.find((scenario) => scenario.name === 'Rice + Tomato + Onion');
  const horseGram = scenarioReports.find((scenario) => scenario.name === 'Horse Gram');
  const knowledgeBridgeFailures = scenarioReports.filter((scenario) => !scenario.topRecommendations.some((item) => item.knowledgeBridgeUsed.length));
  const repetitiveRows = scenarioReports.filter((scenario) => scenario.repetitive);
  const pantryIntelligenceScore = Math.round(
    (passCount / scenarioReports.length) * 55
    + (knowledgeBridgeFailures.length ? 0 : 20)
    + (tomatoOnion?.status === 'PASS' ? 10 : 0)
    + (horseGram?.status === 'PASS' ? 10 : 0)
    + (repetitiveRows.length ? 0 : 5)
  );
  const status = pantryIntelligenceScore >= 95 && !knowledgeBridgeFailures.length && !repetitiveRows.length ? 'PASS' : 'WARNING';

  return {
    generatedAt: new Date().toISOString(),
    status,
    pantryIntelligenceScore,
    summary: {
      scenarios: scenarioReports.length,
      passCount,
      warningCount: scenarioReports.length - passCount,
      knowledgeBridgeFailures: knowledgeBridgeFailures.length,
      repetitiveRows: repetitiveRows.length,
      tomatoOnionStatus: tomatoOnion?.status || 'MISSING',
      horseGramStatus: horseGram?.status || 'MISSING',
    },
    scenarios: scenarioReports,
  };
}

function mdTable(rows, headers) {
  if (!rows.length) return '_None._';
  const escape = (value) => String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${headers.map((header) => escape(row[header])).join(' | ')} |`),
  ].join('\n');
}

function renderMarkdown(report) {
  return `# Pantry Intelligence V3 Audit

Generated: ${report.generatedAt}

Overall status: **${report.status}**

Pantry Intelligence Score: **${report.pantryIntelligenceScore}/100**

## Summary

- Scenarios: ${report.summary.scenarios}
- PASS: ${report.summary.passCount}
- WARNING: ${report.summary.warningCount}
- Knowledge bridge failures: ${report.summary.knowledgeBridgeFailures}
- Repetitive recommendation rows: ${report.summary.repetitiveRows}
- Tomato + Onion status: ${report.summary.tomatoOnionStatus}
- Horse Gram status: ${report.summary.horseGramStatus}

## Scenario Results

${mdTable(report.scenarios.map((scenario) => ({
  Scenario: scenario.name,
  Status: scenario.status,
  ExpectedHits: scenario.expectedHits,
  TopRecommendations: scenario.topRecommendations.slice(0, 5).map((item) => item.title).join(', '),
})), ['Scenario', 'Status', 'ExpectedHits', 'TopRecommendations'])}

${report.scenarios.map((scenario) => `## ${scenario.name}

Selected: ${scenario.selected.join(', ')}

Status: **${scenario.status}**

${mdTable(scenario.topRecommendations.map((item) => ({
  Rank: item.rank,
  Recipe: item.title,
  Final: item.finalScore,
  Pantry: item.pantryMatchScore,
  Strength: item.ingredientStrengthScore,
  Family: item.familyScore,
  Regional: item.regionalScore,
  Bridge: item.knowledgeBridgeUsed.map((bridge) => `${bridge.family} (${bridge.ingredients.join('+')})`).join(', ') || 'None',
  StrengthBreakdown: item.ingredientStrengthBreakdown.map((part) => `${part.ingredient}:${part.strength}`).join(', '),
})), ['Rank', 'Recipe', 'Final', 'Pantry', 'Strength', 'Family', 'Regional', 'Bridge', 'StrengthBreakdown'])}`).join('\n\n')}
`;
}

const report = analyze();
fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(outputMarkdown, renderMarkdown(report));

console.log(`Pantry Intelligence Score: ${report.pantryIntelligenceScore}/100 (${report.status})`);
console.log(`Scenarios: ${report.summary.passCount}/${report.summary.scenarios} PASS`);
console.log(`Tomato + Onion: ${report.summary.tomatoOnionStatus}`);
console.log(`Horse Gram: ${report.summary.horseGramStatus}`);
console.log(`Knowledge bridge failures: ${report.summary.knowledgeBridgeFailures}`);
console.log(`Repetitive rows: ${report.summary.repetitiveRows}`);
console.log(`Wrote ${path.relative(root, outputMarkdown)}`);
console.log(`Wrote ${path.relative(root, outputJson)}`);
