# VillageVet — Render Deployment Guide

This version is prepared as one **Render Web Service**.

## Architecture

- Render exposes one public HTTPS URL.
- Node listens on Render's `PORT` on `0.0.0.0`.
- The same process serves the built Vite/React app from `dist/`.
- `/api/health`, `/api/chat`, and `/api/chat/stream` remain server-side.
- `GEMINI_API_KEY` is never included in the browser bundle.
- React Router deep links fall back to `dist/index.html`.

## GitHub repository layout

Use the contents of this `chatbot-polish` folder as the repository root. The GitHub repository root should directly contain:

- `package.json`
- `render.yaml`
- `src/`
- `server/`
- `public/`

Do **not** upload `.env`. It is already ignored by `.gitignore`.

## Deploy with the included Render Blueprint

1. Push the project to a GitHub repository.
2. Sign in to Render.
3. Create a new Blueprint and connect that repository.
4. Render reads `render.yaml`.
5. When Render asks for `GEMINI_API_KEY`, paste the key privately there.
6. Deploy.

## Manual Web Service alternative

If you prefer not to use a Blueprint, create **New → Web Service** and use:

- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Health check path: `/api/health`
- Environment variable: `GEMINI_API_KEY` = your private Gemini API key
- Environment variable: `GEMINI_MODEL` = `gemini-3.6-flash`

Do not create a `PORT` value yourself. Render provides it.

## Verify after deploy

Open:

`https://YOUR-SERVICE.onrender.com/api/health`

You should see `ok: true` and `aiConfigured: true`.

Then test:

- `/`
- `/business-partners` directly in a new tab
- Text chat
- Photo upload and image analysis
- Microphone permission (now over HTTPS)
- Read aloud
- All six website languages

## Free service behavior

Render Free Web Services are intended for testing/hobby use. They can spin down after inactivity, so the first request after an idle period can take longer while the service wakes up.

## Gemini quota

Render hosting does not increase Gemini API quota. A Gemini `429 RESOURCE_EXHAUSTED` response means the Gemini project has hit an API quota/rate limit, independent of Render.
