# p0-visual-global-bowls Image Import Report

Generated: 2026-06-27T11:18:07.098Z
Mode: import
Review folder: `frontend/assets/images/_generated-review/p0-visual-global-bowls`
Force enabled: no

## Summary

- Files found: 8
- Imported count: 7
- Skipped count: 1
- Recipe mappings updated: 7

## Status Breakdown

| Status | Count |
|---|---:|
| IMPORTABLE_GENERIC | 1 |
| IMPORTABLE_PLACEHOLDER | 6 |
| SKIP_DESTINATION_EXISTS | 1 |

## Files Found

| File | Slug | Status | Recipe | Reason |
|---|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/collection-detail-haleem.png` | `collection-detail-haleem` | IMPORTABLE_PLACEHOLDER | Haleem | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/fresh-plates-detail-fruit-chaat.png` | `fresh-plates-detail-fruit-chaat` | IMPORTABLE_PLACEHOLDER | Fruit Chaat | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/fresh-plates-detail-watermelon-mint-salad.png` | `fresh-plates-detail-watermelon-mint-salad` | IMPORTABLE_PLACEHOLDER | Watermelon Mint Salad | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/global-wave-a-bibimbap-bowl.png` | `global-wave-a-bibimbap-bowl` | IMPORTABLE_PLACEHOLDER | Bibimbap Bowl | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/karnataka-wave-a-badanekayi-ennegayi.png` | `karnataka-wave-a-badanekayi-ennegayi` | IMPORTABLE_PLACEHOLDER | Badanekayi Ennegayi | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/rice-porridge-breakfast.png` | `rice-porridge-breakfast` | SKIP_DESTINATION_EXISTS | Rice Porridge | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/schezwan-fried-rice.png` | `schezwan-fried-rice` | IMPORTABLE_GENERIC | Schezwan Fried Rice | Current image is a generic/default fallback; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/tamil-nadu-wave-19-keerai-masiyal.png` | `tamil-nadu-wave-19-keerai-masiyal` | IMPORTABLE_PLACEHOLDER | Keerai Masiyal | Current image is a placeholder; safe to replace. |

## Imported Mappings

| Recipe | Source file | Destination | Before | After |
|---|---|---|---|---|
| Haleem | `frontend/assets/images/_generated-review/p0-visual-global-bowls/collection-detail-haleem.png` | `frontend/assets/images/dishes/collection-detail-haleem.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/collection-detail-haleem.png` |
| Fruit Chaat | `frontend/assets/images/_generated-review/p0-visual-global-bowls/fresh-plates-detail-fruit-chaat.png` | `frontend/assets/images/dishes/fresh-plates-detail-fruit-chaat.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/fresh-plates-detail-fruit-chaat.png` |
| Watermelon Mint Salad | `frontend/assets/images/_generated-review/p0-visual-global-bowls/fresh-plates-detail-watermelon-mint-salad.png` | `frontend/assets/images/dishes/fresh-plates-detail-watermelon-mint-salad.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/fresh-plates-detail-watermelon-mint-salad.png` |
| Bibimbap Bowl | `frontend/assets/images/_generated-review/p0-visual-global-bowls/global-wave-a-bibimbap-bowl.png` | `frontend/assets/images/dishes/global-wave-a-bibimbap-bowl.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/global-wave-a-bibimbap-bowl.png` |
| Badanekayi Ennegayi | `frontend/assets/images/_generated-review/p0-visual-global-bowls/karnataka-wave-a-badanekayi-ennegayi.png` | `frontend/assets/images/dishes/karnataka-wave-a-badanekayi-ennegayi.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/karnataka-wave-a-badanekayi-ennegayi.png` |
| Schezwan Fried Rice | `frontend/assets/images/_generated-review/p0-visual-global-bowls/schezwan-fried-rice.png` | `frontend/assets/images/dishes/schezwan-fried-rice.png` | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/schezwan-fried-rice.png` |
| Keerai Masiyal | `frontend/assets/images/_generated-review/p0-visual-global-bowls/tamil-nadu-wave-19-keerai-masiyal.png` | `frontend/assets/images/dishes/tamil-nadu-wave-19-keerai-masiyal.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/tamil-nadu-wave-19-keerai-masiyal.png` |

## Skipped Files

| File | Status | Recipe | Reason |
|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-visual-global-bowls/rice-porridge-breakfast.png` | SKIP_DESTINATION_EXISTS | Rice Porridge | Recipe already uses this destination image. |

## Protected Dedicated Images

No dedicated images were protected in this run.

## Missing Recipe Matches

No missing recipe matches.

## Validation

Commands to run:

```text
node scripts/validate_recipe_data.js
npm run audit:banter
```

### `node scripts/validate_recipe_data.js`

Exit code: 0

```text
Recipe validation: PASS
PASS 19 | WARNING 0 | FAIL 0
JSON: validation/recipe-validation-report.json
Markdown: validation/recipe-validation-report.md
```

### `npm run audit:banter`

Exit code: 0

```text
> cookbuddy@0.1.0 audit:banter
> node scripts/tomo-banter-audit.js


Tomo Banter Audit Summary
┌─────────┬──────────────────────────┬───────┬──────┬─────────┬────────┬─────────────────┐
│ (index) │ group                    │ count │ keep │ improve │ remove │ makeConditional │
├─────────┼──────────────────────────┼───────┼──────┼─────────┼────────┼─────────────────┤
│ 0       │ 'Mood banters'           │ 241   │ 241  │ 0       │ 0      │ 0               │
│ 1       │ 'Pantry banters'         │ 245   │ 232  │ 8       │ 0      │ 5               │
│ 2       │ 'Recommendation banters' │ 339   │ 337  │ 2       │ 0      │ 0               │
│ 3       │ 'Empty state banters'    │ 20    │ 20   │ 0       │ 0      │ 0               │
│ 4       │ 'Dish detail banters'    │ 31    │ 31   │ 0       │ 0      │ 0               │
│ 5       │ 'Journal banters'        │ 109   │ 109  │ 0       │ 0      │ 0               │
│ 6       │ 'Collection banters'     │ 186   │ 186  │ 0       │ 0      │ 0               │
│ 7       │ 'Button labels'          │ 51    │ 49   │ 2       │ 0      │ 0               │
└─────────┴──────────────────────────┴───────┴──────┴─────────┴────────┴─────────────────┘

Generated banter-audit.json
Generated banter-audit.md
```


## Safety Notes

- Recipe metadata was not modified.
- Collections were not modified.
- Global Bites was not touched.
- Review images were not deleted.
- Existing dedicated images were not overwritten unless `--force` was used.
