/**
 * 1ZONE — Centralized image manifest.
 *
 * Every <Image> on the site references a key in this file — no component
 * hardcodes a URL. All assets live in `public/` (hero + logos) and
 * `public/images/` (interior photography), so swapping in new client
 * photography only means dropping a file in `public/images/` and pointing
 * the relevant `src` here. Keep `alt` descriptive for accessibility.
 */

type Img = { src: string; alt: string };

const img = (file: string) => `/images/${file}`;

export const images = {
  home: {
    hero: {
      src: "/hero.jpg",
      alt: "A dark, cinematic gallery interior with sweeping green abstract art and a moss wall.",
    },
    intro: {
      src: img("lounge-concrete.jpg"),
      alt: "A concrete-and-timber atelier lounge with low, warm light.",
    },
    valuesArt: {
      src: img("sofa-sculpture.jpg"),
      alt: "A leather sofa beside a bronze sculpture and a vintage trunk.",
    },
    valuesHuman: {
      src: img("fireplace-eames.jpg"),
      alt: "A warm living room with a suspended fireplace and a lounge chair.",
    },
    valuesEfficiency: {
      src: img("meeting-tree.jpg"),
      alt: "A precise meeting room with black chairs and a sculptural tree.",
    },
    valuesWarmth: {
      src: img("lounge-firewood.jpg"),
      alt: "A warm reading nook with a leather chair and stacked firewood.",
    },
    servicesTeaser: {
      src: img("dining-island.jpg"),
      alt: "A dark dining room with a travertine island and layered materials.",
    },
    process: {
      src: img("living-wide.jpg"),
      alt: "A wide, cinematic concrete-and-glass living space opening to a garden.",
    },
    contactCta: {
      src: img("round-room-dome.jpg"),
      alt: "A dramatic round room with a terracotta dome and cane chairs.",
    },
  },
  about: {
    hero: {
      src: img("living-wide.jpg"),
      alt: "An expansive villa interior with sweeping light and a garden view.",
    },
    horizontal: [
      {
        src: img("sofa-sculpture.jpg"),
        alt: "Art — a bronze sculpture anchoring a layered living room.",
      },
      {
        src: img("fireplace-eames.jpg"),
        alt: "Human-centered — a warm, lived-in room around a fireplace.",
      },
      {
        src: img("meeting-tree.jpg"),
        alt: "Efficiency — a precise, ordered meeting space.",
      },
      {
        src: img("lounge-firewood.jpg"),
        alt: "Warmth — a textured nook with timber and firewood.",
      },
    ] as Img[],
    ethos: {
      src: img("onyx-staircase.jpg"),
      alt: "A serene, gallery-like stair hall in backlit onyx.",
    },
  },
  services: {
    turnkey: {
      src: img("dining-island.jpg"),
      alt: "A complete, furnished luxury dining and kitchen space.",
    },
    construction: {
      src: img("garden-lighting.jpg"),
      alt: "Precise landscape lighting detailing in timber and stone.",
    },
    design: {
      src: img("living-wide.jpg"),
      alt: "A designed interior with cinematic light and a garden outlook.",
    },
    furnishing: {
      src: img("living-art-rug.jpg"),
      alt: "High-end furniture, framed art, and a layered rug in a styled room.",
    },
    roofing: {
      src: img("villa-terrace-dusk.jpg"),
      alt: "A villa roofline and terrace against an evening sky.",
    },
    facades: {
      src: img("terrace-dining.jpg"),
      alt: "A stone-and-glass façade framing an outdoor dining terrace.",
    },
  },
  craft: {
    hero: {
      src: img("garden-lighting.jpg"),
      alt: "Exacting craftsmanship — backlit timber light posts in a courtyard.",
    },
    process: {
      src: img("detail-coffee.jpg"),
      alt: "A disciplined material detail — porcelain, timber, and metal at rest.",
    },
    discipline: {
      src: img("showroom-lounge.jpg"),
      alt: "An organized, professionally finished showroom and atelier floor.",
    },
    waterproofing: {
      src: img("terrace-dining.jpg"),
      alt: "Detailed wet-area and terrace construction work.",
    },
    material: {
      src: img("detail-coffee.jpg"),
      alt: "A macro of refined materials — stone, ceramic, and timber.",
    },
    closing: {
      src: img("round-room-dome.jpg"),
      alt: "A finished, faithfully built dome room — design realized.",
    },
  },
  portfolio: {
    youJing: {
      src: img("showroom-lounge.jpg"),
      alt: "You Jing Life Research Lab — the firm's own studio and showroom.",
    },
    lydClub: {
      src: img("dining-chandelier.jpg"),
      alt: "LYD Aesthetic Space Club — a private clubhouse dining room.",
    },
    cuihu: {
      src: img("onyx-arch-stairs.jpg"),
      alt: "Cuihu large flat — craft-and-art integration in backlit onyx.",
    },
    pingtan: {
      src: img("villa-terrace-dusk.jpg"),
      alt: "Pingtan resort villa terrace at dusk.",
    },
    townhouse: {
      src: img("living-art-rug.jpg"),
      alt: "A townhouse villa living room in a private community.",
    },
    greenSpring: {
      src: img("fireplace-eames.jpg"),
      alt: "Green Spring large flat — a warm fireside living room.",
    },
    polyDuplex: {
      src: img("dining-island.jpg"),
      alt: "A three-story duplex interior with a travertine island.",
    },
    lakeheart: {
      src: img("meeting-tree.jpg"),
      alt: "Lakeheart Island flat — a calm interior with a sculptural tree.",
    },
    mantanghong: {
      src: img("atrium-art.jpg"),
      alt: "Mantanghong townhouse villa — a top-lit atrium with feature art.",
    },
    seaview: {
      src: img("terrace-dining.jpg"),
      alt: "A seaview garden villa with an outdoor dining terrace.",
    },
  },
  contact: {
    hero: {
      src: img("round-room-dome.jpg"),
      alt: "A calm, dramatic round room at rest.",
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

// ── Brand logo lockups (一境 · 1ZONE) ────────────────────────────────────────
// Two trimmed PNGs share the same lockup; pick the variant that stays legible
// against the surface it sits on. The site is dark, so `white` is the default.
export const logo = {
  white: { src: "/logo-white.png", alt: "1ZONE — 一境" },
  black: { src: "/logo-black.png", alt: "1ZONE — 一境" },
  // Intrinsic aspect ratio of the trimmed lockup (width / height).
  ratio: 1868 / 284,
} as const;
