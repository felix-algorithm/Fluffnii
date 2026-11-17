"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

const FOOTER_LINKS = [
  { href: "/#studio", label: { en: "The Workshop", vi: "Về xưởng" } },
  { href: "/#projets", label: { en: "Fursuits", vi: "Fursuit" } },
  { href: "/#offres", label: { en: "Shop & Tiers", vi: "Bảng giá" } },
  { href: "/#deroule", label: { en: "Process", vi: "Quy trình" } },
  { href: "/#faq", label: { en: "FAQ", vi: "FAQ" } },
  { href: "/accessories", label: { en: "Accessories", vi: "Phụ kiện" } },
  { href: "/terms", label: { en: "Terms", vi: "Điều khoản" } },
  { href: "/#contact", label: { en: "Contact", vi: "Liên hệ" } },
];

const STUDIO_SOCIALS = [
  { label: "Email", href: "mailto:FluffNii.furries@gmail.com", external: false },
  { label: "Instagram", href: "https://www.instagram.com/fluffnii.fur", external: true },
  { label: "X / Twitter", href: "https://x.com/Fluffnii_FUR", external: true },
  { label: "TikTok", href: "https://www.tiktok.com/@fluffnii_fur", external: true },
];

export default function Footer() {
  const { lang } = useLang();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#111622] text-[#f5f8fc] px-5 md:px-[56px] pt-[48px] pb-[36px] border-t border-[#f5f8fc]/16">
      <div className="max-w-[1328px] mx-auto flex flex-col gap-[32px] md:gap-[28px]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[15px] font-medium leading-none tracking-[-0.01em] text-[#f5f8fc]/80 hover:text-[#f5f8fc] transition-colors"
              >
                {link.label[lang]}
              </Link>
            ))}
          </nav>
          <motion.a
            href="#top"
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70 hover:text-[#f5f8fc] transition-colors inline-block"
          >
            {lang === "vi" ? "[Về đầu trang]" : "[Back to top]"}
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="w-full -mt-3 -mb-6 flex justify-center select-none"
        >
          <img
            src="/images/logo-footer.png"
            alt="FluffNii Studio"
            className="w-[320px] sm:w-[420px] md:w-[500px] lg:w-[560px] max-w-full h-auto object-contain select-none pointer-events-none"
          />
        </motion.div>

        <div className="pt-6 border-t border-[#f5f8fc]/16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans text-[14px] text-[#f5f8fc]/65">
          <div>
            {lang === "vi"
              ? "© 2026 FluffNii Studio · Xưởng làm Fursuit thủ công"
              : "© 2026 FluffNii Studio — Custom Fursuit Maker & Character Workshop"}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {STUDIO_SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="hover:text-[#f5f8fc] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/terms"
              className="hover:text-[#f5f8fc] transition-colors underline underline-offset-4 decoration-[#f5f8fc]/30"
            >
              {lang === "vi" ? "Điều khoản" : "Commission Terms"}
            </Link>
            <Link
              href="/mentions-legales"
              className="hover:text-[#f5f8fc] transition-colors underline underline-offset-4 decoration-[#f5f8fc]/30"
            >
              {lang === "vi" ? "Thông tin pháp lý" : "Legal Notice"}
            </Link>
            <a
              href="https://felixpham.anhtuan-09st.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f8fc] transition-colors"
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
