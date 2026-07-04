# Tomo Banter Audit

Generated: 2026-06-25T17:11:11.210Z

Unique user-facing copy lines: **1177**

## Priority Findings

| Priority | Issue | Evidence | Recommendation |
|---|---|---|---|
| High | Pantry onboarding repeats the same question/instruction in multiple visible locations. | frontend/app.js:241, frontend/app.js:271, frontend/app.js:4296, frontend/app.js:5023; frontend/desktop-reference.html:211, frontend/desktop-reference.html:109 | Keep one clear prompt near the search input and make the top Tomo line reactive. |
| High | Some confidence claims require strict trigger checks. | frontend/app.js:247, frontend/app.js:4296, frontend/app.js:5023; frontend/desktop-reference.html:211, frontend/desktop-reference.html:109, frontend/desktop-reference.html:228 | Show claims such as “You have all ingredients” only after required and optional coverage is complete. |
| Medium | Internal scoring language is still visible in pantry copy. | frontend/app.js:3847, frontend/app.js:3847 | Use “Key ingredients” and “Nice-to-have ingredients.” |

## Grouped Summary

| Group | Total | Keep | Improve | Remove | Make conditional |
|---|---:|---:|---:|---:|---:|
| Mood banters | 240 | 240 | 0 | 0 | 0 |
| Pantry banters | 226 | 213 | 8 | 0 | 5 |
| Recommendation banters | 339 | 337 | 2 | 0 | 0 |
| Empty state banters | 20 | 20 | 0 | 0 | 0 |
| Dish detail banters | 29 | 29 | 0 | 0 | 0 |
| Journal banters | 93 | 93 | 0 | 0 | 0 |
| Collection banters | 184 | 184 | 0 | 0 | 0 |
| Button labels | 46 | 44 | 2 | 0 | 0 |

## Mood banters

| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |
|---|---|---|---|---|---|---|
| frontend/app.js:1814 | Dashboard hero | Reveal Tomo's pick | On the homepage hero or hero reveal state | generic | keep | Reveal Tomo's pick |
| frontend/app.js:1818 | Dashboard hero | ⏱ {dynamic value} min · 🍽 {dynamic value} · {dynamic value} {dynamic value} | On the homepage hero or hero reveal state | generic | keep | ⏱ {dynamic value} min · 🍽 {dynamic value} · {dynamic value} {dynamic value} |
| frontend/app.js:1820 | Dashboard hero | ✨ Tomo's Pick Today | On the homepage hero or hero reveal state | playful | keep | ✨ Tomo's Pick Today |
| frontend/app.js:1820 | Dashboard hero | Cook This | On the homepage hero or hero reveal state | helpful | keep | Cook This |
| frontend/app.js:1820 | Dashboard hero | Save | On the homepage hero or hero reveal state | generic | keep | Save |
| frontend/app.js:1835; frontend/desktop-reference.html:36 | Dashboard hero | Tap to reveal | On the homepage hero or hero reveal state | generic | keep | Tap to reveal |
| frontend/app.js:1836 | Dashboard hero | Tomo found a gentle pick for you. | On the homepage hero or hero reveal state | generic | keep | Tomo found a gentle pick for you. |
| frontend/app.js:1836; frontend/desktop-reference.html:39 | Dashboard hero | Tomo has a pick waiting. | On the homepage hero or hero reveal state | generic | keep | Tomo has a pick waiting. |
| frontend/app.js:1838 | Dashboard hero | Looks like comfort is calling today. | On the homepage hero or hero reveal state | playful | keep | Looks like comfort is calling today. |
| frontend/app.js:1839; frontend/desktop-reference.html:40 | Dashboard hero | Not sure what to cook today? Let’s make today’s food decision easier. | On the homepage hero or hero reveal state | helpful | keep | Not sure what to cook today? Let’s make today’s food decision easier. |
| frontend/app.js:1866 | Dashboard hero | Fresh morning for an easy breakfast ☀️ | When the containing UI component renders | generic | keep | Fresh morning for an easy breakfast ☀️ |
| frontend/app.js:1867 | Dashboard hero | Late-night cravings activated 🌙 | When the containing UI component renders | playful | keep | Late-night cravings activated 🌙 |
| frontend/app.js:1914 | Dashboard hero | Clear night | Visible action label when the control is available | generic | keep | Clear night |
| frontend/app.js:1914 | Dashboard hero | Clear sky | Visible action label when the control is available | generic | keep | Clear sky |
| frontend/app.js:1976 | Dashboard hero | Live local weather | When the containing UI component renders | generic | keep | Live local weather |
| frontend/app.js:1978 | Dashboard hero | Live weather needs location permission and an internet connection | When the corresponding recipe detail is opened | generic | keep | Live weather needs location permission and an internet connection |
| frontend/mobile/mobile-shell.js:1926 | Dashboard hero | cheese veg sandwich | On the homepage hero or hero reveal state | generic | keep | cheese veg sandwich |
| frontend/mobile/mobile-shell.js:1928 | Dashboard hero | roasted chana chaat | On the homepage hero or hero reveal state | generic | keep | roasted chana chaat |
| frontend/mobile/mobile-shell.js:1929 | Dashboard hero | sprouted moong salad | On the homepage hero or hero reveal state | generic | keep | sprouted moong salad |
| frontend/mobile/mobile-shell.js:1930 | Dashboard hero | sweet potato chaat | On the homepage hero or hero reveal state | generic | keep | sweet potato chaat |
| frontend/mobile/mobile-shell.js:2746 | Dashboard hero | ⚠ Invalid image mapping | On the homepage hero or hero reveal state | generic | keep | ⚠ Invalid image mapping |
| frontend/mobile/mobile-shell.js:296 | Dashboard hero | Instant Rava Upma | On the homepage hero or hero reveal state | generic | keep | Instant Rava Upma |
| frontend/mobile/mobile-shell.js:297 | Dashboard hero | Egg Fried Rice | On the homepage hero or hero reveal state | generic | keep | Egg Fried Rice |
| frontend/mobile/mobile-shell.js:300 | Dashboard hero | Andhra Egg Fry | On the homepage hero or hero reveal state | generic | keep | Andhra Egg Fry |
| frontend/mobile/mobile-shell.js:308 | Dashboard hero | Egg Curry Rice | On the homepage hero or hero reveal state | generic | keep | Egg Curry Rice |
| frontend/mobile/mobile-shell.js:3831; frontend/mobile/mobile-shell.js:3839 | Dashboard hero | Familiar, flavorful and easy to enjoy today. | On the homepage hero or hero reveal state | warm | keep | Familiar, flavorful and easy to enjoy today. |
| frontend/mobile/mobile-shell.js:3836 | Dashboard hero | Light, coastal and full of familiar home-style flavor. | On the homepage hero or hero reveal state | warm | keep | Light, coastal and full of familiar home-style flavor. |
| frontend/mobile/mobile-shell.js:3837 | Dashboard hero | Comforting, hearty and full of familiar North Indian flavor. | On the homepage hero or hero reveal state | warm | keep | Comforting, hearty and full of familiar North Indian flavor. |
| frontend/mobile/mobile-shell.js:3838 | Dashboard hero | Bright, comforting and rooted in familiar South Indian flavors. | On the homepage hero or hero reveal state | warm | keep | Bright, comforting and rooted in familiar South Indian flavors. |
| frontend/app.js:1018 | Mood selector | andhra chicken curry | When a mood is displayed or selected | generic | keep | andhra chicken curry |
| frontend/app.js:1065 | Mood selector | instant rava upma | When the containing UI component renders | generic | keep | instant rava upma |
| frontend/app.js:1082 | Mood selector | spicy aloo paratha | When the containing UI component renders | generic | keep | spicy aloo paratha |
| frontend/app.js:1083; frontend/app.js:1110 | Mood selector | spicy masala dosa | When the containing UI component renders | generic | keep | spicy masala dosa |
| frontend/app.js:1104; frontend/app.js:1114 | Mood selector | andhra podi idli | When the containing UI component renders | generic | keep | andhra podi idli |
| frontend/app.js:112 | Mood selector | Rain + warm food = happiness. | When a mood is displayed or selected | warm | keep | Rain + warm food = happiness. |
| frontend/app.js:1134 | Mood selector | kerala fish curry | When a mood is displayed or selected | generic | keep | kerala fish curry |
| frontend/app.js:114 | Mood selector | Best enjoyed with rain outside 🌧 | When a mood is displayed or selected | generic | keep | Best enjoyed with rain outside 🌧 |
| frontend/app.js:117 | Mood selector | Let’s make dinner feel easy today. | When a mood is displayed or selected | generic | keep | Let’s make dinner feel easy today. |
| frontend/app.js:118 | Mood selector | Quick can still feel like home. | When a mood is displayed or selected | warm | keep | Quick can still feel like home. |
| frontend/app.js:120 | Mood selector | Fast comfort when energy is low ⚡ | When a mood is displayed or selected | warm | keep | Fast comfort when energy is low ⚡ |
| frontend/app.js:1228 | Mood selector | Tomo pick | When a mood is displayed or selected | generic | keep | Tomo pick |
| frontend/app.js:123 | Mood selector | A filling plate can still feel kind. | When a mood is displayed or selected | generic | keep | A filling plate can still feel kind. |
| frontend/app.js:124 | Mood selector | Let us keep it filling and kind. | When a mood is displayed or selected | generic | keep | Let us keep it filling and kind. |
| frontend/app.js:126 | Mood selector | Filling food without losing warmth 💪 | When a mood is displayed or selected | warm | keep | Filling food without losing warmth 💪 |
| frontend/app.js:129 | Mood selector | A comforting plate might help today. | When a mood is displayed or selected | warm | keep | A comforting plate might help today. |
| frontend/app.js:130 | Mood selector | Soul food should feel familiar. | When a mood is displayed or selected | warm | keep | Soul food should feel familiar. |
| frontend/app.js:132 | Mood selector | Food that feels like home 💗 | When a mood is displayed or selected | warm | keep | Food that feels like home 💗 |
| frontend/app.js:135 | Mood selector | A little warmth, a little spark 🔥 | When a mood is displayed or selected | warm | keep | A little warmth, a little spark 🔥 |
| frontend/app.js:136 | Mood selector | A little spice can fix the whole mood. | When a mood is displayed or selected | warm | keep | A little spice can fix the whole mood. |
| frontend/app.js:138 | Mood selector | A little heat for a brighter plate 🔥 | When a mood is displayed or selected | generic | keep | A little heat for a brighter plate 🔥 |
| frontend/app.js:1418 | Mood selector | Mood feed is showing fewer than 10 quality recipes. Add stronger CORE/SUPPORT recipes instead of padding with weak fallback dishes. | Visible action label when the control is available | helpful | keep | Mood feed is showing fewer than 10 quality recipes. Add stronger CORE/SUPPORT recipes instead of padding with weak fallback dishes. |
| frontend/app.js:144 | Mood selector | A comforting plate sounds perfect tonight. | When a mood is displayed or selected | warm | keep | A comforting plate sounds perfect tonight. |
| frontend/app.js:145 | Mood selector | Something warm might hit the spot. | When a mood is displayed or selected | warm | keep | Something warm might hit the spot. |
| frontend/app.js:146 | Mood selector | Cozy food feels right today. | When a mood is displayed or selected | generic | keep | Cozy food feels right today. |
| frontend/app.js:149 | Mood selector | Looks like soup weather today. | When a mood is displayed or selected | generic | keep | Looks like soup weather today. |
| frontend/app.js:150 | Mood selector | A rainy day calls for comfort food. | When a mood is displayed or selected | warm | keep | A rainy day calls for comfort food. |
| frontend/app.js:1502 | Mood selector | recipe-card {dynamic value} {dynamic value} | When a mood is displayed or selected | generic | keep | recipe-card {dynamic value} {dynamic value} |
| frontend/app.js:151 | Mood selector | Something warm belongs on the menu. | When a mood is displayed or selected | warm | keep | Something warm belongs on the menu. |
| frontend/app.js:154 | Mood selector | Let's keep cooking simple today. | When a mood is displayed or selected | helpful | keep | Let's keep cooking simple today. |
| frontend/app.js:155 | Mood selector | A quick win sounds good. | When a mood is displayed or selected | generic | keep | A quick win sounds good. |
| frontend/app.js:156 | Mood selector | Minimal effort, maximum comfort. | When a mood is displayed or selected | warm | keep | Minimal effort, maximum comfort. |
| frontend/app.js:1573 | Mood selector | ✨ Also Good | When the containing UI component renders | playful | keep | ✨ Also Good |
| frontend/app.js:1573; frontend/app.js:1574 | Mood selector | 🍅 Tomo Recommends | When the containing UI component renders | playful | keep | 🍅 Tomo Recommends |
| frontend/app.js:1574 | Mood selector | 😊 Comfort | When the related list or state is empty | warm | keep | 😊 Comfort |
| frontend/app.js:159 | Mood selector | Ready for something bold? | When a mood is displayed or selected | generic | keep | Ready for something bold? |
| frontend/app.js:160 | Mood selector | Let's turn up the heat. | When a mood is displayed or selected | generic | keep | Let's turn up the heat. |
| frontend/app.js:1851 | Mood selector | Another Pick | When a mood is displayed or selected | generic | keep | Another Pick |
| frontend/app.js:1861 | Mood selector | A good day for something comforting 🍲 | When a mood is displayed or selected | warm | keep | A good day for something comforting 🍲 |
| frontend/app.js:1862 | Mood selector | Rainy weather calls for something warm 🌧️ | When a mood is displayed or selected | warm | keep | Rainy weather calls for something warm 🌧️ |
| frontend/app.js:1863 | Mood selector | Stormy weather calls for a cozy kitchen ⛈️ | When a mood is displayed or selected | generic | keep | Stormy weather calls for a cozy kitchen ⛈️ |
| frontend/app.js:1864; frontend/app.js:1893 | Mood selector | Maybe something light and cooling 🥛 | When a mood is displayed or selected | generic | keep | Maybe something light and cooling 🥛 |
| frontend/app.js:1865 | Mood selector | A warm bowl would feel good today 🍲 | When a mood is displayed or selected | warm | keep | A warm bowl would feel good today 🍲 |
| frontend/app.js:1889; frontend/desktop-reference.html:47 | Mood selector | Perfect weather for comfort food 🍲 | When a mood is displayed or selected | warm | keep | Perfect weather for comfort food 🍲 |
| frontend/app.js:1890 | Mood selector | Fresh morning for soft breakfast ideas ☀️ | When a mood is displayed or selected | generic | keep | Fresh morning for soft breakfast ideas ☀️ |
| frontend/app.js:1891 | Mood selector | Perfect weather for comfort food 🌧️ | When a mood is displayed or selected | warm | keep | Perfect weather for comfort food 🌧️ |
| frontend/app.js:1892 | Mood selector | Late-night cravings activated 🌙 | When a mood is displayed or selected | playful | keep | Late-night cravings activated 🌙 |
| frontend/app.js:190 | Mood selector | Comfort is calling today 🍅 | When a mood is displayed or selected | playful | keep | Comfort is calling today 🍅 |
| frontend/app.js:191 | Mood selector | Rainy weather needs something warm 🌧️ | When a mood is displayed or selected | warm | keep | Rainy weather needs something warm 🌧️ |
| frontend/app.js:192 | Mood selector | Let's keep it easy today ⚡ | When a mood is displayed or selected | generic | keep | Let's keep it easy today ⚡ |
| frontend/app.js:193 | Mood selector | Something filling sounds right 💪 | When a mood is displayed or selected | generic | keep | Something filling sounds right 💪 |
| frontend/app.js:2066 | Mood selector | Festive sweetness in a small bite. | When a mood is displayed or selected | generic | keep | Festive sweetness in a small bite. |
| frontend/app.js:2067 | Mood selector | Soft sweetness for slow evenings. | When a mood is displayed or selected | generic | keep | Soft sweetness for slow evenings. |
| frontend/app.js:2068 | Mood selector | A small sweet finish for the day. | When a mood is displayed or selected | generic | keep | A small sweet finish for the day. |
| frontend/app.js:2071 | Mood selector | Warm, filling comfort in a bowl. | When a mood is displayed or selected | warm | keep | Warm, filling comfort in a bowl. |
| frontend/app.js:2072 | Mood selector | Warm comfort for rainy evenings. | When a mood is displayed or selected | warm | keep | Warm comfort for rainy evenings. |
| frontend/app.js:2073 | Mood selector | Light comfort in a warm bowl. | When a mood is displayed or selected | warm | keep | Light comfort in a warm bowl. |
| frontend/app.js:2174 | Mood selector | A cozy cup for slow evening breaks. | When the containing UI component renders | generic | keep | A cozy cup for slow evening breaks. |
| frontend/app.js:2175 | Mood selector | Easy to sip when you want something gentle. | When the containing UI component renders | generic | keep | Easy to sip when you want something gentle. |
| frontend/app.js:2178 | Mood selector | Stays filling without feeling too heavy. | Visible action label when the control is available | generic | keep | Stays filling without feeling too heavy. |
| frontend/app.js:2179 | Mood selector | Naturally cooling and refreshing. | Visible action label when the control is available | generic | keep | Naturally cooling and refreshing. |
| frontend/app.js:2180 | Mood selector | Fresh side that comes together quickly. | Visible action label when the control is available | generic | keep | Fresh side that comes together quickly. |
| frontend/app.js:2188 | Mood selector | A small homemade ending to the day. | When a mood is displayed or selected | warm | keep | A small homemade ending to the day. |
| frontend/app.js:2191 | Mood selector | Perfect for chilly evenings. | When a mood is displayed or selected | generic | keep | Perfect for chilly evenings. |
| frontend/app.js:2192; frontend/app.js:2386 | Mood selector | A comforting bowl kids usually enjoy. | When a mood is displayed or selected | warm | keep | A comforting bowl kids usually enjoy. |
| frontend/app.js:2193 | Mood selector | Warm, peppery and good for dull days. | When a mood is displayed or selected | warm | keep | Warm, peppery and good for dull days. |
| frontend/app.js:2194 | Mood selector | Filling enough for a light dinner. | When a mood is displayed or selected | generic | keep | Filling enough for a light dinner. |
| frontend/app.js:2195 | Mood selector | Light, warm and quick to make. | When a mood is displayed or selected | warm | keep | Light, warm and quick to make. |
| frontend/app.js:2196 | Mood selector | A cozy bowl for slower evenings. | When a mood is displayed or selected | generic | keep | A cozy bowl for slower evenings. |
| frontend/app.js:2199 | Mood selector | A familiar sweet for celebration plates. | When the containing UI component renders | warm | keep | A familiar sweet for celebration plates. |
| frontend/app.js:2200 | Mood selector | Brings a proper festive table feeling. | Visible action label when the control is available | generic | keep | Brings a proper festive table feeling. |
| frontend/app.js:2201 | Mood selector | Best when the meal can feel special. | When a mood is displayed or selected | generic | keep | Best when the meal can feel special. |
| frontend/app.js:2202 | Mood selector | Tastes right when the festival mood arrives. | When a mood is displayed or selected | warm | keep | Tastes right when the festival mood arrives. |
| frontend/app.js:2203 | Mood selector | Good for cooking and sharing together. | When a mood is displayed or selected | helpful | keep | Good for cooking and sharing together. |
| frontend/app.js:2205 | Mood selector | Keeps you full without feeling heavy. | When a mood is displayed or selected | generic | keep | Keeps you full without feeling heavy. |
| frontend/app.js:2206 | Mood selector | Helpful when you want food without waiting. | When a mood is displayed or selected | generic | keep | Helpful when you want food without waiting. |
| frontend/app.js:2267 | Mood selector | A quick protein lunch from leftover rice. | When the containing UI component renders | generic | keep | A quick protein lunch from leftover rice. |
| frontend/app.js:2268 | Mood selector | Small chickpea bites hold up well in boxes. | When the containing UI component renders | generic | keep | Small chickpea bites hold up well in boxes. |
| frontend/app.js:2269 | Mood selector | moong dal cheela | When the containing UI component renders | generic | keep | moong dal cheela |
| frontend/app.js:2269 | Mood selector | Soft cheela brings dal into breakfast easily. | When the containing UI component renders | generic | keep | Soft cheela brings dal into breakfast easily. |
| frontend/app.js:2270 | Mood selector | cheese veg sandwich | When the containing UI component renders | generic | keep | cheese veg sandwich |
| frontend/app.js:2270 | Mood selector | Easy to pack and easy to eat between classes. | When the containing UI component renders | generic | keep | Easy to pack and easy to eat between classes. |
| frontend/app.js:2271 | Mood selector | Quick crunch for hungry after-school moods. | When the containing UI component renders | warm | keep | Quick crunch for hungry after-school moods. |
| frontend/app.js:2272 | Mood selector | Crisp outside, soft inside and kid friendly. | When the containing UI component renders | generic | keep | Crisp outside, soft inside and kid friendly. |
| frontend/app.js:2273 | Mood selector | Sweet enough without feeling like dessert. | When the containing UI component renders | generic | keep | Sweet enough without feeling like dessert. |
| frontend/app.js:2274 | Mood selector | Light crunch for after-school nibbling. | When the containing UI component renders | generic | keep | Light crunch for after-school nibbling. |
| frontend/app.js:2275 | Mood selector | Naturally sweet with a gentle chaat kick. | When the containing UI component renders | generic | keep | Naturally sweet with a gentle chaat kick. |
| frontend/app.js:2275; frontend/mobile/mobile-shell.js:2067 | Mood selector | sweet potato chaat | When the containing UI component renders | generic | keep | sweet potato chaat |
| frontend/app.js:2276 | Mood selector | Soft squares travel well without getting messy. | When the containing UI component renders | generic | keep | Soft squares travel well without getting messy. |
| frontend/app.js:2277 | Mood selector | Ginger warmth helps slow the evening down. | When the containing UI component renders | warm | keep | Ginger warmth helps slow the evening down. |
| frontend/app.js:2278 | Mood selector | A calming sip for tired, heavy days. | When a mood is displayed or selected | generic | keep | A calming sip for tired, heavy days. |
| frontend/app.js:2279 | Mood selector | Peppery warmth when the weather feels dull. | When a mood is displayed or selected | warm | keep | Peppery warmth when the weather feels dull. |
| frontend/app.js:2280 | Mood selector | A light sip after a heavy homemade meal. | When a mood is displayed or selected | warm | keep | A light sip after a heavy homemade meal. |
| frontend/app.js:2281 | Mood selector | Gentle kitchen remedy for uneasy days. | When a mood is displayed or selected | generic | keep | Gentle kitchen remedy for uneasy days. |
| frontend/app.js:2282 | Mood selector | Cooling and salty enough to revive the day. | When a mood is displayed or selected | generic | keep | Cooling and salty enough to revive the day. |
| frontend/app.js:2283 | Mood selector | Sweet, creamy and good after spicy food. | When a mood is displayed or selected | generic | keep | Sweet, creamy and good after spicy food. |
| frontend/app.js:2284 | Mood selector | A cooling sip when lunch feels heavy. | When a mood is displayed or selected | generic | keep | A cooling sip when lunch feels heavy. |
| frontend/app.js:2285 | Mood selector | Fruity and filling for warm afternoons. | When a mood is displayed or selected | warm | keep | Fruity and filling for warm afternoons. |
| frontend/app.js:2286 | Mood selector | Chilled, gentle and nostalgic after meals. | When a mood is displayed or selected | generic | keep | Chilled, gentle and nostalgic after meals. |
| frontend/app.js:2287 | Mood selector | Rooty sweetness that cools the afternoon. | When a mood is displayed or selected | generic | keep | Rooty sweetness that cools the afternoon. |
| frontend/app.js:2288 | Mood selector | Fresh, light and made for hot days. | When a mood is displayed or selected | generic | keep | Fresh, light and made for hot days. |
| frontend/app.js:2350 | Mood selector | Light syrupy sweetness for a cool finish. | When a mood is displayed or selected | generic | keep | Light syrupy sweetness for a cool finish. |
| frontend/app.js:2351 | Mood selector | Ghee-rich sweetness for special days. | When a mood is displayed or selected | generic | keep | Ghee-rich sweetness for special days. |
| frontend/app.js:2352 | Mood selector | Crispy, syrupy and celebration-ready. | When a mood is displayed or selected | generic | keep | Crispy, syrupy and celebration-ready. |
| frontend/app.js:2353 | Mood selector | Smooth rice dessert for slow spoonfuls. | When a mood is displayed or selected | generic | keep | Smooth rice dessert for slow spoonfuls. |
| frontend/app.js:2354 | Mood selector | Small milk sweet that feels festive fast. | When a mood is displayed or selected | generic | keep | Small milk sweet that feels festive fast. |
| frontend/app.js:2355 | Mood selector | Soft chenna sweet with a gentle finish. | When a mood is displayed or selected | generic | keep | Soft chenna sweet with a gentle finish. |
| frontend/app.js:2356 | Mood selector | Grainy milk sweetness for family plates. | When a mood is displayed or selected | generic | keep | Grainy milk sweetness for family plates. |
| frontend/app.js:2357 | Mood selector | Syrupy pancakes for weekend indulgence. | When a mood is displayed or selected | generic | keep | Syrupy pancakes for weekend indulgence. |
| frontend/app.js:2358 | Mood selector | Warm carrot sweetness for winter moods. | When a mood is displayed or selected | warm | keep | Warm carrot sweetness for winter moods. |
| frontend/app.js:2359 | Mood selector | moong dal halwa | When a mood is displayed or selected | generic | keep | moong dal halwa |
| frontend/app.js:2359 | Mood selector | Rich dal halwa for slow celebrations. | When a mood is displayed or selected | generic | keep | Rich dal halwa for slow celebrations. |
| frontend/app.js:2360 | Mood selector | Sweet flatbread that tastes like festivals. | When a mood is displayed or selected | generic | keep | Sweet flatbread that tastes like festivals. |
| frontend/app.js:2361 | Mood selector | A warm sweet roti made for sharing. | When a mood is displayed or selected | warm | keep | A warm sweet roti made for sharing. |
| frontend/app.js:2362 | Mood selector | Cold, creamy and perfect after spicy food. | When a mood is displayed or selected | generic | keep | Cold, creamy and perfect after spicy food. |
| frontend/app.js:2363 | Mood selector | Layered sweetness for a playful treat. | When a mood is displayed or selected | generic | keep | Layered sweetness for a playful treat. |
| frontend/app.js:2364 | Mood selector | Quick semolina sweet for sudden cravings. | When a mood is displayed or selected | playful | keep | Quick semolina sweet for sudden cravings. |
| frontend/app.js:2365 | Mood selector | Simple ghee sweetness for everyday comfort. | When a mood is displayed or selected | warm | keep | Simple ghee sweetness for everyday comfort. |
| frontend/app.js:2366 | Mood selector | A cozy bowl when dinner should stay light. | When a mood is displayed or selected | generic | keep | A cozy bowl when dinner should stay light. |
| frontend/app.js:2367 | Mood selector | hot and sour soup | When a mood is displayed or selected | generic | keep | hot and sour soup |
| frontend/app.js:2367 | Mood selector | Sharp warmth for evenings that need a kick. | When a mood is displayed or selected | warm | keep | Sharp warmth for evenings that need a kick. |
| frontend/app.js:2368 | Mood selector | Crunchy, spicy comfort in a single bowl. | When the containing UI component renders | warm | keep | Crunchy, spicy comfort in a single bowl. |
| frontend/app.js:2369 | Mood selector | Leafy warmth when you want something gentle. | When the containing UI component renders | warm | keep | Leafy warmth when you want something gentle. |
| frontend/app.js:2370 | Mood selector | Sweet carrot makes the bowl feel mellow. | When the containing UI component renders | generic | keep | Sweet carrot makes the bowl feel mellow. |
| frontend/app.js:2371 | Mood selector | Creamy warmth without feeling too heavy. | When the containing UI component renders | warm | keep | Creamy warmth without feeling too heavy. |
| frontend/app.js:2372 | Mood selector | Earthy color and warmth in every spoon. | When the containing UI component renders | warm | keep | Earthy color and warmth in every spoon. |
| frontend/app.js:2373 | Mood selector | A green bowl that feels clean and filling. | When the containing UI component renders | generic | keep | A green bowl that feels clean and filling. |
| frontend/app.js:2374 | Mood selector | Mushrooms make the bowl deep and cozy. | When the containing UI component renders | generic | keep | Mushrooms make the bowl deep and cozy. |
| frontend/app.js:2375 | Mood selector | mixed veg soup | When the containing UI component renders | generic | keep | mixed veg soup |
| frontend/app.js:2375 | Mood selector | An easy way to use everyday vegetables. | When a mood is displayed or selected | generic | keep | An easy way to use everyday vegetables. |
| frontend/app.js:2376 | Mood selector | lemon coriander soup | When a mood is displayed or selected | generic | keep | lemon coriander soup |
| frontend/app.js:2376 | Mood selector | Citrus and coriander keep it bright. | When a mood is displayed or selected | generic | keep | Citrus and coriander keep it bright. |
| frontend/app.js:2377 | Mood selector | Noodles make soup feel like a quick meal. | When a mood is displayed or selected | generic | keep | Noodles make soup feel like a quick meal. |
| frontend/app.js:2378 | Mood selector | Light broth for a simple dinner mood. | When a mood is displayed or selected | warm | keep | Light broth for a simple dinner mood. |
| frontend/app.js:2379 | Mood selector | Sweet peas make the bowl smooth and filling. | When a mood is displayed or selected | generic | keep | Sweet peas make the bowl smooth and filling. |
| frontend/app.js:2380 | Mood selector | Millet gives soup a gentle grainy body. | When a mood is displayed or selected | generic | keep | Millet gives soup a gentle grainy body. |
| frontend/app.js:2381 | Mood selector | Drumstick brings a homely regional warmth. | When a mood is displayed or selected | warm | keep | Drumstick brings a homely regional warmth. |
| frontend/app.js:2382 | Mood selector | Garlic warmth feels good on tired evenings. | When a mood is displayed or selected | warm | keep | Garlic warmth feels good on tired evenings. |
| frontend/app.js:2383 | Mood selector | bottle gourd soup | When a mood is displayed or selected | generic | keep | bottle gourd soup |
| frontend/app.js:2383 | Mood selector | Bottle gourd keeps the bowl calm and light. | When a mood is displayed or selected | generic | keep | Bottle gourd keeps the bowl calm and light. |
| frontend/app.js:2384 | Mood selector | Oats make soup creamy without much effort. | When a mood is displayed or selected | generic | keep | Oats make soup creamy without much effort. |
| frontend/app.js:2385 | Mood selector | Perfect for chilly evenings at home. | When a mood is displayed or selected | warm | keep | Perfect for chilly evenings at home. |
| frontend/app.js:2387 | Mood selector | Light, warm and quick to make after work. | When a mood is displayed or selected | warm | keep | Light, warm and quick to make after work. |
| frontend/app.js:2388 | Mood selector | Lentils make the bowl filling but simple. | When a mood is displayed or selected | generic | keep | Lentils make the bowl filling but simple. |
| frontend/app.js:2389 | Mood selector | Chicken broth feels steady and restorative. | When a mood is displayed or selected | generic | keep | Chicken broth feels steady and restorative. |
| frontend/app.js:2390 | Mood selector | Paneer adds soft protein to a warm bowl. | When a mood is displayed or selected | warm | keep | Paneer adds soft protein to a warm bowl. |
| frontend/app.js:2391 | Mood selector | Peppery broth for rainy-day comfort. | When a mood is displayed or selected | warm | keep | Peppery broth for rainy-day comfort. |
| frontend/app.js:2392 | Mood selector | Tangy rasam wakes up a simple rice meal. | When a mood is displayed or selected | generic | keep | Tangy rasam wakes up a simple rice meal. |
| frontend/app.js:2393 | Mood selector | Spiced rasam with a deeper homely flavor. | When a mood is displayed or selected | warm | keep | Spiced rasam with a deeper homely flavor. |
| frontend/app.js:2394 | Mood selector | Horse gram rasam feels earthy and warming. | When a mood is displayed or selected | warm | keep | Horse gram rasam feels earthy and warming. |
| frontend/app.js:2395 | Mood selector | Crisp spirals made for festive snacking. | When a mood is displayed or selected | generic | keep | Crisp spirals made for festive snacking. |
| frontend/app.js:2396 | Mood selector | Sweet crunch that stores well for guests. | When a mood is displayed or selected | generic | keep | Sweet crunch that stores well for guests. |
| frontend/app.js:282 | Mood selector | Snacky comfort | When the Pantry modal opens with no selection | warm | keep | Snacky comfort |
| frontend/desktop-reference.html:19 | Mood selector | Food for Every Mood | Visible action label when the control is available | warm | keep | Food for Every Mood |
| frontend/desktop-reference.html:46 | Mood selector | 24°C • Light Rain 🌧️ | When the containing UI component renders | generic | keep | 24°C • Light Rain 🌧️ |
| frontend/desktop-reference.html:53 | Mood selector | How are you feeling? | When a mood is displayed or selected | generic | keep | How are you feeling? |
| frontend/desktop-reference.html:54 | Mood selector | Clear mood | When a mood is displayed or selected | warm | keep | Clear mood |
| frontend/mobile/mobile-shell.js:126 | Mood selector | Raitas & Cooling Sides | When a mood is displayed or selected | generic | keep | Raitas & Cooling Sides |
| frontend/mobile/mobile-shell.js:1785 | Mood selector | Tomo's Best Pick | When the containing UI component renders | generic | keep | Tomo's Best Pick |
| frontend/mobile/mobile-shell.js:1786 | Mood selector | Strongest fit for this meal and mood. | When the containing UI component renders | warm | keep | Strongest fit for this meal and mood. |
| frontend/mobile/mobile-shell.js:1942 | Mood selector | chapati jam roll | When a mood is displayed or selected | generic | keep | chapati jam roll |
| frontend/mobile/mobile-shell.js:2067 | Mood selector | Roasted Chana Chaat | When the containing UI component renders | generic | keep | Roasted Chana Chaat |
| frontend/mobile/mobile-shell.js:2067 | Mood selector | Sprouted Moong Salad | When the containing UI component renders | generic | keep | Sprouted Moong Salad |
| frontend/mobile/mobile-shell.js:270 | Mood selector | Kolhapuri Misal Pav | When a mood is displayed or selected | generic | keep | Kolhapuri Misal Pav |
| frontend/mobile/mobile-shell.js:270 | Mood selector | Mirchi Ka Salan | When a mood is displayed or selected | generic | keep | Mirchi Ka Salan |
| frontend/mobile/mobile-shell.js:270 | Mood selector | Schezwan Fried Rice | When a mood is displayed or selected | generic | keep | Schezwan Fried Rice |
| frontend/mobile/mobile-shell.js:3101 | Mood selector | Healthy Living::Warm & Light Bowls | When the containing UI component renders | warm | keep | Healthy Living::Warm & Light Bowls |
| frontend/mobile/mobile-shell.js:3306 | Mood selector | Quick scrambled eggs for a protein-forward start. | When a mood is displayed or selected | generic | keep | Quick scrambled eggs for a protein-forward start. |
| frontend/mobile/mobile-shell.js:3608 | Mood selector | Light Rain 🌧️ | When a mood is displayed or selected | generic | keep | Light Rain 🌧️ |
| frontend/mobile/mobile-shell.js:3608 | Mood selector | Soft Evening 🌙 | When a mood is displayed or selected | generic | keep | Soft Evening 🌙 |
| frontend/mobile/mobile-shell.js:3608 | Mood selector | Warm Daylight ☀️ | When a mood is displayed or selected | warm | keep | Warm Daylight ☀️ |
| frontend/mobile/mobile-shell.js:3609 | Mood selector | Perfect weather for comfort food. | When a mood is displayed or selected | warm | keep | Perfect weather for comfort food. |
| frontend/mobile/mobile-shell.js:3609 | Mood selector | Keep it easy and kind. | When a mood is displayed or selected | generic | keep | Keep it easy and kind. |
| frontend/mobile/mobile-shell.js:3609 | Mood selector | A good day for something comforting. | When a mood is displayed or selected | warm | keep | A good day for something comforting. |
| frontend/mobile/mobile-shell.js:3620 | Mood selector | Comfort is calling today. | When a mood is displayed or selected | playful | keep | Comfort is calling today. |
| frontend/mobile/mobile-shell.js:3621 | Mood selector | Food that feels like home today. | When a mood is displayed or selected | warm | keep | Food that feels like home today. |
| frontend/mobile/mobile-shell.js:3622 | Mood selector | Something filling sounds right. | When a mood is displayed or selected | generic | keep | Something filling sounds right. |
| frontend/mobile/mobile-shell.js:3623 | Mood selector | Let's keep it easy today. | When a mood is displayed or selected | generic | keep | Let's keep it easy today. |
| frontend/mobile/mobile-shell.js:3624 | Mood selector | Rainy weather needs something warm. | When a mood is displayed or selected | warm | keep | Rainy weather needs something warm. |
| frontend/mobile/mobile-shell.js:3625 | Mood selector | Something spicy might hit the spot. | When a mood is displayed or selected | generic | keep | Something spicy might hit the spot. |
| frontend/mobile/mobile-shell.js:3627 | Mood selector | Tomo has a pick waiting. | When a mood is displayed or selected | generic | keep | Tomo has a pick waiting. |
| frontend/mobile/mobile-shell.js:3691 | Mood selector | ✨ Choose Your Mood | Visible action label when the control is available | playful | keep | ✨ Choose Your Mood |
| frontend/mobile/mobile-shell.js:3691 | Mood selector | Tomo will adapt today's recommendations. | Visible action label when the control is available | generic | keep | Tomo will adapt today's recommendations. |
| frontend/mobile/mobile-shell.js:3697 | Mood selector | mv2-mood {dynamic value} | Visible action label when the control is available | warm | keep | mv2-mood {dynamic value} |
| frontend/mobile/mobile-shell.js:3798 | Mood selector | Protein-rich and satisfying. | When a mood is displayed or selected | generic | keep | Protein-rich and satisfying. |
| frontend/mobile/mobile-shell.js:3799 | Mood selector | Bright, simple and easy. | When a mood is displayed or selected | generic | keep | Bright, simple and easy. |
| frontend/mobile/mobile-shell.js:3800 | Mood selector | Homely and deeply comforting. | When a mood is displayed or selected | warm | keep | Homely and deeply comforting. |
| frontend/mobile/mobile-shell.js:3801 | Mood selector | Warm comfort for slow weather. | When a mood is displayed or selected | warm | keep | Warm comfort for slow weather. |
| frontend/mobile/mobile-shell.js:3802 | Mood selector | Bold and full of flavor. | When a mood is displayed or selected | generic | keep | Bold and full of flavor. |
| frontend/mobile/mobile-shell.js:3803 | Mood selector | A thoughtful pick for today. | When a mood is displayed or selected | generic | keep | A thoughtful pick for today. |
| frontend/mobile/mobile-shell.js:3818 | Mood selector | Comforting, flavorful and great for busy days. | When a mood is displayed or selected | warm | keep | Comforting, flavorful and great for busy days. |
| frontend/mobile/mobile-shell.js:3819 | Mood selector | Protein-packed and perfect for a filling meal. | When a mood is displayed or selected | generic | keep | Protein-packed and perfect for a filling meal. |
| frontend/mobile/mobile-shell.js:3820 | Mood selector | Bright, simple and ready without much fuss. | When a mood is displayed or selected | generic | keep | Bright, simple and ready without much fuss. |
| frontend/mobile/mobile-shell.js:3821 | Mood selector | Homely, satisfying and made for comfort. | When a mood is displayed or selected | warm | keep | Homely, satisfying and made for comfort. |
| frontend/mobile/mobile-shell.js:3822 | Mood selector | Warm, cozy and just right for slow weather. | When a mood is displayed or selected | warm | keep | Warm, cozy and just right for slow weather. |
| frontend/mobile/mobile-shell.js:3823 | Mood selector | Bold, punchy and full of flavor. | When a mood is displayed or selected | generic | keep | Bold, punchy and full of flavor. |
| frontend/mobile/mobile-shell.js:3824 | Mood selector | A thoughtful Tomo pick for your mood today. | When a mood is displayed or selected | warm | keep | A thoughtful Tomo pick for your mood today. |
| frontend/mobile/mobile-shell.js:3829 | Mood selector | Bright, comforting and rooted in familiar South Indian flavors. | When a mood is displayed or selected | warm | keep | Bright, comforting and rooted in familiar South Indian flavors. |
| frontend/mobile/mobile-shell.js:3830 | Mood selector | Comforting, hearty and full of familiar North Indian flavor. | On the homepage hero or hero reveal state | warm | keep | Comforting, hearty and full of familiar North Indian flavor. |
| frontend/mobile/mobile-shell.js:3905 | Mood selector | Show matching picks | When the related list or state is empty | helpful | keep | Show matching picks |
| frontend/mobile/mobile-shell.js:4687 | Mood selector | Comfort Cravings | When a mood is displayed or selected | playful | keep | Comfort Cravings |
| frontend/mobile/mobile-shell.js:6650 | Mood selector | Already in your cart | Visible action label when the control is available | generic | keep | Already in your cart |
| frontend/mobile/mobile-shell.js:92 | Mood selector | Clear soups, noodle soups and cozy global bowls. | When a mood is displayed or selected | generic | keep | Clear soups, noodle soups and cozy global bowls. |
| frontend/mobile/mobile-shell.js:93 | Mood selector | Global Street Food | When a mood is displayed or selected | generic | keep | Global Street Food |
| frontend/mobile/mobile-shell.js:93 | Mood selector | Handheld, loaded and street-style global bites. | When a mood is displayed or selected | generic | keep | Handheld, loaded and street-style global bites. |
| frontend/mobile/mobile-shell.js:94 | Mood selector | Sides, Salads & Add-ons | When a mood is displayed or selected | generic | keep | Sides, Salads & Add-ons |
| frontend/mobile/mobile-shell.js:94 | Mood selector | Sides, salads, palyas and meal add-ons. | When a mood is displayed or selected | generic | keep | Sides, salads, palyas and meal add-ons. |
| frontend/mobile/mobile-shell.js:95 | Mood selector | Chutneys, Podis & Condiments | When a mood is displayed or selected | generic | keep | Chutneys, Podis & Condiments |
| frontend/mobile/mobile-shell.js:95 | Mood selector | Small but mighty flavour boosters. | When a mood is displayed or selected | generic | keep | Small but mighty flavour boosters. |
| frontend/mobile/mobile-shell.js:96 | Mood selector | Cooling drinks and lighter seasonal comforts. | When a mood is displayed or selected | warm | keep | Cooling drinks and lighter seasonal comforts. |
| frontend/mobile/mobile-shell.js:97 | Mood selector | Rainy Day Cravings | When a mood is displayed or selected | playful | keep | Rainy Day Cravings |

## Pantry banters

| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |
|---|---|---|---|---|---|---|
| frontend/app.js:105 | Pantry | Something warm sounds right tonight 🍲 | When a mood is displayed or selected | warm | keep | Something warm sounds right tonight 🍲 |
| frontend/app.js:106 | Pantry | Nothing beats comfort food. Hope you find your favorite. | When a mood is displayed or selected | warm | keep | Nothing beats comfort food. Hope you find your favorite. |
| frontend/app.js:108 | Pantry | Warm meals for slower evenings 🍲 | When a mood is displayed or selected | warm | keep | Warm meals for slower evenings 🍲 |
| frontend/app.js:111 | Pantry | Rain outside, warm food inside 🌧 | When a mood is displayed or selected | warm | keep | Rain outside, warm food inside 🌧 |
| frontend/app.js:1538 | Pantry | ✓ Matches Your Pantry | Visible action label when the control is available | helpful | keep | ✓ Matches Your Pantry |
| frontend/app.js:1539 | Pantry | ✓ Quick Breakfast | Visible action label when the control is available | generic | keep | ✓ Quick Breakfast |
| frontend/app.js:1540; frontend/app.js:1776; frontend/app.js:3839 | Pantry | ✓ Matches {dynamic value} | Visible action label when the control is available | helpful | keep | ✓ Matches {dynamic value} |
| frontend/app.js:1541 | Pantry | ✓ Your Cooking History | Visible action label when the control is available | helpful | keep | ✓ Your Cooking History |
| frontend/app.js:1542 | Pantry | ✓ Popular Tonight | Visible action label when the control is available | generic | keep | ✓ Popular Tonight |
| frontend/app.js:161 | Pantry | A little spice never hurts. | When a mood is displayed or selected | generic | keep | A little spice never hurts. |
| frontend/app.js:164 | Pantry | Fuel up with something satisfying. | Visible action label when the control is available | generic | keep | Fuel up with something satisfying. |
| frontend/app.js:165 | Pantry | Protein might be the right move today. | Visible action label when the control is available | generic | keep | Protein might be the right move today. |
| frontend/app.js:166 | Pantry | Let's build a stronger plate. | Visible action label when the control is available | generic | keep | Let's build a stronger plate. |
| frontend/app.js:169 | Pantry | Some recipes feel like home. | When a mood is displayed or selected | warm | keep | Some recipes feel like home. |
| frontend/app.js:170 | Pantry | Comfort comes in many forms. | When a mood is displayed or selected | warm | keep | Comfort comes in many forms. |
| frontend/app.js:171 | Pantry | Today's meal should feel familiar. | When a mood is displayed or selected | warm | keep | Today's meal should feel familiar. |
| frontend/app.js:174 | Pantry | I spotted a few ingredients waiting to be used. | When a mood is displayed or selected | helpful | keep | I spotted a few ingredients waiting to be used. |
| frontend/app.js:175 | Pantry | Your kitchen already has a few clues. | When a mood is displayed or selected | generic | keep | Your kitchen already has a few clues. |
| frontend/app.js:176 | Pantry | Let me connect what you have into dinner. | When a mood is displayed or selected | generic | keep | Let me connect what you have into dinner. |
| frontend/app.js:181 | Pantry | Comfort Food | When a mood is displayed or selected | warm | keep | Comfort Food |
| frontend/app.js:183; frontend/mobile/mobile-shell.js:1814 | Pantry | Quick & Easy | When a mood is displayed or selected | generic | keep | Quick & Easy |
| frontend/app.js:1931 | Pantry | Location is unavailable. | When the containing UI component renders | helpful | keep | Location is unavailable. |
| frontend/app.js:194 | Pantry | Food that feels like home today 💗 | When a mood is displayed or selected | warm | keep | Food that feels like home today 💗 |
| frontend/app.js:195 | Pantry | Something spicy might hit the spot 🔥 | When a mood is displayed or selected | generic | keep | Something spicy might hit the spot 🔥 |
| frontend/app.js:1960 | Pantry | Weather service unavailable. | When the containing UI component renders | helpful | keep | Weather service unavailable. |
| frontend/app.js:1963 | Pantry | Weather data unavailable. | When the containing UI component renders | helpful | keep | Weather data unavailable. |
| frontend/app.js:241 | Pantry | What’s in your kitchen today? Pick your ingredients and I’ll suggest real dishes. | After one pantry ingredient is selected | helpful | keep | What’s in your kitchen today? Pick your ingredients and I’ll suggest real dishes. |
| frontend/app.js:247 | Pantry | Good combo. I found a few dishes you can make with this. | After two pantry ingredients are selected | generic | make conditional | I found a few dishes that use both ingredients. |
| frontend/app.js:248 | Pantry | Now we’re cooking. These matches look stronger. | After three or more pantry ingredients are selected | helpful | keep | Now we’re cooking. These matches look stronger. |
| frontend/app.js:25 | Pantry | Food for Every Mood | Visible action label when the control is available | warm | keep | Food for Every Mood |
| frontend/app.js:253 | Pantry | Strong match. You have the key ingredients. | When a real dish matches required/core pantry ingredients | helpful | keep | Strong match. You have the key ingredients. |
| frontend/app.js:254 | Pantry | Almost there. Add one more ingredient for a better match. | When a partial pantry match is available | helpful | keep | Almost there. Add one more ingredient for a better match. |
| frontend/app.js:255 | Pantry | I found {dynamic value} good {dynamic value} from your kitchen. | When a partial or low-confidence pantry match is available | generic | improve | I found {dynamic value} pantry matches. |
| frontend/app.js:256 | Pantry | Best match from your kitchen. | When a partial or low-confidence pantry match is available | helpful | improve | Strong match from your pantry. |
| frontend/app.js:26 | Pantry | Your Mood, Your Meal | Visible action label when the control is available | warm | keep | Your Mood, Your Meal |
| frontend/app.js:260 | Pantry | Add {dynamic value} to unlock {dynamic value}. | When a partial or low-confidence pantry match is available | helpful | keep | Add {dynamic value} to unlock {dynamic value}. |
| frontend/app.js:261 | Pantry | Add {dynamic value} to unlock a better match. | When a partial or low-confidence pantry match is available | helpful | keep | Add {dynamic value} to unlock a better match. |
| frontend/app.js:262 | Pantry | Add one more main ingredient and I’ll sharpen the suggestions. | When a partial or low-confidence pantry match is available | helpful | keep | Add one more main ingredient and I’ll sharpen the suggestions. |
| frontend/app.js:27 | Pantry | Tomo helps you decide what to cook today. | Visible action label when the control is available | helpful | keep | Tomo helps you decide what to cook today. |
| frontend/app.js:271 | Pantry | I’m here. Tell me the mood or what’s in your kitchen. | When the Pantry modal opens with no selection | warm | keep | I’m here. Tell me the mood or what’s in your kitchen. |
| frontend/app.js:2800; frontend/app.js:2869; frontend/mobile/mobile-shell.js:4808 | Pantry | Spices & Seasonings | When the containing UI component renders | generic | keep | Spices & Seasonings |
| frontend/app.js:2801; frontend/app.js:2869 | Pantry | Oils & Fats | When the containing UI component renders | generic | keep | Oils & Fats |
| frontend/app.js:2802; frontend/app.js:2869 | Pantry | Sauces & Condiments | When the containing UI component renders | generic | keep | Sauces & Condiments |
| frontend/app.js:2820 | Pantry | ingredient-chip {dynamic value} | Visible action label when the control is available | helpful | keep | ingredient-chip {dynamic value} |
| frontend/app.js:2830 | Pantry | Selected ingredients will appear here. | Visible action label when the control is available | helpful | keep | Selected ingredients will appear here. |
| frontend/app.js:2854 | Pantry | − Hide ingredients | Visible action label when the control is available | helpful | keep | − Hide ingredients |
| frontend/app.js:2854 | Pantry | + Browse all ingredients | Visible action label when the control is available | helpful | keep | + Browse all ingredients |
| frontend/app.js:2869; frontend/mobile/mobile-shell.js:4798; frontend/mobile/mobile-shell.js:4807 | Pantry | Grains & Dals | Visible action label when the control is available | generic | keep | Grains & Dals |
| frontend/app.js:29; frontend/app.js:30 | Pantry | tomo.png | Visible action label when the control is available | generic | keep | tomo.png |
| frontend/app.js:2915; frontend/mobile/mobile-shell.js:662 | Pantry | pantry search only | On the homepage hero or hero reveal state | helpful | keep | pantry search only |
| frontend/app.js:293 | Pantry | 3 dishes Tomo picked for your mood | When a mood is displayed or selected | warm | keep | 3 dishes Tomo picked for your mood |
| frontend/app.js:294 | Pantry | Warm bites for slow weather | When a mood is displayed or selected | warm | keep | Warm bites for slow weather |
| frontend/app.js:295 | Pantry | Fast meals that still feel good | When a mood is displayed or selected | generic | keep | Fast meals that still feel good |
| frontend/app.js:296 | Pantry | Filling picks for your day | When a mood is displayed or selected | generic | keep | Filling picks for your day |
| frontend/app.js:297 | Pantry | Food that feels like home | When a mood is displayed or selected | warm | keep | Food that feels like home |
| frontend/app.js:298 | Pantry | Bold flavors for today | When a mood is displayed or selected | generic | keep | Bold flavors for today |
| frontend/app.js:3043; frontend/app.js:3373; frontend/app.js:4279 | Pantry | egg fried rice | When the containing UI component renders | generic | keep | egg fried rice |
| frontend/app.js:3057; frontend/mobile/mobile-shell.js:5119; frontend/mobile/mobile-shell.js:5120 | Pantry | spicy aloo paratha | When the containing UI component renders | generic | keep | spicy aloo paratha |
| frontend/app.js:3317 | Pantry | no selected ingredient is a core ingredient | When the containing UI component renders | helpful | keep | no selected ingredient is a core ingredient |
| frontend/app.js:3318 | Pantry | incompatible with {dynamic value} | When the containing UI component renders | generic | keep | incompatible with {dynamic value} |
| frontend/app.js:3319 | Pantry | selected base {dynamic value} does not match dish base {dynamic value} | When the containing UI component renders | helpful | keep | selected base {dynamic value} does not match dish base {dynamic value} |
| frontend/app.js:3321 | Pantry | fewer than two selected ingredients match core or required ingredients | When the containing UI component renders | helpful | keep | fewer than two selected ingredients match core or required ingredients |
| frontend/app.js:3324 | Pantry | missing required ingredient {dynamic value} | When the containing UI component renders | helpful | keep | missing required ingredient {dynamic value} |
| frontend/app.js:3327 | Pantry | missing required ingredient {dynamic value} and selected {dynamic value} is unrelated | When the containing UI component renders | helpful | keep | missing required ingredient {dynamic value} and selected {dynamic value} is unrelated |
| frontend/app.js:3330 | Pantry | missing required ingredient {dynamic value} and selected {dynamic value} does not belong to dish family {dynamic value} | When the containing UI component renders | helpful | keep | missing required ingredient {dynamic value} and selected {dynamic value} does not belong to dish family {dynamic value} |
| frontend/app.js:3337 | Pantry | fewer than two selected | When the containing UI component renders | helpful | keep | fewer than two selected |
| frontend/app.js:3338 | Pantry | missing required ingredient | When the containing UI component renders | helpful | keep | missing required ingredient |
| frontend/app.js:3340 | Pantry | does not belong | When the containing UI component renders | generic | keep | does not belong |
| frontend/app.js:3377; frontend/app.js:3384; frontend/app.js:3385 | Pantry | butter garlic prawns | When the containing UI component renders | generic | keep | butter garlic prawns |
| frontend/app.js:3378 | Pantry | prawn ghee roast | When the corresponding recipe detail is opened | generic | keep | prawn ghee roast |
| frontend/app.js:3386 | Pantry | Juicy prawns tossed with butter and garlic for a quick, savory pan-fried dish. | Visible action label when the control is available | generic | keep | Juicy prawns tossed with butter and garlic for a quick, savory pan-fried dish. |
| frontend/app.js:3476 | Pantry | Exact rice + egg pantry fallback | When the containing UI component renders | generic | keep | Exact rice + egg pantry fallback |
| frontend/app.js:3478; frontend/app.js:3573; frontend/app.js:3754 | Pantry | Top Match | When the containing UI component renders | helpful | keep | Top Match |
| frontend/app.js:3519 | Pantry | Core Ingredients Match | When the containing UI component renders | helpful | keep | Core Ingredients Match |
| frontend/app.js:3520 | Pantry | Good Match | When the containing UI component renders | helpful | keep | Good Match |
| frontend/app.js:3521 | Pantry | Possible Match | When the containing UI component renders | helpful | keep | Possible Match |
| frontend/app.js:3574 | Pantry | Close Match | When a partial or low-confidence pantry match is available | helpful | keep | Close Match |
| frontend/app.js:3575; frontend/app.js:3576 | Pantry | Add One More Ingredient | When a partial or low-confidence pantry match is available | helpful | keep | Add One More Ingredient |
| frontend/app.js:361 | Pantry | 🍅 Pair dal with rice or roti for a more complete protein plate. | Visible action label when the control is available | playful | keep | 🍅 Pair dal with rice or roti for a more complete protein plate. |
| frontend/app.js:362 | Pantry | 🥣 Soups are a gentle way to add vegetables without making dinner heavy. | When the containing UI component renders | helpful | keep | 🥣 Soups are a gentle way to add vegetables without making dinner heavy. |
| frontend/app.js:363 | Pantry | 🍌 Banana and milk can be a soft baby-food base when texture matters. | When the corresponding recipe detail is opened | generic | keep | 🍌 Banana and milk can be a soft baby-food base when texture matters. |
| frontend/app.js:364 | Pantry | 🌾 Ragi brings calcium and fiber, especially nice in porridge. | When a mood is displayed or selected | generic | keep | 🌾 Ragi brings calcium and fiber, especially nice in porridge. |
| frontend/app.js:365 | Pantry | 🫘 Besan adds protein to snacky foods like chilla and pakora. | When a mood is displayed or selected | generic | keep | 🫘 Besan adds protein to snacky foods like chilla and pakora. |
| frontend/app.js:366 | Pantry | 🥬 A little vegetable side can balance a rice-heavy meal. | When a mood is displayed or selected | generic | keep | 🥬 A little vegetable side can balance a rice-heavy meal. |
| frontend/app.js:373 | Pantry | A warm pepper, cumin, coriander, and jaggery drink for rainy evenings. | When a mood is displayed or selected | warm | keep | A warm pepper, cumin, coriander, and jaggery drink for rainy evenings. |
| frontend/app.js:379 | Pantry | Tulsi Ginger Tea | When a mood is displayed or selected | generic | keep | Tulsi Ginger Tea |
| frontend/app.js:3795 | Pantry | 🍅 You already have everything for {dynamic value}. | Only when every required and optional ingredient is available | playful | keep | 🍅 You already have everything for {dynamic value}. |
| frontend/app.js:3796 | Pantry | 🍅 You have the key ingredients for {dynamic value}. | Only when every required and optional ingredient is available | helpful | keep | 🍅 You have the key ingredients for {dynamic value}. |
| frontend/app.js:380 | Pantry | Tulsi and ginger simmered gently for a soothing herbal cup. | When a mood is displayed or selected | generic | keep | Tulsi and ginger simmered gently for a soothing herbal cup. |
| frontend/app.js:3802 | Pantry | one more ingredient | Visible action label when the control is available | helpful | keep | one more ingredient |
| frontend/app.js:3806 | Pantry | 🍅 You have the core ingredients for {dynamic value}. | When the containing UI component renders | helpful | keep | 🍅 You have the core ingredients for {dynamic value}. |
| frontend/app.js:3810 | Pantry | 🍅 {dynamic value} looks like an easy win today. | Visible action label when the control is available | playful | keep | 🍅 {dynamic value} looks like an easy win today. |
| frontend/app.js:3811 | Pantry | 🍅 {dynamic value} is close with what you have. | Visible action label when the control is available | playful | keep | 🍅 {dynamic value} is close with what you have. |
| frontend/app.js:3835 | Pantry | ✓ Has {dynamic value} | After one pantry ingredient is selected | generic | keep | ✓ Has {dynamic value} |
| frontend/app.js:3837 | Pantry | ✓ Matches {dynamic value} extra ingredient{dynamic value} | After one pantry ingredient is selected | helpful | keep | ✓ Matches {dynamic value} extra ingredient{dynamic value} |
| frontend/app.js:3840 | Pantry | ✓ Good for {dynamic value} | After one pantry ingredient is selected | generic | keep | ✓ Good for {dynamic value} |
| frontend/app.js:3841 | Pantry | ✓ Popular with you | After one pantry ingredient is selected | generic | keep | ✓ Popular with you |
| frontend/app.js:3842 | Pantry | + Add {dynamic value} | Visible action label when the control is available | helpful | keep | + Add {dynamic value} |
| frontend/app.js:3847 | Pantry | Primary Match | Visible action label when the control is available | helpful | improve | Key ingredients |
| frontend/app.js:3847 | Pantry | Secondary Match | Visible action label when the control is available | helpful | improve | Nice-to-have ingredients |
| frontend/app.js:3847 | Pantry | Ingredient match percentage | When the containing UI component renders | helpful | keep | Ingredient match percentage |
| frontend/app.js:386 | Pantry | Jeera Ajwain Water | When the corresponding recipe detail is opened | generic | keep | Jeera Ajwain Water |
| frontend/app.js:387 | Pantry | A light cumin and ajwain infusion often used after heavy meals. | When the corresponding recipe detail is opened | generic | keep | A light cumin and ajwain infusion often used after heavy meals. |
| frontend/app.js:3875; frontend/app.js:4347 | Pantry | Key ingredients available | After one pantry ingredient is selected | helpful | keep | Key ingredients available |
| frontend/app.js:3877 | Pantry | Some ingredients available | After one pantry ingredient is selected | helpful | keep | Some ingredients available |
| frontend/app.js:3878 | Pantry | Add more ingredients to improve match | After one pantry ingredient is selected | helpful | keep | Add more ingredients to improve match |
| frontend/app.js:394 | Pantry | A nourishing ragi drink with milk, cardamom, and a little jaggery. | When the corresponding recipe detail is opened | generic | keep | A nourishing ragi drink with milk, cardamom, and a little jaggery. |
| frontend/app.js:3988 | Pantry | Try {dynamic value} to unlock real dishes. | When the related list or state is empty | generic | keep | Try {dynamic value} to unlock real dishes. |
| frontend/app.js:403 | Pantry | Cucumber, onion, tomato, lemon, and coriander for a crisp meal side. | When the corresponding recipe detail is opened | generic | keep | Cucumber, onion, tomato, lemon, and coriander for a crisp meal side. |
| frontend/app.js:4039; frontend/app.js:4040 | Pantry | Add {dynamic value} for better matches. | When the containing UI component renders | helpful | keep | Add {dynamic value} for better matches. |
| frontend/app.js:4041 | Pantry | Try {dynamic value} to unlock more dishes. | When the containing UI component renders | generic | keep | Try {dynamic value} to unlock more dishes. |
| frontend/app.js:4067 | Pantry | See missing ingredients | Visible action label when the control is available | helpful | keep | See missing ingredients |
| frontend/app.js:408 | Pantry | A gentle South Indian salad with carrot, moong dal, coconut, and lemon. | When the corresponding recipe detail is opened | generic | keep | A gentle South Indian salad with carrot, moong dal, coconut, and lemon. |
| frontend/app.js:4235; frontend/app.js:4350; frontend/mobile/mobile-shell.js:5531; frontend/mobile/mobile-shell.js:5560 | Pantry | Strong match | When a real dish matches required/core pantry ingredients | helpful | keep | Strong match |
| frontend/app.js:4236; frontend/app.js:4324; frontend/app.js:4328 | Pantry | Almost there | When a partial pantry match is available | generic | keep | Almost there |
| frontend/app.js:4237 | Pantry | Unusual combo | When selected ingredients are marked incompatible or unusual | generic | keep | Unusual combo |
| frontend/app.js:4249 | Pantry | Add onion, capsicum, or tomato to unlock paneer-based rice dishes | When the containing UI component renders | helpful | keep | Add onion, capsicum, or tomato to unlock paneer-based rice dishes |
| frontend/app.js:4255; frontend/app.js:4263 | Pantry | Add {dynamic value} to make {dynamic value} | When the containing UI component renders | helpful | keep | Add {dynamic value} to make {dynamic value} |
| frontend/app.js:4268 | Pantry | Add tomato, potato, egg, curd, or lemon for better rice dishes. | When the containing UI component renders | helpful | keep | Add tomato, potato, egg, curd, or lemon for better rice dishes. |
| frontend/app.js:4296 | Pantry | Tell Tomo what’s in your kitchen. | After one pantry ingredient is selected | repetitive | make conditional | Tell Tomo what’s in your kitchen. |
| frontend/app.js:4318 | Pantry | 🍳 I found dishes for {dynamic value} | When a partial or low-confidence pantry match is available | playful | keep | 🍳 I found dishes for {dynamic value} |
| frontend/app.js:4328; frontend/app.js:4350; frontend/mobile/mobile-shell.js:5562; frontend/mobile/mobile-shell.js:5563 | Pantry | View Dish | When a partial or low-confidence pantry match is available | generic | keep | View Dish |
| frontend/app.js:4347; frontend/app.js:4670 | Pantry | Required ingredients selected | Only when every required and optional ingredient is available | helpful | keep | Required ingredients selected |
| frontend/app.js:4350; frontend/app.js:4670 | Pantry | Key ingredients match | When a real dish matches required/core pantry ingredients | helpful | keep | Key ingredients match |
| frontend/app.js:4364; frontend/app.js:5166; frontend/desktop-reference.html:219 | Pantry | Choose 2-4 ingredients | When the Pantry modal opens with no selection | helpful | keep | Choose 2-4 ingredients |
| frontend/app.js:4371 | Pantry | Start with 2-4 ingredients. Try Rice + Egg or Rava + Onion to see instant matches. | When the Pantry modal opens with no selection | helpful | keep | Start with 2-4 ingredients. Try Rice + Egg or Rava + Onion to see instant matches. |
| frontend/app.js:4674 | Pantry | Add {dynamic value} | Only when every required and optional ingredient is available | helpful | keep | Add {dynamic value} |
| frontend/app.js:4795 | Pantry | Boil and mash potato before mixing the filling. | When a dish detail modal is open | generic | keep | Boil and mash potato before mixing the filling. |
| frontend/app.js:4796 | Pantry | Keep the dough soft so the paratha rolls easily. | When a dish detail modal is open | generic | keep | Keep the dough soft so the paratha rolls easily. |
| frontend/app.js:4797 | Pantry | Cook on medium heat with ghee or oil until golden spots appear. | When a dish detail modal is open | helpful | keep | Cook on medium heat with ghee or oil until golden spots appear. |
| frontend/app.js:4804 | Pantry | Prep the key ingredients first, then cook with your usual base of oil, spices, and herbs. | When a dish detail modal is open | helpful | keep | Prep the key ingredients first, then cook with your usual base of oil, spices, and herbs. |
| frontend/app.js:4839 | Pantry | Add items manually, or let Tomo add missing ingredients from recipes you cook. | Visible action label when the control is available | helpful | keep | Add items manually, or let Tomo add missing ingredients from recipes you cook. |
| frontend/app.js:4852 | Pantry | Purchased | Visible action label when the control is available | generic | keep | Purchased |
| frontend/app.js:4852 | Pantry | Tap the circle when purchased | Visible action label when the control is available | generic | keep | Tap the circle when purchased |
| frontend/app.js:5022 | Pantry | Dishes matched to your selected ingredients. | When the Pantry modal opens with no selection | helpful | keep | Dishes matched to your selected ingredients. |
| frontend/app.js:5023; frontend/desktop-reference.html:211 | Pantry | Tell Tomo what's in your kitchen. | When the Pantry modal opens with no selection | repetitive | make conditional | Tell Tomo what's in your kitchen. |
| frontend/app.js:5025 | Pantry | Back to Pantry | When the Pantry modal opens with no selection | generic | keep | Back to Pantry |
| frontend/app.js:5025 | Pantry | Close Pantry | When the Pantry modal opens with no selection | generic | keep | Close Pantry |
| frontend/app.js:5055 | Pantry | 👨‍🍳 Cook This | On the homepage hero or hero reveal state | helpful | keep | 👨‍🍳 Cook This |
| frontend/desktop-reference.html:108; frontend/desktop-reference.html:227 | Pantry | Tomo Pantry | When the Pantry modal opens with no selection | generic | keep | Tomo Pantry |
| frontend/desktop-reference.html:109 | Pantry | What’s in your kitchen? | When the Pantry modal opens with no selection | repetitive | make conditional | What’s in your kitchen? |
| frontend/desktop-reference.html:110 | Pantry | Pick ingredients and Tomo will suggest real dishes. | When the Pantry modal opens with no selection | helpful | keep | Pick ingredients and Tomo will suggest real dishes. |
| frontend/desktop-reference.html:178 | Pantry | Tomo’s Shopping List | When the containing UI component renders | generic | keep | Tomo’s Shopping List |
| frontend/desktop-reference.html:179 | Pantry | Missing ingredients from recipes you choose will appear here. | When the containing UI component renders | helpful | keep | Missing ingredients from recipes you choose will appear here. |
| frontend/desktop-reference.html:212 | Pantry | 🍅 What’s in your kitchen today? Pick your ingredients and I’ll connect the dots. | When the Pantry modal opens with no selection | helpful | improve | 🍅 What’s in your kitchen today? Pick your ingredients and I’ll suggest real dishes. |
| frontend/desktop-reference.html:228 | Pantry | What’s in your kitchen today? | When the Pantry modal opens with no selection | repetitive | make conditional | What’s in your kitchen today? |
| frontend/desktop-reference.html:229 | Pantry | Pick your ingredients. Tomo will connect the dots. | When the Pantry modal opens with no selection | helpful | improve | Pick your ingredients. Tomo will suggest real dishes. |
| frontend/desktop-reference.html:231; frontend/mobile/mobile-shell.js:3935 | Pantry | Clear | Visible action label when the control is available | generic | keep | Clear |
| frontend/desktop-reference.html:258 | Pantry | Browse Ingredients | When a dish detail modal is open | helpful | keep | Browse Ingredients |
| frontend/desktop-reference.html:259 | Pantry | Browse your full pantry list. | Visible action label when the control is available | helpful | keep | Browse your full pantry list. |
| frontend/desktop-reference.html:260 | Pantry | Keep everyday staples close. | When a dish detail modal is open | generic | keep | Keep everyday staples close. |
| frontend/desktop-reference.html:261 | Pantry | Quickly reuse what you picked before. | When a dish detail modal is open | generic | keep | Quickly reuse what you picked before. |
| frontend/mobile/mobile-shell.js:113 | Pantry | Everyday Cooking::Daily Comforts | Visible action label when the control is available | helpful | keep | Everyday Cooking::Daily Comforts |
| frontend/mobile/mobile-shell.js:113 | Pantry | Rice & Dal Meals | Visible action label when the control is available | generic | keep | Rice & Dal Meals |
| frontend/mobile/mobile-shell.js:113 | Pantry | Simple Dinner Ideas | Visible action label when the control is available | generic | keep | Simple Dinner Ideas |
| frontend/mobile/mobile-shell.js:114 | Pantry | Everyday Cooking::Tea Time Favourites | Visible action label when the control is available | helpful | keep | Everyday Cooking::Tea Time Favourites |
| frontend/mobile/mobile-shell.js:1281 | Pantry | matches egg preference | When the containing UI component renders | helpful | keep | matches egg preference |
| frontend/mobile/mobile-shell.js:1282 | Pantry | matches non-vegetarian preference | When the containing UI component renders | helpful | keep | matches non-vegetarian preference |
| frontend/mobile/mobile-shell.js:1283 | Pantry | dismissed recently or recently shown | When the containing UI component renders | generic | keep | dismissed recently or recently shown |
| frontend/mobile/mobile-shell.js:1287 | Pantry | strong pantry match | When the containing UI component renders | helpful | keep | strong pantry match |
| frontend/mobile/mobile-shell.js:1288 | Pantry | uses your {dynamic value} | When the containing UI component renders | generic | keep | uses your {dynamic value} |
| frontend/mobile/mobile-shell.js:1289 | Pantry | only 1 ingredient missing | When the containing UI component renders | helpful | keep | only 1 ingredient missing |
| frontend/mobile/mobile-shell.js:1290 | Pantry | only {dynamic value} ingredients missing | When the containing UI component renders | helpful | keep | only {dynamic value} ingredients missing |
| frontend/mobile/mobile-shell.js:1291 | Pantry | core ingredients available | When the containing UI component renders | helpful | keep | core ingredients available |
| frontend/mobile/mobile-shell.js:1292 | Pantry | protein available in pantry | When the containing UI component renders | helpful | keep | protein available in pantry |
| frontend/mobile/mobile-shell.js:1297 | Pantry | saved similar dishes | Visible action label when the control is available | generic | keep | saved similar dishes |
| frontend/mobile/mobile-shell.js:1310 | Pantry | often cooks {dynamic value} dishes | Visible action label when the control is available | helpful | keep | often cooks {dynamic value} dishes |
| frontend/mobile/mobile-shell.js:1311 | Pantry | frequently saves {dynamic value} dishes | Visible action label when the control is available | generic | keep | frequently saves {dynamic value} dishes |
| frontend/mobile/mobile-shell.js:1312 | Pantry | likes {dynamic value} cuisine | Visible action label when the control is available | generic | keep | likes {dynamic value} cuisine |
| frontend/mobile/mobile-shell.js:1314 | Pantry | Scored for {dynamic value} | Visible action label when the control is available | generic | keep | Scored for {dynamic value} |
| frontend/mobile/mobile-shell.js:1796 | Pantry | Safe, comforting and familiar. | When the containing UI component renders | warm | keep | Safe, comforting and familiar. |
| frontend/mobile/mobile-shell.js:1804 | Pantry | From Your Kitchen | When the containing UI component renders | generic | keep | From Your Kitchen |
| frontend/mobile/mobile-shell.js:1805 | Pantry | Uses what you have selected. | When a mood is displayed or selected | helpful | keep | Uses what you have selected. |
| frontend/mobile/mobile-shell.js:1825 | Pantry | Explore Something Different | When the containing UI component renders | generic | keep | Explore Something Different |
| frontend/mobile/mobile-shell.js:3092 | Pantry | Everyday Cooking::Home Staples | Visible action label when the control is available | helpful | keep | Everyday Cooking::Home Staples |
| frontend/mobile/mobile-shell.js:3096 | Pantry | Healthy Living::Healthy Plates | Visible action label when the control is available | generic | keep | Healthy Living::Healthy Plates |
| frontend/mobile/mobile-shell.js:3780 | Pantry | Fits your pantry | On the homepage hero or hero reveal state | generic | keep | Fits your pantry |
| frontend/mobile/mobile-shell.js:3782 | Pantry | Tomo Pick | On the homepage hero or hero reveal state | generic | keep | Tomo Pick |
| frontend/mobile/mobile-shell.js:3789 | Pantry | Inspired by dishes you saved. | On the homepage hero or hero reveal state | generic | keep | Inspired by dishes you saved. |
| frontend/mobile/mobile-shell.js:3790 | Pantry | Chosen to match your taste. | When the containing UI component renders | helpful | keep | Chosen to match your taste. |
| frontend/mobile/mobile-shell.js:3791 | Pantry | Inspired by a recent favorite. | When the containing UI component renders | generic | keep | Inspired by a recent favorite. |
| frontend/mobile/mobile-shell.js:3792 | Pantry | A good fit for your pantry. | When the containing UI component renders | generic | keep | A good fit for your pantry. |
| frontend/mobile/mobile-shell.js:3793 | Pantry | Bright South Indian comfort. | When the containing UI component renders | warm | keep | Bright South Indian comfort. |
| frontend/mobile/mobile-shell.js:3794 | Pantry | Hearty North Indian comfort. | When a mood is displayed or selected | warm | keep | Hearty North Indian comfort. |
| frontend/mobile/mobile-shell.js:3795 | Pantry | A familiar favorite for today. | When a mood is displayed or selected | warm | keep | A familiar favorite for today. |
| frontend/mobile/mobile-shell.js:3797 | Pantry | Comforting and full of flavor. | When a mood is displayed or selected | warm | keep | Comforting and full of flavor. |
| frontend/mobile/mobile-shell.js:3877 | Pantry | Search dishes, moods, ingredients... | Visible action label when the control is available | too much | improve | Search dishes, moods, ingredients. |
| frontend/mobile/mobile-shell.js:3935 | Pantry | Tap what you have | Visible action label when the control is available | generic | keep | Tap what you have |
| frontend/mobile/mobile-shell.js:3935 | Pantry | No ingredients found. | Visible action label when the control is available | helpful | keep | No ingredients found. |
| frontend/mobile/mobile-shell.js:3935 | Pantry | Search ingredients... | Visible action label when the control is available | too much | improve | Search ingredients. |
| frontend/mobile/mobile-shell.js:3935 | Pantry | Search ingredients by voice | Visible action label when the control is available | helpful | keep | Search ingredients by voice |
| frontend/mobile/mobile-shell.js:3961 | Pantry | 🛒 Shopping List ({dynamic value}) | Visible action label when the control is available | generic | keep | 🛒 Shopping List ({dynamic value}) |
| frontend/mobile/mobile-shell.js:3961 | Pantry | View List → | Visible action label when the control is available | generic | keep | View List → |
| frontend/mobile/mobile-shell.js:3974 | Pantry | 🛒 Shopping List | After one pantry ingredient is selected | generic | keep | 🛒 Shopping List |
| frontend/mobile/mobile-shell.js:3977 | Pantry | Use this list while shopping, copy it, or share it with family. | After one pantry ingredient is selected | generic | keep | Use this list while shopping, copy it, or share it with family. |
| frontend/mobile/mobile-shell.js:3977 | Pantry | Clear List | After one pantry ingredient is selected | generic | keep | Clear List |
| frontend/mobile/mobile-shell.js:3977 | Pantry | Items To Buy | After one pantry ingredient is selected | generic | keep | Items To Buy |
| frontend/mobile/mobile-shell.js:3977 | Pantry | Add missing ingredients from recipes and Tomo will build your shopping list. | After one pantry ingredient is selected | helpful | keep | Add missing ingredients from recipes and Tomo will build your shopping list. |
| frontend/mobile/mobile-shell.js:3997 | Pantry | Need these ingredients? | Visible action label when the control is available | helpful | keep | Need these ingredients? |
| frontend/mobile/mobile-shell.js:3997 | Pantry | 🏪 Use this list at your local grocery store | Visible action label when the control is available | generic | keep | 🏪 Use this list at your local grocery store |
| frontend/mobile/mobile-shell.js:3997 | Pantry | 📋 Copy and share with others | Visible action label when the control is available | generic | keep | 📋 Copy and share with others |
| frontend/mobile/mobile-shell.js:3997 | Pantry | Online grocery integrations coming soon. | Visible action label when the control is available | generic | keep | Online grocery integrations coming soon. |
| frontend/mobile/mobile-shell.js:4041 | Pantry | Unlock More Dishes | Visible action label when the control is available | generic | keep | Unlock More Dishes |
| frontend/mobile/mobile-shell.js:4041 | Pantry | View More → | Visible action label when the control is available | generic | keep | View More → |
| frontend/mobile/mobile-shell.js:4053 | Pantry | Unlock by adding: | Visible action label when the control is available | generic | keep | Unlock by adding: |
| frontend/mobile/mobile-shell.js:4067 | Pantry | You need {dynamic value} {dynamic value} for {dynamic value}. | After one pantry ingredient is selected | generic | keep | You need {dynamic value} {dynamic value} for {dynamic value}. |
| frontend/mobile/mobile-shell.js:4069 | Pantry | You need {dynamic value} {dynamic value} across {dynamic value} dishes. | After one pantry ingredient is selected | generic | keep | You need {dynamic value} {dynamic value} across {dynamic value} dishes. |
| frontend/mobile/mobile-shell.js:4418 | Pantry | 💬 Help Tomo Improve | Visible action label when the control is available | generic | keep | 💬 Help Tomo Improve |
| frontend/mobile/mobile-shell.js:4584 | Pantry | You May Also Like | Visible action label when the control is available | generic | keep | You May Also Like |
| frontend/mobile/mobile-shell.js:4584 | Pantry | More related dishes are coming soon. | Visible action label when the control is available | generic | keep | More related dishes are coming soon. |
| frontend/mobile/mobile-shell.js:4596 | Pantry | 💡 Tomo Tip | When a dish detail modal is open | generic | keep | 💡 Tomo Tip |
| frontend/mobile/mobile-shell.js:4613 | Pantry | ✓ Ready to Cook Core ingredients available. | When a dish detail modal is open | helpful | keep | ✓ Ready to Cook Core ingredients available. |
| frontend/mobile/mobile-shell.js:4619 | Pantry | ✓ All needed items added | When a dish detail modal is open | generic | keep | ✓ All needed items added |
| frontend/mobile/mobile-shell.js:4658; frontend/mobile/mobile-shell.js:5463 | Pantry | You Have | When the containing UI component renders | generic | keep | You Have |
| frontend/mobile/mobile-shell.js:4662 | Pantry | No matching pantry items selected | Visible action label when the control is available | helpful | keep | No matching pantry items selected |
| frontend/mobile/mobile-shell.js:5115 | Pantry | andhra chicken curry | When the containing UI component renders | generic | keep | andhra chicken curry |
| frontend/mobile/mobile-shell.js:5394 | Pantry | No Match | When the containing UI component renders | helpful | keep | No Match |
| frontend/mobile/mobile-shell.js:5461 | Pantry | Add to Shopping List | Visible action label when the control is available | helpful | keep | Add to Shopping List |
| frontend/mobile/mobile-shell.js:5497 | Pantry | TOMO SUGGESTIONS | When the related list or state is empty | generic | keep | TOMO SUGGESTIONS |
| frontend/mobile/mobile-shell.js:5497 | Pantry | Top matches for you | When the related list or state is empty | helpful | keep | Top matches for you |
| frontend/mobile/mobile-shell.js:5497 | Pantry | Tomo pantry suggestions | When the containing UI component renders | generic | keep | Tomo pantry suggestions |
| frontend/mobile/mobile-shell.js:5510 | Pantry | Start with what you have | When the containing UI component renders | generic | keep | Start with what you have |
| frontend/mobile/mobile-shell.js:5510 | Pantry | Tap ingredients below and Tomo will suggest dishes you can make. | When the containing UI component renders | helpful | keep | Tap ingredients below and Tomo will suggest dishes you can make. |
| frontend/mobile/mobile-shell.js:5510 | Pantry | Try Rice, Egg, Paneer or Tomato. | When the containing UI component renders | generic | keep | Try Rice, Egg, Paneer or Tomato. |
| frontend/mobile/mobile-shell.js:5531 | Pantry | Similar Match | When the containing UI component renders | helpful | keep | Similar Match |
| frontend/mobile/mobile-shell.js:6312; frontend/mobile/mobile-shell.js:6363 | Pantry | Items already in Shopping List | When a dish detail modal is open | generic | keep | Items already in Shopping List |

## Recommendation banters

| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |
|---|---|---|---|---|---|---|
| frontend/app.js:1023; frontend/mobile/mobile-shell.js:268; frontend/mobile/mobile-shell.js:319; frontend/mobile/mobile-shell.js:2513 | General UI | andhra kodi vepudu | When the containing UI component renders | generic | keep | andhra kodi vepudu |
| frontend/app.js:1024; frontend/mobile/mobile-shell.js:268; frontend/mobile/mobile-shell.js:2552; frontend/mobile/mobile-shell.js:5115 | General UI | guntur chicken fry | When the containing UI component renders | generic | keep | guntur chicken fry |
| frontend/app.js:1032; frontend/mobile/mobile-shell.js:2512; frontend/mobile/mobile-shell.js:3339 | General UI | andhra egg fry | When the containing UI component renders | generic | keep | andhra egg fry |
| frontend/app.js:2048 | General UI | Small bites for calm mealtimes. | When the containing UI component renders | generic | keep | Small bites for calm mealtimes. |
| frontend/app.js:2051 | General UI | Neat, filling, and easy to pack. | When the containing UI component renders | generic | keep | Neat, filling, and easy to pack. |
| frontend/app.js:2052 | General UI | A reliable tiffin-box favorite. | When the containing UI component renders | generic | keep | A reliable tiffin-box favorite. |
| frontend/app.js:2053 | General UI | Kid-friendly and lunchbox ready. | When the containing UI component renders | generic | keep | Kid-friendly and lunchbox ready. |
| frontend/app.js:2056 | General UI | Cooling comfort for warm days. | When the containing UI component renders | warm | keep | Cooling comfort for warm days. |
| frontend/app.js:2057 | General UI | A soothing sip for slow evenings. | When the containing UI component renders | generic | keep | A soothing sip for slow evenings. |
| frontend/app.js:2058 | General UI | A gentle drink for everyday comfort. | When the containing UI component renders | warm | keep | A gentle drink for everyday comfort. |
| frontend/app.js:2061 | General UI | Fresh, filling, and easy to finish. | When the containing UI component renders | generic | keep | Fresh, filling, and easy to finish. |
| frontend/app.js:2062 | General UI | Light crunch for warmer days. | When the containing UI component renders | warm | keep | Light crunch for warmer days. |
| frontend/app.js:2063 | General UI | Fresh crunch for everyday meals. | When the containing UI component renders | generic | keep | Fresh crunch for everyday meals. |
| frontend/app.js:2117 | General UI | Warm Comfort | When the containing UI component renders | warm | keep | Warm Comfort |
| frontend/app.js:2159 | General UI | Mild, familiar and simple to digest. | When the containing UI component renders | warm | keep | Mild, familiar and simple to digest. |
| frontend/app.js:2168 | General UI | Keeps school lunch simple without extra fuss. | When the containing UI component renders | generic | keep | Keeps school lunch simple without extra fuss. |
| frontend/app.js:2171 | General UI | Cooling and light for warm afternoons. | When the containing UI component renders | warm | keep | Cooling and light for warm afternoons. |
| frontend/app.js:2172 | General UI | A soothing sip when the body needs care. | When the containing UI component renders | generic | keep | A soothing sip when the body needs care. |
| frontend/app.js:2173 | General UI | Comforting enough to feel like a small meal. | When the containing UI component renders | warm | keep | Comforting enough to feel like a small meal. |
| frontend/app.js:2181 | General UI | Useful when you want something easy and fresh. | Visible action label when the control is available | generic | keep | Useful when you want something easy and fresh. |
| frontend/app.js:2182 | General UI | Adds crunch and brightness to the plate. | Visible action label when the control is available | generic | keep | Adds crunch and brightness to the plate. |
| frontend/app.js:2185 | General UI | Made for sharing during happy gatherings. | When the containing UI component renders | generic | keep | Made for sharing during happy gatherings. |
| frontend/app.js:2186 | General UI | A slow, nostalgic sweet after meals. | When the containing UI component renders | generic | keep | A slow, nostalgic sweet after meals. |
| frontend/app.js:2187 | General UI | Simple sweet fix for sudden cravings. | When the containing UI component renders | playful | keep | Simple sweet fix for sudden cravings. |
| frontend/app.js:2223 | General UI | Naturally sweet and soft for early bites. | When the containing UI component renders | generic | keep | Naturally sweet and soft for early bites. |
| frontend/app.js:2224 | General UI | A smooth little spoonful of soft fruit. | When the containing UI component renders | generic | keep | A smooth little spoonful of soft fruit. |
| frontend/app.js:2225 | General UI | Gentle fruit sweetness for first tastes. | When the containing UI component renders | generic | keep | Gentle fruit sweetness for first tastes. |
| frontend/app.js:2226 | General UI | Mild vegetable sweetness in an easy spoon. | When the containing UI component renders | generic | keep | Mild vegetable sweetness in an easy spoon. |
| frontend/app.js:2227 | General UI | sweet potato mash | Visible action label when the control is available | generic | keep | sweet potato mash |
| frontend/app.js:2227 | General UI | Naturally creamy and filling for little bowls. | Visible action label when the control is available | generic | keep | Naturally creamy and filling for little bowls. |
| frontend/app.js:2228 | General UI | Soft, mellow and easy to swallow slowly. | Visible action label when the control is available | generic | keep | Soft, mellow and easy to swallow slowly. |
| frontend/app.js:2229 | General UI | dal rice mash | Visible action label when the control is available | generic | keep | dal rice mash |
| frontend/app.js:2229 | General UI | Dal and rice settle into a gentle meal. | Visible action label when the control is available | generic | keep | Dal and rice settle into a gentle meal. |
| frontend/app.js:2230 | General UI | A colorful spoonful for curious little eaters. | Visible action label when the control is available | generic | keep | A colorful spoonful for curious little eaters. |
| frontend/app.js:2231 | General UI | Creamy texture without much cooking work. | Visible action label when the control is available | helpful | keep | Creamy texture without much cooking work. |
| frontend/app.js:2232 | General UI | egg yolk mash | Visible action label when the control is available | generic | keep | egg yolk mash |
| frontend/app.js:2232 | General UI | A small protein boost for growing appetites. | Visible action label when the control is available | generic | keep | A small protein boost for growing appetites. |
| frontend/app.js:2233 | General UI | soft idli mash | Visible action label when the control is available | generic | keep | soft idli mash |
| frontend/app.js:2233 | General UI | Turns idli into a soft, familiar meal. | Visible action label when the control is available | warm | keep | Turns idli into a soft, familiar meal. |
| frontend/app.js:2234 | General UI | vegetable dal mash | Visible action label when the control is available | generic | keep | vegetable dal mash |
| frontend/app.js:2234 | General UI | Dal makes vegetables feel smoother and fuller. | Visible action label when the control is available | generic | keep | Dal makes vegetables feel smoother and fuller. |
| frontend/app.js:2235 | General UI | soft chapati milk mash | Visible action label when the control is available | generic | keep | soft chapati milk mash |
| frontend/app.js:2235 | General UI | Softens chapati into a comforting little bowl. | Visible action label when the control is available | warm | keep | Softens chapati into a comforting little bowl. |
| frontend/app.js:2236 | General UI | One soft pot with rice, dal and vegetables. | When the containing UI component renders | generic | keep | One soft pot with rice, dal and vegetables. |
| frontend/app.js:2237 | General UI | Cooling, familiar and easy on the stomach. | When the containing UI component renders | warm | keep | Cooling, familiar and easy on the stomach. |
| frontend/app.js:2238 | General UI | moong dal soup | When the containing UI component renders | generic | keep | moong dal soup |
| frontend/app.js:2238 | General UI | Light dal warmth for quieter meal times. | When the containing UI component renders | warm | keep | Light dal warmth for quieter meal times. |
| frontend/app.js:2239 | General UI | rice kheer baby | When the containing UI component renders | generic | keep | rice kheer baby |
| frontend/app.js:2239 | General UI | A mild sweet bowl for tiny celebrations. | When the containing UI component renders | generic | keep | A mild sweet bowl for tiny celebrations. |
| frontend/app.js:2240 | General UI | mini idli sambar | When the containing UI component renders | generic | keep | mini idli sambar |
| frontend/app.js:2240 | General UI | Small idlis make lunch feel easy to finish. | When the containing UI component renders | generic | keep | Small idlis make lunch feel easy to finish. |
| frontend/app.js:2241 | General UI | Soft edges make dosa easier for little bites. | When the containing UI component renders | generic | keep | Soft edges make dosa easier for little bites. |
| frontend/app.js:2242 | General UI | Warm and steady when breakfast needs speed. | When the containing UI component renders | warm | keep | Warm and steady when breakfast needs speed. |
| frontend/app.js:2243 | General UI | Soft paneer adds protein without much fuss. | When the containing UI component renders | generic | keep | Soft paneer adds protein without much fuss. |
| frontend/app.js:2245 | General UI | soft veg pulao | When the containing UI component renders | generic | keep | soft veg pulao |
| frontend/app.js:2245 | General UI | Gentle rice with vegetables in every spoon. | When the containing UI component renders | generic | keep | Gentle rice with vegetables in every spoon. |
| frontend/app.js:2246 | General UI | Broken wheat keeps breakfast soft and filling. | When the containing UI component renders | generic | keep | Broken wheat keeps breakfast soft and filling. |
| frontend/app.js:2247 | General UI | Fine noodles make vegetables easier to enjoy. | When the containing UI component renders | generic | keep | Fine noodles make vegetables easier to enjoy. |
| frontend/app.js:2248 | General UI | Soft rice and dal comfort for slow feeding. | When the containing UI component renders | warm | keep | Soft rice and dal comfort for slow feeding. |
| frontend/app.js:2249 | General UI | Stays light but still feels like breakfast. | When the containing UI component renders | generic | keep | Stays light but still feels like breakfast. |
| frontend/app.js:2250 | General UI | Small rounds fit neatly into tiffin boxes. | When the containing UI component renders | generic | keep | Small rounds fit neatly into tiffin boxes. |
| frontend/app.js:2251 | General UI | Mild noodles are easy to pack and eat. | When the containing UI component renders | generic | keep | Mild noodles are easy to pack and eat. |
| frontend/app.js:2252 | General UI | Turns leftover bread into a warm morning win. | When the containing UI component renders | warm | keep | Turns leftover bread into a warm morning win. |
| frontend/app.js:2253 | General UI | Steams quickly and stays soft in the box. | When the containing UI component renders | generic | keep | Steams quickly and stays soft in the box. |
| frontend/app.js:2254 | General UI | Easy to hold without spilling the filling. | When the containing UI component renders | generic | keep | Easy to hold without spilling the filling. |
| frontend/app.js:2255 | General UI | Soft poha-style flakes work for rushed mornings. | When the containing UI component renders | generic | keep | Soft poha-style flakes work for rushed mornings. |
| frontend/app.js:2256 | General UI | Tiny bites that rarely come back home. | When the containing UI component renders | warm | keep | Tiny bites that rarely come back home. |
| frontend/app.js:2257 | General UI | Bright, cheerful and easy to pack for lunch. | When the containing UI component renders | generic | keep | Bright, cheerful and easy to pack for lunch. |
| frontend/app.js:2258 | General UI | Tastes good even after a few hours. | When the containing UI component renders | generic | keep | Tastes good even after a few hours. |
| frontend/app.js:2259 | General UI | Filling enough for a long school day. | When the containing UI component renders | generic | keep | Filling enough for a long school day. |
| frontend/app.js:2261 | General UI | Colorful rice makes lunch feel complete. | When the containing UI component renders | generic | keep | Colorful rice makes lunch feel complete. |
| frontend/app.js:2262 | General UI | Sweet roll-up treat for small lunch breaks. | When the containing UI component renders | generic | keep | Sweet roll-up treat for small lunch breaks. |
| frontend/app.js:2262; frontend/mobile/mobile-shell.js:3455 | General UI | chapati jam roll | When the containing UI component renders | generic | keep | chapati jam roll |
| frontend/app.js:2263 | General UI | Protein packed and lunchbox approved. | When the containing UI component renders | generic | keep | Protein packed and lunchbox approved. |
| frontend/app.js:2264 | General UI | A sturdy roll for a longer school day. | When the containing UI component renders | generic | keep | A sturdy roll for a longer school day. |
| frontend/app.js:2265 | General UI | paneer bhurji wrap | When the containing UI component renders | generic | keep | paneer bhurji wrap |
| frontend/app.js:2265 | General UI | Soft paneer filling stays neat inside a wrap. | When the containing UI component renders | generic | keep | Soft paneer filling stays neat inside a wrap. |
| frontend/app.js:2266 | General UI | Besan keeps breakfast light but satisfying. | When the containing UI component renders | generic | keep | Besan keeps breakfast light but satisfying. |
| frontend/app.js:2289 | General UI | A quick energy lift when the day drags. | When the containing UI component renders | generic | keep | A quick energy lift when the day drags. |
| frontend/app.js:2290 | General UI | Naturally sweet and filling between meals. | When the containing UI component renders | generic | keep | Naturally sweet and filling between meals. |
| frontend/app.js:2291 | General UI | carrot beet juice | When the containing UI component renders | generic | keep | carrot beet juice |
| frontend/app.js:2291 | General UI | Bright juice when you want something fresh. | When the containing UI component renders | generic | keep | Bright juice when you want something fresh. |
| frontend/app.js:2292 | General UI | Spiced warmth for slow evening breaks. | When the containing UI component renders | warm | keep | Spiced warmth for slow evening breaks. |
| frontend/app.js:2293 | General UI | Cardamom makes chai feel softer and calmer. | When the containing UI component renders | generic | keep | Cardamom makes chai feel softer and calmer. |
| frontend/app.js:2294 | General UI | Strong, familiar and perfect for slow mornings. | When the containing UI component renders | warm | keep | Strong, familiar and perfect for slow mornings. |
| frontend/app.js:2295 | General UI | lemon honey water | When the containing UI component renders | generic | keep | lemon honey water |
| frontend/app.js:2295 | General UI | Gentle citrus warmth for quiet starts. | When the containing UI component renders | warm | keep | Gentle citrus warmth for quiet starts. |
| frontend/app.js:2296 | General UI | Spiced buttermilk that cools the plate. | When the containing UI component renders | generic | keep | Spiced buttermilk that cools the plate. |
| frontend/app.js:2297 | General UI | Jaggery and spice make summer feel festive. | When the containing UI component renders | generic | keep | Jaggery and spice make summer feel festive. |
| frontend/app.js:2298 | General UI | tender coconut water | When the containing UI component renders | generic | keep | tender coconut water |
| frontend/app.js:2298 | General UI | Fresh coconut water for hot afternoons. | When the containing UI component renders | generic | keep | Fresh coconut water for hot afternoons. |
| frontend/app.js:2299 | General UI | Tangy mango cooler for peak summer days. | When the containing UI component renders | generic | keep | Tangy mango cooler for peak summer days. |
| frontend/app.js:2300 | General UI | Creamy fruit drink for quick fullness. | Visible action label when the control is available | generic | keep | Creamy fruit drink for quick fullness. |
| frontend/app.js:2301 | General UI | Filling enough for a light afternoon sip. | Visible action label when the control is available | generic | keep | Filling enough for a light afternoon sip. |
| frontend/app.js:2302 | General UI | green moong drink | Visible action label when the control is available | generic | keep | green moong drink |
| frontend/app.js:2302 | General UI | Moong gives the drink a gentle protein lift. | Visible action label when the control is available | generic | keep | Moong gives the drink a gentle protein lift. |
| frontend/app.js:2303 | General UI | Warm turmeric milk for slow night routines. | Visible action label when the control is available | warm | keep | Warm turmeric milk for slow night routines. |
| frontend/app.js:2304 | General UI | Nutty milk that feels rich without cooking much. | Visible action label when the control is available | helpful | keep | Nutty milk that feels rich without cooking much. |
| frontend/app.js:2305 | General UI | A fragrant sip for a quieter evening. | Visible action label when the control is available | generic | keep | A fragrant sip for a quieter evening. |
| frontend/app.js:2306 | General UI | Ragi makes this drink filling and earthy. | Visible action label when the control is available | generic | keep | Ragi makes this drink filling and earthy. |
| frontend/app.js:2307 | General UI | Naturally cooling and refreshing beside lunch. | Visible action label when the control is available | generic | keep | Naturally cooling and refreshing beside lunch. |
| frontend/app.js:2308 | General UI | Crunchy side that lightens everyday meals. | Visible action label when the control is available | generic | keep | Crunchy side that lightens everyday meals. |
| frontend/app.js:2309 | General UI | Lentils make the bowl more filling. | Visible action label when the control is available | generic | keep | Lentils make the bowl more filling. |
| frontend/app.js:2310 | General UI | Creamy bites balance sharper salad flavors. | Visible action label when the control is available | generic | keep | Creamy bites balance sharper salad flavors. |
| frontend/app.js:2311 | General UI | green gram salad | Visible action label when the control is available | generic | keep | green gram salad |
| frontend/app.js:2311 | General UI | Crunchy sprouts that make lunch feel lighter. | Visible action label when the control is available | generic | keep | Crunchy sprouts that make lunch feel lighter. |
| frontend/app.js:2312 | General UI | onion tomato salad | Visible action label when the control is available | generic | keep | onion tomato salad |
| frontend/app.js:2312 | General UI | Simple freshness beside dal or rice. | Visible action label when the control is available | generic | keep | Simple freshness beside dal or rice. |
| frontend/app.js:2313 | General UI | mixed veg salad | Visible action label when the control is available | generic | keep | mixed veg salad |
| frontend/app.js:2313 | General UI | Adds color and crunch without cooking. | Visible action label when the control is available | helpful | keep | Adds color and crunch without cooking. |
| frontend/app.js:2314 | General UI | apple walnut salad | Visible action label when the control is available | generic | keep | apple walnut salad |
| frontend/app.js:2314 | General UI | Sweet crunch that keeps the plate lighter. | Visible action label when the control is available | generic | keep | Sweet crunch that keeps the plate lighter. |
| frontend/app.js:2315 | General UI | Juicy, bright and good beside heavy meals. | Visible action label when the control is available | generic | keep | Juicy, bright and good beside heavy meals. |
| frontend/app.js:2316 | General UI | A crisp green bowl with a clean bite. | Visible action label when the control is available | generic | keep | A crisp green bowl with a clean bite. |
| frontend/app.js:2317 | General UI | sweet corn salad | Visible action label when the control is available | generic | keep | sweet corn salad |
| frontend/app.js:2317 | General UI | Sweet corn keeps the salad easy to enjoy. | Visible action label when the control is available | generic | keep | Sweet corn keeps the salad easy to enjoy. |
| frontend/app.js:2318 | General UI | Leafy and light when dinner needs balance. | Visible action label when the control is available | generic | keep | Leafy and light when dinner needs balance. |
| frontend/app.js:2319 | General UI | Filling grains without a heavy finish. | When the containing UI component renders | generic | keep | Filling grains without a heavy finish. |
| frontend/app.js:2320 | General UI | Sprouts bring crunch and steady energy. | When the containing UI component renders | generic | keep | Sprouts bring crunch and steady energy. |
| frontend/app.js:2321 | General UI | Chana makes snack time feel more complete. | When the containing UI component renders | generic | keep | Chana makes snack time feel more complete. |
| frontend/app.js:2322 | General UI | Peanuts add crunch to a fresh side. | When the containing UI component renders | helpful | keep | Peanuts add crunch to a fresh side. |
| frontend/app.js:2323 | General UI | Paneer turns salad into a fuller plate. | When the containing UI component renders | generic | keep | Paneer turns salad into a fuller plate. |
| frontend/app.js:2324 | General UI | Moong keeps the bowl fresh and filling. | When the containing UI component renders | generic | keep | Moong keeps the bowl fresh and filling. |
| frontend/app.js:2325 | General UI | Fresh chopped crunch for any Indian meal. | When the containing UI component renders | generic | keep | Fresh chopped crunch for any Indian meal. |
| frontend/app.js:2326 | General UI | A classic fresh side for festival plates. | When the containing UI component renders | generic | keep | A classic fresh side for festival plates. |
| frontend/app.js:2327 | General UI | Rajma adds a hearty bite to fresh bowls. | When the containing UI component renders | generic | keep | Rajma adds a hearty bite to fresh bowls. |
| frontend/app.js:2328 | General UI | Sweet pineapple lifts simple salad flavors. | When the containing UI component renders | generic | keep | Sweet pineapple lifts simple salad flavors. |
| frontend/app.js:2329 | General UI | tomato onion chaat | When the containing UI component renders | generic | keep | tomato onion chaat |
| frontend/app.js:2329 | General UI | Sharp, juicy and ready in just a few minutes. | When the containing UI component renders | generic | keep | Sharp, juicy and ready in just a few minutes. |
| frontend/app.js:2330 | General UI | Cool crunch for everyday lunch plates. | When the containing UI component renders | generic | keep | Cool crunch for everyday lunch plates. |
| frontend/app.js:2330; frontend/mobile/mobile-shell.js:2618 | General UI | carrot cucumber salad | When the containing UI component renders | generic | keep | carrot cucumber salad |
| frontend/app.js:2331 | General UI | Mint makes watermelon feel extra cooling. | When the containing UI component renders | generic | keep | Mint makes watermelon feel extra cooling. |
| frontend/app.js:2331; frontend/mobile/mobile-shell.js:2616 | General UI | watermelon mint salad | When the containing UI component renders | generic | keep | watermelon mint salad |
| frontend/app.js:2332 | General UI | Fruit turns snack time bright and playful. | When the containing UI component renders | generic | keep | Fruit turns snack time bright and playful. |
| frontend/app.js:2333 | General UI | Cucumber and curd calm spicy meals. | When the containing UI component renders | generic | keep | Cucumber and curd calm spicy meals. |
| frontend/app.js:2333; frontend/mobile/mobile-shell.js:2615 | General UI | cucumber raita salad | When the containing UI component renders | generic | keep | cucumber raita salad |
| frontend/app.js:2334 | General UI | Mango adds sweet freshness to the plate. | When the containing UI component renders | generic | keep | Mango adds sweet freshness to the plate. |
| frontend/app.js:2335 | General UI | Coconut softens the cucumber crunch. | When the containing UI component renders | generic | keep | Coconut softens the cucumber crunch. |
| frontend/app.js:2335; frontend/mobile/mobile-shell.js:2617 | General UI | coconut cucumber salad | When the containing UI component renders | generic | keep | coconut cucumber salad |
| frontend/app.js:2336 | General UI | Chilled sweetness for slower evenings. | When the containing UI component renders | generic | keep | Chilled sweetness for slower evenings. |
| frontend/app.js:2337 | General UI | Sweet memories in every slow spoonful. | When the containing UI component renders | warm | keep | Sweet memories in every slow spoonful. |
| frontend/app.js:2338 | General UI | A festive spoonful that still feels homely. | When the containing UI component renders | warm | keep | A festive spoonful that still feels homely. |
| frontend/app.js:2339 | General UI | Cool, creamy and ready for a sweet pause. | When the containing UI component renders | generic | keep | Cool, creamy and ready for a sweet pause. |
| frontend/app.js:2340 | General UI | Slow milk sweetness for unhurried evenings. | When the containing UI component renders | generic | keep | Slow milk sweetness for unhurried evenings. |
| frontend/app.js:2341 | General UI | Soft rice sweetness after a simple meal. | When the containing UI component renders | generic | keep | Soft rice sweetness after a simple meal. |
| frontend/app.js:2342 | General UI | A neat sweet for gifting and sharing. | When the containing UI component renders | generic | keep | A neat sweet for gifting and sharing. |
| frontend/app.js:2343 | General UI | Nutty sweetness that tastes like home. | When the containing UI component renders | warm | keep | Nutty sweetness that tastes like home. |
| frontend/app.js:2344 | General UI | Tiny pearls of sweetness for celebrations. | When the containing UI component renders | generic | keep | Tiny pearls of sweetness for celebrations. |
| frontend/app.js:2345 | General UI | Coconut keeps this sweet soft and simple. | When the containing UI component renders | generic | keep | Coconut keeps this sweet soft and simple. |
| frontend/app.js:2346 | General UI | dry fruit ladoo | When the containing UI component renders | generic | keep | dry fruit ladoo |
| frontend/app.js:2346 | General UI | A small sweet bite with extra richness. | When the containing UI component renders | generic | keep | A small sweet bite with extra richness. |
| frontend/app.js:2348 | General UI | A playful sweet for modern cravings. | When the containing UI component renders | playful | keep | A playful sweet for modern cravings. |
| frontend/app.js:2349 | General UI | Soft, warm and impossible to stop at one. | When the containing UI component renders | warm | keep | Soft, warm and impossible to stop at one. |
| frontend/app.js:2386 | General UI | sweet corn soup | When the containing UI component renders | generic | keep | sweet corn soup |
| frontend/app.js:2397 | General UI | Sesame sweetness for winter celebrations. | When the containing UI component renders | generic | keep | Sesame sweetness for winter celebrations. |
| frontend/app.js:2398 | General UI | A festive mix made for sharing handfuls. | When the containing UI component renders | generic | keep | A festive mix made for sharing handfuls. |
| frontend/app.js:2399 | General UI | Sweet pongal brings harvest warmth home. | When the containing UI component renders | warm | keep | Sweet pongal brings harvest warmth home. |
| frontend/app.js:2400 | General UI | Soft pongal balances festive sweet plates. | When the containing UI component renders | generic | keep | Soft pongal balances festive sweet plates. |
| frontend/app.js:2401 | General UI | A warm sweet flatbread for family meals. | When the containing UI component renders | warm | keep | A warm sweet flatbread for family meals. |
| frontend/app.js:2402 | General UI | Every spoon carries the festival flavors. | When the containing UI component renders | generic | keep | Every spoon carries the festival flavors. |
| frontend/app.js:2403 | General UI | Mango gives festive rice a seasonal tang. | When the containing UI component renders | generic | keep | Mango gives festive rice a seasonal tang. |
| frontend/app.js:2404 | General UI | Vegetables and coconut make a sadya classic. | When the containing UI component renders | generic | keep | Vegetables and coconut make a sadya classic. |
| frontend/app.js:2416 | General UI | Steamed modaks with a soft jaggery center. | Visible action label when the control is available | generic | keep | Steamed modaks with a soft jaggery center. |
| frontend/app.js:2417 | General UI | Spiced cake that tastes like holiday evenings. | Visible action label when the control is available | generic | keep | Spiced cake that tastes like holiday evenings. |
| frontend/app.js:2418 | General UI | Crisp floral cookies for festive tins. | Visible action label when the control is available | helpful | keep | Crisp floral cookies for festive tins. |
| frontend/app.js:2419 | General UI | Tiny fried curls made for Christmas sharing. | Visible action label when the control is available | generic | keep | Tiny fried curls made for Christmas sharing. |
| frontend/app.js:2420 | General UI | Coconut sweetness with a soft chewy bite. | Visible action label when the control is available | generic | keep | Coconut sweetness with a soft chewy bite. |
| frontend/app.js:2421 | General UI | Colorful almond sweets for festive gifting. | Visible action label when the control is available | generic | keep | Colorful almond sweets for festive gifting. |
| frontend/app.js:2426 | General UI | Soft texture for easier feeding days. | When the containing UI component renders | generic | keep | Soft texture for easier feeding days. |
| frontend/app.js:2426 | General UI | A small bowl for patient little bites. | When the containing UI component renders | generic | keep | A small bowl for patient little bites. |
| frontend/app.js:2426 | General UI | Gentle enough for early meal practice. | When the containing UI component renders | generic | keep | Gentle enough for early meal practice. |
| frontend/app.js:2427 | General UI | Easy to pack and easy to finish. | When the containing UI component renders | generic | keep | Easy to pack and easy to finish. |
| frontend/app.js:2427 | General UI | Stays friendly even after a few hours. | When the containing UI component renders | generic | keep | Stays friendly even after a few hours. |
| frontend/app.js:2427 | General UI | Keeps lunch simple for busy school days. | When the containing UI component renders | generic | keep | Keeps lunch simple for busy school days. |
| frontend/app.js:2796 | General UI | Grains & Dals | When the containing UI component renders | generic | keep | Grains & Dals |
| frontend/app.js:4734 | General UI | Pairs well with | When the containing UI component renders | generic | keep | Pairs well with |
| frontend/app.js:649; frontend/app.js:672; frontend/app.js:838; frontend/app.js:2016; frontend/mobile/mobile-shell.js:2646 | General UI | rice moong khichdi | When the containing UI component renders | generic | keep | rice moong khichdi |
| frontend/app.js:713; frontend/mobile/mobile-shell.js:3326 | General UI | soya chunks curry | When the containing UI component renders | generic | keep | soya chunks curry |
| frontend/app.js:721; frontend/app.js:1042; frontend/mobile/mobile-shell.js:3319 | General UI | chicken fried rice | When the containing UI component renders | generic | keep | chicken fried rice |
| frontend/app.js:729 | General UI | kolhapuri misal pav | When the containing UI component renders | generic | keep | kolhapuri misal pav |
| frontend/app.js:733 | General UI | chingri malai curry | When the containing UI component renders | generic | keep | chingri malai curry |
| frontend/app.js:747 | General UI | luchi aloor dom | When the containing UI component renders | generic | keep | luchi aloor dom |
| frontend/app.js:749 | General UI | chow chow kootu | When the containing UI component renders | generic | keep | chow chow kootu |
| frontend/app.js:755; frontend/app.js:1034; frontend/mobile/mobile-shell.js:256; frontend/mobile/mobile-shell.js:265 | General UI | spicy aloo paratha | When the containing UI component renders | generic | keep | spicy aloo paratha |
| frontend/app.js:757; frontend/mobile/mobile-shell.js:265 | General UI | andhra podi idli | When the containing UI component renders | generic | keep | andhra podi idli |
| frontend/app.js:762; frontend/mobile/mobile-shell.js:256; frontend/mobile/mobile-shell.js:2608 | General UI | spicy masala dosa | When the containing UI component renders | generic | keep | spicy masala dosa |
| frontend/app.js:771; frontend/mobile/mobile-shell.js:265; frontend/mobile/mobile-shell.js:268; frontend/mobile/mobile-shell.js:318; frontend/mobile/mobile-shell.js:2511; frontend/mobile/mobile-shell.js:5141 | General UI | andhra chicken curry | When the containing UI component renders | generic | keep | andhra chicken curry |
| frontend/app.js:779; frontend/mobile/mobile-shell.js:2540; frontend/mobile/mobile-shell.js:3314 | General UI | egg curry rice | When the containing UI component renders | generic | keep | egg curry rice |
| frontend/app.js:780; frontend/mobile/mobile-shell.js:2547; frontend/mobile/mobile-shell.js:3315; frontend/mobile/mobile-shell.js:5116 | General UI | fish curry rice | When the containing UI component renders | generic | keep | fish curry rice |
| frontend/app.js:784 | General UI | paneer tikka masala | When the containing UI component renders | generic | keep | paneer tikka masala |
| frontend/app.js:788; frontend/mobile/mobile-shell.js:2561; frontend/mobile/mobile-shell.js:5116; frontend/mobile/mobile-shell.js:5143 | General UI | kerala fish curry | When the containing UI component renders | generic | keep | kerala fish curry |
| frontend/app.js:796; frontend/app.js:1040; frontend/app.js:2267 | General UI | egg fried rice | When the containing UI component renders | generic | keep | egg fried rice |
| frontend/app.js:799 | General UI | guntur chilli chicken | When the containing UI component renders | generic | keep | guntur chilli chicken |
| frontend/app.js:809; frontend/mobile/mobile-shell.js:318; frontend/mobile/mobile-shell.js:2580 | General UI | mirchi ka salan | When the containing UI component renders | generic | keep | mirchi ka salan |
| frontend/app.js:812; frontend/mobile/mobile-shell.js:2496 | General UI | nattu kozhi curry | When the containing UI component renders | generic | keep | nattu kozhi curry |
| frontend/app.js:816 | General UI | prawn ghee roast | When the containing UI component renders | generic | keep | prawn ghee roast |
| frontend/app.js:819; frontend/mobile/mobile-shell.js:318; frontend/mobile/mobile-shell.js:2605 | General UI | schezwan fried rice | When the containing UI component renders | generic | keep | schezwan fried rice |
| frontend/app.js:820; frontend/mobile/mobile-shell.js:2655 | General UI | smoked pork rice | When the containing UI component renders | generic | keep | smoked pork rice |
| frontend/desktop-reference.html:119 | General UI | Nothing beats comfort food. Hope you find your favorite. | When the containing UI component renders | warm | keep | Nothing beats comfort food. Hope you find your favorite. |
| frontend/mobile/mobile-shell.js:106; frontend/mobile/mobile-shell.js:107; frontend/mobile/mobile-shell.js:109; frontend/mobile/mobile-shell.js:3046; frontend/mobile/mobile-shell.js:3052; frontend/mobile/mobile-shell.js:3063 | General UI | Sweets & Drinks | When the containing UI component renders | generic | keep | Sweets & Drinks |
| frontend/mobile/mobile-shell.js:106; frontend/mobile/mobile-shell.js:3037; frontend/mobile/mobile-shell.js:3043 | General UI | Breakfast & Tiffin | When the containing UI component renders | generic | keep | Breakfast & Tiffin |
| frontend/mobile/mobile-shell.js:106; frontend/mobile/mobile-shell.js:3044 | General UI | Rasam, Kuzhambu & Kootu | When the containing UI component renders | generic | keep | Rasam, Kuzhambu & Kootu |
| frontend/mobile/mobile-shell.js:106; frontend/mobile/mobile-shell.js:3047 | General UI | Meals & Mains | When the containing UI component renders | generic | keep | Meals & Mains |
| frontend/mobile/mobile-shell.js:107; frontend/mobile/mobile-shell.js:3053 | General UI | Curries & Mains | When the containing UI component renders | generic | keep | Curries & Mains |
| frontend/mobile/mobile-shell.js:108; frontend/mobile/mobile-shell.js:3057 | General UI | Fish & Mains | When the containing UI component renders | generic | keep | Fish & Mains |
| frontend/mobile/mobile-shell.js:108; frontend/mobile/mobile-shell.js:3058 | General UI | Comfort Plates | When the containing UI component renders | warm | keep | Comfort Plates |
| frontend/mobile/mobile-shell.js:109; frontend/mobile/mobile-shell.js:3060 | General UI | Breakfast & Street Food | When the containing UI component renders | generic | keep | Breakfast & Street Food |
| frontend/mobile/mobile-shell.js:109; frontend/mobile/mobile-shell.js:3061 | General UI | Seafood & Konkan | When the containing UI component renders | generic | keep | Seafood & Konkan |
| frontend/mobile/mobile-shell.js:109; frontend/mobile/mobile-shell.js:3064 | General UI | Mains & Bhakri Plates | When the containing UI component renders | generic | keep | Mains & Bhakri Plates |
| frontend/mobile/mobile-shell.js:110; frontend/mobile/mobile-shell.js:3068 | General UI | Greens & Sides | Visible action label when the control is available | generic | keep | Greens & Sides |
| frontend/mobile/mobile-shell.js:110; frontend/mobile/mobile-shell.js:3069 | General UI | Smoked & Fermented | Visible action label when the control is available | generic | keep | Smoked & Fermented |
| frontend/mobile/mobile-shell.js:110; frontend/mobile/mobile-shell.js:3070 | General UI | Rice, Stews & Mains | Visible action label when the control is available | generic | keep | Rice, Stews & Mains |
| frontend/mobile/mobile-shell.js:111; frontend/mobile/mobile-shell.js:3071 | General UI | Regional Journeys::North & West India | Visible action label when the control is available | warm | keep | Regional Journeys::North & West India |
| frontend/mobile/mobile-shell.js:111; frontend/mobile/mobile-shell.js:3074 | General UI | Street Food & Snacks | Visible action label when the control is available | generic | keep | Street Food & Snacks |
| frontend/mobile/mobile-shell.js:111; frontend/mobile/mobile-shell.js:3075 | General UI | Breads & Rice Plates | Visible action label when the control is available | generic | keep | Breads & Rice Plates |
| frontend/mobile/mobile-shell.js:111; frontend/mobile/mobile-shell.js:3076 | General UI | Comfort Mains | Visible action label when the control is available | warm | keep | Comfort Mains |
| frontend/mobile/mobile-shell.js:112; frontend/mobile/mobile-shell.js:3077 | General UI | Regional Journeys::Jammu & Kashmir | Visible action label when the control is available | warm | keep | Regional Journeys::Jammu & Kashmir |
| frontend/mobile/mobile-shell.js:112; frontend/mobile/mobile-shell.js:3080 | General UI | Rice & Breads | Visible action label when the control is available | generic | keep | Rice & Breads |
| frontend/mobile/mobile-shell.js:112; frontend/mobile/mobile-shell.js:3081 | General UI | Wazwan & Mains | Visible action label when the control is available | generic | keep | Wazwan & Mains |
| frontend/mobile/mobile-shell.js:2420 | General UI | black urad dal | When the containing UI component renders | generic | keep | black urad dal |
| frontend/mobile/mobile-shell.js:2491 | General UI | paneer capsicum rice bowl | When the containing UI component renders | generic | keep | paneer capsicum rice bowl |
| frontend/mobile/mobile-shell.js:2492 | General UI | paneer corn rice bowl | When the containing UI component renders | generic | keep | paneer corn rice bowl |
| frontend/mobile/mobile-shell.js:2493 | General UI | tomato paneer rice | When the containing UI component renders | generic | keep | tomato paneer rice |
| frontend/mobile/mobile-shell.js:2495 | General UI | chicken egg rice bowl | When the containing UI component renders | generic | keep | chicken egg rice bowl |
| frontend/mobile/mobile-shell.js:2507 | General UI | cheese veg sandwich | When the containing UI component renders | generic | keep | cheese veg sandwich |
| frontend/mobile/mobile-shell.js:2509 | General UI | aloo capsicum sabzi | When the containing UI component renders | generic | keep | aloo capsicum sabzi |
| frontend/mobile/mobile-shell.js:2516 | General UI | assamese duck curry | When the containing UI component renders | generic | keep | assamese duck curry |
| frontend/mobile/mobile-shell.js:2527 | General UI | chicken capsicum stir fry bowl | When the containing UI component renders | generic | keep | chicken capsicum stir fry bowl |
| frontend/mobile/mobile-shell.js:2530 | General UI | chicken mushroom stir fry | When the containing UI component renders | generic | keep | chicken mushroom stir fry |
| frontend/mobile/mobile-shell.js:2531 | General UI | chicken pepper rice bowl | When the containing UI component renders | generic | keep | chicken pepper rice bowl |
| frontend/mobile/mobile-shell.js:2533; frontend/mobile/mobile-shell.js:5141 | General UI | chicken tomato rice | When the containing UI component renders | generic | keep | chicken tomato rice |
| frontend/mobile/mobile-shell.js:2541 | General UI | egg capsicum bhurji | When the containing UI component renders | generic | keep | egg capsicum bhurji |
| frontend/mobile/mobile-shell.js:2544; frontend/mobile/mobile-shell.js:5147 | General UI | egg tomato rice bowl | When the containing UI component renders | generic | keep | egg tomato rice bowl |
| frontend/mobile/mobile-shell.js:2549 | General UI | garlic egg rice | When the containing UI component renders | generic | keep | garlic egg rice |
| frontend/mobile/mobile-shell.js:2550 | General UI | goan fish curry | When the containing UI component renders | generic | keep | goan fish curry |
| frontend/mobile/mobile-shell.js:2551 | General UI | goan prawn balchao | When the containing UI component renders | generic | keep | goan prawn balchao |
| frontend/mobile/mobile-shell.js:2560 | General UI | kerala egg roast | When the containing UI component renders | generic | keep | kerala egg roast |
| frontend/mobile/mobile-shell.js:2565 | General UI | lai xaak bhaji | When the containing UI component renders | generic | keep | lai xaak bhaji |
| frontend/mobile/mobile-shell.js:2581; frontend/mobile/mobile-shell.js:3307 | General UI | moong dal chilla | When the containing UI component renders | generic | keep | moong dal chilla |
| frontend/mobile/mobile-shell.js:2583 | General UI | mushroom pepper rice bowl | When the containing UI component renders | generic | keep | mushroom pepper rice bowl |
| frontend/mobile/mobile-shell.js:2588 | General UI | one pot dal palak rice | When the containing UI component renders | generic | keep | one pot dal palak rice |
| frontend/mobile/mobile-shell.js:2624; frontend/mobile/mobile-shell.js:5152 | General UI | veg fried rice | When the containing UI component renders | generic | keep | veg fried rice |
| frontend/mobile/mobile-shell.js:2650 | General UI | bamboo shoot pork | When the containing UI component renders | generic | keep | bamboo shoot pork |
| frontend/mobile/mobile-shell.js:2657 | General UI | chicken potato curry | When the containing UI component renders | generic | keep | chicken potato curry |
| frontend/mobile/mobile-shell.js:3038 | General UI | Pappu, Pulusu & Rasam | When the containing UI component renders | generic | keep | Pappu, Pulusu & Rasam |
| frontend/mobile/mobile-shell.js:3042 | General UI | Regional Journeys::Tamil Nadu | When the containing UI component renders | warm | keep | Regional Journeys::Tamil Nadu |
| frontend/mobile/mobile-shell.js:3082 | General UI | Everyday Cooking::Daily Comforts | Visible action label when the control is available | helpful | keep | Everyday Cooking::Daily Comforts |
| frontend/mobile/mobile-shell.js:3084 | General UI | Rice & Dal Meals | Visible action label when the control is available | generic | keep | Rice & Dal Meals |
| frontend/mobile/mobile-shell.js:3086 | General UI | Simple Dinner Ideas | Visible action label when the control is available | generic | keep | Simple Dinner Ideas |
| frontend/mobile/mobile-shell.js:3087 | General UI | Everyday Cooking::Tea Time Favourites | Visible action label when the control is available | helpful | keep | Everyday Cooking::Tea Time Favourites |
| frontend/mobile/mobile-shell.js:3117 | General UI | Toast & Bakery | When the containing UI component renders | generic | keep | Toast & Bakery |
| frontend/mobile/mobile-shell.js:3121 | General UI | Global Bites::Global Bowls | When the containing UI component renders | generic | keep | Global Bites::Global Bowls |
| frontend/mobile/mobile-shell.js:3126 | General UI | Global Bites::Global Mains | When the containing UI component renders | generic | keep | Global Bites::Global Mains |
| frontend/mobile/mobile-shell.js:3127 | General UI | Fried Rice & Indo-Chinese | When the containing UI component renders | generic | keep | Fried Rice & Indo-Chinese |
| frontend/mobile/mobile-shell.js:3131 | General UI | Global Bites::Global Snacks | When the containing UI component renders | generic | keep | Global Bites::Global Snacks |
| frontend/mobile/mobile-shell.js:3133 | General UI | Wraps & Rolls | When the containing UI component renders | generic | keep | Wraps & Rolls |
| frontend/mobile/mobile-shell.js:3134 | General UI | Dips & Plates | When the containing UI component renders | generic | keep | Dips & Plates |
| frontend/mobile/mobile-shell.js:3146 | General UI | Kitchen Essentials::Sides, Salads & Add-ons | When the containing UI component renders | generic | keep | Kitchen Essentials::Sides, Salads & Add-ons |
| frontend/mobile/mobile-shell.js:3147 | General UI | Raitas & Cooling Sides | When the containing UI component renders | generic | keep | Raitas & Cooling Sides |
| frontend/mobile/mobile-shell.js:3148 | General UI | Salads & Fresh Sides | When the containing UI component renders | generic | keep | Salads & Fresh Sides |
| frontend/mobile/mobile-shell.js:3149 | General UI | Sundals & Add-ons | When the containing UI component renders | generic | keep | Sundals & Add-ons |
| frontend/mobile/mobile-shell.js:3150 | General UI | Palyas, Poriyals & Thorans | When the containing UI component renders | generic | keep | Palyas, Poriyals & Thorans |
| frontend/mobile/mobile-shell.js:3151 | General UI | Kitchen Essentials::Chutneys, Podis & Condiments | When the containing UI component renders | generic | keep | Kitchen Essentials::Chutneys, Podis & Condiments |
| frontend/mobile/mobile-shell.js:3171 | General UI | Celebrations & Traditions::Regional Sweets | When the containing UI component renders | generic | keep | Celebrations & Traditions::Regional Sweets |
| frontend/mobile/mobile-shell.js:3174 | General UI | South Indian Sweets | When the containing UI component renders | generic | keep | South Indian Sweets |
| frontend/mobile/mobile-shell.js:3175 | General UI | North Indian Sweets | When the containing UI component renders | generic | keep | North Indian Sweets |
| frontend/mobile/mobile-shell.js:3176 | General UI | Celebrations & Traditions::Everyday Desserts | When the containing UI component renders | generic | keep | Celebrations & Traditions::Everyday Desserts |
| frontend/mobile/mobile-shell.js:3307 | General UI | Lentil chilla for steady morning protein. | When the containing UI component renders | generic | keep | Lentil chilla for steady morning protein. |
| frontend/mobile/mobile-shell.js:3308 | General UI | Onion omelette for a simple protein breakfast. | When the containing UI component renders | generic | keep | Onion omelette for a simple protein breakfast. |
| frontend/mobile/mobile-shell.js:3309 | General UI | Kadala and puttu for a filling protein start. | When the containing UI component renders | generic | keep | Kadala and puttu for a filling protein start. |
| frontend/mobile/mobile-shell.js:3311 | General UI | Post Workout Meals | When the containing UI component renders | generic | keep | Post Workout Meals |
| frontend/mobile/mobile-shell.js:3312 | General UI | Protein-rich curry for recovery. | When the containing UI component renders | generic | keep | Protein-rich curry for recovery. |
| frontend/mobile/mobile-shell.js:3313 | General UI | Gentle chicken for lighter recovery. | When the containing UI component renders | generic | keep | Gentle chicken for lighter recovery. |
| frontend/mobile/mobile-shell.js:3314 | General UI | Egg curry with steady carbs. | When the containing UI component renders | generic | keep | Egg curry with steady carbs. |
| frontend/mobile/mobile-shell.js:3315 | General UI | Fish and rice after training. | When the containing UI component renders | generic | keep | Fish and rice after training. |
| frontend/mobile/mobile-shell.js:3316 | General UI | Chicken and rice for a filling recovery meal. | When the containing UI component renders | generic | keep | Chicken and rice for a filling recovery meal. |
| frontend/mobile/mobile-shell.js:3317 | General UI | Bold chicken protein for active days. | When the containing UI component renders | generic | keep | Bold chicken protein for active days. |
| frontend/mobile/mobile-shell.js:3318 | General UI | Crisp fish protein with big flavor. | When the containing UI component renders | generic | keep | Crisp fish protein with big flavor. |
| frontend/mobile/mobile-shell.js:3319 | General UI | Chicken rice bowl for quick recovery. | When the containing UI component renders | generic | keep | Chicken rice bowl for quick recovery. |
| frontend/mobile/mobile-shell.js:3322 | General UI | Spinach and paneer strength bowl. | When the containing UI component renders | generic | keep | Spinach and paneer strength bowl. |
| frontend/mobile/mobile-shell.js:3323 | General UI | Rajma and rice for plant recovery. | When the containing UI component renders | generic | keep | Rajma and rice for plant recovery. |
| frontend/mobile/mobile-shell.js:3324 | General UI | Chickpea rice for steady energy. | When the containing UI component renders | generic | keep | Chickpea rice for steady energy. |
| frontend/mobile/mobile-shell.js:3325 | General UI | Slow dal comfort with protein. | When the containing UI component renders | warm | keep | Slow dal comfort with protein. |
| frontend/mobile/mobile-shell.js:3326 | General UI | Soya curry for a strong vegetarian plate. | When the containing UI component renders | generic | keep | Soya curry for a strong vegetarian plate. |
| frontend/mobile/mobile-shell.js:3327 | General UI | Sprouted pulses for light protein. | When the containing UI component renders | generic | keep | Sprouted pulses for light protein. |
| frontend/mobile/mobile-shell.js:3328 | General UI | Paneer and peas for a hearty vegetarian meal. | When the containing UI component renders | generic | keep | Paneer and peas for a hearty vegetarian meal. |
| frontend/mobile/mobile-shell.js:3329 | General UI | Paneer curry with complete meal energy. | When the containing UI component renders | generic | keep | Paneer curry with complete meal energy. |
| frontend/mobile/mobile-shell.js:3332 | General UI | Paneer bites for snack protein. | When the containing UI component renders | generic | keep | Paneer bites for snack protein. |
| frontend/mobile/mobile-shell.js:3333 | General UI | Paneer snack with bold flavor. | When the containing UI component renders | generic | keep | Paneer snack with bold flavor. |
| frontend/mobile/mobile-shell.js:3334 | General UI | Roasted Chana Chaat | When the containing UI component renders | generic | keep | Roasted Chana Chaat |
| frontend/mobile/mobile-shell.js:3334 | General UI | Crunchy chana for a protein snack. | When the containing UI component renders | generic | keep | Crunchy chana for a protein snack. |
| frontend/mobile/mobile-shell.js:3335 | General UI | Paneer snack for a filling bite. | When the containing UI component renders | generic | keep | Paneer snack for a filling bite. |
| frontend/mobile/mobile-shell.js:3336 | General UI | Chicken snack with bold protein. | When the containing UI component renders | generic | keep | Chicken snack with bold protein. |
| frontend/mobile/mobile-shell.js:3337 | General UI | Crisp chicken bites for a protein snack. | When the containing UI component renders | generic | keep | Crisp chicken bites for a protein snack. |
| frontend/mobile/mobile-shell.js:3338 | General UI | Chicken snack for active-day cravings. | When the containing UI component renders | playful | keep | Chicken snack for active-day cravings. |
| frontend/mobile/mobile-shell.js:3461 | General UI | sweet potato chaat | When the containing UI component renders | generic | keep | sweet potato chaat |
| frontend/mobile/mobile-shell.js:3474 | General UI | Sundals & Extras | When the containing UI component renders | generic | keep | Sundals & Extras |
| frontend/mobile/mobile-shell.js:3977 | General UI | Add an item... | When the containing UI component renders | too much | improve | Add an item. |
| frontend/mobile/mobile-shell.js:4013 | General UI | Remove {dynamic value} | When the containing UI component renders | generic | keep | Remove {dynamic value} |
| frontend/mobile/mobile-shell.js:4241 | General UI | not for me | When the containing UI component renders | generic | keep | not for me |
| frontend/mobile/mobile-shell.js:4425 | General UI | Dish name / request | When the containing UI component renders | generic | keep | Dish name / request |
| frontend/mobile/mobile-shell.js:4425 | General UI | Dish name or request | When the containing UI component renders | generic | keep | Dish name or request |
| frontend/mobile/mobile-shell.js:4425 | General UI | Tell us what to fix or add... | When the containing UI component renders | too much | improve | Tell us what to fix or add. |
| frontend/mobile/mobile-shell.js:6040 | General UI | Please add a short message. | When the containing UI component renders | helpful | keep | Please add a short message. |
| frontend/mobile/mobile-shell.js:6411 | General UI | Shopping list shared. | When the containing UI component renders | generic | keep | Shopping list shared. |
| frontend/mobile/mobile-shell.js:6420 | General UI | Shopping list copied. | When the containing UI component renders | generic | keep | Shopping list copied. |
| frontend/mobile/mobile-shell.js:6420 | General UI | Could not share shopping list. | When the containing UI component renders | generic | keep | Could not share shopping list. |
| frontend/mobile/mobile-shell.js:77 | General UI | Street snacks, coastal dishes and daily comforts. | When the containing UI component renders | warm | keep | Street snacks, coastal dishes and daily comforts. |
| frontend/mobile/mobile-shell.js:78 | General UI | Distinctive bowls, stews and regional anchors. | When the containing UI component renders | generic | keep | Distinctive bowls, stews and regional anchors. |
| frontend/mobile/mobile-shell.js:79 | General UI | North & West India | When the containing UI component renders | generic | keep | North & West India |
| frontend/mobile/mobile-shell.js:79 | General UI | Home classics from northern and western kitchens. | When the containing UI component renders | warm | keep | Home classics from northern and western kitchens. |
| frontend/mobile/mobile-shell.js:80 | General UI | Jammu & Kashmir | When the containing UI component renders | generic | keep | Jammu & Kashmir |
| frontend/mobile/mobile-shell.js:80 | General UI | Kashmiri and Himalayan comfort dishes. | When the containing UI component renders | warm | keep | Kashmiri and Himalayan comfort dishes. |
| frontend/app.js:2428 | Recommendation | A calming sip for a slower moment. | When the containing UI component renders | generic | keep | A calming sip for a slower moment. |
| frontend/app.js:2428 | Recommendation | Works well when the day needs cooling. | When the containing UI component renders | generic | keep | Works well when the day needs cooling. |
| frontend/app.js:2428 | Recommendation | A simple drink for between-meal comfort. | When the containing UI component renders | warm | keep | A simple drink for between-meal comfort. |
| frontend/app.js:2429 | Recommendation | Adds freshness without making the meal heavy. | When the containing UI component renders | generic | keep | Adds freshness without making the meal heavy. |
| frontend/app.js:2429 | Recommendation | Useful when the plate needs crunch and color. | When the containing UI component renders | generic | keep | Useful when the plate needs crunch and color. |
| frontend/app.js:2429 | Recommendation | Keeps the meal light but still interesting. | When the containing UI component renders | generic | keep | Keeps the meal light but still interesting. |
| frontend/app.js:2430 | Recommendation | A small sweet pause after a homemade meal. | When the containing UI component renders | warm | keep | A small sweet pause after a homemade meal. |
| frontend/app.js:2430 | Recommendation | Good for sharing without making dessert fussy. | When the containing UI component renders | generic | keep | Good for sharing without making dessert fussy. |
| frontend/app.js:2430 | Recommendation | Brings a gentle finish to the table. | When the containing UI component renders | generic | keep | Brings a gentle finish to the table. |
| frontend/app.js:2431 | Recommendation | Warm enough for dinner, light enough for comfort. | When the containing UI component renders | warm | keep | Warm enough for dinner, light enough for comfort. |
| frontend/app.js:2431 | Recommendation | A quiet bowl when you want food to feel easy. | When the containing UI component renders | generic | keep | A quiet bowl when you want food to feel easy. |
| frontend/app.js:2431 | Recommendation | Useful when the evening needs something soft. | When the containing UI component renders | generic | keep | Useful when the evening needs something soft. |
| frontend/app.js:2432 | Recommendation | Made for sharing around a festive table. | When the containing UI component renders | generic | keep | Made for sharing around a festive table. |
| frontend/app.js:4559 | Recommendation | Dosa & Idli | When the containing UI component renders | generic | keep | Dosa & Idli |
| frontend/app.js:626 | Recommendation | andhra podi idli | When the containing UI component renders | generic | keep | andhra podi idli |
| frontend/app.js:627 | Recommendation | spicy masala dosa | When the containing UI component renders | generic | keep | spicy masala dosa |
| frontend/app.js:628 | Recommendation | spicy aloo paratha | When the containing UI component renders | generic | keep | spicy aloo paratha |
| frontend/app.js:649 | Recommendation | rice moong khichdi | When the containing UI component renders | generic | keep | rice moong khichdi |
| frontend/mobile/mobile-shell.js:1280 | Recommendation | matches vegetarian preference | When the containing UI component renders | helpful | keep | matches vegetarian preference |
| frontend/mobile/mobile-shell.js:1298 | Recommendation | often cooks {dynamic value} dishes | Visible action label when the control is available | helpful | keep | often cooks {dynamic value} dishes |
| frontend/mobile/mobile-shell.js:1299 | Recommendation | matches favorite regional patterns | Visible action label when the control is available | helpful | keep | matches favorite regional patterns |
| frontend/mobile/mobile-shell.js:1302 | Recommendation | helpful feedback on similar recipes | Visible action label when the control is available | generic | keep | helpful feedback on similar recipes |
| frontend/mobile/mobile-shell.js:1303 | Recommendation | dismissed similar dishes recently | When the containing UI component renders | generic | keep | dismissed similar dishes recently |
| frontend/mobile/mobile-shell.js:2592 | Recommendation | paneer tikka masala | When the containing UI component renders | generic | keep | paneer tikka masala |
| frontend/mobile/mobile-shell.js:2596 | Recommendation | prawn ghee roast | When the containing UI component renders | generic | keep | prawn ghee roast |
| frontend/mobile/mobile-shell.js:946; frontend/mobile/mobile-shell.js:5410 | Recommendation | No Match | When the containing UI component renders | helpful | keep | No Match |

## Empty state banters

| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |
|---|---|---|---|---|---|---|
| frontend/app.js:1580 | Empty state | No recipes found for this meal yet. | When the related list or state is empty | generic | keep | No recipes found for this meal yet. |
| frontend/app.js:1624 | Empty state | You haven't cooked anything yet. Start with a Tomo recommendation today. | When the related list or state is empty | helpful | keep | You haven't cooked anything yet. Start with a Tomo recommendation today. |
| frontend/app.js:1690 | Empty state | No cooking memories yet. Cook a dish and it will appear here. | When the related list or state is empty | helpful | keep | No cooking memories yet. Cook a dish and it will appear here. |
| frontend/app.js:221 | Empty state | No strong match yet. Try adding onion, chilli, garlic, or curry leaves. | When no valid recommendation clears the confidence threshold | helpful | keep | No strong match yet. Try adding onion, chilli, garlic, or curry leaves. |
| frontend/app.js:3987 | Empty state | No strong match yet. Try another ingredient from your pantry. | When no valid recommendation clears the confidence threshold | helpful | keep | No strong match yet. Try another ingredient from your pantry. |
| frontend/app.js:4238; frontend/app.js:4303; frontend/app.js:4311; frontend/app.js:4318; frontend/app.js:4339 | Empty state | No strong match yet | When no valid recommendation clears the confidence threshold | helpful | keep | No strong match yet |
| frontend/app.js:4864 | Empty state | No items waiting. Purchased items are listed below. | Visible action label when the control is available | generic | keep | No items waiting. Purchased items are listed below. |
| frontend/app.js:4954 | Empty state | No dishes found yet. | When the related list or state is empty | generic | keep | No dishes found yet. |
| frontend/app.js:4955 | Empty state | No matching ingredients yet. | When the related list or state is empty | helpful | keep | No matching ingredients yet. |
| frontend/app.js:4956 | Empty state | No collections found yet. | When the related list or state is empty | generic | keep | No collections found yet. |
| frontend/mobile/mobile-shell.js:1815 | Empty state | Low-fuss backup when pantry is empty. | When a mood is displayed or selected | generic | keep | Low-fuss backup when pantry is empty. |
| frontend/mobile/mobile-shell.js:3700 | Empty state | No dishes found for this meal yet. | When the related list or state is empty | generic | keep | No dishes found for this meal yet. |
| frontend/mobile/mobile-shell.js:3740 | Empty state | ⚡ Micro Meals | Visible action label when the control is available | generic | keep | ⚡ Micro Meals |
| frontend/mobile/mobile-shell.js:3740 | Empty state | Quick ideas to fuel your day | Visible action label when the control is available | generic | keep | Quick ideas to fuel your day |
| frontend/mobile/mobile-shell.js:3746 | Empty state | No micro ideas right now. | Visible action label when the control is available | generic | keep | No micro ideas right now. |
| frontend/mobile/mobile-shell.js:3907 | Empty state | No matches yet. Try another word. | When the related list or state is empty | helpful | keep | No matches yet. Try another word. |
| frontend/mobile/mobile-shell.js:3977 | Empty state | No items yet. | After one pantry ingredient is selected | generic | keep | No items yet. |
| frontend/mobile/mobile-shell.js:4519 | Empty state | No generated collections here yet. | When the related list or state is empty | generic | keep | No generated collections here yet. |
| frontend/mobile/mobile-shell.js:4528 | Empty state | No dishes here yet. | When the related list or state is empty | generic | keep | No dishes here yet. |
| frontend/mobile/mobile-shell.js:5503 | Empty state | No strong matches yet. Try adding one more ingredient. | When no valid recommendation clears the confidence threshold | helpful | keep | No strong matches yet. Try adding one more ingredient. |

## Dish detail banters

| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |
|---|---|---|---|---|---|---|
| frontend/app.js:1212 | Dish detail modal | Tomo Favorite | Visible action label when the control is available | generic | keep | Tomo Favorite |
| frontend/app.js:412 | Dish detail modal | Sprouted Moong Salad | When the corresponding recipe detail is opened | generic | keep | Sprouted Moong Salad |
| frontend/app.js:413 | Dish detail modal | Light, protein-friendly sprouts with onion, tomato, chilli, and lime. | When the corresponding recipe detail is opened | generic | keep | Light, protein-friendly sprouts with onion, tomato, chilli, and lime. |
| frontend/app.js:417 | Dish detail modal | Cucumber Peanut Salad | When the corresponding recipe detail is opened | generic | keep | Cucumber Peanut Salad |
| frontend/app.js:4734; frontend/mobile/mobile-shell.js:1416 | Dish detail modal | Pairs Well With | When a dish detail modal is open | generic | keep | Pairs Well With |
| frontend/app.js:4753 | Dish detail modal | Serves {dynamic value} | When a dish detail modal is open | generic | keep | Serves {dynamic value} |
| frontend/app.js:4754 | Dish detail modal | Prep {dynamic value} | When a dish detail modal is open | helpful | keep | Prep {dynamic value} |
| frontend/app.js:4755 | Dish detail modal | Cook {dynamic value} | When a dish detail modal is open | helpful | keep | Cook {dynamic value} |
| frontend/app.js:4784 | Dish detail modal | Tomo Tip | When a dish detail modal is open | generic | keep | Tomo Tip |
| frontend/app.js:5475 | Dish detail modal | Saved as favorite. | Visible action label when the control is available | generic | keep | Saved as favorite. |
| frontend/app.js:709 | Dish detail modal | roasted chana chaat | When the containing UI component renders | generic | keep | roasted chana chaat |
| frontend/mobile/mobile-shell.js:133 | Dish detail modal | Celebrations & Traditions::Prasadam & Temple Foods | When the containing UI component renders | generic | keep | Celebrations & Traditions::Prasadam & Temple Foods |
| frontend/mobile/mobile-shell.js:138 | Dish detail modal | Andhra & Telangana | When the containing UI component renders | generic | keep | Andhra & Telangana |
| frontend/mobile/mobile-shell.js:1420 | Dish detail modal | Show less | When a dish detail modal is open | generic | keep | Show less |
| frontend/mobile/mobile-shell.js:1420 | Dish detail modal | +{dynamic value} more | When a dish detail modal is open | generic | keep | +{dynamic value} more |
| frontend/mobile/mobile-shell.js:1826 | Dish detail modal | A different family, region, or flavor lane. | When the containing UI component renders | generic | keep | A different family, region, or flavor lane. |
| frontend/mobile/mobile-shell.js:1834 | Dish detail modal | Another Good Pick | When the containing UI component renders | generic | keep | Another Good Pick |
| frontend/mobile/mobile-shell.js:1835 | Dish detail modal | Still inside your meal boundary. | When the containing UI component renders | generic | keep | Still inside your meal boundary. |
| frontend/mobile/mobile-shell.js:2487 | Dish detail modal | paneer fried rice | When the containing UI component renders | generic | keep | paneer fried rice |
| frontend/mobile/mobile-shell.js:2489 | Dish detail modal | garlic paneer roti wrap | When the containing UI component renders | generic | keep | garlic paneer roti wrap |
| frontend/mobile/mobile-shell.js:2490 | Dish detail modal | corn paneer bhurji bowl | When the containing UI component renders | generic | keep | corn paneer bhurji bowl |
| frontend/mobile/mobile-shell.js:2997 | Dish detail modal | Mains & Meals | When the containing UI component renders | generic | keep | Mains & Meals |
| frontend/mobile/mobile-shell.js:2997 | Dish detail modal | Meals & Mains | When the containing UI component renders | generic | keep | Meals & Mains |
| frontend/mobile/mobile-shell.js:2997 | Dish detail modal | Comfort Mains | When the containing UI component renders | warm | keep | Comfort Mains |
| frontend/mobile/mobile-shell.js:2997 | Dish detail modal | Comfort Plates | When the containing UI component renders | warm | keep | Comfort Plates |
| frontend/mobile/mobile-shell.js:2997 | Dish detail modal | Curries & Mains | When the containing UI component renders | generic | keep | Curries & Mains |
| frontend/mobile/mobile-shell.js:4667 | Dish detail modal | ✓ You have everything listed for this dish. | When a dish detail modal is open | generic | keep | ✓ You have everything listed for this dish. |
| frontend/mobile/mobile-shell.js:6345 | Dish detail modal | Items already in Shopping List | When a dish detail modal is open | generic | keep | Items already in Shopping List |
| frontend/mobile/mobile-shell.js:76 | Dish detail modal | Fish curries, sweets and Kolkata favourites. | When the corresponding recipe detail is opened | generic | keep | Fish curries, sweets and Kolkata favourites. |

## Journal banters

| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |
|---|---|---|---|---|---|---|
| frontend/app.js:1610 | Kitchen journal | Start with a Tomo recommendation today. | After three or more pantry ingredients are selected | generic | keep | Start with a Tomo recommendation today. |
| frontend/app.js:1612 | Kitchen journal | 🍅 You’ve cooked {dynamic value} comforting meals this week. | After three or more pantry ingredients are selected | helpful | keep | 🍅 You’ve cooked {dynamic value} comforting meals this week. |
| frontend/app.js:1614 | Kitchen journal | 🍅 You seem to enjoy quick meals lately. | After three or more pantry ingredients are selected | playful | keep | 🍅 You seem to enjoy quick meals lately. |
| frontend/app.js:1615 | Kitchen journal | 🍅 {dynamic value} dishes cooked this week. | After three or more pantry ingredients are selected | helpful | keep | 🍅 {dynamic value} dishes cooked this week. |
| frontend/app.js:1623 | Kitchen journal | 📖 Tomo Journal A record of your cooking journey. | In the Tomo Journal card or modal | helpful | keep | 📖 Tomo Journal A record of your cooking journey. |
| frontend/app.js:1625 | Kitchen journal | Explore Dishes | In the Tomo Journal card or modal | generic | keep | Explore Dishes |
| frontend/app.js:1631 | Kitchen journal | 📖 Tomo Journal This Week | In the Tomo Journal card or modal | generic | keep | 📖 Tomo Journal This Week |
| frontend/app.js:1633 | Kitchen journal | View Full Journal | In the Tomo Journal card or modal | generic | keep | View Full Journal |
| frontend/app.js:1777 | Kitchen journal | ✓ Good for {dynamic value} | Visible action label when the control is available | generic | keep | ✓ Good for {dynamic value} |
| frontend/app.js:1778 | Kitchen journal | ✓ Quick recipe | Visible action label when the control is available | generic | keep | ✓ Quick recipe |
| frontend/app.js:1779 | Kitchen journal | ✓ Pantry ingredients available | Visible action label when the control is available | helpful | keep | ✓ Pantry ingredients available |
| frontend/app.js:1780 | Kitchen journal | ✓ Frequently cooked by you | Visible action label when the control is available | helpful | keep | ✓ Frequently cooked by you |
| frontend/app.js:1781 | Kitchen journal | ✓ Popular recipe | Visible action label when the control is available | generic | keep | ✓ Popular recipe |
| frontend/app.js:2405 | Kitchen journal | A gentle coconut curry for festive spreads. | Visible action label when the control is available | generic | keep | A gentle coconut curry for festive spreads. |
| frontend/app.js:2406 | Kitchen journal | Coconut vegetables add texture to the feast. | Visible action label when the control is available | helpful | keep | Coconut vegetables add texture to the feast. |
| frontend/app.js:2407 | Kitchen journal | Dal grounds the festival meal beautifully. | Visible action label when the control is available | generic | keep | Dal grounds the festival meal beautifully. |
| frontend/app.js:2408 | Kitchen journal | A creamy payasam made for slow servings. | Visible action label when the control is available | generic | keep | A creamy payasam made for slow servings. |
| frontend/app.js:2409 | Kitchen journal | Dates and milk make Eid mornings special. | Visible action label when the control is available | generic | keep | Dates and milk make Eid mornings special. |
| frontend/app.js:2410 | Kitchen journal | Slow-cooked richness for a festive table. | Visible action label when the control is available | helpful | keep | Slow-cooked richness for a festive table. |
| frontend/app.js:2411 | Kitchen journal | A celebration centerpiece for hungry crowds. | Visible action label when the control is available | generic | keep | A celebration centerpiece for hungry crowds. |
| frontend/app.js:2412 | Kitchen journal | Fine noodles bring a sweet festival finish. | Visible action label when the control is available | generic | keep | Fine noodles bring a sweet festival finish. |
| frontend/app.js:2413 | Kitchen journal | Rich gravy for a slow family feast. | Visible action label when the control is available | generic | keep | Rich gravy for a slow family feast. |
| frontend/app.js:2414 | Kitchen journal | Steamed festive bites with soft coconut sweetness. | Visible action label when the control is available | generic | keep | Steamed festive bites with soft coconut sweetness. |
| frontend/app.js:2415 | Kitchen journal | Rice dumplings that feel handmade and festive. | Visible action label when the control is available | generic | keep | Rice dumplings that feel handmade and festive. |
| frontend/app.js:3391 | Kitchen journal | Pat the prawns dry and season lightly with salt and pepper. | Visible action label when the control is available | generic | keep | Pat the prawns dry and season lightly with salt and pepper. |
| frontend/app.js:3392 | Kitchen journal | Melt butter in a hot pan and gently cook the chopped garlic until fragrant. | Visible action label when the control is available | helpful | keep | Melt butter in a hot pan and gently cook the chopped garlic until fragrant. |
| frontend/app.js:3393 | Kitchen journal | Add the prawns and cook until pink, curled, and just cooked through. | Visible action label when the control is available | helpful | keep | Add the prawns and cook until pink, curled, and just cooked through. |
| frontend/app.js:3394 | Kitchen journal | Toss once more in the garlic butter and serve warm. | Visible action label when the control is available | warm | keep | Toss once more in the garlic butter and serve warm. |
| frontend/app.js:418 | Kitchen journal | Cooling cucumber with roasted peanut, coconut, and a soft tempering. | Visible action label when the control is available | generic | keep | Cooling cucumber with roasted peanut, coconut, and a soft tempering. |
| frontend/app.js:426 | Kitchen journal | Vermicelli, milk, cardamom, and nuts for a small festive bowl. | Visible action label when the control is available | generic | keep | Vermicelli, milk, cardamom, and nuts for a small festive bowl. |
| frontend/app.js:431 | Kitchen journal | Slow-cooked carrot, milk, ghee, and jaggery for cozy sweetness. | On the homepage hero or hero reveal state | helpful | keep | Slow-cooked carrot, milk, ghee, and jaggery for cozy sweetness. |
| frontend/app.js:436 | Kitchen journal | Warm semolina dessert with saffron, ghee, and cashews. | On the homepage hero or hero reveal state | warm | keep | Warm semolina dessert with saffron, ghee, and cashews. |
| frontend/app.js:441 | Kitchen journal | Rice, dal, jaggery, and ghee for a soft home-style dessert. | On the homepage hero or hero reveal state | warm | keep | Rice, dal, jaggery, and ghee for a soft home-style dessert. |
| frontend/app.js:5401 | Kitchen journal | Pick a dish and tap Cook Now to start your journal. | In the Tomo Journal card or modal | helpful | keep | Pick a dish and tap Cook Now to start your journal. |
| frontend/app.js:5475 | Kitchen journal | Removed from favorites. | Visible action label when the control is available | generic | keep | Removed from favorites. |
| frontend/app.js:5482 | Kitchen journal | Saved for later. Tomo found another option. | In the Tomo Journal card or modal | generic | keep | Saved for later. Tomo found another option. |
| frontend/app.js:5541 | Kitchen journal | Voice pantry capture is ready for prototype testing. | In the Tomo Journal card or modal | generic | keep | Voice pantry capture is ready for prototype testing. |
| frontend/app.js:5542 | Kitchen journal | Scanner flow will identify items from a camera/photo next. | In the Tomo Journal card or modal | generic | keep | Scanner flow will identify items from a camera/photo next. |
| frontend/app.js:5543 | Kitchen journal | Manual add is available in Tomo’s Shopping List for now. | In the Tomo Journal card or modal | helpful | keep | Manual add is available in Tomo’s Shopping List for now. |
| frontend/desktop-reference.html:143; frontend/desktop-reference.html:119 | Kitchen journal | Tomo Journal | In the Tomo Journal card or modal | generic | keep | Tomo Journal |
| frontend/desktop-reference.html:188 | Kitchen journal | Clear purchased | In the Tomo Journal card or modal | generic | keep | Clear purchased |
| frontend/desktop-reference.html:198 | Kitchen journal | 🍅 Coming Soon | In the Tomo Journal card or modal | playful | keep | 🍅 Coming Soon |
| frontend/desktop-reference.html:199 | Kitchen journal | 🍅 Your food story starts here | In the Tomo Journal card or modal | playful | keep | 🍅 Your food story starts here |
| frontend/desktop-reference.html:200 | Kitchen journal | Moods, favorites and food memories. | In the Tomo Journal card or modal | warm | keep | Moods, favorites and food memories. |
| frontend/desktop-reference.html:201 | Kitchen journal | Got It | In the Tomo Journal card or modal | generic | keep | Got It |
| frontend/mobile/mobile-shell.js:3627 | Kitchen journal | Recipes are loading. | When a mood is displayed or selected | generic | keep | Recipes are loading. |
| frontend/mobile/mobile-shell.js:3633 | Kitchen journal | favorites and memories.' : 'Food for Every Mood'} | In the Tomo Journal card or modal | warm | keep | favorites and memories.' : 'Food for Every Mood'} |
| frontend/mobile/mobile-shell.js:3771 | Kitchen journal | Based on your saves | Visible action label when the control is available | generic | keep | Based on your saves |
| frontend/mobile/mobile-shell.js:3772 | Kitchen journal | Based on dishes you liked | On the homepage hero or hero reveal state | generic | keep | Based on dishes you liked |
| frontend/mobile/mobile-shell.js:4070 | Kitchen journal | You have {dynamic value} {dynamic value} ready to shop. | After one pantry ingredient is selected | generic | keep | You have {dynamic value} {dynamic value} ready to shop. |
| frontend/mobile/mobile-shell.js:4071 | Kitchen journal | Ready To Shop? | After one pantry ingredient is selected | generic | keep | Ready To Shop? |
| frontend/mobile/mobile-shell.js:4071 | Kitchen journal | ✓ Dish selected | After one pantry ingredient is selected | helpful | keep | ✓ Dish selected |
| frontend/mobile/mobile-shell.js:4071 | Kitchen journal | ✓ Missing ingredients found | After one pantry ingredient is selected | helpful | keep | ✓ Missing ingredients found |
| frontend/mobile/mobile-shell.js:4071 | Kitchen journal | ✓ Shopping list ready | After one pantry ingredient is selected | generic | keep | ✓ Shopping list ready |
| frontend/mobile/mobile-shell.js:4071 | Kitchen journal | Copy Shopping List | After one pantry ingredient is selected | generic | keep | Copy Shopping List |
| frontend/mobile/mobile-shell.js:4127 | Kitchen journal | 📖 Your Kitchen Story | In the Tomo Journal card or modal | generic | keep | 📖 Your Kitchen Story |
| frontend/mobile/mobile-shell.js:4127 | Kitchen journal | ❤️ Saved for Later | In the Tomo Journal card or modal | generic | keep | ❤️ Saved for Later |
| frontend/mobile/mobile-shell.js:4134 | Kitchen journal | 🍳 Recently Cooked | In the Tomo Journal card or modal | helpful | keep | 🍳 Recently Cooked |
| frontend/mobile/mobile-shell.js:4134; frontend/mobile/mobile-shell.js:4378; frontend/mobile/mobile-shell.js:4382; frontend/mobile/mobile-shell.js:4402 | Kitchen journal | Saved dish | In the Tomo Journal card or modal | generic | keep | Saved dish |
| frontend/mobile/mobile-shell.js:4138 | Kitchen journal | 💬 Help Tomo Improve | In the Tomo Journal card or modal | generic | keep | 💬 Help Tomo Improve |
| frontend/mobile/mobile-shell.js:4153 | Kitchen journal | Your food story starts here. | In the Tomo Journal card or modal | generic | keep | Your food story starts here. |
| frontend/mobile/mobile-shell.js:4153 | Kitchen journal | Cook a few dishes and Tomo will start remembering your favorites. | In the Tomo Journal card or modal | helpful | keep | Cook a few dishes and Tomo will start remembering your favorites. |
| frontend/mobile/mobile-shell.js:4163 | Kitchen journal | You've cooked {dynamic value} {dynamic value} with Tomo. | In the Tomo Journal card or modal | helpful | keep | You've cooked {dynamic value} {dynamic value} with Tomo. |
| frontend/mobile/mobile-shell.js:4163 | Kitchen journal | Your favorite so far is {dynamic value}. | In the Tomo Journal card or modal | generic | keep | Your favorite so far is {dynamic value}. |
| frontend/mobile/mobile-shell.js:4163 | Kitchen journal | You're enjoying {dynamic value} meals. | In the Tomo Journal card or modal | generic | keep | You're enjoying {dynamic value} meals. |
| frontend/mobile/mobile-shell.js:4163 | Kitchen journal | Keep cooking and I'll learn more about your taste. | In the Tomo Journal card or modal | helpful | keep | Keep cooking and I'll learn more about your taste. |
| frontend/mobile/mobile-shell.js:4177 | Kitchen journal | Found something wrong? | In the Tomo Journal card or modal | generic | keep | Found something wrong? |
| frontend/mobile/mobile-shell.js:4177 | Kitchen journal | Missing dish, wrong image or bug? | In the Tomo Journal card or modal | helpful | keep | Missing dish, wrong image or bug? |
| frontend/mobile/mobile-shell.js:4177 | Kitchen journal | Send Feedback → | In the Tomo Journal card or modal | generic | keep | Send Feedback → |
| frontend/mobile/mobile-shell.js:4200 | Kitchen journal | Saved {dynamic value} | Visible action label when the control is available | generic | keep | Saved {dynamic value} |
| frontend/mobile/mobile-shell.js:4201 | Kitchen journal | Cooked {dynamic value} | Visible action label when the control is available | helpful | keep | Cooked {dynamic value} |
| frontend/mobile/mobile-shell.js:4202 | Kitchen journal | Not for me: {dynamic value} | Visible action label when the control is available | generic | keep | Not for me: {dynamic value} |
| frontend/mobile/mobile-shell.js:4203 | Kitchen journal | Liked suggestion: {dynamic value} | Visible action label when the control is available | generic | keep | Liked suggestion: {dynamic value} |
| frontend/mobile/mobile-shell.js:4204 | Kitchen journal | Not helpful: {dynamic value} | In the Tomo Journal card or modal | generic | keep | Not helpful: {dynamic value} |
| frontend/mobile/mobile-shell.js:4212 | Kitchen journal | Added {dynamic value} to Shopping Cart | In the Tomo Journal card or modal | generic | keep | Added {dynamic value} to Shopping Cart |
| frontend/mobile/mobile-shell.js:4279 | Kitchen journal | You prefer quick comfort meals. | In the Tomo Journal card or modal | warm | keep | You prefer quick comfort meals. |
| frontend/mobile/mobile-shell.js:4280 | Kitchen journal | You prefer {dynamic value} meals. | In the Tomo Journal card or modal | generic | keep | You prefer {dynamic value} meals. |
| frontend/mobile/mobile-shell.js:4281 | Kitchen journal | Your cooking preferences will appear here. | In the Tomo Journal card or modal | helpful | keep | Your cooking preferences will appear here. |
| frontend/mobile/mobile-shell.js:4283 | Kitchen journal | Most cooked: {dynamic value} | In the Tomo Journal card or modal | helpful | keep | Most cooked: {dynamic value} |
| frontend/mobile/mobile-shell.js:4284 | Kitchen journal | Cook a few dishes to reveal your patterns. | In the Tomo Journal card or modal | helpful | keep | Cook a few dishes to reveal your patterns. |
| frontend/mobile/mobile-shell.js:4285 | Kitchen journal | From Tomo | In the Tomo Journal card or modal | generic | keep | From Tomo |
| frontend/mobile/mobile-shell.js:4323; frontend/mobile/mobile-shell.js:4341 | Kitchen journal | Your cooking story is just getting started. | In the Tomo Journal card or modal | helpful | keep | Your cooking story is just getting started. |
| frontend/mobile/mobile-shell.js:4338 | Kitchen journal | You enjoy {dynamic value} Food most. | Visible action label when the control is available | generic | keep | You enjoy {dynamic value} Food most. |
| frontend/mobile/mobile-shell.js:4339 | Kitchen journal | Protein dishes make up {dynamic value}% of your cooks. | Visible action label when the control is available | helpful | keep | Protein dishes make up {dynamic value}% of your cooks. |
| frontend/mobile/mobile-shell.js:4340 | Kitchen journal | You cooked {dynamic value} different {dynamic value} this week. | Visible action label when the control is available | helpful | keep | You cooked {dynamic value} different {dynamic value} this week. |
| frontend/mobile/mobile-shell.js:4459 | Kitchen journal | Tomo Pick | In the Tomo Journal card or modal | generic | keep | Tomo Pick |
| frontend/mobile/mobile-shell.js:4472 | Kitchen journal | Collections are loading. | In the Tomo Journal card or modal | generic | keep | Collections are loading. |
| frontend/mobile/mobile-shell.js:4546 | Kitchen journal | Back to Pantry | In the Tomo Journal card or modal | generic | keep | Back to Pantry |
| frontend/mobile/mobile-shell.js:4546 | Kitchen journal | Back to Shopping Cart | In the Tomo Journal card or modal | generic | keep | Back to Shopping Cart |
| frontend/mobile/mobile-shell.js:4546 | Kitchen journal | Back to Journal | In the Tomo Journal card or modal | generic | keep | Back to Journal |
| frontend/mobile/mobile-shell.js:4546 | Kitchen journal | Back to Collection | In the Tomo Journal card or modal | generic | keep | Back to Collection |
| frontend/mobile/mobile-shell.js:4546 | Kitchen journal | Back to Discover | In the Tomo Journal card or modal | generic | keep | Back to Discover |
| frontend/mobile/mobile-shell.js:6440 | Kitchen journal | Added to your cooking journey | In collection navigation or collection cards | helpful | keep | Added to your cooking journey |

## Collection banters

| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |
|---|---|---|---|---|---|---|
| frontend/app.js:2045 | Collections | Soft porridge for slow feeding. | In collection navigation or collection cards | generic | keep | Soft porridge for slow feeding. |
| frontend/app.js:2046 | Collections | Smooth and easy to feed. | In collection navigation or collection cards | generic | keep | Smooth and easy to feed. |
| frontend/app.js:2047 | Collections | Gentle comfort for tiny appetites. | In collection navigation or collection cards | warm | keep | Gentle comfort for tiny appetites. |
| frontend/app.js:2076 | Collections | Festive comfort made for sharing. | When a mood is displayed or selected | warm | keep | Festive comfort made for sharing. |
| frontend/app.js:2081 | Collections | A simple home-style pick. | In collection navigation or collection cards | warm | keep | A simple home-style pick. |
| frontend/app.js:2100 | Collections | Comfort Bowl | In collection navigation or collection cards | warm | keep | Comfort Bowl |
| frontend/app.js:2135 | Collections | Comfort Soup | When a mood is displayed or selected | warm | keep | Comfort Soup |
| frontend/app.js:2157 | Collections | Soft texture for easy feeding days. | In collection navigation or collection cards | generic | keep | Soft texture for easy feeding days. |
| frontend/app.js:2158 | Collections | Gentle bowl that keeps tiny tummies full. | In collection navigation or collection cards | generic | keep | Gentle bowl that keeps tiny tummies full. |
| frontend/app.js:2160 | Collections | Small bites for confident little eaters. | When a mood is displayed or selected | generic | keep | Small bites for confident little eaters. |
| frontend/app.js:2161 | Collections | A gentle option for early meal routines. | When a mood is displayed or selected | generic | keep | A gentle option for early meal routines. |
| frontend/app.js:2164 | Collections | Keeps kids full through a busy school day. | When a mood is displayed or selected | generic | keep | Keeps kids full through a busy school day. |
| frontend/app.js:2165 | Collections | Neat to pack and easy to eat on the go. | When a mood is displayed or selected | generic | keep | Neat to pack and easy to eat on the go. |
| frontend/app.js:2166 | Collections | Travels well without needing extra fuss. | When a mood is displayed or selected | generic | keep | Travels well without needing extra fuss. |
| frontend/app.js:2167 | Collections | A quick bite for hungry evenings. | When the containing UI component renders | generic | keep | A quick bite for hungry evenings. |
| frontend/app.js:2207 | Collections | Adds substance without complicating dinner. | When a mood is displayed or selected | generic | keep | Adds substance without complicating dinner. |
| frontend/app.js:2208 | Collections | Feels right when the weather slows down. | When a mood is displayed or selected | generic | keep | Feels right when the weather slows down. |
| frontend/app.js:2209 | Collections | Simple to make and easy to settle into. | When a mood is displayed or selected | generic | keep | Simple to make and easy to settle into. |
| frontend/app.js:2210 | Collections | Easy to hold, pack and finish. | When a mood is displayed or selected | generic | keep | Easy to hold, pack and finish. |
| frontend/app.js:2211; frontend/app.js:2434 | Collections | Straightforward enough for a low-effort day. | When a mood is displayed or selected | generic | keep | Straightforward enough for a low-effort day. |
| frontend/app.js:2219 | Collections | rice moong khichdi | In collection navigation or collection cards | generic | keep | rice moong khichdi |
| frontend/app.js:2219 | Collections | Soft dal-rice comfort for tiny appetites. | In collection navigation or collection cards | warm | keep | Soft dal-rice comfort for tiny appetites. |
| frontend/app.js:2220 | Collections | Earthy, filling and gentle for mornings. | In collection navigation or collection cards | generic | keep | Earthy, filling and gentle for mornings. |
| frontend/app.js:2221 | Collections | Mild, familiar and made for easy feeding. | In collection navigation or collection cards | warm | keep | Mild, familiar and made for easy feeding. |
| frontend/app.js:2222 | Collections | Creamy and calm for a soft breakfast. | In collection navigation or collection cards | generic | keep | Creamy and calm for a soft breakfast. |
| frontend/app.js:2432 | Collections | Brings a familiar celebration note home. | In collection navigation or collection cards | warm | keep | Brings a familiar celebration note home. |
| frontend/app.js:2432 | Collections | A special-day bite with homemade warmth. | In collection navigation or collection cards | warm | keep | A special-day bite with homemade warmth. |
| frontend/app.js:2493 | Collections | Tomo Collections are loading. | In collection navigation or collection cards | generic | keep | Tomo Collections are loading. |
| frontend/app.js:2511 | Collections | Scroll collections left | In collection navigation or collection cards | generic | keep | Scroll collections left |
| frontend/app.js:2511; frontend/desktop-reference.html:125 | Collections | Tomo collections | In collection navigation or collection cards | generic | keep | Tomo collections |
| frontend/app.js:2516 | Collections | collection-segment collection-{dynamic value} {dynamic value} {dynamic value} | In collection navigation or collection cards | generic | keep | collection-segment collection-{dynamic value} {dynamic value} {dynamic value} |
| frontend/app.js:2521 | Collections | Scroll collections right | In collection navigation or collection cards | generic | keep | Scroll collections right |
| frontend/app.js:2546 | Collections | Tiny comfort bowls and first foods. | In collection navigation or collection cards | warm | keep | Tiny comfort bowls and first foods. |
| frontend/app.js:2547 | Collections | Packed school lunch favorites. | In collection navigation or collection cards | generic | keep | Packed school lunch favorites. |
| frontend/app.js:2548 | Collections | Warm remedies and soothing drinks. | In collection navigation or collection cards | warm | keep | Warm remedies and soothing drinks. |
| frontend/app.js:2549 | Collections | Fresh light sides and salads. | In collection navigation or collection cards | generic | keep | Fresh light sides and salads. |
| frontend/app.js:2550 | Collections | Small homemade sweet endings. | In collection navigation or collection cards | warm | keep | Small homemade sweet endings. |
| frontend/app.js:2551 | Collections | Warm bowls for calm evenings. | In collection navigation or collection cards | warm | keep | Warm bowls for calm evenings. |
| frontend/app.js:2552 | Collections | Celebration dishes made for sharing. | In collection navigation or collection cards | generic | keep | Celebration dishes made for sharing. |
| frontend/app.js:2612 | Collections | Curated by Tomo for this mood. | In collection navigation or collection cards | warm | keep | Curated by Tomo for this mood. |
| frontend/app.js:2636 | Collections | 🍅 Tomo is arranging this collection. | In collection navigation or collection cards | playful | keep | 🍅 Tomo is arranging this collection. |
| frontend/app.js:2671 | Collections | Show less Back to the first four | In collection navigation or collection cards | generic | keep | Show less Back to the first four |
| frontend/app.js:4914 | Collections | Try a dish, ingredient, or collection. Tomo will look across the kitchen. | In collection navigation or collection cards | helpful | keep | Try a dish, ingredient, or collection. Tomo will look across the kitchen. |
| frontend/app.js:530; frontend/app.js:540 | Collections | Collection not found. | In collection navigation or collection cards | generic | keep | Collection not found. |
| frontend/app.js:543 | Collections | This action needs the local web server. | In collection navigation or collection cards | generic | keep | This action needs the local web server. |
| frontend/app.js:547 | Collections | Something went wrong | In collection navigation or collection cards | generic | keep | Something went wrong |
| frontend/desktop-reference.html:126 | Collections | Discover curated recipes for every kitchen. | In collection navigation or collection cards | generic | keep | Discover curated recipes for every kitchen. |
| frontend/desktop-reference.html:160 | Collections | Tomo Search | In collection navigation or collection cards | helpful | keep | Tomo Search |
| frontend/desktop-reference.html:161 | Collections | Find dishes, ingredients, collections | In collection navigation or collection cards | helpful | keep | Find dishes, ingredients, collections |
| frontend/mobile/mobile-shell.js:100 | Collections | Small sweet endings for ordinary days. | When a mood is displayed or selected | generic | keep | Small sweet endings for ordinary days. |
| frontend/mobile/mobile-shell.js:101 | Collections | Temple-style and devotional foods. | When a mood is displayed or selected | generic | keep | Temple-style and devotional foods. |
| frontend/mobile/mobile-shell.js:104; frontend/mobile/mobile-shell.js:105; frontend/mobile/mobile-shell.js:3031 | Collections | Breakfast & Tiffin | In collection navigation or collection cards | generic | keep | Breakfast & Tiffin |
| frontend/mobile/mobile-shell.js:104; frontend/mobile/mobile-shell.js:2998; frontend/mobile/mobile-shell.js:3033 | Collections | Snacks & Street Bites | In collection navigation or collection cards | generic | keep | Snacks & Street Bites |
| frontend/mobile/mobile-shell.js:104; frontend/mobile/mobile-shell.js:2999; frontend/mobile/mobile-shell.js:3032 | Collections | Saaru, Rasam & Soups | In collection navigation or collection cards | generic | keep | Saaru, Rasam & Soups |
| frontend/mobile/mobile-shell.js:104; frontend/mobile/mobile-shell.js:3000; frontend/mobile/mobile-shell.js:3001; frontend/mobile/mobile-shell.js:3034 | Collections | Sweets & Drinks | In collection navigation or collection cards | generic | keep | Sweets & Drinks |
| frontend/mobile/mobile-shell.js:104; frontend/mobile/mobile-shell.js:3035 | Collections | Mains & Meals | In collection navigation or collection cards | generic | keep | Mains & Meals |
| frontend/mobile/mobile-shell.js:105; frontend/mobile/mobile-shell.js:2999 | Collections | Pappu, Pulusu & Rasam | In collection navigation or collection cards | generic | keep | Pappu, Pulusu & Rasam |
| frontend/mobile/mobile-shell.js:105; frontend/mobile/mobile-shell.js:3036 | Collections | Regional Journeys::Andhra & Telangana | In collection navigation or collection cards | warm | keep | Regional Journeys::Andhra & Telangana |
| frontend/mobile/mobile-shell.js:106 | Collections | Regional Journeys::Tamil Nadu | In collection navigation or collection cards | warm | keep | Regional Journeys::Tamil Nadu |
| frontend/mobile/mobile-shell.js:115 | Collections | Everyday Cooking::Home Staples | Visible action label when the control is available | helpful | keep | Everyday Cooking::Home Staples |
| frontend/mobile/mobile-shell.js:116 | Collections | Healthy Living::Healthy Plates | Visible action label when the control is available | generic | keep | Healthy Living::Healthy Plates |
| frontend/mobile/mobile-shell.js:117 | Collections | Healthy Living::Warm & Light Bowls | Visible action label when the control is available | warm | keep | Healthy Living::Warm & Light Bowls |
| frontend/mobile/mobile-shell.js:117; frontend/mobile/mobile-shell.js:2999; frontend/mobile/mobile-shell.js:3102 | Collections | Rasam & Saaru | Visible action label when the control is available | generic | keep | Rasam & Saaru |
| frontend/mobile/mobile-shell.js:117; frontend/mobile/mobile-shell.js:3103 | Collections | Sick-Day Comfort | Visible action label when the control is available | warm | keep | Sick-Day Comfort |
| frontend/mobile/mobile-shell.js:118; frontend/mobile/mobile-shell.js:3106 | Collections | Family Favorites::Tiny Tummy Favorites | Visible action label when the control is available | generic | keep | Family Favorites::Tiny Tummy Favorites |
| frontend/mobile/mobile-shell.js:118; frontend/mobile/mobile-shell.js:3107 | Collections | Purees & Mashes | When the containing UI component renders | generic | keep | Purees & Mashes |
| frontend/mobile/mobile-shell.js:119; frontend/mobile/mobile-shell.js:2998; frontend/mobile/mobile-shell.js:3114; frontend/mobile/mobile-shell.js:3418 | Collections | After School Snacks | When the containing UI component renders | generic | keep | After School Snacks |
| frontend/mobile/mobile-shell.js:119; frontend/mobile/mobile-shell.js:3111 | Collections | Family Favorites::Lunch Box & Tiffin | When the containing UI component renders | generic | keep | Family Favorites::Lunch Box & Tiffin |
| frontend/mobile/mobile-shell.js:119; frontend/mobile/mobile-shell.js:3112; frontend/mobile/mobile-shell.js:3415 | Collections | Quick Morning Wins | When the containing UI component renders | generic | keep | Quick Morning Wins |
| frontend/mobile/mobile-shell.js:119; frontend/mobile/mobile-shell.js:3115; frontend/mobile/mobile-shell.js:3416 | Collections | Tiffin Box Favorites | When the containing UI component renders | generic | keep | Tiffin Box Favorites |
| frontend/mobile/mobile-shell.js:12 | Collections | Explore food across India's regions. | In collection navigation or collection cards | generic | keep | Explore food across India's regions. |
| frontend/mobile/mobile-shell.js:120 | Collections | Toast & Bakery | When the containing UI component renders | generic | keep | Toast & Bakery |
| frontend/mobile/mobile-shell.js:120; frontend/mobile/mobile-shell.js:3116 | Collections | Global Bites::Global Breakfasts | When the containing UI component renders | generic | keep | Global Bites::Global Breakfasts |
| frontend/mobile/mobile-shell.js:121 | Collections | Global Bites::Global Bowls | When the containing UI component renders | generic | keep | Global Bites::Global Bowls |
| frontend/mobile/mobile-shell.js:126 | Collections | Salads & Fresh Sides | When a mood is displayed or selected | generic | keep | Salads & Fresh Sides |
| frontend/mobile/mobile-shell.js:126 | Collections | Sundals & Add-ons | When a mood is displayed or selected | generic | keep | Sundals & Add-ons |
| frontend/mobile/mobile-shell.js:127 | Collections | Kitchen Essentials::Chutneys, Podis & Condiments | When a mood is displayed or selected | generic | keep | Kitchen Essentials::Chutneys, Podis & Condiments |
| frontend/mobile/mobile-shell.js:128; frontend/mobile/mobile-shell.js:3157 | Collections | Seasonal Specials::Summer Cooling | When a mood is displayed or selected | generic | keep | Seasonal Specials::Summer Cooling |
| frontend/mobile/mobile-shell.js:129; frontend/mobile/mobile-shell.js:3162 | Collections | Seasonal Specials::Rainy Day Cravings | When a mood is displayed or selected | playful | keep | Seasonal Specials::Rainy Day Cravings |
| frontend/mobile/mobile-shell.js:130; frontend/mobile/mobile-shell.js:3166 | Collections | Celebrations & Traditions::Festival Sweets | When a mood is displayed or selected | generic | keep | Celebrations & Traditions::Festival Sweets |
| frontend/mobile/mobile-shell.js:130; frontend/mobile/mobile-shell.js:3167 | Collections | Payasam & Kheer | When a mood is displayed or selected | generic | keep | Payasam & Kheer |
| frontend/mobile/mobile-shell.js:131 | Collections | Celebrations & Traditions::Regional Sweets | When a mood is displayed or selected | generic | keep | Celebrations & Traditions::Regional Sweets |
| frontend/mobile/mobile-shell.js:131 | Collections | North Indian Sweets | When a mood is displayed or selected | generic | keep | North Indian Sweets |
| frontend/mobile/mobile-shell.js:131 | Collections | South Indian Sweets | When a mood is displayed or selected | generic | keep | South Indian Sweets |
| frontend/mobile/mobile-shell.js:132 | Collections | Celebrations & Traditions::Everyday Desserts | When the containing UI component renders | generic | keep | Celebrations & Traditions::Everyday Desserts |
| frontend/mobile/mobile-shell.js:17 | Collections | Daily comforts, tea-time favourites and home staples. | In collection navigation or collection cards | warm | keep | Daily comforts, tea-time favourites and home staples. |
| frontend/mobile/mobile-shell.js:22 | Collections | Protein-rich, balanced and lighter meals. | On the homepage hero or hero reveal state | generic | keep | Protein-rich, balanced and lighter meals. |
| frontend/mobile/mobile-shell.js:27 | Collections | Baby bowls, lunch boxes and family-friendly picks. | On the homepage hero or hero reveal state | generic | keep | Baby bowls, lunch boxes and family-friendly picks. |
| frontend/mobile/mobile-shell.js:2725 | Collections | moong dal chilla | In collection navigation or collection cards | generic | keep | moong dal chilla |
| frontend/mobile/mobile-shell.js:2726 | Collections | egg curry rice | In collection navigation or collection cards | generic | keep | egg curry rice |
| frontend/mobile/mobile-shell.js:2730 | Collections | andhra egg fry | In collection navigation or collection cards | generic | keep | andhra egg fry |
| frontend/mobile/mobile-shell.js:2745 | Collections | ❌ Missing image | On the homepage hero or hero reveal state | helpful | keep | ❌ Missing image |
| frontend/mobile/mobile-shell.js:2747 | Collections | ⚠ Placeholder image | On the homepage hero or hero reveal state | generic | keep | ⚠ Placeholder image |
| frontend/mobile/mobile-shell.js:2748 | Collections | ⚠ Hero image appears mapped to Kosambari | On the homepage hero or hero reveal state | generic | keep | ⚠ Hero image appears mapped to Kosambari |
| frontend/mobile/mobile-shell.js:2771 | Collections | ⚠ Broken image reference | In collection navigation or collection cards | generic | keep | ⚠ Broken image reference |
| frontend/mobile/mobile-shell.js:2832 | Collections | Tomo Collections Image Audit | On the homepage hero or hero reveal state | generic | keep | Tomo Collections Image Audit |
| frontend/mobile/mobile-shell.js:2843 | Collections | Excessive duplicate images | In collection navigation or collection cards | generic | keep | Excessive duplicate images |
| frontend/mobile/mobile-shell.js:2883 | Collections | A Tomo recipe from this collection. | In collection navigation or collection cards | generic | keep | A Tomo recipe from this collection. |
| frontend/mobile/mobile-shell.js:2997 | Collections | Mains & Bhakri Plates | When the containing UI component renders | generic | keep | Mains & Bhakri Plates |
| frontend/mobile/mobile-shell.js:2997 | Collections | Comfort Mains | When the containing UI component renders | warm | keep | Comfort Mains |
| frontend/mobile/mobile-shell.js:2998 | Collections | Street Food & Snacks | When the containing UI component renders | generic | keep | Street Food & Snacks |
| frontend/mobile/mobile-shell.js:2999 | Collections | Rasam, Kuzhambu & Kootu | When the containing UI component renders | generic | keep | Rasam, Kuzhambu & Kootu |
| frontend/mobile/mobile-shell.js:3002 | Collections | Palyas, Poriyals & Thorans | In collection navigation or collection cards | generic | keep | Palyas, Poriyals & Thorans |
| frontend/mobile/mobile-shell.js:3002 | Collections | Greens & Sides | In collection navigation or collection cards | generic | keep | Greens & Sides |
| frontend/mobile/mobile-shell.js:3180 | Collections | Celebrations & Traditions::Prasadam & Temple Foods | In collection navigation or collection cards | generic | keep | Celebrations & Traditions::Prasadam & Temple Foods |
| frontend/mobile/mobile-shell.js:319; frontend/mobile/mobile-shell.js:323 | Collections | Guntur Chicken Fry | In collection navigation or collection cards | generic | keep | Guntur Chicken Fry |
| frontend/mobile/mobile-shell.js:32 | Collections | Comforting dishes from around the world. | On the homepage hero or hero reveal state | warm | keep | Comforting dishes from around the world. |
| frontend/mobile/mobile-shell.js:323 | Collections | Andhra Chicken Curry | On the homepage hero or hero reveal state | generic | keep | Andhra Chicken Curry |
| frontend/mobile/mobile-shell.js:323 | Collections | Mirchi Ka Salan | On the homepage hero or hero reveal state | generic | keep | Mirchi Ka Salan |
| frontend/mobile/mobile-shell.js:3301 | Collections | High Protein Breakfast | When a mood is displayed or selected | generic | keep | High Protein Breakfast |
| frontend/mobile/mobile-shell.js:3302 | Collections | Quick eggs with filling toast. | When a mood is displayed or selected | generic | keep | Quick eggs with filling toast. |
| frontend/mobile/mobile-shell.js:3303 | Collections | Egg and bread for a strong start. | When a mood is displayed or selected | generic | keep | Egg and bread for a strong start. |
| frontend/mobile/mobile-shell.js:3304 | Collections | Spiced eggs with morning energy. | When a mood is displayed or selected | generic | keep | Spiced eggs with morning energy. |
| frontend/mobile/mobile-shell.js:3305 | Collections | Gram flour breakfast with protein. | When a mood is displayed or selected | generic | keep | Gram flour breakfast with protein. |
| frontend/mobile/mobile-shell.js:3339 | Collections | Spiced egg fry for quick protein. | In collection navigation or collection cards | generic | keep | Spiced egg fry for quick protein. |
| frontend/mobile/mobile-shell.js:3345 | Collections | Protein-rich meals and snacks | In collection navigation or collection cards | generic | keep | Protein-rich meals and snacks |
| frontend/mobile/mobile-shell.js:3346; frontend/mobile/mobile-shell.js:3362 | Collections | Protein-rich meals and snacks for strength, recovery and busy days. | In collection navigation or collection cards | generic | keep | Protein-rich meals and snacks for strength, recovery and busy days. |
| frontend/mobile/mobile-shell.js:3369 | Collections | tender coconut water | In collection navigation or collection cards | generic | keep | tender coconut water |
| frontend/mobile/mobile-shell.js:3370 | Collections | green moong drink | In collection navigation or collection cards | generic | keep | green moong drink |
| frontend/mobile/mobile-shell.js:3409 | Collections | mixed veg salad | On the homepage hero or hero reveal state | generic | keep | mixed veg salad |
| frontend/mobile/mobile-shell.js:3416 | Collections | Chapati Jam Roll | On the homepage hero or hero reveal state | generic | keep | Chapati Jam Roll |
| frontend/mobile/mobile-shell.js:3417 | Collections | Paneer Bhurji Wrap | In collection navigation or collection cards | generic | keep | Paneer Bhurji Wrap |
| frontend/mobile/mobile-shell.js:3417 | Collections | Egg Fried Rice | In collection navigation or collection cards | generic | keep | Egg Fried Rice |
| frontend/mobile/mobile-shell.js:3417 | Collections | Cheese Veg Sandwich | In collection navigation or collection cards | generic | keep | Cheese Veg Sandwich |
| frontend/mobile/mobile-shell.js:3417; frontend/mobile/mobile-shell.js:3464 | Collections | Moong Dal Cheela | In collection navigation or collection cards | generic | keep | Moong Dal Cheela |
| frontend/mobile/mobile-shell.js:3418 | Collections | Sweet Potato Chaat | In collection navigation or collection cards | generic | keep | Sweet Potato Chaat |
| frontend/mobile/mobile-shell.js:3418 | Collections | Roasted Chana Chaat | In collection navigation or collection cards | generic | keep | Roasted Chana Chaat |
| frontend/mobile/mobile-shell.js:3436 | Collections | A lunchbox-friendly Tomo pick for busy days. | In collection navigation or collection cards | generic | keep | A lunchbox-friendly Tomo pick for busy days. |
| frontend/mobile/mobile-shell.js:3472 | Collections | Palyas & Stir Fries | In collection navigation or collection cards | generic | keep | Palyas & Stir Fries |
| frontend/mobile/mobile-shell.js:3478 | Collections | Sides & Add-ons | In collection navigation or collection cards | generic | keep | Sides & Add-ons |
| frontend/mobile/mobile-shell.js:3479 | Collections | Chutneys, palyas, raitas and extras | In collection navigation or collection cards | generic | keep | Chutneys, palyas, raitas and extras |
| frontend/mobile/mobile-shell.js:3480 | Collections | Chutneys, palyas, raitas and extras to complete your meal. | In collection navigation or collection cards | generic | keep | Chutneys, palyas, raitas and extras to complete your meal. |
| frontend/mobile/mobile-shell.js:3494 | Collections | A simple side to round out your meal. | In collection navigation or collection cards | generic | keep | A simple side to round out your meal. |
| frontend/mobile/mobile-shell.js:3517; frontend/mobile/mobile-shell.js:3919 | Collections | Coming Soon | In collection navigation or collection cards | generic | keep | Coming Soon |
| frontend/mobile/mobile-shell.js:3518 | Collections | Pizza, pasta, burgers, Mediterranean bowls and global comfort foods are coming soon. | In collection navigation or collection cards | warm | keep | Pizza, pasta, burgers, Mediterranean bowls and global comfort foods are coming soon. |
| frontend/mobile/mobile-shell.js:37 | Collections | Chutneys, sides, condiments and add-ons. | When a mood is displayed or selected | generic | keep | Chutneys, sides, condiments and add-ons. |
| frontend/mobile/mobile-shell.js:3881 | Collections | Search Tomo | In collection navigation or collection cards | helpful | keep | Search Tomo |
| frontend/mobile/mobile-shell.js:3886 | Collections | Try “rice”, “comfort”, “baby” or “paneer”. | In collection navigation or collection cards | warm | keep | Try “rice”, “comfort”, “baby” or “paneer”. |
| frontend/mobile/mobile-shell.js:3904 | Collections | Open in Kitchen | In collection navigation or collection cards | generic | keep | Open in Kitchen |
| frontend/mobile/mobile-shell.js:3919 | Collections | mv2-collection {dynamic value} | In collection navigation or collection cards | generic | keep | mv2-collection {dynamic value} |
| frontend/mobile/mobile-shell.js:3919 | Collections | Tomo collection | In collection navigation or collection cards | generic | keep | Tomo collection |
| frontend/mobile/mobile-shell.js:42 | Collections | Cooling, rainy-day and seasonal cravings. | When a mood is displayed or selected | playful | keep | Cooling, rainy-day and seasonal cravings. |
| frontend/mobile/mobile-shell.js:4417 | Collections | Request a dish | In collection navigation or collection cards | generic | keep | Request a dish |
| frontend/mobile/mobile-shell.js:4478; frontend/mobile/mobile-shell.js:4503 | Collections | Back to Collections | In collection navigation or collection cards | generic | keep | Back to Collections |
| frontend/mobile/mobile-shell.js:4486 | Collections | mv2-subcategory {dynamic value} | In collection navigation or collection cards | generic | keep | mv2-subcategory {dynamic value} |
| frontend/mobile/mobile-shell.js:45; frontend/mobile/mobile-shell.js:59; frontend/mobile/mobile-shell.js:69 | Collections | Celebrations & Traditions | When a mood is displayed or selected | generic | keep | Celebrations & Traditions |
| frontend/mobile/mobile-shell.js:4539 | Collections | Dish not found. | In collection navigation or collection cards | generic | keep | Dish not found. |
| frontend/mobile/mobile-shell.js:4552 | Collections | ⏱ {dynamic value} min • {dynamic value} • {dynamic value} | In collection navigation or collection cards | generic | keep | ⏱ {dynamic value} min • {dynamic value} • {dynamic value} |
| frontend/mobile/mobile-shell.js:4577 | Collections | No matching selected items. | In collection navigation or collection cards | helpful | keep | No matching selected items. |
| frontend/mobile/mobile-shell.js:47 | Collections | Festival sweets, regional sweets and prasadam. | When a mood is displayed or selected | generic | keep | Festival sweets, regional sweets and prasadam. |
| frontend/mobile/mobile-shell.js:5664 | Collections | ⏱ {dynamic value} min • {dynamic value} | In collection navigation or collection cards | generic | keep | ⏱ {dynamic value} min • {dynamic value} |
| frontend/mobile/mobile-shell.js:5672 | Collections | View Dish → | In collection navigation or collection cards | generic | keep | View Dish → |
| frontend/mobile/mobile-shell.js:5712 | Collections | A thoughtful pick from this collection. | In collection navigation or collection cards | generic | keep | A thoughtful pick from this collection. |
| frontend/mobile/mobile-shell.js:6100; frontend/mobile/mobile-shell.js:6219 | Collections | Global Bites is coming soon. | In collection navigation or collection cards | generic | keep | Global Bites is coming soon. |
| frontend/mobile/mobile-shell.js:62; frontend/mobile/mobile-shell.js:144 | Collections | North & West India | In collection navigation or collection cards | generic | keep | North & West India |
| frontend/mobile/mobile-shell.js:62; frontend/mobile/mobile-shell.js:145 | Collections | Jammu & Kashmir | In collection navigation or collection cards | generic | keep | Jammu & Kashmir |
| frontend/mobile/mobile-shell.js:62; frontend/mobile/mobile-shell.js:73 | Collections | Andhra & Telangana | In collection navigation or collection cards | generic | keep | Andhra & Telangana |
| frontend/mobile/mobile-shell.js:63; frontend/mobile/mobile-shell.js:82 | Collections | Tea Time Favourites | In collection navigation or collection cards | generic | keep | Tea Time Favourites |
| frontend/mobile/mobile-shell.js:64; frontend/mobile/mobile-shell.js:85 | Collections | Warm & Light Bowls | In collection navigation or collection cards | warm | keep | Warm & Light Bowls |
| frontend/mobile/mobile-shell.js:65; frontend/mobile/mobile-shell.js:86 | Collections | Tiny Tummy Favorites | When a mood is displayed or selected | generic | keep | Tiny Tummy Favorites |
| frontend/mobile/mobile-shell.js:65; frontend/mobile/mobile-shell.js:87 | Collections | Lunch Box & Tiffin | When a mood is displayed or selected | generic | keep | Lunch Box & Tiffin |
| frontend/mobile/mobile-shell.js:66 | Collections | Global Street Food | When a mood is displayed or selected | generic | keep | Global Street Food |
| frontend/mobile/mobile-shell.js:67 | Collections | Sides, Salads & Add-ons | When a mood is displayed or selected | generic | keep | Sides, Salads & Add-ons |
| frontend/mobile/mobile-shell.js:67 | Collections | Chutneys, Podis & Condiments | When a mood is displayed or selected | generic | keep | Chutneys, Podis & Condiments |
| frontend/mobile/mobile-shell.js:68 | Collections | Rainy Day Cravings | When a mood is displayed or selected | playful | keep | Rainy Day Cravings |
| frontend/mobile/mobile-shell.js:69; frontend/mobile/mobile-shell.js:101 | Collections | Prasadam & Temple Foods | When a mood is displayed or selected | generic | keep | Prasadam & Temple Foods |
| frontend/mobile/mobile-shell.js:72 | Collections | Mains, saaru, snacks and sweets from Karnataka. | When a mood is displayed or selected | generic | keep | Mains, saaru, snacks and sweets from Karnataka. |
| frontend/mobile/mobile-shell.js:73 | Collections | Spicy Telugu-region comfort and festive dishes. | When a mood is displayed or selected | warm | keep | Spicy Telugu-region comfort and festive dishes. |
| frontend/mobile/mobile-shell.js:74 | Collections | Breakfast staples, rasam, snacks and Tamil classics. | In collection navigation or collection cards | generic | keep | Breakfast staples, rasam, snacks and Tamil classics. |
| frontend/mobile/mobile-shell.js:75 | Collections | Coconut-rich breakfasts, curries and gentle meals. | In collection navigation or collection cards | generic | keep | Coconut-rich breakfasts, curries and gentle meals. |
| frontend/mobile/mobile-shell.js:81 | Collections | Everyday mains and familiar home plates. | When the containing UI component renders | warm | keep | Everyday mains and familiar home plates. |
| frontend/mobile/mobile-shell.js:82 | Collections | Snacks, drinks and local legends for small breaks. | When the containing UI component renders | generic | keep | Snacks, drinks and local legends for small breaks. |
| frontend/mobile/mobile-shell.js:83 | Collections | Simple everyday dishes for the regular kitchen. | When the containing UI component renders | generic | keep | Simple everyday dishes for the regular kitchen. |
| frontend/mobile/mobile-shell.js:84 | Collections | Balanced, protein-forward and lighter picks. | When the containing UI component renders | generic | keep | Balanced, protein-forward and lighter picks. |
| frontend/mobile/mobile-shell.js:85 | Collections | Soups, rasam and softer warm bowls. | When the containing UI component renders | warm | keep | Soups, rasam and softer warm bowls. |
| frontend/mobile/mobile-shell.js:86 | Collections | Gentle baby and toddler-friendly foods. | When the containing UI component renders | generic | keep | Gentle baby and toddler-friendly foods. |
| frontend/mobile/mobile-shell.js:87 | Collections | Packable family and kid-friendly ideas. | When the containing UI component renders | generic | keep | Packable family and kid-friendly ideas. |
| frontend/mobile/mobile-shell.js:88 | Collections | Global morning plates and egg-forward starts. | Visible action label when the control is available | generic | keep | Global morning plates and egg-forward starts. |
| frontend/mobile/mobile-shell.js:89 | Collections | Rice, noodle and protein bowls with global comfort. | Visible action label when the control is available | warm | keep | Rice, noodle and protein bowls with global comfort. |
| frontend/mobile/mobile-shell.js:90 | Collections | Fried rice, Asian comforts and continental-style mains. | Visible action label when the control is available | warm | keep | Fried rice, Asian comforts and continental-style mains. |
| frontend/mobile/mobile-shell.js:91 | Collections | Indo-Chinese starters, quick bites and shareable plates. | Visible action label when the control is available | generic | keep | Indo-Chinese starters, quick bites and shareable plates. |
| frontend/mobile/mobile-shell.js:97 | Collections | Warm, cozy dishes for grey skies. | When a mood is displayed or selected | warm | keep | Warm, cozy dishes for grey skies. |
| frontend/mobile/mobile-shell.js:98 | Collections | Sweets and treats for celebration days. | When a mood is displayed or selected | generic | keep | Sweets and treats for celebration days. |
| frontend/mobile/mobile-shell.js:99 | Collections | State-loved sweets and nostalgic classics. | When a mood is displayed or selected | generic | keep | State-loved sweets and nostalgic classics. |

## Button labels

| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |
|---|---|---|---|---|---|---|
| frontend/app.js:1512 | Button / control | Cook Now | Visible action label when the control is available | helpful | keep | Cook Now |
| frontend/app.js:1798 | Button / control | Tomo found {dynamic value}. | Visible action label when the control is available | generic | keep | Tomo found {dynamic value}. |
| frontend/app.js:1798 | Button / control | Tomo revealed {dynamic value}. | Visible action label when the control is available | generic | keep | Tomo revealed {dynamic value}. |
| frontend/app.js:4871 | Button / control | Purchased | Visible action label when the control is available | generic | keep | Purchased |
| frontend/app.js:5526 | Button / control | No purchased items to clear. | Visible action label when the control is available | generic | keep | No purchased items to clear. |
| frontend/app.js:5526 | Button / control | Purchased items cleared. | Visible action label when the control is available | generic | keep | Purchased items cleared. |
| frontend/desktop-reference.html:136 | Button / control | 🍅 Pair dal with rice or roti for a more complete protein plate. | Visible action label when the control is available | playful | keep | 🍅 Pair dal with rice or roti for a more complete protein plate. |
| frontend/desktop-reference.html:170 | Button / control | Try dosa, paneer, rice, baby food... | Visible action label when the control is available | too much | improve | Try dosa, paneer, rice, baby food. |
| frontend/desktop-reference.html:187 | Button / control | Things to pick up | Visible action label when the control is available | generic | keep | Things to pick up |
| frontend/desktop-reference.html:240 | Button / control | Search rice, paneer, tomato... | Visible action label when the control is available | too much | improve | Search rice, paneer, tomato. |
| frontend/desktop-reference.html:26 | Button / control | Search recipes | Visible action label when the control is available | helpful | keep | Search recipes |
| frontend/desktop-reference.html:29 | Button / control | Open shopping list | Visible action label when the control is available | generic | keep | Open shopping list |
| frontend/desktop-reference.html:38 | Button / control | Reveal Tomo's pick | Visible action label when the control is available | generic | keep | Reveal Tomo's pick |
| frontend/desktop-reference.html:91 | Button / control | 0 recipes ready | Visible action label when the control is available | generic | keep | 0 recipes ready |
| frontend/mobile/mobile-shell.js:122 | Button / control | Global Bites::Global Mains | Visible action label when the control is available | generic | keep | Global Bites::Global Mains |
| frontend/mobile/mobile-shell.js:122 | Button / control | Fried Rice & Indo-Chinese | Visible action label when the control is available | generic | keep | Fried Rice & Indo-Chinese |
| frontend/mobile/mobile-shell.js:123 | Button / control | Global Bites::Global Snacks | Visible action label when the control is available | generic | keep | Global Bites::Global Snacks |
| frontend/mobile/mobile-shell.js:123 | Button / control | Wraps & Rolls | Visible action label when the control is available | generic | keep | Wraps & Rolls |
| frontend/mobile/mobile-shell.js:123 | Button / control | Dips & Plates | Visible action label when the control is available | generic | keep | Dips & Plates |
| frontend/mobile/mobile-shell.js:124; frontend/mobile/mobile-shell.js:3136 | Button / control | Global Bites::Global Soups | Visible action label when the control is available | generic | keep | Global Bites::Global Soups |
| frontend/mobile/mobile-shell.js:124; frontend/mobile/mobile-shell.js:3140 | Button / control | Clear Soups | Visible action label when the control is available | generic | keep | Clear Soups |
| frontend/mobile/mobile-shell.js:125; frontend/mobile/mobile-shell.js:3141 | Button / control | Global Bites::Global Street Food | Visible action label when the control is available | generic | keep | Global Bites::Global Street Food |
| frontend/mobile/mobile-shell.js:125; frontend/mobile/mobile-shell.js:3143 | Button / control | Tacos & Quesadillas | Visible action label when the control is available | generic | keep | Tacos & Quesadillas |
| frontend/mobile/mobile-shell.js:126 | Button / control | Kitchen Essentials::Sides, Salads & Add-ons | Visible action label when the control is available | generic | keep | Kitchen Essentials::Sides, Salads & Add-ons |
| frontend/mobile/mobile-shell.js:126 | Button / control | Palyas, Poriyals & Thorans | Visible action label when the control is available | generic | keep | Palyas, Poriyals & Thorans |
| frontend/mobile/mobile-shell.js:1575 | Button / control | Added to Shopping List | Visible action label when the control is available | generic | keep | Added to Shopping List |
| frontend/mobile/mobile-shell.js:1576 | Button / control | You can review, copy, or share your list anytime. | Visible action label when the control is available | generic | keep | You can review, copy, or share your list anytime. |
| frontend/mobile/mobile-shell.js:3138 | Button / control | hot and sour | Visible action label when the control is available | generic | keep | hot and sour |
| frontend/mobile/mobile-shell.js:3712 | Button / control | Tomo's Pick | Visible action label when the control is available | generic | keep | Tomo's Pick |
| frontend/mobile/mobile-shell.js:3718 | Button / control | ⏱ {dynamic value} min • {dynamic value} | Visible action label when the control is available | generic | keep | ⏱ {dynamic value} min • {dynamic value} |
| frontend/mobile/mobile-shell.js:3718; frontend/mobile/mobile-shell.js:5687 | Button / control | Cook This | Visible action label when the control is available | helpful | keep | Cook This |
| frontend/mobile/mobile-shell.js:3877 | Button / control | Clear search | Visible action label when the control is available | helpful | keep | Clear search |
| frontend/mobile/mobile-shell.js:3881 | Button / control | Close search | Visible action label when the control is available | helpful | keep | Close search |
| frontend/mobile/mobile-shell.js:4436; frontend/mobile/mobile-shell.js:6050 | Button / control | Thanks for helping Tomo improve. | Visible action label when the control is available | generic | keep | Thanks for helping Tomo improve. |
| frontend/mobile/mobile-shell.js:4448 | Button / control | Tomo Feedback - {dynamic value} | Visible action label when the control is available | generic | keep | Tomo Feedback - {dynamic value} |
| frontend/mobile/mobile-shell.js:4450 | Button / control | Feedback Type: {dynamic value} | Visible action label when the control is available | generic | keep | Feedback Type: {dynamic value} |
| frontend/mobile/mobile-shell.js:4451 | Button / control | Dish / Request: {dynamic value} | Visible action label when the control is available | generic | keep | Dish / Request: {dynamic value} |
| frontend/mobile/mobile-shell.js:6354 | Button / control | Items already in Shopping List | Visible action label when the control is available | generic | keep | Items already in Shopping List |
| frontend/mobile/mobile-shell.js:6395 | Button / control | Could not copy shopping list. | Visible action label when the control is available | generic | keep | Could not copy shopping list. |
| frontend/mobile/mobile-shell.js:6395; frontend/mobile/mobile-shell.js:6429 | Button / control | Shopping list copied. | Visible action label when the control is available | generic | keep | Shopping list copied. |
| frontend/mobile/mobile-shell.js:6405 | Button / control | Tomo Shopping List | Visible action label when the control is available | generic | keep | Tomo Shopping List |
| frontend/mobile/mobile-shell.js:6429 | Button / control | Could not share shopping list. | Visible action label when the control is available | generic | keep | Could not share shopping list. |
| frontend/mobile/mobile-shell.js:6513 | Button / control | Removed from Saved | Visible action label when the control is available | generic | keep | Removed from Saved |
| frontend/mobile/mobile-shell.js:6516 | Button / control | Saved to Tomo | Visible action label when the control is available | generic | keep | Saved to Tomo |
| frontend/app.js:1512 | General UI | Save | When the containing UI component renders | generic | keep | Save |
| frontend/app.js:1512 | General UI | Not now | When the containing UI component renders | generic | keep | Not now |

