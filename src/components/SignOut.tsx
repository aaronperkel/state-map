"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignOut() {
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

  return (
    <button type="button" className="signout" onClick={exit} disabled={leaving}>
      {leaving ? "Signing out…" : "Sign out"}
    </button>
  );
}
