# Beta 3 Karnataka Final Wave 1 Integration Report

Generated: 2026-06-25  
Branch: `beta-3-active-development`

## Summary

- Requested review folder: `frontend/assets/images/_generated-review/karnataka-final-wave-1/`
- Actual source folder used: `frontend/assets/images/_generated-review copy/`
- Target files requested: 9
- Target files found: 9
- Approved count: 9
- Regenerate count: 0
- Hold count: 0
- Images integrated: 9
- Backend mappings updated: 9
- Frontend mappings updated: 9

No recipe metadata, collections, Global Bites assignments, recommendation logic, or UI files were changed.

## Folder Note

The requested folder was not present:

```text
frontend/assets/images/_generated-review/karnataka-final-wave-1/
```

The requested images were found in:

```text
frontend/assets/images/_generated-review copy/
```

That folder also contains older A2/held review files, so only the nine requested Wave 1 target files were considered for integration.

## Intake Scan

Command run against actual source folder:

```text
node scripts/scan_image_review_batch.js --batch=karnataka-final-wave-1 --review-dir='frontend/assets/images/_generated-review copy'
```

Relevant Wave 1 result:

| File | Recipe match | Current image | Expected final path | Destination existed? |
|---|---|---|---|---:|
| `Prawn Sukka.png` | Prawn Sukka | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/prawn-sukka.png` | no |
| `Kotte Kadubu.png` | Kotte Kadubu | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/kotte-kadubu.png` | no |
| `Set Dosa.png` | Set Dosa | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/set-dosa.png` | no |
| `Chicken Sukka.png` | Chicken Sukka | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/chicken-sukka.png` | no |
| `Kadambuttu.png` | Kadambuttu | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/kadambuttu.png` | no |
| `Mysore Rasam.png` | Mysore Rasam | `/assets/images/collections/soups.webp` | `/assets/images/dishes/mysore-rasam.png` | no |
| `Prawn Ghee Roast.png` | Prawn Ghee Roast | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/prawn-ghee-roast.png` | no |
| `Udupi Sambar.png` | Udupi Sambar | `/assets/images/collections/soups.webp` | `/assets/images/dishes/udupi-sambar.png` | no |
| `Tambuli.png` | Tambuli | `/assets/images/collections/soups.webp` | `/assets/images/dishes/tambuli.png` | no |

## Style Gate

Reference images used:

- Approved Karnataka A1 images:
  - `frontend/assets/images/dishes/ghee-rice.png`
  - `frontend/assets/images/dishes/ragi-rotti.png`
  - `frontend/assets/images/dishes/neer-dosa.png`
- Approved Karnataka A2 / held-resolution images:
  - `frontend/assets/images/dishes/akki-rotti.png`
  - `frontend/assets/images/dishes/bonda.png`
- Approved Northeast image:
  - `frontend/assets/images/dishes/bamboo-shoot-pork.png`

Temporary contact sheet:

```text
/private/tmp/karnataka-final-wave-1-contact-sheet.jpg
```

All nine images matched the Tomo/Karnataka visual language:

- realistic home-cooked food photography
- warm natural daylight
- food-forward 30–45 degree crop
- simple serving vessels
- neutral tabletop/background
- minimal props
- no text overlays
- no restaurant styling
- no obvious AI-art look

## Classification

| Recipe | Source file | Final filename | Decision | Notes |
|---|---|---|---|---|
| Prawn Sukka | `Prawn Sukka.png` | `prawn-sukka.png` | APPROVED | Good dry coastal prawn sukka match. |
| Kotte Kadubu | `Kotte Kadubu.png` | `kotte-kadubu.png` | APPROVED | Acceptable steamed idli/kadubu presentation. |
| Set Dosa | `Set Dosa.png` | `set-dosa.png` | APPROVED | Strong set dosa breakfast match. |
| Chicken Sukka | `Chicken Sukka.png` | `chicken-sukka.png` | APPROVED | Good dry chicken sukka match. |
| Kadambuttu | `Kadambuttu.png` | `kadambuttu.png` | APPROVED | Clear rice dumpling presentation. |
| Mysore Rasam | `Mysore Rasam.png` | `mysore-rasam.png` | APPROVED | Good rasam bowl; visually distinct from generic soup fallback. |
| Prawn Ghee Roast | `Prawn Ghee Roast.png` | `prawn-ghee-roast.png` | APPROVED | Strong red ghee roast masala appearance. |
| Udupi Sambar | `Udupi Sambar.png` | `udupi-sambar.png` | APPROVED | Good sambar bowl with vegetables and tempering. |
| Tambuli | `Tambuli.png` | `tambuli.png` | APPROVED | Good pale yogurt-coconut tambuli look. |

Regenerate:

- None.

Hold:

- None.

## Images Integrated

Copied to:

```text
frontend/assets/images/dishes/
```

Integrated files:

```text
frontend/assets/images/dishes/prawn-sukka.png
frontend/assets/images/dishes/kotte-kadubu.png
frontend/assets/images/dishes/set-dosa.png
frontend/assets/images/dishes/chicken-sukka.png
frontend/assets/images/dishes/kadambuttu.png
frontend/assets/images/dishes/mysore-rasam.png
frontend/assets/images/dishes/prawn-ghee-roast.png
frontend/assets/images/dishes/udupi-sambar.png
frontend/assets/images/dishes/tambuli.png
```

## Mappings Updated

Updated image paths only in:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

| Recipe | Old image | New image |
|---|---|---|
| Prawn Sukka | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/prawn-sukka.png` |
| Kotte Kadubu | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/kotte-kadubu.png` |
| Set Dosa | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/set-dosa.png` |
| Chicken Sukka | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/chicken-sukka.png` |
| Kadambuttu | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/kadambuttu.png` |
| Mysore Rasam | `/assets/images/collections/soups.webp` | `/assets/images/dishes/mysore-rasam.png` |
| Prawn Ghee Roast | `/assets/images/dishes/lunch-default.png` | `/assets/images/dishes/prawn-ghee-roast.png` |
| Udupi Sambar | `/assets/images/collections/soups.webp` | `/assets/images/dishes/udupi-sambar.png` |
| Tambuli | `/assets/images/collections/soups.webp` | `/assets/images/dishes/tambuli.png` |

## Skipped Images

No requested Wave 1 target image was skipped.

Note: `Kayi Saaru` was part of the broader final Karnataka plan but was not included in this Wave 1 target file list, so it was not changed.

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

Focused Wave 1 mapping check:

| Check | Result |
|---|---:|
| Backend/frontend image path parity | PASS |
| Integrated image files exist | PASS |
| Recipes use expected final paths | PASS |

## Remaining Karnataka Placeholder / Generic Count

Before Wave 1 integration:

```text
31
```

After Wave 1 integration:

```text
22
```

Remaining Karnataka placeholder/generic recipes:

- Badanekayi Ennegayi
- Chow Chow Bath
- Congress Kadlekai
- Coorg Pandi Curry
- Davangere Benne Dosa
- Dharwad Peda
- Ellu Bella
- Girmit
- Holige
- Iyengar Bakery Toast
- Jolada Rotti
- Kadubu
- Kayi Saaru
- Majjige Huli
- Mandakki Oggarane
- Mangalore Goli Baje
- Masala Bun
- Mysore Pak
- Obbattu
- Pathrode
- Sweet Holige
- Thatte Idli

## Files Changed

Added active dish images:

- `frontend/assets/images/dishes/prawn-sukka.png`
- `frontend/assets/images/dishes/kotte-kadubu.png`
- `frontend/assets/images/dishes/set-dosa.png`
- `frontend/assets/images/dishes/chicken-sukka.png`
- `frontend/assets/images/dishes/kadambuttu.png`
- `frontend/assets/images/dishes/mysore-rasam.png`
- `frontend/assets/images/dishes/prawn-ghee-roast.png`
- `frontend/assets/images/dishes/udupi-sambar.png`
- `frontend/assets/images/dishes/tambuli.png`

Updated recipe image mappings:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

Added/updated this report:

- `notes/backlog/beta-3-karnataka-final-wave-1-integration-report.md`

## Git Status Note

Changes were not staged or committed.
