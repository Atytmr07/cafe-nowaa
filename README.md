# Cafe Nowaa

Production website for **Cafe Nowaa** — a coffee, breakfast, pizza and burger
bistro beside the Bostancı Marmaray station entrance in Istanbul.

## Design system — "Nowaa Monochrome Luxe"

"Espresso & Gold", taken from the venue itself: warm bulbs on dark timber,
cream paper, brass signage. Every dark token carries a red/yellow undertone —
a neutral grey ground read as generic dark-mode UI rather than a lit room.

| Token | Hex | Use |
|---|---|---|
| `obsidian` | `#17120E` | Primary dark surface |
| `onyx` | `#211A14` | Cards, elevated dark panels |
| `graphite` | `#2E251B` | Deepest inset panels |
| `pearl` | `#F8F4EC` | Light sections, text on dark |
| `ivory` | `#FFFCF6` | Brightest light surface |
| `silver` | `#B3A796` | Muted text on dark |
| `steel` | `#7C6F5F` | Muted text on light |
| `ink` | `#14100B` | Text on light |
| `gold` | `#D9A441` | Accent — CTAs, active states |
| `gold-bright` | `#F5CE6D` | Gold on dark grounds, hero mark |
| `gold-deep` | `#9C6F22` | Gold on cream grounds (prices, labels) |

Gold means "this leads to the menu", plus prices, ratings and Şefin Önerisi
marks. Everything else stays neutral so it reads as a signal, not decoration.
On cream use `gold-deep`; `gold-bright` is unreadable there.

Only the hero, the menu masthead, the reviews band and the footer are dark —
the rest is cream, and `/menu` is a light paper card.

Type: **Fraunces** (soft high-contrast serif, `SOFT`/`WONK` axes on for the
hand-cut character) + **DM Sans**. Both loaded via `next/font`.

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
