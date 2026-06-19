"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useMenu } from "./MenuContext";
import { gsap, prefersReducedMotion } from "@/src/lib/gsap";
import { nav, brand, contact } from "@/src/lib/content";

export default function MenuOverlay() {
  const { open, close } = useMenu();
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

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
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pb-12 pt-28 md:px-10">
        <nav>
          <ul ref={linksRef} className="space-y-1">
            {nav.map((item) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={close}
                  data-menu-link
                  className="group flex items-baseline gap-4 py-1"
                >
                  <span className="eyebrow text-accent">{item.index}</span>
                  <span className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] text-white transition-colors duration-300 group-hover:text-accent">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-sm text-white-dim md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm">
            {brand.tagline} {brand.scarcity}
          </p>
          <p>
            {/* PLACEHOLDER contact — client to provide */}
            {contact.email}
          </p>
        </div>
      </div>
    </div>
  );
}
