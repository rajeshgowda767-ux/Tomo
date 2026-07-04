# p0-visual-snacks-sides Image Import Report

Generated: 2026-06-27T10:53:07.969Z
Mode: import
Review folder: `frontend/assets/images/_generated-review/p0-visual-snacks-sides`
Force enabled: no

## Summary

- Files found: 8
- Imported count: 5
- Skipped count: 3
- Recipe mappings updated: 5

## Status Breakdown

| Status | Count |
|---|---:|
| IMPORTABLE_PLACEHOLDER | 5 |
| SKIP_DESTINATION_EXISTS | 3 |

## Files Found

| File | Slug | Status | Recipe | Reason |
|---|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/boiled-corn-snack.png` | `boiled-corn-snack` | SKIP_DESTINATION_EXISTS | Boiled Corn | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/ladoo-festival.png` | `ladoo-festival` | IMPORTABLE_PLACEHOLDER | Ladoo | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/lunchbox-detail-cheese-veg-sandwich.png` | `lunchbox-detail-cheese-veg-sandwich` | SKIP_DESTINATION_EXISTS | Cheese Veg Sandwich | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/lunchbox-detail-veg-cutlet.png` | `lunchbox-detail-veg-cutlet` | IMPORTABLE_PLACEHOLDER | Veg Cutlet | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/mirchi-bajji.png` | `mirchi-bajji` | IMPORTABLE_PLACEHOLDER | Mirchi Bajji | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/mirchi-ka-salan.png` | `mirchi-ka-salan` | IMPORTABLE_PLACEHOLDER | Mirchi Ka Salan | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/paneer-pakora-snack.png` | `paneer-pakora-snack` | IMPORTABLE_PLACEHOLDER | Paneer Pakora | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/side-addon-onion-raita.png` | `side-addon-onion-raita` | SKIP_DESTINATION_EXISTS | Onion Raita | Recipe already uses this destination image. |

## Imported Mappings

| Recipe | Source file | Destination | Before | After |
|---|---|---|---|---|
| Ladoo | `frontend/assets/images/_generated-review/p0-visual-snacks-sides/ladoo-festival.png` | `frontend/assets/images/dishes/ladoo-festival.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/ladoo-festival.png` |
| Veg Cutlet | `frontend/assets/images/_generated-review/p0-visual-snacks-sides/lunchbox-detail-veg-cutlet.png` | `frontend/assets/images/dishes/lunchbox-detail-veg-cutlet.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/lunchbox-detail-veg-cutlet.png` |
| Mirchi Bajji | `frontend/assets/images/_generated-review/p0-visual-snacks-sides/mirchi-bajji.png` | `frontend/assets/images/dishes/mirchi-bajji.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/mirchi-bajji.png` |
| Mirchi Ka Salan | `frontend/assets/images/_generated-review/p0-visual-snacks-sides/mirchi-ka-salan.png` | `frontend/assets/images/dishes/mirchi-ka-salan.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/mirchi-ka-salan.png` |
| Paneer Pakora | `frontend/assets/images/_generated-review/p0-visual-snacks-sides/paneer-pakora-snack.png` | `frontend/assets/images/dishes/paneer-pakora-snack.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/paneer-pakora-snack.png` |

## Skipped Files

| File | Status | Recipe | Reason |
|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/boiled-corn-snack.png` | SKIP_DESTINATION_EXISTS | Boiled Corn | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/lunchbox-detail-cheese-veg-sandwich.png` | SKIP_DESTINATION_EXISTS | Cheese Veg Sandwich | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-visual-snacks-sides/side-addon-onion-raita.png` | SKIP_DESTINATION_EXISTS | Onion Raita | Recipe already uses this destination image. |

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
