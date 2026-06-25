# Beta 3 Codex Image Workflow Investigation

Generated: 2026-06-25  
Branch: `beta-3-active-development`  
Mode: read-only investigation, except for the allowed single image persistence test attempt and this report

## Executive Summary

Beta 2 did not reveal a reusable hidden image-generation script that can simply be restored. The evidence points to a simpler workflow:

1. Image files already existed on disk.
2. Codex or scripts copied/mapped those real files.
3. Recipe mappings were updated only after filesystem assets existed.

For Beta 3, the same real-file-first discipline is still the correct workflow. The current built-in image generation surface can show images visually in chat, but the controlled test in this investigation did not produce a new filesystem-accessible image file in the checked locations.

Recommended decision:

```text
C. Current Codex built-in image generation cannot be relied on to persist generated images into this workspace.
Continue manual download + Tomo Image Importer V1 for production batches.
```

If fully automated generation is required later, use:

```text
D. A filesystem-backed image generation method
```

such as the imagegen CLI fallback or another approved generator that can write directly into `frontend/assets/images/_generated-review/<batch-name>/`.

## 1. Beta 2 Workflow Evidence

### Preview/style-lock folder

The older Beta 2-style preview folder exists:

```text
frontend/assets/images/_generated-homestyle-preview/
```

Original Beta 2 preview files were present in the initial prototype commit:

```text
380db40 Initial Tomo prototype upload
```

Files found in that commit:

```text
frontend/assets/images/_generated-homestyle-preview/aloo_paratha.webp
frontend/assets/images/_generated-homestyle-preview/masala_chai.webp
frontend/assets/images/_generated-homestyle-preview/rasam_rice.webp
frontend/assets/images/_generated-homestyle-preview/style_lock_contact_sheet.jpg
frontend/assets/images/_generated-homestyle-preview/tomato.webp
```

This proves Beta 2 had local preview assets, but not that Codex generated them through a restorable repo script.

### Beta 2 production images were committed as real files

The Beta 2 release candidate commit contains many real production image files under:

```text
frontend/assets/images/dishes/
```

Key commit:

```text
9cb6a3f Beta 2 release candidate mobile
```

Examples:

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

Operational conclusion: Beta 2 mapping worked because the files were already durable repo assets before recipe paths depended on them.

## 2. Folders Found

### Beta 2 / historical folders

```text
frontend/assets/images/_generated-homestyle-preview/
```

Also referenced by earlier cleanup reports as existing in old reference builds:

```text
reference-builds/tomo-desktop-reference-v0.9/frontend/assets/images/_generated-homestyle-preview/
reference-builds/tomo-desktop-reference-v0.9/assets/images/_generated-homestyle-preview/
```

The reference-build folders are no longer part of the active cleaned workspace, but prior audit notes confirm they existed during the Beta 2 cleanup phase.

### Beta 3 review / handoff folders

```text
frontend/assets/images/_generated-review/
frontend/assets/images/_generated-review copy/
frontend/assets/images/_generated-homestyle-preview/
```

Current observed local generated image store:

```text
/Users/apple/.codex/generated_images/
```

This folder exists and contains older generated image files. The most recent file observed there during this investigation was:

```text
2026-06-18 12:32:16 IST
/Users/apple/.codex/generated_images/019ed4cf-9efa-7e72-b292-fa53a95db877/ig_0a7a80919a58a681016a33978cc3c481919dbd9a852d4bf986.png
```

No new file appeared there during the controlled test on 2026-06-25.

### Temp folders checked

Checked for current generated outputs:

```text
/Users/apple/.codex/
/Users/apple/.codex/generated_images/
/private/tmp
/tmp
frontend/assets/images/_generated-review/
frontend/assets/images/_generated-homestyle-preview/
```

Only older generated files and existing handoff/review files were found. No new controlled-test image file was found.

## 3. Scripts Found

### Relevant current scripts

```text
scripts/scan_image_review_batch.js
scripts/import_recipe_images.js
```

These are intake/import tools. They do not generate images. They are the correct tools once images exist as files.

### Historical/visual asset script

```text
scripts/generate_visual_assets.mjs
```

This is not the Beta 2 photorealistic food image workflow. It creates deterministic visual/placeholder-style assets, not Tomo’s food photography images.

### Other recipe/data scripts seen in Beta 2 history

```text
scripts/add_batch3_quick_spicy_recipes.mjs
scripts/apply_recipe_duplicate_cleanup.mjs
scripts/audit_recipe_metadata_quality.mjs
scripts/generate_mood_overlap_report.mjs
scripts/generate_pantry_catalog.mjs
scripts/generate_seed_from_mapping.py
scripts/review-missing-recipe-backlog.js
```

None of these is a filesystem-backed AI image generation pipeline.

## 4. Beta 2 vs Beta 3 Comparison

| Area | Beta 2 evidence | Beta 3 current state |
|---|---|---|
| Preview folder | `_generated-homestyle-preview/` existed with files | `_generated-review/` is the official intake folder |
| Production assets | Committed as real files under `frontend/assets/images/dishes/` | Works when files are manually placed in review/handoff folders |
| Generation script | No reusable AI image generator found | No repo-native generator currently proven |
| Scanner/importer | Not formalized | `scan_image_review_batch.js` and `import_recipe_images.js` exist |
| Mapping safety | Files existed before mapping | Same rule is now explicit |
| Failure mode | Not visible from history | Chat-visible images may not become local files |

## 5. Current Persistence Test

Allowed test target:

```text
frontend/assets/images/_generated-review/codex-persistence-test.png
```

Test performed:

1. Captured timestamp before generation:

   ```text
   1782388582.968121
   ```

2. Used built-in image generation to render a tiny non-production test image.
3. Searched for new image files after that timestamp in:

   ```text
   /Users/apple/.codex
   /Users/apple/.codex/generated_images
   /private/tmp
   /tmp
   ```

4. Checked whether the target test file existed:

   ```text
   frontend/assets/images/_generated-review/codex-persistence-test.png
   ```

Result:

```text
No new filesystem-accessible image file was found.
The target test file was not created.
```

The image rendered visually in chat, but there was no durable file I could locate and copy.

## 6. Root Cause Hypothesis

The Beta 3 problem is not caused by:

- recipe mapping logic
- image scanner logic
- Image Importer V1
- validation
- file path conventions

The blocker is the handoff between the built-in chat image generation surface and the local filesystem.

Older generated files do exist under:

```text
/Users/apple/.codex/generated_images/
```

So some previous environment/session was able to persist built-in generated images. However, the current session’s controlled test did not create a new accessible file there or in temp folders.

Likely explanation:

```text
The current app/tool surface can render generated images in conversation, but does not expose the generated artifact to the filesystem path visible to this Codex workspace.
```

That means file persistence is environment/session dependent, not a stable repo workflow.

## 7. Recommendation

### Recommended active workflow

Use:

```text
B. Adapt Beta 2 workflow into Image Importer V1
```

with one important clarification:

```text
Beta 2's real lesson was real-file-first, not a hidden generator script.
```

The active Beta 3 workflow should be:

1. Generate or obtain images.
2. Manually download/save approved candidates into:

   ```text
   frontend/assets/images/_generated-review/<batch-name>/
   ```

3. Use recipe slug filenames:

   ```text
   recipe-slug.png
   ```

4. Run a dry run:

   ```bash
   node scripts/import_recipe_images.js --batch=<batch-name> --review-dir=frontend/assets/images/_generated-review/<batch-name> --dry-run
   ```

5. Style-gate visually.
6. Run the real import:

   ```bash
   node scripts/import_recipe_images.js --batch=<batch-name> --review-dir=frontend/assets/images/_generated-review/<batch-name>
   ```

7. Let the importer update image paths and run:

   ```bash
   node scripts/validate_recipe_data.js
   npm run audit:banter
   ```

### When to use `--force`

Only use:

```bash
--force
```

when a human has explicitly approved replacing an existing dedicated image or overwriting an existing destination file.

## 8. Can Beta 2 Workflow Be Restored?

Not as a pure “Codex generates directly into repo” workflow.

What can be restored is the Beta 2 discipline:

```text
Do not map images until the files exist locally.
```

The old `_generated-homestyle-preview/` folder can remain a historical/style reference, but it should not become the active workflow again. The newer `_generated-review/<batch-name>/` plus importer path is safer and more auditable.

## 9. If Full Automation Is Needed Later

Use a filesystem-backed generator only if it passes this test:

```text
After generation, does the expected file exist at:
frontend/assets/images/_generated-review/<batch-name>/<recipe-slug>.png
```

Possible future options:

1. Use the imagegen CLI fallback if an API key and network permissions are explicitly available.
2. Use another approved local/browser download automation that saves into the review folder.
3. Keep manual download, then automate everything after that with Image Importer V1.

Until one of those passes the file-exists test, production image integration should stay manual-download + importer.

## 10. Final Decision

Recommended path for Beta 3:

```text
C for current built-in Codex image generation:
Do not rely on it for persistence.

B for production workflow:
Adapt Beta 2's real-file-first workflow into Image Importer V1.
```

In plain language: the little image goblin still paints in the chat window, but does not reliably leave the painting on the workbench. Keep making the goblin hand us an actual file before we wire anything into Tomo.

## Files / Evidence Inspected

Folders:

```text
frontend/assets/images/_generated-homestyle-preview/
frontend/assets/images/_generated-review/
frontend/assets/images/_generated-review copy/
frontend/assets/images/dishes/
/Users/apple/.codex/generated_images/
/private/tmp
/tmp
```

Scripts:

```text
scripts/scan_image_review_batch.js
scripts/import_recipe_images.js
scripts/generate_visual_assets.mjs
```

Reports/docs:

```text
docs/tomo-image-pipeline-v1.md
notes/backlog/beta-3-beta2-image-workflow-comparison.md
notes/backlog/beta-3-karnataka-a1-generation-report.md
notes/backlog/beta-3-karnataka-a1-integration-report.md
notes/backlog/beta-3-karnataka-a2-integration-report.md
notes/backlog/beta-3-northeast-image-batch-1-integration-report.md
notes/backlog/beta-3-northeast-remaining-images-integration-report.md
notes/backlog/beta-3-northeast-review-images-integration-report.md
```

Commit references:

```text
380db40 Initial Tomo prototype upload
9cb6a3f Beta 2 release candidate mobile
785d61d Add Karnataka A1 recipe images
bfcfd0b Add Karnataka A2 recipe images
2448aa7 Add Karnataka final wave 1 images
7733620 Add Tomo image importer workflow
```

