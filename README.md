# Haveli Lahore: Angular concept site

An **unofficial concept redesign** for Haveli Restaurant on Food Street, Fort Road, Lahore, opposite the Badshahi Mosque. Built by [Sarah Rafi](https://sarah-rafi-portfolio.vercel.app) to show modern Angular.

> Not affiliated with Haveli Restaurant. Menu prices come from public listings (2026) and may be out of date. Official site: haveli.com.pk.

**Live:** https://haveli-lahore.vercel.app  ·  **Research and sources:** [RESEARCH.md](RESEARCH.md)

## Pages

- **`/`**: an arch-shaped "jharoka" window onto the Badshahi Mosque that opens to full screen as you scroll, letter-by-letter title, signature dishes, a rooftop section whose sky shifts from dusk to night, tips and a map.
- **`/menu`**: 93 dishes in 10 categories, with live search, a vegetarian toggle and sticky category tabs. The category lives in the URL (`/menu?category=karahi`).
- **`/reserve`**: a typed reactive form with custom validators (no past dates, opening hours only, Pakistani mobile numbers).

## Angular concepts used

| Concept | Where |
|---|---|
| Lazy-loaded standalone routes (`loadComponent`, default exports) | `src/app/app.routes.ts` |
| `withViewTransitions()`: animated page changes | `src/app/app.config.ts` |
| `withComponentInputBinding()`: query param becomes a signal `input()` | `app.config.ts`, `pages/menu.ts` |
| `signal` / `computed` filtering over a pure, tested function | `pages/menu.ts`, `data/menu.ts` |
| `animate.enter` / `animate.leave` | `pages/menu.ts`, `pages/reserve.ts` |
| Typed reactive forms (`NonNullableFormBuilder`) + custom validators | `pages/reserve.ts` |
| Zoneless + `OnPush` everywhere | default in Angular 22 |
| CSS scroll-driven animations (`animation-timeline`) | `pages/home.scss`, `styles.scss` |

## Run it

```bash
npm install
npm start        # http://localhost:4200
npm test         # Vitest: menu filter, data integrity, validators
npm run build
```

`vercel.json` rewrites deep links such as `/menu` to `index.html`, so the SPA router can handle them.

Photos are from Unsplash (Unsplash License), self-hosted as WebP in `public/img`.
