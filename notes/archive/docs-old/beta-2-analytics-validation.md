# Beta 2 Analytics Event Tracking Validation

Status: Local-first analytics foundation implemented for Mobile V2.

## Storage

- Local storage key: `tomo_mobile_v2_analytics_events`
- Event shape:

```json
{
  "eventName": "dish_viewed",
  "timestamp": "2026-06-14T00:00:00.000Z",
  "source": "discover",
  "metadata": {}
}
```

## Events

- `tomo_pick_viewed`
- `mood_selected`
- `dish_viewed`
- `cook_this_clicked`
- `save_clicked`
- `dish_dismissed`
- `pantry_ingredient_selected`
- `add_missing_items_clicked`
- `shopping_list_copied`
- `shopping_list_shared`
- `collection_opened`

## Helper API

Available in the browser console after Mobile V2 loads:

```js
window.TomoMobileAnalytics.events()
window.TomoMobileAnalytics.report()
window.TomoMobileAnalytics.export()
window.TomoMobileAnalytics.track(eventName, source, metadata)
```

## Smoke-Test Checklist

- Open Mobile V2 and confirm `tomo_pick_viewed` is stored once per shown Tomo Pick during the session.
- Select a mood and confirm `mood_selected` includes the mood key and label.
- Open a dish from Discover, Pantry, Journal, Collections, or Shopping Cart and confirm `dish_viewed` includes source and dish metadata.
- Tap Cook This and confirm `cook_this_clicked` is stored without changing the existing cooking memory behavior.
- Tap Save and tap Saved again; confirm `save_clicked` records `save` and `unsave` actions without duplicate preference inflation.
- Dismiss a Today's Picks dish and confirm `dish_dismissed` is stored while the dish rotates normally.
- Select pantry ingredients and confirm `pantry_ingredient_selected` records newly selected ingredients.
- Tap Add Missing Items and confirm `add_missing_items_clicked` includes the dish and added count.
- Copy and share the Shopping Cart and confirm `shopping_list_copied` / `shopping_list_shared` record success and item count.
- Open a collection and confirm `collection_opened` stores the collection key.
- Clear localStorage and reload; confirm the app rebuilds with an empty analytics event array and no console errors.

## Notes

- No external analytics provider is used.
- No UI changes were added.
- No recommendation, pantry, collection, journal, recipe, deployment, or desktop behavior was intentionally changed by this pass.
- Events are capped at the most recent 1000 records to keep local storage lightweight.
