export const LAUNCH_CATEGORIES = [
  { label: "Casual Shirts", slug: "casual-shirts", group: "Shirts" },
  { label: "Dress Shirts", slug: "dress-shirts", group: "Shirts" },
  { label: "Seasonal Trousers", slug: "seasonal-trousers", group: "Trousers" },
  { label: "Winter Trousers", slug: "winter-trousers", group: "Trousers" },
  { label: "Hoodies", slug: "hoodies", group: "Hoodies" }
] as const;

export type LaunchCategorySlug = (typeof LAUNCH_CATEGORIES)[number]["slug"];