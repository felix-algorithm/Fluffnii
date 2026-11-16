import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Legal Notice | FluffNii Studio",
  description:
    "Legal notice, privacy policy, and terms of use for FluffNii Studio, custom fursuit workshop.",
};

const LEGAL_SECTIONS = [
  {
    num: "(001)",
    title: "SITE PUBLISHER",
    paragraphs: [
      "FluffNii Studio — custom fursuit workshop.",
      "Legal form: [to be completed]\nSIRET: [to be completed]\nAddress: [to be completed]\nPublication Director: [to be completed]\nEmail: FluffNii.furries@gmail.com",
    ],
  },
  {
    num: "(002)",
    title: "WEBSITE DESIGN",
    paragraphs: [
      "Design and development: Felix Algorithm",
    ],
  },
  {
    num: "(003)",
    title: "INTELLECTUAL PROPERTY",
    paragraphs: [
      "All content on this website (photographs, texts, logotype, graphics, animations) is the exclusive property of FluffNii Studio or its partners, and is protected by copyright law. Any reproduction, representation, or reuse, even partial, without prior written authorization is prohibited. Project visuals remain the property of their respective authors and owners.",
    ],
  },
  {
    num: "(004)",
    title: "PERSONAL DATA",
    paragraphs: [
      "Information submitted via the contact form (name or handle, species, email, project) is used solely to respond to your inquiry and prepare a quote. It is neither sold nor shared, and is retained only for the time necessary to follow up on your request.",
      "In accordance with the GDPR and the French Data Protection Act, you have the right to access, rectify, erase, restrict, and object to the processing of your data. To exercise this right, write to FluffNii.furries@gmail.com. In case of difficulty, you may contact the CNIL (cnil.fr).",
    ],
  },
  {
    num: "(005)",
    title: "COOKIES",
    paragraphs: [
      "This website only uses essential technical storage needed for page rendering and does not set advertising or tracking cookies.",
    ],
  },
  {
    num: "(006)",
    title: "LIABILITY",
    paragraphs: [
      "FluffNii Studio strives to provide accurate and up-to-date information, without being able to guarantee the absence of errors. Links to third-party websites do not engage its liability regarding their content.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#111622]">
      <Navbar />

      <main className="flex-1 w-full max-w-[1120px] mx-auto px-5 md:px-10 pt-[136px] md:pt-[156px] pb-[96px] md:pb-[132px]">
        {/* Header */}
        <div className="flex flex-col gap-5 pb-12 md:pb-16">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/62">
            [Legal information]
          </span>
          <h1 className="font-stagheiz text-[48px] sm:text-[64px] md:text-[80px] leading-[0.94] tracking-[-0.04em] text-[#111622]">
            Legal notice
          </h1>
          <p className="font-sans text-[16px] text-[#111622]/62">
            Last updated: October 2026.
          </p>
        </div>

        {/* 6 Legal Sections */}
        <div className="flex flex-col border-t border-[#111622]/16">
          {LEGAL_SECTIONS.map((sec) => (
            <section
              key={sec.num}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-[#111622]/16"
            >
              <div className="md:col-span-5 flex items-baseline gap-4">
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
                  {sec.num}
                </span>
                <h2 className="font-stagheiz text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.04em] text-[#111622]">
                  {sec.title}
                </h2>
              </div>
              <div className="md:col-span-7 flex flex-col gap-4">
                {sec.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/72 whitespace-pre-line"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
