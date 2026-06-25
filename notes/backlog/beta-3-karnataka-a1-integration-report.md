# Beta 3 Karnataka A1 Image Integration Report

Generated: 2026-06-25  
Branch: `beta-3-active-development`

## Summary

- Review files found: 10
- Matched recipes: 10
- No-match files: 0
- Multiple-match files: 0
- Approved count: 10
- Regenerate count: 0
- Hold count: 0
- Images integrated: 10
- Recipe mappings updated: 10 backend + 10 frontend
- Remaining Karnataka A1 placeholders: 0

No recipe metadata, collections, recommendation logic, generator logic, Global Bites assignments, or desktop files were changed.

## Inputs Used

- `docs/tomo-image-pipeline-v1.md`
- `notes/backlog/tomo-image-pipeline-v1-checklist.md`
- `notes/backlog/beta-3-karnataka-image-batch-plan.md`

Review folder:

```text
frontend/assets/images/_generated-review/
```

Approved destination:

```text
frontend/assets/images/dishes/
```

## Intake Scan

Command run:

```text
node scripts/scan_image_review_batch.js --batch=karnataka-a1 --review-dir=frontend/assets/images/_generated-review
```

Initial result:

| Check | Result |
|---|---:|
| Review files | 10 |
| Matched recipes | 10 |
| No match | 0 |
| Multiple matches | 0 |
| Destination overwrite risks | 0 |

## Style Gate

Reference style:

- Existing Tomo catalog images
- Approved Northeast reference: `frontend/assets/images/dishes/bamboo-shoot-pork.png`
- Additional references included current homestyle dishes such as chicken sukka, dosa, akki roti, lemon rice, and potato palya.

Temporary review contact sheet:

```text
/private/tmp/karnataka-a1-style-contact-sheet.jpg
```

All 10 Karnataka A1 images matched the Tomo style gate:

- natural home-cooked food photography
- warm natural lighting
- food-forward crop
- simple bowl or plate
- minimal props
- no text overlays
- no restaurant styling
- no obvious AI-art look
- dish content matched the intended recipe

## Classification

| Recipe | Review file | Decision | Notes |
|---|---|---|---|
| Ghee Rice | `frontend/assets/images/_generated-review/ghee-rice.png` | APPROVED | Warm homestyle rice presentation; fits catalog style. |
| Mangalorean Fish Curry | `frontend/assets/images/_generated-review/mangalorean-fish-curry.png` | APPROVED | Clear fish curry; strong dish match. |
| Coorg Koli Curry | `frontend/assets/images/_generated-review/coorg-koli-curry.png` | APPROVED | Homestyle chicken curry; visually distinct from generic fallback. |
| Bassaru | `frontend/assets/images/_generated-review/bassaru.png` | APPROVED | Green saaru-style bowl; appropriate for recipe. |
| Ragi Rotti | `frontend/assets/images/_generated-review/ragi-rotti.png` | APPROVED | Ragi flatbread presentation; acceptable crop and texture. |
| Vangi Bath | `frontend/assets/images/_generated-review/vangi-bath.png` | APPROVED | Rice dish with brinjal/spice cues; fits Tomo food style. |
| Ragi Mudde | `frontend/assets/images/_generated-review/ragi-mudde.png` | APPROVED | Clear ragi mudde balls with curry side; good dish match. |
| Soppu Saaru | `frontend/assets/images/_generated-review/soppu-saaru.png` | APPROVED | Leafy green saaru; good regional fit. |
| Bamboo Shoot Curry | `frontend/assets/images/_generated-review/bamboo-shoot-curry.png` | APPROVED | Bamboo-shoot curry appearance; consistent with approved Northeast/Karnataka style. |
| Neer Dosa | `frontend/assets/images/_generated-review/neer-dosa.png` | APPROVED | Soft white dosa presentation; strong dish match. |

Rejected/regenerate:

- None.

Hold:

- None.

## Images Integrated

Copied approved files to:

```text
frontend/assets/images/dishes/
```

Integrated files:

```text
frontend/assets/images/dishes/ghee-rice.png
frontend/assets/images/dishes/mangalorean-fish-curry.png
frontend/assets/images/dishes/coorg-koli-curry.png
frontend/assets/images/dishes/bassaru.png
frontend/assets/images/dishes/ragi-rotti.png
frontend/assets/images/dishes/vangi-bath.png
frontend/assets/images/dishes/ragi-mudde.png
frontend/assets/images/dishes/soppu-saaru.png
frontend/assets/images/dishes/bamboo-shoot-curry.png
frontend/assets/images/dishes/neer-dosa.png
```

## Mapping Changes

Updated `imageUrl` / mirrored image fields where present in:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

| Recipe | Old image | New image |
|---|---|---|
| Ghee Rice | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/ghee-rice.png` |
| Mangalorean Fish Curry | `/assets/images/dishes/fish-curry.png` | `/assets/images/dishes/mangalorean-fish-curry.png` |
| Coorg Koli Curry | `/assets/images/dishes/chicken-curry.png` | `/assets/images/dishes/coorg-koli-curry.png` |
| Bassaru | `/assets/images/collections/soups.webp` | `/assets/images/dishes/bassaru.png` |
| Ragi Rotti | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/ragi-rotti.png` |
| Vangi Bath | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/vangi-bath.png` |
| Ragi Mudde | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/ragi-mudde.png` |
| Soppu Saaru | `/assets/images/collections/soups.webp` | `/assets/images/dishes/soppu-saaru.png` |
| Bamboo Shoot Curry | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/bamboo-shoot-curry.png` |
| Neer Dosa | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/neer-dosa.png` |

## Post-Integration Verification

Focused Karnataka A1 image check:

| Check | Result |
|---|---:|
| Backend/frontend image path parity | PASS |
| Each approved image file exists | PASS |
| No approved recipe still uses generic fallback | PASS |
| Destination files exist | PASS |

Post-integration scanner result:

| Check | Result |
|---|---:|
| Review files | 10 |
| Matched recipes | 10 |
| No match | 0 |
| Multiple matches | 0 |
| Destination files exist | 10 |

## Remaining Karnataka A1 Placeholders

None among the 10 Batch A1 recipes.

## Validation Results

```text
node scripts/validate_recipe_data.js
```

Result:

```text
Recipe validation: PASS
PASS 19 | WARNING 0 | FAIL 0
```

```text
npm run audit:banter
```

Result:

```text
PASS
```

The banter audit completed and regenerated its usual local audit outputs.

## Files Changed

Added image files:

- `frontend/assets/images/dishes/ghee-rice.png`
- `frontend/assets/images/dishes/mangalorean-fish-curry.png`
- `frontend/assets/images/dishes/coorg-koli-curry.png`
- `frontend/assets/images/dishes/bassaru.png`
- `frontend/assets/images/dishes/ragi-rotti.png`
- `frontend/assets/images/dishes/vangi-bath.png`
- `frontend/assets/images/dishes/ragi-mudde.png`
- `frontend/assets/images/dishes/soppu-saaru.png`
- `frontend/assets/images/dishes/bamboo-shoot-curry.png`
- `frontend/assets/images/dishes/neer-dosa.png`

Updated recipe image mappings:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

Added report:

- `notes/backlog/beta-3-karnataka-a1-integration-report.md`

Review/source files remain in:

- `frontend/assets/images/_generated-review/`

## Git Status Note

The integration was not staged or committed.
