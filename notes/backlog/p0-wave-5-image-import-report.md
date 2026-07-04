# p0-wave-5 Image Import Report

Generated: 2026-06-25T17:11:11.225Z
Mode: import
Review folder: `frontend/assets/images/_generated-review/p0-wave-5`
Force enabled: no

## Summary

- Files found: 10
- Imported count: 9
- Skipped count: 1
- Recipe mappings updated: 9

## Status Breakdown

| Status | Count |
|---|---:|
| IMPORTABLE_GENERIC | 7 |
| IMPORTABLE_PLACEHOLDER | 2 |
| SKIP_DESTINATION_EXISTS | 1 |

## Files Found

| File | Slug | Status | Recipe | Reason |
|---|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-wave-5/aloo-paratha.png` | `aloo-paratha` | SKIP_DESTINATION_EXISTS | Aloo Paratha | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-5/assamese-duck-curry.png` | `assamese-duck-curry` | IMPORTABLE_GENERIC | Assamese Duck Curry | Current image is on the known generic/shared debt list; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-5/bai.png` | `bai` | IMPORTABLE_GENERIC | Bai | Catalog health audit classified this image as shared/generic debt. |
| `frontend/assets/images/_generated-review/p0-wave-5/black-sesame-chicken.png` | `black-sesame-chicken` | IMPORTABLE_GENERIC | Black Sesame Chicken | Current image is on the known generic/shared debt list; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-5/bread-pakora.png` | `bread-pakora` | IMPORTABLE_PLACEHOLDER | Bread Pakora | Current image is a placeholder; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-5/butter-chicken.png` | `butter-chicken` | IMPORTABLE_GENERIC | Butter Chicken | Current image is a generic/default fallback; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-5/chamthong.png` | `chamthong` | IMPORTABLE_GENERIC | Chamthong | Catalog health audit classified this image as shared/generic debt. |
| `frontend/assets/images/_generated-review/p0-wave-5/cheese-paratha.png` | `cheese-paratha` | IMPORTABLE_GENERIC | Cheese Paratha | Current image is on the known generic/shared debt list; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-5/chingri-xaak.png` | `chingri-xaak` | IMPORTABLE_GENERIC | Chingri Xaak | Current image is on the known generic/shared debt list; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-5/corn-paneer-bhurji-bowl.png` | `corn-paneer-bhurji-bowl` | IMPORTABLE_PLACEHOLDER | Corn Paneer Bhurji Bowl | Current image is a placeholder; safe to replace. |

## Imported Mappings

| Recipe | Source file | Destination | Before | After |
|---|---|---|---|---|
| Assamese Duck Curry | `frontend/assets/images/_generated-review/p0-wave-5/assamese-duck-curry.png` | `frontend/assets/images/dishes/assamese-duck-curry.png` | `/assets/images/dishes/chicken-curry.png` | `/assets/images/dishes/assamese-duck-curry.png` |
| Bai | `frontend/assets/images/_generated-review/p0-wave-5/bai.png` | `frontend/assets/images/dishes/bai.png` | `/assets/images/dishes/soup-bowls.png` | `/assets/images/dishes/bai.png` |
| Black Sesame Chicken | `frontend/assets/images/_generated-review/p0-wave-5/black-sesame-chicken.png` | `frontend/assets/images/dishes/black-sesame-chicken.png` | `/assets/images/dishes/chicken-curry.png` | `/assets/images/dishes/black-sesame-chicken.png` |
| Bread Pakora | `frontend/assets/images/_generated-review/p0-wave-5/bread-pakora.png` | `frontend/assets/images/dishes/bread-pakora.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/bread-pakora.png` |
| Butter Chicken | `frontend/assets/images/_generated-review/p0-wave-5/butter-chicken.png` | `frontend/assets/images/dishes/butter-chicken.png` | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/butter-chicken.png` |
| Chamthong | `frontend/assets/images/_generated-review/p0-wave-5/chamthong.png` | `frontend/assets/images/dishes/chamthong.png` | `/assets/images/dishes/soup-bowls.png` | `/assets/images/dishes/chamthong.png` |
| Cheese Paratha | `frontend/assets/images/_generated-review/p0-wave-5/cheese-paratha.png` | `frontend/assets/images/dishes/cheese-paratha.png` | `/assets/images/dishes/paratha.png` | `/assets/images/dishes/cheese-paratha.png` |
| Chingri Xaak | `frontend/assets/images/_generated-review/p0-wave-5/chingri-xaak.png` | `frontend/assets/images/dishes/chingri-xaak.png` | `/assets/images/dishes/fish-curry.png` | `/assets/images/dishes/chingri-xaak.png` |
| Corn Paneer Bhurji Bowl | `frontend/assets/images/_generated-review/p0-wave-5/corn-paneer-bhurji-bowl.png` | `frontend/assets/images/dishes/corn-paneer-bhurji-bowl.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/corn-paneer-bhurji-bowl.png` |

## Skipped Files

| File | Status | Recipe | Reason |
|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-wave-5/aloo-paratha.png` | SKIP_DESTINATION_EXISTS | Aloo Paratha | Recipe already uses this destination image. |

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
│ 0       │ 'Mood banters'           │ 240   │ 240  │ 0       │ 0      │ 0               │
│ 1       │ 'Pantry banters'         │ 226   │ 213  │ 8       │ 0      │ 5               │
│ 2       │ 'Recommendation banters' │ 339   │ 337  │ 2       │ 0      │ 0               │
│ 3       │ 'Empty state banters'    │ 20    │ 20   │ 0       │ 0      │ 0               │
│ 4       │ 'Dish detail banters'    │ 29    │ 29   │ 0       │ 0      │ 0               │
│ 5       │ 'Journal banters'        │ 93    │ 93   │ 0       │ 0      │ 0               │
│ 6       │ 'Collection banters'     │ 184   │ 184  │ 0       │ 0      │ 0               │
│ 7       │ 'Button labels'          │ 46    │ 44   │ 2       │ 0      │ 0               │
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
