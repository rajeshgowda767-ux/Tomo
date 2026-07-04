# Project Annapurna - Task 1: Karnataka Recipe Audit

Date: 2026-07-02

Mode: read-only audit. No recipe data, generated data, engines, scoring, ranking, analytics, desktop, collections, or UI files were modified.

## Summary

- Active recipes scanned: 659
- Karnataka-associated candidates audited: 61
- Existing Karnataka recipes / associated recipes: 60
- Gold-list entries found exactly or partially: 17 / 24
- Missing gold recipes: 7
- Safe renames: 5
- Recipe fixes required: 19
- Wrong regional associations / caution rows: 1

Status legend: ✅ KEEP, 🔄 RENAME, 🛠 RECIPE_FIX_REQUIRED, ➕ MISSING_ICONIC_RECIPE, ❌ INCORRECTLY_TAGGED.

## Karnataka Gold List Coverage

| Category | Gold dish | Database match | Coverage status | Notes |
|---|---|---|---|---|
| Rice | Chitranna | Lemon Rice | FOUND_RENAME | Current `Lemon Rice` matches chitranna profile. |
| Rice | Puliyogare | Puliyogare | FOUND | Current name already canonical. |
| Rice | Bisi Bele Bath | Bisibelebath | FOUND_RENAME | Rename spelling/spacing. |
| Rice | Mosaranna | Thayir Sadam | MISSING_OR_REVIEW | Tamil `Thayir Sadam` exists; Karnataka Mosaranna not present. |
| Rice | Vangi Bath | Vangi Bath | FOUND_FIX | Current recipe has right identity but generic generated steps. |
| Breakfast | Mangalore Buns | Mangalore Buns | FOUND | Keep. |
| Breakfast | Neer Dosa | Neer Dosa | FOUND | Keep. |
| Breakfast | Akki Rotti | Akki Roti | FOUND_RENAME | Rename spelling to Akki Rotti. |
| Breakfast | Set Dosa | Set Dosa | FOUND | Keep; alias Set Dose. |
| Breakfast | Thatte Idli | Thatte Idli | FOUND_FIX | Needs better recipe steps/image. |
| Breakfast | Ragi Dose | Ragi Dosa | FOUND_RENAME | Rename to Kannada-style Ragi Dose if desired. |
| Millets | Ragi Mudde | Ragi Mudde | FOUND_FIX | Needs method-specific steps. |
| Millets | Ragi Rotti | Ragi Rotti | FOUND | Keep. |
| Millets | Ragi Malt | Ragi Malt | FOUND_FIX | Needs Karnataka-style clarity; avoid conflating ambli/ganji. |
| Vegetables | Bassaru | Bassaru | FOUND | Keep. |
| Vegetables | Huruli Saaru | Kollu Rasam | MISSING | Tamil horse gram rasam exists; Karnataka Huruli Saaru missing. |
| Vegetables | Yennegai | Badanekayi Ennegayi | FOUND_RENAME | Rename to Yennegai with existing name as alias. |
| Vegetables | Avarekalu Saaru | — | MISSING | No current recipe detected. |
| Vegetables | Heerekai Palya | — | MISSING | No current recipe detected. |
| Vegetables | Sorekai Palya | — | MISSING | No current recipe detected. |
| Chicken | Kori Gassi | Kori Rotti | PARTIAL_FIX | Kori Rotti includes curry; standalone Kori Gassi missing/needs fix. |
| Chicken | Kundapura Chicken | — | MISSING | No current recipe detected. |
| Seafood | Mangalorean Fish Curry | Mangalorean Fish Curry | FOUND | Keep. |
| Seafood | Kane Rava Fry | — | MISSING | No current recipe detected. |

## Existing Karnataka Recipe Inventory

For KEEP and RENAME rows, the fields Primary Name, English Subtitle, Aliases, Origin, and Popular Across are included for future naming work.

| Current Recipe Name | Category | Ingredients | Current Quick Guide | Current Region Tags | Image | Status | Primary Name | English Subtitle | Aliases | Origin | Popular Across |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Akki Roti | Rice | 1 cup rice flour; 1 small onion; 2 tbsp coconut; 1 green chilli; 1 tbsp coriander; 1 tbsp oil; Salt | Mix flour, onion, coconut, chilli and salt. / Add water to make soft dough. / Pat thin on a cool pan. / Cook with oil on both sides. / Serve hot. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/akki-rotti.png | 🔄 RENAME | Akki Rotti | Rice flour roti | Akki Roti | Karnataka | Karnataka |
| Avalakki | Breakfast | 2 cups avalakki; 1 onion; 2 tbsp coconut; 1 tsp mustard seeds; Curry leaves; 1 green chilli; 1 tbsp oil; Salt | Rinse avalakki and drain. / Temper mustard seeds, curry leaves and chilli. / Add onion and cook until soft. / Fold in avalakki and salt. / Finish with coconut. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/consistency-45-avalakki.png | ✅ KEEP | Avalakki | Tempered poha | Poha, Karnataka Avalakki | Karnataka | Karnataka |
| Badanekayi Ennegayi | Vegetables / Sides | brinjal; peanuts; sesame; coconut; tamarind; jaggery | Prep the brinjal and peanuts. / Cook with sesame and coconut until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: North Karnataka; cuisine: Karnataka | /assets/images/dishes/karnataka-wave-a-badanekayi-ennegayi.png | 🔄 RENAME | Yennegai | Stuffed brinjal curry | Badanekayi Ennegayi, Ennegayi, Yennegai Palya | North Karnataka | Karnataka |
| Bamboo Shoot Curry | Vegetables / Sides | bamboo shoot; coconut; tamarind; red chilli; coriander seeds; jaggery; mustard seeds; curry leaves | Prep the bamboo shoot and coconut. / Cook with red chilli and coriander seeds until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Malnad, Coastal Karnataka; cuisine: Karnataka | /assets/images/dishes/bamboo-shoot-curry.png | ✅ KEEP | Bamboo Shoot Curry | Malnad coastal bamboo shoot curry | Bamboo Shoot Curry, Kanile Curry | Karnataka | Malnad, Coastal Karnataka |
| Bassaru | Vegetables / Sides | 1/2 cup toor dal; 2 cups greens; 2 tbsp coconut; 1 tsp cumin; 1/2 tsp pepper; 1 tsp tamarind; Curry leaves; Mustard seeds; Salt | Cook dal or greens until soft and save the cooking water. / Grind coconut, cumin, pepper, garlic and a spoon of cooked dal or greens. / Simmer the cooking water with tamarind, paste and salt. / Temper mustard seeds, curry leaves and dried red chilli. / Pour the tempering over the saaru and serve hot. | region: South India, Karnataka; subRegion: Old Mysore, Rural Karnataka; cuisine: Karnataka | /assets/images/dishes/bassaru.png | ✅ KEEP | Bassaru | Greens and dal stock saaru | Huruli Bassaru, Bas Saaru | Karnataka | Old Mysore, Rural Karnataka |
| Beetroot Palya | Vegetables / Sides | 2 beetroots; 1/4 cup grated coconut; 1 green chilli; 1 tsp mustard seeds; Curry leaves; 1/4 tsp turmeric; Salt | Chop beetroot into small pieces. / Temper mustard seeds, curry leaves and chilli. / Add beetroot, turmeric, salt and a splash of water. / Cover and cook until tender. / Finish with grated coconut. | Karnataka | /assets/images/dishes/batch7-beetroot-palya.png | ✅ KEEP | Beetroot Palya | Beetroot coconut stir-fry | Beetroot Poriyal, Beetroot Sabzi | Karnataka | Karnataka, South India |
| Bele Saaru | Vegetables / Sides | 1/2 cup cooked toor dal; 1 tsp tamarind; 1 tsp saaru powder; 1 tomato; 1/2 tsp mustard seeds; Curry leaves; Salt | Simmer tamarind water with tomato and saaru powder. / Add cooked dal and water. / Boil until aromatic. / Temper mustard seeds and curry leaves. / Serve hot. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/batch3b-bele-saaru.png | ✅ KEEP | Bele Saaru | Karnataka dal rasam | Dal Saaru, Bele Rasam | Karnataka | Karnataka |
| Bisibelebath | Rice | 1/2 cup rice; 1/4 cup toor dal; 1 cup mixed vegetables; 1 tbsp bisi bele bath powder; 1 tbsp tamarind water; 1 tbsp ghee; Curry leaves; Salt | Cook rice and dal until soft. / Cook vegetables with tamarind and salt. / Add bisi bele bath powder. / Mix in rice and dal. / Finish with ghee and curry leaves. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/bisi-bele-bath.png | 🔄 RENAME | Bisi Bele Bath | Hot lentil rice | Bisibelebath, Bisi Bele Huliyanna | Karnataka | Karnataka |
| Chicken Sukka | Chicken | 250 g chicken; 1 onion sliced; 1/2 cup coconut grated; 1 tsp ginger garlic paste; 1 tsp chilli powder; 1/2 tsp garam masala; Curry leaves; 1 tbsp oil | Saute onion and curry leaves until soft. / Add ginger garlic paste and chicken. / Cook until chicken releases moisture. / Add spices and coconut. / Roast on low until dry and well coated. | region: South India; subRegion: Mangalore / Coastal Karnataka; cuisine: Mangalorean | /assets/images/dishes/chicken-sukka.png | 🔄 RENAME | Mangalorean Chicken Sukka | Dry coconut chicken | Chicken Sukka, Kori Sukka | Coastal Karnataka | Mangalore, Coastal Karnataka |
| Chow Chow Bath | Rice | rava; sugar; vegetables; ghee; cashews | Prep the rava and sugar. / Cook with vegetables and ghee until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Bengaluru, Old Mysore; cuisine: Karnataka | /assets/images/dishes/chow-chow-bath.png | ✅ KEEP | Chow Chow Bath | Khara bath and kesari bath combo | Karnataka Chow Chow Bath | Bengaluru / Karnataka | Karnataka |
| Congress Kadlekai | Snack | peanuts; chilli powder; curry leaves; hing | Prep the peanuts. / Cook with chilli powder and curry leaves until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Bengaluru; cuisine: Karnataka | /assets/images/dishes/congress-kadlekai.png | ✅ KEEP | Congress Kadlekai | Spiced split peanut snack | Congress Peanuts | Bengaluru / Karnataka | Karnataka |
| Coorg Koli Curry | Chicken | chicken; coconut; onion; ginger; garlic; black pepper; coriander seeds; kachampuli; curry leaves | Prep the chicken and coconut. / Cook with ginger and garlic until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Kodagu; cuisine: Karnataka | /assets/images/dishes/coorg-koli-curry.png | ✅ KEEP | Coorg Koli Curry | Kodagu chicken curry | Coorg Chicken Curry, Kodagu Koli Curry | Kodagu | Karnataka |
| Coorg Pandi Curry | Other | pork; kachampuli; onion; ginger; garlic; black pepper; coriander seeds; cumin; curry leaves | Prep the pork and kachampuli. / Cook with ginger and garlic until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Kodagu; cuisine: Karnataka | /assets/images/dishes/coorg-pandi-curry.png | ✅ KEEP | Coorg Pandi Curry | Kodagu pork curry | Pandi Curry, Kodagu Pork Curry | Kodagu | Karnataka |
| Davangere Benne Dosa | Breakfast | dosa batter; butter; potato palya | Prep the dosa batter and butter. / Cook with potato palya until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Central Karnataka; cuisine: Karnataka | /assets/images/dishes/karnataka-wave-a-davangere-benne-dosa.png | ✅ KEEP | Davangere Benne Dosa | Butter dosa with potato palya | Benne Dosa | Davangere | Karnataka |
| Dharwad Peda | Sweet / Festival | khoya; sugar; ghee; cardamom | Prep the khoya and sugar. / Cook with ghee and cardamom until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: North Karnataka, Dharwad; cuisine: Karnataka | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Ellu Bella | Vegetables / Sides | 0.5 cup sesame seeds; 0.5 cup jaggery pieces; 0.5 cup dry coconut; 0.25 cup peanuts; 0.25 cup roasted gram | Roast sesame seeds lightly and cool. / Chop dry coconut and jaggery into small pieces. / Roast peanuts and remove skins. / Mix sesame, jaggery, coconut, peanuts and roasted gram. / Serve in small festive bowls. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/collections/festival-food.webp | ✅ KEEP | Ellu Bella | Sankranti sesame-jaggery mix | Ellu Bella Mix | Karnataka | Karnataka |
| Ghee Rice | Rice | 1 cup rice; 1½ tbsp ghee; 1 small onion; ½ cup coconut milk; Whole spices; 1 tbsp cashew; 1 green chilli; 1 tsp ginger garlic; Salt; Coriander or mint | Rinse and soak rice for 10 minutes. / Fry cashews in ghee and keep aside. / Bloom whole spices, then saute onion, chilli and ginger garlic. / Toast drained rice briefly. / Cook with coconut milk, water and salt until fluffy. / Rest, fluff and garnish with cashew and herbs. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/ghee-rice.png | ✅ KEEP | Ghee Rice | Karnataka-style fragrant ghee rice | Karnataka Ghee Rice | Karnataka | Karnataka, South India |
| Girmit | Rice | puffed rice; onion; chutney powder; green chilli; coriander; lemon; sev; peanuts | Prep the puffed rice and onion. / Cook with green chilli and coriander until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: North Karnataka; cuisine: Karnataka | /assets/images/snacks/bhel-puri.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Holige | Sweet / Festival | 1 cup chana dal; 1 cup jaggery; 1.5 cups maida; 1 pinch turmeric; 0.5 tsp cardamom powder; 3 tbsp ghee | Rest a soft maida dough with a little oil. / Cook chana dal until soft and drain. / Cook dal with jaggery and cardamom until thick. / Stuff dough with the filling and roll thin. / Roast on a tawa with ghee. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/collections/festival-food.webp | ✅ KEEP | Holige | Sweet stuffed flatbread | Obbattu, Puran Poli | Karnataka | Karnataka, Maharashtra |
| Iyengar Bakery Toast | Breakfast | bread; vegetables; butter; green chutney; cheese | Prep the bread and vegetables. / Cook with butter and green chutney until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Bengaluru; cuisine: Karnataka | /assets/images/dishes/karnataka-wave-a-iyengar-bakery-toast.png | ✅ KEEP | Iyengar Bakery Toast | Bengaluru bakery toast | Bakery Masala Toast | Bengaluru | Karnataka |
| Jolada Rotti | Millets | jowar flour; water; ghee; salt | Prep the jowar flour and water. / Cook with ghee and salt until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: North Karnataka; cuisine: Karnataka | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kadambuttu | Rice | rice rava; water; salt; ghee | Prep the rice rava and water. / Cook with salt and ghee until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Kodagu; cuisine: Karnataka | /assets/images/dishes/kadambuttu.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kadubu | Rice | 1 cup rice flour; 1 cup grated coconut; 0.75 cup jaggery; 0.5 tsp cardamom powder; 1 tsp ghee | Cook rice flour with hot water into a soft dough. / Cook coconut and jaggery until thick. / Flavour the filling with cardamom. / Shape dough cups and fill them. / Steam until the kadubu turns glossy. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/collections/festival-food.webp | ✅ KEEP | Kadubu | Steamed coconut-jaggery dumpling | Kayi Kadubu | Karnataka | Karnataka |
| Kayi Saaru | Vegetables / Sides | coconut; tamarind; rasam powder; garlic; cumin; pepper; curry leaves; mustard seeds | Prep the coconut and tamarind. / Cook with garlic and cumin until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Old Mysore, Mandya; cuisine: Karnataka | /assets/images/collections/soups.webp | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kodubale | Rice | 1 cup rice flour; 1/4 cup maida; 2 tbsp coconut; 1/2 tsp chilli powder; 1/2 tsp cumin; Salt | Mix flours, coconut and spices. / Add hot oil and water to make dough. / Shape into small rings. / Fry on medium heat. / Cool until crisp. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/batch3b-kodubale.png | ✅ KEEP | Kodubale | Crisp rice flour rings | Kodbale | Karnataka | Karnataka |
| Kori Rotti | Chicken | 300 g chicken; 1/2 cup coconut; 1 onion; 1 tsp red chilli; Curry leaves; Salt | Saute onion and curry leaves. / Add chicken, chilli and salt. / Add coconut paste and water. / Simmer until cooked. / Serve with crisp rotti. | region: Coastal India, South India; subRegion: Coastal Karnataka, Mangalore; cuisine: Mangalorean | /assets/images/dishes/batch3b-kori-rotti.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Kosambari | Vegetables / Sides | 1/2 cup soaked moong dal; 1 cucumber; 2 tbsp coconut; 1 tsp lemon juice; Coriander; Salt | Soak moong dal until soft. / Drain well. / Mix cucumber, coconut and coriander. / Add lemon and salt. / Serve fresh. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/kosambari.png | ✅ KEEP | Kosambari | Moong dal cucumber salad | Kosambari Salad | Karnataka | Karnataka |
| Kotte Kadubu | Rice | idli rice; urad dal; fenugreek; salt; jackfruit leaves; oil | Prep the idli rice and urad dal. / Cook with fenugreek and salt until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Coastal Karnataka, Udupi; cuisine: Karnataka | /assets/images/dishes/kotte-kadubu.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Lemon Rice | Rice | 2 cups cooked rice; 1 lemon; 2 tbsp peanuts; 1 tsp mustard seeds; 1 tbsp chana dal; 1/2 tsp turmeric; 8 curry leaves; 1 tbsp oil | Heat oil and temper mustard seeds, dal and peanuts. / Add curry leaves and turmeric. / Turn off heat and add cooked rice. / Squeeze lemon juice and mix well. / Adjust salt before serving. | region: South India; subRegion: Tamil Nadu / Karnataka; cuisine: South Indian | /assets/images/dishes/chitranna-lemon-rice.png | 🔄 RENAME | Chitranna | Lemon rice | Lemon Rice, Elumichai Sadam, Nimmakaya Pulihora | Karnataka | South India |
| Maddur Vada | Rice | 3/4 cup rava; 1 small onion; 1/4 cup rice flour; Curry leaves; Oil for frying; Salt | Mix rava, onion, rice flour and salt. / Add curry leaves and a little water. / Shape flat discs. / Fry until crisp and golden. / Serve hot. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/maddur-vada.png | ✅ KEEP | Maddur Vada | Crisp onion-rava fritter | Maddur Vade | Maddur | Karnataka |
| Majjige Huli | Vegetables / Sides | curd; ash gourd; coconut; green chilli; cumin; curry leaves | Prep the curd and ash gourd. / Cook with coconut and green chilli until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Old Mysore, Malnad; cuisine: Karnataka | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Mandakki Oggarane | Rice | puffed rice; onion; peanuts; mustard seeds; curry leaves; green chilli; turmeric; lemon | Prep the puffed rice and onion. / Cook with mustard seeds and curry leaves until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: North Karnataka; cuisine: Karnataka | /assets/images/snacks/bhel-puri.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Mangalore Buns | Breakfast | 1 ripe banana; 1 cup wheat flour; 2 tbsp curd; 1 tsp sugar; Oil for frying; Salt | Mash banana with curd and sugar. / Mix in flour and salt. / Rest briefly if possible. / Roll small thick rounds. / Fry until puffed and golden. | region: South India; subRegion: Coastal Karnataka, Mangalore; cuisine: Mangalorean | /assets/images/dishes/mangalore-buns.png | ✅ KEEP | Mangalore Buns | Sweet banana poori | Banana Buns, Mangaluru Buns | Coastal Karnataka | Karnataka |
| Mangalore Goli Baje | Vegetables / Sides | maida; curd; green chilli; ginger; coconut | Prep the maida and curd. / Cook with green chilli and ginger until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Coastal Karnataka, Mangaluru; cuisine: Karnataka | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Mangalorean Fish Curry | Seafood | fish; coconut; tamarind; red chilli; coriander seeds; garlic; onion; curry leaves | Prep the fish and coconut. / Cook with red chilli and coriander seeds until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Coastal Karnataka, Mangaluru; cuisine: Karnataka | /assets/images/dishes/mangalorean-fish-curry.png | ✅ KEEP | Mangalorean Fish Curry | Coconut tamarind fish curry | Meen Gassi, Fish Gassi | Coastal Karnataka | Mangalore, Coastal Karnataka |
| Masala Bun | Vegetables / Sides | bun; potato masala; butter; onion; green chutney | Prep the bun and potato masala. / Cook with butter and onion until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Bengaluru; cuisine: Karnataka | /assets/images/dishes/karnataka-wave-a-masala-bun.png | ✅ KEEP | Masala Bun | Bengaluru bakery masala bun | Bakery Masala Bun | Bengaluru | Karnataka |
| Masala Dosa | Breakfast | 2 cups dosa batter; 2 potatoes; 1 onion; 1 green chilli; 1/2 tsp turmeric; 1 tsp mustard seeds; 8 curry leaves; Oil or ghee | Boil and mash potatoes. / Make a quick potato masala with onion, chilli, turmeric and curry leaves. / Spread dosa batter thin on a hot tawa. / Drizzle oil and cook until crisp. / Fill with potato masala and fold. | region: South India; subRegion: Karnataka / South India; cuisine: South Indian | /assets/images/dishes/batch3a-masala-dosa.png | ✅ KEEP | Masala Dosa | Dosa with potato palya | Mysore Masala Dosa | Karnataka / South India | South India |
| Mysore Pak | Sweet / Festival | 1 cup besan; 1 cup ghee; 1.25 cups sugar; 0.5 cup water | Sieve besan and roast lightly in a little ghee. / Make a sticky sugar syrup. / Add besan gradually while stirring continuously. / Pour in warm ghee in batches and cook until frothy. / Spread in a tray and cut while warm. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/collections/desserts.webp | ✅ KEEP | Mysore Pak | Ghee besan sweet | Mysuru Pak | Mysuru / Karnataka | Karnataka |
| Mysore Rasam | Vegetables / Sides | toor dal; tamarind; rasam powder; coconut; tomato; curry leaves; mustard seeds | Cook toor dal until soft. / Simmer tamarind water with tomato and rasam powder. / Add mashed dal and a little coconut paste. / Temper mustard seeds and curry leaves. / Finish with coriander. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/mysore-rasam.png | ✅ KEEP | Mysore Rasam | Coconut dal rasam | Mysuru Rasam | Mysuru / Karnataka | Karnataka |
| Neer Dosa | Rice | 1 cup soaked rice; 1/4 cup coconut; 2 cups water; 1 tsp oil; Salt | Grind soaked rice with coconut. / Thin with water and salt. / Pour on a hot tawa and swirl. / Cover and cook until set. / Serve soft with chutney. | region: South India; subRegion: Coastal Karnataka, Mangalore; cuisine: Mangalorean | /assets/images/dishes/neer-dosa.png | ✅ KEEP | Neer Dosa | Thin rice dosa | Neer Dose | Coastal Karnataka | Mangalore, Karnataka |
| Nippattu | Rice | 1 cup rice flour; 2 tbsp peanuts; 1 tsp sesame seeds; 1/2 tsp chilli powder; Curry leaves; Salt | Mix rice flour, peanuts and spices. / Add hot oil and water to form dough. / Pat into small discs. / Fry until crisp. / Cool before serving. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/batch3b-nippattu.png | ✅ KEEP | Nippattu | Crisp rice flour snack | Nippat | Karnataka | Karnataka |
| Obbattu | Sweet / Festival | 1 cup chana dal; 1 cup jaggery; 1.5 cups maida or wheat flour; 1 pinch turmeric; 0.5 tsp cardamom powder; 3 tbsp ghee | Knead a soft flour dough with oil and rest it. / Cook chana dal until soft and drain well. / Cook dal with jaggery and cardamom to make the filling. / Stuff dough portions with filling and roll gently. / Cook on a tawa with ghee until golden spots appear. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/collections/desserts.webp | ✅ KEEP | Obbattu | Sweet stuffed flatbread | Holige, Puran Poli | Karnataka | Karnataka, Maharashtra |
| Paneer Dosa | Breakfast | 2 cups dosa batter; 150 g paneer; 1 onion; 1 capsicum; Green Chilli | Prep dosa batter and paneer before starting. / Cook the base gently with the supporting ingredients. / Finish Paneer Dosa warm and adjust seasoning to taste. | region: South India; subRegion: South Indian Fusion; cuisine: South Indian / Fusion | /assets/images/dishes/dosa-homestyle.png | ❌ INCORRECTLY_TAGGED | — | — | — | — | — |
| Pathrode | Rice | colocasia leaves; rice; coconut; tamarind; red chilli; jaggery; cumin; coconut oil | Prep the colocasia leaves and rice. / Cook with tamarind and red chilli until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Coastal Karnataka, Mangaluru; cuisine: Karnataka | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Potato Palya | Vegetables / Sides | 3 potatoes; 1 onion; 1 tsp mustard seeds; Curry leaves; 1 green chilli; 1/4 tsp turmeric; Salt | Boil, peel and roughly mash the potatoes. / Temper mustard seeds, curry leaves and chilli. / Saute onion until soft. / Add turmeric, potato and salt. / Mix until warm and lightly mashed. | Karnataka | /assets/images/dishes/batch7-potato-palya.png | ✅ KEEP | Potato Palya | Karnataka potato masala | Aloo Palya, Dosa Palya | Karnataka | Karnataka |
| Prawn Ghee Roast | Seafood | 250 g prawns; 2 tbsp ghee; 1 tbsp tamarind water; 1 tsp chilli powder; 1 tsp coriander powder; 1/2 tsp cumin; Curry leaves; Lemon | Clean prawns and pat dry. / Make a thick spice paste with tamarind and powders. / Heat ghee and fry curry leaves. / Add prawns and spice paste. / Roast until prawns are coated and cooked. | region: South India; subRegion: Mangalore / Coastal Karnataka; cuisine: Mangalorean | /assets/images/dishes/prawn-ghee-roast.png | ✅ KEEP | Prawn Ghee Roast | Mangalorean ghee roast prawns | Royyala Ghee Roast | Coastal Karnataka | Mangalore, Karnataka |
| Prawn Sukka | Seafood | 250 g prawns; 1/2 cup coconut; 1 onion; 1 tsp red chilli; Curry leaves; Salt | Clean prawns and season with salt and red chilli. / Saute onion and curry leaves until fragrant. / Add coconut and chilli, then roast briefly until the coconut smells nutty. / Add prawns and cook just until they turn opaque. / Keep tossing until the mixture is dry and the coconut coats the prawns. | region: Coastal India, South India; subRegion: Coastal Karnataka, Mangalore; cuisine: Mangalorean | /assets/images/dishes/prawn-sukka.png | ✅ KEEP | Prawn Sukka | Dry coconut prawn sukka | Yetthi Sukka | Coastal Karnataka | Mangalore, Karnataka |
| Puliyogare | Rice | 2 cups cooked rice; 2 tbsp tamarind paste; 2 tbsp peanuts; 1 tsp mustard seeds; 1 tbsp sesame oil; 1 tbsp puliyogare powder; 8 curry leaves; Salt | Heat oil and temper mustard seeds and curry leaves. / Add peanuts and roast lightly. / Stir in tamarind paste and puliyogare powder. / Cook until the paste thickens. / Mix with rice and adjust salt. | region: South India; subRegion: Karnataka / Tamil Nadu; cuisine: South Indian | /assets/images/dishes/batch3b-puliyogare.png | ✅ KEEP | Puliyogare | Tamarind rice | Tamarind Rice, Puliyodarai, Pulihora | Karnataka | South India |
| Ragi Malt | Millets | ragi flour; milk; jaggery; cardamom; water | Mix ragi flour with a little water to make a smooth slurry. / Heat milk or water in a pan. / Stir in the ragi slurry slowly. / Cook until glossy and slightly thick. / Sweeten and serve warm. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/drinks/ragi-malt-homestyle.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Ragi Mudde | Millets | ragi flour; water; ghee; salt | Prep the ragi flour and water. / Cook with ghee and salt until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Old Mysore, Rural Karnataka; cuisine: Karnataka | /assets/images/dishes/ragi-mudde.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Ragi Porridge | Millets | Ragi; Milk; Jaggery; Coriander for garnish | Mix ragi flour with a little cool water to make a lump-free slurry. / Bring milk or water to a gentle simmer. / Stir in the ragi slurry and cook until glossy and thick. / Serve warm after cooling slightly. | region: South India; subRegion: Karnataka / South India; cuisine: South Indian | /assets/images/dishes/ragi-porridge-homestyle.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Ragi Rotti | Millets | ragi flour; onion; coconut; green chilli; coriander; salt | Prep the ragi flour and onion. / Cook with coconut and green chilli until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Old Mysore, Rural Karnataka; cuisine: Karnataka | /assets/images/dishes/ragi-rotti.png | ✅ KEEP | Ragi Rotti | Finger millet rotti | Ragi Roti | Karnataka | Karnataka |
| Set Dosa | Breakfast | 2 cups dosa batter; 1 tbsp oil; A little water; Salt if needed | Loosen batter slightly. / Pour small thick dosas. / Drizzle oil around edges. / Cover and cook until fluffy. / Serve as a stack. | region: South India; subRegion: Karnataka; cuisine: Karnataka | /assets/images/dishes/set-dosa.png | ✅ KEEP | Set Dosa | Soft stacked dosa | Set Dose | Karnataka | Karnataka, South India |
| Shenga Chutney | Vegetables / Sides | peanuts; dry red chilli; garlic; cumin; sesame seeds; salt; jaggery | Prep the peanuts and dry red chilli. / Cook with garlic and cumin until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: North Karnataka; cuisine: Karnataka | /assets/images/dishes/shenga-chutney.png | ✅ KEEP | Shenga Chutney | Peanut dry chutney | Peanut Chutney Powder | North Karnataka | Karnataka |
| Soppu Saaru | Vegetables / Sides | 2 cups greens; 1/2 cup toor dal; 1 tsp tamarind; 3 garlic cloves; 1 tsp cumin; 1/2 tsp pepper; Curry leaves; Mustard seeds; Salt | Cook chopped greens with toor dal until soft. / Simmer tamarind water with garlic, cumin and pepper. / Add cooked greens and dal with enough water to make a pourable saaru. / Temper mustard seeds, curry leaves and dried red chilli. / Finish with tempering and serve hot. | region: South India, Karnataka; subRegion: Old Mysore, Rural Karnataka; cuisine: Karnataka | /assets/images/dishes/soppu-saaru.png | ✅ KEEP | Soppu Saaru | Greens saaru | Greens Saaru | Old Mysore / Rural Karnataka | Karnataka |
| Spicy Masala Dosa | Rice | 1 cup rice or cooked rice; 1/2 cup dal; 1 Potato; Green Chilli; 1 Onion | Keep batter and sides ready. / Heat the pan or steamer. / Cook until set and lightly crisp or soft as needed. / Serve hot with chutney and sambar. | region: South India; subRegion: South India; cuisine: South Indian | /assets/images/dishes/dosa.png | ✅ KEEP | Spicy Masala Dosa | — | — | South Indian | Karnataka |
| Sweet Holige | Vegetables / Sides | 1 cup wheat flour; Jaggery; 1/2 cup dal; 1 coconut; Cardamom; Turmeric; Ghee | Prepare wheat flour, jaggery before cooking. / Cook the jaggery-lentil filling until dry, cool it fully, then roll gently and cook the filled flatbread with ghee. / Cook until the sweet flatbread has the expected texture and the core ingredients are fully done. / Serve Sweet Holige fresh and adjust salt and seasoning to taste. | region: South India; subRegion: Karnataka / Maharashtra; cuisine: Karnataka | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Tambuli | Vegetables / Sides | curd; coconut; herbs; cumin; green chilli; curry leaves; mustard seeds; ghee | Prep the curd and coconut. / Cook with cumin and green chilli until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Coastal Karnataka, Malnad; cuisine: Karnataka | /assets/images/dishes/tambuli.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Thatte Idli | Breakfast | idli batter; ghee | Prep the idli batter. / Cook with ghee until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Bengaluru, Old Mysore; cuisine: Karnataka | /assets/images/dishes/homestyle-kitchen-placeholder.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Udupi Sambar | Vegetables / Sides | toor dal; vegetables; sambar powder; tamarind; jaggery; coconut | Prep the toor dal and vegetables. / Cook with sambar powder and tamarind until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Coastal Karnataka, Udupi; cuisine: Karnataka | /assets/images/dishes/udupi-sambar.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |
| Vangi Bath | Rice | rice; brinjal; vangi bath powder; peanuts; tamarind | Prep the rice and brinjal. / Cook with vangi bath powder and peanuts until the base is ready. / Adjust salt, heat and texture. / Finish with tempering or ghee if appropriate. / Serve warm with the suggested pairings. | region: South India, Karnataka; subRegion: Bengaluru, Old Mysore; cuisine: Karnataka | /assets/images/dishes/vangi-bath.png | 🛠 RECIPE_FIX_REQUIRED | — | — | — | — | — |

## Missing Gold Recipes

| Gold dish | Category | Status | Notes |
|---|---|---|---|
| Mosaranna | Rice | ➕ MISSING_ICONIC_RECIPE | Tamil `Thayir Sadam` exists; Karnataka Mosaranna not present. Current match: Thayir Sadam |
| Huruli Saaru | Vegetables | ➕ MISSING_ICONIC_RECIPE | Tamil horse gram rasam exists; Karnataka Huruli Saaru missing. Current match: Kollu Rasam |
| Avarekalu Saaru | Vegetables | ➕ MISSING_ICONIC_RECIPE | No current recipe detected. Current match: — |
| Heerekai Palya | Vegetables | ➕ MISSING_ICONIC_RECIPE | No current recipe detected. Current match: — |
| Sorekai Palya | Vegetables | ➕ MISSING_ICONIC_RECIPE | No current recipe detected. Current match: — |
| Kori Gassi | Chicken | 🛠 RECIPE_FIX_REQUIRED | Kori Rotti includes curry; standalone Kori Gassi missing/needs fix. Current match: Kori Rotti |
| Kundapura Chicken | Chicken | ➕ MISSING_ICONIC_RECIPE | No current recipe detected. Current match: — |
| Kane Rava Fry | Seafood | ➕ MISSING_ICONIC_RECIPE | No current recipe detected. Current match: — |

## Safe Renames

| Current | Recommended primary name | English subtitle | Aliases | Origin | Popular across |
|---|---|---|---|---|---|
| Akki Roti | Akki Rotti | Rice flour roti | Akki Roti | Karnataka | Karnataka |
| Badanekayi Ennegayi | Yennegai | Stuffed brinjal curry | Badanekayi Ennegayi, Ennegayi, Yennegai Palya | North Karnataka | Karnataka |
| Bisibelebath | Bisi Bele Bath | Hot lentil rice | Bisibelebath, Bisi Bele Huliyanna | Karnataka | Karnataka |
| Chicken Sukka | Mangalorean Chicken Sukka | Dry coconut chicken | Chicken Sukka, Kori Sukka | Coastal Karnataka | Mangalore, Coastal Karnataka |
| Lemon Rice | Chitranna | Lemon rice | Lemon Rice, Elumichai Sadam, Nimmakaya Pulihora | Karnataka | South India |

## Recipe Fixes Required

| Recipe | Why fix is required | Suggested direction |
|---|---|---|
| Dharwad Peda | Uses placeholder image and generic generated steps; needs peda-specific slow milk reduction/khoya finishing detail. | Dharwad Peda |
| Girmit | Image appears shared/generic bhel-puri; steps say cook puffed rice and finish with tempering, which does not capture girmit assembly. | Girmit |
| Jolada Rotti | Steps are generic and mention tempering/ghee; needs hand-patted jowar rotti method. | Jolada Rotti |
| Kadambuttu | Generic generated steps; needs rice rava cooking, shaping, and steaming method. | Kadambuttu |
| Kayi Saaru | Generic generated steps; needs specific coconut-spice saaru method. | Kayi Saaru |
| Kori Rotti | Should be Kori Gassi with rotti or separate Kori Gassi; quick guide is simplified. | Kori Gassi with Rotti |
| Kotte Kadubu | Generic generated steps; needs jackfruit-leaf cup steaming method. | Kotte Kadubu |
| Majjige Huli | Generic generated finish text; needs buttermilk/coconut paste method and avoid boiling curd. | Majjige Huli |
| Mandakki Oggarane | Generic generated steps; should be a quick tempered puffed rice snack, not cooked like a curry. | Mandakki Oggarane |
| Mangalore Goli Baje | Generic generated steps; needs batter fermentation/resting and frying method. | Mangalore Goli Baje |
| Pathrode | Generic generated steps; needs colocasia leaf spreading, rolling, steaming, and slicing method. | Pathrode |
| Ragi Malt | Needs decision between sweet malt, ragi ambli, and ragi ganji; current aliases would be unsafe without clarity. | Ragi Malt |
| Ragi Mudde | Generic steps; needs classic stirring/beating ragi flour into hot water method. | Ragi Mudde |
| Ragi Porridge | Contains odd coriander garnish and unclear sweet/savory identity; needs local review. | Ragi Porridge |
| Sweet Holige | Duplicate/overlap with Holige/Obbattu; should consolidate or clarify variant. | Holige |
| Tambuli | Generic generated steps and says serve warm; tambuli is usually cooling/curd-based. | Tambuli |
| Thatte Idli | Generic steps and placeholder image; needs plate-idli steaming details. | Thatte Idli |
| Udupi Sambar | Generic generated steps; needs Udupi coconut/jaggery/roasted spice profile. | Udupi Sambar |
| Vangi Bath | Generic generated steps; needs vangi bath powder/tempering/rice folding method. | Vangi Bath |

## Wrong Regional Associations / Caution Rows

| Recipe | Current tags | Status | Reason |
|---|---|---|---|
| Paneer Dosa | region: South India; subRegion: South Indian Fusion; cuisine: South Indian / Fusion | ❌ INCORRECTLY_TAGGED | South Indian fusion utility recipe, not Karnataka-specific. |

## Final Lists

### 1. Existing Karnataka Recipes

- Akki Roti — 🔄 RENAME
- Avalakki — ✅ KEEP
- Badanekayi Ennegayi — 🔄 RENAME
- Bamboo Shoot Curry — ✅ KEEP
- Bassaru — ✅ KEEP
- Beetroot Palya — ✅ KEEP
- Bele Saaru — ✅ KEEP
- Bisibelebath — 🔄 RENAME
- Chicken Sukka — 🔄 RENAME
- Chow Chow Bath — ✅ KEEP
- Congress Kadlekai — ✅ KEEP
- Coorg Koli Curry — ✅ KEEP
- Coorg Pandi Curry — ✅ KEEP
- Davangere Benne Dosa — ✅ KEEP
- Dharwad Peda — 🛠 RECIPE_FIX_REQUIRED
- Ellu Bella — ✅ KEEP
- Ghee Rice — ✅ KEEP
- Girmit — 🛠 RECIPE_FIX_REQUIRED
- Holige — ✅ KEEP
- Iyengar Bakery Toast — ✅ KEEP
- Jolada Rotti — 🛠 RECIPE_FIX_REQUIRED
- Kadambuttu — 🛠 RECIPE_FIX_REQUIRED
- Kadubu — ✅ KEEP
- Kayi Saaru — 🛠 RECIPE_FIX_REQUIRED
- Kodubale — ✅ KEEP
- Kori Rotti — 🛠 RECIPE_FIX_REQUIRED
- Kosambari — ✅ KEEP
- Kotte Kadubu — 🛠 RECIPE_FIX_REQUIRED
- Lemon Rice — 🔄 RENAME
- Maddur Vada — ✅ KEEP
- Majjige Huli — 🛠 RECIPE_FIX_REQUIRED
- Mandakki Oggarane — 🛠 RECIPE_FIX_REQUIRED
- Mangalore Buns — ✅ KEEP
- Mangalore Goli Baje — 🛠 RECIPE_FIX_REQUIRED
- Mangalorean Fish Curry — ✅ KEEP
- Masala Bun — ✅ KEEP
- Masala Dosa — ✅ KEEP
- Mysore Pak — ✅ KEEP
- Mysore Rasam — ✅ KEEP
- Neer Dosa — ✅ KEEP
- Nippattu — ✅ KEEP
- Obbattu — ✅ KEEP
- Pathrode — 🛠 RECIPE_FIX_REQUIRED
- Potato Palya — ✅ KEEP
- Prawn Ghee Roast — ✅ KEEP
- Prawn Sukka — ✅ KEEP
- Puliyogare — ✅ KEEP
- Ragi Malt — 🛠 RECIPE_FIX_REQUIRED
- Ragi Mudde — 🛠 RECIPE_FIX_REQUIRED
- Ragi Porridge — 🛠 RECIPE_FIX_REQUIRED
- Ragi Rotti — ✅ KEEP
- Set Dosa — ✅ KEEP
- Shenga Chutney — ✅ KEEP
- Soppu Saaru — ✅ KEEP
- Spicy Masala Dosa — ✅ KEEP
- Sweet Holige — 🛠 RECIPE_FIX_REQUIRED
- Tambuli — 🛠 RECIPE_FIX_REQUIRED
- Thatte Idli — 🛠 RECIPE_FIX_REQUIRED
- Udupi Sambar — 🛠 RECIPE_FIX_REQUIRED
- Vangi Bath — 🛠 RECIPE_FIX_REQUIRED

### 2. Missing Gold Recipes

- Mosaranna — current Tamil Thayir Sadam exists, but Karnataka Mosaranna needs review or separate representation.
- Huruli Saaru — Tamil Kollu Rasam exists, but Karnataka Huruli Saaru is missing.
- Avarekalu Saaru
- Heerekai Palya
- Sorekai Palya
- Kundapura Chicken
- Kane Rava Fry

### 3. Safe Renames

- Akki Roti -> Akki Rotti
- Badanekayi Ennegayi -> Yennegai
- Bisibelebath -> Bisi Bele Bath
- Chicken Sukka -> Mangalorean Chicken Sukka
- Lemon Rice -> Chitranna

### 4. Recipe Fixes Required

- Dharwad Peda
- Girmit
- Jolada Rotti
- Kadambuttu
- Kayi Saaru
- Kori Rotti
- Kotte Kadubu
- Majjige Huli
- Mandakki Oggarane
- Mangalore Goli Baje
- Pathrode
- Ragi Malt
- Ragi Mudde
- Ragi Porridge
- Sweet Holige
- Tambuli
- Thatte Idli
- Udupi Sambar
- Vangi Bath

### 5. Wrong Regional Associations

- Paneer Dosa

## Final Validation

Validation scope: every item previously marked `🔄 RENAME`, `🛠 RECIPE_FIX_REQUIRED`, or `➕ MISSING_ICONIC_RECIPE`.

Final decision legend:

- 🟢 APPROVED: authentic enough for Beta 3 planning.
- 🟡 NEEDS_LOCAL_REVIEW: plausible Karnataka identity, but recipe method/name/alias needs local confirmation.
- 🔴 REJECT: do not proceed as proposed.

### Approved Renames

| Current proposal | Final decision | Confidence | Strict authenticity review |
|---|---|---:|---|
| Akki Roti -> Akki Rotti | 🟢 APPROVED | 94 | Iconic Karnataka breakfast/rotti. Home cooks recognize it. Ingredients and method match rice flour rotti: rice flour, onion, coconut, chilli, coriander, patting by hand, tawa cooking. Canonical Kannada spelling `Akki Rotti` is acceptable; keep `Akki Roti` as alias. |
| Bisibelebath -> Bisi Bele Bath | 🟢 APPROVED | 96 | Iconic Karnataka rice-dal dish. Ingredients match: rice, toor dal, vegetables, bisi bele bath powder, tamarind, ghee, curry leaves. Method matches a compact home version. Canonical spacing should be `Bisi Bele Bath`; keep `Bisibelebath` and `Bisi Bele Huliyanna` as aliases. |
| Lemon Rice -> Chitranna | 🟢 APPROVED | 88 | Strong Karnataka/South India dish, and current recipe matches Karnataka-style chitranna closely: cooked rice, lemon, peanuts, mustard, chana dal, turmeric, curry leaves. Aliases are useful, but `Elumichai Sadam` and `Nimmakaya Pulihora` are neighboring-state names; use as search aliases, not origin claims. |
| Badanekayi Ennegayi -> Yennegai | 🟡 NEEDS_LOCAL_REVIEW | 78 | The dish is genuinely North Karnataka and ingredients match the stuffed brinjal family: brinjal, peanut, sesame, coconut, tamarind, jaggery. However `Badanekayi Ennegayi` is already a recognizable Karnataka name. `Yennegai` may be shorter but could lose clarity. Approve concept, but confirm primary title locally before renaming. |
| Chicken Sukka -> Mangalorean Chicken Sukka | 🟡 NEEDS_LOCAL_REVIEW | 72 | Coastal Karnataka association is real and ingredients partly match: chicken, coconut, curry leaves, dry roasted finish. But the seasoning is simplified and includes generic garam masala rather than a clearly Mangalorean roasted spice profile. Keep as a rename candidate only after local review or recipe strengthening. |

### Approved New Dishes

| Missing proposal | Final decision | Confidence | Strict authenticity review |
|---|---|---:|---|
| Avarekalu Saaru | 🟢 APPROVED | 92 | Iconic Karnataka seasonal/home dish. Would be recognized by Karnataka home cooks, especially Bengaluru/Old Mysore/Malnad contexts. Add later as a distinct recipe; not an alias of generic saaru. |
| Huruli Saaru | 🟢 APPROVED | 90 | Strong Karnataka horse gram dish. Current `Kollu Rasam` is Tamil-tagged and should not be reused. Add Huruli Saaru as a separate Karnataka recipe with huruli/horse gram, saaru spices, tamarind, and tempering. |
| Kundapura Chicken | 🟢 APPROVED | 88 | High-confidence Coastal Karnataka chicken dish. Should be separate from generic chicken curry and Mangalorean chicken sukka because the spice base and identity are distinct. |
| Kane Rava Fry | 🟢 APPROVED | 86 | Strong coastal Karnataka seafood candidate if kane/ladyfish is supported. It should be separate from generic fish fry because fish choice and rava-fry coastal identity matter. |

### Rejected Proposals

| Proposal | Final decision | Confidence | Why rejected |
|---|---|---:|---|
| Sweet Holige as a separate fix path | 🔴 REJECT | 93 | Duplicate/near-duplicate of existing `Holige` and `Obbattu`. Same dish family, same cultural role, overlapping ingredients. Do not fix as separate Beta 3 recipe unless it is intentionally a distinct variant. Consolidate through aliases later. |
| Ragi Porridge as Karnataka iconic recipe | 🔴 REJECT | 90 | Current recipe is a generic sweet ragi/milk porridge with an odd coriander garnish. It is not safe as a Karnataka iconic dish. Keep generic or replace later with a clearly defined `Ragi Ambli`, `Ragi Ganji`, or `Ragi Malt` variant. |
| Mosaranna using current Thayir Sadam as match | 🔴 REJECT | 88 | Current match is explicitly Tamil `Thayir Sadam`. Do not relabel it as Karnataka Mosaranna. Mosaranna can be added later or handled as a carefully reviewed curd-rice alias if the recipe is generalized. |
| Kori Gassi via current Kori Rotti record | 🔴 REJECT | 82 | Current `Kori Rotti` is a served dish format, not a standalone Kori Gassi recipe. It lacks a clear enough coastal gassi masala profile. Add or fix separately rather than treating the current item as Kori Gassi. |

### Needs Local Review

| Item | Final decision | Confidence | Strict authenticity review |
|---|---|---:|---|
| Dharwad Peda | 🟡 NEEDS_LOCAL_REVIEW | 84 | Genuinely iconic Karnataka sweet. Ingredients are broadly plausible: khoya, sugar, ghee, cardamom. Quick Guide is too generic and image is placeholder. Needs proper Dharwad peda method before approval. |
| Girmit | 🟡 NEEDS_LOCAL_REVIEW | 76 | Recognizable North Karnataka snack. Ingredients match roughly, but current method says to cook puffed rice and finish with tempering; that does not capture girmit assembly. Image is generic bhel. Needs local method review. |
| Jolada Rotti | 🟡 NEEDS_LOCAL_REVIEW | 82 | Iconic North Karnataka staple. Ingredients match, but method is generic and mentions ghee/tempering in a way that does not fit the hand-patted rotti technique. |
| Kadambuttu | 🟡 NEEDS_LOCAL_REVIEW | 80 | Kodagu rice dumplings are authentic and recognizable. Ingredients match, but method is too generic and needs rice rava cooking, shaping, and steaming details. |
| Kayi Saaru | 🟡 NEEDS_LOCAL_REVIEW | 68 | Plausible Old Mysore/Mandya dish, but less broadly iconic than Bassaru/Huruli Saaru. Ingredients are plausible; method is generic. Needs local review before Beta 3. |
| Kotte Kadubu | 🟡 NEEDS_LOCAL_REVIEW | 78 | Udupi/coastal Karnataka identity is valid. Ingredients mention jackfruit leaves, idli rice, urad dal, fenugreek. Method is generic and must show leaf-cup steaming. |
| Majjige Huli | 🟡 NEEDS_LOCAL_REVIEW | 83 | Authentic Karnataka dish. Ingredients match: curd, ash gourd, coconut, green chilli, cumin, curry leaves. Quick Guide is generic and should avoid boiling/splitting curd. |
| Mandakki Oggarane | 🟡 NEEDS_LOCAL_REVIEW | 78 | North Karnataka puffed rice dish is authentic. Ingredients are plausible, but method is generic and should clarify quick tempering/tossing rather than curry-style cooking. |
| Mangalore Goli Baje | 🟡 NEEDS_LOCAL_REVIEW | 82 | Iconic coastal Karnataka snack. Ingredients match broadly: maida, curd, chilli, ginger, coconut. Method needs batter rest/fermentation and frying; current guide is too generic. |
| Pathrode | 🟡 NEEDS_LOCAL_REVIEW | 84 | Coastal Karnataka dish is authentic. Ingredients match: colocasia leaves, rice, coconut, tamarind, chilli, jaggery. Method must include spreading batter, rolling leaves, steaming, slicing. |
| Ragi Malt | 🟡 NEEDS_LOCAL_REVIEW | 74 | Karnataka ragi drink is plausible, but current recipe is sweet milk-based and aliases could confuse it with ambli/ganji. Need decide exact canonical dish. |
| Ragi Mudde | 🟡 NEEDS_LOCAL_REVIEW | 86 | Iconic Karnataka millet staple. Ingredients match, but method must show stirring ragi flour into boiling water and shaping balls. Current guide is generic. |
| Tambuli | 🟡 NEEDS_LOCAL_REVIEW | 78 | Coastal/Malnad Karnataka tambuli is authentic. Ingredients match broadly, but current guide says serve warm and uses generic cooking language; tambuli is usually cooling/curd-based. |
| Thatte Idli | 🟡 NEEDS_LOCAL_REVIEW | 82 | Recognizable Karnataka/Bidadi-style idli. Ingredients are too thin and method is generic. Needs plate-idli steaming details and better image. |
| Udupi Sambar | 🟡 NEEDS_LOCAL_REVIEW | 80 | Udupi sambar is authentic. Ingredients include toor dal, vegetables, tamarind, jaggery, coconut, but method is generic and should include Udupi-style spice/coconut profile. |
| Vangi Bath | 🟡 NEEDS_LOCAL_REVIEW | 84 | Iconic Karnataka rice dish. Ingredients match: rice, brinjal, vangi bath powder, peanuts, tamarind. Method is generic and should show brinjal masala cooking and folding with rice. |
| Heerekai Palya | 🟡 NEEDS_LOCAL_REVIEW | 76 | Plausible Karnataka home dish, but less iconic than the core gold list. Approve only after deciding whether this is Beta 3 essential or Beta 4 coverage. |
| Sorekai Palya | 🟡 NEEDS_LOCAL_REVIEW | 74 | Plausible Karnataka home dish, but broad and not as iconic. Needs local review and recipe specificity. |

### Final Validation Summary

| Bucket | Count |
|---|---:|
| Approved renames | 3 |
| Rename candidates needing local review | 2 |
| Approved new dishes | 4 |
| Rejected proposals | 4 |
| Needs local review / recipe validation | 18 |

Strict Beta 3 recommendation:

- Proceed only with the three approved renames if Beta 3 needs safe naming wins: `Akki Rotti`, `Bisi Bele Bath`, and `Chitranna`.
- Add no new Karnataka recipes until recipe authoring is explicitly allowed.
- Do not use current `Thayir Sadam` as Mosaranna.
- Do not treat current `Kori Rotti` as standalone Kori Gassi.
- Do not keep `Sweet Holige` as a separate duplicate path unless a distinct variant is defined.
- Keep all 🟡 items in local review or recipe-fix backlog.

## Read-Only Validation

- Parsed active recipes from `database/generated/recipes.json`.
- No validation scripts that write artifacts were run.
- No source, recipe, generated, engine, scoring, ranking, analytics, desktop, collections, or UI files were modified by this audit.
