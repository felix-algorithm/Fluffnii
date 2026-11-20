"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  ZoomIn,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LanguageProvider";
import { useTheme } from "@/components/CircularRevealToggle";
import {
  ACCESSORIES_COPY,
  formatVnd,
  type AccessoryItem,
  type AccessoryStatus,
  type AccessoriesLocaleCopy,
  type BlueprintVariant,
} from "@/lib/accessoriesCopy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DIRECT_CONTACTS = [
  {
    label: "Twitter",
    value: "@CrossTalk_f",
    href: "https://x.com/CrossTalk_f",
    spanFull: false,
  },
  {
    label: "Discord",
    value: "crosstalk_f",
    copyText: "crosstalk_f",
    spanFull: false,
  },
  {
    label: "BARQ",
    value: "barq.app/@crosstalk_f",
    href: "https://barq.app/@crosstalk_f",
    spanFull: false,
  },
  {
    label: "Facebook",
    value: "facebook.com/crosstalkF",
    href: "https://www.facebook.com/crosstalkF",
    spanFull: false,
  },
  {
    label: "Bluesky",
    value: "@crosstalktheproot.bsky.social",
    href: "https://bsky.app/profile/crosstalktheproot.bsky.social",
    spanFull: true,
  },
];

function getStatusBadgeClass(status: AccessoryStatus, isDark = false): string {
  if (status === "coming-soon") {
    return `bg-[#111622] text-[#fff0a6] font-bold ${
      isDark ? "border-[#fff0a6]/45" : "border-[#111622]"
    }`;
  }
  if (status === "custom") {
    return "theme-butter-card bg-[#fff0a6]/95 text-[#111622] border-[#111622]/20 font-medium";
  }
  return isDark
    ? "bg-[#141b28]/95 text-[#f5f8fc] border-[#f5f8fc]/20 font-medium"
    : "bg-[#f5f8fc]/95 text-[#111622] border-[#111622]/15 font-medium";
}

async function writeToClipboard(text: string): Promise<boolean> {
  if (
    typeof navigator === "undefined" ||
    !navigator.clipboard ||
    typeof navigator.clipboard.writeText !== "function"
  ) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function ClipboardFallbackBox({
  text,
  prompt,
  closeAria,
  onClose,
  dark = false,
  rows = 3,
}: {
  text: string;
  prompt: string;
  closeAria: string;
  onClose: () => void;
  dark?: boolean;
  rows?: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    el.select();
  }, [text]);

  return (
    <div
      className={`rounded-[16px] border p-3.5 flex flex-col gap-2 ${
        dark
          ? "bg-[#f5f8fc]/[0.08] border-[#f5f8fc]/20 text-[#f5f8fc]"
          : "bg-[#f5f8fc] border-[#111622]/20 text-[#111622]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p
          className={`font-sans text-[12px] leading-[1.45] pt-1.5 ${
            dark ? "text-[#fff0a6]" : "text-[#111622]/80"
          }`}
        >
          {prompt}
        </p>
        <button
          type="button"
          aria-label={closeAria}
          onClick={onClose}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
            dark
              ? "text-[#f5f8fc]/80 hover:bg-[#f5f8fc]/15 hover:text-[#f5f8fc] focus-visible:ring-[#fff0a6]"
              : "text-[#111622]/70 hover:bg-[#dce8f5] hover:text-[#111622] focus-visible:ring-[#111622]"
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        readOnly
        rows={rows}
        value={text}
        onFocus={(e) => e.currentTarget.select()}
        onClick={(e) => e.currentTarget.select()}
        className={`w-full rounded-[12px] border px-3 py-2 font-mono text-[12px] leading-[1.5] resize-none select-all focus-visible:outline-none focus-visible:ring-2 ${
          dark
            ? "bg-[#111622]/80 border-[#f5f8fc]/25 text-[#f5f8fc] focus-visible:ring-[#fff0a6]"
            : "bg-white border-[#111622]/20 text-[#111622] focus-visible:ring-[#111622]"
        }`}
      />
    </div>
  );
}

function BlueprintVisual({
  variant,
  compact = false,
  badges,
  isDark = false,
}: {
  variant: BlueprintVariant;
  compact?: boolean;
  badges: Record<BlueprintVariant, string>;
  isDark?: boolean;
}) {
  const isPlus = variant === "plus-fan";

  if (compact) {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
          isPlus
            ? `bg-[#111622] ${isDark ? "border border-[#fff0a6]/25" : ""}`
            : isDark
            ? "bg-[#1a2436]"
            : "bg-[#dce8f5]"
        }`}
      >
        {variant === "internal-fan" && (
          <svg
            viewBox="0 0 40 40"
            className={`w-7 h-7 ${isDark ? "text-[#f5f8fc]" : "text-[#111622]"}`}
            fill="none"
          >
            <rect
              x="4"
              y="4"
              width="32"
              height="32"
              rx="8"
              fill={isDark ? "#141b28" : "#f5f8fc"}
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
            <circle
              cx="20"
              cy="20"
              r="3.5"
              fill="#fff0a6"
              stroke={isDark ? "#111622" : "currentColor"}
              strokeWidth="1.5"
            />
          </svg>
        )}
        {variant === "std-fan" && (
          <svg
            viewBox="0 0 40 40"
            className={`w-7 h-7 ${isDark ? "text-[#f5f8fc]" : "text-[#111622]"}`}
            fill="none"
          >
            <rect
              x="5"
              y="12"
              width="20"
              height="20"
              rx="6"
              fill={isDark ? "#141b28" : "#f5f8fc"}
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M25 16 L35 12 L35 24 L25 26 Z"
              fill="#fff0a6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="15" cy="22" r="5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}
        {variant === "plus-fan" && (
          <svg viewBox="0 0 40 40" className="w-7 h-7 text-[#fff0a6]" fill="none">
            <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="20" r="8" stroke="#f5f8fc" strokeWidth="1.6" />
            <circle cx="20" cy="20" r="3.5" fill="#fff0a6" />
          </svg>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: isDark
          ? isPlus
            ? "radial-gradient(rgba(255, 240, 166, 0.16) 1px, transparent 1px)"
            : "radial-gradient(rgba(245, 248, 252, 0.14) 1px, transparent 1px)"
          : isPlus
          ? "radial-gradient(rgba(30, 53, 87, 0.2) 1px, transparent 1px)"
          : "radial-gradient(rgba(17, 22, 34, 0.14) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden p-6 ${
        isDark
          ? isPlus
            ? "bg-[#141d2e]"
            : "bg-[#1a2436]"
          : isPlus
          ? "bg-[#1e3557]/[0.14]"
          : "bg-[#dce8f5]"
      }`}
    >
      <div
        className={`absolute inset-3 rounded-[14px] border pointer-events-none ${
          isDark
            ? isPlus
              ? "border-[#fff0a6]/20"
              : "border-[#f5f8fc]/15"
            : isPlus
            ? "border-[#111622]/20"
            : "border-[#111622]/10"
        }`}
      />

      {variant === "internal-fan" && (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative flex items-center">
            <div
              className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-[24px] border-2 flex items-center justify-center ${
                isDark
                  ? "border-[#f5f8fc]/75 bg-[#141b28]/90 shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
                  : "border-[#111622]/85 bg-[#f5f8fc]/85 shadow-[0_10px_28px_rgba(17,22,34,0.08)]"
              }`}
            >
              <span
                className={`absolute top-2.5 left-2.5 w-2 h-2 rounded-full border ${
                  isDark
                    ? "border-[#f5f8fc]/50 bg-[#1a2436]"
                    : "border-[#111622]/50 bg-[#dce8f5]"
                }`}
              />
              <span
                className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full border ${
                  isDark
                    ? "border-[#f5f8fc]/50 bg-[#1a2436]"
                    : "border-[#111622]/50 bg-[#dce8f5]"
                }`}
              />
              <span
                className={`absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full border ${
                  isDark
                    ? "border-[#f5f8fc]/50 bg-[#1a2436]"
                    : "border-[#111622]/50 bg-[#dce8f5]"
                }`}
              />
              <span
                className={`absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full border ${
                  isDark
                    ? "border-[#f5f8fc]/50 bg-[#1a2436]"
                    : "border-[#111622]/50 bg-[#dce8f5]"
                }`}
              />
              <svg
                viewBox="0 0 120 120"
                className={`w-24 h-24 transition-transform duration-1000 ease-out group-hover:rotate-[165deg] ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                }`}
                fill="none"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M60 60 C55 37, 69 24, 79 30 C86 35, 75 52, 60 60Z"
                  fill="currentColor"
                />
                <path
                  d="M60 60 C83 55, 96 69, 90 79 C85 86, 68 75, 60 60Z"
                  fill="currentColor"
                />
                <path
                  d="M60 60 C65 83, 51 96, 41 90 C34 85, 45 68, 60 60Z"
                  fill="currentColor"
                />
                <path
                  d="M60 60 C37 65, 24 51, 30 41 C35 34, 52 45, 60 60Z"
                  fill="currentColor"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="10"
                  fill="#fff0a6"
                  stroke={isDark ? "#111622" : "currentColor"}
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <div className="flex items-center -ml-0.5">
              <div
                className={`w-3.5 h-2 ${
                  isDark ? "bg-[#f5f8fc]/80" : "bg-[#111622]/80"
                }`}
              />
              <div
                className={`w-6 h-4 rounded-r-[6px] border-2 border-l-0 flex items-center justify-center ${
                  isDark
                    ? "border-[#f5f8fc]/75 bg-[#141b28]"
                    : "border-[#111622]/85 bg-[#f5f8fc]"
                }`}
              >
                <div
                  className={`w-3 h-1 rounded-full ${
                    isDark ? "bg-[#fff0a6]" : "bg-[#111622]"
                  }`}
                />
              </div>
            </div>
          </div>
          <span
            className={`mt-3 px-2.5 py-0.5 rounded-full font-mono text-[9.5px] uppercase tracking-[0.06em] ${
              isDark
                ? "bg-[#0b0f17] border border-[#fff0a6]/35 text-[#fff0a6]"
                : "bg-[#111622] text-[#fff0a6]"
            }`}
          >
            {badges["internal-fan"]}
          </span>
        </div>
      )}

      {variant === "std-fan" && (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <svg
              viewBox="0 0 220 132"
              className={`w-[196px] sm:w-[216px] h-auto ${
                isDark
                  ? "text-[#f5f8fc] drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)]"
                  : "text-[#111622] drop-shadow-[0_10px_22px_rgba(17,22,34,0.08)]"
              }`}
              fill="none"
            >
              <rect
                x="16"
                y="18"
                width="104"
                height="96"
                rx="22"
                fill={isDark ? "#141b28" : "#f5f8fc"}
                stroke="currentColor"
                strokeWidth="2.4"
              />
              <path
                d="M120 34 L172 22 C179 20.5 184 25.5 184 32.5 L184 68.5 C184 75.5 179 80.5 172 79 L120 72 Z"
                fill="#fff0a6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path
                d="M170 25 L170 76"
                stroke="#111622"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
              <path
                d="M192 38 C200 38, 204 34, 210 34"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              <path
                d="M192 50 C201 50, 205 50, 214 50"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              <path
                d="M192 62 C200 62, 204 66, 210 66"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              <g className="origin-[64px_64px] transition-transform duration-1000 ease-out group-hover:rotate-[150deg]">
                <circle
                  cx="64"
                  cy="64"
                  r="31"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M64 64 C61 50, 70 41, 77 45 C81 48, 74 59, 64 64Z"
                  fill="currentColor"
                />
                <path
                  d="M64 64 C78 61, 87 70, 83 77 C80 81, 69 74, 64 64Z"
                  fill="currentColor"
                />
                <path
                  d="M64 64 C67 78, 58 87, 51 83 C47 80, 54 69, 64 64Z"
                  fill="currentColor"
                />
                <path
                  d="M64 64 C50 67, 41 58, 45 51 C48 47, 59 54, 64 64Z"
                  fill="currentColor"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="6.5"
                  fill="#fff0a6"
                  stroke={isDark ? "#111622" : "currentColor"}
                  strokeWidth="2"
                />
              </g>
              <g>
                <circle
                  cx="104"
                  cy="96"
                  r="11"
                  fill={isDark ? "#1a2436" : "#dce8f5"}
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="104"
                  cy="96"
                  r="5"
                  fill={isDark ? "#0b0f17" : "#111622"}
                />
                <line
                  x1="104"
                  y1="96"
                  x2="110"
                  y2="90"
                  stroke="#fff0a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <rect
                x="28"
                y="97"
                width="26"
                height="5"
                rx="2.5"
                fill="currentColor"
                fillOpacity="0.22"
              />
            </svg>
          </div>
          <span
            className={`mt-2 px-2.5 py-0.5 rounded-full font-mono text-[9.5px] uppercase tracking-[0.06em] ${
              isDark
                ? "bg-[#0b0f17] border border-[#fff0a6]/35 text-[#fff0a6]"
                : "bg-[#111622] text-[#fff0a6]"
            }`}
          >
            {badges["std-fan"]}
          </span>
        </div>
      )}

      {variant === "plus-fan" && (
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div
              className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-[#fff0a6] bg-[#111622] p-1.5 flex items-center justify-center shadow-[0_14px_34px_rgba(17,22,34,0.22)] ring-4 ${
                isDark ? "ring-[#fff0a6]/15" : "ring-[#111622]/15"
              }`}
            >
              <svg
                viewBox="0 0 120 120"
                className="w-28 h-28 text-[#f5f8fc] transition-transform duration-1000 ease-out group-hover:rotate-[210deg]"
                fill="none"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#fff0a6"
                  strokeWidth="1.6"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="43"
                  stroke="#f5f8fc"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                />
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <path
                    key={deg}
                    d="M60 60 C55 38, 67 21, 77 27 C84 31, 73 49, 60 60Z"
                    fill="#f5f8fc"
                    transform={`rotate(${deg} 60 60)`}
                  />
                ))}
                <circle
                  cx="60"
                  cy="60"
                  r="13"
                  fill="#111622"
                  stroke="#fff0a6"
                  strokeWidth="2.5"
                />
                <circle cx="60" cy="60" r="5" fill="#fff0a6" />
              </svg>
            </div>
            <span className="theme-butter-card absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#fff0a6] border-2 border-[#111622] text-[#111622] font-mono text-[13px] font-bold flex items-center justify-center shadow-sm">
              +
            </span>
          </div>
          <span className="theme-butter-card mt-3 px-2.5 py-0.5 rounded-full bg-[#fff0a6] border border-[#111622]/25 text-[#111622] font-mono text-[9.5px] font-bold uppercase tracking-[0.06em]">
            {badges["plus-fan"]}
          </span>
        </div>
      )}
    </div>
  );
}

function AccessoryCard({
  item,
  qty,
  idx,
  isVi,
  isDark,
  copy,
  onQtyChange,
  onPreview,
}: {
  item: AccessoryItem;
  qty: number;
  idx: number;
  isVi: boolean;
  isDark: boolean;
  copy: AccessoriesLocaleCopy;
  onQtyChange: (id: string, delta: number) => void;
  onPreview: (id: string) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(255, 240, 166, 0.24), transparent 72%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const selected = qty > 0;
  const addCtaLabel =
    item.status === "available" ? copy.addToEstimate : copy.addInterestCta;

  return (
    <motion.article
      onPointerMove={handlePointerMove}
      initial={{ opacity: 0.001, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.65,
        delay: Math.min(idx * 0.06, 0.2),
        ease: EASE,
      }}
      className={`group relative h-full flex flex-col justify-between rounded-[22px] border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
        isDark
          ? selected
            ? "bg-[#141b28]/95 border-[#fff0a6] shadow-[0_18px_38px_rgba(0,0,0,0.4)]"
            : "bg-[#141b28]/95 border-[#f5f8fc]/15 hover:border-[#fff0a6]/45 hover:shadow-[0_16px_34px_rgba(0,0,0,0.35)]"
          : selected
          ? "bg-white/90 border-[#111622] shadow-[0_18px_38px_rgba(17,22,34,0.1)]"
          : "bg-white/90 border-[#111622]/15 hover:border-[#111622]/40 hover:shadow-[0_16px_34px_rgba(17,22,34,0.07)]"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlightBg }}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      />

      <button
        type="button"
        onClick={() => onPreview(item.id)}
        aria-label={copy.previewAria(item.name)}
        className={`relative aspect-[4/3] w-full shrink-0 overflow-hidden cursor-zoom-in block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
          isDark
            ? "bg-[#1a2436] focus-visible:ring-[#fff0a6]"
            : "bg-[#dce8f5] focus-visible:ring-[#111622]"
        }`}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt}
            width={item.imageWidth}
            height={item.imageHeight}
            loading="lazy"
            decoding="async"
            style={{
              objectPosition: item.imagePosition || "center center",
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
          />
        ) : (
          <BlueprintVisual
            variant={item.blueprint || "internal-fan"}
            badges={copy.blueprintBadges}
            isDark={isDark}
          />
        )}

        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-[0.06em] ${getStatusBadgeClass(
            item.status,
            isDark
          )}`}
        >
          {item.code} · {item.statusBadge}
        </span>
        <span
          className={`absolute bottom-3 right-3 w-10 h-10 rounded-full border flex items-center justify-center opacity-85 lg:opacity-0 lg:translate-y-1.5 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 ${
            isDark
              ? "bg-[#141b28]/90 border-[#f5f8fc]/20 text-[#f5f8fc]"
              : "bg-[#f5f8fc]/90 border-[#111622]/15 text-[#111622]"
          }`}
        >
          <ZoomIn className="w-4 h-4" />
        </span>
        {selected && (
          <span className="theme-butter-card absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#fff0a6] border border-[#111622]/25 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-[#111622]">
            {copy.inListLabel(qty)}
          </span>
        )}
      </button>

      <div className="relative z-20 p-5 md:p-6 flex flex-col justify-between gap-4 flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span
              className={`font-mono text-[10.5px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              {item.subtitle}
            </span>
            <h3
              className={`font-stagheiz ${
                isDark ? "text-[#f5f8fc]" : "text-[#111622]"
              } ${
                isVi
                  ? "text-[20px] xl:text-[21px] leading-[1.14] tracking-[-0.02em]"
                  : "text-[22px] xl:text-[24px] leading-[1.04] tracking-[-0.03em]"
              }`}
            >
              {item.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className={`font-mono text-[14px] font-bold ${
                isDark ? "text-[#f5f8fc]" : "text-[#111622]"
              }`}
            >
              {item.priceLabel}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-sans text-[11.5px] ${
                isDark
                  ? "bg-[#1a2436] text-[#f5f8fc]/80"
                  : "bg-[#dce8f5]/75 text-[#111622]/75"
              }`}
            >
              {item.note}
            </span>
          </div>

          <p
            className={`font-sans text-[13.5px] leading-[1.52] ${
              isDark ? "text-[#f5f8fc]/80" : "text-[#111622]/80"
            }`}
          >
            {item.description}
          </p>

          {item.specs.length > 0 && (
            <ul
              className={`flex flex-col gap-1.5 pt-3 border-t border-dashed ${
                isDark ? "border-[#f5f8fc]/15" : "border-[#111622]/15"
              }`}
            >
              {item.specs.map((spec, specIdx) => (
                <li
                  key={`${item.id}-spec-${specIdx}`}
                  className={`flex items-start gap-2 font-sans text-[13px] leading-[1.45] ${
                    isDark ? "text-[#f5f8fc]/85" : "text-[#111622]/85"
                  }`}
                >
                  <Check
                    className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                      isDark ? "text-[#fff0a6]" : "text-[#111622]"
                    }`}
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selected ? (
          <motion.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="theme-butter-card flex items-center justify-between gap-2 rounded-full bg-[#fff0a6] border border-[#111622]/25 p-1"
          >
            <button
              type="button"
              aria-label={copy.removeOneAria(item.name)}
              onClick={() => onQtyChange(item.id, -1)}
              className="w-10 h-10 rounded-full bg-[#f5f8fc] text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111622]"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-[#111622]">
              {copy.pickedLabel(qty)}
            </span>
            <button
              type="button"
              aria-label={copy.addOneAria(item.name)}
              onClick={() => onQtyChange(item.id, 1)}
              className="w-10 h-10 rounded-full bg-[#111622] text-[#f5f8fc] hover:bg-[#1e3557] transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111622]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => onQtyChange(item.id, 1)}
            className={`w-full min-h-[44px] rounded-full border px-4 py-2.5 font-sans text-[14px] font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark
                ? "border-[#f5f8fc]/20 bg-[#1a2436] hover:bg-[#fff0a6] hover:!text-[#111622] hover:border-[#fff0a6] text-[#f5f8fc] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#141b28]"
                : "border-[#111622]/20 bg-[#f5f8fc] hover:bg-[#111622] hover:text-[#f5f8fc] hover:border-[#111622] text-[#111622] focus-visible:ring-[#111622] focus-visible:ring-offset-2"
            }`}
          >
            <Plus className="w-4 h-4" />
            {addCtaLabel}
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

export default function AccessoriesShop() {
  const { lang } = useLang();
  const { isDark } = useTheme();
  const isVi = lang === "vi";
  const copy = ACCESSORIES_COPY[lang];
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedList, setCopiedList] = useState(false);
  const [clipboardFallback, setClipboardFallback] = useState<{
    source: "estimator" | "contact" | "discord";
    text: string;
  } | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeModalBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const previewItem = useMemo(
    () =>
      previewId
        ? copy.items.find((item) => item.id === previewId) ?? null
        : null,
    [copy.items, previewId]
  );

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  const openPreview = useCallback((id: string) => {
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPreviewId(id);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewId(null);
    window.requestAnimationFrame(() => {
      lastFocusedRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!previewId) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.requestAnimationFrame(() => {
      closeModalBtnRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePreview();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [previewId, closePreview]);

  const cartItems = useMemo(
    () =>
      copy.items
        .filter((item) => (quantities[item.id] ?? 0) > 0)
        .map((item) => ({
          item,
          qty: quantities[item.id],
        })),
    [copy.items, quantities]
  );

  const totalCount = useMemo(
    () => cartItems.reduce((sum, entry) => sum + entry.qty, 0),
    [cartItems]
  );

  const fixedSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, entry) =>
          entry.item.priceVnd !== null
            ? sum + entry.item.priceVnd * entry.qty
            : sum,
        0
      ),
    [cartItems]
  );

  const hasQuotedItem = useMemo(
    () => cartItems.some((entry) => entry.item.priceVnd === null),
    [cartItems]
  );

  const hasStartingPrice = useMemo(
    () => cartItems.some(({ item }) => Boolean(item.isStartingPrice)),
    [cartItems]
  );

  const estimatedSubtotalText = useMemo(() => {
    if (totalCount === 0) return copy.zeroPrice;
    const formatted = formatVnd(fixedSubtotal, lang);
    if (fixedSubtotal > 0 && hasQuotedItem && hasStartingPrice) {
      return copy.subtotalFromPlusQuoted(formatted);
    }
    if (fixedSubtotal > 0 && hasQuotedItem) {
      return copy.subtotalPlusQuoted(formatted);
    }
    if (fixedSubtotal > 0 && hasStartingPrice) {
      return copy.subtotalFrom(formatted);
    }
    if (fixedSubtotal > 0) {
      return formatted;
    }
    return copy.byQuote;
  }, [totalCount, fixedSubtotal, hasQuotedItem, hasStartingPrice, copy, lang]);

  const dmSummaryText = useMemo(() => {
    if (cartItems.length === 0) return "";
    const lines = cartItems.map(
      ({ item, qty }) => `- ${item.name} x${qty} (${item.priceLabel})`
    );
    const formattedSubtotal = formatVnd(fixedSubtotal, lang);
    let totalLine = copy.dmSubtotalByQuote;
    if (fixedSubtotal > 0 && hasQuotedItem && hasStartingPrice) {
      totalLine = copy.dmSubtotalFromQuoted(formattedSubtotal);
    } else if (fixedSubtotal > 0 && hasQuotedItem) {
      totalLine = copy.dmSubtotalQuoted(formattedSubtotal);
    } else if (fixedSubtotal > 0 && hasStartingPrice) {
      totalLine = copy.dmSubtotalFrom(formattedSubtotal);
    } else if (fixedSubtotal > 0) {
      totalLine = copy.dmSubtotalExact(formattedSubtotal);
    }
    return `${copy.dmHeader}\n${lines.join("\n")}\n${totalLine}`;
  }, [cartItems, fixedSubtotal, hasQuotedItem, hasStartingPrice, lang, copy]);

  const bundleSummary = useMemo(() => {
    if (cartItems.length === 0) return "";
    const parts = cartItems.map(
      ({ item, qty }) => `${item.name} x${qty} (${item.priceLabel})`
    );
    const label = copy.estimatedTotalLabel.replace(/^\[|\]$/g, "");
    return `${copy.bundleHeader}: ${parts.join(", ")} | ${label}: ${estimatedSubtotalText}`;
  }, [cartItems, copy.bundleHeader, copy.estimatedTotalLabel, estimatedSubtotalText]);

  const bundleHref = useMemo(
    () =>
      bundleSummary
        ? `/?addons=${encodeURIComponent(bundleSummary)}#contact`
        : "/#contact",
    [bundleSummary]
  );

  const emailFallbackHref = useMemo(() => {
    const subject = encodeURIComponent(copy.emailFallbackSubject);
    if (!dmSummaryText) {
      return `mailto:FluffNii.furries@gmail.com?subject=${subject}`;
    }
    const body = encodeURIComponent(dmSummaryText);
    return `mailto:FluffNii.furries@gmail.com?subject=${subject}&body=${body}`;
  }, [copy.emailFallbackSubject, dmSummaryText]);

  const setItemQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) {
        const rest = { ...prev };
        delete rest[id];
        return rest;
      }
      return { ...prev, [id]: Math.min(next, 20) };
    });
  };

  const removeItem = (id: string) => {
    setQuantities((prev) => {
      const rest = { ...prev };
      delete rest[id];
      return rest;
    });
  };

  const handleCopyDiscord = async () => {
    const ok = await writeToClipboard("crosstalk_f");
    if (ok) {
      setClipboardFallback(null);
      setCopiedDiscord(true);
      window.setTimeout(() => setCopiedDiscord(false), 1800);
      return;
    }
    setCopiedDiscord(false);
    setClipboardFallback({ source: "discord", text: "crosstalk_f" });
  };

  const handleCopyList = async (source: "estimator" | "contact") => {
    if (!dmSummaryText) return;
    const ok = await writeToClipboard(dmSummaryText);
    if (ok) {
      setClipboardFallback(null);
      setCopiedList(true);
      window.setTimeout(() => setCopiedList(false), 2000);
      return;
    }
    setCopiedList(false);
    setClipboardFallback({ source, text: dmSummaryText });
  };

  const scrollToContact = () => {
    const target = document.getElementById("accessories-contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToEstimator = () => {
    const target = document.getElementById("accessories-estimator");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      id="top"
      className={`min-h-screen flex flex-col selection:bg-[#fff0a6] selection:text-[#111622] ${
        isDark ? "bg-[#0b0f17] text-[#f5f8fc]" : "bg-[#f5f8fc] text-[#111622]"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
        className={`fixed top-0 left-0 right-0 h-[2.5px] origin-left z-[60] pointer-events-none ${
          isDark ? "bg-[#fff0a6]" : "bg-[#111622]"
        }`}
      />

      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-5 md:px-[56px] pt-[128px] md:pt-[148px] pb-[96px] md:pb-[132px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-[108px] lg:max-h-[calc(100vh-124px)] lg:overflow-y-auto no-scrollbar flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                  isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                }`}
              >
                {copy.eyebrow}
              </motion.span>

              <h1
                className={`font-stagheiz ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                } ${
                  isVi
                    ? "text-[33px] sm:text-[43px] xl:text-[48px] leading-[1.14] tracking-[-0.025em]"
                    : "text-[40px] sm:text-[52px] xl:text-[58px] leading-[0.94] tracking-[-0.04em]"
                }`}
              >
                {copy.headlineLines.map((line, li) => (
                  <span key={`${lang}-${li}`} className="block overflow-hidden pb-1.5 -mb-1.5">
                    {line.split(" ").map((word, wi, arr) => (
                      <React.Fragment key={`${li}-${wi}`}>
                        <motion.span
                          style={{ display: "inline-block" }}
                          initial={{ opacity: 0.001, y: "105%" }}
                          animate={{ opacity: 1, y: "0%" }}
                          transition={{
                            duration: 0.85,
                            delay: 0.06 + (li * 3 + wi) * 0.06,
                            ease: EASE,
                          }}
                        >
                          {word}
                        </motion.span>
                        {wi < arr.length - 1 ? " " : null}
                      </React.Fragment>
                    ))}
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                className={`font-sans text-[15px] md:text-[16px] leading-[1.58] max-w-[460px] ${
                  isDark ? "text-[#f5f8fc]/80" : "text-[#111622]/80"
                }`}
              >
                {copy.heroDesc}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className={`rounded-[14px] border px-3.5 py-2.5 font-sans text-[13px] leading-[1.5] max-w-[460px] ${
                  isDark
                    ? "bg-[#141b28] border-[#f5f8fc]/15 text-[#f5f8fc]/80"
                    : "bg-[#dce8f5]/75 border-[#111622]/15 text-[#111622]/80"
                }`}
              >
                {copy.partnerNote}
              </motion.p>
            </div>

            <div
              className={`flex flex-col border-t ${
                isDark ? "border-[#f5f8fc]/15" : "border-[#111622]/15"
              }`}
            >
              {copy.workshopNotes.map((row, idx) => (
                <motion.div
                  key={row.num}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + idx * 0.07,
                    ease: EASE,
                  }}
                  className={`py-2.5 border-b flex items-baseline gap-4 transition-[padding] duration-300 hover:pl-1.5 ${
                    isDark ? "border-[#f5f8fc]/15" : "border-[#111622]/15"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.06em] shrink-0 ${
                      isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                    }`}
                  >
                    {row.num}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={`font-sans text-[14px] font-medium ${
                        isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                      }`}
                    >
                      {row.title}
                    </span>
                    <span
                      className={`font-sans text-[13px] leading-[1.42] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      {row.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              id="accessories-estimator"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className={`rounded-[22px] border p-4 md:p-5 flex flex-col gap-3.5 scroll-mt-[110px] ${
                isDark
                  ? "bg-[#141b28] border-[#f5f8fc]/15"
                  : "bg-[#dce8f5] border-[#111622]/15"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.06em] inline-flex items-center gap-2 ${
                    isDark ? "text-[#f5f8fc]/80" : "text-[#111622]/80"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {copy.estimatorLabel}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full border font-mono text-[11px] uppercase tracking-[0.05em] ${
                    isDark
                      ? "bg-[#1a2436] border-[#f5f8fc]/15 text-[#f5f8fc]"
                      : "bg-[#f5f8fc] border-[#111622]/15 text-[#111622]"
                  }`}
                >
                  {totalCount} {totalCount === 1 ? copy.itemSingular : copy.itemPlural}
                </span>
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                {cartItems.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-[14px] border border-dashed px-3.5 py-3 font-sans text-[13px] leading-[1.48] ${
                      isDark
                        ? "border-[#f5f8fc]/20 bg-[#1a2436]/60 text-[#f5f8fc]/70"
                        : "border-[#111622]/20 bg-[#f5f8fc]/60 text-[#111622]/70"
                    }`}
                  >
                    {copy.estimatorEmpty}
                  </motion.p>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-2 max-h-[210px] overflow-y-auto pr-1"
                  >
                    {cartItems.map(({ item, qty }) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 rounded-[13px] border p-2 ${
                          isDark
                            ? "bg-[#1a2436] border-[#f5f8fc]/15"
                            : "bg-[#f5f8fc] border-[#111622]/15"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div
                            className={`w-10 h-10 rounded-[8px] overflow-hidden shrink-0 ${
                              isDark ? "bg-[#141b28]" : "bg-[#dce8f5]"
                            }`}
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.imageAlt}
                                width={item.imageWidth}
                                height={item.imageHeight}
                                loading="lazy"
                                decoding="async"
                                style={{
                                  objectPosition:
                                    item.imagePosition || "center center",
                                }}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <BlueprintVisual
                                variant={item.blueprint || "internal-fan"}
                                compact
                                badges={copy.blueprintBadges}
                                isDark={isDark}
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div
                              className={`font-sans text-[13px] font-medium truncate ${
                                isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                              }`}
                            >
                              {item.name}
                            </div>
                            <div
                              className={`font-mono text-[11px] ${
                                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                              }`}
                            >
                              {item.priceLabel}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 shrink-0 ml-auto">
                          <button
                            type="button"
                            aria-label={copy.decreaseAria(item.name)}
                            onClick={() => setItemQty(item.id, -1)}
                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                              isDark
                                ? "border-[#f5f8fc]/20 text-[#f5f8fc] hover:bg-[#fff0a6] hover:!text-[#111622] hover:border-[#fff0a6] focus-visible:ring-[#fff0a6]"
                                : "border-[#111622]/20 text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] focus-visible:ring-[#111622]"
                            }`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span
                            className={`w-6 text-center font-mono text-[12px] font-medium ${
                              isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                            }`}
                          >
                            {qty}
                          </span>
                          <button
                            type="button"
                            aria-label={copy.increaseAria(item.name)}
                            onClick={() => setItemQty(item.id, 1)}
                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                              isDark
                                ? "border-[#f5f8fc]/20 text-[#f5f8fc] hover:bg-[#fff0a6] hover:!text-[#111622] hover:border-[#fff0a6] focus-visible:ring-[#fff0a6]"
                                : "border-[#111622]/20 text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] focus-visible:ring-[#111622]"
                            }`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            aria-label={copy.removeItemAria(item.name)}
                            onClick={() => removeItem(item.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                              isDark
                                ? "text-[#f5f8fc]/70 hover:text-[#f5f8fc] hover:bg-[#233047] focus-visible:ring-[#fff0a6]"
                                : "text-[#111622]/70 hover:text-[#111622] hover:bg-[#dce8f5]/70 focus-visible:ring-[#111622]"
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`pt-2.5 border-t flex flex-col gap-1 ${
                  isDark ? "border-[#f5f8fc]/15" : "border-[#111622]/15"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.06em] ${
                      isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                    }`}
                  >
                    {copy.estimatedTotalLabel}
                  </span>
                  <span
                    className={`font-stagheiz tracking-[-0.02em] text-right ${
                      isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                    } ${isVi ? "text-[19px] leading-[1.14]" : "text-[21px]"}`}
                  >
                    {estimatedSubtotalText}
                  </span>
                </div>
                <p
                  className={`font-sans text-[12px] ${
                    isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                  }`}
                >
                  {copy.currencyNote}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href={bundleHref}
                  className={`group w-full min-h-[48px] inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border-[1.5px] transition-colors duration-300 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isDark
                      ? "theme-butter-card border-[#fff0a6] bg-[#fff0a6] text-[#111622] hover:!bg-[#f5f8fc] hover:!border-[#f5f8fc] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#141b28]"
                      : "border-[#111622] bg-[#111622] text-[#f5f8fc] hover:bg-[#1e3557] hover:border-[#1e3557] focus-visible:ring-[#111622] focus-visible:ring-offset-2"
                  }`}
                >
                  <span className="font-sans text-[15px] font-semibold leading-none tracking-[-0.01em]">
                    {copy.bundleCta}
                  </span>
                  <ArrowRight className="w-[18px] h-[18px] stroke-[1.75] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <button
                  type="button"
                  onClick={scrollToContact}
                  className={`group w-full min-h-[48px] inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border-[1.5px] bg-transparent transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isDark
                      ? "border-[#f5f8fc]/35 text-[#f5f8fc] hover:bg-[#f5f8fc] hover:!text-[#111622] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#141b28]"
                      : "border-[#111622] text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] focus-visible:ring-[#111622] focus-visible:ring-offset-2"
                  }`}
                >
                  <span className="font-sans text-[15px] font-semibold leading-snug tracking-[-0.01em] text-center">
                    {copy.orderCta}
                  </span>
                  <ArrowRight className="w-[18px] h-[18px] stroke-[1.75] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>

                {cartItems.length > 0 && (
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => handleCopyList("estimator")}
                      className={`min-h-[40px] px-2 -ml-2 rounded-[10px] inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.05em] underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                        isDark
                          ? "text-[#fff0a6] hover:text-[#f5f8fc] focus-visible:ring-[#fff0a6]"
                          : "text-[#111622] hover:text-[#1e3557] focus-visible:ring-[#111622]"
                      }`}
                    >
                      {copiedList ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          {copy.copiedList}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          {copy.copyList}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setQuantities({});
                        setClipboardFallback((prev) =>
                          prev?.source === "estimator" ? null : prev
                        );
                      }}
                      className={`min-h-[40px] px-2 -mr-2 rounded-[10px] font-mono text-[11px] uppercase tracking-[0.05em] underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                        isDark
                          ? "text-[#f5f8fc]/70 hover:text-[#f5f8fc] focus-visible:ring-[#fff0a6]"
                          : "text-[#111622]/70 hover:text-[#111622] focus-visible:ring-[#111622]"
                      }`}
                    >
                      {copy.clearList}
                    </button>
                  </div>
                )}

                {clipboardFallback?.source === "estimator" && (
                  <ClipboardFallbackBox
                    text={clipboardFallback.text}
                    prompt={copy.clipboardBlockedPrompt}
                    closeAria={copy.closeFallbackAria}
                    onClose={() => setClipboardFallback(null)}
                    dark={isDark}
                    rows={4}
                  />
                )}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-14">
            <section
              aria-label={copy.catalogTitle}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-mono text-[12px] uppercase tracking-[0.06em] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      ({copy.catalogNum})
                    </span>
                    <h2
                      className={`font-stagheiz ${
                        isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                      } ${
                        isVi
                          ? "text-[24px] sm:text-[29px] leading-[1.14] tracking-[-0.02em]"
                          : "text-[28px] sm:text-[34px] leading-[0.98] tracking-[-0.03em]"
                      }`}
                    >
                      {copy.catalogTitle}
                    </h2>
                  </div>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.06em] shrink-0 ${
                      isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                    }`}
                  >
                    [{copy.items.length} {copy.piecesLabel}]
                  </span>
                </div>
                <p
                  className={`font-sans text-[14px] leading-[1.5] ${
                    isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
                  }`}
                >
                  {copy.catalogSubtitle}
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.85, ease: EASE }}
                  className={`h-px w-full origin-left ${
                    isDark ? "bg-[#f5f8fc]/20" : "bg-[#111622]/20"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 items-stretch">
                {copy.items.map((item, idx) => (
                  <AccessoryCard
                    key={item.id}
                    item={item}
                    qty={quantities[item.id] ?? 0}
                    idx={idx}
                    isVi={isVi}
                    isDark={isDark}
                    copy={copy}
                    onQtyChange={setItemQty}
                    onPreview={openPreview}
                  />
                ))}
              </div>
            </section>

            <motion.section
              id="accessories-contact"
              initial={{ opacity: 0.001, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative overflow-hidden rounded-[26px] bg-[#111622] text-[#f5f8fc] p-6 sm:p-8 md:p-10 border border-[#f5f8fc]/15 flex flex-col gap-6 scroll-mt-[110px]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-[280px] h-[280px] rounded-full bg-[#1e3557]/45 blur-[80px]"
              />

              <div className="relative z-10 flex flex-col gap-2.5">
                <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] text-[#fff0a6]">
                  {copy.contactEyebrow}
                </span>
                <h2
                  className={`font-stagheiz text-[#f5f8fc] ${
                    isVi
                      ? "text-[29px] sm:text-[38px] leading-[1.14] tracking-[-0.02em]"
                      : "text-[34px] sm:text-[44px] leading-[0.96] tracking-[-0.03em]"
                  }`}
                >
                  {copy.contactTitle}
                </h2>
                <p className="font-sans text-[15px] leading-[1.58] text-[#f5f8fc]/80 max-w-[540px]">
                  {copy.contactDesc}
                </p>
                <p className="font-sans text-[13px] leading-[1.52] text-[#f5f8fc]/70 max-w-[560px]">
                  {copy.contactPartnerNote}
                </p>
              </div>

              {cartItems.length > 0 && (
                <div className="relative z-10 rounded-[16px] bg-[#f5f8fc]/[0.08] border border-[#f5f8fc]/15 p-4 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#fff0a6]">
                        {copy.readyForDm(totalCount)} · {estimatedSubtotalText}
                      </span>
                      <div className="font-sans text-[13px] text-[#f5f8fc]/85 truncate">
                        {cartItems
                          .map(({ item, qty }) => `${item.name} x${qty}`)
                          .join(", ")}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopyList("contact")}
                        className="theme-butter-card min-h-[40px] inline-flex items-center gap-2 rounded-full bg-[#fff0a6] hover:!bg-[#f5f8fc] text-[#111622] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.05em] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111622]"
                      >
                        {copiedList ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            {copy.copiedList}
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            {copy.copyList}
                          </>
                        )}
                      </button>
                      <Link
                        href={bundleHref}
                        className="min-h-[40px] inline-flex items-center gap-2 rounded-full border border-[#f5f8fc]/30 bg-transparent hover:bg-[#f5f8fc] text-[#f5f8fc] hover:!text-[#111622] px-4 py-2 font-sans text-[13px] font-medium transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111622]"
                      >
                        <span>{copy.bundleCta}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {(clipboardFallback?.source === "contact" ||
                clipboardFallback?.source === "discord") && (
                <div className="relative z-10">
                  <ClipboardFallbackBox
                    text={clipboardFallback.text}
                    prompt={copy.clipboardBlockedPrompt}
                    closeAria={copy.closeFallbackAria}
                    onClose={() => setClipboardFallback(null)}
                    dark
                    rows={clipboardFallback.source === "discord" ? 1 : 4}
                  />
                </div>
              )}

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {DIRECT_CONTACTS.map((contact, idx) => {
                  const cardClass = `group flex items-center justify-between gap-3 rounded-[16px] bg-[#f5f8fc]/[0.07] border border-[#f5f8fc]/15 px-4 py-3.5 min-h-[56px] text-left transition-colors duration-300 hover:border-[#fff0a6]/80 hover:bg-[#f5f8fc]/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111622] ${
                    contact.spanFull ? "sm:col-span-2" : ""
                  }`;

                  if ("copyText" in contact && contact.copyText) {
                    return (
                      <motion.button
                        key={contact.label}
                        type="button"
                        onClick={handleCopyDiscord}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className={`${cardClass} cursor-pointer`}
                      >
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#f5f8fc]/70 mb-0.5">
                            [{contact.label}]
                          </div>
                          <div className="font-sans text-[15px] font-medium text-[#f5f8fc] group-hover:text-[#fff0a6] transition-colors truncate">
                            {contact.value}
                          </div>
                        </div>
                        {copiedDiscord ? (
                          <span className="theme-butter-card inline-flex items-center gap-1 rounded-full bg-[#fff0a6] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[#111622] shrink-0">
                            <Check className="w-3 h-3" />
                            {copy.copiedShort}
                          </span>
                        ) : (
                          <Copy className="w-4 h-4 text-[#f5f8fc]/70 group-hover:text-[#fff0a6] transition-colors shrink-0" />
                        )}
                      </motion.button>
                    );
                  }

                  return (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0.001, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.04,
                        ease: EASE,
                      }}
                      className={cardClass}
                    >
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#f5f8fc]/70 mb-0.5">
                          [{contact.label}]
                        </div>
                        <div className="font-sans text-[15px] font-medium text-[#f5f8fc] group-hover:text-[#fff0a6] transition-colors truncate">
                          {contact.value}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#f5f8fc]/70 group-hover:text-[#fff0a6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                    </motion.a>
                  );
                })}
              </div>

              <div className="relative z-10 pt-2 border-t border-[#f5f8fc]/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 font-sans text-[13px] text-[#f5f8fc]/75">
                  <Mail className="w-4 h-4 text-[#fff0a6] shrink-0" />
                  <span>{copy.emailFallbackLabel}</span>
                  <a
                    href={emailFallbackHref}
                    className="font-mono text-[12px] text-[#fff0a6] hover:underline underline-offset-4 break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] rounded"
                  >
                    FluffNii.furries@gmail.com
                  </a>
                </div>
                <Link
                  href={bundleHref}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.05em] text-[#f5f8fc] hover:text-[#fff0a6] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] rounded"
                >
                  <span>{copy.bundleCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      {totalCount > 0 && (
        <div
          className={`fixed bottom-0 inset-x-0 z-50 lg:hidden backdrop-blur-md border-t px-4 py-3 ${
            isDark
              ? "bg-[#141b28]/95 border-[#f5f8fc]/15 shadow-[0_-8px_28px_rgba(0,0,0,0.45)]"
              : "bg-[#f5f8fc]/95 border-[#111622]/15 shadow-[0_-8px_28px_rgba(17,22,34,0.12)]"
          }`}
        >
          <div className="max-w-[680px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={scrollToEstimator}
              aria-label={copy.stickyReviewAria}
              className={`min-h-[44px] px-2.5 py-1.5 -ml-1 rounded-[12px] text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                isDark
                  ? "hover:bg-[#1a2436]/80 focus-visible:ring-[#fff0a6]"
                  : "hover:bg-[#dce8f5]/70 focus-visible:ring-[#111622]"
              }`}
            >
              <div
                className={`font-mono text-[10px] uppercase tracking-[0.06em] ${
                  isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                }`}
              >
                {totalCount} {totalCount === 1 ? copy.itemSingular : copy.itemPlural} · {copy.stickyReviewLabel}
              </div>
              <div
                className={`font-stagheiz text-[17px] ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                } ${isVi ? "leading-[1.14]" : "leading-tight"}`}
              >
                {estimatedSubtotalText}
              </div>
            </button>
            <Link
              href={bundleHref}
              className={`min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-sans text-[13px] font-semibold transition-colors no-underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDark
                  ? "theme-butter-card bg-[#fff0a6] hover:!bg-[#f5f8fc] text-[#111622] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#141b28]"
                  : "bg-[#111622] hover:bg-[#1e3557] text-[#f5f8fc] focus-visible:ring-[#111622] focus-visible:ring-offset-2"
              }`}
            >
              <span>{copy.bundleCta}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      )}

      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={closePreview}
            className={`fixed inset-0 z-[70] backdrop-blur-md flex items-center justify-center p-4 sm:p-6 ${
              isDark ? "bg-[#06090f]/80" : "bg-[#111622]/75"
            }`}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={previewItem.name}
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-[24px] border shadow-[0_24px_60px_rgba(17,22,34,0.35)] ${
                isDark
                  ? "bg-[#141b28] text-[#f5f8fc] border-[#f5f8fc]/15"
                  : "bg-[#f5f8fc] text-[#111622] border-[#111622]/15"
              }`}
            >
              <button
                ref={closeModalBtnRef}
                type="button"
                aria-label={copy.closePreviewAria}
                onClick={closePreview}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full border transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                  isDark
                    ? "bg-[#141b28]/90 border-[#f5f8fc]/20 text-[#f5f8fc] hover:bg-[#fff0a6] hover:!text-[#111622] hover:border-[#fff0a6] focus-visible:ring-[#fff0a6]"
                    : "bg-[#f5f8fc]/90 border-[#111622]/20 text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] focus-visible:ring-[#111622]"
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div
                className={`relative aspect-[16/11] w-full overflow-hidden ${
                  isDark ? "bg-[#1a2436]" : "bg-[#dce8f5]"
                }`}
              >
                {previewItem.image ? (
                  <img
                    src={previewItem.image}
                    alt={previewItem.imageAlt}
                    width={previewItem.imageWidth}
                    height={previewItem.imageHeight}
                    decoding="async"
                    style={{
                      objectPosition:
                        previewItem.imagePosition || "center center",
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BlueprintVisual
                    variant={previewItem.blueprint || "internal-fan"}
                    badges={copy.blueprintBadges}
                    isDark={isDark}
                  />
                )}
                <span
                  className={`absolute top-4 left-4 px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-[0.06em] ${getStatusBadgeClass(
                    previewItem.status,
                    isDark
                  )}`}
                >
                  {previewItem.code} · {previewItem.statusBadge}
                </span>
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.06em] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      [{previewItem.subtitle} · {previewItem.statusBadge}]
                    </span>
                    <h3
                      className={`font-stagheiz ${
                        isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                      } ${
                        isVi
                          ? "text-[24px] leading-[1.14] tracking-[-0.02em]"
                          : "text-[28px] leading-[1.02] tracking-[-0.03em]"
                      }`}
                    >
                      {previewItem.name}
                    </h3>
                    <p
                      className={`font-sans text-[14px] leading-[1.55] max-w-[440px] ${
                        isDark ? "text-[#f5f8fc]/80" : "text-[#111622]/80"
                      }`}
                    >
                      {previewItem.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                    <span
                      className={`font-mono text-[15px] font-bold ${
                        isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                      }`}
                    >
                      {previewItem.priceLabel}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-sans text-[11.5px] ${
                        isDark
                          ? "bg-[#1a2436] text-[#f5f8fc]/80"
                          : "bg-[#dce8f5]/75 text-[#111622]/75"
                      }`}
                    >
                      {previewItem.note}
                    </span>
                  </div>
                </div>

                {previewItem.specs.length > 0 && (
                  <ul
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-dashed ${
                      isDark ? "border-[#f5f8fc]/15" : "border-[#111622]/15"
                    }`}
                  >
                    {previewItem.specs.map((spec, specIdx) => (
                      <li
                        key={`${previewItem.id}-modal-spec-${specIdx}`}
                        className={`flex items-start gap-2 font-sans text-[13px] leading-[1.45] ${
                          isDark ? "text-[#f5f8fc]/85" : "text-[#111622]/85"
                        }`}
                      >
                        <Check
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isDark ? "text-[#fff0a6]" : "text-[#111622]"
                          }`}
                        />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setItemQty(previewItem.id, 1);
                      closePreview();
                    }}
                    className={`w-full sm:w-auto min-h-[44px] rounded-full px-5 py-2.5 font-sans text-[14px] font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isDark
                        ? "theme-butter-card bg-[#fff0a6] hover:!bg-[#f5f8fc] text-[#111622] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#141b28]"
                        : "bg-[#111622] hover:bg-[#1e3557] text-[#f5f8fc] focus-visible:ring-[#111622] focus-visible:ring-offset-2"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    {previewItem.status === "available"
                      ? copy.addToEstimate
                      : copy.addInterestCta}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={totalCount > 0 ? "bg-[#111622] pb-[124px] lg:pb-0" : ""}>
        <Footer />
      </div>
    </div>
  );
}
