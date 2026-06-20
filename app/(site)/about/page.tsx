import type { Metadata } from "next";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import RevealImage from "@/src/components/motion/RevealImage";
import BorderButton from "@/src/components/ui/BorderButton";
import ParallaxImage from "@/src/components/motion/ParallaxImage";
import HorizontalScroll from "@/src/components/about/HorizontalScroll";
import Timeline from "@/src/components/about/Timeline";
import SiteExplore from "@/src/components/sections/SiteExplore";
import { images } from "@/src/lib/imageManifest";
import { about, essence, valuesStatement, craft } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "About | 1ZONE",
  description:
    "1ZONE (一境), 'one realm.' A boutique turnkey design-and-build atelier. Mission, vision, the four principles, and the only-ten-projects-a-year ethos.",
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex h-screen w-full items-end overflow-hidden">
        <ParallaxImage
          src={images.about.hero.src}
          alt={images.about.hero.alt}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-24 md:px-10">
          <p className="eyebrow mb-6">一境 · One realm</p>
          <RevealText as="h1" split delay={0.2} className="display-hero max-w-4xl text-white">
            The whole project, under one accountability.
          </RevealText>
        </div>
      </section>

      {/* PHILOSOPHY + ONE REALM, merged: the explanation, then the offset pair */}
      <section className="mx-auto max-w-[1600px] px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Philosophy</p>
          <div className="md:col-span-9">
            <RevealText as="p" split className="display-section text-white">
              {about.philosophy}
            </RevealText>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white-dim">
                {essence}
              </p>
            </Reveal>
          </div>
        </div>

        {/* The one-realm offset imagery pair, small low-left beside a wide right. */}
        <div className="mt-20 grid grid-cols-1 items-end gap-8 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-4">
            <RevealImage
              src={images.about.ethos.src}
              alt={images.about.ethos.alt}
              className="aspect-[4/5] w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="md:col-span-8">
            <RevealImage
              src={images.about.hero.src}
              alt={images.about.hero.alt}
              className="aspect-[16/9] w-full"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
        </div>
      </section>

      {/* MISSION / VISION / ETHOS */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-line md:grid-cols-3">
          {[
            { label: "Mission", body: about.mission },
            { label: "Vision", body: about.vision },
            { label: "Ethos", body: about.ethos },
          ].map((b) => (
            <div key={b.label} className="bg-black p-10">
              <p className="eyebrow mb-6 text-accent">{b.label}</p>
              <RevealText as="p" className="font-display text-2xl leading-snug text-white">
                {b.body}
              </RevealText>
            </div>
          ))}
        </div>
      </section>

      {/* FOUR VALUES, pinned horizontal scroll */}
      <HorizontalScroll />

      {/* VALUES STATEMENT */}
      <section className="mx-auto max-w-[1100px] px-6 py-[clamp(6rem,14vh,12rem)] text-center md:px-10">
        <RevealText as="blockquote" split className="display-section text-white">
          {valuesStatement}
        </RevealText>
      </section>

      {/* TIMELINE, the customer journey / process, scroll-lit */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20">
            <p className="eyebrow mb-4">How a project unfolds</p>
            <RevealText as="h2" split className="display-section max-w-3xl text-white">
              From first conversation to handover ceremony.
            </RevealText>
          </div>
          <Timeline nodes={[...craft.process.nodes]} />
        </div>
      </section>

      {/* ORIGIN (placeholder) + CTA */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow mb-6">Origin</p>
            <RevealText as="p" className="font-display text-2xl leading-snug text-white-dim">
              {about.origin}
            </RevealText>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <BorderButton href="/contact" label="Begin a project" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6">
            <RevealImage
              src={images.about.ethos.src}
              alt={images.about.ethos.alt}
              className="aspect-[4/3] w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* EXPLORE MORE */}
      <SiteExplore current="/about" />
    </>
  );
}
