"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMenu } from "./MenuContext";
import TextSwapButton from "@/src/components/motion/TextSwapButton";
import { logo } from "@/src/lib/imageManifest";

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
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
        >
          <span
            className={`block h-px w-7 bg-white transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-7 bg-white transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
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
          <Image
            src={logo.white.src}
            alt={logo.white.alt}
            width={188}
            height={29}
            priority
            className="h-5 w-auto md:h-6"
          />
        </Link>

        {/* Contact (top-right) */}
        <div className="flex w-10 justify-end md:w-auto">
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
