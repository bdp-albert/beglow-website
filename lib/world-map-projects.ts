/**
 * Project pins on the About page world map.
 * Source: 项目-国家-年份-种类_汇总.xlsx
 * Multiple projects in the same country share one pin when they would overlap.
 */

export type WorldMapProjectItem = {
  name: string;
  /** 种类 — Design, Supply, Design & Supply, etc. */
  category: string;
  year: number;
};

export type WorldMapPin = {
  id: string;
  /** Country / region label shown in the tooltip header */
  region: string;
  lat: number;
  lng: number;
  projects: WorldMapProjectItem[];
};

function formatCategory(raw: string): string {
  return raw.replace(/\s*&\s*/g, " · ").trim();
}

/** All map pins (grouped by geography). */
export const worldMapPins: WorldMapPin[] = [
  {
    id: "kuwait",
    region: "Kuwait",
    lat: 29.38,
    lng: 47.99,
    projects: [
      { name: "Pixel Tower", category: formatCategory("Design"), year: 2025 },
      { name: "Warba Tower", category: formatCategory("Design"), year: 2026 },
      { name: "PAHW", category: formatCategory("Design& Supply"), year: 2026 },
      { name: "Al Momen Villa", category: formatCategory("Supply"), year: 2024 }
    ]
  },
  {
    id: "qatar",
    region: "Qatar",
    lat: 25.29,
    lng: 51.53,
    projects: [
      { name: "Floresta Garden", category: formatCategory("Supply"), year: 2022 },
      { name: "Bus Depot", category: formatCategory("Design& Supply"), year: 2022 }
    ]
  },
  {
    id: "bahrain",
    region: "Bahrain",
    lat: 26.23,
    lng: 50.59,
    projects: [
      { name: "Marina Yacht Club", category: formatCategory("Design"), year: 2024 },
      {
        name: "Jumeirah Gulf of Bahrain",
        category: formatCategory("Supply"),
        year: 2020
      }
    ]
  },
  {
    id: "gcc-riva",
    region: "GCC",
    lat: 25.2,
    lng: 51.55,
    projects: [
      { name: "RIVA", category: formatCategory("Design& Supply"), year: 2026 }
    ]
  },
  {
    id: "ksa",
    region: "Saudi Arabia",
    lat: 24.71,
    lng: 46.68,
    projects: [
      {
        name: "Spines Facilities",
        category: formatCategory("Supply"),
        year: 2024
      }
    ]
  },
  {
    id: "dubai",
    region: "UAE · Dubai",
    lat: 25.2,
    lng: 55.27,
    projects: [
      { name: "Dubai Villa", category: formatCategory("Supply"), year: 2025 },
      {
        name: "Marriott Dubai Harbour Hotel and Suites",
        category: formatCategory("Supply"),
        year: 2023
      }
    ]
  },
  {
    id: "india",
    region: "India · Noida & Delhi NCR",
    lat: 28.57,
    lng: 77.32,
    projects: [
      {
        name: "Advant IT Business Park",
        category: formatCategory("Design& Supply"),
        year: 2023
      },
      {
        name: "E9 Residence",
        category: formatCategory("Design& Supply"),
        year: 2024
      }
    ]
  },
  {
    id: "china-chengdu",
    region: "China · Chengdu",
    lat: 30.57,
    lng: 104.07,
    projects: [
      { name: "Skylab Office", category: formatCategory("Design& Supply"), year: 2024 }
    ]
  },
  {
    id: "china-beijing",
    region: "China · Beijing",
    lat: 39.9,
    lng: 116.41,
    projects: [
      { name: "HPL Residence", category: formatCategory("Design& Supply"), year: 2025 },
      { name: "YTX Project", category: formatCategory("Supply"), year: 2025 },
      { name: "TFJD Residence", category: formatCategory("Supply"), year: 2024 }
    ]
  },
  {
    id: "uganda",
    region: "Uganda",
    lat: 0.35,
    lng: 32.58,
    projects: [
      {
        name: "Ministry of Finance",
        category: formatCategory("Supply"),
        year: 2023
      }
    ]
  },
  {
    id: "nigeria",
    region: "Nigeria",
    lat: 6.2,
    lng: 6.73,
    projects: [
      { name: "Asaba Hilton", category: formatCategory("Supply"), year: 2023 }
    ]
  },
  {
    id: "egypt-cairo",
    region: "Egypt · Cairo",
    lat: 30.04,
    lng: 31.24,
    projects: [
      { name: "Dejoyas", category: formatCategory("Supply"), year: 2023 }
    ]
  },
  {
    id: "philippines-boracay",
    region: "Philippines · Boracay",
    lat: 11.97,
    lng: 121.92,
    projects: [
      { name: "Mandarin Hotels", category: formatCategory("Supply"), year: 2024 }
    ]
  },
  {
    id: "philippines-manila",
    region: "Philippines · Manila",
    lat: 14.6,
    lng: 120.98,
    projects: [
      { name: "ICE Tower", category: formatCategory("Supply"), year: 2024 }
    ]
  },
  {
    id: "tajikistan",
    region: "Tajikistan · Khujand",
    lat: 40.28,
    lng: 69.62,
    projects: [
      { name: "Bowling Center", category: formatCategory("Design& Supply"), year: 2024 }
    ]
  },
  {
    id: "guatemala",
    region: "Guatemala",
    lat: 14.63,
    lng: -90.51,
    projects: [
      { name: "Proyectos Rosul", category: formatCategory("Supply"), year: 2024 }
    ]
  },
  {
    id: "usa",
    region: "United States · Florida",
    lat: 29.9,
    lng: -81.31,
    projects: [
      {
        name: "Castillo Real St. Augustine Beach, Tapestry by Hilton",
        category: formatCategory("Supply"),
        year: 2024
      }
    ]
  },
  {
    id: "sri-lanka",
    region: "Sri Lanka · Colombo",
    lat: 6.93,
    lng: 79.86,
    projects: [
      { name: "Green Path Office", category: formatCategory("Supply"), year: 2019 }
    ]
  },
  {
    id: "indonesia",
    region: "Indonesia · Surabaya",
    lat: -7.26,
    lng: 112.75,
    projects: [
      { name: "Hotel Wahid Salatiga", category: formatCategory("Design"), year: 2024 }
    ]
  },
  {
    id: "maldives",
    region: "Maldives",
    lat: 4.18,
    lng: 73.51,
    projects: [
      { name: "Seychelles Labriz", category: formatCategory("Supply"), year: 2026 }
    ]
  }
];
