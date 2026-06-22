# Pantry Engine Audit Phase 3

Generated: 2026-06-12T09:09:38.682Z

Scope: Pantry Engine Fix Phase 1 validation. UI layout, mood engine, collections, journal, desktop, and recipe database were not changed.

## Summary

| Metric | Count |
| --- | ---: |
| Total tested | 100 |
| Tier 1 count | 30 |
| Tier 2 count | 11 |
| Tier 3 count | 56 |
| No Match count | 3 |
| FAIL count | 0 |

Final validation: PASS

## Targeted Validation

| Selected ingredients | Suggestion | Tier | Score | Need | Nice to Have | Ignored selected |
| --- | --- | --- | ---: | --- | --- | --- |
| Potato + Onion | Masala Dosa | Tier 2 | 2233 | Dosa Batter | None | None |
| Rice + Chana | Chole Chawal | Tier 1 | 3245 | Onion | None | None |
| Rice + Garlic | Egg Fried Rice | Tier 1 | 2730 | Egg, Onion | Soy Sauce, Oil | None |
| Wheat + Fish | Fish Pakora | Tier 2 | 2225 | Besan | None | None |
| Chicken + Onion | Nattu Kozhi Curry | Tier 1 | 3270 | None | None | None |
| Paneer + Capsicum | Kadai Paneer | Tier 1 | 3252 | None | None | None |
| Onion + Garlic | Veg Fried Rice | Tier 2 | 2233 | Rice | None | None |
| Paneer + Potato | Paneer Paratha | Tier 2 | 2226 | Wheat, Onion | None | None |
| Egg + Garlic | Egg Fried Rice | Tier 1 | 3230 | Rice, Onion | Soy Sauce, Oil | None |

## Need vs Nice to Have Examples

| Selected ingredients | Dish | Need | Nice to Have |
| --- | --- | --- | --- |
| Rice + Egg | Egg Fried Rice | Onion, Garlic | Soy Sauce, Oil |
| Bread + Egg | Egg Toast | None | Oil, Coriander |
| Wheat + Potato | Spicy Aloo Paratha | None | Red Chilli |
| Wheat + Fish | Fish Pakora | Besan | None |

## Full 100-Combination Audit

| # | Selected ingredients | Suggestion | Main suggestion? | Tier | Score | Need | Nice to Have | Ignored selected | FAIL reason |
| ---: | --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | Wheat + Fish | Fish Pakora | Yes | Tier 2 | 2225 | Besan | None | None | None |
| 2 | Rice + Paneer | Paneer Fried Rice | Yes | Tier 1 | 3254 | None | None | None | None |
| 3 | Bread + Egg | Egg Toast | Yes | Tier 1 | 3252 | None | Oil, Coriander | None | None |
| 4 | Rice + Egg | Egg Fried Rice | Yes | Tier 1 | 3250 | Onion, Garlic | Soy Sauce, Oil | None | None |
| 5 | Rice + Fish | Fish Curry Rice | Yes | Tier 1 | 3245 | Tomato | None | None | None |
| 6 | Wheat + Egg | Egg Paratha | Yes | Tier 1 | 3252 | None | None | None | None |
| 7 | Wheat + Potato | Spicy Aloo Paratha | Yes | Tier 1 | 3271 | None | Red Chilli | None | None |
| 8 | Paneer + Onion | Paneer Bhurji | Yes | Tier 1 | 3248 | None | None | None | None |
| 9 | Chicken + Tomato | Madras Curry | Yes | Tier 1 | 3248 | None | None | None | None |
| 10 | Rice + Rajma | Rajma Chawal | Yes | Tier 1 | 3248 | None | None | None | None |
| 11 | Potato + Onion | Masala Dosa | Yes | Tier 2 | 2233 | Dosa Batter | None | None | None |
| 12 | Rice + Chana | Chole Chawal | Yes | Tier 1 | 3245 | Onion | None | None | None |
| 13 | Rice + Garlic | Egg Fried Rice | Yes | Tier 1 | 2730 | Egg, Onion | Soy Sauce, Oil | None | None |
| 14 | Onion + Garlic | Veg Fried Rice | Yes | Tier 2 | 2233 | Rice | None | None | None |
| 15 | Paneer + Potato | Paneer Paratha | Yes | Tier 2 | 2226 | Wheat, Onion | None | None | None |
| 16 | Egg + Garlic | Egg Fried Rice | Yes | Tier 1 | 3230 | Rice, Onion | Soy Sauce, Oil | None | None |
| 17 | Chicken + Onion | Nattu Kozhi Curry | Yes | Tier 1 | 3270 | None | None | None | None |
| 18 | Paneer + Capsicum | Kadai Paneer | Yes | Tier 1 | 3252 | None | None | None | None |
| 19 | Rice + Wheat | Spicy Aloo Paratha | No, unlock only | Tier 3 | 1070 | Potato | Red Chilli | Rice | None |
| 20 | Rice + Bread | Puliyogare | No, unlock only | Tier 3 | 1053 | None | Tamarind | Bread | None |
| 21 | Rice + Onion | Veg Fried Rice | Yes | Tier 1 | 3254 | None | None | None | None |
| 22 | Rice + Poha | Puliyogare | No, unlock only | Tier 3 | 1053 | None | Tamarind | Poha | None |
| 23 | Rice + Moong Dal | Sabudana Khichdi | Yes | Tier 1 | 3248 | Peanut | Curry Leaves | None | None |
| 24 | Rice + Capsicum | Schezwan Fried Rice | Yes | Tier 1 | 3249 | Vegetables | None | None | None |
| 25 | Wheat + Chicken | Nattu Kozhi Curry | No, unlock only | Tier 3 | 1069 | Shallots | None | Wheat | None |
| 26 | Wheat + Tomato | Spicy Aloo Paratha | No, unlock only | Tier 3 | 1070 | Potato | Red Chilli | Tomato | None |
| 27 | Wheat + Rava | Spicy Aloo Paratha | No, unlock only | Tier 3 | 1070 | Potato | Red Chilli | Rava | None |
| 28 | Wheat + Besan | Fish Pakora | Yes | Tier 2 | 1725 | Fish | None | None | None |
| 29 | Wheat + Rajma | Spicy Aloo Paratha | No, unlock only | Tier 3 | 1070 | Potato | Red Chilli | Rajma | None |
| 30 | Wheat + Curd | Spicy Aloo Paratha | No, unlock only | Tier 3 | 1070 | Potato | Red Chilli | Curd | None |
| 31 | Wheat + Corn | Spicy Aloo Paratha | No, unlock only | Tier 3 | 1070 | Potato | Red Chilli | Corn | None |
| 32 | Fish + Paneer | No Match | No, unlock only | No Match | N/A | None | None | None | None |
| 33 | Fish + Chicken | No Match | No, unlock only | No Match | N/A | None | None | None | None |
| 34 | Fish + Potato | Kerala Fish Curry | No, unlock only | Tier 3 | 1048 | Coconut Milk, Tomato | None | Potato | None |
| 35 | Fish + Tomato | Fish Curry | Yes | Tier 1 | 3246 | Onion | Tamarind | None | None |
| 36 | Fish + Rava | Kerala Fish Curry | No, unlock only | Tier 3 | 1048 | Coconut Milk, Tomato | None | Rava | None |
| 37 | Fish + Besan | Fish Pakora | Yes | Tier 1 | 3245 | Wheat | None | None | None |
| 38 | Fish + Rajma | Kerala Fish Curry | No, unlock only | Tier 3 | 1048 | Coconut Milk, Tomato | None | Rajma | None |
| 39 | Fish + Curd | Kerala Fish Curry | No, unlock only | Tier 3 | 1048 | Coconut Milk, Tomato | None | Curd | None |
| 40 | Fish + Corn | Kerala Fish Curry | No, unlock only | Tier 3 | 1048 | Coconut Milk, Tomato | None | Corn | None |
| 41 | Egg + Chicken | Chicken Fried Rice | Yes | Tier 2 | 2233 | Rice | None | None | None |
| 42 | Egg + Potato | Spanish Omelette | Yes | Tier 1 | 3252 | Paprika, Olive Oil | None | None | None |
| 43 | Egg + Onion | Onion Omelette | Yes | Tier 1 | 3252 | Turmeric | Oil | None | None |
| 44 | Egg + Poha | Masala Omelette | No, unlock only | Tier 3 | 1053 | Capsicum | None | Poha | None |
| 45 | Egg + Moong Dal | Masala Omelette | No, unlock only | Tier 3 | 1053 | Capsicum | None | Moong Dal | None |
| 46 | Egg + Chana | Masala Omelette | No, unlock only | Tier 3 | 1053 | Capsicum | None | Chana | None |
| 47 | Egg + Capsicum | Masala Omelette | Yes | Tier 1 | 3254 | None | None | None | None |
| 48 | Paneer + Chicken | No Match | No, unlock only | No Match | N/A | None | None | None | None |
| 49 | Paneer + Tomato | Paneer Tikka Masala | Yes | Tier 1 | 3249 | Onion | None | None | None |
| 50 | Paneer + Rava | Paneer Fried Rice | No, unlock only | Tier 3 | 1053 | Rice | None | Rava | None |
| 51 | Paneer + Poha | Paneer Fried Rice | No, unlock only | Tier 3 | 1053 | Rice | None | Poha | None |
| 52 | Paneer + Moong Dal | Paneer Fried Rice | No, unlock only | Tier 3 | 1053 | Rice | None | Moong Dal | None |
| 53 | Paneer + Chana | Paneer Fried Rice | No, unlock only | Tier 3 | 1053 | Rice | None | Chana | None |
| 54 | Chicken + Bread | Nattu Kozhi Curry | No, unlock only | Tier 3 | 1069 | Shallots | None | Bread | None |
| 55 | Chicken + Garlic | Garlic Chicken | Yes | Tier 1 | 3250 | None | None | None | None |
| 56 | Chicken + Poha | Nattu Kozhi Curry | No, unlock only | Tier 3 | 1069 | Shallots | None | Poha | None |
| 57 | Chicken + Moong Dal | Nattu Kozhi Curry | No, unlock only | Tier 3 | 1069 | Shallots | None | Moong Dal | None |
| 58 | Chicken + Chana | Nattu Kozhi Curry | No, unlock only | Tier 3 | 1069 | Shallots | None | Chana | None |
| 59 | Chicken + Curd | Chicken Majestic | Yes | Tier 1 | 3252 | None | Ginger, Oil | None | None |
| 60 | Chicken + Corn | Nattu Kozhi Curry | No, unlock only | Tier 3 | 1069 | Shallots | None | Corn | None |
| 61 | Bread + Onion | Bread Upma | Yes | Tier 1 | 3252 | None | Oil, Coriander | None | None |
| 62 | Bread + Garlic | Bread Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Garlic | None |
| 63 | Bread + Poha | Bread Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Poha | None |
| 64 | Bread + Moong Dal | Bread Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Moong Dal | None |
| 65 | Bread + Chana | Bread Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Chana | None |
| 66 | Bread + Capsicum | Bread Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Capsicum | None |
| 67 | Potato + Garlic | Chicken Potato Curry | Yes | Tier 2 | 1732 | Chicken | Green Chilli | None | None |
| 68 | Potato + Rava | Masala Dosa | No, unlock only | Tier 3 | 1053 | Dosa Batter | None | Rava | None |
| 69 | Potato + Besan | Bonda | Yes | Tier 1 | 3244 | None | None | None | None |
| 70 | Potato + Rajma | Masala Dosa | No, unlock only | Tier 3 | 1053 | Dosa Batter | None | Rajma | None |
| 71 | Potato + Curd | Masala Dosa | No, unlock only | Tier 3 | 1053 | Dosa Batter | None | Curd | None |
| 72 | Potato + Corn | Masala Dosa | No, unlock only | Tier 3 | 1053 | Dosa Batter | None | Corn | None |
| 73 | Onion + Poha | Avalakki | Yes | Tier 1 | 3247 | Peanut | Lemon, Curry Leaves | None | None |
| 74 | Onion + Moong Dal | Veg Fried Rice | No, unlock only | Tier 3 | 1053 | Rice | None | Moong Dal | None |
| 75 | Onion + Chana | Chole Chawal | Yes | Tier 2 | 2225 | Rice | None | None | None |
| 76 | Onion + Capsicum | Chilli Chicken | Yes | Tier 2 | 1733 | Chicken | None | None | None |
| 77 | Onion + Corn | Corn Chaat | Yes | Tier 1 | 3251 | None | Coriander | None | None |
| 78 | Tomato + Rava | Instant Rava Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Tomato | None |
| 79 | Tomato + Besan | Mirapakaya Bajji | No, unlock only | Tier 3 | 1051 | None | Green Chilli, Ginger, Oil | Tomato | None |
| 80 | Tomato + Rajma | Rajma Chawal | Yes | Tier 2 | 2227 | Rice | None | None | None |
| 81 | Tomato + Curd | Tomato Rice | No, unlock only | Tier 3 | 1051 | Rice | Oil, Coriander | Curd | None |
| 82 | Tomato + Corn | Tomato Rice | No, unlock only | Tier 3 | 1051 | Rice | Oil, Coriander | Corn | None |
| 83 | Garlic + Poha | Batata Poha | No, unlock only | Tier 3 | 1051 | Potato, Turmeric | Curry Leaves | Garlic | None |
| 84 | Garlic + Moong Dal | Sabudana Khichdi | No, unlock only | Tier 3 | 1047 | Rice, Peanut | Curry Leaves | Garlic | None |
| 85 | Garlic + Chana | Chole Chawal | No, unlock only | Tier 3 | 1044 | Rice, Onion | None | Garlic | None |
| 86 | Garlic + Capsicum | Chilli Chicken | Yes | Tier 2 | 1733 | Chicken | None | None | None |
| 87 | Garlic + Corn | Corn Chaat | No, unlock only | Tier 3 | 1050 | Onion | Coriander | Garlic | None |
| 88 | Rava + Besan | Instant Rava Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Besan | None |
| 89 | Rava + Rajma | Instant Rava Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Rajma | None |
| 90 | Rava + Curd | Instant Rava Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Curd | None |
| 91 | Rava + Corn | Instant Rava Upma | No, unlock only | Tier 3 | 1051 | Onion | Oil, Coriander | Corn | None |
| 92 | Poha + Moong Dal | Batata Poha | No, unlock only | Tier 3 | 1051 | Potato, Turmeric | Curry Leaves | Moong Dal | None |
| 93 | Poha + Chana | Batata Poha | No, unlock only | Tier 3 | 1051 | Potato, Turmeric | Curry Leaves | Chana | None |
| 94 | Poha + Capsicum | Batata Poha | No, unlock only | Tier 3 | 1051 | Potato, Turmeric | Curry Leaves | Capsicum | None |
| 95 | Besan + Moong Dal | Mirapakaya Bajji | No, unlock only | Tier 3 | 1051 | None | Green Chilli, Ginger, Oil | Moong Dal | None |
| 96 | Besan + Chana | Mirapakaya Bajji | No, unlock only | Tier 3 | 1051 | None | Green Chilli, Ginger, Oil | Chana | None |
| 97 | Besan + Curd | Kadhi Chawal | Yes | Tier 1 | 3244 | None | None | None | None |
| 98 | Besan + Corn | Mirapakaya Bajji | No, unlock only | Tier 3 | 1051 | None | Green Chilli, Ginger, Oil | Corn | None |
| 99 | Moong Dal + Chana | Sabudana Khichdi | No, unlock only | Tier 3 | 1047 | Rice, Peanut | Curry Leaves | Chana | None |
| 100 | Moong Dal + Capsicum | Schezwan Fried Rice | No, unlock only | Tier 3 | 1048 | Rice, Vegetables | None | Moong Dal | None |

## Notes

- Major protein guard remained active: no promoted Tier 1/Tier 2 suggestion ignores selected fish, chicken, egg, paneer, or mutton.
- Tier 3 rows are unlock suggestions only and should not be presented as a main strong match.
- Grocery duplicate prevention remains based on normalized item names in addGroceries.
- Missing items are now split into Need and Nice to Have; Add Missing Items uses Need first.
