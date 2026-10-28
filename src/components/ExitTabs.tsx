"use client";

import { STATE_BY_ABBR } from "@/lib/states";
import { markLabel, type MapData } from "@/lib/marks";
import { usePress } from "@/lib/use-press";

export const SMALL_STATES = ["MA", "NH", "VT", "CT", "RI", "NJ", "DE", "MD", "DC"] as const;

const plaqueFor = (mark: number) =>
  mark === 1 ? "plaque--blue" : mark === 2 ? "plaque--red" : mark === 3 ? "plaque--white" : "plaque--blank";

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
            className={`plaque tab ${plaqueFor(mark)} ${pressed === abbr ? "tab--pressed" : ""}`}
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
