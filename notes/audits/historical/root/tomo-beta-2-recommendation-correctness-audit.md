# Tomo Beta 2 Recommendation Correctness Audit

Status: PASS WITH DATA GAPS

Date: 2026-06-15

## Summary

The core recommendation correctness checks are passing after one pantry trust fix. No UI redesign was made.

Pantry logic now avoids promoting support/variant recipes ahead of core pantry matches. The blocker found during validation was:

- Rice + Paneer + Tomato previously ranked `Tomato Paneer Rice` above canonical paneer rice/pulao matches.
- After the fix, the ranking is `Paneer Fried Rice`, `Paneer Pulao`, `Tomato Rice`.

## Files Changed

- `frontend/mobile/mobile-shell.js`
- `database/generated/recipes.json`
- `local-recipes.js`
- `frontend/local-recipes.js`

## Correctness Fix Applied

### Pantry Core Recipe Guard

Pantry recommendations now rank only recipes with:

- `recipeType: "core"` or
- `recipe_type: "core"`

This prevents narrow expansion/support variants from crowding out trusted pantry matches.

### Tomato Paneer Rice Reclassified

`Tomato Paneer Rice` was changed from core to support in:

- `database/generated/recipes.json`
- `local-recipes.js`
- `frontend/local-recipes.js`

It remains available as recipe data, but it is no longer promoted as a core pantry match.

## Pantry Validation

Focused pantry regression test: PASS

Key validated examples:

- Rice + Tomato -> Tomato Rice
- Rice + Potato -> Veg Pulao
- Rice + Onion -> Onion Rice, Veg Fried Rice
- Rice + Paneer -> Paneer Fried Rice, Paneer Pulao
- Rice + Paneer + Tomato -> Paneer Fried Rice, Paneer Pulao, Tomato Rice
- Wheat Flour + Fish -> no strong match
- Fish + Wheat Flour -> no strong match
- Fish + Tamarind -> Fish Curry
- Fish + Kokum -> Kerala Fish Curry

Full pantry audit:

- Total pairs: 103
- PASS: 71
- FAIL: 0
- Ranking improvement: 3
- Low confidence: 1
- Missing recipe/data gaps: 28

## Remaining Pantry Ranking Improvements

These are not hard failures, but may feel less ideal:

- Rice + Coconut: top result is `Appam`; expected semantic target is `Coconut Rice`.
- Egg + Onion: top result is `Egg Bhurji`; expected semantic target is `Onion Omelette`.
- Chicken + Onion: top result is `Andhra Chicken Curry`; expected semantic target is `Chicken Fry`.

## Missing Dishes / Data Gaps

These gaps explain most LOW CONFIDENCE or MISSING_RECIPE results:

- Carrot Rice
- Veg Rice
- Garlic Rice
- Coriander Rice
- Mint Rice
- Spinach Rice
- Beetroot Rice
- Corn Rice
- Soya Fried Rice
- Garlic Paratha
- Beetroot Paratha
- Carrot Paratha
- Cabbage Paratha
- Corn Paratha
- Peas Paratha
- Corn Paneer Masala
- Cheesy Paneer Tikka
- Garlic Paneer
- Spinach Omelette
- Paneer Omelette
- Coriander Chicken
- Mint Chicken
- Kanda Poha
- Peanut Poha
- Rava Upma
- Tomato Upma
- Vegetable Upma
- Coconut Avalakki
- Avalakki Uppittu

## Mood Matching Audit

Active mood curation checks:

- Comfort top 10 is homestyle: Khichdi, Curd Rice, Pongal, Dal Rice, Rasam Rice, Sambar Rice, Rajma Chawal, Chole Chawal, Dal Makhani, Palak Paneer.
- Soul Food has no spicy/idli/dosa leak exclusions.
- High Protein has no carb-first or snack/sweet leaks.
- Quick & Easy excludes duplicated omelette/uttapam/dosa variants as intended.
- Spicy Food is identity-based; demoted review items are not present.
- Rainy Day follows the curated mapping.

Rainy Day mapping:

- Breakfast: Pongal, Upma, Masala Dosa, Ragi Porridge
- Lunch: Khichdi, Rasam Rice, Sambar Rice, Bisibelebath
- Dinner: Masala Dosa, Onion Uttapam, Aloo Paratha, Methi Paratha, Thukpa
- Snacks: Pakora, Bread Pakora, Mirchi Bajji, Masala Chai

## Dish Detail / Ingredient Audit

- Duplicate titles: 0
- Missing ingredient arrays: 0
- Missing required ingredient metadata: 0
- Semantic missing mood metadata: 0
- Semantic missing meal metadata: 0

`Add to Shopping List` uses required missing ingredients only. Optional/nice-to-have ingredients are not auto-added.

Shopping list attribution remains compact:

- `Garlic · Veg Fried Rice`
- Multiple dishes merge into one row, e.g. `Garlic · Veg Fried Rice, Paneer Pulao`

## Validation Commands

Passed:

- `node --check frontend/mobile/mobile-shell.js`
- `node --check local-recipes.js`
- `node --check frontend/local-recipes.js`
- JSON parse for `database/generated/recipes.json`
- `node scripts/pantry-ranking-tests.js`
- `node scripts/pantry-recommendation-audit.js`

## Final Verdict

PASS WITH DATA GAPS

Tomo Beta 2 recommendation correctness is safe for tester release, with the caveat that the missing dish backlog should be prioritized next to reduce low-confidence pantry cases.
