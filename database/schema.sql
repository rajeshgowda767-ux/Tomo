CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  diet_type TEXT DEFAULT 'balanced',
  allergies TEXT[] DEFAULT '{}',
  cuisine_preferences TEXT[] DEFAULT '{}',
  cooking_skill TEXT DEFAULT 'beginner',
  budget_level TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'general',
  default_unit TEXT NOT NULL DEFAULT 'g'
);

CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT[] NOT NULL DEFAULT '{}',
  prep_time_minutes INT NOT NULL DEFAULT 10,
  cook_time_minutes INT NOT NULL DEFAULT 20,
  servings INT NOT NULL DEFAULT 2,
  cuisine TEXT NOT NULL DEFAULT 'global',
  diet_type TEXT NOT NULL DEFAULT 'balanced',
  difficulty TEXT NOT NULL DEFAULT 'easy',
  image_url TEXT,
  source_id TEXT UNIQUE,
  recipe_type TEXT NOT NULL DEFAULT 'core',
  primary_ingredient_1 TEXT,
  primary_ingredient_2 TEXT,
  secondary_ingredient_1 TEXT,
  secondary_ingredient_2 TEXT,
  secondary_ingredient_3 TEXT,
  secondary_ingredient_4 TEXT,
  secondary_ingredient_5 TEXT,
  emotional_state TEXT,
  late_night BOOLEAN NOT NULL DEFAULT false,
  low_effort BOOLEAN NOT NULL DEFAULT false,
  sick_day BOOLEAN NOT NULL DEFAULT false,
  budget_friendly BOOLEAN NOT NULL DEFAULT false,
  summer_cooling BOOLEAN NOT NULL DEFAULT false,
  light_meal BOOLEAN NOT NULL DEFAULT false,
  one_pot BOOLEAN NOT NULL DEFAULT false,
  minimal_cleanup BOOLEAN NOT NULL DEFAULT false,
  study_snack BOOLEAN NOT NULL DEFAULT false,
  weekend_special BOOLEAN NOT NULL DEFAULT false,
  school_lunch BOOLEAN NOT NULL DEFAULT false,
  lunchbox_friendly BOOLEAN NOT NULL DEFAULT false,
  mess_free BOOLEAN NOT NULL DEFAULT false,
  eats_well_cold BOOLEAN NOT NULL DEFAULT false,
  kid_favorite BOOLEAN NOT NULL DEFAULT false,
  protein_for_kids BOOLEAN NOT NULL DEFAULT false,
  travel_friendly BOOLEAN NOT NULL DEFAULT false,
  effort_score INTEGER NOT NULL DEFAULT 5,
  comfort_score INTEGER NOT NULL DEFAULT 5,
  energy_score INTEGER NOT NULL DEFAULT 5,
  soul_food_score INTEGER,
  rainy_day_score INTEGER,
  protein_score INTEGER,
  nostalgia_score INTEGER,
  stomach_feel TEXT,
  best_time TEXT,
  best_day TEXT,
  tomo_line TEXT,
  home_style_score NUMERIC(4, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE recipes
  ADD COLUMN IF NOT EXISTS emotional_state TEXT,
  ADD COLUMN IF NOT EXISTS recipe_type TEXT NOT NULL DEFAULT 'core',
  ADD COLUMN IF NOT EXISTS primary_ingredient_1 TEXT,
  ADD COLUMN IF NOT EXISTS primary_ingredient_2 TEXT,
  ADD COLUMN IF NOT EXISTS secondary_ingredient_1 TEXT,
  ADD COLUMN IF NOT EXISTS secondary_ingredient_2 TEXT,
  ADD COLUMN IF NOT EXISTS secondary_ingredient_3 TEXT,
  ADD COLUMN IF NOT EXISTS secondary_ingredient_4 TEXT,
  ADD COLUMN IF NOT EXISTS secondary_ingredient_5 TEXT,
  ADD COLUMN IF NOT EXISTS late_night BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS low_effort BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sick_day BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS budget_friendly BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS summer_cooling BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS light_meal BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS one_pot BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS minimal_cleanup BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS study_snack BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS weekend_special BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS school_lunch BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS lunchbox_friendly BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS mess_free BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS eats_well_cold BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS kid_favorite BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS protein_for_kids BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS travel_friendly BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS effort_score INTEGER NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS energy_score INTEGER NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS comfort_score INTEGER NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS soul_food_score INTEGER,
  ADD COLUMN IF NOT EXISTS rainy_day_score INTEGER,
  ADD COLUMN IF NOT EXISTS protein_score INTEGER,
  ADD COLUMN IF NOT EXISTS nostalgia_score INTEGER,
  ADD COLUMN IF NOT EXISTS stomach_feel TEXT,
  ADD COLUMN IF NOT EXISTS best_time TEXT,
  ADD COLUMN IF NOT EXISTS best_day TEXT,
  ADD COLUMN IF NOT EXISTS tomo_line TEXT,
  ADD COLUMN IF NOT EXISTS home_style_score INTEGER;

ALTER TABLE recipes
  ALTER COLUMN comfort_score TYPE INTEGER USING COALESCE(ROUND(comfort_score), 5)::integer,
  ALTER COLUMN comfort_score SET DEFAULT 5,
  ALTER COLUMN comfort_score SET NOT NULL,
  ALTER COLUMN soul_food_score TYPE INTEGER USING ROUND(soul_food_score)::integer,
  ALTER COLUMN rainy_day_score TYPE INTEGER USING ROUND(rainy_day_score)::integer,
  ALTER COLUMN protein_score TYPE INTEGER USING ROUND(protein_score)::integer,
  ALTER COLUMN nostalgia_score TYPE INTEGER USING ROUND(nostalgia_score)::integer,
  ALTER COLUMN home_style_score TYPE INTEGER USING ROUND(home_style_score)::integer;

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
  quantity NUMERIC(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'required',
  is_main BOOLEAN NOT NULL DEFAULT false,
  match_weight NUMERIC(4, 2) NOT NULL DEFAULT 1,
  UNIQUE(recipe_id, ingredient_id)
);

CREATE TABLE IF NOT EXISTS recipe_ingredient_weights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
  ingredient_name TEXT NOT NULL,
  weight INTEGER NOT NULL CHECK (weight >= 0),
  is_primary BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(recipe_id, ingredient_name)
);

CREATE TABLE IF NOT EXISTS recipe_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  tag_type TEXT NOT NULL DEFAULT 'attribute',
  UNIQUE(recipe_id, tag)
);

CREATE TABLE IF NOT EXISTS recipe_pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  paired_recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
  pairing_message TEXT NOT NULL,
  pairing_strength NUMERIC(4, 2) NOT NULL DEFAULT 0.85
);

CREATE TABLE IF NOT EXISTS ingredient_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  alias_name TEXT NOT NULL,
  UNIQUE(ingredient_id, alias_name)
);

CREATE TABLE IF NOT EXISTS saved_recipes (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY(user_id, recipe_id)
);

CREATE TABLE IF NOT EXISTS user_cooking_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  family_id UUID,
  recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
  recipe_name TEXT NOT NULL,
  image_url TEXT,
  cooked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_cooking_history_user_cooked_at
  ON user_cooking_history(user_id, cooked_at DESC);

CREATE TABLE IF NOT EXISTS user_recipe_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  view_count INTEGER NOT NULL DEFAULT 0,
  save_count INTEGER NOT NULL DEFAULT 0,
  cook_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  last_saved_at TIMESTAMPTZ,
  last_cooked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

CREATE INDEX IF NOT EXISTS idx_user_recipe_interactions_user_recipe
  ON user_recipe_interactions(user_id, recipe_id);

CREATE TABLE IF NOT EXISTS pantry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
  quantity NUMERIC(10, 2) NOT NULL DEFAULT 1,
  unit TEXT NOT NULL,
  expiry_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, ingredient_id)
);

CREATE TABLE IF NOT EXISTS meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start_date)
);

CREATE TABLE IF NOT EXISTS meal_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  meal_date DATE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  UNIQUE(meal_plan_id, meal_date, meal_type)
);

CREATE TABLE IF NOT EXISTS shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shopping_list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopping_list_id UUID NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
  quantity NUMERIC(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  is_bought BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS grocery_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ingredient_name TEXT NOT NULL,
  source_recipe TEXT,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recipes_search ON recipes USING gin (
  to_tsvector('english', title || ' ' || description || ' ' || cuisine || ' ' || diet_type)
);

CREATE INDEX IF NOT EXISTS idx_pantry_user ON pantry_items(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_week ON meal_plans(user_id, week_start_date);
CREATE INDEX IF NOT EXISTS idx_grocery_notes_user_completed ON grocery_notes(user_id, is_completed, created_at DESC);
