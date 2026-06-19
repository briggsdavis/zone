import ExploreGrid from "@/src/components/sections/ExploreGrid";
import { images } from "@/src/lib/imageManifest";

type Dest = {
  href: string;
  label: string;
  image: { src: string; alt: string };
};

// The cross-navigation pool. Contact is handled separately as the boxed CTA.
const DESTINATIONS: Dest[] = [
  { href: "/about", label: "About", image: images.about.ethos },
  { href: "/services", label: "Services", image: images.services.turnkey },
  { href: "/craftsmanship", label: "Craftsmanship", image: images.craft.hero },
  { href: "/portfolio", label: "Portfolio", image: images.portfolio.lydClub },
  { href: "/", label: "Home", image: images.home.hero },
];

/**
 * Site-wide "Explore more" closer. Shows four destination cards, always
 * excluding the current page, with a boxed "Contact us" CTA (suppressed on the
 * contact page itself).
 */
export default function SiteExplore({ current }: { current: string }) {
  const items = DESTINATIONS.filter((d) => d.href !== current).slice(0, 4);
  const cta =
    current === "/contact"
      ? undefined
      : { href: "/contact", label: "Contact us →" };

  return <ExploreGrid items={items} cta={cta} />;
}
