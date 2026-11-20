"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Bouton from "./Bouton";
import { useLang } from "./LanguageProvider";
import CircularRevealToggle, { useTheme } from "./CircularRevealToggle";
import LucianLanguageSwitch from "./LucianLanguageSwitch";

const NAV_LINKS = [
  { href: "/#studio", label: { en: "The Workshop", vi: "Về xưởng" } },
  { href: "/#projets", label: { en: "Fursuits", vi: "Fursuit" } },
  { href: "/#offres", label: { en: "Shop & Tiers", vi: "Hạng mục" } },
  { href: "/#deroule", label: { en: "Process", vi: "Quy trình" } },
  { href: "/#faq", label: { en: "FAQ", vi: "FAQ" } },
  { href: "/accessories", label: { en: "Accessories", vi: "Phụ kiện" } },
];

const FOCUS_RING_LIGHT =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111622] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f8fc]";

const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141b28]";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang, swapPhase } = useLang();
  const { isDark } = useTheme();
  const focusRing = isDark ? FOCUS_RING_DARK : FOCUS_RING_LIGHT;
  const swapSuffix = swapPhase === "idle" ? "" : ` ${swapPhase}`;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navStage, setNavStage] = useState<"ready" | "waiting" | "enter">("ready");

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isHome) {
      setNavStage("ready");
      return;
    }

    const hasHash = Boolean(window.location.hash);
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("fluffnii-intro-seen") === "1";
    } catch {
      seen = false;
    }

    const win = window as Window & { __gioiaClic?: boolean };
    const introRunning = win.__gioiaClic === false;

    if (!introRunning && (hasHash || seen || reduced || win.__gioiaClic === true)) {
      setNavStage("ready");
      return;
    }

    setNavStage("waiting");
    const reveal = () => setNavStage("enter");
    window.addEventListener("gioia:clic", reveal, { once: true });
    const fallback = window.setTimeout(reveal, 1300);

    return () => {
      window.removeEventListener("gioia:clic", reveal);
      window.clearTimeout(fallback);
    };
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const contactLabel = lang === "vi" ? "Liên hệ" : "Contact";
  const termsLabel =
    lang === "vi" ? "Điều khoản & Chính sách" : "Commission Terms & Policy";
  const toggleMenuLabel = mobileOpen
    ? lang === "vi"
      ? "Đóng menu"
      : "Close menu"
    : lang === "vi"
    ? "Mở menu"
    : "Open menu";

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOpen(false)}
            className={`fixed inset-0 z-40 backdrop-blur-[2px] lg:hidden ${
              isDark ? "bg-[#05070b]/60" : "bg-[#111622]/25"
            }`}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={false}
        animate={
          navStage === "waiting"
            ? { opacity: 0.001, y: -24 }
            : { opacity: 1, y: 0 }
        }
        transition={{
          duration: navStage === "enter" ? 0.65 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-3.5 sm:top-4 lg:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-5 lg:px-6 pointer-events-none"
      >
        <nav
          aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}
          className={`w-full overflow-visible pointer-events-auto border transition-[max-width,background-color,border-color,box-shadow,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen
              ? isDark
                ? "bg-[#141b28]/95 border-[#f5f8fc]/15 rounded-[28px] lg:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.48)]"
                : "bg-[#f5f8fc]/95 border-[#111622]/15 rounded-[28px] lg:rounded-[32px] shadow-[0_20px_50px_rgba(17,22,34,0.16)]"
              : scrolled
              ? isDark
                ? "bg-[#141b28]/90 border-[#f5f8fc]/15 rounded-[40px] shadow-[0_12px_32px_rgba(0,0,0,0.35)] lg:shadow-none"
                : "bg-[#f5f8fc]/85 lg:bg-[#f5f8fc]/80 border-[#111622]/15 rounded-[40px] shadow-[0_12px_32px_rgba(17,22,34,0.10)] lg:shadow-none"
              : "bg-transparent border-transparent rounded-[40px] shadow-none"
          } ${scrolled || mobileOpen ? "backdrop-blur-xl" : ""} ${
            scrolled ? "lg:max-w-[1120px]" : "lg:max-w-[1328px]"
          }`}
        >
          <div className="flex items-center justify-between h-[64px] sm:h-[68px] lg:h-[78px] px-3 sm:px-4 lg:px-6 gap-2 sm:gap-4">
            <div className="flex items-center lg:flex-1">
              <Link
                href="/#top"
                onClick={() => setMobileOpen(false)}
                className={`inline-flex items-center justify-center rounded-[12px] overflow-hidden relative shrink-0 ${focusRing}`}
              >
                <img
                  src="/images/logo-navbar.webp"
                  alt="FluffNii"
                  width={54}
                  height={54}
                  className={`h-[42px] md:h-[46px] lg:h-[54px] w-auto object-contain transition-[filter] duration-300 ${
                    isDark ? "brightness-0 invert opacity-95" : ""
                  }`}
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {NAV_LINKS.map((item, index) => {
                const isActive =
                  item.href.startsWith("/") &&
                  !item.href.includes("#") &&
                  pathname === item.href;
                const text = item.label[lang];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative group inline-flex items-center font-sans text-[15px] font-medium tracking-[-0.01em] py-1.5 px-1 rounded-md whitespace-nowrap ${focusRing} ${
                      isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                    }`}
                  >
                    <span
                      className={`u267-sw${swapSuffix}`}
                      style={{ ["--u267-d" as string]: `${index * 18}ms` }}
                    >
                      <span>
                        <span className="relative block overflow-hidden h-[1.25em] leading-[1.25]">
                          <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 group-hover:-translate-y-full">
                            {text}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`block absolute left-0 top-full w-full transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 group-hover:-translate-y-full ${
                              isDark ? "text-[#fff0a6]" : "text-[#111622]/70"
                            }`}
                          >
                            {text}
                          </span>
                        </span>
                      </span>
                    </span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className={`block absolute left-0 right-0 bottom-0.5 h-[1.5px] ${
                          isDark ? "bg-[#fff0a6]" : "bg-[#111622]"
                        }`}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-2.5 lg:flex-1">
              <LucianLanguageSwitch />

              <CircularRevealToggle />

              <div
                className={`hidden lg:block u267-cta${swapSuffix}`}
                style={{ ["--u267-d" as string]: `${NAV_LINKS.length * 18}ms` }}
              >
                <Bouton
                  title={contactLabel}
                  href="/#contact"
                  variant="primary"
                />
              </div>

              <button
                type="button"
                aria-label={toggleMenuLabel}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
                className={`lg:hidden flex items-center justify-center w-[42px] h-[42px] sm:w-[44px] sm:h-[44px] rounded-full active:scale-95 transition-all shrink-0 cursor-pointer ${focusRing} ${
                  isDark
                    ? "!bg-[#f5f8fc] !text-[#111622]"
                    : "bg-[#111622] text-[#f5f8fc]"
                }`}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden overflow-hidden px-5 sm:px-6 pb-6 pt-2 flex flex-col gap-3.5 max-h-[calc(100dvh-100px)] overflow-y-auto"
              >
                {NAV_LINKS.map((item, index) => {
                  const isActive =
                    item.href.startsWith("/") &&
                    !item.href.includes("#") &&
                    pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={`font-stagheiz text-[26px] sm:text-[34px] leading-[1.08] tracking-[-0.03em] rounded-md transition-opacity hover:opacity-70 ${focusRing} ${
                        isActive
                          ? isDark
                            ? "text-[#fff0a6]"
                            : "text-[#1e3557]"
                          : isDark
                          ? "text-[#f5f8fc]"
                          : "text-[#111622]"
                      }`}
                    >
                      <span
                        className={`u267-sw${swapSuffix}`}
                        style={{ ["--u267-d" as string]: `${index * 18}ms` }}
                      >
                        <span
                          className={
                            isActive
                              ? isDark
                                ? "underline underline-offset-4 decoration-[#fff0a6]/60 pb-1"
                                : "underline underline-offset-4 decoration-[#111622]/40 pb-1"
                              : undefined
                          }
                        >
                          {item.label[lang]}
                        </span>
                      </span>
                    </Link>
                  );
                })}
                <div className="pt-2 flex flex-col gap-3">
                  <div
                    className={`u267-cta${swapSuffix}`}
                    style={{
                      ["--u267-d" as string]: `${NAV_LINKS.length * 18}ms`,
                    }}
                  >
                    <Bouton
                      title={contactLabel}
                      href="/#contact"
                      variant="primary"
                      fullWidth
                      onClick={() => setMobileOpen(false)}
                    />
                  </div>
                  <Link
                    href="/terms"
                    onClick={() => setMobileOpen(false)}
                    className={`self-center font-mono text-[11px] uppercase tracking-[0.06em] px-2 py-2 min-h-[36px] inline-flex items-center rounded-md ${focusRing} ${
                      isDark
                        ? "text-[#f5f8fc]/75 hover:text-[#fff0a6]"
                        : "text-[#111622]/75 hover:text-[#111622]"
                    }`}
                  >
                    <span
                      className={`u267-sw${swapSuffix}`}
                      style={{
                        ["--u267-d" as string]: `${NAV_LINKS.length * 18}ms`,
                      }}
                    >
                      <span className="underline underline-offset-4 py-[3px]">
                        {termsLabel}
                      </span>
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}
