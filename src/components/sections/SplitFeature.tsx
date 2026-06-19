import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import RevealImage from "@/src/components/motion/RevealImage";
import TextSwapButton from "@/src/components/motion/TextSwapButton";

type Props = {
  heading: string;
  eyebrow?: string;
  body?: string;
  cta?: { href: string; label: string };
  image: { src: string; alt: string };
  /** Which half the full-height image occupies. Defaults to left. */
  imageSide?: "left" | "right";
};

/**
 * A tall full-bleed image filling one half, with a centred text block holding
 * the other half in generous whitespace — the "celebration of craftsmanship"
 * reference. The image side is configurable so consecutive uses can alternate.
 */
export default function SplitFeature({
  heading,
  eyebrow,
  body,
  cta,
  image,
  imageSide = "left",
}: Props) {
  const media = (
    <div className="relative min-h-[60vh] md:min-h-screen">
      <RevealImage
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 h-full w-full"
        parallax
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const text = (
    <div className="flex items-center px-6 py-[clamp(4rem,10vh,8rem)] md:px-16">
      <div className="max-w-md">
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <RevealText as="h2" split className="display-section text-white">
          {heading}
        </RevealText>
        {body && (
          <Reveal delay={0.1}>
            <p className="mt-8 text-base leading-relaxed text-white-dim">{body}</p>
          </Reveal>
        )}
        {cta && (
          <div className="mt-10">
            <TextSwapButton
              href={cta.href}
              label={cta.label}
              boxed
              className="text-xs uppercase tracking-[0.18em] text-white-dim"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="grid grid-cols-1 border-t border-line md:grid-cols-2">
      {imageSide === "left" ? (
        <>
          {media}
          {text}
        </>
      ) : (
        <>
          <div className="order-2 md:order-1">{text}</div>
          <div className="order-1 md:order-2">{media}</div>
        </>
      )}
    </section>
  );
}
