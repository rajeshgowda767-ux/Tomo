# Tomo Image Coverage & Quality Audit

Generated: 2026-06-16T05:46:23.448Z

## Files Inspected

- `database/generated/recipes.json`
- `database/generated/collections.json`
- `frontend/mobile/mobile-shell.js`
- `frontend/assets/images/**`

## Validation Summary

- Total dishes checked: **230**
- Total images missing: **26**
- Dishes using generic/fallback/reused-family images: **166**
- Total duplicate image groups: **22**
- Collection covers checked: **7**

Notes: “Missing” means the recipe has no local `/assets/...` image path or the referenced file does not exist under `frontend/assets`. Generic/reused images are not technically missing, but are likely quality gaps for Beta 2.

## 1. Missing Dish Images

| Dish | Meal type | Mood tags | Collection membership | Recommendation surfaces | Reason |
|---|---|---|---|---|---|

### Breakfast

| Dish | Meal type | Mood tags | Collection membership | Recommendation surfaces | Reason |
|---|---|---|---|---|---|
| Bread Upma | Breakfast, Lunch, Snacks | Comfort Food, Quick, Quick & Easy | Lunch Box Heroes | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Collections; Journal if saved/cooked | File missing in frontend/assets |
| Corn Chaat | Breakfast, Lunch, Snacks | Comfort Food, Quick, Quick & Easy | Lunch Box Heroes, Fresh Plates | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Collections; Journal if saved/cooked | File missing in frontend/assets |
| Tomato Rice | Breakfast, Lunch, Dinner, Snacks | Comfort Food, Quick, Quick & Easy | Lunch Box Heroes | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Collections; Journal if saved/cooked | File missing in frontend/assets |
| Coconut Rice | Breakfast, Lunch, Dinner, Snacks | Soul Food, Quick, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Egg Toast | Breakfast, Lunch, Snacks | Comfort Food, Quick, High Protein, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Instant Rava Upma | Breakfast, Lunch, Snacks | Comfort Food, Quick, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Kaaram Dosa | Breakfast, Snacks | Soul Food, Quick, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Paneer Sandwich | Breakfast, Lunch, Snacks | Comfort Food, Quick, High Protein, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Dhokla | Breakfast, Snacks, Drinks | Comfort Food, Quick, Comfort, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Lemon Sevai | Breakfast, Lunch, Snacks | Soul Food, Quick, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Peanut Sundal | Breakfast, Lunch, Snacks | Comfort Food, Quick, High Protein, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Veg Sandwich | Breakfast, Lunch, Snacks | Comfort Food, Quick, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |

### Lunch

| Dish | Meal type | Mood tags | Collection membership | Recommendation surfaces | Reason |
|---|---|---|---|---|---|
| Kosambari | Lunch, Snacks | Quick, High Protein, Quick & Easy | Fresh Plates, Celebration Specials | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Collections; Journal if saved/cooked | File missing in frontend/assets |
| Andhra Egg Fry | Lunch | Quick, High Protein, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Guntur Chicken Fry | Lunch | High Protein, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Andhra Kodi Vepudu | Lunch | High Protein, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Lai Xaak Bhaji | Lunch, Dinner | Comfort Food, Quick, Comfort, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Sol Kadhi | Lunch, Dinner, Snacks, Drinks | Quick, High Protein, Spicy Food, Quick & Easy | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |

### Dinner

_None_

### Snacks

| Dish | Meal type | Mood tags | Collection membership | Recommendation surfaces | Reason |
|---|---|---|---|---|---|
| Masala Chai | Snacks, Drinks | Comfort Food, Quick, Rainy Day | Sips & Soothers | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Collections; Journal if saved/cooked | File missing in frontend/assets |
| Chicken 555 | Snacks | Quick, High Protein, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Chicken Majestic | Snacks | Quick, High Protein, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Dragon Chicken | Snacks | Quick, High Protein, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Chilli Mushroom | Snacks | Quick, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Maddur Vada | Snacks | Comfort Food, Quick, Rainy Day, Rainy, Comfort | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Mirapakaya Bajji | Snacks | Quick, Rainy Day, Spicy Food | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |
| Patra | Snacks, Drinks | Comfort Food, Quick, High Protein, Comfort | None | Tomo Pick candidate; Today's Picks candidate; Mood recommendations; Pantry recommendations; Journal if saved/cooked | File missing in frontend/assets |

### Soups

_None_

### Drinks

_None_

### Other

_None_

## 2. High-Priority Image Gaps

These are missing-image or generic-image dishes that matter most because they can appear in Tomo Pick, Today's Picks, mood recommendations, pantry recommendations, collections, or Journal once saved/cooked.

1. **Aloo Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/aloo-paratha.png
2. **Bread Upma** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/bread-upma.png
3. **Corn Chaat** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/corn-chaat.png
4. **Egg Bhurji** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
5. **Egg Fried Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
6. **Kosambari** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/salad.png
7. **Modak** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
8. **Paneer Bhurji** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
9. **Peanut Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
10. **Poha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/poha.png
11. **Tomato Rice** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/tomato-rice.png
12. **Veg Pulao** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
13. **Apple Puree** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
14. **Avalakki** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
15. **Avial** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
16. **Besan Chilla** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
17. **Corn Soup** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/soup-bowls.png
18. **Masala Chai** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/masala-chai.png
19. **Mashed Banana** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
20. **Mushroom Soup** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/soup-bowls.png
21. **Pepper Rasam** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
22. **Plum Cake** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
23. **Vegetable Soup** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/soup-bowls.png
24. **Andhra Chicken Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-curry-rice.png
25. **Andhra Egg Fry** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/andhra-egg-fry.png
26. **Assamese Duck Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
27. **Butter Chicken** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
28. **Cheese Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
29. **Chicken 555** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-555.png
30. **Chicken Capsicum Stir Fry Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
31. **Chicken Chettinad** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
32. **Chicken Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-curry-rice.png
33. **Chicken Egg Rice Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
34. **Chicken Fried Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
35. **Chicken Majestic** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-majestic.png
36. **Chicken Pepper Rice Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
37. **Chicken Potato Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-curry-rice.png
38. **Chicken Pulao** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
39. **Chicken Roll** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
40. **Chicken Stew** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
41. **Chicken Sukka** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
42. **Chicken Tomato Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
43. **Chilli Chicken** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
44. **Chilli Paneer** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
45. **Chingri Malai Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
46. **Coconut Rice** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/coconut-rice.png
47. **Corn Paneer Bhurji Bowl** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
48. **Dosa** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dosa.png
49. **Dragon Chicken** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dragon-chicken.png
50. **Egg Capsicum Bhurji** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
51. **Egg Dosa** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
52. **Egg Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
53. **Egg Toast** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/egg-toast.png
54. **Egg Tomato Rice Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
55. **Fish Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/fish-curry-rice.png
56. **Fish Curry Rice** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/fish-curry-rice.png
57. **Fish Fry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
58. **Garlic Chicken** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
59. **Garlic Egg Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
60. **Garlic Paneer Roti Wrap** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png

## 3. Duplicate or Reused Images

| Image path | Dish count | Dishes using it | Recommendation |
|---|---:|---|---|
| /assets/images/dishes/lunch-default.png | 44 | Bisibelebath, Butter Chicken, Chicken Chettinad, Chicken Stew, Chicken Sukka, Chole Chawal, Dal Roti, Gongura Mutton, Guntur Chilli Chicken, Kadhi Chawal, Keema Fry, Kolhapuri Chicken, Laal Maas, Madras Curry, Mirchi Ka Salan, Nattu Kozhi Curry, Pepper Rasam, Prawn Ghee Roast, Schezwan Fried Rice, Smoked Pork Rice, Chicken Pepper Rice Bowl, Chicken Tomato Rice, Mushroom Pepper Rice Bowl, Chicken Capsicum Stir Fry Bowl, Begun Bhaja, Ghugni, Dhokar Dalna, Chingri Malai Curry, Shukto, Manipuri Eromba, Avial, Beans Thoran, Kadala Curry, Prawn Sukka, Soya Chunks Curry, Sprouts Usal, Matki Usal, Handvo, Baingan Bharta, Kadhi Pakora, Mochar Ghonto, Chingudi Chhecha, Goan Prawn Balchao, Kori Rotti | Replace / diversify |
| /assets/images/dishes/dinner-default.png | 24 | Apple Puree, Boiled Corn, Bonda, Chaat, Chicken Roll, Dal Makhani, Egg Bhurji, Fish Fry, Gujiya, Kachori, Kada Prasad, Mashed Banana, Mathri, Modak, Pitha, Plum Cake, Pork Curry, Rice Cakes, Sundal, Vegetable Puree, Egg Capsicum Bhurji, Litti Chokha, Bamboo Shoot Pork, Assamese Duck Curry | Replace / diversify |
| /assets/images/dishes/homestyle-kitchen-placeholder.png | 17 | Cheese Omelette, Chicken Fried Rice, Chilli Chicken, Egg Dosa, Garlic Chicken, Kadai Paneer, Masala Dosa, Masala Omelette, Matar Paneer, Mushroom Omelette, Onion Dosa, Onion Rice, Onion Uttapam, Paneer Dosa, Peanut Rice, Tomato Uttapam, Vegetable Uttapam | Replace / diversify |
| /assets/images/dishes/breakfast-default.png | 12 | Avalakki, Besan Chilla, Egg Fried Rice, Momos, Rice Porridge, Sticky Rice, Thukpa, Egg Tomato Rice Bowl, Garlic Egg Rice, Chicken Egg Rice Bowl, Akki Roti, Mangalore Buns | Replace / diversify |
| /assets/images/dishes/paneer-curry.png | 11 | Chilli Paneer, Palak Paneer, Paneer Bhurji, Paneer Tikka, Paneer Tikka Masala, Paneer Mushroom Masala, Paneer Capsicum Rice Bowl, Paneer Corn Rice Bowl, Garlic Paneer Roti Wrap, Corn Paneer Bhurji Bowl, Tofu Bhurji | Replace / diversify |
| /assets/images/dishes/paratha.png | 10 | Egg Paratha, Methi Paratha, Onion Paratha, Paneer Paratha, Stuffed Paratha, Palak Paratha, Mooli Paratha, Cheese Paratha, Sweet Holige, Methi Thepla | Replace / diversify |
| /assets/images/dishes/pulao.png | 10 | Chicken Pulao, Paneer Fried Rice, Paneer Pulao, Veg Fried Rice, Veg Pulao, Peas Pulao, Mushroom Pulao, Mutton Pulao, Ghee Rice, Jadoh | Replace / diversify |
| /assets/images/dishes/fish-curry-rice.png | 7 | Fish Curry, Fish Curry Rice, Kerala Fish Curry, Masor Tenga, Meen Pollichathu, Macher Jhol, Goan Fish Curry | Replace / diversify |
| /assets/images/dishes/dosa.png | 6 | Dosa, Spicy Masala Dosa, Neer Dosa, Appam, Set Dosa, Pesarattu | Replace / diversify |
| /assets/images/dishes/aloo-paratha.png | 5 | Aloo Paratha, Spicy Aloo Paratha, Aloo Jeera, Aloo Posto, Aloo Pitika | Replace / diversify |
| /assets/images/dishes/khichdi.png | 5 | Sabudana Khichdi, One Pot Dal Palak Rice, Moong Dal Vegetable Khichdi, Dalma, Naga Galho | Replace / diversify |
| /assets/images/dishes/soup-bowls.png | 5 | Corn Soup, Mushroom Soup, Vegetable Soup, Vegetable Stew, Manipuri Chamthong | Replace / diversify |
| /assets/images/snacks/pakora.png | 4 | Bread Pakora, Fish Pakora, Pakora, Paneer Pakora | Replace / diversify |
| /assets/images/dishes/bread-omelette-homestyle.png | 3 | Onion Omelette, Tomato Omelette, Spanish Omelette | Replace / diversify |
| /assets/images/dishes/chicken-curry-rice.png | 3 | Andhra Chicken Curry, Chicken Curry, Chicken Potato Curry | Replace / diversify |
| /assets/images/dishes/dosa-homestyle.png | 3 | Wheat Dosa, Cheese Dosa, Cheese Uttapam | Replace / diversify |
| /assets/images/dishes/egg-curry.png | 3 | Egg Curry, Egg Curry Rice, Kerala Egg Roast | Replace / diversify |
| /assets/images/dishes/pongal.png | 3 | Pongal, Sweet Pongal, Sweet Rice | Replace / diversify |
| /assets/images/dishes/idli.png | 2 | Idli, Soft Idli | Likely acceptable if same family |
| /assets/images/dishes/lemon-rice.png | 2 | Lemon Rice, Puliyogare | Likely acceptable if same family |
| /assets/images/dishes/poha.png | 2 | Poha, Peanut Poha | Likely acceptable if same family |
| /assets/images/snacks/snacks-default.png | 2 | Kheema Pav, Kolhapuri Misal Pav | Replace / diversify |

## 4. Potentially Wrong / Low-Quality Images

Signals used: fallback/default filenames, placeholder filenames, heavy duplicate use, broad family images used for specific dishes, or filename/dish mismatch.

| Image path | Signal | Dish count | Affected dishes |
|---|---|---:|---|
| /assets/images/dishes/lunch-default.png | fallback/default image | 44 | Bisibelebath, Butter Chicken, Chicken Chettinad, Chicken Stew, Chicken Sukka, Chole Chawal, Dal Roti, Gongura Mutton, Guntur Chilli Chicken, Kadhi Chawal, Keema Fry, Kolhapuri Chicken ... |
| /assets/images/dishes/dinner-default.png | fallback/default image | 24 | Apple Puree, Boiled Corn, Bonda, Chaat, Chicken Roll, Dal Makhani, Egg Bhurji, Fish Fry, Gujiya, Kachori, Kada Prasad, Mashed Banana ... |
| /assets/images/dishes/homestyle-kitchen-placeholder.png | fallback/default image | 17 | Cheese Omelette, Chicken Fried Rice, Chilli Chicken, Egg Dosa, Garlic Chicken, Kadai Paneer, Masala Dosa, Masala Omelette, Matar Paneer, Mushroom Omelette, Onion Dosa, Onion Rice ... |
| /assets/images/dishes/breakfast-default.png | fallback/default image | 12 | Avalakki, Besan Chilla, Egg Fried Rice, Momos, Rice Porridge, Sticky Rice, Thukpa, Egg Tomato Rice Bowl, Garlic Egg Rice, Chicken Egg Rice Bowl, Akki Roti, Mangalore Buns |
| /assets/images/dishes/paneer-curry.png | heavy duplicate reuse | 11 | Chilli Paneer, Palak Paneer, Paneer Bhurji, Paneer Tikka, Paneer Tikka Masala, Paneer Mushroom Masala, Paneer Capsicum Rice Bowl, Paneer Corn Rice Bowl, Garlic Paneer Roti Wrap, Corn Paneer Bhurji Bowl, Tofu Bhurji |
| /assets/images/dishes/paratha.png | heavy duplicate reuse | 10 | Egg Paratha, Methi Paratha, Onion Paratha, Paneer Paratha, Stuffed Paratha, Palak Paratha, Mooli Paratha, Cheese Paratha, Sweet Holige, Methi Thepla |
| /assets/images/dishes/pulao.png | heavy duplicate reuse | 10 | Chicken Pulao, Paneer Fried Rice, Paneer Pulao, Veg Fried Rice, Veg Pulao, Peas Pulao, Mushroom Pulao, Mutton Pulao, Ghee Rice, Jadoh |
| /assets/images/dishes/fish-curry-rice.png | heavy duplicate reuse | 7 | Fish Curry, Fish Curry Rice, Kerala Fish Curry, Masor Tenga, Meen Pollichathu, Macher Jhol, Goan Fish Curry |
| /assets/images/dishes/dosa.png | heavy duplicate reuse | 6 | Dosa, Spicy Masala Dosa, Neer Dosa, Appam, Set Dosa, Pesarattu |
| /assets/images/dishes/aloo-paratha.png | heavy duplicate reuse | 5 | Aloo Paratha, Spicy Aloo Paratha, Aloo Jeera, Aloo Posto, Aloo Pitika |
| /assets/images/dishes/khichdi.png | heavy duplicate reuse | 5 | Sabudana Khichdi, One Pot Dal Palak Rice, Moong Dal Vegetable Khichdi, Dalma, Naga Galho |
| /assets/images/dishes/soup-bowls.png | fallback/default image | 5 | Corn Soup, Mushroom Soup, Vegetable Soup, Vegetable Stew, Manipuri Chamthong |
| /assets/images/snacks/pakora.png | heavy duplicate reuse | 4 | Bread Pakora, Fish Pakora, Pakora, Paneer Pakora |
| /assets/images/dishes/chicken-curry-rice.png | generic family image | 3 | Andhra Chicken Curry, Chicken Curry, Chicken Potato Curry |
| /assets/images/dishes/pongal.png | generic family image | 3 | Pongal, Sweet Pongal, Sweet Rice |
| /assets/images/dishes/poha.png | generic family image | 2 | Poha, Peanut Poha |
| /assets/images/snacks/snacks-default.png | fallback/default image | 2 | Kheema Pav, Kolhapuri Misal Pav |

## 5. Collection Cover Images

| Collection | Key | Cover image | Item count | Status |
|---|---|---|---:|---|
| Tiny Tummy Favorites | baby | /assets/images/collections/baby-food.webp | 30 | OK |
| Lunch Box Heroes | lunchbox | /assets/images/collections/lunch-box-heroes.webp | 30 | OK |
| Sips & Soothers | drinks | /assets/images/collections/healthy-drinks.webp | 30 | OK |
| Fresh Plates | salads | /assets/images/collections/salads.webp | 30 | Exists, but may need stronger bespoke cover |
| Little Sweet Endings | desserts | /assets/images/collections/desserts.webp | 30 | OK |
| Warm Bowls | soups | /assets/images/collections/soups.webp | 30 | Exists, but may need stronger bespoke cover |
| Celebration Specials | festival | /assets/images/collections/festival-food.webp | 35 | Exists, but may need stronger bespoke cover |

## 6. Final Priority List

### Batch 1: Must-generate before Beta 2

1. **Aloo Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/aloo-paratha.png
2. **Bread Upma** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/bread-upma.png
3. **Corn Chaat** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/corn-chaat.png
4. **Egg Bhurji** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
5. **Egg Fried Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
6. **Kosambari** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/salad.png
7. **Modak** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
8. **Paneer Bhurji** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
9. **Peanut Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
10. **Poha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/poha.png
11. **Tomato Rice** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/tomato-rice.png
12. **Veg Pulao** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
13. **Apple Puree** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
14. **Avalakki** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
15. **Avial** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
16. **Besan Chilla** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
17. **Corn Soup** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/soup-bowls.png
18. **Masala Chai** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/masala-chai.png
19. **Mashed Banana** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
20. **Mushroom Soup** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/soup-bowls.png
21. **Pepper Rasam** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
22. **Plum Cake** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
23. **Vegetable Soup** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Collections, Journal if saved/cooked; image: /assets/images/dishes/soup-bowls.png
24. **Andhra Chicken Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-curry-rice.png
25. **Andhra Egg Fry** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/andhra-egg-fry.png
26. **Assamese Duck Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
27. **Butter Chicken** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
28. **Cheese Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
29. **Chicken 555** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-555.png
30. **Chicken Capsicum Stir Fry Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
31. **Chicken Chettinad** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
32. **Chicken Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-curry-rice.png
33. **Chicken Egg Rice Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
34. **Chicken Fried Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
35. **Chicken Majestic** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-majestic.png

### Batch 2: Nice-to-have before tester release

1. **Chicken Pepper Rice Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
2. **Chicken Potato Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chicken-curry-rice.png
3. **Chicken Pulao** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
4. **Chicken Roll** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
5. **Chicken Stew** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
6. **Chicken Sukka** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
7. **Chicken Tomato Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
8. **Chilli Chicken** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
9. **Chilli Paneer** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
10. **Chingri Malai Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
11. **Coconut Rice** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/coconut-rice.png
12. **Corn Paneer Bhurji Bowl** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
13. **Dosa** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dosa.png
14. **Dragon Chicken** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dragon-chicken.png
15. **Egg Capsicum Bhurji** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
16. **Egg Dosa** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
17. **Egg Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
18. **Egg Toast** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/egg-toast.png
19. **Egg Tomato Rice Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
20. **Fish Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/fish-curry-rice.png
21. **Fish Curry Rice** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/fish-curry-rice.png
22. **Fish Fry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
23. **Garlic Chicken** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
24. **Garlic Egg Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
25. **Garlic Paneer Roti Wrap** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
26. **Ghee Rice** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
27. **Goan Fish Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/fish-curry-rice.png
28. **Guntur Chicken Fry** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/guntur-chicken-fry.png
29. **Guntur Chilli Chicken** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
30. **Instant Rava Upma** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/instant-rava-upma.png
31. **Kaaram Dosa** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/kaaram-dosa.png
32. **Kadai Paneer** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
33. **Kadala Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
34. **Kerala Fish Curry** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/fish-curry-rice.png
35. **Kolhapuri Chicken** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
36. **Madras Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
37. **Masala Dosa** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
38. **Matar Paneer** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
39. **Methi Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
40. **Mooli Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
41. **Moong Dal Vegetable Khichdi** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/khichdi.png
42. **Mushroom Pepper Rice Bowl** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
43. **Mushroom Pulao** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
44. **Mutton Pulao** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
45. **Nattu Kozhi Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png

### Batch 3: Can wait until after testing

1. **Neer Dosa** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dosa.png
2. **One Pot Dal Palak Rice** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/khichdi.png
3. **Onion Dosa** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
4. **Onion Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
5. **Onion Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
6. **Palak Paneer** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
7. **Palak Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
8. **Paneer Capsicum Rice Bowl** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
9. **Paneer Corn Rice Bowl** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
10. **Paneer Dosa** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
11. **Paneer Fried Rice** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
12. **Paneer Mushroom Masala** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
13. **Paneer Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
14. **Paneer Pulao** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
15. **Paneer Sandwich** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-sandwich.png
16. **Paneer Tikka** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
17. **Paneer Tikka Masala** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paneer-curry.png
18. **Peanut Poha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/poha.png
19. **Peas Pulao** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
20. **Pongal** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pongal.png
21. **Pork Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
22. **Rice Cakes** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
23. **Rice Porridge** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
24. **Sabudana Khichdi** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/khichdi.png
25. **Schezwan Fried Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
26. **Set Dosa** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dosa.png
27. **Smoked Pork Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
28. **Soya Chunks Curry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
29. **Spicy Aloo Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/aloo-paratha.png
30. **Spicy Masala Dosa** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dosa.png
31. **Sticky Rice** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
32. **Stuffed Paratha** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/paratha.png
33. **Sweet Pongal** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pongal.png
34. **Sweet Rice** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pongal.png
35. **Veg Fried Rice** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
36. **Akki Roti** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/breakfast-default.png
37. **Aloo Jeera** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/aloo-paratha.png
38. **Aloo Pitika** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/aloo-paratha.png
39. **Aloo Posto** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/aloo-paratha.png
40. **Andhra Kodi Vepudu** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/andhra-kodi-vepudu.png
41. **Appam** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dosa.png
42. **Baingan Bharta** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
43. **Bamboo Shoot Pork** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
44. **Beans Thoran** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
45. **Begun Bhaja** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
46. **Bisibelebath** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
47. **Boiled Corn** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
48. **Bonda** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
49. **Chaat** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
50. **Cheese Omelette** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/homestyle-kitchen-placeholder.png
51. **Chilli Mushroom** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/chilli-mushroom.png
52. **Chingudi Chhecha** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
53. **Chole Chawal** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
54. **Dal Makhani** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
55. **Dal Roti** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
56. **Dalma** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/khichdi.png
57. **Dhokar Dalna** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
58. **Dhokla** — File missing in frontend/assets; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/snacks-default.png
59. **Ghugni** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
60. **Goan Prawn Balchao** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
61. **Gongura Mutton** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
62. **Gujiya** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
63. **Handvo** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
64. **Jadoh** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/pulao.png
65. **Kachori** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
66. **Kada Prasad** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/dinner-default.png
67. **Kadhi Chawal** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
68. **Kadhi Pakora** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
69. **Keema Fry** — fallback/default image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/dishes/lunch-default.png
70. **Kheema Pav** — generic/reused family image; surfaces: Tomo Pick candidate, Today's Picks candidate, Mood recommendations, Pantry recommendations, Journal if saved/cooked; image: /assets/images/snacks/snacks-default.png

## Top Observations

1. True missing image files are relatively low (**26**), but generic/fallback reuse is high (**166**).
2. The largest quality risk is repeated use of `lunch-default.png`, `dinner-default.png`, `breakfast-default.png`, `pulao.png`, `paneer-curry.png`, `dosa.png`, and `paratha.png` for many distinct dishes.
3. Recently added regional dishes are the most visually under-served: East/Northeast/Coastal/Kerala expansions often rely on generic lunch/dinner/fish-curry images.
4. Collections generally have covers, but some covers are broad category images rather than specific collection identity images.
5. For user testing, prioritize specific images for dishes that appear across multiple surfaces: Tomo Pick, mood recs, pantry, collections, and Journal.
