# Pantry Recommendation Audit

## Summary

| Status | Count |
| --- | ---: |
| PASS | 16 |
| WARN | 73 |
| FAIL | 11 |
| TOTAL | 100 |

## Category Summary

| Category | Total | PASS | WARN | FAIL |
| --- | ---: | ---: | ---: | ---: |
| Rice | 25 | 2 | 19 | 4 |
| Wheat | 15 | 4 | 10 | 1 |
| Dosa/Idli | 10 | 1 | 9 | 0 |
| Paneer | 10 | 0 | 8 | 2 |
| Egg | 10 | 0 | 8 | 2 |
| Chicken | 10 | 0 | 9 | 1 |
| South Indian | 10 | 1 | 9 | 0 |
| Stress | 10 | 8 | 1 | 1 |

## Full Pair Audit

| # | Category | Pantry | Expected | Top Recommendation | Score | Status | Reason |
| ---: | --- | --- | --- | --- | ---: | --- | --- |
| 1 | Rice | Rice + Egg | Egg Fried Rice | Egg Curry Rice | 95 | FAIL | expected Egg Fried Rice, but top recommendation was Egg Curry Rice |
| 2 | Rice | Rice + Tomato | Tomato Rice | Tomato Rice | 95 | PASS | Top recommendation matches expected dish. |
| 3 | Rice | Rice + Onion | Onion Rice | Jeera Rice with Onion Tadka | 95 | FAIL | expected Onion Rice, but top recommendation was Jeera Rice with Onion Tadka |
| 4 | Rice | Rice + Potato | Potato Rice | Aloo Rice | 95 | FAIL | expected Potato Rice, but top recommendation was Aloo Rice |
| 5 | Rice | Rice + Paneer | Paneer Rice | Paneer Fried Rice | 95 | FAIL | expected Paneer Rice, but top recommendation was Paneer Fried Rice |
| 6 | Rice | Rice + Tamarind | Puliyogare | Puliyogare | 95 | PASS | Top recommendation matches expected dish. |
| 7 | Rice | Rice + Lemon | Lemon Rice | Lemon Rice | 95 | WARN | Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily |
| 8 | Rice | Rice + Coconut | Coconut Rice | Coconut Rice | 95 | WARN | Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily |
| 9 | Rice | Rice + Curd | Curd Rice | Curd Rice | 95 | WARN | Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily |
| 10 | Rice | Rice + Peanuts | Peanut Rice | None | 0 | WARN | expected recipe missing from database: Peanut Rice |
| 11 | Rice | Rice + Capsicum | Veg Fried Rice | None | 0 | WARN | no confident top recommendation for expected dish Veg Fried Rice |
| 12 | Rice | Rice + Carrot | Carrot Rice | None | 0 | WARN | expected recipe missing from database: Carrot Rice |
| 13 | Rice | Rice + Beans | Veg Rice | None | 0 | WARN | expected recipe missing from database: Veg Rice |
| 14 | Rice | Rice + Green Peas | Peas Pulao | None | 0 | WARN | expected recipe missing from database: Peas Pulao |
| 15 | Rice | Rice + Mushroom | Mushroom Rice | None | 0 | WARN | expected recipe missing from database: Mushroom Rice |
| 16 | Rice | Rice + Chicken | Chicken Fried Rice | Biryani | 95 | WARN | expected recipe missing from database: Chicken Fried Rice |
| 17 | Rice | Rice + Fish | Fish Rice | Fish Curry Rice | 95 | WARN | expected recipe missing from database: Fish Rice |
| 18 | Rice | Rice + Mutton | Mutton Pulao | None | 0 | WARN | expected recipe missing from database: Mutton Pulao |
| 19 | Rice | Rice + Garlic | Garlic Rice | None | 0 | WARN | expected recipe missing from database: Garlic Rice |
| 20 | Rice | Rice + Coriander | Coriander Rice | None | 0 | WARN | expected recipe missing from database: Coriander Rice |
| 21 | Rice | Rice + Mint | Mint Rice | None | 0 | WARN | expected recipe missing from database: Mint Rice |
| 22 | Rice | Rice + Spinach | Spinach Rice | None | 0 | WARN | expected recipe missing from database: Spinach Rice |
| 23 | Rice | Rice + Beetroot | Beetroot Rice | None | 0 | WARN | expected recipe missing from database: Beetroot Rice |
| 24 | Rice | Rice + Corn | Corn Rice | None | 0 | WARN | expected recipe missing from database: Corn Rice |
| 25 | Rice | Rice + Soya Chunks | Soya Fried Rice | None | 0 | WARN | expected recipe missing from database: Soya Fried Rice |
| 26 | Wheat | Wheat Flour + Potato | Aloo Paratha | Aloo Paratha | 95 | PASS | Top recommendation matches expected dish. |
| 27 | Wheat | Wheat Flour + Onion | Onion Paratha | Onion Paratha | 95 | PASS | Top recommendation matches expected dish. |
| 28 | Wheat | Wheat Flour + Paneer | Paneer Paratha | Paneer Paratha | 95 | PASS | Top recommendation matches expected dish. |
| 29 | Wheat | Wheat Flour + Egg | Egg Paratha | Egg Paratha | 95 | PASS | Top recommendation matches expected dish. |
| 30 | Wheat | Wheat Flour + Spinach | Palak Paratha | Plain Chapati | 66 | WARN | expected recipe missing from database: Palak Paratha |
| 31 | Wheat | Wheat Flour + Methi | Methi Paratha | Mathri | 95 | FAIL | expected Methi Paratha, but top recommendation was Mathri |
| 32 | Wheat | Wheat Flour + Garlic | Garlic Paratha | Plain Chapati | 66 | WARN | expected recipe missing from database: Garlic Paratha |
| 33 | Wheat | Wheat Flour + Beetroot | Beetroot Paratha | Plain Chapati | 66 | WARN | expected recipe missing from database: Beetroot Paratha |
| 34 | Wheat | Wheat Flour + Carrot | Carrot Paratha | Momos | 95 | WARN | expected recipe missing from database: Carrot Paratha |
| 35 | Wheat | Wheat Flour + Radish | Mooli Paratha | Plain Chapati | 66 | WARN | expected recipe missing from database: Mooli Paratha |
| 36 | Wheat | Wheat Flour + Cabbage | Cabbage Paratha | Plain Chapati | 66 | WARN | expected recipe missing from database: Cabbage Paratha |
| 37 | Wheat | Wheat Flour + Cheese | Cheese Paratha | Plain Chapati | 66 | WARN | expected recipe missing from database: Cheese Paratha |
| 38 | Wheat | Wheat Flour + Corn | Corn Paratha | Plain Chapati | 66 | WARN | expected recipe missing from database: Corn Paratha |
| 39 | Wheat | Wheat Flour + Peas | Peas Paratha | Plain Chapati | 66 | WARN | expected recipe missing from database: Peas Paratha |
| 40 | Wheat | Wheat Flour + Jaggery | Sweet Holige | Plain Chapati | 66 | WARN | expected recipe missing from database: Sweet Holige |
| 41 | Dosa/Idli | Dosa Batter + Potato | Masala Dosa | None | 0 | WARN | expected recipe missing from database: Masala Dosa |
| 42 | Dosa/Idli | Dosa Batter + Onion | Onion Dosa | None | 0 | WARN | expected recipe missing from database: Onion Dosa |
| 43 | Dosa/Idli | Dosa Batter + Paneer | Paneer Dosa | None | 0 | WARN | expected recipe missing from database: Paneer Dosa |
| 44 | Dosa/Idli | Dosa Batter + Cheese | Cheese Dosa | None | 0 | WARN | expected recipe missing from database: Cheese Dosa |
| 45 | Dosa/Idli | Dosa Batter + Egg | Egg Dosa | None | 0 | WARN | expected recipe missing from database: Egg Dosa |
| 46 | Dosa/Idli | Idli Batter + Gunpowder | Gunpowder Idli | Gunpowder Idli | 95 | PASS | Top recommendation matches expected dish. |
| 47 | Dosa/Idli | Idli Batter + Onion | Onion Uttapam | None | 0 | WARN | expected recipe missing from database: Onion Uttapam |
| 48 | Dosa/Idli | Idli Batter + Tomato | Tomato Uttapam | None | 0 | WARN | expected recipe missing from database: Tomato Uttapam |
| 49 | Dosa/Idli | Idli Batter + Cheese | Cheese Uttapam | None | 0 | WARN | expected recipe missing from database: Cheese Uttapam |
| 50 | Dosa/Idli | Idli Batter + Vegetable Mix | Vegetable Uttapam | None | 0 | WARN | expected recipe missing from database: Vegetable Uttapam |
| 51 | Paneer | Paneer + Tomato | Paneer Bhurji | Paneer Tikka Masala | 95 | FAIL | expected Paneer Bhurji, but top recommendation was Paneer Tikka Masala |
| 52 | Paneer | Paneer + Onion | Paneer Bhurji | Paneer Bhurji | 95 | WARN | Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily |
| 53 | Paneer | Paneer + Capsicum | Kadai Paneer | Chilli Paneer | 95 | WARN | expected recipe missing from database: Kadai Paneer |
| 54 | Paneer | Paneer + Spinach | Palak Paneer | Palak Paneer | 95 | WARN | Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily |
| 55 | Paneer | Paneer + Peas | Matar Paneer | None | 0 | WARN | expected recipe missing from database: Matar Paneer |
| 56 | Paneer | Paneer + Mushroom | Paneer Mushroom Masala | None | 0 | WARN | expected recipe missing from database: Paneer Mushroom Masala |
| 57 | Paneer | Paneer + Corn | Corn Paneer Masala | None | 0 | WARN | expected recipe missing from database: Corn Paneer Masala |
| 58 | Paneer | Paneer + Rice | Paneer Rice | Paneer Fried Rice | 95 | FAIL | expected Paneer Rice, but top recommendation was Paneer Fried Rice |
| 59 | Paneer | Paneer + Cheese | Cheesy Paneer Tikka | None | 0 | WARN | expected recipe missing from database: Cheesy Paneer Tikka |
| 60 | Paneer | Paneer + Garlic | Garlic Paneer | None | 0 | WARN | expected recipe missing from database: Garlic Paneer |
| 61 | Egg | Egg + Onion | Onion Omelette | Egg Bhurji | 95 | WARN | expected recipe missing from database: Onion Omelette |
| 62 | Egg | Egg + Tomato | Tomato Omelette | None | 0 | WARN | expected recipe missing from database: Tomato Omelette |
| 63 | Egg | Egg + Bread | Egg Toast | Bread Omelette | 95 | FAIL | expected Egg Toast, but top recommendation was Bread Omelette |
| 64 | Egg | Egg + Rice | Egg Fried Rice | Egg Curry Rice | 95 | FAIL | expected Egg Fried Rice, but top recommendation was Egg Curry Rice |
| 65 | Egg | Egg + Cheese | Cheese Omelette | None | 0 | WARN | expected recipe missing from database: Cheese Omelette |
| 66 | Egg | Egg + Capsicum | Masala Omelette | None | 0 | WARN | expected recipe missing from database: Masala Omelette |
| 67 | Egg | Egg + Potato | Spanish Omelette | None | 0 | WARN | expected recipe missing from database: Spanish Omelette |
| 68 | Egg | Egg + Mushroom | Mushroom Omelette | None | 0 | WARN | expected recipe missing from database: Mushroom Omelette |
| 69 | Egg | Egg + Spinach | Spinach Omelette | None | 0 | WARN | expected recipe missing from database: Spinach Omelette |
| 70 | Egg | Egg + Paneer | Paneer Omelette | None | 0 | WARN | expected recipe missing from database: Paneer Omelette |
| 71 | Chicken | Chicken + Onion | Chicken Fry | Andhra Chicken Curry | 95 | WARN | expected recipe missing from database: Chicken Fry |
| 72 | Chicken | Chicken + Tomato | Chicken Curry | Butter Chicken | 95 | FAIL | expected Chicken Curry, but top recommendation was Butter Chicken |
| 73 | Chicken | Chicken + Rice | Chicken Fried Rice | Biryani | 95 | WARN | expected recipe missing from database: Chicken Fried Rice |
| 74 | Chicken | Chicken + Egg | Chicken Egg Fried Rice | None | 0 | WARN | expected recipe missing from database: Chicken Egg Fried Rice |
| 75 | Chicken | Chicken + Potato | Chicken Potato Curry | None | 0 | WARN | expected recipe missing from database: Chicken Potato Curry |
| 76 | Chicken | Chicken + Capsicum | Chilli Chicken | None | 0 | WARN | expected recipe missing from database: Chilli Chicken |
| 77 | Chicken | Chicken + Mushroom | Chicken Mushroom Stir Fry | None | 0 | WARN | expected recipe missing from database: Chicken Mushroom Stir Fry |
| 78 | Chicken | Chicken + Garlic | Garlic Chicken | None | 0 | WARN | expected recipe missing from database: Garlic Chicken |
| 79 | Chicken | Chicken + Coriander | Coriander Chicken | None | 0 | WARN | expected recipe missing from database: Coriander Chicken |
| 80 | Chicken | Chicken + Mint | Mint Chicken | None | 0 | WARN | expected recipe missing from database: Mint Chicken |
| 81 | South Indian | Poha + Onion | Kanda Poha | Avalakki | 95 | WARN | expected recipe missing from database: Kanda Poha |
| 82 | South Indian | Poha + Potato | Batata Poha | None | 0 | WARN | expected recipe missing from database: Batata Poha |
| 83 | South Indian | Poha + Peanuts | Peanut Poha | None | 0 | WARN | expected recipe missing from database: Peanut Poha |
| 84 | South Indian | Rava + Onion | Rava Upma | Instant Rava Upma | 95 | WARN | expected recipe missing from database: Rava Upma |
| 85 | South Indian | Rava + Tomato | Tomato Upma | None | 0 | WARN | expected recipe missing from database: Tomato Upma |
| 86 | South Indian | Rava + Vegetable Mix | Vegetable Upma | None | 0 | WARN | expected recipe missing from database: Vegetable Upma |
| 87 | South Indian | Avalakki + Coconut | Coconut Avalakki | None | 0 | WARN | expected recipe missing from database: Coconut Avalakki |
| 88 | South Indian | Avalakki + Onion | Avalakki Uppittu | Avalakki | 95 | WARN | expected recipe missing from database: Avalakki Uppittu |
| 89 | South Indian | Rice + Tamarind | Puliyogare | Puliyogare | 95 | PASS | Top recommendation matches expected dish. |
| 90 | South Indian | Rice + Curd | Curd Rice | Curd Rice | 95 | WARN | Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily |
| 91 | Stress | Rice + Bread | NO_STRONG_MATCH | None | 0 | PASS | No confident recommendation forced. |
| 92 | Stress | Rice + Paneer | Paneer Rice | Paneer Fried Rice | 95 | FAIL | expected Paneer Rice, but top recommendation was Paneer Fried Rice |
| 93 | Stress | Rice + Jaggery | Sweet Rice | None | 0 | WARN | expected recipe missing from database: Sweet Rice |
| 94 | Stress | Paneer + Coconut | NO_STRONG_MATCH | None | 0 | PASS | No confident recommendation forced. |
| 95 | Stress | Chicken + Jaggery | NO_STRONG_MATCH | None | 0 | PASS | No confident recommendation forced. |
| 96 | Stress | Wheat Flour + Urad Dal | NO_STRONG_MATCH | Plain Chapati | 66 | PASS | No confident recommendation forced. |
| 97 | Stress | Egg + Tamarind | NO_STRONG_MATCH | None | 0 | PASS | No confident recommendation forced. |
| 98 | Stress | Poha + Paneer | NO_STRONG_MATCH | None | 0 | PASS | No confident recommendation forced. |
| 99 | Stress | Fish + Cheese | NO_STRONG_MATCH | None | 0 | PASS | No confident recommendation forced. |
| 100 | Stress | Curd + Bread | NO_STRONG_MATCH | None | 0 | PASS | No confident recommendation forced. |

## Missing Recipes Database Backlog

### Rice + Lemon

- Top recommendation: Lemon Rice
- Recommendation score: 95
- Why WARN instead of PASS: Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily
- Missing likely dishes: None detected
- Suggested database additions: Lemon Rice metadata cleanup

### Rice + Coconut

- Top recommendation: Coconut Rice
- Recommendation score: 95
- Why WARN instead of PASS: Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily
- Missing likely dishes: None detected
- Suggested database additions: Coconut Rice metadata cleanup

### Rice + Curd

- Top recommendation: Curd Rice
- Recommendation score: 95
- Why WARN instead of PASS: Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily
- Missing likely dishes: None detected
- Suggested database additions: Curd Rice metadata cleanup

### Rice + Peanuts

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Peanut Rice
- Missing likely dishes: Peanut Rice
- Suggested database additions: Peanut Rice

### Rice + Capsicum

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: no confident top recommendation for expected dish Veg Fried Rice
- Missing likely dishes: None detected
- Suggested database additions: Veg Fried Rice

### Rice + Carrot

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Carrot Rice
- Missing likely dishes: Carrot Rice
- Suggested database additions: Carrot Rice

### Rice + Beans

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Veg Rice
- Missing likely dishes: Veg Rice
- Suggested database additions: Veg Rice

### Rice + Green Peas

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Peas Pulao
- Missing likely dishes: Peas Pulao
- Suggested database additions: Peas Pulao

### Rice + Mushroom

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Mushroom Rice
- Missing likely dishes: Mushroom Rice
- Suggested database additions: Mushroom Rice

### Rice + Chicken

- Top recommendation: Biryani
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Chicken Fried Rice
- Missing likely dishes: Chicken Fried Rice
- Suggested database additions: Chicken Fried Rice

### Rice + Fish

- Top recommendation: Fish Curry Rice
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Fish Rice
- Missing likely dishes: Fish Rice
- Suggested database additions: Fish Rice

### Rice + Mutton

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Mutton Pulao
- Missing likely dishes: Mutton Pulao
- Suggested database additions: Mutton Pulao

### Rice + Garlic

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Garlic Rice
- Missing likely dishes: Garlic Rice
- Suggested database additions: Garlic Rice

### Rice + Coriander

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Coriander Rice
- Missing likely dishes: Coriander Rice
- Suggested database additions: Coriander Rice

### Rice + Mint

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Mint Rice
- Missing likely dishes: Mint Rice
- Suggested database additions: Mint Rice

### Rice + Spinach

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Spinach Rice
- Missing likely dishes: Spinach Rice
- Suggested database additions: Spinach Rice

### Rice + Beetroot

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Beetroot Rice
- Missing likely dishes: Beetroot Rice
- Suggested database additions: Beetroot Rice

### Rice + Corn

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Corn Rice
- Missing likely dishes: Corn Rice
- Suggested database additions: Corn Rice

### Rice + Soya Chunks

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Soya Fried Rice
- Missing likely dishes: Soya Fried Rice
- Suggested database additions: Soya Fried Rice

### Wheat Flour + Spinach

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Palak Paratha
- Missing likely dishes: Palak Paratha
- Suggested database additions: Palak Paratha

### Wheat Flour + Garlic

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Garlic Paratha
- Missing likely dishes: Garlic Paratha
- Suggested database additions: Garlic Paratha

### Wheat Flour + Beetroot

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Beetroot Paratha
- Missing likely dishes: Beetroot Paratha
- Suggested database additions: Beetroot Paratha

### Wheat Flour + Carrot

- Top recommendation: Momos
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Carrot Paratha
- Missing likely dishes: Carrot Paratha
- Suggested database additions: Carrot Paratha

### Wheat Flour + Radish

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Mooli Paratha
- Missing likely dishes: Mooli Paratha
- Suggested database additions: Mooli Paratha

### Wheat Flour + Cabbage

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Cabbage Paratha
- Missing likely dishes: Cabbage Paratha
- Suggested database additions: Cabbage Paratha

### Wheat Flour + Cheese

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Cheese Paratha
- Missing likely dishes: Cheese Paratha
- Suggested database additions: Cheese Paratha

### Wheat Flour + Corn

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Corn Paratha
- Missing likely dishes: Corn Paratha
- Suggested database additions: Corn Paratha

### Wheat Flour + Peas

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Peas Paratha
- Missing likely dishes: Peas Paratha
- Suggested database additions: Peas Paratha

### Wheat Flour + Jaggery

- Top recommendation: Plain Chapati
- Recommendation score: 66
- Why WARN instead of PASS: expected recipe missing from database: Sweet Holige
- Missing likely dishes: Sweet Holige
- Suggested database additions: Sweet Holige

### Dosa Batter + Potato

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Masala Dosa
- Missing likely dishes: Masala Dosa
- Suggested database additions: Masala Dosa

### Dosa Batter + Onion

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Onion Dosa
- Missing likely dishes: Onion Dosa
- Suggested database additions: Onion Dosa

### Dosa Batter + Paneer

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Paneer Dosa
- Missing likely dishes: Paneer Dosa
- Suggested database additions: Paneer Dosa

### Dosa Batter + Cheese

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Cheese Dosa
- Missing likely dishes: Cheese Dosa
- Suggested database additions: Cheese Dosa

### Dosa Batter + Egg

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Egg Dosa
- Missing likely dishes: Egg Dosa
- Suggested database additions: Egg Dosa

### Idli Batter + Onion

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Onion Uttapam
- Missing likely dishes: Onion Uttapam
- Suggested database additions: Onion Uttapam

### Idli Batter + Tomato

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Tomato Uttapam
- Missing likely dishes: Tomato Uttapam
- Suggested database additions: Tomato Uttapam

### Idli Batter + Cheese

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Cheese Uttapam
- Missing likely dishes: Cheese Uttapam
- Suggested database additions: Cheese Uttapam

### Idli Batter + Vegetable Mix

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Vegetable Uttapam
- Missing likely dishes: Vegetable Uttapam
- Suggested database additions: Vegetable Uttapam

### Paneer + Onion

- Top recommendation: Paneer Bhurji
- Recommendation score: 95
- Why WARN instead of PASS: Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily
- Missing likely dishes: None detected
- Suggested database additions: Paneer Bhurji metadata cleanup

### Paneer + Capsicum

- Top recommendation: Chilli Paneer
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Kadai Paneer
- Missing likely dishes: Kadai Paneer
- Suggested database additions: Kadai Paneer

### Paneer + Spinach

- Top recommendation: Palak Paneer
- Recommendation score: 95
- Why WARN instead of PASS: Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily
- Missing likely dishes: None detected
- Suggested database additions: Palak Paneer metadata cleanup

### Paneer + Peas

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Matar Paneer
- Missing likely dishes: Matar Paneer
- Suggested database additions: Matar Paneer

### Paneer + Mushroom

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Paneer Mushroom Masala
- Missing likely dishes: Paneer Mushroom Masala
- Suggested database additions: Paneer Mushroom Masala

### Paneer + Corn

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Corn Paneer Masala
- Missing likely dishes: Corn Paneer Masala
- Suggested database additions: Corn Paneer Masala

### Paneer + Cheese

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Cheesy Paneer Tikka
- Missing likely dishes: Cheesy Paneer Tikka
- Suggested database additions: Cheesy Paneer Tikka

### Paneer + Garlic

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Garlic Paneer
- Missing likely dishes: Garlic Paneer
- Suggested database additions: Garlic Paneer

### Egg + Onion

- Top recommendation: Egg Bhurji
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Onion Omelette
- Missing likely dishes: Onion Omelette
- Suggested database additions: Onion Omelette

### Egg + Tomato

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Tomato Omelette
- Missing likely dishes: Tomato Omelette
- Suggested database additions: Tomato Omelette

### Egg + Cheese

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Cheese Omelette
- Missing likely dishes: Cheese Omelette
- Suggested database additions: Cheese Omelette

### Egg + Capsicum

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Masala Omelette
- Missing likely dishes: Masala Omelette
- Suggested database additions: Masala Omelette

### Egg + Potato

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Spanish Omelette
- Missing likely dishes: Spanish Omelette
- Suggested database additions: Spanish Omelette

### Egg + Mushroom

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Mushroom Omelette
- Missing likely dishes: Mushroom Omelette
- Suggested database additions: Mushroom Omelette

### Egg + Spinach

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Spinach Omelette
- Missing likely dishes: Spinach Omelette
- Suggested database additions: Spinach Omelette

### Egg + Paneer

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Paneer Omelette
- Missing likely dishes: Paneer Omelette
- Suggested database additions: Paneer Omelette

### Chicken + Onion

- Top recommendation: Andhra Chicken Curry
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Chicken Fry
- Missing likely dishes: Chicken Fry
- Suggested database additions: Chicken Fry

### Chicken + Rice

- Top recommendation: Biryani
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Chicken Fried Rice
- Missing likely dishes: Chicken Fried Rice
- Suggested database additions: Chicken Fried Rice

### Chicken + Egg

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Chicken Egg Fried Rice
- Missing likely dishes: Chicken Egg Fried Rice
- Suggested database additions: Chicken Egg Fried Rice

### Chicken + Potato

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Chicken Potato Curry
- Missing likely dishes: Chicken Potato Curry
- Suggested database additions: Chicken Potato Curry

### Chicken + Capsicum

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Chilli Chicken
- Missing likely dishes: Chilli Chicken
- Suggested database additions: Chilli Chicken

### Chicken + Mushroom

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Chicken Mushroom Stir Fry
- Missing likely dishes: Chicken Mushroom Stir Fry
- Suggested database additions: Chicken Mushroom Stir Fry

### Chicken + Garlic

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Garlic Chicken
- Missing likely dishes: Garlic Chicken
- Suggested database additions: Garlic Chicken

### Chicken + Coriander

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Coriander Chicken
- Missing likely dishes: Coriander Chicken
- Suggested database additions: Coriander Chicken

### Chicken + Mint

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Mint Chicken
- Missing likely dishes: Mint Chicken
- Suggested database additions: Mint Chicken

### Poha + Onion

- Top recommendation: Avalakki
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Kanda Poha
- Missing likely dishes: Kanda Poha
- Suggested database additions: Kanda Poha

### Poha + Potato

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Batata Poha
- Missing likely dishes: Batata Poha
- Suggested database additions: Batata Poha

### Poha + Peanuts

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Peanut Poha
- Missing likely dishes: Peanut Poha
- Suggested database additions: Peanut Poha

### Rava + Onion

- Top recommendation: Instant Rava Upma
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Rava Upma
- Missing likely dishes: Rava Upma
- Suggested database additions: Rava Upma

### Rava + Tomato

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Tomato Upma
- Missing likely dishes: Tomato Upma
- Suggested database additions: Tomato Upma

### Rava + Vegetable Mix

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Vegetable Upma
- Missing likely dishes: Vegetable Upma
- Suggested database additions: Vegetable Upma

### Avalakki + Coconut

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Coconut Avalakki
- Missing likely dishes: Coconut Avalakki
- Suggested database additions: Coconut Avalakki

### Avalakki + Onion

- Top recommendation: Avalakki
- Recommendation score: 95
- Why WARN instead of PASS: expected recipe missing from database: Avalakki Uppittu
- Missing likely dishes: Avalakki Uppittu
- Suggested database additions: Avalakki Uppittu

### Rice + Curd

- Top recommendation: Curd Rice
- Recommendation score: 95
- Why WARN instead of PASS: Top recommendation matches expected dish.; top recommendation metadata needs cleanup: missing coreIngredients, missing requiredIngredients, missing baseIngredient, missing dishFamily
- Missing likely dishes: None detected
- Suggested database additions: Curd Rice metadata cleanup

### Rice + Jaggery

- Top recommendation: None
- Recommendation score: 0
- Why WARN instead of PASS: expected recipe missing from database: Sweet Rice
- Missing likely dishes: Sweet Rice
- Suggested database additions: Sweet Rice


## Recommendation Logic Issues

### Rice + Egg

- Expected: Egg Fried Rice
- Top recommendation: Egg Curry Rice
- Recommendation score: 95
- Top 3: Egg Curry Rice (95%) | Egg Fried Rice (95%)
- Issue: expected Egg Fried Rice, but top recommendation was Egg Curry Rice

### Rice + Onion

- Expected: Onion Rice
- Top recommendation: Jeera Rice with Onion Tadka
- Recommendation score: 95
- Top 3: Jeera Rice with Onion Tadka (95%) | Masala Rice (95%) | Onion Rice (95%)
- Issue: expected Onion Rice, but top recommendation was Jeera Rice with Onion Tadka

### Rice + Potato

- Expected: Potato Rice
- Top recommendation: Aloo Rice
- Recommendation score: 95
- Top 3: Aloo Rice (95%) | Masala Rice with Potato (95%) | Potato Rice (95%)
- Issue: expected Potato Rice, but top recommendation was Aloo Rice

### Rice + Paneer

- Expected: Paneer Rice
- Top recommendation: Paneer Fried Rice
- Recommendation score: 95
- Top 3: Paneer Fried Rice (95%) | Paneer Pulao (95%) | Paneer Rice (95%)
- Issue: expected Paneer Rice, but top recommendation was Paneer Fried Rice

### Wheat Flour + Methi

- Expected: Methi Paratha
- Top recommendation: Mathri
- Recommendation score: 95
- Top 3: Mathri (95%) | Methi Paratha (95%)
- Issue: expected Methi Paratha, but top recommendation was Mathri

### Paneer + Tomato

- Expected: Paneer Bhurji
- Top recommendation: Paneer Tikka Masala
- Recommendation score: 95
- Top 3: Paneer Tikka Masala (95%)
- Issue: expected Paneer Bhurji, but top recommendation was Paneer Tikka Masala

### Paneer + Rice

- Expected: Paneer Rice
- Top recommendation: Paneer Fried Rice
- Recommendation score: 95
- Top 3: Paneer Fried Rice (95%) | Paneer Pulao (95%) | Paneer Rice (95%)
- Issue: expected Paneer Rice, but top recommendation was Paneer Fried Rice

### Egg + Bread

- Expected: Egg Toast
- Top recommendation: Bread Omelette
- Recommendation score: 95
- Top 3: Bread Omelette (95%) | Egg Toast (95%)
- Issue: expected Egg Toast, but top recommendation was Bread Omelette

### Egg + Rice

- Expected: Egg Fried Rice
- Top recommendation: Egg Curry Rice
- Recommendation score: 95
- Top 3: Egg Curry Rice (95%) | Egg Fried Rice (95%)
- Issue: expected Egg Fried Rice, but top recommendation was Egg Curry Rice

### Chicken + Tomato

- Expected: Chicken Curry
- Top recommendation: Butter Chicken
- Recommendation score: 95
- Top 3: Butter Chicken (95%) | Chicken Curry (95%) | Chicken Roll (95%)
- Issue: expected Chicken Curry, but top recommendation was Butter Chicken

### Rice + Paneer

- Expected: Paneer Rice
- Top recommendation: Paneer Fried Rice
- Recommendation score: 95
- Top 3: Paneer Fried Rice (95%) | Paneer Pulao (95%) | Paneer Rice (95%)
- Issue: expected Paneer Rice, but top recommendation was Paneer Fried Rice

