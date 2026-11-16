"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Bouton from "./Bouton";

const NAV_LINKS = [
  { label: "The Workshop", href: "/#studio" },
  { label: "Fursuits", href: "/#projets" },
  { label: "Shop & Tiers", href: "/#offres" },
  { label: "Process", href: "/#deroule" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
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

  return (
    <motion.header
      initial={{ opacity: 0.001, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none"
    >
      <nav
        style={{
          maxWidth: scrolled ? 880 : 1328,
          transition:
            "max-width 0.7s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
          backgroundColor: scrolled || mobileOpen ? "rgba(245, 248, 252, 0.78)" : "rgba(245, 248, 252, 0)",
          borderColor: scrolled || mobileOpen ? "rgba(17, 22, 34, 0.16)" : "rgba(17, 22, 34, 0)",
          backdropFilter: scrolled || mobileOpen ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled || mobileOpen ? "blur(20px)" : "none",
        }}
        className={`w-full pointer-events-auto border ${
          mobileOpen ? "rounded-[32px]" : "rounded-full"
        }`}
      >
        <div className="flex items-center justify-between h-[70px] md:h-[78px] px-4 md:px-6">
          <div className="flex items-center flex-1">
            <Link
              href="/#hero"
              onClick={() => setMobileOpen(false)}
              className="block w-[50px] h-[50px] md:w-[56px] md:h-[56px] rounded-[12px] overflow-hidden relative shrink-0"
            >
              <img
                src="/images/logo-navbar.png"
                alt="FluffNii"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group font-sans text-[15px] font-medium text-[#111622] tracking-[-0.01em] py-1.5"
              >
                <span className="relative block overflow-hidden h-[1.25em] leading-[1.25]">
                  <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="block absolute left-0 top-full w-full text-[#111622]/60 transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 group-hover:-translate-y-full"
                  >
                    {item.label}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end flex-1">
            <div className="hidden lg:block">
              <Bouton title="Contact" href="/#contact" variant="primary" />
            </div>

            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-[44px] h-[44px] rounded-full bg-[#111622] text-[#f5f8fc]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="lg:hidden overflow-hidden px-6 pb-6 pt-2 flex flex-col gap-4"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-stagheiz text-[30px] sm:text-[38px] leading-[1] tracking-[-0.04em] text-[#111622] hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Bouton
                  title="Contact"
                  href="/#contact"
                  variant="primary"
                  fullWidth
                  onClick={() => setMobileOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
