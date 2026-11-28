import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naffeez.com";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/shop", "/products/", "/journal"],
      disallow: ["/admin", "/account", "/cart", "/checkout", "/api"]
    },
    sitemap: siteUrl + "/sitemap.xml"
  };
}