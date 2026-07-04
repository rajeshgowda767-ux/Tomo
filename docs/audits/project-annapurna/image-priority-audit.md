# Project Annapurna - Phase 2 Image Priority Audit

Generated: 2026-07-02T17:14:31.539Z

Read-only audit generated from `database/generated/recipes.json` and `database/generated/collections.json`. No image generation was performed.

## Methodology

- Audited recipes with `/assets/images/dishes/homestyle-kitchen-placeholder.png` present in `imageUrl`, `image`, or `image_url`.
- Collection usage was inferred from `collectionHome` metadata and generated collection item membership.
- Kitchen usage was inferred from existing recipe role, main/base ingredient fields, pantry/quick/high-protein tags, and recommendation-friendly metadata.
- P0 is an explicit first-wave list for surface-critical and signature dishes that should not ship with placeholders.
- P1 covers remaining Project Annapurna Gold, iconic regional, and signature dishes.
- P2 covers remaining collection-backed recipes. P3 covers remaining Kitchen-friendly recipes. P4 is long-tail.
- In this database every placeholder currently has collection metadata, so P3/P4 may be empty until non-collection placeholders appear.

## Summary

| Priority | Count | Meaning |
| --- | ---: | --- |
| P0 - Critical | 22 | Explicit first-wave surface/signature image targets. |
| P1 - Gold Recipes | 120 | Remaining Project Annapurna Gold/iconic/signature dishes. |
| P2 - Collection Recipes | 61 | Remaining collection-backed placeholders. |
| P3 - Frequently Recommended | 0 | Kitchen-friendly placeholders without stronger P0-P2 signals. |
| P4 - Long-tail | 0 | Lower-frequency placeholders. |
| Total placeholders audited | 203 | All recipes with the homestyle kitchen placeholder in any image field. |

## Top 100 Image List

Ordered exactly as recommended for image generation.

| Rank | Recipe | State | Category | Priority | Recommended image prompt title |
| ---: | --- | --- | --- | --- | --- |
| 1 | Kerala Chicken Roast | Kerala | Curries & Seafood | P0 | Kerala Chicken Roast - Kerala homestyle dish hero photo |
| 2 | Pallipalayam Chicken | Kongu Nadu, Tamil Nadu | Kuzhambu, Kootu & Curries | P0 | Pallipalayam Chicken - Kongu Nadu, Tamil Nadu curry hero photo |
| 3 | Thalassery Biryani | Malabar, Kerala | Rice & Main Meals | P0 | Thalassery Biryani - Malabar, Kerala rice dish hero photo |
| 4 | Kothu Parotta | Tamil Nadu | Snacks & Evening Bites | P0 | Kothu Parotta - Tamil Nadu snack hero photo |
| 5 | Kundapura Chicken | Coastal Karnataka | Curries & Saaru | P0 | Kundapura Chicken - Coastal Karnataka curry hero photo |
| 6 | Goan Prawn Curry Rice | Goa | Rice & Seafood | P0 | Goan Prawn Curry Rice - Goa rice dish hero photo |
| 7 | Chicken Xacuti | Goa | Chicken & Meat | P0 | Chicken Xacuti - Goa homestyle dish hero photo |
| 8 | Hyderabadi Dum Biryani | Hyderabad, Telangana | Rice & Main Meals | P0 | Hyderabadi Dum Biryani - Hyderabad, Telangana rice dish hero photo |
| 9 | Medu Vada | Tamil Nadu | Breakfast | P0 | Medu Vada - Tamil Nadu snack hero photo |
| 10 | Parippu Vada | Kerala | Snacks | P0 | Parippu Vada - Kerala snack hero photo |
| 11 | Sorpotel | Goa | Chicken & Meat | P0 | Sorpotel - Goa homestyle dish hero photo |
| 12 | Murukku | Tamil Nadu | Snacks & Evening Bites | P0 | Murukku - Tamil Nadu snack hero photo |
| 13 | Thattai | Tamil Nadu | Snacks & Evening Bites | P0 | Thattai - Tamil Nadu snack hero photo |
| 14 | Dal Baati Churma | Rajasthan | Main Course | P0 | Dal Baati Churma - Rajasthan dessert hero photo |
| 15 | Dalma | Odisha | Side | P0 | Dalma - Odisha homestyle dish hero photo |
| 16 | Undhiyu | Gujarat | Main Course | P0 | Undhiyu - Gujarat homestyle dish hero photo |
| 17 | Rogan Josh | Jammu & Kashmir | Main Course | P0 | Rogan Josh - Jammu & Kashmir homestyle dish hero photo |
| 18 | Shorshe Mach | West Bengal | Main Course | P0 | Shorshe Mach - West Bengal homestyle dish hero photo |
| 19 | Aloo Posto | West Bengal | Side | P0 | Aloo Posto - West Bengal homestyle dish hero photo |
| 20 | Bagara Baingan | Hyderabad, Telangana | Pappu, Pulusu & Curries | P0 | Bagara Baingan - Hyderabad, Telangana curry hero photo |
| 21 | Dum Aloo Kashmiri | Jammu & Kashmir | Main Course | P0 | Dum Aloo Kashmiri - Jammu & Kashmir homestyle dish hero photo |
| 22 | Kafuli | Uttarakhand | Main Course | P0 | Kafuli - Uttarakhand homestyle dish hero photo |
| 23 | Neychoru | Kerala | Rice & Main Meals | P1 | Neychoru - Kerala rice dish hero photo |
| 24 | Huruli Saaru | Karnataka | Curries & Saaru | P1 | Huruli Saaru - Karnataka curry hero photo |
| 25 | Hyderabadi Marag | Hyderabad, Telangana | Pappu, Pulusu & Curries | P1 | Hyderabadi Marag - Hyderabad, Telangana curry hero photo |
| 26 | Mutton Rassa | Maharashtra | Amti, Curries & Sabzis | P1 | Mutton Rassa - Maharashtra curry hero photo |
| 27 | Talawa Gosht | Hyderabad, Telangana | Pappu, Pulusu & Curries | P1 | Talawa Gosht - Hyderabad, Telangana curry hero photo |
| 28 | Amritsari Chicken | Amritsar, Punjab | Chicken & Meat | P1 | Amritsari Chicken - Amritsar, Punjab homestyle dish hero photo |
| 29 | Chicken Cafreal | Goa | Chicken & Meat | P1 | Chicken Cafreal - Goa homestyle dish hero photo |
| 30 | Egg Devil | Kolkata, West Bengal | Snacks | P1 | Egg Devil - Kolkata, West Bengal snack hero photo |
| 31 | Jungli Maas | Rajasthan | Chicken & Mutton | P1 | Jungli Maas - Rajasthan homestyle dish hero photo |
| 32 | Kolambi Bhaat | Maharashtra | Rice & Main Meals | P1 | Kolambi Bhaat - Maharashtra rice dish hero photo |
| 33 | Kolkata Fish Fry | Kolkata, West Bengal | Snacks | P1 | Kolkata Fish Fry - Kolkata, West Bengal snack hero photo |
| 34 | Kombdi Rassa | Maharashtra | Amti, Curries & Sabzis | P1 | Kombdi Rassa - Maharashtra curry hero photo |
| 35 | Malvani Chicken | Malvan, Konkan, Maharashtra | Amti, Curries & Sabzis | P1 | Malvani Chicken - Malvan, Konkan, Maharashtra homestyle dish hero photo |
| 36 | Rava Fried Fish | Goa | Seafood | P1 | Rava Fried Fish - Goa homestyle dish hero photo |
| 37 | Royyala Vepudu | Coastal Andhra | Pappu, Pulusu & Curries | P1 | Royyala Vepudu - Coastal Andhra curry hero photo |
| 38 | Safed Maas | Rajasthan | Chicken & Mutton | P1 | Safed Maas - Rajasthan homestyle dish hero photo |
| 39 | Tandoori Chicken | Punjab | Chicken & Meat | P1 | Tandoori Chicken - Punjab homestyle dish hero photo |
| 40 | Minapa Garelu | Andhra Pradesh | Snacks & Evening Bites | P1 | Minapa Garelu - Andhra Pradesh snack hero photo |
| 41 | Avarekalu Saaru | Karnataka | Curries & Saaru | P1 | Avarekalu Saaru - Karnataka curry hero photo |
| 42 | Idiyappam | Kerala | Breakfast | P1 | Idiyappam - Kerala homestyle dish hero photo |
| 43 | Khaman | Gujarat | Breakfast & Snacks | P1 | Khaman - Gujarat snack hero photo |
| 44 | Aloo Pyaz Sabzi | Rajasthan | Vegetarian | P1 | Aloo Pyaz Sabzi - Rajasthan homestyle dish hero photo |
| 45 | Bajra Khichdi | Rajasthan / Haryana | Rice & Millets | P1 | Bajra Khichdi - Rajasthan / Haryana rice dish hero photo |
| 46 | Methi Bajra Khichdi | Rajasthan | Vegetarian | P1 | Methi Bajra Khichdi - Rajasthan rice dish hero photo |
| 47 | Panchmel Dal | Rajasthan | Main Course | P1 | Panchmel Dal - Rajasthan homestyle dish hero photo |
| 48 | Papad Ki Sabzi | Rajasthan | Main Course | P1 | Papad Ki Sabzi - Rajasthan homestyle dish hero photo |
| 49 | Aloo Chokha | Bihar | Vegetarian | P1 | Aloo Chokha - Bihar homestyle dish hero photo |
| 50 | Aloo Ke Gutke | Uttarakhand | Vegetarian | P1 | Aloo Ke Gutke - Uttarakhand homestyle dish hero photo |
| 51 | Bagara Rice | Hyderabad, Telangana | Rice & Main Meals | P1 | Bagara Rice - Hyderabad, Telangana rice dish hero photo |
| 52 | Baingan Chokha | Bihar | Vegetarian | P1 | Baingan Chokha - Bihar homestyle dish hero photo |
| 53 | Bajra Roti | Haryana | Breads | P1 | Bajra Roti - Haryana homestyle dish hero photo |
| 54 | Bamboo Shoot Sabzi | Jharkhand | Vegetarian | P1 | Bamboo Shoot Sabzi - Jharkhand homestyle dish hero photo |
| 55 | Bathua Raita | Haryana | Main Course | P1 | Bathua Raita - Haryana homestyle dish hero photo |
| 56 | Chilka Roti | Jharkhand | Main Course | P1 | Chilka Roti - Jharkhand homestyle dish hero photo |
| 57 | Chutagi | Ladakh | Main Course | P1 | Chutagi - Ladakh homestyle dish hero photo |
| 58 | Dahi Baigana | Odisha | Vegetarian | P1 | Dahi Baigana - Odisha homestyle dish hero photo |
| 59 | Girda | Jammu & Kashmir | Bread | P1 | Girda - Jammu & Kashmir homestyle dish hero photo |
| 60 | Haak Saag | Jammu & Kashmir | Main Course | P1 | Haak Saag - Jammu & Kashmir homestyle dish hero photo |
| 61 | Handia Rice | Jharkhand | Rice | P1 | Handia Rice - Jharkhand rice dish hero photo |
| 62 | Kanika | Odisha | Rice | P1 | Kanika - Odisha rice dish hero photo |
| 63 | Khakhra | Gujarat | Snacks | P1 | Khakhra - Gujarat snack hero photo |
| 64 | Khatkhate | Goa | Vegetarian | P1 | Khatkhate - Goa homestyle dish hero photo |
| 65 | Khichdi Kadhi | Gujarat | Rice | P1 | Khichdi Kadhi - Gujarat rice dish hero photo |
| 66 | Khichuri | West Bengal | Rice | P1 | Khichuri - West Bengal rice dish hero photo |
| 67 | Koraishutir Kochuri | West Bengal | Breakfast & Everyday Classics | P1 | Koraishutir Kochuri - West Bengal homestyle dish hero photo |
| 68 | Kumaoni Raita | Uttarakhand | Vegetarian | P1 | Kumaoni Raita - Uttarakhand homestyle dish hero photo |
| 69 | Makki di Roti | Punjab | Breads | P1 | Makki di Roti - Punjab homestyle dish hero photo |
| 70 | Mandua Roti | Uttarakhand | Breads | P1 | Mandua Roti - Uttarakhand homestyle dish hero photo |
| 71 | Missi Roti | Haryana | Breads | P1 | Missi Roti - Haryana homestyle dish hero photo |
| 72 | Modur Pulao | Jammu & Kashmir | Rice | P1 | Modur Pulao - Jammu & Kashmir rice dish hero photo |
| 73 | Mushroom Xacuti | Goa | Vegetarian | P1 | Mushroom Xacuti - Goa homestyle dish hero photo |
| 74 | Ringan No Olo | Gujarat | Main Course | P1 | Ringan No Olo - Gujarat homestyle dish hero photo |
| 75 | Santula | Odisha | Main Course | P1 | Santula - Odisha homestyle dish hero photo |
| 76 | Sarva Pindi | Telangana | Snacks & Evening Bites | P1 | Sarva Pindi - Telangana snack hero photo |
| 77 | Sev Tameta | Gujarat | Main Course | P1 | Sev Tameta - Gujarat homestyle dish hero photo |
| 78 | Skyu | Ladakh | Main Course | P1 | Skyu - Ladakh homestyle dish hero photo |
| 79 | Tudkiya Bhath | Himachal Pradesh | Main Course | P1 | Tudkiya Bhath - Himachal Pradesh homestyle dish hero photo |
| 80 | Vaghareli Khichdi | Gujarat | Rice | P1 | Vaghareli Khichdi - Gujarat rice dish hero photo |
| 81 | Nethili Fry | Tamil Nadu | Snacks & Evening Bites | P1 | Nethili Fry - Tamil Nadu snack hero photo |
| 82 | Kane Rava Fry | Coastal Karnataka | Curries & Saaru | P1 | Kane Rava Fry - Coastal Karnataka snack hero photo |
| 83 | Chha Gosht | Himachal Pradesh | Main Course | P1 | Chha Gosht - Himachal Pradesh homestyle dish hero photo |
| 84 | Goan Choris Pav | Goa | Snacks | P1 | Goan Choris Pav - Goa snack hero photo |
| 85 | Macha Besara | Odisha | Seafood | P1 | Macha Besara - Odisha homestyle dish hero photo |
| 86 | Machha Tarkari | Odisha | Seafood | P1 | Machha Tarkari - Odisha homestyle dish hero photo |
| 87 | Yakhni | Jammu & Kashmir | Main Course | P1 | Yakhni - Jammu & Kashmir curry hero photo |
| 88 | Sev Khamani | Surat, Gujarat | Breakfast & Snacks | P1 | Sev Khamani - Surat, Gujarat snack hero photo |
| 89 | Bikaneri Bhujia | Bikaner, Rajasthan | Snacks | P1 | Bikaneri Bhujia - Bikaner, Rajasthan snack hero photo |
| 90 | Churma | Rajasthan | Desserts | P1 | Churma - Rajasthan dessert hero photo |
| 91 | Gatte Ki Sabzi | Rajasthan | Main Course | P1 | Gatte Ki Sabzi - Rajasthan homestyle dish hero photo |
| 92 | Ghevar | Rajasthan | Desserts | P1 | Ghevar - Rajasthan dessert hero photo |
| 93 | Govind Gatta | Rajasthan | Vegetarian | P1 | Govind Gatta - Rajasthan homestyle dish hero photo |
| 94 | Ker Sangri | Rajasthan | Main Course | P1 | Ker Sangri - Rajasthan homestyle dish hero photo |
| 95 | Mawa Kachori | Jodhpur, Rajasthan | Snacks & Desserts | P1 | Mawa Kachori - Jodhpur, Rajasthan dessert hero photo |
| 96 | Mirchi Vada | Jodhpur, Rajasthan | Breakfast & Snacks | P1 | Mirchi Vada - Jodhpur, Rajasthan snack hero photo |
| 97 | Pyaaz Kachori | Jodhpur, Rajasthan | Breakfast & Snacks | P1 | Pyaaz Kachori - Jodhpur, Rajasthan snack hero photo |
| 98 | Aktori | Himachal Pradesh | Desserts | P1 | Aktori - Himachal Pradesh dessert hero photo |
| 99 | Aloo Bhaja | West Bengal | Vegetarian | P1 | Aloo Bhaja - West Bengal homestyle dish hero photo |
| 100 | Amritsari Chole | Amritsar, Punjab | Main Course | P1 | Amritsari Chole - Amritsar, Punjab homestyle dish hero photo |

## P0 Placeholder Recipes

Count: 22

| # | Recipe | State | Category | Collection usage | Kitchen usage | Priority | Recommended image prompt title |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | Kerala Chicken Roast | Kerala | Curries & Seafood | Regional Journeys / Kerala | High - cookable role; low-effort signal | P0 | Kerala Chicken Roast - Kerala homestyle dish hero photo |
| 2 | Pallipalayam Chicken | Kongu Nadu, Tamil Nadu | Kuzhambu, Kootu & Curries | Regional Journeys / Tamil Nadu | High - cookable role; low-effort signal | P0 | Pallipalayam Chicken - Kongu Nadu, Tamil Nadu curry hero photo |
| 3 | Thalassery Biryani | Malabar, Kerala | Rice & Main Meals | Regional Journeys / Kerala | High - cookable role; low-effort signal | P0 | Thalassery Biryani - Malabar, Kerala rice dish hero photo |
| 4 | Kothu Parotta | Tamil Nadu | Snacks & Evening Bites | Regional Journeys / Tamil Nadu | High - cookable role; low-effort signal | P0 | Kothu Parotta - Tamil Nadu snack hero photo |
| 5 | Kundapura Chicken | Coastal Karnataka | Curries & Saaru | Regional Journeys / Karnataka | High - cookable role; low-effort signal | P0 | Kundapura Chicken - Coastal Karnataka curry hero photo |
| 6 | Goan Prawn Curry Rice | Goa | Rice & Seafood | Regional Journeys / Goa | High - cookable role; low-effort signal | P0 | Goan Prawn Curry Rice - Goa rice dish hero photo |
| 7 | Chicken Xacuti | Goa | Chicken & Meat | Regional Journeys / Goa | Medium - cookable role; base ingredient: chicken | P0 | Chicken Xacuti - Goa homestyle dish hero photo |
| 8 | Hyderabadi Dum Biryani | Hyderabad, Telangana | Rice & Main Meals | Regional Journeys / Andhra & Telangana | Medium - cookable role; low-effort signal | P0 | Hyderabadi Dum Biryani - Hyderabad, Telangana rice dish hero photo |
| 9 | Medu Vada | Tamil Nadu | Breakfast | Regional Journeys / Tamil Nadu | Medium - cookable role; low-effort signal | P0 | Medu Vada - Tamil Nadu snack hero photo |
| 10 | Parippu Vada | Kerala | Snacks | Regional Journeys / Kerala | Medium - cookable role; low-effort signal | P0 | Parippu Vada - Kerala snack hero photo |
| 11 | Sorpotel | Goa | Chicken & Meat | Regional Journeys / Goa | Medium - cookable role; base ingredient: chicken | P0 | Sorpotel - Goa homestyle dish hero photo |
| 12 | Murukku | Tamil Nadu | Snacks & Evening Bites | Regional Journeys / Tamil Nadu | Medium - cookable role; low-effort signal | P0 | Murukku - Tamil Nadu snack hero photo |
| 13 | Thattai | Tamil Nadu | Snacks & Evening Bites | Regional Journeys / Tamil Nadu | Medium - cookable role; low-effort signal | P0 | Thattai - Tamil Nadu snack hero photo |
| 14 | Dal Baati Churma | Rajasthan | Main Course | Regional Journeys / Rajasthan | Medium - cookable role; base ingredient: dal | P0 | Dal Baati Churma - Rajasthan dessert hero photo |
| 15 | Dalma | Odisha | Side | Kitchen Essentials / Sides, Salads & Add-ons | Medium - low-effort signal; pantry/mood fit | P0 | Dalma - Odisha homestyle dish hero photo |
| 16 | Undhiyu | Gujarat | Main Course | Regional Journeys / Gujarat | Medium - cookable role; low-effort signal | P0 | Undhiyu - Gujarat homestyle dish hero photo |
| 17 | Rogan Josh | Jammu & Kashmir | Main Course | Regional Journeys / Jammu & Kashmir | Low - cookable role | P0 | Rogan Josh - Jammu & Kashmir homestyle dish hero photo |
| 18 | Shorshe Mach | West Bengal | Main Course | Regional Journeys / Bengal | Low - cookable role | P0 | Shorshe Mach - West Bengal homestyle dish hero photo |
| 19 | Aloo Posto | West Bengal | Side | Kitchen Essentials / Sides, Salads & Add-ons | Low - low-effort signal; pantry/mood fit | P0 | Aloo Posto - West Bengal homestyle dish hero photo |
| 20 | Bagara Baingan | Hyderabad, Telangana | Pappu, Pulusu & Curries | Regional Journeys / Andhra & Telangana | Low | P0 | Bagara Baingan - Hyderabad, Telangana curry hero photo |
| 21 | Dum Aloo Kashmiri | Jammu & Kashmir | Main Course | Regional Journeys / Jammu & Kashmir | Low - cookable role | P0 | Dum Aloo Kashmiri - Jammu & Kashmir homestyle dish hero photo |
| 22 | Kafuli | Uttarakhand | Main Course | Regional Journeys / Uttarakhand | Low - cookable role | P0 | Kafuli - Uttarakhand homestyle dish hero photo |

## P1 Placeholder Recipes

Count: 120

| # | Recipe | State | Category | Collection usage | Kitchen usage | Priority | Recommended image prompt title |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | Neychoru | Kerala | Rice & Main Meals | Regional Journeys / Kerala | High - cookable role; low-effort signal | P1 | Neychoru - Kerala rice dish hero photo |
| 2 | Huruli Saaru | Karnataka | Curries & Saaru | Regional Journeys / Karnataka | Medium - cookable role; low-effort signal | P1 | Huruli Saaru - Karnataka curry hero photo |
| 3 | Hyderabadi Marag | Hyderabad, Telangana | Pappu, Pulusu & Curries | Regional Journeys / Andhra & Telangana | Medium - cookable role; base ingredient: mutton | P1 | Hyderabadi Marag - Hyderabad, Telangana curry hero photo |
| 4 | Mutton Rassa | Maharashtra | Amti, Curries & Sabzis | Regional Journeys / Maharashtra | Medium - cookable role; base ingredient: mutton | P1 | Mutton Rassa - Maharashtra curry hero photo |
| 5 | Talawa Gosht | Hyderabad, Telangana | Pappu, Pulusu & Curries | Regional Journeys / Andhra & Telangana | Medium - cookable role; base ingredient: mutton | P1 | Talawa Gosht - Hyderabad, Telangana curry hero photo |
| 6 | Amritsari Chicken | Amritsar, Punjab | Chicken & Meat | Regional Journeys / Punjab | Medium - cookable role; base ingredient: chicken | P1 | Amritsari Chicken - Amritsar, Punjab homestyle dish hero photo |
| 7 | Chicken Cafreal | Goa | Chicken & Meat | Regional Journeys / Goa | Medium - cookable role; base ingredient: chicken | P1 | Chicken Cafreal - Goa homestyle dish hero photo |
| 8 | Egg Devil | Kolkata, West Bengal | Snacks | Regional Journeys / Bengal | Medium - cookable role; base ingredient: egg | P1 | Egg Devil - Kolkata, West Bengal snack hero photo |
| 9 | Jungli Maas | Rajasthan | Chicken & Mutton | Regional Journeys / Rajasthan | Medium - cookable role; base ingredients: chicken, mutton | P1 | Jungli Maas - Rajasthan homestyle dish hero photo |
| 10 | Kolambi Bhaat | Maharashtra | Rice & Main Meals | Regional Journeys / Maharashtra | Medium - cookable role; low-effort signal | P1 | Kolambi Bhaat - Maharashtra rice dish hero photo |
| 11 | Kolkata Fish Fry | Kolkata, West Bengal | Snacks | Regional Journeys / Bengal | Medium - cookable role; base ingredient: fish | P1 | Kolkata Fish Fry - Kolkata, West Bengal snack hero photo |
| 12 | Kombdi Rassa | Maharashtra | Amti, Curries & Sabzis | Regional Journeys / Maharashtra | Medium - cookable role; base ingredient: chicken | P1 | Kombdi Rassa - Maharashtra curry hero photo |
| 13 | Malvani Chicken | Malvan, Konkan, Maharashtra | Amti, Curries & Sabzis | Regional Journeys / Maharashtra | Medium - cookable role; base ingredient: chicken | P1 | Malvani Chicken - Malvan, Konkan, Maharashtra homestyle dish hero photo |
| 14 | Rava Fried Fish | Goa | Seafood | Regional Journeys / Goa | Medium - cookable role; base ingredient: fish | P1 | Rava Fried Fish - Goa homestyle dish hero photo |
| 15 | Royyala Vepudu | Coastal Andhra | Pappu, Pulusu & Curries | Regional Journeys / Andhra & Telangana | Medium - cookable role; low-effort signal | P1 | Royyala Vepudu - Coastal Andhra curry hero photo |
| 16 | Safed Maas | Rajasthan | Chicken & Mutton | Regional Journeys / Rajasthan | Medium - cookable role; base ingredients: chicken, mutton | P1 | Safed Maas - Rajasthan homestyle dish hero photo |
| 17 | Tandoori Chicken | Punjab | Chicken & Meat | Regional Journeys / Punjab | Medium - cookable role; base ingredient: chicken | P1 | Tandoori Chicken - Punjab homestyle dish hero photo |
| 18 | Minapa Garelu | Andhra Pradesh | Snacks & Evening Bites | Regional Journeys / Andhra & Telangana | Medium - cookable role; low-effort signal | P1 | Minapa Garelu - Andhra Pradesh snack hero photo |
| 19 | Avarekalu Saaru | Karnataka | Curries & Saaru | Regional Journeys / Karnataka | Medium - cookable role; low-effort signal | P1 | Avarekalu Saaru - Karnataka curry hero photo |
| 20 | Idiyappam | Kerala | Breakfast | Regional Journeys / Kerala | Medium - cookable role; low-effort signal | P1 | Idiyappam - Kerala homestyle dish hero photo |
| 21 | Khaman | Gujarat | Breakfast & Snacks | Regional Journeys / Gujarat | Medium - cookable role; low-effort signal | P1 | Khaman - Gujarat snack hero photo |
| 22 | Aloo Pyaz Sabzi | Rajasthan | Vegetarian | Regional Journeys / Rajasthan | Medium - cookable role; low-effort signal | P1 | Aloo Pyaz Sabzi - Rajasthan homestyle dish hero photo |
| 23 | Bajra Khichdi | Rajasthan / Haryana | Rice & Millets | Regional Journeys / Rajasthan | Medium - cookable role; low-effort signal | P1 | Bajra Khichdi - Rajasthan / Haryana rice dish hero photo |
| 24 | Methi Bajra Khichdi | Rajasthan | Vegetarian | Regional Journeys / Rajasthan | Medium - cookable role; low-effort signal | P1 | Methi Bajra Khichdi - Rajasthan rice dish hero photo |
| 25 | Panchmel Dal | Rajasthan | Main Course | Regional Journeys / Rajasthan | Medium - cookable role; low-effort signal | P1 | Panchmel Dal - Rajasthan homestyle dish hero photo |
| 26 | Papad Ki Sabzi | Rajasthan | Main Course | Regional Journeys / Rajasthan | Medium - cookable role; low-effort signal | P1 | Papad Ki Sabzi - Rajasthan homestyle dish hero photo |
| 27 | Aloo Chokha | Bihar | Vegetarian | Regional Journeys / Bihar | Medium - cookable role; low-effort signal | P1 | Aloo Chokha - Bihar homestyle dish hero photo |
| 28 | Aloo Ke Gutke | Uttarakhand | Vegetarian | Regional Journeys / Uttarakhand | Medium - cookable role; low-effort signal | P1 | Aloo Ke Gutke - Uttarakhand homestyle dish hero photo |
| 29 | Bagara Rice | Hyderabad, Telangana | Rice & Main Meals | Regional Journeys / Andhra & Telangana | Medium - cookable role; low-effort signal | P1 | Bagara Rice - Hyderabad, Telangana rice dish hero photo |
| 30 | Baingan Chokha | Bihar | Vegetarian | Regional Journeys / Bihar | Medium - cookable role; low-effort signal | P1 | Baingan Chokha - Bihar homestyle dish hero photo |
| 31 | Bajra Roti | Haryana | Breads | Regional Journeys / Haryana | Medium - cookable role; base ingredient: bread | P1 | Bajra Roti - Haryana homestyle dish hero photo |
| 32 | Bamboo Shoot Sabzi | Jharkhand | Vegetarian | Regional Journeys / Jharkhand | Medium - cookable role; base ingredient: bamboo shoot | P1 | Bamboo Shoot Sabzi - Jharkhand homestyle dish hero photo |
| 33 | Bathua Raita | Haryana | Main Course | Regional Journeys / Haryana | Medium - cookable role; low-effort signal | P1 | Bathua Raita - Haryana homestyle dish hero photo |
| 34 | Chilka Roti | Jharkhand | Main Course | Regional Journeys / Jharkhand | Medium - cookable role; low-effort signal | P1 | Chilka Roti - Jharkhand homestyle dish hero photo |
| 35 | Chutagi | Ladakh | Main Course | Regional Journeys / Ladakh | Medium - cookable role; low-effort signal | P1 | Chutagi - Ladakh homestyle dish hero photo |
| 36 | Dahi Baigana | Odisha | Vegetarian | Regional Journeys / Odisha | Medium - cookable role; low-effort signal | P1 | Dahi Baigana - Odisha homestyle dish hero photo |
| 37 | Girda | Jammu & Kashmir | Bread | Regional Journeys / Jammu & Kashmir | Medium - cookable role; base ingredient: bread | P1 | Girda - Jammu & Kashmir homestyle dish hero photo |
| 38 | Haak Saag | Jammu & Kashmir | Main Course | Regional Journeys / Jammu & Kashmir | Medium - cookable role; low-effort signal | P1 | Haak Saag - Jammu & Kashmir homestyle dish hero photo |
| 39 | Handia Rice | Jharkhand | Rice | Regional Journeys / Jharkhand | Medium - cookable role; base ingredient: rice | P1 | Handia Rice - Jharkhand rice dish hero photo |
| 40 | Kanika | Odisha | Rice | Regional Journeys / Odisha | Medium - cookable role; base ingredient: rice | P1 | Kanika - Odisha rice dish hero photo |
| 41 | Khakhra | Gujarat | Snacks | Regional Journeys / Gujarat | Medium - cookable role; low-effort signal | P1 | Khakhra - Gujarat snack hero photo |
| 42 | Khatkhate | Goa | Vegetarian | Regional Journeys / Goa | Medium - cookable role; low-effort signal | P1 | Khatkhate - Goa homestyle dish hero photo |
| 43 | Khichdi Kadhi | Gujarat | Rice | Regional Journeys / Gujarat | Medium - cookable role; low-effort signal | P1 | Khichdi Kadhi - Gujarat rice dish hero photo |
| 44 | Khichuri | West Bengal | Rice | Regional Journeys / Bengal | Medium - cookable role; low-effort signal | P1 | Khichuri - West Bengal rice dish hero photo |
| 45 | Koraishutir Kochuri | West Bengal | Breakfast & Everyday Classics | Regional Journeys / Bengal | Medium - cookable role; low-effort signal | P1 | Koraishutir Kochuri - West Bengal homestyle dish hero photo |
| 46 | Kumaoni Raita | Uttarakhand | Vegetarian | Regional Journeys / Uttarakhand | Medium - cookable role; low-effort signal | P1 | Kumaoni Raita - Uttarakhand homestyle dish hero photo |
| 47 | Makki di Roti | Punjab | Breads | Regional Journeys / Punjab | Medium - cookable role; base ingredient: bread | P1 | Makki di Roti - Punjab homestyle dish hero photo |
| 48 | Mandua Roti | Uttarakhand | Breads | Regional Journeys / Uttarakhand | Medium - cookable role; base ingredient: bread | P1 | Mandua Roti - Uttarakhand homestyle dish hero photo |
| 49 | Missi Roti | Haryana | Breads | Regional Journeys / Haryana | Medium - cookable role; base ingredient: bread | P1 | Missi Roti - Haryana homestyle dish hero photo |
| 50 | Modur Pulao | Jammu & Kashmir | Rice | Regional Journeys / Jammu & Kashmir | Medium - cookable role; base ingredient: rice | P1 | Modur Pulao - Jammu & Kashmir rice dish hero photo |
| 51 | Mushroom Xacuti | Goa | Vegetarian | Regional Journeys / Goa | Medium - cookable role; base ingredient: mushroom | P1 | Mushroom Xacuti - Goa homestyle dish hero photo |
| 52 | Ringan No Olo | Gujarat | Main Course | Regional Journeys / Gujarat | Medium - cookable role; low-effort signal | P1 | Ringan No Olo - Gujarat homestyle dish hero photo |
| 53 | Santula | Odisha | Main Course | Regional Journeys / Odisha | Medium - cookable role; low-effort signal | P1 | Santula - Odisha homestyle dish hero photo |
| 54 | Sarva Pindi | Telangana | Snacks & Evening Bites | Regional Journeys / Andhra & Telangana | Medium - cookable role; low-effort signal | P1 | Sarva Pindi - Telangana snack hero photo |
| 55 | Sev Tameta | Gujarat | Main Course | Regional Journeys / Gujarat | Medium - cookable role; low-effort signal | P1 | Sev Tameta - Gujarat homestyle dish hero photo |
| 56 | Skyu | Ladakh | Main Course | Regional Journeys / Ladakh | Medium - cookable role; low-effort signal | P1 | Skyu - Ladakh homestyle dish hero photo |
| 57 | Tudkiya Bhath | Himachal Pradesh | Main Course | Regional Journeys / Himachal Pradesh | Medium - cookable role; low-effort signal | P1 | Tudkiya Bhath - Himachal Pradesh homestyle dish hero photo |
| 58 | Vaghareli Khichdi | Gujarat | Rice | Regional Journeys / Gujarat | Medium - cookable role; low-effort signal | P1 | Vaghareli Khichdi - Gujarat rice dish hero photo |
| 59 | Nethili Fry | Tamil Nadu | Snacks & Evening Bites | Regional Journeys / Tamil Nadu | Low - low-effort signal; pantry/mood fit | P1 | Nethili Fry - Tamil Nadu snack hero photo |
| 60 | Kane Rava Fry | Coastal Karnataka | Curries & Saaru | Regional Journeys / Karnataka | Low - low-effort signal; pantry/mood fit | P1 | Kane Rava Fry - Coastal Karnataka snack hero photo |
| 61 | Chha Gosht | Himachal Pradesh | Main Course | Regional Journeys / Himachal Pradesh | Low - cookable role | P1 | Chha Gosht - Himachal Pradesh homestyle dish hero photo |
| 62 | Goan Choris Pav | Goa | Snacks | Regional Journeys / Goa | Low - cookable role | P1 | Goan Choris Pav - Goa snack hero photo |
| 63 | Macha Besara | Odisha | Seafood | Regional Journeys / Odisha | Low - cookable role | P1 | Macha Besara - Odisha homestyle dish hero photo |
| 64 | Machha Tarkari | Odisha | Seafood | Regional Journeys / Odisha | Low - cookable role | P1 | Machha Tarkari - Odisha homestyle dish hero photo |
| 65 | Yakhni | Jammu & Kashmir | Main Course | Regional Journeys / Jammu & Kashmir | Low - cookable role | P1 | Yakhni - Jammu & Kashmir curry hero photo |
| 66 | Sev Khamani | Surat, Gujarat | Breakfast & Snacks | Regional Journeys / Gujarat | Low - cookable role | P1 | Sev Khamani - Surat, Gujarat snack hero photo |
| 67 | Bikaneri Bhujia | Bikaner, Rajasthan | Snacks | Regional Journeys / Rajasthan | Low - cookable role | P1 | Bikaneri Bhujia - Bikaner, Rajasthan snack hero photo |
| 68 | Churma | Rajasthan | Desserts | Regional Journeys / Rajasthan | Low | P1 | Churma - Rajasthan dessert hero photo |
| 69 | Gatte Ki Sabzi | Rajasthan | Main Course | Regional Journeys / Rajasthan | Low - cookable role | P1 | Gatte Ki Sabzi - Rajasthan homestyle dish hero photo |
| 70 | Ghevar | Rajasthan | Desserts | Regional Journeys / Rajasthan | Low | P1 | Ghevar - Rajasthan dessert hero photo |
| 71 | Govind Gatta | Rajasthan | Vegetarian | Regional Journeys / Rajasthan | Low - cookable role | P1 | Govind Gatta - Rajasthan homestyle dish hero photo |
| 72 | Ker Sangri | Rajasthan | Main Course | Regional Journeys / Rajasthan | Low - cookable role | P1 | Ker Sangri - Rajasthan homestyle dish hero photo |
| 73 | Mawa Kachori | Jodhpur, Rajasthan | Snacks & Desserts | Regional Journeys / Rajasthan | Low | P1 | Mawa Kachori - Jodhpur, Rajasthan dessert hero photo |
| 74 | Mirchi Vada | Jodhpur, Rajasthan | Breakfast & Snacks | Regional Journeys / Rajasthan | Low - cookable role | P1 | Mirchi Vada - Jodhpur, Rajasthan snack hero photo |
| 75 | Pyaaz Kachori | Jodhpur, Rajasthan | Breakfast & Snacks | Regional Journeys / Rajasthan | Low - cookable role | P1 | Pyaaz Kachori - Jodhpur, Rajasthan snack hero photo |
| 76 | Aktori | Himachal Pradesh | Desserts | Regional Journeys / Himachal Pradesh | Low | P1 | Aktori - Himachal Pradesh dessert hero photo |
| 77 | Aloo Bhaja | West Bengal | Vegetarian | Regional Journeys / Bengal | Low - low-effort signal | P1 | Aloo Bhaja - West Bengal homestyle dish hero photo |
| 78 | Amritsari Chole | Amritsar, Punjab | Main Course | Regional Journeys / Punjab | Low - cookable role | P1 | Amritsari Chole - Amritsar, Punjab homestyle dish hero photo |
| 79 | Amritsari Kulcha | Amritsar, Punjab | Breakfast | Regional Journeys / Punjab | Low - cookable role | P1 | Amritsari Kulcha - Amritsar, Punjab homestyle dish hero photo |
| 80 | Arsa | Jharkhand | Rice / Dessert | Regional Journeys / Jharkhand | Low - base ingredient: rice | P1 | Arsa - Jharkhand dessert hero photo |
| 81 | Babru | Himachal Pradesh | Breakfast / Snacks | Regional Journeys / Himachal Pradesh | Low - cookable role | P1 | Babru - Himachal Pradesh snack hero photo |
| 82 | Bebinca | Goa | Desserts | Regional Journeys / Goa | Low | P1 | Bebinca - Goa dessert hero photo |
| 83 | Beerakaya Pachadi | Andhra Pradesh | Pappu, Pulusu & Curries | Regional Journeys / Andhra & Telangana | Low - low-effort signal | P1 | Beerakaya Pachadi - Andhra Pradesh curry hero photo |
| 84 | Bendakaya Fry | Andhra Pradesh | Pappu, Pulusu & Curries | Regional Journeys / Andhra & Telangana | Low - low-effort signal | P1 | Bendakaya Fry - Andhra Pradesh snack hero photo |
| 85 | Besara | Odisha | Main Course | Regional Journeys / Odisha | Low - cookable role | P1 | Besara - Odisha homestyle dish hero photo |
| 86 | Bhindi Sambhariya | Gujarat | Main Course | Regional Journeys / Gujarat | Low - cookable role | P1 | Bhindi Sambhariya - Gujarat homestyle dish hero photo |
| 87 | Butter Tea | Ladakh | Drinks | Regional Journeys / Ladakh | Low - low-effort signal | P1 | Butter Tea - Ladakh homestyle dish hero photo |
| 88 | Chainsoo | Uttarakhand | Main Course | Regional Journeys / Uttarakhand | Low - cookable role | P1 | Chainsoo - Uttarakhand homestyle dish hero photo |
| 89 | Chana Madra | Himachal Pradesh | Main Course | Regional Journeys / Himachal Pradesh | Low - cookable role | P1 | Chana Madra - Himachal Pradesh homestyle dish hero photo |
| 90 | Chhena Jhili | Odisha | Desserts | Regional Journeys / Odisha | Low | P1 | Chhena Jhili - Odisha dessert hero photo |
| 91 | Chhena Poda | Odisha | Desserts | Regional Journeys / Odisha | Low | P1 | Chhena Poda - Odisha dessert hero photo |
| 92 | Chole Kulche | Punjab | Breakfast | Regional Journeys / Punjab | Low - cookable role | P1 | Chole Kulche - Punjab homestyle dish hero photo |
| 93 | Dhuska | Jharkhand | Main Course | Regional Journeys / Jharkhand | Low - cookable role | P1 | Dhuska - Jharkhand homestyle dish hero photo |
| 94 | Doce | Goa | Desserts | Regional Journeys / Goa | Low | P1 | Doce - Goa dessert hero photo |
| 95 | Dubuk | Uttarakhand | Main Course | Regional Journeys / Uttarakhand | Low - cookable role | P1 | Dubuk - Uttarakhand homestyle dish hero photo |
| 96 | Fafda | Gujarat | Breakfast & Snacks | Regional Journeys / Gujarat | Low - cookable role | P1 | Fafda - Gujarat snack hero photo |
| 97 | Ghanta Tarkari | Odisha | Main Course | Regional Journeys / Odisha | Low - cookable role | P1 | Ghanta Tarkari - Odisha homestyle dish hero photo |
| 98 | Gongura Pachadi | Andhra Pradesh | Pappu, Pulusu & Curries | Regional Journeys / Andhra & Telangana | Low - low-effort signal; base ingredient: gongura | P1 | Gongura Pachadi - Andhra Pradesh curry hero photo |
| 99 | Jhangora Kheer | Uttarakhand | Desserts | Regional Journeys / Uttarakhand | Low | P1 | Jhangora Kheer - Uttarakhand dessert hero photo |
| 100 | Jhinge Posto | West Bengal | Vegetarian | Regional Journeys / Bengal | Low | P1 | Jhinge Posto - West Bengal homestyle dish hero photo |
| 101 | Kaalan | Kerala | Curries & Seafood | Regional Journeys / Kerala | Low - low-effort signal; pantry/mood fit | P1 | Kaalan - Kerala homestyle dish hero photo |
| 102 | Kachri Ki Sabzi | Haryana | Main Course | Regional Journeys / Haryana | Low - cookable role | P1 | Kachri Ki Sabzi - Haryana homestyle dish hero photo |
| 103 | Kadhi Bari | Bihar | Vegetarian | Regional Journeys / Bihar | Low - cookable role | P1 | Kadhi Bari - Bihar homestyle dish hero photo |
| 104 | Khaja | Bihar | Desserts | Regional Journeys / Bihar | Low | P1 | Khaja - Bihar dessert hero photo |
| 105 | Lasaniya Bataka | Kathiawad, Gujarat | Main Course | Regional Journeys / Gujarat | Low - cookable role | P1 | Lasaniya Bataka - Kathiawad, Gujarat homestyle dish hero photo |
| 106 | Lilva Kachori | Gujarat | Snacks | Regional Journeys / Gujarat | Low - cookable role | P1 | Lilva Kachori - Gujarat snack hero photo |
| 107 | Luchi | West Bengal | Breakfast | Regional Journeys / Bengal | Low - cookable role | P1 | Luchi - West Bengal homestyle dish hero photo |
| 108 | Meethe Chawal | Haryana | Desserts | Regional Journeys / Haryana | Low | P1 | Meethe Chawal - Haryana dessert hero photo |
| 109 | Mohanthal | Gujarat | Desserts | Regional Journeys / Gujarat | Low | P1 | Mohanthal - Gujarat dessert hero photo |
| 110 | Nadru Yakhni | Jammu & Kashmir | Main Course | Regional Journeys / Jammu & Kashmir | Low - cookable role | P1 | Nadru Yakhni - Jammu & Kashmir curry hero photo |
| 111 | Pinni | Punjab | Desserts | Regional Journeys / Punjab | Low | P1 | Pinni - Punjab dessert hero photo |
| 112 | Pittha | Jharkhand | Vegetarian | Regional Journeys / Jharkhand | Low - cookable role | P1 | Pittha - Jharkhand homestyle dish hero photo |
| 113 | Rugra Curry | Jharkhand | Main Course | Regional Journeys / Jharkhand | Low - cookable role | P1 | Rugra Curry - Jharkhand curry hero photo |
| 114 | Sattu Paratha | Bihar | Main Course | Regional Journeys / Bihar | Low - cookable role | P1 | Sattu Paratha - Bihar homestyle dish hero photo |
| 115 | Serradura | Goa | Desserts | Regional Journeys / Goa | Low | P1 | Serradura - Goa dessert hero photo |
| 116 | Siddu | Himachal Pradesh | Breakfast / Snacks | Regional Journeys / Himachal Pradesh | Low - cookable role | P1 | Siddu - Himachal Pradesh snack hero photo |
| 117 | Sukhdi | Gujarat | Desserts | Regional Journeys / Gujarat | Low - low-effort signal | P1 | Sukhdi - Gujarat dessert hero photo |
| 118 | Thekua | Bihar | Desserts | Regional Journeys / Bihar | Low | P1 | Thekua - Bihar dessert hero photo |
| 119 | Vada Pav | Mumbai, Maharashtra | Snacks & Street Food | Regional Journeys / Maharashtra | Low - cookable role | P1 | Vada Pav - Mumbai, Maharashtra snack hero photo |
| 120 | Vegetable Chop | Kolkata, West Bengal | Snacks | Regional Journeys / Bengal | Low - cookable role | P1 | Vegetable Chop - Kolkata, West Bengal snack hero photo |

## P2 Placeholder Recipes

Count: 61

| # | Recipe | State | Category | Collection usage | Kitchen usage | Priority | Recommended image prompt title |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | Chicken Pulao | Unspecified | Main | Healthy Living / Healthy Plates | High - cookable role; low-effort signal | P2 | Chicken Pulao - rice dish hero photo |
| 2 | Bamboo Shoot Pork | Northeast | Smoked & Fermented | Regional Journeys / Northeast | High - cookable role; low-effort signal | P2 | Bamboo Shoot Pork - Northeast homestyle dish hero photo |
| 3 | Kerala Parotta Beef Fry | Kerala | Rice & Main Meals | Regional Journeys / Kerala | High - cookable role; low-effort signal | P2 | Kerala Parotta Beef Fry - Kerala snack hero photo |
| 4 | Smoked Pork Curry | Northeast | Smoked & Fermented | Regional Journeys / Northeast | High - cookable role; low-effort signal | P2 | Smoked Pork Curry - Northeast curry hero photo |
| 5 | Smoked Pork Rice | Northeast | Smoked & Fermented | Regional Journeys / Northeast | High - cookable role; low-effort signal | P2 | Smoked Pork Rice - Northeast rice dish hero photo |
| 6 | Aloo Rice | Unspecified | Main | Everyday Cooking / Daily Comforts | High - cookable role; low-effort signal | P2 | Aloo Rice - rice dish hero photo |
| 7 | Tomato Paneer Rice | Unspecified | Main | Everyday Cooking / Daily Comforts | High - cookable role; low-effort signal | P2 | Tomato Paneer Rice - rice dish hero photo |
| 8 | Rice Cakes | Unspecified | Snack | Everyday Cooking / Tea Time Favourites | High - cookable role; low-effort signal | P2 | Rice Cakes - snack hero photo |
| 9 | Jolada Rotti | Karnataka | Rice & Main Meals | Regional Journeys / Karnataka | High - cookable role; low-effort signal | P2 | Jolada Rotti - Karnataka rice dish hero photo |
| 10 | Mutton Korma | Unspecified | Main | Celebration Specials, Regional Journeys / North & West India | Medium - cookable role; low-effort signal | P2 | Mutton Korma - homestyle dish hero photo |
| 11 | Mango Rice | Tamil Nadu | Rice & Main Meals | Celebration Specials, Regional Journeys / Tamil Nadu | Medium - cookable role; base ingredient: rice | P2 | Mango Rice - Tamil Nadu rice dish hero photo |
| 12 | Masor Tenga | Northeast | Everyday Meals | Regional Journeys / Northeast | Medium - cookable role; low-effort signal | P2 | Masor Tenga - Northeast homestyle dish hero photo |
| 13 | Pork Curry | Northeast | Everyday Meals | Regional Journeys / Northeast | Medium - cookable role; pantry/mood fit | P2 | Pork Curry - Northeast curry hero photo |
| 14 | Dohneiiong | Northeast | Everyday Meals | Regional Journeys / Northeast | Medium - cookable role; low-effort signal | P2 | Dohneiiong - Northeast homestyle dish hero photo |
| 15 | Kanji Payar | Warm & Light Bowls | Sick Day Comfort | Healthy Living / Warm & Light Bowls | Medium - cookable role; low-effort signal | P2 | Kanji Payar - Warm & Light Bowls homestyle dish hero photo |
| 16 | Kerala Beef Fry | Kerala | Curries & Seafood | Regional Journeys / Kerala | Medium - cookable role; low-effort signal | P2 | Kerala Beef Fry - Kerala snack hero photo |
| 17 | Kolhapuri Chicken | Maharashtra | Amti, Curries & Sabzis | Regional Journeys / Maharashtra | Medium - cookable role; pantry/mood fit | P2 | Kolhapuri Chicken - Maharashtra homestyle dish hero photo |
| 18 | Mutton Chukka | Tamil Nadu | Kuzhambu, Kootu & Curries | Regional Journeys / Tamil Nadu | Medium - cookable role; low-effort signal | P2 | Mutton Chukka - Tamil Nadu curry hero photo |
| 19 | Pesara Garelu | Andhra & Telangana | Snacks & Evening Bites | Regional Journeys / Andhra & Telangana | Medium - cookable role; low-effort signal | P2 | Pesara Garelu - Andhra & Telangana snack hero photo |
| 20 | Phagshapa | Northeast | Everyday Meals | Regional Journeys / Northeast | Medium - cookable role; low-effort signal | P2 | Phagshapa - Northeast homestyle dish hero photo |
| 21 | Tungrymbai | Northeast | Smoked & Fermented | Regional Journeys / Northeast | Medium - cookable role; low-effort signal | P2 | Tungrymbai - Northeast homestyle dish hero photo |
| 22 | Wahan Mosdeng | Northeast | Everyday Meals | Regional Journeys / Northeast | Medium - cookable role; low-effort signal | P2 | Wahan Mosdeng - Northeast homestyle dish hero photo |
| 23 | Olan | Warm & Light Bowls | Stews | Celebration Specials, Healthy Living / Warm & Light Bowls | Low - pantry/mood fit | P2 | Olan - Warm & Light Bowls homestyle dish hero photo |
| 24 | Paneer Salad | Chutneys, Salads & Add-ons | Salads | Fresh Plates, Kitchen Essentials / Chutneys, Salads & Add-ons | Low - low-effort signal; base ingredient: paneer | P2 | Paneer Salad - Chutneys, Salads & Add-ons homestyle dish hero photo |
| 25 | Jhalmuri | Bengal | Snacks & Street Food | Regional Journeys / Bengal | Medium - cookable role; low-effort signal | P2 | Jhalmuri - Bengal snack hero photo |
| 26 | Keema Fry | Unspecified | Main | Healthy Living / Healthy Plates | Medium - cookable role; pantry/mood fit | P2 | Keema Fry - snack hero photo |
| 27 | Pazham Pori | Unspecified | Snack | Everyday Cooking / Tea Time Favourites | Medium - cookable role; low-effort signal | P2 | Pazham Pori - snack hero photo |
| 28 | Potol Dorma | Bengal | Curries & Traditional Dishes | Regional Journeys / Bengal | Medium - cookable role; low-effort signal | P2 | Potol Dorma - Bengal homestyle dish hero photo |
| 29 | Punugulu | Andhra & Telangana | Snacks & Evening Bites | Regional Journeys / Andhra & Telangana | Medium - cookable role; low-effort signal | P2 | Punugulu - Andhra & Telangana snack hero photo |
| 30 | Telebhaja | Bengal | Snacks & Street Food | Regional Journeys / Bengal | Medium - cookable role; low-effort signal | P2 | Telebhaja - Bengal snack hero photo |
| 31 | Batata Vada | Maharashtra | Snacks & Street Food | Regional Journeys / Maharashtra | Medium - cookable role; pantry/mood fit | P2 | Batata Vada - Maharashtra snack hero photo |
| 32 | Galho | Warm & Light Bowls | Light Meals | Healthy Living / Warm & Light Bowls | Medium - cookable role; low-effort signal | P2 | Galho - Warm & Light Bowls homestyle dish hero photo |
| 33 | Khar | Northeast | Everyday Meals | Regional Journeys / Northeast | Medium - cookable role; low-effort signal | P2 | Khar - Northeast homestyle dish hero photo |
| 34 | Kothimbir Vadi | Maharashtra | Snacks & Street Food | Regional Journeys / Maharashtra | Medium - cookable role; low-effort signal | P2 | Kothimbir Vadi - Maharashtra snack hero photo |
| 35 | Sabudana Vada | Maharashtra | Snack | Everyday Cooking / Tea Time Favourites | Medium - cookable role; pantry/mood fit | P2 | Sabudana Vada - Maharashtra snack hero photo |
| 36 | Tripuri Berma Curry | Northeast | Smoked & Fermented | Regional Journeys / Northeast | Medium - cookable role; low-effort signal | P2 | Tripuri Berma Curry - Northeast curry hero photo |
| 37 | Zan | Warm & Light Bowls | Light Meals | Healthy Living / Warm & Light Bowls | Medium - cookable role; low-effort signal | P2 | Zan - Warm & Light Bowls homestyle dish hero photo |
| 38 | Kheema Pav | Maharashtra | Snacks & Street Food | Regional Journeys / Maharashtra | Medium - cookable role; pantry/mood fit | P2 | Kheema Pav - Maharashtra snack hero photo |
| 39 | Carrot Cucumber Salad | Chutneys, Salads & Add-ons | Salads | Fresh Plates, Kitchen Essentials / Chutneys, Salads & Add-ons | Low - low-effort signal | P2 | Carrot Cucumber Salad - Chutneys, Salads & Add-ons homestyle dish hero photo |
| 40 | Coconut Cucumber Salad | Chutneys, Salads & Add-ons | Salads | Fresh Plates, Kitchen Essentials / Chutneys, Salads & Add-ons | Low - low-effort signal; base ingredient: coconut | P2 | Coconut Cucumber Salad - Chutneys, Salads & Add-ons homestyle dish hero photo |
| 41 | Cucumber Raita Salad | Chutneys, Salads & Add-ons | Raitas | Fresh Plates, Kitchen Essentials / Chutneys, Salads & Add-ons | Low - low-effort signal | P2 | Cucumber Raita Salad - Chutneys, Salads & Add-ons homestyle dish hero photo |
| 42 | Mango Salad | Chutneys, Salads & Add-ons | Salads | Fresh Plates, Kitchen Essentials / Chutneys, Salads & Add-ons | Low - low-effort signal | P2 | Mango Salad - Chutneys, Salads & Add-ons homestyle dish hero photo |
| 43 | Sweet Rice | Unspecified | Traditional Treats | Celebrations & Traditions / Festival Sweets | Medium - low-effort signal; pantry/mood fit | P2 | Sweet Rice - dessert hero photo |
| 44 | Mangalore Goli Baje | Karnataka | Snacks & Evening Bites | Regional Journeys / Karnataka | Medium - cookable role; low-effort signal | P2 | Mangalore Goli Baje - Karnataka snack hero photo |
| 45 | Thatte Idli | Karnataka | Breakfast | Regional Journeys / Karnataka | Medium - cookable role; low-effort signal | P2 | Thatte Idli - Karnataka homestyle dish hero photo |
| 46 | Pathrode | Unspecified | Side | Kitchen Essentials / Sides, Salads & Add-ons | Low - low-effort signal; pantry/mood fit | P2 | Pathrode - homestyle dish hero photo |
| 47 | Beetroot Pachadi | Kerala | Curries & Seafood | Regional Journeys / Kerala | Low - low-effort signal; pantry/mood fit | P2 | Beetroot Pachadi - Kerala homestyle dish hero photo |
| 48 | Erissery | Kerala | Curries & Seafood | Regional Journeys / Kerala | Low - low-effort signal; pantry/mood fit | P2 | Erissery - Kerala homestyle dish hero photo |
| 49 | Sweet Pongal | Tamil Nadu | Regional Festival Classics | Celebrations & Traditions / Festival Sweets | Low - low-effort signal; pantry/mood fit | P2 | Sweet Pongal - Tamil Nadu dessert hero photo |
| 50 | Ulli Theeyal | Unspecified | Side | Kitchen Essentials / Sides, Salads & Add-ons | Low - low-effort signal; pantry/mood fit | P2 | Ulli Theeyal - homestyle dish hero photo |
| 51 | Aloo Pitika | Northeast | Side | Kitchen Essentials / Sides, Salads & Add-ons | Low - low-effort signal; pantry/mood fit | P2 | Aloo Pitika - Northeast homestyle dish hero photo |
| 52 | Gujiya | Unspecified | Festival Breads & Dumplings | Celebrations & Traditions / Festival Sweets | Low - pantry/mood fit; base ingredient: bread | P2 | Gujiya - homestyle dish hero photo |
| 53 | Kada Prasad | Punjab | Dessert | Celebrations & Traditions / Prasadam & Temple Foods | Low - pantry/mood fit | P2 | Kada Prasad - Punjab dessert hero photo |
| 54 | Sweet Holige | Unspecified | Dessert | Celebrations & Traditions / Regional Sweets | Low - pantry/mood fit | P2 | Sweet Holige - dessert hero photo |
| 55 | Mirapakaya Bajji | Andhra & Telangana | Snacks & Evening Bites | Regional Journeys / Andhra & Telangana | Low - cookable role | P2 | Mirapakaya Bajji - Andhra & Telangana snack hero photo |
| 56 | Dharwad Peda | Unspecified | Dessert | Celebrations & Traditions / Regional Sweets | Low - low-effort signal; pantry/mood fit | P2 | Dharwad Peda - dessert hero photo |
| 57 | Majjige Huli | Unspecified | Side | Kitchen Essentials / Sides, Salads & Add-ons | Low - low-effort signal; pantry/mood fit | P2 | Majjige Huli - homestyle dish hero photo |
| 58 | Garlic Paneer Roti Wrap | Unspecified | Main | Regional Journeys / North & West India | High - cookable role; low-effort signal | P2 | Garlic Paneer Roti Wrap - homestyle dish hero photo |
| 59 | Paneer Capsicum Rice Bowl | Unspecified | Main | Healthy Living / Healthy Plates | High - cookable role; low-effort signal | P2 | Paneer Capsicum Rice Bowl - rice dish hero photo |
| 60 | Paneer Corn Rice Bowl | Unspecified | Main | Healthy Living / Healthy Plates | High - cookable role; low-effort signal | P2 | Paneer Corn Rice Bowl - rice dish hero photo |
| 61 | Mushroom Pepper Rice Bowl | Unspecified | Main | Healthy Living / Healthy Plates | High - cookable role; low-effort signal | P2 | Mushroom Pepper Rice Bowl - rice dish hero photo |

## P3 Placeholder Recipes

Count: 0

| # | Recipe | State | Category | Collection usage | Kitchen usage | Priority | Recommended image prompt title |
| ---: | --- | --- | --- | --- | --- | --- | --- |

## P4 Placeholder Recipes

Count: 0

| # | Recipe | State | Category | Collection usage | Kitchen usage | Priority | Recommended image prompt title |
| ---: | --- | --- | --- | --- | --- | --- | --- |

## Notes For Generation

- Generate P0 first, in listed order, before any broad regional image wave.
- P1 should follow as a regional authenticity pack, grouped by state to maintain visual style consistency.
- P2 can be batched by collection so Discover and collection pages improve together.
- P3 can be batched by ingredient family for Kitchen/Cook coverage.
- P4 can wait until after Beta 3 unless a recipe is promoted into a visible surface.
