# Beta 2 Quick Guide v1 Data Model Validation

Status: Foundation only. Quick Guide metadata is supported as optional dish metadata, but is not populated or displayed yet.

## Supported Shape

```js
quickGuide: {
  serves: 2,
  prepTime: "",
  cookTime: "",
  ingredients: [],
  steps: [],
  tip: "",
  bestWith: []
}
```

## Helpers Added

- `normalizeQuickGuide(quickGuide)`
- `recipeQuickGuide(recipe)`
- `hasQuickGuide(recipe)`

Internal supporting helper:

- `normalizeQuickGuideSteps(value)`

## Behavior Contract

- Missing or invalid `quickGuide` returns safe defaults.
- `serves` defaults to `2` when missing, invalid, or non-positive.
- String `ingredients` normalize into one-item arrays.
- String `bestWith` values normalize into one-item arrays.
- Duplicate `ingredients` and `bestWith` entries are removed case-insensitively.
- `steps` normalize into an array and trim empty entries.
- `tip` is a single trimmed string.
- Existing dishes without `quickGuide` continue working.
- Quick Guide is not shown in the UI yet.
- Quick Guide does not affect recommendation scoring, pantry matching, analytics, memory, feedback, shopping, or deployment.

## Validation Checklist

- `node --check frontend/mobile/mobile-shell.js`: PASS
- Mobile V2 loads at `/#mobile-v2`: PASS
- Tomo Pick still loads: PASS
- Mood selection still works: PASS
- Dish Detail still opens: PASS
- Pantry still opens: PASS
- Save, Cook This, Dismiss, and recommendation feedback still work: PASS
- No browser console errors: PASS
- No horizontal overflow at mobile width: PASS

## Browser Smoke Result

Validated through the Mobile V2 route with a mobile viewport.

Observed:

- Tomo Pick loaded.
- Quick mood selection updated the active mood and pick.
- Save changed to `Saved`.
- Cook This opened Dish Detail.
- Recommendation feedback activated.
- Dismiss replaced a Today's Picks card.
- Kitchen/Pantry opened and Tomo Suggestion remained visible.
- No new console errors.
- No horizontal overflow.

## Limitations

- No recipe guides were populated in this pass.
- No Quick Guide UI was added.
- No new dishes were added.
- No recommendation, pantry, analytics, memory, feedback, deployment, or recipe-data behavior was intentionally changed.
