"use client";

import { useEffect, useState } from "react";
import { STATE_BY_ABBR } from "@/lib/states";
import { markLabel, type StateEntry } from "@/lib/marks";
import { Pencil } from "./Icons";

export type StripEvent = {
  abbr: string;
  entry: StateEntry;
  source: "local" | "remote";
  at: number;
};

type Props = {
  event: StripEvent | null;
  status: "loading" | "ready" | "error";
  error: string | null;
  anyLit: boolean;
  onOpen: (abbr: string) => void;
  onRetry: () => void;
};

function relative(at: number, now: number): string {
  const s = Math.max(0, Math.round((now - at) / 1000));
  if (s < 8) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return h === 1 ? "1 hr ago" : `${h} hr ago`;
}

export function LastTapped({ event, status, error, anyLit, onOpen, onRetry }: Props) {
  // Starts at 0 so the server and first client render agree; the interval sets real time.
  const [clock, setClock] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 10000);
    return () => clearInterval(id);
  }, []);
  // An event newer than the last clock tick reads as "just now" until the next tick.
  const now = event ? Math.max(clock, event.at) : clock;

  if (status === "error" || (error && !event)) {
    return (
      <footer className="sign strip strip--error" role="status">
        <div className="strip__main">
          <p className="strip__hint">
            <strong>Can&rsquo;t reach the road right now.</strong>
          </p>
          <div className="strip__meta">
            <span>{error ?? "The map didn't load."} Your taps are kept until it&rsquo;s back.</span>
          </div>
        </div>
        <button type="button" className="plaque plaque--white strip__action" onClick={onRetry}>
          Retry
        </button>
      </footer>
    );
  }

  if (status === "loading") {
    return (
      <footer className="sign strip" role="status" aria-live="polite">
        <div className="strip__main">
          <p className="strip__hint">Reading the map&hellip;</p>
        </div>
      </footer>
    );
  }

  if (!event) {
    return (
      <footer className="sign strip" role="status" aria-live="polite">
        <div className="strip__main">
          <p className="strip__hint">
            <strong>Tap a state</strong> to light it. Tap again to pass it on. <strong>Hold</strong> for a note.
          </p>
          {!anyLit && (
            <div className="strip__meta">
              <span>Nothing lit yet. Where have you two actually been?</span>
            </div>
          )}
        </div>
      </footer>
    );
  }

  const name = STATE_BY_ABBR[event.abbr]?.name ?? event.abbr;
  const { mark, note } = event.entry;

  return (
    <footer className="sign strip" role="status" aria-live="polite">
      <div className="strip__main">
        <div className="strip__state">
          <span>{name}</span>
          <span className="strip__swatch" data-mark={mark} aria-hidden="true" />
        </div>
        <div className="strip__meta">
          {event.source === "remote" && (
            <span className="plaque plaque--yellow strip__from">Other phone</span>
          )}
          <span>
            {[markLabel(mark), note ? `“${note}”` : null, relative(event.at, now)]
              .filter(Boolean)
              .map((part, i) => (
                <span key={i}>
                  {i > 0 && (
                    <span className="strip__sep" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {part}
                </span>
              ))}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="plaque plaque--white strip__action"
        onClick={() => onOpen(event.abbr)}
      >
        <Pencil />
        {note ? "Edit note" : "Add a note"}
      </button>
    </footer>
  );
}
