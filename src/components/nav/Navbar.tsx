"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMenu } from "./MenuContext";
import TextSwapButton from "@/src/components/motion/TextSwapButton";
import Logo from "@/src/components/brand/Logo";

export default function Navbar() {
  const { open, toggle } = useMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-black/70 backdrop-blur-md"
          : "border-b border-transparent"
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

        {/* Center logo — Flip morph target for the intro. The site is dark, so
            the white lockup is used to stay legible against it. */}
        <Link
          href="/"
          id="nav-logo"
          className="inline-flex items-center"
          aria-label="1ZONE home"
        >
          <Logo variant="white" className="h-6 md:h-7" priority />
        </Link>

        {/* Contact (top-right) */}
        <div data-hero-fg className="flex w-10 justify-end md:w-auto">
          <TextSwapButton
            href="/contact"
            label="Contact"
            underline={false}
            className="hidden text-sm uppercase tracking-[0.15em] md:flex"
          />
        </div>
      </div>
    </header>
  );
}
