"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";

export type Lang = "en" | "vi";

interface LanguageContextValue {
  lang: Lang;
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
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const pathname = usePathname();

  useEffect(() => {
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

  const setLang = (next: Lang) => {
    setLangState(next);
  };

  const toggleLang = () =>
    setLangState((prev) => (prev === "en" ? "vi" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
