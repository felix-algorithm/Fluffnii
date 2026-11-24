"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function isLightHighlight(color: string | null): boolean {
  if (!color) return false;
  const c = color.trim().toLowerCase();
  if (c === "#dce8f5" || c === "#fff0a6" || c === "#f5f8fc" || c === "#ffffff") {
    return true;
  }
  const hex = c.replace(/^#/, "");
  if (/^[0-9a-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 >= 150;
  }
  return true;
}

function norm(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;:!?'"’«»()]/g, "")
    .trim();
}

function trouverPlages(mots: string[], ciblesStr: string): Set<number> {
  const indices = new Set<number>();
  if (!ciblesStr) return indices;
  const groupes = ciblesStr
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);
  const motsNorm = mots.map(norm);

  for (const g of groupes) {
    const tokens = g.split(/\s+/).map(norm).filter(Boolean);
    if (!tokens.length) continue;
    for (let i = 0; i <= motsNorm.length - tokens.length; i++) {
      let ok = true;
      for (let k = 0; k < tokens.length; k++) {
        if (motsNorm[i + k] !== tokens[k]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        for (let k = 0; k < tokens.length; k++) indices.add(i + k);
      }
    }
  }
  return indices;
}

interface MotProps {
  mot: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  couleurSurlignage: string | null;
  couleurTexte?: string;
}

function Mot({
  mot,
  index,
  total,
  progress,
  couleurSurlignage,
  couleurTexte,
}: MotProps) {
  const debut = (index / total) * 0.85;
  const fin = debut + (1 / total) * 1.4;
  const clampedEnd = Math.min(1, fin);
  const opacity = useTransform(progress, [debut, clampedEnd], [0.14, 1]);
  const scaleX = useTransform(progress, [debut, clampedEnd], [0, 1]);
  const revealMix = useTransform(progress, [debut, clampedEnd], [0, 1]);
  const baseFade = useTransform(progress, [debut, clampedEnd], [1, 0]);
  const hasLightHighlight = isLightHighlight(couleurSurlignage);

  return (
    <motion.span
      style={{
        opacity,
        position: "relative",
        display: "inline-block",
        marginRight: "0.26em",
        padding: couleurSurlignage ? "0.02em 0.18em" : 0,
        borderRadius: 6,
      }}
    >
      {couleurSurlignage && (
        <motion.span
          style={{
            position: "absolute",
            inset: "0.06em -0.04em",
            background: couleurSurlignage,
            borderRadius: 6,
            transformOrigin: "left center",
            scaleX,
            zIndex: -1,
          }}
        />
      )}
      {hasLightHighlight ? (
        <>
          <span className="text-ink dark:hidden">{mot}</span>
          <span className="relative hidden dark:inline-block">
            <motion.span
              className={couleurTexte ? undefined : "text-ink dark:text-cream"}
              style={{
                opacity: baseFade,
                ...(couleurTexte ? { color: couleurTexte } : {}),
              }}
            >
              {mot}
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 text-ink"
              style={{ opacity: revealMix }}
            >
              {mot}
            </motion.span>
          </span>
        </>
      ) : (
        <span>{mot}</span>
      )}
    </motion.span>
  );
}

interface PhraseScrollProps {
  texte?: string;
  surlignes1?: string;
  couleur1?: string;
  surlignes2?: string;
  couleur2?: string;
  alignement?: "left" | "center";
  couleurTexte?: string;
  tailleMax?: number;
}

export default function PhraseScroll({
  texte = "Here, we don't just take photos, we craft visual identities that captivate your audience and turn your products into objects of desire.",
  surlignes1 = "visual identities",
  couleur1 = "#DCE8F5",
  surlignes2 = "objects of desire",
  couleur2 = "#FFF0A6",
  alignement = "left",
  couleurTexte,
  tailleMax = 52,
}: PhraseScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.42"],
  });

  const mots = useMemo(() => (texte || "").split(/\s+/).filter(Boolean), [texte]);
  const set1 = useMemo(() => trouverPlages(mots, surlignes1), [mots, surlignes1]);
  const set2 = useMemo(() => trouverPlages(mots, surlignes2), [mots, surlignes2]);

  const minPx = Math.max(28, Math.round(tailleMax * 0.54));

  return (
    <div
      ref={ref}
      className={couleurTexte ? undefined : "text-fg"}
      style={{
        width: "100%",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: `clamp(${minPx}px, 4.2vw, ${tailleMax}px)`,
        lineHeight: 1.12,
        letterSpacing: "-0.035em",
        ...(couleurTexte ? { color: couleurTexte } : {}),
        textAlign: alignement,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: alignement === "center" ? "center" : "flex-start",
        isolation: "isolate",
      }}
    >
      {mots.map((mot, i) => {
        const c = set2.has(i) ? couleur2 : set1.has(i) ? couleur1 : null;
        return (
          <Mot
            key={i}
            mot={mot}
            index={i}
            total={mots.length}
            progress={scrollYProgress}
            couleurSurlignage={c}
            couleurTexte={couleurTexte}
          />
        );
      })}
    </div>
  );
}
