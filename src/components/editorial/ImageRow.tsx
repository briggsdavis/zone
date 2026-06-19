import RevealImage from "@/src/components/motion/RevealImage";
import RevealText from "@/src/components/motion/RevealText";
import EditorialLead from "./EditorialLead";
import LabelLink from "./LabelLink";

type Item = { src: string; alt: string; label?: string; href?: string };

type Props = {
  items: Item[];
  /** Serif lead-in line above the row. */
  lead?: string;
  eyebrow?: string;
  leadLink?: { href: string; label: string };
  /** Alternatively, a plain section heading + a corner action (e.g. "Explore more"). */
  title?: string;
  action?: { href: string; label: string };
  ratio?: string;
  className?: string;
};

/**
 * A row of equal-width images (2–4), each with an optional label-link caption.
 * Covers both the "three-up with captions" and "Explore more" reference rows.
 */
export default function ImageRow({
  items,
  lead,
  eyebrow,
  leadLink,
  title,
  action,
  ratio = "aspect-[3/4]",
  className = "",
}: Props) {
  const cols =
    items.length >= 4
      ? "lg:grid-cols-4"
      : items.length === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-2";

  return (
    <section className={`px-6 py-[clamp(4rem,10vh,9rem)] md:px-10 ${className}`}>
      <div className="mx-auto max-w-[1600px]">
        {(lead || title) && (
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            {lead ? (
              <EditorialLead
                eyebrow={eyebrow}
                link={leadLink}
                className="md:max-w-4xl"
              >
                {lead}
              </EditorialLead>
            ) : (
              <RevealText as="h2" split className="display-section text-white">
                {title!}
              </RevealText>
            )}
            {action && <LabelLink href={action.href} label={action.label} />}
          </div>
        )}
        <div className={`grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 ${cols}`}>
          {items.map((it, i) => (
            <div key={i}>
              <RevealImage
                src={it.src}
                alt={it.alt}
                className={`${ratio} w-full`}
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              {it.label && (
                <div className="mt-4 border-t border-line pt-3">
                  <LabelLink href={it.href ?? "#"} label={it.label} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
