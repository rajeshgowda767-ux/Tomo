# p0-wave-1 Image Import Report

Generated: 2026-06-25T16:45:27.303Z
Mode: dry-run
Review folder: `frontend/assets/images/_generated-review/p0-wave-1`
Force enabled: no

## Summary

- Files found: 10
- Imported count: 0
- Skipped count: 4
- Recipe mappings updated: 0

## Status Breakdown

| Status | Count |
|---|---:|
| IMPORTABLE_P0_DEBT | 6 |
| SKIP_DESTINATION_EXISTS | 4 |

## Files Found

| File | Slug | Status | Recipe | Reason |
|---|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-wave-1/adai-avial.png` | `adai-avial` | IMPORTABLE_P0_DEBT | Adai Avial | Recipe is in the P0 production plan and current image is shared by 2 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-1/adai.png` | `adai` | SKIP_DESTINATION_EXISTS | Adai | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-1/chettinad-chicken-curry.png` | `chettinad-chicken-curry` | IMPORTABLE_P0_DEBT | Chettinad Chicken Curry | Recipe is in the P0 production plan and current image is shared by 3 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-1/chettinad-pepper-chicken.png` | `chettinad-pepper-chicken` | IMPORTABLE_P0_DEBT | Chettinad Pepper Chicken | Recipe is in the P0 production plan and current image is shared by 3 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-1/chow-chow-bath.png` | `chow-chow-bath` | SKIP_DESTINATION_EXISTS | Chow Chow Bath | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-1/coconut-rice.png` | `coconut-rice` | IMPORTABLE_P0_DEBT | Coconut Rice | Recipe is in the P0 production plan and current image is shared by 2 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-1/coconut-sevai.png` | `coconut-sevai` | IMPORTABLE_P0_DEBT | Coconut Sevai | Recipe is in the P0 production plan and current image is shared by 2 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-1/congress-kadlekai.png` | `congress-kadlekai` | SKIP_DESTINATION_EXISTS | Congress Kadlekai | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-1/coorg-pandi-curry.png` | `coorg-pandi-curry` | SKIP_DESTINATION_EXISTS | Coorg Pandi Curry | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-1/corn-sundal.png` | `corn-sundal` | IMPORTABLE_P0_DEBT | Corn Sundal | Recipe is in the P0 production plan and current image is shared by 5 recipes. |

## Imported Mappings

No images imported.

## Skipped Files

| File | Status | Recipe | Reason |
|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-wave-1/adai.png` | SKIP_DESTINATION_EXISTS | Adai | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-1/chow-chow-bath.png` | SKIP_DESTINATION_EXISTS | Chow Chow Bath | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-1/congress-kadlekai.png` | SKIP_DESTINATION_EXISTS | Congress Kadlekai | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-1/coorg-pandi-curry.png` | SKIP_DESTINATION_EXISTS | Coorg Pandi Curry | Recipe already uses this destination image. |

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

Dry run only. Validation was not run because no files were copied and no recipe files were edited.

## Safety Notes

- Recipe metadata was not modified.
- Collections were not modified.
- Global Bites was not touched.
- Review images were not deleted.
- Existing dedicated images were not overwritten unless `--force` was used.
