# Dietary Foundation Audit

Status: Audit only. No recipe data was modified.

Scope reviewed:

- `database/generated/recipes.json`
- `local-recipes.js`
- `frontend/local-recipes.js`

The two local recipe mirrors match the generated database exactly.

## 1. Recommended Dietary Tags Schema

Use an optional array on each dish:

```json
{
  "dietaryTags": [
    "vegetarian",
    "egg",
    "non_vegetarian",
    "no_onion_no_garlic",
    "jain"
  ]
}
```

Recommended interpretation:

- `vegetarian`: no meat, fish, egg, pork, or mutton. Dairy and paneer are allowed.
- `egg`: contains egg. This can coexist with `non_vegetarian` if the product decides egg is outside vegetarian filtering.
- `non_vegetarian`: contains chicken, fish, seafood, mutton/minced meat, pork, or other meat.
- `no_onion_no_garlic`: can be prepared without onion and garlic based on the dish identity and current ingredient metadata.
- `jain`: stricter than no onion/no garlic; excludes root vegetables such as potato, carrot, radish, ginger, beetroot, and similar roots/tubers.

Important: Jain is not the same as no onion/no garlic. Aloo Paratha can be a NONG candidate, but should not be tagged Jain unless a non-root Jain variant exists.

## 2. Counts By Dietary Category

| Category | Count | Notes |
| Vegetarian | 148 | Derived from non-meat metadata and absence of egg/meat signals |
| Egg dishes | 21 | Includes egg-only and mixed egg dishes |
| Egg-only dishes | 19 | Egg dishes without chicken/fish/mutton/pork signals |
| Chicken dishes | 30 | Includes chicken curry/fry/rice variants |
| Fish/seafood dishes | 15 | Includes fish and prawn dishes |
| Mutton/minced-meat dishes | 5 | Includes mutton, Laal Maas, Keema, and Kheema signals |
| Pork dishes | 4 | Includes pork dishes |
| Soy/Tofu dishes | 12 | Vegetarian protein subgroup |
| Non-vegetarian total | 83 | Egg plus meat/seafood groups |
| Unknown dietary type | 0 | All dishes were classifiable by current metadata/signals |

Raw `dietType` distribution:

- eggetarian: 1
- non-vegetarian: 75
- vegetarian: 155

## 3. Category Lists

### Clearly Vegetarian Dishes

- Akki Roti
- Aloo Jeera
- Aloo Paratha
- Aloo Pitika
- Aloo Posto
- Andhra Podi Idli
- Appam
- Apple Puree
- Avalakki
- Avial
- Baingan Bharta
- Batata Poha
- Beans Thoran
- Begun Bhaja
- Besan Chilla
- Bisibelebath
- Bonda
- Bread Pakora
- Bread Upma
- Chaat
- Cheese Dosa
- Cheese Paratha
- Cheese Uttapam
- Chilli Mushroom
- Chilli Paneer
- Chole Chawal
- Coconut Rice
- Corn Chaat
- Corn Paneer Bhurji Bowl
- Curd Rice
- Dal Makhani
- Dal Roti
- Dalma
- Dhokar Dalna
- Dhokla
- Dosa
- Garlic Paneer Roti Wrap
- Ghee Rice
- Ghugni
- Gujiya
- Gunpowder Idli
- Handvo
- Idli
- Instant Rava Upma
- Kaaram Dosa
- Kachori
- Kada Prasad
- Kadai Paneer
- Kadala Curry
- Kadhi Chawal
- Kadhi Pakora
- Khichdi
- Kolhapuri Misal Pav
- Kosambari
- Ladoo
- Lai Xaak Bhaji
- Lemon Rice
- Lemon Sevai
- Litti Chokha
- Maddur Vada
- Mangalore Buns
- Manipuri Chamthong
- Masala Chai
- Masala Dosa
- Mashed Banana
- Matar Paneer
- Mathri
- Matki Usal
- Methi Paratha
- Methi Thepla
- Mirapakaya Bajji
- Mirchi Bajji
- Mirchi Ka Salan
- Mochar Ghonto
- Modak
- Mooli Paratha
- Moong Dal Vegetable Khichdi
- Mushroom Pepper Rice Bowl
- Mushroom Pulao
- Naga Galho
- Neer Dosa
- Oats Porridge
- One Pot Dal Palak Rice
- Onion Dosa
- Onion Paratha
- Onion Rice
- Onion Uttapam
- Pakhala Bhata
- Pakora
- Palak Paneer
- Palak Paratha
- Paneer Bhurji
- Paneer Capsicum Rice Bowl
- Paneer Corn Rice Bowl
- Paneer Dosa
- Paneer Fried Rice
- Paneer Mushroom Masala
- Paneer Pakora
- Paneer Paratha
- Paneer Pulao
- Paneer Sandwich
- Paneer Tikka
- Paneer Tikka Masala
- Patra
- Peanut Rice
- Peanut Sundal
- Peas Pulao
- Pepper Rasam
- Pesarattu
- Pitha
- Plain Chapati
- Plum Cake
- Poha
- Pongal
- Puliyogare
- Ragi Porridge
- Rasam Rice
- Rice Porridge
- Sabudana Khichdi
- Sambar Rice
- Samosa
- Schezwan Fried Rice
- Set Dosa
- Shukto
- Soft Idli
- Sol Kadhi
- Soya Chunks Curry
- Spicy Aloo Paratha
- Spicy Masala Dosa
- Sprouts Usal
- Stuffed Paratha
- Sundal
- Sweet Holige
- Sweet Pongal
- Sweet Rice
- Tofu Bhurji
- Tomato Paneer Rice
- Tomato Rice
- Tomato Uttapam
- Upma
- Veg Fried Rice
- Veg Pulao
- Veg Sandwich
- Vegetable Puree
- Vegetable Soup
- Vegetable Stew
- Vegetable Uttapam
- Wheat Dosa

### Egg Dishes

- Andhra Egg Fry
- Bread Omelette
- Cheese Omelette
- Chicken Egg Rice Bowl
- Chicken Fried Rice
- Egg Bhurji
- Egg Capsicum Bhurji
- Egg Curry
- Egg Curry Rice
- Egg Dosa
- Egg Fried Rice
- Egg Paratha
- Egg Toast
- Egg Tomato Rice Bowl
- Garlic Egg Rice
- Kerala Egg Roast
- Masala Omelette
- Mushroom Omelette
- Onion Omelette
- Spanish Omelette
- Tomato Omelette

### Chicken Dishes

- Andhra Chicken Curry
- Andhra Kodi Vepudu
- Biryani
- Butter Chicken
- Chicken 555
- Chicken 65
- Chicken Capsicum Stir Fry Bowl
- Chicken Chettinad
- Chicken Curry
- Chicken Egg Rice Bowl
- Chicken Fried Rice
- Chicken Majestic
- Chicken Mushroom Stir Fry
- Chicken Pepper Rice Bowl
- Chicken Potato Curry
- Chicken Pulao
- Chicken Rice
- Chicken Roll
- Chicken Stew
- Chicken Sukka
- Chicken Tomato Rice
- Chilli Chicken
- Dragon Chicken
- Garlic Chicken
- Guntur Chicken Fry
- Guntur Chilli Chicken
- Kolhapuri Chicken
- Kori Rotti
- Madras Curry
- Nattu Kozhi Curry

### Fish / Seafood Dishes

- Chingri Malai Curry
- Chingudi Chhecha
- Fish Curry
- Fish Curry Rice
- Fish Fry
- Fish Pakora
- Goan Fish Curry
- Goan Prawn Balchao
- Kerala Fish Curry
- Macher Jhol
- Manipuri Eromba
- Masor Tenga
- Meen Pollichathu
- Prawn Ghee Roast
- Prawn Sukka

### Mutton / Minced-Meat Dishes

- Gongura Mutton
- Keema Fry
- Kheema Pav
- Laal Maas
- Mutton Pulao

### Pork Dishes

- Bamboo Shoot Pork
- Jadoh
- Pork Curry
- Smoked Pork Rice

### Soy / Tofu Dishes

- Chicken Egg Rice Bowl
- Chicken Fried Rice
- Chicken Mushroom Stir Fry
- Chilli Chicken
- Chilli Paneer
- Egg Fried Rice
- Garlic Chicken
- Garlic Egg Rice
- Paneer Fried Rice
- Soya Chunks Curry
- Tofu Bhurji
- Veg Fried Rice

## 4. Approximate No Onion No Garlic Candidates

Approximate NONG candidates found: 76

These are heuristic candidates and should be reviewed before tagging. Some may normally use onion/garlic in specific households even if the current metadata does not require them.

- Aloo Jeera
- Aloo Posto
- Andhra Podi Idli
- Appam
- Apple Puree
- Avial
- Beans Thoran
- Begun Bhaja
- Bisibelebath
- Bonda
- Bread Pakora
- Chaat
- Cheese Paratha
- Chilli Paneer
- Coconut Rice
- Curd Rice
- Dal Makhani
- Dalma
- Dhokar Dalna
- Dhokla
- Dosa
- Gujiya
- Handvo
- Idli
- Kachori
- Kada Prasad
- Kadhi Chawal
- Khichdi
- Kosambari
- Ladoo
- Lemon Rice
- Litti Chokha
- Mangalore Buns
- Masala Chai
- Mashed Banana
- Mathri
- Methi Paratha
- Methi Thepla
- Mirchi Bajji
- Mirchi Ka Salan
- Mochar Ghonto
- Modak
- Mooli Paratha
- Moong Dal Vegetable Khichdi
- Neer Dosa
- Oats Porridge
- Pakhala Bhata
- Pakora
- Palak Paratha
- Paneer Pakora
- Paneer Tikka
- Patra
- Peanut Rice
- Pepper Rasam
- Pitha
- Plain Chapati
- Plum Cake
- Pongal
- Puliyogare
- Ragi Porridge
- Rasam Rice
- Rice Porridge
- Sabudana Khichdi
- Sambar Rice
- Samosa
- Set Dosa
- Shukto
- Soft Idli
- Spicy Aloo Paratha
- Stuffed Paratha
- Sundal
- Sweet Holige
- Sweet Pongal
- Sweet Rice
- Tomato Rice
- Vegetable Puree

## 5. Approximate Jain Candidates

Approximate Jain candidates found: 22

These avoid obvious onion, garlic, and root vegetable signals in current metadata/title checks. Manual review is still required for regional recipes, spice mixes, and household variants.

- Andhra Podi Idli
- Appam
- Coconut Rice
- Curd Rice
- Dhokla
- Dosa
- Handvo
- Idli
- Khichdi
- Kosambari
- Lemon Rice
- Moong Dal Vegetable Khichdi
- Neer Dosa
- Oats Porridge
- Pongal
- Ragi Porridge
- Rice Porridge
- Sabudana Khichdi
- Set Dosa
- Soft Idli
- Sweet Pongal
- Sweet Rice

## 6. NONG But Not Jain Candidates

These are likely no-onion/no-garlic candidates but should not automatically receive `jain` because they include or imply root vegetables/tubers.

- Aloo Jeera
- Aloo Posto
- Bonda
- Chaat
- Dalma
- Dhokar Dalna
- Litti Chokha
- Masala Chai
- Mochar Ghonto
- Mooli Paratha
- Pakora
- Palak Paratha
- Patra
- Samosa
- Shukto
- Spicy Aloo Paratha
- Stuffed Paratha
- Vegetable Puree

## 7. Jain Review Queue

These may be Jain-compatible in some variants, but need manual confirmation because their identity or regional preparation can vary.

- Avial
- Beans Thoran
- Bread Pakora
- Cheese Paratha
- Dal Makhani
- Kadhi Chawal
- Ladoo
- Methi Paratha
- Mirchi Bajji
- Modak
- Paneer Pakora
- Peanut Rice
- Pepper Rasam
- Pitha
- Rasam Rice
- Sambar Rice
- Sundal
- Sweet Holige
- Tomato Rice

## 8. Potential Implementation Risks

- Current metadata has `dietType`, tags, ingredient roles, and title signals, but no explicit dietary guarantee field yet.
- Egg classification is product-sensitive: some users consider egg vegetarian, others do not. The model should keep `egg` separate from `vegetarian` so filters can be configured later.
- NONG tagging cannot rely only on current ingredient lists because some generic instructions mention onion/garlic while core metadata may not.
- Jain tagging is stricter and must avoid root vegetables. Potato-heavy dishes should not be auto-tagged Jain.
- Regional names may hide onion/garlic/root usage. Example: khichdi, pongal, dosa, and rice dishes can have many household variants.
- Optional ingredients need careful handling. A dish with optional onion should be `no_onion_no_garlic_possible`, but the requested schema only has `no_onion_no_garlic`.
- Existing recommendations should not change until tags are validated and filter behavior is designed.

## 9. Recommended Rollout Plan

1. Add helper-only support for optional `dietaryTags` with safe normalization.
2. Backfill obvious base tags first: `vegetarian`, `egg`, and `non_vegetarian`.
3. Run a manual review pass for NONG and Jain tags. Treat Jain as opt-in, not inferred broadly.
4. Add a validation script that checks contradictions such as `jain` plus potato/root ingredients, or `vegetarian` plus chicken/fish/mutton/pork.
5. Keep UI and recommendation scoring unchanged until tag quality is stable.
6. Later, expose filters as user preferences and analytics dimensions, not as hard recommendation changes by default.

## 10. Recommended Initial Tagging Strategy

- Safe automatic tags: `vegetarian`, `egg`, and `non_vegetarian`.
- Semi-automatic with review: `no_onion_no_garlic`.
- Manual-only at first: `jain`.

This keeps the dietary foundation useful without accidentally overpromising dietary suitability.
