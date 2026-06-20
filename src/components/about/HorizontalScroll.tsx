"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, safeRun } from "@/src/lib/gsap";
import { values } from "@/src/lib/content";
import { images } from "@/src/lib/imageManifest";

/**
 * A pinned horizontal-scroll beat: vertical scroll is translated into
 * horizontal movement of a 4-panel track (the four values). On mobile / reduced
 * motion it falls back to a normal vertical stack.
 */
export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Only pin/scrub on larger screens with motion allowed.
    safeRun(() =>
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const amount = track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: -amount,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${amount}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      ),
    );

    return () => safeRun(() => mm.revert());
  }, []);

  const panelImages = images.about.horizontal;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-line"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:h-screen md:flex-row md:flex-nowrap"
      >
        {values.map((v, i) => (
          <article
            key={v.en}
            className="relative flex h-[80vh] w-full shrink-0 items-end overflow-hidden md:h-screen md:w-screen"
          >
            <Image
              src={panelImages[i].src}
              alt={panelImages[i].alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="relative z-10 w-full px-6 pb-16 md:px-16">
              <span className="eyebrow text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-display text-[clamp(3rem,7vw,7rem)] leading-none text-white">
                {v.en} <span className="text-2xl text-white-dim">{v.cn}</span>
              </h3>
              <p className="mt-5 max-w-md text-lg text-white-dim">{v.gloss}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
