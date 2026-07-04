# Mobile V2 Mood Engine RC1 Audit

Final verdict: **MOOD ENGINE RC1: PASS**

Scope: active Mobile V2 mood engine only. No UI, pantry engine, desktop, or database changes were made for this audit.

## PASS / FAIL Summary

- PASS Mood distribution counts match final eligible lists.
- PASS Rainy Day final mapping matches RC1 requirements.
- PASS Soul Food has no spicy dosa/idli/uttapam leaks.
- PASS High Protein excludes carb-first and sweet/snack leaks.
- PASS Spicy Food is identity-based; optional-spice flags: none.
- PASS Quick top 10 feels actually quick.

## Mood Distribution

| Mood | Final Eligible Count | Count/List Match |
|---|---:|---|
| Comfort Food | 139 | PASS |
| Soul Food | 18 | PASS |
| High Protein | 75 | PASS |
| Quick | 164 | PASS |
| Rainy Day | 19 | PASS |
| Spicy Food | 16 | PASS |

## Rainy Day Final Validation

- PASS Breakfast: Pongal, Upma, Masala Dosa, Ragi Porridge
- PASS Lunch: Khichdi, Rasam Rice, Sambar Rice, Bisibelebath
- PASS Dinner: Masala Dosa, Onion Uttapam, Aloo Paratha, Methi Paratha, Thukpa
- PASS Snacks: Pakora, Bread Pakora, Mirchi Bajji, Masala Chai
- PASS Lunch and dinner do not share primary dishes.
- PASS Pepper Rasam is not beside Rasam Rice in primary lunch. Full lunch order keeps Pepper Rasam as lower alternate: Khichdi -> Rasam Rice -> Sambar Rice -> Bisibelebath -> Pepper Rasam.
- PASS Soups are not primary dinner. Dinner support alternates: Vegetable Soup, Mushroom Soup.
- PASS Dinner feels like cozy evening craving: dosa, uttapam, paratha, and Thukpa lead the list.

## Hard Exclusions Applied

Soul Food exclusions:
- Gunpowder Idli
- Kaaram Dosa
- Spicy Masala Dosa
- Spicy Aloo Paratha
- Paneer Dosa
- Egg Dosa
- Tomato Uttapam
- Vegetable Uttapam
- Onion Uttapam

High Protein exclusions and families:
- Ladoo
- Bonda
- Pakora
- Bread Pakora
- Mirchi Bajji
- Mirapakaya Bajji
- Dosa / Idli / Poha / Avalakki / Upma
- Lemon Rice / Puliyogare / Tomato Rice / Coconut Rice / Plain Chapati
- Kheer / Payasam family

Spicy Food demotions from optional-spice matching:
- Egg Curry
- Chicken Chettinad
- Chicken Majestic
- Chicken 555
- Dragon Chicken
- Boiled Corn

## Questionable Placements

- Comfort top 10: Khichdi, Curd Rice, Pongal, Dal Rice, Rasam Rice, Sambar Rice, Rajma Chawal, Chole Chawal, Dal Makhani, Palak Paneer. Questionable placements: none flagged.
- Quick top 10: Bread Upma, Coconut Rice, Corn Chaat, Egg Toast, Instant Rava Upma, Lemon Sevai, Paneer Sandwich, Peanut Sundal, Tomato Rice, Veg Sandwich. Questionable placements: none flagged.
- Spicy optional-only flags: none.

## Comfort Food

Eligible count: 139

### Final Eligible List
- Khichdi
- Curd Rice
- Pongal
- Dal Rice
- Rasam Rice
- Sambar Rice
- Rajma Chawal
- Chole Chawal
- Dal Makhani
- Palak Paneer
- Aloo Paratha
- Idli
- Dosa
- Upma
- Poha
- Egg Curry
- Apple Puree
- Biryani
- Butter Chicken
- Chaat
- Chicken Chettinad
- Chicken Curry
- Chicken Pulao
- Chicken Stew
- Chicken Sukka
- Chilli Paneer
- Egg Bhurji
- Egg Curry Rice
- Fish Curry
- Fish Fry
- Gongura Mutton
- Gujiya
- Guntur Chilli Chicken
- Kada Prasad
- Kadai Paneer
- Keema Fry
- Kerala Fish Curry
- Kheema Pav
- Kolhapuri Chicken
- Kolhapuri Misal Pav
- Laal Maas
- Ladoo
- Madras Curry
- Mashed Banana
- Matar Paneer
- Mathri
- Methi Paratha
- Mirchi Bajji
- Mirchi Ka Salan
- Modak
- Nattu Kozhi Curry
- Oats Porridge
- Paneer Tikka
- Paneer Tikka Masala
- Pitha
- Plum Cake
- Prawn Ghee Roast
- Ragi Porridge
- Rice Cakes
- Rice Porridge
- Sabudana Khichdi
- Samosa
- Schezwan Fried Rice
- Spicy Masala Dosa
- Stuffed Paratha
- Sundal
- Sweet Pongal
- Thukpa
- Vegetable Puree
- Vegetable Soup
- Besan Chilla
- Boiled Corn
- Bread Upma
- Coconut Rice
- Fish Curry Rice
- Instant Rava Upma
- Kachori
- Kadhi Chawal
- Momos
- Paneer Paratha
- Pork Curry
- Smoked Pork Rice
- Sticky Rice
- Tomato Rice
- Lemon Sevai
- Peanut Sundal
- Corn Chaat
- Egg Toast
- Paneer Sandwich
- Veg Sandwich
- Cheese Omelette
- Chicken Fried Rice
- Chilli Chicken
- Egg Dosa
- Fish Pakora
- Garlic Chicken
- Masala Omelette
- Mushroom Omelette
- Onion Dosa
- Onion Rice
- Onion Uttapam
- Pakora
- Paneer Dosa
- Peanut Rice
- Tomato Uttapam
- Vegetable Uttapam
- Bonda
- Bread Pakora
- Corn Soup
- Egg Fried Rice
- Egg Paratha
- Masala Chai
- Onion Paratha
- Paneer Fried Rice
- Paneer Pakora
- Paneer Pulao
- Plain Chapati
- Puliyogare
- Veg Fried Rice
- Veg Pulao
- Wheat Dosa
- Avalakki
- Bisibelebath
- Bread Omelette
- Chicken Roll
- Dal Roti
- Lemon Rice
- Mushroom Soup
- Paneer Bhurji
- Gunpowder Idli
- Kaaram Dosa
- Peas Pulao
- Mushroom Pulao
- Batata Poha
- Paneer Mushroom Masala
- Mutton Pulao
- Cheese Dosa
- Cheese Uttapam
- Sweet Rice

### Top 10 Dishes
- Khichdi
- Curd Rice
- Pongal
- Dal Rice
- Rasam Rice
- Sambar Rice
- Rajma Chawal
- Chole Chawal
- Dal Makhani
- Palak Paneer

### Breakfast Mapping
- Pongal
- Aloo Paratha
- Idli
- Dosa
- Upma
- Poha
- Methi Paratha
- Ragi Porridge
- Rice Porridge
- Spicy Masala Dosa

### Lunch Mapping
- Khichdi
- Curd Rice
- Dal Rice
- Rasam Rice
- Sambar Rice
- Rajma Chawal
- Chole Chawal
- Dal Makhani
- Palak Paneer
- Egg Curry

### Dinner Mapping
- Khichdi
- Dal Makhani
- Chicken Curry
- Chicken Pulao
- Egg Bhurji
- Fish Curry
- Fish Fry
- Kadai Paneer
- Matar Paneer
- Oats Porridge

### Snacks Mapping
- Apple Puree
- Chaat
- Chilli Paneer
- Kheema Pav
- Kolhapuri Misal Pav
- Mashed Banana
- Mathri
- Mirchi Bajji
- Paneer Tikka
- Rice Cakes

## Soul Food

Eligible count: 18

### Final Eligible List
- Curd Rice
- Dal Rice
- Rasam Rice
- Rice Porridge
- Soft Idli
- Khichdi
- Pongal
- Aloo Paratha
- Dosa
- Masala Dosa
- Coconut Rice
- Puliyogare
- Sambar Rice
- Chole Chawal
- Rajma Chawal
- Upma
- Poha
- Avalakki

### Top 10 Dishes
- Curd Rice
- Dal Rice
- Rasam Rice
- Rice Porridge
- Soft Idli
- Khichdi
- Pongal
- Aloo Paratha
- Dosa
- Masala Dosa

### Breakfast Mapping
- Rice Porridge
- Soft Idli
- Pongal
- Aloo Paratha
- Dosa
- Masala Dosa
- Upma
- Poha
- Avalakki

### Lunch Mapping
- Curd Rice
- Dal Rice
- Rasam Rice
- Khichdi
- Coconut Rice
- Puliyogare
- Sambar Rice
- Chole Chawal
- Rajma Chawal

### Dinner Mapping
- Khichdi

### Snacks Mapping
- None

## High Protein

Eligible count: 75

### Final Eligible List
- Andhra Chicken Curry
- Andhra Egg Fry
- Andhra Kodi Vepudu
- Biryani
- Bread Omelette
- Butter Chicken
- Chicken 555
- Chicken 65
- Chicken Chettinad
- Chicken Curry
- Chicken Majestic
- Chicken Pulao
- Chicken Roll
- Chicken Stew
- Chicken Sukka
- Chilli Paneer
- Dragon Chicken
- Egg Bhurji
- Egg Curry
- Egg Curry Rice
- Egg Toast
- Fish Curry
- Fish Curry Rice
- Fish Fry
- Guntur Chicken Fry
- Guntur Chilli Chicken
- Kerala Fish Curry
- Kolhapuri Chicken
- Madras Curry
- Nattu Kozhi Curry
- Palak Paneer
- Paneer Bhurji
- Paneer Paratha
- Paneer Sandwich
- Paneer Tikka
- Paneer Tikka Masala
- Peanut Sundal
- Sundal
- Bisibelebath
- Dal Roti
- Kachori
- Cheese Omelette
- Chicken Fried Rice
- Chilli Chicken
- Egg Fried Rice
- Garlic Chicken
- Gongura Mutton
- Kadai Paneer
- Keema Fry
- Kheema Pav
- Laal Maas
- Masala Omelette
- Matar Paneer
- Mushroom Omelette
- Pork Curry
- Prawn Ghee Roast
- Smoked Pork Rice
- Egg Paratha
- Paneer Fried Rice
- Paneer Pulao
- Besan Chilla
- Onion Omelette
- Tomato Omelette
- Paneer Mushroom Masala
- Chicken Potato Curry
- Chicken Mushroom Stir Fry
- Spanish Omelette
- Dal Makhani
- Khichdi
- Pongal
- Sabudana Khichdi
- Chole Chawal
- Rajma Chawal
- Mirchi Ka Salan
- Mutton Pulao

### Top 10 Dishes
- Andhra Chicken Curry
- Andhra Egg Fry
- Andhra Kodi Vepudu
- Biryani
- Bread Omelette
- Butter Chicken
- Chicken 555
- Chicken 65
- Chicken Chettinad
- Chicken Curry

### Breakfast Mapping
- Bread Omelette
- Egg Toast
- Paneer Paratha
- Paneer Sandwich
- Cheese Omelette
- Masala Omelette
- Mushroom Omelette
- Egg Paratha
- Besan Chilla
- Onion Omelette

### Lunch Mapping
- Andhra Chicken Curry
- Andhra Egg Fry
- Andhra Kodi Vepudu
- Butter Chicken
- Chicken Chettinad
- Chicken Stew
- Chicken Sukka
- Egg Curry
- Egg Curry Rice
- Fish Curry Rice

### Dinner Mapping
- Chicken Curry
- Chicken Pulao
- Egg Bhurji
- Fish Curry
- Fish Fry
- Paneer Bhurji
- Chilli Chicken
- Garlic Chicken
- Kadai Paneer
- Matar Paneer

### Snacks Mapping
- Chicken 555
- Chicken 65
- Chicken Majestic
- Chicken Roll
- Chilli Paneer
- Dragon Chicken
- Paneer Tikka
- Peanut Sundal
- Sundal
- Kachori

## Quick

Eligible count: 164

### Final Eligible List
- Aloo Paratha
- Andhra Chicken Curry
- Andhra Egg Fry
- Andhra Kodi Vepudu
- Andhra Podi Idli
- Apple Puree
- Avalakki
- Besan Chilla
- Biryani
- Bisibelebath
- Boiled Corn
- Bonda
- Bread Omelette
- Bread Pakora
- Bread Upma
- Butter Chicken
- Chaat
- Cheese Omelette
- Chicken 555
- Chicken 65
- Chicken Chettinad
- Chicken Curry
- Chicken Fried Rice
- Chicken Majestic
- Chicken Pulao
- Chicken Roll
- Chicken Stew
- Chicken Sukka
- Chilli Chicken
- Chilli Mushroom
- Chilli Paneer
- Chole Chawal
- Coconut Rice
- Corn Chaat
- Corn Soup
- Curd Rice
- Dal Makhani
- Dal Rice
- Dal Roti
- Dosa
- Dragon Chicken
- Egg Bhurji
- Egg Curry
- Egg Curry
- Egg Curry Rice
- Egg Dosa
- Egg Fried Rice
- Egg Paratha
- Egg Toast
- Fish Curry
- Fish Curry Rice
- Fish Fry
- Fish Pakora
- Garlic Chicken
- Gongura Mutton
- Gujiya
- Gunpowder Idli
- Guntur Chicken Fry
- Guntur Chilli Chicken
- Idli
- Instant Rava Upma
- Kaaram Dosa
- Kachori
- Kada Prasad
- Kadai Paneer
- Kadhi Chawal
- Keema Fry
- Kerala Fish Curry
- Kheema Pav
- Khichdi
- Kolhapuri Chicken
- Kolhapuri Misal Pav
- Laal Maas
- Ladoo
- Lemon Rice
- Lemon Sevai
- Madras Curry
- Masala Chai
- Masala Dosa
- Masala Omelette
- Mashed Banana
- Matar Paneer
- Mathri
- Methi Paratha
- Mirapakaya Bajji
- Mirchi Bajji
- Mirchi Ka Salan
- Modak
- Momos
- Mushroom Omelette
- Mushroom Soup
- Nattu Kozhi Curry
- Oats Porridge
- Onion Dosa
- Onion Paratha
- Onion Rice
- Onion Uttapam
- Pakora
- Palak Paneer
- Paneer Bhurji
- Paneer Dosa
- Paneer Fried Rice
- Paneer Pakora
- Paneer Paratha
- Paneer Pulao
- Paneer Sandwich
- Paneer Tikka
- Paneer Tikka Masala
- Peanut Rice
- Peanut Sundal
- Pepper Rasam
- Pitha
- Plain Chapati
- Plum Cake
- Poha
- Pongal
- Pork Curry
- Prawn Ghee Roast
- Puliyogare
- Ragi Porridge
- Rajma Chawal
- Rasam Rice
- Rice Cakes
- Rice Porridge
- Sabudana Khichdi
- Sambar Rice
- Samosa
- Schezwan Fried Rice
- Smoked Pork Rice
- Soft Idli
- Spicy Aloo Paratha
- Spicy Masala Dosa
- Sticky Rice
- Stuffed Paratha
- Sundal
- Sweet Pongal
- Thukpa
- Tomato Rice
- Tomato Uttapam
- Upma
- Veg Fried Rice
- Veg Pulao
- Veg Sandwich
- Vegetable Puree
- Vegetable Soup
- Vegetable Uttapam
- Wheat Dosa
- Peas Pulao
- Mushroom Pulao
- Onion Omelette
- Tomato Omelette
- Batata Poha
- Paneer Mushroom Masala
- Chicken Potato Curry
- Chicken Mushroom Stir Fry
- Mutton Pulao
- Palak Paratha
- Mooli Paratha
- Cheese Paratha
- Sweet Holige
- Cheese Dosa
- Cheese Uttapam
- Spanish Omelette
- Sweet Rice

### Top 10 Dishes
- Bread Upma
- Coconut Rice
- Corn Chaat
- Egg Toast
- Instant Rava Upma
- Lemon Sevai
- Paneer Sandwich
- Peanut Sundal
- Tomato Rice
- Veg Sandwich

### Breakfast Mapping
- Bread Upma
- Egg Toast
- Instant Rava Upma
- Lemon Sevai
- Paneer Sandwich
- Andhra Podi Idli
- Gunpowder Idli
- Kaaram Dosa
- Onion Omelette
- Tomato Omelette

### Lunch Mapping
- Coconut Rice
- Tomato Rice
- Andhra Egg Fry
- Pepper Rasam
- Schezwan Fried Rice
- Bisibelebath
- Chicken Fried Rice
- Dal Roti
- Lemon Rice
- Onion Rice

### Dinner Mapping
- Garlic Chicken
- Paneer Bhurji
- Plain Chapati
- Chicken Curry
- Chicken Pulao
- Chilli Chicken
- Dal Makhani
- Egg Bhurji
- Egg Curry
- Fish Curry

### Snacks Mapping
- Corn Chaat
- Peanut Sundal
- Veg Sandwich
- Chilli Mushroom
- Chilli Paneer
- Masala Chai
- Mirapakaya Bajji
- Mirchi Bajji
- Apple Puree
- Boiled Corn

## Rainy Day

Eligible count: 19

### Final Eligible List
- Pongal
- Upma
- Masala Dosa
- Ragi Porridge
- Khichdi
- Rasam Rice
- Sambar Rice
- Bisibelebath
- Pepper Rasam
- Onion Uttapam
- Aloo Paratha
- Methi Paratha
- Thukpa
- Vegetable Soup
- Mushroom Soup
- Pakora
- Bread Pakora
- Mirchi Bajji
- Masala Chai

### Top 10 Dishes
- Masala Chai
- Vegetable Soup
- Mushroom Soup
- Pakora
- Bread Pakora
- Mirchi Bajji
- Rasam Rice
- Pepper Rasam
- Pongal
- Khichdi

### Breakfast Mapping
- Pongal
- Upma
- Masala Dosa
- Ragi Porridge

### Lunch Mapping
- Khichdi
- Rasam Rice
- Sambar Rice
- Bisibelebath
- Pepper Rasam

### Dinner Mapping
- Masala Dosa
- Onion Uttapam
- Aloo Paratha
- Methi Paratha
- Thukpa
- Vegetable Soup
- Mushroom Soup

### Snacks Mapping
- Pakora
- Bread Pakora
- Mirchi Bajji
- Masala Chai

## Spicy Food

Eligible count: 16

### Final Eligible List
- Andhra Chicken Curry
- Andhra Kodi Vepudu
- Guntur Chicken Fry
- Chicken 65
- Chilli Chicken
- Chilli Paneer
- Pepper Rasam
- Kaaram Dosa
- Gunpowder Idli
- Mirchi Bajji
- Kolhapuri Misal Pav
- Mirchi Ka Salan
- Schezwan Fried Rice
- Chilli Mushroom
- Kolhapuri Chicken
- Guntur Chilli Chicken

### Top 10 Dishes
- Andhra Chicken Curry
- Andhra Kodi Vepudu
- Guntur Chicken Fry
- Chicken 65
- Chilli Chicken
- Chilli Paneer
- Pepper Rasam
- Kaaram Dosa
- Gunpowder Idli
- Mirchi Bajji

### Breakfast Mapping
- Kaaram Dosa
- Gunpowder Idli

### Lunch Mapping
- Andhra Chicken Curry
- Andhra Kodi Vepudu
- Guntur Chicken Fry
- Pepper Rasam
- Mirchi Ka Salan
- Schezwan Fried Rice
- Kolhapuri Chicken
- Guntur Chilli Chicken

### Dinner Mapping
- Chilli Chicken

### Snacks Mapping
- Chicken 65
- Chilli Paneer
- Mirchi Bajji
- Kolhapuri Misal Pav
- Chilli Mushroom

## Final Verdict

MOOD ENGINE RC1: PASS
