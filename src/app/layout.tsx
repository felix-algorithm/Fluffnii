import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SmoothScrollProvider } from "@/lib/smoothScroll";
import PageTransitionShell from "@/components/motion/PageTransitionShell";
import CustomCursor from "@/components/motion/CustomCursor";
import "./globals.css";

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://fluffnii.workers.dev";
const HAS_PROTOCOL =
  RAW_SITE_URL.toLowerCase().startsWith("https://") ||
  RAW_SITE_URL.toLowerCase().startsWith("http://");
const SITE_URL = (HAS_PROTOCOL ? RAW_SITE_URL : `https://${RAW_SITE_URL}`).replace(
  /\/+$/,
  ""
);

function resolveMetadataBase(): URL {
  try {
    return new URL(SITE_URL);
  } catch {
    return new URL("https://fluffnii.workers.dev");
  }
}

const SITE_DESCRIPTION =
  "Custom fursuit workshop. We sculpt, pattern, and sew fursuits straight from your character reference sheet.";
const SOCIAL_TITLE = "FluffNii Studio — Custom Fursuit Maker";

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: "FluffNii - Custom Fursuit Maker",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "FluffNii Studio",
    title: SOCIAL_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "FluffNii Studio custom fursuit showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-lang="en">
      <body className="bg-cream text-ink antialiased selection:bg-butter selection:text-ink">
        <LanguageProvider>
          <SmoothScrollProvider>
            <PageTransitionShell>
              {children}
              <CustomCursor />
            </PageTransitionShell>
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
