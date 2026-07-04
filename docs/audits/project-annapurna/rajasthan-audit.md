# Project Annapurna - Rajasthan Audit

## 1. Executive Summary

Audited active recipes associated with Rajasthan, Rajasthani cuisine, Marwar, Mewar, Shekhawati, Jaipur, Jodhpur and Udaipur.

- Rajasthan-associated recipes audited: 5 direct/shared rows plus 3 generic North India context rows
- Approved renames: 0
- Approved metadata / alias updates: 3
- Approved additions: 17
- Recipe fixes required: 1
- Needs local review: 3
- Rejected / do not implement: 4

Rajasthan coverage was thin: Laal Maas is the only strong savory anchor, with Malpua and Moong Dal Halwa present as shared sweets. The safe Beta 3 path is to add distinct iconic dishes rather than relabel generic North Indian recipes.

## 2. Existing Rajasthan Recipes

| Current Recipe Name | Category | Ingredients | Quick Guide | Region Tags | Image | Status | Primary Name | English Subtitle | Aliases | Origin | Popular Across |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Laal Maas | Mutton curry | mutton; Mathania chilli; curd; garlic | Red chilli paste, mutton, curd, slow cook. | Rajasthan / Rajasthani | /assets/images/dishes/laal-maas.png | ✅ KEEP | Laal Maas | Rajasthani red mutton curry | Laal Maas, Lal Maas, Rajasthani Laal Maas | Rajasthan | Rajasthan, North India |
| Malpua | Dessert | maida; semolina; milk; sugar; fennel; ghee | Batter, rest, fry, dip in syrup. | North India / shared | /assets/images/collections/desserts.webp | ✅ KEEP_SHARED | Malpua | North Indian festive fried pancake | Malpua, Rajasthani Malpua | Rajasthan / North India | Rajasthan, North India |
| Moong Dal Halwa | Dessert | moong dal; ghee; milk; sugar; cardamom | Roast dal paste in ghee, add milk and sugar. | Rajasthani / North India | /assets/images/collections/desserts.webp | ✅ KEEP_SHARED | Moong Dal Halwa | Rajasthani-style moong dal sweet | Moong Dal Halwa, Rajasthani Moong Dal Halwa | Rajasthan / North India | Rajasthan, North India |
| Kachori | Snack | maida; moong dal | Generic dal kachori. | Rajasthan / Uttar Pradesh | /assets/images/dishes/batch4-kachori.png | ✅ KEEP_GENERIC | Kachori | North Indian dal kachori | Kachori | North India | Rajasthan, Uttar Pradesh |
| Kadhi Chawal | Main | besan; curd; rice | Generic kadhi-rice. | Punjab / Rajasthan / Gujarat | /assets/images/dishes/batch3a-kadhi-chawal.png | ✅ KEEP_GENERIC | Kadhi Chawal | Kadhi rice | Kadhi Chawal | North India | North India |
| Mathri | Snack | wheat; methi | Generic North Indian mathri. | Rajasthan / North India | /assets/images/dishes/batch4-mathri.png | ✅ KEEP_GENERIC | Mathri | North Indian crisp snack | Mathri | North India | Rajasthan, North India |

## 3. Safe Renames

No safe renames approved for Beta 3.

Reason: generic Kachori, Kadhi Chawal and Mathri have shared North Indian identities. Laal Maas already has the correct canonical name.

## 4. Recipe Fix Required

| Recipe | Decision | Confidence | Reason |
|---|---|---:|---|
| Kachori | 🛠 RECIPE_FIX_REQUIRED | 0.60 | Current row is broad dal kachori. Add Pyaaz Kachori and Mawa Kachori separately rather than renaming. |

## 5. Missing Gold Recipes

Implemented approved additions: Pyaaz Kachori, Mirchi Vada, Bajra Khichdi, Dal Baati Churma, Gatte Ki Sabzi, Ker Sangri, Panchmel Dal, Papad Ki Sabzi, Aloo Pyaz Sabzi, Govind Gatta, Methi Bajra Khichdi, Jungli Maas, Safed Maas, Bikaneri Bhujia, Mawa Kachori, Ghevar, Churma.

## 6. Wrong Associations / Rejections

| Proposal | Decision | Reason |
|---|---|---|
| Rename generic Kachori to Pyaaz Kachori | 🔴 REJECT | Generic row uses moong dal, not onion filling. |
| Rename Kadhi Chawal to Rajasthani Kadhi | 🔴 REJECT | Current row is shared North Indian kadhi-rice. |
| Treat Mathri as Rajasthan-only | 🔴 REJECT | Shared North Indian snack; no need to regionalize now. |
| Add a duplicate Laal Maas | 🔴 REJECT | Existing Laal Maas is already the canonical recipe. |

## 7. Final Validation

### Approved Renames

None.

### Approved Metadata / Alias Updates

Laal Maas, Malpua, Moong Dal Halwa.

### Approved New Dishes

Pyaaz Kachori, Mirchi Vada, Bajra Khichdi, Dal Baati Churma, Gatte Ki Sabzi, Ker Sangri, Panchmel Dal, Papad Ki Sabzi, Aloo Pyaz Sabzi, Govind Gatta, Methi Bajra Khichdi, Jungli Maas, Safed Maas, Bikaneri Bhujia, Mawa Kachori, Ghevar, Churma.

### Needs Local Review

- Mewar/Marwar-specific ownership notes for royal meat dishes.
- Whether Malpua should get a Pushkar/Rajasthan-specific variant later.
- Whether Mathri needs a Rajasthan-specific version or should remain North Indian.

### Rejected

- Rename generic Kachori to Pyaaz Kachori.
- Rename Kadhi Chawal to Rajasthani Kadhi.
- Treat Mathri as Rajasthan-only.
- Add duplicate Laal Maas.

## 8. Beta 3 Safe Implementation

Implemented immediately:

1. Metadata/alias updates for existing approved Rajasthan/shared records.
2. Add 17 distinct Rajasthan recipes from the gold list.

Do not implement yellow/red items.
