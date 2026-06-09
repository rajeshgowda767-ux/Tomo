const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { hashPassword, signToken, verifyPassword, verifyToken } = require('./auth');
const { jsonQuery, oneQuery, runSql } = require('./db');
const { recommendRecipes, scoreRecipe } = require('./recommendationEngine');

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '127.0.0.1';
const frontendDir = path.join(__dirname, '..', 'frontend');
const fallbackRecipesPath = path.join(__dirname, '..', 'database', 'generated', 'recipes.json');
const collectionsPath = path.join(__dirname, '..', 'database', 'generated', 'collections.json');
let fallbackRecipes;
let fallbackRecipesMtime = 0;
let collectionsData;
let collectionsMtime = 0;

function loadFallbackRecipes() {
  const stats = fs.statSync(fallbackRecipesPath);
  if (!fallbackRecipes || stats.mtimeMs !== fallbackRecipesMtime) {
    fallbackRecipes = JSON.parse(fs.readFileSync(fallbackRecipesPath, 'utf8'));
    fallbackRecipesMtime = stats.mtimeMs;
  }
  return fallbackRecipes;
}

function loadCollections() {
  const stats = fs.statSync(collectionsPath);
  if (!collectionsData || stats.mtimeMs !== collectionsMtime) {
    collectionsData = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));
    collectionsMtime = stats.mtimeMs;
  }
  return collectionsData;
}

function collectionSortScore(recipe) {
  return Number(recipe.featured_priority || 0) * 1000
    + Number((recipe.scores || {}).comfort || 0) * 100
    + Number((recipe.scores || {}).homeStyle || 0) * 10
    + Number(recipe.discovery_score || 0);
}

function buildCollectionDetail(collection) {
  const sorted = [...(collection.items || [])].sort((a, b) => collectionSortScore(b) - collectionSortScore(a));
  const groups = new Map();
  for (const recipe of sorted) {
    const key = recipe.subcategory || recipe.subCategory || 'Curated Picks';
    if (!groups.has(key)) {
      groups.set(key, {
        name: key,
        description: recipe.subcategory_description || 'Curated by Tomo for this mood.',
        displayOrder: Number(recipe.display_order || 99),
        recipes: []
      });
    }
    groups.get(key).recipes.push(recipe);
  }
  const subcategories = [...groups.values()].sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name));
  return {
    collection: {
      id: collection.key,
      key: collection.key,
      title: collection.title,
      subtitle: collection.subtitle,
      copy: collection.copy,
      tone: collection.tone,
      icon: collection.icon,
      recipeCount: (collection.items || []).length,
    },
    hero: collection.hero || {
      title: collection.title,
      subtitle: collection.copy,
      recipeCount: (collection.items || []).length,
    },
    featuredRecipes: sorted.slice(0, 3),
    subcategories
  };
}

function filterFallbackRecipes(url) {
  const q = (url.searchParams.get('q') || '').trim().toLowerCase();
  const diet = (url.searchParams.get('diet') || '').trim().toLowerCase();
  return loadFallbackRecipes().filter((recipe) => {
    const haystack = `${recipe.title} ${recipe.description} ${recipe.cuisine} ${recipe.dietType} ${(recipe.tags || []).join(' ')}`.toLowerCase();
    const matchesQuery = !q || haystack.includes(q);
    const matchesDiet = !diet || String(recipe.dietType).toLowerCase() === diet;
    const isCore = String(recipe.recipeType || recipe.recipe_type || 'core').toLowerCase() === 'core';
    return isCore && matchesQuery && matchesDiet;
  });
}

function recommendationContextFromUrl(url, limit) {
  const selectedIngredients = (url.searchParams.get('ingredients') || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return {
    selectedMood: url.searchParams.get('mood') || undefined,
    currentTime: url.searchParams.get('time') || undefined,
    selectedIngredients,
    weather: url.searchParams.get('weather') || undefined,
    energyState: url.searchParams.get('energy') || undefined,
    limit,
  };
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization'
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy();
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
  });
}

function getUser(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  return verifyToken(token);
}

function requireUser(req, res) {
  const user = getUser(req);
  if (!user) {
    sendJson(res, 401, { error: 'Please log in first.' });
    return null;
  }
  return user;
}

async function handleApi(req, res, url) {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  try {
    if (url.pathname === '/api/health') {
      sendJson(res, 200, { ok: true, app: 'CookBuddy API' });
      return;
    }

    if (url.pathname === '/api/collections' && req.method === 'GET') {
      sendJson(res, 200, loadCollections());
      return;
    }

    const collectionMatch = url.pathname.match(/^\/(?:api\/)?collections\/([^/]+)$/)
      || url.pathname.match(/^\/api\/collection\/([^/]+)$/);
    if (collectionMatch && req.method === 'GET') {
      const id = decodeURIComponent(collectionMatch[1]);
      const data = loadCollections();
      const collection = (data.collections || []).find((item) => item.key === id || item.id === id);
      if (!collection) {
        sendJson(res, 404, { error: 'Collection not found.' });
        return;
      }
      sendJson(res, 200, buildCollectionDetail(collection));
      return;
    }

    if (url.pathname === '/api/auth/register' && req.method === 'POST') {
      const body = await parseBody(req);
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      if (!name || !email || password.length < 6) {
        sendJson(res, 400, { error: 'Name, email, and a 6 character password are required.' });
        return;
      }
      const passwordHash = hashPassword(password);
      const user = await oneQuery(
        `
        SELECT id, name, email
        FROM (
          INSERT INTO users (name, email, password_hash)
          VALUES (
            (SELECT args->>0 FROM input),
            (SELECT args->>1 FROM input),
            (SELECT args->>2 FROM input)
          )
          RETURNING id, name, email
        ) created_user
        `,
        [name, email, passwordHash]
      );
      await runSql(
        `
        INSERT INTO user_profiles (user_id)
        VALUES ((SELECT args->>0 FROM input)::uuid)
        ON CONFLICT (user_id) DO NOTHING;
        SELECT '[]'::jsonb;
        `,
        [user.id]
      );
      sendJson(res, 201, { user, token: signToken({ sub: user.id, email: user.email }) });
      return;
    }

    if (url.pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      const user = await oneQuery(
        `
        SELECT id, name, email, password_hash AS "passwordHash"
        FROM users
        WHERE email = (SELECT args->>0 FROM input)
        LIMIT 1
        `,
        [email]
      );
      if (!user || !verifyPassword(password, user.passwordHash)) {
        sendJson(res, 401, { error: 'Invalid email or password.' });
        return;
      }
      delete user.passwordHash;
      sendJson(res, 200, { user, token: signToken({ sub: user.id, email: user.email }) });
      return;
    }

    if (url.pathname === '/api/me' && req.method === 'GET') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const user = await oneQuery(
        `
        SELECT users.id, users.name, users.email, user_profiles.diet_type AS "dietType",
          user_profiles.allergies, user_profiles.cuisine_preferences AS "cuisinePreferences",
          user_profiles.cooking_skill AS "cookingSkill", user_profiles.budget_level AS "budgetLevel"
        FROM users
        JOIN user_profiles ON user_profiles.user_id = users.id
        WHERE users.id = (SELECT args->>0 FROM input)::uuid
        `,
        [authUser.sub]
      );
      sendJson(res, 200, { user });
      return;
    }

    if ((url.pathname === '/api/recipes' || url.pathname === '/api/recommendations') && req.method === 'GET') {
      const isRecommendations = url.pathname === '/api/recommendations';
      if (!process.env.DATABASE_URL) {
        const fallbackRecipes = filterFallbackRecipes(url);
        const recipes = isRecommendations
          ? recommendRecipes(fallbackRecipes, recommendationContextFromUrl(url, 6))
          : fallbackRecipes;
        sendJson(res, 200, { recipes, source: 'mapping-review-fallback' });
        return;
      }

      const q = url.searchParams.get('q') || '';
      const diet = url.searchParams.get('diet') || '';
      const recipes = await jsonQuery(
        `
        SELECT recipes.id, recipes.title, recipes.description,
          recipes.instructions,
          recipes.prep_time_minutes AS "prepTimeMinutes",
          recipes.cook_time_minutes AS "cookTimeMinutes",
          recipes.servings, recipes.cuisine, recipes.diet_type AS "dietType",
          recipes.difficulty, recipes.image_url AS "imageUrl",
          recipes.recipe_type AS "recipeType",
          recipes.primary_ingredient_1 AS "primaryIngredient1",
          recipes.primary_ingredient_2 AS "primaryIngredient2",
          recipes.primary_ingredient_3 AS "primaryIngredient3",
          recipes.secondary_ingredient_1 AS "secondaryIngredient1",
          recipes.secondary_ingredient_2 AS "secondaryIngredient2",
          recipes.secondary_ingredient_3 AS "secondaryIngredient3",
          recipes.secondary_ingredient_4 AS "secondaryIngredient4",
          recipes.secondary_ingredient_5 AS "secondaryIngredient5",
          recipes.emotional_state AS "emotionalState",
          recipes.comfort_score AS "comfortScore",
          recipes.soul_food_score AS "soulFoodScore",
          recipes.rainy_day_score AS "rainyDayScore",
          recipes.protein_score AS "proteinScore",
          recipes.nostalgia_score AS "nostalgiaScore",
          recipes.stomach_feel AS "stomachFeel",
          recipes.best_time AS "bestTime",
          recipes.best_day AS "bestDay",
          recipes.tomo_line AS "tomoLine",
          recipes.home_style_score AS "homeStyleScore",
          recipes.minimum_match_threshold AS "minimumMatchThreshold",
          recipes.minimum_primary_matches AS "minimumPrimaryMatches",
          recipes.late_night AS "lateNight",
          recipes.low_effort AS "lowEffort",
          recipes.sick_day AS "sickDay",
          recipes.budget_friendly AS "budgetFriendly",
          recipes.summer_cooling AS "summerCooling",
          recipes.light_meal AS "lightMeal",
          recipes.one_pot AS "onePot",
          recipes.minimal_cleanup AS "minimalCleanup",
          recipes.study_snack AS "studySnack",
          recipes.weekend_special AS "weekendSpecial",
          recipes.school_lunch AS "schoolLunch",
          recipes.lunchbox_friendly AS "lunchboxFriendly",
          recipes.mess_free AS "messFree",
          recipes.eats_well_cold AS "eatsWellCold",
          recipes.kid_favorite AS "kidFavorite",
          recipes.protein_for_kids AS "proteinForKids",
          recipes.travel_friendly AS "travelFriendly",
          recipes.effort_score AS "effortScore",
          recipes.energy_score AS "energyScore",
          COALESCE(jsonb_agg(DISTINCT jsonb_build_object('name', ingredients.name, 'quantity', recipe_ingredients.quantity, 'unit', recipe_ingredients.unit, 'role', recipe_ingredients.role, 'isMain', recipe_ingredients.is_main))
            FILTER (WHERE ingredients.id IS NOT NULL), '[]'::jsonb) AS ingredients
          ,
          COALESCE(jsonb_agg(DISTINCT jsonb_build_object('ingredientId', recipe_ingredient_weights.ingredient_id, 'ingredientName', recipe_ingredient_weights.ingredient_name, 'weight', recipe_ingredient_weights.weight, 'isPrimary', recipe_ingredient_weights.is_primary))
            FILTER (WHERE recipe_ingredient_weights.id IS NOT NULL), '[]'::jsonb) AS "ingredientWeights",
          COALESCE(jsonb_agg(DISTINCT recipe_tags.tag)
            FILTER (WHERE recipe_tags.tag IS NOT NULL), '[]'::jsonb) AS tags
        FROM recipes
        LEFT JOIN recipe_ingredients ON recipe_ingredients.recipe_id = recipes.id
        LEFT JOIN ingredients ON ingredients.id = recipe_ingredients.ingredient_id
        LEFT JOIN recipe_ingredient_weights ON recipe_ingredient_weights.recipe_id = recipes.id
        LEFT JOIN recipe_tags ON recipe_tags.recipe_id = recipes.id
        WHERE recipes.recipe_type = 'core'
          AND ((SELECT args->>0 FROM input) = '' OR recipes.title ILIKE '%' || (SELECT args->>0 FROM input) || '%' OR recipes.description ILIKE '%' || (SELECT args->>0 FROM input) || '%')
          AND ((SELECT args->>1 FROM input) = '' OR recipes.diet_type = (SELECT args->>1 FROM input))
        GROUP BY recipes.id
        ORDER BY recipes.created_at DESC
        `,
        [q, diet]
      );
      const context = recommendationContextFromUrl(url, isRecommendations ? 6 : recipes.length);
      const scoredRecipes = isRecommendations
        ? recommendRecipes(recipes, context)
        : recipes.map((recipe) => scoreRecipe(recipe, context));
      sendJson(res, 200, { recipes: scoredRecipes });
      return;
    }

    if (url.pathname === '/api/journal' && req.method === 'GET') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const entries = await jsonQuery(
        `
        SELECT id, recipe_id AS "recipeId", recipe_name AS "recipeName", image_url AS "imageUrl",
          cooked_at AS "cookedAt", rating, notes, created_at AS "createdAt"
        FROM user_cooking_history
        WHERE user_id = (SELECT args->>0 FROM input)::uuid
        ORDER BY cooked_at DESC
        LIMIT 100
        `,
        [authUser.sub]
      );
      sendJson(res, 200, { entries });
      return;
    }

    if (url.pathname === '/api/journal' && req.method === 'POST') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const body = await parseBody(req);
      const entry = await oneQuery(
        `
        INSERT INTO user_cooking_history (user_id, recipe_id, recipe_name, image_url, cooked_at, rating, notes)
        VALUES (
          (SELECT args->>0 FROM input)::uuid,
          NULLIF((SELECT args->>1 FROM input), '')::uuid,
          (SELECT args->>2 FROM input),
          NULLIF((SELECT args->>3 FROM input), ''),
          COALESCE(NULLIF((SELECT args->>4 FROM input), '')::timestamptz, now()),
          NULLIF((SELECT args->>5 FROM input), '')::integer,
          NULLIF((SELECT args->>6 FROM input), '')
        )
        RETURNING id, recipe_id AS "recipeId", recipe_name AS "recipeName", image_url AS "imageUrl", cooked_at AS "cookedAt", rating, notes
        `,
        [authUser.sub, body.recipeId || '', body.recipeName || '', body.imageUrl || '', body.cookedAt || '', body.rating || '', body.notes || '']
      );
      sendJson(res, 201, { entry });
      return;
    }

    if (url.pathname === '/api/interactions' && req.method === 'GET') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const interactions = await jsonQuery(
        `
        SELECT recipe_id AS "recipeId", view_count AS "viewCount", save_count AS "saveCount",
          cook_count AS "cookCount", last_viewed_at AS "lastViewedAt",
          last_saved_at AS "lastSavedAt", last_cooked_at AS "lastCookedAt",
          ((view_count * 1) + (save_count * 3) + (cook_count * 5)) AS "userPreferenceScore"
        FROM user_recipe_interactions
        WHERE user_id = (SELECT args->>0 FROM input)::uuid
        ORDER BY updated_at DESC
        `,
        [authUser.sub]
      );
      sendJson(res, 200, { interactions });
      return;
    }

    if (url.pathname === '/api/interactions' && req.method === 'POST') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const body = await parseBody(req);
      const action = String(body.action || '').trim();
      if (!['view', 'save', 'cook'].includes(action) || !body.recipeId) {
        sendJson(res, 400, { error: 'Recipe id and interaction action are required.' });
        return;
      }
      const interaction = await oneQuery(
        `
        INSERT INTO user_recipe_interactions (
          user_id, recipe_id, view_count, save_count, cook_count,
          last_viewed_at, last_saved_at, last_cooked_at
        )
        VALUES (
          (SELECT args->>0 FROM input)::uuid,
          (SELECT args->>1 FROM input)::uuid,
          CASE WHEN (SELECT args->>2 FROM input) = 'view' THEN 1 ELSE 0 END,
          CASE WHEN (SELECT args->>2 FROM input) = 'save' THEN 1 ELSE 0 END,
          CASE WHEN (SELECT args->>2 FROM input) = 'cook' THEN 1 ELSE 0 END,
          CASE WHEN (SELECT args->>2 FROM input) = 'view' THEN now() ELSE NULL END,
          CASE WHEN (SELECT args->>2 FROM input) = 'save' THEN now() ELSE NULL END,
          CASE WHEN (SELECT args->>2 FROM input) = 'cook' THEN now() ELSE NULL END
        )
        ON CONFLICT (user_id, recipe_id)
        DO UPDATE SET
          view_count = user_recipe_interactions.view_count + CASE WHEN (SELECT args->>2 FROM input) = 'view' THEN 1 ELSE 0 END,
          save_count = user_recipe_interactions.save_count + CASE WHEN (SELECT args->>2 FROM input) = 'save' THEN 1 ELSE 0 END,
          cook_count = user_recipe_interactions.cook_count + CASE WHEN (SELECT args->>2 FROM input) = 'cook' THEN 1 ELSE 0 END,
          last_viewed_at = CASE WHEN (SELECT args->>2 FROM input) = 'view' THEN now() ELSE user_recipe_interactions.last_viewed_at END,
          last_saved_at = CASE WHEN (SELECT args->>2 FROM input) = 'save' THEN now() ELSE user_recipe_interactions.last_saved_at END,
          last_cooked_at = CASE WHEN (SELECT args->>2 FROM input) = 'cook' THEN now() ELSE user_recipe_interactions.last_cooked_at END,
          updated_at = now()
        RETURNING recipe_id AS "recipeId", view_count AS "viewCount", save_count AS "saveCount",
          cook_count AS "cookCount", last_viewed_at AS "lastViewedAt",
          last_saved_at AS "lastSavedAt", last_cooked_at AS "lastCookedAt",
          ((view_count * 1) + (save_count * 3) + (cook_count * 5)) AS "userPreferenceScore"
        `,
        [authUser.sub, body.recipeId, action]
      );
      sendJson(res, 200, { interaction });
      return;
    }

    if (url.pathname === '/api/pantry' && req.method === 'GET') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const items = await jsonQuery(
        `
        SELECT pantry_items.id, ingredients.name, ingredients.category,
          pantry_items.quantity, pantry_items.unit,
          pantry_items.expiry_date AS "expiryDate"
        FROM pantry_items
        JOIN ingredients ON ingredients.id = pantry_items.ingredient_id
        WHERE pantry_items.user_id = (SELECT args->>0 FROM input)::uuid
        ORDER BY pantry_items.expiry_date NULLS LAST, ingredients.name
        `,
        [authUser.sub]
      );
      sendJson(res, 200, { items });
      return;
    }

    if (url.pathname === '/api/pantry' && req.method === 'POST') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const body = await parseBody(req);
      const name = String(body.name || '').trim().toLowerCase();
      const quantity = Number(body.quantity || 1);
      const unit = String(body.unit || 'pcs').trim();
      const expiryDate = body.expiryDate || null;
      const item = await oneQuery(
        `
        WITH ingredient AS (
          INSERT INTO ingredients (name, default_unit)
          VALUES ((SELECT args->>1 FROM input), (SELECT args->>3 FROM input))
          ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
          RETURNING id
        )
        INSERT INTO pantry_items (user_id, ingredient_id, quantity, unit, expiry_date)
        SELECT (SELECT args->>0 FROM input)::uuid, ingredient.id,
          (SELECT args->>2 FROM input)::numeric,
          (SELECT args->>3 FROM input),
          NULLIF((SELECT args->>4 FROM input), '')::date
        FROM ingredient
        ON CONFLICT (user_id, ingredient_id)
        DO UPDATE SET quantity = EXCLUDED.quantity, unit = EXCLUDED.unit, expiry_date = EXCLUDED.expiry_date, updated_at = now()
        RETURNING id, quantity, unit, expiry_date AS "expiryDate"
        `,
        [authUser.sub, name, quantity, unit, expiryDate]
      );
      sendJson(res, 201, { item });
      return;
    }

    if (url.pathname === '/api/meal-plan' && req.method === 'GET') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const items = await jsonQuery(
        `
        SELECT meal_plan_items.id, meal_plan_items.meal_date AS "mealDate",
          meal_plan_items.meal_type AS "mealType", recipes.id AS "recipeId",
          recipes.title, recipes.image_url AS "imageUrl"
        FROM meal_plans
        JOIN meal_plan_items ON meal_plan_items.meal_plan_id = meal_plans.id
        JOIN recipes ON recipes.id = meal_plan_items.recipe_id
        WHERE meal_plans.user_id = (SELECT args->>0 FROM input)::uuid
          AND meal_plans.week_start_date = date_trunc('week', now())::date
        ORDER BY meal_plan_items.meal_date, meal_plan_items.meal_type
        `,
        [authUser.sub]
      );
      sendJson(res, 200, { items });
      return;
    }

    if (url.pathname === '/api/meal-plan' && req.method === 'POST') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const body = await parseBody(req);
      const item = await oneQuery(
        `
        WITH plan AS (
          INSERT INTO meal_plans (user_id, week_start_date)
          VALUES ((SELECT args->>0 FROM input)::uuid, date_trunc('week', now())::date)
          ON CONFLICT (user_id, week_start_date) DO UPDATE SET week_start_date = EXCLUDED.week_start_date
          RETURNING id
        )
        INSERT INTO meal_plan_items (meal_plan_id, recipe_id, meal_date, meal_type)
        SELECT plan.id, (SELECT args->>1 FROM input)::uuid,
          (SELECT args->>2 FROM input)::date,
          (SELECT args->>3 FROM input)
        FROM plan
        ON CONFLICT (meal_plan_id, meal_date, meal_type)
        DO UPDATE SET recipe_id = EXCLUDED.recipe_id
        RETURNING id, meal_date AS "mealDate", meal_type AS "mealType", recipe_id AS "recipeId"
        `,
        [authUser.sub, body.recipeId, body.mealDate, body.mealType]
      );
      sendJson(res, 201, { item });
      return;
    }

    if (url.pathname === '/api/shopping-list/generate' && req.method === 'POST') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const list = await oneQuery(
        `
        WITH current_plan AS (
          SELECT id FROM meal_plans
          WHERE user_id = (SELECT args->>0 FROM input)::uuid
          ORDER BY week_start_date DESC
          LIMIT 1
        ), created_list AS (
          INSERT INTO shopping_lists (user_id, meal_plan_id)
          SELECT (SELECT args->>0 FROM input)::uuid, id FROM current_plan
          RETURNING id
        ), inserted AS (
          INSERT INTO shopping_list_items (shopping_list_id, ingredient_id, quantity, unit)
          SELECT created_list.id, recipe_ingredients.ingredient_id, SUM(recipe_ingredients.quantity), recipe_ingredients.unit
          FROM created_list
          JOIN current_plan ON true
          JOIN meal_plan_items ON meal_plan_items.meal_plan_id = current_plan.id
          JOIN recipe_ingredients ON recipe_ingredients.recipe_id = meal_plan_items.recipe_id
          GROUP BY created_list.id, recipe_ingredients.ingredient_id, recipe_ingredients.unit
          RETURNING shopping_list_id
        )
        SELECT id FROM created_list
        `,
        [authUser.sub]
      );
      sendJson(res, 201, { list });
      return;
    }

    if (url.pathname === '/api/shopping-list' && req.method === 'GET') {
      const authUser = requireUser(req, res);
      if (!authUser) return;
      const items = await jsonQuery(
        `
        SELECT shopping_list_items.id, ingredients.name, shopping_list_items.quantity,
          shopping_list_items.unit, shopping_list_items.is_bought AS "isBought"
        FROM shopping_lists
        JOIN shopping_list_items ON shopping_list_items.shopping_list_id = shopping_lists.id
        JOIN ingredients ON ingredients.id = shopping_list_items.ingredient_id
        WHERE shopping_lists.user_id = (SELECT args->>0 FROM input)::uuid
        ORDER BY shopping_lists.created_at DESC, ingredients.name
        LIMIT 50
        `,
        [authUser.sub]
      );
      sendJson(res, 200, { items });
      return;
    }

    sendJson(res, 404, { error: 'API route not found.' });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

function serveStatic(req, res, url) {
  const requested = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.normalize(path.join(frontendDir, requested));
  if (!filePath.startsWith(frontendDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(frontendDir, 'index.html'), (indexError, indexData) => {
        if (indexError) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexData);
      });
      return;
    }

    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp'
    };
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/collections/')) {
    handleApi(req, res, url);
    return;
  }
  serveStatic(req, res, url);
});

server.listen(port, host, () => {
  console.log(`CookBuddy is running at http://${host}:${port}`);
});
