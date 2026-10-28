"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

const LONG_PRESS_MS = 450;
const MOVE_TOLERANCE = 10;

type Handlers = {
  onTap: (abbr: string) => void;
  onLongPress: (abbr: string) => void;
};

function abbrFrom(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest<HTMLElement | SVGElement>("[data-abbr]");
  return el?.getAttribute("data-abbr") ?? null;
}

/**
 * Delegated tap / long-press for a container whose children carry data-abbr.
 * Tap cycles, long-press opens details. Shift+Enter is the keyboard long-press.
 */
export function usePress({ onTap, onLongPress }: Handlers) {
  const [pressed, setPressed] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = useRef<{ x: number; y: number; abbr: string; fired: boolean; id: number } | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    start.current = null;
    setPressed(null);
  }, []);

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      const abbr = abbrFrom(e.target);
      if (!abbr) return;
      start.current = { x: e.clientX, y: e.clientY, abbr, fired: false, id: e.pointerId };
      setPressed(abbr);
      timer.current = setTimeout(() => {
        if (start.current && !start.current.fired) {
          start.current.fired = true;
          onLongPress(abbr);
          setPressed(null);
        }
      }, LONG_PRESS_MS);
    },
    [onLongPress],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const s = start.current;
      if (!s || s.id !== e.pointerId) return;
      if (Math.hypot(e.clientX - s.x, e.clientY - s.y) > MOVE_TOLERANCE) clear();
    },
    [clear],
  );

  const onPointerUp = useCallback(
    (e: PointerEvent) => {
      const s = start.current;
      if (!s || s.id !== e.pointerId) return;
      const fired = s.fired;
      const abbr = s.abbr;
      clear();
      if (!fired && abbrFrom(e.target) === abbr) onTap(abbr);
    },
    [clear, onTap],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const abbr = abbrFrom(e.target);
      if (!abbr) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (e.shiftKey) onLongPress(abbr);
        else onTap(abbr);
      }
    },
    [onTap, onLongPress],
  );

  const onContextMenu = useCallback((e: { preventDefault: () => void }) => e.preventDefault(), []);

  return {
    pressed,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: clear,
      onPointerLeave: clear,
      onKeyDown,
      onContextMenu,
    },
  };
}
