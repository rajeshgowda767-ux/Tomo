# Expansion Pack 2: Soul Food + Regional Staples

## Summary

- Added dishes: 12
- New total dish count: 191
- Soul Food coverage after expansion: 32 dishes
- UI changed: No
- Recommendation logic changed: No
- Pantry engine changed: No
- Analytics/memory/feedback changed: No
- Deployment changed: No

## Dishes Added

1. Neer Dosa
2. Akki Roti
3. Vegetable Stew
4. Appam
5. Set Dosa
6. Ghee Rice
7. Methi Thepla
8. Aloo Jeera
9. Pesarattu
10. Kosambari
11. Mangalore Buns
12. Maddur Vada

## Skipped Dishes

None.

All requested dishes were distinct enough to add. No regional-name duplicates like Mosaranna, Chitranna, or Bisi Bele Bath were introduced.

## Soul Food Impact

Soul Food coverage increased to 32 dishes.

New dishes contributing to Soul Food:

- Neer Dosa
- Akki Roti
- Vegetable Stew
- Appam
- Set Dosa
- Ghee Rice
- Mangalore Buns

## Region / Cuisine Impact

Cuisine counts after expansion:

- Karnataka: 7
- Mangalorean: 4
- Kerala: 5
- Gujarati: 1
- Andhra: 12
- North Indian: 38

Region counts after expansion:

- South India: 70
- North India: 44
- West India: 9

Sub-region impact:

- Karnataka: 6
- Coastal Karnataka: 2
- Mangalore: 2
- Kerala: 5
- Gujarat: 1
- Andhra Pradesh: 1

## Metadata Included

Each new dish includes:

- Complete recipe metadata
- Mood tags
- Meal tags
- `regionTags`
- Cuisine metadata
- Pairings
- Quick Guide v1
- Pantry-compatible ingredients
- Required/core/optional ingredient fields
- Dish family metadata

## Validation

Passed:

- `database/generated/recipes.json` parses as JSON.
- `local-recipes.js` parses as JavaScript.
- `frontend/local-recipes.js` parses as JavaScript.
- `frontend/mobile/mobile-shell.js` parses as JavaScript.
- No duplicate titles.
- All new dishes have mood metadata.
- All new dishes have meal metadata.
- All new dishes have `regionTags`.
- All new dishes have cuisine metadata.
- All new dishes have Quick Guide v1.
- All new dishes have pairings.
- All new dishes have pantry-compatible ingredients.
