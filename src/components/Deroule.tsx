"use client";

import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export interface TimelineStep {
  num: string;
  tag: string;
  titre: string;
  desc: string;
}

const NODE = 56;
const HALF = NODE / 2;

const DEFAULT_ETAPES: TimelineStep[] = [
  {
    num: "01",
    tag: "Ref & Quote",
    titre: "Review your ref sheet",
    desc: "Send your character turnaround and part list. We confirm fur colors, features, and your exact quote.",
  },
  {
    num: "02",
    tag: "Sizing",
    titre: "Head measurements or DTD",
    desc: "Share your head circumference for partials, or mail in your duct tape dummy so the bodysuit fits right.",
  },
  {
    num: "03",
    tag: "Base & Eyes",
    titre: "Base sculpt & eye check",
    desc: "We shape the head base, set the 3D follow-me eyes, and send front and side photos for your approval.",
  },
  {
    num: "04",
    tag: "Fur & Shave",
    titre: "Patterning, sewing & shave",
    desc: "Each marking is taped, sewn, and shaved down cleanly. We check in again with photos before lining.",
  },
  {
    num: "05",
    tag: "Lining & Fit",
    titre: "Interior lining & details",
    desc: "We sew in the cooling liner, pawpads, zippers, and magnetic tongues, then test visibility and airflow.",
  },
  {
    num: "06",
    tag: "Tracked Ship",
    titre: "Final photos & shipping",
    desc: "After final studio photos and a care walkthrough, your suit ships boxed and insured with full tracking.",
  },
];

interface StepItemProps {
  item: TimelineStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  couleurTexte: string;
  couleurAccent: string;
  couleurFondPastille: string;
  trackColor: string;
}

function StepItem({
  item,
  index,
  total,
  progress,
  couleurTexte,
  couleurAccent,
  couleurFondPastille,
  trackColor,
}: StepItemProps) {
  const at = total > 1 ? index / (total - 1) : 0;
  const on = useTransform(progress, [Math.max(0, at - 0.06), at + 0.02], [0, 1]);
  const textOpacity = useTransform(on, [0, 1], [0.28, 1]);
  const textX = useTransform(on, [0, 1], [-10, 0]);
  const dotScale = useTransform(on, [0, 1], [0.6, 1]);
  const displayNum = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${NODE}px 1fr`,
        gap: 28,
        alignItems: "flex-start",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Left 56x56 Circle Node */}
      <div
        style={{
          width: NODE,
          height: NODE,
          borderRadius: 999,
          background: couleurFondPastille,
          border: `1.5px solid ${trackColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
            fontSize: 13,
            color: "rgba(17, 22, 34, 0.55)",
            zIndex: 1,
            userSelect: "none",
          }}
        >
          {item.num.length <= 3 ? item.num : displayNum}
        </span>

        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: couleurAccent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            opacity: on,
            scale: dotScale,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
              fontSize: 13,
              color: couleurFondPastille,
              userSelect: "none",
            }}
          >
            {item.num.length <= 3 ? item.num : displayNum}
          </span>
        </motion.div>
      </div>

      {/* Right Text Block */}
      <motion.div
        style={{
          opacity: textOpacity,
          x: textX,
          paddingTop: 4,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {item.tag && (
          <span
            style={{
              fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(17, 22, 34, 0.62)",
            }}
          >
            [{item.tag}]
          </span>
        )}
        <h3
          className="font-stagheiz"
          style={{
            fontSize: "clamp(24px, 2.5vw, 32px)",
            lineHeight: 1.0,
            letterSpacing: "-0.015em",
            textTransform: "uppercase",
            color: couleurTexte,
            margin: 0,
          }}
        >
          {item.titre}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.55,
            letterSpacing: "-0.01em",
            color: "rgba(17, 22, 34, 0.62)",
            maxWidth: 540,
            margin: 0,
          }}
        >
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
  etapes = DEFAULT_ETAPES,
  couleurTexte = "#111622",
  couleurAccent = "#111622",
  couleurFondPastille = "#F5F8FC",
  trackColor = "rgba(17, 22, 34, 0.16)",
}: DerouleProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Background Rail */}
      <div
        style={{
          position: "absolute",
          left: HALF - 1,
          top: HALF,
          bottom: HALF,
          width: 2,
          background: trackColor,
          borderRadius: 2,
        }}
      />

      {/* Active Filling Line */}
      <motion.div
        style={{
          position: "absolute",
          left: HALF - 1,
          top: HALF,
          bottom: HALF,
          width: 2,
          background: couleurAccent,
          borderRadius: 2,
          transformOrigin: "top center",
          scaleY: progress,
        }}
      />

      {/* Timeline Steps */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 72,
          position: "relative",
        }}
      >
        {etapes.map((item, index) => (
          <StepItem
            key={`${item.num}-${index}`}
            item={item}
            index={index}
            total={etapes.length}
            progress={progress}
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
