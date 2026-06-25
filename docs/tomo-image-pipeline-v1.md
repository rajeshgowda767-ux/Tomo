# Tomo Image Pipeline V1

Purpose: provide a repeatable workflow for generated Tomo recipe images, from review-folder intake to style approval, integration, and validation.

This pipeline is intentionally conservative. A generated image should not reach recipe data until it exists on disk, matches Tomo’s visual language, and passes validation.

## Folder conventions

Review intake:

```text
frontend/assets/images/_generated-review/
```

Approved destination:

```text
frontend/assets/images/dishes/
```

Required final filename:

```text
<recipe-slug>.png
```

Example:

```text
Smoked Pork Rice → smoked-pork-rice.png
```

## Source of truth

Active recipe image paths must be updated in both files:

```text
database/generated/recipes.json
frontend/local-recipes.js
```

The intended recipe image path format is:

```text
/assets/images/dishes/<recipe-slug>.png
```

Do not update root legacy recipe files.

## Style gate

Use one or more approved Tomo image references before integration.

Current strong Northeast reference:

```text
frontend/assets/images/dishes/bamboo-shoot-pork.png
```

General Tomo visual language:

- natural home-cooked food photography
- warm natural lighting
- food-forward 30–45 degree or slightly top-down crop
- simple plate or bowl
- neutral table/background
- minimal props
- no text overlays
- no restaurant styling
- no obvious AI-art look
- moderate saturation
- dish should look like it already belongs in the Tomo catalog

Classify every review image:

- `APPROVED`: visually consistent and dish-accurate; safe to integrate
- `REGENERATE`: wrong dish, poor quality, obvious AI look, bad crop, text, or restaurant styling
- `HOLD`: usable image but not for the current recipe, or needs human/product decision

Only `APPROVED` images may be copied into `frontend/assets/images/dishes/`.

## Integration workflow

1. Place generated candidate files in:

   ```text
   frontend/assets/images/_generated-review/
   ```

2. Use recipe slug filenames whenever possible:

   ```text
   galho.png
   smoked-pork-rice.png
   ```

3. Run the review-folder scanner:

   ```bash
   node scripts/scan_image_review_batch.js
   ```

4. Review the images visually against Tomo references.

5. Copy only approved files into:

   ```text
   frontend/assets/images/dishes/
   ```

6. Update only approved recipes in:

   ```text
   database/generated/recipes.json
   frontend/local-recipes.js
   ```

7. Do not modify:

   - recipe content
   - recipe metadata
   - collections
   - generator logic
   - recommendation logic
   - unrelated image paths

8. Re-run validation:

   ```bash
   node scripts/validate_recipe_data.js
   npm run audit:banter
   ```

## Automated Importer Workflow

Use the importer after candidate images have already been visually reviewed and approved.

The importer automates the safe mechanical steps:

- read approved image files from a review folder
- match filenames to recipe slugs
- copy importable files to `frontend/assets/images/dishes/` using normalized `recipe-slug.ext` filenames
- update `imageUrl` / mirrored image fields in:
  - `database/generated/recipes.json`
  - `frontend/local-recipes.js`
- write an import report in `notes/backlog/`
- run validation after a real import

Dry-run first:

```bash
node scripts/import_recipe_images.js --batch=karnataka-final-wave-2 --review-dir=frontend/assets/images/_generated-review/karnataka-final-wave-2 --dry-run
```

Real import:

```bash
node scripts/import_recipe_images.js --batch=karnataka-final-wave-2 --review-dir=frontend/assets/images/_generated-review/karnataka-final-wave-2
```

Expected report:

```text
notes/backlog/karnataka-final-wave-2-image-import-report.md
```

Safety rules:

- The importer matches image filename slug to recipe slug and writes the approved file as `recipe-slug.ext`.
- It requires exactly one matching backend recipe and exactly one matching frontend recipe.
- It skips backend/frontend image mismatches.
- It skips missing recipe matches.
- It skips duplicate slugs in the review folder.
- It skips recipes already using dedicated/non-generic imagery unless `--force` is passed.
- It skips destination overwrites unless `--force` is passed.
- It does not modify recipe metadata, collections, recommendation logic, or Global Bites.
- It does not delete review images.

Use `--force` only when a human has explicitly approved replacing an existing dedicated image or overwriting an existing destination file.

Example force import:

```bash
node scripts/import_recipe_images.js --batch=karnataka-replacement --review-dir=frontend/assets/images/_generated-review/karnataka-replacement --force
```

After a non-dry-run import with imported files, the importer automatically runs:

```bash
node scripts/validate_recipe_data.js
npm run audit:banter
```

## Validation requirements

For every approved recipe:

- final file exists in `frontend/assets/images/dishes/`
- image path exists on disk
- backend/frontend image path parity is true
- recipe no longer points to placeholder/default fallback
- recipe remains in expected collection or Regional Journey
- recipe validator passes
- banter audit passes

## Report convention

Each batch should create:

```text
notes/backlog/<batch-name>-image-integration-report.md
```

Report must include:

- batch name
- reference images used
- review folder
- approved count
- regenerate count
- hold count
- images integrated
- images rejected with reasons
- files changed
- validation results
- remaining placeholders

## Safety rules

- Never map an inaccessible generated image.
- Never map a visually wrong dish just because the file exists.
- Never overwrite existing production assets unless explicitly requested.
- Prefer holding a candidate over polluting recipe data.
- Keep generated review files separate from approved dish images.
- Keep original review files until the batch is accepted or archived.
