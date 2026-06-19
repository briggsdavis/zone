import Image from "next/image";
import IntroSequence from "@/src/components/intro/IntroSequence";
import ScrollCue from "@/src/components/sections/ScrollCue";
import ImageDuo from "@/src/components/editorial/ImageDuo";
import ImageRow from "@/src/components/editorial/ImageRow";
import SplitFeature from "@/src/components/editorial/SplitFeature";
import { images, projectImage } from "@/src/lib/imageManifest";
import { brand, positioning, values, projects, craft } from "@/src/lib/content";

const teaser = projects.slice(0, 4);

export default function Home() {
  return (
    <>
      <IntroSequence />

      {/* HERO — dark, cinematic. Media + foreground are driven by IntroSequence
          on first paint (id / data-hero-fg), then behave normally. */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        <div id="hero-media" className="absolute inset-0">
          <Image
            src={images.home.hero.src}
            alt={images.home.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 data-hero-fg className="display-hero max-w-5xl text-white">
            {brand.tagline}
          </h1>
        </div>
        <ScrollCue />
      </section>

      {/* INTRO — lead line over an asymmetric image pair */}
      <ImageDuo
        eyebrow="What we are"
        lead="A boutique turnkey atelier. Design, build, and furnishing under one roof."
        leadLink={{ href: "/about", label: "About 1ZONE" }}
        primary={images.home.intro}
        secondary={images.home.servicesTeaser}
        secondarySide="right"
      />

      {/* FOUR PRINCIPLES — labeled image row */}
      <ImageRow
        className="border-t border-line"
        eyebrow="Four principles"
        lead="Art. Human-centered. Efficiency. Warmth."
        ratio="aspect-[4/5]"
        items={[
          { ...images.home.valuesArt, label: `01 — ${values[0].en}`, href: "/about" },
          { ...images.home.valuesHuman, label: `02 — ${values[1].en}`, href: "/about" },
          { ...images.home.valuesEfficiency, label: `03 — ${values[2].en}`, href: "/about" },
          { ...images.home.valuesWarmth, label: `04 — ${values[3].en}`, href: "/about" },
        ]}
      />

      {/* SERVICES — full-bleed split */}
      <SplitFeature
        className="border-t border-line"
        image={images.home.process}
        side="left"
        eyebrow="What we do"
        heading="One firm, the whole project."
        body={positioning[0]}
        link={{ href: "/services", label: "View services" }}
      />

      {/* PORTFOLIO TEASER — asymmetric pair, small image leading */}
      <ImageDuo
        className="border-t border-line"
        eyebrow="Selected work"
        lead="The realm, realized."
        leadLink={{ href: "/portfolio", label: "See the portfolio" }}
        primary={projectImage[teaser[0].slug]}
        secondary={projectImage[teaser[1].slug]}
        secondarySide="left"
      />

      {/* CRAFTSMANSHIP — full-bleed split, image right */}
      <SplitFeature
        className="border-t border-line"
        image={images.craft.discipline}
        side="right"
        eyebrow="The rigor behind the realm"
        heading="12 management nodes. Uniformed crews. Four-party sign-off."
        body={craft.hero.lede}
        link={{ href: "/craftsmanship", label: "How we build" }}
      />

      {/* EXPLORE MORE — closing grid */}
      <ImageRow
        className="border-t border-line"
        title="Explore more"
        action={{ href: "/contact", label: "Contact us" }}
        ratio="aspect-[4/5]"
        items={[
          { ...images.services.turnkey, label: "Services", href: "/services" },
          { ...images.portfolio.youJing, label: "Portfolio", href: "/portfolio" },
          { ...images.craft.hero, label: "Craftsmanship", href: "/craftsmanship" },
          { ...images.about.hero, label: "About", href: "/about" },
        ]}
      />
    </>
  );
}
