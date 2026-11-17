import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FluffNii - Custom Fursuit Maker",
  description:
    "Custom fursuit workshop. We sculpt, pattern, and sew fursuits straight from your character reference sheet.",
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
