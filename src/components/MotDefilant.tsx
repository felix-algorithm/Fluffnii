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
    src: "/images/why-01.webp",
  },
  {
    mot: "No Homo",
    src: "/images/why-02.webp",
  },
  {
    mot: "Silly Cat",
    src: "/images/why-03.webp",
  },
  {
    mot: "Vicious Dog",
    src: "/images/why-04.webp",
  },
];

function MotAnime({ mot, reducedMotion }: { mot: string; reducedMotion: boolean }) {
  const chars = useMemo(() => Array.from(mot), [mot]);
  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0.08em 0.04em",
        }}
      >
        {mot}
      </motion.div>
    );
  }
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
  const activeSurTitre =
    surTitre ?? (lang === "vi" ? "[Vì sao chọn FluffNii]" : "[Why a FluffNii suit]");
  const activePrefixe =
    prefixe ?? (lang === "vi" ? "Một bộ fursuit" : "A great fursuit");
  const activeItems = items ?? DEFAULT_ITEMS;
  const n = activeItems.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ actif, sortant }, setStep] = useState({ actif: 0, sortant: -1 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const lastIdxRef = useRef(0);
  const sortantTimerRef = useRef<number | undefined>(undefined);
  const preloadedImgsRef = useRef<HTMLImageElement[]>([]);
  const preloadedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    preloadedRef.current = false;
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const triggerPreload = () => {
      if (preloadedRef.current) return;
      preloadedRef.current = true;
      preloadedImgsRef.current = activeItems.map((item) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = item.src;
        if (typeof img.decode === "function") {
          img.decode().catch(() => {});
        }
        return img;
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      triggerPreload();
      return () => {
        preloadedImgsRef.current = [];
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          triggerPreload();
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
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
    <div ref={containerRef} className="relative w-full h-[240vh]">
      <div
        className="sticky top-0 w-full h-[100svh] overflow-hidden bg-[#111622] flex flex-col justify-between px-5 sm:px-8 lg:px-12 pt-[92px] sm:pt-[100px] lg:pt-[118px] pb-6 sm:pb-8 lg:pb-12 box-border text-[#F5F8FC]"
      >
        <div aria-hidden="true" className="absolute inset-0 z-0">
          {activeItems.map((item, i) => {
            const isActif = i === actif;
            const isSortant = i === sortant;
            const animateState = isActif
              ? { opacity: 1, scale: 1 }
              : isSortant
              ? { opacity: 0, scale: reducedMotion ? 1 : 0.97 }
              : { opacity: 0, scale: reducedMotion ? 1 : 1.08 };
            const transitionSpec =
              isActif || isSortant
                ? {
                    duration: reducedMotion ? 0.2 : 0.85,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }
                : { duration: 0 };

            return (
              <motion.img
                key={item.src + i}
                src={item.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                initial={
                  i === 0
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: reducedMotion ? 1 : 1.08 }
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

        <span
          aria-hidden="true"
          className="hidden sm:block absolute left-6 top-[92px] lg:top-[116px] z-[2] w-[22px] h-[22px] border-t-[1.5px] border-l-[1.5px] border-[#F5F8FC]/55 pointer-events-none"
        />
        <span
          aria-hidden="true"
          className="hidden sm:block absolute right-6 top-[92px] lg:top-[116px] z-[2] w-[22px] h-[22px] border-t-[1.5px] border-r-[1.5px] border-[#F5F8FC]/55 pointer-events-none"
        />
        <span
          aria-hidden="true"
          className="hidden sm:block absolute left-6 bottom-6 z-[2] w-[22px] h-[22px] border-b-[1.5px] border-l-[1.5px] border-[#F5F8FC]/55 pointer-events-none"
        />
        <span
          aria-hidden="true"
          className="hidden sm:block absolute right-6 bottom-6 z-[2] w-[22px] h-[22px] border-b-[1.5px] border-r-[1.5px] border-[#F5F8FC]/55 pointer-events-none"
        />

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
            color: "rgba(245,248,252,0.84)",
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
              fontFamily:
                "var(--font-dm-sans), 'Plus Jakarta Sans', 'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(18px, 2.2vw, 28px)",
              letterSpacing: "-0.02em",
              color: "rgba(245,248,252,0.88)",
            }}
          >
            {activePrefixe}
          </div>

          <div
            className="font-stagheiz"
            style={{
              position: "relative",
              minHeight: "1.14em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(44px, 8.8vw, 128px)",
              lineHeight: lang === "vi" ? 1.14 : 0.96,
              letterSpacing: lang === "vi" ? "-0.02em" : "-0.04em",
              color: "#FFF0A6",
            }}
          >
            <AnimatePresence mode="wait">
              <MotAnime
                key={actif}
                mot={activeItems[actif]?.mot || ""}
                reducedMotion={reducedMotion}
              />
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
                      estActif ? "#FFF0A6" : "rgba(245,248,252,0.28)"
                    }`,
                    background: estActif
                      ? "rgba(255,240,166,0.14)"
                      : "rgba(17,22,34,0.45)",
                    backdropFilter: "blur(8px)",
                    fontFamily:
                      "var(--font-space-mono), 'Space Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: estActif ? "#FFF0A6" : "rgba(245,248,252,0.75)",
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
            aria-hidden="true"
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
