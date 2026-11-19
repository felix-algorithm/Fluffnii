"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const activeItem = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

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
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
        return;
      }

      if (e.key === "ArrowRight" && items.length > 1) {
        e.preventDefault();
        onChangeIndex((activeIndex + 1) % items.length);
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
  }, [isOpen, activeIndex, items.length, onChangeIndex]);

  const handlePrev = () => {
    if (activeIndex === null || items.length <= 1) return;
    onChangeIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (activeIndex === null || items.length <= 1) return;
    onChangeIndex((activeIndex + 1) % items.length);
  };

  return (
    <AnimatePresence>
      {activeItem && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          onClick={() => onChangeIndex(null)}
          className="fixed inset-0 z-[80] bg-[#111622]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[820px] max-h-[92vh] overflow-y-auto rounded-[28px] bg-[#f5f8fc] text-[#111622] border border-[#111622]/15 shadow-[0_28px_70px_rgba(17,22,34,0.45)]"
          >
            <div className="relative w-full bg-[#dce8f5] flex items-center justify-center min-h-[260px] sm:min-h-[380px] max-h-[58vh] overflow-hidden">
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                decoding="async"
                style={
                  activeItem.objectPosition
                    ? { objectPosition: activeItem.objectPosition }
                    : undefined
                }
                className="w-full max-h-[58vh] object-contain"
              />

              <button
                ref={closeButtonRef}
                type="button"
                aria-label={closeAria}
                onClick={() => onChangeIndex(null)}
                className="absolute top-3.5 right-3.5 z-10 w-11 h-11 rounded-full bg-[#f5f8fc]/95 border border-[#111622]/20 text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111622] focus-visible:ring-offset-2"
              >
                <X className="w-5 h-5" />
              </button>

              {items.length > 1 && (
                <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1.5 rounded-full bg-[#111622]/85 text-[#f5f8fc] font-mono text-[11px] uppercase tracking-[0.06em]">
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
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#f5f8fc]/90 border border-[#111622]/20 text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111622] focus-visible:ring-offset-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label={nextAria}
                    onClick={handleNext}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#f5f8fc]/90 border border-[#111622]/20 text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111622] focus-visible:ring-offset-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/70">
                    {activeItem.eyebrow}
                  </span>
                  <h3 className="font-stagheiz text-[28px] sm:text-[34px] leading-[1] text-[#111622]">
                    {activeItem.title}
                  </h3>
                  {activeItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-[#dce8f5] border border-[#111622]/15 font-mono text-[11px] uppercase tracking-[0.05em] text-[#111622]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onRequestSimilar(activeItem)}
                  className="group shrink-0 inline-flex items-center justify-center gap-3 rounded-full bg-[#111622] hover:bg-[#1e3557] text-[#f5f8fc] px-6 py-3.5 font-sans text-[15px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111622] focus-visible:ring-offset-2"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <p className="font-sans text-[16px] leading-[1.55] text-[#111622]/80">
                {activeItem.description}
              </p>

              {activeItem.review && (
                <div className="rounded-[18px] bg-[#fff0a6] border border-[#111622]/15 p-4 sm:p-5">
                  <p className="font-sans text-[15px] leading-[1.5] text-[#111622] mb-2">
                    &ldquo;{activeItem.review}&rdquo;
                  </p>
                  {activeItem.author && (
                    <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#111622]/70">
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
