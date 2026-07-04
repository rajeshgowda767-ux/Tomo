# Project Annapurna - Master Audit v1

Generated: 2026-07-02T16:54:29.106Z

Read-only audit generated from `database/generated/recipes.json` with mobile mirror cross-check from `frontend/local-recipes.js`.

## 1. Project Summary
| Metric | Value |
| --- | --- |
| Total recipes | 798 |
| Mobile mirror recipes | 812 |
| Total canonical recipes | 798 |
| Total aliases | 704 |
| Unique aliases | 698 |
| States represented | 26 |
| Union Territories represented | 3 |
| Regions represented | 18 |


## 2. Canonical Integrity
| Check | Count |
| --- | --- |
| Duplicate canonical titles | 0 |
| Duplicate recipe titles | 0 |
| Alias/title conflicts | 7 |
| Duplicate regional recipe candidates | 7 |


## 3. Alias Integrity
| Metric | Count |
| --- | --- |
| Duplicate aliases | 6 |
| Alias collisions | 6 |
| Alias/title conflicts | 7 |
| Alias loops detected | 0 |
| Search mismatches in sampled title/canonical/alias queries | 13 |


### Top Alias Issues
| type | issue | recipes |
| --- | --- | --- |
| Alias collision | pongal | Ven Pongal; Ven Pongal Tiffin Plate |
| Alias collision | ven pongal | Ven Pongal; Ven Pongal Tiffin Plate |
| Alias collision | hyderabadi biryani | Hyderabadi Chicken Biryani; Hyderabadi Dum Biryani |
| Alias collision | hyderabadi chicken dum biryani | Hyderabadi Chicken Biryani; Hyderabadi Dum Biryani |
| Alias collision | medu vada | Minapa Garelu; Medu Vada |
| Alias collision | urad dal vada | Minapa Garelu; Medu Vada |
| Alias/title conflict | chicken rice | alias:Chicken Fried Rice / title:Chicken Rice |
| Alias/title conflict | fish curry rice | alias:Goan Fish Curry / title:Fish Curry Rice |
| Alias/title conflict | holige | alias:Sweet Holige / title:Holige |
| Alias/title conflict | obbattu | alias:Sweet Holige / title:Obbattu |
| Alias/title conflict | vegetable upma | alias:Upma / title:Vegetable Upma |
| Alias/title conflict | pork curry | alias:Coorg Pandi Curry / title:Pork Curry |
| Alias/title conflict | chakli | alias:Murukku / title:Chakli |
| Duplicate alias use | pongal | Ven Pongal; Ven Pongal Tiffin Plate |
| Duplicate alias use | ven pongal | Ven Pongal; Ven Pongal Tiffin Plate |
| Duplicate alias use | hyderabadi biryani | Hyderabadi Chicken Biryani; Hyderabadi Dum Biryani |
| Duplicate alias use | hyderabadi chicken dum biryani | Hyderabadi Chicken Biryani; Hyderabadi Dum Biryani |
| Duplicate alias use | medu vada | Minapa Garelu; Medu Vada |
| Duplicate alias use | urad dal vada | Minapa Garelu; Medu Vada |


## 4. Regional Coverage
| state | recipes | gold | approved | needsReview | strength | tier |
| --- | --- | --- | --- | --- | --- | --- |
| Andhra Pradesh | 58 | 21 | 19 | 2 | Strong | 🟡 Silver |
| Arunachal Pradesh | 7 | 0 | 0 | 0 | Weak | 🟡 Silver |
| Assam | 11 | 0 | 0 | 0 | Medium | 🟡 Silver |
| Bihar | 11 | 11 | 11 | 0 | Medium | 🟢 Gold |
| Chhattisgarh | 0 | 0 | 0 | 0 | Missing | 🔴 Bronze |
| Goa | 16 | 14 | 13 | 1 | Medium | 🟢 Gold |
| Gujarat | 23 | 23 | 23 | 0 | Strong | 🟢 Gold |
| Haryana | 6 | 6 | 6 | 0 | Weak | 🟡 Silver |
| Himachal Pradesh | 6 | 6 | 6 | 0 | Weak | 🟡 Silver |
| Jharkhand | 7 | 7 | 7 | 0 | Weak | 🟡 Silver |
| Karnataka | 64 | 24 | 19 | 5 | Strong | 🟡 Silver |
| Kerala | 43 | 26 | 19 | 7 | Strong | 🟡 Silver |
| Madhya Pradesh | 0 | 0 | 0 | 0 | Missing | 🔴 Bronze |
| Maharashtra | 59 | 26 | 25 | 1 | Strong | 🟡 Silver |
| Manipur | 5 | 0 | 0 | 0 | Weak | 🟡 Silver |
| Meghalaya | 5 | 0 | 0 | 0 | Weak | 🟡 Silver |
| Mizoram | 3 | 0 | 0 | 0 | Weak | 🔴 Bronze |
| Nagaland | 6 | 0 | 0 | 0 | Weak | 🟡 Silver |
| Odisha | 15 | 11 | 11 | 0 | Medium | 🟢 Gold |
| Punjab | 23 | 13 | 13 | 0 | Strong | 🟢 Gold |
| Rajasthan | 23 | 19 | 19 | 0 | Strong | 🟢 Gold |
| Sikkim | 8 | 0 | 0 | 0 | Medium | 🟡 Silver |
| Tamil Nadu | 60 | 29 | 26 | 3 | Strong | 🟡 Silver |
| Telangana | 59 | 14 | 11 | 3 | Strong | 🟡 Silver |
| Tripura | 2 | 0 | 0 | 0 | Weak | 🔴 Bronze |
| Uttar Pradesh | 2 | 0 | 0 | 0 | Weak | 🔴 Bronze |
| Uttarakhand | 7 | 7 | 7 | 0 | Weak | 🟡 Silver |
| West Bengal | 52 | 24 | 24 | 0 | Strong | 🟡 Silver |
| Andaman and Nicobar Islands | 0 | 0 | 0 | 0 | Missing | 🔴 Bronze |
| Chandigarh | 0 | 0 | 0 | 0 | Missing | 🔴 Bronze |
| Dadra and Nagar Haveli and Daman and Diu | 0 | 0 | 0 | 0 | Missing | 🔴 Bronze |
| Delhi | 1 | 0 | 0 | 0 | Weak | 🔴 Bronze |
| Jammu & Kashmir | 7 | 7 | 7 | 0 | Weak | 🟡 Silver |
| Ladakh | 4 | 4 | 4 | 0 | Weak | 🟡 Silver |
| Lakshadweep | 0 | 0 | 0 | 0 | Missing | 🔴 Bronze |
| Puducherry | 0 | 0 | 0 | 0 | Missing | 🔴 Bronze |


## 5. Ingredient Family Coverage
| family | count | states | weak |
| --- | --- | --- | --- |
| Rice | 671 | 29 | Healthy |
| Chicken | 75 | 16 | Healthy |
| Mutton | 24 | 8 | Healthy |
| Fish | 72 | 14 | Healthy |
| Egg | 67 | 13 | Healthy |
| Paneer | 54 | 6 | Healthy |
| Potato | 94 | 21 | Healthy |
| Brinjal | 19 | 10 | Needs breadth |
| Pumpkin | 7 | 4 | Needs breadth |
| Bottle Gourd | 2 | 0 | Needs breadth |
| Ragi | 18 | 5 | Needs breadth |
| Horse Gram | 3 | 4 | Needs breadth |
| Dal | 253 | 25 | Healthy |
| Okra | 3 | 3 | Needs breadth |
| Bread | 562 | 29 | Healthy |


## 6. Recipe Quality
| Field | Missing Count |
| --- | --- |
| quickGuide | 0 |
| foodHeritage | 592 |
| regionalNotes | 592 |
| aliases | 482 |
| englishSubtitle | 586 |
| origin | 586 |
| popularAcross | 586 |
| canonicalTitle | 586 |
| images | 0 |
| pairings/bestWith | 0 |


## 7. Image Audit
| Metric | Count |
| --- | --- |
| Dedicated/non-placeholder image references | 554 |
| Placeholder/default/shared-style image references | 244 |
| Shared image paths | 76 |
| Broken/missing image paths | 0 |


### Top Shared Image Paths
| Path | Recipes |
| --- | --- |
| /assets/images/dishes/homestyle-kitchen-placeholder.png | 188 |
| /assets/images/collections/soups.webp | 37 |
| /assets/images/collections/desserts.webp | 35 |
| /assets/images/collections/festival-food.webp | 21 |
| /assets/images/dishes/dosa-homestyle.png | 15 |
| /assets/images/dishes/recommendation-pack-pepper-rasam.png | 12 |
| /assets/images/dishes/fish-curry.png | 11 |
| /assets/images/dishes/lunch-default.png | 8 |
| /assets/images/dishes/paratha.png | 8 |
| /assets/images/snacks/sandwich.png | 8 |
| /assets/images/dishes/pulao.png | 7 |
| /assets/images/dishes/chicken-curry.png | 6 |
| /assets/images/dishes/mutton-pulao-homestyle.png | 6 |
| /assets/images/dishes/recommendation-pack-egg-sandwich.png | 6 |
| /assets/images/dishes/batch3a-baingan-bharta.png | 5 |
| /assets/images/dishes/batch5-corn-sundal.png | 5 |
| /assets/images/dishes/bread-omelette-homestyle.png | 5 |
| /assets/images/dishes/recommendation-pack-aloo-jeera.png | 4 |
| /assets/images/dishes/batch5-chicken-stew.png | 4 |
| /assets/images/dishes/batch3b-dosakaya-pappu.png | 4 |
| /assets/images/dishes/batch5-fish-fry.png | 4 |
| /assets/images/dishes/batch3a-veg-manchurian.png | 4 |
| /assets/images/salads/salad-default.png | 4 |
| /assets/images/dishes/chicken-sukka-homestyle.png | 3 |
| /assets/images/dishes/dinner-default.png | 3 |
| /assets/images/dishes/batch3a-chilli-chicken.png | 3 |
| /assets/images/dishes/chicken-chettinad-homestyle.png | 3 |
| /assets/images/dishes/dosa.png | 3 |
| /assets/images/dishes/sarson-ka-saag.png | 3 |
| /assets/images/dishes/khichdi.png | 3 |


### Top 100 Recipes Needing Dedicated Images
| Recipe | Image |
| --- | --- |
| Aloo Rice | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Aloo Posto | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Apple Puree | /assets/images/dishes/dinner-default.png |
| Jolada Rotti | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Thatte Idli | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Majjige Huli | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Mangalore Goli Baje | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Dharwad Peda | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Chaat | /assets/images/dishes/dinner-default.png |
| Chicken Capsicum Stir Fry Bowl | /assets/images/dishes/lunch-default.png |
| Chicken Pepper Rice Bowl | /assets/images/dishes/lunch-default.png |
| Chicken Pulao | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Chicken Tomato Rice | /assets/images/dishes/lunch-default.png |
| Dalma | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Egg Tomato Rice Bowl | /assets/images/dishes/breakfast-default.png |
| Garlic Egg Rice | /assets/images/dishes/breakfast-default.png |
| Garlic Paneer Roti Wrap | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Goan Prawn Balchao | /assets/images/dishes/lunch-default.png |
| Gujiya | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Guntur Chilli Chicken | /assets/images/dishes/lunch-default.png |
| Kada Prasad | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Kadhi Pakora | /assets/images/dishes/lunch-default.png |
| Keema Fry | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Kheema Pav | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Madras Curry | /assets/images/dishes/lunch-default.png |
| Mirapakaya Bajji | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Mushroom Pepper Rice Bowl | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Nattu Kozhi Curry | /assets/images/dishes/lunch-default.png |
| Paneer Capsicum Rice Bowl | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Paneer Corn Rice Bowl | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Pork Curry | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Rice Cakes | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Sol Kadhi | /assets/images/drinks/drinks-default.png |
| Sweet Holige | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Sweet Pongal | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Sweet Rice | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Tomato Paneer Rice | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Vegetable Puree | /assets/images/dishes/dinner-default.png |
| Paneer Salad | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Cucumber Raita Salad | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Coconut Cucumber Salad | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Carrot Cucumber Salad | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Mango Salad | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Rasmalai | /assets/images/collections/desserts.webp |
| Kheer | /assets/images/collections/desserts.webp |
| Payasam | /assets/images/collections/desserts.webp |
| Shrikhand | /assets/images/collections/desserts.webp |
| Basundi | /assets/images/collections/desserts.webp |
| Rice Kheer | /assets/images/collections/desserts.webp |
| Kaju Katli | /assets/images/collections/desserts.webp |
| Besan Ladoo | /assets/images/collections/desserts.webp |
| Motichoor Ladoo | /assets/images/collections/desserts.webp |
| Coconut Barfi | /assets/images/collections/desserts.webp |
| Dry Fruit Ladoo | /assets/images/collections/desserts.webp |
| Chocolate Burfi | /assets/images/collections/desserts.webp |
| Gulab Jamun | /assets/images/collections/desserts.webp |
| Roshogolla | /assets/images/collections/desserts.webp |
| Mysore Pak | /assets/images/collections/desserts.webp |
| Jalebi | /assets/images/collections/desserts.webp |
| Phirni | /assets/images/collections/desserts.webp |
| Peda | /assets/images/collections/desserts.webp |
| Sandesh | /assets/images/collections/desserts.webp |
| Kalakand | /assets/images/collections/desserts.webp |
| Malpua | /assets/images/collections/desserts.webp |
| Carrot Halwa | /assets/images/collections/desserts.webp |
| Moong Dal Halwa | /assets/images/collections/desserts.webp |
| Obbattu | /assets/images/collections/desserts.webp |
| Puran Poli | /assets/images/collections/desserts.webp |
| Kulfi | /assets/images/collections/desserts.webp |
| Falooda | /assets/images/collections/desserts.webp |
| Rava Kesari | /assets/images/collections/desserts.webp |
| Sheera | /assets/images/collections/desserts.webp |
| Mango Rice | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Olan | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Mutton Korma | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Pathrode | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Punugulu | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Sarva Pindi | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Pesara Garelu | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Minapa Garelu | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Erissery | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Pazham Pori | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Kanji Payar | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Kerala Beef Fry | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Kerala Parotta Beef Fry | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Ulli Theeyal | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Beetroot Pachadi | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Kaalan | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Mutton Chukka | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Elaneer Payasam | /assets/images/collections/desserts.webp |
| Mishti Doi | /assets/images/collections/desserts.webp |
| Nolen Gurer Payesh | /assets/images/collections/desserts.webp |
| Jhalmuri | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Telebhaja | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Potol Dorma | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Koraishutir Kochuri | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Kothimbir Vadi | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Sabudana Vada | /assets/images/dishes/homestyle-kitchen-placeholder.png |
| Anarsa | /assets/images/collections/desserts.webp |
| Karadantu | /assets/images/collections/desserts.webp |


## 8. Search Audit
| query | expected | actual |
| --- | --- | --- |
| Chicken Rice | Chicken Fried Rice | Chicken Rice |
| Fish Curry Rice | Goan Fish Curry | Fish Curry Rice |
| Holige | Sweet Holige | Holige |
| Obbattu | Sweet Holige | Obbattu |
| Vegetable Upma | Upma | Vegetable Upma |
| Ven Pongal | Ven Pongal Tiffin Plate | Ven Pongal |
| Pongal | Ven Pongal Tiffin Plate | Ven Pongal |
| Pork Curry | Coorg Pandi Curry | Pork Curry |
| Medu Vada | Minapa Garelu | Medu Vada |
| Urad Dal Vada | Medu Vada | Minapa Garelu |
| Chakli | Murukku | Chakli |
| Hyderabadi Biryani | Hyderabadi Dum Biryani | Hyderabadi Chicken Biryani |
| Hyderabadi Chicken Dum Biryani | Hyderabadi Dum Biryani | Hyderabadi Chicken Biryani |


## 9. Collections Audit
| collection | count | placeholders | regional |
| --- | --- | --- | --- |
| Festival Sweets | 64 | 38 | 15 |
| North & West India | 53 | 3 | 9 |
| Andhra & Telangana | 47 | 15 | 3 |
| Karnataka | 44 | 7 | 5 |
| Chutneys, Salads & Add-ons | 43 | 7 | 8 |
| Tamil Nadu | 42 | 10 | 4 |
| Warm & Light Bowls | 34 | 2 | 8 |
| Bengal | 33 | 12 | 2 |
| Sides, Salads & Add-ons | 32 | 6 | 12 |
| Daily Comforts | 30 | 4 | 0 |
| Kerala | 30 | 10 | 2 |
| Tiny Tummy Favorites | 29 | 2 | 0 |
| Maharashtra | 27 | 7 | 1 |
| Northeast | 26 | 2 | 9 |
| Summer Cooling | 25 | 2 | 6 |
| Healthy Plates | 23 | 7 | 1 |
| Tea Time Favourites | 21 | 4 | 4 |
| Lunch Box & Tiffin | 18 | 0 | 1 |
| Rajasthan | 17 | 17 | 2 |
| Global Soups | 16 | 0 | 0 |
| Global Snacks | 14 | 2 | 0 |
| Gujarat | 14 | 14 | 1 |
| Global Mains | 13 | 1 | 1 |
| Global Bowls | 11 | 0 | 0 |
| Global Breakfasts | 11 | 0 | 0 |
| Goa | 11 | 11 | 2 |
| Global Street Food | 10 | 1 | 0 |
| Odisha | 9 | 9 | 1 |
| Jharkhand | 7 | 7 | 1 |
| Punjab | 7 | 7 | 1 |
| Uttarakhand | 7 | 7 | 1 |
| Jammu & Kashmir | 7 | 7 | 1 |
| Bihar | 6 | 6 | 1 |
| Himachal Pradesh | 6 | 6 | 1 |
| Haryana | 5 | 5 | 1 |
| Ladakh | 3 | 3 | 1 |
| Regional Sweets | 2 | 2 | 2 |
| Prasadam & Temple Foods | 1 | 1 | 1 |


## 10. Kitchen Audit
Ingredient family breadth is strong for rice, dal, chicken, fish, potato and bread. Weakness remains in egg, horse gram, bottle gourd, pumpkin, ragi, and some regional vegetable combinations.

| Opportunity |
| --- |
| Brinjal: add region-specific brinjal dishes in undercovered states |
| Pumpkin: add region-specific pumpkin dishes in undercovered states |
| Bottle Gourd: add region-specific bottle gourd dishes in undercovered states |
| Ragi: add region-specific ragi dishes in undercovered states |
| Horse Gram: add region-specific horse gram dishes in undercovered states |
| Okra: add region-specific okra dishes in undercovered states |
| Arunachal Pradesh: add foundational regional recipes and images |
| Chhattisgarh: add foundational regional recipes and images |
| Haryana: add foundational regional recipes and images |
| Himachal Pradesh: add foundational regional recipes and images |
| Jharkhand: add foundational regional recipes and images |
| Madhya Pradesh: add foundational regional recipes and images |
| Manipur: add foundational regional recipes and images |
| Meghalaya: add foundational regional recipes and images |
| Mizoram: add foundational regional recipes and images |
| Nagaland: add foundational regional recipes and images |
| Tripura: add foundational regional recipes and images |
| Uttar Pradesh: add foundational regional recipes and images |
| Uttarakhand: add foundational regional recipes and images |
| Andaman and Nicobar Islands: add foundational regional recipes and images |
| Chandigarh: add foundational regional recipes and images |
| Dadra and Nagar Haveli and Daman and Diu: add foundational regional recipes and images |
| Delhi: add foundational regional recipes and images |
| Jammu & Kashmir: add foundational regional recipes and images |
| Ladakh: add foundational regional recipes and images |
| Lakshadweep: add foundational regional recipes and images |
| Puducherry: add foundational regional recipes and images |


## 11. Project Annapurna Scorecard
| state | tier | recipes | approved | gold | strength |
| --- | --- | --- | --- | --- | --- |
| Andhra Pradesh | 🟡 Silver | 58 | 19 | 21 | Strong |
| Arunachal Pradesh | 🟡 Silver | 7 | 0 | 0 | Weak |
| Assam | 🟡 Silver | 11 | 0 | 0 | Medium |
| Bihar | 🟢 Gold | 11 | 11 | 11 | Medium |
| Chhattisgarh | 🔴 Bronze | 0 | 0 | 0 | Missing |
| Goa | 🟢 Gold | 16 | 13 | 14 | Medium |
| Gujarat | 🟢 Gold | 23 | 23 | 23 | Strong |
| Haryana | 🟡 Silver | 6 | 6 | 6 | Weak |
| Himachal Pradesh | 🟡 Silver | 6 | 6 | 6 | Weak |
| Jharkhand | 🟡 Silver | 7 | 7 | 7 | Weak |
| Karnataka | 🟡 Silver | 64 | 19 | 24 | Strong |
| Kerala | 🟡 Silver | 43 | 19 | 26 | Strong |
| Madhya Pradesh | 🔴 Bronze | 0 | 0 | 0 | Missing |
| Maharashtra | 🟡 Silver | 59 | 25 | 26 | Strong |
| Manipur | 🟡 Silver | 5 | 0 | 0 | Weak |
| Meghalaya | 🟡 Silver | 5 | 0 | 0 | Weak |
| Mizoram | 🔴 Bronze | 3 | 0 | 0 | Weak |
| Nagaland | 🟡 Silver | 6 | 0 | 0 | Weak |
| Odisha | 🟢 Gold | 15 | 11 | 11 | Medium |
| Punjab | 🟢 Gold | 23 | 13 | 13 | Strong |
| Rajasthan | 🟢 Gold | 23 | 19 | 19 | Strong |
| Sikkim | 🟡 Silver | 8 | 0 | 0 | Medium |
| Tamil Nadu | 🟡 Silver | 60 | 26 | 29 | Strong |
| Telangana | 🟡 Silver | 59 | 11 | 14 | Strong |
| Tripura | 🔴 Bronze | 2 | 0 | 0 | Weak |
| Uttar Pradesh | 🔴 Bronze | 2 | 0 | 0 | Weak |
| Uttarakhand | 🟡 Silver | 7 | 7 | 7 | Weak |
| West Bengal | 🟡 Silver | 52 | 24 | 24 | Strong |
| Andaman and Nicobar Islands | 🔴 Bronze | 0 | 0 | 0 | Missing |
| Chandigarh | 🔴 Bronze | 0 | 0 | 0 | Missing |
| Dadra and Nagar Haveli and Daman and Diu | 🔴 Bronze | 0 | 0 | 0 | Missing |
| Delhi | 🔴 Bronze | 1 | 0 | 0 | Weak |
| Jammu & Kashmir | 🟡 Silver | 7 | 7 | 7 | Weak |
| Ladakh | 🟡 Silver | 4 | 4 | 4 | Weak |
| Lakshadweep | 🔴 Bronze | 0 | 0 | 0 | Missing |
| Puducherry | 🔴 Bronze | 0 | 0 | 0 | Missing |


## 12. Beta 3 Readiness
| Category | Items |
| --- | --- |
| Status | Needs Attention |
| Ready | Regional naming framework and major audited states are substantially represented. |
| Needs Attention | High placeholder image count; Many recipes missing foodHeritage; Many recipes missing regionalNotes; Alias cleanup needed |
| Blockers | Alias collisions exist |


## Terminal Summary
| Metric | Value |
| --- | --- |
| Total recipes | 798 |
| States completed/represented | 26 |
| Canonical conflicts | 0 |
| Alias conflicts | 6 |
| Placeholder image count | 244 |
| Missing metadata total | 4010 |
| Gold states | 6 |
| Silver states | 19 |
| Bronze states | 11 |
| Beta 3 readiness | Needs Attention |

## Alias Resolution Report

Generated: 2026-07-02T17:10:00+05:30

### Summary
| Metric | Before | After |
| --- | ---: | ---: |
| Duplicate alias conflicts | 6 | 0 |
| Duplicate canonical titles | 0 | 0 |
| Duplicate recipe titles | 0 | 0 |

### Fixed Aliases
| Alias | Kept On | Removed From | Decision | Reason |
| --- | --- | --- | --- | --- |
| Pongal | Ven Pongal | Ven Pongal Tiffin Plate | REMOVE duplicate | Canonical dish owns the broad alias; tiffin plate keeps only plate-specific alias. |
| Ven Pongal | Ven Pongal | Ven Pongal Tiffin Plate | REMOVE duplicate | Canonical dish owns the dish-name alias. |
| Hyderabadi Biryani | Hyderabadi Dum Biryani | Hyderabadi Chicken Biryani | MOVE | Project Annapurna treats dum biryani as the distinct canonical Hyderabadi identity. |
| Hyderabadi Chicken Dum Biryani | Hyderabadi Dum Biryani | Hyderabadi Chicken Biryani | MOVE | Dum-specific alias belongs to Hyderabadi Dum Biryani only. |
| Medu Vada | Medu Vada | Minapa Garelu | MOVE | Tamil/common canonical Medu Vada owns this alias; Minapa Garelu keeps Telugu-specific aliases. |
| Urad Dal Vada | Medu Vada | Minapa Garelu | MOVE | Generic urad-dal vada alias should resolve to Medu Vada only. |
| Chicken Rice | Chicken Rice | Chicken Fried Rice | REMOVE duplicate | Existing canonical recipe title owns the exact query. |
| Fish Curry Rice | Fish Curry Rice | Goan Fish Curry | REMOVE duplicate | Existing canonical recipe title owns the exact query. |
| Vegetable Upma | Vegetable Upma | Upma | REMOVE duplicate | Existing canonical recipe title owns the exact query. |
| Pork Curry | Pork Curry | Coorg Pandi Curry | REMOVE duplicate | Sensitive/generic pork title remains separate from regional Coorg dish. |
| Chakli | Chakli | Murukku | REMOVE duplicate | Existing canonical recipe title owns the exact query. |

### Search Resolution Spot Check
| Query | Resolves To |
| --- | --- |
| Puran Poli | Puran Poli |
| Puliyodarai | Puliyogare |
| Elumichai Sadam | Chitranna |
| Pongal | Ven Pongal |
| Ven Pongal | Ven Pongal |
| Hyderabadi Biryani | Hyderabadi Dum Biryani |
| Hyderabadi Chicken Dum Biryani | Hyderabadi Dum Biryani |
| Medu Vada | Medu Vada |
| Urad Dal Vada | Medu Vada |
| Chicken Rice | Chicken Rice |
| Fish Curry Rice | Fish Curry Rice |
| Vegetable Upma | Vegetable Upma |
| Pork Curry | Pork Curry |
| Chakli | Chakli |

### Remaining Issues
| Issue | Status | Note |
| --- | --- | --- |
| Holige / Obbattu title overlap | Remaining title-overlap issue | Sweet Holige keeps Karnataka aliases Holige and Obbattu per Project Annapurna intent, but existing recipe titles Holige and Obbattu still exist. Resolving this fully would require non-alias recipe/title cleanup, which is outside this task. |

Final duplicate alias conflict count: **0**.
