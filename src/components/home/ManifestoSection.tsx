"use client";

import React from "react";
import { motion } from "framer-motion";
import PhraseScroll from "@/components/PhraseScroll";
import Compteur from "@/components/Compteur";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import type { Lang } from "@/components/LanguageProvider";
import type { HomeLocaleCopy } from "@/lib/homeCopy";
import { useDeviceTier } from "@/lib/deviceTier";
import { cn } from "@/lib/cn";

export interface ManifestoSectionProps {
  copy: HomeLocaleCopy;
  lang: Lang;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;
const EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-fg/70";
const BODY_COPY_CLASS =
  "font-sans text-base md:text-[17px] leading-[1.55] tracking-[-0.01em]";

function PillarSpotlightCard({
  pillar,
  idx,
  isVi,
  interactiveSpotlight,
  reducedMotion,
}: {
  pillar: HomeLocaleCopy["pillars"][number];
  idx: number;
  isVi: boolean;
  interactiveSpotlight: boolean;
  reducedMotion: boolean;
}) {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactiveSpotlight || e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x.toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${y.toFixed(1)}%`);
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reducedMotion ? 0 : 0.85,
        delay: reducedMotion ? 0 : idx * 0.08,
        ease: EASE,
      }}
      onPointerMove={handlePointerMove}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
        } as React.CSSProperties
      }
      className="group relative overflow-hidden rounded-card-lg border p-8 md:p-9 flex flex-col justify-between gap-8 hover:bg-butter transition-colors duration-300 border-fg/[0.16] bg-surface dark:hover:border-butter"
    >
      {interactiveSpotlight && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(240px circle at var(--spot-x) var(--spot-y), rgba(255,240,166,0.45), transparent 72%)",
          }}
        />
      )}

      <div className="relative z-10 flex items-center justify-between">
        <span
          className={cn(
            EYEBROW_CLASS,
            "transition-colors group-hover:text-ink/75"
          )}
        >
          {pillar.num}
        </span>
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-fg/20 transition-colors group-hover:bg-ink"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <h3
          className={cn(
            "font-stagheiz transition-colors text-fg group-hover:text-ink",
            isVi
              ? "text-[25px] md:text-[31px] desktop:text-[29px] leading-[1.18] tracking-[-0.015em]"
              : "text-3xl md:text-[38px] desktop:text-4xl leading-none tracking-[-0.04em]"
          )}
        >
          {pillar.title}
        </h3>
        <p
          className={cn(
            BODY_COPY_CLASS,
            "transition-colors text-fg/75 group-hover:text-ink/85"
          )}
        >
          {pillar.desc}
        </p>
      </div>
    </motion.div>
  );
}

function ManifestoSection({ copy, lang }: ManifestoSectionProps) {
  const isVi = lang === "vi";
  const { isTouch, isReducedMotion, tier } = useDeviceTier();
  const interactiveSpotlight = !isTouch && !isReducedMotion && tier !== "low";

  return (
    <section
      id="studio"
      className="scroll-mt-24 relative w-full max-w-site mx-auto px-5 md:px-14 py-[88px] md:py-[140px] border-t border-fg/[0.16]"
    >
      <motion.div
        initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: isReducedMotion ? 0 : 0.8, delay: 0, ease: EASE }}
        className="flex items-center justify-between mb-6"
      >
        <span className={EYEBROW_CLASS}>{copy.studioEyebrow}</span>
        <span className={EYEBROW_CLASS}>(001)</span>
      </motion.div>

      <div className="studio-divider-x mb-10 md:mb-14" aria-hidden="true" />

      <div className="relative mb-16 md:mb-24 max-w-[1180px] rounded-card-lg px-0 sm:px-4 py-2 sm:py-4">
        <span
          aria-hidden="true"
          className="studio-ledger-bg absolute inset-0 opacity-60 pointer-events-none"
        />
        <div className="relative z-10">
          <PhraseScroll
            key={lang}
            texte={copy.phraseText}
            surlignes1={copy.phraseHighlights1}
            couleur1="#DCE8F5"
            surlignes2={copy.phraseHighlights2}
            couleur2="#FFF0A6"
            tailleMax={isVi ? 44 : 52}
          />
        </div>
      </div>

      <div className="mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[72px] items-center">
          <motion.div
            initial={isReducedMotion ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: isReducedMotion ? 0 : 1, delay: 0, ease: EASE }}
            data-cursor-kind="inspect"
            className="group lg:col-span-5 relative rounded-card-sm overflow-hidden aspect-[3/4] bg-surface-alt border studio-hairline shadow-card"
          >
            <img
              src="/images/formula-fursuit.webp"
              alt={copy.formulaAlt}
              loading="lazy"
              decoding="async"
              width={750}
              height={1000}
              className="w-full h-full object-cover object-[50%_18%] transition-transform duration-700 ease-studio group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-cream/85 dark:bg-night-surface/85 backdrop-blur-md border studio-hairline font-mono text-[10px] uppercase tracking-eyebrow text-fg">
              {isVi ? "Kemono · Tỉa tay" : "Kemono · Hand-shaved"}
            </span>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col justify-center gap-7">
            <div className="flex flex-col gap-4">
              <span className={EYEBROW_CLASS}>{copy.formulaEyebrow}</span>
              <ScrollWordReveal
                as="h2"
                text={copy.formulaTitleLines}
                className={cn(
                  "font-stagheiz text-fg",
                  isVi
                    ? "text-[26px] sm:text-3xl md:text-[34px] desktop:text-[34px] leading-[1.18] tracking-[-0.015em]"
                    : "text-3xl sm:text-[36px] md:text-[42px] desktop:text-[44px] leading-[1.02] tracking-[-0.03em]"
                )}
              />
              <p className="font-sans text-[19px] md:text-[22px] desktop:text-[25px] leading-[1.32] tracking-tight max-w-[580px] text-fg">
                {copy.formulaLead}
              </p>
              <p
                className={cn(
                  BODY_COPY_CLASS,
                  "max-w-[580px] text-ink/75 dark:text-cream/75"
                )}
              >
                {copy.formulaBodyBefore}
                <strong className="font-semibold text-fg">
                  {copy.formulaBodyStrong}
                </strong>
                {copy.formulaBodyAfter}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-fg/[0.14]">
              <motion.div
                initial={isReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: isReducedMotion ? 0 : 0.85, delay: 0, ease: EASE }}
                className="flex flex-col justify-between gap-2"
              >
                <span className={EYEBROW_CLASS}>{copy.statBuilt}</span>
                <Compteur valeur={120} prefixe="+" taille={72} />
              </motion.div>
              <motion.div
                initial={isReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: isReducedMotion ? 0 : 0.85, delay: 0.08, ease: EASE }}
                className="flex flex-col justify-between gap-2"
              >
                <span className={EYEBROW_CLASS}>{copy.statSpecies}</span>
                <Compteur valeur={40} prefixe="+" taille={72} />
              </motion.div>
              <motion.div
                initial={isReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: isReducedMotion ? 0 : 0.85, delay: 0.16, ease: EASE }}
                className="flex flex-col justify-between gap-2"
              >
                <span className={EYEBROW_CLASS}>{copy.statHandmade}</span>
                <Compteur valeur={100} prefixe="" suffixe="%" taille={72} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: isReducedMotion ? 0 : 0.8, delay: 0, ease: EASE }}
        className="flex items-center justify-between mb-8"
      >
        <span className={EYEBROW_CLASS}>{copy.pillarsEyebrow}</span>
        <span className={EYEBROW_CLASS}>(002)</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {copy.pillars.map((pillar, idx) => (
          <PillarSpotlightCard
            key={pillar.num}
            pillar={pillar}
            idx={idx}
            isVi={isVi}
            interactiveSpotlight={interactiveSpotlight}
            reducedMotion={isReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

const MemoManifestoSection = React.memo(ManifestoSection);
MemoManifestoSection.displayName = "ManifestoSection";

export default MemoManifestoSection;
