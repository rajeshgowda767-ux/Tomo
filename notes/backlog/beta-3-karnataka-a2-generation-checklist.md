# Beta 3 Karnataka A2 Image Generation Checklist

Generated: 2026-06-25  
Branch: `beta-3-active-development`  
Mode: planning only. No images generated, mappings changed, files moved, or recipe data edited.

## Goal

Prepare Karnataka Image Batch A2 for the Tomo Image Pipeline V1.

Generated files should be placed into:

```text
frontend/assets/images/_generated-review/
```

Use exact recipe-slug filenames. Do not place generated candidates directly into `frontend/assets/images/dishes/`.

## Pipeline References

- `docs/tomo-image-pipeline-v1.md`
- `notes/backlog/tomo-image-pipeline-v1-checklist.md`
- `notes/backlog/beta-3-karnataka-image-batch-plan.md`

## Current Verification Summary

- Batch A2 recipes identified from the existing Karnataka batch plan: 10
- Recipes still using placeholder/generic imagery: 10
- Recipes already having a dedicated slug image: 0
- Required files to generate: 10

Dedicated image check looked for:

```text
frontend/assets/images/dishes/<recipe-slug>.png
```

No A2 dedicated destination files currently exist.

## Style Requirements

Match the accepted Tomo catalog style:

- natural home-cooked Indian food photography
- warm natural lighting
- food-forward crop
- simple plate, bowl, banana leaf, steel plate, or homestyle serving dish
- minimal props
- no text overlays
- no restaurant styling
- no obvious AI-art look
- moderate saturation
- should feel consistent with the already-approved A1 and Northeast images

## Batch A2 Checklist

| Priority | Recipe title | Slug | Required filename | Current image path | Dedicated image exists? | Short visual prompt guidance | Priority reason |
|---:|---|---|---|---|---:|---|---|
| 1 | Prawn Sukka | `prawn-sukka` | `prawn-sukka.png` | `/assets/images/dishes/lunch-default.png` | no | Coastal Karnataka dry prawn sukka, prawns coated in coconut-spice masala, curry leaves, served in a simple bowl or steel plate, warm home kitchen light. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 2 | Kotte Kadubu | `kotte-kadubu` | `kotte-kadubu.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | no | Soft steamed idlis cooked in jackfruit-leaf cups or leaf-style cups, served with coconut chutney and sambar, homestyle Udupi breakfast look. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 3 | Set Dosa | `set-dosa` | `set-dosa.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | no | Stack of soft spongy set dosas with coconut chutney and sambar, simple plate, warm Bengaluru breakfast feel, no crisp restaurant plating. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 4 | Chicken Sukka | `chicken-sukka` | `chicken-sukka.png` | `/assets/images/dishes/lunch-default.png` | no | Karnataka-style dry chicken sukka with browned chicken pieces, coconut-spice coating, curry leaves, served in a simple bowl, home-cooked texture. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 5 | Kadambuttu | `kadambuttu` | `kadambuttu.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | no | Kodagu steamed rice dumplings, small white round kadambuttu balls, served with curry on the side, simple plate, soft natural light. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 6 | Mysore Rasam | `mysore-rasam` | `mysore-rasam.png` | `/assets/images/collections/soups.webp` | no | Mysore-style rasam in a small bowl, reddish-brown broth with tomato, curry leaves, coriander, peppery home-cooked finish, rice optionally nearby. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 7 | Prawn Ghee Roast | `prawn-ghee-roast` | `prawn-ghee-roast.png` | `/assets/images/dishes/lunch-default.png` | no | Mangalorean prawn ghee roast, prawns in deep red glossy masala, curry leaves, served in a simple bowl or plate, rich but homestyle. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 8 | Udupi Sambar | `udupi-sambar` | `udupi-sambar.png` | `/assets/images/collections/soups.webp` | no | Udupi sambar in a bowl, orange lentil-vegetable sambar with drumstick or vegetables, curry leaves, served with idli/dosa/rice subtly nearby. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 9 | Kayi Saaru | `kayi-saaru` | `kayi-saaru.png` | `/assets/images/collections/soups.webp` | no | Karnataka coconut-based saaru, pale golden coconut curry/saaru in a bowl, curry leaves and mild spices, rice or ragi mudde nearby, rural homestyle. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |
| 10 | Tambuli | `tambuli` | `tambuli.png` | `/assets/images/collections/soups.webp` | no | Cool Karnataka tambuli, pale green or white yogurt-coconut herb curry in a bowl, simple tempering, rice nearby, light coastal/Malnad home meal feel. | strong Karnataka Regional Journey visibility; Tomo Pick eligible; Today's Picks eligible; high home/primary surface exposure; strong pantry likelihood; strong mood coverage |

## Required Files

Place these exact files into:

```text
frontend/assets/images/_generated-review/
```

```text
prawn-sukka.png
kotte-kadubu.png
set-dosa.png
chicken-sukka.png
kadambuttu.png
mysore-rasam.png
prawn-ghee-roast.png
udupi-sambar.png
kayi-saaru.png
tambuli.png
```

## Pre-Integration Scan Command

After the files are placed in the review folder, run:

```text
node scripts/scan_image_review_batch.js --batch=karnataka-a2 --review-dir=frontend/assets/images/_generated-review
```

Expected scan target:

- Review files: 10
- Matched recipes: 10
- No match: 0
- Multiple matches: 0
- Destination overwrite risks: 0

## Generation Notes

- Use PNG output.
- Use recipe slug filenames exactly.
- Keep all review candidates in `_generated-review/`.
- Do not overwrite existing production dish images.
- Do not update recipe mappings until style-gate approval is complete.
- Do not mix A2 files with unrelated batch files unless the scanner output is reviewed carefully.

## Next Step

Generate or provide the 10 files listed above, place them in:

```text
frontend/assets/images/_generated-review/
```

Then run the Pipeline V1 scan and style-gate review before integration.
