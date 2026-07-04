# Tomo Architecture

Tomo Beta 3 is an ingredient-first intelligence platform for mobile cooking recommendations. The system is built around structured food knowledge: ingredients, pantry context, recipe families, regional meaning, flavor relationships, seasonality, substitutions, and explainable recommendations.

The Beta 3 architecture is locked. Future work should extend the current systems through new records, recipes, audits, and versioned additions rather than redesigning core engine behavior.

## Philosophy

Ingredient-first intelligence platform.

Tomo starts with what food means: what ingredients are, how they behave, where they belong, what they pair with, when they are best, and how they help a cook decide what to make now.

## Directory Guide

- `beta3-lock.md`: locked architecture status and modification policy.
- `intelligence-platform.md`: intelligence layers and how they build on each other.
- `recommendation-engine.md`: recommendation pipeline and ranking protections.
- `pantry-intelligence.md`: Pantry Intelligence V3 behavior.
- `knowledge-platform.md`: ingredient knowledge schema.
- `audits.md`: permanent audit toolkit and expected scores.
- `future-roadmap.md`: future work that does not redesign the locked platform.
- `diagrams/intelligence-flow.md`: architecture flow diagram.

## Reading Order For New Developers

1. Read `beta3-lock.md` first to understand what is frozen.
2. Read `intelligence-platform.md` for the system model.
3. Read `knowledge-platform.md` before changing ingredient data.
4. Read `recommendation-engine.md` and `pantry-intelligence.md` before touching ranking behavior.
5. Read `audits.md` before making or validating changes.
6. Use `future-roadmap.md` to place new work without disturbing the Beta 3 lock.
