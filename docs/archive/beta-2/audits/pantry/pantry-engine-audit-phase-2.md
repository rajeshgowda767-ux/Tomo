# Pantry Engine Audit Phase 2

Generated: 2026-06-12T08:47:20.040Z

Scope: audit only. No UI, mood engine, collections, journal, desktop, recipe data, or pantry engine files were modified.

## Executive Summary

Phase 1 produced 72 LOW CONFIDENCE cases mainly because the active mobile pantry filter has no middle tier. For two selected ingredients it only keeps recipes where both selected ingredients are main recipe ingredients, plus a major-protein guard. That prevents trust failures, but it also hides good Tier 2 suggestions and useful Tier 3 unlock suggestions.

The second major issue is ingredient role modeling. Flat secondary ingredient fields are added to the active engine as required when they are not already present in the structured ingredient array. That can over-count missing/grocery items such as soy sauce, coriander, red chilli, oil, spring onion, garlic, and garnish/flavor items.

## Audit Totals

| Area | Count |
| --- | ---: |
| Recipes audited | 165 |
| Secondary field ingredients added as required by active helper | 108 |
| Secondary field ingredients likely optional/flavor but currently required when added | 91 |
| Recipes with explicit flavor/garnish/cooking-fat roles | 82 |
| Problem pairs re-audited | 12 |
| Problem pairs that should become Tier 1/Tier 2 | 7 |
| Problem pairs that are only Tier 3 unlock candidates | 5 |
| Problem pairs that should remain No Match | 0 |

## Why LOW CONFIDENCE Is High

1. The strong-match gate requires both selected ingredients to be primary/main for two-ingredient selections. This blocks useful dishes where one ingredient is secondary but still meaningful, such as onion or garlic context.
2. The major-protein protection is correct, but non-protein ingredients need softer tiers instead of disappearing entirely.
3. Secondary fields are overloaded: some are real dish-building ingredients, some are flavor bases, and some are optional/garnish.
4. Missing ingredient lists become inflated when optional/flavor items are counted as required.
5. Alias coverage is uneven. Chana should connect to Chole; broader dal/chickpea/bread aliases need cleanup.

## Audit-Only Match Tier Model

| Tier | Meaning |
| --- | --- |
| Tier 1 | All selected ingredients are used meaningfully as primary/required/real secondary ingredients. |
| Tier 2 | All selected ingredients are used, but at least one is secondary/optional/flavor-level. Good suggestion, softer confidence. |
| Tier 3 | One selected ingredient provides a reasonable unlock path, but this should not be the top strong match. |
| No Match | Selected ingredients are unrelated, or a selected major protein is ignored. |

## Re-Audited Problem Pairs

| Selected ingredients | Current strong top | Raw top | Audit top | Audit tier | Current missing | Audit missing | Role use | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Potato + Onion | No strong match | Masala Dosa | Masala Dosa | Tier 2 | N/A | Dosa Batter | Potato=primary; Onion=secondary-optional | Should become Tier 2/1 suggestion |
| Rice + Chana | No strong match | Chicken Fried Rice | Chole Chawal | Tier 1 | N/A | None | Rice=primary; Chana=primary | Should become Tier 2/1 suggestion |
| Rice + Garlic | No strong match | Chicken Fried Rice | Chicken Fried Rice | Tier 2 | N/A | Chicken | Rice=primary; Garlic=secondary-optional | Should become Tier 2/1 suggestion |
| Wheat + Tomato | No strong match | Spicy Aloo Paratha | Plain Chapati | Tier 3 | N/A | None | Wheat=primary; Tomato=unused | Possible Tier 3 unlock only |
| Bread + Garlic | No strong match | Bread Upma | Bread Omelette | Tier 3 | N/A | Egg | Bread=primary; Garlic=unused | Possible Tier 3 unlock only |
| Onion + Garlic | Guntur Chilli Chicken | Guntur Chilli Chicken | Veg Fried Rice | Tier 2 | Chicken | Rice | Onion=primary; Garlic=secondary-optional | Should become Tier 2/1 suggestion |
| Tomato + Corn | No strong match | Tomato Rice | Boiled Corn | Tier 3 | N/A | Chaat Masala | Tomato=unused; Corn=primary | Possible Tier 3 unlock only |
| Paneer + Potato | No strong match | Paneer Paratha | Paneer Paratha | Tier 2 | N/A | Wheat, Wheat Flour | Paneer=primary-optional; Potato=required | Should become Tier 2/1 suggestion |
| Egg + Garlic | No strong match | Andhra Egg Fry | Andhra Egg Fry | Tier 2 | N/A | Chilli | Egg=primary; Garlic=secondary-optional | Should become Tier 2/1 suggestion |
| Poha + Moong Dal | No strong match | Batata Poha | Avalakki | Tier 3 | N/A | Onion | Poha=primary; Moong Dal=unused | Possible Tier 3 unlock only |
| Moong Dal + Chana | No strong match | Sabudana Khichdi | Chole Chawal | Tier 3 | N/A | Rice | Moong Dal=unused; Chana=primary | Possible Tier 3 unlock only |
| Wheat + Fish | No strong match | Fish Pakora | Fish Pakora | Tier 1 | N/A | Besan | Wheat=secondary; Fish=primary | Should become Tier 2/1 suggestion |

## Pairs That Should Become Tier 2 / Tier 1

- **Potato + Onion** -> Masala Dosa (Tier 2). All selected ingredients are used, but at least one is secondary/optional/flavor-level
- **Rice + Chana** -> Chole Chawal (Tier 1). All selected ingredients are used meaningfully
- **Rice + Garlic** -> Chicken Fried Rice (Tier 2). All selected ingredients are used, but at least one is secondary/optional/flavor-level
- **Onion + Garlic** -> Veg Fried Rice (Tier 2). All selected ingredients are used, but at least one is secondary/optional/flavor-level
- **Paneer + Potato** -> Paneer Paratha (Tier 2). All selected ingredients are used, but at least one is secondary/optional/flavor-level
- **Egg + Garlic** -> Andhra Egg Fry (Tier 2). All selected ingredients are used, but at least one is secondary/optional/flavor-level
- **Wheat + Fish** -> Fish Pakora (Tier 1). All selected ingredients are used meaningfully

## Pairs That Should Remain No Match

- None

## Tier 3 Unlock Candidates

- **Wheat + Tomato** -> Plain Chapati. Use only as an unlock suggestion, not as a strong match.
- **Bread + Garlic** -> Bread Omelette. Use only as an unlock suggestion, not as a strong match.
- **Tomato + Corn** -> Boiled Corn. Use only as an unlock suggestion, not as a strong match.
- **Poha + Moong Dal** -> Avalakki. Use only as an unlock suggestion, not as a strong match.
- **Moong Dal + Chana** -> Chole Chawal. Use only as an unlock suggestion, not as a strong match.

## Ingredient Role Problems

The active helper has one especially important behavior: when a primary/secondary flat field is missing from the structured ingredient array, it adds that item as required: true. That is safe for primary ingredients, but too strict for many secondary ingredients.

### Examples of Optional/Flavor Items Over-Counted as Required

| Dish | Engine required ingredients | Audit core need | Secondary fields | Optional fields | Flavor/garnish roles |
| --- | --- | --- | --- | --- | --- |
| Egg Fried Rice | Rice, Egg, Onion, Garlic, Soy Sauce, Oil | Rice, Egg | Onion, Garlic, Soy Sauce, Spring Onion, Oil | onion, garlic, soy sauce, spring onion, oil, salt, spices | None |
| Egg Toast | Egg, Bread, Oil, Coriander | Egg, Bread | Curry Leaves, Mustard Seeds, Onion, Oil, Coriander | curry leaves, mustard seeds, onion, oil, salt, spices | Curry Leaves, Mustard Seeds, Onion |
| Spicy Aloo Paratha | Wheat Flour, Potato, Wheat, Red Chilli | Wheat, Potato, Wheat Flour | Red Chilli, Green Chilli, Ghee, Wheat Flour | green chilli, ghee, spices, coriander | Green Chilli, Ghee |
| Aloo Paratha | Wheat, Potato, Ghee | Wheat, Potato, Wheat Flour | Ghee | onion, spices, ghee, green chilli, coriander | None |
| Paneer Fried Rice | Rice, Paneer | Rice, Paneer | onion, garlic, soy sauce, spring onion, oil | onion, garlic, soy sauce, spring onion, oil, salt, spices | onion, garlic, soy sauce, spring onion, oil |
| Chicken Fried Rice | Rice, Chicken | Rice, Chicken | egg, garlic, soy sauce, spring onion, oil | egg, garlic, soy sauce, spring onion, oil, salt, spices | egg, garlic, soy sauce, spring onion, oil |

### Recipes Where Secondary Fields Look Optional/Flavor But Are Added Required

| Dish | Primary ingredients | Secondary added as required | Likely optional/flavor over-count |
| --- | --- | --- | --- |
| Aloo Paratha | Wheat, Potato | Ghee | Ghee |
| Andhra Egg Fry | Egg, Chilli | Ginger, Oil | Ginger, Oil |
| Andhra Kodi Vepudu | Chicken, Chilli | Ginger, Oil | Ginger, Oil |
| Avalakki | Poha, Onion | Peanut, Lemon, Curry Leaves | Lemon, Curry Leaves |
| Bread Omelette | Bread, Egg | Green Chilli | Green Chilli |
| Bread Upma | Bread, Onion | Oil, Coriander | Oil, Coriander |
| Chicken 555 | Chicken, Chilli | Ginger, Oil | Ginger, Oil |
| Chicken Curry | Chicken, Tomato | Onion, Red Chilli | Onion, Red Chilli |
| Chicken Majestic | Chicken, Curd | Ginger, Oil | Ginger, Oil |
| Chicken Sukka | Chicken, Coconut | Onion, Green Chilli | Onion, Green Chilli |
| Chilli Mushroom | Mushroom, Chilli | Ginger, Oil | Ginger, Oil |
| Coconut Rice | Rice, Coconut | Oil, Coriander | Oil, Coriander |
| Corn Chaat | Corn, Onion | Coriander | Coriander |
| Curd Rice | Rice, Curd | Mustard Seeds, Curry Leaves | Mustard Seeds, Curry Leaves |
| Dal Makhani | Black Urad Dal, Rajma | Butter | Butter |
| Dal Rice | Rice, Toor Dal | Ghee | Ghee |
| Dragon Chicken | Chicken, Chilli | Ginger, Oil | Ginger, Oil |
| Egg Bhurji | Egg, Onion | Green Chilli | Green Chilli |
| Egg Curry | Egg, Onion | Red Chilli | Red Chilli |
| Egg Toast | Egg, Bread | Oil, Coriander | Oil, Coriander |
| Fish Curry | Fish, Tomato | Onion | Onion |
| Guntur Chicken Fry | Chicken, Guntur Chilli | Ginger, Oil | Ginger, Oil |
| Instant Rava Upma | Rava, Onion | Oil, Coriander | Oil, Coriander |
| Khichdi | Rice, Moong Dal | Ghee | Ghee |
| Lemon Rice | Rice, Lemon | Mustard Seeds | Mustard Seeds |
| Lemon Sevai | Sevai, Lemon | Oil, Coriander | Oil, Coriander |
| Mirapakaya Bajji | Green Chilli, Besan | Ginger, Oil | Ginger, Oil |
| Paneer Paratha | Wheat, Paneer | Onion | Onion |
| Paneer Sandwich | Bread, Paneer | Onion, Coriander | Coriander |
| Peanut Sundal | Peanut, Coconut | Oil, Coriander | Oil, Coriander |
| Poha | Poha, Onion | Curry Leaves | Curry Leaves |
| Pongal | Rice, Moong Dal | Ghee, Black Pepper | Ghee |
| Pork Curry | Pork, Onion | Red Chilli | Red Chilli |
| Prawn Ghee Roast | Prawn, Ghee | Red Chilli | Red Chilli |
| Sabudana Khichdi | Sabudana, Peanut | Curry Leaves | Curry Leaves |
| Spicy Aloo Paratha | Wheat, Potato | Red Chilli | Red Chilli |
| Tomato Rice | Rice, Tomato | Oil, Coriander | Oil, Coriander |
| Veg Sandwich | Bread, Vegetables | Onion, Coriander | Coriander |
| Peas Pulao | Rice, Green Peas | ghee, mint | ghee, mint |
| Mushroom Pulao | Rice, Mushroom | whole spices, ghee | whole spices, ghee |

## Missing Ingredient Audit

- **Egg Fried Rice**: active missing list can include soy sauce/spring onion/oil as required. These are useful grocery suggestions, but should be optional helpers unless explicitly required.
- **Egg Toast**: coriander/oil can be counted as missing essentials. Coriander should not block confidence.
- **Aloo Paratha / Spicy Aloo Paratha**: red chilli/ghee should not reduce a wheat + potato match as heavily as missing potato or wheat.
- **Garlic/onion/tomato pairs**: often become LOW CONFIDENCE because they are flavor-base/context ingredients, even though they are useful unlock signals.
- **Duplicate prevention is structurally okay**, but semantic duplicates like chana/chole and peanuts/peanut still need alias cleanup.

## Top Over-Filtering Patterns

- Primary-only match filter hides useful Tier 2 dishes.
- Secondary-as-required inflates missing/grocery lists.
- There is no Tier 2 or Tier 3 presentation state, so the app jumps from strong match to no strong match.
- Major-protein guard is correct and should remain. Wheat + Fish should not become Egg Paratha; Fish Pakora is a valid audit suggestion because it uses fish and wheat.

## Recommended Engine Fixes For Later Phase

1. Add actual pantry tiers: Tier 1 strong, Tier 2 useful, Tier 3 unlock-only, No Match.
2. Keep the major-protein trust rule: never promote a dish that ignores a selected fish/chicken/egg/paneer/mutton protein.
3. Stop treating all added secondary fields as required. Derive required status from required_ingredients where available.
4. Split missing ingredients into Need and Nice to Have before sending items to Grocery.
5. Add semantic aliases: chana/chole/chickpea, peanut/peanuts, moong dal/mung dal, bread/toast, wheat/wheat flour/atta.
6. Let the suggestion panel show Tier 2 matches with softer confidence copy when no Tier 1 exists.
7. Keep Tier 3 out of the primary top suggestion; use it for copy like “Try adding Onion for Bread Upma.”

## Appendix: Recipe Role Inventory

| Dish | Primary ingredients | Secondary ingredients | Required list fields | Optional fields | Garnish/flavor/cooking-fat roles |
| --- | --- | --- | --- | --- | --- |
| Aloo Paratha | Wheat, Potato | Ghee | wheat flour, potato | onion, spices, ghee, green chilli, coriander | None |
| Andhra Chicken Curry | Chicken, Onion | Red Chilli, Curry Leaves | chicken, onion | red chilli, curry leaves, tomato, garlic, ginger, oil | Red Chilli, Curry Leaves |
| Andhra Egg Fry | Egg, Chilli | Onion, Curry Leaves, Garlic, Ginger, Oil | egg, chilli | onion, curry leaves, garlic, oil, salt, spices | Onion, Curry Leaves, Garlic |
| Andhra Kodi Vepudu | Chicken, Chilli | Onion, Curry Leaves, Garlic, Ginger, Oil | chicken, chilli | onion, curry leaves, garlic, tomato, ginger, oil | Onion, Curry Leaves, Garlic |
| Andhra Podi Idli | Idli Rice, Urad Dal | Podi, Ghee | idli batter, gunpowder | idli rice, urad dal, ghee, oil, curry leaves, chutney | Podi, Ghee |
| Apple Puree | Apple, Milk | None | apple, milk | oil, salt, spices | None |
| Avalakki | Poha, Onion | Peanut, Lemon, Curry Leaves | poha, onion | mustard seeds, curry leaves, green chilli, oil | None |
| Besan Chilla | Besan, Onion | Curd, Green Chilli | besan, onion | curd, green chilli, oil, salt, spices | green chilli |
| Biryani | Rice, Chicken | Onion, Mint | rice, chicken | oil, salt, spices | None |
| Bisibelebath | Rice, Toor Dal | Vegetables | rice, toor dal | vegetable mix, oil, salt, spices | None |
| Boiled Corn | Corn, Chaat Masala | None | corn, chaat masala | oil, salt, spices | None |
| Bonda | Potato, Besan | None | potato, besan | oil, salt, spices | None |
| Bread Omelette | Bread, Egg | Onion, Green Chilli | egg, bread | onion, pepper, oil, coriander | None |
| Bread Pakora | Bread, Besan | None | bread, besan | oil, salt, spices | None |
| Bread Upma | Bread, Onion | Curry Leaves, Mustard Seeds, Green Chilli, Oil, Coriander | bread, onion | curry leaves, mustard seeds, green chilli, oil | Curry Leaves, Mustard Seeds, Green Chilli |
| Butter Chicken | Chicken, Tomato | Butter | chicken, tomato | butter, onion, garlic, ginger, oil | None |
| Chaat | Potato, Wheat | None | potato, wheat flour | oil, salt, spices | None |
| Cheese Omelette | egg, cheese | onion, pepper, butter | egg, cheese | onion, pepper, butter, oil, coriander | onion, pepper, butter |
| Chicken 555 | Chicken, Chilli | Onion, Curry Leaves, Garlic, Ginger, Oil | chicken, chilli | onion, curry leaves, garlic, tomato, ginger, oil | Onion, Curry Leaves, Garlic |
| Chicken 65 | Chicken, Curd | Red Chilli, Curry Leaves | chicken, curd | red chilli, curry leaves, onion, tomato, garlic, ginger, oil | Red Chilli, Curry Leaves |
| Chicken Chettinad | Chicken, Coconut | Onion, Black Pepper | chicken, coconut | black pepper, onion, tomato, garlic, ginger, oil | Black Pepper, Coconut |
| Chicken Curry | Chicken, Tomato | Onion, Red Chilli | chicken, tomato | onion, garlic, ginger, oil | None |
| Chicken Fried Rice | rice, chicken | egg, garlic, soy sauce, spring onion, oil | rice, chicken | egg, garlic, soy sauce, spring onion, oil, salt, spices | egg, garlic, soy sauce, spring onion, oil |
| Chicken Majestic | Chicken, Curd | Onion, Curry Leaves, Garlic, Ginger, Oil | chicken, curd | onion, curry leaves, garlic, tomato, ginger, oil | Onion, Curry Leaves, Garlic |
| Chicken Pulao | Chicken, Rice | None | rice, chicken | oil, salt, spices | None |
| Chicken Rice | Chicken, Rice | Tomato | chicken, rice | tomato, oil, salt, spices | None |
| Chicken Roll | Chicken, Tomato | None | chicken, tomato | onion, garlic, ginger, oil | None |
| Chicken Stew | Chicken, Tomato | None | chicken, tomato | onion, garlic, ginger, oil | None |
| Chicken Sukka | Chicken, Coconut | Onion, Curry Leaves, Green Chilli | chicken, coconut | curry leaves, red chilli, onion, tomato, garlic, ginger, oil | Coconut, Curry Leaves, Red Chilli |
| Chilli Chicken | chicken, capsicum | onion, garlic, soy sauce, chilli sauce, oil | chicken, capsicum | onion, garlic, soy sauce, chilli sauce, oil, tomato, ginger | onion, garlic, soy sauce, chilli sauce, oil |
| Chilli Mushroom | Mushroom, Chilli | Onion, Curry Leaves, Garlic, Ginger, Oil | mushroom, chilli | onion, curry leaves, garlic, oil, salt, spices | Onion, Curry Leaves, Garlic |
| Chilli Paneer | Paneer, Capsicum | Green Chilli, Soy Sauce | paneer, capsicum | soy sauce, green chilli, oil, salt, spices | Soy Sauce, Green Chilli |
| Chole Chawal | Chole, Rice | Onion | chole, rice | oil, salt, spices | None |
| Coconut Rice | Rice, Coconut | Curry Leaves, Mustard Seeds, Peanut, Oil, Coriander | rice, coconut | curry leaves, mustard seeds, peanuts, oil, salt, spices | Curry Leaves, Mustard Seeds, Peanut |
| Corn Chaat | Corn, Onion | Curry Leaves, Mustard Seeds, Oil, Coriander | corn, onion | curry leaves, mustard seeds, oil, salt, spices | Curry Leaves, Mustard Seeds, Oil |
| Corn Soup | Corn, Carrot | Black Pepper, Onion | corn, carrot | onion, black pepper, oil, salt, spices | onion, black pepper |
| Curd Rice | Rice, Curd | Mustard Seeds, Curry Leaves | rice, curd | oil, salt, spices | None |
| Dal Makhani | Black Urad Dal, Rajma | Butter, Tomato | black urad dal, rajma | tomato, oil, salt, spices | None |
| Dal Rice | Rice, Toor Dal | Ghee, Dal | rice, toor dal | dal, oil, salt, spices | None |
| Dal Roti | Toor Dal, Wheat | Onion | toor dal, wheat flour | oil, salt, spices | None |
| Dosa | Dosa Rice, Urad Dal | Ghee | dosa rice, urad dal | ghee, oil, chutney, sambar | Ghee |
| Dragon Chicken | Chicken, Chilli | Onion, Curry Leaves, Garlic, Ginger, Oil | chicken, chilli | onion, curry leaves, garlic, tomato, ginger, oil | Onion, Curry Leaves, Garlic |
| Egg Bhurji | Egg, Onion | Tomato, Green Chilli | egg, onion | tomato, oil, salt, spices | None |
| Egg Curry | Egg, Onion | Tomato, Red Chilli | egg, onion | tomato, red chilli, oil, salt, spices | Red Chilli |
| Egg Curry | Egg, Onion | Tomato, Red Chilli | egg, onion | tomato, oil, salt, spices | None |
| Egg Curry Rice | Egg, Rice | Tomato | egg, rice | tomato, oil, salt, spices | None |
| Egg Dosa | dosa batter, egg | onion, pepper, oil | dosa batter, egg | onion, pepper, oil, chutney, sambar | onion, pepper, oil |
| Egg Fried Rice | Rice, Egg | Onion, Garlic, Soy Sauce, Spring Onion, Oil | rice, egg | onion, garlic, soy sauce, spring onion, oil, salt, spices | None |
| Egg Paratha | wheat flour, egg | onion, pepper, oil, coriander | wheat flour, egg | onion, pepper, oil, coriander, spices, ghee, green chilli | onion, pepper, oil, coriander |
| Egg Toast | Egg, Bread | Curry Leaves, Mustard Seeds, Onion, Oil, Coriander | egg, bread | curry leaves, mustard seeds, onion, oil, salt, spices | Curry Leaves, Mustard Seeds, Onion |
| Fish Curry | Fish, Tomato | Onion | fish, tamarind | tomato, onion, garlic, curry leaves, oil, salt, spices | None |
| Fish Curry Rice | Fish, Rice | Tomato | fish, rice | tomato, oil, salt, spices | None |
| Fish Fry | Fish, Rice Flour | Red Chilli, Turmeric | fish, rice flour | red chilli, turmeric, oil, salt, spices | red chilli, turmeric |
| Fish Pakora | Fish, Besan | Wheat | fish, besan | oil, salt, spices | None |
| Garlic Chicken | chicken, garlic | pepper, soy sauce, oil | chicken, garlic | pepper, soy sauce, oil, onion, tomato, ginger | pepper, soy sauce, oil |
| Gongura Mutton | Mutton, Gongura | Onion, Red Chilli | mutton, gongura | red chilli, onion, oil, salt, spices | Gongura, Red Chilli |
| Gujiya | Maida, Khoya | None | maida, khoya | oil, salt, spices | None |
| Gunpowder Idli | Idli Rice, Urad Dal | Podi, Onion, Curry Leaves, Garlic, Ginger | idli, gunpowder | oil, ghee, onion, curry leaves, chutney | Podi, Curry Leaves, Garlic, Ginger |
| Guntur Chicken Fry | Chicken, Guntur Chilli | Onion, Curry Leaves, Garlic, Ginger, Oil | chicken, guntur chilli | onion, curry leaves, garlic, tomato, ginger, oil | Onion, Curry Leaves, Garlic |
| Guntur Chilli Chicken | Chicken, Guntur Chilli | Onion, Garlic | chicken, guntur chilli | onion, garlic, tomato, ginger, oil | Guntur Chilli, Garlic |
| Idli | Idli Rice, Urad Dal | None | idli rice, urad dal | oil, ghee, curry leaves, chutney | None |
| Instant Rava Upma | Rava, Onion | Curry Leaves, Mustard Seeds, Green Chilli, Oil, Coriander | rava, onion | curry leaves, mustard seeds, green chilli, oil | Curry Leaves, Mustard Seeds, Green Chilli |
| Kaaram Dosa | Dosa Rice, Urad Dal | Red Chilli, Onion, Curry Leaves, Garlic, Ginger | dosa rice, urad dal | red chilli, onion, curry leaves, garlic, ginger, oil, chutney, sambar | Red Chilli, Curry Leaves, Garlic, Ginger |
| Kachori | Maida, Moong Dal | None | maida, moong dal | oil, salt, spices | None |
| Kada Prasad | Whole Wheat, Ghee | None | whole wheat, ghee | oil, salt, spices | None |
| Kadai Paneer | paneer, capsicum | tomato, onion, kadai masala, oil | paneer, capsicum | tomato, onion, kadai masala, oil, salt, spices | tomato, onion, kadai masala, oil |
| Kadhi Chawal | Besan, Curd | None | besan, curd | oil, salt, spices | None |
| Keema Fry | Keema, Onion | Green Chilli, Garam Masala | keema, onion | green chilli, garam masala, oil, salt, spices | Green Chilli, Garam Masala |
| Kerala Fish Curry | Fish, Coconut Milk | Tomato, Red Chilli, Kokum | fish, kokum | coconut milk, red chilli, curry leaves, shallot, coconut oil, oil, salt, spices | Kokum, Red Chilli |
| Kheema Pav | Keema, Pav | Onion, Green Chilli | keema, pav | onion, green chilli, oil, salt, spices | Green Chilli |
| Khichdi | Rice, Moong Dal | Ghee | rice, moong dal | oil, salt, spices | None |
| Kolhapuri Chicken | Chicken, Dry Coconut | Onion, Kolhapuri Masala | chicken, dry coconut | kolhapuri masala, onion, tomato, garlic, ginger, oil | Kolhapuri Masala, Dry Coconut |
| Kolhapuri Misal Pav | Matki, Pav | Onion, Misal Masala | matki, pav | misal masala, onion, oil, salt, spices | Misal Masala |
| Laal Maas | Mutton, Curd | Mathania Chilli, Garlic | mutton, curd | mathania chilli, garlic, oil, salt, spices | Mathania Chilli, Garlic |
| Ladoo | Besan, Ghee | None | besan, ghee | oil, salt, spices | None |
| Lemon Rice | Rice, Lemon | Mustard Seeds, Peanut | rice, lemon | peanuts, oil, salt, spices | None |
| Lemon Sevai | Sevai, Lemon | Curry Leaves, Mustard Seeds, Onion, Oil, Coriander | sevai, lemon | curry leaves, mustard seeds, onion, oil, salt, spices | Curry Leaves, Mustard Seeds, Onion |
| Madras Curry | Chicken, Coconut Milk | Tomato, Madras Curry Powder | chicken, coconut milk | madras curry powder, tomato, onion, garlic, ginger, oil | Madras Curry Powder |
| Masala Chai | Tea, Milk | Ginger | tea, milk | ginger, oil, salt, spices | ginger |
| Masala Dosa | dosa batter, potato | onion, mustard seeds, curry leaves, turmeric, oil | dosa batter, potato | onion, mustard seeds, curry leaves, turmeric, oil, chutney, sambar | onion, mustard seeds, curry leaves, turmeric, oil |
| Masala Omelette | egg, capsicum | onion, tomato, green chilli, coriander, oil | egg, capsicum | onion, tomato, green chilli, coriander, oil, pepper | onion, tomato, green chilli, coriander, oil |
| Mashed Banana | Banana, Milk | None | banana, milk | oil, salt, spices | None |
| Matar Paneer | paneer, green peas | tomato, onion, garam masala, oil | paneer, green peas | tomato, onion, garam masala, oil, salt, spices | tomato, onion, garam masala, oil |
| Mathri | Wheat, Methi | None | wheat flour, methi | oil, salt, spices | None |
| Methi Paratha | Wheat, Methi | None | wheat flour, methi | spices, ghee, green chilli, coriander | None |
| Mirapakaya Bajji | Green Chilli, Besan | Onion, Curry Leaves, Garlic, Ginger, Oil | green chilli, besan | onion, curry leaves, garlic, oil, salt, spices | Onion, Curry Leaves, Garlic |
| Mirchi Bajji | Green Chilli, Besan | Ajwain, Oil, Chilli | green chilli, besan | ajwain, oil, chilli, salt, spices | Ajwain, Oil, Chilli |
| Mirchi Ka Salan | Green Chilli, Peanut | Sesame, Tamarind | green chilli, peanuts | sesame, tamarind, oil, salt, spices | Peanut, Sesame, Tamarind |
| Modak | Rice Flour, Coconut | Ghee | rice flour, coconut | ghee, oil, salt, spices | None |
| Momos | Wheat, Carrot | Cabbage, Onion | wheat flour, carrot | cabbage, onion, oil, salt, spices | onion |
| Mushroom Omelette | egg, mushroom | onion, pepper, oil | egg, mushroom | onion, pepper, oil, coriander | onion, pepper, oil |
| Mushroom Soup | Mushroom, Onion | Black Pepper | mushroom, onion | black pepper, oil, salt, spices | black pepper |
| Nattu Kozhi Curry | Chicken, Country Chicken | Shallots, Black Pepper, Curry Leaves | chicken, country chicken | black pepper, shallots, curry leaves, onion, tomato, garlic, ginger, oil | Black Pepper, Curry Leaves |
| Oats Porridge | Oats, Milk | Banana | oats, milk | oil, salt, spices | None |
| Onion Dosa | dosa batter, onion | green chilli, coriander, oil | dosa batter, onion | green chilli, coriander, oil, chutney, sambar | green chilli, coriander, oil |
| Onion Paratha | wheat flour, onion | green chilli, coriander, ghee, spices | wheat flour, onion | green chilli, coriander, ghee, spices | green chilli, coriander, ghee, spices |
| Onion Rice | rice, onion | cumin, curry leaves, green chilli, oil | rice, onion | cumin, curry leaves, green chilli, oil, salt, spices | cumin, curry leaves, green chilli, oil |
| Onion Uttapam | idli batter, onion | green chilli, coriander, oil | idli batter, onion | green chilli, coriander, oil | green chilli, coriander, oil |
| Pakora | Besan, Potato | None | besan, potato | oil, salt, spices | None |
| Palak Paneer | Palak, Paneer | Onion | paneer, spinach | oil, salt, spices | None |
| Paneer Bhurji | Paneer, Onion | Tomato, Green Chilli | paneer, onion | tomato, green chilli, oil, salt, spices | tomato, green chilli |
| Paneer Dosa | dosa batter, paneer | onion, capsicum, green chilli, oil | dosa batter, paneer | onion, capsicum, green chilli, oil, chutney, sambar | onion, capsicum, green chilli, oil |
| Paneer Fried Rice | rice, paneer | onion, garlic, soy sauce, spring onion, oil | rice, paneer | onion, garlic, soy sauce, spring onion, oil, salt, spices | onion, garlic, soy sauce, spring onion, oil |
| Paneer Pakora | Paneer, Besan | None | paneer, besan | oil, salt, spices | None |
| Paneer Paratha | Wheat, Paneer | Onion, Potato | wheat flour, paneer | onion, spices, ghee, green chilli, coriander | None |
| Paneer Pulao | rice, paneer | onion, peas, whole spices, ghee, coriander | rice, paneer | onion, green peas, whole spices, ghee, coriander, oil, salt, spices | onion, peas, whole spices, ghee, coriander |
| Paneer Sandwich | Bread, Paneer | Butter, Black Pepper, Tomato, Onion, Coriander | bread, paneer | butter, black pepper, tomato, oil, salt, spices | Butter, Black Pepper, Tomato |
| Paneer Tikka | Paneer, Curd | None | paneer, curd | oil, salt, spices | None |
| Paneer Tikka Masala | Paneer, Tomato | Onion, Garam Masala, Capsicum | paneer, tomato | capsicum, garam masala, oil, salt, spices | Garam Masala |
| Peanut Rice | rice, peanuts | curry leaves, mustard seeds, red chilli, sesame oil | rice, peanuts | curry leaves, mustard seeds, red chilli, sesame oil, oil, salt, spices | curry leaves, mustard seeds, red chilli, sesame oil |
| Peanut Sundal | Peanut, Coconut | Curry Leaves, Mustard Seeds, Onion, Oil, Coriander | peanuts, coconut | curry leaves, mustard seeds, onion, oil, salt, spices | Curry Leaves, Mustard Seeds, Onion |
| Pepper Rasam | Black Pepper, Tamarind | Tomato, Cumin | black pepper, tamarind | tomato, cumin, oil, salt, spices | Black Pepper, Cumin |
| Pitha | Rice Flour, Maida | Milk | rice flour, maida | milk, oil, salt, spices | None |
| Plain Chapati | wheat flour | oil, salt | wheat flour | oil, salt, spices | oil, salt |
| Plum Cake | Maida, Dry Fruits | None | maida, dry fruits | oil, salt, spices | None |
| Poha | Poha, Onion | Peanut, Curry Leaves | poha, onion | peanuts, mustard seeds, curry leaves, green chilli, oil | None |
| Pongal | Rice, Moong Dal | Ghee, Black Pepper | rice, moong dal | pepper, cumin, ghee, cashew, oil, salt, spices | None |
| Pork Curry | Pork, Onion | Red Chilli | pork, onion | oil, salt, spices | None |
| Prawn Ghee Roast | Prawn, Ghee | Red Chilli, Byadgi Chilli, Tamarind | prawn, ghee | byadgi chilli, tamarind, oil, salt, spices | Ghee, Byadgi Chilli, Tamarind |
| Puliyogare | rice, tamarind | peanut, curry leaves, mustard seeds, sesame oil, chilli | rice, tamarind | peanuts, curry leaves, mustard seeds, sesame oil, chilli, oil, salt, spices | peanut, curry leaves, mustard seeds, sesame oil, chilli |
| Ragi Porridge | Ragi, Milk | Jaggery | ragi, milk | oil, salt, spices | None |
| Rajma Chawal | Rajma, Rice | Onion, Tomato | rajma, rice | onion, tomato, oil, salt, spices | None |
| Rasam Rice | Rice, Tamarind | Tomato, Black Pepper | rice, tamarind | tomato, oil, salt, spices | None |
| Rice Cakes | Rice, sesame oil | None | rice, sesame oil | oil, salt, spices | None |
| Rice Porridge | Rice, Milk | None | rice, milk | oil, salt, spices | None |
| Sabudana Khichdi | Sabudana, Peanut | Curry Leaves, rice, moong dal | sabudana, peanuts | rice, moong dal, oil, salt, spices | None |
| Sambar Rice | Rice, Toor Dal | Vegetables, Drumstick | rice, toor dal | drumstick, oil, salt, spices | None |
| Samosa | Potato, Wheat | None | potato, wheat flour | oil, salt, spices | None |
| Schezwan Fried Rice | Rice, Schezwan Sauce | Vegetables, Spring Onion, Capsicum | rice, schezwan sauce | spring onion, capsicum, oil, salt, spices | Schezwan Sauce |
| Smoked Pork Rice | Rice, Pork | None | rice, pork | oil, salt, spices | None |
| Soft Idli | Idli Rice, Urad Dal | None | idli rice, urad dal | oil, ghee, curry leaves, chutney | None |
| Spicy Aloo Paratha | Wheat, Potato | Red Chilli, Green Chilli, Ghee, Wheat Flour | wheat flour, potato | green chilli, ghee, spices, coriander | Green Chilli, Ghee |
| Spicy Masala Dosa | Dosa Rice, Urad Dal | Potato, Green Chilli, Onion | dosa rice, urad dal | potato, green chilli, onion, oil, chutney, sambar | Green Chilli |
| Sticky Rice | Rice, sesame oil | None | rice, sesame oil | oil, salt, spices | None |
| Stuffed Paratha | Wheat, Potato | None | wheat flour, potato | spices, ghee, green chilli, coriander | None |
| Sundal | Chana, Coconut | None | chana, coconut | oil, salt, spices | None |
| Sweet Pongal | Rice, Moong Dal | Ghee | rice, moong dal | jaggery, ghee, cashew, cardamom, oil, salt, spices | None |
| Thukpa | Noodles, Carrot | Cabbage, Onion | noodles, carrot | cabbage, onion, oil, salt, spices | onion |
| Tomato Rice | Rice, Tomato | Curry Leaves, Mustard Seeds, Peanut, Oil, Coriander | rice, tomato | curry leaves, mustard seeds, peanuts, oil, coriander, salt, spices | Curry Leaves, Mustard Seeds, Peanut |
| Tomato Uttapam | idli batter, tomato | onion, green chilli, oil | idli batter, tomato | onion, green chilli, oil, coriander | onion, green chilli, oil |
| Upma | Rava, Onion | Carrot, Curry Leaves | rava | carrot, curry leaves, mustard seeds, green chilli, oil, onion, vegetable mix | curry leaves |
| Veg Fried Rice | rice, onion | garlic, soy sauce, carrot, spring onion, oil | rice | garlic, soy sauce, carrot, spring onion, oil, salt, spices, capsicum | garlic, soy sauce, carrot, spring onion, oil |
| Veg Pulao | rice, potato | onion, carrot, peas, whole spices, ghee | rice, potato | onion, carrot, green peas, whole spices, ghee, oil, salt, spices | onion, carrot, peas, whole spices, ghee |
| Veg Sandwich | Bread, Vegetables | Butter, Black Pepper, Tomato, Onion, Coriander | bread, vegetable mix | butter, black pepper, tomato, oil, salt, spices | Butter, Black Pepper, Tomato |
| Vegetable Puree | Carrot, Milk | None | carrot, milk | oil, salt, spices | None |
| Vegetable Soup | Carrot, Onion | Black Pepper | carrot, onion | black pepper, oil, salt, spices | black pepper |
| Vegetable Uttapam | idli batter, vegetable mix | onion, carrot, capsicum, oil | idli batter, vegetable mix | onion, carrot, capsicum, oil, green chilli, coriander | onion, carrot, capsicum, oil |
| Wheat Dosa | wheat flour | cumin, onion, green chilli, oil | wheat flour | cumin, onion, green chilli, oil, chutney, sambar | cumin, onion, green chilli, oil |
| Peas Pulao | Rice, Green Peas | onion, cumin, whole spices, ghee, mint | rice, green peas | onion, cumin, whole spices, ghee, mint, coriander, oil, salt | None |
| Mushroom Pulao | Rice, Mushroom | onion, garlic, green peas, whole spices, ghee | rice, mushroom | onion, garlic, green peas, whole spices, ghee, mint, coriander, oil, salt | None |
| Onion Omelette | Egg, Onion | green chilli, coriander, black pepper, turmeric, oil | egg, onion | green chilli, coriander, black pepper, turmeric, oil, salt | None |
| Tomato Omelette | Egg, Tomato | onion, green chilli, coriander, black pepper, oil | egg, tomato | onion, green chilli, coriander, black pepper, oil, salt | None |
| Batata Poha | Poha, Potato | onion, peanuts, mustard seeds, turmeric, curry leaves | poha, potato | onion, peanuts, mustard seeds, turmeric, curry leaves, green chilli, lemon, oil, salt | None |
| Paneer Mushroom Masala | Paneer, Mushroom | onion, tomato, ginger, garlic, cream | paneer, mushroom | onion, tomato, ginger, garlic, cream, garam masala, coriander, oil, salt | None |
| Chicken Potato Curry | Chicken, Potato | onion, tomato, ginger, garlic, green chilli | chicken, potato | onion, tomato, ginger, garlic, green chilli, garam masala, coriander, oil, salt | None |
| Chicken Mushroom Stir Fry | Chicken, Mushroom | garlic, soy sauce, black pepper, capsicum, spring onion | chicken, mushroom | garlic, soy sauce, black pepper, capsicum, spring onion, oil, salt | None |
| Mutton Pulao | Rice, Mutton | onion, yogurt, ginger, garlic, whole spices | rice, mutton | onion, yogurt, ginger, garlic, whole spices, mint, ghee, oil, salt | None |
| Palak Paratha | Wheat Flour, Spinach | green chilli, cumin, ginger, ajwain, ghee | wheat flour, spinach | green chilli, cumin, ginger, ajwain, ghee, oil, salt | None |
| Mooli Paratha | Wheat Flour, Radish | radish leaves, green chilli, ajwain, coriander, ghee | wheat flour, radish | radish leaves, green chilli, ajwain, coriander, ghee, oil, salt | None |
| Cheese Paratha | Wheat Flour, Cheese | chilli flakes, coriander, black pepper, ghee, oil | wheat flour, cheese | chilli flakes, coriander, black pepper, ghee, oil, salt | None |
| Sweet Holige | Wheat Flour, Jaggery | chana dal, coconut, cardamom, turmeric, ghee | wheat flour, jaggery | chana dal, coconut, cardamom, turmeric, ghee, oil, salt | None |
| Cheese Dosa | Dosa Batter, Cheese | onion, chilli flakes, coriander, oil, chutney | dosa batter, cheese | onion, chilli flakes, coriander, oil, chutney, sambar, salt | None |
| Cheese Uttapam | Idli Batter, Cheese | onion, tomato, capsicum, green chilli, coriander | idli batter, cheese | onion, tomato, capsicum, green chilli, coriander, oil, salt | None |
| Spanish Omelette | Egg, Potato | onion, black pepper, parsley, paprika, olive oil | egg, potato | onion, black pepper, parsley, paprika, olive oil, salt | None |
| Sweet Rice | Rice, Jaggery | ghee, cardamom, coconut, cashew, raisins | rice, jaggery | ghee, cardamom, coconut, cashew, raisins, saffron | None |
