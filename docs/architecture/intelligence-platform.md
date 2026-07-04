# Intelligence Platform

Tomo Beta 3 is composed of layered intelligence systems. Each layer adds structured facts that higher layers can use without inventing behavior.

## 1. Ingredient Knowledge

The base layer. It stores canonical ingredient records, aliases, regional names, pantry roles, recipe links, families, techniques, nutrition highlights, and practical cooking context.

## 2. Relationship Graph

Models ingredients that naturally work together in cooking. This is broader than flavor: it includes culinary co-use, pantry relationships, and ingredient clusters.

## 3. Flavor Graph

Models taste compatibility separately from recipe usage. It records primary flavors, strong pairings, balancing concepts, and rare clashes.

## 4. Regional Matrix

Explains where ingredients are culturally important and how strong that connection is. It supports Regional Discovery, Tomo Learns, pantry explanations, and authentic recommendations.

## 5. Seasonal Intelligence

Describes seasonality, peak seasons, secondary seasons, best weather, and seasonal recipe links.

## 6. Substitution Engine

Provides structured ingredient substitutions with confidence, reasons, suitable recipe families, and avoid rules.

## 7. Pantry Intelligence

Uses pantry ingredients, ingredient importance, recipe families, knowledge bridges, regional boosts, and flavor context to recommend realistic dishes from what the user has.

## 8. Explainability

Produces deterministic structured facts explaining why a recipe was recommended. It does not call AI APIs or generate open-ended prose.

## 9. Recommendation Engine

Combines the above layers with mood, pantry, collections, ranking, diversity, and user memory to decide what to show.

## Information Flow

Ingredient records feed graphs, regional data, seasonality, substitutions, and recipe-family intelligence. Pantry and recommendation systems consume those facts. Explainability reads the same facts to tell the user why a recommendation makes sense.
