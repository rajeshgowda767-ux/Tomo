# Beta 3 Catalog Validation Report

Generated: 2026-06-24T10:03:59.046Z
Branch: beta-3-active-development
Source: database/generated/recipes.json

# Executive Summary

- Total recipes audited: 660
- Total issues: 1750
- Critical issues: 0
- High issues: 467
- Medium issues: 1283
- Low issues: 0

Priority model:

- P0 = Must fix immediately
- P1 = Fix before Beta 3 release
- P2 = Cleanup later

Key findings:

- Identity and collectionHome are structurally healthy if their sections show zero P0 issues.
- Image quality is the biggest catalog weakness: placeholder and high-reuse images dominate several expanded regions and Global Bites soups/bowls.
- Generator compatibility is currently passing for active recipes unless noted below.
- Many pairings are descriptive/generic rather than strict recipe-title references; these are reported as P2 review items, not hard blockers.

# Image Reuse Hotspots

- /assets/images/dishes/homestyle-kitchen-placeholder.png — 128 recipes
- /assets/images/collections/soups.webp — 42 recipes
- /assets/images/collections/desserts.webp — 35 recipes
- /assets/images/collections/festival-food.webp — 22 recipes
- /assets/images/dishes/dosa-homestyle.png — 15 recipes
- /assets/images/dishes/fish-curry.png — 15 recipes
- /assets/images/dishes/lunch-default.png — 14 recipes
- /assets/images/dishes/recommendation-pack-pepper-rasam.png — 12 recipes
- /assets/images/dishes/chicken-curry.png — 10 recipes
- /assets/images/dishes/paratha.png — 9 recipes
- /assets/images/snacks/sandwich.png — 8 recipes
- /assets/images/dishes/pulao.png — 7 recipes
- /assets/images/dishes/mutton-pulao-homestyle.png — 6 recipes
- /assets/images/dishes/recommendation-pack-egg-sandwich.png — 6 recipes
- /assets/images/dishes/dinner-default.png — 5 recipes
- /assets/images/dishes/batch3a-baingan-bharta.png — 5 recipes
- /assets/images/dishes/batch5-corn-sundal.png — 5 recipes
- /assets/images/dishes/bread-omelette-homestyle.png — 5 recipes
- /assets/images/dishes/recommendation-pack-aloo-jeera.png — 4 recipes
- /assets/images/dishes/batch3a-chilli-chicken.png — 4 recipes

# Issues by Category

## Identity

Total: 0

No issues found.

## Metadata

Total: 457

### P1

- Aam Panna (sips-detail-aam-panna): Missing region/regionTags
- Ajwain Water (sips-detail-ajwain-water): Missing region/regionTags
- Aloo Paratha (aloo-paratha-breakfast): Missing mealType/mealTags
- Andhra Chicken Curry (andhra-chicken-curry): Missing mealType/mealTags
- Andhra Egg Fry (andhra-egg-fry): Missing mealType/mealTags
- Andhra Podi Idli (andhra-podi-idli): Missing mealType/mealTags
- Apple Puree (apple-puree-snack): Missing mealType/mealTags
- Apple Walnut Salad (fresh-plates-detail-apple-walnut-salad): Missing region/regionTags
- Avalakki (avalakki-breakfast): Missing mealType/mealTags
- Avocado Mash (tiny-tummy-detail-avocado-mash): Missing region/regionTags
- Avocado Salad (fresh-plates-detail-avocado-salad): Missing region/regionTags
- Baby Pongal (tiny-tummy-detail-baby-pongal): Missing region/regionTags
- Badam Milk (sips-detail-badam-milk): Missing region/regionTags
- Banana Pancake (lunchbox-detail-banana-pancake): Missing region/regionTags
- Banana Shake (sips-detail-banana-shake): Missing region/regionTags
- Batata Poha (approved-batata-poha): Missing mealType/mealTags
- Beetroot Mash (tiny-tummy-detail-beetroot-mash): Missing region/regionTags
- Beetroot Salad (fresh-plates-detail-beetroot-salad): Missing region/regionTags
- Beetroot Soup (warm-bowls-detail-beetroot-soup): Missing region/regionTags
- Besan Chilla (besan-chilla-breakfast): Missing mealType/mealTags
- Besan Ladoo (collection-detail-besan-ladoo): Missing region/regionTags
- Bisibelebath (bisibelebath-lunch): Missing mealType/mealTags
- Boiled Corn (boiled-corn-snack): Missing mealType/mealTags
- Bonda (bonda-snack): Missing mealType/mealTags
- Bottle Gourd Soup (warm-bowls-detail-bottle-gourd-soup): Missing region/regionTags
- Bread Omelette (bread-omelette-breakfast): Missing mealType/mealTags
- Bread Pakora (bread-pakora-snack): Missing mealType/mealTags
- Bread Upma (bread-upma): Missing mealType/mealTags
- Broccoli Salad (fresh-plates-detail-broccoli-salad): Missing region/regionTags
- Broccoli Soup (warm-bowls-detail-broccoli-soup): Missing region/regionTags
- Butter Chicken (butter-chicken-lunch): Missing mealType/mealTags
- Cabbage Salad (fresh-plates-detail-cabbage-salad): Missing region/regionTags
- Cabbage Soup (warm-bowls-detail-cabbage-soup): Missing region/regionTags
- Carrot Beet Juice (sips-detail-carrot-beet-juice): Missing region/regionTags
- Carrot Cucumber Salad (fresh-plates-detail-carrot-cucumber-salad): Missing region/regionTags
- Carrot Halwa (collection-detail-carrot-halwa): Missing region/regionTags
- Carrot Puree (tiny-tummy-detail-carrot-puree): Missing region/regionTags
- Carrot Soup (warm-bowls-detail-carrot-soup): Missing region/regionTags
- Chaat (chaat-snack): Missing mealType/mealTags
- Chakli (collection-detail-chakli): Missing region/regionTags
- Chana Chaat (fresh-plates-detail-chana-chaat): Missing region/regionTags
- Chapati Jam Roll (lunchbox-detail-chapati-jam-roll): Missing region/regionTags
- Cheese Dosa (approved-cheese-dosa): Missing mealType/mealTags
- Cheese Omelette (pantry-cheese-omelette): Missing mealType/mealTags
- Cheese Paratha (approved-cheese-paratha): Missing mealType/mealTags
- Cheese Uttapam (approved-cheese-uttapam): Missing mealType/mealTags
- Cheese Veg Sandwich (lunchbox-detail-cheese-veg-sandwich): Missing region/regionTags
- Chicken 555 (chicken-555): Missing mealType/mealTags
- Chicken 65 (chicken-65): Missing mealType/mealTags
- Chicken Biryani (collection-detail-chicken-biryani): Missing region/regionTags
- Chicken Curry (chicken-curry-dinner): Missing mealType/mealTags
- Chicken Fried Rice (pantry-chicken-fried-rice): Missing mealType/mealTags
- Chicken Majestic (chicken-majestic): Missing mealType/mealTags
- Chicken Mushroom Stir Fry (approved-chicken-mushroom-stir-fry): Missing mealType/mealTags
- Chicken Potato Curry (approved-chicken-potato-curry): Missing mealType/mealTags
- Chicken Pulao (chicken-pulao-dinner): Missing mealType/mealTags
- Chicken Rice (chicken-rice-dinner): Missing mealType/mealTags
- Chicken Roll (chicken-roll-snack): Missing mealType/mealTags
- Chicken Soup (warm-bowls-detail-chicken-soup): Missing region/regionTags
- Chicken Stew (chicken-stew-lunch): Missing mealType/mealTags
- Chicken Sukka (chicken-sukka): Missing mealType/mealTags
- Chilli Chicken (pantry-chilli-chicken): Missing mealType/mealTags
- Chilli Mushroom (chilli-mushroom): Missing mealType/mealTags
- Chilli Paneer (chilli-paneer): Missing mealType/mealTags
- Chocolate Burfi (collection-detail-chocolate-burfi): Missing region/regionTags
- Chole Chawal (chole-chawal-lunch): Missing mealType/mealTags
- Coconut Barfi (collection-detail-coconut-barfi): Missing region/regionTags
- Coconut Cucumber Salad (fresh-plates-detail-coconut-cucumber-salad): Missing region/regionTags
- Coconut Macaroons (collection-detail-coconut-macaroons): Missing region/regionTags
- Coconut Rice (coconut-rice): Missing mealType/mealTags
- Cucumber Raita Salad (fresh-plates-detail-cucumber-raita-salad): Missing region/regionTags
- Dal Rice (dal-rice-lunch): Missing mealType/mealTags
- Dal Rice Mash (tiny-tummy-detail-dal-rice-mash): Missing region/regionTags
- Dal Roti (dal-roti-lunch): Missing mealType/mealTags
- Dalia Porridge (tiny-tummy-detail-dalia-porridge): Missing region/regionTags
- Dates Milkshake (sips-detail-dates-milkshake): Missing region/regionTags
- Dosa (dosa-breakfast): Missing mealType/mealTags
- Dosa Roll (lunchbox-detail-dosa-roll): Missing region/regionTags
- Dragon Chicken (dragon-chicken): Missing mealType/mealTags
- Drumstick Soup (warm-bowls-detail-drumstick-soup): Missing region/regionTags
- … 215 more P1 issues omitted for readability.

### P2

- Anarsa (maharashtra-wave-anarsa): Non-standard meal tag — dessert
- Andhra Egg Fry (andhra-egg-fry): Non-standard dietary tag — egg
- Apple Walnut Salad (fresh-plates-detail-apple-walnut-salad): Non-standard meal tag — salad
- Apple Walnut Salad (fresh-plates-detail-apple-walnut-salad): Non-standard meal tag — side
- Ariselu (andhra-telangana-wave-26-ariselu): Non-standard meal tag — dessert
- Avocado Mash (tiny-tummy-detail-avocado-mash): Non-standard meal tag — baby
- Avocado Salad (fresh-plates-detail-avocado-salad): Non-standard meal tag — salad
- Avocado Salad (fresh-plates-detail-avocado-salad): Non-standard meal tag — side
- Baby Pongal (tiny-tummy-detail-baby-pongal): Non-standard meal tag — baby
- Basundi (collection-detail-basundi): Non-standard meal tag — dessert
- Beetroot Mash (tiny-tummy-detail-beetroot-mash): Non-standard meal tag — baby
- Beetroot Salad (fresh-plates-detail-beetroot-salad): Non-standard meal tag — salad
- Beetroot Salad (fresh-plates-detail-beetroot-salad): Non-standard meal tag — side
- Besan Ladoo (collection-detail-besan-ladoo): Non-standard meal tag — dessert
- Bobbatlu (andhra-telangana-wave-27-bobbatlu): Non-standard meal tag — dessert
- Bread Omelette (bread-omelette-breakfast): Non-standard dietary tag — egg
- Broccoli Salad (fresh-plates-detail-broccoli-salad): Non-standard meal tag — salad
- Broccoli Salad (fresh-plates-detail-broccoli-salad): Non-standard meal tag — side
- Cabbage Salad (fresh-plates-detail-cabbage-salad): Non-standard meal tag — salad
- Cabbage Salad (fresh-plates-detail-cabbage-salad): Non-standard meal tag — side
- Carrot Cucumber Salad (fresh-plates-detail-carrot-cucumber-salad): Non-standard meal tag — salad
- Carrot Cucumber Salad (fresh-plates-detail-carrot-cucumber-salad): Non-standard meal tag — side
- Carrot Halwa (collection-detail-carrot-halwa): Non-standard meal tag — dessert
- Carrot Puree (tiny-tummy-detail-carrot-puree): Non-standard meal tag — baby
- Chakli (collection-detail-chakli): Non-standard meal tag — dessert
- Chana Chaat (fresh-plates-detail-chana-chaat): Non-standard meal tag — salad
- Chana Chaat (fresh-plates-detail-chana-chaat): Non-standard meal tag — side
- Cheese Omelette (pantry-cheese-omelette): Non-standard dietary tag — egg
- Chicken Egg Rice Bowl (expansion-pack-1-chicken-egg-rice-bowl): Non-standard dietary tag — egg
- Chicken Fried Rice (pantry-chicken-fried-rice): Non-standard dietary tag — egg
- Chocolate Burfi (collection-detail-chocolate-burfi): Non-standard meal tag — dessert
- Coconut Barfi (collection-detail-coconut-barfi): Non-standard meal tag — dessert
- Coconut Cucumber Salad (fresh-plates-detail-coconut-cucumber-salad): Non-standard meal tag — salad
- Coconut Cucumber Salad (fresh-plates-detail-coconut-cucumber-salad): Non-standard meal tag — side
- Coconut Macaroons (collection-detail-coconut-macaroons): Non-standard meal tag — dessert
- Corn Chaat (corn-chaat): Non-standard meal tag — salad
- Corn Chaat (corn-chaat): Non-standard meal tag — side
- Cucumber Raita Salad (fresh-plates-detail-cucumber-raita-salad): Non-standard meal tag — salad
- Cucumber Raita Salad (fresh-plates-detail-cucumber-raita-salad): Non-standard meal tag — side
- Dal Rice Mash (tiny-tummy-detail-dal-rice-mash): Non-standard meal tag — baby
- Dalia Porridge (tiny-tummy-detail-dalia-porridge): Non-standard meal tag — baby
- Dharwad Peda (karnataka-wave-a-dharwad-peda): Non-standard meal tag — dessert
- Dry Fruit Ladoo (collection-detail-dry-fruit-ladoo): Non-standard meal tag — dessert
- Egg Bhurji (egg-bhurji-dinner): Non-standard dietary tag — egg
- Egg Capsicum Bhurji (expansion-pack-1-egg-capsicum-bhurji): Non-standard dietary tag — egg
- Egg Curry (egg-curry): Non-standard dietary tag — egg
- Egg Curry Rice (egg-curry-rice-lunch): Non-standard dietary tag — egg
- Egg Dosa (pantry-egg-dosa): Non-standard dietary tag — egg
- Egg Fried Rice (egg-fried-rice-breakfast): Non-standard dietary tag — egg
- Egg Paratha (pantry-egg-paratha): Non-standard dietary tag — egg
- Egg Toast (egg-toast): Non-standard dietary tag — egg
- Egg Tomato Rice Bowl (expansion-pack-1-egg-tomato-rice-bowl): Non-standard dietary tag — egg
- Egg Yolk Mash (tiny-tummy-detail-egg-yolk-mash): Non-standard meal tag — baby
- Ela Ada (kerala-wave-08-ela-ada): Non-standard meal tag — dessert
- Elaneer Payasam (tamil-nadu-wave-21-elaneer-payasam): Non-standard meal tag — dessert
- Ellu Bella (collection-detail-ellu-bella): Non-standard meal tag — dessert
- Falooda (collection-detail-falooda): Non-standard meal tag — dessert
- Fruit Chaat (fresh-plates-detail-fruit-chaat): Non-standard meal tag — salad
- Fruit Chaat (fresh-plates-detail-fruit-chaat): Non-standard meal tag — side
- Garlic Egg Rice (expansion-pack-1-garlic-egg-rice): Non-standard dietary tag — egg
- Green Gram Salad (fresh-plates-detail-green-gram-salad): Non-standard meal tag — salad
- Green Gram Salad (fresh-plates-detail-green-gram-salad): Non-standard meal tag — side
- Gulab Jamun (collection-detail-gulab-jamun): Non-standard meal tag — dessert
- Holige (collection-detail-holige): Non-standard meal tag — dessert
- Idiyappam Egg Curry (kerala-wave-02-idiyappam-egg-curry): Non-standard dietary tag — egg
- Jalebi (collection-detail-jalebi): Non-standard meal tag — dessert
- Kachumber Salad (fresh-plates-detail-kachumber-salad): Non-standard meal tag — salad
- Kachumber Salad (fresh-plates-detail-kachumber-salad): Non-standard meal tag — side
- Kadubu (collection-detail-kadubu): Non-standard meal tag — dessert
- Kaju Katli (collection-detail-kaju-katli): Non-standard meal tag — dessert
- Kalakand (collection-detail-kalakand): Non-standard meal tag — dessert
- Kalkals (collection-detail-kalkals): Non-standard meal tag — dessert
- Karadantu (maharashtra-wave-karadantu): Non-standard meal tag — dessert
- Kerala Egg Roast (expansion-pack-3-kerala-egg-roast): Non-standard dietary tag — egg
- Kheer (collection-detail-kheer): Non-standard meal tag — dessert
- Kozhukattai (collection-detail-kozhukattai): Non-standard meal tag — dessert
- Kulfi (collection-detail-kulfi): Non-standard meal tag — dessert
- Lentil Salad (fresh-plates-detail-lentil-salad): Non-standard meal tag — salad
- Lentil Salad (fresh-plates-detail-lentil-salad): Non-standard meal tag — side
- Malpua (collection-detail-malpua): Non-standard meal tag — dessert
- … 82 more P2 issues omitted for readability.

## Images

Total: 551

### P2

- Adai (tamil-nadu-wave-02-adai): Excessive image reuse — /assets/images/dishes/dosa-homestyle.png used by 15 recipes
- Aloo Pitika (expansion-pack-3-aloo-pitika): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Aloo Pitika (expansion-pack-3-aloo-pitika): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Aloo Posto (expansion-pack-3-aloo-posto): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Aloo Posto (expansion-pack-3-aloo-posto): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Aloo Potol Posto (bengal-wave-17-aloo-potol-posto): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Aloo Potol Posto (bengal-wave-17-aloo-potol-posto): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Aloo Rice (pantry-aloo-rice): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Aloo Rice (pantry-aloo-rice): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Anarsa (maharashtra-wave-anarsa): Placeholder/shared fallback image in use — /assets/images/collections/desserts.webp
- Anarsa (maharashtra-wave-anarsa): Excessive image reuse — /assets/images/collections/desserts.webp used by 35 recipes
- Andhra Egg Fry (andhra-egg-fry): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Andhra Egg Fry (andhra-egg-fry): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Apong Rice Drink (northeast-quality-apong-rice-drink): Placeholder/shared fallback image in use — /assets/images/drinks/drinks-default.png
- Appam (expansion-pack-2-appam): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Appam (expansion-pack-2-appam): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Apple Puree (apple-puree-snack): Placeholder/shared fallback image in use — /assets/images/dishes/dinner-default.png
- Arepas (global-wave-b-arepas): Placeholder/shared fallback image in use — /assets/images/snacks/snacks-default.png
- Ariselu (andhra-telangana-wave-26-ariselu): Placeholder/shared fallback image in use — /assets/images/collections/festival-food.webp
- Ariselu (andhra-telangana-wave-26-ariselu): Excessive image reuse — /assets/images/collections/festival-food.webp used by 22 recipes
- Assamese Duck Curry (expansion-pack-4-assamese-duck-curry): Excessive image reuse — /assets/images/dishes/chicken-curry.png used by 10 recipes
- Axone Chicken (northeast-wave-axone-chicken): Excessive image reuse — /assets/images/dishes/chicken-curry.png used by 10 recipes
- Badanekayi Ennegayi (karnataka-wave-a-badanekayi-ennegayi): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Badanekayi Ennegayi (karnataka-wave-a-badanekayi-ennegayi): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Bamboo Shoot Curry (karnataka-wave-b-bamboo-shoot-curry): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Bamboo Shoot Curry (karnataka-wave-b-bamboo-shoot-curry): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Bamboo Shoot Pork (expansion-pack-3-bamboo-shoot-pork): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Bamboo Shoot Pork (expansion-pack-3-bamboo-shoot-pork): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Basanti Pulao (bengal-wave-02-basanti-pulao): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Basanti Pulao (bengal-wave-02-basanti-pulao): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Bassaru (karnataka-pack-1-bassaru): Placeholder/shared fallback image in use — /assets/images/collections/soups.webp
- Bassaru (karnataka-pack-1-bassaru): Excessive image reuse — /assets/images/collections/soups.webp used by 42 recipes
- Basundi (collection-detail-basundi): Placeholder/shared fallback image in use — /assets/images/collections/desserts.webp
- Basundi (collection-detail-basundi): Excessive image reuse — /assets/images/collections/desserts.webp used by 35 recipes
- Batata Vada (maharashtra-wave-batata-vada): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Batata Vada (maharashtra-wave-batata-vada): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Beetroot Pachadi (kerala-wave-21-beetroot-pachadi): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Beetroot Pachadi (kerala-wave-21-beetroot-pachadi): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Beetroot Soup (warm-bowls-detail-beetroot-soup): Placeholder/shared fallback image in use — /assets/images/collections/soups.webp
- Beetroot Soup (warm-bowls-detail-beetroot-soup): Excessive image reuse — /assets/images/collections/soups.webp used by 42 recipes
- Bendakaya Pulusu (andhra-telangana-wave-10-bendakaya-pulusu): Excessive image reuse — /assets/images/dishes/recommendation-pack-pepper-rasam.png used by 12 recipes
- Besan Ladoo (collection-detail-besan-ladoo): Placeholder/shared fallback image in use — /assets/images/collections/desserts.webp
- Besan Ladoo (collection-detail-besan-ladoo): Excessive image reuse — /assets/images/collections/desserts.webp used by 35 recipes
- Bhetki Paturi (bengal-wave-14-bhetki-paturi): Excessive image reuse — /assets/images/dishes/fish-curry.png used by 15 recipes
- Bibimbap Bowl (global-wave-a-bibimbap-bowl): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Bibimbap Bowl (global-wave-a-bibimbap-bowl): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Black Sesame Chicken (northeast-wave-black-sesame-chicken): Excessive image reuse — /assets/images/dishes/chicken-curry.png used by 10 recipes
- Bobbatlu (andhra-telangana-wave-27-bobbatlu): Placeholder/shared fallback image in use — /assets/images/collections/festival-food.webp
- Bobbatlu (andhra-telangana-wave-27-bobbatlu): Excessive image reuse — /assets/images/collections/festival-food.webp used by 22 recipes
- Boiled Corn (boiled-corn-snack): Placeholder/shared fallback image in use — /assets/images/dishes/dinner-default.png
- Bonda (bonda-snack): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Bonda (bonda-snack): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Bottle Gourd Soup (warm-bowls-detail-bottle-gourd-soup): Placeholder/shared fallback image in use — /assets/images/collections/soups.webp
- Bottle Gourd Soup (warm-bowls-detail-bottle-gourd-soup): Excessive image reuse — /assets/images/collections/soups.webp used by 42 recipes
- Bread Pakora (bread-pakora-snack): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Bread Pakora (bread-pakora-snack): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Broccoli Cheddar Soup (global-wave-b-broccoli-cheddar-soup): Placeholder/shared fallback image in use — /assets/images/collections/soups.webp
- Broccoli Cheddar Soup (global-wave-b-broccoli-cheddar-soup): Excessive image reuse — /assets/images/collections/soups.webp used by 42 recipes
- Broccoli Soup (warm-bowls-detail-broccoli-soup): Placeholder/shared fallback image in use — /assets/images/collections/soups.webp
- Broccoli Soup (warm-bowls-detail-broccoli-soup): Excessive image reuse — /assets/images/collections/soups.webp used by 42 recipes
- Butter Chicken (butter-chicken-lunch): Placeholder/shared fallback image in use — /assets/images/dishes/lunch-default.png
- Butter Chicken (butter-chicken-lunch): Excessive image reuse — /assets/images/dishes/lunch-default.png used by 14 recipes
- Cabbage Soup (warm-bowls-detail-cabbage-soup): Placeholder/shared fallback image in use — /assets/images/collections/soups.webp
- Cabbage Soup (warm-bowls-detail-cabbage-soup): Excessive image reuse — /assets/images/collections/soups.webp used by 42 recipes
- Carrot Cucumber Salad (fresh-plates-detail-carrot-cucumber-salad): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Carrot Cucumber Salad (fresh-plates-detail-carrot-cucumber-salad): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Carrot Halwa (collection-detail-carrot-halwa): Placeholder/shared fallback image in use — /assets/images/collections/desserts.webp
- Carrot Halwa (collection-detail-carrot-halwa): Excessive image reuse — /assets/images/collections/desserts.webp used by 35 recipes
- Carrot Soup (warm-bowls-detail-carrot-soup): Placeholder/shared fallback image in use — /assets/images/collections/soups.webp
- Carrot Soup (warm-bowls-detail-carrot-soup): Excessive image reuse — /assets/images/collections/soups.webp used by 42 recipes
- Chaat (chaat-snack): Placeholder/shared fallback image in use — /assets/images/dishes/dinner-default.png
- Chakli (collection-detail-chakli): Placeholder/shared fallback image in use — /assets/images/collections/festival-food.webp
- Chakli (collection-detail-chakli): Excessive image reuse — /assets/images/collections/festival-food.webp used by 22 recipes
- Cheese Dosa (approved-cheese-dosa): Excessive image reuse — /assets/images/dishes/dosa-homestyle.png used by 15 recipes
- Cheese Uttapam (approved-cheese-uttapam): Excessive image reuse — /assets/images/dishes/dosa-homestyle.png used by 15 recipes
- Cheese Veg Sandwich (lunchbox-detail-cheese-veg-sandwich): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Cheese Veg Sandwich (lunchbox-detail-cheese-veg-sandwich): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- Chepala Pulusu (andhra-telangana-wave-19-chepala-pulusu): Excessive image reuse — /assets/images/dishes/fish-curry.png used by 15 recipes
- Chhanar Dalna (bengal-wave-19-chhanar-dalna): Placeholder/shared fallback image in use — /assets/images/dishes/homestyle-kitchen-placeholder.png
- Chhanar Dalna (bengal-wave-19-chhanar-dalna): Excessive image reuse — /assets/images/dishes/homestyle-kitchen-placeholder.png used by 128 recipes
- … 471 more P2 issues omitted for readability.

## Pairings

Total: 376

### P1

- Besan Ladoo (collection-detail-besan-ladoo): Missing pairings
- Carrot Halwa (collection-detail-carrot-halwa): Missing pairings
- Chakli (collection-detail-chakli): Missing pairings
- Chicken Biryani (collection-detail-chicken-biryani): Missing pairings
- Chocolate Burfi (collection-detail-chocolate-burfi): Missing pairings
- Coconut Barfi (collection-detail-coconut-barfi): Missing pairings
- Coconut Macaroons (collection-detail-coconut-macaroons): Missing pairings
- Dry Fruit Ladoo (collection-detail-dry-fruit-ladoo): Missing pairings
- Ellu Bella (collection-detail-ellu-bella): Missing pairings
- Falooda (collection-detail-falooda): Missing pairings
- Gulab Jamun (collection-detail-gulab-jamun): Missing pairings
- Haleem (collection-detail-haleem): Missing pairings
- Holige (collection-detail-holige): Missing pairings
- Jalebi (collection-detail-jalebi): Missing pairings
- Kadubu (collection-detail-kadubu): Missing pairings
- Kaju Katli (collection-detail-kaju-katli): Missing pairings
- Kalakand (collection-detail-kalakand): Missing pairings
- Kalkals (collection-detail-kalkals): Missing pairings
- Kheer (collection-detail-kheer): Missing pairings
- Kulfi (collection-detail-kulfi): Missing pairings
- Malpua (collection-detail-malpua): Missing pairings
- Mango Rice (collection-detail-mango-rice): Missing pairings
- Marzipan (collection-detail-marzipan): Missing pairings
- Moong Dal Halwa (collection-detail-moong-dal-halwa): Missing pairings
- Motichoor Ladoo (collection-detail-motichoor-ladoo): Missing pairings
- Mutton Korma (collection-detail-mutton-korma): Missing pairings
- Mysore Pak (collection-detail-mysore-pak): Missing pairings
- Obbattu (collection-detail-obbattu): Missing pairings
- Payasam (collection-detail-payasam): Missing pairings
- Peda (collection-detail-peda): Missing pairings
- Phirni (collection-detail-phirni): Missing pairings
- Rasmalai (collection-detail-rasmalai): Missing pairings
- Rice Kheer (collection-detail-rice-kheer): Missing pairings
- Rose Cookies (collection-detail-rose-cookies): Missing pairings
- Sandesh (collection-detail-sandesh): Missing pairings
- Seviyan (collection-detail-seviyan): Missing pairings
- Shankarpali (collection-detail-shankarpali): Missing pairings
- Sheer Khurma (collection-detail-sheer-khurma): Missing pairings
- Sheera (collection-detail-sheera): Missing pairings
- Tilgul (collection-detail-tilgul): Missing pairings
- Ugadi Pachadi (collection-detail-ugadi-pachadi): Missing pairings

### P2

- Ajwain Water (sips-detail-ajwain-water): Pairing reference may not match recipe title — Roasted Makhana
- Akki Roti (expansion-pack-2-akki-roti): Pairing reference may not match recipe title — Ghee
- Aloo Capsicum Sabzi (pantry-aloo-capsicum-sabzi): Pairing reference may not match recipe title — Dal Fry
- Aloo Capsicum Sabzi (pantry-aloo-capsicum-sabzi): Pairing reference may not match recipe title — Paratha
- Aloo Paratha (aloo-paratha-breakfast): Pairing reference may not match recipe title — Butter
- Aloo Rice (pantry-aloo-rice): Pairing reference may not match recipe title — Dal Fry
- Aloo Rice (pantry-aloo-rice): Pairing reference may not match recipe title — Coriander
- Aluchi Patal Bhaji (maharashtra-wave-aluchi-patal-bhaji): Pairing reference may not match recipe title — Bhakri
- Aluchi Patal Bhaji (maharashtra-wave-aluchi-patal-bhaji): Pairing reference may not match recipe title — Bhakri
- Andhra Fish Fry (andhra-telangana-wave-20-andhra-fish-fry): Pairing reference may not match recipe title — Rasam
- Andhra Kodi Vepudu (andhra-kodi-vepudu): Pairing reference may not match recipe title — Rasam
- Andhra Podi Idli (andhra-podi-idli): Pairing reference may not match recipe title — Ghee
- Andhra Podi Idli (andhra-podi-idli): Pairing reference may not match recipe title — Idli podi
- Apong Rice Drink (northeast-quality-apong-rice-drink): Pairing reference may not match recipe title — Northeast Snacks
- Appam (expansion-pack-2-appam): Pairing reference may not match recipe title — Coconut milk
- Apple Puree (apple-puree-snack): Pairing reference may not match recipe title — Light snacks
- Avalakki (avalakki-breakfast): Pairing reference may not match recipe title — Banana
- Avalakki (avalakki-breakfast): Pairing reference may not match recipe title — Fresh coconut
- Avalakki (avalakki-breakfast): Pairing reference may not match recipe title — Roasted peanuts
- Baingan Bharta (expansion-pack-4-baingan-bharta): Pairing reference may not match recipe title — Paratha
- Bassaru (karnataka-pack-1-bassaru): Pairing reference may not match recipe title — Palya
- Bassaru (karnataka-pack-1-bassaru): Pairing reference may not match recipe title — Greens palya
- Bassaru (karnataka-pack-1-bassaru): Pairing reference may not match recipe title — Ghee
- Basundi (collection-detail-basundi): Pairing reference may not match recipe title — Puri
- Basundi (collection-detail-basundi): Pairing reference may not match recipe title — Puri
- Batata Poha (approved-batata-poha): Pairing reference may not match recipe title — Lemon
- Beans Poriyal (balance-tier-1-beans-poriyal): Pairing reference may not match recipe title — Rasam
- Beans Poriyal (balance-tier-1-beans-poriyal): Pairing reference may not match recipe title — Coconut
- Beetroot Pachadi (kerala-wave-21-beetroot-pachadi): Pairing reference may not match recipe title — Sadya
- Beetroot Salad (fresh-plates-detail-beetroot-salad): Pairing reference may not match recipe title — Roasted Seeds
- Bele Saaru (balance-tier-1-bele-saaru): Pairing reference may not match recipe title — Ghee
- Bharli Mirchi (maharashtra-wave-bharli-mirchi): Pairing reference may not match recipe title — Bhakri
- Bharli Mirchi (maharashtra-wave-bharli-mirchi): Pairing reference may not match recipe title — Bhakri
- Bharli Vangi (maharashtra-wave-bharli-vangi): Pairing reference may not match recipe title — Bhakri
- Bharli Vangi (maharashtra-wave-bharli-vangi): Pairing reference may not match recipe title — Bhakri
- Bisibelebath (bisibelebath-lunch): Pairing reference may not match recipe title — Boondi
- Bisibelebath (bisibelebath-lunch): Pairing reference may not match recipe title — Ghee
- Bobbatlu (andhra-telangana-wave-27-bobbatlu): Pairing reference may not match recipe title — Ghee
- Bobbatlu (andhra-telangana-wave-27-bobbatlu): Pairing reference may not match recipe title — Milk
- Boiled Corn (boiled-corn-snack): Pairing reference may not match recipe title — Lemon
- Boiled Corn (boiled-corn-snack): Pairing reference may not match recipe title — Coriander
- Boondi Raita (side-addon-boondi-raita): Pairing reference may not match recipe title — Biryani
- Butter Chicken (butter-chicken-lunch): Pairing reference may not match recipe title — Butter naan
- Cabbage Salad (fresh-plates-detail-cabbage-salad): Pairing reference may not match recipe title — Roasted Peanuts
- Cabbage Thoran (balance-tier-1-cabbage-thoran): Pairing reference may not match recipe title — Rasam
- Chaat (chaat-snack): Pairing reference may not match recipe title — Lemon
- Chaat (chaat-snack): Pairing reference may not match recipe title — Coriander
- Cheese Dosa (approved-cheese-dosa): Pairing reference may not match recipe title — Ghee
- Cheese Paratha (approved-cheese-paratha): Pairing reference may not match recipe title — Butter
- Cheese Uttapam (approved-cheese-uttapam): Pairing reference may not match recipe title — Ghee
- Cherupayar Curry (kerala-wave-18-cherupayar-curry): Pairing reference may not match recipe title — Kanji
- Chettinad Chicken Curry (chicken-chettinad): Pairing reference may not match recipe title — Cucumber pachadi
- Chettinad Chicken Curry (chicken-chettinad): Pairing reference may not match recipe title — Parotta
- Chicken 555 (chicken-555): Pairing reference may not match recipe title — Onion rings
- Chicken 555 (chicken-555): Pairing reference may not match recipe title — Lemon wedges
- Chicken 555 (chicken-555): Pairing reference may not match recipe title — Lime soda
- Chicken 555 (chicken-555): Pairing reference may not match recipe title — Curry leaves
- Chicken 65 (chicken-65): Pairing reference may not match recipe title — Onion rings
- Chicken 65 (chicken-65): Pairing reference may not match recipe title — Lemon wedges
- Chicken 65 (chicken-65): Pairing reference may not match recipe title — Lime soda
- Chicken 65 (chicken-65): Pairing reference may not match recipe title — Curry leaves
- Chicken Capsicum Stir Fry Bowl (expansion-pack-1-chicken-capsicum-stir-fry-bowl): Pairing reference may not match recipe title — Lemon
- Chicken Egg Rice Bowl (expansion-pack-1-chicken-egg-rice-bowl): Pairing reference may not match recipe title — Spring onion
- Chicken Fried Rice (pantry-chicken-fried-rice): Pairing reference may not match recipe title — Chilli chicken dry
- Chicken Fried Rice (pantry-chicken-fried-rice): Pairing reference may not match recipe title — Cucumber slices
- Chicken Fried Rice (pantry-chicken-fried-rice): Pairing reference may not match recipe title — Lime soda
- Chicken Fried Rice (pantry-chicken-fried-rice): Pairing reference may not match recipe title — Spring onion
- Chicken Majestic (chicken-majestic): Pairing reference may not match recipe title — Onion rings
- Chicken Majestic (chicken-majestic): Pairing reference may not match recipe title — Cucumber slices
- Chicken Majestic (chicken-majestic): Pairing reference may not match recipe title — Lemon wedges
- Chicken Majestic (chicken-majestic): Pairing reference may not match recipe title — Lime soda
- Chicken Majestic (chicken-majestic): Pairing reference may not match recipe title — Curry leaves
- Chicken Pepper Rice Bowl (expansion-pack-1-chicken-pepper-rice-bowl): Pairing reference may not match recipe title — Cucumber slices
- Chicken Rice (chicken-rice-dinner): Pairing reference may not match recipe title — Fried onion
- Chicken Stew (chicken-stew-lunch): Pairing reference may not match recipe title — Idiyappam
- Chicken Sukka Maharashtrian (maharashtra-wave-chicken-sukka-maharashtrian): Pairing reference may not match recipe title — Bhakri
- Chicken Sukka Maharashtrian (maharashtra-wave-chicken-sukka-maharashtrian): Pairing reference may not match recipe title — Bhakri
- Chilli Chicken (pantry-chilli-chicken): Pairing reference may not match recipe title — Hakka Noodles
- Chilli Mushroom (chilli-mushroom): Pairing reference may not match recipe title — Hakka Noodles
- Chingudi Chhecha (expansion-pack-4-chingudi-chhecha): Pairing reference may not match recipe title — Cucumber
- … 255 more P2 issues omitted for readability.

## Quick Guides

Total: 0

No issues found.

## Collections

Total: 0

No issues found.

## Journeys

Total: 1

### P1

- Mysore Rasam (warm-bowls-detail-mysore-rasam): Regional Journey mismatch: Karnataka home without Karnataka region tags

## Recommendation Integrity

Total: 365

### P1

- Aloo Paratha (aloo-paratha-breakfast): Missing moodTags
- Andhra Chicken Curry (andhra-chicken-curry): Missing moodTags
- Andhra Egg Fry (andhra-egg-fry): Missing moodTags
- Andhra Podi Idli (andhra-podi-idli): Missing moodTags
- Apple Puree (apple-puree-snack): Missing moodTags
- Avalakki (avalakki-breakfast): Missing moodTags
- Batata Poha (approved-batata-poha): Missing moodTags
- Besan Chilla (besan-chilla-breakfast): Missing moodTags
- Bisibelebath (bisibelebath-lunch): Missing moodTags
- Boiled Corn (boiled-corn-snack): Missing moodTags
- Bonda (bonda-snack): Missing moodTags
- Bread Omelette (bread-omelette-breakfast): Missing moodTags
- Bread Pakora (bread-pakora-snack): Missing moodTags
- Bread Upma (bread-upma): Missing moodTags
- Butter Chicken (butter-chicken-lunch): Missing moodTags
- Chaat (chaat-snack): Missing moodTags
- Cheese Omelette (pantry-cheese-omelette): Missing moodTags
- Cheese Paratha (approved-cheese-paratha): Missing moodTags
- Chicken 555 (chicken-555): Missing moodTags
- Chicken 65 (chicken-65): Missing moodTags
- Chicken Curry (chicken-curry-dinner): Missing moodTags
- Chicken Fried Rice (pantry-chicken-fried-rice): Missing moodTags
- Chicken Majestic (chicken-majestic): Missing moodTags
- Chicken Pulao (chicken-pulao-dinner): Missing moodTags
- Chicken Rice (chicken-rice-dinner): Missing moodTags
- Chicken Roll (chicken-roll-snack): Missing moodTags
- Chicken Stew (chicken-stew-lunch): Missing moodTags
- Chicken Sukka (chicken-sukka): Missing moodTags
- Chilli Chicken (pantry-chilli-chicken): Missing moodTags
- Chilli Mushroom (chilli-mushroom): Missing moodTags
- Chilli Paneer (chilli-paneer): Missing moodTags
- Chole Chawal (chole-chawal-lunch): Missing moodTags
- Coconut Rice (coconut-rice): Missing moodTags
- Dal Makhani (dal-makhani): Missing moodTags
- Dal Rice (dal-rice-lunch): Missing moodTags
- Dal Roti (dal-roti-lunch): Missing moodTags
- Dosa (dosa-breakfast): Missing moodTags
- Dragon Chicken (dragon-chicken): Missing moodTags
- Egg Bhurji (egg-bhurji-dinner): Missing moodTags
- Egg Curry (egg-curry): Missing moodTags
- Egg Curry Rice (egg-curry-rice-lunch): Missing moodTags
- Egg Dosa (pantry-egg-dosa): Missing moodTags
- Egg Fried Rice (egg-fried-rice-breakfast): Missing moodTags
- Egg Paratha (pantry-egg-paratha): Missing moodTags
- Egg Toast (egg-toast): Missing moodTags
- Fish Curry (fish-curry-dinner): Missing moodTags
- Fish Curry Rice (fish-curry-rice-lunch): Missing moodTags
- Fish Fry (fish-fry-dinner): Missing moodTags
- Fish Pakora (fish-pakora-snack): Missing moodTags
- Garlic Chicken (pantry-garlic-chicken): Missing moodTags
- Gujiya (gujiya-festival): Missing moodTags
- Guntur Chicken Fry (guntur-chicken-fry): Missing moodTags
- Guntur Chilli Chicken (guntur-chilli-chicken): Missing moodTags
- Idli (idli-breakfast): Missing moodTags
- Jal Jeera (balance-sprint-2-jal-jeera): Missing moodTags
- Kachori (kachori-snack): Missing moodTags
- Kada Prasad (kada-prasad-festival): Missing moodTags
- Kadai Paneer (pantry-kadai-paneer): Missing moodTags
- Kadhi Chawal (kadhi-chawal-lunch): Missing moodTags
- Keema Fry (keema-fry): Missing moodTags
- Kerala Fish Curry (kerala-fish-curry): Missing moodTags
- Kheema Pav (kheema-pav): Missing moodTags
- Khichdi (khichdi): Missing moodTags
- Kokum Sharbat (balance-sprint-2-kokum-sharbat): Missing moodTags
- Laal Maas (laal-maas): Missing moodTags
- Ladoo (ladoo-festival): Missing moodTags
- Madras Curry (madras-curry): Missing moodTags
- Masala Dosa (pantry-masala-dosa): Missing moodTags
- Masala Omelette (pantry-masala-omelette): Missing moodTags
- Mashed Banana (mashed-banana-snack): Missing moodTags
- Matar Paneer (pantry-matar-paneer): Missing moodTags
- Mathri (mathri-snack): Missing moodTags
- Methi Paratha (methi-paratha-breakfast): Missing moodTags
- Mirapakaya Bajji (mirapakaya-bajji): Missing moodTags
- Mirchi Bajji (mirchi-bajji): Missing moodTags
- Mirchi Ka Salan (mirchi-ka-salan): Missing moodTags
- Mooli Paratha (approved-mooli-paratha): Missing moodTags
- Mushroom Omelette (pantry-mushroom-omelette): Missing moodTags
- Mushroom Pulao (approved-mushroom-pulao): Missing moodTags
- Nattu Kozhi Curry (nattu-kozhi-curry): Missing moodTags
- … 50 more P1 issues omitted for readability.

### P2

- Ajwain Water (sips-detail-ajwain-water): Non-standard mood tag — soothing
- Aloo Capsicum Sabzi (pantry-aloo-capsicum-sabzi): Missing one or more scoring inputs — effortScore/comfortScore/energyScore
- Anarsa (maharashtra-wave-anarsa): Non-standard mood tag — festive
- Apong Rice Drink (northeast-quality-apong-rice-drink): Non-standard mood tag — festive
- Apple Walnut Salad (fresh-plates-detail-apple-walnut-salad): Non-standard mood tag — fresh
- Ariselu (andhra-telangana-wave-26-ariselu): Non-standard mood tag — festive
- Avial (expansion-pack-3-avial): Non-standard mood tag — festive
- Avocado Mash (tiny-tummy-detail-avocado-mash): Non-standard mood tag — gentle
- Avocado Salad (fresh-plates-detail-avocado-salad): Non-standard mood tag — fresh
- Baby Pongal (tiny-tummy-detail-baby-pongal): Non-standard mood tag — gentle
- Badanekayi Ennegayi (karnataka-wave-a-badanekayi-ennegayi): Missing one or more scoring inputs — effortScore/comfortScore/energyScore
- Banana Pancake (lunchbox-detail-banana-pancake): Non-standard mood tag — kids
- Basanti Pulao (bengal-wave-02-basanti-pulao): Non-standard mood tag — festive
- Basundi (collection-detail-basundi): Non-standard mood tag — festive
- Beetroot Mash (tiny-tummy-detail-beetroot-mash): Non-standard mood tag — gentle
- Beetroot Pachadi (kerala-wave-21-beetroot-pachadi): Non-standard mood tag — festive
- Beetroot Salad (fresh-plates-detail-beetroot-salad): Non-standard mood tag — fresh
- Bele Saaru (balance-tier-1-bele-saaru): Non-standard mood tag — soul-food
- Besan Ladoo (collection-detail-besan-ladoo): Non-standard mood tag — festive
- Besan Ladoo (collection-detail-besan-ladoo): Non-standard mood tag — traditional
- Bhetki Paturi (bengal-wave-14-bhetki-paturi): Non-standard mood tag — festive
- Bobbatlu (andhra-telangana-wave-27-bobbatlu): Non-standard mood tag — festive
- Broccoli Salad (fresh-plates-detail-broccoli-salad): Non-standard mood tag — fresh
- Cabbage Salad (fresh-plates-detail-cabbage-salad): Non-standard mood tag — fresh
- Carrot Cucumber Salad (fresh-plates-detail-carrot-cucumber-salad): Non-standard mood tag — fresh
- Carrot Halwa (collection-detail-carrot-halwa): Non-standard mood tag — festive
- Carrot Halwa (collection-detail-carrot-halwa): Non-standard mood tag — traditional
- Carrot Puree (tiny-tummy-detail-carrot-puree): Non-standard mood tag — gentle
- Chakli (collection-detail-chakli): Non-standard mood tag — festive
- Chakli (collection-detail-chakli): Non-standard mood tag — traditional
- Chana Chaat (fresh-plates-detail-chana-chaat): Non-standard mood tag — fresh
- Chapati Jam Roll (lunchbox-detail-chapati-jam-roll): Non-standard mood tag — kids
- Chhanar Dalna (bengal-wave-19-chhanar-dalna): Non-standard mood tag — festive
- Chicken Biryani (collection-detail-chicken-biryani): Non-standard mood tag — festive
- Chicken Biryani (collection-detail-chicken-biryani): Non-standard mood tag — traditional
- Chingri Malai Curry (expansion-pack-3-chingri-malai-curry): Non-standard mood tag — festive
- Chocolate Burfi (collection-detail-chocolate-burfi): Non-standard mood tag — festive
- Cholar Dal (bengal-wave-01-cholar-dal): Non-standard mood tag — festive
- Chow Chow Bath (karnataka-wave-a-chow-chow-bath): Missing one or more scoring inputs — effortScore/comfortScore/energyScore
- Chow Chow Kootu (balance-tier-1-chow-chow-kootu): Non-standard mood tag — soul-food
- Coconut Barfi (collection-detail-coconut-barfi): Non-standard mood tag — festive
- Coconut Barfi (collection-detail-coconut-barfi): Non-standard mood tag — traditional
- Coconut Cucumber Salad (fresh-plates-detail-coconut-cucumber-salad): Non-standard mood tag — fresh
- Coconut Macaroons (collection-detail-coconut-macaroons): Non-standard mood tag — festive
- Congress Kadlekai (karnataka-wave-a-congress-kadlekai): Missing one or more scoring inputs — effortScore/comfortScore/energyScore
- Corn Chaat (corn-chaat): Non-standard mood tag — fresh
- Cucumber Raita Salad (fresh-plates-detail-cucumber-raita-salad): Non-standard mood tag — fresh
- Daab Chingri (bengal-wave-15-daab-chingri): Non-standard mood tag — festive
- Dal Rice Mash (tiny-tummy-detail-dal-rice-mash): Non-standard mood tag — gentle
- Dalia Porridge (tiny-tummy-detail-dalia-porridge): Non-standard mood tag — gentle
- Davangere Benne Dosa (karnataka-wave-a-davangere-benne-dosa): Missing one or more scoring inputs — effortScore/comfortScore/energyScore
- Dharwad Peda (karnataka-wave-a-dharwad-peda): Non-standard mood tag — festival
- Dharwad Peda (karnataka-wave-a-dharwad-peda): Non-standard mood tag — celebration
- Dharwad Peda (karnataka-wave-a-dharwad-peda): Missing one or more scoring inputs — effortScore/comfortScore/energyScore
- Dhokar Dalna (expansion-pack-3-dhokar-dalna): Non-standard mood tag — festive
- Dry Fruit Ladoo (collection-detail-dry-fruit-ladoo): Non-standard mood tag — festive
- Egg Yolk Mash (tiny-tummy-detail-egg-yolk-mash): Non-standard mood tag — gentle
- Ela Ada (kerala-wave-08-ela-ada): Non-standard mood tag — festive
- Elaichi Chai (sips-detail-elaichi-chai): Non-standard mood tag — soothing
- Elaneer Payasam (tamil-nadu-wave-21-elaneer-payasam): Non-standard mood tag — festive
- Ellu Bella (collection-detail-ellu-bella): Non-standard mood tag — festive
- Ellu Bella (collection-detail-ellu-bella): Non-standard mood tag — traditional
- Erissery (kerala-wave-03-erissery): Non-standard mood tag — festive
- Falooda (collection-detail-falooda): Non-standard mood tag — festive
- Filter Coffee (sips-detail-filter-coffee): Non-standard mood tag — soothing
- Fruit Chaat (fresh-plates-detail-fruit-chaat): Non-standard mood tag — fresh
- Ginger Chai (sips-detail-ginger-chai): Non-standard mood tag — soothing
- Green Gram Salad (fresh-plates-detail-green-gram-salad): Non-standard mood tag — fresh
- Gujarati Dal (balance-tier-1-gujarati-dal): Non-standard mood tag — soul-food
- Gulab Jamun (collection-detail-gulab-jamun): Non-standard mood tag — festive
- Gulab Jamun (collection-detail-gulab-jamun): Non-standard mood tag — traditional
- Haleem (collection-detail-haleem): Non-standard mood tag — festive
- Haleem (collection-detail-haleem): Non-standard mood tag — traditional
- Holige (collection-detail-holige): Non-standard mood tag — festive
- Holige (collection-detail-holige): Non-standard mood tag — traditional
- Iyengar Bakery Toast (karnataka-wave-a-iyengar-bakery-toast): Missing one or more scoring inputs — effortScore/comfortScore/energyScore
- Jalebi (collection-detail-jalebi): Non-standard mood tag — festive
- Jalebi (collection-detail-jalebi): Non-standard mood tag — traditional
- Jeera Water (sips-detail-jeera-water): Non-standard mood tag — soothing
- Jigarthanda (tamil-nadu-wave-09-jigarthanda): Non-standard mood tag — festive
- … 155 more P2 issues omitted for readability.

## Generator Compatibility

Total: 0

No issues found.

# Fix Priority

## P0 = Must fix immediately

- Broken/missing image paths, if any.
- Missing IDs/titles, duplicate IDs/sourceIds/titles, if any.
- Missing or invalid collectionHome, if any.
- Missing quickGuide, if any.
- Generator blockers, if any.

## P1 = Fix before Beta 3 release

- Missing meal/diet/region/recipeType metadata.
- Missing or structurally weak pairings.
- Missing required ingredients or pantry metadata.
- Regional Journey mismatches.

## P2 = Cleanup later

- Placeholder images and excessive image reuse.
- Non-standard tags that are intentionally descriptive but not enum-clean.
- Pairing labels that are useful to users but do not map exactly to recipe titles.
- Missing optional ingredients.

# Raw Summary Counts

```json
{
  "summary": {
    "total": 1750,
    "P0": 0,
    "P1": 467,
    "P2": 1283
  },
  "byCategory": {
    "Identity": 0,
    "Metadata": 457,
    "Images": 551,
    "Pairings": 376,
    "Quick Guides": 0,
    "Collections": 0,
    "Journeys": 1,
    "Recommendation Integrity": 365,
    "Generator Compatibility": 0
  }
}
```
