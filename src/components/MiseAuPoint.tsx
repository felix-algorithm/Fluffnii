"use client";

import React, { useEffect, useRef, useState, startTransition } from "react";
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

const EASE = [0.22, 1, 0.36, 1] as const;
const CREME = "#F5F8FC";
const NOIR = "#111622";
const BEURRE = "#FFF0A6";
const MONO = 'var(--font-space-mono), "Space Mono", ui-monospace, monospace';
const SANS = 'var(--font-dm-sans), "DM Sans", system-ui, sans-serif';
const DISPLAY = '"Stagheiz", sans-serif';

const HOLD = 500; // ms of stillness after "It's sharp!" to trigger the shutter
const ZONE = 0.035;
const MARKS = ["0.3 m", "0.5", "0.8", "1.2", "2", "5", "∞"];

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
  image = "/images/bonus-lockers.jpg",
  label = "Bonus · your turn to play",
  title = "BRING IT INTO FOCUS",
  hint = "Move your mouse to focus, then hold still",
  text = "Spot on! Ready to bring your OC into the workshop?",
  button = "Contact",
  link = "/#contact",
  sound = true,
}: MiseAuPointProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(0.63);

  useEffect(() => {
    // Focus sweet spot changes on each visit
    target.current = 0.22 + Math.random() * 0.6;
  }, []);

  // Keep full-viewport viewfinder aligned flush when wheel-scrolling into #bonus
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let lastY = window.scrollY;
    let dir: 1 | -1 | 0 = 0;
    let settleTimer: number | undefined;
    let lastSnapAt = 0;
    let isPointerDown = false;

    const cancelPending = () => {
      if (settleTimer !== undefined) {
        window.clearTimeout(settleTimer);
        settleTimer = undefined;
      }
    };

    const trySettle = () => {
      if (isPointerDown) return;
      const now = performance.now();
      if (now - lastSnapAt < 450) return;

      const r = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      if (vh <= 0) return;

      // Already cleanly locked inside the sticky runway (0..100vh)
      if (r.top <= 2 && r.bottom >= vh - 2) return;

      const edgeThreshold = Math.min(180, vh * 0.22);
      let delta = 0;

      // Entering from above (#faq): trailing section padding left at top
      if (dir > 0 && r.top > 2 && r.top <= edgeThreshold) {
        delta = r.top;
      }
      // Returning from below (#contact): overshot slightly past sticky release
      else if (dir < 0 && r.bottom < vh - 2 && vh - r.bottom <= edgeThreshold) {
        delta = r.bottom - vh;
      }

      if (Math.abs(delta) > 3) {
        lastSnapAt = now;
        const reduced =
          window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
          false;
        window.scrollTo({
          top: Math.max(0, window.scrollY + delta),
          behavior: reduced ? "instant" : "smooth",
        });
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      if (Math.abs(dy) > 0.5) {
        dir = dy > 0 ? 1 : -1;
        lastY = y;
      }
      cancelPending();
      settleTimer = window.setTimeout(trySettle, 140);
    };

    const onPointerDown = () => {
      isPointerDown = true;
      cancelPending();
    };
    const onPointerUp = () => {
      isPointerDown = false;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("blur", onPointerUp);

    return () => {
      cancelPending();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
    };
  }, []);

  const focus = useMotionValue(0.04);
  const smooth = useSpring(focus, { stiffness: 120, damping: 22 });
  const blur = useTransform(
    smooth,
    (f) => `blur(${Math.min(28, Math.abs(f - target.current) * 70)}px)`
  );
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
  const lastMove = useRef(0);

  useMotionValueEvent(smooth, "change", (f) => {
    const ok = Math.abs(f - target.current) < ZONE;
    if (ok !== inZone) startTransition(() => setInZone(ok));
  });

  // Must remain still once sharp: hold bar fills over 500ms, then shutter clicks
  useAnimationFrame((_, delta) => {
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
  });

  // Ignore synthetic zero-delta mousemove events triggered by scrolling
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (sharp) return;
    if (e.pointerType === "mouse" && !e.movementX && !e.movementY) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    lastMove.current = performance.now();
    focus.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
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
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        height: "128vh",
        minHeight: "calc(640px + 28vh)",
        background: NOIR,
      }}
    >
      <div
        ref={ref}
        onPointerMove={(e) => e.pointerType === "mouse" && move(e)}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          minHeight: 640,
          background: NOIR,
          overflow: "hidden",
          color: CREME,
          cursor: sharp ? "default" : "ew-resize",
          touchAction: "pan-y",
          userSelect: "none",
        }}
      >
      {/* Dynamic Blur & Scale Background Photo */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: blur,
          scale,
        }}
      />

      {/* Subtle Darkening Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(17,22,34,0.42) 0%, rgba(17,22,34,0.34) 50%, rgba(17,22,34,0.38) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 4 Outer Viewfinder Corner Brackets */}
      {[
        { left: 32, top: 32, rot: 0 },
        { right: 32, top: 32, rot: 90 },
        { right: 32, bottom: 32, rot: 180 },
        { left: 32, bottom: 32, rot: 270 },
      ].map(({ rot, ...pos }, k) => (
        <span
          key={k}
          style={{
            position: "absolute",
            width: 26,
            height: 26,
            borderTop: `1.5px solid ${CREME}`,
            borderLeft: `1.5px solid ${CREME}`,
            transform: `rotate(${rot}deg)`,
            pointerEvents: "none",
            ...pos,
          }}
        />
      ))}

      {/* Center AF Focus Box */}
      <motion.div
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

      {/* Top Viewfinder Status Bar */}
      <div
        style={{
          position: "absolute",
          left: "clamp(48px, 6vw, 72px)",
          right: "clamp(48px, 6vw, 72px)",
          top: 36,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textShadow: "0 2px 12px rgba(17,22,34,0.5)",
          pointerEvents: "none",
        }}
      >
        <span>[{label}]</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: sharp || inZone ? BEURRE : "rgba(245,248,252,0.4)",
            }}
          />
          {sharp
            ? "AF · click"
            : inZone
            ? "AF · sharp, hold still"
            : "AF · blurry"}
        </span>
      </div>

      {/* Center Title / Hold Progress / Win CTA */}
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
          padding: "0 48px",
          textShadow: "0 2px 18px rgba(17,22,34,0.45)",
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="wait">
          {!sharp ? (
            <motion.div
              key="jeu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                className="font-stagheiz"
                style={{
                  fontFamily: DISPLAY,
                  textTransform: "uppercase",
                  fontSize: "clamp(40px, 6vw, 88px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                  opacity: 0.85,
                }}
              >
                {inZone ? "It's sharp! Hold still…" : hint}
              </div>
              <div
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
                  style={{
                    height: "100%",
                    width: holdW,
                    background: BEURRE,
                  }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gagne"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 22,
                pointerEvents: "auto",
              }}
            >
              <div
                className="font-stagheiz"
                style={{
                  fontFamily: DISPLAY,
                  textTransform: "uppercase",
                  fontSize: "clamp(48px, 7vw, 104px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                }}
              >
                SHARP. EVERY STITCH.
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 20,
                  letterSpacing: "-0.01em",
                }}
              >
                {text}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                <motion.a
                  href={link}
                  whileHover="h"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "17px 24px",
                    borderRadius: 999,
                    background: CREME,
                    color: NOIR,
                    fontFamily: SANS,
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                    textShadow: "none",
                  }}
                >
                  {button}
                  <span
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
                  style={{
                    appearance: "none",
                    cursor: "pointer",
                    padding: "16px 22px",
                    borderRadius: 999,
                    border: `1.5px solid ${CREME}`,
                    background: "transparent",
                    color: CREME,
                    fontFamily: SANS,
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  Play again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Sliding Lens Focus Ring Ruler */}
      <div
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e);
        }}
        onPointerMove={(e) => e.buttons && move(e)}
        style={{
          position: "absolute",
          left: "50%",
          bottom: 56,
          width: "min(560px, 80%)",
          transform: "translateX(-50%)",
          height: 54,
          borderRadius: 99,
          background: "rgba(17,22,34,0.45)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          overflow: "hidden",
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <motion.div
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
                style={{
                  width: 1.5,
                  height: i % 10 === 0 ? 14 : 7,
                  background: CREME,
                  opacity: i % 10 === 0 ? 1 : 0.5,
                }}
              />
              {i % 10 === 0 && (
                <span style={{ fontFamily: MONO, fontSize: 10 }}>
                  {MARKS[i / 10]}
                </span>
              )}
            </div>
          ))}
        </motion.div>
        {/* Fixed Center Needle */}
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: 6,
            bottom: 6,
            width: 2,
            marginLeft: -1,
            background: BEURRE,
            borderRadius: 2,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Camera Flash Effect */}
      <AnimatePresence>
        {flash > 0 && sharp && (
          <motion.div
            key={flash}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#fff",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
