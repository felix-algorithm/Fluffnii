"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  ZoomIn,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Bouton from "@/components/Bouton";
import { useLang } from "@/components/LanguageProvider";
import {
  ACCESSORIES_COPY,
  formatVnd,
  type AccessoryItem,
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

function BlueprintVisual({
  variant,
  compact = false,
  badges,
}: {
  variant: BlueprintVariant;
  compact?: boolean;
  badges: Record<BlueprintVariant, string>;
}) {
  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(rgba(17, 22, 34, 0.14) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
      className="relative w-full h-full bg-[#dce8f5] flex items-center justify-center overflow-hidden p-6"
    >
      <div className="absolute inset-3 rounded-[14px] border border-[#111622]/10 pointer-events-none" />

      {variant === "muzzle-fan" && (
        <div className="relative flex items-center justify-center">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-[24px] border-2 border-[#111622]/80 bg-[#f5f8fc]/75 flex items-center justify-center shadow-[0_10px_28px_rgba(17,22,34,0.08)]">
            <svg
              viewBox="0 0 120 120"
              className="w-24 h-24 text-[#111622] transition-transform duration-1000 ease-out group-hover:rotate-[165deg]"
              fill="none"
            >
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M60 60 C55 38, 69 24, 79 30 C86 35, 75 52, 60 60Z"
                fill="#111622"
              />
              <path
                d="M60 60 C82 55, 96 69, 90 79 C85 86, 68 75, 60 60Z"
                fill="#111622"
              />
              <path
                d="M60 60 C65 82, 51 96, 41 90 C34 85, 45 68, 60 60Z"
                fill="#111622"
              />
              <path
                d="M60 60 C38 65, 24 51, 30 41 C35 34, 52 45, 60 60Z"
                fill="#111622"
              />
              <circle cx="60" cy="60" r="10" fill="#fff0a6" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </div>
          {!compact && (
            <span className="absolute -bottom-3 px-2.5 py-0.5 rounded-full bg-[#111622] text-[#fff0a6] font-mono text-[9px] uppercase tracking-[0.06em]">
              {badges["muzzle-fan"]}
            </span>
          )}
        </div>
      )}

      {variant === "dual-fan" && (
        <div className="relative flex items-center justify-center gap-3">
          {[0, 1].map((n) => (
            <div
              key={n}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] border-2 border-[#111622]/80 bg-[#f5f8fc]/75 flex items-center justify-center shadow-[0_8px_22px_rgba(17,22,34,0.08)]"
            >
              <svg
                viewBox="0 0 120 120"
                className="w-20 h-20 text-[#111622] transition-transform duration-1000 ease-out group-hover:rotate-[165deg]"
                fill="none"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
                <path
                  d="M60 60 C55 38, 69 24, 79 30 C86 35, 75 52, 60 60Z"
                  fill="#111622"
                />
                <path
                  d="M60 60 C82 55, 96 69, 90 79 C85 86, 68 75, 60 60Z"
                  fill="#111622"
                />
                <path
                  d="M60 60 C65 82, 51 96, 41 90 C34 85, 45 68, 60 60Z"
                  fill="#111622"
                />
                <path
                  d="M60 60 C38 65, 24 51, 30 41 C35 34, 52 45, 60 60Z"
                  fill="#111622"
                />
                <circle cx="60" cy="60" r="9" fill="#fff0a6" stroke="currentColor" strokeWidth="2.2" />
              </svg>
            </div>
          ))}
          {!compact && (
            <span className="absolute -bottom-3 px-2.5 py-0.5 rounded-full bg-[#111622] text-[#fff0a6] font-mono text-[9px] uppercase tracking-[0.06em]">
              {badges["dual-fan"]}
            </span>
          )}
        </div>
      )}

      {variant === "badge-clip" && (
        <div className="relative flex items-center justify-center">
          <div className="w-28 h-32 rounded-[16px] border-2 border-[#111622]/80 bg-[#f5f8fc]/85 flex flex-col items-center justify-between p-3 shadow-[0_10px_26px_rgba(17,22,34,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-3 group-hover:scale-[1.03]">
            <div className="w-8 h-2.5 rounded-full bg-[#111622]" />
            <div className="w-12 h-12 rounded-full bg-[#fff0a6] border-2 border-[#111622] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-[#111622]" />
            </div>
            <div className="w-16 h-2 rounded-full bg-[#111622]/20" />
          </div>
          {!compact && (
            <span className="absolute -bottom-3 px-2.5 py-0.5 rounded-full bg-[#111622] text-[#fff0a6] font-mono text-[9px] uppercase tracking-[0.06em]">
              {badges["badge-clip"]}
            </span>
          )}
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
  copy,
  onQtyChange,
  onPreview,
}: {
  item: AccessoryItem;
  qty: number;
  idx: number;
  isVi: boolean;
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
  const isFeatured = Boolean(item.featured);

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
      className={`group relative rounded-[22px] bg-white/88 border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
        isFeatured
          ? "sm:col-span-2 grid grid-cols-1 sm:grid-cols-12"
          : "flex flex-col"
      } ${
        selected
          ? "border-[#111622] shadow-[0_18px_38px_rgba(17,22,34,0.1)]"
          : "border-[#111622]/16 hover:border-[#111622]/40 hover:shadow-[0_16px_34px_rgba(17,22,34,0.07)]"
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
        className={`relative overflow-hidden bg-[#dce8f5] cursor-zoom-in block text-left ${
          isFeatured
            ? "sm:col-span-6 aspect-[4/3] sm:aspect-auto sm:min-h-[260px]"
            : "aspect-[4/3] w-full"
        }`}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt}
            style={{
              objectPosition: item.imagePosition || "center center",
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
          />
        ) : (
          <BlueprintVisual
            variant={item.blueprint || "muzzle-fan"}
            badges={copy.blueprintBadges}
          />
        )}

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#f5f8fc]/92 border border-[#111622]/14 font-mono text-[10px] uppercase tracking-[0.06em] text-[#111622]">
          {item.code} / {item.leadTime}
        </span>
        <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#f5f8fc]/90 border border-[#111622]/16 flex items-center justify-center text-[#111622] opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ZoomIn className="w-3.5 h-3.5" />
        </span>
        {selected && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#fff0a6] border border-[#111622]/25 font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-[#111622]">
            {copy.inListLabel(qty)}
          </span>
        )}
      </button>

      <div
        className={`relative z-20 p-5 md:p-6 flex flex-col justify-between gap-4 ${
          isFeatured ? "sm:col-span-6" : "flex-1"
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`font-stagheiz text-[#111622] ${
                isVi
                  ? `leading-[1.08] tracking-[-0.02em] ${
                      isFeatured ? "text-[22px] md:text-[24px]" : "text-[20px]"
                    }`
                  : `leading-[1.03] tracking-[-0.03em] ${
                      isFeatured ? "text-[26px] md:text-[28px]" : "text-[23px]"
                    }`
              }`}
            >
              {item.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span className="font-mono text-[14px] font-bold text-[#111622]">
              {item.priceLabel}
            </span>
            <span className="font-sans text-[12px] text-[#111622]/60">
              {item.note}
            </span>
          </div>

          <p className="font-sans text-[14px] leading-[1.55] text-[#111622]/76 pt-0.5">
            {item.description}
          </p>
        </div>

        {selected ? (
          <motion.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex items-center justify-between gap-2 rounded-full bg-[#fff0a6] border border-[#111622]/25 p-1.5"
          >
            <button
              type="button"
              aria-label={copy.removeOneAria(item.name)}
              onClick={() => onQtyChange(item.id, -1)}
              className="w-8 h-8 rounded-full bg-[#f5f8fc] text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors flex items-center justify-center cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-[#111622]">
              {copy.pickedLabel(qty)}
            </span>
            <button
              type="button"
              aria-label={copy.addOneAria(item.name)}
              onClick={() => onQtyChange(item.id, 1)}
              className="w-8 h-8 rounded-full bg-[#111622] text-[#f5f8fc] hover:bg-[#1e3557] transition-colors flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => onQtyChange(item.id, 1)}
            className="w-full rounded-full border border-[#111622]/22 bg-[#f5f8fc] hover:bg-[#111622] hover:text-[#f5f8fc] hover:border-[#111622] px-4 py-2.5 font-sans text-[14px] font-medium text-[#111622] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {copy.addToEstimate}
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

export default function AccessoriesShop() {
  const { lang } = useLang();
  const isVi = lang === "vi";
  const copy = ACCESSORIES_COPY[lang];
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedList, setCopiedList] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!previewId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewId]);

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

  const handleCopyDiscord = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("crosstalk_f").catch(() => {});
    }
    setCopiedDiscord(true);
    window.setTimeout(() => setCopiedDiscord(false), 1800);
  };

  const handleCopyList = () => {
    if (cartItems.length === 0) return;
    const lines = cartItems.map(
      ({ item, qty }) => `- ${item.name} x${qty} (${item.priceLabel})`
    );
    const formattedSubtotal = formatVnd(fixedSubtotal, lang);
    const totalLine =
      fixedSubtotal > 0
        ? hasQuotedItem
          ? copy.dmSubtotalQuoted(formattedSubtotal)
          : copy.dmSubtotalExact(formattedSubtotal)
        : copy.dmSubtotalByQuote;
    const summary = `${copy.dmHeader}\n${lines.join("\n")}\n${totalLine}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(summary).catch(() => {});
    }
    setCopiedList(true);
    window.setTimeout(() => setCopiedList(false), 2000);
  };

  const scrollToContact = () => {
    const target = document.getElementById("accessories-contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#111622] selection:bg-[#fff0a6] selection:text-[#111622]"
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#111622] origin-left z-[60] pointer-events-none"
      />

      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-5 md:px-[56px] pt-[128px] md:pt-[148px] pb-[96px] md:pb-[132px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-[108px] flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/65"
              >
                {copy.eyebrow}
              </motion.span>

              <h1
                className={`font-stagheiz text-[#111622] ${
                  isVi
                    ? "text-[33px] sm:text-[43px] xl:text-[48px] leading-[1.03] tracking-[-0.025em]"
                    : "text-[40px] sm:text-[52px] xl:text-[58px] leading-[0.94] tracking-[-0.04em]"
                }`}
              >
                {copy.headlineLines.map((line, li) => (
                  <span key={`${lang}-${li}`} className="block overflow-hidden pb-1 -mb-1">
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
                className="font-sans text-[15px] md:text-[16px] leading-[1.58] text-[#111622]/78 max-w-[440px]"
              >
                {copy.heroDesc}
              </motion.p>
            </div>

            <div className="flex flex-col border-t border-[#111622]/16">
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
                  className="py-2.5 border-b border-[#111622]/16 flex items-baseline gap-4 transition-[padding] duration-300 hover:pl-1.5"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
                    {row.num}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-sans text-[14px] font-medium text-[#111622]">
                      {row.title}
                    </span>
                    <span className="font-sans text-[13px] leading-[1.42] text-[#111622]/68">
                      {row.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className="rounded-[22px] bg-[#dce8f5] border border-[#111622]/16 p-4 md:p-5 flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/78 inline-flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {copy.estimatorLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f5f8fc] border border-[#111622]/14 font-mono text-[11px] uppercase tracking-[0.05em] text-[#111622]">
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
                    className="rounded-[14px] border border-dashed border-[#111622]/22 bg-[#f5f8fc]/60 px-3.5 py-3 font-sans text-[13px] leading-[1.48] text-[#111622]/68"
                  >
                    {copy.estimatorEmpty}
                  </motion.p>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-2 max-h-[175px] overflow-y-auto pr-1"
                  >
                    {cartItems.map(({ item, qty }) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="flex items-center justify-between gap-3 rounded-[13px] bg-[#f5f8fc] border border-[#111622]/12 p-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-[8px] overflow-hidden shrink-0 bg-[#dce8f5]">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.imageAlt}
                                style={{
                                  objectPosition:
                                    item.imagePosition || "center center",
                                }}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <BlueprintVisual
                                variant={item.blueprint || "muzzle-fan"}
                                compact
                                badges={copy.blueprintBadges}
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-sans text-[13px] font-medium text-[#111622] truncate">
                              {item.name}
                            </div>
                            <div className="font-mono text-[11px] text-[#111622]/65">
                              {item.priceLabel}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            aria-label={copy.decreaseAria(item.name)}
                            onClick={() => setItemQty(item.id, -1)}
                            className="w-6 h-6 rounded-full border border-[#111622]/20 flex items-center justify-center text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-mono text-[11px] font-medium text-[#111622]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            aria-label={copy.increaseAria(item.name)}
                            onClick={() => setItemQty(item.id, 1)}
                            className="w-6 h-6 rounded-full border border-[#111622]/20 flex items-center justify-center text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            aria-label={copy.removeItemAria(item.name)}
                            onClick={() => removeItem(item.id)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#111622]/45 hover:text-[#111622] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2.5 border-t border-[#111622]/16 flex items-baseline justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/65">
                  {copy.estimatedTotalLabel}
                </span>
                <span
                  className={`font-stagheiz tracking-[-0.02em] text-[#111622] ${
                    isVi ? "text-[19px]" : "text-[21px]"
                  }`}
                >
                  {fixedSubtotal > 0
                    ? formatVnd(fixedSubtotal, lang)
                    : hasQuotedItem
                    ? copy.byQuote
                    : copy.zeroPrice}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Bouton
                  title={copy.orderCta}
                  onClick={scrollToContact}
                  variant="primary"
                  fullWidth
                />
                {cartItems.length > 0 && (
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={handleCopyList}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.05em] text-[#111622] hover:text-[#1e3557] underline underline-offset-4 cursor-pointer"
                    >
                      {copiedList ? (
                        <>
                          <Check className="w-3 h-3" />
                          {copy.copiedList}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          {copy.copyList}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantities({})}
                      className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#111622]/60 hover:text-[#111622] underline underline-offset-4 cursor-pointer"
                    >
                      {copy.clearList}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-14">
            {copy.chapters.map((chapter) => {
              const chapterItems = copy.items.filter(
                (item) => item.chapter === chapter.key
              );
              return (
                <section
                  key={chapter.key}
                  aria-label={chapter.title}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/55">
                          ({chapter.num})
                        </span>
                        <h2
                          className={`font-stagheiz text-[#111622] ${
                            isVi
                              ? "text-[24px] sm:text-[29px] leading-[1.04] tracking-[-0.02em]"
                              : "text-[28px] sm:text-[34px] leading-[0.98] tracking-[-0.03em]"
                          }`}
                        >
                          {chapter.title}
                        </h2>
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
                        [{chapterItems.length} {copy.piecesLabel}]
                      </span>
                    </div>
                    <p className="font-sans text-[14px] leading-[1.5] text-[#111622]/68">
                      {chapter.subtitle}
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.85, ease: EASE }}
                      className="h-px w-full bg-[#111622]/18 origin-left"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    {chapterItems.map((item, idx) => (
                      <AccessoryCard
                        key={item.id}
                        item={item}
                        qty={quantities[item.id] ?? 0}
                        idx={idx}
                        isVi={isVi}
                        copy={copy}
                        onQtyChange={setItemQty}
                        onPreview={setPreviewId}
                      />
                    ))}
                  </div>
                </section>
              );
            })}

            <motion.section
              id="accessories-contact"
              initial={{ opacity: 0.001, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative overflow-hidden rounded-[26px] bg-[#111622] text-[#f5f8fc] p-6 sm:p-8 md:p-10 border border-[#f5f8fc]/16 flex flex-col gap-6 scroll-mt-[110px]"
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
                      ? "text-[29px] sm:text-[38px] leading-[1.03] tracking-[-0.02em]"
                      : "text-[34px] sm:text-[44px] leading-[0.96] tracking-[-0.03em]"
                  }`}
                >
                  {copy.contactTitle}
                </h2>
                <p className="font-sans text-[15px] leading-[1.58] text-[#f5f8fc]/74 max-w-[540px]">
                  {copy.contactDesc}
                </p>
              </div>

              {cartItems.length > 0 && (
                <div className="relative z-10 rounded-[16px] bg-[#f5f8fc]/8 border border-[#f5f8fc]/14 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#fff0a6]">
                      {copy.readyForDm(totalCount)}
                    </span>
                    <div className="font-sans text-[13px] text-[#f5f8fc]/85 truncate">
                      {cartItems
                        .map(({ item, qty }) => `${item.name} x${qty}`)
                        .join(", ")}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyList}
                    className="inline-flex items-center gap-2 rounded-full bg-[#fff0a6] hover:bg-[#f5f8fc] text-[#111622] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.05em] transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedList ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        {copy.copiedNote}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        {copy.copyNote}
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {DIRECT_CONTACTS.map((contact, idx) => {
                  const cardClass = `group flex items-center justify-between gap-3 rounded-[16px] bg-[#f5f8fc]/[0.07] border border-[#f5f8fc]/14 px-4 py-3.5 text-left transition-colors duration-300 hover:border-[#fff0a6]/80 hover:bg-[#f5f8fc]/[0.12] ${
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
                          <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#f5f8fc]/55 mb-0.5">
                            [{contact.label}]
                          </div>
                          <div className="font-sans text-[15px] font-medium text-[#f5f8fc] group-hover:text-[#fff0a6] transition-colors truncate">
                            {contact.value}
                          </div>
                        </div>
                        {copiedDiscord ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#fff0a6] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[#111622] shrink-0">
                            <Check className="w-3 h-3" />
                            {copy.copiedShort}
                          </span>
                        ) : (
                          <Copy className="w-4 h-4 text-[#f5f8fc]/55 group-hover:text-[#fff0a6] transition-colors shrink-0" />
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
                        <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#f5f8fc]/55 mb-0.5">
                          [{contact.label}]
                        </div>
                        <div className="font-sans text-[15px] font-medium text-[#f5f8fc] group-hover:text-[#fff0a6] transition-colors truncate">
                          {contact.value}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#f5f8fc]/55 group-hover:text-[#fff0a6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={() => setPreviewId(null)}
            className="fixed inset-0 z-[70] bg-[#111622]/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={previewItem.name}
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[680px] rounded-[24px] bg-[#f5f8fc] text-[#111622] border border-[#111622]/16 overflow-hidden shadow-[0_24px_60px_rgba(17,22,34,0.35)]"
            >
              <button
                type="button"
                aria-label={copy.closePreviewAria}
                onClick={() => setPreviewId(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#f5f8fc]/90 border border-[#111622]/18 text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-[16/11] w-full bg-[#dce8f5] overflow-hidden">
                {previewItem.image ? (
                  <img
                    src={previewItem.image}
                    alt={previewItem.imageAlt}
                    style={{
                      objectPosition:
                        previewItem.imagePosition || "center center",
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BlueprintVisual
                    variant={previewItem.blueprint || "muzzle-fan"}
                    badges={copy.blueprintBadges}
                  />
                )}
              </div>

              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/55">
                    [{previewItem.chapterLabel} · {previewItem.leadTime}]
                  </span>
                  <h3
                    className={`font-stagheiz text-[#111622] ${
                      isVi
                        ? "text-[24px] leading-[1.06] tracking-[-0.02em]"
                        : "text-[28px] leading-[1.02] tracking-[-0.03em]"
                    }`}
                  >
                    {previewItem.name}
                  </h3>
                  <p className="font-sans text-[14px] text-[#111622]/75 max-w-[420px]">
                    {previewItem.description}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <span className="font-mono text-[15px] font-bold text-[#111622]">
                    {previewItem.priceLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setItemQty(previewItem.id, 1);
                      setPreviewId(null);
                    }}
                    className="rounded-full bg-[#111622] hover:bg-[#1e3557] text-[#f5f8fc] px-5 py-2.5 font-sans text-[14px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    {copy.addToEstimate}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
