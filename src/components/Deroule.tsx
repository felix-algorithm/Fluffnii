"use client";

import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLang } from "./LanguageProvider";
import { useDeviceTier } from "@/lib/deviceTier";
import {
  TIMELINE_META,
  TIMELINE_STEPS,
  type TimelineStep,
} from "@/lib/studioExtraCopy";
import { cn } from "@/lib/cn";

export type { TimelineStep };

interface StepItemProps {
  item: TimelineStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stepPrefix: string;
  isReducedMotion: boolean;
  couleurTexte?: string;
  couleurAccent?: string;
  couleurFondPastille?: string;
  trackColor?: string;
}

function StepItem({
  item,
  index,
  total,
  progress,
  stepPrefix,
  isReducedMotion,
  couleurTexte,
  couleurAccent,
  couleurFondPastille,
  trackColor,
}: StepItemProps) {
  const at = total > 1 ? index / (total - 1) : 0;
  const on = useTransform(progress, [Math.max(0, at - 0.08), at + 0.02], [0, 1]);
  const textOpacity = useTransform(on, [0, 1], [0.34, 1]);
  const textX = useTransform(on, [0, 1], [-10, 0]);
  const dotScale = useTransform(on, [0, 1], [0.64, 1]);
  const displayNum = String(index + 1).padStart(2, "0");
  const nodeLabel = item.num.length <= 3 ? item.num : displayNum;

  return (
    <div
      className="relative z-[1] grid items-start gap-4 md:gap-7"
      style={{
        gridTemplateColumns: "var(--node) 1fr",
      }}
    >
      <div
        className="rounded-full bg-cream dark:bg-night-elevated border-[1.5px] border-ink/[0.16] dark:border-cream/[0.18] flex items-center justify-center relative overflow-hidden shrink-0"
        style={{
          width: "var(--node)",
          height: "var(--node)",
          ...(couleurFondPastille ? { background: couleurFondPastille } : {}),
          ...(trackColor ? { borderColor: trackColor } : {}),
        }}
      >
        <span className="font-mono text-[13px] z-[1] select-none text-ink/[0.72] dark:text-cream/70">
          {nodeLabel}
        </span>

        <motion.div
          className="absolute inset-0 rounded-full bg-ink dark:bg-butter flex items-center justify-center z-[2]"
          style={
            isReducedMotion
              ? {
                  opacity: 1,
                  scale: 1,
                  ...(couleurAccent ? { background: couleurAccent } : {}),
                }
              : {
                  opacity: on,
                  scale: dotScale,
                  ...(couleurAccent ? { background: couleurAccent } : {}),
                }
          }
        >
          <span
            className="font-mono text-[13px] font-bold select-none text-cream dark:text-ink"
            style={
              couleurFondPastille ? { color: couleurFondPastille } : undefined
            }
          >
            {nodeLabel}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="pt-1 flex flex-col gap-2"
        style={
          isReducedMotion
            ? { opacity: 1, x: 0 }
            : {
                opacity: textOpacity,
                x: textX,
              }
        }
      >
        {item.tag && (
          <div className="flex items-center gap-2 font-mono text-[12px] sm:text-[13px] tracking-eyebrow uppercase text-ink/[0.72] dark:text-cream/70">
            <span className="text-fg/70">
              {stepPrefix} {nodeLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>[{item.tag}]</span>
          </div>
        )}
        <h3
          className={cn(
            "font-stagheiz text-[clamp(22px,2.5vw,32px)] leading-[1.06] vi:leading-[1.18] tracking-[-0.015em] text-ink dark:text-cream m-0 py-[0.04em]"
          )}
          style={couleurTexte ? { color: couleurTexte } : undefined}
        >
          {item.titre}
        </h3>
        <p className="font-sans font-normal text-[16.5px] leading-[1.58] tracking-[-0.01em] text-ink/[0.75] dark:text-cream/75 max-w-[540px] m-0">
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
}

interface DerouleProps {
  etapes?: TimelineStep[];
  couleurTexte?: string;
  couleurAccent?: string;
  couleurFondPastille?: string;
  trackColor?: string;
}

export default function Deroule({
  etapes,
  couleurTexte,
  couleurAccent,
  couleurFondPastille,
  trackColor,
}: DerouleProps) {
  const { lang } = useLang();
  const { isReducedMotion } = useDeviceTier();
  const activeEtapes = etapes ?? TIMELINE_STEPS[lang];
  const meta = TIMELINE_META[lang];
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 76%", "end 64%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      aria-label={meta.progressAria}
      className="relative w-full [--node:44px] md:[--node:56px]"
    >
      <div
        aria-hidden="true"
        className="absolute left-[calc(var(--node)/2-1px)] top-[calc(var(--node)/2)] bottom-[calc(var(--node)/2)] w-[2px] rounded-[2px] bg-ink/[0.16] dark:bg-cream/[0.18]"
        style={trackColor ? { background: trackColor } : undefined}
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-[calc(var(--node)/2-1px)] top-[calc(var(--node)/2)] bottom-[calc(var(--node)/2)] w-[2px] rounded-[2px] bg-ink dark:bg-butter origin-top"
        style={{
          scaleY: isReducedMotion ? 1 : progress,
          ...(couleurAccent ? { background: couleurAccent } : {}),
        }}
      />

      <div className="relative flex flex-col gap-10 md:gap-[68px]">
        {activeEtapes.map((item, index) => (
          <StepItem
            key={`${item.num}-${index}`}
            item={item}
            index={index}
            total={activeEtapes.length}
            progress={progress}
            stepPrefix={meta.stepPrefix}
            isReducedMotion={isReducedMotion}
            couleurTexte={couleurTexte}
            couleurAccent={couleurAccent}
            couleurFondPastille={couleurFondPastille}
            trackColor={trackColor}
          />
        ))}
      </div>
    </div>
  );
}
