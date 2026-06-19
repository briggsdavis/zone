import type { Metadata } from "next";
import Image from "next/image";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import SplitFeature from "@/src/components/editorial/SplitFeature";
import ImageRow from "@/src/components/editorial/ImageRow";
import { images } from "@/src/lib/imageManifest";
import { services } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Services, One firm, the whole project | 1ZONE",
  description:
    "1ZONE's services: whole-case design and build, interior architecture and construction, spatial design, furnishing and art procurement, villa roofing systems, and stone-clad façades.",
};

// Each service key → its editorial image.
const serviceImage: Record<string, { src: string; alt: string }> = {
  turnkey: images.services.turnkey,
  construction: images.services.construction,
  design: images.services.design,
  furnishing: images.services.furnishing,
  roofing: images.services.roofing,
  facades: images.services.facades,
};

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-6 pb-20 pt-40 md:px-10">
        <Image
          src={images.services.turnkey.src}
          alt={images.services.turnkey.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
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

      {/* SERVICES — alternating full-bleed splits, one per offering */}
      {services.map((s, i) => (
        <SplitFeature
          key={s.key}
          className="border-t border-line"
          image={serviceImage[s.key]}
          side={i % 2 === 0 ? "left" : "right"}
          eyebrow={`0${i + 1} — ${s.short}`}
          heading={s.title}
          body={s.body}
          points={s.points}
        />
      ))}

      {/* CRAFT CROSS-LINK — closing row */}
      <ImageRow
        className="border-t border-line"
        title="The rigor that makes it real."
        action={{ href: "/craftsmanship", label: "See how we build" }}
        ratio="aspect-[16/10]"
        items={[
          { ...images.craft.discipline, label: "Craftsmanship", href: "/craftsmanship" },
          { ...images.craft.process, label: "Standards", href: "/craftsmanship" },
        ]}
      />
    </>
  );
}
