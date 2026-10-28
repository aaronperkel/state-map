"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "./Icons";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong" | "offline">("idle");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // CSS masking (-webkit-text-security) is WebKit/Blink only. Where it is
  // unsupported (Firefox), fall back to a real password field so the word is
  // never shown in cleartext; those browsers have no Apple Passwords prompt.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const masked =
      typeof CSS !== "undefined" && CSS.supports?.("-webkit-text-security", "disc");
    if (!masked) el.type = "password";
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setState("checking");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "same-origin",
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
        return;
      }
      setState("wrong");
    } catch {
      setState("offline");
    }
  }

  const error =
    state === "wrong"
      ? "Wrong way. That's not the password."
      : state === "offline"
        ? "Can't reach the road right now. Try again."
        : null;

  return (
    <form className="sign login__sign" onSubmit={submit} noValidate>
      <h1 className="login__title">Aaron &amp; Riley</h1>
      <p className="login__sub">States we&rsquo;ve been to. Say the word to get on the road.</p>

      <label className="login__label" htmlFor="pw">
        Group password
      </label>
      <div className="login__row">
        {/* A masked text field, not type=password, so Apple Passwords and other
            managers don't offer to fill or save a shared group word. */}
        <input
          ref={inputRef}
          id="pw"
          className="login__input"
          type="text"
          name="group-word"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          autoFocus
          value={password}
          aria-invalid={state === "wrong"}
          aria-describedby={error ? "pw-error" : undefined}
          onChange={(e) => {
            setPassword(e.target.value);
            if (state !== "idle") setState("idle");
          }}
        />
        <button
          type="submit"
          className="plaque plaque--white login__enter"
          disabled={state === "checking" || !password.trim()}
        >
          {state === "checking" ? "Checking" : "Enter"}
          <ArrowRight />
        </button>
      </div>

      <div
        id="pw-error"
        className="plaque plaque--red login__error"
        role="alert"
        hidden={!error}
      >
        {error}
      </div>
    </form>
  );
}
