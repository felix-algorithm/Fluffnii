import type { Metadata } from "next";
import TermsContent from "./TermsContent";

const TITLE = "Commission Terms & Policy | FluffNii Studio";
const DESCRIPTION =
  "Commission terms, 11-step build workflow, 40% non-refundable deposit rule, 3-month balance window, and repair support for FluffNii Studio.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    url: "/terms",
    siteName: "FluffNii Studio",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "FluffNii Studio commission terms and fursuit workshop",
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

export default function TermsPage() {
  return <TermsContent />;
}
