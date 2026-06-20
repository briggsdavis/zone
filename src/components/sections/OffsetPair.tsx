import RevealText from "@/src/components/motion/RevealText";
import RevealImage from "@/src/components/motion/RevealImage";
import BorderButton from "@/src/components/ui/BorderButton";

type Img = { src: string; alt: string };

type Props = {
  heading: string;
  eyebrow?: string;
  cta?: { href: string; label: string };
  /** Smaller image, sits to the left and low. */
  small: Img;
  /** Large wide image dominating the right. */
  large: Img;
};

/**
 * A heading with an optional boxed link, then a small image set low on the left
 * beside a large wide image on the right, the "bustling city life" reference,
 * trading on scale contrast and whitespace.
 */
export default function OffsetPair({ heading, eyebrow, cta, small, large }: Props) {
  return (
    <section className="border-t border-line px-6 py-[clamp(6rem,14vh,12rem)] md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 max-w-4xl">
          {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
          <RevealText as="h2" split className="display-section text-white">
            {heading}
          </RevealText>
          {cta && (
            <div className="mt-8">
              <BorderButton href={cta.href} label={cta.label} className="text-xs" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <RevealImage
              src={small.src}
              alt={small.alt}
              className="aspect-[4/5] w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="md:col-span-8">
            <RevealImage
              src={large.src}
              alt={large.alt}
              className="aspect-[16/9] w-full"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
