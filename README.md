# Soft Hours 柔時閑堂 — website concept

A single-page site for **Soft Hours | Tea House & Wine Bar**, 119 Hester St, New York.
"A scholar's retreat, lit by neon": Song dynasty restraint (rice paper, celadon, pine ink,
aged wood) with one soft neon accent.

Built with Next.js (App Router, static export), TypeScript, Tailwind CSS v4,
[Motion](https://motion.dev) (the current name of Framer Motion, imported from
`motion/react`), and `next/font`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site written to /out
npm run lint
npm run fonts      # rebuild the Chinese font subsets after changing Chinese text
```

## Editing content

**Everything a person reads lives in [`src/content/site.ts`](src/content/site.ts).**
Components never hard-code copy.

- Every string is a localized object `{ en: string; zh?: string }`. The site renders English
  and shows Chinese only for the name, tea names, and solar terms (always with
  `lang="zh-Hant"`). A full 中文 toggle later means filling in `zh` and passing `"zh"` to
  `t()` in [`src/lib/i18n.ts`](src/lib/i18n.ts).
- Search the file for `TODO` to find what still needs the owner's input:
  - **Hours:** only "closed Monday" and "opens 12 PM Tuesday" are confirmed. Fill in
    `open`/`close` ("HH:MM", 24-hour) for each day. The live status line only says
    "Open now" when both are known for today, so it never guesses.
  - **Teas:** three of the five teas are placeholders. Set `name`, `kind`, and `position`
    (0 = lightest/yin, 1 = fullest/yang). `notes` stay empty until the owner writes them.
  - **Confections:** descriptions and prices. Set `showPrices: true` to show prices.
  - **After hours:** evening hours and the wine list.
  - **Reservations:** set `reservationUrl` and a "Reserve a table" link appears in Visit.
  - **Google Maps link:** replace `googleMapsUrl` with the exact place link.
  - **Neon colour:** `--neon` in [`src/app/globals.css`](src/app/globals.css) is a guess;
    match it to Juno's pieces.
- `noindex: true` keeps search engines away while this is a pitch. Set it to `false` when
  the owner adopts the site.
- Reviews are real Google reviews quoted exactly. Don't edit, merge, or invent them.
- **Added or changed Chinese text (or pinyin)?** Run `npm run fonts`. The Chinese fonts are
  subsets holding only the characters the site uses; this script rescans `src/`, rebuilds
  the subsets in `src/fonts/`, and needs an internet connection. New characters show in a
  fallback font until you run it.

## Image slots

There are no photos in the repo (no rights to the Google Maps or Instagram images).
Every slot shows an illustrated fallback until a photo is added, so the site looks finished
with zero photos.

To add a photo:

1. Export it at roughly 2× the display size (sizes below), as a `.jpg`, ideally under 300 KB.
2. Save it as `public/images/<file>`.
3. In `site.ts`, set that slot's `available: true` and check its `alt` text.

| Slot | File | Aspect ratio | Suggested size | Fallback |
| --- | --- | --- | --- | --- |
| Hero (inside the flower window) | `hero.jpg` | 1:1 | 1200 × 1200 | ink-wash mountains (with parallax) |
| Space — wooden beams | `space-beams.jpg` | 4:5 | 1000 × 1250 | wood beams |
| Space — flower-window light (flower frame) | `space-window-light.jpg` | 1:1 | 1000 × 1000 | window light on a wall |
| Space — neon sculpture | `space-neon.jpg` | 3:4 | 900 × 1200 | neon line on ink |
| Space — tea service | `space-tea-service.jpg` | 4:3 | 1200 × 900 | tea bowls on wood |
| Space — iced tea, tiny straw | `space-iced-tea.jpg` | 4:5 | 900 × 1125 | glass with a tiny straw |

The Open Graph image is `public/og.png` (1200 × 630). Replace it with a photo-based card
once photos exist.

Because the site is a static export, Next's image optimizer is off (`images.unoptimized`),
so pre-size photos as above.

## How the solar-term widget works

[`src/lib/solarTerms.ts`](src/lib/solarTerms.ts) holds the 24 solar terms (二十四節氣) with
Chinese name, pinyin, English name, an approximate Gregorian start date, and a one-line
description.

1. The browser takes today's date **in America/New_York** (`src/lib/time.ts`, via `Intl`).
2. It finds the latest term whose start date is on or before today. Between Jan 1 and
   小寒 (~Jan 5) it is still the previous year's 冬至.
3. Days until the next term are counted between calendar dates in UTC, so daylight saving
   can't shift the count.
4. **Light/yin vs warming/yang:** from 春分 (spring equinox) up to 秋分 (autumn equinox) the
   widget says light/yin; the rest of the year, warming/yang. The marker on the little bar
   follows the sun smoothly, lightest at the summer solstice and most warming at the winter
   solstice. This is framed as tradition, never as a health claim.

Terms really begin when the sun reaches each 15° of ecliptic longitude, which drifts by about
a day between years, so a date near a boundary can be off by ±1 day. For a menu that turns
every two weeks, that's fine. The HTML ships with the build-date term so the section is never
empty; it switches to today's term as soon as the page loads.

## Hosting

The site is fully static (`output: "export"` in `next.config.ts`).

### GitHub Pages (current)

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. It sets
`NEXT_PUBLIC_BASE_PATH=/<repo-name>` so assets resolve under the project sub-path, and
`NEXT_PUBLIC_SITE_URL` for canonical and Open Graph URLs.

### Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new). Vercel detects Next.js.
2. Leave `NEXT_PUBLIC_BASE_PATH` unset (the site lives at the domain root).
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL, e.g. `https://softhours.world`.
4. Deploy. Every push to `main` redeploys.

## Accessibility and motion

- All motion is slow (800–1600 ms, ease-out) and is switched off under
  `prefers-reduced-motion`: reveals render in place, the neon line is already drawn, the
  parallax stops, and the reviews don't auto-advance.
- The reviews crossfade can be paused, and each review can be chosen directly.
- Celadon is used for surfaces only; small text uses `--ink-soft` or `--wood-deep`,
  which pass WCAG AA on rice paper.
- Chinese fonts (Noto Serif TC, LXGW WenKai TC) are subset to the ~40 characters in use
  (about 20 KB each instead of megabytes) and use `font-display: swap`, so they never block
  first paint. Pinyin is set in Noto Serif TC because Cormorant has no tone-mark glyphs.

## Structure

```
src/
  app/            layout (fonts, metadata), page (sections + JSON-LD), OG image, global CSS
  content/site.ts all copy and settings
  lib/            solar terms, opening-hours status, time zone helper, i18n
  components/     nav, flower window, seals, illustrations, image slot, reveal
  sections/       one file per page section
```
