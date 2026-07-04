# Beta 2 Regional Tags Foundation Validation

Status: Foundation only. Regional metadata is supported as optional dish metadata, but is not displayed or used for scoring yet.

## Supported Shape

```js
regionTags: {
  region: [],
  subRegion: [],
  cuisine: []
}
```

## Helpers

- `normalizeRegionTags(regionTags)`
- `recipeRegionTags(recipe)`
- `recipeRegions(recipe)`
- `recipeSubRegions(recipe)`
- `recipeCuisines(recipe)`
- `hasRegionTags(recipe)`

## Behavior Contract

- Missing `regionTags` returns empty arrays for every supported regional field.
- Invalid `regionTags` values return empty arrays.
- String regional values are normalized into one-item arrays.
- Duplicate regional labels are removed case-insensitively.
- Existing dishes without regional tags continue to work.
- Regional tags are not shown in the UI yet.
- Regional tags do not affect mood scoring, pantry matching, recommendations, shopping cart, or journal.

## Validation Checklist

- `node --check frontend/mobile/mobile-shell.js`
- Mobile V2 loads at `/#mobile-v2`.
- Tomo Pick still loads.
- Mood selection still updates the active mood and recommendations.
- Dish detail still opens.
- Pantry still opens and Rice + Egg still produces a pantry suggestion.
- Save, Cook This, and Dismiss still work.
- No browser console errors.
- No horizontal overflow at mobile width.

## Limitations

- No recipe database entries were expanded in this pass.
- No UI surface consumes regional tags yet.
- No recommendation, pantry, shopping, or journal behavior uses regional tags yet.
