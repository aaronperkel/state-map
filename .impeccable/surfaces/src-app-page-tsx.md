---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/login/page.tsx"]
---

# Surface: the map (src/app/page.tsx) and login (src/app/login/page.tsx)

## Scope and mode

Operate. One screen: a shared US map Aaron and Riley tap to mark states, plus a login gate and a share dialog. Phone-first (390px), also desktop (1440px). Light, single theme.

## Audience, job, action

Two people passing a phone on a couch or in a car. Job: mark a state for Aaron, Riley, or both in one tap, add an optional 140-character note, see the other person's changes arrive, and share the map as a story image. Success: the map is true and worth showing someone.

## Constraints (user-pinned in the redesign round, 2026-10-30)

- Light only. No dark mode, no `prefers-color-scheme` branch.
- "Cute" and very simple: the map is the hero; no panels of copy around it. Only the title, legend words with counts, chip abbreviations, and "Sign out" are on the main screen.
- Soft pastels: cream page, sky blue for Aaron, coral for Riley, lavender for together, the two person colors striped for both.
- Nunito throughout.
- Share as a 1080×1920 image with the legend; no square variant.
- Password value never appears in code, docs, or copy.

## Direction contract

THESIS: A soft, friendly map you color in together and can post as-is. Refuses the dark dashboard and the highway-sign world of the first build.

OWN-WORLD: Cream ground (#FFF8F0). Unvisited states are warm gray puzzle pieces separated by cream; marks are flat pastels with ink labels. Pills for every control, 16px cards for the sheet and dialogs, one soft shadow. Nunito 600–900, tabular numerals. Motion: a 240ms pop and a soft wipe on the changed state, a 220ms sheet rise; instant under reduced motion.

STORY: You open the page: title top-left, share button top-right, the map filling the width, nine chips for the small states, four legend pills with counts. You tap Vermont's chip; it fills blue; tap again, coral; again, stripes; again, lavender. Hold it and a white sheet rises: "Vermont", three pill toggles, a note field, Done. Tap share: a story card appears with the map and legend; Share opens the system sheet, Save downloads it.

FIRST VIEWPORT: Phone: header row, the map edge to edge (~244px tall at 390), chips 5 + 4, legend 2 + 2, "Sign out" at the bottom. Desktop: the same column at 900px.

FINISH: screenshots in `.impeccable/review/` from `scripts/shoot.mjs`; DESIGN.md and `.impeccable/design.json` describe the pastel system.

## Unresolved

Whether the long-press survives iOS testing with the pop animation; fallback is Shift+Enter and the chips. Share on a real phone (Instagram in the share sheet) is verified by Aaron, not in CI.
