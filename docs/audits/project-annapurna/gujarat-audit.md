# Project Annapurna - Gujarat Audit

## 1. Executive Summary

Audited active recipes associated with Gujarat, Gujarati cuisine, Kathiawad, Surat/Surati, Kutch, Ahmedabad and Saurashtra.

- Gujarat-associated recipes audited: 9 canonical/format rows plus 3 shared-West context rows
- Approved renames: 0
- Approved metadata / alias updates: 8
- Approved additions: 14
- Recipe fixes required: 2
- Needs local review: 4
- Rejected / do not implement: 5

Gujarat already has a useful base: Dhokla, Gujarati Dal, Handvo, Khandvi, Methi Thepla, Patra and Thepla. The largest gaps are iconic shaak, rice/khichdi, farsan and sweets. Beta 3 should avoid renaming generic kadhi/khichdi or broad West India sweets unless the dish already matches Gujarati identity. The safe implementation path is to keep existing Gujarati recipes, strengthen aliases/metadata, and add distinct gold-list dishes.

## 2. Existing Gujarat Recipes

| Current Recipe Name | Category | Ingredients | Quick Guide | Region Tags | Image | Status | Primary Name | English Subtitle | Aliases | Origin | Popular Across |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dhokla | Breakfast / snack | besan; curd; eno; mustard; curry leaves | Mix batter, steam, temper. | Gujarat / Gujarati | /assets/images/dishes/batch4-dhokla.png | ✅ KEEP | Dhokla | Steamed Gujarati fermented snack | Dhokla, Gujarati Dhokla | Gujarat | Gujarat, Western India |
| Gujarati Dal | Dal / main | toor dal; jaggery; tamarind; peanuts; mustard; curry leaves | Cook dal, simmer sweet-tangy, temper. | Gujarat / Gujarati | /assets/images/dishes/batch4-gujarati-dal.png | ✅ KEEP | Gujarati Dal | Sweet-tangy Gujarati toor dal | Gujarati Dal, Gujju Dal | Gujarat | Gujarat |
| Handvo | Breakfast / main | dal batter; vegetables; curd; sesame; oil | Mix, temper, cook low until set. | Gujarat / Gujarati | /assets/images/dishes/batch4-handvo.png | ✅ KEEP | Handvo | Gujarati lentil vegetable cake | Handvo, Handva, Gujarati Handvo | Gujarat | Gujarat |
| Khandvi | Snack | besan; curd; mustard; coconut; coriander | Cook batter, spread thin, roll, temper. | Gujarat / Gujarati | /assets/images/dishes/khandvi.png | ✅ KEEP | Khandvi | Gujarati besan yogurt rolls | Khandvi, Dahivadi Khandvi, Gujarati Khandvi | Gujarat | Gujarat, Western India |
| Methi Thepla | Breakfast / flatbread | wheat flour; methi; curd; turmeric; oil | Knead, roll, cook with oil. | Gujarat / Gujarati | /assets/images/dishes/paratha.png | ✅ KEEP | Methi Thepla | Gujarati fenugreek flatbread | Methi Thepla, Methi Na Thepla | Gujarat | Gujarat, Western India |
| Patra | Snack | colocasia leaves; besan; tamarind; jaggery; sesame | Spread paste, roll, steam, slice, temper. | Gujarat / Gujarati | /assets/images/dishes/batch4-patra.png | ✅ KEEP | Patra | Gujarati colocasia leaf rolls | Patra, Patrode, Alu Vadi | Gujarat | Gujarat, Western India |
| Thepla | Breakfast / snack | wheat flour; methi leaves; curd; turmeric; ajwain | Knead, roll, roast thin. | Gujarat / Gujarati | /assets/images/dishes/thepla.png | 🛠 RECIPE_FIX_REQUIRED | Thepla | Gujarati travel flatbread | Thepla, Gujarati Thepla | Gujarat | Gujarat, Western India |
| Mini Dhokla | Lunchbox snack | besan; curd; eno; mustard; curry leaves | Mini steamed dhokla squares. | Gujarati | /assets/images/dishes/batch4-dhokla.png | ✅ KEEP_FORMAT_VARIANT | Mini Dhokla | Lunchbox dhokla bites | Mini Dhokla, Dhokla Bites | Gujarat | Gujarat |
| Shrikhand | Dessert | hung curd; sugar; cardamom; saffron | Generic dessert guide; currently Maharashtra-tagged. | Maharashtra / shared West India | /assets/images/collections/desserts.webp | ✅ KEEP_SHARED / DO_NOT_RETITLE | Shrikhand | Saffron-cardamom strained yogurt | Shrikhand | Maharashtra / Gujarat shared | Maharashtra, Gujarat |
| Basundi | Dessert | milk; sugar; cardamom; saffron | Generic dessert guide; currently Maharashtra-tagged. | Maharashtra / shared West India | /assets/images/collections/desserts.webp | 🟡 NEEDS_LOCAL_REVIEW | Basundi | Sweet reduced milk | Basundi | Gujarat / Maharashtra shared | Gujarat, Maharashtra |
| Kadhi Chawal | Main / rice | besan; curd; rice | North Indian kadhi-rice method. | Punjab / Rajasthan / Gujarat | /assets/images/dishes/batch3a-kadhi-chawal.png | ✅ KEEP_GENERIC | Kadhi Chawal | Kadhi rice | Kadhi Chawal | North / West India | North India, Gujarat, Rajasthan |

## 3. Safe Renames

No safe renames approved for Beta 3.

Reason: current Gujarati canonical titles are already recognizable or too generic to regionalize safely. Thepla needs a content fix rather than a rename because the current row overlaps with Methi Thepla.

## 4. Recipe Fix Required

| Recipe | Decision | Confidence | Reason |
|---|---|---:|---|
| Thepla | 🛠 RECIPE_FIX_REQUIRED | 0.76 | Current recipe includes methi leaves, making it overlap with Methi Thepla. Keep for now; later make it plain/masala thepla or keep Methi Thepla as canonical. |
| Dhokla | 🛠 RECIPE_FIX_REQUIRED | 0.62 | Current besan/curd/eno row resembles khaman. Keep generic Dhokla for Beta 3 and add Khaman separately. |

## 5. Missing Gold Recipes

Implemented approved additions: Khaman, Fafda, Sev Khamani, Undhiyu, Sev Tameta, Ringan No Olo, Lasaniya Bataka, Bhindi Sambhariya, Vaghareli Khichdi, Khichdi Kadhi, Lilva Kachori, Khakhra, Mohanthal, Sukhdi.

## 6. Wrong Associations / Rejections

| Proposal | Decision | Reason |
|---|---|---|
| Rename Kadhi Chawal to Gujarati Kadhi | 🔴 REJECT | Current row is North Indian/shared; Gujarati kadhi needs a distinct sweet-tangy method. |
| Rename generic Khichdi to Vaghareli Khichdi | 🔴 REJECT | Needs tempering and Gujarati profile; add distinct recipe instead. |
| Treat Shrikhand as Gujarat-only | 🔴 REJECT | Shared with Maharashtra; do not break existing Maharashtra metadata. |
| Add Thepla duplicate while title exists | 🔴 REJECT | The existing title must be fixed later rather than duplicated. |
| Treat every West India sweet as Gujarati | 🔴 REJECT | Only implement strong Gujarati identities. |

## 7. Final Validation

### Approved Renames

None.

### Approved Metadata / Alias Updates

Dhokla, Gujarati Dal, Handvo, Khandvi, Methi Thepla, Patra, Thepla, Mini Dhokla.

### Approved New Dishes

Khaman, Fafda, Sev Khamani, Undhiyu, Sev Tameta, Ringan No Olo, Lasaniya Bataka, Bhindi Sambhariya, Vaghareli Khichdi, Khichdi Kadhi, Lilva Kachori, Khakhra, Mohanthal, Sukhdi.

### Needs Local Review

- Basundi as a Gujarat/Maharashtra shared canonical treatment.
- Gujarati Kadhi as distinct from broad Kadhi Chawal.
- Plain Thepla vs Methi Thepla cleanup.
- True Dhokla family taxonomy beyond Khaman.

### Rejected

- Rename Kadhi Chawal to Gujarati Kadhi.
- Rename generic khichdi to Vaghareli Khichdi.
- Treat Shrikhand as Gujarat-only.
- Duplicate Thepla with the same title.
- Broad West India sweet-to-Gujarat ownership.

## 8. Beta 3 Safe Implementation

Implemented immediately:

1. Metadata/alias updates for existing approved Gujarati records.
2. Add Khaman.
3. Add Fafda.
4. Add Sev Khamani.
5. Add Undhiyu.
6. Add Sev Tameta.
7. Add Ringan No Olo.
8. Add Lasaniya Bataka.
9. Add Bhindi Sambhariya.
10. Add Vaghareli Khichdi.
11. Add Khichdi Kadhi.
12. Add Lilva Kachori.
13. Add Khakhra.
14. Add Mohanthal.
15. Add Sukhdi.

Do not implement yellow/red items.
