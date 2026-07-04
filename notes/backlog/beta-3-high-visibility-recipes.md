# Beta 3 High Visibility Recipe Audit

Generated: 2026-06-25T12:14:22.646Z
Branch: `beta-3-active-development`

## Executive Summary

- Backend recipes: 660
- Active/core recipes scored: 658
- Frontend active/core recipes: 658
- High-visibility image debt recipes, score >= 55: 413
- P0 image debt recipes: 50 top-priority recipes
- P1 image debt recipes: 75 next-priority recipes
- P2 image debt recipes: 288 remaining high-visibility debt recipes
- High-visibility recipes with excellent dedicated images: 40

## Scoring Model

Visibility score is a 0-100 heuristic that combines normal Tomo exposure surfaces.

| Signal | Weight / effect |
| --- | --- |
| Home Hero / Tomo Pick exposure | +20 |
| Today's Picks eligibility | +17 |
| Pantry recommendation eligibility | +12 |
| Mood recommendation eligibility | +10 |
| Collection visibility | +9 |
| Regional Journey visibility | +10 |
| Global Bites visibility | +6 |
| Popular meal type | +5 |
| Beginner / everyday dish signal | +5 |
| Major recommendation role | +4 |
| Rare or niche recipe signal | -5 |
| Side / condiment suppression | -8 |

Notes: this is a prioritization score, not a live analytics metric. It mirrors mobile availability/eligibility from recipe data, collectionHome, Regional Journey coverage rules, recipeRole, mealTags, moodTags, image path health and ingredient coverage.

## Top 25 Most Visible Recipes

| Rank | Title | Slug | Score | Image status | Image type | Recommendation surfaces | Frequency estimate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Aamti | aamti | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 2 | Adai | adai | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 3 | Adai Avial | adai-avial | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 4 | Akki Roti | akki-roti | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 5 | Aloo Paratha | aloo-paratha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 6 | Aloo Potol Posto | aloo-potol-posto | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 7 | Andhra Chicken Curry | andhra-chicken-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 8 | Andhra Egg Fry | andhra-egg-fry | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 9 | Andhra Fish Fry | andhra-fish-fry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 10 | Andhra Kodi Vepudu | andhra-kodi-vepudu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 11 | Andhra Podi Idli | andhra-podi-idli | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 12 | Appam | appam | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 13 | Appam Stew | appam-stew | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 14 | Arunachal Thukpa | arunachal-thukpa | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 15 | Assamese Duck Curry | assamese-duck-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 16 | Avalakki | avalakki | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 17 | Bai | bai | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 18 | Bamboo Shoot Curry | bamboo-shoot-curry | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 19 | Bamboo Shoot Pork | bamboo-shoot-pork | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 20 | Basanti Pulao | basanti-pulao | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 21 | Bassaru | bassaru | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 22 | Batata Poha | batata-poha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 23 | Batata Vada | batata-vada | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 24 | Beerakaya Pappu | beerakaya-pappu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 25 | Bele Saaru | bele-saaru | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |

## Top 50 Most Visible Recipes

| Rank | Title | Slug | Score | Image status | Image type | Recommendation surfaces | Frequency estimate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Aamti | aamti | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 2 | Adai | adai | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 3 | Adai Avial | adai-avial | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 4 | Akki Roti | akki-roti | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 5 | Aloo Paratha | aloo-paratha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 6 | Aloo Potol Posto | aloo-potol-posto | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 7 | Andhra Chicken Curry | andhra-chicken-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 8 | Andhra Egg Fry | andhra-egg-fry | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 9 | Andhra Fish Fry | andhra-fish-fry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 10 | Andhra Kodi Vepudu | andhra-kodi-vepudu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 11 | Andhra Podi Idli | andhra-podi-idli | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 12 | Appam | appam | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 13 | Appam Stew | appam-stew | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 14 | Arunachal Thukpa | arunachal-thukpa | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 15 | Assamese Duck Curry | assamese-duck-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 16 | Avalakki | avalakki | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 17 | Bai | bai | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 18 | Bamboo Shoot Curry | bamboo-shoot-curry | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 19 | Bamboo Shoot Pork | bamboo-shoot-pork | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 20 | Basanti Pulao | basanti-pulao | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 21 | Bassaru | bassaru | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 22 | Batata Poha | batata-poha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 23 | Batata Vada | batata-vada | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 24 | Beerakaya Pappu | beerakaya-pappu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 25 | Bele Saaru | bele-saaru | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 26 | Bhetki Paturi | bhetki-paturi | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 27 | Bisibelebath | bisibelebath | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 28 | Black Sesame Chicken | black-sesame-chicken | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 29 | Bombil Fry | bombil-fry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 30 | Bread Pakora | bread-pakora | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 31 | Butter Chicken | butter-chicken | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 32 | Chakli | chakli | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 33 | Chamthong | chamthong | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 34 | Cheese Paratha | cheese-paratha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 35 | Chemmeen Theeyal | chemmeen-theeyal | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 36 | Chepala Pulusu | chepala-pulusu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 37 | Cherupayar Curry | cherupayar-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 38 | Chettinad Chicken Curry | chettinad-chicken-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 39 | Chettinad Pepper Chicken | chettinad-pepper-chicken | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 40 | Chhanar Dalna | chhanar-dalna | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 41 | Chicken 555 | chicken-555 | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 42 | Chicken 65 | chicken-65 | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 43 | Chicken Biryani | chicken-biryani | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 44 | Chicken Kosha | chicken-kosha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 45 | Chicken Majestic | chicken-majestic | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 46 | Chicken Roll | chicken-roll | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 47 | Chicken Stew | chicken-stew | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 48 | Chicken Sukka | chicken-sukka | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 49 | Chicken Sukka Maharashtrian | chicken-sukka-maharashtrian | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 50 | Chilli Chicken | chilli-chicken | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |

## Top 100 Most Visible Recipes

| Rank | Title | Slug | Score | Image status | Image type | Recommendation surfaces | Frequency estimate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Aamti | aamti | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 2 | Adai | adai | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 3 | Adai Avial | adai-avial | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 4 | Akki Roti | akki-roti | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 5 | Aloo Paratha | aloo-paratha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 6 | Aloo Potol Posto | aloo-potol-posto | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 7 | Andhra Chicken Curry | andhra-chicken-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 8 | Andhra Egg Fry | andhra-egg-fry | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 9 | Andhra Fish Fry | andhra-fish-fry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 10 | Andhra Kodi Vepudu | andhra-kodi-vepudu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 11 | Andhra Podi Idli | andhra-podi-idli | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 12 | Appam | appam | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 13 | Appam Stew | appam-stew | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 14 | Arunachal Thukpa | arunachal-thukpa | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 15 | Assamese Duck Curry | assamese-duck-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 16 | Avalakki | avalakki | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 17 | Bai | bai | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 18 | Bamboo Shoot Curry | bamboo-shoot-curry | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 19 | Bamboo Shoot Pork | bamboo-shoot-pork | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 20 | Basanti Pulao | basanti-pulao | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 21 | Bassaru | bassaru | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 22 | Batata Poha | batata-poha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 23 | Batata Vada | batata-vada | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 24 | Beerakaya Pappu | beerakaya-pappu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 25 | Bele Saaru | bele-saaru | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 26 | Bhetki Paturi | bhetki-paturi | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 27 | Bisibelebath | bisibelebath | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 28 | Black Sesame Chicken | black-sesame-chicken | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 29 | Bombil Fry | bombil-fry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 30 | Bread Pakora | bread-pakora | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 31 | Butter Chicken | butter-chicken | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 32 | Chakli | chakli | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 33 | Chamthong | chamthong | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 34 | Cheese Paratha | cheese-paratha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 35 | Chemmeen Theeyal | chemmeen-theeyal | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 36 | Chepala Pulusu | chepala-pulusu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 37 | Cherupayar Curry | cherupayar-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 38 | Chettinad Chicken Curry | chettinad-chicken-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 39 | Chettinad Pepper Chicken | chettinad-pepper-chicken | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 40 | Chhanar Dalna | chhanar-dalna | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 41 | Chicken 555 | chicken-555 | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 42 | Chicken 65 | chicken-65 | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 43 | Chicken Biryani | chicken-biryani | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 44 | Chicken Kosha | chicken-kosha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 45 | Chicken Majestic | chicken-majestic | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 46 | Chicken Roll | chicken-roll | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 47 | Chicken Stew | chicken-stew | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 48 | Chicken Sukka | chicken-sukka | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 49 | Chicken Sukka Maharashtrian | chicken-sukka-maharashtrian | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 50 | Chilli Chicken | chilli-chicken | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 51 | Chingri Malai Curry | chingri-malai-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 52 | Chingri Xaak | chingri-xaak | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 53 | Chirer Pulao | chirer-pulao | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 54 | Cholar Dal | cholar-dal | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 55 | Chole Chawal | chole-chawal | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 56 | Chow Chow Bath | chow-chow-bath | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 57 | Coconut Rice | coconut-rice | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 58 | Coconut Sevai | coconut-sevai | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 59 | Congress Kadlekai | congress-kadlekai | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 60 | Coorg Koli Curry | coorg-koli-curry | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 61 | Coorg Pandi Curry | coorg-pandi-curry | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 62 | Corn Paneer Bhurji Bowl | corn-paneer-bhurji-bowl | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 63 | Corn Sundal | corn-sundal | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 64 | Daab Chingri | daab-chingri | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 65 | Dadpe Pohe | dadpe-pohe | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 66 | Dal Makhani | dal-makhani | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 67 | Dal Roti | dal-roti | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 68 | Davangere Benne Dosa | davangere-benne-dosa | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 69 | Dhokar Dalna | dhokar-dalna | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 70 | Dhokla | dhokla | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 71 | Dibba Rotti | dibba-rotti | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 72 | Dohneiiong | dohneiiong | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 73 | Doi Maach | doi-maach | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 74 | Dosakaya Pappu | dosakaya-pappu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 75 | Egg Bhurji | egg-bhurji | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 76 | Egg Paratha | egg-paratha | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 77 | Fish Fry Tamil Style | fish-fry-tamil-style | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 78 | Fish Pakora | fish-pakora | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 79 | Galho | galho | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 80 | Garlic Paneer Roti Wrap | garlic-paneer-roti-wrap | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 81 | Ghee Rice | ghee-rice | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 82 | Ghugni | ghugni | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 83 | Girmit | girmit | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 84 | Goan Fish Curry | goan-fish-curry | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 85 | Goan Prawn Balchao | goan-prawn-balchao | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 86 | Gongura Mutton | gongura-mutton | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 87 | Gongura Pappu | gongura-pappu | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 88 | Gujarati Dal | gujarati-dal | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 89 | Gunpowder Idli | gunpowder-idli | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 90 | Guntur Chicken Fry | guntur-chicken-fry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 91 | Guntur Chilli Chicken | guntur-chilli-chicken | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 92 | Gyapa Khazi | gyapa-khazi | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 93 | Haleem | haleem | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 94 | Handvo | handvo | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 95 | Idiyappam Egg Curry | idiyappam-egg-curry | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 96 | Iyengar Bakery Toast | iyengar-bakery-toast | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 97 | Jadoh | jadoh | 92 | excellent | dedicated | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 98 | Jhalmuri | jhalmuri | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 99 | Jolada Rotti | jolada-rotti | 92 | image debt: placeholder/generic | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |
| 100 | Kaaram Dosa | kaaram-dosa | 92 | image debt: shared | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Very high |

## Most Visible Recipes: Surface Detail

| Rank | Title | Slug | Score | Collections count | Regional Journey membership | Hero | Today Picks | Pantry | Mood | Global Bites |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Aamti | aamti | 92 | 1 | Maharashtra | yes | yes | yes | yes | no |
| 2 | Adai | adai | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 3 | Adai Avial | adai-avial | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 4 | Akki Roti | akki-roti | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 5 | Aloo Paratha | aloo-paratha | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 6 | Aloo Potol Posto | aloo-potol-posto | 92 | 1 | Bengal | yes | yes | yes | yes | no |
| 7 | Andhra Chicken Curry | andhra-chicken-curry | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 8 | Andhra Egg Fry | andhra-egg-fry | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 9 | Andhra Fish Fry | andhra-fish-fry | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 10 | Andhra Kodi Vepudu | andhra-kodi-vepudu | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 11 | Andhra Podi Idli | andhra-podi-idli | 92 | 2 | Andhra & Telangana | yes | yes | yes | yes | no |
| 12 | Appam | appam | 92 | 1 | Kerala | yes | yes | yes | yes | no |
| 13 | Appam Stew | appam-stew | 92 | 1 | Kerala | yes | yes | yes | yes | no |
| 14 | Arunachal Thukpa | arunachal-thukpa | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 15 | Assamese Duck Curry | assamese-duck-curry | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 16 | Avalakki | avalakki | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 17 | Bai | bai | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 18 | Bamboo Shoot Curry | bamboo-shoot-curry | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 19 | Bamboo Shoot Pork | bamboo-shoot-pork | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 20 | Basanti Pulao | basanti-pulao | 92 | 2 | Bengal | yes | yes | yes | yes | no |
| 21 | Bassaru | bassaru | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 22 | Batata Poha | batata-poha | 92 | 1 | Maharashtra | yes | yes | yes | yes | no |
| 23 | Batata Vada | batata-vada | 92 | 1 | Maharashtra | yes | yes | yes | yes | no |
| 24 | Beerakaya Pappu | beerakaya-pappu | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 25 | Bele Saaru | bele-saaru | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 26 | Bhetki Paturi | bhetki-paturi | 92 | 2 | Bengal | yes | yes | yes | yes | no |
| 27 | Bisibelebath | bisibelebath | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 28 | Black Sesame Chicken | black-sesame-chicken | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 29 | Bombil Fry | bombil-fry | 92 | 1 | Maharashtra | yes | yes | yes | yes | no |
| 30 | Bread Pakora | bread-pakora | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 31 | Butter Chicken | butter-chicken | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 32 | Chakli | chakli | 92 | 2 | Maharashtra | yes | yes | yes | yes | no |
| 33 | Chamthong | chamthong | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 34 | Cheese Paratha | cheese-paratha | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 35 | Chemmeen Theeyal | chemmeen-theeyal | 92 | 1 | Kerala | yes | yes | yes | yes | no |
| 36 | Chepala Pulusu | chepala-pulusu | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 37 | Cherupayar Curry | cherupayar-curry | 92 | 1 | Kerala | yes | yes | yes | yes | no |
| 38 | Chettinad Chicken Curry | chettinad-chicken-curry | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 39 | Chettinad Pepper Chicken | chettinad-pepper-chicken | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 40 | Chhanar Dalna | chhanar-dalna | 92 | 2 | Bengal | yes | yes | yes | yes | no |
| 41 | Chicken 555 | chicken-555 | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 42 | Chicken 65 | chicken-65 | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 43 | Chicken Biryani | chicken-biryani | 92 | 2 | Andhra & Telangana | yes | yes | yes | yes | no |
| 44 | Chicken Kosha | chicken-kosha | 92 | 1 | Bengal | yes | yes | yes | yes | no |
| 45 | Chicken Majestic | chicken-majestic | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 46 | Chicken Roll | chicken-roll | 92 | 1 | Bengal | yes | yes | yes | yes | no |
| 47 | Chicken Stew | chicken-stew | 92 | 1 | Kerala | yes | yes | yes | yes | no |
| 48 | Chicken Sukka | chicken-sukka | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 49 | Chicken Sukka Maharashtrian | chicken-sukka-maharashtrian | 92 | 1 | Maharashtra | yes | yes | yes | yes | no |
| 50 | Chilli Chicken | chilli-chicken | 92 | 1 | Bengal | yes | yes | yes | yes | no |
| 51 | Chingri Malai Curry | chingri-malai-curry | 92 | 2 | Bengal | yes | yes | yes | yes | no |
| 52 | Chingri Xaak | chingri-xaak | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 53 | Chirer Pulao | chirer-pulao | 92 | 1 | Bengal | yes | yes | yes | yes | no |
| 54 | Cholar Dal | cholar-dal | 92 | 2 | Bengal | yes | yes | yes | yes | no |
| 55 | Chole Chawal | chole-chawal | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 56 | Chow Chow Bath | chow-chow-bath | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 57 | Coconut Rice | coconut-rice | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 58 | Coconut Sevai | coconut-sevai | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 59 | Congress Kadlekai | congress-kadlekai | 92 | 2 | Karnataka | yes | yes | yes | yes | no |
| 60 | Coorg Koli Curry | coorg-koli-curry | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 61 | Coorg Pandi Curry | coorg-pandi-curry | 92 | 2 | Karnataka | yes | yes | yes | yes | no |
| 62 | Corn Paneer Bhurji Bowl | corn-paneer-bhurji-bowl | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 63 | Corn Sundal | corn-sundal | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 64 | Daab Chingri | daab-chingri | 92 | 2 | Bengal | yes | yes | yes | yes | no |
| 65 | Dadpe Pohe | dadpe-pohe | 92 | 1 | Maharashtra | yes | yes | yes | yes | no |
| 66 | Dal Makhani | dal-makhani | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 67 | Dal Roti | dal-roti | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 68 | Davangere Benne Dosa | davangere-benne-dosa | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 69 | Dhokar Dalna | dhokar-dalna | 92 | 2 | Bengal | yes | yes | yes | yes | no |
| 70 | Dhokla | dhokla | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 71 | Dibba Rotti | dibba-rotti | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 72 | Dohneiiong | dohneiiong | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 73 | Doi Maach | doi-maach | 92 | 1 | Bengal | yes | yes | yes | yes | no |
| 74 | Dosakaya Pappu | dosakaya-pappu | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 75 | Egg Bhurji | egg-bhurji | 92 | 2 | Maharashtra | yes | yes | yes | yes | no |
| 76 | Egg Paratha | egg-paratha | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 77 | Fish Fry Tamil Style | fish-fry-tamil-style | 92 | 1 | Tamil Nadu | yes | yes | yes | yes | no |
| 78 | Fish Pakora | fish-pakora | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 79 | Galho | galho | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 80 | Garlic Paneer Roti Wrap | garlic-paneer-roti-wrap | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 81 | Ghee Rice | ghee-rice | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 82 | Ghugni | ghugni | 92 | 1 | Bengal | yes | yes | yes | yes | no |
| 83 | Girmit | girmit | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 84 | Goan Fish Curry | goan-fish-curry | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 85 | Goan Prawn Balchao | goan-prawn-balchao | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 86 | Gongura Mutton | gongura-mutton | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 87 | Gongura Pappu | gongura-pappu | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 88 | Gujarati Dal | gujarati-dal | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 89 | Gunpowder Idli | gunpowder-idli | 92 | 2 | Andhra & Telangana, Tamil Nadu | yes | yes | yes | yes | no |
| 90 | Guntur Chicken Fry | guntur-chicken-fry | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 91 | Guntur Chilli Chicken | guntur-chilli-chicken | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |
| 92 | Gyapa Khazi | gyapa-khazi | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 93 | Haleem | haleem | 92 | 2 | Andhra & Telangana | yes | yes | yes | yes | no |
| 94 | Handvo | handvo | 92 | 1 | North & West India | yes | yes | yes | yes | no |
| 95 | Idiyappam Egg Curry | idiyappam-egg-curry | 92 | 1 | Kerala | yes | yes | yes | yes | no |
| 96 | Iyengar Bakery Toast | iyengar-bakery-toast | 92 | 2 | Karnataka | yes | yes | yes | yes | no |
| 97 | Jadoh | jadoh | 92 | 1 | Northeast | yes | yes | yes | yes | no |
| 98 | Jhalmuri | jhalmuri | 92 | 1 | Bengal | yes | yes | yes | yes | no |
| 99 | Jolada Rotti | jolada-rotti | 92 | 1 | Karnataka | yes | yes | yes | yes | no |
| 100 | Kaaram Dosa | kaaram-dosa | 92 | 1 | Andhra & Telangana | yes | yes | yes | yes | no |

## High Visibility Image Debt

Only recipes that are both high visibility and currently using placeholder, shared, or generic imagery are included here.

### P0 — Critical / Must replace before Beta 3

P0 is capped at the top 50 image-debt recipes by visibility score so the freeze list stays actionable.

| Rank | Title | Slug | Score | Image type | Surfaces | Regional Journey |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Aamti | aamti | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 2 | Adai | adai | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 3 | Adai Avial | adai-avial | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 4 | Aloo Paratha | aloo-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 5 | Aloo Potol Posto | aloo-potol-posto | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 6 | Andhra Chicken Curry | andhra-chicken-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 7 | Andhra Egg Fry | andhra-egg-fry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 8 | Andhra Fish Fry | andhra-fish-fry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 9 | Andhra Kodi Vepudu | andhra-kodi-vepudu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 10 | Appam | appam | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 11 | Appam Stew | appam-stew | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 12 | Arunachal Thukpa | arunachal-thukpa | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 13 | Assamese Duck Curry | assamese-duck-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 14 | Bai | bai | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 15 | Basanti Pulao | basanti-pulao | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 16 | Batata Poha | batata-poha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 17 | Batata Vada | batata-vada | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 18 | Beerakaya Pappu | beerakaya-pappu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 19 | Bhetki Paturi | bhetki-paturi | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 20 | Black Sesame Chicken | black-sesame-chicken | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 21 | Bombil Fry | bombil-fry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 22 | Bread Pakora | bread-pakora | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 23 | Butter Chicken | butter-chicken | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 24 | Chakli | chakli | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 25 | Chamthong | chamthong | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 26 | Cheese Paratha | cheese-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 27 | Chemmeen Theeyal | chemmeen-theeyal | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 28 | Chepala Pulusu | chepala-pulusu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 29 | Cherupayar Curry | cherupayar-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 30 | Chettinad Chicken Curry | chettinad-chicken-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 31 | Chettinad Pepper Chicken | chettinad-pepper-chicken | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 32 | Chhanar Dalna | chhanar-dalna | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 33 | Chicken 555 | chicken-555 | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 34 | Chicken Biryani | chicken-biryani | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 35 | Chicken Kosha | chicken-kosha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 36 | Chicken Majestic | chicken-majestic | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 37 | Chicken Stew | chicken-stew | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 38 | Chicken Sukka Maharashtrian | chicken-sukka-maharashtrian | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 39 | Chilli Chicken | chilli-chicken | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 40 | Chingri Malai Curry | chingri-malai-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 41 | Chingri Xaak | chingri-xaak | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 42 | Cholar Dal | cholar-dal | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 43 | Chow Chow Bath | chow-chow-bath | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 44 | Coconut Rice | coconut-rice | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 45 | Coconut Sevai | coconut-sevai | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 46 | Congress Kadlekai | congress-kadlekai | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 47 | Coorg Pandi Curry | coorg-pandi-curry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 48 | Corn Paneer Bhurji Bowl | corn-paneer-bhurji-bowl | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 49 | Corn Sundal | corn-sundal | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 50 | Daab Chingri | daab-chingri | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |

### P1 — Very high priority

P1 is the next 75 image-debt recipes after P0.

| Rank | Title | Slug | Score | Image type | Surfaces | Regional Journey |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Dadpe Pohe | dadpe-pohe | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 2 | Dal Roti | dal-roti | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 3 | Davangere Benne Dosa | davangere-benne-dosa | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 4 | Dhokla | dhokla | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 5 | Dibba Rotti | dibba-rotti | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 6 | Dohneiiong | dohneiiong | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 7 | Doi Maach | doi-maach | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 8 | Dosakaya Pappu | dosakaya-pappu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 9 | Egg Paratha | egg-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 10 | Fish Fry Tamil Style | fish-fry-tamil-style | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 11 | Fish Pakora | fish-pakora | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 12 | Garlic Paneer Roti Wrap | garlic-paneer-roti-wrap | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 13 | Girmit | girmit | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 14 | Goan Fish Curry | goan-fish-curry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 15 | Goan Prawn Balchao | goan-prawn-balchao | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 16 | Gongura Mutton | gongura-mutton | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 17 | Gongura Pappu | gongura-pappu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 18 | Guntur Chicken Fry | guntur-chicken-fry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 19 | Guntur Chilli Chicken | guntur-chilli-chicken | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 20 | Gyapa Khazi | gyapa-khazi | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 21 | Haleem | haleem | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 22 | Idiyappam Egg Curry | idiyappam-egg-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 23 | Iyengar Bakery Toast | iyengar-bakery-toast | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 24 | Jhalmuri | jhalmuri | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 25 | Jolada Rotti | jolada-rotti | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 26 | Kaaram Dosa | kaaram-dosa | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 27 | Kadala Curry | kadala-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 28 | Kanchipuram Idli | kanchipuram-idli | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 29 | Kanda Poha | kanda-poha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 30 | Kanji Payar | kanji-payar | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 31 | Kappa Meen Curry | kappa-meen-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 32 | Kari Dosa | kari-dosa | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 33 | Katachi Amti | katachi-amti | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 34 | Kayi Saaru | kayi-saaru | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 35 | Keema Undalu | keema-undalu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 36 | Keerai Masiyal | keerai-masiyal | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 37 | Kerala Beef Fry | kerala-beef-fry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 38 | Kerala Egg Roast | kerala-egg-roast | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 39 | Kerala Fish Curry | kerala-fish-curry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 40 | Kerala Fish Pollichathu | kerala-fish-pollichathu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 41 | Kerala Parotta Beef Fry | kerala-parotta-beef-fry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 42 | Kerala Rasam | kerala-rasam | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu, Kerala |
| 43 | Kerala Sambar | kerala-sambar | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 44 | Khasi Chicken Curry | khasi-chicken-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 45 | Kheema Pav | kheema-pav | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 46 | Kolhapuri Chicken | kolhapuri-chicken | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 47 | Kolkata Chicken Chaap | kolkata-chicken-chaap | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 48 | Kollu Rasam | kollu-rasam | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 49 | Kongunadu Chicken Curry | kongunadu-chicken-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 50 | Kootu | kootu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 51 | Koraishutir Kochuri | koraishutir-kochuri | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 52 | Kosha Mangsho | kosha-mangsho | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 53 | Kothimbir Vadi | kothimbir-vadi | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 54 | Laal Maas | laal-maas | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 55 | Lemon Sevai | lemon-sevai | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 56 | Macher Jhol | macher-jhol | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 57 | Madras Curry | madras-curry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 58 | Malabar Chicken Curry | malabar-chicken-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 59 | Malabar Fish Curry | malabar-fish-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 60 | Malvani Fish Curry | malvani-fish-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 61 | Mamidikaya Pappu | mamidikaya-pappu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 62 | Mandakki Oggarane | mandakki-oggarane | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 63 | Mangalore Goli Baje | mangalore-goli-baje | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 64 | Masala Bun | masala-bun | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 65 | Masala Dosa | masala-dosa | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 66 | Masale Bhaat | masale-bhaat | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 67 | Masor Tenga | masor-tenga | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 68 | Meen Kuzhambu | meen-kuzhambu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 69 | Methi Paratha | methi-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 70 | Methi Thepla | methi-thepla | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 71 | Minapa Garelu | minapa-garelu | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 72 | Mirapakaya Bajji | mirapakaya-bajji | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 73 | Mirchi Bajji | mirchi-bajji | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 74 | Momo | momo | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 75 | Mooli Paratha | mooli-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |

### P2 — Nice to have

P2 is remaining high-visibility image debt after the P0/P1 working sets.

| Rank | Title | Slug | Score | Image type | Surfaces | Regional Journey |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Mutton Chukka | mutton-chukka | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 2 | Mutton Keema Curry | mutton-keema-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 3 | Mutton Rezala | mutton-rezala | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 4 | Nadan Kozhi Curry | nadan-kozhi-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 5 | Nandu Rasam | nandu-rasam | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 6 | Nattu Kozhi Curry | nattu-kozhi-curry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 7 | Natu Kodi Pulusu | natu-kodi-pulusu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 8 | Ngari Fish Curry | ngari-fish-curry | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 9 | Onion Paratha | onion-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 10 | Pabda Jhol | pabda-jhol | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 11 | Palak Paneer | palak-paneer | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 12 | Palak Paratha | palak-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 13 | Paneer Bhurji | paneer-bhurji | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 14 | Paneer Mushroom Masala | paneer-mushroom-masala | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 15 | Paneer Pakora | paneer-pakora | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 16 | Paneer Paratha | paneer-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 17 | Paneer Pulao | paneer-pulao | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 18 | Paneer Tikka Masala | paneer-tikka-masala | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 19 | Parippu Curry | parippu-curry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 20 | Paruppu Urundai Kuzhambu | paruppu-urundai-kuzhambu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 21 | Pazham Pori | pazham-pori | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 22 | Peanut Poha | peanut-poha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 23 | Peas Pulao | peas-pulao | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 24 | Pepper Rasam | pepper-rasam | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 25 | Pesara Garelu | pesara-garelu | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 26 | Pesarattu | pesarattu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 27 | Pitha | pitha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal, Northeast |
| 28 | Pitha Assamese | pitha-assamese | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 29 | Pithla Bhakri | pithla-bhakri | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 30 | Pongal | pongal | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 31 | Poondu Kuzhambu | poondu-kuzhambu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 32 | Pork Curry | pork-curry | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 33 | Potol Dorma | potol-dorma | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 34 | Puli Kuzhambu | puli-kuzhambu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 35 | Punugulu | punugulu | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 36 | Royyala Iguru | royyala-iguru | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 37 | Sabudana Khichdi | sabudana-khichdi | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 38 | Sabudana Vada | sabudana-vada | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 39 | Sakinalu | sakinalu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 40 | Sambar Rice | sambar-rice | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 41 | Sanpiau | sanpiau | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 42 | Sarson Ka Saag | sarson-ka-saag | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 43 | Sarva Pindi | sarva-pindi | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 44 | Shankarpali | shankarpali | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 45 | Shorshe Ilish | shorshe-ilish | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 46 | Spicy Aloo Paratha | spicy-aloo-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 47 | Stuffed Paratha | stuffed-paratha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 48 | Sundakkai Vathal Kuzhambu | sundakkai-vathal-kuzhambu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 49 | Telebhaja | telebhaja | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 50 | Thalipeeth | thalipeeth | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 51 | Thatte Idli | thatte-idli | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 52 | Thukpa | thukpa | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 53 | Til Pitha | til-pitha | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 54 | Tomato Rasam | tomato-rasam | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 55 | Ulavacharu | ulavacharu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 56 | Unniyappam | unniyappam | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 57 | Upma Pesarattu | upma-pesarattu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 58 | Varan Bhaat | varan-bhaat | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 59 | Vatha Kuzhambu | vatha-kuzhambu | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 60 | Veg Pulao | veg-pulao | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 61 | Vegetable Stew | vegetable-stew | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 62 | Ven Pongal | ven-pongal | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 63 | Wai Wai Chaat | wai-wai-chaat | 92 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 64 | Zunka Bhakri | zunka-bhakri | 92 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 65 | Arepas | arepas | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 66 | Avocado Toast | avocado-toast | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 67 | Banana Pancakes | banana-pancakes | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 68 | Bao Buns | bao-buns | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 69 | Bibimbap Bowl | bibimbap-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 70 | Breakfast Burrito | breakfast-burrito | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 71 | Breakfast Quesadilla | breakfast-quesadilla | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 72 | Broccoli Cheddar Soup | broccoli-cheddar-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 73 | Bruschetta | bruschetta | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 74 | Chicken Egg Rice Bowl | chicken-egg-rice-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 75 | Chicken Mushroom Stir Fry | chicken-mushroom-stir-fry | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 76 | Chilli Paneer | chilli-paneer | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 77 | Corn Soup | corn-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 78 | Croque Monsieur | croque-monsieur | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 79 | Dragon Chicken | dragon-chicken | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 80 | Egg Fried Rice | egg-fried-rice | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 81 | Elote Corn | elote-corn | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 82 | Falafel Bites | falafel-bites | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 83 | Falafel Hummus Bowl | falafel-hummus-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 84 | Falafel Wrap | falafel-wrap | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 85 | French Onion Soup | french-onion-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 86 | French Toast | french-toast | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 87 | Garlic Bread | garlic-bread | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 88 | Garlic Egg Rice | garlic-egg-rice | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 89 | Hot and Sour Soup | hot-and-sour-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 90 | Hot Dog | hot-dog | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 91 | Hummus with Pita | hummus-with-pita | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 92 | Japanese Curry Rice | japanese-curry-rice | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 93 | Japanese Katsu Rice Bowl | japanese-katsu-rice-bowl | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 94 | Japanese Tamago Toast | japanese-tamago-toast | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 95 | Korean Corn Cheese | korean-corn-cheese | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 96 | Korean Egg Drop Sandwich | korean-egg-drop-sandwich | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 97 | Korean Seaweed Soup | korean-seaweed-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 98 | Korean Street Toast | korean-street-toast | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 99 | Lemon Coriander Soup | lemon-coriander-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 100 | Lentil Soup | lentil-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 101 | Loaded Fries | loaded-fries | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 102 | Loaded Potato Wedges | loaded-potato-wedges | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 103 | Manchow Soup | manchow-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 104 | Mediterranean Chickpea Bowl | mediterranean-chickpea-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 105 | Mexican Burrito Bowl | mexican-burrito-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 106 | Mexican Tortilla Soup | mexican-tortilla-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 107 | Minestrone | minestrone | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 108 | Miso Soup | miso-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 109 | Mozzarella Sticks | mozzarella-sticks | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 110 | Mushroom Soup | mushroom-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 111 | Nachos | nachos | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 112 | Noodle Soup | noodle-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 113 | Paneer Fried Rice | paneer-fried-rice | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 114 | Quesadilla | quesadilla | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 115 | Schezwan Fried Rice | schezwan-fried-rice | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 116 | Sesame Cucumber Salad | sesame-cucumber-salad | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 117 | Sesame Tofu Rice Bowl | sesame-tofu-rice-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 118 | Shakshuka | shakshuka | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 119 | Shawarma Wrap | shawarma-wrap | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 120 | Spaghetti Aglio e Olio | spaghetti-aglio-e-olio | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 121 | Spanish Omelette | spanish-omelette | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 122 | Sweet Corn Soup | sweet-corn-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 123 | Tacos | tacos | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 124 | Teriyaki Chicken Rice Bowl | teriyaki-chicken-rice-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 125 | Teriyaki Tofu Bowl | teriyaki-tofu-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 126 | Thai Green Curry | thai-green-curry | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 127 | Thai Peanut Noodle Bowl | thai-peanut-noodle-bowl | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 128 | Thai Tom Yum Soup | thai-tom-yum-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 129 | Tofu Poke Bowl | tofu-poke-bowl | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 130 | Tomato Basil Pasta | tomato-basil-pasta | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 131 | Tomato Basil Soup | tomato-basil-soup | 88 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 132 | Veg Fried Rice | veg-fried-rice | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 133 | Veg Manchurian | veg-manchurian | 88 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 134 | Axone Chicken | axone-chicken | 87 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 135 | Chhurpi Soup | chhurpi-soup | 87 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 136 | Edamame | edamame | 83 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Global Bites | — |
| 137 | Aloo Rice | aloo-rice | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 138 | Apple Puree | apple-puree | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 139 | Banana Pancake | banana-pancake | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 140 | Beetroot Soup | beetroot-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 141 | Boiled Corn | boiled-corn | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 142 | Bottle Gourd Soup | bottle-gourd-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 143 | Bread Upma | bread-upma | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 144 | Broccoli Soup | broccoli-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 145 | Cabbage Soup | cabbage-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 146 | Carrot Soup | carrot-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 147 | Chaat | chaat | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 148 | Cheese Dosa | cheese-dosa | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 149 | Cheese Omelette | cheese-omelette | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 150 | Cheese Uttapam | cheese-uttapam | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 151 | Cheese Veg Sandwich | cheese-veg-sandwich | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 152 | Chicken Capsicum Stir Fry Bowl | chicken-capsicum-stir-fry-bowl | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 153 | Chicken Curry | chicken-curry | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 154 | Chicken Pepper Rice Bowl | chicken-pepper-rice-bowl | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 155 | Chicken Potato Curry | chicken-potato-curry | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 156 | Chicken Pulao | chicken-pulao | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 157 | Chicken Soup | chicken-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 158 | Chicken Tomato Rice | chicken-tomato-rice | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 159 | Dal Rice | dal-rice | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 160 | Dosa | dosa | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 161 | Dosa Roll | dosa-roll | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 162 | Drumstick Soup | drumstick-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 163 | Egg Capsicum Bhurji | egg-capsicum-bhurji | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 164 | Egg Curry | egg-curry | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 165 | Egg Curry Rice | egg-curry-rice | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 166 | Egg Dosa | egg-dosa | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 167 | Egg Sandwich | egg-sandwich | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 168 | Egg Toast | egg-toast | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 169 | Egg Tomato Rice Bowl | egg-tomato-rice-bowl | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 170 | Fish Curry | fish-curry | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 171 | Fish Curry Rice | fish-curry-rice | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 172 | Fish Fry | fish-fry | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 173 | Garlic Soup | garlic-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 174 | Idli | idli | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 175 | Keema Fry | keema-fry | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 176 | Mango Rice | mango-rice | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 177 | Masala Corn | masala-corn | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 178 | Milk Toast | milk-toast | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 179 | Millet Soup | millet-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 180 | Mini Dhokla | mini-dhokla | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 181 | Mini Idli | mini-idli | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 182 | Mini Uttapam | mini-uttapam | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 183 | Mixed Veg Soup | mixed-veg-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 184 | Moong Dal Soup | moong-dal-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 185 | Moong Dal Vegetable Khichdi | moong-dal-vegetable-khichdi | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 186 | Mushroom Omelette | mushroom-omelette | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 187 | Mushroom Pepper Rice Bowl | mushroom-pepper-rice-bowl | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 188 | Mutton Korma | mutton-korma | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 189 | Mutton Pulao | mutton-pulao | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 190 | Oats Soup | oats-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 191 | One Pot Dal Palak Rice | one-pot-dal-palak-rice | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 192 | Onion Dosa | onion-dosa | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 193 | Onion Omelette | onion-omelette | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 194 | Onion Uttapam | onion-uttapam | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 195 | Paneer Bhurji Wrap | paneer-bhurji-wrap | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 196 | Paneer Capsicum Rice Bowl | paneer-capsicum-rice-bowl | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 197 | Paneer Corn Rice Bowl | paneer-corn-rice-bowl | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 198 | Paneer Dosa | paneer-dosa | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 199 | Paneer Sandwich | paneer-sandwich | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 200 | Paneer Soup | paneer-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 201 | Peas Soup | peas-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 202 | Pumpkin Soup | pumpkin-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 203 | Ragi Dosa | ragi-dosa | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 204 | Rava Idli | rava-idli | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 205 | Rice Cakes | rice-cakes | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 206 | Rice Moong Khichdi | rice-moong-khichdi | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 207 | Rice Porridge | rice-porridge | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 208 | Roasted Chana Chaat | roasted-chana-chaat | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 209 | Rose Cookies | rose-cookies | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 210 | Soft Idli | soft-idli | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 211 | Spicy Masala Dosa | spicy-masala-dosa | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 212 | Spinach Soup | spinach-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 213 | Tomato Omelette | tomato-omelette | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 214 | Tomato Soup | tomato-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 215 | Tomato Uttapam | tomato-uttapam | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 216 | Veg Cutlet | veg-cutlet | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 217 | Veg Sandwich | veg-sandwich | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 218 | Vegetable Puree | vegetable-puree | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 219 | Vegetable Seviyan | vegetable-seviyan | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 220 | Vegetable Soup | vegetable-soup | 82 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 221 | Vegetable Uttapam | vegetable-uttapam | 82 | shared | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 222 | Kalkals | kalkals | 77 | placeholder | Tomo Pick, Today's Picks, Pantry, Mood, Collections | — |
| 223 | Anarsa | anarsa | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 224 | Apong Rice Drink | apong-rice-drink | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 225 | Ellu Bella | ellu-bella | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 226 | Holige | holige | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 227 | Jal Jeera | jal-jeera | 68 | shared | Today's Picks, Pantry, Mood, Collections, Regional Journey | North & West India |
| 228 | Jigarthanda | jigarthanda | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 229 | Kadubu | kadubu | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 230 | Karadantu | karadantu | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 231 | Kozhukattai | kozhukattai | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 232 | Mysore Pak | mysore-pak | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 233 | Neer Mor | neer-mor | 68 | shared | Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 234 | Obbattu | obbattu | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 235 | Palada Payasam | palada-payasam | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 236 | Patishapta | patishapta | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 237 | Puran Poli | puran-poli | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 238 | Rasmalai | rasmalai | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 239 | Rava Kesari | rava-kesari | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 240 | Roshogolla | roshogolla | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 241 | Sakkarai Pongal | sakkarai-pongal | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 242 | Sambharam | sambharam | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 243 | Sandesh | sandesh | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 244 | Sel Roti | sel-roti | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Northeast |
| 245 | Sheer Khurma | sheer-khurma | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 246 | Sheera | sheera | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 247 | Sol Kadhi | sol-kadhi | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 248 | Sweet Holige | sweet-holige | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka, Maharashtra |
| 249 | Sweet Pongal | sweet-pongal | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 250 | Tilgul | tilgul | 68 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 251 | Ariselu | ariselu | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 252 | Basundi | basundi | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 253 | Bobbatlu | bobbatlu | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 254 | Dharwad Peda | dharwad-peda | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Karnataka |
| 255 | Ela Ada | ela-ada | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Kerala |
| 256 | Elaneer Payasam | elaneer-payasam | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Tamil Nadu |
| 257 | Mishti Doi | mishti-doi | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 258 | Nolen Gurer Payesh | nolen-gurer-payesh | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Bengal |
| 259 | Pootharekulu | pootharekulu | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Andhra & Telangana |
| 260 | Shrikhand | shrikhand | 63 | placeholder | Today's Picks, Pantry, Mood, Collections, Regional Journey | Maharashtra |
| 261 | Besan Ladoo | besan-ladoo | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 262 | Buttermilk | buttermilk | 58 | shared | Today's Picks, Pantry, Mood, Collections | — |
| 263 | Carrot Halwa | carrot-halwa | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 264 | Chocolate Burfi | chocolate-burfi | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 265 | Coconut Barfi | coconut-barfi | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 266 | Coconut Macaroons | coconut-macaroons | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 267 | Dry Fruit Ladoo | dry-fruit-ladoo | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 268 | Falooda | falooda | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 269 | Gujiya | gujiya | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 270 | Gulab Jamun | gulab-jamun | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 271 | Jalebi | jalebi | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 272 | Jeera Water | jeera-water | 58 | shared | Today's Picks, Pantry, Mood, Collections | — |
| 273 | Kada Prasad | kada-prasad | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 274 | Kaju Katli | kaju-katli | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 275 | Kalakand | kalakand | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 276 | Kheer | kheer | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 277 | Kulfi | kulfi | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 278 | Ladoo | ladoo | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 279 | Malpua | malpua | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 280 | Moong Dal Halwa | moong-dal-halwa | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 281 | Motichoor Ladoo | motichoor-ladoo | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 282 | Payasam | payasam | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 283 | Peda | peda | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 284 | Phirni | phirni | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 285 | Rice Kheer | rice-kheer | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 286 | Seviyan | seviyan | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 287 | Sweet Rice | sweet-rice | 58 | placeholder | Today's Picks, Pantry, Mood, Collections | — |
| 288 | Veg Seviyan | veg-seviyan | 58 | shared | Today's Picks, Pantry, Mood, Collections | — |

## Already Excellent: Tomo Image Benchmarks

High-visibility recipes that already have dedicated images. Use these as style and quality benchmarks for the remaining image debt.

| Rank | Title | Slug | Score | Image path | Surfaces |
| --- | --- | --- | --- | --- | --- |
| 1 | Akki Roti | akki-roti | 92 | /assets/images/dishes/akki-rotti.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 2 | Andhra Podi Idli | andhra-podi-idli | 92 | /assets/images/dishes/andhra-podi-idli-homestyle.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 3 | Avalakki | avalakki | 92 | /assets/images/dishes/consistency-45-avalakki.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 4 | Bamboo Shoot Curry | bamboo-shoot-curry | 92 | /assets/images/dishes/bamboo-shoot-curry.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 5 | Bamboo Shoot Pork | bamboo-shoot-pork | 92 | /assets/images/dishes/bamboo-shoot-pork.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 6 | Bassaru | bassaru | 92 | /assets/images/dishes/bassaru.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 7 | Bele Saaru | bele-saaru | 92 | /assets/images/dishes/batch3b-bele-saaru.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 8 | Bisibelebath | bisibelebath | 92 | /assets/images/dishes/bisi-bele-bath.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 9 | Chicken 65 | chicken-65 | 92 | /assets/images/snacks/chicken-65.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 10 | Chicken Roll | chicken-roll | 92 | /assets/images/dishes/batch6-chicken-roll.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 11 | Chicken Sukka | chicken-sukka | 92 | /assets/images/dishes/chicken-sukka.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 12 | Chirer Pulao | chirer-pulao | 92 | /assets/images/dishes/batch5-chirer-pulao.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 13 | Chole Chawal | chole-chawal | 92 | /assets/images/dishes/batch3a-chole-chawal.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 14 | Coorg Koli Curry | coorg-koli-curry | 92 | /assets/images/dishes/coorg-koli-curry.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 15 | Dal Makhani | dal-makhani | 92 | /assets/images/dishes/consistency-45-dal-makhani.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 16 | Dhokar Dalna | dhokar-dalna | 92 | /assets/images/dishes/batch4-dhokar-dalna.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 17 | Egg Bhurji | egg-bhurji | 92 | /assets/images/dishes/batch5-egg-bhurji.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 18 | Galho | galho | 92 | /assets/images/dishes/galho.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 19 | Ghee Rice | ghee-rice | 92 | /assets/images/dishes/ghee-rice.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 20 | Ghugni | ghugni | 92 | /assets/images/dishes/batch4-ghugni.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 21 | Gujarati Dal | gujarati-dal | 92 | /assets/images/dishes/batch4-gujarati-dal.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 22 | Gunpowder Idli | gunpowder-idli | 92 | /assets/images/dishes/gunpowder-idli.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 23 | Handvo | handvo | 92 | /assets/images/dishes/batch4-handvo.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 24 | Jadoh | jadoh | 92 | /assets/images/dishes/jadoh-homestyle.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 25 | Kachori | kachori | 92 | /assets/images/dishes/batch4-kachori.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 26 | Kadai Paneer | kadai-paneer | 92 | /assets/images/dishes/batch3a-kadai-paneer.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 27 | Kadambuttu | kadambuttu | 92 | /assets/images/dishes/kadambuttu.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 28 | Kadhi Chawal | kadhi-chawal | 92 | /assets/images/dishes/batch3a-kadhi-chawal.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 29 | Khandvi | khandvi | 92 | /assets/images/dishes/khandvi.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 30 | Khar | khar | 92 | /assets/images/dishes/khar.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 31 | Kodubale | kodubale | 92 | /assets/images/dishes/batch3b-kodubale.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 32 | Kori Rotti | kori-rotti | 92 | /assets/images/dishes/batch3b-kori-rotti.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 33 | Kotte Kadubu | kotte-kadubu | 92 | /assets/images/dishes/kotte-kadubu.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 34 | Kuzhi Paniyaram | kuzhi-paniyaram | 92 | /assets/images/dishes/kuzhi-paniyaram.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 35 | Lemon Rice | lemon-rice | 92 | /assets/images/dishes/chitranna-lemon-rice.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 36 | Luchi Aloor Dom | luchi-aloor-dom | 92 | /assets/images/dishes/batch4-luchi-aloor-dom.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 37 | Maddur Vada | maddur-vada | 92 | /assets/images/dishes/maddur-vada.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 38 | Mangalore Buns | mangalore-buns | 92 | /assets/images/dishes/mangalore-buns.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 39 | Mangalorean Fish Curry | mangalorean-fish-curry | 92 | /assets/images/dishes/mangalorean-fish-curry.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |
| 40 | Matar Paneer | matar-paneer | 92 | /assets/images/dishes/batch5-matar-paneer.png | Tomo Pick, Today's Picks, Pantry, Mood, Collections, Regional Journey |

## User-Facing Image Quality Improvement Estimate

| Set | Current dedicated | Current shared | Current placeholder/generic | Current quality estimate | If fixed | Expected improvement |
| --- | --- | --- | --- | --- | --- | --- |
| Top 50 | 11/50 | 27 | 12 | 46/100 | 100/100 | +54 |
| Top 100 | 24/100 | 47 | 29 | 45/100 | 100/100 | +55 |
| Top 200 | 56/200 | 89 | 55 | 48/100 | 100/100 | +52 |

Interpretation: shared images receive partial credit because they load correctly but reduce perceived polish. Placeholder/generic images receive no quality credit for this estimate.

## Recommended Image Replacement Order

1. Replace P0 shared/placeholder images first, especially major-card eligible mains, soups and snacks.
2. Replace P1 recipes that sit inside Regional Journeys and Today Picks eligibility.
3. Replace P2 by journey/collection batch to preserve visual consistency.
4. Keep dedicated high-visibility recipes as style references rather than regenerating them.

## Files Inspected

- database/generated/recipes.json
- frontend/local-recipes.js
- frontend/mobile/mobile-shell.js
- frontend/assets/images/**

## Read-only Guarantee

No recipe data, mappings, collections, recommendation logic, or image files were modified. This report is the only intended output.
