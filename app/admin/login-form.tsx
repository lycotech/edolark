"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(login, null);

  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state, router]);

  return (
    <div className="admin-login">
      <form action={action} className="admin-card">
        <p className="admin-eyebrow">EDOLARK LTD</p>
        <h1>Site admin</h1>
        {!configured && (
          <p className="admin-note admin-note--warn">
            Admin is not set up yet. Add the <strong>ADMIN_PASSWORD</strong> environment variable in Vercel (see SETUP-ADMIN.md), then redeploy.
          </p>
        )}
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required disabled={!configured} autoFocus />
        </label>
        {state && !state.ok && <p className="admin-note admin-note--error" role="alert">{state.error}</p>}
        <button className="admin-btn admin-btn--primary" type="submit" disabled={pending || !configured}>
          {pending ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
