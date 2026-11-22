import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://www.keplerdev.uk",
    sitemap: "https://www.keplerdev.uk/sitemap.xml",
  };
}
