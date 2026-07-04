# Tomo Balance-First Regional Dishes Addition Report

Scope: recipe/data additions only. No UI, recommendation scoring, or pantry logic changes were made.

## Dish Count

- Before: 231 dishes
- After: 247 dishes
- Net new dishes: 16

## Dishes Added

1. Tomato Pappu
2. Dosakaya Pappu
3. Bele Saaru
4. Mor Kuzhambu
5. Chow Chow Kootu
6. Beans Poriyal
7. Cabbage Thoran
8. Ragi Malt
9. Palak Dal
10. Sarson Ka Saag
11. Gujarati Dal
12. Varan
13. Zunka
14. Khandvi
15. Sprouted Moong Salad
16. Roasted Chana Chaat

## Tier 1 Dishes Already Present

These were requested in Tier 1 but already existed, so no duplicate was created:

- Avial
- Dhokla
- Dalma
- Ghugni

## Balance Intent

The additions prioritize:

- Dal / pappu / saaru
- Kadhi and kootu
- Greens and saag
- Palya / poriyal / thoran-style vegetable coverage
- West Indian lunch dishes
- Healthy snacks
- Drinks / breakfast support

The pass intentionally avoided adding:

- Dosa variants
- Paratha variants
- Paneer variants
- Chicken variants
- Combo meals as primary dish names

## Before / After Meal Impact

| Meal | Before | After | Delta | Main Balance Improvements |
| --- | ---: | ---: | ---: | --- |
| Breakfast | 63 | 64 | +1 | Added drink-side breakfast support through Ragi Malt. |
| Lunch | 88 | 101 | +13 | Added pappu, saaru, kadhi, kootu, poriyal, thoran, dal, saag, West Indian lunch depth. |
| Dinner | 86 | 97 | +11 | Added lighter home-style dal, pappu, kootu, greens, and vegetable dinner options. |
| Snacks | 47 | 51 | +4 | Added Khandvi, Ragi Malt, Sprouted Moong Salad, Roasted Chana Chaat. |

## Updated Balance Families

### Lunch

- Pappu: 2
- Saaru: 1
- Kadhi: 2
- Kootu: 1
- Poriyal: 1
- Thoran: 2
- Dal: 3
- Saag: 1
- Besan sabzi: 1
- Chaat / healthy salad: 4

### Dinner

- Pappu: 2
- Saaru: 1
- Kadhi: 1
- Kootu: 1
- Poriyal: 1
- Thoran: 2
- Dal: 3
- Saag: 1
- Besan sabzi: 1

### Snacks

- Steamed snack: 2
- Drink side: 2
- Chaat / healthy salad: 9

## Coverage Checks

- Pairings: 247 / 247, 100%
- Quick Guides: 247 / 247, 100%
- Duplicate titles: 0
- Local mirrors match generated recipes: yes

## Validation

Passed:

- JSON parse: database/generated/recipes.json
- node --check local-recipes.js
- node --check frontend/local-recipes.js

## Updated Audit

The full updated balance audit is available at:

- docs/tomo-food-balance-audit.md
