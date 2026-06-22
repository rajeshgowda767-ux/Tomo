import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const databasePath = path.join(root, 'database', 'generated', 'recipes.json');
const browserPaths = [
  path.join(root, 'local-recipes.js'),
  path.join(root, 'frontend', 'local-recipes.js'),
];

const changes = {
  Dosa: {
    include: ['comfort', 'soul'],
  },
  'Masala Dosa': {
    include: ['comfort', 'soul', 'rainy'],
  },
  'Onion Dosa': {
    include: ['comfort', 'soul'],
    exclude: ['spicy'],
  },
  'Paneer Dosa': {
    include: ['comfort', 'protein'],
    exclude: ['soul', 'spicy'],
  },
  'Egg Dosa': {
    include: ['comfort', 'protein'],
    exclude: ['soul', 'spicy'],
  },
  'Onion Uttapam': {
    include: ['comfort'],
    exclude: ['soul', 'spicy'],
  },
  'Tomato Uttapam': {
    include: ['comfort'],
    exclude: ['soul', 'spicy'],
  },
  'Vegetable Uttapam': {
    include: ['comfort'],
    exclude: ['soul'],
  },
  Upma: {
    include: ['soul', 'rainy'],
  },
  Thukpa: {
    include: ['comfort', 'soul'],
    exclude: ['rainy'],
    removeMealTags: ['breakfast'],
    addMealTags: ['lunch', 'dinner'],
    removeTags: ['rainy-day'],
    addTags: ['soul-food'],
    mealType: 'lunch,dinner',
    primaryMood: 'Comfort Food',
    secondaryMood: 'Soul Food',
  },
  'Spicy Masala Dosa': {
    exclude: ['soul'],
  },
  'Kaaram Dosa': {
    exclude: ['soul'],
  },
  'Gunpowder Idli': {
    exclude: ['soul'],
  },
  'Spicy Aloo Paratha': {
    exclude: ['soul'],
  },
  Ladoo: {
    exclude: ['protein'],
  },
  Bonda: {
    exclude: ['protein'],
  },
  'Bread Pakora': {
    exclude: ['protein'],
  },
  Pakora: {
    exclude: ['protein'],
  },
  'Mirchi Bajji': {
    exclude: ['protein'],
  },
  'Mirapakaya Bajji': {
    exclude: ['protein'],
  },
  'Fish Pakora': {
    exclude: ['protein'],
  },
  'Paneer Pakora': {
    exclude: ['protein'],
  },
  'Egg Curry': {
    include: ['protein'],
  },
  'Egg Bhurji': {
    include: ['protein'],
  },
  'Egg Toast': {
    include: ['protein'],
  },
  'Egg Fried Rice': {
    include: ['protein'],
  },
  'Chicken Curry': {
    include: ['protein'],
  },
  'Chicken Fried Rice': {
    include: ['protein'],
  },
  'Chilli Chicken': {
    include: ['protein', 'spicy'],
  },
  'Chicken Stew': {
    include: ['protein'],
  },
  'Chicken Chettinad': {
    include: ['protein', 'spicy'],
  },
  'Fish Curry': {
    include: ['protein'],
  },
  'Fish Fry': {
    include: ['protein'],
  },
  'Paneer Bhurji': {
    include: ['protein'],
  },
  'Palak Paneer': {
    include: ['protein'],
  },
  'Kadai Paneer': {
    include: ['protein'],
  },
  'Matar Paneer': {
    include: ['protein'],
  },
  'Paneer Paratha': {
    include: ['protein'],
  },
  'Chole Chawal': {
    include: ['comfort', 'soul', 'protein'],
  },
  'Rajma Chawal': {
    include: ['comfort', 'soul', 'protein'],
  },
  'Dal Makhani': {
    include: ['comfort', 'protein'],
  },
};

const recipes = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
const updated = [];

for (const [title, change] of Object.entries(changes)) {
  const recipe = recipes.find((item) => item.title === title);
  if (!recipe) throw new Error(`Recipe not found: ${title}`);

  recipe.moodIncludes = [...new Set(change.include || [])];
  recipe.moodExcludes = [...new Set(change.exclude || [])];

  if (change.removeMealTags || change.addMealTags) {
    const remove = new Set(change.removeMealTags || []);
    recipe.tags = [...new Set([
      ...(recipe.tags || []).filter((tag) => !remove.has(tag)),
      ...(change.addMealTags || []),
    ])];
  }
  if (change.removeTags || change.addTags) {
    const remove = new Set(change.removeTags || []);
    recipe.tags = [...new Set([
      ...(recipe.tags || []).filter((tag) => !remove.has(tag)),
      ...(change.addTags || []),
    ])];
  }
  if (change.mealType) {
    recipe.mealType = change.mealType;
    recipe.meal_type = change.mealType;
  }
  if (change.primaryMood !== undefined) recipe.primaryMood = change.primaryMood;
  if (change.secondaryMood !== undefined) recipe.secondaryMood = change.secondaryMood;

  updated.push({
    title,
    moodIncludes: recipe.moodIncludes,
    moodExcludes: recipe.moodExcludes,
    mealType: recipe.mealType || recipe.meal_type || '',
    tags: recipe.tags,
  });
}

const json = `${JSON.stringify(recipes, null, 2)}\n`;
fs.writeFileSync(databasePath, json);
for (const browserPath of browserPaths) {
  fs.writeFileSync(browserPath, `window.COOKBUDDY_LOCAL_RECIPES = ${json.trim()};\n`);
}

console.log(JSON.stringify({ updated }, null, 2));
