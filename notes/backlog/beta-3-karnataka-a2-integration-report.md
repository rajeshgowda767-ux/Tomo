# Beta 3 Karnataka A2 Image Integration Report

Generated: 2026-06-25  
Branch: `beta-3-active-development`

## Summary

- Requested review folder: `frontend/assets/images/_generated-review/karnataka-a2/`
- Requested review folder status: not present in this checkout
- Target files found in alternate folder: `frontend/assets/images/_generated-homestyle-preview/`
- Target files found: 10
- Approved and integrated: 6
- Regenerate: 0
- Hold: 4
- Backend mappings updated: 6
- Frontend mappings updated: 6

No recipe metadata, collections, generator logic, Global Bites assignments, recommendation logic, or desktop files were changed.

## Intake Scan

Requested command:

```text
node scripts/scan_image_review_batch.js --batch=karnataka-a2 --review-dir=frontend/assets/images/_generated-review/karnataka-a2
```

Result:

| Check | Result |
|---|---:|
| Review files | 0 |
| Matched recipes | 0 |
| No match | 0 |
| Multiple matches | 0 |
| Destination overwrite risks | 0 |

The requested folder did not exist:

```text
frontend/assets/images/_generated-review/karnataka-a2/
```

The 10 requested files were found here instead:

```text
frontend/assets/images/_generated-homestyle-preview/
```

Alternate scan:

```text
node scripts/scan_image_review_batch.js --batch=karnataka-a2-found-alt --review-dir=frontend/assets/images/_generated-homestyle-preview
```

The alternate folder also contains older preview files, so only the 10 requested Karnataka A2 filenames were considered for this integration.

## Files Found

| File | Found | Source folder |
|---|---:|---|
| `akki-rotti.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `bisi-bele-bath.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `maddur-vada.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `mysore-bonda.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `nuchinunde.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `shenga-chutney.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `kosambari.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `chitranna-lemon-rice.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `tomato-bath.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |
| `mangalore-buns.png` | yes | `frontend/assets/images/_generated-homestyle-preview/` |

## Style Gate

Reference images used:

- Approved Karnataka A1 images, especially:
  - `frontend/assets/images/dishes/ghee-rice.png`
  - `frontend/assets/images/dishes/ragi-rotti.png`
  - `frontend/assets/images/dishes/ragi-mudde.png`
  - `frontend/assets/images/dishes/neer-dosa.png`
- Approved Northeast images:
  - `frontend/assets/images/dishes/bamboo-shoot-pork.png`
  - `frontend/assets/images/dishes/galho.png`
- Existing Tomo catalog style.

Temporary contact sheet:

```text
/private/tmp/karnataka-a2-style-contact-sheet.jpg
```

All 10 visual candidates matched the broad Tomo style:

- natural home-cooked food photography
- warm natural daylight
- food-forward crop
- simple serving vessels
- minimal props
- no text overlays
- no restaurant styling
- no obvious AI-art look

Integration was limited by catalog safety, not visual quality.

## Classification

| File | Intended dish / catalog match | Decision | Reason |
|---|---|---|---|
| `akki-rotti.png` | `Akki Roti` | APPROVED | Safe spelling/slug variant; no destination overwrite; recipe exists. |
| `bisi-bele-bath.png` | `Bisibelebath` | APPROVED | Safe naming variant; no destination overwrite; recipe exists. |
| `maddur-vada.png` | `Maddur Vada` | APPROVED | Recipe exists; no destination overwrite. |
| `mysore-bonda.png` | none | HOLD | No exact recipe record exists yet. |
| `nuchinunde.png` | none | HOLD | No exact recipe record exists yet. |
| `shenga-chutney.png` | `Shenga Chutney` | APPROVED | Recipe exists; no destination overwrite. |
| `kosambari.png` | `Kosambari` | HOLD | `frontend/assets/images/dishes/kosambari.png` already exists; no overwrite allowed. |
| `chitranna-lemon-rice.png` | `Lemon Rice` | APPROVED | Safe Chitranna/Lemon Rice mapping; no destination overwrite. |
| `tomato-bath.png` | none | HOLD | No exact `Tomato Bath` recipe record exists; `Tomato Rice` was not treated as safe equivalence. |
| `mangalore-buns.png` | `Mangalore Buns` | APPROVED | Recipe exists; no destination overwrite. |

## Images Integrated

Copied approved files to:

```text
frontend/assets/images/dishes/
```

Integrated files:

```text
frontend/assets/images/dishes/akki-rotti.png
frontend/assets/images/dishes/bisi-bele-bath.png
frontend/assets/images/dishes/maddur-vada.png
frontend/assets/images/dishes/shenga-chutney.png
frontend/assets/images/dishes/chitranna-lemon-rice.png
frontend/assets/images/dishes/mangalore-buns.png
```

Held files were not copied into the active dishes folder.

## Mapping Updates

Updated image paths only in:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

| Recipe | Old image | New image |
|---|---|---|
| Akki Roti | `/assets/images/dishes/batch3b-akki-roti.png` | `/assets/images/dishes/akki-rotti.png` |
| Bisibelebath | `/assets/images/dishes/batch3b-bisibelebath.png` | `/assets/images/dishes/bisi-bele-bath.png` |
| Maddur Vada | `/assets/images/dishes/batch3b-maddur-vada.png` | `/assets/images/dishes/maddur-vada.png` |
| Shenga Chutney | `/assets/images/dishes/batch7-peanut-chutney.png` | `/assets/images/dishes/shenga-chutney.png` |
| Lemon Rice | `/assets/images/dishes/batch3b-lemon-rice.png` | `/assets/images/dishes/chitranna-lemon-rice.png` |
| Mangalore Buns | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/mangalore-buns.png` |

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

Focused mapped-image check:

| Check | Result |
|---|---:|
| Backend/frontend image path parity | PASS |
| Approved image files exist | PASS |
| Approved recipes use expected new image path | PASS |

## Remaining Karnataka A2 Placeholder Recipes

Within the provided target set:

- `Mangalore Buns` no longer uses the placeholder image.
- `Shenga Chutney` no longer uses the shared peanut chutney fallback.
- `Mysore Bonda`, `Nuchinunde`, and `Tomato Bath` are not active catalog recipes yet, so they have no recipe mapping to update.
- `Kosambari` already had a dedicated active image and was left unchanged to avoid overwriting.

Note: this provided target set differs from the previously documented A2 checklist, which listed Prawn Sukka, Kotte Kadubu, Set Dosa, Chicken Sukka, Kadambuttu, Mysore Rasam, Prawn Ghee Roast, Udupi Sambar, Kayi Saaru, and Tambuli. Those planned A2 recipes were not part of this downloaded target file set and were not changed.

## Files Changed

Added active dish images:

- `frontend/assets/images/dishes/akki-rotti.png`
- `frontend/assets/images/dishes/bisi-bele-bath.png`
- `frontend/assets/images/dishes/maddur-vada.png`
- `frontend/assets/images/dishes/shenga-chutney.png`
- `frontend/assets/images/dishes/chitranna-lemon-rice.png`
- `frontend/assets/images/dishes/mangalore-buns.png`

Updated recipe image mappings:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

Added report:

- `notes/backlog/beta-3-karnataka-a2-integration-report.md`

## Git Status Note

Changes were not staged or committed.
