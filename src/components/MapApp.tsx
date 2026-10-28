"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMapStore } from "@/lib/client-store";
import { cycleMark, type Mark } from "@/lib/marks";
import { GuideSign } from "./GuideSign";
import { UsMap } from "./UsMap";
import { ExitTabs } from "./ExitTabs";
import { LastTapped, type StripEvent } from "./LastTapped";
import { WelcomeSheet } from "./WelcomeSheet";

export function MapApp() {
  const store = useMapStore();
  const [open, setOpen] = useState<string | null>(null);
  const [local, setLocal] = useState<StripEvent | null>(null);
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

  // A change that arrived from the other device flashes too.
  const lastRemoteAt = useRef(0);
  useEffect(() => {
    const r = store.remote;
    if (r && r.at !== lastRemoteAt.current) {
      lastRemoteAt.current = r.at;
      flash(r.abbr);
    }
  }, [store.remote, flash]);

  const patch = useCallback(
    async (abbr: string, change: { mark?: Mark; note?: string }) => {
      const ok = await store.patch(abbr, change);
      return ok;
    },
    [store],
  );

  const tap = useCallback(
    (abbr: string) => {
      const cur = store.states[abbr]?.mark ?? 0;
      const mark = cycleMark(cur);
      flash(abbr);
      const entry = { ...(store.states[abbr] ?? { note: "", updatedAt: 0 }), mark, updatedAt: Date.now() };
      setLocal({ abbr, entry, source: "local", at: Date.now() });
      void patch(abbr, { mark });
    },
    [store.states, flash, patch],
  );

  const hold = useCallback((abbr: string) => setOpen(abbr), []);

  // The strip shows whichever is newer: your last tap, or the last change from the other phone.
  const event = useMemo<StripEvent | null>(() => {
    const r = store.remote;
    const remote: StripEvent | null = r ? { abbr: r.abbr, entry: r.entry, source: "remote", at: r.at } : null;
    if (local && remote) return local.at >= remote.at ? { ...local, entry: store.states[local.abbr] ?? local.entry } : remote;
    if (local) return { ...local, entry: store.states[local.abbr] ?? local.entry };
    return remote;
  }, [local, store.remote, store.states]);

  const anyLit = useMemo(() => Object.values(store.states).some((e) => e.mark > 0), [store.states]);

  return (
    <main className="app">
      <GuideSign states={store.states} ready={store.status === "ready"} />
      <UsMap
        states={store.states}
        busy={store.status === "loading"}
        changed={changed}
        onTap={tap}
        onLongPress={hold}
      />
      <ExitTabs states={store.states} onTap={tap} onLongPress={hold} />
      <LastTapped
        event={event}
        status={store.status}
        error={store.error}
        anyLit={anyLit}
        onOpen={setOpen}
        onRetry={() => void store.refresh()}
      />
      <WelcomeSheet
        key={open ?? "closed"}
        abbr={open}
        entry={open ? store.states[open] : undefined}
        onClose={() => setOpen(null)}
        onPatch={patch}
      />
    </main>
  );
}
