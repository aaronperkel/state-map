---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/login/page.tsx"]
---

# Surface: the map (src/app/page.tsx) and login (src/app/login/page.tsx)

## Scope and mode

Operate. One screen: a shared US map Aaron and Riley tap to mark states, plus a login gate. Phone-first (390px), also desktop (1440px). Dark, single theme.

## Audience, job, action

Two people passing a phone on a couch or in a car. Job: mark a state for Aaron, Riley, or both in one tap, add an optional 140-character note, and see the other person's changes arrive. Success: the map is true and worth showing someone.

## Constraints (user-pinned in the direction round)

- No bloom or neon glow. "Both" is flat retroreflective white inside the sign border.
- One generic welcome-sign template for the detail sheet; never imitate a real state's welcome sign.
- Interstate blue and Interstate red are colors only; no shield shapes.
- The LAST TAPPED strip also announces changes arriving via sync from the other device.
- Unlit state blanks must stay legible against the asphalt ground at 390px.
- Font: Overpass (Highway Gothic lineage).
- Password value never appears in code, docs, or copy.

## Direction contract

THESIS: Every state is a road sign at night and the two of you light them up. Refuses the colored-paper-map tracker and the white dashboard with stat cards.

OWN-WORLD: Night asphalt ground (#121417). FHWA sign anatomy everywhere: panels with a rounded corner radius, an inset white retroreflective border line, Highway green (#0B6B3A) for guide-sign chrome, Interstate blue (#003F87) for Aaron, Interstate red (#AF1E2D) for Riley, flat retroreflective white (#F4F6F3) for both, highway yellow (#FFCD00) only for the current-sync/attention plaque. Unlit states are dark sign blanks (#1E2328 fill, #5C656D 1px border) that stay readable on the asphalt. Overpass throughout, mixed case, tabular numerals, letter-spacing tightened at display sizes. Controls are plaques: rectangular sign tabs with the border line, pressed state inverts to white-on-color. Motion: a short sheeting wipe when a state changes (120 to 180ms), sheet slides up like a sign coming into view; reduced motion keeps instant swaps.

STORY: You land on a dark highway with one overhead green guide sign listing Aaron, Riley, Both with counts. You tap Vermont; it fills blue; tap again, red; again, white. The strip at the bottom reads "Vermont · Both" with "Add a note". When Riley marks Ohio from their phone, the strip says "Ohio · Riley, just now" and Ohio fills red. Long-press or the strip's button opens the "Welcome to Vermont" sign with two plaques (Aaron, Riley) and the note field.

FIRST VIEWPORT: Phone: green guide sign across the top (title line "Aaron & Riley" small, then three destination rows with color swatch left, name, count right). Below, the map edge to edge, ~56% of the viewport height, AlbersUSA 975×610 viewBox. Under the map's east side, a single row of exit tabs for CT RI DE NJ MD MA NH VT DC. Bottom: the LAST TAPPED strip, full width, sign-green, safe-area padded. Primary action is the map itself. Desktop: the guide sign becomes a left column (320px) with the map filling the rest; strip docks under the sign.

FORM: US highway signage (FHWA/MUTCD), candidate 5 of 7 on the ordered list, assigned by seed key 96c0ef3c; raised by Star Atlas (fill carries the mark), Lexicon (color quarantined to map and legend), Airport Yellow (one message per band line), Dense Grid (no wasted pixels on phone).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

Display title (default "Aaron & Riley's States"). Whether long-press survives iOS testing; fallback is the strip's "Add a note" button only.
