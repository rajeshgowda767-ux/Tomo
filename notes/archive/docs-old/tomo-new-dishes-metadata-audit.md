# Newly Added Dishes Audit

Scope: audit only. No recipe data changed.

Dishes audited: Balance Tier 1 + Balance Sprint 2 additions.

## Metadata Table

| Dish | Meal Type | Region | Family | Mood Tags | Dietary Tags |
| --- | --- | --- | --- | --- | --- |
| Tomato Pappu | lunch, dinner | South India | pappu | comfort, soul-food | vegetarian |
| Dosakaya Pappu | lunch, dinner | South India | pappu | comfort, soul-food | vegetarian |
| Bele Saaru | lunch, dinner | South India | saaru | comfort, soul-food, rainy | vegetarian |
| Mor Kuzhambu | lunch | South India | kadhi | comfort, soul-food, quick | vegetarian |
| Chow Chow Kootu | lunch, dinner | South India | kootu | comfort, soul-food | vegetarian |
| Beans Poriyal | lunch, dinner | South India | poriyal | quick, comfort | vegetarian |
| Cabbage Thoran | lunch, dinner | South India | thoran | quick, comfort | vegetarian |
| Ragi Malt | breakfast, snack | South India | drink side | quick, comfort | vegetarian |
| Palak Dal | lunch, dinner | North India | dal | comfort, soul-food, protein | vegetarian |
| Sarson Ka Saag | lunch, dinner | North India | saag | comfort, soul-food | vegetarian |
| Gujarati Dal | lunch, dinner | West India | dal | comfort, soul-food | vegetarian |
| Varan | lunch, dinner | West India | dal | comfort, soul-food | vegetarian |
| Zunka | lunch, dinner | West India | besan sabzi | quick, comfort | vegetarian |
| Khandvi | snack | West India | steamed snack | quick, comfort | vegetarian |
| Sprouted Moong Salad | snack, lunch | Pan-Indian | chaat | quick, protein | vegetarian |
| Roasted Chana Chaat | snack | Pan-Indian | chaat | quick, protein | vegetarian |
| Thepla | breakfast, snack | West India | flatbread | quick, comfort | vegetarian |
| Moong Dal Chilla | breakfast, snack | North India | chilla | quick, protein | vegetarian |
| Puttu Kadala | breakfast | South India | steamed breakfast | comfort, protein | vegetarian |
| Chirer Pulao | breakfast, snack | East India | poha | quick, comfort | vegetarian |
| Luchi Aloor Dom | breakfast, lunch | East India | fried bread curry | comfort, soul-food | vegetarian |
| Eromba | lunch, dinner | Northeast India | vegetable mash | comfort, soul-food | vegetarian |
| Corn Sundal | snack | South India | sundal | quick, protein | vegetarian |
| Masala Corn | snack | Pan-Indian | corn snack | quick | vegetarian |
| Nippattu | snack | South India | crisp snack | comfort, spicy | vegetarian |
| Kodubale | snack | South India | crisp snack | comfort, spicy | vegetarian |
| Kuzhi Paniyaram | breakfast, snack | South India | steamed snack | comfort, quick | vegetarian |
| Sattu Drink | breakfast, snack | North India | drink side | quick, protein | vegetarian |
| Neer Mor | snack | South India | drink side | quick, comfort | vegetarian |
| Buttermilk | snack | Pan-Indian | drink side | quick, comfort | vegetarian |
| Kokum Sharbat | snack | West India, Coastal India | drink side | quick | vegetarian |
| Jal Jeera | snack | North India, West India | drink side | quick, spicy | vegetarian |

## Mismatches

| Dish | Mismatch | Recommended Correction |
| --- | --- | --- |
| Nippattu | Comfort mood may be weak for crisp snack | Prefer spicy/rainy/snack-oriented tags over comfort if recommendation surfaces treat comfort as meal-like. |
| Kodubale | Comfort mood may be weak for crisp snack | Prefer spicy/rainy/snack-oriented tags over comfort if recommendation surfaces treat comfort as meal-like. |
| Neer Mor | Comfort mood may be too broad for a cooling drink | Prefer quick/light/soothing tags; keep comfort only if used as support, not hero recommendation. |
| Buttermilk | Comfort mood may be too broad for a cooling drink | Prefer quick/light/soothing tags; keep comfort only if used as support, not hero recommendation. |

## Check Summary

| Check | Count |
| --- | --- |
| Drinks assigned as primary meals | 0 |
| Missing mood tags | 0 |
| Incorrect / weak moods | 4 |
| High Protein without meaningful protein | 0 |
| Quick & Easy with long preparation | 0 |
| Rainy Day without fit | 0 |
| Spicy without identity heat | 0 |

## Files Requiring Updates If Corrections Are Applied

- `database/generated/recipes.json`
- `local-recipes.js`
- `frontend/local-recipes.js`

## Notes

- This audit flags metadata risk only. It does not change recommendation scoring or pantry logic.
- Drink items are acceptable as snack/drink support, but should not become primary lunch/dinner recommendations.
- Quick & Easy is treated as risky above 30 minutes.
- Mor Kuzhambu is treated correctly as a yogurt curry, not a drink.
