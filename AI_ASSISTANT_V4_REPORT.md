# VillageVet AI Assistant V4 — Complete Replies + Photo Analysis + Read Aloud

## What changed

### 1. Incomplete-answer fix
- Increased Gemini output allowance from 800 to 1800 tokens.
- Uses Gemini 3.6 Flash `thinkingLevel: low` for this farmer-help chat workload.
- Removed the custom low temperature override and lets Gemini 3.x use its model default.
- Strengthened the system instruction so the visible answer must finish all sentences/bullets before the hidden follow-up suggestions block begins.
- Reworked the Gemini SSE parser to flush the final trailing event even when the upstream connection ends without a final blank line.
- Tracks Gemini `finishReason`.
- If a streamed answer still looks incomplete (missing closing suggestions block, unfinished sentence, or `MAX_TOKENS`), the server retries once with non-streaming generation and sends a `replace` event to the UI.

### 2. Animal-photo input and analysis
- Added an image button beside the message box.
- Supports JPG, PNG and WebP selections.
- Client resizes images to a maximum 1600 px dimension and converts/compresses them to JPEG before upload.
- Original file selection is limited to 10 MB; server accepts up to 4 MB of decoded compressed image data.
- Selected photo is previewed before sending and inside the user's chat message.
- The same `gemini-3.6-flash` request receives text + inline image data for multimodal understanding.
- Image safety prompt prevents photo-only diagnosis and instructs the model to discuss only visible signs, image quality, urgent visual warning signs, and what a veterinarian should confirm.
- Regenerate reuses the attached image for that user turn.

### 3. Read Aloud
- Added a **Read aloud** action to completed AI replies.
- Clicking it again stops reading.
- Added an **Auto voice** toggle in the chatbot header. It starts **ON** by default, so new completed replies are spoken automatically; the user can turn it off at any time.
- Uses the browser's Web Speech `speechSynthesis` API, so no extra API key or paid TTS service is needed.
- Attempts to choose a browser/system voice matching the active VillageVet language (`en-IN`, `te-IN`, `hi-IN`, `ta-IN`, `kn-IN`, `ml-IN`).
- Markdown is stripped before speech so headings, asterisks and link syntax are not read aloud.
- Speech is stopped when a new question starts, the chat resets, or the panel closes.

## Multilingual UI
The new photo and speech controls include labels/messages for:
- English
- Telugu
- Hindi
- Tamil
- Kannada
- Malayalam

## Local setup
No new environment variable is required. Keep the existing `.env`:

```env
GEMINI_API_KEY=YOUR_REAL_KEY
GEMINI_MODEL=gemini-3.6-flash
AI_PORT=8787
```

Then run:

```powershell
npm.cmd install
npm.cmd run dev
```

Health check:

```text
http://localhost:5173/api/health
```

Expected fields include:

```json
{
  "ok": true,
  "aiConfigured": true,
  "model": "gemini-3.6-flash",
  "streaming": true,
  "imageInput": true
}
```

## QA performed in the ChatGPT work environment
- `node --check server/ai-server.mjs` — passed.
- `AIAssistantCTA.jsx` parsed successfully with TypeScript's JSX parser (`tsc --allowJs --jsx preserve --noEmit --noResolve`).
- AI server startup smoke test on a temporary port — passed.
- `/api/health` smoke test — passed and reports `imageInput: true`.
- Invalid image MIME test — returns HTTP 400 rather than crashing.
- No API key is included in this archive.

## Notes
- Actual Gemini calls cannot be executed in the ChatGPT container because external runtime network access is restricted. The API integration uses the same server-side Gemini key path that was already working on the user's computer.
- Read Aloud voice quality/availability depends on voices installed by the browser/operating system. If a matching Indian-language voice is not installed, the browser may fall back to another voice.
