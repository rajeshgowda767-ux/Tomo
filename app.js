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
  collectionScrollLeft: 0,
  collectionsOpen: false,
  ingredientsExpanded: false,
  ingredientSearch: '',
  pantryView: 'dashboard',
  recipeReturnContext: null,
  liveWeather: null,
  weatherLoading: false
};

let picksTransitionTimer = null;
let pantryResultsTransitionTimer = null;
let pantrySelectionRenderFrame = null;
const pantryUnlockCache = new Map();

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
  comfort: 'Comfort is calling today 🍅',
  rainy: 'Rainy weather needs something warm 🌧️',
  quick: "Let's keep it easy today ⚡",
  protein: 'Something filling sounds right 💪',
  soul: 'Food that feels like home today 💗',
  spicy: 'Something spicy might hit the spot 🔥'
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
  return (selected.includes('apple') && selected.includes('fish'))
    || (selected.includes('milk') && selected.includes('tamarind'));
}

function formatTomoMessage(message) {
  return String(message || '').trim().startsWith('🍅') ? message : `🍅 ${message}`;
}

function noStrongPantryPrompt() {
  return 'No strong match yet. Try adding onion, chilli, garlic, or curry leaves.';
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
    return formatTomoMessage('What’s in your kitchen today? Pick your ingredients and I’ll suggest real dishes.');
  }

  if (context === 'ingredient_selected') {
    const count = selectedIngredients.length;
    if (count === 1) return formatTomoMessage(cachedPantryUnlockMessage(selectedIngredients) || 'Checking real recipe paths...');
    if (count === 2) return formatTomoMessage('Good combo. I found a few dishes you can make with this.');
    if (count >= 3) return formatTomoMessage('Now we’re cooking. These matches look stronger.');
    return getTomoMessage({ context: 'pantry_open' });
  }

  if (context === 'results_found') {
    if (resultType === 'top') return formatTomoMessage('Strong match. You have the key ingredients.');
    if (resultType === 'close') return formatTomoMessage('Almost there. Add one more ingredient for a better match.');
    if (results.length) return formatTomoMessage(`I found ${results.length} good ${results.length === 1 ? 'idea' : 'ideas'} from your kitchen.`);
    return formatTomoMessage('Best match from your kitchen.');
  }

  if (context === 'add_more_ingredient') {
    if (missingIngredient && recipeName) return formatTomoMessage(`Add ${missingIngredient} to unlock ${recipeName}.`);
    if (missingIngredient) return formatTomoMessage(`Add ${missingIngredient} to unlock a better match.`);
    return formatTomoMessage('Add one more main ingredient and I’ll sharpen the suggestions.');
  }

  if (context === 'empty_state') {
    if (reason === 'mood_fewer') return '';
    if (hasWeirdPantryCombo(selectedIngredients)) return formatTomoMessage(noStrongPantryPrompt());
    return formatTomoMessage(noStrongPantryPrompt());
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

const mealLabels = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snacks'
};

const moodMealSubtitles = {
  comfort: '3 dishes Tomo picked for your mood',
  rainy: 'Warm bites for slow weather',
  quick: 'Fast meals that still feel good',
  protein: 'Filling picks for your day',
  soul: 'Food that feels like home',
  spicy: 'Bold flavors for today'
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
  clearMoodButton: document.querySelector('#clearMoodButton'),
  todayPicks: document.querySelector('#todayPicks'),
  kitchenJournal: document.querySelector('#kitchenJournal'),
  selectedCount: document.querySelector('#selectedCount'),
  surpriseButton: document.querySelector('#surpriseButton'),
  tomoHero: document.querySelector('.cb-dashboard-hero'),
  specialRows: document.querySelector('#specialRows'),
  factBanter: document.querySelector('#factBanter'),
  recipeNotice: document.querySelector('#recipeNotice'),
  ingredientChips: document.querySelector('#ingredientChips'),
  ingredientResults: document.querySelector('#ingredientResults'),
  ingredientSearch: document.querySelector('#ingredientSearch'),
  pantryInsightBanner: document.querySelector('#pantryInsightBanner'),
  pantryBestMatch: document.querySelector('#pantryBestMatch'),
  pantryTomoMessage: document.querySelector('#pantryTomoMessage'),
  selectedIngredientTray: document.querySelector('#selectedIngredientTray'),
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
  pantryModalTitle: document.querySelector('#pantryModalTitle'),
  pantryModalSubtitle: document.querySelector('#pantryModalSubtitle'),
  pantrySuggestions: document.querySelector('#pantrySuggestions'),
  journalNavButton: document.querySelector('#journalNavButton'),
  journalDialog: document.querySelector('#journalDialog'),
  journalDetail: document.querySelector('#journalDetail'),
  closeJournal: document.querySelector('#closeJournal'),
  journalGotIt: document.querySelector('#journalGotIt'),
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
  ['andhra podi idli', 'dishes/andhra-podi-idli-homestyle', 'andhra podi idli'],
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
    'andhra podi idli': 'dishes/andhra-podi-idli-homestyle',
    avalakki: 'dishes/avalakki-homestyle',
    'besan chilla': 'dishes/besan-chilla-homestyle',
    'bread omelette': 'dishes/bread-omelette-homestyle',
    dosa: 'dishes/dosa-homestyle',
    'spicy masala dosa': 'dishes/dosa-homestyle',
    'gunpowder idli': 'dishes/gunpowder-idli',
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
const pantryStrongMatchThreshold = 80;

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
    'rice porridge',
    'soft idli',
    'idli',
    'khichdi',
    'pongal',
    'aloo paratha',
    'dosa',
    'masala dosa',
    'coconut rice',
    'puliyogare',
    'sambar rice',
    'chole chawal',
    'rajma chawal',
  ],
  rainy: [
    'khichdi',
    'pepper rasam',
    'rasam rice',
    'sambar rice',
    'pongal',
    'upma',
    'masala dosa',
    'vegetable soup',
    'mushroom soup',
    'corn soup',
    'masala chai',
    'pakora',
    'bread pakora',
    'mirchi bajji',
    'bonda',
  ],
  spicy: [
    'andhra chicken curry',
    'pepper rasam',
    'gunpowder idli',
    'kaaram dosa',
    'mirchi bajji',
    'andhra kodi vepudu',
    'guntur chicken fry',
    'chicken 65',
    'chilli chicken',
    'chilli paneer',
    'chicken chettinad',
    'chicken 555',
    'chicken majestic',
    'dragon chicken',
    'andhra egg fry',
    'mirapakaya bajji',
    'spicy aloo paratha',
  ],
  protein: [
    'egg curry',
    'egg bhurji',
    'egg toast',
    'egg fried rice',
    'chicken curry',
    'chicken fried rice',
    'chilli chicken',
    'chicken stew',
    'chicken chettinad',
    'fish curry',
    'fish fry',
    'paneer bhurji',
    'palak paneer',
    'kadai paneer',
    'matar paneer',
    'paneer paratha',
    'paneer dosa',
    'egg dosa',
    'rajma chawal',
    'chole chawal',
    'dal makhani'
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

const moodHardExcludes = {
  soul: new Set([
    'spicy aloo paratha',
    'spicy masala dosa',
    'gunpowder idli',
    'kaaram dosa'
  ]),
  protein: new Set([
    'ladoo',
    'bonda',
    'pakora',
    'bread pakora',
    'mirchi bajji',
    'mirapakaya bajji'
  ])
};

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

function explicitMoodKeys(recipe, field) {
  return new Set((recipe[field] || [])
    .map((value) => moodKeyFromLabel(value) || normalizeIngredientName(value))
    .map((value) => value === 'rainy day' ? 'rainy' : value)
    .filter(Boolean));
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
    ...(recipe.aliases || []),
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
  const title = titleText(recipe);
  if (moodHardExcludes[mood]?.has(title)) return MoodTier.EXCLUDE;
  if (Array.isArray(recipe.moodTags) && recipe.moodTags.length === 0) return MoodTier.EXCLUDE;
  if (explicitMoodKeys(recipe, 'moodExcludes').has(mood)) return MoodTier.EXCLUDE;
  if (moodCoreTitles[mood]?.has(title)) return MoodTier.CORE;
  if (explicitMoodKeys(recipe, 'moodIncludes').has(mood)) return MoodTier.SUPPORT;
  const tags = normalizedRecipeTags(recipe);
  const text = normalizedRecipeText(recipe);
  const time = recipeTotalTime(recipe);
  const comfort = Number(recipe.comfortScore || 0);
  const protein = Number(recipe.proteinScore || 0);
  const rainy = Number(recipe.rainyDayScore || 0);
  const nostalgia = Number(recipe.nostalgiaScore || 0);
  const home = Number(recipe.homeStyleScore || 0);
  const effort = Number(recipe.effortScore || 5);
  const inMood = recipeHasMoodMembership(recipe, mood);
  const signature = signatureIndex(recipe, mood) >= 0;
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

function rainyDayVarietyTop(sorted) {
  if (activeMood() !== 'rainy') return sorted;
  const rotatingSnackTitles = new Set([
    'pakora',
    'bread pakora',
    'mirchi bajji',
    'mirapakaya bajji',
    'fish pakora',
    'paneer pakora'
  ]);
  const picked = [];
  let rotatingSnackCount = 0;
  for (const recipe of sorted) {
    if (!rotatingSnackTitles.has(titleText(recipe))) {
      picked.push(recipe);
      continue;
    }
    if (rotatingSnackCount < 2) {
      picked.push(recipe);
      rotatingSnackCount += 1;
    }
  }
  return picked;
}

function sortForMood(recipes) {
  const mood = activeMood();
  const feedRecipes = recipes.filter((recipe) => !recipeExcludedFromDefaultFeeds(recipe));
  if (!mood) return familyCappedVisibleList(feedRecipes);
  const candidates = moodCandidatePool(feedRecipes, mood);
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
  const balanced = uniqueRecipeFamilies(familyCappedVisibleList(rainyDayVarietyTop(diversityBalancedTop(sorted))));
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
  const mealPool = state.recipes
    .filter((recipe) => !recipeExcludedFromDefaultFeeds(recipe))
    .filter((recipe) => recipeMatchesMealForMoodView(recipe, state.meal));
  const mealMatches = sortForMood(mealPool);
  if (els.recipeNotice) {
    els.recipeNotice.textContent = '';
    els.recipeNotice.classList.remove('mood-helper');
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

function openJournalRoute() {
  els.journalDialog?.showModal();
}

function closeJournalRoute() {
  els.journalDialog?.close();
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

function refreshTodayPicks() {
  renderMood();
  renderMeal();
  renderTomoPick();
  transitionTodayPicks();
  renderIngredientResults();
}

function resetMoodSelection() {
  state.activeMood = null;
  state.mood = 'comfort';
  state.featuredRecipeId = null;
  state.revealedPickId = null;
  refreshTodayPicks();
}

function transitionTodayPicks() {
  clearTimeout(picksTransitionTimer);
  if (!els.todayPicks || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderTodayPicks();
    return;
  }
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  els.todayPicks.classList.add('is-swapping');
  picksTransitionTimer = setTimeout(() => {
    renderTodayPicks();
    window.scrollTo(scrollX, scrollY);
    requestAnimationFrame(() => {
      els.todayPicks.classList.remove('is-swapping');
    });
  }, 120);
}

function featuredCandidates() {
  const pool = state.recipes
    .filter((recipe) => !recipeExcludedFromDefaultFeeds(recipe))
    .filter((recipe) => recipeMatchesMealForMoodView(recipe, state.meal));
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
  return reasons.slice(0, 2);
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
  const revealedPick = state.recipes.find((recipe) => recipe.id === state.revealedPickId);
  const paneerSandwich = state.recipes.find((recipe) => /paneer sandwich/i.test(recipe.title || ''));
  const featuredPick = state.recipes.find((recipe) => recipe.id === state.featuredRecipeId);
  const pick = revealedPick || paneerSandwich || featuredPick || featuredCandidates()[0];
  els.tomoHero?.classList.toggle('revealed', Boolean(revealedPick));
  els.surpriseButton.classList.toggle('revealed', Boolean(revealedPick));
  els.surpriseButton.dataset.recipeId = '';
  els.surpriseButton.setAttribute('aria-label', revealedPick ? `${pick?.title || "Tomo's pick"} revealed` : "Reveal Tomo's pick");
  els.surpriseButton.innerHTML = revealedPick
    ? `<div id="heroRevealDish" class="cb-dashboard-reveal">
        <span class="cb-dashboard-mini-image">${recipeVisual(pick)}</span>
        <span class="cb-dashboard-reveal-copy"><strong>${escapeHtml(pick.title)}</strong><small>${recipeTotalTime(pick)} mins • ${escapeHtml(moodPill(pick))}</small></span>
        <span class="cb-dashboard-actions">
          <button id="heroCookNow" class="cb-dashboard-primary" type="button" data-recipe-id="${escapeHtml(pick.id)}">Cook Now</button>
          <button id="heroFindAnother" class="cb-dashboard-secondary" type="button">Another Pick</button>
        </span>
      </div>`
    : `<img src="${localPath('/tomo.png')}" alt="" /><span>Tap to reveal</span>`;
  if (els.heroMessage) els.heroMessage.textContent = '';
  if (els.heroPickTitle) els.heroPickTitle.textContent = 'Looks like comfort is calling today. I’ll find something warm, familiar, and easy to love.';
  if (els.heroPickReasons) {
    els.heroPickReasons.classList.add('hidden');
    els.heroPickReasons.innerHTML = '';
  }
  if (els.heroCookNow) {
    els.heroCookNow.dataset.recipeId = pick ? pick.id : '';
    els.heroCookNow.dataset.recipeAction = 'cook';
    els.heroCookNow.classList.toggle('hidden', !revealedPick);
  }
  if (els.heroFindAnother) {
    els.heroFindAnother.classList.toggle('hidden', !revealedPick);
    els.heroFindAnother.textContent = 'Another Pick';
  }
}

function ambientContext() {
  const now = new Date();
  const hour = now.getHours();
  const mood = moodForCopy();
  if (state.liveWeather) {
    const weather = state.liveWeather;
    let hint = 'A good day for something comforting 🍲';
    if (weather.code >= 51 && weather.code <= 82) hint = 'Rainy weather calls for something warm 🌧️';
    else if (weather.code >= 95) hint = 'Stormy weather calls for a cozy kitchen ⛈️';
    else if (weather.temperature >= 30) hint = 'Maybe something light and cooling 🥛';
    else if (weather.temperature <= 16) hint = 'A warm bowl would feel good today 🍲';
    else if (hour >= 5 && hour < 11) hint = 'Fresh morning for an easy breakfast ☀️';
    else if (hour >= 22 || hour < 4) hint = 'Late-night cravings activated 🌙';

    return {
      time: now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      datetime: now.toISOString(),
      weather: `${Math.round(weather.temperature)}°C • ${weather.condition} ${weather.icon}`,
      hint
    };
  }
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

function weatherCondition(code, isDay) {
  const night = Number(isDay) === 0;
  if (code === 0) return { condition: night ? 'Clear night' : 'Clear sky', icon: night ? '🌙' : '☀️' };
  if (code === 1) return { condition: 'Mostly clear', icon: night ? '🌙' : '🌤️' };
  if (code === 2) return { condition: 'Partly cloudy', icon: '⛅' };
  if (code === 3) return { condition: 'Cloudy', icon: '☁️' };
  if (code === 45 || code === 48) return { condition: 'Foggy', icon: '🌫️' };
  if (code >= 51 && code <= 57) return { condition: 'Drizzle', icon: '🌦️' };
  if (code >= 61 && code <= 67) return { condition: 'Rain', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { condition: 'Snow', icon: '🌨️' };
  if (code >= 80 && code <= 82) return { condition: 'Rain showers', icon: '🌦️' };
  if (code === 85 || code === 86) return { condition: 'Snow showers', icon: '🌨️' };
  if (code >= 95) return { condition: 'Thunderstorm', icon: '⛈️' };
  return { condition: 'Current weather', icon: night ? '🌙' : '🌤️' };
}

function currentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Location is unavailable.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 10 * 60 * 1000,
      timeout: 8000
    });
  });
}

async function loadLiveWeather() {
  if (state.weatherLoading) return;
  const cached = safeJsonParse(sessionStorage.getItem('tomo_live_weather'), null);
  if (cached?.fetchedAt && Date.now() - cached.fetchedAt < 15 * 60 * 1000) {
    state.liveWeather = cached;
    renderAmbientCard();
    return;
  }
  state.weatherLoading = true;
  try {
    const position = await currentPosition();
    const params = new URLSearchParams({
      latitude: String(position.coords.latitude),
      longitude: String(position.coords.longitude),
      current: 'temperature_2m,apparent_temperature,weather_code,is_day',
      timezone: 'auto'
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error('Weather service unavailable.');
    const data = await response.json();
    const current = data.current;
    if (!current) throw new Error('Weather data unavailable.');
    const presentation = weatherCondition(Number(current.weather_code), Number(current.is_day));
    state.liveWeather = {
      temperature: Number(current.temperature_2m),
      apparentTemperature: Number(current.apparent_temperature),
      code: Number(current.weather_code),
      isDay: Number(current.is_day),
      condition: presentation.condition,
      icon: presentation.icon,
      fetchedAt: Date.now()
    };
    sessionStorage.setItem('tomo_live_weather', JSON.stringify(state.liveWeather));
    renderAmbientCard();
    document.querySelector('.cb-dashboard-weather')?.setAttribute('title', 'Live local weather');
  } catch {
    document.querySelector('.cb-dashboard-weather')?.setAttribute('title', 'Live weather needs location permission and an internet connection');
  } finally {
    state.weatherLoading = false;
  }
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
  const ageLabel = collectionAgeLabel(item.region);
  const text = `${item.title || ''} ${item.subcategory || item.subCategory || ''} ${(item.tags || []).join(' ')}`.toLowerCase();
  const title = String(item.title || '').toLowerCase();
  const time = Number(item.time || item.timeMinutes || item.prep_time_mins || 0);
  const quickTime = time && time <= 20 ? `${time} mins` : '';
  const result = (attribute, reason) => ({
    attribute,
    reason: collectionReasonLine(item, collectionKey, reason)
  });

  if (lowerKey === 'baby') {
    if (/banana|apple|pear|puree|mash/.test(text)) return result(ageLabel || '6+ Months', 'Soft texture for easy feeding days.');
    if (/ragi|oats|suji|porridge/.test(text)) return result(ageLabel || '8+ Months', 'Gentle bowl that keeps tiny tummies full.');
    if (/khichdi|moong|curd|kheer/.test(text)) return result(ageLabel || '8+ Months', 'Mild, familiar and simple to digest.');
    if (/idli|dosa|finger|little|plate/.test(text)) return result(ageLabel || '1 Year+', 'Small bites for confident little eaters.');
    return result(ageLabel || '6+ Months', 'A gentle option for early meal routines.');
  }
  if (lowerKey === 'lunchbox') {
    if (/paneer|egg|besan/.test(text)) return result('High Protein', 'Keeps kids full through a busy school day.');
    if (/roll|wrap|sandwich/.test(title)) return result('Lunch Box', 'Neat to pack and easy to eat on the go.');
    if (/rice|idli|paratha|uttapam/.test(title)) return result('School Lunch', 'Travels well without needing extra fuss.');
    if (/chaat|cutlet|pancake/.test(title)) return result('After School', 'A quick bite for hungry evenings.');
    return result(quickTime || 'Busy Day', 'Keeps school lunch simple without extra fuss.');
  }
  if (lowerKey === 'drinks') {
    if (/tender coconut|kokum|panna|sherbet|lassi|rose|buttermilk/.test(text)) return result('Best Cold', 'Cooling and light for warm afternoons.');
    if (/kashaya|ajwain|jeera|tulsi|ginger|remed/.test(text)) return result('Immunity', 'A soothing sip when the body needs care.');
    if (/badam|ragi|milk|nourishing/.test(text)) return result('Filling', 'Comforting enough to feel like a small meal.');
    if (/chai|coffee/.test(text)) return result('Best Hot', 'A cozy cup for slow evening breaks.');
    return result('Soothing', 'Easy to sip when you want something gentle.');
  }
  if (lowerKey === 'salads') {
    if (/sprout|chickpea|rajma|paneer|lentil|protein/.test(text)) return result('Meal Prep', 'Stays filling without feeling too heavy.');
    if (/cucumber|watermelon|fruit|summer/.test(text)) return result('Best Cold', 'Naturally cooling and refreshing.');
    if (/kosambari|kachumber|regional/.test(text)) return result('No Cook', 'Fresh side that comes together quickly.');
    if (/carrot|corn|green gram|millet/.test(text)) return result('Light Dinner', 'Useful when you want something easy and fresh.');
    return result('Fresh Pick', 'Adds crunch and brightness to the plate.');
  }
  if (lowerKey === 'desserts') {
    if (/modak|ladoo|katli|jalebi|mysore|festival/.test(text)) return result('Family Favorite', 'Made for sharing during happy gatherings.');
    if (/kheer|payasam|rasmalai|basundi|shrikhand|milk/.test(text)) return result('Best Cold', 'A slow, nostalgic sweet after meals.');
    if (/sheera|kesari|burfi|quick/.test(text)) return result(quickTime || 'Beginner', 'Simple sweet fix for sudden cravings.');
    return result('Weekend', 'A small homemade ending to the day.');
  }
  if (lowerKey === 'soups') {
    if (/tomato/.test(title)) return result(quickTime || 'Best Hot', 'Perfect for chilly evenings.');
    if (/sweet corn|corn/.test(title)) return result('Kid Friendly', 'A comforting bowl kids usually enjoy.');
    if (/pepper|rasam|ginger|rainy/.test(text)) return result('Immunity', 'Warm, peppery and good for dull days.');
    if (/chicken|dal|lentil|egg|protein/.test(text)) return result('High Protein', 'Filling enough for a light dinner.');
    if (/mushroom|vegetable|regional/.test(text)) return result('One Pot', 'Light, warm and quick to make.');
    return result('Best Hot', 'A cozy bowl for slower evenings.');
  }
  if (lowerKey === 'festival') {
    if (/diwali|ladoo|katli|mysore|sweet/.test(text)) return result('Festival', 'A familiar sweet for celebration plates.');
    if (/onam|sadya|payasam|avial/.test(text)) return result('Traditional', 'Brings a proper festive table feeling.');
    if (/eid|biryani|sheer/.test(text)) return result('Weekend', 'Best when the meal can feel special.');
    if (/ugadi|mango|pachadi/.test(text)) return result('Seasonal', 'Tastes right when the festival mood arrives.');
    return result('Family Style', 'Good for cooking and sharing together.');
  }
  if (/paneer sandwich/.test(title)) return result('High Protein', 'Keeps you full without feeling heavy.');
  if (/quick|15|min/.test(text)) return result(quickTime || 'Quick 15', 'Helpful when you want food without waiting.');
  if (/protein|paneer|egg|chicken|dal|sprout/.test(text)) return result('High Protein', 'Adds substance without complicating dinner.');
  if (/rainy|pakora|bajji|soup|chai/.test(text)) return result('Rainy Day', 'Feels right when the weather slows down.');
  if (/rice|khichdi|porridge|dal/.test(text)) return result('One Pot', 'Simple to make and easy to settle into.');
  if (/sandwich|roll|wrap/.test(text)) return result('Lunch Box', 'Easy to hold, pack and finish.');
  return result('Beginner', 'Straightforward enough for a low-effort day.');
}

function collectionReasonLine(item, collectionKey = '', fallback = '') {
  const title = String(item.title || '').toLowerCase();
  const titleKey = normalizeIngredientName(item.title || '');
  const lowerKey = String(collectionKey || '').toLowerCase();
  const exact = {
    'rice moong khichdi': 'Soft dal-rice comfort for tiny appetites.',
    'ragi porridge': 'Earthy, filling and gentle for mornings.',
    'suji porridge': 'Mild, familiar and made for easy feeding.',
    'oats porridge': 'Creamy and calm for a soft breakfast.',
    'mashed banana': 'Naturally sweet and soft for early bites.',
    'apple puree': 'A smooth little spoonful of soft fruit.',
    'pear puree': 'Gentle fruit sweetness for first tastes.',
    'carrot puree': 'Mild vegetable sweetness in an easy spoon.',
    'sweet potato mash': 'Naturally creamy and filling for little bowls.',
    'pumpkin mash': 'Soft, mellow and easy to swallow slowly.',
    'dal rice mash': 'Dal and rice settle into a gentle meal.',
    'beetroot mash': 'A colorful spoonful for curious little eaters.',
    'avocado mash': 'Creamy texture without much cooking work.',
    'egg yolk mash': 'A small protein boost for growing appetites.',
    'soft idli mash': 'Turns idli into a soft, familiar meal.',
    'vegetable dal mash': 'Dal makes vegetables feel smoother and fuller.',
    'soft chapati milk mash': 'Softens chapati into a comforting little bowl.',
    'vegetable khichdi': 'One soft pot with rice, dal and vegetables.',
    'curd rice': 'Cooling, familiar and easy on the stomach.',
    'moong dal soup': 'Light dal warmth for quieter meal times.',
    'rice kheer baby': 'A mild sweet bowl for tiny celebrations.',
    'mini idli sambar': 'Small idlis make lunch feel easy to finish.',
    'soft dosa': 'Soft edges make dosa easier for little bites.',
    'vegetable upma': 'Warm and steady when breakfast needs speed.',
    'paneer bhurji': 'Soft paneer adds protein without much fuss.',
    'egg bhurji': 'Quick eggs make a small plate more filling.',
    'soft veg pulao': 'Gentle rice with vegetables in every spoon.',
    'dalia porridge': 'Broken wheat keeps breakfast soft and filling.',
    'vegetable seviyan': 'Fine noodles make vegetables easier to enjoy.',
    'baby pongal': 'Soft rice and dal comfort for slow feeding.',
    'poha': 'Stays light but still feels like breakfast.',
    'mini uttapam': 'Small rounds fit neatly into tiffin boxes.',
    'veg seviyan': 'Mild noodles are easy to pack and eat.',
    'bread upma': 'Turns leftover bread into a warm morning win.',
    'rava idli': 'Steams quickly and stays soft in the box.',
    'dosa roll': 'Easy to hold without spilling the filling.',
    'avalakki': 'Soft poha-style flakes work for rushed mornings.',
    'mini idli': 'Tiny bites that rarely come back home.',
    'lemon rice': 'Bright, cheerful and easy to pack for lunch.',
    'tomato rice': 'Tastes good even after a few hours.',
    'aloo paratha': 'Filling enough for a long school day.',
    'peanut rice': 'Nutty rice keeps lunch simple and satisfying.',
    'veg pulao': 'Colorful rice makes lunch feel complete.',
    'chapati jam roll': 'Sweet roll-up treat for small lunch breaks.',
    'paneer roll': 'Protein packed and lunchbox approved.',
    'egg roll': 'A sturdy roll for a longer school day.',
    'paneer bhurji wrap': 'Soft paneer filling stays neat inside a wrap.',
    'besan chilla': 'Besan keeps breakfast light but satisfying.',
    'egg fried rice': 'A quick protein lunch from leftover rice.',
    'chana sundal': 'Small chickpea bites hold up well in boxes.',
    'moong dal cheela': 'Soft cheela brings dal into breakfast easily.',
    'cheese veg sandwich': 'Easy to pack and easy to eat between classes.',
    'corn chaat': 'Quick crunch for hungry after-school moods.',
    'veg cutlet': 'Crisp outside, soft inside and kid friendly.',
    'banana pancake': 'Sweet enough without feeling like dessert.',
    'masala makhana': 'Light crunch for after-school nibbling.',
    'sweet potato chaat': 'Naturally sweet with a gentle chaat kick.',
    'mini dhokla': 'Soft squares travel well without getting messy.',
    'ginger chai': 'Ginger warmth helps slow the evening down.',
    'tulsi tea': 'A calming sip for tired, heavy days.',
    'kashaya': 'Peppery warmth when the weather feels dull.',
    'jeera water': 'A light sip after a heavy homemade meal.',
    'ajwain water': 'Gentle kitchen remedy for uneasy days.',
    'buttermilk': 'Cooling and salty enough to revive the day.',
    'sweet lassi': 'Sweet, creamy and good after spicy food.',
    'salted lassi': 'A cooling sip when lunch feels heavy.',
    'mango lassi': 'Fruity and filling for warm afternoons.',
    'rose milk': 'Chilled, gentle and nostalgic after meals.',
    'nannari sherbet': 'Rooty sweetness that cools the afternoon.',
    'watermelon juice': 'Fresh, light and made for hot days.',
    'sugarcane juice': 'A quick energy lift when the day drags.',
    'dates milkshake': 'Naturally sweet and filling between meals.',
    'carrot beet juice': 'Bright juice when you want something fresh.',
    'masala chai': 'Spiced warmth for slow evening breaks.',
    'elaichi chai': 'Cardamom makes chai feel softer and calmer.',
    'filter coffee': 'Strong, familiar and perfect for slow mornings.',
    'lemon honey water': 'Gentle citrus warmth for quiet starts.',
    'masala chaas': 'Spiced buttermilk that cools the plate.',
    'panakam': 'Jaggery and spice make summer feel festive.',
    'tender coconut water': 'Fresh coconut water for hot afternoons.',
    'aam panna': 'Tangy mango cooler for peak summer days.',
    'banana shake': 'Creamy fruit drink for quick fullness.',
    'sattu drink': 'Filling enough for a light afternoon sip.',
    'green moong drink': 'Moong gives the drink a gentle protein lift.',
    'turmeric milk': 'Warm turmeric milk for slow night routines.',
    'badam milk': 'Nutty milk that feels rich without cooking much.',
    'saffron milk': 'A fragrant sip for a quieter evening.',
    'ragi malt': 'Ragi makes this drink filling and earthy.',
    'beetroot salad': 'Naturally cooling and refreshing beside lunch.',
    'cabbage salad': 'Crunchy side that lightens everyday meals.',
    'lentil salad': 'Lentils make the bowl more filling.',
    'avocado salad': 'Creamy bites balance sharper salad flavors.',
    'green gram salad': 'Crunchy sprouts that make lunch feel lighter.',
    'onion tomato salad': 'Simple freshness beside dal or rice.',
    'mixed veg salad': 'Adds color and crunch without cooking.',
    'apple walnut salad': 'Sweet crunch that keeps the plate lighter.',
    'pomegranate salad': 'Juicy, bright and good beside heavy meals.',
    'broccoli salad': 'A crisp green bowl with a clean bite.',
    'sweet corn salad': 'Sweet corn keeps the salad easy to enjoy.',
    'spinach salad': 'Leafy and light when dinner needs balance.',
    'millet salad': 'Filling grains without a heavy finish.',
    'sprouts salad': 'Sprouts bring crunch and steady energy.',
    'chana chaat': 'Chana makes snack time feel more complete.',
    'peanut kosambari': 'Peanuts add crunch to a fresh side.',
    'paneer salad': 'Paneer turns salad into a fuller plate.',
    'moong salad': 'Moong keeps the bowl fresh and filling.',
    'kachumber salad': 'Fresh chopped crunch for any Indian meal.',
    'kosambari': 'A classic fresh side for festival plates.',
    'rajma salad': 'Rajma adds a hearty bite to fresh bowls.',
    'pineapple salad': 'Sweet pineapple lifts simple salad flavors.',
    'tomato onion chaat': 'Sharp, juicy and ready in just a few minutes.',
    'carrot cucumber salad': 'Cool crunch for everyday lunch plates.',
    'watermelon mint salad': 'Mint makes watermelon feel extra cooling.',
    'fruit chaat': 'Fruit turns snack time bright and playful.',
    'cucumber raita salad': 'Cucumber and curd calm spicy meals.',
    'mango salad': 'Mango adds sweet freshness to the plate.',
    'coconut cucumber salad': 'Coconut softens the cucumber crunch.',
    'rasmalai': 'Chilled sweetness for slower evenings.',
    'kheer': 'Sweet memories in every slow spoonful.',
    'payasam': 'A festive spoonful that still feels homely.',
    'shrikhand': 'Cool, creamy and ready for a sweet pause.',
    'basundi': 'Slow milk sweetness for unhurried evenings.',
    'rice kheer': 'Soft rice sweetness after a simple meal.',
    'kaju katli': 'A neat sweet for gifting and sharing.',
    'besan ladoo': 'Nutty sweetness that tastes like home.',
    'motichoor ladoo': 'Tiny pearls of sweetness for celebrations.',
    'coconut barfi': 'Coconut keeps this sweet soft and simple.',
    'dry fruit ladoo': 'A small sweet bite with extra richness.',
    'modak': 'A festive bite that feels handmade and special.',
    'chocolate burfi': 'A playful sweet for modern cravings.',
    'gulab jamun': 'Soft, warm and impossible to stop at one.',
    'rasgulla': 'Light syrupy sweetness for a cool finish.',
    'mysore pak': 'Ghee-rich sweetness for special days.',
    'jalebi': 'Crispy, syrupy and celebration-ready.',
    'phirni': 'Smooth rice dessert for slow spoonfuls.',
    'peda': 'Small milk sweet that feels festive fast.',
    'sandesh': 'Soft chenna sweet with a gentle finish.',
    'kalakand': 'Grainy milk sweetness for family plates.',
    'malpua': 'Syrupy pancakes for weekend indulgence.',
    'carrot halwa': 'Warm carrot sweetness for winter moods.',
    'moong dal halwa': 'Rich dal halwa for slow celebrations.',
    'obbattu': 'Sweet flatbread that tastes like festivals.',
    'puran poli': 'A warm sweet roti made for sharing.',
    'kulfi': 'Cold, creamy and perfect after spicy food.',
    'falooda': 'Layered sweetness for a playful treat.',
    'rava kesari': 'Quick semolina sweet for sudden cravings.',
    'sheera': 'Simple ghee sweetness for everyday comfort.',
    'vegetable soup': 'A cozy bowl when dinner should stay light.',
    'hot and sour soup': 'Sharp warmth for evenings that need a kick.',
    'manchow soup': 'Crunchy, spicy comfort in a single bowl.',
    'spinach soup': 'Leafy warmth when you want something gentle.',
    'carrot soup': 'Sweet carrot makes the bowl feel mellow.',
    'pumpkin soup': 'Creamy warmth without feeling too heavy.',
    'beetroot soup': 'Earthy color and warmth in every spoon.',
    'broccoli soup': 'A green bowl that feels clean and filling.',
    'mushroom soup': 'Mushrooms make the bowl deep and cozy.',
    'mixed veg soup': 'An easy way to use everyday vegetables.',
    'lemon coriander soup': 'Citrus and coriander keep it bright.',
    'noodle soup': 'Noodles make soup feel like a quick meal.',
    'cabbage soup': 'Light broth for a simple dinner mood.',
    'peas soup': 'Sweet peas make the bowl smooth and filling.',
    'millet soup': 'Millet gives soup a gentle grainy body.',
    'drumstick soup': 'Drumstick brings a homely regional warmth.',
    'garlic soup': 'Garlic warmth feels good on tired evenings.',
    'bottle gourd soup': 'Bottle gourd keeps the bowl calm and light.',
    'oats soup': 'Oats make soup creamy without much effort.',
    'tomato soup': 'Perfect for chilly evenings at home.',
    'sweet corn soup': 'A comforting bowl kids usually enjoy.',
    'corn soup': 'Light, warm and quick to make after work.',
    'lentil soup': 'Lentils make the bowl filling but simple.',
    'chicken soup': 'Chicken broth feels steady and restorative.',
    'paneer soup': 'Paneer adds soft protein to a warm bowl.',
    'pepper rasam': 'Peppery broth for rainy-day comfort.',
    'tomato rasam': 'Tangy rasam wakes up a simple rice meal.',
    'mysore rasam': 'Spiced rasam with a deeper homely flavor.',
    'kollu rasam': 'Horse gram rasam feels earthy and warming.',
    'chakli': 'Crisp spirals made for festive snacking.',
    'shankarpali': 'Sweet crunch that stores well for guests.',
    'tilgul': 'Sesame sweetness for winter celebrations.',
    'ellu bella': 'A festive mix made for sharing handfuls.',
    'sakkarai pongal': 'Sweet pongal brings harvest warmth home.',
    'ven pongal': 'Soft pongal balances festive sweet plates.',
    'holige': 'A warm sweet flatbread for family meals.',
    'ugadi pachadi': 'Every spoon carries the festival flavors.',
    'mango rice': 'Mango gives festive rice a seasonal tang.',
    'avial': 'Vegetables and coconut make a sadya classic.',
    'olan': 'A gentle coconut curry for festive spreads.',
    'thoran': 'Coconut vegetables add texture to the feast.',
    'parippu curry': 'Dal grounds the festival meal beautifully.',
    'palada payasam': 'A creamy payasam made for slow servings.',
    'sheer khurma': 'Dates and milk make Eid mornings special.',
    'haleem': 'Slow-cooked richness for a festive table.',
    'chicken biryani': 'A celebration centerpiece for hungry crowds.',
    'seviyan': 'Fine noodles bring a sweet festival finish.',
    'mutton korma': 'Rich gravy for a slow family feast.',
    'kadubu': 'Steamed festive bites with soft coconut sweetness.',
    'kozhukattai': 'Rice dumplings that feel handmade and festive.',
    'ukadiche modak': 'Steamed modaks with a soft jaggery center.',
    'plum cake': 'Spiced cake that tastes like holiday evenings.',
    'rose cookies': 'Crisp floral cookies for festive tins.',
    'kalkals': 'Tiny fried curls made for Christmas sharing.',
    'coconut macaroons': 'Coconut sweetness with a soft chewy bite.',
    'marzipan': 'Colorful almond sweets for festive gifting.'
  };
  if (exact[titleKey]) return exact[titleKey];
  if (fallback && fallback.length >= 32 && fallback.length <= 52) return fallback;
  const fallbackSets = {
    baby: ['Soft texture for easier feeding days.', 'A small bowl for patient little bites.', 'Gentle enough for early meal practice.'],
    lunchbox: ['Easy to pack and easy to finish.', 'Stays friendly even after a few hours.', 'Keeps lunch simple for busy school days.'],
    drinks: ['A calming sip for a slower moment.', 'Works well when the day needs cooling.', 'A simple drink for between-meal comfort.'],
    salads: ['Adds freshness without making the meal heavy.', 'Useful when the plate needs crunch and color.', 'Keeps the meal light but still interesting.'],
    desserts: ['A small sweet pause after a homemade meal.', 'Good for sharing without making dessert fussy.', 'Brings a gentle finish to the table.'],
    soups: ['Warm enough for dinner, light enough for comfort.', 'A quiet bowl when you want food to feel easy.', 'Useful when the evening needs something soft.'],
    festival: ['Made for sharing around a festive table.', 'Brings a familiar celebration note home.', 'A special-day bite with homemade warmth.']
  };
  const options = fallbackSets[lowerKey] || ['Straightforward enough for a low-effort day.'];
  const index = [...titleKey].reduce((sum, char) => sum + char.charCodeAt(0), 0) % options.length;
  return options[index];
}

function collectionCard(item, icon, label, collectionKey = '') {
  const article = document.createElement('article');
  article.className = 'drink-card';
  const slug = collectionImagePath(item, collectionKey, label);
  const meta = collectionBrowseMetadata(item, collectionKey);
  article.innerHTML = `
    <span class="recipe-icon"><img class="food-image" src="${slug}" alt="" loading="lazy" decoding="async" /></span>
    <div>
      <strong>${escapeHtml(item.title)}</strong>
      <p class="collection-card-meta">
        <span class="collection-card-attribute">${escapeHtml(meta.attribute)}</span>
        <small>${escapeHtml(meta.reason)}</small>
      </p>
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
  const previousScrollLeft = document.querySelector('.collection-scroll')?.scrollLeft ?? state.collectionScrollLeft ?? 0;
  state.collectionScrollLeft = previousScrollLeft;
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
    <div class="collection-scroll-shell">
      <button class="collection-scroll-button collection-scroll-left" type="button" data-scroll-collections="-1" aria-label="Scroll collections left">‹</button>
      <div class="collection-scroll" aria-label="Tomo collections">
        ${collections.map((collection) => `
          <button class="collection-segment collection-${collection.key} ${collection.tone} ${state.activeCollection === collection.key ? 'active' : ''}" data-collection-key="${collection.key}">
            <strong>${collection.title}</strong>
            <em>${collectionSegmentCopy(collection)}</em>
          </button>
        `).join('')}
      </div>
      <button class="collection-scroll-button collection-scroll-right" type="button" data-scroll-collections="1" aria-label="Scroll collections right">›</button>
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
  const restoredRow = els.specialRows.querySelector('.collection-scroll');
  if (restoredRow) {
    restoredRow.scrollLeft = state.collectionScrollLeft || 0;
    restoredRow.addEventListener('scroll', () => {
      state.collectionScrollLeft = restoredRow.scrollLeft;
    }, { passive: true });
  }
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
  if (text.includes('first')) return '🥣';
  if (text.includes('puree') || text.includes('mash')) return '🥄';
  if (text.includes('growing')) return '🍅';
  if (text.includes('little')) return '🍽️';
  if (text.includes('warm') || text.includes('comfort')) return '☕';
  if (text.includes('summer')) return '🍹';
  if (text.includes('remed')) return '🌿';
  if (text.includes('nourishing')) return '🥛';
  if (text.includes('protein')) return '💪';
  if (text.includes('everyday')) return '🥗';
  if (text.includes('regional')) return '🏡';
  if (text.includes('festival') || text.includes('diwali') || text.includes('celebration')) return '✨';
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
  const normalized = String(name).toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
  const canonical = {
    eggs: 'egg',
    'boiled egg': 'egg',
    'boiled eggs': 'egg',
    omelette: 'egg',
    omelet: 'egg',
    'egg omelette': 'egg',
    'egg omelet': 'egg',
    'cooked rice': 'rice',
    'leftover rice': 'rice',
    'steamed rice': 'rice',
    'plain rice': 'rice',
    kokkum: 'kokum',
    kokam: 'kokum'
  };
  return canonical[normalized] || normalized;
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

function recipeExcludedFromDefaultFeeds(recipe) {
  return recipe?.hardExcludeFromFeeds === true
    || recipe?.excludeFromDefaultFeeds === true
    || normalizeIngredientName(recipe?.feedVisibility) === 'pantry search only';
}

function feedDishFamily(recipe) {
  return normalizeDishFamilyName(recipe?.dishFamily || recipe?.dish_family || recipeFamilyKey(recipe));
}

function feedFamilyVariantRank(recipe) {
  const title = normalizeIngredientName(recipe?.title);
  const family = feedDishFamily(recipe);
  if (family === 'uttapam') {
    if (title === 'onion uttapam') return 0;
    if (title === 'tomato uttapam') return 1;
    if (title === 'plain uttapam') return 2;
    if (title === 'vegetable uttapam') return 3;
    if (title === 'cheese uttapam') return 99;
    return 10;
  }
  if (family !== 'dosa') return 0;
  if (title === 'dosa') return 0;
  if (title === 'masala dosa') return 1;
  if (title === 'onion dosa') return 2;
  if (title === 'paneer dosa') return 3;
  if (title === 'egg dosa') return 4;
  if (title === 'cheese dosa') return 99;
  return 10;
}

function feedFamilyLimit(family, fallback = 2) {
  if (family === 'uttapam') return 1;
  return fallback;
}

function familyCappedVisibleList(recipes, maxPerFamily = 2) {
  const allowedByFamily = new Map();
  recipes.forEach((recipe, index) => {
    const family = feedDishFamily(recipe);
    if (!family) return;
    const list = allowedByFamily.get(family) || [];
    list.push({ recipe, index });
    allowedByFamily.set(family, list);
  });
  for (const [family, list] of allowedByFamily.entries()) {
    allowedByFamily.set(family, new Set(list
      .sort((a, b) => feedFamilyVariantRank(a.recipe) - feedFamilyVariantRank(b.recipe) || a.index - b.index)
      .slice(0, feedFamilyLimit(family, maxPerFamily))
      .map((item) => item.recipe.id)));
  }
  const picked = [];
  const counts = new Map();
  for (const recipe of recipes) {
    const family = feedDishFamily(recipe);
    if (family && !allowedByFamily.get(family)?.has(recipe.id)) continue;
    const count = counts.get(family) || 0;
    if (family && count >= feedFamilyLimit(family, maxPerFamily)) continue;
    picked.push(recipe);
    counts.set(family, count + 1);
  }
  return picked;
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

const stapleIngredientBaseMap = {
  rice: ['rice', 'cooked rice', 'leftover rice', 'plain rice', 'steamed rice'],
  'wheat flour': ['wheat', 'wheat flour', 'atta', 'chapati flour'],
  bread: ['bread', 'pav'],
  'dosa batter': ['dosa batter', 'dosa'],
  'idli batter': ['idli', 'idli batter', 'idli rice'],
  poha: ['poha', 'avalakki'],
  pasta: ['pasta'],
  noodles: ['noodle', 'noodles']
};

function stapleBaseForIngredient(name) {
  const normalized = normalizeIngredientName(name);
  for (const [base, aliases] of Object.entries(stapleIngredientBaseMap)) {
    if (aliases.includes(normalized)) return base;
  }
  return '';
}

function recipePantryOverrides(recipe) {
  const key = normalizeIngredientName(recipe.title);
  const overrides = {
    'tomato rice': {
      baseIngredient: 'rice',
      coreIngredients: ['rice', 'tomato'],
      requiredIngredients: ['rice', 'tomato'],
      optionalIngredients: ['curry leaves', 'mustard seeds', 'peanut', 'oil', 'coriander'],
      dishFamily: 'rice-meal'
    },
    'egg fried rice': {
      baseIngredient: 'rice',
      coreIngredients: ['rice', 'egg'],
      requiredIngredients: ['rice', 'egg'],
      optionalIngredients: ['onion', 'garlic', 'soy sauce', 'spring onion', 'oil'],
      dishFamily: 'fried-rice'
    },
    'aloo paratha': {
      baseIngredient: 'wheat flour',
      coreIngredients: ['wheat flour', 'potato'],
      requiredIngredients: ['wheat flour', 'potato'],
      optionalIngredients: ['onion', 'spices', 'ghee'],
      dishFamily: 'paratha'
    },
    'spicy aloo paratha': {
      baseIngredient: 'wheat flour',
      coreIngredients: ['wheat flour', 'potato'],
      requiredIngredients: ['wheat flour', 'potato'],
      optionalIngredients: ['green chilli', 'ghee', 'spices'],
      dishFamily: 'paratha'
    },
    'gunpowder idli': {
      baseIngredient: 'idli batter',
      coreIngredients: ['idli', 'gunpowder'],
      requiredIngredients: ['idli', 'gunpowder'],
      optionalIngredients: ['oil', 'ghee', 'onion', 'curry leaves'],
      dishFamily: 'idli'
    },
    pongal: {
      baseIngredient: 'rice',
      coreIngredients: ['rice', 'moong dal'],
      requiredIngredients: ['rice', 'moong dal'],
      optionalIngredients: ['pepper', 'cumin', 'ghee', 'cashew'],
      dishFamily: 'rice-dal'
    },
    'sweet pongal': {
      baseIngredient: 'rice',
      coreIngredients: ['rice', 'moong dal'],
      requiredIngredients: ['rice', 'moong dal'],
      optionalIngredients: ['jaggery', 'ghee', 'cashew', 'cardamom'],
      dishFamily: 'rice-dal'
    }
  };
  return overrides[key] || null;
}

function uniqueNormalizedIngredients(values) {
  return [...new Set((values || []).filter(Boolean).map(normalizeIngredientName))];
}

function normalizeDishFamilyName(value) {
  const normalized = normalizeIngredientName(value);
  const familyMap = {
    'rice meal': 'rice-meal',
    'fried rice': 'fried-rice',
    'rice dal': 'rice-dal',
    'paneer curry': 'paneer-curry',
    'fish curry': 'fish-curry'
  };
  return familyMap[normalized] || normalized;
}

function configuredCoreIngredients(recipe) {
  const override = recipePantryOverrides(recipe);
  if (override?.coreIngredients?.length) return uniqueNormalizedIngredients(override.coreIngredients);
  const configured = recipe.coreIngredients || recipe.core_ingredients;
  if (Array.isArray(configured) && configured.length) return uniqueNormalizedIngredients(configured);
  const explicit = explicitPrimaryIngredients(recipe);
  if (explicit.length) return uniqueNormalizedIngredients(explicit);
  return uniqueNormalizedIngredients(coreRecipeIngredients(recipe).map((item) => item.name || item.ingredientName || ''));
}

function configuredOptionalIngredients(recipe, core = configuredCoreIngredients(recipe)) {
  const override = recipePantryOverrides(recipe);
  const configured = override?.optionalIngredients || recipe.optionalIngredients || recipe.optional_ingredients;
  const candidates = Array.isArray(configured) && configured.length
    ? configured
    : [
      ...explicitSecondaryIngredients(recipe),
      ...(recipe.ingredients || [])
        .filter((item) => !item.isMain)
        .map((item) => item.name || item.ingredientName || '')
    ];
  return uniqueNormalizedIngredients(candidates)
    .filter((name) => !core.some((coreName) => pantryIngredientEquals(name, coreName)));
}

function configuredRequiredIngredients(recipe, core = configuredCoreIngredients(recipe)) {
  const override = recipePantryOverrides(recipe);
  const configured = override?.requiredIngredients || recipe.requiredIngredients || recipe.required_ingredients;
  if (Array.isArray(configured) && configured.length) return uniqueNormalizedIngredients(configured);
  return uniqueNormalizedIngredients(core);
}

function configuredBaseIngredient(recipe, core = configuredCoreIngredients(recipe)) {
  const override = recipePantryOverrides(recipe);
  const configured = override?.baseIngredient || recipe.baseIngredient || recipe.base_ingredient;
  if (configured) return normalizeIngredientName(configured);
  const title = normalizeIngredientName(recipe.title);
  if (/\b(idli|uttapam)\b/.test(title)) return 'idli batter';
  if (/\b(dosa)\b/.test(title)) return 'dosa batter';
  if (/\b(paratha|roti|chapati)\b/.test(title)) return 'wheat flour';
  if (/\b(poha|avalakki)\b/.test(title)) return 'poha';
  if (/\b(pasta)\b/.test(title)) return 'pasta';
  if (/\b(noodles)\b/.test(title)) return 'noodles';
  const staple = core.map(stapleBaseForIngredient).find(Boolean);
  return staple || core[0] || '';
}

function configuredIncompatibleIngredients(recipe) {
  const override = recipePantryOverrides(recipe);
  return uniqueNormalizedIngredients(override?.incompatibleWith || recipe.incompatibleWith || recipe.incompatible_with || []);
}

function configuredPantrySupportingIngredients(recipe) {
  return uniqueNormalizedIngredients(recipe.pantrySupportingIngredients || recipe.pantry_supporting_ingredients || []);
}

function configuredPantryPartialMissingRequired(recipe) {
  return uniqueNormalizedIngredients(recipe.pantryPartialMissingRequired || recipe.pantry_partial_missing_required || []);
}

function inferredDishFamily(recipe, core = configuredCoreIngredients(recipe), base = configuredBaseIngredient(recipe, core)) {
  const override = recipePantryOverrides(recipe);
  const configured = override?.dishFamily || recipe.dishFamily || recipe.dish_family;
  if (configured) return normalizeDishFamilyName(configured);
  const title = normalizeIngredientName(recipe.title);
  const has = (name) => core.some((ingredient) => pantryIngredientEquals(ingredient, name));
  if (/\b(pongal|khichdi|dal rice|sambar rice|rasam rice|curd rice)\b/.test(title) || (base === 'rice' && core.some((ingredient) => /\bdal\b/.test(ingredient)))) return 'rice-dal';
  if (base === 'rice' && has('paneer')) return 'rice-meal';
  if (base === 'rice' && /\b(fried rice)\b/.test(title)) return 'fried-rice';
  if (base === 'rice') return 'rice-meal';
  if (base === 'wheat flour') return 'paratha';
  if (base === 'idli batter') return 'idli';
  if (base === 'dosa batter') return 'dosa';
  return base || 'general';
}

function pantryIngredientEquals(left, right) {
  const leftName = normalizeIngredientName(left);
  const rightName = normalizeIngredientName(right);
  if (!leftName || !rightName) return false;
  if (leftName === rightName) return true;

  const leftStaple = stapleBaseForIngredient(leftName);
  const rightStaple = stapleBaseForIngredient(rightName);
  if (leftStaple || rightStaple) {
    return Boolean(leftStaple && rightStaple && leftStaple === rightStaple);
  }

  const gunpowderAliases = ['podi', 'gunpowder', 'gun powder'];
  if (gunpowderAliases.includes(leftName) && gunpowderAliases.includes(rightName)) return true;

  const leftAliases = ingredientAliases(leftName).map(normalizeIngredientName);
  const rightAliases = ingredientAliases(rightName).map(normalizeIngredientName);
  return leftAliases.includes(rightName) || rightAliases.includes(leftName);
}

function pantryRankingBreakdown(recipe, selected) {
  const normalizedSelected = uniqueNormalizedIngredients(selected);
  const coreIngredients = configuredCoreIngredients(recipe);
  const requiredIngredients = configuredRequiredIngredients(recipe, coreIngredients);
  const optionalIngredients = configuredOptionalIngredients(recipe, coreIngredients);
  const matchedCore = coreIngredients.filter((ingredient) => normalizedSelected.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const matchedRequired = requiredIngredients.filter((ingredient) => normalizedSelected.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const matchedOptional = optionalIngredients.filter((ingredient) => normalizedSelected.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const matchedSelected = normalizedSelected.filter((selectedName) => {
    return coreIngredients.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || requiredIngredients.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || optionalIngredients.some((ingredient) => pantryIngredientEquals(selectedName, ingredient));
  });
  const unmatchedSelected = normalizedSelected.filter((selectedName) => !matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName)));
  const selectedCoverageRatio = normalizedSelected.length ? matchedSelected.length / normalizedSelected.length : 0;
  const unusedSelectedPenalty = normalizedSelected.length >= 2 ? unmatchedSelected.length * 55 : 0;
  const missingCore = coreIngredients.filter((ingredient) => !normalizedSelected.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const missingRequired = requiredIngredients.filter((ingredient) => !normalizedSelected.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const selectedStaples = [...new Set(normalizedSelected.map(stapleBaseForIngredient).filter(Boolean))];
  const baseIngredient = configuredBaseIngredient(recipe, coreIngredients);
  const baseStaple = stapleBaseForIngredient(baseIngredient) || baseIngredient;
  const coreStaples = [...new Set([baseStaple, ...coreIngredients.map(stapleBaseForIngredient)].filter(Boolean))];
  const stapleMismatch = selectedStaples.length > 0 && selectedStaples.some((staple) => staple !== baseStaple && !coreStaples.includes(staple));
  const moodBoost = Math.min(5, Math.round((pantryMoodBonus(recipe) || 0) / 2));
  const score = (matchedCore.length * 50)
    + (matchedSelected.length * 20)
    + (matchedOptional.length * 8)
    + moodBoost
    - (missingRequired.length * 45)
    - (Math.max(0, missingCore.length - missingRequired.length) * 20)
    - unusedSelectedPenalty
    - (stapleMismatch ? 60 : 0);

  return {
    coreIngredients,
    requiredIngredients,
    optionalIngredients,
    baseIngredient,
    baseStaple,
    dishFamily: inferredDishFamily(recipe, coreIngredients, baseIngredient),
    incompatibleWith: configuredIncompatibleIngredients(recipe),
    matchedCore,
    matchedRequired,
    matchedOptional,
    matchedSelected,
    unmatchedSelected,
    missingCore,
    missingRequired,
    coreIngredientMatches: matchedCore.length,
    requiredIngredientMatches: matchedRequired.length,
    selectedIngredientMatches: matchedSelected.length,
    selectedIngredientMisses: unmatchedSelected.length,
    selectedCoverageRatio,
    optionalIngredientMatches: matchedOptional.length,
    missingCoreIngredients: missingCore.length,
    missingRequiredIngredients: missingRequired.length,
    selectedStaples,
    coreStaples,
    stapleMismatch,
    stapleMismatchPenalty: stapleMismatch ? 60 : 0,
    unusedSelectedPenalty,
    score
  };
}

function dishFamilyIngredientAllowed(family, ingredient) {
  const dishFamily = normalizeDishFamilyName(family);
  const normalized = normalizeIngredientName(ingredient);
  const base = stapleBaseForIngredient(normalized);
  const dalLike = /\bdal\b/.test(normalized) || ['lentil', 'moong', 'toor dal', 'urad dal', 'chana dal'].includes(normalized);
  const paneerLike = pantryIngredientEquals(normalized, 'paneer');
  const eggLike = pantryIngredientEquals(normalized, 'egg');
  const vegetableLike = ['onion', 'tomato', 'potato', 'carrot', 'capsicum', 'peas', 'corn', 'spinach', 'palak'].some((name) => pantryIngredientEquals(normalized, name));
  const seasoningLike = ['spices', 'cumin', 'pepper', 'ghee', 'oil', 'garlic', 'ginger', 'green chilli', 'coriander', 'curry leaves', 'soy sauce'].some((name) => pantryIngredientEquals(normalized, name));
  if (dishFamily === 'rice-dal') return base === 'rice' || dalLike || seasoningLike;
  if (dishFamily === 'rice-meal' || dishFamily === 'fried-rice') return base === 'rice' || paneerLike || eggLike || vegetableLike || seasoningLike;
  if (dishFamily === 'paratha') return base === 'wheat flour' || ['potato', 'paneer', 'onion', 'gobi', 'cauliflower', 'methi'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  if (dishFamily === 'idli') return base === 'idli batter' || ['idli', 'gunpowder', 'podi', 'sambar', 'chutney', 'onion', 'tomato', 'cheese', 'vegetable mix'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  if (dishFamily === 'uttapam') return base === 'idli batter' || ['onion', 'tomato', 'cheese', 'vegetable mix'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  if (dishFamily === 'dosa') return base === 'dosa batter' || ['dosa', 'potato', 'paneer', 'onion', 'cheese', 'egg', 'sambar', 'chutney'].some((name) => pantryIngredientEquals(normalized, name)) || seasoningLike;
  return true;
}

function logInvalidDishMatch(recipe, selected, reason) {
  if (!window.COOKBUDDY_DEBUG_MATCHING) return;
  console.log('[Tomo blocked pantry match]', {
    dish: recipe.title,
    selectedIngredients: selected,
    reason
  });
}

function validateDishCompatibility(recipe, selected, breakdown = pantryRankingBreakdown(recipe, selected)) {
  const selectedIngredients = uniqueNormalizedIngredients(selected);
  const reasons = [];
  const matchedCoreCount = breakdown.matchedCore.length;
  const supportingIngredients = configuredPantrySupportingIngredients(recipe);
  const partialMissingRequired = configuredPantryPartialMissingRequired(recipe);
  const matchedCoreOrRequiredSelected = selectedIngredients.filter((selectedName) => {
    return breakdown.coreIngredients.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || breakdown.requiredIngredients.some((ingredient) => pantryIngredientEquals(selectedName, ingredient))
      || supportingIngredients.some((ingredient) => pantryIngredientEquals(selectedName, ingredient));
  });
  const permitsPartialMissingRequired = breakdown.missingRequired.length > 0
    && breakdown.missingRequired.every((ingredient) => partialMissingRequired.some((allowed) => pantryIngredientEquals(ingredient, allowed)))
    && matchedCoreOrRequiredSelected.length >= Math.min(2, selectedIngredients.length);
  const unmatchedSelected = selectedIngredients.filter((selectedName) => !breakdown.matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName)));
  const familyMismatches = selectedIngredients.filter((selectedName) => {
    if (breakdown.matchedSelected.some((matchedName) => pantryIngredientEquals(selectedName, matchedName))) return false;
    return !dishFamilyIngredientAllowed(breakdown.dishFamily, selectedName);
  });
  const incompatibleMatches = breakdown.incompatibleWith.filter((ingredient) => selectedIngredients.some((selectedName) => pantryIngredientEquals(selectedName, ingredient)));
  const selectedBaseMismatch = breakdown.selectedStaples.length > 0
    && breakdown.baseStaple
    && breakdown.selectedStaples.some((staple) => staple !== breakdown.baseStaple);

  if (!matchedCoreCount) reasons.push('no selected ingredient is a core ingredient');
  if (incompatibleMatches.length) reasons.push(`incompatible with ${incompatibleMatches.map(formatIngredientName).join(', ')}`);
  if (selectedBaseMismatch) reasons.push(`selected base ${breakdown.selectedStaples.map(formatIngredientName).join(', ')} does not match dish base ${formatIngredientName(breakdown.baseIngredient)}`);
  if (selectedIngredients.length >= 2 && matchedCoreOrRequiredSelected.length < 2) {
    reasons.push('fewer than two selected ingredients match core or required ingredients');
  }
  if (selectedIngredients.length >= 2 && breakdown.missingRequired.length && !permitsPartialMissingRequired) {
    reasons.push(`missing required ingredient ${breakdown.missingRequired.map(formatIngredientName).join(', ')}`);
  }
  if (breakdown.missingRequired.length && unmatchedSelected.length && !permitsPartialMissingRequired) {
    reasons.push(`missing required ingredient ${breakdown.missingRequired.map(formatIngredientName).join(', ')} and selected ${unmatchedSelected.map(formatIngredientName).join(', ')} is unrelated`);
  }
  if (breakdown.missingRequired.length && familyMismatches.length && !permitsPartialMissingRequired) {
    reasons.push(`missing required ingredient ${breakdown.missingRequired.map(formatIngredientName).join(', ')} and selected ${familyMismatches.map(formatIngredientName).join(', ')} does not belong to dish family ${breakdown.dishFamily}`);
  }

  const blocked = reasons.some((reason) => {
    return reason.startsWith('no selected')
      || reason.startsWith('incompatible')
      || reason.startsWith('selected base')
      || reason.startsWith('fewer than two selected')
      || reason.startsWith('missing required ingredient')
      || reason.includes('unrelated')
      || reason.includes('does not belong');
  });

  return {
    valid: !blocked,
    strict: !blocked
      && selectedIngredients.length >= 2
      && matchedCoreOrRequiredSelected.length >= Math.min(2, selectedIngredients.length)
      && !breakdown.missingRequired.length,
    fallback: !blocked && matchedCoreCount > 0,
    reasons,
    matchedCoreOrRequiredCount: matchedCoreOrRequiredSelected.length
  };
}

function recipeIngredientNames(recipe) {
  return [
    ...explicitPrimaryIngredients(recipe),
    ...explicitSecondaryIngredients(recipe),
    ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || '')
  ].filter(Boolean);
}

function selectedIngredientCoverage(recipe, selected) {
  const names = recipeIngredientNames(recipe);
  return selected.filter((ingredient) => names.some((name) => selectedCoversIngredient([ingredient], name)));
}

function selectedHasRiceAndEgg(selected) {
  return selectedIncludesAll(selected, ['rice', 'egg']);
}

function eggFriedRiceRecipe() {
  return state.recipes.find((recipe) => normalizeIngredientName(recipe.title) === 'egg fried rice') || null;
}

function pantryCoverageDetails(pantryBreakdown) {
  const core = pantryBreakdown.coreIngredients || [];
  const required = pantryBreakdown.requiredIngredients || core;
  const optional = pantryBreakdown.optionalIngredients || [];
  const uniqueIngredients = uniqueNormalizedIngredients([...core, ...required, ...optional]);
  const matchedIngredients = uniqueIngredients.filter((ingredient) => {
    return (pantryBreakdown.matchedCore || []).some((matched) => pantryIngredientEquals(matched, ingredient))
      || (pantryBreakdown.matchedRequired || []).some((matched) => pantryIngredientEquals(matched, ingredient))
      || (pantryBreakdown.matchedOptional || []).some((matched) => pantryIngredientEquals(matched, ingredient));
  });
  const matchedCoreCount = pantryBreakdown.coreIngredientMatches || 0;
  const coreRatio = core.length ? matchedCoreCount / Math.max(1, core.length) : 0;
  const requiredRatio = required.length ? (pantryBreakdown.requiredIngredientMatches || 0) / Math.max(1, required.length) : coreRatio;
  const pantryCoverageRatio = uniqueIngredients.length ? matchedIngredients.length / Math.max(1, uniqueIngredients.length) : requiredRatio;
  const confidence = Math.round(Math.min(100, (coreRatio * 45) + (requiredRatio * 35) + (pantryCoverageRatio * 20)));
  return {
    confidence,
    coreRatio,
    requiredRatio,
    pantryCoverageRatio,
    pantryAvailableCount: matchedIngredients.length,
    pantryIngredientCount: uniqueIngredients.length || required.length || core.length,
    hasAllRecipeIngredients: uniqueIngredients.length > 0
      && (pantryBreakdown.missingCore || []).length === 0
      && matchedIngredients.length >= uniqueIngredients.length
  };
}

function eggFriedRiceFallbackMatch(selected) {
  const recipe = eggFriedRiceRecipe();
  if (!recipe || !selectedHasRiceAndEgg(selected)) return null;
  const fallbackBreakdown = pantryRankingBreakdown(recipe, selected);
  const coverage = pantryCoverageDetails(fallbackBreakdown);
  return {
    recipe,
    ingredientMatchScore: coverage.confidence,
    ingredientScore: coverage.confidence,
    primaryMatchPercent: 100,
    secondaryMatchCount: 0,
    secondaryTotal: Math.max(0, explicitSecondaryIngredients(recipe).length),
    selectedCoverageCount: 2,
    selectedCoverageRatio: 1,
    overallMatchPercent: coverage.confidence,
    finalScore: 5000,
    rankingScore: 5000,
    moodTier: MoodTier.CORE,
    pantryScore: Math.round(coverage.pantryCoverageRatio * 100),
    mealTypeScore: recipeMatchesMeal(recipe, state.meal) ? 100 : 0,
    tierBoost: 0,
    rankReason: 'Exact rice + egg pantry fallback',
    tierKey: 'top',
    tierLabel: 'Top Match',
    unlockIngredient: '',
    mealTypeBonus: recipeMatchesMeal(recipe, state.meal) ? 10 : 0,
    moodScore: 0,
    recipePopularity: Math.min(20, userPreferenceScore(recipe)),
    matchedPrimaryCount: 2,
    requiredPrimaryCount: 2,
    matchedPrimary: ['Rice', 'Egg'],
    matchedSecondary: [],
    missingPrimary: [],
    classification: classifyIngredientMatch(coverage.confidence),
    pantryAvailableCount: coverage.pantryAvailableCount,
    pantryIngredientCount: coverage.pantryIngredientCount,
    hasAllRecipeIngredients: coverage.hasAllRecipeIngredients,
    discoveryScore: 100,
    userPreferenceScore: Math.min(100, userPreferenceScore(recipe)),
    comfortScore: Math.min(100, Number(recipe.comfortScore || 5) * 10),
    quickMealScore: quickMealScore(recipe)
  };
}

function safeCssEscape(value) {
  return window.CSS?.escape ? CSS.escape(String(value)) : String(value).replace(/["\\]/g, '\\$&');
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
  if (score >= 80) return 'Core Ingredients Match';
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
  const selected = [...state.selectedIngredients].map(normalizeIngredientName);
  if (!selected.length) return [];
  const singleIngredientMode = options.singleIngredientMode ?? selected.length === 1;
  const matches = state.recipes
    .filter(recipeIsCore)
    .filter((recipe) => recipe.isRealDish === true)
    .map((recipe, index) => {
      const pantryBreakdown = pantryRankingBreakdown(recipe, selected);
      const validity = validateDishCompatibility(recipe, selected, pantryBreakdown);
      const primary = pantryBreakdown.coreIngredients;
      const secondary = pantryBreakdown.optionalIngredients;
      const matchedPrimary = pantryBreakdown.matchedCore;
      const matchedPrimaryCount = pantryBreakdown.coreIngredientMatches;
      const selectedCoverage = pantryBreakdown.matchedSelected;
      const selectedCoverageCount = pantryBreakdown.selectedIngredientMatches;
      const selectedCoverageRatio = selected.length ? selectedCoverageCount / selected.length : 0;
      const requiredPrimaryCount = Math.min(primary.length || 1, requiredPrimaryMatches(recipe, primary.length || 2));
      const primaryRatio = primary.length ? matchedPrimaryCount / Math.max(1, primary.length) : 0;
      const hasEveryPrimaryIngredient = primary.length > 0 && matchedPrimaryCount >= primary.length;
      const matchedPrimaryNames = matchedPrimary.map((name) => formatIngredientName(name));
      const missingPrimary = pantryBreakdown.missingCore.map((name) => formatIngredientName(name));
      const secondaryMatches = pantryBreakdown.matchedOptional;
      const mealTypeBonus = recipeMatchesMeal(recipe, state.meal) ? 10 : 0;
      const recipePopularity = Math.min(20, userPreferenceScore(recipe));
      const comfort = Math.min(100, Number(recipe.comfortScore || 5) * 10);
      const quick = quickMealScore(recipe);
      const discovery = Math.min(100, discoveryScore(recipe, index));
      const preference = Math.min(100, userPreferenceScore(recipe));
      const secondaryTotal = secondary.length;
      const secondaryMatchCount = pantryBreakdown.optionalIngredientMatches;
      const coverage = pantryCoverageDetails(pantryBreakdown);
      const secondaryRatio = secondaryTotal ? secondaryMatchCount / secondaryTotal : coverage.requiredRatio;
      let ingredientMatchScore = coverage.confidence;
      if (selected.length >= 2 && pantryBreakdown.unmatchedSelected.length) {
        ingredientMatchScore = Math.min(49, ingredientMatchScore - (pantryBreakdown.unmatchedSelected.length * 28));
      }
      if (!hasEveryPrimaryIngredient) ingredientMatchScore = Math.min(64, ingredientMatchScore);
      if (pantryBreakdown.stapleMismatch) ingredientMatchScore = Math.min(38, ingredientMatchScore);
      if (singleIngredientMode) ingredientMatchScore = Math.min(30, ingredientMatchScore);
      const overallMatchPercent = ingredientMatchScore;
      const tier = matchTier(ingredientMatchScore);
      const unlockIngredient = highestImpactMissingIngredient(primary, secondary, selected);
      const mood = activeMood();
      const pantryScore = Math.round(coverage.pantryCoverageRatio * 100);
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
      const exactCoreBoost = hasEveryPrimaryIngredient ? 220 : 0;
      const selectedCoverageBoost = Math.round(selectedCoverageRatio * 170);
      const rankingScore = Math.round(
        (pantryBreakdown.score * 12)
        + (ingredientMatchScore * 4)
        + (matchedPrimaryCount * 80)
        + exactCoreBoost
        + selectedCoverageBoost
        + (secondaryMatches.length * 6)
        + Math.min(8, moodScore)
        + mealTypeBonus
        + Math.min(8, recipePopularity)
      );
      return {
        recipe,
        ingredientMatchScore,
        ingredientScore: ingredientMatchScore,
        primaryMatchPercent: Math.round(primaryRatio * 100),
        secondaryMatchCount,
        secondaryTotal,
        selectedCoverageCount,
        selectedCoverageRatio,
        unmatchedSelected: pantryBreakdown.unmatchedSelected,
        unusedSelectedPenalty: pantryBreakdown.unusedSelectedPenalty,
        overallMatchPercent,
        finalScore: rankingScore,
        rankingScore,
        moodTier,
        pantryScore,
        pantryAvailableCount: coverage.pantryAvailableCount,
        pantryIngredientCount: coverage.pantryIngredientCount,
        hasAllRecipeIngredients: coverage.hasAllRecipeIngredients,
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
        pantryCoreIngredients: primary,
        pantryRequiredIngredients: pantryBreakdown.requiredIngredients,
        pantryOptionalIngredients: secondary,
        pantryBaseIngredient: pantryBreakdown.baseIngredient,
        pantryDishFamily: pantryBreakdown.dishFamily,
        pantryFormulaScore: pantryBreakdown.score,
        stapleMismatchPenalty: pantryBreakdown.stapleMismatchPenalty,
        validity,
        classification: classifyIngredientMatch(ingredientMatchScore),
        discoveryScore: discovery,
        userPreferenceScore: preference,
        comfortScore: comfort,
        quickMealScore: quick
      };
    })
    .filter((item) => {
      if (!item.validity.valid) {
        logInvalidDishMatch(item.recipe, selected, item.validity.reasons.join('; '));
        return false;
      }
      const included = item.ingredientMatchScore > 0
        && item.selectedCoverageCount > 0
        && (!activeMood() || item.moodTier !== MoodTier.EXCLUDE || item.matchedPrimaryCount >= item.requiredPrimaryCount);
      if (window.COOKBUDDY_DEBUG_MATCHING) {
        console.log('[Tomo ingredient match]', {
          recipe: item.recipe.title,
          mood: labelForMood(activeMood()),
          moodTier: item.moodTier,
          primaryIngredients: item.pantryCoreIngredients,
          requiredIngredients: item.pantryRequiredIngredients,
          secondaryIngredients: item.pantryOptionalIngredients,
          baseIngredient: item.pantryBaseIngredient,
          dishFamily: item.pantryDishFamily,
          validity: item.validity,
          matchedPrimaryCount: item.matchedPrimaryCount,
          required: item.requiredPrimaryCount,
          ingredientMatchScore: item.ingredientMatchScore,
          pantryFormulaScore: item.pantryFormulaScore,
          stapleMismatchPenalty: item.stapleMismatchPenalty,
          unusedSelectedPenalty: item.unusedSelectedPenalty,
          unmatchedSelected: item.unmatchedSelected,
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
  const strictMatches = matches.filter((match) => match.validity?.strict);
  const validityFilteredMatches = strictMatches.length ? strictMatches : matches.filter((match) => match.validity?.fallback);
  const fallback = eggFriedRiceFallbackMatch(selected);
  const reinforcedMatches = fallback && !validityFilteredMatches.some((match) => match.recipe.id === fallback.recipe.id)
    ? [fallback, ...validityFilteredMatches]
    : validityFilteredMatches.map((match) => fallback && match.recipe.id === fallback.recipe.id
      ? {
        ...match,
        ingredientMatchScore: fallback.ingredientMatchScore,
        ingredientScore: fallback.ingredientScore,
        overallMatchPercent: fallback.overallMatchPercent,
        primaryMatchPercent: 100,
        finalScore: Math.max(match.finalScore, fallback.finalScore),
        rankingScore: Math.max(match.rankingScore, fallback.rankingScore),
        selectedCoverageCount: Math.max(match.selectedCoverageCount || 0, 2),
        selectedCoverageRatio: 1,
        tierKey: 'top',
        tierLabel: 'Top Match',
        classification: classifyIngredientMatch(fallback.ingredientMatchScore),
        matchedPrimary: ['Rice', 'Egg'],
        missingPrimary: [],
        pantryAvailableCount: fallback.pantryAvailableCount,
        pantryIngredientCount: fallback.pantryIngredientCount,
        hasAllRecipeIngredients: fallback.hasAllRecipeIngredients
      }
      : match);
  const dedupedMatches = dedupeRecommendationMatches(reinforcedMatches);
  const hasStapleAlignedMatch = dedupedMatches.some((match) => {
    return (match.selectedCoverageCount || 0) > 0
      && (match.matchedPrimaryCount || 0) > 0
      && !(match.stapleMismatchPenalty > 0)
      && match.finalScore > 0;
  });
  const guardedMatches = hasStapleAlignedMatch
    ? dedupedMatches.filter((match) => !(match.stapleMismatchPenalty > 0))
    : dedupedMatches;
  return guardedMatches
    .sort((a, b) => {
      return (b.selectedCoverageCount || 0) - (a.selectedCoverageCount || 0)
        || (a.stapleMismatchPenalty || 0) - (b.stapleMismatchPenalty || 0)
        || b.matchedPrimaryCount - a.matchedPrimaryCount
        || (a.missingPrimary?.length || 0) - (b.missingPrimary?.length || 0)
        || b.ingredientMatchScore - a.ingredientMatchScore
        || (b.selectedCoverageCount || 0) - (a.selectedCoverageCount || 0)
        || b.finalScore - a.finalScore
        || moodTierOrder[b.moodTier] - moodTierOrder[a.moodTier]
        || b.moodScore - a.moodScore
        || Number(b.recipe.comfortScore || 0) - Number(a.recipe.comfortScore || 0)
        || a.recipe.title.localeCompare(b.recipe.title);
    });
}

function ingredientMatches() {
  return weightedIngredientMatches().map((item) => item.recipe);
}

function tomoMatchCopy(match) {
  const title = match.recipe.title;
  if (match.hasAllRecipeIngredients) return `🍅 You already have everything for ${title}.`;
  if (match.primaryMatchPercent >= 100) return `🍅 You have the key ingredients for ${title}.`;
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
  return `${match.tierLabel} • Core Ingredients Match`;
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
      <span><small>Pantry Coverage</small><strong>${match.pantryAvailableCount || 0}/${match.pantryIngredientCount || 0}</strong></span>
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

function pantryMissingSummary(match) {
  const keyCount = match.matchedPrimaryCount || 0;
  const requiredCount = match.requiredPrimaryCount || Math.min((match.pantryCoreIngredients || []).length || 1, 2);
  if (keyCount >= requiredCount && requiredCount > 0) return 'Key ingredients available';
  if (keyCount > 0) return `${keyCount} key ${keyCount === 1 ? 'ingredient' : 'ingredients'} available`;
  if ((match.selectedCoverageCount || 0) > 0 || (match.secondaryMatchCount || 0) > 0) return 'Some ingredients available';
  return 'Add more ingredients to improve match';
}

const pantrySuggestionPreference = [
  'onion',
  'tomato',
  'garlic',
  'potato',
  'egg',
  'paneer',
  'curd',
  'lemon',
  'ginger',
  'capsicum',
  'green chilli',
  'coriander',
  'soy sauce'
];

function suggestionPreferenceScore(ingredient) {
  const index = pantrySuggestionPreference.indexOf(normalizeIngredientName(ingredient));
  return index === -1 ? 0 : pantrySuggestionPreference.length - index;
}

function isSmartPantrySuggestionAllowed(ingredient) {
  const normalized = normalizeIngredientName(ingredient);
  if (!normalized || ['salt', 'water', 'oil', 'ghee', 'butter'].includes(normalized)) return false;
  const catalog = Array.isArray(window.COOKBUDDY_PANTRY_CATALOG) ? window.COOKBUDDY_PANTRY_CATALOG : [];
  const catalogItem = catalog.find((item) => normalizeIngredientName(item.ingredient_name || item.ingredientName || item.name) === normalized);
  return catalogItem?.display_status !== 'hidden';
}

function pantrySuggestionList(items) {
  if (items.length <= 1) return items[0] || '';
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items[0]}, ${items[1]} or ${items[2]}`;
}

function pantryRecipeIngredientNames(recipe) {
  return uniqueNormalizedIngredients([
    ...configuredCoreIngredients(recipe),
    ...configuredRequiredIngredients(recipe),
    ...configuredOptionalIngredients(recipe),
    ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || '')
  ]);
}

function pantryPairUnlocks(selected, candidate) {
  const pair = uniqueNormalizedIngredients([...selected, candidate]);
  if (pair.length <= selected.length) return [];
  return state.recipes
    .filter(recipeIsCore)
    .filter((recipe) => recipe.isRealDish === true)
    .filter((recipe) => !recipe.excludeFromRecommendations)
    .map((recipe) => {
      const breakdown = pantryRankingBreakdown(recipe, pair);
      const validity = validateDishCompatibility(recipe, pair, breakdown);
      const coverage = pantryCoverageDetails(breakdown);
      const usesEverySelected = pair.every((ingredient) => breakdown.matchedSelected.some((matched) => pantryIngredientEquals(matched, ingredient)));
      const stateName = validity.strict && coverage.confidence >= pantryStrongMatchThreshold ? 'STRONG_MATCH' : validity.valid ? 'PARTIAL_MATCH' : 'NO_STRONG_MATCH';
      return { recipe, breakdown, coverage, stateName, usesEverySelected };
    })
    .filter((item) => item.usesEverySelected && ['STRONG_MATCH', 'PARTIAL_MATCH'].includes(item.stateName))
    .sort((a, b) => b.coverage.confidence - a.coverage.confidence || a.recipe.title.localeCompare(b.recipe.title));
}

function databaseBackedPantryUnlocks(selected, limit = 3) {
  const selectedNames = uniqueNormalizedIngredients(selected);
  if (!selectedNames.length) return [];
  const cacheKey = pantryUnlockCacheKey(selectedNames, limit);
  if (pantryUnlockCache.has(cacheKey)) return pantryUnlockCache.get(cacheKey);
  const candidates = new Map();
  state.recipes
    .filter(recipeIsCore)
    .filter((recipe) => recipe.isRealDish === true)
    .filter((recipe) => !recipe.excludeFromRecommendations)
    .forEach((recipe) => {
      const names = pantryRecipeIngredientNames(recipe);
      const containsSelected = selectedNames.every((selectedName) => names.some((name) => pantryIngredientEquals(name, selectedName)));
      if (!containsSelected) return;
      names.forEach((name) => {
        if (selectedNames.some((selectedName) => pantryIngredientEquals(selectedName, name))) return;
        if (!isSmartPantrySuggestionAllowed(name)) return;
        const unlocks = pantryPairUnlocks(selectedNames, name);
        if (!unlocks.length) return;
        const key = normalizeIngredientName(name);
        const existing = candidates.get(key) || { ingredient: formatIngredientName(name), dishes: new Set(), bestScore: 0, strongCount: 0 };
        unlocks.slice(0, 4).forEach((unlock) => {
          existing.dishes.add(unlock.recipe.title);
          existing.bestScore = Math.max(existing.bestScore, unlock.coverage.confidence);
          if (unlock.stateName === 'STRONG_MATCH') existing.strongCount += 1;
        });
        candidates.set(key, existing);
      });
    });
  const unlocks = [...candidates.values()]
    .map((item) => ({ ...item, dishes: [...item.dishes] }))
    .sort((a, b) => b.strongCount - a.strongCount
      || b.bestScore - a.bestScore
      || suggestionPreferenceScore(b.ingredient) - suggestionPreferenceScore(a.ingredient)
      || a.ingredient.localeCompare(b.ingredient))
    .slice(0, limit);
  pantryUnlockCache.set(cacheKey, unlocks);
  return unlocks;
}

function pantryUnlockCacheKey(selected, limit = 3) {
  return `${uniqueNormalizedIngredients(selected).sort().join('|')}::${limit}`;
}

function pantryUnlockMessageFromUnlocks(unlocks) {
  if (!unlocks.length) return 'No strong match yet. Try another ingredient from your pantry.';
  return `Try ${pantrySuggestionList(unlocks.map((item) => item.ingredient))} to unlock real dishes.`;
}

function cachedPantryUnlockMessage(selected) {
  const cacheKey = pantryUnlockCacheKey(selected);
  if (!pantryUnlockCache.has(cacheKey)) return '';
  return pantryUnlockMessageFromUnlocks(pantryUnlockCache.get(cacheKey));
}

function pantryUnlockMessage(selected) {
  const unlocks = databaseBackedPantryUnlocks(selected);
  return pantryUnlockMessageFromUnlocks(unlocks);
}

function smartPantrySuggestion(selected, matches) {
  if (!selected.length) return '';
  if (selected.length === 1) return pantryUnlockMessage(selected);
  const scores = new Map();
  const selectedNames = selected.map(normalizeIngredientName);
  const relevantMatches = matches
    .filter((match) => match.recipe?.isRealDish === true)
    .filter((match) => (match.selectedCoverageCount || 0) > 0 || (match.matchedPrimaryCount || 0) > 0)
    .sort((a, b) => b.finalScore - a.finalScore || pantryMatchConfidence(b) - pantryMatchConfidence(a));

  relevantMatches.forEach((match) => {
    const candidates = [
      ...(match.missingPrimary || []),
      ...(match.pantryOptionalIngredients || [])
        .map(formatIngredientName)
        .filter((name) => !selectedMatchesIngredient(selectedNames, name))
    ];
    [...new Set(candidates.map(formatIngredientName))].forEach((ingredient) => {
      const key = normalizeIngredientName(ingredient);
      if (!key || selectedMatchesIngredient(selectedNames, ingredient) || !isSmartPantrySuggestionAllowed(ingredient)) return;
      const predicted = predictedMatchAfterAddingIngredient(match, ingredient);
      const existing = scores.get(key) || { ingredient: formatIngredientName(ingredient), score: 0, unlocks: 0 };
      existing.score += predicted >= pantryStrongMatchThreshold ? 8 : predicted >= 50 ? 5 : 2;
      existing.score += Math.max(0, Math.round((match.finalScore || 0) / 1000));
      existing.score += suggestionPreferenceScore(ingredient);
      existing.unlocks += predicted >= 50 ? 1 : 0;
      scores.set(key, existing);
    });
  });

  const suggestions = [...scores.values()]
    .filter((item) => item.unlocks > 0)
    .sort((a, b) => b.unlocks - a.unlocks || b.score - a.score || a.ingredient.localeCompare(b.ingredient))
    .slice(0, 3)
    .map((item) => item.ingredient);

  if (!suggestions.length) return pantryUnlockMessage(selected);
  if (suggestions.length === 1) return `Add ${suggestions[0]} for better matches.`;
  if (suggestions.length === 2) return `Add ${pantrySuggestionList(suggestions)} for better matches.`;
  return `Try ${pantrySuggestionList(suggestions)} to unlock more dishes.`;
}

function matchSection(title, matches, helperText = '') {
  const section = document.createElement('section');
  section.className = 'weighted-match-section';
  section.innerHTML = `
    <h3>${title}</h3>
    ${helperText ? `<p class="dish-match-helper">${escapeHtml(helperText)}</p>` : ''}
    <div class="weighted-match-list"></div>
  `;
  const list = section.querySelector('.weighted-match-list');
  const sortedMatches = [...matches].sort((a, b) => {
    return pantryMatchConfidence(b) - pantryMatchConfidence(a)
      || b.mealTypeBonus - a.mealTypeBonus
      || b.quickMealScore - a.quickMealScore
      || b.finalScore - a.finalScore
      || a.recipe.title.localeCompare(b.recipe.title);
  });
  sortedMatches.forEach((match) => {
    const card = document.createElement('article');
    card.className = 'weighted-match-card';
    card.dataset.recipeId = match.recipe.id;
    card.innerHTML = `
      <span class="match-thumb">${recipeVisual(match.recipe)}</span>
      <div class="match-card-copy">
        <strong>${match.recipe.title}</strong>
        <span class="match-percent">${pantryMatchConfidence(match)}% Match</span>
        <p>${escapeHtml(pantryMissingSummary(match))}</p>
      </div>
    `;
    list.appendChild(card);
  });
  return section;
}

function renderPantrySuggestionsContent(content) {
  if (!els.ingredientResults) return;
  const applyContent = () => {
    if (typeof content === 'string') {
      els.ingredientResults.innerHTML = content;
    } else {
      els.ingredientResults.replaceChildren(content);
    }
  };
  clearTimeout(pantryResultsTransitionTimer);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !els.ingredientResults.childElementCount) {
    applyContent();
    els.ingredientResults.classList.remove('is-updating');
    return;
  }
  els.ingredientResults.classList.add('is-updating');
  pantryResultsTransitionTimer = setTimeout(() => {
    applyContent();
    requestAnimationFrame(() => els.ingredientResults.classList.remove('is-updating'));
  }, 90);
}

function curatedPantryMatches(matches) {
  return matches
    .filter((item) => item.matchedPrimaryCount >= item.requiredPrimaryCount && pantryMatchConfidence(item) >= pantryStrongMatchThreshold)
    .sort((a, b) => {
      return pantryMatchConfidence(b) - pantryMatchConfidence(a)
        || b.mealTypeBonus - a.mealTypeBonus
        || b.quickMealScore - a.quickMealScore
        || b.finalScore - a.finalScore
        || a.recipe.title.localeCompare(b.recipe.title);
    })
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

function selectedIngredientSummary(selected) {
  return selected
    .slice(0, 2)
    .map(formatIngredientName)
    .join(' + ');
}

function selectedIncludesAll(selected, required) {
  return required.every((ingredient) => selected.some((selectedIngredient) => selectedCoversIngredient([selectedIngredient], ingredient)));
}

function pantryMatchConfidence(match) {
  if (!match?.recipe) return 0;
  return Math.max(0, Math.min(100, Math.round(match.overallMatchPercent || match.ingredientMatchScore || 0)));
}

function pantryRecommendationState(match, selected = [...state.selectedIngredients]) {
  if (hasWeirdPantryCombo(selected)) return 'UNUSUAL_COMBO';
  if (!match?.recipe || match.recipe.isRealDish !== true) return 'NO_STRONG_MATCH';
  const confidence = pantryMatchConfidence(match);
  const hasRequiredIngredients = (match.missingPrimary || []).length === 0
    && (match.matchedPrimaryCount || 0) >= (match.requiredPrimaryCount || 1);
  const selectedCoverageRatio = selected.length ? (match.selectedCoverageCount || 0) / selected.length : 1;
  const ignoresSelectedIngredient = selected.length >= 2
    && ((match.unmatchedSelected || []).length > 0 || selectedCoverageRatio < 1);
  const selectedNames = selected.map(normalizeIngredientName);
  const isSparsePaneerRice = selectedNames.length === 2
    && selectedIncludesAll(selectedNames, ['rice', 'paneer'])
    && selectedIncludesAll(match.pantryCoreIngredients || [], ['rice', 'paneer'])
    && !(match.pantryOptionalIngredients || []).some((ingredient) => selectedMatchesPantryIngredientName(ingredient));
  if (isSparsePaneerRice) return 'PARTIAL_MATCH';
  if (hasRequiredIngredients && !ignoresSelectedIngredient && confidence >= pantryStrongMatchThreshold) return 'STRONG_MATCH';
  if ((match.matchedPrimaryCount || 0) > 0 || (match.selectedCoverageCount || 0) > 0) return 'PARTIAL_MATCH';
  return 'NO_STRONG_MATCH';
}

function pantryMatchLabel(match, selected = [...state.selectedIngredients]) {
  const stateName = pantryRecommendationState(match, selected);
  if (stateName === 'STRONG_MATCH') return 'Strong match';
  if (stateName === 'PARTIAL_MATCH') return 'Almost there';
  if (stateName === 'UNUSUAL_COMBO') return 'Unusual combo';
  return 'No strong match yet';
}

function selectedMatchesPantryIngredientName(name) {
  const selected = [...state.selectedIngredients].map(normalizeIngredientName);
  return selected.some((selectedName) => pantryIngredientEquals(selectedName, name));
}

function nextIngredientPrompt(match) {
  const selected = [...state.selectedIngredients].map(normalizeIngredientName);
  if (selectedIncludesAll(selected, ['rice', 'paneer']) && selected.length === 2) {
    return 'Add onion, capsicum, or tomato to unlock paneer-based rice dishes';
  }
  const missingRequired = (match.missingPrimary || []).filter((name) => !selectedMatchesPantryIngredientName(name));
  if (missingRequired.length) {
    const required = missingRequired.slice(0, 2);
    const joined = required.length === 1 ? required[0] : `${required[0]} and ${required[1]}`;
    return `Add ${joined.toLowerCase()} to make ${match.recipe.title}`;
  }
  const optional = (match.pantryOptionalIngredients || [])
    .map(formatIngredientName)
    .filter((name) => !selectedMatchesPantryIngredientName(name));
  const candidates = optional.slice(0, 2);
  if (!candidates.length) return '';
  const joined = candidates.length === 1 ? candidates[0] : `${candidates[0]} or ${candidates[1]}`;
  return `Add ${joined.toLowerCase()} to make ${match.recipe.title}`;
}

function ricePairingSuggestion(selected) {
  if (!selected.some((ingredient) => pantryIngredientEquals(ingredient, 'rice'))) return '';
  return 'Add tomato, potato, egg, curd, or lemon for better rice dishes.';
}

function logMissingLikelyRecipe(selected) {
  if (selected.length < 2) return;
  console.info(`Missing likely recipe: ${selected.map(normalizeIngredientName).join(' + ')}`);
}

function pantryBestMatch(matches, selected) {
  if (selected.length < 2) return null;
  if (selectedIncludesAll(selected, ['rice', 'egg'])) {
    const eggFriedRice = state.recipes.find((recipe) => normalizeIngredientName(recipe.title) === 'egg fried rice');
    if (eggFriedRice) {
      return matches.find((match) => match.recipe.id === eggFriedRice.id) || {
        recipe: eggFriedRice,
        overallMatchPercent: 92,
        ingredientMatchScore: 92
      };
    }
  }
  const best = matches[0] || null;
  return pantryRecommendationState(best, selected) === 'STRONG_MATCH' ? best : null;
}

function renderPantryInstantPreview(selected, matches, suggestionLine = '') {
  if (!els.pantryInsightBanner || !els.pantryBestMatch) return;
  const count = selected.length;
  if (!count) {
    els.pantryInsightBanner.textContent = 'Tell Tomo what’s in your kitchen.';
    els.pantryBestMatch.classList.add('hidden');
    els.pantryBestMatch.classList.remove('weak-match');
    els.pantryBestMatch.innerHTML = '';
    return;
  }
  if (count === 1) {
    els.pantryInsightBanner.textContent = 'No strong match yet';
    els.pantryBestMatch.classList.remove('hidden');
    els.pantryBestMatch.classList.add('weak-match');
    els.pantryBestMatch.innerHTML = `<p class="pantry-best-empty">${escapeHtml(suggestionLine || pantryUnlockMessage(selected))}</p>`;
    return;
  }

  if (hasWeirdPantryCombo(selected)) {
    els.pantryInsightBanner.textContent = 'No strong match yet';
    els.pantryBestMatch.classList.remove('hidden');
    els.pantryBestMatch.classList.add('weak-match');
    els.pantryBestMatch.innerHTML = `<p class="pantry-best-empty">${escapeHtml(noStrongPantryPrompt())}</p>`;
    return;
  }

  els.pantryInsightBanner.textContent = matches.length ? `🍳 I found dishes for ${selectedIngredientSummary(selected)}` : 'No strong match yet';
  const best = pantryBestMatch(matches, selected);
  if (!best?.recipe) {
    logMissingLikelyRecipe(selected);
    const partial = matches.find((match) => pantryRecommendationState(match, selected) === 'PARTIAL_MATCH');
    if (partial?.recipe) {
      els.pantryInsightBanner.textContent = 'Almost there';
      els.pantryBestMatch.classList.remove('hidden');
      els.pantryBestMatch.classList.add('weak-match');
      const coverageText = `${partial.pantryAvailableCount || 0} of ${partial.pantryIngredientCount || 0} ingredients available`;
      els.pantryBestMatch.innerHTML = `
        <div>
          <span class="pantry-best-label">Almost there</span>
          <strong>${escapeHtml(partial.recipe.title)}</strong>
          <small>${escapeHtml(coverageText)}</small>
          <p>${escapeHtml(nextIngredientPrompt(partial) || 'Add one more ingredient for a better match')}</p>
        </div>
        <button type="button" data-pantry-best-recipe="${escapeHtml(partial.recipe.id)}">View Dish</button>
      `;
      return;
    }
    els.pantryInsightBanner.textContent = 'No strong match yet';
    els.pantryBestMatch.classList.remove('hidden');
    els.pantryBestMatch.classList.add('weak-match');
    els.pantryBestMatch.innerHTML = `<p class="pantry-best-empty">${escapeHtml(noStrongPantryPrompt())}</p>`;
    return;
  }

  const coverageText = `${best.pantryAvailableCount || 0} of ${best.pantryIngredientCount || 0} ingredients available`;
  const reason = best.hasAllRecipeIngredients ? 'Required ingredients selected' : 'Key ingredients available';
  els.pantryBestMatch.classList.remove('hidden');
  els.pantryBestMatch.classList.remove('weak-match');
  els.pantryBestMatch.innerHTML = `
    <div>
      <span class="pantry-best-label">Strong match</span>
      <strong>${escapeHtml(best.recipe.title)}</strong>
      <small>Key ingredients match</small>
      <p>${escapeHtml(coverageText)} • ${escapeHtml(reason)}</p>
    </div>
    <button type="button" data-pantry-best-recipe="${escapeHtml(best.recipe.id)}">View Dish</button>
  `;
}

function renderIngredientResults() {
  const selected = [...state.selectedIngredients];
  if (els.selectedCount) {
    els.selectedCount.textContent = selected.length ? `${selected.length} selected` : 'Choose 2-4 ingredients';
  }
  els.pantrySuggestions?.classList.remove('hidden');
  renderSelectedIngredientTray();
  if (!selected.length) {
    renderPantryInstantPreview(selected, [], '');
    updatePantryTomoMessage({ context: 'pantry_open' });
    renderPantrySuggestionsContent('<p class="preview-empty dish-match-empty">Start with 2-4 ingredients.<small>Try Rice + Egg or Rava + Onion to see instant matches.</small></p>');
    return;
  }

  if (selected.length === 1) {
    const cachedSuggestion = cachedPantryUnlockMessage(selected);
    const suggestionLine = cachedSuggestion || 'Checking real recipe paths...';
    renderPantryInstantPreview(selected, [], suggestionLine);
    if (els.pantryTomoMessage) els.pantryTomoMessage.textContent = formatTomoMessage(suggestionLine);
    renderPantrySuggestionsContent(`<p class="preview-empty dish-match-empty">${escapeHtml(suggestionLine)}</p>`);
    if (!cachedSuggestion) {
      setTimeout(() => {
        const current = [...state.selectedIngredients];
        if (current.length !== 1 || !pantryIngredientEquals(current[0], selected[0])) return;
        const message = pantryUnlockMessage(selected);
        renderPantryInstantPreview(selected, [], message);
        if (els.pantryTomoMessage) els.pantryTomoMessage.textContent = formatTomoMessage(message);
        renderPantrySuggestionsContent(`<p class="preview-empty dish-match-empty">${escapeHtml(message)}</p>`);
      }, 0);
    }
    return;
  }

  const matches = weightedIngredientMatches();
  const curatedMatches = curatedPantryMatches(matches);
  const suggestionLine = smartPantrySuggestion(selected, matches);
  renderPantryInstantPreview(selected, matches, suggestionLine);
  updatePantryTomoMessage({ context: 'ingredient_selected', selectedIngredients: selected });
  if (hasWeirdPantryCombo(selected)) {
    updatePantryTomoMessage({ context: 'empty_state', selectedIngredients: selected });
    renderPantrySuggestionsContent(`<p class="preview-empty dish-match-empty">${escapeHtml(suggestionLine)}</p>`);
    return;
  }

  if (!curatedMatches.length) {
    renderPantrySuggestionsContent(`<p class="preview-empty dish-match-empty">${escapeHtml(suggestionLine)}</p>`);
    return;
  }

  renderPantrySuggestionsContent(matchSection('Dish Matches', curatedMatches, suggestionLine));
}

function schedulePantrySelectionRefresh() {
  if (pantrySelectionRenderFrame) cancelAnimationFrame(pantrySelectionRenderFrame);
  pantrySelectionRenderFrame = requestAnimationFrame(() => {
    pantrySelectionRenderFrame = null;
    renderIngredientResults();
    setTimeout(renderTomoPick, 80);
  });
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

function normalizeIngredientId(value) {
  const normalized = normalizeIngredientName(value).replace(/\s+/g, '-');
  if (normalized.length > 3 && normalized.endsWith('ies')) return `${normalized.slice(0, -3)}y`;
  if (normalized.length > 3 && normalized.endsWith('es')) return normalized.slice(0, -2);
  if (normalized.length > 3 && normalized.endsWith('s') && !normalized.endsWith('ss')) return normalized.slice(0, -1);
  return normalized;
}

function ingredientDisplayName(item) {
  return item?.name || item?.ingredientName || item?.ingredient_name || item?.ingredient_id || item?.ingredientId || '';
}

function ingredientMatchKeys(item) {
  const name = ingredientDisplayName(item);
  return [
    item?.ingredient_id,
    item?.ingredientId,
    item?.id,
    name,
    ...ingredientAliases(name)
  ]
    .filter(Boolean)
    .map(normalizeIngredientId);
}

function selectedIngredientKeys(selected = [...state.selectedIngredients]) {
  return selected
    .flatMap((ingredient) => [ingredient, ...ingredientAliases(ingredient)])
    .filter(Boolean)
    .map(normalizeIngredientId);
}

function selectedMatchesRecipeIngredient(item, selected = [...state.selectedIngredients]) {
  const selectedKeys = new Set(selectedIngredientKeys(selected));
  return ingredientMatchKeys(item).some((key) => selectedKeys.has(key));
}

function recipeDetailIngredients(recipe) {
  const sourceIngredients = (recipe.ingredients || []).filter((item) => ingredientDisplayName(item));
  const fallbackIngredients = [
    ...explicitPrimaryIngredients(recipe).map((name) => ({ name, role: 'required', isMain: true })),
    ...explicitSecondaryIngredients(recipe).map((name) => ({ name, role: 'optional', isMain: false }))
  ];
  const ingredients = sourceIngredients.length ? sourceIngredients : fallbackIngredients;
  const seen = new Set();
  return ingredients.filter((item) => {
    const key = ingredientMatchKeys(item)[0] || normalizeIngredientId(ingredientDisplayName(item));
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function persistGroceryItems() {
  localStorage.setItem('cookbuddy_grocery', JSON.stringify(state.groceryItems));
}

function recipeShoppingIngredients(recipe) {
  if (!state.selectedIngredients.size) return [];
  const seen = new Set();
  return recipeDetailIngredients(recipe)
    .filter((ingredient) => !selectedMatchesRecipeIngredient(ingredient))
    .map((ingredient) => formatIngredientName(ingredientDisplayName(ingredient)))
    .filter((ingredient) => {
      const key = normalizeIngredientId(ingredient);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function recipePantryIngredientGroups(recipe) {
  const ingredients = recipeDetailIngredients(recipe);
  if (!state.selectedIngredients.size) {
    return { ingredients, available: [], missing: [] };
  }
  const available = [];
  const missing = [];
  ingredients.forEach((ingredient) => {
    (selectedMatchesRecipeIngredient(ingredient) ? available : missing).push(ingredient);
  });
  return { ingredients, available, missing };
}

function ingredientNameListMarkup(ingredients, marker = '•') {
  return `
    <ul>
      ${ingredients.map((item) => `<li><span>${marker}</span>${escapeHtml(formatIngredientName(ingredientDisplayName(item)))}</li>`).join('')}
    </ul>
  `;
}

function dishCategoryBadge(recipe) {
  const family = normalizeDishFamilyName(inferredDishFamily(recipe));
  const text = `${recipe.title || ''} ${family} ${(recipe.tags || []).join(' ')}`.toLowerCase();
  const familyCategories = {
    paratha: { icon: '🫓', label: 'Paratha' },
    chapati: { icon: '🫓', label: 'Flatbread' },
    'rice-meal': { icon: '🍚', label: 'Rice' },
    'rice-dal': { icon: '🍚', label: 'Rice' },
    'fried-rice': { icon: '🍚', label: 'Rice' },
    'paneer-curry': { icon: '🍛', label: 'Curry' },
    'fish-curry': { icon: '🍛', label: 'Curry' },
    omelette: { icon: '🍳', label: 'Egg' },
    dosa: { icon: '🥞', label: 'Dosa' },
    idli: { icon: '🥞', label: 'Idli' },
    uttapam: { icon: '🥞', label: 'Uttapam' },
    noodles: { icon: '🍜', label: 'Noodles' },
    chicken: { icon: '🍗', label: 'Non-veg' }
  };
  const categories = [
    { matches: ['paratha', 'flatbread', 'chapati', 'roti'], icon: '🫓', label: 'Flatbread' },
    { matches: ['sandwich', 'toast'], icon: '🥪', label: 'Sandwich' },
    { matches: ['dosa', 'idli', 'uttapam'], icon: '🥞', label: 'Dosa & Idli' },
    { matches: ['noodle'], icon: '🍜', label: 'Noodles' },
    { matches: ['chicken', 'non-vegetarian', 'non veg'], icon: '🍗', label: 'Non-veg' },
    { matches: ['egg', 'omelette'], icon: '🍳', label: 'Egg' },
    { matches: ['curry', 'gravy', 'paneer-curry', 'fish-curry'], icon: '🍛', label: 'Curry' },
    { matches: ['rice', 'biryani', 'pulao', 'fried-rice'], icon: '🍚', label: 'Rice' }
  ];
  const category = familyCategories[family]
    || categories.find((item) => item.matches.some((term) => text.includes(term)))
    || { icon: '🍲', label: formatIngredientName(family || 'Dish') };
  return `
    <div class="detail-category-icon" aria-hidden="true">${category.icon}</div>
    <small>${escapeHtml(category.label)}</small>
  `;
}

function selectedPantryIngredientsFor(name) {
  return [...state.selectedIngredients].filter((selected) => (
    pantryIngredientEquals(selected, name)
    || selectedCoversIngredient([selected], name)
    || selectedCoversIngredient([name], selected)
  ));
}

function ingredientIsOnShoppingList(name) {
  const key = normalizeIngredientId(name);
  return state.groceryItems.some((item) => normalizeIngredientId(item.ingredientName) === key);
}

function removeIngredientFromShoppingList(name) {
  const key = normalizeIngredientId(name);
  state.groceryItems = state.groceryItems.filter((item) => normalizeIngredientId(item.ingredientName) !== key);
  persistGroceryItems();
}

function detailIngredientItem(name, status) {
  const label = escapeHtml(formatIngredientName(name));
  const value = escapeHtml(name);
  const available = status === 'available';
  const inShoppingList = ingredientIsOnShoppingList(name);
  return `
    <li class="detail-ingredient ${available ? 'available' : inShoppingList ? 'on-list' : status} ingredient-choice-row">
      <strong>${label}</strong>
      <div class="ingredient-choice-actions">
        <button
          class="ingredient-choice-button pantry-choice ${available ? 'active' : ''}"
          type="button"
          data-set-detail-ingredient-state="${value}"
          data-detail-state="pantry"
          aria-pressed="${available}"
        >${available ? '✓ In Pantry' : '✓ Have'}</button>
        <button
          class="ingredient-choice-button shopping-choice ${inShoppingList && !available ? 'active' : ''}"
          type="button"
          data-set-detail-ingredient-state="${value}"
          data-detail-state="shopping"
          aria-pressed="${inShoppingList && !available}"
        >${inShoppingList && !available ? '🛒 Shopping List' : '🛒 Need'}</button>
        ${(available || inShoppingList)
          ? `<button
              class="ingredient-undo-button"
              type="button"
              data-clear-detail-ingredient-state="${value}"
              data-detail-state="${available ? 'pantry' : 'shopping'}"
            >Undo</button>`
          : ''}
      </div>
    </li>
  `;
}

function detailIngredientGroupsMarkup(recipe) {
  const core = configuredCoreIngredients(recipe);
  const optional = configuredOptionalIngredients(recipe, core);
  const hasPantryContext = state.selectedIngredients.size > 0;
  const itemStatus = (name) => {
    if (!hasPantryContext) return 'neutral';
    return selectedCoversIngredient([...state.selectedIngredients], name) ? 'available' : 'missing';
  };
  const keyMarkup = core.map((name) => {
    const status = itemStatus(name);
    return detailIngredientItem(name, status);
  }).join('');
  const optionalMarkup = optional.map((name) => {
    const status = itemStatus(name);
    return detailIngredientItem(name, status);
  }).join('');
  return `
    <section class="detail-list detail-ingredients">
      <h3>Key Ingredients</h3>
      <ul>${keyMarkup}</ul>
      ${optionalMarkup ? `
        <h4>Nice to have</h4>
        <p class="ingredient-section-helper">Add extras to your shopping list if needed.</p>
        <ul>${optionalMarkup}</ul>
      ` : ''}
    </section>
  `;
}

function detailPantryMatchMarkup(recipe) {
  if (!state.selectedIngredients.size) return '';
  const match = currentRecipePantryMatch(recipe);
  if (!match) return '';
  const available = match.pantryAvailableCount || 0;
  const total = match.pantryIngredientCount || 0;
  const missingOptional = (match.pantryOptionalIngredients || [])
    .filter((name) => !selectedCoversIngredient([...state.selectedIngredients], name))
    .slice(0, 2)
    .map(formatIngredientName);
  const allIngredientsAvailable = match.hasAllRecipeIngredients === true;
  const label = allIngredientsAvailable ? 'Required ingredients selected' : 'Key ingredients match';
  const prompt = allIngredientsAvailable
    ? ''
    : missingOptional.length
      ? `Add ${missingOptional.length === 1 ? missingOptional[0] : `${missingOptional[0]} or ${missingOptional[1]}`} for a better match`
      : nextIngredientPrompt(match);
  return `
    <section class="detail-pantry-match">
      <strong>${escapeHtml(label)}</strong>
      <span>${available} of ${total} ingredients available</span>
      ${prompt ? `<p>${escapeHtml(prompt)}</p>` : ''}
    </section>
  `;
}

function cookingNotesForRecipe(recipe) {
  const specificNotes = {
    'aloo paratha': [
      'Boil and mash potato before mixing the filling.',
      'Keep the dough soft so the paratha rolls easily.',
      'Cook on medium heat with ghee or oil until golden spots appear.'
    ]
  };
  const key = normalizeIngredientName(recipe.title);
  const configured = recipe.cookingNotes || recipe.cooking_notes;
  if (specificNotes[key]) return specificNotes[key];
  if (Array.isArray(configured) && configured.length) return configured;
  return ['Prep the key ingredients first, then cook with your usual base of oil, spices, and herbs.'];
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
  const purchasedCount = state.groceryItems.length - pendingCount;
  els.groceryBadge.textContent = pendingCount;
  els.groceryBadge.classList.toggle('hidden', pendingCount === 0);
  els.clearPurchased?.classList.toggle('hidden', purchasedCount === 0);
  els.groceryList.innerHTML = '';
  if (!state.groceryItems.length) {
    els.groceryList.innerHTML = '<p class="shopping-empty">Add items manually, or let Tomo add missing ingredients from recipes you cook.</p>';
    return;
  }

  const pendingItems = state.groceryItems.filter((item) => !item.isCompleted);
  const purchasedItems = state.groceryItems.filter((item) => item.isCompleted);
  const renderItem = (item) => {
    const row = document.createElement('article');
    row.className = item.isCompleted ? 'completed' : '';
    row.innerHTML = `
      <button class="shopping-check" data-toggle-grocery="${escapeHtml(item.id)}" type="button" aria-label="${item.isCompleted ? 'Move back to Things to pick up' : 'Mark as purchased'}" aria-pressed="${item.isCompleted ? 'true' : 'false'}">${item.isCompleted ? '✓' : ''}</button>
      <span>
        <strong>${escapeHtml(item.ingredientName)}</strong>
        ${item.sourceRecipe ? `<small>From ${escapeHtml(item.sourceRecipe)}</small>` : '<small>Added manually</small>'}
        ${item.isCompleted ? '<em class="shopping-item-state">Purchased</em>' : '<em class="shopping-item-state">Tap the circle when purchased</em>'}
      </span>
      <button class="text-button" data-remove-grocery="${escapeHtml(item.id)}" type="button">Remove</button>
    `;
    return row;
  };
  const pendingSection = document.createElement('section');
  pendingSection.className = 'shopping-section';
  if (pendingItems.length) {
    pendingItems.forEach((item) => pendingSection.appendChild(renderItem(item)));
  } else {
    pendingSection.innerHTML = '<p class="shopping-empty compact">No items waiting. Purchased items are listed below.</p>';
  }
  els.groceryList.appendChild(pendingSection);

  if (purchasedItems.length) {
    const purchasedSection = document.createElement('section');
    purchasedSection.className = 'shopping-section purchased-section';
    purchasedSection.innerHTML = '<h3 class="shopping-section-title">Purchased</h3>';
    purchasedItems.forEach((item) => purchasedSection.appendChild(renderItem(item)));
    els.groceryList.appendChild(purchasedSection);
  }
}

function recipeSearchText(recipe) {
  return [
    recipe.title,
    recipe.description,
    recipe.tomoLine,
    recipe.dietType,
    (recipe.aliases || []).join(' '),
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
  els.activeMoodBar.innerHTML = '';
  els.activeMoodBar.classList.add('hidden');
}

function renderMood() {
  const mood = moodForCopy();
  if (els.heroMessage) els.heroMessage.textContent = '';
  renderAmbientCard();
  els.nudgeText.textContent = getTomoMessage({ context: 'mood_selected', mood });
  els.factBanter.textContent = factBanters[Math.abs(mood.charCodeAt(0) + state.meal.length) % factBanters.length];
  document.querySelectorAll('.mood-chip').forEach((button) => {
    button.classList.toggle('active', button.dataset.mood === activeMood());
  });
  els.clearMoodButton?.classList.toggle('hidden', !activeMood());
  renderActiveMoodBar();
}

function renderMeal() {
  const mood = activeMood();
  const mealLabel = mealLabels[state.meal] || mealTitles[state.meal] || 'Meal';
  els.mealTitle.textContent = mood ? mealLabel : mealTitles[state.meal];
  const titleEyebrow = document.querySelector('.section-title p');
  if (titleEyebrow) titleEyebrow.textContent = mood ? `${labelForMood(mood)} Ideas` : 'Today’s Picks';
  if (els.recipeCount) {
    els.recipeCount.textContent = mood ? '' : `${state.recipes.length} recipes`;
    els.recipeCount.classList.toggle('hidden', Boolean(mood));
  }
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

function renderPantryView() {
  const showingRecommendations = state.pantryView === 'recommendations';
  els.pantryDialog?.setAttribute('data-pantry-view', state.pantryView);
  if (els.pantryModalTitle) {
    els.pantryModalTitle.textContent = 'Pantry';
  }
  if (els.pantryModalSubtitle) {
    els.pantryModalSubtitle.textContent = showingRecommendations
      ? 'Dishes matched to your selected ingredients.'
      : "Tell Tomo what's in your kitchen.";
  }
  els.closePantry?.setAttribute('aria-label', showingRecommendations ? 'Back to Pantry' : 'Close Pantry');
}

function showPantryView(view) {
  state.pantryView = view === 'recommendations' ? 'recommendations' : 'dashboard';
  renderPantryView();
}

function handlePantryClose() {
  if (state.pantryView === 'recommendations') {
    showPantryView('dashboard');
    return;
  }
  els.pantryDialog?.close();
}

function closeRecipeDetail() {
  els.recipeDialog?.close();
  const returnContext = state.recipeReturnContext;
  state.recipeReturnContext = null;
  if (!returnContext) return;
  showPantryView(returnContext.pantryView);
  if (!els.pantryDialog?.open) els.pantryDialog?.showModal();
  const pantryCard = els.pantryDialog?.querySelector('.pantry-card');
  if (pantryCard) pantryCard.scrollTop = returnContext.scrollTop || 0;
}

function renderRecipeDetail(recipe) {
  const cookingNotes = cookingNotesForRecipe(recipe);
  const tomoLine = recipe.tomoLine ? `<p class="tomo-detail-line">${recipe.tomoLine}</p>` : '';
  els.recipeDetail.innerHTML = `
    <header class="recipe-detail-header">
      <div class="detail-hero detail-dish-image">${recipeVisual(recipe)}</div>
      <div class="recipe-detail-heading">
        <h2>${escapeHtml(recipe.title)}</h2>
        <div class="recipe-meta">
          <span class="pill">${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          <span class="pill">${escapeHtml(recipe.difficulty || 'easy')}</span>
          <span class="pill ${recipe.dietType === 'non-vegetarian' ? 'nonveg' : 'veg'}">${recipe.dietType === 'non-vegetarian' ? 'Non-veg' : 'Veg'}</span>
        </div>
      </div>
    </header>
    ${tomoLine}
    <p class="recipe-detail-description">${escapeHtml(recipe.description)}</p>
    ${detailPantryMatchMarkup(recipe)}
    ${detailIngredientGroupsMarkup(recipe)}
    <section class="instruction-notes">
      <h3>Cooking notes</h3>
      ${cookingNotes.map((step) => `<p>${escapeHtml(step)}</p>`).join('')}
    </section>
    <div class="detail-actions">
      <button class="primary-button" id="cookFromDetail">👨‍🍳 Cook This</button>
    </div>
  `;
}

function openRecipe(recipe, options = {}) {
  if (options.returnToPantry) {
    state.recipeReturnContext = {
      pantryView: options.returnToPantry,
      scrollTop: els.pantryDialog?.querySelector('.pantry-card')?.scrollTop || 0
    };
    if (els.pantryDialog?.open) els.pantryDialog.close();
  } else {
    state.recipeReturnContext = null;
  }
  state.activeRecipe = recipe;
  recordRecipeInteraction(recipe, 'view');
  renderRecipeDetail(recipe);
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
    els.recipeNotice.classList.remove('mood-helper');
    els.recipeNotice.textContent = error.message;
    els.recipeNotice.classList.remove('hidden');
  }
  renderAll();
}

document.querySelectorAll('.mood-chip').forEach((button) => {
  button.addEventListener('click', () => {
    const mood = button.dataset.mood;
    if (activeMood() === mood) {
      resetMoodSelection();
      return;
    }
    state.activeMood = mood;
    state.mood = mood;
    state.featuredRecipeId = null;
    state.revealedPickId = null;
    refreshTodayPicks();
  });
});

els.activeMoodBar?.addEventListener('click', (event) => {
  const clearButton = event.target.closest('[data-clear-active-mood]');
  if (!clearButton) return;
  resetMoodSelection();
});

els.clearMoodButton?.addEventListener('click', resetMoodSelection);

document.querySelectorAll('.meal-tab').forEach((button) => {
  button.addEventListener('click', () => {
    if (state.meal === button.dataset.meal) return;
    state.meal = button.dataset.meal;
    state.featuredRecipeId = null;
    state.revealedPickId = null;
    refreshTodayPicks();
  });
});

els.ingredientChips.addEventListener('click', (event) => {
  const button = event.target.closest('[data-ingredient]');
  if (!button) return;
  const ingredient = button.dataset.ingredient;
  if (state.selectedIngredients.has(ingredient)) {
    state.selectedIngredients.delete(ingredient);
  } else {
    state.selectedIngredients.add(ingredient);
  }
  els.ingredientChips
    .querySelectorAll('[data-ingredient]')
    .forEach((chip) => {
      if (chip.dataset.ingredient === ingredient) chip.classList.toggle('active', state.selectedIngredients.has(ingredient));
    });
  if (els.selectedCount) {
    const count = state.selectedIngredients.size;
    els.selectedCount.textContent = count ? `${count} selected` : 'Choose 2-4 ingredients';
  }
  renderSelectedIngredientTray();
  state.revealedPickId = null;
  schedulePantrySelectionRefresh();
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

els.pantryBestMatch?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-pantry-best-recipe]');
  if (!button) return;
  const recipe = state.recipes.find((item) => item.id === button.dataset.pantryBestRecipe);
  if (recipe) {
    openRecipe(recipe, { returnToPantry: state.pantryView });
  }
});

els.ingredientResults.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add-ingredient]');
  if (addButton) {
    const ingredient = addButton.dataset.addIngredient;
    if (!state.selectedIngredients.has(ingredient)) {
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
  event.stopPropagation();
  const recipe = state.recipes.find((item) => item.id === card.dataset.recipeId);
  if (recipe) {
    openRecipe(recipe, { returnToPantry: state.pantryView });
  }
});

els.ingredientSearch?.addEventListener('input', (event) => {
  state.ingredientSearch = event.target.value;
  if (state.ingredientSearch.trim()) state.ingredientsExpanded = true;
  renderIngredients();
});

els.pantryDialog?.addEventListener('click', (event) => {
  if (event.target === els.pantryDialog) handlePantryClose();
});
els.pantryDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  handlePantryClose();
});
if (els.surpriseButton) {
  els.surpriseButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const cookButton = event.target.closest('#heroCookNow');
    if (cookButton) {
      const recipe = state.recipes.find((item) => item.id === cookButton.dataset.recipeId);
      if (recipe) openRecipe(recipe);
      return;
    }
    if (event.target.closest('#heroFindAnother')) {
      revealTomoPick(true);
      return;
    }
    if (!state.revealedPickId) surpriseMe();
  });
  els.surpriseButton.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (!state.revealedPickId) surpriseMe();
  });
}
els.heroCookNow?.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!state.revealedPickId) {
    surpriseMe();
    return;
  }
  const recipe = state.recipes.find((item) => item.id === els.heroCookNow.dataset.recipeId);
  if (recipe) openRecipe(recipe);
});
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
  const detailStateButton = event.target.closest('[data-set-detail-ingredient-state]');
  if (detailStateButton && state.activeRecipe) {
    const ingredient = detailStateButton.dataset.setDetailIngredientState;
    const nextState = detailStateButton.dataset.detailState;
    selectedPantryIngredientsFor(ingredient).forEach((selected) => state.selectedIngredients.delete(selected));
    removeIngredientFromShoppingList(ingredient);
    if (nextState === 'pantry') {
      state.selectedIngredients.add(ingredient);
    } else {
      addGroceryItems([ingredient], state.activeRecipe.title);
    }
    state.revealedPickId = null;
    renderIngredients();
    renderIngredientResults();
    renderTomoPick();
    renderGrocery();
    renderRecipeDetail(state.activeRecipe);
    toast(`${formatIngredientName(ingredient)} moved to ${nextState === 'pantry' ? 'Pantry' : 'Shopping List'}.`);
    return;
  }
  const detailStateUndo = event.target.closest('[data-clear-detail-ingredient-state]');
  if (detailStateUndo && state.activeRecipe) {
    const ingredient = detailStateUndo.dataset.clearDetailIngredientState;
    const currentState = detailStateUndo.dataset.detailState;
    if (currentState === 'pantry') {
      selectedPantryIngredientsFor(ingredient).forEach((selected) => state.selectedIngredients.delete(selected));
    } else {
      removeIngredientFromShoppingList(ingredient);
    }
    state.revealedPickId = null;
    renderIngredients();
    renderIngredientResults();
    renderTomoPick();
    renderGrocery();
    renderRecipeDetail(state.activeRecipe);
    toast(`${formatIngredientName(ingredient)} selection cleared.`);
    return;
  }
  if (event.target.id === 'cookFromDetail' && state.activeRecipe) {
    recordCookedRecipe(state.activeRecipe);
    closeRecipeDetail();
    toast(`${state.activeRecipe.title} added to your Tomo Journal.`);
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
    const subcategoryName = nameParts.join('::');
    state.activeCollectionSubcategories.set(collectionKey, subcategoryName);
    const activeDetail = state.collectionDetails.get(collectionKey);
    if (activeDetail) activeDetail.activeSubcategory = subcategoryName;
    document.querySelectorAll(`[data-select-subcategory^="${safeCssEscape(collectionKey)}::"]`).forEach((button) => {
      const isActive = button.dataset.selectSubcategory === selectSubcategory.dataset.selectSubcategory;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    const collection = state.collections.find((item) => item.key === collectionKey);
    const container = document.querySelector(`[data-special-row="${safeCssEscape(collectionKey)}"]`);
    if (collection && container) renderCollectionItems(collection, container);
    return;
  }
  const seeSubcategory = event.target.closest('[data-see-subcategory]');
  if (seeSubcategory) {
    const key = seeSubcategory.dataset.seeSubcategory;
    state.expandedCollectionRows.has(key) ? state.expandedCollectionRows.delete(key) : state.expandedCollectionRows.add(key);
    renderSpecialRows();
    return;
  }
  const collectionScroll = event.target.closest('[data-scroll-collections]');
  if (collectionScroll) {
    const row = document.querySelector('.collection-scroll');
    if (row) {
      const direction = Number(collectionScroll.dataset.scrollCollections || 1);
      const firstCard = row.querySelector('.collection-segment');
      const distance = firstCard ? firstCard.getBoundingClientRect().width + 16 : 280;
      row.scrollBy({ left: direction * distance, behavior: 'smooth' });
      state.collectionScrollLeft = row.scrollLeft;
    }
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

els.closeRecipe.addEventListener('click', closeRecipeDetail);
els.recipeDialog?.addEventListener('click', (event) => {
  if (event.target === els.recipeDialog) closeRecipeDetail();
});
els.recipeDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeRecipeDetail();
});
els.closeJournal?.addEventListener('click', closeJournalRoute);
els.journalGotIt?.addEventListener('click', closeJournalRoute);
els.journalDialog?.addEventListener('click', (event) => {
  if (event.target === els.journalDialog) closeJournalRoute();
});
els.journalNavButton?.addEventListener('click', openJournalRoute);
els.groceryButton.addEventListener('click', () => els.groceryDialog.showModal());
els.searchButton.addEventListener('click', openGlobalSearch);
els.closeSearch?.addEventListener('click', () => els.searchDialog.close());
els.globalSearchInput?.addEventListener('input', renderGlobalSearch);
els.pantryNavButton.addEventListener('click', () => {
  updatePantryTomoMessage({ context: state.selectedIngredients.size ? 'ingredient_selected' : 'pantry_open', selectedIngredients: [...state.selectedIngredients] });
  renderIngredientResults();
  showPantryView('dashboard');
  els.pantryDialog.showModal();
});
els.closePantry.addEventListener('click', handlePantryClose);
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
  els.journalDialog?.close();
});

loadRecipes();
loadLiveWeather();
setInterval(renderAmbientCard, 60 * 1000);
setInterval(loadLiveWeather, 15 * 60 * 1000);
document.querySelector('.cb-dashboard-weather')?.addEventListener('click', loadLiveWeather);
