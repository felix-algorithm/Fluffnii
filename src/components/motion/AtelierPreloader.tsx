"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLang } from "@/components/LanguageProvider";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    __gioiaClic?: boolean;
  }
}

const INTRO_SEEN_KEY = "fluffnii-intro-seen";

export interface AtelierPreloaderProps {
  /** Minimum shutter reveal pacing in ms (default 620) */
  durationMs?: number;
  label?: string;
  telemetry?: string;
  subtitle?: string;
  onComplete?: () => void;
}

const CORNERS = [
  "top-0 left-0 rotate-0",
  "top-0 right-0 rotate-90",
  "bottom-0 right-0 rotate-180",
  "bottom-0 left-0 -rotate-90",
] as const;

/**
 * Studio camera-shutter preloader with real asset/font progress tracking,
 * smooth curtain reveal, and full `gioia:clic` / `fluffnii-intro-seen` compatibility.
 */
export default function AtelierPreloader({
  durationMs = 620,
  label = "FluffNii Studio",
  telemetry = "ISO 100 · f/8 · 1/125",
  subtitle,
  onComplete,
}: AtelierPreloaderProps) {
  const { lang } = useLang();
  const { stop, start } = useSmoothScroll();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [shutterLocked, setShutterLocked] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const topBladeRef = useRef<HTMLDivElement>(null);
  const bottomBladeRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const activeSubtitle =
    subtitle ??
    (lang === "vi" ? "Từ bản vẽ thành fursuit" : "From sketch to fursuit");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    const hasHash = Boolean(window.location.hash);

    if (alreadySeen || hasHash || prefersReduced) {
      setVisible(false);
      window.__gioiaClic = true;
      window.dispatchEvent(new CustomEvent("gioia:clic"));
      onCompleteRef.current?.();
      return;
    }

    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Ignore storage failures in restricted contexts
    }

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    window.__gioiaClic = false;
    stop();

    let cancelled = false;
    let finished = false;
    let rafId = 0;
    const startTime = performance.now();
    let targetProgress = 0.25;
    let displayProgress = 0;

    const computeRealProgress = () => {
      let score = 0.28;
      if (document.readyState === "interactive") score = Math.max(score, 0.52);
      if (document.readyState === "complete") score = Math.max(score, 0.85);

      const imgs = Array.from(document.images);
      if (imgs.length > 0) {
        const loadedCount = imgs.filter((img) => img.complete).length;
        const ratio = loadedCount / imgs.length;
        score = Math.max(score, 0.35 + ratio * 0.55);
      }
      return Math.min(0.96, score);
    };

    let fontsDone = false;
    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          fontsDone = true;
        })
        .catch(() => {
          fontsDone = true;
        });
    } else {
      fontsDone = true;
    }

    const onLoad = () => {
      targetProgress = 1;
    };
    window.addEventListener("load", onLoad, { once: true });

    const completeReveal = () => {
      if (cancelled || finished) return;
      finished = true;
      setShutterLocked(true);

      const root = rootRef.current;
      const topBlade = topBladeRef.current;
      const bottomBlade = bottomBladeRef.current;
      const hud = hudRef.current;

      const finalize = () => {
        if (cancelled) return;
        html.style.overflow = prevOverflow;
        start();
        window.__gioiaClic = true;
        window.dispatchEvent(new CustomEvent("gioia:clic"));
        onCompleteRef.current?.();
        setVisible(false);
      };

      if (!root || !topBlade || !bottomBlade || !hud) {
        finalize();
        return;
      }

      const tl = gsap.timeline({
        onComplete: finalize,
      });

      tl.to(hud, {
        opacity: 0,
        scale: 0.96,
        duration: 0.22,
        ease: "power2.in",
      })
        .to(
          [topBlade, bottomBlade],
          {
            yPercent: (i) => (i === 0 ? -104 : 104),
            duration: 0.58,
            ease: "expo.inOut",
          },
          "-=0.06"
        )
        .to(
          root,
          {
            opacity: 0,
            duration: 0.24,
            ease: "power2.out",
          },
          "-=0.22"
        );
    };

    const tick = (now: number) => {
      if (cancelled || finished) return;
      const elapsed = now - startTime;
      const timeReady = elapsed >= durationMs;
      const hardCeiling = elapsed >= Math.max(1150, durationMs + 550);

      const measured = computeRealProgress();
      if ((fontsDone && document.readyState !== "loading" && timeReady) || hardCeiling) {
        targetProgress = 1;
      } else {
        targetProgress = Math.max(targetProgress, measured);
      }

      displayProgress += (targetProgress - displayProgress) * 0.16;
      if (targetProgress >= 1 && displayProgress > 0.985) {
        displayProgress = 1;
      }

      setProgress(Math.round(displayProgress * 100));

      if (displayProgress >= 1 && timeReady) {
        completeReveal();
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
      html.style.overflow = prevOverflow;
      start();
    };
  }, [durationMs, start, stop]);

  if (!visible) return null;

  return (
    <>
      <noscript>
        <style>{`[data-atelier-preloader="true"]{display:none!important;}`}</style>
      </noscript>
      <div
        ref={rootRef}
        data-atelier-preloader="true"
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[9999] overflow-hidden select-none",
          shutterLocked ? "pointer-events-none" : "pointer-events-auto"
        )}
      >
      <div
        ref={topBladeRef}
        className="absolute inset-x-0 top-0 h-[50.5%] bg-canvas border-b studio-hairline-strong"
      />
      <div
        ref={bottomBladeRef}
        className="absolute inset-x-0 bottom-0 h-[50.5%] bg-canvas border-t studio-hairline-strong"
      />

      <div
        ref={hudRef}
        className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-8 text-fg font-mono"
      >
        <div className="flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-eyebrow text-fg/75">
          <span>[{label}]</span>
          <span>{telemetry}</span>
        </div>

        <div className="relative mx-auto w-[min(62vw,420px)] aspect-[3/2] flex items-center justify-center">
          {CORNERS.map((pos, idx) => (
            <span
              key={idx}
              className={cn(
                "absolute w-9 h-9 sm:w-12 sm:h-12 border-t-[3px] border-l-[3px] border-fg/85",
                pos
              )}
            />
          ))}

          <div className="flex flex-col items-center gap-4 w-full px-8">
            <div className="relative w-7 h-7 rounded-full border-2 border-fg flex items-center justify-center">
              <span
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors duration-200",
                  progress >= 96 ? "bg-accent" : "bg-fg/40"
                )}
              />
            </div>

            <div className="w-full max-w-[220px] flex flex-col gap-1.5">
              <div className="h-[2px] w-full bg-fg/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent origin-left transition-[width] duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-eyebrow text-fg/65 tabular-nums">
                <span>
                  {progress >= 96
                    ? lang === "vi"
                      ? "[Tách]"
                      : "[Click]"
                    : lang === "vi"
                    ? "[Đang lấy nét]"
                    : "[Focusing]"}
                </span>
                <span>{String(progress).padStart(3, "0")}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-eyebrow text-fg/75">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {lang === "vi" ? "Sẵn sàng" : "Atelier Ready"}
          </span>
          <span>{activeSubtitle}</span>
        </div>
      </div>
    </div>
    </>
  );
}
