# Recipe Validation Report

- Status: **PASS**
- Exit code: `0`
- Baseline: `beta-2`
- Generated at: `2026-06-22T11:23:14.021Z`
- Recipe source: `database/generated/recipes.json`

## Summary

- PASS: 16
- WARNING: 0
- FAIL: 0

## Checks

| Status | Metric | Baseline | Current | Delta | Release blocker |
| --- | --- | ---: | ---: | ---: | :---: |
| PASS | Recipe count | 449 | 449 | +0 | Yes |
| PASS | Unique IDs | 449 | 449 | +0 | Yes |
| PASS | Unique source IDs | 449 | 449 | +0 | Yes |
| PASS | Image coverage | 449 | 449 | +0 | Yes |
| PASS | Quick Guide coverage | 449 | 449 | +0 | Yes |
| PASS | Pairing coverage | 395 | 395 | +0 | Yes |
| PASS | Dietary tag coverage | 449 | 449 | +0 | No |
| PASS | Meal tag coverage | 295 | 295 | +0 | No |
| PASS | Mood tag coverage | 317 | 317 | +0 | No |
| PASS | Non-empty mood tag coverage | 306 | 306 | +0 | No |
| PASS | Region tag coverage | 278 | 278 | +0 | No |
| PASS | Alias field coverage | 128 | 128 | +0 | No |
| PASS | Non-empty alias coverage | 24 | 24 | +0 | No |
| PASS | Recipe type coverage | 449 | 449 | +0 | No |
| PASS | Dish family coverage | 449 | 449 | +0 | No |
| PASS | Schema field count | 107 | 107 | +0 | Yes |

## Findings

No regressions detected against the frozen Beta 2 baseline.

## Release decision

Release validation passed.

