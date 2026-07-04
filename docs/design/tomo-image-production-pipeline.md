# Tomo Image Production Pipeline

This document defines the production workflow every Tomo recipe image should follow.

No recipe image should be generated, approved, or mapped without passing through this pipeline.

## Goals

- Reduce placeholder images in a controlled order.
- Preserve one consistent Tomo photography style.
- Generate regionally authentic food imagery.
- Keep recipe IDs stable.
- Avoid broken paths, duplicate mappings, and visual mismatches.
- Improve high-visibility surfaces first.

## Required Inputs

Before each production run, use:

- `docs/design/tomo-food-photography-style-guide.md`
- `docs/audits/project-annapurna/image-priority-audit.md`
- `database/generated/recipes.json`
- `frontend/local-recipes.js`
- `database/generated/collections.json`

The photography style guide is the creative source of truth. The image priority audit is the ordering source of truth.

## Stage 1: Image Queue

Automatically organize placeholder recipes by priority:

- P0 - Critical
- P1 - Gold Recipes
- P2 - Collection Recipes
- P3 - Frequently Recommended
- P4 - Long-tail

Queue rules:

- P0 always comes first.
- P1 follows P0 and should be grouped by state.
- P2 follows P1 and should be grouped by collection.
- P3 follows P2 and should be grouped by ingredient family.
- P4 should wait until higher-priority gaps are closed.

Each queued item should include:

- Recipe ID
- Recipe title
- Canonical title
- State or region
- Category
- Current image path
- Priority tier
- Collection usage
- Kitchen usage
- Recommended filename
- QA status
- Mapping status

## Stage 2: Batch Generation

Generate images by state or region, not as one mixed global batch.

Examples:

- Karnataka Batch
- Kerala Batch
- Tamil Nadu Batch
- Andhra Pradesh Batch
- Telangana Batch
- Goa Batch
- Maharashtra Batch
- West Bengal Batch
- Odisha Batch
- Bihar Batch
- Jharkhand Batch
- Punjab Batch
- Rajasthan Batch
- North East Batch

Benefits:

- Better visual consistency inside a region.
- Easier regional authenticity review.
- Easier QA comparison across related dishes.
- Easier re-generation when one regional style needs correction.

Batch rules:

- Keep each batch small enough for human QA.
- Prefer 10-25 images per batch.
- Do not mix distant cuisines in one generation pass.
- Do not map any image before QA approval.
- Use the Tomo photography style guide for every generation.

## Stage 3: QA

Every generated image must pass all checks below before approval.

Required checks:

- Correct dish.
- Correct color.
- Correct ingredients visible.
- Correct vessel.
- Correct garnish.
- Matches recipe title.
- Matches recipe ingredients.
- Matches recipe quick guide.
- Matches regional style.
- Works as a square mobile card crop.
- Looks like warm home-style food.

Reject images with:

- AI artifacts.
- Wrong ingredients.
- Missing hero ingredient.
- Unrealistic portions.
- Western plating.
- Luxury restaurant plating.
- Duplicate food items caused by generation artifacts.
- Wrong cuisine appearance.
- Excess garnish.
- Text, logos, or watermarks.
- Hands or faces.
- Utensils blocking the dish.
- Plastic-looking food.
- Oversaturated colors.
- Dark moody lighting.

QA output for each image:

- Approved
- Needs Regeneration
- Rejected
- Notes

## Stage 4: Approval

Each image must have one status:

- Draft
- Approved
- Needs Regeneration

Status definitions:

### Draft

Generated but not yet reviewed.

Do not map Draft images.

### Approved

Passed dish, region, style, and technical QA.

Approved images can be mapped.

### Needs Regeneration

Image is close but fails one or more key checks.

Examples:

- Wrong garnish.
- Weak crop.
- Slight dish mismatch.
- Poor texture.
- Too restaurant-like.

Needs Regeneration images should not be mapped.

## Stage 5: Mapping

Map only approved images.

Mapping targets:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

Mapping rules:

- Do not change recipe IDs.
- Do not rename recipes.
- Do not edit ingredients.
- Do not edit Quick Guides.
- Do not edit pairings.
- Do not change metadata unrelated to image paths.
- Keep generated database and mobile mirror in sync.
- Use stable asset paths.

Recommended image path format:

`/assets/images/dishes/<clean-recipe-slug>.png`

If a state batch uses JPG outputs, keep the extension consistent with the generated file.

## Stage 6: Regression

After every mapping batch, run audits for:

- Broken image paths.
- Duplicate image paths.
- Placeholder count.
- Collection coverage.
- Kitchen coverage.
- Hero coverage.
- Dish detail image coverage.
- Search result image coverage.

Regression output should report:

- Placeholder count before.
- Placeholder count after.
- Dedicated image percentage.
- Broken path count.
- Duplicate path count.
- Recipes mapped.
- Recipes still pending.

## Production Schedule

### Phase 1: Critical Surface Images

Generate the 22 P0 Critical images first.

Purpose:

- Remove placeholders from highest-impact surfaces.
- Protect Today's Picks, Kitchen, collections, search, and hero-like cards from feeling unfinished.

### Phase 2: South India

Generate by state:

- Karnataka
- Kerala
- Tamil Nadu
- Andhra Pradesh
- Telangana

Purpose:

- Finish the most mature Project Annapurna region set.
- Preserve consistency across major South Indian canonical dishes.

### Phase 3: West India

Generate by state:

- Maharashtra
- Goa
- Gujarat
- Rajasthan

Purpose:

- Complete high-identity western regional dishes.
- Prioritize iconic snacks, curries, sweets, and festive dishes.

### Phase 4: East India

Generate by state:

- West Bengal
- Odisha
- Bihar
- Jharkhand

Purpose:

- Improve mustard, rice, fish, pitha, chokha, and regional dessert representation.

### Phase 5: North India

Generate by state and region:

- Punjab
- Haryana
- Himachal Pradesh
- Uttarakhand
- Jammu & Kashmir
- Ladakh

Purpose:

- Improve breads, gravies, Himalayan dishes, Kashmiri dishes, and northern comfort foods.

### Phase 6: North East

Generate by state or regional grouping:

- Assam
- Manipur
- Meghalaya
- Mizoram
- Nagaland
- Sikkim
- Tripura
- Arunachal Pradesh

Purpose:

- Replace generic placeholders with regionally sensitive, rustic, ingredient-forward photography.

## Success Metrics

Track after each batch:

- Placeholder reduction.
- Dedicated image percentage.
- Collection coverage percentage.
- Kitchen coverage percentage.
- Hero coverage percentage.
- P0 completion percentage.
- P1 completion percentage.
- Broken image path count.
- Duplicate image path count.
- Regeneration rate.

Recommended dashboard metrics:

| Metric | Target |
| --- | ---: |
| P0 dedicated image coverage | 100% |
| P1 dedicated image coverage | 90%+ |
| Broken image paths | 0 |
| Duplicate dedicated image paths | 0 |
| Placeholder count trend | Down every batch |
| QA-approved before mapping | 100% |

## Batch Completion Checklist

Before closing a batch:

- All generated images are reviewed.
- All rejected images are excluded.
- All approved images are mapped.
- Generated database and mobile mirror are in sync.
- No recipe IDs changed.
- No recipe content changed.
- Broken image audit passes.
- Duplicate image audit passes.
- Placeholder count is updated.
- Remaining regeneration list is documented.

## Final Rule

No image should enter Tomo because it is merely attractive.

It should enter Tomo only if it is accurate, warm, homely, regionally believable, and useful across the app.
