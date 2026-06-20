"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, safeContext } from "@/src/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Stagger direct children instead of the element itself. */
  staggerChildren?: boolean;
  y?: number;
};

/** Generic fade/translate reveal for any block. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  staggerChildren = false,
  y = 28,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      if (staggerChildren) gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }

    return safeContext(() => {
      gsap.set(el, { opacity: 1 });
      const targets = staggerChildren ? el.children : el;
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay,
          stagger: staggerChildren ? 0.1 : 0,
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
    }, el);
  }, [delay, staggerChildren, y]);

  return (
    <div ref={ref} className={className} data-reveal>
      {children}
    </div>
  );
}
