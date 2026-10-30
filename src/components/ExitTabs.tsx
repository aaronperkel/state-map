"use client";

import { STATE_BY_ABBR } from "@/lib/states";
import { markLabel, type Mark, type MapData } from "@/lib/marks";
import { SMALL_STATES } from "@/lib/map-labels";
import { usePress } from "@/lib/use-press";

const CHIP: Record<Mark, string> = {
  0: "chip--empty",
  1: "chip--aaron",
  2: "chip--riley",
  3: "chip--both",
  7: "chip--together",
};

type Props = {
  states: MapData;
  onTap: (abbr: string) => void;
  onLongPress: (abbr: string) => void;
};

/** The small eastern states and DC as a row of chips under the map. */
export function ExitTabs({ states, onTap, onLongPress }: Props) {
  const { pressed, handlers } = usePress({ onTap, onLongPress });
  return (
    <div className="chips" role="group" aria-label="Small states and DC" {...handlers}>
      {SMALL_STATES.map((abbr) => {
        const entry = states[abbr];
        const mark = entry?.mark ?? 0;
        const name = STATE_BY_ABBR[abbr].name;
        return (
          <button
            key={abbr}
            type="button"
            data-abbr={abbr}
            className={`chip ${CHIP[mark]}${pressed === abbr ? " chip--pressed" : ""}`}
            aria-label={`${name}: ${markLabel(mark)}${entry?.note ? ", has a note" : ""}`}
            aria-keyshortcuts="Enter Space Shift+Enter"
          >
            {abbr}
            {entry?.note && <span className="chip__note" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
