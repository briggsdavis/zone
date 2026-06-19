import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import RevealImage from "@/src/components/motion/RevealImage";

type Img = { src: string; alt: string };

type Props = {
  heading: string;
  eyebrow?: string;
  lede?: string;
  /** Large dominant image. */
  primary: Img;
  /** Smaller image that floats in the upper-right negative space. */
  secondary: Img;
};

/**
 * A wide serif heading over a deliberately asymmetric pair: one large image
 * carrying the left, a smaller image offset into the upper-right whitespace.
 * Mirrors the "shimmering tower" reference layout.
 */
export default function FeatureDuo({ heading, eyebrow, lede, primary, secondary }: Props) {
  return (
    <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
      <div className="mx-auto max-w-[1600px]">
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <RevealText as="h2" split className="display-section max-w-5xl text-white">
          {heading}
        </RevealText>
        {lede && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white-dim">{lede}</p>
          </Reveal>
        )}
        <div className="mt-16 grid grid-cols-1 items-start gap-10 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <RevealImage
              src={primary.src}
              alt={primary.alt}
              className="aspect-[16/10] w-full"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:mt-24">
            <RevealImage
              src={secondary.src}
              alt={secondary.alt}
              className="aspect-[4/5] w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
