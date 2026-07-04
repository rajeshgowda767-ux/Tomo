# Mood Assignment Audit

Flagged rows: 106

| Flag | Dish | Current moods | Reason for concern | Recommended moods | Confidence |
|---|---|---|---|---|---|
| FAIL | Assamese Duck Curry | High Protein / Comfort Food | Current assignment includes High Protein but audit tier is EXCLUDE (weak protein identity). | Comfort Food / Spicy Food | High |
| FAIL | Buttermilk | Quick & Easy | Drink/support item still carries hero mood assignments; recommended mood ownership should be empty for hero mood feeds. | None | High |
| FAIL | Cheese Dosa | Quick & Easy / Comfort Food | Current assignment includes Comfort Food but audit tier is EXCLUDE (weak comfort identity). | Quick & Easy / Spicy Food | High |
| FAIL | Cheese Uttapam | Quick & Easy / Comfort Food | Current assignment includes Comfort Food but audit tier is EXCLUDE (weak comfort identity). | Quick & Easy / Spicy Food | High |
| FAIL | Chicken Potato Curry | Comfort Food / High Protein | Current assignment includes Comfort Food but audit tier is EXCLUDE (weak comfort identity). | High Protein / Spicy Food | High |
| FAIL | Ghugni | High Protein / Comfort Food | Current assignment includes High Protein but audit tier is EXCLUDE (weak protein identity). | Comfort Food | High |
| FAIL | Gunpowder Idli | Spicy Food / Soul Food | Current assignment includes Soul Food but audit tier is EXCLUDE (explicit hard-exclude for this mood). | Spicy Food | High |
| FAIL | Jal Jeera | Quick & Easy / Spicy Food | Drink/support item still carries hero mood assignments; recommended mood ownership should be empty for hero mood feeds. | None | High |
| FAIL | Kaaram Dosa | Spicy Food / Soul Food | Current assignment includes Soul Food but audit tier is EXCLUDE (explicit hard-exclude for this mood). | Spicy Food | High |
| FAIL | Kokum Sharbat | Quick & Easy | Drink/support item still carries hero mood assignments; recommended mood ownership should be empty for hero mood feeds. | None | High |
| FAIL | Lemon Rice | Quick & Easy / Comfort Food | Current assignment includes Comfort Food but audit tier is EXCLUDE (weak comfort identity). | Quick & Easy | High |
| FAIL | Matki Usal | High Protein / Comfort Food | Current assignment includes High Protein but audit tier is EXCLUDE (weak protein identity). | Comfort Food | High |
| FAIL | Mutton Pulao | High Protein / Comfort Food | Current assignment includes High Protein, Comfort Food but audit tier is EXCLUDE (weak protein identity; weak comfort identity). | None | High |
| FAIL | Neer Mor | Quick & Easy | Drink/support item still carries hero mood assignments; recommended mood ownership should be empty for hero mood feeds. | None | High |
| FAIL | Paneer Mushroom Masala | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is EXCLUDE (weak comfort identity). | High Protein | High |
| FAIL | Ragi Malt | Quick & Easy / Comfort Food | Drink/support item still carries hero mood assignments; recommended mood ownership should be empty for hero mood feeds. | None | High |
| FAIL | Sattu Drink | Quick & Easy / High Protein | Drink/support item still carries hero mood assignments; recommended mood ownership should be empty for hero mood feeds. | None | High |
| FAIL | Spanish Omelette | Quick & Easy / High Protein | Current assignment includes Quick & Easy but audit tier is EXCLUDE (too complex/slow for Quick & Easy). | High Protein / Spicy Food | High |
| FAIL | Spicy Aloo Paratha | Soul Food / Spicy Food | Current assignment includes Soul Food but audit tier is EXCLUDE (explicit hard-exclude for this mood). | Spicy Food / Comfort Food | High |
| FAIL | Spicy Masala Dosa | Comfort Food / Soul Food | Current assignment includes Soul Food but audit tier is EXCLUDE (explicit hard-exclude for this mood). | Comfort Food / Spicy Food | High |
| FAIL | Thukpa | Comfort Food / Soul Food | Current assignment includes Soul Food but audit tier is EXCLUDE (weak soul-food identity). | None | High |
| FAIL | Tofu Bhurji | High Protein / Quick & Easy | Current assignment includes High Protein but audit tier is EXCLUDE (weak protein identity). | Quick & Easy / Spicy Food | High |
| MULTI_MOOD_CONFLICT | Akki Roti | Soul Food / Comfort Food | More than two mood signals are assigned (Soul Food, Comfort Food, Quick & Easy). | Comfort Food / Soul Food | High |
| MULTI_MOOD_CONFLICT | Bele Saaru | Comfort Food / Rainy Day | More than two mood signals are assigned (Comfort Food, Rainy Day, Soul Food). | Comfort Food / Rainy Day | High |
| MULTI_MOOD_CONFLICT | Chicken Pepper Rice Bowl | High Protein / Quick & Easy | More than two mood signals are assigned (High Protein, Quick & Easy, Spicy Food). | High Protein / Spicy Food | High |
| MULTI_MOOD_CONFLICT | Chicken Tomato Rice | Quick & Easy / High Protein | More than two mood signals are assigned (Quick & Easy, High Protein, Comfort Food). | Comfort Food / High Protein | High |
| MULTI_MOOD_CONFLICT | Dalma | Comfort Food / Soul Food | More than two mood signals are assigned (Comfort Food, Soul Food, High Protein). | Comfort Food / High Protein | High |
| MULTI_MOOD_CONFLICT | Egg Tomato Rice Bowl | Quick & Easy / High Protein | More than two mood signals are assigned (Quick & Easy, High Protein, Comfort Food). | High Protein / Quick & Easy | High |
| MULTI_MOOD_CONFLICT | Kodubale | Spicy Food / Rainy Day | More than two mood signals are assigned (Spicy Food, Rainy Day, Quick & Easy). | Comfort Food / Soul Food | High |
| MULTI_MOOD_CONFLICT | Moong Dal Vegetable Khichdi | Comfort Food / Quick & Easy | More than two mood signals are assigned (Comfort Food, Quick & Easy, Soul Food). | Comfort Food | High |
| MULTI_MOOD_CONFLICT | Mor Kuzhambu | Comfort Food / Soul Food | More than two mood signals are assigned (Comfort Food, Soul Food, Quick & Easy). | Comfort Food / Soul Food | High |
| MULTI_MOOD_CONFLICT | Nippattu | Spicy Food / Rainy Day | More than two mood signals are assigned (Spicy Food, Rainy Day, Quick & Easy). | Comfort Food / Soul Food | High |
| MULTI_MOOD_CONFLICT | One Pot Dal Palak Rice | Comfort Food / Quick & Easy | More than two mood signals are assigned (Comfort Food, Quick & Easy, Soul Food). | Comfort Food | High |
| MULTI_MOOD_CONFLICT | Palak Dal | Comfort Food / High Protein | More than two mood signals are assigned (Comfort Food, High Protein, Soul Food). | Comfort Food / High Protein | High |
| MULTI_MOOD_CONFLICT | Paneer Corn Rice Bowl | High Protein / Quick & Easy | More than two mood signals are assigned (High Protein, Quick & Easy, Comfort Food). | High Protein / Quick & Easy | High |
| MULTI_MOOD_CONFLICT | Upma | Soul Food | More than two mood signals are assigned (Soul Food, Quick & Easy, Comfort Food). | Quick & Easy / Soul Food | High |
| LOW_CONFIDENCE | Baingan Bharta | Comfort Food / Soul Food | Current assignment includes Soul Food but audit tier is only FALLBACK (some soul/home-style signal only). | Comfort Food | Medium |
| LOW_CONFIDENCE | Besan Chilla | Comfort Food / High Protein | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Boiled Corn | Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | None | Medium |
| LOW_CONFIDENCE | Chaat | Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | None | Medium |
| LOW_CONFIDENCE | Cheese Omelette | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Chicken Capsicum Stir Fry Bowl | High Protein / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Chicken Egg Rice Bowl | High Protein / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | High Protein | Medium |
| LOW_CONFIDENCE | Chicken Fried Rice | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy, Comfort Food but audit tier is only FALLBACK (manageable but not clearly quick; some comfort/home-style signal only). | High Protein | Medium |
| LOW_CONFIDENCE | Chicken Mushroom Stir Fry | Quick & Easy / High Protein | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Chilli Chicken | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Corn Sundal | Quick & Easy / High Protein | Current assignment includes High Protein but audit tier is only FALLBACK (some protein signal only). | Comfort Food / Quick & Easy | Medium |
| LOW_CONFIDENCE | Dhokla | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food | Medium |
| LOW_CONFIDENCE | Egg Bhurji | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Egg Dosa | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Fish Fry | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Garlic Chicken | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Gongura Mutton | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Guntur Chilli Chicken | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Handvo | High Protein / Comfort Food | Current assignment includes High Protein but audit tier is only FALLBACK (some protein signal only). | Comfort Food | Medium |
| LOW_CONFIDENCE | Kachori | Comfort Food / High Protein | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein | Medium |
| LOW_CONFIDENCE | Kadai Paneer | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Keema Fry | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Khandvi | Quick & Easy / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | Quick & Easy | Medium |
| LOW_CONFIDENCE | Kheema Pav | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Kolhapuri Chicken | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Kolhapuri Misal Pav | Spicy Food / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | Spicy Food | Medium |
| LOW_CONFIDENCE | Laal Maas | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Lemon Sevai | Quick & Easy / Soul Food | Current assignment includes Soul Food but audit tier is only FALLBACK (some soul/home-style signal only). | Quick & Easy | Medium |
| LOW_CONFIDENCE | Maddur Vada | Rainy Day / Comfort Food | Current assignment includes Rainy Day but audit tier is only FALLBACK (warm/comforting rainy fallback only). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Madras Curry | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Manipuri Chamthong | Comfort Food / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Spicy Food | Medium |
| LOW_CONFIDENCE | Masala Dosa | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Masala Omelette | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Masor Tenga | Comfort Food / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Matar Paneer | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Mathri | Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | None | Medium |
| LOW_CONFIDENCE | Methi Thepla | Comfort Food / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food | Medium |
| LOW_CONFIDENCE | Mirchi Ka Salan | Spicy Food / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | Spicy Food | Medium |
| LOW_CONFIDENCE | Mochar Ghonto | Comfort Food / Soul Food | Current assignment includes Soul Food but audit tier is only FALLBACK (some soul/home-style signal only). | Comfort Food | Medium |
| LOW_CONFIDENCE | Momos | Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | None | Medium |
| LOW_CONFIDENCE | Mushroom Omelette | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Naga Galho | Comfort Food / Soul Food | Current assignment includes Soul Food but audit tier is only FALLBACK (some soul/home-style signal only). | Comfort Food / Spicy Food | Medium |
| LOW_CONFIDENCE | Onion Dosa | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Onion Paratha | Comfort Food / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Onion Rice | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Onion Uttapam | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Paneer Dosa | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
| LOW_CONFIDENCE | Paneer Fried Rice | Comfort Food / High Protein | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein | Medium |
| LOW_CONFIDENCE | Paneer Tikka | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein | Medium |
| LOW_CONFIDENCE | Paneer Tikka Masala | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Patra | Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | None | Medium |
| LOW_CONFIDENCE | Peanut Poha | Quick / Comfort Food | Current assignment includes Quick & Easy, Comfort Food but audit tier is only FALLBACK (manageable but not clearly quick; some comfort/home-style signal only). | Soul Food / Spicy Food | Medium |
| LOW_CONFIDENCE | Peanut Rice | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Plain Chapati | Comfort Food / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food | Medium |
| LOW_CONFIDENCE | Prawn Ghee Roast | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein / Spicy Food | Medium |
| LOW_CONFIDENCE | Puliyogare | Comfort Food / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Ragi Dosa | Comfort Food / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Sambar Rice | Comfort Food / Rainy Day | Current assignment includes Rainy Day but audit tier is only FALLBACK (warm/comforting rainy fallback only). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Samosa | Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | None | Medium |
| LOW_CONFIDENCE | Schezwan Fried Rice | Spicy Food / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | Quick & Easy / Spicy Food | Medium |
| LOW_CONFIDENCE | Smoked Pork Rice | High Protein / Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein | Medium |
| LOW_CONFIDENCE | Sprouted Moong Salad | Quick & Easy / High Protein | Current assignment includes High Protein but audit tier is only FALLBACK (some protein signal only). | Quick & Easy | Medium |
| LOW_CONFIDENCE | Sticky Rice | Comfort Food | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | None | Medium |
| LOW_CONFIDENCE | Sundal | Comfort Food / High Protein | Current assignment includes Comfort Food but audit tier is only FALLBACK (some comfort/home-style signal only). | High Protein | Medium |
| LOW_CONFIDENCE | Thepla | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food | Medium |
| LOW_CONFIDENCE | Tomato Uttapam | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Veg Fried Rice | Comfort Food / Quick & Easy | Current assignment includes Comfort Food, Quick & Easy but audit tier is only FALLBACK (some comfort/home-style signal only; manageable but not clearly quick). | None | Medium |
| LOW_CONFIDENCE | Veg Pulao | Comfort Food / Quick & Easy | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Vegetable Uttapam | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / Soul Food | Medium |
| LOW_CONFIDENCE | Zunka | Quick & Easy / Comfort Food | Current assignment includes Quick & Easy but audit tier is only FALLBACK (manageable but not clearly quick). | Comfort Food / High Protein | Medium |
