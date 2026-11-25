import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Bingbot",
          "Googlebot",
        ],
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: ["GPTBot", "Google-Extended"],
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    host: "https://www.keplerdev.uk",
    sitemap: "https://www.keplerdev.uk/sitemap.xml",
  };
}
