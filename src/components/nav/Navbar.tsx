"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMenu } from "./MenuContext";
import BorderButton from "@/src/components/ui/BorderButton";
import Logo from "@/src/components/brand/Logo";

export default function Navbar() {
  const { open, toggle } = useMenu();
  const [hidden, setHidden] = useState(false);

  // Hide the bar on downward scroll, reveal it the moment the user scrolls up.
  // Always visible near the very top.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the bar in view whenever the menu is open.
  const isHidden = hidden && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-10">
        {/* Hamburger (top-left) */}
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          data-hero-fg
          className="group relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] transition-all duration-300 hover:gap-[9px]"
        >
          {/* Helper hover hint: the two bars morph asymmetrically to signal the
              control is interactive (suppressed once the menu is open / an X). */}
          <span
            className={`block h-px bg-white transition-all duration-300 ${
              open
                ? "w-7 translate-y-[3.5px] rotate-45"
                : "w-7 origin-left group-hover:w-4"
            }`}
          />
          <span
            className={`block h-px bg-white transition-all duration-300 ${
              open
                ? "w-7 -translate-y-[3.5px] -rotate-45"
                : "w-7 origin-right group-hover:w-5"
            }`}
          />
        </button>

        {/* Center logo, Flip morph target for the intro. The site is dark, so
            the white lockup is used to stay legible against it. */}
        <Link
          href="/"
          id="nav-logo"
          className="inline-flex items-center"
          aria-label="1ZONE home"
        >
          <Logo variant="white" className="h-6 md:h-7" priority />
        </Link>

        {/* Contact (top-right), the site-wide bordered button. */}
        <div data-hero-fg className="flex w-10 justify-end md:w-auto">
          <BorderButton
            href="/contact"
            label="Contact"
            className="hidden md:inline-flex"
          />
        </div>
      </div>
    </header>
  );
}
