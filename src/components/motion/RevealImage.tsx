"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, safeContext } from "@/src/lib/gsap";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Add a slow parallax drift to the image as it passes through the viewport. */
  parallax?: boolean;
};

/**
 * Signature image entrance: a black cover panel slides UP (wipe-up) to reveal
 * the image, which eases from scale 1.12 → 1. Optional parallax drift.
 */
export default function RevealImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
  parallax = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cover = coverRef.current;
    const img = imgRef.current;
    if (!wrap || !cover || !img) return;

    if (prefersReducedMotion()) {
      gsap.set(cover, { yPercent: -100 });
      gsap.set(img, { scale: 1 });
      return;
    }

    return safeContext(() => {
      gsap.set(img, { scale: 1.12 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top 82%" },
      });
      tl.to(cover, { yPercent: -100, duration: 1.1, ease: "power4.inOut" })
        .to(img, { scale: 1, duration: 1.3, ease: "power3.out" }, 0.1);

      if (parallax) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, wrap);
  }, [parallax]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imgRef} className="absolute inset-0 h-[116%] -top-[8%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ backgroundColor: "var(--black-soft)" }}
        />
      </div>
      <div ref={coverRef} className="reveal-image-cover" aria-hidden />
    </div>
  );
}
