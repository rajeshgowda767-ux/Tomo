# Warm Bowls Rendering Fix Report

Scope: Mobile UI only.

Desktop UI, desktop routes, desktop styling, recipe data, recommendation logic, pantry logic, and hero logic were not modified.

## Fix Applied

Added Warm Bowls / `soups` to the mobile curated-full collection bypass.

This prevents `browseDiverseRecipes()` from applying dish-family diversity filtering inside Warm Bowls.

## Final Mobile Render Counts

| Subcategory | Rendered Count |
|---|---:|
| Comfort Soups | 19 |
| Regional Soups | 4 |
| Rainy Day Soups | 3 |
| Protein Soups | 4 |

## Rendered Dishes

### Comfort Soups

- Manchow Soup
- Beetroot Soup
- Noodle Soup
- Oats Soup
- Hot and Sour Soup
- Pumpkin Soup
- Lemon Coriander Soup
- Drumstick Soup
- Bottle Gourd Soup
- Vegetable Soup
- Carrot Soup
- Mixed Veg Soup
- Millet Soup
- Spinach Soup
- Mushroom Soup
- Peas Soup
- Broccoli Soup
- Cabbage Soup
- Garlic Soup

### Regional Soups

- Tomato Rasam
- Kollu Rasam
- Pepper Rasam
- Mysore Rasam

### Rainy Day Soups

- Corn Soup
- Sweet Corn Soup
- Tomato Soup

### Protein Soups

- Chicken Soup
- Lentil Soup
- Paneer Soup
- Moong Dal Soup

## Validation

- Warm Bowls opens in mobile Collections.
- Comfort Soups renders 19.
- Regional Soups renders 4.
- Rainy Day Soups renders 3.
- Protein Soups renders 4.
- Dish Detail opens from Warm Bowls; verified Tomato Rasam.
- Syntax checks passed for both mobile shell files.

## Files Updated

- `frontend/mobile/mobile-shell.js`
- `index.html`
- `frontend/index.html`
