/** Bitmask: 1 = Aaron, 2 = Riley, 3 = both, 0 = nobody. */
export const AARON = 1;
export const RILEY = 2;
export const BOTH = 3;

export type Mark = 0 | 1 | 2 | 3;

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
  return n === 0 || n === 1 || n === 2 || n === 3;
}

/** Quick path on the map: 0 → Aaron → Riley → both → 0 */
export function cycleMark(m: Mark): Mark {
  return ((m + 1) % 4) as Mark;
}

export function toggleBit(m: Mark, bit: 1 | 2): Mark {
  return (m ^ bit) as Mark;
}

export function has(m: Mark, bit: 1 | 2): boolean {
  return (m & bit) === bit;
}

export function markLabel(m: Mark): string {
  switch (m) {
    case 1: return "Aaron";
    case 2: return "Riley";
    case 3: return "Both";
    default: return "Nobody yet";
  }
}

export function emptyEntry(): StateEntry {
  return { mark: 0, note: "", updatedAt: 0 };
}

export function counts(data: MapData) {
  let aaron = 0, riley = 0, both = 0, any = 0;
  for (const e of Object.values(data)) {
    if (!e.mark) continue;
    any++;
    if (has(e.mark, AARON)) aaron++;
    if (has(e.mark, RILEY)) riley++;
    if (e.mark === BOTH) both++;
  }
  return { aaron, riley, both, any };
}
