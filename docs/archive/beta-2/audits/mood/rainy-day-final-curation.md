# Rainy Day Final Curation

Status: Mood Engine RC1 freeze candidate
Scope: Mobile V2 Rainy Day meal curation only. No UI, pantry engine, desktop, database, or other mood changes.

## Final Mapping

### Breakfast - warm start
- Pongal
- Upma
- Masala Dosa
- Ragi Porridge

### Lunch - comfort meal
- Khichdi
- Rasam Rice
- Sambar Rice
- Bisibelebath
- Pepper Rasam (lower-ranked alternate)

### Dinner - cozy craving
- Masala Dosa
- Onion Uttapam
- Aloo Paratha
- Methi Paratha
- Thukpa

Dinner support alternates:
- Vegetable Soup
- Mushroom Soup

### Snacks - rainy indulgence
- Pakora
- Bread Pakora
- Mirchi Bajji
- Masala Chai

## Validation

- PASS All requested dishes exist in the active local recipe data.
- PASS Breakfast is warm/light start: Pongal, Upma, Masala Dosa, Ragi Porridge.
- PASS Lunch primary list is rice/comfort-meal focused: Khichdi, Rasam Rice, Sambar Rice, Bisibelebath.
- PASS Lunch and dinner no longer share primary dishes.
- PASS Pepper Rasam is not adjacent to Rasam Rice. Lunch order: Khichdi -> Rasam Rice -> Sambar Rice -> Bisibelebath -> Pepper Rasam.
- PASS Soups are not primary dinner recommendations. Primary dinner: Masala Dosa, Onion Uttapam, Aloo Paratha, Methi Paratha, Thukpa.
- PASS Vegetable Soup and Mushroom Soup remain Rainy Day support alternates.
- PASS Snacks match rainy indulgence list: Pakora, Bread Pakora, Mirchi Bajji, Masala Chai.

## Cohesion Notes

- Morning starts soft and warm with Pongal, Upma, dosa, and porridge.
- Lunch anchors around rice bowls and comforting one-pot meals.
- Dinner shifts away from lunch repeats into dosa, uttapam, paratha, and Thukpa cravings.
- Snacks stay indulgent and monsoon-coded without affecting primary meals.
- Pepper Rasam is retained only after the lunch primary set, so it cannot sit beside Rasam Rice in the main lunch pair.
- Soup dishes remain eligible as support alternates, not as the first dinner recommendations.
