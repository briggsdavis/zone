import RevealImage from "@/src/components/motion/RevealImage";
import EditorialLead from "./EditorialLead";

type Img = { src: string; alt: string };

type Props = {
  primary: Img;
  secondary: Img;
  /** Side the small (secondary) image sits on; the large one takes the rest. */
  secondarySide?: "left" | "right";
  lead?: string;
  eyebrow?: string;
  leadLink?: { href: string; label: string };
  className?: string;
};

/**
 * An asymmetric two-image row: one large image and one smaller image offset
 * with whitespace, in the manner of the reference editorial layouts.
 */
export default function ImageDuo({
  primary,
  secondary,
  secondarySide = "right",
  lead,
  eyebrow,
  leadLink,
  className = "",
}: Props) {
  const big = (
    <div
      className={`md:row-start-1 md:col-span-7 ${
        secondarySide === "right" ? "md:col-start-1" : "md:col-start-6"
      }`}
    >
      <RevealImage
        src={primary.src}
        alt={primary.alt}
        className="aspect-[16/10] w-full"
        sizes="(max-width: 768px) 100vw, 60vw"
      />
    </div>
  );
  const small = (
    <div
      className={`md:row-start-1 md:col-span-3 md:self-start md:pt-24 ${
        secondarySide === "right" ? "md:col-start-10" : "md:col-start-1"
      }`}
    >
      <RevealImage
        src={secondary.src}
        alt={secondary.alt}
        className="aspect-[4/5] w-full"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    </div>
  );

  return (
    <section className={`px-6 py-[clamp(4rem,10vh,9rem)] md:px-10 ${className}`}>
      <div className="mx-auto max-w-[1600px]">
        {lead && (
          <EditorialLead
            eyebrow={eyebrow}
            link={leadLink}
            className="mb-12 md:mb-16"
          >
            {lead}
          </EditorialLead>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          {secondarySide === "right" ? (
            <>
              {big}
              {small}
            </>
          ) : (
            <>
              {small}
              {big}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
