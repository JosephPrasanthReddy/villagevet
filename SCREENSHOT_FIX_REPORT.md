# VillageVet Screenshot Fix Report

This patch responds to the browser screenshots captured on 25 Aug 2026.

## Issues visible in the screenshots

1. The desktop header was wider than the viewport on the Home page in English, Malayalam and Tamil. The result was a horizontal page scrollbar, the logo moving off-screen when horizontally scrolled, and right-side actions such as the AI/contact button being clipped.
2. On the Telugu Services page, `Animal Feed` and `Poultry Feed` (and their descriptions) appeared in English while neighbouring service cards were translated.

## Fixes applied

- The desktop navbar now uses a wider, navbar-only 1600px shell rather than the site's 1280px content shell.
- Full desktop navigation now starts at the 2xl breakpoint; smaller screens use the existing menu.
- Non-English desktop navigation uses tighter spacing and the compact AI icon so long Indic-script labels cannot force the document wider.
- Added a horizontal-overflow safety rule (`overflow-x: clip`) on the document/root without creating a new scroll container.
- Service and product cards now use the single `translate()` path instead of reading nested card translations directly.
- `translate()` now also resolves structured service/product card translations, giving a deterministic fallback for all service and product titles/descriptions.
- Verified the structured translations resolve for Telugu, Hindi, Tamil, Kannada and Malayalam, including the two Telugu strings shown incorrectly in the screenshot.
- No Claude/Anthropic dependency was added; AI remains on the existing Gemini backend.

## Files changed

- `src/components/Navbar.jsx`
- `src/components/ServiceCard.jsx`
- `src/components/ProductCategoryCard.jsx`
- `src/i18n/LanguageContext.jsx`
- `src/index.css`

## Local retest

After replacing the project with this patch:

```powershell
npm.cmd install
npm.cmd run dev
```

Then hard-refresh the browser (`Ctrl+Shift+R`) and test English, Telugu, Tamil and Malayalam at the same window size as the screenshots.
