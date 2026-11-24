"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceTier } from "@/lib/deviceTier";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface ScrollWordRevealProps {
  text: string | string[];
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  yPercent?: number;
  triggerStart?: string;
  /** Play right away on mount instead of waiting for ScrollTrigger (e.g., above-the-fold Hero) */
  immediate?: boolean;
  ariaLabel?: string;
}

/**
 * Masked word-by-word reveal with vertical diacritic bleed padding (`py-[0.12em]`)
 * so uppercase Vietnamese accents never clip. Renders immediately under reduced motion.
 */
export default function ScrollWordReveal({
  text,
  as = "h2",
  className,
  stagger = 0.04,
  duration = 0.82,
  delay = 0,
  yPercent = 108,
  triggerStart = "top 86%",
  immediate = false,
  ariaLabel,
}: ScrollWordRevealProps) {
  const { isReducedMotion, tier } = useDeviceTier();
  const rootRef = useRef<HTMLElement>(null);

  const lines = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );
  const fullAccessibleText = useMemo(
    () => ariaLabel ?? lines.join(" "),
    [ariaLabel, lines]
  );

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>("[data-reveal-word]");
    if (words.length === 0) return;

    if (isReducedMotion) {
      gsap.set(words, { yPercent: 0, opacity: 1, clearProps: "transform,opacity" });
      return;
    }

    const effectiveDuration = tier === "low" ? Math.min(duration, 0.45) : duration;
    const effectiveStagger = tier === "low" ? Math.min(stagger, 0.02) : stagger;

    const ctx = gsap.context(() => {
      if (immediate) {
        gsap.fromTo(
          words,
          { yPercent, opacity: 0.01 },
          {
            yPercent: 0,
            opacity: 1,
            duration: effectiveDuration,
            delay,
            stagger: effectiveStagger,
            ease: "power4.out",
            clearProps: "willChange",
          }
        );
      } else {
        gsap.fromTo(
          words,
          { yPercent, opacity: 0.01 },
          {
            yPercent: 0,
            opacity: 1,
            duration: effectiveDuration,
            delay,
            stagger: effectiveStagger,
            ease: "power4.out",
            clearProps: "willChange",
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once: true,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [
    fullAccessibleText,
    isReducedMotion,
    tier,
    stagger,
    duration,
    delay,
    yPercent,
    triggerStart,
    immediate,
  ]);

  const Tag = as;

  return (
    <Tag
      ref={rootRef as React.RefObject<HTMLHeadingElement>}
      aria-label={fullAccessibleText}
      className={cn(className)}
    >
      {lines.map((line, lineIdx) => {
        const words = line.split(/\s+/).filter(Boolean);
        return (
          <React.Fragment key={`${lineIdx}-${line}`}>
            {lineIdx > 0 && <br />}
            {words.map((word, wordIdx) => (
              <React.Fragment key={`${lineIdx}-${wordIdx}-${word}`}>
                <span
                  aria-hidden="true"
                  className="studio-word-mask py-[0.12em] -my-[0.12em]"
                >
                  <span
                    data-reveal-word=""
                    className="studio-word-inner will-change-transform"
                  >
                    {word}
                  </span>
                </span>
                {wordIdx < words.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
