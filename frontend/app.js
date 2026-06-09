function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function groceryItemId(name, sourceRecipe = '') {
  return `${normalizeIngredientName(name)}::${normalizeIngredientName(sourceRecipe || 'manual')}`;
}

const appConfig = window.TOMO_APP_CONFIG || {
  APP_NAME: 'Tomo',
  TAGLINE: 'Food for Every Mood',
  ALT_TAGLINE: 'Your Mood, Your Meal',
  BRAND_POSITIONING: 'Tomo helps you decide what to cook today.',
  ASSETS: {
    logo: 'tomo.png',
    mascot: 'tomo.png',
    wordmark: 'Tomo'
  }
};

function applyBrandConfig() {
  document.title = appConfig.APP_NAME;
  document.querySelectorAll('[data-brand-name]').forEach((element) => {
    element.textContent = appConfig.APP_NAME;
  });
  document.querySelectorAll('[data-brand-tagline]').forEach((element) => {
    element.textContent = appConfig.TAGLINE;
  });
}

function normalizeGroceryItems(items) {
  return (items || []).map((item) => {
    if (typeof item === 'string') {
      return {
        id: groceryItemId(item),
        ingredientName: item,
        sourceRecipe: '',
        isCompleted: false,
        createdAt: new Date().toISOString()
      };
    }
    const ingredientName = item.ingredientName || item.ingredient_name || item.name || item.item || '';
    const sourceRecipe = item.sourceRecipe || item.source_recipe || '';
    return {
      id: item.id || groceryItemId(ingredientName, sourceRecipe),
      ingredientName,
      sourceRecipe,
      isCompleted: Boolean(item.isCompleted ?? item.is_completed ?? item.isBought ?? item.is_bought),
      createdAt: item.createdAt || item.created_at || new Date().toISOString()
    };
  }).filter((item) => item.ingredientName);
}

const state = {
  recipes: [],
  collections: [],
  collectionDetails: new Map(),
  expandedCollectionRows: new Set(),
  activeCollectionSubcategories: new Map(),
  meal: 'breakfast',
  mood: 'comfort',
  selectedIngredients: new Set(),
  groceryItems: normalizeGroceryItems(safeJsonParse(localStorage.getItem('cookbuddy_grocery'), [])),
  cookingHistory: safeJsonParse(localStorage.getItem('cookbuddy_cooking_history'), []),
  userInteractions: safeJsonParse(localStorage.getItem('cookbuddy_recipe_interactions'), {}),
  activeRecipe: null,
  activeMood: null,
  featuredRecipeId: localStorage.getItem('cookbuddy_featured_recipe'),
  revealedPickId: null,
  favoriteIds: new Set(safeJsonParse(localStorage.getItem('cookbuddy_favorites'), [])),
  laterIds: new Set(safeJsonParse(localStorage.getItem('cookbuddy_later'), [])),
  expandedCollections: new Set(),
  activeCollection: 'baby',
  collectionsOpen: false,
  ingredientsExpanded: false,
  ingredientSearch: ''
};

let picksTransitionTimer = null;

const moodCopy = {
  comfort: {
    hero: 'Something warm sounds right tonight 🍲',
    nudge: 'Nothing beats comfort food. Hope you find your favorite.',
    terms: ['comfort', 'soul', 'home-style'],
    microcopy: 'Warm meals for slower evenings 🍲'
  },
  rainy: {
    hero: 'Rain outside, warm food inside 🌧',
    nudge: 'Rain + warm food = happiness.',
    terms: ['rainy', 'snack', 'comfort'],
    microcopy: 'Best enjoyed with rain outside 🌧'
  },
  quick: {
    hero: 'Let’s make dinner feel easy today.',
    nudge: 'Quick can still feel like home.',
    terms: ['quick', 'breakfast', 'snack'],
    microcopy: 'Fast comfort when energy is low ⚡'
  },
  protein: {
    hero: 'A filling plate can still feel kind.',
    nudge: 'Let us keep it filling and kind.',
    terms: ['high-protein', 'protein', 'egg', 'chicken', 'paneer'],
    microcopy: 'Filling food without losing warmth 💪'
  },
  soul: {
    hero: 'A comforting plate might help today.',
    nudge: 'Soul food should feel familiar.',
    terms: ['soul', 'comfort', 'lunch'],
    microcopy: 'Food that feels like home 💗'
  },
  spicy: {
    hero: 'A little warmth, a little spark 🔥',
    nudge: 'A little spice can fix the whole mood.',
    terms: ['spicy-food', 'spicy', 'chilli', 'mirchi', 'pepper'],
    microcopy: 'A little heat for a brighter plate 🔥'
  }
};

const tomoHeroMessages = {
  comfort: [
    'A comforting plate sounds perfect tonight.',
    'Something warm might hit the spot.',
    'Cozy food feels right today.'
  ],
  rainy: [
    'Looks like soup weather today.',
    'A rainy day calls for comfort food.',
    'Something warm belongs on the menu.'
  ],
  quick: [
    "Let's keep cooking simple today.",
    'A quick win sounds good.',
    'Minimal effort, maximum comfort.'
  ],
  spicy: [
    'Ready for something bold?',
    "Let's turn up the heat.",
    'A little spice never hurts.'
  ],
  protein: [
    'Fuel up with something satisfying.',
    'Protein might be the right move today.',
    "Let's build a stronger plate."
  ],
  soul: [
    'Some recipes feel like home.',
    'Comfort comes in many forms.',
    "Today's meal should feel familiar."
  ],
  pantry: [
    'I spotted a few ingredients waiting to be used.',
    'Your kitchen already has a few clues.',
    'Let me connect what you have into dinner.'
  ]
};

const moodLabels = {
  comfort: 'Comfort Food',
  rainy: 'Rainy Day',
  quick: 'Quick & Easy',
  protein: 'High Protein',
  soul: 'Soul Food',
  spicy: 'Spicy Food'
};

const tomoMoodBanter = {
  comfort: 'Looks like comfort is calling today. I’ll find something warm, familiar, and easy to love.',
  soul: 'Feels like home is on the menu. Let’s bring back something familiar.',
  protein: 'Need some fuel today? I’ll look for dishes that feel satisfying and protein-rich.',
  quick: 'Short on time? I’ll keep it simple and quick.',
  spicy: 'Craving a kick? Let’s turn up the heat.',
  rainy: 'Rainy mood? Perfect. Let’s find something warm, crispy, or cozy.'
};

function activeMood() {
  return state.activeMood || '';
}

function moodForCopy() {
  return state.activeMood || state.mood || 'comfort';
}

function labelForMood(mood) {
  return moodLabels[mood] || 'Mood';
}

function hasWeirdPantryCombo(selectedIngredients = []) {
  const selected = selectedIngredients.map(normalizeIngredientName);
  return selected.includes('apple') && selected.includes('fish');
}

function formatTomoMessage(message) {
  return String(message || '').trim().startsWith('🍅') ? message : `🍅 ${message}`;
}

function getTomoMessage(options = {}) {
  const {
    context,
    mood = activeMood() || moodForCopy(),
    selectedIngredients = [...state.selectedIngredients],
    results = [],
    missingIngredient = '',
    recipeName = '',
    resultType = '',
    reason = ''
  } = options;

  if (context === 'mood_selected') {
    return formatTomoMessage(tomoMoodBanter[mood] || tomoMoodBanter.comfort);
  }

  if (context === 'pantry_open') {
    return formatTomoMessage('What’s in your kitchen today? Pick 2–4 ingredients and I’ll connect the dots.');
  }

  if (context === 'ingredient_selected') {
    const count = selectedIngredients.length;
    if (count === 1) return formatTomoMessage('Nice start. Add one more ingredient and I can suggest better dishes.');
    if (count === 2) return formatTomoMessage('Good combo. I found a few dishes you can make with this.');
    if (count >= 3) return formatTomoMessage('Now we’re cooking. These matches look stronger.');
    return getTomoMessage({ context: 'pantry_open' });
  }

  if (context === 'results_found') {
    if (resultType === 'top') return formatTomoMessage('Best match from your kitchen.');
    if (resultType === 'close') return formatTomoMessage('Almost there — you may need one more ingredient.');
    if (results.length) return formatTomoMessage(`I found ${results.length} good ${results.length === 1 ? 'idea' : 'ideas'} from your kitchen.`);
    return formatTomoMessage('Best match from your kitchen.');
  }

  if (context === 'add_more_ingredient') {
    if (missingIngredient && recipeName) return formatTomoMessage(`Add ${missingIngredient} to unlock ${recipeName}.`);
    if (missingIngredient) return formatTomoMessage(`Add ${missingIngredient} to unlock a better match.`);
    return formatTomoMessage('Add one more main ingredient and I’ll sharpen the suggestions.');
  }

  if (context === 'empty_state') {
    if (reason === 'mood_fewer') return formatTomoMessage('I found fewer dishes here, but they fit the mood better.');
    if (hasWeirdPantryCombo(selectedIngredients)) return formatTomoMessage('That combo is interesting, but I don’t want to force a bad suggestion.');
    return formatTomoMessage('I couldn’t find a clean match yet. Try adding one more main ingredient.');
  }

  return formatTomoMessage('I’m here. Tell me the mood or what’s in your kitchen.');
}

function tomoMessageMarkup(options = {}, className = 'tomo-banter-line') {
  return `<p class="${className}">${escapeHtml(getTomoMessage(options))}</p>`;
}

const mealTitles = {
  breakfast: 'Breakfast ideas',
  lunch: 'Lunch ideas',
  dinner: 'Dinner ideas',
  snack: 'Snacky comfort'
};

const ingredientFamilies = {
  wheat: ['wheat', 'whole wheat', 'besan', 'maida', 'flour'],
  'whole wheat': ['wheat', 'whole wheat', 'besan', 'maida', 'flour'],
  besan: ['besan', 'flour'],
  maida: ['maida', 'flour'],
  fish: ['fish'],
  rice: ['rice'],
  'rice flour': ['rice flour'],
  'idli rice': ['idli rice'],
  dal: ['dal'],
  'toor dal': ['toor dal'],
  'moong dal': ['moong dal'],
  'urad dal': ['urad dal']
};

const protectedIngredients = [
  'chicken',
  'country chicken',
  'egg',
  'fish',
  'paneer',
  'mutton',
  'prawn',
  'pork',
  'keema',
  'kheema'
];

const secondaryFlavorIngredients = [
  'red chilli',
  'green chilli',
  'chilli',
  'chili',
  'pepper',
  'cumin',
  'mustard seeds',
  'mustard seed',
  'turmeric',
  'coriander',
  'curry leaves',
  'garlic',
  'ginger',
  'ghee',
  'oil',
  'salt',
  'cardamom',
  'clove',
  'cinnamon'
];

function isNextIngredientSuggestionAllowed(ingredient) {
  const normalized = normalizeIngredientName(ingredient);
  if (!normalized) return false;
  if (secondaryFlavorIngredients.includes(normalized)) return false;
  const catalog = Array.isArray(window.COOKBUDDY_PANTRY_CATALOG) ? window.COOKBUDDY_PANTRY_CATALOG : [];
  const catalogItem = catalog.find((item) => normalizeIngredientName(item.ingredient_name || item.ingredientName || item.name) === normalized);
  return catalogItem?.display_status !== 'hidden';
}

const factBanters = [
  '🍅 Pair dal with rice or roti for a more complete protein plate.',
  '🥣 Soups are a gentle way to add vegetables without making dinner heavy.',
  '🍌 Banana and milk can be a soft baby-food base when texture matters.',
  '🌾 Ragi brings calcium and fiber, especially nice in porridge.',
  '🫘 Besan adds protein to snacky foods like chilla and pakora.',
  '🥬 A little vegetable side can balance a rice-heavy meal.'
];

const herbalDrinks = [
  {
    id: 'kashaya',
    title: 'Kashaya',
    description: 'A warm pepper, cumin, coriander, and jaggery drink for rainy evenings.',
    ingredients: ['pepper', 'cumin', 'coriander', 'jaggery'],
    time: 12
  },
  {
    id: 'tulsi-ginger-tea',
    title: 'Tulsi Ginger Tea',
    description: 'Tulsi and ginger simmered gently for a soothing herbal cup.',
    ingredients: ['tulsi', 'ginger', 'honey'],
    time: 10
  },
  {
    id: 'jeera-ajwain-water',
    title: 'Jeera Ajwain Water',
    description: 'A light cumin and ajwain infusion often used after heavy meals.',
    ingredients: ['jeera', 'ajwain'],
    time: 8
  },
  {
    id: 'ragi-malt',
    title: 'Ragi Malt',
    description: 'A nourishing ragi drink with milk, cardamom, and a little jaggery.',
    ingredients: ['ragi', 'milk', 'cardamom'],
    time: 15
  }
];

const quickSalads = [
  {
    title: 'Kachumber Salad',
    description: 'Cucumber, onion, tomato, lemon, and coriander for a crisp meal side.',
    time: 10
  },
  {
    title: 'Carrot Kosambari',
    description: 'A gentle South Indian salad with carrot, moong dal, coconut, and lemon.',
    time: 12
  },
  {
    title: 'Sprouted Moong Salad',
    description: 'Light, protein-friendly sprouts with onion, tomato, chilli, and lime.',
    time: 15
  },
  {
    title: 'Cucumber Peanut Salad',
    description: 'Cooling cucumber with roasted peanut, coconut, and a soft tempering.',
    time: 10
  }
];

const homeDesserts = [
  {
    title: 'Semiya Payasam',
    description: 'Vermicelli, milk, cardamom, and nuts for a small festive bowl.',
    time: 25
  },
  {
    title: 'Carrot Halwa',
    description: 'Slow-cooked carrot, milk, ghee, and jaggery for cozy sweetness.',
    time: 40
  },
  {
    title: 'Rava Kesari',
    description: 'Warm semolina dessert with saffron, ghee, and cashews.',
    time: 20
  },
  {
    title: 'Sweet Pongal',
    description: 'Rice, dal, jaggery, and ghee for a soft home-style dessert.',
    time: 30
  }
];

const els = {
  heroMessage: document.querySelector('#heroMessage'),
  activeMoodBar: document.querySelector('#activeMoodBar'),
  heroPickTitle: document.querySelector('#heroPickTitle'),
  heroRevealDish: document.querySelector('#heroRevealDish'),
  heroPickReasons: document.querySelector('#heroPickReasons'),
  heroCookNow: document.querySelector('#heroCookNow'),
  heroFindAnother: document.querySelector('#heroFindAnother'),
  ambientTime: document.querySelector('#ambientTime'),
  ambientWeather: document.querySelector('#ambientWeather'),
  ambientHint: document.querySelector('#ambientHint'),
  nudgeText: document.querySelector('#nudgeText'),
  recipeCount: document.querySelector('#recipeCount'),
  mealTitle: document.querySelector('#mealTitle'),
  todayPicks: document.querySelector('#todayPicks'),
  kitchenJournal: document.querySelector('#kitchenJournal'),
  selectedCount: document.querySelector('#selectedCount'),
  surpriseButton: document.querySelector('#surpriseButton'),
  tomoHero: document.querySelector('.tomo-hero'),
  specialRows: document.querySelector('#specialRows'),
  factBanter: document.querySelector('#factBanter'),
  recipeNotice: document.querySelector('#recipeNotice'),
  ingredientChips: document.querySelector('#ingredientChips'),
  ingredientResults: document.querySelector('#ingredientResults'),
  ingredientSearch: document.querySelector('#ingredientSearch'),
  pantryTomoMessage: document.querySelector('#pantryTomoMessage'),
  selectedIngredientTray: document.querySelector('#selectedIngredientTray'),
  findDishes: document.querySelector('#findDishes'),
  clearIngredients: document.querySelector('#clearIngredients'),
  recipeDialog: document.querySelector('#recipeDialog'),
  recipeDetail: document.querySelector('#recipeDetail'),
  closeRecipe: document.querySelector('#closeRecipe'),
  groceryDialog: document.querySelector('#groceryDialog'),
  groceryButton: document.querySelector('#groceryButton'),
  searchButton: document.querySelector('#searchButton'),
  searchDialog: document.querySelector('#searchDialog'),
  closeSearch: document.querySelector('#closeSearch'),
  globalSearchInput: document.querySelector('#globalSearchInput'),
  globalSearchResults: document.querySelector('#globalSearchResults'),
  pantryDialog: document.querySelector('#pantryDialog'),
  pantryNavButton: document.querySelector('#pantryNavButton'),
  journalDialog: document.querySelector('#journalDialog'),
  journalDetail: document.querySelector('#journalDetail'),
  closeJournal: document.querySelector('#closeJournal'),
  closePantry: document.querySelector('#closePantry'),
  closeGrocery: document.querySelector('#closeGrocery'),
  clearPurchased: document.querySelector('#clearPurchased'),
  groceryForm: document.querySelector('#groceryForm'),
  groceryList: document.querySelector('#groceryList'),
  groceryBadge: document.querySelector('#groceryBadge'),
  toast: document.querySelector('#toast')
};

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove('hidden');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.add('hidden'), 2400);
}

function localPath(path) {
  if (!path || !path.startsWith('/')) return path;
  return window.location.protocol === 'file:' ? path.slice(1) : path;
}

async function api(path, options = {}) {
  if (path === '/api/recipes' && Array.isArray(window.COOKBUDDY_LOCAL_RECIPES)) {
    return { recipes: window.COOKBUDDY_LOCAL_RECIPES, source: 'local-file' };
  }
  if (path === '/api/collections' && window.COOKBUDDY_LOCAL_COLLECTIONS) {
    return window.COOKBUDDY_LOCAL_COLLECTIONS;
  }
  const localCollectionMatch = path.match(/^\/api\/collections\/([^/]+)$/);
  if (localCollectionMatch && window.COOKBUDDY_LOCAL_COLLECTIONS) {
    const key = decodeURIComponent(localCollectionMatch[1]);
    const collection = (window.COOKBUDDY_LOCAL_COLLECTIONS.collections || []).find((item) => item.key === key || item.id === key);
    if (!collection) throw new Error('Collection not found.');
    return buildCollectionDetailFromSummary(collection);
  }
  if (window.location.protocol === 'file:') {
    if (path === '/api/recipes') return { recipes: window.COOKBUDDY_LOCAL_RECIPES || [], source: 'local-file' };
    if (path === '/api/collections') return window.COOKBUDDY_LOCAL_COLLECTIONS || { collections: [] };
    const collectionMatch = path.match(/^\/api\/collections\/([^/]+)$/);
    if (collectionMatch) {
      const key = decodeURIComponent(collectionMatch[1]);
      const collection = (window.COOKBUDDY_LOCAL_COLLECTIONS?.collections || []).find((item) => item.key === key || item.id === key);
      if (!collection) throw new Error('Collection not found.');
      return buildCollectionDetailFromSummary(collection);
    }
    throw new Error('This action needs the local web server.');
  }
  const response = await fetch(path, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

function persistUserInteractions() {
  localStorage.setItem('cookbuddy_recipe_interactions', JSON.stringify(state.userInteractions));
}

function interactionForRecipe(recipeId) {
  if (!state.userInteractions || Array.isArray(state.userInteractions)) state.userInteractions = {};
  return state.userInteractions[recipeId] || {
    viewCount: 0,
    saveCount: 0,
    cookCount: 0,
    lastViewedAt: null,
    lastSavedAt: null,
    lastCookedAt: null
  };
}

function userPreferenceScore(recipe) {
  const interaction = interactionForRecipe(recipe.id);
  return (Number(interaction.viewCount || 0) * 1)
    + (Number(interaction.saveCount || 0) * 3)
    + (Number(interaction.cookCount || 0) * 5);
}

function recordRecipeInteraction(recipe, action) {
  if (!recipe || !recipe.id || !['view', 'save', 'cook'].includes(action)) return;
  const now = new Date().toISOString();
  const current = interactionForRecipe(recipe.id);
  const next = {
    ...current,
    viewCount: Number(current.viewCount || 0) + (action === 'view' ? 1 : 0),
    saveCount: Number(current.saveCount || 0) + (action === 'save' ? 1 : 0),
    cookCount: Number(current.cookCount || 0) + (action === 'cook' ? 1 : 0),
    lastViewedAt: action === 'view' ? now : current.lastViewedAt,
    lastSavedAt: action === 'save' ? now : current.lastSavedAt,
    lastCookedAt: action === 'cook' ? now : current.lastCookedAt,
    updatedAt: now
  };
  state.userInteractions[recipe.id] = next;
  persistUserInteractions();
  api('/api/interactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeId: recipe.id, action })
  }).catch(() => {
    // The local prototype learns in localStorage when no user session is active.
  });
}

async function loadUserInteractions() {
  try {
    const data = await api('/api/interactions');
    state.userInteractions = Object.fromEntries((data.interactions || []).map((item) => [item.recipeId, item]));
    persistUserInteractions();
  } catch {
    // Local prototype keeps interaction learning in localStorage.
  }
}

function recipeEmoji(recipe) {
  const text = `${recipe.title} ${(recipe.tags || []).join(' ')}`.toLowerCase();
  if (text.includes('idli')) return '🍚';
  if (text.includes('dosa')) return '🫓';
  if (text.includes('chicken')) return '🍗';
  if (text.includes('egg')) return '🥚';
  if (text.includes('paneer')) return '🧀';
  if (text.includes('rice') || text.includes('biryani')) return '🍛';
  if (text.includes('chai')) return '☕';
  if (text.includes('snack') || text.includes('pakora') || text.includes('bonda')) return '☕';
  if (text.includes('curry')) return '🥘';
  if (text.includes('paratha') || text.includes('chilla')) return '🥞';
  if (text.includes('apple') || text.includes('banana')) return '🍌';
  return '🍲';
}

const visualMatchers = [
  ['andhra podi idli', 'dishes/idli', 'andhra podi idli'],
  ['spicy masala dosa', 'dishes/dosa', 'spicy masala dosa'],
  ['spicy aloo paratha', 'dishes/aloo-paratha', 'spicy aloo paratha'],
  ['dosa', 'dosa', 'dosa'],
  ['idli', 'idli', 'idli'],
  ['upma', 'upma', 'upma'],
  ['khichdi', 'khichdi', 'khichdi'],
  ['aloo paratha', 'paratha', 'aloo paratha'],
  ['paratha', 'paratha', 'paratha'],
  ['chai', 'chai', 'chai'],
  ['pakora', 'pakora', 'pakora'],
  ['pongal', 'pongal', 'pongal'],
  ['lemon rice', 'lemon-rice', 'lemon rice'],
  ['poha', 'poha', 'poha'],
  ['biryani', 'biryani', 'biryani'],
  ['rajma', 'rajma-rice', 'rajma rice'],
  ['rasam rice', 'rasam-rice', 'rasam rice'],
  ['omelette', 'bread-omelette', 'bread omelette'],
  ['egg', 'bread-omelette', 'egg'],
  ['chicken curry', 'chicken-curry', 'chicken curry'],
  ['chicken', 'chicken-curry', 'chicken'],
  ['fish', 'fish-curry', 'fish'],
  ['curd rice', 'curd-rice-homestyle', 'curd rice'],
  ['rice moong khichdi', 'rice-moong-khichdi-homestyle', 'rice moong khichdi'],
  ['khichdi', 'rice-moong-khichdi-homestyle', 'khichdi'],
  ['ragi porridge', 'ragi-porridge-homestyle', 'ragi porridge'],
  ['suji porridge', 'suji-porridge-homestyle', 'suji porridge'],
  ['oats porridge', 'oats-porridge-homestyle', 'oats porridge']
];

const assetMatchers = [
  ['chicken 65', 'snacks/chicken-65'], ['mirchi bajji', 'snacks/mirchi-bajji'], ['pakora', 'snacks/pakora'],
  ['samosa', 'snacks/samosa'], ['vada pav', 'snacks/vada-pav'], ['sandwich', 'snacks/sandwich'],
  ['momos', 'snacks/momos'], ['bhel puri', 'snacks/bhel-puri'], ['pav bhaji', 'snacks/pav-bhaji'],
  ['bread pakora', 'snacks/bread-pakora'], ['chai', 'drinks/chai'], ['coffee', 'drinks/filter-coffee'],
  ['badam milk', 'drinks/badam-milk'], ['lassi', 'drinks/lassi'], ['rose milk', 'drinks/rose-milk'],
  ['buttermilk', 'drinks/buttermilk'], ['juice', 'drinks/fresh-juice'], ['gulab jamun', 'desserts/gulab-jamun'],
  ['kheer', 'desserts/kheer'], ['payasam', 'desserts/payasam'], ['rasmalai', 'desserts/rasmalai'],
  ['halwa', 'desserts/halwa'], ['ladoo', 'desserts/laddoo'], ['laddu', 'desserts/laddoo'],
  ['jalebi', 'desserts/jalebi'], ['sweet pongal', 'desserts/sweet-pongal'], ['pongal', 'dishes/pongal'],
  ['kachumber', 'salads/kachumber-salad'], ['kosambari', 'salads/carrot-kosambari'],
  ['sprout', 'salads/sprouts-bowl'], ['cucumber', 'salads/cucumber-salad'], ['fruit bowl', 'salads/fruit-bowl'],
  ['paneer salad', 'salads/paneer-salad'], ['dosa', 'dishes/dosa'], ['idli', 'dishes/idli'],
  ['poha', 'dishes/poha'], ['upma', 'dishes/upma'], ['appam', 'dishes/appam'], ['aloo paratha', 'dishes/aloo-paratha'],
  ['paratha', 'dishes/paratha'], ['bread omelette', 'dishes/bread-omelette'], ['pesarattu', 'dishes/pesarattu'],
  ['puttu', 'dishes/puttu'], ['rajma', 'dishes/rajma-chawal'], ['sambar rice', 'dishes/sambar-rice'],
  ['lemon rice', 'dishes/lemon-rice'], ['rice moong khichdi', 'dishes/rice-moong-khichdi-homestyle'], ['khichdi', 'dishes/rice-moong-khichdi-homestyle'], ['ragi porridge', 'dishes/ragi-porridge-homestyle'], ['suji porridge', 'dishes/suji-porridge-homestyle'], ['oats porridge', 'dishes/oats-porridge-homestyle'], ['fish curry', 'dishes/fish-curry-rice'],
  ['chicken curry', 'dishes/chicken-curry-rice'], ['curd rice', 'dishes/curd-rice-homestyle'], ['dal rice', 'dishes/dal-rice'],
  ['bisibelebath', 'dishes/bisibelebath'], ['pulao', 'dishes/pulao'], ['egg curry', 'dishes/egg-curry'],
  ['paneer curry', 'dishes/paneer-curry'], ['rasam rice', 'dishes/rasam-rice'], ['veg kurma', 'dishes/veg-kurma'],
  ['noodles', 'dishes/noodles'], ['soup', 'dishes/soup-bowls'], ['fish stew', 'dishes/fish-stew'],
  ['biryani', 'dishes/biryani'], ['chicken', 'dishes/chicken-curry'], ['fish', 'dishes/fish-curry']
];

const ingredientAssetAliases = {
  rice: 'rice', wheat: 'wheat', poha: 'poha', oats: 'oats', ragi: 'millet', millet: 'millet',
  onion: 'onion', tomato: 'tomato', potato: 'potato', spinach: 'spinach', carrot: 'carrot',
  brinjal: 'brinjal', egg: 'egg', paneer: 'paneer', chicken: 'chicken', fish: 'fish',
  dal: 'dal', 'toor dal': 'dal', 'moong dal': 'dal', 'urad dal': 'dal', chickpea: 'chickpea',
  chana: 'chickpea', rajma: 'chickpea', chilli: 'chilli', 'red chilli': 'chilli',
  'green chilli': 'chilli', turmeric: 'turmeric', pepper: 'pepper', 'black pepper': 'pepper',
  'curry leaves': 'curry-leaves', ghee: 'turmeric', besan: 'chickpea',
  rava: 'wheat', maida: 'wheat', 'rice flour': 'rice', 'idli rice': 'rice',
  'whole wheat': 'wheat', sabudana: 'rice', millets: 'millet',
  capsicum: 'carrot', mushroom: 'brinjal', methi: 'spinach', palak: 'spinach',
  corn: 'carrot', drumstick: 'brinjal', gobi: 'carrot', cauliflower: 'carrot',
  beans: 'carrot', 'ivy gourd': 'brinjal', tindora: 'brinjal', vegetables: 'carrot'
};

const commonPlaceholderImage = '/assets/images/dishes/common-kitchen-placeholder.png';

function categoryFallback() {
  return localPath(commonPlaceholderImage);
}

function isDefaultDishImage(path) {
  return /\/assets\/images\/(?:dishes\/(?:breakfast|lunch|dinner)-default|snacks\/snacks-default)\.png/i.test(String(path || ''));
}

function recipeImagePath(recipe) {
  const exactTitle = String(recipe.title || '').toLowerCase().trim();
  const exactImageMap = {
    'aloo paratha': 'dishes/aloo-paratha-homestyle',
    'spicy aloo paratha': 'dishes/aloo-paratha-homestyle',
    'andhra podi idli': 'dishes/idli-homestyle',
    avalakki: 'dishes/avalakki-homestyle',
    'besan chilla': 'dishes/besan-chilla-homestyle',
    'bread omelette': 'dishes/bread-omelette-homestyle',
    dosa: 'dishes/dosa-homestyle',
    'spicy masala dosa': 'dishes/dosa-homestyle',
    idli: 'dishes/idli-homestyle',
    'paneer paratha': 'dishes/paneer-paratha-homestyle',
    poha: 'dishes/poha-homestyle',
    pongal: 'dishes/pongal',
    'ragi porridge': 'dishes/ragi-porridge-homestyle',
    'soft idli': 'dishes/idli-homestyle',
    upma: 'dishes/upma',
    'andhra chicken curry': 'dishes/andhra-chicken-curry-homestyle',
    bisibelebath: 'dishes/bisibelebath',
    'butter chicken': 'dishes/butter-chicken-homestyle',
    'chicken chettinad': 'dishes/chicken-chettinad-homestyle',
    'chicken sukka': 'dishes/chicken-sukka-homestyle',
    'curd rice': 'dishes/curd-rice-homestyle',
    'dal makhani': 'dishes/dal-makhani-homestyle',
    'dal rice': 'dishes/dal-rice',
    'egg curry rice': 'dishes/egg-curry',
    'fish curry rice': 'dishes/fish-curry-rice',
    khichdi: 'dishes/rice-moong-khichdi-homestyle',
    'lemon rice': 'dishes/lemon-rice',
    'palak paneer': 'dishes/paneer-curry',
    'paneer tikka masala': 'dishes/paneer-tikka-masala-homestyle',
    'rajma chawal': 'dishes/rajma-chawal',
    'rasam rice': 'dishes/rasam-rice',
    'sambar rice': 'dishes/sambar-rice',
    'kerala fish curry': 'dishes/fish-curry-rice',
    'apple puree': 'dishes/homestyle-kitchen-placeholder',
    'boiled corn': 'dishes/homestyle-kitchen-placeholder',
    chaat: 'dishes/homestyle-kitchen-placeholder',
    'chicken roll': 'dishes/homestyle-kitchen-placeholder',
    'chicken stew': 'dishes/homestyle-kitchen-placeholder',
    'chole chawal': 'dishes/homestyle-kitchen-placeholder',
    'dal roti': 'dishes/homestyle-kitchen-placeholder',
    'egg fried rice': 'dishes/homestyle-kitchen-placeholder',
    'gongura mutton': 'dishes/homestyle-kitchen-placeholder',
    gujiya: 'dishes/homestyle-kitchen-placeholder',
    'guntur chilli chicken': 'dishes/homestyle-kitchen-placeholder',
    kachori: 'dishes/homestyle-kitchen-placeholder',
    'kada prasad': 'dishes/homestyle-kitchen-placeholder',
    'kadhi chawal': 'dishes/homestyle-kitchen-placeholder',
    'keema fry': 'dishes/homestyle-kitchen-placeholder',
    'kolhapuri chicken': 'dishes/homestyle-kitchen-placeholder',
    'laal maas': 'dishes/homestyle-kitchen-placeholder',
    'madras curry': 'dishes/homestyle-kitchen-placeholder',
    'mashed banana': 'dishes/homestyle-kitchen-placeholder',
    mathri: 'dishes/homestyle-kitchen-placeholder',
    'mirchi ka salan': 'dishes/homestyle-kitchen-placeholder',
    modak: 'dishes/homestyle-kitchen-placeholder',
    momos: 'dishes/homestyle-kitchen-placeholder',
    'nattu kozhi curry': 'dishes/homestyle-kitchen-placeholder',
    'pepper rasam': 'dishes/homestyle-kitchen-placeholder',
    pitha: 'dishes/homestyle-kitchen-placeholder',
    'plum cake': 'dishes/homestyle-kitchen-placeholder',
    'prawn ghee roast': 'dishes/homestyle-kitchen-placeholder',
    'rice cakes': 'dishes/homestyle-kitchen-placeholder',
    'rice porridge': 'dishes/homestyle-kitchen-placeholder',
    'schezwan fried rice': 'dishes/homestyle-kitchen-placeholder',
    'smoked pork rice': 'dishes/homestyle-kitchen-placeholder',
    'sticky rice': 'dishes/homestyle-kitchen-placeholder',
    sundal: 'dishes/homestyle-kitchen-placeholder',
    thukpa: 'dishes/homestyle-kitchen-placeholder',
    'vegetable puree': 'dishes/homestyle-kitchen-placeholder'
  };
  if (exactImageMap[exactTitle]) return localPath(`/assets/images/${exactImageMap[exactTitle]}.png`);
  if (exactTitle === 'khichdi') return localPath('/assets/images/dishes/rice-moong-khichdi-homestyle.png');
  const text = `${recipe.title} ${recipe.description} ${(recipe.tags || []).join(' ')}`.toLowerCase();
  const homestyleMatch = [
    ['aloo paratha', 'dishes/aloo-paratha-homestyle'],
    ['avalakki', 'dishes/avalakki-homestyle'],
    ['besan chilla', 'dishes/besan-chilla-homestyle'],
    ['bread omelette', 'dishes/bread-omelette-homestyle'],
    ['paneer paratha', 'dishes/paneer-paratha-homestyle'],
    ['dosa', 'dishes/dosa-homestyle'],
    ['idli', 'dishes/idli-homestyle'],
    ['poha', 'dishes/poha-homestyle'],
    ['rice moong khichdi', 'dishes/rice-moong-khichdi-homestyle'],
    ['ragi porridge', 'dishes/ragi-porridge-homestyle'],
    ['suji porridge', 'dishes/suji-porridge-homestyle'],
    ['oats porridge', 'dishes/oats-porridge-homestyle'],
    ['curd rice', 'dishes/curd-rice-homestyle']
  ].find(([term]) => text.includes(term));
  if (homestyleMatch) return localPath(`/assets/images/${homestyleMatch[1]}.png`);
  if (isDefaultDishImage(recipe.imageUrl)) return categoryFallback(recipe);
  if (recipe.imageUrl && recipe.imageUrl.startsWith('/assets/')) return localPath(recipe.imageUrl);
  const match = assetMatchers.find(([term]) => text.includes(term));
  return match ? localPath(`/assets/images/${match[1]}.png`) : categoryFallback(recipe);
}

function recipeVisual(recipe) {
  const fallback = categoryFallback(recipe);
  const imagePath = recipeImagePath(recipe);
  const placeholderClass = imagePath.includes('homestyle-kitchen-placeholder') || imagePath.includes('common-kitchen-placeholder') ? ' kitchen-placeholder-image' : '';
  return `<img class="food-image${placeholderClass}" src="${imagePath}" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

function ingredientImagePath(name) {
  const normalized = String(name).toLowerCase().replace(/[-_]/g, ' ').trim();
  const slug = ingredientAssetAliases[normalized] || ingredientAssetAliases[normalized.replace(/\s+/g, '-')] || 'rice';
  return localPath(`/assets/images/ingredients/${slug}.png`);
}

function moodPill(recipe) {
  const tags = recipe.tags || [];
  const options = [
    ['comfort', 'Comfort'],
    ['quick', 'Quick'],
    ['rainy-day', 'Rainy Day'],
    ['soul-food', 'Soul Food'],
    ['festival', 'Festival']
  ];
  if (hasHighProteinCore(recipe)) return 'High Protein';
  const found = options.find(([tag]) => tags.includes(tag));
  return found ? found[1] : recipe.difficulty || 'Home-style';
}

function recipeMatchesMeal(recipe, meal) {
  const tags = recipe.tags || [];
  return tags.includes(meal) || (meal === 'snack' && tags.includes('snacks'));
}

function normalizedMealType(value) {
  const normalized = normalizeIngredientName(value);
  if (normalized === 'snacks') return 'snack';
  return normalized;
}

function recipeDeclaredMealTypes(recipe) {
  const declared = String(recipe.mealType || recipe.meal_type || '')
    .split(',')
    .map(normalizedMealType)
    .filter(Boolean);
  const fromTags = ['breakfast', 'lunch', 'dinner', 'snack']
    .filter((meal) => recipeMatchesMeal(recipe, meal));
  return [...new Set([...declared, ...fromTags])];
}

function currentTimeMealType() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  if (hour >= 16 && hour < 18) return 'snack';
  return 'dinner';
}

function displayedMealTypeForMood(recipe) {
  const mealTypes = recipeDeclaredMealTypes(recipe);
  if (!mealTypes.length) return 'unknown';
  const current = currentTimeMealType();
  return mealTypes.includes(current) ? current : mealTypes[0];
}

function recipeMatchesMealForMoodView(recipe, meal) {
  if (!activeMood()) return recipeMatchesMeal(recipe, meal);
  return displayedMealTypeForMood(recipe) === meal;
}

function hasHighProteinCore(recipe) {
  const titleText = String(recipe.title || '').toLowerCase();
  const ingredientText = [
    ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || ''),
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2
  ].filter(Boolean).join(' ').toLowerCase();
  const combined = `${titleText} ${ingredientText}`;
  const obviousProtein = /\b(chicken|egg|fish|mutton|prawn|pork|keema|kheema|paneer|rajma|chole|chana|chickpea|sprout|sprouts|besan|sattu|soya|soy)\b/;
  if (obviousProtein.test(combined)) return true;

  const dalForwardDish = /\b(dal|lentil)\b/.test(titleText)
    || /\b(toor dal|moong dal|urad dal|masoor dal|chana dal)\b/.test(ingredientText);
  const grainForwardException = /\b(idli|dosa|pongal|khichdi|porridge|upma|poha|rice)\b/.test(titleText);
  return dalForwardDish && !grainForwardException;
}

const MoodTier = Object.freeze({
  CORE: 'CORE',
  SUPPORT: 'SUPPORT',
  FALLBACK: 'FALLBACK',
  EXCLUDE: 'EXCLUDE'
});

const moodTierBoosts = {
  [MoodTier.CORE]: 40,
  [MoodTier.SUPPORT]: 15,
  [MoodTier.FALLBACK]: 0,
  [MoodTier.EXCLUDE]: -999
};

const moodTierOrder = {
  [MoodTier.CORE]: 3,
  [MoodTier.SUPPORT]: 2,
  [MoodTier.FALLBACK]: 1,
  [MoodTier.EXCLUDE]: 0
};

const moodFeedRules = {
  maxResults: 20,
  supportQualityThreshold: 65,
  largeDatabaseThreshold: 300,
  contentGapThreshold: 10
};

const moodSignatureTerms = {
  comfort: [
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
  ],
  soul: [
    'curd rice',
    'dal rice',
    'rasam rice',
    'idli',
    'soft idli',
    'pongal',
    'khichdi',
    'rice porridge',
  ],
  rainy: [
    'masala chai',
    'pakora',
    'bread pakora',
    'fish pakora',
    'paneer pakora',
    'mirchi bajji',
    'mirapakaya bajji',
    'bonda',
    'pepper rasam',
    'mushroom soup',
    'corn soup',
    'khichdi',
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
    'pepper rasam'
  ],
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
    'pork curry'
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
    'upma'
  ]
};

const moodCoreTitles = Object.fromEntries(
  Object.entries(moodSignatureTerms).map(([mood, titles]) => [mood, new Set(titles)])
);

const moodSupportTitles = {
  comfort: new Set([
    'idli',
    'soft idli',
    'oats porridge',
    'ragi porridge',
    'rice porridge',
    'andhra podi idli',
    'sweet pongal',
    'sabudana khichdi'
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
    'upma'
  ])
};

const moodSupportTerms = {
  comfort: ['paratha', 'porridge', 'rice', 'dal', 'curry', 'soup', 'puree'],
  soul: ['idli', 'dosa', 'pongal', 'khichdi', 'rice', 'paratha', 'porridge', 'poha', 'avalakki', 'upma', 'kheer'],
  protein: ['chicken', 'egg', 'fish', 'mutton', 'prawn', 'pork', 'paneer', 'rajma', 'chole', 'chana', 'besan', 'sattu', 'dal', 'sprout', 'peanut'],
  quick: ['sandwich', 'toast', 'chaat', 'upma', 'poha', 'sevai', 'rice', 'sundal'],
  spicy: ['spicy', 'chilli', 'chili', 'mirchi', 'pepper', 'podi', 'chettinad', 'kolhapuri', 'schezwan', 'laal', 'salan', 'guntur', 'madras', 'kaaram', 'andhra', 'dragon', '555'],
  rainy: ['pakora', 'bajji', 'bonda', 'chai', 'rasam', 'soup', 'khichdi', 'pongal', 'kashaya']
};

const complexQuickTerms = ['biryani', 'chettinad', 'butter chicken', 'laal maas', 'mutton', 'ghee roast', 'salan', 'sukka', 'nattu kozhi', 'kolhapuri', 'madras curry', 'kerala fish curry', 'fish curry', 'chicken curry'];
const restaurantLeanTerms = ['dragon', 'schezwan', 'chilli paneer', 'chicken 65', 'chicken 555', 'majestic', 'tikka', 'fried rice', 'roll'];

function moodKeyFromLabel(label) {
  const normalized = String(label || '').toLowerCase().replace(/[-_]/g, ' ').trim();
  return Object.entries(moodLabels).find(([, value]) => String(value).toLowerCase() === normalized)?.[0] || '';
}

function normalizedRecipeTags(recipe) {
  return (recipe.tags || []).map((tag) => String(tag).toLowerCase().trim());
}

function normalizedRecipeText(recipe) {
  return [
    recipe.title,
    recipe.description,
    recipe.cuisine,
    recipe.dietType,
    recipe.spiceLevel,
    recipe.primaryMood,
    recipe.secondaryMood,
    ...(recipe.tags || []),
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2,
    recipe.secondaryIngredient1,
    recipe.secondaryIngredient2,
    recipe.secondaryIngredient3,
    recipe.secondaryIngredient4,
    recipe.secondaryIngredient5,
    ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || '')
  ].filter(Boolean).join(' ').toLowerCase().replace(/[-_]/g, ' ');
}

function titleText(recipe) {
  return String(recipe.title || '').toLowerCase().replace(/[-_]/g, ' ').trim();
}

function textHasAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function signatureIndex(recipe, mood) {
  const title = titleText(recipe);
  return (moodSignatureTerms[mood] || []).findIndex((term) => title === term);
}

function recipeHasMoodMembership(recipe, mood) {
  const primary = moodKeyFromLabel(recipe.primaryMood);
  const secondary = moodKeyFromLabel(recipe.secondaryMood);
  return primary === mood || secondary === mood;
}

function isRestaurantLeanRecipe(recipe) {
  return textHasAny(normalizedRecipeText(recipe), restaurantLeanTerms);
}

function isComplexQuickRecipe(recipe) {
  return textHasAny(titleText(recipe), complexQuickTerms)
    || recipeTotalTime(recipe) > 35
    || Number(recipe.effortScore || 5) >= 8;
}

function recipeTotalTime(recipe) {
  return Number(recipe.timeMinutes || 0) || Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
}

function recipeMoodTier(recipe, mood = activeMood()) {
  if (!mood) return MoodTier.SUPPORT;
  const tags = normalizedRecipeTags(recipe);
  const text = normalizedRecipeText(recipe);
  const title = titleText(recipe);
  const time = recipeTotalTime(recipe);
  const comfort = Number(recipe.comfortScore || 0);
  const protein = Number(recipe.proteinScore || 0);
  const rainy = Number(recipe.rainyDayScore || 0);
  const nostalgia = Number(recipe.nostalgiaScore || 0);
  const home = Number(recipe.homeStyleScore || 0);
  const effort = Number(recipe.effortScore || 5);
  const inMood = recipeHasMoodMembership(recipe, mood);
  const signature = signatureIndex(recipe, mood) >= 0;
  if (moodCoreTitles[mood]?.has(title)) return MoodTier.CORE;
  if (moodSupportTitles[mood]?.has(title)) return MoodTier.SUPPORT;
  const support = textHasAny(title, moodSupportTerms[mood] || []) || textHasAny(text, moodSupportTerms[mood] || []);

  if (mood === 'comfort') {
    if ((inMood || support) && comfort >= 7 && home >= 7 && !isRestaurantLeanRecipe(recipe)) return MoodTier.SUPPORT;
    if (comfort >= 6 || home >= 8) return MoodTier.FALLBACK;
    return MoodTier.EXCLUDE;
  }

  if (mood === 'soul') {
    if ((inMood || support) && nostalgia >= 7 && home >= 7 && !isRestaurantLeanRecipe(recipe)) return MoodTier.SUPPORT;
    if (nostalgia >= 6 && home >= 6) return MoodTier.FALLBACK;
    return MoodTier.EXCLUDE;
  }

  if (mood === 'protein') {
    if (protein >= 6 && hasHighProteinCore(recipe)) return MoodTier.SUPPORT;
    if (protein >= 5 && support) return MoodTier.FALLBACK;
    return MoodTier.EXCLUDE;
  }

  if (mood === 'quick') {
    if (isComplexQuickRecipe(recipe)) return MoodTier.EXCLUDE;
    if (time <= 25 && effort <= 5) return MoodTier.SUPPORT;
    if (time <= 35 && effort <= 6) return MoodTier.FALLBACK;
    return MoodTier.EXCLUDE;
  }

  if (mood === 'spicy') {
    const spicyIdentity = tags.includes('spicy-food') || tags.includes('spicy') || support;
    if (spicyIdentity) return MoodTier.SUPPORT;
    if (textHasAny(text, ['green chilli', 'red chilli', 'black pepper'])) return MoodTier.FALLBACK;
    return MoodTier.EXCLUDE;
  }

  if (mood === 'rainy') {
    const rainyIdentity = tags.includes('rainy-day') || tags.includes('monsoon-favorite') || support;
    if ((rainyIdentity && rainy >= 7) || (rainy >= 8 && support)) return MoodTier.SUPPORT;
    if (rainy >= 6 && comfort >= 7) return MoodTier.FALLBACK;
    return MoodTier.EXCLUDE;
  }

  return MoodTier.EXCLUDE;
}

function recipeMatchesMood(recipe, mood = activeMood()) {
  return moodTierOrder[recipeMoodTier(recipe, mood)] >= moodTierOrder[MoodTier.SUPPORT];
}

function emotionalMoodScore(recipe, mood = activeMood()) {
  if (!mood) return 0;
  const scores = {
    comfort: recipe.comfortScore,
    rainy: recipe.rainyDayScore,
    protein: recipe.proteinScore,
    soul: recipe.soulFoodScore || recipe.nostalgiaScore,
    spicy: normalizedRecipeTags(recipe).includes('spicy-food') ? 10 : 0
  };
  return Number(scores[mood] || 0);
}

function moodLensScore(recipe, mood = activeMood()) {
  if (!mood) return 0;
  const totalTime = recipeTotalTime(recipe);
  const tags = normalizedRecipeTags(recipe);
  const text = normalizedRecipeText(recipe);
  if (mood === 'comfort') return Number(recipe.comfortScore || 0) * 10 + Number(recipe.homeStyleScore || 0) * 3 + (recipeMatchesMood(recipe, mood) ? 18 : 0);
  if (mood === 'soul') return Number(recipe.nostalgiaScore || 0) * 8 + Number(recipe.homeStyleScore || 0) * 5 + Number(recipe.comfortScore || 0) * 3 + (tags.includes('soul-food') ? 20 : 0);
  if (mood === 'protein') return hasHighProteinCore(recipe) ? Number(recipe.proteinScore || 0) * 12 + (tags.includes('high-protein') || tags.includes('protein-rich') ? 16 : 0) : Number(recipe.proteinScore || 0);
  if (mood === 'quick') return Math.max(0, 60 - totalTime) + (tags.includes('quick') || tags.includes('quick-meal') ? 24 : 0) + Math.max(0, 10 - Number(recipe.effortScore || 5)) * 4;
  if (mood === 'spicy') return (tags.includes('spicy-food') || tags.includes('spicy') ? 45 : 0) + (/\b(chilli|chili|mirchi|pepper|podi|chettinad|kolhapuri|schezwan|laal|salan|guntur|madras)\b/.test(text) ? 35 : 0) + Number(recipe.comfortScore || 0);
  if (mood === 'rainy') return Number(recipe.rainyDayScore || 0) * 11 + (tags.includes('rainy-day') || tags.includes('monsoon-favorite') ? 22 : 0) + (/\b(pakora|bajji|bonda|chai|rasam|soup|khichdi|pongal)\b/.test(text) ? 20 : 0);
  return 0;
}

function spreadMoodScore(recipe, mood = activeMood()) {
  if (!mood) return 0;
  const tier = recipeMoodTier(recipe, mood);
  if (tier === MoodTier.EXCLUDE) return 0;
  const raw = moodLensScore(recipe, mood);
  const index = signatureIndex(recipe, mood);
  if (tier === MoodTier.CORE && index >= 0) {
    const signatureBase = Math.max(86, 100 - index * 2);
    const tinySpread = Math.min(1.5, Math.max(0, (Number(recipe.homeStyleScore || 0) + Number(recipe.comfortScore || 0)) / 20));
    return Math.round(Math.min(100, signatureBase + tinySpread) * 10) / 10;
  }
  const tierBase = {
    [MoodTier.CORE]: 86,
    [MoodTier.SUPPORT]: 62,
    [MoodTier.FALLBACK]: 35,
    [MoodTier.EXCLUDE]: 0
  }[tier];
  const tierCeiling = {
    [MoodTier.CORE]: 100,
    [MoodTier.SUPPORT]: 84,
    [MoodTier.FALLBACK]: 59,
    [MoodTier.EXCLUDE]: 0
  }[tier];
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

function moodRankingBreakdown(recipe, mood = activeMood(), options = {}) {
  const tier = recipeMoodTier(recipe, mood);
  const moodScore = spreadMoodScore(recipe, mood);
  const ingredientScore = Math.max(0, Math.min(100, Number(options.ingredientScore || 0)));
  const pantryScore = Math.max(0, Math.min(100, Number(options.pantryScore || 0)));
  const mealTypeScore = Math.max(0, Math.min(100, Number(options.mealTypeScore ?? (recipeMatchesMeal(recipe, state.meal) ? 100 : 0))));
  const tierBoost = moodTierBoosts[tier] ?? 0;
  const weightedScore = (moodScore * 0.70)
    + (ingredientScore * 0.15)
    + (pantryScore * 0.10)
    + (mealTypeScore * 0.05);
  const finalScore = Math.round((tierBoost + weightedScore) * 10) / 10;
  return {
    recipe: recipe.title,
    mood: labelForMood(mood),
    moodTier: tier,
    moodScore,
    ingredientScore,
    pantryScore,
    mealTypeScore,
    tierBoost,
    finalScore,
    rankReason: `${tier} tier, moodScore=${moodScore}, ingredientScore=${ingredientScore}, pantryScore=${pantryScore}`
  };
}

function moodCandidatePool(recipes, mood, allRecipes = state.recipes) {
  if (!mood) return [...recipes];
  const scored = recipes.map((recipe) => {
    const breakdown = moodRankingBreakdown(recipe, mood);
    return { recipe, breakdown };
  });
  const qualityCandidates = scored
    .filter(({ breakdown }) => {
      if (breakdown.moodTier === MoodTier.CORE) return true;
      return breakdown.moodTier === MoodTier.SUPPORT
        && breakdown.finalScore >= moodFeedRules.supportQualityThreshold;
    })
    .map(({ recipe }) => recipe);

  if (allRecipes.length < moodFeedRules.largeDatabaseThreshold || qualityCandidates.length >= moodFeedRules.maxResults) {
    return qualityCandidates;
  }

  const fallbackCandidates = scored
    .filter(({ breakdown }) => breakdown.moodTier === MoodTier.FALLBACK)
    .sort((a, b) => b.breakdown.finalScore - a.breakdown.finalScore)
    .slice(0, moodFeedRules.maxResults - qualityCandidates.length)
    .map(({ recipe }) => recipe);

  return [...qualityCandidates, ...fallbackCandidates];
}

function warnMoodContentGap(mood, count) {
  if (count >= moodFeedRules.contentGapThreshold) return;
  if (!window.COOKBUDDY_DEBUG_MATCHING) return;
  console.warn('[Tomo mood content gap]', {
    mood: labelForMood(mood),
    qualityRecipeCount: count,
    warning: 'Mood feed is showing fewer than 10 quality recipes. Add stronger CORE/SUPPORT recipes instead of padding with weak fallback dishes.'
  });
}

function topMealType(recipe) {
  if (activeMood()) return displayedMealTypeForMood(recipe);
  if (recipeMatchesMeal(recipe, 'breakfast')) return 'breakfast';
  if (recipeMatchesMeal(recipe, 'lunch')) return 'lunch';
  if (recipeMatchesMeal(recipe, 'dinner')) return 'dinner';
  if (recipeMatchesMeal(recipe, 'snack')) return 'snack';
  return 'unknown';
}

function diversityBalancedTop(sorted) {
  const top = sorted.slice(0, 20);
  const mealTypes = new Set(top.map(topMealType).filter((meal) => meal !== 'unknown'));
  if (mealTypes.size <= 1 || top.length < 12) return sorted;
  const caps = { breakfast: 8, lunch: 8, dinner: 6, snacks: 4, unknown: 2 };
  const picked = [];
  const pickedIds = new Set();
  const counts = { breakfast: 0, lunch: 0, dinner: 0, snacks: 0, unknown: 0 };
  for (const recipe of sorted) {
    const meal = topMealType(recipe);
    if ((counts[meal] || 0) >= (caps[meal] || 2) && picked.length < 20) continue;
    picked.push(recipe);
    pickedIds.add(recipe.id);
    counts[meal] = (counts[meal] || 0) + 1;
    if (picked.length >= 20) break;
  }
  for (const recipe of sorted) {
    if (!pickedIds.has(recipe.id)) picked.push(recipe);
  }
  return picked;
}

function sortForMood(recipes) {
  const mood = activeMood();
  if (!mood) return [...recipes];
  const candidates = moodCandidatePool(recipes, mood);
  const sorted = [...candidates].sort((a, b) => {
    const aScore = moodRankingBreakdown(a, mood);
    const bScore = moodRankingBreakdown(b, mood);
    const aRepeatPenalty = mood !== 'comfort' && mood !== 'spicy' && /aloo paratha/i.test(a.title) ? 1 : 0;
    const bRepeatPenalty = mood !== 'comfort' && mood !== 'spicy' && /aloo paratha/i.test(b.title) ? 1 : 0;
    return bScore.finalScore - aScore.finalScore
      || moodTierOrder[bScore.moodTier] - moodTierOrder[aScore.moodTier]
      || bScore.moodScore - aScore.moodScore
      || aRepeatPenalty - bRepeatPenalty
      || userPreferenceScore(b) - userPreferenceScore(a)
      || a.title.localeCompare(b.title);
  });
  const balanced = uniqueRecipeFamilies(diversityBalancedTop(sorted));
  warnMoodContentGap(mood, balanced.length);
  return balanced.slice(0, moodFeedRules.maxResults);
}

function recipeCard(recipe, label = '', options = {}) {
  const button = document.createElement('button');
  button.className = `recipe-card ${options.variant === 'today' ? 'today-card' : ''} ${options.variant === 'mini' ? 'mini-card' : ''}`;
  button.dataset.recipeId = recipe.id;
  const dietClass = recipe.dietType === 'non-vegetarian' ? 'nonveg' : 'veg';
  const dietLabel = recipe.dietType === 'non-vegetarian' ? 'Non-veg' : 'Veg';
  const descriptor = moodPill(recipe);
  const isFavorite = state.favoriteIds.has(recipe.id);
  const isLater = state.laterIds.has(recipe.id);
  const badge = options.badge ? `<span class="card-badge">${options.badge}</span>` : '';
  const context = options.variant === 'today' ? `<span class="recommendation-context">${escapeHtml(recipeTrustContext(recipe))}</span>` : '';
  const actions = options.variant === 'today'
    ? `<span class="card-actions" aria-label="Recipe actions">
        <span class="mini-action ${isFavorite ? 'active' : ''}" data-recipe-action="favorite" data-recipe-id="${recipe.id}" title="Save">${isFavorite ? '♥' : '♡'}</span>
        <span class="mini-action ${isLater ? 'active' : ''}" data-recipe-action="later" data-recipe-id="${recipe.id}" title="Not now">×</span>
        <span class="cook-action" data-recipe-action="cook" data-recipe-id="${recipe.id}">Cook Now</span>
      </span>`
    : '';
  button.innerHTML = `
    ${badge}
    <span class="recipe-icon">${recipeVisual(recipe)}</span>
    <span class="recipe-content">
      <strong>${recipe.title}</strong>
      <span class="recipe-meta">
        <span>${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
        <span>${dietLabel}</span>
        <span class="pill mood-pill ${dietClass}">${descriptor}</span>
      </span>
      ${context}
      ${actions}
    </span>
    <span class="chevron">›</span>
  `;
  return button;
}

function recipeTrustContext(recipe) {
  const totalTime = Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
  if (state.selectedIngredients.size) return '✓ Matches Your Pantry';
  if (state.meal === 'breakfast' && totalTime <= 25) return '✓ Quick Breakfast';
  if (activeMood() && recipeMatchesMood(recipe, activeMood())) return `✓ Matches ${labelForMood(activeMood())}`;
  if (userPreferenceScore(recipe) > 0) return '✓ Your Cooking History';
  return '✓ Popular Tonight';
}

function renderTodayPicks() {
  const mealPool = state.recipes.filter((recipe) => recipeMatchesMealForMoodView(recipe, state.meal));
  const mealMatches = sortForMood(mealPool);
  if (els.recipeNotice && activeMood()) {
    const qualityCount = uniqueRecipeFamilies(moodCandidatePool(state.recipes, activeMood())).length;
    const shouldShowMoodGap = qualityCount > 0 && qualityCount < moodFeedRules.maxResults;
    els.recipeNotice.textContent = shouldShowMoodGap ? getTomoMessage({ context: 'empty_state', reason: 'mood_fewer' }) : '';
    els.recipeNotice.classList.toggle('hidden', !shouldShowMoodGap);
  } else if (els.recipeNotice) {
    els.recipeNotice.textContent = '';
    els.recipeNotice.classList.add('hidden');
  }
  const freshPicks = mealMatches.filter((recipe) => !state.laterIds.has(recipe.id));
  const ordered = uniqueRecipeFamilies([...freshPicks, ...mealMatches.filter((recipe) => state.laterIds.has(recipe.id))]);
  const picks = [];
  const addPick = (recipe) => {
    if (recipe && !picks.some((item) => item.id === recipe.id)) picks.push(recipe);
  };
  if (activeMood()) {
    ordered.forEach(addPick);
  } else {
    addPick(ordered[0]);
    addPick(ordered.find((recipe) => {
      const totalTime = Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
      return (recipe.tags || []).includes('quick') || (recipe.tags || []).includes('quick-meal') || totalTime <= 25;
    }));
    addPick(ordered.find((recipe) => (recipe.tags || []).includes('comfort') || (recipe.tags || []).includes('comfort-food') || Number(recipe.comfortScore || 0) >= 7));
    ordered.forEach(addPick);
  }
  const labels = activeMood()
    ? ['🍅 Tomo Recommends', `✓ ${labelForMood(activeMood())}`, '✨ Also Good']
    : ['🍅 Tomo Recommends', '⚡ Quick', '😊 Comfort'];
  els.todayPicks.innerHTML = '';
  picks.slice(0, 3).forEach((recipe, index) => {
    els.todayPicks.appendChild(recipeCard(recipe, '', { variant: 'today', badge: labels[index] }));
  });
  if (!picks.length) {
    els.todayPicks.innerHTML = '<p class="notice">No recipes found for this meal yet.</p>';
  }
}

function formatJournalRelativeDate(value) {
  const cooked = new Date(value);
  const now = new Date();
  const diffDays = Math.max(0, Math.floor((now - cooked) / 86400000));
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  return `${diffDays} days ago`;
}

function journalWeekEntries() {
  const weekAgo = Date.now() - 7 * 86400000;
  return [...state.cookingHistory]
    .filter((entry) => new Date(entry.cookedAt).getTime() >= weekAgo)
    .sort((a, b) => new Date(b.cookedAt) - new Date(a.cookedAt));
}

function journalIcon(title) {
  const text = String(title || '').toLowerCase();
  if (text.includes('egg')) return '🥚';
  if (text.includes('pongal') || text.includes('soup')) return '🍲';
  if (text.includes('rice') || text.includes('pulao') || text.includes('biryani')) return '🍛';
  if (text.includes('chai') || text.includes('drink')) return '☕';
  return '🥣';
}

function journalInsight(entries) {
  if (!entries.length) return 'Start with a Tomo recommendation today.';
  const comfortCount = entries.filter((entry) => /comfort|pongal|khichdi|rice|soup/i.test(`${entry.recipeName} ${(entry.tags || []).join(' ')}`)).length;
  if (comfortCount >= 3) return `🍅 You’ve cooked ${comfortCount} comforting meals this week.`;
  const quickCount = entries.filter((entry) => /quick|easy|bhurji|upma/i.test(`${entry.recipeName} ${(entry.tags || []).join(' ')}`)).length;
  if (quickCount >= 2) return '🍅 You seem to enjoy quick meals lately.';
  return `🍅 ${entries.length} dishes cooked this week.`;
}

function renderKitchenJournal() {
  if (!els.kitchenJournal) return;
  const entries = journalWeekEntries();
  if (!entries.length) {
    els.kitchenJournal.innerHTML = [
      '<div class="journal-card-head"><span>📖</span><div><h2>Tomo Journal</h2><p>A record of your cooking journey.</p></div></div>',
      '<div class="journal-empty-copy"><strong>You haven\'t cooked anything yet.</strong><span>Start with a Tomo recommendation today.</span></div>',
      '<button class="journal-primary" data-journal-action="explore" type="button">Explore Dishes</button>'
    ].join('');
    return;
  }
  const recent = entries.slice(0, 3);
  els.kitchenJournal.innerHTML = [
    '<div class="journal-card-head"><span>📖</span><div><h2>Tomo Journal</h2><p>This Week</p></div></div>',
    `<div class="journal-mini-list">${recent.map((entry) => `<article><span>${journalIcon(entry.recipeName)}</span><strong>${entry.recipeName}</strong><small>${formatJournalRelativeDate(entry.cookedAt)}</small></article>`).join('')}</div>`,
    `<div class="journal-footer"><span>${entries.length} ${entries.length === 1 ? 'dish' : 'dishes'} cooked this week</span><button class="journal-link" data-journal-action="open" type="button">View Full Journal</button></div>`
  ].join('');
}

function recordCookedRecipe(recipe) {
  recordRecipeInteraction(recipe, 'cook');
  const entry = {
    id: `${recipe.id}-${Date.now()}`,
    userId: 'local-prototype-user',
    recipeId: recipe.id,
    recipeName: recipe.title,
    imageUrl: recipeImagePath(recipe),
    cookedAt: new Date().toISOString(),
    rating: null,
    notes: '',
    tags: recipe.tags || []
  };
  state.cookingHistory = [entry, ...state.cookingHistory].slice(0, 60);
  localStorage.setItem('cookbuddy_cooking_history', JSON.stringify(state.cookingHistory));
  renderKitchenJournal();
  persistCookedRecipe(entry);
}

async function persistCookedRecipe(entry) {
  try {
    await api('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
  } catch (error) {
    // Local prototype keeps history in localStorage when the backend has no logged-in user.
  }
}

function journalGroup(entry) {
  const cooked = new Date(entry.cookedAt);
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const time = cooked.getTime();
  if (time >= startToday) return 'Today';
  if (time >= Date.now() - 7 * 86400000) return 'This Week';
  return 'Earlier';
}

function openJournalRoute(push = true) {
  renderJournalPage();
  els.journalDialog?.showModal();
  if (push && window.location.pathname !== '/journal') window.history.pushState({ journal: true }, '', '/journal');
}

function closeJournalRoute() {
  els.journalDialog?.close();
  if (window.location.pathname === '/journal') window.history.pushState({}, '', '/');
}

function renderJournalPage() {
  if (!els.journalDetail) return;
  const entries = [...state.cookingHistory].sort((a, b) => new Date(b.cookedAt) - new Date(a.cookedAt));
  if (!entries.length) {
    els.journalDetail.innerHTML = '<p class="notice">No cooking memories yet. Cook a dish and it will appear here.</p>';
    return;
  }
  const groups = ['Today', 'This Week', 'Earlier'];
  els.journalDetail.innerHTML = [
    `<section class="journal-insight">${journalInsight(journalWeekEntries())}</section>`,
    groups.map((group) => {
      const groupEntries = entries.filter((entry) => journalGroup(entry) === group);
      if (!groupEntries.length) return '';
      return `<section class="journal-group"><h3>${group}</h3>${groupEntries.map((entry) => `<article class="journal-entry-card"><img src="${entry.imageUrl || '/assets/images/dishes/home-bowl.png'}" alt="" loading="lazy" decoding="async" /><div><strong>${entry.recipeName}</strong><span>Cooked on ${new Date(entry.cookedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span>${entry.rating ? `<small>${'⭐'.repeat(entry.rating)}</small>` : ''}${entry.notes ? `<p>${entry.notes}</p>` : ''}</div></article>`).join('')}</section>`;
    }).join('')
  ].join('');
}

function recipeFamilyKey(recipe) {
  return normalizeIngredientName(recipe.title)
    .replace(/\b(spicy|andhra|soft|special|home style|homestyle)\b/g, '')
    .replace(/\b(podi|masala)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function uniqueRecipeFamilies(recipes) {
  const seen = new Set();
  return recipes.filter((recipe) => {
    const key = recipeFamilyKey(recipe);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function transitionTodayPicks() {
  clearTimeout(picksTransitionTimer);
  els.todayPicks.classList.remove('is-swapping');
  requestAnimationFrame(() => els.todayPicks.classList.add('is-swapping'));
  picksTransitionTimer = setTimeout(() => {
    renderTodayPicks();
    requestAnimationFrame(() => els.todayPicks.classList.remove('is-swapping'));
  }, 160);
}

function featuredCandidates() {
  const pool = state.recipes.filter((recipe) => recipeMatchesMealForMoodView(recipe, state.meal));
  return sortForMood(pool);
}

function tomoPromptMessage() {
  if (state.selectedIngredients.size) {
    return getTomoMessage({ context: 'ingredient_selected', selectedIngredients: [...state.selectedIngredients] });
  }
  return getTomoMessage({ context: 'mood_selected', mood: moodForCopy() });
}

function heroRecommendationReasons(recipe) {
  if (!recipe) return [];
  const totalTime = Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
  const mood = activeMood();
  const moodLabel = labelForMood(mood);
  const reasons = [];
  if (mood && recipeMatchesMood(recipe, mood)) reasons.push(`✓ Matches ${moodLabel}`);
  if (state.meal) reasons.push(`✓ Good for ${mealTitles[state.meal].replace(' ideas', '').toLowerCase()}`);
  if (totalTime <= 30) reasons.push('✓ Quick recipe');
  if (state.selectedIngredients.size) reasons.push('✓ Pantry ingredients available');
  if (userPreferenceScore(recipe) > 0) reasons.push('✓ Frequently cooked by you');
  if (!reasons.some((reason) => /Quick|Frequently|Pantry/.test(reason))) reasons.push('✓ Popular recipe');
  return reasons.slice(0, 3);
}

function revealTomoPick(findAnother = false) {
  const currentId = state.revealedPickId || state.featuredRecipeId;
  const candidates = featuredCandidates().filter((recipe) => !findAnother || recipe.id !== currentId);
  const fresh = candidates.filter((recipe) => !state.favoriteIds.has(recipe.id) && !state.laterIds.has(recipe.id));
  const pool = fresh.length ? fresh : candidates;
  if (!pool.length) return;
  const pick = findAnother
    ? pool[Math.floor(Math.random() * pool.length)]
    : pool[0];
  state.featuredRecipeId = pick.id;
  state.revealedPickId = pick.id;
  localStorage.setItem('cookbuddy_featured_recipe', pick.id);
  renderTomoPick();
  toast(findAnother ? `Tomo found ${pick.title}.` : `Tomo revealed ${pick.title}.`);
}

function surpriseMe() {
  revealTomoPick(Boolean(state.revealedPickId));
}

function renderTomoPick() {
  if (!els.surpriseButton) return;
  const pick = state.recipes.find((recipe) => recipe.id === state.revealedPickId);
  els.tomoHero?.classList.toggle('revealed', Boolean(pick));
  els.surpriseButton.classList.toggle('revealed', Boolean(pick));
  els.surpriseButton.dataset.recipeId = '';
  els.surpriseButton.setAttribute('aria-label', pick ? "Tomo's revealed pick" : "Reveal Tomo's pick");
  els.surpriseButton.innerHTML = pick
    ? `
      <img src="${localPath('/tomo.png')}" alt="" />
      <span class="pick-revealed">
        <span>Tomo</span>
        <small>Picked</small>
      </span>
    `
    : `
      <img src="${localPath('/tomo.png')}" alt="" />
      <span class="pick-flip">
        <span class="pick-face pick-front">Tap to reveal</span>
        <span class="pick-face pick-back">Tomo’s pick</span>
      </span>
    `;
  if (els.heroMessage) els.heroMessage.textContent = '🍅 Tomo';
  if (els.heroPickTitle) els.heroPickTitle.textContent = tomoPromptMessage();
  if (els.heroRevealDish) {
    els.heroRevealDish.classList.toggle('hidden', !pick);
    els.heroRevealDish.innerHTML = pick
      ? `
        <span class="recipe-icon">${recipeVisual(pick)}</span>
        <span class="hero-reveal-copy">
          <small>✨ Tomo's Pick</small>
          <strong>${escapeHtml(pick.title)}</strong>
        </span>
      `
      : '';
  }
  if (els.heroPickReasons) {
    els.heroPickReasons.classList.toggle('hidden', !pick);
    els.heroPickReasons.innerHTML = pick ? heroRecommendationReasons(pick).map((reason) => `<li>${escapeHtml(reason)}</li>`).join('') : '';
  }
  if (els.heroCookNow) {
    els.heroCookNow.dataset.recipeId = pick ? pick.id : '';
    els.heroCookNow.dataset.recipeAction = 'cook';
    els.heroCookNow.classList.toggle('hidden', !pick);
  }
  if (els.heroFindAnother) {
    els.heroFindAnother.classList.toggle('hidden', !pick);
  }
}

function ambientContext() {
  const now = new Date();
  const hour = now.getHours();
  const mood = moodForCopy();
  const mockWeather = {
    temperature: 24,
    condition: hour >= 18 || hour < 6 ? 'Soft evening' : 'Warm daylight',
    icon: hour >= 18 || hour < 6 ? '🌙' : '☀️'
  };
  if (mood === 'rainy') {
    mockWeather.condition = 'Light rain';
    mockWeather.icon = '🌧️';
  } else if (mood === 'quick') {
    mockWeather.condition = 'Low-effort mood';
    mockWeather.icon = '⚡';
  }

  let hint = 'Perfect weather for comfort food 🍲';
  if (hour >= 5 && hour < 11) hint = 'Fresh morning for soft breakfast ideas ☀️';
  if (mood === 'rainy') hint = 'Perfect weather for comfort food 🌧️';
  if (hour >= 22 || hour < 4) hint = 'Late-night cravings activated 🌙';
  if (mockWeather.temperature >= 30) hint = 'Maybe something light and cooling 🥛';

  return {
    time: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    datetime: now.toISOString(),
    weather: `${mockWeather.temperature}°C • ${mockWeather.condition} ${mockWeather.icon}`,
    hint
  };
}

function renderAmbientCard() {
  if (!els.ambientTime || !els.ambientWeather || !els.ambientHint) return;
  const context = ambientContext();
  els.ambientTime.textContent = context.time;
  els.ambientTime.setAttribute('datetime', context.datetime);
  els.ambientWeather.textContent = context.weather;
  els.ambientHint.textContent = context.hint;
}

function specialMatches(type) {
  const matchers = {
    baby: (recipe) => /puree|porridge|mashed|apple|banana|ragi|rice porridge/i.test(`${recipe.title} ${recipe.description}`),
    festival: (recipe) => (recipe.tags || []).includes('festival'),
    soups: (recipe) => /soup/i.test(recipe.title),
    salads: (recipe) => /salad|kosambari|kachumber|raita|sprout/i.test(`${recipe.title} ${recipe.description}`),
    desserts: (recipe) => /payasam|kheer|halwa|ladoo|laddu|sweet|pongal|sheera|kesari|dessert/i.test(`${recipe.title} ${recipe.description}`),
    snacks: (recipe) => /pakora|bonda|chaat|samosa|mathri|corn|vada|puff|momos/i.test(recipe.title),
    drinks: () => false
  };
  return state.recipes.filter(matchers[type]).slice(0, 6);
}

function drinkCard(drink) {
  return collectionCard(drink, '☕', 'Herbal');
}

function collectionImagePath(item, collectionKey, label) {
  if (item.imagePath) return localPath(item.imagePath);
  const text = item.title.toLowerCase();
  if (text.includes('gulab')) return localPath('/assets/images/desserts/gulab-jamun.png');
  if (text.includes('rasmalai')) return localPath('/assets/images/desserts/rasmalai.png');
  if (text.includes('kheer')) return localPath('/assets/images/desserts/kheer.png');
  if (text.includes('payasam')) return localPath('/assets/images/desserts/payasam.png');
  if (text.includes('halwa')) return localPath('/assets/images/desserts/halwa.png');
  if (text.includes('ladoo') || text.includes('laddu')) return localPath('/assets/images/desserts/laddoo.png');
  if (text.includes('jalebi')) return localPath('/assets/images/desserts/jalebi.png');
  if (text.includes('kachumber')) return localPath('/assets/images/salads/kachumber-salad.png');
  if (text.includes('kosambari')) return localPath('/assets/images/salads/carrot-kosambari.png');
  if (text.includes('sprout')) return localPath('/assets/images/salads/sprouts-bowl.png');
  if (text.includes('cucumber')) return localPath('/assets/images/salads/cucumber-salad.png');
  if (text.includes('chickpea') || text.includes('chana')) return localPath('/assets/images/salads/chickpea-salad.png');
  if (text.includes('rice moong khichdi')) return localPath('/assets/images/dishes/rice-moong-khichdi-homestyle.png');
  if (text.includes('ragi porridge')) return localPath('/assets/images/dishes/ragi-porridge-homestyle.png');
  if (text.includes('suji porridge')) return localPath('/assets/images/dishes/suji-porridge-homestyle.png');
  if (text.includes('oats porridge')) return localPath('/assets/images/dishes/oats-porridge-homestyle.png');
  if (text.includes('chai') || text.includes('tea')) return localPath('/assets/images/drinks/masala-chai.png');
  if (text.includes('ragi')) return localPath('/assets/images/dishes/ragi-porridge-homestyle.png');
  if (text.includes('lassi')) return localPath('/assets/images/drinks/lassi.png');
  if (text.includes('buttermilk')) return localPath('/assets/images/drinks/buttermilk.png');
  if (text.includes('juice')) return localPath('/assets/images/drinks/fresh-juice.png');
  if (text.includes('soup')) return localPath('/assets/images/dishes/soup-bowls.png');
  if (text.includes('khichdi')) return localPath('/assets/images/dishes/khichdi.png');
  const fallback = {
    baby: '/assets/images/collections/baby-food.webp',
    drinks: '/assets/images/collections/healthy-drinks.webp',
    lunchbox: '/assets/images/collections/lunch-box-heroes.webp',
    salads: '/assets/images/collections/salads.webp',
    desserts: '/assets/images/collections/desserts.webp',
    soups: '/assets/images/collections/soups.webp',
    festival: '/assets/images/collections/festival-food.webp'
  };
  return localPath(item.imagePath || fallback[collectionKey] || '/assets/images/dishes/home-bowl.png');
}

function collectionShortDescription(item, collectionKey = '') {
  const text = `${item.title || ''} ${item.subcategory || item.subCategory || ''}`.toLowerCase();
  const title = String(item.title || '').trim();
  const lowerKey = String(collectionKey || '').toLowerCase();

  if (lowerKey === 'baby') {
    if (/porridge/.test(text)) return 'Soft porridge for slow feeding.';
    if (/puree|mash|banana|apple|pear|pumpkin/.test(text)) return 'Smooth and easy to feed.';
    if (/khichdi|pongal/.test(text)) return 'Gentle comfort for tiny appetites.';
    return 'Small bites for calm mealtimes.';
  }
  if (lowerKey === 'lunchbox') {
    if (/roll|wrap/.test(text)) return 'Neat, filling, and easy to pack.';
    if (/rice|idli|upma|poha|uttapam/.test(text)) return 'A reliable tiffin-box favorite.';
    return 'Kid-friendly and lunchbox ready.';
  }
  if (lowerKey === 'drinks') {
    if (/summer|lassi|juice|coconut|sherbet|panna/.test(text)) return 'Cooling comfort for warm days.';
    if (/remed|kashaya|ajwain|jeera|tulsi|ginger/.test(text)) return 'A soothing sip for slow evenings.';
    return 'A gentle drink for everyday comfort.';
  }
  if (lowerKey === 'salads') {
    if (/protein|chickpea|rajma|sprout|paneer|lentil/.test(text)) return 'Fresh, filling, and easy to finish.';
    if (/summer|cucumber|fruit|watermelon/.test(text)) return 'Light crunch for warmer days.';
    return 'Fresh crunch for everyday meals.';
  }
  if (lowerKey === 'desserts') {
    if (/festival|modak|ladoo|katli|jalebi|mysore/.test(text)) return 'Festive sweetness in a small bite.';
    if (/kheer|payasam|rasmalai|basundi|shrikhand/.test(text)) return 'Soft sweetness for slow evenings.';
    return 'A small sweet finish for the day.';
  }
  if (lowerKey === 'soups') {
    if (/protein|chicken|dal|lentil|egg/.test(text)) return 'Warm, filling comfort in a bowl.';
    if (/rainy|rasam|pepper|tomato/.test(text)) return 'Warm comfort for rainy evenings.';
    return 'Light comfort in a warm bowl.';
  }
  if (lowerKey === 'festival') {
    return 'Festive comfort made for sharing.';
  }

  const sentence = String(item.description || '').split(/[.!?]/).map((part) => part.trim()).find(Boolean);
  if (sentence && sentence.length <= 58) return `${sentence}.`;
  return title ? `${title} for an easy home-style plate.` : 'A simple home-style pick.';
}

function collectionAgeLabel(region) {
  const value = String(region || '').trim();
  if (/6\s*-\s*8\s*months/i.test(value)) return '6+ Months';
  if (/8\s*-\s*12\s*months/i.test(value)) return '8+ Months';
  if (/10\s*-\s*12\s*months/i.test(value)) return '10+ Months';
  if (/12\s*-\s*24\s*months|1\s*year/i.test(value)) return '1 Year+';
  if (/2\+?\s*years/i.test(value)) return '2 Years+';
  return /months|year/i.test(value) ? value : '';
}

function collectionUseLabel(item, collectionKey = '') {
  const subcategory = String(item.subcategory || item.subCategory || '').trim();
  const text = `${item.title || ''} ${subcategory} ${(item.tags || []).join(' ')}`.toLowerCase();
  const lowerKey = String(collectionKey || '').toLowerCase();

  if (lowerKey === 'baby') {
    if (/first/.test(text)) return 'Comfort Bowl';
    if (/puree|mash/.test(text)) return 'Easy Digest';
    if (/growing/.test(text)) return 'Soft Meal';
    if (/little/.test(text)) return 'Finger Food';
    return 'Baby Friendly';
  }
  if (lowerKey === 'lunchbox') {
    if (/quick morning/.test(text)) return 'Quick Morning';
    if (/tiffin/.test(text)) return 'School Tiffin';
    if (/protein/.test(text)) return 'Protein Packed';
    if (/after school/.test(text)) return 'After School';
    return item.lunchbox_friendly ? 'Lunchbox Friendly' : 'Kid Friendly';
  }
  if (lowerKey === 'drinks') {
    if (/summer|cooler|lassi|coconut|panna|sherbet/.test(text)) return 'Cooling Drink';
    if (/remed|kashaya|ajwain|jeera|tulsi|ginger/.test(text)) return 'Immunity Support';
    if (/nourishing|badam|milk|ragi/.test(text)) return 'Nourishing Sip';
    return 'Warm Comfort';
  }
  if (lowerKey === 'salads') {
    if (/protein|chickpea|rajma|sprout|paneer|lentil/.test(text)) return 'Protein Salad';
    if (/summer|cucumber|fruit|watermelon/.test(text)) return 'Cooling Plate';
    if (/regional|kosambari|kachumber/.test(text)) return 'Regional Fresh';
    return 'Everyday Salad';
  }
  if (lowerKey === 'desserts') {
    if (/festival|modak|ladoo|katli|jalebi|mysore/.test(text)) return 'Festival Sweet';
    if (/milk|kheer|payasam|rasmalai|basundi|shrikhand/.test(text)) return 'Milk Dessert';
    if (/quick|sheera|burfi|kesari/.test(text)) return 'Quick Treat';
    return 'Sweet Ending';
  }
  if (lowerKey === 'soups') {
    if (/protein|chicken|dal|lentil|egg/.test(text)) return 'Protein Bowl';
    if (/rainy|rasam|pepper|tomato/.test(text)) return 'Rainy Day';
    if (/regional/.test(text)) return 'Regional Soup';
    return 'Comfort Soup';
  }
  if (lowerKey === 'festival') {
    if (subcategory) return subcategory.replace(/\s+/g, ' ');
    return 'Celebration Special';
  }
  return subcategory || 'Home Style';
}

function collectionBrowseMetadata(item, collectionKey = '') {
  const lowerKey = String(collectionKey || '').toLowerCase();
  const useLabel = collectionUseLabel(item, lowerKey);
  const ageLabel = collectionAgeLabel(item.region);
  const text = `${item.title || ''} ${item.subcategory || item.subCategory || ''} ${(item.tags || []).join(' ')}`.toLowerCase();

  if (lowerKey === 'baby') {
    const babyLabel = /puree|mash/.test(text) ? 'Easy Food' : /little|bite|plate/.test(text) ? 'Soft Food' : 'Comfort Food';
    return [ageLabel || '6+ Months', babyLabel].filter(Boolean);
  }
  if (lowerKey === 'lunchbox') {
    if (/protein/.test(text)) return ['Protein Food', 'Kid Friendly'];
    if (/tiffin|mess|travel/.test(text)) return ['School Food', 'Mess Free'];
    return ['Easy Food', 'Kid Friendly'];
  }
  if (lowerKey === 'drinks') {
    if (/summer|cooler|lassi|coconut|panna|sherbet/.test(text)) return ['Cooling Drink', 'Easy Sip'];
    if (/remed|kashaya|ajwain|jeera|tulsi|ginger/.test(text)) return ['Herbal Drink', 'Comfort Sip'];
    return ['Comfort Sip', 'Easy Drink'];
  }
  if (lowerKey === 'salads') {
    if (/protein|chickpea|rajma|sprout|paneer|lentil/.test(text)) return ['Protein Food', 'Fresh Food'];
    if (/summer|cucumber|fruit|watermelon/.test(text)) return ['Light Food', 'Cooling Food'];
    return ['Light Food', 'Fresh Food'];
  }
  if (lowerKey === 'desserts') {
    if (/festival|modak|ladoo|katli|jalebi|mysore/.test(text)) return ['Sweet Food', 'Festival Food'];
    return ['Sweet Food', 'Comfort Food'];
  }
  if (lowerKey === 'soups') {
    if (/protein|chicken|dal|lentil|egg/.test(text)) return ['Protein Food', 'Comfort Food'];
    return ['Comfort Food', 'Easy Food'];
  }
  if (lowerKey === 'festival') {
    return ['Festival Food', 'Comfort Food'];
  }
  return [useLabel || 'Comfort Food', 'Easy Food'].filter(Boolean).slice(0, 2);
}

function collectionCard(item, icon, label, collectionKey = '') {
  const article = document.createElement('article');
  article.className = 'drink-card';
  const slug = collectionImagePath(item, collectionKey, label);
  const meta = collectionBrowseMetadata(item, collectionKey);
  const metaLines = (Array.isArray(meta) ? meta : String(meta || '').split('•'))
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2);
  article.innerHTML = `
    <span class="recipe-icon"><img class="food-image" src="${slug}" alt="" loading="lazy" decoding="async" /></span>
    <div>
      <strong>${escapeHtml(item.title)}</strong>
      <p class="collection-card-meta">${metaLines.map((line) => `<span>${escapeHtml(line)}</span>`).join('')}</p>
    </div>
  `;
  return article;
}

function uniqueRecipes(recipes) {
  const seen = new Set();
  return recipes.filter((recipe) => {
    if (!recipe) return false;
    const key = recipe.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function editorialStaticCard(item, label) {
  if (!item) return '';
  const text = item.title.toLowerCase();
  const slug = localPath(text.includes('kachumber') ? '/assets/images/salads/kachumber-salad.png'
    : text.includes('kosambari') ? '/assets/images/salads/carrot-kosambari.png'
      : text.includes('sprout') ? '/assets/images/salads/sprouts-bowl.png'
        : text.includes('tea') ? '/assets/images/drinks/masala-chai.png'
          : text.includes('ragi') ? '/assets/images/drinks/badam-milk.png'
            : '/assets/images/drinks/chai.png');
  return `
    <article class="editorial-static-card">
      <span class="recipe-icon"><img class="food-image" src="${slug}" alt="" loading="lazy" decoding="async" /></span>
      <div>
        <strong>${item.title}</strong>
        <small>${label} • ${item.time} min</small>
      </div>
    </article>
  `;
}

function renderSpecialRows() {
  const collections = state.collections || [];
  if (!collections.length) {
    els.specialRows.innerHTML = '<p class="notice">Tomo Collections are loading.</p>';
    return;
  }
  if (!collections.some((collection) => collection.key === state.activeCollection)) {
    state.activeCollection = collections[0].key;
  }
  const active = collections.find((collection) => collection.key === state.activeCollection) || collections[0];
  const activeDetail = state.collectionDetails.get(active.key);
  if (activeDetail && !state.activeCollectionSubcategories.has(active.key) && activeDetail.subcategories && activeDetail.subcategories.length) {
    state.activeCollectionSubcategories.set(active.key, activeDetail.subcategories[0].name);
  }
  if (activeDetail) {
    activeDetail.activeSubcategory = state.activeCollectionSubcategories.get(active.key);
  }
  const sidebarMarkup = activeDetail
    ? collectionSidebar(activeDetail)
    : `<p>${active.icon || '🍲'} ${active.title}</p><h3>${active.title}</h3><span>${active.copy || ''}</span>`;

  els.specialRows.innerHTML = `
    <div class="collection-scroll" aria-label="Tomo collections">
      ${collections.map((collection) => `
        <button class="collection-segment collection-${collection.key} ${collection.tone} ${state.activeCollection === collection.key ? 'active' : ''}" data-collection-key="${collection.key}">
          <strong>${collection.title}</strong>
          <em>${collectionSegmentCopy(collection)}</em>
        </button>
      `).join('')}
    </div>
    <article class="collection-pop ${active.tone}">
      <div class="collection-pop-copy">
        ${sidebarMarkup}
      </div>
      <div class="collection-dishes" data-special-row="${active.key}"></div>
    </article>
  `;

  const container = els.specialRows.querySelector(`[data-special-row="${active.key}"]`);
  renderCollectionItems(active, container);
}

function collectionSegmentCopy(collection) {
  const copy = {
    baby: 'Tiny comfort bowls and first foods.',
    lunchbox: 'Packed school lunch favorites.',
    drinks: 'Warm remedies and soothing drinks.',
    salads: 'Fresh light sides and salads.',
    desserts: 'Small homemade sweet endings.',
    soups: 'Warm bowls for calm evenings.',
    festival: 'Celebration dishes made for sharing.'
  };
  return copy[collection.key] || collection.copy || '';
}

function subcategoryIcon(name) {
  const text = String(name || '').toLowerCase();
  if (text.includes('summer')) return '🌿';
  if (text.includes('protein') || text.includes('nourishing')) return '💪';
  if (text.includes('remed')) return '☕';
  if (text.includes('milk')) return '🥛';
  if (text.includes('festival') || text.includes('diwali') || text.includes('celebration')) return '✨';
  if (text.includes('first') || text.includes('puree') || text.includes('little')) return '🥣';
  if (text.includes('rainy') || text.includes('comfort') || text.includes('warm')) return '🍲';
  return '🍅';
}

function collectionSidebar(detail) {
  const activeName = detail.activeSubcategory || ((detail.subcategories || [])[0] && detail.subcategories[0].name);
  const tiles = (detail.subcategories || []).slice(0, 4).map((subcategory) => `
    <button class="collection-sidebar-tile ${activeName === subcategory.name ? 'active' : ''}" data-select-subcategory="${detail.collection.key}::${subcategory.name}" type="button" aria-pressed="${activeName === subcategory.name ? 'true' : 'false'}">
      <span>${subcategoryIcon(subcategory.name)}</span>
      <strong>${subcategory.name}</strong>
      <small>${subcategory.recipes.length} Ideas</small>
    </button>
  `).join('');
  return `
    <p>${detail.collection.icon} ${detail.collection.title}</p>
    <div class="collection-sidebar-grid">${tiles}</div>
  `;
}

function emotionalTagPills(item) {
  return [item.emotion_tag_1, item.emotion_tag_2]
    .filter(Boolean)
    .map((tag) => `<span class="pill veg">${tag}</span>`)
    .join('');
}

function collectionDetailCard(item, collection, featured = false) {
  const article = collectionCard(item, collection.icon, item.subcategory || collection.title, collection.key);
  article.classList.add(featured ? 'featured-collection-card' : 'curated-collection-card');
  return article;
}

function buildCollectionDetailFromSummary(collection) {
  const recipes = [...(collection.items || [])].sort((a, b) => {
    const aScore = Number(a.featured_priority || 0) * 1000 + Number((a.scores || {}).comfort || 0) * 100 + Number((a.scores || {}).homeStyle || 0) * 10;
    const bScore = Number(b.featured_priority || 0) * 1000 + Number((b.scores || {}).comfort || 0) * 100 + Number((b.scores || {}).homeStyle || 0) * 10;
    return bScore - aScore;
  });
  const groups = new Map();
  recipes.forEach((recipe) => {
    const name = recipe.subcategory || recipe.subCategory || 'Curated Picks';
    if (!groups.has(name)) groups.set(name, { name, description: recipe.subcategory_description || 'Curated by Tomo for this mood.', displayOrder: Number(recipe.display_order || 99), recipes: [] });
    groups.get(name).recipes.push(recipe);
  });
  return {
    collection: {
      id: collection.key,
      key: collection.key,
      title: collection.title,
      subtitle: collection.subtitle,
      copy: collection.copy,
      tone: collection.tone,
      icon: collection.icon,
      recipeCount: (collection.items || []).length
    },
    hero: collection.hero || { title: collection.title, subtitle: collection.copy, recipeCount: (collection.items || []).length },
    featuredRecipes: recipes.slice(0, 3),
    subcategories: [...groups.values()].sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name))
  };
}

function renderCollectionItems(collection, container) {
  container.classList.remove('collection-dishes-grouped');
  const detail = state.collectionDetails.get(collection.key);
  if (!detail) {
    container.innerHTML = '<p class="notice">🍅 Tomo is arranging this collection.</p>';
    loadCollectionDetail(collection.key);
    return;
  }

  const selectedSubcategory = state.activeCollectionSubcategories.get(collection.key) || ((detail.subcategories || [])[0] && detail.subcategories[0].name);
  const visibleSubcategories = (detail.subcategories || []).filter((subcategory) => subcategory.name === selectedSubcategory);
  const rowsToRender = visibleSubcategories.length ? visibleSubcategories : (detail.subcategories || []).slice(0, 1);

  container.classList.add('collection-curated-page');
  container.innerHTML = '<section class="collection-subcategory-list single-subcategory-list"></section>';

  const list = container.querySelector('.collection-subcategory-list');
  rowsToRender.forEach((subcategory) => {
    const section = document.createElement('section');
    section.className = 'collection-subcategory-section';
    section.innerHTML = '<div class="collection-subcategory-row"></div>';
    const row = section.querySelector('.collection-subcategory-row');
    const rowKey = `${collection.key}::${subcategory.name}`;
    const expanded = state.expandedCollectionRows.has(rowKey);
    const rowRecipes = expanded ? subcategory.recipes : subcategory.recipes.slice(0, 4);
    rowRecipes.forEach((item) => row.appendChild(collectionDetailCard(item, detail.collection, false)));
    if (subcategory.recipes.length > 4) {
      row.appendChild(collectionSeeMoreTile(rowKey, expanded, subcategory.recipes.length - 4));
    }
    list.appendChild(section);
  });
}

function collectionSeeMoreTile(rowKey, expanded, moreCount) {
  const button = document.createElement('button');
  button.className = 'collection-row-more-card';
  button.type = 'button';
  button.dataset.seeSubcategory = rowKey;
  button.innerHTML = expanded
    ? '<strong>Show less</strong><span>Back to the first four</span>'
    : `<strong>See more</strong><span>${moreCount} more ideas →</span>`;
  return button;
}

async function loadCollectionDetail(key) {
  if (state.collectionDetails.has(key)) return;
  try {
    const detail = await api(`/api/collections/${encodeURIComponent(key)}`);
    state.collectionDetails.set(key, detail);
  } catch (error) {
    const collection = (state.collections || []).find((item) => item.key === key);
    if (!collection) {
      toast(error.message);
      return;
    }
    state.collectionDetails.set(key, buildCollectionDetailFromSummary(collection));
  }
  if (state.activeCollection === key) renderSpecialRows();
}


function topIngredients() {
  const userCatalog = Array.isArray(window.COOKBUDDY_USER_INGREDIENTS) ? window.COOKBUDDY_USER_INGREDIENTS : [];
  if (userCatalog.length) {
    return userCatalog
      .filter((item) => item.display_status !== 'hidden')
      .sort((a, b) => Number(a.display_order || 999) - Number(b.display_order || 999))
      .map((item) => item.ingredient_name || item.ingredientName || item.name)
      .filter(Boolean)
      .map(formatIngredientName);
  }
  const catalog = Array.isArray(window.COOKBUDDY_PANTRY_CATALOG) ? window.COOKBUDDY_PANTRY_CATALOG : [];
  if (catalog.length) {
    return catalog
      .filter((item) => item.display_status !== 'hidden')
      .sort((a, b) => Number(a.category_order || 999) - Number(b.category_order || 999) || Number(b.used_by_recipe_count || 0) - Number(a.used_by_recipe_count || 0))
      .map((item) => item.ingredient_name || item.ingredientName || item.name)
      .filter(Boolean)
      .map(formatIngredientName);
  }
  const available = new Map();
  for (const recipe of state.recipes) {
    for (const ingredient of recipe.ingredients || []) {
      const key = normalizeIngredientName(ingredient.name);
      available.set(key, formatIngredientName(key));
    }
  }
  const curated = [
    'rice', 'wheat', 'ragi', 'millets', 'poha', 'oats', 'rava', 'toor dal', 'moong dal', 'urad dal', 'idli rice', 'rice flour', 'sabudana',
    'chicken', 'fish', 'egg', 'paneer', 'curd', 'milk', 'rajma', 'chana',
    'onion', 'tomato', 'potato', 'carrot', 'gobi', 'ivy gourd', 'beans', 'capsicum', 'palak', 'methi', 'drumstick', 'mushroom', 'corn', 'vegetables'
  ];
  return curated.map((name) => available.get(name) || formatIngredientName(name));
}

function normalizeIngredientName(name) {
  return String(name).toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatIngredientName(name) {
  return normalizeIngredientName(name).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function ingredientAliasMap() {
  return window.COOKBUDDY_INGREDIENT_ALIAS_MAP || {};
}

function pantryDisplayAliasMap() {
  return window.COOKBUDDY_PANTRY_DISPLAY_ALIAS_MAP || ingredientAliasMap();
}

function ingredientAliases(name) {
  const key = normalizeIngredientName(name);
  const aliases = ingredientAliasMap()[key] || [name];
  return [...new Set([name, ...aliases].filter(Boolean).map(formatIngredientName))];
}

function pantryDisplayAliases(name) {
  const key = normalizeIngredientName(name);
  const aliases = pantryDisplayAliasMap()[key] || [name];
  return [...new Set([name, ...aliases].filter(Boolean).map(formatIngredientName))];
}

function ingredientMatchesSearch(ingredient, query) {
  if (!query) return true;
  return pantryDisplayAliases(ingredient).some((alias) => normalizeIngredientName(alias).includes(query));
}

function pantryCatalogLookup() {
  const userCatalog = Array.isArray(window.COOKBUDDY_USER_INGREDIENTS) ? window.COOKBUDDY_USER_INGREDIENTS : [];
  const databaseCatalog = Array.isArray(window.COOKBUDDY_PANTRY_CATALOG) ? window.COOKBUDDY_PANTRY_CATALOG : [];
  const lookup = new Map();
  [...databaseCatalog, ...userCatalog].forEach((item) => {
    const name = item.ingredient_name || item.ingredientName || item.name;
    if (!name) return;
    lookup.set(normalizeIngredientName(name), item);
    (item.aliases || []).forEach((alias) => lookup.set(normalizeIngredientName(alias), item));
  });
  return lookup;
}

function ingredientGroup(name) {
  const item = pantryCatalogLookup().get(normalizeIngredientName(name));
  if (item?.category) return item.category;
  const value = normalizeIngredientName(name);
  if (['onion', 'tomato', 'potato', 'carrot', 'cabbage', 'capsicum', 'corn', 'mushroom', 'palak', 'spinach', 'drumstick', 'gongura', 'methi'].includes(value)) return 'Vegetables';
  if (['apple', 'banana', 'lemon', 'tamarind', 'kokum'].includes(value)) return 'Fruits';
  if (['rice', 'wheat', 'poha', 'ragi', 'millets', 'millet', 'oats', 'rava', 'maida', 'besan', 'toor dal', 'moong dal', 'urad dal', 'dal', 'idli rice', 'dosa rice', 'rice flour', 'sabudana', 'semolina', 'vermicelli', 'seviyan', 'sevai', 'noodles', 'bread', 'pav', 'rajma', 'chana', 'chickpea', 'peanut', 'dosa batter', 'idli batter'].includes(value)) return 'Grains & Dals';
  if (['chicken', 'country chicken', 'fish', 'egg', 'paneer', 'mutton', 'prawn', 'keema', 'kheema', 'minced meat'].includes(value)) return 'Proteins';
  if (['curd', 'yogurt', 'milk', 'khoya', 'coconut milk'].includes(value)) return 'Dairy';
  if (['green chilli', 'red chilli', 'chilli', 'guntur chilli', 'mathania chilli', 'byadgi chilli'].includes(value)) return 'Chillies';
  if (['oil', 'ghee', 'butter', 'sesame oil'].includes(value)) return 'Oils & Fats';
  if (['schezwan sauce', 'soy sauce'].includes(value)) return 'Sauces & Condiments';
  return 'Vegetables';
}

function quickKitchenIngredients() {
  const preferred = ['Rice', 'Egg', 'Onion', 'Tomato', 'Potato', 'Paneer', 'Chicken', 'Poha'];
  const catalog = topIngredients();
  const catalogKeys = new Set(catalog.map(normalizeIngredientName));
  const quick = preferred.filter((ingredient) => catalogKeys.has(normalizeIngredientName(ingredient)));
  for (const ingredient of catalog) {
    if (quick.length >= 8) break;
    if (!quick.some((item) => normalizeIngredientName(item) === normalizeIngredientName(ingredient))) quick.push(ingredient);
  }
  return quick;
}

function ingredientChipButton(ingredient) {
  const button = document.createElement('button');
  button.className = `ingredient-chip ${state.selectedIngredients.has(ingredient) ? 'active' : ''}`;
  button.innerHTML = `<img src="${ingredientImagePath(ingredient)}" alt="" loading="lazy" decoding="async" /><span>${ingredient}</span>`;
  button.dataset.ingredient = ingredient;
  return button;
}

function renderSelectedIngredientTray() {
  if (!els.selectedIngredientTray) return;
  const selected = [...state.selectedIngredients];
  if (!selected.length) {
    els.selectedIngredientTray.innerHTML = '<span>Selected ingredients will appear here.</span>';
    return;
  }
  els.selectedIngredientTray.innerHTML = selected
    .map((ingredient) => `<button type="button" data-remove-ingredient="${ingredient}">${ingredient}<span>×</span></button>`)
    .join('');
}

function renderIngredients() {
  els.ingredientChips.innerHTML = '';
  const query = normalizeIngredientName(state.ingredientSearch);
  const quickSection = document.createElement('section');
  quickSection.className = 'ingredient-group quick-ingredient-group';
  quickSection.innerHTML = '<div></div>';
  const quickWrap = quickSection.querySelector('div');
  const quickList = quickKitchenIngredients();
  const quickIngredients = quickList.filter((ingredient) => ingredientMatchesSearch(ingredient, query));
  quickIngredients.forEach((ingredient) => quickWrap.appendChild(ingredientChipButton(ingredient)));
  els.ingredientChips.appendChild(quickSection);

  const browseButton = document.createElement('button');
  browseButton.className = 'browse-ingredients-button';
  browseButton.type = 'button';
  browseButton.dataset.browseIngredients = 'true';
  browseButton.textContent = state.ingredientsExpanded ? '− Hide ingredients' : '+ Browse all ingredients';
  els.ingredientChips.appendChild(browseButton);
  renderSelectedIngredientTray();

  if (!state.ingredientsExpanded) return;

  const quickSet = new Set(quickList.map(normalizeIngredientName));
  const groups = new Map();
  for (const ingredient of topIngredients()) {
    if (quickSet.has(normalizeIngredientName(ingredient))) continue;
    if (!ingredientMatchesSearch(ingredient, query)) continue;
    const group = ingredientGroup(ingredient);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(ingredient);
  }
  const groupOrder = ['Vegetables', 'Fruits', 'Grains & Dals', 'Proteins', 'Dairy', 'Spices & Seasonings', 'Chillies', 'Oils & Fats', 'Sauces & Condiments'];
  const sortedGroups = [...groups.entries()].sort((a, b) => {
    const indexA = groupOrder.indexOf(a[0]);
    const indexB = groupOrder.indexOf(b[0]);
    return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB) || a[0].localeCompare(b[0]);
  });
  for (const [group, ingredients] of sortedGroups) {
    const section = document.createElement('section');
    section.className = 'ingredient-group expanded-ingredient-group';
    section.innerHTML = `<h3>${group}</h3><div></div>`;
    const chipWrap = section.querySelector('div');
    ingredients.forEach((ingredient) => chipWrap.appendChild(ingredientChipButton(ingredient)));
    els.ingredientChips.appendChild(section);
  }
}

function coreRecipeIngredients(recipe) {
  const explicitPrimary = explicitPrimaryIngredients(recipe);
  if (explicitPrimary.length) {
    return explicitPrimary.map((name) => ({ name, quantity: 1, unit: '', role: 'required', isMain: true }));
  }
  const ingredients = recipe.ingredients || [];
  const core = ingredients.filter((item) => item.isMain && !secondaryFlavorIngredients.includes(normalizeIngredientName(item.name)));
  const protectedCore = ingredients.filter((item) => protectedIngredientNames(recipe).some((name) => normalizeIngredientName(name) === normalizeIngredientName(item.name)));
  const merged = [...core, ...protectedCore].filter((item, index, list) => list.findIndex((other) => normalizeIngredientName(other.name) === normalizeIngredientName(item.name)) === index);
  if (merged.length) return merged;
  const mainIngredients = ingredients.filter((item) => item.isMain).slice(0, 3);
  return mainIngredients.length ? mainIngredients : ingredients.slice(0, 3);
}

function recipeIsCore(recipe) {
  return String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core';
}

function explicitPrimaryIngredients(recipe) {
  return [
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2
  ]
    .filter(Boolean)
    .filter((value, index, list) => list.findIndex((item) => normalizeIngredientName(item) === normalizeIngredientName(value)) === index);
}

function explicitSecondaryIngredients(recipe) {
  return [
    recipe.secondaryIngredient1,
    recipe.secondaryIngredient2,
    recipe.secondaryIngredient3,
    recipe.secondaryIngredient4,
    recipe.secondaryIngredient5,
    recipe.secondary_ingredient_1,
    recipe.secondary_ingredient_2,
    recipe.secondary_ingredient_3,
    recipe.secondary_ingredient_4,
    recipe.secondary_ingredient_5
  ]
    .filter(Boolean)
    .filter((value, index, list) => list.findIndex((item) => normalizeIngredientName(item) === normalizeIngredientName(value)) === index);
}

function requiredPrimaryMatches(recipe, primaryCount = 2) {
  const configured = Number(recipe.requiredPrimaryMatches || recipe.required_primary_matches || primaryCount);
  if (!Number.isFinite(configured)) return primaryCount;
  return Math.max(1, Math.min(primaryCount || 2, Math.round(configured)));
}

function selectedMatchesIngredient(selected, ingredient) {
  return selectedCoversIngredient(selected, ingredient);
}

function moodMatchScore(recipe) {
  const mood = activeMood();
  if (!mood) return 0;
  return spreadMoodScore(recipe, mood);
}

function quickMealScore(recipe) {
  const totalTime = recipeTotalTime(recipe);
  return (recipe.tags || []).includes('quick') || (recipe.tags || []).includes('quick-meal') || totalTime <= 25 ? 100 : 35;
}

function discoveryScore(recipe, index = 0) {
  return Number(recipe.discoveryScore || recipe.discovery_score || recipe.homeStyleScore || Math.max(35, 70 - index));
}

function classifyIngredientMatch(score) {
  if (score >= 100) return 'Everything Available';
  if (score >= 80) return 'Excellent Match';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Possible Match';
  return 'Hide Recipe';
}

function isBetterRecommendation(candidate, current) {
  if (!current) return true;
  return candidate.finalScore > current.finalScore
    || (candidate.finalScore === current.finalScore && candidate.overallMatchPercent > current.overallMatchPercent)
    || (candidate.finalScore === current.finalScore && candidate.overallMatchPercent === current.overallMatchPercent && candidate.secondaryMatchCount > current.secondaryMatchCount)
    || (candidate.finalScore === current.finalScore && candidate.overallMatchPercent === current.overallMatchPercent && candidate.secondaryMatchCount === current.secondaryMatchCount && candidate.recipe.title.localeCompare(current.recipe.title) < 0);
}

function dedupeRecommendationMatches(matches) {
  const byRecipeId = new Map();
  for (const match of matches) {
    const key = String(match.recipe.id || match.recipe.recipeId || match.recipe.recipe_id || normalizeIngredientName(match.recipe.title));
    if (isBetterRecommendation(match, byRecipeId.get(key))) byRecipeId.set(key, match);
  }

  const byTitle = new Map();
  for (const match of byRecipeId.values()) {
    const key = normalizeIngredientName(match.recipe.title);
    if (isBetterRecommendation(match, byTitle.get(key))) byTitle.set(key, match);
  }

  return [...byTitle.values()];
}

function highestImpactMissingIngredient(primary, secondary, selected) {
  const missingPrimary = primary.filter((name) => !selectedMatchesIngredient(selected, name));
  if (missingPrimary.length) {
    const compoundMatchMap = window.COOKBUDDY_COMPOUND_INGREDIENT_MATCH_MAP || {};
    const partiallyMatchedPrimary = missingPrimary.find((name) => {
      const compound = compoundMatchMap[normalizeIngredientName(name)];
      return compound?.some((part) => selectedMatchesIngredient(selected, part));
    });
    if (partiallyMatchedPrimary) {
      const compound = compoundMatchMap[normalizeIngredientName(partiallyMatchedPrimary)] || [];
      const missingCompoundPart = compound.find((part) => !selectedMatchesIngredient(selected, part));
      if (missingCompoundPart) return formatIngredientName(missingCompoundPart);
    }
    return formatIngredientName(missingPrimary[0]);
  }
  const allPrimaryMatched = !primary.length || primary.every((name) => selectedMatchesIngredient(selected, name));
  if (!allPrimaryMatched) return '';
  const missingSecondary = secondary
    .filter((name) => !selectedMatchesIngredient(selected, name))
    .filter(isNextIngredientSuggestionAllowed);
  return missingSecondary.length ? formatIngredientName(missingSecondary[0]) : '';
}

function matchTier(score) {
  if (score >= 80) return { key: 'top', label: 'Top Match' };
  if (score >= 50) return { key: 'close', label: 'Close Match' };
  if (score >= 30) return { key: 'add-one', label: 'Add One More Ingredient' };
  return { key: 'partial', label: 'Add One More Ingredient' };
}

function weightedIngredientMatches(options = {}) {
  const selected = [...state.selectedIngredients];
  if (!selected.length) return [];
  const singleIngredientMode = options.singleIngredientMode ?? selected.length === 1;
  const matches = state.recipes
    .filter(recipeIsCore)
    .map((recipe, index) => {
      const primary = explicitPrimaryIngredients(recipe).slice(0, 2);
      const secondary = explicitSecondaryIngredients(recipe);
      const matchedPrimary = primary.filter((name) => selectedMatchesIngredient(selected, name));
      const matchedPrimaryCount = matchedPrimary.length;
      const requiredPrimaryCount = requiredPrimaryMatches(recipe, primary.length || 2);
      const primaryRatio = primary.length
        ? matchedPrimaryCount / Math.max(1, primary.length)
        : Math.min(matchedPrimaryCount, requiredPrimaryCount) / Math.max(1, requiredPrimaryCount);
      const hasEveryPrimaryIngredient = primary.length > 0 && matchedPrimaryCount >= primary.length;
      const matchedPrimaryNames = matchedPrimary.map((name) => formatIngredientName(name));
      const missingPrimary = primary.filter((name) => !selectedMatchesIngredient(selected, name)).map((name) => formatIngredientName(name));
      const secondaryMatches = secondary.filter((name) => selectedMatchesIngredient(selected, name));
      const mealTypeBonus = recipeMatchesMeal(recipe, state.meal) ? 10 : 0;
      const recipePopularity = Math.min(20, userPreferenceScore(recipe));
      const comfort = Math.min(100, Number(recipe.comfortScore || 5) * 10);
      const quick = quickMealScore(recipe);
      const discovery = Math.min(100, discoveryScore(recipe, index));
      const preference = Math.min(100, userPreferenceScore(recipe));
      const secondaryTotal = secondary.length;
      const secondaryMatchCount = secondaryMatches.length;
      const secondaryRatio = secondaryTotal ? secondaryMatchCount / secondaryTotal : 1;
      const ingredientSignalScore = (primaryRatio * 80) + (secondaryTotal ? secondaryRatio * 15 : 0);
      let ingredientMatchScore = Math.min(100, Math.round(
        ingredientSignalScore > 0
          ? ingredientSignalScore
          : 0
      ));
      if (!hasEveryPrimaryIngredient) ingredientMatchScore = Math.min(49, ingredientMatchScore);
      if (singleIngredientMode) ingredientMatchScore = Math.min(30, ingredientMatchScore);
      const overallMatchPercent = ingredientMatchScore;
      const tier = matchTier(ingredientMatchScore);
      const unlockIngredient = highestImpactMissingIngredient(primary, secondary, selected);
      const mood = activeMood();
      const pantryScore = Math.min(100, Math.round((secondaryRatio * 60) + Math.min(40, secondaryMatches.length * 10)));
      const moodBreakdown = mood
        ? moodRankingBreakdown(recipe, mood, {
          ingredientScore: ingredientMatchScore,
          pantryScore,
          mealTypeScore: mealTypeBonus > 0 ? 100 : 0
        })
        : null;
      const moodScore = moodBreakdown ? moodBreakdown.moodScore : pantryMoodBonus(recipe);
      const moodTier = moodBreakdown ? moodBreakdown.moodTier : MoodTier.SUPPORT;
      const tierBoost = moodBreakdown ? moodBreakdown.tierBoost : 0;
      const rankingScore = moodBreakdown
        ? Math.round(moodBreakdown.finalScore + recipePopularity)
        : Math.round(
          ingredientMatchScore
          + (secondaryMatches.length * 10)
          + moodScore
          + mealTypeBonus
          + recipePopularity
        );
      return {
        recipe,
        ingredientMatchScore,
        ingredientScore: ingredientMatchScore,
        primaryMatchPercent: Math.round(primaryRatio * 100),
        secondaryMatchCount,
        secondaryTotal,
        overallMatchPercent,
        finalScore: rankingScore,
        rankingScore,
        moodTier,
        pantryScore,
        mealTypeScore: mealTypeBonus > 0 ? 100 : 0,
        tierBoost,
        rankReason: moodBreakdown?.rankReason || `Ingredient-led pantry match, ingredientScore=${ingredientMatchScore}`,
        tierKey: tier.key,
        tierLabel: tier.label,
        unlockIngredient,
        mealTypeBonus,
        moodScore,
        recipePopularity,
        matchedPrimaryCount,
        requiredPrimaryCount,
        matchedPrimary: matchedPrimaryNames,
        matchedSecondary: secondaryMatches.map((name) => formatIngredientName(name)),
        missingPrimary: [...new Set(missingPrimary)],
        classification: classifyIngredientMatch(ingredientMatchScore),
        discoveryScore: discovery,
        userPreferenceScore: preference,
        comfortScore: comfort,
        quickMealScore: quick
      };
    })
    .filter((item) => {
      const included = item.ingredientMatchScore > 0
        && (!activeMood() || item.moodTier !== MoodTier.EXCLUDE);
      if (window.COOKBUDDY_DEBUG_MATCHING) {
        console.log('[Tomo ingredient match]', {
          recipe: item.recipe.title,
          mood: labelForMood(activeMood()),
          moodTier: item.moodTier,
          primaryIngredients: explicitPrimaryIngredients(item.recipe).slice(0, 2),
          secondaryIngredients: explicitSecondaryIngredients(item.recipe),
          matchedPrimaryCount: item.matchedPrimaryCount,
          required: item.requiredPrimaryCount,
          ingredientMatchScore: item.ingredientMatchScore,
          moodScore: item.moodScore,
          pantryScore: item.pantryScore,
          mealTypeScore: item.mealTypeScore,
          tierBoost: item.tierBoost,
          finalScore: item.finalScore,
          primaryMatch: `${item.primaryMatchPercent}%`,
          secondaryMatch: `${item.secondaryMatchCount}/${item.secondaryTotal}`,
          overallMatch: `${item.overallMatchPercent}%`,
          rankingScore: item.rankingScore,
          tier: item.tierLabel,
          rankReason: item.rankReason,
          reason: included ? 'Included' : activeMood() && item.moodTier === MoodTier.EXCLUDE ? 'Excluded: Mood tier is EXCLUDE' : 'Excluded: No primary or secondary ingredient signal'
        });
      }
      return included;
    });
  return dedupeRecommendationMatches(matches)
    .sort((a, b) => {
      return b.finalScore - a.finalScore
        || moodTierOrder[b.moodTier] - moodTierOrder[a.moodTier]
        || b.moodScore - a.moodScore
        || b.ingredientMatchScore - a.ingredientMatchScore
        || Number(b.recipe.comfortScore || 0) - Number(a.recipe.comfortScore || 0)
        || a.recipe.title.localeCompare(b.recipe.title);
    });
}

function ingredientMatches() {
  return weightedIngredientMatches().map((item) => item.recipe);
}

function tomoMatchCopy(match) {
  const title = match.recipe.title;
  if (match.overallMatchPercent >= 100) return `🍅 You already have everything for ${title}.`;
  if (match.tierKey === 'top') return getTomoMessage({ context: 'results_found', resultType: 'top', recipeName: title });
  if (match.tierKey === 'close') return getTomoMessage({ context: 'results_found', resultType: 'close', recipeName: title });
  if (match.tierKey === 'add-one' || match.tierKey === 'partial') {
    return getTomoMessage({
      context: 'add_more_ingredient',
      missingIngredient: match.unlockIngredient || 'one more ingredient',
      recipeName: title
    });
  }
  if (match.primaryMatchPercent >= 100) return `🍅 You have the core ingredients for ${title}.`;
  if (match.missingPrimary.length === 1) {
    return getTomoMessage({ context: 'add_more_ingredient', missingIngredient: match.missingPrimary[0], recipeName: title });
  }
  if ((match.recipe.tags || []).includes('quick') || (match.recipe.tags || []).includes('quick-meal')) return `🍅 ${title} looks like an easy win today.`;
  return `🍅 ${title} is close with what you have.`;
}

function matchBadge(match) {
  return `${match.tierLabel} • ${match.overallMatchPercent}%`;
}

function pantryMoodBonus(recipe) {
  const mood = activeMood();
  if (!mood) return 0;
  if (mood === 'comfort') return Number(recipe.comfortScore || 0);
  if (mood === 'protein') return Number(recipe.proteinScore || 0);
  if (mood === 'rainy') return Number(recipe.rainyDayScore || recipe.rainy_day_score || 0);
  if (mood === 'quick') return quickMealScore(recipe) >= 100 ? 10 : 0;
  if (mood === 'soul') return Number(recipe.soulFoodScore || recipe.soul_food_score || 0);
  if (mood === 'spicy') return recipeMatchesMood(recipe, mood) ? 10 : 0;
  return recipeMatchesMood(recipe, mood) ? 5 : 0;
}

function selectedMoodLabel() {
  return labelForMood(activeMood());
}

function matchReasons(match) {
  const reasons = match.matchedPrimary.map((item) => `✓ Has ${item}`);
  if (match.secondaryMatchCount) {
    reasons.push(`✓ Matches ${match.secondaryMatchCount} extra ingredient${match.secondaryMatchCount === 1 ? '' : 's'}`);
  }
  if (match.moodScore > 0) reasons.push(`✓ Matches ${selectedMoodLabel()}`);
  if (match.mealTypeBonus > 0) reasons.push(`✓ Good for ${mealTitles[state.meal].replace(' ideas', '')}`);
  if (match.recipePopularity > 0) reasons.push('✓ Popular with you');
  if ((match.tierKey === 'add-one' || match.tierKey === 'partial') && match.unlockIngredient) reasons.push(`+ Add ${match.unlockIngredient}`);
  return reasons.slice(0, 5);
}

function matchMetrics(match) {
  return `
    <div class="match-metrics" aria-label="Ingredient match percentage">
      <span><small>Primary Match</small><strong>${match.primaryMatchPercent}%</strong></span>
      <span><small>Secondary Match</small><strong>${match.secondaryMatchCount}/${match.secondaryTotal}</strong></span>
      <span><small>Overall Match</small><strong>${match.overallMatchPercent}%</strong></span>
    </div>
  `;
}

function currentRecipePantryMatch(recipe) {
  if (!state.selectedIngredients.size) return null;
  return weightedIngredientMatches().find((match) => match.recipe.id === recipe.id) || null;
}

function recommendationExplanationMarkup(match) {
  if (!match) return '';
  return `
    <section class="recommendation-explanation detail-recommendation-explanation">
      <span>Recommended because:</span>
      ${matchMetrics(match)}
      <div class="match-reasons">${matchReasons(match).map((reason) => `<span>${reason}</span>`).join('')}</div>
    </section>
  `;
}

function matchSection(title, matches) {
  const section = document.createElement('section');
  section.className = 'weighted-match-section';
  section.innerHTML = `<h3>${title}</h3><div class="weighted-match-list"></div>`;
  const list = section.querySelector('.weighted-match-list');
  matches.forEach((match) => {
    const card = document.createElement('article');
    card.className = 'weighted-match-card';
    card.dataset.recipeId = match.recipe.id;
    const unlockMarkup = (match.tierKey === 'add-one' || match.tierKey === 'partial') && match.unlockIngredient
      ? `<p class="unlock-ingredient">${escapeHtml(getTomoMessage({ context: 'add_more_ingredient', missingIngredient: match.unlockIngredient, recipeName: match.recipe.title }))}</p>`
      : '';
    const missingMarkup = match.overallMatchPercent >= 100
      ? '<p class="everything-available">✅ Everything Available</p>'
      : match.missingPrimary.length
        ? `<div class="missing-ingredients"><span>Missing:</span><ul>${match.missingPrimary.slice(0, 4).map((item) => `<li>${item}</li>`).join('')}</ul></div>`
        : '';
    const matchedMarkup = match.matchedPrimary.length
      ? `<div class="matched-ingredients"><span>Matched:</span><ul>${match.matchedPrimary.slice(0, 4).map((item) => `<li>✓ ${item}</li>`).join('')}</ul></div>`
      : '';
    card.innerHTML = `
      <div>
        <strong>${match.recipe.title}</strong>
        <p>${tomoMatchCopy(match)}</p>
        ${matchMetrics(match)}
        <div class="recommendation-explanation"><span>Recommended because:</span><div class="match-reasons">${matchReasons(match).map((reason) => `<span>${reason}</span>`).join('')}</div></div>
        ${unlockMarkup}
        ${matchedMarkup}
        ${missingMarkup}
      </div>
      <span class="match-badge">${matchBadge(match)}</span>
    `;
    list.appendChild(card);
  });
  return section;
}

function curatedPantryMatches(matches) {
  return matches
    .filter((item) => item.overallMatchPercent >= 50 || item.primaryMatchPercent >= 50)
    .slice(0, 4);
}

function predictedMatchAfterAddingIngredient(match, ingredient) {
  if (!ingredient) return match.overallMatchPercent;
  const primary = explicitPrimaryIngredients(match.recipe).slice(0, 2);
  const secondary = explicitSecondaryIngredients(match.recipe);
  const selected = [...state.selectedIngredients, ingredient];
  const matchedPrimaryCount = primary.filter((name) => selectedMatchesIngredient(selected, name)).length;
  const primaryRatio = primary.length ? matchedPrimaryCount / Math.max(1, primary.length) : 0;
  const hasEveryPrimaryIngredient = primary.length > 0 && matchedPrimaryCount >= primary.length;
  const secondaryMatches = secondary.filter((name) => selectedMatchesIngredient(selected, name));
  const secondaryRatio = secondary.length ? secondaryMatches.length / secondary.length : 1;
  let score = Math.min(100, Math.round((primaryRatio * 80) + (secondary.length ? secondaryRatio * 15 : 0)));
  if (!hasEveryPrimaryIngredient) score = Math.min(49, score);
  return score;
}

function unlockSuggestionEligible(match) {
  if (!match?.unlockIngredient) return false;
  if (match.matchedPrimaryCount < 1) return false;
  const missingPrimary = match.missingPrimary.map(normalizeIngredientName);
  if (!missingPrimary.includes(normalizeIngredientName(match.unlockIngredient))) return false;
  return predictedMatchAfterAddingIngredient(match, match.unlockIngredient) >= 50;
}

function singleUnlockSuggestion(matches) {
  return matches.find((match) => unlockSuggestionEligible(match) && match.ingredientMatchScore < 80)
    || matches.find(unlockSuggestionEligible)
    || null;
}

function commonIngredientPairings(selectedIngredient, matches) {
  const counts = new Map();
  for (const match of matches) {
    const candidates = [...match.missingPrimary];
    for (const ingredient of candidates.slice(0, 3)) {
      const key = normalizeIngredientName(ingredient);
      if (!key) continue;
      counts.set(key, {
        ingredient: formatIngredientName(ingredient),
        count: (counts.get(key)?.count || 0) + 1
      });
    }
  }
  return [...counts.values()]
    .sort((a, b) => b.count - a.count || a.ingredient.localeCompare(b.ingredient))
    .slice(0, 6)
    .map((item) => item.ingredient);
}

function renderSingleIngredientHelper(selected, matches) {
  const ingredient = selected[0];
  const section = document.createElement('section');
  section.className = 'single-ingredient-helper';
  const pairings = commonIngredientPairings(ingredient, matches);
  const potential = matches
    .filter(unlockSuggestionEligible)
    .slice(0, 5);
  section.innerHTML = `
    ${tomoMessageMarkup({ context: 'ingredient_selected', selectedIngredients: selected }, 'preview-empty tomo-banter-line')}
    ${pairings.length ? `
      <div class="ingredient-pairings">
        <h3>Common pairings with ${ingredient}</h3>
        <div>${pairings.map((item) => `<button type="button" data-add-ingredient="${item}">+ ${item}</button>`).join('')}</div>
      </div>
    ` : ''}
    ${potential.length ? `
      <div class="potential-unlocks">
        <h3>Potential dishes you could unlock</h3>
        <ul>${potential.map((match) => `<li><span>${escapeHtml(getTomoMessage({ context: 'add_more_ingredient', missingIngredient: match.unlockIngredient, recipeName: match.recipe.title }))}</span><strong>${escapeHtml(match.recipe.title)}</strong></li>`).join('')}</ul>
      </div>
    ` : ''}
  `;
  return section;
}

function updatePantryTomoMessage(messageOptions) {
  if (!els.pantryTomoMessage) return;
  els.pantryTomoMessage.textContent = getTomoMessage(messageOptions);
}

function renderIngredientResults() {
  const selected = [...state.selectedIngredients];
  const matches = weightedIngredientMatches();
  const curatedMatches = curatedPantryMatches(matches);
  els.selectedCount.textContent = `${selected.length} selected`;
  els.findDishes.classList.remove('hidden');
  els.findDishes.textContent = curatedMatches.length ? `Show ${curatedMatches.length} Dishes` : 'Find Dishes';
  els.ingredientResults.innerHTML = '';
  renderSelectedIngredientTray();
  if (!selected.length) {
    updatePantryTomoMessage({ context: 'pantry_open' });
    els.ingredientResults.innerHTML = tomoMessageMarkup({ context: 'pantry_open' }, 'preview-empty tomo-banter-line');
    return;
  }

  updatePantryTomoMessage({ context: 'ingredient_selected', selectedIngredients: selected });
  if (selected.length === 1) {
    const singleMatches = matches
      .filter((item) => item.ingredientMatchScore > 0)
      .sort((a, b) => b.finalScore - a.finalScore || a.recipe.title.localeCompare(b.recipe.title));
    els.findDishes.textContent = singleMatches.length ? `Show ${Math.min(3, singleMatches.length)} Ideas` : 'Find Dishes';
    els.ingredientResults.appendChild(renderSingleIngredientHelper(selected, singleMatches));
    return;
  }

  if (hasWeirdPantryCombo(selected)) {
    updatePantryTomoMessage({ context: 'empty_state', selectedIngredients: selected });
    els.findDishes.textContent = 'Find Dishes';
    const empty = document.createElement('p');
    empty.className = 'preview-empty tomo-banter-line';
    empty.textContent = getTomoMessage({ context: 'empty_state', selectedIngredients: selected });
    els.ingredientResults.appendChild(empty);
    return;
  }

  const summary = document.createElement('p');
  summary.className = matches.length ? 'match-insight' : 'preview-empty';
  summary.textContent = curatedMatches.length
    ? getTomoMessage({ context: 'results_found', results: curatedMatches })
    : getTomoMessage({ context: 'empty_state', selectedIngredients: selected });
  els.ingredientResults.appendChild(summary);

  if (!curatedMatches.length) return;

  const unlock = singleUnlockSuggestion(curatedMatches);
  if (unlock?.unlockIngredient) {
    const helper = document.createElement('p');
    helper.className = 'single-unlock-suggestion';
    helper.innerHTML = `${escapeHtml(getTomoMessage({ context: 'add_more_ingredient', missingIngredient: unlock.unlockIngredient, recipeName: unlock.recipe.title })).replace(escapeHtml(unlock.unlockIngredient), `<button type="button" data-add-ingredient="${escapeHtml(unlock.unlockIngredient)}">${escapeHtml(unlock.unlockIngredient)}</button>`)}`;
    els.ingredientResults.appendChild(helper);
  }
  els.ingredientResults.appendChild(matchSection('Curated pantry ideas', curatedMatches));
}

function recipeHasSelectedIngredient(recipeIngredients, selectedIngredient) {
  return recipeIngredients.some((item) => selectedCoversIngredient([selectedIngredient], item.name));
}

function mainIngredientNames(recipe) {
  const ingredients = recipe.ingredients || [];
  const mains = ingredients.filter((item) => item.isMain).map((item) => item.name);
  return mains.length ? mains : ingredients.slice(0, 2).map((item) => item.name);
}

function selectedCoversIngredient(selected, ingredient) {
  const selectedNames = selected.map(normalizeIngredientName);
  const ingredientName = normalizeIngredientName(ingredient);
  const selectedAliases = selected.flatMap((name) => ingredientAliases(name)).map(normalizeIngredientName);
  const selectedHasIngredient = (name) => {
    const normalized = normalizeIngredientName(name);
    return selectedNames.includes(normalized) || selectedAliases.includes(normalized);
  };
  if (selectedHasIngredient(ingredientName)) return true;
  const compoundMatch = (window.COOKBUDDY_COMPOUND_INGREDIENT_MATCH_MAP || {})[ingredientName];
  if (compoundMatch?.length) {
    return compoundMatch.every((part) => selectedHasIngredient(part));
  }
  return false;
}

function recipeMainIngredientsCovered(recipe, selected) {
  const required = [...mainIngredientNames(recipe), ...protectedIngredientNames(recipe)];
  return [...new Set(required.map(normalizeIngredientName))].every((ingredient) => selectedCoversIngredient(selected, ingredient));
}

function protectedIngredientNames(recipe) {
  const haystack = `${recipe.title} ${(recipe.ingredients || []).map((item) => item.name).join(' ')}`.toLowerCase();
  return protectedIngredients.filter((ingredient) => haystack.includes(ingredient));
}

function persistGroceryItems() {
  localStorage.setItem('cookbuddy_grocery', JSON.stringify(state.groceryItems));
}

function recipeShoppingIngredients(recipe) {
  const primary = explicitPrimaryIngredients(recipe);
  const fallback = mainIngredientNames(recipe);
  const needed = primary.length ? primary : fallback;
  if (!state.selectedIngredients.size) return needed.map(formatIngredientName);
  return needed
    .filter((ingredient) => !selectedMatchesIngredient([...state.selectedIngredients], ingredient))
    .map(formatIngredientName);
}

function addGroceryItems(ingredients, sourceRecipe = '') {
  const existing = new Map(state.groceryItems.map((item) => [normalizeIngredientName(item.ingredientName), item]));
  ingredients.forEach((ingredient) => {
    const key = normalizeIngredientName(ingredient);
    if (!key) return;
    if (existing.has(key)) {
      existing.get(key).isCompleted = false;
      if (sourceRecipe && !existing.get(key).sourceRecipe) existing.get(key).sourceRecipe = sourceRecipe;
      return;
    }
    const item = {
      id: groceryItemId(ingredient, sourceRecipe),
      ingredientName: formatIngredientName(ingredient),
      sourceRecipe,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };
    state.groceryItems.push(item);
    existing.set(key, item);
  });
  persistGroceryItems();
}

function renderGrocery() {
  state.groceryItems = normalizeGroceryItems(state.groceryItems);
  const pendingCount = state.groceryItems.filter((item) => !item.isCompleted).length;
  els.groceryBadge.textContent = pendingCount;
  els.groceryBadge.classList.toggle('hidden', pendingCount === 0);
  els.groceryList.innerHTML = '';
  if (!state.groceryItems.length) {
    els.groceryList.innerHTML = '<p class="shopping-empty">🍅 Tomo will automatically add missing ingredients from your selected recipes.</p>';
    return;
  }
  state.groceryItems.forEach((item) => {
    const row = document.createElement('article');
    row.className = item.isCompleted ? 'completed' : '';
    row.innerHTML = `
      <button class="shopping-check" data-toggle-grocery="${escapeHtml(item.id)}" type="button" aria-label="${item.isCompleted ? 'Mark not purchased' : 'Mark purchased'}" aria-pressed="${item.isCompleted ? 'true' : 'false'}">${item.isCompleted ? '✓' : ''}</button>
      <span>
        <strong>${escapeHtml(item.ingredientName)}</strong>
        ${item.sourceRecipe ? `<small>From ${escapeHtml(item.sourceRecipe)}</small>` : '<small>Added manually</small>'}
      </span>
      <button class="text-button" data-remove-grocery="${escapeHtml(item.id)}" type="button">Remove</button>
    `;
    els.groceryList.appendChild(row);
  });
}

function recipeSearchText(recipe) {
  return [
    recipe.title,
    recipe.description,
    recipe.tomoLine,
    recipe.dietType,
    (recipe.tags || []).join(' '),
    (recipe.ingredients || []).map((item) => item.name).join(' ')
  ].join(' ').toLowerCase();
}

function collectionSearchText(collection) {
  return [
    collection.title,
    collection.copy,
    collection.subtitle,
    collection.key,
    ((collection.hero || {}).subtitle),
    (collection.items || []).map((item) => `${item.title} ${item.description} ${item.subcategory || ''}`).join(' ')
  ].join(' ').toLowerCase();
}

function searchSection(title, items, emptyCopy = '') {
  if (!items.length && !emptyCopy) return '';
  return `
    <section class="search-result-section">
      <h3>${title}</h3>
      ${items.length ? items.join('') : `<p>${emptyCopy}</p>`}
    </section>
  `;
}

function renderGlobalSearch() {
  if (!els.globalSearchResults) return;
  const query = String(els.globalSearchInput?.value || '').trim().toLowerCase();
  if (!query) {
    els.globalSearchResults.innerHTML = `
      <p class="search-empty">Try a dish, ingredient, or collection. Tomo will look across the kitchen.</p>
      ${searchSection('Popular searches', ['Dosa', 'Paneer', 'Rice', 'Baby food', 'Lunch Box'].map((item) => `
        <button class="search-suggestion" data-fill-search="${escapeHtml(item)}" type="button">${escapeHtml(item)}</button>
      `))}
    `;
    return;
  }

  const dishes = state.recipes
    .filter((recipe) => recipeSearchText(recipe).includes(query))
    .slice(0, 6)
    .map((recipe) => `
      <button class="search-result-row" data-recipe-id="${escapeHtml(recipe.id)}" type="button">
        <span class="search-thumb">${recipeVisual(recipe)}</span>
        <span><strong>${escapeHtml(recipe.title)}</strong><small>${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min • ${(recipe.tags || [])[0] || 'recipe'}</small></span>
      </button>
    `);

  const ingredients = topIngredients()
    .filter((ingredient) => ingredient.toLowerCase().includes(query))
    .slice(0, 8)
    .map((ingredient) => `
      <button class="search-chip-result" data-search-ingredient="${escapeHtml(ingredient)}" type="button">
        <img src="${ingredientImagePath(ingredient)}" alt="" loading="lazy" decoding="async" />
        <span>${escapeHtml(ingredient)}</span>
      </button>
    `);

  const collections = (state.collections || [])
    .filter((collection) => collectionSearchText(collection).includes(query))
    .slice(0, 6)
    .map((collection) => `
      <button class="search-result-row collection-search-row" data-search-collection="${escapeHtml(collection.key)}" type="button">
        <span class="search-thumb collection-thumb">${collection.icon || '🍲'}</span>
        <span><strong>${escapeHtml(collection.title)}</strong><small>${escapeHtml(collection.copy || 'Tomo collection')}</small></span>
      </button>
    `);

  els.globalSearchResults.innerHTML = [
    searchSection('Dishes', dishes, 'No dishes found yet.'),
    searchSection('Ingredients', ingredients, 'No matching ingredients yet.'),
    searchSection('Collections', collections, 'No collections found yet.')
  ].join('');
}

function openGlobalSearch() {
  els.searchDialog?.showModal();
  renderGlobalSearch();
  setTimeout(() => els.globalSearchInput?.focus(), 30);
}

function renderActiveMoodBar() {
  if (!els.activeMoodBar) return;
  const mood = activeMood();
  els.activeMoodBar.classList.toggle('hidden', !mood);
  const message = getTomoMessage({ context: 'mood_selected', mood });
  els.activeMoodBar.innerHTML = mood
    ? `<button class="active-mood-chip active-mood-${mood}" type="button" data-clear-active-mood aria-label="Clear ${escapeHtml(labelForMood(mood))} mood">${escapeHtml(labelForMood(mood))} <span>×</span></button><p class="active-mood-message">${escapeHtml(message)}</p>`
    : '';
}

function renderMood() {
  const mood = moodForCopy();
  els.heroMessage.textContent = '🍅 Tomo';
  renderAmbientCard();
  els.nudgeText.textContent = getTomoMessage({ context: 'mood_selected', mood });
  els.factBanter.textContent = factBanters[Math.abs(mood.charCodeAt(0) + state.meal.length) % factBanters.length];
  document.querySelectorAll('.mood-chip').forEach((button) => {
    button.classList.toggle('active', button.dataset.mood === activeMood());
  });
  renderActiveMoodBar();
}

function renderMeal() {
  els.mealTitle.textContent = mealTitles[state.meal];
  document.querySelectorAll('.meal-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.meal === state.meal);
  });
}

function renderAll() {
  applyBrandConfig();
  els.recipeCount.textContent = `${state.recipes.length} recipes`;
  renderMood();
  renderMeal();
  renderTomoPick();
  renderTodayPicks();
  renderSpecialRows();
  renderIngredients();
  renderIngredientResults();
  renderGrocery();
}

function openRecipe(recipe) {
  state.activeRecipe = recipe;
  recordRecipeInteraction(recipe, 'view');
  const ingredients = recipe.ingredients || [];
  const instructions = recipe.instructions || [];
  const tomoLine = recipe.tomoLine ? `<p class="tomo-detail-line">${recipe.tomoLine}</p>` : '';
  const pantryMatch = currentRecipePantryMatch(recipe);
  const missingShoppingIngredients = recipeShoppingIngredients(recipe);
  const missingShoppingMarkup = missingShoppingIngredients.length
    ? `<section class="missing-shopping-panel">
        <h3>Missing Ingredients</h3>
        <ul>${missingShoppingIngredients.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </section>`
    : state.selectedIngredients.size
      ? '<section class="missing-shopping-panel ready"><h3>✅ Everything Available</h3><p>You have the core ingredients for this dish.</p></section>'
      : '';
  els.recipeDetail.innerHTML = `
    <div class="detail-hero">${recipeEmoji(recipe)}</div>
    <h2>${recipe.title}</h2>
    ${tomoLine}
    <p>${recipe.description}</p>
    <div class="recipe-meta">
      <span class="pill">${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
      <span class="pill">${recipe.difficulty || 'easy'}</span>
      <span class="pill ${recipe.dietType === 'non-vegetarian' ? 'nonveg' : 'veg'}">${recipe.dietType === 'non-vegetarian' ? 'Non-veg' : 'Veg'}</span>
    </div>
    ${recommendationExplanationMarkup(pantryMatch)}
    <div class="detail-list">
      ${ingredients.map((item) => `<div><span>${item.name}</span><small>${item.quantity} ${item.unit}</small></div>`).join('')}
    </div>
    ${missingShoppingMarkup}
    ${
      instructions.length
        ? `<section class="instruction-notes">
            <h3>Cooking notes</h3>
            ${instructions.map((step) => `<p>${step}</p>`).join('')}
          </section>`
        : ''
    }
    <div class="detail-actions">
      <button class="primary-button" id="cookFromDetail">👨‍🍳 Cook This</button>
      ${missingShoppingIngredients.length ? '<button class="secondary-button" id="addMissing">➕ Add Missing Ingredients</button>' : ''}
    </div>
  `;
  els.recipeDialog.showModal();
}

async function loadRecipes() {
  try {
    const [recipeData, collectionData] = await Promise.all([
      api('/api/recipes'),
      api('/api/collections')
    ]);
    state.recipes = recipeData.recipes || [];
    state.collections = collectionData.collections || [];
    state.collectionDetails.clear();
    state.expandedCollectionRows.clear();
    state.activeCollectionSubcategories.clear();
    els.recipeNotice.classList.add('hidden');
  } catch (error) {
    els.recipeNotice.textContent = error.message;
    els.recipeNotice.classList.remove('hidden');
  }
  renderAll();
}

document.querySelectorAll('.mood-chip').forEach((button) => {
  button.addEventListener('click', () => {
    state.activeMood = button.dataset.mood;
    state.mood = button.dataset.mood;
    state.featuredRecipeId = null;
    state.revealedPickId = null;
    renderMood();
    renderMeal();
    renderTomoPick();
    transitionTodayPicks();
    renderIngredientResults();
  });
});

els.activeMoodBar?.addEventListener('click', (event) => {
  const clearButton = event.target.closest('[data-clear-active-mood]');
  if (!clearButton) return;
  state.activeMood = null;
  state.mood = 'comfort';
  state.featuredRecipeId = null;
  state.revealedPickId = null;
  renderMood();
  renderMeal();
  renderTomoPick();
  transitionTodayPicks();
  renderIngredientResults();
});

document.querySelectorAll('.meal-tab').forEach((button) => {
  button.addEventListener('click', () => {
    state.meal = button.dataset.meal;
    state.featuredRecipeId = null;
    state.revealedPickId = null;
    renderMood();
    renderMeal();
    renderTomoPick();
    transitionTodayPicks();
    renderIngredientResults();
  });
});

els.ingredientChips.addEventListener('click', (event) => {
  const button = event.target.closest('[data-ingredient]');
  if (!button) return;
  const ingredient = button.dataset.ingredient;
  if (state.selectedIngredients.has(ingredient)) {
    state.selectedIngredients.delete(ingredient);
  } else if (state.selectedIngredients.size >= 4) {
    toast('Pick up to 4 ingredients for the clearest matches.');
    return;
  } else {
    state.selectedIngredients.add(ingredient);
  }
  state.revealedPickId = null;
  renderIngredients();
  renderIngredientResults();
  renderTomoPick();
});

els.selectedIngredientTray?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-ingredient]');
  if (!button) return;
  state.selectedIngredients.delete(button.dataset.removeIngredient);
  state.revealedPickId = null;
  renderIngredients();
  renderIngredientResults();
  renderTomoPick();
});

els.ingredientResults.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add-ingredient]');
  if (addButton) {
    const ingredient = addButton.dataset.addIngredient;
    if (!state.selectedIngredients.has(ingredient)) {
      if (state.selectedIngredients.size >= 4) {
        toast('Pick up to 4 ingredients for the clearest matches.');
        return;
      }
      state.selectedIngredients.add(ingredient);
    }
    state.revealedPickId = null;
    renderIngredients();
    renderIngredientResults();
    renderTomoPick();
    return;
  }
  const card = event.target.closest('[data-recipe-id]');
  if (!card) return;
  const recipe = state.recipes.find((item) => item.id === card.dataset.recipeId);
  if (recipe) openRecipe(recipe);
});

els.ingredientSearch?.addEventListener('input', (event) => {
  state.ingredientSearch = event.target.value;
  if (state.ingredientSearch.trim()) state.ingredientsExpanded = true;
  renderIngredients();
});

els.findDishes.addEventListener('click', renderIngredientResults);
if (els.surpriseButton) {
  els.surpriseButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!state.revealedPickId) surpriseMe();
  });
}
els.heroFindAnother?.addEventListener('click', (event) => {
  event.stopPropagation();
  revealTomoPick(true);
});

els.clearIngredients.addEventListener('click', () => {
  state.selectedIngredients.clear();
  state.revealedPickId = null;
  renderIngredients();
  renderIngredientResults();
  renderTomoPick();
});

document.body.addEventListener('click', (event) => {
  const fillSearch = event.target.closest('[data-fill-search]');
  if (fillSearch) {
    els.globalSearchInput.value = fillSearch.dataset.fillSearch;
    renderGlobalSearch();
    els.globalSearchInput.focus();
    return;
  }
  const searchIngredient = event.target.closest('[data-search-ingredient]');
  if (searchIngredient) {
    state.selectedIngredients.add(searchIngredient.dataset.searchIngredient);
    state.revealedPickId = null;
    renderIngredients();
    renderIngredientResults();
    renderTomoPick();
    els.searchDialog?.close();
    els.pantryDialog.showModal();
    document.querySelector('.cook-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast(`${searchIngredient.dataset.searchIngredient} added to kitchen picks.`);
    return;
  }
  const searchCollection = event.target.closest('[data-search-collection]');
  if (searchCollection) {
    state.activeCollection = searchCollection.dataset.searchCollection;
    els.searchDialog?.close();
    renderSpecialRows();
    document.querySelector('.special-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    loadCollectionDetail(state.activeCollection);
    return;
  }
  const action = event.target.closest('[data-recipe-action]');
  if (action) {
    event.stopPropagation();
    const recipe = state.recipes.find((item) => item.id === action.dataset.recipeId);
    if (!recipe) return;
    handleRecipeAction(action.dataset.recipeAction, recipe);
    return;
  }
  const card = event.target.closest('[data-recipe-id]');
  if (card) {
    const recipe = state.recipes.find((item) => item.id === card.dataset.recipeId);
    if (recipe) {
      els.searchDialog?.close();
      openRecipe(recipe);
    }
  }
  const remove = event.target.closest('[data-remove-grocery]');
  if (remove) {
    state.groceryItems = state.groceryItems.filter((item) => item.id !== remove.dataset.removeGrocery);
    persistGroceryItems();
    renderGrocery();
    return;
  }
  const toggleGrocery = event.target.closest('[data-toggle-grocery]');
  if (toggleGrocery) {
    const item = state.groceryItems.find((entry) => entry.id === toggleGrocery.dataset.toggleGrocery);
    if (item) item.isCompleted = !item.isCompleted;
    persistGroceryItems();
    renderGrocery();
    return;
  }
  if (event.target.id === 'cookFromDetail' && state.activeRecipe) {
    recordCookedRecipe(state.activeRecipe);
    els.recipeDialog.close();
    toast(`${state.activeRecipe.title} added to your Tomo Journal.`);
    return;
  }
  if (event.target.id === 'addMissing' && state.activeRecipe) {
    const additions = recipeShoppingIngredients(state.activeRecipe);
    addGroceryItems(additions, state.activeRecipe.title);
    renderGrocery();
    toast(additions.length ? 'Tomo added the missing ingredients.' : 'You already have the core ingredients.');
    return;
  }
  const journalAction = event.target.closest('[data-journal-action]');
  if (journalAction) {
    if (journalAction.dataset.journalAction === 'explore') {
      document.querySelector('.meal-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast('Pick a dish and tap Cook Now to start your journal.');
    } else {
      openJournalRoute();
    }
    return;
  }
  const seeMore = event.target.closest('[data-see-more]');
  if (seeMore) {
    const key = seeMore.dataset.seeMore;
    state.expandedCollections.has(key) ? state.expandedCollections.delete(key) : state.expandedCollections.add(key);
    renderSpecialRows();
  }
  const browseIngredients = event.target.closest('[data-browse-ingredients]');
  if (browseIngredients) {
    state.ingredientsExpanded = !state.ingredientsExpanded;
    renderIngredients();
    return;
  }
  const selectSubcategory = event.target.closest('[data-select-subcategory]');
  if (selectSubcategory) {
    const [collectionKey, ...nameParts] = selectSubcategory.dataset.selectSubcategory.split('::');
    state.activeCollectionSubcategories.set(collectionKey, nameParts.join('::'));
    renderSpecialRows();
    return;
  }
  const seeSubcategory = event.target.closest('[data-see-subcategory]');
  if (seeSubcategory) {
    const key = seeSubcategory.dataset.seeSubcategory;
    state.expandedCollectionRows.has(key) ? state.expandedCollectionRows.delete(key) : state.expandedCollectionRows.add(key);
    renderSpecialRows();
    return;
  }
  const collectionFace = event.target.closest('[data-collection-key]');
  if (collectionFace) {
    state.activeCollection = collectionFace.dataset.collectionKey;
    renderSpecialRows();
    loadCollectionDetail(state.activeCollection);
  }
  const collectionToggle = event.target.closest('[data-toggle-collections]');
  if (collectionToggle) {
    state.collectionsOpen = !state.collectionsOpen;
    renderSpecialRows();
  }
});

function handleRecipeAction(action, recipe) {
  if (action === 'favorite') {
    const wasFavorite = state.favoriteIds.has(recipe.id);
    state.favoriteIds.has(recipe.id) ? state.favoriteIds.delete(recipe.id) : state.favoriteIds.add(recipe.id);
    if (!wasFavorite) recordRecipeInteraction(recipe, 'save');
    localStorage.setItem('cookbuddy_favorites', JSON.stringify([...state.favoriteIds]));
    transitionTodayPicks();
    toast(state.favoriteIds.has(recipe.id) ? 'Saved as favorite.' : 'Removed from favorites.');
    return;
  }
  if (action === 'later') {
    state.laterIds.add(recipe.id);
    localStorage.setItem('cookbuddy_later', JSON.stringify([...state.laterIds]));
    transitionTodayPicks();
    toast('Saved for later. Tomo found another option.');
    return;
  }
  if (action === 'cook') {
    recordCookedRecipe(recipe);
    openRecipe(recipe);
    toast(`${recipe.title} added to your Tomo Journal.`);
  }
}

els.closeRecipe.addEventListener('click', () => els.recipeDialog.close());
els.closeJournal?.addEventListener('click', closeJournalRoute);
els.groceryButton.addEventListener('click', () => els.groceryDialog.showModal());
els.searchButton.addEventListener('click', openGlobalSearch);
els.closeSearch?.addEventListener('click', () => els.searchDialog.close());
els.globalSearchInput?.addEventListener('input', renderGlobalSearch);
els.pantryNavButton.addEventListener('click', () => {
  updatePantryTomoMessage({ context: state.selectedIngredients.size ? 'ingredient_selected' : 'pantry_open', selectedIngredients: [...state.selectedIngredients] });
  renderIngredientResults();
  els.pantryDialog.showModal();
});
els.closePantry.addEventListener('click', () => els.pantryDialog.close());
els.closeGrocery.addEventListener('click', () => els.groceryDialog.close());
els.clearPurchased?.addEventListener('click', () => {
  const before = state.groceryItems.length;
  state.groceryItems = state.groceryItems.filter((item) => !item.isCompleted);
  persistGroceryItems();
  renderGrocery();
  toast(before === state.groceryItems.length ? 'No purchased items to clear.' : 'Purchased items cleared.');
});
els.groceryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(els.groceryForm);
  const item = String(form.get('item') || '').trim();
  if (!item) return;
  addGroceryItems([item], '');
  els.groceryForm.reset();
  renderGrocery();
});

document.querySelectorAll('[data-pantry-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const messages = {
      voice: 'Voice pantry capture is ready for prototype testing.',
      scanner: 'Scanner flow will identify items from a camera/photo next.',
      manual: 'Manual add is available in Tomo’s Shopping List for now.'
    };
    toast(messages[button.dataset.pantryAction]);
  });
});

window.addEventListener('popstate', () => {
  if (window.location.pathname === '/journal') openJournalRoute(false);
  else els.journalDialog?.close();
});

loadRecipes();
if (window.location.pathname === '/journal') {
  setTimeout(() => openJournalRoute(false), 0);
}
