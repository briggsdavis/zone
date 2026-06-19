"use client";

import Link from "next/link";
import Reveal from "@/src/components/motion/Reveal";
import Logo from "@/src/components/brand/Logo";
import { brand, nav, contact } from "@/src/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black px-6 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <Logo
            variant="white"
            className="w-full max-w-[1100px]"
            sizes="(max-width: 768px) 100vw, 1100px"
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="max-w-md text-white-dim">
              {brand.tagline}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.15em] text-accent">
              {brand.scarcity}
            </p>
          </div>

          <nav>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white-dim transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Studio</p>
            {/* PLACEHOLDER contact details — client to provide */}
            <ul className="space-y-2 text-white-dim">
              <li>{contact.studio}</li>
              <li>{contact.email}</li>
              <li>{contact.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 text-xs text-white-dim md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.atelier}. {brand.lockup}
          </p>
          <p>Placeholder details pending client confirmation.</p>
        </div>
      </div>
    </footer>
  );
}
