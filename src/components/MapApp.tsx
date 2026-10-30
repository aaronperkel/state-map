"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMapStore } from "@/lib/client-store";
import { cycleMark, type Mark } from "@/lib/marks";
import { UsMap } from "./UsMap";
import { ExitTabs } from "./ExitTabs";
import { Legend } from "./Legend";
import { SignOut } from "./SignOut";
import { WelcomeSheet } from "./WelcomeSheet";
import { ShareDialog } from "./ShareDialog";
import { Share } from "./Icons";

export function MapApp() {
  const store = useMapStore();
  const [open, setOpen] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [changed, setChanged] = useState<ReadonlySet<string>>(() => new Set());
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const flash = useCallback((abbr: string) => {
    setChanged((prev) => {
      const next = new Set(prev);
      next.add(abbr);
      return next;
    });
    const existing = timers.current.get(abbr);
    if (existing) clearTimeout(existing);
    timers.current.set(
      abbr,
      setTimeout(() => {
        setChanged((prev) => {
          if (!prev.has(abbr)) return prev;
          const next = new Set(prev);
          next.delete(abbr);
          return next;
        });
        timers.current.delete(abbr);
      }, 420),
    );
  }, []);

  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  // A change that arrived from the other phone flashes too.
  const lastRemoteAt = useRef(0);
  useEffect(() => {
    const r = store.remote;
    if (r && r.at !== lastRemoteAt.current) {
      lastRemoteAt.current = r.at;
      flash(r.abbr);
    }
  }, [store.remote, flash]);

  const patch = useCallback(
    (abbr: string, change: { mark?: Mark; note?: string }) => store.patch(abbr, change),
    [store],
  );

  const tap = useCallback(
    (abbr: string) => {
      const cur = store.states[abbr]?.mark ?? 0;
      flash(abbr);
      void patch(abbr, { mark: cycleMark(cur) });
    },
    [store.states, flash, patch],
  );

  const hold = useCallback((abbr: string) => setOpen(abbr), []);

  const ready = store.status === "ready";

  return (
    <main className="app">
      <header className="top">
        <h1 className="top__title">Aaron &amp; Riley</h1>
        <button
          type="button"
          className="icon-btn share-btn"
          aria-label="Share as image"
          onClick={() => setShareOpen(true)}
          disabled={!ready}
        >
          <Share />
        </button>
      </header>

      <div className="stage">
        <UsMap
          states={store.states}
          busy={store.status === "loading"}
          changed={changed}
          onTap={tap}
          onLongPress={hold}
        />
        <ExitTabs states={store.states} onTap={tap} onLongPress={hold} />
        <Legend states={store.states} ready={ready} />
      </div>

      <footer className="foot">
        {store.status === "error" && (
          <p className="offline" role="status">
            Can&rsquo;t reach the map ·{" "}
            <button type="button" className="link" onClick={() => void store.refresh()}>
              Retry
            </button>
          </p>
        )}
        <SignOut />
      </footer>

      <WelcomeSheet
        key={open ?? "closed"}
        abbr={open}
        entry={open ? store.states[open] : undefined}
        onClose={() => setOpen(null)}
        onPatch={patch}
      />
      <ShareDialog
        key={shareOpen ? "share-open" : "share-closed"}
        open={shareOpen}
        states={store.states}
        onClose={() => setShareOpen(false)}
      />
    </main>
  );
}
