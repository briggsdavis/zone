import Image from "next/image";
import { logo } from "@/src/lib/imageManifest";

type Props = {
  /**
   * Which wordmark to render. Use "white" on dark surfaces and "black" on
   * light ones so the lockup stays legible. The whole 1ZONE site is dark, so
   * "white" is the default.
   */
  variant?: "white" | "black";
  /** Sizing utilities, control height (the aspect ratio fixes the width). */
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * The 一境 · 1ZONE wordmark. The source PNGs are square (2000×2000) with the
 * lockup centered in a slim horizontal band; we crop that band with
 * object-cover so the mark reads tight in compact slots like the navbar.
 */
export default function Logo({
  variant = "white",
  className = "",
  priority = false,
  sizes = "200px",
}: Props) {
  const { src, alt } = logo[variant];
  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ aspectRatio: "4.6 / 1" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: "center 47%" }}
      />
    </span>
  );
}
