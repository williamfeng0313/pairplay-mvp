# TwoLumi MVP

A local-first Next.js MVP for an SEO-led couple-games site.

## Run locally

```bash
npm install
npm run dev
```

Then open:

http://localhost:3000

## What already works
- A+B hybrid homepage
- mobile responsive design
- Would You Rather
- This or That
- Couple Questions
- Couple Quiz MVP
- Same-device Compatibility Test
- Long Distance landing page
- Date Night landing page
- sitemap.xml
- robots.txt
- reserved ad slots

## What is intentionally NOT built yet
- real room persistence
- real-time multiplayer
- accounts
- daily game
- payments
- production AdSense code

The homepage room card is a UI/product preview. It generates a local room code only.

See `ARCHITECTURE.md` for the full build strategy.
See `supabase/schema.sql` for the Phase 2 room data model.


## Room-code pairing

See `ROOM-SETUP.md` for the real two-player room-code setup.
