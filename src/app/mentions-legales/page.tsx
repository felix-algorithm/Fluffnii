import React from "react";
import type { Metadata } from "next";
import LegalContent from "./LegalContent";

export const metadata: Metadata = {
  title: "Legal Notice | FluffNii Studio",
  description:
    "Legal notice, privacy policy, and terms of use for FluffNii Studio, custom fursuit workshop.",
};

export default function MentionsLegalesPage() {
  return <LegalContent />;
}
