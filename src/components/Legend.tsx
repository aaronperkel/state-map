import { counts, type MapData } from "@/lib/marks";
import { STATE_ABBRS } from "@/lib/states";

const ROWS = [
  { key: "aaron", cls: "legend__item--aaron", label: "Aaron" },
  { key: "riley", cls: "legend__item--riley", label: "Riley" },
  { key: "both", cls: "legend__item--both", label: "Both" },
  { key: "together", cls: "legend__item--together", label: "Together" },
] as const;

/** Four pills: swatch, name, count. The only legend on screen. */
export function Legend({ states, ready }: { states: MapData; ready: boolean }) {
  const c = counts(states);
  const total = STATE_ABBRS.length;
  return (
    <ul className="legend" aria-label="Legend and counts">
      {ROWS.map((row) => (
        <li key={row.key} className={`legend__item ${row.cls}`}>
          <span className="legend__swatch" aria-hidden="true" />
          <span className="legend__name">{row.label}</span>
          <span className="legend__count">
            {ready ? c[row.key] : "–"}
            <span className="sr-only"> of {total}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
