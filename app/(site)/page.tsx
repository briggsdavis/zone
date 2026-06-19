import Image from "next/image";
import IntroSequence from "@/src/components/intro/IntroSequence";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import RevealImage from "@/src/components/motion/RevealImage";
import TextSwapButton from "@/src/components/motion/TextSwapButton";
import ScrollCue from "@/src/components/sections/ScrollCue";
import ValueCard from "@/src/components/sections/ValueCard";
import { images, projectImage } from "@/src/lib/imageManifest";
import { brand, positioning, values, services, projects, craft } from "@/src/lib/content";

const teaserProjects = projects.slice(0, 4);

export default function Home() {
  return (
    <>
      <IntroSequence />

      {/* 1. HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={images.home.hero.src}
          alt={images.home.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <RevealText
            as="h1"
            split
            delay={0.2}
            className="display-hero max-w-5xl text-white"
          >
            {brand.tagline}
          </RevealText>
        </div>
        <ScrollCue />
      </section>

      {/* 2. INTRO / WHAT WE ARE */}
      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-[clamp(6rem,14vh,12rem)] md:grid-cols-12 md:px-10">
        <div className="md:col-span-7 md:pr-12">
          <p className="eyebrow mb-8">What we are</p>
          <RevealText as="p" split className="display-section text-white">
            A boutique turnkey atelier. Design, build, and furnishing under one
            roof.
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-white-dim">
              {positioning[0]} We hold to a single principle:{" "}
              <span className="text-white">{positioning[1].toLowerCase()}</span>{" "}
              Fidelity of the built result to the design comes first — it is our
              number-one standard.
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.15em] text-accent">
              {brand.scarcity}
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <RevealImage
            src={images.home.intro.src}
            alt={images.home.intro.alt}
            className="aspect-[3/4] w-full"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="eyebrow mb-4">Four principles</p>
          <RevealText as="h2" split className="display-section mb-16 text-white">
            Art. Human-centered. Efficiency. Warmth.
          </RevealText>
          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ValueCard
                key={v.en}
                index={`0${i + 1}`}
                en={v.en}
                cn={v.cn}
                gloss={v.gloss}
                image={
                  [
                    images.home.valuesArt,
                    images.home.valuesHuman,
                    images.home.valuesEfficiency,
                    images.home.valuesWarmth,
                  ][i]
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES TEASER */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4">What we do</p>
              <RevealText as="h2" split className="display-section max-w-2xl text-white">
                One firm, the whole project.
              </RevealText>
            </div>
            <TextSwapButton
              href="/services"
              label="View all services →"
              className="text-sm uppercase tracking-[0.15em]"
            />
          </div>
          <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-3">
            {services.slice(0, 3).map((s) => (
              <div
                key={s.key}
                className="group bg-black p-8 transition-colors hover:bg-black-soft"
              >
                <h3 className="font-display text-2xl text-white">{s.title}</h3>
                <p className="mt-3 text-white-dim">{s.short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO TEASER */}
      <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4">Selected work</p>
              <RevealText as="h2" split className="display-section text-white">
                The realm, realized.
              </RevealText>
            </div>
            <TextSwapButton
              href="/portfolio"
              label="See the portfolio →"
              className="text-sm uppercase tracking-[0.15em]"
            />
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {teaserProjects.map((p, i) => (
              <a key={p.slug} href={`/portfolio#${p.slug}`} className="group block">
                <RevealImage
                  src={projectImage[p.slug].src}
                  alt={projectImage[p.slug].alt}
                  className={`w-full ${i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3] md:mt-20"}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl text-white transition-colors group-hover:text-accent">
                    {p.name}
                  </h3>
                  <span className="text-sm text-white-dim">{p.location}</span>
                </div>
                <p className="text-sm text-white-dim">{p.type}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS GLIMPSE → CRAFTSMANSHIP */}
      <section className="relative h-[80vh] w-full overflow-hidden border-t border-line">
        <RevealImage
          src={images.home.process.src}
          alt={images.home.process.alt}
          className="absolute inset-0 h-full w-full"
          parallax
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 md:px-10">
          <p className="eyebrow mb-6">The rigor behind the realm</p>
          <RevealText as="h2" split className="display-section max-w-3xl text-white">
            12 management nodes. Uniformed crews. Four-party sign-off.
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-white-dim">{craft.hero.lede}</p>
            <div className="mt-8">
              <TextSwapButton
                href="/craftsmanship"
                label="How we build →"
                className="text-sm uppercase tracking-[0.15em]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. CONTACT CTA */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden border-t border-line px-6 text-center">
        <Image
          src={images.home.contactCta.src}
          alt={images.home.contactCta.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="relative z-10">
          <RevealText as="h2" split className="display-hero text-white">
            Begin a project.
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-white-dim">
              We accept only ten whole-case projects each year. Tell us about
              yours.
            </p>
            <div className="mt-10 flex justify-center">
              <TextSwapButton
                href="/contact"
                label="Begin a project →"
                className="text-base uppercase tracking-[0.15em]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
