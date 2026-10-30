import type { Mark } from "./marks";

/**
 * The one place colors live. `layout.tsx` writes these onto <html> as CSS
 * custom properties (`--bg`, `--aaron-tint`, …) and the share-card renderer
 * reads them directly, so the stylesheet and the canvas can never disagree.
 */
export const PALETTE = {
  bg: "#fff8f0",
  surface: "#ffffff",
  surface2: "#f3ede4",
  ink: "#3b3540",
  muted: "#857c8a",
  line: "#e8dfd3",
  empty: "#e9e2da",
  emptyLabel: "#76707c",
  aaron: "#79b4e8",
  riley: "#f08a9b",
  together: "#a98bdc",
  aaronTint: "#d6e8f8",
  rileyTint: "#fbd9df",
  togetherTint: "#e6dcf5",
  focus: "#4a8fd0",
} as const;

export type PaletteKey = keyof typeof PALETTE;

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** `{ "--bg": "#fff8f0", "--aaron-tint": "#d6e8f8", … }` for the <html> style attribute. */
export function cssVars(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(PALETTE)) out[`--${kebab(key)}`] = value;
  return out;
}

/**
 * The solid fill for a mark. "Both" (3) is Aaron's color under Riley stripes;
 * callers that can draw stripes handle 3 themselves and use this for the base.
 */
export function markFill(mark: Mark, empty: string = PALETTE.empty): string {
  switch (mark) {
    case 1:
    case 3:
      return PALETTE.aaron;
    case 2:
      return PALETTE.riley;
    case 7:
      return PALETTE.together;
    default:
      return empty;
  }
}
