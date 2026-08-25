# VillageVet Dynamic V2

This pass upgrades the existing Dynamic V1 website with real farm photography and richer interaction while preserving the multilingual architecture and Gemini AI backend.

## What changed
- Replaced the illustrated homepage hero with a real-photo carousel.
- Added automatic hero rotation, manual previous/next controls, slide dots and a timed progress indicator.
- Added a subtle Ken Burns-style image movement and retained restrained pointer parallax around the hero frame.
- Replaced emoji/gradient Farmer Solution artwork with real photographs for Cattle & Dairy, Buffalo, Goat, Sheep and Poultry.
- Farmer Solution cards now have image zoom, subtle 3D pointer tilt, cursor-following light and stronger depth on hover.
- Farmer Solution imagery is reused on both the homepage preview and the full Farmer Solutions page.
- Replaced the hero livestock emoji row with real mini-photo portraits.
- Converted the hero ecosystem strip into a continuously moving ticker that pauses on hover.
- Kept existing animated counters, rotating Farmer Awareness spotlight, page-entry transitions, scroll-progress header and card interactions from Dynamic V1.

## Photography
The project uses remote Pexels CDN images. Source pages and photographers are recorded in `PHOTO_SOURCES.md`.
Pexels' license states that photos may be used and modified on websites and attribution is not required.

## Accessibility / performance
- `prefers-reduced-motion` disables the new movement effects.
- 3D pointer tilt is disabled on coarse/touch pointers.
- Hero rotation pauses during pointer/focus interaction.
- Images use lazy loading outside the first hero slide.
- No animation library or new runtime dependency was added.

## QA performed
- Parsed all 55 JS/JSX source files with TypeScript's JSX parser: no syntax errors.
- Verified the livestock category labels resolve in Telugu, Hindi, Tamil, Kannada and Malayalam.
- Verified there are no Claude or Anthropic references in live source/server/package configuration.
- Could not run a complete `npm install` / Vite production build in this sandbox because registry packages are not available in the local npm cache and outbound DNS is blocked. Run `npm.cmd install` and `npm.cmd run build` on the target Windows machine for final production compilation.
