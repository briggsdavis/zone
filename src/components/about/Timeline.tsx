"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/src/lib/gsap";

export type TimelineNode = { n: string; title: string; body: string };

/**
 * A vertical timeline whose connecting line FILLS with --accent as you scroll
 * (ScrollTrigger scrub), and whose nodes activate/glow as they enter view.
 */
export default function Timeline({ nodes }: { nodes: TimelineNode[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    if (prefersReducedMotion()) {
      gsap.set(fill, { scaleY: 1 });
      root.querySelectorAll("[data-node]").forEach((n) =>
        n.classList.add("is-active"),
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        },
      );

      root.querySelectorAll("[data-node]").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 70%",
          onEnter: () => node.classList.add("is-active"),
          onLeaveBack: () => node.classList.remove("is-active"),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative pl-10 md:pl-16">
      {/* track */}
      <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-[11px]" />
      {/* fill */}
      <div
        ref={fillRef}
        className="absolute left-[7px] top-2 w-px origin-top bg-accent md:left-[11px]"
        style={{ bottom: 0 }}
      />
      <ol className="space-y-14">
        {nodes.map((node) => (
          <li key={node.n} data-node className="timeline-node relative">
            <span className="timeline-dot absolute -left-10 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-line bg-black md:-left-16">
              <span className="dot-core h-1.5 w-1.5 rounded-full bg-line transition-all duration-500" />
            </span>
            <div className="flex flex-col gap-2 md:flex-row md:gap-8">
              <span className="font-display text-2xl text-accent md:w-16">
                {node.n}
              </span>
              <div className="md:flex-1">
                <h3 className="font-display text-xl text-white md:text-2xl">
                  {node.title}
                </h3>
                <p className="mt-2 max-w-xl text-white-dim">{node.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
