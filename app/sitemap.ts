import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/web",
    "/mobile",
    "/learn",
    "/learn/what-is-programming",
    "/learn/how-software-works",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-07-18"),
    changeFrequency: path === "" || path === "/learn" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/learn") ? 0.8 : 0.6,
  }));
}
