"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MapData } from "@/lib/marks";
import { counts } from "@/lib/marks";
import { STATE_ABBRS } from "@/lib/states";
import { ArrowRight } from "./Icons";

export function GuideSign({ states, ready }: { states: MapData; ready: boolean }) {
  const c = counts(states);
  const total = STATE_ABBRS.length;
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  async function exit() {
    setLeaving(true);
    try {
      await fetch("/api/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  const n = (v: number) => (ready ? String(v) : "–");

  return (
    <header className="sign guide" aria-label="Legend and counts">
      <div className="guide__head">
        <div>
          <h1 className="guide__title">Aaron &amp; Riley</h1>
          <p className="guide__sub">States we&rsquo;ve been to</p>
        </div>
        <button type="button" className="plaque guide__exit" onClick={exit} disabled={leaving}>
          {leaving ? "Leaving" : "Exit"}
          <ArrowRight />
        </button>
      </div>

      <ul className="guide__rows">
        <li className="guide__row">
          <span className="guide__swatch guide__swatch--blue" aria-hidden="true" />
          <span>Aaron</span>
          <span className="guide__count">
            {n(c.aaron)} <small>of {total}</small>
          </span>
        </li>
        <li className="guide__row">
          <span className="guide__swatch guide__swatch--red" aria-hidden="true" />
          <span>Riley</span>
          <span className="guide__count">
            {n(c.riley)} <small>of {total}</small>
          </span>
        </li>
        <li className="guide__row">
          <span className="guide__swatch guide__swatch--white" aria-hidden="true" />
          <span>Both</span>
          <span className="guide__count">
            {n(c.both)} <small>of {total}</small>
          </span>
        </li>
      </ul>

      <div className="guide__rule" aria-hidden="true" />
      <div className="guide__foot">
        <span>Tap a state to light it</span>
        <span>
          {n(c.any)} lit
        </span>
      </div>
    </header>
  );
}
