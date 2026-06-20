// Register GSAP plugins exactly once, client-side.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

export const EASE = "power3.out"; // expo-out feel, matches --ease token
export const DUR = { micro: 0.4, standard: 0.8, dramatic: 1.2 } as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Run a gsap.context with full error isolation. Animations are an enhancement;
 * a failure in setup or revert (e.g. a stale ScrollTrigger during a route
 * change) must never bubble up and crash the React tree. Returns a cleanup
 * suitable for returning directly from useEffect.
 */
export function safeContext(
  setup: () => void,
  scope?: Element | null,
): () => void {
  if (typeof window === "undefined") return () => {};
  let ctx: ReturnType<typeof gsap.context> | undefined;
  try {
    ctx = gsap.context(setup, scope ?? undefined);
  } catch (err) {
    console.warn("[gsap] setup failed:", err);
  }
  return () => {
    try {
      ctx?.revert();
    } catch (err) {
      console.warn("[gsap] revert failed:", err);
    }
  };
}

/** Run arbitrary motion code with error isolation. */
export function safeRun(fn: () => void): void {
  try {
    fn();
  } catch (err) {
    console.warn("[gsap] run failed:", err);
  }
}

export { gsap, ScrollTrigger, Flip };
