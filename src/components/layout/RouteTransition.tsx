"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion } from "@/src/lib/gsap";

/**
 * A lightweight route-change transition. On each client navigation it snaps a
 * full-screen blur over the freshly-swapped page, then releases it, so the new
 * page appears to blur into focus rather than cutting in sharply.
 *
 * It uses backdrop-filter on a fixed sibling (not a filter on the content
 * ancestor), so it never disturbs the fixed navbar or any pinned ScrollTrigger.
 * It also visually covers the brief hand-off when landing on the home page.
 */
export default function RouteTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    // Don't run on the very first load, the intro / page entrance owns that.
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Snap to the blurred state over the new page...
    el.classList.remove("is-clearing");
    el.classList.add("is-active");
    // Force a reflow so the subsequent class actually transitions.
    void el.offsetWidth;
    // ...then resolve to clear.
    el.classList.add("is-clearing");

    const t = window.setTimeout(() => {
      el.classList.remove("is-active", "is-clearing");
    }, 800);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return <div ref={ref} aria-hidden className="route-curtain" />;
}
