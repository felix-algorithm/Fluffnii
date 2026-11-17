"use client";

import React, { useRef, useState, useMemo, useEffect, startTransition } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useLang } from "./LanguageProvider";

const DEFAULT_ITEMS = [
  {
    mot: "Aura Farming",
    src: "/images/why-01.jpg",
  },
  {
    mot: "No Homo",
    src: "/images/why-02.jpg",
  },
  {
    mot: "Silly Cat",
    src: "/images/why-03.jpg",
  },
  {
    mot: "Vicious Dog",
    src: "/images/why-04.jpg",
  },
];

function MotAnime({ mot }: { mot: string }) {
  const chars = useMemo(() => Array.from(mot), [mot]);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0.08em 0.04em",
      }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
          }}
        >
          <motion.span
            variants={{
              initial: { y: "110%", rotate: 6, opacity: 0 },
              animate: {
                y: "0%",
                rotate: 0,
                opacity: 1,
                transition: {
                  duration: 0.55,
                  delay: i * 0.022,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
              exit: {
                y: "-110%",
                rotate: -4,
                opacity: 0,
                transition: {
                  duration: 0.38,
                  delay: i * 0.014,
                  ease: [0.65, 0, 0.35, 1],
                },
              },
            }}
            style={{
              display: "inline-block",
              whiteSpace: c === " " ? "pre" : "normal",
              willChange: "transform, opacity",
            }}
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

interface MotDefilantProps {
  surTitre?: string;
  prefixe?: string;
  items?: { mot: string; src: string }[];
  voile?: number;
}

export default function MotDefilant({
  surTitre,
  prefixe,
  items,
  voile = 0.42,
}: MotDefilantProps) {
  const { lang } = useLang();
  const activeSurTitre = surTitre ?? (lang === "vi" ? "[Vì sao chọn FluffNii]" : "[Why a FluffNii suit]");
  const activePrefixe = prefixe ?? (lang === "vi" ? "Một bộ fursuit" : "A great fursuit");
  const activeItems = items ?? DEFAULT_ITEMS;
  const n = activeItems.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ actif, sortant }, setStep] = useState({ actif: 0, sortant: -1 });
  const lastIdxRef = useRef(0);
  const sortantTimerRef = useRef<number | undefined>(undefined);
  const preloadedImgsRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const imgs = activeItems.map((item) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = item.src;
      if (typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
      return img;
    });
    preloadedImgsRef.current = imgs;
    return () => {
      preloadedImgsRef.current = [];
    };
  }, [activeItems]);

  useEffect(() => {
    return () => {
      if (sortantTimerRef.current !== undefined) {
        window.clearTimeout(sortantTimerRef.current);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (n <= 0) return;
    const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    if (idx === lastIdxRef.current) return;
    const prevIdx = lastIdxRef.current;
    lastIdxRef.current = idx;

    if (sortantTimerRef.current !== undefined) {
      window.clearTimeout(sortantTimerRef.current);
    }

    startTransition(() => {
      setStep({ actif: idx, sortant: prevIdx });
    });

    sortantTimerRef.current = window.setTimeout(() => {
      startTransition(() => {
        setStep((cur) =>
          cur.sortant === prevIdx ? { ...cur, sortant: -1 } : cur
        );
      });
    }, 850);
  });

  const barreScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "320vh",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "#111622",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(24px, 4vw, 48px)",
          boxSizing: "border-box",
          color: "#F5F8FC",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {activeItems.map((item, i) => {
            const isActif = i === actif;
            const isSortant = i === sortant;
            const animateState = isActif
              ? { opacity: 1, scale: 1 }
              : isSortant
              ? { opacity: 0, scale: 0.97 }
              : { opacity: 0, scale: 1.08 };
            const transitionSpec =
              isActif || isSortant
                ? { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const }
                : { duration: 0 };

            return (
              <motion.img
                key={item.src + i}
                src={item.src}
                alt={item.mot || ""}
                loading="eager"
                decoding="async"
                initial={
                  i === 0
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 1.08 }
                }
                animate={animateState}
                transition={transitionSpec}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: isActif ? 2 : isSortant ? 1 : 0,
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  pointerEvents: "none",
                }}
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              background: `
                radial-gradient(ellipse at center, rgba(17,22,34,${
                  voile * 0.75
                }) 0%, rgba(17,22,34,${Math.min(0.92, voile + 0.28)}) 100%)
              `,
            }}
          />
        </div>

        {(["tl", "tr", "bl", "br"] as const).map((pos) => (
          <div
            key={pos}
            style={{
              position: "absolute",
              zIndex: 2,
              width: 22,
              height: 22,
              borderColor: "rgba(245,248,252,0.55)",
              borderStyle: "solid",
              borderWidth: 0,
              ...(pos === "tl"
                ? {
                    top: 24,
                    left: 24,
                    borderTopWidth: 1.5,
                    borderLeftWidth: 1.5,
                  }
                : pos === "tr"
                ? {
                    top: 24,
                    right: 24,
                    borderTopWidth: 1.5,
                    borderRightWidth: 1.5,
                  }
                : pos === "bl"
                ? {
                    bottom: 24,
                    left: 24,
                    borderBottomWidth: 1.5,
                    borderLeftWidth: 1.5,
                  }
                : {
                    bottom: 24,
                    right: 24,
                    borderBottomWidth: 1.5,
                    borderRightWidth: 1.5,
                  }),
            }}
          />
        ))}

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
            fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(245,248,252,0.78)",
          }}
        >
          <span>{activeSurTitre}</span>
          <span>
            ({String(actif + 1).padStart(3, "0")} /{" "}
            {String(n).padStart(3, "0")})
          </span>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 12,
            margin: "auto 0",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-dm-sans), 'Plus Jakarta Sans', 'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(18px, 2.2vw, 28px)",
              letterSpacing: "-0.02em",
              color: "rgba(245,248,252,0.85)",
            }}
          >
            {activePrefixe}
          </div>

          <div
            className="font-stagheiz"
            style={{
              fontFamily: '"Stagheiz", sans-serif',
              position: "relative",
              minHeight: "1.12em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(44px, 8.8vw, 128px)",
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              color: "#FFF0A6",
            }}
          >
            <AnimatePresence mode="wait">
              <MotAnime key={actif} mot={activeItems[actif]?.mot || ""} />
            </AnimatePresence>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "0 12px 4px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {activeItems.map((it, i) => {
              const estActif = i === actif;
              return (
                <div
                  key={i}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: `1px solid ${
                      estActif ? "#FFF0A6" : "rgba(245,248,252,0.22)"
                    }`,
                    background: estActif
                      ? "rgba(255,240,166,0.14)"
                      : "rgba(17,22,34,0.35)",
                    backdropFilter: "blur(8px)",
                    fontFamily:
                      "var(--font-space-mono), 'Space Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: estActif ? "#FFF0A6" : "rgba(245,248,252,0.6)",
                    transition:
                      "border-color 0.35s ease, background-color 0.35s ease, color 0.35s ease",
                  }}
                >
                  0{i + 1} · {it.mot}
                </div>
              );
            })}
          </div>

          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(245,248,252,0.18)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                background: "#FFF0A6",
                transformOrigin: "left center",
                scaleX: barreScale,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
