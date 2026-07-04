# Recommendation Engine V2 Design Audit

Status: Design audit only. No code or recipe data was changed.

Scope reviewed:

- Active Mobile V2 recommendation logic in `frontend/mobile/mobile-shell.js`
- Mood curation and meal mapping
- Tomo Pick rotation and diversity memory
- Dish memory and feedback scoring
- Dietary tag foundation
- Region/cuisine metadata helpers
- Pantry matching and protein trust rules
- Recency exclusions and dismissed/cooked behavior

## 1. Current Engine Snapshot

Mobile V2 currently uses several partially separate recommendation systems:

- Mood recommendations use curated mood lists, meal filters, mood score, saved boost, and memory adjustment.
- Tomo Pick uses mood rotation, meal-time awareness, recent pick memory, and dish-family avoidance.
- Today's Picks use current mood plus meal category, with dismissed dishes removed from the current visible list.
- Pantry suggestions use ingredient matching tiers, selected ingredient trust rules, vegetarian-first blocking, and major protein guards.
- Dish memory tracks `saved`, `cooked`, `dismissed`, `helpful`, and `not helpful` with local-first storage.
- Dietary, regional, cuisine, pairing, and Quick Guide metadata now exist, but dietary/region signals are not yet part of scoring.

The main V2 opportunity is not to invent a new recommendation system from scratch. It is to unify these existing signals into a transparent scoring pipeline with hard filters first, explainable scoring next, and diversity controls last.

## 2. Recommended Engine Architecture

Use one shared recommendation pipeline with surface-specific presets.

```text
Candidate Source
  ↓
Hard Filters
  ↓
Base Eligibility / Surface Rules
  ↓
Scoring Modules
  - Mood Score
  - Memory Score
  - Feedback Score
  - Recency Score
  - Dietary Preference Score
  - Regional Preference Score
  - Pantry Match Score
  ↓
Diversity / Repetition Controls
  ↓
Surface Formatter
  - Tomo Pick
  - Today's Picks
  - Pantry Suggestion
  - Related Dishes
```

### Surface Presets

| Surface | Candidate Source | Primary Signal | Diversity Need | Trust Need |
| --- | --- | --- | --- | --- |
| Tomo Pick | Broad eligible dishes | Balanced mood + time + memory | Very high | Medium |
| Today's Picks | Mood + meal category | Mood + meal fit | Medium-high | Medium |
| Pantry | Pantry-compatible recipes | Ingredient match | Medium | Very high |
| Related Dishes | Same mood/family/meal | Similarity | Medium | Medium |
| Search | Text/metadata match | Query relevance | Low | High |

## 3. Signal Priority Order

Recommended order:

1. Hard filters
2. Surface eligibility rules
3. Pantry protein trust rules, when pantry context exists
4. Recency exclusions
5. Mood/meal scoring
6. Pantry match scoring
7. Memory and feedback scoring
8. Dietary and regional preference scoring
9. Diversity and repetition controls
10. Tie-breakers

This order keeps trust ahead of personalization. Tomo should never recommend a technically wrong dish just because memory or mood likes it.

## 4. Hard Filters

Hard filters decide whether a dish is allowed to enter scoring at all.

Recommended hard filters:

- Dish must be a real recipe and active Mobile V2 candidate.
- Dish must match the surface context.
- Exclude exact duplicate titles.
- Exclude dishes cooked within the last 5 days for discovery surfaces.
- Exclude dishes dismissed within the active session/day from Today's Picks replacement pool.
- Apply dietary hard filters only when the user explicitly sets a dietary preference.
- Apply pantry protein trust rules for pantry suggestions.

### Protein Trust Rules

For pantry context:

- If user selects fish, chicken, egg, paneer, mutton, pork, or tofu/soy, recommended dishes must meaningfully use that selected protein.
- If selected ingredients are vegetarian-only, do not promote chicken/fish/mutton/pork dishes unless that protein is selected.
- Do not recommend a dish requiring an unselected core protein as the main identity ingredient.
- Protein trust beats mood, memory, and cuisine boosts.

Examples:

- Wheat + Fish can suggest Fish Pakora if fish and wheat are both meaningful.
- Wheat + Fish must not suggest Egg Paratha.
- Paneer + Capsicum can suggest Kadai Paneer or Chilli Paneer.
- Onion + Capsicum should not promote Chilli Chicken unless chicken is selected.

## 5. Scoring Model

Use a normalized 0-100 score internally for each module, then combine with surface-specific weights.

### Proposed Weighted Formula

```text
finalScore =
  moodScore * moodWeight +
  memoryScore * memoryWeight +
  feedbackScore * feedbackWeight +
  recencyScore * recencyWeight +
  dietaryScore * dietaryWeight +
  regionalScore * regionalWeight +
  pantryScore * pantryWeight +
  diversityAdjustment
```

Weights should vary by surface.

| Module | Tomo Pick | Today's Picks | Pantry | Related Dishes |
| --- | ---: | ---: | ---: | ---: |
| Mood Score | 25-35% | 40-55% | 5-15% | 25-40% |
| Memory Score | 10-20% | 10-20% | 0-10% | 5-15% |
| Feedback Score | 5-15% | 5-15% | 0-10% | 5-10% |
| Recency Score | 15-25% | 10-20% | 5-15% | 10-20% |
| Dietary Preference Score | 0-20% | 0-20% | 0-20% | 0-15% |
| Regional Preference Score | 5-15% | 5-15% | 0-10% | 5-15% |
| Pantry Match Score | 0-10% | 0-10% | 60-80% | 0-10% |

If no user preference exists for dietary or region, those modules should be neutral rather than zero penalties.

## 6. Score Definitions

### 6.1 Mood Score

Purpose: How well the dish matches the selected or inferred mood.

Inputs:

- `primaryMood`
- `secondaryMood`
- `tags`
- existing mood curation lists
- mood-specific numeric scores such as `comfortScore`, `proteinScore`, `rainyDayScore`, `nostalgiaScore`, `homeStyleScore`
- meal type compatibility

Suggested scoring:

- 100: curated primary list or explicit primary mood match
- 75-90: secondary mood or high mood score match
- 50-70: support dish or weak textual match
- 0-40: fallback only
- Hard exclude: known leak or mood-specific exclusion

Mood score should still support manual curation for moods like Rainy Day and Soul Food, where emotional correctness matters more than generic tags.

### 6.2 Memory Score

Purpose: Learn what the user tends to choose.

Existing action weights:

- cooked = +5
- saved = +3
- helpful = +2
- not helpful = -2
- dismissed = -3

Recommended V2 behavior:

- Convert raw memory into normalized preference vectors:
  - favorite moods
  - favorite cuisines
  - favorite ingredients
  - favorite meal types
  - repeated dish families
- Direct dish memory should be capped so it does not over-promote the same dish.
- Cooked dishes should boost similar dishes, not the exact same dish immediately.

Suggested scoring:

- +15 to +25 for matching top favorite mood
- +8 to +15 for matching top cuisine/region
- +5 to +12 for matching favorite ingredients
- +5 to +10 for matching preferred meal type
- -10 to -30 for disliked/dismissed similar family

### 6.3 Feedback Score

Purpose: Capture explicit recommendation quality feedback.

Inputs:

- `helpful`
- `not_helpful`
- source surface
- active mood at feedback time
- dish metadata at feedback time

Recommended behavior:

- Helpful should boost the dish family, mood, and ingredient pattern slightly.
- Not helpful should suppress exact dish and similar context temporarily.
- Feedback should be context-aware. A dish can be not helpful for Rainy mood but still acceptable for Quick Dinner.

Suggested scoring:

- Exact dish helpful: +8 to +15
- Similar mood/family helpful: +3 to +8
- Exact dish not helpful: -15 to -25
- Same context not helpful: -5 to -12

### 6.4 Recency Rules

Purpose: Avoid repetition and maintain freshness.

Existing behavior:

- Dishes cooked within 5 days are excluded.
- Dishes dismissed within 7 days receive additional penalty.
- Tomo Pick tracks recent picks and avoids same dish/family for short cycles.

Recommended V2 rules:

- Exclude exact dish cooked within 5 days on discovery surfaces.
- Penalize exact dish viewed/cooked/saved recently, unless user searched for it.
- Dismissed within 7 days: strong penalty or exclusion depending on surface.
- Avoid same dish family in Tomo Pick for at least 5 hero picks.
- Avoid more than one dish from same family in Today's Picks meal row when possible.

Suggested scoring:

- Cooked within 5 days: hard exclude for discovery
- Dismissed within 7 days: -25 to -50, or hard exclude in Today's Picks
- Viewed in current session: -5 to -15
- Same family recently shown: -10 to -25

### 6.5 Dietary Preference Score

Purpose: Respect user dietary preferences without changing behavior before preferences exist.

Inputs:

- `dietaryTags`
- future user preference settings

Current safe tags:

- `vegetarian`
- `egg`
- `non_vegetarian`

Future reviewed tags:

- `no_onion_no_garlic`
- `jain`

Recommended behavior:

- If user sets vegetarian: hard exclude egg and non_vegetarian unless they explicitly allow egg.
- If user allows egg: egg can be included but should not be hidden inside vegetarian.
- If user sets non-veg allowed: no penalty.
- NONG/Jain should be opt-in only after manual backfill and validation.

Suggested scoring:

- Explicit dietary match: +10 to +25
- Neutral/no preference: 0
- Soft mismatch: -10 to -25
- Hard mismatch: hard filter

### 6.6 Regional Preference Score

Purpose: Make Tomo feel locally aware and personal without making recommendations repetitive.

Inputs:

- `regionTags.region`
- `regionTags.subRegion`
- `regionTags.cuisine`
- `cuisine`
- memory-derived favorite cuisines/regions

Recommended behavior:

- Boost regions/cuisines the user repeatedly cooks/saves.
- Keep exploration weight so Tomo still surfaces new regions.
- Treat regional preference as a secondary boost, not a hard filter unless user explicitly chooses a region.

Suggested scoring:

- Exact favorite cuisine match: +8 to +15
- Region match: +5 to +12
- Sub-region match: +5 to +10
- Discovery/exploration candidate: +2 to +6

### 6.7 Pantry Match Score

Purpose: Recommend dishes the user can realistically cook from selected ingredients.

Inputs:

- core ingredients
- required ingredients
- optional/nice-to-have ingredients
- selected pantry ingredients
- missing required items
- selected major proteins
- ingredient aliases

Recommended tiers:

- Tier 1 Strong Match: all selected meaningful ingredients are used and core identity matches.
- Tier 2 Good Match: selected ingredients are meaningfully used, with minor secondary/flavor misses.
- Tier 3 Unlock Suggestion: one ingredient is used and one key ingredient unlocks a believable dish.
- No Match: selected ingredients ignored or major selected protein ignored.

Suggested scoring:

- Tier 1: 85-100
- Tier 2: 65-84
- Tier 3: 35-64
- No Match: 0 or hard exclude

Pantry suggestions should never behave like mood recommendations. They must prioritize ingredient truth over variety or emotional fit.

## 7. Conflicts Between Signals

### Mood vs Pantry

A dish may be perfect for mood but wrong for pantry. Pantry trust should win inside Kitchen/Pantry.

Example: Comfort mood likes Egg Paratha, but Wheat + Fish should not show Egg Paratha.

### Memory vs Recency

A user may love Chicken Curry, but if cooked yesterday, it should be excluded from discovery and replaced with a similar dish.

### Dietary vs Memory

If user saved a non-veg dish before setting vegetarian preference, the new preference should win. Old memory should not override current dietary constraints.

### Region vs Mood

A favorite cuisine boost should not push a dish into the wrong emotional mood. For example, a spicy regional dish should not leak into Soul Food if Soul has hard exclusions.

### Feedback vs Exploration

Too much negative feedback suppression can narrow recommendations quickly. Use time decay and context-specific penalties.

### Curated Lists vs Metadata

Curated lists currently fix important mood quality issues. V2 should preserve curated overrides as high-priority mood gates, not replace them with generic metadata scoring.

## 8. Tomo Pick vs Today's Picks

### Tomo Pick

Tomo Pick should feel like one thoughtful suggestion.

Recommended behavior:

- Broader default mood mix when no mood is selected.
- Strong diversity controls: avoid same dish and same family for at least 5 hero picks.
- More exploration than Today's Picks.
- Meal-time aware, but not locked to one meal type.
- Heavier recency/diversity weight.
- Slight memory personalization, but not enough to become repetitive.

Suggested Tomo Pick weights:

- Mood/time fit: 30%
- Memory/feedback: 20%
- Recency/diversity: 30%
- Dietary/region: 15%
- Pantry availability: 5%, unless pantry context is active

### Today's Picks

Today's Picks should feel like a useful menu for the selected mood and meal.

Recommended behavior:

- Stronger mood and meal category fit.
- Keep 2 dishes per meal visible.
- Use dismissal replacement pool within same meal category.
- Avoid duplicate dish families within the same row.
- Less exploration than hero.

Suggested Today's Picks weights:

- Mood fit: 45%
- Meal fit: 15%
- Memory/feedback: 15%
- Recency/diversity: 15%
- Dietary/region: 10%

## 9. Pantry Suggestions vs Mood Recommendations

Pantry suggestions answer: “What can I make with what I have?”

Mood recommendations answer: “What should I cook for how I feel?”

They should not share the same ranking priorities.

### Pantry Suggestions

- Hard filter wrong protein matches.
- Strongly prioritize selected ingredient usage.
- Split Need vs Nice To Have.
- Prefer believable partial matches over globally popular dishes.
- Mood can be a small tie-breaker only.

Suggested Pantry weights:

- Pantry Match Score: 70%
- Protein trust and missing essentials: hard gate
- Memory/feedback: 5-10%
- Mood/meal: 5-10%
- Dietary preference: 5-15%
- Region/cuisine: 0-5%

### Mood Recommendations

- Mood, meal, memory, recency, and diversity matter more.
- Pantry should only be a small bonus unless user explicitly opens Kitchen/Pantry.

## 10. Example Scoring Walkthrough

Scenario:

- User selected mood: Comfort
- Meal: Dinner
- Recent memory: cooked Chicken Curry yesterday, saved Khichdi, dismissed Spicy Aloo Paratha today
- Dietary preference: none
- Favorite cuisine: South Indian
- Pantry selected: Rice + Moong Dal

Candidate: Khichdi

- Hard filters: pass; not cooked within 5 days
- Mood Score: high, Comfort/Soul identity and curated comfort fit: 90
- Memory Score: saved and similar favorite pattern: 70
- Feedback Score: neutral: 50
- Recency Score: not recently cooked/dismissed: 80
- Dietary Score: neutral/no preference: 50
- Regional Score: neutral to mild: 55
- Pantry Score: Rice + Moong Dal strong match: 95

In Pantry surface, Khichdi likely ranks first because pantry score dominates.

In Today's Picks, Khichdi still ranks high because mood and memory are strong.

Candidate: Chicken Curry

- Hard filters: fail for discovery if cooked within 5 days
- Pantry surface: fail because selected Rice + Moong Dal do not justify chicken

Candidate: Spicy Aloo Paratha

- Hard filters: pass generally
- Recency/dismissal: strong penalty due to dismissed today
- Comfort: demoted by curation
- Result: should not appear in current Comfort Today's Picks.

## 11. Recommended Implementation Plan

### Phase 1: Shared Scoring Skeleton

- Add pure helper functions only.
- Do not replace UI behavior yet.
- Implement `scoreRecipeForSurface(recipe, context)` returning a breakdown object.
- Add debug-only audit output for top candidates.

### Phase 2: Hard Filters and Recency Unification

- Centralize cooked-within-5-days exclusion.
- Centralize dismissed-within-7-days penalty/exclusion.
- Keep existing Tomo Pick recent-family memory.

### Phase 3: Dietary and Region Preference Hooks

- Use `dietaryTags` and `regionTags` as optional scoring modules.
- Keep neutral when no preference exists.
- Do not expose UI filters until NONG/Jain review is complete.

### Phase 4: Pantry Scoring Adapter

- Keep current pantry tiers and protein trust rules.
- Return pantry scoring as a module compatible with the shared scorer.
- Do not let mood/memory override protein trust.

### Phase 5: Tomo Pick V2

- Apply shared scorer with Tomo Pick weights.
- Preserve weighted default mood mix and family diversity memory.
- Validate 20-pick rotation for mood/family diversity.

### Phase 6: Today's Picks V2

- Apply shared scorer with Today's Picks weights.
- Preserve 2 dishes per meal.
- Preserve Not For Me replacement behavior.
- Validate no empty slots after repeated dismissals.

### Phase 7: Audit and Tune

- Generate per-surface recommendation audits.
- Include score breakdowns for top 10 per mood/meal.
- Validate known trust cases:
  - Wheat + Fish must not show Egg Paratha.
  - Rice + Egg should show Egg Fried Rice.
  - Rice + Moong Dal should show Khichdi/Pongal/Dal Rice.
  - Vegetarian-only pantry selections should not promote meat.

## 12. Risks

- Over-personalization can make Tomo repetitive.
- Too many hard filters can create empty recommendation pools.
- Dietary tags are safe for base tags but NONG/Jain need manual review.
- Region boosts can overfit to one cuisine unless exploration is preserved.
- Memory scores can inflate if duplicate actions are not deduped.
- Pantry trust can regress if mood scoring is allowed to override ingredient logic.
- Curated mood fixes may be lost if replaced too aggressively by generic metadata.

## 13. Final Recommendation

Build Recommendation Engine V2 as a scoring layer, not a rewrite.

Keep the existing curated mood and pantry trust work as guardrails. Add one shared score breakdown system that makes Tomo's choices explainable, tunable, and auditable across surfaces.

Recommended first implementation artifact:

```js
scoreRecipeForSurface(recipe, {
  surface: 'tomo_pick' | 'todays_picks' | 'pantry' | 'related',
  mood,
  meal,
  selectedIngredients,
  userPreferences,
  memoryEvents,
  recentContext
})
```

Return:

```js
{
  eligible: true,
  hardFilterReasons: [],
  scores: {
    mood: 0,
    memory: 0,
    feedback: 0,
    recency: 0,
    dietary: 0,
    regional: 0,
    pantry: 0,
    diversity: 0
  },
  finalScore: 0,
  explanation: []
}
```

This gives Beta 2 a stable foundation for analytics, correction loops, personalization, dietary filters, and regional recommendations without breaking the trust Tomo has already earned in Pantry and mood curation.
