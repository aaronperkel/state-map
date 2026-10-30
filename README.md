# State Map

One shared map of the United States for Aaron and Riley. Tap a state to cycle who has been there (nobody → Aaron → Riley → both, on separate trips → together), hold a state for a short note. Aaron is sky blue, Riley is coral, both is the two colors striped, together is lavender. Both phones see the same map. The share button turns the map into a 1080×1920 story card (PNG) for Instagram or a text thread.

## Stack

- Next.js 16 (App Router, TypeScript), plain CSS, Nunito
- Colors live in `src/lib/palette.ts`; `layout.tsx` writes them onto `<html>` as custom properties and the share-card renderer (`src/lib/render-card.ts`, a `<canvas>`) reads the same constants
- Upstash Redis via the Vercel Marketplace (one hash plus a version counter)
- One shared group password, checked server-side, stored only in the `GROUP_PASSWORD` environment variable

## Develop

```bash
npm install
vercel env pull .env.local
npm run dev
```

`npm run build:states` regenerates `src/lib/states.ts` from `us-atlas` (AlbersUSA, 975×610).

`npx tsx scripts/brand.ts` regenerates the icon set (`src/app/icon.svg`, `favicon.ico`, `apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`) and the social images (`src/app/opengraph-image.png`, `twitter-image.png`) from the palette and the map geometry. The map on the social image is decorative, not anyone's data.

`GROUP_PASSWORD=… node scripts/shoot.mjs` screenshots the login, the map (phone and desktop), the state sheet, and the share card into `.impeccable/review/` against `http://localhost:3111`. It snapshots the live map first and puts it back when it finishes; demo marks are seeded only when the map is empty.

## Environment

| Variable | Purpose |
|---|---|
| `GROUP_PASSWORD` | The shared password. Never commit its value. |
| `SESSION_SECRET` | HMAC key for the session cookie. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Upstash Redis, set by the Marketplace integration. |

Design context lives in `PRODUCT.md`, `DESIGN.md`, and `.impeccable/`.
