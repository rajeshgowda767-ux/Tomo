import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const localRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const reportCsvPath = path.join(reportsDir, 'mood_score_autofix_report.csv');
const reportJsonPath = path.join(reportsDir, 'mood_score_autofix_report.json');
const updatedScoresCsvPath = path.join(reportsDir, 'mood_score_updated_scores.csv');
const updatedScoresJsonPath = path.join(reportsDir, 'mood_score_updated_scores.json');
const conflictsCsvPath = path.join(reportsDir, 'mood_score_autofix_conflicts.csv');
const conflictsJsonPath = path.join(reportsDir, 'mood_score_autofix_conflicts.json');

fs.mkdirSync(reportsDir, { recursive: true });

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(localRecipesPath, 'utf8'), context);
const recipes = context.window.COOKBUDDY_LOCAL_RECIPES || [];

const normalize = (value) => String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
const tagsFor = (recipe) => (recipe.tags || []).map(normalize);
const includesTag = (recipe, tag) => tagsFor(recipe).includes(normalize(tag));
const titleFor = (recipe) => normalize(recipe.title);
const ingredientTextFor = (recipe) => [
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
  ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || ''),
].filter(Boolean).join(' ').toLowerCase();
const fullTextFor = (recipe) => `${titleFor(recipe)} ${(recipe.tags || []).join(' ').toLowerCase()} ${ingredientTextFor(recipe)}`;
const has = (recipe, pattern) => pattern.test(fullTextFor(recipe));
const titleHas = (recipe, pattern) => pattern.test(titleFor(recipe));
const isCore = (recipe) => normalize(recipe.recipeType || recipe.recipe_type || 'core') === 'core';
const cap = (value) => Math.max(1, Math.min(10, value));

const patterns = {
  paneer: /\bpaneer\b/,
  egg: /\begg\b/,
  animalProtein: /\b(chicken|fish|mutton|prawn|pork|keema|kheema)\b/,
  legumeProtein: /\b(rajma|chole|chana|chickpea|dal|lentil|toor dal|moong dal|urad dal|black urad dal|besan|sundal|matki)\b/,
  grainForward: /\b(avala?kki|poha|lemon rice|upma|dosa|idli|pongal|khichdi|rice|porridge|paratha|seviyan|momos|noodles|schezwan fried rice|pulao|biryani|appam|puttu|pesarattu)\b/,
  nostalgiaHigh: /\b(idli|dosa|pongal|khichdi|curd rice|dal rice|rasam rice|aloo paratha|ragi porridge|rice porridge|oats porridge)\b/,
  dalProteinDish: /\b(dal makhani|dal rice|dal roti|sambar rice|bisibelebath|kadhi chawal)\b/,
  legumeProteinDish: /\b(rajma chawal|chole chawal|sundal)\b/,
  everydayHome: /\b(dal rice|rasam rice|curd rice|khichdi|pongal|sambar rice|dal roti|chicken curry|fish curry|egg curry|palak paneer|rajma chawal|chole chawal|dosa|idli|poha|avala?kki|upma|aloo paratha|methi paratha|stuffed paratha|paneer paratha|vegetable soup|mushroom soup|corn soup|oats porridge|rice porridge|ragi porridge|rice cakes|rice porridge|apple puree|mashed banana|vegetable puree)\b/,
  homeCurry: /\b(andhra chicken curry|chicken chettinad|chicken sukka|kerala fish curry|nattu kozhi curry|andhra podi idli|kadhi chawal|bisibelebath|dal makhani|butter chicken|pork curry|chicken stew|fish stew|chicken rice|fish curry rice|egg curry rice|chicken pulao)\b/,
  restaurantStreet: /\b(chilli paneer|schezwan fried rice|chicken roll|momos|chicken 65|paneer tikka|paneer tikka masala|kheema pav|kolhapuri misal pav|mirchi bajji|pakora|bonda|samosa|kachori|bread pakora|vada pav|bhel puri|pav bhaji|prawn ghee roast|guntur chilli chicken|laal maas|kolhapuri chicken|madras curry|mirchi ka salan)\b/,
  rainyHigh: /\b(pakora|bajji|bonda|chai|rasam|soup|khichdi|pongal|corn soup|mushroom soup|vegetable soup|pepper rasam|masala chai|thukpa)\b/,
  comfortBowl: /\b(khichdi|pongal|curd rice|rasam rice|dal rice|sambar rice|porridge|chicken stew|fish stew|thukpa|vegetable soup|mushroom soup|corn soup)\b/,
};

function proteinScore(recipe) {
  const title = titleFor(recipe);
  if (patterns.paneer.test(title) || has(recipe, patterns.paneer)) return [8, 'Paneer dish'];
  if (patterns.egg.test(title) || has(recipe, patterns.egg)) return [8, 'Egg dish'];
  if (patterns.animalProtein.test(title) || has(recipe, patterns.animalProtein)) return [8, 'Chicken/fish/mutton/prawn/pork dish'];
  if (patterns.legumeProteinDish.test(title)) return [7, 'Rajma/chole/chana dish'];
  if (patterns.dalProteinDish.test(title)) return [6, 'Dal-heavy dish'];
  if (patterns.grainForward.test(title) && !/\b(egg|chicken|fish|prawn|mutton|pork|paneer|rajma|chole|chana|besan)\b/.test(fullTextFor(recipe))) {
    return [2, 'Grain-only or grain-forward dish'];
  }
  if (patterns.legumeProtein.test(title) || has(recipe, patterns.legumeProtein)) return [6, 'Rajma/chole/dal/besan dish'];
  return [3, 'No strong protein identity'];
}

function nostalgiaScore(recipe) {
  const title = titleFor(recipe);
  if (patterns.nostalgiaHigh.test(title)) return [9, 'High nostalgia staple'];
  if (/\b(mashed banana|apple puree|ladoo|modak|gujiya|sweet pongal|kada prasad|rice cakes|sambar rice|rajma chawal|chole chawal|chicken curry|fish curry|egg curry|methi paratha|stuffed paratha|poha|avala?kki|upma)\b/.test(title)) {
    return [7, 'Familiar home/family dish'];
  }
  if (patterns.restaurantStreet.test(title)) return [3, 'Restaurant/street-food dish'];
  return [5, 'Moderate nostalgia'];
}

function homeStyleScore(recipe) {
  const title = titleFor(recipe);
  if (patterns.everydayHome.test(title)) return [9, 'Everyday homemade dish'];
  if (patterns.homeCurry.test(title)) return [8, 'Home-style curry/rice/regional dish'];
  if (patterns.restaurantStreet.test(title)) return [5, 'Restaurant/street-food dish'];
  if (includesTag(recipe, 'festival')) return [7, 'Homemade but occasional/festival dish'];
  return [6, 'Moderate home-style fit'];
}

function rainyDayScore(recipe) {
  const title = titleFor(recipe);
  if (patterns.rainyHigh.test(title)) return [9, 'Rainy-day snack/sip/soup/comfort bowl'];
  if (patterns.comfortBowl.test(title)) return [8, 'Warm comfort bowl'];
  if (patterns.restaurantStreet.test(title)) return [4, 'Restaurant/street-food dish; low rainy-day priority'];
  if (/\b(chicken curry|fish curry|egg curry|andhra chicken curry|chicken chettinad|chicken sukka|kerala fish curry|butter chicken|pork curry|fish fry)\b/.test(title)) {
    return [5, 'Curry/fry can work in rain but should not dominate'];
  }
  if (includesTag(recipe, 'rainy-day') || includesTag(recipe, 'monsoon-favorite')) return [6, 'Tagged rainy but moderate fit'];
  return [3, 'No strong rainy-day signal'];
}

function collectConflicts(recipe, suggested) {
  const conflicts = [];
  const title = titleFor(recipe);
  const tags = tagsFor(recipe);
  if ((tags.includes('high protein') || tags.includes('protein rich')) && suggested.proteinScore <= 3) {
    conflicts.push('High-protein tag conflicts with low protein score rule');
  }
  if ((tags.includes('rainy day') || tags.includes('monsoon favorite')) && suggested.rainyDayScore <= 4) {
    conflicts.push('Rainy-day tag conflicts with low rainy-day score rule');
  }
  if (patterns.restaurantStreet.test(title) && suggested.homeStyleScore >= 8) {
    conflicts.push('Restaurant/street-food classification conflicts with high home-style score');
  }
  if (patterns.grainForward.test(title) && suggested.proteinScore >= 7 && !/\b(egg|chicken|fish|prawn|mutton|pork|paneer|rajma|chole|chana|besan)\b/.test(fullTextFor(recipe))) {
    conflicts.push('Grain-forward dish conflicts with high protein score');
  }
  if ((recipe.dietType === 'non-vegetarian' || recipe.diet_type === 'non-vegetarian') && !/\b(chicken|egg|fish|mutton|prawn|pork|keema|kheema)\b/.test(fullTextFor(recipe))) {
    conflicts.push('Diet type says non-vegetarian but no non-vegetarian ingredient signal');
  }
  return conflicts;
}

const changes = [];
const conflicts = [];
const updatedScores = [];

for (const recipe of recipes) {
  if (!isCore(recipe)) continue;
  const suggestions = {
    proteinScore: proteinScore(recipe),
    nostalgiaScore: nostalgiaScore(recipe),
    homeStyleScore: homeStyleScore(recipe),
    rainyDayScore: rainyDayScore(recipe),
  };
  const suggestedFlat = Object.fromEntries(Object.entries(suggestions).map(([key, [value]]) => [key, cap(value)]));
  const conflictReasons = collectConflicts(recipe, suggestedFlat);
  if (conflictReasons.length) {
    conflicts.push({
      recipeName: recipe.title,
      tags: (recipe.tags || []).join('; '),
      primaryIngredients: [recipe.primaryIngredient1, recipe.primaryIngredient2].filter(Boolean).join(' + '),
      currentScores: `proteinScore=${recipe.proteinScore ?? ''}; nostalgiaScore=${recipe.nostalgiaScore ?? ''}; homeStyleScore=${recipe.homeStyleScore ?? ''}; rainyDayScore=${recipe.rainyDayScore ?? ''}`,
      suggestedScores: `proteinScore=${suggestedFlat.proteinScore}; nostalgiaScore=${suggestedFlat.nostalgiaScore}; homeStyleScore=${suggestedFlat.homeStyleScore}; rainyDayScore=${suggestedFlat.rainyDayScore}`,
      conflict: conflictReasons.join(' | '),
    });
  }
  for (const [key, [newValue, reason]] of Object.entries(suggestions)) {
    const oldValue = Number.isFinite(Number(recipe[key])) ? Number(recipe[key]) : null;
    const finalValue = cap(newValue);
    if (oldValue !== finalValue) {
      changes.push({
        recipeName: recipe.title,
        scoreName: key,
        oldScore: oldValue ?? '',
        newScore: finalValue,
        reason,
        tags: (recipe.tags || []).join('; '),
        primaryIngredients: [recipe.primaryIngredient1, recipe.primaryIngredient2].filter(Boolean).join(' + '),
      });
      recipe[key] = finalValue;
    }
  }
  updatedScores.push({
    recipeName: recipe.title,
    tags: (recipe.tags || []).join('; '),
    primaryIngredients: [recipe.primaryIngredient1, recipe.primaryIngredient2].filter(Boolean).join(' + '),
    proteinScore: recipe.proteinScore ?? '',
    nostalgiaScore: recipe.nostalgiaScore ?? '',
    homeStyleScore: recipe.homeStyleScore ?? '',
    rainyDayScore: recipe.rainyDayScore ?? '',
  });
}

const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
function writeCsv(filePath, headers, rows) {
  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n') + '\n';
  fs.writeFileSync(filePath, csv);
}

writeCsv(reportCsvPath, ['recipeName', 'scoreName', 'oldScore', 'newScore', 'reason', 'tags', 'primaryIngredients'], changes);
fs.writeFileSync(reportJsonPath, JSON.stringify(changes, null, 2));
writeCsv(updatedScoresCsvPath, ['recipeName', 'tags', 'primaryIngredients', 'proteinScore', 'nostalgiaScore', 'homeStyleScore', 'rainyDayScore'], updatedScores);
fs.writeFileSync(updatedScoresJsonPath, JSON.stringify(updatedScores, null, 2));
writeCsv(conflictsCsvPath, ['recipeName', 'tags', 'primaryIngredients', 'currentScores', 'suggestedScores', 'conflict'], conflicts);
fs.writeFileSync(conflictsJsonPath, JSON.stringify(conflicts, null, 2));
fs.writeFileSync(localRecipesPath, `window.COOKBUDDY_LOCAL_RECIPES = ${JSON.stringify(recipes, null, 2)};\n`);

console.log(JSON.stringify({
  checkedCoreRecipes: recipes.filter(isCore).length,
  changedScoreFields: changes.length,
  changedRecipes: new Set(changes.map((item) => item.recipeName)).size,
  conflicts: conflicts.length,
  reportCsvPath,
  updatedScoresCsvPath,
  conflictsCsvPath,
}, null, 2));
