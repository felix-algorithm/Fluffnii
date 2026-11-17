"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Bouton from "./Bouton";
import { useLang } from "./LanguageProvider";

const NAV_LINKS = [
  { href: "/#studio", label: { en: "The Workshop", vi: "Về xưởng" } },
  { href: "/#projets", label: { en: "Fursuits", vi: "Fursuit" } },
  { href: "/#offres", label: { en: "Shop & Tiers", vi: "Bảng giá" } },
  { href: "/#deroule", label: { en: "Process", vi: "Quy trình" } },
  { href: "/#faq", label: { en: "FAQ", vi: "FAQ" } },
  { href: "/accessories", label: { en: "Accessories", vi: "Phụ kiện" } },
];

function LanguageSwitch({
  lang,
  onChange,
}: {
  lang: "en" | "vi";
  onChange: (next: "en" | "vi") => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-[#111622]/15 bg-[#dce8f5]/85 p-0.5 shrink-0"
    >
      {(["en", "vi"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(code)}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.04em] transition-colors cursor-pointer ${
              active
                ? "bg-[#111622] text-[#f5f8fc]"
                : "text-[#111622]/70 hover:text-[#111622]"
            }`}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const contactLabel = lang === "vi" ? "Liên hệ" : "Contact";
  const termsLabel =
    lang === "vi" ? "Điều khoản & Chính sách" : "Commission Terms & Policy";

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
            className="fixed inset-0 z-40 bg-[#111622]/25 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0.001, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: isHome ? 2.1 : 0.05,
          duration: isHome ? 0.9 : 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-3.5 sm:top-4 lg:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-5 lg:px-6 pointer-events-none"
      >
        <nav
          className={`w-full overflow-hidden pointer-events-auto border transition-[max-width,background-color,border-color,box-shadow,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen
              ? "bg-[#f5f8fc]/95 border-[#111622]/15 rounded-[28px] lg:rounded-[32px] shadow-[0_20px_50px_rgba(17,22,34,0.16)]"
              : scrolled
              ? "bg-[#f5f8fc]/85 lg:bg-[#f5f8fc]/80 border-[#111622]/15 rounded-[40px] shadow-[0_12px_32px_rgba(17,22,34,0.10)] lg:shadow-none"
              : "bg-transparent border-transparent rounded-[40px] shadow-none"
          } ${scrolled || mobileOpen ? "backdrop-blur-xl" : ""} ${
            scrolled ? "lg:max-w-[1120px]" : "lg:max-w-[1328px]"
          }`}
        >
          <div className="flex items-center justify-between h-[64px] sm:h-[68px] lg:h-[78px] px-3 sm:px-4 lg:px-6 gap-2.5 sm:gap-4">
            <div className="flex items-center lg:flex-1">
              <Link
                href="/#hero"
                onClick={() => setMobileOpen(false)}
                className="block w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] md:w-[54px] md:h-[54px] rounded-[12px] overflow-hidden relative shrink-0"
              >
                <img
                  src="/images/logo-navbar.png"
                  alt="FluffNii"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {NAV_LINKS.map((item) => {
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
                    className="relative group font-sans text-[15px] font-medium text-[#111622] tracking-[-0.01em] py-1.5 whitespace-nowrap"
                  >
                    <span className="relative block overflow-hidden h-[1.25em] leading-[1.25]">
                      <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 group-hover:-translate-y-full">
                        {text}
                      </span>
                      <span
                        aria-hidden="true"
                        className="block absolute left-0 top-full w-full text-[#111622]/60 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 group-hover:-translate-y-full"
                      >
                        {text}
                      </span>
                    </span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="block absolute left-0 right-0 bottom-0.5 h-[1.5px] bg-[#111622]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2.5 lg:flex-1">
              <LanguageSwitch lang={lang} onChange={setLang} />

              <div className="hidden lg:block">
                <Bouton
                  title={contactLabel}
                  href="/#contact"
                  variant="primary"
                />
              </div>

              <button
                type="button"
                aria-label="Toggle Menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
                className="lg:hidden flex items-center justify-center w-[42px] h-[42px] sm:w-[44px] sm:h-[44px] rounded-full bg-[#111622] text-[#f5f8fc] active:scale-95 transition-transform shrink-0 cursor-pointer"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
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
                {NAV_LINKS.map((item) => {
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
                      className={`font-stagheiz text-[26px] sm:text-[34px] leading-[1.08] tracking-[-0.03em] transition-opacity hover:opacity-70 ${
                        isActive
                          ? "text-[#1e3557] underline underline-offset-4 decoration-[#111622]/40"
                          : "text-[#111622]"
                      }`}
                    >
                      {item.label[lang]}
                    </Link>
                  );
                })}
                <div className="pt-2 flex flex-col gap-3">
                  <Bouton
                    title={contactLabel}
                    href="/#contact"
                    variant="primary"
                    fullWidth
                    onClick={() => setMobileOpen(false)}
                  />
                  <Link
                    href="/terms"
                    onClick={() => setMobileOpen(false)}
                    className="self-center font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/70 hover:text-[#111622] underline underline-offset-4 py-1"
                  >
                    {termsLabel}
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
