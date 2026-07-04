# Shopping Cart Page Validation

Date: 2026-06-12

Result: PASS

Scope: Mobile V2 Shopping Cart only.

## Files Changed

- `frontend/mobile/mobile-shell.js`
- `frontend/mobile/mobile-v2.css`
- `frontend/index.html`
- `frontend/app-entry.js`

`frontend/index.html` and `frontend/app-entry.js` were updated only to bump Mobile V2 cache keys so the cart page changes load correctly.

## What Changed

- Replaced the old vertical Tomo suggestion list on Shopping Cart with `Unlock More Dishes`.
- Unlocks render in a 2-column grid with a maximum of 4 visible cards by default.
- Added `View More →` support when more than 4 unlock cards exist.
- Unlock cards show dish image, dish name, and `Unlock by adding:` ingredient.
- Unlock cards open Dish Detail without adding ingredients or modifying the cart.
- Added `Items To Buy` label above cart item cards.
- Preserved Shopping Cart naming, Ready To Shop, Copy Shopping List, Share List, multi-dish attribution, empty state, and cart item management.
- Empty cart no longer shows unlock suggestions.

## Browser Validation

Validated locally at:

- `390x844`
- `375x812`

Test flow:

1. Opened Mobile V2.
2. Went to Kitchen.
3. Selected Pantry ingredients: `Rice`, `Egg`.
4. Tapped `Add Missing Items`.
5. Confirmed Shopping Cart received:
   - `Onion`
   - `Garlic`
   - Attribution: `For: Egg Fried Rice`
6. Confirmed Shopping Cart hierarchy:
   - Shopping Cart
   - Items To Buy
   - Ready To Shop
   - Copy / Share
   - Unlock More Dishes
7. Confirmed unlock card rendered:
   - `Chicken Fried Rice`
   - `Unlock by adding: Chicken`
8. Tapped unlock card.
9. Confirmed Dish Detail opened with `Back to Shopping Cart`.
10. Confirmed cart items were unchanged after opening detail.
11. Confirmed back navigation returned to Shopping Cart.
12. Confirmed `Copy Shopping List` copied:
    ```text
    Onion
    Garlic
    ```
13. Confirmed `Share List` fallback also preserved the same list.
14. Cleared cart and confirmed empty state:
    - `No items yet.`
    - `Add missing ingredients from Pantry to build your shopping list.`
    - No Ready To Shop section
    - No Copy button
    - No Share button
    - No visible unlock grid

## Layout Checks

At `390x844`:

- Unlock grid columns: `174.5px 174.5px`
- Visible unlock cards: `1`
- Horizontal overflow: no

At `375x812`:

- Unlock grid columns: `167px 167px`
- Visible unlock cards: `1`
- Horizontal overflow: no

The active cart data produced 1 relevant unlock. Source behavior was verified to cap default visible unlocks with `unlocks.slice(0, 4)` and show `View More →` only when more than 4 unlocks exist.

## Desktop Isolation

Desktop width check:

- Mobile V2 shell: not rendered
- Desktop shell: rendered
- Horizontal overflow: no

## Console

Browser console errors: none.

Final status: SHOPPING CART PAGE PASS
