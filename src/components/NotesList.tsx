"use client";

import { STATE_BY_ABBR } from "@/lib/states";
import type { MapData } from "@/lib/marks";

type Props = {
  states: MapData;
  onOpen: (abbr: string) => void;
};

export function NotesList({ states, onOpen }: Props) {
  const noted = Object.entries(states)
    .filter(([, e]) => e.note)
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt);

  return (
    <section className="sign notes" aria-labelledby="notes-title">
      <h2 id="notes-title" className="notes__title">
        Notes
        <span className="notes__count">{noted.length}</span>
      </h2>
      {noted.length === 0 ? (
        <p className="notes__empty">
          None yet. Hold a state, or use <strong>Add a note</strong> after you tap one.
        </p>
      ) : (
        <ul className="notes__list">
          {noted.map(([abbr, e]) => (
            <li key={abbr}>
              <button type="button" className="notes__item" onClick={() => onOpen(abbr)}>
                <span className="strip__swatch" data-mark={e.mark} aria-hidden="true" />
                <span className="notes__state">{STATE_BY_ABBR[abbr]?.name ?? abbr}</span>
                <span className="notes__text">{e.note}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
