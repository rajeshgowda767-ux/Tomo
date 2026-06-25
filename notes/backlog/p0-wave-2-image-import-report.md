# p0-wave-2 Image Import Report

Generated: 2026-06-25T16:45:27.303Z
Mode: dry-run
Review folder: `frontend/assets/images/_generated-review/p0-wave-2`
Force enabled: no

## Summary

- Files found: 10
- Imported count: 0
- Skipped count: 2
- Recipe mappings updated: 0

## Status Breakdown

| Status | Count |
|---|---:|
| IMPORTABLE_P0_DEBT | 8 |
| SKIP_DESTINATION_EXISTS | 2 |

## Files Found

| File | Slug | Status | Recipe | Reason |
|---|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-wave-2/andhra-chicken-curry.png` | `andhra-chicken-curry` | IMPORTABLE_P0_DEBT | Andhra Chicken Curry | Recipe is in the P0 production plan and current image is shared by 2 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-2/andhra-egg-fry.png` | `andhra-egg-fry` | SKIP_DESTINATION_EXISTS | Andhra Egg Fry | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-2/andhra-fish-fry.png` | `andhra-fish-fry` | IMPORTABLE_P0_DEBT | Andhra Fish Fry | Recipe is in the P0 production plan and current image is shared by 4 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-2/andhra-kodi-vepudu.png` | `andhra-kodi-vepudu` | IMPORTABLE_P0_DEBT | Andhra Kodi Vepudu | Recipe is in the P0 production plan and current image is shared by 3 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-2/Appam Stew.png` | `appam-stew` | IMPORTABLE_P0_DEBT | Appam Stew | Recipe is in the P0 production plan and current image is shared by 4 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-2/Appam.png` | `appam` | SKIP_DESTINATION_EXISTS | Appam | Destination file already exists. Use --force to overwrite. |
| `frontend/assets/images/_generated-review/p0-wave-2/beerakaya-pappu.png` | `beerakaya-pappu` | IMPORTABLE_P0_DEBT | Beerakaya Pappu | Recipe is in the P0 production plan and current image is shared by 4 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-2/chemmeen-theeyal.png` | `chemmeen-theeyal` | IMPORTABLE_P0_DEBT | Chemmeen Theeyal | Recipe is in the P0 production plan and current image is shared by 3 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-2/cherupayar-curry.png` | `cherupayar-curry` | IMPORTABLE_P0_DEBT | Cherupayar Curry | Recipe is in the P0 production plan and current image is shared by 2 recipes. |
| `frontend/assets/images/_generated-review/p0-wave-2/chicken-stew.png` | `chicken-stew` | IMPORTABLE_P0_DEBT | Chicken Stew | Recipe is in the P0 production plan and current image is shared by 4 recipes. |

## Imported Mappings

No images imported.

## Skipped Files

| File | Status | Recipe | Reason |
|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-wave-2/andhra-egg-fry.png` | SKIP_DESTINATION_EXISTS | Andhra Egg Fry | Recipe already uses this destination image. |
| `frontend/assets/images/_generated-review/p0-wave-2/Appam.png` | SKIP_DESTINATION_EXISTS | Appam | Destination file already exists. Use --force to overwrite. |

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
