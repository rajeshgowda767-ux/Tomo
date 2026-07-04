# Tomo Post-Expansion Audit

Audit-only report. No data was modified.

## Source Consistency

- `database/generated/recipes.json`: 231 dishes
- `local-recipes.js`: matches generated database
- `frontend/local-recipes.js`: matches generated database

## 1. Quick Guide Coverage

| Metric | Value |
| --- | --- |
| Total dishes | 231 |
| Dishes with Quick Guide | 142 |
| Coverage | 61.5% |
| Dishes missing Quick Guide | 89 |

Top categories missing Quick Guides by dish family:

| Dish Family | Missing Count |
| --- | --- |
| chicken | 13 |
| dosa | 6 |
| paratha | 6 |
| rice-meal | 6 |
| wheat flour | 5 |
| omelette | 4 |
| besan | 3 |
| green chilli | 3 |
| idli | 3 |
| maida | 3 |
| paneer-curry | 3 |
| bread | 2 |

Top cuisines missing Quick Guides:

| Cuisine | Missing Count |
| --- | --- |
| North Indian | 19 |
| Andhra | 9 |
| South Indian | 9 |
| Baby Food | 6 |
| Global | 4 |
| Maharashtrian | 4 |
| Tamil | 4 |
| Hyderabadi | 3 |
| Indian | 3 |
| Indian Street Food | 3 |
| Northeast Indian | 3 |
| South Indian / Fusion | 3 |

Dishes missing Quick Guide:

- Andhra Kodi Vepudu
- Andhra Podi Idli
- Apple Puree
- Biryani
- Boiled Corn
- Bonda
- Bread Pakora
- Butter Chicken
- Chaat
- Cheese Dosa
- Cheese Omelette
- Cheese Paratha
- Cheese Uttapam
- Chicken 555
- Chicken 65
- Chicken Chettinad
- Chicken Majestic
- Chicken Mushroom Stir Fry
- Chicken Potato Curry
- Chicken Rice
- Chicken Sukka
- Corn Soup
- Dal Roti
- Dragon Chicken
- Egg Dosa
- Egg Paratha
- Fish Pakora
- Gongura Mutton
- Gujiya
- Gunpowder Idli
- Guntur Chicken Fry
- Guntur Chilli Chicken
- Kaaram Dosa
- Kachori
- Kada Prasad
- Kadhi Chawal
- Keema Fry
- Kerala Fish Curry
- Kheema Pav
- Kolhapuri Chicken
- Kolhapuri Misal Pav
- Laal Maas
- Ladoo
- Lemon Sevai
- Madras Curry
- Masala Chai
- Mashed Banana
- Mathri
- Mirapakaya Bajji
- Mirchi Bajji
- Mirchi Ka Salan
- Modak
- Momos
- Mooli Paratha
- Mushroom Omelette
- Mushroom Soup
- Mutton Pulao
- Nattu Kozhi Curry
- Oats Porridge
- Pakora
- Palak Paratha
- Paneer Dosa
- Paneer Mushroom Masala
- Paneer Pakora
- Paneer Tikka Masala
- Pitha
- Plain Chapati
- Plum Cake
- Pork Curry
- Prawn Ghee Roast
- Ragi Porridge
- Rice Cakes
- Rice Porridge
- Samosa
- Smoked Pork Rice
- Soft Idli
- Spanish Omelette
- Spicy Aloo Paratha
- Spicy Masala Dosa
- Sticky Rice
- Stuffed Paratha
- Sweet Holige
- Sweet Pongal
- Sweet Rice
- Tomato Omelette
- Tomato Uttapam
- Veg Sandwich
- Vegetable Puree
- Wheat Dosa

## 2. Pairing Coverage

| Metric | Value |
| --- | --- |
| Dishes with pairings | 67 |
| Coverage | 29.0% |
| Dishes missing pairings | 164 |

Pairing type distribution:

| Pairing Type | Dish Count |
| --- | --- |
| sides | 56 |
| chutneys | 11 |
| pickles | 7 |
| drinks | 14 |
| rice | 31 |
| roti | 9 |
| toppings | 18 |

Dishes missing pairings:

- Aloo Paratha
- Andhra Chicken Curry
- Andhra Egg Fry
- Andhra Kodi Vepudu
- Andhra Podi Idli
- Apple Puree
- Avalakki
- Batata Poha
- Besan Chilla
- Biryani
- Bisibelebath
- Boiled Corn
- Bonda
- Bread Omelette
- Bread Pakora
- Bread Upma
- Butter Chicken
- Chaat
- Cheese Dosa
- Cheese Omelette
- Cheese Paratha
- Cheese Uttapam
- Chicken 555
- Chicken 65
- Chicken Chettinad
- Chicken Curry
- Chicken Fried Rice
- Chicken Majestic
- Chicken Mushroom Stir Fry
- Chicken Potato Curry
- Chicken Pulao
- Chicken Rice
- Chicken Roll
- Chicken Stew
- Chicken Sukka
- Chilli Chicken
- Chilli Mushroom
- Chilli Paneer
- Chole Chawal
- Coconut Rice
- Corn Chaat
- Corn Soup
- Curd Rice
- Dal Makhani
- Dal Rice
- Dal Roti
- Dosa
- Dragon Chicken
- Egg Bhurji
- Egg Curry
- Egg Curry Rice
- Egg Dosa
- Egg Fried Rice
- Egg Paratha
- Egg Toast
- Fish Curry
- Fish Curry Rice
- Fish Fry
- Fish Pakora
- Garlic Chicken
- Gongura Mutton
- Gujiya
- Gunpowder Idli
- Guntur Chicken Fry
- Guntur Chilli Chicken
- Idli
- Instant Rava Upma
- Kaaram Dosa
- Kachori
- Kada Prasad
- Kadai Paneer
- Kadhi Chawal
- Keema Fry
- Kerala Fish Curry
- Kheema Pav
- Khichdi
- Kolhapuri Chicken
- Kolhapuri Misal Pav
- Laal Maas
- Ladoo
- Lemon Rice
- Lemon Sevai
- Madras Curry
- Masala Chai
- Masala Dosa
- Masala Omelette
- Mashed Banana
- Matar Paneer
- Mathri
- Methi Paratha
- Mirapakaya Bajji
- Mirchi Bajji
- Mirchi Ka Salan
- Modak
- Momos
- Mooli Paratha
- Mushroom Omelette
- Mushroom Pulao
- Mushroom Soup
- Mutton Pulao
- Nattu Kozhi Curry
- Oats Porridge
- Onion Dosa
- Onion Omelette
- Onion Paratha
- Onion Rice
- Onion Uttapam
- Pakora
- Palak Paneer
- Palak Paratha
- Paneer Bhurji
- Paneer Dosa
- Paneer Fried Rice
- Paneer Mushroom Masala
- Paneer Pakora
- Paneer Paratha
- Paneer Pulao
- Paneer Sandwich
- Paneer Tikka
- Paneer Tikka Masala
- Peanut Rice
- Peanut Sundal
- Peas Pulao
- Pepper Rasam
- Pitha
- Plain Chapati
- Plum Cake
- Poha
- Pongal
- Pork Curry
- Prawn Ghee Roast
- Puliyogare
- Ragi Porridge
- Rajma Chawal
- Rasam Rice
- Rice Cakes
- Rice Porridge
- Sabudana Khichdi
- Sambar Rice
- Samosa
- Schezwan Fried Rice
- Smoked Pork Rice
- Soft Idli
- Spanish Omelette
- Spicy Aloo Paratha
- Spicy Masala Dosa
- Sticky Rice
- Stuffed Paratha
- Sundal
- Sweet Holige
- Sweet Pongal
- Sweet Rice
- Thukpa
- Tomato Omelette
- Tomato Rice
- Tomato Uttapam
- Upma
- Veg Fried Rice
- Veg Pulao
- Veg Sandwich
- Vegetable Puree
- Vegetable Soup
- Vegetable Uttapam
- Wheat Dosa

## 3. Mood Distribution

| Mood | Dish Count | Coverage |
| --- | --- | --- |
| Comfort | 174 | 75.3% |
| Soul Food | 41 | 17.7% |
| High Protein | 105 | 45.5% |
| Quick | 74 | 32.0% |
| Spicy | 25 | 10.8% |
| Rainy Day | 19 | 8.2% |

Imbalance warnings:

- Comfort is very dominant and may bias default recommendations.
- Rainy Day remains narrow compared with Comfort/Protein/Quick.
- Spicy has limited depth and may repeat identity dishes.

## 4. Protein Distribution

| Protein Category | Dish Count | Coverage |
| --- | --- | --- |
| Vegetarian | 155 | 67.1% |
| Paneer | 19 | 8.2% |
| Egg | 21 | 9.1% |
| Chicken | 31 | 13.4% |
| Fish | 15 | 6.5% |
| Mutton | 5 | 2.2% |
| Pork | 4 | 1.7% |
| Soy/Tofu | 12 | 5.2% |
| Dal/Legume | 47 | 20.3% |

Underrepresented protein categories:

| Category | Dish Count |
| --- | --- |
| Mutton | 5 |
| Pork | 4 |
| Soy/Tofu | 12 |

## 5. Region Distribution

| Region | Dish Count | Coverage |
| --- | --- | --- |
| South India | 77 | 33.3% |
| North India | 46 | 19.9% |
| East India | 14 | 6.1% |
| West India | 18 | 7.8% |
| Northeast India | 9 | 3.9% |
| Coastal India | 11 | 4.8% |
| Pan-Indian | 22 | 9.5% |
| Global | 14 | 6.1% |

Significantly underrepresented regions:

| Region | Dish Count |
| --- | --- |
| East India | 14 |
| West India | 18 |
| Northeast India | 9 |
| Coastal India | 11 |

## 6. Cuisine Distribution

| Cuisine | Dish Count |
| --- | --- |
| North Indian | 39 |
| South Indian | 27 |
| Indian | 23 |
| Indo-Chinese | 13 |
| Andhra | 12 |
| Kerala | 10 |
| Maharashtrian | 10 |
| Bengali | 8 |
| Tamil | 8 |
| Karnataka | 7 |
| Baby Food | 6 |
| Global | 6 |
| Mangalorean | 6 |
| Indian Street Food | 5 |
| Northeast Indian | 5 |
| Assamese | 4 |
| Gujarati | 4 |
| Coastal Indian | 3 |
| Hyderabadi | 3 |
| Indian Fusion | 3 |
| Odia | 3 |
| Punjabi | 3 |
| South Indian / Fusion | 3 |
| Goan | 2 |
| Himalayan | 2 |
| Indian Sweets | 2 |
| Manipuri | 2 |
| Mughlai | 2 |
| Bakery | 1 |
| Bihari | 1 |
| Chettinad | 1 |
| Eastern Indian | 1 |
| Indian Beverage | 1 |
| Khasi | 1 |
| Kolkata Street Food | 1 |
| Konkani | 1 |
| Rajasthani | 1 |
| Spanish | 1 |

Cuisines with <= 2 dishes:

| Cuisine | Dish Count |
| --- | --- |
| Goan | 2 |
| Himalayan | 2 |
| Indian Sweets | 2 |
| Manipuri | 2 |
| Mughlai | 2 |
| Bakery | 1 |
| Bihari | 1 |
| Chettinad | 1 |
| Eastern Indian | 1 |
| Indian Beverage | 1 |
| Khasi | 1 |
| Kolkata Street Food | 1 |
| Konkani | 1 |
| Rajasthani | 1 |
| Spanish | 1 |

Cuisines with <= 5 dishes:

| Cuisine | Dish Count |
| --- | --- |
| Indian Street Food | 5 |
| Northeast Indian | 5 |
| Assamese | 4 |
| Gujarati | 4 |
| Coastal Indian | 3 |
| Hyderabadi | 3 |
| Indian Fusion | 3 |
| Odia | 3 |
| Punjabi | 3 |
| South Indian / Fusion | 3 |
| Goan | 2 |
| Himalayan | 2 |
| Indian Sweets | 2 |
| Manipuri | 2 |
| Mughlai | 2 |
| Bakery | 1 |
| Bihari | 1 |
| Chettinad | 1 |
| Eastern Indian | 1 |
| Indian Beverage | 1 |
| Khasi | 1 |
| Kolkata Street Food | 1 |
| Konkani | 1 |
| Rajasthani | 1 |
| Spanish | 1 |

## 7. Recommendation Risk Analysis

Overrepresented dish families:

| Dish Family | Count |
| --- | --- |
| chicken | 19 |
| rice-meal | 19 |
| dosa | 12 |
| paratha | 10 |
| paneer-curry | 9 |
| rice-dal | 9 |
| fish-curry | 7 |
| omelette | 7 |

Base ingredient repetition:

| Base Ingredient | Count |
| --- | --- |
| rice | 45 |
| chicken | 26 |
| wheat flour | 20 |
| paneer | 13 |
| egg | 12 |

Duplicate-like clusters:

- Chicken Stew, Vegetable Stew
- Chicken Sukka, Prawn Sukka
- Chilli Chicken, Chilli Paneer
- Egg Bhurji, Paneer Bhurji
- Fish Pakora, Pakora, Paneer Pakora
- Garlic Chicken, Garlic Egg Rice
- Onion Dosa, Onion Paratha, Onion Rice
- Palak Paneer, Palak Paratha
- Paneer Sandwich, Veg Sandwich
- Paneer Tikka, Paneer Tikka Masala
- Tomato Rice, Egg Tomato Rice Bowl, Chicken Tomato Rice, Tomato Paneer Rice
- Mushroom Pulao, Paneer Mushroom Masala
- Cheese Paratha, Cheese Dosa

Categories likely to feel repetitive:

- Rice-led dishes
- Chicken curries/stir-fries
- Dosa and dosa-adjacent breakfast items
- Paratha/flatbread family
- Paneer curry/bhurji/rice variants
- Fish curry family

## 8. Quick Dinner Audit

| Metric | Value |
| --- | --- |
| Quick Dinner dishes | 32 |
| Coverage | 13.9% |

Missing opportunities:

- Aloo Posto
- Appam
- Biryani
- Chicken Curry
- Chicken Pulao
- Chicken Rice
- Chingri Malai Curry
- Chingudi Chhecha
- Dal Makhani
- Egg Bhurji
- Fish Curry
- Fish Fry
- Ghee Rice
- Goan Prawn Balchao
- Kerala Egg Roast
- Khichdi
- Manipuri Eromba
- Mushroom Soup
- Neer Dosa
- Oats Porridge
- Paneer Bhurji
- Pesarattu
- Pork Curry
- Prawn Sukka
- Set Dosa
- Sprouts Usal
- Thukpa
- Vegetable Puree
- Vegetable Soup
- Vegetable Stew

## 9. Soul Food Audit

| Metric | Value |
| --- | --- |
| Soul Food dishes | 41 |
| Coverage | 17.7% |

Missing opportunities:

- Aloo Jeera
- Aloo Pitika
- Assamese Duck Curry
- Batata Poha
- Beans Thoran
- Begun Bhaja
- Besan Chilla
- Bread Upma
- Butter Chicken
- Cheese Dosa
- Cheese Paratha
- Cheese Uttapam
- Chicken Stew
- Chicken Sukka
- Chingri Malai Curry
- Chingudi Chhecha
- Chole Chawal
- Dhokla
- Egg Bhurji
- Egg Dosa
- Egg Paratha
- Ghugni
- Gujiya
- Handvo
- Instant Rava Upma
- Kachori
- Kadai Paneer
- Kadala Curry
- Kadhi Chawal
- Kadhi Pakora

## 10. Expansion Priority Score

| Rank | Area | Reason |
| --- | --- | --- |
| 1 | Pairing Backfill | Only 67 dishes have pairings; this is the weakest metadata surface. |
| 2 | Quick Guide Backfill | 142 dishes have guides, but 89 still lack cooking help. |
| 3 | Rainy Day Expansion | Rainy Day has only 19 dishes and can repeat quickly. |
| 4 | Soy/Tofu Expansion | Soy/Tofu improved to 2 but remains the thinnest protein category. |
| 5 | Fish / Seafood Expansion | Fish/seafood improved but still trails chicken, egg, paneer, and dal. |
| 6 | Regional Expansion | East, West, Northeast, and Coastal are better but still far below South/North. |

## Top 10 Weaknesses

1. Pairing coverage is only 29.0%, so future pairing UX will be uneven unless older dishes are backfilled.
2. Quick Guide coverage is 61.5%, leaving 89 dishes with thinner Dish Detail help.
3. Rainy Day is still narrow at 19 dishes and likely to repeat compared with Comfort, Protein, and Quick.
4. Soy/Tofu has only 2 dishes despite being important for vegetarian protein diversity.
5. Mutton and Pork remain thin protein categories at 5 and 4 dishes.
6. Coastal India and Northeast India remain underrepresented at 12 and 11 dishes.
7. Comfort is dominant at 76.6%, which can bias recommendation surfaces if not carefully weighted.
8. Rice, chicken, wheat flour, paneer, and egg dominate base ingredients.
9. Crowded families like chicken, rice-meal, dosa, paratha, and fish-curry need diversity controls.
10. Several cuisines still have only 1 to 2 dishes, making them hard to recommend without repetition.

## Top 10 Strengths

1. Total database size is now 231 dishes, large enough for broader Beta 2 testing.
2. Unmapped moods and meals are at zero.
3. Quick Dinner coverage has improved substantially after Expansion Pack 1.
4. Regional coverage now includes East, West, Northeast, Coastal, Kerala, Karnataka, Bengali, Odia, Goan, Assamese, Manipuri, and Gujarati dishes.
5. Quick Guide coverage is above half of the database and available for all recent expansion dishes.
6. High Protein coverage is strong with 99 dishes.
7. Dal/Legume coverage is healthy at 47 dishes.
8. Vegetarian coverage is broad at 158 dishes.
9. The database now has structured regionTags, cuisine metadata, pairings, Quick Guides, and pantry ingredients for all recent packs.
10. Mirror files match the generated database exactly.

## Recommended Expansion Pack 5

| Dish | Reason |
| --- | --- |
| Rainy Day Khichu | Gujarati warm snack; rainy + West India |
| Ragi Mudde | Karnataka staple; regional distinctness |
| Horse Gram Rasam | South Indian protein + rainy support |
| Tofu Stir Fry | Soy/Tofu quick dinner |
| Tofu Fried Rice | Soy/Tofu but avoid too many rice bowls later; useful bridge |
| Soya Keema | Vegetarian protein and quick dinner |
| Mutton Keema | Mutton coverage without slow-cook complexity |
| Mutton Pepper Fry | Mutton protein, South/Coastal identity |
| Pork Bharta | Northeast pork variety |
| Pork With Lai Xaak | Northeast regional protein |
| Fish Paturi | Bengali fish, distinct cooking style |
| Sardine Curry | Coastal fish variety |
| Crab Sukka | Coastal seafood variety |
| Tandoori Fish | Fish protein, non-curry format |
| Khaman | Gujarati snack, but check Dhokla duplication before adding |
| Undhiyu | Gujarati seasonal comfort, non-duplicate vegetable family |
| Thecha Bhakri | Maharashtrian quick/spicy regional meal |
| Bharli Vangi | Maharashtrian stuffed brinjal, regional veg |
| Olan | Kerala gentle comfort, distinct from stew/avial |
| Kootu Curry | Kerala legume/vegetable protein |

## Recommended Backfill Project

| Phase | Work |
| --- | --- |
| Phase 1 | Add pairings to the 60 most frequently recommended older dishes without pairings. |
| Phase 2 | Add Quick Guides to the top 50 missing dishes by recommendation likelihood. |
| Phase 3 | Backfill Rainy Day metadata and pairings for warm meals, not only snacks/soups. |
| Phase 4 | Normalize cuisine labels: Indian vs Pan-Indian vs regional names. |
| Phase 5 | Review crowded families and add diversity guards for dosa/paratha/rice/chicken repetition. |

## Notes

- Counts are multi-label; one dish can count toward multiple moods, meals, proteins, regions, or cuisines.
- This was an audit-only pass. No recipe data was changed.
