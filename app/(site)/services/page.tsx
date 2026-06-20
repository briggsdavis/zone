import type { Metadata } from "next";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import ParallaxImage from "@/src/components/motion/ParallaxImage";
import TextSwapButton from "@/src/components/motion/TextSwapButton";
import ServicesScroller from "@/src/components/services/ServicesScroller";
import FeatureDuo from "@/src/components/sections/FeatureDuo";
import SiteExplore from "@/src/components/sections/SiteExplore";
import { images } from "@/src/lib/imageManifest";

export const metadata: Metadata = {
  title: "Services | 1ZONE",
  description:
    "1ZONE's services: whole-case design and build, interior architecture and construction, spatial design, furnishing and art procurement, villa roofing systems, and stone-clad façades.",
};

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-6 pb-20 pt-40 md:px-10">
        <ParallaxImage
          src={images.services.turnkey.src}
          alt={images.services.turnkey.alt}
          priority
          sizes="100vw"
          imgClassName="object-cover opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <p className="eyebrow mb-6">Services</p>
          <RevealText as="h1" split delay={0.2} className="display-hero max-w-4xl text-white">
            One firm, the whole project.
          </RevealText>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white-dim">
              Design, build, and furnishing under one roof, a single line of
              accountability from first conversation to handover.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES, sticky-image scroller */}
      <section className="px-6 py-[clamp(4rem,8vh,7rem)] md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <ServicesScroller />
        </div>
      </section>

      {/* FURNISHING AND ART, editorial duo */}
      <FeatureDuo
        eyebrow="Furnishing and art"
        heading="Furnished, styled, and finished, down to the last object."
        lede="From bespoke furniture to procured art, the whole environment arrives composed, nothing left to chance, nothing left to fill in later."
        primary={images.services.furnishing}
        secondary={images.services.design}
      />

      {/* CRAFT CROSS-LINK */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <RevealText as="h2" split className="display-section max-w-2xl text-white">
            The rigor that makes it real.
          </RevealText>
          <TextSwapButton
            href="/craftsmanship"
            label="See how we build →"
            className="text-sm uppercase tracking-[0.15em]"
          />
        </div>
      </section>

      {/* EXPLORE MORE */}
      <SiteExplore current="/services" />
    </>
  );
}
