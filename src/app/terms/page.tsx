import React from "react";
import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Commission Terms & Policy | FluffNii Studio",
  description:
    "Commission terms, 11-step build workflow, 40% deposit rules, payment deadlines, and repair coverage for FluffNii Studio.",
};

export default function TermsPage() {
  return <TermsContent />;
}
