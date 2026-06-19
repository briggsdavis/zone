"use client";

import { brand } from "@/src/lib/content";

export default function ScrollCue() {
  return (
    <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3">
      <span className="eyebrow text-white-dim">{brand.scrollCue}</span>
      <span className="relative block h-12 w-px overflow-hidden bg-line">
        <span className="scroll-cue-line absolute inset-x-0 top-0 h-1/2 bg-accent" />
      </span>
    </div>
  );
}
