# Pantry Intelligence V3 Audit

Generated: 2026-06-26T14:49:11.738Z

Overall status: **PASS**

Pantry Intelligence Score: **100/100**

## Summary

- Scenarios: 10
- PASS: 10
- WARNING: 0
- Knowledge bridge failures: 0
- Repetitive recommendation rows: 0
- Tomato + Onion status: PASS
- Horse Gram status: PASS

## Scenario Results

| Scenario | Status | ExpectedHits | TopRecommendations |
| --- | --- | --- | --- |
| Rice + Tomato + Onion | PASS | 2 | Egg Curry Rice, Egg Tomato Rice Bowl, Kerala Rasam, Tomato Rasam, Egg Curry |
| Horse Gram | PASS | 2 | Kollu Rasam, Ulavacharu |
| Palak | PASS | 3 | One Pot Dal Palak Rice, Palak Paratha, Palak Dal, Palak Paneer, Bassaru |
| Coconut | PASS | 4 | Coconut Rice, Coconut Chutney, Appam, Appam Stew, Avial |
| Tamarind | PASS | 4 | Puliyogare, Rasam Rice, Bele Saaru, Bendakaya Pulusu, Kayi Saaru |
| Rice + Egg | PASS | 2 | Egg Curry Rice, Egg Fried Rice, Egg Curry, Egg Bhurji, Idiyappam Egg Curry |
| Paneer + Capsicum | PASS | 2 | Paneer Tikka Masala, Chilli Paneer, Paneer Bhurji Wrap, Paneer Capsicum Rice Bowl, Garlic Paneer Roti Wrap |
| Fish | PASS | 2 | Fish Curry Rice, Fish Fry, Goan Fish Curry, Chepala Pulusu, Fish Fry Tamil Style |
| Prawns | PASS | 3 | Chingri Malai Curry, Daab Chingri, Chemmeen Theeyal, Chingri Xaak, Royyala Iguru |
| Chicken | PASS | 2 | Guntur Chicken Fry, Chicken Mushroom Stir Fry, Chicken Stew, Chettinad Pepper Chicken, Chicken Biryani |

## Rice + Tomato + Onion

Selected: rice, tomato, onion

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Egg Curry Rice | 61760 | 3000 | 1560 | 42000 | 3600 | rice (rice+tomato+onion), curry base (tomato+onion), egg (onion) | rice:core, tomato:core, onion:core |
| 2 | Egg Tomato Rice Bowl | 57360 | 3000 | 1560 | 35000 | 3600 | rice (rice+tomato+onion), egg (onion) | rice:core, tomato:core, onion:core |
| 3 | Kerala Rasam | 39275 | 2000 | 575 | 42000 | 1200 | rasam (tomato), soup (tomato), saaru (curry base) | rice:optional, tomato:core, onion:unused |
| 4 | Tomato Rasam | 34320 | 1000 | 520 | 42000 | 1200 | rasam (tomato), soup (tomato), saaru (curry base) | rice:unused, tomato:core, onion:unused |
| 5 | Egg Curry | 27140 | 2000 | 1040 | 27000 | 3600 | curry base (tomato+onion), egg (onion) | rice:unused, tomato:core, onion:core |
| 6 | Masala Omelette | 26540 | 2000 | 440 | 27000 | 3600 | curry base (tomato+onion), egg (onion) | rice:unused, tomato:support, onion:support |
| 7 | Tomato Soup | 19740 | 2000 | 1040 | 17000 | 3600 | soup (tomato) | rice:unused, tomato:core, onion:core |
| 8 | Tomato Basil Soup | 16140 | 2000 | 1040 | 17000 | 0 | soup (tomato) | rice:unused, tomato:core, onion:core |

## Horse Gram

Selected: horse gram

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Kollu Rasam | 38720 | 1000 | 520 | 27000 | 1200 | kollu rasam (horse gram), saaru (horse gram), rasam (horse gram) | horse gram:core |
| 2 | Ulavacharu | 20720 | 1000 | 520 | 9000 | 1200 | ulavacharu (horse gram) | horse gram:core |

## Palak

Selected: palak

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | One Pot Dal Palak Rice | 48920 | 1000 | 520 | 36000 | 1200 | dal palak (palak), palak rice (palak), dal (palak), rice (palak) | palak:core |
| 2 | Palak Paratha | 32320 | 1000 | 520 | 18000 | 1200 | palak paratha (palak), paratha (palak) | palak:core |
| 3 | Palak Dal | 23320 | 1000 | 520 | 9000 | 1200 | dal (palak) | palak:core |
| 4 | Palak Paneer | 23320 | 1000 | 520 | 9000 | 1200 | palak paneer (palak) | palak:core |
| 5 | Bassaru | 20720 | 1000 | 520 | 9000 | 1200 | dal (palak) | palak:core |
| 6 | Sarson Ka Saag | 20720 | 1000 | 520 | 9000 | 1200 | saag (palak) | palak:core |
| 7 | Soppu Saaru | 20720 | 1000 | 520 | 9000 | 1200 | soppu saaru (palak) | palak:core |
| 8 | Galho | 19520 | 1000 | 520 | 9000 | 0 | rice (palak) | palak:core |

## Coconut

Selected: coconut

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Coconut Rice | 32320 | 1000 | 520 | 18000 | 1200 | coconut rice (coconut), rice (coconut) | coconut:core |
| 2 | Coconut Chutney | 31120 | 1000 | 520 | 18000 | 0 | coconut chutney (coconut), chutney (coconut) | coconut:core |
| 3 | Appam | 20720 | 1000 | 520 | 9000 | 1200 | rice (coconut) | coconut:core |
| 4 | Appam Stew | 20720 | 1000 | 520 | 9000 | 1200 | curry (coconut) | coconut:core |
| 5 | Avial | 20720 | 1000 | 520 | 9000 | 1200 | avial (coconut) | coconut:core |
| 6 | Beans Thoran | 20720 | 1000 | 520 | 9000 | 1200 | thoran (coconut) | coconut:core |
| 7 | Cabbage Thoran | 20720 | 1000 | 520 | 9000 | 1200 | thoran (coconut) | coconut:core |
| 8 | Cherupayar Curry | 20720 | 1000 | 520 | 9000 | 1200 | curry (coconut) | coconut:core |

## Tamarind

Selected: tamarind

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Puliyogare | 29720 | 1000 | 520 | 18000 | 1200 | puliyogare (tamarind), rice (tamarind) | tamarind:core |
| 2 | Rasam Rice | 29255 | 1000 | 55 | 18000 | 1200 | rasam (tamarind), rice (tamarind) | tamarind:optional |
| 3 | Bele Saaru | 20720 | 1000 | 520 | 9000 | 1200 | rasam (tamarind) | tamarind:core |
| 4 | Bendakaya Pulusu | 20720 | 1000 | 520 | 9000 | 1200 | pulusu (tamarind) | tamarind:core |
| 5 | Kayi Saaru | 20720 | 1000 | 520 | 9000 | 1200 | rasam (tamarind) | tamarind:core |
| 6 | Pachi Pulusu | 20720 | 1000 | 520 | 9000 | 1200 | pulusu (tamarind) | tamarind:core |
| 7 | Kerala Sambar | 20255 | 1000 | 55 | 9000 | 1200 | sambar (tamarind) | tamarind:optional |
| 8 | Udupi Sambar | 20255 | 1000 | 55 | 9000 | 1200 | sambar (tamarind) | tamarind:optional |

## Rice + Egg

Selected: rice, egg

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Egg Curry Rice | 61640 | 2000 | 1040 | 42000 | 2400 | rice (rice+egg), egg (egg), curry (egg), egg curry (egg) | rice:core, egg:core |
| 2 | Egg Fried Rice | 53240 | 2000 | 1040 | 36000 | 0 | rice (rice+egg), egg (egg), egg fried rice (egg) | rice:core, egg:core |
| 3 | Egg Curry | 27020 | 1000 | 520 | 27000 | 2400 | egg (egg), curry (egg), egg curry (egg) | rice:unused, egg:core |
| 4 | Egg Bhurji | 24620 | 1000 | 520 | 27000 | 0 | egg (egg), bhurji (egg), egg bhurji (egg) | rice:unused, egg:core |
| 5 | Idiyappam Egg Curry | 24620 | 1000 | 520 | 27000 | 0 | egg (egg), curry (egg), egg curry (egg) | rice:unused, egg:core |
| 6 | Egg Capsicum Bhurji | 18020 | 1000 | 520 | 18000 | 2400 | egg (egg), bhurji (egg) | rice:unused, egg:core |
| 7 | Breakfast Burrito | 4020 | 1000 | 520 | 9000 | 0 | breakfast (egg) | rice:unused, egg:core |
| 8 | Breakfast Quesadilla | 4020 | 1000 | 520 | 9000 | 0 | breakfast (egg) | rice:unused, egg:core |

## Paneer + Capsicum

Selected: paneer, capsicum

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Paneer Tikka Masala | 57540 | 2000 | 740 | 42000 | 1200 | paneer tikka (paneer), curry (paneer+capsicum), tikka (paneer), paneer curry (capsicum) | paneer:core, capsicum:support |
| 2 | Chilli Paneer | 43740 | 2000 | 740 | 27000 | 2400 | curry (paneer+capsicum), paneer curry (capsicum) | paneer:core, capsicum:support |
| 3 | Paneer Bhurji Wrap | 43575 | 2000 | 575 | 27000 | 2400 | paneer bhurji (paneer), bhurji (paneer+capsicum) | paneer:core, capsicum:optional |
| 4 | Paneer Capsicum Rice Bowl | 37640 | 2000 | 1040 | 18000 | 2400 | rice (paneer+capsicum) | paneer:core, capsicum:core |
| 5 | Garlic Paneer Roti Wrap | 24375 | 2000 | 575 | 9000 | 1200 | paratha (paneer) | paneer:core, capsicum:optional |
| 6 | Paneer Roll | 16575 | 2000 | 575 | 0 | 2400 | None | paneer:core, capsicum:optional |
| 7 | Paneer Dosa | 14340 | 2000 | 740 | 0 | 0 | None | paneer:core, capsicum:support |
| 8 | Paneer Corn Rice Bowl | 9020 | 1000 | 520 | 9000 | 2400 | rice (paneer) | paneer:core, capsicum:unused |

## Fish

Selected: fish

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Fish Curry Rice | 40120 | 1000 | 520 | 27000 | 0 | fish curry (fish), rice (fish), curry (fish) | fish:core |
| 2 | Fish Fry | 40120 | 1000 | 520 | 27000 | 0 | fish fry (fish), fish curry (fish), curry (fish) | fish:core |
| 3 | Goan Fish Curry | 32320 | 1000 | 520 | 18000 | 1200 | fish curry (fish), curry (fish) | fish:core |
| 4 | Chepala Pulusu | 28520 | 1000 | 520 | 18000 | 0 | fish curry (fish), curry (fish) | fish:core |
| 5 | Fish Fry Tamil Style | 23320 | 1000 | 520 | 9000 | 1200 | fish fry (fish) | fish:core |
| 6 | Andhra Fish Fry | 22120 | 1000 | 520 | 9000 | 0 | fish fry (fish) | fish:core |
| 7 | Kerala Fish Pollichathu | 14320 | 1000 | 520 | 0 | 1200 | None | fish:core |
| 8 | Kerala Fish Curry | 32320 | 1000 | 520 | 18000 | 1200 | fish curry (fish), curry (fish) | fish:core |

## Prawns

Selected: prawns

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Chingri Malai Curry | 20720 | 1000 | 520 | 9000 | 1200 | prawn curry (prawns) | prawns:core |
| 2 | Daab Chingri | 20720 | 1000 | 520 | 9000 | 1200 | prawn curry (prawns) | prawns:core |
| 3 | Chemmeen Theeyal | 11720 | 1000 | 520 | 0 | 1200 | None | prawns:core |
| 4 | Chingri Xaak | 10520 | 1000 | 520 | 0 | 0 | None | prawns:core |
| 5 | Royyala Iguru | 20720 | 1000 | 520 | 9000 | 1200 | prawn curry (prawns) | prawns:core |

## Chicken

Selected: chicken

Status: **PASS**

| Rank | Recipe | Final | Pantry | Strength | Family | Regional | Bridge | StrengthBreakdown |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Guntur Chicken Fry | 49120 | 1000 | 520 | 36000 | 0 | chicken curry (chicken), chicken fry (chicken), curry (chicken), fry (chicken) | chicken:core |
| 2 | Chicken Mushroom Stir Fry | 40120 | 1000 | 520 | 27000 | 0 | chicken curry (chicken), curry (chicken), fry (chicken) | chicken:core |
| 3 | Chicken Stew | 40120 | 1000 | 520 | 27000 | 0 | chicken curry (chicken), chicken stew (chicken), curry (chicken) | chicken:core |
| 4 | Chettinad Pepper Chicken | 31120 | 1000 | 520 | 18000 | 0 | chicken fry (chicken), fry (chicken) | chicken:core |
| 5 | Chicken Biryani | 31120 | 1000 | 520 | 18000 | 0 | biryani (chicken), rice (chicken) | chicken:core |
| 6 | Andhra Kodi Vepudu | 28520 | 1000 | 520 | 18000 | 0 | chicken fry (chicken), fry (chicken) | chicken:core |
| 7 | Natu Kodi Pulusu | 28520 | 1000 | 520 | 18000 | 0 | chicken curry (chicken), curry (chicken) | chicken:core |
| 8 | Chicken Pepper Rice Bowl | 23320 | 1000 | 520 | 9000 | 1200 | rice (chicken) | chicken:core |
