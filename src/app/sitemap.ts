import type { MetadataRoute } from "next";

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://fluffnii.workers.dev";
const HAS_PROTOCOL =
  RAW_SITE_URL.toLowerCase().startsWith("https://") ||
  RAW_SITE_URL.toLowerCase().startsWith("http://");
const SITE_URL = (HAS_PROTOCOL ? RAW_SITE_URL : `https://${RAW_SITE_URL}`).replace(
  /\/+$/,
  ""
);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/accessories`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
