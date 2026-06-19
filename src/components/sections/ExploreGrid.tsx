import RevealImage from "@/src/components/motion/RevealImage";
import TextSwapButton from "@/src/components/motion/TextSwapButton";

type Item = {
  href: string;
  label: string;
  image: { src: string; alt: string };
};

type Props = {
  /** Section heading (serif). */
  heading?: string;
  /** Optional boxed CTA pinned top-right (e.g. "Contact us →"). */
  cta?: { href: string; label: string };
  items: Item[];
};

/**
 * "Explore more", a row of tall portrait images, each labeled with a section
 * link beneath. Edge-to-edge with hairline gaps; a heading and optional boxed
 * CTA sit above. Used site-wide as a cross-navigation closer.
 */
export default function ExploreGrid({ heading = "Explore more", cta, items }: Props) {
  return (
    <section className="border-t border-line px-6 py-[clamp(5rem,12vh,9rem)] md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-center justify-between gap-6">
          <h2 className="font-display text-3xl text-white md:text-5xl">{heading}</h2>
          {cta && (
            <TextSwapButton
              href={cta.href}
              label={cta.label}
              boxed
              className="shrink-0 text-xs uppercase tracking-[0.18em] text-white-dim"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="group block bg-black">
              <RevealImage
                src={item.image.src}
                alt={item.image.alt}
                className="aspect-[3/4] w-full"
                parallax={false}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="px-1 pt-4">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white-dim transition-colors group-hover:text-accent">
                  {item.label}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
