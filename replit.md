# ClaimValueCheck — DLG Legal Tools

Free, SEO- and AI-crawlable legal tools for Texas personal-injury victims, built
as a brand asset of **Dang Law Group (DLG)**. Two calculators help injury victims
answer the two biggest questions after an accident: *how long do I have to file?*
and *what could my claim be worth?* Utility-first → authority → lead.

Production domain: `claimvaluecheck.com`

## Run & Operate

- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` — production build + **static HTML export** to `out/`
- `npm run typecheck` — TypeScript check (no emit)
- Optional env: `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement id (GA loads only when set)

Deploy the contents of `out/` to any static host (Vercel, Netlify, Replit, S3/CDN).

## Stack

- **Next.js 15** (App Router) with `output: "export"` → every page is prerendered
  static HTML, so search engines and AI crawlers get full content with no JS.
- **React 19**, **TypeScript 5.9**, **Tailwind CSS v4**
- `next/font` (self-hosted Inter), `next/og` (build-time OG image)

## Where things live

- `lib/sol.ts` — Texas statute-of-limitations engine (**source of truth for SOL legal logic**)
- `lib/settlement.ts` — settlement multiplier + comparative-fault engine (**settlement logic**)
- `lib/seo.ts` — metadata + JSON-LD schema helpers (**SEO source of truth**)
- `lib/site.ts` — site/brand/tool config (URLs, DLG firm details, tool list)
- `app/statute-of-limitations-calculator/` — SOL tool page + client UI
- `app/settlement-calculator/` — settlement tool page + client UI
- `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt` — crawler files
- `components/` — Header, Footer, Disclaimer, CtaCard, Breadcrumbs, JsonLd

## Architecture decisions

- **Static export, not SSR.** These are stateless calculators; static HTML gives
  the best SEO/AI-crawl profile and can be hosted anywhere cheaply. Metadata
  routes (`robots`, `sitemap`, `opengraph-image`) use `export const dynamic =
  "force-static"` so they emit static files.
- **Calculations are hard-coded pure functions — no AI/heuristics.** Same inputs
  always produce the same legal result, which is verifiable and testable.
- **The tool refuses to answer when it shouldn't.** Government-entity claims
  return a `"government"` outcome (no date) because Tort Claims Act notice
  deadlines are far shorter than the 2-year suit limit — a plain number would be
  dangerously misleading.
- **Every result cites its statute** and is wrapped in a mandatory disclaimer
  ("explain the law, never advise"). The DLG CTA appears only *after* a result.
- **SEO/AI baked in:** per-page canonical + OG/Twitter meta, JSON-LD
  (LegalService, WebSite, WebApplication, FAQPage, BreadcrumbList), sitemap,
  robots that explicitly welcome AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, …), and an `llms.txt`.

## Product

Two MVP tools (per the project brief):
1. **Statute of Limitations Calculator** (live) — Texas filing-deadline estimator.
2. **Settlement Calculator** (live) — multiplier-method value range with Texas
   proportionate-responsibility (51% bar).

## Gotchas

- **Legal logic must be attorney-reviewed before launch.** `lib/sol.ts` and
  `lib/settlement.ts` encode general Texas rules synthesized for the MVP; verify
  statutes and edge cases with a licensed Texas attorney (brief Phase 1/2).
- Metadata routes need `dynamic = "force-static"` under `output: export`, or the
  build fails.
- Update `site.url`, `site.firm.phone`, and `site.firm.contactUrl` in
  `lib/site.ts`, plus the GSC verification token in `app/layout.tsx`, before launch.

## Testing

- `npm test` — runs the calculation-engine unit tests via Node's built-in test
  runner (no extra dependencies). Tests live next to the logic in
  `lib/sol.test.ts` and `lib/settlement.test.ts`.
- Coverage: 28 test cases / ~45 assertions — 2-year deadlines for every case
  type, minor tolling (incl. rescuing an otherwise-expired case), medical-
  malpractice-minor and wrongful-death special handling, government refusal,
  leap-day date math, invalid/future dates, urgency bands, settlement
  multipliers per severity, the Texas 50% vs 51% fault boundary, input
  clamping, and currency formatting.
- CI (`.github/workflows/ci.yml`) runs typecheck + tests + build on every push
  and PR, so a formula regression fails the build.
- The legal *rules* still require attorney sign-off before launch; the tests
  guarantee the code faithfully implements the rules as written, not that the
  rules themselves are the final word on Texas law.
