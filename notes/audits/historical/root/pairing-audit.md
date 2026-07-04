# Pairing Audit

Audited current pairing metadata in `frontend/local-recipes.js`: 263 dishes, 925 pairing entries. No exact duplicate pairing names were found within a single dish.

## Top 50 FAILs

| Dish | Pairing | Bucket | Reason | Confidence | Suggested replacement |
|---|---|---|---|---|---|
| Ragi Malt | Water | drinks | Drink paired with another plain drink; not useful as a pairing. | High | Remove; use banana, dates, or roasted chana as food accompaniments. |
| Sattu Drink | Water | drinks | Drink paired with another plain drink; beverage mismatch. | High | Remove; keep roasted chana/cucumber as snack-style accompaniments. |
| Appam | Coconut milk | drinks | Coconut milk is an accompaniment here, not a beverage pairing. | High | Move to sides/toppings, or replace drink with black tea/filter coffee. |
| Biryani | Mirchi ka salan | pickles | Strong pairing, but wrong bucket; salan is a side/gravy, not pickle. | High | Move to sides; keep pickle bucket for onion/lemon/mango pickle. |
| Kori Rotti | Neer dosa | rice | Neer dosa is neither rice nor a natural pairing for kori rotti. | High | Use chicken curry/kori gassi as side; remove rice entry. |
| Prawn Sukka | Neer dosa | rice | Neer dosa is a bread/crepe accompaniment, not rice. | High | Move Neer dosa to sides; use steamed rice or ghee rice in rice. |
| Batata Poha | Steamed rice | rice | Poha is already a flattened-rice snack; steamed rice pairing is random. | High | Use sev, lemon, roasted peanuts, or masala chai. |
| Batata Poha | Chapati | roti | Chapati with poha is an unnatural starch-on-starch pairing. | High | Remove roti; use chutney or tea if needed. |
| Upma | Steamed rice | rice | Upma is already the main starch; rice pairing is random. | High | Use coconut chutney, sambar, or filter coffee. |
| Upma | Chapati | roti | Chapati with upma is an unnatural duplicate-starch pairing. | High | Remove roti; use chutney/sambar. |
| Mirapakaya Bajji | Steamed rice | rice | Snack/fritter paired with steamed rice is unnatural. | High | Use coconut chutney, peanut chutney, or masala chai. |
| Mirchi Bajji | Steamed rice | rice | Snack/fritter paired with steamed rice is unnatural. | High | Use coconut chutney, peanut chutney, or masala chai. |
| Schezwan Fried Rice | Raita | sides | Indo-Chinese rice with Indian yogurt side is a cuisine mismatch. | High | Use chilli sauce, manchurian, or cucumber slices. |
| Schezwan Fried Rice | Papad | sides | Papad is a random Indian thali side for Indo-Chinese rice. | High | Use spring onion, chilli sauce, or manchurian. |
| Schezwan Fried Rice | Mango pickle | pickles | Indian pickle clashes with Indo-Chinese profile. | High | Use chilli vinegar or schezwan sauce. |
| Schezwan Fried Rice | Buttermilk | drinks | Buttermilk is a cuisine mismatch for Schezwan fried rice. | High | Use lime soda or no drink. |
| Veg Fried Rice | Raita | sides | Yogurt side is weak/random for Indo-Chinese fried rice. | High | Use chilli paneer/manchurian or cucumber slices. |
| Veg Fried Rice | Papad | sides | Papad is a thali default leaking into Indo-Chinese dish. | High | Use spring onion, chilli sauce, or manchurian. |
| Veg Fried Rice | Mango pickle | pickles | Indian pickle conflicts with Indo-Chinese dish. | High | Use chilli vinegar/schezwan sauce. |
| Veg Fried Rice | Buttermilk | drinks | Buttermilk is a beverage mismatch for Indo-Chinese fried rice. | High | Use lime soda or no drink. |
| Paneer Fried Rice | Raita | sides | Raita is a North Indian rice side, not a fried-rice pairing. | High | Use chilli paneer dry or cucumber slices. |
| Paneer Fried Rice | Papad | sides | Papad is a random thali side for fried rice. | High | Use spring onion or chilli sauce. |
| Paneer Fried Rice | Mango pickle | pickles | Indian pickle conflicts with Indo-Chinese flavor. | High | Use chilli vinegar/schezwan sauce. |
| Paneer Fried Rice | Buttermilk | drinks | Buttermilk is a cuisine mismatch for fried rice. | High | Use lime soda or no drink. |
| Sticky Rice | Raita | sides | North Indian yogurt side conflicts with sticky-rice/Northeast context. | High | Use smoked pork, eromba, or chutney. |
| Sticky Rice | Papad | sides | Papad is a random thali side for sticky rice. | High | Use eromba, axone pork, or boiled greens. |
| Sticky Rice | Mango pickle | pickles | Generic Indian pickle is weak/culturally mismatched here. | Medium-High | Use local chutney/pickle if available, or remove. |
| Sticky Rice | Buttermilk | drinks | Buttermilk is a cuisine mismatch for sticky rice. | High | Use black tea or no drink. |
| Smoked Pork Rice | Raita | sides | Raita conflicts with smoked pork/Northeast profile. | High | Use boiled greens, chilli chutney, or axone-style side. |
| Smoked Pork Rice | Papad | sides | Papad is random for smoked pork rice. | High | Use cucumber/onion, greens, or chilli chutney. |
| Smoked Pork Rice | Mango pickle | pickles | Generic mango pickle is a thali default, not a strong pairing here. | Medium-High | Use local chilli chutney/pickle if available. |
| Smoked Pork Rice | Buttermilk | drinks | Buttermilk is a beverage mismatch for smoked pork rice. | High | Use black tea or no drink. |
| Momos | Coriander chutney | chutneys | Generic Indian chutney is not the expected momo condiment. | High | Use spicy momo chutney/tomato chilli chutney. |
| Momos | Tamarind chutney | chutneys | Tamarind chaat chutney conflicts with momo profile. | High | Use momo chutney or soup. |
| Momos | Masala chai | drinks | Chai is plausible as tea-time context but weak/random for momos. | Medium | Use soup/thukpa broth or black tea. |
| Chilli Paneer | Coriander chutney | chutneys | Indian chutney does not fit Indo-Chinese chilli paneer. | High | Use chilli sauce/schezwan sauce. |
| Chilli Paneer | Tamarind chutney | chutneys | Tamarind chaat chutney conflicts with Indo-Chinese flavor. | High | Use chilli sauce/schezwan sauce. |
| Chilli Paneer | Masala chai | drinks | Chai is a beverage mismatch for Indo-Chinese starter. | Medium-High | Use lime soda or no drink. |
| Chilli Mushroom | Coriander chutney | chutneys | Indian chutney does not fit Indo-Chinese chilli mushroom. | High | Use chilli sauce/schezwan sauce. |
| Chilli Mushroom | Tamarind chutney | chutneys | Tamarind chaat chutney conflicts with Indo-Chinese profile. | High | Use chilli sauce/schezwan sauce. |
| Chilli Mushroom | Masala chai | drinks | Chai is a beverage mismatch for Indo-Chinese starter. | Medium-High | Use lime soda or no drink. |
| Kolhapuri Misal Pav | Coriander chutney | chutneys | Misal pav typically uses farsan, onion, lemon, pav, not chutney. | Medium-High | Use pav, farsan, onion, lemon. |
| Kolhapuri Misal Pav | Tamarind chutney | chutneys | Tamarind chutney reads like chaat, not misal pav. | Medium-High | Use pav, farsan, onion, lemon. |
| Kosambari | Sambar rice | sides | Kosambari is usually a side salad, while sambar rice is a full main. | Medium-High | Pair with thali items or mark kosambari as support side. |
| Avial | Sambar rice | sides | Avial pairs with plain rice/adisal, not usually sambar rice as side. | Medium-High | Use steamed rice or adai. |
| Beans Thoran | Rasam rice | sides | Rasam rice is a main/rice dish, not a side for thoran. | Medium-High | Use rasam as side and steamed/matta rice as rice. |
| Pepper Rasam | Toast | sides | Toast is random with rasam. | High | Use steamed rice, papad, potato fry. |
| Thukpa | Papad | sides | Papad conflicts with Tibetan/Northeast noodle soup context. | High | Use momo, chilli oil, or stir-fried greens. |
| Thukpa | Toast | sides | Toast is a weak/random side for thukpa. | Medium-High | Use momo or chilli condiment. |
| Ragi Malt | Dhokla | sides | Dhokla with ragi malt is cross-context and random. | Medium-High | Use banana, dates, nuts, or roasted chana. |

## Top 50 LOW_CONFIDENCE

| Dish | Pairing | Bucket | Reason | Confidence | Suggested replacement |
|---|---|---|---|---|---|
| Andhra Chicken Curry | Chapati | roti | Possible, but steamed rice/ragi sangati/roti are stronger depending region; chapati feels generic. | Medium | Prefer steamed rice, dosa, or ragi sangati. |
| Andhra Egg Fry | Chapati | roti | Generic roti pairing; rice/dal or curd rice context is stronger. | Medium | Prefer steamed rice, rasam rice, or curd rice. |
| Andhra Kodi Vepudu | Chapati | roti | Plausible but generic; rice and onion/lemon sides are stronger. | Medium | Prefer steamed rice, curd rice, or onion/lemon. |
| Boiled Corn | Curd | sides | Curd with boiled corn is edible but not a common strong pairing. | Medium | Use lemon, chaat masala, butter, or tea. |
| Boiled Corn | Buttermilk | drinks | Plausible cooling drink, but weak with simple boiled corn. | Medium | Use masala chai/lime soda or no drink. |
| Chaat | Buttermilk | drinks | Cooling buttermilk is plausible, but jal jeera/nimbu pani are more natural. | Medium | Use jal jeera, nimbu pani, or masala chai. |
| Chicken Roll | Masala chai | drinks | Street-food tea pairing is possible, but not especially strong. | Medium | Use lime soda or mint chutney as stronger pairing. |
| Chirer Pulao | Curd | sides | Curd is plausible but generic; tea/snack accompaniments are stronger. | Medium | Use tea, banana, or peanuts. |
| Coconut Rice | Buttermilk | drinks | Cooling drink is plausible, but curd/pickle/papad are stronger. | Medium | Use papad, pickle, potato fry, or curd. |
| Corn Chaat | Curd | sides | Curd can work in chaat but this reads generic for corn chaat. | Medium | Use sev, lemon, coriander, or jal jeera. |
| Corn Chaat | Buttermilk | drinks | Plausible cooling drink but weak; jal jeera/nimbu pani fit better. | Medium | Use jal jeera or nimbu pani. |
| Corn Soup | Papad | sides | Crisp side is plausible, but papad is weak versus toast/croutons. | Medium | Use toast, croutons, or garlic bread. |
| Dal Roti | Masala chai | drinks | Chai with a full dal-roti meal is weak. | Medium | Use chaas/buttermilk or remove drink. |
| Egg Toast | Masala chai | drinks | Breakfast tea works, but pairing is generic. | Medium | Use tea/coffee, ketchup, or green chutney. |
| Ghee Rice | Lemon pickle | pickles | Plausible, but ghee rice usually wants curry/stew more than pickle. | Medium | Use vegetable stew, egg curry, chicken curry. |
| Gujiya | Fresh fruit | sides | Not unnatural, but weak compared with festive sweets/snacks/tea. | Medium | Use masala chai, thandai, or nuts. |
| Kada Prasad | Fresh fruit | sides | Fresh fruit is plausible prasad context, but not a strong pairing. | Medium | Use tea or keep standalone. |
| Keema Fry | Masala chai | drinks | Street/snack tea pairing possible, but full keema pairing prefers pav/roti. | Medium | Use pav, onion, lemon, or chaas. |
| Kheema Pav | Masala chai | drinks | Possible Mumbai snack pairing, but not as strong as onion/lemon/pav. | Medium | Use cutting chai only if snack context; otherwise lime soda. |
| Kodubale | Coconut chutney | sides | Possible, but kodubale is commonly a dry snack with tea/coffee. | Medium | Use filter coffee or tea. |
| Ladoo | Fresh fruit | sides | Sweet plus fruit is plausible but weak. | Medium | Use masala chai, milk, or nuts. |
| Lemon Sevai | Filter coffee | drinks | Breakfast context works, but chutney/pickle/papad are stronger. | Medium | Use coconut chutney or papad. |
| Masala Corn | Aam panna | drinks | Both snack and drink are plausible, but aam panna is less obvious than jal jeera. | Medium | Use jal jeera or nimbu pani. |
| Mathri | Coriander chutney | chutneys | Possible, but mathri is stronger with pickle/tea. | Medium | Use mango pickle or masala chai. |
| Mathri | Tamarind chutney | chutneys | Chaat-style chutney is plausible but weak for plain mathri. | Medium | Use pickle or masala chai. |
| Mushroom Omelette | Masala chai | drinks | Breakfast tea works, but coffee/toast/salad are stronger. | Medium | Use coffee, toast, or salad. |
| Nippattu | Coconut chutney | sides | Possible, but nippattu is mainly a dry snack with tea/coffee. | Medium | Use tea, filter coffee, or buttermilk. |
| Paneer Mushroom Masala | Masala chaas | drinks | Cooling drink is plausible but not a signature pairing. | Medium | Use naan/chapati/jeera rice as primary pairings. |
| Peanut Poha | Coconut Chutney | chutneys | Regional plausibility exists, but sev/lemon/chai are stronger. | Medium | Use sev, lemon, coriander, masala chai. |
| Rice Cakes | Fresh fruit | sides | Possible light pairing, but very generic. | Medium | Use chutney, sambar, or tea depending recipe type. |
| Rice Cakes | Masala chai | drinks | Tea pairing is possible but not specific without cuisine context. | Medium | Use chutney/sambar if savory, milk/fruit if sweet. |
| Roasted Chana Chaat | Masala chai | drinks | Snack plus chai is plausible, but jal jeera/nimbu pani are stronger. | Medium | Use jal jeera or nimbu pani. |
| Sabudana Khichdi | Masala chai | drinks | Tea is plausible, but curd/peanut chutney are stronger. | Medium | Use curd or peanut chutney. |
| Sprouted Moong Salad | Buttermilk | drinks | Healthy pairing is plausible but weak. | Medium | Use nimbu pani or keep as standalone salad. |
| Sprouted Moong Salad | Nimbu pani | drinks | Plausible but not a strong cultural pairing. | Medium | Use lemon/coriander/sev toppings; drink optional. |
| Sundal | Curd | sides | Curd with sundal is edible but not a common strong combo. | Medium | Use coconut, lemon, or tea/coffee. |
| Sundal | Buttermilk | drinks | Plausible cooling drink, but tea/filter coffee is often stronger snack context. | Medium | Use filter coffee, tea, or no drink. |
| Sweet Holige | Fresh fruit | sides | Fruit is plausible but weak versus ghee/milk/tea. | Medium | Use ghee, milk, or masala chai. |
| Sweet Holige | Masala chai | drinks | Possible tea pairing, but milk/ghee are stronger. | Medium | Use milk or ghee. |
| Sweet Rice | Fresh fruit | sides | Sweet plus fruit is plausible but generic. | Medium | Use nuts, milk, or tea. |
| Sweet Rice | Masala chai | drinks | Possible but not a strong pairing. | Medium | Use milk or nuts. |
| Tofu Bhurji | Toast | sides | Possible breakfast fusion, but roti/chapati are stronger. | Medium | Use chapati, phulka, or pav. |
| Tomato Omelette | Masala chai | drinks | Breakfast tea works, but chutney/toast are stronger. | Medium | Use green chutney or toast. |
| Apple Puree | Light snacks | sides | Too vague to be meaningful as a pairing. | Medium | Use yogurt, porridge, or keep standalone. |
| Mashed Banana | Light snacks | sides | Too vague; not actionable as a pairing. | Medium | Use oats porridge, ragi porridge, or milk. |
| Oats Porridge | Light snacks | sides | Too vague; porridge usually needs toppings, not light snacks. | Medium | Use banana, nuts, honey, or fruit. |
| Ragi Porridge | Light snacks | sides | Too vague and not a recognizable pairing. | Medium | Use banana, jaggery, nuts, or milk. |
| Rice Porridge | Light snacks | sides | Too vague; porridge pairings should be explicit. | Medium | Use pickle/papad for savory or fruit for sweet. |
| Pitha | Light snacks | sides | Too vague for a culturally specific item. | Medium | Use tea, jaggery, coconut, or curd depending pitha type. |
| Ragi Dosa | Light snacks | sides | Misses obvious dosa pairings. | Medium | Use coconut chutney, sambar, tomato chutney. |
| Madras Curry | Light snacks | sides | Too vague and likely wrong for a curry. | Medium | Use steamed rice, chapati, or appam. |

## Missing Obvious Pairings

| Dish | Missing pairing | Reason |
|---|---|---|
| Khichdi | Kadhi | Classic comfort pairing; current curd/papad/pickle are good but kadhi is missing. |
| Upma | Coconut chutney / sambar | Current rice/chapati are bad; these are obvious replacements. |
| Batata Poha | Sev / lemon / masala chai | Current rice/chapati are bad; snack toppings/drink are stronger. |
| Ragi Dosa | Coconut chutney / sambar | Current “Light snacks” misses basic dosa pairings. |
| Momos | Momo chutney / soup | Current Indian chutneys are mismatched. |
| Schezwan Fried Rice | Chilli sauce / manchurian | Current raita/papad/pickle/buttermilk are mismatched. |
| Thukpa | Momos / chilli oil | Current papad/toast are mismatched. |
| Biryani | Move mirchi ka salan to sides | Pairing is right, bucket is wrong. |
| Appam | Move coconut milk to sides or use stew/kadala/egg roast | Coconut milk is not a drink pairing in this context. |
| Rasam/Pepper Rasam | Steamed rice | Toast is weak/random; rice is obvious. |

## Duplicate Pairings

No exact duplicates found within individual dish pairing groups after case/spacing normalization.

## Pairings That Should Be Drinks Only

- Buttermilk
- Neer Mor / Neer mor
- Jal jeera / Jal Jeera
- Kokum Sharbat
- Sattu Drink
- Ragi Malt
- Masala chai / Masala Chai
- Tea
- Filter coffee
- Black tea
- Sweet lassi
- Masala chaas
- Chaas
- Sol kadhi
- Lime soda
- Nimbu pani
- Aam panna
- Orange juice

## Pairings That Should Be Side Dishes Only

- Papad
- Raita / Onion raita / Mint raita / Cucumber raita
- Mirchi ka salan
- Sambar
- Rasam
- Vegetable stew
- Kadala curry
- Appam
- Neer dosa
- Puttu
- Pav
- Toast
- Onion salad / Kachumber / Cucumber salad
- Potato fry
- Beans poriyal / thoran
- Aloo pitika
- Begun bhaja

## Summary

The most urgent cleanup area is generated default leakage: thali-style defaults such as raita, papad, mango pickle, buttermilk, steamed rice, and chapati are appearing on snack, breakfast, Indo-Chinese, and Northeast dishes where they read random or culturally mismatched. Second priority is bucket correction: several good pairings are stored in the wrong type, especially Mirchi ka salan under pickles, Coconut milk under drinks, and Neer dosa under rice.
