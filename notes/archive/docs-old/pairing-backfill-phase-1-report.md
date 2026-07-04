# Pairing Backfill Phase 1

## Summary

- Dishes updated: 25
- Pairing coverage before: 67 of 231 dishes
- Pairing coverage after: 92 of 231 dishes
- Coverage after: 39.8%
- New dishes added: No
- UI changed: No
- Recommendation logic changed: No
- Pantry logic changed: No
- Quick Guides changed: No

## Dishes Updated

1. Chicken Curry
2. Chicken Pulao
3. Chicken Fried Rice
4. Chole Chawal
5. Rajma Chawal
6. Khichdi
7. Pongal
8. Dosa
9. Idli
10. Masala Dosa
11. Kadai Paneer
12. Egg Bhurji
13. Fish Curry
14. Fish Fry
15. Lemon Rice
16. Tomato Rice
17. Veg Pulao
18. Paneer Pulao
19. Matar Paneer
20. Palak Paneer
21. Dal Rice
22. Sambar Rice
23. Rasam Rice
24. Puliyogare
25. Curd Rice

## Pairings Added

### Chicken Curry

- Rice: Steamed rice, Jeera rice
- Roti: Chapati
- Sides: Cucumber onion salad
- Drinks: Buttermilk

### Chicken Pulao

- Sides: Onion raita, Cucumber salad
- Pickles: Mango pickle
- Drinks: Buttermilk

### Chicken Fried Rice

- Sides: Chilli chicken dry, Cucumber slices
- Toppings: Spring onion
- Drinks: Lime soda

### Chole Chawal

- Sides: Kachumber salad, Onion rings
- Pickles: Green chilli pickle
- Drinks: Masala chaas

### Rajma Chawal

- Sides: Onion salad, Cucumber raita
- Pickles: Mango pickle
- Toppings: Ghee

### Khichdi

- Sides: Curd, Papad
- Pickles: Mango pickle
- Toppings: Ghee

### Pongal

- Chutneys: Coconut chutney
- Sides: Sambar
- Toppings: Ghee, Black pepper
- Drinks: Filter coffee

### Dosa

- Chutneys: Coconut chutney, Tomato chutney
- Sides: Sambar
- Toppings: Ghee

### Idli

- Chutneys: Coconut chutney, Podi
- Sides: Sambar
- Toppings: Ghee

### Masala Dosa

- Chutneys: Coconut chutney, Tomato chutney
- Sides: Sambar
- Drinks: Filter coffee

### Kadai Paneer

- Roti: Chapati, Naan
- Rice: Jeera rice
- Sides: Onion salad

### Egg Bhurji

- Roti: Chapati
- Sides: Buttered toast, Kachumber salad
- Toppings: Coriander

### Fish Curry

- Rice: Steamed rice
- Sides: Beans thoran, Onion salad
- Drinks: Sol kadhi

### Fish Fry

- Rice: Rasam rice, Curd rice
- Sides: Onion rings
- Drinks: Sol kadhi
- Toppings: Lemon

### Lemon Rice

- Sides: Curd, Papad
- Pickles: Mango pickle
- Toppings: Roasted peanuts

### Tomato Rice

- Sides: Curd, Papad
- Pickles: Lemon pickle
- Toppings: Roasted peanuts

### Veg Pulao

- Sides: Onion raita, Cucumber salad
- Pickles: Mixed pickle
- Drinks: Masala chaas

### Paneer Pulao

- Sides: Mint raita, Onion salad
- Pickles: Mango pickle
- Drinks: Buttermilk

### Matar Paneer

- Roti: Chapati, Paratha
- Rice: Jeera rice
- Sides: Onion salad

### Palak Paneer

- Roti: Chapati, Naan
- Rice: Jeera rice
- Sides: Cucumber raita

### Dal Rice

- Sides: Papad, Aloo jeera
- Pickles: Mango pickle
- Toppings: Ghee

### Sambar Rice

- Sides: Potato fry, Papad
- Pickles: Lemon pickle
- Toppings: Ghee

### Rasam Rice

- Sides: Potato fry, Papad
- Pickles: Mango pickle
- Toppings: Ghee

### Puliyogare

- Sides: Curd, Papad
- Toppings: Roasted peanuts
- Drinks: Buttermilk

### Curd Rice

- Pickles: Mango pickle, Lemon pickle
- Sides: Papad
- Toppings: Pomegranate, Coriander

## Validation

Passed:

- `database/generated/recipes.json` parses as JSON.
- `local-recipes.js` parses as JavaScript.
- `frontend/local-recipes.js` parses as JavaScript.
- `frontend/mobile/mobile-shell.js` parses as JavaScript.
- No duplicate titles.
- Pairing schema is valid.
- No duplicate labels within a dish pairing type.
- Existing pairings on non-target dishes were preserved.
- Local mirrors match generated database.
