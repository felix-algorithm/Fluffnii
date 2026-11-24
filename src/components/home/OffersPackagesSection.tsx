"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Bouton from "@/components/Bouton";
import CurtainChapter from "@/components/motion/CurtainChapter";
import MagneticButton from "@/components/motion/MagneticButton";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import { useDeviceTier } from "@/lib/deviceTier";
import type { HomeLocaleCopy } from "@/lib/homeCopy";
import type { Lang } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;

const CONTACT_EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-cream/75";
const BODY_COPY_CLASS =
  "font-sans text-base md:text-[17px] leading-[1.55] tracking-[-0.01em]";

const OFFER_1_PARTS = ["Head"];
const OFFER_2_PARTS = ["Fullsuit"];

const OFFER_CARD_STYLES = {
  cream: {
    card: "bg-cream text-ink dark:bg-night-surface dark:text-cream dark:border dark:border-cream/[0.16]",
    eyebrow: "text-fg/70",
    imageBg: "bg-surface-alt",
    desc: "text-fg/75",
    divider: "border-fg/[0.14]",
    bullet: "text-fg/85",
    check: "text-ink dark:text-butter",
    sub: "text-fg/70",
  },
  butter: {
    card: "theme-butter-card bg-butter text-ink",
    eyebrow: "text-ink/70",
    imageBg: "bg-taupe",
    desc: "text-ink/75",
    divider: "border-ink/[0.14]",
    bullet: "text-ink/85",
    check: "text-ink",
    sub: "text-ink/70",
  },
} as const;

const SURFACE_BG_CLASS: Record<string, string> = {
  "#f5f8fc": "bg-cream dark:bg-night-surface",
  "#ffffff": "bg-white dark:bg-night-elevated",
  "#dce8f5": "bg-taupe dark:bg-night-elevated",
  "#fff0a6": "bg-butter",
  "#1e3557": "bg-espresso",
};

function surfaceBgClass(bg: string): string {
  return SURFACE_BG_CLASS[bg.toLowerCase()] ?? "bg-cream dark:bg-night-surface";
}

interface PackageMediaSpec {
  width: number;
  height: number;
  objectPosition: string;
}

const PACKAGE_MEDIA_SPECS: Record<string, PackageMediaSpec> = {
  "/images/offer-01.webp": {
    width: 684,
    height: 548,
    objectPosition: "50% 38%",
  },
  "/images/gallery-r2-05.webp": {
    width: 840,
    height: 672,
    objectPosition: "55% 50%",
  },
  "/images/polaroid-03.webp": {
    width: 684,
    height: 684,
    objectPosition: "74% 58%",
  },
  "/images/gallery-r2-07.webp": {
    width: 840,
    height: 672,
    objectPosition: "50% 58%",
  },
  "/images/gallery-r2-08.webp": {
    width: 840,
    height: 1050,
    objectPosition: "50% 22%",
  },
  "/images/project-04.webp": {
    width: 960,
    height: 1707,
    objectPosition: "50% 26%",
  },
};

interface OfferCardProps {
  variant: keyof typeof OFFER_CARD_STYLES;
  tag: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imagePosition: string;
  title: string;
  desc: string;
  bullets: string[];
  sub: string;
  cta: string;
  parts: string[];
  delay?: number;
  isVi: boolean;
  isReducedMotion: boolean;
  onSelectParts: (parts: string[]) => void;
}

const OfferCard = React.memo(function OfferCard({
  variant,
  tag,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imagePosition,
  title,
  desc,
  bullets,
  sub,
  cta,
  parts,
  delay = 0,
  isVi,
  isReducedMotion,
  onSelectParts,
}: OfferCardProps) {
  const styles = OFFER_CARD_STYLES[variant];

  const handleCtaClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onSelectParts(parts);
    },
    [onSelectParts, parts]
  );

  return (
    <motion.div
      initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: isReducedMotion ? 0.01 : 0.85,
        delay: isReducedMotion ? 0 : delay,
        ease: EASE,
      }}
      className={cn(
        "rounded-sheet p-7 sm:p-10 flex flex-col justify-between gap-8 shadow-card",
        styles.card
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow",
              styles.eyebrow
            )}
          >
            {tag}
          </span>
        </div>
        <div
          className={cn(
            "w-full aspect-[5/4] rounded-card overflow-hidden",
            styles.imageBg
          )}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            width={imageWidth}
            height={imageHeight}
            style={{ objectPosition: imagePosition }}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3
            className={cn(
              "font-stagheiz text-[34px] md:text-[42px] py-[0.04em]",
              isVi ? "leading-[1.16]" : "leading-[0.96]"
            )}
          >
            {title}
          </h3>
          <p className={cn(BODY_COPY_CLASS, styles.desc)}>{desc}</p>
        </div>
        <ul className={cn("flex flex-col gap-3 pt-2 border-t", styles.divider)}>
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className={cn(
                "flex items-start gap-3 font-sans text-base md:text-[17px] leading-normal",
                styles.bullet
              )}
            >
              <Check className={cn("w-4 h-4 mt-1 shrink-0", styles.check)} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "pt-6 border-t flex flex-wrap items-center justify-between gap-4",
          styles.divider
        )}
      >
        <div
          className={cn(
            "font-mono text-[11px] md:text-xs uppercase tracking-eyebrow",
            styles.sub
          )}
        >
          {sub}
        </div>
        <MagneticButton as="span" strength={0.18}>
          <Bouton
            title={cta}
            href="/#contact"
            variant="primary"
            onClick={handleCtaClick}
          />
        </MagneticButton>
      </div>
    </motion.div>
  );
});

export interface OffersPackagesSectionProps {
  copy: HomeLocaleCopy;
  lang: Lang;
  onPickParts: (parts: string[]) => void;
  onNavigateSection: (id: string) => void;
}

const OffersPackagesSection = React.memo(function OffersPackagesSection({
  copy,
  lang,
  onPickParts,
  onNavigateSection,
}: OffersPackagesSectionProps) {
  const isVi = lang === "vi";
  const { tier, isReducedMotion } = useDeviceTier();
  const allowHoverLift = !isReducedMotion && tier !== "low";

  const handleSelectParts = useCallback(
    (parts: string[]) => {
      onPickParts(parts);
      onNavigateSection("contact");
    },
    [onPickParts, onNavigateSection]
  );

  return (
    <CurtainChapter
      id="offres"
      tone="espresso"
      showGrid={true}
      className="scroll-mt-24 dark:border-y dark:border-cream/[0.12]"
    >
      <div className="max-w-site mx-auto px-5 md:px-14 py-20 md:py-[132px]">
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: isReducedMotion ? 0.01 : 0.85, ease: EASE }}
          className="flex items-center justify-between mb-6"
        >
          <span className={CONTACT_EYEBROW_CLASS}>{copy.offersEyebrow}</span>
          <span className={CONTACT_EYEBROW_CLASS}>(008)</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
          <ScrollWordReveal
            text={copy.offersTitle}
            as="h2"
            className={cn(
              "lg:col-span-7 font-stagheiz text-cream",
              isVi
                ? "text-4xl sm:text-[52px] md:text-[64px] leading-[1.16] tracking-tight py-[0.06em]"
                : "text-[44px] sm:text-[64px] md:text-[80px] leading-[0.94]"
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
            className="lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] text-cream/80"
          >
            {copy.offersDesc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-8">
          <OfferCard
            variant="cream"
            tag={copy.offer1Tag}
            imageSrc="/images/offer-01.webp"
            imageAlt={copy.offer1Alt}
            imageWidth={684}
            imageHeight={548}
            imagePosition="50% 40%"
            title={copy.offer1Title}
            desc={copy.offer1Desc}
            bullets={copy.offer1Bullets}
            sub={copy.offer1Sub}
            cta={copy.offer1Cta}
            parts={OFFER_1_PARTS}
            delay={0}
            isVi={isVi}
            isReducedMotion={isReducedMotion}
            onSelectParts={handleSelectParts}
          />
          <OfferCard
            variant="butter"
            tag={copy.offer2Tag}
            imageSrc="/images/offer-02.webp"
            imageAlt={copy.offer2Alt}
            imageWidth={960}
            imageHeight={768}
            imagePosition="52% 42%"
            title={copy.offer2Title}
            desc={copy.offer2Desc}
            bullets={copy.offer2Bullets}
            sub={copy.offer2Sub}
            cta={copy.offer2Cta}
            parts={OFFER_2_PARTS}
            delay={0.1}
            isVi={isVi}
            isReducedMotion={isReducedMotion}
            onSelectParts={handleSelectParts}
          />
        </div>

        <p className="font-mono text-xs desktop:text-[13px] text-cream/75 mb-20">
          {copy.furNotice}
        </p>

        <div id="constitue-ton-offre" className="scroll-mt-24 pt-4">
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: isReducedMotion ? 0.01 : 0.85, ease: EASE }}
            className="mb-7"
          >
            <span className={CONTACT_EYEBROW_CLASS}>{copy.packagesEyebrow}</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-[124px] sm:gap-y-[130px] pt-[90px]">
            {copy.packages.map((pkg, idx) => {
              const isButterPkg = pkg.bg.toLowerCase() === "#fff0a6";
              const spec = PACKAGE_MEDIA_SPECS[pkg.img] ?? {
                width: 840,
                height: 840,
                objectPosition: pkg.imgPos || "50% 50%",
              };

              return (
                <motion.div
                  key={pkg.optionValue}
                  initial={
                    isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 36 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: isReducedMotion ? 0.01 : 0.8,
                    delay: isReducedMotion ? 0 : (idx % 3) * 0.08,
                    ease: EASE,
                  }}
                  className="h-full"
                >
                  <motion.div
                    whileHover={allowHoverLift ? { y: -8 } : undefined}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={cn(
                      "relative h-full rounded-card-lg px-[26px] pb-7 pt-[148px] sm:pt-[152px] flex flex-col justify-between gap-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(0,0,0,0.34)]",
                      surfaceBgClass(pkg.bg),
                      isButterPkg
                        ? "theme-butter-card text-ink"
                        : "text-ink dark:text-cream dark:border dark:border-cream/[0.14]"
                    )}
                  >
                    <div
                      style={{
                        transform: `translateX(-50%) rotate(${pkg.rot}deg)`,
                      }}
                      className="absolute -top-[80px] left-1/2 w-[184px] sm:w-[192px] h-[208px] p-2 pb-4 rounded-[4px] bg-white shadow-[0_18px_30px_-16px_rgba(0,0,0,0.55)]"
                    >
                      <div className="w-full h-full overflow-hidden rounded-[2px] bg-taupe/40">
                        <img
                          src={pkg.img}
                          alt={pkg.title}
                          loading="lazy"
                          decoding="async"
                          width={spec.width}
                          height={spec.height}
                          style={{ objectPosition: spec.objectPosition }}
                          className="w-full h-full object-cover rounded-[2px]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3
                        className={cn(
                          "font-stagheiz text-3xl lg:text-[34px] text-center py-[0.04em]",
                          isVi ? "leading-[1.16]" : "leading-none"
                        )}
                      >
                        {pkg.title}
                      </h3>

                      <div
                        className={cn(
                          "flex flex-col border-t border-dashed",
                          isButterPkg
                            ? "border-ink/30"
                            : "border-ink/30 dark:border-cream/25"
                        )}
                      >
                        {pkg.rows.map((row) => (
                          <div
                            key={row.label}
                            className={cn(
                              "flex items-baseline justify-between gap-3 py-3 border-b border-dashed",
                              isButterPkg
                                ? "border-ink/30"
                                : "border-ink/30 dark:border-cream/25"
                            )}
                          >
                            <span
                              className={cn(
                                "font-mono text-[11px] uppercase tracking-wider min-w-0 leading-snug",
                                isButterPkg
                                  ? "text-ink/70"
                                  : "text-ink/70 dark:text-cream/70"
                              )}
                            >
                              {row.label}
                            </span>
                            <span
                              className={cn(
                                "font-mono text-xs lg:text-[13px] font-bold shrink-0 text-right tabular-nums",
                                isButterPkg
                                  ? "text-ink"
                                  : "text-ink dark:text-cream"
                              )}
                            >
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <p
                        className={cn(
                          "font-sans text-[13px] leading-normal",
                          isButterPkg
                            ? "text-ink/75"
                            : "text-ink/75 dark:text-cream/75"
                        )}
                      >
                        {pkg.note}
                      </p>
                    </div>

                    <div className="flex flex-col items-center pt-2">
                      <MagneticButton as="div" className="w-full" strength={0.14}>
                        <Bouton
                          title={copy.packageCta}
                          href="/#contact"
                          variant="primary"
                          fullWidth
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelectParts([pkg.optionValue]);
                          }}
                        />
                      </MagneticButton>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14">
            <motion.div
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: isReducedMotion ? 0.01 : 0.75, ease: EASE }}
              className="rounded-card-lg p-7 sm:p-8 flex flex-col gap-5 bg-cream text-ink dark:bg-night-surface dark:text-cream dark:border dark:border-cream/[0.14]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-eyebrow text-fg/70">
                  {copy.extraOptionsEyebrow}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-eyebrow text-fg/70">
                  {copy.extraOptionsTag}
                </span>
              </div>
              <div className="flex flex-col divide-y divide-dashed border-t border-b border-dashed divide-fg/20 border-fg/20">
                {copy.extraOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-3"
                  >
                    <span className="font-sans text-[15px] font-medium min-w-0 leading-snug text-fg">
                      {opt.label}
                    </span>
                    {opt.href ? (
                      <Link
                        href={opt.href}
                        data-cursor-kind="open"
                        className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold underline underline-offset-4 sm:shrink-0 sm:text-right leading-snug tabular-nums focus-visible:outline-none focus-visible:ring-2 rounded text-espresso hover:text-ink focus-visible:ring-ink dark:text-butter dark:hover:text-cream dark:focus-visible:ring-butter"
                      >
                        <span>{opt.value}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>
                    ) : (
                      <span className="font-sans text-sm sm:text-right leading-snug tabular-nums text-fg/75">
                        {opt.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0.01 : 0.75,
                delay: isReducedMotion ? 0 : 0.08,
                ease: EASE,
              }}
              className="theme-butter-card rounded-card-lg bg-butter text-ink p-7 sm:p-8 flex flex-col justify-between gap-5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-eyebrow text-ink/70">
                    {copy.freeGiftsEyebrow}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-eyebrow text-ink/70">
                    {copy.freeGiftsTag}
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {copy.freeGifts.map((gift) => (
                    <li
                      key={gift}
                      className="flex items-center gap-2.5 rounded-[14px] bg-cream/75 border border-ink/[0.12] px-3.5 py-2.5 font-sans text-sm font-medium text-ink"
                    >
                      <Check className="w-4 h-4 shrink-0 text-ink" />
                      <span>{gift}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-ink text-cream px-4 py-3.5 flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-butter">
                  {copy.bonusTag}
                </span>
                <p className="font-sans text-sm leading-[1.45] text-cream/90">
                  {copy.bonusText}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </CurtainChapter>
  );
});

export default OffersPackagesSection;
