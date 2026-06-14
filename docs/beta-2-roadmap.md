# Tomo Mobile Beta 2 Roadmap

Status: Planning only

Beta 2 should build on the preserved Mobile RC1/Beta 1 feedback checkpoint without changing the shipped RC1 product logic during setup.

## Focus Areas

### Quick Guide / How To Make It

- Add lightweight cooking guidance for dish detail.
- Keep it concise enough for users deciding what to cook.
- Avoid turning dish detail into a long recipe article.

### Analytics Events

- Define events for core actions:
  - Tomo Pick viewed
  - Mood selected
  - Recipe viewed
  - Cook This tapped
  - Save tapped
  - Pantry ingredient selected
  - Add Missing Items tapped
  - Shopping Cart copied/shared
  - Collection opened
- Keep event naming consistent before implementation.

### Correction Loop

- Support simple recommendation feedback.
- Capture signals such as skipped dishes, saved dishes, cooked dishes, and pantry abandonment.
- Use correction signals for future personalization without overcomplicating Beta 2.

### Database Expansion to 300-350 Dishes

- Expand recipe coverage carefully.
- Prioritize real dish diversity over variants that feel repetitive.
- Keep image quality and ingredient completeness in mind.

### Pantry Refinement for Multi-Ingredient Suggestions

- Improve recommendations when users select 3+ ingredients.
- Prevent suggestions from disappearing too aggressively.
- Preserve trust rules around major proteins and irrelevant matches.

### Regional Foundation

- Define region tags before adding region-heavy UI.
- Start with a simple data model that supports future regional browsing.
- Avoid overfitting the UI too early.

### Pairing Data Structure

- Add a structured way to represent pairings:
  - dish + side
  - dish + drink
  - dish + chutney/pickle
  - dish + rice/roti
- Use pairings later for recommendations, meal completion, and Quick Guide support.

## Not In This Setup Pass

- No Beta 2 feature implementation yet.
- No UI changes.
- No engine changes.
- No recipe data changes.
- No deployment changes beyond branch/checkpoint preparation.
