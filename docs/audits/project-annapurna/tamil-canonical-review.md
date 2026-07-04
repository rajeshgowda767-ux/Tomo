# Project Annapurna - Tamil Nadu Canonical Review

Date: 2026-07-02

Scope: review only for `Elumichai Sadam` and `Puliyodarai`. No recipe data, recipe titles, aliases, generated data, engines, scoring, ranking, pantry logic, analytics, UI, desktop, or collections were modified.

## Decision Summary

| Proposed Tamil dish | Existing canonical recipe | Final decision |
|---|---|---|
| Elumichai Sadam | Chitranna | ✅ ALIAS_OF_EXISTING |
| Puliyodarai | Puliyogare | ✅ ALIAS_OF_EXISTING |

Project Annapurna rule applied:

Same ingredients + same cooking method + same cultural identity = alias.

Separate recipes should be created only when the recipe has a distinct ingredient profile, seasoning paste/powder, preparation method, temple/home tradition, texture, or serving context that is materially represented in the data.

## 1. Elumichai Sadam vs Chitranna

Existing canonical recipe reviewed:

- Canonical Recipe: `Chitranna`
- Existing title: `Chitranna`
- English subtitle: `Lemon rice`
- Current aliases: `Lemon Rice`, `Elumichai Sadam`, `Nimmakaya Pulihora`
- Origin: `Karnataka`
- Popular across: `Karnataka`, `South India`

Current recipe profile:

- Ingredients: cooked rice, lemon, peanuts, mustard seeds, chana dal, turmeric, curry leaves, oil, salt.
- Quick Guide: temper mustard seeds, dal and peanuts; add curry leaves and turmeric; switch off heat; add cooked rice; squeeze lemon juice; adjust salt.

### Review Questions

1. Are the ingredients materially different?

No. A typical Tamil `Elumichai Sadam` uses the same core profile: cooked rice, lemon, mustard, dals, turmeric, curry leaves, oil and often peanuts.

2. Is the seasoning materially different?

No. The seasoning pattern is the same South Indian lemon rice tempering. There is no distinct Tamil-only seasoning shown in the current data.

3. Is the preparation different?

No. The method is the same: make a tempering, mix cooked rice, add lemon off heat or at the end.

4. Would a Tamil home cook consider this a distinct dish or simply the Tamil name?

For this exact recipe profile, a Tamil home cook would most likely recognize `Elumichai Sadam` as the Tamil name for the same lemon rice family, not a materially separate recipe.

5. Is there enough culinary difference to justify a separate recipe?

No. Not with the current recipe data. A separate Tamil recipe would need a deliberately different house style, temple style, festival context, or specific Tamil preparation details. Those are not present here.

### Final Decision

✅ ALIAS_OF_EXISTING

Canonical Recipe:

- `Chitranna`

Aliases:

- `Lemon Rice`
- `Elumichai Sadam`
- `Nimmakaya Pulihora`

Reason:

The current `Chitranna` recipe and a standard Tamil `Elumichai Sadam` share the same ingredient profile, seasoning base, preparation method, and broad South Indian cultural identity. Creating a separate recipe would duplicate the same dish under another regional language name.

Do not create a separate `Elumichai Sadam` recipe for Beta 3.

## 2. Puliyodarai vs Puliyogare

Existing canonical recipe reviewed:

- Canonical Recipe: `Puliyogare`
- Existing title: `Puliyogare`
- English/common title: `Tamarind Rice`
- Current aliases in the Karnataka framework: `Tamarind Rice`, `Puliyodarai`, `Pulihora`
- Origin in framework: `Karnataka`
- Popular across: Karnataka, Tamil Nadu, Andhra Pradesh, Telangana

Current recipe profile:

- Ingredients: cooked rice, tamarind paste, peanuts, mustard seeds, sesame oil, puliyogare powder, curry leaves, salt.
- Quick Guide: temper mustard and curry leaves; add peanuts; stir in tamarind paste and puliyogare powder; cook until paste thickens; mix with rice.

### Review Questions

1. Are the ingredients materially different?

No, not in the current data. Tamil `Puliyodarai` and Karnataka `Puliyogare` share the same broad tamarind rice base: cooked rice, tamarind, sesame oil, mustard, curry leaves, peanuts and a spiced tamarind paste/powder.

2. Is the seasoning materially different?

Not as currently represented. A specific Tamil temple-style `Puliyodarai` may use a distinct roasted spice powder, sesame, methi, chana dal/urad dal, dried chillies, and a longer-cooked pulikachal paste. But the current existing recipe does not encode a separate temple-style profile; it uses a general South Indian tamarind rice pattern.

3. Is the preparation different?

No, not in the current data. The method is the same broad tamarind rice method: prepare/cook tamarind-spice paste, temper, and mix with rice.

4. Would a Tamil home cook consider this a distinct dish or simply the Tamil name?

For the current broad recipe, many Tamil home cooks would recognize `Puliyodarai` as the Tamil name within the same tamarind rice family. A Tamil temple-style puliyodarai could be considered distinct, but only if the recipe is authored with that specific identity.

5. Is there enough culinary difference to justify a separate recipe?

No, not with the current recipe data. There is enough cultural potential for a future separate `Temple Puliyodarai` or `Kovil Puliyodarai`, but not enough in this current generic tamarind rice profile.

### Final Decision

✅ ALIAS_OF_EXISTING

Canonical Recipe:

- `Puliyogare`

Aliases:

- `Tamarind Rice`
- `Puliyodarai`
- `Pulihora`

Reason:

The current `Puliyogare` recipe is a broad South Indian tamarind rice recipe. `Puliyodarai` should remain a search/display alias unless Tomo adds a specifically Tamil temple-style puliyodarai recipe with a distinct pulikachal/spice-powder method.

Do not create a separate `Puliyodarai` recipe for Beta 3.

## Future Separate Recipe Criteria

Only consider separate recipes later if the proposed Tamil version is intentionally authored with material differences:

### Possible Future Elumichai Sadam Variant

Separate only if it includes a clearly Tamil home/temple/lunch-box context that differs from `Chitranna`, such as a specific no-peanut version, cashew/festival version, or another locally reviewed method. Otherwise keep it as an alias.

### Possible Future Tamil Temple Puliyodarai Variant

Separate only if it is explicitly:

- `Temple Puliyodarai` or `Kovil Puliyodarai`
- Uses a distinct roasted spice powder / pulikachal method
- Includes sesame oil, tamarind reduction, dals, dried chillies, curry leaves, peanuts or sesame as appropriate
- Has a longer resting/absorption step
- Has `foodHeritage` and `regionalNotes` describing Tamil temple/prasadam context

## Beta 3 Action

Do not add:

- `Elumichai Sadam`
- `Puliyodarai`

Keep as aliases:

- `Elumichai Sadam` under `Chitranna`
- `Puliyodarai` under `Puliyogare`

Recommended follow-up:

- Update `docs/audits/project-annapurna/tamil-nadu-audit.md` before implementation so these two are removed from the safe-new-recipes list and treated as aliases instead.

