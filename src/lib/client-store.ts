"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STATE_ABBRS } from "./states";
import { emptyEntry, type MapData, type Mark, type StateEntry } from "./marks";

type Status = "loading" | "ready" | "error";

export type RemoteChange = { abbr: string; entry: StateEntry; at: number };

type Store = {
  status: Status;
  states: MapData;
  version: number;
  lastSyncAt: number;
  error: string | null;
  /** Most recent change that arrived from the other device via sync. */
  remote: RemoteChange | null;
};

const POLL_MS = 6000;

function emptyMap(): MapData {
  const m: MapData = {};
  for (const a of STATE_ABBRS) m[a] = emptyEntry();
  return m;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, credentials: "same-origin", cache: "no-store" });
  if (res.status === 401) {
    window.location.href = new URL("/login", window.location.origin).toString();
    throw new Error("unauthorized");
  }
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

/**
 * Shared map state with optimistic writes and cheap version polling.
 * - A PATCH marks its state abbr in-flight; poll results skip in-flight keys.
 * - A server entry only replaces a local one when its updatedAt is not older.
 */
export function useMapStore() {
  const [store, setStore] = useState<Store>({
    status: "loading",
    states: emptyMap(),
    version: -1,
    lastSyncAt: 0,
    error: null,
    remote: null,
  });
  const inFlight = useRef(new Map<string, number>()); // abbr -> count
  const versionRef = useRef(-1);

  const applyServer = useCallback((version: number, serverStates: MapData) => {
    versionRef.current = version;
    setStore((prev) => {
      const next: MapData = { ...prev.states };
      let remote = prev.remote;
      const firstLoad = prev.status === "loading";
      for (const abbr of STATE_ABBRS) {
        if (inFlight.current.get(abbr)) continue;
        const incoming = serverStates[abbr] ?? emptyEntry();
        const local = prev.states[abbr];
        if (!local || incoming.updatedAt >= local.updatedAt) {
          next[abbr] = incoming;
          const changed = !local || incoming.updatedAt > local.updatedAt;
          if (changed && !firstLoad && incoming.updatedAt > (remote?.entry.updatedAt ?? 0)) {
            remote = { abbr, entry: incoming, at: Date.now() };
          }
        }
      }
      return { ...prev, status: "ready", states: next, version, lastSyncAt: Date.now(), error: null, remote };
    });
  }, []);

  const fullSync = useCallback(async () => {
    try {
      const data = await fetchJson<{ version: number; states: MapData }>("/api/map");
      applyServer(data.version, data.states);
    } catch (e) {
      setStore((prev) => ({
        ...prev,
        status: prev.status === "loading" ? "error" : prev.status,
        error: e instanceof Error ? e.message : "sync failed",
      }));
    }
  }, [applyServer]);

  const checkVersion = useCallback(async () => {
    try {
      const { version } = await fetchJson<{ version: number }>("/api/version");
      if (version !== versionRef.current) await fullSync();
      else setStore((prev) => (prev.error ? { ...prev, error: null } : prev));
    } catch (e) {
      setStore((prev) => ({ ...prev, error: e instanceof Error ? e.message : "sync failed" }));
    }
  }, [fullSync]);

  useEffect(() => {
    void fullSync();
    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => void checkVersion(), POLL_MS);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void checkVersion();
        start();
      } else stop();
    };
    const onFocus = () => void checkVersion();
    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onFocus);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onFocus);
    };
  }, [fullSync, checkVersion]);

  const patch = useCallback(
    async (abbr: string, change: { mark?: Mark; note?: string }) => {
      const optimisticAt = Date.now();
      inFlight.current.set(abbr, (inFlight.current.get(abbr) ?? 0) + 1);
      let previous: StateEntry | undefined;
      setStore((prev) => {
        previous = prev.states[abbr];
        const cur = prev.states[abbr] ?? emptyEntry();
        return {
          ...prev,
          states: { ...prev.states, [abbr]: { ...cur, ...change, updatedAt: optimisticAt } },
        };
      });
      try {
        const res = await fetchJson<{ version: number; entry: StateEntry }>(`/api/map/${abbr}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(change),
        });
        versionRef.current = res.version;
        setStore((prev) => ({
          ...prev,
          version: res.version,
          states: { ...prev.states, [abbr]: res.entry },
          error: null,
        }));
        return true;
      } catch (e) {
        setStore((prev) => ({
          ...prev,
          states: previous ? { ...prev.states, [abbr]: previous } : prev.states,
          error: e instanceof Error ? e.message : "save failed",
        }));
        return false;
      } finally {
        const n = (inFlight.current.get(abbr) ?? 1) - 1;
        if (n <= 0) inFlight.current.delete(abbr);
        else inFlight.current.set(abbr, n);
      }
    },
    [],
  );

  return { ...store, patch, refresh: fullSync };
}
