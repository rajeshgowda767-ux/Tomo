# Beta 2 Quick Guide v1 Top 25 Population Report

Scope:

- `database/generated/recipes.json`
- `local-recipes.js`
- `frontend/local-recipes.js`

No UI, recommendation logic, pantry logic, analytics, memory, feedback, or deployment behavior was changed.

## Files Changed

- `database/generated/recipes.json`
- `local-recipes.js`
- `frontend/local-recipes.js`

The local recipe mirrors were synced because Mobile V2 preview uses local recipe files.

## Data Shape Populated

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

## Dishes Populated

| Requested Dish | Database Dish |
|---|---|
| Pongal | Pongal |
| Khichdi | Khichdi |
| Egg Fried Rice | Egg Fried Rice |
| Veg Fried Rice | Veg Fried Rice |
| Tomato Rice | Tomato Rice |
| Lemon Rice | Lemon Rice |
| Curd Rice | Curd Rice |
| Masala Dosa | Masala Dosa |
| Plain Dosa | Dosa |
| Idli | Idli |
| Upma | Upma |
| Egg Bhurji | Egg Bhurji |
| Paneer Bhurji | Paneer Bhurji |
| Kadai Paneer | Kadai Paneer |
| Chilli Paneer | Chilli Paneer |
| Chicken Curry | Chicken Curry |
| Chicken Pulao | Chicken Pulao |
| Chicken Fried Rice | Chicken Fried Rice |
| Rasam Rice | Rasam Rice |
| Bisi Bele Bath | Bisibelebath |
| Puliyogare | Puliyogare |
| Veg Pulao | Veg Pulao |
| Paneer Pulao | Paneer Pulao |
| Onion Omelette | Onion Omelette |
| Masala Omelette | Masala Omelette |

## Validation Result

```text
JSON parse: PASS
node --check frontend/mobile/mobile-shell.js: PASS
node --check local-recipes.js: PASS
node --check frontend/local-recipes.js: PASS
Target dishes requested: 25
Target dishes populated: 25
Shape validation issues: 0
Core dishes with quickGuide: 25
```

Shape validation checked:

- `serves` is exactly `2`
- `prepTime` is a string
- `cookTime` is a string
- `ingredients` is an array
- `ingredients` has max 8 entries
- `steps` is an array
- `steps` has max 5 entries
- `tip` is a single non-empty string
- `bestWith` is an array

## Manual Review Notes

- `Plain Dosa` was mapped to existing database dish `Dosa`.
- `Bisi Bele Bath` was mapped to existing database dish `Bisibelebath`.
- No target dishes were missing.
- No target guide failed validation.

## Limitations

- Quick Guide UI is not implemented yet.
- Only the requested 25 core dishes were populated.
- No new recipes were added.
