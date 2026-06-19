import type { Metadata } from "next";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import ProjectGrid from "@/src/components/portfolio/ProjectGrid";
import ImageRow from "@/src/components/editorial/ImageRow";
import { images } from "@/src/lib/imageManifest";

export const metadata: Metadata = {
  title: "Portfolio, The realm, realized | 1ZONE",
  description:
    "Selected villas, large flats, and private clubhouses by 1ZONE, completed, in progress, and upcoming.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="px-6 pb-[clamp(5rem,12vh,9rem)] pt-40 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-20 max-w-3xl">
            <p className="eyebrow mb-6">Selected work</p>
            <RevealText as="h1" split className="display-hero text-white">
              The realm, realized.
            </RevealText>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-white-dim">
                Villas, large flats, and private clubhouses. Chinese developer
                names are presented softly for clarity — the work, and its craft,
                speaks for itself.
              </p>
            </Reveal>
          </div>
          <ProjectGrid />
        </div>
      </section>

      {/* EXPLORE MORE — closing grid */}
      <ImageRow
        className="border-t border-line"
        title="Explore more"
        action={{ href: "/contact", label: "Contact us" }}
        ratio="aspect-[4/5]"
        items={[
          { ...images.services.turnkey, label: "Services", href: "/services" },
          { ...images.craft.hero, label: "Craftsmanship", href: "/craftsmanship" },
          { ...images.about.hero, label: "About", href: "/about" },
        ]}
      />
    </>
  );
}
