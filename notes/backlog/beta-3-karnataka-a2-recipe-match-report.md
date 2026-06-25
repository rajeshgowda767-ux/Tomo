# Beta 3 Karnataka A2 Recipe Match Report

Generated: 2026-06-25  
Branch: `beta-3-active-development`  
Mode: read-only investigation. No recipe data, image paths, filenames, or mappings were changed.

## Summary

Held images investigated:

- `mysore-bonda.png`
- `nuchinunde.png`
- `tomato-bath.png`

Result:

| Image filename | Match status | Recommended action |
|---|---|---|
| `mysore-bonda.png` | Existing recipe under broader title | Map to `Bonda` if product accepts Mysore Bonda as the canonical visual for generic Bonda. |
| `nuchinunde.png` | Missing recipe | Do not map yet; keep image as future asset until Nuchinunde recipe exists. |
| `tomato-bath.png` | Near match only | Do not auto-map; product decision needed between `Tomato Rice` vs future `Tomato Bath` recipe. |

## Findings

### `mysore-bonda.png`

| Field | Value |
|---|---|
| Matching recipe title | `Bonda` |
| Recipe slug | `bonda` |
| Recipe id | `9992bcd8-0abd-511b-ba21-e50fb04f5a9a` |
| sourceId | `bonda-snack` |
| Current image | `/assets/images/dishes/homestyle-kitchen-placeholder.png` |
| Match type | Existing recipe under broader title |
| Confidence | Medium-high |

Evidence:

- No exact active recipe titled `Mysore Bonda`.
- Active catalog has `Bonda`, sourceId `bonda-snack`.
- `Bonda` currently uses a placeholder image.
- `Mysore Bonda` is a plausible specific/regional version of the broader `Bonda` recipe.

Recommended mapping:

```text
mysore-bonda.png → Bonda
```

Recommended future image path, if approved:

```text
/assets/images/dishes/mysore-bonda.png
```

Reasoning:

- The recipe title is broader than the image title, but the visual is still likely appropriate.
- Safer than mapping to `Mangalore Goli Baje`, because the filename and intended image are explicitly bonda.
- If Beta 3 later adds a distinct `Mysore Bonda` recipe, this mapping should be revisited.

Product note:

- If the app wants strict title-image alignment, create or rename a proper `Mysore Bonda` recipe later.
- If the app accepts specific regional imagery for a generic recipe, map this image to `Bonda`.

## `nuchinunde.png`

| Field | Value |
|---|---|
| Matching recipe title | None found |
| Recipe slug | None |
| Recipe id | None |
| sourceId | None |
| Current image | Not applicable |
| Match type | Missing recipe |
| Confidence | High |

Evidence:

- No active title match for `Nuchinunde`.
- No active slug/sourceId/alias match for `nuchinunde` or `nuchin unde`.
- No near Karnataka catalog item clearly corresponds to steamed lentil dumplings.

Recommended mapping:

```text
Do not map yet.
```

Recommended handling:

```text
Hold nuchinunde.png as a future image asset until a Nuchinunde recipe is added.
```

Reasoning:

- There is no safe active recipe target.
- Mapping it to another dumpling/idli/snack would create inaccurate catalog imagery.

Future recipe recommendation:

```text
Add Nuchinunde as a Karnataka snack / light meal recipe, then map nuchinunde.png.
```

## `tomato-bath.png`

| Field | Value |
|---|---|
| Closest matching recipe title | `Tomato Rice` |
| Recipe slug | `tomato-rice` |
| Recipe id | `828e35bc-cde3-52fb-9b6f-f8a24bf4b892` |
| sourceId | `tomato-rice` |
| Current image | `/assets/images/dishes/tomato-rice.png` |
| Match type | Near match / possible regional naming overlap |
| Confidence | Medium-low |

Evidence:

- No exact active recipe titled `Tomato Bath`.
- Active catalog has `Tomato Rice`.
- `Tomato Rice` already has a dedicated image: `/assets/images/dishes/tomato-rice.png`.
- `Tomato Bath` can be used regionally for a tomato rice-style dish, but the existing record is generic South Indian, not clearly Karnataka-specific.

Recommended mapping:

```text
Do not auto-map.
```

Possible product choices:

1. Keep `tomato-bath.png` on hold for a future Karnataka `Tomato Bath` recipe.
2. If product decides Tomato Bath and Tomato Rice are equivalent for Tomo, map it to `Tomato Rice`.

Recommended if product approves equivalence:

```text
tomato-bath.png → Tomato Rice
```

Recommended future image path, if approved:

```text
/assets/images/dishes/tomato-bath.png
```

Reasoning:

- Mapping to `Tomato Rice` is plausible but not exact.
- Existing `Tomato Rice` already has a dedicated image, so replacing it is not urgent.
- Best default is to hold unless the product wants a Karnataka-specific tomato rice image.

## Final Recommendation

| Image filename | Matching recipe title | Recipe slug | Confidence | Recommended mapping |
|---|---|---|---|---|
| `mysore-bonda.png` | `Bonda` | `bonda` | Medium-high | Map to `Bonda` if specific-regional image for generic Bonda is acceptable. |
| `nuchinunde.png` | None | None | High missing-recipe confidence | Do not map; hold until Nuchinunde recipe exists. |
| `tomato-bath.png` | `Tomato Rice` | `tomato-rice` | Medium-low | Do not auto-map; hold unless product approves Tomato Bath = Tomato Rice. |

## Suggested Next Action

Safe immediate mapping candidate:

```text
mysore-bonda.png → Bonda
```

Hold for future recipe/content work:

```text
nuchinunde.png
tomato-bath.png
```

No files were changed as part of this audit except this report.
