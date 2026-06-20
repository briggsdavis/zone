"use client";

import { useEffect } from "react";

/**
 * Top-level fallback for errors thrown in the root layout itself. Renders its
 * own <html>/<body>. Kept intentionally minimal and dependency-free.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[1ZONE] root error:", error?.message, error?.digest, error);
    // Recover from transient/stale-asset errors with a bounded hard reload.
    try {
      const KEY = "1zone_root_recover";
      const now = Date.now();
      let history: number[] = JSON.parse(sessionStorage.getItem(KEY) || "[]");
      history = history.filter((t) => now - t < 30000);
      if (history.length < 2) {
        history.push(now);
        sessionStorage.setItem(KEY, JSON.stringify(history));
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f5f3ef",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 400 }}>
          A momentary glitch.
        </h1>
        <p style={{ opacity: 0.65, maxWidth: "28rem" }}>
          The page hit an unexpected error. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.75rem",
            border: "1px solid rgba(245,243,239,0.6)",
            background: "transparent",
            color: "#f5f3ef",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
