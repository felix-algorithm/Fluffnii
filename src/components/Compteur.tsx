"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface CompteurProps {
  valeur?: number;
  prefixe?: string;
  suffixe?: string;
  duree?: number;
  couleur?: string;
  taille?: number;
}

export default function Compteur({
  valeur = 5000,
  prefixe = "+",
  suffixe = "",
  duree = 1.8,
  couleur,
  taille = 72,
}: CompteurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [affiche, setAffiche] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, valeur, {
      duration: duree,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setAffiche(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, valeur, duree]);

  return (
    <div
      ref={ref}
      className="font-sans font-medium select-none text-fg"
      style={{
        fontSize: `clamp(${Math.max(48, Math.round(taille * 0.67))}px, 5.2vw, ${taille}px)`,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        ...(couleur ? { color: couleur } : {}),
        fontVariantNumeric: "tabular-nums lining-nums",
      }}
    >
      {prefixe}
      {affiche}
      {suffixe}
    </div>
  );
}
