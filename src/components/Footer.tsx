"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const FOOTER_LINKS = [
  { label: "The Workshop", href: "/#studio" },
  { label: "Fursuits", href: "/#projets" },
  { label: "Shop & Tiers", href: "/#offres" },
  { label: "Process", href: "/#deroule" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const STUDIO_SOCIALS = [
  { label: "Email", href: "mailto:FluffNii.furries@gmail.com", external: false },
  { label: "Instagram", href: "https://www.instagram.com/fluffnii.fur", external: true },
  { label: "X / Twitter", href: "https://x.com/Fluffnii_FUR", external: true },
  { label: "TikTok", href: "https://www.tiktok.com/@fluffnii_fur", external: true },
];

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#111622] text-[#f5f8fc] px-5 md:px-[56px] pt-[48px] pb-[36px] border-t border-[#f5f8fc]/16">
      <div className="max-w-[1328px] mx-auto flex flex-col gap-[32px] md:gap-[28px]">
        {/* Top Row: Navigation Links + Back to Top */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[15px] font-medium leading-none tracking-[-0.01em] text-[#f5f8fc]/80 hover:text-[#f5f8fc] transition-colors"
              >
                {link.label}
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
            [Back to top]
          </motion.a>
        </div>

        {/* Giant FluffNii Studio Logotype */}
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

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#f5f8fc]/16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans text-[14px] text-[#f5f8fc]/65">
          <div>
            © 2026 FluffNii Studio — Custom Fursuit Maker &amp; Character Workshop
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
              href="/mentions-legales"
              className="hover:text-[#f5f8fc] transition-colors underline underline-offset-4 decoration-[#f5f8fc]/30"
            >
              Legal Notice
            </Link>
            <a
              href="https://felixpham.anhtuan-09st.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5f8fc] transition-colors"
            >
              Website by Felix Algorithm
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
