"use client";

import { STATE_BY_ABBR } from "@/lib/states";
import { markLabel, type Mark, type MapData } from "@/lib/marks";
import { usePress } from "@/lib/use-press";

export const SMALL_STATES = ["VT", "NH", "MA", "CT", "RI", "NJ", "DE", "MD", "DC"] as const;

const PLAQUE: Record<Mark, string> = {
  0: "plaque--blank",
  1: "plaque--blue",
  2: "plaque--red",
  3: "plaque--hatch",
  7: "plaque--purple",
};

type Props = {
  states: MapData;
  onTap: (abbr: string) => void;
  onLongPress: (abbr: string) => void;
};

export function ExitTabs({ states, onTap, onLongPress }: Props) {
  const { pressed, handlers } = usePress({ onTap, onLongPress });
  return (
    <div className="tabs" role="group" aria-label="Small states and DC" {...handlers}>
      {SMALL_STATES.map((abbr) => {
        const mark = states[abbr]?.mark ?? 0;
        const name = STATE_BY_ABBR[abbr].name;
        return (
          <button
            key={abbr}
            type="button"
            data-abbr={abbr}
            className={`plaque tab ${PLAQUE[mark]} ${pressed === abbr ? "tab--pressed" : ""}`}
            aria-label={`${name}: ${markLabel(mark)}`}
            aria-keyshortcuts="Enter Space Shift+Enter"
          >
            {abbr}
          </button>
        );
      })}
    </div>
  );
}
