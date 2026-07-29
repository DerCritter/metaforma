# ANTIGRAVITY-TASK.md
### Metaforma — blog automation. Paste into Antigravity, work the phases in order.

Repository: `github.com/DerCritter/metaforma`
Stack (already verified): React 19 + Vite 4 SPA, `react-router-dom`, deployed on
Vercel. Tailwind via CDN. Content in TypeScript, not MDX.

Do not skip ahead. Report after each phase and wait for approval.

Reference docs in this repo:
`blog-engine-spec.md`, `editorial-strategy.md`,
`agents/shared/brand-voice.md`, `anti-slop.md`, `quality-rubric.md`.

---

## Phase 0 — Security: get the API key out of the browser

**This is the highest priority task in this document. Nothing else ships first.**

### The problem

`vite.config.ts` contains:

```ts
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

`define` performs literal text substitution at build time. The Gemini API key
is written verbatim into the client bundle and shipped to every visitor.
`services/geminiService.ts` calls the Gemini API directly from the browser
using it, via the consultant chat in `components/Contact.tsx`.

### What to do

**The owner rotates the key. You do not touch keys.** Confirm with the owner
that the exposed key has been revoked in Google AI Studio and a new one issued
before you finish this phase.

Refactor:

1. Create a Vercel Serverless Function at `api/chat.ts`.
   - It reads the key from `process.env.GEMINI_API_KEY` **at runtime, on the
     server**. It is never bundled.
   - It accepts `{ prompt, history }`, calls the Gemini API with the existing
     system instruction from `services/geminiService.ts`, and returns the text.
   - Keep the current model unless it is deprecated; check the Gemini API docs
     for the current free-tier model identifiers rather than trusting the
     string already in the file.
2. Rewrite `services/geminiService.ts` to `fetch('/api/chat')`. Same exported
   signature so `Contact.tsx` needs no changes beyond what is unavoidable.
3. **Delete both `define` entries** from `vite.config.ts`.
4. Add basic abuse protection to `api/chat.ts`: cap request body length, cap
   history length, and rate-limit per IP. Without it the endpoint is a free
   Gemini proxy for anyone who finds it.
5. Set `GEMINI_API_KEY` in the Vercel project environment variables (server
   scope). The owner does this; you tell them exactly where.

### Verification, mandatory

Run `npm run build`, then grep the built output for the key prefix and for the
variable name:

```
grep -r "AIza" dist/ ; grep -r "GEMINI_API_KEY" dist/
```

Both must return nothing. Paste the command output into your report. Do not
report success without it.

---

## Phase 1 — Make the blog crawlable

### The problem

`vercel.json` rewrites every path to `/`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Every URL returns the same empty `index.html`. React renders the page in the
browser afterwards. `SEOHelmet` uses `react-helmet-async`, which injects meta
tags via JavaScript, so crawlers that do not execute JS see no title, no
description, and no article text. `scripts/generate-sitemap.js` is currently
advertising URLs that serve empty documents.

A fetch of the live site confirms this: it returns only the `<title>` tag.

### What to do

Add build-time prerendering for the blog routes. **Scope: `/blog`,
`/blog/:slug`, `/de/blog`, `/de/blog/:slug`. Prerendering the marketing pages
too is welcome if it is free, but it is not the objective and must not break
them.**

Approach: a post-build Node script that, for each route,
- renders the React tree with `renderToString` from `react-dom/server`,
  wrapped in `StaticRouter` at that path,
- collects head tags via `HelmetProvider`'s `helmetContext`,
- injects both into a copy of `index.html`,
- writes `dist/blog/<slug>.html` and `dist/de/blog/<slug>.html`.

Slugs come from `content/articles.ts` — import it in the script, do not
hardcode a list.

Watch for components that touch `window`, `document`, or `IntersectionObserver`
at module scope or during first render; those will crash SSR. Guard them, and
report which ones needed it.

Then fix `vercel.json` so static files win over the catch-all rewrite, keeping
SPA fallback for genuinely dynamic paths.

Also required:
- Extend `scripts/generate-sitemap.js` to emit every article URL in both
  languages, with `lastmod` from the article `date`.
- Reciprocal `hreflang` between each EN/DE pair, plus `x-default`.
- JSON-LD `Article` schema per post, rendered into the static HTML.
- `robots.txt` allowing crawl and pointing at the sitemap.

### Verification, mandatory

```
npm run build
curl -s file://$(pwd)/dist/blog/how-to-elevate-real-estate-assets.html | head -60
```

The article title, meta description, and body copy must be present in the raw
HTML. Paste the output. A response containing only the shell is a failure.

---

## Phase 2 — Content pipeline scaffolding

**Do not introduce MDX.** The site already has a working content system and the
pipeline writes into it.

Study `content/articles.ts` first: the `Article` interface, the `ArticleBlock`
union (`h2`, `h3`, `p`, `image`, `comparison`, `synthesis`,
`aerial-integration`, `callout`), and how `ArticleLayout.tsx` renders each block
type. Generated articles must be valid `Article` objects using only these block
types.

Create:

```
agents/                          # the six prompt files + shared/
content/_state/
  editorial-calendar.json        # queue of approved topics
  published-index.json           # history: slug, date, cluster, thesis, keywords
  keyword-map.json               # clusters from editorial-strategy.md
  run-log.json
content/_drafts/                 # approved Article objects, not yet published
assets/image-library.json        # inventory of usable renders
scripts/run-pipeline.ts
scripts/publish-next.ts
```

Seed `keyword-map.json` with the four clusters from `editorial-strategy.md`, in
that order. Cluster 3b starts `closed`.

Backfill `published-index.json` with the two existing articles so the Strategist
does not propose topics that repeat them.

Build `assets/image-library.json` from the images already referenced in
`content/articles.ts` and present in `public/`. For each: path, project, what it
technically demonstrates, and alt text in EN and DE. Where you cannot tell what
an image shows, list it and ask — do not invent.

---

## Phase 3 — Agents, one at a time

Implement the six agents per §4 of the spec plus `scripts/run-pipeline.ts`.

**Models: Flash and Flash-Lite only, per §4b. Never Pro — Pro left the free
tier on 1 April 2026.** Check current Gemini API docs for which identifiers
still carry a free tier; do not trust remembered model names.

Implement the four quality compensations from §4b: best-of-3 drafting, the
anti-slop self-critique pass, raised thresholds, three rounds per gate.

Build and verify in this order, stopping after each:

1. **Strategist** → 5 briefs. Stop.
2. **Researcher** → dossier for one approved brief. Stop.
3. **Writer EN** → three drafts plus self-critique. Output must be a valid
   `Article` object, not markdown. Stop.
4. **Reviewer** → run it against that draft **and** against a deliberately
   generic, slop-filled control article you write yourself. If the reviewer
   passes the control, the rubric is too loose: report it and stop. Do not tune
   the control to fail.
5. **Localizer DE** → fills the `de` key of the same `Article`. Stop.
6. **Publisher** → appends a complete article to `content/_drafts/`.

Read the key from `GEMINI_API_KEY`. Never commit it.

**Zero-cost guarantee:** the Google Cloud project behind the key must have
billing disabled. Handle HTTP 429 by opening a GitHub issue and exiting — never
by retrying in a loop.

---

## Phase 4 — Automation

Two GitHub Actions workflows:

- **Monday 06:00 UTC** — run the full pipeline, append approved articles to
  `content/_drafts/`.
- **Thursday 09:00 UTC** — `publish-next.ts`: move the oldest approved draft
  into `content/articles.ts`, regenerate the sitemap, commit, push. Vercel
  redeploys on push. **This job makes no API calls and cannot fail on quota.**

Ship both with `workflow_dispatch` only. **Leave the `schedule` triggers
commented out** until three approved drafts exist.

Failure behaviour is not optional: any rejection, any API failure, any three
consecutive `revise` verdicts opens a GitHub issue and exits without
publishing. Silence is the correct failure mode.

---

## Constraints throughout

- Do not restyle, refactor, or restructure the marketing site.
- No paid services. Everything runs on free tiers.
- Never commit secrets. Add `.env*` to `.gitignore` if missing.
- If anything here contradicts what you find in the repo, stop and ask.
