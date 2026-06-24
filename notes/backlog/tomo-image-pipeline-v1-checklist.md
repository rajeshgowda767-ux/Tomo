# Tomo Image Pipeline V1 Checklist

Use this checklist for each generated image batch.

## Batch setup

- [ ] Batch name:
- [ ] Target recipe list confirmed
- [ ] Review folder exists:
  - `frontend/assets/images/_generated-review/`
- [ ] Approved destination confirmed:
  - `frontend/assets/images/dishes/`
- [ ] Reference images selected
- [ ] Existing recipe image paths recorded before changes

## Intake scan

Run:

```bash
node scripts/scan_image_review_batch.js
```

- [ ] All expected review files exist
- [ ] Filenames match recipe slug convention
- [ ] No accidental duplicate files
- [ ] No approved destination overwrite risk
- [ ] Missing files listed

## Style gate

For each image:

- [ ] natural home-cooked food photography
- [ ] warm natural lighting
- [ ] food-forward crop
- [ ] simple plate/bowl
- [ ] minimal props
- [ ] no text overlays
- [ ] no restaurant styling
- [ ] no obvious AI-art look
- [ ] dish content matches recipe

Classify:

- [ ] APPROVED
- [ ] REGENERATE
- [ ] HOLD

## Integration

Only for APPROVED images:

- [ ] copy to `frontend/assets/images/dishes/<recipe-slug>.png`
- [ ] update `imageUrl` in `database/generated/recipes.json`
- [ ] update `imageUrl` in `frontend/local-recipes.js`
- [ ] update `image_url` too if the recipe already has that mirror field
- [ ] do not change recipe metadata/content
- [ ] do not change collections/generators/recommendations

## Validation

Run:

```bash
node scripts/validate_recipe_data.js
npm run audit:banter
```

Confirm:

- [ ] each approved image file exists
- [ ] backend/frontend image path parity
- [ ] no approved recipe still points to placeholder/default
- [ ] rejected/hold recipes remain unchanged
- [ ] expected Regional Journey/collection still includes recipes
- [ ] recipe validator PASS
- [ ] banter audit PASS

## Report

Create:

```text
notes/backlog/<batch-name>-image-integration-report.md
```

Include:

- [ ] reference images used
- [ ] total review images
- [ ] approved count
- [ ] regenerate count
- [ ] hold count
- [ ] images integrated
- [ ] images rejected with reasons
- [ ] files changed
- [ ] validation results
- [ ] remaining placeholders

