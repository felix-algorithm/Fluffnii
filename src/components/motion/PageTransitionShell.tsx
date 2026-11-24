"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceTier } from "@/lib/deviceTier";
import { useSmoothScroll } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

export interface PageTransitionShellProps {
  children: React.ReactNode;
  showProgressBar?: boolean;
}

/**
 * Provides a top scroll-progress hairline and a lightweight fixed curtain sweep
 * across Next.js route changes without wrapping children in a CSS transform
 * (preserving `position: sticky` inside child chapters).
 */
export default function PageTransitionShell({
  children,
  showProgressBar = true,
}: PageTransitionShellProps) {
  const pathname = usePathname();
  const { isReducedMotion } = useDeviceTier();
  const { refresh } = useSmoothScroll();

  const progressBarRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    if (!showProgressBar || typeof window === "undefined") return;
    const bar = progressBarRef.current;
    if (!bar) return;

    if (isReducedMotion) {
      bar.style.transform = "scaleX(0)";
      return;
    }

    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      bar.style.transform = `scaleX(${ratio})`;
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [showProgressBar, isReducedMotion, pathname]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      lastPathnameRef.current = pathname;
      return;
    }

    if (lastPathnameRef.current === pathname) {
      return;
    }
    lastPathnameRef.current = pathname;

    const curtain = curtainRef.current;
    if (!curtain || isReducedMotion) {
      refresh();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.killTweensOf(curtain);
      gsap.set(curtain, {
        autoAlpha: 1,
        scaleY: 1,
        transformOrigin: "top center",
      });
      gsap.to(curtain, {
        scaleY: 0,
        duration: 0.52,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(curtain, { autoAlpha: 0 });
          refresh();
        },
      });
    }, curtainRef);

    return () => ctx.revert();
  }, [pathname, isReducedMotion, refresh]);

  return (
    <>
      {showProgressBar && !isReducedMotion && (
        <div
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-[2px] z-[70] pointer-events-none bg-transparent"
        >
          <div
            ref={progressBarRef}
            className="w-full h-full origin-left bg-espresso dark:bg-butter will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      )}

      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-[75] pointer-events-none bg-espresso dark:bg-night-surface opacity-0"
        style={{ transform: "scaleY(0)" }}
      />

      {children}
    </>
  );
}
