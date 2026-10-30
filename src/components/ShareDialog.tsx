"use client";

import { useEffect, useRef, useState } from "react";
import { counts, type MapData } from "@/lib/marks";
import { CARD_FILE_NAME, renderCard } from "@/lib/render-card";
import { nunito } from "@/app/fonts";
import { Close, Share } from "./Icons";

type Props = { open: boolean; states: MapData; onClose: () => void };

type Phase =
  | { kind: "rendering" }
  | { kind: "ready"; file: File; url: string; canShare: boolean }
  | { kind: "failed" };

export function ShareDialog({ open, states, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<Phase>({ kind: "rendering" });
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  // Render the card as soon as the dialog opens, so the Share button can call
  // navigator.share synchronously inside its own click (WebKit requires it).
  // The parent remounts this component per open, so `phase` starts fresh.
  // A re-render (the other phone changed something while this is open) swaps
  // the preview only once the new card is ready.
  const urlRef = useRef<string | null>(null);
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    renderCard(states, nunito.style.fontFamily)
      .then((blob) => {
        if (cancelled) return;
        const file = new File([blob], CARD_FILE_NAME, { type: "image/png" });
        const url = URL.createObjectURL(blob);
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = url;
        const canShare =
          typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
        setPhase({ kind: "ready", file, url, canShare });
      })
      .catch(() => {
        if (!cancelled) setPhase({ kind: "failed" });
      });
    return () => {
      cancelled = true;
    };
  }, [open, states]);
  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  function share() {
    if (phase.kind !== "ready" || sharing) return;
    setSharing(true);
    navigator
      .share({ files: [phase.file] })
      .catch(() => {
        /* dismissed, or the target refused the file */
      })
      .finally(() => setSharing(false));
  }

  const c = counts(states);
  const alt = `Map of the United States. Aaron ${c.aaron}, Riley ${c.riley}, both ${c.both}, together ${c.together}.`;

  return (
    <dialog
      ref={ref}
      className="sheet share"
      aria-labelledby="share-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="card sheet__panel share__card">
        <div className="share__head">
          <h2 id="share-title" className="share__title">
            Share
          </h2>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <Close />
          </button>
        </div>

        <div className="share__frame">
          {phase.kind === "ready" ? (
            // A blob URL made moments ago; next/image has nothing to optimize here.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="share__preview" src={phase.url} alt={alt} />
          ) : (
            <p className="share__status" role="status">
              {phase.kind === "rendering" ? "Making your card…" : "Couldn't make the card. Try again."}
            </p>
          )}
        </div>

        {phase.kind === "ready" && (
          <div className="share__actions">
            <a
              className={`btn${phase.canShare ? "" : " btn--primary"}`}
              href={phase.url}
              download={CARD_FILE_NAME}
            >
              Save image
            </a>
            {phase.canShare && (
              <button type="button" className="btn btn--primary" onClick={share} disabled={sharing}>
                <Share />
                {sharing ? "Sharing…" : "Share"}
              </button>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}
