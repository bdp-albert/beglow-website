export type DesignProject = {
  slug: string;
  location: string;
  title: string;
  /** 16:9 padded images (pad only, no crop) — see scripts/pad-portfolio-images.mjs */
  images: string[];
};

export const PORTFOLIO_ASPECT_RATIO = 16 / 9;

const base = "/images/projects/design/16x9";

function slides(slug: string, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `${base}/${slug}/${n}.png`;
  });
}

export const designProjects: DesignProject[] = [
  {
    slug: "kuwait-warba-tower",
    location: "Kuwait",
    title: "Warba Tower",
    images: slides("kuwait-warba-tower", 3)
  },
  {
    slug: "bahrain-yacht-club",
    location: "Bahrain",
    title: "Yacht Club",
    images: slides("bahrain-yacht-club", 4)
  },
  {
    slug: "kuwait-pixel-tower",
    location: "Kuwait",
    title: "Pixel Tower",
    images: slides("kuwait-pixel-tower", 4)
  },
  {
    slug: "india-advant-atrium",
    location: "India",
    title: "Advant Atrium",
    images: slides("india-advant-atrium", 3)
  },
  {
    slug: "india-advant-facade",
    location: "India",
    title: "Advant Facade",
    images: slides("india-advant-facade", 1)
  },
  {
    slug: "libya-ahayes-mall",
    location: "Libya",
    title: "Ahayes Mall",
    images: slides("libya-ahayes-mall", 4)
  }
];
