# Architecture Decisions

This file records major Tomo Beta 3 architecture decisions in chronological order where known. Dates before this documentation pass are approximate unless explicitly available in project history.

## 1. Mobile-Only Beta 3

Decision: Beta 3 focuses on the mobile web app experience.

Reason: The active Beta 3 product surface is mobile-first, and polish work is scoped to the mobile Discover, Collections, Pantry, Journal, and related flows.

Impact: Architecture documentation and validation prioritize mobile behavior and mobile audit readiness.

## 2. Ingredient-First Intelligence Platform

Decision: Tomo intelligence is centered on ingredients rather than only recipe text or generic tags.

Reason: Pantry, regional discovery, seasonal suggestions, substitutions, and explanations all require structured food knowledge.

Impact: Ingredient Knowledge became the base layer for Relationship Graph, Flavor Graph, Regional Matrix, Seasonal Intelligence, Substitution Engine, Pantry Intelligence, and Explainability.

## 3. Structured Knowledge Over Free-Form Generation

Decision: Intelligence systems must use structured records and deterministic rules.

Reason: Beta 3 recommendations and explanations need to be auditable, repeatable, and safe to ship without AI API calls.

Impact: Explainability produces structured facts, audits validate data quality, and gaps are reported as content gaps instead of being filled with invented output.

## 4. Audits As Permanent Validation Toolkit

Decision: Every major intelligence layer gets a permanent audit script and readable report.

Reason: Beta 3 needs a reliable freeze process where regressions are visible and actionable.

Impact: Image, collections, knowledge, pantry, relationship, flavor, regional, seasonal, substitution, explainability, release, and intelligence audits form the release safety net.

## 5. Content Gaps Are Separate From Warnings

Decision: Missing future recipe coverage is not the same as a broken architecture.

Reason: Some valid knowledge records describe ingredients or regions without enough active recipes yet.

Impact: Audits separate failures, warnings, and content gaps. Content gaps guide roadmap work but do not block locked intelligence.

## 6. Beta 3 Architecture Lock

Decision: The Beta 3 intelligence platform is locked.

Reason: The core systems are complete and validated. Future work should extend data and content, not redesign engine behavior.

Impact: Changes are allowed only for production bugs, audit failures, new ingredients, new recipe families, or catalog expansion. Core redesigns require a new architecture version.

## TODO

- Add exact dates and commit references for each decision when project history is available.
- Add Beta 1 and Beta 2 decision history if recovered from earlier planning docs.
