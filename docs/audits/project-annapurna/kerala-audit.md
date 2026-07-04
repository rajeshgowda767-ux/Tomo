# Project Annapurna - Task 4: Kerala Recipe Audit

Date: 2026-07-02

Mode: audit only. No recipe data, generated data, engines, scoring, ranking, analytics, desktop, collections, UI, or recommendation files were modified.

## 1. Executive Summary

- Active recipes scanned: 664
- Kerala / Malabar / Travancore / Kochi associated recipes audited: 37
- Kerala gold-list entries found exactly or partially: 20 / 28
- Safe rename candidates: 3
- Recipe-fix-required candidates: 18
- Missing iconic Kerala recipes: 9
- Wrong regional associations: 0 direct Kerala mis-tags found
- Local review items: 3
- Rejected proposals: 2

Status legend: ✅ KEEP, 🔄 RENAME, 🛠 RECIPE_FIX_REQUIRED, ➕ MISSING_ICONIC_RECIPE, ❌ INCORRECTLY_TAGGED.

Confidence legend: 🟢 APPROVED, 🟡 NEEDS_LOCAL_REVIEW, 🔴 REJECT.

Top finding: Kerala is one of the stronger represented regions in Tomo, but the database mixes genuinely strong Kerala identities with generated support ingredients such as `tea`, `rice`, `sadya`, `papadam`, `appam`, or `parotta` inside recipe ingredient lists. Naming should move carefully: only three renames are safe now, while many recipes should keep their Kerala identity but receive recipe-data cleanup later.

## 2. Existing Kerala Recipes

For KEEP and RENAME rows, the fields Primary Name, English Subtitle, Aliases, Origin, and Popular Across are included for future naming work.

| Current Recipe Name | Category | Ingredients | Quick Guide | Region Tags | Image | Status | Primary Name | English Subtitle | Aliases | Origin | Popular Across |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Appam | Breakfast | rice; coconut; yeast; sugar; salt | Stir fermented appam batter. / Heat an appam pan. / Pour batter and swirl. / Cover and cook until set. / Serve warm. | Kerala | /assets/images/dishes/expansion-pack-2-appam.png | ✅ KEEP | Appam | Lacy fermented rice pancake | Palappam, Kerala Appam | Kerala | Kerala, South India |
| Appam Stew | Breakfast | appam; coconut milk; potato; carrot; beans; pepper; curry leaves; coconut chutney; tea | Prepare or warm soft appams. / Cook vegetables until just tender. / Simmer them in thin coconut milk with pepper and curry leaves. / Finish with thick coconut milk. / Serve appam with hot stew. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/batch5-chicken-stew.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Avial | Vegetarian / Sadya | vegetables; coconut; curd; curry leaves; coconut oil | Cook mixed vegetables until tender but not mushy. / Grind coconut with chilli and cumin. / Fold coconut paste into vegetables. / Add curd on low heat. / Finish with coconut oil and curry leaves. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/avial.png | ✅ KEEP | Avial | Mixed vegetables in coconut-curd sauce | Aviyal | Kerala / Tamil Nadu usage needs review | Kerala, Tamil Nadu, South India |
| Beans Thoran | Vegetarian side | beans; coconut; mustard seeds; curry leaves; oil | Chop beans finely. / Temper mustard and curry leaves. / Add beans and salt. / Cover and cook until tender. / Finish with coconut. | Kerala | /assets/images/dishes/batch5-beans-thoran.png | ✅ KEEP | Beans Thoran | Beans coconut stir-fry | Payar Thoran | Kerala | Kerala |
| Beetroot Pachadi | Vegetarian / Sadya | beetroot; curd; coconut; mustard seeds; curry leaves; sadya; rice | Cook grated beetroot until soft. / Grind coconut with mustard or cumin. / Mix beetroot with coconut paste. / Fold in curd on low heat or off heat. / Temper curry leaves and mustard. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Cabbage Thoran | Vegetarian side | cabbage; coconut; mustard seeds; green chilli; curry leaves | Temper mustard seeds and curry leaves. / Add cabbage and salt. / Cook covered until just soft. / Mix in coconut and chilli. / Toss once and serve. | Kerala | /assets/images/dishes/batch5-cabbage-thoran.png | ✅ KEEP | Cabbage Thoran | Cabbage coconut stir-fry | Muttaikose Thoran | Kerala | Kerala |
| Chemmeen Theeyal | Seafood curry | prawns; roasted coconut; tamarind; shallots; curry leaves; red chilli; rice | Roast coconut and spices until deep brown. / Grind into paste. / Simmer tamarind, shallots and paste. / Add prawns and cook briefly. / Finish with curry leaves. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/batch4-chingri-malai-curry.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Cherupayar Curry | Vegetarian / payar curry | green gram; coconut; cumin; garlic; curry leaves; kanji; rice | Cook green gram until tender. / Grind coconut with cumin and garlic. / Simmer cooked payar with coconut paste. / Temper curry leaves. / Serve with kanji or rice. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/batch3b-kadala-curry.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Chicken Stew | Chicken / stew | chicken; tomato | Saute onion in oil until soft. / Add chicken, potato, carrot, pepper and salt. / Add water and cook until tender. / Pour in coconut milk. / Simmer gently without boiling hard. | Kerala | /assets/images/dishes/batch5-chicken-stew.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Ela Ada | Sweet / festival | rice flour; jaggery; coconut; cardamom; banana leaf; tea | Make soft rice flour dough. / Mix coconut, jaggery and cardamom. / Spread dough on banana leaf. / Add filling and fold. / Steam until set. | Kerala, Malabar, Travancore, Kochi | /assets/images/collections/festival-food.webp | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Erissery | Vegetarian / Sadya | pumpkin; cowpeas; coconut; cumin; curry leaves; mustard seeds; rice; avial | Cook pumpkin and cowpeas until soft. / Add coconut-cumin paste and simmer. / Mash lightly for body. / Temper mustard, curry leaves and coconut. / Pour over erissery. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Idiyappam Egg Curry | Breakfast | idiyappam; egg; onion; tomato; coconut milk; curry leaves; black pepper; tea | Steam idiyappam until soft. / Boil eggs and halve them. / Cook onion, tomato and spices into a curry base. / Add coconut milk and eggs. / Serve curry over idiyappam. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/egg-curry.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kadala Curry | Breakfast curry | black chana; coconut; onion; tomato; curry leaves | Soak and cook black chickpeas until tender. / Roast coconut and spices. / Cook onion and tomato into masala. / Add chickpeas and coconut paste. / Simmer until thick. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/batch3b-kadala-curry.png | ✅ KEEP | Kadala Curry | Kerala black chickpea curry | Kadala Kari | Kerala | Kerala |
| Kalan | Vegetarian / Sadya | raw banana; curd; yam; coconut; pepper; curry leaves; rice; papadam | Cook raw banana and yam until tender. / Add pepper and turmeric. / Stir in coconut paste. / Add thick curd and simmer gently. / Finish with curry leaves. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🔄 RENAME | Kaalan | Curd, yam and raw banana curry | Kalan, Kurukku Kaalan | Kerala | Kerala |
| Kanji Payar | Comfort meal | rice; green gram; coconut; cumin; pickle; papadam; salt | Cook rice with extra water until soft and soupy. / Cook green gram until tender. / Season payar with coconut and cumin if desired. / Serve kanji with payar. / Add pickle and papadam. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kappa Meen Curry | Fish / tapioca meal | tapioca; fish curry; coconut; green chilli; curry leaves; fish curry | Boil tapioca until soft and drain. / Mash lightly with coconut, chilli and curry leaves. / Prepare spicy fish curry separately. / Serve kappa hot with curry. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/fish-curry.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kerala Beef Fry | Beef | beef; coconut slices; onion; black pepper; curry leaves; garam masala; Kerala parotta | Cook beef with spices until tender. / Fry onion, coconut slices and curry leaves. / Add cooked beef and roast. / Finish with black pepper. / Serve hot with parotta. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | ✅ KEEP | Kerala Beef Fry | Peppery roasted beef fry | Beef Ularthiyathu, Nadan Beef Fry | Kerala | Kerala |
| Kerala Egg Roast | Egg / breakfast | egg; onion; tomato; curry leaves; coconut oil | Boil and peel eggs. / Cook onions and curry leaves. / Add tomato and spices. / Coat eggs in masala. / Serve warm. | Kerala | /assets/images/dishes/expansion-pack-3-kerala-egg-roast.png | ✅ KEEP | Kerala Egg Roast | Onion-tomato egg roast | Mutta Roast, Egg Roast | Kerala | Kerala |
| Kerala Fish Curry | Fish curry | fish; coconut milk; kokum; red chilli | Simmer tomato, ginger, chillies, turmeric and souring agent. / Add fish pieces gently. / Cook until fish is done. / Add coconut milk and curry leaves. / Warm without boiling hard. | Kerala | /assets/images/dishes/kerala-fish-curry.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kerala Fish Pollichathu | Fish / banana leaf | fish; banana leaf; onion; tomato; coconut oil | Marinate fish with chilli, turmeric and salt. / Sear lightly. / Cook onion-tomato masala with curry leaves. / Wrap fish and masala in banana leaf. / Pan roast until fragrant. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/fish-curry.png | 🔄 RENAME | Meen Pollichathu | Banana-leaf roasted fish | Kerala Fish Pollichathu, Fish Pollichathu | Kerala | Kerala |
| Kerala Parotta Beef Fry | Beef / plate meal | Kerala parotta; beef fry; onion; pickle; curry leaves | Warm flaky Kerala parottas. / Prepare or reheat beef fry. / Separate parotta layers. / Serve beef fry alongside. / Add onion and pickle. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | ✅ KEEP | Kerala Parotta Beef Fry | Parotta with beef fry | Parotta Beef Fry | Kerala | Kerala |
| Kerala Rasam | Rasam | tamarind; tomato; pepper; cumin; garlic; curry leaves; rice; papadam | Extract tamarind water. / Crush pepper, cumin and garlic. / Simmer tamarind with tomato and spices. / Temper mustard and curry leaves. / Serve hot and pourable. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/recommendation-pack-pepper-rasam.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kerala Sambar | Sambar | toor dal; vegetables; tamarind; sambar powder; coconut; curry leaves; rice; avial; thoran | Cook dal until soft. / Simmer vegetables with tamarind and sambar spices. / Add dal and simmer. / Temper mustard and curry leaves. / Serve hot with rice. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/batch3b-sambar-rice.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Malabar Chicken Curry | Chicken curry | chicken; coconut milk; onion; tomato; ginger garlic; curry leaves; garam masala; appam; parotta | Brown onion with curry leaves and spices. / Add chicken and sear. / Add tomato and masala. / Simmer until chicken is tender. / Finish with coconut milk. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/batch5-chicken-stew.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Malabar Fish Curry | Fish curry | fish; coconut; tamarind; green chilli; curry leaves; shallots; kappa; rice | Grind coconut with spices. / Simmer tamarind water with shallots and chilli. / Add coconut paste and curry leaves. / Slide in fish gently. / Cook until just done. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/fish-curry.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Meen Moilee | Fish curry | fish; coconut milk; green chilli; ginger; curry leaves; tomato; appam; rice | Season fish lightly. / Saute ginger, chilli and curry leaves. / Add thin coconut milk and simmer. / Add fish and cook gently. / Finish with thick coconut milk. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/fish-stew.png | 🔄 RENAME | Fish Molee | Gentle coconut milk fish curry | Meen Moilee, Fish Moilee, Meen Molee | Kerala | Kerala |
| Nadan Kozhi Curry | Chicken curry | chicken; coconut; onion; tomato; curry leaves; garam masala; appam; rice | Saute onion, curry leaves and spices. / Add chicken and brown lightly. / Add tomato and coconut masala. / Simmer until chicken is tender. / Serve with appam or rice. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/batch5-chicken-stew.png | ✅ KEEP | Nadan Kozhi Curry | Kerala homestyle chicken curry | Kerala Chicken Curry, Nadan Chicken Curry | Kerala | Kerala |
| Olan | Vegetarian / Sadya | ash gourd; cowpeas; thin coconut milk; thick coconut milk; green chillies; curry leaves; coconut oil | Cook ash gourd and cowpeas until soft. / Add green chilli and salt. / Pour in coconut milk and warm gently. / Finish with coconut oil and curry leaves. / Serve with rice. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | ✅ KEEP | Olan | Ash gourd and cowpea coconut stew | Kerala Olan | Kerala | Kerala |
| Palada Payasam | Dessert | rice ada; milk; sugar; ghee; cardamom | Cook ada until soft. / Simmer milk and sugar. / Add ada and cook until creamy. / Finish with cardamom if using. / Serve warm or chilled. | Kerala, Malabar, Travancore, Kochi | /assets/images/collections/festival-food.webp | ✅ KEEP | Palada Payasam | Rice ada milk payasam | Ada Payasam, Kerala Palada | Kerala | Kerala |
| Parippu Curry | Vegetarian / Sadya | moong dal; grated coconut; cumin; turmeric; ghee; curry leaves | Cook moong dal until soft. / Grind coconut with cumin. / Simmer dal with coconut paste. / Temper curry leaves in ghee. / Serve with rice, ghee and papadam. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/collection-detail-parippu-curry.png | ✅ KEEP | Parippu Curry | Kerala moong dal curry | Kerala Parippu | Kerala | Kerala |
| Pazham Pori | Snack | ripe banana; maida; rice flour; turmeric; sugar; oil; black tea | Slice ripe banana lengthwise. / Make batter with flour, sugar and turmeric. / Dip banana slices. / Fry until golden. / Serve hot with tea. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | ✅ KEEP | Pazham Pori | Banana fritters | Ethakka Appam, Banana Fritters | Kerala | Kerala |
| Puttu Kadala | Breakfast | rice flour; black chana; coconut; onion; curry leaves | Steam rice flour and coconut in a puttu maker. / Cook black chickpeas until tender. / Simmer chickpeas with coconut masala and curry leaves. / Serve puttu with kadala curry. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/puttu-kadala.png | ✅ KEEP | Puttu Kadala | Steamed rice puttu with black chickpea curry | Puttu Kadala Curry | Kerala | Kerala |
| Sambharam | Drink | buttermilk; ginger; green chilli; curry leaves; coriander; salt; rice; summer meals | Whisk buttermilk. / Crush ginger, chilli and curry leaves. / Stir into buttermilk with salt. / Chill briefly. / Serve with rice meals. | Kerala, Malabar, Travancore, Kochi | /assets/images/collections/healthy-drinks.webp | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Thoran | Vegetarian / side | cabbage or beans; grated coconut; mustard seeds; green chillies; curry leaves; coconut oil | Chop vegetables finely. / Crush coconut with chilli and cumin. / Temper mustard and curry leaves. / Stir-fry vegetables until just cooked. / Fold in coconut and serve. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/batch5-beans-thoran.png | ✅ KEEP | Thoran | Coconut vegetable stir-fry | Kerala Thoran | Kerala | Kerala |
| Ulli Theeyal | Vegetarian / theeyal | shallots; roasted coconut; tamarind; red chilli; curry leaves; rice | Roast coconut and spices until dark brown. / Grind into paste. / Saute shallots until glossy. / Simmer with tamarind and coconut paste. / Finish with curry leaves. | Kerala, Malabar, Travancore, Kochi | /assets/images/dishes/homestyle-kitchen-placeholder.png | ✅ KEEP | Ulli Theeyal | Shallot roasted coconut curry | Theeyal, Onion Theeyal | Kerala | Kerala |
| Unniyappam | Snack / sweet | rice flour; jaggery; banana; coconut; cardamom; ghee; tea | Mix rice flour with jaggery syrup and mashed banana. / Add coconut bits and cardamom. / Rest batter briefly. / Cook in appe pan with ghee or oil. / Turn until browned. | Kerala, Malabar, Travancore, Kochi | /assets/images/collections/festival-food.webp | ✅ KEEP | Unniyappam | Sweet banana-jaggery appams | Unni Appam | Kerala | Kerala |
| Vegetable Stew | Vegetarian / stew | vegetables; coconut milk; onion; ginger; black pepper; curry leaves | Cook onion and ginger lightly. / Add vegetables, salt and water. / Simmer until vegetables soften. / Add coconut milk and pepper. / Warm gently and serve. | Kerala | /assets/images/dishes/soup-bowls.png | ✅ KEEP | Vegetable Stew | Kerala coconut milk vegetable stew | Ishtu, Vegetable Ishtu | Kerala | Kerala |

## 3. Safe Renames

| Current | Recommended primary name | English subtitle | Aliases | Origin | Popular across | Confidence | Authenticity notes |
|---|---|---|---|---|---|---|---|
| Kalan | Kaalan | Curd, yam and raw banana curry | Kalan, Kurukku Kaalan | Kerala | Kerala | 🟢 APPROVED | Ingredient profile and quick guide match sadya kaalan: raw banana/yam, curd, coconut, pepper, curry leaves. Rename is spelling/authenticity polish. |
| Kerala Fish Pollichathu | Meen Pollichathu | Banana-leaf roasted fish | Kerala Fish Pollichathu, Fish Pollichathu | Kerala | Kerala | 🟢 APPROVED | Method is specific: marinate, sear, masala, wrap in banana leaf, pan roast. Local name is stronger and recognized. |
| Meen Moilee | Fish Molee | Gentle coconut milk fish curry | Meen Moilee, Fish Moilee, Meen Molee | Kerala | Kerala | 🟢 APPROVED | Coconut milk, green chilli, ginger, curry leaves and gentle cooking match the dish. `Fish Molee` aligns with the gold list while retaining Meen Moilee aliases. |

Rejected rename ideas:

| Proposal | Decision | Reason |
|---|---|---|
| Rename Appam to Palappam | 🔴 REJECT | Current `Appam` is already canonical enough and gold list also includes Appam separately. Palappam can be an alias or separate variant later if the batter/process is made specific. |
| Rename Karnataka `Ghee Rice` to Kerala `Neychoru` | 🔴 REJECT | Existing `Ghee Rice` is tagged Karnataka and uses coconut milk; do not repurpose it for Kerala. Add Neychoru separately if needed. |

## 4. Recipe Fix Required

| Recipe | Why fix is required | Suggested direction | Confidence |
|---|---|---|---|
| Appam Stew | Ingredient list includes serving/context items (`coconut chutney`, `tea`) and the image is chicken stew. | Keep concept, clean ingredients into appam + vegetable stew or split as `Appam with Vegetable Stew`. | 🟢 APPROVED |
| Beetroot Pachadi | Authentic method, but ingredient list includes `sadya` and `rice`; placeholder image. | Keep as Beetroot Pachadi; remove context ingredients later and add real image. | 🟢 APPROVED |
| Chemmeen Theeyal | Recipe method is strong, but image points to Bengali chingri malai curry. | Keep Chemmeen Theeyal; replace image and remove `rice` as ingredient. | 🟢 APPROVED |
| Cherupayar Curry | Uses wrong/shared Kadala image and context ingredients (`kanji`, `rice`). | Keep Kerala green gram curry identity; clean ingredients and image. | 🟢 APPROVED |
| Chicken Stew | Ingredient list only has `chicken` and `tomato`, while quick guide uses potato, carrot, pepper and coconut milk. | Complete ingredient list; consider title `Kerala Chicken Stew` only after data is corrected. | 🟢 APPROVED |
| Ela Ada | Good method, but ingredient list includes `tea` and image is generic festival collection. | Keep Ela Ada; clean ingredients and add banana-leaf ada image. | 🟢 APPROVED |
| Erissery | Authentic direction, but includes `rice` and `avial` as ingredients; placeholder image. | Keep Erissery; clean ingredients and add pumpkin/cowpea image. | 🟢 APPROVED |
| Idiyappam Egg Curry | Good Kerala plate, but not standalone Idiyappam; includes `tea` as ingredient. | Keep combo or split later; add standalone Idiyappam as missing iconic recipe. | 🟢 APPROVED |
| Kanji Payar | Recognizable comfort meal, but `pickle` and `papadam` are pairings, not primary ingredients; placeholder image. | Keep Kanji Payar; move accompaniments to pairings/notes later. | 🟢 APPROVED |
| Kappa Meen Curry | Uses `fish curry` as an ingredient and repeats it; generic fish curry image. | Keep dish; model as boiled seasoned kappa plus separate fish curry components. | 🟢 APPROVED |
| Kerala Fish Curry | Uses `kokum`; Kerala fish curry usually needs kudampuli/gambooge or region-specific souring clarity. Measurements are placeholder-like. | Keep title only after souring agent and method are clarified. | 🟡 NEEDS_LOCAL_REVIEW |
| Kerala Rasam | Recognizable but not as iconic as Tamil/Karnataka rasam; has rice/papadam context ingredients. | Keep regional tag cautiously; clean ingredient list or keep as generic Kerala-style pepper rasam. | 🟡 NEEDS_LOCAL_REVIEW |
| Kerala Sambar | Kerala sambar exists, but ingredients include `rice`, `avial`, and `thoran`. | Clean ingredient list and specify Kerala coconut/spice note before strengthening identity. | 🟡 NEEDS_LOCAL_REVIEW |
| Malabar Chicken Curry | Good identity but ingredient list includes pairings (`appam`, `parotta`) and image is chicken stew. | Keep title; clean ingredients and use proper Malabar chicken curry image. | 🟢 APPROVED |
| Malabar Fish Curry | Good identity but ingredient list includes pairings (`kappa`, `rice`) and image is generic fish curry. | Keep title; clean ingredients and image. | 🟢 APPROVED |
| Sambharam | Recognizable drink, but ingredient list includes `rice` and `summer meals`; image is generic healthy drinks. | Keep Sambharam; clean ingredients and use spiced buttermilk image. | 🟢 APPROVED |
| Kerala Beef Fry | Authentic and sensitive; do not rename. Placeholder image and pairing ingredient should be cleaned later. | Keep title; add image and move parotta to pairings/notes. | 🟢 APPROVED |
| Kerala Parotta Beef Fry | Authentic plate but sensitive; not a rename candidate. Placeholder image and assembled-plate structure need care. | Keep title; no regionalization beyond existing Kerala label. | 🟢 APPROVED |

## 5. Missing Gold Recipes

| Gold dish | Category | Database match | Status | Confidence | Notes |
|---|---|---|---|---|---|
| Puttu | Breakfast | Puttu Kadala contains puttu | ➕ MISSING_ICONIC_RECIPE | 🟢 APPROVED | Standalone puttu should exist as a base breakfast with coconut, rice flour, steam method, banana/kadala pairings. |
| Idiyappam | Breakfast | Idiyappam Egg Curry contains idiyappam | ➕ MISSING_ICONIC_RECIPE | 🟢 APPROVED | Standalone idiyappam should exist; current combo is not enough. |
| Palappam | Breakfast | Appam | ➕ MISSING_ICONIC_RECIPE | 🟡 NEEDS_LOCAL_REVIEW | Appam exists and may already cover palappam. Add only if batter/process is meaningfully specific. |
| Thalassery Biryani | Rice | — | ➕ MISSING_ICONIC_RECIPE | 🟢 APPROVED | High-value Malabar identity; should not be replaced by generic biryani. |
| Neychoru | Rice | Karnataka Ghee Rice exists | ➕ MISSING_ICONIC_RECIPE | 🟢 APPROVED | Add separately; do not repurpose current Karnataka Ghee Rice. |
| Kichadi | Vegetarian / Sadya | — | ➕ MISSING_ICONIC_RECIPE | 🟡 NEEDS_LOCAL_REVIEW | Kerala kichadi is recognized, but naming overlaps with pachadi in household usage. Needs local review for exact variant. |
| Kerala Chicken Roast | Chicken | — | ➕ MISSING_ICONIC_RECIPE | 🟢 APPROVED | Strong Kerala home/restaurant dish; distinct from curry and stew. |
| Prawn Roast | Seafood | — | ➕ MISSING_ICONIC_RECIPE | 🟢 APPROVED | Strong Kerala seafood dish; distinct from Chemmeen Theeyal. |
| Parippu Vada | Snack | — | ➕ MISSING_ICONIC_RECIPE | 🟢 APPROVED | Iconic tea-time snack; should be separate from parippu curry. |

Gold-list entries already covered:

| Gold dish | Coverage |
|---|---|
| Appam | Found: Appam |
| Puttu Kadala | Found: Puttu Kadala |
| Avial | Found: Avial |
| Thoran | Found: Thoran, Beans Thoran, Cabbage Thoran |
| Olan | Found: Olan |
| Erissery | Found: Erissery, fix required |
| Kaalan | Found as Kalan, rename safe |
| Theeyal | Found: Ulli Theeyal, Chemmeen Theeyal |
| Pachadi | Found: Beetroot Pachadi, fix required |
| Kerala Chicken Curry | Found as Nadan Kozhi Curry |
| Malabar Chicken Curry | Found, fix required |
| Kerala Fish Curry | Found, fix/local review required |
| Meen Pollichathu | Found as Kerala Fish Pollichathu, rename safe |
| Fish Molee | Found as Meen Moilee, rename safe |
| Pazham Pori | Found |
| Unniyappam | Found |

## 6. Wrong Regional Associations

No direct Kerala-tagged recipe was clearly a wrong regional association.

Caution rows:

| Recipe | Current tags | Decision | Reason |
|---|---|---|---|
| Karnataka Ghee Rice | Karnataka | Do not use for Kerala Neychoru | The Kerala gold-list item should be added separately or reviewed separately; current record is already Karnataka-associated. |
| Generic Fish Curry / Fish Curry Rice | Coastal Indian | Do not rename to Kerala Fish Curry | The ingredient profile is generic tomato/tamarind fish curry, not specific enough for Kerala identity. |
| Payasam | South Indian | Keep generic | Kerala has Palada Payasam already; generic Payasam should not be forced into Kerala. |

## 7. Final Validation

### Approved Renames

| Current | Final decision | Confidence | Checks |
|---|---|---|---|
| Kalan -> Kaalan | 🟢 APPROVED | 0.88 | Iconic Kerala sadya dish; ingredients and method match enough. |
| Kerala Fish Pollichathu -> Meen Pollichathu | 🟢 APPROVED | 0.91 | Banana leaf wrapping and fish masala method match; local title is stronger. |
| Meen Moilee -> Fish Molee | 🟢 APPROVED | 0.86 | Coconut milk, ginger, green chilli profile matches; aliases preserve current title. |

### Approved New Dishes

| Missing dish | Final decision | Confidence | Reason |
|---|---|---|---|
| Puttu | 🟢 APPROVED | 0.93 | Canonical Kerala breakfast base; currently only appears inside Puttu Kadala. |
| Idiyappam | 🟢 APPROVED | 0.90 | Canonical Kerala breakfast base; currently only appears inside egg-curry combo. |
| Thalassery Biryani | 🟢 APPROVED | 0.95 | Highly recognized Malabar identity and distinct biryani method/profile. |
| Neychoru | 🟢 APPROVED | 0.88 | Recognized Kerala/Malabar ghee rice; should be separate from Karnataka Ghee Rice. |
| Kerala Chicken Roast | 🟢 APPROVED | 0.91 | Strongly recognized Kerala chicken preparation distinct from curry/stew. |
| Prawn Roast | 🟢 APPROVED | 0.88 | High-value Kerala seafood gap; distinct from theeyal. |
| Parippu Vada | 🟢 APPROVED | 0.92 | Iconic Kerala tea-time snack. |

### Needs Local Review

| Item | Final decision | Confidence | Review question |
|---|---|---|---|
| Palappam | 🟡 NEEDS_LOCAL_REVIEW | 0.62 | Should this be an alias of Appam or a separate appam variant in Tomo? |
| Kichadi | 🟡 NEEDS_LOCAL_REVIEW | 0.68 | Which Kerala sadya kichadi variant should be canonical, and how to distinguish from pachadi? |
| Kerala Fish Curry | 🟡 NEEDS_LOCAL_REVIEW | 0.70 | Should Tomo model kudampuli-based red fish curry, coconut milk fish curry, or both as separate variants? |

### Rejected Proposals

| Proposal | Final decision | Confidence | Reason |
|---|---|---|---|
| Rename Appam to Palappam | 🔴 REJECT | 0.84 | Appam is already valid and broad; do not narrow it without variant-specific recipe work. |
| Convert Karnataka Ghee Rice into Kerala Neychoru | 🔴 REJECT | 0.94 | Wrong source record; add Neychoru separately if needed. |

## 8. Beta 3 Recommendations

Highest impact before Beta 3, if implementation time is limited:

1. Apply three safe renames only: `Kalan -> Kaalan`, `Kerala Fish Pollichathu -> Meen Pollichathu`, `Meen Moilee -> Fish Molee`.
2. Add approved missing dishes only if recipe authoring time exists: Puttu, Idiyappam, Thalassery Biryani, Neychoru, Kerala Chicken Roast, Prawn Roast, Parippu Vada.
3. Do not add Palappam or Kichadi without local review.
4. Clean recipe-data pollution in Kerala rows before using them as gold-standard examples. Prioritize Chicken Stew, Kerala Fish Curry, Malabar Chicken Curry, Malabar Fish Curry, Erissery, Beetroot Pachadi, Chemmeen Theeyal, and Sambharam.
5. Do not touch beef naming in Beta 3 beyond preserving existing Kerala identity; image/ingredient cleanup can happen later.
6. Add image-generation backlog items for placeholder/shared-image Kerala dishes: Beetroot Pachadi, Erissery, Kaalan, Olan, Ulli Theeyal, Pazham Pori, Ela Ada, Kerala Beef Fry, Kerala Parotta Beef Fry, Chemmeen Theeyal, Malabar Chicken Curry, Malabar Fish Curry, Meen Pollichathu.

Terminal summary:

- Kerala recipes audited: 37
- Safe renames: 3
- Approved additions: 7
- Recipe fixes: 18
- Local review items: 3
- Rejected proposals: 2

## Final Validation

Task 5 strict authenticity review. This pass is intentionally stricter than the initial Kerala audit: a dish can be culturally real and still be unsafe for immediate implementation if the current ingredient list, seasoning, quick guide, or duplicate coverage is weak.

### Approved Renames

| Current | Proposed canonical name | Final decision | Confidence | Strict validation |
|---|---|---|---:|---|
| Kalan | Kaalan | 🟢 APPROVED | 0.86 | Kerala home cooks recognize kaalan/kurukku kaalan. Core ingredients match: raw banana, yam, curd, coconut, pepper, curry leaves. `rice` and `papadam` are pairing/context pollution, but the rename itself is a spelling/authenticity correction and does not change the dish identity. |
| Kerala Fish Pollichathu | Meen Pollichathu | 🟢 APPROVED | 0.91 | Recognizable Kerala preparation. Method matches: fish is marinated, seared, covered with onion-tomato masala, wrapped in banana leaf, and pan-roasted. Proposed canonical name is stronger and more local. |

### Approved New Dishes

| Missing dish | Final decision | Confidence | Strict validation |
|---|---|---:|---|
| Puttu | 🟢 APPROVED | 0.92 | Iconic Kerala breakfast base. Existing `Puttu Kadala` represents a full plate, not standalone puttu. Add only as a simple steamed rice-flour-and-coconut base with kadala/banana/papadam as pairings, not ingredients. |
| Idiyappam | 🟢 APPROVED | 0.90 | Iconic Kerala breakfast/tiffin base. Existing `Idiyappam Egg Curry` is a combo plate and does not replace standalone idiyappam. |
| Thalassery Biryani | 🟢 APPROVED | 0.94 | Famous Malabar dish with distinct cultural identity; not a generic biryani rename. Add only with biryani-specific method/profile, not as a generic rice dish. |
| Neychoru | 🟢 APPROVED | 0.87 | Recognized Kerala/Malabar ghee rice. Current `Ghee Rice` is Karnataka-tagged and should not be repurposed, so a separate Kerala recipe is justified. |
| Kerala Chicken Roast | 🟢 APPROVED | 0.89 | Familiar Kerala home/restaurant dish distinct from chicken curry and stew. Safe as a new recipe if authored with onion-heavy roast, curry leaves, pepper/spice profile, and coconut oil. |
| Parippu Vada | 🟢 APPROVED | 0.93 | Iconic Kerala tea-time snack. Not duplicated by `Parippu Curry`; different method, texture, and use case. |

### Needs Local Review

| Item | Final decision | Why not safe yet |
|---|---|---|
| Meen Moilee -> Fish Molee | 🟡 NEEDS_LOCAL_REVIEW | Current `Meen Moilee` is already recognizable and arguably more locally rooted than `Fish Molee`. The recipe is broadly correct, but `appam` and `rice` appear as ingredients. Decide whether the canonical title should remain `Meen Moilee`, become `Fish Molee`, or use `Meen Molee`. |
| Palappam | 🟡 NEEDS_LOCAL_REVIEW | `Appam` already exists and is valid. Palappam should be separate only if Tomo represents a specific batter/center-lacy-edge style rather than duplicating appam. |
| Kichadi | 🟡 NEEDS_LOCAL_REVIEW | Kerala sadya kichadi is real, but variant naming overlaps with pachadi in household usage. Needs a specific canonical vegetable/fruit variant before adding. |
| Kerala Fish Curry | 🟡 NEEDS_LOCAL_REVIEW | Dish is real, but current data mixes coconut milk and kokum while Kerala fish curry often requires a clear regional souring choice such as kudampuli. Do not strengthen or rename until the intended variant is chosen. |
| Kerala Rasam | 🟡 NEEDS_LOCAL_REVIEW | Recognizable in Kerala meals, but not a high-confidence iconic Kerala identity from the current generic tamarind/pepper profile. Could remain regional only after ingredient cleanup. |
| Kerala Sambar | 🟡 NEEDS_LOCAL_REVIEW | Kerala sambar is real, but current ingredients include `rice`, `avial`, and `thoran`. Needs cleanup and Kerala-specific coconut/spice clarity before any stronger regional treatment. |
| Prawn Roast | 🟡 NEEDS_LOCAL_REVIEW | A Kerala prawn roast is plausible and common, but the name is broad. Needs local naming decision, likely `Chemmeen Roast`, and a clear distinction from `Chemmeen Theeyal`. |

### Rejected Proposals

| Proposal | Final decision | Reason |
|---|---|---|
| Rename Appam to Palappam | 🔴 REJECT | `Appam` is already a valid recognized canonical title. Do not narrow it without a specific Palappam recipe. |
| Convert Karnataka Ghee Rice into Kerala Neychoru | 🔴 REJECT | Wrong source dish. `Neychoru` should be added separately if implemented. |
| Treat Appam Stew as a canonical Kerala recipe without fixing data | 🔴 REJECT | The concept is valid, but the current ingredient list includes `coconut chutney` and `tea`, and the image is chicken stew. Keep as fix-required only. |
| Treat Chicken Stew as complete Kerala Chicken Stew now | 🔴 REJECT | Quick guide describes Kerala stew, but ingredients are only `chicken` and `tomato`. It is not data-complete enough for a stronger canonical identity. |
| Treat generic Kerala Fish Curry as final | 🔴 REJECT | Current profile is internally inconsistent and should not be used as a gold-standard Kerala fish curry without local variant choice. |

### Recipe Fix Required - Strict Validation

| Recipe | Final decision | Strict validation |
|---|---|---|
| Appam Stew | 🔴 REJECT for immediate implementation | Dish is recognizable, but current data has pairing/context ingredients and wrong image. Fix data before strengthening. |
| Beetroot Pachadi | 🟡 NEEDS_LOCAL_REVIEW | Authentic sadya item, but current ingredients include context terms. Safe to clean later; not a rename/add candidate now. |
| Chemmeen Theeyal | 🟡 NEEDS_LOCAL_REVIEW | Recognizable dish and method, but image is wrong and ingredient list includes `rice`. Keep until cleanup; do not add `Prawn Roast` as a duplicate without distinguishing. |
| Cherupayar Curry | 🟡 NEEDS_LOCAL_REVIEW | Kerala home dish, but current image and context ingredients are weak. Needs cleanup. |
| Chicken Stew | 🔴 REJECT for immediate implementation | Current ingredients do not match the quick guide. |
| Ela Ada | 🟡 NEEDS_LOCAL_REVIEW | Real Kerala sweet, but image is generic and `tea` appears as ingredient. Cleanup before promotion. |
| Erissery | 🟡 NEEDS_LOCAL_REVIEW | Real and recognizable; current `rice`/`avial` ingredient pollution prevents immediate implementation. |
| Idiyappam Egg Curry | 🟡 NEEDS_LOCAL_REVIEW | Recognizable combo, but not a substitute for standalone Idiyappam. Includes `tea` as ingredient. |
| Kanji Payar | 🟡 NEEDS_LOCAL_REVIEW | Real home comfort dish; pairings appear as ingredients. Needs cleanup. |
| Kappa Meen Curry | 🟡 NEEDS_LOCAL_REVIEW | Real Kerala plate, but `fish curry` is used as an ingredient. Needs proper component modeling. |
| Malabar Chicken Curry | 🟡 NEEDS_LOCAL_REVIEW | Real dish identity; current image and pairing ingredients are weak. |
| Malabar Fish Curry | 🟡 NEEDS_LOCAL_REVIEW | Real dish identity; current pairing ingredients and generic image need cleanup. |
| Sambharam | 🟡 NEEDS_LOCAL_REVIEW | Real Kerala drink; current `rice` and `summer meals` ingredient pollution needs cleanup. |
| Kerala Beef Fry | 🟡 NEEDS_LOCAL_REVIEW | Authentic and already regional, but sensitive. Keep title; only cleanup image/pairing data later. |
| Kerala Parotta Beef Fry | 🟡 NEEDS_LOCAL_REVIEW | Authentic plate but sensitive and assembled. Keep as-is until careful local review. |

## Beta 3 Safe Implementation

Only these Kerala items are safe to implement immediately:

### Safe renames

1. `Kalan` -> `Kaalan`
   - English subtitle: `Curd, yam and raw banana curry`
   - Aliases: `Kalan`, `Kurukku Kaalan`
   - Origin: `Kerala`
   - Popular Across: `Kerala`

2. `Kerala Fish Pollichathu` -> `Meen Pollichathu`
   - English subtitle: `Banana-leaf roasted fish`
   - Aliases: `Kerala Fish Pollichathu`, `Fish Pollichathu`
   - Origin: `Kerala`
   - Popular Across: `Kerala`

### Safe new recipes

1. `Puttu`
2. `Idiyappam`
3. `Thalassery Biryani`
4. `Neychoru`
5. `Kerala Chicken Roast`
6. `Parippu Vada`

Do not implement yet:

- `Meen Moilee -> Fish Molee`
- `Palappam`
- `Kichadi`
- `Prawn Roast`
- Any beef rename/regionalization
- Any strengthened `Kerala Fish Curry`, `Kerala Sambar`, or `Kerala Rasam` identity without recipe cleanup
