# Tomo Launch Readiness Audit

Date: 2026-06-11
Scope: Current local build, 1280x720 desktop and 390x844 mobile
Code changes: None

## Overall Result

**NOT READY FOR USER TESTING**

First-time comprehension: **7/10**

The core pantry flow is understandable and recommendations surface quickly, but two behavioral defects violate the launch success criteria: pantry coverage can omit a core ingredient, and closing a recipe opened from a curated pantry card loses the visible pantry context.

## Audit 1 - Recommendation Language

Overall: **FAIL**

### Phrase Search

| Status | Phrase | Result |
|---|---|---|
| PASS | 100% Match | No occurrence found |
| PASS | Perfect Match | No occurrence found |
| PASS | Complete Match | No occurrence found |
| WARN | You have all ingredients | Six source occurrences across three components and two mirrored app files |

### Occurrences

| Status | File | Component | Displayed text | Triggering condition |
|---|---|---|---|---|
| WARN | `frontend/app.js:3468` | Curated pantry result card | You have all ingredients | `match.hasAllRecipeIngredients` is true |
| WARN | `app.js:3463` | Curated pantry result card | You have all ingredients | Same condition in mirrored app |
| WARN | `frontend/app.js:3724` | Instant best-match card | You have all ingredients | `best.hasAllRecipeIngredients` is true |
| WARN | `app.js:3719` | Instant best-match card | You have all ingredients | Same condition in mirrored app |
| WARN | `frontend/app.js:4053` | Recipe detail pantry summary | You have all ingredients | `match.hasAllRecipeIngredients === true` |
| WARN | `app.js:4001` | Recipe detail pantry summary | You have all ingredients | Same condition in mirrored app |

### Verification

- **PASS:** Core ingredients alone do not generally trigger “You have all ingredients.”
- **PASS:** Missing optional ingredients normally prevent the complete-ingredients claim.
- **FAIL:** Coverage uses `requiredIngredients + optionalIngredients` but does not always include every `coreIngredient`.
- **FAIL:** Veg Fried Rice has core ingredients `rice + onion`, but onion is absent from its required and optional coverage denominator. The app can therefore report complete pantry coverage while onion is missing.
- **WARN:** Chicken + Egg correctly shows “Add rice to make Chicken Fried Rice” in the instant preview, but the recipe-detail prompt prioritizes missing optional ingredients before missing required ingredients.

Recommended language:

- `Key ingredients match`
- `2 of 6 ingredients available`
- `Add onion and garlic for a stronger match`

## Audit 2 - Pantry Results Visibility

Overall: **PASS with mobile WARN**

| Check | Status | Finding |
|---|---|---|
| Recommendation visible after second ingredient | PASS | Instant best match appears immediately on desktop and mobile |
| Scroll required to discover first result | PASS | The best match is surfaced before the full result list |
| Visual feedback after selection | PASS | Selected chips, count, Tomo message, match state, coverage and CTA update |
| Recommendation count visible | PASS | Button displays `Show 2 Dishes`; result copy displays `I found 2 good ideas` |
| Full results surfaced | PASS | Clicking the count button scrolls the dialog to recommendations |
| Mobile result readability | WARN | Horizontal two-card layout clips the second card at 390 px and relies on horizontal scrolling |

Observed example after Rice + Egg:

- `I found dishes for Rice + Egg`
- `Strong match`
- `Egg Fried Rice`
- `2 of 7 ingredients available`
- `Show 2 Dishes`

## Audit 3 - Empty States

Overall: **PASS with copy repetition WARN**

### No Ingredients Selected

- `What's in your kitchen today? Pick your ingredients and I'll suggest real dishes.`
- `Selected ingredients will appear here.`
- `Tell Tomo what's in your kitchen.`

Status: **PASS** - explains the action, though the same instruction appears repeatedly.

### One Ingredient Selected

- `Nice start. Add one more ingredient and I can suggest better dishes.`
- The same sentence appears in both the modal message and instant preview.

Status: **PASS** - helpful next step; duplicate messaging is unnecessary.

### No Valid Dish Match

- `No strong match yet. Add one more ingredient to unlock better dishes.`
- `Add one more ingredient to unlock better dishes.`
- For rice combinations: `Add tomato, potato, egg, curd, or lemon for better rice dishes.`

Status: **PASS** - clear reason and next step.

### Unusual Combination

- `Unusual combo. These ingredients don't usually form a dish together.`
- `These ingredients don't usually form a dish together. Try adding rice, jaggery, coconut, or curd.`

Status: **PASS** - helpful and specific, but repeated twice.

### Other Empty Copy

- Global search: `No dishes found yet.`

Status: **WARN** - acceptable for search, but it offers no next step.

## Audit 4 - Modal Close Behavior

Overall: **FAIL**

### Prominent Best-Match Route

Flow: Pantry -> `View Dish` -> Close

- Remains on pantry: PASS
- Selected ingredients preserved: PASS
- Recommendations preserved: PASS
- Accidental navigation home: PASS

### Curated Result Card Route

Flow: Pantry -> Show dishes -> tap curated card -> Close

- Remains on pantry: FAIL
- Selected ingredients preserved in memory: PASS
- Recommendations visibly restored: FAIL
- Accidental return to home screen: FAIL

Cause: the scoped pantry handler opens the recipe with `returnToPantry`, then the event bubbles to the global `[data-recipe-id]` handler, which opens it again without return context.

Relevant locations:

- `frontend/app.js:4475` - pantry result handler sets return context.
- `frontend/app.js:4582` - global card handler overwrites it.
- `frontend/app.js:4316` - close can restore pantry only when return context survives.

## Audit 5 - First-Time User Test

Rating: **7/10**

Within 30 seconds, a user can understand that Tomo recommends dishes based on mood. The pantry-based value proposition is less obvious because Pantry is only exposed in the bottom navigation.

### Clear

- `Food for Every Mood`
- Mood choices are recognizable.
- Today's Picks and recipe cards communicate food discovery.
- Pantry becomes understandable immediately after opening it.

### Confusing or Unclear

- `Tap to reveal` does not say what will be revealed.
- The first screen emphasizes mood, weather, collections and journal before explaining the broader Tomo promise.
- `Voice` and `Scan` look operational but currently lead to prototype notices.
- `Tomo Journal` is prominent despite being marked coming soon.

### Hidden Actions

- Pantry recommendations based on available ingredients are not explained on the home screen.
- Curated result cards are clickable but do not look as explicit as the `View Dish` button.
- Mobile result cards require horizontal scrolling without a strong affordance.

### Duplicate Messaging

- Pantry subtitle, Tomo message, section title and preview repeat the same kitchen-selection instruction.
- One-ingredient and unusual-combination messages appear twice.

## Final Priority Report

### Launch Blockers

1. Fix curated pantry card close behavior so closing the dish always restores the pantry recommendation view.
2. Include all core ingredients in pantry coverage and complete-ingredient calculations.

### High Priority

1. In recipe details, prioritize missing required ingredients over optional suggestions. Chicken + Egg must continue to say `Add rice to make Chicken Fried Rice`.
2. Verify “You have all ingredients” against the full normalized recipe ingredient set after correcting the coverage denominator.

### Medium Priority

1. Improve the 390 px results layout so the second result is not visibly clipped.
2. Reduce repeated pantry instructions to one primary message and one contextual status.
3. Clarify the home-page value proposition to mention both mood and pantry recommendations.

### Nice To Have

1. Replace `Tap to reveal` with a clearer action such as `Reveal Tomo's pick`.
2. Add guidance to the global search empty state.
3. Mark Voice, Scan and Journal more clearly as preview or coming-soon features during testing.

## Success Criteria

| Criterion | Result |
|---|---|
| No incorrect recommendation messaging | FAIL |
| Recommendations visible without hunting | PASS |
| Empty states guide users | PASS |
| Closing modal keeps user context | FAIL |
| Value proposition understood within 30 seconds | PASS, mood-first only |

