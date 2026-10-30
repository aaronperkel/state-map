import type { StateShape } from "./states";

/** Too small to tap or label on the map; they get chips under it instead. */
export const SMALL_STATES = ["VT", "NH", "MA", "CT", "RI", "NJ", "DE", "MD", "DC"] as const;

/** A label on one of these shapes would collide with its neighbors; the chips carry it. */
export const NO_LABEL: ReadonlySet<string> = new Set<string>(SMALL_STATES);

/** Centroid nudges (viewBox px) where the geometric centroid lands in water or a panhandle. */
export const LABEL_OFFSET: Record<string, readonly [number, number]> = {
  FL: [24, 26],
  LA: [2, 8],
  MI: [18, 36],
  ID: [-6, 30],
  MD: [10, 8],
  NY: [-28, -2],
  MA: [-4, -2],
  VA: [10, 0],
  NC: [6, 0],
  KY: [8, 0],
  HI: [-8, -6],
  ME: [-5, 12],
  AK: [-10, -20],
  WV: [4, 4],
  WA: [6, 8],
  SC: [2, 2],
  IN: [0, 6],
};

/** Where a state's abbreviation sits, in viewBox px. */
export function labelPos(s: StateShape): [number, number] {
  const [dx, dy] = LABEL_OFFSET[s.abbr] ?? [0, 0];
  return [s.cx + dx, s.cy + dy];
}

/**
 * lg: always labeled. lit: wide enough once it has a color behind it.
 * md: only at desktop map sizes. null: never.
 */
export type LabelTier = "lg" | "lit" | "md";

export function labelTier(abbr: string, bboxWidth: number, lit: boolean): LabelTier | null {
  if (NO_LABEL.has(abbr)) return null;
  if (bboxWidth >= 88) return "lg";
  if (bboxWidth >= 55 && lit) return "lit";
  if (bboxWidth >= 40) return "md";
  return null;
}
