# Tomo Balance Sprint 2 Addition Report

Scope: recipe/data additions only. No UI, recommendation scoring, or pantry logic changes were made.

## Dish Count

- Before Sprint 2: 247 dishes
- After Sprint 2: 263 dishes
- Net new dishes: 16

## Dishes Added

1. Thepla
2. Moong Dal Chilla
3. Puttu Kadala
4. Chirer Pulao
5. Luchi Aloor Dom
6. Eromba
7. Corn Sundal
8. Masala Corn
9. Nippattu
10. Kodubale
11. Kuzhi Paniyaram
12. Sattu Drink
13. Neer Mor
14. Buttermilk
15. Kokum Sharbat
16. Jal Jeera

## Requested Dishes Already Present

These were requested but already existed, so no duplicate was created:

- Sabudana Khichdi
- Besan Chilla
- Aloo Pitika
- Masor Tenga

## Before / After Meal Impact

| Meal | Before Sprint 2 | After Sprint 2 | Delta | Main Improvements |
| --- | ---: | ---: | ---: | --- |
| Breakfast | 64 | 71 | +7 | Added chilla, Kerala breakfast, Bengali breakfast, West Indian flatbread, drink support. |
| Lunch | 101 | 103 | +2 | Added East/Northeast lunch presence through Luchi Aloor Dom and Eromba. |
| Dinner | 97 | 98 | +1 | Added Northeast dinner representation through Eromba. |
| Snacks | 51 | 64 | +13 | Added healthy snacks, crisp regional snacks, sundal, corn snacks, steamed snacks, and drinks. |

## Regional Distribution Impact

### Breakfast

- South: 35
- North: 13
- West: 8
- Mixed / Pan-Indian: 11
- East: 2
- Northeast: 2

### Lunch

- South: 39
- North: 19
- Northeast: 12
- East: 12
- Mixed / Pan-Indian: 13
- West: 10

### Dinner

- Mixed / Pan-Indian: 30
- South: 21
- North: 15
- Northeast: 12
- West: 12
- East: 10

### Snacks

- Mixed / Pan-Indian: 18
- South: 18
- North: 14
- West: 11
- East: 4
- Northeast: 1

## Family Distribution Impact

### Breakfast Focus Families

- Chilla: 1
- Steamed breakfast: 1
- Poha: 5
- Fried bread curry: 1
- Steamed snack: 2
- Drink side: 2
- Flatbread: 1

### Snack Focus Families

- Drink side: 7
- Steamed snack: 3
- Crisp snack: 2
- Poha: 2
- Sundal: 1
- Corn snack: 1
- Chilla: 1
- Flatbread: 1

## Coverage Checks

- Pairings: 263 / 263, 100%
- Quick Guides: 263 / 263, 100%
- Duplicate titles: 0

## Validation

Passed:

- JSON parse: database/generated/recipes.json
- node --check local-recipes.js
- node --check frontend/local-recipes.js

## Updated Audit

The full updated balance audit is available at:

- docs/tomo-food-balance-audit.md
