# Beta 3 Northeast Image Batch 1 Integration Report

Generated: 2026-06-24
Branch: beta-3-active-development

## Status

**BLOCKED — no images integrated.**

The batch was restarted with a style-first workflow as requested. Existing Tomo dish images were reviewed as the visual reference set, and previously available generated candidates were compared against that style. The available/generated candidate files were not suitable for this Northeast batch, and a new built-in image generation attempt did not produce a filesystem-accessible image artifact that could be copied into the active app asset directory.

Because the generated image file was not accessible, no recipe mappings were changed. This avoids accidentally mapping placeholders, unrelated generated food, or inaccessible files.

## Reference Images Used

Reference contact sheet:

- `/private/tmp/tomo-reference-contact-sheet.png`

Reference files:

- `frontend/assets/images/dishes/chicken-sukka-homestyle.png`
- `frontend/assets/images/dishes/dosa-homestyle.png`
- `frontend/assets/images/dishes/batch3b-akki-roti.png`
- `frontend/assets/images/dishes/recommendation-pack-aloo-jeera.png`
- `frontend/assets/images/dishes/batch3b-lemon-rice.png`
- `frontend/assets/images/dishes/sambar-rice.png`
- `frontend/assets/images/dishes/paneer-curry.png`
- `frontend/assets/images/dishes/chicken-curry-rice.png`
- `frontend/assets/images/dishes/fish-curry-rice.png`
- `frontend/assets/images/dishes/batch7-potato-palya.png`
- `frontend/assets/images/dishes/batch4-shukto.png`
- `frontend/assets/images/dishes/batch3b-kadala-curry.png`

Reference style summary:

- Warm natural home light
- Slightly top-down or 30–45 degree angle
- Simple ceramic or steel serving dish
- Neutral tabletop
- Food as hero
- Moderate saturation
- Minimal props
- No text overlays
- No dramatic restaurant styling
- No stock-photo gloss

## Images Generated

No filesystem-accessible final images were generated for integration.

A fresh generation attempt was made for:

- Bamboo Shoot Pork

However, after the generation call completed, no new image file appeared in:

- `$HOME/.codex/generated_images`
- workspace image directories
- `/private/tmp`
- Codex temporary directories

## Images Rejected

Existing generated candidate contact sheet:

- `/private/tmp/tomo-generated-candidates-contact-sheet.png`

Rejected reason:

- Candidates were not tied to the target Northeast dishes.
- Many candidates showed unrelated dishes such as potato dishes, idli, egg curry, sandwiches, raita, salad, chutney, and cake.
- They could not be safely mapped to the Northeast target recipes.
- Integration would have created inaccurate dish imagery.

## Images Integrated

None.

## Mapping Updates

None.

Recipe data was not modified.

## Current Target Mapping Status

| Recipe | Current image | File exists | Placeholder fallback |
|---|---|---:|---:|
| Bamboo Shoot Pork | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Galho | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Khar | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Phagshapa | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Smoked Pork Curry | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Smoked Pork Rice | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Sticky Rice | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Zan | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Tripuri Berma Curry | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Tungrymbai | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |
| Wahan Mosdeng | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | yes | yes |

## Validation Results

### File existence

PASS for current placeholders.

All 11 current image paths resolve to:

- `frontend/assets/images/dishes/homestyle-kitchen-placeholder.png`

### Broken references

PASS.

No broken references were introduced because no mappings were changed.

### Collections V2

Not changed.

The target recipes remain available through generated collection data, but still use placeholder imagery.

### Regional Journey Northeast

Not changed.

The target recipes remain in Regional Journeys > Northeast, but still use placeholder imagery.

### Dish detail pages

Not changed.

Dish detail pages continue to load the existing placeholder path.

### Mobile rendering

Not changed.

No new assets were added or mapped, so mobile rendering remains stable.

## Remaining Northeast Placeholders

These 11 Batch 1 targets still need dedicated image generation:

1. Bamboo Shoot Pork
2. Galho
3. Khar
4. Phagshapa
5. Smoked Pork Curry
6. Smoked Pork Rice
7. Sticky Rice
8. Zan
9. Tripuri Berma Curry
10. Tungrymbai
11. Wahan Mosdeng

## Recommended Next Step

Regenerate the 11 images only when generated files are accessible on disk.

Required safe sequence:

1. Generate one target image.
2. Confirm the generated image file exists locally.
3. Compare it against the Tomo reference contact sheet.
4. Copy it to `frontend/assets/images/dishes/<recipe-slug>.png`.
5. Update only the matching recipe image path in:
   - `database/generated/recipes.json`
   - `frontend/local-recipes.js`
6. Verify no placeholder fallback remains for that recipe.
7. Repeat per recipe.

Do not batch-map images unless every generated file is visible, inspected, and style-approved.

## Files Changed

- Added this report:
  - `notes/backlog/beta-3-northeast-image-batch-1-integration-report.md`

No recipe data, UI code, collection data, or image assets were changed.
