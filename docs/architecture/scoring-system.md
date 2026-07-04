# Scoring System

This document summarizes Tomo Beta 3 scoring models. Scores are deterministic and audit-driven.

## Recommendation Score

Measures how well a recipe fits the current recommendation context.

Affects:

- mood relevance
- pantry fit
- ingredient match strength
- recipe family relevance
- regional relevance
- flavor compatibility
- seasonal alignment
- user memory
- diversity requirements

TODO: Add exact numeric weights from the active recommendation engine when documented in code.

## Pantry Score

Measures whether a recipe is realistic for the user's selected pantry ingredients.

Affects:

- core ingredient matches
- support ingredient matches
- flavor ingredient matches
- optional ingredient matches
- pantry staple matches
- missing core ingredients
- knowledge bridge strength
- recipe family match
- regional boost
- flavor pairing
- row diversity

Expected audit: `npm run audit:pantry:v3` should score `100/100` when locked.

## Collections Score

Measures collection taxonomy quality.

Affects:

- empty hubs
- empty subcategories
- orphan recipes
- duplicate recipe placement
- intent alignment
- target size
- hub balance
- recipe exposure
- story and image quality

Expected audit: `npm run audit:collections` should have zero failures for Beta 3 readiness.

## Knowledge Score

Measures Ingredient Knowledge validity.

Affects:

- required fields
- seafood coverage
- recipe links
- bridge checks
- aliases
- regional mapping
- pantry coverage

Content gaps should be reported separately from warnings when they represent future expansion rather than broken data.

Expected audit: `npm run audit:knowledge` should score `100/100` for locked intelligence.

## Flavor Score

Measures Flavor Graph validity.

Affects:

- flavor graph presence
- primary flavors
- valid pair references
- reciprocal strong pairings
- required flavor pairs
- duplicate pairings
- generic overuse

Expected audit: `npm run audit:flavor` should score `100/100`.

## Metadata Score

Measures objective recipe metadata integrity.

Affects:

- required fields
- valid meal types
- valid cuisine or region
- prep/cook time
- servings
- difficulty
- diet tags
- ingredient references
- slug/sourceId consistency

Editorial scores should remain separate from objective metadata integrity.

TODO: Add the current metadata audit command and expected split if the repo exposes it as `npm run audit:metadata`.

## Release Score

Measures overall release readiness.

Affects:

- images
- collections
- knowledge
- pantry intelligence
- recipe authoring
- pairings
- metadata
- release blockers

Expected audit: `npm run audit:release`.

## Intelligence Score

Measures the full intelligence platform.

Systems included:

- Ingredient Knowledge
- Relationship Graph
- Flavor Graph
- Regional Matrix
- Seasonal Intelligence
- Substitutions
- Explainability
- Pantry Intelligence
- Knowledge Bridges

Content gaps do not reduce the intelligence score. Failures and real warnings do.

Expected audit: `npm run audit:intelligence` should score `100/100`, status `INTELLIGENCE LOCKED`.
