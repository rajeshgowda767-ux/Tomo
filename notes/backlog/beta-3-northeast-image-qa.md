# Beta 3 Northeast Image Integration QA

Status: blocked — no newly generated Northeast image asset files were found in the repository.

Scope:
- No new images generated.
- No recipe data changed.
- No collection/UI/generator/validator/recommendation files changed.
- No Global Bites assignments touched.

## Summary

- Target recipes checked: 11
- Newly generated Northeast image files found in repo: 0
- Broken image references found: 0
- Target recipes still using placeholder fallback: 11
- Approved images: 0
- Needs regeneration / missing actual asset files: 11
- Hold: 0

## APPROVE

None.

## NEEDS_REGENERATION

These recipes are still mapped to `/assets/images/dishes/homestyle-kitchen-placeholder.png`.
The placeholder file exists, so there are no broken references, but no actual generated asset has been integrated.

| Recipe | Source ID | Current image path | QA reason |
|---|---|---|---|
| Bamboo Shoot Pork | `expansion-pack-3-bamboo-shoot-pork` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Galho | `northeast-wave-galho` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Khar | `northeast-wave-khar` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Phagshapa | `northeast-quality-phagshapa` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Smoked Pork Curry | `northeast-wave-smoked-pork-curry` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Smoked Pork Rice | `smoked-pork-rice-lunch` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Sticky Rice | `sticky-rice-breakfast` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Zan | `northeast-quality-zan` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Tripuri Berma Curry | `northeast-quality-tripuri-berma-curry` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Tungrymbai | `northeast-wave-tungrymbai` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |
| Wahan Mosdeng | `northeast-quality-wahan-mosdeng` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | No generated dish asset found; placeholder still active. |

## HOLD

None.

## Collection/card usage check

- Regional Journeys > Northeast contains the target recipes through `collectionHome`.
- Collections V2 will display these recipes through the generated Regional Journeys/Northeast collection.
- Dish detail pages will resolve the current `imageUrl`.
- Because all 11 target recipes still point to the shared placeholder, collection cards and dish detail will continue showing the placeholder until actual image files are available and recipe image paths are explicitly updated.

## Path validation

- Current placeholder path exists.
- No broken references were found across the catalog during this QA pass.
- No accidental generated image mapping was detected.

## Next safe step

Do not generate more images until actual generated files are accessible as local files. Once files exist, copy them into the planned asset paths from `notes/backlog/beta-3-northeast-image-batch-1.md`, then run a separate image-path mapping task.
