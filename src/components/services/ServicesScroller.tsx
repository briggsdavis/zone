"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services } from "@/src/lib/content";
import { images } from "@/src/lib/imageManifest";

// One image per service, in the same order as `services`.
const serviceImages = [
  images.services.turnkey,
  images.services.construction,
  images.services.design,
  images.services.furnishing,
  images.services.roofing,
  images.services.facades,
];

/**
 * Services as a sticky-image scroller: the image stays pinned on the left while
 * the service copy scrolls on the right. Each image only sharpens (de-blurs)
 * and replaces the last once you have scrolled past — "cleared" — the current
 * service's text. Each service expands to reveal two sentences of detail.
 */
export default function ServicesScroller() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            setActive(i);
          }
        });
      },
      // A narrow band across the middle: the image swaps as the next service's
      // text reaches centre, i.e. once the current one has been cleared.
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    blocksRef.current.forEach((b) => b && obs.observe(b));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
      {/* Sticky image column. */}
      <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black-soft md:aspect-auto md:h-[78vh]">
          {serviceImages.map((img, i) => (
            <Image
              key={img.src + i}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-all duration-[900ms] ease-out ${
                active === i
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-105 opacity-0 blur-xl"
              }`}
            />
          ))}
          {/* Index marker */}
          <div className="absolute bottom-6 left-6 z-10 font-display text-sm text-white/80">
            {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Scrolling text column. */}
      <div>
        {services.map((s, i) => (
          <div
            key={s.key}
            data-index={i}
            ref={(el) => {
              blocksRef.current[i] = el;
            }}
            className="flex min-h-[78vh] flex-col justify-center border-b border-line py-16 first:border-t"
          >
            <span className="eyebrow mb-5 text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="font-display text-3xl leading-tight text-white md:text-4xl">
              {s.title}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white-dim">
              {s.body}
            </p>

            <ul className="mt-7 space-y-2">
              {s.points.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-sm leading-relaxed text-white-dim"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* Expandable two-sentence elaboration. */}
            <button
              type="button"
              onClick={() => setExpanded(expanded === i ? null : i)}
              aria-expanded={expanded === i}
              className="group mt-8 inline-flex items-center gap-3 self-start text-xs uppercase tracking-[0.18em] text-white transition-colors hover:text-accent"
            >
              {expanded === i ? "Less" : "Read more"}
              <span
                className={`relative h-3 w-3 transition-transform duration-500 ${
                  expanded === i ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                gridTemplateRows: expanded === i ? "1fr" : "0fr",
                opacity: expanded === i ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="mt-6 max-w-md text-base leading-relaxed text-white-dim">
                  {s.more}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
