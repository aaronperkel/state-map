# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, TypeScript) on Vercel, personal scope `aaronperkel`. Shared storage is Upstash for Redis provisioned through the Vercel Marketplace. Plain CSS with custom-property tokens; no component library. Recommended by Claude, accepted by Aaron.

## Users

Aaron and Riley, a couple. They open the site on their phones, usually together, when a trip comes up in conversation ("wait, have you been to Ohio?") or right after getting home from one. Occasionally on a laptop. The job is to keep one shared, always-current picture of which US states each of them has set foot in, and to enjoy looking at it.

## Product Purpose

A single private map of the United States that both people edit. Tapping a state colors it in. Each state carries one of five marks: nobody, Aaron, Riley, both (on separate trips), or together. Each state can also hold one short note (a trip, a year, a memory). Success is that the map is always true, takes one tap to update, and feels good enough to pull up and show someone.

## Positioning

It is theirs, not a template: two named people, one shared map, no accounts, no feed, no sharing features. A generic "visited states" tracker is single-player or asks each person to register; this one treats the couple as the unit and makes "together" a first-class color, distinct from "both of us, separately."

## Operating Context

- Entered through one shared group password; after that, anyone holding the device can mark anything. No identity or per-person login.
- Two devices see the same data within a few seconds (polling; no realtime channel).
- Used sporadically, in short bursts, often one-handed on a phone.
- Deployed on Vercel; source on GitHub under `aaronperkel/state-map`.

## Capabilities and Constraints

- Coverage: 50 states plus the District of Columbia (DC shown as a chip, not a map shape). No territories.
- Mark is a bitmask: 1 = Aaron, 2 = Riley, 4 = together (implies both), so the valid values are 0 = nobody, 1 = Aaron, 2 = Riley, 3 = both on separate trips, 7 = together. Tapping a state on the map cycles 0 → 1 → 2 → 3 → 7 → 0. A per-state detail view offers three toggles (Aaron, Riley, Together) and the note; turning Together on brings both people with it, and turning a person off drops Together.
- Note: one free-text field per state, max 140 characters.
- Auth: single shared password held in the `GROUP_PASSWORD` environment variable; never stored in the repo or docs. Signed, long-lived cookie after login.
- Storage: one Redis hash of 51 entries plus a version counter used for cheap change polling.
- Undecided: the site's display title (settled in design); custom domain (none for now).

## Brand Commitments

Names are "Aaron" and "Riley" exactly. No logo, typeface, or palette exists yet. Tone is personal and warm, never corporate; no gamification (badges, streaks, percent-complete nagging).

## Evidence on Hand

None. There is no existing list of visited states; the map starts empty and the two of them fill it in. Do not fabricate trips, notes, or history in shipped content. Demonstration data used during design must be labeled synthetic and removed before ship.

## Product Principles

1. One tap, one truth: the fastest path is marking a state; everything else is secondary.
2. "Together" is the point: the shared-trip color must read as the most special state on the map, and "both, separately" must read as exactly that: the two person colors, not a third one.
3. Always current on both phones; never ask who you are.
4. Small and finished over large and half-done: 51 entries, one note each, nothing more.
5. Worth showing someone: the map should look good enough to hand your phone across the table.

## Accessibility & Inclusion

Phone-first, one-handed use. States must be reachable by keyboard (Tab to a state, Enter or Space to cycle, Escape to close the detail view) and the five marks must be distinguishable by more than hue (pattern, label, or legend text). Respect `prefers-reduced-motion`. Tiny eastern states need usable hit targets.
