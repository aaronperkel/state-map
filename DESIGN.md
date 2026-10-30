---
name: Aaron & Riley's States
description: A soft, friendly US map two people color in together and can post as-is.
colors:
  bg: "#fff8f0"
  surface: "#ffffff"
  surface2: "#f3ede4"
  ink: "#3b3540"
  muted: "#857c8a"
  line: "#e8dfd3"
  empty: "#e9e2da"
  empty-label: "#76707c"
  aaron: "#79b4e8"
  riley: "#f08a9b"
  together: "#a98bdc"
  aaron-tint: "#d6e8f8"
  riley-tint: "#fbd9df"
  together-tint: "#e6dcf5"
  focus: "#4a8fd0"
typography:
  title:
    fontFamily: "Nunito, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  sheet-name:
    fontFamily: "Nunito, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 8vw, 2.25rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Nunito, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "normal"
  legend:
    fontFamily: "Nunito, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  chip:
    fontFamily: "Nunito, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.03em"
  label:
    fontFamily: "Nunito, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1.35
    letterSpacing: "0.02em"
  map-label:
    fontFamily: "Nunito, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
rounded:
  pill: "999px"
  card: "16px"
  sm: "10px"
  swatch: "4px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "14px"
  xl: "20px"
  desktop: "24px"
components:
  button:
    backgroundColor: "{colors.surface2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    shadow: "0 1px 2px rgba(59,53,64,.06), 0 10px 30px rgba(59,53,64,.10)"
  chip:
    backgroundColor: "{colors.surface2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 10px"
    height: "38px"
    width: "56px"
  legend-pill:
    backgroundColor: "{colors.surface2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px 0 10px"
    height: "36px"
  toggle:
    backgroundColor: "{colors.surface2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px 0 16px"
    height: "52px"
  input:
    backgroundColor: "{colors.surface2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
    height: "72px"
  state-empty:
    backgroundColor: "{colors.empty}"
    textColor: "{colors.empty-label}"
  state-aaron:
    backgroundColor: "{colors.aaron}"
    textColor: "{colors.ink}"
  state-riley:
    backgroundColor: "{colors.riley}"
    textColor: "{colors.ink}"
  state-both:
    backgroundColor: "repeating-linear-gradient(135deg, {colors.aaron} 0 6px, {colors.riley} 6px 12px)"
    textColor: "{colors.ink}"
  state-together:
    backgroundColor: "{colors.together}"
    textColor: "{colors.ink}"
---

# Design System: Aaron & Riley's States

## Overview

**Creative North Star: "Color it in"**

A cream page and a map you color in with two soft crayons. The map is the only big thing on screen; everything else is a pill. Aaron is sky blue, Riley is coral, "together" is lavender, and "both, separately" is the two person colors in diagonal stripes, so a striped state reads as his trip and hers rather than a third category. Text sits in ink on every fill (white would fail contrast on these pastels). There is one theme, light, and no dark mode.

Copy is rationed. The main screen says only: the title, four legend words with counts, nine chip abbreviations, and "Sign out". Notes live in the per-state sheet; a noted state shows a small dot. Changes from the other phone just animate on the map.

The share card is the same system at 1080×1920: cream ground, the map with ink labels, the chip row, a 2×2 legend with counts, and "N of 50 states" (plus "+ DC" when DC is marked). It is drawn on a canvas from the same palette constants the CSS uses.

**Key Characteristics:**
- Cream ground, warm-gray "puzzle piece" states separated by cream, flat pastel marks.
- Pills for every control; 16px cards for the sheet, the share dialog, and login; one soft shadow on cards only.
- Nunito 600–900, tabular numerals, slightly tight tracking on titles.
- Motion is short: a 240ms pop and a soft wipe on a changed state, a 220ms sheet rise; instant under reduced motion.

## Colors

Tokens are defined once in `src/lib/palette.ts` and written onto `<html>` as `--bg`, `--aaron-tint`, etc. The stylesheet never restates a hex.

- **Background** (`bg`): the page, the card ground, and the stroke between states.
- **Surface / Surface 2** (`surface`, `surface2`): white cards and the share button; beige for inputs, unvisited chips, the default button, and the "Both" legend pill.
- **Ink / Muted** (`ink`, `muted`): all text; muted for sublines, labels, "Sign out", and the "N of 50 states" line.
- **Line**: hairline rings on beige controls.
- **Empty / Empty label**: an unvisited state and its abbreviation.
- **Aaron** (sky blue), **Riley** (coral), **Together** (lavender): the three solid marks. Each has a tint for unpressed sheet toggles and legend pills.
- **Both**: never a color of its own; 135° stripes of Aaron and Riley on every surface that shows a mark (state fill via an SVG pattern anchored to the map, chip and swatch via `repeating-linear-gradient`, canvas via clipped 45° lines on one shared grid).
- **Focus**: a 3px blue outline, 3px offset.

Contrast: ink on Aaron 5.4:1, on Riley 4.9:1, on Together 4.2:1. Text on fills is always ink.

## Typography

Nunito only (variable, loaded once through `next/font/google`), weights 600–900. Titles 900 at 1.25rem (1.5rem desktop); the sheet's state name 900 at `clamp(1.75rem, 8vw, 2.25rem)`; body and legend 700; counts 900; chips and map labels 800. Map labels are 22px in viewBox units on phones (19px when a mid-size state is lit), 15px from 700px, 13px from 1200px; ink on a filled state, Empty label on a blank one. Numerals are tabular everywhere.

## Layout

One column, `max-width: 900px`, centered, 12px gutters (24px on desktop). Rows: header (title left, share button right), the stage (map edge to edge on phones, chips 5 + 4 on phones and one row on desktop, legend pills wrapping 2 + 2), then "Sign out". The stage is vertically centered in the remaining height so the map reads as the hero. The sheet and the share dialog are bottom-docked on phones and centered 520px cards from 900px.

## Components

- **Button** (`.btn`): pill, 44px, beige; `.btn--primary` is ink with white text. **Icon button** (`.icon-btn`): 44px circle, white, hairline ring.
- **Card** (`.card`): white, 16px radius, the one shadow.
- **Chip** (`.chip`): 56×38, 10px radius, fill by mark (beige + ring when empty); a 5px ink dot top-right when the state has a note.
- **Legend pill** (`.legend__item`): 14px swatch, name, count; tinted by mark.
- **Toggle** (`.toggle`): 52px pill in the person's tint; solid color when pressed, with an 18px ring that fills.
- **Map state**: `state__fill` (empty fill, 2px cream stroke, round joins, non-scaling) and a clipped `state__wipe`; marks 1/2/3/7 switch the fill. Hover 96% brightness, press 92%, focus a 3px blue stroke. `state--changed` plays the pop and the wipe.
- **Share card**: see `src/lib/render-card.ts` for the pixel spec.

## Do's and Don'ts

- **Do** add new color through `palette.ts`, never as a hex in CSS or in the renderer.
- **Do** keep text on any mark in ink.
- **Do** keep stripes for "both" on every surface, including the share card.
- **Don't** add a dark theme, a second typeface, or outer shadows beyond the card's.
- **Don't** put copy on the main screen; explanation belongs in the sheet or nowhere.
