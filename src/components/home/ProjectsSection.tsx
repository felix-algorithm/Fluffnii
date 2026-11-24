"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import type { ShowcaseItem } from "@/components/ShowcaseLightbox";
import { useDeviceTier } from "@/lib/deviceTier";
import type { HomeLocaleCopy } from "@/lib/homeCopy";
import type { Lang } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;

const EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-fg/70";
const BODY_COPY_CLASS =
  "font-sans text-base md:text-[17px] leading-[1.55] tracking-[-0.01em]";
const CAROUSEL_ARROW_BTN_CLASS =
  "w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full border-[1.5px] flex items-center justify-center transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-ink text-ink hover:bg-ink hover:text-cream focus-visible:ring-ink focus-visible:ring-offset-taupe dark:border-cream dark:text-cream dark:hover:bg-butter dark:hover:border-butter dark:hover:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface";

const PROJECT_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/images/project-01.webp": { width: 960, height: 1707 },
  "/images/project-02.webp": { width: 960, height: 1706 },
  "/images/project-03.webp": { width: 960, height: 1280 },
  "/images/project-04.webp": { width: 960, height: 1707 },
  "/images/project-05.webp": { width: 960, height: 1444 },
};

export interface ProjectsSectionProps {
  copy: HomeLocaleCopy;
  lang: Lang;
  onOpenProject: (items: ShowcaseItem[], index: number) => void;
}

function ProjectsSection({
  copy,
  lang,
  onOpenProject,
}: ProjectsSectionProps) {
  const isVi = lang === "vi";
  const { tier, isReducedMotion } = useDeviceTier();
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { once: true, amount: 0.08 });
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStateRef = useRef<{
    active: boolean;
    startX: number;
    scrollLeft: number;
    moved: boolean;
  }>({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const suppressClickRef = useRef(false);
  const suppressTimerRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      if (suppressTimerRef.current !== null) {
        window.clearTimeout(suppressTimerRef.current);
        suppressTimerRef.current = null;
      }
    };
  }, []);

  const projectLightboxItems: ShowcaseItem[] = useMemo(
    () =>
      copy.projects.map((proj, idx) => {
        const dims = PROJECT_DIMENSIONS[proj.img] ?? { width: 960, height: 1280 };
        return {
          id: `proj-${idx}`,
          src: proj.img,
          alt: `${proj.client} (${proj.category})`,
          title: proj.client,
          eyebrow: `[${proj.category} · ${proj.year}]`,
          description: proj.summary,
          tags: proj.tags,
          partValues: proj.partValues,
          review: proj.review,
          author: proj.author,
          role: proj.role,
          objectPosition: proj.objectPosition,
          width: dims.width,
          height: dims.height,
        };
      }),
    [copy.projects]
  );

  const scrollToProjectIndex = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(copy.projects.length - 1, idx));
    const cards = el.querySelectorAll<HTMLElement>("[data-project-card]");
    const card = cards[clamped];
    if (!card) return;
    const targetLeft = card.offsetLeft - el.offsetLeft;
    el.scrollTo({
      left: Math.max(0, targetLeft - (window.innerWidth >= 768 ? 56 : 20)),
      behavior: isReducedMotion ? "auto" : "smooth",
    });
    setActiveProjectIdx((prev) => (prev === clamped ? prev : clamped));
  };

  const scrollCarousel = (dir: -1 | 1) => {
    scrollToProjectIndex(activeProjectIdx + dir);
  };

  const handleCarouselScroll = () => {
    if (scrollRafRef.current !== null) return;
    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = null;
      const el = carouselRef.current;
      if (!el) return;
      const cards = el.querySelectorAll<HTMLElement>("[data-project-card]");
      if (cards.length === 0) return;
      const pad = window.innerWidth >= 768 ? 56 : 20;
      const scrollPos = el.scrollLeft + pad + 40;
      let closestIdx = 0;
      let minDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < cards.length; i++) {
        const dist = Math.abs(cards[i].offsetLeft - scrollPos);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = i;
        }
      }
      setActiveProjectIdx((prev) => (prev === closestIdx ? prev : closestIdx));
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = carouselRef.current;
    if (!el) return;
    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
    if (suppressTimerRef.current !== null) {
      window.clearTimeout(suppressTimerRef.current);
      suppressTimerRef.current = null;
    }
    suppressClickRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    const el = carouselRef.current;
    if (!state.active || !el) return;
    const dx = e.clientX - state.startX;
    if (Math.abs(dx) > 6 && !state.moved) {
      state.moved = true;
      setIsDragging(true);
    }
    if (state.moved) {
      el.scrollLeft = state.scrollLeft - dx;
    }
  };

  const endDrag = () => {
    if (!dragStateRef.current.active) return;
    if (dragStateRef.current.moved) {
      suppressClickRef.current = true;
      if (suppressTimerRef.current !== null) {
        window.clearTimeout(suppressTimerRef.current);
      }
      suppressTimerRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
        suppressTimerRef.current = null;
      }, 120);
    }
    dragStateRef.current.active = false;
    dragStateRef.current.moved = false;
    setIsDragging(false);
  };

  const handleOpen = (idx: number) => {
    if (suppressClickRef.current) return;
    onOpenProject(projectLightboxItems, idx);
  };

  return (
    <section
      id="projets"
      className="scroll-mt-24 w-full py-24 md:py-[140px] border-t overflow-hidden bg-taupe border-ink/[0.16] dark:bg-night-surface dark:border-cream/[0.16]"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          scrollCarousel(-1);
        } else if (e.key === "ArrowRight") {
          scrollCarousel(1);
        }
      }}
    >
      <div className="max-w-site mx-auto px-5 md:px-14">
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: isReducedMotion ? 0.01 : 0.85, ease: EASE }}
          className="flex items-center justify-between mb-6"
        >
          <span className={EYEBROW_CLASS}>{copy.projectsEyebrow}</span>
          <span className={EYEBROW_CLASS}>(006)</span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <ScrollWordReveal
            text={copy.projectsTitle}
            as="h2"
            className={cn(
              "font-stagheiz text-fg",
              isVi
                ? "text-4xl sm:text-[52px] md:text-[66px] leading-[1.16] tracking-tight py-[0.06em]"
                : "text-[44px] sm:text-[64px] md:text-[80px] leading-[0.94]"
            )}
          />

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-eyebrow text-fg/75 tabular-nums">
              {String(activeProjectIdx + 1).padStart(2, "0")} /{" "}
              {String(copy.projects.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2.5">
              <MagneticButton
                as="span"
                strength={0.18}
                disabled={activeProjectIdx === 0}
              >
                <button
                  type="button"
                  onClick={() => scrollCarousel(-1)}
                  disabled={activeProjectIdx === 0}
                  aria-label={copy.prevProjectAria}
                  className={CAROUSEL_ARROW_BTN_CLASS}
                >
                  <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </MagneticButton>
              <MagneticButton
                as="span"
                strength={0.18}
                disabled={activeProjectIdx >= copy.projects.length - 1}
              >
                <button
                  type="button"
                  onClick={() => scrollCarousel(1)}
                  disabled={activeProjectIdx >= copy.projects.length - 1}
                  aria-label={copy.nextProjectAria}
                  className={CAROUSEL_ARROW_BTN_CLASS}
                >
                  <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        data-cursor-kind="drag"
        onScroll={handleCarouselScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        className={cn(
          "flex gap-6 overflow-x-auto no-scrollbar px-5 md:px-14 pb-6 scroll-smooth snap-x snap-mandatory select-none",
          isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab"
        )}
      >
        {copy.projects.map((proj, idx) => {
          const dims = PROJECT_DIMENSIONS[proj.img] ?? {
            width: 960,
            height: 1280,
          };
          const isActive = idx === activeProjectIdx;
          const allowDepth = !isReducedMotion && tier !== "low";

          return (
            <motion.article
              key={proj.client}
              data-project-card
              initial={
                isReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.001, y: 36 }
              }
              animate={
                carouselInView || isReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.001, y: 36 }
              }
              transition={{
                duration: isReducedMotion ? 0.01 : 0.85,
                delay: isReducedMotion ? 0 : idx * 0.08,
                ease: EASE,
              }}
              className={cn(
                "snap-start w-[312px] sm:w-[420px] md:w-[460px] shrink-0 rounded-card-lg border p-5 sm:p-6 flex flex-col justify-between gap-5 transition-[border-color,box-shadow,transform] duration-500 ease-studio bg-cream border-ink/[0.16] dark:bg-night-elevated dark:border-cream/[0.16]",
                isActive && "shadow-card-hover border-ink/30 dark:border-butter/35",
                allowDepth && !isDragging && "hover:-translate-y-1"
              )}
            >
              <div className="flex flex-col gap-5">
                <button
                  type="button"
                  data-cursor-kind="inspect"
                  data-cursor-label={proj.inspectLabel}
                  onClick={() => handleOpen(idx)}
                  aria-label={`${proj.client} · ${proj.inspectLabel}`}
                  className="group relative w-full aspect-[3/4] rounded-card overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-ink/10 focus-visible:ring-ink focus-visible:ring-offset-cream dark:bg-night/40 dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-elevated"
                >
                  <img
                    src={proj.img}
                    alt={`${proj.client} ${proj.category}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    width={dims.width}
                    height={dims.height}
                    style={{ objectPosition: proj.objectPosition }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-studio group-hover:scale-[1.035]"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="theme-butter-card px-3 py-1 rounded-full bg-butter/95 border border-ink/15 font-mono text-[11px] uppercase tracking-wider text-ink">
                      {proj.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-ink/85 backdrop-blur-sm font-mono text-[11px] md:text-xs uppercase tracking-eyebrow text-cream">
                      {proj.year}
                    </span>
                  </div>

                  <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-[11px] uppercase tracking-wider opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 bg-cream/90 border-ink/15 text-ink dark:bg-night-surface/90 dark:border-cream/20 dark:text-cream">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{proj.inspectLabel}</span>
                  </span>
                </button>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3
                      className={cn(
                        "font-stagheiz text-3xl md:text-[38px] desktop:text-[34px] text-fg py-[0.04em]",
                        isVi
                          ? "leading-[1.16] tracking-[-0.02em]"
                          : "leading-none tracking-[-0.04em]"
                      )}
                    >
                      {proj.client}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-eyebrow text-fg/70 shrink-0">
                      ({String(idx + 1).padStart(2, "0")})
                    </span>
                  </div>

                  <p className={cn(BODY_COPY_CLASS, "text-fg/75")}>
                    {proj.summary}
                  </p>

                  {proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full border studio-hairline font-mono text-[10px] uppercase tracking-wider text-fg/70 bg-surface-alt/45"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {proj.review && (
                <div className="theme-butter-card rounded-card-sm bg-butter border border-ink/[0.16] p-4">
                  <p className="font-sans text-sm leading-[1.48] text-ink/90 mb-2">
                    &ldquo;{proj.review}&rdquo;
                  </p>
                  <div className="font-mono text-[11px] md:text-xs uppercase tracking-wider text-ink/70">
                    {proj.author} · {proj.role}
                  </div>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>

      <div className="max-w-site mx-auto px-5 md:px-14 pt-2 flex items-center justify-center gap-1">
        {copy.projects.map((proj, idx) => {
          const isActive = activeProjectIdx === idx;
          return (
            <button
              key={proj.client}
              type="button"
              aria-label={`${copy.projectDotAria} ${idx + 1}: ${proj.client}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => scrollToProjectIndex(idx)}
              className="min-w-[36px] min-h-11 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-butter rounded-full"
            >
              <span
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  isActive ? "w-7 bg-ink dark:bg-butter" : "w-2 bg-fg/30"
                )}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

const MemoProjectsSection = React.memo(ProjectsSection);
MemoProjectsSection.displayName = "ProjectsSection";

export default MemoProjectsSection;
