import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const databasePath = path.join(root, 'database', 'generated', 'recipes.json');
const frontendRecipesPath = path.join(root, 'frontend', 'local-recipes.js');
const reportsDir = path.join(root, 'database', 'generated', 'reports');
const createdJsonPath = path.join(reportsDir, 'approved_recipes_created.json');
const aliasesJsonPath = path.join(reportsDir, 'recipe_aliases_added.json');

const approvedRecipes = [
  {
    name: 'Peas Pulao',
    aliases: ['Matar Pulao', 'Green Peas Pulao'],
    baseIngredient: 'rice',
    coreIngredients: ['rice', 'green peas'],
    requiredIngredients: ['rice', 'green peas'],
    optionalIngredients: ['onion', 'cumin', 'whole spices', 'ghee', 'mint', 'coriander', 'oil', 'salt'],
    dishFamily: 'pulao',
    cuisine: 'Indian',
    mealType: 'lunch',
    dietType: 'vegetarian',
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    imageUrl: '/assets/images/dishes/pulao.png',
    cookingNotes: 'Cook the rice with green peas and mild whole spices. Keep the grains separate and avoid overcooking the peas.',
  },
  {
    name: 'Mushroom Pulao',
    aliases: ['Mushroom Rice', 'Mushroom Pilaf'],
    baseIngredient: 'rice',
    coreIngredients: ['rice', 'mushroom'],
    requiredIngredients: ['rice', 'mushroom'],
    optionalIngredients: ['onion', 'garlic', 'green peas', 'whole spices', 'ghee', 'mint', 'coriander', 'oil', 'salt'],
    dishFamily: 'pulao',
    cuisine: 'Indian',
    mealType: 'lunch',
    dietType: 'vegetarian',
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    imageUrl: '/assets/images/dishes/pulao.png',
    cookingNotes: 'Brown the mushrooms first so they release excess moisture, then cook with rice and aromatic whole spices.',
  },
  {
    name: 'Onion Omelette',
    aliases: ['Onion Omelet', 'Pyaz Omelette'],
    baseIngredient: 'egg',
    coreIngredients: ['egg', 'onion'],
    requiredIngredients: ['egg', 'onion'],
    optionalIngredients: ['green chilli', 'coriander', 'black pepper', 'turmeric', 'oil', 'salt'],
    dishFamily: 'omelette',
    cuisine: 'Indian',
    mealType: 'breakfast',
    dietType: 'non-vegetarian',
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    imageUrl: '/assets/images/dishes/bread-omelette-homestyle.png',
    cookingNotes: 'Chop the onion finely so it softens while the egg sets. Cook until just firm to keep the omelette tender.',
  },
  {
    name: 'Tomato Omelette',
    aliases: ['Tomato Omelet'],
    baseIngredient: 'egg',
    coreIngredients: ['egg', 'tomato'],
    requiredIngredients: ['egg', 'tomato'],
    optionalIngredients: ['onion', 'green chilli', 'coriander', 'black pepper', 'oil', 'salt'],
    dishFamily: 'omelette',
    cuisine: 'Indian',
    mealType: 'breakfast',
    dietType: 'non-vegetarian',
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    imageUrl: '/assets/images/dishes/bread-omelette-homestyle.png',
    cookingNotes: 'Use deseeded, finely chopped tomato to prevent excess moisture, then cook the egg mixture until just set.',
  },
  {
    name: 'Batata Poha',
    aliases: ['Potato Poha', 'Aloo Poha'],
    baseIngredient: 'poha',
    coreIngredients: ['poha', 'potato'],
    requiredIngredients: ['poha', 'potato'],
    optionalIngredients: ['onion', 'peanuts', 'mustard seeds', 'turmeric', 'curry leaves', 'green chilli', 'lemon', 'oil', 'salt'],
    dishFamily: 'poha',
    cuisine: 'Maharashtrian',
    mealType: 'breakfast',
    dietType: 'vegetarian',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    imageUrl: '/assets/images/dishes/poha-homestyle.png',
    cookingNotes: 'Rinse the poha briefly. Cook small potato cubes until tender before folding in the poha, then finish with lemon.',
  },
  {
    name: 'Paneer Mushroom Masala',
    aliases: ['Mushroom Paneer Masala', 'Paneer Mushroom Curry'],
    baseIngredient: 'paneer',
    coreIngredients: ['paneer', 'mushroom'],
    requiredIngredients: ['paneer', 'mushroom'],
    optionalIngredients: ['onion', 'tomato', 'ginger', 'garlic', 'cream', 'garam masala', 'coriander', 'oil', 'salt'],
    dishFamily: 'paneer-curry',
    cuisine: 'North Indian',
    mealType: 'dinner',
    dietType: 'vegetarian',
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    imageUrl: '/assets/images/dishes/paneer-curry.png',
    cookingNotes: 'Brown mushrooms separately to remove moisture, then finish the paneer and mushrooms in an onion-tomato masala.',
  },
  {
    name: 'Chicken Potato Curry',
    aliases: ['Chicken Aloo Curry', 'Chicken and Potato Curry'],
    baseIngredient: 'chicken',
    coreIngredients: ['chicken', 'potato'],
    requiredIngredients: ['chicken', 'potato'],
    optionalIngredients: ['onion', 'tomato', 'ginger', 'garlic', 'green chilli', 'garam masala', 'coriander', 'oil', 'salt'],
    dishFamily: 'chicken-curry',
    cuisine: 'Indian',
    mealType: 'dinner',
    dietType: 'non-vegetarian',
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    imageUrl: '/assets/images/dishes/chicken-curry-rice.png',
    cookingNotes: 'Cut potatoes evenly and simmer them with the chicken until both are tender in a medium-thick gravy.',
  },
  {
    name: 'Chicken Mushroom Stir Fry',
    aliases: ['Mushroom Chicken Stir Fry', 'Chicken and Mushroom Stir Fry'],
    baseIngredient: 'chicken',
    coreIngredients: ['chicken', 'mushroom'],
    requiredIngredients: ['chicken', 'mushroom'],
    optionalIngredients: ['garlic', 'soy sauce', 'black pepper', 'capsicum', 'spring onion', 'oil', 'salt'],
    dishFamily: 'stir-fry',
    cuisine: 'Asian / Indo-Chinese',
    mealType: 'dinner',
    dietType: 'non-vegetarian',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    imageUrl: '/assets/images/dishes/chicken-curry.png',
    cookingNotes: 'Cook over high heat in batches so the mushrooms brown and the chicken stays tender instead of steaming.',
  },
  {
    name: 'Mutton Pulao',
    aliases: ['Mutton Pilaf', 'Gosht Pulao'],
    baseIngredient: 'rice',
    coreIngredients: ['rice', 'mutton'],
    requiredIngredients: ['rice', 'mutton'],
    optionalIngredients: ['onion', 'yogurt', 'ginger', 'garlic', 'whole spices', 'mint', 'ghee', 'oil', 'salt'],
    dishFamily: 'pulao',
    cuisine: 'Indian',
    mealType: 'dinner',
    dietType: 'non-vegetarian',
    prepTimeMinutes: 20,
    cookTimeMinutes: 55,
    imageUrl: '/assets/images/dishes/pulao.png',
    cookingNotes: 'Tenderize the mutton before adding rice. Use the cooking stock for flavor and keep the rice grains separate.',
  },
  {
    name: 'Palak Paratha',
    aliases: ['Spinach Paratha'],
    baseIngredient: 'wheat flour',
    coreIngredients: ['wheat flour', 'spinach'],
    requiredIngredients: ['wheat flour', 'spinach'],
    optionalIngredients: ['green chilli', 'cumin', 'ginger', 'ajwain', 'ghee', 'oil', 'salt'],
    dishFamily: 'paratha',
    cuisine: 'North Indian',
    mealType: 'breakfast',
    dietType: 'vegetarian',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    imageUrl: '/assets/images/dishes/paratha.png',
    cookingNotes: 'Use chopped or pureed spinach in the dough and rest it briefly before rolling. Cook on a hot tawa.',
  },
  {
    name: 'Mooli Paratha',
    aliases: ['Radish Paratha'],
    baseIngredient: 'wheat flour',
    coreIngredients: ['wheat flour', 'radish'],
    requiredIngredients: ['wheat flour', 'radish'],
    optionalIngredients: ['radish leaves', 'green chilli', 'ajwain', 'coriander', 'ghee', 'oil', 'salt'],
    dishFamily: 'paratha',
    cuisine: 'North Indian',
    mealType: 'breakfast',
    dietType: 'vegetarian',
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    imageUrl: '/assets/images/dishes/paratha.png',
    cookingNotes: 'Salt and squeeze grated radish thoroughly before stuffing so the filling does not make the dough wet.',
  },
  {
    name: 'Cheese Paratha',
    aliases: ['Cheesy Paratha'],
    baseIngredient: 'wheat flour',
    coreIngredients: ['wheat flour', 'cheese'],
    requiredIngredients: ['wheat flour', 'cheese'],
    optionalIngredients: ['chilli flakes', 'coriander', 'black pepper', 'ghee', 'oil', 'salt'],
    dishFamily: 'paratha',
    cuisine: 'Indian',
    mealType: 'breakfast',
    dietType: 'vegetarian',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    imageUrl: '/assets/images/dishes/paratha.png',
    cookingNotes: 'Seal grated cheese inside the dough and cook over medium heat so the filling melts without burning the paratha.',
  },
  {
    name: 'Sweet Holige',
    aliases: ['Holige', 'Obbattu', 'Puran Poli'],
    baseIngredient: 'wheat flour',
    coreIngredients: ['wheat flour', 'jaggery'],
    requiredIngredients: ['wheat flour', 'jaggery'],
    optionalIngredients: ['chana dal', 'coconut', 'cardamom', 'turmeric', 'ghee', 'oil', 'salt'],
    dishFamily: 'sweet-flatbread',
    cuisine: 'Karnataka / South Indian',
    mealType: 'snack',
    dietType: 'vegetarian',
    prepTimeMinutes: 30,
    cookTimeMinutes: 35,
    imageUrl: '/assets/images/dishes/paratha.png',
    cookingNotes: 'Cook the jaggery-lentil filling until dry, cool it fully, then roll gently and cook the filled flatbread with ghee.',
  },
  {
    name: 'Cheese Dosa',
    aliases: ['Cheesy Dosa'],
    baseIngredient: 'dosa batter',
    coreIngredients: ['dosa batter', 'cheese'],
    requiredIngredients: ['dosa batter', 'cheese'],
    optionalIngredients: ['onion', 'chilli flakes', 'coriander', 'oil', 'chutney', 'sambar', 'salt'],
    dishFamily: 'dosa',
    cuisine: 'South Indian / Fusion',
    mealType: 'breakfast',
    dietType: 'vegetarian',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    imageUrl: '/assets/images/dishes/dosa-homestyle.png',
    cookingNotes: 'Spread the batter thinly, cook until crisp, add cheese near the end, and fold once the cheese melts.',
  },
  {
    name: 'Cheese Uttapam',
    aliases: ['Cheesy Uttapam'],
    baseIngredient: 'idli batter',
    coreIngredients: ['idli batter', 'cheese'],
    requiredIngredients: ['idli batter', 'cheese'],
    optionalIngredients: ['onion', 'tomato', 'capsicum', 'green chilli', 'coriander', 'oil', 'salt'],
    dishFamily: 'uttapam',
    cuisine: 'South Indian / Fusion',
    mealType: 'breakfast',
    dietType: 'vegetarian',
    prepTimeMinutes: 5,
    cookTimeMinutes: 12,
    imageUrl: '/assets/images/dishes/dosa-homestyle.png',
    cookingNotes: 'Cook a thick uttapam, add toppings and cheese, then cover briefly so the cheese melts while the base browns.',
  },
  {
    name: 'Spanish Omelette',
    aliases: ['Spanish Tortilla', 'Tortilla Espanola', 'Potato Omelette'],
    baseIngredient: 'egg',
    coreIngredients: ['egg', 'potato'],
    requiredIngredients: ['egg', 'potato'],
    optionalIngredients: ['onion', 'black pepper', 'parsley', 'paprika', 'olive oil', 'salt'],
    dishFamily: 'omelette',
    cuisine: 'Spanish',
    mealType: 'breakfast',
    dietType: 'non-vegetarian',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    imageUrl: '/assets/images/dishes/bread-omelette-homestyle.png',
    cookingNotes: 'Cook sliced potatoes and onion gently before setting them in beaten eggs. Finish slowly for a tender center.',
  },
  {
    name: 'Sweet Rice',
    aliases: ['Meetha Chawal', 'Jaggery Rice'],
    baseIngredient: 'rice',
    coreIngredients: ['rice', 'jaggery'],
    requiredIngredients: ['rice', 'jaggery'],
    optionalIngredients: ['ghee', 'cardamom', 'coconut', 'cashew', 'raisins', 'saffron'],
    dishFamily: 'sweet-rice',
    cuisine: 'Indian',
    mealType: 'dessert',
    dietType: 'vegetarian',
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    imageUrl: '/assets/images/dishes/pongal.png',
    cookingNotes: 'Cook rice until tender, dissolve jaggery separately, then combine and finish with cardamom and ghee.',
  },
];

const aliasUpdates = [
  { recipe: 'Andhra Kodi Vepudu', aliases: ['Chicken Fry', 'Andhra Chicken Fry'] },
  { recipe: 'Chicken Fried Rice', aliases: ['Chicken Egg Fried Rice', 'Chicken and Egg Fried Rice'] },
  { recipe: 'Upma', aliases: ['Vegetable Upma', 'Vegetable Rava Upma'] },
];

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function slug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function uuidFor(value) {
  const hash = crypto.createHash('sha1').update(`tomo-approved-recipe:${value}`).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-5${hash.slice(13, 16)}-${((parseInt(hash.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hash.slice(18, 20)}-${hash.slice(20, 32)}`;
}

function titleCase(value) {
  return String(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildRecipe(input) {
  const sourceId = `approved-${slug(input.name)}`;
  const secondary = input.optionalIngredients.slice(0, 5);
  const ingredients = [
    ...input.requiredIngredients.map((name) => ({
      name,
      quantity: 1,
      unit: ['egg', 'potato', 'onion', 'tomato'].includes(normalize(name)) ? 'pcs' : 'portion',
      role: 'required',
      isMain: input.coreIngredients.some((core) => normalize(core) === normalize(name)),
    })),
    ...secondary.slice(0, 3)
      .filter((name) => !input.requiredIngredients.some((required) => normalize(required) === normalize(name)))
      .map((name) => ({ name, quantity: 1, unit: 'small', role: 'optional', isMain: false })),
  ];
  const tags = [input.mealType, input.dietType, 'pantry'].filter(Boolean);
  return {
    id: uuidFor(sourceId),
    sourceId,
    title: input.name,
    name: input.name,
    aliases: input.aliases,
    description: `${input.name} is a recognized ${input.cuisine} ${input.dishFamily.replaceAll('-', ' ')} built around ${input.coreIngredients.join(' and ')}.`,
    prepTimeMinutes: input.prepTimeMinutes,
    cookTimeMinutes: input.cookTimeMinutes,
    timeMinutes: input.prepTimeMinutes + input.cookTimeMinutes,
    servings: 2,
    cuisine: input.cuisine,
    dietType: input.dietType,
    difficulty: input.prepTimeMinutes + input.cookTimeMinutes <= 30 ? 'easy' : 'medium',
    imageUrl: input.imageUrl,
    tags,
    moodTags: [],
    lateNight: false,
    lowEffort: false,
    sickDay: false,
    budgetFriendly: false,
    summerCooling: false,
    lightMeal: false,
    onePot: ['pulao', 'poha', 'sweet-rice'].includes(input.dishFamily),
    minimalCleanup: false,
    studySnack: false,
    weekendSpecial: false,
    effortScore: input.prepTimeMinutes + input.cookTimeMinutes <= 30 ? 4 : 6,
    comfortScore: 5,
    energyScore: 5,
    proteinScore: ['egg', 'paneer', 'chicken', 'mutton'].includes(input.baseIngredient) ? 8 : 3,
    nostalgiaScore: 5,
    homeStyleScore: 7,
    rainyDayScore: 4,
    primaryMood: '',
    secondaryMood: '',
    cookingNotes: input.cookingNotes,
    instructions: [
      `Prepare ${input.requiredIngredients.join(', ')} before cooking.`,
      input.cookingNotes,
      `Cook until the ${input.dishFamily.replaceAll('-', ' ')} has the expected texture and the core ingredients are fully done.`,
      `Serve ${input.name} fresh and adjust salt and seasoning to taste.`,
    ],
    ingredients,
    recipe_type: 'core',
    recipeType: 'core',
    primary_ingredient_1: titleCase(input.coreIngredients[0]),
    primary_ingredient_2: titleCase(input.coreIngredients[1] || ''),
    primaryIngredient1: titleCase(input.coreIngredients[0]),
    primaryIngredient2: titleCase(input.coreIngredients[1] || ''),
    secondary_ingredient_1: secondary[0] || null,
    secondaryIngredient1: secondary[0] || null,
    secondary_ingredient_2: secondary[1] || null,
    secondaryIngredient2: secondary[1] || null,
    secondary_ingredient_3: secondary[2] || null,
    secondaryIngredient3: secondary[2] || null,
    secondary_ingredient_4: secondary[3] || null,
    secondaryIngredient4: secondary[3] || null,
    secondary_ingredient_5: secondary[4] || null,
    secondaryIngredient5: secondary[4] || null,
    primaryIngredients: input.coreIngredients,
    baseIngredient: input.baseIngredient,
    base_ingredient: input.baseIngredient,
    coreIngredients: input.coreIngredients,
    core_ingredients: input.coreIngredients,
    requiredIngredients: input.requiredIngredients,
    required_ingredients: input.requiredIngredients,
    optionalIngredients: input.optionalIngredients,
    optional_ingredients: input.optionalIngredients,
    incompatibleWith: [],
    incompatible_with: [],
    dishFamily: input.dishFamily,
    dish_family: input.dishFamily,
    requiredPrimaryMatches: Math.min(2, input.coreIngredients.length),
    required_primary_matches: Math.min(2, input.coreIngredients.length),
    isRealDish: true,
  };
}

const recipes = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
const titleIndex = new Map(recipes.map((recipe) => [normalize(recipe.title), recipe]));
const aliasIndex = new Map(recipes.flatMap((recipe) => (recipe.aliases || []).map((alias) => [normalize(alias), recipe])));
const created = [];
const appliedRecipes = [];

for (const input of approvedRecipes) {
  const recipe = buildRecipe(input);
  const existingIndex = recipes.findIndex((item) => item.sourceId === recipe.sourceId);
  if (existingIndex >= 0) {
    recipes[existingIndex] = recipe;
  } else {
    if (titleIndex.has(normalize(input.name)) || aliasIndex.has(normalize(input.name))) continue;
    recipes.push(recipe);
    created.push(recipe);
  }
  titleIndex.set(normalize(recipe.title), recipe);
  for (const alias of recipe.aliases) aliasIndex.set(normalize(alias), recipe);
  appliedRecipes.push(recipe);
}

const aliasesAdded = [];
for (const update of aliasUpdates) {
  const recipe = titleIndex.get(normalize(update.recipe));
  if (!recipe) throw new Error(`Alias target not found: ${update.recipe}`);
  recipe.aliases = [...new Set([...(recipe.aliases || []), ...update.aliases])];
  aliasesAdded.push({ recipe: recipe.title, aliases: update.aliases });
}

const upma = titleIndex.get(normalize('Upma'));
if (upma) {
  upma.requiredIngredients = ['rava'];
  upma.required_ingredients = ['rava'];
  upma.optionalIngredients = [...new Set([
    ...(upma.optionalIngredients || []),
    'onion',
    'vegetable mix',
  ])];
  upma.optional_ingredients = [...upma.optionalIngredients];
}

const vegFriedRice = titleIndex.get(normalize('Veg Fried Rice'));
if (vegFriedRice) {
  vegFriedRice.aliases = [...new Set([...(vegFriedRice.aliases || []), 'Vegetable Fried Rice'])];
  vegFriedRice.requiredIngredients = ['rice'];
  vegFriedRice.required_ingredients = ['rice'];
  vegFriedRice.optionalIngredients = [...new Set([...(vegFriedRice.optionalIngredients || []), 'capsicum'])];
  vegFriedRice.optional_ingredients = [...vegFriedRice.optionalIngredients];
  vegFriedRice.pantrySupportingIngredients = ['capsicum'];
  vegFriedRice.pantry_supporting_ingredients = ['capsicum'];
}

const chickenFriedRice = titleIndex.get(normalize('Chicken Fried Rice'));
if (chickenFriedRice) {
  chickenFriedRice.pantrySupportingIngredients = ['egg'];
  chickenFriedRice.pantry_supporting_ingredients = ['egg'];
  chickenFriedRice.pantryPartialMissingRequired = ['rice'];
  chickenFriedRice.pantry_partial_missing_required = ['rice'];
}

const json = `${JSON.stringify(recipes, null, 2)}\n`;
fs.writeFileSync(databasePath, json);
fs.writeFileSync(frontendRecipesPath, `window.COOKBUDDY_LOCAL_RECIPES = ${json.trim()};\n`);

fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(createdJsonPath, `${JSON.stringify(appliedRecipes.map((recipe) => ({
  name: recipe.name,
  aliases: recipe.aliases,
  baseIngredient: recipe.baseIngredient,
  coreIngredients: recipe.coreIngredients,
  requiredIngredients: recipe.requiredIngredients,
  optionalIngredients: recipe.optionalIngredients,
  dishFamily: recipe.dishFamily,
  cuisine: recipe.cuisine,
  moodTags: recipe.moodTags,
  isRealDish: recipe.isRealDish,
  cookingNotes: recipe.cookingNotes,
})), null, 2)}\n`);
fs.writeFileSync(aliasesJsonPath, `${JSON.stringify(aliasesAdded, null, 2)}\n`);

console.log(JSON.stringify({
  createdCount: created.length,
  created: appliedRecipes.map((recipe) => recipe.title),
  aliasesAdded,
  databaseCount: recipes.length,
}, null, 2));
