# p0-wave-3 Image Import Report

Generated: 2026-06-25T15:23:03.760Z
Mode: import
Review folder: `frontend/assets/images/_generated-review/p0-wave-3`
Force enabled: no

## Summary

- Files found: 10
- Imported count: 4
- Skipped count: 6
- Recipe mappings updated: 4

## Files Found

| File | Slug | Status | Recipe | Reason |
|---|---|---|---|---|
| `frontend/assets/images/_generated-review/p0-wave-3/aamti.png` | `aamti` | SKIP | Aamti | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/batata-poha.png` | `batata-poha` | SKIP | Batata Poha | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/batata-vada.png` | `batata-vada` | IMPORTABLE | Batata Vada | Current image is placeholder/generic; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/bombil-fry.png` | `bombil-fry` | SKIP | Bombil Fry | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chakli.png` | `chakli` | IMPORTABLE | Chakli | Current image is placeholder/generic; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chepala-pulusu.png` | `chepala-pulusu` | IMPORTABLE | Chepala Pulusu | Current image is placeholder/generic; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chicken-555.png` | `chicken-555` | SKIP | Chicken 555 | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chicken-biryani.png` | `chicken-biryani` | IMPORTABLE | Chicken Biryani | Current image is placeholder/generic; safe to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chicken-majestic.png` | `chicken-majestic` | SKIP | Chicken Majestic | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chicken-sukka-maharashtrian.png` | `chicken-sukka-maharashtrian` | SKIP | Chicken Sukka Maharashtrian | Recipe already uses a dedicated/non-generic image. Use --force to replace. |

## Imported Mappings

| Recipe | Source file | Destination | Before | After |
|---|---|---|---|---|
| Batata Vada | `frontend/assets/images/_generated-review/p0-wave-3/batata-vada.png` | `frontend/assets/images/dishes/batata-vada.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/batata-vada.png` |
| Chakli | `frontend/assets/images/_generated-review/p0-wave-3/chakli.png` | `frontend/assets/images/dishes/chakli.png` | `/assets/images/collections/festival-food.webp` | `/assets/images/dishes/chakli.png` |
| Chepala Pulusu | `frontend/assets/images/_generated-review/p0-wave-3/chepala-pulusu.png` | `frontend/assets/images/dishes/chepala-pulusu.png` | `/assets/images/dishes/fish-curry.png` | `/assets/images/dishes/chepala-pulusu.png` |
| Chicken Biryani | `frontend/assets/images/_generated-review/p0-wave-3/chicken-biryani.png` | `frontend/assets/images/dishes/chicken-biryani.png` | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/chicken-biryani.png` |

## Skipped Files

| File | Reason |
|---|---|
| `frontend/assets/images/_generated-review/p0-wave-3/aamti.png` | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/batata-poha.png` | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/bombil-fry.png` | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chicken-555.png` | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chicken-majestic.png` | Recipe already uses a dedicated/non-generic image. Use --force to replace. |
| `frontend/assets/images/_generated-review/p0-wave-3/chicken-sukka-maharashtrian.png` | Recipe already uses a dedicated/non-generic image. Use --force to replace. |

## Validation

Commands to run:

```text
node scripts/validate_recipe_data.js
npm run audit:banter
```

### `node scripts/validate_recipe_data.js`

Exit code: 0

```text
Recipe validation: PASS
PASS 19 | WARNING 0 | FAIL 0
JSON: validation/recipe-validation-report.json
Markdown: validation/recipe-validation-report.md
```

### `npm run audit:banter`

Exit code: 0

```text
> cookbuddy@0.1.0 audit:banter
> node scripts/tomo-banter-audit.js


Tomo Banter Audit Summary
┌─────────┬──────────────────────────┬───────┬──────┬─────────┬────────┬─────────────────┐
│ (index) │ group                    │ count │ keep │ improve │ remove │ makeConditional │
├─────────┼──────────────────────────┼───────┼──────┼─────────┼────────┼─────────────────┤
│ 0       │ 'Mood banters'           │ 240   │ 240  │ 0       │ 0      │ 0               │
│ 1       │ 'Pantry banters'         │ 226   │ 213  │ 8       │ 0      │ 5               │
│ 2       │ 'Recommendation banters' │ 339   │ 337  │ 2       │ 0      │ 0               │
│ 3       │ 'Empty state banters'    │ 20    │ 20   │ 0       │ 0      │ 0               │
│ 4       │ 'Dish detail banters'    │ 29    │ 29   │ 0       │ 0      │ 0               │
│ 5       │ 'Journal banters'        │ 93    │ 93   │ 0       │ 0      │ 0               │
│ 6       │ 'Collection banters'     │ 184   │ 184  │ 0       │ 0      │ 0               │
│ 7       │ 'Button labels'          │ 46    │ 44   │ 2       │ 0      │ 0               │
└─────────┴──────────────────────────┴───────┴──────┴─────────┴────────┴─────────────────┘

Generated banter-audit.json
Generated banter-audit.md
```


## Safety Notes

- Recipe metadata was not modified.
- Collections were not modified.
- Global Bites was not touched.
- Review images were not deleted.
- Existing dedicated images were not overwritten unless `--force` was used.
