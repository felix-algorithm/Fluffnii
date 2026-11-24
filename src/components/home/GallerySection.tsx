"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { ArrowRight, Pause, Play, ZoomIn } from "lucide-react";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import type { ShowcaseItem } from "@/components/ShowcaseLightbox";
import { useDeviceTier } from "@/lib/deviceTier";
import { useSmoothScroll } from "@/lib/smoothScroll";
import type {
  GalleryFilterId,
  GalleryPhotoCopy,
  HomeLocaleCopy,
} from "@/lib/homeCopy";
import { isModifiedClick } from "@/lib/sectionScroll";
import type { Lang } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;

const EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-fg/70";
const BODY_COPY_CLASS =
  "font-sans text-base md:text-[17px] leading-[1.55] tracking-[-0.01em]";
const GALLERY_TILE_BASE =
  "group relative h-[300px] sm:h-[364px] rounded-card overflow-hidden shrink-0 cursor-pointer bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink focus-visible:ring-offset-cream dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night";
const GALLERY_ZOOM_BADGE_CLASS =
  "absolute bottom-3 right-3 w-9 h-9 rounded-full border flex items-center justify-center opacity-85 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity bg-cream/90 border-ink/15 text-ink dark:bg-night-surface/90 dark:border-cream/20 dark:text-cream";

interface GalleryAssetMeta {
  width: number;
  height: number;
  marqueeSizeClass: string;
  gridAspectClass: string;
  defaultPos: string;
}

const GALLERY_ASSET_META: Record<string, GalleryAssetMeta> = {
  "/images/gallery-r1-01.webp": {
    width: 840,
    height: 1050,
    marqueeSizeClass: "w-[240px] sm:w-[292px]",
    gridAspectClass: "aspect-[4/5]",
    defaultPos: "50% 28%",
  },
  "/images/gallery-r1-02.webp": {
    width: 840,
    height: 672,
    marqueeSizeClass: "w-[375px] sm:w-[455px]",
    gridAspectClass: "aspect-[5/4]",
    defaultPos: "50% 32%",
  },
  "/images/gallery-r1-03.webp": {
    width: 840,
    height: 1050,
    marqueeSizeClass: "w-[240px] sm:w-[292px]",
    gridAspectClass: "aspect-[4/5]",
    defaultPos: "50% 35%",
  },
  "/images/gallery-r1-04.webp": {
    width: 840,
    height: 672,
    marqueeSizeClass: "w-[375px] sm:w-[455px]",
    gridAspectClass: "aspect-[5/4]",
    defaultPos: "50% 22%",
  },
  "/images/gallery-r1-05.webp": {
    width: 840,
    height: 1050,
    marqueeSizeClass: "w-[240px] sm:w-[292px]",
    gridAspectClass: "aspect-[4/5]",
    defaultPos: "50% 12%",
  },
  "/images/gallery-r1-06.webp": {
    width: 840,
    height: 836,
    marqueeSizeClass: "w-[300px] sm:w-[366px]",
    gridAspectClass: "aspect-square",
    defaultPos: "50% 35%",
  },
  "/images/gallery-r1-07.webp": {
    width: 840,
    height: 1050,
    marqueeSizeClass: "w-[240px] sm:w-[292px]",
    gridAspectClass: "aspect-[4/5]",
    defaultPos: "50% 35%",
  },
  "/images/gallery-r1-08.webp": {
    width: 840,
    height: 1050,
    marqueeSizeClass: "w-[240px] sm:w-[292px]",
    gridAspectClass: "aspect-[4/5]",
    defaultPos: "50% 30%",
  },
  "/images/gallery-r2-01.webp": {
    width: 840,
    height: 672,
    marqueeSizeClass: "w-[375px] sm:w-[455px]",
    gridAspectClass: "aspect-[5/4]",
    defaultPos: "50% 26%",
  },
  "/images/gallery-r2-02.webp": {
    width: 840,
    height: 672,
    marqueeSizeClass: "w-[375px] sm:w-[455px]",
    gridAspectClass: "aspect-[5/4]",
    defaultPos: "50% 28%",
  },
  "/images/gallery-r2-03.webp": {
    width: 840,
    height: 1050,
    marqueeSizeClass: "w-[240px] sm:w-[292px]",
    gridAspectClass: "aspect-[4/5]",
    defaultPos: "50% 15%",
  },
  "/images/gallery-r2-04.webp": {
    width: 840,
    height: 840,
    marqueeSizeClass: "w-[300px] sm:w-[364px]",
    gridAspectClass: "aspect-square",
    defaultPos: "50% 38%",
  },
  "/images/gallery-r2-05.webp": {
    width: 840,
    height: 672,
    marqueeSizeClass: "w-[375px] sm:w-[455px]",
    gridAspectClass: "aspect-[5/4]",
    defaultPos: "50% 50%",
  },
  "/images/gallery-r2-06.webp": {
    width: 840,
    height: 1050,
    marqueeSizeClass: "w-[240px] sm:w-[292px]",
    gridAspectClass: "aspect-[4/5]",
    defaultPos: "50% 32%",
  },
  "/images/gallery-r2-07.webp": {
    width: 840,
    height: 672,
    marqueeSizeClass: "w-[375px] sm:w-[455px]",
    gridAspectClass: "aspect-[5/4]",
    defaultPos: "50% 45%",
  },
  "/images/gallery-r2-08.webp": {
    width: 840,
    height: 1050,
    marqueeSizeClass: "w-[240px] sm:w-[292px]",
    gridAspectClass: "aspect-[4/5]",
    defaultPos: "50% 12%",
  },
};

function getGalleryMeta(item: GalleryPhotoCopy): GalleryAssetMeta {
  return (
    GALLERY_ASSET_META[item.src] ?? {
      width: 840,
      height: 840,
      marqueeSizeClass: item.widthClass,
      gridAspectClass: "aspect-square",
      defaultPos: "50% 35%",
    }
  );
}

function galleryItemToShowcase(item: GalleryPhotoCopy): ShowcaseItem {
  const meta = getGalleryMeta(item);
  return {
    id: item.id,
    src: item.src,
    alt: item.alt,
    title: item.title,
    eyebrow: item.eyebrow,
    description: item.description,
    tags: item.tags,
    partValues: item.partValues,
    objectPosition: item.objectPosition ?? meta.defaultPos,
    width: meta.width,
    height: meta.height,
  };
}

function SmoothTicker({
  renderItems,
  velocity,
  direction = "left",
  hoverModifier = 1,
  paused = false,
  gap,
  className = "",
  scrollBoostRef,
}: {
  renderItems: (isClone: boolean) => React.ReactNode;
  velocity: number;
  direction?: "left" | "right";
  hoverModifier?: number;
  paused?: boolean;
  gap: number;
  className?: string;
  scrollBoostRef?: React.MutableRefObject<number>;
}) {
  const { isReducedMotion } = useDeviceTier();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isInViewRef = useRef(true);
  const isDocHiddenRef = useRef(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const speedMultiplierRef = useRef(1);
  const boostLerpRef = useRef(0);
  const offsetRef = useRef(0);
  const groupWidthRef = useRef(0);

  useEffect(() => {
    const el = groupRef.current;
    if (!el || isReducedMotion) return;
    const measure = () => {
      groupWidthRef.current = el.getBoundingClientRect().width;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    isDocHiddenRef.current = document.hidden;
    const onVisibilityChange = () => {
      isDocHiddenRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const container = containerRef.current;
    let observer: IntersectionObserver | undefined;
    if (container && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInViewRef.current = entry.isIntersecting;
        },
        { rootMargin: "120px" }
      );
      observer.observe(container);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer?.disconnect();
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (
      isReducedMotion ||
      pausedRef.current ||
      !isInViewRef.current ||
      isDocHiddenRef.current
    ) {
      return;
    }

    const dt = Math.min(delta, 64) / 1000;
    const targetMultiplier = isHoveredRef.current ? hoverModifier : 1;
    speedMultiplierRef.current +=
      (targetMultiplier - speedMultiplierRef.current) * Math.min(1, dt * 8);

    const targetBoost = isHoveredRef.current ? 0 : (scrollBoostRef?.current ?? 0);
    boostLerpRef.current +=
      (targetBoost - boostLerpRef.current) * Math.min(1, dt * 6);

    const groupWidth =
      groupWidthRef.current ||
      groupRef.current?.getBoundingClientRect().width ||
      0;
    if (!groupWidth || !trackRef.current) return;

    const effectiveVelocity = velocity * (1 + boostLerpRef.current);
    offsetRef.current =
      (offsetRef.current + effectiveVelocity * speedMultiplierRef.current * dt) %
      groupWidth;

    const x =
      direction === "left"
        ? -offsetRef.current
        : -groupWidth + offsetRef.current;

    trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
  });

  if (isReducedMotion) {
    return (
      <div className={cn("w-full overflow-x-auto no-scrollbar px-5 md:px-14", className)}>
        <div className="flex items-center w-max" style={{ gap: `${gap}px` }}>
          {renderItems(false)}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden", className)}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div ref={trackRef} className="flex items-center w-max will-change-transform">
        <div
          ref={groupRef}
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {renderItems(false)}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {renderItems(true)}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {renderItems(true)}
        </div>
      </div>
    </div>
  );
}

export interface GallerySectionProps {
  copy: HomeLocaleCopy;
  lang: Lang;
  onOpenPhoto: (items: ShowcaseItem[], index: number) => void;
  onNavigateSection: (id: string) => void;
}

function GallerySection({
  copy,
  lang,
  onOpenPhoto,
  onNavigateSection,
}: GallerySectionProps) {
  const isVi = lang === "vi";
  const { lenis } = useSmoothScroll();
  const { isReducedMotion } = useDeviceTier();

  const [galleryFilter, setGalleryFilter] = useState<GalleryFilterId>("all");
  const [galleryPaused, setGalleryPaused] = useState(false);

  const scrollBoostRef = useRef(0);
  const decayTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined") {
      scrollBoostRef.current = 0;
      return;
    }

    const scheduleDecay = () => {
      if (decayTimerRef.current !== null) {
        window.clearTimeout(decayTimerRef.current);
      }
      decayTimerRef.current = window.setTimeout(() => {
        scrollBoostRef.current = 0;
      }, 140);
    };

    if (lenis) {
      const onLenisScroll = (instance: { velocity?: number }) => {
        const v = Math.abs(instance.velocity ?? 0);
        scrollBoostRef.current = Math.min(2.2, v * 0.085);
        scheduleDecay();
      };
      lenis.on("scroll", onLenisScroll);
      return () => {
        lenis.off("scroll", onLenisScroll);
        if (decayTimerRef.current !== null) {
          window.clearTimeout(decayTimerRef.current);
        }
      };
    }

    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      const dy = Math.abs(window.scrollY - lastY);
      const velocity = (dy / dt) * 16;
      scrollBoostRef.current = Math.min(2.0, velocity * 0.06);
      lastY = window.scrollY;
      lastT = now;
      scheduleDecay();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (decayTimerRef.current !== null) {
        window.clearTimeout(decayTimerRef.current);
      }
    };
  }, [lenis, isReducedMotion]);

  const allGalleryPhotos = useMemo(
    () => [...copy.galleryRow1, ...copy.galleryRow2],
    [copy.galleryRow1, copy.galleryRow2]
  );

  const filteredGalleryPhotos = useMemo(() => {
    if (galleryFilter === "all") return allGalleryPhotos;
    return allGalleryPhotos.filter((item) =>
      item.filterCategories.includes(galleryFilter)
    );
  }, [allGalleryPhotos, galleryFilter]);

  const allShowcaseItems = useMemo(
    () => allGalleryPhotos.map(galleryItemToShowcase),
    [allGalleryPhotos]
  );

  const filteredShowcaseItems = useMemo(
    () => filteredGalleryPhotos.map(galleryItemToShowcase),
    [filteredGalleryPhotos]
  );

  const handleRequestFullsuitQuote = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("fluffnii:pick-parts", { detail: ["Fullsuit"] })
      );
    }
    onNavigateSection("contact");
  };

  return (
    <section
      id="galerie"
      className="scroll-mt-24 w-full py-24 md:py-[140px] border-t border-fg/[0.16] overflow-hidden"
    >
      <div className="max-w-site mx-auto px-5 md:px-14 mb-10">
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: isReducedMotion ? 0.01 : 0.85, ease: EASE }}
          className="flex items-center justify-between mb-6"
        >
          <span className={EYEBROW_CLASS}>{copy.galleryEyebrow}</span>
          <span className={EYEBROW_CLASS}>(007)</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <ScrollWordReveal
            text={copy.galleryTitle}
            as="h2"
            className={cn(
              "font-stagheiz max-w-[820px] text-fg",
              isVi
                ? "text-4xl md:text-[56px] leading-[1.16] tracking-[-0.02em] py-[0.06em]"
                : "text-[44px] md:text-[68px] leading-[0.95] tracking-[-0.005em]"
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
            className={cn(
              BODY_COPY_CLASS,
              "max-w-[390px] shrink-0 text-ink/70 dark:text-cream/75"
            )}
          >
            {copy.galleryDesc}
          </motion.p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {copy.galleryFilters.map((chip) => {
              const active = galleryFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setGalleryFilter(chip.id)}
                  className={cn(
                    "min-h-10 px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink focus-visible:ring-offset-cream dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night",
                    active
                      ? "bg-ink border-ink text-cream dark:bg-butter dark:border-butter dark:text-ink"
                      : "bg-cream border-ink/25 text-ink hover:bg-taupe dark:bg-night-surface dark:border-cream/25 dark:text-cream dark:hover:bg-night-elevated"
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {galleryFilter === "all" && !isReducedMotion && (
            <MagneticButton as="span" strength={0.15}>
              <button
                type="button"
                aria-pressed={galleryPaused}
                aria-label={
                  galleryPaused ? copy.galleryPlayAria : copy.galleryPauseAria
                }
                onClick={() => setGalleryPaused((p) => !p)}
                className="theme-butter-card inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full border-[1.5px] bg-butter/85 hover:bg-butter text-ink font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-ink focus-visible:ring-ink focus-visible:ring-offset-cream dark:border-butter dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night"
              >
                {galleryPaused ? (
                  <Play className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Pause className="w-3.5 h-3.5" />
                )}
                <span>
                  {galleryPaused ? copy.galleryPlayLabel : copy.galleryPauseLabel}
                </span>
              </button>
            </MagneticButton>
          )}
        </div>
      </div>

      {galleryFilter === "all" ? (
        <div className="flex flex-col gap-4">
          <SmoothTicker
            velocity={42}
            direction="left"
            hoverModifier={0.2}
            paused={galleryPaused}
            gap={16}
            scrollBoostRef={scrollBoostRef}
            renderItems={(isClone) =>
              copy.galleryRow1.map((item, idx) => {
                const meta = getGalleryMeta(item);
                const pos = item.objectPosition ?? meta.defaultPos;
                return (
                  <button
                    key={`${item.id}-${isClone ? "c" : "m"}`}
                    type="button"
                    tabIndex={isClone ? -1 : 0}
                    data-cursor-kind="inspect"
                    onClick={() => onOpenPhoto(allShowcaseItems, idx)}
                    aria-label={item.title}
                    className={cn(GALLERY_TILE_BASE, meta.marqueeSizeClass)}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      width={meta.width}
                      height={meta.height}
                      style={{ objectPosition: pos }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-studio group-hover:scale-[1.035]"
                    />
                    <span aria-hidden="true" className={GALLERY_ZOOM_BADGE_CLASS}>
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </button>
                );
              })
            }
          />

          <SmoothTicker
            velocity={68}
            direction="right"
            hoverModifier={1}
            paused={galleryPaused}
            gap={40}
            className="py-5"
            scrollBoostRef={scrollBoostRef}
            renderItems={() =>
              copy.galleryWords.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className={cn(
                      "font-stagheiz text-[44px] md:text-[68px] whitespace-nowrap select-none shrink-0 text-fg py-[0.04em]",
                      isVi
                        ? "leading-[1.16] tracking-[-0.02em]"
                        : "leading-[0.95] tracking-[-0.005em]"
                    )}
                  >
                    {word}
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full shrink-0 bg-ink dark:bg-butter" />
                </React.Fragment>
              ))
            }
          />

          <SmoothTicker
            velocity={42}
            direction="right"
            hoverModifier={0.2}
            paused={galleryPaused}
            gap={16}
            scrollBoostRef={scrollBoostRef}
            renderItems={(isClone) =>
              copy.galleryRow2.map((item, idx) => {
                const meta = getGalleryMeta(item);
                const pos = item.objectPosition ?? meta.defaultPos;
                return (
                  <button
                    key={`${item.id}-${isClone ? "c" : "m"}`}
                    type="button"
                    tabIndex={isClone ? -1 : 0}
                    data-cursor-kind="inspect"
                    onClick={() =>
                      onOpenPhoto(
                        allShowcaseItems,
                        copy.galleryRow1.length + idx
                      )
                    }
                    aria-label={item.title}
                    className={cn(GALLERY_TILE_BASE, meta.marqueeSizeClass)}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      width={meta.width}
                      height={meta.height}
                      style={{ objectPosition: pos }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-studio group-hover:scale-[1.035]"
                    />
                    <span aria-hidden="true" className={GALLERY_ZOOM_BADGE_CLASS}>
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </button>
                );
              })
            }
          />
        </div>
      ) : filteredGalleryPhotos.length > 0 ? (
        <div className="max-w-site mx-auto px-5 md:px-14 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
          {filteredGalleryPhotos.map((item, idx) => {
            const meta = getGalleryMeta(item);
            const pos = item.objectPosition ?? meta.defaultPos;
            return (
              <div key={item.id} className="break-inside-avoid mb-5">
                <button
                  type="button"
                  data-cursor-kind="inspect"
                  onClick={() => onOpenPhoto(filteredShowcaseItems, idx)}
                  className="group relative w-full rounded-card overflow-hidden text-left cursor-pointer border bg-surface-alt border-fg/15 shadow-card hover:shadow-card-hover transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink focus-visible:ring-offset-cream dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night flex flex-col"
                >
                  <div className={cn("relative w-full overflow-hidden", meta.gridAspectClass)}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      width={meta.width}
                      height={meta.height}
                      style={{ objectPosition: pos }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-studio group-hover:scale-[1.035]"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(GALLERY_ZOOM_BADGE_CLASS, "bottom-3 right-3")}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="w-full px-4 py-3.5 bg-cream dark:bg-night-surface border-t studio-hairline flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-eyebrow text-fg/70 dark:text-butter/90 truncate">
                        {item.eyebrow}
                      </div>
                      <div className="font-sans text-[15px] font-semibold leading-tight text-fg truncate mt-0.5">
                        {item.title}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-fg/70 shrink-0">
                      ({String(idx + 1).padStart(2, "0")})
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-site mx-auto px-5 md:px-14">
          <div className="rounded-card-lg border p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-taupe border-ink/[0.16] dark:bg-night-surface dark:border-cream/[0.16]">
            <div className="flex flex-col gap-3 max-w-[680px]">
              <h3
                className={cn(
                  "font-stagheiz text-[28px] sm:text-[34px] text-fg py-[0.04em]",
                  isVi ? "leading-[1.16]" : "leading-[1.02]"
                )}
              >
                {copy.galleryEmptyFullsuit.title}
              </h3>
              <p className="font-sans text-base leading-[1.55] text-fg/80">
                {copy.galleryEmptyFullsuit.desc}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <MagneticButton as="span" strength={0.18}>
                <button
                  type="button"
                  onClick={handleRequestFullsuitQuote}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-sans text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-ink hover:bg-espresso text-cream focus-visible:ring-ink focus-visible:ring-offset-taupe dark:bg-butter dark:hover:bg-cream dark:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface"
                >
                  <span>{copy.galleryEmptyFullsuit.ctaQuote}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticButton>
              <a
                href="/#offres"
                onClick={(e) => {
                  if (!isModifiedClick(e)) {
                    e.preventDefault();
                    onNavigateSection("offres");
                  }
                }}
                className="inline-flex items-center rounded-full border-[1.5px] px-5 py-3 font-sans text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-ink text-ink hover:bg-ink hover:text-cream focus-visible:ring-ink focus-visible:ring-offset-taupe dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface"
              >
                {copy.galleryEmptyFullsuit.ctaSpecs}
              </a>
              <button
                type="button"
                onClick={() => setGalleryFilter("all")}
                className="font-mono text-xs uppercase tracking-wider underline underline-offset-4 px-2 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded text-fg focus-visible:ring-ink dark:focus-visible:ring-butter"
              >
                {copy.galleryEmptyFullsuit.ctaShowAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const MemoGallerySection = React.memo(GallerySection);
MemoGallerySection.displayName = "GallerySection";

export default MemoGallerySection;
