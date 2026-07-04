# Tomo Beta 4 Meal Planner Audit

Date: 2026-07-04

Status: PASS WITH CONCERNS

## Scope

Audited the mobile My Plan planner after the centralized recommendation policy work. This audit focused on weekly plan generation, meal-role correctness, Indian meal balance, bundles, controls, persistence, grocery integration, performance, and responsive behavior.

## Fix Applied

One P1 planner eligibility issue was fixed.

- Root cause: `mealRole` was trusted before support-food exclusions in `frontend/mobile/plan-engine.js`.
- Risk: a recipe with broad or incorrect `mealRole`, such as a raita/support dish, could be treated as a lunch/dinner primary or bundle secondary.
- Fix: support/condiment/drink/snack exclusions now run before `mealRole` shortcuts for primary meals and bundle secondaries.

No recipe data, UI redesign, planner scoring, recommendation engine, pantry engine, or grocery logic was changed.

## Planner Startup

PASS

- My Plan opens correctly in browser QA.
- Planner script is loaded by the mobile app and used only for My Plan / Add to Plan flows.
- VM audit confirmed planner generation is explicit and does not run during app startup.

## 20 Generated Plan Summary

Generated 20 weekly plans with a persistent rotation key and reset between runs.

| Metric | Result |
|---|---:|
| Plans generated | 20 |
| Slots per plan | 28 / 28 |
| Duplicate primary meals within a week | 0 |
| Double rice-heavy days | 0 |
| Average generation time | ~266 ms |
| Typical diet mix | 20-22 veg, 3-4 egg, 3-5 non-veg |
| Regional/cuisine diversity | 22-26 distinct origins/cuisines per week |

Representative first-day outputs:

- Run 1: Ragi Dosa, Gujarati Dal + Ghee Rice, Garlic Chicken + Plain Chapati, Shankarpali
- Run 5: Appam Stew, Mushroom Xacuti, Keema Fry, Falafel Bites
- Run 10: Ven Pongal, Aloo Potol Posto, Garlic Chicken, Mirchi Bajji
- Run 20: Avalakki, Chole Chawal, Kori Rotti, Pitha

## Meal Correctness

PASS

- Breakfast slots used breakfast-tagged dishes.
- Lunch/dinner slots used complete meals or main/base bundle candidates.
- No soups, chutneys, raitas, drinks, mashes, purees, or support dishes appeared as standalone meals after the fix.
- Quick Bites did not appear in weekly plan generation.
- No breakfast-only dish appeared in lunch/dinner in the corrected audit.

## Indian Meal Logic

PASS WITH P2 CONCERNS

- Lunches were complete and not snack-like.
- Dinners generally felt like complete Indian home meals or curry/base bundles.
- Rice-heavy meals were not repeated twice in the same day.
- Veg/egg/non-veg balance was reasonable.

P2 concerns:

- Some global/street-food records can still appear, such as Thai Peanut Noodle Bowl, Korean Street Toast, Tacos, Hot Dog, or Falafel Bites.
- Some recurring complete meals appear across many generated weeks because the rotation is deterministic and certain records are strong fits.
- Sweet snacks such as Shankarpali can appear in snack slots. This is not a blocker, but V2 could prefer savory/light snacks more often.

## Meal Bundles

PASS

Observed valid bundle examples:

- Gujarati Dal + Ghee Rice
- Garlic Chicken + Plain Chapati
- Avarekalu Saaru + Ghee Rice
- Gongura Pappu + Ghee Rice

No invalid drink bundle, chutney-as-main, raita-as-main, or duplicate primary/secondary bundle was found after the eligibility fix.

## Modify Meal Flow

PASS WITH KNOWN LIMITATION

Browser QA confirmed:

- Modify Plan shows guidance.
- Planned meal cards expose the three-dot menu.
- Menu shows Replace and Remove.
- Remove clears the slot.

Known limitation:

- Replace is still a placeholder flow and shows "Meal replacement coming soon." Because no replacement is inserted yet, meal-type validation for replacement could not be fully tested.

## Accept / Reset / Persistence

PASS

Browser QA confirmed:

- Accept Plan works and shows accepted state.
- Generate Grocery List appears after acceptance.
- Reset Week clears the plan.
- Plan data persists in `tomo_mobile_v1_plan`.
- Accepted-week state is stored separately in `tomo_mobile_v1_plan_accepted_week`.

## Grocery Integration

PASS

Browser QA confirmed:

- Generate Grocery List runs from an accepted plan.
- Toast: "Grocery list created."
- Shopping List entry remains shared with existing app state.
- Bundle secondary recipes are included by the generation path.

## Pantry Influence

PASS

The planner still uses existing recipe metadata and generation rules. The audit did not find pantry influence overriding meal correctness or forcing support dishes into full-meal slots.

## Performance

PASS

- VM plan generation averaged ~266 ms for a full 28-slot week.
- Browser QA showed no console errors during My Plan open, generation, accept, grocery generation, modify menu, or reset.
- No long freeze was observed in headless QA.

## Responsive QA

PASS

Tested at:

- 360 px
- 390 px
- 412 px

Results:

- My Plan reached successfully.
- No horizontal overflow detected.
- Plan buttons stayed within the viewport.
- Generated slots rendered with wrapped dish names and bundle rows.
- No console errors detected.

## Bugs Found

### P1 Fixed

- Support dishes could bypass exclusions when `mealRole` was present.
- Fixed in `frontend/mobile/plan-engine.js`.

### P2 Remaining

- Planner is still somewhat global-food friendly for a feature intended to feel Indian-first.
- Deterministic rotation can repeat strong candidates across generated weeks.
- Some snack slots include sweet/festival snacks; acceptable for V1, but V2 should improve savory/light snack preference.
- Replace flow is not implemented beyond the placeholder menu action.

## Final RC1 Planner Readiness

PASS WITH CONCERNS

The planner is stable for RC1 after the P1 eligibility fix. It generates complete weekly plans, avoids duplicates within a week, avoids support dishes as standalone meals, supports accepted-plan grocery generation, and passes responsive smoke QA. Remaining issues are balance and taste-quality refinements appropriate for Beta 4 follow-up or Planner V2.
