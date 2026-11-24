"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceTier } from "@/lib/deviceTier";
import {
  clearUrlHash,
  scrollToSection as nativeScrollToSection,
} from "@/lib/sectionScroll";

gsap.registerPlugin(ScrollTrigger);

export interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  isEnabled: boolean;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: SmoothScrollOptions
  ) => void;
  scrollToSection: (sectionId: string, options?: SmoothScrollOptions) => void;
  stop: () => void;
  start: () => void;
  refresh: () => void;
}

const DEFAULT_CONTEXT: SmoothScrollContextValue = {
  lenis: null,
  isEnabled: false,
  scrollTo: (target, options) => {
    if (typeof window === "undefined") return;
    if (typeof target === "number") {
      window.scrollTo({
        top: target + (options?.offset ?? 0),
        behavior: options?.immediate ? "auto" : "smooth",
      });
      return;
    }
    const el =
      typeof target === "string"
        ? document.querySelector<HTMLElement>(target)
        : target;
    el?.scrollIntoView({
      behavior: options?.immediate ? "auto" : "smooth",
      block: "start",
    });
  },
  scrollToSection: (sectionId) => nativeScrollToSection(sectionId),
  stop: () => {},
  start: () => {},
  refresh: () => {
    if (typeof window !== "undefined") {
      ScrollTrigger.refresh();
    }
  },
};

const SmoothScrollContext =
  createContext<SmoothScrollContextValue>(DEFAULT_CONTEXT);

/**
 * Synchronizes Lenis smooth scrolling with GSAP's ticker and ScrollTrigger,
 * automatically stepping back to native scrolling on touch or reduced-motion devices.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { enableSmoothScroll, isReducedMotion } = useDeviceTier();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!enableSmoothScroll) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      }
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped"
      );
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      anchors: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let cancelled = false;
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    document.fonts?.ready
      ?.then(() => {
        if (!cancelled) {
          ScrollTrigger.refresh();
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
      setLenisInstance(null);
      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-stopped"
      );
    };
  }, [enableSmoothScroll]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rafId = window.requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: SmoothScrollOptions) => {
      if (typeof window === "undefined") return;
      const offset = options?.offset ?? 0;
      const immediate = Boolean(options?.immediate || isReducedMotion);
      const activeLenis = lenisRef.current;

      if (activeLenis) {
        activeLenis.scrollTo(target, {
          offset,
          duration: immediate ? 0 : options?.duration ?? 1.15,
          immediate,
        });
        return;
      }

      if (typeof target === "number") {
        window.scrollTo({
          top: Math.max(0, target + offset),
          behavior: immediate ? "auto" : "smooth",
        });
        return;
      }

      const el =
        typeof target === "string"
          ? document.getElementById(target.replace(/^#/, "")) ??
            document.querySelector<HTMLElement>(target)
          : target;
      if (!el) return;

      const top =
        el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: immediate ? "auto" : "smooth",
      });
    },
    [isReducedMotion]
  );

  const scrollToSection = useCallback(
    (sectionId: string, options?: SmoothScrollOptions) => {
      if (typeof window === "undefined") return;
      if (sectionId === "top") {
        scrollTo(0, options);
        clearUrlHash();
        return;
      }

      const target = document.getElementById(sectionId);
      if (target) {
        if (lenisRef.current) {
          scrollTo(target, options);
        } else {
          nativeScrollToSection(sectionId);
        }
      }
      clearUrlHash();
    },
    [scrollTo]
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const refresh = useCallback(() => {
    if (typeof window === "undefined") return;
    lenisRef.current?.resize();
    ScrollTrigger.refresh();
  }, []);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      lenis: lenisInstance,
      isEnabled: Boolean(lenisInstance),
      scrollTo,
      scrollToSection,
      stop,
      start,
      refresh,
    }),
    [lenisInstance, scrollTo, scrollToSection, stop, start, refresh]
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}
