# Beta 3 Catalog Health Audit

Generated: 2026-06-25T11:46:28.163Z

## 1. Executive Summary

- Total active recipes: 658
- Backend recipes: 660
- Frontend active recipes: 658
- Generated collection hubs: 8
- Generated collections: 30
- Regions audited: 9
- Overall catalog health score: 70/100

### Top 10 risks before Beta 3

1. 461 recipes still use placeholder/shared/generic imagery; 461 are visible in primary collection/journey/recommendation surfaces.
2. 0 broken image paths and 0 missing imageUrl records detected.
3. 0 Global Bites recipes also match regional journey rules; review isolation before freeze.
4. 12 non-Global recipes match Global keyword rules; review if browse filters use global text matching later.
5. 0 recipes have missing or invalid collectionHome values.
6. 0 backend/frontend image path mismatches.
7. 0 exact duplicate title keys, 0 duplicate slug keys, 0 duplicate sourceIds.
8. 0 missing quick guides; 41 missing pairings; 0 missing ingredient structures.
9. North India/North & West India remains weaker than the expanded South/East/Northeast journeys.
10. Several category collections are image-heavy on shared fallbacks, especially soups, desserts, sides and older recommendation-pack dishes.

## 2. Recipe Status

Full recipe-level status is summarized below by issue type. The machine-readable JSON includes the top image replacement priorities and summary counts.

| Check | Count | Notes |
| --- | --- | --- |
| Backend/frontend image parity | 658/658 | 0 mismatches |
| Missing quickGuide | 0 | — |
| Missing pairings | 41 | Rasmalai, Kheer, Payasam, Rice Kheer, Kaju Katli, Besan Ladoo, Motichoor Ladoo, Coconut Barfi, Dry Fruit Ladoo, Chocolate Burfi, +31 more |
| Missing ingredients/core ingredients | 0 | — |
| Missing mealTags | 3 | Dal Makhani, Khichdi, Mirchi Bajji |
| Missing moodTags | 0 | — |
| Missing regionTags/cuisine | 0 | — |
| Missing dietary tags/type | 0 | — |
| Broken image paths | 0 | — |
| Missing imageUrl | 0 | — |
| Invalid/missing collectionHome | 0 | — |
| Tomo Pick eligible | 655 | Has role, meal/mood tags and usable image path |
| Today's Picks eligible | 574 | Major-card role + tags + usable image path |
| Pantry eligible | 658 | Has ingredient/pantry fields |
| Regional Journey eligible | 467 | Matches journey coverage rules |

## 3. Category Coverage

| Category | Total | Dedicated images | Shared images | Placeholder images | Missing/broken images | Missing recipe data | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Breakfast | 133 | 46 | 77 | 10 | 0 | 0 | REVIEW images |
| Lunch | 262 | 74 | 116 | 72 | 0 | 4 | REVIEW images |
| Dinner | 283 | 68 | 112 | 103 | 0 | 1 | REVIEW images |
| Snacks | 317 | 113 | 68 | 136 | 0 | 41 | REVIEW images |
| Rice | 219 | 57 | 82 | 80 | 0 | 10 | REVIEW images |
| Curry | 227 | 59 | 116 | 52 | 0 | 2 | REVIEW images |
| Chutneys | 54 | 19 | 25 | 10 | 0 | 1 | REVIEW images |
| Sides & Add-ons | 90 | 39 | 24 | 27 | 0 | 1 | REVIEW images |
| Soups | 61 | 9 | 10 | 42 | 0 | 0 | REVIEW images |
| Drinks | 37 | 29 | 4 | 4 | 0 | 0 | healthy |
| Desserts | 62 | 3 | 1 | 58 | 0 | 32 | REVIEW images |
| Baby Food / Tiny Tummy | 35 | 24 | 5 | 6 | 0 | 0 | healthy |
| Global Bites | 74 | 4 | 40 | 30 | 0 | 0 | REVIEW images |
| Power Plates | 216 | 57 | 99 | 60 | 0 | 2 | REVIEW images |
| Fresh Plates | 143 | 62 | 33 | 48 | 0 | 5 | REVIEW images |

## 4. Regional Coverage

| Region | Coverage count | collectionHome count | Dedicated | Shared | Placeholder | Missing/broken | Strongest | Weakest | Image weakness | Top additions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Karnataka | 59 | 40 | 36 | 3 | 20 | 0 | main | drink, condiment | moderate | North Karnataka sweets; Kodagu vegetarian sides; Malnad breakfasts |
| Andhra & Telangana | 48 | 30 | 6 | 26 | 16 | 0 | main | soup, drink, condiment | image debt | Telangana breakfast; Rayalaseema vegetarian mains; regional drinks |
| Tamil Nadu | 52 | 37 | 11 | 29 | 12 | 0 | main | drink, condiment | image debt | Kongu vegetarian plates; Madurai street snacks; temple prasadam |
| Kerala | 37 | 23 | 3 | 16 | 18 | 0 | main | snack, dessert, drink | image debt | regional drinks; Onam side variety; Malabar snacks |
| Bengal | 37 | 13 | 9 | 12 | 16 | 0 | main | soup, drink, condiment | image debt | breakfast breadth; vegetarian home sides; Kolkata drinks |
| Maharashtra | 41 | 21 | 6 | 19 | 16 | 0 | main | soup, drink, condiment | image debt | Vidarbha dishes; Khandesh dishes; everyday dals |
| Northeast | 41 | 31 | 13 | 17 | 11 | 0 | main | dessert, drink, condiment | image debt | Mizoram/Tripura desserts; Arunachal vegetarian mains; Assamese breakfast |
| North India | 75 | 52 | 26 | 23 | 26 | 0 | main | soup, drink, condiment | image debt | Delhi street foods; Rajasthani thalis; Punjabi breakfasts |
| Global | 86 | 74 | 8 | 44 | 34 | 0 | main | side, dessert, drink | image debt | street food breadth; African dishes; Latin American bowls |

## 5. Collection Health

| Hub | Collection | Count | Duplicates | Dedicated | Shared | Placeholder | Missing images | Top families / roles | Health note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Regional Journeys | Karnataka | 59 | 0 | 36 | 3 | 20 | 0 | dosa:4, rice:4, saaru:4, festival-sweets:3 | ok |
| Regional Journeys | Andhra & Telangana | 48 | 0 | 6 | 26 | 16 | 0 | pappu:5, chicken-curry:3, dosa:3, green chilli:3 | image-heavy debt |
| Regional Journeys | Tamil Nadu | 52 | 0 | 11 | 29 | 12 | 0 | kuzhambu:5, rasam:5, rice:5, chicken-curry:3 | image-heavy debt |
| Regional Journeys | Kerala | 37 | 0 | 3 | 16 | 18 | 0 | chicken-curry:3, fish-curry:3, thoran:3, theeyal:2 | image-heavy debt |
| Regional Journeys | Bengal | 37 | 0 | 9 | 12 | 16 | 0 | fish-curry:3, chicken-curry:2, dalna:2, festival-sweets:2 | image-heavy debt |
| Regional Journeys | Maharashtra | 41 | 0 | 6 | 19 | 16 | 0 | poha:4, festival-sweets:3, dal:2, stuffed vegetable:2 | image-heavy debt |
| Regional Journeys | Northeast | 41 | 0 | 13 | 17 | 11 | 0 | chicken curry:3, pork curry:3, fish curry:2, mash:2 | ok |
| Regional Journeys | North & West India | 75 | 0 | 26 | 23 | 26 | 0 | paratha:15, paneer-curry:8, festival-sweets:6, pulao:5 | ok |
| Regional Journeys | Jammu & Kashmir | 0 | 0 | 0 | 0 | 0 | 0 |  | empty / hidden risk |
| Everyday Cooking | Daily Comforts | 32 | 0 | 6 | 22 | 4 | 0 | dosa:10, egg:5, rice:3, chicken-curry:2 | ok |
| Everyday Cooking | Tea Time Favourites | 17 | 0 | 10 | 2 | 5 | 0 | drink:9, chaat:2, bakery-snack:1, bread:1 | ok |
| Everyday Cooking | Home Staples | 0 | 0 | 0 | 0 | 0 | 0 |  | empty / hidden risk |
| Healthy Living | Healthy Plates | 23 | 0 | 4 | 8 | 11 | 0 | egg:7, rice:5, fish-curry:3, besan:1 | image-heavy debt |
| Healthy Living | Warm & Light Bowls | 18 | 0 | 0 | 0 | 18 | 0 | soup:18 | image-heavy debt |
| Family Favorites | Tiny Tummy Favorites | 28 | 0 | 22 | 2 | 4 | 0 | baby food:22, apple:1, banana:1, carrot:1 | ok |
| Family Favorites | Lunch Box & Tiffin | 18 | 0 | 6 | 10 | 2 | 0 | idli:2, roll:2, sandwich:2, chaat:1 | ok |
| Global Bites | Global Breakfasts | 11 | 0 | 1 | 10 | 0 | 0 | toast:4, egg:2, pancake:1, quesadilla:1 | ok |
| Global Bites | Global Bowls | 11 | 0 | 0 | 2 | 9 | 0 | rice bowl:7, grain bowl:2, noodle bowl:1, rice:1 | image-heavy debt |
| Global Bites | Global Mains | 12 | 0 | 2 | 8 | 2 | 0 | rice:5, pasta:2, chicken-curry:1, curry:1 | ok |
| Global Bites | Global Snacks | 14 | 0 | 1 | 11 | 2 | 0 | beans:1, bread:1, cheese snack:1, corn snack:1 | image-heavy debt |
| Global Bites | Global Soups | 16 | 0 | 0 | 0 | 16 | 0 | soup:16 | image-heavy debt |
| Global Bites | Global Street Food | 10 | 0 | 0 | 9 | 1 | 0 | street food:7, steamed bun:1, street toast:1, wrap:1 | image-heavy debt |
| Kitchen Essentials | Sides, Salads & Add-ons | 63 | 0 | 27 | 19 | 17 | 0 | salad:25, chaat:6, pulusu:3, mash:2 | ok |
| Kitchen Essentials | Chutneys, Podis & Condiments | 10 | 0 | 6 | 2 | 2 | 0 | chutney:6, raita:3, idli:1 | ok |
| Seasonal Specials | Summer Cooling | 18 | 0 | 17 | 1 | 0 | 0 | drink:18 | ok |
| Seasonal Specials | Rainy Day Cravings | 0 | 0 | 0 | 0 | 0 | 0 |  | empty / hidden risk |
| Celebrations & Traditions | Festival Sweets | 106 | 0 | 9 | 18 | 79 | 0 | festival-sweets:24, milk-dessert:7, festival-meal:4, ladoo:3 | very broad |
| Celebrations & Traditions | Regional Sweets | 2 | 0 | 0 | 0 | 2 | 0 | milk-sweet:1, sweet flatbread:1 | thin |
| Celebrations & Traditions | Everyday Desserts | 1 | 0 | 0 | 0 | 1 | 0 | festival-sweets:1 | thin |
| Celebrations & Traditions | Prasadam & Temple Foods | 1 | 0 | 0 | 0 | 1 | 0 | whole wheat:1 | thin |

## 6. Image Health

- Total image files under frontend/assets/images: 407
- Total unique image paths used by recipes: 274
- Dedicated image recipes: 197
- Shared image recipes: 230
- Placeholder image recipes: 231
- Broken image paths: 0
- Missing imageUrl: 0

### Excessive reuse hotspots

| Image path | Recipe count |
| --- | --- |
| /assets/images/dishes/homestyle-kitchen-placeholder.png | 105 |
| /assets/images/collections/soups.webp | 37 |
| /assets/images/collections/desserts.webp | 35 |
| /assets/images/collections/festival-food.webp | 22 |
| /assets/images/dishes/dosa-homestyle.png | 15 |
| /assets/images/dishes/fish-curry.png | 14 |
| /assets/images/dishes/recommendation-pack-pepper-rasam.png | 12 |
| /assets/images/dishes/lunch-default.png | 11 |
| /assets/images/dishes/chicken-curry.png | 9 |
| /assets/images/dishes/paratha.png | 9 |
| /assets/images/snacks/sandwich.png | 8 |
| /assets/images/dishes/pulao.png | 7 |
| /assets/images/dishes/mutton-pulao-homestyle.png | 6 |
| /assets/images/dishes/recommendation-pack-egg-sandwich.png | 6 |
| /assets/images/dishes/dinner-default.png | 5 |
| /assets/images/dishes/batch3a-baingan-bharta.png | 5 |
| /assets/images/dishes/batch5-corn-sundal.png | 5 |
| /assets/images/dishes/bread-omelette-homestyle.png | 5 |
| /assets/images/dishes/recommendation-pack-aloo-jeera.png | 4 |
| /assets/images/dishes/batch3a-chilli-chicken.png | 4 |

### Top 30 highest-priority image replacements

| Rank | Recipe | Slug | Current image | Type | Score | Collection/Journey |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Aloo Potol Posto | aloo-potol-posto | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / Bengal; Bengal |
| 2 | Andhra Egg Fry | andhra-egg-fry | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / Andhra & Telangana; Andhra & Telangana |
| 3 | Appam | appam | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / Kerala; Kerala |
| 4 | Apple Puree | apple-puree | /assets/images/dishes/dinner-default.png | placeholder | 113 | Family Favorites / Tiny Tummy Favorites; Global |
| 5 | Arepas | arepas | /assets/images/snacks/snacks-default.png | placeholder | 113 | Global Bites / Global Street Food; Global |
| 6 | Bai | bai | /assets/images/dishes/soup-bowls.png | placeholder | 113 | Regional Journeys / Northeast; Northeast |
| 7 | Basanti Pulao | basanti-pulao | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Celebrations & Traditions / Festival Sweets; Bengal |
| 8 | Batata Vada | batata-vada | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / Maharashtra; Maharashtra |
| 9 | Bibimbap Bowl | bibimbap-bowl | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Global Bites / Global Bowls; Global |
| 10 | Bread Pakora | bread-pakora | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / North & West India; North India |
| 11 | Broccoli Cheddar Soup | broccoli-cheddar-soup | /assets/images/collections/soups.webp | placeholder | 113 | Global Bites / Global Soups; Global |
| 12 | Butter Chicken | butter-chicken | /assets/images/dishes/lunch-default.png | placeholder | 113 | Regional Journeys / North & West India; North India |
| 13 | Chaat | chaat | /assets/images/dishes/dinner-default.png | placeholder | 113 | Everyday Cooking / Tea Time Favourites; North India |
| 14 | Chakli | chakli | /assets/images/collections/festival-food.webp | placeholder | 113 | Celebrations & Traditions / Festival Sweets; Maharashtra |
| 15 | Chamthong | chamthong | /assets/images/dishes/soup-bowls.png | placeholder | 113 | Regional Journeys / Northeast; Northeast |
| 16 | Chhanar Dalna | chhanar-dalna | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Celebrations & Traditions / Festival Sweets; Bengal |
| 17 | Chhurpi Soup | chhurpi-soup | /assets/images/dishes/soup-bowls.png | placeholder | 113 | Regional Journeys / Northeast; Northeast |
| 18 | Chicken Biryani | chicken-biryani | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Celebrations & Traditions / Festival Sweets; Andhra & Telangana |
| 19 | Chicken Egg Rice Bowl | chicken-egg-rice-bowl | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Global Bites / Global Bowls; Global |
| 20 | Cholar Dal | cholar-dal | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Celebrations & Traditions / Festival Sweets; Bengal |
| 21 | Chow Chow Bath | chow-chow-bath | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / Karnataka; Karnataka |
| 22 | Congress Kadlekai | congress-kadlekai | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Everyday Cooking / Tea Time Favourites; Karnataka |
| 23 | Coorg Pandi Curry | coorg-pandi-curry | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Celebrations & Traditions / Festival Sweets; Karnataka |
| 24 | Corn Paneer Bhurji Bowl | corn-paneer-bhurji-bowl | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / North & West India; North India |
| 25 | Corn Soup | corn-soup | /assets/images/collections/soups.webp | placeholder | 113 | Global Bites / Global Soups; Global |
| 26 | Dal Roti | dal-roti | /assets/images/dishes/lunch-default.png | placeholder | 113 | Regional Journeys / North & West India; North India |
| 27 | Davangere Benne Dosa | davangere-benne-dosa | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / Karnataka; Karnataka |
| 28 | Dohneiiong | dohneiiong | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Regional Journeys / Northeast; Northeast |
| 29 | Edamame | edamame | /assets/images/salads/salad-default.png | placeholder | 113 | Global Bites / Global Snacks; Global |
| 30 | Falafel Hummus Bowl | falafel-hummus-bowl | /assets/images/dishes/homestyle-kitchen-placeholder.png | placeholder | 113 | Global Bites / Global Bowls; Global |

## 7. Recipe Completeness

| Completeness area | Count |
| --- | --- |
| Missing quick guides | 0 |
| Missing pairings | 41 |
| Missing ingredients | 0 |
| Missing mealTags | 3 |
| Missing moodTags | 0 |
| Missing regionTags/cuisine | 0 |
| Missing dietary tags/type | 0 |
| Duplicate IDs | 0 |
| Duplicate sourceIds | 0 |
| Duplicate title keys | 0 |
| Duplicate slugs | 0 |

## 8. Recommendation Readiness

| Surface | Ready count / risk count | Audit note |
| --- | --- | --- |
| Tomo Pick eligibility | 655 | Broadly ready, but image quality is the biggest primary-surface risk. |
| Today's Picks eligibility | 574 | Role-aware selection has enough candidates; watch placeholder-heavy major cards. |
| Pantry eligibility | 658 | Ingredient coverage is strong for most active recipes. |
| Mood recommendation eligibility | 658 | Mood tag coverage is strong; quality depends on role/diet filtering. |
| Regional Journey eligibility | 467 | Regional coverage logic correctly expands beyond collectionHome. |
| Global Bites isolation risks | 0 | Review Global recipes that also match regional aliases. |
| Regional-to-Global text risks | 12 | Mostly harmless unless future global filters become keyword-based. |
| Dietary filtering safety | 515 vegetarian / 3 eggitarian / 140 non-veg | Catalog has normalized diet groups available for mobile filtering. |
| Placeholder-heavy exposure risk | 461 | Prioritize image replacement for visible journey and recommendation candidates. |

## 9. Add / Exclude / Review List

### ADD

- Global Bites: African, Latin American and Southeast Asian coverage beyond current Wave A/B comfort set.
- North India / North & West India: more Delhi, Punjabi, Rajasthani and Kashmiri anchors.
- Karnataka: remaining desserts, drinks and a few North Karnataka festival foods.
- Regional drinks: Kerala, Bengal, Maharashtra and Northeast are still comparatively thin.
- Everyday vegetarian sides with dedicated images for high-visibility journeys.
- More collection-card-safe soups and light bowls with dedicated imagery.
- Tiny Tummy / family lunchbox breadth if Beta 3 wants stronger family positioning.
- More pantry-first “few ingredient” dishes with clean required ingredient metadata.

### EXCLUDE

- No immediate mandatory excludes found from automated checks.

### REVIEW

- Aloo Potol Posto: placeholder image on visible surfaces (/assets/images/dishes/homestyle-kitchen-placeholder.png)
- Andhra Egg Fry: placeholder image on visible surfaces (/assets/images/dishes/homestyle-kitchen-placeholder.png)
- Appam: placeholder image on visible surfaces (/assets/images/dishes/homestyle-kitchen-placeholder.png)
- Apple Puree: placeholder image on visible surfaces (/assets/images/dishes/dinner-default.png)
- Arepas: placeholder image on visible surfaces (/assets/images/snacks/snacks-default.png)
- Bai: placeholder image on visible surfaces (/assets/images/dishes/soup-bowls.png)
- Basanti Pulao: placeholder image on visible surfaces (/assets/images/dishes/homestyle-kitchen-placeholder.png)
- Batata Vada: placeholder image on visible surfaces (/assets/images/dishes/homestyle-kitchen-placeholder.png)
- Bibimbap Bowl: placeholder image on visible surfaces (/assets/images/dishes/homestyle-kitchen-placeholder.png)
- Bread Pakora: placeholder image on visible surfaces (/assets/images/dishes/homestyle-kitchen-placeholder.png)
- Broccoli Cheddar Soup: placeholder image on visible surfaces (/assets/images/collections/soups.webp)
- Butter Chicken: placeholder image on visible surfaces (/assets/images/dishes/lunch-default.png)
- Chaat: placeholder image on visible surfaces (/assets/images/dishes/dinner-default.png)
- Chakli: placeholder image on visible surfaces (/assets/images/collections/festival-food.webp)
- Chamthong: placeholder image on visible surfaces (/assets/images/dishes/soup-bowls.png)

## 10. Beta 3 Readiness Score

| Dimension | Score |
| --- | --- |
| Recipe completeness | 93/100 |
| Image quality | 46/100 |
| Regional coverage | 100/100 |
| Collection quality | 40/100 |
| Recommendation readiness | 60/100 |
| Pantry readiness | 100/100 |
| User-facing polish | 49/100 |
| Overall | 70/100 |

## Source-of-truth recommendation

Use `database/generated/recipes.json` as the audited backend catalog, `frontend/local-recipes.js` as the deployable mobile mirror, and generated `collectionHome` plus Regional Journey coverage rules for browse counts. For Beta 3 freeze, the safest next work is image replacement and duplicate/metadata review, not more broad recipe expansion.

## Files inspected

- database/generated/recipes.json
- frontend/local-recipes.js
- frontend/local-collections.js
- frontend/mobile/mobile-shell.js
- frontend/assets/images/**
- scripts/validate_recipe_data.js
- scripts/generate_collection_home.js
