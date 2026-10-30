/**
 * Bitmask: 1 = Aaron, 2 = Riley, 4 = together.
 * "Together" implies both people, so the only valid values are
 * 0 (nobody), 1 (Aaron), 2 (Riley), 3 (both, separately), 7 (together).
 */
export const AARON = 1;
export const RILEY = 2;
export const TOGETHER = 4;

/** Both have been, on their own trips. */
export const BOTH = 3;
/** Both have been, on the same trip. */
export const TOGETHER_MARK = 7;

export type Bit = 1 | 2 | 4;
export type Mark = 0 | 1 | 2 | 3 | 7;

/** The tap order on the map. */
export const MARKS: readonly Mark[] = [0, 1, 2, 3, 7];

export type StateEntry = {
  mark: Mark;
  note: string;
  updatedAt: number;
};

export type MapData = Record<string, StateEntry>;

export const NOTE_MAX = 140;

export const PEOPLE = [
  { bit: AARON as 1, name: "Aaron" },
  { bit: RILEY as 2, name: "Riley" },
] as const;

export function isMark(n: unknown): n is Mark {
  return n === 0 || n === 1 || n === 2 || n === 3 || n === 7;
}

/** Quick path on the map: nobody → Aaron → Riley → both → together → nobody */
export function cycleMark(m: Mark): Mark {
  return MARKS[(MARKS.indexOf(m) + 1) % MARKS.length];
}

export function has(m: Mark, bit: Bit): boolean {
  return (m & bit) === bit;
}

/**
 * Flip one bit, keeping the value well-formed:
 * turning "together" on brings both people with it; turning a person off
 * also drops "together", since a trip together needs both of them.
 */
export function toggleBit(m: Mark, bit: Bit): Mark {
  if (bit === TOGETHER) return has(m, TOGETHER) ? BOTH : TOGETHER_MARK;
  const next = m ^ bit;
  const both = (next & AARON) === AARON && (next & RILEY) === RILEY;
  return (both ? next : next & ~TOGETHER) as Mark;
}

export function markLabel(m: Mark): string {
  switch (m) {
    case 1: return "Aaron";
    case 2: return "Riley";
    case 3: return "Both";
    case 7: return "Together";
    default: return "Nobody yet";
  }
}

export function emptyEntry(): StateEntry {
  return { mark: 0, note: "", updatedAt: 0 };
}

/** DC is on the map but is not a state; counts leave it out and report it on its own. */
export const DC = "DC";
export const STATE_TOTAL = 50;

/**
 * Legend counts over the 50 states (DC excluded). Each row counts every
 * state where that is true, so Aaron ⊇ Both ⊇ Together: a state lit
 * "together" counts for all four. `dc` is DC's own mark.
 */
export function counts(data: MapData) {
  let aaron = 0, riley = 0, both = 0, together = 0, any = 0;
  for (const [abbr, e] of Object.entries(data)) {
    if (abbr === DC || !e.mark) continue;
    any++;
    if (has(e.mark, AARON)) aaron++;
    if (has(e.mark, RILEY)) riley++;
    if (has(e.mark, AARON) && has(e.mark, RILEY)) both++;
    if (has(e.mark, TOGETHER)) together++;
  }
  const dc: Mark = data[DC]?.mark ?? 0;
  return { aaron, riley, both, together, any, dc };
}
