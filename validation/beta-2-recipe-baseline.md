# Beta 2 Recipe Baseline

This document freezes the validation metrics for the enriched Beta 2 production recipe catalog.

- Source: `database/generated/recipes.json`
- Baseline version: `beta-2`
- Generated at: `2026-06-22T11:06:15Z`
- Total recipes: 449

## Identity

| Metric | Count | Coverage |
| --- | ---: | ---: |
| Recipes | 449 | 100% |
| Unique IDs | 449 | 100% |
| Unique source IDs | 449 | 100% |

## Runtime content

| Metric | Count | Coverage |
| --- | ---: | ---: |
| Images | 449 | 100% |
| Quick guides | 449 | 100% |
| Pairings | 395 | 87.97% |
| Total pairing items | 1,196 | — |

## Classification metadata

| Metric | Count | Coverage |
| --- | ---: | ---: |
| Dietary tags | 449 | 100% |
| Meal tags | 295 | 65.70% |
| Mood tags present | 317 | 70.60% |
| Mood tags non-empty | 306 | 68.15% |
| Region tags | 278 | 61.92% |
| Recipe type | 449 | 100% |
| Dish family | 449 | 100% |

## Aliases

| Metric | Count | Coverage |
| --- | ---: | ---: |
| Alias field present | 128 | 28.51% |
| Alias field non-empty | 24 | 5.35% |

## Schema

| Metric | Count |
| --- | ---: |
| Unique top-level recipe fields | 107 |

## Baseline use

Future validation should treat decreases in image coverage, quick-guide coverage, pairing coverage, pairing-item count, classification coverage, alias coverage, recipe-type coverage, or dish-family coverage as regressions unless explicitly approved.

Recipe removals and identity changes must be reviewed separately rather than accepted solely because aggregate coverage percentages remain stable.
