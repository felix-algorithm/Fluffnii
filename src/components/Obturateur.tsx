"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageProvider";

declare global {
  interface Window {
    __gioiaClic?: boolean;
    webkitAudioContext?: typeof AudioContext;
  }
}

const INTRO_SEEN_KEY = "fluffnii-intro-seen";
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === "suspended") {
      void sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

export function playShutterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const click = (t: number, freq: number, dur: number, gainPeak: number) => {
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const env = Math.pow(1 - i / bufferSize, 2.4);
        data[i] = (Math.random() * 2 - 1) * env;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = freq;
      filter.Q.value = 1.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(gainPeak, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(t);
      noise.stop(t + dur);
    };

    click(now, 1800, 0.028, 0.35);
    click(now + 0.055, 1200, 0.04, 0.28);
  } catch {
  }
}

interface ObturateurProps {
  duree?: number;
  couleurFond?: string;
  couleurEncre?: string;
  couleurAccent?: string;
  label?: string;
  reglages?: string;
  sousTitreDroite?: string;
  onComplete?: () => void;
}

const CORNERS = [
  { top: 0, left: 0, rotate: 0 },
  { top: 0, right: 0, rotate: 90 },
  { bottom: 0, right: 0, rotate: 180 },
  { bottom: 0, left: 0, rotate: 270 },
] as const;

export default function Obturateur({
  duree = 650,
  couleurFond = "#F5F8FC",
  couleurEncre = "#111622",
  couleurAccent = "#1E3557",
  label = "FluffNii Studio",
  reglages = "ISO 100 · f/8 · 1/125",
  sousTitreDroite,
  onComplete,
}: ObturateurProps) {
  const { lang } = useLang();
  const activeSubtitle =
    sousTitreDroite ??
    (lang === "vi" ? "Từ bản vẽ thành fursuit" : "From sketch to fursuit");
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [skipped, setSkipped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    setReducedMotion(prefersReduced);

    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    const hasHash = Boolean(window.location.hash);

    if (alreadySeen || hasHash || prefersReduced) {
      setSkipped(true);
      setPhase(3);
      window.__gioiaClic = true;
      window.dispatchEvent(new CustomEvent("gioia:clic"));
      onCompleteRef.current?.();
      return;
    }

    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
    }

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    window.__gioiaClic = false;

    const t1 = window.setTimeout(() => {
      setPhase(1);
    }, duree);

    const t2 = window.setTimeout(() => {
      setPhase(2);
    }, duree + 180);

    const t3 = window.setTimeout(() => {
      setPhase(3);
      html.style.overflow = prevOverflow;
      window.__gioiaClic = true;
      window.dispatchEvent(new CustomEvent("gioia:clic"));
      onCompleteRef.current?.();
    }, duree + 450);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      html.style.overflow = prevOverflow;
    };
  }, [duree]);

  if (skipped) return null;

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="obturateur"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: couleurFond,
            color: couleurEncre,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
            userSelect: "none",
            pointerEvents: phase >= 2 ? "none" : "auto",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ scale: 1.25, opacity: 0 }}
            animate={
              phase === 0
                ? { scale: [1.25, 0.96, 1.02, 1], opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: 0.58,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.55, 0.8, 1],
            }}
            style={{
              position: "relative",
              width: "min(46vw, 520px)",
              aspectRatio: "3 / 2",
            }}
          >
            {CORNERS.map((corner, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 52,
                  height: 52,
                  borderTop: `5px solid ${couleurEncre}`,
                  borderLeft: `5px solid ${couleurEncre}`,
                  top: "top" in corner ? corner.top : "auto",
                  bottom: "bottom" in corner ? corner.bottom : "auto",
                  left: "left" in corner ? corner.left : "auto",
                  right: "right" in corner ? corner.right : "auto",
                  transform: `rotate(${corner.rotate}deg)`,
                }}
              />
            ))}

            <motion.div
              animate={{
                background: phase >= 1 ? couleurAccent : "rgba(0,0,0,0)",
                scale: phase >= 1 ? 0.7 : 1,
              }}
              transition={{ duration: 0.16 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 26,
                height: 26,
                marginLeft: -13,
                marginTop: -13,
                borderRadius: 99,
                border: `4px solid ${couleurEncre}`,
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "calc(50% - 40px)",
                width: 4,
                height: 16,
                marginLeft: -2,
                background: couleurEncre,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "calc(50% + 24px)",
                width: 4,
                height: 16,
                marginLeft: -2,
                background: couleurEncre,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "calc(50% - 40px)",
                height: 4,
                width: 16,
                marginTop: -2,
                background: couleurEncre,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "calc(50% + 24px)",
                height: 4,
                width: 16,
                marginTop: -2,
                background: couleurEncre,
              }}
            />
          </motion.div>

          <div
            style={{
              position: "absolute",
              left: 28,
              right: 28,
              top: 26,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <span>[{label}]</span>
            <span>{reglages}</span>
          </div>

          <div
            style={{
              position: "absolute",
              left: 28,
              right: 28,
              bottom: 26,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <motion.span
                animate={{
                  opacity: phase === 0 ? [1, 0.2, 1] : 1,
                }}
                transition={{
                  duration: 0.45,
                  repeat: phase === 0 ? Infinity : 0,
                }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 99,
                  background: phase >= 1 ? couleurAccent : couleurEncre,
                }}
              />
              {phase === 0
                ? lang === "vi"
                  ? "[Đang lấy nét]"
                  : "[Focusing]"
                : lang === "vi"
                ? "[Tách]"
                : "[Click]"}
            </span>
            <span>{activeSubtitle}</span>
          </div>

          <motion.div
            initial={{ y: "-101%" }}
            animate={{ y: phase === 1 ? "0%" : "-101%" }}
            transition={{
              duration: phase === 1 ? 0.1 : 0.18,
              ease: phase === 1 ? [0.7, 0, 1, 1] : [0.22, 1, 0.36, 1],
            }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "50.5%",
              background: couleurEncre,
              transformOrigin: "top",
            }}
          />

          <motion.div
            initial={{ y: "101%" }}
            animate={{ y: phase === 1 ? "0%" : "101%" }}
            transition={{
              duration: phase === 1 ? 0.1 : 0.18,
              ease: phase === 1 ? [0.7, 0, 1, 1] : [0.22, 1, 0.36, 1],
            }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "50.5%",
              background: couleurEncre,
              transformOrigin: "bottom",
            }}
          />

          {!reducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 2 ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.36, times: [0, 0.15, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: "#FFFFFF",
                pointerEvents: "none",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
