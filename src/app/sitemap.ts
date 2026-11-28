import type { MetadataRoute } from "next";
import { getPublishedProducts } from "@/lib/catalog/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naffeez.com";
  const staticRoutes = ["", "/shop", "/journal", "/contact", "/about", "/size-guide", "/shipping-returns", "/faqs"];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: siteUrl + route,
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1 : 0.6
  }));

  const catalog = await getPublishedProducts({ limit: 1000 });
  for (const product of catalog.products) {
    entries.push({
      url: siteUrl + "/products/" + product.slug,
      changeFrequency: "weekly",
      priority: 0.7
    });
  }

  return entries;
}