# VillageVet Dynamic Experience Update

This pass makes the site feel more responsive and alive while preserving its existing visual identity, multilingual content and Gemini AI integration.

## Added
- Scroll-progress indicator integrated into the top of the sticky header.
- Header gently compacts after the user begins scrolling.
- Page-entry transitions when navigating between routes.
- Animated hero statistics triggered only when they enter the viewport.
- Pointer-responsive depth/parallax on the hero farm illustration for mouse/trackpad users.
- Organic breathing motion on the hero background shape.
- Responsive hero floating cards and subtle icon pulse.
- Richer interactive states on existing cards without changing their content.
- Farmer Awareness preview now rotates through existing articles with manual previous/next controls and pauses while the user interacts with it.
- Motion and depth on the retail-network illustration.
- Interactive movement on partnership checklist rows.
- Soft moving highlight through the hero ecosystem strip.

## Accessibility / performance
- No animation library or new runtime dependency was added.
- `prefers-reduced-motion` is respected.
- Pointer parallax is disabled on coarse/touch pointers.
- Scroll progress is requestAnimationFrame-throttled.
- The existing language system and Gemini backend were not changed.
