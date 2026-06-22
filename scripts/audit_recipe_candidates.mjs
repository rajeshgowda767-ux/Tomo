import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const databasePath = path.join(root, 'database', 'generated', 'recipes.json');
const jsonPath = path.join(root, 'candidate-recipe-dedup-audit.json');
const markdownPath = path.join(root, 'candidate-recipe-dedup-audit.md');
const recipes = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

const candidates = [
  { name: 'Peas Pulao', coreIngredients: ['rice', 'green peas'], dishFamily: 'rice-meal', cuisine: 'Indian', status: 'SAFE_TO_CREATE', reason: 'Veg Pulao, Chicken Pulao, and Paneer Pulao exist, but none represents green-pea pulao as a core ingredient identity.' },
  { name: 'Mushroom Rice', coreIngredients: ['rice', 'mushroom'], dishFamily: 'rice-meal', cuisine: 'Indian', status: 'SAFE_TO_CREATE', reason: 'The catalog has mushroom dishes and rice dishes, but no rice-and-mushroom recipe.' },
  { name: 'Mutton Pulao', coreIngredients: ['rice', 'mutton'], dishFamily: 'rice-meal', cuisine: 'Indian', status: 'SAFE_TO_CREATE', reason: 'Gongura Mutton and other pulaos exist, but no mutton pulao or equivalent rice-and-mutton preparation exists.' },
  { name: 'Palak Paratha', coreIngredients: ['wheat flour', 'spinach'], dishFamily: 'paratha', cuisine: 'North Indian', status: 'SAFE_TO_CREATE', reason: 'Palak Paneer and several parathas exist, but no spinach paratha is represented.' },
  { name: 'Mooli Paratha', coreIngredients: ['wheat flour', 'radish'], dishFamily: 'paratha', cuisine: 'North Indian', status: 'SAFE_TO_CREATE', reason: 'Generic Stuffed Paratha is potato-based; no radish-centered paratha exists.' },
  { name: 'Cheese Paratha', coreIngredients: ['wheat flour', 'cheese'], dishFamily: 'paratha', cuisine: 'Indian', status: 'SAFE_TO_CREATE', reason: 'Cheese Omelette exists, but no cheese-filled paratha or equivalent flatbread exists.' },
  { name: 'Sweet Holige', coreIngredients: ['wheat flour', 'jaggery', 'chana dal'], dishFamily: 'sweet-flatbread', cuisine: 'Karnataka / South Indian', status: 'SAFE_TO_CREATE', reason: 'No Holige, Obbattu, Puran Poli, or equivalent jaggery-lentil stuffed flatbread exists.' },
  { name: 'Cheese Dosa', coreIngredients: ['dosa batter', 'cheese'], dishFamily: 'dosa', cuisine: 'South Indian / Fusion', status: 'SAFE_TO_CREATE', reason: 'Several dosa variants exist, but none has cheese as a core ingredient.' },
  { name: 'Cheese Uttapam', coreIngredients: ['idli batter', 'cheese'], dishFamily: 'uttapam', cuisine: 'South Indian / Fusion', status: 'SAFE_TO_CREATE', reason: 'Onion, Tomato, and Vegetable Uttapam exist, but no cheese uttapam exists.' },
  { name: 'Paneer Mushroom Masala', coreIngredients: ['paneer', 'mushroom'], dishFamily: 'paneer-curry', cuisine: 'North Indian', status: 'SAFE_TO_CREATE', reason: 'Paneer curries and Chilli Mushroom exist separately; no recipe combines paneer and mushroom as core ingredients.' },
  { name: 'Onion Omelette', coreIngredients: ['egg', 'onion'], dishFamily: 'omelette', cuisine: 'Indian', status: 'SAFE_TO_CREATE', reason: 'Existing omelettes use bread, cheese, capsicum, or mushroom as their second core ingredient; onion omelette is not represented.' },
  { name: 'Tomato Omelette', coreIngredients: ['egg', 'tomato'], dishFamily: 'omelette', cuisine: 'Indian', status: 'SAFE_TO_CREATE', reason: 'No egg-and-tomato omelette exists. Tomato Rice and Tomato Uttapam are different dish families.' },
  { name: 'Spanish Omelette', coreIngredients: ['egg', 'potato'], dishFamily: 'omelette', cuisine: 'Spanish', status: 'SAFE_TO_CREATE', reason: 'No potato-and-egg tortilla/Spanish omelette exists; existing omelettes have different core ingredients and cuisine intent.' },
  { name: 'Chicken Fry', coreIngredients: ['chicken', 'chilli'], dishFamily: 'chicken', cuisine: 'Indian', status: 'MERGE_AS_ALIAS', match: 'Andhra Kodi Vepudu', aliases: ['Chicken Fry', 'Andhra Chicken Fry'], reason: 'Andhra Kodi Vepudu is an existing dry-fried chicken preparation with matching chicken/chilli core ingredients and the same dish family. Guntur Chicken Fry remains a more specific regional variant.' },
  { name: 'Chicken Egg Fried Rice', coreIngredients: ['rice', 'chicken', 'egg'], dishFamily: 'fried-rice', cuisine: 'Indo-Chinese / Asian', status: 'MERGE_AS_ALIAS', match: 'Chicken Fried Rice', aliases: ['Chicken Egg Fried Rice', 'Chicken and Egg Fried Rice'], reason: 'Existing Chicken Fried Rice already includes egg in its ingredient list and optional ingredients, with the same fried-rice family and preparation intent.' },
  { name: 'Chicken Potato Curry', coreIngredients: ['chicken', 'potato'], dishFamily: 'chicken-curry', cuisine: 'Indian', status: 'SAFE_TO_CREATE', reason: 'Chicken Curry exists, but potato is not represented in its core or optional ingredients; the candidate has a distinct pantry and recipe identity.' },
  { name: 'Chicken Mushroom Stir Fry', coreIngredients: ['chicken', 'mushroom'], dishFamily: 'stir-fry', cuisine: 'Asian / Indo-Chinese', status: 'SAFE_TO_CREATE', reason: 'Chicken and mushroom recipes exist separately, but no chicken-mushroom stir fry or equivalent preparation exists.' },
  { name: 'Batata Poha', coreIngredients: ['poha', 'potato'], dishFamily: 'poha', cuisine: 'Maharashtrian', status: 'SAFE_TO_CREATE', reason: 'Existing Poha is onion/peanut-centered and does not contain potato. Batata Poha is a distinct recognized variant, not merely a synonym.' },
  { name: 'Vegetable Upma', coreIngredients: ['rava', 'mixed vegetables'], dishFamily: 'upma', cuisine: 'South Indian', status: 'MERGE_AS_ALIAS', match: 'Upma', aliases: ['Vegetable Upma', 'Vegetable Rava Upma'], reason: 'Existing Upma is described as rava with vegetables and already includes carrot as a supporting ingredient. The candidate is the same preparation under a more explicit name.' },
  { name: 'Sweet Rice', coreIngredients: ['rice', 'jaggery'], dishFamily: 'sweet-rice', cuisine: 'Indian', status: 'SAFE_TO_CREATE', reason: 'Sweet Pongal uses rice and moong dal and is not semantically equivalent; no jaggery sweet-rice recipe exists.' },
];

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function recipeIngredients(recipe) {
  return [...new Set([
    ...(recipe.coreIngredients || recipe.core_ingredients || []),
    ...(recipe.requiredIngredients || recipe.required_ingredients || []),
    ...(recipe.optionalIngredients || recipe.optional_ingredients || []),
    ...(recipe.ingredients || []).map((ingredient) => ingredient.name || ingredient.ingredientName),
  ].filter(Boolean).map(normalize))];
}

function compactRecipe(recipe) {
  if (!recipe) return null;
  return {
    id: recipe.id,
    sourceId: recipe.sourceId,
    title: recipe.title,
    aliases: recipe.aliases || [],
    mergedSourceIds: recipe.mergedSourceIds || [],
    coreIngredients: recipe.coreIngredients || recipe.core_ingredients || [],
    dishFamily: recipe.dishFamily || recipe.dish_family || '',
    cuisine: recipe.cuisine || '',
  };
}

function relatedRecipes(candidate) {
  const candidateIngredients = new Set(candidate.coreIngredients.map(normalize));
  return recipes
    .map((recipe) => {
      const ingredients = recipeIngredients(recipe);
      const ingredientOverlap = ingredients.filter((ingredient) => candidateIngredients.has(ingredient)).length;
      const sameFamily = normalize(recipe.dishFamily || recipe.dish_family) === normalize(candidate.dishFamily);
      const titleTokens = normalize(candidate.name).split(' ');
      const titleOverlap = titleTokens.filter((token) => normalize(recipe.title).split(' ').includes(token)).length;
      return { recipe, score: ingredientOverlap * 3 + Number(sameFamily) * 2 + titleOverlap };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.recipe.title.localeCompare(b.recipe.title))
    .slice(0, 5)
    .map((item) => ({ ...compactRecipe(item.recipe), comparisonScore: item.score }));
}

for (const candidate of candidates) {
  const exact = recipes.find((recipe) => normalize(recipe.title) === normalize(candidate.name));
  candidate.exactNameMatch = compactRecipe(exact);
  candidate.matchedRecipe = compactRecipe(candidate.match
    ? recipes.find((recipe) => recipe.title === candidate.match)
    : exact);
  candidate.relatedRecipes = relatedRecipes(candidate);
  candidate.checkedFields = ['name', 'aliases', 'coreIngredients', 'dishFamily', 'cuisine'];
}

const grouped = {
  SAFE_TO_CREATE: candidates.filter((candidate) => candidate.status === 'SAFE_TO_CREATE'),
  ALREADY_EXISTS: candidates.filter((candidate) => candidate.status === 'ALREADY_EXISTS'),
  MERGE_AS_ALIAS: candidates.filter((candidate) => candidate.status === 'MERGE_AS_ALIAS'),
};

const report = {
  generatedAt: new Date().toISOString(),
  databasePath,
  totalDatabaseRecipes: recipes.length,
  candidateCount: candidates.length,
  summary: Object.fromEntries(Object.entries(grouped).map(([status, items]) => [status, items.length])),
  mutationPerformed: false,
  note: 'Audit only. No recipes or aliases were created or modified.',
  ...grouped,
};

fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);

const lines = [
  '# Candidate Recipe Deduplication Audit',
  '',
  `- Database: \`${databasePath}\``,
  `- Database recipes scanned: ${recipes.length}`,
  `- Candidates checked: ${candidates.length}`,
  '- Fields checked: name, aliases, coreIngredients, dishFamily, cuisine',
  '- Mutations: none',
  '',
];

for (const [status, items] of Object.entries(grouped)) {
  lines.push(`## ${status} (${items.length})`, '');
  if (!items.length) {
    lines.push('_None._', '');
    continue;
  }
  for (const item of items) {
    lines.push(`### ${item.name}`);
    if (item.match) lines.push(`- Existing recipe: **${item.match}**`);
    if (item.aliases) lines.push(`- Proposed aliases: ${item.aliases.join(', ')}`);
    lines.push(`- Candidate core ingredients: ${item.coreIngredients.join(', ')}`);
    lines.push(`- Candidate family / cuisine: ${item.dishFamily} / ${item.cuisine}`);
    lines.push(`- Decision: ${item.reason}`);
    lines.push('');
  }
}

lines.push('## Next Actions', '');
lines.push('- Create nothing until the SAFE_TO_CREATE list is explicitly approved.');
lines.push('- For MERGE_AS_ALIAS, add a proper aliases field or alias table before changing records.');
lines.push('- For ALREADY_EXISTS, improve the matched record metadata rather than inserting another recipe.');
lines.push('');

fs.writeFileSync(markdownPath, `${lines.join('\n')}\n`);
console.log(JSON.stringify({ jsonPath, markdownPath, summary: report.summary }, null, 2));
