# VillageVet India — Corporate Website

A React + Vite corporate website for **VillageVet India Pvt. Ltd.** — "Veterinary care for
farming communities." The marketing frontend builds to static files. The **VillageVet AI**
chatbot uses the included Node.js Gemini proxy (`server/ai-server.mjs`), which must run on a
Node-capable host (or a separate backend service) when the AI assistant is enabled in production.

---

## 1. Technology Stack

- **React 18** + **React Router 6** (client-side routing)
- **Vite 5** (build tool / dev server)
- **Tailwind CSS 3** (styling, using the VillageVet design tokens below)
- Static marketing frontend output (`dist/`) after build; no application database.
- VillageVet AI backend: Node.js server-side Gemini proxy with streaming, image input, and API-key protection.
- Contact/enquiry forms are backend-agnostic: they currently show a working success state
  out of the box, and will POST as JSON to `VITE_CONTACT_FORM_ENDPOINT` once you set one
  (a GoDaddy email form, a PHP endpoint, or a third-party form service).

---

## 2. Sitemap

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About VillageVet |
| `/services` | Our Services |
| `/farmer-solutions` | Farmer Solutions (Cattle & Dairy, Buffalo, Goat, Sheep, Poultry) |
| `/retail-network` | VillageVet Retail Network ("One Veterinary Shop in Every Mandal") |
| `/products` | Products (category-level catalogue) |
| `/farmer-awareness` | Farmer Awareness (educational articles, with search + category filter) |
| `/farmer-awareness/:slug` | Individual article page |
| `/veterinary-professionals` | Veterinary Professionals |
| `/business-partners` | Business Partners |
| `/investors` | Investors / Business Opportunity |
| `/contact` | Contact Us |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/medical-disclaimer` | Medical Disclaimer |
| `*` | 404 Not Found |

---

## 3. Folder Structure

```
villagevet-website/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/            # add real photos/logo here
│   ├── components/        # Navbar, Footer, Hero, cards, ContactForm, etc.
│   ├── pages/              # one file per route
│   ├── data/                # services.js, farmerSolutions.js, products.js, articles.js
│   ├── i18n/                 # en.js, te.js, LanguageContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
└── README.md
```

---

## 4. Design System

**Color palette** (from the brief, applied as Tailwind tokens):

| Token | Hex | Use |
|---|---|---|
| `green` | `#168A45` | Primary CTAs, agriculture accents |
| `green-dark` | `#0B5D32` | Hover states, dark green accents |
| `green-light` | `#EEF8F1` | Section backgrounds |
| `blue` | `#155E9E` | Trust / veterinary accents |
| `blue-navy` | `#102A43` | Headings, dark sections, footer |
| `blue-light` | `#EFF6FB` | Section backgrounds |
| `gold` | `#D9A441` | Sparing accent (eyebrows on dark sections) |
| `cream` | `#FFFDF7` | Page background |

**Typography:** Headings in *Plus Jakarta Sans* (falls back to Manrope), body in *Inter* —
loaded via Google Fonts in `index.html`.

**Signature visual:** Rather than stock photography (which the brief asked to avoid, and
which this environment couldn't safely source without risking broken or non-authentic
images), the hero and retail-network sections use two **original SVG illustrations**
(`HeroIllustration.jsx`, `StoreIllustration.jsx`) built around the brief's own motifs — a
village/field skyline with a veterinary cross mark, and a modern store-concept cutaway.
Swap these for real photography whenever you have authentic, licensed images — see §9.

---

## 5. Logo

The brief specifies an existing VillageVet logo will be supplied separately. A placeholder
mark is used for now in `src/components/Logo.jsx`. To use your real logo:

1. Add the logo file to `src/assets/` (SVG preferred; PNG works too).
2. In `Logo.jsx`, replace the inline `<svg>` mark with an `<img src={logo} ... />` (import
   the asset at the top of the file).
3. For the favicon, export a simplified square version of the mark and replace
   `public/favicon.svg`.

---

## 6. Language Switching (EN | తెలుగు)

- `src/i18n/en.js` and `src/i18n/te.js` hold translation strings, keyed the same way.
- `LanguageContext.jsx` provides `t`, `lang`, and `setLang()` app-wide, and **falls back to
  English** for any key not yet translated — so a partial translation file never breaks
  the UI.
- The current Telugu file covers navigation and homepage section titles, as scoped in the
  brief. To add more languages later (Hindi, Tamil, Kannada, Malayalam, Marathi):
  1. Create `src/i18n/hi.js` (etc.) following the same key structure as `en.js`.
  2. Add it to the `dictionaries` map in `LanguageContext.jsx`.
  3. Extend the language switcher in `Navbar.jsx` / `Footer.jsx` from a two-way toggle to
     a small dropdown once there are more than two languages.

---


## VillageVet AI Assistant

Local development starts both Vite and the AI server with one command:

```powershell
npm.cmd run dev
```

Copy `.env.example` to `.env` and set `GEMINI_API_KEY`. The chatbot supports streamed multilingual replies, animal-photo input for visual awareness guidance, voice input, and browser-based Read Aloud. The Gemini key stays server-side.

For production, **do not place `GEMINI_API_KEY` in Vite/frontend variables**. If the website is deployed to static-only shared hosting, deploy `server/ai-server.mjs` separately on a Node-capable service and point the frontend API endpoint/proxy to it.

## 7. Contact & Enquiry Forms

`ContactForm.jsx` is a single reusable component used on the Contact, Veterinary
Professionals and Business Partners pages (with a different default "Enquiry Type" on
each). It includes client-side validation and loading/success/error states.

**Before going live**, set `VITE_CONTACT_FORM_ENDPOINT` in `.env` to a real backend. Since
GoDaddy shared hosting has no Node server, pick one of:

- **A lightweight PHP mail script** uploaded alongside the static site (GoDaddy shared
  hosting supports PHP) — the simplest option if you're already on GoDaddy hosting.
- **A form-as-a-service** provider (e.g. Formspree, Web3Forms, Getform) — no backend code
  to maintain, just an endpoint URL.
- **GoDaddy's own email/contact-form tooling**, if your hosting plan includes it.

Until then, the form works fully in the browser and shows a success message locally — it
just won't deliver anywhere, so don't launch to real farmers/partners before wiring this up.

---

## 8. WhatsApp & Social Links

- Floating WhatsApp button (`WhatsAppButton.jsx`) only renders once
  `VITE_WHATSAPP_NUMBER` is set in `.env` (international format, digits only, e.g.
  `919876543210`). No number is hard-coded.
- Footer social icons (Instagram/Facebook/LinkedIn/YouTube) read from
  `VITE_SOCIAL_INSTAGRAM` etc. — left blank until real profile URLs exist, per the brief's
  instruction not to invent them.

---

## 9. Replacing Placeholder Imagery

To keep the illustrations honest and avoid broken or non-authentic stock photography, no
external image URLs are hard-coded anywhere in this build. When you have real, licensed
photography of your farms, outlets, or team:

1. Add images to `src/assets/images/`.
2. Import and drop them into the relevant section (Hero, Retail Network, About) alongside
   or in place of the SVG illustrations.
3. Always include descriptive `alt` text for accessibility and SEO.

---

## 10. SEO

- Per-page `<title>`, meta description, canonical URL, and Open Graph/Twitter tags are set
  by the `SEO.jsx` component on every page.
- `Organization` schema is in `index.html`; `Article` schema is injected per article in
  `ArticleDetail.jsx`.
- `public/robots.txt` and `public/sitemap.xml` are included — update `sitemap.xml` whenever
  you add new Farmer Awareness articles or pages.
- No fake reviews, ratings, addresses, or business hours are included anywhere, per the
  brief — add a `LocalBusiness` schema block only once you have confirmed outlet addresses
  and hours to publish.

---

## 11. How to Add New Farmer Awareness Articles

Articles are listed in `src/data/articles.js`. To add one:

1. Add a new entry to the `articles` array with a unique `slug`, `title`, `category`
   (must match or extend `articleCategories`), and `excerpt`.
2. The article automatically appears in the `/farmer-awareness` listing, search, and
   category filter, and becomes reachable at `/farmer-awareness/<slug>`.
3. `ArticleDetail.jsx` currently renders a general body template plus the required medical
   disclaimer. For fully custom body content per article, extend the data object with a
   `body` field (array of paragraphs) and render it in `ArticleDetail.jsx` in place of the
   generic paragraphs.

## 12. How to Add Products Later

Category-level entries live in `src/data/products.js`. Add a new object with `slug`,
`title`, and `description` to extend the catalogue — no specific product names or brands
should be added unless confirmed, per the brief.

---

## 13. GoDaddy Hosting & Deployment (2026)

This site builds to plain static files (HTML/CSS/JS), so it works on GoDaddy's standard
**Web Hosting (shared hosting)** plans — no VPS or WordPress hosting is required. GoDaddy's
shared hosting includes cPanel-style file management (or their File Manager), free SSL,
and PHP support if you later want a PHP contact-form endpoint.

> GoDaddy's exact plan names and panel UI change periodically. Before purchasing or
> renewing, check GoDaddy's current Web Hosting plan page and confirm: (a) SSD storage and
> bandwidth suit a marketing site with images, (b) a free SSL certificate is included, and
> (c) PHP is available if you plan to use a PHP contact-form script.

### Recommended plan
**GoDaddy's entry-level "Web Hosting" (shared hosting) plan** is sufficient — this is a
static marketing site with no database and no server-side rendering. Avoid WordPress
Hosting (built for WordPress specifically) and VPS (unnecessary cost/complexity for a
static site).

### Build steps

```bash
npm install
npm run build
```

This produces a `dist/` folder containing the complete static site.

### Uploading to GoDaddy

1. Log in to your GoDaddy account → **My Products** → select your hosting plan → **Manage**.
2. Open **File Manager** (or connect via FTP/SFTP using the credentials in your hosting
   dashboard).
3. Navigate to the web root — typically `public_html/`.
4. Upload the **contents** of `dist/` (not the `dist` folder itself) into `public_html/`,
   so `index.html` sits directly at the root.
5. Because this is a single-page app with client-side routing, add a fallback so refreshing
   a deep link (e.g. `/about`) doesn't 404. If your hosting is Apache-based (most GoDaddy
   shared hosting is), add a `.htaccess` file in `public_html/`:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Connecting the domain (www.villagevetindia.com)

1. If the domain is already registered with GoDaddy and hosting is also with GoDaddy, the
   DNS is usually linked automatically when you attach hosting to the domain in the
   GoDaddy dashboard (**Domains → DNS → manage**).
2. If registered elsewhere, point the domain's DNS to GoDaddy's hosting nameservers or add
   an **A record** pointing `@` to your hosting account's IP address (shown in your hosting
   dashboard), plus a **CNAME** for `www` pointing to `@` (or to the hostname GoDaddy
   provides).
3. Set up the canonical/redirect strategy for the bare domain vs `www`:
   - Decide on `https://www.villagevetindia.com` as canonical (already reflected in this
     site's `<link rel="canonical">` tags).
   - In GoDaddy's **Domain Forwarding** or via `.htaccess`, redirect
     `villagevetindia.com` → `https://www.villagevetindia.com` (permanent/301).

### SSL

GoDaddy shared hosting plans generally include a free SSL certificate (or make one easy to
add via the hosting dashboard's SSL section) — enable it there. Once active, force
HTTPS by adding this to the same `.htaccess`:

```apache
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Business email

Set up `Subba.reddy@villagevetindia.com` (and any other addresses) through GoDaddy's
**Business Email** / Microsoft 365 offering under your domain, from the GoDaddy dashboard's
Email section — this is independent of the website hosting. Never place email passwords or
SMTP credentials in the website source code; if you later add server-side form emailing,
store credentials as environment variables on the server/script only, never in the React
frontend.

### Backups

- Keep the project source (this codebase) in a private Git repository — that is your
  primary backup and the source of truth for rebuilding `dist/`.
- Periodically download a copy of the live `public_html/` contents via File Manager/FTP,
  or use GoDaddy's built-in backup tool if your plan includes one.

### Future updates

1. Make changes in the source code (`src/`).
2. Run `npm run build` again.
3. Re-upload the new contents of `dist/` to `public_html/`, overwriting the old files.

### Rollback

Keep the previous `dist/` build (or a tagged Git commit) before each deploy. If something
goes wrong after uploading, re-upload the last known-good `dist/` contents to restore the
site immediately, then fix and redeploy.

---

## 14. Configuration Values You Still Need to Provide

- [ ] Real VillageVet logo file (see §5)
- [ ] `VITE_WHATSAPP_NUMBER` — business WhatsApp number
- [ ] `VITE_CONTACT_FORM_ENDPOINT` — once a form backend (PHP/form service) is set up
- [ ] `VITE_SOCIAL_INSTAGRAM` / `_FACEBOOK` / `_LINKEDIN` / `_YOUTUBE` — once accounts exist
- [ ] Real photography (optional — illustrations work as a placeholder-free default)
- [ ] Confirmed outlet addresses/hours, if you later want to add `LocalBusiness` schema

---

## 15. Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

## VillageVet AI assistant

The website now includes a real chat UI for **Ask VillageVet AI**. The browser sends chat messages to `/api/chat`; the included Node server securely calls Gemini without exposing the API key to the Vite bundle. The assistant is configured for VillageVet company information and general animal-health awareness, with safeguards against diagnosis and prescribing.

### Local setup

1. Copy `.env.example` to `.env`.
2. Add a Gemini API key to `GEMINI_API_KEY` (server-only; never use a `VITE_` prefix).
3. Start the complete local app with one command:

```bash
npm run dev
```

`npm run dev` now starts both Vite and the VillageVet AI server. The Vite proxy forwards `/api/*` to the AI server on port 8787. You can still run them separately for debugging with `npm run web:dev` and `npm run ai:dev`.

To verify the backend is alive, open `http://localhost:5173/api/health`. It should return JSON with `"ok": true` and `"aiConfigured": true`.

Google's current Gemini documentation recommends the Interactions API for new projects, while `generateContent` remains supported. This implementation uses the supported `generateContent` REST endpoint to keep the project dependency-free; the server can be migrated later if desired.

### Production

The AI API key must live on a server/runtime, not in the React frontend. Configure `GEMINI_API_KEY` as a server-side environment variable and expose the backend as `VITE_AI_CHAT_ENDPOINT` (or keep `/api/chat` when the website and API share the same origin). If the selected GoDaddy hosting plan only serves static files, host this small Node API separately and point `VITE_AI_CHAT_ENDPOINT` at it.
