export interface ServiceRow {
  title: string;
  description: string;
}

export const stackServices: ServiceRow[] = [
  {
    title: "Full-stack product builds",
    description:
      "Web and mobile products taken from idea to production: frontend, backend, data and infrastructure, shipped as one coherent system.",
  },
  {
    title: "AI agents and automation",
    description:
      "Agents that answer customers, run workflows and integrate with your tools, built on current-generation models with proper guardrails.",
  },
  {
    title: "White-label platforms",
    description:
      "Our published products, licensed and rebranded as yours. You get a proven build without the build time.",
  },
  {
    title: "Built to your spec",
    description:
      "You bring the requirement, we bring the structure. Fixed scope or ongoing, with honest estimates either way.",
  },
];

export const frameServices: ServiceRow[] = [
  {
    title: "Architectural visualization",
    description:
      "Photoreal stills and walkthroughs from plans and point clouds, so a space can be judged before it exists.",
  },
  {
    title: "Interior design systems",
    description:
      "Computational interior design: layouts, palettes and furnishing schemes generated, iterated and priced as data.",
  },
  {
    title: "CAD automation",
    description:
      "Drawing sets, schedules and revisions produced by software instead of overtime.",
  },
  {
    title: "Digital twins",
    description:
      "Living models of built spaces for planning, facilities and what-if simulation.",
  },
];

export const principles = [
  "Structure first.",
  "Crafted, not assembled.",
  "Owned end to end.",
] as const;
