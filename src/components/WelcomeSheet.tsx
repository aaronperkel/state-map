"use client";

import { useEffect, useRef, useState } from "react";
import { STATE_BY_ABBR } from "@/lib/states";
import {
  AARON,
  RILEY,
  TOGETHER,
  NOTE_MAX,
  has,
  toggleBit,
  type Mark,
  type StateEntry,
} from "@/lib/marks";

type Props = {
  abbr: string | null;
  entry: StateEntry | undefined;
  onClose: () => void;
  onPatch: (abbr: string, change: { mark?: Mark; note?: string }) => Promise<boolean>;
};

function Status({ mark }: { mark: Mark }) {
  if (mark === 7) {
    return (
      <>
        You&rsquo;ve been here <strong>together</strong>.
      </>
    );
  }
  if (mark === 3) {
    return (
      <>
        <strong>Both of you</strong> have been here, on separate trips.
      </>
    );
  }
  if (mark === 0) return <>Nobody yet.</>;
  return (
    <>
      Just <strong>{mark === 1 ? "Aaron" : "Riley"}</strong> so far.
    </>
  );
}

export function WelcomeSheet({ abbr, entry, onClose, onPatch }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  // Mounted fresh per state (keyed on abbr by the parent), so the draft starts from the saved note.
  const [draft, setDraft] = useState(entry?.note ?? "");
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const latest = useRef({ abbr, draft, note: entry?.note ?? "" });
  useEffect(() => {
    latest.current = { abbr, draft, note: entry?.note ?? "" };
  });

  // Open / close the native dialog with the abbr.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abbr && !d.open) {
      d.showModal();
    } else if (!abbr && d.open) {
      d.close();
    }
  }, [abbr]);

  async function saveNote(): Promise<boolean> {
    const { abbr: a, draft: text, note } = latest.current;
    if (!a) return true;
    const trimmed = text.trim().slice(0, NOTE_MAX);
    if (trimmed === note) return true;
    setSaving("saving");
    const ok = await onPatch(a, { note: trimmed });
    setSaving(ok ? "saved" : "failed");
    return ok;
  }

  async function done() {
    const ok = await saveNote();
    if (ok) onClose();
  }

  const state = abbr ? STATE_BY_ABBR[abbr] : null;
  const mark: Mark = entry?.mark ?? 0;

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="sheet-name"
      onClose={() => {
        void saveNote();
        onClose();
      }}
      onCancel={(e) => {
        e.preventDefault();
        void done();
      }}
      onClick={(e) => {
        // click on the backdrop (outside the panel) closes
        if (e.target === ref.current) void done();
      }}
    >
      {state && (
        <div className="card sheet__panel">
          <h2 id="sheet-name" className="sheet__name">
            {state.name}
          </h2>

          <div className="sheet__toggles" role="group" aria-label="Who has been here">
            <button
              type="button"
              className="toggle toggle--aaron"
              aria-pressed={has(mark, AARON)}
              onClick={() => void onPatch(state.abbr, { mark: toggleBit(mark, AARON) })}
            >
              Aaron
              <span className="toggle__mark" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="toggle toggle--riley"
              aria-pressed={has(mark, RILEY)}
              onClick={() => void onPatch(state.abbr, { mark: toggleBit(mark, RILEY) })}
            >
              Riley
              <span className="toggle__mark" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="toggle toggle--together"
              aria-pressed={has(mark, TOGETHER)}
              onClick={() => void onPatch(state.abbr, { mark: toggleBit(mark, TOGETHER) })}
            >
              Together
              <span className="toggle__mark" aria-hidden="true" />
            </button>
          </div>
          <p className="sheet__both" aria-live="polite">
            <Status mark={mark} />
          </p>

          <div className="sheet__note">
            <label className="sheet__label" htmlFor="sheet-note">
              <span>Note</span>
              <output aria-live="off">
                {draft.length}/{NOTE_MAX}
              </output>
            </label>
            <textarea
              id="sheet-note"
              className="sheet__textarea"
              value={draft}
              maxLength={NOTE_MAX}
              rows={2}
              placeholder="The trip, the year, the diner…"
              enterKeyHint="done"
              onChange={(e) => {
                setDraft(e.target.value);
                if (saving !== "idle") setSaving("idle");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void done();
                }
              }}
            />
          </div>

          <div className="sheet__actions">
            <span className="sheet__status" role="status">
              {saving === "saving" && "Saving…"}
              {saving === "saved" && "Saved"}
              {saving === "failed" && "Couldn't save. Try again."}
            </span>
            <button type="button" className="btn btn--primary" onClick={() => void done()}>
              Done
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
