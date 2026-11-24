"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import MagneticButton from "@/components/motion/MagneticButton";
import { useDeviceTier } from "@/lib/deviceTier";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { cn } from "@/lib/cn";

export interface ShowcaseItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  partValues: string[];
  review?: string;
  author?: string;
  role?: string;
  objectPosition?: string;
  width?: number;
  height?: number;
}

interface ShowcaseLightboxProps {
  items: ShowcaseItem[];
  activeIndex: number | null;
  onChangeIndex: (index: number | null) => void;
  onRequestSimilar: (item: ShowcaseItem) => void;
  closeAria: string;
  prevAria: string;
  nextAria: string;
  ctaLabel: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LIGHTBOX_ICON_BTN_CLASS =
  "absolute z-10 w-11 h-11 rounded-full border border-ink/20 bg-cream/90 text-ink hover:bg-ink hover:text-cream transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:bg-night-surface/90 dark:border-cream/25 dark:text-cream dark:hover:bg-butter dark:hover:text-ink dark:hover:border-butter dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night";

export default function ShowcaseLightbox({
  items,
  activeIndex,
  onChangeIndex,
  onRequestSimilar,
  closeAria,
  prevAria,
  nextAria,
  ctaLabel,
}: ShowcaseLightboxProps) {
  const { tier, isReducedMotion } = useDeviceTier();
  const { stop: stopScroll, start: startScroll } = useSmoothScroll();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const isOpen =
    activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const activeItem = isOpen ? items[activeIndex] : null;
  const lowPower = tier === "low" || isReducedMotion;

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stopScroll();

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      startScroll();
      previousFocusRef.current?.focus();
    };
  }, [isOpen, stopScroll, startScroll]);

  const handlePrev = useCallback(() => {
    if (activeIndex === null || items.length <= 1) return;
    onChangeIndex((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onChangeIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex === null || items.length <= 1) return;
    onChangeIndex((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onChangeIndex]);

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onChangeIndex(null);
        return;
      }

      if (e.key === "ArrowLeft" && items.length > 1) {
        e.preventDefault();
        handlePrev();
        return;
      }

      if (e.key === "ArrowRight" && items.length > 1) {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, activeIndex, items.length, onChangeIndex, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {activeItem && activeIndex !== null && (
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isReducedMotion ? 0.05 : 0.24, ease: EASE }}
          onClick={() => onChangeIndex(null)}
          className={cn(
            "fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 overflow-y-auto",
            lowPower
              ? "bg-ink/90 dark:bg-black/92"
              : "backdrop-blur-md bg-ink/80 dark:bg-black/85"
          )}
        >
          <motion.div
            ref={dialogRef}
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            initial={
              isReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.96, y: 14 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              isReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 10 }
            }
            transition={{ duration: isReducedMotion ? 0.05 : 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[840px] max-h-[92vh] overflow-y-auto rounded-card-lg border bg-cream text-ink border-ink/15 shadow-modal dark:bg-night-surface dark:text-cream dark:border-cream/15"
          >
            <div
              onTouchStart={(e) => {
                const t = e.touches[0];
                if (!t) return;
                touchStartRef.current = { x: t.clientX, y: t.clientY };
              }}
              onTouchEnd={(e) => {
                const start = touchStartRef.current;
                touchStartRef.current = null;
                if (!start || items.length <= 1) return;
                const t = e.changedTouches[0];
                if (!t) return;
                const dx = t.clientX - start.x;
                const dy = t.clientY - start.y;
                if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
                  if (dx < 0) handleNext();
                  else handlePrev();
                }
              }}
              className="relative w-full flex items-center justify-center min-h-[260px] sm:min-h-[380px] max-h-[58vh] overflow-hidden bg-taupe dark:bg-night-elevated"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={activeItem.width}
                  height={activeItem.height}
                  decoding="async"
                  initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: isReducedMotion ? 0.05 : 0.22, ease: EASE }}
                  style={
                    activeItem.objectPosition
                      ? { objectPosition: activeItem.objectPosition }
                      : undefined
                  }
                  className="w-auto max-w-full max-h-[58vh] object-contain select-none"
                />
              </AnimatePresence>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label={closeAria}
                onClick={() => onChangeIndex(null)}
                className={cn(LIGHTBOX_ICON_BTN_CLASS, "top-3.5 right-3.5")}
              >
                <X className="w-5 h-5" />
              </button>

              {items.length > 1 && (
                <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-eyebrow bg-ink/85 text-cream border border-transparent dark:bg-night/90 dark:border-cream/15">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </div>
              )}

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label={prevAria}
                    onClick={handlePrev}
                    className={cn(
                      LIGHTBOX_ICON_BTN_CLASS,
                      "left-3.5 top-1/2 -translate-y-1/2"
                    )}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label={nextAria}
                    onClick={handleNext}
                    className={cn(
                      LIGHTBOX_ICON_BTN_CLASS,
                      "right-3.5 top-1/2 -translate-y-1/2"
                    )}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-eyebrow text-ink/70 dark:text-cream/70">
                    {activeItem.eyebrow}
                  </span>
                  <h3 className="font-stagheiz text-[28px] sm:text-[34px] leading-none vi:leading-[1.16] tracking-[-0.015em] text-ink dark:text-cream py-[0.04em]">
                    {activeItem.title}
                  </h3>
                  {activeItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border font-mono text-[11px] uppercase tracking-wider bg-taupe border-ink/15 text-ink dark:bg-night-elevated dark:border-cream/15 dark:text-cream"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <MagneticButton as="span" strength={0.18} innerStrength={0.08}>
                  <button
                    type="button"
                    onClick={() => onRequestSimilar(activeItem)}
                    className="group shrink-0 inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3.5 font-sans text-[15px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-ink border-ink hover:bg-espresso hover:border-espresso text-cream focus-visible:ring-ink focus-visible:ring-offset-cream dark:bg-cream dark:border-cream dark:hover:bg-butter dark:hover:border-butter dark:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface"
                  >
                    <span>{ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </MagneticButton>
              </div>

              <p className="font-sans text-base leading-[1.55] text-ink/80 dark:text-cream/80">
                {activeItem.description}
              </p>

              {activeItem.review && (
                <div className="theme-butter-card rounded-card-sm bg-butter border border-ink/15 p-4 sm:p-5">
                  <p className="font-sans text-[15px] leading-normal text-ink mb-2">
                    &ldquo;{activeItem.review}&rdquo;
                  </p>
                  {activeItem.author && (
                    <div className="font-mono text-[11px] uppercase tracking-wider text-ink/70">
                      {activeItem.author}
                      {activeItem.role ? ` · ${activeItem.role}` : ""}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
