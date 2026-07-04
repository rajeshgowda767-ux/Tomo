# Tomo Regional Authenticity Project

Date: 2026-07-02  
Scope: Beta 3 audit/planning only  
Status: naming framework proposal; no recipe/data changes

## 1. Naming Standard v1

Tomo should use the most authentic and culturally recognized local dish name as the primary title when the recipe clearly matches that dish. English/common names should remain available as aliases for search, onboarding, and dish detail comprehension.

Naming hierarchy:

1. Use the local canonical name when the recipe is authentic enough and the name is widely recognized in that cuisine.
2. Use a bilingual title only when clarity matters for Beta users, for example `Chitranna (Lemon Rice)`.
3. Keep the English/common title when the recipe is generic, pan-Indian, simplified, or not culturally specific enough.
4. Add aliases rather than duplicate recipes when regional names refer to the same dish pattern.
5. Create a separate recipe only when the technique, spice base, texture, method, or cultural identity is materially different.
6. Mark uncertain names as `NEEDS_LOCAL_REVIEW`.

Recommended title fields:

- `canonicalTitle`: primary title shown in the app.
- `englishTitle`: plain English/common title.
- `aliases`: searchable alternate names.
- `originState`: primary state or local origin where appropriate.
- `popularAcross`: broader regions where the dish is commonly known.
- `regionalNote`: short editorial caveat where needed.
- `authenticityConfidence`: `HIGH`, `MEDIUM`, `LOW`, or `NEEDS_LOCAL_REVIEW`.
- `variantOf`: optional pointer to a broader dish family.

## 2. Duplicate vs Alias Rules

Core rule:

Same dish + same method + same ingredient profile = one recipe with aliases.

Separate recipe rule:

Distinct spice base, method, technique, texture, ritual/cultural identity, or regional serving context = separate recipe.

Alias examples:

| Canonical | English/common | Aliases | Decision |
|---|---|---|---|
| Chitranna | Lemon Rice | Lemon Rice, Elumichai Sadam, Nimmakaya Pulihora | One recipe with aliases if method is generic South Indian lemon rice. |
| Puliyogare | Tamarind Rice | Tamarind Rice, Puliyodarai, Pulihora | One base recipe unless the paste/temple style is specific. |
| Mosaranna | Curd Rice | Curd Rice, Thayir Sadam, Perugu Annam | Alias only if recipe matches Karnataka style; otherwise keep Curd Rice. |

Separate recipe examples:

| Recipe | Why separate |
|---|---|
| Bassaru | Uses cooked dal/horse gram stock and greens logic; not just generic rasam. |
| Mangalore Buns | Banana-based sweet fried bread; not alias of poori. |
| Kori Gassi | Coastal Karnataka/Mangalorean chicken curry with distinct coconut spice base. |
| Melukote Puliyogare | Famous temple-style variant; should be separate only with specific recipe profile. |

Do not duplicate:

- `Chitranna`, `Lemon Rice`, and generic South Indian lemon rice if the same quick guide is used.
- `Puliyogare`, `Puliyodarai`, and `Pulihora` if the same tamarind rice base is used.
- `Mosaranna`, `Curd Rice`, `Thayir Sadam`, and `Perugu Annam` if the recipe is intentionally broad and not state-specific.

## 3. Recipe Metadata Proposal

Proposed metadata additions for future implementation. Do not add in this planning pass.

```json
{
  "canonicalTitle": "Chitranna",
  "englishTitle": "Lemon Rice",
  "aliases": ["Lemon Rice", "Elumichai Sadam", "Nimmakaya Pulihora"],
  "originState": "Karnataka",
  "popularAcross": ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana"],
  "regionalNote": "A South Indian lemon rice family; this recipe follows a Karnataka-style chitranna profile.",
  "authenticityConfidence": "HIGH",
  "localReviewStatus": "APPROVED",
  "variantOf": "lemon-rice"
}
```

Metadata guidelines:

- `canonicalTitle` should never be more specific than the recipe.
- `aliases` should improve search without implying false authenticity.
- `originState` should be used only when there is strong cultural/recipe evidence.
- `popularAcross` can include states where a dish family is common.
- `regionalNote` should explain important caveats, especially shared South Indian dishes.
- `localReviewStatus` should be `NEEDS_LOCAL_REVIEW` when unsure.

## 4. Karnataka Gold Standard

Karnataka is the gold standard because the app already has strong coverage across breakfast, rice dishes, saaru/rasam, snacks, coastal dishes, and Kodagu identity.

### Chitranna

- English: Lemon Rice
- Aliases: Lemon Rice, Elumichai Sadam, Nimmakaya Pulihora
- Origin: Karnataka
- Popular across: South India
- Decision: canonical title + aliases
- Confidence: `HIGH` if recipe includes cooked rice, lemon, turmeric, mustard, curry leaves, peanuts or dal tempering.
- Caution: do not rename Lemon Rice to Chitranna unless the recipe matches the Karnataka-style tempering profile.

### Puliyogare

- English: Tamarind Rice
- Aliases: Tamarind Rice, Puliyodarai, Pulihora
- Origin: Karnataka
- Popular across: Karnataka, Tamil Nadu, Andhra Pradesh, Telangana
- Regional note: Melukote Puliyogare is a famous temple-style variant, but should only be separate if the recipe is specific.
- Decision: canonical title + aliases
- Confidence: `HIGH` for a general Karnataka-style tamarind rice with tamarind paste, peanuts, sesame oil, curry leaves, and puliyogare powder.
- Caution: do not rename generic Puliyogare to Melukote Puliyogare unless the spice paste, sweetness, oil, and temple-style method are specifically represented.

### Mosaranna

- English: Curd Rice
- Aliases: Curd Rice, Thayir Sadam, Perugu Annam
- Origin: Karnataka / South India usage needs review
- Decision: canonical title only if recipe matches Karnataka style; otherwise keep generic Curd Rice with aliases.
- Confidence: `MEDIUM`
- Caution: do not blindly use Bagalabath for Curd Rice. Mosaranna is the safer Kannada/Karnataka reference.

### Bassaru

- English: Horse Gram Rasam
- Aliases: Huruli Bassaru
- Origin: Karnataka
- Decision: separate recipe, not alias of generic rasam.
- Confidence: `HIGH`
- Reason: Bassaru is tied to the stock from cooked dal/horse gram/greens and has a different cultural identity from a generic rasam.

### Mangalore Buns

- English: Sweet Banana Poori
- Aliases: Banana Buns, Mangaluru Buns
- Origin: Coastal Karnataka
- Decision: separate recipe.
- Confidence: `HIGH`
- Reason: The banana-sweetened fermented dough and fried bread identity is distinct from poori.

### Kori Gassi

- English: Mangalorean Chicken Curry
- Aliases: Kori Gassi, Kori Gassi Curry, Mangalorean Chicken Curry
- Origin: Coastal Karnataka
- Decision: separate recipe.
- Confidence: `HIGH` only when the recipe includes a coastal coconut-spice base.
- Caution: do not rename a generic chicken curry to Kori Gassi without the proper coconut, roasted spice, and coastal method profile.

### Additional Karnataka Cautions

- Do not add questionable dishes like Halasina Biryani as Karnataka iconic dishes without verification.
- Do not overuse Karnataka labels for dishes that are broadly South Indian unless the quick guide supports Karnataka style.
- Do not turn every rice dish into a named regional dish; keep utility recipes where they help Cook recommendations.

Karnataka examples count: **6 core examples + 3 caution examples**.

## 5. South India Next States

These sections are placeholders for follow-up state-level audits. Only high-confidence examples are listed here; uncertain items are marked `NEEDS_LOCAL_REVIEW`.

### Kerala

High-confidence candidates:

- Appam
- Puttu Kadala
- Kerala Fish Curry
- Meen Moilee
- Avial
- Thoran
- Olan
- Erissery
- Parippu Curry
- Kerala Egg Roast
- Nadan Kozhi Curry
- Malabar Chicken Curry

Needs local review:

- Whether generic `Chicken Stew` should become `Kerala Chicken Stew` depends on coconut milk, pepper, potato/carrot, and appam pairing. Current direction appears safe but still benefits from review.
- Beef and pork dishes should not be renamed unless already clearly Kerala and authentic.

### Tamil Nadu

High-confidence candidates:

- Ven Pongal
- Sakkarai Pongal
- Thayir Sadam
- Kanchipuram Idli
- Adai
- Mor Kuzhambu
- Vatha Kuzhambu
- Puli Kuzhambu
- Poriyal
- Kootu
- Chettinad Chicken
- Chettinad Pepper Chicken
- Meen Kuzhambu

Needs local review:

- `Coconut Rice` as `Thengai Sadam` if the recipe profile matches Tamil-style tempering.
- `Lemon Rice` as `Elumichai Sadam` only if not already canonicalized as Karnataka Chitranna.
- Whether Kongu/Chettinad naming is appropriate for specific chicken and kuzhambu recipes.

### Andhra Pradesh

High-confidence candidates:

- Pesarattu
- Kaaram Dosa
- Gongura Pappu
- Mamidikaya Pappu
- Dosakaya Pappu
- Chepala Pulusu
- Andhra Kodi Vepudu
- Guntur Chicken Fry
- Ulavacharu
- Punugulu
- Dibba Rotti

Needs local review:

- `Nimmakaya Pulihora` as an alias for lemon rice, not necessarily canonical.
- `Mamidikaya Pulihora` versus `Mango Rice`; needs region-specific recipe decision.
- `Andhra Fish Fry` spice profile should be checked before stronger regional claims.

### Telangana

High-confidence candidates:

- Hyderabadi Chicken Biryani
- Haleem
- Bagara Baingan if added later
- Sarva Pindi
- Sakinalu
- Pootharekulu
- Pachi Pulusu if added later

Needs local review:

- Shared Andhra/Telangana dishes should not be forced into one state if the app recipe is not state-specific.
- Hyderabadi biryani can be canonical only when the recipe includes basmati, curd marinade, fried onions, mint/coriander, saffron, and dum/layering method.

Next-state placeholder sections count: **4**.

## 6. State-by-State Audit Template

Use this template for every state before renaming.

### State

- State:
- Regional cuisines/subregions:
- Current recipe count:
- Current high-confidence dishes:
- Current generic dishes with possible regional identity:
- Current sensitive recipes:
- Missing high-value dishes:
- Search aliases needed:
- Local reviewer needed: yes/no

### Recipe Decision Table

| Current title | Proposed canonical title | English title | Aliases | Decision | Confidence | Required recipe fix | Notes |
|---|---|---|---|---|---|---|---|
|  |  |  |  | `KEEP_GENERIC` / `RENAME_SAFE` / `RENAME_NEEDS_RECIPE_FIX` / `ADD_AS_NEW_REGIONAL_VARIANT` / `DO_NOT_TOUCH_SENSITIVE` |  |  |  |

### Authenticity Checklist

- Ingredients match local dish.
- Seasoning/spice profile matches local dish.
- Quick guide method matches local technique.
- Pairings are regionally plausible.
- Image does not contradict the dish.
- Name is commonly recognized by people from that region.
- No sensitive or contested identity issue.

## 7. Confidence Levels

### HIGH

Use when the recipe name, ingredients, seasoning, quick guide, pairings, and regional tags all align.

Action:

- Safe for Beta 3 rename planning.
- Keep English/common names as aliases.

### MEDIUM

Use when the dish direction is likely correct but one or two details need review, such as pairings, image, or missing seasoning.

Action:

- Do not rename automatically.
- Add to local review list or fix recipe first.

### LOW

Use when the regional identity is mostly inferred from broad cuisine tags or generic ingredients.

Action:

- Keep generic.
- Consider adding a new regional variant later.

### NEEDS_LOCAL_REVIEW

Use when the name, dish identity, origin, or method may be contested or locally nuanced.

Action:

- Do not rename in Beta 3.
- Request review from someone familiar with that cuisine/state.

## 8. Beta 3 Safe Implementation Plan

This is a planning outline only; do not implement during this task.

Phase 1: Lock naming standard

- Approve Naming Standard v1.
- Approve duplicate vs alias rules.
- Approve metadata proposal shape.

Phase 2: Karnataka pilot

- Review the Karnataka gold standard list.
- Apply only `HIGH` confidence canonical titles.
- Preserve English/common names as aliases.
- Avoid creating new duplicate recipes unless variant rules require it.

Phase 3: South India review

- Run Kerala, Tamil Nadu, Andhra Pradesh, and Telangana through the same template.
- Mark uncertain dishes `NEEDS_LOCAL_REVIEW`.
- Avoid renaming shared dishes into overly specific state names.

Phase 4: Beta 3 safe changes

- Only rename `HIGH` confidence candidates.
- Add aliases for search and dish detail.
- Do not alter recommendation/ranking/scoring behavior.
- Do not modify engines.
- Do not regionalize pork/beef unless already clearly authentic.

Phase 5: Beta 4 expansion

- Add distinct regional variants where the current generic recipe should remain.
- Add local review notes and richer state metadata.
- Consider regional landing pages only after data quality is stable.

## 9. Risks / Do Not Touch Notes

Primary risks:

- Over-regionalizing generic utility recipes.
- Creating duplicate recipes where aliases would be better.
- Using a famous regional title without matching the recipe method.
- Collapsing distinct state dishes into one broad South Indian label.
- Incorrectly assigning origin for dishes popular across multiple states.
- Renaming sensitive pork/beef dishes without strong authenticity evidence.

Do not touch in Beta 3 without review:

- Generic pork curry.
- Generic beef dishes unless already Kerala/Kodagu/Northeast specific.
- Melukote Puliyogare unless the recipe is explicitly Melukote style.
- Bagalabath as a default replacement for Curd Rice.
- Halasina Biryani or other questionable “iconic” claims without verification.
- Any dish where the quick guide says a generic method like “as the style needs.”

Recommended rule for Tomo tone:

Regional identity should feel like recognition, not decoration. If the dish would make someone from that region say “yes, that is what we call it at home,” use the local name. If not, keep the common name and add regional variants later.

## Terminal Summary

- Report path: `docs/audits/tomo-regional-authenticity-project.md`
- Naming standard created: yes
- Karnataka examples count: 6 core examples + 3 caution examples
- Alias rule documented: yes
- Next-state placeholder sections count: 4

