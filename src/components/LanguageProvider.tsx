"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./CircularRevealToggle";

export type Lang = "en" | "vi";
export type SwapPhase = "idle" | "is-go" | "is-in";

interface LanguageContextValue {
  lang: Lang;
  swapPhase: SwapPhase;
  setLang: (next: Lang) => void;
  toggleLang: () => void;
}

const ROUTE_TITLES: Record<string, Record<Lang, string>> = {
  "/": {
    en: "FluffNii - Custom Fursuit Maker",
    vi: "FluffNii - Xưởng làm Fursuit thủ công",
  },
  "/accessories": {
    en: "Accessories — FluffNii Studio",
    vi: "Phụ kiện — FluffNii Studio",
  },
  "/terms": {
    en: "Commission Terms & Policy — FluffNii Studio",
    vi: "Điều khoản & Chính sách — FluffNii Studio",
  },
  "/mentions-legales": {
    en: "Studio Notice & Privacy — FluffNii Studio",
    vi: "Thông tin Xưởng & Quyền riêng tư — FluffNii Studio",
  },
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  swapPhase: "idle",
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [swapPhase, setSwapPhase] = useState<SwapPhase>("idle");
  const langRef = useRef<Lang>("en");
  const targetLangRef = useRef<Lang>("en");
  const timersRef = useRef<number[]>([]);
  const mountedRef = useRef(true);
  const pathname = usePathname();

  const clearTimers = useCallback(() => {
    if (typeof window !== "undefined") {
      for (const id of timersRef.current) {
        window.clearTimeout(id);
      }
    }
    timersRef.current = [];
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimers();
      if (typeof document !== "undefined") {
        delete document.documentElement.dataset.langSwap;
      }
    };
  }, [clearTimers]);

  useEffect(() => {
    langRef.current = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dataset.lang = lang;
    const normalizedPath =
      !pathname || pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const nextTitle = ROUTE_TITLES[normalizedPath]?.[lang];
    if (nextTitle) {
      document.title = nextTitle;
    }
  }, [lang, pathname]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === targetLangRef.current) {
        return;
      }

      clearTimers();
      targetLangRef.current = next;

      if (typeof window === "undefined" || typeof document === "undefined") {
        langRef.current = next;
        setLangState(next);
        setSwapPhase("idle");
        return;
      }

      const reducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
        false;

      if (reducedMotion) {
        langRef.current = next;
        setLangState(next);
        setSwapPhase("idle");
        delete document.documentElement.dataset.langSwap;
        return;
      }

      if (next === langRef.current) {
        setSwapPhase("is-in");
        document.documentElement.dataset.langSwap = "in";
        const finishId = window.setTimeout(() => {
          if (!mountedRef.current) return;
          setSwapPhase("idle");
          delete document.documentElement.dataset.langSwap;
        }, 520);
        timersRef.current = [finishId];
        return;
      }

      setSwapPhase("is-go");
      document.documentElement.dataset.langSwap = "go";

      const swapId = window.setTimeout(() => {
        if (!mountedRef.current) return;
        langRef.current = next;
        setLangState(next);
        setSwapPhase("is-in");
        document.documentElement.dataset.langSwap = "in";

        const finishId = window.setTimeout(() => {
          if (!mountedRef.current) return;
          setSwapPhase("idle");
          delete document.documentElement.dataset.langSwap;
        }, 520);
        timersRef.current = [finishId];
      }, 280);

      timersRef.current = [swapId];
    },
    [clearTimers]
  );

  const toggleLang = useCallback(() => {
    const next: Lang = targetLangRef.current === "en" ? "vi" : "en";
    setLang(next);
  }, [setLang]);

  return (
    <LanguageContext.Provider value={{ lang, swapPhase, setLang, toggleLang }}>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
