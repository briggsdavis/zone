"use client";

import { useEffect, useRef, ElementType } from "react";
import { gsap, prefersReducedMotion, safeContext } from "@/src/lib/gsap";

type Props = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  /** Split into words and stagger (for headings). */
  split?: boolean;
  delay?: number;
};

/**
 * Fade-in + upward translate on scroll into view. Headings (split) stagger
 * word-by-word. No-ops to final state under reduced-motion.
 */
export default function RevealText({
  children,
  as: Tag = "div",
  className = "",
  split = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    return safeContext(() => {
      const targets = split
        ? el.querySelectorAll("[data-word]")
        : [el];

      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        targets,
        { yPercent: split ? 110 : 0, y: split ? 0 : 24, opacity: split ? 1 : 0 },
        {
          yPercent: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: split ? 0.08 : 0,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
    }, el);
  }, [split, delay]);

  // Word-splitting wrapper preserves spaces and gives each word a clip mask.
  const content =
    split && typeof children === "string"
      ? children.split(" ").map((word, i) => (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          >
            <span data-word style={{ display: "inline-block" }}>
              {word}
            </span>
            {" "}
          </span>
        ))
      : children;

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className} data-reveal>
      {content}
    </Tag>
  );
}
