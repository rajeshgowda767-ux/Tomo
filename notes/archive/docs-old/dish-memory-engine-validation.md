# Dish Memory Engine Validation

Status: Beta 2 local-first validation checklist

This document validates the intended Dish Memory Engine behavior. The engine is local-first and stores interaction events in `localStorage` under `tomo_mobile_v2_dish_memory`.

## Memory Event Shape

Each event stores:

- `dishId`
- `dishName`
- `action`
- `timestamp`
- `source`

Supported actions:

- `saved`
- `cooked`
- `dismissed`

## Scoring

- `cooked`: `+5`
- `saved`: `+3`
- `dismissed`: `-3`

Additional recommendation behavior:

- Dishes dismissed within the last 7 days receive an additional temporary penalty.
- Dishes cooked within the last 5 days are excluded from recommendations.
- Dishes matching top moods, cuisines, ingredients, and meal types receive boosts.

## Validation Checklist

### 1. Save a dish

Expected:

- A `saved` event is written to the memory log.
- The event includes `dishId`, `dishName`, `action`, `timestamp`, and `source`.

Implementation:

- `saveDish(...)` calls `trackDishMemory('saved', ...)`.
- `saveMemory()` persists `tomo_mobile_v2_dish_memory`.

Status: PASS by source inspection.

### 2. Save same dish again

Expected:

- Re-saving the same dish does not create duplicate preference inflation.

Implementation:

- `trackDishMemory(...)` upserts `saved` events by `action:dish`.
- Existing `saved` memory for the same dish is replaced, not duplicated.
- Existing UI Save toggle also avoids calling `saveDish(...)` when already saved.

Status: PASS by source inspection.

### 3. Cook a previously saved dish

Expected:

- Saved + Cooked is intentional.
- A dish can contribute both saved preference and cooked preference.

Implementation:

- `saved` and `cooked` are separate memory actions.
- `saved` contributes `+3`.
- `cooked` contributes `+5`.
- A saved and cooked dish can therefore contribute `+8` total preference signal.
- This is intentional because saving indicates interest, while cooking indicates completed behavior.

Status: PASS by source inspection.

### 4. Dismiss a dish

Expected:

- The dismissed dish disappears from the current visible list or receives reduced score.

Implementation:

- Current session: dismissed Today's Picks are added to `state.dismissedToday`, which removes them from visible Today's Picks.
- Memory: `trackDishMemory('dismissed', ...)` records the dismissal.
- Scoring: dismissed dishes receive `-3`.
- Recent dismissal: if within 7 days, an additional temporary penalty is applied.

Status: PASS by source inspection.

### 5. Waitless timestamp test for dismissal expiry

Expected:

- If a dismissed event timestamp is manually changed to older than 7 days, the temporary dismissal penalty expires.

Implementation:

- `daysSince(timestamp) <= 7` controls the additional recent-dismissal penalty.
- After 7 days, only the base dismissed score remains.

Manual test:

1. Open browser dev tools.
2. Edit `localStorage.tomo_mobile_v2_dish_memory`.
3. Change the dismissed event timestamp to more than 7 days ago.
4. Reload.
5. Confirm the extra recent-dismissal penalty no longer applies.

Status: PASS by source inspection; manual browser timestamp edit still recommended.

### 6. Cook a dish

Expected:

- A dish cooked within the last 5 days is excluded from recommendations.

Implementation:

- `recordCooked(...)` calls `trackDishMemory('cooked', ...)`.
- `memoryExcludedRecipe(...)` excludes any recipe with a matching `cooked` event where `daysSince(timestamp) <= 5`.
- Meal recommendations and default Tomo Pick candidate pools call `memoryExcludedRecipe(...)`.

Status: PASS by source inspection.

### 7. Clear localStorage

Expected:

- App gracefully rebuilds state.

Implementation:

- `readJson(key, fallback)` returns fallback values when localStorage is empty or invalid.
- `normalizeDishMemory(...)` tolerates missing/invalid memory arrays.
- Existing saved/cooked/grocery state already uses fallback-based localStorage loading.

Status: PASS by source inspection.

## Browser Smoke Status

Previous local smoke during implementation verified:

- Save interaction did not crash.
- Cook This interaction did not crash.
- Not For Me interaction did not crash.
- Mobile shell continued rendering.
- No browser console errors were observed.

Full local browser rerun is recommended once the local preview is accessible again.
