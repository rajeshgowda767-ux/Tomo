import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const frontendRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const generatedRecipesPath = path.join(root, 'database', 'generated', 'recipes.json');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const reportCsvPath = path.join(reportsDir, 'mood_ownership_report.csv');
const reportJsonPath = path.join(reportsDir, 'mood_ownership_report.json');
const validationCsvPath = path.join(reportsDir, 'mood_ownership_validation.csv');

fs.mkdirSync(reportsDir, { recursive: true });

const moodLabels = {
  comfort: 'Comfort Food',
  soul: 'Soul Food',
  protein: 'High Protein',
  quick: 'Quick & Easy',
  spicy: 'Spicy Food',
  rainy: 'Rainy Day',
};

const moods = Object.keys(moodLabels);

const moodTags = {
  comfort: ['comfort', 'comfort-food'],
  soul: ['soul-food'],
  protein: ['high-protein', 'protein-rich'],
  quick: ['quick', 'quick-meal'],
  spicy: ['spicy', 'spicy-food'],
  rainy: ['rainy-day', 'monsoon-favorite'],
};

const canonicalMoodTag = {
  comfort: 'comfort',
  soul: 'soul-food',
  protein: 'high-protein',
  quick: 'quick',
  spicy: 'spicy-food',
  rainy: 'rainy-day',
};

const ownershipOverrides = {
  'andhra-chicken-curry': ['protein', 'spicy'],
  'chicken-curry-dinner': ['comfort', 'protein'],
  'egg-curry': ['protein', 'spicy'],
  'khichdi-dinner': ['comfort', 'rainy'],
  'khichdi-lunch': ['comfort', 'rainy'],
  'pepper-rasam': ['rainy', 'spicy'],
  'pongal-breakfast': ['comfort', 'rainy'],
  'spicy-aloo-paratha': ['soul', 'spicy'],
  'rasam-rice-lunch': ['comfort', 'soul'],
};

const allMoodTags = new Set(Object.values(moodTags).flat().map(normalize));

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
}

function titleOf(recipe) {
  return String(recipe.title || recipe.dish_name || recipe.recipe_name || '').trim();
}

function sourceIdOf(recipe) {
  return String(recipe.sourceId || recipe.source_id || recipe.id || titleOf(recipe));
}

function tagsFor(recipe) {
  return (recipe.tags || []).map(normalize);
}

function hasTag(recipe, tag) {
  return tagsFor(recipe).includes(normalize(tag));
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

function hasAny(text, terms) {
  return terms.some((term) => text.includes(term));
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

function strictSpicyIdentity(recipe) {
  const identityText = [
    titleOf(recipe),
    sourceIdOf(recipe),
    recipe.cuisine,
    recipe.spiceLevel,
  ].filter(Boolean).join(' ').toLowerCase();
  return ['spicy', 'very spicy', 'very-spicy', 'extreme'].includes(normalize(recipe.spiceLevel))
    || hasAny(identityText, ['spicy', 'chilli', 'chili', 'mirchi', 'podi', 'andhra', 'chettinad', 'kolhapuri', 'schezwan', 'laal', 'salan', 'guntur', 'madras', '65', 'tikka masala', 'ghee roast'])
    || normalize(titleOf(recipe)).includes('pepper rasam');
}

function moodScore(recipe, mood) {
  const tags = tagsFor(recipe);
  const text = textFor(recipe);
  if (mood === 'comfort') {
    return Number(recipe.comfortScore || 0) * 10
      + Number(recipe.homeStyleScore || 0) * 3
      + (hasTag(recipe, 'comfort') || hasTag(recipe, 'comfort-food') ? 18 : 0)
      + (hasTag(recipe, 'quick') ? 3 : 0);
  }
  if (mood === 'soul') {
    return Number(recipe.nostalgiaScore || 0) * 8
      + Number(recipe.homeStyleScore || 0) * 5
      + Number(recipe.comfortScore || 0) * 3
      + (hasTag(recipe, 'soul-food') ? 20 : 0);
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
    if (!strictSpicyIdentity(recipe)) return 0;
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

function isGenuinelyRelevant(recipe, mood) {
  const tags = tagsFor(recipe);
  const text = textFor(recipe);
  const identityText = [
    titleOf(recipe),
    sourceIdOf(recipe),
    recipe.cuisine,
    recipe.spiceLevel,
    ...(recipe.tags || []),
  ].filter(Boolean).join(' ').toLowerCase();
  const title = normalize(titleOf(recipe));
  if (mood === 'comfort') {
    return Number(recipe.comfortScore || 0) >= 7
      || tags.includes('comfort')
      || tags.includes('comfort food')
      || /\b(khichdi|pongal|curd rice|dal rice|rasam rice|idli|porridge|curry|stew)\b/.test(title);
  }
  if (mood === 'soul') {
    return tags.includes('soul food')
      || (Number(recipe.nostalgiaScore || 0) >= 7 && Number(recipe.homeStyleScore || 0) >= 7)
      || /\b(idli|dosa|pongal|khichdi|curd rice|dal rice|rasam rice|aloo paratha|poha|avalakki|upma|porridge)\b/.test(title);
  }
  if (mood === 'protein') return hasHighProteinCore(recipe);
  if (mood === 'quick') {
    return tags.includes('quick')
      || tags.includes('quick meal')
      || recipe.lowEffort === true
      || recipe.minimalCleanup === true
      || Number(recipe.effortScore || 10) <= 4
      || totalTime(recipe) <= 25;
  }
  if (mood === 'spicy') {
    return strictSpicyIdentity(recipe);
  }
  if (mood === 'rainy') {
    return Number(recipe.rainyDayScore || 0) >= 8
      || tags.includes('rainy day')
      || tags.includes('monsoon favorite')
      || hasAny(text, ['pakora', 'bajji', 'bonda', 'chai', 'rasam', 'soup', 'khichdi', 'pongal']);
  }
  return false;
}

function identityBoost(recipe, mood) {
  if (!isGenuinelyRelevant(recipe, mood)) return 0;
  if (mood === 'spicy') return 145;
  if (mood === 'protein') return 95;
  if (mood === 'rainy') return 95;
  if (mood === 'comfort') return 90;
  if (mood === 'quick') return 45;
  if (mood === 'soul') return 35;
  return 0;
}

function assignedMoodLabels(recipe) {
  const tags = tagsFor(recipe);
  return moods
    .filter((mood) => moodTags[mood].some((tag) => tags.includes(normalize(tag))))
    .map((mood) => moodLabels[mood]);
}

function selectOwnership(recipe) {
  const scored = moods
    .map((mood) => {
      const rawScore = moodScore(recipe, mood);
      const relevant = isGenuinelyRelevant(recipe, mood);
      return {
        mood,
        rawScore,
        relevant,
        score: rawScore + identityBoost(recipe, mood),
      };
    })
    .sort((a, b) => b.score - a.score || moodLabels[a.mood].localeCompare(moodLabels[b.mood]));
  const override = ownershipOverrides[sourceIdOf(recipe)];
  if (override) {
    const primary = scored.find((item) => item.mood === override[0]);
    const secondary = scored.find((item) => item.mood === override[1]);
    return {
      primaryMood: primary.mood,
      primaryScore: primary.score,
      primaryRawScore: primary.rawScore,
      secondaryMood: secondary?.mood || '',
      secondaryScore: secondary?.score || 0,
      secondaryRawScore: secondary?.rawScore || 0,
      scores: scored,
    };
  }
  const primary = scored[0];
  const secondary = scored
    .slice(1)
    .find((item) => primary.score > 0
      && item.score >= primary.score * 0.85
      && item.relevant);
  return {
    primaryMood: primary.mood,
    primaryScore: primary.score,
    primaryRawScore: primary.rawScore,
    secondaryMood: secondary?.mood || '',
    secondaryScore: secondary?.score || 0,
    secondaryRawScore: secondary?.rawScore || 0,
    scores: scored,
  };
}

function updateMoodTags(recipe, primaryMood, secondaryMood) {
  const keepMoods = new Set([primaryMood, secondaryMood].filter(Boolean));
  const tags = (recipe.tags || [])
    .filter((tag) => !allMoodTags.has(normalize(tag)));
  for (const mood of keepMoods) {
    tags.push(canonicalMoodTag[mood]);
  }
  recipe.tags = [...new Set(tags)];
}

function readRecipes() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(frontendRecipesPath, 'utf8'), context);
  return context.window.COOKBUDDY_LOCAL_RECIPES || [];
}

function writeRecipes(recipes) {
  fs.writeFileSync(frontendRecipesPath, `window.COOKBUDDY_LOCAL_RECIPES = ${JSON.stringify(recipes, null, 2)};\n`);
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

const recipes = readRecipes();
const reportRows = [];

for (const recipe of recipes) {
  if (String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() !== 'core') continue;
  const previousMoods = assignedMoodLabels(recipe);
  const ownership = selectOwnership(recipe);
  recipe.primaryMood = moodLabels[ownership.primaryMood];
  recipe.secondaryMood = ownership.secondaryMood ? moodLabels[ownership.secondaryMood] : '';
  updateMoodTags(recipe, ownership.primaryMood, ownership.secondaryMood);
  const newMoods = [recipe.primaryMood, recipe.secondaryMood].filter(Boolean);
  const removedMoods = previousMoods.filter((mood) => !newMoods.includes(mood));
  reportRows.push({
    Recipe: titleOf(recipe),
    RecipeId: sourceIdOf(recipe),
    'Primary Mood': recipe.primaryMood,
    'Secondary Mood': recipe.secondaryMood,
    'Removed Moods': removedMoods.join('; '),
    'Primary Score': Math.round(ownership.primaryScore * 10) / 10,
    'Primary Raw Score': Math.round(ownership.primaryRawScore * 10) / 10,
    'Secondary Score': ownership.secondaryMood ? Math.round(ownership.secondaryScore * 10) / 10 : '',
    'Secondary Raw Score': ownership.secondaryMood ? Math.round(ownership.secondaryRawScore * 10) / 10 : '',
    'Previous Moods': previousMoods.join('; '),
    'New Moods': newMoods.join('; '),
  });
}

writeRecipes(recipes);

const validationRows = recipes
  .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core')
  .map((recipe) => ({
    Recipe: titleOf(recipe),
    RecipeId: sourceIdOf(recipe),
    PrimaryMood: recipe.primaryMood || '',
    SecondaryMood: recipe.secondaryMood || '',
    MoodTagCount: assignedMoodLabels(recipe).length,
  }))
  .filter((row) => row.MoodTagCount > 2 || !row.PrimaryMood);

writeCsv(reportCsvPath, ['Recipe', 'RecipeId', 'Primary Mood', 'Secondary Mood', 'Removed Moods', 'Primary Score', 'Primary Raw Score', 'Secondary Score', 'Secondary Raw Score', 'Previous Moods', 'New Moods'], reportRows);
writeCsv(validationCsvPath, ['Recipe', 'RecipeId', 'PrimaryMood', 'SecondaryMood', 'MoodTagCount'], validationRows);
fs.writeFileSync(reportJsonPath, JSON.stringify({
  updatedCoreRecipes: reportRows.length,
  validationIssueCount: validationRows.length,
  outputs: {
    reportCsv: reportCsvPath,
    reportJson: reportJsonPath,
    validationCsv: validationCsvPath,
  },
  rows: reportRows,
  validationRows,
}, null, 2));

console.log(JSON.stringify({
  updatedCoreRecipes: reportRows.length,
  validationIssueCount: validationRows.length,
  reportCsv: reportCsvPath,
  reportJson: reportJsonPath,
  validationCsv: validationCsvPath,
}, null, 2));
