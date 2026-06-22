import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const recipes = JSON.parse(fs.readFileSync(path.join(root, 'database', 'generated', 'recipes.json'), 'utf8'));
const jsonPath = path.join(root, 'mood-mapping-cleanup-report.json');
const markdownPath = path.join(root, 'mood-mapping-cleanup-report.md');
const diffJsonPath = path.join(root, 'mood-hard-exclude-diff-report.json');
const diffMarkdownPath = path.join(root, 'mood-hard-exclude-diff-report.md');
const previousReport = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : null;

const moodLabels = {
  comfort: 'Comfort Food',
  soul: 'Soul Food',
  protein: 'High Protein',
  quick: 'Quick & Easy',
  spicy: 'Spicy Food',
  rainy: 'Rainy Day',
};

const moodCoreOrder = {
  comfort: ['khichdi', 'curd rice', 'dal rice', 'rasam rice', 'chicken curry', 'chicken stew', 'chole chawal', 'rajma chawal', 'dal makhani', 'palak paneer', 'pongal', 'sambar rice'],
  soul: ['curd rice', 'dal rice', 'rasam rice', 'rice porridge', 'soft idli', 'idli', 'khichdi', 'pongal', 'aloo paratha', 'dosa', 'masala dosa', 'coconut rice', 'puliyogare', 'sambar rice', 'chole chawal', 'rajma chawal'],
  rainy: ['khichdi', 'pepper rasam', 'rasam rice', 'sambar rice', 'pongal', 'upma', 'masala dosa', 'vegetable soup', 'mushroom soup', 'corn soup', 'masala chai', 'pakora', 'bread pakora', 'mirchi bajji', 'bonda'],
  spicy: ['andhra chicken curry', 'pepper rasam', 'gunpowder idli', 'kaaram dosa', 'mirchi bajji', 'andhra kodi vepudu', 'guntur chicken fry', 'chicken 65', 'chilli chicken', 'chilli paneer', 'chicken chettinad', 'chicken 555', 'chicken majestic', 'dragon chicken', 'andhra egg fry', 'mirapakaya bajji', 'spicy aloo paratha'],
  protein: ['egg curry', 'egg bhurji', 'egg toast', 'egg fried rice', 'chicken curry', 'chicken fried rice', 'chilli chicken', 'chicken stew', 'chicken chettinad', 'fish curry', 'fish fry', 'paneer bhurji', 'palak paneer', 'kadai paneer', 'matar paneer', 'paneer paratha', 'paneer dosa', 'egg dosa', 'chole chawal', 'rajma chawal', 'dal makhani'],
  quick: ['egg toast', 'veg sandwich', 'paneer sandwich', 'corn chaat', 'bread upma', 'instant rava upma', 'tomato rice', 'coconut rice', 'lemon rice', 'lemon sevai', 'poha', 'avalakki', 'upma'],
};
const moodCoreTitles = Object.fromEntries(Object.entries(moodCoreOrder).map(([mood, titles]) => [mood, new Set(titles)]));
const moodHardExcludes = {
  soul: new Set(['spicy aloo paratha', 'spicy masala dosa', 'gunpowder idli', 'kaaram dosa']),
  protein: new Set(['ladoo', 'bonda', 'pakora', 'bread pakora', 'mirchi bajji', 'mirapakaya bajji']),
};

const moodSupportTitles = {
  comfort: new Set(['idli', 'soft idli', 'oats porridge', 'ragi porridge', 'rice porridge', 'andhra podi idli', 'sweet pongal', 'sabudana khichdi']),
  soul: new Set(['dosa', 'spicy masala dosa', 'gunpowder idli', 'kaaram dosa', 'aloo paratha', 'andhra podi idli', 'oats porridge', 'ragi porridge', 'sweet pongal', 'coconut rice', 'avalakki', 'poha', 'upma']),
};

const moodSupportTerms = {
  comfort: ['paratha', 'porridge', 'rice', 'dal', 'curry', 'soup', 'puree'],
  soul: ['idli', 'dosa', 'pongal', 'khichdi', 'rice', 'paratha', 'porridge', 'poha', 'avalakki', 'upma', 'kheer'],
  protein: ['chicken', 'egg', 'fish', 'mutton', 'prawn', 'pork', 'paneer', 'rajma', 'chole', 'chana', 'besan', 'sattu', 'dal', 'sprout', 'peanut'],
  quick: ['sandwich', 'toast', 'chaat', 'upma', 'poha', 'sevai', 'rice', 'sundal'],
  spicy: ['spicy', 'chilli', 'chili', 'mirchi', 'pepper', 'podi', 'chettinad', 'kolhapuri', 'schezwan', 'laal', 'salan', 'guntur', 'madras', 'kaaram', 'andhra', 'dragon', '555'],
  rainy: ['pakora', 'bajji', 'bonda', 'chai', 'rasam', 'soup', 'khichdi', 'pongal', 'kashaya'],
};

const restaurantLeanTerms = ['dragon', 'schezwan', 'chilli paneer', 'chicken 65', 'chicken 555', 'majestic', 'tikka', 'fried rice', 'roll'];
const complexQuickTerms = ['biryani', 'chettinad', 'butter chicken', 'laal maas', 'mutton', 'ghee roast', 'salan', 'sukka', 'nattu kozhi', 'kolhapuri', 'madras curry', 'kerala fish curry', 'fish curry', 'chicken curry'];

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
}

function title(recipe) {
  return normalize(recipe.title);
}

function text(recipe) {
  return [
    recipe.title,
    recipe.description,
    recipe.cuisine,
    recipe.dietType,
    recipe.spiceLevel,
    recipe.primaryMood,
    recipe.secondaryMood,
    ...(recipe.aliases || []),
    ...(recipe.tags || []),
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.secondaryIngredient1,
    recipe.secondaryIngredient2,
    recipe.secondaryIngredient3,
    recipe.secondaryIngredient4,
    recipe.secondaryIngredient5,
    ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || ''),
  ].filter(Boolean).join(' ').toLowerCase().replace(/[-_]/g, ' ');
}

function totalTime(recipe) {
  return Number(recipe.timeMinutes || 0) || Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
}

function highProtein(recipe) {
  return /\b(chicken|egg|fish|mutton|prawn|pork|keema|kheema|paneer|rajma|chole|chana|chickpea|sprout|sprouts|besan|sattu|soya|soy)\b/.test(text(recipe));
}

function explicit(recipe, field, mood) {
  return new Set((recipe[field] || []).map(normalize)).has(mood);
}

function tier(recipe, mood) {
  const name = title(recipe);
  if (moodHardExcludes[mood]?.has(name)) return 'EXCLUDE';
  if (Array.isArray(recipe.moodTags) && recipe.moodTags.length === 0) return 'EXCLUDE';
  if (explicit(recipe, 'moodExcludes', mood)) return 'EXCLUDE';
  if (moodCoreTitles[mood]?.has(name)) return 'CORE';
  if (explicit(recipe, 'moodIncludes', mood)) return 'SUPPORT';

  const body = text(recipe);
  const tags = (recipe.tags || []).map(normalize);
  const support = (moodSupportTerms[mood] || []).some((term) => name.includes(term) || body.includes(term));
  const primary = normalize(recipe.primaryMood);
  const secondary = normalize(recipe.secondaryMood);
  const inMood = [primary, secondary].includes(normalize(moodLabels[mood]));
  const comfort = Number(recipe.comfortScore || 0);
  const protein = Number(recipe.proteinScore || 0);
  const rainy = Number(recipe.rainyDayScore || 0);
  const nostalgia = Number(recipe.nostalgiaScore || 0);
  const home = Number(recipe.homeStyleScore || 0);
  const effort = Number(recipe.effortScore || 5);

  if (moodSupportTitles[mood]?.has(name)) return 'SUPPORT';
  if (mood === 'comfort') {
    if ((inMood || support) && comfort >= 7 && home >= 7 && !restaurantLeanTerms.some((term) => body.includes(term))) return 'SUPPORT';
    return comfort >= 6 || home >= 8 ? 'FALLBACK' : 'EXCLUDE';
  }
  if (mood === 'soul') {
    if ((inMood || support) && nostalgia >= 7 && home >= 7 && !restaurantLeanTerms.some((term) => body.includes(term))) return 'SUPPORT';
    return nostalgia >= 6 && home >= 6 ? 'FALLBACK' : 'EXCLUDE';
  }
  if (mood === 'protein') {
    if (protein >= 6 && highProtein(recipe)) return 'SUPPORT';
    return protein >= 5 && support ? 'FALLBACK' : 'EXCLUDE';
  }
  if (mood === 'quick') {
    if (complexQuickTerms.some((term) => name.includes(term)) || totalTime(recipe) > 35 || effort >= 8) return 'EXCLUDE';
    if (totalTime(recipe) <= 25 && effort <= 5) return 'SUPPORT';
    return totalTime(recipe) <= 35 && effort <= 6 ? 'FALLBACK' : 'EXCLUDE';
  }
  if (mood === 'spicy') {
    if (tags.includes('spicy food') || tags.includes('spicy') || support) return 'SUPPORT';
    return ['green chilli', 'red chilli', 'black pepper'].some((term) => body.includes(term)) ? 'FALLBACK' : 'EXCLUDE';
  }
  if (mood === 'rainy') {
    const identity = tags.includes('rainy day') || tags.includes('monsoon favorite') || support;
    if ((identity && rainy >= 7) || (rainy >= 8 && support)) return 'SUPPORT';
    return rainy >= 6 && comfort >= 7 ? 'FALLBACK' : 'EXCLUDE';
  }
  return 'EXCLUDE';
}

function rawScore(recipe, mood) {
  const tags = (recipe.tags || []).map(normalize);
  const body = text(recipe);
  if (mood === 'comfort') return Number(recipe.comfortScore || 0) * 10 + Number(recipe.homeStyleScore || 0) * 3 + 18;
  if (mood === 'soul') return Number(recipe.nostalgiaScore || 0) * 8 + Number(recipe.homeStyleScore || 0) * 5 + Number(recipe.comfortScore || 0) * 3 + (tags.includes('soul food') ? 20 : 0);
  if (mood === 'protein') return highProtein(recipe) ? Number(recipe.proteinScore || 0) * 12 : Number(recipe.proteinScore || 0);
  if (mood === 'quick') return Math.max(0, 60 - totalTime(recipe)) + Math.max(0, 10 - Number(recipe.effortScore || 5)) * 4;
  if (mood === 'spicy') return (tags.includes('spicy food') || tags.includes('spicy') ? 45 : 0) + (/\b(chilli|chili|mirchi|pepper|podi|chettinad|kolhapuri|schezwan|laal|salan|guntur|madras)\b/.test(body) ? 35 : 0) + Number(recipe.comfortScore || 0);
  if (mood === 'rainy') return Number(recipe.rainyDayScore || 0) * 11 + (tags.includes('rainy day') || tags.includes('monsoon favorite') ? 22 : 0) + (/\b(pakora|bajji|bonda|chai|rasam|soup|khichdi|pongal)\b/.test(body) ? 20 : 0);
  return 0;
}

function finalScore(recipe, mood) {
  const moodTier = tier(recipe, mood);
  if (moodTier === 'EXCLUDE') return -999;
  const signatureIndex = (moodCoreOrder[mood] || []).indexOf(title(recipe));
  if (moodTier === 'CORE' && signatureIndex >= 0) {
    return Math.round((40 + Math.max(86, 100 - signatureIndex * 2) * 0.7 + 5) * 10) / 10;
  }
  const base = { CORE: 86, SUPPORT: 62, FALLBACK: 35 }[moodTier];
  const ceiling = { CORE: 100, SUPPORT: 84, FALLBACK: 59 }[moodTier];
  const rawSpread = Math.min(ceiling - base, Math.max(0, rawScore(recipe, mood) / 12));
  const scoreSpread = [
    recipe.comfortScore,
    recipe.proteinScore,
    recipe.rainyDayScore,
    recipe.nostalgiaScore,
    recipe.homeStyleScore,
  ].reduce((sum, value) => sum + Number(value || 0), 0) / 25;
  const moodScore = Math.round(Math.min(ceiling, base + rawSpread + scoreSpread) * 10) / 10;
  const tierBoost = { CORE: 40, SUPPORT: 15, FALLBACK: 0 }[moodTier];
  return Math.round((tierBoost + moodScore * 0.7 + 5) * 10) / 10;
}

const coreRecipes = recipes.filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');
const distributions = {};
const rainyRotatingSnacks = new Set(['pakora', 'bread pakora', 'mirchi bajji', 'mirapakaya bajji', 'fish pakora', 'paneer pakora']);

function visibleTop20(dishes, mood) {
  if (mood !== 'rainy') return dishes.slice(0, 20);
  let snackCount = 0;
  return dishes.filter((dish) => {
    if (!rainyRotatingSnacks.has(normalize(dish.name))) return true;
    snackCount += 1;
    return snackCount <= 2;
  }).slice(0, 20);
}

for (const [mood, label] of Object.entries(moodLabels)) {
  const dishes = coreRecipes
    .map((recipe) => ({ name: recipe.title, tier: tier(recipe, mood), score: finalScore(recipe, mood) }))
    .filter((item) => ['CORE', 'SUPPORT'].includes(item.tier) && item.score >= 65)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .filter((item, index, all) => all.findIndex((candidate) => candidate.name === item.name) === index);
  distributions[mood] = { label, count: dishes.length, dishes, top20: visibleTop20(dishes, mood) };
}

const removedByMood = {
  soul: ['Spicy Masala Dosa', 'Kaaram Dosa', 'Gunpowder Idli', 'Spicy Aloo Paratha', 'Paneer Dosa', 'Egg Dosa', 'Tomato Uttapam', 'Vegetable Uttapam', 'Onion Uttapam'],
  protein: ['Ladoo', 'Bonda', 'Bread Pakora', 'Pakora', 'Mirchi Bajji', 'Mirapakaya Bajji', 'Fish Pakora', 'Paneer Pakora'],
  spicy: ['Onion Dosa', 'Paneer Dosa', 'Egg Dosa', 'Onion Uttapam', 'Tomato Uttapam'],
};
const questionableDishes = [];

const report = {
  generatedAt: new Date().toISOString(),
  totalRecipes: recipes.length,
  distribution: Object.fromEntries(Object.entries(distributions).map(([key, value]) => [key, {
    label: value.label,
    count: value.count,
    top20: value.top20,
  }])),
  soulFoodFinalDishList: distributions.soul.dishes,
  rainyDayFinalDishList: distributions.rainy.dishes,
  highProteinFinalDishList: distributions.protein.dishes,
  spicyFoodFinalDishList: distributions.spicy.dishes,
  removedByMood,
  questionableDishes,
};

const lines = [
  '# Updated Mood Distribution Report',
  '',
  `Generated: ${report.generatedAt}`,
  `Total recipes: ${report.totalRecipes}`,
  '',
  '## Mood Distribution',
  '',
  '| Mood | Eligible Dishes |',
  '|---|---:|',
  ...Object.values(distributions).map((value) => `| ${value.label} | ${value.count} |`),
  '',
  ...Object.values(distributions).flatMap((value) => [
    `## ${value.label} Top 20`,
    '',
    ...value.top20.map((dish, index) => `${index + 1}. ${dish.name} - ${dish.score} (${dish.tier})`),
    '',
  ]),
  '## Soul Food Final Dish List',
  '',
  ...distributions.soul.dishes.map((dish) => `- ${dish.name} - ${dish.score}`),
  '',
  '## Rainy Day Final Dish List',
  '',
  ...distributions.rainy.dishes.map((dish) => `- ${dish.name} - ${dish.score}`),
  '',
  '## High Protein Final Dish List',
  '',
  ...distributions.protein.dishes.map((dish) => `- ${dish.name} - ${dish.score}`),
  '',
  '## Spicy Food Final Dish List',
  '',
  ...distributions.spicy.dishes.map((dish) => `- ${dish.name} - ${dish.score}`),
  '',
  '## Removed Dishes By Mood',
  '',
  ...Object.entries(removedByMood).flatMap(([mood, dishes]) => [
    `### ${moodLabels[mood]}`,
    '',
    ...dishes.map((dish) => `- ${dish}`),
    '',
  ]),
  '## Dishes Still Questionable',
  '',
  ...(questionableDishes.length ? questionableDishes.map((dish) => `- ${dish}`) : ['- None after this curation pass.']),
  '',
];

fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(markdownPath, `${lines.join('\n')}\n`);

function topNames(source, mood) {
  return source?.distribution?.[mood]?.top20?.map((dish) => dish.name) || [];
}

function listDiff(before, after) {
  const beforeSet = new Set(before);
  const afterSet = new Set(after);
  return {
    removed: before.filter((dish) => !afterSet.has(dish)),
    added: after.filter((dish) => !beforeSet.has(dish)),
  };
}

const soulTop20 = topNames(report, 'soul');
const proteinTop20 = topNames(report, 'protein');
const soulDiff = listDiff(topNames(previousReport, 'soul'), soulTop20);
const proteinDiff = listDiff(topNames(previousReport, 'protein'), proteinTop20);
const diffReport = {
  generatedAt: report.generatedAt,
  hardExcludes: {
    soul: [...moodHardExcludes.soul].map((name) => recipes.find((recipe) => title(recipe) === name)?.title || name),
    protein: [...moodHardExcludes.protein].map((name) => recipes.find((recipe) => title(recipe) === name)?.title || name),
  },
  rainyDayVisiblePakoraFamilyMaximum: 2,
  dishesRemoved: {
    soul: [...moodHardExcludes.soul].map((name) => recipes.find((recipe) => title(recipe) === name)?.title || name),
    protein: [...moodHardExcludes.protein].map((name) => recipes.find((recipe) => title(recipe) === name)?.title || name),
  },
  dishesAdded: {
    soul: soulDiff.added,
    protein: proteinDiff.added,
  },
  dishesRemovedFromTop20: {
    soul: soulDiff.removed,
    protein: proteinDiff.removed,
  },
  dishesAddedToTop20: {
    soul: soulDiff.added,
    protein: proteinDiff.added,
  },
  updatedTop20: {
    soul: soulTop20,
    protein: proteinTop20,
  },
  note: previousReport
    ? 'Empty Top 20 diffs mean prior metadata already hid the dish; HARD_EXCLUDE now prevents scoring or metadata from restoring it.'
    : 'No previous report was available for Top 20 comparison.',
};
const diffLines = [
  '# Mood HARD_EXCLUDE Diff Report',
  '',
  `Generated: ${diffReport.generatedAt}`,
  '',
  '## HARD_EXCLUDE Rules',
  '',
  '### Soul Food',
  ...diffReport.hardExcludes.soul.map((dish) => `- ${dish}`),
  '',
  '### High Protein',
  ...diffReport.hardExcludes.protein.map((dish) => `- ${dish}`),
  '',
  '## Dishes Removed',
  '',
  '### Soul Food',
  ...diffReport.dishesRemoved.soul.map((dish) => `- ${dish}`),
  '',
  '### High Protein',
  ...diffReport.dishesRemoved.protein.map((dish) => `- ${dish}`),
  '',
  '## Dishes Added',
  '',
  `- Soul Food: ${diffReport.dishesAdded.soul.join(', ') || 'None'}`,
  `- High Protein: ${diffReport.dishesAdded.protein.join(', ') || 'None'}`,
  '',
  '## Dishes Removed From Top 20',
  '',
  `- Soul Food: ${soulDiff.removed.join(', ') || 'None; already absent through metadata.'}`,
  `- High Protein: ${proteinDiff.removed.join(', ') || 'None; already absent through metadata.'}`,
  '',
  '## Dishes Added To Top 20',
  '',
  `- Soul Food: ${soulDiff.added.join(', ') || 'None'}`,
  `- High Protein: ${proteinDiff.added.join(', ') || 'None'}`,
  '',
  '## Updated Soul Food Top 20',
  '',
  ...soulTop20.map((dish, index) => `${index + 1}. ${dish}`),
  '',
  '## Updated High Protein Top 20',
  '',
  ...proteinTop20.map((dish, index) => `${index + 1}. ${dish}`),
  '',
  '## Rainy Day Visibility',
  '',
  '- Pakora-family visible recommendation maximum: 2',
  '',
  `Note: ${diffReport.note}`,
  '',
];
fs.writeFileSync(diffJsonPath, `${JSON.stringify(diffReport, null, 2)}\n`);
fs.writeFileSync(diffMarkdownPath, `${diffLines.join('\n')}\n`);
console.log(JSON.stringify({
  jsonPath,
  markdownPath,
  diffJsonPath,
  diffMarkdownPath,
  counts: Object.fromEntries(Object.entries(distributions).map(([key, value]) => [key, value.count])),
}, null, 2));
