# Expansion Pack 3: Regional Balance

## Summary

- Added dishes: 20
- New total dish count: 211
- UI changed: No
- Recommendation logic changed: No
- Pantry engine changed: No
- Analytics/memory/feedback changed: No
- Deployment changed: No

## Dishes Added

1. Litti Chokha
2. Aloo Posto
3. Begun Bhaja
4. Ghugni
5. Dhokar Dalna
6. Chingri Malai Curry
7. Shukto
8. Masor Tenga
9. Aloo Pitika
10. Bamboo Shoot Pork
11. Manipuri Eromba
12. Jadoh
13. Lai Xaak Bhaji
14. Avial
15. Beans Thoran
16. Kadala Curry
17. Kerala Egg Roast
18. Meen Pollichathu
19. Sol Kadhi
20. Prawn Sukka

## Skipped Dishes

None.

Existing / avoided duplicates:

- Thukpa already existed.
- Akki Roti already existed.
- No regional-name duplicates such as Mosaranna, Chitranna, or Bisi Bele Bath were added.

## Region Distribution Impact

Focus regions after expansion:

- South India: 76
- West India: 10
- East India: 9
- Coastal India: 7
- Northeast India: 6

## Cuisine Distribution Impact

Focus cuisines after expansion:

- Kerala: 10
- Bengali: 6
- Mangalorean: 5
- Northeast Indian: 4
- Assamese: 3
- Bihari: 1
- Manipuri: 1
- Khasi: 1
- Konkani: 1

## Metadata Included

Each new dish includes:

- Mood metadata
- Meal metadata
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
- All new dishes have pantry-compatible required/core ingredient metadata.
