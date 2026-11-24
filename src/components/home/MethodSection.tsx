"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";
import type { HomeLocaleCopy } from "@/lib/homeCopy";
import { cn } from "@/lib/cn";

export interface MethodSectionProps {
  copy: HomeLocaleCopy;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;

const EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-fg/70";

const METHOD_IMAGE_FOCAL: Record<string, string> = {
  "/images/method-01.webp": "50% 35%",
  "/images/method-02.webp": "52% 36%",
  "/images/method-03.webp": "46% 40%",
};

function WordReveal({
  text,
  className = "",
  staggerDelay = 0.05,
  yOffset = 40,
  threshold = 0.3,
}: {
  text: string | string[];
  className?: string;
  staggerDelay?: number;
  yOffset?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const lines = Array.isArray(text) ? text : [text];

  let wordIdx = 0;

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ").filter(Boolean);
        return (
          <React.Fragment key={li}>
            {li > 0 && <br />}
            {words.map((word, wi) => {
              const delay = wordIdx * staggerDelay;
              wordIdx += 1;
              return (
                <React.Fragment key={`${li}-${wi}`}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    initial={{ opacity: 0.001, y: yOffset }}
                    animate={
                      inView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0.001, y: yOffset }
                    }
                    transition={{
                      duration: 0.9,
                      delay,
                      ease: EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < words.length - 1 ? " " : null}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </h2>
  );
}

function MethodSection({ copy }: MethodSectionProps) {
  const { lang } = useLang();
  const isVi = lang === "vi";

  return (
    <section
      id="methode"
      className="scroll-mt-24 w-full max-w-site mx-auto px-5 md:px-14 py-24 md:py-[140px] border-t border-fg/[0.16]"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay: 0, ease: EASE }}
        className="flex items-center justify-between mb-8"
      >
        <span className={EYEBROW_CLASS}>{copy.methodEyebrow}</span>
        <span className={EYEBROW_CLASS}>(005)</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
        <WordReveal
          text={copy.methodTitle}
          className={cn(
            "lg:col-span-7 font-stagheiz text-fg",
            isVi
              ? "text-[36px] sm:text-[50px] md:text-[64px] leading-[1.14] tracking-[-0.025em]"
              : "text-[44px] sm:text-[60px] md:text-[74px] leading-[0.92]"
          )}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, delay: 0, ease: EASE }}
          className="lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] text-ink/70 dark:text-cream/75"
        >
          {copy.methodDesc}
        </motion.p>
      </div>

      <div className="flex flex-col gap-10">
        {copy.methodSteps.map((step) => {
          const isButterStep = step.bg.toLowerCase() === "#fff0a6";
          const cardClasses = isButterStep
            ? "theme-butter-card bg-butter border-ink/[0.16] text-ink"
            : step.dark
            ? "bg-espresso border-cream/20 text-cream"
            : "bg-taupe border-ink/[0.16] text-ink dark:bg-night-elevated dark:border-cream/20 dark:text-cream";
          const metaTextClass = isButterStep
            ? "text-ink/70"
            : step.dark
            ? "text-cream/75"
            : "text-ink/70 dark:text-cream/75";
          const descTextClass = isButterStep
            ? "text-ink/75"
            : step.dark
            ? "text-cream/85"
            : "text-ink/75 dark:text-cream/85";
          const pillClasses = isButterStep
            ? "border-ink/20 bg-white/70 dark:bg-cream/75 text-ink"
            : step.dark
            ? "border-cream/25 bg-cream/10 text-cream"
            : "border-ink/20 bg-white/70 text-ink dark:border-cream/25 dark:bg-cream/10 dark:text-cream";

          const objectPosition = METHOD_IMAGE_FOCAL[step.img] ?? "50% 40%";

          return (
            <div
              key={step.counter}
              style={{ top: `${step.top}px` }}
              className={cn(
                "lg:sticky rounded-sheet border p-7 sm:p-10 md:p-14 shadow-[0_-10px_40px_rgba(17,22,34,0.06)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.45)]",
                cardClasses
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-mono text-xs uppercase tracking-eyebrow",
                        metaTextClass
                      )}
                    >
                      {step.tag}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-xs uppercase tracking-eyebrow",
                        metaTextClass
                      )}
                    >
                      {step.counter}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3
                      className={cn(
                        "font-stagheiz",
                        isVi
                          ? "text-[28px] sm:text-[38px] md:text-[46px] leading-[1.14] tracking-[-0.02em]"
                          : "text-[34px] sm:text-[46px] md:text-[56px] leading-[0.95]"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "font-sans text-[17px] md:text-[19px] leading-[1.55] max-w-[540px]",
                        descTextClass
                      )}
                    >
                      {step.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {step.pills.map((pill) => (
                      <span
                        key={pill}
                        className={cn(
                          "px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider border",
                          pillClasses
                        )}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/10">
                    <img
                      src={step.img}
                      alt={step.title}
                      loading="lazy"
                      decoding="async"
                      width={960}
                      height={720}
                      style={{ objectPosition }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default React.memo(MethodSection);
