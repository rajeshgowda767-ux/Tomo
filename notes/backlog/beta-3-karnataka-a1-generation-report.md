# Beta 3 Karnataka A1 Generation Report

Generated: 2026-06-24
Branch: beta-3-active-development

## Status

**BLOCKED — generated candidates were visible in chat but not accessible as files on disk.**

Karnataka Batch A1 image prompts were run using the Tomo Image Pipeline V1 style requirements. The visual candidates appeared broadly aligned with the Tomo style direction, but no generated files appeared in the required review folder or in the checked generated-image locations.

No recipe mappings were changed.

No files were copied into `frontend/assets/images/dishes/`.

## References Used

- `docs/tomo-image-pipeline-v1.md`
- `notes/backlog/tomo-image-pipeline-v1-checklist.md`
- `notes/backlog/beta-3-karnataka-image-batch-plan.md`
- Existing Tomo dish image style
- Approved Northeast image style, especially:
  - `frontend/assets/images/dishes/bamboo-shoot-pork.png`

## Target Batch A1 Recipes

| Recipe | Expected filename | Generation attempt | File exists in review folder |
|---|---|---:|---:|
| Ghee Rice | `ghee-rice.png` | yes | no |
| Mangalorean Fish Curry | `mangalorean-fish-curry.png` | yes | no |
| Coorg Koli Curry | `coorg-koli-curry.png` | yes | no |
| Bassaru | `bassaru.png` | yes | no |
| Ragi Rotti | `ragi-rotti.png` | yes | no |
| Vangi Bath | `vangi-bath.png` | yes | no |
| Ragi Mudde | `ragi-mudde.png` | yes | no |
| Soppu Saaru | `soppu-saaru.png` | yes | no |
| Bamboo Shoot Curry | `bamboo-shoot-curry.png` | yes | no |
| Neer Dosa | `neer-dosa.png` | yes | no |

## Files Generated

- Durable files generated in `frontend/assets/images/_generated-review/`: 0
- Durable files found in checked generated-image/temp locations: 0

Checked locations:

- `frontend/assets/images/_generated-review/`
- `$HOME/.codex/generated_images`
- `/private/tmp`
- `/private/var/folders/qm/nr9yfnws515624w8whgwp5k40000gn/T`

## Files Missing

All 10 required files are currently missing from the review folder:

- `frontend/assets/images/_generated-review/ghee-rice.png`
- `frontend/assets/images/_generated-review/mangalorean-fish-curry.png`
- `frontend/assets/images/_generated-review/coorg-koli-curry.png`
- `frontend/assets/images/_generated-review/bassaru.png`
- `frontend/assets/images/_generated-review/ragi-rotti.png`
- `frontend/assets/images/_generated-review/vangi-bath.png`
- `frontend/assets/images/_generated-review/ragi-mudde.png`
- `frontend/assets/images/_generated-review/soppu-saaru.png`
- `frontend/assets/images/_generated-review/bamboo-shoot-curry.png`
- `frontend/assets/images/_generated-review/neer-dosa.png`

## Style Concerns

No formal style-gate approval was performed because files were not available for durable review.

Visual generation appeared generally aligned with:

- warm natural lighting
- home-cooked Indian food photography
- food-forward crop
- simple bowl/plate presentation
- minimal props

But because no candidate files exist on disk, all 10 remain **HOLD** until the actual images are placed in the review folder.

## Scan Results

Command run:

```bash
node scripts/scan_image_review_batch.js --batch=karnataka-a1 --review-dir=frontend/assets/images/_generated-review
```

Result:

- Review files: 0
- Matched recipes: 0
- No match: 0
- Multiple matches: 0
- Destination overwrite risks: 0

## Next Integration Recommendation

Place the 10 candidate files into:

```text
frontend/assets/images/_generated-review/
```

with exact filenames:

- `ghee-rice.png`
- `mangalorean-fish-curry.png`
- `coorg-koli-curry.png`
- `bassaru.png`
- `ragi-rotti.png`
- `vangi-bath.png`
- `ragi-mudde.png`
- `soppu-saaru.png`
- `bamboo-shoot-curry.png`
- `neer-dosa.png`

Then rerun:

```bash
node scripts/scan_image_review_batch.js --batch=karnataka-a1 --review-dir=frontend/assets/images/_generated-review
```

After that, perform the visual style gate and integrate only approved images.

## Files Changed

- Added this report:
  - `notes/backlog/beta-3-karnataka-a1-generation-report.md`

No recipe data changed.

No image mappings changed.

No production image files were overwritten.
