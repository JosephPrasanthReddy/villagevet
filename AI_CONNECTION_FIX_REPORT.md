# VillageVet AI Connection Fix

## Problem observed
The AI drawer opened correctly, but every message fell back to the generic connection error.

## Root cause
The previous `npm run dev` script started only Vite. The browser posts to `/api/chat`, which Vite proxies to `http://localhost:8787`, but the separate Node AI server was not automatically started. In addition, README instructions referred to `.env.example`, but that file was missing from the project.

## Fixes in this version
- `npm run dev` now starts both the Vite frontend and the AI backend together.
- Added `npm run web:dev` for frontend-only debugging.
- Kept `npm run ai:dev` for backend-only debugging.
- Added a dependency-free local `.env` loader to `server/ai-server.mjs`.
- Added `.env.example` with the required Gemini settings.
- Added `.gitignore` protection for `.env`, build output and dependencies.
- Updated README local setup instructions.
- Verified `/api/health` reports the correct configured/unconfigured state.
- Kept `gemini-3.6-flash`; it remains a valid stable Gemini model.

## Local setup
1. Copy `.env.example` to `.env`.
2. Replace the placeholder with a real Gemini API key.
3. Run `npm.cmd run dev`.
4. Visit `http://localhost:5173/api/health` and confirm `aiConfigured` is `true`.

Never put a Gemini key in a `VITE_...` variable or frontend source file.
