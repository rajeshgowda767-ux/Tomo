import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const recipesPath = path.join(root, 'database', 'generated', 'recipes.json');
const reportsDir = path.join(root, 'database', 'generated', 'reports');

fs.mkdirSync(reportsDir, { recursive: true });

const detailCsvPath = path.join(reportsDir, 'mood_bucket_audit.csv');
const summaryCsvPath = path.join(reportsDir, 'mood_bucket_audit_summary.csv');
const reviewCsvPath = path.join(reportsDir, 'mood_bucket_audit_review_flags.csv');
const visibleTop20CsvPath = path.join(reportsDir, 'mood_bucket_visible_top20_after_tightening.csv');
const summaryJsonPath = path.join(reportsDir, 'mood_bucket_audit_summary.json');

const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'))
  .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');

const tierBoosts = {
  CORE: 40,
  SUPPORT: 15,
  FALLBACK: 0,
  EXCLUDE: -999,
};

const moods = [
  { key: 'comfort', label: 'Comfort Food' },
  { key: 'soul', label: 'Soul Food' },
  { key: 'protein', label: 'High Protein' },
  { key: 'quick', label: 'Quick & Easy' },
  { key: 'spicy', label: 'Spicy Food' },
  { key: 'rainy', label: 'Rainy Day' },
];

const comfortCoreTerms = [
  'khichdi',
  'pongal',
  'curd rice',
  'dal rice',
  'rasam rice',
  'idli',
  'porridge',
  'soup',
];

const comfortSignatureTerms = [
  'khichdi',
  'curd rice',
  'dal rice',
  'rasam rice',
  'chicken curry',
  'chicken stew',
  'chole chawal',
  'rajma chawal',
  'dal makhani',
  'palak paneer',
  'pongal',
  'sambar rice',
];

const soulTerms = [
  'idli',
  'dosa',
  'pongal',
  'khichdi',
  'curd rice',
  'dal rice',
  'rasam rice',
  'aloo paratha',
  'ragi porridge',
  'rice porridge',
  'oats porridge',
  'poha',
  'avalakki',
  'upma',
  'kheer',
  'paratha',
];

const soulSignatureTerms = [
  'curd rice',
  'dal rice',
  'rasam rice',
  'idli',
  'soft idli',
  'pongal',
  'khichdi',
  'rice porridge',
];

const supportTermsByMood = {
  comfort: new Set([
    'idli',
    'soft idli',
    'oats porridge',
    'ragi porridge',
    'rice porridge',
    'andhra podi idli',
    'sweet pongal',
    'sabudana khichdi',
  ]),
  soul: new Set([
    'dosa',
    'spicy masala dosa',
    'gunpowder idli',
    'kaaram dosa',
    'aloo paratha',
    'andhra podi idli',
    'oats porridge',
    'ragi porridge',
    'sweet pongal',
    'coconut rice',
    'avalakki',
    'poha',
    'upma',
  ]),
};

const rainyTerms = [
  'pakora',
  'bajji',
  'bonda',
  'chai',
  'rasam',
  'soup',
  'khichdi',
  'pongal',
  'kashaya',
];

const rainySignatureTerms = [
  'pakora',
  'bread pakora',
  'fish pakora',
  'paneer pakora',
  'mirchi bajji',
  'mirapakaya bajji',
  'bonda',
  'masala chai',
  'pepper rasam',
  'corn soup',
  'mushroom soup',
  'khichdi',
];

const signatureTermsByMood = {
  comfort: comfortSignatureTerms,
  soul: soulSignatureTerms,
  protein: [
    'chicken curry',
    'andhra chicken curry',
    'chicken chettinad',
    'chicken sukka',
    'egg curry',
    'egg bhurji',
    'egg toast',
    'fish curry',
    'fish fry',
    'paneer bhurji',
    'palak paneer',
    'paneer paratha',
    'paneer sandwich',
    'rajma chawal',
    'chole chawal',
    'dal makhani',
    'butter chicken',
    'chicken stew',
    'pork curry',
  ],
  quick: [
    'egg toast',
    'veg sandwich',
    'paneer sandwich',
    'corn chaat',
    'bread upma',
    'instant rava upma',
    'tomato rice',
    'coconut rice',
    'lemon rice',
    'lemon sevai',
    'poha',
    'avalakki',
    'upma',
  ],
  spicy: [
    'guntur chicken fry',
    'andhra chicken curry',
    'andhra kodi vepudu',
    'chicken chettinad',
    'chicken 555',
    'chicken majestic',
    'dragon chicken',
    'andhra egg fry',
    'mirapakaya bajji',
    'mirchi bajji',
    'gunpowder idli',
    'kaaram dosa',
    'spicy aloo paratha',
    'pepper rasam',
  ],
  rainy: rainySignatureTerms,
};

const spicyTerms = [
  'spicy',
  'chilli',
  'chili',
  'mirchi',
  'pepper',
  'podi',
  'chettinad',
  'kolhapuri',
  'schezwan',
  'laal',
  'salan',
  'guntur',
  'madras',
  'kaaram',
  'andhra',
  'dragon',
  '555',
];

const proteinTerms = [
  'chicken',
  'egg',
  'fish',
  'mutton',
  'prawn',
  'pork',
  'keema',
  'kheema',
  'paneer',
  'rajma',
  'chole',
  'chana',
  'chickpea',
  'sprout',
  'sprouts',
  'besan',
  'sattu',
  'dal',
  'lentil',
  'peanut',
];

const complexQuickTerms = [
  'biryani',
  'chettinad',
  'butter chicken',
  'laal maas',
  'mutton',
  'ghee roast',
  'salan',
  'sukka',
  'nattu kozhi',
  'kolhapuri',
  'madras curry',
  'kerala fish curry',
  'fish curry',
  'chicken curry',
];

const restaurantStreetTerms = [
  'dragon',
  'schezwan',
  'chilli paneer',
  'chicken 65',
  'chicken 555',
  'majestic',
  'tikka',
  'fried rice',
  'roll',
];

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim();
}

function titleOf(recipe) {
  return String(recipe.title || recipe.dish_name || recipe.recipe_name || '').trim();
}

function recipeKey(recipe) {
  return String(recipe.sourceId || recipe.id || titleOf(recipe));
}

function recipeFamilyKey(recipe) {
  return normalize(titleOf(recipe));
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
    recipe.primaryMood,
    recipe.secondaryMood,
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
  return Number(recipe.timeMinutes || 0)
    || Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
}

function hasAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function score(recipe, mood) {
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
    return hasHighProteinIdentity(recipe)
      ? Number(recipe.proteinScore || 0) * 12 + (hasTag(recipe, 'high-protein') || hasTag(recipe, 'protein-rich') ? 16 : 0)
      : Number(recipe.proteinScore || 0);
  }
  if (mood === 'quick') {
    return Math.max(0, 60 - totalTime(recipe))
      + Number(recipe.effortScore ? 10 - recipe.effortScore : 5) * 4
      + (tags.includes('quick') || hasTag(recipe, 'quick-meal') ? 24 : 0);
  }
  if (mood === 'spicy') {
    return (hasTag(recipe, 'spicy-food') || tags.includes('spicy') ? 45 : 0)
      + (hasAny(text, spicyTerms) ? 35 : 0)
      + Number(recipe.comfortScore || 0);
  }
  if (mood === 'rainy') {
    return Number(recipe.rainyDayScore || 0) * 11
      + (hasTag(recipe, 'rainy-day') || hasTag(recipe, 'monsoon-favorite') ? 22 : 0)
      + (hasAny(text, rainyTerms) ? 20 : 0);
  }
  return 0;
}

function mealType(recipe) {
  const tags = tagsFor(recipe);
  const values = [];
  for (const meal of ['breakfast', 'lunch', 'dinner', 'snacks', 'snack']) {
    if (tags.includes(meal)) values.push(meal === 'snack' ? 'Snacks' : meal[0].toUpperCase() + meal.slice(1));
  }
  const explicit = recipe.mealType || recipe.meal_type || recipe.bestTime;
  if (explicit && !values.length) values.push(String(explicit));
  return [...new Set(values)].join(', ') || 'Unknown';
}

function hasHighProteinIdentity(recipe) {
  const text = textFor(recipe);
  const title = normalize(titleOf(recipe));
  const proteinScore = Number(recipe.proteinScore || 0);
  if (proteinScore < 6) return false;
  if (new RegExp(`\\b(${proteinTerms.join('|')})\\b`).test(text)) {
    const grainForwardException = /\b(idli|dosa|pongal|khichdi|porridge|upma|poha|rice)\b/.test(title)
      && !/\b(egg|chicken|fish|paneer|rajma|chole|chana|besan|sprout|sattu)\b/.test(title);
    return !grainForwardException;
  }
  return false;
}

function moodMembership(recipe, label) {
  return [recipe.primaryMood, recipe.secondaryMood].map(normalize).includes(normalize(label));
}

function bucket(recipe, moodKey, rank) {
  const tags = tagsFor(recipe);
  const text = textFor(recipe);
  const title = normalize(titleOf(recipe));
  const currentPrimary = normalize(recipe.primaryMood);
  const currentSecondary = normalize(recipe.secondaryMood);
  const time = totalTime(recipe);
  const comfort = Number(recipe.comfortScore || 0);
  const protein = Number(recipe.proteinScore || 0);
  const rainy = Number(recipe.rainyDayScore || 0);
  const nostalgia = Number(recipe.nostalgiaScore || 0);
  const home = Number(recipe.homeStyleScore || 0);
  const effort = Number(recipe.effortScore || 5);
  const inMood = currentPrimary === normalize(moods.find((m) => m.key === moodKey).label)
    || currentSecondary === normalize(moods.find((m) => m.key === moodKey).label);
  if ((signatureTermsByMood[moodKey] || []).includes(title)) {
    return ['CORE', 'Explicit Core ownership list for this mood.'];
  }
  if (supportTermsByMood[moodKey]?.has(title)) {
    return ['SUPPORT', 'Explicit Support ownership list for this mood.'];
  }

  if (moodKey === 'comfort') {
    if ((inMood || hasAny(title, comfortCoreTerms)) && comfort >= 7 && home >= 7 && !isRestaurantStreet(recipe)) {
      return ['SUPPORT', 'Believable comfort fit, but not as iconic as the core comfort dishes.'];
    }
    if (comfort >= 6 || home >= 8) {
      return ['FALLBACK', 'Has some comfort or home-style value, but should appear only when stronger comfort dishes are unavailable.'];
    }
    return ['EXCLUDE', 'Weak comfort identity for normal comfort browsing.'];
  }

  if (moodKey === 'soul') {
    if ((inMood || hasAny(title, soulTerms)) && nostalgia >= 7 && home >= 7 && !isRestaurantStreet(recipe)) {
      return ['SUPPORT', 'Believable soul-food fit, but should not dominate the top of the feed.'];
    }
    if (nostalgia >= 6 && home >= 6) {
      return ['FALLBACK', 'Some nostalgic/home-style signal, but the identity is not strong enough for normal Soul Food browsing.'];
    }
    return ['EXCLUDE', 'Does not have enough nostalgic or home-style signal for Soul Food.'];
  }

  if (moodKey === 'protein') {
    if (protein >= 6 && hasHighProteinIdentity(recipe)) {
      return ['SUPPORT', 'Acceptable high-protein option, but not as strong as core protein dishes.'];
    }
    if (protein >= 5 && hasAny(text, proteinTerms)) {
      return ['FALLBACK', 'Contains a protein ingredient but is not strong enough for normal High Protein browsing.'];
    }
    return ['EXCLUDE', 'Protein identity is too weak; should not appear in High Protein.'];
  }

  if (moodKey === 'quick') {
    if (isComplexQuick(recipe)) {
      return ['EXCLUDE', 'Complex dish identity; should not be treated as Quick & Easy even if metadata is optimistic.'];
    }
    if (time <= 25 && effort <= 5) {
      return ['SUPPORT', 'Reasonably quick and practical, but not a signature quick dish.'];
    }
    if (time <= 35 && effort <= 6) {
      return ['FALLBACK', 'Can be manageable, but should only appear after clearer quick options.'];
    }
    return ['EXCLUDE', 'Too slow or effort-heavy for Quick & Easy browsing.'];
  }

  if (moodKey === 'spicy') {
    const spicyIdentity = hasTag(recipe, 'spicy-food') || tags.includes('spicy') || hasAny(text, spicyTerms);
    if (spicyIdentity) {
      return ['SUPPORT', 'Has believable spice signals but is not a flagship spicy recipe.'];
    }
    if (hasAny(text, ['green chilli', 'red chilli', 'black pepper'])) {
      return ['FALLBACK', 'Uses spice ingredients, but the dish itself is not clearly spicy-led.'];
    }
    return ['EXCLUDE', 'No clear spicy identity.'];
  }

  if (moodKey === 'rainy') {
    const rainyIdentity = hasTag(recipe, 'rainy-day') || hasTag(recipe, 'monsoon-favorite') || hasAny(title, rainyTerms);
    if ((rainyIdentity && rainy >= 7) || (rainy >= 8 && hasAny(text, rainyTerms))) {
      return ['SUPPORT', 'Believable rainy-day fit, but not a top signature rainy dish.'];
    }
    if (rainy >= 6 && comfort >= 7) {
      return ['FALLBACK', 'Warm or comforting enough for a rainy fallback, but not strongly rainy.'];
    }
    return ['EXCLUDE', 'Weak rainy-day identity.'];
  }

  return ['EXCLUDE', 'No rule matched.'];
}

function signatureIndex(recipe, moodKey) {
  const title = normalize(titleOf(recipe));
  return (signatureTermsByMood[moodKey] || []).findIndex((term) => title === term);
}

function spreadMoodScore(recipe, moodKey, suggestedBucket) {
  if (suggestedBucket === 'EXCLUDE') return 0;
  const raw = score(recipe, moodKey);
  const index = signatureIndex(recipe, moodKey);
  if (suggestedBucket === 'CORE' && index >= 0) {
    return Math.round(Math.max(86, Math.min(100, 100 - index * 2)) * 10) / 10;
  }
  const tierBase = { CORE: 86, SUPPORT: 62, FALLBACK: 35, EXCLUDE: 0 }[suggestedBucket] || 0;
  const tierCeiling = { CORE: 100, SUPPORT: 84, FALLBACK: 59, EXCLUDE: 0 }[suggestedBucket] || 0;
  const rawSpread = Math.min(tierCeiling - tierBase, Math.max(0, raw / 12));
  const scoreSpread = (
    Number(recipe.comfortScore || 0)
    + Number(recipe.proteinScore || 0)
    + Number(recipe.rainyDayScore || 0)
    + Number(recipe.nostalgiaScore || 0)
    + Number(recipe.homeStyleScore || 0)
  ) / 25;
  return Math.round(Math.min(tierCeiling, tierBase + rawSpread + scoreSpread) * 10) / 10;
}

function tieredFinalScore(recipe, moodKey, suggestedBucket, moodScore) {
  const mealTypeScore = 0;
  const ingredientScore = 0;
  const pantryScore = 0;
  return Math.round((
    (tierBoosts[suggestedBucket] || 0)
    + moodScore * 0.70
    + ingredientScore * 0.15
    + pantryScore * 0.10
    + mealTypeScore * 0.05
  ) * 10) / 10;
}

function isRestaurantStreet(recipe) {
  return hasAny(textFor(recipe), restaurantStreetTerms);
}

function isComplexQuick(recipe) {
  return hasAny(normalize(titleOf(recipe)), complexQuickTerms)
    || (totalTime(recipe) > 35)
    || Number(recipe.effortScore || 5) >= 8;
}

const rankingsByMood = new Map();
for (const mood of moods) {
  const ranked = recipes
    .map((recipe) => {
      const [suggestedBucket, reason] = bucket(recipe, mood.key);
      const moodScore = spreadMoodScore(recipe, mood.key, suggestedBucket);
      const finalScore = tieredFinalScore(recipe, mood.key, suggestedBucket, moodScore);
      return {
        recipe,
        moodScore,
        suggestedBucket,
        reason,
        tierBoost: tierBoosts[suggestedBucket] || 0,
        finalScore,
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore || b.moodScore - a.moodScore || titleOf(a.recipe).localeCompare(titleOf(b.recipe)));
  rankingsByMood.set(mood.key, ranked);
}

const detailRows = [];
const visibleTop20Rows = [];
for (const mood of moods) {
  const ranked = rankingsByMood.get(mood.key);
  ranked.forEach((item, index) => {
    detailRows.push({
      Mood: mood.label,
      Recipe: titleOf(item.recipe),
      RecipeId: recipeKey(item.recipe),
      CurrentRank: index + 1,
      CurrentPrimaryMood: item.recipe.primaryMood || '',
      CurrentSecondaryMood: item.recipe.secondaryMood || '',
      MealType: mealType(item.recipe),
      MoodScore: Math.round(item.moodScore * 10) / 10,
      TierBoost: item.tierBoost,
      FinalScore: item.finalScore,
      RankReason: `${item.suggestedBucket} tier, moodScore=${item.moodScore}, tierBoost=${item.tierBoost}`,
      SuggestedBucket: item.suggestedBucket,
      Reason: item.reason,
    });
  });
  ranked
    .filter((item) => item.suggestedBucket === 'CORE' || item.suggestedBucket === 'SUPPORT')
    .filter((item, index, list) => list.findIndex((other) => recipeFamilyKey(other.recipe) === recipeFamilyKey(item.recipe)) === index)
    .slice(0, 20)
    .forEach((item, index) => {
      visibleTop20Rows.push({
        Mood: mood.label,
        Rank: index + 1,
        Recipe: titleOf(item.recipe),
        RecipeId: recipeKey(item.recipe),
        MoodTier: item.suggestedBucket,
        MoodScore: item.moodScore,
        TierBoost: item.tierBoost,
        FinalScore: item.finalScore,
        PrimaryMood: item.recipe.primaryMood || '',
        SecondaryMood: item.recipe.secondaryMood || '',
        MealType: mealType(item.recipe),
        RankReason: `${item.suggestedBucket} tier, moodScore=${item.moodScore}, tierBoost=${item.tierBoost}`,
      });
    });
}

const summaryRows = [];
for (const mood of moods) {
  const rows = detailRows.filter((row) => row.Mood === mood.label);
  const visibleCount = Math.min(20, new Set(rows
    .filter((row) => row.SuggestedBucket === 'CORE' || row.SuggestedBucket === 'SUPPORT')
    .map((row) => normalize(row.Recipe))).size);
  for (const bucketName of ['CORE', 'SUPPORT', 'FALLBACK', 'EXCLUDE']) {
    summaryRows.push({
      Mood: mood.label,
      SuggestedBucket: bucketName,
      RecipeCount: rows.filter((row) => row.SuggestedBucket === bucketName).length,
      Top10Count: rows.filter((row) => row.SuggestedBucket === bucketName && Number(row.CurrentRank) <= 10).length,
      Top20Count: rows.filter((row) => row.SuggestedBucket === bucketName && Number(row.CurrentRank) <= 20).length,
      VisibleMoodResultsCount: visibleCount,
    });
  }
}

const reviewRows = detailRows
  .filter((row) => {
    const rank = Number(row.CurrentRank);
    return (row.SuggestedBucket === 'CORE' && rank > 10)
      || (row.SuggestedBucket === 'SUPPORT' && rank > 20)
      || (row.SuggestedBucket === 'FALLBACK' && rank <= 20)
      || (row.SuggestedBucket === 'EXCLUDE' && rank <= 20);
  })
  .map((row) => ({
    ...row,
    Flag: row.SuggestedBucket === 'CORE' && Number(row.CurrentRank) > 10
      ? 'CORE ranked outside Top 10'
      : row.SuggestedBucket === 'SUPPORT' && Number(row.CurrentRank) > 20
        ? 'SUPPORT ranked outside Top 20'
        : row.SuggestedBucket === 'FALLBACK'
          ? 'FALLBACK appears in Top 20'
          : 'EXCLUDE appears in Top 20',
  }));

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

writeCsv(detailCsvPath, [
  'Mood',
  'Recipe',
  'RecipeId',
  'CurrentRank',
  'CurrentPrimaryMood',
  'CurrentSecondaryMood',
  'MealType',
  'MoodScore',
  'TierBoost',
  'FinalScore',
  'RankReason',
  'SuggestedBucket',
  'Reason',
], detailRows);

writeCsv(summaryCsvPath, [
  'Mood',
  'SuggestedBucket',
  'RecipeCount',
  'Top10Count',
  'Top20Count',
  'VisibleMoodResultsCount',
], summaryRows);

writeCsv(reviewCsvPath, [
  'Mood',
  'Recipe',
  'RecipeId',
  'CurrentRank',
  'CurrentPrimaryMood',
  'CurrentSecondaryMood',
  'MealType',
  'MoodScore',
  'SuggestedBucket',
  'Reason',
  'Flag',
], reviewRows);

writeCsv(visibleTop20CsvPath, [
  'Mood',
  'Rank',
  'Recipe',
  'RecipeId',
  'MoodTier',
  'MoodScore',
  'TierBoost',
  'FinalScore',
  'PrimaryMood',
  'SecondaryMood',
  'MealType',
  'RankReason',
], visibleTop20Rows);

const summary = {
  checkedCoreRecipes: recipes.length,
  totalBucketRows: detailRows.length,
  reviewFlagCount: reviewRows.length,
  outputs: {
    detailCsv: detailCsvPath,
    summaryCsv: summaryCsvPath,
    reviewCsv: reviewCsvPath,
    visibleTop20Csv: visibleTop20CsvPath,
    summaryJson: summaryJsonPath,
  },
  bucketCounts: Object.fromEntries(moods.map((mood) => [
    mood.label,
    Object.fromEntries(['CORE', 'SUPPORT', 'FALLBACK', 'EXCLUDE'].map((bucketName) => [
      bucketName,
      detailRows.filter((row) => row.Mood === mood.label && row.SuggestedBucket === bucketName).length,
    ])),
  ])),
  topReviewFlags: reviewRows.slice(0, 30),
};

fs.writeFileSync(summaryJsonPath, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
