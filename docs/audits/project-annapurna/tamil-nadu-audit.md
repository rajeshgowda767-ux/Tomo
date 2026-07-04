# Project Annapurna - Task 7: Tamil Nadu Recipe Audit

Date: 2026-07-02

Mode: read-only authenticity audit. No recipe data, generated data, engines, scoring, ranking, analytics, desktop, collections, UI, or recommendation files were modified.

## 1. Executive Summary

- Active recipes scanned: 670
- Tamil Nadu / Chettinad / Kongu / Madurai / Chennai-associated recipes audited: 52
- Gold-list entries found exactly or partially: 17 / 29
- Safe rename candidates: 3
- Recipe-fix-required candidates: 24
- Missing gold recipes: 12
- Wrong associations / do-not-convert rows: 5
- Approved additions: 9
- Local review items: 8
- Rejected proposals: 6

Status legend: ✅ KEEP, 🔄 SAFE_RENAME, 🛠 RECIPE_FIX_REQUIRED, ➕ MISSING_GOLD_RECIPE, ❌ WRONG_ASSOCIATION.

Confidence legend: 🟢 APPROVED, 🟡 NEEDS_LOCAL_REVIEW, 🔴 REJECT.

Top finding: Tamil Nadu has broad coverage across breakfast, rice, kuzhambu, sweets, snacks, and non-veg dishes. The safest Beta 3 work is not mass regionalization; it is a small set of obvious Tamil canonical names plus a few truly missing iconic dishes. Many records are authentic in concept but currently polluted by pairing/context ingredients such as `rice`, `sambar`, `chutney`, `dosa`, `parotta`, `filter coffee`, or generic placeholder images.

## 2. Existing Tamil Nadu Recipes

For KEEP and SAFE_RENAME rows, Primary Name, English Subtitle, Aliases, Origin, Popular Across, and Confidence are included for future naming work.

| Current Recipe Name | Category | Ingredients | Quick Guide | Region Tags | Image | Status | Primary Name | English Subtitle | Aliases | Origin | Popular Across | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---:|
| Adai | Breakfast / dinner | mixed dals; rice; red chilli; curry leaves; onion; coconut chutney; avial | Soak rice and dals; grind coarse; cook thick on tawa until crisp. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/adai.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Adai Avial | Breakfast / combo | adai; avial; mixed dals; rice; coconut; curd | Prepare adai and avial; serve together. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/avial.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Beans Poriyal | Side | green beans; coconut; mustard seeds; urad dal; curry leaves | Temper, cook beans, finish with coconut. | Tamil Nadu | /assets/images/dishes/batch5-beans-poriyal.png | ✅ KEEP | Beans Poriyal | Beans coconut stir-fry | Beans Poriyal, Beans Poriyal Curry | Tamil Nadu | Tamil Nadu | 0.86 |
| Chettinad Chicken Curry | Chicken curry | chicken; chettinad masala; onion; tomato; coconut; pepper; fennel; rice; dosa | Roast coconut, pepper and fennel; simmer chicken in ground masala. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/chicken-chettinad-homestyle.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Chettinad Pepper Chicken | Chicken fry | chicken; black pepper; onion; curry leaves; fennel; ginger garlic; rice | Marinate, saute aromatics, roast dry, finish with pepper. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/chicken-chettinad-homestyle.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Chicken 65 | Snack | chicken; red chilli; curd; curry leaves | Marinate with curd/spices/cornflour; fry; toss with curry leaves. | Tamil Nadu / Chennai | /assets/images/snacks/chicken-65.png | ✅ KEEP | Chicken 65 | Spicy fried chicken bites | Chicken 65, Chennai Chicken 65 | Chennai / Tamil Nadu | Tamil Nadu, South India | 0.82 |
| Chitranna | Rice | rice; lemon; peanut | Temper mustard, dal and peanuts; add turmeric, rice and lemon. | Tamil Nadu / Karnataka | /assets/images/dishes/chitranna-lemon-rice.png | ❌ WRONG_ASSOCIATION | — | — | — | — | — | — |
| Chow Chow Kootu | Side | chow chow; moong dal; coconut; cumin; green chilli; curry leaves | Cook dal and vegetable; add coconut-cumin paste; temper. | Tamil Nadu | /assets/images/dishes/batch3b-chow-chow-kootu.png | ✅ KEEP | Chow Chow Kootu | Chayote dal-coconut kootu | Chow Chow Kootu, Chayote Kootu | Tamil Nadu | Tamil Nadu | 0.88 |
| Coconut Rice | Rice | rice; coconut; curry leaves; mustard seeds; peanut | Temper mustard, peanuts and curry leaves; add coconut and rice. | Tamil Nadu | /assets/images/dishes/batch5-coconut-rice.png | 🔄 SAFE_RENAME | Thengai Sadam | Coconut rice | Coconut Rice, Thengai Sadam, Thengai Saadam | Tamil Nadu | Tamil Nadu, South India | 0.90 |
| Coconut Sevai | Breakfast / snack | sevai; coconut; mustard seeds; curry leaves; green chilli; jaggery; chutney | Temper, fold sevai with coconut; serve savory. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/batch5-coconut-rice.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Corn Sundal | Snack | corn; coconut; mustard seeds; curry leaves; green chilli | Boil corn; temper; toss with coconut. | Tamil Nadu | /assets/images/dishes/batch5-corn-sundal.png | ✅ KEEP | Corn Sundal | Tempered corn snack | Corn Sundal, Sweet Corn Sundal | Tamil Nadu | Tamil Nadu | 0.78 |
| Elaneer Payasam | Dessert / drink | tender coconut; milk; condensed milk; cardamom; coconut water | Chop tender coconut; mix with chilled milk and coconut water. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/collections/desserts.webp | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Fish Fry Tamil Style | Fish fry | fish; red chilli; turmeric; lemon; rice flour; curry leaves | Coat fish and pan fry crisp. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/batch5-fish-fry.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Gunpowder Idli | Breakfast | idli rice; urad dal; podi; onion; curry leaves; garlic; ginger | Generic idli guidance. | Andhra / Tamil Nadu | /assets/images/dishes/gunpowder-idli.png | ❌ WRONG_ASSOCIATION | — | — | — | — | — | — |
| Jigarthanda | Drink | milk; nannari syrup; badam pisin; ice cream; summer cooler | Soak badam pisin; layer nannari, milk, badam pisin and ice cream. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/collections/healthy-drinks.webp | ✅ KEEP | Jigarthanda | Madurai milk cooler | Jigarthanda, Madurai Jigarthanda | Madurai | Tamil Nadu | 0.86 |
| Kanchipuram Idli | Breakfast | idli rice; urad dal; pepper; cumin; ginger; curry leaves; cashews; sambar; chutney | Ferment batter; season with pepper/cumin/ginger/curry leaves; steam. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/recommendation-pack-idli.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Kari Dosa | Dinner / snack | dosa batter; mutton keema; egg; onion; pepper; salna | Spread dosa; top with cooked keema and egg; serve with salna. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/dosa-homestyle.png | ✅ KEEP | Kari Dosa | Madurai meat dosa | Kari Dosa, Madurai Kari Dosa | Madurai | Tamil Nadu | 0.82 |
| Keerai Masiyal | Greens | keerai; moong dal; garlic; cumin; ghee; rice | Cook greens and dal; mash; temper; serve with rice. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/tamil-nadu-wave-19-keerai-masiyal.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Kollu Rasam | Rasam | horse gram; tamarind; pepper; cumin; garlic; curry leaves; mustard seeds | Cook horse gram; simmer stock with tamarind and spices; temper. | Tamil Nadu | /assets/images/collections/soups.webp | ✅ KEEP | Kollu Rasam | Horse gram rasam | Kollu Rasam, Horse Gram Rasam | Tamil Nadu | Tamil Nadu, South India | 0.82 |
| Kongunadu Chicken Curry | Chicken curry | chicken; coconut; shallots; fennel; curry leaves; rice | Roast coconut/spices; saute shallots; simmer chicken. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/chicken-chettinad-homestyle.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Kootu | Vegetarian curry | vegetables; moong dal; coconut; cumin; curry leaves; rice | Cook dal/veg; simmer with coconut paste; temper. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/batch3b-chow-chow-kootu.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Kozhukattai | Sweet / festival | rice flour; coconut; jaggery; cardamom; sesame oil | Make dough; fill with coconut-jaggery; steam. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/collections/festival-food.webp | ✅ KEEP | Kozhukattai | Steamed rice dumpling | Kozhukattai, Modakam | Tamil Nadu | Tamil Nadu, South India | 0.84 |
| Kuzhi Paniyaram | Breakfast / snack | idli batter; onion; mustard seeds; curry leaves; green chilli; coconut chutney; sambar | Temper aromatics; mix batter; cook in paniyaram pan. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/kuzhi-paniyaram.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Lemon Sevai | Breakfast / snack | sevai; lemon; mustard seeds; peanuts; curry leaves; green chilli; coconut chutney | Temper, add sevai, switch off and add lemon. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/batch3b-lemon-rice.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Madras Curry | Curry | chicken; Madras curry powder; tomato; coconut milk | Generic curry guidance. | Tamil Nadu / Madras | /assets/images/dishes/lunch-default.png | ❌ WRONG_ASSOCIATION | — | — | — | — | — | — |
| Mango Rice | Rice | cooked rice; raw mango; peanuts; mustard seeds; curry leaves; turmeric | Temper, saute mango, mix with rice. | South Indian; collection Tamil Nadu | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🟡 NEEDS_LOCAL_REVIEW | — | — | — | — | — | — |
| Meen Kuzhambu | Fish curry | fish; tamarind; shallots; tomato; curry leaves; rice | Make tamarind base; simmer fish; rest before serving. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/fish-curry.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Mor Kuzhambu | Curd curry | curd; ash gourd; coconut; cumin; green chilli; curry leaves; rice; poriyal | Cook ash gourd; grind coconut/cumin/chilli; warm curd gently; temper. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/mor-kuzhambu.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Mutton Chukka | Mutton fry | mutton; black pepper; onion; curry leaves; ginger garlic; parotta | Cook mutton; roast with onion and pepper; serve with parotta. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Nandu Rasam | Seafood rasam | crab; tamarind; pepper; cumin; garlic; curry leaves; rice | Simmer crab with pepper-cumin-garlic tamarind rasam. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/recommendation-pack-pepper-rasam.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Nattu Kozhi Curry | Chicken curry | country chicken; black pepper; shallots; curry leaves | Marinate, roast masala, simmer chicken. | Tamil Nadu | /assets/images/dishes/lunch-default.png | ✅ KEEP | Nattu Kozhi Curry | Country chicken curry | Nattu Kozhi Curry, Country Chicken Curry | Tamil Nadu | Tamil Nadu | 0.80 |
| Neer Mor | Drink | curd; water; ginger; curry leaves; green chilli | Whisk curd with water; season; serve chilled. | Tamil Nadu | /assets/images/drinks/buttermilk-homestyle.png | ✅ KEEP | Neer Mor | Spiced buttermilk | Neer Mor, Spiced Buttermilk | Tamil Nadu | Tamil Nadu, South India | 0.84 |
| Paruppu Urundai Kuzhambu | Kuzhambu | toor dal; tamarind; red chilli; curry leaves; rice | Shape dal balls, steam, simmer in tamarind gravy. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/recommendation-pack-pepper-rasam.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Peanut Sundal | Snack | peanut; coconut; curry leaves; mustard seeds; onion | Temper, add boiled peanuts, finish coconut. | Tamil Nadu | /assets/images/dishes/consistency-45-peanut-sundal.png | ✅ KEEP | Peanut Sundal | Tempered peanut snack | Peanut Sundal, Verkadalai Sundal | Tamil Nadu | Tamil Nadu | 0.80 |
| Pepper Rasam | Rasam | pepper; tamarind; cumin; garlic; tomato; curry leaves; mustard seeds | Crush pepper/cumin/garlic; simmer tamarind; temper. | Tamil Nadu / South India | /assets/images/dishes/recommendation-pack-pepper-rasam.png | ✅ KEEP | Milagu Rasam | Pepper rasam | Pepper Rasam, Milagu Rasam | Tamil Nadu / South India | South India | 0.78 |
| Pongal | Breakfast | rice; moong dal | Cook soft; temper ghee, cumin, pepper and ginger. | Tamil Nadu | /assets/images/dishes/recommendation-pack-pongal.png | 🔄 SAFE_RENAME | Ven Pongal | Savory rice and moong dal pongal | Pongal, Ven Pongal, Khara Pongal | Tamil Nadu | Tamil Nadu, South India | 0.88 |
| Poondu Kuzhambu | Kuzhambu | garlic; tamarind; shallots; sesame oil; curry leaves; rice | Saute garlic/shallots; simmer tamarind gravy until glossy. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/recommendation-pack-pepper-rasam.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Poriyal | Side | vegetables; coconut; mustard seeds; curry leaves; urad dal; rice | Temper; cook veg; finish coconut. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/batch5-beans-poriyal.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Puli Kuzhambu | Kuzhambu | tamarind; vegetables; sambar powder; shallots; curry leaves; sesame oil; rice | Saute shallots/veg; simmer in tamarind. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/recommendation-pack-pepper-rasam.png | ✅ KEEP | Puli Kuzhambu | Tamarind vegetable curry | Puli Kuzhambu, Kara Kuzhambu | Tamil Nadu | Tamil Nadu | 0.80 |
| Puliyogare | Rice | rice; tamarind; peanut; curry leaves; mustard seeds; sesame oil; chilli | Temper, cook tamarind paste, mix rice. | Karnataka / Tamil Nadu | /assets/images/dishes/batch3b-puliyogare.png | ❌ WRONG_ASSOCIATION | — | — | — | — | — | — |
| Rasam Rice | Rice | rice; tomato; tamarind | Warm rasam and mix hot rice. | Tamil Nadu / South India | /assets/images/dishes/batch3b-rasam-rice.png | ✅ KEEP | Rasam Sadam | Rasam rice | Rasam Rice, Rasam Sadam | Tamil Nadu / South India | South India | 0.76 |
| Rava Kesari | Sweet | rava; sugar; ghee; cashews; cardamom; filter coffee | Roast rava; cook with hot water; add sugar/cardamom; finish cashews. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/collections/desserts.webp | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Sakkarai Pongal | Sweet | rice; moong dal; jaggery; ghee; cashews; cardamom | Cook rice/dal; add jaggery; finish ghee and cashews. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/collections/festival-food.webp | ✅ KEEP | Sakkarai Pongal | Sweet jaggery pongal | Sakkarai Pongal, Chakkara Pongal, Sweet Pongal | Tamil Nadu | Tamil Nadu, South India | 0.86 |
| Sambar Rice | Rice | rice; toor dal; drumstick | Cook vegetables with tamarind/sambar powder; mix dal and rice; temper. | Tamil Nadu / South India | /assets/images/dishes/batch3b-sambar-rice.png | 🔄 SAFE_RENAME | Sambar Sadam | Sambar rice | Sambar Rice, Sambar Sadam | Tamil Nadu / South India | Tamil Nadu, South India | 0.82 |
| Sundakkai Vathal Kuzhambu | Kuzhambu | sundakkai vathal; tamarind; sesame oil; sambar powder; curry leaves; rice | Fry vathal; simmer tamarind gravy until thick. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/recommendation-pack-pepper-rasam.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Sundal | Snack | chana; coconut | Temper cooked chana; add coconut. | Tamil Nadu | /assets/images/dishes/batch7-sundal.png | ✅ KEEP | Sundal | Tempered chickpea snack | Sundal, Chana Sundal | Tamil Nadu | Tamil Nadu, South India | 0.78 |
| Sweet Pongal | Sweet | rice; moong dal; ghee | Cook rice/dal; add jaggery; finish cardamom/nuts. | Tamil Nadu | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Thayir Sadam | Rice | rice; curd; mustard seeds; curry leaves; ginger; pickle | Cook rice soft; mix curd; temper; serve with pickle. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/batch3b-curd-rice.png | ✅ KEEP | Thayir Sadam | Tempered curd rice | Curd Rice, Thayir Sadam | Tamil Nadu | Tamil Nadu, South India | 0.88 |
| Tomato Rasam | Rasam | tomato; tamarind; rasam powder; pepper; cumin; curry leaves; mustard seeds | Simmer tomato/tamarind; temper. | Tamil Nadu | /assets/images/collections/soups.webp | ✅ KEEP | Thakkali Rasam | Tomato rasam | Tomato Rasam, Thakkali Rasam | Tamil Nadu / South India | South India | 0.78 |
| Vatha Kuzhambu | Kuzhambu | tamarind; vathal; sambar powder; sesame oil; curry leaves; rice; appalam | Fry vathal; simmer tamarind gravy; serve with rice. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/recommendation-pack-pepper-rasam.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — | — |
| Ven Pongal | Breakfast | rice; moong dal; ghee; black pepper; cumin; ginger; cashews; coconut chutney; sambar | Cook rice/dal soft; temper pepper/cumin/ginger/cashews in ghee. | Tamil Nadu, Chettinad, Kongu Nadu | /assets/images/dishes/recommendation-pack-pongal.png | ✅ KEEP | Ven Pongal | Savory rice and moong dal pongal | Ven Pongal, Khara Pongal | Tamil Nadu | Tamil Nadu, South India | 0.90 |

## 3. Safe Renames

| Current | Recommended primary name | English subtitle | Aliases | Origin | Popular across | Confidence | Authenticity notes |
|---|---|---|---|---|---|---:|---|
| Coconut Rice | Thengai Sadam | Coconut rice | Coconut Rice, Thengai Sadam, Thengai Saadam | Tamil Nadu | Tamil Nadu, South India | 0.90 | Recipe profile matches: cooked rice, coconut, mustard tempering, curry leaves and peanuts. |
| Pongal | Ven Pongal | Savory rice and moong dal pongal | Pongal, Ven Pongal, Khara Pongal | Tamil Nadu | Tamil Nadu, South India | 0.88 | Current generic `Pongal` is savory rice-dal with pepper/cumin/ghee tempering; safe to canonicalize as Ven Pongal. |
| Sambar Rice | Sambar Sadam | Sambar rice | Sambar Rice, Sambar Sadam | Tamil Nadu / South India | Tamil Nadu, South India | 0.82 | Current recipe method matches sambar sadam enough, though quantities are placeholder-like. |

Not safe as immediate renames:

| Proposal | Decision | Reason |
|---|---|---|
| Chettinad Chicken Curry -> Chicken Chettinad | 🟡 NEEDS_LOCAL_REVIEW | Dish is real and close, but current ingredients include pairing/context items `rice` and `dosa`; clean first. |
| Meen Kuzhambu -> Tamil Meen Kuzhambu | 🟡 NEEDS_LOCAL_REVIEW | Already well named; fix image/context ingredients before strengthening. |
| Puliyogare -> Puliyodarai | 🔴 REJECT | Current record is Karnataka collection after Karnataka work; add Tamil Puliyodarai separately if needed. |
| Chitranna -> Elumichai Sadam | 🔴 REJECT | Current record is Karnataka canonical; do not convert. |

## 4. Recipe Fix Required

| Recipe | Why fix is required | Suggested direction | Validation |
|---|---|---|---|
| Adai | `coconut chutney` and `avial` are pairings, not ingredients. | Keep Adai; move accompaniments to pairings. | 🟢 APPROVED cleanup |
| Adai Avial | Combo dish duplicates Adai and Avial; image is Avial. | Keep as combo only if collections need it; do not treat as standalone gold replacement. | 🟡 NEEDS_LOCAL_REVIEW |
| Chettinad Chicken Curry | Strong Chettinad profile but ingredient pollution and title/gold mismatch. | Clean ingredients; then consider canonical `Chicken Chettinad`. | 🟡 NEEDS_LOCAL_REVIEW |
| Chettinad Pepper Chicken | Plausible, but image duplicates Chettinad curry and has `rice` ingredient. | Clean and distinguish from Chicken Chettinad. | 🟡 NEEDS_LOCAL_REVIEW |
| Coconut Sevai | `jaggery` and `chutney` appear as context/pairing; image is coconut rice. | Clean ingredients and image. | 🟡 NEEDS_LOCAL_REVIEW |
| Elaneer Payasam | Real dessert, but not on gold list and image is generic desserts. | Keep as later quality fix. | 🟡 NEEDS_LOCAL_REVIEW |
| Fish Fry Tamil Style | Generic title; gold list asks specific Nethili/Vanjaram fries. | Keep generic or split later into specific fish variants. | 🟡 NEEDS_LOCAL_REVIEW |
| Kanchipuram Idli | Authentic dish, but `sambar`/`chutney` are ingredients and image is generic idli. | Clean ingredients and add proper image; still high-value. | 🟢 APPROVED cleanup |
| Keerai Masiyal | Good identity, but `rice` is pairing/context. | Clean and keep. | 🟢 APPROVED cleanup |
| Kongunadu Chicken Curry | Real regional identity but shares Chettinad image and includes `rice`. | Clean before promotion. | 🟡 NEEDS_LOCAL_REVIEW |
| Kootu | Good generic Tamil identity, but `rice` is context and duplicates Chow Chow Kootu. | Keep generic only if used as family record; otherwise prefer specific kootu. | 🟡 NEEDS_LOCAL_REVIEW |
| Kuzhi Paniyaram | Strong gold-list dish; `chutney` and `sambar` are pairings. | Clean ingredients, keep title. | 🟢 APPROVED cleanup |
| Lemon Sevai | Good Tamil tiffin, but `coconut chutney` is pairing. | Clean later. | 🟡 NEEDS_LOCAL_REVIEW |
| Meen Kuzhambu | Strong gold-list dish; `rice` is pairing/context and image generic fish curry. | Clean and image later; keep title. | 🟢 APPROVED cleanup |
| Mor Kuzhambu | Strong gold-list dish; `rice` and `poriyal` are pairing/context. | Clean and keep. | 🟢 APPROVED cleanup |
| Mutton Chukka | Strong gold-list dish; `parotta` is pairing and image placeholder. | Clean and keep. | 🟢 APPROVED cleanup |
| Nandu Rasam | Real coastal/Tamil dish but not gold-list core; `rice` context and generic image. | Keep for later local review. | 🟡 NEEDS_LOCAL_REVIEW |
| Paruppu Urundai Kuzhambu | Authentic but `rice` context and generic rasam image. | Clean later. | 🟡 NEEDS_LOCAL_REVIEW |
| Poondu Kuzhambu | Authentic but generic image and `rice` context. | Clean later. | 🟡 NEEDS_LOCAL_REVIEW |
| Poriyal | Good generic family dish but `rice` context and duplicates Beans Poriyal. | Keep if generic family needed; clean ingredients. | 🟡 NEEDS_LOCAL_REVIEW |
| Rava Kesari | Real Tamil sweet, but `filter coffee` is pairing/context and image generic. | Clean later. | 🟡 NEEDS_LOCAL_REVIEW |
| Sundakkai Vathal Kuzhambu | Strong Tamil dish; `rice` context and generic image. | Clean later. | 🟢 APPROVED cleanup |
| Sweet Pongal | Duplicates stronger `Sakkarai Pongal`; placeholder image and incomplete ingredients. | Consolidate or keep as alias only after review. | 🟡 NEEDS_LOCAL_REVIEW |
| Vatha Kuzhambu | Strong gold-list dish; `rice`/`appalam` are pairings and generic image. | Clean and keep. | 🟢 APPROVED cleanup |

## 5. Missing Gold Recipes

| Gold dish | Category | Database match | Status | Final validation | Notes |
|---|---|---|---|---|---|
| Kothu Parotta | Breakfast / street food | — | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Iconic Tamil/TN street dish. Add only as distinct chopped parotta stir-fry, not Kerala parotta plate. |
| Kal Dosai | Breakfast | — | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Recognized soft thick dosa style; distinct from generic dosa. |
| Idiyappam | Breakfast | Kerala Idiyappam exists | ➕ MISSING_GOLD_RECIPE | 🟡 NEEDS_LOCAL_REVIEW | Shared with Kerala. Existing Kerala record may be enough unless Tamil-specific pairing/style is needed. |
| Elumichai Sadam | Rice | Chitranna | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Add Tamil lemon rice separately only if needed; do not rename Karnataka Chitranna. |
| Puliyodarai | Rice | Puliyogare | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Add Tamil temple-style puliyodarai separately; do not repurpose Karnataka Puliyogare. |
| Tomato Sadam | Rice | Tomato Rice | ➕ MISSING_GOLD_RECIPE | 🟡 NEEDS_LOCAL_REVIEW | Existing Tomato Rice is generic South Indian/lunch-box; can be left generic or localized after review. |
| Pallipalayam Chicken | Chicken | — | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Iconic Kongu/Namakkal-Erode chicken fry with shallots, dry red chilli and coconut bits. |
| Nethili Fry | Seafood | Fish Fry Tamil Style | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Add as specific anchovy fry; do not use generic fish fry as substitute. |
| Vanjaram Fry | Seafood | Fish Fry Tamil Style | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Add as specific seer fish fry if seafood coverage is desired. |
| Medu Vada | Snack | — | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Pan-South but immediately recognized in Tamil breakfast/tiffin. |
| Murukku | Snack | — | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Iconic Tamil snack/festival item. |
| Thattai | Snack | — | ➕ MISSING_GOLD_RECIPE | 🟢 APPROVED | Iconic crisp Tamil snack; distinct from Murukku. |

Gold-list entries already covered:

| Gold dish | Coverage |
|---|---|
| Ven Pongal | Found as Ven Pongal and generic Pongal. |
| Kanchipuram Idli | Found, fix required. |
| Kuzhi Paniyaram | Found, fix required. |
| Adai | Found, fix required. |
| Sambar Sadam | Found as Sambar Rice, safe rename. |
| Thengai Sadam | Found as Coconut Rice, safe rename. |
| Curd Rice | Found as Thayir Sadam. |
| Kootu | Found as Kootu and Chow Chow Kootu. |
| Poriyal | Found as Poriyal and Beans Poriyal. |
| Kara Kuzhambu | Covered by Puli Kuzhambu, but naming needs review. |
| Mor Kuzhambu | Found, fix required. |
| Vatha Kuzhambu | Found, fix required. |
| Avial | Present as Kerala Avial and Adai Avial; shared dish needs local review before Tamil-specific addition. |
| Keerai Masiyal | Found, fix required. |
| Chicken Chettinad | Found as Chettinad Chicken Curry, fix/local review required. |
| Mutton Chukka | Found, fix required. |
| Meen Kuzhambu | Found, fix required. |

## 6. Wrong Associations

| Recipe | Current tags | Decision | Reason |
|---|---|---|---|
| Chitranna | Tamil Nadu / Karnataka but Karnataka collection | ❌ WRONG_ASSOCIATION for Tamil rename | Already implemented as Karnataka canonical Chitranna. Do not rename to Elumichai Sadam. |
| Puliyogare | Karnataka / Tamil Nadu but Karnataka collection | ❌ WRONG_ASSOCIATION for Tamil rename | Keep Karnataka Puliyogare; add Puliyodarai separately if needed. |
| Gunpowder Idli | Andhra / Tamil Nadu but Andhra collection | ❌ WRONG_ASSOCIATION | Podi idli can be shared, but current row is generic and Andhra-owned. Do not count as Tamil gold item. |
| Madras Curry | Tamil / Madras | ❌ WRONG_ASSOCIATION | Likely restaurant/export-style `Madras curry powder` construct, not a Tamil home gold dish. |
| Generic Tomato Rice | South Indian | ❌ WRONG_ASSOCIATION for immediate Tamil rename | May become Tomato Sadam after local review, but current row is generic lunch-box rice. |

## 7. Final Validation

### Approved Renames

| Current | Proposed canonical name | Decision | Confidence | Strict validation |
|---|---|---|---:|---|
| Coconut Rice | Thengai Sadam | 🟢 APPROVED | 0.90 | Average Tamil home cook recognizes the dish; ingredients/method match coconut rice. |
| Pongal | Ven Pongal | 🟢 APPROVED | 0.88 | Current recipe is clearly savory rice-moong dal pongal with pepper/cumin/ghee tempering. |
| Sambar Rice | Sambar Sadam | 🟢 APPROVED | 0.82 | Method matches sambar sadam; quantities are weak but canonical name is correct. |

### Approved New Dishes

| Missing dish | Decision | Confidence | Strict validation |
|---|---|---:|---|
| Kothu Parotta | 🟢 APPROVED | 0.92 | Strong Tamil street-food identity with distinct chopped parotta method. |
| Kal Dosai | 🟢 APPROVED | 0.84 | Recognized Tamil soft dosa style; not duplicate of generic dosa. |
| Elumichai Sadam | 🟢 APPROVED | 0.86 | Tamil lemon rice identity should be separate from Karnataka Chitranna if added. |
| Puliyodarai | 🟢 APPROVED | 0.90 | Temple-style Tamil tamarind rice is distinct enough from Karnataka Puliyogare when authored correctly. |
| Pallipalayam Chicken | 🟢 APPROVED | 0.93 | Highly recognized Kongu dish; distinct from Chettinad chicken. |
| Nethili Fry | 🟢 APPROVED | 0.86 | Specific anchovy fry; more authentic than generic fish fry. |
| Medu Vada | 🟢 APPROVED | 0.88 | Core South Indian/Tamil breakfast snack; missing from current active set. |
| Murukku | 🟢 APPROVED | 0.90 | Iconic Tamil snack/festival item. |
| Thattai | 🟢 APPROVED | 0.86 | Iconic crisp Tamil snack distinct from murukku. |

### Needs Local Review

| Item | Decision | Why not safe yet |
|---|---|---|
| Chettinad Chicken Curry -> Chicken Chettinad | 🟡 NEEDS_LOCAL_REVIEW | Correct direction, but current ingredients include `rice` and `dosa`; clean before rename. |
| Tomato Rice -> Tomato Sadam | 🟡 NEEDS_LOCAL_REVIEW | Existing row is generic South Indian. Need decide whether Tomo wants a Tamil title or generic lunch-box title. |
| Idiyappam Tamil variant | 🟡 NEEDS_LOCAL_REVIEW | Kerala Idiyappam now exists. Add Tamil variant only if pairings/style differ meaningfully. |
| Avial Tamil variant | 🟡 NEEDS_LOCAL_REVIEW | Shared Kerala/Tamil dish. Existing Kerala Avial may suffice until local style is specified. |
| Kara Kuzhambu vs Puli Kuzhambu | 🟡 NEEDS_LOCAL_REVIEW | Current Puli Kuzhambu covers much of the profile; decide whether Kara Kuzhambu deserves separate recipe or alias. |
| Vanjaram Fry | 🟡 NEEDS_LOCAL_REVIEW | Strong dish, but adding both Nethili and Vanjaram may be too much for Beta 3 seafood wave. |
| Kootu generic row | 🟡 NEEDS_LOCAL_REVIEW | Generic Kootu duplicates Chow Chow Kootu. Keep only if generic family rows are useful. |
| Sweet Pongal vs Sakkarai Pongal | 🟡 NEEDS_LOCAL_REVIEW | Current duplicate-like sweet pongal rows should be consolidated or aliased later. |

### Rejected Proposals

| Proposal | Decision | Reason |
|---|---|---|
| Rename Chitranna to Elumichai Sadam | 🔴 REJECT | Chitranna is now Karnataka canonical and should stay there. |
| Rename Puliyogare to Puliyodarai | 🔴 REJECT | Puliyogare is Karnataka-owned. Tamil Puliyodarai should be separate if implemented. |
| Treat Madras Curry as Tamil home classic | 🔴 REJECT | Export/restaurant-style weak association. |
| Count Gunpowder Idli as Tamil gold coverage | 🔴 REJECT | Current row is generic and Andhra-owned. |
| Treat Fish Fry Tamil Style as Nethili or Vanjaram Fry | 🔴 REJECT | Fish type matters; add specific dishes rather than pretending. |
| Treat Adai Avial as standalone Avial coverage | 🔴 REJECT | It is a combo row; Tamil Avial needs local review if added separately. |

## 8. Beta 3 Safe Implementation

Only these Tamil Nadu items are safe to implement immediately:

### Safe renames

1. `Coconut Rice` -> `Thengai Sadam`
   - English subtitle: `Coconut rice`
   - Aliases: `Coconut Rice`, `Thengai Sadam`, `Thengai Saadam`
   - Origin: `Tamil Nadu`
   - Popular Across: `Tamil Nadu`, `South India`

2. `Pongal` -> `Ven Pongal`
   - English subtitle: `Savory rice and moong dal pongal`
   - Aliases: `Pongal`, `Ven Pongal`, `Khara Pongal`
   - Origin: `Tamil Nadu`
   - Popular Across: `Tamil Nadu`, `South India`

3. `Sambar Rice` -> `Sambar Sadam`
   - English subtitle: `Sambar rice`
   - Aliases: `Sambar Rice`, `Sambar Sadam`
   - Origin: `Tamil Nadu / South India`
   - Popular Across: `Tamil Nadu`, `South India`

### Safe new recipes

1. `Kothu Parotta`
2. `Kal Dosai`
3. `Elumichai Sadam`
4. `Puliyodarai`
5. `Pallipalayam Chicken`
6. `Nethili Fry`
7. `Medu Vada`
8. `Murukku`
9. `Thattai`

Do not implement yet:

- `Chicken Chettinad` rename
- `Tomato Sadam`
- Tamil `Idiyappam`
- Tamil `Avial`
- `Kara Kuzhambu` as a separate recipe
- `Vanjaram Fry`
- Any conversion of Karnataka Chitranna/Puliyogare into Tamil dishes

Terminal summary:

- Recipes audited: 52
- Safe renames: 3
- Approved additions: 9
- Recipe fixes: 24
- Local review: 8
- Rejected proposals: 6
