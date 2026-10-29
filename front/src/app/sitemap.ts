import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  return ["", "/cybersecurity"].map((path) => ({ url: `${siteUrl}${path}` }));
}
