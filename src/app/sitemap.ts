import type { MetadataRoute } from "next";
import { publicCaseStudies } from "@/lib/content";

const siteUrl = "https://www.keplerdev.uk";
const flagshipRoutes = publicCaseStudies.map((study) => `/work/${study.slug}`);
const glitreRoutes = [
  "/work/glitre-loyalty-platform/customer-app",
  "/work/glitre-loyalty-platform/worker-app",
  "/work/glitre-loyalty-platform/manager",
];
const coreRoutes = [
  "",
  "/ar",
  "/work",
  "/services",
  "/studio",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...coreRoutes, ...flagshipRoutes, ...glitreRoutes];
  const uniqueRoutes = [...new Set(routes)];
  return uniqueRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/ar" ? 0.9 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
