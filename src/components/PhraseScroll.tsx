"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

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
}

function Mot({ mot, index, total, progress, couleurSurlignage }: MotProps) {
  const debut = (index / total) * 0.85;
  const fin = debut + (1 / total) * 1.4;
  const opacity = useTransform(progress, [debut, Math.min(1, fin)], [0.14, 1]);
  const scaleX = useTransform(progress, [debut, Math.min(1, fin)], [0, 1]);

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
      {mot}
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
  couleurTexte = "#111622",
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
      style={{
        width: "100%",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: `clamp(${minPx}px, 4.2vw, ${tailleMax}px)`,
        lineHeight: 1.12,
        letterSpacing: "-0.035em",
        color: couleurTexte,
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
          />
        );
      })}
    </div>
  );
}
