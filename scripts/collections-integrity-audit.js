const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const outputMarkdown = path.join(root, 'collections-integrity-audit.md');
const outputJson = path.join(root, 'collections-integrity-audit.json');

const hubOrder = [
  'Family Favorites',
  'Healthy Living',
  'Everyday Cooking',
  'Regional Journeys',
  'Kitchen Essentials',
  'Seasonal Specials',
  'Celebrations & Traditions',
  'Global Bites',
];

const hubMeta = {
  'Family Favorites': {
    copy: 'Lunch boxes, tiny bowls and family-friendly wins.',
    imagePath: '/assets/images/collections/lunch-box-heroes.webp',
    purpose: 'Help families find child-friendly, tiffin-ready and gentle everyday recipes.',
  },
  'Healthy Living': {
    copy: 'Balanced plates, protein picks and lighter bowls.',
    imagePath: '/assets/images/collections/power-plates-collection-card.png?v=collection-card-images-68',
    purpose: 'Surface lighter, balanced and protein-forward choices.',
  },
  'Everyday Cooking': {
    copy: 'Daily comforts, tea-time bites and simple staples.',
    imagePath: '/assets/images/dishes/dal-rice.png',
    purpose: 'Organize daily staples, comfort meals and small snack breaks.',
  },
  'Regional Journeys': {
    copy: "Regional dishes from across India's home kitchens.",
    imagePath: '/assets/images/dishes/biryani.png',
    purpose: 'Let users explore dishes by cuisine, state and regional food memory.',
  },
  'Kitchen Essentials': {
    copy: 'Chutneys, sides, salads and meal add-ons.',
    imagePath: '/assets/images/collections/sides-addons-collection-card.png?v=collection-card-images-68',
    purpose: 'Collect sides, condiments, add-ons and small dishes that complete meals.',
  },
  'Seasonal Specials': {
    copy: 'Cooling sips, rainy cravings and seasonal comfort.',
    imagePath: '/assets/images/drinks/watermelon-juice-homestyle.png',
    purpose: 'Group weather and season-led cravings.',
  },
  'Celebrations & Traditions': {
    copy: 'Festival sweets, prasadam and nostalgic treats.',
    imagePath: '/assets/images/desserts/gulab-jamun.png',
    purpose: 'Collect celebratory, devotional and nostalgic sweet recipes.',
  },
  'Global Bites': {
    copy: 'Noodles, bowls, wraps and world comfort plates.',
    imagePath: '/assets/images/dishes/batch5-chicken-fried-rice.png',
    purpose: 'Show global-inspired comfort plates, bowls, snacks and soups.',
  },
};

const collectionOrder = {
  'Regional Journeys': ['Karnataka', 'Andhra & Telangana', 'Tamil Nadu', 'Kerala', 'Bengal', 'Maharashtra', 'Northeast', 'North & West India', 'Jammu & Kashmir'],
  'Everyday Cooking': ['Daily Comforts', 'Tea Time Favourites', 'Home Staples'],
  'Healthy Living': ['Healthy Plates', 'Warm & Light Bowls'],
  'Family Favorites': ['Tiny Tummy Favorites', 'Lunch Box & Tiffin'],
  'Global Bites': ['Global Breakfasts', 'Global Bowls', 'Global Mains', 'Global Snacks', 'Global Soups', 'Global Street Food'],
  'Kitchen Essentials': ['Sides, Salads & Add-ons', 'Chutneys, Salads & Add-ons'],
  'Seasonal Specials': ['Summer Cooling', 'Rainy Day Cravings'],
  'Celebrations & Traditions': ['Festival Sweets', 'Regional Sweets', 'Prasadam & Temple Foods'],
};

const collectionDescriptions = {
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
  'Chutneys, Salads & Add-ons': 'Fresh sides and small but mighty flavour boosters.',
  'Summer Cooling': 'Cooling drinks and lighter seasonal comforts.',
  'Rainy Day Cravings': 'Warm, cozy dishes for grey skies.',
  'Festival Sweets': 'Sweets and treats for celebration days.',
  'Regional Sweets': 'State-loved sweets and nostalgic classics.',
  'Prasadam & Temple Foods': 'Temple-style and devotional foods.',
};

const displaySections = {
  'Regional Journeys::Karnataka': ['Breakfast', 'Rice & Main Meals', 'Curries & Saaru', 'Snacks & Evening Bites'],
  'Regional Journeys::Andhra & Telangana': ['Breakfast', 'Rice & Main Meals', 'Pappu, Pulusu & Curries', 'Snacks & Evening Bites'],
  'Regional Journeys::Tamil Nadu': ['Breakfast', 'Rice & Main Meals', 'Kuzhambu, Kootu & Curries', 'Snacks & Evening Bites'],
  'Regional Journeys::Kerala': ['Breakfast', 'Rice & Main Meals', 'Curries & Seafood'],
  'Regional Journeys::Bengal': ['Breakfast & Everyday Classics', 'Rice, Fish & Main Meals', 'Curries & Traditional Dishes', 'Snacks & Street Food'],
  'Regional Journeys::Maharashtra': ['Breakfast', 'Amti, Curries & Sabzis', 'Snacks & Street Food'],
  'Regional Journeys::Northeast': ['Regional Classics', 'Smoked & Fermented', 'Soups, Stews & Broths'],
  'Regional Journeys::North & West India': ['Comfort Mains', 'Breads & Rice Plates', 'Street Food & Snacks', 'Sweets', 'Drinks'],
  'Regional Journeys::Jammu & Kashmir': ['Wazwan & Mains', 'Rice & Breads', 'Drinks', 'Sweets'],
  'Everyday Cooking::Daily Comforts': ['Quick Comforts', 'Rice & Dal Meals', 'Breakfast Staples', 'Simple Dinner Ideas'],
  'Everyday Cooking::Tea Time Favourites': ['Hot Drinks', 'Bakery Bites', 'Chai Snacks', 'Street Bites'],
  'Everyday Cooking::Home Staples': ['Simple Mains', 'Quick Staples', 'Pantry Friendly'],
  'Healthy Living::Healthy Plates': ['Protein Breakfasts', 'Protein Mains', 'Light Bowls', 'Quick Healthy'],
  'Healthy Living::Warm & Light Bowls': ['Soups', 'Rasam', 'Stews', 'Light Meals', 'Sick Day Comfort'],
  'Family Favorites::Tiny Tummy Favorites': ['Baby’s First Foods', 'Purees & Mashes', 'Growing Bites', 'Little Plates'],
  'Family Favorites::Lunch Box & Tiffin': ['Quick Morning Wins', 'Tiffin Favorites', 'Protein Packed', 'After School Snacks'],
  'Global Bites::Global Breakfasts': ['Egg Breakfasts', 'Toast & Bakery', 'Sweet Breakfasts', 'Healthy Breakfasts'],
  'Global Bites::Global Bowls': ['Rice Bowls', 'Noodle Bowls', 'Protein Bowls', 'Vegetarian Bowls'],
  'Global Bites::Global Mains': ['Fried Rice & Indo-Chinese', 'Asian Comforts', 'Mediterranean Plates', 'Continental Classics'],
  'Global Bites::Global Snacks': ['Indo-Chinese Starters', 'Wraps & Rolls', 'Dips & Plates', 'Quick Bites'],
  'Global Bites::Global Soups': ['Clear Soups', 'Indo-Chinese Soups', 'Veg Soups', 'Noodle Soups'],
  'Global Bites::Global Street Food': ['Street Wraps', 'Tacos & Quesadillas', 'Loaded Snacks', 'Handheld Bites'],
  'Kitchen Essentials::Sides, Salads & Add-ons': ['Palyas, Poriyals & Thorans', 'Raitas & Cooling Sides', 'Salads & Fresh Sides', 'Sundals & Add-ons'],
  'Kitchen Essentials::Chutneys, Salads & Add-ons': ['Chutneys', 'Raitas', 'Salads', 'Podis'],
  'Seasonal Specials::Summer Cooling': ['Coolers', 'Light Meals', 'Cooling Sides', 'Summer Sweets'],
  'Seasonal Specials::Rainy Day Cravings': ['Hot Snacks', 'Warm Bowls', 'Chai Companions'],
  'Celebrations & Traditions::Festival Sweets': ['Traditional Mithai', 'Milk Desserts', 'Payasam & Kheer', 'Festival Breads & Dumplings', 'Regional Festival Classics', 'Halwas', 'Traditional Treats'],
  'Celebrations & Traditions::Regional Sweets': ['Karnataka Sweets', 'Bengali Sweets', 'North Indian Sweets', 'South Indian Sweets'],
  'Celebrations & Traditions::Prasadam & Temple Foods': ['Prasadam', 'Temple Foods', 'Festival Offerings'],
};

const regionalCoverageRules = {
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

const collectionManifest = {
  hubs: {
    'Family Favorites': {
      intent: 'lifestyle',
      targetMin: 40,
      targetMax: 70,
      balanceMode: 'diversity',
      allowLargeCounts: false,
      requiresAuthenticity: false,
      requiresMealDiversity: true,
      requiresProteinDiversity: true,
      requiresRegionDiversity: false,
      allowComingSoon: false,
      notes: 'Family-friendly recipes should span baby, tiffin, snack and protein use cases.',
    },
    'Healthy Living': {
      intent: 'lifestyle-health',
      targetMin: 35,
      targetMax: 70,
      balanceMode: 'nutrition',
      allowLargeCounts: false,
      requiresAuthenticity: false,
      requiresMealDiversity: true,
      requiresProteinDiversity: true,
      requiresRegionDiversity: false,
      allowComingSoon: false,
      notes: 'Healthy collections should show protein, lighter meals and practical quick options.',
    },
    'Everyday Cooking': {
      intent: 'everyday-utility',
      targetMin: 40,
      targetMax: 90,
      balanceMode: 'utility',
      allowLargeCounts: true,
      requiresAuthenticity: false,
      requiresMealDiversity: true,
      requiresProteinDiversity: false,
      requiresRegionDiversity: false,
      allowComingSoon: false,
      notes: 'Everyday utility can be large if recipes are genuinely useful daily staples.',
    },
    'Regional Journeys': {
      intent: 'geography',
      targetMin: 0,
      targetMax: 0,
      balanceMode: 'region',
      allowLargeCounts: true,
      requiresAuthenticity: true,
      requiresMealDiversity: false,
      requiresProteinDiversity: false,
      requiresRegionDiversity: true,
      allowComingSoon: false,
      notes: 'Do not penalize large totals when recipes are regionally meaningful.',
    },
    'Kitchen Essentials': {
      intent: 'skills-foundation',
      targetMin: 40,
      targetMax: 90,
      balanceMode: 'utility',
      allowLargeCounts: true,
      requiresAuthenticity: false,
      requiresMealDiversity: false,
      requiresProteinDiversity: false,
      requiresRegionDiversity: false,
      allowComingSoon: false,
      notes: 'Foundation collections should cover sides, condiments and meal-completing add-ons.',
    },
    'Seasonal Specials': {
      intent: 'seasonal',
      targetMin: 25,
      targetMax: 60,
      balanceMode: 'season',
      allowLargeCounts: false,
      requiresAuthenticity: false,
      requiresMealDiversity: false,
      requiresProteinDiversity: false,
      requiresRegionDiversity: false,
      allowComingSoon: true,
      notes: 'Seasonal content should be tightly relevant to weather or season.',
    },
    'Celebrations & Traditions': {
      intent: 'festival-tradition',
      targetMin: 50,
      targetMax: 120,
      balanceMode: 'occasion',
      allowLargeCounts: true,
      requiresAuthenticity: true,
      requiresMealDiversity: false,
      requiresProteinDiversity: false,
      requiresRegionDiversity: false,
      allowComingSoon: true,
      notes: 'Festival and tradition collections may be large when occasion coverage is strong.',
    },
    'Global Bites': {
      intent: 'global-discovery',
      targetMin: 40,
      targetMax: 90,
      balanceMode: 'cuisine',
      allowLargeCounts: false,
      requiresAuthenticity: true,
      requiresMealDiversity: false,
      requiresProteinDiversity: false,
      requiresRegionDiversity: true,
      allowComingSoon: true,
      notes: 'Global discovery should show cuisine variety, not just one format.',
    },
  },
  collections: {
    'Family Favorites::Lunch Box & Tiffin': {
      intent: 'packable-family',
      balanceMode: 'diversity',
      imbalancePolicy: 'problematic',
      requiresMealDiversity: true,
      requiresProteinDiversity: true,
      notes: 'A strong tiffin collection needs morning wins, protein and after-school snacks.',
    },
    'Healthy Living::Healthy Plates': {
      intent: 'nutrition',
      balanceMode: 'nutrition',
      imbalancePolicy: 'problematic',
      requiresMealDiversity: true,
      requiresProteinDiversity: true,
      notes: 'Protein mains can lead, but light bowls and quick healthy options must be visible.',
    },
    'Everyday Cooking::Daily Comforts': {
      intent: 'daily-comfort',
      balanceMode: 'utility',
      imbalancePolicy: 'watch',
      requiresMealDiversity: true,
      notes: 'Breakfast and rice-dal anchors can be larger, but dinner utility should not disappear.',
    },
    'Regional Journeys::Karnataka': {
      intent: 'regional-authenticity',
      balanceMode: 'region',
      imbalancePolicy: 'acceptable-if-authentic',
      requiresAuthenticity: true,
      notes: 'Large Karnataka coverage is acceptable when the recipes are specific and authentic.',
    },
    'Regional Journeys::Kerala': {
      intent: 'regional-authenticity',
      balanceMode: 'region',
      imbalancePolicy: 'acceptable-if-authentic',
      requiresAuthenticity: true,
      notes: 'Kerala coverage can lean breakfast-heavy while authentic curries and sides grow.',
    },
    'Regional Journeys::Northeast': {
      intent: 'regional-authenticity',
      balanceMode: 'region',
      imbalancePolicy: 'acceptable-if-authentic',
      requiresAuthenticity: true,
      notes: 'Northeast coverage should prioritize regional identity over artificial balance.',
    },
    'Regional Journeys::Jammu & Kashmir': {
      intent: 'weak-regional-coverage',
      balanceMode: 'region-gap',
      imbalancePolicy: 'ignore-until-explicit-coverage',
      requiresAuthenticity: true,
      notes: 'Current coverage is weak because explicit Kashmiri/Jammu recipes are not present.',
    },
    'Kitchen Essentials::Sides, Salads & Add-ons': {
      intent: 'utility-types',
      balanceMode: 'utility',
      imbalancePolicy: 'watch',
      allowLargeCounts: true,
      notes: 'Large count is acceptable if sides, cooling sides, salads and add-ons are split clearly.',
    },
    'Celebrations & Traditions::Festival Sweets': {
      intent: 'festival-sweets',
      balanceMode: 'occasion',
      imbalancePolicy: 'acceptable-large',
      allowLargeCounts: true,
      notes: 'Festival sweets can be much larger than other celebration subcategories.',
    },
    'Global Bites::Global Bowls': {
      intent: 'global-bowl-variety',
      balanceMode: 'cuisine',
      imbalancePolicy: 'problematic',
      requiresRegionDiversity: true,
      requiresProteinDiversity: true,
      notes: 'Global bowls should include rice, noodle, protein and vegetarian variety.',
    },
  },
};

function readRecipes() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'frontend/local-recipes.js'), 'utf8'), context);
  return (context.window.COOKBUDDY_LOCAL_RECIPES || [])
    .filter((recipe) => String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core');
}

function norm(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function list(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  if (value && typeof value === 'object') return Object.values(value).flatMap(list);
  return [];
}

function recipeId(recipe) {
  return recipe.id || recipe.sourceId || norm(recipe.title || recipe.name);
}

function recipeTitle(recipe) {
  return recipe.title || recipe.name || 'Untitled recipe';
}

function recipeRole(recipe) {
  return String(recipe.recipeRole || recipe.recipe_role || '').toLowerCase().trim() || 'dish';
}

function recipeImage(recipe) {
  return recipe.imageUrl || recipe.imagePath || recipe.image_url || recipe.image || '';
}

function recipeText(recipe) {
  return norm([
    recipeTitle(recipe),
    recipe.description,
    recipe.cuisine,
    recipe.region,
    recipe.dishFamily,
    recipe.dish_family,
    recipeRole(recipe),
    ...list(recipe.tags),
    ...list(recipe.mealTags),
    ...list(recipe.moodTags),
    ...list(recipe.regionTags),
    ...list(recipe.dietaryTags),
    ...list(recipe.coreIngredients),
    ...list(recipe.requiredIngredients),
    ...list(recipe.optionalIngredients),
    ...list(recipe.ingredients).map((ingredient) => typeof ingredient === 'string' ? ingredient : ingredient?.name),
  ].filter(Boolean).join(' '));
}

function hasAlias(text, alias) {
  const normalizedAlias = norm(alias);
  if (!normalizedAlias) return false;
  return new RegExp(`(^|\\s)${normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$)`).test(text);
}

function regionalMatch(recipe, collectionName) {
  if (recipe.collectionHome?.hub === 'Regional Journeys' && recipe.collectionHome.collection === collectionName) return true;
  return (regionalCoverageRules[collectionName] || []).some((alias) => hasAlias(recipeText(recipe), alias));
}

function textHasAny(text, terms) {
  return terms.some((term) => text.includes(norm(term)));
}

function secondaryCoverageMatch(recipe, hubName, collectionName) {
  const text = recipeText(recipe);
  const title = norm(recipeTitle(recipe));
  const role = recipeRole(recipe);
  const home = recipe.collectionHome;
  if (home?.hub === hubName && home.collection === collectionName) return true;

  if (hubName === 'Everyday Cooking' && collectionName === 'Home Staples') {
    if (['dessert', 'drink', 'snack'].includes(role)) return false;
    const stapleTitles = [
      'dal rice',
      'dal roti',
      'khichdi',
      'moong dal vegetable khichdi',
      'curd rice',
      'thayir sadam',
      'lemon rice',
      'coconut rice',
      'tomato rice',
      'onion rice',
      'jeera rice',
      'rasam rice',
      'sambar rice',
      'varan bhaat',
      'veg pulao',
      'peas pulao',
      'soft veg pulao',
      'idli',
      'dosa',
      'upma',
      'poha',
      'chilla',
    ].map(norm);
    const regionText = norm([...list(recipe.regionTags), recipe.cuisine, recipe.region].join(' '));
    const weakRegional = regionText && !/pan indian|indian/.test(regionText);
    if (weakRegional && !stapleTitles.some((name) => title === name)) return false;
    return stapleTitles.some((name) => title === name || title.includes(name));
  }

  if (hubName === 'Regional Journeys' && collectionName === 'Jammu & Kashmir') {
    return [
      'rajma chawal',
      'dal makhani',
      'mutton pulao',
      'veg pulao',
      'peas pulao',
      'mushroom pulao',
      'paneer pulao',
      'thukpa',
      'arunachal thukpa',
      'chhurpi soup',
      'chhurpi chutney',
    ].some((name) => title === norm(name) || title.includes(norm(name)));
  }

  if (hubName === 'Seasonal Specials' && collectionName === 'Rainy Day Cravings') {
    const rainySnack = role === 'snack' && /pakora|pakoda|bajji|bonda|vada|pazham pori|telebhaja|jhalmuri|girmit|mandakki/.test(title);
    const rainyBowl = /rasam|saaru|thukpa|corn soup|vegetable soup|chicken soup|lentil soup|tomato soup|hot and sour soup|manchow soup/.test(title);
    const rainyDrink = role === 'drink' && /chai|tea|kashaya|turmeric milk/.test(title);
    if (rainySnack || rainyBowl || rainyDrink) return true;
    return false;
  }

  if (hubName === 'Healthy Living' && collectionName === 'Healthy Plates') {
    if (!['main', 'soup'].includes(role)) return false;
    return Number(recipe.proteinScore || 0) >= 9
      || textHasAny(text, ['high protein', 'high-protein', 'protein rich', 'protein-rich', 'millet', 'sprout', 'steamed', 'low oil', 'low-oil', 'balanced meal']);
  }

  return false;
}

function makeItem(recipe, index) {
  return { recipe, index, id: recipeId(recipe), title: recipeTitle(recipe), imagePath: recipeImage(recipe) };
}

function buildSystem(recipes) {
  const hubMap = new Map();
  const add = (hubName, collectionName, recipe, index) => {
    if (!hubName || !collectionName || !recipe) return;
    if (!hubMap.has(hubName)) hubMap.set(hubName, { title: hubName, recipes: new Map(), collections: new Map() });
    const hub = hubMap.get(hubName);
    hub.recipes.set(recipeId(recipe), recipe);
    if (!hub.collections.has(collectionName)) hub.collections.set(collectionName, new Map());
    hub.collections.get(collectionName).set(recipeId(recipe), makeItem(recipe, index));
  };

  recipes.forEach((recipe, index) => {
    const home = recipe.collectionHome;
    if (home?.hub && home?.collection) add(home.hub, home.collection, recipe, index);
  });

  (collectionOrder['Regional Journeys'] || []).forEach((collectionName) => {
    recipes.forEach((recipe, index) => {
      if (regionalMatch(recipe, collectionName)) add('Regional Journeys', collectionName, recipe, index);
    });
  });

  [
    ['Everyday Cooking', 'Home Staples'],
    ['Healthy Living', 'Healthy Plates'],
    ['Regional Journeys', 'Jammu & Kashmir'],
    ['Seasonal Specials', 'Rainy Day Cravings'],
  ].forEach(([hubName, collectionName]) => {
    recipes.forEach((recipe, index) => {
      if (secondaryCoverageMatch(recipe, hubName, collectionName)) add(hubName, collectionName, recipe, index);
    });
  });

  return hubOrder.map((hubName) => {
    const hub = hubMap.get(hubName) || { title: hubName, recipes: new Map(), collections: new Map() };
    const orderedNames = [...(collectionOrder[hubName] || []), ...[...hub.collections.keys()].filter((name) => !(collectionOrder[hubName] || []).includes(name)).sort()];
    const collections = orderedNames.map((collectionName) => {
      const items = [...(hub.collections.get(collectionName)?.values() || [])].sort((a, b) => a.index - b.index);
      return {
        hubName,
        title: collectionName,
        subtitle: collectionDescriptions[collectionName] || '',
        description: collectionDescriptions[collectionName] || '',
        imagePath: items.find((item) => item.imagePath)?.imagePath || hubMeta[hubName]?.imagePath || '',
        items,
      };
    });
    return {
      title: hubName,
      subtitle: hubMeta[hubName]?.copy || '',
      description: hubMeta[hubName]?.purpose || '',
      imagePath: hubMeta[hubName]?.imagePath || '',
      items: [...hub.recipes.values()],
      collections,
    };
  });
}

function displayGroup(collection, item) {
  const recipe = item.recipe;
  const sections = displaySections[`${collection.hubName}::${collection.title}`] || [];
  if (!sections.length) return recipeRole(recipe);
  const text = recipeText(recipe);
  const role = recipeRole(recipe);
  const title = norm(recipeTitle(recipe));
  const isDrink = role === 'drink' || /chai|tea|coffee|juice|sherbet|lassi|mor|chaas|buttermilk|drink|cooler/.test(text);
  const isSweet = role === 'dessert' || /sweet|payasam|kheer|halwa|ladoo|laddu|jamun|modak|dessert|peda|sandesh|rasgulla/.test(text);
  const isSoup = role === 'soup' || /soup|rasam|saaru|charu|pulusu|kuzhambu|stew|tambuli/.test(text);
  const isSnack = role === 'snack' || /snack|bajji|pakora|samosa|bonda|vada|chaat|roll|cutlet|toast|girmit|mandakki/.test(text);
  const isBreakfast = /breakfast|idli|dosa|uttapam|pongal|upma|poha|toast|sandwich|pancake|cheela|chilla|appam|puttu/.test(text);
  const isProtein = /protein|egg|chicken|fish|paneer|dal|lentil|chana|chole|rajma|sprout|sundal|peanut|tofu|moong/.test(text);
  const isSide = role === 'side' || /palya|poriyal|thoran|salad|sundal|raita|kosambari|side/.test(text);
  const isCondiment = role === 'condiment' || /chutney|podi|pickle|achaar|condiment/.test(text);
  const isRice = /rice|chawal|pulao|biryani|khichdi|pakhala/.test(text);
  const isBread = /roti|rotti|chapati|paratha|naan|thepla|bhakri|bread/.test(text);
  const isQuick = /quick|easy|toast|sandwich|poha|upma|idli|dosa|chilla|cheela/.test(text);
  const isLight = /light|salad|soup|rasam|stew|bowl|kanji|porridge/.test(text);
  const key = `${collection.hubName}::${collection.title}`;

  if (key === 'Family Favorites::Tiny Tummy Favorites') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (/purees? [&] mashes/.test(text)) return 'Purees & Mashes';
    if (/growing bites/.test(text)) return 'Growing Bites';
    if (/little plates/.test(text)) return 'Little Plates';
    if (/baby’s first foods|babys first foods|first foods/.test(text)) return 'Baby’s First Foods';
    if (/mash|mashed|puree|purée/.test(text)) return 'Purees & Mashes';
    if (isSnack) return 'Growing Bites';
    return 'Little Plates';
  }

  if (key === 'Family Favorites::Lunch Box & Tiffin') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (isSnack) return 'After School Snacks';
    if (isProtein) return 'Protein Packed';
    if (isBreakfast || isQuick) return 'Quick Morning Wins';
    return 'Tiffin Favorites';
  }

  if (key === 'Regional Journeys::Karnataka') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (isBreakfast) return 'Breakfast';
    if (isSoup || /saaru|sambar|tambuli|curry|sukka|ghee roast/.test(text)) return 'Curries & Saaru';
    if (isSnack) return 'Snacks & Evening Bites';
    return 'Rice & Main Meals';
  }

  if (key === 'Regional Journeys::Andhra & Telangana') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (isBreakfast) return 'Breakfast';
    if (isSnack) return 'Snacks & Evening Bites';
    if (/biryani|haleem|rice|sangati/.test(text)) return 'Rice & Main Meals';
    return 'Pappu, Pulusu & Curries';
  }

  if (key === 'Regional Journeys::Kerala') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (isBreakfast) return 'Breakfast';
    if (/kappa|parotta|parippu|cherupayar/.test(text)) return 'Rice & Main Meals';
    return 'Curries & Seafood';
  }

  if (key === 'Regional Journeys::Tamil Nadu') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (isBreakfast) return 'Breakfast';
    if (isSnack) return 'Snacks & Evening Bites';
    if (isSoup || /kuzhambu|kootu|rasam|kurma|curry|poriyal|chukka/.test(text)) return 'Kuzhambu, Kootu & Curries';
    return 'Rice & Main Meals';
  }

  if (key === 'Regional Journeys::Maharashtra') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (isBreakfast || /misal|poha|thalipeeth|sabudana khichdi/.test(text)) return 'Breakfast';
    if (isSnack || /vada|vadi|pav|fry/.test(text)) return 'Snacks & Street Food';
    return 'Amti, Curries & Sabzis';
  }

  if (key === 'Regional Journeys::Bengal') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (isSnack || /roll|ghugni|jhalmuri|telebhaja/.test(text)) return 'Snacks & Street Food';
    if (/luchi|kochuri|chirer|cholar dal/.test(text)) return 'Breakfast & Everyday Classics';
    if (/fish|mach|paturi|jhol|ilish|pulao/.test(text)) return 'Rice, Fish & Main Meals';
    return 'Curries & Traditional Dishes';
  }

  if (key === 'Regional Journeys::Northeast') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (explicitGroup === 'Everyday Meals') return 'Regional Classics';
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (/smoked|fermented|bamboo|axone|ngari|berma|tungrymbai/.test(text)) return 'Smoked & Fermented';
    if (/thukpa|soup|stew|broth|chhurpi/.test(text)) return 'Soups, Stews & Broths';
    return 'Regional Classics';
  }

  if (key === 'Healthy Living::Healthy Plates') {
    if (isBreakfast && isProtein) return 'Protein Breakfasts';
    if (isLight || title.includes('bowl')) return 'Light Bowls';
    if (isQuick || title.includes('stir fry')) return 'Quick Healthy';
    return isProtein ? 'Protein Mains' : 'Quick Healthy';
  }

  if (key === 'Everyday Cooking::Daily Comforts') {
    if (isBreakfast) return 'Breakfast Staples';
    if (isRice) return 'Rice & Dal Meals';
    if (isQuick) return 'Quick Comforts';
    return 'Simple Dinner Ideas';
  }

  if (key === 'Everyday Cooking::Home Staples') {
    if (isCondiment || /pantry|pickle|podi|chutney/.test(text)) return 'Pantry Friendly';
    if (isQuick) return 'Quick Staples';
    return 'Simple Mains';
  }

  if (key === 'Healthy Living::Warm & Light Bowls') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (/rasam/.test(text)) return 'Rasam';
    if (/sick|kanji/.test(text)) return 'Sick Day Comfort';
    if (/stew|tambuli/.test(text)) return 'Stews';
    if (/khichdi|porridge|light meal/.test(text)) return 'Light Meals';
    return 'Soups';
  }

  if (key === 'Regional Journeys::Jammu & Kashmir') {
    if (isDrink) return 'Drinks';
    if (isSweet) return 'Sweets';
    if (isRice || isBread || /rajma/.test(text)) return 'Rice & Breads';
    return 'Wazwan & Mains';
  }

  if (key === 'Seasonal Specials::Rainy Day Cravings') {
    if (isDrink) return 'Chai Companions';
    if (isSoup) return 'Warm Bowls';
    return 'Hot Snacks';
  }

  if (key === 'Kitchen Essentials::Sides, Salads & Add-ons') {
    if (/raita|curd|yogurt/.test(text)) return 'Raitas & Cooling Sides';
    if (/sundal|corn|chaat|add on|addon/.test(text)) return 'Sundals & Add-ons';
    if (/salad|kosambari|fresh/.test(text)) return 'Salads & Fresh Sides';
    return 'Palyas, Poriyals & Thorans';
  }

  if (key === 'Kitchen Essentials::Chutneys, Salads & Add-ons') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (/podi|chutney powder/.test(text)) return 'Podis';
    if (/raita|curd|yogurt/.test(text)) return 'Raitas';
    if (/salad|kosambari|singju/.test(text)) return 'Salads';
    return 'Chutneys';
  }

  if (key === 'Celebrations & Traditions::Festival Sweets') {
    const explicitGroup = recipe.collectionSubcategory || recipe.collection_subcategory;
    if (sections.includes(explicitGroup)) return explicitGroup;
    if (/payasam|kheer|payesh|seviyan|sheer khurma|phirni/.test(text)) return 'Payasam & Kheer';
    if (/halwa|sheera|kesari/.test(text)) return 'Halwas';
    if (/rasmalai|roshogolla|sandesh|kalakand|kulfi|basundi|mishti doi|shrikhand/.test(text)) return 'Milk Desserts';
    if (/modak|poli|obbattu|holige|pitha|gujiya|kadubu|kozhukattai|ada/.test(text)) return 'Festival Breads & Dumplings';
    if (/anarsa|ariselu|pongal|marzipan|plum cake|pootharekulu|karadantu|ellu bella/.test(text)) return 'Regional Festival Classics';
    if (/jalebi|malpua|cookie|macaroon|kalkal|shankarpali|unniyappam|falooda/.test(text)) return 'Traditional Treats';
    return 'Traditional Mithai';
  }

  if (key === 'Global Bites::Global Breakfasts') {
    if (isSweet) return 'Sweet Breakfasts';
    if (/healthy|oats|porridge|fruit|avocado|chia/.test(text)) return 'Healthy Breakfasts';
    if (/toast|bakery|bread/.test(text)) return 'Toast & Bakery';
    return 'Egg Breakfasts';
  }

  if (key === 'Global Bites::Global Bowls') {
    if (/noodle|ramen/.test(text)) return 'Noodle Bowls';
    if (/vegetarian|veg|paneer|tofu|chickpea|falafel|hummus/.test(text)) return 'Vegetarian Bowls';
    if (isProtein) return 'Protein Bowls';
    return 'Rice Bowls';
  }

  if (sections.includes('Hot Drinks') && isDrink) return 'Hot Drinks';
  if (sections.includes('Coolers') && isDrink) return 'Coolers';
  if (sections.includes('Drinks') && isDrink) return 'Drinks';
  if (sections.includes('Chai Companions') && isDrink) return 'Chai Companions';
  if (sections.includes('Soups') && isSoup) return 'Soups';
  if (sections.includes('Warm Bowls') && isSoup) return 'Warm Bowls';
  if (sections.includes('Rasam & Saaru') && /rasam|saaru|charu/.test(text)) return 'Rasam & Saaru';
  if (sections.includes('Saaru, Rasam & Soups') && isSoup) return 'Saaru, Rasam & Soups';
  if (sections.includes('Snacks') && isSnack) return 'Snacks';
  if (sections.includes('Chai Snacks') && isSnack) return 'Chai Snacks';
  if (sections.includes('Street Bites') && /street|chaat|girmit|mandakki/.test(text)) return 'Street Bites';
  if (sections.includes('Breakfast & Tiffin') && isBreakfast) return 'Breakfast & Tiffin';
  if (sections.includes('Breakfast Staples') && isBreakfast) return 'Breakfast Staples';
  if (sections.includes('Quick Morning Wins') && isBreakfast) return 'Quick Morning Wins';
  if (sections.includes('Protein Packed') && isProtein) return 'Protein Packed';
  if (sections.includes('Protein Mains') && isProtein) return 'Protein Mains';
  if (sections.includes('Protein Breakfasts') && isBreakfast && isProtein) return 'Protein Breakfasts';
  if (sections.includes('Rice & Dal Meals') && isRice) return 'Rice & Dal Meals';
  if (sections.includes('Breads & Rice Plates') && (isRice || isBread)) return 'Breads & Rice Plates';
  if (sections.includes('Raitas & Cooling Sides') && /raita|curd|yogurt/.test(text)) return 'Raitas & Cooling Sides';
  if (sections.includes('Salads & Fresh Sides') && /salad|kosambari|fresh/.test(text)) return 'Salads & Fresh Sides';
  if (sections.includes('Chutneys') && /chutney/.test(text)) return 'Chutneys';
  if (sections.includes('Podis') && /podi|powder/.test(text)) return 'Podis';
  if (sections.includes('Pickles') && /pickle|achaar/.test(text)) return 'Pickles';
  if (sections.includes('Classic Sweets') && isSweet) return 'Classic Sweets';
  if (sections.includes('Festival Specials') && /festival|modak|holige|prasadam|offering/.test(text)) return 'Festival Specials';
  if (sections.includes('Payasam & Kheer') && /payasam|kheer/.test(text)) return 'Payasam & Kheer';
  if (sections.includes('Rice Bowls') && isRice) return 'Rice Bowls';
  if (sections.includes('Noodle Bowls') && /noodle|ramen/.test(text)) return 'Noodle Bowls';
  if (sections.includes('Egg Breakfasts') && /egg/.test(text)) return 'Egg Breakfasts';
  if (sections.includes('Toast & Bakery') && /toast|bread|bakery/.test(text)) return 'Toast & Bakery';
  if (title.includes('dosa') && sections.find((section) => /breakfast|tiffin/i.test(section))) return sections.find((section) => /breakfast|tiffin/i.test(section));
  return sections[0];
}

function groupCollection(collection) {
  const groups = new Map((displaySections[`${collection.hubName}::${collection.title}`] || []).map((name) => [name, []]));
  collection.items.forEach((item) => {
    const group = displayGroup(collection, item);
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(item);
  });
  return groups;
}

function imageStatus(src) {
  const clean = String(src || '').split('?')[0];
  if (!clean) return 'missing';
  if (!/^\/assets\/images\//.test(clean)) return 'invalid';
  if (/placeholder|default|home-bowl|common-kitchen/.test(clean)) return 'placeholder';
  return fs.existsSync(path.join(root, 'frontend', clean)) ? 'ok' : 'broken';
}

function increment(map, key) {
  const label = key || 'Unknown';
  map[label] = (map[label] || 0) + 1;
}

function diversity(recipes) {
  const metrics = {
    mealTypes: {},
    dietTypes: {},
    proteins: {},
    regions: {},
    grainBase: {},
    roles: { drinks: 0, soups: 0, desserts: 0 },
  };
  recipes.forEach((recipe) => {
    const text = recipeText(recipe);
    list(recipe.mealTags).concat(list(recipe.tags).filter((tag) => /breakfast|lunch|dinner|snack/i.test(tag))).forEach((tag) => increment(metrics.mealTypes, tag));
    increment(metrics.dietTypes, recipe.dietType || recipe.diet_type || 'Unknown');
    if (/chicken/.test(text)) increment(metrics.proteins, 'Chicken');
    if (/egg/.test(text)) increment(metrics.proteins, 'Egg');
    if (/fish|prawn|seafood/.test(text)) increment(metrics.proteins, 'Seafood');
    if (/paneer/.test(text)) increment(metrics.proteins, 'Paneer');
    if (/dal|lentil|chana|chole|rajma|moong|sprout|sundal|peanut/.test(text)) increment(metrics.proteins, 'Plant protein');
    list(recipe.regionTags).concat([recipe.cuisine, recipe.region].filter(Boolean)).forEach((tag) => increment(metrics.regions, tag));
    if (/rice|chawal|pulao|biryani|khichdi/.test(text)) increment(metrics.grainBase, 'Rice');
    if (/roti|chapati|paratha|naan|bread|toast|pav/.test(text)) increment(metrics.grainBase, 'Bread/Wheat');
    if (/ragi|millet|jowar|bajra/.test(text)) increment(metrics.grainBase, 'Millet');
    if (recipeRole(recipe) === 'drink') metrics.roles.drinks += 1;
    if (recipeRole(recipe) === 'soup') metrics.roles.soups += 1;
    if (recipeRole(recipe) === 'dessert') metrics.roles.desserts += 1;
  });
  return metrics;
}

function topEntries(object, limit = 5) {
  return Object.entries(object).sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function family(recipe) {
  const text = recipeText(recipe);
  if (/dosa|uttapam|appam/.test(text)) return 'dosa';
  if (/rice|pulao|biryani|khichdi|chawal/.test(text)) return 'rice';
  if (/paratha|roti|chapati|naan|bread|toast/.test(text)) return 'bread';
  if (/chai|tea|coffee|lassi|juice|drink/.test(text)) return 'drink';
  if (/salad|chaat|kosambari/.test(text)) return 'salad';
  if (/chicken/.test(text)) return 'chicken';
  if (/paneer/.test(text)) return 'paneer';
  if (/sweet|kheer|payasam|halwa|ladoo|jamun/.test(text)) return 'sweet';
  return norm(recipe.dishFamily || recipe.dish_family || recipeRole(recipe) || recipeTitle(recipe).split(' ')[0]);
}

function repetitiveRuns(items) {
  const runs = [];
  let current = null;
  items.forEach((item) => {
    const value = family(item.recipe);
    if (!current || current.family !== value) {
      current = { family: value, titles: [item.title] };
      runs.push(current);
      return;
    }
    current.titles.push(item.title);
  });
  return runs.filter((run) => run.titles.length >= 3);
}

function issue(severity, area, message, recommendation, data = {}) {
  return { severity, area, message, recommendation, ...data };
}

function collectionKey(collection) {
  return `${collection.hubName}::${collection.title}`;
}

function manifestForHub(hubName) {
  return collectionManifest.hubs[hubName] || {
    intent: 'general',
    targetMin: 0,
    targetMax: 0,
    balanceMode: 'general',
    allowLargeCounts: false,
    requiresAuthenticity: false,
    requiresMealDiversity: false,
    requiresProteinDiversity: false,
    requiresRegionDiversity: false,
    allowComingSoon: false,
    notes: '',
  };
}

function manifestForCollection(collection) {
  return {
    ...manifestForHub(collection.hubName),
    ...(collectionManifest.collections[collectionKey(collection)] || {}),
  };
}

function severityRank(severity) {
  return severity === 'FAIL' ? 3 : severity === 'SEVERE' ? 2 : severity === 'WARNING' ? 1 : 0;
}

function uniqueValues(items, fn) {
  return new Set(items.flatMap((item) => list(fn(item.recipe || item)).map(norm)).filter(Boolean));
}

function roleSet(items) {
  return new Set(items.map((item) => recipeRole(item.recipe || item)).filter(Boolean));
}

function proteinSet(items) {
  const set = new Set();
  items.forEach((item) => {
    const text = recipeText(item.recipe || item);
    if (/chicken/.test(text)) set.add('chicken');
    if (/egg/.test(text)) set.add('egg');
    if (/fish|prawn|seafood/.test(text)) set.add('seafood');
    if (/paneer/.test(text)) set.add('paneer');
    if (/tofu|soy|soya/.test(text)) set.add('soy');
    if (/dal|lentil|chana|chole|rajma|moong|sprout|sundal|peanut|besan/.test(text)) set.add('plant');
  });
  return set;
}

function regionSet(items) {
  const set = uniqueValues(items, (recipe) => [recipe.cuisine, recipe.region, ...list(recipe.regionTags)]);
  return set;
}

function collectionHasExplicitRegionalCoverage(collection) {
  if (collection.hubName !== 'Regional Journeys') return true;
  const aliases = regionalCoverageRules[collection.title] || [];
  if (!aliases.length) return true;
  return collection.items.some((item) => aliases.some((alias) => hasAlias(recipeText(item.recipe), alias)));
}

function semanticSecondaryPotential(recipe) {
  const text = recipeText(recipe);
  const role = recipeRole(recipe);
  const potentials = new Set();
  if (/rainy|pakora|pakoda|bajji|bonda|rasam|saaru|soup|chai|tea|kashaya/.test(text)) potentials.add('seasonal');
  if (
    ['main', 'soup'].includes(role)
    && (
      Number(recipe.proteinScore || 0) >= 9
      || /high protein|high-protein|protein rich|protein-rich|millet|sprout|steamed|low oil|low-oil|balanced meal|salad|soup/.test(text)
    )
  ) potentials.add('healthy');
  if (/baby|toddler|lunchbox|tiffin|school/.test(text)) potentials.add('family');
  if (role === 'side' || role === 'condiment' || /chutney|podi|pickle|raita|salad|palya|poriyal|thoran|kosambari/.test(text)) potentials.add('kitchen');
  if (role === 'dessert' || /festival|festive|prasadam|sweet|payasam|kheer|halwa|ladoo|jamun|modak/.test(text)) potentials.add('celebration');
  if (/italian|mexican|thai|chinese|korean|japanese|mediterranean|middle eastern|continental|pasta|taco|noodle|pizza|burger|falafel/.test(text)) potentials.add('global');
  if (regionSet([{ recipe }]).size) potentials.add('regional');
  return potentials;
}

function membershipPotential(membership) {
  if (/Healthy Living/.test(membership)) return 'healthy';
  if (/Family Favorites/.test(membership)) return 'family';
  if (/Kitchen Essentials/.test(membership)) return 'kitchen';
  if (/Celebrations & Traditions/.test(membership)) return 'celebration';
  if (/Global Bites/.test(membership)) return 'global';
  if (/Seasonal Specials/.test(membership)) return 'seasonal';
  if (/Regional Journeys/.test(membership)) return 'regional';
  return '';
}

function uncoveredSecondaryPotential(entry) {
  const potentials = semanticSecondaryPotential(entry.recipe);
  const covered = new Set([...entry.primary, ...entry.secondary].map(membershipPotential).filter(Boolean));
  const uncovered = [...potentials].filter((potential) => !covered.has(potential));
  return uncovered.filter((potential) => {
    if (potential !== 'regional') return true;
    return entry.primary.size === 0 || [...entry.primary].some((membership) => /Regional Journeys/.test(membership));
  });
}

function evaluateHubIntent(hub, issues) {
  const rules = manifestForHub(hub.title);
  const warnings = [];
  let score = 100;
  const status = { target: 'PASS', diversity: 'PASS', intent: 'PASS' };

  if (!rules.allowLargeCounts && rules.targetMax && hub.items.length > rules.targetMax) {
    warnings.push(`${hub.title} exceeds target max ${rules.targetMax}.`);
    issues.push(issue('WARNING', 'Intent', `${hub.title} has ${hub.items.length} recipes, above target ${rules.targetMin}-${rules.targetMax}.`, 'Tighten matching rules or split the hub if content no longer feels focused.', { hub: hub.title, intent: rules.intent }));
    score -= 10;
    status.target = 'WARNING';
  }
  if (rules.targetMin && hub.items.length < rules.targetMin && !rules.allowComingSoon) {
    warnings.push(`${hub.title} is below target min ${rules.targetMin}.`);
    issues.push(issue('WARNING', 'Intent', `${hub.title} has ${hub.items.length} recipes, below target ${rules.targetMin}.`, 'Add meaningful recipes or narrow the promised scope.', { hub: hub.title, intent: rules.intent }));
    score -= 12;
    status.target = 'WARNING';
  }
  if (rules.requiresMealDiversity && roleSet(hub.items.map((recipe) => ({ recipe }))).size < 3) {
    warnings.push('Meal/role diversity is thin.');
    issues.push(issue('WARNING', 'Diversity', `${hub.title} needs broader meal/role diversity for ${rules.intent}.`, 'Add or expose recipes across mains, snacks, drinks, sides or breakfast as appropriate.', { hub: hub.title, intent: rules.intent }));
    score -= 10;
    status.diversity = 'WARNING';
  }
  if (rules.requiresProteinDiversity && proteinSet(hub.items.map((recipe) => ({ recipe }))).size < 3) {
    warnings.push('Protein diversity is thin.');
    issues.push(issue('WARNING', 'Diversity', `${hub.title} needs more protein diversity for ${rules.intent}.`, 'Balance egg, dairy, plant protein and meat/seafood where relevant.', { hub: hub.title, intent: rules.intent }));
    score -= 10;
    status.diversity = 'WARNING';
  }
  if (rules.requiresRegionDiversity && regionSet(hub.items.map((recipe) => ({ recipe }))).size < 4) {
    warnings.push('Region/cuisine diversity is thin.');
    issues.push(issue('WARNING', 'Diversity', `${hub.title} needs broader region/cuisine diversity.`, 'Add or surface recipes from more distinct cuisines before release.', { hub: hub.title, intent: rules.intent }));
    score -= 10;
    status.diversity = 'WARNING';
  }

  return {
    title: hub.title,
    intent: rules.intent,
    targetMin: rules.targetMin,
    targetMax: rules.targetMax,
    balanceMode: rules.balanceMode,
    actualCount: hub.items.length,
    status: Object.values(status).includes('WARNING') ? 'WARNING' : 'PASS',
    score: Math.max(0, score),
    warnings,
    notes: rules.notes,
  };
}

function evaluateCollectionIntent(collection, populatedGroups, emptyGroups, max, min, issues) {
  const rules = manifestForCollection(collection);
  const warnings = [];
  const recommendations = [];
  const groupNames = populatedGroups.map(([name]) => name);
  let score = 100;
  let status = 'PASS';

  const mark = (severity, area, message, recommendation, data = {}) => {
    status = severityRank(severity) > severityRank(status) ? severity : status;
    warnings.push(message);
    recommendations.push(recommendation);
    issues.push(issue(severity === 'SEVERE' ? 'WARNING' : severity, area, message, recommendation, {
      hub: collection.hubName,
      collection: collection.title,
      intent: rules.intent,
      balanceMode: rules.balanceMode,
      ...data,
    }));
  };

  if (!collection.items.length && !rules.allowComingSoon) {
    mark('FAIL', 'Structure', `${collection.hubName} / ${collection.title} has no recipes.`, 'Populate this collection or mark it Coming Soon.');
    score -= 40;
  }

  if (emptyGroups.length && !rules.allowComingSoon) {
    emptyGroups.forEach((name) => mark('WARNING', 'Coverage', `${collection.hubName} / ${collection.title} has empty subcategory "${name}".`, 'Populate it, remove it, or mark it Coming Soon.', { subcategory: name }));
    score -= Math.min(18, emptyGroups.length * 4);
  }

  if (min && max > min * 3) {
    if (rules.imbalancePolicy === 'problematic') {
      mark('WARNING', 'Balance', `${collection.hubName} / ${collection.title} is imbalanced for ${rules.intent}: largest subcategory ${max}, smallest ${min}.`, 'Rebalance the collection because its declared intent depends on visible variety.', { max, min });
      score -= 14;
    } else if (rules.imbalancePolicy === 'watch') {
      mark('WARNING', 'Balance', `${collection.hubName} / ${collection.title} has a watch-level imbalance: largest subcategory ${max}, smallest ${min}.`, 'Keep the larger lane if useful, but add depth to smaller utility lanes over time.', { max, min });
      score -= 6;
    } else if (rules.imbalancePolicy === 'acceptable-if-authentic' && !collectionHasExplicitRegionalCoverage(collection)) {
      mark('WARNING', 'Regional Gap', `${collection.hubName} / ${collection.title} is large but lacks explicit regional authenticity signals.`, 'Add recipes with clear regional names, cuisine tags or descriptions.', { max, min });
      score -= 10;
    } else if (rules.imbalancePolicy === 'ignore-until-explicit-coverage') {
      mark('WARNING', 'Regional Gap', `${collection.hubName} / ${collection.title} should not be balance-scored yet because explicit coverage is weak.`, 'Add real Kashmiri/Jammu recipes before treating balance as meaningful.', { max, min });
      score -= 8;
    }
  }

  if (rules.requiresProteinDiversity && proteinSet(collection.items).size < 3) {
    mark('WARNING', 'Diversity', `${collection.hubName} / ${collection.title} needs stronger protein diversity for ${rules.intent}.`, 'Add or surface a broader mix of egg, dairy, plant and meat/seafood protein.');
    score -= 8;
  }
  if (rules.requiresRegionDiversity && regionSet(collection.items).size < 3) {
    mark('WARNING', 'Diversity', `${collection.hubName} / ${collection.title} needs broader cuisine or region variety.`, 'Add recipes from more distinct cuisines or split the collection by clearer cuisine lanes.');
    score -= 8;
  }
  if (rules.requiresAuthenticity && !collectionHasExplicitRegionalCoverage(collection)) {
    mark('WARNING', 'Regional Gap', `${collection.hubName} / ${collection.title} lacks explicit authenticity signals for its declared intent.`, 'Add recipes or metadata with clear regional names, cuisine tags and descriptions.');
    score -= 12;
  }

  return {
    hub: collection.hubName,
    collection: collection.title,
    intent: rules.intent,
    balanceMode: rules.balanceMode,
    imbalancePolicy: rules.imbalancePolicy || 'standard',
    actualCount: collection.items.length,
    subcategoryCount: groupNames.length,
    status,
    score: Math.max(0, score),
    warnings,
    recommendations: [...new Set(recommendations)],
    notes: rules.notes,
  };
}

function analyze() {
  const recipes = readRecipes();
  const system = buildSystem(recipes);
  const exposure = new Map(recipes.map((recipe) => [recipeId(recipe), { recipe, collections: new Set(), primary: new Set(), secondary: new Set(), subcategories: new Set() }]));
  const issues = [];
  const heroUsage = new Map();
  const collectionSummaries = [];
  const hubIntentReports = [];
  const collectionIntentReports = [];

  system.forEach((hub) => {
    if (!hub.title) issues.push(issue('FAIL', 'Structure', 'Hub is missing a title.', 'Add a user-facing hub title.', { hub: hub.title || 'Unknown' }));
    if (!hub.subtitle) issues.push(issue('WARNING', 'Structure', `${hub.title} is missing a subtitle.`, 'Add concise supporting copy.', { hub: hub.title }));
    if (!hub.description) issues.push(issue('WARNING', 'Story', `${hub.title} is missing a purpose/description.`, 'Add a clear editorial purpose for the hub.', { hub: hub.title }));
    if (!hub.imagePath) issues.push(issue('FAIL', 'Image Quality', `${hub.title} is missing a hero image.`, 'Assign a representative local image.', { hub: hub.title }));
    const hubImageStatus = imageStatus(hub.imagePath);
    if (hubImageStatus !== 'ok') issues.push(issue(hubImageStatus === 'broken' || hubImageStatus === 'missing' ? 'FAIL' : 'WARNING', 'Image Quality', `${hub.title} hero image is ${hubImageStatus}.`, 'Replace with a specific, working, non-placeholder image.', { hub: hub.title, image: hub.imagePath }));
    if (!heroUsage.has(hub.imagePath)) heroUsage.set(hub.imagePath, []);
    heroUsage.get(hub.imagePath).push(hub.title);
    if (!hub.items.length) issues.push(issue('FAIL', 'Structure', `${hub.title} has no recipes.`, 'Populate or hide this hub.', { hub: hub.title }));
    hubIntentReports.push(evaluateHubIntent(hub, issues));

    hub.collections.forEach((collection) => {
      const groups = groupCollection(collection);
      const populatedGroups = [...groups.entries()].filter(([, items]) => items.length);
      const expectedGroups = displaySections[`${collection.hubName}::${collection.title}`] || [];
      const emptyGroups = expectedGroups.filter((name) => !groups.get(name)?.length);
      const duplicateTitles = collection.items.length - new Set(collection.items.map((item) => norm(item.title))).size;
      const groupCounts = populatedGroups.map(([, items]) => items.length);
      const max = groupCounts.length ? Math.max(...groupCounts) : 0;
      const min = groupCounts.length ? Math.min(...groupCounts) : 0;
      const orderRuns = repetitiveRuns(collection.items);
      const intentReport = evaluateCollectionIntent(collection, populatedGroups, emptyGroups, max, min, issues);
      collectionIntentReports.push(intentReport);

      if (!collection.title) issues.push(issue('FAIL', 'Structure', `${collection.hubName} has a collection missing a title.`, 'Add a title.', { hub: collection.hubName }));
      if (!collection.subtitle) issues.push(issue('WARNING', 'Structure', `${collection.hubName} / ${collection.title} is missing a subtitle.`, 'Add concise supporting copy.', { hub: collection.hubName, collection: collection.title }));
      if (!collection.description) issues.push(issue('WARNING', 'Structure', `${collection.hubName} / ${collection.title} is missing a description.`, 'Add clear purpose copy.', { hub: collection.hubName, collection: collection.title }));
      if (collection.hubName === 'Regional Journeys' && collection.title === 'Jammu & Kashmir') {
        const explicitMatches = collection.items.filter((item) => /jammu|kashmir|kashmiri|wazwan|rogan josh|yakhni|kahwa|haak|nadru|gushtaba|modur/.test(recipeText(item.recipe)));
        if (!explicitMatches.length) {
          issues.push(issue('WARNING', 'Regional Gap', 'Regional Journeys / Jammu & Kashmir is populated with best-current adjacent matches, but has no explicit Kashmiri or Jammu recipes yet.', 'Add real Kashmiri/Jammu recipes such as kahwa, haak, nadru yakhni, rogan josh, yakhni pulao or modur pulao before treating this hub as strong coverage.', { hub: collection.hubName, collection: collection.title }));
        }
      }
      if (duplicateTitles) issues.push(issue('FAIL', 'Structure', `${collection.hubName} / ${collection.title} has ${duplicateTitles} duplicate recipe title(s).`, 'Deduplicate recipes inside the collection.', { hub: collection.hubName, collection: collection.title }));
      orderRuns.forEach((run) => issues.push(issue('WARNING', 'Ordering', `${collection.hubName} / ${collection.title} has ${run.titles.length} consecutive ${run.family} recipes.`, 'Interleave visually and culinarily different recipes.', { hub: collection.hubName, collection: collection.title, family: run.family, recipes: run.titles })));

      collection.items.forEach((item) => {
        const entry = exposure.get(item.id);
        if (!entry) return;
        const membership = `${collection.hubName} / ${collection.title}`;
        const home = item.recipe.collectionHome;
        const isPrimary = home?.hub === collection.hubName && home?.collection === collection.title;
        entry.collections.add(membership);
        (isPrimary ? entry.primary : entry.secondary).add(membership);
        entry.subcategories.add(`${membership} / ${displayGroup(collection, item)}`);
      });

      collectionSummaries.push({
        hub: collection.hubName,
        collection: collection.title,
        intent: intentReport.intent,
        balanceMode: intentReport.balanceMode,
        status: intentReport.status,
        score: intentReport.score,
        count: collection.items.length,
        subcategories: populatedGroups.map(([name, items]) => ({ name, count: items.length })),
        emptySubcategories: emptyGroups,
        duplicateTitles,
        repetitiveRuns: orderRuns,
      });
    });
  });

  const sharedHeroImages = [...heroUsage.entries()].filter(([image, hubs]) => image && hubs.length > 1);
  sharedHeroImages.forEach(([image, hubs]) => issues.push(issue('WARNING', 'Image Quality', `Hero image is shared by ${hubs.length} hubs: ${hubs.join(', ')}.`, 'Use distinct hero images for main hubs where possible.', { image, hubs })));

  const orphanRecipes = [];
  const lowExposure = [];
  const overExposure = [];
  exposure.forEach((entry) => {
    const count = entry.collections.size;
    if (count === 0) orphanRecipes.push(recipeTitle(entry.recipe));
    const uncovered = uncoveredSecondaryPotential(entry);
    if (uncovered.length) {
      lowExposure.push({
        title: recipeTitle(entry.recipe),
        primary: [...entry.primary],
        secondary: [...entry.secondary],
        secondaryPotential: uncovered,
      });
    }
    if (count > 7) overExposure.push({ title: recipeTitle(entry.recipe), count });
    if (entry.subcategories.size === 0) issues.push(issue('FAIL', 'Coverage', `${recipeTitle(entry.recipe)} does not belong to any subcategory.`, 'Assign this recipe to at least one generated or curated subcategory.', { recipe: recipeTitle(entry.recipe) }));
  });
  orphanRecipes.forEach((title) => issues.push(issue('FAIL', 'Coverage', `${title} is orphaned from main collections.`, 'Assign collectionHome or add a generated coverage rule.', { recipe: title })));
  overExposure.forEach(({ title, count }) => issues.push(issue('WARNING', 'Exposure', `${title} appears in ${count} collections.`, 'Reduce overlapping collection rules or narrow this recipe placement.', { recipe: title, count })));
  if (lowExposure.length) {
    issues.push(issue('WARNING', 'Exposure', `${lowExposure.length} recipes have no meaningful secondary discovery path.`, 'Add only semantically appropriate secondary discovery paths; do not add random memberships for score.', { count: lowExposure.length }));
  }

  const diversitySummary = diversity(recipes);
  const diversityWarnings = [];
  const roleTotal = diversitySummary.roles.drinks + diversitySummary.roles.soups + diversitySummary.roles.desserts;
  if (diversitySummary.roles.drinks < 20) diversityWarnings.push('Drinks are relatively light in the overall collection mix.');
  if (diversitySummary.roles.soups < 20) diversityWarnings.push('Soups are relatively light in the overall collection mix.');
  if (diversitySummary.roles.desserts > Math.max(60, roleTotal * 0.5)) diversityWarnings.push('Desserts are prominent; ensure non-sweet celebration/seasonal collections remain visible.');
  if ((diversitySummary.grainBase.Rice || 0) > Math.max(50, (diversitySummary.grainBase['Bread/Wheat'] || 0) * 2.5)) diversityWarnings.push('Rice-based recipes dominate bread/millet bases.');
  diversityWarnings.forEach((message) => issues.push(issue('WARNING', 'Diversity', message, 'Add or surface more underrepresented recipe types in hub rules.')));

  const failCount = issues.filter((item) => item.severity === 'FAIL').length;
  const warningCount = issues.filter((item) => item.severity === 'WARNING').length;
  const hardStructureIssues = issues.filter((item) => {
    if (item.severity !== 'FAIL') return false;
    if (item.area === 'Structure') return true;
    return item.area === 'Image Quality' && /missing a hero image|hero image is missing|hero image is broken/.test(item.message);
  });
  const softStructureIssues = issues.filter((item) => {
    if (item.severity !== 'WARNING') return false;
    if (item.area === 'Structure' && /missing a subtitle|missing a description|missing a title/.test(item.message)) return true;
    return item.area === 'Image Quality' && /invalid|placeholder/.test(item.message);
  });
  const dimensionScores = {
    structure: Math.max(0, 100 - hardStructureIssues.length * 35 - softStructureIssues.length * 5),
    coverage: Math.max(0, 100 - orphanRecipes.length * 20 - lowExposure.length * 0.2),
    exposure: Math.max(0, 100 - overExposure.length * 6 - lowExposure.length * 0.15),
    balance: Math.round(collectionIntentReports.reduce((sum, item) => sum + item.score, 0) / Math.max(1, collectionIntentReports.length)),
    diversity: Math.max(0, 100 - issues.filter((item) => item.area === 'Diversity').length * 8),
    imageQuality: Math.max(0, 100 - issues.filter((item) => item.area === 'Image Quality' && item.severity === 'FAIL').length * 30 - issues.filter((item) => item.area === 'Image Quality' && item.severity === 'WARNING').length * 6),
    story: Math.max(0, 100 - issues.filter((item) => item.area === 'Story').length * 8 - issues.filter((item) => item.area === 'Intent').length * 5),
    authenticity: Math.max(0, 100 - issues.filter((item) => item.area === 'Regional Gap').length * 10),
  };
  const score = Math.max(0, Math.round(
    dimensionScores.structure * 0.14
    + dimensionScores.coverage * 0.12
    + dimensionScores.exposure * 0.10
    + dimensionScores.balance * 0.16
    + dimensionScores.diversity * 0.14
    + dimensionScores.imageQuality * 0.10
    + dimensionScores.story * 0.10
    + dimensionScores.authenticity * 0.14
    - failCount * 5
  ));
  const status = failCount ? 'FAIL' : warningCount ? 'WARNING' : 'PASS';

  return {
    generatedAt: new Date().toISOString(),
    score,
    status,
    summary: {
      recipeCount: recipes.length,
      hubCount: system.length,
      collectionCount: collectionSummaries.length,
      failCount,
      warningCount,
      orphanCount: orphanRecipes.length,
      overExposureCount: overExposure.length,
      lowExposureCount: lowExposure.length,
    },
    dimensionScores,
    manifest: collectionManifest,
    hubIntentReports,
    collectionIntentReports,
    hubs: system.map((hub) => ({
      title: hub.title,
      count: hub.items.length,
      intent: manifestForHub(hub.title).intent,
      targetMin: manifestForHub(hub.title).targetMin,
      targetMax: manifestForHub(hub.title).targetMax,
      balanceMode: manifestForHub(hub.title).balanceMode,
      subtitle: hub.subtitle,
      imagePath: hub.imagePath,
      imageStatus: imageStatus(hub.imagePath),
      collections: hub.collections.map((collection) => ({
        title: collection.title,
        count: collection.items.length,
      })),
    })),
    collections: collectionSummaries,
    exposure: {
      orphanRecipes,
      overExposure,
      lowExposure,
      membership: [...exposure.values()].map((entry) => ({
        title: recipeTitle(entry.recipe),
        primary: [...entry.primary],
        secondary: [...entry.secondary],
        secondaryPotential: uncoveredSecondaryPotential(entry),
      })),
    },
    diversity: {
      ...diversitySummary,
      topMealTypes: topEntries(diversitySummary.mealTypes),
      topDietTypes: topEntries(diversitySummary.dietTypes),
      topProteins: topEntries(diversitySummary.proteins),
      topRegions: topEntries(diversitySummary.regions),
      topGrainBase: topEntries(diversitySummary.grainBase),
    },
    imageQuality: {
      heroUsage: [...heroUsage.entries()].map(([image, hubs]) => ({ image, hubs })),
      sharedHeroImages: sharedHeroImages.map(([image, hubs]) => ({ image, hubs })),
    },
    issues,
  };
}

function mdTable(rows, headers) {
  if (!rows.length) return '_None._';
  const escape = (value) => String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${headers.map((header) => escape(row[header])).join(' | ')} |`),
  ].join('\n');
}

function renderMarkdown(report) {
  const groupedIssues = {
    FAIL: report.issues.filter((item) => item.severity === 'FAIL'),
    WARNING: report.issues.filter((item) => item.severity === 'WARNING'),
    PASS: report.issues.length ? [] : [issue('PASS', 'All', 'No collection integrity issues found.', 'Keep running this audit before release.')],
  };
  const issueRows = (items) => items.map((item) => ({
    Area: item.area,
    Finding: item.message,
    Recommendation: item.recommendation,
  }));
  return `# Collections Integrity Audit

Generated: ${report.generatedAt}

Overall status: **${report.status}**

Collections Integrity Score: **${report.score}/100**

## Summary

- Active recipes audited: ${report.summary.recipeCount}
- Main hubs audited: ${report.summary.hubCount}
- Child collections audited: ${report.summary.collectionCount}
- Failures: ${report.summary.failCount}
- Warnings: ${report.summary.warningCount}
- Orphan recipes: ${report.summary.orphanCount}
- Recipes in more than 7 collections: ${report.summary.overExposureCount}
- Recipes with no meaningful secondary discovery path: ${report.summary.lowExposureCount}

## Score By Dimension

${mdTable(Object.entries(report.dimensionScores).map(([name, score]) => ({
  Dimension: name,
  Score: `${score}/100`,
})), ['Dimension', 'Score'])}

## Hub Counts

${mdTable(report.hubs.map((hub) => ({
  Hub: hub.title,
  Intent: hub.intent,
  Target: hub.targetMax ? `${hub.targetMin}-${hub.targetMax}` : `${hub.targetMin}+`,
  Recipes: hub.count,
  Collections: hub.collections.length,
  Image: hub.imageStatus,
})), ['Hub', 'Intent', 'Target', 'Recipes', 'Collections', 'Image'])}

## Main Hub Intent

${mdTable(report.hubIntentReports.map((hub) => ({
  Hub: hub.title,
  Intent: hub.intent,
  Target: hub.targetMax ? `${hub.targetMin}-${hub.targetMax}` : `${hub.targetMin}+`,
  Actual: hub.actualCount,
  Balance: hub.balanceMode,
  Status: hub.status,
  Score: `${hub.score}/100`,
  Notes: hub.notes,
  Warnings: hub.warnings.join('; ') || 'None',
})), ['Hub', 'Intent', 'Target', 'Actual', 'Balance', 'Status', 'Score', 'Notes', 'Warnings'])}

## Child Collection Intent

${mdTable(report.collectionIntentReports.map((collection) => ({
  Hub: collection.hub,
  Collection: collection.collection,
  Intent: collection.intent,
  Balance: collection.balanceMode,
  Count: collection.actualCount,
  Status: collection.status,
  Score: `${collection.score}/100`,
  Notes: collection.notes || '',
  Warnings: collection.warnings.join('; ') || 'None',
})), ['Hub', 'Collection', 'Intent', 'Balance', 'Count', 'Status', 'Score', 'Notes', 'Warnings'])}

## PASS

${mdTable(issueRows(groupedIssues.PASS), ['Area', 'Finding', 'Recommendation'])}

## WARNING

${mdTable(issueRows(groupedIssues.WARNING), ['Area', 'Finding', 'Recommendation'])}

## FAIL

${mdTable(issueRows(groupedIssues.FAIL), ['Area', 'Finding', 'Recommendation'])}

## Collection Balance

${mdTable(report.collections.map((collection) => ({
  Hub: collection.hub,
  Collection: collection.collection,
  Intent: collection.intent,
  Status: collection.status,
  Recipes: collection.count,
  Subcategories: collection.subcategories.map((group) => `${group.name}: ${group.count}`).join('; '),
  Empty: collection.emptySubcategories.join(', ') || 'None',
})), ['Hub', 'Collection', 'Intent', 'Status', 'Recipes', 'Subcategories', 'Empty'])}

## Diversity Snapshot

- Top meal types: ${report.diversity.topMealTypes.map(([name, count]) => `${name} (${count})`).join(', ') || 'None'}
- Top diet types: ${report.diversity.topDietTypes.map(([name, count]) => `${name} (${count})`).join(', ') || 'None'}
- Top proteins: ${report.diversity.topProteins.map(([name, count]) => `${name} (${count})`).join(', ') || 'None'}
- Top regions: ${report.diversity.topRegions.map(([name, count]) => `${name} (${count})`).join(', ') || 'None'}
- Grain base: ${report.diversity.topGrainBase.map(([name, count]) => `${name} (${count})`).join(', ') || 'None'}
- Drinks: ${report.diversity.roles.drinks}
- Soups: ${report.diversity.roles.soups}
- Desserts: ${report.diversity.roles.desserts}

## Image Quality

${mdTable(report.imageQuality.heroUsage.map((entry) => ({
  Image: entry.image || 'Missing',
  Hubs: entry.hubs.join(', '),
  Shared: entry.hubs.length > 1 ? 'Yes' : 'No',
})), ['Image', 'Hubs', 'Shared'])}

## Exposure

- Orphan recipes: ${report.exposure.orphanRecipes.length ? report.exposure.orphanRecipes.join(', ') : 'None'}
- Over-exposed recipes: ${report.exposure.overExposure.length ? report.exposure.overExposure.map((item) => `${item.title} (${item.count})`).join(', ') : 'None'}
- Low-exposure recipes: ${report.exposure.lowExposure.length}
- Low-exposure sample: ${report.exposure.lowExposure.slice(0, 25).map((item) => item.title).join(', ') || 'None'}

`;
}

const report = analyze();
fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(outputMarkdown, renderMarkdown(report));

console.log(`Collections Integrity Score: ${report.score}/100 (${report.status})`);
console.log(`Wrote ${path.relative(root, outputMarkdown)}`);
console.log(`Wrote ${path.relative(root, outputJson)}`);
if (report.summary.failCount || report.summary.warningCount) {
  console.log(`Findings: ${report.summary.failCount} failures, ${report.summary.warningCount} warnings`);
}
