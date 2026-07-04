# Pantry Unused Ingredient Audit

## Rule Verified

Selected ingredients must help a recipe positively only when the recipe uses them.
Selected ingredients that are not used by a recipe now apply a penalty and block Strong Match when a recipe ignores a meaningful portion of the user's pantry selection.

## Targeted Cases

| Selected Ingredients | Result | Strong Match? | Notes |
|---|---|---:|---|
| Wheat Flour + Fish | No strong match | No | Wheat-only recipes such as Plain Chapati and Wheat Dosa are not promoted. |
| Fish + Banana | No strong match | No | Fish-only recipes do not become Strong Match while banana is ignored. |
| Milk + Tamarind | No strong match | No | No single-ingredient or unrelated recipe is forced. |
| Fish + Wheat Flour | No strong match | No | Same behavior as Wheat Flour + Fish, independent of selection order. |

## User-Facing Empty State

No strong match yet. Try adding onion, chilli, garlic, or curry leaves.

## Full Pantry Audit

PASS: 72  
MISSING_RECIPE: 28  
RANKING_IMPROVEMENT: 2  
LOW_CONFIDENCE: 1  
FAIL: 0

