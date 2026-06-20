"use client";

import Logo from "@/src/components/brand/Logo";

/**
 * A full-screen "coming soon" cover for pages that are built but not yet ready
 * to reveal. It sits above the page content but BELOW the navbar (z-50) and the
 * menu overlay (z-40), so the page can still be left via the menu. The real page
 * is left fully intact underneath, simply hidden.
 */
export default function ComingSoon({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black px-6 text-center">
      <Logo variant="white" className="mb-12 w-full max-w-[220px]" />
      {label && <p className="eyebrow mb-6 text-accent">{label}</p>}
      <h1 className="display-hero text-white">Coming soon.</h1>
      <p className="mt-6 max-w-md text-white-dim">
        This chapter of the 1ZONE realm is being prepared. Please check back
        shortly.
      </p>
    </div>
  );
}
