"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import RevealImage from "@/src/components/motion/RevealImage";
import { projects } from "@/src/lib/content";
import { projectImage } from "@/src/lib/imageManifest";

const FILTERS = ["All", "Completed", "In Progress", "Upcoming"] as const;
type Filter = (typeof FILTERS)[number];

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);

  const visible = projects.filter(
    (p) => filter === "All" || p.status === filter,
  );

  // Lock scroll + ESC close for the detail modal.
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      {/* Filter */}
      <div className="mb-14 flex flex-wrap gap-x-8 gap-y-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`text-sm uppercase tracking-[0.15em] transition-colors ${
              filter === f ? "text-accent" : "text-white-dim hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid, mixed sizes */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-6">
        {visible.map((p, i) => {
          // Dynamic-ish sizing pattern.
          const span =
            i % 5 === 0
              ? "lg:col-span-4"
              : i % 5 === 3
                ? "lg:col-span-2"
                : "lg:col-span-3";
          const ratio = i % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/5]";
          return (
            <button
              key={p.slug}
              id={p.slug}
              onClick={() => setActive(p)}
              className={`group block scroll-mt-32 text-left ${span}`}
            >
              <div className="overflow-hidden">
                <RevealImage
                  src={projectImage[p.slug].src}
                  alt={projectImage[p.slug].alt}
                  className={`${ratio} w-full transition-transform duration-700 group-hover:scale-[1.03]`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl text-white transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <span className="shrink-0 text-xs uppercase tracking-[0.15em] text-accent">
                  {p.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-white-dim">
                {p.type} · {p.location}
                {p.area ? ` · ${p.area}` : ""}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-full w-full max-w-5xl overflow-y-auto bg-black-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 text-sm uppercase tracking-[0.15em] text-white-dim hover:text-white"
            >
              Close ✕
            </button>
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={projectImage[active.slug].src}
                alt={projectImage[active.slug].alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <span className="eyebrow text-accent">{active.status}</span>
              <h2 className="mt-3 font-display text-4xl text-white">
                {active.name}
              </h2>
              <p className="mt-2 text-white-dim">
                {active.type} · {active.location}
                {active.area ? ` · ${active.area}` : ""}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white-dim">
                {active.blurb}
              </p>
              <p className="mt-8 text-xs text-white-dim">
                {/* Galleries are placeholders pending client-supplied photography. */}
                Additional photography to be provided by the client.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
