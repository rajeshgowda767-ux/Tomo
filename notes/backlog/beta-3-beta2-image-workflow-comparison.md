# Beta 3 vs Beta 2 Image Generation Workflow Comparison

Generated: 2026-06-24  
Branch inspected: `beta-3-active-development`  
Mode: read-only audit, except for creating this report

## Executive Summary

Beta 2 succeeded because image work entered the repository as real filesystem assets before recipe mappings depended on them. The current Beta 3 Pipeline V1 is correct in principle, but recent image generation attempts failed at the handoff step: generated images appeared visually in the conversation, yet no durable image files landed in the expected review folder or checked temporary/generated-image locations.

The safest path is to keep Pipeline V1, but formalize manual or filesystem-backed file intake as mandatory:

1. Generated image exists on disk.
2. Scanner sees it in a review folder.
3. Human/style gate approves it.
4. Approved image is copied into `frontend/assets/images/dishes/`.
5. Recipe mappings are updated only after file existence is confirmed.

Do not rely on chat-visible image generation output unless the image is also available as a local file.

## What Worked in Beta 2

### 1. Old style-lock preview folder exists

The repository contains the older Beta 2 preview folder:

```text
frontend/assets/images/_generated-homestyle-preview/
```

Files currently present:

```text
frontend/assets/images/_generated-homestyle-preview/aloo_paratha.webp
frontend/assets/images/_generated-homestyle-preview/masala_chai.webp
frontend/assets/images/_generated-homestyle-preview/rasam_rice.webp
frontend/assets/images/_generated-homestyle-preview/style_lock_contact_sheet.jpg
frontend/assets/images/_generated-homestyle-preview/tomato.webp
```

The same folder also exists in the reference build:

```text
reference-builds/tomo-desktop-reference-v0.9/frontend/assets/images/_generated-homestyle-preview/
reference-builds/tomo-desktop-reference-v0.9/assets/images/_generated-homestyle-preview/
```

These files were added in the initial prototype commit:

```text
380db40 Initial Tomo prototype upload
```

Important finding: this folder is evidence of a successful local-file preview workflow, but not evidence of a reusable repo-native image generation script. The files were already present as assets in the imported prototype.

### 2. Beta 2 production image assets were committed as real files

The Beta 2 image batches were added as actual image assets under:

```text
frontend/assets/images/dishes/
```

Relevant commits found:

```text
9cb6a3f Beta 2 release candidate mobile
e85d0a2 Beta 2 release candidate
330f899 Polish beta UI and pantry experience
```

Examples from Beta 2 added assets:

```text
frontend/assets/images/dishes/batch3a-masala-dosa.png
frontend/assets/images/dishes/batch3a-thukpa.png
frontend/assets/images/dishes/batch3b-akki-roti.png
frontend/assets/images/dishes/batch3b-rasam-rice.png
frontend/assets/images/dishes/batch4-shukto.png
frontend/assets/images/dishes/batch5-fish-fry.png
frontend/assets/images/dishes/batch6-coconut-chutney.png
frontend/assets/images/dishes/jadoh-homestyle.png
frontend/assets/images/dishes/mutton-pulao-homestyle.png
frontend/assets/images/dishes/puttu-kadala.png
```

This is the key operational lesson: by the time mappings depended on these images, the files existed in the repository.

### 3. `scripts/generate_visual_assets.mjs` is not the AI image workflow

The script:

```text
scripts/generate_visual_assets.mjs
```

does generate image files into:

```text
frontend/assets/images/
```

But it is a deterministic SVG-to-PNG placeholder/visual asset generator using `sharp`. It creates simplified illustrated assets from hardcoded shape/color recipes. It is useful for placeholder-style assets, but it is not the food-photography image generation workflow used for the Beta 2 photorealistic dish images.

## Current Beta 3 Workflow

Pipeline V1 defines the current intended intake folder:

```text
frontend/assets/images/_generated-review/
```

Approved destination:

```text
frontend/assets/images/dishes/
```

Review scanner:

```text
scripts/scan_image_review_batch.js
```

Pipeline documentation:

```text
docs/tomo-image-pipeline-v1.md
notes/backlog/tomo-image-pipeline-v1-checklist.md
```

The scanner is read-only. It checks files in the review folder, matches filenames to recipe slugs, reports current image paths, placeholder status, destination overwrite risk, and expected final paths.

Current state observed:

```text
frontend/assets/images/_generated-review/
```

exists but is empty.

## Why Beta 3 Image Generation Has Not Been Landing on Disk

Multiple Beta 3 reports show the same failure mode:

```text
notes/backlog/beta-3-northeast-image-batch-1-integration-report.md
notes/backlog/beta-3-northeast-remaining-images-integration-report.md
notes/backlog/beta-3-karnataka-a1-generation-report.md
```

Observed pattern:

- Image generation was attempted.
- Visual candidates appeared in the conversation.
- No generated files appeared in:
  - `frontend/assets/images/_generated-review/`
  - `frontend/assets/images/_generated-northeast-review/`
  - `$HOME/.codex/generated_images`
  - `/private/tmp`
  - Codex temporary directories checked in prior reports
- Therefore no files could be copied into `frontend/assets/images/dishes/`.
- Recipe mappings were correctly left unchanged.

The root cause is not the scanner or the recipe mapping process. The blocker is the missing durable file handoff from the image generation surface into the repository filesystem.

## What Worked During Beta 3 Northeast Integration

Beta 3 Northeast succeeded only after actual image files were made available inside the workspace.

### Single Bamboo Shoot Pork integration

Input file found:

```text
frontend/assets/images/NorthEast India/Bamboo Shoot pork.png
```

Integrated as:

```text
frontend/assets/images/dishes/bamboo-shoot-pork.png
```

Report:

```text
notes/backlog/beta-3-northeast-single-image-review.md
```

### Remaining Northeast review batch

Review folder:

```text
frontend/assets/images/_generated-northeast-review/
```

Integrated files:

```text
frontend/assets/images/dishes/galho.png
frontend/assets/images/dishes/khar.png
frontend/assets/images/dishes/phagshapa.png
frontend/assets/images/dishes/smoked-pork-curry.png
frontend/assets/images/dishes/smoked-pork-rice.png
frontend/assets/images/dishes/sticky-rice.png
frontend/assets/images/dishes/zan.png
frontend/assets/images/dishes/tripuri-berma-curry.png
frontend/assets/images/dishes/tungrymbai.png
frontend/assets/images/dishes/wahan-mosdeng.png
```

Commit trail:

```text
9eba47d Add Northeast Batch 1 recipe images
```

Report:

```text
notes/backlog/beta-3-northeast-review-images-integration-report.md
```

This confirms that Pipeline V1 works once candidate files are actually present on disk.

## Beta 2 vs Beta 3 Comparison

| Area | Beta 2 | Beta 3 current |
|---|---|---|
| Preview folder | `frontend/assets/images/_generated-homestyle-preview/` | `frontend/assets/images/_generated-review/` |
| Preview files | Present on disk | Folder exists but empty for Karnataka A1 |
| Production assets | Added as real files under `frontend/assets/images/dishes/` | Works only when user/manual handoff places files in repo |
| Script support | `generate_visual_assets.mjs` creates deterministic placeholder-style assets | `scan_image_review_batch.js` audits review files but does not generate |
| AI generation handoff | No reusable repo-native generator found | Chat-visible generation does not expose durable files |
| Safe mapping condition | File existed before mapping | Same rule, correctly enforced |
| Failure mode | Not visible from repo history | Generated image not accessible as local file |

## Exact Process That Worked

The process that worked was:

1. Image files existed in a workspace folder.
2. Files were reviewed visually.
3. Approved files were copied into:

   ```text
   frontend/assets/images/dishes/
   ```

4. Recipe data was updated in:

   ```text
   database/generated/recipes.json
   frontend/local-recipes.js
   ```

5. Validation was run:

   ```text
   node scripts/validate_recipe_data.js
   npm run audit:banter
   ```

In Beta 2, the assets appear to have arrived in the repository already as committed files. In Beta 3, Northeast worked when files were manually placed in review/source folders first.

## Recommendation

### Recommended path: adapt Beta 2 discipline into Pipeline V1

Do not restore the old `_generated-homestyle-preview` folder as the active workflow. It is useful as historical/style-lock evidence, but it is not a complete pipeline and it does not match the current scanner/checklist system.

Use this as the official Beta 3 workflow:

```text
1. Generate or obtain image externally.
2. Save file into frontend/assets/images/_generated-review/.
3. Use recipe-slug filename.
4. Run scripts/scan_image_review_batch.js.
5. Style-gate against Tomo references.
6. Copy approved file to frontend/assets/images/dishes/.
7. Update only approved recipe mappings.
8. Run validator and banter audit.
9. Write batch report.
```

### Manual file handoff should remain allowed

Until the image generation tool can reliably write files into the workspace, manual file handoff is the safest path.

Manual handoff is not a downgrade; it is the only workflow currently proven to produce auditable local files.

### Optional future improvement

If automated generation is required, add a filesystem-backed generator step only after confirming it can write image files directly to:

```text
frontend/assets/images/_generated-review/
```

That future tool should be judged by one simple test:

```text
After generation, does the expected recipe-slug image file exist on disk?
```

If not, it should not be used for mapping work.

## Actionable Next Step for Karnataka A1

Place the 10 Karnataka A1 candidate images into:

```text
frontend/assets/images/_generated-review/
```

with these filenames:

```text
ghee-rice.png
mangalorean-fish-curry.png
coorg-koli-curry.png
bassaru.png
ragi-rotti.png
vangi-bath.png
ragi-mudde.png
soppu-saaru.png
bamboo-shoot-curry.png
neer-dosa.png
```

Then run:

```text
node scripts/scan_image_review_batch.js --batch=karnataka-a1 --review-dir=frontend/assets/images/_generated-review
```

Only after the scanner sees files should style review and integration proceed.

## Files and Evidence Inspected

Folders:

```text
frontend/assets/images/_generated-homestyle-preview/
frontend/assets/images/_generated-review/
frontend/assets/images/dishes/
reference-builds/tomo-desktop-reference-v0.9/frontend/assets/images/_generated-homestyle-preview/
reference-builds/tomo-desktop-reference-v0.9/assets/images/_generated-homestyle-preview/
```

Scripts:

```text
scripts/generate_visual_assets.mjs
scripts/scan_image_review_batch.js
```

Docs/reports:

```text
docs/tomo-image-pipeline-v1.md
notes/backlog/tomo-image-pipeline-v1-checklist.md
notes/backlog/beta-3-karnataka-a1-generation-report.md
notes/backlog/beta-3-northeast-image-batch-1-integration-report.md
notes/backlog/beta-3-northeast-remaining-images-integration-report.md
notes/backlog/beta-3-northeast-single-image-review.md
notes/backlog/beta-3-northeast-review-images-integration-report.md
```

Git history highlights:

```text
380db40 Initial Tomo prototype upload
330f899 Polish beta UI and pantry experience
9cb6a3f Beta 2 release candidate mobile
e85d0a2 Beta 2 release candidate
9eba47d Add Northeast Batch 1 recipe images
```

## Final Decision

Use Pipeline V1 as the active Beta 3 image workflow, but make the file-handoff requirement explicit and non-negotiable.

Recommended decision:

```text
Adapt Beta 2's successful real-file-first workflow to Pipeline V1.
```

Do not continue with chat-only image generation as an integration path. Continue with manual file handoff unless/until generation can produce local files directly in the review folder.
