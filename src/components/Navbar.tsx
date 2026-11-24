"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Bouton from "./Bouton";
import MagneticButton from "./motion/MagneticButton";
import { useLang } from "./LanguageProvider";
import CircularRevealToggle from "./CircularRevealToggle";
import LucianLanguageSwitch from "./LucianLanguageSwitch";
import { useDeviceTier } from "@/lib/deviceTier";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { cn } from "@/lib/cn";
import { isModifiedClick, navigateToHomeSection } from "@/lib/sectionScroll";

export interface NavbarProps {
  commissionOpen?: boolean;
  commissionStatusLoaded?: boolean;
}

const NAV_LINKS = [
  { href: "/", sectionId: "studio", label: { en: "The Workshop", vi: "Về xưởng" } },
  { href: "/", sectionId: "projets", label: { en: "Fursuits", vi: "Fursuit" } },
  { href: "/", sectionId: "offres", label: { en: "Shop & Tiers", vi: "Hạng mục" } },
  { href: "/", sectionId: "deroule", label: { en: "Process", vi: "Quy trình" } },
  { href: "/", sectionId: "faq", label: { en: "FAQ", vi: "FAQ" } },
  { href: "/accessories", label: { en: "Accessories", vi: "Phụ kiện" } },
];

const HOME_TRACKED_SECTIONS = ["studio", "pour-qui", "pourquoi", "methode", "projets", "offres", "deroule", "faq"];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface";

export default function Navbar(props?: NavbarProps) {
  const commissionOpen = props?.commissionOpen;
  const commissionStatusLoaded = props?.commissionStatusLoaded;

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const { lang, swapPhase } = useLang();
  const { isReducedMotion } = useDeviceTier();
  const { isEnabled: smoothScrollEnabled, scrollToSection: smoothScrollToSection, stop, start } =
    useSmoothScroll();

  const swapSuffix = swapPhase === "idle" ? "" : ` ${swapPhase}`;
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState<string | null>(null);
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
    if (typeof window === "undefined") return;

    const trackedElements = isHome
      ? HOME_TRACKED_SECTIONS.map((id) => ({
          id,
          el: document.getElementById(id),
        })).filter((item): item is { id: string; el: HTMLElement } => item.el !== null)
      : [];

    const mapNavSection = (id: string) => {
      if (id === "pour-qui" || id === "pourquoi" || id === "methode") return "studio";
      return id;
    };

    let scrollRafId: number | null = null;

    const syncScrollAndSection = () => {
      scrollRafId = null;
      const y = window.scrollY;
      const nextScrolled = y > 80;
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      if (!isHome || trackedElements.length === 0 || y < 160) {
        setActiveHomeSection((prev) => (prev === null ? prev : null));
        return;
      }

      const triggerY = window.innerHeight * 0.36;
      let nextSection: string | null = null;
      for (const entry of trackedElements) {
        if (entry.el.getBoundingClientRect().top <= triggerY) {
          nextSection = mapNavSection(entry.id);
        }
      }

      setActiveHomeSection((prev) => (prev === nextSection ? prev : nextSection));
    };

    const scheduleSync = () => {
      if (scrollRafId !== null) return;
      scrollRafId = window.requestAnimationFrame(syncScrollAndSection);
    };

    syncScrollAndSection();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      if (scrollRafId !== null) {
        window.cancelAnimationFrame(scrollRafId);
      }
    };
  }, [isHome]);

  useEffect(() => {
    if (!mobileOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    stop();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      html.style.overflow = prevOverflow;
      start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, stop, start]);

  const handleSectionNavigation = useCallback(
    (sectionId: string) => {
      if (isHome && smoothScrollEnabled) {
        smoothScrollToSection(sectionId);
      } else {
        navigateToHomeSection(sectionId, pathname, router);
      }
    },
    [isHome, smoothScrollEnabled, smoothScrollToSection, pathname, router]
  );

  const contactLabel = lang === "vi" ? "Liên hệ" : "Contact";
  const termsLabel =
    lang === "vi" ? "Điều khoản & Chính sách" : "Commission Terms & Policy";
  const legalLabel = lang === "vi" ? "Thông tin pháp lý" : "Legal Notice";
  const toggleMenuLabel = mobileOpen
    ? lang === "vi"
      ? "Đóng menu"
      : "Close menu"
    : lang === "vi"
    ? "Mở menu"
    : "Open menu";
  const slotBadgeText = commissionOpen
    ? lang === "vi"
      ? "Mở slot"
      : "Open"
    : lang === "vi"
    ? "Hẹn slot"
    : "Waitlist";

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.25 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 backdrop-blur-[2px] lg:hidden bg-ink/25 dark:bg-black/60"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={false}
        animate={
          navStage === "waiting" && !isReducedMotion
            ? { opacity: 0.001, y: -24 }
            : { opacity: 1, y: 0 }
        }
        transition={{
          duration: navStage === "enter" && !isReducedMotion ? 0.65 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-3.5 sm:top-4 lg:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-5 lg:px-6 pointer-events-none"
      >
        <nav
          aria-label={lang === "vi" ? "Điều hướng chính" : "Main navigation"}
          className={cn(
            "w-full overflow-visible pointer-events-auto border transition-[max-width,background-color,border-color,box-shadow,border-radius] duration-500 ease-studio",
            mobileOpen
              ? "bg-cream/95 border-ink/15 rounded-card-lg lg:rounded-sheet shadow-[0_20px_50px_rgba(17,22,34,0.16)] dark:bg-night-surface/95 dark:border-cream/15 dark:shadow-[0_20px_50px_rgba(0,0,0,0.48)]"
              : scrolled
              ? "bg-cream/85 lg:bg-cream/80 border-ink/15 rounded-[40px] shadow-[0_12px_32px_rgba(17,22,34,0.10)] lg:shadow-card dark:bg-night-surface/90 dark:lg:bg-night/85 dark:border-cream/15 dark:shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
              : "bg-transparent border-transparent rounded-[40px] shadow-none",
            (scrolled || mobileOpen) && "backdrop-blur-xl",
            scrolled ? "lg:max-w-[1140px]" : "lg:max-w-[1328px]"
          )}
        >
          <div className="flex items-center justify-between h-[64px] sm:h-[68px] lg:h-[78px] px-3 sm:px-4 lg:px-6 gap-2 sm:gap-4">
            <div className="flex items-center gap-3 lg:flex-1">
              <Link
                href="/"
                onClick={(e) => {
                  setMobileOpen(false);
                  if (!isModifiedClick(e)) {
                    e.preventDefault();
                    handleSectionNavigation("top");
                  }
                }}
                className={cn(
                  "inline-flex items-center justify-center rounded-xl overflow-hidden relative shrink-0",
                  FOCUS_RING
                )}
              >
                <img
                  src="/images/logo-navbar.webp"
                  alt="FluffNii"
                  width={160}
                  height={160}
                  className="h-[42px] md:h-[46px] lg:h-[52px] w-auto object-contain transition-[filter] duration-300 dark:brightness-0 dark:invert dark:opacity-95"
                />
              </Link>

              {commissionStatusLoaded && typeof commissionOpen === "boolean" && (
                <Link
                  href="/#contact"
                  onClick={(e) => {
                    if (!isModifiedClick(e)) {
                      e.preventDefault();
                      handleSectionNavigation("contact");
                    }
                  }}
                  className={cn(
                    "hidden xl:inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-eyebrow transition-colors",
                    commissionOpen
                      ? "theme-butter-card bg-butter/85 border-ink/15 text-ink hover:bg-butter"
                      : "bg-surface-alt/80 border-fg/15 text-fg/80 hover:bg-surface-alt",
                    FOCUS_RING
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      commissionOpen ? "bg-green-600" : "bg-slate-500"
                    )}
                  />
                  <span>{slotBadgeText}</span>
                </Link>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {NAV_LINKS.map((item, index) => {
                const isRouteActive =
                  !item.sectionId &&
                  item.href.startsWith("/") &&
                  pathname === item.href;
                const isHomeSectionActive =
                  isHome && Boolean(item.sectionId) && activeHomeSection === item.sectionId;
                const isActive = isRouteActive || isHomeSectionActive;
                const text = item.label[lang];
                const targetHref = item.sectionId ? `/#${item.sectionId}` : item.href;

                return (
                  <Link
                    key={item.sectionId ? `nav-${item.sectionId}` : item.href}
                    href={targetHref}
                    aria-current={isRouteActive ? "page" : undefined}
                    onClick={(e) => {
                      if (item.sectionId && !isModifiedClick(e)) {
                        e.preventDefault();
                        handleSectionNavigation(item.sectionId);
                      }
                    }}
                    className={cn(
                      "relative group inline-flex items-center font-sans text-[15px] font-medium tracking-[-0.01em] py-1.5 px-1 rounded-md whitespace-nowrap text-ink dark:text-cream",
                      FOCUS_RING
                    )}
                  >
                    <span
                      className={`u267-sw${swapSuffix}`}
                      style={{ ["--u267-d" as string]: `${index * 18}ms` }}
                    >
                      <span>
                        <span className="relative block overflow-hidden h-[1.25em] leading-[1.25]">
                          <span className="block transition-transform duration-[420ms] ease-studio translate-y-0 group-hover:-translate-y-full">
                            {text}
                          </span>
                          <span
                            aria-hidden="true"
                            className="block absolute left-0 top-full w-full transition-transform duration-[420ms] ease-studio translate-y-0 group-hover:-translate-y-full text-ink/70 dark:text-butter"
                          >
                            {text}
                          </span>
                        </span>
                      </span>
                    </span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="block absolute left-1 right-1 bottom-0.5 h-[1.5px] rounded-full bg-espresso dark:bg-butter"
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
                <MagneticButton strength={0.14} innerStrength={0.06} cursorLabel={contactLabel}>
                  <Bouton
                    title={contactLabel}
                    href="/#contact"
                    variant="primary"
                    onClick={(e) => {
                      if (!isModifiedClick(e)) {
                        e.preventDefault();
                        handleSectionNavigation("contact");
                      }
                    }}
                  />
                </MagneticButton>
              </div>

              <button
                type="button"
                aria-label={toggleMenuLabel}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
                className={cn(
                  "lg:hidden flex items-center justify-center w-[42px] h-[42px] sm:w-11 sm:h-11 rounded-full active:scale-95 transition-all shrink-0 cursor-pointer bg-ink text-cream dark:bg-cream dark:text-ink",
                  FOCUS_RING
                )}
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
                transition={{
                  duration: isReducedMotion ? 0.05 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="lg:hidden overflow-x-hidden overflow-y-auto px-5 sm:px-6 pb-6 pt-2 flex flex-col gap-3.5 max-h-[calc(100dvh-100px)]"
              >
                {NAV_LINKS.map((item, index) => {
                  const isActive =
                    !item.sectionId &&
                    item.href.startsWith("/") &&
                    pathname === item.href;
                  const targetHref = item.sectionId ? `/#${item.sectionId}` : item.href;
                  return (
                    <Link
                      key={item.sectionId ? `mobile-${item.sectionId}` : item.href}
                      href={targetHref}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => {
                        setMobileOpen(false);
                        if (item.sectionId && !isModifiedClick(e)) {
                          e.preventDefault();
                          handleSectionNavigation(item.sectionId);
                        }
                      }}
                      className={cn(
                        "font-stagheiz text-[26px] sm:text-[34px] leading-[1.08] vi:leading-[1.18] tracking-[-0.03em] vi:tracking-[-0.015em] rounded-md transition-opacity hover:opacity-70",
                        FOCUS_RING,
                        isActive
                          ? "text-espresso dark:text-butter"
                          : "text-ink dark:text-cream"
                      )}
                    >
                      <span
                        className={`u267-sw${swapSuffix}`}
                        style={{ ["--u267-d" as string]: `${index * 18}ms` }}
                      >
                        <span
                          className={
                            isActive
                              ? "underline underline-offset-4 decoration-ink/40 dark:decoration-butter/60 pb-1"
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
                      onClick={(e) => {
                        setMobileOpen(false);
                        if (!isModifiedClick(e)) {
                          e.preventDefault();
                          handleSectionNavigation("contact");
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
                    <Link
                      href="/terms"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-eyebrow px-2 py-2 min-h-9 inline-flex items-center rounded-md text-ink/75 hover:text-ink dark:text-cream/75 dark:hover:text-butter",
                        FOCUS_RING
                      )}
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
                    <Link
                      href="/mentions-legales"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-eyebrow px-2 py-2 min-h-9 inline-flex items-center rounded-md text-ink/75 hover:text-ink dark:text-cream/75 dark:hover:text-butter",
                        FOCUS_RING
                      )}
                    >
                      <span className="underline underline-offset-4 py-[3px]">
                        {legalLabel}
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}
