# Tomo Beta 3 Release Readiness

| Release | Value |
| --- | --- |
| Release Name | Tomo Beta 3 |
| Tagline | Food for Every Mood |
| Release Type | Internal Release Candidate |
| Readiness | **READY WITH KNOWN LIMITATIONS** |
| Source-of-truth date | 2026-07-02 |

## 1. Executive Summary

Tomo Beta 3 is a substantial product and content release. It advances the mobile experience from a recipe browser toward a connected food companion: Discover supports daily, mood-aware exploration; Kitchen separates persistent pantry inventory from temporary cooking intent; Collections provide structured discovery without competing with primary recommendations; and Journal presents saved and cooked activity as a personal cooking story.

Compared with Beta 2, Beta 3 adds a denser and more intentional Discover experience, the Cook decision dashboard, persistent Pantry management, Micro Meals, Tomo Learns, improved Shopping List flows, compact Collections discovery, refined Dish Detail presentation, and a more complete Journal. The release also establishes the Project Annapurna regional-authenticity framework across a database of 798 recipes.

The release candidate is functionally coherent and has strong data integrity. Canonical-title conflicts, duplicate titles, and duplicate alias conflicts are all at zero. Every generated recipe has a Quick Guide and pairing data. The Kitchen dashboard has been stress-tested across 520 ingredient combinations and now prevents duplicate recipes within a dashboard.

The principal limitations are content-completion issues rather than release-breaking architecture defects: 203 recipes still use placeholder imagery; 586 recipes do not yet have the full Project Annapurna metadata set; regional breadth is uneven outside the strongest audited states; Voice and Scanner remain explicit placeholders; and one Kitchen stress case had no actionable recipe result. These limitations are acceptable for an internal release candidate provided they remain visible in the release backlog.

## 2. Major Features Completed

### Discover

- Today's Picks with compact recommendation reasons and Dish Detail navigation.
- Weather and mood context.
- Micro Meals discovery with dedicated-card imagery and recipe navigation.
- Tomo Learns across Ingredient Spotlight, Regional Discovery, and Cooking Tips.
- Compact Explore Collections section after primary recommendation content.
- Mobile-first section hierarchy and bottom-navigation-safe layout.

### Kitchen

- Three focused views: Pantry, Cook, and Shopping List.
- Persistent household pantry separated from temporary Cook selections.
- Searchable category-and-ingredient browser.
- Cook decision dashboard with Best Match, Best Coverage, Combination, and Ingredient Ideas.
- Recipe thumbnails and Cook This, Save, and Skip actions.
- Voice and Scanner placeholder actions with clear coming-soon feedback.
- Duplicate prevention across all recipe-backed dashboard tiles.

### Pantry

- Persistent pantry storage and last-updated state.
- Direct save/unsave behavior from the Pantry ingredient browser.
- Regional ingredient families and Regional Finds presentation.
- Temporary cooking intent remains isolated from saved pantry state.
- Shopping List behavior remains independent.

### Collections

- Reorganized regional and intent-based discovery.
- Compact Discover entry point with full Collections access preserved.
- Six generated curated collections containing 185 collection items.
- Broader mobile collection taxonomy covering regional journeys, everyday cooking, healthy living, family, global food, kitchen essentials, seasonal food, and celebrations.

### Journal

- Final mobile section order and visual hierarchy.
- Your Kitchen Story summary.
- Saved for Later and Recently Cooked.
- Recent Activity and Tomo Insights.
- Help Tomo Improve retained as the final section.
- Bottom safe-area spacing for complete scrolling above navigation.

## 3. Project Annapurna

### Summary

Project Annapurna establishes a durable regional-authenticity model for Tomo. The current generated database contains:

| Metric | Count |
| --- | ---: |
| Recipes | 798 |
| Canonical recipes | 798 |
| Aliases | 693 |
| States represented | 26 |
| Union Territories represented | 3 |
| Regions represented | 18 |

### Architecture

- Canonical titles provide one stable identity per recipe.
- Aliases preserve English, regional, legacy, and search-compatible names.
- Authentic naming is applied only when ingredients and method support the identity.
- `origin` and `popularAcross` distinguish ownership from wider popularity.
- `foodHeritage` and `regionalNotes` capture cultural context without overloading titles.
- Sensitive dishes are protected from speculative regionalization.
- A priority-driven image pipeline separates generation, QA, approval, mapping, and regression.

### Integrity Statistics

| Check | Result |
| --- | ---: |
| Duplicate canonical titles | 0 |
| Duplicate recipe titles | 0 |
| Duplicate alias conflicts | 0 |
| Alias loops | 0 |

The remaining Holige/Obbattu overlap is a title-model cleanup item, not a duplicate alias conflict. It should be handled deliberately after Beta 3 rather than through unsafe alias-only changes.

## 4. Kitchen Engine

### Stress Test

The static Kitchen stress audit evaluated 520 combinations spanning single ingredients, two-to-four ingredient combinations, and large selections of 8-15 ingredients.

| Metric | Result |
| --- | ---: |
| Combinations tested | 520 |
| Passed | 220 |
| Warnings | 299 |
| Failed | 1 |
| Kitchen score | 90/100 |

### Decision Experience

- **Best Match** uses existing recommendation ordering while respecting selected base ingredients.
- **Best Coverage** activates for broad selections and communicates selected-ingredient coverage.
- **Combination** appears only when a real recipe uses multiple selected base ingredients.
- **Ingredient Ideas** preserve visibility for selected base ingredients when no direct combination exists.
- Guidance-only tiles remain non-navigable and do not create broken Dish Detail routes.
- The presentation layer tracks used recipe IDs and selects the next eligible ranked candidate.

After the duplicate-prevention fix, the same 520-case harness reported **0 duplicate dashboard recipes**. No scoring, ranking, pantry, or recommendation-engine logic was changed.

The primary remaining edge case is `Peanuts + Butter + Cauliflower + Prawns`, which produced no actionable recipe-backed tile in the original audit. Broader warnings largely represent ingredient-family coverage gaps, especially prawns, cauliflower, raw mango, horse gram, jackfruit, okra, brinjal, and bottle gourd.

## 5. Database

| Area | Current State |
| --- | --- |
| Total recipes | 798 generated recipes |
| Collections | 6 generated curated collections; 185 items; broader mobile taxonomy retained |
| Ingredient coverage | 15 priority families audited; 481 distinct ingredient labels observed across recipe ingredient fields |
| Regional coverage | 26 states, 3 Union Territories, and 18 regions represented |
| Pairings | Present for all 798 generated recipes through pairings or `quickGuide.bestWith` |
| Quick Guides | Present for all 798 generated recipes |
| Canonical metadata | 212 recipes currently carry the expanded canonical metadata fields |

Strong ingredient-family coverage exists for rice, chicken, mutton, fish, egg, paneer, potato, dal, and bread. Brinjal, pumpkin, bottle gourd, ragi, horse gram, and okra need broader regional representation.

## 6. Images

| Metric | Count |
| --- | ---: |
| Mapped/non-placeholder image status | 595 |
| Placeholder image status | 203 |
| Broken image paths in master audit | 0 |
| P0 critical image targets | 22 |
| P1 gold-recipe targets | 120 |
| P2 collection targets | 61 |

The image program now has three governing artifacts:

- A single food-photography style guide.
- A staged production pipeline with QA and regression gates.
- `image-status.json` as the operational status source of truth.

Priority order is P0 critical surfaces, South India, West India, East India, North India, and North East. No image should be mapped before dish, ingredient, vessel, garnish, regional-style, crop, and artifact QA.

## 7. QA Summary

### Automation

- Recipe syntax checks are part of regional implementation validation.
- Duplicate recipe IDs and titles are checked during Project Annapurna passes.
- Canonical and alias integrity audits are complete.
- Image path, placeholder, and duplicate-path audits are established.
- Collection, pantry, pairing, metadata, and intelligence audit scripts form the release safety net.
- Kitchen static stress testing covers 520 ingredient combinations.
- Dashboard duplicate-prevention rerun completed with zero duplicate findings.

### Manual QA

- Mobile layouts have been targeted throughout implementation at 360px and 390px.
- Discover, Kitchen, Pantry, Shopping List, Collections, Dish Detail, and Journal flows have explicit mobile validation criteria.
- A final device/browser smoke pass remains required before distributing the internal candidate.

### Known Issues

- Placeholder imagery remains visible for 203 recipes.
- Expanded Project Annapurna metadata is incomplete for 586 recipes.
- Several states have weak or missing foundational coverage.
- One Kitchen stress combination had no actionable recipe tile.
- Some recommendation warnings reflect missing recipe breadth rather than dashboard defects.
- Holige/Obbattu requires a deliberate post-Beta-3 title-model review.

## 8. Known Beta 3 Limitations

- 203 recipe images remain placeholders.
- P0 imagery has a defined queue but is not fully produced and approved.
- `foodHeritage`, `regionalNotes`, aliases, subtitles, origin, and popularity metadata are not complete across the full database.
- Project Annapurna depth is strongest in audited states and uneven elsewhere.
- Voice input is a non-functional coming-soon placeholder.
- Ingredient Scanner is a non-functional coming-soon placeholder.
- Nutrition and meal planning are not part of Beta 3.
- Kitchen cannot guarantee a recipe-backed result for every unusual ingredient combination.
- Final manual cross-device regression is still a release-gate activity.

## 9. Beta 4 Roadmap

- Complete P0-P2 image production and continue long-tail image replacement.
- Complete Project Annapurna metadata across the remaining recipe catalog.
- Expand foundational coverage for weak and missing states and Union Territories.
- Add nutrition views and dietary summaries.
- Introduce meal planning and repeatable weekly cooking flows.
- Add richer regional food stories and local-review governance.
- Replace Voice and Scanner placeholders with permission-aware implementations.
- Improve Shopping List grouping, quantities, and pantry reconciliation.
- Explore cooking video and guided-mode experiences after content quality is locked.
- Expand Kitchen coverage for weak ingredient families without weakening trust rules.

## 10. Final Recommendation

### READY WITH KNOWN LIMITATIONS

Tomo Beta 3 is ready to proceed as an **Internal Release Candidate**. Its core mobile journeys are integrated, the recipe database is large and structurally sound, canonical and alias conflicts are resolved, and the Kitchen decision experience has meaningful stress coverage with duplicate prevention in place. It is not yet appropriate to describe the catalog as visually or regionally complete: placeholder imagery, partial heritage metadata, uneven state coverage, and a final manual device sweep remain material work. None of those limitations invalidates an internal candidate, but all should remain explicit release conditions before a wider public beta.

## 11. Beta 3 Achievements

- 798 curated recipes, approaching the 800-recipe milestone.
- Project Annapurna naming and authenticity framework established.
- 26 states represented.
- 3 Union Territories represented.
- 18 regional identities represented.
- Zero canonical conflicts.
- Zero duplicate recipe titles.
- Zero duplicate alias conflicts.
- Every generated recipe has a Quick Guide.
- Every generated recipe has pairing data.
- Kitchen stress-tested across 520 combinations.
- Zero duplicate recipes in the post-fix dashboard stress rerun.
- Persistent Pantry and temporary Cook intent cleanly separated.
- Image photography guide, production pipeline, priority queue, and status registry established.

## Appendix: Source Documents

- [Project Annapurna Master Audit](../audits/project-annapurna/project-annapurna-master-audit.md)
- [Kitchen Stress Test](../audits/beta3-kitchen-stress-test.md)
- [Image Priority Audit](../audits/project-annapurna/image-priority-audit.md)
- [Tomo Food Photography Style Guide](../design/tomo-food-photography-style-guide.md)
- [Tomo Image Production Pipeline](../design/tomo-image-production-pipeline.md)
- [Image Production Status](../design/image-status.json)

This document is the official Beta 3 release-readiness source of truth. Where an older audit snapshot differs, this document uses the latest completed follow-up audit or remediation result available as of 2026-07-02.
