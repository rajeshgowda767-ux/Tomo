# Content Standards

Tomo content must be structured, accurate, and auditable.

## Recipes

- Every active recipe must have cooking instructions.
- Instructions should sound like experienced home cooking guidance.
- Step count should vary naturally by complexity.
- Regional recipes should preserve authenticity.
- Required ingredients should be distinguished from optional, garnish, and pantry staples.
- Recipe titles should be clear and user-facing.

## Images

- Images should represent the actual dish, ingredient, collection, or cooking context.
- Avoid broken, placeholder, duplicate, or generic images for high-visibility recipes.
- High-priority surfaces include Discover, Today's Picks, hero cards, Collections, Pantry, and frequently recommended recipes.
- Image gaps should be tracked by audit reports.

## Pairings

- Pairing labels must be unique within a recipe.
- Pairings should be semantically useful.
- Duplicate labels across pairing buckets should be avoided.
- Keep pairings in the most appropriate category.

## Metadata

- Required fields must be present.
- Meal types, diet tags, cuisine, region, difficulty, servings, and times must use valid values.
- Slug and source identifiers must be stable.
- Objective metadata is separate from editorial scoring.

## Knowledge

- Ingredient records must not invent recipes.
- Recipe links must point to active local recipes.
- Regional, seasonal, flavor, relationship, and substitution data must be honest.
- Content gaps should be visible rather than hidden.

## Collections

- No empty hubs.
- No empty subcategories unless intentionally marked as future work.
- No duplicate recipes inside the same subcategory.
- Recipe placement should match collection intent.
- Main hub order and visual hierarchy should remain consistent for Beta 3.

## Naming

- Use clear canonical names for ingredients.
- Add useful aliases and regional names where known.
- Keep user-facing labels warm and concise.
- Avoid changing established names without a migration reason.

## Slugs

- Slugs should be stable.
- Slugs should reference real active local recipes.
- Do not add fake slugs for desired future recipes.

## IDs

- IDs should be deterministic and stable.
- IDs should not depend on runtime randomness.
- Existing IDs should not be changed unless fixing a documented data issue.

## TODO

- Add exact metadata enum lists when the final validation schema is documented.
- Add image quality thresholds if the image audit formalizes them.
