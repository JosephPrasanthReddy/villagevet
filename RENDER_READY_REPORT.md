# VillageVet V4 — Render-ready changes

- Added `npm start` production command.
- Node server now prefers Render's `PORT` variable.
- Node binds to `0.0.0.0` by default.
- Same Node process serves the built Vite frontend and Gemini API routes.
- Added React Router SPA fallback for direct/deep URLs.
- Added immutable caching for hashed Vite assets and no-cache for HTML/non-hashed resources.
- Gemini key remains server-side only.
- Added `render.yaml` Blueprint configuration.
- Added `RENDER_DEPLOY_GUIDE.md`.
