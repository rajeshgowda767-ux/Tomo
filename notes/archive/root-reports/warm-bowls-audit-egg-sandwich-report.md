# Warm Bowls Audit + Egg Sandwich Update

Scope:
- Warm Bowls audit was read-only.
- Egg Sandwich update was mobile UI/data only.
- Desktop UI, desktop routes, desktop styling, recommendation logic, and pantry logic were not modified.

## Part 1: Warm Bowls Rendering Audit

Collection: Warm Bowls

### Configured Collection Counts

From collection config:

| Subcategory | Assigned Count |
|---|---:|
| Comfort Soups | 19 |
| Regional Soups | 4 |
| Rainy Day Soups | 3 |
| Protein Soups | 4 |

Total assigned: 30

### Mobile Rendered Counts

From mobile UI:

| Subcategory | Rendered Count |
|---|---:|
| Comfort Soups | 1 |
| Regional Soups | 1 |
| Rainy Day Soups | 2 |
| Protein Soups | 1 |

Total rendered: 5

### Rendered Dish Lists

Comfort Soups:
- Manchow Soup

Regional Soups:
- Tomato Rasam

Rainy Day Soups:
- Corn Soup
- Tomato Soup

Protein Soups:
- Chicken Soup

### Diversity Filtering Applied

Yes.

Warm Bowls is not listed in the mobile curated-full collection bypass.

Current curated-full bypass includes:
- Sides & Add-ons
- Lunch Box Heroes
- Power Plates
- Sips & Soothers

It does not include:
- Warm Bowls

### Collection-Specific Limits Applied

No explicit Warm Bowls-specific count limit was found.

The count reduction happens through general collection rendering logic.

### Deduplication Removing Dishes

Yes, indirectly.

The mobile collection renderer calls `browseDiverseRecipes()` for Warm Bowls. That function keeps only one item per dish family.

### Family-Grouping Logic Collapsing Soups

Yes.

Most soup dishes resolve to the same `dishFamily` value: `soup`.

Because `browseDiverseRecipes()` tracks `usedFamilies`, it removes additional dishes with the same family. This collapses most soup entries within each subcategory.

### Exact Code Path Responsible

Responsible path:

1. `collectionDetail(collection)` builds the subcategory groups.
2. `collectionResults(group)` renders the active subcategory.
3. Since `soups` is not in `curatedFullCollections`, it calls `browseDiverseRecipes(group.recipes)`.
4. `browseDiverseRecipes()` removes items with already-used families.
5. `dishFamily()` classifies most soup titles as `soup`.

Relevant file:
- `frontend/mobile/mobile-shell.js`

Relevant functions:
- `dishFamily()`
- `browseDiverseRecipes()`
- `collectionDetail()`
- `collectionResults()`

Observed line area during audit:
- `browseDiverseRecipes()` around line 1710
- `collectionDetail()` around line 1991
- `collectionResults()` around line 2753

### Warm Bowls Audit Conclusion

Rendered count differs from assigned count because Warm Bowls is being passed through mobile diversity filtering. This is not a data/config count issue.

No Warm Bowls fix was applied in this pass.

## Part 2: Egg Sandwich Update

Goal:
- Add one new recipe: Egg Sandwich
- Add it to Lunch Box Heroes > Protein Packed
- Bring Protein Packed count to 8

### Recipe Added

Egg Sandwich was added to:
- `database/generated/recipes.json`
- `local-recipes.js`
- `frontend/local-recipes.js`

Recipe metadata:
- Diet: Non-Veg
- Image: `/assets/images/snacks/sandwich.png`
- Time: 18 min
- Difficulty: Easy
- Description: A quick egg sandwich with soft bread, simple seasoning and enough protein for a filling lunchbox bite.

Quick guide includes:
- Basic ingredients
- 5 steps
- Tomo tip
- Pairings

No new image was generated.

### Final Lunch Box Heroes > Protein Packed

Count: 8

- Paneer Roll
- Egg Roll
- Paneer Bhurji Wrap
- Egg Fried Rice
- Egg Sandwich
- Moong Dal Cheela
- Cheese Veg Sandwich
- Chicken Roll

### Validation

Mobile UI validation:
- Lunch Box Heroes opens.
- Protein Packed renders 8 dishes.
- Egg Sandwich appears in Protein Packed.
- Egg Sandwich opens in Dish Detail.
- Egg Sandwich shows as Non-Veg.
- Egg Sandwich description appears in the visible Tomo Tip area.
- Egg Sandwich quick guide appears.

Syntax validation:
- `frontend/mobile/mobile-shell.js`: pass
- `mobile/mobile-shell.js`: pass

### Files Updated

- `database/generated/recipes.json`
- `local-recipes.js`
- `frontend/local-recipes.js`
- `frontend/mobile/mobile-shell.js`
- `mobile/mobile-shell.js`
- `index.html`
- `frontend/index.html`
