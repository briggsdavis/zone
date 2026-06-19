/**
 * 1ZONE — Centralized image manifest.
 *
 * Every <Image> on the site references a key in this file — no component
 * hardcodes a URL. The assets below are the client's own project photography,
 * served locally from `public/`:
 *   - /images/*      decorative interior/exterior photography
 *   - /images/hero-gallery-art.jpg   home-page hero banner
 *   - /brand/logo-white.png | logo-black.png   the 一境 · 1ZONE wordmark
 *     (use white on dark surfaces, black on light — for legibility)
 *
 * To swap an asset, change only the `src` (and `alt`) here. Keep `alt`
 * descriptive for accessibility.
 */

type Img = { src: string; alt: string };

// Local public-asset path helper.
const img = (name: string) => `/images/${name}`;

// Brand wordmark — pick the variant that reads against the background.
export const logo = {
  white: { src: "/brand/logo-white.png", alt: "一境 · 1ZONE" },
  black: { src: "/brand/logo-black.png", alt: "一境 · 1ZONE" },
} as const;

export const images = {
  home: {
    hero: {
      src: img("hero-gallery-art.jpg"),
      alt: "A dark gallery interior — a large abstract canvas glows against moss and warm timber.",
    },
    intro: {
      src: img("lounge-sculpture.jpg"),
      alt: "A moody lounge with a leather sofa, bronze sculpture, and layered materials.",
    },
    valuesArt: {
      src: img("atrium-art.jpg"),
      alt: "An art-filled atrium with framed painting, candles, and ferns.",
    },
    valuesHuman: {
      src: img("lounge-brutalist.jpg"),
      alt: "People at ease in a warm, brutalist concrete lounge.",
    },
    valuesEfficiency: {
      src: img("meeting-tree.jpg"),
      alt: "A precise, minimal meeting room with a sculptural tree and city view.",
    },
    valuesWarmth: {
      src: img("arch-alabaster.jpg"),
      alt: "A glowing alabaster archway in warm, soft light.",
    },
    servicesTeaser: {
      src: img("dining-travertine.jpg"),
      alt: "A dark dining space with a travertine table and layered materials.",
    },
    process: {
      src: img("living-villa-glass.jpg"),
      alt: "A dramatic concrete-and-glass living space opening to trees.",
    },
    contactCta: {
      src: img("dining-chandelier.jpg"),
      alt: "A cinematic dark dining room beneath a linear chandelier.",
    },
    editorialPrimary: {
      src: img("living-wide.jpg"),
      alt: "A wide, light-filled living space framed by timber and stone.",
    },
    editorialSecondary: {
      src: img("onyx-staircase.jpg"),
      alt: "A sculptural onyx staircase glowing in a quiet stair hall.",
    },
  },
  about: {
    hero: {
      src: img("living-villa-glass.jpg"),
      alt: "An elegant villa interior with sweeping light and a glazed garden view.",
    },
    horizontal: [
      {
        src: img("atrium-art.jpg"),
        alt: "Art — a framed painting and candlelight in a serene atrium.",
      },
      {
        src: img("lounge-brutalist.jpg"),
        alt: "Human-centered — people relaxing in a warm concrete lounge.",
      },
      {
        src: img("meeting-tree.jpg"),
        alt: "Efficiency — a precise, minimal meeting room.",
      },
      {
        src: img("living-fireplace.jpg"),
        alt: "Warmth — a living room with a suspended fireplace and timber.",
      },
    ] as Img[],
    ethos: {
      src: img("arch-travertine.jpg"),
      alt: "A serene, gallery-like stair hall with travertine and alabaster.",
    },
  },
  services: {
    turnkey: {
      src: img("round-dining-dome.jpg"),
      alt: "A complete, furnished round dining room beneath a terracotta dome.",
    },
    construction: {
      src: img("wood-light-garden.jpg"),
      alt: "Precise timber light fixtures and stonework framing a zen garden.",
    },
    design: {
      src: img("dining-chandelier.jpg"),
      alt: "A designed dining interior with cinematic light and a linear chandelier.",
    },
    furnishing: {
      src: img("lounge-sculpture.jpg"),
      alt: "High-end furniture, sculpture, and art in a styled lounge.",
    },
    roofing: {
      src: img("villa-terrace.jpg"),
      alt: "A villa roofline and covered terrace against an evening sky.",
    },
    facades: {
      src: img("terrace-dining.jpg"),
      alt: "A glazed, stone-clad façade and terrace in raking light.",
    },
  },
  craft: {
    hero: {
      src: img("wood-light-garden.jpg"),
      alt: "Craftsmanship — precise timber detailing framing a stone garden.",
    },
    process: {
      src: img("dining-travertine.jpg"),
      alt: "A disciplined, exactingly built dining space in dark timber and travertine.",
    },
    discipline: {
      src: img("lounge-brutalist.jpg"),
      alt: "A composed, well-ordered brutalist lounge — discipline made visible.",
    },
    waterproofing: {
      src: img("detail-ceramics.jpg"),
      alt: "A close detail of finely finished surfaces and ceramics.",
    },
    material: {
      src: img("arch-travertine.jpg"),
      alt: "A macro of travertine and alabaster — material as craft.",
    },
    closing: {
      src: img("living-fireplace.jpg"),
      alt: "A finished, faithfully built warm living interior.",
    },
  },
  portfolio: {
    youJing: {
      src: img("showroom-lounge.jpg"),
      alt: "You Jing Life Research Lab — the firm's own showroom studio.",
    },
    lydClub: {
      src: img("round-dining-dome.jpg"),
      alt: "LYD Aesthetic Space Club — a private clubhouse dining room.",
    },
    cuihu: {
      src: img("dining-travertine.jpg"),
      alt: "Cuihu large flat — craft-and-art integration.",
    },
    pingtan: {
      src: img("villa-terrace.jpg"),
      alt: "Pingtan resort villa — covered terrace and roofline.",
    },
    townhouse: {
      src: img("terrace-dining.jpg"),
      alt: "A townhouse villa terrace in a private community.",
    },
    greenSpring: {
      src: img("living-fireplace.jpg"),
      alt: "Green Spring large flat — a warm living room.",
    },
    polyDuplex: {
      src: img("wood-light-garden.jpg"),
      alt: "A three-story duplex interior with precise timber detailing.",
    },
    lakeheart: {
      src: img("showroom-chair.jpg"),
      alt: "Lakeheart Island flat interior with a city view.",
    },
    mantanghong: {
      src: img("meeting-tree.jpg"),
      alt: "Mantanghong townhouse villa interior.",
    },
    seaview: {
      src: img("living-villa-glass.jpg"),
      alt: "A seaview garden villa opening to trees and light.",
    },
  },
  contact: {
    hero: {
      src: img("dining-chandelier.jpg"),
      alt: "A calm, cinematic dining space at dusk.",
    },
  },
} as const;

// Map portfolio project slugs → manifest image, used by the grid/detail.
export const projectImage: Record<string, Img> = {
  "you-jing-life-research-lab": images.portfolio.youJing,
  "lyd-aesthetic-space-club": images.portfolio.lydClub,
  "shanghai-cuihu-large-flat": images.portfolio.cuihu,
  "pingtan-resort-villa": images.portfolio.pingtan,
  "jinjiang-townhouse-villa": images.portfolio.townhouse,
  "jinjiang-green-spring": images.portfolio.greenSpring,
  "poly-duplex-interior": images.portfolio.polyDuplex,
  "lakeheart-island-flat": images.portfolio.lakeheart,
  "mantanghong-townhouse-villa": images.portfolio.mantanghong,
  "seaview-garden-villa": images.portfolio.seaview,
};
