"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, Flip, prefersReducedMotion } from "@/src/lib/gsap";
import { logo as brandLogo } from "@/src/lib/imageManifest";

const SEEN_KEY = "1zone_intro_seen";

/**
 * Homepage intro choreography (plays once per session, replays on full reload,
 * skippable, and skips instantly under reduced-motion):
 *
 *   1. The logo blurs into view, centered on a black screen.
 *   2. The logo morphs (Flip) from the center into its navbar resting slot , 
 *      and, at the same time, the black screen fades to reveal the hero image,
 *      which blurs in at 70% and then morphs to fill the full viewport.
 *   3. The hero foreground (headline, scroll cue) blurs in, staggered.
 *
 * The hero + foreground live in the page; this component reaches them by id /
 * `[data-hero-fg]`, so it can orchestrate the whole first paint as one timeline.
 */
export default function IntroSequence() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bg = bgRef.current;
    const logoEl = logoRef.current;
    const navLogo = document.getElementById("nav-logo");
    const heroMedia = document.getElementById("hero-media");
    const heroFg = gsap.utils.toArray<HTMLElement>("[data-hero-fg]");

    // Force the page to its final, visible state (used when the intro is
    // skipped or never plays).
    const revealPage = () => {
      if (heroMedia) gsap.set(heroMedia, { opacity: 1, scale: 1, filter: "none" });
      if (heroFg.length) gsap.set(heroFg, { opacity: 1, y: 0, filter: "none" });
    };
    const finish = () => {
      document.body.style.overflow = "";
      navLogo && gsap.set(navLogo, { opacity: 1 });
      setDone(true);
    };

    // Skip if already seen this session, reduced motion, or refs missing.
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (!overlay || !bg || !logoEl || seen || prefersReducedMotion()) {
      revealPage();
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    navLogo && gsap.set(navLogo, { opacity: 0 });
    // Park the hero + foreground in their pre-reveal state (hidden behind the
    // black overlay, so there is no flash before the timeline runs).
    if (heroMedia)
      gsap.set(heroMedia, {
        opacity: 0,
        scale: 0.7,
        filter: "blur(24px)",
        transformOrigin: "50% 50%",
      });
    if (heroFg.length) gsap.set(heroFg, { opacity: 0, y: 28, filter: "blur(12px)" });

    let skipped = false;
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SEEN_KEY, "1");
        finish();
      },
    });

    // 1. Logo blurs in, centered and large.
    tl.fromTo(
      logoEl,
      { opacity: 0, filter: "blur(24px)", scale: 1.04 },
      { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.0, ease: "power3.out" },
    ).to({}, { duration: 0.35 }); // hold

    // 2. Logo morphs into the navbar slot while the hero blurs in (70% → full).
    const MORPH = "morph";
    tl.addLabel(MORPH);
    tl.add(() => {
      if (!navLogo) return;
      const state = Flip.getState(logoEl);
      const navBox = navLogo.getBoundingClientRect();
      // Park the live logo into the navbar position, then Flip from center.
      gsap.set(logoEl, {
        position: "fixed",
        top: navBox.top,
        left: navBox.left,
        width: navBox.width,
        height: navBox.height,
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
      });
      Flip.from(state, { duration: 1.2, ease: "power3.inOut", absolute: true });
    }, MORPH);
    // Fade the black screen away to reveal the hero behind it.
    tl.to(bg, { autoAlpha: 0, duration: 1.0, ease: "power2.inOut" }, MORPH);
    // Hero blurs in at 70%, then morphs to fill the viewport.
    if (heroMedia) {
      tl.to(heroMedia, { opacity: 1, duration: 0.7, ease: "power2.out" }, MORPH).to(
        heroMedia,
        { scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.inOut" },
        MORPH + "+=0.2",
      );
    }

    // 3. Hand the morphing logo off to the real navbar logo.
    tl.to(logoEl, { opacity: 0, duration: 0.4, ease: "power2.out" }, MORPH + "+=1.0");
    tl.add(() => navLogo && gsap.set(navLogo, { opacity: 1 }), MORPH + "+=1.05");

    // 4. Hero foreground blurs in, staggered.
    if (heroFg.length) {
      tl.to(
        heroFg,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.18,
        },
        MORPH + "+=1.15",
      );
    }

    const skip = () => {
      if (skipped) return;
      skipped = true;
      tl.kill();
      revealPage();
      sessionStorage.setItem(SEEN_KEY, "1");
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);

    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center"
      aria-hidden
    >
      {/* The black screen the logo blurs in over; fades away to reveal the
          hero during the morph. */}
      <div ref={bgRef} className="absolute inset-0 bg-black" />
      <div
        ref={logoRef}
        className="relative h-[clamp(2.5rem,9vw,7rem)] overflow-hidden"
        style={{ aspectRatio: "4.6 / 1" }}
      >
        <Image
          src={brandLogo.white.src}
          alt={brandLogo.white.alt}
          fill
          priority
          sizes="(max-width: 768px) 80vw, 640px"
          className="object-cover"
          style={{ objectPosition: "center 47%" }}
        />
      </div>
    </div>
  );
}
