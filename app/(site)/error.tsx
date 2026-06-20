"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Errors whose root cause is a stale/missing JS chunk (the usual culprit for a
 * "client-side exception" when navigating after a new deploy: the open tab still
 * points at the previous build's chunk hashes). A one-time hard reload pulls the
 * current build and clears it.
 */
function isChunkLoadError(error?: Error & { digest?: string }): boolean {
  if (!error) return false;
  const text = `${error.name} ${error.message} ${error.digest ?? ""}`;
  return /ChunkLoadError|Loading chunk|Loading CSS chunk|dynamically imported module|Importing a module script failed|error loading dynamically imported module|Failed to fetch/i.test(
    text,
  );
}

const RELOAD_KEY = "1zone_chunk_reload_at";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    if (isChunkLoadError(error)) {
      // Guard against reload loops: only auto-reload once per 12s.
      let last = 0;
      try {
        last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
      } catch {
        /* sessionStorage may be unavailable */
      }
      if (Date.now() - last > 12000) {
        try {
          sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        } catch {
          /* ignore */
        }
        window.location.reload();
      }
    }
  }, [error]);

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
          onClick={() => {
            // A hard reload reliably recovers from stale chunks; fall back to
            // the soft reset for everything else.
            if (isChunkLoadError(error)) window.location.reload();
            else reset();
          }}
          className="group relative inline-flex items-center justify-center overflow-hidden border border-white/60 px-7 py-3 text-sm uppercase tracking-[0.15em] text-white transition-colors duration-500"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
            Try again
          </span>
        </button>
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.15em] text-white-dim transition-colors hover:text-white"
        >
          Return home →
        </Link>
      </div>
    </main>
  );
}
