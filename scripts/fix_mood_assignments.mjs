import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const frontendRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const generatedRecipesPath = path.join(root, 'database', 'generated', 'recipes.json');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const changeReportPath = path.join(reportsDir, 'mood_assignment_fix_report.csv');
const validationReportPath = path.join(reportsDir, 'mood_assignment_final_validation.csv');
const summaryPath = path.join(reportsDir, 'mood_assignment_fix_summary.json');

fs.mkdirSync(reportsDir, { recursive: true });

const moodTagMap = {
  comfort: new Set(['comfort', 'comfort-food']),
  soul: new Set(['soul-food']),
  protein: new Set(['high-protein', 'protein-rich']),
  quick: new Set(['quick', 'quick-meal']),
  spicy: new Set(['spicy', 'spicy-food']),
  rainy: new Set(['rainy-day', 'monsoon-favorite']),
};

const moodLabel = {
  comfort: 'Comfort Food',
  soul: 'Soul Food',
  protein: 'High Protein',
  quick: 'Quick & Easy',
  spicy: 'Spicy Food',
  rainy: 'Rainy Day',
};

const moods = Object.entries(moodLabel).map(([key, label]) => ({ key, label }));

const approvedExceptions = new Map([
  ['khichdi', new Set(['comfort', 'soul', 'rainy'])],
  ['dal rice', new Set(['comfort', 'soul', 'quick'])],
]);

const changes = {
  'andhra-chicken-curry': {
    previousMoods: ['Comfort Food', 'Soul Food', 'High Protein', 'Spicy Food'],
    keep: ['protein', 'spicy'],
    addTags: ['high-protein', 'protein-rich', 'spicy-food'],
    removeTags: ['comfort', 'comfort-food', 'soul-food'],
  },
  'chicken-curry-dinner': {
    previousMoods: ['Comfort Food', 'High Protein', 'Quick & Easy', 'Spicy Food'],
    keep: ['comfort', 'protein'],
    addTags: ['comfort', 'high-protein'],
    removeTags: ['quick', 'quick-meal', 'spicy', 'spicy-food', 'rainy-day', 'monsoon-favorite'],
    flags: { lowEffort: false, minimalCleanup: false },
  },
  'egg-curry': {
    previousMoods: ['Comfort Food', 'Soul Food', 'High Protein', 'Spicy Food'],
    keep: ['protein', 'spicy'],
    addTags: ['high-protein', 'protein-rich', 'spicy-food'],
    removeTags: ['comfort', 'comfort-food', 'soul-food'],
  },
  'pepper-rasam': {
    previousMoods: ['Comfort Food', 'Spicy Food', 'Rainy Day'],
    keep: ['rainy', 'spicy'],
    addTags: ['rainy-day', 'monsoon-favorite', 'spicy-food'],
    removeTags: ['comfort', 'comfort-food', 'quick', 'quick-meal'],
    flags: { lowEffort: false, minimalCleanup: false },
  },
  'spicy-aloo-paratha': {
    previousMoods: ['Comfort Food', 'Soul Food', 'Spicy Food'],
    keep: ['soul', 'spicy'],
    addTags: ['soul-food', 'spicy-food'],
    removeTags: ['comfort', 'comfort-food'],
  },
  'rasam-rice-lunch': {
    previousMoods: ['Comfort Food', 'Soul Food', 'Rainy Day'],
    keep: ['comfort', 'soul'],
    addTags: ['comfort', 'soul-food'],
    removeTags: ['quick', 'quick-meal', 'rainy-day', 'monsoon-favorite'],
    flags: { lowEffort: false, sickDay: false, minimalCleanup: false },
  },
  'khichdi-dinner': {
    previousMoods: ['Comfort Food', 'Soul Food', 'Quick & Easy', 'Rainy Day'],
    keep: ['comfort', 'soul', 'rainy'],
    addTags: ['comfort', 'soul-food', 'rainy-day'],
    removeTags: ['quick', 'quick-meal'],
    flags: { lowEffort: false, minimalCleanup: false },
  },
};

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
}

function sourceIdOf(recipe) {
  return String(recipe.sourceId || recipe.source_id || '');
}

function titleOf(recipe) {
  return String(recipe.title || recipe.dish_name || recipe.recipe_name || '').trim();
}

function uniqueTags(tags) {
  return [...new Set((tags || []).filter(Boolean))];
}

function assignedMoodKeys(recipe) {
  const tags = new Set((recipe.tags || []).map(normalize));
  const moods = [];
  for (const [mood, moodTags] of Object.entries(moodTagMap)) {
    if ([...moodTags].some((tag) => tags.has(normalize(tag)))) moods.push(mood);
  }
  return moods;
}

function assignedMoodLabels(recipe) {
  return assignedMoodKeys(recipe).map((mood) => moodLabel[mood]);
}

function textFor(recipe) {
  return [
    titleOf(recipe),
    recipe.cuisine,
    recipe.dietType,
    recipe.spiceLevel,
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

function totalTime(recipe) {
  return Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
}

function hasHighProteinCore(recipe) {
  const text = textFor(recipe);
  const title = normalize(titleOf(recipe));
  const proteinScore = Number(recipe.proteinScore || 0);
  if (proteinScore < 6) return false;
  if (/\b(chicken|egg|fish|mutton|prawn|pork|keema|kheema|paneer|rajma|chole|chana|chickpea|sprout|sprouts|besan|sattu|soya|soy)\b/.test(text)) return true;
  const dalForwardDish = /\b(dal|lentil)\b/.test(title) || /\b(toor dal|moong dal|urad dal|masoor dal|chana dal)\b/.test(text);
  const grainForwardException = /\b(idli|dosa|pongal|khichdi|porridge|upma|poha|rice)\b/.test(title);
  return dalForwardDish && !grainForwardException;
}

function moodRankingScore(recipe, mood) {
  const tags = (recipe.tags || []).map(normalize);
  const text = textFor(recipe);
  if (mood === 'comfort') {
    return Number(recipe.comfortScore || 0) * 10
      + Number(recipe.homeStyleScore || 0) * 3
      + (tags.includes('comfort') || tags.includes('comfort food') ? 18 : 0)
      + (tags.includes('quick') ? 3 : 0);
  }
  if (mood === 'soul') {
    return Number(recipe.nostalgiaScore || 0) * 8
      + Number(recipe.homeStyleScore || 0) * 5
      + Number(recipe.comfortScore || 0) * 3
      + (tags.includes('soul food') ? 20 : 0);
  }
  if (mood === 'protein') {
    return hasHighProteinCore(recipe)
      ? Number(recipe.proteinScore || 0) * 12 + (tags.includes('high protein') || tags.includes('protein rich') ? 16 : 0)
      : Number(recipe.proteinScore || 0);
  }
  if (mood === 'quick') {
    return Math.max(0, 60 - totalTime(recipe))
      + Number(recipe.effortScore ? 10 - recipe.effortScore : 5) * 4
      + (tags.includes('quick') || tags.includes('quick meal') ? 24 : 0);
  }
  if (mood === 'spicy') {
    return (tags.includes('spicy food') || tags.includes('spicy') ? 45 : 0)
      + (/\b(chilli|chili|mirchi|pepper|podi|chettinad|kolhapuri|schezwan|laal|salan|guntur|madras)\b/.test(text) ? 35 : 0)
      + Number(recipe.comfortScore || 0);
  }
  if (mood === 'rainy') {
    return Number(recipe.rainyDayScore || 0) * 11
      + (tags.includes('rainy day') || tags.includes('monsoon favorite') ? 22 : 0)
      + (/\b(pakora|bajji|bonda|chai|rasam|soup|khichdi|pongal)\b/.test(text) ? 20 : 0);
  }
  return 0;
}

function top20RanksByRecipe(recipes) {
  const ranks = new Map();
  const coreRecipes = recipes.filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');
  for (const mood of moods) {
    const ranked = [...coreRecipes]
      .map((recipe) => ({ recipe, score: moodRankingScore(recipe, mood.key) }))
      .sort((a, b) => b.score - a.score || titleOf(a.recipe).localeCompare(titleOf(b.recipe)))
      .slice(0, 20);
    ranked.forEach((item, index) => {
      const id = sourceIdOf(item.recipe);
      if (!ranks.has(id)) ranks.set(id, []);
      ranks.get(id).push(`${mood.label}: ${index + 1}`);
    });
  }
  return ranks;
}

function applyChange(recipe, change) {
  const remove = new Set((change.removeTags || []).map(normalize));
  const tags = uniqueTags(recipe.tags)
    .filter((tag) => !remove.has(normalize(tag)));
  for (const tag of change.addTags || []) {
    if (!tags.some((existing) => normalize(existing) === normalize(tag))) tags.push(tag);
  }
  recipe.tags = tags;
  for (const [key, value] of Object.entries(change.flags || {})) {
    if (Object.prototype.hasOwnProperty.call(recipe, key)) recipe[key] = value;
  }
}

function readFrontendRecipes() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(frontendRecipesPath, 'utf8'), context);
  return context.window.COOKBUDDY_LOCAL_RECIPES || [];
}

function writeFrontendRecipes(recipes) {
  fs.writeFileSync(frontendRecipesPath, `window.COOKBUDDY_LOCAL_RECIPES = ${JSON.stringify(recipes, null, 2)};\n`);
}

function writeGeneratedRecipes(recipes) {
  fs.writeFileSync(generatedRecipesPath, `${JSON.stringify(recipes, null, 2)}\n`);
}

function csvEscape(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function writeCsv(filePath, headers, rows) {
  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n') + '\n';
  fs.writeFileSync(filePath, csv);
}

function buildValidationRows(recipes) {
  return recipes
    .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core')
    .map((recipe) => {
      const moodKeys = assignedMoodKeys(recipe);
      const exception = approvedExceptions.get(normalize(titleOf(recipe)));
      const allowedException = exception
        && moodKeys.length <= exception.size
        && moodKeys.every((mood) => exception.has(mood));
      const violation = moodKeys.length > 2 && !allowedException;
      return {
        Recipe: titleOf(recipe),
        RecipeId: sourceIdOf(recipe),
        Moods: moodKeys.map((mood) => moodLabel[mood]).join('; '),
        MoodCount: moodKeys.length,
        ApprovedException: allowedException ? 'YES' : 'NO',
        Status: violation ? 'VIOLATION' : 'OK',
      };
    })
    .filter((row) => row.Status === 'VIOLATION')
    .sort((a, b) => Number(b.MoodCount) - Number(a.MoodCount) || a.Recipe.localeCompare(b.Recipe));
}

const recipes = readFrontendRecipes();
const beforeById = new Map();
for (const recipe of recipes) {
  const id = sourceIdOf(recipe);
  if (changes[id]) {
    beforeById.set(id, {
      title: titleOf(recipe),
      moods: assignedMoodLabels(recipe),
      tags: [...(recipe.tags || [])],
    });
  }
}

for (const recipe of recipes) {
  const change = changes[sourceIdOf(recipe)];
  if (!change) continue;
  applyChange(recipe, change);
}

writeFrontendRecipes(recipes);
writeGeneratedRecipes(recipes);

const ranksByRecipe = top20RanksByRecipe(recipes);
const changeRows = Object.keys(changes).map((id) => {
  const recipe = recipes.find((item) => sourceIdOf(item) === id);
  const before = beforeById.get(id);
  const change = changes[id];
  const afterMoods = assignedMoodLabels(recipe);
  const previousMoods = change.previousMoods || before?.moods || [];
  return {
    Recipe: before?.title || titleOf(recipe),
    RecipeId: id,
    PreviousMoods: previousMoods.join('; '),
    NewMoods: afterMoods.join('; '),
    MoodCountBefore: previousMoods.length,
    MoodCountAfter: afterMoods.length,
    NewRankPositions: (ranksByRecipe.get(id) || []).join('; ') || 'Not in top 20 mood rankings',
  };
});

const validationRows = buildValidationRows(recipes);

writeCsv(changeReportPath, ['Recipe', 'RecipeId', 'PreviousMoods', 'NewMoods', 'MoodCountBefore', 'MoodCountAfter', 'NewRankPositions'], changeRows);
writeCsv(validationReportPath, ['Recipe', 'RecipeId', 'Moods', 'MoodCount', 'ApprovedException', 'Status'], validationRows);
fs.writeFileSync(summaryPath, JSON.stringify({
  modifiedRecipes: changeRows.length,
  remainingViolationsIgnoringApprovedExceptions: validationRows.length,
  changes: changeRows,
  validationRows,
  outputs: {
    changeReport: changeReportPath,
    validationReport: validationReportPath,
    summary: summaryPath,
  },
}, null, 2));

console.log(JSON.stringify({
  modifiedRecipes: changeRows.length,
  remainingViolationsIgnoringApprovedExceptions: validationRows.length,
  changeReport: changeReportPath,
  validationReport: validationReportPath,
  summary: summaryPath,
}, null, 2));
