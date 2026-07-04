# Expansion Pack 4: Protein + Regional Balance

## Summary

- Added dishes: 20
- New total dish count: 231
- UI changed: No
- Recommendation logic changed: No
- Pantry engine changed: No
- Analytics/memory/feedback changed: No
- Deployment changed: No

## Dishes Added

1. Tofu Bhurji
2. Soya Chunks Curry
3. Sprouts Usal
4. Matki Usal
5. Dhokla
6. Handvo
7. Patra
8. Baingan Bharta
9. Kadhi Pakora
10. Macher Jhol
11. Mochar Ghonto
12. Dalma
13. Pakhala Bhata
14. Chingudi Chhecha
15. Goan Fish Curry
16. Goan Prawn Balchao
17. Kori Rotti
18. Assamese Duck Curry
19. Naga Galho
20. Manipuri Chamthong

## Duplicate / Replacement Note

`Misal Pav` was not added because `Kolhapuri Misal Pav` already exists and would be duplicate-like.

Replacement used:

- Matki Usal

This keeps the pack Maharashtrian, protein-forward, and distinct.

## Protein Impact

Protein distribution after expansion:

- Vegetarian: 155
- Paneer: 19
- Egg: 21
- Chicken: 30
- Fish: 10
- Mutton: 5
- Pork: 4
- Soy/Tofu: 2
- Dal/Legume: 47

Primary improvements:

- Soy/Tofu moved from 0 meaningful dishes to 2.
- Dal/Legume strengthened with Sprouts Usal, Matki Usal, Dhokla, Handvo, Patra, Dalma, and Kadhi Pakora.
- Fish/seafood strengthened with Macher Jhol, Chingudi Chhecha, Goan Fish Curry, and Goan Prawn Balchao.
- Northeast protein variety improved with Assamese Duck Curry.

## Region Impact

Focus region distribution after expansion:

- South India: 77
- North India: 46
- Pan-Indian: 22
- West India: 18
- Global: 14
- East India: 14
- Coastal India: 11
- Northeast India: 9

## Cuisine Impact

Focus cuisine distribution after expansion:

- North Indian: 39
- Maharashtrian: 10
- Bengali: 8
- Mangalorean: 6
- Northeast Indian: 5
- Gujarati: 4
- Assamese: 4
- Punjabi: 3
- Indian Fusion: 3
- Odia: 3
- Manipuri: 2
- Goan: 2

## Metadata Included

Each new dish includes:

- Complete metadata
- Mood tags
- Meal tags
- `regionTags`
- Cuisine metadata
- Pairings
- Quick Guide v1
- Pantry-compatible required/core/optional ingredients
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
