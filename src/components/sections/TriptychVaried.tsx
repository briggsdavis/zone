import RevealText from "@/src/components/motion/RevealText";
import RevealImage from "@/src/components/motion/RevealImage";
import TextSwapButton from "@/src/components/motion/TextSwapButton";

type Img = { src: string; alt: string };

type Props = {
  heading: string;
  eyebrow?: string;
  cta?: { href: string; label: string };
  /** Exactly three images; the centre one runs taller and lifts upward. */
  images: [Img, Img, Img];
};

/**
 * A heading with an optional boxed link, then three images of varied size in a
 * row — portrait, a taller offset portrait, and a landscape — echoing the
 * "Horizon-deep views" reference.
 */
export default function TriptychVaried({ heading, eyebrow, cta, images }: Props) {
  return (
    <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14">
          {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
          <RevealText as="h2" split className="display-section max-w-4xl text-white">
            {heading}
          </RevealText>
          {cta && (
            <div className="mt-8">
              <TextSwapButton
                href={cta.href}
                label={cta.label}
                boxed
                className="text-xs uppercase tracking-[0.18em] text-white-dim"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <RevealImage
            src={images[0].src}
            alt={images[0].alt}
            className="aspect-[3/4] w-full"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <RevealImage
            src={images[1].src}
            alt={images[1].alt}
            className="aspect-[9/16] w-full md:-translate-y-8"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <RevealImage
            src={images[2].src}
            alt={images[2].alt}
            className="aspect-[4/5] w-full"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
}
