# Recipe Role Audit

Generated: 2026-06-22T12:15:53.270Z

Source: `database/generated/recipes.json`

## Summary counts

| Role | Count |
|---|---:|
| main | 201 |
| side | 93 |
| condiment | 9 |
| snack | 61 |
| drink | 34 |
| dessert | 51 |
| **Total** | **449** |

## Confidence counts

| Confidence | Count |
|---|---:|
| high | 188 |
| medium | 219 |
| low | 42 |

Ambiguous recipes flagged: **56**

## Ambiguous recipes

| Recipe | Recommended role | Confidence | Why review | Evidence |
|---|---|---:|---|---|
| Beetroot Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Bele Saaru | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Bottle Gourd Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Broccoli Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Cabbage Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Carrot Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Chicken Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Corn Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Drumstick Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Garlic Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Hot and Sour Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Kollu Rasam | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Lemon Coriander Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Lentil Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Manchow Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Manipuri Chamthong | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Millet Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Mixed Veg Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Moong Dal Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Mushroom Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Mysore Rasam | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Naga Galho | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Noodle Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Oats Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Paneer Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Peas Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Pepper Rasam | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Pumpkin Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Spinach Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Sweet Corn Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Thukpa | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Tomato Rasam | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Tomato Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Vegetable Soup | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Vegetable Stew | side | 0.72 | taxonomy gap: no soup role | soup/rasam treated as side because allowed roles do not include soup |
| Cheese Veg Sandwich | main | 0.74 | snack and main-meal signals conflict | lunch/dinner context beats snack signal |
| Egg Roll | main | 0.74 | snack and main-meal signals conflict | lunch/dinner context beats snack signal |
| Egg Sandwich | main | 0.74 | snack and main-meal signals conflict | lunch/dinner context beats snack signal |
| Ghugni | main | 0.74 | snack and main-meal signals conflict | lunch/dinner context beats snack signal |
| Matki Usal | main | 0.74 | snack and main-meal signals conflict | lunch/dinner context beats snack signal |
| Paneer Roll | main | 0.74 | snack and main-meal signals conflict | lunch/dinner context beats snack signal |
| Sprouts Usal | main | 0.74 | snack and main-meal signals conflict | lunch/dinner context beats snack signal |
| Veg Manchurian | snack | 0.78 | snack and main-meal signals conflict | title-specific: starter/snack despite meal contexts; lunch/dinner context beats snack signal |
| Avocado Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Beetroot Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Carrot Puree | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Dal Rice Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Dalia Porridge | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Egg Yolk Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Pear Puree | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Pumpkin Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Soft Chapati Milk Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | title-specific: baby mash is food, not drink; baby-food defaults to main meal role |
| Soft Idli Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Suji Porridge | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Sweet Potato Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |
| Vegetable Dal Mash | main | 0.82 | baby puree/mash could be snack-like depending UX | baby-food defaults to main meal role |

## Recommended mapping list

| # | Recipe | Source ID | Role | Confidence | Level | Dish family | Meal tags | Key evidence |
|---:|---|---|---|---:|---|---|---|---|
| 1 | Aam Panna | sips-detail-aam-panna | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 2 | Ajwain Water | sips-detail-ajwain-water | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 3 | Akki Roti | expansion-pack-2-akki-roti | main | 0.86 | medium | paratha | breakfast, dinner | main meal family/tag/mealTag signal |
| 4 | Aloo Capsicum Sabzi | pantry-aloo-capsicum-sabzi | side | 0.86 | medium | potato sabzi | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 5 | Aloo Jeera | expansion-pack-2-aloo-jeera | side | 0.86 | medium | potato sabzi | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 6 | Aloo Paratha | aloo-paratha-breakfast | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 7 | Aloo Pitika | expansion-pack-3-aloo-pitika | side | 0.86 | medium | mash | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 8 | Aloo Posto | expansion-pack-3-aloo-posto | side | 0.86 | medium | potato sabzi | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 9 | Aloo Rice | pantry-aloo-rice | main | 0.86 | medium | rice | lunch, dinner | main meal family/tag/mealTag signal |
| 10 | Andhra Chicken Curry | andhra-chicken-curry | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 11 | Andhra Egg Fry | andhra-egg-fry | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 12 | Andhra Kodi Vepudu | andhra-kodi-vepudu | main | 0.86 | medium | meat-curry |  | main meal family/tag/mealTag signal |
| 13 | Andhra Podi Idli | andhra-podi-idli | main | 0.90 | high | idli |  | title-specific: podi idli is an idli dish, not condiment; main meal family/tag/mealTag signal |
| 14 | Appam | expansion-pack-2-appam | main | 0.86 | medium | appam | breakfast, dinner | main meal family/tag/mealTag signal |
| 15 | Apple Puree | apple-puree-snack | snack | 0.88 | high | apple |  | snack-style dish signal |
| 16 | Apple Walnut Salad | fresh-plates-detail-apple-walnut-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 17 | Assamese Duck Curry | expansion-pack-4-assamese-duck-curry | main | 0.86 | medium | meat-curry | lunch, dinner | main meal family/tag/mealTag signal |
| 18 | Avalakki | avalakki-breakfast | main | 0.86 | medium | poha |  | main meal family/tag/mealTag signal |
| 19 | Avial | expansion-pack-3-avial | side | 0.86 | medium | mixed vegetable | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 20 | Avocado Mash | tiny-tummy-detail-avocado-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 21 | Avocado Salad | fresh-plates-detail-avocado-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 22 | Baby Pongal | tiny-tummy-detail-baby-pongal | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 23 | Badam Milk | sips-detail-badam-milk | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 24 | Baingan Bharta | expansion-pack-4-baingan-bharta | side | 0.86 | medium | vegetable mash | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 25 | Bamboo Shoot Pork | expansion-pack-3-bamboo-shoot-pork | main | 0.86 | medium | meat-curry | lunch, dinner | main meal family/tag/mealTag signal |
| 26 | Banana Pancake | lunchbox-detail-banana-pancake | snack | 0.88 | high | pancake | breakfast, snack | snack-style dish signal |
| 27 | Banana Shake | sips-detail-banana-shake | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 28 | Basundi | collection-detail-basundi | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 29 | Batata Poha | approved-batata-poha | main | 0.86 | medium | poha |  | main meal family/tag/mealTag signal |
| 30 | Beans Poriyal | balance-tier-1-beans-poriyal | side | 0.86 | medium | poriyal | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 31 | Beans Thoran | expansion-pack-3-beans-thoran | side | 0.86 | medium | thoran | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 32 | Beetroot Mash | tiny-tummy-detail-beetroot-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 33 | Beetroot Palya | side-addon-beetroot-palya | side | 0.86 | medium | palya | lunch, dinner, snack | sabzi/bhaji/thoran/poriyal/side family signal |
| 34 | Beetroot Salad | fresh-plates-detail-beetroot-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 35 | Beetroot Soup | warm-bowls-detail-beetroot-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 36 | Begun Bhaja | expansion-pack-3-begun-bhaja | side | 0.86 | medium | vegetable fry | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 37 | Bele Saaru | balance-tier-1-bele-saaru | side | 0.72 | low | saaru | lunch, dinner | soup/rasam treated as side because allowed roles do not include soup |
| 38 | Besan Chilla | besan-chilla-breakfast | main | 0.90 | high | besan |  | title-specific: chilla is a breakfast main; main meal family/tag/mealTag signal |
| 39 | Besan Ladoo | collection-detail-besan-ladoo | dessert | 0.93 | high | ladoo | dessert, snack | dessert/sweet/festival-sweet signal |
| 40 | Bisibelebath | bisibelebath-lunch | main | 0.86 | medium | rice dal |  | main meal family/tag/mealTag signal |
| 41 | Boiled Corn | boiled-corn-snack | snack | 0.88 | high | chaat |  | snack-style dish signal |
| 42 | Bonda | bonda-snack | snack | 0.88 | high | potato |  | snack-style dish signal |
| 43 | Boondi Raita | side-addon-boondi-raita | condiment | 0.94 | high | raita | lunch, dinner, snack | explicit chutney/raita/pachadi condiment signal |
| 44 | Bottle Gourd Soup | warm-bowls-detail-bottle-gourd-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 45 | Bread Omelette | bread-omelette-breakfast | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 46 | Bread Pakora | bread-pakora-snack | snack | 0.88 | high | bread |  | snack-style dish signal |
| 47 | Bread Upma | bread-upma | main | 0.86 | medium | upma |  | main meal family/tag/mealTag signal |
| 48 | Broccoli Salad | fresh-plates-detail-broccoli-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 49 | Broccoli Soup | warm-bowls-detail-broccoli-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 50 | Butter Chicken | butter-chicken-lunch | main | 0.86 | medium | meat-curry |  | main meal family/tag/mealTag signal |
| 51 | Buttermilk | balance-sprint-2-buttermilk | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 52 | Cabbage Salad | fresh-plates-detail-cabbage-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 53 | Cabbage Soup | warm-bowls-detail-cabbage-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 54 | Cabbage Thoran | balance-tier-1-cabbage-thoran | side | 0.86 | medium | thoran | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 55 | Carrot Beet Juice | sips-detail-carrot-beet-juice | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 56 | Carrot Cucumber Salad | fresh-plates-detail-carrot-cucumber-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 57 | Carrot Halwa | collection-detail-carrot-halwa | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 58 | Carrot Puree | tiny-tummy-detail-carrot-puree | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 59 | Carrot Soup | warm-bowls-detail-carrot-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 60 | Chaat | chaat-snack | snack | 0.88 | high | chaat |  | snack-style dish signal |
| 61 | Chakli | collection-detail-chakli | snack | 0.88 | high | festival-sweets | dessert, snack | festival-snack tag |
| 62 | Chana Chaat | fresh-plates-detail-chana-chaat | side | 0.92 | high | chaat | salad, snack, side | salad/fresh-plates treated as side |
| 63 | Chapati Jam Roll | lunchbox-detail-chapati-jam-roll | snack | 0.88 | high | sweet roll | snack | snack-style dish signal |
| 64 | Cheese Dosa | approved-cheese-dosa | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 65 | Cheese Omelette | pantry-cheese-omelette | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 66 | Cheese Paratha | approved-cheese-paratha | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 67 | Cheese Uttapam | approved-cheese-uttapam | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 68 | Cheese Veg Sandwich | lunchbox-detail-cheese-veg-sandwich | main | 0.74 | low | sandwich | snack, lunch | lunch/dinner context beats snack signal |
| 69 | Chicken 555 | chicken-555 | snack | 0.88 | high | meat-curry |  | snack-style dish signal |
| 70 | Chicken 65 | chicken-65 | snack | 0.88 | high | meat-curry |  | snack-style dish signal |
| 71 | Chicken Biryani | collection-detail-chicken-biryani | main | 0.88 | high | festival-meal | lunch, dinner | festival-meal tag |
| 72 | Chicken Capsicum Stir Fry Bowl | expansion-pack-1-chicken-capsicum-stir-fry-bowl | main | 0.86 | medium | chicken-curry | dinner | main meal family/tag/mealTag signal |
| 73 | Chicken Chettinad | chicken-chettinad | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 74 | Chicken Curry | chicken-curry-dinner | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 75 | Chicken Egg Rice Bowl | expansion-pack-1-chicken-egg-rice-bowl | main | 0.86 | medium | rice | dinner | main meal family/tag/mealTag signal |
| 76 | Chicken Fried Rice | pantry-chicken-fried-rice | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 77 | Chicken Majestic | chicken-majestic | snack | 0.88 | high | meat-curry |  | snack-style dish signal |
| 78 | Chicken Mushroom Stir Fry | approved-chicken-mushroom-stir-fry | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 79 | Chicken Pepper Rice Bowl | expansion-pack-1-chicken-pepper-rice-bowl | main | 0.86 | medium | rice | dinner | main meal family/tag/mealTag signal |
| 80 | Chicken Potato Curry | approved-chicken-potato-curry | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 81 | Chicken Pulao | chicken-pulao-dinner | main | 0.86 | medium | pulao |  | main meal family/tag/mealTag signal |
| 82 | Chicken Rice | chicken-rice-dinner | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 83 | Chicken Roll | chicken-roll-snack | snack | 0.88 | high | meat-curry |  | snack-style dish signal |
| 84 | Chicken Soup | warm-bowls-detail-chicken-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 85 | Chicken Stew | chicken-stew-lunch | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 86 | Chicken Sukka | chicken-sukka | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 87 | Chicken Tomato Rice | expansion-pack-1-chicken-tomato-rice | main | 0.86 | medium | rice | dinner | main meal family/tag/mealTag signal |
| 88 | Chilli Chicken | pantry-chilli-chicken | main | 0.86 | medium | meat-curry |  | main meal family/tag/mealTag signal |
| 89 | Chilli Mushroom | chilli-mushroom | snack | 0.86 | medium | mushroom |  | title-specific: Indo-Chinese starter/snack; sabzi/bhaji/thoran/poriyal/side family signal |
| 90 | Chilli Paneer | chilli-paneer | snack | 0.88 | high | paneer-curry |  | snack-style dish signal |
| 91 | Chingri Malai Curry | expansion-pack-3-chingri-malai-curry | main | 0.86 | medium | fish-curry | lunch, dinner | main meal family/tag/mealTag signal |
| 92 | Chingudi Chhecha | expansion-pack-4-chingudi-chhecha | side | 0.86 | medium | fish-curry | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 93 | Chirer Pulao | balance-sprint-2-chirer-pulao | snack | 0.88 | high | poha | breakfast, snack | snack-style dish signal |
| 94 | Chocolate Burfi | collection-detail-chocolate-burfi | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 95 | Chole Chawal | chole-chawal-lunch | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 96 | Chow Chow Kootu | balance-tier-1-chow-chow-kootu | side | 0.86 | medium | kootu | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 97 | Coconut Barfi | collection-detail-coconut-barfi | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 98 | Coconut Chutney | side-addon-coconut-chutney | condiment | 0.94 | high | chutney | lunch, dinner, snack | explicit chutney/raita/pachadi condiment signal |
| 99 | Coconut Cucumber Salad | fresh-plates-detail-coconut-cucumber-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 100 | Coconut Macaroons | collection-detail-coconut-macaroons | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 101 | Coconut Rice | coconut-rice | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 102 | Corn Chaat | corn-chaat | side | 0.92 | high | chaat | salad, snack, side | salad/fresh-plates treated as side |
| 103 | Corn Paneer Bhurji Bowl | expansion-pack-1-corn-paneer-bhurji-bowl | main | 0.86 | medium | paneer-curry | dinner | main meal family/tag/mealTag signal |
| 104 | Corn Soup | corn-soup-snack | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 105 | Corn Sundal | balance-sprint-2-corn-sundal | snack | 0.88 | high | sundal | snack | snack-style dish signal |
| 106 | Cucumber Raita | side-addon-cucumber-raita | condiment | 0.94 | high | raita | lunch, dinner, snack | explicit chutney/raita/pachadi condiment signal |
| 107 | Cucumber Raita Salad | fresh-plates-detail-cucumber-raita-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 108 | Curd Rice | curd-rice-lunch | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 109 | Dal Makhani | dal-makhani | main | 0.86 | medium | black urad dal |  | main meal family/tag/mealTag signal |
| 110 | Dal Rice | dal-rice-lunch | main | 0.86 | medium | rice dal |  | main meal family/tag/mealTag signal |
| 111 | Dal Rice Mash | tiny-tummy-detail-dal-rice-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 112 | Dal Roti | dal-roti-lunch | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 113 | Dalia Porridge | tiny-tummy-detail-dalia-porridge | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 114 | Dalma | expansion-pack-4-dalma | side | 0.86 | medium | dal vegetable | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 115 | Dates Milkshake | sips-detail-dates-milkshake | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 116 | Dhokar Dalna | expansion-pack-3-dhokar-dalna | main | 0.86 | medium | dal curry | lunch, dinner | main meal family/tag/mealTag signal |
| 117 | Dhokla | expansion-pack-4-dhokla | snack | 0.88 | high | steamed snack | breakfast, snack | snack-style dish signal |
| 118 | Dosa | dosa-breakfast | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 119 | Dosa Roll | lunchbox-detail-dosa-roll | snack | 0.88 | high | dosa roll | breakfast, snack | snack-style dish signal |
| 120 | Dosakaya Pappu | balance-tier-1-dosakaya-pappu | side | 0.86 | medium | pappu | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 121 | Dragon Chicken | dragon-chicken | snack | 0.88 | high | meat-curry |  | snack-style dish signal |
| 122 | Drumstick Soup | warm-bowls-detail-drumstick-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 123 | Dry Fruit Ladoo | collection-detail-dry-fruit-ladoo | dessert | 0.93 | high | ladoo | dessert, snack | dessert/sweet/festival-sweet signal |
| 124 | Egg Bhurji | egg-bhurji-dinner | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 125 | Egg Capsicum Bhurji | expansion-pack-1-egg-capsicum-bhurji | main | 0.86 | medium | egg | dinner | main meal family/tag/mealTag signal |
| 126 | Egg Curry | egg-curry | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 127 | Egg Curry Rice | egg-curry-rice-lunch | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 128 | Egg Dosa | pantry-egg-dosa | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 129 | Egg Fried Rice | egg-fried-rice-breakfast | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 130 | Egg Paratha | pantry-egg-paratha | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 131 | Egg Roll | lunchbox-detail-egg-roll | main | 0.74 | low | roll | lunch, snack | lunch/dinner context beats snack signal |
| 132 | Egg Sandwich | lunchbox-egg-sandwich | main | 0.74 | low | sandwich | breakfast, snack, lunch | lunch/dinner context beats snack signal |
| 133 | Egg Toast | egg-toast | snack | 0.88 | high | egg |  | snack-style dish signal |
| 134 | Egg Tomato Rice Bowl | expansion-pack-1-egg-tomato-rice-bowl | main | 0.86 | medium | rice | dinner | main meal family/tag/mealTag signal |
| 135 | Egg Yolk Mash | tiny-tummy-detail-egg-yolk-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 136 | Elaichi Chai | sips-detail-elaichi-chai | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 137 | Ellu Bella | collection-detail-ellu-bella | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 138 | Eromba | balance-sprint-2-eromba | side | 0.86 | medium | vegetable mash | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 139 | Falooda | collection-detail-falooda | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 140 | Filter Coffee | sips-detail-filter-coffee | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 141 | Fish Curry | fish-curry-dinner | main | 0.86 | medium | fish-curry |  | main meal family/tag/mealTag signal |
| 142 | Fish Curry Rice | fish-curry-rice-lunch | main | 0.86 | medium | fish-curry |  | main meal family/tag/mealTag signal |
| 143 | Fish Fry | fish-fry-dinner | main | 0.86 | medium | fish-curry |  | main meal family/tag/mealTag signal |
| 144 | Fish Pakora | fish-pakora-snack | snack | 0.88 | high | fish curry |  | snack-style dish signal |
| 145 | Fruit Chaat | fresh-plates-detail-fruit-chaat | side | 0.92 | high | chaat | salad, snack, side | salad/fresh-plates treated as side |
| 146 | Garlic Chicken | pantry-garlic-chicken | main | 0.86 | medium | meat-curry |  | main meal family/tag/mealTag signal |
| 147 | Garlic Egg Rice | expansion-pack-1-garlic-egg-rice | main | 0.86 | medium | egg | dinner | main meal family/tag/mealTag signal |
| 148 | Garlic Paneer Roti Wrap | expansion-pack-1-garlic-paneer-roti-wrap | main | 0.86 | medium | paratha | dinner | main meal family/tag/mealTag signal |
| 149 | Garlic Soup | warm-bowls-detail-garlic-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 150 | Ghee Rice | expansion-pack-2-ghee-rice | main | 0.86 | medium | rice | lunch, dinner | main meal family/tag/mealTag signal |
| 151 | Ghugni | expansion-pack-3-ghugni | main | 0.74 | low | chaat | snack, dinner | lunch/dinner context beats snack signal |
| 152 | Ginger Chai | sips-detail-ginger-chai | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 153 | Goan Fish Curry | expansion-pack-4-goan-fish-curry | main | 0.86 | medium | fish-curry | lunch, dinner | main meal family/tag/mealTag signal |
| 154 | Goan Prawn Balchao | expansion-pack-4-goan-prawn-balchao | main | 0.86 | medium | fish-curry | dinner, lunch | main meal family/tag/mealTag signal |
| 155 | Gongura Mutton | gongura-mutton | main | 0.86 | medium | mutton-curry |  | main meal family/tag/mealTag signal |
| 156 | Green Gram Salad | fresh-plates-detail-green-gram-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 157 | Green Moong Drink | sips-detail-green-moong-drink | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 158 | Gujarati Dal | balance-tier-1-gujarati-dal | main | 0.86 | medium | dal | lunch, dinner | main meal family/tag/mealTag signal |
| 159 | Gujiya | gujiya-festival | dessert | 0.93 | high | maida |  | dessert/sweet/festival-sweet signal |
| 160 | Gulab Jamun | collection-detail-gulab-jamun | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 161 | Gunpowder Idli | gunpowder-idli | main | 0.86 | medium | idli |  | main meal family/tag/mealTag signal |
| 162 | Guntur Chicken Fry | guntur-chicken-fry | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 163 | Guntur Chilli Chicken | guntur-chilli-chicken | main | 0.86 | medium | meat-curry |  | main meal family/tag/mealTag signal |
| 164 | Haleem | collection-detail-haleem | main | 0.88 | high | festival-meal | lunch, snack | festival-meal tag |
| 165 | Handvo | expansion-pack-4-handvo | main | 0.86 | medium | lentil cake | breakfast, dinner | main meal family/tag/mealTag signal |
| 166 | Holige | collection-detail-holige | dessert | 0.93 | high | sweet-flatbread | dessert, snack | dessert/sweet/festival-sweet signal |
| 167 | Hot and Sour Soup | warm-bowls-detail-hot-and-sour-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 168 | Idli | idli-breakfast | main | 0.86 | medium | idli |  | main meal family/tag/mealTag signal |
| 169 | Jadoh | expansion-pack-3-jadoh | main | 0.86 | medium | pulao | lunch, dinner | main meal family/tag/mealTag signal |
| 170 | Jal Jeera | balance-sprint-2-jal-jeera | drink | 0.95 | high | drink side | snack | title-specific: Jal Jeera is drink; explicit drink family/tag/asset/name |
| 171 | Jalebi | collection-detail-jalebi | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 172 | Jeera Water | sips-detail-jeera-water | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 173 | Kaaram Dosa | kaaram-dosa | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 174 | Kachori | kachori-snack | snack | 0.88 | high | maida |  | snack-style dish signal |
| 175 | Kachumber Salad | fresh-plates-detail-kachumber-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 176 | Kada Prasad | kada-prasad-festival | dessert | 0.93 | high | whole wheat |  | dessert/sweet/festival-sweet signal |
| 177 | Kadai Paneer | pantry-kadai-paneer | main | 0.86 | medium | paneer-curry |  | main meal family/tag/mealTag signal |
| 178 | Kadala Curry | expansion-pack-3-kadala-curry | main | 0.86 | medium | chana curry | breakfast, dinner | main meal family/tag/mealTag signal |
| 179 | Kadhi Chawal | kadhi-chawal-lunch | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 180 | Kadhi Pakora | expansion-pack-4-kadhi-pakora | side | 0.86 | medium | kadhi | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 181 | Kadubu | collection-detail-kadubu | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 182 | Kaju Katli | collection-detail-kaju-katli | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 183 | Kalakand | collection-detail-kalakand | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 184 | Kalkals | collection-detail-kalkals | snack | 0.88 | high | festival-sweets | dessert, snack | festival-snack tag |
| 185 | Kashaya | sips-detail-kashaya | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 186 | Keema Fry | keema-fry | main | 0.86 | medium | mutton-curry |  | main meal family/tag/mealTag signal |
| 187 | Kerala Egg Roast | expansion-pack-3-kerala-egg-roast | main | 0.86 | medium | egg | breakfast, dinner | main meal family/tag/mealTag signal |
| 188 | Kerala Fish Curry | kerala-fish-curry | main | 0.86 | medium | fish-curry |  | main meal family/tag/mealTag signal |
| 189 | Khandvi | balance-tier-1-khandvi | snack | 0.88 | high | steamed snack | snack | snack-style dish signal |
| 190 | Kheema Pav | kheema-pav | snack | 0.88 | high | mutton-curry |  | snack-style dish signal |
| 191 | Kheer | collection-detail-kheer | dessert | 0.93 | high | milk-dessert | dessert, snack | dessert/sweet/festival-sweet signal |
| 192 | Khichdi | khichdi | main | 0.86 | medium | rice dal |  | main meal family/tag/mealTag signal |
| 193 | Kodubale | balance-sprint-2-kodubale | snack | 0.88 | high | crisp snack | snack | snack-style dish signal |
| 194 | Kokum Sharbat | balance-sprint-2-kokum-sharbat | drink | 0.95 | high | drink side | snack | title-specific: sharbat is drink; explicit drink family/tag/asset/name |
| 195 | Kolhapuri Chicken | kolhapuri-chicken | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 196 | Kolhapuri Misal Pav | kolhapuri-misal-pav | snack | 0.88 | high | matki |  | snack-style dish signal |
| 197 | Kollu Rasam | warm-bowls-detail-kollu-rasam | side | 0.72 | low | rasam | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 198 | Kori Rotti | expansion-pack-4-kori-rotti | main | 0.86 | medium | meat-curry | dinner | main meal family/tag/mealTag signal |
| 199 | Kosambari | expansion-pack-2-kosambari | side | 0.86 | medium | chaat | snack, lunch | sabzi/bhaji/thoran/poriyal/side family signal |
| 200 | Kozhukattai | collection-detail-kozhukattai | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 201 | Kulfi | collection-detail-kulfi | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 202 | Kuzhi Paniyaram | balance-sprint-2-kuzhi-paniyaram | snack | 0.88 | high | steamed snack | breakfast, snack | snack-style dish signal |
| 203 | Laal Maas | laal-maas | main | 0.86 | medium | mutton-curry |  | main meal family/tag/mealTag signal |
| 204 | Ladoo | ladoo-festival | dessert | 0.93 | high | besan |  | dessert/sweet/festival-sweet signal |
| 205 | Lai Xaak Bhaji | expansion-pack-3-lai-xaak-bhaji | side | 0.86 | medium | greens stir fry | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 206 | Lemon Coriander Soup | warm-bowls-detail-lemon-coriander-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 207 | Lemon Honey Water | sips-detail-lemon-honey-water | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 208 | Lemon Rice | lemon-rice-lunch | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 209 | Lemon Sevai | lemon-sevai | main | 0.86 | medium | upma |  | main meal family/tag/mealTag signal |
| 210 | Lentil Salad | fresh-plates-detail-lentil-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 211 | Lentil Soup | warm-bowls-detail-lentil-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 212 | Litti Chokha | expansion-pack-3-litti-chokha | side | 0.86 | medium | paratha | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 213 | Luchi Aloor Dom | balance-sprint-2-luchi-aloor-dom | main | 0.86 | medium | fried bread curry | breakfast, lunch | main meal family/tag/mealTag signal |
| 214 | Macher Jhol | expansion-pack-4-macher-jhol | main | 0.86 | medium | fish-curry | lunch, dinner | main meal family/tag/mealTag signal |
| 215 | Maddur Vada | expansion-pack-2-maddur-vada | snack | 0.88 | high | vada | snack | snack-style dish signal |
| 216 | Madras Curry | madras-curry | main | 0.86 | medium | meat-curry |  | main meal family/tag/mealTag signal |
| 217 | Malpua | collection-detail-malpua | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 218 | Manchow Soup | warm-bowls-detail-manchow-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 219 | Mangalore Buns | expansion-pack-2-mangalore-buns | snack | 0.88 | high | buns | breakfast, snack | snack-style dish signal |
| 220 | Mango Lassi | sips-detail-mango-lassi | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 221 | Mango Rice | collection-detail-mango-rice | main | 0.88 | high | festival-meal | lunch, snack | festival-meal tag |
| 222 | Mango Salad | fresh-plates-detail-mango-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 223 | Manipuri Chamthong | expansion-pack-4-manipuri-chamthong | side | 0.72 | low | soup | lunch, dinner | soup/rasam treated as side because allowed roles do not include soup |
| 224 | Manipuri Eromba | expansion-pack-3-manipuri-eromba | side | 0.86 | medium | mash | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 225 | Marzipan | collection-detail-marzipan | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 226 | Masala Chaas | sips-detail-masala-chaas | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 227 | Masala Chai | masala-chai-snack | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 228 | Masala Corn | balance-sprint-2-masala-corn | snack | 0.88 | high | corn snack | snack | snack-style dish signal |
| 229 | Masala Dosa | pantry-masala-dosa | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 230 | Masala Makhana | lunchbox-detail-masala-makhana | snack | 0.88 | high | snack | snack | snack-style dish signal |
| 231 | Masala Omelette | pantry-masala-omelette | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 232 | Mashed Banana | mashed-banana-snack | snack | 0.88 | high | banana |  | snack-style dish signal |
| 233 | Masor Tenga | expansion-pack-3-masor-tenga | main | 0.86 | medium | fish-curry | lunch, dinner | main meal family/tag/mealTag signal |
| 234 | Matar Paneer | pantry-matar-paneer | main | 0.86 | medium | paneer-curry |  | main meal family/tag/mealTag signal |
| 235 | Mathri | mathri-snack | snack | 0.88 | high | wheat flour |  | snack-style dish signal |
| 236 | Matki Usal | expansion-pack-4-matki-usal | main | 0.74 | low | chaat | lunch, dinner | lunch/dinner context beats snack signal |
| 237 | Meen Pollichathu | expansion-pack-3-meen-pollichathu | main | 0.86 | medium | fish-curry | dinner | main meal family/tag/mealTag signal |
| 238 | Methi Paratha | methi-paratha-breakfast | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 239 | Methi Thepla | expansion-pack-2-methi-thepla | main | 0.86 | medium | paratha | breakfast, dinner | main meal family/tag/mealTag signal |
| 240 | Milk Toast | pantry-milk-toast | main | 0.86 | medium | bread | breakfast | title-specific: toast is breakfast main, not drink; snack-style dish signal |
| 241 | Millet Salad | fresh-plates-detail-millet-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 242 | Millet Soup | warm-bowls-detail-millet-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 243 | Mini Dhokla | lunchbox-detail-mini-dhokla | snack | 0.88 | high | dhokla | snack, breakfast | snack-style dish signal |
| 244 | Mini Idli | lunchbox-detail-mini-idli | snack | 0.88 | high | idli | breakfast, snack | snack-style dish signal |
| 245 | Mini Idli Sambar | tiny-tummy-detail-mini-idli-sambar | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 246 | Mini Uttapam | lunchbox-detail-mini-uttapam | snack | 0.88 | high | uttapam | breakfast, snack | snack-style dish signal |
| 247 | Mint Chutney | side-addon-mint-chutney | condiment | 0.94 | high | chutney | lunch, dinner, snack | explicit chutney/raita/pachadi condiment signal |
| 248 | Mint Raita | side-addon-mint-raita | condiment | 0.94 | high | raita | lunch, dinner, snack | explicit chutney/raita/pachadi condiment signal |
| 249 | Mirapakaya Bajji | mirapakaya-bajji | snack | 0.88 | high | green chilli |  | snack-style dish signal |
| 250 | Mirchi Bajji | mirchi-bajji | snack | 0.88 | high | green chilli |  | snack-style dish signal |
| 251 | Mirchi Ka Salan | mirchi-ka-salan | side | 0.86 | medium | green chilli |  | sabzi/bhaji/thoran/poriyal/side family signal |
| 252 | Mixed Veg Salad | fresh-plates-detail-mixed-veg-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 253 | Mixed Veg Soup | warm-bowls-detail-mixed-veg-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 254 | Mochar Ghonto | expansion-pack-4-mochar-ghonto | side | 0.86 | medium | vegetable curry | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 255 | Modak | modak-festival | dessert | 0.93 | high | modak | dessert, snack | dessert/sweet/festival-sweet signal |
| 256 | Momos | momos-breakfast | snack | 0.88 | high | wheat flour |  | snack-style dish signal |
| 257 | Mooli Paratha | approved-mooli-paratha | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 258 | Moong Dal Cheela | lunchbox-detail-moong-dal-cheela | snack | 0.88 | high | chilla | breakfast, snack | snack-style dish signal |
| 259 | Moong Dal Chilla | balance-sprint-2-moong-dal-chilla | main | 0.88 | high | chilla | breakfast, snack | title-specific: chilla is a breakfast main; snack-style dish signal |
| 260 | Moong Dal Halwa | collection-detail-moong-dal-halwa | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 261 | Moong Dal Soup | warm-bowls-detail-moong-dal-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 262 | Moong Dal Vegetable Khichdi | expansion-pack-1-moong-dal-vegetable-khichdi | main | 0.86 | medium | khichdi | dinner | main meal family/tag/mealTag signal |
| 263 | Moong Salad | fresh-plates-detail-moong-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 264 | Mor Kuzhambu | balance-tier-1-mor-kuzhambu | side | 0.86 | medium | kadhi | lunch | sabzi/bhaji/thoran/poriyal/side family signal |
| 265 | Motichoor Ladoo | collection-detail-motichoor-ladoo | dessert | 0.93 | high | ladoo | dessert, snack | dessert/sweet/festival-sweet signal |
| 266 | Mushroom Omelette | pantry-mushroom-omelette | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 267 | Mushroom Pepper Rice Bowl | expansion-pack-1-mushroom-pepper-rice-bowl | main | 0.86 | medium | rice | dinner | main meal family/tag/mealTag signal |
| 268 | Mushroom Pulao | approved-mushroom-pulao | main | 0.86 | medium | pulao |  | main meal family/tag/mealTag signal |
| 269 | Mushroom Soup | mushroom-soup-dinner | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 270 | Mutton Korma | collection-detail-mutton-korma | main | 0.88 | high | festival-meal | lunch, snack | festival-meal tag |
| 271 | Mutton Pulao | approved-mutton-pulao | main | 0.86 | medium | pulao |  | main meal family/tag/mealTag signal |
| 272 | Mysore Pak | collection-detail-mysore-pak | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 273 | Mysore Rasam | warm-bowls-detail-mysore-rasam | side | 0.72 | low | rasam | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 274 | Naga Galho | expansion-pack-4-naga-galho | side | 0.72 | low | soup | lunch, dinner | soup/rasam treated as side because allowed roles do not include soup |
| 275 | Nannari Sherbet | sips-detail-nannari-sherbet | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 276 | Nattu Kozhi Curry | nattu-kozhi-curry | main | 0.86 | medium | chicken-curry |  | main meal family/tag/mealTag signal |
| 277 | Neer Dosa | expansion-pack-2-neer-dosa | main | 0.86 | medium | dosa | breakfast, dinner | main meal family/tag/mealTag signal |
| 278 | Neer Mor | balance-sprint-2-neer-mor | drink | 0.96 | high | drink side | snack | explicit drink family/tag/asset/name |
| 279 | Nippattu | balance-sprint-2-nippattu | snack | 0.88 | high | crisp snack | snack | snack-style dish signal |
| 280 | Noodle Soup | warm-bowls-detail-noodle-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 281 | Oats Porridge | oats-porridge-dinner | main | 0.86 | medium | oats |  | main meal family/tag/mealTag signal |
| 282 | Oats Soup | warm-bowls-detail-oats-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 283 | Obbattu | collection-detail-obbattu | dessert | 0.93 | high | sweet-flatbread | dessert, snack | dessert/sweet/festival-sweet signal |
| 284 | Olan | collection-detail-olan | side | 0.80 | medium | festival-sweets | lunch, snack | title-specific: Olan is a Sadya side/stew; festival-meal tag |
| 285 | One Pot Dal Palak Rice | expansion-pack-1-one-pot-dal-palak-rice | main | 0.86 | medium | khichdi | dinner | main meal family/tag/mealTag signal |
| 286 | Onion Dosa | pantry-onion-dosa | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 287 | Onion Omelette | approved-onion-omelette | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 288 | Onion Paratha | pantry-onion-paratha | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 289 | Onion Raita | side-addon-onion-raita | condiment | 0.94 | high | raita | lunch, dinner, snack | explicit chutney/raita/pachadi condiment signal |
| 290 | Onion Rice | pantry-onion-rice | main | 0.86 | medium | rice meal |  | main meal family/tag/mealTag signal |
| 291 | Onion Tomato Salad | fresh-plates-detail-onion-tomato-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 292 | Onion Uttapam | pantry-onion-uttapam | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 293 | Pakhala Bhata | expansion-pack-4-pakhala-bhata | main | 0.86 | medium | rice | lunch | main meal family/tag/mealTag signal |
| 294 | Pakora | pakora-snack | snack | 0.88 | high | besan |  | snack-style dish signal |
| 295 | Palada Payasam | collection-detail-palada-payasam | dessert | 0.93 | high | milk-dessert | dessert, snack | dessert/sweet/festival-sweet signal |
| 296 | Palak Dal | balance-tier-1-palak-dal | main | 0.86 | medium | dal | lunch, dinner | main meal family/tag/mealTag signal |
| 297 | Palak Paneer | palak-paneer-lunch | main | 0.86 | medium | paneer-curry |  | main meal family/tag/mealTag signal |
| 298 | Palak Paratha | approved-palak-paratha | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 299 | Panakam | sips-detail-panakam | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 300 | Paneer Bhurji | paneer-bhurji-dinner | main | 0.86 | medium | paneer-curry |  | main meal family/tag/mealTag signal |
| 301 | Paneer Bhurji Wrap | lunchbox-detail-paneer-bhurji-wrap | main | 0.86 | medium | wrap | lunch, snack | main meal family/tag/mealTag signal |
| 302 | Paneer Capsicum Rice Bowl | expansion-pack-1-paneer-capsicum-rice-bowl | main | 0.86 | medium | rice | dinner | main meal family/tag/mealTag signal |
| 303 | Paneer Corn Rice Bowl | expansion-pack-1-paneer-corn-rice-bowl | main | 0.86 | medium | rice | dinner | main meal family/tag/mealTag signal |
| 304 | Paneer Dosa | pantry-paneer-dosa | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 305 | Paneer Fried Rice | pantry-paneer-fried-rice | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 306 | Paneer Mushroom Masala | approved-paneer-mushroom-masala | main | 0.86 | medium | paneer-curry |  | main meal family/tag/mealTag signal |
| 307 | Paneer Pakora | paneer-pakora-snack | snack | 0.88 | high | paneer curry |  | snack-style dish signal |
| 308 | Paneer Paratha | paneer-paratha-breakfast | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 309 | Paneer Pulao | pantry-paneer-pulao | main | 0.86 | medium | pulao |  | main meal family/tag/mealTag signal |
| 310 | Paneer Roll | lunchbox-detail-paneer-roll | main | 0.74 | low | roll | lunch, snack | lunch/dinner context beats snack signal |
| 311 | Paneer Salad | fresh-plates-detail-paneer-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 312 | Paneer Sandwich | paneer-sandwich | snack | 0.88 | high | bread |  | snack-style dish signal |
| 313 | Paneer Soup | warm-bowls-detail-paneer-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 314 | Paneer Tikka | paneer-tikka-snack | snack | 0.88 | high | paneer-curry |  | title-specific: tikka starter/snack; snack-style dish signal |
| 315 | Paneer Tikka Masala | paneer-tikka-masala | main | 0.86 | medium | paneer-curry |  | main meal family/tag/mealTag signal |
| 316 | Parippu Curry | collection-detail-parippu-curry | main | 0.88 | high | festival-meal | lunch, snack | festival-meal tag |
| 317 | Patra | expansion-pack-4-patra | snack | 0.88 | high | steamed roll | snack | snack-style dish signal |
| 318 | Payasam | collection-detail-payasam | dessert | 0.93 | high | milk-dessert | dessert, snack | dessert/sweet/festival-sweet signal |
| 319 | Peanut Chutney | side-addon-peanut-chutney | condiment | 0.94 | high | chutney | lunch, dinner, snack | explicit chutney/raita/pachadi condiment signal |
| 320 | Peanut Poha | beta2-pantry-precision-peanut-poha | snack | 0.88 | high | poha | breakfast, snack | snack-style dish signal |
| 321 | Peanut Rice | pantry-peanut-rice | main | 0.86 | medium | rice meal |  | main meal family/tag/mealTag signal |
| 322 | Peanut Sundal | peanut-sundal | snack | 0.88 | high | chaat |  | snack-style dish signal |
| 323 | Pear Puree | tiny-tummy-detail-pear-puree | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 324 | Peas Pulao | approved-peas-pulao | main | 0.86 | medium | pulao |  | main meal family/tag/mealTag signal |
| 325 | Peas Soup | warm-bowls-detail-peas-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 326 | Peda | collection-detail-peda | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 327 | Pepper Rasam | pepper-rasam | side | 0.72 | low | rasam | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 328 | Pesarattu | expansion-pack-2-pesarattu | main | 0.86 | medium | dosa | breakfast, dinner | main meal family/tag/mealTag signal |
| 329 | Phirni | collection-detail-phirni | dessert | 0.93 | high | milk-dessert | dessert, snack | dessert/sweet/festival-sweet signal |
| 330 | Pineapple Salad | fresh-plates-detail-pineapple-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 331 | Pitha | pitha-festival | snack | 0.88 | high | rice flour |  | snack-style dish signal |
| 332 | Plain Chapati | pantry-plain-chapati | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 333 | Plum Cake | plum-cake-festival | dessert | 0.93 | high | cake | dessert, snack | dessert/sweet/festival-sweet signal |
| 334 | Poha | poha-breakfast | main | 0.86 | medium | poha |  | main meal family/tag/mealTag signal |
| 335 | Pomegranate Salad | fresh-plates-detail-pomegranate-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 336 | Pongal | pongal-breakfast | main | 0.86 | medium | rice dal |  | main meal family/tag/mealTag signal |
| 337 | Pork Curry | pork-curry-dinner | main | 0.86 | medium | meat-curry |  | main meal family/tag/mealTag signal |
| 338 | Potato Palya | side-addon-potato-palya | side | 0.86 | medium | palya | lunch, dinner, snack | sabzi/bhaji/thoran/poriyal/side family signal |
| 339 | Prawn Ghee Roast | prawn-ghee-roast | main | 0.86 | medium | fish-curry |  | main meal family/tag/mealTag signal |
| 340 | Prawn Sukka | expansion-pack-3-prawn-sukka | main | 0.86 | medium | fish-curry | dinner, lunch | main meal family/tag/mealTag signal |
| 341 | Puliyogare | pantry-puliyogare | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 342 | Pumpkin Mash | tiny-tummy-detail-pumpkin-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 343 | Pumpkin Soup | warm-bowls-detail-pumpkin-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 344 | Puran Poli | collection-detail-puran-poli | dessert | 0.93 | high | sweet-flatbread | dessert, snack | dessert/sweet/festival-sweet signal |
| 345 | Puttu Kadala | balance-sprint-2-puttu-kadala | main | 0.86 | medium | steamed breakfast | breakfast | main meal family/tag/mealTag signal |
| 346 | Ragi Dosa | pantry-ragi-dosa | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 347 | Ragi Malt | balance-tier-1-ragi-malt | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 348 | Ragi Porridge | ragi-porridge-breakfast | main | 0.86 | medium | ragi |  | main meal family/tag/mealTag signal |
| 349 | Rajma Chawal | rajma-chawal-lunch | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 350 | Rajma Salad | fresh-plates-detail-rajma-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 351 | Rasam Rice | rasam-rice-lunch | main | 0.86 | medium | rice |  | title-specific: rasam rice is a rice main, not soup; soup/rasam treated as side because allowed roles do not include soup |
| 352 | Rasgulla | collection-detail-rasgulla | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 353 | Rasmalai | collection-detail-rasmalai | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 354 | Rava Idli | lunchbox-detail-rava-idli | main | 0.86 | medium | idli | breakfast | main meal family/tag/mealTag signal |
| 355 | Rava Kesari | collection-detail-rava-kesari | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 356 | Rice Cakes | rice-cakes-snack | snack | 0.88 | high | rice |  | snack-style dish signal |
| 357 | Rice Kheer | collection-detail-rice-kheer | dessert | 0.93 | high | milk-dessert | dessert, snack | dessert/sweet/festival-sweet signal |
| 358 | Rice Kheer (Baby) | tiny-tummy-detail-rice-kheer-baby | dessert | 0.82 | medium | baby food | baby, breakfast, snack | title-specific: kheer is dessert even in baby catalog; dessert/sweet/festival-sweet signal |
| 359 | Rice Moong Khichdi | tiny-tummy-detail-rice-moong-khichdi | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 360 | Rice Porridge | rice-porridge-breakfast | main | 0.86 | medium | rice meal |  | main meal family/tag/mealTag signal |
| 361 | Roasted Chana Chaat | balance-tier-1-roasted-chana-chaat | snack | 0.88 | high | chaat | snack | snack-style dish signal |
| 362 | Rose Cookies | collection-detail-rose-cookies | snack | 0.88 | high | festival-sweets | dessert, snack | festival-snack tag |
| 363 | Rose Milk | sips-detail-rose-milk | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 364 | Sabudana Khichdi | sabudana-khichdi-festival | main | 0.86 | medium | rice dal |  | main meal family/tag/mealTag signal |
| 365 | Saffron Milk | sips-detail-saffron-milk | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 366 | Sakkarai Pongal | collection-detail-sakkarai-pongal | dessert | 0.93 | high | festival-meal | dessert, snack | dessert/sweet/festival-sweet signal |
| 367 | Salted Lassi | sips-detail-salted-lassi | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 368 | Sambar Rice | sambar-rice-lunch | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 369 | Samosa | samosa-snack | snack | 0.88 | high | wheat flour |  | snack-style dish signal |
| 370 | Sandesh | collection-detail-sandesh | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 371 | Sarson Ka Saag | balance-tier-1-sarson-ka-saag | main | 0.86 | medium | saag | lunch, dinner | main meal family/tag/mealTag signal |
| 372 | Sattu Drink | balance-sprint-2-sattu-drink | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 373 | Schezwan Fried Rice | schezwan-fried-rice | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 374 | Set Dosa | expansion-pack-2-set-dosa | main | 0.86 | medium | dosa | breakfast, dinner | main meal family/tag/mealTag signal |
| 375 | Seviyan | collection-detail-seviyan | dessert | 0.93 | high | milk-dessert | dessert, snack | dessert/sweet/festival-sweet signal |
| 376 | Shankarpali | collection-detail-shankarpali | snack | 0.88 | high | festival-sweets | dessert, snack | festival-snack tag |
| 377 | Sheer Khurma | collection-detail-sheer-khurma | dessert | 0.93 | high | milk-dessert | dessert, snack | dessert/sweet/festival-sweet signal |
| 378 | Sheera | collection-detail-sheera | dessert | 0.93 | high | milk-dessert | dessert, snack | dessert/sweet/festival-sweet signal |
| 379 | Shrikhand | collection-detail-shrikhand | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 380 | Shukto | expansion-pack-3-shukto | side | 0.86 | medium | mixed vegetable | lunch | sabzi/bhaji/thoran/poriyal/side family signal |
| 381 | Smoked Pork Rice | smoked-pork-rice-lunch | main | 0.86 | medium | meat-curry |  | main meal family/tag/mealTag signal |
| 382 | Soft Chapati Milk Mash | tiny-tummy-detail-soft-chapati-milk-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | title-specific: baby mash is food, not drink; baby-food defaults to main meal role |
| 383 | Soft Dosa | tiny-tummy-detail-soft-dosa | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 384 | Soft Idli | soft-idli-breakfast | main | 0.86 | medium | idli |  | main meal family/tag/mealTag signal |
| 385 | Soft Idli Mash | tiny-tummy-detail-soft-idli-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 386 | Soft Veg Pulao | tiny-tummy-detail-soft-veg-pulao | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 387 | Sol Kadhi | expansion-pack-3-sol-kadhi | drink | 0.96 | high | drink side | lunch, dinner | explicit drink family/tag/asset/name |
| 388 | Soya Chunks Curry | expansion-pack-4-soya-chunks-curry | main | 0.86 | medium | soya curry | lunch, dinner | main meal family/tag/mealTag signal |
| 389 | Spanish Omelette | approved-spanish-omelette | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 390 | Spicy Aloo Paratha | spicy-aloo-paratha | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 391 | Spicy Masala Dosa | spicy-masala-dosa | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 392 | Spinach Salad | fresh-plates-detail-spinach-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 393 | Spinach Soup | warm-bowls-detail-spinach-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 394 | Sprouted Moong Salad | balance-tier-1-sprouted-moong-salad | side | 0.92 | high | chaat | snack, lunch | salad/fresh-plates treated as side |
| 395 | Sprouts Salad | fresh-plates-detail-sprouts-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 396 | Sprouts Usal | expansion-pack-4-sprouts-usal | main | 0.74 | low | chaat | lunch, dinner | lunch/dinner context beats snack signal |
| 397 | Sticky Rice | sticky-rice-breakfast | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 398 | Stuffed Paratha | stuffed-paratha-breakfast | main | 0.86 | medium | paratha |  | main meal family/tag/mealTag signal |
| 399 | Sugarcane Juice | sips-detail-sugarcane-juice | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 400 | Suji Porridge | tiny-tummy-detail-suji-porridge | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 401 | Sundal | sundal-snack | snack | 0.88 | high | chaat |  | snack-style dish signal |
| 402 | Sweet Corn Salad | fresh-plates-detail-sweet-corn-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 403 | Sweet Corn Soup | warm-bowls-detail-sweet-corn-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 404 | Sweet Holige | approved-sweet-holige | dessert | 0.93 | high | sweet flatbread |  | dessert/sweet/festival-sweet signal |
| 405 | Sweet Lassi | sips-detail-sweet-lassi | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 406 | Sweet Pongal | sweet-pongal-festival | dessert | 0.82 | medium | rice dal |  | title-specific: sweet pongal is dessert/sweet; main meal family/tag/mealTag signal |
| 407 | Sweet Potato Chaat | lunchbox-detail-sweet-potato-chaat | snack | 0.88 | high | chaat | snack | snack-style dish signal |
| 408 | Sweet Potato Mash | tiny-tummy-detail-sweet-potato-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 409 | Sweet Rice | approved-sweet-rice | dessert | 0.93 | high | rice |  | dessert/sweet/festival-sweet signal |
| 410 | Tender Coconut Water | sips-detail-tender-coconut-water | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 411 | Thepla | balance-sprint-2-thepla | snack | 0.88 | high | flatbread | breakfast, snack | snack-style dish signal |
| 412 | Thoran | collection-detail-thoran | side | 0.86 | medium | festival-sweets | dessert, snack | title-specific: thoran is side; festival-side tag |
| 413 | Thukpa | thukpa-breakfast | side | 0.72 | low | soup |  | soup/rasam treated as side because allowed roles do not include soup |
| 414 | Tilgul | collection-detail-tilgul | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 415 | Tofu Bhurji | expansion-pack-4-tofu-bhurji | main | 0.86 | medium | egg | dinner, breakfast | main meal family/tag/mealTag signal |
| 416 | Tomato Chutney | side-addon-tomato-chutney | condiment | 0.94 | high | chutney | lunch, dinner, snack | explicit chutney/raita/pachadi condiment signal |
| 417 | Tomato Omelette | approved-tomato-omelette | main | 0.86 | medium | egg |  | main meal family/tag/mealTag signal |
| 418 | Tomato Onion Chaat | fresh-plates-detail-tomato-onion-chaat | side | 0.92 | high | chaat | salad, snack, side | salad/fresh-plates treated as side |
| 419 | Tomato Paneer Rice | expansion-pack-1-tomato-paneer-rice | main | 0.86 | medium | paneer rice | dinner | main meal family/tag/mealTag signal |
| 420 | Tomato Pappu | balance-tier-1-tomato-pappu | side | 0.86 | medium | pappu | lunch, dinner | sabzi/bhaji/thoran/poriyal/side family signal |
| 421 | Tomato Rasam | warm-bowls-detail-tomato-rasam | side | 0.72 | low | rasam | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 422 | Tomato Rice | tomato-rice | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 423 | Tomato Soup | warm-bowls-detail-tomato-soup | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 424 | Tomato Uttapam | pantry-tomato-uttapam | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 425 | Tulsi Tea | sips-detail-tulsi-tea | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 426 | Turmeric Milk | sips-detail-turmeric-milk | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 427 | Ugadi Pachadi | collection-detail-ugadi-pachadi | condiment | 0.78 | medium | festival-sweets | dessert, snack | title-specific: pachadi behaves as festival condiment/side; explicit chutney/raita/pachadi condiment signal |
| 428 | Ukadiche Modak | collection-detail-ukadiche-modak | dessert | 0.93 | high | festival-sweets | dessert, snack | dessert/sweet/festival-sweet signal |
| 429 | Upma | upma-breakfast | main | 0.86 | medium | upma | breakfast | main meal family/tag/mealTag signal |
| 430 | Varan | balance-tier-1-varan | main | 0.86 | medium | dal | lunch, dinner | main meal family/tag/mealTag signal |
| 431 | Veg Biryani | biryani-festival | main | 0.86 | medium | pulao |  | main meal family/tag/mealTag signal |
| 432 | Veg Cutlet | lunchbox-detail-veg-cutlet | snack | 0.88 | high | cutlet | snack | snack-style dish signal |
| 433 | Veg Fried Rice | pantry-veg-fried-rice | main | 0.86 | medium | rice |  | main meal family/tag/mealTag signal |
| 434 | Veg Manchurian | tomo-veg-manchurian | snack | 0.78 | medium | indo-chinese / manchurian | snack, lunch, dinner | title-specific: starter/snack despite meal contexts; lunch/dinner context beats snack signal |
| 435 | Veg Pulao | pantry-veg-pulao | main | 0.86 | medium | pulao |  | main meal family/tag/mealTag signal |
| 436 | Veg Sandwich | veg-sandwich | snack | 0.88 | high | bread |  | snack-style dish signal |
| 437 | Veg Seviyan | lunchbox-detail-veg-seviyan | dessert | 0.93 | high | seviyan | breakfast, snack | dessert/sweet/festival-sweet signal |
| 438 | Vegetable Dal Mash | tiny-tummy-detail-vegetable-dal-mash | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 439 | Vegetable Khichdi | tiny-tummy-detail-vegetable-khichdi | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 440 | Vegetable Puree | vegetable-puree-dinner | main | 0.86 | medium | carrot |  | main meal family/tag/mealTag signal |
| 441 | Vegetable Seviyan | tiny-tummy-detail-vegetable-seviyan | main | 0.84 | medium | baby food | baby, breakfast, snack | title-specific: baby seviyan treated as meal; dessert/sweet/festival-sweet signal |
| 442 | Vegetable Soup | vegetable-soup-dinner | side | 0.72 | low | soup | soup, dinner, snack | soup/rasam treated as side because allowed roles do not include soup |
| 443 | Vegetable Stew | expansion-pack-2-vegetable-stew | side | 0.72 | low | soup | dinner, lunch | soup/rasam treated as side because allowed roles do not include soup |
| 444 | Vegetable Upma | tiny-tummy-detail-vegetable-upma | main | 0.82 | medium | baby food | baby, breakfast, snack | baby-food defaults to main meal role |
| 445 | Vegetable Uttapam | pantry-vegetable-uttapam | main | 0.86 | medium | dosa |  | main meal family/tag/mealTag signal |
| 446 | Ven Pongal | collection-detail-ven-pongal | main | 0.88 | high | festival-meal | lunch, snack | title-specific: savory pongal is main; festival-meal tag |
| 447 | Watermelon Juice | sips-detail-watermelon-juice | drink | 0.96 | high | drink | drink, snack | explicit drink family/tag/asset/name |
| 448 | Watermelon Mint Salad | fresh-plates-detail-watermelon-mint-salad | side | 0.92 | high | salad | salad, snack, side | salad/fresh-plates treated as side |
| 449 | Zunka | balance-tier-1-zunka | main | 0.86 | medium | besan sabzi | lunch, dinner | main meal family/tag/mealTag signal |

## Review notes

- Soups are assigned `side` because the allowed role list does not include `soup`; they remain review items.
- Salads are assigned `side`, even when they also carry `snack` tags.
- Festival snacks override misleading `dessert|snack` meal tags.
- Baby foods default to `main`; puree/mash items are review items when the UX may treat them as snack-like.
- This audit does not write `recipeRole` back into recipe data.
