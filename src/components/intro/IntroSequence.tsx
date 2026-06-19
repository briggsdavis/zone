"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, Flip, prefersReducedMotion } from "@/src/lib/gsap";
import { brand } from "@/src/lib/content";

const SEEN_KEY = "1zone_intro_seen";

/**
 * Homepage intro. A black overlay; the logo blurs in centered, then Flips
 * into the navbar logo slot; the overlay fades to reveal the hero. Plays once
 * per session (sessionStorage), replays on full reload, skippable, and skips
 * instantly under reduced-motion.
 */
export default function IntroSequence() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const navLogo = document.getElementById("nav-logo");

    const finish = () => {
      document.body.style.overflow = "";
      navLogo && gsap.set(navLogo, { opacity: 1 });
      setDone(true);
    };

    // Skip if already seen this session, or reduced motion, or refs missing.
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (!overlay || !logo || seen || prefersReducedMotion()) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    navLogo && gsap.set(navLogo, { opacity: 0 });

    let skipped = false;
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SEEN_KEY, "1");
        finish();
      },
    });

    // 1. Logo blurs in, centered and large.
    tl.fromTo(
      logo,
      { opacity: 0, filter: "blur(24px)", scale: 1.04 },
      { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.0, ease: "power3.out" },
    ).to({}, { duration: 0.3 }); // hold

    // 2. Flip the centered logo into the navbar slot.
    tl.add(() => {
      if (!navLogo) return;
      const state = Flip.getState(logo);
      // Park the live logo into the navbar position, then Flip from center.
      const navBox = navLogo.getBoundingClientRect();
      gsap.set(logo, {
        position: "fixed",
        top: navBox.top,
        left: navBox.left,
        width: navBox.width,
        height: navBox.height,
        fontSize: getComputedStyle(navLogo).fontSize,
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
      });
      Flip.from(state, {
        duration: 1.0,
        ease: "power3.inOut",
        absolute: true,
      });
    });
    tl.to({}, { duration: 1.0 });

    // 3. Fade the overlay out to reveal the hero; reveal the real nav logo.
    tl.to(overlay, { autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.3");
    tl.add(() => navLogo && gsap.set(navLogo, { opacity: 1 }), "<0.4");

    const skip = () => {
      if (skipped) return;
      skipped = true;
      tl.progress(1);
      tl.kill();
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
      aria-hidden
    >
      <div
        ref={logoRef}
        className="font-display text-[clamp(4rem,16vw,12rem)] tracking-[0.1em] text-white"
      >
        {brand.name}
      </div>
    </div>
  );
}
