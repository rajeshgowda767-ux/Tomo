# Candidate Recipe Deduplication Audit

- Database: `/Users/apple/Documents/Codex/CookBuddy-latest-local/web-backend-prototype/database/generated/recipes.json`
- Database recipes scanned: 148
- Candidates checked: 20
- Fields checked: name, aliases, coreIngredients, dishFamily, cuisine
- Mutations: none

## SAFE_TO_CREATE (17)

### Peas Pulao
- Candidate core ingredients: rice, green peas
- Candidate family / cuisine: rice-meal / Indian
- Decision: Veg Pulao, Chicken Pulao, and Paneer Pulao exist, but none represents green-pea pulao as a core ingredient identity.

### Mushroom Rice
- Candidate core ingredients: rice, mushroom
- Candidate family / cuisine: rice-meal / Indian
- Decision: The catalog has mushroom dishes and rice dishes, but no rice-and-mushroom recipe.

### Mutton Pulao
- Candidate core ingredients: rice, mutton
- Candidate family / cuisine: rice-meal / Indian
- Decision: Gongura Mutton and other pulaos exist, but no mutton pulao or equivalent rice-and-mutton preparation exists.

### Palak Paratha
- Candidate core ingredients: wheat flour, spinach
- Candidate family / cuisine: paratha / North Indian
- Decision: Palak Paneer and several parathas exist, but no spinach paratha is represented.

### Mooli Paratha
- Candidate core ingredients: wheat flour, radish
- Candidate family / cuisine: paratha / North Indian
- Decision: Generic Stuffed Paratha is potato-based; no radish-centered paratha exists.

### Cheese Paratha
- Candidate core ingredients: wheat flour, cheese
- Candidate family / cuisine: paratha / Indian
- Decision: Cheese Omelette exists, but no cheese-filled paratha or equivalent flatbread exists.

### Sweet Holige
- Candidate core ingredients: wheat flour, jaggery, chana dal
- Candidate family / cuisine: sweet-flatbread / Karnataka / South Indian
- Decision: No Holige, Obbattu, Puran Poli, or equivalent jaggery-lentil stuffed flatbread exists.

### Cheese Dosa
- Candidate core ingredients: dosa batter, cheese
- Candidate family / cuisine: dosa / South Indian / Fusion
- Decision: Several dosa variants exist, but none has cheese as a core ingredient.

### Cheese Uttapam
- Candidate core ingredients: idli batter, cheese
- Candidate family / cuisine: uttapam / South Indian / Fusion
- Decision: Onion, Tomato, and Vegetable Uttapam exist, but no cheese uttapam exists.

### Paneer Mushroom Masala
- Candidate core ingredients: paneer, mushroom
- Candidate family / cuisine: paneer-curry / North Indian
- Decision: Paneer curries and Chilli Mushroom exist separately; no recipe combines paneer and mushroom as core ingredients.

### Onion Omelette
- Candidate core ingredients: egg, onion
- Candidate family / cuisine: omelette / Indian
- Decision: Existing omelettes use bread, cheese, capsicum, or mushroom as their second core ingredient; onion omelette is not represented.

### Tomato Omelette
- Candidate core ingredients: egg, tomato
- Candidate family / cuisine: omelette / Indian
- Decision: No egg-and-tomato omelette exists. Tomato Rice and Tomato Uttapam are different dish families.

### Spanish Omelette
- Candidate core ingredients: egg, potato
- Candidate family / cuisine: omelette / Spanish
- Decision: No potato-and-egg tortilla/Spanish omelette exists; existing omelettes have different core ingredients and cuisine intent.

### Chicken Potato Curry
- Candidate core ingredients: chicken, potato
- Candidate family / cuisine: chicken-curry / Indian
- Decision: Chicken Curry exists, but potato is not represented in its core or optional ingredients; the candidate has a distinct pantry and recipe identity.

### Chicken Mushroom Stir Fry
- Candidate core ingredients: chicken, mushroom
- Candidate family / cuisine: stir-fry / Asian / Indo-Chinese
- Decision: Chicken and mushroom recipes exist separately, but no chicken-mushroom stir fry or equivalent preparation exists.

### Batata Poha
- Candidate core ingredients: poha, potato
- Candidate family / cuisine: poha / Maharashtrian
- Decision: Existing Poha is onion/peanut-centered and does not contain potato. Batata Poha is a distinct recognized variant, not merely a synonym.

### Sweet Rice
- Candidate core ingredients: rice, jaggery
- Candidate family / cuisine: sweet-rice / Indian
- Decision: Sweet Pongal uses rice and moong dal and is not semantically equivalent; no jaggery sweet-rice recipe exists.

## ALREADY_EXISTS (0)

_None._

## MERGE_AS_ALIAS (3)

### Chicken Fry
- Existing recipe: **Andhra Kodi Vepudu**
- Proposed aliases: Chicken Fry, Andhra Chicken Fry
- Candidate core ingredients: chicken, chilli
- Candidate family / cuisine: chicken / Indian
- Decision: Andhra Kodi Vepudu is an existing dry-fried chicken preparation with matching chicken/chilli core ingredients and the same dish family. Guntur Chicken Fry remains a more specific regional variant.

### Chicken Egg Fried Rice
- Existing recipe: **Chicken Fried Rice**
- Proposed aliases: Chicken Egg Fried Rice, Chicken and Egg Fried Rice
- Candidate core ingredients: rice, chicken, egg
- Candidate family / cuisine: fried-rice / Indo-Chinese / Asian
- Decision: Existing Chicken Fried Rice already includes egg in its ingredient list and optional ingredients, with the same fried-rice family and preparation intent.

### Vegetable Upma
- Existing recipe: **Upma**
- Proposed aliases: Vegetable Upma, Vegetable Rava Upma
- Candidate core ingredients: rava, mixed vegetables
- Candidate family / cuisine: upma / South Indian
- Decision: Existing Upma is described as rava with vegetables and already includes carrot as a supporting ingredient. The candidate is the same preparation under a more explicit name.

## Next Actions

- Create nothing until the SAFE_TO_CREATE list is explicitly approved.
- For MERGE_AS_ALIAS, add a proper aliases field or alias table before changing records.
- For ALREADY_EXISTS, improve the matched record metadata rather than inserting another recipe.

