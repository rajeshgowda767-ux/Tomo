# Tomo Recommendation Diversity Layer Validation

Scope: recommendation diversity examples plus validation. One data metadata correction was made: Chirer Pulao now treats peanut as optional so Peanut Poha remains canonical for Poha + Peanut pantry matching.

## New user

### Before

- Aloo Jeera (potato sabzi, North, 70)
- Aloo Pitika (mash, Northeast, 70)
- Aloo Posto (potato sabzi, East, 70)
- Andhra Egg Fry (egg, South, 70)
- Beans Poriyal (poriyal, South, 70)
- Beans Thoran (thoran, South, 70)

### After

- Aloo Jeera (potato sabzi, North, 70)
- Aloo Pitika (mash, Northeast, 70)
- Andhra Egg Fry (egg, South, 70)
- Begun Bhaja (vegetable fry, East, 70)
- Egg Fried Rice (rice, Pan-Indian, 70)
- Prawn Sukka (fish-curry, Coastal, 70)

## Comfort Food user

### Before

- Akki Roti (paratha, South, 95)
- Aloo Jeera (potato sabzi, North, 95)
- Aloo Pitika (mash, Northeast, 95)
- Aloo Posto (potato sabzi, East, 95)
- Appam (appam, South, 95)
- Beans Poriyal (poriyal, South, 95)

### After

- Akki Roti (paratha, South, 95)
- Aloo Jeera (potato sabzi, North, 95)
- Aloo Pitika (mash, Northeast, 95)
- Begun Bhaja (vegetable fry, East, 95)
- Egg Tomato Rice Bowl (rice, Pan-Indian, 95)
- Varan (dal, West, 95)

## South Indian preference user

### Before

- Akki Roti (paratha, South, 95)
- Andhra Podi Idli (idli, South, 95)
- Appam (appam, South, 95)
- Bread Upma (upma, South, 95)
- Cheese Dosa (dosa, South, 95)
- Cheese Uttapam (dosa, South, 95)

### After

- Akki Roti (paratha, South, 95)
- Chirer Pulao (poha, East, 70)
- Dhokla (snack, West, 70)
- Egg Toast (egg, Pan-Indian, 70)
- Moong Dal Chilla (chilla, North, 70)
- Andhra Podi Idli (idli, South, 95)

## Vegetarian user

### Before

- Aloo Jeera (potato sabzi, North, 88)
- Aloo Pitika (mash, Northeast, 88)
- Aloo Posto (potato sabzi, East, 88)
- Beans Poriyal (poriyal, South, 88)
- Beans Thoran (thoran, South, 88)
- Begun Bhaja (vegetable fry, East, 88)

### After

- Aloo Jeera (potato sabzi, North, 88)
- Aloo Pitika (mash, Northeast, 88)
- Beans Poriyal (poriyal, South, 88)
- Begun Bhaja (vegetable fry, East, 88)
- Paneer Fried Rice (rice, Pan-Indian, 88)
- Sol Kadhi (drink, Coastal, 88)

## Pantry user

### Before

- Coconut Rice (rice, South, 70)
- Egg Fried Rice (rice, Pan-Indian, 70)
- Paneer Fried Rice (rice, Pan-Indian, 70)
- Tomato Rice (rice, South, 70)
- Dalma (dal, East, 69)
- Tomato Pappu (pappu, South, 69)

### After

- Coconut Rice (rice, South, 70)
- Dalma (dal, East, 69)
- Tomato Pappu (pappu, South, 69)
- Egg Fried Rice (rice, Pan-Indian, 70)
- Paneer Fried Rice (rice, Pan-Indian, 70)
- Tomato Rice (rice, South, 70)

## Validation Notes

- Family spread improves because repeated families receive a soft penalty.
- Regional spread improves because repeated broad regions receive a soft penalty.
- Relevance is preserved because high-scoring duplicate-family dishes can still win when the score gap is significant.
- Pantry correctness logic is unchanged; pantry tests remain the guardrail for ingredient trust.
- Pantry validation caught and fixed one metadata issue: Chirer Pulao no longer treats peanut as a required/core ingredient.
