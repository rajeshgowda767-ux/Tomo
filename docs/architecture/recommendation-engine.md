# Recommendation Engine

The Recommendation Engine turns structured knowledge into recipe suggestions.

## Pipeline

```text
Knowledge
↓
Pantry
↓
Regional
↓
Flavor
↓
Collections
↓
Ranking
↓
Recommendation
```

## Ranking

Ranking prioritizes practical fit first. Core ingredient matches and strong recipe-family matches should outrank weak familiarity. Mood relevance, pantry availability, regional fit, flavor compatibility, seasonal alignment, and user memory contribute to final order.

## Diversity

Recommendation rows should avoid repetitive clusters. Similar recipes, repeated formats, or visually similar dishes should not dominate a row when comparable alternatives exist.

## Confidence

Confidence is deterministic. It is based on pantry match, ingredient match strength, knowledge bridge strength, regional match, flavor pair strength, and seasonal alignment.

## Family Protection

Recipe families prevent random broad matching. If a user has Tomato and Onion, Tomo should favor families like rice, chutney, rasam, and curry base instead of unrelated recipes that only happen to mention the ingredients.

## Pantry Protection

Core ingredients matter more than optional, garnish, or pantry-staple matches. Pantry ranking should reward realistic cooking decisions, not incidental ingredient overlap.
