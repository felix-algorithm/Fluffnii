"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import MagneticButton from "./motion/MagneticButton";
import { useDeviceTier } from "@/lib/deviceTier";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { isModifiedClick, navigateToHomeSection } from "@/lib/sectionScroll";

const FOOTER_LINKS = [
  { href: "/", sectionId: "studio", label: { en: "The Workshop", vi: "Về xưởng" } },
  { href: "/", sectionId: "projets", label: { en: "Fursuits", vi: "Fursuit" } },
  { href: "/", sectionId: "offres", label: { en: "Shop & Tiers", vi: "Hạng mục" } },
  { href: "/", sectionId: "deroule", label: { en: "Process", vi: "Quy trình" } },
  { href: "/", sectionId: "faq", label: { en: "FAQ", vi: "FAQ" } },
  { href: "/accessories", label: { en: "Accessories", vi: "Phụ kiện" } },
  { href: "/terms", label: { en: "Terms", vi: "Điều khoản" } },
  { href: "/mentions-legales", label: { en: "Legal", vi: "Pháp lý" } },
  { href: "/", sectionId: "contact", label: { en: "Contact", vi: "Liên hệ" } },
];

const STUDIO_SOCIALS = [
  { label: "Email", href: "mailto:FluffNii.furries@gmail.com", external: false },
  { label: "Instagram", href: "https://www.instagram.com/fluffnii.fur", external: true },
  { label: "X / Twitter", href: "https://x.com/Fluffnii_FUR", external: true },
  { label: "TikTok", href: "https://www.tiktok.com/@fluffnii_fur", external: true },
];

const FOCUS_RING =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink dark:focus-visible:ring-offset-night";

export default function Footer() {
  const { lang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const { isReducedMotion } = useDeviceTier();
  const { isEnabled: smoothScrollEnabled, scrollToSection: smoothScrollToSection } =
    useSmoothScroll();

  const handleHomeNav = (sectionId: string) => {
    if (pathname === "/" && smoothScrollEnabled) {
      smoothScrollToSection(sectionId);
    } else {
      navigateToHomeSection(sectionId, pathname, router);
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    handleHomeNav("top");
  };

  return (
    <footer className="relative w-full overflow-hidden bg-ink dark:bg-night text-cream px-5 md:px-14 pt-12 pb-9 border-t border-cream/[0.16]">
      <span
        aria-hidden="true"
        className="studio-grid-bg absolute inset-0 opacity-25 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] max-w-[90vw] aspect-square rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,166,0.34) 0%, rgba(255,180,162,0.18) 45%, transparent 72%)",
        }}
      />

      <div className="relative z-10 max-w-[1328px] mx-auto flex flex-col gap-8 md:gap-7">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <nav
            aria-label={lang === "vi" ? "Điều hướng chân trang" : "Footer navigation"}
            className="flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {FOOTER_LINKS.map((link) => {
              const targetHref = link.sectionId ? `/#${link.sectionId}` : link.href;
              return (
                <Link
                  key={link.sectionId ? `footer-${link.sectionId}` : link.href}
                  href={targetHref}
                  onClick={(e) => {
                    if (link.sectionId && !isModifiedClick(e)) {
                      e.preventDefault();
                      handleHomeNav(link.sectionId);
                    }
                  }}
                  className={`font-sans text-[15px] font-medium leading-none tracking-[-0.01em] text-cream/80 hover:text-butter transition-colors ${FOCUS_RING}`}
                >
                  {link.label[lang]}
                </Link>
              );
            })}
          </nav>

          <MagneticButton strength={0.18} innerStrength={0.08}>
            <motion.a
              href="/"
              onClick={scrollToTop}
              whileHover={isReducedMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-cream/75 hover:text-butter transition-colors inline-block px-2 py-1 ${FOCUS_RING}`}
            >
              {lang === "vi" ? "[Về đầu trang]" : "[Back to top]"}
            </motion.a>
          </MagneticButton>
        </div>

        <motion.div
          initial={isReducedMotion ? false : { opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: isReducedMotion ? 0 : 1.05, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="w-full -mt-3 -mb-6 flex justify-center select-none"
        >
          <img
            src="/images/logo-footer.webp"
            alt="FluffNii Studio"
            loading="lazy"
            decoding="async"
            width={900}
            height={900}
            className="w-[300px] sm:w-[400px] md:w-[480px] lg:w-[540px] max-w-full aspect-square h-auto object-contain select-none pointer-events-none"
          />
        </motion.div>

        <div className="pt-6 border-t border-cream/[0.16] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans text-sm text-cream/70">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              {lang === "vi"
                ? "© 2026 FluffNii Studio · Xưởng làm Fursuit thủ công"
                : "© 2026 FluffNii Studio · Custom Fursuit Maker & Character Workshop"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {STUDIO_SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`hover:text-cream transition-colors ${FOCUS_RING}`}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/terms"
              className={`hover:text-cream transition-colors underline underline-offset-4 decoration-cream/35 ${FOCUS_RING}`}
            >
              {lang === "vi" ? "Điều khoản" : "Commission Terms"}
            </Link>
            <Link
              href="/mentions-legales"
              className={`hover:text-cream transition-colors underline underline-offset-4 decoration-cream/35 ${FOCUS_RING}`}
            >
              {lang === "vi" ? "Thông tin pháp lý" : "Legal Notice"}
            </Link>
            <a
              href="https://felixpham.anhtuan-09st.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-cream transition-colors ${FOCUS_RING}`}
            >
              {lang === "vi"
                ? "Thiết kế bởi Felix Algorithm"
                : "Website by Felix Algorithm"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
