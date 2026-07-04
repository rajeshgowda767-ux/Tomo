# Ingredient Knowledge Platform

The Ingredient Knowledge Platform is the structured food knowledge layer for Tomo.

## Fields

### canonicalName

The primary normalized ingredient name.

### aliases

Common alternate names, market names, English names, and spelling variants.

### regionalNames

Language or region-specific names.

### category

Ingredient category such as seafood, pulses, rice, millets, greens, dairy, oil, spice, or vegetable.

### pantryRole

How the ingredient behaves in pantry logic: core, support, or flavor.

### recipeFamilies

Recipe families where the ingredient naturally belongs.

### recommendedRecipeFamilies

Families that should be boosted when the ingredient appears in pantry or recommendation context.

### relatedIngredients

Ingredients commonly cooked together.

### complements

Ingredients that improve the flavor or cooking result.

### avoids

Rarely used. Only filled when an avoidance rule is clearly useful.

### flavorGraph

Structured taste compatibility:

- `primaryFlavors`
- `pairsWellWith`
- `balancesWith`
- `clashesWith`

### regionalStrength

Regional importance:

- `region`
- `strength`
- `reason`
- `signatureDishes`

### seasonality

Season context:

- `availability`
- `peakSeasons`
- `secondarySeasons`
- `bestWeather`
- `reason`
- `signatureDishes`

### substitutions

Structured substitution rules:

- `ingredient`
- `confidence`
- `reason`
- `suitableFor`
- `avoidFor`

### nutritionHighlights

Nutritional facts useful for discovery and recommendations.

### commonTechniques

Typical cooking techniques such as tempering, pressure cook, roast, steam, simmer, stir fry, or deep fry.

### flavorProfile

General flavor descriptors such as sour, sweet, earthy, nutty, creamy, umami, fresh, smoky, or pungent.

### ingredientFamilies

Higher-level culinary groups such as Coastal Cooking, South Indian, Breakfast, Rice Dishes, Soups, Chutneys, Curries, and Festival Sweets.

### linkedRecipeTitles

Human-readable active recipe titles where available.

### linkedRecipeSlugs

Active local recipe identifiers. These must reference real active recipes.
