"use client";

import { memo } from "react";
import { STATES, VIEW_H, VIEW_W } from "@/lib/states";
import { markLabel, type MapData } from "@/lib/marks";
import { usePress } from "@/lib/use-press";

type Props = {
  states: MapData;
  busy: boolean;
  changed: ReadonlySet<string>;
  onTap: (abbr: string) => void;
  onLongPress: (abbr: string) => void;
};

/** Centroid nudges (viewBox px) where the geometric centroid lands in water or a panhandle. */
const LABEL_OFFSET: Record<string, [number, number]> = {
  FL: [22, 22],
  LA: [-22, 8],
  MI: [18, 36],
  ID: [-6, 30],
  MD: [10, 8],
  NY: [-14, 4],
  MA: [-4, -2],
  VA: [10, 0],
  NC: [6, 0],
  KY: [8, 0],
  HI: [-8, -6],
  AK: [-10, -20],
  WV: [4, 4],
};

/** The exit tabs carry these; a label on the shape would collide with its neighbors. */
const NO_LABEL = new Set(["MD", "DE", "NJ", "CT", "RI", "MA", "NH", "VT", "DC"]);

function labelClass(abbr: string, w: number): string | null {
  if (NO_LABEL.has(abbr)) return null;
  if (w >= 70) return "state__label";
  if (w >= 40) return "state__label state__label--md";
  return null;
}

export const UsMap = memo(function UsMap({ states, busy, changed, onTap, onLongPress }: Props) {
  const { pressed, handlers } = usePress({ onTap, onLongPress });

  return (
    <div className="map-wrap">
      <svg
        className="map"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="group"
        aria-label="Map of the United States. Each state is a button: press to cycle who has been there, hold or Shift+Enter for details."
        aria-busy={busy}
        {...handlers}
      >
        <defs>
          {STATES.map((s) => (
            <clipPath key={s.abbr} id={`clip-${s.abbr}`}>
              <path d={s.d} />
            </clipPath>
          ))}
        </defs>
        {STATES.map((s) => {
          const entry = states[s.abbr];
          const mark = entry?.mark ?? 0;
          const cls = [
            "state",
            pressed === s.abbr ? "state--pressed" : "",
            changed.has(s.abbr) ? "state--changed" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <g
              key={s.abbr}
              className={cls}
              data-abbr={s.abbr}
              data-mark={mark}
              role="button"
              tabIndex={0}
              aria-label={`${s.name}: ${markLabel(mark)}${entry?.note ? ", has a note" : ""}`}
              aria-keyshortcuts="Enter Space Shift+Enter"
            >
              <path className="state__fill" d={s.d} />
              <path className="state__edge" d={s.d} clipPath={`url(#clip-${s.abbr})`} />
              <path className="state__gap" d={s.d} />
              <path className="state__wipe" d={s.d} clipPath={`url(#clip-${s.abbr})`} />
            </g>
          );
        })}
        {/* Labels in their own layer so no neighboring shape can cover them. */}
        <g className="labels" aria-hidden="true">
          {STATES.map((s) => {
            const w = s.bbox[2] - s.bbox[0];
            const lc = labelClass(s.abbr, w);
            if (!lc) return null;
            const entry = states[s.abbr];
            const mark = entry?.mark ?? 0;
            const [dx, dy] = LABEL_OFFSET[s.abbr] ?? [0, 0];
            const lx = s.cx + dx;
            const ly = s.cy + dy;
            return (
              <g key={s.abbr} className="label" data-mark={mark}>
                <text className={lc} x={lx} y={ly}>
                  {s.abbr}
                </text>
                {entry?.note && (
                  <rect className={`${lc} state__note`} x={lx - 7} y={ly + 10} width={14} height={2.5} rx={1} />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
});
