"use client";

import { memo } from "react";
import { STATES, VIEW_H, VIEW_W } from "@/lib/states";
import { markLabel, type MapData } from "@/lib/marks";
import { labelPos, labelTier, type LabelTier } from "@/lib/map-labels";
import { usePress } from "@/lib/use-press";

type Props = {
  states: MapData;
  busy: boolean;
  changed: ReadonlySet<string>;
  onTap: (abbr: string) => void;
  onLongPress: (abbr: string) => void;
};

const TIER_CLASS: Record<LabelTier, string> = {
  lg: "state__label",
  lit: "state__label state__label--lit",
  md: "state__label state__label--md",
};

/**
 * Diagonal stripes for "both": the period is in viewBox units, so a phone
 * (map scaled to ~0.4) gets the wider one and desktop the tighter one.
 * The stylesheet picks which by viewport width.
 */
const HATCH = [
  { id: "hatch", period: 16 },
  { id: "hatch-lg", period: 28 },
] as const;

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
          {HATCH.map(({ id, period }) => (
            <pattern
              key={id}
              id={id}
              patternUnits="userSpaceOnUse"
              width={period}
              height={period}
              patternTransform="rotate(45)"
            >
              <rect className="hatch__a" width={period / 2} height={period} />
              <rect className="hatch__b" x={period / 2} width={period / 2} height={period} />
            </pattern>
          ))}
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
              <path className="state__wipe" d={s.d} clipPath={`url(#clip-${s.abbr})`} />
            </g>
          );
        })}
        {/* Labels in their own layer so no neighboring shape can cover them. */}
        <g className="labels" aria-hidden="true">
          {STATES.map((s) => {
            const w = s.bbox[2] - s.bbox[0];
            const entry = states[s.abbr];
            const mark = entry?.mark ?? 0;
            const tier = labelTier(s.abbr, w, mark > 0);
            if (!tier) return null;
            const [lx, ly] = labelPos(s);
            return (
              <g key={s.abbr} className="label" data-mark={mark}>
                <text className={TIER_CLASS[tier]} x={lx} y={ly}>
                  {s.abbr}
                </text>
                {entry?.note && (
                  <circle
                    className={tier === "md" ? "state__note state__label--md" : "state__note"}
                    cx={lx}
                    cy={ly + 13}
                    r={2.5}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
});
