# Pantry Engine Audit Phase 1

Generated: 2026-06-12T08:34:14.760Z

Scope: audit only. No UI, mood engine, collections, journal, desktop, recipe data, or pantry engine files were modified.

## Summary

| Metric | Count |
| --- | ---: |
| Total combinations tested | 100 |
| PASS | 28 |
| LOW CONFIDENCE | 72 |
| FAIL | 0 |

## Verdict Legend

- **PASS**: Top suggestion clearly uses the selected pantry ingredients as meaningful dish ingredients.
- **LOW CONFIDENCE**: The engine avoided an unrelated recommendation, but coverage or strict filtering left no strong suggestion, or the relation is possible but not ideal.
- **FAIL**: The top suggestion is unrelated, ignores a selected major ingredient, or recommends a dish that should not follow from the selected ingredients.

## Top Failure / Low-Confidence Patterns

- Strict strong-match filter returned no suggestion even though raw matches exist: 72

## Key Sanity Checks

| Selected ingredients | Top suggestion | Match score | Missing ingredients | Verdict | Notes |
| --- | --- | ---: | --- | --- | --- |
| Wheat + Fish | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Fish Pakora |
| Rice + Paneer | Paneer Fried Rice | 254 | None | PASS | Top dish directly uses selected ingredients |
| Bread + Egg | Egg Toast | 252 | Oil, Coriander | PASS | Top dish directly uses selected ingredients |
| Rice + Egg | Egg Fried Rice | 250 | Onion, Garlic, Soy Sauce, Oil | PASS | Top dish directly uses selected ingredients |
| Rice + Fish | Fish Curry Rice | 245 | Tomato | PASS | Top dish directly uses selected ingredients |
| Wheat + Egg | Egg Paratha | 252 | None | PASS | Top dish directly uses selected ingredients |
| Wheat + Potato | Spicy Aloo Paratha | 271 | Red Chilli | PASS | Top dish directly uses selected ingredients |

## Full 100-Combination Audit

| # | Selected ingredients | Top suggestion | Match score | Missing ingredients | Verdict | Notes |
| ---: | --- | --- | ---: | --- | --- | --- |
| 1 | Wheat + Fish | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Fish Pakora |
| 2 | Rice + Paneer | Paneer Fried Rice | 254 | None | PASS | Top dish directly uses selected ingredients |
| 3 | Bread + Egg | Egg Toast | 252 | Oil, Coriander | PASS | Top dish directly uses selected ingredients |
| 4 | Rice + Egg | Egg Fried Rice | 250 | Onion, Garlic, Soy Sauce, Oil | PASS | Top dish directly uses selected ingredients |
| 5 | Rice + Fish | Fish Curry Rice | 245 | Tomato | PASS | Top dish directly uses selected ingredients |
| 6 | Wheat + Egg | Egg Paratha | 252 | None | PASS | Top dish directly uses selected ingredients |
| 7 | Wheat + Potato | Spicy Aloo Paratha | 271 | Red Chilli | PASS | Top dish directly uses selected ingredients |
| 8 | Paneer + Onion | Paneer Bhurji | 248 | None | PASS | Top dish directly uses selected ingredients |
| 9 | Chicken + Tomato | Madras Curry | 248 | None | PASS | Top dish directly uses selected ingredients |
| 10 | Rice + Rajma | Rajma Chawal | 248 | None | PASS | Top dish directly uses selected ingredients |
| 11 | Rice + Wheat | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Spicy Aloo Paratha |
| 12 | Rice + Bread | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chicken Fried Rice |
| 13 | Rice + Onion | Veg Fried Rice | 254 | None | PASS | Top dish directly uses selected ingredients |
| 14 | Rice + Garlic | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chicken Fried Rice |
| 15 | Rice + Poha | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chicken Fried Rice |
| 16 | Rice + Moong Dal | Sabudana Khichdi | 248 | Peanut, Curry Leaves | PASS | Top dish directly uses selected ingredients |
| 17 | Rice + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chicken Fried Rice |
| 18 | Rice + Capsicum | Schezwan Fried Rice | 249 | Vegetables | PASS | Top dish directly uses selected ingredients |
| 19 | Wheat + Chicken | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Nattu Kozhi Curry |
| 20 | Wheat + Tomato | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Spicy Aloo Paratha |
| 21 | Wheat + Rava | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Spicy Aloo Paratha |
| 22 | Wheat + Besan | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Fish Pakora |
| 23 | Wheat + Rajma | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Spicy Aloo Paratha |
| 24 | Wheat + Curd | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Spicy Aloo Paratha |
| 25 | Wheat + Corn | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Spicy Aloo Paratha |
| 26 | Fish + Paneer | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Paneer Fried Rice |
| 27 | Fish + Chicken | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Nattu Kozhi Curry |
| 28 | Fish + Potato | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Kerala Fish Curry |
| 29 | Fish + Tomato | Fish Curry | 246 | Tamarind, Onion | PASS | Top dish directly uses selected ingredients |
| 30 | Fish + Rava | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Kerala Fish Curry |
| 31 | Fish + Besan | Fish Pakora | 245 | Wheat | PASS | Top dish directly uses selected ingredients |
| 32 | Fish + Rajma | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Kerala Fish Curry |
| 33 | Fish + Curd | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Kerala Fish Curry |
| 34 | Fish + Corn | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Kerala Fish Curry |
| 35 | Egg + Chicken | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chicken Fried Rice |
| 36 | Egg + Potato | Spanish Omelette | 252 | Paprika, Olive Oil | PASS | Top dish directly uses selected ingredients |
| 37 | Egg + Onion | Onion Omelette | 252 | Turmeric, Oil | PASS | Top dish directly uses selected ingredients |
| 38 | Egg + Garlic | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Andhra Egg Fry |
| 39 | Egg + Poha | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Masala Omelette |
| 40 | Egg + Moong Dal | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Masala Omelette |
| 41 | Egg + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Masala Omelette |
| 42 | Egg + Capsicum | Masala Omelette | 254 | None | PASS | Top dish directly uses selected ingredients |
| 43 | Paneer + Chicken | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Nattu Kozhi Curry |
| 44 | Paneer + Potato | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Paneer Paratha |
| 45 | Paneer + Tomato | Paneer Tikka Masala | 249 | Onion | PASS | Top dish directly uses selected ingredients |
| 46 | Paneer + Rava | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Paneer Fried Rice |
| 47 | Paneer + Poha | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Paneer Fried Rice |
| 48 | Paneer + Moong Dal | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Paneer Fried Rice |
| 49 | Paneer + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Paneer Fried Rice |
| 50 | Paneer + Capsicum | Kadai Paneer | 252 | None | PASS | Top dish directly uses selected ingredients |
| 51 | Chicken + Bread | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Nattu Kozhi Curry |
| 52 | Chicken + Onion | Nattu Kozhi Curry | 270 | None | PASS | Top dish directly uses selected ingredients |
| 53 | Chicken + Garlic | Garlic Chicken | 250 | None | PASS | Top dish directly uses selected ingredients |
| 54 | Chicken + Poha | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Nattu Kozhi Curry |
| 55 | Chicken + Moong Dal | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Nattu Kozhi Curry |
| 56 | Chicken + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Nattu Kozhi Curry |
| 57 | Chicken + Curd | Chicken Majestic | 252 | Ginger, Oil | PASS | Top dish directly uses selected ingredients |
| 58 | Chicken + Corn | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Nattu Kozhi Curry |
| 59 | Bread + Onion | Bread Upma | 252 | Oil, Coriander | PASS | Top dish directly uses selected ingredients |
| 60 | Bread + Garlic | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Bread Upma |
| 61 | Bread + Poha | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Bread Upma |
| 62 | Bread + Moong Dal | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Bread Upma |
| 63 | Bread + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Bread Upma |
| 64 | Bread + Capsicum | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chilli Chicken |
| 65 | Potato + Onion | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Masala Dosa |
| 66 | Potato + Garlic | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chicken Potato Curry |
| 67 | Potato + Rava | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Masala Dosa |
| 68 | Potato + Besan | Bonda | 244 | None | PASS | Top dish directly uses selected ingredients |
| 69 | Potato + Rajma | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Masala Dosa |
| 70 | Potato + Curd | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Masala Dosa |
| 71 | Potato + Corn | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Masala Dosa |
| 72 | Onion + Garlic | Guntur Chilli Chicken | 247 | Chicken | PASS | Top dish directly uses selected ingredients |
| 73 | Onion + Poha | Avalakki | 247 | Peanut, Lemon, Curry Leaves | PASS | Top dish directly uses selected ingredients |
| 74 | Onion + Moong Dal | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Veg Fried Rice |
| 75 | Onion + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Veg Fried Rice |
| 76 | Onion + Capsicum | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chilli Chicken |
| 77 | Onion + Corn | Corn Chaat | 251 | Coriander | PASS | Top dish directly uses selected ingredients |
| 78 | Tomato + Rava | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Instant Rava Upma |
| 79 | Tomato + Besan | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Mirapakaya Bajji |
| 80 | Tomato + Rajma | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Rajma Chawal |
| 81 | Tomato + Curd | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chicken Majestic |
| 82 | Tomato + Corn | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Tomato Rice |
| 83 | Garlic + Poha | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Batata Poha |
| 84 | Garlic + Moong Dal | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Garlic Chicken |
| 85 | Garlic + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Garlic Chicken |
| 86 | Garlic + Capsicum | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chilli Chicken |
| 87 | Garlic + Corn | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Corn Chaat |
| 88 | Rava + Besan | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Instant Rava Upma |
| 89 | Rava + Rajma | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Instant Rava Upma |
| 90 | Rava + Curd | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chicken Majestic |
| 91 | Rava + Corn | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Instant Rava Upma |
| 92 | Poha + Moong Dal | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Batata Poha |
| 93 | Poha + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Batata Poha |
| 94 | Poha + Capsicum | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chilli Chicken |
| 95 | Besan + Moong Dal | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Mirapakaya Bajji |
| 96 | Besan + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Mirapakaya Bajji |
| 97 | Besan + Curd | Kadhi Chawal | 244 | None | PASS | Top dish directly uses selected ingredients |
| 98 | Besan + Corn | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Mirapakaya Bajji |
| 99 | Moong Dal + Chana | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Sabudana Khichdi |
| 100 | Moong Dal + Capsicum | No strong match | N/A | N/A | LOW CONFIDENCE | No strong match after strict pantry filter; raw top would be Chilli Chicken |

## Audit Notes

- The current strong-match filter is conservative for two-ingredient selections: it requires both selected ingredients to be primary dish ingredients, and all selected major proteins must be represented.
- This prevents obvious trust failures such as **Wheat + Fish → Egg Paratha**, but it also creates many **LOW CONFIDENCE** no-suggestion cases for plausible pantry pairs where one ingredient is secondary.
- No engine fixes were applied in this phase.
