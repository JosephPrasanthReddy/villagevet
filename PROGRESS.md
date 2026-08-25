# VillageVet Multilingual — Progress Log

## Final Multilingual QA (DONE, this session)
Scope: QA-only pass across all pages/languages listed in the QA brief —
`/`, `/about`, `/services`, `/farmer-solutions`, `/retail-network`,
`/products`, `/farmer-awareness`, `/veterinary-professionals`,
`/business-partners`, `/investors`, `/contact`, `/privacy-policy`,
`/terms`, `/medical-disclaimer`, 404 — across English, Telugu, Hindi,
Tamil, Kannada, Malayalam.

**Method** (no working build available — see Build result below): wrote
a small Node script (`vm`-evaluated, not naive regex) that extracts every
literal `translate('...')` call across `src/pages` + `src/components`,
evaluates each as a real JS string (so escape sequences like `\u2019`
resolve correctly), and cross-checks it against all 5 non-English
dictionaries for missing or empty values. Ran the same check against the
`nav`/`home`/`ai` namespaces for structural parity with `en.js`, and
against every data-driven string in `services.js`, `products.js`,
`farmerSolutions.js`, and `articles.js` (title/description/summary/point/
category/animals fields) via `cards.*`/`articles.*`/`ui` lookups.

**Result:** 0 missing keys, 0 empty/undefined values, full structural
parity, across 171 literal keys + all data-driven content, in all 5
non-English languages.

**One genuine issue found and fixed:** `src/components/StoreIllustration.jsx`
(used only on `/retail-network`) had a hardcoded English `aria-label`
("VillageVet store concept: shelving with medicines...") that was never
wrapped in `translate()` — a real accessibility gap for screen-reader
users on non-English locales. Fixed: added `useLanguage()`, wrapped the
`aria-label` in `translate()`, added the 1 new key to all 5 dictionaries.
Zero visual/layout risk — `aria-label` isn't rendered on screen.

**Known, deliberate limitation — not fixed:** the same
`StoreIllustration.jsx` has 3 English `<text>` labels baked into the SVG
artwork itself ("Medicines", "Feed & Poultry Feed", "Equipment"), fixed at
specific pixel coordinates inside fixed-width shelf-illustration shapes.
SVG `<text>` doesn't wrap, and several of the required languages
(particularly Malayalam and Tamil) commonly run longer than English for
short labels — translating these risks exactly the "clipped text" /
"overflowing" failure mode this QA pass is meant to catch, and fixing it
properly (resizing the illustration's shelf widths, testing 6-language
overflow) would cross into "redesign," which this stage is explicitly
barred from. Left as English, consistent with the prior stage's decision
on this same file. Flagging clearly rather than silently leaving it.

**Layout/overflow checks not independently verifiable this session:** the
requested checks for horizontal scrolling, clipped text, and overflowing
buttons need an actual rendered page in a browser. This sandbox has no
network access (`npm install` fails: `403 host_not_allowed` from
registry.npmjs.org), so no build could be produced to visually test
against. What *was* checked statically: no CSS rule anywhere sets a fixed
`width` (as opposed to `min-width`/`max-content`) on a text-bearing
button, pill, or badge outside the locked `Navbar.jsx` (which uses
`whitespace-nowrap` on desktop nav links — a real theoretical overflow
risk if a translated nav label runs long, but `Navbar.jsx` is explicitly
locked and was not touched or even flagged for repair here). Recommend an
actual visual QA pass in an environment with a working build.

**Files changed:** `src/components/StoreIllustration.jsx` only (+1 key ×
5 languages = 5 new `ui` entries; all 5 dictionaries now at 390 keys,
confirmed in sync).

**Locked areas confirmed untouched** (byte-diffed against the pre-QA
snapshot): `AIAssistantCTA.jsx`, `server/ai-server.mjs`, `Navbar.jsx`,
`Hero.jsx`, `HeroIllustration.jsx`, `App.jsx` (routes unchanged, 17 routes
intact).

## Stage 4D-11 — Terms of Use page (DONE, this session)
Scope: `src/pages/Terms.jsx` only (the current project's terms page; no
separate `TermsOfUse.jsx` or other Terms-specific data file exists).
- Page was 100% hardcoded English: SEO title/description, the "Legal"
  eyebrow + "Terms of Use" h1, the intro paragraph, all 6 section
  headings (Use of This Website, No Medical Advice, Planned
  Initiatives, Intellectual Property, Changes to These Terms, Contact)
  with their body paragraphs, and the "Questions about these terms can
  be sent to" prefix before the contact email link. No mixed-language
  bug — nothing was translated at all going in, so this was a
  completeness gap wired end to end, matching the pattern from 4D-1
  through 4D-10.
- Reused 1 existing exact-match key: `'Legal'`.
- No legal obligations, policies, guarantees, certifications or
  regulatory claims were invented, added, or altered — every
  translation is a faithful, meaning-preserving rendering of the
  existing legal copy. The "Contact" paragraph was split into a
  translated prefix sentence + the untouched `mailto:` link + a
  literal period, so the contact email address itself is
  byte-identical to before.

### Keys added this stage
15 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 75 entries: SEO
title/description, intro paragraph, 6 section headings, 6 section body
paragraphs, and the "Questions about these terms can be sent to"
prefix sentence. (`'Legal'` was reused, not re-added.)

### Files changed this stage
- `src/pages/Terms.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (15 new `ui` entries appended to each — all now
  carry 381 `ui` entries apiece, in sync)
- `src/i18n/en.js` untouched — no `ui` table needed for English.

### Mid-stage bug caught and fixed
The first attempt at appending the 15 new keys placed the `ui` object's
closing `}` *before* the new key/value pairs instead of after, which
silently made all 15 new keys top-level siblings of `ui` in each
dictionary's default export (`dict['Terms of Use']` instead of
`dict.ui['Terms of Use']`) instead of a syntax error. This would have
meant every `translate('Terms of Use')` call silently fell back to the
English source string at runtime, in every language, with nothing
visibly broken. Caught by checking `Object.keys(dict)` stayed at
exactly 6 top-level keys (`ai`, `nav`, `home`, `cards`, `articles`,
`ui`) after the edit — it had grown to 21. Fixed by finding the true
premature `}` (right before the first new key), removing it, and
correctly closing both `ui` and the outer export object at the actual
end of the file. Re-verified: all 5 languages back to 6 top-level
keys, `ui` at 381 entries each, all 15 new keys resolving inside `ui`
as intended.

Verified via a Node ESM parse of all 6 dictionary files (no syntax
errors, no duplicate keys, identical key counts across all 5
non-English files, exactly 6 top-level keys in each), a cross-check
that every `translate()` call in the rewritten `Terms.jsx` resolves to
a real key in all 5 non-English dictionaries (zero silent English
fallbacks), and a brace/paren balance check on the rewritten JSX file
(21/21 braces, 20/20 parens).

**`npm install` could not be completed this session** — the npm
registry returned `403 Forbidden` on every package requested (e.g.
`yallist`, `esbuild`), so `npm run build` was not actually run, and no
`diff -rq` against a pristine reinstalled `node_modules` was possible.
Only `Terms.jsx` and the 5 non-English dictionaries were intentionally
opened for writing this stage. **Run `npm install && npm run build`
yourself** in an environment with registry access before shipping.

## Stage 4D-10 — Privacy Policy page (DONE, this session)
Scope: `src/pages/Privacy.jsx` only (the current project's privacy page;
no separate `PrivacyPolicy.jsx` or other Privacy-specific data file
exists).
- Page was 100% hardcoded English: SEO title/description, the "Legal"
  eyebrow + "Privacy Policy" h1, the intro paragraph, all 5 section
  headings (Information We Collect, How We Use Information, Sharing of
  Information, Cookies, Contacting Us) with their body paragraphs, and
  the closing "this policy will be reviewed and updated..." line. No
  mixed-language bug — nothing was translated at all going in, so this
  was a completeness gap wired end to end, matching the pattern from
  4D-1 through 4D-9.
- Reused 2 existing exact-match keys: `'Legal'` and `'Privacy Policy'`
  (the latter used for both the SEO title and the h1, same as the
  original English).
- No legal claims, policies, obligations, certifications or regulatory
  statements were invented, added, or altered — every translation is a
  faithful, meaning-preserving rendering of the existing legal copy.
  The "Contacting Us" paragraph was split into a translated prefix
  sentence + the untouched `mailto:` link + a literal period, so the
  contact email address itself is byte-identical to before.

### Keys added this stage
13 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 65 entries: SEO
description, intro paragraph, 5 section headings, 5 section body
paragraphs, the "Contacting Us" prefix sentence, and the closing
review-notice line. (`'Legal'` and `'Privacy Policy'` were reused, not
re-added.)

### Files changed this stage
- `src/pages/Privacy.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (13 new `ui` entries appended to each — all now carry
  366 `ui` entries apiece, in sync)
- `src/i18n/en.js` untouched — no `ui` table needed for English.

Verified via a Node ESM parse of all 6 dictionary files (no syntax
errors, no duplicate keys, identical key counts across all 5 non-English
files), a cross-check that every `translate()` call in the rewritten
`Privacy.jsx` resolves to a real key in all 5 non-English dictionaries
(zero silent English fallbacks), a brace/paren balance check on the
rewritten JSX file, and a full `diff -rq` against the original uploaded
project confirming the only files touched anywhere in the repo are the 6
listed above. `npm install && npm run build` were actually run this
session (this sandbox has npm registry access) — clean build, 1623
modules transformed, no errors (one pre-existing informational
chunk-size note from Vite, unrelated to this change).

## Stage 4D-9 — Investors page (DONE, this session)
Scope: `src/pages/Investors.jsx` only (no other Investors-specific data
file or component exists).
- Page was 100% hardcoded English: SEO title/description, eyebrow, h1
  title, description, all 6 highlight cards (title + text each —
  Farmer-Focused Model, Veterinary Services, Medicine Access, Feed &
  Equipment, Retail Expansion, Technology-Enabled Future), the "A Note
  on This Page" disclaimer block, and the closing CTA's
  eyebrow/title/description/primary-label/secondary-label. No
  mixed-language bug — nothing was translated at all going in, so this
  was a completeness gap wired end to end, matching the pattern from
  4D-1 through 4D-8.
- Reused 1 existing exact-match key: `'Contact VillageVet'` (the CTA
  primary button label, already a key from the 4D-1 About stage).
- No revenue, funding, customer numbers, market share, traction,
  valuation, certifications, approvals, government relationships, or
  partnerships were invented — every translation is a faithful
  rendering of the existing English copy, and the "not an offer,
  solicitation, or guarantee of any investment outcome" / "does not
  include revenue, funding, valuation or growth figures" disclaimer
  language is preserved intact in every language.

### Keys added this stage
23 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 115 entries: SEO
title/description, eyebrow, h1 title/description, all 6 highlight
title+text pairs (12 keys), the note heading + body, the CTA
eyebrow/title/description, and "Read Our Story". (`'Contact VillageVet'`
was reused, not re-added.)

### Files changed this stage
- `src/pages/Investors.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (23 new `ui` entries appended to each — all now carry
  353 `ui` entries apiece, in sync)
- `src/i18n/en.js` untouched — no `ui` table needed for English.

Verified via a Node ESM parse of all 6 dictionary files (no syntax
errors, no duplicate keys, identical key counts across all 5 non-English
files), a cross-check that every `translate()` call in the rewritten
`Investors.jsx` — including the dynamic `highlights` array's title/text
pairs — resolves to a real key in all 5 non-English dictionaries (zero
silent English fallbacks), a brace/paren balance check on the rewritten
JSX file, and a full `diff -rq` against the original uploaded project
confirming the only files touched anywhere in the repo are the 6 listed
above. `npm install && npm run build` were actually run this session
(this sandbox has npm registry access) — clean build, 1623 modules
transformed, no errors.

## Stage 4D-8 — Business Partners page (DONE, this session)
Scope: `src/pages/Partners.jsx` only (`ContactForm.jsx` inspected again,
not modified — same as 4D-7, it already handles its own translation
internally).
- Page was 100% hardcoded English: SEO title/description, eyebrow, h1
  title, description, all 7 partner-audience cards (title + text each —
  Veterinary Medicine Manufacturers, Feed Manufacturers, Equipment
  Manufacturers, Distributors, Veterinary Professionals, Retail Partners,
  Technology Partners), and the `ContactForm`'s `title` prop ("Partner
  With VillageVet"). No mixed-language bug — nothing was translated at
  all going in, so this was a completeness gap wired end to end, matching
  the pattern from 4D-4 through 4D-7.
- Reused 3 existing exact-match keys instead of duplicating them:
  `'Veterinary Professionals'` (one of the 7 audience titles — added in
  4D-7), `'Business Partnership'` (the `defaultEnquiryType`, already a key
  from `ContactForm.jsx`'s enquiry-type list), and `'Partner With
  VillageVet'` (the `ContactForm` title prop, already a key from the
  4D-6 RetailNetwork stage).
- No manufacturers, certifications, approvals, revenue, funding, market
  share, or other company claims were invented — every translation is a
  faithful rendering of the existing English copy only.

### Keys added this stage
17 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 85 entries: SEO
title/description, eyebrow, description, and 6 of the 7 audience
title+text pairs (12 keys) plus the 7th audience's text only (its title,
"Veterinary Professionals," was reused). The page's `<h1>` reuses the same
`'Business Partners'` key as the SEO title — one entry, two use sites.

### Files changed this stage
- `src/pages/Partners.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js`
- `src/i18n/en.js` untouched — no `ui` table needed for English.

Verified via a Node ESM parse of all 6 dictionary files and a full
simulated render of the page (every `translate()` call, including the
dynamic `audiences` array) across all 5 non-English languages — zero
silent English fallbacks, zero duplicate keys. Confirmed
`AIAssistantCTA.jsx`, `server/ai-server.mjs`, `Navbar.jsx`, `Hero.jsx`
byte-identical (md5 unchanged) to before this stage. This session's
sandbox again had no npm registry access (same as 4D-7) — `npm run build`
could not actually be run; verification relied entirely on the manual
checks above.

## Stage 4D-7 — Veterinary Professionals page (DONE, this session)
Scope: `src/pages/Professionals.jsx` only, plus `ContactForm.jsx` was
inspected (not modified — it already handles its own internal translation
correctly via `translate()`, including `translate(t)` on each enquiry-type
option, so `defaultEnquiryType="Veterinary Professional"` needed no change;
only the `title` prop passed *into* it from `Professionals.jsx` needed
wrapping).
- Page was 100% hardcoded English: SEO title/description, eyebrow, h1
  title, description, all 5 "why join" points (title + text each), the
  disclaimer paragraph about not yet having an established veterinarian
  network, and the `ContactForm`'s `title` prop ("Join VillageVet"). No
  mixed-language bug was present (nothing was translated at all going in),
  so there was nothing to "fix" — this was a completeness gap, wired end
  to end.
- Reused 1 existing exact-match key: `'Farmer Support'` (one of the 5
  point titles) already existed as a `ui` key from `ContactForm.jsx`'s
  `enquiryTypes` list — reused rather than duplicated.
- No professional credentials, certifications, partnerships, or company
  claims were invented — translations are faithful renderings of the
  existing English copy, including keeping the "does not yet operate an
  established veterinarian network" disclaimer intact in every language.

### Keys added this stage
15 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 75 entries: SEO
title/description, eyebrow, description, 4 of the 5 point titles + all 5
point texts, the disclaimer, and "Join VillageVet". (The page's `<h1>`
reuses the same `'Veterinary Professionals'` key as the SEO title — one
entry, two use sites.)

### Files changed this stage
- `src/pages/Professionals.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js`
- `src/i18n/en.js` untouched — no `ui` table needed for English.

Verified via a Node ESM parse of all 6 dictionary files and a full
simulated render of the page (every `translate()` call, including the
dynamic `points` array) across all 5 non-English languages — zero silent
English fallbacks, zero duplicate keys. Confirmed `AIAssistantCTA.jsx`,
`server/ai-server.mjs`, `Navbar.jsx`, `Hero.jsx` byte-identical (md5
unchanged) to before this stage.

Note on build verification: unlike the 4D-6 session (whose HANDOFF entry
reported actually running `npm install && npm run build` in a sandbox with
registry access), this session's sandbox had no network access — `vite`
could not be installed, so the build could not be run. Verification here
relied entirely on the manual checks above, not an actual build.

## Stage 4D-6 — Retail Network page (DONE, this session)
Scope: `src/pages/RetailNetwork.jsx` only (no other Retail-Network-specific
data file or component exists — `StoreIllustration.jsx`/`OrganicBlob.jsx`
are purely visual/decorative, no visible text).

- The entire page was 100% hardcoded English: the `<SEO>` title/description,
  the hero eyebrow/heading/description, the 3 `pilotFacts` label/value pairs
  ("Program"/"Planned 4-Outlet Pilot Program", "Vision"/"One Veterinary Shop
  in Every Mandal", "Model"/"Medicines, feed, equipment & support — under
  one roof"), the 8 `storeContains` items (Veterinary medicines, Cattle
  feed, Poultry feed, Supplements, Mineral mixtures, Veterinary equipment,
  Animal-care products, Farmer assistance counter), the "Pilot Program"
  `SectionHeader` eyebrow/title/description, both "What Each Outlet Aims to
  Offer" / "A Model We Aim to Grow Carefully" card headings and bodies, and
  the closing `CTASection` eyebrow/title/description/primary-label/
  secondary-label — none of it went through `translate()`.
- Wired every visible string through the existing `translate()` helper from
  `src/i18n/LanguageContext.jsx`, same pattern as every other page in this
  log (`About.jsx`, `Products.jsx`, `Services.jsx`, `FarmerSolutions.jsx`).
  No new translation mechanism, no MutationObserver, no browser translation.
- The `storeContains` and `pilotFacts` arrays stay as the single English
  source of truth (unchanged); each `.map()` now calls `translate(item)` /
  `translate(f.label)` / `translate(f.value)` at render time, so there is no
  possibility of a translated heading pairing with English body text — the
  page was never partially wired.
- Reused the existing `'Contact Us'` key (already present in all 6
  dictionaries) for the CTA's secondary button. No other existing key was a
  case-for-case match with this page's strings (e.g. the nav's `'Retail
  Network'` and the `ui` dictionary's `'Veterinary Medicines'`/`'Cattle
  Feed'`/etc. are differently-capitalized, differently-worded strings used
  elsewhere), so this page's own copy was translated as new entries.
- The 4-outlet pilot program is described throughout as **planned** —
  "Planned 4-Outlet Pilot Program," "not a claim that the full network is
  already in place" — and every translation preserves that framing. No
  additional outlet counts, achievements, medical claims, products, prices,
  certifications, or approvals were introduced in any language.

### Keys added this stage
28 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 140 entries, covering
the SEO title/description, hero eyebrow/heading/description, all 3 pilot
facts (label + value), all 8 store-contains items, the Pilot Program section
eyebrow/title/description, both outlet-model card headings/bodies, and the
closing CTA's eyebrow/title/description/primary-label. (`'Contact Us'` was
reused, not re-added.) All 5 non-English dictionaries now carry 298 `ui`
entries apiece, confirmed in sync via Node ESM parse.

### Files changed this stage
- `src/pages/RetailNetwork.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js`
- `src/i18n/en.js` — **not modified** (English has no `ui` table;
  `translate()` falls back to the source string for `lang === 'en'`).

### Verification performed
1. A Node ESM parse of all 6 i18n files — all load cleanly, no syntax
   errors.
2. A cross-check script confirming every string `RetailNetwork.jsx` passes
   to `translate()` (including every `storeContains` item and every
   `pilotFacts` label/value) resolves to a real key in all 5 non-English
   dictionaries — zero silent English fallbacks, zero missing keys.
3. Brace/paren balance check on the rewritten JSX file (36/36 braces,
   32/32 parens).
4. `AIAssistantCTA.jsx`, `Navbar.jsx`, `Hero.jsx`, `server/ai-server.mjs`
   confirmed unchanged (md5 spot-check on the first three; ai-server.mjs
   not touched by any tool this stage).
5. **`npm install && npm run build` actually run this session** (this
   sandbox has npm registry access, unlike the environment described in
   earlier stages' "Known environment limitation" note below) — clean
   build, 1623 modules transformed, no errors or warnings beyond the
   pre-existing npm audit advisories.
6. A full `diff -rq` against the original uploaded project confirmed the
   only files touched anywhere in the repo are the 6 listed above.

## Stage 4D-5 — Farmer Solutions (DONE, this session)
Scope: `src/pages/FarmerSolutions.jsx`, `src/data/farmerSolutions.js`
(read-only — not modified), and `src/components/FarmerSolutionCard.jsx`.

- **Root cause found:** `FarmerSolutionCard.jsx` — the shared card used on
  both `/farmer-solutions` and the Home.jsx homepage preview — rendered
  `solution.title` / `solution.summary` / `solution.points` directly with
  **zero translation lookup**. This was exactly the reported bug pattern
  ("translated title + English bullet points"): the card's *chrome* (if
  any labels existed) would translate, but title/summary/every bullet
  point stayed raw English in every language.
- Fixed at the component level: added `useLanguage()` and wrapped
  `solution.title`, `solution.summary`, and each `solution.points[i]` in
  `translate()`. Because `Home.jsx` imports this same component
  (`<FarmerSolutionCard solution={s} compact />` in its homepage preview),
  this single fix also corrects the homepage preview — **without touching
  Home.jsx**, staying inside the "directly related component" scope.
- `FarmerSolutions.jsx` page chrome (SEO title/description, eyebrow, page
  title/description, and the closing `CTASection`'s title/description/
  primary-label/secondary-label) was also 100% hardcoded English — wired
  through `translate()`, reusing `'Farmer Solutions'` and `'Solutions for
  Farmers'`-style keys that already existed from earlier stages where
  possible.
- `data/farmerSolutions.js` was only *read*, never modified — no new
  livestock categories, claims, prices, or facts were invented. All 5
  categories (Cattle & Dairy, Buffalo, Goat, Sheep, Poultry), their 5
  summaries, and all 22 *unique* bullet points (26 total across the 5
  categories, with 4 exact repeats deduplicated to a single dictionary
  entry each) are now translated.

### Keys added this stage
37 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 185 entries:
- 2 titles ("Cattle & Dairy", "Goat" — Buffalo/Sheep/Poultry already existed)
- 5 summaries
- 22 unique bullet points
- 8 page-chrome strings (SEO description, eyebrow, page title/description,
  CTA title/description, "Talk to VillageVet", "Read Farmer Awareness")

All 5 non-English dictionaries now carry 270 `ui` entries apiece, confirmed
in sync via Node ESM parse.

### Files changed this stage
- `src/pages/FarmerSolutions.jsx`
- `src/components/FarmerSolutionCard.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js`
- `src/i18n/en.js`, `src/data/farmerSolutions.js` — **not modified**
  (English is the fallback; data file only read).

Verified: (1) a Node script cross-checking every `title`/`summary`/`points[]`
string in `farmerSolutions.js` against all 5 dictionaries — zero gaps; (2) a
second check confirming every literal `translate('...')` call in
`FarmerSolutions.jsx` resolves in all 5 languages; (3) brace/paren balance
on both edited files; (4) `Home.jsx`, `AIAssistantCTA.jsx`,
`server/ai-server.mjs`, `Navbar.jsx`, and `Hero.jsx` confirmed **byte-
identical** (md5) to the state before this stage — nothing outside the
declared scope was touched, even though Home.jsx's farmer-solutions preview
is now correctly translated as a side effect of the component fix.

## Stage 4D-4 — Products page (DONE, this session)
Scope: `src/pages/Products.jsx` only. `ProductCategoryCard.jsx` and the
`cards.products` dictionary were inspected first, per the task's explicit
instruction — confirmed already fully correct (all 8 `products.js` slugs
covered in `cards.products` for all 6 languages, title+description
together, so no "Telugu heading + English description" bug exists at the
card level on this page).
- The gap was entirely page-chrome: `Products.jsx` itself was 100%
  hardcoded English — the `<SEO>` title/description, the `SectionHeader`
  eyebrow/title/description, and the closing "Looking for a Specific
  Product?" callout (heading, body, "Enquire About Products" button).
- Wired every one of those through `translate()`, same pattern as
  `About.jsx`/`Contact.jsx`/`Services.jsx`. Of the 7 strings involved, 2
  (`'Products'`, `'Catalogue'`) already existed in the `ui` dictionary and
  were reused, not duplicated.
- No product names, brands, prices, medical claims, or certifications were
  invented — translations are faithful renderings of the existing English
  copy only.

### Keys added this stage
5 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 25 entries: the SEO
description, the page description, and the "Looking for a Specific
Product?" callout's heading/body/button. (`'Products'` and `'Catalogue'`
were reused, not re-added.)

### Files changed this stage
- `src/pages/Products.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (5 new `ui` entries appended to each — all now carry 233
  `ui` entries apiece, in sync)
- `src/i18n/en.js` untouched — no `ui` table needed for English.

Verified via a Node ESM parse of all 6 dictionary files and a cross-check
that every `translate('...')` call in the rewritten `Products.jsx` resolves
to a real key in all 5 non-English dictionaries — zero silent English
fallbacks. Confirmed `AIAssistantCTA.jsx`, `server/ai-server.mjs`,
`Navbar.jsx`, `Hero.jsx` byte-identical (md5 unchanged) to before this
stage. No other page was touched.

## Stage 4D-3 — Services page (DONE)
Scope: `src/pages/Services.jsx` only (no other Services-specific data file or
component exists beyond the already-correct, shared `ServiceCard.jsx`).
- `ServiceCard.jsx` was **already fully correct** going into this stage —
  confirmed by reading it first rather than assuming: it looks up
  `t.cards?.services?.[slug]` and only falls back to the raw English props
  if a slug has no dictionary entry. All 8 `services.js` slugs are covered
  in `cards.services` for every language, so no "Telugu heading + English
  description" bug exists at the card level on this page. The button label
  already uses `translate('Learn more')`.
- The actual gap was entirely at the page-chrome level: `Services.jsx`
  itself was 100% hardcoded English — the `<SEO>` title/description, the
  `SectionHeader` eyebrow/title/description, and the closing `<CTASection>`
  title/description/primary-label/secondary-label never went through
  `translate()`.
- Wired every one of those through `translate()`, same pattern as
  `About.jsx`/`Contact.jsx`. Of the 9 strings involved, 3 (`'What We Offer'`,
  `'Contact Us'`, `'View Products'`) already existed in the `ui` dictionary
  from earlier stages and were reused, not duplicated.

### Keys added this stage
6 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 30 entries: the SEO
title/description, the page title/description, and the CTA title/description.
Verified via a Node ESM parse of all 6 dictionary files and a cross-check
script confirming every `translate('...')` call in the rewritten
`Services.jsx` resolves to a real key in all 5 non-English dictionaries —
zero silent English fallbacks.

### Files changed this stage
- `src/pages/Services.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (6 new `ui` entries appended to each)
- `src/i18n/en.js` untouched — no `ui` table needed for English.

Nothing in `AIAssistantCTA.jsx`, `server/ai-server.mjs`, `Navbar.jsx`,
`Hero.jsx`, the Brown/Gold theme/CSS, `LanguageContext.jsx`, or any
unrelated page was touched.

## Stage Contact-Phone-FINAL-FIX — Project-wide old-number sweep (DONE)
Scope: phone number only, wherever a genuine VillageVet contact reference
used it — no other content, layout, or system changed.
- Searched the entire project (`grep -rl`, excluding `node_modules`/`.git`)
  for every form of the old number: `040-3594 0968`, `+914035940968`,
  `4035940968`. Also checked all 6 i18n dictionary files specifically —
  clean, the phone number was never embedded in a translation string.
- Found **one remaining genuine live occurrence** not caught by the prior
  Contact-only fix: `src/components/Footer.jsx` (site-wide footer, shown on
  every page) still had `tel:+914035940968` / `040-3594 0968`. Replaced with
  `tel:+919704420273` / `+91 97044 20273` — phone number and `tel:` link
  only; no other line in the file touched.
- Confirmed `src/pages/Contact.jsx` and `src/components/ContactForm.jsx`
  already had the corrected number from the prior `4D-2-FIX` stage —
  no changes needed there this time.
- Confirmed `server/ai-server.mjs` (the AI chatbot backend, explicitly
  off-limits) already references `+91 97044 20273` independently — not
  touched, just verified for consistency.
- The only remaining mentions of the old number anywhere in the project are
  historical prose in `HANDOFF.md`/`PROGRESS.md` documenting *past* stages —
  left as-is since they're changelog history, not live contact info.
- Re-verified `Footer.jsx` brace balance (70/70) after the edit; no other
  functional change to the footer, translation system, or ContactForm.

### Files changed this stage
- `src/components/Footer.jsx` (phone number + `tel:` link only)

No i18n dictionary files, translation system, ContactForm functionality,
navbar, hero, theme, or unrelated pages were touched.

## Stage 4D-2-FIX — Contact page phone number correction (DONE)
Scope: `src/pages/Contact.jsx` and `src/components/ContactForm.jsx` only.
- The project still had the old phone number (`040-3594 0968` /
  `tel:+914035940968`) hardcoded in two places on the Contact page: the
  phone button in the contact-methods list (`Contact.jsx`) and the
  "form isn't connected yet" fallback message (`ContactForm.jsx`).
- Replaced both with the confirmed number: **+91 97044 20273**, linked as
  `tel:+919704420273`.
- The WhatsApp number was already sourced from `VITE_WHATSAPP_NUMBER` and
  was not touched.
- Re-verified all 36 unique strings passed to `translate()` across both
  files (including the 8 `enquiryTypes` options) still resolve in all 5
  non-English dictionaries — the number swap is a literal string, not a
  translation key, so no i18n dictionary changes were needed for this fix.
  No mixed-language regressions found.
- A third occurrence of the old number exists in `src/components/Footer.jsx`
  (site-wide footer, not part of the Contact page or ContactForm). Per this
  stage's explicit scope ("ONLY work on the Contact page and directly related
  ContactForm"), it was **not** touched — flagged below and in HANDOFF.md for
  a future stage.

### Files changed this stage
- `src/pages/Contact.jsx` (phone number + `tel:` link only)
- `src/components/ContactForm.jsx` (phone number + `tel:` link only)

No i18n dictionary files were changed this stage — no new or altered
translation keys were needed.

## Stage 4D-2 — Contact page (DONE)
Scope: `src/pages/Contact.jsx` and `src/components/ContactForm.jsx` only. No
other Contact-specific data file exists (contact details live inline as
`import.meta.env.VITE_WHATSAPP_NUMBER` / `VITE_CONTACT_FORM_ENDPOINT` plus the
hardcoded email/phone/URL — none of these were changed).
- `Contact.jsx` was 100% hardcoded English: SEO title/description, the
  "Get in Touch" eyebrow, the "Contact VillageVet" heading (reused from About),
  the info-card description, the "Chat on WhatsApp" button label, the
  unconfigured-WhatsApp placeholder text, the "VillageVet India Pvt. Ltd."
  company label, and the `ContactForm` title prop — none of it went through
  `translate()`.
- `ContactForm.jsx` was 100% hardcoded English: the 8 enquiry-type dropdown
  options, all 5 field labels (Name/Phone/Email (optional)/Enquiry Type/
  Message), all 4 validation messages, the success-state heading/body/button,
  the unconfigured-state heading/body/button (including the sentence that
  wraps the mailto/tel links — split into translated prefix + a translated
  "or" connector + the untouched links, so the actual email/phone stay
  literal), the generic submit-error message, and the submit button's
  idle/loading labels.
- Wired every one of the above through `translate()` from the existing
  `src/i18n/LanguageContext.jsx` — same pattern as `About.jsx`/`Home.jsx`. No
  new translation mechanism, no MutationObserver, no browser translation.
- Reused the existing `'Contact VillageVet'` and `'Contact Us'` keys (already
  present from the nav and the 4D-1 About stage) instead of duplicating them.
- `ContactForm`'s `title` prop default changed from a hardcoded English string
  to `title || translate('Send an Enquiry')`, so the component still falls
  back to a *localized* default if ever rendered without an explicit title.
  `Professionals.jsx` and `Partners.jsx` both always pass their own explicit
  `title` prop, so this component is used unchanged and out of scope on those
  pages — confirmed neither file was touched.
- No contact information was changed: `Subba.reddy@villagevetindia.com`,
  `+914035940968` / `040-3594 0968`, `www.villagevetindia.com`,
  `VITE_WHATSAPP_NUMBER`, and `VITE_CONTACT_FORM_ENDPOINT` are byte-identical
  to before. No company information was invented.

### Keys added this stage
34 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 170 entries, covering
every item listed above. Reused `'Contact VillageVet'` and `'Contact Us'`
rather than re-adding them. Verified via a Node ESM parse of all 6 dictionary
files (all now carry 222 `ui` entries apiece, in sync) and a cross-check that
every `translate('...')` call in both rewritten files — plus each literal
string in the `enquiryTypes` array — resolves to a real key in all 5
non-English dictionaries. Zero silent English fallbacks.

### Files changed this stage
- `src/pages/Contact.jsx`
- `src/components/ContactForm.jsx`
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (34 new `ui` entries appended to each)
- `src/i18n/en.js` untouched (no `ui` table needed — `translate()` falls back
  to the source string when `lang === 'en'`).

Nothing in `AIAssistantCTA.jsx`, `server/ai-server.mjs`, `Navbar.jsx`,
`Hero.jsx`, the Brown/Gold theme/CSS, `LanguageContext.jsx`, or the overall
page layout was touched.

## Stage 6A.1 — Final multilingual cleanup (DONE)
- Removed the `MutationObserver` / DOM-text-walking translation mechanism from
  `src/i18n/LanguageContext.jsx`. Translation is now purely explicit: components
  call `translate(englishString)` or read from `t`, sourced from the per-language
  dictionaries in `src/i18n/*.js`. This is the single source of truth — no DOM
  mutation anywhere.
- Hero (`src/components/Hero.jsx`): every hardcoded English string (stat labels,
  "Our retail vision", "One veterinary shop in every mandal", bottom strip)
  now reads from `t.home.*`.
- Fixed the "Telugu heading + English description" bug at its root: added a
  `cards.services` / `cards.products` dictionary (keyed by slug) to all 6
  language files with real title+description translations. `ServiceCard.jsx`
  and `ProductCategoryCard.jsx` look these up by slug.
- Mobile nav: added `.mobile-nav-link` (44px touch target, controlled
  line-height) and hardened `.language-select-mobile` (removes native select
  chrome, adds a custom chevron, matches the brand pill style).
- Fixed a pre-existing bug: homepage `ServiceCard` wasn't receiving a `slug`
  prop, so its icon never rendered.
- Confirmed byte-for-byte that `AIAssistantCTA.jsx`, `server/ai-server.mjs`,
  and `renderMarkdown.jsx` were not touched.

## Stage 6B — Complete translation audit (DONE for the pages below)
- Audited `src/pages/ServiceCategory.jsx` in full depth: all 41 service
  sub-item names/descriptions and the "animals" field across the 8 service
  categories now have real translations in the `ui` dictionary (not
  placeholder/machine text), wired via `translate()`.
- Footer labels, breadcrumbs, "Explore", "Suitable for", etc. wired via
  `translate()`.

## Stage 4C-1 — Farmer Awareness page (DONE, this session)
- `src/pages/FarmerAwareness.jsx`: heading, intro, "Featured Article",
  "Read Article", category filter buttons (all 6 categories), search
  placeholder + aria-label, "No articles match your search yet.", and the
  educational-content disclaimer are all localized via `translate()`.
- Added a `t.articles` namespace (keyed by article slug, `{title, excerpt}`)
  to all 6 language files (`en`, `te`, `hi`, `ta`, `kn`, `ml`) so article
  cards show a translated title AND excerpt together — fixes the same
  "translated heading + English body" pattern for this page.
- Also updated `src/pages/ArticleDetail.jsx` (the linked article page) to use
  the same `t.articles` lookup, so title/excerpt stay consistent between the
  listing and the detail page. Long-form article body paragraphs (the two
  fixed paragraphs shown under every article) are translated; the underlying
  `articles.js` data objects themselves were not modified.
- Nothing in `src/components/AIAssistantCTA.jsx`, `server/ai-server.mjs`, the
  navbar, hero, or theme/CSS was touched in this stage.

## Stage 4C-2 — Awareness articles/card data (DONE, this session)
- Audited the source of article titles/summaries/categories/labels/"Read
  More" text: `src/data/articles.js` (source data, untouched — still
  English, as intended) plus the `t.articles` i18n namespace added in
  4C-1, which already covered title+excerpt for all 6 articles across all
  6 languages.
- Found and fixed one remaining leak: the **Home.jsx** "Farmer Awareness"
  preview section (the featured-article card shown on the homepage) was
  still reading `featured.title` / `featured.excerpt` directly from the
  English data file, and had a hardcoded "Read article →" label — the
  exact "translated heading + English description" bug pattern, just on a
  different page than the one already fixed. Wired it to the same
  `t.articles` lookup used by `FarmerAwareness.jsx` / `ArticleDetail.jsx`,
  and localized "Read article →" and the section's intro copy.
- Confirmed via automated cross-check that every `translate('...')` call
  across the entire `src/pages` + `src/components` tree resolves to a real
  key in all 5 non-English dictionaries — one exception found and reported
  below (not fixed, out of this stage's scope).

### Keys added this stage
2 new `ui` keys × 5 languages = 10 entries: `"Read article →"` and the
Farmer Awareness intro paragraph used on the homepage
("Practical, general-awareness content on disease prevention...").
No changes to `data/articles.js` or the `articles` i18n namespace were
needed — 4C-1 already covered every article's title/excerpt.

### Known pre-existing gap found (NOT fixed — out of 4C-2's "ONLY" scope)
`src/pages/NotFound.jsx` calls `translate("We couldn't find that page")`
and `translate('The page you\u2019re looking for may have moved...')`
(added before 4C-1), but the corresponding `ui` dictionary entries were
never added in `te/hi/ta/kn/ml`. This doesn't break anything —
`translate()` falls back to English — but the 404 page's heading/copy
currently displays in English regardless of selected language. Flagging
for a future stage since NotFound.jsx isn't "Farmer Awareness" or a
directly related component.

## Stage 4C-3 — Awareness article detail route (DONE, this session)
Scope: `/farmer-awareness/:slug` (`src/pages/ArticleDetail.jsx`) only.
- Title, category, summary, article body paragraphs, "Related Reading"
  label, breadcrumb, and the disclaimer were already localized from 4C-1 —
  confirmed still correct.
- Fixed the two remaining "visible metadata" gaps still in raw English
  regardless of selected language:
  - The `<SEO>` call (browser tab title + `<meta description>` +
    `og:title`/`og:description`/`twitter:*`) was passing raw
    `article.title` / `article.excerpt` — now passes the translated
    `title` / `excerpt` from `t.articles`.
  - The JSON-LD `<script type="application/ld+json">` block's `headline`
    and `articleSection` were also raw English — now use the same
    translated `title` and translated `category`.
- No medical claims were invented or altered — the two body paragraphs are
  unchanged generic disclaimers already translated in 4C-1; `articles.js`
  data itself was not touched.
- Routes `/farmer-awareness` and `/farmer-awareness/:slug` confirmed
  unchanged — `src/App.jsx` byte-diffed against the original upload:
  identical.
- Files changed this stage: `src/pages/ArticleDetail.jsx` only. No new
  i18n dictionary keys needed — reused `t.articles` and existing
  `translate()` calls.

- `src/pages/About.jsx`, `Contact.jsx` + `ContactForm.jsx`, `Services.jsx`,
  `Products.jsx`, `FarmerSolutions.jsx` + `data/farmerSolutions.js`,
  `RetailNetwork.jsx`, `Professionals.jsx`, `Partners.jsx`, `Investors.jsx`,
  `NotFound.jsx` (partially done — see below), `Privacy.jsx`, `Terms.jsx`,
  `Disclaimer.jsx`.
- `src/pages/NotFound.jsx` was translated (404 heading/copy/button) in an
  earlier turn this session — confirm this survived if resuming from a
  packaged snapshot.
- `data/farmerSolutions.js` (5 livestock categories × title/summary/points)
  and `data/services.js` top-level descriptions are already covered via the
  `cards` namespace from Stage 6A.1; the sub-items were newly covered in
  Stage 6B above.

## Stage 4D-1 — About page (DONE, this session)
Scope: `src/pages/About.jsx` only (no directly-related About-only components existed
beyond the shared, unmodified `SEO`/`Reveal`/`SectionHeader`/`CTASection`).
- The entire page was hardcoded English: the hero eyebrow/title/description, all 8
  "sections" card title+body pairs (Who We Are, Why VillageVet Was Created,
  Challenges Facing Farming Communities, Our Vision, Our Mission, Our Farmer-First
  Approach, Our Ecosystem, Our Long-Term Retail Vision), the closing `<CTASection>`
  eyebrow/title/description/button labels, and the `<SEO>` title/description — none
  of it went through `useLanguage()`/`translate()`.
- Wired every visible string through `translate()` from the existing
  `src/i18n/LanguageContext.jsx`, following the same pattern already used in
  `Home.jsx`. No new translation mechanism was introduced.
- Reused the existing `'Contact VillageVet'` key (already present in all 6
  dictionaries) for the CTA's secondary button instead of adding a duplicate.
- Because every section title and body is looked up via `translate(s.title)` /
  `translate(s.body)` from a single English source array, there is no possibility
  of a translated heading pairing with an English body — the bug pattern flagged
  in earlier stages doesn't apply here since About was never partially wired.
- No company claims, medical claims, statistics, or certifications were added —
  translations are faithful renderings of the existing English copy only.

### Keys added this stage
24 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 120 entries: the About
hero eyebrow/title/description, the 8 section titles, the 8 section bodies, the
CTA eyebrow/title/description/primary-button label, and the SEO meta description.
(`'Contact VillageVet'` was reused, not re-added.) Verified via a Node ESM parse
of all 6 dictionary files (all now carry 188 `ui` entries apiece, in sync) and a
cross-check that every `translate('...')` call and every `sections[].title`/
`.body` value in the rewritten `About.jsx` resolves to a real key in all 5
non-English dictionaries — zero silent English fallbacks.

### Files changed this stage
- `src/pages/About.jsx` (added `useLanguage` import + wrapped every visible
  string in `translate()`)
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (24 new `ui` entries appended to each)
- `src/i18n/en.js` untouched — English needs no `ui` entries; `translate()`
  falls back to the source string for `lang === 'en'`.

Nothing in `AIAssistantCTA.jsx`, `server/ai-server.mjs`, `Navbar.jsx`,
`Hero.jsx`, the Brown/Gold theme/CSS, or `LanguageContext.jsx` was touched.

## Known environment limitation (historical — see Stage 4D-6 above)
Earlier stages ran in a sandbox with **no network access**
(`registry.npmjs.org` returned `403 host_not_allowed`), so `npm install` /
`npm run build` could not be run there. All that work was verified
statically instead:
- Every `.js` i18n dictionary file was parsed with Node's ESM loader to
  confirm valid syntax and complete key coverage across all 6 languages.
- Every `translate('...')` call added to a `.jsx` file was cross-checked
  against all 6 dictionaries to confirm the key resolves (no silent
  English fallback due to a typo).
- JSX files were read in full after each edit to check brace/tag balance.
- `AIAssistantCTA.jsx`, `ai-server.mjs`, and `renderMarkdown.jsx` were
  diffed byte-for-byte against the original upload to confirm zero changes.

**You will need to run `npm install && npm run build` yourself** in an
environment with network access before shipping. Please report back any
actual build errors — none were detectable through static review, but a
real bundler run is the only way to be certain.

## Stage 4D-12 — Medical Disclaimer page (DONE, this session)
Scope: `src/pages/Disclaimer.jsx` only (no directly-related Disclaimer-only
components exist beyond the shared, unmodified `SEO`/`SectionHeader`).
- The page had exactly one heading and 4 body paragraphs — the eyebrow
  ("Legal"), h1 ("Medical Disclaimer"), and `<SEO>` title/description, plus
  the 4 disclaimer paragraphs (general-educational-purposes scope, no
  diagnose/treat/cure/prevent claim + "consult a qualified veterinarian",
  no-medical-efficacy-claims language, and the emergency-contact notice).
  All of it was 100% hardcoded English.
- The task brief additionally listed "planned-initiative wording",
  "intellectual-property wording", and a separate "update/change notice" —
  those sections exist on `Terms.jsx` (already localized in Stage 4D-11),
  not on `Disclaimer.jsx`. Nothing matching that description exists on this
  page, so nothing was invented to fill those categories; only the content
  actually present on the page was translated.
- Wired every visible string through the existing `translate()` helper from
  `src/i18n/LanguageContext.jsx`, the same pattern used by every other page
  in this log (About, Contact, Privacy, Terms, etc.). No new translation
  mechanism, no MutationObserver, no browser translation.
- Reused 2 existing exact-match keys, `'Medical Disclaimer'` (already present
  from the nav/footer) and `'Legal'` (already present from Privacy/Terms),
  instead of duplicating them.
- Added 5 new `ui` keys to `te`/`hi`/`ta`/`kn`/`ml` (25 entries total): the
  SEO meta description and the 4 disclaimer paragraphs. Every translation is
  a faithful, meaning-preserving rendering of the existing text — no medical
  claims, diagnoses, treatment advice, legal obligations, certifications, or
  regulatory statements were invented, added, or altered in any language.
  The "always consult a qualified veterinarian" and "contact a qualified
  veterinarian immediately" instructions are preserved verbatim in meaning
  in every language.

### Keys added this stage
5 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 25 entries. All 5
non-English dictionaries now carry 386 `ui` entries apiece, confirmed in
sync via a Node ESM parse (identical key counts across all 5 files, exactly
6 top-level keys in each — `ai`, `nav`, `home`, `cards`, `articles`, `ui`).

### Files changed this stage
- `src/pages/Disclaimer.jsx` (added `useLanguage` import + wrapped every
  visible string in `translate()`)
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (5 new `ui` entries appended to each)
- `src/i18n/en.js` untouched — English needs no `ui` entries; `translate()`
  falls back to the source string for `lang === 'en'`.

### Build note
This sandbox had **no npm registry access** this session (`npm install`
returned `403 Forbidden` on every package, e.g. `yallist`) — same
limitation as the 4D-11 session. `npm run build` was therefore not
actually run. Verified statically instead: (1) a Node ESM parse of all 6
i18n files — all load cleanly with exactly 6 top-level keys each; (2) a
cross-check script confirming every `translate()` call in the rewritten
`Disclaimer.jsx` resolves to a real key in all 5 non-English dictionaries,
zero silent English fallbacks; (3) a `ui`-entry-count check across all 5
dictionaries (386 each, confirming exactly 5 new keys landed with no
duplicates); (4) brace/paren balance on the rewritten JSX file (11/11
braces, 11/11 parens); (5) a full `diff -rq` against the original uploaded
project confirming the only files touched anywhere in the repo are
`Disclaimer.jsx` and the 5 non-English dictionaries. **Please run
`npm install && npm run build` yourself before shipping** and report back
any real errors.

## Still unresolved after this stage
None of the previously-flagged Disclaimer-page gaps remain. The only
still-open items from earlier stages are the ones already on record:
`NotFound.jsx`'s missing `ui` entries (flagged in the 4C-2 addendum,
out of scope for every stage since) and the second, incompatible
structured-key translation pattern used by `Home.jsx`/`Hero.jsx`/
`FarmerSolutions.jsx` (flagged in the 4D-11 HANDOFF — check which
pattern is in play before touching those files again).

## Stage 4D-13 — 404 Not Found page (DONE, this session)
Scope: `src/pages/NotFound.jsx` only (no directly-related 404-only
components existed beyond the shared, unmodified `SEO` component).
- The h1, explanation paragraph, and "Back to Home" link were already
  wrapped in `translate()` calls from an earlier stage (per the Stage
  4C-2 addendum), but 2 of the 3 keys — the h1 string and the
  explanation paragraph — had no matching `ui` entry in any of the 5
  non-English dictionaries, so `translate()` silently fell back to
  English for non-English users. `'Back to Home'` already resolved
  correctly. The `<SEO>` title/description were not wrapped in
  `translate()` at all going in — hardcoded English regardless of
  language.
- Wrapped the `<SEO>` title/description in `translate()`, reusing the
  existing `'Page Not Found'` key for the title (already present from
  Privacy/Terms) and adding one new key for the description (its
  wording — "The page you're looking for doesn't exist." — differs
  from the on-page paragraph, so it needed its own entry, not a reuse).
- Added the 2 missing `ui` entries for the h1 and paragraph strings.
  Reused `'Back to Home'` and `'Page Not Found'` rather than
  duplicating them.
- No new translation mechanism, no MutationObserver, no browser
  translation, and no company information was invented — every
  translation is a faithful rendering of the existing English copy.

### Keys added this stage
3 new `ui` keys × 5 languages (te, hi, ta, kn, ml) = 15 entries: "We
couldn't find that page," the explanation paragraph, and the SEO
description sentence. (`'Page Not Found'` and `'Back to Home'` were
reused, not re-added.) All 5 non-English dictionaries now carry 389
`ui` entries apiece, confirmed in sync via a Node ESM parse (identical
key counts across all 5 files, exactly 6 top-level keys in each —
`ai`, `nav`, `home`, `cards`, `articles`, `ui`).

Verified via (1) a Node ESM parse of all 6 i18n files — all load
cleanly; (2) a cross-check script confirming every `translate()` call
in the rewritten `NotFound.jsx` — including the two pre-existing calls
that were previously falling back to English — resolves to a real key
in all 5 non-English dictionaries, zero silent fallbacks; (3) a
`ui`-entry-count check across all 5 dictionaries (389 each, confirming
exactly 3 new keys with no duplicates); (4) brace/paren balance on the
rewritten JSX file (9/9 braces, 8/8 parens); (5) a full `diff -rq`
against the prior stage's delivered zip confirming the only files
touched anywhere in the repo are `NotFound.jsx` and the 5 non-English
dictionaries.

### Build note
Same environment limitation as Stages 4D-11 and 4D-12: this sandbox
had no npm registry access this session (`npm install` returned `403
Forbidden` on every package) — `npm run build` was therefore not
actually run. All verification was static (see above). **Please run
`npm install && npm run build` yourself before shipping** and report
back any real errors.

### Files changed this stage
- `src/pages/NotFound.jsx` (wrapped `<SEO>` title/description in
  `translate()`; the h1/paragraph/link were already wrapped, just
  missing dictionary entries)
- `src/i18n/te.js`, `src/i18n/hi.js`, `src/i18n/ta.js`, `src/i18n/kn.js`,
  `src/i18n/ml.js` (3 new `ui` entries appended to each)
- `src/i18n/en.js` untouched — English needs no `ui` entries.

Nothing in `AIAssistantCTA.jsx`, `server/ai-server.mjs`, `Navbar.jsx`,
`Hero.jsx`, the Brown/Gold theme/CSS, `LanguageContext.jsx`, or any
other page was touched — confirmed via `diff -rq` against the prior
stage's delivered zip.

## Still unresolved from earlier stages
None from the "missing `ui` entry" class of bug — the `NotFound.jsx`
gap flagged since Stage 4C-2 is now closed. The only remaining flagged
item is the second, incompatible structured-key translation pattern
used by `Home.jsx`/`Hero.jsx`/`FarmerSolutions.jsx` (see the
Stage 4D-11 HANDOFF note) — check which pattern is in play before
touching those files again.
