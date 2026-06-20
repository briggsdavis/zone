"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * This is a fully static marketing site: every route renders cleanly on the
 * server (SSR + RSC all 200). So a client-side navigation error is, in
 * practice, a transient stale-asset problem, the classic "client-side
 * exception" you get when an already-open tab navigates after a new deploy and
 * requests JS chunks / RSC payloads whose hashes no longer exist.
 *
 * The reliable recovery is a hard reload (it pulls the current build). We do
 * that automatically, but bound it: at most twice in 30s. If it still fails
 * after that it is likely a real bug, so we stop reloading and surface the
 * actual error for diagnosis instead of looping.
 */
const KEY = "1zone_nav_recover";
const WINDOW_MS = 30000;
const MAX_RELOADS = 2;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    console.error("[1ZONE] navigation error:", error?.message, error?.digest, error);

    let history: number[] = [];
    try {
      history = JSON.parse(sessionStorage.getItem(KEY) || "[]");
    } catch {
      history = [];
    }
    const now = Date.now();
    history = history.filter((t) => now - t < WINDOW_MS);

    if (history.length < MAX_RELOADS) {
      history.push(now);
      try {
        sessionStorage.setItem(KEY, JSON.stringify(history));
      } catch {
        /* ignore */
      }
      setRecovering(true);
      window.location.reload();
    }
  }, [error]);

  if (recovering) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow text-white-dim">Reconnecting…</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6 text-accent">Something went wrong</p>
      <h1 className="display-section max-w-xl text-white">A momentary glitch.</h1>
      <p className="mt-6 max-w-md text-white-dim">
        The page hit an unexpected error. Please try again, or return home.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="group relative inline-flex items-center justify-center overflow-hidden border border-white/60 px-7 py-3 text-sm uppercase tracking-[0.15em] text-white transition-colors duration-500"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
            Reload
          </span>
        </button>
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.15em] text-white-dim transition-colors hover:text-white"
        >
          Return home →
        </Link>
      </div>
      {/* Diagnostic detail (only shown once auto-recovery has been exhausted). */}
      {(error?.message || error?.digest) && (
        <p className="mt-10 max-w-lg break-words text-xs text-white-dim/60">
          {error.message}
          {error.digest ? ` · ${error.digest}` : ""}
        </p>
      )}
    </main>
  );
}
