"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/src/lib/gsap";

export type TimelineNode = { n: string; title: string; body: string };

/**
 * A centered vertical timeline. The connecting line runs down the middle and
 * FILLS with --accent as you scroll (ScrollTrigger scrub). Each checkpoint sits
 * on the line; its copy alternates left / right and illuminates as it enters
 * view, and the checkpoint marker grows as you reach it.
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
            start: "top 55%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      root.querySelectorAll("[data-node]").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 65%",
          onEnter: () => node.classList.add("is-active"),
          onLeaveBack: () => node.classList.remove("is-active"),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto max-w-5xl">
      {/* centre track (centred via negative margin so GSAP's transform on the
          fill never fights a translate) */}
      <div
        className="absolute bottom-0 top-0 left-6 w-px bg-line md:left-1/2"
        style={{ marginLeft: "-0.5px" }}
      />
      {/* centre fill */}
      <div
        ref={fillRef}
        className="absolute bottom-0 top-0 left-6 w-px origin-top bg-accent md:left-1/2"
        style={{ marginLeft: "-0.5px" }}
      />

      <ol className="space-y-28 md:space-y-44">
        {nodes.map((node, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={node.n}
              data-node
              className="timeline-node relative md:grid md:grid-cols-2 md:items-center md:gap-20"
            >
              {/* checkpoint marker, on the centre line */}
              <span className="timeline-dot absolute left-6 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-black md:left-1/2">
                <span className="dot-core h-2 w-2 rounded-full bg-line" />
              </span>

              <div
                className={`timeline-text pl-16 md:pl-0 ${
                  left
                    ? "md:col-start-1 md:pr-20 md:text-right"
                    : "md:col-start-2 md:pl-20 md:text-left"
                }`}
              >
                <span className="font-display text-3xl text-accent md:text-4xl">
                  {node.n}
                </span>
                <h3 className="mt-2 font-display text-xl text-white md:text-2xl">
                  {node.title}
                </h3>
                <p
                  className={`mt-3 text-white-dim ${
                    left ? "md:ml-auto" : ""
                  } max-w-md`}
                >
                  {node.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
