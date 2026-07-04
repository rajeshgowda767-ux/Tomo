(function initTomoPlanEngine(global) {
  const STORAGE_KEY = 'tomo_mobile_v1_plan';
  const PLAN_ROTATION_KEY = 'tomo_mobile_v1_plan_generation_count';
  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];
  let recipeListCacheKey = '';
  let recipeListCache = null;

  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getCurrentWeekStart(now = new Date()) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const daysSinceMonday = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - daysSinceMonday);
    return formatLocalDate(date);
  }

  function createEmptyPlan(weekStart = getCurrentWeekStart()) {
    const days = {};
    DAYS.forEach((day) => {
      days[day] = {};
      MEAL_TYPES.forEach((mealType) => {
        days[day][mealType] = null;
      });
    });
    return { weekStart, days };
  }

  function storage() {
    if (!global.localStorage) throw new Error('Tomo planning requires localStorage.');
    return global.localStorage;
  }

  function normalizeDay(day) {
    const value = String(day || '').trim().toLowerCase();
    if (!DAYS.includes(value)) throw new RangeError(`Unsupported plan day: ${day}`);
    return value;
  }

  function normalizeMealType(mealType) {
    const value = String(mealType || '').trim().toLowerCase();
    if (!MEAL_TYPES.includes(value)) throw new RangeError(`Unsupported meal type: ${mealType}`);
    return value;
  }

  function normalizeServings(value, fallback = 2) {
    const servings = Number(value);
    return Number.isFinite(servings) && servings > 0 ? servings : fallback;
  }

  function recipeRefFromSlot(slot) {
    if (!slot || typeof slot !== 'object') return null;
    const recipeIdValue = slot.recipeId || slot.id;
    if (!recipeIdValue) return null;
    return {
      recipeId: String(recipeIdValue),
      recipeName: String(slot.recipeName || slot.name || slot.title || recipeIdValue)
    };
  }

  function normalizeRecipeRef(value) {
    if (!value || typeof value !== 'object') return null;
    const recipeIdValue = value.recipeId || value.id;
    if (!recipeIdValue) return null;
    return {
      recipeId: String(recipeIdValue),
      recipeName: String(value.recipeName || value.name || value.title || recipeIdValue)
    };
  }

  function normalizeMealBundle(slot) {
    const bundle = slot.mealBundle || slot;
    const primaryRecipe = normalizeRecipeRef(bundle.primaryRecipe) || recipeRefFromSlot(slot);
    if (!primaryRecipe) return null;
    return {
      primaryRecipe,
      secondaryRecipe: normalizeRecipeRef(bundle.secondaryRecipe),
      optionalSides: Array.isArray(bundle.optionalSides)
        ? bundle.optionalSides.map(normalizeRecipeRef).filter(Boolean)
        : [],
      optionalDrink: normalizeRecipeRef(bundle.optionalDrink)
    };
  }

  function normalizeSlot(slot, day, mealType) {
    if (!slot || typeof slot !== 'object') return null;
    const mealBundle = mealType === 'lunch' || mealType === 'dinner'
      ? normalizeMealBundle(slot)
      : null;
    const primaryRecipe = mealBundle?.primaryRecipe || recipeRefFromSlot(slot);
    if (!primaryRecipe) return null;
    return {
      recipeId: primaryRecipe.recipeId,
      recipeName: primaryRecipe.recipeName,
      mealType,
      day,
      servings: normalizeServings(slot.servings),
      addedAt: slot.addedAt || new Date().toISOString(),
      ...(mealBundle ? { mealBundle } : {})
    };
  }

  function normalizePlan(plan, weekStart = getCurrentWeekStart()) {
    const normalized = createEmptyPlan(
      typeof plan?.weekStart === 'string' && plan.weekStart ? plan.weekStart : weekStart
    );
    DAYS.forEach((day) => {
      MEAL_TYPES.forEach((mealType) => {
        normalized.days[day][mealType] = normalizeSlot(plan?.days?.[day]?.[mealType], day, mealType);
      });
    });
    return normalized;
  }

  function saveWeeklyPlan(plan) {
    const normalized = normalizePlan(plan);
    storage().setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function initializePlan() {
    const weekStart = getCurrentWeekStart();
    let stored = null;
    try {
      stored = JSON.parse(storage().getItem(STORAGE_KEY) || 'null');
    } catch {
      stored = null;
    }

    if (!stored || stored.weekStart !== weekStart) {
      return saveWeeklyPlan(createEmptyPlan(weekStart));
    }

    const normalized = normalizePlan(stored, weekStart);
    storage().setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function getWeeklyPlan() {
    return initializePlan();
  }

  function findRecipe(recipeId) {
    const id = String(recipeId || '').trim();
    return recipeList().find((recipe) => (
      String(recipe.id || '') === id
      || String(recipe.sourceId || '') === id
      || String(recipe.slug || '') === id
    ));
  }

  function preferenceAllowsRecipe(recipe) {
    return typeof global.TOMO_RECIPE_ALLOWED_BY_PREFERENCES === 'function'
      ? global.TOMO_RECIPE_ALLOWED_BY_PREFERENCES(recipe)
      : true;
  }

  function recipeListSignature() {
    const recipes = global.COOKBUDDY_LOCAL_RECIPES || [];
    const preferences = global.TOMO_USER_PREFERENCES || {};
    return `${recipes.length}:${preferences.diet || ''}:${(preferences.proteins || []).slice().sort().join(',')}`;
  }

  function recipeList() {
    const signature = recipeListSignature();
    if (recipeListCache && recipeListCacheKey === signature) return recipeListCache;
    recipeListCacheKey = signature;
    recipeListCache = (global.COOKBUDDY_LOCAL_RECIPES || [])
      .filter((recipe) => recipe && (recipe.id || recipe.sourceId))
      .filter(preferenceAllowsRecipe);
    return recipeListCache;
  }

  function recipeName(recipe) {
    return String(recipe?.canonicalTitle || recipe?.title || recipe?.name || recipe?.id || '');
  }

  function recipeId(recipe) {
    return String(recipe?.id || recipe?.sourceId || recipe?.slug || recipeName(recipe));
  }

  function asList(value) {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }

  function recipeText(recipe) {
    return [
      recipeName(recipe),
      recipe?.description,
      recipe?.recipeRole,
      recipe?.dishFamily,
      recipe?.category,
      recipe?.cuisine,
      recipe?.region,
      ...asList(recipe?.mealType),
      ...asList(recipe?.mealTypes),
      ...asList(recipe?.mealTags),
      ...asList(recipe?.moodTags),
      ...asList(recipe?.tags),
      ...asList(recipe?.dietaryTags)
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function includesAny(text, words) {
    return words.some((word) => text.includes(word));
  }

  function mealRole(recipe) {
    return String(recipe?.mealRole || '').trim().toLowerCase();
  }

  function mealText(recipe) {
    return [
      ...asList(recipe?.mealType),
      ...asList(recipe?.mealTypes),
      ...asList(recipe?.mealTags)
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function intentText(recipe) {
    return [
      recipe?.recipeRole,
      recipe?.category,
      recipe?.dishFamily,
      ...asList(recipe?.mealType),
      ...asList(recipe?.mealTypes),
      ...asList(recipe?.mealTags),
      ...asList(recipe?.tags)
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function isSupportDish(recipe) {
    const title = recipeName(recipe).toLowerCase();
    const text = recipeText(recipe);
    const intent = intentText(recipe);
    return includesAny(intent, [
      'side', 'condiment', 'beverage', 'drink', 'dessert', 'soup',
      'quick bite', 'micro meal', 'baby food'
    ]) || includesAny(title, [
      'chutney', 'raita', 'pickle', 'mash', 'puree', 'salad'
    ]) || includesAny(text, [
      'drink', 'beverage', 'juice', 'tea', 'coffee', 'lassi', 'sharbat',
      'milkshake', 'milk drink', 'smoothie', 'cooler', 'sherbet', 'chaas'
    ]);
  }

  function dietBucket(recipe) {
    const text = recipeText(recipe);
    if (includesAny(text, ['egg', 'omelette', 'anda'])) return 'egg';
    if (includesAny(text, [
      'chicken', 'mutton', 'fish', 'prawn', 'seafood', 'pork', 'beef',
      'meat', 'non veg', 'non-veg', 'crab', 'duck'
    ])) return 'nonveg';
    return 'veg';
  }

  function regionalKey(recipe) {
    const regionTags = recipe?.regionTags && typeof recipe.regionTags === 'object'
      ? Object.values(recipe.regionTags).flat()
      : [];
    const labels = [recipe?.region, recipe?.origin, recipe?.cuisine, ...regionTags]
      .map((value) => String(value || '').trim())
      .filter(Boolean);
    const specific = labels.find((label) => {
      return !/^(indian|pan[- ]?indian|global|homestyle|home style|south indian|north indian|east indian|west indian)$/i.test(label);
    });
    return String(specific || '').toLowerCase();
  }

  function isBreakfastRecipe(recipe) {
    const role = mealRole(recipe);
    if (role) return role === 'breakfast_main';
    const text = recipeText(recipe);
    return includesAny(text, [
      'breakfast', 'idli', 'dosa', 'dosai', 'upma', 'poha', 'pongal',
      'appam', 'puttu', 'idiyappam', 'paratha', 'omelette', 'toast',
      'sandwich', 'rotti', 'roti', 'cheela', 'chilla', 'buns'
    ]);
  }

  function isSnackRecipe(recipe) {
    const role = mealRole(recipe);
    if (role) return role === 'snack';
    const text = recipeText(recipe);
    const title = recipeName(recipe).toLowerCase();
    const meal = mealText(recipe);
    const intent = intentText(recipe);
    if (isSupportDish(recipe)) return false;
    if (includesAny(intent, ['lunch', 'dinner', 'main', 'curry', 'rice meal'])) return false;
    if (includesAny(text, [
      'drink', 'beverage', 'juice', 'tea', 'coffee', 'lassi', 'sharbat',
      'milkshake', 'milk drink', 'smoothie', 'cooler', 'sherbet', 'chaas'
    ])) return false;
    if (includesAny(text, ['dessert', 'sweet', 'traditional-sweet', 'festival-sweets', 'puree', 'baby food'])) return false;
    if (includesAny(text, [
      'biryani', 'curry', 'kura', 'rassa', 'rice', 'pulao', 'bhaat',
      'khichdi', 'stew', 'gravy', 'sambar sadam', 'chawal', 'bhurji',
      'sabzi', 'pappu', 'pulusu', 'roast', 'poriyal', 'thoran'
    ])) return false;

    const explicitSnackIntent = includesAny(intent, [
      'snack', 'light', 'evening', 'tiffin', 'micro meal'
    ]);
    const snackTitle = includesAny(title, [
      'vada', 'bajji', 'pakora', 'chaat', 'cutlet', 'dhokla', 'khaman',
      'khandvi', 'murukku', 'thattai', 'sundal', 'toast', 'biscuits',
      'kachori', 'samosa', 'chop', 'devil', 'makhana'
    ]);
    const lightBreakfast = includesAny(meal, ['breakfast', 'tiffin'])
      && includesAny(title, [
        'idli', 'dosa', 'dosai', 'upma', 'poha', 'pongal', 'appam',
        'puttu', 'idiyappam', 'toast', 'sandwich', 'rotti', 'roti',
        'cheela', 'chilla', 'buns'
      ]);

    return explicitSnackIntent || snackTitle || lightBreakfast;
  }

  function isMainRecipe(recipe) {
    if (isSupportDish(recipe)) return false;
    const meal = mealText(recipe);
    const intent = intentText(recipe);
    if (includesAny(intent, ['snack', 'starter', 'appetizer', 'beverage', 'drink'])) return false;
    if (includesAny(meal, ['breakfast']) && !includesAny(meal, ['lunch', 'dinner'])) return false;

    const role = mealRole(recipe);
    if (role) return ['complete_meal', 'base', 'main_curry'].includes(role);
    const text = recipeText(recipe);
    const title = recipeName(recipe).toLowerCase();
    if (includesAny(text, [
      'dessert', 'sweet', 'drink', 'beverage', 'juice', 'tea', 'coffee',
      'lassi', 'milkshake', 'milk drink', 'smoothie', 'cooler', 'sherbet',
      'chaas'
    ])) return false;
    if (includesAny(title, [
      'chaat', 'vada', 'bajji', 'pakora', 'majestic', 'chicken 65',
      'cutlet', 'dhokla', 'khaman', 'khandvi', 'murukku', 'thattai',
      'sundal', 'toast', 'sandwich', 'biscuits', 'kachori', 'samosa',
      'chop', 'devil', 'makhana', 'plain chapati', 'plain roti',
      'omelette', 'bhurji'
    ])) return false;

    if (includesAny(meal, ['lunch', 'dinner']) && includesAny(intent, ['rice meal', 'one pot'])) return true;
    if (includesAny(intent, ['lunch', 'dinner', 'rice meal', 'one pot'])) return true;
    return includesAny(text, [
      'curry', 'rice', 'dal', 'saaru', 'rassa', 'biryani', 'pulao',
      'sabzi', 'bhaat', 'khichdi', 'stew', 'kuzhambu', 'pappu',
      'pulusu', 'sambar', 'roti', 'paratha', 'chawal', 'gravy',
      'thali', 'one-pot', 'one pot', 'meal'
    ]);
  }

  function recipesForMeal(mealType) {
    const list = recipeList();
    if (mealType === 'breakfast') return list.filter(isBreakfastRecipe);
    if (mealType === 'snack') return list.filter(isSnackRecipe);
    return list.filter((recipe) => {
      if (!isMainRecipe(recipe)) return false;
      if (mealRole(recipe) === 'complete_meal') return true;
      return Boolean(secondaryRecipeFor(recipe, new Set()));
    });
  }

  function existingPlannedKeys(plan) {
    const used = new Set();
    const addRef = (ref) => {
      if (!ref) return;
      used.add(`id:${ref.recipeId}`);
      used.add(`name:${String(ref.recipeName || '').trim().toLowerCase()}`);
    };
    DAYS.forEach((day) => {
      MEAL_TYPES.forEach((mealType) => {
        const slot = plan?.days?.[day]?.[mealType];
        if (!slot) return;
        addRef({ recipeId: slot.recipeId, recipeName: slot.recipeName });
        addRef(slot.mealBundle?.primaryRecipe);
        addRef(slot.mealBundle?.secondaryRecipe);
        (slot.mealBundle?.optionalSides || []).forEach(addRef);
        addRef(slot.mealBundle?.optionalDrink);
      });
    });
    return used;
  }

  function isRecipeUsed(recipe, used) {
    return used.has(`id:${recipeId(recipe)}`) || used.has(`name:${recipeName(recipe).trim().toLowerCase()}`);
  }

  function rotatedList(items, offset) {
    if (!items.length) return items;
    const start = Math.abs(offset) % items.length;
    return [...items.slice(start), ...items.slice(0, start)];
  }

  function selectRecipe(candidates, used, preferredDiet, offset = 0, regionCounts = new Map()) {
    const rotatedCandidates = rotatedList(candidates, offset);
    const preferred = preferredDiet
      ? rotatedCandidates.filter((recipe) => dietBucket(recipe) === preferredDiet)
      : rotatedCandidates;
    const preferredUnused = preferred.filter((recipe) => !isRecipeUsed(recipe, used));
    const allUnused = rotatedCandidates.filter((recipe) => !isRecipeUsed(recipe, used));
    const pool = preferredUnused.length ? preferredUnused : allUnused;
    return pool.slice(0, 10).find((recipe) => {
      const region = regionalKey(recipe);
      return region && !regionCounts.get(region);
    }) || pool[0] || null;
  }

  function plannedRegionCounts(plan) {
    const counts = new Map();
    DAYS.forEach((day) => {
      MEAL_TYPES.forEach((mealType) => {
        const slot = plan?.days?.[day]?.[mealType];
        const recipe = slot ? findRecipe(slot.mealBundle?.primaryRecipe?.recipeId || slot.recipeId) : null;
        const region = regionalKey(recipe);
        if (region) counts.set(region, (counts.get(region) || 0) + 1);
      });
    });
    return counts;
  }

  function suggestedDietFor(dayIndex, mealType) {
    const patterns = {
      breakfast: ['veg', 'egg', 'veg', 'veg', 'egg', 'veg', 'veg'],
      lunch: ['veg', 'nonveg', 'veg', 'egg', 'veg', 'nonveg', 'veg'],
      dinner: ['nonveg', 'veg', 'egg', 'veg', 'nonveg', 'veg', 'veg'],
      snack: ['veg', 'veg', 'egg', 'veg', 'veg', 'nonveg', 'veg']
    };
    return patterns[mealType]?.[dayIndex % 7] || 'veg';
  }

  function conceptKey(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\b(plain|simple|homestyle|home style|style)\b/g, '')
      .trim();
  }

  function recipeAliases(recipe) {
    return [
      recipeName(recipe),
      recipe?.title,
      recipe?.name,
      recipe?.canonicalTitle,
      ...asList(recipe?.aliases)
    ].filter(Boolean);
  }

  function mappedPairingLabel(label) {
    const key = conceptKey(label);
    const mappings = {
      rice: 'Ghee Rice',
      'steamed rice': 'Ghee Rice',
      'matta rice': 'Ghee Rice',
      'jeera rice': 'Ghee Rice',
      roti: 'Plain Chapati',
      chapati: 'Plain Chapati',
      phulka: 'Plain Chapati'
    };
    return mappings[key] || label;
  }

  const pairingRecipeCache = new Map();

  function findRecipeByLabel(label) {
    const mappedLabel = mappedPairingLabel(label);
    const key = conceptKey(mappedLabel);
    if (!key) return null;
    if (pairingRecipeCache.has(key)) return pairingRecipeCache.get(key);
    const match = recipeList().find((recipe) => recipeAliases(recipe).some((value) => conceptKey(value) === key))
      || recipeList().find((recipe) => recipeAliases(recipe).some((value) => conceptKey(value).includes(key) || key.includes(conceptKey(value))));
    pairingRecipeCache.set(key, match || null);
    return match || null;
  }

  function pairingLabels(recipe) {
    const pairings = recipe?.pairings || {};
    return [
      ...asList(recipe?.quickGuide?.bestWith),
      ...asList(recipe?.bestWith),
      ...asList(pairings.rice),
      ...asList(pairings.roti),
      ...asList(pairings.sides)
    ].filter(Boolean);
  }

  function isCompleteMeal(recipe) {
    const role = mealRole(recipe);
    if (role) return role === 'complete_meal';
    const text = recipeText(recipe);
    const title = recipeName(recipe).toLowerCase();
    if (includesAny(title, ['ghee rice', 'plain rice', 'steamed rice', 'matta rice', 'jeera rice', 'neychoru'])) return false;
    return includesAny(title, [
      'biryani', 'pulao', 'khichdi', 'rajma chawal', 'curd rice',
      'fried rice', 'rice bowl', 'dal rice', 'fish curry rice',
      'egg curry rice', 'chicken rice', 'smoked pork rice', 'chawal',
      'bhaat', 'bhata', 'sadam', 'annam', 'puliyogare', 'pulihora',
      'chitranna', 'bibimbap', 'gyapa khazi', 'luchi aloor dom',
      'adai', 'eromba', ' rice'
    ]) || includesAny(text, ['one pot', 'one-pot']);
  }

  function isRiceBase(recipe) {
    if (isSupportDish(recipe)) return false;
    const role = mealRole(recipe);
    if (role) return role === 'base';
    const text = recipeText(recipe);
    const title = recipeName(recipe).toLowerCase();
    return includesAny(title, ['ghee rice', 'plain rice', 'steamed rice', 'matta rice', 'jeera rice'])
      || (includesAny(text, ['rice']) && !isCompleteMeal(recipe));
  }

  function isRotiBase(recipe) {
    if (isSupportDish(recipe)) return false;
    const role = mealRole(recipe);
    if (role) return role === 'base';
    const title = recipeName(recipe).toLowerCase();
    return includesAny(title, ['chapati', 'roti', 'paratha'])
      && !includesAny(title, ['roll', 'wrap', 'jam', 'sandwich']);
  }

  function isCurryLike(recipe) {
    if (isSupportDish(recipe)) return false;
    const role = mealRole(recipe);
    if (role) return role === 'main_curry';
    const text = recipeText(recipe);
    return includesAny(text, [
      'curry', 'dal', 'saaru', 'rassa', 'stew', 'kuzhambu',
      'pappu', 'pulusu', 'sambar', 'gravy', 'kurma', 'korma'
    ]);
  }

  function isBundleSecondaryRecipe(recipe) {
    if (isSupportDish(recipe)) return false;
    const role = mealRole(recipe);
    if (role) return role === 'base' || role === 'main_curry';
    const text = recipeText(recipe);
    const title = recipeName(recipe).toLowerCase();
    if (includesAny(text, [
      'dessert', 'sweet', 'drink', 'beverage', 'juice', 'tea', 'coffee',
      'lassi', 'snack', 'starter', 'appetizer'
    ])) return false;
    if (includesAny(title, [
      'chaat', 'vada', 'bajji', 'pakora', 'majestic', 'chicken 65',
      'cutlet', 'dhokla', 'toast', 'sandwich', 'biscuits', 'samosa',
      'omelette', 'bhurji', 'eromba'
    ])) return false;
    return isRiceBase(recipe) || isRotiBase(recipe) || isCurryLike(recipe);
  }

  function recipeRef(recipe) {
    return recipe ? { recipeId: recipeId(recipe), recipeName: recipeName(recipe) } : null;
  }

  function resolveBundleCandidate(labels, used, allowed) {
    for (const label of labels) {
      const exact = findRecipeByLabel(label);
      if (exact && allowed(exact) && isBundleSecondaryRecipe(exact) && !isRecipeUsed(exact, used)) return exact;
    }
    return null;
  }

  function secondaryRecipeFor(primary, used) {
    if (!primary || isCompleteMeal(primary)) return null;
    const labels = pairingLabels(primary);
    const wantsRiceOrRoti = (recipe) => isRiceBase(recipe) || isRotiBase(recipe);
    const wantsDalOrCurry = (recipe) => isCurryLike(recipe);

    if (isCurryLike(primary)) {
      return recipeRef(resolveBundleCandidate(labels, used, wantsRiceOrRoti));
    }

    if (isRiceBase(primary) || isRotiBase(primary)) {
      return recipeRef(resolveBundleCandidate(labels, used, wantsDalOrCurry));
    }

    return null;
  }

  function riceHeavyCompleteMeal(recipe) {
    if (!recipe || !isCompleteMeal(recipe)) return false;
    const text = `${recipeName(recipe)} ${recipeText(recipe)}`.toLowerCase();
    return includesAny(text, [
      'rice', 'biryani', 'pulao', 'chawal', 'bhaat', 'bhata', 'sadam',
      'annam', 'puliyogare', 'pulihora', 'chitranna', 'khichdi',
      'bisi bele bath', 'bisibelebath', 'fried rice'
    ]);
  }

  function mealBaseKey(primary, secondary = null) {
    const recipes = [primary, secondary].filter(Boolean);
    const text = recipes.map((recipe) => `${recipeName(recipe)} ${recipeText(recipe)}`).join(' ').toLowerCase();
    if (includesAny(text, ['rice', 'biryani', 'pulao', 'chawal', 'bhaat', 'bhata', 'sadam', 'annam', 'puliyogare', 'pulihora', 'chitranna', 'khichdi'])) return 'rice';
    if (includesAny(text, ['chapati', 'roti', 'paratha', 'bhakri', 'kulcha', 'naan', 'bread', 'pav'])) return 'bread';
    if (includesAny(text, ['neer dosa', 'dosa', 'dosai', 'appam', 'idiyappam'])) return 'dosa';
    if (includesAny(text, ['ragi', 'millet', 'bajra', 'jowar', 'mandua'])) return 'millet';
    if (includesAny(text, ['soup', 'stew', 'thukpa'])) return 'soup';
    return '';
  }

  function riceFeastMeal(recipe) {
    if (!recipe || !isCompleteMeal(recipe)) return false;
    const title = recipeName(recipe).toLowerCase();
    return includesAny(title, ['biryani', 'pulao', 'fried rice', 'dum rice']);
  }

  function familiarDinnerMeal(primary, secondary = null) {
    if (!primary) return false;
    const base = mealBaseKey(primary, secondary);
    const text = [primary, secondary]
      .filter(Boolean)
      .map((recipe) => `${recipeName(recipe)} ${recipeText(recipe)}`)
      .join(' ')
      .toLowerCase();
    if (includesAny(text, ['dal rice', 'rasam rice', 'sambar rice', 'curd rice', 'khichdi'])) return true;
    if (base === 'bread' && includesAny(text, ['curry', 'dal', 'sabzi', 'kura', 'gravy'])) return true;
    if (base === 'dosa' && includesAny(text, ['curry', 'stew', 'sambar', 'kura', 'gravy'])) return true;
    if (base === 'soup' && includesAny(text, ['bread', 'toast', 'pav'])) return true;
    return Boolean(primary.lowEffort || primary.minimalCleanup || primary.lightMeal || primary.onePot);
  }

  function mealProfile(primary, secondary = null) {
    return {
      base: mealBaseKey(primary, secondary),
      riceHeavy: riceHeavyCompleteMeal(primary),
      riceFeast: riceFeastMeal(primary),
      familiarDinner: familiarDinnerMeal(primary, secondary)
    };
  }

  function candidateMealProfile(recipe, used) {
    const secondaryRef = secondaryRecipeFor(recipe, used);
    return mealProfile(recipe, secondaryRef ? findRecipe(secondaryRef.recipeId) : null);
  }

  function plannedSlotProfile(slot) {
    if (!slot) return null;
    const primary = findRecipe(slot.mealBundle?.primaryRecipe?.recipeId || slot.recipeId);
    const secondary = findRecipe(slot.mealBundle?.secondaryRecipe?.recipeId);
    return primary ? mealProfile(primary, secondary) : null;
  }

  function preferCandidates(candidates, predicate, used) {
    const preferred = candidates.filter((recipe) => predicate(recipe) && !isRecipeUsed(recipe, used));
    return preferred.length ? preferred : candidates;
  }

  function balancedMainCandidates(candidates, plan, day, dayIndex, mealType, used) {
    const profiles = new Map(candidates.map((recipe) => [recipeId(recipe), candidateMealProfile(recipe, used)]));
    const profileFor = (recipe) => profiles.get(recipeId(recipe));
    let balanced = candidates;
    const otherMealType = mealType === 'lunch' ? 'dinner' : 'lunch';
    const otherProfile = plannedSlotProfile(plan.days[day][otherMealType]);
    const previousDay = dayIndex > 0 ? DAYS[dayIndex - 1] : '';
    const previousBases = new Set(previousDay
      ? ['lunch', 'dinner']
        .map((type) => plannedSlotProfile(plan.days[previousDay][type])?.base)
        .filter(Boolean)
      : []);

    if (otherProfile?.riceHeavy) {
      balanced = preferCandidates(balanced, (recipe) => !profileFor(recipe).riceHeavy, used);
    }
    if (otherProfile?.riceFeast) {
      balanced = preferCandidates(balanced, (recipe) => !profileFor(recipe).riceFeast, used);
    }
    if (previousBases.size) {
      balanced = preferCandidates(balanced, (recipe) => !previousBases.has(profileFor(recipe).base), used);
    }
    if (otherProfile?.base) {
      balanced = preferCandidates(balanced, (recipe) => profileFor(recipe).base !== otherProfile.base, used);
    }

    if (mealType === 'dinner') {
      balanced = preferCandidates(balanced, (recipe) => profileFor(recipe).familiarDinner, used);
    }

    return balanced;
  }

  function makePlanSlot(recipe, day, mealType, addedAt, used = new Set()) {
    const primaryRecipe = {
      recipeId: recipeId(recipe),
      recipeName: recipeName(recipe)
    };
    const secondaryRecipe = (mealType === 'lunch' || mealType === 'dinner')
      ? secondaryRecipeFor(recipe, used)
      : null;
    return {
      recipeId: primaryRecipe.recipeId,
      recipeName: primaryRecipe.recipeName,
      mealType,
      day,
      servings: 2,
      addedAt,
      ...((mealType === 'lunch' || mealType === 'dinner') ? {
        mealBundle: {
          primaryRecipe,
          secondaryRecipe,
          optionalSides: [],
          optionalDrink: null
        }
      } : {})
    };
  }

  function nextGenerationIndex() {
    const current = Number.parseInt(storage().getItem(PLAN_ROTATION_KEY) || '0', 10);
    const next = Number.isFinite(current) ? current + 1 : 1;
    storage().setItem(PLAN_ROTATION_KEY, String(next));
    return next;
  }

  function generateSuggestedWeeklyPlan() {
    const plan = getWeeklyPlan();
    const used = existingPlannedKeys(plan);
    const regionCounts = plannedRegionCounts(plan);
    const candidatesByMeal = Object.fromEntries(
      MEAL_TYPES.map((mealType) => [mealType, recipesForMeal(mealType)])
    );
    const generationIndex = nextGenerationIndex();
    const addedAt = new Date().toISOString();

    DAYS.forEach((day, dayIndex) => {
      MEAL_TYPES.forEach((mealType, mealIndex) => {
        if (plan.days[day][mealType]) return;
        const offset = generationIndex * 37 + dayIndex * 11 + mealIndex * 7;
        let availableCandidates = (mealType === 'lunch' || mealType === 'dinner')
          ? candidatesByMeal[mealType].filter((candidate) => (
            isCompleteMeal(candidate) || Boolean(secondaryRecipeFor(candidate, used))
          ))
          : candidatesByMeal[mealType];
        if (mealType === 'lunch' || mealType === 'dinner') {
          availableCandidates = balancedMainCandidates(availableCandidates, plan, day, dayIndex, mealType, used);
        }
        const recipe = selectRecipe(availableCandidates, used, suggestedDietFor(dayIndex, mealType), offset, regionCounts);
        if (!recipe) return;
        const slot = makePlanSlot(recipe, day, mealType, addedAt, used);
        plan.days[day][mealType] = slot;
        used.add(`id:${recipeId(recipe)}`);
        used.add(`name:${recipeName(recipe).trim().toLowerCase()}`);
        const region = regionalKey(recipe);
        if (region) regionCounts.set(region, (regionCounts.get(region) || 0) + 1);
        if (slot.mealBundle?.secondaryRecipe) {
          used.add(`id:${slot.mealBundle.secondaryRecipe.recipeId}`);
          used.add(`name:${slot.mealBundle.secondaryRecipe.recipeName.trim().toLowerCase()}`);
        }
      });
    });

    return normalizePlan(plan);
  }

  function addRecipeToPlan(recipeId, day, mealType) {
    const normalizedDay = normalizeDay(day);
    const normalizedMealType = normalizeMealType(mealType);
    const recipe = findRecipe(recipeId);
    if (!recipe) throw new Error(`Recipe not found: ${recipeId}`);

    const plan = getWeeklyPlan();
    plan.days[normalizedDay][normalizedMealType] = makePlanSlot(recipe, normalizedDay, normalizedMealType, new Date().toISOString());
    return saveWeeklyPlan(plan);
  }

  function removeRecipeFromPlan(day, mealType) {
    const normalizedDay = normalizeDay(day);
    const normalizedMealType = normalizeMealType(mealType);
    const plan = getWeeklyPlan();
    plan.days[normalizedDay][normalizedMealType] = null;
    return saveWeeklyPlan(plan);
  }

  function updatePlannedRecipe(day, mealType, updates = {}) {
    const normalizedDay = normalizeDay(day);
    const normalizedMealType = normalizeMealType(mealType);
    const plan = getWeeklyPlan();
    const existing = plan.days[normalizedDay][normalizedMealType];
    if (!existing) throw new Error(`No planned recipe for ${normalizedDay} ${normalizedMealType}.`);

    let recipeId = existing.recipeId;
    let recipeName = existing.recipeName;
    if (updates.recipeId && String(updates.recipeId) !== existing.recipeId) {
      const recipe = findRecipe(updates.recipeId);
      if (!recipe) throw new Error(`Recipe not found: ${updates.recipeId}`);
      recipeId = String(recipe.id || updates.recipeId);
      recipeName = String(recipe.canonicalTitle || recipe.title || recipe.name || updates.recipeId);
    } else if (updates.recipeName) {
      recipeName = String(updates.recipeName);
    }

    const updatedSlot = {
      ...existing,
      recipeId,
      recipeName,
      mealType: normalizedMealType,
      day: normalizedDay,
      servings: normalizeServings(updates.servings, existing.servings),
      addedAt: existing.addedAt
    };
    if (normalizedMealType === 'lunch' || normalizedMealType === 'dinner') {
      updatedSlot.mealBundle = {
        ...(existing.mealBundle || {}),
        primaryRecipe: { recipeId, recipeName },
        secondaryRecipe: normalizeRecipeRef(updates.secondaryRecipe) || existing.mealBundle?.secondaryRecipe || null,
        optionalSides: Array.isArray(updates.optionalSides)
          ? updates.optionalSides.map(normalizeRecipeRef).filter(Boolean)
          : (existing.mealBundle?.optionalSides || []),
        optionalDrink: Object.hasOwn(updates, 'optionalDrink')
          ? normalizeRecipeRef(updates.optionalDrink)
          : (existing.mealBundle?.optionalDrink || null)
      };
    }
    plan.days[normalizedDay][normalizedMealType] = updatedSlot;
    return saveWeeklyPlan(plan);
  }

  function clearWeek() {
    return saveWeeklyPlan(createEmptyPlan());
  }

  const api = {
    initializePlan,
    getWeeklyPlan,
    saveWeeklyPlan,
    addRecipeToPlan,
    removeRecipeFromPlan,
    updatePlannedRecipe,
    generateSuggestedWeeklyPlan,
    clearWeek,
    STORAGE_KEY,
    PLAN_ROTATION_KEY,
    DAYS,
    MEAL_TYPES
  };

  global.TOMO_PLAN_ENGINE = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
