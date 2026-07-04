# Audits

Audits are the permanent validation toolkit for Tomo Beta 3. They separate real failures from future content gaps.

## Release

Command: `npm run audit:release`

Purpose: Runs the master release readiness audit.

Expected score: Beta-ready release score with zero failures.

## Intelligence

Command: `npm run audit:intelligence`

Purpose: Aggregates the full intelligence platform.

Expected score: `100/100`, status `INTELLIGENCE LOCKED`.

## Collections

Command: `npm run audit:collections`

Purpose: Validates collection structure, coverage, intent, population, and balance.

Expected score: Beta-ready with zero failures.

## Knowledge

Command: `npm run audit:knowledge`

Purpose: Validates ingredient knowledge coverage and bridges.

Expected score: `100/100` for locked intelligence.

## Relationships

Command: `npm run audit:relationships`

Purpose: Validates Ingredient Relationship Graph coverage, references, reciprocal relationships, clusters, and bridge checks.

Expected score: `100/100`.

## Regional Ingredients

Command: `npm run audit:regional-ingredients`

Purpose: Validates regional strength data, signature dish references, regions covered, and regional bridge checks.

Expected score: `100/100`.

## Seasonal Intelligence

Command: `npm run audit:seasonal`

Purpose: Validates seasonality data, seasonal bridge checks, allowed values, and seasonal content gaps.

Expected score: `100/100`.

## Substitutions

Command: `npm run audit:substitutions`

Purpose: Validates substitution records, confidence, reasons, suitable/avoid rules, and bridge checks.

Expected score: `100/100`.

## Flavor Graph

Command: `npm run audit:flavor`

Purpose: Validates taste pairings, primary flavors, reciprocal strong pairings, and flavor bridge checks.

Expected score: `100/100`.

## Pantry V3

Command: `npm run audit:pantry:v3`

Purpose: Validates realistic pantry scenarios and recommendation intelligence.

Expected score: `100/100`.

## Metadata

Command: `npm run audit:metadata`

Purpose: Validates objective recipe metadata integrity when available.

Expected score: No integrity failures. Editorial scoring may remain separate.
