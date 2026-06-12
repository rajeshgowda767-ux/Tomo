window.renderMobileV2App = function renderMobileV2App(root) {
  if (!root) return;
  document.documentElement.classList.add('mobile-v2-active');

  const recipes = (window.COOKBUDDY_LOCAL_RECIPES || []).filter((recipe) => {
    return String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core';
  });
  const baseCollections = window.COOKBUDDY_LOCAL_COLLECTIONS?.collections || [];
  const mobileCollections = baseCollections.some((collection) => collection.key === 'gym-foods')
    ? baseCollections
    : [...baseCollections, buildGymFoodsCollection()];
  const collectionOrder = ['baby', 'lunchbox', 'drinks', 'soups', 'salads', 'gym-foods', 'desserts', 'festival'];
  const collections = collectionOrder
    .map((key) => mobileCollections.find((collection) => collection.key === key))
    .filter(Boolean)
    .map((collection) => collection.key === 'festival' ? { ...collection, title: 'Celebrations' } : collection);
  const pantryCatalog = window.COOKBUDDY_PANTRY_CATALOG || [];

  const state = {
    screen: 'discover',
    discoverView: 'moods',
    mood: '',
    meal: 'breakfast',
    collectionKey: collections[0]?.key || '',
    subcategory: '',
    activeRecipeId: '',
    dishOrigin: 'discover',
    kitchenTab: 'pantry',
    shoppingMode: false,
    journalTab: 'saved',
    journalScrollY: 0,
    discoverScrollY: 0,
    collectionScrollY: 0,
    tabScroll: { discover: 0, kitchen: 0, journal: 0 },
    searchOpen: false,
    searchQuery: '',
    toast: '',
    cookedDishes: normalizeDishRecords(readJson('tomo_mobile_v2_cooked', [])),
    activeTomoPick: null,
    tomoPickRecent: readJson('tomo_mobile_v2_recent_picks', []),
    tomoPickCursor: Number(readJson('tomo_mobile_v2_pick_cursor', 0)) || 0,
    dismissedToday: [],
    pantrySearch: '',
    pantryScrollY: 0,
    pantrySections: new Set(['Staples']),
    selectedIngredients: new Set(),
    groceries: readJson('tomo_mobile_v2_groceries', []).map((item) => {
      if (typeof item === 'string') return { name: item, complete: false, neededFor: [] };
      return { ...item, neededFor: Array.isArray(item.neededFor) ? item.neededFor : [] };
    }),
    savedDishes: normalizeDishRecords(readJson('tomo_mobile_v2_saved', []))
  };
  let toastTimer = null;
  let pendingMotion = '';

  const moods = [
    ['comfort', '😊', 'Comfort'],
    ['soul', '💗', 'Soul'],
    ['protein', '💪', 'Protein'],
    ['quick', '⚡', 'Quick'],
    ['rainy', '🌧️', 'Rainy'],
    ['spicy', '🔥', 'Spicy']
  ];

  const meals = [
    ['breakfast', 'Breakfast'],
    ['lunch', 'Lunch'],
    ['dinner', 'Dinner'],
    ['snack', 'Snacks']
  ];

  const moodTerms = {
    comfort: ['comfort', 'comfort-food', 'home-style', 'homestyle'],
    soul: ['soul', 'soul-food', 'traditional'],
    protein: ['protein', 'high-protein', 'paneer', 'egg', 'chicken', 'fish', 'dal'],
    quick: ['quick', 'quick-meal', 'low-effort', 'easy'],
    rainy: ['rainy', 'rainy-day', 'snack', 'soup', 'chai'],
    spicy: ['spicy', 'spicy-food', 'chilli', 'pepper', 'masala']
  };

  const moodCuration = {
    soulAllow: [
      'Curd Rice', 'Dal Rice', 'Rasam Rice', 'Rice Porridge', 'Soft Idli', 'Idli',
      'Khichdi', 'Pongal', 'Aloo Paratha', 'Dosa', 'Masala Dosa', 'Coconut Rice',
      'Puliyogare', 'Sambar Rice', 'Chole Chawal', 'Rajma Chawal', 'Upma', 'Poha', 'Avalakki'
    ],
    soulExclude: [
      'Gunpowder Idli', 'Kaaram Dosa', 'Spicy Masala Dosa', 'Spicy Aloo Paratha',
      'Paneer Dosa', 'Egg Dosa', 'Tomato Uttapam', 'Vegetable Uttapam', 'Onion Uttapam'
    ],
    comfortPreferred: [
      'Khichdi', 'Curd Rice', 'Pongal', 'Dal Rice', 'Rasam Rice', 'Sambar Rice',
      'Rajma Chawal', 'Chole Chawal', 'Dal Makhani', 'Palak Paneer', 'Aloo Paratha',
      'Idli', 'Dosa', 'Upma', 'Poha'
    ],
    comfortDemote: [
      'Pepper Rasam', 'Spicy Aloo Paratha', 'Andhra Chicken Curry', 'Chicken 65', 'Andhra Podi Idli'
    ],
    spicyIdentity: [
      'Andhra Chicken Curry', 'Andhra Kodi Vepudu', 'Guntur Chicken Fry', 'Chicken 65',
      'Chilli Chicken', 'Chilli Paneer', 'Pepper Rasam', 'Kaaram Dosa', 'Gunpowder Idli',
      'Mirchi Bajji', 'Kolhapuri Misal Pav', 'Mirchi Ka Salan', 'Schezwan Fried Rice'
    ],
    spicyDemote: [
      'Egg Curry', 'Chicken Chettinad', 'Chicken Majestic', 'Chicken 555', 'Dragon Chicken', 'Boiled Corn'
    ],
    rainyEligible: [
      'Pongal', 'Upma', 'Masala Dosa', 'Ragi Porridge', 'Khichdi', 'Rasam Rice',
      'Sambar Rice', 'Bisibelebath', 'Pepper Rasam', 'Onion Uttapam', 'Aloo Paratha',
      'Methi Paratha', 'Thukpa', 'Vegetable Soup', 'Mushroom Soup', 'Pakora',
      'Bread Pakora', 'Mirchi Bajji', 'Masala Chai'
    ],
    rainyRank: [
      'Pongal', 'Khichdi', 'Masala Dosa', 'Rasam Rice', 'Sambar Rice', 'Bisibelebath',
      'Thukpa', 'Aloo Paratha', 'Methi Paratha', 'Onion Uttapam', 'Upma', 'Ragi Porridge',
      'Pepper Rasam', 'Pakora', 'Bread Pakora', 'Mirchi Bajji', 'Masala Chai',
      'Vegetable Soup', 'Mushroom Soup'
    ],
    quickKeep: [
      'Masala Omelette', 'Bread Omelette', 'Uttapam', 'Onion Uttapam', 'Dosa', 'Masala Dosa'
    ],
    quickExclude: [
      'Onion Omelette', 'Tomato Omelette', 'Mushroom Omelette', 'Spanish Omelette',
      'Cheese Omelette', 'Tomato Uttapam', 'Vegetable Uttapam', 'Cheese Uttapam',
      'Cheese Dosa', 'Egg Dosa', 'Paneer Dosa', 'Wheat Dosa'
    ],
    quickHeroPreferred: [
      'Egg Toast', 'Bread Upma', 'Instant Rava Upma', 'Paneer Sandwich', 'Veg Sandwich',
      'Lemon Rice', 'Tomato Rice', 'Egg Fried Rice', 'Paneer Bhurji', 'Corn Chaat'
    ],
    quickHeroExclude: [
      'Bisibelebath', 'Andhra Egg Fry', 'Pepper Rasam'
    ],
    soulDinner: [
      'Khichdi', 'Curd Rice', 'Rasam Rice', 'Dal Rice', 'Sambar Rice',
      'Pongal', 'Aloo Paratha', 'Masala Dosa', 'Upma'
    ],
    proteinMeals: {
      lunch: [
        'Palak Paneer', 'Chicken Stew', 'Rajma Chawal', 'Egg Curry Rice',
        'Chole Chawal', 'Egg Curry', 'Dal Makhani'
      ],
      dinner: [
        'Paneer Bhurji', 'Chicken Curry', 'Kadai Paneer', 'Egg Curry',
        'Matar Paneer', 'Fish Curry', 'Dal Makhani'
      ]
    },
    spicyMeals: {
      lunch: [
        'Mirchi Ka Salan', 'Andhra Chicken Curry', 'Schezwan Fried Rice',
        'Andhra Kodi Vepudu', 'Chilli Paneer', 'Guntur Chicken Fry'
      ],
      dinner: [
        'Chilli Paneer', 'Chilli Chicken', 'Chilli Mushroom',
        'Andhra Chicken Curry', 'Mirchi Ka Salan', 'Guntur Chicken Fry'
      ]
    },
    proteinExclude: [
      'Ladoo', 'Bonda', 'Pakora', 'Bread Pakora', 'Mirchi Bajji', 'Mirapakaya Bajji'
    ]
  };

  const collectionImages = {
    baby: '/assets/images/collections/baby-food.webp',
    lunchbox: '/assets/images/collections/lunch-box-heroes.webp',
    drinks: '/assets/images/collections/healthy-drinks.webp',
    salads: '/assets/images/collections/salads.webp',
    desserts: '/assets/images/collections/desserts.webp',
    soups: '/assets/images/collections/soups.webp',
    festival: '/assets/images/collections/festival-food.webp'
  };

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function normalizeDishRecords(items) {
    return (Array.isArray(items) ? items : []).map((item) => {
      if (typeof item === 'string') {
        const recipe = recipes.find((entry) => entry.id === item);
        return { id: item, dishName: recipe?.title || item, timestamp: null, source: 'legacy' };
      }
      return {
        id: item.id || item.recipeId || '',
        dishName: item.dishName || item.title || '',
        timestamp: item.timestamp || null,
        source: item.source || 'mobile-v2',
        cookCount: Number(item.cookCount || 0)
      };
    }).filter((item) => item.id || item.dishName);
  }

  function saveMemory() {
    localStorage.setItem('tomo_mobile_v2_saved', JSON.stringify(state.savedDishes));
    localStorage.setItem('tomo_mobile_v2_cooked', JSON.stringify(state.cookedDishes));
  }

  function showToast(message) {
    state.toast = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      state.toast = '';
      render();
    }, 2200);
  }

  function saveGroceries() {
    localStorage.setItem('tomo_mobile_v2_groceries', JSON.stringify(state.groceries));
  }

  function esc(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function norm(value) {
    return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function totalTime(recipe) {
    return Number(recipe?.timeMinutes || 0) || Number(recipe?.prepTimeMinutes || 0) + Number(recipe?.cookTimeMinutes || 0);
  }

  function tags(recipe) {
    return [
      ...(recipe?.tags || []),
      recipe?.title,
      recipe?.description,
      recipe?.dietType,
      recipe?.cuisine
    ].map(norm);
  }

  function matchesMeal(recipe, meal) {
    const haystack = tags(recipe);
    return haystack.includes(meal) || (meal === 'snack' && haystack.includes('snacks'));
  }

  function moodScore(recipe, mood) {
    const haystack = tags(recipe).join(' ');
    const terms = moodTerms[mood] || [];
    let score = Number(recipe?.confidenceScore || 0) / 10;
    terms.forEach((term) => {
      if (haystack.includes(norm(term))) score += 18;
    });
    if (mood === 'comfort') score += Number(recipe?.comfortScore || 0) * 2;
    if (mood === 'quick' && totalTime(recipe) <= 25) score += 22;
    if (mood === 'protein') score += Number(recipe?.proteinScore || 0) * 2;
    if (mood === 'rainy' && /soup|pakora|bajji|chai|rasam/.test(haystack)) score += 18;
    if (mood === 'spicy' && /chilli|spicy|masala|pepper/.test(haystack)) score += 18;
    if (isSaved(recipe.id)) score += 8;
    return score;
  }

  function mealRecipes(meal = state.meal, limit = 2, options = {}) {
    const dismissed = options.excludeDismissed ? new Set(state.dismissedToday) : new Set();
    if (state.mood === 'rainy') return rainyMealRecipes(meal, limit, dismissed);
    if (state.mood === 'soul' && meal === 'dinner') {
      return curatedMealRecipes(moodCuration.soulDinner, limit, dismissed);
    }
    if (state.mood === 'protein' && moodCuration.proteinMeals[meal]) {
      return curatedMealRecipes(moodCuration.proteinMeals[meal], limit, dismissed);
    }
    if (state.mood === 'spicy' && moodCuration.spicyMeals[meal]) {
      return curatedMealRecipes(moodCuration.spicyMeals[meal], limit, dismissed);
    }
    const pool = moodEligibleRecipes(state.mood);
    return pool
      .filter((recipe) => matchesMeal(recipe, meal) && !dismissed.has(recipe.id))
      .sort((a, b) => moodRecipeCompare(a, b, state.mood))
      .filter(uniqueByTitle())
      .slice(0, limit);
  }

  function curatedMealRecipes(titles, limit, dismissed) {
    return titles
      .map((title) => findRecipe(title))
      .filter((recipe) => recipe && !dismissed.has(recipe.id))
      .filter(uniqueByTitle())
      .slice(0, limit);
  }

  function rainyMealRecipes(meal, limit, dismissed) {
    const curated = {
      breakfast: ['Pongal', 'Upma', 'Masala Dosa', 'Ragi Porridge'],
      lunch: ['Khichdi', 'Rasam Rice', 'Sambar Rice', 'Bisibelebath', 'Pepper Rasam'],
      dinner: ['Masala Dosa', 'Onion Uttapam', 'Aloo Paratha', 'Methi Paratha', 'Thukpa', 'Vegetable Soup', 'Mushroom Soup'],
      snack: ['Pakora', 'Bread Pakora', 'Mirchi Bajji', 'Masala Chai']
    }[meal] || [];
    return curated
      .map((title) => findRecipe(title))
      .filter((recipe) => recipe && !dismissed.has(recipe.id))
      .filter(uniqueByTitle())
      .slice(0, limit);
  }

  function moodEligibleRecipes(mood) {
    if (mood === 'soul') return curatedTitleRecipes(moodCuration.soulAllow, moodCuration.soulExclude);
    if (mood === 'comfort') {
      const preferred = curatedTitleRecipes(moodCuration.comfortPreferred, []);
      const extras = recipes.filter((recipe) => {
        const title = recipe.title || '';
        if (titleInList(title, moodCuration.comfortDemote)) return false;
        const haystack = tags(recipe).join(' ');
        return /comfort|home style|home-style|homestyle|soft|familiar|dal|rice|khichdi|pongal|idli|dosa|upma|poha|paneer/.test(haystack);
      }).sort((a, b) => moodRecipeCompare(a, b, 'comfort'));
      return mergeRecipeLists(preferred, extras);
    }
    if (mood === 'spicy') {
      const identity = curatedTitleRecipes(moodCuration.spicyIdentity, moodCuration.spicyDemote);
      const extras = recipes.filter((recipe) => {
        if (titleInList(recipe.title, moodCuration.spicyDemote)) return false;
        const title = norm(recipe.title);
        return /(chilli|mirchi|guntur|schezwan|kolhapuri|kaaram|gunpowder)/.test(title);
      }).sort((a, b) => moodRecipeCompare(a, b, 'spicy'));
      return mergeRecipeLists(identity, extras);
    }
    if (mood === 'protein') {
      return recipes
        .filter((recipe) => !isProteinExcluded(recipe.title))
        .filter(isProteinForward)
        .sort((a, b) => moodRecipeCompare(a, b, 'protein'))
        .filter(uniqueByTitle());
    }
    if (mood === 'rainy') return curatedTitleRecipes(moodCuration.rainyEligible, []);
    if (mood === 'quick') {
      return recipes
        .filter(isQuickEligible)
        .sort((a, b) => moodRecipeCompare(a, b, 'quick'))
        .filter(uniqueByTitle());
    }
    return [...recipes];
  }

  function moodRecipeCompare(a, b, mood) {
    const rankA = curatedMoodRank(a, mood);
    const rankB = curatedMoodRank(b, mood);
    if (rankA !== rankB) return rankA - rankB;
    return moodScore(b, mood) - moodScore(a, mood);
  }

  function curatedMoodRank(recipe, mood) {
    const lists = {
      soul: moodCuration.soulAllow,
      comfort: moodCuration.comfortPreferred,
      spicy: moodCuration.spicyIdentity,
      rainy: moodCuration.rainyRank
    };
    const index = (lists[mood] || []).findIndex((title) => norm(title) === norm(recipe?.title));
    return index >= 0 ? index : 999;
  }

  function curatedTitleRecipes(titles, exclusions = []) {
    return titles
      .map((title) => findRecipe(title))
      .filter((recipe) => recipe && !titleInList(recipe.title, exclusions))
      .filter(uniqueByTitle());
  }

  function mergeRecipeLists(...lists) {
    return lists.flat().filter(Boolean).filter(uniqueByTitle());
  }

  function titleInList(title, list) {
    const key = norm(title);
    return list.some((item) => norm(item) === key);
  }

  function isProteinExcluded(title) {
    return titleInList(title, moodCuration.proteinExclude) || /ladoo|bonda|pakora|bajji|sweet|kheer|payasam|dosa|idli|poha|avalakki|upma|lemon rice|puliyogare|plain chapati|tomato rice|coconut rice/.test(norm(title));
  }

  function isProteinForward(recipe) {
    const title = norm(recipe?.title);
    const identity = [
      recipe?.title,
      recipe?.primaryIngredient1,
      recipe?.primaryIngredient2,
      recipe?.primary_ingredient_1,
      recipe?.primary_ingredient_2,
      recipe?.baseIngredient,
      recipe?.base_ingredient
    ].map(norm).join(' ');
    if (/egg|chicken|paneer|fish|mutton|prawn|pork|keema|minced meat/.test(identity)) return true;
    if (/rajma|chana|chole|dal makhani|besan chilla|sundal|peanut sundal/.test(title)) return true;
    if (/\\b(dal|rajma|chana|chole|peanut)\\b/.test(identity) && !/rice|dosa|idli|poha|upma|chapati/.test(title)) return true;
    return false;
  }

  function isQuickEligible(recipe) {
    const title = recipe?.title || '';
    const normalized = norm(title);
    if (titleInList(title, moodCuration.quickExclude)) return false;
    if (/omelette|uttapam|dosa/.test(normalized)) return titleInList(title, moodCuration.quickKeep);
    const haystack = tags(recipe).join(' ');
    return haystack.includes('quick') || haystack.includes('quick meal') || haystack.includes('low effort') || totalTime(recipe) <= 25;
  }

  function tomoPick() {
    if (state.mood) return mealRecipes(state.meal, 8)[0] || recipes[0];
    if (state.activeTomoPick) return state.activeTomoPick.recipe;
    const pick = defaultTomoPick();
    state.activeTomoPick = pick;
    return pick.recipe || recipes[0];
  }

  function defaultTomoPick() {
    const meal = defaultTomoMeal();
    const recent = Array.isArray(state.tomoPickRecent) ? state.tomoPickRecent : [];
    const recentIds = new Set(recent.map((item) => item.id).filter(Boolean));
    const recentFamilies = new Set(recent.slice(0, 5).map((item) => item.family).filter(Boolean));
    const moodOrder = defaultMoodRotation();
    let fallback = null;
    for (const mood of moodOrder) {
      const candidates = defaultMoodCandidates(mood, meal).filter((recipe) => !recentIds.has(recipe.id));
      if (!fallback && candidates[0]) fallback = { recipe: candidates[0], mood, meal };
      const diverse = candidates.find((recipe) => !recentFamilies.has(dishFamily(recipe)));
      if (diverse) return rememberTomoPick(diverse, mood, meal);
    }
    if (fallback) return rememberTomoPick(fallback.recipe, fallback.mood, fallback.meal);
    return rememberTomoPick(recipes[0], 'comfort', meal);
  }

  function defaultMoodRotation() {
    const supported = defaultMoodMix().filter((mood) => mood !== 'rainy' || rainyPickSupported());
    const start = state.tomoPickCursor % supported.length;
    return [...supported.slice(start), ...supported.slice(0, start)];
  }

  function defaultMoodMix() {
    return [
      'comfort', 'comfort', 'comfort', 'comfort', 'comfort',
      'quick', 'quick', 'quick', 'quick',
      'protein', 'protein', 'protein', 'protein',
      'soul', 'soul', 'soul',
      'rainy', 'rainy',
      'spicy', 'spicy'
    ];
  }

  function rainyPickSupported() {
    const hour = new Date().getHours();
    return hour < 8 || hour >= 16;
  }

  function defaultTomoMeal() {
    const hour = new Date().getHours();
    const slot = state.tomoPickCursor % 20;
    if (hour >= 5 && hour < 11) {
      return slot < 16 ? 'breakfast' : 'snack';
    }
    if (hour >= 11 && hour < 16) {
      if (slot < 5 || (slot >= 9 && slot < 14) || slot >= 16) return 'lunch';
      if (slot < 9) return 'breakfast';
      return 'snack';
    }
    if (hour >= 16 || hour < 5) {
      if (slot < 5 || (slot >= 9 && slot < 14) || slot >= 16) return 'dinner';
      if (slot < 9) return 'breakfast';
      return 'snack';
    }
    return 'lunch';
  }

  function defaultMoodCandidates(mood, meal) {
    const pool = mood === 'rainy'
      ? rainyMealRecipes(meal, 20, new Set())
      : mood === 'quick'
        ? curatedTitleRecipes(moodCuration.quickHeroPreferred, moodCuration.quickHeroExclude)
        : moodEligibleRecipes(mood);
    return pool
      .filter((recipe) => matchesMeal(recipe, meal))
      .sort((a, b) => moodRecipeCompare(a, b, mood))
      .filter(uniqueByTitle());
  }

  function rememberTomoPick(recipe, mood, meal) {
    const item = {
      id: recipe?.id || '',
      title: recipe?.title || '',
      mood,
      meal,
      family: dishFamily(recipe),
      timestamp: new Date().toISOString()
    };
    state.tomoPickRecent = [item, ...(state.tomoPickRecent || []).filter((entry) => entry.id !== item.id)].slice(0, 30);
    state.tomoPickCursor += 1;
    localStorage.setItem('tomo_mobile_v2_recent_picks', JSON.stringify(state.tomoPickRecent));
    localStorage.setItem('tomo_mobile_v2_pick_cursor', JSON.stringify(state.tomoPickCursor));
    return { recipe, mood, meal };
  }

  function dishFamily(recipe) {
    const title = norm(recipe?.title);
    if (/paratha/.test(title)) return 'paratha';
    if (/pongal/.test(title)) return 'pongal';
    if (/dosa/.test(title)) return 'dosa';
    if (/omelette/.test(title)) return 'omelette';
    if (/uttapam/.test(title)) return 'uttapam';
    if (/rice/.test(title)) return 'rice';
    if (/curry/.test(title)) return 'curry';
    if (/paneer/.test(title)) return 'paneer';
    if (/chicken/.test(title)) return 'chicken';
    if (/fish/.test(title)) return 'fish';
    if (/soup/.test(title)) return 'soup';
    return title.split(' ')[0] || 'dish';
  }

  function uniqueByTitle() {
    const seen = new Set();
    return (recipe) => {
      const key = norm(recipe.title).replace(/\b(spicy|soft|special|homestyle|home style)\b/g, '').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    };
  }

  function recipeImage(recipe) {
    const title = norm(recipe?.title);
    const exact = {
      'aloo paratha': 'dishes/aloo-paratha-homestyle',
      dosa: 'dishes/dosa-homestyle',
      idli: 'dishes/idli-homestyle',
      poha: 'dishes/poha-homestyle',
      upma: 'dishes/upma',
      pongal: 'dishes/pongal',
      'curd rice': 'dishes/curd-rice-homestyle',
      khichdi: 'dishes/rice-moong-khichdi-homestyle',
      'rice moong khichdi': 'dishes/rice-moong-khichdi-homestyle',
      'rasam rice': 'dishes/rasam-rice',
      'sambar rice': 'dishes/sambar-rice',
      'lemon rice': 'dishes/lemon-rice',
      'chicken curry': 'dishes/chicken-curry-rice',
      'fish curry': 'dishes/fish-curry-rice',
      'paneer curry': 'dishes/paneer-curry',
      'egg curry': 'dishes/egg-curry'
    };
    if (exact[title]) return `/assets/images/${exact[title]}.png`;
    if (recipe?.imageUrl?.startsWith('/assets/')) return recipe.imageUrl;
    if (title.includes('chai')) return '/assets/images/drinks/masala-chai.png';
    if (title.includes('soup')) return '/assets/images/dishes/soup-bowls.png';
    if (title.includes('salad')) return '/assets/images/salads/salad-default.png';
    if (title.includes('dessert') || title.includes('kheer') || title.includes('payasam')) return '/assets/images/desserts/dessert-default.png';
    if (matchesMeal(recipe, 'snack')) return '/assets/images/snacks/snacks-default.png';
    return '/assets/images/dishes/homestyle-kitchen-placeholder.png';
  }

  function collectionImage(collection) {
    return collection?.imagePath || collectionImages[collection?.key] || '/assets/images/dishes/home-bowl.png';
  }

  function buildGymFoodsCollection() {
    const groups = [
      ['High Protein Breakfast', [
        ['Egg Toast', 'Quick eggs with filling toast.'],
        ['Bread Omelette', 'Egg and bread for a strong start.'],
        ['Masala Omelette', 'Spiced eggs with morning energy.'],
        ['Besan Chilla', 'Gram flour breakfast with protein.'],
        ['Paneer Sandwich', 'Portable paneer protein bite.'],
        ['Paneer Paratha', 'Paneer stuffed into hearty flatbread.'],
      ]],
      ['Post Workout Meals', [
        ['Chicken Curry', 'Protein-rich curry for recovery.'],
        ['Chicken Stew', 'Gentle chicken for lighter recovery.'],
        ['Egg Curry Rice', 'Egg curry with steady carbs.'],
        ['Fish Curry Rice', 'Fish and rice after training.'],
        ['Kadai Paneer', 'Paneer curry with complete meal energy.']
      ]],
      ['Vegetarian Protein', [
        ['Paneer Bhurji', 'Scrambled paneer for quick protein.'],
        ['Palak Paneer', 'Spinach and paneer strength bowl.'],
        ['Rajma Chawal', 'Rajma and rice for plant recovery.'],
        ['Chole Chawal', 'Chickpea rice for steady energy.'],
        ['Dal Makhani', 'Slow dal comfort with protein.']
      ]],
      ['Protein Snacks', [
        ['Peanut Sundal', 'Peanuts for a protein nibble.'],
        ['Sundal', 'Legume snack for active days.'],
        ['Paneer Tikka', 'Paneer bites for snack protein.'],
        ['Chicken Roll', 'Chicken wrap for quick fuel.'],
        ['Chilli Paneer', 'Paneer snack with bold flavor.']
      ]]
    ];
    return {
      key: 'gym-foods',
      title: 'Gym Foods',
      subtitle: 'Protein-rich meals and snacks',
      copy: 'Protein-rich meals and snacks to support training, recovery, and active lifestyles.',
      tone: 'gym-tone',
      icon: '💪',
      imagePath: '/assets/images/collections/gym-foods-protein-balanced-v1.png',
      items: groups.flatMap(([subcategory, titles], groupIndex) => titles.map(([title, description], index) => gymCollectionItem(title, description, subcategory, groupIndex, index)))
    };
  }

  function gymCollectionItem(title, description, subcategory, groupIndex, index) {
    const recipe = findRecipe(title);
    return {
      id: recipe?.id || norm(title).replace(/\s+/g, '-'),
      title,
      description,
      subCategory: subcategory,
      subcategory,
      region: proteinAttribute(title),
      time: totalTime(recipe),
      tags: ['gym-foods', 'high-protein', 'training', 'recovery'],
      featured_priority: 100 - groupIndex * 10 - index,
      discovery_score: 100 - groupIndex * 10 - index,
      collection_order: groupIndex + 1,
      display_order: index + 1,
      imagePath: recipe ? recipeImage(recipe) : '/assets/images/dishes/home-bowl.png',
      recipe_type: 'collection',
      recipeType: 'collection',
      primary_ingredient_1: recipe?.primaryIngredient1 || recipe?.primary_ingredient_1 || null,
      primary_ingredient_2: recipe?.primaryIngredient2 || recipe?.primary_ingredient_2 || null,
      primaryIngredient1: recipe?.primaryIngredient1 || recipe?.primary_ingredient_1 || null,
      primaryIngredient2: recipe?.primaryIngredient2 || recipe?.primary_ingredient_2 || null
    };
  }

  function proteinAttribute(title) {
    const key = norm(title);
    if (/chicken/.test(key)) return 'Chicken Protein';
    if (/egg|omelette|toast/.test(key)) return 'Egg Protein';
    if (/paneer/.test(key)) return 'Paneer Protein';
    if (/fish/.test(key)) return 'Fish Protein';
    if (/rajma|chole|dal|sundal|peanut|besan/.test(key)) return 'Plant Protein';
    return 'High Protein';
  }

  function collectionDetail(collection) {
    const celebrationOrder = ['Festive Sweets', 'Regional Feasts', 'Traditional Favorites', 'Seasonal Celebrations'];
    const isCelebration = collection?.key === 'festival';
    const items = [...(collection?.items || [])].sort((a, b) => {
      return Number(b.featured_priority || 0) - Number(a.featured_priority || 0)
        || Number(b.discovery_score || 0) - Number(a.discovery_score || 0);
    });
    const groups = new Map(isCelebration ? celebrationOrder.map((name) => [name, []]) : []);
    const seenCelebrationDishes = new Set();
    items.forEach((item) => {
      if (isCelebration) {
        const key = item.id || norm(item.title);
        if (seenCelebrationDishes.has(key)) return;
        seenCelebrationDishes.add(key);
      }
      const name = isCelebration ? celebrationSubcategory(item) : item.subcategory || item.subCategory || 'Curated Picks';
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(item);
    });
    return [...groups.entries()].filter(([, list]) => list.length).map(([name, list]) => ({ name, recipes: list }));
  }

  function celebrationSubcategory(item) {
    const source = norm(`${item.subcategory || item.subCategory || ''} ${item.title || ''}`);
    if (/diwali|ganesh|modak|kadubu|kozhukattai|ladoo|kaju katli|mysore pak|payasam|seviyan|sheer khurma/.test(source)) {
      return 'Festive Sweets';
    }
    if (/onam|eid|biryani|haleem|korma|avial|olan|thoran|parippu/.test(source)) {
      return 'Regional Feasts';
    }
    if (/ugadi|holige|obbattu|pachadi|mango rice|kosambari/.test(source)) {
      return 'Traditional Favorites';
    }
    return 'Seasonal Celebrations';
  }

  function weatherContext() {
    const now = new Date();
    const hour = now.getHours();
    const rainy = state.mood === 'rainy';
    const condition = rainy ? 'Light Rain 🌧️' : hour >= 18 || hour < 6 ? 'Soft Evening 🌙' : 'Warm Daylight ☀️';
    const hint = rainy ? 'Perfect weather for comfort food.' : state.mood === 'quick' ? 'Keep it easy and kind.' : 'A good day for something comforting.';
    return {
      time: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      datetime: now.toISOString(),
      weather: `24°C • ${condition}`,
      hint
    };
  }

  function banter(recipe) {
    const lines = {
      comfort: 'Comfort is calling today.',
      soul: 'Food that feels like home today.',
      protein: 'Something filling sounds right.',
      quick: "Let's keep it easy today.",
      rainy: 'Rainy weather needs something warm.',
      spicy: 'Something spicy might hit the spot.'
    };
    return recipe ? lines[state.mood] || 'Tomo has a pick waiting.' : 'Recipes are loading.';
  }

  function render() {
    const motionClass = pendingMotion ? ` mv2-motion-${pendingMotion}` : '';
    pendingMotion = '';
    root.innerHTML = `
      <div class="mv2-app${motionClass}">
      <header class="mv2-header ${state.screen === 'discover' ? 'mv2-discover-header' : ''}">
        <div class="mv2-brand"><span class="mv2-logo"><img src="tomo.png" alt="" /></span><div><h1>${state.screen === 'kitchen' ? '🍅 Kitchen' : state.screen === 'journal' ? '📖 Journal' : 'Tomo'}</h1><p>${state.screen === 'kitchen' ? 'Pantry to plate, all in one place' : state.screen === 'journal' ? 'Your cooking journey, saved in one place.' : 'Food for Every Mood'}</p></div></div>
        <div class="mv2-header-actions">${headerWeather()}</div>
      </header>
      ${state.screen === 'kitchen' ? '' : globalSearchBar(state.screen === 'discover')}
      <main>
        <section class="mv2-screen ${state.screen === 'discover' ? 'active' : ''}">${discoverView()}</section>
        <section class="mv2-screen ${state.screen === 'kitchen' ? 'active' : ''}">${kitchenView()}</section>
        <section class="mv2-screen ${state.screen === 'journal' ? 'active' : ''}">${journalView()}</section>
        <section class="mv2-screen ${state.screen === 'collection' ? 'active' : ''}">${collectionDetailView()}</section>
        <section class="mv2-screen ${state.screen === 'dish' ? 'active' : ''}">${dishDetailView()}</section>
      </main>
      <nav class="mv2-bottom-nav" aria-label="Primary">
        ${['discover', 'kitchen', 'journal'].map((screen) => `<button class="${state.screen === screen || (state.screen === 'collection' && screen === 'discover') || (state.screen === 'dish' && state.dishOrigin === 'pantry' && screen === 'kitchen') || (state.screen === 'dish' && state.dishOrigin === 'journal' && screen === 'journal') ? 'active' : ''}" type="button" data-nav="${screen}">${screen === 'discover' ? '⌂' : screen === 'kitchen' ? '▣' : '♡'}<span>${screen[0].toUpperCase()}${screen.slice(1)}</span></button>`).join('')}
      </nav>
      ${state.toast ? `<div class="mv2-toast" role="status" aria-live="polite">${esc(state.toast)}</div>` : ''}
      ${state.searchOpen ? searchModal() : ''}
      </div>
    `;
  }

  function renderWithMotion(motion) {
    pendingMotion = motion;
    render();
  }

  function primaryScreen() {
    if (state.screen === 'collection') return 'discover';
    if (state.screen === 'dish') {
      if (state.dishOrigin === 'pantry') return 'kitchen';
      if (state.dishOrigin === 'journal') return 'journal';
      return 'discover';
    }
    return state.screen;
  }

  function discoverView() {
    return `
      <div class="mv2-segmented" role="tablist" aria-label="Discover mode">
        <button class="${state.discoverView === 'moods' ? 'active' : ''}" type="button" data-discover="moods">Moods</button>
        <button class="${state.discoverView === 'collections' ? 'active' : ''}" type="button" data-discover="collections">Collections</button>
      </div>
      <section class="mv2-discover-view ${state.discoverView === 'moods' ? 'active' : ''}">${moodsView()}</section>
      <section class="mv2-discover-view ${state.discoverView === 'collections' ? 'active' : ''}">${collectionsView()}</section>
    `;
  }

  function moodsView() {
    const pick = tomoPick();
    const pickContext = state.activeTomoPick;
    const picks = mealRecipes(state.meal, 2, { excludeDismissed: true });
    return `
      <article class="mv2-pick mv2-hero-pick">
        <div class="mv2-pick-image">${imageTag(recipeImage(pick))}<span class="mv2-badge">Tomo Pick</span></div>
        <div class="mv2-pick-body">
          <p class="mv2-pick-kicker">Tomo suggests today</p>
          <h2>${esc(pick?.title || 'Tomo is finding a pick')}</h2>
          <div class="mv2-meta"><span>${totalTime(pick)} min</span><span>${mealLabel(pickContext?.meal || state.meal)}</span><span>${esc(selectedMoodLabel(pickContext?.mood))}</span></div>
          ${dishActionButtons(pick?.id || '', pick?.title || '', 'tomo-pick', 'mv2-hero-actions')}
        </div>
      </article>
      <div class="mv2-mood-heading">
        <h2>Choose Your Mood</h2>
        <p>Pick how you're feeling and Tomo will adapt.</p>
      </div>
      <div class="mv2-moods">${moods.map(([key, icon, label]) => `<button class="mv2-mood ${state.mood === key ? 'active' : ''}" type="button" data-mood="${key}"><span>${icon}</span><span>${label}</span></button>`).join('')}</div>
      <section><div class="mv2-section-title"><div><p>Today's Picks</p><h2>${mealLabel(state.meal)}</h2></div><span>${picks.length} ${picks.length === 1 ? 'dish' : 'dishes'}</span></div><div class="mv2-meal-tabs">${meals.map(([key, label]) => `<button class="${state.meal === key ? 'active' : ''}" type="button" data-meal="${key}">${label}</button>`).join('')}</div><div class="mv2-dish-list">${picks.map(recipeCard).join('') || '<p class="mv2-empty">No dishes found for this meal yet.</p>'}</div></section>
    `;
  }

  function headerWeather() {
    const context = weatherContext();
    const [temperature, ...parts] = String(context.weather || '').split('•').map((part) => part.trim());
    const phrase = parts.join(' • ');
    const statement = phrase.replace(/\s*(?:☀️|🌙|🌧️|⛅)\s*/gu, '').trim() || 'Warm daylight';
    return `<div class="mv2-header-weather"><time datetime="${esc(context.datetime)}">${esc(context.time)}</time><strong>${esc(temperature || '24°C')}</strong><span>${esc(`${statement} ${weatherIcon(phrase)}`.trim())}</span></div>`;
  }

  function weatherIcon(phrase) {
    return String(phrase || '').match(/(?:☀️|🌙|🌧️|⛅)/u)?.[0] || '';
  }

  function globalSearchBar(isDiscover = false) {
    return `<form class="mv2-global-search ${isDiscover ? 'mv2-discover-search' : ''}" data-search-form><span>🔎</span><input id="mv2GlobalSearch" name="search" type="search" placeholder="Search dishes, moods, ingredients..." value="${esc(state.searchQuery)}" autocomplete="off" /></form>`;
  }

  function searchModal() {
    return `<div class="mv2-modal-backdrop" data-search-backdrop><section class="mv2-search-modal mv2-search-results-modal" role="dialog" aria-modal="true" aria-labelledby="mv2SearchTitle"><button class="mv2-modal-close" type="button" data-close-search aria-label="Close search">×</button><span>🔎</span><h2 id="mv2SearchTitle">Search Tomo</h2><p>${state.searchQuery ? `Results for “${esc(state.searchQuery)}”` : 'Search dishes, collections, ingredients and moods.'}</p>${searchResultsView()}</section></div>`;
  }

  function searchResultsView() {
    const query = norm(state.searchQuery);
    if (!query) return '<div class="mv2-search-hint">Try “rice”, “comfort”, “baby” or “paneer”.</div>';
    const dishResults = recipes
      .filter((recipe) => [recipe.title, recipe.description, ...(recipe.tags || [])].some((value) => norm(value).includes(query)))
      .slice(0, 4);
    const collectionResults = collections
      .filter((collection) => [collection.title, collection.copy, collection.subtitle, collection.key].some((value) => norm(value).includes(query)))
      .slice(0, 3);
    const ingredientResults = pantryCatalog
      .filter((item) => item.display_status !== 'hidden')
      .map((item) => item.ingredient_name || item.name)
      .filter((name, index, list) => name && norm(name).includes(query) && list.findIndex((item) => norm(item) === norm(name)) === index)
      .slice(0, 5);
    const moodResults = moods
      .filter(([key, , label]) => norm(key).includes(query) || norm(label).includes(query))
      .slice(0, 6);
    const sections = [
      searchSection('Dishes', dishResults.map((recipe) => `<button type="button" data-search-recipe="${esc(recipe.id)}"><strong>${esc(recipe.title)}</strong><small>${totalTime(recipe)} min • ${esc(mealForRecipe(recipe))}</small></button>`)),
      searchSection('Collections', collectionResults.map((collection) => `<button type="button" data-search-collection="${esc(collection.key)}"><strong>${esc(collection.title)}</strong><small>${esc(collection.copy || collection.subtitle || 'Tomo collection')}</small></button>`)),
      searchSection('Ingredients', ingredientResults.map((name) => `<button type="button" data-search-ingredient="${esc(name)}"><strong>${esc(name)}</strong><small>Open in Kitchen</small></button>`)),
      searchSection('Moods', moodResults.map(([key, icon, label]) => `<button type="button" data-search-mood="${esc(key)}"><strong>${icon} ${esc(label)}</strong><small>Show matching picks</small></button>`))
    ].filter(Boolean).join('');
    return sections || '<div class="mv2-search-hint">No matches yet. Try another word.</div>';
  }

  function searchSection(title, rows) {
    if (!rows.length) return '';
    return `<div class="mv2-search-section"><p>${esc(title)}</p>${rows.join('')}</div>`;
  }

  function collectionsView() {
    return `<div class="mv2-section-title"><div><p>Tomo Collections</p><h2>Curated for every kitchen</h2></div></div><div class="mv2-collections">${collections.map((collection) => `<button class="mv2-collection" type="button" data-collection="${esc(collection.key)}"><span class="mv2-collection-image" style="--collection-image: url('${esc(collectionImage(collection))}')"></span><span class="mv2-collection-copy"><strong>${esc(collection.title)}</strong><span>${esc(collection.copy || collection.subtitle || 'Tomo collection')}</span><b>Explore →</b></span></button>`).join('')}</div>`;
  }

  function kitchenView() {
    return `
      <div class="mv2-segmented" role="tablist" aria-label="Kitchen mode">
        <button class="${state.kitchenTab === 'pantry' ? 'active' : ''}" type="button" data-kitchen-tab="pantry">Pantry</button>
        <button class="${state.kitchenTab === 'groceries' ? 'active' : ''}" type="button" data-kitchen-tab="groceries">Shopping Cart</button>
      </div>
      ${state.kitchenTab === 'pantry' ? pantryView() : groceriesView()}
    `;
  }

  function pantryView() {
    const sections = pantryIngredientSections();
    return `
      <div class="mv2-pantry-search">
        <input id="mv2PantrySearch" type="search" aria-label="Search ingredients" placeholder="Search ingredients..." value="${esc(state.pantrySearch)}" autocomplete="off" />
        <span class="mv2-pantry-search-actions">
          <button type="button" data-pantry-action="voice" aria-label="Search ingredients by voice">🎤</button>
          <button type="button" data-pantry-action="scan" aria-label="Scan ingredients">📷</button>
        </span>
      </div>
      ${pantrySuggestionPanel()}
      ${groceryMiniSummary()}
      <section class="mv2-pantry-ingredients">
        <div class="mv2-section-title"><div><p>Your ingredients</p><h2>Tap what you have</h2></div><span>${state.selectedIngredients.size} selected</span></div>
        <div class="mv2-pantry-sections">${sections.map((section) => pantrySection(section)).join('') || '<p class="mv2-empty">No ingredients found.</p>'}</div>
      </section>
    `;
  }

  function groceryMiniSummary() {
    if (!state.groceries.length) return '';
    const preview = state.groceries.slice(0, 3);
    return `
      <button class="mv2-grocery-mini" type="button" data-kitchen-tab="groceries">
        <span><strong>🛒 Cart (${state.groceries.length})</strong><i>${esc(preview.map((item) => item.name).join(', '))}</i></span>
        <b>View Cart →</b>
      </button>
    `;
  }

  function groceriesView() {
    const suggestions = grocerySuggestions();
    const left = state.groceries.filter((item) => !item.complete).length;
    const completed = state.groceries.some((item) => item.complete);
    const itemCount = state.groceries.length;
    const dishNames = cartDishNames();
    return `
      <section class="mv2-grocery-section">
        <div class="mv2-cart-heading">
          <div><h2>🛒 Shopping Cart</h2>${itemCount ? `<strong>${itemCount} ${itemCount === 1 ? 'item' : 'items'} added</strong>` : ''}</div>
          <p>${itemCount ? state.shoppingMode ? `${left} ${left === 1 ? 'item' : 'items'} left to shop.` : 'Review what Tomo added before you shop.' : 'No items yet.'}</p>
          ${itemCount ? '' : '<span>Add missing ingredients from Pantry to build your shopping list.</span>'}
        </div>
        <form class="mv2-grocery-form" data-grocery-form>
          <input name="groceryItem" type="text" placeholder="Add an item..." autocomplete="off" required />
          <button type="submit">Add</button>
        </form>
        ${state.groceries.length ? `<div class="mv2-grocery-tools">${state.shoppingMode && completed ? '<button type="button" data-clear-completed>Clear Completed</button>' : ''}<button type="button" data-clear-groceries>Clear Cart</button></div>` : ''}
        <div class="mv2-grocery-list">
          ${state.groceries.map((item) => `<div class="mv2-grocery-item ${state.shoppingMode && item.complete ? 'complete' : ''}">${state.shoppingMode ? `<label><input type="checkbox" data-grocery-check="${esc(item.name)}" ${item.complete ? 'checked' : ''} /><span><strong>${esc(item.name)}</strong>${item.neededFor.length ? `<small>For: ${esc(item.neededFor.join(', '))}</small>` : ''}</span></label>` : `<div class="mv2-grocery-item-copy"><strong>${esc(item.name)}</strong>${item.neededFor.length ? `<small>For: ${esc(item.neededFor.join(', '))}</small>` : ''}</div>`}<button type="button" data-grocery-remove="${esc(item.name)}" aria-label="Remove ${esc(item.name)}">×</button></div>`).join('') || '<p class="mv2-empty">Your cart is empty.</p>'}
        </div>
        ${state.groceries.length && !state.shoppingMode ? '<button class="mv2-start-shopping" type="button" data-start-shopping>Start Shopping</button>' : ''}
        ${itemCount ? readyToShopView(itemCount, dishNames) : ''}
      </section>
      <section class="mv2-grocery-suggestions">
        <div class="mv2-section-title"><div><p>From your Pantry</p><h2>Tomo Suggestions</h2></div></div>
        ${suggestions.map((item) => `<article class="mv2-grocery-suggestion"><div class="mv2-grocery-suggestion-copy"><strong>Add ${esc(item.ingredient)}</strong><span>Unlocks:</span><ul>${item.recipes.map((recipe) => `<li>${esc(recipe.title)}</li>`).join('')}</ul></div><button type="button" data-add-grocery="${esc(item.ingredient)}" data-needed-recipe="${esc(item.recipes[0]?.id || '')}">Add to Cart</button></article>`).join('') || '<p class="mv2-empty">Select Pantry ingredients to see useful additions.</p>'}
      </section>
    `;
  }

  function cartDishNames() {
    return [...new Set(state.groceries.flatMap((item) => item.neededFor || []).filter(Boolean))];
  }

  function readyToShopView(itemCount, dishNames) {
    const summary = dishNames.length === 1
      ? `You need ${itemCount} ${itemCount === 1 ? 'ingredient' : 'ingredients'} for ${dishNames[0]}.`
      : dishNames.length > 1
        ? `You need ${itemCount} ${itemCount === 1 ? 'ingredient' : 'ingredients'} across ${dishNames.length} dishes.`
        : `You have ${itemCount} ${itemCount === 1 ? 'ingredient' : 'ingredients'} ready to shop.`;
    return `
      <section class="mv2-ready-shop">
        <div class="mv2-ready-shop-heading"><span>🛒</span><div><h3>Ready To Shop?</h3><p>${esc(summary)}</p></div></div>
        <div class="mv2-cart-journey">
          <strong>Cooking Journey</strong>
          <span>✓ Dish selected</span>
          <span>✓ Missing ingredients found</span>
          <span>✓ Shopping cart ready</span>
        </div>
        <div class="mv2-cart-export-actions">
          <button type="button" data-copy-shopping-list>Copy Shopping List</button>
          <button type="button" data-share-shopping-list>Share List</button>
        </div>
        <small>Take this list to your preferred grocery app or local store.</small>
      </section>
    `;
  }

  function shoppingListText() {
    return state.groceries.map((item) => item.name).join('\n');
  }

  async function copyShoppingList() {
    const text = shoppingListText();
    if (!text) return false;
    try {
      await window.navigator.clipboard.writeText(text);
      return true;
    } catch {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.top = '0';
      field.style.left = '0';
      field.style.width = '2px';
      field.style.height = '2px';
      field.style.opacity = '0.01';
      field.style.pointerEvents = 'none';
      document.body.appendChild(field);
      field.focus();
      field.select();
      field.setSelectionRange(0, field.value.length);
      const copied = typeof document.execCommand === 'function' && document.execCommand('copy');
      field.remove();
      return copied;
    }
  }

  function journalView() {
    const tabs = [
      ['saved', 'Saved'],
      ['journey', 'Journey']
    ];
    if (!tabs.some(([key]) => key === state.journalTab)) state.journalTab = 'saved';
    return `
      <div class="mv2-segmented" role="tablist" aria-label="Journal mode">
        ${tabs.map(([key, label]) => `<button class="${state.journalTab === key ? 'active' : ''}" type="button" data-journal-tab="${key}">${label}</button>`).join('')}
      </div>
      ${journalTabContent()}
    `;
  }

  function journalTabContent() {
    if (state.journalTab === 'journey') return journeyView();
    const config = {
      records: state.savedDishes,
      icon: '🍅',
      title: 'No saved dishes yet',
      copy: 'Save dishes you want to revisit.',
      label: (item) => sourceLabel(item.source || 'Saved')
    };
    const items = journalItems(config.records);
    return items.length
      ? `<div class="mv2-journal-list">${items.map((item) => journalCard(item, config.label(item.record))).join('')}</div>`
      : journalEmptyState(config.icon, config.title, config.copy);
  }

  function journeyView() {
    const items = journalItems(state.cookedDishes)
      .sort((a, b) => new Date(b.record.timestamp || 0) - new Date(a.record.timestamp || 0));
    if (!items.length) {
      return journalEmptyState(
        '👨‍🍳',
        'Your cooking journey starts here.',
        'Cook your first dish and Tomo will begin building your kitchen story.'
      );
    }
    const summary = journeySummary(items);
    return `
      <section class="mv2-journey-section">
        <div class="mv2-section-title"><div><p>Your kitchen story</p><h2>Journey Summary</h2></div></div>
        <div class="mv2-journey-stats">
          ${journeyStat('🍳', 'Meals Cooked', summary.mealsCooked)}
          ${journeyStat('🔥', 'Current Streak', summary.streak ? `${summary.streak} ${summary.streak === 1 ? 'day' : 'days'}` : 'Coming Soon')}
          ${journeyStat('⭐', 'Most Cooked Dish', summary.mostCooked)}
          ${journeyStat('🎯', 'Favorite Mood', summary.favoriteMood)}
        </div>
      </section>
      <section class="mv2-journey-section">
        <div class="mv2-section-title"><div><p>Your latest cooks</p><h2>Recent Activity</h2></div></div>
        ${journeyActivity(items.slice(0, 3))}
      </section>
      <section class="mv2-journey-section">
        <div class="mv2-section-title"><div><p>A little pattern spotting</p><h2>Cooking Insights</h2></div></div>
        <article class="mv2-journey-insights">${journeyInsights(items).map((insight) => `<p>${esc(insight)}</p>`).join('')}</article>
      </section>
    `;
  }

  function journeyStat(icon, label, value) {
    return `<article class="mv2-journey-stat"><span>${icon}</span><small>${esc(label)}</small><strong>${esc(value)}</strong></article>`;
  }

  function journeySummary(items) {
    const moodCounts = new Map();
    items.forEach((item) => {
      const mood = item.recipe ? moodLabel(item.recipe) : 'Comfort';
      moodCounts.set(mood, (moodCounts.get(mood) || 0) + Number(item.record.cookCount || 1));
    });
    const favoriteMood = [...moodCounts].sort((a, b) => b[1] - a[1])[0]?.[0] || 'Still learning';
    const mostCookedItem = [...items].sort((a, b) => Number(b.record.cookCount || 1) - Number(a.record.cookCount || 1))[0];
    return {
      mealsCooked: items.reduce((sum, item) => sum + Number(item.record.cookCount || 1), 0),
      streak: cookingStreak(items),
      mostCooked: mostCookedItem?.recipe?.title || mostCookedItem?.record.dishName || 'Still learning',
      favoriteMood
    };
  }

  function cookingStreak(items) {
    const dates = [...new Set(items.map((item) => dateKey(item.record.timestamp)).filter(Boolean))].sort().reverse();
    if (!dates.length) return 0;
    let cursor = new Date();
    const today = dateKey(cursor);
    cursor.setDate(cursor.getDate() - 1);
    const yesterday = dateKey(cursor);
    if (dates[0] !== today && dates[0] !== yesterday) return 0;
    let streak = 0;
    cursor = new Date(`${dates[0]}T12:00:00`);
    for (const key of dates) {
      if (key !== dateKey(cursor)) break;
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function journeyActivity(items) {
    return `<div class="mv2-journey-activity">${items.map((item) => journalActivityCard(item)).join('')}</div>`;
  }

  function journalActivityCard(item) {
    const title = item.recipe?.title || item.record.dishName;
    const image = item.recipe ? recipeImage(item.recipe) : collectionDishImage({ title });
    return `<button class="mv2-activity-card" type="button" ${item.recipe ? `data-journal-recipe="${esc(item.recipe.id)}"` : ''}>${imageTag(image)}<span><strong>${esc(title)}</strong><small>${esc(sourceLabel(item.record.source || 'Cooked'))} • ${esc(relativeTime(item.record.timestamp))}</small></span></button>`;
  }

  function journeyInsights(items) {
    if (items.length < 2) return ['Your cooking story is just getting started.'];
    const moodCounts = new Map();
    let proteinCount = 0;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const breakfasts = new Set();
    items.forEach((item) => {
      if (!item.recipe) return;
      const mood = moodLabel(item.recipe);
      moodCounts.set(mood, (moodCounts.get(mood) || 0) + 1);
      if (mood === 'Protein') proteinCount += 1;
      if (new Date(item.record.timestamp || 0) >= weekAgo && matchesMeal(item.recipe, 'breakfast')) breakfasts.add(norm(item.recipe.title));
    });
    const favoriteMood = [...moodCounts].sort((a, b) => b[1] - a[1])[0]?.[0];
    const insights = [];
    if (favoriteMood) insights.push(`You enjoy ${favoriteMood} Food most.`);
    if (proteinCount) insights.push(`Protein dishes make up ${Math.round((proteinCount / items.length) * 100)}% of your cooks.`);
    if (breakfasts.size) insights.push(`You cooked ${breakfasts.size} different ${breakfasts.size === 1 ? 'breakfast' : 'breakfasts'} this week.`);
    return insights.length ? insights : ['Your cooking story is just getting started.'];
  }

  function activityDateLabel(timestamp) {
    const key = dateKey(timestamp);
    if (!key) return 'Earlier';
    const today = dateKey(new Date());
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    if (key === today) return 'Today';
    if (key === dateKey(yesterdayDate)) return 'Yesterday';
    return 'Earlier';
  }

  function dateKey(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function journalItems(records) {
    return records.map((record) => ({
      recipe: recipes.find((recipe) => recipe.id === record.id) || findRecipe(record.dishName),
      record
    })).filter((item) => item.record?.dishName || item.recipe);
  }

  function journalEmptyState(icon, title, copy) {
    return `<article class="mv2-empty-state"><span>${icon}</span><h2>${esc(title)}</h2><p>${esc(copy)}</p><button type="button" data-journal-explore>Explore dishes</button></article>`;
  }

  function journalCard(item, metadata) {
    const title = item.recipe?.title || item.record.dishName;
    const image = item.recipe ? recipeImage(item.recipe) : collectionDishImage({ title });
    return `<button class="mv2-journal-card" type="button" ${item.recipe ? `data-journal-recipe="${esc(item.recipe.id)}"` : ''}>${imageTag(image)}<span class="mv2-journal-card-copy"><strong>${esc(title)}</strong><small>${esc(metadata)}</small></span></button>`;
  }

  function sourceLabel(source) {
    const labels = {
      'tomo-pick': 'Tomo Pick',
      'todays-picks': "Today's Picks",
      collection: 'Collection',
      pantry: 'Pantry',
      discover: 'Discover',
      journal: 'Journal',
      legacy: 'Saved'
    };
    return labels[source] || source;
  }

  function collectionDetailView() {
    const collection = collections.find((item) => item.key === state.collectionKey) || collections[0];
    if (!collection) return '<p class="mv2-empty">Collections are loading.</p>';
    const groups = collectionDetail(collection);
    const selected = state.subcategory || groups[0]?.name || '';
    state.subcategory = selected;
    const active = groups.find((group) => group.name === selected) || groups[0];
    return `
      <div class="mv2-collection-detail">
        <div class="mv2-collection-nav">
          <div class="mv2-collection-context">
            <button class="mv2-collection-back" type="button" data-back="collections" aria-label="Back to Collections">←</button>
            <strong>${esc(collection.title)}</strong>
          </div>
          <div class="mv2-subcategories mv2-subcategories-grid">
            ${groups.map((group) => `<button class="mv2-subcategory ${group.name === selected ? 'active' : ''}" type="button" data-subcategory="${esc(group.name)}">${esc(group.name)}</button>`).join('')}
          </div>
        </div>
        <header class="mv2-collection-header" style="--collection-image: url('${esc(collectionImage(collection))}')">
          <p>${esc(collection.icon || '🍲')} Tomo Collection</p>
          <h2>${esc(collection.title)}</h2>
          <span>${esc(collection.copy || collection.subtitle || '')}</span>
        </header>
        <div class="mv2-collection-results">
          ${collectionResults(active)}
        </div>
      </div>
    `;
  }

  function collectionResults(group) {
    return `<div class="mv2-collection-dish-grid">${(group?.recipes || []).map(collectionCard).join('') || '<p class="mv2-empty">No dishes here yet.</p>'}</div>`;
  }

  function dishDetailView() {
    const recipe = activeRecipe();
    if (!recipe) return '<p class="mv2-empty">Dish not found.</p>';
    const availability = dishAvailability(recipe);
    const mood = `${moodLabel(recipe)} Food`;
    const meal = mealForRecipe(recipe);
    const related = relatedDishes(recipe);
    const totalIngredients = availability.have.length + availability.need.length;
    const matchRatio = totalIngredients ? availability.have.length / totalIngredients : 0;
    const matchLabel = availability.need.length === 0 || matchRatio >= 0.7 ? 'Strong Match' : matchRatio >= 0.4 ? 'Good Match' : 'Pantry Idea';
    const matchCopy = availability.need.length
      ? `You already have ${availability.have.length ? 'most of what you need' : 'a useful start'}. Only ${availability.need.length} ${availability.need.length === 1 ? 'ingredient is' : 'ingredients are'} missing.`
      : 'You already have the listed essentials for this dish.';
    const backLabel = state.dishOrigin === 'pantry' ? '← Back to Pantry' : state.dishOrigin === 'journal' ? '← Back to Journal' : '← Back';
    const backTarget = state.dishOrigin === 'pantry' ? 'pantry' : state.dishOrigin === 'journal' ? 'journal' : state.dishOrigin === 'collection' ? 'collection-detail' : 'discover';
    return `
      <button class="mv2-back" type="button" data-back="${backTarget}">${backLabel}</button>
      <article class="mv2-dish-decision-head">
        ${imageTag(recipeImage(recipe))}
        <div>
          <h2>${esc(recipe.title)}</h2>
          <div class="mv2-dish-facts">
            <span>${totalTime(recipe)} min • ${esc(titleCase(recipe.difficulty || 'easy'))} • ${esc(dietLabel(recipe))}</span>
            <span>${esc(mood)}</span>
            <span>${esc(meal)}</span>
          </div>
        </div>
      </article>
      <section class="mv2-match-summary">
        <strong>${esc(matchLabel)}</strong>
        <p>${esc(matchCopy)}</p>
      </section>
      <section class="mv2-kitchen-readiness">
        <div>
          <strong>Ready In Your Kitchen</strong>
          <span>${availability.have.length ? availability.have.map((name) => `<i>✓ ${esc(name)}</i>`).join('') : '<em>No matching pantry items selected yet.</em>'}</span>
        </div>
        <div>
          <strong>Missing Ingredients</strong>
          <span>${availability.need.length ? availability.need.map((name) => `<i>🛒 ${esc(name)}</i>`).join('') : '<em>Nothing essential is missing.</em>'}</span>
          ${availability.need.length ? `<button class="mv2-add-missing-primary" type="button" data-detail-add-missing="${esc(recipe.id)}">Add Missing Items</button>` : ''}
        </div>
      </section>
      <section class="mv2-why-tomo">
        <p>Why Tomo Picked This</p>
        <span>✓ Uses ingredients already in your pantry</span>
        <span>✓ ${totalTime(recipe) <= 30 ? 'Ready in under 30 minutes' : `Ready in about ${totalTime(recipe)} minutes`}</span>
        <span>✓ Great ${esc(meal.toLowerCase())} option</span>
      </section>
      <section class="mv2-related">
        <div class="mv2-section-title"><div><p>More ideas</p><h2>You May Also Like</h2></div></div>
        <div class="mv2-related-scroll">${related.map(relatedDishCard).join('') || '<p class="mv2-empty">More related dishes are coming soon.</p>'}</div>
      </section>
    `;
  }

  function dishAvailability(recipe) {
    const ingredients = recipeIngredients(recipe).filter((item) => !isNiceToHaveIngredient(item)).map((item) => titleCase(item.name)).filter(Boolean);
    const nice = niceToHaveIngredients(recipe);
    return {
      have: ingredients.filter((name) => ingredientSelected(name)),
      need: ingredients.filter((name) => !ingredientSelected(name)),
      nice
    };
  }

  function dishAvailabilityPanel(availability, recipe) {
    return `
      <section class="mv2-dish-availability">
        <div>
          <strong>You Have</strong>
          <span>${availability.have.length ? availability.have.map((name) => `<i>✓ ${esc(name)}</i>`).join('') : '<em>No matching pantry items selected</em>'}</span>
        </div>
        <div class="mv2-need-group">
          <strong>Need</strong>
          <span>${availability.need.length ? availability.need.map((name) => `<i>+ ${esc(name)}</i>`).join('') : '<em>Nothing missing</em>'}</span>
          ${availability.need.length ? `<button class="mv2-add-missing-primary" type="button" data-detail-add-missing="${esc(recipe?.id || '')}">Add Missing Items</button>` : '<em class="mv2-ready-note">✓ You have everything listed for this dish.</em>'}
        </div>
        ${availability.nice?.length ? `<div class="mv2-nice-group"><strong>Nice To Have</strong><span>${availability.nice.map((name) => `<i>• ${esc(name)}</i>`).join('')}</span></div>` : ''}
      </section>
    `;
  }

  function dietLabel(recipe) {
    const diet = norm(recipe?.dietType || recipe?.diet || 'vegetarian');
    return /non veg|nonveg|chicken|fish|egg|mutton|meat/.test(diet) ? 'Non-Veg' : 'Vegetarian';
  }

  function bestForContext(recipe) {
    const mood = moodLabel(recipe);
    const meal = mealForRecipe(recipe);
    if (mood === 'Rainy') return meal === 'Breakfast' ? 'Rainy Morning' : 'Rainy Day';
    if (mood === 'Protein') return 'Active Days';
    if (mood === 'Quick') return 'Busy Days';
    if (mood === 'Spicy') return 'Bold Cravings';
    if (mood === 'Soul') return 'Homestyle Moments';
    return meal === 'Breakfast' ? 'Slow Mornings' : 'Comfort Cravings';
  }

  function relatedDishes(recipe) {
    const mealKeys = meals.filter(([key]) => matchesMeal(recipe, key)).map(([key]) => key);
    const mood = moodLabel(recipe);
    return recipes
      .filter((item) => item.id !== recipe.id)
      .map((item) => ({
        recipe: item,
        score: (moodLabel(item) === mood ? 2 : 0) + (mealKeys.some((meal) => matchesMeal(item, meal)) ? 1 : 0)
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || moodScore(b.recipe, norm(mood)) - moodScore(a.recipe, norm(mood)))
      .map((item) => item.recipe)
      .filter(uniqueByTitle())
      .slice(0, 3);
  }

  function relatedDishCard(recipe) {
    return `<button class="mv2-related-card" type="button" data-related-recipe="${esc(recipe.id)}">${imageTag(recipeImage(recipe))}<span><strong>${esc(recipe.title)}</strong><small>${totalTime(recipe)} min • ${esc(mealForRecipe(recipe))}</small></span></button>`;
  }

  function pantryIngredientSections() {
    const query = norm(state.pantrySearch);
    const groups = new Map(sectionNames().map((name) => [name, []]));
    pantryCatalog
      .filter((item) => item.display_status !== 'hidden')
      .forEach((item) => {
        const name = item.ingredient_name || item.name;
        if (!name || (query && !norm(name).includes(query))) return;
        addIngredientToSection(groups, sectionForIngredient(item), name);
        if (isStapleBrowserIngredient(name)) addIngredientToSection(groups, 'Staples', name);
      });
    return [...groups].map(([name, ingredients]) => ({ name, ingredients })).filter((section) => section.ingredients.length);
  }

  function addIngredientToSection(groups, section, name) {
    const list = groups.get(section);
    if (list && !list.some((item) => norm(item) === norm(name))) list.push(name);
  }

  function pantrySection(section) {
    const expanded = state.pantrySections.has(section.name) || Boolean(state.pantrySearch);
    return `<article class="mv2-pantry-section"><button class="mv2-pantry-section-toggle" type="button" data-pantry-section="${esc(section.name)}"><span>${esc(section.name)}</span><small>${section.ingredients.length}</small><b>${expanded ? '−' : '+'}</b></button>${expanded ? `<div class="mv2-ingredient-grid">${section.ingredients.map((name) => ingredientChip(name)).join('')}</div>` : ''}</article>`;
  }

  function ingredientChip(name) {
    return `<button class="mv2-ingredient-chip ${state.selectedIngredients.has(name) ? 'active' : ''}" type="button" data-ingredient="${esc(name)}">${esc(name)}</button>`;
  }

  function sectionNames() {
    return ['Staples', 'Grains & Dals', 'Vegetables', 'Proteins', 'Dairy', 'Spices', 'Fruits'];
  }

  function sectionForIngredient(item) {
    const category = item.category || '';
    if (category === 'Vegetables') return 'Vegetables';
    if (category === 'Proteins') return 'Proteins';
    if (category === 'Dairy') return 'Dairy';
    if (category === 'Fruits') return 'Fruits';
    if (category === 'Grains & Dals') return 'Grains & Dals';
    if (['Spices & Seasonings', 'Chillies'].includes(category)) return 'Spices';
    return 'Staples';
  }

  function isStapleBrowserIngredient(name) {
    return /^(rice|onion|tomato|potato|garlic|bread|wheat flour|atta|flour|poha|sooji|rava|egg|paneer|chicken)$/i.test(norm(name));
  }

  function recipeIngredients(recipe) {
    const ingredients = (recipe?.ingredients || []).map((item) => ({
      name: String(item.name || item.ingredient || item).trim(),
      normalized: norm(item.name || item.ingredient || item),
      required: !item.role || item.role === 'required' || item.role === 'main',
      main: Boolean(item.isMain) || item.role === 'main',
      role: item.role || '',
      source: 'ingredients'
    })).filter((item) => item.normalized);
    [
      recipe?.primaryIngredient1,
      recipe?.primaryIngredient2,
      recipe?.primary_ingredient_1,
      recipe?.primary_ingredient_2
    ].forEach((name) => addRecipeIngredient(ingredients, name, true));
    [
      recipe?.secondaryIngredient1,
      recipe?.secondaryIngredient2,
      recipe?.secondaryIngredient3,
      recipe?.secondaryIngredient4,
      recipe?.secondaryIngredient5,
      recipe?.secondary_ingredient_1,
      recipe?.secondary_ingredient_2,
      recipe?.secondary_ingredient_3,
      recipe?.secondary_ingredient_4,
      recipe?.secondary_ingredient_5
    ].forEach((name) => addRecipeIngredient(ingredients, name, false));
    return ingredients;
  }

  function addRecipeIngredient(ingredients, name, main) {
    const label = String(name || '').trim();
    const normalized = norm(label);
    if (!normalized || ingredients.some((item) => item.normalized === normalized)) return;
    ingredients.push({ name: label, normalized, required: true, main, role: main ? 'primary' : 'secondary', source: main ? 'primary-field' : 'secondary-field' });
  }

  function ingredientSelected(name) {
    const key = norm(name);
    const selectedKeys = [...state.selectedIngredients].map(norm);
    if (key === 'dosa batter') return selectedKeys.includes('dosa rice') && selectedKeys.includes('urad dal');
    if (key === 'idli batter') return selectedKeys.includes('idli rice') && selectedKeys.includes('urad dal');
    return [...state.selectedIngredients].some((selected) => {
      return ingredientMatchesSelection(key, norm(selected));
    });
  }

  function ingredientMatchesSelection(ingredientKey, selectedKey) {
    if (ingredientKey === selectedKey) return true;
    const aliases = {
      rice: /^(rice|cooked rice|steamed rice)$/,
      wheat: /^(wheat|wheat flour|atta|whole wheat)$/,
      atta: /^(wheat|wheat flour|atta|whole wheat)$/,
      'wheat flour': /^(wheat|wheat flour|atta|whole wheat)$/,
      'whole wheat': /^(wheat|wheat flour|atta|whole wheat)$/,
      egg: /^eggs?$/,
      chicken: /^(chicken|country chicken)$/,
      paneer: /^paneer$/,
      fish: /^fish$/,
      potato: /^potato$/,
      onion: /^(onion|shallots)$/,
      tomato: /^tomato$/,
      chana: /^(chana|chole|chickpeas?|kabuli chana)$/,
      chole: /^(chana|chole|chickpeas?|kabuli chana)$/,
      chickpea: /^(chana|chole|chickpeas?|kabuli chana)$/,
      chickpeas: /^(chana|chole|chickpeas?|kabuli chana)$/,
      peanut: /^(peanut|peanuts)$/,
      peanuts: /^(peanut|peanuts)$/,
      'moong dal': /^(moong dal|mung dal|moong)$/,
      'mung dal': /^(moong dal|mung dal|moong)$/,
      bread: /^(bread|toast)$/,
      toast: /^(bread|toast)$/,
      'dosa rice': /^(dosa rice|dosa batter)$/,
      'idli rice': /^(idli rice|idli batter)$/,
      'urad dal': /^(urad dal|black urad dal)$/
    };
    if (aliases[selectedKey]) return aliases[selectedKey].test(ingredientKey);
    if (selectedKey.length <= 3) return false;
    return ingredientKey === selectedKey || ingredientKey.startsWith(`${selectedKey} `);
  }

  function pantryMatches() {
    const selected = [...state.selectedIngredients].map(norm);
    if (!selected.length) return [];
    return recipes
      .map((recipe) => {
        const ingredients = recipeIngredients(recipe);
        const matched = ingredients.filter((item) => ingredientSelected(item.name));
        const matchedSelected = selected.filter((name) => ingredients.some((item) => ingredientMatchesSelection(item.normalized, name)));
        const matchedSelectedMain = selected.filter((name) => ingredients.some((item) => item.main && ingredientMatchesSelection(item.normalized, name)));
        const ignoredSelected = selected.filter((name) => !matchedSelected.includes(name));
        const missing = ingredients.filter((item) => item.required && !ingredientSelected(item.name));
        const ignoredMajorProtein = ignoredSelected.some(isMajorProtein);
        const missingMajorProteinCount = missing.filter((item) => isMajorProtein(item.normalized)).length;
        const selectedMajorProteinCount = selected.filter(isMajorProtein).length;
        const primaryIdentityKeys = [
          recipe?.primaryIngredient1,
          recipe?.primaryIngredient2,
          recipe?.primary_ingredient_1,
          recipe?.primary_ingredient_2
        ].map(norm).filter(Boolean);
        const selectedPrimaryFieldCount = selected.filter((name) => primaryIdentityKeys.some((key) => ingredientMatchesSelection(key, name))).length;
        const vegOnlySelection = selectedMajorProteinCount === 0;
        const missingUnselectedMeatCount = missing.filter((item) => isMeatProtein(item.normalized) && !selected.some((name) => ingredientMatchesSelection(item.normalized, name))).length;
        const nonVegBlocked = vegOnlySelection && (isNonVegRecipe(recipe) || missingUnselectedMeatCount > 0);
        const tier = pantryMatchTier({ ingredients, matchedSelected, matchedSelectedMain, ignoredSelected, ignoredMajorProtein, missingMajorProteinCount });
        return {
          recipe,
          matched,
          matchedSelected,
          matchedSelectedMain,
          ignoredSelected,
          ignoredMajorProtein,
          tier,
          missing,
          score: (nonVegBlocked ? 0 : tier.rank) * 1000
            + matchedSelected.length * 100
            + matched.filter((item) => item.main).length * 20
            + selectedPrimaryFieldCount * 220
            + Math.min(ingredients.length, 8) * 2
            - missing.length
            - missingMajorProteinCount * 600
            - (nonVegBlocked ? 5000 : 0)
            - ignoredSelected.length * 80
            - (ignoredMajorProtein ? 140 : 0)
        };
      })
      .filter((item) => item.matchedSelected.length > 0)
      .sort((a, b) => b.score - a.score || moodScore(b.recipe, state.mood) - moodScore(a.recipe, state.mood));
  }

  function pantryMatchTier(match) {
    const selected = [...state.selectedIngredients].map(norm);
    if (!selected.length || match.ignoredMajorProtein) return { name: 'No Match', rank: 0 };
    const roleForSelected = (selectedKey) => {
      const matching = match.ingredients.filter((item) => ingredientMatchesSelection(item.normalized, selectedKey));
      if (!matching.length) return 'unused';
      if (matching.some((item) => item.main && !isNiceToHaveIngredient(item))) return 'core';
      if (matching.some((item) => item.required && item.source !== 'secondary-field' && !isNiceToHaveIngredient(item))) return 'meaningful';
      return 'secondary';
    };
    const roles = selected.map(roleForSelected);
    const usedCount = roles.filter((role) => role !== 'unused').length;
    const coreCount = roles.filter((role) => role === 'core' || role === 'meaningful').length;
    const selectedMainCount = roles.filter((role) => role === 'core').length;
    if (usedCount === selected.length && selectedMainCount === 0 && match.missingMajorProteinCount > 0) return { name: 'Tier 2', rank: 2 };
    if (usedCount === selected.length && coreCount === selected.length) return { name: 'Tier 1', rank: 3 };
    if (usedCount === selected.length && coreCount > 0) return { name: 'Tier 2', rank: 2 };
    if (usedCount > 0) return { name: 'Tier 3', rank: 1 };
    return { name: 'No Match', rank: 0 };
  }

  function isMajorProtein(value) {
    return /^(fish|chicken|egg|paneer|mutton|prawn|pork|keema|minced meat|country chicken)$/.test(norm(value));
  }

  function isMeatProtein(value) {
    return /^(fish|chicken|mutton|prawn|pork|keema|minced meat|country chicken)$/.test(norm(value));
  }

  function isNonVegRecipe(recipe) {
    return /non-?vegetarian|non veg|nonveg/.test(norm(recipe?.dietType || recipe?.diet || ''));
  }

  function missingIngredients(recipe) {
    return missingIngredientGroups(recipe).need;
  }

  function niceToHaveIngredients(recipe) {
    return missingIngredientGroups(recipe).nice;
  }

  function missingIngredientGroups(recipe) {
    const need = [];
    const nice = [];
    recipeIngredients(recipe)
      .filter((item) => item.required && !ingredientSelected(item.name))
      .forEach((item) => {
        const label = titleCase(item.name);
        const target = isNiceToHaveIngredient(item) ? nice : need;
        if (!target.some((name) => norm(name) === norm(label))) target.push(label);
      });
    return { need, nice };
  }

  function isNiceToHaveIngredient(item) {
    const key = norm(item?.normalized || item?.name || item);
    const role = norm(item?.role || '');
    if (['optional', 'garnish', 'flavor-base', 'flavour-base', 'cooking-fat', 'seasoning'].includes(role)) return true;
    return /^(coriander|curry leaves|soy sauce|spring onion|oil|cooking oil|ghee|butter|red chilli|green chilli|chilli|pepper|black pepper|mustard seeds|cumin|ginger|lemon|tamarind|garam masala|chaat masala|podi|mint|whole spices)$/.test(key);
  }

  function availableIngredients(recipe) {
    return recipeIngredients(recipe)
      .filter((item) => ingredientSelected(item.name))
      .map((item) => titleCase(item.name));
  }

  function pantryIngredientStatus(available, missing, recipe) {
    const missingContent = missing.length
      ? `<span>${missing.map((name) => `<button type="button" data-add-grocery-name="${esc(name)}" data-needed-recipe="${esc(recipe?.id || '')}">+ ${esc(name)}</button>`).join('')}</span><button class="mv2-secondary-wide" type="button" data-add-missing="${esc(recipe?.id || '')}">Add Missing Items</button>`
      : '<span><em>Nothing essential</em></span>';
    return `<section class="mv2-pantry-status"><div><strong>You Have</strong><span>${available.length ? available.map((name) => `<i>✓ ${esc(name)}</i>`).join('') : '<em>None selected</em>'}</span></div><div><strong>Missing</strong>${missingContent}</div></section>`;
  }

  function meaningfulPantryMatches(matches) {
    const selected = [...state.selectedIngredients].map(norm);
    const vegOnlySelection = !selected.some(isMajorProtein);
    return matches.filter((match) => {
      if (match.tier.rank < 2 || match.ignoredMajorProtein) return false;
      if (!vegOnlySelection) return true;
      return !isNonVegRecipe(match.recipe) && !match.missing.some((item) => isMeatProtein(item.normalized));
    });
  }

  function missingSummary(items) {
    if (!items.length) return 'Nothing essential';
    if (items.length <= 2) return items.join(', ');
    return `${items.slice(0, 2).join(', ')} +${items.length - 2}`;
  }

  function unlockIngredients() {
    const scores = new Map();
    pantryMatches().slice(0, 18).forEach((match) => {
      recipeIngredients(match.recipe).forEach((item) => {
        if (ingredientSelected(item.name) || !item.required || isPantryStaple(item.normalized)) return;
        const label = titleCase(item.name);
        scores.set(label, (scores.get(label) || 0) + (item.main ? 4 : 1));
      });
    });
    return [...scores].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3).map(([name]) => name);
  }

  function pantrySuggestionPanel() {
    const selected = [...state.selectedIngredients];
    if (!selected.length) {
      return `<aside class="mv2-pantry-suggestion"><p>Tomo Suggestion</p><div class="mv2-pantry-empty">Select ingredients and Tomo will start finding dishes.</div></aside>`;
    }
    if (selected.length === 1) {
      const unlocks = unlockIngredients();
      return `<aside class="mv2-pantry-suggestion"><p>Tomo Suggestion</p><h2>${esc(selected[0])}</h2><div class="mv2-pantry-empty">${unlocks.length ? `Try adding ${esc(joinList(unlocks))}.` : 'Add one more ingredient to unlock stronger matches.'}</div></aside>`;
    }
    const matches = pantryMatches();
    const meaningfulMatches = meaningfulPantryMatches(matches);
    const best = meaningfulMatches[0];
    if (!best) {
      const unlock = matches.find((match) => match.tier.rank === 1 && !match.ignoredMajorProtein);
      const add = unlock ? missingIngredients(unlock.recipe)[0] : '';
      const copy = unlock && add
        ? `Try adding ${add} to unlock ${unlock.recipe.title}.`
        : 'No strong match yet. Try swapping or adding one ingredient.';
      return `<aside class="mv2-pantry-suggestion"><p>Tomo Suggestion</p><div class="mv2-pantry-empty">${esc(copy)}</div></aside>`;
    }
    const missingGroups = missingIngredientGroups(best.recipe);
    const missing = missingGroups.need;
    const nice = missingGroups.nice;
    const matchLabel = best.tier.name === 'Tier 1' ? 'Strong Match' : best.tier.name === 'Tier 2' ? 'Good Match' : 'Unlock Suggestion';
    return `
      <aside class="mv2-pantry-suggestion">
        <p>Tomo Suggestion</p>
        <div class="mv2-pantry-match">
          ${imageTag(recipeImage(best.recipe))}
          <div><h2>${esc(best.recipe.title)}</h2><div class="mv2-pantry-compact-meta">${esc(matchLabel)}</div></div>
        </div>
        <div class="mv2-pantry-neednice">
          ${missing.length ? `<div class="mv2-need-group"><strong>Need:</strong><span>${esc(missingSummary(missing))}</span></div>` : '<div class="mv2-pantry-ready">You have enough to start.</div>'}
          ${nice.length ? `<div class="mv2-nice-group"><strong>Nice To Have:</strong><span>${nice.slice(0, 3).map((name) => `<i>• ${esc(name)}</i>`).join('')}</span></div>` : ''}
        </div>
        <div class="mv2-pantry-actions">${missing.length ? `<button type="button" data-add-missing="${esc(best.recipe.id)}">Add Missing Items</button>` : ''}<button type="button" data-pantry-recipe="${esc(best.recipe.id)}">View Dish</button></div>
      </aside>
    `;
  }

  function addGroceries(names, recipe = null) {
    let added = 0;
    names.forEach((name) => {
      const label = titleCase(name);
      if (!label) return;
      const existing = state.groceries.find((item) => norm(item.name) === norm(label));
      if (existing) {
        existing.complete = false;
        if (recipe?.title && !existing.neededFor.includes(recipe.title)) existing.neededFor.push(recipe.title);
        return;
      }
      state.groceries.push({ name: label, complete: false, neededFor: recipe?.title ? [recipe.title] : [] });
      added += 1;
    });
    saveGroceries();
    return added;
  }

  function grocerySuggestions() {
    const suggestions = new Map();
    meaningfulPantryMatches(pantryMatches()).slice(0, 8).forEach((match) => {
      match.missing.forEach((item) => {
        const ingredient = titleCase(item.name);
        if (isNiceToHaveIngredient(item) || isPantryStaple(item.normalized) || state.groceries.some((grocery) => norm(grocery.name) === norm(ingredient))) return;
        if (!suggestions.has(ingredient)) suggestions.set(ingredient, []);
        const list = suggestions.get(ingredient);
        if (list.length < 3 && !list.some((recipe) => recipe.id === match.recipe.id)) list.push(match.recipe);
      });
    });
    return [...suggestions].slice(0, 5).map(([ingredient, unlockedRecipes]) => ({ ingredient, recipes: unlockedRecipes }));
  }

  function isPantryStaple(value) {
    return /^(water|salt|oil|cooking oil|sugar|pepper|turmeric|chilli powder|cumin|mustard seeds)$/.test(norm(value));
  }

  function titleCase(value) {
    return String(value || '').trim().replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function joinList(items) {
    if (items.length < 2) return items[0] || '';
    return `${items.slice(0, -1).join(', ')} or ${items.at(-1)}`;
  }

  function recipeCard(recipe) {
    return `<article class="mv2-dish"><button class="mv2-dish-main" type="button" data-recipe="${esc(recipe.id)}">${imageTag(recipeImage(recipe))}<span><strong>${esc(recipe.title)}</strong><p>${totalTime(recipe)} min • ${esc(selectedMoodLabel())}</p></span></button>${dishActionButtons(recipe.id, recipe.title, 'todays-picks')}</article>`;
  }

  function collectionCard(item) {
    const recipe = findRecipe(item.title);
    const image = item.imagePath || item.image_url || (recipe ? recipeImage(recipe) : collectionDishImage(item));
    const attribute = item.region || (item.time ? `${item.time} min` : item.subCategory || item.subcategory || 'Curated Pick');
    const explanation = collectionDishLine(item, recipe);
    const recipeId = recipe?.id || collectionDishId(item);
    return `<article class="mv2-collection-dish"><button class="mv2-collection-dish-main" type="button" data-recipe="${esc(recipeId)}">${imageTag(image)}<span><strong>${esc(item.title)}</strong><small>${esc(attribute)}</small><p>${esc(explanation)}</p><b>View Dish →</b></span></button></article>`;
  }

  function collectionDishLine(item, recipe) {
    const key = norm(item.title);
    const lines = {
      'oats porridge': 'Soft and calming for tiny tummies.',
      'suji porridge': 'Mild, familiar and easy to feed.',
      'ragi porridge': 'Earthy, filling and gentle.',
      'rice moong khichdi': 'Soft dal-rice comfort bowl.',
      'carrot puree': 'Gentle, smooth and easy to digest.',
      'avocado mash': 'Creamy first food with healthy fats.',
      'soft chapati milk mash': 'Soft texture for little bites.'
    };
    if (lines[key]) return lines[key];
    const source = item.description || item.subcategory_description || recipe?.description || 'Thoughtful pick for this collection.';
    const words = String(source).replace(/[.!,;:]+/g, '').split(/\s+/).filter(Boolean).slice(0, 8);
    return `${words.join(' ')}.`;
  }

  function dishActionButtons(recipeId, dishName, source, extraClass = '') {
    const saved = isSaved(recipeId, dishName);
    const dismiss = source === 'todays-picks' && recipeId
      ? `<button class="mv2-card-icon mv2-dismiss" type="button" data-dismiss-today="${esc(recipeId)}" data-dish-name="${esc(dishName)}" aria-label="Not For Me">✕ Not For Me</button>`
      : '';
    return `<div class="mv2-card-actions ${extraClass} ${dismiss ? 'has-dismiss' : ''}"><button class="mv2-primary" type="button" data-cook-recipe="${esc(recipeId)}" data-dish-name="${esc(dishName)}" data-source="${esc(source)}">Cook This</button><button class="mv2-card-icon ${saved ? 'active' : ''}" type="button" data-save="${esc(recipeId)}" data-dish-name="${esc(dishName)}" data-source="${esc(source)}" aria-label="${saved ? 'Saved' : 'Save'}">${saved ? '♥ Saved' : '♡ Save'}</button>${dismiss}</div>`;
  }

  function findRecipe(title) {
    const key = norm(title);
    return recipes.find((recipe) => norm(recipe.title) === key) || recipes.find((recipe) => norm(recipe.title).includes(key) || key.includes(norm(recipe.title)));
  }

  function activeRecipe() {
    return recipes.find((item) => item.id === state.activeRecipeId) || collectionRecipeById(state.activeRecipeId);
  }

  function collectionDishId(item) {
    return `collection-${item.id || norm(item.title).replace(/\s+/g, '-')}`;
  }

  function collectionRecipeById(id) {
    const collectionItem = collections.flatMap((collection) => collection.items || []).find((item) => collectionDishId(item) === id);
    if (!collectionItem) return null;
    const image = collectionItem.imagePath || collectionItem.image_url || collectionDishImage(collectionItem);
    return {
      ...collectionItem,
      id,
      title: collectionItem.title,
      description: collectionItem.description || collectionItem.subcategory_description || 'A thoughtful pick from this collection.',
      imageUrl: image?.startsWith('/') ? image : `/${image}`,
      timeMinutes: Number(collectionItem.time || collectionItem.timeMinutes || 0),
      difficulty: collectionItem.difficulty || 'easy',
      dietType: collectionItem.dietType || collectionItem.diet_type || 'veg',
      tags: [...(collectionItem.tags || []), collectionItem.subcategory, collectionItem.subCategory, 'collection'].filter(Boolean)
    };
  }

  function collectionDishImage(item) {
    const text = norm(item.title);
    if (text.includes('chai') || text.includes('tea')) return '/assets/images/drinks/masala-chai.png';
    if (text.includes('salad')) return '/assets/images/salads/salad-default.png';
    if (text.includes('soup')) return '/assets/images/dishes/soup-bowls.png';
    if (text.includes('kheer') || text.includes('payasam')) return '/assets/images/desserts/kheer.png';
    return '/assets/images/dishes/homestyle-kitchen-placeholder.png';
  }

  function imageTag(src) {
    return `<img class="food-image" src="${esc(src)}" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='/assets/images/dishes/homestyle-kitchen-placeholder.png'" />`;
  }

  function moodLabel(recipe) {
    const haystack = tags(recipe).join(' ');
    if (haystack.includes('quick')) return 'Quick';
    if (haystack.includes('soul')) return 'Soul';
    if (haystack.includes('rainy')) return 'Rainy';
    if (haystack.includes('spicy')) return 'Spicy';
    if (Number(recipe?.proteinScore || 0) >= 7) return 'Protein';
    return 'Comfort';
  }

  function selectedMoodLabel(mood = state.mood) {
    return moods.find(([key]) => key === mood)?.[2] || 'Today';
  }

  function hasDishRecord(list, recipeId, dishName = '') {
    const name = norm(dishName);
    return list.some((item) => (recipeId && item.id === recipeId) || (name && norm(item.dishName) === name));
  }

  function isSaved(recipeId, dishName = '') {
    return hasDishRecord(state.savedDishes, recipeId, dishName);
  }

  function isCooked(recipeId, dishName = '') {
    return hasDishRecord(state.cookedDishes, recipeId, dishName);
  }

  function dishStatus(recipeId, dishName = '') {
    return {
      saved: isSaved(recipeId, dishName),
      cooked: isCooked(recipeId, dishName)
    };
  }

  function dishSource() {
    if (state.dishOrigin === 'pantry') return 'pantry';
    if (state.dishOrigin === 'journal') return 'journal';
    if (state.dishOrigin === 'collection') return 'collection';
    return state.screen === 'collection' ? 'collection' : 'discover';
  }

  function upsertDishRecord(list, recipeId, source, dishName = '') {
    const recipe = recipes.find((item) => item.id === recipeId);
    const label = recipe?.title || dishName;
    if (!label) return list;
    const timestamp = new Date().toISOString();
    const record = {
      id: recipe?.id || recipeId || '',
      dishName: label,
      timestamp,
      source: source || dishSource()
    };
    const index = list.findIndex((item) => (record.id && item.id === record.id) || norm(item.dishName) === norm(record.dishName));
    if (index >= 0) {
      list[index] = { ...list[index], ...record };
      return list;
    }
    return [record, ...list];
  }

  function removeDishRecord(list, recipeId, dishName = '') {
    const name = norm(dishName);
    return list.filter((item) => !((recipeId && item.id === recipeId) || (name && norm(item.dishName) === name)));
  }

  function saveDish(recipeId, source, dishName = '') {
    state.savedDishes = upsertDishRecord(state.savedDishes, recipeId, source, dishName);
    saveMemory();
  }

  function unsaveDish(recipeId, dishName = '') {
    state.savedDishes = removeDishRecord(state.savedDishes, recipeId, dishName);
    saveMemory();
  }

  function recordCooked(recipeId, source, dishName = '') {
    const existing = state.cookedDishes.find((item) => (recipeId && item.id === recipeId) || (dishName && norm(item.dishName) === norm(dishName)));
    const previousCount = existing ? Number(existing.cookCount || 1) : 0;
    state.cookedDishes = upsertDishRecord(state.cookedDishes, recipeId, source, dishName);
    const updated = state.cookedDishes.find((item) => (recipeId && item.id === recipeId) || (dishName && norm(item.dishName) === norm(dishName)));
    if (updated) updated.cookCount = previousCount + 1;
    saveMemory();
  }

  function mealLabel(meal) {
    return meals.find(([key]) => key === meal)?.[1] || 'Today';
  }

  function mealForRecipe(recipe) {
    return meals.find(([key]) => matchesMeal(recipe, key))?.[1] || 'Any meal';
  }

  function relativeTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const today = new Date();
    return date.toDateString() === today.toDateString()
      ? date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  root.addEventListener('click', async (event) => {
    const closeSearch = event.target.closest('[data-close-search]');
    if (closeSearch) {
      state.searchOpen = false;
      render();
      return;
    }

    const searchBackdrop = event.target.closest('[data-search-backdrop]');
    if (searchBackdrop && event.target === searchBackdrop) {
      state.searchOpen = false;
      render();
      return;
    }

    const searchRecipe = event.target.closest('[data-search-recipe]');
    if (searchRecipe) {
      state.discoverScrollY = window.scrollY;
      state.activeRecipeId = searchRecipe.dataset.searchRecipe;
      state.dishOrigin = 'discover';
      state.searchOpen = false;
      state.screen = 'dish';
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const searchCollection = event.target.closest('[data-search-collection]');
    if (searchCollection) {
      state.discoverScrollY = window.scrollY;
      state.collectionKey = searchCollection.dataset.searchCollection;
      state.subcategory = '';
      state.searchOpen = false;
      state.screen = 'collection';
      renderWithMotion('collection-forward');
      window.scrollTo(0, 0);
      return;
    }

    const searchIngredient = event.target.closest('[data-search-ingredient]');
    if (searchIngredient) {
      state.searchOpen = false;
      state.screen = 'kitchen';
      state.kitchenTab = 'pantry';
      state.pantrySearch = searchIngredient.dataset.searchIngredient;
      render();
      window.scrollTo(0, 0);
      return;
    }

    const searchMood = event.target.closest('[data-search-mood]');
    if (searchMood) {
      state.searchOpen = false;
      state.screen = 'discover';
      state.discoverView = 'moods';
      state.mood = searchMood.dataset.searchMood;
      render();
      window.scrollTo(0, 0);
      return;
    }

    const nav = event.target.closest('[data-nav]');
    if (nav) {
      const currentTab = primaryScreen();
      state.tabScroll[currentTab] = window.scrollY;
      state.screen = nav.dataset.nav;
      if (state.screen === 'kitchen') state.kitchenTab = 'pantry';
      renderWithMotion('tab');
      requestAnimationFrame(() => window.scrollTo(0, state.tabScroll[state.screen] || 0));
      return;
    }

    const discover = event.target.closest('[data-discover]');
    if (discover) {
      state.discoverView = discover.dataset.discover;
      renderWithMotion('segment');
      return;
    }

    const kitchenTab = event.target.closest('[data-kitchen-tab]');
    if (kitchenTab) {
      state.kitchenTab = kitchenTab.dataset.kitchenTab;
      renderWithMotion('segment');
      return;
    }

    const journalTab = event.target.closest('[data-journal-tab]');
    if (journalTab) {
      state.journalTab = journalTab.dataset.journalTab;
      renderWithMotion('segment');
      return;
    }

    const journalExplore = event.target.closest('[data-journal-explore]');
    if (journalExplore) {
      state.screen = 'discover';
      state.discoverView = 'moods';
      renderWithMotion('tab');
      window.scrollTo(0, 0);
      return;
    }

    const pantrySection = event.target.closest('[data-pantry-section]');
    if (pantrySection) {
      state.pantrySections.has(pantrySection.dataset.pantrySection)
        ? state.pantrySections.delete(pantrySection.dataset.pantrySection)
        : state.pantrySections.add(pantrySection.dataset.pantrySection);
      render();
      return;
    }

    const mood = event.target.closest('[data-mood]');
    if (mood) {
      state.mood = state.mood === mood.dataset.mood ? '' : mood.dataset.mood;
      state.activeTomoPick = null;
      state.dismissedToday = [];
      renderWithMotion('mood');
      return;
    }

    const meal = event.target.closest('[data-meal]');
    if (meal) {
      state.meal = meal.dataset.meal;
      state.activeTomoPick = null;
      renderWithMotion('recommendation');
      return;
    }

    const collection = event.target.closest('[data-collection]');
    if (collection) {
      state.discoverScrollY = window.scrollY;
      state.collectionKey = collection.dataset.collection;
      state.subcategory = '';
      state.screen = 'collection';
      renderWithMotion('collection-forward');
      window.scrollTo(0, 0);
      return;
    }

    const subcategory = event.target.closest('[data-subcategory]');
    if (subcategory) {
      state.subcategory = subcategory.dataset.subcategory;
      const collection = collections.find((item) => item.key === state.collectionKey);
      const active = collectionDetail(collection).find((group) => group.name === state.subcategory);
      root.querySelectorAll('[data-subcategory]').forEach((button) => {
        button.classList.toggle('active', button.dataset.subcategory === state.subcategory);
      });
      const results = root.querySelector('.mv2-collection-results');
      if (results) {
        results.innerHTML = collectionResults(active);
        results.classList.remove('is-updating');
        void results.offsetWidth;
        results.classList.add('is-updating');
      }
      return;
    }

    const ingredient = event.target.closest('[data-ingredient]');
    if (ingredient) {
      state.selectedIngredients.has(ingredient.dataset.ingredient)
        ? state.selectedIngredients.delete(ingredient.dataset.ingredient)
        : state.selectedIngredients.add(ingredient.dataset.ingredient);
      renderWithMotion('pantry-update');
      return;
    }

    const pantryRecipe = event.target.closest('[data-pantry-recipe]');
    if (pantryRecipe) {
      state.activeRecipeId = pantryRecipe.dataset.pantryRecipe;
      state.dishOrigin = 'pantry';
      state.pantryScrollY = window.scrollY;
      state.screen = 'dish';
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const journalRecipe = event.target.closest('[data-journal-recipe]');
    if (journalRecipe) {
      state.activeRecipeId = journalRecipe.dataset.journalRecipe;
      state.dishOrigin = 'journal';
      state.journalScrollY = window.scrollY;
      state.screen = 'dish';
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const addMissing = event.target.closest('[data-add-missing]');
    if (addMissing) {
      const recipe = recipes.find((item) => item.id === addMissing.dataset.addMissing);
      const added = recipe ? addGroceries(missingIngredients(recipe), recipe) : 0;
      state.screen = 'kitchen';
      state.kitchenTab = 'groceries';
      state.shoppingMode = false;
      if (recipe) showToast(added ? `Added ${added} ${added === 1 ? 'item' : 'items'} to your cart` : 'Items are already in your cart');
      renderWithMotion('tab');
      window.scrollTo(0, 0);
      return;
    }

    const detailAddMissing = event.target.closest('[data-detail-add-missing]');
    if (detailAddMissing) {
      const recipe = recipes.find((item) => item.id === detailAddMissing.dataset.detailAddMissing);
      const missing = recipe ? dishAvailability(recipe).need : [];
      const added = recipe ? addGroceries(missing, recipe) : 0;
      state.screen = 'kitchen';
      state.kitchenTab = 'groceries';
      state.shoppingMode = false;
      showToast(added ? `Added ${added} ${added === 1 ? 'item' : 'items'} to your cart` : 'Items are already in your cart');
      renderWithMotion('tab');
      window.scrollTo(0, 0);
      return;
    }

    const addGroceryName = event.target.closest('[data-add-grocery-name]');
    if (addGroceryName) {
      const recipe = recipes.find((item) => item.id === addGroceryName.dataset.neededRecipe);
      const added = addGroceries([addGroceryName.dataset.addGroceryName], recipe);
      showToast(added ? `Added ${addGroceryName.dataset.addGroceryName} to your cart` : 'Already in your cart');
      render();
      return;
    }

    const addGrocery = event.target.closest('[data-add-grocery]');
    if (addGrocery) {
      const recipe = recipes.find((item) => item.id === addGrocery.dataset.neededRecipe);
      const added = addGroceries([addGrocery.dataset.addGrocery], recipe);
      showToast(added ? `Added ${addGrocery.dataset.addGrocery} to your cart` : 'Already in your cart');
      render();
      return;
    }

    const startShopping = event.target.closest('[data-start-shopping]');
    if (startShopping) {
      state.shoppingMode = true;
      render();
      return;
    }

    const copyList = event.target.closest('[data-copy-shopping-list]');
    if (copyList) {
      const copied = await copyShoppingList();
      showToast(copied ? 'Shopping list copied.' : 'Could not copy shopping list.');
      render();
      return;
    }

    const shareList = event.target.closest('[data-share-shopping-list]');
    if (shareList) {
      const text = shoppingListText();
      if (typeof window.navigator?.share === 'function') {
        try {
          await window.navigator.share({ title: 'Tomo Shopping List', text });
          showToast('Shopping list shared.');
        } catch (error) {
          if (error?.name === 'AbortError') return;
          const copied = await copyShoppingList();
          showToast(copied ? 'Shopping list copied.' : 'Could not share shopping list.');
        }
      } else {
        const copied = await copyShoppingList();
        showToast(copied ? 'Shopping list copied.' : 'Could not share shopping list.');
      }
      render();
      return;
    }

    const cookRecipe = event.target.closest('[data-cook-recipe]');
    if (cookRecipe) {
      const recipeId = cookRecipe.dataset.cookRecipe;
      recordCooked(recipeId, cookRecipe.dataset.source, cookRecipe.dataset.dishName);
      showToast('Added to your cooking journey');
      if (recipeId && state.screen !== 'dish') {
        state.activeRecipeId = recipeId;
        state.dishOrigin = cookRecipe.dataset.source === 'collection' ? 'collection' : cookRecipe.dataset.source === 'pantry' ? 'pantry' : 'discover';
        if (state.dishOrigin === 'collection') state.collectionScrollY = window.scrollY;
        if (state.dishOrigin === 'discover') state.discoverScrollY = window.scrollY;
        state.screen = 'dish';
        renderWithMotion('detail-forward');
        window.scrollTo(0, 0);
        return;
      }
      render();
      return;
    }

    const dismissToday = event.target.closest('[data-dismiss-today]');
    if (dismissToday) {
      if (!state.dismissedToday.includes(dismissToday.dataset.dismissToday)) {
        state.dismissedToday.push(dismissToday.dataset.dismissToday);
      }
      renderWithMotion('recommendation');
      return;
    }

    const removeGrocery = event.target.closest('[data-grocery-remove]');
    if (removeGrocery) {
      state.groceries = state.groceries.filter((item) => norm(item.name) !== norm(removeGrocery.dataset.groceryRemove));
      saveGroceries();
      render();
      return;
    }

    const clearCompleted = event.target.closest('[data-clear-completed]');
    if (clearCompleted) {
      state.groceries = state.groceries.filter((item) => !item.complete);
      saveGroceries();
      render();
      return;
    }

    const clearGroceries = event.target.closest('[data-clear-groceries]');
    if (clearGroceries) {
      state.groceries = [];
      state.shoppingMode = false;
      saveGroceries();
      render();
      return;
    }

    const save = event.target.closest('[data-save]');
    if (save) {
      if (isSaved(save.dataset.save, save.dataset.dishName)) {
        unsaveDish(save.dataset.save, save.dataset.dishName);
        showToast('Removed from Saved');
      } else {
        saveDish(save.dataset.save, save.dataset.source, save.dataset.dishName);
        showToast('Saved to Tomo');
      }
      render();
      return;
    }

    const recipe = event.target.closest('[data-recipe]');
    if (recipe?.dataset.recipe) {
      const fromCollection = state.screen === 'collection';
      if (fromCollection) state.collectionScrollY = window.scrollY;
      else state.discoverScrollY = window.scrollY;
      state.activeRecipeId = recipe.dataset.recipe;
      state.dishOrigin = fromCollection ? 'collection' : 'discover';
      state.screen = 'dish';
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const relatedRecipe = event.target.closest('[data-related-recipe]');
    if (relatedRecipe) {
      state.activeRecipeId = relatedRecipe.dataset.relatedRecipe;
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const back = event.target.closest('[data-back]');
    if (back) {
      if (back.dataset.back === 'pantry') {
        state.screen = 'kitchen';
        state.kitchenTab = 'pantry';
        renderWithMotion('back');
        requestAnimationFrame(() => window.scrollTo(0, state.pantryScrollY));
        return;
      }
      if (back.dataset.back === 'journal') {
        state.screen = 'journal';
        renderWithMotion('back');
        requestAnimationFrame(() => window.scrollTo(0, state.journalScrollY));
        return;
      }
      if (back.dataset.back === 'collection-detail') {
        state.screen = 'collection';
        renderWithMotion('back');
        requestAnimationFrame(() => window.scrollTo(0, state.collectionScrollY));
        return;
      }
      state.screen = back.dataset.back === 'collections' ? 'discover' : 'discover';
      if (back.dataset.back === 'collections') state.discoverView = 'collections';
      renderWithMotion('back');
      requestAnimationFrame(() => window.scrollTo(0, state.discoverScrollY));
    }
  });

  root.addEventListener('input', (event) => {
    if (event.target.id === 'mv2GlobalSearch') {
      const cursor = event.target.selectionStart;
      state.searchQuery = event.target.value;
      state.searchOpen = true;
      render();
      const input = root.querySelector('#mv2GlobalSearch');
      input?.focus();
      input?.setSelectionRange(cursor, cursor);
      return;
    }
    if (event.target.id !== 'mv2PantrySearch') return;
    const cursor = event.target.selectionStart;
    state.pantrySearch = event.target.value;
    render();
    const input = root.querySelector('#mv2PantrySearch');
    input?.focus();
    input?.setSelectionRange(cursor, cursor);
  });

  root.addEventListener('change', (event) => {
    const checkbox = event.target.closest('[data-grocery-check]');
    if (!checkbox) return;
    const item = state.groceries.find((entry) => norm(entry.name) === norm(checkbox.dataset.groceryCheck));
    if (item) item.complete = checkbox.checked;
    saveGroceries();
    render();
  });

  root.addEventListener('submit', (event) => {
    const searchForm = event.target.closest('[data-search-form]');
    if (searchForm) {
      event.preventDefault();
      state.searchOpen = true;
      render();
      requestAnimationFrame(() => root.querySelector('#mv2GlobalSearch')?.focus());
      return;
    }

    const form = event.target.closest('[data-grocery-form]');
    if (!form) return;
    event.preventDefault();
    const data = new FormData(form);
    const added = addGroceries([data.get('groceryItem')]);
    if (!added) showToast('Already in your cart');
    render();
  });

  render();
};
