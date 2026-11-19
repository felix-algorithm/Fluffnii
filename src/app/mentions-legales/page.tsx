import type { Metadata } from "next";
import LegalContent from "./LegalContent";

const TITLE = "Legal Notice & Privacy | FluffNii Studio";
const DESCRIPTION =
  "Workshop notice, intellectual property rules, and quote inquiry privacy details for FluffNii Studio.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/mentions-legales",
  },
  openGraph: {
    type: "website",
    url: "/mentions-legales",
    siteName: "FluffNii Studio",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "FluffNii Studio legal notice and privacy policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-cover.jpg"],
  },
};

export default function MentionsLegalesPage() {
  return <LegalContent />;
}
