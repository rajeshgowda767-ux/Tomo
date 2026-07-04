# Pantry Intelligence

Pantry Intelligence V3 answers the question: what can I realistically cook with what I have now?

## Ingredient Importance

Recipe ingredients are classified by strength:

- Core
- Support
- Flavor
- Optional
- Pantry Staple
- Garnish

Core matches carry the most weight. Optional and garnish matches should not dominate recommendations.

## Knowledge Bridges

Ingredient Knowledge connects ingredients to recipe families. When multiple pantry ingredients point to compatible families, those families are boosted.

Example: Tomato and Onion should naturally surface Tomato Rice, Tomato Chutney, Onion Chutney, Rasam, and Tomato Saaru where available.

## Regional Boosts

Regional Ingredient Matrix data helps the pantry engine understand culturally meaningful matches, such as Horse Gram for Karnataka-style Bassaru or Kokum for coastal dishes.

## Recipe Family Boosts

Recipe families protect semantic quality. Pantry matches are stronger when ingredients agree on the same family, such as Rasam, Chutney, Rice, Curry Base, Saaru, or Coastal Curry.

## Confidence

Confidence is based on:

- Pantry match
- Ingredient match strength
- Knowledge family match
- Regional relevance
- Flavor compatibility
- Seasonal alignment

## Recommendation Generation

Pantry recommendations should feel useful in real kitchens. They should solve immediate cooking needs, avoid repetitive rows, and prefer recipes that match core ingredients and known food logic.
