# Database Coverage Audit

Scope: `database/generated/recipes.json`

Core dishes audited: `164`

Note: mood and protein counts are multi-label, so totals can exceed 164.

## Coverage Counts

### Mood

| Mood | Count |
|---|---:|
| Comfort | 137 |
| High Protein | 90 |
| Spicy | 69 |
| Quick | 50 |
| Rainy Day | 37 |
| Soul | 22 |
| Unmapped Mood | 4 |

### Meal Type

| Meal Type | Count |
|---|---:|
| Lunch | 51 |
| Breakfast | 49 |
| Snack | 32 |
| Dinner | 24 |
| Unmapped Meal | 11 |

### Cuisine

| Cuisine | Count |
|---|---:|
| Indian | 149 |
| North Indian | 3 |
| Andhra | 2 |
| Indo-Chinese / Asian | 2 |
| South Indian | 2 |
| South Indian / Fusion | 2 |
| Asian / Indo-Chinese | 1 |
| Karnataka / South Indian | 1 |
| Maharashtrian | 1 |
| Spanish | 1 |

### Region Tags

| Region Tags | Count |
|---|---:|
| No `regionTags` | 164 |

### Protein Category

| Protein Category | Count |
|---|---:|
| Carb/Veg-Forward | 52 |
| Legume/Dal | 40 |
| Chicken | 24 |
| Egg | 17 |
| Paneer | 14 |
| Other Non-Veg | 12 |
| Fish | 5 |
| Mutton | 3 |
| Soy/Tofu | 0 |

### Prep Time

| Prep Time | Count |
|---|---:|
| 0-15 min | 10 |
| 16-30 min | 120 |
| 31-45 min | 22 |
| 46+ min | 12 |

## Mood x Meal Gaps

Clearly underrepresented:

- Soul Dinner: `2`
- Soul Snacks: `0`
- Quick Dinner: `3`
- Unmapped Breakfast: `1`
- Unmapped Lunch: `2`
- Unmapped Dinner: `0`
- Unmapped Snacks: `0`

Meal-unmapped dishes:

- Biryani
- Egg Fried Rice
- Gujiya
- Kada Prasad
- Ladoo
- Modak
- Pitha
- Plum Cake
- Sabudana Khichdi
- Sweet Pongal
- Sweet Rice

Mood-unmapped dishes:

- Peas Pulao
- Mushroom Pulao
- Batata Poha
- Sweet Rice

## Duplicate / Duplicate-Like Findings

Exact duplicate title:

- `Egg Curry` appears twice

High repetition families:

| Family | Count |
|---|---:|
| Chicken family | 18 |
| Rice meal family | 16 |
| Paratha family | 10 |
| Paneer family | 10 |
| Dosa family | 9 |
| Omelette family | 7 |
| Pulao family | 6 |
| Fried rice family | 5 |
| Fritter/snack family | 5 |
| Fish family | 4 |
| Uttapam family | 4 |

These are not all bad duplicates, but they create repetition risk in recommendations and collections.

## Obvious Expansion Gaps

- `regionTags` are completely empty across all 164 core dishes.
- Cuisine metadata is too generic: `149/164` are simply `Indian`.
- Dinner coverage is thin compared with breakfast and lunch.
- Soul Food is especially thin for dinner and has no snack coverage.
- Quick Dinner is underbuilt.
- Fish and mutton are very underrepresented.
- Soy/tofu protein is missing entirely.
- True ultra-quick recipes are limited: only `10` dishes under 15 minutes.
- Several sweets and festival dishes lack meal tags.
- Regional cuisines need structure: Andhra, Karnataka, Maharashtrian, South Indian, North Indian, and Indo-Chinese are present but sparse/inconsistent.

## Data Change Status

No recipe data was modified for this audit.
