"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useMenu } from "./MenuContext";
import { gsap, prefersReducedMotion } from "@/src/lib/gsap";
import { nav } from "@/src/lib/content";
import { images } from "@/src/lib/imageManifest";

// A distinct preview image per page, surfaced on hover/focus of its link.
const previews: Record<string, { src: string; alt: string }> = {
  "/": images.home.hero,
  "/about": images.about.hero,
  "/services": images.services.turnkey,
  "/craftsmanship": images.craft.hero,
  "/portfolio": images.portfolio.youJing,
  "/contact": images.contact.hero,
};

export default function MenuOverlay() {
  const { open, close } = useMenu();
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string>(nav[0].href);

  // ESC to close + scroll lock + focus management.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
  }, [open, close]);

  // Reset the preview to the first page each time the menu opens.
  useEffect(() => {
    if (open) setActive(nav[0].href);
  }, [open]);

  // Animate panel + stagger links.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (prefersReducedMotion()) {
      gsap.set(panel, { autoAlpha: open ? 1 : 0 });
      return;
    }
    const links = linksRef.current?.querySelectorAll("[data-menu-link]") ?? [];
    if (open) {
      gsap.set(panel, { display: "block" });
      gsap.fromTo(
        panel,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
      );
      gsap.fromTo(
        links,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.25,
        },
      );
    } else {
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      className="fixed inset-0 z-40 hidden bg-black"
      style={{ display: "none" }}
    >
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-1 items-center gap-12 px-6 pb-12 pt-28 md:grid-cols-2 md:px-10">
        <nav>
          <ul ref={linksRef} className="space-y-1">
            {nav.map((item) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={close}
                  onMouseEnter={() => setActive(item.href)}
                  onFocus={() => setActive(item.href)}
                  data-menu-link
                  className="group flex items-baseline gap-3 py-1"
                >
                  <span className="eyebrow text-accent">{item.index}</span>
                  <span className="font-display text-[clamp(1.25rem,4vw,3rem)] leading-[1.1] text-white transition-colors duration-300 group-hover:text-accent">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hover preview — a different image per page, blurring between states. */}
        <div className="relative hidden h-full max-h-[70vh] overflow-hidden md:block">
          {nav.map((item) => {
            const img = previews[item.href];
            if (!img) return null;
            const on = active === item.href;
            return (
              <Image
                key={item.href}
                src={img.src}
                alt={img.alt}
                fill
                sizes="45vw"
                className={`object-cover transition-all duration-700 ease-out ${
                  on ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-2xl"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
