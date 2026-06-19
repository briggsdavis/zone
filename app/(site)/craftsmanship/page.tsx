import type { Metadata } from "next";
import Image from "next/image";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import RevealImage from "@/src/components/motion/RevealImage";
import TextSwapButton from "@/src/components/motion/TextSwapButton";
import Timeline from "@/src/components/about/Timeline";
import Accordion from "@/src/components/ui/Accordion";
import SiteExplore from "@/src/components/sections/SiteExplore";
import { images } from "@/src/lib/imageManifest";
import { craft } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Craftsmanship — How We Build | 1ZONE",
  description:
    "The construction rigor behind 1ZONE: a 12-node management framework, uniformed trained crews, branded 9-step waterproofing with a 10-year warranty, and a library of right-way-vs-wrong-way craft standards.",
};

export default function CraftsmanshipPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex h-screen w-full items-end overflow-hidden">
        <Image
          src={images.craft.hero.src}
          alt={images.craft.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-24 md:px-10">
          <p className="eyebrow mb-6">{craft.hero.eyebrow}</p>
          <RevealText as="h1" split delay={0.2} className="display-hero max-w-4xl text-white">
            {craft.hero.title}
          </RevealText>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white-dim">
              {craft.hero.lede}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS — 12 NODES, SCROLL-LIT TIMELINE */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">{craft.process.eyebrow}</p>
              <RevealText as="h2" split className="display-section text-white">
                {craft.process.title}
              </RevealText>
            </div>
            <Reveal className="md:col-span-5 md:self-end" delay={0.1}>
              <p className="text-lg leading-relaxed text-white-dim">
                {craft.process.intro}
              </p>
            </Reveal>
          </div>
          <Timeline nodes={[...craft.process.nodes]} />
        </div>
      </section>

      {/* DISCIPLINE — TRUST MARKERS over full-bleed image */}
      <section className="relative overflow-hidden border-t border-line">
        <RevealImage
          src={images.craft.discipline.src}
          alt={images.craft.discipline.alt}
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
          <p className="eyebrow mb-4">{craft.discipline.eyebrow}</p>
          <RevealText as="h2" split className="display-section mb-6 max-w-3xl text-white">
            {craft.discipline.title}
          </RevealText>
          <Reveal>
            <p className="mb-16 max-w-2xl text-lg leading-relaxed text-white-dim">
              {craft.discipline.body}
            </p>
          </Reveal>
          <Reveal staggerChildren className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {craft.discipline.markers.map((m) => (
              <div key={m.label} className="bg-black/80 p-8 backdrop-blur-sm">
                <p className="font-display text-4xl text-accent md:text-5xl">
                  {m.stat}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.15em] text-white">
                  {m.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white-dim">
                  {m.detail}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* STANDARDS — right-way-vs-wrong-way accordion */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">{craft.standards.eyebrow}</p>
              <RevealText as="h2" split className="display-section text-white">
                {craft.standards.title}
              </RevealText>
            </div>
            <Reveal className="md:col-span-5 md:self-end" delay={0.1}>
              <p className="text-lg leading-relaxed text-white-dim">
                {craft.standards.intro}
              </p>
            </Reveal>
          </div>
          <Reveal>
            <Accordion
              items={craft.standards.items.map((it) => ({
                title: it.title,
                body: it.body,
                points: it.proof,
                badge: "signature" in it && it.signature ? "Signature" : undefined,
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* MATERIAL MACRO BREAK */}
      <section className="relative h-[70vh] w-full overflow-hidden border-t border-line">
        <RevealImage
          src={images.craft.material.src}
          alt={images.craft.material.alt}
          className="absolute inset-0 h-full w-full"
          parallax
          sizes="100vw"
        />
      </section>

      {/* CLOSING */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden border-t border-line px-6 md:px-10">
        <Image
          src={images.craft.closing.src}
          alt={images.craft.closing.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <RevealText as="h2" split className="display-section max-w-4xl text-white">
            {craft.closing.title}
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white-dim">
              {craft.closing.body}
            </p>
            <div className="mt-10">
              <TextSwapButton
                href="/contact"
                label="Begin a project →"
                className="text-base uppercase tracking-[0.15em]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPLORE MORE */}
      <SiteExplore current="/craftsmanship" />
    </>
  );
}
