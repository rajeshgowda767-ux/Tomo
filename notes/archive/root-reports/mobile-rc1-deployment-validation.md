# Tomo Mobile RC1 Deployment Validation

Date: June 12, 2026

## Result

TOMO MOBILE RC1 READY FOR DEPLOYMENT

## Live Validation

Tested in the in-app browser at:

- `390x844`
- `375x812`
- `/#mobile-v2`
- `/` at the normal desktop viewport

## Checks

| Check | Result |
| --- | --- |
| Header shows time, temperature, and condition on Discover | PASS |
| Header weather is correct on Kitchen and Journal | PASS |
| No duplicate weather block below Moods/Collections | PASS |
| Pantry suggestion card remains fixed-height | PASS |
| Pantry action buttons remain visible at both phone sizes | PASS |
| Pantry card has no percentages or `+XX more dishes` copy | PASS |
| Shopping List naming is visible throughout Kitchen | PASS |
| Add Missing Items updates the Shopping List | PASS |
| Duplicate shopping rows are prevented | PASS |
| Shopping checklist, attribution, and controls remain available | PASS |
| Journal Journey shows three recent horizontal cards | PASS |
| Cooking Insights remains visible | PASS |
| Pantry dish detail has no Cook This or Save actions | PASS |
| Pantry dish detail shows match summary, availability, missing items, reasons, and related dishes | PASS |
| Collection cards use View Dish and open dish detail | PASS |
| Collection detail has no Cook This or Save actions | PASS |
| Collection subcategories render in a 2x2 grid | PASS |
| Collection navigation remains sticky | PASS |
| Bottom navigation has reserved page padding | PASS |
| No horizontal overflow at either phone size | PASS |
| Reduced-motion handling remains present | PASS |
| Browser console errors | PASS - none found |
| Normal desktop route remains on the desktop app | PASS |

## Blocker Fixed During Validation

The Rice + Egg Pantry suggestion initially clipped both action buttons inside the fixed card. The card now uses a stable `150px` height and reserves its final row for actions. `Add Missing` and `View Dish` are fully visible at both tested phone sizes.

## Scope Confirmation

Only Mobile V2 presentation files were changed:

- `frontend/mobile/mobile-shell.js`
- `frontend/mobile/mobile-v2.css`

No mood, pantry, recommendation, grocery, collection, journal data, recipe database, or desktop behavior was changed.
