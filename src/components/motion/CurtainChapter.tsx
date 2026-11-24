"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceTier } from "@/lib/deviceTier";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type CurtainTone = "espresso" | "night" | "butter" | "cream";

export interface CurtainChapterProps {
  id?: string;
  ariaLabel?: string;
  className?: string;
  /** Optional base chapter revealed underneath before the arched curtain rises over it */
  underlay?: React.ReactNode;
  /** Main content inside the rising arched curtain surface */
  children: React.ReactNode;
  tone?: CurtainTone;
  /** Tall scroll track class used when `underlay` is present on mid/high devices */
  pinHeightClass?: string;
  showGrid?: boolean;
}

const TONE_CLASSES: Record<CurtainTone, string> = {
  espresso: "studio-curtain-arch text-cream",
  night:
    "rounded-t-[42px] sm:rounded-t-[72px] bg-night text-cream border-t border-butter/30 shadow-curtain-dark",
  butter:
    "rounded-t-[42px] sm:rounded-t-[72px] theme-butter-card bg-butter text-ink border-t border-ink/15 shadow-card-hover",
  cream:
    "rounded-t-[42px] sm:rounded-t-[72px] bg-cream dark:bg-night-surface text-fg border-t studio-hairline-strong shadow-card-hover",
};

/**
 * Reusable layered arched curtain transition inspired by editorial scroll chapters.
 * Uses GSAP ScrollTrigger on mid/high tiers and degrades cleanly to a static stacked
 * layout on low-end and reduced-motion devices.
 */
export default function CurtainChapter({
  id,
  ariaLabel,
  className,
  underlay,
  children,
  tone = "espresso",
  pinHeightClass = "min-h-[210svh]",
  showGrid = true,
}: CurtainChapterProps) {
  const { tier, isReducedMotion } = useDeviceTier();
  const useStaticFallback = isReducedMotion || tier === "low";

  const rootRef = useRef<HTMLElement>(null);
  const underlayRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (useStaticFallback) return;
    const root = rootRef.current;
    const curtain = curtainRef.current;
    if (!root || !curtain) return;

    const ctx = gsap.context(() => {
      if (underlay) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          curtain,
          { yPercent: 102 },
          { yPercent: 0, ease: "none" },
          0
        );

        if (underlayRef.current) {
          tl.to(
            underlayRef.current,
            { opacity: 0.24, scale: 0.97, ease: "none" },
            0.15
          );
        }
      } else {
        gsap.fromTo(
          curtain,
          { y: 56, opacity: 0.92 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            clearProps: "transform,willChange",
            onComplete: () => {
              gsap.set(curtain, { clearProps: "transform,willChange" });
            },
            scrollTrigger: {
              trigger: root,
              start: "top 86%",
              once: true,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [useStaticFallback, underlay]);

  if (useStaticFallback) {
    return (
      <section
        id={id}
        aria-label={ariaLabel}
        className={cn("relative w-full overflow-x-clip", className)}
      >
        {underlay && (
          <div className="relative w-full py-16 md:py-24">{underlay}</div>
        )}
        <div
          className={cn(
            "relative w-full overflow-hidden py-16 md:py-24",
            TONE_CLASSES[tone]
          )}
        >
          {showGrid && (
            <span
              aria-hidden="true"
              className="studio-grid-bg absolute inset-0 pointer-events-none"
            />
          )}
          <div className="relative z-10">{children}</div>
        </div>
      </section>
    );
  }

  if (underlay) {
    return (
      <section
        ref={rootRef}
        id={id}
        aria-label={ariaLabel}
        className={cn("relative w-full", pinHeightClass, className)}
      >
        <div className="sticky top-0 w-full h-[100svh] overflow-hidden">
          <div
            ref={underlayRef}
            className="absolute inset-0 z-10 flex flex-col justify-center overflow-y-auto"
          >
            {underlay}
          </div>

          <div
            ref={curtainRef}
            className={cn(
              "absolute -inset-x-[8%] sm:-inset-x-[12%] top-0 bottom-0 z-20 will-change-transform flex flex-col justify-center px-[8%] sm:px-[12%] overflow-hidden",
              TONE_CLASSES[tone]
            )}
          >
            {showGrid && (
              <span
                aria-hidden="true"
                className="studio-grid-bg absolute inset-0 pointer-events-none"
              />
            )}
            <div className="relative z-10 w-full">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      id={id}
      aria-label={ariaLabel}
      className={cn("relative w-full overflow-x-clip", className)}
    >
      <div
        ref={curtainRef}
        className={cn(
          "relative w-full overflow-hidden py-16 md:py-24",
          TONE_CLASSES[tone]
        )}
      >
        {showGrid && (
          <span
            aria-hidden="true"
            className="studio-grid-bg absolute inset-0 pointer-events-none"
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}
