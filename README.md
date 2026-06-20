# Tursunboev Muhammad — Portfolio

A fast, fully-animated, multilingual personal portfolio for a Software Engineer &
Frontend Developer. Built with the Next.js App Router, GSAP motion, a dark-first
design system, deep SEO, and a Telegram-powered contact pipeline.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS · GSAP · next-intl ·
next-themes · Zod

---

## Highlights

- **Single-page experience** — hero, stats, about, skills, projects, experience
  timeline, and contact, all stitched together with smooth scroll reveals.
- **GSAP motion** — preloader, word-by-word headline reveals, scroll-triggered
  fades, count-up stats, floating tech chips, a magnetic CTA, and a custom cursor.
  All motion respects `prefers-reduced-motion`.
- **Trilingual** — Uzbek 🇺🇿 (default), Russian 🇷🇺, English 🇬🇧 via `next-intl`
  with locale-aware routing (`as-needed` prefix, so `/` is Uzbek, `/ru`, `/en`).
- **Dark-first theming** — ships in an elegant dark mode with an optional, animated
  light/dark toggle (`next-themes`).
- **Serious SEO** — per-locale metadata, canonical + `hreflang` alternates,
  Open Graph & Twitter cards, a **dynamically generated OG image** and favicon,
  JSON-LD (`Person` + `WebSite`), `sitemap.xml`, `robots.txt`, and a web manifest.
- **Working contact form** — client + server Zod validation, a honeypot, and
  delivery straight to your Telegram via the Bot API.
- **Printable resume** — a clean, print-optimized `/resume` page generated from the
  same data, in every language.
- **Quality gates** — strict TypeScript, ESLint, Prettier, Vitest, lint-staged +
  Husky, and a GitHub Actions CI workflow.

## Architecture

The codebase follows **Feature-Sliced Design (FSD)** — layers depend only on the
layers below them (`app → views → widgets → features → shared`):

```
src/
├── app/                 # Next.js App Router: routes, layout, SEO, API
│   ├── [locale]/        # localized layout, home page, resume page, not-found, OG image
│   ├── api/contact/     # Telegram delivery route handler
│   ├── icon.tsx         # generated favicon
│   ├── sitemap.ts · robots.ts · manifest.ts
│   ├── globals.css      # design tokens + base styles
│   └── providers.tsx    # theme provider
├── views/               # full-page compositions (HomeView)
├── widgets/             # self-contained sections (Hero, About, Skills, …)
├── features/            # interactive units (theme-toggle, language-switcher, contact-form)
├── shared/              # reusable foundation
│   ├── config/          # site.ts (identity) · data.ts (skills, projects, experience)
│   ├── lib/             # cn(), gsap setup, hooks
│   └── ui/              # design-system primitives (Button, Reveal, AnimatedText, …)
├── i18n/                # next-intl routing, navigation, request config
└── middleware.ts        # locale negotiation
messages/                # en.json · ru.json · uz.json (all UI copy)
```

## Getting started

**Prerequisites:** Node.js `>= 18.18` and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your env file
cp .env.example .env.local        # (Windows: copy .env.example .env.local)

# 3. Start the dev server
npm run dev                       # http://localhost:3000
```

### Environment variables

| Variable               | Required | Purpose                                                   |
| ---------------------- | -------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | prod     | Canonical URL for SEO, sitemap, and OG tags.              |
| `TELEGRAM_BOT_TOKEN`   | for form | Bot token from [@BotFather](https://t.me/BotFather).      |
| `TELEGRAM_CHAT_ID`     | for form | Your chat id (DM [@userinfobot](https://t.me/userinfobot)). |

The contact form returns `500 Server not configured` until the two Telegram
variables are set — everything else runs without them.

### Telegram contact setup

1. Open **@BotFather** → `/newbot` → copy the **token** into `TELEGRAM_BOT_TOKEN`.
2. Message your new bot once (so it can DM you), then open **@userinfobot** to get
   your numeric **chat id** → put it in `TELEGRAM_CHAT_ID`.
3. Restart the dev server. Submissions now arrive in your Telegram instantly.

## Scripts

| Command              | Description                                   |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Start the dev server.                         |
| `npm run build`      | Production build.                             |
| `npm run start`      | Serve the production build.                    |
| `npm run typecheck`  | TypeScript, no emit.                           |
| `npm run lint`       | ESLint (`lint:fix` to autofix).               |
| `npm run format`     | Prettier write (`format:check` to verify).    |
| `npm run test`       | Vitest (`test:watch` for watch mode).         |

## Customizing the content

- **Identity & links** (name, email, phone, socials, site URL) → `src/shared/config/site.ts`
- **Structured data** (skills, projects, experience, stats) → `src/shared/config/data.ts`
- **All visible text**, in three languages → `messages/{en,ru,uz}.json`
  (keep the keys identical across files)
- **Colors, radius, fonts** → CSS variables in `src/app/globals.css` and
  `tailwind.config.ts`

> Project case-study links are intentionally empty in `data.ts`. Add `live` /
> `source` URLs to any project and the buttons appear automatically.

## Deployment

Optimized for **Vercel**: import the repo, set the environment variables above,
and deploy. Any Node host that runs `next build` / `next start` works too.

## Notes

- `npm install` runs a Husky `prepare` step that warns `.git can't be found`
  until you run `git init`. It's harmless; Git hooks activate once the repo exists.

---

Designed & built with Next.js, GSAP and Tailwind CSS.
