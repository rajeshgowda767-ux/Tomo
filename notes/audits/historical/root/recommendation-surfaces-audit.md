# Recommendation Surfaces Audit

Audit-only rerun after targeted mood metadata removals. Generated 700 samples total: 100 per requested surface.

No recommendation logic, pantry logic, or UI was changed.

## Top 25 FAILs

| Surface | Dish | Mood | Meal | Reason |
|---|---|---|---|---|
| Comfort | Beans Thoran | comfort | dinner | region duplication: 6/10 South recommendations in Comfort sample window |
| Comfort | Chilli Chicken | comfort | dinner | recommendation contradiction: aggressive spice in comfort surface |
| Comfort | Egg Curry | comfort | dinner | region duplication: 5/10 Pan-Indian recommendations in Comfort sample window |
| Comfort | Guntur Chilli Chicken | comfort | lunch | recommendation contradiction: aggressive spice in comfort surface |
| Comfort | Pongal | comfort | breakfast | region duplication: 6/10 South recommendations in Comfort sample window |
| Comfort | Tomato Rice | comfort | lunch | region duplication: 5/10 South recommendations in Comfort sample window |
| Comfort | Vegetable Uttapam | comfort | breakfast | region duplication: 5/10 South recommendations in Comfort sample window |
| High Protein | Besan Chilla | protein | breakfast | region duplication: 5/10 North recommendations in High Protein sample window |
| High Protein | Dal Makhani | protein | lunch | region duplication: 5/10 North recommendations in High Protein sample window |
| High Protein | Paneer Bhurji | protein | dinner | region duplication: 5/10 North recommendations in High Protein sample window |
| Quick & Easy | Bread Upma | quick | breakfast | region duplication: 6/10 South recommendations in Quick & Easy sample window |
| Quick & Easy | Kosambari | quick | snack | region duplication: 5/10 South recommendations in Quick & Easy sample window |
| Quick & Easy | Paneer Fried Rice | quick | lunch | region duplication: 5/10 Pan-Indian recommendations in Quick & Easy sample window |
| Rainy Day | Masala Dosa | rainy | dinner | region duplication: 6/10 South recommendations in Rainy Day sample window |
| Rainy Day | Onion Uttapam | rainy | dinner | obvious wrong mood: weak rainy-day fit |
| Rainy Day | Onion Uttapam | rainy | dinner | region duplication: 5/10 South recommendations in Rainy Day sample window |
| Rainy Day | Pongal | rainy | breakfast | region duplication: 5/10 South recommendations in Rainy Day sample window |
| Rainy Day | Pongal | rainy | breakfast | region duplication: 6/10 South recommendations in Rainy Day sample window |
| Rainy Day | Sambar Rice | rainy | lunch | obvious wrong mood: weak rainy-day fit |
| Soul Food | Curd Rice | soul | dinner | region duplication: 5/10 South recommendations in Soul Food sample window |
| Soul Food | Idli | soul | breakfast | region duplication: 7/10 South recommendations in Soul Food sample window |
| Soul Food | Masala Dosa | soul | dinner | region duplication: 5/10 South recommendations in Soul Food sample window |
| Soul Food | Mirapakaya Bajji | soul | snack | region duplication: 6/10 South recommendations in Soul Food sample window |
| Soul Food | Pongal | soul | dinner | region duplication: 5/10 South recommendations in Soul Food sample window |
| Soul Food | Puliyogare | soul | lunch | family duplication: 5/10 rice recommendations in Soul Food sample window |

## Top 25 LOW_CONFIDENCE

| Surface | Dish | Mood | Meal | Reason |
|---|---|---|---|---|
| Comfort | Avalakki | comfort | breakfast | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Bread Omelette | comfort | breakfast | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Bread Pakora | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Cheese Paratha | comfort | breakfast | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Cheese Uttapam | comfort | breakfast | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Chicken Pepper Rice Bowl | comfort | dinner | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Chicken Roll | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Corn Chaat | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Corn Soup | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Egg Curry | comfort | dinner | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Egg Toast | comfort | breakfast | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Fish Pakora | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Masala Chai | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Moong Dal Chilla | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Mushroom Pepper Rice Bowl | comfort | dinner | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Paneer Bhurji | comfort | dinner | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Paneer Pakora | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Paneer Sandwich | comfort | breakfast | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Sol Kadhi | comfort | lunch | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Sweet Holige | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| Comfort | Sweet Rice | comfort | snack | plausible but debatable: not explicitly tagged for selected mood |
| High Protein | Cheese Omelette | protein | breakfast | plausible but debatable: not explicitly tagged for selected mood |
| High Protein | Chirer Pulao | protein | breakfast | plausible but debatable: not explicitly tagged for selected mood |
| High Protein | Chole Chawal | protein | lunch | plausible but debatable: not explicitly tagged for selected mood |
| High Protein | Dal Makhani | protein | dinner | plausible but debatable: not explicitly tagged for selected mood |
