"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, safeContext } from "@/src/lib/gsap";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Extra classes on the <Image> (e.g. opacity utilities). */
  imgClassName?: string;
  /** Parallax travel as a % of the oversize layer. Higher = more drift. */
  strength?: number;
};

/**
 * A full-bleed hero image that drifts slower than the page as it scrolls,
 * producing a parallax effect. The image layer is oversized so the drift never
 * exposes an edge. Falls back to a static image under reduced-motion.
 *
 * The element fills its (relatively positioned, overflow-hidden) parent.
 */
export default function ParallaxImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  imgClassName = "object-cover",
  strength = 14,
}: Props) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || prefersReducedMotion()) return;

    return safeContext(() => {
      gsap.fromTo(
        layer,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: layer.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, layer);
  }, [strength]);

  return (
    <div
      ref={layerRef}
      className="absolute inset-x-0 -top-[20%] h-[140%] will-change-transform"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={imgClassName}
      />
    </div>
  );
}
