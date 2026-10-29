---
name: Aaron & Riley's States
description: A shared US map where every state is a highway sign at night and two people light them up.
colors:
  asphalt: "#121417"
  sign-blank: "#1e2328"
  blank-border: "#5c656d"
  blank-label: "#9aa4ad"
  highway-green: "#0b6b3a"
  green-deep: "#085430"
  green-hover: "#0a5f34"
  green-dim: "#cfe8d9"
  interstate-blue: "#003f87"
  interstate-red: "#af1e2d"
  interstate-purple: "#6b2f9b"
  retro-white: "#f4f6f3"
  highway-yellow: "#ffcd00"
  ink: "#121417"
  retro-border: "rgba(244, 246, 243, 0.92)"
  red-dim: "#f8d7db"
  placeholder: "#6b7378"
  backdrop: "rgba(8, 10, 12, 0.6)"
typography:
  display:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 9vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  count:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
  title:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  label:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.02em"
  legend:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.03em"
  map-label:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
rounded:
  hairline: "1px"
  inner: "2px"
  xs: "3px"
  sm: "4px"
  md: "6px"
  lg: "10px"
spacing:
  2xs: "2px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  2xl: "14px"
  3xl: "16px"
  panel: "20px"
components:
  sign:
    backgroundColor: "{colors.highway-green}"
    textColor: "{colors.retro-white}"
    rounded: "{rounded.lg}"
    padding: "18px 20px 16px"
  sign-error:
    backgroundColor: "{colors.interstate-red}"
    textColor: "{colors.retro-white}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  plaque:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.retro-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  plaque-hover:
    backgroundColor: "{colors.green-hover}"
  plaque-white:
    backgroundColor: "{colors.retro-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "44px"
  plaque-blue:
    backgroundColor: "{colors.interstate-blue}"
    textColor: "{colors.retro-white}"
    rounded: "{rounded.md}"
  plaque-red:
    backgroundColor: "{colors.interstate-red}"
    textColor: "{colors.retro-white}"
    rounded: "{rounded.md}"
  plaque-hatch:
    backgroundColor: "repeating-linear-gradient(135deg, {colors.interstate-blue} 0 7px, {colors.interstate-red} 7px 14px)"
    textColor: "{colors.retro-white}"
    rounded: "{rounded.md}"
  plaque-purple:
    backgroundColor: "{colors.interstate-purple}"
    textColor: "{colors.retro-white}"
    rounded: "{rounded.md}"
  plaque-yellow:
    backgroundColor: "{colors.highway-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "24px"
  plaque-blank:
    backgroundColor: "{colors.sign-blank}"
    textColor: "{colors.retro-white}"
    rounded: "{rounded.md}"
  exit-tab:
    backgroundColor: "{colors.sign-blank}"
    textColor: "{colors.retro-white}"
    typography: "{typography.legend}"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "38px"
    width: "56px"
  toggle:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.retro-white}"
    rounded: "{rounded.md}"
    padding: "0 14px 0 16px"
    height: "52px"
  input-login:
    backgroundColor: "{colors.retro-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "56px"
  textarea-note:
    backgroundColor: "{colors.retro-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "72px"
  state-blank:
    backgroundColor: "{colors.sign-blank}"
    textColor: "{colors.blank-label}"
  state-aaron:
    backgroundColor: "{colors.interstate-blue}"
    textColor: "{colors.retro-white}"
  state-riley:
    backgroundColor: "{colors.interstate-red}"
    textColor: "{colors.retro-white}"
  state-both:
    backgroundColor: "repeating-linear-gradient(135deg, {colors.interstate-blue} 0 7px, {colors.interstate-red} 7px 14px)"
    textColor: "{colors.retro-white}"
  state-together:
    backgroundColor: "{colors.interstate-purple}"
    textColor: "{colors.retro-white}"
  swatch:
    backgroundColor: "{colors.sign-blank}"
    rounded: "{rounded.sm}"
    size: "28px"
---

# Design System: Aaron & Riley's States

## Overview

**Creative North Star: "The Night Road"**

Every surface is a US highway sign seen from a dark road: Highway green guide signs for chrome, sign blanks for anything not yet lit, Interstate blue and Interstate red as the two people's colors, the two colors in diagonal stripes for a state both have reached on their own, and Interstate purple for the one that matters most, "together." The world is FHWA/MUTCD signage, not a dashboard: no stat cards, no paper-map pastels, no glow. Light comes from the sheeting (a solid fill and a white border line), never from the air around it.

Density is high and phone-first. Panels sit on the asphalt with 10px to 14px gutters, controls are rectangular plaques with 44px minimum height, and the map runs edge to edge. Everything that can be a sign is a sign: the legend, the last-tapped strip, the notes list, the welcome sheet, the login card, the exit tabs, even the state shapes themselves (a fill with an inset border line, exactly like the panels). One typeface in mixed case carries all copy; numerals are tabular everywhere.

Confirmed rejections: bloom and neon glow; shield shapes for the two person colors; imitations of any real state's welcome sign; glyph icon fonts and raster imagery (the build ships only authored SVG).

**Key Characteristics:**
- Night asphalt ground with sign-green panels; depth is tonal, not shadowed.
- One recurring anatomy: solid panel, inset 2px retroreflective border line, rounded corners.
- Five marks, five fills: blank, Interstate blue, Interstate red, blue-and-red stripes (both, separately), Interstate purple (together).
- Highway yellow is reserved: the "Other phone" plaque, focus ring, caret, selection, accent-color.
- Overpass only, weights 500 to 800, tabular numerals, tightened tracking above 1.25rem.
- Motion is brief and literal: a 360ms sheeting wipe on change, a 220ms sheet rise, instant under reduced motion.

## Colors

A signage palette: one ground, one chrome green, two person colors (and their stripes), one special purple, one rationed yellow.

### Primary
- **Highway Green** (`highway-green`): the chrome of every informational panel: guide sign, strip, notes, welcome sheet, login. Text on it is Retro White; secondary text is Green Dim.
- **Green Deep** (`green-deep`): the default plaque fill (Exit, unpressed toggles) and the hover wash on notes rows. One step darker than the panel so controls read as mounted plaques.
- **Green Hover** (`green-hover`): plaque hover only, a half-step toward the panel green.
- **Green Dim** (`green-dim`): secondary copy on green: subtitles, "of 51", meta lines, labels, hints, counts.

### Secondary
- **Interstate Blue** (`interstate-blue`): Aaron's mark. State fill, exit tab, legend swatch, pressed Aaron toggle. A color only; never a shield silhouette.
- **Interstate Red** (`interstate-red`): Riley's mark; same roles as blue. Also the error panel (`.strip--error`, login error plaque) because the world's red already means "stop/wrong way."
- **Blue-and-red stripes**: "both, separately." Diagonal (135deg) stripes of the two person colors on every mark surface: state fill (an SVG pattern in viewBox units, 28 on phones and 16 from 700px), exit tab (7px stripes), legend swatch (5px), strip and notes swatches (4px). Text on stripes is Retro White.
- **Interstate Purple** (`interstate-purple`): "together," the one state that matters most. State fill, exit tab, legend swatch, pressed Together toggle. Flat, like blue and red, with the Retro Border line.
- **Retro White** (`retro-white`): the primary action plaque (Add a note, Done, Enter, Retry), input fields, and all text on colored chrome, including every lit state's label. On white, text and the inset border are Ink. It never fills a state.

### Tertiary
- **Highway Yellow** (`highway-yellow`): attention only. The "Other phone" plaque on remote changes, the 3px focus ring, the caret, text selection, and form accent-color. It never fills a state, a panel, or a resting control.

### Neutral
- **Asphalt** (`asphalt`): page ground, the stroke between states (2px) and the gap stroke inside them, and the `theme-color`.
- **Sign Blank** (`sign-blank`): an unlit state, an unmarked exit tab, an empty legend swatch.
- **Blank Border** (`blank-border`): the inset edge line on blanks (2.5px on map states, 1.5px on plaques) and the thin scrollbar thumb. This is what keeps unlit blanks legible on asphalt at 390px.
- **Blank Label** (`blank-label`): state abbreviation on an unlit blank.
- **Ink** (`ink`): text, border lines, and the toggle check on white or yellow sheeting.
- **Retro Border** (`retro-border`): the inset border line on every green, blue, or red surface; 92% white so it sits in the sheeting rather than on top of it.
- **Red Dim** (`red-dim`), **Placeholder** (`placeholder`), **Backdrop** (`backdrop`): secondary text on the red error panel, input placeholder text on white, and the dialog scrim behind the welcome sheet.

### Named Rules
**The Colors-Only Rule.** Interstate blue and Interstate red are fills. No shield outlines, no route numbers, no badge silhouettes; the color is the whole reference.

**The Yellow Ration Rule.** Highway yellow appears for attention and focus only: the remote-change plaque, focus ring, caret, selection, accent-color. If a resting surface is yellow, it is wrong.

**The Together-Is-Purple Rule.** "Together" is flat Interstate purple with the Retro Border line: one color, no glow, no gradient. It is the only hue on the map that belongs to neither person, which is what makes it read as the special one.

**The Stripes-Are-Both Rule.** "Both, separately" is never a third color. It is the two person colors in equal diagonal stripes, so a striped state reads as "his trip and hers," not as a new category.

## Typography

**Display Font:** Overpass (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Overpass (same face)
**Label/Mono Font:** none; tabular numerals (`font-variant-numeric: tabular-nums`, `"tnum" 1`) on the body element make every count align.

**Character:** Highway Gothic lineage in mixed case. Heavy weights (700/800) at every size above body; tracking tightens as size rises (-0.01em at 1.25rem up to -0.02em at display) and opens slightly on small legends (+0.02em to +0.04em). Nothing is set in a second face.

### Hierarchy
- **Display** (800, `clamp(2rem, 9vw, 2.75rem)`, 1.0, -0.02em): the state name on the welcome sheet, balanced wrapping. Preceded by the 1.25rem/700 "Welcome to" line.
- **Headline** (800, 1.75rem, 1.05, -0.015em): the login title.
- **Count** (800, 1.5rem, 1.0, -0.01em, tabular): legend counts; the trailing "of 51" is 0.8125rem/600 Green Dim.
- **Title** (800, 1.375rem, 1.1, -0.01em): guide-sign title. **Title-sm** (800, 1.25rem, 1.1): the strip's state name.
- **Body** (600 to 700, 1rem, 1.35): legend rows, hints, notes rows. Emphasis inside body copy is `<strong>` in Retro White against Green Dim, not a size change.
- **Body-sm** (600, 0.9375rem): strip hint, notes meta, error text. Section titles on small panels (Notes) are 1.0625rem/800.
- **Label** (700, 0.875rem, +0.02em): field labels ("Group password", "Note") and meta lines. The only uppercase in the system is the 0.75rem/+0.04em legend on the yellow "Other phone" plaque.
- **Legend** (800, 0.9375rem, +0.03em): two-letter abbreviations on exit tabs.
- **Map label** (700, 22px in SVG units at phone widths, 15px from 700px, 13px from 1200px, +0.02em): state abbreviations, centered; Blank Label on blanks, Retro White on every lit fill (blue, red, stripes, purple). A 14x2.5 bar under the label marks a state with a note.

### Named Rules
**The One Face Rule.** Overpass at 500 to 800 is the entire type system. New surfaces pick a step from the ramp above; they do not add a serif, a mono, or a display face.

**The Tabular Count Rule.** Numbers that can change (counts, character counters, relative times) inherit tabular numerals and never reflow their neighbors.

## Layout

Phone-first single column. The app shell is a CSS grid with 10px gaps and 10px outer padding (bottom padding adds the safe-area inset): guide sign, last-tapped strip, notes panel, then the map filling the remaining height, then the exit tabs (a 3x56px grid, right-aligned under the map's east side). The map is an AlbersUSA 975x610 viewBox scaled to full width with `touch-action: manipulation`. Small eastern states and DC (VT NH MA CT RI NJ MD DE DC) are exit tabs rather than map hit targets.

At 900px and up the shell becomes two columns, `320px minmax(0, 1fr)`, with 14px gaps and padding, named areas `sign map / strip map / notes map / notes tabs`: the guide sign, strip, and notes stack in the left column; the map centers vertically in the right column with `max-height: calc(100dvh - 120px)`; exit tabs wrap at the lower right. The legend rows switch from a 2-by-2 grid to a stacked list (28px swatches, 1.125rem rows). Map label size steps down at 700px and again at 1200px. The welcome sheet is bottom-docked on phones (10px side margins plus safe area) and becomes a centered 520px dialog at 900px. The login card is `min(440px, 100%)` centered in the viewport.

Spacing rhythm is a 2px-based ladder: 2 (row gaps inside labels), 4, 6, 8 (control gaps), 10 (phone gutters), 12 (strip/notes padding, legend gaps), 14 (desktop gutters, sheet sections), 16, 18/20 (panel padding), 26 (login card padding). Touch targets hold 44px on plaques, 38px on exit tabs, 52px on sheet toggles, 56px on login controls.

## Elevation & Depth

No drop shadows anywhere. Depth is tonal and structural: Asphalt ground, Sign Blank one step up, Highway Green panels, Green Deep plaques mounted on them, and the inset border line reading as the sheeting's own edge. Inputs use a double inset ring (`box-shadow: inset 0 0 0 3px retro-white, inset 0 0 0 4.5px ink`) as a drawn border, not an elevation. The only layered depth is the welcome sheet's scrim (`backdrop`, 60% near-black) and the 60% opacity map while a write is in flight. Hover brightens a state fill by 12% (`filter: brightness(1.12)`) and press darkens it to 90%; neither adds a glow.

### Named Rules
**The No-Bloom Rule.** No outer shadows, no blur, no halo on any surface or state. Light is a flat fill and a white line; focus is a hard 3px yellow outline at 3px offset.

## Shapes

Rounded rectangles only, with a two-radius anatomy: an outer radius and an inner border line that follows it 4px tighter. Signs are 10px outside with the 2px line inset 6px at 6px radius; plaques are 6px outside with a 1.5px line inset 3px at 3px radius; legend swatches are 4px/2px; strip swatches and toggle marks are 3px/2px; the yellow plaque drops to a 1px line inset 2px. Map states reuse the same idea in SVG: a 2px Asphalt stroke outside, a 2.5px Blank Border (4px Retro Border when lit, 4px Ink when white) clipped inside the shape. Rules are 2px bars with 1px radius at 60% opacity. No circles except the 4px separator dot in meta text; no pills; no cut corners; no shield outlines.

## Components

### Sign (panel)
- **Character:** an overhead guide sign; every container in the app.
- **Shape:** 10px radius, `::before` inset 6px drawing a 2px Retro Border line at 6px radius; children stack above it.
- **Variants:** Highway Green default (guide, strip, notes, sheet, login). Red (`.strip--error`) for the offline state with Red Dim secondary text and a white Retry plaque.
- **Internal padding:** 18px 20px 16px (guide), 12px 16px (strip, notes), 18px 20px 20px (sheet), 26px 26px 24px (login).

### Plaque (button)
- **Character:** a small sign used as a control or badge; the only button style.
- **Shape:** 6px radius, inline-flex, 8px gap, 44px minimum height, 0 14px padding, 700 weight, +0.01em, 1.5px inset border at 3px.
- **Default:** Green Deep on green panels; hover Green Hover; active `translateY(1px)`; disabled 55% opacity. 140ms ease-out on color and transform.
- **White (primary action):** Retro White with Ink text and Ink border; hover pure white. Used for Add a note / Edit note, Done, Enter, Retry.
- **Blue / Red / Stripes / Purple:** mark fills on exit tabs and pressed toggles; white text and border. Hover brightens the fill by 10% (a filter, so colored and striped plaques keep their color).
- **Yellow (attention):** Ink text and border, 24px tall, 0.75rem uppercase +0.04em; only the "Other phone" badge on remote changes.
- **Blank:** Sign Blank fill with Blank Border line; an unmarked exit tab.
- **Icons:** authored 24-viewBox stroke SVGs (2.4 stroke, round caps) at 1em, inheriting currentColor: ArrowRight, ArrowUp, Close, Pencil. No icon fonts.

### Exit tab
- **Style:** plaque, 56px wide and 38px tall on phones (min 48px wide on desktop), 0.9375rem/800/+0.03em abbreviation, fill by mark. Pressed: 1px drop and 90% brightness.

### Toggle (welcome sheet)
- **Style:** plaque, 52px tall, 1.0625rem, label left and an 18px mark box right (2px Retro Border outline). Aaron and Riley share a row; Together spans the full width below them. Pressed (`aria-pressed=true`): Aaron fills Interstate Blue, Riley fills Interstate Red, Together fills Interstate Purple; the mark box turns white with a 10px Ink square inside. Together on brings both people with it; a person off drops Together.

### Inputs / Fields
- **Style:** Retro White field, Ink text, 6px radius, no border; the double inset ring draws a 1.5px Ink line 3px inside the edge. Login input 56px tall, 1.25rem/700/+0.04em with CSS text masking; note textarea 72px minimum, 1.0625rem/600, no resize.
- **Label:** 0.875rem/700/+0.02em Green Dim, with the `0/140` counter right-aligned at 600.
- **Focus:** 3px Highway Yellow outline, 2px to 3px offset.
- **Error:** a red plaque with `role=alert` under the field, 48px tall, left-aligned text; the field gets `aria-invalid`.

### Map state
- **Style:** `state__fill` (Sign Blank, 2px Asphalt stroke), `state__edge` (clipped inset stroke, Blank Border 2.5px), `state__gap` (1.5px Asphalt), `state__wipe` (white overlay, 0 opacity). Marks 1/2/3/7 switch the fill to blue/red/stripes/purple and the edge to 4px Retro Border. The stripe pattern is anchored to the map, so neighboring striped states share one continuous stripe field.
- **States:** hover brightness 1.12; pressed brightness 0.9; focus-visible 4px yellow stroke; changed plays the 360ms wipe (white at 55% fading to 0).
- **Interaction:** tap cycles blank → Aaron → Riley → both → together → blank; a 450ms hold (10px move tolerance) or Shift+Enter opens the welcome sheet; Enter/Space cycle; Escape closes.

### Legend swatch
- **Style:** 22px (phone) or 28px (desktop) square, 4px radius, inset 1.5px line at 2px; fill by mark (blue, red, 5px stripes, purple). Four rows: Aaron, Riley, Both, Together. The 18px variant (`strip__swatch`, 3px radius) appears in the strip and notes rows.

### Last-tapped strip
- **Style:** green sign, two-column grid (content, white action plaque), 68px minimum height. State name at 1.25rem/800 with a swatch (4px stripes for both); meta line in Green Dim 0.875rem/600 with 4px dot separators; remote events add the yellow "Other phone" plaque and, on desktop, stack the action under the text.

### Welcome sheet
- **Style:** native `<dialog>`, transparent, bottom-docked on phones and centered at 900px; the panel is a green sign with "Welcome to" above the display-size state name, three toggles, a status line, the note field, and a right-aligned white Done plaque. Opens with a 220ms rise of 24px; backdrop fades over 220ms. One generic template for all 51 entries.

## Do's and Don'ts

### Do:
- **Do** build every new container as a sign: solid fill, 10px radius, the 2px Retro Border line inset 6px via `::before`.
- **Do** make every control a plaque (6px radius, 44px minimum height, 1.5px inset line) and reserve the white plaque for the one primary action on a panel.
- **Do** keep the five marks to their fills (Sign Blank, Interstate Blue, Interstate Red, blue-and-red stripes, Interstate Purple) with the matching inset line (Blank Border on blanks, Retro Border on everything lit).
- **Do** set all copy in Overpass 500 to 800, mixed case, with tabular numerals; tighten tracking at 1.25rem and above.
- **Do** keep blanks legible on asphalt: Sign Blank fill with a Blank Border line, Blank Label text, checked at 390px.
- **Do** use Highway Yellow for focus (3px outline, 3px offset) and remote-change attention only.
- **Do** keep motion literal and short: 140ms ease-out for control states, 220ms for the sheet, 360ms for the sheeting wipe, and collapse all of it under `prefers-reduced-motion`.

### Don't:
- **Don't** add bloom, neon glow, outer shadows, or blur to any state, panel, or control.
- **Don't** draw Interstate shield shapes, route numbers, or badge silhouettes; blue and red are colors only.
- **Don't** imitate a real state's welcome sign; the sheet is one generic template with the state name swapped in.
- **Don't** fill a state, a panel, or a resting control with Highway Yellow, and don't fill a state with Retro White.
- **Don't** introduce a second typeface, icon fonts, or raster imagery; icons are authored stroke SVGs at 1em.
- **Don't** use pills, circles, or cut corners for controls; the system is rounded rectangles with a following inner line.
