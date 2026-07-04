# Beta 3 Regional Identity + Recipe Authenticity Audit

Date: 2026-07-02  
Scope: active mobile/generated recipe database only  
Mode: audit report only; no recipe/data/engine changes

## 1. Executive Summary

Audited 659 active recipes from `database/generated/recipes.json` for regional identity, recipe authenticity, ingredient-family coverage, and state/region representation.

Tomo is in a strong position for Beta 3: many recipes already carry real regional identity, especially Karnataka, Andhra & Telangana, Tamil Nadu, Kerala, Bengal, Maharashtra, and the Northeast. The strongest regional content is not just tagged correctly; it also has matching ingredients, pairings, and quick-guide structure.

The main opportunity is not to regionalize everything. It is to selectively rename or strengthen dishes where the current recipe already points to a known regional food. The highest-confidence wins are dishes currently named generically despite having regional tags and authentic-enough ingredients, such as `Chicken Biryani`, `Chicken Stew`, `Chicken Sukka`, `Lemon Rice`, `Coconut Rice`, and `Chicken Roll`.

Sensitive protein dishes, especially pork and beef, should stay conservative. Do not rename or regionalize them unless the dish is already clearly regional and the recipe profile supports it. The current pork set already includes several explicitly regional dishes; the generic `Pork Curry` should not be renamed in Beta 3.

Validation snapshot:

| Check | Result |
|---|---:|
| Active recipes audited | 659 |
| Unique recipe IDs | 659 |
| Duplicate IDs | 0 |
| Unique source IDs | 659 |
| Duplicate title groups | 0 |
| Quick Guide coverage | 659 / 659 |
| Pairing coverage | 659 / 659 |
| Broken image paths | 0 |
| Placeholder/default-like images | 73 |

Existing validation scripts are present, including `scripts/validate_recipe_data.js`, but that script writes validation artifacts. To keep this pass read-only except for this report, I ran read-only equivalent integrity checks and `node --check` syntax checks for the validation scripts instead of executing report-writing scripts.

## 2. Top Findings

1. **Regional coverage is strongest where the recipe names are already specific.** Examples: `Akki Roti`, `Badanekayi Ennegayi`, `Mangalore Buns`, `Chepala Pulusu`, `Gongura Pappu`, `Meen Moilee`, `Shorshe Ilish`, `Bombil Fry`, `Dohneiiong`.

2. **Several generic titles can safely become more personal and regional.** The data already supports regional framing for dishes such as `Chicken Biryani`, `Chicken Stew`, `Chicken Sukka`, `Lemon Rice`, `Coconut Rice`, `Chicken Roll`, `Sambar Rice`, and `Rasam Rice`.

3. **Some regional-looking recipes need content fixes before renaming.** `Madras Curry`, `Pitha`, `Ragi Porridge`, and several generic coastal/non-veg dishes are too broad or too sparse to receive a more specific regional name without recipe work.

4. **Avoid fake precision.** Generic dishes like `Chicken Curry`, `Egg Curry`, `Fish Curry`, `Fish Fry`, `Dal Rice`, `Khichdi`, `Paneer Sandwich`, and `Onion Rice` should stay generic unless a new, specific regional variant is added.

5. **Pork and beef need a conservative lock.** Existing specific pork/beef recipes such as `Coorg Pandi Curry`, `Dohneiiong`, `Smoked Pork Curry`, `Wahan Mosdeng`, `Phagshapa`, and `Kerala Beef Fry` can keep their identity. Generic `Pork Curry` should not be renamed.

6. **Ingredient family gaps are now more interesting than raw recipe count gaps.** Okra, bottle gourd, horse gram, gongura, raw mango, jackfruit, and several bread-based Indian regional snacks remain thin compared with chicken, rice, paneer, potato, and dal.

7. **Some states are represented as broad umbrellas rather than distinct places.** North & West India is useful for UI grouping but hides Punjab, Gujarat, Rajasthan, Bihar, Goa, and Odisha as individual culinary identities.

## 3. High-Confidence Rename Candidates

These are `RENAME_SAFE` candidates: the current recipe name is generic or less personal, while region/cuisine tags, ingredients, quick-guide steps, and pairings already support a more regional name. Do not apply automatically; this is the lock review list.

| Current name | Suggested regional identity | Current region/cuisine signals | Authenticity check | Notes |
|---|---|---|---|---|
| Chicken Biryani | Hyderabadi Chicken Biryani / Hyderabadi Dum Chicken Biryani | Hyderabadi; Andhra/Telangana | Chicken, basmati rice, curd, fried onions, biryani masala, mint/coriander, saffron milk, dum-style layering | Strongest high-confidence rename. |
| Veg Biryani | Hyderabadi Veg Biryani | Hyderabadi; Hyderabad / Pan-Indian | Basmati, mixed vegetables, biryani masala, ginger-garlic, mint/coriander, layered cooking, raita + mirchi ka salan | Safe if avoiding the stricter word `Dum`; current method is layered but simplified. |
| Chicken Stew | Kerala Chicken Stew | Kerala | Chicken, potato, carrot, onion, coconut milk, pepper; best with appam | Strong safe rename. Add curry leaves later if desired, but current profile is acceptable. |
| Chicken Sukka | Mangalorean Chicken Sukka | Mangalorean; Mangalore / Coastal Karnataka | Chicken, coconut, curry leaves, dry roasted finish; best with neer dosa/ghee rice | Very strong safe rename. |
| Chicken Roll | Kolkata Chicken Roll | Kolkata Street Food; Kolkata | Chicken roll identity already present in cuisine/collection | Safe; adds place memory without recipe changes. |
| Lemon Rice | Chitranna / Karnataka Chitranna | Tamil Nadu / Karnataka; image path includes `chitranna-lemon-rice` | Cooked rice, lemon, peanuts, mustard, chana dal, turmeric, curry leaves | Safe if surfaced as `Chitranna (Lemon Rice)` to avoid confusing users. |
| Coconut Rice | Thengai Sadam / Tamil Coconut Rice | Tamil; Tamil Nadu | Cooked rice, grated coconut, peanuts, mustard, curry leaves, dry red chilli | Safe if using bilingual-friendly title such as `Thengai Sadam (Coconut Rice)`. |
| Puliyogare | Karnataka Puliyogare | Karnataka / Tamil Nadu | Rice, tamarind, peanuts, sesame oil, puliyogare powder, curry leaves | Safe for `Karnataka Puliyogare`; do not call it `Melukote Puliyogare` without a recipe fix. |
| Ghee Rice | Karnataka Ghee Rice | Karnataka | Rice, ghee, onion, coconut milk, whole spices, cashew | Region tag supports it, but note overlap with Kerala/Malabar ghee rice styles. |
| Egg Bhurji | Mumbai Egg Bhurji | Mumbai / Maharashtra | Egg, onion, tomato, green chilli, turmeric/chilli, coriander; best with toast/chapati/pav | Safe; “Mumbai” fits street/breakfast context. |
| Sambar Rice | Sambar Sadam | Tamil Nadu / South India | Rice, toor dal, vegetables, sambar powder, tamarind, mustard/curry leaves | Safe; more homely Tamil naming. |
| Rasam Rice | Rasam Sadam | Tamil Nadu / South India | Rice, rasam, tomato, rasam powder, mustard, curry leaves, ghee | Safe; low-risk regional/homely naming. |
| Thoran | Kerala Thoran | Kerala/Malabar/Travancore/Kochi | Cabbage/beans, coconut, mustard, green chilli, curry leaves, coconut oil | Safe; generic vegetable slot but technique is clearly Kerala. |
| Kootu | Tamil Kootu | Tamil Nadu/Chettinad/Kongu Nadu | Vegetables, moong dal, coconut, cumin, curry leaves | Safe as a category dish; do not over-specify vegetable. |
| Poriyal | Tamil Poriyal | Tamil Nadu/Chettinad/Kongu Nadu | Vegetables, coconut, mustard, curry leaves, urad dal | Safe as a category dish; do not over-specify vegetable. |
| Mutton Pulao | Mughlai Mutton Pulao | Mughlai / North India | Basmati, mutton, curd, whole spices, mint, ghee | Safe but lower priority than daily/home-recognition dishes. |

High-confidence rename candidates count: **16**.

## 4. Rename Candidates That Need Recipe Fixes

These are `RENAME_NEEDS_RECIPE_FIX`: the current data suggests a possible regional identity, but the quick guide, ingredients, method, or specificity are not yet strong enough.

| Current name | Possible direction | Why not safe yet | Required fix before rename |
|---|---|---|---|
| Madras Curry | Madras Chicken Curry / Tamil Madras Curry | Quick guide is generic, image is default-like, ingredients are sparse | Add full onion/curry leaf/tamarind or tomato method, spice profile, and proper quick guide. |
| Pitha | Assamese / Bengali / Odia Pitha variant | Current title spans Bengal/Odisha/Assam and method says “as the pitha style needs” | Split into a specific pitha variant or keep broad. |
| Ragi Porridge | Ragi Ambli / Ragi Ganji | Current version is milk/jaggery porridge, not clearly a regional savory ambli/ganji | Decide sweet malt vs savory ambli; adjust title, ingredients, and pairings. |
| Ragi Malt | Karnataka Ragi Malt | Region is Karnataka, but pairings include unrelated `banana, dhokla`; quick guide lacks regional context | Fix pairings and copy before making region more visible. |
| Ragi Dosa | Karnataka Ragi Dosa / South Indian Ragi Dosa | Uses dosa batter shortcut; region is broad South India | Keep generic unless adding a stronger Karnataka-style version. |
| Fish Curry | Andhra Fish Pulusu / Kerala Fish Curry / Goan Fish Curry | Current profile is broad coastal: fish, tomato, tamarind, chilli, turmeric | Do not rename; add or route to existing specific fish curries. |
| Fish Curry Rice | Coastal Fish Curry Rice / Konkani Fish Curry Rice | Too broad and lunch-plate oriented | Needs coconut/kokum/tirphal or regional masala if becoming Konkani/Goan/Malvani. |
| Fish Fry | Kerala/Tamil/Goan/Mangalorean Fish Fry | Broad coastal spice-rice-flour fry | Needs region-specific marinade and naming. |
| Chicken Curry | Andhra / Kerala / North Indian Chicken Curry | Pan-Indian masala profile | Keep generic or add separate regional variants. |
| Egg Curry | Kerala Egg Curry / Bengali Dimer Jhol / North Indian Egg Curry | Current onion-tomato gravy is generic | Needs regional spice and method changes. |
| Chicken Pulao | Hyderabadi / Awadhi / homestyle Chicken Pulao | Current guide is valid but pan-Indian | Do not regionalize unless adding whole-spice/dum/stock specifics. |
| Chicken Potato Curry | Bengali-style Chicken Aloo Curry / homestyle curry | Has chicken + potato, but no Bengali spice/method signals | Add region-specific seasoning if renaming. |
| Chicken Tomato Rice | South Indian Chicken Tomato Rice | Current title and method likely simple pan-Indian rice | Needs regional tempering/spice clarity. |
| Onion Rice | South Indian Onion Rice | Tempering exists but too generic | Could stay generic; needs stronger podi/curry-leaf/peanut/coconut signature for regional naming. |
| Peanut Rice | Verkadalai Sadam / Andhra Peanut Rice | Tamil/Andhra tag, sesame oil, peanuts, tempering, but no podi/roasted spice detail | Add peanut podi/chilli/dal/curry-leaf specificity. |
| Mango Rice | Mamidikaya Pulihora / Mavinakayi Chitranna | Raw mango, mustard, peanuts, curry leaves; image placeholder | Needs region decision: Andhra/Telangana pulihora vs Karnataka chitranna. |
| Bonda | Aloo Bonda / Mysore Bonda | Current primary is potato + besan; `Bonda` could mean different snacks | Rename only after deciding variant. |
| Pakora | Aloo Pakora / Vegetable Pakora | Generic besan snack | Keep generic or create specific variants. |
| Chaat | Aloo Chaat / North Indian Chaat | Broad `Chaat` title | Needs a specific form and dressing profile. |
| Pakhala Bhata | Odia Pakhala Bhata | Already regional name, but collection grouping is North & West India | Recipe may be fine; category/region representation needs correction later. |
| Chingudi Chhecha | Odia Chingudi Chhecha | Already specific, but appears under sides/add-ons and fish family | Validate image/pairing and maybe strengthen Odisha collection later. |
| Pork Curry | Keep protected / add separate regional variants | Sensitive and generic; should not be renamed | Add new regional pork variants later rather than changing this. |

Recipe-fix-needed candidates count: **22**.

## 5. Recipes That Should Stay Generic

These are `KEEP_GENERIC` examples. They are useful as everyday/homestyle Tomo dishes, and forcing a regional identity would feel fake.

| Recipe/group | Reason to keep generic |
|---|---|
| Chicken Curry | Classic pan-Indian onion-tomato-spice profile; no single regional anchor. |
| Egg Curry | Generic boiled egg onion-tomato gravy; many regional variants exist. |
| Fish Curry / Fish Curry Rice / Fish Fry | Useful broad coastal dishes; database already has specific regional fish curries. |
| Dal Rice / Dal Roti | Everyday formats, not specific regional dishes. |
| Khichdi / Moong Dal Vegetable Khichdi | Pan-Indian comfort; regional variants should be separate. |
| Paneer Sandwich / Veg Sandwich / Cheese Veg Sandwich | Lunchbox/cafe foods, not regional identity dishes. |
| Chicken Capsicum Stir Fry Bowl / Chicken Pepper Rice Bowl | Functional high-protein bowls; not authentic regional names. |
| Paneer Capsicum Rice Bowl / Paneer Corn Rice Bowl | Kitchen/Cook recommendation utility dishes; keep straightforward. |
| Egg Toast / Cheese Omelette / Mushroom Omelette | Global/cafe breakfast patterns; not Indian regional dishes. |
| Rice Cakes / Rice Porridge baby-food recipes | Beta 3 family/tiny-tummy utility; avoid regional claims. |
| Soup family: Chicken Soup, Pumpkin Soup, Mixed Veg Soup, Spinach Soup | Functional comfort/soup content, not regional dishes. |
| Global Bites recipes | Keep cuisine-specific where already global; do not Indianize. |

Approximate keep-generic/non-actionable majority: **~590 recipes**, including already-specific regional recipes that need no rename.

## 6. New Regional Variants To Add Later

These are `ADD_AS_NEW_REGIONAL_VARIANT`, not rename suggestions. They would deepen Tomo’s sense of home without distorting existing recipes.

| Ingredient/theme | High-value new variant | Why it matters |
|---|---|---|
| Chicken | Kundapura Chicken | Coastal Karnataka chicken identity; pairs with neer dosa/akki rotti. |
| Chicken | Coorg Chicken Curry / Koli Curry expansion | Kodagu identity exists; can be strengthened beyond current entry. |
| Chicken | Hyderabadi Chicken Korma | Complements biryani/haleem/majestic. |
| Chicken | Bengali Chicken Jhol | Homely, potato-forward Bengali chicken gap. |
| Fish | Andhra Fish Pulusu variants by fish type | Current Chepala Pulusu exists; can add more fish specificity later. |
| Fish | Bengali Shorshe Mach with non-ilish option | `Shorshe Ilish` exists, but a generic shorshe fish version improves accessibility. |
| Fish | Mangalorean Bangude Curry | Strong coastal Karnataka seafood identity. |
| Fish | Goan Recheado Fish Fry | Distinct from generic fish fry. |
| Egg | Dimer Dalna | Strong Bengali egg-potato curry gap. |
| Egg | Nadan Mutta Curry | Kerala egg curry distinct from generic egg curry. |
| Egg | Andhra Egg Pulusu | Tamarind/chilli egg curry identity. |
| Paneer | Paneer Lababdar | North Indian restaurant-home bridge. |
| Paneer | Chhanar Kofta / Chhanar Kalia | Bengal paneer/chhana identity beyond Chhanar Dalna. |
| Potato | Dum Aloo Kashmiri / Banarasi Dum Aloo | North regional potato identity. |
| Potato | Batata Rassa | Maharashtra potato curry gap. |
| Rice | Melukote Puliyogare | Add as separate stricter variant; do not rename current Puliyogare yet. |
| Rice | Vangi Bath variants by Karnataka/Maharashtra | Current Vangi Bath exists; add Maharashtrian Masale Bhaat/Vangi nuance later. |
| Dal | Dal Tadka / Punjabi Dal Fry | Everyday high-recognition dal gap if not already covered clearly. |
| Dal | Andhra Tomato Pappu | Complements Gongura/Mamidikaya/Dosakaya pappu set. |
| Brinjal | Bagara Baingan | Hyderabad/Telangana gap. |
| Brinjal | Ennai Kathirikai Kuzhambu | Tamil brinjal curry gap. |
| Okra | Bhindi Do Pyaza | North Indian okra gap; only Bendakaya Pulusu currently appears. |
| Okra | Vendakkai Puli Kuzhambu | Tamil okra identity. |
| Pumpkin | Mathanga Erissery | Kerala pumpkin is present through Erissery; can add explicit title variant. |
| Bottle Gourd | Lauki Chana Dal | North Indian bottle-gourd gap. |
| Bottle Gourd | Sorakaya Pappu | Andhra/Telangana bottle-gourd gap. |
| Ragi | Ragi Ambli | Distinct from sweet ragi malt/porridge. |
| Horse Gram | Huruli Saaru | Karnataka horse gram gap beside Ulavacharu/Kollu Rasam. |
| Gongura | Gongura Pachadi | Important everyday Andhra/Telangana condiment gap. |
| Raw Mango | Mavinakayi Chitranna | Distinct from Mango Rice; high regional recognition. |
| Jackfruit | Kadgi Chakko / Kathal Curry | Jackfruit is underrepresented. |
| Bread | Iyengar Bakery Khara Bun / Masala Toast variants | Good lunchbox/tea-time identity. |

New regional variant suggestions count: **30+**.

## 7. Ingredient Family Coverage

| Ingredient family | Existing strong regional dishes | Weak/generic dishes | Missing high-value regional dishes | Kitchen coverage gap |
|---|---|---|---|---|
| Chicken | Andhra Kodi Vepudu, Chettinad Chicken Curry, Guntur Chicken Fry, Kori Rotti, Nadan Kozhi Curry, Malabar Chicken Curry, Kolkata Chicken Chaap, Chicken Kosha, Axone Chicken, Black Sesame Chicken | Chicken Curry, Chicken Pulao, Chicken Potato Curry, Chicken Tomato Rice, Chicken bowls | Kundapura Chicken, Bengali Chicken Jhol, Hyderabadi Korma, Coorg pepper-style chicken | Strong but several Cook dashboard hits are generic bowls/curries. |
| Fish | Kerala Fish Curry, Macher Jhol, Masor Tenga, Chepala Pulusu, Meen Moilee, Shorshe Ilish, Bhetki Paturi, Malvani Fish Curry, Bombil Fry | Fish Curry, Fish Curry Rice, Fish Fry | Goan Recheado Fish Fry, Mangalorean Bangude Curry, Bengali Shorshe Mach accessible variant | Good regional depth; generic fish recipes should stay utility items. |
| Egg | Andhra Egg Fry, Kerala Egg Roast, Idiyappam Egg Curry, Kari Dosa, Gyapa Khazi, global egg breakfasts | Egg Curry, Egg Curry Rice, Egg Toast, Omelettes | Dimer Dalna, Nadan Mutta Curry, Andhra Egg Pulusu, Egg Appam | Needs more Indian regional egg curries. |
| Paneer | Kadai Paneer, Matar Paneer, Palak Paneer, Paneer Tikka, Chhanar Dalna, Potol Dorma | Paneer Sandwich, Paneer rice bowls, Paneer Soup/Salad | Paneer Lababdar, Chhanar Kofta/Kalia, Dhaba Paneer Masala | Good North Indian coverage; Bengal chhana can deepen. |
| Potato | Aloo Pitika, Aloo Posto, Luchi Aloor Dom, Batata Poha, Batata Vada, Sabudana Vada, Aloo Potol Posto | Aloo Rice, Chicken Potato Curry, generic chaat/pakora | Dum Aloo variants, Batata Rassa, Jeera Aloo as `Aloo Jeera` already present | Strong coverage; rename only when specific. |
| Rice | Akki Roti, Vangi Bath, Bisibelebath, Puliyogare, Lemon Rice, Coconut Rice, Pakhala Bhata, Basanti Pulao, Masale Bhaat, Jadoh, Galho | Aloo Rice, Onion Rice, Chicken Tomato Rice, bowls | Melukote Puliyogare, Mavinakayi Chitranna, Bagara Rice | Very strong; top rename opportunity is rice dishes. |
| Dal | Bassaru, Bele Saaru, Dalma, Dosakaya Pappu, Gongura Pappu, Mamidikaya Pappu, Gujarati Dal, Aamti, Cholar Dal | Dal Rice, Dal Roti, Palak Dal, Khichdi | Tomato Pappu, Dal Tadka/Fry, Huruli Saaru | Strong but everyday dal names could be more personal later. |
| Brinjal | Badanekayi Ennegayi, Vangi Bath, Gutti Vankaya, Begun Bhaja, Bharli Vangi, Baingan Bharta | None major | Bagara Baingan, Ennai Kathirikai Kuzhambu | Good but can add one Telangana and one Tamil variant. |
| Okra | Bendakaya Pulusu | None major | Bhindi Do Pyaza, Vendakkai Puli Kuzhambu, Bharwa Bhindi | Thin: only one strong okra dish. |
| Pumpkin | Erissery | Pumpkin Soup, Pumpkin Mash | Mathanga Erissery explicit variant, Kaddu ki Sabzi, Kumro Chokka | Thin outside Kerala. |
| Bottle Gourd | None clearly strong | Bottle Gourd Soup, baby mash | Lauki Chana Dal, Sorakaya Pappu, Sorakkai Kootu | Clear gap. |
| Ragi | Ragi Mudde, Ragi Rotti, Ragi Sangati, Ragi Dosa, Ragi Malt | Ragi Porridge | Ragi Ambli, Ragi Kanji, stronger Karnataka ragi breakfast set | Good base; authenticity cleanup needed for porridge/malt. |
| Horse Gram | Ulavacharu, Kollu Rasam | None | Huruli Saaru, Horse Gram Chutney | Strong but only two entries. |
| Gongura | Gongura Mutton, Gongura Pappu | None | Gongura Pachadi, Gongura Chicken | Good high-signal but narrow. |
| Raw Mango | Ugadi Pachadi, Mamidikaya Pappu | Mango Rice | Mavinakayi Chitranna, Andhra Mamidikaya Pulihora | Needs region-specific rice decision. |
| Jackfruit | Very limited; detected coverage is weak | Jackfruit is mostly absent from primary recipe set | Kadgi Chakko, Kathal Curry, Enchorer Dalna | Significant gap. |
| Bread | Iyengar Bakery Toast, Bread Pakora, Bread Omelette, Bread Upma, Sel Roti, global toasts/wraps | Milk Toast, sandwiches | Mangalore Buns already exists in broader list; add khara bun/Indian bakery toast variants | Good lunchbox/cafe utility; regional Indian bakery identity can grow. |

## 8. State / Region Representation

Collection-level regional counts:

| Region/collection | Active recipe count |
|---|---:|
| Karnataka | 40 |
| Andhra & Telangana | 38 |
| Tamil Nadu | 35 |
| Northeast | 26 |
| Bengal | 25 |
| Kerala | 24 |
| Maharashtra | 22 |
| North & West India | 53 |

Cuisine-level signals:

| Cuisine signal | Count |
|---|---:|
| Indian | 146 |
| North Indian | 53 |
| Karnataka | 47 |
| Northeast Indian | 39 |
| Maharashtrian | 39 |
| Kerala | 37 |
| South Indian | 37 |
| Bengal | 30 |
| Tamil Nadu | 30 |
| Andhra & Telangana | 25 |
| Andhra | 15 |
| Hyderabadi | 6 |
| Mangalorean | 6 |
| Goan | 5 |
| Gujarati | 8 |
| Odia | 3 |
| Bihari | 1 |
| Assamese | 1 |
| Rajasthani | 2 |

Strong regions:

- Karnataka: strong breakfast, rice, saaru, snacks, coastal, Kodagu coverage.
- Andhra & Telangana: strong pappu, pulusu, chilli chicken, gongura, fish, ragi, festival snacks.
- Tamil Nadu: strong rice/dal, kuzhambu, kootu, poriyal, Chettinad/Kongu signals.
- Kerala: strong stews, appam/idiyappam, fish, beef, thoran, payasam, sadya-style dishes.
- Bengal: strong fish, mutton, dalna/posto, sweets, street snacks.
- Northeast: strong pork, rice, bamboo shoot, greens, smoked/fermented profiles.
- Maharashtra: growing coverage with poha, vada, fish, sweets, amti, thalipeeth.

Weak or under-separated regions:

- Goa: present but shallow; fish/prawn/pork depth can grow.
- Odisha: present through Dalma, Pakhala, Chingudi Chhecha, but hidden under broad grouping.
- Gujarat: present but mostly North & West umbrella.
- Punjab/Delhi/North India: many recipes, but not always emotionally regional.
- Rajasthan: Laal Maas and some sweets/snacks exist, but coverage is thin.
- Bihar/Jharkhand: Litti Chokha exists; otherwise thin.
- Kashmir/Himachal/Uttarakhand/Chhattisgarh/Haryana/Madhya Pradesh: largely missing or not visible.

Over-generic regions:

- `Indian`: 146 recipes. Many should stay generic, but this bucket also hides potential regional identity.
- `South Indian`: 37 recipes. Some are broad by design; a few can become Tamil/Karnataka/Andhra names.
- `North Indian`: 53 recipes. Useful for broad user comprehension, but Punjab/Delhi/UP/Rajasthan/Gujarat identities can be more precise later.
- `Coastal Indian`: 3 recipes. Useful utility label, but not enough identity for highly recognizable dishes.

## 9. Beta 3 Priority Fix List

Top 30 high-value additions/corrections for Beta 3 lock review:

1. Rename `Chicken Biryani` to `Hyderabadi Chicken Biryani` or `Hyderabadi Dum Chicken Biryani`.
2. Rename `Chicken Stew` to `Kerala Chicken Stew`.
3. Rename `Chicken Sukka` to `Mangalorean Chicken Sukka`.
4. Rename `Chicken Roll` to `Kolkata Chicken Roll`.
5. Rename `Lemon Rice` to `Chitranna (Lemon Rice)` or `Karnataka Chitranna`.
6. Rename `Coconut Rice` to `Thengai Sadam (Coconut Rice)`.
7. Rename `Sambar Rice` to `Sambar Sadam`.
8. Rename `Rasam Rice` to `Rasam Sadam`.
9. Rename `Puliyogare` to `Karnataka Puliyogare`; do not call it Melukote yet.
10. Rename `Egg Bhurji` to `Mumbai Egg Bhurji`.
11. Rename `Thoran` to `Kerala Thoran`.
12. Rename `Kootu` to `Tamil Kootu`.
13. Rename `Poriyal` to `Tamil Poriyal`.
14. Fix `Madras Curry` before presenting it as a strong regional dish.
15. Split or rewrite `Pitha`; current recipe is too broad.
16. Decide whether `Mango Rice` is `Mamidikaya Pulihora` or `Mavinakayi Chitranna`.
17. Fix `Ragi Malt` pairings and regional copy.
18. Decide whether `Ragi Porridge` is sweet ragi malt/porridge or savory ragi ambli.
19. Keep `Fish Curry`, `Fish Curry Rice`, and `Fish Fry` generic; use existing regional fish dishes instead.
20. Keep `Chicken Curry` generic; add regional variants later.
21. Keep `Egg Curry` generic; add Dimer Dalna/Nadan Mutta Curry later.
22. Keep `Pork Curry` protected and generic; do not regionalize.
23. Add/plan `Gongura Pachadi`.
24. Add/plan `Huruli Saaru`.
25. Add/plan `Bhindi Do Pyaza` or `Vendakkai Puli Kuzhambu`.
26. Add/plan `Lauki Chana Dal` or `Sorakaya Pappu`.
27. Add/plan a jackfruit regional curry.
28. Improve Odisha visibility; `Pakhala Bhata`, `Dalma`, and `Chingudi Chhecha` deserve clearer grouping later.
29. Improve Goa depth with a fish fry/curry and pork variant only if recipe-authentic.
30. Reduce future use of placeholder images for regional hero dishes.

## 10. Do-Not-Touch / Sensitive Notes

`DO_NOT_TOUCH_SENSITIVE` candidates:

| Recipe | Current status | Recommendation |
|---|---|---|
| Pork Curry | Generic Northeast Indian pork curry | Do not rename or regionalize in Beta 3. Add a separate authentic variant later if needed. |
| Bamboo Shoot Pork | Already regional Northeast | Keep. Do not over-specify beyond data. |
| Smoked Pork Rice | Already Northeast/Nagaland signal | Keep. |
| Smoked Pork Curry | Already Northeast/Nagaland signal | Keep. |
| Dohneiiong | Already Meghalaya/Northeast identity | Keep. |
| Wahan Mosdeng | Already Tripura/Northeast identity | Keep. |
| Phagshapa | Already Sikkim/Northeast identity | Keep. |
| Coorg Pandi Curry | Already Kodagu/Karnataka, with kachampuli | Keep. Recipe quick guide could become more specific later, but title is valid. |
| Kerala Beef Fry | Already Kerala | Keep. Image placeholder is a separate asset issue. |
| Kerala Parotta Beef Fry | Already Kerala | Keep. Image placeholder is a separate asset issue. |

Sensitive rule for Beta 3:

- Do not add place labels to pork or beef dishes unless they are already clearly regional and recipe-authentic.
- Do not rename a generic meat curry just because a region tag exists.
- Prefer adding a new regional variant over rewriting an existing generic utility recipe.

## Classification Summary

| Classification | Count / estimate | Meaning |
|---|---:|---|
| `RENAME_SAFE` | 16 | Current data supports a regional/homely rename. |
| `RENAME_NEEDS_RECIPE_FIX` | 22 | Regional direction exists, but recipe content needs correction first. |
| `ADD_AS_NEW_REGIONAL_VARIANT` | 30+ | Better as new future recipes, not renames. |
| `DO_NOT_TOUCH_SENSITIVE` | 10 | Mostly pork/beef; keep conservative. |
| `KEEP_GENERIC` / already good | ~590 | Generic utility recipes or already-specific recipes needing no title change. |

## Terminal Summary Source

Read-only checks performed:

- Parsed `database/generated/recipes.json`.
- Filtered active records where `isActive !== false` and no `replacedBy`.
- Checked duplicate IDs, duplicate source IDs, duplicate titles.
- Checked Quick Guide and pairing field coverage.
- Checked image path existence under `frontend/assets`.
- Syntax-checked validation scripts with `node --check`.

No recommendation engine, pantry engine, scoring, ranking, analytics, desktop, collections data, or recipe data was modified.
