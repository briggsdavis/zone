/**
 * 1ZONE — Centralized image manifest.
 *
 * HOW TO REPLACE WITH REAL ASSETS:
 * Every <Image> on the site references a key in this file — no component
 * hardcodes a URL. To swap in the client's professional photography, change
 * only the `src` (and `alt`) here. Recommended: dark, luxurious, high-end
 * interiors; villa exteriors at dusk; material macros (marble, stone, dark
 * wood, bronze); and black-and-white craftsmanship/atelier shots for the
 * Craftsmanship page. Keep `alt` descriptive for accessibility.
 *
 * Placeholders below are curated Unsplash photographs matching the aesthetic.
 */

type Img = { src: string; alt: string };

// Unsplash delivery helper — consistent quality/width.
const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

export const images = {
  home: {
    hero: {
      src: u("1618221195710-dd6b41faaea6"),
      alt: "A dark, cinematic modern living interior with dramatic light.",
    },
    intro: {
      src: u("1615874959474-d609969a20ed"),
      alt: "A moody, high-end lounge with warm low lighting.",
    },
    valuesArt: {
      src: u("1567016432779-094069958ea5"),
      alt: "Sculptural detail in a dark, art-filled space.",
    },
    valuesHuman: {
      src: u("1616486338812-3dadae4b4ace"),
      alt: "A warm, lived-in seating area in soft light.",
    },
    valuesEfficiency: {
      src: u("1618219740975-d40978bb7378"),
      alt: "A precise, minimal architectural interior.",
    },
    valuesWarmth: {
      src: u("1616137466211-f939a420be84"),
      alt: "A warm-toned room with textured fabric and timber.",
    },
    servicesTeaser: {
      src: u("1600210492493-0946911123ea"),
      alt: "A dark luxury interior with layered materials.",
    },
    process: {
      src: u("1504917595217-d4dc5ebe6122"),
      alt: "Black-and-white craftsmanship — hands at work.",
    },
    contactCta: {
      src: u("1600607687939-ce8a6c25118c"),
      alt: "A calm, dramatic architectural space at dusk.",
    },
  },
  about: {
    hero: {
      src: u("1600585154340-be6161a56a0c"),
      alt: "An elegant villa interior with sweeping light.",
    },
    horizontal: [
      {
        src: u("1567016432779-094069958ea5"),
        alt: "Art — sculptural detail in a dark space.",
      },
      {
        src: u("1616486338812-3dadae4b4ace"),
        alt: "Human-centered — a warm, lived-in interior.",
      },
      {
        src: u("1618219740975-d40978bb7378"),
        alt: "Efficiency — a precise architectural interior.",
      },
      {
        src: u("1616137466211-f939a420be84"),
        alt: "Warmth — a warm-toned, textured room.",
      },
    ] as Img[],
    ethos: {
      src: u("1600566753190-17f0baa2a6c3"),
      alt: "A serene, gallery-like residential space.",
    },
  },
  services: {
    turnkey: {
      src: u("1600210492493-0946911123ea"),
      alt: "A complete, furnished luxury living space.",
    },
    construction: {
      src: u("1503387762-592deb58ef4e"),
      alt: "Black-and-white construction detailing.",
    },
    design: {
      src: u("1618221195710-dd6b41faaea6"),
      alt: "A designed interior with cinematic light.",
    },
    furnishing: {
      src: u("1586023492125-27b2c045efd7"),
      alt: "High-end furniture and art in a styled room.",
    },
    roofing: {
      src: u("1600585154526-990dced4db0d"),
      alt: "A villa roofline against an evening sky.",
    },
    facades: {
      src: u("1600573472550-8090b5e0745e"),
      alt: "A stone-clad façade in raking light.",
    },
  },
  craft: {
    hero: {
      src: u("1504917595217-d4dc5ebe6122"),
      alt: "Black-and-white craftsmanship — hands shaping material.",
    },
    process: {
      src: u("1531834685032-c34bf0d84c77"),
      alt: "A disciplined, organized work site.",
    },
    discipline: {
      src: u("1521791136064-7986c2920216"),
      alt: "Black-and-white portrait of focused craftsmen.",
    },
    waterproofing: {
      src: u("1581094794329-c8112a89af12"),
      alt: "Detailed wet-room construction work.",
    },
    material: {
      src: u("1615873968403-89e068629265"),
      alt: "A macro of marble and stone material.",
    },
    closing: {
      src: u("1600566752355-35792bedcfea"),
      alt: "A finished, faithfully built luxury interior.",
    },
  },
  portfolio: {
    youJing: {
      src: u("1600566753190-17f0baa2a6c3"),
      alt: "You Jing Life Research Lab — the firm's own studio.",
    },
    lydClub: {
      src: u("1600210492493-0946911123ea"),
      alt: "LYD Aesthetic Space Club — a private clubhouse.",
    },
    cuihu: {
      src: u("1615874959474-d609969a20ed"),
      alt: "Cuihu large flat — craft-and-art integration.",
    },
    pingtan: {
      src: u("1600585154340-be6161a56a0c"),
      alt: "Pingtan resort villa.",
    },
    townhouse: {
      src: u("1600607687939-ce8a6c25118c"),
      alt: "A townhouse villa in a private community.",
    },
    greenSpring: {
      src: u("1616137466211-f939a420be84"),
      alt: "Green Spring large flat.",
    },
    polyDuplex: {
      src: u("1618219740975-d40978bb7378"),
      alt: "A three-story duplex interior under construction.",
    },
    lakeheart: {
      src: u("1616486338812-3dadae4b4ace"),
      alt: "Lakeheart Island flat interior.",
    },
    mantanghong: {
      src: u("1600585154526-990dced4db0d"),
      alt: "Mantanghong townhouse villa.",
    },
    seaview: {
      src: u("1600573472550-8090b5e0745e"),
      alt: "A seaview garden villa.",
    },
  },
  contact: {
    hero: {
      src: u("1600607687939-ce8a6c25118c"),
      alt: "A calm architectural space at dusk.",
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
