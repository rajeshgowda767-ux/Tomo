# Data Model

This document describes Tomo Beta 3 core entities at the architecture level. Field names may vary slightly between source files; use the audits and active data files as source of truth when making changes.

## Recipe

Represents an active local recipe.

Core fields include:

- `title`
- `sourceId` / slug-like identifier
- `recipeType`
- `cuisine`
- `tags`
- `ingredients`
- `primaryIngredient1`
- `primaryIngredient2`
- `secondaryIngredient1` through `secondaryIngredient5`
- time fields where available
- serving and metadata fields where available
- instructions
- image path or image metadata

Recipes are the target objects for recommendation, collections, pantry matching, pairings, images, and explanations.

## Ingredient Knowledge

Represents structured food knowledge for one ingredient.

Core fields include:

- `canonicalName`
- `aliases`
- `regionalNames`
- `category`
- `pantryRole`
- `bestCookingMethods`
- `worksWellWith`
- `recommendedRecipeFamilies`
- `recipeFamilies`
- `substitutes`
- `substitutions`
- `regionalRelevance`
- `linkedRecipeTitles`
- `linkedRecipeSlugs`
- `relatedIngredients`
- `complements`
- `avoids`
- `regionalStrength`
- `seasonality`
- `flavorGraph`
- `nutritionHighlights`
- `commonTechniques`
- `flavorProfile`
- `ingredientFamilies`

## Collection

Represents a recipe grouping or hub.

Core concepts include:

- main collection hub
- child collection or subcategory
- title
- subtitle
- description
- hero image
- recipe membership
- collection intent
- target range
- balance rules

Collections are validated by the Collections Integrity Audit.

## Pairing

Represents suggested side dishes, accompaniments, drinks, condiments, or compatible foods for a recipe.

Core concepts include:

- recipe identifier
- pairing label
- pairing category
- uniqueness within the recipe
- semantic correctness

Pairing records must avoid duplicates and should remain meaningful to the recipe.

## Pantry Match

Represents how a selected pantry ingredient set maps to recipes.

Core concepts include:

- selected pantry ingredients
- ingredient match strength
- core/support/optional/staple/garnish classification
- recipe-family bridge
- regional boost
- flavor compatibility
- final rank

Pantry Match is validated by Pantry Intelligence V3 audits.

## Relationship Graph

Represents ingredients commonly cooked together.

Core fields include:

- `relatedIngredients`
- `complements`
- `avoids`
- relationship clusters
- reciprocal relationship validation

This graph is broader than flavor. It models practical cooking relationships.

## Flavor Graph

Represents taste compatibility.

Core fields include:

- `primaryFlavors`
- `pairsWellWith`
- `balancesWith`
- `clashesWith`

Flavor pair objects include:

- `ingredient`
- `strength`
- `reason`
- `recipeFamilies`

## Regional Matrix

Represents where ingredients are culturally important.

Core fields include:

- `region`
- `strength`
- `reason`
- `signatureDishes`

Regional strength supports regional discovery, pantry explanations, and recommendation authenticity.

## Seasonal Intelligence

Represents seasonality and weather context.

Core fields include:

- `availability`
- `peakSeasons`
- `secondarySeasons`
- `bestWeather`
- `reason`
- `signatureDishes`

Seasonal data supports Seasonal Picks and Tomo Learns.

## Substitution

Represents a safe ingredient swap.

Core fields include:

- `ingredient`
- `confidence`
- `reason`
- `suitableFor`
- `avoidFor`

Substitutions must be realistic and should not be invented to fill coverage.

## Explainability

Represents deterministic recommendation explanations.

Explanation object:

- `title`
- `confidence`
- `reasons`
- `ingredientReasons`
- `regionalReasons`
- `seasonalReasons`
- `pantryReasons`
- `flavorReasons`
- `substitutionHints`
- `recipeFamilyReasons`

Explainability assembles structured facts from existing systems and does not generate free-form AI text.

## TODO

- Add exact source file paths for each entity once the final repo layout is frozen.
- Add field-level required/optional status if schema validation becomes formal.
