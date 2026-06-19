import RevealText from "@/src/components/motion/RevealText";
import LabelLink from "./LabelLink";

type Props = {
  children: string;
  eyebrow?: string;
  link?: { href: string; label: string };
  align?: "left" | "center";
  className?: string;
};

/**
 * The serif lead-in line that opens an editorial section — a single evocative
 * sentence, optionally preceded by an eyebrow and followed by a chip link.
 */
export default function EditorialLead({
  children,
  eyebrow,
  link,
  align = "left",
  className = "",
}: Props) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-4xl text-center" : ""} ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <RevealText
        as="p"
        split
        className="font-display text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.12] tracking-[-0.01em] text-white"
      >
        {children}
      </RevealText>
      {link && (
        <div className={`mt-7 ${align === "center" ? "flex justify-center" : ""}`}>
          <LabelLink boxed href={link.href} label={link.label} />
        </div>
      )}
    </div>
  );
}
