"use client";

import React, { useEffect, useRef, useState, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useAnimationFrame,
} from "framer-motion";
import { playShutterSound } from "./Obturateur";
import { useLang } from "./LanguageProvider";
import {
  extractHomeSection,
  isModifiedClick,
  navigateToHomeSection,
} from "@/lib/sectionScroll";

const EASE = [0.22, 1, 0.36, 1] as const;
const BEURRE = "#fff0a6";

const HOLD = 500;
const ZONE = 0.035;
const MARKS = ["0.3 m", "0.5", "0.8", "1.2", "2", "5", "∞"];

interface FocusHoldLoopProps {
  onTick: (delta: number) => void;
}

function FocusHoldLoop({ onTick }: FocusHoldLoopProps) {
  useAnimationFrame((_, delta) => {
    onTick(delta);
  });
  return null;
}

interface MiseAuPointProps {
  image?: string;
  label?: string;
  title?: string;
  hint?: string;
  text?: string;
  button?: string;
  link?: string;
  sound?: boolean;
}

export default function MiseAuPoint({
  image = "/images/bonus-lockers.webp",
  label,
  title,
  hint,
  text,
  button,
  link = "/#contact",
  sound = true,
}: MiseAuPointProps) {
  const { lang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const linkSection = extractHomeSection(link);
  const resolvedHref = linkSection ? "/" : link;
  const activeLabel =
    label ?? (lang === "vi" ? "Thử thách · đến lượt bạn" : "Bonus · your turn to play");
  const activeTitle =
    title ?? (lang === "vi" ? "LẤY NÉT CHO CHUẨN" : "BRING IT INTO FOCUS");
  const activeHint =
    hint ??
    (lang === "vi"
      ? "Rê chuột hoặc kéo để lấy nét, rồi giữ yên"
      : "Drag or move cursor to focus, then hold still");
  const activeText =
    text ??
    (lang === "vi"
      ? "Chuẩn nét rồi! Sẵn sàng đưa OC của bạn vào xưởng chưa?"
      : "Spot on! Ready to bring your OC into the workshop?");
  const activeButton = button ?? (lang === "vi" ? "Liên hệ" : "Contact");

  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(0.63);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    target.current = 0.22 + Math.random() * 0.6;
  }, []);

  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq) {
      setReducedMotion(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener?.("change", onChange);
      return () => mq.removeEventListener?.("change", onChange);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setTabVisible(!document.hidden);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const focus = useMotionValue(0.04);
  const smooth = useSpring(focus, { stiffness: 120, damping: 22 });
  const blurOpacity = useTransform(smooth, (f) => {
    const d = Math.abs(f - target.current);
    if (d <= ZONE) return 0;
    return Math.min(1, (d - ZONE) * 3.4);
  });
  const scale = useTransform(
    smooth,
    (f) => 1.06 - Math.max(0, 0.06 - Math.abs(f - target.current) * 0.2)
  );
  const ringX = useTransform(smooth, (f) => `${-f * 100}%`);
  const hold = useMotionValue(0);
  const holdW = useTransform(hold, (h) => `${h * 100}%`);

  const [sharp, setSharp] = useState(false);
  const [inZone, setInZone] = useState(false);
  const [flash, setFlash] = useState(0);
  const [focusPercent, setFocusPercent] = useState(4);
  const lastMove = useRef(0);

  useMotionValueEvent(focus, "change", (v) => {
    const pct = Math.round(v * 100);
    if (pct !== focusPercent) setFocusPercent(pct);
  });

  useMotionValueEvent(smooth, "change", (f) => {
    const ok = Math.abs(f - target.current) < ZONE;
    if (ok !== inZone) startTransition(() => setInZone(ok));
  });

  const handleTick = (delta: number) => {
    if (sharp) return;
    const still = performance.now() - lastMove.current > 120;
    const ok = Math.abs(smooth.get() - target.current) < ZONE;
    if (ok && still) {
      const h = Math.min(1, hold.get() + delta / HOLD);
      hold.set(h);
      if (h >= 1) {
        if (sound) playShutterSound();
        startTransition(() => {
          setSharp(true);
          setFlash((n) => n + 1);
        });
      }
    } else if (hold.get() > 0) {
      hold.set(Math.max(0, hold.get() - delta / 300));
    }
  };

  const moveClientX = (clientX: number) => {
    if (sharp) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r || r.width <= 0) return;
    lastMove.current = performance.now();
    focus.set(Math.max(0, Math.min(1, (clientX - r.left) / r.width)));
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (sharp) return;
    if (e.pointerType === "mouse" && !e.movementX && !e.movementY) return;
    moveClientX(e.clientX);
  };

  const handleSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (sharp) return;
    const step = e.shiftKey ? 0.06 : 0.025;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      next = Math.max(0, focus.get() - step);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      next = Math.min(1, focus.get() + step);
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = 1;
    }
    if (next === null) return;
    e.preventDefault();
    lastMove.current = performance.now();
    focus.set(next);
  };

  const replay = () => {
    let nextTarget = 0.22 + Math.random() * 0.6;
    if (Math.abs(nextTarget - focus.get()) < 0.2) {
      nextTarget = ((nextTarget + 0.45) % 0.6) + 0.22;
    }
    target.current = nextTarget;
    hold.set(0);
    setSharp(false);
    setInZone(false);
    focus.set(0.04);
  };

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" || e.buttons > 0) {
          move(e);
        }
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (!t) return;
        touchStartRef.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (!t || !touchStartRef.current) return;
        const dx = t.clientX - touchStartRef.current.x;
        const dy = t.clientY - touchStartRef.current.y;
        if (Math.abs(dx) > 4 && Math.abs(dx) >= Math.abs(dy) * 0.7) {
          moveClientX(t.clientX);
        }
      }}
      onTouchEnd={() => {
        touchStartRef.current = null;
      }}
      className="relative w-full h-[100svh] min-h-[600px] bg-ink overflow-hidden text-cream select-none"
      style={{
        cursor: sharp ? "default" : "ew-resize",
        touchAction: "pan-y",
      }}
    >
      {inView && tabVisible && !sharp && <FocusHoldLoop onTick={handleTick} />}

      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          scale: reducedMotion ? 1 : scale,
        }}
      >
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={1024}
          height={576}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
          }}
        />
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: sharp ? 0 : blurOpacity,
            pointerEvents: "none",
          }}
        >
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={1024}
            height={576}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "blur(18px)",
              transform: "scale(1.08)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(17,22,34,0.42) 0%, rgba(17,22,34,0.34) 50%, rgba(17,22,34,0.38) 100%)",
          pointerEvents: "none",
        }}
      />

      <span
        aria-hidden="true"
        className="hidden sm:block absolute left-8 top-[88px] lg:top-[112px] w-[26px] h-[26px] border-t-[1.5px] border-l-[1.5px] border-cream pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="hidden sm:block absolute right-8 top-[88px] lg:top-[112px] w-[26px] h-[26px] border-t-[1.5px] border-r-[1.5px] border-cream pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="hidden sm:block absolute left-8 bottom-8 w-[26px] h-[26px] border-b-[1.5px] border-l-[1.5px] border-cream pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="hidden sm:block absolute right-8 bottom-8 w-[26px] h-[26px] border-b-[1.5px] border-r-[1.5px] border-cream pointer-events-none"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          borderColor: sharp || inZone ? BEURRE : "rgba(245,248,252,0.8)",
          scale: sharp ? 0.8 : inZone ? 0.9 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 120,
          height: 84,
          marginLeft: -60,
          marginTop: -42,
          border: "1.5px solid",
          borderRadius: 6,
          pointerEvents: "none",
        }}
      />

      <div
        className="absolute left-6 right-6 sm:left-16 sm:right-16 top-24 lg:top-28 flex justify-between items-center gap-3 flex-wrap pointer-events-none font-mono text-xs tracking-eyebrow uppercase"
        style={{
          textShadow: "0 2px 12px rgba(17,22,34,0.5)",
        }}
      >
        <span>[{activeLabel}]</span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={
              sharp || inZone
                ? "w-2 h-2 rounded-full bg-butter"
                : "w-2 h-2 rounded-full bg-cream/40"
            }
          />
          {sharp
            ? lang === "vi"
              ? "AF · tách"
              : "AF · click"
            : inZone
            ? lang === "vi"
              ? "AF · nét rồi, giữ yên"
              : "AF · sharp, hold still"
            : lang === "vi"
            ? "AF · đang mờ"
            : "AF · blurry"}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          textAlign: "center",
          padding: "0 32px",
          textShadow: "0 2px 18px rgba(17,22,34,0.45)",
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="wait">
          {!sharp ? (
            <motion.div
              key="jeu"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
              transition={{ duration: reducedMotion ? 0.15 : 0.5, ease: EASE }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div className="font-stagheiz text-[clamp(34px,5.4vw,82px)] leading-[1.04] tracking-[-0.03em] vi:leading-[1.14] vi:tracking-[-0.02em]">
                {activeTitle}
              </div>
              <div className="font-sans text-[18px] tracking-[-0.01em] opacity-90">
                {inZone
                  ? lang === "vi"
                    ? "Nét rồi! Giữ yên…"
                    : "It's sharp! Hold still…"
                  : activeHint}
              </div>
              <div
                aria-hidden="true"
                style={{
                  width: 220,
                  height: 3,
                  borderRadius: 3,
                  background: "rgba(245,248,252,0.25)",
                  overflow: "hidden",
                  opacity: inZone ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              >
                <motion.div
                  className="h-full bg-butter"
                  style={{
                    width: holdW,
                  }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gagne"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0.15 : 0.6,
                ease: EASE,
                delay: reducedMotion ? 0 : 0.35,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 22,
                pointerEvents: "auto",
              }}
            >
              <div className="font-stagheiz text-[clamp(48px,7vw,104px)] leading-[0.92] tracking-[-0.04em] vi:text-[clamp(34px,5.4vw,82px)] vi:leading-[1.14] vi:tracking-[-0.02em]">
                {lang === "vi" ? "SẮC NÉT TỪNG ĐƯỜNG MAY." : "SHARP. EVERY STITCH."}
              </div>
              <div className="font-sans text-[20px] tracking-[-0.01em]">
                {activeText}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <motion.a
                  href={resolvedHref}
                  onClick={(e) => {
                    if (linkSection && !isModifiedClick(e)) {
                      e.preventDefault();
                      navigateToHomeSection(linkSection, pathname, router);
                    }
                  }}
                  whileHover="h"
                  className="inline-flex items-center gap-3 px-6 py-[17px] rounded-full bg-cream text-ink font-sans font-semibold text-[15px] no-underline [text-shadow:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {activeButton}
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      width: 18,
                      overflow: "hidden",
                    }}
                  >
                    <motion.span
                      variants={{ h: { x: [0, 22, -22, 0] } }}
                      transition={{
                        duration: 0.6,
                        times: [0, 0.45, 0.46, 1],
                        ease: "easeInOut",
                      }}
                      style={{ display: "inline-flex" }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </motion.span>
                  </span>
                </motion.a>
                <button
                  type="button"
                  onClick={replay}
                  className="appearance-none cursor-pointer px-[22px] py-4 rounded-full border-[1.5px] border-cream bg-transparent text-cream font-sans font-semibold text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {lang === "vi" ? "Chơi lại" : "Play again"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label={
          lang === "vi" ? "Thanh chỉnh lấy nét" : "Focus distance slider"
        }
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={focusPercent}
        onKeyDown={handleSliderKeyDown}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          moveClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons > 0 || e.pointerType !== "mouse") {
            moveClientX(e.clientX);
          }
        }}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 44,
          width: "min(560px, 84%)",
          transform: "translateX(-50%)",
          height: 54,
          borderRadius: 99,
          background: "rgba(17,22,34,0.52)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          overflow: "hidden",
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "200%",
            x: ringX,
            display: "flex",
            alignItems: "center",
          }}
        >
          {Array.from({ length: 61 }, (_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                className={
                  i % 10 === 0
                    ? "w-[1.5px] h-3.5 bg-cream opacity-100"
                    : "w-[1.5px] h-[7px] bg-cream opacity-50"
                }
              />
              {i % 10 === 0 && (
                <span className="font-mono text-[10px]">{MARKS[i / 10]}</span>
              )}
            </div>
          ))}
        </motion.div>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1.5 bottom-1.5 w-0.5 -ml-[1px] bg-butter rounded-[2px] pointer-events-none"
        />
      </div>

      {!reducedMotion && (
        <AnimatePresence>
          {flash > 0 && sharp && (
            <motion.div
              key={flash}
              aria-hidden="true"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
