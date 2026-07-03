export type ProductCategory =
  | "AI"
  | "Commerce"
  | "Fintech"
  | "Operations"
  | "Consumer";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  categoryLabel: string;
  whiteLabel: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    slug: "korero-ai",
    name: "Kōrero AI",
    tagline: "Conversational AI agents",
    description:
      "Customer-facing agents trained on your knowledge base that answer, qualify and hand off to humans.",
    category: "AI",
    categoryLabel: "Conversational AI",
    whiteLabel: true,
    featured: true,
  },
  {
    slug: "framecast",
    name: "FrameCast",
    tagline: "AI content studio",
    description:
      "Briefs in, publish-ready video, social posts and campaigns out, at scale.",
    category: "AI",
    categoryLabel: "AI content",
    whiteLabel: true,
    featured: true,
  },
  {
    slug: "drumbeat",
    name: "Drumbeat",
    tagline: "Marketing automation",
    description:
      "Your AI marketing specialist: strategy, campaigns, sequences and scheduling that run themselves.",
    category: "AI",
    categoryLabel: "Marketing AI",
    whiteLabel: true,
    featured: true,
  },
  {
    slug: "shopgrid",
    name: "Shopgrid",
    tagline: "Multi-store commerce",
    description:
      "Run every storefront, catalog and order flow from one dashboard.",
    category: "Commerce",
    categoryLabel: "Commerce",
    whiteLabel: true,
    featured: true,
  },
  {
    slug: "fernfile",
    name: "Fernfile",
    tagline: "NZ tax filing",
    description:
      "NZ tax filing, minus the dread. Guided returns, IRD-ready, built for individuals and small business.",
    category: "Fintech",
    categoryLabel: "Fintech, NZ",
    whiteLabel: false,
    featured: true,
  },
  {
    slug: "rollcall",
    name: "Rollcall",
    tagline: "School operations",
    description:
      "Enrolment, attendance, timetabling and parent communication in one place.",
    category: "Operations",
    categoryLabel: "Education",
    whiteLabel: true,
    featured: true,
  },
  {
    slug: "tablefare",
    name: "Tablefare",
    tagline: "Hospitality ordering",
    description:
      "Digital menus and QR ordering, from table to kitchen without the wait.",
    category: "Operations",
    categoryLabel: "Hospitality",
    whiteLabel: true,
    featured: false,
  },
  {
    slug: "meshpoint",
    name: "Meshpoint",
    tagline: "IoT device management",
    description:
      "Provision, monitor and control device fleets with live telemetry and alerts.",
    category: "Operations",
    categoryLabel: "IoT",
    whiteLabel: true,
    featured: false,
  },
  {
    slug: "roadflow",
    name: "Roadflow",
    tagline: "Traffic simulation",
    description:
      "Model intersections, signal timing and network changes before they are built.",
    category: "Operations",
    categoryLabel: "Simulation, civic",
    whiteLabel: false,
    featured: false,
  },
  {
    slug: "tradewinds",
    name: "Tradewinds",
    tagline: "Automated trading",
    description:
      "Strategy building, backtesting and disciplined execution for markets.",
    category: "Fintech",
    categoryLabel: "Fintech",
    whiteLabel: true,
    featured: false,
  },
  {
    slug: "watchtower",
    name: "Watchtower",
    tagline: "Security assessment",
    description:
      "Authorized penetration-testing workflows, findings and client-ready reports.",
    category: "Operations",
    categoryLabel: "Security",
    whiteLabel: false,
    featured: false,
  },
  {
    slug: "starpath",
    name: "Starpath",
    tagline: "Astrology, charted",
    description:
      "Birth charts, daily guidance and compatibility, beautifully drawn.",
    category: "Consumer",
    categoryLabel: "Consumer",
    whiteLabel: true,
    featured: false,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const productCategories: ProductCategory[] = [
  "AI",
  "Commerce",
  "Fintech",
  "Operations",
  "Consumer",
];
