# Image Importer P0 Replacement Logic Upgrade

Generated: 2026-06-25

## Summary

The image importer now treats the Beta 3 P0 image production plan as explicit replacement intent for shared/generic image debt, while still protecting unique dedicated images and existing destination files.

No real import was run. No recipe mappings were changed by this task.

## Files changed

- `scripts/import_recipe_images.js`
- `docs/tomo-image-pipeline-v1.md`
- `notes/backlog/image-importer-p0-replacement-logic-upgrade.md`

Dry-run reports were refreshed by validation runs:

- `notes/backlog/p0-wave-1-image-import-report.md`
- `notes/backlog/p0-wave-2-image-import-report.md`

## New replacement rules

The importer now allows replacement by default when the current recipe image is:

- blank or placeholder-backed
- a default/generic fallback such as `lunch-default.png`
- a known generic collection image such as `soups.webp`, `desserts.webp`, or `festival-food.webp`
- listed as shared/generic image debt in `notes/backlog/beta-3-catalog-health-audit.json`
- reused by more than 10 active recipes
- part of `notes/backlog/beta-3-p0-image-production-plan.md` and currently using a shared image

The importer still skips by default when:

- the recipe appears to have a unique dedicated image
- the destination file already exists
- the backend/frontend recipe image paths disagree
- the image filename does not match exactly one backend and frontend recipe

`--force` remains the escape hatch for human-approved dedicated-image replacement or destination overwrite.

## New dry-run statuses

- `IMPORTABLE_PLACEHOLDER`
- `IMPORTABLE_GENERIC`
- `IMPORTABLE_SHARED_REUSE`
- `IMPORTABLE_P0_DEBT`
- `SKIP_DEDICATED_PROTECTED`
- `SKIP_RECIPE_NOT_FOUND`
- `SKIP_DESTINATION_EXISTS`

## Validation result

`node --check scripts/import_recipe_images.js`

Result: PASS

## Dry-run results

### p0-wave-1

Command:

```bash
node scripts/import_recipe_images.js --batch=p0-wave-1 --dry-run
```

Result:

- Files found: 10
- Importable: 6
- Imported: 0
- Skipped: 4

Importable:

- Adai Avial — `IMPORTABLE_P0_DEBT`
- Chettinad Chicken Curry — `IMPORTABLE_P0_DEBT`
- Chettinad Pepper Chicken — `IMPORTABLE_P0_DEBT`
- Coconut Rice — `IMPORTABLE_P0_DEBT`
- Coconut Sevai — `IMPORTABLE_P0_DEBT`
- Corn Sundal — `IMPORTABLE_P0_DEBT`

Skipped:

- Adai — `SKIP_DESTINATION_EXISTS`
- Chow Chow Bath — `SKIP_DESTINATION_EXISTS`
- Congress Kadlekai — `SKIP_DESTINATION_EXISTS`
- Coorg Pandi Curry — `SKIP_DESTINATION_EXISTS`

### p0-wave-2

Command:

```bash
node scripts/import_recipe_images.js --batch=p0-wave-2 --dry-run
```

Result:

- Files found: 10
- Importable: 8
- Imported: 0
- Skipped: 2

Importable:

- Andhra Chicken Curry — `IMPORTABLE_P0_DEBT`
- Andhra Fish Fry — `IMPORTABLE_P0_DEBT`
- Andhra Kodi Vepudu — `IMPORTABLE_P0_DEBT`
- Appam Stew — `IMPORTABLE_P0_DEBT`
- Beerakaya Pappu — `IMPORTABLE_P0_DEBT`
- Chemmeen Theeyal — `IMPORTABLE_P0_DEBT`
- Cherupayar Curry — `IMPORTABLE_P0_DEBT`
- Chicken Stew — `IMPORTABLE_P0_DEBT`

Skipped:

- Andhra Egg Fry — `SKIP_DESTINATION_EXISTS`
- Appam — `SKIP_DESTINATION_EXISTS`

## Before/after behavior

Before this change, the importer treated many non-placeholder images as protected unless they matched a small hardcoded generic list. That caused P0 shared image debt to be skipped too often.

After this change, P0 recipes using shared/generic imagery are importable by default, while destination collisions and unique dedicated images remain protected.
