# Rainy Day Ranking Audit

Verdict: **PASS**

Scope: Rainy Day ranking only. Eligible list, UI, pantry, desktop, and other moods unchanged.

## Eligible List
- Pongal
- Upma
- Masala Dosa
- Ragi Porridge
- Khichdi
- Rasam Rice
- Sambar Rice
- Bisibelebath
- Pepper Rasam
- Onion Uttapam
- Aloo Paratha
- Methi Paratha
- Thukpa
- Vegetable Soup
- Mushroom Soup
- Pakora
- Bread Pakora
- Mirchi Bajji
- Masala Chai

## Ranking Tiers

Tier 1 - Complete comfort meals:
- Pongal
- Khichdi
- Masala Dosa
- Rasam Rice
- Sambar Rice
- Bisibelebath
- Thukpa
- Aloo Paratha
- Methi Paratha
- Onion Uttapam

Eligible meal fallbacks:
- Upma
- Ragi Porridge

Tier 2 - Support dishes:
- Pepper Rasam

Tier 3 - Snacks:
- Pakora
- Bread Pakora
- Mirchi Bajji

Tier 4 - Beverages / soups:
- Masala Chai
- Vegetable Soup
- Mushroom Soup

## Ranked Eligible List

| Rank | Dish | Tier | Ranking Order | Ranking Score |
|---:|---|---|---:|---:|
| 1 | Pongal | Tier 1 | 1 | 36 |
| 2 | Khichdi | Tier 1 | 2 | 36 |
| 3 | Masala Dosa | Tier 1 | 3 | 0 |
| 4 | Rasam Rice | Tier 1 | 4 | 54 |
| 5 | Sambar Rice | Tier 1 | 5 | 36 |
| 6 | Bisibelebath | Tier 1 | 6 | 0 |
| 7 | Thukpa | Tier 1 | 7 | 36 |
| 8 | Aloo Paratha | Tier 1 | 8 | 0 |
| 9 | Methi Paratha | Tier 1 | 9 | 0 |
| 10 | Onion Uttapam | Tier 1 | 10 | 0 |
| 11 | Upma | Eligible meal fallbacks | 11 | 0 |
| 12 | Ragi Porridge | Eligible meal fallbacks | 12 | 0 |
| 13 | Pepper Rasam | Tier 2 | 13 | 54 |
| 14 | Pakora | Tier 3 | 14 | 72 |
| 15 | Bread Pakora | Tier 3 | 15 | 72 |
| 16 | Mirchi Bajji | Tier 3 | 16 | 72 |
| 17 | Masala Chai | Tier 4 | 17 | 90 |
| 18 | Vegetable Soup | Tier 4 | 18 | 72 |
| 19 | Mushroom Soup | Tier 4 | 19 | 72 |

## Top 10 Ranking
1. Pongal (Tier 1, score 36)
2. Khichdi (Tier 1, score 36)
3. Masala Dosa (Tier 1, score 0)
4. Rasam Rice (Tier 1, score 54)
5. Sambar Rice (Tier 1, score 36)
6. Bisibelebath (Tier 1, score 0)
7. Thukpa (Tier 1, score 36)
8. Aloo Paratha (Tier 1, score 0)
9. Methi Paratha (Tier 1, score 0)
10. Onion Uttapam (Tier 1, score 0)

## Mapping Check

- Breakfast: Pongal, Upma, Masala Dosa, Ragi Porridge
- Lunch: Khichdi, Rasam Rice, Sambar Rice, Bisibelebath, Pepper Rasam
- Dinner: Masala Dosa, Onion Uttapam, Aloo Paratha, Methi Paratha, Thukpa, Vegetable Soup, Mushroom Soup
- Snacks: Pakora, Bread Pakora, Mirchi Bajji, Masala Chai

## Validation

- PASS Eligible list remains unchanged.
- PASS Meal dishes dominate top 10.
- PASS Tea/soups appear lower than meal fallbacks, support, and snacks.
- PASS Snacks appear below complete meals, meal fallbacks, and Pepper Rasam.
- PASS Mood mapping remains unchanged.
