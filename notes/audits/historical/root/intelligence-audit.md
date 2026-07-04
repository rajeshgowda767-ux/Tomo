# TOMO INTELLIGENCE PLATFORM AUDIT

Ingredient Knowledge..........  80
Relationship Graph............ NOT RUN
Flavor Graph.................. 100
Regional Matrix............... 100
Seasonal Intelligence......... NOT RUN
Substitutions.................  81
Explainability................ NOT RUN
Pantry Intelligence........... 100
Knowledge Bridges............. 100

Overall Intelligence Score: 94/100
Status: INTELLIGENCE READY WITH GAPS

## Systems Not Run

- Relationship Graph: npm script audit:relationships is not defined.
- Seasonal Intelligence: npm script audit:seasonal is not defined.
- Explainability: npm script audit:explainability is not defined.

## Failures And Warnings

- Ingredient Knowledge: 0 failures, 61 warnings
- Substitutions: 0 failures, 13 warnings

## Content Gaps

- Ingredient Knowledge: 7 content gaps
- Flavor Graph: 22 content gaps
- Regional Matrix: 11 content gaps

## Report Paths

- Ingredient Knowledge: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/knowledge-coverage-audit.json
- Relationship Graph: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/ingredient-relationship-audit.json
- Flavor Graph: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/flavor-graph-audit.json
- Regional Matrix: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/regional-ingredient-audit.json
- Seasonal Intelligence: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/seasonal-intelligence-audit.json
- Substitutions: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/substitution-audit.json
- Explainability: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/explainability-audit.json
- Pantry Intelligence: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/pantry-intelligence-v3-audit.json
- Knowledge Bridges: /Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/knowledge-coverage-audit.json

## Recommended Next Actions

- Add audit:relationships so Relationship Graph can be included in the unified lock decision.
- Add audit:seasonal so Seasonal Intelligence can be included in the unified lock decision.
- Add audit:explainability so Explainability can be included in the unified lock decision.
- Review warning items in the underlying intelligence audit reports.
- Use content gaps as future recipe/knowledge expansion opportunities; they are reported separately from warnings.
