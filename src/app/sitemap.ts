import { MetadataRoute } from "next";
import { publicCaseStudies } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.keplerdev.uk";
  const routes: MetadataRoute.Sitemap = ["", "/work", "/mahmoud", "/contact"].map((path, index) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: index === 0 ? "weekly" : "monthly", priority: index === 0 ? 1 : .8 }));
  return routes.concat(publicCaseStudies.map((study) => ({ url: `${base}/work/${study.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .7 })));
}
