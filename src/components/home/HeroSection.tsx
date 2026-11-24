"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PolaroidsDefile, { type PolaroidSlide } from "@/components/PolaroidsDefile";
import Bouton from "@/components/Bouton";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import type { Lang } from "@/components/LanguageProvider";
import { useDeviceTier } from "@/lib/deviceTier";
import {
  localizeCommissionNote,
  type HomeLocaleCopy,
} from "@/lib/homeCopy";
import { isModifiedClick } from "@/lib/sectionScroll";
import { cn } from "@/lib/cn";

const AtelierHeroCanvas = dynamic(
  () => import("@/components/three/AtelierHeroCanvas"),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[70%] aspect-square max-w-[380px] rounded-full blur-2xl opacity-55"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(255,240,166,0.72), rgba(255,180,162,0.36) 46%, rgba(30,53,87,0.12) 76%, transparent 100%)",
          }}
        />
      </div>
    ),
  }
);

export interface HeroSectionProps {
  copy: HomeLocaleCopy;
  lang: Lang;
  commissionStatus: {
    open: boolean;
    note: string;
    noteVi: string;
    loaded: boolean;
  };
  heroReady: boolean;
  heroInstant: boolean;
  onNavigateSection: (id: string) => void;
}

const HERO_SLIDES: PolaroidSlide[] = [
  { src: "/images/hero-01.webp", legende: "(001)", alt: "Minny Minnie white Kemono cat fursuit in dark robe" },
  { src: "/images/hero-02.webp", legende: "(002)", alt: "Hunter Knight white and red-streak cat fursuit partial" },
  { src: "/images/hero-03.webp", legende: "(003)", alt: "Sy Tray grey and orange Kemono partial by yellow lockers" },
  { src: "/images/hero-04.webp", legende: "(004)", alt: "Felix Algorithm blue canine partial outdoors in tall grass" },
  { src: "/images/hero-05.webp", legende: "(005)", alt: "Umbréon Retsquôt brown and white horned partial by cafe wall" },
  { src: "/images/hero-06.webp", legende: "(006)", alt: "Orange canine partial with folded grey ear on painted brick wall" },
  { src: "/images/hero-07.webp", legende: "(007)", alt: "Red and orange fox partial holding birthday cake at dusk" },
  { src: "/images/hero-08.webp", legende: "(008)", alt: "Minny Minnie white cat under cherry blossom branches" },
  { src: "/images/hero-09.webp", legende: "(009)", alt: "Hunter Knight seated among floral arrangements in studio light" },
  { src: "/images/hero-10.webp", legende: "(010)", alt: "Sy Tray and Hunter Knight raising padded paws toward camera" },
  { src: "/images/hero-11.webp", legende: "(011)", alt: "Felix Algorithm waist-deep in backlit park grass" },
  { src: "/images/hero-12.webp", legende: "(012)", alt: "Brown and white horned partial seated on vintage sedan" },
  { src: "/images/hero-13.webp", legende: "(013)", alt: "Orange canine partial in grey hoodie reaching brown-padded paw" },
  { src: "/images/hero-14.webp", legende: "(014)", alt: "Shiba Inu head on 3D TPU base holding yellow portable cooling fan" },
  { src: "/images/hero-15.webp", legende: "(015)", alt: "Sy Tray seated on yellow bleachers holding smiley basketball" },
  { src: "/images/polaroid-02.webp", legende: "(016)", alt: "Golden orange Kemono canine head with folded grey ear and cross earrings" },
];

function HeroSection({
  copy,
  lang,
  commissionStatus,
  heroReady,
  heroInstant,
  onNavigateSection,
}: HeroSectionProps) {
  const isVi = lang === "vi";
  const { isReducedMotion } = useDeviceTier();
  const effectiveReady = heroReady || isReducedMotion;
  const instantReveal = heroInstant || isReducedMotion;

  const heroStatusClass = !commissionStatus.loaded
    ? "bg-surface-alt/80 hover:bg-surface-alt border-fg/[0.16] text-fg"
    : commissionStatus.open
    ? "theme-butter-card bg-butter/90 hover:bg-butter border-ink/[0.16] text-ink"
    : "bg-taupe hover:bg-taupe/80 border-ink/[0.16] text-ink dark:bg-night-elevated dark:hover:bg-night-hover dark:border-cream/[0.16] dark:text-cream";

  const statusNote = commissionStatus.loaded
    ? localizeCommissionNote(
        commissionStatus.note,
        commissionStatus.open,
        lang,
        commissionStatus.noteVi
      )
    : "";

  return (
    <section
      aria-label={copy.heroEyebrow}
      className="relative w-full overflow-x-clip"
    >
      <span
        aria-hidden="true"
        className="studio-grid-bg absolute inset-x-0 top-0 h-[85%] opacity-70 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-site mx-auto px-5 md:px-14 pt-[124px] md:pt-[148px] pb-[72px] md:pb-[108px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div
            style={{
              opacity: effectiveReady ? 1 : 0,
              transform: effectiveReady ? "none" : "translateY(24px)",
              transition: instantReveal
                ? "none"
                : "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
            }}
            className="lg:col-span-6 flex flex-col items-start gap-[24px]"
          >
            <div className="flex flex-col items-start gap-2">
              <a
                href="/#contact"
                onClick={(e) => {
                  if (!isModifiedClick(e)) {
                    e.preventDefault();
                    onNavigateSection("contact");
                  }
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 transition-colors focus-ring",
                  heroStatusClass
                )}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  {commissionStatus.loaded && commissionStatus.open && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75" />
                  )}
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-2 w-2",
                      !commissionStatus.loaded
                        ? "bg-slate-500"
                        : commissionStatus.open
                        ? "bg-green-600"
                        : "bg-slate-500"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-eyebrow",
                    commissionStatus.loaded && commissionStatus.open
                      ? "text-ink"
                      : "text-fg"
                  )}
                >
                  {!commissionStatus.loaded
                    ? copy.heroStatusChecking
                    : commissionStatus.open
                    ? copy.heroStatusOpen
                    : copy.heroStatusClosed}
                </span>
              </a>
              {statusNote && (
                <p className="font-sans text-xs sm:text-[13px] text-fg/70 max-w-[460px]">
                  {statusNote}
                </p>
              )}
            </div>

            <p className="font-mono text-[11px] md:text-xs desktop:text-[13px] leading-[1.3] uppercase tracking-eyebrow text-fg/70">
              {copy.heroEyebrow}
            </p>

            <ScrollWordReveal
              as="h1"
              text={copy.heroTitle}
              immediate={effectiveReady}
              delay={instantReveal ? 0 : 0.14}
              stagger={0.045}
              className={cn(
                "font-stagheiz text-fg text-studio-hero",
                isVi
                  ? "text-[clamp(34px,9.6vw,52px)] sm:text-[66px] md:text-[80px] lg:text-[clamp(52px,5.6vw,88px)] leading-[1.18] tracking-[-0.015em]"
                  : "text-[clamp(42px,12vw,58px)] sm:text-[78px] md:text-[94px] lg:text-[clamp(64px,6.6vw,104px)] leading-[0.94] tracking-[-0.015em]"
              )}
            />

            <p className="font-sans font-normal text-[19px] md:text-[22px] desktop:text-[25px] leading-[1.35] tracking-tight max-w-[540px] text-ink/75 dark:text-cream/75">
              {copy.heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <MagneticButton strength={0.2} innerStrength={0.08} cursorLabel={copy.heroContactCta}>
                <Bouton
                  title={copy.heroContactCta}
                  href="/#contact"
                  variant="primary"
                  onClick={(e) => {
                    if (!isModifiedClick(e)) {
                      e.preventDefault();
                      onNavigateSection("contact");
                    }
                  }}
                />
              </MagneticButton>
              <MagneticButton strength={0.16} innerStrength={0.06} cursorLabel={copy.heroProjectsCta}>
                <Bouton
                  title={copy.heroProjectsCta}
                  href="/#projets"
                  variant="secondary"
                  showArrow={false}
                  onClick={(e) => {
                    if (!isModifiedClick(e)) {
                      e.preventDefault();
                      onNavigateSection("projets");
                    }
                  }}
                />
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[470px] lg:h-[560px]">
            <div
              aria-hidden="true"
              className="absolute -inset-4 sm:-inset-8 z-0 rounded-sheet overflow-hidden pointer-events-none lg:pointer-events-auto"
            >
              <AtelierHeroCanvas className="w-full h-full" interactive />
            </div>

            <Link
              href="/accessories"
              data-cursor-kind="open"
              className="hidden sm:inline-flex items-center gap-2.5 absolute top-2 right-2 z-20 rounded-full border studio-hairline-strong bg-cream/85 dark:bg-night-surface/85 backdrop-blur-md pl-1.5 pr-3 py-1 shadow-card transition-transform duration-300 hover:-translate-y-0.5 focus-ring"
            >
              <img
                src="/images/hero-14.webp"
                alt={isVi ? "Quạt tản nhiệt in 3D FluffNii" : "FluffNii 3D-printed cooling fan"}
                width={840}
                height={840}
                className="w-7 h-7 rounded-full object-cover object-[50%_35%]"
              />
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-fg">
                {isVi ? "Phụ kiện in 3D" : "3D Gear"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-fg/75" aria-hidden="true" />
            </Link>

            <div
              data-cursor-kind="drag"
              className="relative z-10 w-full h-full"
            >
              <PolaroidsDefile
                slides={HERO_SLIDES}
                mode="pile"
                delay={heroInstant ? 0.2 : 1.5}
                speed={1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const MemoHeroSection = React.memo(HeroSection);
MemoHeroSection.displayName = "HeroSection";

export default MemoHeroSection;
