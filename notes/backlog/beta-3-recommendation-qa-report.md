# Beta 3 Recommendation QA Audit

Generated: 2026-06-24T10:26:14.222Z
Branch: beta-3-active-development
Mode: read-only QA. No recommendation logic or recipe data changed.

## Executive Summary

- Backend catalog: 660 recipes.
- Frontend catalog: 660 recipes.
- Mobile active/core pool: 658 recipes. Two records are intentionally outside core: Chicken Rice (inactive), Tomato Paneer Rice (support).
- CollectionHome coverage: 660/660.
- Broken image paths: 0.
- Exact duplicate titles: 0. Duplicate IDs: 0.

Overall recommendation QA status: **WARNING**, with one P0 blocker in dietary filtering. The meal/role filters and generated collection architecture are mostly sound, but the dietary normalizer currently undermines veg-only and non-veg filtering.

## PASS / WARNING / FAIL by Surface

| Surface | Status | Notes |
|---|---:|---|
| Tomo Pick | WARNING | Role filters and recent-cooked exclusion exist, but dietary hard-filter bug can leak non-veg into veg-only contexts; placeholder-heavy mains can reach primary surface. |
| Today's Picks | WARNING | 4-card duplicate prevention and dismissed hard-filter exist; same dietary bug affects veg-only; image placeholder risk remains. |
| Mood recommendations | WARNING | Mood boosts are modest and role-aware; newer expansion dishes rely on generic tags more than curated lists. |
| Pantry recommendations | WARNING | Protein-not-selected guard exists, but broad pantry matches can still outrank simpler matches in potato/capsicum-type scenarios. |
| Regional Journey recommendations | PASS | Display uses regional coverage, not only collectionHome; no Global Bites leakage detected. |
| Global Bites behavior | PASS | Global collections total 74 and no Indian regional journey leakage detected. |
| Collections V2 browse safety | PASS | 8 hubs present through collectionHome; no duplicate title/ID or broken image blockers found. |

## Scenario Sampling

These are static/data-driven candidate samples against the mobile meal, role, mood, pantry, and collection rules. Final browser ordering can vary with saved/cooked/dismissed local history.

### Breakfast + Quick

- Akki Roti
- Milk Toast
- Batata Poha
- Bread Upma
- Cheese Dosa
- Cheese Omelette
- Cheese Paratha
- Cheese Uttapam

### Dinner + Comfort

- Akki Roti
- Milk Toast
- Aloo Paratha
- Andhra Podi Idli
- Assamese Duck Curry
- Batata Poha
- Besan Chilla
- Veg Biryani

### Rainy + Snack

- Chicken Stew
- Pepper Rasam
- Ghugni
- Kodubale
- Kuzhi Paniyaram
- Maddur Vada
- Momo
- Nippattu

### High Protein + Lunch

- Andhra Chicken Curry
- Andhra Kodi Vepudu
- Assamese Duck Curry
- Besan Chilla
- Bisibelebath
- Bread Omelette
- Cheese Omelette
- Chettinad Chicken Curry

### Veg-only user

- Akki Roti
- Milk Toast
- Aloo Paratha
- Andhra Podi Idli
- Assamese Duck Curry
- Batata Poha
- Besan Chilla
- Veg Biryani

### Egg-friendly user

- Besan Chilla
- Bread Omelette
- Cheese Omelette
- Egg Bhurji
- Egg Dosa
- Egg Fried Rice
- Egg Paratha
- Handvo

### Non-veg user

- Andhra Chicken Curry
- Andhra Kodi Vepudu
- Assamese Duck Curry
- Besan Chilla
- Bisibelebath
- Bread Omelette
- Cheese Omelette
- Chettinad Chicken Curry

### Pantry: rice + egg

- Egg Fried Rice (rice+egg, missing core 0)
- Egg Tomato Rice Bowl (rice+egg, missing core 0)
- Chicken Fried Rice (rice+egg, missing core 1)
- Lemon Rice (rice+egg, missing core 1)
- Chicken Egg Rice Bowl (rice+egg, missing core 1)
- Chicken Pepper Rice Bowl (rice+egg, missing core 1)
- Garlic Egg Rice (rice+egg, missing core 1)
- Chicken Tomato Rice (rice+egg, missing core 2)

### Pantry: rice + paneer

- Paneer Fried Rice (rice+paneer, missing core 0)
- Paneer Pulao (rice+paneer, missing core 0)
- Paneer Capsicum Rice Bowl (rice+paneer, missing core 1)
- Paneer Corn Rice Bowl (rice+paneer, missing core 1)
- Potol Dorma (rice+paneer, missing core 1)
- Akki Roti (rice, missing core 1)
- Chicken Fried Rice (rice, missing core 1)
- Coconut Rice (rice, missing core 1)

### Pantry: coconut + fish

- Mangalorean Fish Curry (coconut+fish, missing core 0)
- Meen Moilee (coconut+fish, missing core 0)
- Malabar Fish Curry (coconut+fish, missing core 0)
- Goan Fish Curry (coconut+fish, missing core 0)
- Kerala Fish Pollichathu (coconut+fish, missing core 1)
- Kappa Meen Curry (coconut+fish, missing core 1)
- Malvani Fish Curry (coconut+fish, missing core 1)
- Kerala Fish Curry (coconut+fish, missing core 1)

### Pantry: potato + capsicum

- Aloo Capsicum Sabzi (potato+capsicum, missing core 3)
- Breakfast Burrito (potato+capsicum, missing core 3)
- Aloo Jeera (potato, missing core 1)
- Batata Poha (potato, missing core 1)
- Chilli Chicken (capsicum, missing core 1)
- Kadai Paneer (capsicum, missing core 1)
- Masala Dosa (potato, missing core 1)
- Masala Omelette (capsicum, missing core 1)

### Regional: Karnataka

- Akki Roti
- Avalakki
- Ragi Mudde
- Jolada Rotti
- Ragi Rotti
- Thatte Idli
- Davangere Benne Dosa
- Chow Chow Bath
- Vangi Bath
- Majjige Huli

### Regional: Northeast

- Aloo Pitika
- Assamese Duck Curry
- Bamboo Shoot Pork
- Eromba
- Jadoh
- Lai Xaak Bhaji
- Masor Tenga
- Momo
- Pitha
- Pork Curry

### Global: Italian/Mexican/Mediterranean

- Lentil Soup
- Shakshuka
- Breakfast Burrito
- Mexican Burrito Bowl
- Mediterranean Chickpea Bowl
- Spaghetti Aglio e Olio
- Tomato Basil Pasta
- Nachos
- Garlic Bread
- Tomato Basil Soup
- Minestrone
- Mexican Tortilla Soup
- Tacos
- Breakfast Quesadilla
- Greek Yogurt Parfait
- Falafel Hummus Bowl
- Bruschetta
- Mozzarella Sticks
- Quesadilla
- Elote Corn

## Collection Safety Counts

### Hub counts by collectionHome

- Regional Journeys: 247
- Kitchen Essentials: 73
- Everyday Cooking: 50
- Family Favorites: 46
- Celebrations & Traditions: 110
- Healthy Living: 42
- Seasonal Specials: 18
- Global Bites: 74

### Global Bites counts

- Global Breakfasts: 11
- Global Bowls: 11
- Global Mains: 12
- Global Snacks: 14
- Global Soups: 16
- Global Street Food: 10

### Regional Journey coverage vs collectionHome ownership

| Region | Coverage display count | collectionHome count |
|---|---:|---:|
| Karnataka | 59 | 40 |
| Andhra & Telangana | 48 | 30 |
| Tamil Nadu | 52 | 37 |
| Kerala | 37 | 23 |
| Bengal | 37 | 13 |
| Maharashtra | 41 | 21 |
| Northeast | 41 | 31 |
| North & West India | 52 | 52 |
| Jammu & Kashmir | 0 | 0 |

Global dishes in Indian regional journeys: 0.
Indian regional dishes in Global Bites: 0.

## Image Risk Summary

- Dedicated images: 163
- Shared non-placeholder images: 239
- Placeholder-style images: 258
- Placeholder-style main/soup recipes: 134
- Broken image paths: 0

## Top 10 Recommendation Issues

1. P0 dietary hard-filter bug: mobile normalizeDietaryTags() recognizes 0/109 non_vegetarian catalog tags because norm() converts underscores to spaces before the allowed-value check. Veg-only contexts can therefore leak meat/fish dishes.
2. P1 egg classification edge: several egg-containing or egg-associated dishes are not tagged `egg` (for example French Toast, Shakshuka, Breakfast Burrito, Korean Egg Drop Sandwich, Bibimbap Bowl, Japanese Tamago Toast), so egg-friendly ranking is less precise even after the non-veg normalizer is fixed.
3. P1 metadata gap: 3 active core recipes still have no mealTags (Dal Makhani, Khichdi, Mirchi Bajji), so meal eligibility may fall back to title/tag heuristics or fail silently.
4. P1 region gap: 1 active core recipe lacks regionTags (Coconut Macaroons), lowering regional recommendation confidence.
5. P1 image quality risk: 134 active main/soup recipes use placeholder-style images; primary surfaces can look generic even when recommendation choice is sound.
6. P1 pantry specificity: potato+capsicum can pull broad/fancy candidates such as Breakfast Burrito before simpler Indian pantry matches; missing-core thresholds should be reviewed in mobile pantry ranking.
7. P1 diversity watch: top dish families are soup 35, drink 30, rice 29, salad 26, festival sweets 25; 4-card diversity guard remains important to prevent same-family repetition.
8. P2 mood curation age: curated title lists still reference older expansion-era names; new regional/global dishes rely mostly on generic mood scoring unless added to curation lists.
9. P2 memory QA: recent-cooked and dismissed filters exist in code, but need browser-state QA with real localStorage histories after tester sessions.
10. P2 Tomo Pick dismissed behavior: dismissed items are hard-filtered for Today's Picks but only indirectly penalized for Tomo Pick through memory/recency scoring.

## Suggested Fix Priority

### P0 — Must fix before more QA

- Fix mobile dietary normalization so `non_vegetarian` survives normalization, or normalize allowed values after replacing spaces/hyphens/underscores consistently. Re-test veg-only, egg-friendly, and non-veg scenarios after this.

### P1 — Fix before Beta 3 release

- Fill the 3 remaining missing mealTags: Dal Makhani, Khichdi, Mirchi Bajji.
- Fill the remaining missing regionTags: Coconut Macaroons.
- Add a primary-surface image-quality guard or prioritize image upgrades for placeholder-heavy main/soup recipes.
- Tune pantry confidence thresholds for broad ingredient pairs, especially potato + capsicum.

### P2 — Polish / tester-cycle tuning

- Add newer high-quality expansion dishes into mood curation lists where editorially important.
- Browser-test saved/cooked/dismissed memory using real localStorage state.
- Consider hard-dismiss protection for Tomo Pick if tester feedback says skipped dishes return too soon.

## Files Inspected

- `database/generated/recipes.json`
- `frontend/local-recipes.js`
- `frontend/mobile/mobile-shell.js`
- `frontend/mobile/mobile-v2.css` was not required for logic, but UI collection/card behavior was kept in scope conceptually.

## Files Changed

- Created this report only: `notes/backlog/beta-3-recommendation-qa-report.md`.
- No recommendation logic changed.
- No recipe data changed.
- No staging or commit performed.
