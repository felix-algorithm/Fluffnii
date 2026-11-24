"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import type { Lang } from "@/components/LanguageProvider";
import type { HomeLocaleCopy } from "@/lib/homeCopy";
import { useDeviceTier } from "@/lib/deviceTier";
import { cn } from "@/lib/cn";

export interface SpeciesShowcaseSectionProps {
  copy: HomeLocaleCopy;
  lang: Lang;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;
const RESULT_CELL_DELAYS = [0, 0.04, 0.08, 0.12, 0.2, 0.16, 0.28, 0.24] as const;

const EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-fg/70";
const CONTACT_EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-cream/75";
const BODY_COPY_CLASS =
  "font-sans text-base md:text-[17px] leading-[1.55] tracking-[-0.01em]";

const SURFACE_BG_CLASS: Record<string, string> = {
  "#f5f8fc": "bg-cream dark:bg-night-surface",
  "#ffffff": "bg-white dark:bg-night-elevated",
  "#dce8f5": "bg-taupe dark:bg-night-elevated",
  "#fff0a6": "bg-butter",
  "#1e3557": "bg-espresso",
};

const SPECIES_IMAGE_SPECS: Record<
  string,
  { width: number; height: number; objectPosition: string }
> = {
  "/images/species-bear.webp": {
    width: 760,
    height: 1351,
    objectPosition: "50% 32%",
  },
  "/images/species-lion.webp": {
    width: 760,
    height: 1351,
    objectPosition: "50% 26%",
  },
  "/images/species-foxcat.webp": {
    width: 760,
    height: 1013,
    objectPosition: "50% 20%",
  },
  "/images/species-dog.webp": {
    width: 760,
    height: 1351,
    objectPosition: "50% 36%",
  },
  "/images/species-shiba.webp": {
    width: 760,
    height: 1013,
    objectPosition: "50% 18%",
  },
};

const WHY_SLIDES = [
  {
    mot: "Aura Farming",
    src: "/images/why-01.webp",
    width: 1280,
    height: 853,
    objectPosition: "48% 32%",
    veil: 0.46,
  },
  {
    mot: "No Homo",
    src: "/images/why-02.webp",
    width: 1280,
    height: 720,
    objectPosition: "46% 42%",
    veil: 0.44,
  },
  {
    mot: "Silly Cat",
    src: "/images/why-03.webp",
    width: 1280,
    height: 960,
    objectPosition: "50% 38%",
    veil: 0.5,
  },
  {
    mot: "Vicious Dog",
    src: "/images/why-04.webp",
    width: 1280,
    height: 961,
    objectPosition: "50% 42%",
    veil: 0.44,
  },
] as const;

function surfaceBgClass(bg: string): string {
  return SURFACE_BG_CLASS[bg.toLowerCase()] ?? "bg-cream dark:bg-night-surface";
}

function cardToneClasses(bg: string, alwaysDark: boolean) {
  const isButter = bg.toLowerCase() === "#fff0a6";
  if (isButter) {
    return {
      surface: `${surfaceBgClass(bg)} theme-butter-card text-ink`,
      mediaBg: "bg-black/5",
      muted: "text-ink/70",
      desc: "text-ink/75",
    };
  }
  if (alwaysDark) {
    return {
      surface: `${surfaceBgClass(bg)} text-cream`,
      mediaBg: "bg-white/5",
      muted: "text-cream/75",
      desc: "text-cream/80",
    };
  }
  return {
    surface: `${surfaceBgClass(bg)} text-ink dark:text-cream`,
    mediaBg: "bg-black/5 dark:bg-white/5",
    muted: "text-ink/70 dark:text-cream/75",
    desc: "text-ink/75 dark:text-cream/80",
  };
}

function WhyStageFrame({
  lang,
  currentIdx,
  lockedSlide,
  onSelectSlide,
  barScale,
  reducedMotion,
}: {
  lang: Lang;
  currentIdx: number;
  lockedSlide: number | null;
  onSelectSlide: (idx: number) => void;
  barScale?: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const currentSlide = WHY_SLIDES[currentIdx] ?? WHY_SLIDES[0];
  const surTitre = lang === "vi" ? "[Vì sao chọn FluffNii]" : "[Why a FluffNii suit]";
  const prefixe = lang === "vi" ? "Một bộ fursuit" : "A great fursuit";

  return (
    <div className="relative w-full h-[82svh] sm:h-[92svh] lg:h-[100svh] min-h-[540px] overflow-hidden bg-ink flex flex-col justify-between px-5 sm:px-8 lg:px-12 pt-[92px] sm:pt-[100px] lg:pt-[118px] pb-6 sm:pb-8 lg:pb-12 text-cream">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        {WHY_SLIDES.map((item, i) => {
          const isCurrent = i === currentIdx;
          return (
            <motion.img
              key={item.src}
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              initial={false}
              animate={{
                opacity: isCurrent ? 1 : 0,
                scale: isCurrent ? 1 : reducedMotion ? 1 : 1.05,
              }}
              transition={{
                duration: reducedMotion ? 0.15 : 0.7,
                ease: EASE,
              }}
              style={{
                objectPosition: item.objectPosition,
                zIndex: isCurrent ? 2 : 0,
              }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          );
        })}

        <div
          className="absolute inset-0 z-[3] pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at center, rgba(17,22,34,${
              currentSlide.veil * 0.78
            }) 0%, rgba(17,22,34,${Math.min(0.94, currentSlide.veil + 0.34)}) 100%)`,
          }}
        />
      </div>

      <span
        aria-hidden="true"
        className="hidden sm:block absolute left-6 top-[92px] lg:top-[116px] z-[4] w-[22px] h-[22px] border-t-[1.5px] border-l-[1.5px] border-cream/55 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="hidden sm:block absolute right-6 top-[92px] lg:top-[116px] z-[4] w-[22px] h-[22px] border-t-[1.5px] border-r-[1.5px] border-cream/55 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="hidden sm:block absolute left-6 bottom-6 z-[4] w-[22px] h-[22px] border-b-[1.5px] border-l-[1.5px] border-cream/55 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="hidden sm:block absolute right-6 bottom-6 z-[4] w-[22px] h-[22px] border-b-[1.5px] border-r-[1.5px] border-cream/55 pointer-events-none"
      />

      <div className="relative z-[4] flex justify-between items-center px-3 py-2 font-mono text-xs tracking-eyebrow uppercase text-cream/85">
        <span>{surTitre}</span>
        <span>
          ({String(currentIdx + 1).padStart(3, "0")} /{" "}
          {String(WHY_SLIDES.length).padStart(3, "0")})
        </span>
      </div>

      <div className="relative z-[4] flex flex-col items-center justify-center text-center gap-3 my-auto">
        <div className="font-sans font-medium text-[clamp(18px,2.2vw,28px)] tracking-[-0.02em] text-cream/90">
          {prefixe}
        </div>
        <div className="font-stagheiz relative min-h-[1.2em] flex items-center justify-center text-butter text-[clamp(42px,8.5vw,124px)] leading-[0.96] tracking-[-0.04em] vi:leading-[1.18] vi:tracking-[-0.015em] py-[0.06em]">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIdx}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: reducedMotion ? 0.15 : 0.42, ease: EASE }}
              className="inline-block"
            >
              {currentSlide.mot}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-[4] flex flex-col gap-3.5 px-3 pb-1">
        <div className="flex justify-center gap-2.5 flex-wrap">
          {WHY_SLIDES.map((it, i) => {
            const isSelected = i === currentIdx;
            return (
              <button
                key={it.mot}
                type="button"
                onClick={() => onSelectSlide(i)}
                aria-pressed={isSelected}
                className={cn(
                  "px-3.5 py-1.5 rounded-full border backdrop-blur-[8px] font-mono text-[11px] tracking-wider uppercase transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                  isSelected
                    ? "border-butter bg-butter/[0.16] text-butter"
                    : "border-cream/[0.28] bg-ink/50 text-cream/75 hover:border-cream/55 hover:text-cream"
                )}
              >
                0{i + 1} · {it.mot}
              </button>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="w-full h-0.5 bg-cream/[0.18] rounded-full overflow-hidden"
        >
          {barScale && lockedSlide === null ? (
            <motion.div
              className="w-full h-full bg-butter origin-left"
              style={{ scaleX: barScale }}
            />
          ) : (
            <div
              className="h-full bg-butter transition-all duration-300"
              style={{
                width: `${((currentIdx + 1) / WHY_SLIDES.length) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function WhyScrollStage({
  lang,
  reducedMotion,
}: {
  lang: Lang;
  reducedMotion: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lockedSlide, setLockedSlide] = useState<number | null>(null);
  const lastIdxRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (lockedSlide !== null) return;
    const idx = Math.min(
      WHY_SLIDES.length - 1,
      Math.max(0, Math.floor(v * WHY_SLIDES.length))
    );
    if (idx !== lastIdxRef.current) {
      lastIdxRef.current = idx;
      setActiveSlide(idx);
    }
  });

  useEffect(() => {
    if (lockedSlide === null) return;
    setActiveSlide(lockedSlide);
    lastIdxRef.current = lockedSlide;
  }, [lockedSlide]);

  return (
    <div ref={stageRef} className="relative w-full h-[220vh]">
      <div className="sticky top-0 w-full h-[100svh]">
        <WhyStageFrame
          lang={lang}
          currentIdx={lockedSlide ?? activeSlide}
          lockedSlide={lockedSlide}
          onSelectSlide={(i) => setLockedSlide((prev) => (prev === i ? null : i))}
          barScale={barScale}
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  );
}

function WhyShowcaseStage({ lang }: { lang: Lang }) {
  const { tier, isReducedMotion } = useDeviceTier();
  const useStaticStage = isReducedMotion || tier === "low";
  const [staticIdx, setStaticIdx] = useState(0);

  if (useStaticStage) {
    return (
      <WhyStageFrame
        lang={lang}
        currentIdx={staticIdx}
        lockedSlide={staticIdx}
        onSelectSlide={setStaticIdx}
        reducedMotion={isReducedMotion}
      />
    );
  }

  return <WhyScrollStage lang={lang} reducedMotion={isReducedMotion} />;
}

function SpeciesShowcaseSection({
  copy,
  lang,
}: SpeciesShowcaseSectionProps) {
  const isVi = lang === "vi";
  const { isReducedMotion } = useDeviceTier();
  const [hoveredFanIdx, setHoveredFanIdx] = useState<number | null>(null);
  const [lockedFanIdx, setLockedFanIdx] = useState<number | null>(null);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const activeDesktopIdx = lockedFanIdx ?? hoveredFanIdx;

  const scrollToMobileCard = (idx: number) => {
    const clamped = Math.max(0, Math.min(copy.fanCards.length - 1, idx));
    setMobileActiveIdx(clamped);
    const track = mobileTrackRef.current;
    const cardEl = track?.querySelectorAll<HTMLElement>("[data-species-slide]")[clamped];
    if (cardEl && track) {
      cardEl.scrollIntoView({
        behavior: isReducedMotion ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleMobileTrackScroll = () => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const slides = Array.from(
      track.querySelectorAll<HTMLElement>("[data-species-slide]")
    );
    if (slides.length === 0) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - center);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setMobileActiveIdx(closest);
  };

  return (
    <>
      <section
        id="pour-qui"
        className="scroll-mt-24 w-full border-t py-24 md:py-[140px] overflow-x-clip bg-taupe/45 border-ink/[0.16] dark:bg-night-surface dark:border-cream/[0.16]"
      >
        <div className="max-w-site mx-auto px-5 md:px-14">
          <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
            <motion.span
              initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: isReducedMotion ? 0 : 0.85, delay: 0, ease: EASE }}
              className={EYEBROW_CLASS}
            >
              {copy.whoEyebrow}
            </motion.span>
            <ScrollWordReveal
              as="h2"
              text={copy.whoTitle}
              className={cn(
                "font-stagheiz max-w-[900px] text-fg",
                isVi
                  ? "text-4xl sm:text-[52px] md:text-[64px] leading-[1.18] tracking-[-0.015em]"
                  : "text-[44px] sm:text-[64px] md:text-[80px] leading-[0.94]"
              )}
            />
            <motion.p
              initial={isReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: isReducedMotion ? 0 : 0.85, delay: 0, ease: EASE }}
              className="font-sans text-[17px] md:text-[19px] leading-[1.55] max-w-[640px] text-ink/75 dark:text-cream/75"
            >
              {copy.whoDesc}
            </motion.p>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-6">
            <div className="flex justify-center w-full lg:h-[560px] xl:h-[620px] 2xl:h-[650px] overflow-visible relative">
              <div className="relative w-[1210px] h-[630px] shrink-0 lg:scale-[0.84] xl:scale-[0.94] 2xl:scale-100 origin-top">
                {copy.fanCards.map((card, i) => {
                  const slotTops = [48, 12, 0, 12, 48];
                  const tone = cardToneClasses(card.bg, card.dark);
                  const isCardActive = activeDesktopIdx === i;
                  const spec = SPECIES_IMAGE_SPECS[card.img] ?? {
                    width: 760,
                    height: 1013,
                    objectPosition: card.objectPosition,
                  };
                  return (
                    <motion.div
                      key={card.num}
                      initial={isReducedMotion ? false : { opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{
                        duration: isReducedMotion ? 0 : 0.85,
                        delay: isReducedMotion ? 0 : i * 0.08,
                        ease: EASE,
                      }}
                      onMouseEnter={() => setHoveredFanIdx(i)}
                      onMouseLeave={() => setHoveredFanIdx(null)}
                      className="absolute w-[300px] min-h-[556px]"
                      style={{
                        left: i * 228,
                        top: slotTops[i],
                        zIndex: isCardActive ? 25 : i + 1,
                      }}
                    >
                      <motion.div
                        role="button"
                        tabIndex={0}
                        aria-pressed={lockedFanIdx === i}
                        aria-label={`${card.num} ${card.title}`}
                        data-cursor-kind="inspect"
                        onClick={() =>
                          setLockedFanIdx((prev) => (prev === i ? null : i))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setLockedFanIdx((prev) => (prev === i ? null : i));
                          }
                        }}
                        initial={{ rotate: card.rot, y: 0, scale: 1 }}
                        animate={
                          isCardActive
                            ? { rotate: 0, y: -32, scale: 1.035 }
                            : { rotate: card.rot, y: 0, scale: 1 }
                        }
                        transition={{ duration: isReducedMotion ? 0 : 0.45, ease: EASE }}
                        className={cn(
                          "w-[300px] min-h-[556px] text-left rounded-card p-2.5 pb-5 flex flex-col justify-start overflow-hidden cursor-pointer dark:border dark:border-cream/15 shadow-[-24px_30px_40px_-24px_rgba(30,53,87,0.48)] dark:shadow-[-24px_30px_40px_-24px_rgba(0,0,0,0.65)] focus-ring",
                          tone.surface
                        )}
                      >
                        <div
                          className={cn(
                            "w-full aspect-[4/5] rounded-xl overflow-hidden shrink-0",
                            tone.mediaBg
                          )}
                        >
                          <img
                            src={card.img}
                            alt={card.title}
                            loading="lazy"
                            decoding="async"
                            width={spec.width}
                            height={spec.height}
                            style={{ objectPosition: spec.objectPosition }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div
                          className={cn(
                            "flex flex-col items-start gap-2 w-full pt-4 pl-2.5",
                            i < 4 && !isCardActive ? "pr-[76px]" : "pr-2.5"
                          )}
                        >
                          <span
                            className={cn(
                              "font-mono text-[11px] md:text-xs uppercase tracking-eyebrow",
                              tone.muted
                            )}
                          >
                            {card.num}
                          </span>
                          <h3
                            className={cn(
                              "font-stagheiz",
                              isVi
                                ? "text-[19px] md:text-[21px] leading-[1.18] tracking-[-0.015em]"
                                : "text-[22px] md:text-[24px] leading-[0.98] tracking-[-0.04em]"
                            )}
                          >
                            {card.title}
                          </h3>
                          <p
                            className={cn(
                              "font-sans text-[14.5px] leading-[1.45]",
                              tone.desc
                            )}
                          >
                            {card.desc}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {copy.fanCards.map((card, i) => {
                const isSelected = activeDesktopIdx === i;
                return (
                  <button
                    key={card.num}
                    type="button"
                    onClick={() =>
                      setLockedFanIdx((prev) => (prev === i ? null : i))
                    }
                    onMouseEnter={() => setHoveredFanIdx(i)}
                    onMouseLeave={() => setHoveredFanIdx(null)}
                    aria-pressed={lockedFanIdx === i}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full border font-mono text-[11px] uppercase tracking-eyebrow transition-colors cursor-pointer focus-ring",
                      isSelected
                        ? "theme-butter-card bg-butter text-ink border-ink/20"
                        : "bg-surface/80 text-fg/80 border-fg/15 hover:bg-surface"
                    )}
                  >
                    {card.num} {card.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden flex flex-col gap-5 pt-2 pb-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {copy.fanCards.map((card, i) => {
                const isActive = mobileActiveIdx === i;
                return (
                  <button
                    key={card.num}
                    type="button"
                    onClick={() => scrollToMobileCard(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "px-3 py-1.5 rounded-full border font-mono text-[11px] uppercase tracking-eyebrow transition-colors cursor-pointer focus-ring",
                      isActive
                        ? "theme-butter-card bg-butter text-ink border-ink/20"
                        : "bg-surface/85 text-fg/80 border-fg/15"
                    )}
                  >
                    {card.title}
                  </button>
                );
              })}
            </div>

            <div
              ref={mobileTrackRef}
              onScroll={handleMobileTrackScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-5 px-5 pb-3"
            >
              {copy.fanCards.map((card, i) => {
                const tone = cardToneClasses(card.bg, card.dark);
                const spec = SPECIES_IMAGE_SPECS[card.img] ?? {
                  width: 760,
                  height: 1013,
                  objectPosition: card.objectPosition,
                };
                return (
                  <article
                    key={card.num}
                    data-species-slide
                    onClick={() => scrollToMobileCard(i)}
                    className="snap-center shrink-0 w-[min(80vw,310px)] cursor-pointer"
                  >
                    <div
                      className={cn(
                        "min-h-[490px] w-full rounded-card p-2.5 pb-5 flex flex-col justify-start overflow-hidden dark:border dark:border-cream/15 shadow-card",
                        tone.surface
                      )}
                    >
                      <div
                        className={cn(
                          "w-full aspect-[4/5] rounded-xl overflow-hidden shrink-0",
                          tone.mediaBg
                        )}
                      >
                        <img
                          src={card.img}
                          alt={card.title}
                          loading="lazy"
                          decoding="async"
                          width={spec.width}
                          height={spec.height}
                          style={{ objectPosition: spec.objectPosition }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col items-start gap-2 w-full pt-4 px-2.5">
                        <span
                          className={cn(
                            "font-mono text-[11px] uppercase tracking-eyebrow",
                            tone.muted
                          )}
                        >
                          {card.num}
                        </span>
                        <h3
                          className={cn(
                            "font-stagheiz",
                            isVi
                              ? "text-[20px] leading-[1.18] tracking-[-0.015em]"
                              : "text-[22px] leading-[0.98] tracking-[-0.04em]"
                          )}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={cn(
                            "font-sans text-[15px] leading-[1.45]",
                            tone.desc
                          )}
                        >
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => scrollToMobileCard(mobileActiveIdx - 1)}
                disabled={mobileActiveIdx === 0}
                aria-label={isVi ? "Loài trước" : "Previous species"}
                className="w-10 h-10 rounded-full border studio-hairline-strong flex items-center justify-center text-fg disabled:opacity-35 cursor-pointer focus-ring"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="font-mono text-xs uppercase tracking-eyebrow text-fg/75 tabular-nums">
                {String(mobileActiveIdx + 1).padStart(2, "0")} /{" "}
                {String(copy.fanCards.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => scrollToMobileCard(mobileActiveIdx + 1)}
                disabled={mobileActiveIdx >= copy.fanCards.length - 1}
                aria-label={isVi ? "Loài tiếp theo" : "Next species"}
                className="w-10 h-10 rounded-full border studio-hairline-strong flex items-center justify-center text-fg disabled:opacity-35 cursor-pointer focus-ring"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="pourquoi" className="scroll-mt-24 w-full">
        <WhyShowcaseStage lang={lang} />

        <div className="w-full max-w-site mx-auto px-5 md:px-14 py-24 md:py-[140px]">
          <motion.div
            initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: isReducedMotion ? 0 : 0.8, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-8"
          >
            <span className={EYEBROW_CLASS}>{copy.resultEyebrow}</span>
            <span className={EYEBROW_CLASS}>(004)</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
            <ScrollWordReveal
              as="h2"
              text={copy.resultTitle}
              className={cn(
                "lg:col-span-7 font-stagheiz text-fg",
                isVi
                  ? "text-4xl sm:text-[50px] md:text-[62px] leading-[1.18] tracking-[-0.015em]"
                  : "text-[44px] sm:text-[60px] md:text-[74px] leading-[0.94]"
              )}
            />
            <motion.p
              initial={isReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: isReducedMotion ? 0 : 0.85, delay: 0, ease: EASE }}
              className="lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] text-ink/75 dark:text-cream/75"
            >
              {copy.resultDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0 : 0.85,
                delay: isReducedMotion ? 0 : RESULT_CELL_DELAYS[0],
                ease: EASE,
              }}
              className="h-[320px] sm:h-[340px]"
            >
              <motion.div
                whileHover={isReducedMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                data-cursor-kind="inspect"
                className="group relative w-full h-full rounded-2xl overflow-hidden bg-surface-alt"
              >
                <img
                  src="/images/result-01.webp"
                  alt={copy.resultAlts[0]}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover object-[50%_38%] transition-transform duration-700 ease-studio group-hover:scale-[1.04]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0 : 0.85,
                delay: isReducedMotion ? 0 : RESULT_CELL_DELAYS[1],
                ease: EASE,
              }}
              className="min-h-[300px] sm:h-[340px]"
            >
              <motion.div
                whileHover={isReducedMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="theme-butter-card w-full h-full rounded-2xl bg-butter border border-ink/[0.14] p-6 flex flex-col justify-between gap-4"
              >
                <span className="font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-ink/70">
                  {copy.resultCards[0].num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={cn(
                      "font-stagheiz text-ink",
                      isVi
                        ? "text-[24px] md:text-[30px] desktop:text-[28px] leading-[1.18] tracking-[-0.015em]"
                        : "text-3xl md:text-[36px] desktop:text-[34px] leading-none tracking-[-0.04em]"
                    )}
                  >
                    {copy.resultCards[0].title}
                  </h3>
                  <p className={cn(BODY_COPY_CLASS, "text-ink/80")}>
                    {copy.resultCards[0].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0 : 0.85,
                delay: isReducedMotion ? 0 : RESULT_CELL_DELAYS[2],
                ease: EASE,
              }}
              className="h-[320px] sm:h-[340px]"
            >
              <motion.div
                whileHover={isReducedMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                data-cursor-kind="inspect"
                className="group relative w-full h-full rounded-2xl overflow-hidden bg-surface-alt"
              >
                <img
                  src="/images/result-02.webp"
                  alt={copy.resultAlts[1]}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover object-[50%_25%] transition-transform duration-700 ease-studio group-hover:scale-[1.04]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0 : 0.85,
                delay: isReducedMotion ? 0 : RESULT_CELL_DELAYS[3],
                ease: EASE,
              }}
              className="min-h-[300px] sm:h-[340px]"
            >
              <motion.div
                whileHover={isReducedMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="w-full h-full rounded-2xl border p-6 flex flex-col justify-between gap-4 bg-surface-alt border-fg/[0.14] text-fg"
              >
                <span className={EYEBROW_CLASS}>{copy.resultCards[1].num}</span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={cn(
                      "font-stagheiz text-fg",
                      isVi
                        ? "text-[24px] md:text-[30px] desktop:text-[28px] leading-[1.18] tracking-[-0.015em]"
                        : "text-3xl md:text-[36px] desktop:text-[34px] leading-none tracking-[-0.04em]"
                    )}
                  >
                    {copy.resultCards[1].title}
                  </h3>
                  <p className={cn(BODY_COPY_CLASS, "text-fg/80")}>
                    {copy.resultCards[1].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0 : 0.85,
                delay: isReducedMotion ? 0 : RESULT_CELL_DELAYS[4],
                ease: EASE,
              }}
              className="min-h-[300px] sm:h-[340px]"
            >
              <motion.div
                whileHover={isReducedMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="w-full h-full rounded-2xl bg-espresso text-cream p-6 flex flex-col justify-between gap-4 dark:border dark:border-cream/15"
              >
                <span className={CONTACT_EYEBROW_CLASS}>
                  {copy.resultCards[2].num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={cn(
                      "font-stagheiz text-cream",
                      isVi
                        ? "text-[24px] md:text-[30px] desktop:text-[28px] leading-[1.18] tracking-[-0.015em]"
                        : "text-3xl md:text-[36px] desktop:text-[34px] leading-none tracking-[-0.04em]"
                    )}
                  >
                    {copy.resultCards[2].title}
                  </h3>
                  <p className={cn(BODY_COPY_CLASS, "text-cream/85")}>
                    {copy.resultCards[2].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0 : 0.85,
                delay: isReducedMotion ? 0 : RESULT_CELL_DELAYS[5],
                ease: EASE,
              }}
              className="h-[320px] sm:h-[340px]"
            >
              <motion.div
                whileHover={isReducedMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                data-cursor-kind="inspect"
                className="group relative w-full h-full rounded-2xl overflow-hidden bg-surface-alt"
              >
                <img
                  src="/images/result-03.webp"
                  alt={copy.resultAlts[2]}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover object-[50%_22%] transition-transform duration-700 ease-studio group-hover:scale-[1.04]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0 : 0.85,
                delay: isReducedMotion ? 0 : RESULT_CELL_DELAYS[6],
                ease: EASE,
              }}
              className="min-h-[300px] sm:h-[340px]"
            >
              <motion.div
                whileHover={isReducedMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="w-full h-full rounded-2xl border p-6 flex flex-col justify-between gap-4 bg-white border-ink/[0.14] text-ink dark:bg-night-surface dark:border-cream/[0.14] dark:text-cream"
              >
                <span className={EYEBROW_CLASS}>{copy.resultCards[3].num}</span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={cn(
                      "font-stagheiz text-fg",
                      isVi
                        ? "text-[24px] md:text-[30px] desktop:text-[28px] leading-[1.18] tracking-[-0.015em]"
                        : "text-3xl md:text-[36px] desktop:text-[34px] leading-none tracking-[-0.04em]"
                    )}
                  >
                    {copy.resultCards[3].title}
                  </h3>
                  <p className={cn(BODY_COPY_CLASS, "text-fg/80")}>
                    {copy.resultCards[3].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: isReducedMotion ? 0 : 0.85,
                delay: isReducedMotion ? 0 : RESULT_CELL_DELAYS[7],
                ease: EASE,
              }}
              className="h-[320px] sm:h-[340px]"
            >
              <motion.div
                whileHover={isReducedMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                data-cursor-kind="inspect"
                className="group relative w-full h-full rounded-2xl overflow-hidden bg-surface-alt"
              >
                <img
                  src="/images/result-04.webp"
                  alt={copy.resultAlts[3]}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1279}
                  className="w-full h-full object-cover object-[50%_58%] transition-transform duration-700 ease-studio group-hover:scale-[1.04]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

const MemoSpeciesShowcaseSection = React.memo(SpeciesShowcaseSection);
MemoSpeciesShowcaseSection.displayName = "SpeciesShowcaseSection";

export default MemoSpeciesShowcaseSection;
