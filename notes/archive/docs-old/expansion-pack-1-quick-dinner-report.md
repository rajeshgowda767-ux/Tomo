# Expansion Pack 1: Quick Dinner

## Summary

- Added dishes: 15
- New total dish count: 179
- Quick Dinner coverage after expansion: 18 dishes
- UI changed: No
- Recommendation logic changed: No
- Pantry engine changed: No

## Dishes Added

1. Egg Tomato Rice Bowl
2. Garlic Egg Rice
3. Paneer Capsicum Rice Bowl
4. Paneer Corn Rice Bowl
5. Garlic Paneer Roti Wrap
6. Chicken Pepper Rice Bowl
7. Chicken Egg Rice Bowl
8. Chicken Tomato Rice
9. One Pot Dal Palak Rice
10. Moong Dal Vegetable Khichdi
11. Mushroom Pepper Rice Bowl
12. Corn Paneer Bhurji Bowl
13. Egg Capsicum Bhurji
14. Tomato Paneer Rice
15. Chicken Capsicum Stir Fry Bowl

## Coverage Focus

- Rice bowls: Egg Tomato Rice Bowl, Garlic Egg Rice, Paneer Capsicum Rice Bowl, Paneer Corn Rice Bowl, Chicken Pepper Rice Bowl, Chicken Egg Rice Bowl, Chicken Tomato Rice, Mushroom Pepper Rice Bowl, Tomato Paneer Rice
- Egg dishes: Egg Tomato Rice Bowl, Garlic Egg Rice, Chicken Egg Rice Bowl, Egg Capsicum Bhurji
- Paneer dishes: Paneer Capsicum Rice Bowl, Paneer Corn Rice Bowl, Garlic Paneer Roti Wrap, Corn Paneer Bhurji Bowl, Tomato Paneer Rice
- Chicken dishes: Chicken Pepper Rice Bowl, Chicken Egg Rice Bowl, Chicken Tomato Rice, Chicken Capsicum Stir Fry Bowl
- One-pot meals: Egg Tomato Rice Bowl, Garlic Egg Rice, Paneer Capsicum Rice Bowl, Paneer Corn Rice Bowl, Chicken Pepper Rice Bowl, Chicken Egg Rice Bowl, Chicken Tomato Rice, One Pot Dal Palak Rice, Moong Dal Vegetable Khichdi, Mushroom Pepper Rice Bowl, Tomato Paneer Rice

## Quick Dinner Coverage

Current Quick Dinner dishes:

1. Chicken Capsicum Stir Fry Bowl
2. Chicken Egg Rice Bowl
3. Chicken Mushroom Stir Fry
4. Chicken Pepper Rice Bowl
5. Chicken Tomato Rice
6. Corn Paneer Bhurji Bowl
7. Egg Capsicum Bhurji
8. Egg Tomato Rice Bowl
9. Garlic Chicken
10. Garlic Egg Rice
11. Garlic Paneer Roti Wrap
12. Moong Dal Vegetable Khichdi
13. Mushroom Pepper Rice Bowl
14. One Pot Dal Palak Rice
15. Paneer Capsicum Rice Bowl
16. Paneer Corn Rice Bowl
17. Plain Chapati
18. Tomato Paneer Rice

## Metadata Included

Each new dish includes:

- Complete recipe metadata
- Mood tags
- Meal tags
- Region tags
- Cuisine metadata
- Pairings
- Quick Guide v1
- Pantry-compatible ingredients
- Required/core/optional ingredient fields
- Dish family metadata

## Additional Cleanup

Full-database validation found pre-existing metadata gaps unrelated to the new pack.

Fixed mood ownership for:

- Onion Omelette
- Tomato Omelette
- Paneer Mushroom Masala
- Chicken Potato Curry
- Chicken Mushroom Stir Fry
- Mutton Pulao
- Cheese Dosa
- Cheese Uttapam
- Spanish Omelette

Fixed region tags for:

- Chicken Rice

## Validation

Passed:

- `database/generated/recipes.json` parses as JSON.
- `local-recipes.js` parses as JavaScript.
- `frontend/local-recipes.js` parses as JavaScript.
- `frontend/mobile/mobile-shell.js` parses as JavaScript.
- No duplicate titles.
- All dishes have mood metadata.
- All dishes have meal metadata.
- All dishes have region tags.
- All dishes have cuisine metadata.
- All Expansion Pack 1 dishes have Quick Guide v1.
- All Expansion Pack 1 dishes have pairings.
- All Expansion Pack 1 dishes have pantry-compatible required/core ingredient metadata.
