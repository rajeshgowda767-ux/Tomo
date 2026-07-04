# Beta 2 Pairing Data Structure Validation

Status: Foundation only. Pairings are supported as optional dish metadata, but are not displayed or used for scoring yet.

## Supported Shape

```js
pairings: {
  sides: [],
  chutneys: [],
  pickles: [],
  drinks: [],
  rice: [],
  roti: [],
  toppings: []
}
```

## Helpers

- `normalizePairings(pairings)`
- `normalizePairingList(value)`
- `recipePairings(recipe)`
- `recipePairingList(recipe, type)`
- `hasRecipePairings(recipe)`

## Behavior Contract

- Missing `pairings` returns empty arrays for every supported pairing type.
- Invalid `pairings` values return empty arrays.
- String pairing values are normalized into one-item arrays.
- Duplicate pairing labels are removed case-insensitively.
- Existing dishes without pairings continue to work.
- Pairings are not shown in the UI yet.
- Pairings do not affect mood scoring, pantry matching, recommendations, shopping cart, or journal.

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
- No UI surface consumes pairings yet.
- No recommendation or pantry scoring uses pairings yet.
