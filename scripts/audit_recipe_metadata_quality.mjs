import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const localRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const outputPath = path.join(reportsDir, 'recipe_metadata_quality_audit.csv');
const outputJsonPath = path.join(reportsDir, 'recipe_metadata_quality_audit.json');

fs.mkdirSync(reportsDir, { recursive: true });

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(localRecipesPath, 'utf8'), context);
const recipes = (context.window.COOKBUDDY_LOCAL_RECIPES || [])
  .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');

const normalize = (value) => String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
const slugify = (value) => normalize(value).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const tagsFor = (recipe) => (recipe.tags || []).map(normalize);
const hasTag = (recipe, tag) => tagsFor(recipe).includes(normalize(tag));
const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const allowedDietTypes = new Set(['vegetarian', 'non-vegetarian', 'eggetarian', 'vegan']);
const allowedMealTags = new Set(['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'drink', 'side', 'soup', 'salad', 'baby']);
const allowedDifficulties = new Set(['easy', 'medium', 'hard']);
const allowedRecipeRoles = new Set(['main', 'side', 'snack', 'drink', 'dessert', 'condiment', 'soup']);
const editorialIssueTypes = new Set(['Home-style score audit', 'Nostalgia score audit']);

function list(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) return [value];
  return [];
}

function textFor(recipe) {
  return [
    recipe.title,
    recipe.dietType,
    recipe.diet_type,
    ...(recipe.tags || []),
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.secondaryIngredient1,
    recipe.secondaryIngredient2,
    recipe.secondaryIngredient3,
    recipe.secondaryIngredient4,
    recipe.secondaryIngredient5,
    ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || ''),
  ].filter(Boolean).join(' ').toLowerCase();
}

function hasMeat(recipe) {
  return /\b(chicken|fish|mutton|prawn|prawns|shrimp|duck|pork|egg|eggs|keema|kheema|meat|kozhi|crab|squid|mussel|mussels|clam|clams|anchovy|anchovies|sardine|sardines|seer|surmai|vanjaram|rohu|catla|tilapia|basa|pomfret|chingri|royyala|kodi|bombil|ngari|seafood|beef|ham|sausage)\b/.test(textFor(recipe));
}

function hasValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === 'object') return Object.keys(value).length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
}

const integrityIssues = [];
const editorialIssues = [];

function push(target, recipe, issueType, details, suggestion = '') {
  target.push({
    category: target === integrityIssues ? 'Metadata Integrity' : 'Editorial Metadata',
    issueType,
    recipeName: recipe.title,
    recipeId: recipe.id || '',
    sourceId: recipe.sourceId || '',
    tags: (recipe.tags || []).join('; '),
    dietType: recipe.dietType || recipe.diet_type || '',
    primaryIngredients: [recipe.primaryIngredient1, recipe.primaryIngredient2].filter(Boolean).join(' + '),
    scores: `homeStyleScore=${recipe.homeStyleScore ?? ''}; nostalgiaScore=${recipe.nostalgiaScore ?? ''}; proteinScore=${recipe.proteinScore ?? ''}; rainyDayScore=${recipe.rainyDayScore ?? ''}`,
    details,
    suggestion,
  });
}

const requiredFields = ['id', 'sourceId', 'title', 'description', 'dietType', 'mealTags', 'moodTags', 'dishFamily', 'ingredients'];
for (const recipe of recipes) {
  for (const field of requiredFields) {
    if (!hasValue(recipe[field])) {
      push(integrityIssues, recipe, 'Missing required field', `Missing ${field}.`, `Populate ${field}.`);
    }
  }

  const diet = String(recipe.dietType || recipe.diet_type || '').trim();
  const dietNorm = diet.toLowerCase();
  if (!allowedDietTypes.has(dietNorm)) {
    push(integrityIssues, recipe, 'Invalid diet type', `dietType "${diet}" is not an allowed value.`, 'Use vegetarian, non-vegetarian, eggetarian, or vegan.');
  }
  if (diet && diet !== dietNorm) {
    push(integrityIssues, recipe, 'Inconsistent diet type casing', `dietType "${diet}" should be lowercase.`, `Use "${dietNorm}".`);
  }
  if (diet.includes('_')) {
    push(integrityIssues, recipe, 'Invalid diet type format', `dietType "${diet}" uses underscores.`, 'Use hyphenated values such as non-vegetarian.');
  }

  for (const mealTag of list(recipe.mealTags)) {
    const raw = String(mealTag || '').trim();
    const mealNorm = normalize(raw);
    if (raw !== raw.toLowerCase()) {
      push(integrityIssues, recipe, 'Inconsistent meal tag casing', `mealTags contains "${raw}".`, `Use "${raw.toLowerCase()}".`);
    }
    if (!allowedMealTags.has(mealNorm)) {
      push(integrityIssues, recipe, 'Invalid meal type', `mealTags contains "${raw}".`, 'Use a supported meal tag.');
    }
  }

  const difficulty = String(recipe.difficulty || '').trim().toLowerCase();
  if (!allowedDifficulties.has(difficulty)) {
    push(integrityIssues, recipe, 'Invalid difficulty', `difficulty "${recipe.difficulty || ''}" is not valid.`, 'Use easy, medium, or hard.');
  }

  const role = String(recipe.recipeRole || '').trim().toLowerCase();
  if (!allowedRecipeRoles.has(role)) {
    push(integrityIssues, recipe, 'Invalid recipe role', `recipeRole "${recipe.recipeRole || ''}" is not valid.`, 'Use a supported recipe role.');
  }

  if (!(Number(recipe.prepTimeMinutes) >= 0)) {
    push(integrityIssues, recipe, 'Missing prep time', 'prepTimeMinutes is missing or invalid.', 'Add a non-negative prepTimeMinutes value.');
  }
  if (!(Number(recipe.cookTimeMinutes) >= 0)) {
    push(integrityIssues, recipe, 'Missing cook time', 'cookTimeMinutes is missing or invalid.', 'Add a non-negative cookTimeMinutes value.');
  }
  if (!(Number(recipe.servings) > 0)) {
    push(integrityIssues, recipe, 'Missing servings', 'servings is missing or invalid.', 'Add a positive servings value.');
  }

  if (!list(recipe.ingredients).every((item) => item && hasValue(item.name || item.ingredientName))) {
    push(integrityIssues, recipe, 'Invalid ingredient reference', 'One or more ingredients are missing a name.', 'Populate ingredient names.');
  }

  const vegetarianTag = hasTag(recipe, 'vegetarian') || dietNorm === 'vegetarian' || dietNorm === 'vegan';
  const nonVegTag = hasTag(recipe, 'non-vegetarian') || hasTag(recipe, 'non-veg') || dietNorm === 'non-vegetarian';
  const meat = hasMeat(recipe);
  if (vegetarianTag && nonVegTag) {
    push(integrityIssues, recipe, 'Conflicting diet tags', 'Recipe is marked both vegetarian and non-vegetarian.', meat ? 'Keep non-vegetarian only.' : 'Keep vegetarian only.');
  } else if (vegetarianTag && meat) {
    push(integrityIssues, recipe, 'Conflicting diet tags', 'Recipe is marked vegetarian but contains meat/egg/fish ingredient signals.', 'Change diet/tags to non-vegetarian or remove meat ingredient.');
  } else if (nonVegTag && !meat) {
    push(integrityIssues, recipe, 'Conflicting diet tags', 'Recipe is marked non-vegetarian but has no meat/egg/fish ingredient signal.', 'Change diet/tags to vegetarian if ingredients are accurate.');
  }

  if (recipe.sourceId && slugify(recipe.sourceId) !== String(recipe.sourceId).trim()) {
    push(integrityIssues, recipe, 'Slug/sourceId inconsistency', `sourceId "${recipe.sourceId}" is not slug-formatted.`, 'Use lowercase hyphenated sourceId values.');
  }
}

const byTitle = new Map();
for (const recipe of recipes) {
  const key = normalize(recipe.title);
  if (!byTitle.has(key)) byTitle.set(key, []);
  byTitle.get(key).push(recipe);
}
for (const group of byTitle.values()) {
  if (group.length <= 1) continue;
  const signatures = group.map((recipe) => [
    [recipe.primaryIngredient1, recipe.primaryIngredient2].filter(Boolean).map(normalize).join('+'),
    [recipe.secondaryIngredient1, recipe.secondaryIngredient2, recipe.secondaryIngredient3].filter(Boolean).map(normalize).join('+'),
    (recipe.tags || []).map(normalize).sort().join('+'),
    recipe.prepTimeMinutes,
    recipe.cookTimeMinutes,
  ].join('|'));
  if (new Set(signatures).size === 1) {
    group.forEach((recipe) => push(integrityIssues, recipe, 'Duplicate recipe title', `Duplicate title appears ${group.length} times with matching metadata.`, 'Keep the highest quality record or disambiguate the title.'));
  }
}

const restaurantPattern = /\b(tikka|65|schezwan|chilli paneer|chilli-paneer|fried rice|roll|momos|pav|bajji|pakora|bonda|samosa|kachori)\b/;
for (const recipe of recipes) {
  if (Number(recipe.homeStyleScore || 0) >= 8 && (hasTag(recipe, 'spicy-food') || restaurantPattern.test(textFor(recipe)))) {
    push(editorialIssues, recipe, 'Home-style score audit', 'High homeStyleScore on spicy/street/restaurant-style recipe.', 'Editorial review only: reduce homeStyleScore to 4-6 if this is not genuinely homemade.');
  }
}

function nostalgiaCharacteristic(recipe) {
  const text = textFor(recipe);
  return hasTag(recipe, 'comfort')
    || hasTag(recipe, 'comfort-food')
    || hasTag(recipe, 'soul-food')
    || hasTag(recipe, 'traditional')
    || hasTag(recipe, 'home-style')
    || /\b(childhood|traditional|home|homestyle|home-style|idli|dosa|pongal|khichdi|curd rice|dal rice|rasam rice|aloo paratha|porridge|ladoo|modak|gujiya)\b/.test(text);
}

for (const recipe of recipes) {
  if (Number(recipe.nostalgiaScore || 0) >= 7 && !nostalgiaCharacteristic(recipe)) {
    push(editorialIssues, recipe, 'Nostalgia score audit', 'High nostalgiaScore without comfort/soul/traditional/home-style characteristics.', 'Editorial review only: reduce nostalgiaScore or add/validate traditional/home-style context.');
  }
}

const allIssues = [...integrityIssues, ...editorialIssues];
const headers = ['category', 'issueType', 'recipeName', 'recipeId', 'sourceId', 'tags', 'dietType', 'primaryIngredients', 'scores', 'details', 'suggestion'];
const csv = [
  headers.map(csvEscape).join(','),
  ...allIssues.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
].join('\n') + '\n';

const metadataIntegrityScore = Math.max(0, Math.round(100 - integrityIssues.length * 2));
const editorialMetadataScore = Math.max(0, Math.round(100 - editorialIssues.length * 0.3));
const integrityCounts = integrityIssues.reduce((counts, item) => {
  counts[item.issueType] = (counts[item.issueType] || 0) + 1;
  return counts;
}, {});
const editorialCounts = editorialIssues.reduce((counts, item) => {
  counts[item.issueType] = (counts[item.issueType] || 0) + 1;
  return counts;
}, {});

const report = {
  checkedCoreRecipes: recipes.length,
  metadataIntegrityScore,
  editorialMetadataScore,
  status: integrityIssues.length ? 'FAIL' : editorialIssues.length ? 'WARNING' : 'PASS',
  summary: {
    metadataIntegrityIssues: integrityIssues.length,
    editorialMetadataWarnings: editorialIssues.length,
    totalIssues: allIssues.length,
    integrityCounts,
    editorialCounts,
  },
  metadataIntegrityIssues: integrityIssues,
  editorialMetadataWarnings: editorialIssues,
  issues: allIssues,
  legacyIssueTypes: [...editorialIssueTypes],
  csv: outputPath,
  json: outputJsonPath,
};

fs.writeFileSync(outputPath, csv);
fs.writeFileSync(outputJsonPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(JSON.stringify({
  checkedCoreRecipes: recipes.length,
  metadataIntegrityScore,
  editorialMetadataScore,
  integrityIssues: integrityIssues.length,
  editorialWarnings: editorialIssues.length,
  issues: allIssues.length,
  csv: outputPath,
  json: outputJsonPath,
}, null, 2));
