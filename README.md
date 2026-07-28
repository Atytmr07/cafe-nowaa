# Cafe Nowaa

Production website for **Cafe Nowaa** — a coffee, breakfast, pizza and burger
bistro beside the Bostancı Marmaray station entrance in Istanbul.

## Design system — "Nowaa Monochrome Luxe"

The palette is taken directly from the real backlit roundel: a pure white NV
mark on deep black. No gold, no colour casts — pearl, platinum and silver are
the only accents.

| Token | Hex | Use |
|---|---|---|
| `obsidian` | `#0B0B0C` | Primary dark surface |
| `onyx` | `#131315` | Cards, elevated dark panels |
| `pearl` | `#F6F5F2` | Light sections, text on dark |
| `platinum` | `#D8D9DC` | Accent — prices, active states |
| `silver` | `#A9ABB0` | Muted text on dark |
| `steel` | `#6C6E74` | Muted text on light |
| `ink` | `#101012` | Text on light |

Type: **Bodoni Moda** (Didone display) + **Jost** (geometric grotesk, echoing
the circular construction of the mark). Both loaded via `next/font`.

## Stack

- Next.js 14 (App Router) + TypeScript, Tailwind CSS v3
- Framer Motion — every animation guarded by `useReducedMotion()`
- Firebase (App + Analytics), deployable to Firebase App Hosting
- lucide-react icons; all logo/ornament artwork is inline SVG

## Structure

- `/` — Hero → Marquee → Hakkımızda → Menü teaser → Galeri → Yorumlar → Konum → Footer
- `/menu` — the full card as its own micro-site: sticky category rail with
  scrollspy over a single scrolling page, own masthead and metadata. This is
  the destination for table QR codes.
- `data/menu.ts` — **the real menu**, transcribed from the printed card
  (11 categories, 130+ items, KDV dahil). Single source of truth for the
  homepage teaser, `/menu` and the Schema.org `Menu` markup.
- `config/business.ts` — phone, address, Instagram, hours
- `lib/firebase.ts` — Firebase app + Analytics helpers

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy (Firebase)

The project is wired to the `cafe-nowaa` Firebase project.

```bash
npm i -g firebase-tools
firebase login
firebase deploy
```

`apphosting.yaml` carries the runtime config and public Firebase env vars;
`firebase.json` targets the `europe-west1` region. Firebase web config values
are public client identifiers by design — they ship in the browser bundle and
are protected by Security Rules and API-key restrictions, not by secrecy.

## Before launch (client handoff)

- [ ] Replace placeholder Unsplash photography with real venue/food shots
- [ ] Swap the mock reviews in `data/reviews.ts` for real Google Reviews
- [ ] Confirm opening hours; embed the real Google Maps iframe in `components/Location.tsx`
- [ ] Confirm ice-cream pricing (currently quoted on the day)
- [ ] Point `NEXT_PUBLIC_SITE_URL` at the final domain
