window.renderMobileV2App = function renderMobileV2App(root) {
  if (!root) return;
  document.documentElement.classList.add('mobile-v2-active');

  const USE_GENERATED_COLLECTIONS = true;
  const recipes = (window.COOKBUDDY_LOCAL_RECIPES || []).filter((recipe) => {
    return String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core';
  });
  const generatedHubMeta = {
    'Regional Journeys': {
      icon: '🧭',
      copy: "Explore food across India's regions.",
      imagePath: '/assets/images/collections/festival-food.webp',
    },
    'Everyday Cooking': {
      icon: '🍳',
      copy: 'Daily comforts, tea-time favourites and home staples.',
      imagePath: '/assets/images/dishes/home-bowl.png',
    },
    'Healthy Living': {
      icon: '🥗',
      copy: 'Protein-rich, balanced and lighter meals.',
      imagePath: '/assets/images/collections/power-plates-collection-card.png?v=collection-card-images-68',
    },
    'Family Favorites': {
      icon: '👨‍👩‍👧',
      copy: 'Baby bowls, lunch boxes and family-friendly picks.',
      imagePath: '/assets/images/collections/lunch-box-heroes.webp',
    },
    'Global Bites': {
      icon: '🌍',
      copy: 'Comforting dishes from around the world.',
      imagePath: '/assets/images/dishes/noodles.png',
    },
    'Kitchen Essentials': {
      icon: '🥣',
      copy: 'Chutneys, sides, condiments and add-ons.',
      imagePath: '/assets/images/collections/sides-addons-collection-card.png?v=collection-card-images-68',
    },
    'Seasonal Specials': {
      icon: '☀️',
      copy: 'Cooling, rainy-day and seasonal cravings.',
      imagePath: '/assets/images/collections/healthy-drinks.webp',
    },
    'Celebrations & Traditions': {
      icon: '🪔',
      copy: 'Festival sweets, regional sweets and prasadam.',
      imagePath: '/assets/images/collections/festival-food.webp',
    },
  };
  const generatedHubOrder = [
    'Regional Journeys',
    'Everyday Cooking',
    'Healthy Living',
    'Family Favorites',
    'Global Bites',
    'Kitchen Essentials',
    'Seasonal Specials',
    'Celebrations & Traditions',
  ];
  const generatedCollectionOrder = {
    'Regional Journeys': ['Karnataka', 'Andhra & Telangana', 'Tamil Nadu', 'Kerala', 'Bengal', 'Maharashtra', 'Northeast', 'North & West India', 'Jammu & Kashmir'],
    'Everyday Cooking': ['Daily Comforts', 'Tea Time Favourites', 'Home Staples'],
    'Healthy Living': ['Healthy Plates', 'Warm & Light Bowls'],
    'Family Favorites': ['Tiny Tummy Favorites', 'Lunch Box & Tiffin'],
    'Global Bites': ['Global Breakfasts', 'Global Bowls', 'Global Mains', 'Global Snacks', 'Global Soups', 'Global Street Food'],
    'Kitchen Essentials': ['Sides, Salads & Add-ons', 'Chutneys, Podis & Condiments'],
    'Seasonal Specials': ['Summer Cooling', 'Rainy Day Cravings'],
    'Celebrations & Traditions': ['Festival Sweets', 'Regional Sweets', 'Everyday Desserts', 'Prasadam & Temple Foods'],
  };
  const generatedCollectionDescriptions = {
    Karnataka: 'Mains, saaru, snacks and sweets from Karnataka.',
    'Andhra & Telangana': 'Spicy Telugu-region comfort and festive dishes.',
    'Tamil Nadu': 'Breakfast staples, rasam, snacks and Tamil classics.',
    Kerala: 'Coconut-rich breakfasts, curries and gentle meals.',
    Bengal: 'Fish curries, sweets and Kolkata favourites.',
    Maharashtra: 'Street snacks, coastal dishes and daily comforts.',
    Northeast: 'Distinctive bowls, stews and regional anchors.',
    'North & West India': 'Home classics from northern and western kitchens.',
    'Jammu & Kashmir': 'Kashmiri and Himalayan comfort dishes.',
    'Daily Comforts': 'Everyday mains and familiar home plates.',
    'Tea Time Favourites': 'Snacks, drinks and local legends for small breaks.',
    'Home Staples': 'Simple everyday dishes for the regular kitchen.',
    'Healthy Plates': 'Balanced, protein-forward and lighter picks.',
    'Warm & Light Bowls': 'Soups, rasam and softer warm bowls.',
    'Tiny Tummy Favorites': 'Gentle baby and toddler-friendly foods.',
    'Lunch Box & Tiffin': 'Packable family and kid-friendly ideas.',
    'Global Breakfasts': 'Global morning plates and egg-forward starts.',
    'Global Bowls': 'Rice, noodle and protein bowls with global comfort.',
    'Global Mains': 'Fried rice, Asian comforts and continental-style mains.',
    'Global Snacks': 'Indo-Chinese starters, quick bites and shareable plates.',
    'Global Soups': 'Clear soups, noodle soups and cozy global bowls.',
    'Global Street Food': 'Handheld, loaded and street-style global bites.',
    'Sides, Salads & Add-ons': 'Sides, salads, palyas and meal add-ons.',
    'Chutneys, Podis & Condiments': 'Small but mighty flavour boosters.',
    'Summer Cooling': 'Cooling drinks and lighter seasonal comforts.',
    'Rainy Day Cravings': 'Warm, cozy dishes for grey skies.',
    'Festival Sweets': 'Sweets and treats for celebration days.',
    'Regional Sweets': 'State-loved sweets and nostalgic classics.',
    'Everyday Desserts': 'Small sweet endings for ordinary days.',
    'Prasadam & Temple Foods': 'Temple-style and devotional foods.',
  };
  const generatedCollectionDisplaySections = {
    'Regional Journeys::Karnataka': ['Breakfast & Tiffin', 'Mains & Meals', 'Saaru, Rasam & Soups', 'Snacks & Street Bites', 'Sweets & Drinks'],
    'Regional Journeys::Andhra & Telangana': ['Breakfast & Tiffin', 'Spicy Mains', 'Pappu, Pulusu & Rasam', 'Snacks', 'Sweets'],
    'Regional Journeys::Tamil Nadu': ['Breakfast & Tiffin', 'Meals & Mains', 'Rasam, Kuzhambu & Kootu', 'Snacks', 'Sweets & Drinks'],
    'Regional Journeys::Kerala': ['Breakfast Staples', 'Curries & Mains', 'Seafood', 'Snacks', 'Sweets & Drinks'],
    'Regional Journeys::Bengal': ['Fish & Mains', 'Comfort Plates', 'Street Snacks', 'Sweets'],
    'Regional Journeys::Maharashtra': ['Breakfast & Street Food', 'Mains & Bhakri Plates', 'Seafood & Konkan', 'Snacks', 'Sweets & Drinks'],
    'Regional Journeys::Northeast': ['Rice, Stews & Mains', 'Smoked & Fermented', 'Greens & Sides', 'Snacks', 'Sweets'],
    'Regional Journeys::North & West India': ['Comfort Mains', 'Breads & Rice Plates', 'Street Food & Snacks', 'Sweets', 'Drinks'],
    'Regional Journeys::Jammu & Kashmir': ['Wazwan & Mains', 'Rice & Breads', 'Drinks', 'Sweets'],
    'Everyday Cooking::Daily Comforts': ['Quick Comforts', 'Rice & Dal Meals', 'Breakfast Staples', 'Simple Dinner Ideas'],
    'Everyday Cooking::Tea Time Favourites': ['Hot Drinks', 'Bakery Bites', 'Chai Snacks', 'Street Bites'],
    'Everyday Cooking::Home Staples': ['Simple Mains', 'Quick Staples', 'Pantry Friendly'],
    'Healthy Living::Healthy Plates': ['Protein Breakfasts', 'Protein Mains', 'Light Bowls', 'Quick Healthy'],
    'Healthy Living::Warm & Light Bowls': ['Soups', 'Rasam & Saaru', 'Light Stews', 'Sick-Day Comfort'],
    'Family Favorites::Tiny Tummy Favorites': ['First Foods', 'Purees & Mashes', 'Growing Bites', 'Little Plates'],
    'Family Favorites::Lunch Box & Tiffin': ['Quick Morning Wins', 'Tiffin Box Favorites', 'Protein Packed', 'After School Snacks'],
    'Global Bites::Global Breakfasts': ['Egg Breakfasts', 'Toast & Bakery', 'Sweet Breakfasts', 'Healthy Breakfasts'],
    'Global Bites::Global Bowls': ['Rice Bowls', 'Noodle Bowls', 'Protein Bowls', 'Vegetarian Bowls'],
    'Global Bites::Global Mains': ['Fried Rice & Indo-Chinese', 'Asian Comforts', 'Mediterranean Plates', 'Continental Classics'],
    'Global Bites::Global Snacks': ['Indo-Chinese Starters', 'Wraps & Rolls', 'Dips & Plates', 'Quick Bites'],
    'Global Bites::Global Soups': ['Clear Soups', 'Indo-Chinese Soups', 'Veg Soups', 'Noodle Soups'],
    'Global Bites::Global Street Food': ['Street Wraps', 'Tacos & Quesadillas', 'Loaded Snacks', 'Handheld Bites'],
    'Kitchen Essentials::Sides, Salads & Add-ons': ['Palyas, Poriyals & Thorans', 'Raitas & Cooling Sides', 'Salads & Fresh Sides', 'Sundals & Add-ons'],
    'Kitchen Essentials::Chutneys, Podis & Condiments': ['Chutneys', 'Podis', 'Pickles', 'Raitas', 'Condiments'],
    'Seasonal Specials::Summer Cooling': ['Coolers', 'Light Meals', 'Cooling Sides', 'Summer Sweets'],
    'Seasonal Specials::Rainy Day Cravings': ['Hot Snacks', 'Warm Bowls', 'Chai Companions'],
    'Celebrations & Traditions::Festival Sweets': ['Classic Sweets', 'Festival Specials', 'Payasam & Kheer', 'Fried Sweets'],
    'Celebrations & Traditions::Regional Sweets': ['Karnataka Sweets', 'Bengali Sweets', 'North Indian Sweets', 'South Indian Sweets'],
    'Celebrations & Traditions::Everyday Desserts': ['Quick Sweets', 'Milk Sweets', 'Fruit Desserts'],
    'Celebrations & Traditions::Prasadam & Temple Foods': ['Prasadam', 'Temple Foods', 'Festival Offerings'],
  };
  const allowedRecipeRoles = ['main', 'side', 'condiment', 'snack', 'drink', 'dessert', 'soup'];
  const generatedRegionalCoverageRules = {
    Karnataka: ['karnataka', 'old mysore', 'bengaluru', 'bangalore', 'udupi', 'mangalorean', 'mangalore', 'mangaluru', 'kodagu', 'coorg', 'malnad', 'dharwad', 'mandya', 'mysore', 'mysuru'],
    'Andhra & Telangana': ['andhra', 'telangana', 'telugu', 'hyderabad', 'hyderabadi', 'guntur'],
    'Tamil Nadu': ['tamil nadu', 'tamil', 'chettinad', 'kongu nadu', 'kongunadu', 'chennai', 'madras'],
    Kerala: ['kerala', 'malabar', 'travancore', 'kochi', 'cochin'],
    Bengal: ['bengal', 'bengali', 'kolkata'],
    Maharashtra: ['maharashtra', 'maharashtrian', 'kolhapur', 'malvan', 'malvani', 'konkan', 'konkani', 'mumbai', 'pune'],
    Northeast: ['northeast', 'north east', 'assam', 'assamese', 'manipur', 'manipuri', 'nagaland', 'meghalaya', 'khasi', 'tibet', 'himalayan'],
    'North & West India': [],
    'Jammu & Kashmir': ['jammu', 'kashmir', 'kashmiri'],
  };
  const baseCollections = window.COOKBUDDY_LOCAL_COLLECTIONS?.collections || [];
  const mobileCollectionsBase = baseCollections.some((collection) => collection.key === 'gym-foods')
    ? baseCollections
    : [...baseCollections, buildGymFoodsCollection()];
  const mobileCollections = [
    ...mobileCollectionsBase.map(mobileCollectionOverride),
    buildSidesAddOnsCollection(),
    buildGlobalBitesCollection()
  ];
  const collectionOrder = ['baby', 'lunchbox', 'drinks', 'soups', 'salads', 'sides-addons', 'desserts', 'festival', 'gym-foods', 'global-bites'];
  const manualCollections = collectionOrder
    .map((key) => mobileCollections.find((collection) => collection.key === key))
    .filter(Boolean)
    .map((collection) => collection.key === 'festival' ? { ...collection, title: 'Celebrations' } : collection);
  const generatedCollectionSystem = buildGeneratedCollectionSystem();
  const collections = USE_GENERATED_COLLECTIONS && generatedCollectionSystem.hubs.length ? generatedCollectionSystem.hubs : manualCollections;
  const collectionRoutes = USE_GENERATED_COLLECTIONS && generatedCollectionSystem.hubs.length
    ? [...generatedCollectionSystem.hubs, ...generatedCollectionSystem.collections]
    : manualCollections;
  const pantryCatalog = window.COOKBUDDY_PANTRY_CATALOG || [];
  const ingredientAvailability = window.TomoIngredientAvailability?.ingredientAvailability;
  const availabilityIngredientMatches = window.TomoIngredientAvailability?.ingredientMatches;

  const state = {
    screen: 'discover',
    discoverView: 'moods',
    mood: '',
    meal: 'breakfast',
    collectionKey: collections[0]?.key || '',
    collectionHubKey: '',
    subcategory: '',
    activeRecipeId: '',
    expandedPairingsRecipeId: '',
    quickGuideExpanded: false,
    dishOrigin: 'discover',
    kitchenTab: 'pantry',
    shoppingMode: false,
    cartUnlocksExpanded: false,
    journalScrollY: 0,
    discoverScrollY: 0,
    collectionScrollY: 0,
    tabScroll: { discover: 0, kitchen: 0, journal: 0 },
    searchOpen: false,
    searchQuery: '',
    feedbackOpen: false,
    feedbackType: 'Incorrect dish',
    feedbackDish: '',
    feedbackMessage: '',
    feedbackError: '',
    feedbackThanks: false,
    journalSavedExpanded: false,
    journalRecentExpanded: false,
    journalActivityExpanded: false,
    toast: '',
    analyticsEvents: normalizeAnalyticsEvents(readJson('tomo_mobile_v2_analytics_events', [])),
    tomoPickViewedThisSession: new Set(),
    dishMemory: normalizeDishMemory(readJson('tomo_mobile_v2_dish_memory', [])),
    cookedDishes: normalizeDishRecords(readJson('tomo_mobile_v2_cooked', [])),
    activeTomoPick: null,
    tomoPickRecent: readJson('tomo_mobile_v2_recent_picks', []),
    tomoPickCursor: Number(readJson('tomo_mobile_v2_pick_cursor', 0)) || 0,
    dismissedToday: [],
    todaysPickScores: {},
    microMealsExpanded: false,
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
    festival: '/assets/images/collections/festival-food.webp',
    'gym-foods': '/assets/images/collections/power-plates-collection-card.png?v=collection-card-images-68',
    'sides-addons': '/assets/images/collections/sides-addons-collection-card.png?v=collection-card-images-68',
    'global-bites': '/assets/images/dishes/noodles.png'
  };

  const pairingTypes = ['sides', 'chutneys', 'pickles', 'drinks', 'rice', 'roti', 'toppings'];
  const regionTagTypes = ['region', 'subRegion', 'cuisine'];
  const dietaryTagTypes = ['vegetarian', 'egg', 'non_vegetarian', 'no_onion_no_garlic', 'jain'];
  const recommendationSurfaces = ['tomo_pick', 'todays_picks', 'pantry', 'related'];
  const recommendationScoreKeys = ['mood', 'memory', 'feedback', 'recency', 'dietary', 'regional', 'pantry', 'diversity'];
  const recommendationSurfaceWeights = {
    tomo_pick: { mood: 0.30, memory: 0.12, feedback: 0.08, recency: 0.18, dietary: 0.075, regional: 0.075, pantry: 0.05, diversity: 0.12 },
    todays_picks: { mood: 0.60, memory: 0.08, feedback: 0.07, recency: 0.08, dietary: 0.05, regional: 0.04, pantry: 0.01, diversity: 0.07 },
    pantry: { mood: 0.05, memory: 0.05, feedback: 0.05, recency: 0, dietary: 0.10, regional: 0.05, pantry: 0.70, diversity: 0 },
    related: { mood: 0.32, memory: 0.10, feedback: 0.08, recency: 0.14, dietary: 0.06, regional: 0.10, pantry: 0.04, diversity: 0.16 }
  };
  const sideAddOnCollectionTitles = new Set([
    'coconut chutney',
    'tomato chutney',
    'peanut chutney',
    'mint chutney',
    'beans poriyal',
    'cabbage thoran',
    'beetroot palya',
    'potato palya',
    'cucumber raita',
    'onion raita',
    'mint raita',
    'boondi raita',
    'corn sundal',
    'peanut sundal',
    'sundal',
    'kosambari'
  ]);

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

  function normalizeDishMemory(items) {
    return (Array.isArray(items) ? items : []).map((item) => {
      if (!item || typeof item !== 'object') return null;
      const action = norm(item.action);
      if (!['saved', 'cooked', 'dismissed', 'helpful', 'not helpful'].includes(action)) return null;
      return {
        dishId: item.dishId || item.recipeId || item.id || '',
        dishName: item.dishName || item.title || '',
        action,
        timestamp: item.timestamp || new Date().toISOString(),
        source: item.source || 'mobile-v2'
      };
    }).filter((item) => item && (item.dishId || item.dishName));
  }

  function normalizeAnalyticsEvents(items) {
    return (Array.isArray(items) ? items : []).map((item) => {
      if (!item || typeof item !== 'object') return null;
      return {
        eventName: String(item.eventName || '').trim(),
        timestamp: item.timestamp || new Date().toISOString(),
        source: item.source || 'mobile-v2',
        metadata: item.metadata && typeof item.metadata === 'object' ? item.metadata : {}
      };
    }).filter((item) => item && item.eventName);
  }

  function normalizePairingList(value) {
    const items = Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
    const seen = new Set();
    return items
      .map((item) => String(item || '').trim())
      .filter((item) => {
        const key = norm(item);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function normalizePairings(pairings) {
    const source = pairings && typeof pairings === 'object' && !Array.isArray(pairings) ? pairings : {};
    return pairingTypes.reduce((normalized, type) => {
      normalized[type] = normalizePairingList(source[type]);
      return normalized;
    }, {});
  }

  function recipePairings(recipe) {
    return normalizePairings(recipe?.pairings);
  }

  function recipePairingList(recipe, type) {
    return pairingTypes.includes(type) ? recipePairings(recipe)[type] : [];
  }

  function hasRecipePairings(recipe) {
    const pairings = recipePairings(recipe);
    return pairingTypes.some((type) => pairings[type].length > 0);
  }

  function normalizeRegionTags(regionTags) {
    const source = regionTags && typeof regionTags === 'object' && !Array.isArray(regionTags) ? regionTags : {};
    return regionTagTypes.reduce((normalized, type) => {
      normalized[type] = normalizePairingList(source[type]);
      return normalized;
    }, {});
  }

  function recipeRegionTags(recipe) {
    return normalizeRegionTags(recipe?.regionTags);
  }

  function recipeRegions(recipe) {
    return recipeRegionTags(recipe).region;
  }

  function recipeSubRegions(recipe) {
    return recipeRegionTags(recipe).subRegion;
  }

  function recipeCuisines(recipe) {
    return recipeRegionTags(recipe).cuisine;
  }

  function hasRegionTags(recipe) {
    const regionTags = recipeRegionTags(recipe);
    return regionTagTypes.some((type) => regionTags[type].length > 0);
  }

  function normalizeDietaryTags(value) {
    const items = Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
    const allowed = new Set(dietaryTagTypes);
    const seen = new Set();
    return items
      .map((item) => norm(item).replace(/-/g, '_'))
      .filter((item) => {
        if (!allowed.has(item) || seen.has(item)) return false;
        seen.add(item);
        return true;
      });
  }

  function recipeDietaryTags(recipe) {
    return normalizeDietaryTags(recipe?.dietaryTags);
  }

  function hasDietaryTag(recipe, tag) {
    const normalizedTag = norm(tag).replace(/-/g, '_');
    return recipeDietaryTags(recipe).includes(normalizedTag);
  }

  function isVegetarianDish(recipe) {
    return hasDietaryTag(recipe, 'vegetarian');
  }

  function isEggDish(recipe) {
    return hasDietaryTag(recipe, 'egg');
  }

  function isNonVegetarianDish(recipe) {
    return hasDietaryTag(recipe, 'non_vegetarian');
  }

  function isNoOnionNoGarlicDish(recipe) {
    return hasDietaryTag(recipe, 'no_onion_no_garlic');
  }

  function isJainDish(recipe) {
    return hasDietaryTag(recipe, 'jain');
  }

  function normalizeRecommendationSurface(surface) {
    const normalized = String(surface || '').toLowerCase().trim().replace(/[-\s]+/g, '_');
    return recommendationSurfaces.includes(normalized) ? normalized : 'tomo_pick';
  }

  function emptyRecommendationScores() {
    return recommendationScoreKeys.reduce((scores, key) => {
      scores[key] = 0;
      return scores;
    }, {});
  }

  function boundedScore(value) {
    const score = Number(value);
    if (!Number.isFinite(score)) return 0;
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  function recommendationConfidence(finalScore, eligible, scores = emptyRecommendationScores(), context = {}) {
    if (!eligible || finalScore < 35) return 'low';
    const supportingSignals = Object.values(scores).filter((score) => Number(score) >= 65).length;
    const weakSignals = Object.values(scores).filter((score) => Number(score) > 0 && Number(score) < 35).length;
    if (normalizeRecommendationSurface(context.surface) === 'pantry') {
      const breakdown = recommendationPantryBreakdown(context.recipe, context);
      if (scores.pantry >= 85 && breakdown.matchedCore.length && !breakdown.missingCore.length) return 'high';
    }
    if (finalScore >= 70 || (finalScore >= 65 && supportingSignals >= 3 && weakSignals === 0)) return 'high';
    if (finalScore < 45 || weakSignals >= 3) return 'low';
    return 'medium';
  }

  function recommendationHistoryStrength() {
    const events = dishMemoryEvents().filter((event) => ['saved', 'cooked', 'helpful', 'not helpful', 'dismissed'].includes(event.action));
    return Math.min(1, events.length / 20);
  }

  function recommendationSurfaceWeightsFor(surface, context = {}) {
    const base = { ...(recommendationSurfaceWeights[surface] || recommendationSurfaceWeights.tomo_pick) };
    if (surface === 'pantry') return base;
    const historyStrength = Number.isFinite(Number(context.historyStrength))
      ? Math.max(0, Math.min(1, Number(context.historyStrength)))
      : recommendationHistoryStrength();
    const explorationShare = Math.max(0.10, 0.15 - (historyStrength * 0.05));
    const diversityShare = Math.max(0.20, 0.25 - (historyStrength * 0.05));
    const preferenceScale = 0.60 + (historyStrength * 0.10);
    const explorationScale = 1 + explorationShare;
    const diversityScale = 1 + diversityShare;
    ['memory', 'feedback', 'regional', 'dietary'].forEach((key) => {
      base[key] = Number(base[key] || 0) * (0.85 + preferenceScale);
    });
    base.recency = Number(base.recency || 0) * explorationScale;
    base.diversity = Number(base.diversity || 0) * diversityScale;
    const total = Object.values(base).reduce((sum, value) => sum + Number(value || 0), 0) || 1;
    return Object.fromEntries(Object.entries(base).map(([key, value]) => [key, Number(value || 0) / total]));
  }

  function weightedRecommendationScore(scores, surface, context = {}) {
    const weights = recommendationSurfaceWeightsFor(surface, context);
    const weighted = recommendationScoreKeys.reduce((sum, key) => {
      return sum + boundedScore(scores[key]) * Number(weights[key] || 0);
    }, 0);
    return boundedScore(weighted);
  }

  function recommendationList(value) {
    if (value instanceof Set) return normalizePairingList([...value]);
    return normalizePairingList(value);
  }

  function recommendationSelectedIngredients(context = {}) {
    const provided = context.selectedIngredients || context.pantryIngredients;
    if (provided !== undefined) return recommendationList(provided);
    return recommendationList(state.selectedIngredients || []);
  }

  function recommendationDietaryPreference(context = {}) {
    const source = context.dietaryPreference || context.dietaryPreferences || context.dietaryTags;
    const objectSource = source && typeof source === 'object' && !Array.isArray(source) && !(source instanceof Set) ? source : {};
    const tags = normalizeDietaryTags(
      objectSource.tags
      || objectSource.dietaryTags
      || objectSource.preference
      || source
    );
    const vegetarianOnly = Boolean(
      context.vegetarian
      || context.vegetarianOnly
      || objectSource.vegetarian
      || objectSource.vegetarianOnly
      || tags.includes('vegetarian')
    );
    const eggAllowed = Boolean(
      context.allowEgg
      || context.eggAllowed
      || objectSource.allowEgg
      || objectSource.eggAllowed
      || tags.includes('egg')
    );
    return { tags, vegetarianOnly, eggAllowed };
  }

  function recipeInActivePool(recipe) {
    if (!recipe) return false;
    return recipes.some((item) => {
      return (recipe.id && item.id === recipe.id) || norm(item.title) === norm(recipe.title);
    });
  }

  function recipeFeedHidden(recipe) {
    const visibility = norm(recipe?.feedVisibility || recipe?.feed_visibility || recipe?.visibility || '');
    return visibility === 'pantry search only'
      || visibility === 'pantry-search-only'
      || recipe?.heroEligible === false
      || recipe?.todaysPicksEligible === false;
  }

  function recommendationRoleText(recipe) {
    return [
      recipe?.title,
      recipe?.recipeRole,
      recipe?.recipe_role,
      recipe?.category,
      recipe?.dishFamily,
      recipe?.dish_family,
      recipe?.mealType,
      recipe?.meal_type,
      recipe?.type,
      ...(recipe?.tags || []),
      ...(recipe?.mealTags || []),
      ...(recipe?.moodTags || [])
    ].map(norm).join(' ');
  }

  function normalizedRecipeRole(value) {
    const role = norm(value);
    return allowedRecipeRoles.includes(role) ? role : '';
  }

  function recommendationRecipeRole(recipe) {
    const explicitRole = normalizedRecipeRole(recipe?.recipeRole || recipe?.recipe_role || '');
    if (explicitRole) return explicitRole;
    const text = recommendationRoleText(recipe);
    const title = norm(recipe?.title || '');
    if (/\b(chutney|raita|pickle|podi|dip)\b/.test(title)) return 'condiment';
    if (/\b(condiment|dip|spread|pickle|podi)\b/.test(text)) return 'condiment';
    if (/\b(chai|tea|coffee|buttermilk|chaas|lassi|sharbat|juice|water|drink|neer mor|jal jeera|ajwain water|jeera water|sattu drink|ragi malt|panakam|sherbet|milkshake)\b/.test(text)) return 'drink';
    if (/\b(soup|rasam|saaru|stew|thukpa)\b/.test(text)) return 'soup';
    if (/\b(kheer|payasam|halwa|ladoo|laddu|barfi|burfi|jamun|rasgulla|rasmalai|peda|sandesh|kalakand|malpua|kulfi|falooda|sheera|modak|gujiya|katli|dessert|traditional sweet|festival sweet|milk dessert)\b/.test(text)) return 'dessert';
    if (/\b(samosa|pakora|bajji|bonda|kachori|vada|momos|chaat|sundal|dhokla|khandvi|paniyaram|kodubale|mathri|roll|sandwich|toast|cutlet|tikki)\b/.test(title)) return 'snack';
    if (/\b(palya|poriyal|thoran|kosambari|pachadi)\b/.test(title)) return 'side';
    if (sideAddOnCollectionTitles.has(title)) return 'side';
    if (/\b(side|sides|add on|add ons|addon|addons|accompaniment|tempering)\b/.test(text)) return 'side';
    return 'main';
  }

  function recommendationRolePenalty(recipe, surface = 'mood') {
    const role = recommendationRecipeRole(recipe);
    const penalties = surface === 'hero'
      ? { main: 0, snack: 8, side: 120, condiment: 180, drink: 140, dessert: 80, soup: 35 }
      : surface === 'todays_picks'
        ? { main: 0, snack: 6, side: 95, condiment: 150, drink: 80, dessert: 45, soup: 20 }
        : { main: 0, snack: 10, side: 90, condiment: 140, drink: 70, dessert: 35, soup: 15 };
    return penalties[role] || 0;
  }

  function recommendationSideRoleReason(recipe) {
    const role = recommendationRecipeRole(recipe);
    return role === 'main' ? '' : role;
  }

  function isRecommendationSideDish(recipe) {
    return ['side', 'condiment'].includes(recommendationRecipeRole(recipe));
  }

  function roleContextText(context = {}) {
    return [
      context.mood,
      context.meal,
      context.surface,
      context.collectionKey,
      context.intent,
      context.reason,
      ...(context.tags || [])
    ].map(norm).join(' ');
  }

  function roleContextAllowsSoup(context = {}) {
    const text = roleContextText(context);
    const hour = new Date().getHours();
    return /\b(rainy|comfort|light|sick|soup|warm bowl|warm bowls|evening|dinner)\b/.test(text)
      || hour >= 16
      || hour < 5;
  }

  function roleContextAllowsDrink(context = {}) {
    const text = roleContextText(context);
    return /\b(drink|drinks|sip|sips|soother|soothers|chai|tea|coffee|juice|beverage)\b/.test(text)
      || (/\bsnack\b/.test(text) && /\b(rainy|comfort|evening)\b/.test(text));
  }

  function isWarmDrinkRecipe(recipe) {
    const haystack = `${norm(recipe?.title)} ${tags(recipe).join(' ')} ${dishFamily(recipe)}`;
    return recommendationRecipeRole(recipe) === 'drink'
      && /\b(chai|tea|coffee|kashaya)\b/.test(haystack);
  }

  function roleContextAllowsDessert(context = {}) {
    return /\b(dessert|desserts|sweet|sweets|treat|festival|celebration)\b/.test(roleContextText(context));
  }

  function recipeBreakfastSignalText(recipe) {
    return [
      recipe?.category,
      recipe?.mealCategory,
      recipe?.meal_category,
      recipe?.dishFamily,
      recipe?.dish_family,
      recipe?.mealType,
      recipe?.meal_type,
      ...(recipe?.mealTags || []),
      ...(recipe?.meal_tags || []),
      ...(recipe?.tags || [])
    ].map(norm).join(' ');
  }

  function hasBreakfastSignal(recipe) {
    const title = norm(recipe?.title || '');
    const text = recipeBreakfastSignalText(recipe);
    return /\bbreakfast\b/.test(text)
      || /\b(idli|dosa|uttapam|pongal|upma|poha|sevai|cheela|chilla|paratha|sandwich|toast|porridge|oats|appam|puttu|omelette)\b/.test(title)
      || /\begg\b.*\bbhurji\b|\bbhurji\b.*\begg\b/.test(title);
  }

  function breakfastRecommendationEligible(recipe) {
    if (!hasBreakfastSignal(recipe)) return false;
    const role = recommendationRecipeRole(recipe);
    if (role === 'main') return true;
    if (role === 'snack') return proteinRichRecipe(recipe, tags(recipe).join(' '));
    return false;
  }

  function heroRoleEligible(recipe, mood = state.mood, meal = state.meal) {
    const role = recommendationRecipeRole(recipe);
    if (meal === 'breakfast') return breakfastRecommendationEligible(recipe);
    if (role === 'main') return true;
    if (role === 'soup') return roleContextAllowsSoup({ mood, meal, surface: 'tomo_pick' });
    if (role === 'snack') return meal === 'snack' && /\b(rainy|quick|protein|spicy)\b/.test(norm(mood));
    return false;
  }

  function todaysPickRoleEligible(recipe, meal = state.meal, context = {}) {
    const role = recommendationRecipeRole(recipe);
    if (role === 'condiment') return false;
    if (role === 'side') return /\b(side|sides|add on|add ons|addon|addons|accompaniment)\b/.test(roleContextText(context));
    if (meal === 'snack') {
      if (role === 'snack') return true;
      if (role === 'drink') return roleContextAllowsDrink({ ...context, meal });
      if (role === 'dessert') return roleContextAllowsDessert({ ...context, meal });
      return false;
    }
    if (meal === 'breakfast') return breakfastRecommendationEligible(recipe);
    if (['lunch', 'dinner'].includes(meal)) return role === 'main' || role === 'soup';
    return role === 'main';
  }

  function proteinRichRecipe(recipe, haystack = '') {
    return Number(recipe?.proteinScore || 0) >= 6
      || /\b(protein|egg|paneer|chicken|fish|mutton|pork|dal|lentil|moong|chana|chickpea|rajma|tofu|soy|soya|sprout|peanut|sundal)\b/.test(haystack);
  }

  function elaborateDessertRecipe(recipe, haystack = '') {
    return totalTime(recipe) > 30
      || /\b(festival|traditional sweet|festival sweet|milk dessert|halwa|jamun|rasgulla|rasmalai|malpua|kulfi|falooda|basundi)\b/.test(haystack);
  }

  function moodRoleAdjustment(recipe, mood, haystack = tags(recipe).join(' ')) {
    const role = recommendationRecipeRole(recipe);
    const proteinRich = proteinRichRecipe(recipe, haystack);
    const elaborateDessert = role === 'dessert' && elaborateDessertRecipe(recipe, haystack);
    if (mood === 'rainy') {
      if (role === 'soup') return 12;
      if (role === 'snack') return 8;
      if (role === 'drink' && /\b(chai|tea|coffee|kashaya)\b/.test(haystack)) return 7;
      if (role === 'condiment') return -12;
      if (role === 'side') return -8;
      if (role === 'dessert') return -4;
      return 0;
    }
    if (mood === 'comfort') {
      if (role === 'soup') return 8;
      if (role === 'main') return 6;
      if (role === 'condiment') return -16;
      if (role === 'side') return -8;
      if (role === 'drink') return -8;
      if (role === 'dessert') return -4;
      if (role === 'snack') return -2;
      return 0;
    }
    if (mood === 'protein') {
      if (role === 'main') return 6;
      if (role === 'snack') return proteinRich ? 6 : -3;
      if (role === 'soup') return proteinRich ? 4 : 0;
      if (role === 'dessert' || role === 'drink') return proteinRich ? 2 : -14;
      if (role === 'condiment') return -12;
      if (role === 'side') return proteinRich ? 0 : -8;
      return 0;
    }
    if (mood === 'quick') {
      if (role === 'snack') return 6;
      if (role === 'main') return 4;
      if (role === 'drink') return 3;
      if (role === 'dessert') return elaborateDessert ? -12 : -4;
      if (role === 'soup') return -3;
      if (role === 'condiment') return -10;
      if (role === 'side') return -6;
      return 0;
    }
    if (mood === 'spicy') {
      if (role === 'snack') return 6;
      if (role === 'main') return 5;
      if (role === 'soup') return 4;
      if (role === 'dessert') return -16;
      if (role === 'drink') return -8;
      if (role === 'side') return -8;
      if (role === 'condiment') return -4;
      return 0;
    }
    if (mood === 'soul') {
      if (role === 'main') return 8;
      if (role === 'soup') return 5;
      if (role === 'condiment') return -10;
      if (role === 'drink') return -8;
      if (role === 'snack') return -6;
      if (role === 'side') return -5;
      if (role === 'dessert') return -4;
      return 0;
    }
    return 0;
  }

  function pantryCompatibleRecipe(recipe) {
    return Boolean(recipe && recipeIngredients(recipe).length > 0);
  }

  function recipeProteinRequirements(recipe) {
    const haystack = [
      recipe?.title,
      recipe?.description,
      recipe?.dietType,
      recipe?.cuisine,
      ...(recipe?.tags || []),
      ...recipeDietaryTags(recipe),
      ...recipeIngredients(recipe).map((item) => item.name)
    ].map(norm).join(' ');
    const requirements = [];
    if (/\b(chicken|kodi|country chicken)\b/.test(haystack)) requirements.push('chicken');
    if (/\b(fish|prawn|shrimp)\b/.test(haystack)) requirements.push('fish');
    if (/\bpaneer\b/.test(haystack)) requirements.push('paneer');
    if (/\b(egg|eggs|omelette)\b/.test(haystack) || isEggDish(recipe)) requirements.push('egg');
    if (/\b(mutton|laal maas|keema|kheema|minced meat)\b/.test(haystack)) requirements.push('mutton');
    if (/\bpork\b/.test(haystack)) requirements.push('pork');
    if (/\b(soy|soya|tofu|edamame)\b/.test(haystack)) requirements.push('soy_tofu');
    return [...new Set(requirements)];
  }

  function recommendationIngredientMatches(ingredient, selectedIngredients) {
    return selectedIngredients.some((name) => ingredientMatchesSelection(ingredient.normalized, norm(name)));
  }

  function recommendationPantryBreakdown(recipe, context = {}) {
    const selected = recommendationSelectedIngredients(context);
    const ingredients = recipeIngredients(recipe);
    const required = ingredients.filter((item) => item.required && !isNiceToHaveIngredient(item));
    const core = ingredients.filter((item) => item.main && !isNiceToHaveIngredient(item));
    const optional = ingredients.filter((item) => !item.required || isNiceToHaveIngredient(item));
    const matchedSelected = selected.filter((name) => ingredients.some((item) => ingredientMatchesSelection(item.normalized, norm(name))));
    const matchedCore = core.filter((item) => recommendationIngredientMatches(item, selected));
    const matchedRequired = required.filter((item) => recommendationIngredientMatches(item, selected));
    const matchedOptional = optional.filter((item) => recommendationIngredientMatches(item, selected));
    const missingCore = core.filter((item) => !recommendationIngredientMatches(item, selected));
    const missingRequired = required.filter((item) => !recommendationIngredientMatches(item, selected));
    const selectedIgnored = selected.filter((name) => !ingredients.some((item) => ingredientMatchesSelection(item.normalized, norm(name))));
    const selectedMajorProteinIgnored = selectedIgnored.some((name) => isMajorProtein(norm(name)));
    const missingProteinRequirements = recipeProteinRequirements(recipe)
      .filter((requirement) => !pantryProteinAvailable(requirement, selected));
    const coreTotal = Math.max(core.length, 1);
    const requiredTotal = Math.max(required.length, 1);
    const coreRatio = matchedCore.length / coreTotal;
    const requiredRatio = matchedRequired.length / requiredTotal;
    const missingRequiredPenalty = missingRequired.reduce((sum, item) => {
      if (item.main) return sum + 12;
      if (item.required && item.source !== 'secondary-field') return sum + 7;
      return sum + 3;
    }, 0);
    let tier = 'No Match';
    let score = 0;
    if (selected.length && !selectedMajorProteinIgnored && !missingProteinRequirements.length && matchedSelected.length) {
      if (coreRatio >= 0.85 && requiredRatio >= 0.75 && missingRequired.length <= 1) {
        tier = 'Tier 1';
        score = 85 + Math.round(coreRatio * 8) + Math.min(7, matchedOptional.length * 2) - missingRequiredPenalty;
      } else if (coreRatio >= 0.5 && requiredRatio >= 0.45 && matchedCore.length) {
        tier = 'Tier 2';
        score = 65 + Math.round(coreRatio * 10) + Math.min(9, matchedOptional.length * 2) - Math.min(24, missingRequiredPenalty);
      } else if (matchedCore.length || matchedRequired.length) {
        tier = 'Tier 3';
        score = 35 + matchedCore.length * 10 + matchedRequired.length * 6 + Math.min(6, matchedOptional.length * 2) - Math.min(18, missingRequiredPenalty + missingCore.length * 3);
      }
    }
    return {
      tier,
      score: boundedScore(score),
      selected,
      ingredients,
      required,
      core,
      optional,
      matchedSelected,
      matchedCore,
      matchedRequired,
      matchedOptional,
      missingCore,
      missingRequired,
      missingRequiredPenalty,
      selectedIgnored,
      selectedMajorProteinIgnored,
      missingProteinRequirements
    };
  }

  function pantryProteinAvailable(requirement, selectedIngredients) {
    const selected = selectedIngredients.map(norm);
    const aliases = {
      chicken: ['chicken', 'country chicken'],
      fish: ['fish', 'prawn', 'shrimp'],
      paneer: ['paneer'],
      egg: ['egg', 'eggs'],
      mutton: ['mutton', 'keema', 'kheema', 'minced meat'],
      pork: ['pork'],
      soy_tofu: ['soy', 'soya', 'tofu', 'edamame', 'soya chunks']
    }[requirement] || [requirement];
    return selected.some((name) => aliases.some((alias) => ingredientMatchesSelection(norm(alias), name) || ingredientMatchesSelection(name, norm(alias))));
  }

  function recentRecipeViewed(recipe, context = {}) {
    if (!recipe) return false;
    const recentIds = new Set(recommendationList(context.recentRecipeIds || context.recentViewedRecipeIds));
    if (recipe.id && recentIds.has(recipe.id)) return true;
    const events = normalizeAnalyticsEvents(state.analyticsEvents)
      .filter((event) => event.eventName === 'dish_viewed')
      .filter((event) => daysSince(event.timestamp) <= Number(context.recentViewDays || 1));
    return events.some((event) => {
      const metadata = event.metadata || {};
      return (recipe.id && [metadata.dishId, metadata.recipeId, metadata.id].includes(recipe.id))
        || (metadata.dishName && norm(metadata.dishName) === norm(recipe.title))
        || (metadata.title && norm(metadata.title) === norm(recipe.title));
    });
  }

  function recipeRegionalLabels(recipe) {
    return normalizePairingList([
      recipe?.cuisine,
      ...recipeRegions(recipe),
      ...recipeBroadRegions(recipe),
      ...recipeSubRegions(recipe),
      ...recipeCuisines(recipe)
    ]);
  }

  function recipeBroadRegions(recipe) {
    const labels = normalizePairingList([
      ...recipeRegions(recipe),
      ...recipeSubRegions(recipe),
      ...recipeCuisines(recipe),
      recipe?.cuisine
    ]);
    const broad = [];
    labels.forEach((label) => {
      const value = norm(label);
      if (/northeast|north east|assam|manipur|meghalaya|nagaland|mizoram|tripura|arunachal|sikkim|himalayan/.test(value)) broad.push('Northeast');
      else if (/south|andhra|telangana|tamil|kerala|karnataka|udupi|mangalorean|chettinad|malabar/.test(value)) broad.push('South');
      else if (/north|punjab|punjabi|delhi|rajasthan|rajasthani|kashmir|awadhi|uttar pradesh|bihar|bihari|haryana|himachal/.test(value)) broad.push('North');
      else if (/east|bengal|bengali|odisha|odia|oriya|jharkhand/.test(value)) broad.push('East');
      else if (/west|maharashtra|maharashtrian|gujarat|gujarati|goa|goan|konkan|malvani|kolhapuri/.test(value)) broad.push('West');
      else if (/coastal|konkan|malabar|mangalorean|goan/.test(value)) broad.push('Coastal');
      else if (/pan-indian|pan indian|homestyle|indian fusion|street/.test(value)) broad.push('Pan-Indian');
    });
    return normalizePairingList(broad);
  }

  function primaryBrowseRegion(recipe) {
    const regions = recipeBroadRegions(recipe).filter((region) => region !== 'Global');
    return regions[0] || 'Pan-Indian';
  }

  function recommendationEventWeight(action) {
    return { cooked: 5, saved: 3, helpful: 2, 'not helpful': -2, dismissed: -3 }[action] || 0;
  }

  function recommendationPositiveMemoryEvents() {
    return dishMemoryEvents().filter((event) => ['saved', 'cooked'].includes(event.action));
  }

  function recommendationFeedbackEvents() {
    return dishMemoryEvents().filter((event) => ['helpful', 'not helpful'].includes(event.action));
  }

  function recommendationPreferenceEvents() {
    return dishMemoryEvents().filter((event) => ['saved', 'cooked', 'helpful'].includes(event.action));
  }

  function recommendationWeightedSignals(events, labelForRecipe) {
    const scores = new Map();
    events.forEach((event) => {
      const recipe = dishMemoryRecipe(event);
      if (!recipe) return;
      const weight = recommendationEventWeight(event.action);
      labelForRecipe(recipe).forEach((label) => {
        const key = norm(label);
        if (!key) return;
        scores.set(key, {
          name: label,
          score: (scores.get(key)?.score || 0) + weight
        });
      });
    });
    return [...scores.values()]
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  }

  function recommendationMemoryProfile() {
    const events = recommendationPositiveMemoryEvents();
    return {
      moods: recommendationWeightedSignals(events, (recipe) => [moodLabel(recipe)]),
      cuisines: recommendationWeightedSignals(events, (recipe) => [recipe.cuisine].filter(Boolean)),
      regions: recommendationWeightedSignals(events, recipeRegionalLabels),
      mealTypes: recommendationWeightedSignals(events, recipeMealTypes),
      families: recommendationWeightedSignals(events, (recipe) => [dishFamily(recipe)].filter(Boolean))
    };
  }

  function recommendationRegionalProfile() {
    const events = recommendationPreferenceEvents();
    return {
      regions: recommendationWeightedSignals(events, (recipe) => normalizePairingList([...recipeRegions(recipe), ...recipeBroadRegions(recipe)])),
      subRegions: recommendationWeightedSignals(events, recipeSubRegions),
      cuisines: recommendationWeightedSignals(events, (recipe) => normalizePairingList([recipe.cuisine, ...recipeCuisines(recipe)]))
    };
  }

  function signalMatchScore(labels, signals, boost) {
    const normalized = labels.map(norm);
    const match = signals.find((item) => normalized.includes(norm(item.name)));
    return match ? Math.min(boost, Math.max(2, Math.round(match.score))) : 0;
  }

  function feedbackContextMatches(recipe, eventRecipe, context = {}) {
    if (!recipe || !eventRecipe) return false;
    const activeMood = context.mood || state.mood || '';
    const sameMood = norm(moodLabel(recipe)) === norm(moodLabel(eventRecipe));
    const sameActiveMood = activeMood && norm(moodLabel(recipe)) === norm(selectedMoodLabel(activeMood));
    const sameFamily = dishFamily(recipe) === dishFamily(eventRecipe);
    const sameCuisine = recipe.cuisine && norm(recipe.cuisine) === norm(eventRecipe.cuisine);
    return { sameMood, sameActiveMood, sameFamily, sameCuisine };
  }

  function recommendationHardFilters(recipe, context = {}) {
    const reasons = [];
    const surface = normalizeRecommendationSurface(context.surface);
    if (!recipe || typeof recipe !== 'object') reasons.push('missing_recipe');
    if (['tomo_pick', 'todays_picks'].includes(surface) && recipe && !recipeInActivePool(recipe)) reasons.push('inactive_recipe');
    if (['tomo_pick', 'todays_picks'].includes(surface) && recipeFeedHidden(recipe)) reasons.push('pantry_search_only');
    if (surface === 'pantry' && recipe && !pantryCompatibleRecipe(recipe)) reasons.push('not_pantry_compatible');
    const dietary = recommendationDietaryPreference(context);
    if (dietary.vegetarianOnly && isNonVegetarianDish(recipe)) reasons.push('dietary_non_vegetarian');
    if (dietary.vegetarianOnly && !dietary.eggAllowed && isEggDish(recipe)) reasons.push('dietary_egg_not_allowed');
    if (surface === 'pantry' && recipe) {
      const selectedIngredients = recommendationSelectedIngredients(context);
      const missingProteins = recipeProteinRequirements(recipe)
        .filter((requirement) => !pantryProteinAvailable(requirement, selectedIngredients));
      missingProteins.forEach((requirement) => reasons.push(`protein_not_selected_${requirement}`));
    }
    if (['tomo_pick', 'todays_picks'].includes(surface) && memoryExcludedRecipe(recipe)) reasons.push('recently_cooked');
    const dismissedIds = new Set(recommendationList(context.dismissedIds));
    const recentlyDismissed = dishMemoryEvents().some((event) => event.action === 'dismissed' && dishMemoryMatches(recipe, event) && daysSince(event.timestamp) <= 7);
    if (surface === 'todays_picks' && ((recipe?.id && dismissedIds.has(recipe.id)) || recentlyDismissed)) reasons.push('dismissed_recently');
    return reasons;
  }

  function recommendationMoodScore(recipe, context = {}) {
    const mood = context.mood || state.mood || '';
    if (!mood) return 50;
    const score = moodScore(recipe, mood);
    return boundedScore(Math.min(100, Math.max(0, score)));
  }

  function recommendationMemoryScore(recipe, context = {}) {
    if (!recipe) return 0;
    const profile = recommendationMemoryProfile();
    const exactEvents = recommendationPositiveMemoryEvents().filter((event) => dishMemoryMatches(recipe, event));
    const exactCappedBoost = Math.min(3, exactEvents.reduce((sum, event) => sum + Math.max(0, recommendationEventWeight(event.action)), 0));
    const moodBoost = signalMatchScore([moodLabel(recipe)], profile.moods, 14);
    const cuisineBoost = signalMatchScore([recipe.cuisine].filter(Boolean), profile.cuisines, 12);
    const regionBoost = signalMatchScore(recipeRegionalLabels(recipe), profile.regions, 10);
    const mealBoost = signalMatchScore(recipeMealTypes(recipe), profile.mealTypes, 8);
    const familyBoost = signalMatchScore([dishFamily(recipe)], profile.families, 5);
    const recentDismissedFamilyPenalty = dishMemoryEvents().some((event) => {
      if (event.action !== 'dismissed' || daysSince(event.timestamp) > 7) return false;
      const eventRecipe = dishMemoryRecipe(event);
      return eventRecipe && !dishMemoryMatches(recipe, event) && dishFamily(eventRecipe) === dishFamily(recipe);
    }) ? 8 : 0;
    return boundedScore(50 + exactCappedBoost + moodBoost + cuisineBoost + regionBoost + mealBoost + familyBoost - recentDismissedFamilyPenalty);
  }

  function recommendationFeedbackScore(recipe, context = {}) {
    if (!recipe) return 0;
    let score = 50;
    recommendationFeedbackEvents().forEach((event) => {
      const eventRecipe = dishMemoryRecipe(event);
      if (!eventRecipe) return;
      const exact = dishMemoryMatches(recipe, event);
      const contextMatch = feedbackContextMatches(recipe, eventRecipe, context);
      const similarFamily = !exact && contextMatch.sameFamily;
      const similarContext = !exact && (contextMatch.sameMood || contextMatch.sameActiveMood || contextMatch.sameCuisine);
      if (event.action === 'helpful') {
        if (exact) score += 12;
        else {
          if (similarFamily) score += 6;
          if (similarContext) score += 4;
        }
      }
      if (event.action === 'not helpful') {
        if (exact) score -= 22;
        else {
          if (similarFamily && (contextMatch.sameMood || contextMatch.sameActiveMood)) score -= 10;
          else if (similarFamily || similarContext) score -= 6;
        }
      }
    });
    return boundedScore(score);
  }

  function recommendationRecencyScore(recipe, context = {}) {
    if (!recipe) return 0;
    const surface = normalizeRecommendationSurface(context.surface);
    const events = dishMemoryEvents().filter((event) => dishMemoryMatches(recipe, event));
    const recentCooked = events.some((event) => event.action === 'cooked' && daysSince(event.timestamp) <= 5);
    const recentDismissed = events.some((event) => event.action === 'dismissed' && daysSince(event.timestamp) <= 7);
    const recentViewed = recentRecipeViewed(recipe, context);
    const recentShownIds = new Set(recommendationList(context.recentRecipeIds));
    const recentFamilies = new Set(recommendationList(context.recentDishFamilies).map(norm));
    if (recentCooked) return 0;
    let score = 85;
    if (recentDismissed) score -= surface === 'tomo_pick' ? 55 : 35;
    if (recentViewed) score -= 10;
    if (recipe.id && recentShownIds.has(recipe.id)) score -= 25;
    if (recentFamilies.has(dishFamily(recipe))) score -= 15;
    return boundedScore(score);
  }

  function recommendationDietaryScore(recipe, context = {}) {
    const dietary = recommendationDietaryPreference(context);
    const preferred = dietary.tags;
    if (!preferred.length && !dietary.vegetarianOnly) return 50;
    const recipeTags = recipeDietaryTags(recipe);
    if (!recipeTags.length) return 35;
    if (dietary.vegetarianOnly && isVegetarianDish(recipe)) return 75;
    if (dietary.vegetarianOnly && dietary.eggAllowed && isEggDish(recipe)) return 65;
    const matches = preferred.filter((tag) => recipeTags.includes(tag));
    if (!matches.length) return 40;
    const base = matches.includes('vegetarian') ? 75 : matches.includes('egg') ? 70 : matches.includes('non_vegetarian') ? 72 : 65;
    return boundedScore(base + Math.min(10, matches.length * 5));
  }

  function recommendationRegionalScore(recipe, context = {}) {
    if (!recipe) return 0;
    const explicitRegions = normalizePairingList(context.regions || context.regionPreferences);
    const explicitCuisines = normalizePairingList(context.cuisines || context.cuisinePreferences);
    const explicitSubRegions = normalizePairingList(context.subRegions || context.subRegionPreferences);
    const profile = recommendationRegionalProfile();
    const recipeRegionsList = normalizePairingList([...recipeRegions(recipe), ...recipeBroadRegions(recipe)]);
    const recipeSubRegionsList = recipeSubRegions(recipe);
    const recipeCuisineList = normalizePairingList([recipe?.cuisine, ...recipeCuisines(recipe)]);
    let score = 50;
    const explicitCuisineMatches = explicitCuisines.filter((item) => recipeCuisineList.some((value) => norm(value) === norm(item))).length;
    const explicitRegionMatches = explicitRegions.filter((item) => recipeRegionsList.some((value) => norm(value) === norm(item))).length;
    const explicitSubRegionMatches = explicitSubRegions.filter((item) => recipeSubRegionsList.some((value) => norm(value) === norm(item))).length;
    score += explicitCuisineMatches * 15;
    score += explicitRegionMatches * 12;
    score += explicitSubRegionMatches * 10;
    score += signalMatchScore(recipeCuisineList, profile.cuisines, 15);
    score += signalMatchScore(recipeRegionsList, profile.regions, 12);
    score += signalMatchScore(recipeSubRegionsList, profile.subRegions, 10);
    const hasExplicitPreference = explicitCuisines.length || explicitRegions.length || explicitSubRegions.length;
    const hasMemoryPreference = profile.cuisines.length || profile.regions.length || profile.subRegions.length;
    const noMatch = score === 50 && (hasExplicitPreference || hasMemoryPreference);
    if (noMatch && hasRegionTags(recipe)) score += 4;
    if (noMatch && !hasRegionTags(recipe)) score -= 8;
    return boundedScore(score);
  }

  function recommendationPantryScore(recipe, context = {}) {
    if (Number.isFinite(Number(context.pantryScore))) return boundedScore(context.pantryScore);
    const breakdown = recommendationPantryBreakdown(recipe, context);
    if (!breakdown.selected.length) return 50;
    return breakdown.score;
  }

  function recommendationDiversityScore(recipe, context = {}) {
    if (!recipe) return 0;
    let score = 75;
    const recentIds = new Set((context.recentRecipeIds || []).filter(Boolean));
    const recentFamilies = new Set((context.recentDishFamilies || []).map(norm).filter(Boolean));
    const recentRegions = new Set((context.recentRegions || []).map(norm).filter(Boolean));
    if (recipe.id && recentIds.has(recipe.id)) score -= 35;
    if (recentFamilies.has(dishFamily(recipe))) score -= 25;
    if (recipeBroadRegions(recipe).some((region) => recentRegions.has(norm(region)))) score -= 18;
    return boundedScore(score);
  }

  function recommendationScoreExplanation(scores, context = {}) {
    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const strongest = entries.filter(([, score]) => score >= 70).slice(0, 2).map(([key]) => `${titleCase(key)} signal is strong`);
    const weakest = entries.filter(([, score]) => score > 0 && score < 35).slice(0, 1).map(([key]) => `${titleCase(key)} signal is weak`);
    const surface = normalizeRecommendationSurface(context.surface);
    const dietary = recommendationDietaryPreference(context);
    const dietaryLine = [];
    const recipeTags = recipeDietaryTags(context.recipe);
    if (dietary.vegetarianOnly && isVegetarianDish(context.recipe)) dietaryLine.push('matches vegetarian preference');
    if (dietary.eggAllowed && isEggDish(context.recipe)) dietaryLine.push('matches egg preference');
    if (dietary.tags.includes('non_vegetarian') && recipeTags.includes('non_vegetarian')) dietaryLine.push('matches non-vegetarian preference');
    const recencyLine = scores.recency < 45 ? ['dismissed recently or recently shown'] : [];
    const pantryLines = [];
    if (surface === 'pantry') {
      const breakdown = recommendationPantryBreakdown(context.recipe, context);
      if (breakdown.score >= 85) pantryLines.push('strong pantry match');
      if (breakdown.matchedSelected.length) pantryLines.push(`uses your ${joinList(breakdown.matchedSelected.map(titleCase))}`);
      if (breakdown.missingRequired.length === 1) pantryLines.push('only 1 ingredient missing');
      if (breakdown.missingRequired.length > 1) pantryLines.push(`only ${breakdown.missingRequired.length} ingredients missing`);
      if (breakdown.matchedCore.length && !breakdown.missingCore.length) pantryLines.push('core ingredients available');
      if (!breakdown.missingProteinRequirements.length && recipeProteinRequirements(context.recipe).length) pantryLines.push('protein available in pantry');
    }
    const memoryLines = [];
    if (scores.memory >= 70) {
      const profile = recommendationMemoryProfile();
      if (profile.families.some((item) => norm(item.name) === norm(dishFamily(context.recipe)))) memoryLines.push('saved similar dishes');
      if (profile.cuisines.some((item) => context.recipe?.cuisine && norm(item.name) === norm(context.recipe.cuisine))) memoryLines.push(`often cooks ${context.recipe.cuisine} dishes`);
      if (profile.regions.some((item) => recipeRegionalLabels(context.recipe).some((label) => norm(label) === norm(item.name)))) memoryLines.push('matches favorite regional patterns');
    }
    const feedbackLines = [];
    if (scores.feedback >= 65) feedbackLines.push('helpful feedback on similar recipes');
    if (scores.feedback < 40) feedbackLines.push('dismissed similar dishes recently');
    const regionalLines = [];
    if (scores.regional >= 65) {
      const profile = recommendationRegionalProfile();
      const cuisine = profile.cuisines.find((item) => normalizePairingList([context.recipe?.cuisine, ...recipeCuisines(context.recipe)]).some((label) => norm(label) === norm(item.name)));
      const region = profile.regions.find((item) => recipeRegions(context.recipe).some((label) => norm(label) === norm(item.name)));
      const subRegion = profile.subRegions.find((item) => recipeSubRegions(context.recipe).some((label) => norm(label) === norm(item.name)));
      if (cuisine) regionalLines.push(`often cooks ${cuisine.name} dishes`);
      if (subRegion) regionalLines.push(`frequently saves ${subRegion.name} dishes`);
      if (region && !regionalLines.length) regionalLines.push(`likes ${region.name} cuisine`);
    }
    return [`Scored for ${surface.replace(/_/g, ' ')}`, ...dietaryLine, ...pantryLines.slice(0, 3), ...recencyLine, ...memoryLines.slice(0, 2), ...feedbackLines, ...regionalLines.slice(0, 2), ...strongest, ...weakest];
  }

  function scoreRecipeForSurface(recipe, context = {}) {
    const surface = normalizeRecommendationSurface(context.surface);
    const hardFilterReasons = recommendationHardFilters(recipe, { ...context, surface });
    const eligible = hardFilterReasons.length === 0;
    const scores = {
      mood: recommendationMoodScore(recipe, context),
      memory: recommendationMemoryScore(recipe, context),
      feedback: recommendationFeedbackScore(recipe, context),
      recency: recommendationRecencyScore(recipe, context),
      dietary: recommendationDietaryScore(recipe, context),
      regional: recommendationRegionalScore(recipe, context),
      pantry: recommendationPantryScore(recipe, context),
      diversity: recommendationDiversityScore(recipe, context)
    };
    const finalScore = eligible ? weightedRecommendationScore(scores, surface, context) : 0;
    return {
      eligible,
      confidence: recommendationConfidence(finalScore, eligible, scores, { ...context, surface, recipe }),
      hardFilterReasons,
      scores,
      finalScore,
      explanation: eligible ? recommendationScoreExplanation(scores, { ...context, surface, recipe }) : hardFilterReasons.map((reason) => `Filtered: ${reason.replace(/_/g, ' ')}`)
    };
  }

  function normalizeQuickGuideSteps(value) {
    const items = Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
    return items.map((item) => String(item || '').trim()).filter(Boolean);
  }

  function normalizeQuickGuide(quickGuide) {
    const source = quickGuide && typeof quickGuide === 'object' && !Array.isArray(quickGuide) ? quickGuide : {};
    const serves = Number(source.serves);
    return {
      serves: Number.isFinite(serves) && serves > 0 ? Math.round(serves) : 2,
      prepTime: typeof source.prepTime === 'string' ? source.prepTime.trim() : '',
      cookTime: typeof source.cookTime === 'string' ? source.cookTime.trim() : '',
      ingredients: normalizePairingList(source.ingredients),
      steps: normalizeQuickGuideSteps(source.steps),
      tip: typeof source.tip === 'string' ? source.tip.trim() : '',
      bestWith: normalizePairingList(source.bestWith)
    };
  }

  function recipeQuickGuide(recipe) {
    return normalizeQuickGuide(recipe?.quickGuide);
  }

  function hasQuickGuide(recipe) {
    const source = recipe?.quickGuide;
    if (!source || typeof source !== 'object' || Array.isArray(source)) return false;
    const guide = recipeQuickGuide(recipe);
    return Boolean(
      guide.prepTime
      || guide.cookTime
      || guide.ingredients.length
      || guide.steps.length
      || guide.tip
      || guide.bestWith.length
    );
  }

  function uniqueDetailItems(items) {
    const seen = new Set();
    return items
      .map((item) => String(item || '').trim())
      .filter((item) => {
        const key = norm(item);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function dishPairings(recipe, guide = recipeQuickGuide(recipe)) {
    const pairings = recipe?.pairings && typeof recipe.pairings === 'object' ? recipe.pairings : {};
    const typedItems = pairingTypes.flatMap((type) => {
      const values = Array.isArray(pairings[type]) ? pairings[type] : [];
      return values.map((item) => ({ item, type }));
    });
    const quickGuideItems = (guide.bestWith || []).map((item) => ({ item, type: pairingTypeForItem(item) }));
    const seen = new Set();
    return [...typedItems, ...quickGuideItems]
      .map(({ item, type }) => ({ item: String(item || '').trim(), type }))
      .filter(({ item }) => {
        const key = norm(item);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 10);
  }

  function dishPairingsView(items) {
    if (!items.length) return '';
    const expanded = state.expandedPairingsRecipeId === state.activeRecipeId;
    const visibleItems = expanded ? items : items.slice(0, 3);
    const hiddenCount = Math.max(0, items.length - 3);
    const pairingChip = ({ item, type }) => `<span class="mv2-pairing-${esc(pairingVisualType(type))}"><b>${esc(pairingIcon(type, item))}</b>${esc(item)}</span>`;
    return `
      <section class="mv2-detail-pairings">
        <p>Pairs Well With</p>
        <div>${visibleItems.map(pairingChip).join('')}</div>
        ${hiddenCount ? `<button class="mv2-pairing-toggle" type="button" data-pairings-toggle="${esc(state.activeRecipeId)}">${expanded ? 'Show less' : `+${hiddenCount} more`}</button>` : ''}
      </section>
    `;
  }

  function pairingVisualType(type) {
    if (type === 'pickles' || type === 'sides') return 'side';
    if (type === 'drinks') return 'drink';
    if (type === 'chutneys') return 'chutney';
    if (type === 'toppings') return 'topping';
    return ['rice', 'roti'].includes(type) ? type : 'side';
  }

  function pairingIcon(type, item = '') {
    const value = norm(item);
    if (/momo/.test(value)) return '🥟';
    if (/chilli|chili|schezwan|thecha|spicy|pickle|achar|achaar/.test(value)) return '🌶';
    if (/greens|saag|palak|spinach|cabbage|salad|cucumber|kachumber/.test(value)) return '🥬';
    if (/rice|chawal|bhaat|pulao|biryani/.test(value)) return '🍚';
    if (/roti|naan|paratha|chapati|bhakri|thepla|dosa|pav|poori|puri/.test(value)) return '🫓';
    if (/chaas|buttermilk|mor|lassi|coffee|chai|tea|sharbat|juice|drink|soup/.test(value)) return '🥛';
    if (/chutney|sauce/.test(value)) return '🥣';
    if (/ghee|butter|oil|sev|chips|lemon|coriander/.test(value)) return '✨';
    const visualType = pairingVisualType(type);
    return {
      rice: '🍚',
      roti: '🫓',
      side: '🍽',
      drink: '🥛',
      chutney: '🥣',
      topping: '✨'
    }[visualType] || '🍽';
  }

  function pairingTypeForItem(item) {
    const value = norm(item);
    if (/rice|chawal|pulao|biryani|khichdi|pongal|noodles/.test(value)) return 'rice';
    if (/roti|chapati|naan|paratha|thepla|pav|appam|dosa|puttu/.test(value)) return 'roti';
    if (/chai|coffee|lassi|chaas|mor|sharbat|soda|juice|water|drink/.test(value)) return 'drinks';
    if (/chutney|sauce/.test(value)) return 'chutneys';
    if (/ghee|butter|coriander|sev|lemon|oil|podi|chips/.test(value)) return 'toppings';
    return 'sides';
  }

  function saveMemory() {
    localStorage.setItem('tomo_mobile_v2_saved', JSON.stringify(state.savedDishes));
    localStorage.setItem('tomo_mobile_v2_cooked', JSON.stringify(state.cookedDishes));
    localStorage.setItem('tomo_mobile_v2_dish_memory', JSON.stringify(state.dishMemory));
  }

  function saveAnalytics() {
    localStorage.setItem('tomo_mobile_v2_analytics_events', JSON.stringify(state.analyticsEvents));
  }

  const analyticsEventNames = new Set([
    'tomo_pick_viewed',
    'mood_selected',
    'dish_viewed',
    'cook_this_clicked',
    'save_clicked',
    'dish_dismissed',
    'pantry_ingredient_selected',
    'add_missing_items_clicked',
    'shopping_list_copied',
    'shopping_list_shared',
    'collection_opened',
    'recommendation_feedback'
  ]);

  function trackAnalyticsEvent(eventName, source = 'mobile-v2', metadata = {}) {
    if (!analyticsEventNames.has(eventName)) return null;
    const eventRecord = {
      eventName,
      timestamp: new Date().toISOString(),
      source: source || 'mobile-v2',
      metadata: metadata && typeof metadata === 'object' ? metadata : {}
    };
    state.analyticsEvents = [eventRecord, ...state.analyticsEvents].slice(0, 1000);
    saveAnalytics();
    return eventRecord;
  }

  function analyticsEvents() {
    return [...state.analyticsEvents];
  }

  function analyticsReport() {
    const counts = state.analyticsEvents.reduce((summary, eventRecord) => {
      summary[eventRecord.eventName] = (summary[eventRecord.eventName] || 0) + 1;
      return summary;
    }, {});
    const sourceCounts = state.analyticsEvents.reduce((summary, eventRecord) => {
      summary[eventRecord.source] = (summary[eventRecord.source] || 0) + 1;
      return summary;
    }, {});
    return {
      totalEvents: state.analyticsEvents.length,
      counts,
      sourceCounts,
      latestEventAt: state.analyticsEvents[0]?.timestamp || null
    };
  }

  function analyticsExport() {
    return JSON.stringify(state.analyticsEvents, null, 2);
  }

  function recipeAnalyticsMetadata(recipeId, dishName = '') {
    const recipe = recipes.find((item) => item.id === recipeId) || findRecipe(dishName);
    return {
      dishId: recipe?.id || recipeId || '',
      dishName: recipe?.title || dishName || '',
      mood: recipe ? moodLabel(recipe) : '',
      cuisine: recipe?.cuisine || '',
      mealTypes: recipe ? recipeMealTypes(recipe) : []
    };
  }

  function trackDishViewed(recipeId, source, metadata = {}) {
    const dishMetadata = recipeAnalyticsMetadata(recipeId, metadata.dishName);
    trackAnalyticsEvent('dish_viewed', source || dishSource(), { ...dishMetadata, ...metadata });
  }

  function trackTomoPickViewed(recipe, context = {}) {
    context = context || {};
    if (!recipe?.id || state.tomoPickViewedThisSession.has(recipe.id)) return;
    state.tomoPickViewedThisSession.add(recipe.id);
    trackAnalyticsEvent('tomo_pick_viewed', 'discover', {
      ...recipeAnalyticsMetadata(recipe.id, recipe.title),
      sourceMood: context.mood || state.mood || 'default',
      mealType: context.meal || state.meal,
      dishFamily: dishFamily(recipe)
    });
  }

  function installAnalyticsHelpers() {
    window.TomoMobileAnalytics = {
      events: analyticsEvents,
      report: analyticsReport,
      export: analyticsExport,
      track: trackAnalyticsEvent
    };
  }

  function showToast(message) {
    state.toast = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      state.toast = '';
      render();
    }, 2200);
  }

  function showShoppingListConfirmation() {
    state.toast = {
      title: 'Added to Shopping List',
      copy: 'You can review, copy, or share your list anytime.'
    };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      state.toast = '';
      render();
    }, 3200);
  }

  function toastView() {
    if (!state.toast) return '';
    if (typeof state.toast === 'string') {
      return `<div class="mv2-toast" role="status" aria-live="polite">${esc(state.toast)}</div>`;
    }
    return `<div class="mv2-toast mv2-toast-detailed" role="status" aria-live="polite"><strong>${esc(state.toast.title)}</strong><span>${esc(state.toast.copy)}</span></div>`;
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

  function matchesMeal(recipe, meal, context = {}) {
    const role = recommendationRecipeRole(recipe);
    const haystack = tags(recipe);
    const baseMatch = haystack.includes(meal) || (meal === 'snack' && haystack.includes('snacks'));
    if (role === 'side' || role === 'condiment') return false;
    if (meal === 'breakfast') return breakfastRecommendationEligible(recipe);
    if (role === 'main') return ['lunch', 'dinner'].includes(meal);
    if (role === 'soup') return ['lunch', 'dinner'].includes(meal) || (baseMatch && roleContextAllowsSoup({ ...context, meal }));
    if (role === 'snack') return meal === 'snack' && baseMatch;
    if (role === 'drink') return meal === 'snack' && roleContextAllowsDrink({ ...context, meal }) && (baseMatch || isWarmDrinkRecipe(recipe));
    if (role === 'dessert') return meal === 'snack' && baseMatch && roleContextAllowsDessert({ ...context, meal });
    return baseMatch;
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
    score += moodRoleAdjustment(recipe, mood, haystack);
    if (isSaved(recipe.id)) score += 8;
    score -= recommendationRolePenalty(recipe, 'mood');
    return score + dishMemoryRecommendationAdjustment(recipe);
  }

  function mealRecipes(meal = state.meal, limit = 2, options = {}) {
    const dismissed = options.excludeDismissed ? new Set(state.dismissedToday) : new Set();
    const pool = todaysPickCandidatePool(meal);
    const scored = scoreTodaysPickCandidates(pool, meal, dismissed);
    let selected = fillTodaysPickRow(scored, limit);
    if (selected.length < limit) {
      const selectedIds = new Set(selected.map((item) => item.recipe.id));
      const fallbackPool = recipes
        .filter((recipe) => matchesMeal(recipe, meal, { mood: state.mood, surface: 'todays_picks' }))
        .filter((recipe) => !dismissed.has(recipe.id) && !selectedIds.has(recipe.id))
        .filter(uniqueByTitle());
      selected = fillTodaysPickRow([...selected, ...scoreTodaysPickCandidates(fallbackPool, meal, dismissed)], limit);
    }
    state.todaysPickScores[meal] = selected.map((item) => ({
      recipeId: item.recipe.id,
      title: item.recipe.title,
      confidence: item.score.confidence,
      finalScore: item.score.finalScore,
      scores: item.score.scores,
      explanation: item.score.explanation
    }));
    window.__TOMO_TODAYS_PICK_SCORES__ = state.todaysPickScores;
    return selected.map((item) => item.recipe);
  }

  function fourCardRecommendationPool(meal = state.meal, mood = state.mood, dismissed = new Set()) {
    const curated = todaysPickCandidatePool(meal);
    const fallback = recipes
      .filter((recipe) => matchesMeal(recipe, meal, { mood, surface: 'todays_picks' }))
      .filter(uniqueByTitle());
    const pool = mergeRecipeLists(curated, fallback)
      .filter((recipe) => !dismissed.has(recipe.id))
      .filter((recipe) => todaysPickRoleEligible(recipe, meal, { mood, meal, surface: 'todays_picks' }));
    return scoreTodaysPickCandidates(pool, meal, dismissed);
  }

  function pickFirstUnused(scoredItems, usedIds, test = () => true) {
    return scoredItems.find((item) => item?.recipe?.id && !usedIds.has(item.recipe.id) && test(item.recipe, item));
  }

  function familiarFavoriteScore(item) {
    const recipe = item?.recipe;
    if (!recipe) return 0;
    const haystack = `${norm(recipe.title)} ${tags(recipe).join(' ')} ${dishFamily(recipe)}`;
    let score = todayPickRankScore(item);
    score += Number(recipe?.comfortScore || 0) * 4;
    score += Number(recipe?.nostalgiaScore || 0) * 3;
    score += todayPickHistoryScore(recipe) * 1.2;
    if (/\b(comfort|soul|homestyle|home style|dal|rice|khichdi|pongal|idli|dosa|upma|poha|curd rice|rasam)\b/.test(haystack)) score += 28;
    if (['side', 'condiment', 'drink', 'dessert'].includes(recommendationRecipeRole(recipe))) score -= 120;
    return score;
  }

  function quickEasyScore(item) {
    const recipe = item?.recipe;
    if (!recipe) return 0;
    let score = todayPickRankScore(item);
    const minutes = totalTime(recipe);
    if (minutes && minutes <= 20) score += 45;
    else if (minutes && minutes <= 30) score += 24;
    if (recipe?.lowEffort) score += 18;
    if (recipe?.minimalCleanup) score += 12;
    score += moodScore(recipe, 'quick') * 0.3;
    if (state.meal === 'snack' && isWarmDrinkRecipe(recipe) && /\b(rainy|comfort)\b/.test(norm(state.mood))) score += 38;
    if (['side', 'condiment'].includes(recommendationRecipeRole(recipe))) score -= 140;
    return score;
  }

  function explorePickScore(item, usedIds = new Set()) {
    const recipe = item?.recipe;
    if (!recipe) return 0;
    const usedRecipes = [...usedIds].map((id) => recipes.find((candidate) => candidate.id === id)).filter(Boolean);
    const usedFamilies = new Set(usedRecipes.map((candidate) => dishFamily(candidate)).filter(Boolean));
    const usedRegions = new Set(usedRecipes.flatMap((candidate) => recipeRegionalLabels(candidate).map(norm)).filter(Boolean));
    const family = dishFamily(recipe);
    const labels = recipeRegionalLabels(recipe).map(norm);
    let score = todayPickRankScore(item) * 0.55;
    if (family && !usedFamilies.has(family)) score += 50;
    if (labels.some((label) => /karnataka|mangalorean|udupi|coastal|northeast|assam|bengal|malnad|kodagu|north karnataka|regional/.test(label))) score += 34;
    if (!labels.some((label) => usedRegions.has(label))) score += 28;
    if (state.meal === 'snack' && isWarmDrinkRecipe(recipe) && /\b(rainy|comfort)\b/.test(norm(state.mood))) score += 95;
    score += todayPickDiversityScore(recipe) * 0.4;
    if (['side', 'condiment'].includes(recommendationRecipeRole(recipe))) score -= 180;
    if (['drink', 'dessert'].includes(recommendationRecipeRole(recipe)) && state.meal !== 'snack') score -= 120;
    return score;
  }

  function pantryPickScoredItems(meal = state.meal, mood = state.mood, dismissed = new Set()) {
    if (!state.selectedIngredients.size) return [];
    return pantryMatches()
      .filter((match) => match?.recipe && !dismissed.has(match.recipe.id))
      .filter((match) => matchesMeal(match.recipe, meal, { mood, surface: 'todays_picks', intent: 'pantry' }))
      .filter((match) => todaysPickRoleEligible(match.recipe, meal, { mood, meal, surface: 'todays_picks', intent: 'pantry' }))
      .map((match) => ({
        recipe: match.recipe,
        meal,
        score: scoreRecipeForSurface(match.recipe, {
          surface: 'pantry',
          mood,
          meal,
          selectedIngredients: [...state.selectedIngredients],
          pantryScore: Math.max(0, Math.min(100, Number(match.score || 0) / 55))
        }),
        pantryMatch: match
      }))
      .sort((a, b) => Number(b.pantryMatch?.score || 0) - Number(a.pantryMatch?.score || 0));
  }

  function fourCardRecommendations(meal = state.meal, mood = state.mood) {
    const dismissed = new Set(state.dismissedToday);
    const scored = fourCardRecommendationPool(meal, mood, dismissed);
    const used = new Set();
    const cards = [];
    const addCard = (slot, item, fallbackSubtitle = '') => {
      if (!item?.recipe || used.has(item.recipe.id)) return false;
      used.add(item.recipe.id);
      cards.push({
        ...slot,
        recipe: item.recipe,
        score: item.score,
        subtitle: slot.subtitle || fallbackSubtitle
      });
      return true;
    };
    const best = pickFirstUnused(scored, used);
    addCard({
      key: 'bestPick',
      icon: '🌟',
      label: "Tomo's Best Pick",
      subtitle: 'Strongest fit for this meal and mood.'
    }, best);

    const familiar = [...scored]
      .filter((item) => !used.has(item.recipe.id))
      .sort((a, b) => familiarFavoriteScore(b) - familiarFavoriteScore(a));
    addCard({
      key: 'familiarFavorite',
      icon: '🍲',
      label: 'Familiar Favorite',
      subtitle: 'Safe, comforting and familiar.'
    }, pickFirstUnused(familiar, used));

    const pantryItems = pantryPickScoredItems(meal, mood, dismissed);
    if (state.selectedIngredients.size && pantryItems.length) {
      addCard({
        key: 'fromYourKitchen',
        icon: '🥗',
        label: 'From Your Kitchen',
        subtitle: 'Uses what you have selected.'
      }, pickFirstUnused(pantryItems, used));
    } else {
      const quick = [...scored]
        .filter((item) => !used.has(item.recipe.id))
        .sort((a, b) => quickEasyScore(b) - quickEasyScore(a));
      addCard({
        key: 'quickEasy',
        icon: '⚡',
        label: 'Quick & Easy',
        subtitle: 'Low-fuss backup when pantry is empty.'
      }, pickFirstUnused(quick, used));
    }

    const explore = [...scored]
      .filter((item) => !used.has(item.recipe.id))
      .sort((a, b) => explorePickScore(b, used) - explorePickScore(a, used));
    addCard({
      key: 'explorePick',
      icon: '🧭',
      label: 'Explore Something Different',
      subtitle: 'A different family, region, or flavor lane.'
    }, pickFirstUnused(explore, used));

    if (cards.length < 4) {
      scored.forEach((item) => {
        if (cards.length < 4) addCard({
          key: `backup-${cards.length}`,
          icon: '✨',
          label: 'Another Good Pick',
          subtitle: 'Still inside your meal boundary.'
        }, item);
      });
    }
    state.todaysPickScores[meal] = cards.map((card) => ({
      recipeId: card.recipe.id,
      title: card.recipe.title,
      card: card.key,
      label: card.label,
      confidence: card.score?.confidence || 'medium',
      finalScore: card.score?.finalScore || 0,
      scores: card.score?.scores || {},
      explanation: card.score?.explanation || []
    }));
    window.__TOMO_TODAYS_PICK_SCORES__ = state.todaysPickScores;
    return cards.slice(0, 4);
  }

  function todaysPickCandidatePool(meal = state.meal) {
    if (state.mood === 'rainy') return rainyMealCandidateRecipes(meal);
    if (state.mood === 'soul' && meal === 'dinner') return curatedTitleRecipes(moodCuration.soulDinner, []);
    if (state.mood === 'protein' && moodCuration.proteinMeals[meal]) return curatedTitleRecipes(moodCuration.proteinMeals[meal], []);
    if (state.mood === 'spicy' && moodCuration.spicyMeals[meal]) return curatedTitleRecipes(moodCuration.spicyMeals[meal], []);
    return moodEligibleRecipes(state.mood)
      .filter((recipe) => matchesMeal(recipe, meal, { mood: state.mood, surface: 'todays_picks' }))
      .filter(uniqueByTitle());
  }

  function scoreTodaysPickCandidates(candidates, meal, dismissed = new Set()) {
    return candidates
      .map((recipe) => {
        const context = {
          surface: 'todays_picks',
          mood: state.mood || '',
          meal,
          dismissedIds: [...dismissed],
          recentRecipeIds: [...dismissed],
          recentDishFamilies: [...dismissed].map((id) => dishFamily(recipes.find((recipe) => recipe.id === id))).filter(Boolean),
          recentRegions: [...dismissed].map((id) => primaryBrowseRegion(recipes.find((recipe) => recipe.id === id))).filter(Boolean),
          selectedIngredients: [...state.selectedIngredients]
        };
        return { recipe, score: scoreRecipeForSurface(recipe, context), meal };
      })
      .filter((item) => item.recipe && item.score.eligible && todaysPickRoleEligible(item.recipe, meal, item.score.context || { mood: state.mood, surface: 'todays_picks' }))
      .sort(todayPickCandidateCompare);
  }

  function todayPickCandidateCompare(a, b) {
    const rankDiff = todayPickRankScore(b) - todayPickRankScore(a);
    if (Math.abs(rankDiff) > 0.01) return rankDiff;
    const meal = a.meal || b.meal || state.meal;
    const completeDiff = todayPickCompleteScore(b.recipe, meal) - todayPickCompleteScore(a.recipe, meal);
    if (completeDiff) return completeDiff;
    const baseDiff = Number(b.score?.finalScore || 0) - Number(a.score?.finalScore || 0);
    if (Math.abs(baseDiff) > 0.01) return baseDiff;
    const popularityDiff = todayPickPopularityScore(b.recipe, meal) - todayPickPopularityScore(a.recipe, meal);
    if (popularityDiff) return popularityDiff;
    const diversityDiff = todayPickDiversityScore(b.recipe) - todayPickDiversityScore(a.recipe);
    if (diversityDiff) return diversityDiff;
    const historyDiff = todayPickHistoryScore(b.recipe) - todayPickHistoryScore(a.recipe);
    if (historyDiff) return historyDiff;
    const moodDiff = moodRecipeCompare(a.recipe, b.recipe, state.mood);
    if (moodDiff) return moodDiff;
    return recipeSourceIndex(a.recipe) - recipeSourceIndex(b.recipe);
  }

  function todayPickRankScore(item) {
    const meal = item?.meal || state.meal;
    const recipe = item?.recipe;
    const complete = todayPickCompleteScore(recipe, meal);
    const popularity = todayPickPopularityScore(recipe, meal);
    const diversity = todayPickDiversityScore(recipe);
    const history = todayPickHistoryScore(recipe);
    return Number(item?.score?.finalScore || 0)
      + complete * 0.12
      + popularity * 0.20
      + diversity * 0.03
      + history * 0.05;
  }

  function todayPickCompleteScore(recipe, meal = state.meal) {
    if (!recipe) return 0;
    const title = norm(recipe.title);
    const haystack = `${title} ${tags(recipe).join(' ')} ${dishFamily(recipe)}`;
    let score = 0;
    if (matchesMeal(recipe, meal)) score += 30;
    score -= recommendationRolePenalty(recipe, meal === 'snack' ? 'todays_picks' : 'hero');
    if (meal === 'snack') {
      const strongSnacks = [
        'egg sandwich',
        'veg sandwich',
        'cheese veg sandwich',
        'masala makhana',
        'roasted chana chaat',
        'sprouted moong salad',
        'sweet potato chaat',
        'mini dhokla',
        'khandvi',
        'kuzhi paniyaram'
      ];
      const strongIndex = strongSnacks.findIndex((item) => item === title);
      if (strongIndex >= 0) score += 260 - strongIndex * 8;
      if (/\b(sandwich|chaat|dhokla|khandvi|paniyaram|makhana|cutlet|roll|toast|chilla|cheela|uttapam)\b/.test(haystack)) score += 80;
      if (/\b(protein|egg|paneer|chana|moong|sprout|peanut|makhana|sweet potato)\b/.test(haystack)) score += 35;
      if (isWarmDrinkRecipe(recipe) && /\b(rainy|comfort)\b/.test(norm(state.mood))) score += 130;
      if (/\b(pakora|bajji|bonda|kachori|samosa|fried)\b/.test(haystack)) score -= 90;
      if (/\b(chutney|raita|palya|poriyal|thoran|add on|addon|accompaniment|condiment)\b/.test(haystack)) score -= 220;
      if (title === 'chapati jam roll') score += 15;
    }
    return score;
  }

  function todayPickPopularityScore(recipe, meal = state.meal) {
    if (!recipe) return 0;
    const title = norm(recipe.title);
    const haystack = `${title} ${tags(recipe).join(' ')}`;
    let score = 0;
    score += Math.min(40, Number(recipe?.confidenceScore || 0) / 3 || 0);
    score += Math.min(20, Number(recipe?.proteinScore || 0) * 2 || 0);
    if (Number(recipe?.comfortScore || 0) > 0) score += Math.min(12, Number(recipe.comfortScore) * 1.5);
    if (meal === 'snack' && /\b(sandwich|chaat|dhokla|khandvi|paniyaram|makhana)\b/.test(haystack)) score += 25;
    if (/\b(biryani|khichdi|dosa|idli|upma|poha|paneer|egg|chicken|fish|dal|rajma|chole)\b/.test(haystack)) score += 12;
    return score;
  }

  function todayPickDiversityScore(recipe) {
    if (!recipe) return 0;
    const recent = Array.isArray(state.tomoPickRecent) ? state.tomoPickRecent : [];
    const family = dishFamily(recipe);
    const region = primaryBrowseRegion(recipe);
    let score = 60;
    if (recent.slice(0, 4).some((item) => item.id === recipe.id)) score -= 45;
    if (family && recent.slice(0, 4).some((item) => item.family === family)) score -= 18;
    if (region && recent.slice(0, 4).some((item) => item.region === region)) score -= 8;
    return score;
  }

  function todayPickHistoryScore(recipe) {
    if (!recipe) return 0;
    return dishMemoryEvents()
      .filter((event) => dishMemoryMatches(recipe, event))
      .reduce((score, event) => {
        if (event.action === 'cooked') return score + 12;
        if (event.action === 'saved') return score + 8;
        if (event.action === 'helpful') return score + 5;
        if (event.action === 'not helpful') return score - 12;
        if (event.action === 'dismissed') return score - 18;
        return score;
      }, 0);
  }

  function recipeSourceIndex(recipe) {
    const index = recipes.findIndex((item) => item.id === recipe?.id || norm(item.title) === norm(recipe?.title));
    return index >= 0 ? index : Number.MAX_SAFE_INTEGER;
  }

  function recommendationDiversityPenalty(item, usedFamilies, usedRegions, cuisineCounts) {
    if (!item?.recipe) return 100;
    let penalty = 0;
    const family = dishFamily(item.recipe);
    const region = primaryBrowseRegion(item.recipe);
    const cuisine = norm(item.recipe.cuisine);
    if (family && usedFamilies.has(family)) penalty += 18;
    if (region && usedRegions.has(region)) penalty += region === 'Pan-Indian' ? 6 : 12;
    if (cuisine && (cuisineCounts.get(cuisine) || 0) >= 1) penalty += 8;
    return penalty;
  }

  function familyDiverseRecommendationSet(scoredCandidates, limit = 2, options = {}) {
    const selected = [];
    const usedIds = new Set();
    const usedFamilies = new Set();
    const usedRegions = new Set();
    const cuisineCounts = new Map();
    const scoreGap = Number(options.scoreGap || 18);
    const add = (item) => {
      selected.push(item);
      usedIds.add(item.recipe.id);
      const family = dishFamily(item.recipe);
      const cuisine = norm(item.recipe.cuisine);
      const region = primaryBrowseRegion(item.recipe);
      if (family) usedFamilies.add(family);
      if (region) usedRegions.add(region);
      if (cuisine) cuisineCounts.set(cuisine, (cuisineCounts.get(cuisine) || 0) + 1);
    };
    const candidates = scoredCandidates.filter((item) => item?.recipe?.id);
    while (selected.length < limit) {
      const remaining = candidates.filter((item) => !usedIds.has(item.recipe.id));
      if (!remaining.length) break;
      const bestAvailable = remaining[0];
      const diverse = remaining.find((item) => recommendationDiversityPenalty(item, usedFamilies, usedRegions, cuisineCounts) === 0);
      if (diverse) {
        add(diverse);
        continue;
      }
      const softened = remaining
        .map((item) => ({
          item,
          adjustedScore: Number(item.score?.finalScore || 0) - recommendationDiversityPenalty(item, usedFamilies, usedRegions, cuisineCounts)
        }))
        .sort((a, b) => b.adjustedScore - a.adjustedScore || Number(b.item.score?.finalScore || 0) - Number(a.item.score?.finalScore || 0))[0]?.item;
      const bestScore = Number(bestAvailable?.score?.finalScore || 0);
      const softenedScore = Number(softened?.score?.finalScore || 0);
      add(bestScore - softenedScore >= scoreGap ? bestAvailable : softened);
    }
    return selected.slice(0, limit);
  }

  function fillTodaysPickRow(scoredCandidates, limit = 2) {
    return familyDiverseRecommendationSet(scoredCandidates, limit, { scoreGap: 18 });
  }

  function curatedMealRecipes(titles, limit, dismissed) {
    const candidates = titles
      .map((title) => findRecipe(title))
      .filter((recipe) => recipe && !dismissed.has(recipe.id) && !memoryExcludedRecipe(recipe))
      .filter(uniqueByTitle());
    return browseDiverseRecipes(candidates, limit);
  }

  function rainyMealRecipes(meal, limit, dismissed) {
    const candidates = rainyMealCandidateRecipes(meal)
      .filter((recipe) => recipe && !dismissed.has(recipe.id) && !memoryExcludedRecipe(recipe))
      .filter(uniqueByTitle());
    return browseDiverseRecipes(candidates, limit);
  }

  function rainyMealCandidateRecipes(meal) {
    const curated = {
      breakfast: ['Pongal', 'Upma', 'Masala Dosa', 'Ragi Porridge'],
      lunch: ['Khichdi', 'Rasam Rice', 'Sambar Rice', 'Bisibelebath', 'Pepper Rasam'],
      dinner: ['Masala Dosa', 'Onion Uttapam', 'Aloo Paratha', 'Methi Paratha', 'Thukpa', 'Vegetable Soup', 'Mushroom Soup'],
      snack: ['Egg Sandwich', 'Veg Sandwich', 'Masala Makhana', 'Roasted Chana Chaat', 'Sprouted Moong Salad', 'Sweet Potato Chaat', 'Mini Dhokla', 'Khandvi', 'Kuzhi Paniyaram', 'Pakora', 'Bread Pakora', 'Mirchi Bajji', 'Masala Chai']
    }[meal] || [];
    return curated
      .map((title) => findRecipe(title))
      .filter(Boolean)
      .filter(uniqueByTitle());
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
    if (state.mood) {
      if (state.activeTomoPick?.recipe && state.activeTomoPick.mood === state.mood && state.activeTomoPick.meal === state.meal) return state.activeTomoPick.recipe;
      const pick = moodTomoPick(state.mood, state.meal);
      state.activeTomoPick = pick;
      return pick.recipe || recipes[0];
    }
    if (state.activeTomoPick) return state.activeTomoPick.recipe;
    const pick = defaultTomoPick();
    state.activeTomoPick = pick;
    return pick.recipe || recipes[0];
  }

  function tomoPickScoreContext(mood, meal, extra = {}) {
    const recent = Array.isArray(state.tomoPickRecent) ? state.tomoPickRecent : [];
    return {
      surface: 'tomo_pick',
      mood,
      meal,
      recentRecipeIds: recent.map((item) => item.id).filter(Boolean),
      recentDishFamilies: recent.slice(0, 5).map((item) => item.family).filter(Boolean),
      recentRegions: recent.slice(0, 5).map((item) => item.region).filter(Boolean),
      recentCuisines: recent.slice(0, 5).map((item) => item.cuisine).filter(Boolean),
      selectedIngredients: [...state.selectedIngredients],
      ...extra
    };
  }

  function scoreTomoPickCandidates(candidates, mood, meal, extra = {}) {
    const context = tomoPickScoreContext(mood, meal, extra);
    return candidates
      .map((recipe) => ({
        recipe,
        mood,
        meal,
        score: scoreRecipeForSurface(recipe, context)
      }))
      .filter((item) => item.recipe && item.score.eligible)
      .sort((a, b) => (b.score.finalScore + heroFoodPriority(b.recipe, mood, meal)) - (a.score.finalScore + heroFoodPriority(a.recipe, mood, meal)) || moodRecipeCompare(a.recipe, b.recipe, mood));
  }

  function diverseTomoPickCandidate(scoredCandidates, recent = state.tomoPickRecent || []) {
    if (!scoredCandidates.length) return null;
    const recentIds = new Set(recent.map((item) => item.id).filter(Boolean));
    const recentFamilies = new Set(recent.slice(0, 5).map((item) => item.family).filter(Boolean));
    const recentCuisineCounts = recent.slice(0, 5).reduce((counts, item) => {
      const cuisine = norm(item.cuisine);
      if (cuisine) counts.set(cuisine, (counts.get(cuisine) || 0) + 1);
      return counts;
    }, new Map());
    const recentRegionCounts = recent.slice(0, 5).reduce((counts, item) => {
      const region = norm(item.region);
      if (region) counts.set(region, (counts.get(region) || 0) + 1);
      return counts;
    }, new Map());
    const dominantCuisines = new Set([...recentCuisineCounts].filter(([, count]) => count >= 2).map(([cuisine]) => cuisine));
    const dominantRegions = new Set([...recentRegionCounts].filter(([, count]) => count >= 2).map(([region]) => region));
    return scoredCandidates.find((item) => {
      return !recentIds.has(item.recipe.id)
        && !recentFamilies.has(dishFamily(item.recipe))
        && !dominantRegions.has(norm(primaryBrowseRegion(item.recipe)))
        && !dominantCuisines.has(norm(item.recipe.cuisine));
    })
      || scoredCandidates.find((item) => !recentIds.has(item.recipe.id) && !recentFamilies.has(dishFamily(item.recipe)) && !dominantRegions.has(norm(primaryBrowseRegion(item.recipe))))
      || scoredCandidates.find((item) => !recentIds.has(item.recipe.id) && !recentFamilies.has(dishFamily(item.recipe)))
      || scoredCandidates.find((item) => !recentIds.has(item.recipe.id))
      || scoredCandidates[0];
  }

  function moodTomoPick(mood, meal) {
    const recent = Array.isArray(state.tomoPickRecent) ? state.tomoPickRecent : [];
    const candidates = moodTomoCandidates(mood, meal);
    const scored = scoreTomoPickCandidates(candidates, mood, meal);
    const selected = diverseTomoPickCandidate(scored, recent) || scored[0];
    if (selected) return rememberTomoPick(selected.recipe, mood, meal, selected.score);
    return rememberTomoPick(recipes[0], mood, meal, scoreRecipeForSurface(recipes[0], tomoPickScoreContext(mood, meal)));
  }

  function moodTomoCandidates(mood, meal) {
    if (mood === 'rainy') return heroFoodFirstCandidates(rainyMealRecipes(meal, 20, new Set()));
    if (mood === 'soul' && meal === 'dinner') return heroFoodFirstCandidates(curatedMealRecipes(moodCuration.soulDinner, 20, new Set()));
    if (mood === 'protein' && moodCuration.proteinMeals[meal]) return heroFoodFirstCandidates(curatedMealRecipes(moodCuration.proteinMeals[meal], 20, new Set()));
    if (mood === 'spicy' && moodCuration.spicyMeals[meal]) return heroFoodFirstCandidates(curatedMealRecipes(moodCuration.spicyMeals[meal], 20, new Set()));
    return heroFoodFirstCandidates(moodEligibleRecipes(mood)
      .filter((recipe) => matchesMeal(recipe, meal, { mood, surface: 'tomo_pick' }))
      .filter(uniqueByTitle()));
  }

  function defaultTomoPick() {
    const meal = defaultTomoMeal();
    const recent = Array.isArray(state.tomoPickRecent) ? state.tomoPickRecent : [];
    const recentIds = new Set(recent.map((item) => item.id).filter(Boolean));
    const moodOrder = defaultMoodRotation();
    let fallback = null;
    for (const mood of moodOrder) {
      const candidates = defaultMoodCandidates(mood, meal);
      const scored = scoreTomoPickCandidates(candidates, mood, meal);
      if (!fallback && scored[0]) fallback = scored[0];
      const fresh = scored.filter((item) => !recentIds.has(item.recipe.id));
      const diverse = diverseTomoPickCandidate(fresh.length ? fresh : scored, recent);
      if (diverse) return rememberTomoPick(diverse.recipe, mood, meal, diverse.score);
    }
    if (fallback) return rememberTomoPick(fallback.recipe, fallback.mood, fallback.meal, fallback.score);
    return rememberTomoPick(recipes[0], 'comfort', meal, scoreRecipeForSurface(recipes[0], tomoPickScoreContext('comfort', meal)));
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
    return heroFoodFirstCandidates(pool
      .filter((recipe) => matchesMeal(recipe, meal, { mood, surface: 'tomo_pick' }))
      .filter((recipe) => heroRoleEligible(recipe, mood, meal))
      .sort((a, b) => moodRecipeCompare(a, b, mood))
      .filter(uniqueByTitle()));
  }

  function heroFoodFirstCandidates(candidates = []) {
    const food = candidates.filter((recipe) => heroRoleEligible(recipe) && !isHeroBeverageOnly(recipe));
    return food;
  }

  function isHeroBeverageOnly(recipe) {
    const title = norm(recipe?.title);
    const family = dishFamily(recipe);
    const haystack = tags(recipe).join(' ');
    if (family === 'drink') return true;
    return /\b(chai|tea|coffee|water|buttermilk|chaas|lassi|sharbat|juice|drink|neer mor|jal jeera|ajwain water|jeera water|sattu drink|ragi malt)\b/.test(`${title} ${haystack}`);
  }

  function heroSoupContextBonus(recipe, mood = state.mood, meal = state.meal) {
    if (recommendationRecipeRole(recipe) !== 'soup') return 0;
    return /\b(rainy|comfort|light|sick|evening)\b/.test(roleContextText({ mood, meal, surface: 'tomo_pick' })) ? 10 : 0;
  }

  function heroFoodPriority(recipe, mood = state.mood, meal = state.meal) {
    if (!recipe || !heroRoleEligible(recipe, mood, meal) || isHeroBeverageOnly(recipe)) return -100;
    const title = norm(recipe.title);
    const haystack = `${title} ${tags(recipe).join(' ')} ${dishFamily(recipe)}`;
    let score = heroSoupContextBonus(recipe, mood, meal);
    if (matchesMeal(recipe, 'breakfast')) score += 14;
    if (/\b(rice|chawal|pulao|biryani|khichdi|pongal|bisibelebath|curd rice|lemon rice|tomato rice)\b/.test(haystack)) score += 12;
    if (/\b(curry|masala|korma|stew|saaru|rasam|dal|pappu|paneer|chicken|fish|egg|rajma|chole|chana)\b/.test(haystack)) score += 12;
    if (/\b(protein|egg|chicken|fish|paneer|tofu|soy|soya|dal|lentil|rajma|chole|chana|peanut|sundal)\b/.test(haystack)) score += 10;
    if (/\b(lunch|dinner|main|meal|bowl|paratha|roti|dosa|idli|upma|poha)\b/.test(haystack)) score += 8;
    if (matchesMeal(recipe, 'snack') && !/\b(chutney|raita|pickle|water|chai|tea|coffee)\b/.test(haystack)) score += 6;
    return score;
  }

  function rememberTomoPick(recipe, mood, meal, score = null) {
    const item = {
      id: recipe?.id || '',
      title: recipe?.title || '',
      mood,
      meal,
      family: dishFamily(recipe),
      region: primaryBrowseRegion(recipe),
      cuisine: recipe?.cuisine || '',
      confidence: score?.confidence || 'medium',
      finalScore: Number(score?.finalScore || 0),
      timestamp: new Date().toISOString()
    };
    state.tomoPickRecent = [item, ...(state.tomoPickRecent || []).filter((entry) => entry.id !== item.id)].slice(0, 30);
    state.tomoPickCursor += 1;
    localStorage.setItem('tomo_mobile_v2_recent_picks', JSON.stringify(state.tomoPickRecent));
    localStorage.setItem('tomo_mobile_v2_pick_cursor', JSON.stringify(state.tomoPickCursor));
    return {
      recipe,
      mood,
      meal,
      confidence: score?.confidence || 'medium',
      finalScore: Number(score?.finalScore || 0),
      scores: score?.scores || emptyRecommendationScores(),
      explanation: score?.explanation || []
    };
  }

  function dishFamily(recipe) {
    const configured = norm(recipe?.dishFamily || recipe?.dish_family);
    const configuredMap = {
      'uttapam': 'dosa',
      'set dosa': 'dosa',
      'ragi dosa': 'dosa',
      'rava dosa': 'dosa',
      'omelette': 'egg',
      'egg-curry': 'egg',
      'egg curry': 'egg',
      'paneer': 'paneer-curry',
      'paneer curry': 'paneer-curry',
      'chicken': 'chicken-curry',
      'chicken curry': 'chicken-curry',
      'fish': 'fish-curry',
      'fish curry': 'fish-curry',
      'fried rice': 'rice',
      'rice bowl': 'rice',
      'rice-meal': 'rice',
      'rice meal': 'rice',
      'rice dal': 'dal',
      'dal curry': 'dal',
      'dal vegetable': 'dal',
      'black urad dal': 'dal',
      'drink side': 'drink',
      'tea': 'drink',
      'crisp snack': 'snack',
      'steamed snack': 'snack',
      'corn snack': 'snack',
      'sundal': 'snack',
      'vada': 'snack',
      'maida': 'snack',
      'besan': 'snack'
    };
    if (configured) return configuredMap[configured] || configured;
    const title = norm(recipe?.title);
    if (/pesarattu|uttapam|dosa/.test(title)) return 'dosa';
    if (/paratha|thepla|roti/.test(title)) return 'paratha';
    if (/pulao/.test(title)) return 'pulao';
    if (/khichdi|pongal/.test(title)) return 'khichdi';
    if (/poha|avalakki/.test(title)) return 'poha';
    if (/upma/.test(title)) return 'upma';
    if (/idli/.test(title)) return 'idli';
    if (/chaat|sundal|corn|khandvi|kodubale|nippattu|paniyaram/.test(title)) return 'snack';
    if (/buttermilk|neer mor|sharbat|jal jeera|sattu drink|ragi malt|chai|tea/.test(title)) return 'drink';
    if (/pappu/.test(title)) return 'pappu';
    if (/saaru|rasam/.test(title)) return 'saaru';
    if (/kootu/.test(title)) return 'kootu';
    if (/\\bdal\\b|varan/.test(title)) return 'dal';
    if (/paneer/.test(title) && /curry|masala|bhurji|kadai|palak|matar/.test(title)) return 'paneer-curry';
    if (/egg|omelette/.test(title)) return 'egg';
    if (/chicken/.test(title) && /curry|masala|stew|sukka|chettinad|kolhapuri|andhra/.test(title)) return 'chicken-curry';
    if (/fish/.test(title) && /curry|jhol|masala|stew|pulusu/.test(title)) return 'fish-curry';
    if (/rice|khichdi|bisibelebath|bisi bele bath|curd rice|lemon rice|tomato rice/.test(title)) return 'rice';
    if (/soup/.test(title)) return 'soup';
    return title.split(' ')[0] || 'dish';
  }

  function browseDiverseRecipes(items, limit = items.length) {
    const selected = [];
    const usedIds = new Set();
    const usedFamilies = new Set();
    items.forEach((item) => {
      const recipe = item?.recipe || item;
      if (!recipe) return;
      const id = recipe.id || norm(recipe.title || item.title);
      const family = dishFamily(recipe);
      if (id && usedIds.has(id)) return;
      if (family && usedFamilies.has(family)) return;
      selected.push(item);
      if (id) usedIds.add(id);
      if (family) usedFamilies.add(family);
    });
    return selected.slice(0, limit);
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
      'paneer pulao': 'dishes/paneer-pulao-mobile',
      'paneer fried rice': 'dishes/homestyle-kitchen-placeholder',
      'paneer pakora': 'dishes/homestyle-kitchen-placeholder',
      'garlic paneer roti wrap': 'dishes/homestyle-kitchen-placeholder',
      'corn paneer bhurji bowl': 'dishes/homestyle-kitchen-placeholder',
      'paneer capsicum rice bowl': 'dishes/homestyle-kitchen-placeholder',
      'paneer corn rice bowl': 'dishes/homestyle-kitchen-placeholder',
      'tomato paneer rice': 'dishes/homestyle-kitchen-placeholder',
      'pesarattu': 'dishes/homestyle-kitchen-placeholder',
      'chicken egg rice bowl': 'dishes/homestyle-kitchen-placeholder',
      'nattu kozhi curry': 'dishes/nattu-kozhi-curry-mobile',
      'chicken biryani': 'dishes/chicken-biryani-mobile',
      'haleem': 'dishes/homestyle-kitchen-placeholder',
      'mutton korma': 'dishes/homestyle-kitchen-placeholder',
      'mango rice': 'dishes/homestyle-kitchen-placeholder',
      'olan': 'dishes/homestyle-kitchen-placeholder',
      'thoran': 'dishes/homestyle-kitchen-placeholder',
      'parippu curry': 'dishes/homestyle-kitchen-placeholder',
      'sweet holige': 'dishes/homestyle-kitchen-placeholder',
      'dalma': 'dishes/homestyle-kitchen-placeholder',
      'naga galho': 'dishes/homestyle-kitchen-placeholder',
      'cheese veg sandwich': 'dishes/homestyle-kitchen-placeholder',
      'aloo paratha': 'dishes/aloo-paratha-homestyle',
      'aloo capsicum sabzi': 'dishes/batch3b-luchi-aloor-dom',
      'aloo jeera': 'dishes/batch3b-luchi-aloor-dom',
      'andhra chicken curry': 'dishes/andhra-chicken-curry-homestyle',
      'andhra egg fry': 'dishes/homestyle-kitchen-placeholder',
      'andhra kodi vepudu': 'dishes/chicken-sukka-homestyle',
      'appam': 'dishes/homestyle-kitchen-placeholder',
      'apple puree': 'dishes/apple-puree-baby-ceramic',
      'assamese duck curry': 'dishes/homestyle-kitchen-placeholder',
      'biryani': 'dishes/veg-biryani-mobile',
      'boiled corn': 'dishes/batch5-corn-sundal',
      'bonda': 'dishes/homestyle-kitchen-placeholder',
      'bread pakora': 'dishes/homestyle-kitchen-placeholder',
      'butter chicken': 'dishes/butter-chicken-homestyle',
      'bread omelette': 'dishes/bread-omelette-homestyle',
      'chaat': 'salads/tomato-onion-chaat-homestyle',
      'cheese omelette': 'dishes/batch5-egg-bhurji',
      'chicken 555': 'dishes/batch3a-chilli-chicken',
      'chicken 65': 'dishes/chicken-sukka-homestyle',
      'chicken capsicum stir fry bowl': 'dishes/chicken-sukka-homestyle',
      'chicken chettinad': 'dishes/chicken-chettinad-homestyle',
      'chicken majestic': 'dishes/batch3a-chilli-chicken',
      'chicken mushroom stir fry': 'dishes/chicken-sukka-homestyle',
      'chicken pepper rice bowl': 'dishes/batch5-chicken-rice',
      'chicken sukka': 'dishes/chicken-sukka-homestyle',
      'chicken tomato rice': 'dishes/batch5-chicken-rice',
      dosa: 'dishes/dosa-homestyle',
      'dosa roll': 'dishes/dosa-homestyle',
      'dragon chicken': 'dishes/batch3a-chilli-chicken',
      'dal rice': 'dishes/homestyle-kitchen-placeholder',
      'dal roti': 'dishes/aloo-paratha-homestyle',
      'egg curry': 'dishes/egg-curry-mobile',
      'egg curry rice': 'dishes/homestyle-kitchen-placeholder',
      'egg capsicum bhurji': 'dishes/batch5-egg-bhurji',
      'egg dosa': 'dishes/dosa-homestyle',
      'egg sandwich': 'dishes/batch6-egg-toast',
      'egg tomato rice bowl': 'dishes/egg-fried-rice',
      'eromba': 'dishes/batch3a-baingan-bharta',
      'fish curry': 'dishes/homestyle-kitchen-placeholder',
      'fish curry rice': 'dishes/homestyle-kitchen-placeholder',
      'ghee rice': 'dishes/homestyle-kitchen-placeholder',
      'garlic egg rice': 'dishes/egg-fried-rice',
      'goan fish curry': 'dishes/homestyle-kitchen-placeholder',
      'goan prawn balchao': 'dishes/batch4-chingri-malai-curry',
      'guntur chicken fry': 'dishes/chicken-sukka-homestyle',
      'gujiya': 'dishes/homestyle-kitchen-placeholder',
      idli: 'dishes/idli-homestyle',
      'jal jeera': 'drinks/jeera-water-homestyle',
      'kaaram dosa': 'dishes/dosa-homestyle',
      'ragi dosa': 'dishes/ragi-dosa-homestyle',
      'kadhi pakora': 'dishes/batch3a-kadhi-chawal',
      'kada prasad': 'dishes/homestyle-kitchen-placeholder',
      'kerala egg roast': 'dishes/homestyle-kitchen-placeholder',
      'kerala fish curry': 'dishes/homestyle-kitchen-placeholder',
      'keema fry': 'dishes/homestyle-kitchen-placeholder',
      'kheema pav': 'dishes/homestyle-kitchen-placeholder',
      'kolhapuri chicken': 'dishes/homestyle-kitchen-placeholder',
      'lai xaak bhaji': 'dishes/sarson-ka-saag',
      'ladoo': 'dishes/homestyle-kitchen-placeholder',
      'lemon sevai': 'dishes/batch3b-lemon-rice',
      'madras curry': 'dishes/andhra-chicken-curry-homestyle',
      'mangalore buns': 'dishes/homestyle-kitchen-placeholder',
      'manipuri chamthong': 'dishes/pepper-rasam',
      'manipuri eromba': 'dishes/batch3a-baingan-bharta',
      poha: 'dishes/poha-homestyle',
      'macher jhol': 'dishes/homestyle-kitchen-placeholder',
      'masala corn': 'dishes/batch5-corn-sundal',
      'mashed banana': 'dishes/mashed-banana-baby-ceramic',
      'masor tenga': 'dishes/homestyle-kitchen-placeholder',
      'meen pollichathu': 'dishes/meen-pollichathu-mobile',
      'mirapakaya bajji': 'dishes/homestyle-kitchen-placeholder',
      'mirchi bajji': 'dishes/homestyle-kitchen-placeholder',
      'mirchi ka salan': 'dishes/homestyle-kitchen-placeholder',
      'moong dal chilla': 'dishes/moong-dal-chilla',
      'mushroom omelette': 'dishes/batch5-egg-bhurji',
      'mushroom pepper rice bowl': 'dishes/homestyle-kitchen-placeholder',
      'neer dosa': 'dishes/neer-dosa-mobile',
      'neer mor': 'drinks/buttermilk-homestyle',
      'onion dosa': 'dishes/dosa-homestyle',
      'onion uttapam': 'dishes/dosa-homestyle',
      'one pot dal palak rice': 'dishes/palak-dal',
      'palak paneer': 'dishes/homestyle-kitchen-placeholder',
      'paneer curry': 'dishes/paneer-tikka-masala-homestyle',
      'paneer dosa': 'dishes/dosa-homestyle',
      'paneer tikka masala': 'dishes/paneer-tikka-masala-homestyle',
      'peanut chutney': 'dishes/batch7-peanut-chutney',
      'peanut poha': 'dishes/poha-homestyle',
      pongal: 'dishes/recommendation-pack-pongal',
      'prawn ghee roast': 'dishes/batch4-chingri-malai-curry',
      'prawn sukka': 'dishes/batch4-chingri-malai-curry',
      'pakora': 'dishes/pakora-mobile',
      'plain chapati': 'dishes/aloo-paratha-homestyle',
      'rajma chawal': 'dishes/batch3a-chole-chawal',
      'rava idli': 'dishes/idli-homestyle',
      'rice cakes': 'dishes/homestyle-kitchen-placeholder',
      'rice porridge': 'dishes/homestyle-kitchen-placeholder',
      samosa: 'dishes/batch4-kachori',
      'schezwan fried rice': 'dishes/egg-fried-rice',
      'set dosa': 'dishes/homestyle-kitchen-placeholder',
      'soft idli': 'dishes/idli-homestyle',
      'spicy masala dosa': 'dishes/dosa-homestyle',
      'sundal': 'dishes/batch5-corn-sundal',
      'sweet pongal': 'dishes/homestyle-kitchen-placeholder',
      'sweet rice': 'dishes/homestyle-kitchen-placeholder',
      'chana chaat': 'dishes/batch5-roasted-chana-chaat',
      'paneer salad': 'dishes/homestyle-kitchen-placeholder',
      'fruit chaat': 'dishes/homestyle-kitchen-placeholder',
      'cucumber raita salad': 'dishes/homestyle-kitchen-placeholder',
      'watermelon mint salad': 'dishes/homestyle-kitchen-placeholder',
      'coconut cucumber salad': 'dishes/homestyle-kitchen-placeholder',
      'carrot cucumber salad': 'dishes/homestyle-kitchen-placeholder',
      'mango salad': 'dishes/homestyle-kitchen-placeholder',
      'sticky rice': 'dishes/homestyle-kitchen-placeholder',
      'tomato uttapam': 'dishes/dosa-homestyle',
      upma: 'dishes/vegetable-upma-baby-ceramic',
      'veg cutlet': 'dishes/homestyle-kitchen-placeholder',
      'veg fried rice': 'dishes/egg-fried-rice',
      'vegetable uttapam': 'dishes/dosa-homestyle',
      'vegetable puree': 'dishes/vegetable-dal-mash-baby-ceramic',
      'vegetable stew': 'dishes/avial',
      'veg pulao': 'dishes/veg-pulao-mobile',
      'veg biryani': 'dishes/veg-biryani-mobile',
      'peas pulao': 'dishes/soft-veg-pulao-baby-ceramic',
      'mushroom pulao': 'dishes/soft-veg-pulao-baby-ceramic',
      'aloo rice': 'dishes/aloo-rice-mobile',
      'plum cake': '/assets/images/collections/desserts.webp',
      'pepper rasam': 'dishes/pepper-rasam',
      'sol kadhi': 'drinks/buttermilk-homestyle',
      'tofu bhurji': 'dishes/paneer-bhurji',
      'veg sandwich': 'dishes/batch6-paneer-sandwich',
      'beetroot palya': 'salads/beetroot-salad-homestyle',
      'potato palya': 'dishes/batch6-sweet-potato-chaat',
      'cucumber raita': 'dishes/batch6-boondi-raita',
      'onion raita': 'dishes/onion-raita-mobile',
      'mint raita': 'dishes/batch6-mint-chutney',
      'millet salad': 'salads/lentil-salad-homestyle',
      'curd rice': 'dishes/curd-rice-homestyle',
      khichdi: 'dishes/rice-moong-khichdi-homestyle',
      'rice moong khichdi': 'dishes/rice-moong-khichdi-homestyle',
      'rasam rice': 'dishes/batch3b-rasam-rice',
      'sambar rice': 'dishes/batch3b-sambar-rice',
      'lemon rice': 'dishes/batch3b-lemon-rice',
      'bamboo shoot pork': 'dishes/homestyle-kitchen-placeholder',
      'chicken pulao': 'dishes/homestyle-kitchen-placeholder',
      'gongura mutton': 'dishes/homestyle-kitchen-placeholder',
      'laal maas': 'dishes/homestyle-kitchen-placeholder',
      'pork curry': 'dishes/homestyle-kitchen-placeholder',
      'smoked pork rice': 'dishes/homestyle-kitchen-placeholder',
      'chicken curry': 'dishes/andhra-chicken-curry-homestyle',
      'chicken potato curry': 'dishes/andhra-chicken-curry-homestyle'
    };
    if (exact[title]) return exact[title].startsWith('/assets/') ? exact[title] : `/assets/images/${exact[title]}.png`;
    const blankSourceImages = new Set([
      '/assets/images/dishes/breakfast-default.png',
      '/assets/images/dishes/dinner-default.png',
      '/assets/images/dishes/dosa.png',
      '/assets/images/dishes/egg-curry.png',
      '/assets/images/dishes/idli.png',
      '/assets/images/dishes/khichdi.png',
      '/assets/images/dishes/chapati-dal.png',
      '/assets/images/dishes/dal-rice.png',
      '/assets/images/dishes/lunch-default.png',
      '/assets/images/dishes/paneer-curry.png',
      '/assets/images/dishes/paratha.png',
      '/assets/images/dishes/poha.png',
      '/assets/images/dishes/pongal.png',
      '/assets/images/dishes/pulao.png',
      '/assets/images/dishes/soup-bowls.png',
      '/assets/images/snacks/bread-pakora.png',
      '/assets/images/snacks/chicken-65.png',
      '/assets/images/snacks/mirchi-bajji.png',
      '/assets/images/snacks/pakora.png',
      '/assets/images/snacks/sandwich.png',
      '/assets/images/snacks/snacks-default.png'
    ]);
    const imageUrl = recipe?.imageUrl || recipe?.imagePath || recipe?.image_url || recipe?.image;
    if (imageUrl?.startsWith('/assets/') && !blankSourceImages.has(imageUrl)) return imageUrl;
    if (/paratha|thepla|holige/.test(title)) return '/assets/images/dishes/paneer-paratha-homestyle.png';
    if (/dosa|uttapam|appam|pesarattu/.test(title)) return '/assets/images/dishes/dosa-homestyle.png';
    if (/idli/.test(title)) return '/assets/images/dishes/idli-homestyle.png';
    if (/paneer/.test(title)) return '/assets/images/dishes/paneer-tikka-masala-homestyle.png';
    if (/chicken|kodi|kozhi/.test(title)) return '/assets/images/dishes/chicken-sukka-homestyle.png';
    if (/fish|prawn|chingri|meen|macher|masor/.test(title)) return '/assets/images/dishes/batch4-chingri-malai-curry.png';
    if (/khichdi|dalma|galho/.test(title)) return '/assets/images/dishes/rice-moong-khichdi-homestyle.png';
    if (/pakora|bajji|bonda|cutlet/.test(title)) return '/assets/images/dishes/batch4-kachori.png';
    if (/sandwich/.test(title)) return '/assets/images/dishes/batch6-paneer-sandwich.png';
    if (title.includes('chai')) return '/assets/images/drinks/masala-chai.png';
    if (title.includes('soup')) return '/assets/images/dishes/soup-bowls.png';
    if (title.includes('salad')) return '/assets/images/salads/salad-default.png';
    if (title.includes('dessert') || title.includes('kheer') || title.includes('payasam')) return '/assets/images/desserts/dessert-default.png';
    if (matchesMeal(recipe, 'snack')) return '/assets/images/snacks/snacks-default.png';
    return '/assets/images/dishes/homestyle-kitchen-placeholder.png';
  }

  function collectionImage(collection) {
    return collectionImages[collection?.key] || collection?.imagePath || '/assets/images/dishes/home-bowl.png';
  }

  function collectionByKey(key) {
    return collectionRoutes.find((item) => item.key === key) || collections.find((item) => item.key === key);
  }

  function collectionDishImageOverride(title) {
    return {
      'pepper rasam': '/assets/images/collections/soups.webp',
      'mashed banana': '/assets/images/dishes/mashed-banana-baby-ceramic.png',
      'veg sandwich': '/assets/images/snacks/sandwich.png',
      'egg sandwich': '/assets/images/dishes/batch6-egg-toast.png',
      'millet salad': '/assets/images/salads/sprouts-bowl.png',
      'peanut chutney': '/assets/images/dishes/batch6-coconut-chutney.png',
      'beetroot palya': '/assets/images/salads/beetroot-salad-homestyle.png',
      'potato palya': '/assets/images/dishes/batch6-sweet-potato-chaat.png',
      'cucumber raita': '/assets/images/dishes/batch6-boondi-raita.png',
      'onion raita': '/assets/images/dishes/onion-raita-mobile.png',
      'mint raita': '/assets/images/dishes/batch6-mint-chutney.png',
      sundal: '/assets/images/dishes/batch5-corn-sundal.png',
      'plum cake': '/assets/images/collections/desserts.webp',
      'moong dal chilla': '/assets/images/dishes/moong-dal-chilla.png',
      'egg curry rice': '/assets/images/dishes/homestyle-kitchen-placeholder.png',
      'chicken rice': '/assets/images/dishes/batch5-chicken-rice.png',
      'chicken 555': '/assets/images/snacks/chicken-65.png',
      'chicken majestic': '/assets/images/dishes/batch3a-chilli-chicken.png',
      'andhra egg fry': '/assets/images/dishes/homestyle-kitchen-placeholder.png'
    }[norm(title)] || '';
  }

  function collectionAuditImage(item) {
    const recipe = findRecipe(item?.title);
    return collectionDishImageOverride(item?.title) || item?.imagePath || item?.image_url || item?.imageUrl || (recipe ? recipeImage(recipe) : collectionDishImage(item || {}));
  }

  function collectionImageAuditStatus(src, context = {}) {
    const value = String(src || '').trim();
    const normalized = value.toLowerCase();
    const placeholder = /placeholder|home-bowl|default\.(png|webp|jpg|jpeg)$/i.test(normalized);
    const suspicious = context.type === 'hero' && context.collectionKey === 'sides-addons' && /kosambari/.test(normalized);
    const validMapping = /^\/?assets\/images\/.+\.(png|webp|jpg|jpeg)(\?.*)?$/i.test(value);
    if (!value) return { status: 'missing', label: '❌ Missing image', src: value, validMapping: false };
    if (!validMapping) return { status: 'invalid', label: '⚠ Invalid image mapping', src: value, validMapping: false };
    if (placeholder) return { status: 'placeholder', label: '⚠ Placeholder image', src: value, validMapping: true };
    if (suspicious) return { status: 'suspicious', label: '⚠ Hero image appears mapped to Kosambari', src: value, validMapping: true };
    return { status: 'pending', label: 'Checking image…', src: value, validMapping: true };
  }

  function loadCollectionAuditImage(src) {
    return new Promise((resolve) => {
      if (!src) {
        resolve(false);
        return;
      }
      const image = new Image();
      image.onload = () => resolve(Boolean(image.naturalWidth && image.naturalHeight));
      image.onerror = () => resolve(false);
      image.src = src;
    });
  }

  async function resolveCollectionAuditStatus(result) {
    if (!result.validMapping) return result;
    const loaded = await loadCollectionAuditImage(result.src);
    result.loaded = loaded;
    if (!loaded) {
      result.status = 'broken';
      result.label = '⚠ Broken image reference';
      return result;
    }
    if (result.status === 'pending') {
      result.status = 'ok';
      result.label = '✓ OK';
    }
    return result;
  }

  async function runCollectionImageAudit() {
    const usage = new Map();
    const reports = [];
    const summary = {
      collectionsAudited: collections.length,
      missingImages: 0,
      placeholderImages: 0,
      duplicateImages: 0,
      brokenReferences: 0,
      invalidMappings: 0
    };

    for (const collection of collections) {
      const heroSrc = collectionImage(collection);
      const hero = await resolveCollectionAuditStatus(collectionImageAuditStatus(heroSrc, { collectionKey: collection.key, type: 'hero' }));
      if (heroSrc) {
        if (!usage.has(heroSrc)) usage.set(heroSrc, []);
        usage.get(heroSrc).push({ collection: collection.title, subcategory: 'Hero', dish: 'Collection hero' });
      }
      const groups = collectionDetail(collection);
      const subcategories = [];

      for (const group of groups) {
        const dishes = collectionVisibleRecipes(group);
        const images = [];
        for (const item of dishes) {
          const src = collectionAuditImage(item);
          const result = await resolveCollectionAuditStatus(collectionImageAuditStatus(src, { collectionKey: collection.key, type: 'dish' }));
          result.dish = item.title;
          images.push(result);
          if (src) {
            if (!usage.has(src)) usage.set(src, []);
            usage.get(src).push({ collection: collection.title, subcategory: group.name, dish: item.title });
          }
        }
        subcategories.push({ name: group.name, count: dishes.length, images });
      }
      reports.push({ key: collection.key, collection: collection.title, hero, subcategories });
    }

    const allResults = reports.flatMap((report) => [report.hero, ...report.subcategories.flatMap((group) => group.images)]);
    summary.missingImages = allResults.filter((item) => item.status === 'missing').length;
    summary.placeholderImages = allResults.filter((item) => item.status === 'placeholder').length;
    summary.brokenReferences = allResults.filter((item) => item.status === 'broken').length;
    summary.invalidMappings = allResults.filter((item) => item.status === 'invalid').length;

    const excessiveDuplicates = [...usage.entries()]
      .map(([image, uses]) => ({ image, uses, collections: [...new Set(uses.map((use) => use.collection))] }))
      .filter((entry) => entry.collections.length >= 3 || entry.uses.length >= 6);
    summary.duplicateImages = excessiveDuplicates.length;

    console.group('Tomo Collections Image Audit');
    reports.forEach((report) => {
      console.group(report.collection);
      console.log('Hero image:', report.hero.label, report.hero.src || '');
      report.subcategories.forEach((group) => {
        const issues = group.images.filter((image) => image.status !== 'ok');
        console.log(`${group.name} (${group.count}):`, issues.length ? issues.map((image) => `${image.label}: ${image.dish} — ${image.src || 'none'}`) : '✓ OK');
      });
      console.groupEnd();
    });
    if (excessiveDuplicates.length) {
      console.group('Excessive duplicate images');
      excessiveDuplicates.forEach((entry) => {
        console.log(entry.image, 'used by:', entry.collections.join(', '), entry.uses);
      });
      console.groupEnd();
    }
    console.table(summary);
    console.groupEnd();

    return { reports, excessiveDuplicates, summary };
  }

  function generatedKey(...parts) {
    return parts
      .filter(Boolean)
      .join('-')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function generatedRecipeGroup(recipe) {
    const role = String(recipe?.recipeRole || recipe?.recipe_role || '').toLowerCase().trim();
    if (role === 'main') return 'Mains';
    if (role === 'snack') return 'Snacks';
    if (role === 'soup') return 'Soups';
    if (role === 'drink') return 'Drinks';
    if (role === 'dessert') return 'Desserts';
    if (role === 'condiment') return 'Condiments';
    if (role === 'side') return 'Sides';
    return 'Dishes';
  }

  function generatedRecipeItem(recipe, index = 0) {
    const group = generatedRecipeGroup(recipe);
    return {
      id: recipe.id,
      recipeId: recipe.id,
      title: recipe.title || recipe.name || 'Untitled recipe',
      description: recipe.description || 'A Tomo recipe from this collection.',
      subcategory: group,
      subCategory: group,
      time: totalTime(recipe),
      timeMinutes: totalTime(recipe),
      difficulty: recipe.difficulty || 'easy',
      dietType: recipe.dietType,
      imagePath: recipeImage(recipe),
      image_url: recipeImage(recipe),
      recipe,
      featured_priority: Math.max(0, 1000 - index),
      discovery_score: Math.max(0, 1000 - index),
      recipe_type: 'core',
      recipeType: 'core',
    };
  }

  function generatedGroupOrder(items) {
    const preferred = ['Mains', 'Snacks', 'Soups', 'Drinks', 'Desserts', 'Sides', 'Condiments', 'Dishes'];
    const present = new Set(items.map((item) => item.subcategory || item.subCategory || 'Dishes'));
    return preferred.filter((name) => present.has(name));
  }

  function generatedCollectionDisplayKey(collection) {
    return `${collection?.hubName || collection?.collectionHome?.hub || ''}::${collection?.title || collection?.collectionHome?.collection || ''}`;
  }

  function generatedSignalList(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    if (value && typeof value === 'object') return Object.values(value).flatMap(generatedSignalList);
    return [];
  }

  function generatedRegionalCoverageText(recipe) {
    const ingredients = generatedSignalList(recipe?.ingredients)
      .map((ingredient) => typeof ingredient === 'string' ? ingredient : ingredient?.name);
    return norm([
      recipe?.title,
      recipe?.name,
      recipe?.sourceId,
      recipe?.description,
      recipe?.cuisine,
      recipe?.region,
      recipe?.dishFamily,
      recipe?.dish_family,
      ...generatedSignalList(recipe?.regionTags),
      ...generatedSignalList(recipe?.tags),
      ...generatedSignalList(recipe?.aliases),
      ...generatedSignalList(recipe?.mealTags),
      ...generatedSignalList(recipe?.moodTags),
      ...generatedSignalList(recipe?.coreIngredients),
      ...generatedSignalList(recipe?.requiredIngredients),
      ...generatedSignalList(recipe?.optionalIngredients),
      ...ingredients
    ].filter(Boolean).join(' '));
  }

  function generatedCoverageHasAlias(text, alias) {
    const normalizedAlias = norm(alias);
    if (!normalizedAlias) return false;
    const pattern = new RegExp(`(^|\\s)${normalizedAlias.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}(\\s|$)`);
    return pattern.test(text);
  }

  function generatedRegionalCoverageMatches(recipe, collectionName) {
    if (recipe?.collectionHome?.hub === 'Regional Journeys' && recipe.collectionHome.collection === collectionName) return true;
    const aliases = generatedRegionalCoverageRules[collectionName] || [];
    if (!aliases.length) return false;
    const text = generatedRegionalCoverageText(recipe);
    return aliases.some((alias) => generatedCoverageHasAlias(text, alias));
  }

  function generatedRecipeSignals(recipe) {
    const values = [
      recipe?.title,
      recipe?.name,
      recipe?.description,
      recipe?.dishFamily,
      recipe?.dish_family,
      recipe?.recipeRole,
      recipe?.recipe_role,
      recipe?.dietType,
      recipe?.diet_type,
      ...generatedSignalList(recipe?.mealTags),
      ...generatedSignalList(recipe?.moodTags),
      ...generatedSignalList(recipe?.regionTags),
      ...generatedSignalList(recipe?.dietaryTags),
      ...generatedSignalList(recipe?.tags),
      ...generatedSignalList(recipe?.coreIngredients),
      ...generatedSignalList(recipe?.requiredIngredients),
      ...generatedSignalList(recipe?.optionalIngredients),
      ...generatedSignalList(recipe?.ingredients).map((ingredient) => typeof ingredient === 'string' ? ingredient : ingredient?.name)
    ];
    return {
      title: norm(recipe?.title || recipe?.name || ''),
      role: String(recipe?.recipeRole || recipe?.recipe_role || '').toLowerCase().trim(),
      family: norm(recipe?.dishFamily || recipe?.dish_family || ''),
      meal: norm([...generatedSignalList(recipe?.mealTags), ...generatedSignalList(recipe?.tags)].join(' ')),
      mood: norm([...generatedSignalList(recipe?.moodTags), ...generatedSignalList(recipe?.tags)].join(' ')),
      region: norm([...generatedSignalList(recipe?.regionTags), recipe?.cuisine, recipe?.region].join(' ')),
      diet: norm([...generatedSignalList(recipe?.dietaryTags), recipe?.dietType, recipe?.diet_type].join(' ')),
      text: norm(values.filter(Boolean).join(' '))
    };
  }

  function signalHas(signal, patterns) {
    return patterns.some((pattern) => signal.text.includes(pattern) || signal.title.includes(pattern) || signal.family.includes(pattern));
  }

  function generatedFallbackDisplayGroup(recipe, sections = []) {
    const signal = generatedRecipeSignals(recipe);
    const byRole = generatedRecipeGroup(recipe);
    const preferred = {
      main: ['Mains & Meals', 'Meals & Mains', 'Comfort Mains', 'Protein Mains', 'Simple Mains', 'Comfort Plates', 'Curries & Mains', 'Mains & Bhakri Plates', 'Spicy Mains', 'Comfort Mains'],
      snack: ['Snacks', 'Chai Snacks', 'Street Food & Snacks', 'Street Bites', 'Global Snacks', 'After School Snacks', 'Snacks & Street Bites'],
      soup: ['Saaru, Rasam & Soups', 'Pappu, Pulusu & Rasam', 'Rasam, Kuzhambu & Kootu', 'Soups', 'Rasam & Saaru', 'Warm Bowls'],
      drink: ['Drinks', 'Hot Drinks', 'Coolers', 'Sweets & Drinks', 'Chai Companions'],
      dessert: ['Sweets', 'Sweets & Drinks', 'Classic Sweets', 'Festival Specials', 'Quick Sweets', 'Regional Sweets', 'Summer Sweets'],
      side: ['Palyas, Poriyals & Thorans', 'Greens & Sides', 'Cooling Sides', 'Sides'],
      condiment: ['Chutneys', 'Condiments', 'Raitas', 'Podis', 'Pickles']
    }[signal.role] || [byRole];
    return preferred.find((name) => sections.includes(name)) || sections[0] || byRole;
  }

  function generatedSpecificDisplayGroup(collection, item) {
    const recipe = item.recipe || item;
    const signal = generatedRecipeSignals(recipe);
    const sections = generatedCollectionDisplaySections[generatedCollectionDisplayKey(collection)] || [];
    const title = signal.title;
    const text = signal.text;
    const role = signal.role;
    const isBreakfast = signal.meal.includes('breakfast') || signalHas(signal, ['idli', 'dosa', 'uttapam', 'pongal', 'upma', 'poha', 'sevai', 'cheela', 'chilla', 'paratha', 'toast', 'sandwich', 'appam', 'puttu', 'rotti']);
    const isDrink = role === 'drink' || signalHas(signal, ['chai', 'tea', 'coffee', 'juice', 'sherbet', 'lassi', 'mor', 'paanaka', 'kashaya', 'drink', 'cooler', 'buttermilk', 'jal jeera']);
    const isSweet = role === 'dessert' || signalHas(signal, ['sweet', 'peda', 'jamun', 'payasam', 'kheer', 'halwa', 'ladoo', 'laddu', 'barfi', 'burfi', 'modak', 'poli', 'obbattu', 'holige', 'sheera', 'kesari', 'mysore pak', 'rasgulla', 'sandesh', 'dessert']);
    const isSoup = role === 'soup' || signalHas(signal, ['soup', 'rasam', 'saaru', 'charu', 'pulusu', 'kuzhambu', 'kootu', 'stew', 'tambuli']);
    const isSnack = role === 'snack' || signal.meal.includes('snack') || signalHas(signal, ['bajji', 'pakora', 'samosa', 'bonda', 'vada', 'chaat', 'bun', 'toast', 'goli baje', 'girmit', 'mandakki', 'cutlet', 'roll']);
    const isSide = role === 'side' || signalHas(signal, ['palya', 'poriyal', 'thoran', 'salad', 'sundal', 'raita', 'kosambari', 'bhaji']);
    const isCondiment = role === 'condiment' || signalHas(signal, ['chutney', 'podi', 'pickle', 'achaar', 'raita', 'dip', 'condiment']);
    const isSeafood = signalHas(signal, ['fish', 'meen', 'prawn', 'seafood', 'konkan', 'mangalorean fish']);
    const isRiceDal = signalHas(signal, ['rice', 'dal', 'pappu', 'khichdi', 'pulao', 'biryani', 'sambar', 'rasam']);
    const isBread = signalHas(signal, ['roti', 'rotti', 'chapati', 'paratha', 'naan', 'kulcha', 'bhakri', 'jolada', 'mudde']);
    const isProtein = signalHas(signal, ['egg', 'chicken', 'fish', 'paneer', 'dal', 'lentil', 'chana', 'chole', 'rajma', 'sprout', 'sundal', 'peanut', 'tofu', 'besan', 'moong']) || signal.mood.includes('protein');
    const isLight = signal.mood.includes('light') || signalHas(signal, ['salad', 'soup', 'rasam', 'stew', 'bowl', 'kanji', 'porridge']);
    const isQuick = signal.mood.includes('quick') || signalHas(signal, ['quick', 'easy', 'toast', 'sandwich', 'poha', 'upma']);

    switch (generatedCollectionDisplayKey(collection)) {
      case 'Regional Journeys::Karnataka':
        if (isBreakfast) return 'Breakfast & Tiffin';
        if (isSoup) return 'Saaru, Rasam & Soups';
        if (isSnack) return 'Snacks & Street Bites';
        if (isSweet || isDrink) return 'Sweets & Drinks';
        return 'Mains & Meals';
      case 'Regional Journeys::Andhra & Telangana':
        if (isBreakfast) return 'Breakfast & Tiffin';
        if (isSoup || signalHas(signal, ['pappu', 'pulusu', 'charu'])) return 'Pappu, Pulusu & Rasam';
        if (isSnack) return 'Snacks';
        if (isSweet) return 'Sweets';
        return 'Spicy Mains';
      case 'Regional Journeys::Tamil Nadu':
        if (isBreakfast) return 'Breakfast & Tiffin';
        if (isSoup || signalHas(signal, ['kuzhambu', 'kootu'])) return 'Rasam, Kuzhambu & Kootu';
        if (isSnack) return 'Snacks';
        if (isSweet || isDrink) return 'Sweets & Drinks';
        return 'Meals & Mains';
      case 'Regional Journeys::Kerala':
        if (isBreakfast) return 'Breakfast Staples';
        if (isSeafood) return 'Seafood';
        if (isSnack) return 'Snacks';
        if (isSweet || isDrink) return 'Sweets & Drinks';
        return 'Curries & Mains';
      case 'Regional Journeys::Bengal':
        if (isSweet) return 'Sweets';
        if (isSnack) return 'Street Snacks';
        if (isSeafood || signalHas(signal, ['fish', 'mach'])) return 'Fish & Mains';
        return 'Comfort Plates';
      case 'Regional Journeys::Maharashtra':
        if (isBreakfast || signalHas(signal, ['pav', 'misal', 'poha'])) return 'Breakfast & Street Food';
        if (isSeafood) return 'Seafood & Konkan';
        if (isSnack) return 'Snacks';
        if (isSweet || isDrink) return 'Sweets & Drinks';
        return 'Mains & Bhakri Plates';
      case 'Regional Journeys::Northeast':
        if (isSnack) return 'Snacks';
        if (isSweet) return 'Sweets';
        if (isSide || signalHas(signal, ['greens', 'xaak'])) return 'Greens & Sides';
        if (signalHas(signal, ['smoked', 'fermented', 'bamboo', 'axone'])) return 'Smoked & Fermented';
        return 'Rice, Stews & Mains';
      case 'Regional Journeys::North & West India':
        if (isDrink) return 'Drinks';
        if (isSweet) return 'Sweets';
        if (isSnack || signalHas(signal, ['chaat', 'kachori'])) return 'Street Food & Snacks';
        if (isBread || title.includes('rice')) return 'Breads & Rice Plates';
        return 'Comfort Mains';
      case 'Regional Journeys::Jammu & Kashmir':
        if (isDrink) return 'Drinks';
        if (isSweet) return 'Sweets';
        if (isBread || title.includes('rice')) return 'Rice & Breads';
        return 'Wazwan & Mains';
      case 'Everyday Cooking::Daily Comforts':
        if (isBreakfast) return 'Breakfast Staples';
        if (isRiceDal) return 'Rice & Dal Meals';
        if (isQuick) return 'Quick Comforts';
        return 'Simple Dinner Ideas';
      case 'Everyday Cooking::Tea Time Favourites':
        if (isDrink) return 'Hot Drinks';
        if (signalHas(signal, ['bun', 'toast', 'bakery', 'bread', 'cake', 'biscuit'])) return 'Bakery Bites';
        if (signalHas(signal, ['chaat', 'girmit', 'mandakki', 'street'])) return 'Street Bites';
        return 'Chai Snacks';
      case 'Everyday Cooking::Home Staples':
        if (isQuick) return 'Quick Staples';
        if (signalHas(signal, ['pantry', 'pickle', 'podi', 'chutney'])) return 'Pantry Friendly';
        return 'Simple Mains';
      case 'Healthy Living::Healthy Plates':
        if (isBreakfast && isProtein) return 'Protein Breakfasts';
        if (isLight) return 'Light Bowls';
        if (isQuick) return 'Quick Healthy';
        return isProtein ? 'Protein Mains' : 'Quick Healthy';
      case 'Healthy Living::Warm & Light Bowls':
        if (signalHas(signal, ['rasam', 'saaru', 'charu'])) return 'Rasam & Saaru';
        if (signal.mood.includes('sick') || signalHas(signal, ['sick', 'kanji', 'porridge'])) return 'Sick-Day Comfort';
        if (signalHas(signal, ['stew', 'tambuli', 'bowl'])) return 'Light Stews';
        return 'Soups';
      case 'Family Favorites::Tiny Tummy Favorites':
        if (signalHas(signal, ['mash', 'mashed', 'puree', 'purée'])) return 'Purees & Mashes';
        if (signalHas(signal, ['baby', 'first food', 'first foods'])) return 'First Foods';
        if (isSnack) return 'Growing Bites';
        return 'Little Plates';
      case 'Family Favorites::Lunch Box & Tiffin':
        if (isBreakfast || isQuick) return 'Quick Morning Wins';
        if (isProtein) return 'Protein Packed';
        if (isSnack) return 'After School Snacks';
        return 'Tiffin Box Favorites';
      case 'Global Bites::Global Breakfasts':
        if (signalHas(signal, ['toast', 'bakery', 'bread'])) return 'Toast & Bakery';
        if (isSweet) return 'Sweet Breakfasts';
        if (signalHas(signal, ['healthy', 'oats', 'porridge', 'fruit'])) return 'Healthy Breakfasts';
        return 'Egg Breakfasts';
      case 'Global Bites::Global Bowls':
        if (signalHas(signal, ['noodle', 'ramen'])) return 'Noodle Bowls';
        if (isProtein) return 'Protein Bowls';
        if (signal.diet.includes('vegetarian') || signalHas(signal, ['veg', 'paneer', 'tofu'])) return 'Vegetarian Bowls';
        return 'Rice Bowls';
      case 'Global Bites::Global Mains':
        if (signalHas(signal, ['fried rice', 'schezwan', 'indo chinese', 'chinese'])) return 'Fried Rice & Indo-Chinese';
        if (signalHas(signal, ['asian', 'stir fry', 'garlic chicken', 'mushroom'])) return 'Asian Comforts';
        if (signalHas(signal, ['mediterranean', 'hummus', 'falafel'])) return 'Mediterranean Plates';
        return 'Continental Classics';
      case 'Global Bites::Global Snacks':
        if (signalHas(signal, ['chilli', 'manchurian', 'dragon'])) return 'Indo-Chinese Starters';
        if (signalHas(signal, ['wrap', 'roll'])) return 'Wraps & Rolls';
        if (signalHas(signal, ['dip', 'hummus', 'plate'])) return 'Dips & Plates';
        return 'Quick Bites';
      case 'Global Bites::Global Soups':
        if (signalHas(signal, ['noodle'])) return 'Noodle Soups';
        if (signalHas(signal, ['hot and sour', 'manchow'])) return 'Indo-Chinese Soups';
        if (signalHas(signal, ['corn', 'veg', 'vegetable'])) return 'Veg Soups';
        return 'Clear Soups';
      case 'Global Bites::Global Street Food':
        if (signalHas(signal, ['wrap', 'roll'])) return 'Street Wraps';
        if (signalHas(signal, ['taco', 'quesadilla'])) return 'Tacos & Quesadillas';
        if (signalHas(signal, ['loaded', 'nachos', 'fries'])) return 'Loaded Snacks';
        return 'Handheld Bites';
      case 'Kitchen Essentials::Sides, Salads & Add-ons':
        if (signalHas(signal, ['raita', 'curd', 'yogurt'])) return 'Raitas & Cooling Sides';
        if (signalHas(signal, ['salad', 'kosambari', 'fresh'])) return 'Salads & Fresh Sides';
        if (signalHas(signal, ['sundal', 'corn', 'add on', 'addon'])) return 'Sundals & Add-ons';
        return 'Palyas, Poriyals & Thorans';
      case 'Kitchen Essentials::Chutneys, Podis & Condiments':
        if (signalHas(signal, ['podi', 'powder'])) return 'Podis';
        if (signalHas(signal, ['pickle', 'achaar'])) return 'Pickles';
        if (signalHas(signal, ['raita', 'curd', 'yogurt'])) return 'Raitas';
        if (signalHas(signal, ['chutney'])) return 'Chutneys';
        return 'Condiments';
      case 'Seasonal Specials::Summer Cooling':
        if (isDrink) return 'Coolers';
        if (isSide) return 'Cooling Sides';
        if (isSweet) return 'Summer Sweets';
        return 'Light Meals';
      case 'Seasonal Specials::Rainy Day Cravings':
        if (isDrink) return 'Chai Companions';
        if (isSoup) return 'Warm Bowls';
        return 'Hot Snacks';
      case 'Celebrations & Traditions::Festival Sweets':
        if (signalHas(signal, ['payasam', 'kheer'])) return 'Payasam & Kheer';
        if (signalHas(signal, ['fried', 'jalebi', 'jamun', 'boondi', 'imarti'])) return 'Fried Sweets';
        if (signalHas(signal, ['festival', 'modak', 'poli', 'obbattu', 'holige', 'prasadam'])) return 'Festival Specials';
        return 'Classic Sweets';
      case 'Celebrations & Traditions::Regional Sweets':
        if (signal.region.includes('karnataka') || signalHas(signal, ['peda', 'mysore', 'dharwad'])) return 'Karnataka Sweets';
        if (signal.region.includes('bengal') || signalHas(signal, ['rasgulla', 'sandesh'])) return 'Bengali Sweets';
        if (signal.region.includes('tamil') || signal.region.includes('kerala') || signal.region.includes('south')) return 'South Indian Sweets';
        return 'North Indian Sweets';
      case 'Celebrations & Traditions::Everyday Desserts':
        if (signalHas(signal, ['milk', 'kheer', 'payasam', 'peda'])) return 'Milk Sweets';
        if (signalHas(signal, ['fruit', 'banana', 'mango', 'apple'])) return 'Fruit Desserts';
        return 'Quick Sweets';
      case 'Celebrations & Traditions::Prasadam & Temple Foods':
        if (signalHas(signal, ['temple'])) return 'Temple Foods';
        if (signalHas(signal, ['festival', 'offering'])) return 'Festival Offerings';
        return 'Prasadam';
      default:
        return generatedFallbackDisplayGroup(recipe, sections);
    }
  }

  function generatedCollectionDisplayGroups(collection) {
    const sections = generatedCollectionDisplaySections[generatedCollectionDisplayKey(collection)];
    if (!sections) {
      const groups = new Map((collection.subcategory_order || []).map((name) => [name, []]));
      (collection.items || []).forEach((item) => {
        const name = item.subcategory || item.subCategory || generatedRecipeGroup(item.recipe || item);
        if (!groups.has(name)) groups.set(name, []);
        groups.get(name).push(item);
      });
      return [...groups.entries()]
        .filter(([, list]) => list.length)
        .map(([name, list]) => ({ name, recipes: list, collectionKey: collection.key || '' }));
    }

    const groups = new Map(sections.map((name) => [name, []]));
    const seen = new Set();
    (collection.items || []).forEach((item) => {
      const id = item.recipeId || item.id || norm(item.title);
      if (seen.has(id)) return;
      seen.add(id);
      const target = generatedSpecificDisplayGroup(collection, item);
      const name = groups.has(target) ? target : generatedFallbackDisplayGroup(item.recipe || item, sections);
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(item);
    });
    return [...groups.entries()]
      .filter(([, list]) => list.length)
      .map(([name, list]) => ({ name, recipes: list, collectionKey: collection.key || '' }));
  }

  function buildGeneratedCollectionSystem() {
    const hubMap = new Map();
    const addRecipeToGeneratedCollection = (hubName, collectionName, recipe, index) => {
      if (!hubName || !collectionName || !recipe) return;
      if (!hubMap.has(hubName)) hubMap.set(hubName, { hub: hubName, recipes: [], recipeIds: new Set(), collections: new Map() });
      const hub = hubMap.get(hubName);
      const recipeKey = recipe.id || recipe.sourceId || norm(recipe.title || recipe.name);
      if (!hub.recipeIds.has(recipeKey)) {
        hub.recipeIds.add(recipeKey);
        hub.recipes.push(recipe);
      }
      if (!hub.collections.has(collectionName)) hub.collections.set(collectionName, []);
      const collectionItems = hub.collections.get(collectionName);
      if (!collectionItems.some(({ recipe: item }) => (item.id || item.sourceId || norm(item.title || item.name)) === recipeKey)) {
        collectionItems.push({ recipe, index });
      }
    };

    recipes.forEach((recipe, index) => {
      const home = recipe.collectionHome;
      if (!home?.hub || !home?.collection) return;
      addRecipeToGeneratedCollection(home.hub, home.collection, recipe, index);
    });

    (generatedCollectionOrder['Regional Journeys'] || []).forEach((collectionName) => {
      recipes.forEach((recipe, index) => {
        if (generatedRegionalCoverageMatches(recipe, collectionName)) {
          addRecipeToGeneratedCollection('Regional Journeys', collectionName, recipe, index);
        }
      });
    });

    const generatedCollections = [];
    const hubs = generatedHubOrder
      .filter((hubName) => hubMap.has(hubName))
      .map((hubName) => {
        const hub = hubMap.get(hubName);
        const orderedCollectionNames = [
          ...(generatedCollectionOrder[hubName] || []),
          ...[...hub.collections.keys()].filter((name) => !(generatedCollectionOrder[hubName] || []).includes(name)).sort(),
        ].filter((name) => hub.collections.has(name));
        const childCollections = orderedCollectionNames.map((collectionName) => {
          const pairs = hub.collections.get(collectionName) || [];
          const items = pairs.map(({ recipe, index }) => generatedRecipeItem(recipe, index));
          const firstImage = items.find((item) => item.imagePath)?.imagePath;
          const collection = {
            key: `generated-collection-${generatedKey(hubName, collectionName)}`,
            generatedType: 'collection',
            hubName,
            hubKey: `generated-hub-${generatedKey(hubName)}`,
            title: collectionName,
            copy: generatedCollectionDescriptions[collectionName] || `${items.length} Tomo recipes.`,
            subtitle: generatedCollectionDescriptions[collectionName] || `${items.length} Tomo recipes.`,
            icon: generatedHubMeta[hubName]?.icon || '🍲',
            imagePath: firstImage || generatedHubMeta[hubName]?.imagePath || '/assets/images/dishes/home-bowl.png',
            count: items.length,
            subcategory_order: generatedGroupOrder(items),
            items,
          };
          generatedCollections.push(collection);
          return collection;
        });

        return {
          key: `generated-hub-${generatedKey(hubName)}`,
          generatedType: 'hub',
          title: hubName,
          copy: generatedHubMeta[hubName]?.copy || `${hub.recipes.length} Tomo recipes.`,
          subtitle: generatedHubMeta[hubName]?.copy || `${hub.recipes.length} Tomo recipes.`,
          icon: generatedHubMeta[hubName]?.icon || '🍲',
          imagePath: generatedHubMeta[hubName]?.imagePath || childCollections[0]?.imagePath || '/assets/images/dishes/home-bowl.png',
          count: hub.recipes.length,
          generatedCollections: childCollections,
          items: childCollections,
        };
      });

    return { hubs, collections: generatedCollections };
  }

  function buildGymFoodsCollection() {
    const groups = [
      ['High Protein Breakfast', [
        ['Egg Toast', 'Quick eggs with filling toast.'],
        ['Bread Omelette', 'Egg and bread for a strong start.'],
        ['Masala Omelette', 'Spiced eggs with morning energy.'],
        ['Besan Chilla', 'Gram flour breakfast with protein.'],
        ['Egg Bhurji', 'Quick scrambled eggs for a protein-forward start.'],
        ['Moong Dal Chilla', 'Lentil chilla for steady morning protein.'],
        ['Onion Omelette', 'Onion omelette for a simple protein breakfast.'],
        ['Puttu Kadala', 'Kadala and puttu for a filling protein start.']
      ]],
      ['Post Workout Meals', [
        ['Chicken Curry', 'Protein-rich curry for recovery.'],
        ['Chicken Stew', 'Gentle chicken for lighter recovery.'],
        ['Egg Curry Rice', 'Egg curry with steady carbs.'],
        ['Fish Curry Rice', 'Fish and rice after training.'],
        ['Chicken Rice', 'Chicken and rice for a filling recovery meal.'],
        ['Garlic Chicken', 'Bold chicken protein for active days.'],
        ['Fish Fry', 'Crisp fish protein with big flavor.'],
        ['Chicken Fried Rice', 'Chicken rice bowl for quick recovery.']
      ]],
      ['Vegetarian Protein', [
        ['Palak Paneer', 'Spinach and paneer strength bowl.'],
        ['Rajma Chawal', 'Rajma and rice for plant recovery.'],
        ['Chole Chawal', 'Chickpea rice for steady energy.'],
        ['Dal Makhani', 'Slow dal comfort with protein.'],
        ['Soya Chunks Curry', 'Soya curry for a strong vegetarian plate.'],
        ['Sprouts Usal', 'Sprouted pulses for light protein.'],
        ['Matar Paneer', 'Paneer and peas for a hearty vegetarian meal.'],
        ['Kadai Paneer', 'Paneer curry with complete meal energy.']
      ]],
      ['Protein Snacks', [
        ['Paneer Tikka', 'Paneer bites for snack protein.'],
        ['Chilli Paneer', 'Paneer snack with bold flavor.'],
        ['Roasted Chana Chaat', 'Crunchy chana for a protein snack.'],
        ['Paneer Pakora', 'Paneer snack for a filling bite.'],
        ['Chicken 65', 'Chicken snack with bold protein.'],
        ['Chicken 555', 'Crisp chicken bites for a protein snack.'],
        ['Chicken Majestic', 'Chicken snack for active-day cravings.'],
        ['Andhra Egg Fry', 'Spiced egg fry for quick protein.']
      ]]
    ];
    return {
      key: 'gym-foods',
      title: 'Power Plates',
      subtitle: 'Protein-rich meals and snacks',
      copy: 'Protein-rich meals and snacks for strength, recovery and busy days.',
      tone: 'gym-tone',
      icon: '💪',
      imagePath: '/assets/images/collections/power-plates-collection-card.png?v=collection-card-images-68',
      items: groups.flatMap(([subcategory, titles], groupIndex) => titles.map(([title, description], index) => gymCollectionItem(title, description, subcategory, groupIndex, index)))
    };
  }

  function mobileCollectionOverride(collection) {
    if (collection.key === 'lunchbox') return buildLunchBoxHeroesCollection(collection);
    if (collection.key === 'drinks') return buildSipsSoothersCollection(collection);
    if (collection.key === 'salads') return buildFreshPlatesCollection(collection);
    if (collection.key === 'gym-foods') {
      return {
        ...collection,
        title: 'Power Plates',
        copy: 'Protein-rich meals and snacks for strength, recovery and busy days.'
      };
    }
    return collection;
  }

  function buildSipsSoothersCollection(collection) {
    const summerCoolers = new Set(['tender coconut water', 'masala chaas', 'panakam', 'aam panna']);
    const nourishingSips = new Set(['banana shake', 'sattu drink', 'green moong drink']);
    return {
      ...collection,
      items: (collection?.items || []).map((item) => {
        const title = norm(item.title);
        if (summerCoolers.has(title)) {
          return {
            ...item,
            subCategory: 'Summer Coolers',
            subcategory: 'Summer Coolers'
          };
        }
        if (nourishingSips.has(title)) {
          return {
            ...item,
            subCategory: 'Nourishing Sips',
            subcategory: 'Nourishing Sips'
          };
        }
        return item;
      })
    };
  }

  function buildFreshPlatesCollection(collection) {
    const removeTitles = new Set(['kosambari', 'peanut kosambari']);
    return {
      ...collection,
      items: (collection?.items || [])
        .filter((item) => !removeTitles.has(norm(item.title)))
        .map((item) => {
          const image = freshPlatesImageOverride(item.title);
          return image ? { ...item, imagePath: image, image_url: image, imageUrl: image } : item;
        })
    };
  }

  function freshPlatesImageOverride(title) {
    return {
      'mixed veg salad': '/assets/images/dishes/batch6-mixed-veg-salad.png'
    }[norm(title)] || '';
  }

  function buildLunchBoxHeroesCollection(collection) {
    const groups = [
      ['Quick Morning Wins', ['Poha', 'Mini Uttapam', 'Veg Seviyan', 'Bread Upma', 'Rava Idli', 'Dosa Roll', 'Avalakki', 'Egg Toast']],
      ['Tiffin Box Favorites', ['Mini Idli', 'Lemon Rice', 'Tomato Rice', 'Aloo Paratha', 'Peanut Rice', 'Chapati Jam Roll', 'Paneer Sandwich', 'Veg Sandwich']],
      ['Protein Packed', ['Paneer Roll', 'Egg Roll', 'Paneer Bhurji Wrap', 'Egg Fried Rice', 'Egg Sandwich', 'Moong Dal Cheela', 'Cheese Veg Sandwich', 'Chicken Roll']],
      ['After School Snacks', ['Veg Cutlet', 'Banana Pancake', 'Masala Makhana', 'Sweet Potato Chaat', 'Mini Dhokla', 'Roasted Chana Chaat', 'Khandvi', 'Kuzhi Paniyaram']]
    ];
    return {
      ...collection,
      subcategory_order: groups.map(([name]) => name),
      items: groups.flatMap(([subcategory, titles], groupIndex) => titles.map((title, index) => lunchBoxCollectionItem(collection, title, subcategory, groupIndex, index)))
    };
  }

  function lunchBoxCollectionItem(collection, title, subcategory, groupIndex, index) {
    const existing = (collection?.items || []).find((item) => norm(item.title) === norm(title));
    const recipe = findRecipe(title);
    const image = lunchBoxImageOverride(title) || existing?.imagePath || existing?.image_url || existing?.imageUrl || (recipe ? recipeImage(recipe) : '/assets/images/dishes/home-bowl.png');
    return {
      ...(existing || {}),
      id: existing?.id || recipe?.id || `${norm(title).replace(/\s+/g, '-')}-lunchbox`,
      recipe_id: existing?.recipe_id || existing?.id || recipe?.id || `${norm(title).replace(/\s+/g, '-')}-lunchbox`,
      title,
      description: existing?.description || recipe?.description || 'A lunchbox-friendly Tomo pick for busy days.',
      subCategory: subcategory,
      subcategory,
      time: existing?.time || totalTime(recipe),
      tags: existing?.tags || ['lunchbox', 'tiffin', 'kid-friendly'],
      featured_priority: 100 - groupIndex * 10 - index,
      discovery_score: 100 - groupIndex * 10 - index,
      collection_order: groupIndex + 1,
      display_order: index + 1,
      imagePath: image,
      image_url: image
    };
  }

  function lunchBoxImageOverride(title) {
    return {
      'egg toast': '/assets/images/dishes/batch6-egg-toast.png',
      'paneer sandwich': '/assets/images/dishes/batch6-paneer-sandwich.png',
      'banana pancake': '/assets/images/dishes/batch6-banana-pancake.png',
      'chapati jam roll': '/assets/images/dishes/batch6-chapati-jam-roll.png',
      'paneer roll': '/assets/images/dishes/batch6-paneer-roll.png',
      'egg roll': '/assets/images/dishes/batch6-egg-roll.png',
      'chicken roll': '/assets/images/dishes/batch6-chicken-roll.png',
      'avalakki': '/assets/images/dishes/consistency-45-avalakki.png',
      'masala makhana': '/assets/images/dishes/consistency-45-masala-makhana.png',
      'sweet potato chaat': '/assets/images/dishes/batch6-sweet-potato-chaat.png',
      'mini uttapam': '/assets/images/dishes/dosa-homestyle.png',
      'veg seviyan': '/assets/images/dishes/vegetable-seviyan-baby-ceramic.png',
      'moong dal cheela': '/assets/images/dishes/moong-dal-chilla.png',
      'veg cutlet': '/assets/images/dishes/homestyle-kitchen-placeholder.png'
    }[norm(title)] || '';
  }

  function buildSidesAddOnsCollection() {
    const groups = [
      ['Chutneys', ['Coconut Chutney', 'Tomato Chutney', 'Peanut Chutney', 'Mint Chutney']],
      ['Palyas & Stir Fries', ['Beans Poriyal', 'Cabbage Thoran', 'Beetroot Palya', 'Potato Palya']],
      ['Raitas', ['Cucumber Raita', 'Onion Raita', 'Mint Raita', 'Boondi Raita']],
      ['Sundals & Extras', ['Corn Sundal', 'Peanut Sundal', 'Sundal', 'Kosambari']]
    ];
    return {
      key: 'sides-addons',
      title: 'Sides & Add-ons',
      subtitle: 'Chutneys, palyas, raitas and extras',
      copy: 'Chutneys, palyas, raitas and extras to complete your meal.',
      tone: 'sides-tone',
      icon: '🥗',
      imagePath: '/assets/images/collections/sides-addons-collection-card.png?v=collection-card-images-68',
      subcategory_order: groups.map(([name]) => name),
      items: groups.flatMap(([subcategory, titles], groupIndex) => titles.map((title, index) => sideCollectionItem(title, subcategory, groupIndex, index)))
    };
  }

  function sideCollectionItem(title, subcategory, groupIndex, index) {
    const recipe = findRecipe(title);
    return {
      id: recipe?.id || norm(title).replace(/\s+/g, '-'),
      title,
      description: recipe?.description || 'A simple side to round out your meal.',
      subCategory: subcategory,
      subcategory,
      time: totalTime(recipe),
      tags: ['sides-addons', 'side-dish', 'meal-extra'],
      featured_priority: 100 - groupIndex * 10 - index,
      discovery_score: 100 - groupIndex * 10 - index,
      collection_order: groupIndex + 1,
      display_order: index + 1,
      imagePath: recipe ? recipeImage(recipe) : '/assets/images/dishes/kosambari.png',
      recipe_type: 'collection',
      recipeType: 'collection',
      primary_ingredient_1: recipe?.primaryIngredient1 || recipe?.primary_ingredient_1 || null,
      primary_ingredient_2: recipe?.primaryIngredient2 || recipe?.primary_ingredient_2 || null,
      primaryIngredient1: recipe?.primaryIngredient1 || recipe?.primary_ingredient_1 || null,
      primaryIngredient2: recipe?.primaryIngredient2 || recipe?.primary_ingredient_2 || null
    };
  }

  function buildGlobalBitesCollection() {
    return {
      key: 'global-bites',
      title: 'Global Bites',
      subtitle: 'Coming Soon',
      copy: 'Pizza, pasta, burgers, Mediterranean bowls and global comfort foods are coming soon.',
      tone: 'global-tone',
      icon: '🌍',
      status: 'coming-soon',
      imagePath: '/assets/images/dishes/noodles.png',
      items: []
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
    if (collection?.generatedType === 'collection') {
      return generatedCollectionDisplayGroups(collection);
    }

    const celebrationOrder = ['Festive Sweets', 'Regional Feasts', 'Traditional Favorites', 'Seasonal Celebrations'];
    const isCelebration = collection?.key === 'festival';
    const showEmptyGroups = collection?.key === 'sides-addons';
    const items = [...(collection?.items || [])].sort((a, b) => {
      return Number(b.featured_priority || 0) - Number(a.featured_priority || 0)
        || Number(b.discovery_score || 0) - Number(a.discovery_score || 0);
    });
    const seededGroups = isCelebration ? celebrationOrder : (collection?.subcategory_order || []);
    const groups = new Map(seededGroups.map((name) => [name, []]));
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
    return [...groups.entries()].filter(([, list]) => showEmptyGroups || list.length).map(([name, list]) => ({ name, recipes: list, collectionKey: collection?.key || '' }));
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
      <header class="mv2-header ${state.screen === 'discover' ? 'mv2-discover-header' : ''} ${state.screen === 'journal' ? 'mv2-journal-header' : ''}">
        <div class="mv2-brand"><span class="mv2-logo"><img src="tomo.png" alt="" /></span><div><h1>${state.screen === 'kitchen' ? '🍅 Kitchen' : state.screen === 'collections' || state.screen === 'collection' ? '🧭 Collections' : state.screen === 'journal' ? '📖 My Journal' : 'Tomo'}</h1><p>${state.screen === 'kitchen' ? 'Pantry to plate' : state.screen === 'collections' || state.screen === 'collection' ? 'Explore by region, lifestyle and kitchen intent.' : state.screen === 'journal' ? 'Your cooking journey,<br>favorites and memories.' : 'Food for Every Mood'}</p></div></div>
        <div class="mv2-header-actions">${headerWeather()}</div>
      </header>
      ${state.screen === 'kitchen' || state.screen === 'journal' ? '' : globalSearchBar(state.screen === 'discover')}
      <main>
        <section class="mv2-screen ${state.screen === 'discover' ? 'active' : ''}">${discoverView()}</section>
        <section class="mv2-screen ${state.screen === 'collections' ? 'active' : ''}">${collectionsView()}</section>
        <section class="mv2-screen ${state.screen === 'kitchen' ? 'active' : ''}">${kitchenView()}</section>
        <section class="mv2-screen ${state.screen === 'journal' ? 'active' : ''}">${journalView()}</section>
        <section class="mv2-screen ${state.screen === 'collection' ? 'active' : ''}">${collectionDetailView()}</section>
        <section class="mv2-screen ${state.screen === 'dish' ? 'active' : ''}">${dishDetailView()}</section>
      </main>
      <nav class="mv2-bottom-nav" aria-label="Primary">
        ${[
          ['discover', '⌂', 'Discover'],
          ['collections', '🧭', 'Collections'],
          ['kitchen', '▣', 'Kitchen'],
          ['journal', '♡', 'My Journal'],
        ].map(([screen, icon, label]) => `<button class="${state.screen === screen || (state.screen === 'collection' && screen === 'collections') || (state.screen === 'dish' && state.dishOrigin === 'collection' && screen === 'collections') || (state.screen === 'dish' && (state.dishOrigin === 'pantry' || state.dishOrigin === 'cart') && screen === 'kitchen') || (state.screen === 'dish' && state.dishOrigin === 'journal' && screen === 'journal') ? 'active' : ''}" type="button" data-nav="${screen}">${icon}<span>${label}</span></button>`).join('')}
      </nav>
      ${toastView()}
      ${state.feedbackOpen ? feedbackModal() : ''}
      </div>
    `;
  }

  function renderWithMotion(motion) {
    pendingMotion = motion;
    render();
  }

  function primaryScreen() {
    if (state.screen === 'collection') return 'collections';
    if (state.screen === 'dish') {
      if (state.dishOrigin === 'pantry' || state.dishOrigin === 'cart') return 'kitchen';
      if (state.dishOrigin === 'collection') return 'collections';
      if (state.dishOrigin === 'journal') return 'journal';
      return 'discover';
    }
    return state.screen;
  }

  function discoverView() {
    if (state.discoverView === 'collections') {
      return `<section class="mv2-discover-view active">${collectionsView()}</section>`;
    }
    state.discoverView = 'moods';
    return `<section class="mv2-discover-view active">${moodsView()}</section>`;
  }

  function moodsView() {
    const pickCards = fourCardRecommendations(state.meal, state.mood);
    if (state.screen === 'discover' && state.discoverView === 'moods' && pickCards[0]?.recipe) {
      trackTomoPickViewed(pickCards[0].recipe, { mood: state.mood || 'default', meal: state.meal });
    }
    return `
      <div class="mv2-mood-dashboard">
        <div class="mv2-mood-heading">
          <h2>✨ Choose Your Mood</h2>
          <p>Tomo will adapt today's recommendations.</p>
        </div>
        <div class="mv2-moods">${moods.map(([key, icon, label]) => `<button class="mv2-mood ${state.mood === key ? 'active' : ''}" type="button" data-mood="${key}"><span>${icon}</span><span>${label}</span></button>`).join('')}</div>
      </div>
      <section class="mv2-recommendation-panel">
        <div class="mv2-meal-tabs">${meals.map(([key, label]) => `<button class="${state.meal === key ? 'active' : ''}" type="button" data-meal="${key}">${label}</button>`).join('')}</div>
        <section class="mv2-todays-picks mv2-four-picks"><div class="mv2-section-title"><div><h2>Today's Picks</h2></div></div><div class="mv2-four-pick-grid">${pickCards.map(todayPickCard).join('') || '<p class="mv2-empty">No dishes found for this meal yet.</p>'}</div></section>
      </section>
      ${microMealsAccordion()}
    `;
  }

  function todayPickCard(card) {
    const recipe = card.recipe;
    const role = titleCase(recommendationRecipeRole(recipe));
    const saved = isSaved(recipe.id, recipe.title);
    const shortLabel = {
      bestPick: "Tomo's Pick",
      familiarFavorite: 'Familiar',
      fromYourKitchen: 'From Kitchen',
      quickEasy: 'Quick',
      explorePick: 'Explore'
    }[card.key] || card.label;
    return `
      <article class="mv2-today-card mv2-today-card-${esc(card.key)}">
        <button class="mv2-today-main" type="button" data-recipe="${esc(recipe.id)}">
          <span class="mv2-today-image">${imageTag(recipeImage(recipe))}</span>
          <span class="mv2-today-copy">
            <span class="mv2-today-label"><b>${esc(card.icon)}</b>${esc(shortLabel)}</span>
            <strong>${esc(recipe.title)}</strong>
            <small>${esc(card.subtitle)}</small>
            <em>⏱ ${totalTime(recipe)} min • ${esc(role)}</em>
          </span>
        </button>
        <div class="mv2-today-actions">
          <button class="mv2-today-cook" type="button" data-cook-recipe="${esc(recipe.id)}" data-dish-name="${esc(recipe.title)}" data-source="todays-picks">Cook This</button>
          <button class="mv2-today-save ${saved ? 'active' : ''}" type="button" data-save="${esc(recipe.id)}" data-dish-name="${esc(recipe.title)}" data-source="todays-picks" aria-label="${saved ? 'Saved' : 'Save'}">${saved ? '♥' : '♡'}</button>
          <button class="mv2-today-skip" type="button" data-dismiss-today="${esc(recipe.id)}" data-dish-name="${esc(recipe.title)}" aria-label="Skip">×</button>
        </div>
      </article>
    `;
  }

  function microMealsAccordion() {
    const expanded = state.microMealsExpanded;
    return `
      <section class="mv2-micro-meals ${expanded ? 'expanded' : ''}">
        <button class="mv2-micro-toggle" type="button" data-toggle-micro-meals aria-expanded="${expanded ? 'true' : 'false'}">
          <span><strong>⚡ Micro Meals</strong><small>Quick ideas to fuel your day</small></span>
          <b>${expanded ? '▴' : '▾'}</b>
        </button>
        ${expanded ? `<div class="mv2-micro-list">${microMealSuggestions().map(microMealCard).join('') || '<p class="mv2-empty">No micro ideas right now.</p>'}</div>` : ''}
      </section>
    `;
  }

  function microMealSuggestions() {
    const dismissed = new Set(state.dismissedToday);
    return fourCardRecommendationPool('snack', 'quick', dismissed)
      .filter((item) => totalTime(item.recipe) <= 25)
      .filter((item) => !['side', 'condiment'].includes(recommendationRecipeRole(item.recipe)))
      .slice(0, 3)
      .map((item) => item.recipe);
  }

  function microMealCard(recipe) {
    return `<button class="mv2-micro-card" type="button" data-recipe="${esc(recipe.id)}"><span>${imageTag(recipeImage(recipe))}</span><strong>${esc(recipe.title)}</strong><small>${totalTime(recipe)} min</small></button>`;
  }

  function heroRecommendationReason(context = state.activeTomoPick, recipe = context?.recipe) {
    const selectedMood = state.mood && context?.mood === state.mood ? state.mood : '';
    if (selectedMood) return heroMoodPickLabel(selectedMood);
    const explanations = Array.isArray(context?.explanation) ? context.explanation : [];
    const cleaned = explanations.map((line) => String(line || '').trim()).filter((line) => {
      return line && !/baby food|scored for|signal is|weak|strong|metadata|filtered/i.test(line);
    });
    if (cleaned.some((line) => /saved similar/i.test(line))) return 'Based on your saves';
    if (cleaned.some((line) => /helpful feedback|liked/i.test(line))) return 'Based on dishes you liked';
    if (cleaned.some((line) => /recently cooked|cooked lately|meal type/i.test(line))) return 'Recent Favorite';
    const cuisineLine = cleaned.find((line) => /often cooks|cuisine/i.test(line));
    const cuisine = heroPreferenceLabel(cuisineLine) || heroRecipeCuisineLabel(recipe);
    if (cuisine) return heroCuisinePickLabel(cuisine);
    const regionalLine = cleaned.find((line) => /favorite regional|frequently saves|likes .* cuisine|region/i.test(line));
    const region = heroPreferenceLabel(regionalLine) || heroRecipeRegionLabel(recipe);
    if (region) return heroRegionPickLabel(region);
    if (cleaned.some((line) => /uses your|pantry match|core ingredients/i.test(line))) return 'Fits your pantry';
    if (context?.mood) return heroMoodPickLabel(context.mood);
    return 'Tomo Pick';
  }

  function heroRecommendationSentence(context = state.activeTomoPick, recipe = context?.recipe) {
    const reason = heroRecommendationReason(context, recipe);
    const selectedMood = state.mood && context?.mood === state.mood ? state.mood : context?.mood;
    const lowerReason = norm(reason);
    if (/based on your saves/.test(lowerReason)) return 'Inspired by dishes you saved.';
    if (/based on dishes you liked/.test(lowerReason)) return 'Chosen to match your taste.';
    if (/recent favorite/.test(lowerReason)) return 'Inspired by a recent favorite.';
    if (/fits your pantry/.test(lowerReason)) return 'A good fit for your pantry.';
    if (/south|andhra|kerala/.test(lowerReason)) return 'Bright South Indian comfort.';
    if (/north/.test(lowerReason)) return 'Hearty North Indian comfort.';
    if (/favorite/.test(lowerReason)) return 'A familiar favorite for today.';
    return {
      comfort: 'Comforting and full of flavor.',
      protein: 'Protein-rich and satisfying.',
      quick: 'Bright, simple and easy.',
      soul: 'Homely and deeply comforting.',
      rainy: 'Warm comfort for slow weather.',
      spicy: 'Bold and full of flavor.'
    }[selectedMood] || 'A thoughtful pick for today.';
  }

  function heroDietaryLabel(recipe) {
    const tags = [recipe?.dietType, ...(recipe?.tags || [])]
      .filter(Boolean)
      .map((tag) => String(tag).trim());
    const text = tags.join(' ').toLowerCase();
    if (/non[-\s]?vegetarian|chicken|fish|egg|mutton|prawn|protein/.test(text)) return 'Protein';
    if (/vegetarian|veg\b/.test(text)) return 'Vegetarian';
    return selectedMoodLabel();
  }

  function heroMoodPickLabel(mood) {
    return {
      comfort: 'Comforting, flavorful and great for busy days.',
      protein: 'Protein-packed and perfect for a filling meal.',
      quick: 'Bright, simple and ready without much fuss.',
      soul: 'Homely, satisfying and made for comfort.',
      rainy: 'Warm, cozy and just right for slow weather.',
      spicy: 'Bold, punchy and full of flavor.'
    }[mood] || 'A thoughtful Tomo pick for your mood today.';
  }

  function heroCuisinePickLabel(label = '') {
    const normalized = norm(label);
    if (/south|andhra|kerala/.test(normalized)) return 'Bright, comforting and rooted in familiar South Indian flavors.';
    if (/north/.test(normalized)) return 'Comforting, hearty and full of familiar North Indian flavor.';
    return 'Familiar, flavorful and easy to enjoy today.';
  }

  function heroRegionPickLabel(label = '') {
    const normalized = norm(label);
    if (/coastal|mangalorean|malabar|konkan/.test(normalized)) return 'Light, coastal and full of familiar home-style flavor.';
    if (/north/.test(normalized)) return 'Comforting, hearty and full of familiar North Indian flavor.';
    if (/south|andhra|kerala|karnataka|tamil/.test(normalized)) return 'Bright, comforting and rooted in familiar South Indian flavors.';
    return 'Familiar, flavorful and easy to enjoy today.';
  }

  function heroRecipeCuisineLabel(recipe) {
    return normalizePairingList([recipe?.cuisine, ...recipeCuisines(recipe)])
      .find((label) => /south|andhra|kerala|north/i.test(label)) || '';
  }

  function heroRecipeRegionLabel(recipe) {
    return normalizePairingList([...recipeRegions(recipe), ...recipeSubRegions(recipe)])
      .find((label) => /coastal|mangalorean|malabar|konkan|north|south|andhra|kerala|karnataka|tamil/i.test(label)) || '';
  }

  function heroPreferenceLabel(line = '') {
    const cleaned = String(line || '')
      .replace(/^often cooks\s+/i, '')
      .replace(/^frequently saves\s+/i, '')
      .replace(/^likes\s+/i, '')
      .replace(/\s+(dishes|cuisine|flavors)$/i, '')
      .trim();
    if (!cleaned || /baby food|scored|signal|metadata|preference|regional patterns/i.test(cleaned)) return '';
    return titleCase(cleaned);
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
    const hasQuery = Boolean(String(state.searchQuery || '').trim());
    return `<form class="mv2-global-search ${isDiscover ? 'mv2-discover-search' : ''} ${state.searchOpen && hasQuery ? 'is-open' : ''}" data-search-form><span>🔎</span><input id="mv2GlobalSearch" name="search" type="search" placeholder="Search dishes, moods, ingredients..." value="${esc(state.searchQuery)}" autocomplete="off" />${hasQuery ? '<button class="mv2-search-clear" type="button" data-clear-search aria-label="Clear search">×</button>' : ''}${state.searchOpen && hasQuery ? `<div class="mv2-inline-search-panel" role="region" aria-label="Search results">${searchResultsView()}</div>` : ''}</form>`;
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
    const collectionResults = collectionRoutes
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
    return `<div class="mv2-section-title"><div><p>Collections</p><h2>${USE_GENERATED_COLLECTIONS ? 'Browse by hub' : 'Curated for every kitchen'}</h2></div></div><div class="mv2-collections">${collections.map((collection) => {
      const image = collectionImage(collection);
      const count = Number(collection.count || collection.items?.length || 0);
      return `<button class="mv2-collection ${collection.status === 'coming-soon' ? 'is-coming-soon' : ''}" type="button" data-collection="${esc(collection.key)}"><span class="mv2-collection-image" style="--collection-image: url('${esc(image)}'); background-image: url('${esc(image)}')">${collection.status === 'coming-soon' ? '<em>Coming Soon</em>' : ''}</span><span class="mv2-collection-copy"><strong>${esc(collection.title)}</strong><span>${esc(collection.copy || collection.subtitle || 'Tomo collection')}</span><b>${collection.status === 'coming-soon' ? 'Coming Soon' : `${count} recipes →`}</b></span></button>`;
    }).join('')}</div>`;
  }

  function kitchenView() {
    return `
      <div class="mv2-segmented" role="tablist" aria-label="Kitchen mode">
        <button class="${state.kitchenTab === 'pantry' ? 'active' : ''}" type="button" data-kitchen-tab="pantry">Pantry</button>
        <button class="${state.kitchenTab === 'groceries' ? 'active' : ''}" type="button" data-kitchen-tab="groceries">Shopping List</button>
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
        <div class="mv2-section-title">
          <div><p>Your ingredients</p><h2>Tap what you have</h2></div>
          <div class="mv2-pantry-selection-summary">
            <span>${state.selectedIngredients.size} selected</span>
            ${state.selectedIngredients.size ? '<button type="button" data-clear-pantry>Clear</button>' : ''}
          </div>
        </div>
        <div class="mv2-pantry-sections">${sections.map((section) => pantrySection(section)).join('') || '<p class="mv2-empty">No ingredients found.</p>'}</div>
      </section>
    `;
  }

  function groceryMiniSummary() {
    if (!state.groceries.length) return '';
    const preview = state.groceries.slice(0, 3);
    return `
      <button class="mv2-grocery-mini" type="button" data-kitchen-tab="groceries">
        <span><strong>🛒 Shopping List (${state.groceries.length})</strong><i>${esc(preview.map((item) => item.name).join(', '))}</i></span>
        <b>View List →</b>
      </button>
    `;
  }

  function groceriesView() {
    const unlocks = groceryUnlocks();
    const itemCount = state.groceries.length;
    const dishNames = cartDishNames();
    const grouped = groupedGroceries();
    return `
      <section class="mv2-grocery-section">
        <div class="mv2-cart-heading">
          <div><h2>🛒 Shopping List</h2>${itemCount ? `<strong>${itemCount} ${itemCount === 1 ? 'item' : 'items'} added</strong>` : ''}</div>
          <p>Use this list while shopping, copy it, or share it with family.</p>
        </div>
        <form class="mv2-grocery-form" data-grocery-form>
          <input name="groceryItem" type="text" placeholder="Add an item..." autocomplete="off" required />
          <button type="submit">Add</button>
        </form>
        ${state.groceries.length ? '<div class="mv2-grocery-tools"><button type="button" data-clear-groceries>Clear List</button></div>' : ''}
        ${state.groceries.length ? '<h3 class="mv2-cart-items-title">Items To Buy</h3>' : ''}
        <div class="mv2-grocery-list">
          ${state.groceries.length ? grouped.map(cartGroupView).join('') : '<div class="mv2-shopping-empty"><strong>No items yet.</strong><p>Add missing ingredients from recipes and Tomo will build your shopping list.</p></div>'}
        </div>
        ${itemCount ? readyToShopView(itemCount, dishNames) : ''}
      </section>
      ${itemCount ? cartUnlocksView(unlocks) : ''}
      ${shoppingListGuidance()}
    `;
  }

  function shoppingListGuidance() {
    return `
      <section class="mv2-shopping-guidance">
        <h3>Need these ingredients?</h3>
        <p>🏪 Use this list at your local grocery store</p>
        <p>📋 Copy and share with others</p>
        <small>Online grocery integrations coming soon.</small>
      </section>
    `;
  }

  function cartGroupView(group) {
    return `<section class="mv2-grocery-group"><h3>${esc(group.name)}</h3>${group.items.map(cartItemView).join('')}</section>`;
  }

  function cartItemView(item) {
    const neededFor = normalizePairingList(item.neededFor || []);
    return `<div class="mv2-grocery-item"><div class="mv2-grocery-item-copy"><strong>${esc(item.name)}</strong>${neededFor.length ? `<small>${esc(item.name)} · ${esc(neededFor.join(', '))}</small>` : ''}</div><button type="button" data-grocery-remove="${esc(item.name)}" aria-label="Remove ${esc(item.name)}">×</button></div>`;
  }

  function groupedGroceries() {
    const order = ['Vegetables', 'Proteins', 'Spices', 'Staples', 'Other'];
    const groups = new Map(order.map((name) => [name, []]));
    state.groceries.forEach((item) => {
      groups.get(groceryCategory(item.name)).push(item);
    });
    return order.map((name) => ({ name, items: groups.get(name) || [] })).filter((group) => group.items.length);
  }

  function groceryCategory(name) {
    const key = norm(name);
    const catalogItem = pantryCatalog.find((item) => {
      return norm(item.name || item.ingredient || item.title || item.ingredient_name || item.ingredient_key) === key;
    });
    const catalogSection = catalogItem?.section || catalogItem?.category || '';
    if (/vegetable|fruit/i.test(catalogSection) || /onion|tomato|potato|carrot|capsicum|cabbage|cauliflower|beans|peas|spinach|mushroom|okra|brinjal|beet|cucumber|garlic|ginger|chilli|corn|spring onion/.test(key)) return 'Vegetables';
    if (/protein|dairy/i.test(catalogSection) || /egg|chicken|fish|prawn|mutton|pork|paneer|tofu|soy|soya|keema|chana|chole|rajma|dal|lentil|peanut|sundal|milk|curd|yogurt|cheese/.test(key)) return 'Proteins';
    if (/spice/i.test(catalogSection) || /masala|turmeric|chilli|pepper|cumin|mustard|coriander|curry leaves|podi|garam|chaat|tamarind|lemon|mint|salt/.test(key)) return 'Spices';
    if (/staple|grain|dal/i.test(catalogSection) || /rice|wheat|atta|flour|bread|poha|rava|suji|oats|millet|ragi|dosa batter|idli batter|noodle|pasta|sabudana|jaggery|sugar|oil|ghee|butter/.test(key)) return 'Staples';
    return 'Other';
  }

  function cartUnlocksView(unlocks) {
    if (!unlocks.length) return '';
    const visible = state.cartUnlocksExpanded ? unlocks : unlocks.slice(0, 4);
    return `
      <section class="mv2-cart-unlocks">
        <div class="mv2-section-title"><div><p>More ideas</p><h2>Unlock More Dishes</h2></div></div>
        <div class="mv2-cart-unlock-grid">
          ${visible.map((item) => cartUnlockCard(item)).join('')}
        </div>
        ${unlocks.length > 4 && !state.cartUnlocksExpanded ? '<button class="mv2-cart-view-more" type="button" data-cart-unlocks-more>View More →</button>' : ''}
      </section>
    `;
  }

  function cartUnlockCard(item) {
    return `
      <button class="mv2-cart-unlock-card" type="button" data-cart-unlock-recipe="${esc(item.recipe.id)}">
        ${imageTag(recipeImage(item.recipe))}
        <span><strong>${esc(item.recipe.title)}</strong><small>Unlock by adding:</small><em>${esc(item.ingredient)}</em></span>
      </button>
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
          <span>✓ Shopping list ready</span>
        </div>
        <div class="mv2-cart-export-actions">
          <button type="button" data-copy-shopping-list>Copy Shopping List</button>
          <button type="button" data-share-shopping-list>Share List</button>
        </div>
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
    const savedItems = journalItems(state.savedDishes)
      .sort((a, b) => new Date(b.record.timestamp || 0) - new Date(a.record.timestamp || 0));
    const cookedItems = journalItems(state.cookedDishes)
      .sort((a, b) => new Date(b.record.timestamp || 0) - new Date(a.record.timestamp || 0));
    const hasKitchenStats = cookedItems.length > 0;
    const summary = journeySummary(cookedItems);
    const visibleSavedItems = state.journalSavedExpanded ? savedItems : savedItems.slice(0, 3);
    const visibleCookedItems = state.journalRecentExpanded ? cookedItems : cookedItems.slice(0, 3);
    return `
      <section class="mv2-journey-section">
        <div class="mv2-section-title"><div><h2>📖 Your Kitchen Story</h2></div></div>
        ${kitchenStoryCard(summary, hasKitchenStats)}
      </section>
      <section class="mv2-journey-section">
        <div class="mv2-section-title mv2-section-title-row"><div><h2>❤️ Saved for Later <span class="mv2-section-count">(${esc(String(savedItems.length))})</span></h2></div>${savedItems.length > 3 ? journalViewAllButton('saved', state.journalSavedExpanded ? 'Show fewer' : 'View all ›') : ''}</div>
        ${savedItems.length ? `<div class="mv2-journal-list">${visibleSavedItems.map((item) => journalCard(item, journalDishMetadata(item, 'Saved dish'))).join('')}</div>` : journalEmptyState('❤️', 'Start building your saved dishes.', 'Save dishes you want to revisit.', 'saved')}
      </section>
      <section class="mv2-journey-section">
        <div class="mv2-section-title mv2-section-title-row"><div><h2>🍳 Recently Cooked</h2></div>${cookedItems.length > 3 ? journalViewAllButton('recent', state.journalRecentExpanded ? 'Show fewer' : 'View all ›') : ''}</div>
        ${cookedItems.length ? `<div class="mv2-journal-scroll-row">${visibleCookedItems.map((item) => journalCard(item, journalCookedTimeLabel(item.record.timestamp), 'compact')).join('')}</div>` : journalEmptyState('🍳', 'Nothing cooked yet', 'Cook a dish and Tomo will remember it.')}
      </section>
      <section class="mv2-journey-section">
        <div class="mv2-section-title"><div><h2>💬 Help Tomo Improve</h2></div></div>
        ${helpTomoImproveCard()}
      </section>
    `;
  }

  function kitchenStoryCard(summary, hasKitchenStats) {
    const meals = Number(summary.mealsCooked || 0);
    const mood = summary.favoriteMood && summary.favoriteMood !== 'Still learning' ? summary.favoriteMood : 'Still learning';
    const dish = summary.mostCooked && summary.mostCooked !== 'Still learning' ? summary.mostCooked : 'Still learning';
    const moodCopy = mood === 'Still learning' ? 'new' : titleCase(mood);
    if (!hasKitchenStats || meals <= 0) {
      return `
        <article class="mv2-kitchen-story-card mv2-journal-standard-card is-empty">
          <img class="mv2-kitchen-story-mascot" src="/assets/mascots/tomo-peek-card-edge.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <div class="mv2-kitchen-story-empty">
            <strong>Your food story starts here.</strong>
            <p>Cook a few dishes and Tomo will start remembering your favorites.</p>
          </div>
        </article>
      `;
    }
    return `
      <article class="mv2-kitchen-story-card mv2-journal-standard-card is-populated">
        <img class="mv2-kitchen-story-mascot" src="/assets/mascots/tomo-peek-card-edge.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div class="mv2-kitchen-story-lines">
          <p><span>🍽️</span>You've cooked ${esc(String(meals))} ${meals === 1 ? 'dish' : 'dishes'} with Tomo.</p>
          <p><span>⭐</span>Your favorite so far is ${esc(dish)}.</p>
          <p><span>💛</span>You're enjoying ${esc(moodCopy)} meals.</p>
          <p class="mv2-kitchen-story-footer"><span>❤️</span>Keep cooking and I'll learn more about your taste.</p>
        </div>
      </article>
    `;
  }

  function helpTomoImproveCard() {
    return `
      <article class="mv2-feedback-card mv2-journal-standard-card">
        <div class="mv2-feedback-card-body">
          <span class="mv2-feedback-icon">💬</span>
          <span class="mv2-feedback-copy"><strong>Found something wrong?</strong><p>Missing dish, wrong image or bug?</p></span>
          <button class="mv2-feedback-button" type="button" data-open-feedback>Send Feedback →</button>
        </div>
      </article>
    `;
  }

  function journalViewAllButton(section, label) {
    return `<button class="mv2-journal-view-all" type="button" data-journal-toggle="${esc(section)}">${esc(label)}</button>`;
  }

  function hasRealJourneyActivity() {
    return Boolean(state.cookedDishes.length || state.savedDishes.length || state.groceries.length || state.dishMemory.length);
  }

  function realJourneyActivities() {
    const memory = dishMemoryEvents().map((event) => {
      const name = event.dishName || dishMemoryRecipe(event)?.title || 'a dish';
      const labels = {
        saved: `Saved ${name}`,
        cooked: `Cooked ${name}`,
        dismissed: `Not for me: ${name}`,
        helpful: `Liked suggestion: ${name}`,
        'not helpful': `Not helpful: ${name}`
      };
      return {
        text: labels[event.action] || `${event.action} ${name}`,
        timestamp: event.timestamp || ''
      };
    });
    const cart = state.groceries.map((item) => ({
      text: `Added ${item.name} to Shopping Cart`,
      timestamp: ''
    }));
    const cookedItems = journalItems(state.cookedDishes);
    const streak = cookingStreak(cookedItems);
    const streakActivity = streak > 1 ? [{ text: `${streak}-day streak reached`, timestamp: new Date().toISOString() }] : [];
    const seen = new Set();
    return [...memory, ...cart, ...streakActivity]
      .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
      .filter((item) => {
        const key = norm(item.text);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((item) => item.text);
  }

  function journeyTextActivity(items, prototype = false) {
    return `<article class="mv2-journey-text-activity ${prototype ? 'prototype' : ''}"><ul>${items.map((item) => `<li><span>${esc(activityIcon(item))}</span>${esc(item)}</li>`).join('')}</ul></article>`;
  }

  function activityIcon(text) {
    const value = norm(text);
    if (value.includes('cooked')) return '🍳';
    if (value.includes('streak')) return '🔥';
    if (value.includes('saved')) return '❤️';
    if (value.includes('shopping list') || value.includes('shopping cart') || value.includes('cart') || value.startsWith('added ')) return '🛒';
    if (value.includes('liked') || value.includes('helpful')) return '👍';
    if (value.includes('not for me') || value.includes('dismissed') || value.includes('not helpful')) return '👎';
    if (value.includes('pongal') || value.includes('khichdi') || value.includes('soup')) return '🥣';
    if (value.includes('curry') || value.includes('rice')) return '🍛';
    return '📝';
  }

  function prototypeJourneySummary() {
    return {
      mealsCooked: '1',
      streak: 1,
      mostCooked: 'Chicken Curry',
      favoriteMood: 'Rainy'
    };
  }

  function journeySummary(items) {
    const moodCounts = new Map();
    const moodRecords = items.length ? items : journalItems([...state.savedDishes]);
    moodRecords.forEach((item) => {
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

  function tomoInsightCard(summary, hasRealActivity) {
    const mood = summary.favoriteMood && summary.favoriteMood !== 'Still learning' ? summary.favoriteMood : 'comfort';
    const dish = summary.mostCooked && summary.mostCooked !== 'Still learning' ? summary.mostCooked : '';
    const moodKey = norm(mood);
    const intro = hasRealActivity
      ? moodKey === 'quick'
        ? 'You prefer quick comfort meals.'
        : `You prefer ${moodKey || 'comfort'} meals.`
      : 'Your cooking preferences will appear here.';
    const detail = dish
      ? `Most cooked: ${dish}`
      : 'Cook a few dishes to reveal your patterns.';
    return `
      <article class="mv2-tomo-insight mv2-journal-standard-card">
        <strong>From Tomo</strong>
        <p>${esc(intro)}</p>
        <p>${esc(detail)}</p>
      </article>
    `;
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
    return `<button class="mv2-activity-card" type="button" ${item.recipe ? `data-journal-recipe="${esc(item.recipe.id)}"` : ''}>${imageTag(image)}<span><strong>${esc(title)}</strong><small>${esc(journalActivityMetadata(item))}</small></span></button>`;
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

  function journalEmptyState(icon, title, copy, variant = '') {
    return `<article class="mv2-empty-state ${variant ? `mv2-empty-state-${esc(variant)}` : ''}"><span>${icon}</span><h2>${esc(title)}</h2><p>${esc(copy)}</p><button type="button" data-journal-explore>Explore dishes</button></article>`;
  }

  function journalCard(item, metadata, variant = '') {
    const title = item.recipe?.title || item.record.dishName;
    const image = item.recipe ? recipeImage(item.recipe) : collectionDishImage({ title });
    const safeMetadata = journalSafeMetadata(metadata, variant === 'compact' ? 'Cooked dish' : 'Saved dish');
    return `<button class="mv2-journal-card ${variant ? `mv2-journal-card-${esc(variant)}` : ''}" type="button" ${item.recipe ? `data-journal-recipe="${esc(item.recipe.id)}"` : ''}>${imageTag(image)}<span class="mv2-journal-card-copy"><strong>${esc(title)}</strong><small>${esc(safeMetadata)}</small></span></button>`;
  }

  function journalDishMetadata(item, fallback = 'Saved dish') {
    const recipe = item?.recipe;
    if (!recipe) return fallback;
    const minutes = totalTime(recipe);
    const meal = journalMealTypeLabel(recipe);
    if (minutes && meal) return `${minutes} min • ${meal}`;
    if (minutes) return `${minutes} min`;
    return meal || fallback;
  }

  function journalMealTypeLabel(recipe) {
    const meal = meals.find(([key]) => matchesMeal(recipe, key));
    return meal?.[1] || '';
  }

  function journalActivityMetadata(item) {
    const pieces = ['Activity', relativeTime(item?.record?.timestamp)].filter(Boolean);
    return journalSafeMetadata(pieces.join(' • '), 'Activity');
  }

  function journalSafeMetadata(value, fallback = 'Saved dish') {
    const text = String(value || '').trim();
    if (!text) return fallback;
    if (isInternalJournalMetadata(text)) return fallback;
    return text;
  }

  function isInternalJournalMetadata(value) {
    const text = String(value || '').trim();
    return /(^|[\s•])(dish-detail|collection-detail|route|screen|component|legacy-saved|tomo_pick|todays_picks)([\s•]|$)/i.test(text)
      || /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text)
      || /^collection-[a-z0-9-]+$/i.test(text);
  }

  function feedbackModal() {
    const types = ['Incorrect dish', 'Missing ingredient', 'Request a dish', 'Wrong image', 'App issue', 'Other'];
    return `
      <div class="mv2-modal-backdrop" role="presentation">
        <section class="mv2-feedback-modal" role="dialog" aria-modal="true" aria-labelledby="mv2FeedbackTitle">
          <h2 id="mv2FeedbackTitle">💬 Help Tomo Improve</h2>
          <label>
            <span>Feedback Type</span>
            <select data-feedback-type>
              ${types.map((type) => `<option value="${esc(type)}" ${state.feedbackType === type ? 'selected' : ''}>${esc(type)}</option>`).join('')}
            </select>
          </label>
          <label>
            <span>Dish name / request <em>Optional</em></span>
            <input type="text" value="${esc(state.feedbackDish)}" placeholder="Dish name or request" data-feedback-dish />
          </label>
          <label>
            <span>Message</span>
            <textarea placeholder="Tell us what to fix or add..." data-feedback-message required>${esc(state.feedbackMessage)}</textarea>
          </label>
          ${state.feedbackError ? `<p class="mv2-feedback-error" role="alert">${esc(state.feedbackError)}</p>` : ''}
          ${state.feedbackThanks ? '<p class="mv2-feedback-thanks" role="status">Thanks for helping Tomo improve.</p>' : ''}
          <div class="mv2-feedback-actions">
            <button type="button" data-send-feedback>Send</button>
            <button type="button" data-cancel-feedback>Cancel</button>
          </div>
        </section>
      </div>
    `;
  }

  function feedbackMailtoUrl() {
    const subject = `Tomo Feedback - ${state.feedbackType}`;
    const body = [
      `Feedback Type: ${state.feedbackType}`,
      `Dish / Request: ${state.feedbackDish || ''}`,
      `Message: ${state.feedbackMessage || ''}`
    ].join('\n');
    return `mailto:rajeshgowda767@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    const collection = collectionByKey(state.collectionKey) || collections[0];
    if (!collection) return '<p class="mv2-empty">Collections are loading.</p>';
    if (collection.generatedType === 'hub') return generatedHubDetailView(collection);
    const groups = collectionDetail(collection);
    const selected = state.subcategory || groups[0]?.name || '';
    state.subcategory = selected;
    const active = groups.find((group) => group.name === selected) || groups[0];
    return `
      <div class="mv2-collection-detail">
        <div class="mv2-collection-nav">
          <div class="mv2-collection-context">
            <button class="mv2-collection-back" type="button" data-back="${collection.generatedType === 'collection' ? 'collection-hub' : 'collections'}" aria-label="Back to Collections">←</button>
            <strong>${esc(collection.title)}</strong>
          </div>
          <div class="mv2-subcategories mv2-subcategories-grid">
            ${groups.map((group) => `<button class="mv2-subcategory ${group.name === selected ? 'active' : ''}" type="button" data-subcategory="${esc(group.name)}"><span>${esc(group.name)}</span><small class="mv2-subcategory-count">(${collectionVisibleRecipes(group).length})</small></button>`).join('')}
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

  function generatedHubDetailView(hub) {
    const childCollections = hub.generatedCollections || [];
    return `
      <div class="mv2-collection-detail">
        <div class="mv2-collection-nav">
          <div class="mv2-collection-context">
            <button class="mv2-collection-back" type="button" data-back="collections" aria-label="Back to Collections">←</button>
            <strong>${esc(hub.title)}</strong>
          </div>
        </div>
        <header class="mv2-collection-header" style="--collection-image: url('${esc(collectionImage(hub))}')">
          <p>${esc(hub.icon || '🍲')} Collection Hub</p>
          <h2>${esc(hub.title)} <small>(${Number(hub.count || 0)})</small></h2>
          <span>${esc(hub.copy || hub.subtitle || '')}</span>
        </header>
        <div class="mv2-collections mv2-generated-collection-list">
          ${childCollections.map((collection) => {
            const image = collectionImage(collection);
            return `<button class="mv2-collection" type="button" data-collection="${esc(collection.key)}"><span class="mv2-collection-image" style="--collection-image: url('${esc(image)}'); background-image: url('${esc(image)}')"></span><span class="mv2-collection-copy"><strong>${esc(collection.title)}</strong><span>${esc(collection.copy || collection.subtitle || '')}</span><b>${Number(collection.count || collection.items?.length || 0)} recipes →</b></span></button>`;
          }).join('') || '<p class="mv2-empty">No generated collections here yet.</p>'}
        </div>
      </div>
    `;
  }

  function collectionResults(group) {
    const recipes = collectionVisibleRecipes(group);
    return `<div class="mv2-collection-dish-grid">${recipes.map(collectionCard).join('') || '<p class="mv2-empty">No dishes here yet.</p>'}</div>`;
  }

  function collectionVisibleRecipes(group) {
    if (collectionByKey(group?.collectionKey)?.generatedType === 'collection') return group?.recipes || [];
    const curatedFullCollections = new Set(['sides-addons', 'lunchbox', 'gym-foods', 'drinks', 'soups', 'salads']);
    return curatedFullCollections.has(group?.collectionKey) ? (group?.recipes || []) : browseDiverseRecipes(group?.recipes || []);
  }

  function dishDetailView() {
    const recipe = activeRecipe();
    if (!recipe) return '<p class="mv2-empty">Dish not found.</p>';
    const fromCollection = state.dishOrigin === 'collection';
    const hasPantryContext = dishHasPantryContext();
    const availability = dishAvailability(recipe);
    const mood = `${moodLabel(recipe)} Food`;
    const meal = mealForRecipe(recipe);
    const related = relatedDishes(recipe);
    const backLabel = state.dishOrigin === 'pantry' ? 'Back to Pantry' : state.dishOrigin === 'cart' ? 'Back to Shopping Cart' : state.dishOrigin === 'journal' ? 'Back to Journal' : state.dishOrigin === 'collection' ? 'Back to Collection' : 'Back to Discover';
    const backTarget = state.dishOrigin === 'pantry' ? 'pantry' : state.dishOrigin === 'cart' ? 'cart' : state.dishOrigin === 'journal' ? 'journal' : state.dishOrigin === 'collection' ? 'collection-detail' : 'discover';
    const feedback = recipeFeedback(recipe.id, recipe.title);
    const quickGuide = recipeQuickGuide(recipe);
    const pairings = dishPairings(recipe, quickGuide);
    const saved = isSaved(recipe.id, recipe.title);
    return `
      <article class="mv2-dish-decision-head">
        <div class="mv2-detail-image">
          ${imageTag(recipeImage(recipe))}
          <button class="mv2-back" type="button" data-back="${backTarget}" aria-label="${backLabel}">←</button>
        </div>
        <div class="mv2-dish-info">
          <button class="mv2-detail-save ${saved ? 'active' : ''}" type="button" data-save="${esc(recipe.id)}" data-dish-name="${esc(recipe.title)}" data-source="dish-detail" aria-label="${saved ? 'Saved' : 'Save'}">${saved ? '♥' : '♡'}</button>
          <h2>${esc(recipe.title)}</h2>
          <div class="mv2-dish-facts">
            <span class="mv2-dish-meta-line">⏱ ${totalTime(recipe)} min • ${esc(titleCase(recipe.difficulty || 'easy'))} • ${esc(dietLabel(recipe))}</span>
            <div class="mv2-dish-tags">
              <span class="mv2-dish-chip">${esc(mood)}</span>
              <span class="mv2-dish-chip">${esc(meal)}</span>
            </div>
          </div>
        </div>
      </article>
      ${dishPairingsView(pairings)}
      ${dishNeededItemsView(recipe)}
      ${hasQuickGuide(recipe) ? quickGuideView(quickGuide, recipe) : ''}
      ${!hasPantryContext || fromCollection ? '' : `<section class="mv2-kitchen-readiness">
        <h3>Pantry Status</h3>
        <div>
          <strong>✓ You Have</strong>
          <span>${availability.have.length ? availability.have.map((name) => `<i>${esc(name)}</i>`).join('') : '<em>No matching selected items.</em>'}</span>
        </div>
      </section>`}
      ${fromCollection ? '' : `<section class="mv2-recommendation-feedback" aria-label="Recommendation feedback">
        <span>Was this helpful?</span>
        <button class="${feedback === 'helpful' ? 'active' : ''}" type="button" data-recommendation-feedback="helpful" data-feedback-recipe="${esc(recipe.id)}" data-feedback-dish="${esc(recipe.title)}">👍 Yes</button>
        <button class="${feedback === 'not helpful' ? 'active' : ''}" type="button" data-recommendation-feedback="not_helpful" data-feedback-recipe="${esc(recipe.id)}" data-feedback-dish="${esc(recipe.title)}">👎 No</button>
      </section>`}
      <section class="mv2-related">
        <div class="mv2-section-title"><div><h2>You May Also Like</h2></div></div>
        <div class="mv2-related-scroll">${related.map(relatedDishCard).join('') || '<p class="mv2-empty">More related dishes are coming soon.</p>'}</div>
      </section>
    `;
  }

  function quickGuideView(guide, recipe) {
    const ingredientCount = guide.ingredients.length;
    const stepCount = guide.steps.length;
    const tip = quickTip(recipe, guide);
    return `
      <section class="mv2-quick-guide">
        <div class="mv2-quick-guide-head">
          <p>💡 Tomo Tip</p>
        </div>
        ${tip ? `<p class="mv2-quick-tip">${esc(tip)}</p>` : ''}
        ${guide.ingredients.length ? `<details class="mv2-detail-collapse"><summary><span><b>🥕 Ingredients (${ingredientCount})</b></span></summary><ul>${guide.ingredients.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></details>` : ''}
        ${guide.steps.length ? `<details class="mv2-detail-collapse"><summary><span><b>👨‍🍳 Steps (${stepCount})</b></span></summary><ol>${guide.steps.map((step) => `<li>${esc(step)}</li>`).join('')}</ol></details>` : ''}
      </section>
    `;
  }

  function dishNeededItemsView(recipe) {
    if (!dishHasPantryContext()) return '';
    const availability = recipeIngredientAvailability(recipe);
    const missing = availability.missingRequired;
    if (!missing.length) {
      return '<section class="mv2-pantry-ready"><strong>✓ Ready to Cook</strong><p>Core ingredients available.</p></section>';
    }
    return `
      <section class="mv2-detail-needed">
        <strong>Missing Ingredients</strong>
        <div class="mv2-detail-needed-chips">${missing.map((name) => detailNeededChip(name, recipe)).join('')}</div>
        ${availability.remainingToAdd.length ? `<button class="mv2-detail-add-all" type="button" data-detail-add-missing="${esc(recipe.id)}">Add All Needed Items</button>` : '<p class="mv2-detail-needed-complete">✓ All needed items added</p>'}
      </section>
    `;
  }

  function dishHasPantryContext() {
    return state.dishOrigin === 'pantry' || state.selectedIngredients.size > 0;
  }

  function detailNeededChip(name, recipe) {
    const added = groceryHasIngredient(name, recipe);
    return `<button class="${added ? 'added' : ''}" type="button" data-detail-toggle-one="${esc(name)}" data-needed-recipe="${esc(recipe.id)}">${added ? `✓ ${esc(name)} Added` : `+ ${esc(name)}`}</button>`;
  }

  function groceryHasIngredient(name, recipe = null) {
    return state.groceries.some((item) => {
      if (!availabilityIngredientMatches(name, item.name)) return false;
      if (!recipe?.title) return true;
      const neededFor = normalizePairingList(item.neededFor || []);
      return !neededFor.length || neededFor.some((title) => norm(title) === norm(recipe.title));
    });
  }

  function quickTip(recipe, guide = {}) {
    const tip = String(guide.tip || recipe?.tomoLine || recipe?.description || '').trim();
    if (!tip) return '';
    return tip.length > 128 ? `${tip.slice(0, 125).trim()}...` : tip;
  }

  function dishAvailability(recipe) {
    const availability = recipeIngredientAvailability(recipe);
    return {
      have: availability.matchedRequired,
      need: availability.missingRequired,
      nice: availability.optionalNiceToHave
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
          ${availability.need.length ? `<button class="mv2-add-missing-primary" type="button" data-detail-add-missing="${esc(recipe?.id || '')}">Add to Shopping List</button>` : '<em class="mv2-ready-note">✓ You have everything listed for this dish.</em>'}
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

  function relatedLightMainRecipe(recipe) {
    const haystack = tags(recipe).join(' ');
    return Boolean(recipe?.lightMeal)
      || totalTime(recipe) <= 30
      || /\b(light|quick|simple|comfort|soft|one-pot|one pot|khichdi|rice|upma|poha|idli)\b/.test(haystack);
  }

  function relatedRoleScore(source, candidate) {
    const sourceRole = recommendationRecipeRole(source);
    const candidateRole = recommendationRecipeRole(candidate);
    if (sourceRole === candidateRole) {
      if (sourceRole === 'condiment') return -12;
      return 7;
    }
    if (sourceRole === 'main') {
      if (candidateRole === 'soup') return 2;
      if (['side', 'condiment', 'drink', 'dessert'].includes(candidateRole)) return -5;
      if (candidateRole === 'snack') return -2;
      return 0;
    }
    if (sourceRole === 'soup') {
      if (candidateRole === 'main') return relatedLightMainRecipe(candidate) ? 4 : 1;
      if (candidateRole === 'side') return 2;
      if (candidateRole === 'condiment') return -5;
      if (['drink', 'dessert'].includes(candidateRole)) return -3;
      return 0;
    }
    if (sourceRole === 'dessert') {
      if (candidateRole === 'drink') return 1;
      return ['condiment', 'side', 'soup'].includes(candidateRole) ? -5 : -2;
    }
    if (sourceRole === 'drink') {
      if (candidateRole === 'snack') return 5;
      if (candidateRole === 'dessert') return 2;
      if (candidateRole === 'main') return -2;
      return ['condiment', 'side', 'soup'].includes(candidateRole) ? -5 : 0;
    }
    if (sourceRole === 'snack') {
      if (candidateRole === 'drink') return 4;
      if (candidateRole === 'dessert') return 1;
      if (candidateRole === 'main') return 1;
      return ['condiment', 'side'].includes(candidateRole) ? -4 : 0;
    }
    if (sourceRole === 'side') {
      if (candidateRole === 'main') return 3;
      if (candidateRole === 'condiment') return -5;
      return ['drink', 'dessert'].includes(candidateRole) ? -3 : 0;
    }
    if (sourceRole === 'condiment') {
      if (candidateRole === 'main') return 2;
      if (candidateRole === 'side') return 1;
      return -5;
    }
    return 0;
  }

  function relatedDishes(recipe) {
    const mealKeys = meals.filter(([key]) => matchesMeal(recipe, key)).map(([key]) => key);
    const mood = moodLabel(recipe);
    return recipes
      .filter((item) => item.id !== recipe.id)
      .map((item) => ({
        recipe: item,
        score: relatedRoleScore(recipe, item)
          + (moodLabel(item) === mood ? 2 : 0)
          + (mealKeys.some((meal) => matchesMeal(item, meal)) ? 1 : 0)
          + (dishFamily(item) === dishFamily(recipe) ? 1 : 0)
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
    const matches = recipes
      .filter((recipe) => norm(recipe?.recipeType || recipe?.recipe_type || 'core') === 'core' || pantryInactiveExactComboCandidate(recipe, selected))
      .map((recipe) => {
        const ingredients = recipeIngredients(recipe);
        const matched = ingredients.filter((item) => ingredientSelected(item.name));
        const matchedSelected = selected.filter((name) => ingredients.some((item) => ingredientMatchesSelection(item.normalized, name)));
        const matchedSelectedMain = selected.filter((name) => ingredients.some((item) => item.main && ingredientMatchesSelection(item.normalized, name)));
        const ignoredSelected = selected.filter((name) => !matchedSelected.includes(name));
        const missing = ingredients.filter((item) => item.required && !ingredientSelected(item.name));
        const missingPrecisionPenalty = missing.reduce((sum, item) => {
          if (isNiceToHaveIngredient(item)) return sum;
          if (item.main) return sum + 180;
          if (item.required && item.source !== 'secondary-field') return sum + 95;
          return sum + 35;
        }, 0);
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
        const titleCombination = pantryTitleCombinationMatch(recipe, selected);
        const ingredientFitBonus = pantrySimpleSingleIngredientScore(recipe, selected, ingredients)
          + pantrySpecificCombinationBonus(recipe, selected)
          + pantryMilkIntentScore(recipe, selected, ingredients)
          + pantryIntentProtectionScore(recipe, selected, ingredients)
          - pantryUnrelatedProteinPenalty(recipe, selected, ingredients);
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
          titleCombination,
          tier,
          missing,
          score: (nonVegBlocked ? 0 : tier.rank) * 1000
            + titleCombination.bonus
            + ingredientFitBonus
            + matchedSelected.length * 100
            + matched.filter((item) => item.main).length * 20
            + selectedPrimaryFieldCount * 220
            + Math.min(ingredients.length, 8) * 2
            - missingPrecisionPenalty
            - missingMajorProteinCount * 600
            - (nonVegBlocked ? 5000 : 0)
            - ignoredSelected.length * 80
            - (ignoredMajorProtein ? 140 : 0)
        };
      })
      .filter((item) => item.matchedSelected.length > 0)
      .sort((a, b) => b.score - a.score || norm(a.recipe.title).localeCompare(norm(b.recipe.title)));
    return pantryApplyRecommendationConfidenceGate(pantryApplyDishFamilyGuard(matches, selected), selected);
  }

  function pantryApplyRecommendationConfidenceGate(matches, selected) {
    const intents = pantrySelectedRecommendationIntents(selected);
    const viable = matches.filter((match) => match.tier.rank > 0 && !match.ignoredMajorProtein);
    if (!intents.length) return viable;
    const sameIntent = viable.filter((match) => pantryMatchSatisfiesAnyIntent(match.recipe, intents));
    if (sameIntent.length) return sameIntent;
    return viable.filter((match) => match.tier.rank >= 3 || match.matchedSelected.length >= Math.min(2, selected.length));
  }

  function pantrySelectedRecommendationIntents(selected) {
    const intents = [];
    const add = (type, key) => {
      const id = `${type}:${key}`;
      if (!intents.some((intent) => intent.id === id)) intents.push({ id, type, key });
    };
    selected.forEach((item) => {
      const value = norm(item);
      if (['egg', 'chicken', 'fish', 'paneer', 'tofu', 'mutton'].includes(value)) add('protein', value);
      if (value === 'dal') add('protein', 'dal');
      if (['chana', 'chole', 'chickpea', 'chickpeas'].includes(value)) add('protein', 'chana');
      if (['moong', 'moong dal', 'mung dal'].includes(value)) add('protein', 'moong');
      if (['rice', 'bread', 'rava', 'poha', 'dosa batter'].includes(value)) add('staple', value);
      if (['potato', 'tomato', 'capsicum', 'spinach'].includes(value)) add('vegetable', value);
    });
    return intents;
  }

  function pantryMatchSatisfiesAnyIntent(recipe, intents) {
    if (!intents.length) return true;
    return intents.some((intent) => pantryRecipeSatisfiesIntent(recipe, intent));
  }

  function pantryRecipeSatisfiesIntent(recipe, intent) {
    const haystack = pantryRecipeIntentHaystack(recipe);
    const families = pantryRecipeDishFamilies(recipe);
    const title = norm(recipe?.title || '');
    const checks = {
      egg: /\b(egg|eggs|omelette)\b/,
      chicken: /\b(chicken|kodi|country chicken)\b/,
      fish: /\b(fish|prawn|shrimp)\b/,
      paneer: /\bpaneer\b/,
      tofu: /\b(tofu|soya|soy)\b/,
      mutton: /\b(mutton|keema|kheema|minced meat)\b/,
      dal: /\b(dal|pappu|sambar)\b/,
      chana: /\b(chana|chole|chickpea|chickpeas|sundal|kadala)\b/,
      moong: /\b(moong|mung)\b/,
      rice: /\b(rice|chawal|pulao|biryani|khichdi|pongal|puliyogare|rasam rice)\b/,
      bread: /\b(bread|toast|sandwich|bun|pav)\b/,
      rava: /\b(rava|suji|sooji|semolina|upma|idli|kesari|sheera|halwa|porridge)\b/,
      poha: /\b(poha|avalakki|beaten rice|chirer)\b/,
      'dosa batter': /\b(dosa|idli|uttapam|chutney|sambar)\b/,
      potato: /\b(potato|aloo|batata)\b/,
      tomato: /\btomato\b/,
      capsicum: /\b(capsicum|bell pepper)\b/,
      spinach: /\b(spinach|palak)\b/
    };
    if (intent.key === 'rice' && families.includes('rice')) return true;
    if (intent.key === 'bread' && families.includes('bread')) return true;
    if (intent.key === 'rava' && families.includes('rava')) return true;
    if (intent.key === 'poha' && families.includes('poha')) return true;
    if (intent.key === 'dosa batter' && families.includes('dosa-idli')) return true;
    return (checks[intent.key] || new RegExp(`\\b${intent.key}\\b`)).test(`${title} ${haystack}`);
  }

  function pantryApplyDishFamilyGuard(matches, selected) {
    const selectedFamilies = pantrySelectedDishFamilies(selected);
    if (!selectedFamilies.length) return matches;
    const sameFamily = [];
    const crossFamily = [];
    matches.forEach((match) => {
      const recipeFamilies = pantryRecipeDishFamilies(match.recipe);
      const aligned = selectedFamilies.some((family) => recipeFamilies.includes(family));
      (aligned ? sameFamily : crossFamily).push(match);
    });
    if (sameFamily.length >= 3) return [...sameFamily, ...crossFamily];
    return [...sameFamily, ...crossFamily];
  }

  function pantrySelectedDishFamilies(selected) {
    const families = [];
    const add = (family) => {
      if (!families.includes(family)) families.push(family);
    };
    selected.forEach((item) => {
      const value = norm(item);
      if (/^(bread|toast|sandwich|bun|pav)$/.test(value)) add('bread');
      if (/^(rice|pulao|biryani)$/.test(value)) add('rice');
      if (/^(poha|avalakki|beaten rice)$/.test(value)) add('poha');
      if (/^(dosa|idli|uttapam|dosa batter|idli batter)$/.test(value)) add('dosa-idli');
      if (/^(rava|suji|sooji|semolina)$/.test(value)) add('rava');
      if (/^(curry|gravy|masala)$/.test(value)) add('curry');
      if (/^(soup|rasam)$/.test(value)) add('soup');
      if (/^(salad|chaat)$/.test(value)) add('salad-chaat');
    });
    return families;
  }

  function pantryRecipeDishFamilies(recipe) {
    const haystack = [
      recipe?.title,
      recipe?.dishFamily,
      recipe?.dish_family,
      recipe?.baseIngredient,
      recipe?.base_ingredient,
      recipe?.cuisine,
      ...(recipe?.tags || []),
      ...(recipe?.mealTags || []),
      ...(recipe?.moodTags || [])
    ].map(norm).join(' ');
    const families = [];
    const add = (family) => {
      if (!families.includes(family)) families.push(family);
    };
    if (/\b(bread|toast|sandwich|bun|pav)\b/.test(haystack)) add('bread');
    if (/\b(rice|pulao|biryani|chawal|fried rice|rice bowl)\b/.test(haystack)) add('rice');
    if (/\b(poha|avalakki|beaten rice|chirer)\b/.test(haystack)) add('poha');
    if (/\b(dosa|idli|uttapam)\b/.test(haystack)) add('dosa-idli');
    if (/\b(rava|suji|sooji|semolina|upma|kesari|sheera|halwa|porridge)\b/.test(haystack)) add('rava');
    if (/\b(curry|gravy|masala)\b/.test(haystack)) add('curry');
    if (/\b(soup|rasam)\b/.test(haystack)) add('soup');
    if (/\b(salad|chaat)\b/.test(haystack)) add('salad-chaat');
    return families;
  }

  function pantryInactiveExactComboCandidate(recipe, selected) {
    if (norm(recipe?.recipeType || recipe?.recipe_type || 'core') !== 'inactive') return false;
    const title = norm(recipe?.title || '');
    const has = (...items) => items.every((item) => selected.includes(norm(item)));
    return has('chicken', 'rice') && title === 'chicken rice';
  }

  function pantrySimpleSingleIngredientScore(recipe, selected, ingredients) {
    if (selected.length !== 1) return 0;
    const key = selected[0];
    const title = norm(recipe?.title || '');
    const preferred = pantrySingleIngredientPreferredTitles(key);
    const preferredIndex = preferred.findIndex((item) => item === title);
    let score = preferredIndex >= 0 ? 32000 - preferredIndex * 3000 : 0;
    const titleWords = title.split(' ').filter(Boolean);
    if (pantryTitleHasIngredient(titleWords, key)) score += 4200;
    if (titleWords.length <= 3) score += 1200;
    if (ingredients.some((item) => item.main && ingredientMatchesSelection(item.normalized, key))) score += 1600;
    if (pantrySimpleCoreTitle(title)) score += 1300;
    if (pantryFancyPantryTitle(title)) score -= 3600;
    return score;
  }

  function pantrySingleIngredientPreferredTitles(key) {
    const preferred = {
      egg: ['egg bhurji', 'masala omelette', 'onion omelette', 'egg curry', 'egg toast'],
      paneer: ['paneer bhurji', 'kadai paneer', 'matar paneer', 'paneer curry', 'paneer sandwich'],
      chicken: ['chicken curry', 'garlic chicken', 'chicken sukka', 'andhra chicken curry', 'guntur chicken fry'],
      fish: ['fish fry', 'fish curry', 'kerala fish curry', 'fish curry rice'],
      poha: ['poha', 'avalakki', 'chirer pulao', 'batata poha', 'peanut poha'],
      rava: ['upma', 'vegetable upma', 'rava idli'],
      atta: ['plain chapati', 'aloo paratha', 'paneer paratha', 'onion paratha', 'methi paratha', 'spicy aloo paratha'],
      'wheat flour': ['plain chapati', 'aloo paratha', 'paneer paratha', 'onion paratha', 'methi paratha', 'spicy aloo paratha']
    };
    return preferred[key] || [];
  }

  function pantrySimpleCoreTitle(title) {
    return /\b(bhurji|omelette|curry|fry|sukka|upma|idli|poha|avalakki|pulao)\b/.test(title);
  }

  function pantryFancyPantryTitle(title) {
    return /\b(biryani|tikka|masala|roast|pepper rice bowl|fried rice|schezwan|goan|special|stuffed|cheese|spanish|mushroom|dragon|555)\b/.test(title);
  }

  function pantrySpecificCombinationBonus(recipe, selected) {
    const title = norm(recipe?.title || '');
    const has = (...items) => items.every((item) => selected.includes(norm(item)));
    let bonus = 0;
    if (has('rice', 'potato') && /\b(aloo|potato)\b/.test(title) && /\b(rice|jeera)\b/.test(title)) bonus += 12000;
    if (has('rice', 'potato') && title === 'veg pulao') bonus += 14000;
    if (has('chicken', 'rice') && title === 'chicken rice') bonus += 26000;
    if (has('chicken', 'rice') && /\b(fried rice|pepper rice bowl)\b/.test(title)) bonus -= 3500;
    if (has('chicken', 'tomato') && (title === 'andhra chicken curry' || title === 'chicken tomato rice')) bonus += 13000;
    if (has('bread', 'egg', 'onion') && title === 'bread omelette') bonus += 16000;
    if (has('fish', 'coconut') && title === 'kerala fish curry') bonus += 15000;
    if (has('fish', 'tamarind') && title === 'fish curry') bonus += 22000;
    if (has('fish', 'tamarind') && /\b(goan fish curry|kerala fish curry)\b/.test(title)) bonus += 12000;
    if ((has('rice', 'fish') || has('fish', 'rice')) && title === 'fish curry') bonus += 14000;
    if (has('tomato', 'egg') && title === 'egg tomato rice bowl') bonus += 16000;
    if (has('rice', 'tomato') && title === 'tomato rice') bonus += 14000;
    if (has('rice', 'tomato') && title === 'rasam rice') bonus += 9000;
    if (has('rice', 'tamarind') && title === 'puliyogare') bonus += 22000;
    if (has('rice', 'tamarind') && title === 'lemon rice') bonus -= 16000;
    if (has('rice', 'garlic') && title === 'veg fried rice') bonus += 11000;
    if (has('dosa batter', 'potato') && title === 'masala dosa') bonus += 28000;
    if (has('dosa batter', 'coconut') && title === 'coconut chutney') bonus += 22000;
    if (has('dosa batter', 'coconut') && /\b(set dosa|soft dosa|dosa)\b/.test(title)) bonus += 9000;
    if ((has('rava', 'milk') || has('milk', 'rava')) && /\b(rava kesari|sheera|suji porridge)\b/.test(title)) bonus += 26000;
    if (has('rava', 'onion') && /\b(upma|vegetable upma|rava idli)\b/.test(title)) bonus += 16000;
    if (has('rava', 'onion') && /\b(kesari|sheera|halwa|sweet)\b/.test(title)) bonus -= 24000;
    if (has('rava', 'onion') && title === 'bread upma') bonus -= 26000;
    if (has('rava', 'curd') && /\b(rava idli|vegetable upma|upma)\b/.test(title)) bonus += 16000;
    if (has('rava', 'curd') && /\b(kesari|sheera|halwa|sweet)\b/.test(title)) bonus -= 24000;
    if (has('spinach', 'paneer') && title === 'palak paneer') bonus += 30000;
    if (has('spinach', 'paneer') && /\b(kadai paneer|matar paneer|paneer bhurji|paneer mushroom masala)\b/.test(title)) bonus += 12000;
    if (has('spinach', 'paneer') && title === 'chilli paneer') bonus -= 16000;
    if ((has('dal') || has('dal', 'tomato')) && /\b(dal rice|dal chawal|palak dal|dal makhani|gujarati dal|one pot dal palak rice)\b/.test(title)) bonus += 12000;
    if (has('fish', 'onion', 'tomato') && /\b(fish curry|fish fry|kerala fish curry|goan fish curry)\b/.test(title)) bonus += 14000;
    if (has('paneer', 'onion', 'tomato') && /\b(paneer tikka masala|kadai paneer|matar paneer|paneer bhurji)\b/.test(title)) bonus += 14000;
    if (has('paneer', 'tomato') && /\b(paneer tikka masala|kadai paneer|matar paneer|paneer bhurji)\b/.test(title)) bonus += 14000;
    if (has('paneer', 'tomato') && title === 'paneer salad') bonus -= 18000;
    if ((has('atta') || has('wheat flour')) && /\b(kada prasad|halwa|sweet)\b/.test(title)) bonus -= 26000;
    if ((has('atta') || has('wheat flour')) && /\b(chapati|paratha|roti|thepla)\b/.test(title)) bonus += 12000;
    if (has('carrot', 'beans') && /\b(beans poriyal|beans thoran|veg pulao|vegetable upma|vegetable soup|mixed veg salad|vegetable khichdi)\b/.test(title)) bonus += 18000;
    if (has('carrot', 'beans') && /\b(puree|baby|halwa|juice)\b/.test(title)) bonus -= 22000;
    if (has('capsicum', 'potato') && /\b(capsicum|potato|aloo|batata)\b/.test(title)) bonus += 8000;
    if (selected.length === 1 && selected[0] === 'rava') {
      if (/\b(upma|idli)\b/.test(title)) bonus += 11000;
      if (/\b(kesari|bath|halwa|sweet)\b/.test(title)) bonus -= 7000;
    }
    return bonus;
  }

  function pantryMilkIntentScore(recipe, selected, ingredients = recipeIngredients(recipe)) {
    if (!selected.includes('milk')) return 0;
    const hasMilk = pantryRecipeHasMilkIngredient(ingredients);
    const hasEgg = ingredients.some((item) => ingredientMatchesSelection(item.normalized, 'egg'));
    const title = norm(recipe?.title || '');
    const haystack = [
      recipe?.title,
      recipe?.dishFamily,
      recipe?.dish_family,
      recipe?.cuisine,
      ...(recipe?.tags || []),
      ...(recipe?.mealTags || []),
      ...(recipe?.moodTags || [])
    ].map(norm).join(' ');
    let score = 0;
    if (hasMilk) score += 9000;
    if (hasMilk && selected.includes('egg') && hasEgg) score += 14000;
    if (hasMilk && selected.includes('egg') && !hasEgg) score -= 12000;
    if (hasMilk && selected.length === 1) score += 7000;
    if (!hasMilk && /\b(fry|fried|curry|gravy|spicy|chilli|chili|andhra|guntur|chettinad|roast|masala)\b/.test(haystack)) score -= 12000;
    if (!hasMilk && selected.includes('egg') && /\b(fry|fried|curry|gravy|spicy|chilli|chili|andhra|guntur|chettinad|roast|masala)\b/.test(haystack)) score -= 9000;
    if (!hasMilk && selected.includes('egg') && /\b(toast|sandwich|omelette|bhurji|breakfast|soft|pancake)\b/.test(title)) score += 2500;
    return score;
  }

  function pantryRecipeHasMilkIngredient(ingredients) {
    return ingredients.some((item) => {
      const key = norm(item?.normalized || item?.name || item);
      return /\bmilk\b/.test(key) && !/\bcoconut milk\b/.test(key);
    });
  }

  function pantryIntentProtectionScore(recipe, selected, ingredients = recipeIngredients(recipe)) {
    if (!selected.length) return 0;
    const title = norm(recipe?.title || '');
    const haystack = pantryRecipeIntentHaystack(recipe, ingredients);
    const recipeProteins = pantryRecipeProteinKeys(recipe, ingredients);
    const selectedProteins = pantrySelectedProteinIntentKeys(selected);
    const selectedFamilies = pantrySelectedDishFamilies(selected);
    const recipeFamilies = pantryRecipeDishFamilies(recipe);
    const hasSelectedProtein = selectedProteins.some((protein) => pantryRecipeContainsIntentProtein(recipe, ingredients, protein));
    let score = 0;

    recipeProteins.forEach((protein) => {
      if (!selected.includes(protein)) score -= ['paneer', 'tofu'].includes(protein) ? 18000 : 30000;
    });

    if (selectedProteins.length) {
      if (hasSelectedProtein) score += 12000;
      else score -= 18000;
      if (!hasSelectedProtein && /\b(salad|chaat|soup|rasam|raita)\b/.test(haystack)) score -= 14000;
    }

    if (selected.includes('dal')) {
      if (/\b(dal|pappu|sambar)\b/.test(haystack)) score += 16000;
      if (/\b(mash|idli mash|baby)\b/.test(haystack)) score -= 10000;
      if (!/\b(dal|pappu|sambar)\b/.test(haystack)) score -= 12000;
    }

    if (selected.includes('chana')) {
      if (/\b(chana|chole|chickpea|sundal|kadala)\b/.test(haystack)) score += 14000;
      else score -= 12000;
    }

    if (selected.includes('moong')) {
      if (/\b(moong|mung)\b/.test(haystack)) score += 14000;
      else score -= 12000;
    }

    selectedFamilies.forEach((family) => {
      const aligned = recipeFamilies.includes(family);
      if (family === 'dosa-idli') {
        if (aligned || /\b(chutney|sambar)\b/.test(haystack)) score += 18000;
        else score -= 16000;
      } else if (family === 'rava') {
        if (aligned) score += 18000;
        else score -= 14000;
      } else if (family === 'poha') {
        score += aligned ? 12000 : -9000;
      } else if (family === 'bread') {
        score += aligned ? 9000 : -7000;
      } else if (family === 'rice') {
        score += aligned ? 5000 : -3500;
      }
    });

    if (selected.includes('dosa batter') && selected.includes('potato') && title === 'masala dosa') score += 22000;
    if (selected.includes('dosa batter') && selected.includes('coconut') && title === 'coconut rice') score -= 24000;
    if (selected.includes('rava') && selected.includes('milk') && /\bmilk\b/.test(title) && !/\b(rava|suji|sheera|kesari|halwa|porridge)\b/.test(title)) score -= 26000;
    if (selected.includes('rice') && selected.includes('tomato') && recipeProteins.some((protein) => !selected.includes(protein))) score -= 26000;
    if (selected.includes('rice') && selected.includes('garlic') && recipeProteins.some((protein) => !selected.includes(protein))) score -= 26000;
    return score;
  }

  function pantryRecipeIntentHaystack(recipe, ingredients = recipeIngredients(recipe)) {
    return [
      recipe?.title,
      recipe?.description,
      recipe?.dishFamily,
      recipe?.dish_family,
      recipe?.cuisine,
      recipe?.dietType,
      recipe?.diet,
      ...(recipe?.tags || []),
      ...(recipe?.mealTags || []),
      ...(recipe?.moodTags || []),
      ...ingredients.map((item) => item.name)
    ].map(norm).join(' ');
  }

  function pantrySelectedProteinIntentKeys(selected) {
    const aliases = {
      dal: ['dal'],
      chana: ['chana'],
      chole: ['chana'],
      chickpea: ['chana'],
      chickpeas: ['chana'],
      moong: ['moong'],
      'moong dal': ['moong']
    };
    return [...new Set(selected.flatMap((item) => aliases[item] || (['paneer', 'fish', 'chicken', 'egg', 'mutton', 'tofu'].includes(item) ? [item] : [])))];
  }

  function pantryRecipeContainsIntentProtein(recipe, ingredients, protein) {
    const haystack = pantryRecipeIntentHaystack(recipe, ingredients);
    const patterns = {
      egg: /\b(egg|eggs|omelette)\b/,
      chicken: /\b(chicken|kodi|country chicken)\b/,
      fish: /\b(fish|prawn|shrimp)\b/,
      mutton: /\b(mutton|keema|kheema|minced meat)\b/,
      paneer: /\bpaneer\b/,
      tofu: /\b(tofu|soya|soy)\b/,
      dal: /\b(dal|pappu|sambar)\b/,
      chana: /\b(chana|chole|chickpea|chickpeas|sundal|kadala)\b/,
      moong: /\b(moong|mung)\b/
    };
    return (patterns[protein] || new RegExp(`\\b${protein}\\b`)).test(haystack);
  }

  function pantryUnrelatedProteinPenalty(recipe, selected, ingredients = recipeIngredients(recipe)) {
    const selectedProteins = selected.filter(isMajorProtein);
    if (!selectedProteins.length) return 0;
    const recipeProteins = pantryRecipeProteinKeys(recipe, ingredients);
    const unrelatedCount = recipeProteins.filter((protein) => {
      return !selectedProteins.some((selectedProtein) => ingredientMatchesSelection(protein, selectedProtein));
    }).length;
    return unrelatedCount ? unrelatedCount * 9000 + 5000 : 0;
  }

  function pantryRecipeProteinKeys(recipe, ingredients = recipeIngredients(recipe)) {
    const haystack = [
      recipe?.title,
      recipe?.dietType,
      recipe?.diet,
      ...(recipe?.tags || []),
      ...ingredients.map((item) => item.name)
    ].map(norm).join(' ');
    return ['fish', 'chicken', 'egg', 'paneer', 'mutton', 'prawn', 'pork', 'tofu'].filter((protein) => {
      return new RegExp(`\\b${protein}\\b`).test(haystack);
    });
  }

  function pantryTitleCombinationMatch(recipe, selected) {
    const title = norm(recipe?.title || '');
    const titleWords = title.split(' ').filter(Boolean);
    const titleMatchedSelected = selected.filter((name) => pantryTitleHasIngredient(titleWords, name));
    const allSelectedInTitle = selected.length > 1 && titleMatchedSelected.length === selected.length;
    const bonus = titleMatchedSelected.length * 2400
      + (allSelectedInTitle ? 9000 : 0)
      + (allSelectedInTitle && titleWords.length <= selected.length + 3 ? 800 : 0);
    return {
      titleMatchedSelected,
      allSelectedInTitle,
      bonus
    };
  }

  function pantryTitleHasIngredient(titleWords, selectedKey) {
    const title = titleWords.join(' ');
    if (!title || !selectedKey) return false;
    const variants = pantryTitleIngredientVariants(selectedKey);
    return variants.some((variant) => {
      const key = norm(variant);
      if (!key) return false;
      if (key.includes(' ')) return title.includes(key);
      return titleWords.includes(key);
    });
  }

  function pantryTitleIngredientVariants(selectedKey) {
    const variants = {
      egg: ['egg', 'eggs'],
      peanut: ['peanut', 'peanuts'],
      peanuts: ['peanut', 'peanuts'],
      rice: ['rice', 'fried rice'],
      potato: ['potato', 'aloo'],
      bread: ['bread', 'toast'],
      onion: ['onion', 'onions'],
      tomato: ['tomato', 'tomatoes'],
      paneer: ['paneer'],
      capsicum: ['capsicum', 'bell pepper'],
      chicken: ['chicken'],
      fish: ['fish'],
      coconut: ['coconut'],
      poha: ['poha', 'avalakki', 'chirer'],
      rava: ['rava', 'upma', 'idli']
    };
    return variants[selectedKey] || [selectedKey];
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
    return /^(fish|chicken|egg|paneer|tofu|mutton|prawn|pork|keema|minced meat|country chicken)$/.test(norm(value));
  }

  function isMeatProtein(value) {
    return /^(fish|chicken|mutton|prawn|pork|keema|minced meat|country chicken)$/.test(norm(value));
  }

  function isNonVegRecipe(recipe) {
    return /non-?vegetarian|non veg|nonveg/.test(norm(recipe?.dietType || recipe?.diet || ''));
  }

  function missingIngredients(recipe) {
    return ingredientAvailability(recipe, state.selectedIngredients, state.groceries).missingRequired;
  }

  function niceToHaveIngredients(recipe) {
    return ingredientAvailability(recipe, state.selectedIngredients, state.groceries).optionalNiceToHave;
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
      ? `<span>${missing.map((name) => `<button type="button" data-add-grocery-name="${esc(name)}" data-needed-recipe="${esc(recipe?.id || '')}">+ ${esc(name)}</button>`).join('')}</span><button class="mv2-secondary-wide" type="button" data-add-missing="${esc(recipe?.id || '')}">Add to Shopping List</button>`
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
    const cards = pantryTopRecommendationCards();
    const hasSelectedIngredients = state.selectedIngredients.size > 0;
    return `
      <section class="mv2-pantry-suggestions" aria-label="Tomo pantry suggestions">
        <div class="mv2-pantry-suggestions-head">
          <div><p>TOMO SUGGESTIONS</p><h2>Top matches for you</h2></div>
        </div>
        ${hasSelectedIngredients
          ? `<div class="mv2-pantry-carousel">${cards.length ? cards.map(pantryRecommendationCard).join('') : '<div class="mv2-pantry-carousel-empty">No strong matches yet. Try adding one more ingredient.</div>'}</div>`
          : pantrySuggestionsEmptyState()}
      </section>
    `;
  }

  function pantrySuggestionsEmptyState() {
    return `
      <div class="mv2-pantry-suggestions-empty">
        <span aria-hidden="true">🥫</span>
        <div>
          <strong>Start with what you have</strong>
          <p>Tap ingredients below and Tomo will suggest dishes you can make.</p>
          <small>Try Rice, Egg, Paneer or Tomato.</small>
        </div>
      </div>
    `;
  }

  function pantryTopRecommendationCards() {
    const selected = [...state.selectedIngredients];
    if (!selected.length) return [];
    const matches = pantryMatches();
    const ranked = pantryApplyCardDisplayOrdering(matches.filter(uniqueByRecipeTitle), selected.map(norm));
    return ranked.slice(0, 2).map((match, index) => {
      return {
        match,
        availability: recipeIngredientAvailability(match.recipe),
        label: index === 0 ? 'Strong Match' : 'Similar Match'
      };
    });
  }

  function pantryApplyCardDisplayOrdering(matches, selected) {
    if (selected.includes('dosa batter') && selected.includes('coconut')) {
      const firstDosa = matches.find((match) => /\b(dosa|idli|uttapam)\b/.test(norm(match.recipe?.title || '')));
      const coconutChutney = matches.find((match) => norm(match.recipe?.title || '') === 'coconut chutney');
      if (firstDosa && coconutChutney) {
        return [firstDosa, coconutChutney, ...matches.filter((match) => match !== firstDosa && match !== coconutChutney)];
      }
    }
    return matches;
  }

  function recipeIngredientAvailability(recipe) {
    return ingredientAvailability(recipe, state.selectedIngredients, state.groceries);
  }

  function uniqueByRecipeTitle(item, index, list) {
    const title = norm(item?.recipe?.title || '');
    return title && list.findIndex((candidate) => norm(candidate?.recipe?.title || '') === title) === index;
  }

  function pantryRecommendationCard({ match, availability, label }) {
    const recipe = match.recipe;
    assertPantryDetailAvailabilityAgreement(recipe, availability);
    const needed = availability.missingRequired.length;
    const strength = label || 'Strong Match';
    const actions = needed
      ? `<button type="button" data-add-missing="${esc(recipe.id)}">Add Needed</button><button type="button" data-pantry-recipe="${esc(recipe.id)}">View Dish</button>`
      : `<button type="button" data-pantry-recipe="${esc(recipe.id)}">View Dish</button>`;
    return `
      <article class="mv2-pantry-rec-card">
        ${imageTag(recipeImage(recipe))}
        <div class="mv2-pantry-rec-copy">
          <strong>${esc(recipe.title)}</strong>
          <span>${esc(strength)}</span>
        </div>
        <div class="mv2-pantry-rec-stats">
          <small><span>Have <b>${availability.matchedRequired.length}</b> required</span><span>Needed <b>${needed}</b></span></small>
        </div>
        <div class="mv2-pantry-actions">
          ${actions}
        </div>
      </article>
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
        existing.neededFor = normalizePairingList(existing.neededFor || []);
        if (recipe?.title && !existing.neededFor.some((title) => norm(title) === norm(recipe.title))) existing.neededFor.push(recipe.title);
        return;
      }
      state.groceries.push({ name: label, complete: false, neededFor: recipe?.title ? [recipe.title] : [] });
      added += 1;
    });
    saveGroceries();
    return added;
  }

  function removeGroceryForRecipe(name, recipe = null) {
    let removed = false;
    state.groceries = state.groceries.filter((item) => {
      if (!availabilityIngredientMatches(name, item.name)) return true;
      removed = true;
      if (!recipe?.title) return false;
      const remaining = normalizePairingList(item.neededFor || [])
        .filter((title) => norm(title) !== norm(recipe.title));
      if (!remaining.length) return false;
      item.neededFor = remaining;
      return true;
    });
    if (removed) saveGroceries();
    return removed;
  }

  function assertPantryDetailAvailabilityAgreement(recipe, cardAvailability) {
    if (!recipe || !cardAvailability) return;
    const detailAvailability = recipeIngredientAvailability(recipe);
    if (detailAvailability.missingRequired.length > 0 && cardAvailability.missingRequired.length === 0) {
      console.warn('[Tomo Pantry] availability mismatch: card says Needed 0 but detail has missing required items', {
        recipe: recipe.title,
        selectedIngredients: [...state.selectedIngredients],
        cartItems: state.groceries.map((item) => item.name),
        cardAvailability,
        detailAvailability
      });
    }
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

  function groceryUnlocks() {
    return grocerySuggestions()
      .flatMap((item) => item.recipes.map((recipe) => ({ ingredient: item.ingredient, recipe })))
      .filter((item, index, list) => item.recipe?.id && list.findIndex((entry) => entry.recipe.id === item.recipe.id) === index);
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
    return `<article class="mv2-dish"><button class="mv2-dish-main" type="button" data-recipe="${esc(recipe.id)}">${imageTag(recipeImage(recipe))}<span><strong>${esc(recipe.title)}</strong><p>⏱ ${totalTime(recipe)} min • ${esc(titleCase(recipe.difficulty || 'easy'))}</p></span></button>${dishActionButtons(recipe.id, recipe.title, 'todays-picks')}</article>`;
  }

  function collectionCard(item) {
    const recipe = findRecipe(item.title);
    const image = collectionDishImageOverride(item.title) || (recipe ? recipeImage(recipe) : '') || item.imagePath || item.image_url || collectionDishImage(item);
    const metadata = collectionDishMetadata(item, recipe);
    const recipeId = recipe?.id || collectionDishId(item);
    return `<article class="mv2-collection-dish"><button class="mv2-collection-dish-main" type="button" data-recipe="${esc(recipeId)}">${imageTag(image)}<span><strong>${esc(item.title)}</strong><small>${esc(metadata)}</small><b>View Dish →</b></span></button></article>`;
  }

  function collectionDishMetadata(item, recipe) {
    const minutes = Number(item.time || item.timeMinutes || recipe?.timeMinutes || recipe?.prepTimeMinutes + recipe?.cookTimeMinutes || totalTime(recipe));
    const difficulty = item.difficulty || recipe?.difficulty || 'easy';
    const diet = item.dietType || item.diet_type || recipe?.dietType || dietLabel(recipe);
    return `${minutes || totalTime(recipe)} min • ${titleCase(difficulty)} • ${dietLabel({ dietType: diet })}`;
  }

  function dishActionButtons(recipeId, dishName, source, extraClass = '') {
    const saved = isSaved(recipeId, dishName);
    const dismiss = source === 'todays-picks' && recipeId
      ? `<button class="mv2-card-icon mv2-dismiss" type="button" data-dismiss-today="${esc(recipeId)}" data-dish-name="${esc(dishName)}" aria-label="Skip">✕ Skip</button>`
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
    const collectionItem = collectionRoutes.flatMap((collection) => collection.items || []).find((item) => collectionDishId(item) === id);
    if (!collectionItem) return null;
    const recipe = findRecipe(collectionItem.title);
    const image = collectionDishImageOverride(collectionItem.title) || (recipe ? recipeImage(recipe) : '') || collectionItem.imagePath || collectionItem.image_url || collectionDishImage(collectionItem);
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

  function recommendationFeedbackAction(value) {
    const key = norm(value);
    if (key === 'helpful') return 'helpful';
    if (key === 'not helpful') return 'not helpful';
    return '';
  }

  function recommendationFeedbackValue(action) {
    return action === 'not helpful' ? 'not_helpful' : action;
  }

  function recipeFeedback(recipeId, dishName = '') {
    const recipe = recipes.find((item) => item.id === recipeId) || findRecipe(dishName);
    return dishMemoryEvents().find((event) => {
      return ['helpful', 'not helpful'].includes(event.action) && dishMemoryMatches(recipe, event);
    })?.action || '';
  }

  function dishMemoryEvents() {
    const memory = normalizeDishMemory(state.dishMemory);
    const seen = new Set(memory.map(memoryEventKey));
    const legacy = [
      ...state.savedDishes.map((item) => ({ ...item, dishId: item.id, action: 'saved', source: item.source || 'legacy-saved' })),
      ...state.cookedDishes.map((item) => ({ ...item, dishId: item.id, action: 'cooked', source: item.source || 'legacy-cooked' }))
    ].filter((item) => !seen.has(memoryEventKey(item)));
    return normalizeDishMemory([...memory, ...legacy]);
  }

  function memoryEventKey(event) {
    return `${event.action}:${event.dishId || norm(event.dishName)}`;
  }

  function dishMemoryScore(action) {
    return { cooked: 5, saved: 3, helpful: 2, 'not helpful': -2, dismissed: -3 }[action] || 0;
  }

  function dishMemoryRecipe(event) {
    return recipes.find((recipe) => event.dishId && recipe.id === event.dishId) || findRecipe(event.dishName);
  }

  function dishMemoryMatches(recipe, event) {
    if (!recipe || !event) return false;
    return (event.dishId && event.dishId === recipe.id) || (event.dishName && norm(event.dishName) === norm(recipe.title));
  }

  function daysSince(timestamp) {
    const date = new Date(timestamp || 0);
    if (Number.isNaN(date.getTime())) return Infinity;
    return (Date.now() - date.getTime()) / 86400000;
  }

  function memoryExcludedRecipe(recipe) {
    return dishMemoryEvents().some((event) => {
      return event.action === 'cooked' && dishMemoryMatches(recipe, event) && daysSince(event.timestamp) <= 5;
    });
  }

  function dishMemoryRecommendationAdjustment(recipe) {
    if (!recipe) return 0;
    const events = dishMemoryEvents();
    const directScore = events
      .filter((event) => dishMemoryMatches(recipe, event))
      .reduce((sum, event) => {
        const recentDismissed = event.action === 'dismissed' && daysSince(event.timestamp) <= 7;
        return sum + dishMemoryScore(event.action) + (recentDismissed ? -12 : 0);
      }, 0);
    const preferences = dishMemoryPreferences();
    const moodBoost = preferences.favoriteMoods.some((item) => norm(item.name) === norm(moodLabel(recipe))) ? 8 : 0;
    const cuisineBoost = preferences.favoriteCuisines.some((item) => norm(item.name) === norm(recipe.cuisine)) ? 6 : 0;
    const mealBoost = preferences.favoriteMealTypes.some((item) => recipeMealTypes(recipe).some((meal) => norm(item.name) === norm(meal))) ? 4 : 0;
    const ingredientBoost = memoryIngredientNames(recipe)
      .some((ingredient) => preferences.favoriteIngredients.some((item) => norm(item.name) === norm(ingredient.name))) ? 5 : 0;
    return directScore + moodBoost + cuisineBoost + mealBoost + ingredientBoost;
  }

  function dishMemoryPreferences() {
    const events = dishMemoryEvents();
    return {
      favoriteMoods: aggregateDishMemory(events, (recipe) => [moodLabel(recipe)]),
      favoriteCuisines: aggregateDishMemory(events, (recipe) => [recipe.cuisine].filter(Boolean)),
      favoriteIngredients: aggregateDishMemory(events, (recipe) => memoryIngredientNames(recipe).map((item) => titleCase(item.name))),
      favoriteMealTypes: aggregateDishMemory(events, recipeMealTypes)
    };
  }

  function aggregateDishMemory(events, valuesForRecipe) {
    const scores = new Map();
    events.forEach((event) => {
      const recipe = dishMemoryRecipe(event);
      if (!recipe) return;
      const score = dishMemoryScore(event.action);
      valuesForRecipe(recipe).filter(Boolean).forEach((value) => {
        const label = titleCase(value);
        scores.set(label, (scores.get(label) || 0) + score);
      });
    });
    return [...scores]
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 5)
      .map(([name, score]) => ({ name, score }));
  }

  function recipeMealTypes(recipe) {
    return meals.filter(([meal]) => matchesMeal(recipe, meal)).map(([, label]) => label);
  }

  function memoryIngredientNames(recipe) {
    return recipeIngredients(recipe)
      .filter((item) => !isNiceToHaveIngredient(item) && !isPantryStaple(item.normalized))
      .slice(0, 8);
  }

  function trackDishMemory(action, recipeId, source, dishName = '') {
    const recipe = recipes.find((item) => item.id === recipeId) || findRecipe(dishName);
    const record = {
      dishId: recipe?.id || recipeId || '',
      dishName: recipe?.title || dishName || '',
      action,
      timestamp: new Date().toISOString(),
      source: source || dishSource()
    };
    if (!record.dishId && !record.dishName) return;
    if (action === 'saved' || action === 'dismissed' || action === 'helpful' || action === 'not helpful') {
      const key = memoryEventKey(record);
      state.dishMemory = [
        record,
        ...state.dishMemory.filter((event) => memoryEventKey(event) !== key)
      ].slice(0, 500);
      return;
    }
    state.dishMemory = [record, ...state.dishMemory].slice(0, 500);
  }

  function trackRecommendationFeedbackMemory(action, recipeId, source, dishName = '') {
    const recipe = recipes.find((item) => item.id === recipeId) || findRecipe(dishName);
    const record = {
      dishId: recipe?.id || recipeId || '',
      dishName: recipe?.title || dishName || '',
      action,
      timestamp: new Date().toISOString(),
      source: source || dishSource()
    };
    if (!record.dishId && !record.dishName) return;
    state.dishMemory = [
      record,
      ...state.dishMemory.filter((event) => {
        const isFeedback = event.action === 'helpful' || event.action === 'not helpful';
        if (!isFeedback) return true;
        return !((record.dishId && event.dishId === record.dishId) || (record.dishName && norm(event.dishName) === norm(record.dishName)));
      })
    ].slice(0, 500);
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
    trackDishMemory('saved', recipeId, source, dishName);
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
    trackDishMemory('cooked', recipeId, source, dishName);
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

  function journalCookedTimeLabel(timestamp) {
    if (!timestamp) return 'Recently';
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return 'Recently';
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return relativeTime(timestamp);
  }

  root.addEventListener('click', async (event) => {
    const journalToggle = event.target.closest('[data-journal-toggle]');
    if (journalToggle) {
      if (journalToggle.dataset.journalToggle === 'saved') state.journalSavedExpanded = !state.journalSavedExpanded;
      if (journalToggle.dataset.journalToggle === 'recent') state.journalRecentExpanded = !state.journalRecentExpanded;
      if (journalToggle.dataset.journalToggle === 'activity') state.journalActivityExpanded = !state.journalActivityExpanded;
      render();
      return;
    }

    const openFeedback = event.target.closest('[data-open-feedback]');
    if (openFeedback) {
      state.feedbackOpen = true;
      state.feedbackError = '';
      state.feedbackThanks = false;
      render();
      requestAnimationFrame(() => root.querySelector('[data-feedback-message]')?.focus());
      return;
    }

    const cancelFeedback = event.target.closest('[data-cancel-feedback]');
    if (cancelFeedback || (event.target.classList?.contains('mv2-modal-backdrop'))) {
      state.feedbackOpen = false;
      state.feedbackError = '';
      state.feedbackThanks = false;
      state.feedbackDish = '';
      state.feedbackMessage = '';
      render();
      return;
    }

    const sendFeedback = event.target.closest('[data-send-feedback]');
    if (sendFeedback) {
      state.feedbackMessage = root.querySelector('[data-feedback-message]')?.value ?? state.feedbackMessage;
      state.feedbackDish = root.querySelector('[data-feedback-dish]')?.value ?? state.feedbackDish;
      state.feedbackType = root.querySelector('[data-feedback-type]')?.value ?? state.feedbackType;
      if (!state.feedbackMessage.trim()) {
        state.feedbackError = 'Please add a short message.';
        state.feedbackThanks = false;
        render();
        requestAnimationFrame(() => root.querySelector('[data-feedback-message]')?.focus());
        return;
      }
      window.location.href = feedbackMailtoUrl();
      state.feedbackOpen = false;
      state.feedbackError = '';
      state.feedbackThanks = true;
      showToast('Thanks for helping Tomo improve.');
      state.feedbackDish = '';
      state.feedbackMessage = '';
      render();
      return;
    }

    const closeSearch = event.target.closest('[data-close-search]');
    if (closeSearch) {
      state.searchOpen = false;
      render();
      return;
    }

    const clearSearch = event.target.closest('[data-clear-search]');
    if (clearSearch) {
      state.searchQuery = '';
      state.searchOpen = false;
      render();
      requestAnimationFrame(() => root.querySelector('#mv2GlobalSearch')?.focus());
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
      if (state.activeRecipeId !== searchRecipe.dataset.searchRecipe) state.expandedPairingsRecipeId = '';
      state.activeRecipeId = searchRecipe.dataset.searchRecipe;
      state.quickGuideExpanded = false;
      state.dishOrigin = 'discover';
      state.searchOpen = false;
      state.screen = 'dish';
      trackDishViewed(state.activeRecipeId, 'search');
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const searchCollection = event.target.closest('[data-search-collection]');
    if (searchCollection) {
      const selectedCollection = collectionByKey(searchCollection.dataset.searchCollection);
      if (selectedCollection?.status === 'coming-soon') {
        state.searchOpen = false;
        showToast('Global Bites is coming soon.');
        render();
        return;
      }
      state.discoverScrollY = window.scrollY;
      state.collectionKey = searchCollection.dataset.searchCollection;
      state.collectionHubKey = selectedCollection?.generatedType === 'collection' ? selectedCollection.hubKey || '' : selectedCollection?.key || '';
      state.subcategory = '';
      state.searchOpen = false;
      state.screen = 'collection';
      trackAnalyticsEvent('collection_opened', 'search', { collectionKey: state.collectionKey });
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
      trackAnalyticsEvent('mood_selected', 'search', { mood: state.mood, label: selectedMoodLabel(state.mood) });
      render();
      window.scrollTo(0, 0);
      return;
    }

    const quickGuideToggle = event.target.closest('[data-toggle-quick-guide]');
    if (quickGuideToggle) {
      state.quickGuideExpanded = !state.quickGuideExpanded;
      render();
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

    const microMealsToggle = event.target.closest('[data-toggle-micro-meals]');
    if (microMealsToggle) {
      state.microMealsExpanded = !state.microMealsExpanded;
      renderWithMotion('recommendation');
      return;
    }

    const kitchenTab = event.target.closest('[data-kitchen-tab]');
    if (kitchenTab) {
      state.kitchenTab = kitchenTab.dataset.kitchenTab;
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
      const nextMood = state.mood === mood.dataset.mood ? '' : mood.dataset.mood;
      state.mood = nextMood;
      state.activeTomoPick = null;
      state.dismissedToday = [];
      if (nextMood) trackAnalyticsEvent('mood_selected', 'discover', { mood: nextMood, label: selectedMoodLabel(nextMood) });
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
      const selectedCollection = collectionByKey(collection.dataset.collection);
      if (selectedCollection?.status === 'coming-soon') {
        showToast('Global Bites is coming soon.');
        render();
        return;
      }
      state.discoverScrollY = window.scrollY;
      state.collectionKey = collection.dataset.collection;
      state.collectionHubKey = selectedCollection?.generatedType === 'collection' ? selectedCollection.hubKey || '' : selectedCollection?.key || '';
      state.subcategory = '';
      state.screen = 'collection';
      trackAnalyticsEvent('collection_opened', 'discover', { collectionKey: state.collectionKey });
      renderWithMotion('collection-forward');
      window.scrollTo(0, 0);
      return;
    }

    const subcategory = event.target.closest('[data-subcategory]');
    if (subcategory) {
      state.subcategory = subcategory.dataset.subcategory;
      const collection = collectionByKey(state.collectionKey);
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

    const clearPantry = event.target.closest('[data-clear-pantry]');
    if (clearPantry) {
      state.selectedIngredients.clear();
      renderWithMotion('pantry-update');
      return;
    }

    const ingredient = event.target.closest('[data-ingredient]');
    if (ingredient) {
      const wasSelected = state.selectedIngredients.has(ingredient.dataset.ingredient);
      wasSelected
        ? state.selectedIngredients.delete(ingredient.dataset.ingredient)
        : state.selectedIngredients.add(ingredient.dataset.ingredient);
      if (!wasSelected) {
        trackAnalyticsEvent('pantry_ingredient_selected', 'pantry', {
          ingredient: ingredient.dataset.ingredient,
          selectedCount: state.selectedIngredients.size
        });
      }
      renderWithMotion('pantry-update');
      return;
    }

    const pantryRecipe = event.target.closest('[data-pantry-recipe]');
    if (pantryRecipe) {
      if (state.activeRecipeId !== pantryRecipe.dataset.pantryRecipe) state.expandedPairingsRecipeId = '';
      state.activeRecipeId = pantryRecipe.dataset.pantryRecipe;
      state.quickGuideExpanded = false;
      state.dishOrigin = 'pantry';
      state.pantryScrollY = window.scrollY;
      state.screen = 'dish';
      trackDishViewed(state.activeRecipeId, 'pantry');
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const journalRecipe = event.target.closest('[data-journal-recipe]');
    if (journalRecipe) {
      if (state.activeRecipeId !== journalRecipe.dataset.journalRecipe) state.expandedPairingsRecipeId = '';
      state.activeRecipeId = journalRecipe.dataset.journalRecipe;
      state.quickGuideExpanded = false;
      state.dishOrigin = 'journal';
      state.journalScrollY = window.scrollY;
      state.screen = 'dish';
      trackDishViewed(state.activeRecipeId, 'journal');
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const addMissing = event.target.closest('[data-add-missing]');
    if (addMissing) {
      const recipe = recipes.find((item) => item.id === addMissing.dataset.addMissing);
      const remaining = recipe ? recipeIngredientAvailability(recipe).remainingToAdd : [];
      const added = recipe ? addGroceries(remaining, recipe) : 0;
      trackAnalyticsEvent('add_missing_items_clicked', 'pantry', {
        ...recipeAnalyticsMetadata(recipe?.id || '', recipe?.title || ''),
        addedCount: added
      });
      if (recipe) added ? showShoppingListConfirmation() : showToast('Items already in Shopping List');
      renderWithMotion('pantry-update');
      return;
    }

    const detailToggleOne = event.target.closest('[data-detail-toggle-one]');
    if (detailToggleOne) {
      const name = detailToggleOne.dataset.detailToggleOne;
      const recipe = recipes.find((item) => item.id === detailToggleOne.dataset.neededRecipe);
      const exists = groceryHasIngredient(name, recipe);
      const added = exists ? 0 : addGroceries([name], recipe);
      if (exists) {
        removeGroceryForRecipe(name, recipe);
      }
      trackAnalyticsEvent(exists ? 'remove_missing_item_clicked' : 'add_missing_item_clicked', 'dish-detail', {
        ...recipeAnalyticsMetadata(recipe?.id || '', recipe?.title || ''),
        ingredient: name,
        addedCount: added
      });
      exists ? showToast(`${name} removed from Shopping List`) : showShoppingListConfirmation();
      render();
      return;
    }

    const detailAddMissing = event.target.closest('[data-detail-add-missing]');
    if (detailAddMissing) {
      const recipe = recipes.find((item) => item.id === detailAddMissing.dataset.detailAddMissing);
      const remaining = recipe ? recipeIngredientAvailability(recipe).remainingToAdd : [];
      const added = recipe ? addGroceries(remaining, recipe) : 0;
      trackAnalyticsEvent('add_missing_items_clicked', 'dish-detail', {
        ...recipeAnalyticsMetadata(recipe?.id || '', recipe?.title || ''),
        addedCount: added
      });
      added ? showShoppingListConfirmation() : showToast('Items already in Shopping List');
      render();
      return;
    }

    const addGroceryName = event.target.closest('[data-add-grocery-name]');
    if (addGroceryName) {
      const recipe = recipes.find((item) => item.id === addGroceryName.dataset.neededRecipe);
      const added = addGroceries([addGroceryName.dataset.addGroceryName], recipe);
      added ? showShoppingListConfirmation() : showToast('Items already in Shopping List');
      render();
      return;
    }

    const addGrocery = event.target.closest('[data-add-grocery]');
    if (addGrocery) {
      const recipe = recipes.find((item) => item.id === addGrocery.dataset.neededRecipe);
      const added = addGroceries([addGrocery.dataset.addGrocery], recipe);
      added ? showShoppingListConfirmation() : showToast('Items already in Shopping List');
      render();
      return;
    }

    const moreUnlocks = event.target.closest('[data-cart-unlocks-more]');
    if (moreUnlocks) {
      state.cartUnlocksExpanded = true;
      render();
      return;
    }

    const unlockRecipe = event.target.closest('[data-cart-unlock-recipe]');
    if (unlockRecipe) {
      if (state.activeRecipeId !== unlockRecipe.dataset.cartUnlockRecipe) state.expandedPairingsRecipeId = '';
      state.activeRecipeId = unlockRecipe.dataset.cartUnlockRecipe;
      state.quickGuideExpanded = false;
      state.dishOrigin = 'cart';
      state.screen = 'dish';
      trackDishViewed(state.activeRecipeId, 'shopping-cart');
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const copyList = event.target.closest('[data-copy-shopping-list]');
    if (copyList) {
      const copied = await copyShoppingList();
      trackAnalyticsEvent('shopping_list_copied', 'shopping-cart', {
        success: copied,
        itemCount: state.groceries.length
      });
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
          trackAnalyticsEvent('shopping_list_shared', 'shopping-cart', {
            method: 'native-share',
            success: true,
            itemCount: state.groceries.length
          });
          showToast('Shopping list shared.');
        } catch (error) {
          if (error?.name === 'AbortError') return;
          const copied = await copyShoppingList();
          trackAnalyticsEvent('shopping_list_shared', 'shopping-cart', {
            method: 'copy-fallback',
            success: copied,
            itemCount: state.groceries.length
          });
          showToast(copied ? 'Shopping list copied.' : 'Could not share shopping list.');
        }
      } else {
        const copied = await copyShoppingList();
        trackAnalyticsEvent('shopping_list_shared', 'shopping-cart', {
          method: 'copy-fallback',
          success: copied,
          itemCount: state.groceries.length
        });
        showToast(copied ? 'Shopping list copied.' : 'Could not share shopping list.');
      }
      render();
      return;
    }

    const cookRecipe = event.target.closest('[data-cook-recipe]');
    if (cookRecipe) {
      const recipeId = cookRecipe.dataset.cookRecipe;
      trackAnalyticsEvent('cook_this_clicked', cookRecipe.dataset.source || dishSource(), recipeAnalyticsMetadata(recipeId, cookRecipe.dataset.dishName));
      recordCooked(recipeId, cookRecipe.dataset.source, cookRecipe.dataset.dishName);
      showToast('Added to your cooking journey');
      if (recipeId && state.screen !== 'dish') {
        if (state.activeRecipeId !== recipeId) state.expandedPairingsRecipeId = '';
        state.activeRecipeId = recipeId;
        state.quickGuideExpanded = false;
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
      trackAnalyticsEvent('dish_dismissed', 'todays-picks', recipeAnalyticsMetadata(dismissToday.dataset.dismissToday, dismissToday.dataset.dishName));
      trackDishMemory('dismissed', dismissToday.dataset.dismissToday, 'todays-picks', dismissToday.dataset.dishName);
      saveMemory();
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

    const clearGroceries = event.target.closest('[data-clear-groceries]');
    if (clearGroceries) {
      state.groceries = [];
      saveGroceries();
      render();
      return;
    }

    const recommendationFeedback = event.target.closest('[data-recommendation-feedback]');
    if (recommendationFeedback) {
      const action = recommendationFeedbackAction(recommendationFeedback.dataset.recommendationFeedback);
      if (!action) return;
      const recipeId = recommendationFeedback.dataset.feedbackRecipe;
      const dishName = recommendationFeedback.dataset.feedbackDish;
      const source = dishSource();
      trackRecommendationFeedbackMemory(action, recipeId, source, dishName);
      trackAnalyticsEvent('recommendation_feedback', source, {
        ...recipeAnalyticsMetadata(recipeId, dishName),
        source,
        activeMood: state.mood || '',
        feedback: recommendationFeedbackValue(action)
      });
      saveMemory();
      render();
      return;
    }

    const save = event.target.closest('[data-save]');
    if (save) {
      const savedAlready = isSaved(save.dataset.save, save.dataset.dishName);
      trackAnalyticsEvent('save_clicked', save.dataset.source || dishSource(), {
        ...recipeAnalyticsMetadata(save.dataset.save, save.dataset.dishName),
        action: savedAlready ? 'unsave' : 'save'
      });
      if (savedAlready) {
        unsaveDish(save.dataset.save, save.dataset.dishName);
        showToast('Removed from Saved');
      } else {
        saveDish(save.dataset.save, save.dataset.source, save.dataset.dishName);
        showToast('Saved to Tomo');
      }
      render();
      return;
    }

    const pairingsToggle = event.target.closest('[data-pairings-toggle]');
    if (pairingsToggle) {
      state.expandedPairingsRecipeId = state.expandedPairingsRecipeId === pairingsToggle.dataset.pairingsToggle
        ? ''
        : pairingsToggle.dataset.pairingsToggle;
      render();
      return;
    }

    const recipe = event.target.closest('[data-recipe]');
    if (recipe?.dataset.recipe) {
      const fromCollection = state.screen === 'collection';
      if (fromCollection) state.collectionScrollY = window.scrollY;
      else state.discoverScrollY = window.scrollY;
      if (state.activeRecipeId !== recipe.dataset.recipe) state.expandedPairingsRecipeId = '';
      state.activeRecipeId = recipe.dataset.recipe;
      state.quickGuideExpanded = false;
      state.dishOrigin = fromCollection ? 'collection' : 'discover';
      state.screen = 'dish';
      trackDishViewed(state.activeRecipeId, state.dishOrigin);
      renderWithMotion('detail-forward');
      window.scrollTo(0, 0);
      return;
    }

    const relatedRecipe = event.target.closest('[data-related-recipe]');
    if (relatedRecipe) {
      if (state.activeRecipeId !== relatedRecipe.dataset.relatedRecipe) state.expandedPairingsRecipeId = '';
      state.activeRecipeId = relatedRecipe.dataset.relatedRecipe;
      state.quickGuideExpanded = false;
      trackDishViewed(state.activeRecipeId, 'related-dishes');
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
      if (back.dataset.back === 'cart') {
        state.screen = 'kitchen';
        state.kitchenTab = 'groceries';
        renderWithMotion('back');
        window.scrollTo(0, 0);
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
      if (back.dataset.back === 'collection-hub') {
        const currentCollection = collectionByKey(state.collectionKey);
        state.collectionKey = currentCollection?.hubKey || state.collectionHubKey || collections[0]?.key || '';
        state.subcategory = '';
        state.screen = 'collection';
        renderWithMotion('back');
        window.scrollTo(0, 0);
        return;
      }
      state.screen = back.dataset.back === 'collections' ? 'collections' : 'discover';
      renderWithMotion('back');
      requestAnimationFrame(() => window.scrollTo(0, state.tabScroll[state.screen] || state.discoverScrollY));
    }
  });

  root.addEventListener('input', (event) => {
    if (event.target.matches('[data-feedback-dish]')) {
      state.feedbackDish = event.target.value;
      return;
    }
    if (event.target.matches('[data-feedback-message]')) {
      state.feedbackMessage = event.target.value;
      state.feedbackError = '';
      return;
    }
    if (event.target.id === 'mv2GlobalSearch') {
      const cursor = event.target.selectionStart;
      state.searchQuery = event.target.value;
      state.searchOpen = Boolean(state.searchQuery.trim());
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
    if (!event.target.matches('[data-feedback-type]')) return;
    state.feedbackType = event.target.value;
  });

  root.addEventListener('submit', (event) => {
    const searchForm = event.target.closest('[data-search-form]');
    if (searchForm) {
      event.preventDefault();
      state.searchOpen = Boolean(state.searchQuery.trim());
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

  installAnalyticsHelpers();
  window.__tomoMobileRoleAudit = {
    allowedRecipeRoles: [...allowedRecipeRoles],
    recommendationRecipeRole,
    recommendationRolePenalty,
    matchesMeal,
    hasBreakfastSignal,
    breakfastRecommendationEligible,
    isWarmDrinkRecipe,
    moodRoleAdjustment,
    moodScore,
    heroSoupContextBonus,
    heroRoleEligible,
    todaysPickRoleEligible,
    fourCardRecommendations,
    relatedRoleScore,
    relatedDishes
  };
  window.__tomoMobileDiscoverAudit = {
    fourCards(mood = state.mood, meal = state.meal, selectedIngredients = [...state.selectedIngredients]) {
      const previousMood = state.mood;
      const previousMeal = state.meal;
      const previousIngredients = new Set(state.selectedIngredients);
      state.mood = mood;
      state.meal = meal;
      state.selectedIngredients = new Set(selectedIngredients);
      const cards = fourCardRecommendations(meal, mood).map((card) => ({
        key: card.key,
        label: card.label,
        title: card.recipe.title,
        role: recommendationRecipeRole(card.recipe),
        dishFamily: dishFamily(card.recipe)
      }));
      state.mood = previousMood;
      state.meal = previousMeal;
      state.selectedIngredients = previousIngredients;
      return cards;
    }
  };
  window.__tomoMobileCollectionsAudit = {
    enabled: USE_GENERATED_COLLECTIONS,
    hubs() {
      return generatedCollectionSystem.hubs.map((hub) => ({
        key: hub.key,
        title: hub.title,
        count: hub.count,
        childCollections: hub.generatedCollections.length,
      }));
    },
    collections() {
      return generatedCollectionSystem.collections.map((collection) => ({
        key: collection.key,
        hub: collection.hubName,
        title: collection.title,
        count: collection.count,
        groups: generatedCollectionDisplayGroups(collection).map((group) => ({
          name: group.name,
          count: group.recipes.length
        })),
        duplicateRecipes: collection.items.length - new Set(collection.items.map((item) => item.recipeId || item.id)).size,
        groupedRecipes: generatedCollectionDisplayGroups(collection).reduce((sum, group) => sum + group.recipes.length, 0),
      }));
    },
    summary() {
      const hubs = this.hubs();
      const collections = this.collections();
      return {
        enabled: USE_GENERATED_COLLECTIONS,
        hubCount: hubs.length,
        collectionCount: collections.length,
        totalRecipes: recipes.length,
        hubRecipes: hubs.reduce((sum, hub) => sum + hub.count, 0),
        collectionRecipes: collections.reduce((sum, collection) => sum + collection.count, 0),
        emptyCollections: collections.filter((collection) => collection.count === 0).map((collection) => collection.title),
        duplicateCollections: collections.filter((collection) => collection.duplicateRecipes > 0).map((collection) => collection.title),
        groupingMismatches: collections.filter((collection) => collection.groupedRecipes !== collection.count).map((collection) => collection.title),
      };
    }
  };
  window.runTomoCollectionImageAudit = runCollectionImageAudit;
  const collectionAuditRequested = new URLSearchParams(window.location.search).get('collectionImageAudit') === '1'
    || window.location.hash.includes('collection-image-audit');
  if (collectionAuditRequested) window.setTimeout(() => runCollectionImageAudit(), 0);
  render();
};
