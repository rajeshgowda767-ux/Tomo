# Tomo Beta 4 RC1 Regression QA

Date: 2026-07-04  
Overall status: **PASS WITH CONCERNS**  
RC1 recommendation: **Ready for RC1 with the P2 items below tracked.**

## Test Environment

- Mobile app: `#mobile-v2`
- Viewports: 360x800, 390x844, 412x915, and 844x390 landscape
- Persistence: localStorage refresh and cross-screen restoration
- Validation: browser console, broken-image checks, `node --check`, `git diff --check`

## Section Results

| Section | Result | Evidence |
|---|---|---|
| Discover | PASS | Startup, three Today's Picks, meal/mood switching, refresh, save/unsave, Not For Me, Cook This, Dish Detail, and back navigation passed. Rainy breakfast remained breakfast-appropriate. |
| Kitchen | PASS | Pantry selection/deselection, search, dashboard recommendations, missing ingredients, Add All Needed Items, shared Shopping List handoff, and back navigation passed. |
| My Plan | PASS | Lazy planner load, generation, bundles, accept, modify mode, meal actions, reset, grocery generation, and Shopping List integration passed. |
| Shopping List | PASS | Manual/generated items, deduplicating merge, remove, purchased checkbox state, copy/share fallback, quantity-preserving rendering, and empty state passed. |
| Journal | PASS | Saved dishes, recently cooked, activity, populated and empty states, detail navigation, and persistence passed. |
| Dish Detail | PASS | Hero, ingredients, pantry status, Quick Guide, pairings, Save, Cook This, Add to Plan, missing-items action, and return navigation passed. |
| Performance | PASS WITH CONCERNS | No console errors, broken images, visible image flicker, duplicated UI, or degradation during prolonged navigation. Lazy images remained enabled. Precise heap-leak profiling was not available. |
| Responsive | PASS | No horizontal overflow or broken images at 360, 390, 412, or landscape. Bottom navigation stayed clear of content and viewport edges. |
| Persistence | PASS | Saved dishes, pantry, weekly plan, Journal activity, and Shopping List survived refresh. Temporary Cook selections correctly did not persist. |
| Validation | PASS | Changed JavaScript parses and whitespace validation passes. |

## Confirmed Bugs Fixed

### P1 - Missing Today's Picks dismissal

Today's Picks did not expose the required Not For Me action. Added a compact dismissal control to each visible card and retained the three-card layout.

### P1 - Dish Detail missing Cook This

Dish Detail exposed Save and Add to Plan but no Cook This action. Restored Cook This using the existing cooking flow.

### P1 - Missing ingredients handoff was unreliable

Add All Needed Items could produce no action when the preferred availability array was empty. Added a safe fallback to existing missing-required data; the action now adds items and opens the shared Shopping List.

### P1 - Shopping List completion control absent

Shopping items stored completion state but rendered no checkbox. Added an accessible purchased toggle using the existing shared list and persistence logic.

## Remaining Issues

### P2 - Pantry Recommended may fall back to Quick

With a small saved pantry, Today's Picks can show Quick in the second position when no qualifying pantry match is returned. This follows the current fallback behavior, but the product requirement should clarify whether the label must always remain Pantry Recommended.

### P2 - Native Share not fully automatable

The safe clipboard fallback passed. The operating-system share sheet itself requires manual device confirmation.

### P3 - Performance instrumentation gap

No leak symptoms appeared during extended navigation, but a precise retained-heap comparison was not available in this QA environment.

## Manual Follow-up

- Confirm the native Share sheet on one physical iOS or Android device.
- Confirm whether Quick is an accepted fallback for an unavailable Pantry Recommended card.
- Run one device-level memory trace during a 10-minute navigation session before public beta.

## Files Changed During QA Fixes

- `frontend/mobile/mobile-shell.js`
- `frontend/mobile/mobile-v2.css`
- `docs/audits/beta4-rc1-regression-qa.md`

No P0 blockers remain. No recommendation, planner, pantry-scoring, recipe-data, or analytics behavior was changed.
