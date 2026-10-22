import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Demo routes are intentionally noindex/no-follow and are not promoted in a sitemap.
  return [];
}
