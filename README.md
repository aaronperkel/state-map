# State Map

One shared map of the United States for Aaron and Riley. Tap a state to cycle who has been there (nobody → Aaron → Riley → both), hold a state for a short note. Both phones see the same map.

## Stack

- Next.js 16 (App Router, TypeScript), plain CSS tokens, Overpass
- Upstash Redis via the Vercel Marketplace (one hash plus a version counter)
- One shared group password, checked server-side, stored only in the `GROUP_PASSWORD` environment variable

## Develop

```bash
npm install
vercel env pull .env.local
npm run dev
```

`npm run build:states` regenerates `src/lib/states.ts` from `us-atlas` (AlbersUSA, 975×610).

## Environment

| Variable | Purpose |
|---|---|
| `GROUP_PASSWORD` | The shared password. Never commit its value. |
| `SESSION_SECRET` | HMAC key for the session cookie. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Upstash Redis, set by the Marketplace integration. |

Design context lives in `PRODUCT.md`, `DESIGN.md`, and `.impeccable/`.
