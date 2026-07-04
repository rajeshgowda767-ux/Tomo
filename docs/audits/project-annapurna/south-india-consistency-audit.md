# Project Annapurna - South India Consistency Audit

Read-only audit across completed South India states:

- Karnataka
- Kerala
- Tamil Nadu
- Andhra Pradesh
- Telangana

Data source: `database/generated/recipes.json`

## 1. Executive Summary

South India Project Annapurna is broadly Beta 3 ready, with a few consistency issues to clean before hard lock.

| Area | Status | Notes |
|---|---|---|
| Canonical titles | ✅ Ready | No duplicate recipe titles or canonical titles detected in generated data. |
| Alias graph | ⚠ Needs attention | 6 alias collisions detected. Most are understandable, but they should be resolved before search is considered final. |
| Regional ownership | ⚠ Needs attention | Shared-region dishes are mostly documented, but some legacy rows still need local review or recipe cleanup. |
| Distinct recipes | ⚠ Needs attention | Most required distinct recipes remain separate. `Kori Gassi` is not present as a standalone recipe. |
| Images | ⚠ Needs attention | 104 South India-associated records use placeholders, generic images, or repeated fallback images. |
| Yellow / red backlog | ⚠ Needs attention | Large but expected backlog remains from strict authenticity review. No blocker if held items stay unimplemented. |

Beta 3 readiness: ⚠ Needs attention

No recipe/data changes were made as part of this audit.

## 2. Canonical Naming

### Duplicate Canonical Recipes

No duplicate titles detected in generated data.

No duplicate canonical titles detected in generated data.

### Inconsistent / Conflicting Canonical Titles

| Item | Finding | Recommendation |
|---|---|---|
| `Kori Gassi` | Requested as a distinct recipe in the consistency checklist, but no standalone `Kori Gassi` recipe exists. Karnataka audit rejected using current `Kori Rotti` as a substitute. | Add/fix later as standalone Coastal Karnataka `Kori Gassi`; do not pretend `Kori Rotti` covers it. |
| `Hyderabadi Chicken Biryani` vs `Hyderabadi Dum Biryani` | Both exist separately, but aliases overlap. | Keep separate; adjust aliases so broad `Hyderabadi Biryani` resolves predictably. |
| `Medu Vada` vs `Minapa Garelu` | Both exist separately and share generic aliases. | Keep separate if Tamil and Telugu entries are desired, but avoid shared aliases like `Medu Vada` on Telugu `Minapa Garelu` unless search can disambiguate. |
| `Ven Pongal` vs `Ven Pongal Tiffin Plate` | Separate title is correct, but aliases overlap. | Tiffin plate should avoid owning `Ven Pongal` as an alias if canonical `Ven Pongal` exists. |

### English Title Consistency

The new Annapurna recipes generally follow a good pattern:

- Local canonical title as primary: `Chitranna`, `Puliyogare`, `Thengai Sadam`, `Kodi Kura`, `Bagara Baingan`.
- English/common title as alias or subtitle: `Lemon Rice`, `Tamarind Rice`, `Coconut Rice`, `Andhra Chicken Curry`.
- Specific regional dish as separate recipe when method differs: `Thalassery Biryani`, `Hyderabadi Dum Biryani`, `Pallipalayam Chicken`.

## 3. Alias Consistency

### Important Alias Families

| Alias Family | Canonical Target | Status |
|---|---|---|
| `Lemon Rice`, `Chitranna`, `Elumichai Sadam`, `Nimmakaya Pulihora` | `Chitranna` | ✅ Consistent |
| `Puliyogare`, `Puliyodarai`, `Pulihora`, `Tamarind Rice` | `Puliyogare` | ✅ Consistent |
| `Curd Rice`, `Mosaranna`, `Thayir Sadam`, `Perugu Annam` | `Thayir Sadam` | ✅ Consistent, but shared-region note should remain visible in metadata |

### Alias Conflicts

Generated data currently has 6 alias conflicts:

| Alias | Recipes Owning Alias | Severity | Recommendation |
|---|---|---|---|
| `Pongal` | `Ven Pongal`, `Ven Pongal Tiffin Plate` | Medium | Keep `Pongal` on `Ven Pongal`; remove from plate/combo row later. |
| `Ven Pongal` | `Ven Pongal`, `Ven Pongal Tiffin Plate` | Medium | Plate row should use aliases like `Ven Pongal Plate`, not exact canonical dish alias. |
| `Hyderabadi Biryani` | `Hyderabadi Chicken Biryani`, `Hyderabadi Dum Biryani` | High | Decide whether broad alias points to `Hyderabadi Dum Biryani` or search disambiguates. |
| `Hyderabadi Chicken Dum Biryani` | `Hyderabadi Chicken Biryani`, `Hyderabadi Dum Biryani` | High | Avoid identical aliases across two distinct biryani records. |
| `Medu Vada` | `Minapa Garelu`, `Medu Vada` | Medium | Keep `Medu Vada` on Tamil canonical row; Telugu row can use `Garelu`, `Minapa Vada`. |
| `Urad Dal Vada` | `Minapa Garelu`, `Medu Vada` | Low / Medium | Acceptable as broad search alias only if search handles multiple matches; otherwise pick one canonical target. |

No alias loops detected from the audited alias families.

No duplicate aliases were found inside the key rice/curd/tamarind family records.

## 4. Regional Identity

### Strong Ownership

| State | Strong canonical examples |
|---|---|
| Karnataka | `Chitranna`, `Puliyogare`, `Bisi Bele Bath`, `Kundapura Chicken`, `Bassaru`, `Avarekalu Saaru` |
| Kerala | `Kaalan`, `Meen Pollichathu`, `Puttu`, `Idiyappam`, `Thalassery Biryani`, `Neychoru`, `Kerala Chicken Roast`, `Parippu Vada` |
| Tamil Nadu | `Thengai Sadam`, `Ven Pongal`, `Sambar Sadam`, `Kothu Parotta`, `Kal Dosai`, `Pallipalayam Chicken`, `Nethili Fry`, `Medu Vada`, `Murukku`, `Thattai` |
| Andhra Pradesh | `Kodi Kura`, `Bendakaya Fry`, `Beerakaya Pachadi`, `Gongura Pachadi`, `Royyala Vepudu`, `Tomato Pappu`, `Dosakaya Pappu` |
| Telangana | `Hyderabadi Chicken Biryani`, `Hyderabadi Dum Biryani`, `Bagara Rice`, `Bagara Baingan`, `Mirchi Ka Salan`, `Sarva Pindi`, `Sakinalu`, `Hyderabadi Marag`, `Talawa Gosht` |

### Shared-Region Notes Needed

| Recipe / Family | Current Direction | Recommendation |
|---|---|---|
| `Thayir Sadam` / curd rice family | Tamil canonical with `Mosaranna` and `Perugu Annam` aliases. | Acceptable for Beta 3, but future local review may split or generalize this family. |
| `Puliyogare` / tamarind rice family | Karnataka canonical with Tamil/Andhra aliases. | Acceptable for Beta 3 after canonical review; separate variants only if method becomes distinct. |
| `Chitranna` / lemon rice family | Karnataka canonical with Tamil/Andhra aliases. | Acceptable for Beta 3; avoid adding separate `Elumichai Sadam` or `Nimmakaya Pulihora` without distinct recipe method. |
| `Chepala Pulusu` | Shared Telugu dish. | Do not split Telangana style unless authored separately. |
| `Tomato Pappu` | Shared Telugu dal. | Keep shared; do not relabel as Telangana-only. |

### Regional Conflicts

No duplicate regional ownership is blocking Beta 3.

Attention items:

- `Sakinalu` and `Sarva Pindi` were yellow in Andhra but approved as Telangana identities. This is consistent.
- `Neychoru` was added separately instead of converting Karnataka `Ghee Rice`. This is consistent.
- `Puliyodarai` and `Elumichai Sadam` remain aliases, not Tamil duplicate recipes. This is consistent.

## 5. Distinct Recipes

| Recipe | Status | Notes |
|---|---|---|
| `Hyderabadi Dum Biryani` | ✅ Separate | Exists as distinct Telangana recipe. |
| `Thalassery Biryani` | ✅ Separate | Exists as distinct Kerala/Malabar recipe. |
| `Kori Gassi` | ⚠ Missing | Not present as standalone recipe. Current `Kori Rotti` was rejected as a substitute in Karnataka audit. |
| `Meen Pollichathu` | ✅ Separate | Exists and remains distinct from Kerala fish curry. |
| `Pallipalayam Chicken` | ✅ Separate | Exists as distinct Tamil/Kongu dish. |
| `Kodi Kura` | ✅ Separate | Exists as Andhra chicken curry canonical title. |

## 6. Rice Family

| Recipe | Canonical | English / Common Alias | Status |
|---|---|---|---|
| Chitranna | `Chitranna` | Lemon Rice, Elumichai Sadam, Nimmakaya Pulihora | ✅ Consistent |
| Puliyogare | `Puliyogare` | Tamarind Rice, Puliyodarai, Pulihora | ✅ Consistent |
| Ven Pongal | `Ven Pongal` | Pongal, Khara Pongal | ⚠ Alias collision with tiffin plate |
| Sambar Sadam | `Sambar Sadam` | Sambar Rice | ✅ Consistent |
| Thengai Sadam | `Thengai Sadam` | Coconut Rice, Thengai Saadam | ✅ Consistent |
| Bisi Bele Bath | `Bisi Bele Bath` | Bisibelebath, Bisi Bele Huliyanna | ✅ Consistent |
| Neychoru | `Neychoru` | Ney Choru, Kerala Ghee Rice, Malabar Ghee Rice | ✅ Consistent |

## 7. Chicken Family

| Recipe | Status | Notes |
|---|---|---|
| Kundapura Chicken | ✅ Distinct | Exists as Coastal Karnataka dish. Uses placeholder image. |
| Kerala Chicken Roast | ✅ Distinct | Exists as Kerala dish. Uses placeholder image. |
| Kodi Kura | ✅ Distinct | Andhra chicken curry canonical title. |
| Pallipalayam Chicken | ✅ Distinct | Tamil/Kongu dish. Uses placeholder image. |
| Hyderabadi Chicken Biryani | ✅ Distinct | Exists from renamed collection detail record. Alias overlap with dum biryani needs cleanup. |
| Hyderabadi Dum Biryani | ✅ Distinct | Exists as separate Telangana recipe. Uses placeholder image. |

## 8. Image Audit

South India-associated records using placeholders, generic collection art, or repeated fallback images: 104.

This count includes:

- Direct placeholder: `/assets/images/dishes/homestyle-kitchen-placeholder.png`
- Generic fallbacks such as `lunch-default.png`
- Repeated/generic images such as `fish-curry.png`, `dosa-homestyle.png`, `recommendation-pack-pepper-rasam.png`
- Collection-level art used as recipe images, especially festival sweets

### High-Priority Image Generation List

| Priority | Recipe | Reason |
|---:|---|---|
| 1 | Hyderabadi Dum Biryani | New high-visibility Telangana anchor; placeholder. |
| 2 | Thalassery Biryani | New high-visibility Kerala anchor; placeholder. |
| 3 | Bagara Baingan | New distinct Telangana side; placeholder. |
| 4 | Bagara Rice | New distinct Telangana rice; placeholder. |
| 5 | Kundapura Chicken | Karnataka chicken anchor; placeholder. |
| 6 | Kerala Chicken Roast | Kerala chicken anchor; placeholder. |
| 7 | Pallipalayam Chicken | Tamil chicken anchor; placeholder. |
| 8 | Kodi Kura | Uses Andhra curry image; acceptable but could use dedicated Andhra kodi kura photo. |
| 9 | Meen Pollichathu | Uses generic fish curry image; needs banana-leaf roasted fish visual. |
| 10 | Hyderabadi Marag | New Telangana mutton soup; placeholder. |
| 11 | Talawa Gosht | New Telangana mutton fry; placeholder. |
| 12 | Royyala Vepudu | New Andhra prawn fry; placeholder. |
| 13 | Gongura Pachadi | New Andhra pachadi; placeholder. |
| 14 | Beerakaya Pachadi | New Andhra pachadi; placeholder. |
| 15 | Bendakaya Fry | New Andhra dry fry; placeholder. |
| 16 | Kothu Parotta | Tamil anchor; placeholder. |
| 17 | Medu Vada | Tamil snack anchor; placeholder. |
| 18 | Murukku | Tamil snack anchor; placeholder. |
| 19 | Thattai | Tamil snack anchor; placeholder. |
| 20 | Neychoru | Kerala rice anchor; placeholder. |

## 9. Yellow / Red Backlog

### Karnataka

🟡 Needs Recipe Fix / Local Review:

- Badanekayi Ennegayi -> Yennegai
- Chicken Sukka -> Mangalorean Chicken Sukka
- Dharwad Peda
- Girmit
- Jolada Rotti
- Kadambuttu
- Kayi Saaru
- Kotte Kadubu
- Majjige Huli
- Mandakki Oggarane
- Mangalore Goli Baje
- Pathrode
- Ragi Malt
- Ragi Mudde
- Tambuli
- Thatte Idli
- Udupi Sambar
- Vangi Bath
- Heerekai Palya
- Sorekai Palya

🔴 Rejected:

- Sweet Holige as separate fix path
- Ragi Porridge as Karnataka iconic recipe
- Mosaranna using current `Thayir Sadam` as match
- Kori Gassi via current `Kori Rotti` record

### Kerala

🟡 Needs Recipe Fix / Local Review:

- Meen Moilee -> Fish Molee
- Palappam
- Kichadi
- Kerala Fish Curry
- Kerala Rasam
- Kerala Sambar
- Prawn Roast / Chemmeen Roast naming
- Beetroot Pachadi cleanup
- Chemmeen Theeyal image/ingredient cleanup
- Cherupayar Curry cleanup
- Ela Ada cleanup
- Erissery cleanup
- Idiyappam Egg Curry cleanup
- Kanji Payar cleanup
- Kappa Meen Curry cleanup
- Malabar Chicken Curry cleanup
- Malabar Fish Curry cleanup
- Sambharam cleanup
- Kerala Beef Fry sensitive cleanup
- Kerala Parotta Beef Fry sensitive cleanup

🔴 Rejected:

- Rename Appam to Palappam
- Convert Karnataka Ghee Rice into Kerala Neychoru
- Treat Appam Stew as canonical Kerala recipe without fixing data
- Treat Chicken Stew as complete Kerala Chicken Stew now
- Treat generic Kerala Fish Curry as final

### Tamil Nadu

🟡 Needs Recipe Fix / Local Review:

- Chettinad Chicken Curry -> Chicken Chettinad
- Tomato Rice -> Tomato Sadam
- Idiyappam Tamil variant
- Avial Tamil variant
- Kara Kuzhambu vs Puli Kuzhambu
- Vanjaram Fry
- Generic Kootu row
- Sweet Pongal vs Sakkarai Pongal
- Adai / Adai Avial cleanup
- Coconut Sevai cleanup
- Fish Fry Tamil Style cleanup
- Kongunadu Chicken Curry cleanup
- Lemon Sevai cleanup
- Nandu Rasam cleanup
- Paruppu Urundai Kuzhambu cleanup
- Poondu Kuzhambu cleanup
- Poriyal cleanup
- Rava Kesari cleanup
- Vatha Kuzhambu family cleanup

🔴 Rejected:

- Rename Chitranna to Elumichai Sadam
- Rename Puliyogare to Puliyodarai
- Treat Madras Curry as Tamil home classic
- Count Gunpowder Idli as Tamil gold coverage
- Treat Fish Fry Tamil Style as Nethili or Vanjaram Fry
- Treat Adai Avial as standalone Avial coverage

### Andhra Pradesh

🟡 Needs Recipe Fix / Local Review:

- Gunpowder Idli
- Guntur Chilli Chicken
- Andhra Fish Fry -> Chepa Vepudu
- Keema Undalu

Items resolved through Telangana ownership:

- Sakinalu
- Sarva Pindi

🔴 Rejected / Do Not Implement Now:

- Rename Puliyogare to Pulihora
- Add separate Pulihora recipe
- Add separate Perugu Annam recipe
- Rename generic Mutton Keema Curry as Andhra
- Rename Andhra Fish Fry to Chepa Vepudu without recipe fix

### Telangana

🟡 Needs Recipe Fix / Local Review:

- Veg Biryani / Hyderabadi Veg Biryani
- Mutton Keema Curry as Talawa Gosht candidate
- Osmania Biscuits
- Telangana-specific Chepala Pulusu split

🔴 Rejected:

- Rename Veg Biryani to Hyderabadi Dum Biryani
- Rename Mutton Keema Curry to Talawa Gosht
- Split Chepala Pulusu into Telangana style now
- Rename Haleem title to Hyderabadi Haleem
- Rename Tomato Pappu as Telangana Tomato Dal

## 10. Beta 3 Readiness

| Area | Readiness | Reason |
|---|---|---|
| Canonical naming | ✅ Ready | No duplicate generated titles or canonical titles. |
| Alias consistency | ⚠ Needs attention | Six alias collisions should be cleaned before final search lock. |
| Regional identity | ✅ Ready with notes | Major ownership choices are consistent; shared dishes have acceptable Beta 3 handling. |
| Distinct recipes | ⚠ Needs attention | `Kori Gassi` is missing as standalone; other requested distinct recipes are intact. |
| Rice family | ✅ Ready | Core aliases are consistent; only Pongal plate alias needs cleanup. |
| Chicken family | ⚠ Needs attention | Strong overall, but `Kori Gassi` gap remains. |
| Images | ⚠ Needs attention | 104 South India-associated records use placeholder/generic/repeated images. |
| Yellow/red backlog | ✅ Ready | Backlog is documented and safely held out of implementation. |

Final Beta 3 recommendation:

⚠ Needs attention, but no release blocker if alias collisions are acceptable for Beta 3 search behavior and placeholder-heavy images are handled as a known visual backlog.

Recommended pre-lock cleanup:

1. Resolve high-impact alias collisions: Hyderabadi biryani, Ven Pongal plate, Medu Vada/Garelu.
2. Decide whether `Kori Gassi` must be added before Beta 3 or explicitly moved to Beta 4.
3. Generate dedicated images for the top 20 high-priority regional anchors.
4. Keep all yellow/red backlog items frozen until local review or recipe-fix pass.
