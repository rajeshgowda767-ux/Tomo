# Beta 3 Karnataka A2 Held Image Resolution Report

Generated: 2026-06-25  
Branch: `beta-3-active-development`

## Summary

Approved held image mapped:

```text
mysore-bonda.png → Bonda
```

Unmapped images left unchanged:

```text
nuchinunde.png
tomato-bath.png
```

No new recipes were added. No recipe metadata, collections, Global Bites assignments, or recommendation logic were changed.

## Confirmations

### Recipe exists

| Check | Result |
|---|---:|
| Recipe title `Bonda` exists | PASS |
| Recipe slug/title slug `bonda` confirmed | PASS |
| Single Bonda record found | PASS |

Bonda record:

```text
title: Bonda
slug: bonda
id: 9992bcd8-0abd-511b-ba21-e50fb04f5a9a
sourceId: bonda-snack
```

### Source image exists

Source image used:

```text
frontend/assets/images/_generated-homestyle-preview/mysore-bonda.png
```

The same source image also exists in:

```text
frontend/assets/images/_generated-review copy/mysore-bonda.png
```

The `_generated-homestyle-preview` copy was used.

## Image Copy

Copied:

```text
frontend/assets/images/_generated-homestyle-preview/mysore-bonda.png
```

to:

```text
frontend/assets/images/dishes/bonda.png
```

No existing production image was overwritten.

## Mapping Updated

Updated Bonda only in:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

| Recipe | Old image | New image |
|---|---|---|
| Bonda | `/assets/images/dishes/homestyle-kitchen-placeholder.png` | `/assets/images/dishes/bonda.png` |

Both `imageUrl` and mirrored `image_url` fields were updated where present.

## Unmapped Images

These were intentionally not mapped:

| Image | Decision | Reason |
|---|---|---|
| `nuchinunde.png` | Unmapped | No active recipe record exists. |
| `tomato-bath.png` | Unmapped | No approved mapping; `Tomato Rice` was left unchanged. |

Verification:

- `Tomato Rice` still maps to `/assets/images/dishes/tomato-rice.png`.
- `Nuchinunde` still has no active recipe record.

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

Focused check:

| Check | Result |
|---|---:|
| Bonda backend/frontend image parity | PASS |
| `frontend/assets/images/dishes/bonda.png` exists | PASS |
| Tomato Rice unchanged | PASS |
| Nuchinunde unchanged / no active record | PASS |

## Files Changed

Added image:

- `frontend/assets/images/dishes/bonda.png`

Updated recipe image mapping:

- `database/generated/recipes.json`
- `frontend/local-recipes.js`

Added report:

- `notes/backlog/beta-3-karnataka-a2-held-image-resolution-report.md`

## Git Status Note

Changes were not staged or committed.
