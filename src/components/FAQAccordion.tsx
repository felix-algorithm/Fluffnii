"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { useDeviceTier } from "@/lib/deviceTier";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { FAQ_ITEMS, type FAQItem } from "@/lib/studioExtraCopy";
import { cn } from "@/lib/cn";

export type { FAQItem };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FAQAccordion({ items }: { items?: FAQItem[] }) {
  const { lang } = useLang();
  const { isReducedMotion } = useDeviceTier();
  const { refresh } = useSmoothScroll();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const refreshTimerRef = useRef<number | null>(null);

  const activeItems = items ?? FAQ_ITEMS[lang];

  useEffect(() => {
    return () => {
      if (refreshTimerRef.current !== null) {
        window.clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
    if (typeof window !== "undefined") {
      if (refreshTimerRef.current !== null) {
        window.clearTimeout(refreshTimerRef.current);
      }
      refreshTimerRef.current = window.setTimeout(() => {
        refresh();
      }, 360);
    }
  };

  return (
    <div className="w-full flex flex-col border-t studio-hairline">
      {activeItems.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${baseId}-btn-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;
        const numTag = `(${String(idx + 1).padStart(2, "0")})`;

        return (
          <div key={idx} className="border-b studio-hairline">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(idx)}
                className="group w-full py-6 md:py-[26px] flex items-center justify-between gap-4 sm:gap-6 text-left cursor-pointer rounded-md focus-ring"
              >
                <span className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                  <span className="font-mono text-xs tracking-eyebrow text-fg/70 shrink-0">
                    {numTag}
                  </span>
                  <span className="font-sans text-[19px] md:text-[22px] font-medium tracking-[-0.02em] leading-[1.35] text-fg group-hover:text-accent transition-colors">
                    {item.question}
                  </span>
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{
                    duration: isReducedMotion ? 0.01 : 0.4,
                    ease: EASE,
                  }}
                  className={cn(
                    "w-11 h-11 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors duration-300",
                    isOpen
                      ? "bg-ink border-ink text-cream dark:bg-butter dark:border-butter dark:text-ink"
                      : "bg-transparent border-ink text-ink group-hover:bg-taupe/70 dark:border-cream dark:text-cream dark:group-hover:bg-night-elevated"
                  )}
                >
                  <Plus className="w-5 h-5" strokeWidth={1.75} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={
                    isReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    isReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                  }
                  transition={{
                    duration: isReducedMotion ? 0.01 : 0.42,
                    ease: EASE,
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-[26px] pl-0 sm:pl-9 pr-0 md:pr-20 font-sans text-base md:text-[17px] leading-[1.58] tracking-[-0.01em] text-fg/75">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
