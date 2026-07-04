# Beta 3 Release Readiness Audit

Generated: 2026-06-25

Branch: `beta-3-active-development`

Scope: active Beta 3 mobile catalog and mobile app surfaces. This audit is read-only except for creating this report.

## Executive Summary

Beta 3 is structurally close, but not visually release-ready yet.

The active catalog is healthy at the data-integrity level:

- Active recipes: 660
- Backend/frontend recipe parity: yes, 660 / 660
- Broken recipe image paths: 0
- Missing recipe images: 0
- Missing meal tags: 0
- Missing mood tags: 0
- Missing region tags: 0
- Missing dietary tags: 0
- Missing recipe roles: 0
- Missing collectionHome: 0
- Missing quick guides: 0
- Missing pairings: 0
- Missing ingredients: 0
- Duplicate titles/slugs/IDs/sourceIds: 0

The largest Beta 3 risk is image quality debt:

- Dedicated recipe images: 227
- Shared recipe images: 221
- Placeholder/generic recipe images: 212
- High-visibility image debt identified: 80+ recipes
- Used unique image paths: 303
- Total image files under `frontend/assets/images`: 483
- Unreferenced production image files: about 98

Release readiness score: 78 / 100

- Data integrity: 96 / 100
- Recommendation architecture: 84 / 100
- Collections architecture: 80 / 100
- Regional coverage: 78 / 100
- Image quality: 55 / 100
- UI consistency: 82 / 100
- Freeze hygiene: 62 / 100

## P0 / P1 / P2 Ranking

### P0 — Must fix before Beta 3 release

1. Finish/import the P0 high-visibility image waves.
   - 212 active recipes still use placeholder/generic imagery.
   - 221 use shared imagery.
   - This is highly visible in Global Bites, Kerala, Tamil Nadu, Andhra & Telangana, sweets, soups, and healthy bowls.

2. Verify real mobile recommendation scenarios manually after final image imports.
   - Hero/Tomo Pick, Today’s Picks, mood, pantry, regional, and Global Bites logic are present.
   - The remaining risk is behavioral QA, not missing code.

3. Clean the release working tree before freeze.
   - Current tree has modified recipe files and many untracked generated/review/image files.
   - Freeze should not include review folders, style-reference duplicates, swap files, or accidental image leftovers.

4. Resolve collection count expectations before release messaging.
   - `collectionHome` ownership counts differ from regional coverage counts by design.
   - Regional Journeys display correctly uses regional coverage, but release QA should verify user-facing counts.

### P1 — Fix before broad tester release

1. Reduce placeholder-heavy collection shelves:
   - Celebrations & Traditions / Festival Sweets: 106 recipes, 72 placeholders.
   - Global Bites / Global Soups: 16 recipes, 16 placeholders.
   - Healthy Living / Warm & Light Bowls: 18 recipes, 18 placeholders.
   - Global Bites / Global Bowls: 11 recipes, 9 placeholders.

2. Improve region image balance:
   - Kerala: 4 dedicated / 37 regional coverage.
   - Andhra & Telangana: 7 dedicated / 43 coverage.
   - Tamil Nadu: 8 dedicated / 45 coverage.
   - Global: 4 dedicated / 77 coverage.

3. Review small/empty collection architecture:
   - Regional Journeys / Jammu & Kashmir is empty.
   - Everyday Cooking / Home Staples is empty.
   - Seasonal Specials / Rainy Day Cravings is empty.
   - Celebrations & Traditions / Regional Sweets has 2 recipes.
   - Celebrations & Traditions / Everyday Desserts has 1 recipe.
   - Celebrations & Traditions / Prasadam & Temple Foods has 1 recipe.

4. Run device QA at 360px and 390px after final image imports.
   - Discover 4-card layout.
   - Collections hub/detail pages.
   - Kitchen pantry and shopping list.
   - Journal empty/non-empty states.

### P2 — Post-release cleanup

1. Clean unused production image files.
2. Add richer regional specialties for lower-coverage regions.
3. Improve editorial grouping names where generated group assignment feels generic.
4. Expand Journey-specific images beyond P0/P1.
5. Add automated UI smoke tests for the generated Collections V2 paths.

## 1. Image Coverage

### Overall image coverage

| Type | Count | Share |
| --- | ---: | ---: |
| Dedicated | 227 | 34.4% |
| Shared | 221 | 33.5% |
| Placeholder/generic | 212 | 32.1% |
| Missing | 0 | 0% |
| Broken | 0 | 0% |

No broken image references were found in the active recipe catalog.

### Top shared/generic reuse hotspots

| Image | Active recipe reuse |
| --- | ---: |
| `/assets/images/dishes/homestyle-kitchen-placeholder.png` | 94 |
| `/assets/images/collections/soups.webp` | 37 |
| `/assets/images/collections/desserts.webp` | 35 |
| `/assets/images/collections/festival-food.webp` | 21 |
| `/assets/images/dishes/dosa-homestyle.png` | 14 |
| `/assets/images/dishes/recommendation-pack-pepper-rasam.png` | 12 |
| `/assets/images/dishes/fish-curry.png` | 11 |
| `/assets/images/dishes/lunch-default.png` | 10 |

### Region-wise image quality

| Region | Coverage count | Dedicated | Shared | Placeholder |
| --- | ---: | ---: | ---: | ---: |
| Karnataka | 59 | 39 | 3 | 17 |
| Andhra & Telangana | 43 | 7 | 25 | 11 |
| Tamil Nadu | 45 | 8 | 27 | 10 |
| Kerala | 37 | 4 | 17 | 16 |
| Bengal | 36 | 18 | 6 | 12 |
| Maharashtra | 21 | 5 | 12 | 4 |
| Northeast | 40 | 19 | 13 | 8 |
| North & West India | 110 | 46 | 35 | 29 |
| Global | 77 | 4 | 43 | 30 |

### Image readiness assessment

- Strongest: Karnataka, Northeast, Bengal.
- Weakest: Global, Kerala, Andhra & Telangana, Tamil Nadu.
- Highest visible debt: Global Bites, Festival Sweets, Warm & Light Bowls, P0 regional mains/snacks.
- P0 recommendation: complete the current P0 image wave imports before release freeze.

## 2. Recipe Quality

### Core metadata

| Check | Result |
| --- | ---: |
| Missing meal tags | 0 |
| Missing mood tags | 0 |
| Missing region tags | 0 |
| Missing dietary tags | 0 |
| Missing recipeRole | 0 |
| Missing collectionHome | 0 |
| Missing quickGuide | 0 |
| Missing pairings | 0 |
| Missing ingredients | 0 |
| Duplicate titles | 0 |
| Duplicate slugs | 0 |
| Duplicate IDs | 0 |
| Duplicate sourceIds | 0 |
| Inactive/support recipes | 0 detected |

### Recipe role distribution

| Role | Count |
| --- | ---: |
| main | 320 |
| side | 70 |
| snack | 107 |
| soup | 53 |
| dessert | 62 |
| drink | 37 |
| condiment | 11 |

### Recipe quality assessment

Recipe data is release-ready from an integrity standpoint. The biggest remaining recipe-quality risk is not missing fields; it is whether all newly added regional recipes have equally polished editorial copy, pairings, and images.

Priority: P1 editorial sampling, not P0 structural repair.

## 3. Collections

### Hub counts

| Hub | Count |
| --- | ---: |
| Regional Journeys | 247 collectionHome-owned recipes |
| Kitchen Essentials | 73 |
| Everyday Cooking | 50 |
| Family Favorites | 46 |
| Celebrations & Traditions | 110 |
| Healthy Living | 42 |
| Seasonal Specials | 18 |
| Global Bites | 74 |

### Collection counts and image health

| Collection | Count | Dedicated | Shared | Placeholder |
| --- | ---: | ---: | ---: | ---: |
| Regional Journeys / Karnataka | 40 | 32 | 3 | 5 |
| Regional Journeys / Andhra & Telangana | 30 | 6 | 18 | 6 |
| Regional Journeys / Tamil Nadu | 37 | 8 | 23 | 6 |
| Regional Journeys / Kerala | 23 | 3 | 13 | 7 |
| Regional Journeys / Bengal | 13 | 7 | 3 | 3 |
| Regional Journeys / Maharashtra | 21 | 5 | 12 | 4 |
| Regional Journeys / Northeast | 31 | 19 | 9 | 3 |
| Regional Journeys / North & West India | 52 | 25 | 18 | 9 |
| Global Bites / Global Breakfasts | 11 | 1 | 10 | 0 |
| Global Bites / Global Bowls | 11 | 0 | 2 | 9 |
| Global Bites / Global Mains | 12 | 2 | 8 | 2 |
| Global Bites / Global Snacks | 14 | 1 | 11 | 2 |
| Global Bites / Global Soups | 16 | 0 | 0 | 16 |
| Global Bites / Global Street Food | 10 | 0 | 9 | 1 |
| Healthy Living / Healthy Plates | 24 | 5 | 8 | 11 |
| Healthy Living / Warm & Light Bowls | 18 | 0 | 0 | 18 |
| Family Favorites / Tiny Tummy Favorites | 28 | 22 | 2 | 4 |
| Family Favorites / Lunch Box & Tiffin | 18 | 6 | 10 | 2 |
| Kitchen Essentials / Sides, Salads & Add-ons | 63 | 27 | 19 | 17 |
| Kitchen Essentials / Chutneys, Podis & Condiments | 10 | 6 | 2 | 2 |
| Celebrations & Traditions / Festival Sweets | 106 | 18 | 16 | 72 |
| Celebrations & Traditions / Regional Sweets | 2 | 0 | 0 | 2 |
| Celebrations & Traditions / Everyday Desserts | 1 | 0 | 0 | 1 |
| Celebrations & Traditions / Prasadam & Temple Foods | 1 | 0 | 0 | 1 |
| Everyday Cooking / Daily Comforts | 33 | 6 | 22 | 5 |
| Everyday Cooking / Tea Time Favourites | 17 | 11 | 2 | 4 |
| Seasonal Specials / Summer Cooling | 18 | 17 | 1 | 0 |

### Empty generated collections

- Regional Journeys / Jammu & Kashmir
- Everyday Cooking / Home Staples
- Seasonal Specials / Rainy Day Cravings

These are hidden if empty in generated UI, but they are release-copy/product architecture decisions.

### Collections readiness

Collections V2 architecture is solid:

- Generated from `collectionHome`.
- Regional Journey display augments ownership with regional coverage.
- Empty collection cards are not shown.
- Grouping is dynamic by role and collection-specific editorial rules.

Main risk: image quality and count expectations.

## 4. Regional Journeys

### Regional coverage counts

| Region | Coverage count | Image quality note |
| --- | ---: | --- |
| Karnataka | 59 | Strong coverage and image quality; still some final image debt. |
| Andhra & Telangana | 43 | Strong recipe count; image quality still weak. |
| Tamil Nadu | 45 | Strong recipe count; mostly shared/generic images. |
| Kerala | 37 | Good coverage; image debt is high. |
| Bengal | 36 | Good coverage; moderate image debt. |
| Maharashtra | 21 | Under-expanded compared with other major regions. |
| Northeast | 40 | Good coverage and improving image quality. |
| North & West India | 110 | Large but broad; may need regional split later. |
| Global | 77 | Good count; images are the weakest. |

### Missing regional specialties

P1/P2 additions to consider after image freeze:

- Karnataka: more desserts, Kodagu sides, Malnad vegetarian staples.
- Andhra & Telangana: more Telangana home foods, pickles/podis, breakfast/tiffin variety.
- Tamil Nadu: Kongu vegetarian staples, more Chettinad non-veg, temple prasadam.
- Kerala: drinks, Onam sadya sides, Malabar snacks, dedicated seafood images.
- Bengal: more snacks, pitha variants, fish images, Kolkata street foods.
- Maharashtra: needs another expansion pass: Vidarbha, Konkan, Pune/Mumbai street food, festival dishes.
- Northeast: add more state-specific everyday vegetarian dishes and Sikkim/Arunachal coverage.
- North & West India: too broad; split later into Punjab/Delhi, Rajasthan/Gujarat, Kashmir/Himachal if product scope allows.

### Regional readiness

Regional catalog depth is good enough for Beta 3. Visual representation is not yet balanced.

## 5. Recommendation Engine

### Current state

Inspected mobile recommendation logic in `frontend/mobile/mobile-shell.js`.

Release-ready architecture is present:

- Hard filters for inactive recipes, pantry-search-only recipes, dietary preference, egg handling, pantry compatibility, missing selected proteins, recently cooked recipes, and recently dismissed recipes.
- Surface-specific scoring for Tomo Pick, Today’s Picks, Pantry, and Related.
- Role-aware filtering supports main, side, condiment, snack, drink, dessert, and soup.
- Four-card Today’s Picks prevents duplicates and separates:
  - Tomo’s Best Pick
  - Familiar Favorite
  - From Your Kitchen / Quick & Easy
  - Explore Something Different
- Mood scoring includes role adjustments and rainy/spicy/protein/quick/contextual boosts.
- Diversity scoring penalizes repeated recipe IDs, dish families, and regions.
- Recent Tomo Pick memory reduces repeat IDs/families/regions.
- Saved/cooked/helpful/not-helpful/dismissed memory feeds scoring.

### Recommendation risks

P0:

- Manual scenario QA must be rerun after final image imports and before release.

P1:

- High placeholder/shared image exposure can make otherwise good recommendations look low-quality.
- Global Bites and healthy bowls may appear visually generic until images improve.
- North & West India is broad enough that diversity may feel regionally vague.

P2:

- Add automated scenario tests for common states:
  - Breakfast + Quick
  - Dinner + Comfort
  - Rainy + Snack
  - Protein + Lunch
  - Veg-only
  - Egg-friendly
  - Non-veg
  - Pantry: rice + egg
  - Pantry: coconut + fish

## 6. Pantry

### Current state

Pantry logic is strong:

- Uses selected ingredients.
- Scores matched, required, missing, main, secondary, nice-to-have, and protein requirements.
- Penalizes missing major proteins.
- Supports pantry-compatible recipe filtering.
- Supports add-needed item flow into Shopping List.
- Shows matched/needed ingredient counts on pantry recommendation cards.
- Has ingredient alias handling and pantry/detail availability agreement checks.

### Pantry risks

P1:

- Ingredient normalization should receive real-user QA with spelling variants and common pantry names.
- Pantry recommendation quality depends on recipe ingredient quality; data is complete, but ingredient specificity may vary.

P2:

- Add a pantry QA matrix for 20 common ingredient sets.
- Add automated pantry scoring regression tests.

## 7. Shopping List

### Current state

Shopping list integration is present:

- Missing recipe ingredients can be added from pantry and dish detail.
- Duplicate grocery names are merged by normalized name.
- Existing grocery items are reactivated instead of duplicated.
- `neededFor` tracks recipe titles.
- Items can be removed per recipe context.
- Copy and native share flows are present with fallback copy behavior.
- Shopping list has empty/guidance UI.

### Shopping List risks

P1:

- Needs manual UX QA for duplicate handling, pantry sync, and remove/re-add flows.
- Needs confirmation that copied text is useful and grouped well enough for testers.

P2:

- Add quantity support later.
- Add category grouping polish if tester feedback asks for it.

## 8. Journal

### Current state

Journal architecture is present:

- Saved and cooked dishes are persisted.
- Recently cooked section has an empty state.
- Saved section has an empty state.
- Activity timeline exists.
- Cooking insights and memory signals exist.
- Saved/cooked/dismissed/helpful/not-helpful events influence recommendation memory.

### Journal risks

P1:

- Manual QA needed for the first-run empty state and post-cook/post-save transitions.
- Insight copy should be checked with small data sets so it does not feel repetitive.

P2:

- Add richer longitudinal insights after Beta 3.
- Add export/share only if testers ask.

## 9. UI Consistency

### Current state

Mobile Beta 3 UI appears internally consistent by architecture:

- Bottom navigation has primary tabs.
- Discover has mood guidance, meal selector, and 2x2 Today’s Picks.
- Collections V2 has hub → collection → dish hierarchy.
- Kitchen owns Pantry and Shopping List.
- Journal owns saved/cooked/activity/insights.

### UI risks

P0:

- Final device pass at 360px and 390px after image imports.

P1:

- Check card crop behavior with newly imported P0 images.
- Check whether placeholder-heavy collections still feel unfinished.
- Check typography consistency across Collections detail, Kitchen, and Journal.

P2:

- Add visual regression screenshots for core mobile screens.

## 10. Freeze Hygiene / Repository State

Current working tree is not release-freeze clean.

Observed:

- `database/generated/recipes.json` modified.
- `frontend/local-recipes.js` modified.
- Multiple untracked generated/review folders.
- Multiple untracked image files under `frontend/assets/images/dishes/`.
- A swap file exists: `notes/backlog/.p0-wave-1-image-import-report.md.swp`.

P0 before release freeze:

1. Decide which generated dish images are accepted.
2. Import accepted images through the importer.
3. Validate catalog and banter audit.
4. Delete or archive review folders and swap files.
5. Commit only accepted runtime/data/assets/docs.

## Beta 3 Release Blockers

### P0 blockers

| Area | Blocker | Why |
| --- | --- | --- |
| Images | High-visibility P0 image debt remains | User-facing recommendations and collections still look unfinished. |
| QA | Final mobile scenario QA not rerun after latest image/import changes | Recommendation architecture exists, but release needs current-state verification. |
| Freeze hygiene | Working tree contains uncommitted data and untracked generated assets | Risk of shipping accidental review files or missing accepted assets. |
| Device UI | Needs final 360px/390px smoke pass | Discover/Collections/Kitchen/Journal should be checked with final images. |

### P1 blockers

| Area | Issue | Why |
| --- | --- | --- |
| Global Bites | 4 dedicated images across 77 global-coverage recipes | Global Bites will feel placeholder-heavy. |
| Kerala/Tamil/Andhra images | Regional visual quality is uneven | Regional Journeys may feel inconsistent. |
| Celebrations & Traditions | Festival Sweets has 72 placeholders | Sweets/festival shelves look unfinished. |
| Small collections | Several collections have 1–2 recipes or are empty | Product architecture may look thin if surfaced incorrectly. |
| Shopping/Journal UX | Needs manual end-to-end QA | Code exists, but user flow quality should be verified. |

### P2 cleanup

| Area | Issue |
| --- | --- |
| Assets | About 98 unreferenced production image files should be reviewed later. |
| Tests | Add automated recommendation/pantry/collection smoke tests. |
| Regions | Expand Maharashtra and split North & West India later. |
| Editorial | Review pairings and quickGuide tone after image freeze. |

## Recommended Release Sequence

1. Finish P0 image imports.
2. Run recipe validator and banter audit.
3. Run mobile scenario QA:
   - Discover first load.
   - Mood chips.
   - Breakfast / Lunch / Dinner / Snack.
   - Four Today’s Picks cards.
   - Collections hub → collection → dish.
   - Regional Journey pages.
   - Global Bites pages.
   - Pantry ingredient selection.
   - Add missing items to Shopping List.
   - Save/Cook and Journal update.
4. Clean generated/review folders and swap files.
5. Re-run git status and diff-stat.
6. Commit accepted Beta 3 runtime/data/assets/docs.
7. Tag release candidate.

## Final Recommendation

Do not freeze Beta 3 yet.

The data foundation is release-ready, but the product still needs a visual readiness pass and final mobile QA. The safest path is:

- P0: finish high-visibility images and freeze hygiene.
- P1: verify mobile flows and reduce the worst collection image debt.
- P2: clean unused assets and broaden regional polish after release.

Once P0 image imports and final mobile smoke checks pass, Beta 3 should be ready for a release candidate.
