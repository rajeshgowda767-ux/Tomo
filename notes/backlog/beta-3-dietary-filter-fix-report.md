# Beta 3 Dietary Filter Fix Report

Generated: 2026-06-24
Branch: beta-3-active-development

## Executive Summary

Fixed the P0 mobile dietary filtering bug without changing recipe data.

The mobile app now recognizes these dietary forms correctly:

- `vegetarian` → `vegetarian`
- `eggitarian` → `egg`
- `eggetarian` → `egg`
- `egg` → `egg`
- `non-vegetarian` → `non_vegetarian`
- `non_vegetarian` → `non_vegetarian`
- `Non Vegetarian` → `non_vegetarian`
- `Non-Vegetarian` → `non_vegetarian`
- `non veg` → `non_vegetarian`
- `nonveg` → `non_vegetarian`

## Root Cause

The mobile dietary normalizer used the shared `norm()` helper before validation.

`norm()` intentionally converts underscores and hyphens into spaces:

- `non_vegetarian` became `non vegetarian`
- then the code checked against allowed value `non_vegetarian`
- result: `non_vegetarian` was rejected

That broke:

- veg-only hard filtering
- non-veg detection
- dietary recommendation scoring
- Tomo Pick / Today's Picks dietary safety
- Pantry dietary safety
- Mood recommendation dietary safety

## Fix

Added a dedicated dietary tag canonicalizer in `frontend/mobile/mobile-shell.js`.

The new helper:

1. Lowercases safely.
2. Converts punctuation, spaces, hyphens, and underscores into one canonical underscore format.
3. Applies aliases before allowed-value validation.
4. Keeps internal recommendation logic using canonical tags:
   - `vegetarian`
   - `egg`
   - `non_vegetarian`
   - `no_onion_no_garlic`
   - `jain`

## Files Changed

- `frontend/mobile/mobile-shell.js`
- `notes/backlog/beta-3-dietary-filter-fix-report.md`

No recipe records were rewritten.

## Before / After Counts

| Check | Before | After |
|---|---:|---:|
| Exact `non_vegetarian` catalog tags detected | 0 / 109 | 109 / 109 |
| Total non-veg tags detected, including defensive aliases | 0 | 120 |
| Egg tags detected | 22 | 22 |
| Broken image paths introduced | 0 | 0 |

Note: the catalog has 109 exact `non_vegetarian` tags. The fixed normalizer also catches 11 older/alternate `non-vegetarian` style tags, so the safer total recognized non-veg count is 120.

## Surface Verification

| Surface | Result | Notes |
|---|---:|---|
| Tomo Pick | PASS | Uses shared `recommendationHardFilters()` and `recommendationDietaryScore()`, now backed by fixed dietary tags. |
| Today's Picks | PASS | Same hard filters now correctly reject non-veg in veg-only contexts. |
| Pantry | PASS | Pantry hard filters now correctly detect non-veg and egg dishes. |
| Mood recommendations | PASS | Mood scoring and dietary scoring now receive canonical dietary tags. |
| Collections filtering | PASS | Collections do not rewrite dietary tags; browse safety unaffected. |
| Regional Journeys filtering | PASS | Regional coverage logic is independent of dietary tags; no regression. |

## Scenario Validation

### Veg-only lunch

- Candidate count: 249
- Non-veg leakage: 0
- Sample:
  - Akki Roti
  - Aloo Rice
  - Milk Toast
  - Aloo Paratha
  - Andhra Podi Idli
  - Appam
  - Avalakki
  - Batata Poha

### Egg-friendly breakfast

- Candidate count: 131
- Non-veg leakage: 0
- Sample:
  - Akki Roti
  - Milk Toast
  - Aloo Paratha
  - Andhra Podi Idli
  - Appam
  - Avalakki
  - Batata Poha
  - Ragi Rotti

### Non-veg dinner

- Candidate count: 103
- Leakage / misclassification found: 0
- Sample:
  - Andhra Chicken Curry
  - Andhra Kodi Vepudu
  - Assamese Duck Curry
  - Bamboo Shoot Pork
  - Butter Chicken
  - Chicken Capsicum Stir Fry Bowl
  - Chettinad Chicken Curry
  - Chicken Curry

## Validation Commands

`node scripts/validate_recipe_data.js`

- Result: PASS
- Summary: PASS 19 / WARNING 0 / FAIL 0

`npm run audit:banter`

- Result: PASS
- No blocking banter audit issues.

## Remaining Notes

This fixes the normalization bug only.

Separate P1 data-quality work still remains for egg classification precision. Some egg-associated dishes are not tagged `egg`, so egg-friendly ranking can be improved later without blocking this P0 dietary safety fix.
