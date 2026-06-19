/**
 * 1ZONE, Central content store.
 * All real copy is sourced from 1ZONE_Brand_Context_Document.md.
 * GAPS are marked with the PLACEHOLDER prefix, replace with client-supplied
 * facts before publishing. Never fabricate facts or international claims.
 */

export const brand = {
  name: "1ZONE",
  cn: "一境",
  lockup: "一境 · 1ZONE",
  atelier: "1ZONE Design Atelier",
  // Primary tagline used consistently site-wide.
  tagline: "Whole-case spaces, built exactly as designed.",
  // Short, scarcity-led positioning line.
  scarcity: "Only ten projects a year.",
  scrollCue: "Scroll to discover the world of 1ZONE",
};

export const positioning = [
  "A boutique turnkey atelier for high-net-worth clients, design, build, and furnishing under one roof.",
  "We accept only ten high-quality whole-case projects each year.",
  "Our specialty is exclusive, made-to-measure service: haute couture, applied to space.",
  "Fidelity of the built result to the design comes first. It is our number-one standard.",
];

export const essence =
  "1ZONE treats building as craft and the finished home, clubhouse, or penthouse as a work of art, obsessive about executing the design faithfully, deliberately low-volume, and warm rather than coldly modern.";

export const values = [
  {
    en: "Art",
    cn: "艺术",
    gloss: "Design as art, fine art, sculpture, and craft integrated into the space.",
  },
  {
    en: "Human-Centered",
    cn: "人本",
    gloss: "Design in service of the people who live in it; lifestyle led.",
  },
  {
    en: "Efficiency",
    cn: "效能",
    gloss: "Functional performance and disciplined process, things that work.",
  },
  {
    en: "Warmth",
    cn: "温暖",
    gloss: "Emotional warmth and comfort, never cold minimalism.",
  },
] as const;

export const valuesStatement =
  "In this era of fusion, where design and art fuse, work and life fuse, and beauty and practicality fuse, old boundaries are breaking and the way people live evolves by the day. Guided by art, human-centered, efficiency, and warmth, we mine a new aesthetic value system for spatial design from nature and from art.";

export const services = [
  {
    key: "turnkey",
    title: "Whole-Case Design & Build",
    short: "End-to-end, single-accountability delivery.",
    body: "The headline offering: one firm carries the entire project, design, construction, furnishing, and handover, under a single line of accountability. You speak to one atelier, not a committee of designers, contractors, and suppliers.",
    points: [
      "Concept, layout, and renderings the build is later measured against",
      "Construction, MEP, and finishes managed in-house",
      "Furnishing, art, and procurement integrated",
      "One contract, one team, one realm",
    ],
  },
  {
    key: "construction",
    title: "Interior Architecture & Construction",
    short: "Structural alteration, MEP, waterproofing, finishes.",
    body: "The discipline at the core of 1ZONE: structural and masonry alteration, mechanical/electrical/plumbing, waterproofing, ceilings, plastering, tiling, and finishing, governed by a 12-node construction-management framework and an exhaustive library of craft standards.",
    points: [
      "Rebar tie-ins and reinforced ground-beams at wet rooms",
      "MEP set out around final furniture positions before any channel is cut",
      "Branded 9-step waterproofing with a manufacturer 10-year warranty",
      "Custom one-piece molded GRG for seamless curved forms",
    ],
  },
  {
    key: "design",
    title: "Spatial & Interior Design",
    short: "Concept, layout, renderings, lead-designer direction.",
    body: "Led by a principal designer, every scheme is developed as renderings that are posted on-site to guide the build, so the crew constructs to the design intent, not around it.",
    points: [
      "Principal-designer-led concept and layout",
      "Photoreal renderings as the build's reference of truth",
      "Material and lighting schemes resolved before site",
    ],
  },
  {
    key: "furnishing",
    title: "Furnishing, Art & Procurement",
    short: "Sourcing and integrating high-end furniture and fine art.",
    body: "We source and integrate premium furniture, lighting, and museum-grade craft, from B&B Italia furniture and Liuli Gongfang glass art to a six-month, double-sided peony embroidery commissioned from the Suzhou Embroidery Museum.",
    points: [
      "Premium international furniture and lighting",
      "Bespoke fine-art and craft commissions",
      "Semi-precious stone and feature-wall sourcing",
    ],
  },
  {
    key: "roofing",
    title: "Villa Roofing Systems",
    short: "Traditional ceramic and modern metal tile, fully built up.",
    body: "Two complete roofing systems with their full build-up and waterproofing, traditional high-temp ceramic tile for classical villas, and lightweight metal tile for modern, coastal, typhoon-exposed sites.",
    points: [
      "Ceramic tile: ~38 kg/m², 50–100 yr life, superb heat & sound insulation",
      "Metal tile: ~5–7 kg/m², 30–50 yr life, typhoon and impact resistant",
      "Documented build-up from concrete base to parapet flashing",
    ],
  },
  {
    key: "facades",
    title: "Stone-Clad Façade Systems",
    short: "Dry-hung stone on welded galvanized sub-frames.",
    body: "Exterior stone cladding on a welded, hot-dip-galvanized steel sub-frame, engineered, de-slagged, primed, and sealed for a façade that endures.",
    points: [
      "M12 expansion bolts into galvanized base plates",
      "Galvanized channel-steel main frame, angle-iron secondary frame",
      "Grooved stone set with AB adhesive, leveled and sealed",
    ],
  },
] as const;

// ── Craftsmanship / How We Build (the credibility & trust page) ──────────────
export const craft = {
  hero: {
    eyebrow: "How We Build",
    title: "Construction is the proof.",
    lede: "Many firms design beautifully. 1ZONE's entire discipline exists to prove the finished space matches the design, down to the detailing you will never see. This is the rigor behind the realm.",
  },
  // The 12-node construction-management framework, synthesized into a journey.
  process: {
    eyebrow: "The 12 Construction-Management Nodes",
    title: "A foolproof plan, before we break ground.",
    intro:
      "Before breaking ground, we make a foolproof plan, with planning, protection, presentation, and monitoring. What follows is the management system every 1ZONE site runs on.",
    nodes: [
      {
        n: "01",
        title: "Consultation & whole-case proposal",
        body: "Design direction and scope are agreed end-to-end, under one accountability.",
      },
      {
        n: "02",
        title: "Design & renderings",
        body: "The scheme is resolved as renderings, the reference the built result is later measured against.",
      },
      {
        n: "03",
        title: "Site monitoring (CCTV)",
        body: "Cameras and on-site monitoring installed before any work begins.",
      },
      {
        n: "04",
        title: "Floor & surface protection",
        body: "Existing floors and surfaces fully protected before the first tool arrives.",
      },
      {
        n: "05",
        title: "Branded, organized site",
        body: "A clean, presented, professionally signed site, order, not chaos.",
      },
      {
        n: "06",
        title: "Insurance & schedule",
        body: "Construction insurance purchased; a clear plan and schedule set.",
      },
      {
        n: "07",
        title: "Groundbreaking ceremony",
        body: "A ritualized commencement that elevates the client experience.",
      },
      {
        n: "08",
        title: "Managed construction",
        body: "Uniformed, trained, safety-compliant crews under a dedicated general site supervisor.",
      },
      {
        n: "09",
        title: "Three illustrated site logs a week",
        body: "Mon / Wed / Fri timestamped photo-and-text logs, each paired with the relevant craft standard.",
      },
      {
        n: "10",
        title: "Concealed-works 360° record",
        body: "A professional 360° plumbing-and-electrical record so future maintenance is never guesswork.",
      },
      {
        n: "11",
        title: "Internal QC, then owner acceptance",
        body: "Inspect internally first, then invite the owner, backed by a four-document QC loop.",
      },
      {
        n: "12",
        title: "Four-party sign-off & handover",
        body: "Project manager, lead designer, 1ZONE QC, and owner co-sign each milestone; then a handover ceremony and warranty.",
      },
    ],
  },
  // Site-discipline trust markers.
  discipline: {
    eyebrow: "A Disciplined Site",
    title: "Order is a form of respect.",
    body: "From November 2025, crews working directly with 1ZONE follow a formal uniform and conduct policy, overseen by a dedicated general site supervisor. A disciplined site is not a chaotic one.",
    markers: [
      {
        stat: "Uniformed",
        label: "Trained crews",
        detail:
          "1ZONE-issued tops, managed seasonally; no sandals on site; hard hats and harnesses for work at height.",
      },
      {
        stat: "3× / week",
        label: "Illustrated site logs",
        detail:
          "Timestamped photo-and-text progress logs every Monday, Wednesday, and Friday, paired with craft standards.",
      },
      {
        stat: "360°",
        label: "Concealed-works record",
        detail:
          "Behind-the-wall MEP captured in a professional 360° record for precise future maintenance.",
      },
      {
        stat: "4-party",
        label: "Milestone sign-off",
        detail:
          "Project manager, lead designer, 1ZONE QC, and owner co-sign before acceptance passes.",
      },
    ],
  },
  // The "right way vs wrong way" craft standards, the heart of the trust page.
  standards: {
    eyebrow: "Craft Standards",
    title: "The right way, every time.",
    intro:
      "The back half of our discipline is a library of construction standards, each contrasting the right way against the wrong way. A selection of what we hold ourselves to:",
    items: [
      {
        title: "Waterproofing",
        signature: true,
        body: "A four-stage method, base reinforcement, two coats of waterproof coating, a flood (closed-water) test, then a protective layer.",
        proof: [
          "Weixing-brand waterproofing, a 9-step process",
          "Manufacturer-issued 10-year warranty certificate",
          "Defined heights: balconies 300 mm · basins 1,200 mm · showers 2,000 mm",
          "Honest caveat: flood-testing is skipped where the unit below is already renovated",
        ],
      },
      {
        title: "Structure & masonry",
        body: "Doweled rebar tie-ins at new-to-old wall junctions, reinforced concrete ground-beams in wet rooms, and disciplined bricklaying with prefabricated lintels.",
        proof: [
          "Rebar embedded ≥150 mm into the wall at openings",
          "18 mm formwork, fine-aggregate concrete, mechanical vibration",
          "Plumb-line checks and the 'three-one' bricklaying method",
        ],
      },
      {
        title: "MEP, planned around the finished space",
        body: "Appliances, ceiling runs, and even final furniture positions are set out before a single channel is cut. Renderings are posted on the walls so the crew builds to the design.",
        proof: [
          "Large-radius bends; pipe sleeves through beams, foam-sealed",
          "Every point labeled; boxes capped and labeled by function",
          "Dedicated brackets for strong and weak current",
        ],
      },
      {
        title: "Sound, fire & penetrations",
        body: "Drainpipes are sound-insulated, ceiling penetrations sealed with flexible fireproof compound, and floor-slab penetrations sleeved with concrete reverse-curb water-stops.",
        proof: [
          "Damping sheet + acoustic wrap + brick/steel enclosure on drains",
          "Correct slope and anti-backflow detailing in wet areas",
        ],
      },
      {
        title: "Floor leveling & backfill",
        body: "Screed-rib and fine manual leveling, with standardized lightweight-ceramsite backfill in grid partitions over steel mesh, never construction-waste fill, which settles and voids.",
        proof: [
          "LECA backfill with grid partitions and steel mesh",
          "Manual fine leveling to a true plane",
        ],
      },
      {
        title: "Ceilings & GRG",
        body: "Double-riveted keel junctions, double-layer staggered gypsum board, and custom one-piece molded GRG for curved forms, fewer seams, far less future cracking.",
        proof: [
          "Main runners ~80 cm, hangers ~90–100 cm, nail spacing ≤20 cm",
          "Concealed GRG access panels",
          "Base woodwork treated against fire, moisture, rot, rust, and termites",
        ],
      },
      {
        title: "Plastering & crack prevention",
        body: "Full-wall meshing, gypsum leveling, and at least three coats of specialty putty, with ceiling seams reinforced in three layers and a final sanding checked under raking light.",
        proof: [
          "Mesh cloth + kraft paper + diagonal kraft paper at seams",
          "Squared corner beads; flatness and verticality inspected",
        ],
      },
      {
        title: "Tiling",
        body: "Laid-out, aligned tiling with thin-set adhesive to minimize hollowing, correct falls to drains in wet areas, and clip systems for large slabs, finished floors protected after acceptance.",
        proof: [
          "Thin-set adhesive against hollowing and delamination",
          "High-spec adhesive + clip systems for large-format slabs",
        ],
      },
    ],
  },
  closing: {
    title: "Detailing most clients never see, done as if they will.",
    body: "This is the single strongest reason to trust an atelier you have not yet met: not the renderings, but the rigor behind them.",
  },
};

// ── Portfolio ────────────────────────────────────────────────────────────────
export const projects = [
  {
    slug: "you-jing-life-research-lab",
    name: "You Jing · Life Research Lab",
    type: "Studio / Reception Space",
    location: "Jinjiang, Fujian",
    area: "700 m²",
    status: "Completed",
    blurb:
      "1ZONE's own showroom and client-reception space, an experiential 'lab' where prospective clients live the firm's materials, craft, and lifestyle philosophy in person.",
  },
  {
    slug: "lyd-aesthetic-space-club",
    name: "LYD Aesthetic Space Club",
    type: "Private Clubhouse",
    location: "Shenzhen",
    area: "1,200 m²",
    status: "Completed",
    blurb:
      "The project where 1ZONE's four philosophies, art, human-centered, efficiency, warmth, were first articulated.",
  },
  {
    slug: "shanghai-cuihu-large-flat",
    name: "Cuihu Large Flat",
    type: "Large Flat / Penthouse",
    location: "Shanghai",
    area: "",
    status: "Completed",
    blurb:
      "A showcase of craft-and-art integration: B&B Italia furniture, a malachite feature wall, Liuli Gongfang glass art, and a six-month double-sided peony embroidery commissioned from the Suzhou Embroidery Museum.",
  },
  {
    slug: "pingtan-resort-villa",
    name: "Pingtan Resort Villa",
    type: "Holiday Villa",
    location: "Pingtan, Fujian",
    area: "~300 m²",
    status: "Completed",
    blurb: "A coastal holiday villa.",
  },
  {
    slug: "jinjiang-townhouse-villa",
    name: "Townhouse Villa",
    type: "Townhouse / Row Villa",
    location: "Jinjiang, Fujian",
    area: "",
    status: "Completed",
    blurb: "A row villa within a private villa community.",
  },
  {
    slug: "jinjiang-green-spring",
    name: "Green Spring Large Flat",
    type: "Large Flat / Penthouse",
    location: "Jinjiang, Fujian",
    area: "",
    status: "Completed",
    blurb: "A large flat within a private residential community.",
  },
  {
    slug: "poly-duplex-interior",
    name: "Three-Story Duplex",
    type: "Duplex Interior",
    location: "Jinjiang, Fujian",
    area: "",
    status: "In Progress",
    blurb: "A three-story duplex interior, under construction.",
  },
  {
    slug: "lakeheart-island-flat",
    name: "Lakeheart Island Flat",
    type: "Flat Interior",
    location: "Jinjiang, Fujian",
    area: "",
    status: "In Progress",
    blurb: "A lakeside flat interior, under construction.",
  },
  {
    slug: "mantanghong-townhouse-villa",
    name: "Mantanghong Townhouse Villa",
    type: "Townhouse Villa",
    location: "Jinjiang, Fujian",
    area: "",
    status: "Upcoming",
    blurb: "A townhouse villa, entering site soon.",
  },
  {
    slug: "seaview-garden-villa",
    name: "Seaview Garden Villa",
    type: "Villa",
    location: "Coastal",
    area: "",
    status: "Upcoming",
    blurb: "A seaview villa, entering site soon.",
  },
] as const;

export type ProjectStatus = "Completed" | "In Progress" | "Upcoming";

// ── About ────────────────────────────────────────────────────────────────────
export const about = {
  philosophy:
    "1ZONE, 一境, 'one realm.' A single, unified, complete environment, delivered by one atelier. The name is the promise: the whole project, under one accountability.",
  mission:
    "To champion spatial aesthetics, and to deliver, faithfully, the space that was designed.",
  vision:
    "A new aesthetic value system for living, mined from nature and from art.",
  origin:
    "PLACEHOLDER, founder story and founding year to be provided by the client.",
  ethos:
    "Ten projects a year. Couture-level customization. An obsession with building the design exactly as drawn.",
};

// ── Contact (all placeholder per GAP list) ───────────────────────────────────
export const contact = {
  email: "hello@1zone.example", // PLACEHOLDER, client to provide
  phone: "+00 000 000 0000", // PLACEHOLDER, client to provide
  studio: "Jinjiang, Fujian, [confirm]", // PLACEHOLDER, client to provide
  note: "All contact details below are placeholders pending client confirmation.",
};

export const nav = [
  { href: "/", label: "Home", index: "01" },
  { href: "/about", label: "About", index: "02" },
  { href: "/services", label: "Services", index: "03" },
  { href: "/craftsmanship", label: "Craftsmanship", index: "04" },
  { href: "/portfolio", label: "Portfolio", index: "05" },
  { href: "/contact", label: "Contact", index: "06" },
] as const;
