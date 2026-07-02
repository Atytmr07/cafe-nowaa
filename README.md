# Cafe Nowaa — Demo Website

Awwwards-level demo site for **Cafe Nowaa**, a coffee–pizza–burger–breakfast bistro
beside the Bostancı Marmaray station entrance in Istanbul.

**This is a no-backend demo build.** All content is realistic mock data living in
`data/` and `config/` — no database, no auth, no admin panel.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v3 — "Modern Istanbul Bistro Noir" design tokens in `tailwind.config.ts`
- Framer Motion (all animation `useReducedMotion()`-guarded)
- lucide-react icons, Fraunces + DM Sans via `next/font`

## Structure

- `/` — homepage: Hero → About → **Menu Teaser** (featured dishes only) → Gallery → Reviews → Location → Footer
- `/menu` — the full category-tabbed digital menu, built as its own micro-site
  (own header, own metadata, own component set under `components/menu/`).
  This is the destination for table QR codes — mobile-first, full noir.
- `data/menu.ts` · `data/reviews.ts` · `data/gallery.ts` — mock content (clearly marked, swap before launch)
- `config/business.ts` — real phone / address / Instagram / hours

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Before launch (client handoff checklist)

- [ ] Replace all Unsplash placeholder photography with real venue/food shots
- [ ] Swap mock reviews for real Google Reviews
- [ ] Confirm opening hours + exact map coordinates; embed real Google Maps iframe in `components/Location.tsx`
- [ ] Replace the inline SVG "NV" roundel with the client's vector logo
- [ ] Update `metadataBase` domain in `app/layout.tsx`
