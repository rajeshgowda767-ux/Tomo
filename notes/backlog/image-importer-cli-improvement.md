# Image Importer CLI Improvement

Generated: 2026-06-25  
Branch: `beta-3-active-development`

## Summary

The image importer now supports the short batch-only command:

```bash
node scripts/import_recipe_images.js --batch=p0-wave-2
```

When `--review-dir` is omitted, it automatically resolves to:

```text
frontend/assets/images/_generated-review/p0-wave-2
```

Explicit `--review-dir` still works and takes precedence.

## Files Changed

- `scripts/import_recipe_images.js`
- `docs/tomo-image-pipeline-v1.md`
- `notes/backlog/image-importer-cli-improvement.md`

## Example Commands

Dry run:

```bash
node scripts/import_recipe_images.js --batch=p0-wave-2 --dry-run
```

Real import:

```bash
node scripts/import_recipe_images.js --batch=p0-wave-2
```

Custom review folder override:

```bash
node scripts/import_recipe_images.js --batch=p0-wave-2 --review-dir=frontend/assets/images/_generated-review/custom-folder --dry-run
```

## Validation Result

Importer syntax check passed:

```text
node --check scripts/import_recipe_images.js
```

No import was run, so no recipe mappings, images, collections, or Global Bites assignments were changed.

