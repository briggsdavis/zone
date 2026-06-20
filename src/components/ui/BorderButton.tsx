import Link from "next/link";

type Props = {
  href: string;
  label: string;
  className?: string;
  /** External links open in a new tab. */
  external?: boolean;
};

/**
 * The site-wide button treatment: a thin hairline border with the label in
 * white. On hover, a white panel blurs in to fill the button and the label
 * turns black. Used for every primary CTA (Contact, Begin a project, etc.).
 */
export default function BorderButton({
  href,
  label,
  className = "",
  external = false,
}: Props) {
  const inner = (
    <>
      {/* Solid white background that fades in on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
      />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
        {label}
      </span>
    </>
  );

  const classes = `group relative inline-flex items-center justify-center overflow-hidden border border-white/60 px-7 py-3 text-sm uppercase tracking-[0.15em] text-white transition-colors duration-500 ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
