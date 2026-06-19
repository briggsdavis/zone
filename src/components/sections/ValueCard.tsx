"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/src/lib/gsap";

type Props = {
  index: string;
  en: string;
  cn: string;
  gloss: string;
  image: { src: string; alt: string };
};

export default function ValueCard({ index, en, cn, gloss, image }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const enter = () => {
    if (prefersReducedMotion()) return;
    gsap.to(ref.current, { y: -6, duration: 0.4, ease: "power3.out" });
  };
  const leave = () => {
    if (prefersReducedMotion()) return;
    gsap.to(ref.current, { y: 0, duration: 0.4, ease: "power3.out" });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="group relative flex flex-col justify-between bg-black p-8 pt-10 transition-colors hover:bg-black-soft"
    >
      <div className="relative mb-12 aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div>
        <span className="eyebrow text-accent">{index}</span>
        <h3 className="mt-3 font-display text-3xl text-white">
          {en} <span className="text-lg text-white-dim">{cn}</span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white-dim">{gloss}</p>
      </div>
    </div>
  );
}
