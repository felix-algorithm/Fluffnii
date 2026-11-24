"use client";

import React from "react";
import { motion } from "framer-motion";
import Bouton from "@/components/Bouton";
import Deroule from "@/components/Deroule";
import FAQAccordion from "@/components/FAQAccordion";
import MiseAuPoint from "@/components/MiseAuPoint";
import MagneticButton from "@/components/motion/MagneticButton";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import { useDeviceTier } from "@/lib/deviceTier";
import type { HomeLocaleCopy } from "@/lib/homeCopy";
import { FAQ_ITEMS, TIMELINE_STEPS } from "@/lib/studioExtraCopy";
import type { Lang } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;

const EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-fg/70";
const BODY_COPY_CLASS =
  "font-sans text-base md:text-[17px] leading-[1.55] tracking-[-0.01em]";

export interface TimelineFaqSectionProps {
  copy: HomeLocaleCopy;
  lang: Lang;
  onNavigateSection: (id: string) => void;
}

function TimelineFaqSection({
  copy,
  lang,
  onNavigateSection,
}: TimelineFaqSectionProps) {
  const isVi = lang === "vi";
  const { isReducedMotion } = useDeviceTier();

  return (
    <>
      <section
        id="deroule"
        className="scroll-mt-24 w-full max-w-site mx-auto px-5 md:px-14 py-24 md:py-[140px]"
      >
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: isReducedMotion ? 0.01 : 0.85, ease: EASE }}
          className="w-full flex items-center justify-between mb-12 md:mb-16"
        >
          <span className={EYEBROW_CLASS}>{copy.timelineEyebrow}</span>
          <span className={EYEBROW_CLASS}>(009)</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
          <div className="w-full lg:w-[520px] lg:shrink-0 lg:sticky lg:top-[140px] flex flex-col items-start gap-7">
            <ScrollWordReveal
              text={copy.timelineTitle}
              as="h2"
              className={cn(
                "font-stagheiz text-fg",
                isVi
                  ? "text-4xl sm:text-[50px] md:text-[58px] leading-[1.16] tracking-[-0.02em] py-[0.06em]"
                  : "text-[44px] sm:text-[60px] md:text-[68px] leading-[0.95] tracking-[-0.005em]"
              )}
            />
            <motion.p
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0.01 : 0.85,
                delay: isReducedMotion ? 0 : 0.15,
                ease: EASE,
              }}
              className={cn(BODY_COPY_CLASS, "text-ink/70 dark:text-cream/75")}
            >
              {copy.timelineDesc}
            </motion.p>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton as="span" strength={0.18}>
                <Bouton
                  title={copy.heroContactCta}
                  href="/#contact"
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection("contact");
                  }}
                />
              </MagneticButton>
              <MagneticButton as="span" strength={0.15}>
                <Bouton
                  title={copy.timelineTermsCta}
                  href="/terms"
                  variant="secondary"
                  showArrow={false}
                />
              </MagneticButton>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full">
            <Deroule etapes={TIMELINE_STEPS[lang]} />
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-24 w-full max-w-site mx-auto px-5 md:px-14 py-24 md:py-[140px] border-t border-fg/[0.16]"
      >
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: isReducedMotion ? 0.01 : 0.85, ease: EASE }}
          className="w-full flex items-center justify-between mb-12 md:mb-16"
        >
          <span className={EYEBROW_CLASS}>{copy.faqEyebrow}</span>
          <span className={EYEBROW_CLASS}>(010)</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="w-full lg:w-[480px] lg:shrink-0 lg:sticky lg:top-[120px] flex flex-col items-start gap-7">
            <ScrollWordReveal
              text={copy.faqTitle}
              as="h2"
              className={cn(
                "font-stagheiz text-fg",
                isVi
                  ? "text-4xl sm:text-[50px] md:text-[58px] leading-[1.16] tracking-[-0.02em] py-[0.06em]"
                  : "text-[44px] sm:text-[60px] md:text-[68px] leading-[0.95] tracking-[-0.005em]"
              )}
            />
            <p className={cn(BODY_COPY_CLASS, "text-ink/70 dark:text-cream/75")}>
              {copy.faqDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton as="span" strength={0.18}>
                <Bouton
                  title={copy.faqAskCta}
                  href="/#contact"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection("contact");
                  }}
                />
              </MagneticButton>
              <MagneticButton as="span" strength={0.15}>
                <Bouton
                  title={copy.faqTermsCta}
                  href="/terms"
                  variant="primary"
                  showArrow={false}
                />
              </MagneticButton>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full">
            <FAQAccordion items={FAQ_ITEMS[lang]} />
          </div>
        </div>
      </section>

      <section id="bonus" className="scroll-mt-24">
        <MiseAuPoint />
      </section>
    </>
  );
}

const MemoTimelineFaqSection = React.memo(TimelineFaqSection);
MemoTimelineFaqSection.displayName = "TimelineFaqSection";

export default MemoTimelineFaqSection;
