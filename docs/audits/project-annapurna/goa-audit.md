# Project Annapurna - Goa Audit

## 1. Executive Summary

Audited active recipes associated with Goa, Goan cuisine, Goa-only Konkan references, Catholic Goan food and Saraswat-style Goan cooking.

- Goa-associated recipes audited: 9 generated / 13 mobile mirror
- Approved renames: 0
- Approved metadata / alias updates: 6
- Approved additions: 11
- Recipe fixes required: 1
- Needs local review: 3
- Rejected / do not implement: 4

Goa has a strong identity but the database was thin outside fish curry, prawn balchao and festive sweets. Beta 3 should not rename generic curries as Goan. The safe path is to keep existing authentic Goa rows, strengthen metadata, and add distinct gold-list dishes whose identity is not ambiguous: xacuti, cafreal, sorpotel, rava fish fry, khatkhate, choris pav and core Goan desserts.

## 2. Existing Goa Recipes

| Current Recipe Name | Category | Ingredients | Quick Guide | Region Tags | Image | Status | Primary Name | English Subtitle | Aliases | Origin | Popular Across |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goan Fish Curry | Seafood / curry | fish; coconut; tamarind/kokum; chilli; onion | Grind coconut-chilli-tamarind; simmer fish gently. | Goa / Goan | /assets/images/dishes/expansion-pack-4-goan-fish-curry.png | ✅ KEEP | Goan Fish Curry | Goan coconut tamarind fish curry | Goan Fish Curry, Fish Curry Rice, Goan Fish Curry Rice | Goa | Goa, Konkan |
| Goan Prawn Balchao | Seafood | prawns; vinegar; onion; chilli; garlic | Cook onion-garlic, add vinegar-chilli masala, coat prawns. | Goa / Goan | /assets/images/dishes/lunch-default.png | ✅ KEEP | Goan Prawn Balchao | Tangy Goan prawn pickle-style masala | Goan Prawn Balchao, Prawn Balchao, Prawn Balchão | Goa | Goa, Konkan |
| Pork Vindaloo | Pork curry | pork; vinegar; garlic; ginger; dry chilli; spices | Marinate pork in vinegar-garlic-chilli masala and simmer. | Goa / Konkan / mobile mirror | /assets/images/dishes/pork-vindaloo-homestyle.png | ✅ KEEP | Pork Vindaloo | Goan vinegar chilli pork curry | Pork Vindaloo, Goan Pork Vindaloo, Vindaloo | Goa | Goa, Konkan |
| Beef Vindaloo | Beef curry | beef; vinegar; garlic; chilli; spices | Marinate in vinegar masala and simmer. | Goa / Konkan / mobile mirror | /assets/images/dishes/beef-vindaloo-homestyle.png | ✅ KEEP / DO_NOT_TOUCH_SENSITIVE | Beef Vindaloo | Goan beef vindaloo | Beef Vindaloo | Goa | Goa |
| Beef Xacuti | Beef curry | beef; roasted coconut; spices | Roast coconut-spice masala and simmer beef. | Goa / Konkan / mobile mirror | /assets/images/dishes/beef-xacuti-homestyle.png | ✅ KEEP / DO_NOT_TOUCH_SENSITIVE | Beef Xacuti | Goan beef xacuti | Beef Xacuti | Goa | Goa |
| Rose Cookies | Festive sweet | rice flour; maida; coconut milk; egg; sugar | Dip hot mould into batter and fry crisp. | Goan | /assets/images/collections/festival-food.webp | ✅ KEEP | Rose Cookies | Goan Christmas rose cookies | Rose Cookies, Rose Kokis, Goan Rose Cookies | Goa | Goa, Goan Catholic households |
| Kalkals | Festive sweet | maida; ghee; coconut milk; sugar | Shape curls, fry and glaze. | Goan | /assets/images/collections/festival-food.webp | ✅ KEEP | Kalkals | Goan Christmas curled sweets | Kalkals, Kulkuls, Goan Kalkals | Goa | Goa, Goan Catholic households |
| Marzipan | Festive sweet | almond/cashew powder; sugar; rose water | Mix, cook briefly if needed, shape in moulds. | Goan | /assets/images/collections/festival-food.webp | ✅ KEEP | Marzipan | Goan festive nut sweet | Marzipan, Goan Marzipan, Cashew Marzipan | Goa | Goa, Goan Catholic households |
| Kokum Sharbat | Drink | kokum syrup; water; black salt; cumin | Mix chilled kokum drink. | Konkani / Konkan | /assets/images/dishes/batch4-kokum-sharbat.png | ✅ KEEP_GENERIC | Kokum Sharbat | Kokum cooler | Kokum Sherbet | Konkan | Maharashtra, Goa, Konkan |
| Malvani Chicken | Chicken curry | chicken; coconut; Malvani masala; kokum | Distinct Maharashtra Konkan dish. | Maharashtra / Konkan | placeholder | ❌ WRONG_ASSOCIATION_FOR_GOA | Malvani Chicken | Konkan coconut chicken curry | Malvani Chicken | Malvan, Maharashtra | Maharashtra, Konkan |
| Kolambi Bhaat | Seafood rice | prawns; rice; coconut; goda/coastal masala | Distinct Maharashtra prawn rice. | Maharashtra / Konkan | placeholder | ❌ WRONG_ASSOCIATION_FOR_GOA | Kolambi Bhaat | Maharashtrian prawn rice | Kolambi Bhaat | Maharashtra | Maharashtra, Konkan |

## 3. Safe Renames

No safe renames approved for Beta 3.

Reason: existing Goa canonical names are already recognizable. The strongest action is to keep them and add metadata/aliases. Prawn Balchao could be accented as Balchão later, but ASCII spelling remains safer for Beta 3 search compatibility.

## 4. Recipe Fix Required

| Recipe | Decision | Confidence | Reason |
|---|---|---:|---|
| Pork Curry | 🛠 RECIPE_FIX_REQUIRED / DO_NOT_IMPLEMENT | 0.52 | Mobile mirror has one Goa pork curry row and one Northeast pork curry row sharing title collisions. Do not regionalize or touch in Goa pass beyond leaving existing sensitive rows alone. |

## 5. Missing Gold Recipes

| Gold Dish | Current Coverage | Final Decision | Confidence | Implementation |
|---|---|---|---:|---|
| Goan Prawn Curry Rice | Missing; prawn balchao exists but is a different vinegar masala | 🟢 APPROVED | 0.88 | Add distinct curry-rice recipe. |
| Chicken Xacuti | Missing; beef xacuti exists only in mobile mirror | 🟢 APPROVED | 0.92 | Add distinct chicken xacuti. |
| Chicken Cafreal | Missing | 🟢 APPROVED | 0.92 | Add distinct green masala chicken. |
| Pork Vindaloo | Exists in mobile mirror | 🟢 APPROVED_KEEP | 0.90 | Metadata only where present; do not duplicate. |
| Sorpotel | Missing | 🟢 APPROVED | 0.88 | Add distinct festive Goan pork dish. |
| Rava Fried Fish | Missing | 🟢 APPROVED | 0.86 | Add distinct rava-crusted Goan fish fry. |
| Goan Fish Curry | Exists | 🟢 APPROVED_KEEP | 0.90 | Metadata only. |
| Goan Prawn Balchao / Prawn Balchão | Exists | 🟢 APPROVED_KEEP | 0.88 | Metadata and alias only. |
| Mushroom Xacuti | Missing | 🟢 APPROVED | 0.84 | Add vegetarian xacuti. |
| Khatkhate | Missing | 🟢 APPROVED | 0.86 | Add Saraswat-style mixed vegetable stew. |
| Goan Choris Pav | Missing | 🟢 APPROVED | 0.84 | Add compact snack recipe. |
| Bebinca | Missing | 🟢 APPROVED | 0.94 | Add iconic Goan dessert. |
| Doce | Missing | 🟢 APPROVED | 0.84 | Add Goan festive sweet. |
| Serradura | Missing | 🟢 APPROVED | 0.78 | Add; recognizable Goan dessert though Portuguese-influenced. |

## 6. Wrong Associations / Rejections

| Proposal | Decision | Reason |
|---|---|---|
| Treat all Konkan recipes as Goa | 🔴 REJECT | Konkan includes Maharashtra and Karnataka coastal cuisines; only Goa-specific rows should enter Goa set. |
| Rename Malvani Chicken as Goan | 🔴 REJECT | Malvani is Maharashtra/Konkan, not Goa. |
| Rename Kolambi Bhaat as Goan prawn rice | 🔴 REJECT | Existing row is Maharashtrian and should stay there. |
| Rename generic fish curry or chicken curry as Goan | 🔴 REJECT | Only distinct coconut-tamarind fish curry, xacuti, cafreal, vindaloo etc. should carry Goa identity. |

## 7. Final Validation

### Approved Renames

None.

### Approved Metadata / Alias Updates

| Recipe | Confidence |
|---|---:|
| Goan Fish Curry | 0.90 |
| Goan Prawn Balchao | 0.88 |
| Pork Vindaloo | 0.90 |
| Rose Cookies | 0.82 |
| Kalkals | 0.82 |
| Marzipan | 0.76 |

### Approved New Dishes

| Dish | Category | Confidence |
|---|---|---:|
| Goan Prawn Curry Rice | Rice / seafood | 0.88 |
| Chicken Xacuti | Chicken curry | 0.92 |
| Chicken Cafreal | Chicken | 0.92 |
| Sorpotel | Pork curry | 0.88 |
| Rava Fried Fish | Seafood | 0.86 |
| Mushroom Xacuti | Vegetarian curry | 0.84 |
| Khatkhate | Vegetarian stew | 0.86 |
| Goan Choris Pav | Snack | 0.84 |
| Bebinca | Dessert | 0.94 |
| Doce | Dessert | 0.84 |
| Serradura | Dessert | 0.78 |

### Needs Local Review

- Sol Kadhi as Goa vs broader Konkan ownership.
- Beef Vindaloo / Beef Xacuti metadata pass; keep existing mobile rows untouched for now.
- Prawn Balchao accented canonical spelling Balchão; keep ASCII title for Beta 3.

### Rejected

- Goa ownership for Malvani Chicken.
- Goa ownership for Kolambi Bhaat.
- Generic curry-to-Goa renames.
- Broad Konkan equals Goa assumption.

## 8. Beta 3 Safe Implementation

Implemented immediately:

1. Metadata/alias updates for existing Goan records.
2. Add Goan Prawn Curry Rice.
3. Add Chicken Xacuti.
4. Add Chicken Cafreal.
5. Add Sorpotel.
6. Add Rava Fried Fish.
7. Add Mushroom Xacuti.
8. Add Khatkhate.
9. Add Goan Choris Pav.
10. Add Bebinca.
11. Add Doce.
12. Add Serradura.

Do not implement yellow/red items.
