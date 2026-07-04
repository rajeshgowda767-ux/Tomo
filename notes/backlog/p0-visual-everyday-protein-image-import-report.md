# p0-visual-everyday-protein Image Import Report

Generated: 2026-06-27T10:49:10.784Z
Mode: import
Review folder: `frontend/assets/images/_generated-review/p0-visual-everyday-protein`
Force enabled: no

## Summary

- Files found: 9
- Imported count: 9
- Skipped count: 0
- Recipe mappings updated: 9

## Status Breakdown

| Status | Count |
|---|---:|
| IMPORTABLE_GENERIC | 3 |
| IMPORTABLE_PLACEHOLDER | 6 |

## Files Found

| File | Slug | Status | Recipe | Reason |
|---|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/boiled-corn-snack.png` | `boiled-corn-snack` | IMPORTABLE_GENERIC | Boiled Corn | Current image is a generic/default fallback; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/dal-rice-lunch.png` | `dal-rice-lunch` | IMPORTABLE_PLACEHOLDER | Dal Rice | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/dal-roti-lunch.png` | `dal-roti-lunch` | IMPORTABLE_GENERIC | Dal Roti | Current image is a generic/default fallback; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/egg-curry-rice-lunch.png` | `egg-curry-rice-lunch` | IMPORTABLE_PLACEHOLDER | Egg Curry Rice | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/expansion-pack-1-egg-capsicum-bhurji.png` | `expansion-pack-1-egg-capsicum-bhurji` | IMPORTABLE_GENERIC | Egg Capsicum Bhurji | Current image is a generic/default fallback; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/lunchbox-detail-cheese-veg-sandwich.png` | `lunchbox-detail-cheese-veg-sandwich` | IMPORTABLE_PLACEHOLDER | Cheese Veg Sandwich | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/palak-paneer-lunch.png` | `palak-paneer-lunch` | IMPORTABLE_PLACEHOLDER | Palak Paneer | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/rice-porridge-breakfast.png` | `rice-porridge-breakfast` | IMPORTABLE_PLACEHOLDER | Rice Porridge | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-everyday-protein/side-addon-onion-raita.png` | `side-addon-onion-raita` | IMPORTABLE_PLACEHOLDER | Onion Raita | Current image is a placeholder; safe to replace. |

## Imported Mappings

| Recipe | Source file | Destination | Before | After |
|---|---|---|---|---|
| Boiled Corn | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/boiled-corn-snack.png` | `frontend/assets/images/dishes/boiled-corn-snack.png` | `/assets/images/dishes/dinner-default.png` | `/assets/images/dishes/boiled-corn-snack.png` |
| Dal Rice | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/dal-rice-lunch.png` | `frontend/assets/images/dishes/dal-rice-lunch.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/dal-rice-lunch.png` |
| Dal Roti | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/dal-roti-lunch.png` | `frontend/assets/images/dishes/dal-roti-lunch.png` | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/dal-roti-lunch.png` |
| Egg Curry Rice | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/egg-curry-rice-lunch.png` | `frontend/assets/images/dishes/egg-curry-rice-lunch.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/egg-curry-rice-lunch.png` |
| Egg Capsicum Bhurji | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/expansion-pack-1-egg-capsicum-bhurji.png` | `frontend/assets/images/dishes/expansion-pack-1-egg-capsicum-bhurji.png` | `/assets/images/dishes/dinner-default.png` | `/assets/images/dishes/expansion-pack-1-egg-capsicum-bhurji.png` |
| Cheese Veg Sandwich | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/lunchbox-detail-cheese-veg-sandwich.png` | `frontend/assets/images/dishes/lunchbox-detail-cheese-veg-sandwich.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/lunchbox-detail-cheese-veg-sandwich.png` |
| Palak Paneer | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/palak-paneer-lunch.png` | `frontend/assets/images/dishes/palak-paneer-lunch.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/palak-paneer-lunch.png` |
| Rice Porridge | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/rice-porridge-breakfast.png` | `frontend/assets/images/dishes/rice-porridge-breakfast.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/rice-porridge-breakfast.png` |
| Onion Raita | `frontend/assets/images/_generated-review/p0-visual-everyday-protein/side-addon-onion-raita.png` | `frontend/assets/images/dishes/side-addon-onion-raita.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/side-addon-onion-raita.png` |

## Skipped Files

No files skipped.

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
