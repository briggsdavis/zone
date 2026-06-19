import RevealImage from "@/src/components/motion/RevealImage";
import RevealText from "@/src/components/motion/RevealText";
import Reveal from "@/src/components/motion/Reveal";
import LabelLink from "./LabelLink";

type Props = {
  image: { src: string; alt: string };
  /** Side the image sits on; text fills the other half. */
  side?: "left" | "right";
  eyebrow?: string;
  heading: string;
  body?: string;
  points?: readonly string[];
  link?: { href: string; label: string };
  className?: string;
};

/**
 * Full-height split: a tall image on one side, a text column on the other with
 * generous whitespace around it. Reversible via `side`.
 */
export default function SplitFeature({
  image,
  side = "left",
  eyebrow,
  heading,
  body,
  points,
  link,
  className = "",
}: Props) {
  const imageBlock = (
    <div className="relative min-h-[56vh] md:min-h-[88vh]">
      <RevealImage
        src={image.src}
        alt={image.alt}
        parallax
        className="absolute inset-0 h-full w-full"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
  const textBlock = (
    <div className="flex items-center px-6 py-[clamp(4rem,12vh,9rem)] md:px-[clamp(2.5rem,6vw,7rem)]">
      <div className="max-w-md">
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <RevealText
          as="h2"
          split
          className="font-display text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.12] text-white"
        >
          {heading}
        </RevealText>
        {body && (
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-white-dim">{body}</p>
          </Reveal>
        )}
        {points && points.length > 0 && (
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-sm leading-relaxed text-white-dim"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        {link && (
          <div className="mt-8">
            <LabelLink boxed href={link.href} label={link.label} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className={`grid grid-cols-1 md:grid-cols-2 ${className}`}>
      {side === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  );
}
