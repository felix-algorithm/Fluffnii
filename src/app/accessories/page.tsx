import type { Metadata } from "next";
import AccessoriesShop from "./AccessoriesShop";

const TITLE = "Accessories & 3D Gear | FluffNii Studio";
const DESCRIPTION =
  "Custom 3D-printed fursuit cooling fans (Internal, STD & PLUS editions), fursuit glasses, and custom fan shells.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/accessories",
  },
  openGraph: {
    type: "website",
    url: "/accessories",
    siteName: "FluffNii Studio",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "FluffNii Studio custom fursuit accessories and 3D gear",
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

export default function AccessoriesPage() {
  return <AccessoriesShop />;
}
