# Intelligence Flow

```mermaid
flowchart TD
    User["User"] --> Recommendation["Recommendation Engine"]
    Recommendation --> Explainability["Explainability"]
    Recommendation --> Pantry["Pantry Intelligence"]
    Pantry --> Knowledge["Ingredient Knowledge Platform"]
    Explainability --> Knowledge

    Knowledge --> Relationship["Relationship Graph"]
    Knowledge --> Flavor["Flavor Graph"]
    Knowledge --> Regional["Regional Matrix"]
    Knowledge --> Seasonality["Seasonality"]
    Knowledge --> Substitutions["Substitutions"]
    Knowledge --> Families["Recipe Families"]

    Relationship --> Recommendation
    Flavor --> Recommendation
    Regional --> Recommendation
    Seasonality --> Recommendation
    Substitutions --> Explainability
    Families --> Recommendation
```

## ASCII Fallback

```text
User
↓
Recommendation Engine
↓
Explainability
↓
Pantry Intelligence
↓
Ingredient Knowledge Platform
↓
Relationship Graph
Flavor Graph
Regional Matrix
Seasonality
Substitutions
Recipe Families
```
