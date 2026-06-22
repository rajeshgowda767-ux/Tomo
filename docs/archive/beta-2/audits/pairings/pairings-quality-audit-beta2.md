# Pairings Quality Audit — Beta 2

Scope: current mobile recipe bundle, 449 recipes. Pairing data exists for 395 recipes.

Method: automated scan for generic and context-breaking pairings, followed by manual review to remove valid regional combinations. No recipe data was changed.

## Priority findings

| Dish | Current pairings | Issue | Suggested replacement pairings |
|---|---|---|---|
| Egg Fried Rice | Chilli Paneer; Cucumber slices; Lime soda; Spring onion | Chilli Paneer is another full main and makes the plate unnecessarily heavy. | Cucumber salad; chilli sauce; spring onion; lime soda |
| Paneer Bhurji | Onion salad; Mango pickle; Masala chai; Chapati; Phulka | Masala Chai is a meal-context mismatch for a lunch/dinner paneer main. | Onion salad; mango pickle; chapati/phulka; buttermilk |
| Pepper Rasam | Rice; papad; steamed rice | Rice is duplicated semantically and appears once in the wrong category. | Steamed rice; beans poriyal; papad |
| Corn Chaat | Masala chaas; veg sandwich | Veg Sandwich is another full snack/meal rather than an accompaniment. | Mint chutney; lemon wedges; masala chaas |
| Veg Fried Rice | Chilli Paneer; Veg Manchurian; chilli sauce | Two heavy mains are attached to another main; repetitive Indo-Chinese template. | Chilli sauce; cucumber salad; spring rolls |
| Schezwan Fried Rice | Chilli Paneer; Veg Manchurian; Schezwan sauce | Same heavy, repetitive template as Veg Fried Rice. | Schezwan sauce; cucumber salad; spring rolls |
| Mini Idli Sambar | Curd rice | Curd Rice is a second full rice meal and does not support the breakfast context. | Coconut chutney; podi; filter coffee |
| Boondi Raita | Coconut chutney; buttermilk | Coconut Chutney is regionally/contextually wrong; Buttermilk duplicates the dairy profile. | Biryani; veg pulao; stuffed paratha |
| Momos | Clear soup; momo chutney; tomato chilli chutney; Masala chai | Clear Soup is valid; Masala Chai weakens the Tibetan/Northeast café context. | Clear soup; momo chutney; tomato chilli chutney |
| Tomato Onion Chaat | Masala chai; sandwich | Masala Chai is stored as a side, and Sandwich is another full snack. | Tamarind chutney; mint chutney; lemon |

## Generic Curd Rice reuse

| Dish | Current pairings | Issue | Suggested replacement pairings |
|---|---|---|---|
| Ajwain Water | Plain rice; curd rice | A digestive drink is paired with two complete rice meals. | Dry toast; roasted makhana |
| Beetroot Salad | Curd rice; dal roti | Both are complete meals rather than light accompaniments. | Roasted seeds; grilled paneer; lemon dressing |
| Cabbage Salad | Dal rice; curd rice | Generic rice-meal reuse; neither pairing explains the salad. | Roasted peanuts; lemon dressing; grilled paneer |
| Millet Soup | Curd rice; toast | Toast is suitable; Curd Rice is unrelated and overly heavy. | Toast; roasted seeds |
| Nannari Sherbet | Fruit chaat; curd rice | Fruit Chaat is plausible; Curd Rice is a meal-context mismatch. | Fruit chaat; light savory snack |
| Pomegranate Salad | Curd rice; veg sandwich | Curd Rice is unrelated; Veg Sandwich competes as another meal. | Walnuts; yogurt dressing; grilled paneer |
| Pineapple Salad | Curd rice; grilled sandwich | Curd Rice is generic and unrelated. | Grilled paneer; toasted seeds; mint dressing |
| Coconut Cucumber Salad | Rasam rice; curd rice | Two rice meals make the pairing list repetitive and overly specific. | Appam; vegetable stew; grilled paneer |

## Soup pairing mismatches

| Dish | Current pairings | Issue | Suggested replacement pairings |
|---|---|---|---|
| Broccoli Salad | Soup; paneer sandwich | “Soup” is too generic; Paneer Sandwich is another complete meal. | Grilled paneer; roasted seeds; lemon dressing |
| Spinach Salad | Soup; paneer tikka | Paneer Tikka is useful; generic “Soup” adds little trust or specificity. | Paneer tikka; roasted chickpeas; lemon dressing |
| Drumstick Soup | Rice; papad | Rice makes the soup feel like a generic curry template. | Toast; soft idli; pepper crackers |
| Garlic Soup | Toast; khichdi | Khichdi is another complete comfort meal. | Toast; roasted vegetables |
| Hot and Sour Soup | Spring rolls; chilli paneer | Spring Rolls fit; Chilli Paneer is a second full main. | Spring rolls; fried noodles |
| Lentil Soup | Toast; rice | Rice is generic and turns the soup into an unclear full-meal combination. | Toast; simple salad |
| Manchow Soup | Fried noodles; chilli paneer | Fried noodles fit; Chilli Paneer is a second full main. | Fried noodles; spring rolls |
| Noodle Soup | Veg sandwich; chilli paneer | Both pairings compete as full dishes and do not support the soup. | Momos; spring rolls; chilli oil |
| Oats Soup | Toast; banana pancake | Banana Pancake is a breakfast/dessert-style mismatch. | Toast; roasted vegetables |
| Paneer Soup | Toast; veg sandwich | Veg Sandwich is another complete meal and repeats the café template. | Toast; herb salad |
| Sweet Corn Soup | Chilli paneer; toast | Toast fits; Chilli Paneer is another full main. | Toast; spring rolls |
| Vegetable Soup | Toast; veg sandwich | Veg Sandwich is another full meal and is repeated across soup records. | Toast; roasted seeds |

## Masala Chai overuse

| Dish | Current pairings | Issue | Suggested replacement pairings |
|---|---|---|---|
| Dal Roti | Curd; mango pickle; Masala chai; butter | Chai does not fit the main-meal context. | Curd; mango pickle; buttermilk |
| Keema Fry | Onion salad; lemon; Masala chai; pav; chapati; coriander | Chai clashes with the savory meat-main context. | Onion salad; lemon; pav/chapati; salted lassi |
| Plain Chapati | Curd; mango pickle; Masala chai; butter | Chai does not make Plain Chapati feel like a complete or intentional pairing. | Dal; vegetable curry; curd; pickle |

## Audit summary

- Recipes audited: 449
- Recipes containing pairing data: 395
- High-confidence recipes flagged: 33
- Exact duplicate pairings inside one recipe: 0
- Main issue clusters:
  - Curd Rice used as a generic side
  - Full meals stored as side pairings
  - Generic soup/rice templates
  - Masala Chai reused outside breakfast/snack contexts
  - One clear regional mismatch: Boondi Raita with Coconut Chutney
  - One clear savory/dessert mismatch: Oats Soup with Banana Pancake

Valid combinations intentionally not flagged include Masala Dosa with sambar/chutneys, Appam with Kerala curries/stew, Mor Kuzhambu with steamed rice, and Momos with clear soup.
