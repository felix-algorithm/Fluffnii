"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Clock,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Bouton from "@/components/Bouton";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { useLang, type Lang } from "@/components/LanguageProvider";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { isModifiedClick, navigateToHomeSection } from "@/lib/sectionScroll";
import { LEGAL_COPY } from "@/lib/studioExtraCopy";
import { cn } from "@/lib/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LEGAL_UI: Record<
  Lang,
  {
    backHome: string;
    termsCrossLink: string;
    tocLabel: string;
    readTime: string;
    toggleTocAria: string;
    sectionCounter: (active: number, total: number) => string;
    quoteCta: string;
    accessoriesCta: string;
    entityChips: { label: string; value: string }[];
    contactBannerTitle: string;
    contactBannerBody: string;
  }
> = {
  en: {
    backHome: "Back to home",
    termsCrossLink: "Commission terms & policy",
    tocLabel: "[Section index]",
    readTime: "6 clauses · ~3 min read",
    toggleTocAria: "Toggle legal notice section index",
    sectionCounter: (active, total) =>
      `${String(active).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    quoteCta: "Request a quote",
    accessoriesCta: "Browse accessories",
    entityChips: [
      { label: "[Workshop]", value: "FluffNii Studio · Vietnam" },
      { label: "[Contact]", value: "FluffNii.furries@gmail.com" },
      { label: "[Hosting · Trackers]", value: "Cloudflare Workers · No ad cookies" },
    ],
    contactBannerTitle: "Questions about data or studio records?",
    contactBannerBody:
      "Write to FluffNii.furries@gmail.com anytime if you want to review, update, or remove quote details you submitted.",
  },
  vi: {
    backHome: "Về trang chủ",
    termsCrossLink: "Điều khoản & Chính sách",
    tocLabel: "[Mục lục văn bản]",
    readTime: "6 mục · ~3 phút đọc",
    toggleTocAria: "Mở hoặc đóng mục lục thông tin pháp lý",
    sectionCounter: (active, total) =>
      `${String(active).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    quoteCta: "Gửi yêu cầu báo giá",
    accessoriesCta: "Xem phụ kiện lẻ",
    entityChips: [
      { label: "[Xưởng thủ công]", value: "FluffNii Studio · Việt Nam" },
      { label: "[Email liên hệ]", value: "FluffNii.furries@gmail.com" },
      { label: "[Hạ tầng · Cookie]", value: "Cloudflare Workers · Không quảng cáo" },
    ],
    contactBannerTitle: "Cần xem lại hoặc xóa thông tin đã gửi?",
    contactBannerBody:
      "Bạn cứ nhắn trực tiếp về FluffNii.furries@gmail.com bất cứ lúc nào để mình kiểm tra, chỉnh sửa hoặc xóa dữ liệu đơn báo giá của bạn.",
  },
};

function getLegalSectionId(num: string, idx: number): string {
  const digits = num.replace(/\D/g, "");
  return `legal-${digits || idx + 1}`;
}

export default function LegalContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useLang();
  const { scrollTo } = useSmoothScroll();
  const isVi = lang === "vi";
  const copy = LEGAL_COPY[lang];
  const ui = LEGAL_UI[lang];

  const tocItems = useMemo(
    () =>
      copy.sections.map((sec, idx) => ({
        id: getLegalSectionId(sec.num, idx),
        num: sec.num,
        title: sec.title,
      })),
    [copy.sections]
  );

  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id ?? "legal-001");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = tocItems.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        }

        let bestId = "";
        let bestRatio = 0;
        for (const id of ids) {
          const r = visibleRatios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestId) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.65],
      }
    );

    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (nearBottom && ids.length > 0) {
        setActiveId(ids[ids.length - 1]);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [tocItems]);

  const jumpToClause = useCallback(
    (id: string) => {
      setActiveId(id);
      setMobileTocOpen(false);
      scrollTo(`#${id}`, { offset: -116 });
    },
    [scrollTo]
  );

  const activeIndex = Math.max(
    0,
    tocItems.findIndex((item) => item.id === activeId)
  );
  const activeItem = tocItems[activeIndex] ?? tocItems[0];
  const progressRatio =
    tocItems.length > 0 ? ((activeIndex + 1) / tocItems.length) * 100 : 100;

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col bg-canvas text-fg selection:bg-butter selection:text-ink"
    >
      <Navbar />

      <main className="flex-1 w-full">
        {/* Top Editorial Banner */}
        <header className="relative overflow-hidden border-b studio-hairline pt-[124px] md:pt-[144px] pb-12 md:pb-14">
          <span
            aria-hidden="true"
            className="studio-grid-bg absolute inset-0 pointer-events-none"
          />
          <div className="section-shell relative z-10 flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  onClick={(e) => {
                    if (!isModifiedClick(e)) {
                      e.preventDefault();
                      navigateToHomeSection("top", pathname, router);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-eyebrow text-fg/75 hover:text-fg transition-colors focus-ring rounded"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {ui.backHome}
                </Link>
                <span aria-hidden="true" className="text-fg/30">
                  /
                </span>
                <span className="font-mono text-[11px] uppercase tracking-eyebrow text-fg/75">
                  {copy.eyebrow}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border studio-hairline bg-surface-alt/70 font-mono text-[10px] uppercase tracking-eyebrow text-fg/80">
                  <Clock className="w-3 h-3" />
                  {ui.readTime}
                </span>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-eyebrow text-fg/75 hover:text-fg underline underline-offset-4 focus-ring rounded"
                >
                  <span>{ui.termsCrossLink}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-w-[920px]">
              <ScrollWordReveal
                as="h1"
                immediate
                text={copy.title}
                className={cn(
                  "font-stagheiz text-fg text-studio-hero",
                  isVi && "leading-[1.18]"
                )}
              />
              <p className="font-mono text-xs uppercase tracking-eyebrow text-fg/70">
                {copy.updated}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {ui.entityChips.map((chip, idx) => (
                <div
                  key={chip.label}
                  className={cn(
                    "rounded-card-sm border px-5 py-4 flex flex-col gap-1.5",
                    idx === 0
                      ? "theme-butter-card bg-butter/90 border-ink/20 text-ink"
                      : "bg-white/85 dark:bg-night-surface/95 studio-hairline text-fg"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-eyebrow",
                      idx === 0 ? "text-ink/75 font-bold" : "text-fg/65"
                    )}
                  >
                    {chip.label}
                  </span>
                  <span className="font-sans text-[14.5px] font-semibold leading-snug break-words">
                    {chip.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <MagneticButton strength={0.14}>
                <Bouton
                  title={ui.quoteCta}
                  href="/#contact"
                  variant="primary"
                />
              </MagneticButton>
              <Bouton
                title={ui.accessoriesCta}
                href="/accessories"
                variant="secondary"
                showArrow={false}
              />
            </div>
          </div>
        </header>

        {/* Mobile Collapsible Section Index Pill */}
        {activeItem && (
          <div className="lg:hidden sticky top-[82px] sm:top-[88px] z-30 px-4 sm:px-6 pt-3 pointer-events-none">
            <div className="max-w-[680px] mx-auto pointer-events-auto">
              <button
                type="button"
                aria-expanded={mobileTocOpen}
                aria-label={ui.toggleTocAria}
                onClick={() => setMobileTocOpen((prev) => !prev)}
                className="w-full rounded-full border studio-hairline-strong backdrop-blur-xl bg-cream/95 dark:bg-night-surface/95 px-4 py-2.5 flex items-center justify-between gap-3 shadow-card cursor-pointer focus-ring"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="px-2 py-0.5 rounded-full bg-ink text-butter dark:bg-butter dark:text-ink font-mono text-[10px] font-bold shrink-0">
                    {activeItem.num}
                  </span>
                  <span className="font-sans text-xs font-semibold truncate text-fg">
                    {activeItem.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-fg/65">
                    {ui.sectionCounter(activeIndex + 1, tocItems.length)}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-fg/75 transition-transform duration-300",
                      mobileTocOpen && "rotate-180"
                    )}
                  />
                </div>
              </button>

              <AnimatePresence>
                {mobileTocOpen && (
                  <motion.nav
                    aria-label={ui.tocLabel}
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 6, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="mt-1 rounded-2xl border studio-hairline-strong bg-cream/98 dark:bg-night-surface/98 backdrop-blur-xl p-2 shadow-modal flex flex-col gap-1"
                  >
                    {tocItems.map((item) => {
                      const isActive = item.id === activeId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => jumpToClause(item.id)}
                          className={cn(
                            "w-full text-left rounded-xl px-3 py-2.5 flex items-center gap-3 transition-colors cursor-pointer focus-ring",
                            isActive
                              ? "bg-ink text-cream dark:bg-butter dark:text-ink"
                              : "text-fg/80 hover:bg-surface-alt/70"
                          )}
                        >
                          <span
                            className={cn(
                              "font-mono text-[10px] shrink-0",
                              isActive
                                ? "text-butter dark:text-ink font-bold"
                                : "text-fg/60"
                            )}
                          >
                            {item.num}
                          </span>
                          <span className="font-sans text-[13px] font-medium truncate">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Main Editorial Reader Grid */}
        <div className="section-shell py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Sticky Desktop Table of Contents */}
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-[108px]">
              <div className="rounded-[24px] border studio-hairline bg-white/85 dark:bg-night-surface/95 p-6 shadow-card flex flex-col gap-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-eyebrow text-fg/75 inline-flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    {ui.tocLabel}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-fg/75">
                    {ui.sectionCounter(activeIndex + 1, tocItems.length)}
                  </span>
                </div>

                <div
                  aria-hidden="true"
                  className="h-[3px] w-full rounded-full bg-fg/10 overflow-hidden"
                >
                  <div
                    className="h-full rounded-full bg-ink dark:bg-butter transition-all duration-300 ease-studio"
                    style={{ width: `${progressRatio}%` }}
                  />
                </div>

                <nav aria-label={ui.tocLabel} className="flex flex-col gap-1.5">
                  {tocItems.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => jumpToClause(item.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "w-full text-left rounded-xl px-3.5 py-2.5 flex items-baseline gap-3 border transition-all duration-200 cursor-pointer focus-ring",
                          isActive
                            ? "bg-ink text-cream border-ink dark:bg-butter dark:text-ink dark:border-butter shadow-sm"
                            : "border-transparent text-fg/75 hover:text-fg hover:bg-surface-alt/65"
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-[10px] shrink-0",
                            isActive
                              ? "text-butter dark:text-ink font-bold"
                              : "text-fg/55"
                          )}
                        >
                          {item.num}
                        </span>
                        <span className="font-sans text-[13.5px] font-medium leading-snug">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <div className="pt-4 border-t studio-hairline flex flex-col gap-3">
                  <Link
                    href="/terms"
                    className="w-full min-h-11 rounded-full border studio-hairline-strong px-4 py-2.5 font-sans text-sm font-medium text-fg hover:bg-ink hover:text-cream dark:hover:bg-butter dark:hover:text-ink transition-colors inline-flex items-center justify-center gap-2 no-underline focus-ring"
                  >
                    <span>{ui.termsCrossLink}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="mailto:FluffNii.furries@gmail.com"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-fg/70 hover:text-fg transition-colors truncate focus-ring rounded"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">FluffNii.furries@gmail.com</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Numbered Legal Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {copy.sections.map((sec, idx) => {
                const secId = getLegalSectionId(sec.num, idx);
                const isActive = activeId === secId;
                return (
                  <section
                    key={sec.num}
                    id={secId}
                    className={cn(
                      "scroll-mt-[120px] rounded-[24px] border p-6 sm:p-8 transition-colors duration-300 bg-white/90 dark:bg-night-surface/95",
                      isActive
                        ? "border-ink/35 dark:border-butter/50 shadow-card"
                        : "studio-hairline"
                    )}
                  >
                    <div className="flex flex-wrap items-baseline gap-3.5 pb-5 border-b studio-hairline">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase tracking-eyebrow",
                          isActive
                            ? "bg-ink text-butter dark:bg-butter dark:text-ink font-bold"
                            : "bg-surface-alt text-fg/75"
                        )}
                      >
                        {sec.num}
                      </span>
                      <h2
                        className={cn(
                          "font-stagheiz text-fg",
                          isVi
                            ? "text-xl sm:text-[23px] leading-[1.18] tracking-[-0.015em]"
                            : "text-[22px] sm:text-[26px] leading-[1.06] tracking-[-0.03em]"
                        )}
                      >
                        {sec.title}
                      </h2>
                    </div>

                    <div className="pt-5 flex flex-col gap-4">
                      {sec.paragraphs.map((p, pIdx) => {
                        const isStudioFactList =
                          idx === 0 && p.includes("\n");
                        if (isStudioFactList) {
                          return (
                            <div
                              key={pIdx}
                              className="rounded-2xl border studio-hairline bg-canvas dark:bg-night-elevated p-4 sm:p-5 font-mono text-[12.5px] sm:text-[13px] leading-[1.75] text-fg/90 whitespace-pre-line break-words"
                            >
                              {p}
                            </div>
                          );
                        }
                        return (
                          <p
                            key={pIdx}
                            className="font-sans text-[15.5px] md:text-[16.5px] leading-[1.65] text-fg/85 whitespace-pre-line"
                          >
                            {p}
                          </p>
                        );
                      })}
                    </div>
                  </section>
                );
              })}

              {/* Closing Data Request Banner */}
              <section className="rounded-[26px] bg-ink dark:bg-night-surface text-cream p-6 sm:p-8 border border-cream/15 flex flex-col gap-4 relative overflow-hidden">
                <span
                  aria-hidden="true"
                  className="studio-grid-bg absolute inset-0 pointer-events-none opacity-40"
                />
                <div className="relative z-10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-butter shrink-0 mt-1" />
                  <div className="flex flex-col gap-1.5">
                    <h3
                      className={cn(
                        "font-stagheiz text-cream",
                        isVi
                          ? "text-xl sm:text-2xl leading-[1.18]"
                          : "text-2xl sm:text-[28px] leading-[1.04]"
                      )}
                    >
                      {ui.contactBannerTitle}
                    </h3>
                    <p className="font-sans text-[15px] leading-[1.6] text-cream/80 max-w-[560px]">
                      {ui.contactBannerBody}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex flex-wrap items-center gap-3.5 pt-1">
                  <Bouton
                    title="FluffNii.furries@gmail.com"
                    href="mailto:FluffNii.furries@gmail.com"
                    variant="light"
                    showArrow={false}
                  />
                  <Link
                    href="/terms"
                    className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-3.5 font-sans text-[15px] font-medium text-cream hover:bg-cream hover:text-ink transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter"
                  >
                    <span>{ui.termsCrossLink}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
