"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/src/lib/gsap";

type Props = {
  href: string;
  label: string;
  className?: string;
  underline?: boolean;
  /** Wrap the label in a thin hairline box (used for section-link chips). */
  boxed?: boolean;
};

/**
 * Hover: the label scrolls up while a duplicate scrolls in from below.
 * Optional accent underline draws in from the left.
 */
export default function TextSwapButton({
  href,
  label,
  className = "",
  underline = true,
  boxed = false,
}: Props) {
  const stackRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const enter = () => {
    if (prefersReducedMotion()) return;
    gsap.to(stackRef.current, { yPercent: -50, duration: 0.5, ease: "power3.out" });
    if (lineRef.current)
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.5, ease: "power3.out" });
  };
  const leave = () => {
    if (prefersReducedMotion()) return;
    gsap.to(stackRef.current, { yPercent: 0, duration: 0.5, ease: "power3.out" });
    if (lineRef.current)
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.5, ease: "power3.out" });
  };

  // Boxed chips draw their own border and never carry the underline.
  const showUnderline = underline && !boxed;
  const boxClasses = boxed
    ? "border border-line px-5 py-3 transition-colors hover:border-accent"
    : "";

  return (
    <Link
      href={href}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      className={`group relative inline-flex flex-col ${boxClasses} ${className}`}
    >
      <span className="textswap-clip">
        <span ref={stackRef} className="textswap-stack">
          <span className="block">{label}</span>
          <span className="block" aria-hidden>
            {label}
          </span>
        </span>
      </span>
      {showUnderline && (
        <span
          ref={lineRef}
          aria-hidden
          className="mt-1 block h-px origin-left scale-x-0 bg-accent"
        />
      )}
    </Link>
  );
}
