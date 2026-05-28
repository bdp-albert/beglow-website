export const site = {
  name: "BEGLOW",
  tagline: "Space That Glow",
  email: "bdp@beglowdesign.com",
  /** International format without + or spaces — update with your business number. */
  whatsapp: {
    href: "https://wa.me/8613424564627",
    display: "+86 134 2456 4627"
  },
  address: {
    lines: [
      "28th Floor, Lihe International Square",
      "Zhongshan, Guangdong",
      "China"
    ]
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" }
  ]
} as const;

export const coreServices = [
  {
    title: "Lighting Design",
    description:
      "Concept-to-commissioning design for architecture, interiors, facades, and guest experiences.",
    href: "/design"
  },
  {
    title: "Lighting Supply",
    description:
      "Curated luminaires, linear systems, controls, and custom coordination for premium projects.",
    href: "/supply"
  },
  {
    title: "Material Sourcing",
    description:
      "Procurement for interior and architectural materials — furniture, stone, metalwork, and bespoke fittings.",
    href: "/sourcing"
  }
] as const;
