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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
