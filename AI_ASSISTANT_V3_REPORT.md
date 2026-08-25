# VillageVet AI Assistant V3

## What changed

- Fixed raw Markdown flashing during streamed responses by hiding unmatched streaming markers until their closing token arrives.
- Added Unicode bullet support so Gemini output such as `• **Label:** text` renders as a real list item.
- Updated Gemini's response-format instruction to use level-3 Markdown headings and standard hyphen bullets.
- Shortened the default substantive response target to roughly 90–220 words.
- Added a visible stop-generation control; cancelling the UI also aborts the upstream Gemini stream when the HTTP connection closes.
- Added Copy and Regenerate controls to the latest completed assistant answer.
- Regenerate reuses the original user question without duplicating it in the conversation.
- Added localized labels for Stop, Copy, Copied and Regenerate in English, Telugu, Hindi, Tamil, Kannada and Malayalam.
- Improved context-specific follow-up prompting so the three suggestions focus on the current animal/problem and missing information.
- Added a slimmer branded chat scrollbar and overscroll containment.
- Increased desktop chat width slightly and made the assistant full-screen on phones for a cleaner mobile experience.
- Preserved the existing voice input, language-aware replies, Gemini connection, veterinary safety constraints and dynamic website features.

## Verification

- `node --check server/ai-server.mjs`: passed.
- `node --check server/dev.mjs`: passed.
- TypeScript parser check across all 55 JS/JSX files: passed.
- AI server startup smoke test: passed.
- Production `vite build` was not run in this environment because project npm dependencies are not available locally and registry access is restricted.

## Secrets

No `.env` file or Gemini API key is included in this archive. Copy the working `.env` from the previous project into `chatbot-polish/.env` before starting the app.
