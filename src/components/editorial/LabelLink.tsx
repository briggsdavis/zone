import Link from "next/link";

type Props = {
  href: string;
  label: string;
  /** Render inside a hairline box (chip), as in the reference layouts. */
  boxed?: boolean;
  className?: string;
};

/**
 * Tiny uppercase label-link with a nudging arrow — used as the small captions
 * beneath editorial images and as standalone "chip" calls-to-action.
 */
export default function LabelLink({
  href,
  label,
  boxed = false,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white-dim transition-colors hover:text-white ${
        boxed ? "border border-line px-3.5 py-2.5" : ""
      } ${className}`}
    >
      <span>{label}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
