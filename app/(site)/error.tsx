"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Catches client-side exceptions during render /
 * navigation so the user sees a graceful recovery panel instead of the bare
 * "Application error" screen, with a one-tap retry.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the real error in the console for diagnosis.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6 text-accent">Something went wrong</p>
      <h1 className="display-section max-w-xl text-white">
        A momentary glitch.
      </h1>
      <p className="mt-6 max-w-md text-white-dim">
        The page hit an unexpected error. Please try again, or return home.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="group relative inline-flex items-center justify-center overflow-hidden border border-white/60 px-7 py-3 text-sm uppercase tracking-[0.15em] text-white transition-colors duration-500"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 scale-105 bg-white opacity-0 blur-md transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-hover:blur-0"
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
