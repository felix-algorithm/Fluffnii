"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronUp, Compass } from "lucide-react";
import type { Lang } from "@/components/LanguageProvider";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { scrollToSection } from "@/lib/sectionScroll";
import { cn } from "@/lib/cn";

export interface ChapterItem {
  id: string;
  num: string;
  label: string;
}

export interface ChapterRailProps {
  lang: Lang;
  chapters?: ChapterItem[];
}

const DEFAULT_CHAPTERS: Record<Lang, ChapterItem[]> = {
  en: [
    { id: "top", num: "00", label: "Intro" },
    { id: "studio", num: "01", label: "Workshop" },
    { id: "pour-qui", num: "02", label: "Species" },
    { id: "pourquoi", num: "03", label: "Craft" },
    { id: "methode", num: "04", label: "Method" },
    { id: "projets", num: "05", label: "Projects" },
    { id: "galerie", num: "06", label: "Gallery" },
    { id: "offres", num: "07", label: "Tiers" },
    { id: "deroule", num: "08", label: "Process" },
    { id: "faq", num: "09", label: "FAQ" },
    { id: "contact", num: "10", label: "Quote" },
  ],
  vi: [
    { id: "top", num: "00", label: "Mở đầu" },
    { id: "studio", num: "01", label: "Về xưởng" },
    { id: "pour-qui", num: "02", label: "Loài OC" },
    { id: "pourquoi", num: "03", label: "Chi tiết" },
    { id: "methode", num: "04", label: "3 Bước" },
    { id: "projets", num: "05", label: "Dự án" },
    { id: "galerie", num: "06", label: "Thư viện" },
    { id: "offres", num: "07", label: "Hạng mục" },
    { id: "deroule", num: "08", label: "Quy trình" },
    { id: "faq", num: "09", label: "FAQ" },
    { id: "contact", num: "10", label: "Báo giá" },
  ],
};

export default function ChapterRail({ lang, chapters }: ChapterRailProps) {
  const items = useMemo(
    () => (chapters && chapters.length > 0 ? chapters : DEFAULT_CHAPTERS[lang]),
    [chapters, lang]
  );

  const { isEnabled: smoothEnabled, scrollToSection: smoothScrollToSection } =
    useSmoothScroll();

  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "top");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mobileWrapRef = useRef<HTMLDivElement>(null);

  const navigateTo = useCallback(
    (id: string) => {
      setActiveId((prev) => (prev === id ? prev : id));
      setDrawerOpen(false);
      if (smoothEnabled) {
        smoothScrollToSection(id);
      } else {
        scrollToSection(id);
      }
    },
    [smoothEnabled, smoothScrollToSection]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observed = items
      .map((ch) => ({
        id: ch.id,
        el: document.getElementById(ch.id),
      }))
      .filter((entry): entry is { id: string; el: HTMLElement } => entry.el !== null);

    if (observed.length === 0) return;

    let scrollRafId: number | null = null;

    const syncActiveChapter = () => {
      scrollRafId = null;

      const firstId = observed[0].id;
      const lastId = observed[observed.length - 1].id;
      const scrollY = window.scrollY;

      let nextId = firstId;

      if (scrollY >= 120) {
        const doc = document.documentElement;
        if (scrollY + window.innerHeight >= doc.scrollHeight - 80) {
          nextId = lastId;
        } else {
          const triggerY = window.innerHeight * 0.36;
          for (const entry of observed) {
            if (entry.id === "top") continue;
            if (entry.el.getBoundingClientRect().top <= triggerY) {
              nextId = entry.id;
            }
          }
        }
      }

      setActiveId((prev) => (prev === nextId ? prev : nextId));
    };

    const scheduleSync = () => {
      if (scrollRafId !== null) return;
      scrollRafId = window.requestAnimationFrame(syncActiveChapter);
    };

    syncActiveChapter();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      if (scrollRafId !== null) {
        window.cancelAnimationFrame(scrollRafId);
      }
    };
  }, [items]);

  useEffect(() => {
    if (!drawerOpen || typeof window === "undefined") return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        mobileWrapRef.current &&
        !mobileWrapRef.current.contains(e.target as Node)
      ) {
        setDrawerOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId)
  );
  const activeItem = items[activeIndex] ?? items[0];

  if (!activeItem) return null;

  return (
    <>
      <nav
        aria-label={lang === "vi" ? "Mục lục trang" : "Page chapters"}
        className="hidden xl:flex fixed right-4 2xl:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-none"
      >
        <div className="pointer-events-auto flex flex-col items-center gap-1 rounded-full border studio-hairline-strong bg-cream/80 dark:bg-night-surface/85 backdrop-blur-md px-2 py-3 shadow-card">
          {items.map((item) => {
            const isActive = item.id === activeItem.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                aria-current={isActive ? "location" : undefined}
                aria-label={`${item.num} ${item.label}`}
                className="group relative flex items-center justify-center w-7 h-6 rounded-full cursor-pointer focus-ring"
              >
                <span
                  className={cn(
                    "pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-eyebrow whitespace-nowrap transition-all duration-200 shadow-card",
                    "opacity-0 translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                    isActive
                      ? "theme-butter-card bg-butter text-ink border-ink/20"
                      : "bg-cream/95 dark:bg-night-elevated text-fg studio-hairline-strong"
                  )}
                >
                  {item.num} · {item.label}
                </span>

                <span
                  className={cn(
                    "font-mono text-[9px] tabular-nums leading-none transition-all duration-200",
                    isActive
                      ? "font-bold text-espresso dark:text-butter scale-110"
                      : "text-fg/45 group-hover:text-fg"
                  )}
                >
                  {item.num}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-0.5 w-1 h-1 rounded-full transition-opacity",
                    isActive
                      ? "opacity-100 bg-espresso dark:bg-butter"
                      : "opacity-0"
                  )}
                />
              </button>
            );
          })}
        </div>
      </nav>

      <div
        ref={mobileWrapRef}
        className="xl:hidden fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 max-w-[calc(100vw-2rem)]"
      >
        {drawerOpen && (
          <div
            role="dialog"
            aria-label={lang === "vi" ? "Chọn phần trang" : "Jump to chapter"}
            className="w-[240px] max-h-[55svh] overflow-y-auto rounded-card border studio-hairline-strong bg-cream/95 dark:bg-night-surface/95 backdrop-blur-xl p-2 shadow-modal flex flex-col gap-1"
          >
            {items.map((item) => {
              const isActive = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer focus-ring",
                    isActive
                      ? "theme-butter-card bg-butter text-ink font-semibold"
                      : "text-fg/85 hover:bg-surface-alt"
                  )}
                >
                  <span className="font-sans text-sm truncate">{item.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-eyebrow opacity-75 shrink-0">
                    {item.num}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() => setDrawerOpen((prev) => !prev)}
          aria-expanded={drawerOpen}
          aria-label={
            lang === "vi"
              ? `Phần hiện tại: ${activeItem.num} ${activeItem.label}. Mở mục lục`
              : `Current chapter: ${activeItem.num} ${activeItem.label}. Toggle chapters`
          }
          className="inline-flex items-center gap-2.5 rounded-full border studio-hairline-strong bg-cream/90 dark:bg-night-surface/90 backdrop-blur-xl px-3.5 py-2 shadow-float text-fg cursor-pointer focus-ring"
        >
          <Compass className="w-3.5 h-3.5 text-espresso dark:text-butter shrink-0" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-eyebrow whitespace-nowrap">
            {activeItem.num} · {activeItem.label}
          </span>
          <ChevronUp
            className={cn(
              "w-3.5 h-3.5 opacity-70 transition-transform duration-200",
              drawerOpen ? "rotate-180" : "rotate-0"
            )}
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );
}
