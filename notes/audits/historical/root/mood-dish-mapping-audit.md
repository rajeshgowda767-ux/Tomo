# Tomo Mood-Dish Mapping Audit

Date: 2026-06-11
Data changes: None

## Method

- Source: active `database/generated/recipes.json`
- Mood placement: current `frontend/app.js` mood tier and score rules
- Priority score: mood feed score with Breakfast meal context, no pantry boost
- A dish “appears” when it is CORE/SUPPORT and scores at least 65
- Collection mapping: exact active collection item identity
- Family balancing may show only one dosa/uttapam variant at a time even when several are eligible

Identity notes:

- `Plain Dosa` maps to the active recipe named `Dosa`.
- `Plain Uttapam` has no active recipe or alias.

## 1. Dosa Mood Mapping

| Dish Name | Mood(s) | Meal Type(s) | Collection(s) | Reason for inclusion | Priority Score | Recommendation |
|---|---|---|---|---|---:|---|
| Plain Dosa (`Dosa`) | Soul Food; Comfort Food | Breakfast | None | Explicit Soul support title; Comfort/Soul metadata; high nostalgia and home-style scores | 73.6 | KEEP |
| Masala Dosa | Comfort Food; Soul Food | Breakfast | None | Comfort membership and score; generic `dosa` Soul support term | 71.4 | KEEP |
| Onion Dosa | Comfort Food; Soul Food; Spicy Food | Breakfast | None | Comfort metadata; `dosa` Soul rule; green chilli causes Spicy support | 71.4 | MOVE |
| Paneer Dosa | Comfort Food; Soul Food; High Protein; Spicy Food | Breakfast | None | Comfort metadata; `dosa` Soul rule; paneer protein; green chilli causes Spicy support | 71.5 | MOVE |
| Egg Dosa | Comfort Food; Soul Food; High Protein; Spicy Food | Breakfast | None | Comfort metadata; `dosa` Soul rule; egg protein; pepper causes Spicy support | 71.5 | MOVE |
| Cheese Dosa | None | Breakfast | None | Explicit `moodTags: []` excludes it from every mood feed | 0 | KEEP |

### Dosa Flags

- **FLAG: Paneer Dosa -> Soul Food.** Generic dosa-term matching is too broad for this fusion/protein variant. Recommend REMOVE from Soul; KEEP Comfort and Protein.
- **FLAG: Egg Dosa -> Soul Food.** Better represented by Comfort and Protein. Recommend REMOVE from Soul.
- **FLAG: Onion Dosa -> Spicy Food.** A supporting green chilli should not define the dish identity. Recommend REMOVE from Spicy.
- **FLAG: Paneer Dosa -> Spicy Food.** Optional green chilli creates the placement. Recommend REMOVE from Spicy.
- **FLAG: Egg Dosa -> Spicy Food.** Pepper alone creates the placement. Recommend REMOVE from Spicy.
- **KEEP: Cheese Dosa outside mood feeds** until mood tags are deliberately assigned.

## 2. Uttapam Mood Mapping

| Dish Name | Mood(s) | Meal Type(s) | Collection(s) | Reason for inclusion | Priority Score | Recommendation |
|---|---|---|---|---|---:|---|
| Plain Uttapam | Not found | Not found | None | No active recipe or alias represents this exact dish | N/A | REMOVE |
| Onion Uttapam | Comfort Food; Soul Food; Spicy Food | Breakfast | None | Comfort metadata; South Indian/idli-batter text triggers Soul; green chilli triggers Spicy | 71.4 | MOVE |
| Tomato Uttapam | Comfort Food; Soul Food; Spicy Food | Breakfast | None | Comfort metadata; idli-batter text triggers Soul; green chilli triggers Spicy | 71.4 | MOVE |
| Vegetable Uttapam | Comfort Food; Soul Food | Breakfast | None | Comfort metadata; idli-batter text triggers generic Soul support | 71.4 | MOVE |
| Cheese Uttapam | None | Breakfast | None | Explicit `moodTags: []` excludes it from every mood feed | 0 | KEEP |

### Uttapam Flags

- **FLAG: Vegetable Uttapam -> Soul Food.** Generic idli/dosa-family matching is not enough. Recommend REMOVE from Soul; KEEP Comfort.
- **FLAG: Tomato Uttapam -> Soul Food.** Recommend REMOVE from Soul; KEEP Comfort.
- **FLAG: Tomato Uttapam -> Spicy Food.** Optional green chilli should not define the dish. Recommend REMOVE from Spicy.
- **FLAG: Onion Uttapam -> Spicy Food.** Recommend REMOVE from Spicy.
- **REVIEW: Onion Uttapam -> Soul Food.** It is traditional and recognizable, but the current placement comes from broad text matching rather than explicit identity. Recommend KEEP only if intentionally curated.
- **KEEP: Cheese Uttapam outside mood feeds** until mood tags are deliberately assigned.
- **Plain Uttapam:** No data change recommended in this audit. The requested identity is currently absent.

## 3. Dishes Appearing in Soul Food

| Dish | Score | Recommendation | Reason |
|---|---:|---|---|
| Plain Dosa | 73.6 | KEEP | Explicit support identity and strong nostalgia/home-style profile |
| Masala Dosa | 71.2 | KEEP | Traditional, recognizable comfort/soul placement |
| Onion Dosa | 71.2 | KEEP | Recognizable traditional variant |
| Paneer Dosa | 71.4 | REMOVE | Fusion/protein variant included by generic `dosa` matching |
| Egg Dosa | 71.4 | REMOVE | Protein variant included by generic `dosa` matching |
| Onion Uttapam | 71.2 | KEEP / REVIEW | Traditional variant, but placement is inferred rather than explicit |
| Tomato Uttapam | 71.2 | REMOVE | Generic family/text match |
| Vegetable Uttapam | 71.2 | REMOVE | Generic family/text match |

Cheese Dosa and Cheese Uttapam do not appear because their mood tags are empty.

## 4. Dishes Appearing in Rainy Day

**None.**

- Plain Dosa reaches only FALLBACK at 34.3 and is not admitted to the feed.
- All other audited active variants are EXCLUDE.
- No Rainy Day changes are recommended from this audit.

## 5. Dishes Appearing in Comfort Food

| Dish | Score | Recommendation | Reason |
|---|---:|---|---|
| Plain Dosa | 71.0 | KEEP | Comfort metadata and high home-style score |
| Masala Dosa | 71.4 | KEEP | Familiar filled dosa with strong comfort score |
| Onion Dosa | 71.4 | KEEP | Familiar home-style breakfast |
| Paneer Dosa | 71.5 | KEEP | Filling comfort variant |
| Egg Dosa | 71.5 | KEEP | Filling breakfast comfort variant |
| Onion Uttapam | 71.4 | KEEP | Familiar home-style breakfast |
| Tomato Uttapam | 71.4 | KEEP | Familiar breakfast variant |
| Vegetable Uttapam | 71.4 | KEEP | Familiar family breakfast |

Cheese Dosa and Cheese Uttapam are intentionally absent because `moodTags` is empty.

## Summary Recommendations

### KEEP

- Plain Dosa: Soul Food, Comfort Food
- Masala Dosa: Soul Food, Comfort Food
- Onion Dosa: Soul Food, Comfort Food
- Paneer Dosa: Comfort Food, High Protein
- Egg Dosa: Comfort Food, High Protein
- Onion Uttapam: Comfort Food; Soul Food only if intentionally curated
- Tomato Uttapam: Comfort Food
- Vegetable Uttapam: Comfort Food
- Cheese variants: remain outside mood feeds for now

### MOVE

- Paneer Dosa: move emphasis from Soul Food to High Protein/Comfort Food
- Egg Dosa: move emphasis from Soul Food to High Protein/Comfort Food
- Tomato Uttapam: move from Soul Food to Comfort Food
- Vegetable Uttapam: move from Soul Food to Comfort Food

### REMOVE

- Spicy Food: Onion Dosa, Paneer Dosa, Egg Dosa, Onion Uttapam, Tomato Uttapam
- Soul Food: Paneer Dosa, Egg Dosa, Tomato Uttapam, Vegetable Uttapam
- Plain Uttapam row from mapping expectations until an active identity exists

