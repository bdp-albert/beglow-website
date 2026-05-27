export type SupplyProject = {
  slug: string;
  location: string;
  title: string;
  description: string;
  images: string[];
};

const base = "/images/projects/supply/16x9";

function slides(slug: string, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `${base}/${slug}/${n}.png`;
  });
}

/** Display order — matches folders under public/images/projects/supply */
const projects: Array<{
  slug: string;
  title: string;
  location: string;
  description: string;
  count: number;
}> = [
  {
    slug: "advant-it-park-india",
    title: "Advant IT Park",
    location: "India",
    description:
      "BG crafted the facade and landscape lighting and updated all lights in 2023. The project is a landmark in greater Noida and is shown frequently in public media.",
    count: 7
  },
  {
    slug: "asaba-hilton-hotel",
    title: "Asaba Hilton Hotel",
    location: "Nigeria",
    description:
      "Hospitality-grade fixtures and dimming for guest rooms and public areas — curated for performance and finish, with supply aligned to the hotel programme and on-site delivery.",
    count: 3
  },
  {
    slug: "dubai-villa",
    title: "Dubai Villa",
    location: "UAE",
    description:
      "A royal family villa with generous landscape — BG supplied all landscape lighting and shaped the light across the garden.",
    count: 4
  },
  {
    slug: "floresta-garden-qatar",
    title: "Floresta Garden",
    location: "Qatar",
    description:
      "Tower residential supply for lobbies, amenities, and exterior — luminaires selected for consistency and durability, with project coordination across multiple packages in Qatar.",
    count: 4
  },
  {
    slug: "jumeirah-gulf-of-bahrain",
    title: "Jumeirah Gulf of Bahrain",
    location: "Bahrain",
    description:
      "Luxury hospitality supply — architectural fixtures, drivers, and scene-ready controls aligned with brand standards, supporting mock-ups and on-time delivery in Bahrain.",
    count: 11
  },
  {
    slug: "riva",
    title: "RIVA",
    location: "GCC",
    description:
      "Armada Group is a leading retail brand across the GCC. RIVA, EDITORIAL, and RIVA HOMES are popular in major shopping malls throughout the region.",
    count: 8
  },
  {
    slug: "sky-office",
    title: "Skylab",
    location: "China",
    description:
      "Workplace lighting supply — downlights, linear systems, and controls for open-plan and meeting spaces, coordinated with local standards and ready for installation in China.",
    count: 10
  }
];

export const moreSupplyProjects = [
  { name: "Busdepot", location: "Doha" },
  { name: "Spine facilities", location: "Saudi Arabia" },
  { name: "E9 residence", location: "India" },
  { name: "Bowling center", location: "Tajikistan" },
  { name: "ICE tower", location: "Philippines" },
  { name: "HPL residence", location: "China" },
  { name: "RIVA CHAALAN Flag shop", location: "Syria" },
  { name: "PAHW 1546, 1550, 1569, 1579", location: "Kuwait" }
] as const;

export const supplyProjects: SupplyProject[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  location: p.location,
  description: p.description,
  images: slides(p.slug, p.count)
}));
