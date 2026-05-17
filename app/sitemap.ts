import type { MetadataRoute } from "next";
import { seoPages, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/generator", ...seoPages.map((page) => `/${page.slug}`)];

  return routes.map((route) => {
    const isCoreTool =
      route === "/generator" ||
      route === "/youtube-title-generator" ||
      route === "/thumbnail-text-generator" ||
      route === "/tiktok-title-generator" ||
      route === "/viral-shorts-ideas";

    return {
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: route === "" || isCoreTool ? "weekly" : "monthly",
      priority: route === "" ? 1 : isCoreTool ? 0.9 : 0.75,
    };
  });
}
