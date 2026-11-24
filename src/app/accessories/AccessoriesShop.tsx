"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
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
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { useLang, type Lang } from "@/components/LanguageProvider";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { isModifiedClick } from "@/lib/sectionScroll";
import { cn } from "@/lib/cn";
import {
  ACCESSORIES_COPY,
  formatVnd,
  type AccessoryItem,
  type AccessoryStatus,
  type AccessoriesLocaleCopy,
} from "@/lib/accessoriesCopy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const INTRO_SEEN_KEY = "fluffnii-intro-seen";

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

const SHOP_UI_COPY: Record<
  Lang,
  {
    editionBannerTag: string;
    stepSpecsLabel: string;
  }
> = {
  en: {
    editionBannerTag: "FLUFFNII × @CROSSTALK_F",
    stepSpecsLabel: "Key Specs",
  },
  vi: {
    editionBannerTag: "FLUFFNII × @CROSSTALK_F",
    stepSpecsLabel: "Thông số chính",
  },
};

const ESTIMATOR_STEP_BTN_CLASS =
  "w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 border-ink/20 text-ink hover:bg-ink hover:text-cream focus-visible:ring-ink dark:border-cream/20 dark:text-cream dark:hover:bg-butter dark:hover:text-ink dark:hover:border-butter dark:focus-visible:ring-butter";

const NOTE_BADGE_CLASS =
  "px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider bg-taupe/75 text-ink/80 dark:bg-night-elevated dark:text-cream/85";

const SPEC_ITEM_CLASS =
  "flex items-start gap-2 font-sans text-[13px] leading-[1.48] text-fg/85";

function getStatusBadgeClass(status: AccessoryStatus): string {
  if (status === "coming-soon") {
    return "bg-ink text-butter font-bold border-ink dark:border-butter/45";
  }
  if (status === "custom") {
    return "theme-butter-card bg-butter/95 text-ink border-ink/20 font-medium";
  }
  return "bg-cream/95 text-ink border-ink/15 dark:bg-night-surface/95 dark:text-cream dark:border-cream/20 font-medium";
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
  alwaysDark = false,
  rows = 3,
}: {
  text: string;
  prompt: string;
  closeAria: string;
  onClose: () => void;
  alwaysDark?: boolean;
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
      className={cn(
        "rounded-2xl border p-3.5 flex flex-col gap-2",
        alwaysDark
          ? "bg-cream/[0.08] border-cream/20 text-cream"
          : "bg-cream border-ink/20 text-ink dark:bg-cream/[0.08] dark:border-cream/20 dark:text-cream"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p
          className={cn(
            "font-sans text-xs leading-[1.45] pt-1.5",
            alwaysDark ? "text-butter" : "text-ink/80 dark:text-butter"
          )}
        >
          {prompt}
        </p>
        <button
          type="button"
          aria-label={closeAria}
          onClick={onClose}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2",
            alwaysDark
              ? "text-cream/80 hover:bg-cream/15 hover:text-cream focus-visible:ring-butter"
              : "text-ink/70 hover:bg-taupe hover:text-ink focus-visible:ring-ink dark:text-cream/80 dark:hover:bg-cream/15 dark:hover:text-cream dark:focus-visible:ring-butter"
          )}
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
        className={cn(
          "w-full rounded-xl border px-3 py-2 font-mono text-xs leading-normal resize-none select-all focus-visible:outline-none focus-visible:ring-2",
          alwaysDark
            ? "bg-ink/80 border-cream/25 text-cream focus-visible:ring-butter"
            : "bg-white border-ink/20 text-ink focus-visible:ring-ink dark:bg-ink/80 dark:border-cream/25 dark:text-cream dark:focus-visible:ring-butter"
        )}
      />
    </div>
  );
}

function AccessoryCard({
  item,
  qty,
  idx,
  isVi,
  copy,
  ui,
  onQtyChange,
  onPreview,
}: {
  item: AccessoryItem;
  qty: number;
  idx: number;
  isVi: boolean;
  copy: AccessoriesLocaleCopy;
  ui: (typeof SHOP_UI_COPY)[Lang];
  onQtyChange: (id: string, delta: number) => void;
  onPreview: (id: string) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(255, 240, 166, 0.22), transparent 72%)`;

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
      initial={{ opacity: 0.001, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.65,
        delay: Math.min(idx * 0.06, 0.2),
        ease: EASE,
      }}
      className={cn(
        "group relative h-full flex flex-col justify-between rounded-[22px] border overflow-hidden transition-all duration-500 ease-studio hover:-translate-y-1 bg-white/95 dark:bg-night-surface/95",
        selected
          ? "border-ink shadow-[0_18px_38px_rgba(17,22,34,0.1)] dark:border-butter dark:shadow-[0_18px_38px_rgba(0,0,0,0.4)]"
          : "border-ink/15 hover:border-ink/40 hover:shadow-[0_16px_34px_rgba(17,22,34,0.07)] dark:border-cream/15 dark:hover:border-butter/45 dark:hover:shadow-[0_16px_34px_rgba(0,0,0,0.35)]"
      )}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlightBg }}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      />

      <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden bg-surface-alt">
        <button
          type="button"
          onClick={() => onPreview(item.id)}
          aria-label={copy.previewAria(item.name)}
          data-cursor-kind="inspect"
          className="relative w-full h-full block text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink dark:focus-visible:ring-butter"
        >
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
            className="w-full h-full object-cover transition-transform duration-700 ease-studio group-hover:scale-[1.05]"
          />
        </button>

        <span
          className={cn(
            "pointer-events-none absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-eyebrow",
            getStatusBadgeClass(item.status)
          )}
        >
          {item.code} · {item.statusBadge}
        </span>

        {selected && (
          <span className="pointer-events-none theme-butter-card absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-butter border border-ink/25 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-ink">
            {copy.inListLabel(qty)}
          </span>
        )}

        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-end gap-2 pointer-events-none">
          <button
            type="button"
            aria-label={copy.previewAria(item.name)}
            onClick={() => onPreview(item.id)}
            className="pointer-events-auto w-9 h-9 rounded-full border flex items-center justify-center opacity-90 lg:opacity-0 lg:translate-y-1.5 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 bg-cream/90 border-ink/15 text-ink hover:bg-ink hover:text-cream dark:bg-night-surface/90 dark:border-cream/20 dark:text-cream dark:hover:bg-butter dark:hover:text-ink cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative z-20 p-5 md:p-6 flex flex-col justify-between gap-4 flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-eyebrow text-fg/70">
              {item.subtitle}
            </span>
            <h3
              className={cn(
                "font-stagheiz text-fg",
                isVi
                  ? "text-xl xl:text-[21px] leading-[1.18] tracking-[-0.015em]"
                  : "text-[22px] xl:text-2xl leading-[1.04] tracking-[-0.03em]"
              )}
            >
              {item.name}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <span className="font-mono text-sm font-bold text-fg">
              {item.priceLabel}
            </span>
            <span className={NOTE_BADGE_CLASS}>{item.note}</span>
          </div>

          <p className="font-sans text-sm leading-[1.56] text-fg/80">
            {item.description}
          </p>

          {item.specs.length > 0 && (
            <div className="pt-3 border-t border-dashed border-fg/15 flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-eyebrow text-fg/60">
                {ui.stepSpecsLabel}
              </span>
              <ul className="flex flex-col gap-1.5">
                {item.specs.map((spec, specIdx) => (
                  <li
                    key={`${item.id}-spec-${specIdx}`}
                    className={SPEC_ITEM_CLASS}
                  >
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-ink dark:text-butter" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {selected ? (
          <motion.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="theme-butter-card flex items-center justify-between gap-2 rounded-full bg-butter border border-ink/25 p-1"
          >
            <button
              type="button"
              aria-label={copy.removeOneAria(item.name)}
              onClick={() => onQtyChange(item.id, -1)}
              className="w-10 h-10 rounded-full bg-cream text-ink hover:bg-ink hover:text-cream transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
              {copy.pickedLabel(qty)}
            </span>
            <button
              type="button"
              aria-label={copy.addOneAria(item.name)}
              onClick={() => onQtyChange(item.id, 1)}
              className="w-10 h-10 rounded-full bg-ink text-cream hover:bg-espresso transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Plus className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => onQtyChange(item.id, 1)}
            className="w-full min-h-11 rounded-full border px-4 py-2.5 font-sans text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-ink/20 bg-cream hover:bg-ink hover:text-cream hover:border-ink text-ink focus-visible:ring-ink focus-visible:ring-offset-cream dark:border-cream/20 dark:bg-night-elevated dark:hover:bg-butter dark:hover:text-ink dark:hover:border-butter dark:text-cream dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface"
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
  const router = useRouter();
  const { lang } = useLang();
  const { scrollTo } = useSmoothScroll();

  const isVi = lang === "vi";
  const copy = ACCESSORIES_COPY[lang];
  const ui = SHOP_UI_COPY[lang];

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedList, setCopiedList] = useState(false);
  const [clipboardFallback, setClipboardFallback] = useState<{
    source: "estimator" | "contact" | "discord";
    text: string;
  } | null>(null);
  const [previewItemId, setPreviewItemId] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeModalBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const previewItem = useMemo(
    () =>
      previewItemId
        ? copy.items.find((item) => item.id === previewItemId) ?? null
        : null,
    [copy.items, previewItemId]
  );

  const openPreview = useCallback((id: string) => {
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setPreviewItemId(id);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewItemId(null);
    window.requestAnimationFrame(() => {
      lastFocusedRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!previewItemId) return;
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
  }, [previewItemId, closePreview]);

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
  }, [
    totalCount,
    fixedSubtotal,
    hasQuotedItem,
    hasStartingPrice,
    copy,
    lang,
  ]);

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
  }, [
    cartItems,
    copy.bundleHeader,
    copy.estimatedTotalLabel,
    estimatedSubtotalText,
  ]);

  const bundleHref = useMemo(
    () =>
      bundleSummary
        ? `/?addons=${encodeURIComponent(bundleSummary)}`
        : "/#contact",
    [bundleSummary]
  );

  const handleBundleNavigate = useCallback(
    (e?: React.MouseEvent<HTMLAnchorElement>) => {
      if (e && isModifiedClick(e)) return;
      e?.preventDefault();
      try {
        window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        // Storage unavailable
      }
      router.push(bundleHref);
    },
    [bundleHref, router]
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
    scrollTo("#accessories-contact", { offset: -108 });
  };

  const scrollToEstimator = () => {
    scrollTo("#accessories-estimator", { offset: -108 });
  };

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col selection:bg-butter selection:text-ink bg-canvas text-fg"
    >
      <Navbar />

      <main className="flex-1 w-full">
        {/* Top Editorial Hero & Workshop Summary Card */}
        <section className="relative overflow-hidden border-b studio-hairline pt-[120px] md:pt-[140px] pb-10 md:pb-12">
          <span
            aria-hidden="true"
            className="studio-grid-bg absolute inset-0 pointer-events-none"
          />
          <div className="section-shell relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[11px] md:text-xs uppercase tracking-eyebrow text-fg/75">
                  {copy.eyebrow}
                </span>
                <span className="px-2.5 py-0.5 rounded-full border studio-hairline font-mono text-[10px] uppercase tracking-eyebrow bg-surface-alt/70 text-fg/80">
                  {ui.editionBannerTag}
                </span>
              </div>

              <ScrollWordReveal
                as="h1"
                immediate
                text={copy.headlineLines}
                className={cn(
                  "font-stagheiz text-fg text-studio-hero",
                  isVi && "leading-[1.18]"
                )}
              />

              <p className="font-sans text-[16px] md:text-[17px] leading-[1.6] max-w-[600px] text-fg/80">
                {copy.heroDesc}
              </p>
            </div>

            <div className="lg:col-span-5 rounded-[22px] border studio-hairline-strong bg-white/85 dark:bg-night-surface/90 p-5 sm:p-6 shadow-card flex flex-col gap-4">
              <p className="rounded-[14px] border studio-hairline px-3.5 py-3 font-sans text-[13.5px] leading-[1.55] bg-taupe/65 text-ink/85 dark:bg-night-elevated/80 dark:text-cream/85">
                {copy.partnerNote}
              </p>

              <div className="flex flex-col divide-y studio-hairline">
                {copy.workshopNotes.map((row) => (
                  <div
                    key={row.num}
                    className="py-3 first:pt-1 last:pb-0 flex items-baseline gap-3.5"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-eyebrow text-fg/65 shrink-0">
                      {row.num}
                    </span>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-sans text-sm font-semibold text-fg">
                        {row.title}
                      </span>
                      <span className="font-sans text-[13px] leading-[1.48] text-fg/75">
                        {row.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Estimator Workbench + Editorial Product Catalog */}
        <div className="section-shell py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Estimator Sidebar: below catalog on mobile, sticky left column on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-5 lg:sticky lg:top-[104px]">
              <motion.aside
                id="accessories-estimator"
                aria-label={copy.estimatorLabel}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
                className="rounded-[24px] border p-5 md:p-6 flex flex-col gap-4 scroll-mt-[110px] bg-taupe/85 border-ink/15 dark:bg-night-surface dark:border-cream/15 shadow-card"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-eyebrow inline-flex items-center gap-2 text-fg/85">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {copy.estimatorLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full border font-mono text-[11px] uppercase tracking-wider bg-cream border-ink/15 text-ink dark:bg-night-elevated dark:border-cream/15 dark:text-cream">
                    {totalCount}{" "}
                    {totalCount === 1 ? copy.itemSingular : copy.itemPlural}
                  </span>
                </div>

                <AnimatePresence mode="popLayout" initial={false}>
                  {cartItems.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-[16px] border border-dashed px-4 py-4 font-sans text-[13.5px] leading-[1.52] border-ink/20 bg-cream/65 text-ink/75 dark:border-cream/20 dark:bg-night-elevated/65 dark:text-cream/75"
                    >
                      {copy.estimatorEmpty}
                    </motion.p>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1"
                    >
                      {cartItems.map(({ item, qty }) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 rounded-[14px] border p-2.5 bg-cream border-ink/15 dark:bg-night-elevated dark:border-cream/15"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-surface-alt">
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
                            </div>
                            <div className="min-w-0">
                              <div className="font-sans text-[13px] font-medium truncate text-fg">
                                {item.name}
                              </div>
                              <div className="font-mono text-[11px] text-fg/70">
                                {item.priceLabel}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 shrink-0 ml-auto">
                            <button
                              type="button"
                              aria-label={copy.decreaseAria(item.name)}
                              onClick={() => setItemQty(item.id, -1)}
                              className={ESTIMATOR_STEP_BTN_CLASS}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center font-mono text-xs font-medium text-fg">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label={copy.increaseAria(item.name)}
                              onClick={() => setItemQty(item.id, 1)}
                              className={ESTIMATOR_STEP_BTN_CLASS}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              aria-label={copy.removeItemAria(item.name)}
                              onClick={() => removeItem(item.id)}
                              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 text-ink/70 hover:text-ink hover:bg-taupe/70 focus-visible:ring-ink dark:text-cream/70 dark:hover:text-cream dark:hover:bg-night-hover dark:focus-visible:ring-butter"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-3 border-t border-fg/15 flex flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-eyebrow text-fg/70">
                      {copy.estimatedTotalLabel}
                    </span>
                    <span
                      className={cn(
                        "font-stagheiz tracking-[-0.02em] text-right text-fg",
                        isVi ? "text-[19px] leading-[1.18]" : "text-[22px]"
                      )}
                    >
                      {estimatedSubtotalText}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-fg/75">
                    {copy.currencyNote}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <MagneticButton className="w-full" strength={0.14}>
                    <Link
                      href={bundleHref}
                      onClick={handleBundleNavigate}
                      className="group w-full min-h-12 inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border-[1.5px] transition-colors duration-300 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-ink bg-ink text-cream hover:bg-espresso hover:border-espresso focus-visible:ring-ink focus-visible:ring-offset-taupe dark:border-butter dark:bg-butter dark:text-ink dark:hover:bg-cream dark:hover:border-cream dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface"
                    >
                      <span className="font-sans text-[15px] font-semibold leading-none tracking-[-0.01em]">
                        {copy.bundleCta}
                      </span>
                      <ArrowRight className="w-[18px] h-[18px] stroke-[1.75] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="group w-full min-h-12 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full border-[1.5px] bg-transparent transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-ink text-ink hover:bg-ink hover:text-cream focus-visible:ring-ink focus-visible:ring-offset-taupe dark:border-cream/35 dark:text-cream dark:hover:bg-cream dark:hover:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface"
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
                        className="min-h-10 px-2 -ml-2 rounded-[10px] inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 text-ink hover:text-espresso focus-visible:ring-ink dark:text-butter dark:hover:text-cream dark:focus-visible:ring-butter"
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
                        className="min-h-10 px-2 -mr-2 rounded-[10px] font-mono text-[11px] uppercase tracking-wider underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 text-ink/70 hover:text-ink focus-visible:ring-ink dark:text-cream/70 dark:hover:text-cream dark:focus-visible:ring-butter"
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
                      rows={4}
                    />
                  )}
                </div>
              </motion.aside>
            </div>

            {/* Catalog + Direct Contact Hub */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col gap-12">
              <section
                aria-label={copy.catalogTitle}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs uppercase tracking-eyebrow text-fg/70">
                        ({copy.catalogNum})
                      </span>
                      <h2
                        className={cn(
                          "font-stagheiz text-fg",
                          isVi
                            ? "text-2xl sm:text-[29px] leading-[1.18] tracking-[-0.015em]"
                            : "text-[28px] sm:text-[34px] leading-[0.98] tracking-[-0.03em]"
                        )}
                      >
                        {copy.catalogTitle}
                      </h2>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-eyebrow shrink-0 text-fg/70">
                      [{copy.items.length} {copy.piecesLabel}]
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-normal text-ink/75 dark:text-cream/80">
                    {copy.catalogSubtitle}
                  </p>
                  <div className="studio-divider-x" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 items-stretch">
                  {copy.items.map((item, idx) => (
                    <AccessoryCard
                      key={item.id}
                      item={item}
                      qty={quantities[item.id] ?? 0}
                      idx={idx}
                      isVi={isVi}
                      copy={copy}
                      ui={ui}
                      onQtyChange={setItemQty}
                      onPreview={openPreview}
                    />
                  ))}
                </div>
              </section>

              <motion.section
                id="accessories-contact"
                initial={{ opacity: 0.001, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ duration: 0.75, ease: EASE }}
                className="relative overflow-hidden rounded-[26px] bg-ink dark:bg-night-surface text-cream p-6 sm:p-8 md:p-10 border border-cream/15 flex flex-col gap-6 scroll-mt-[110px]"
              >
                <span
                  aria-hidden="true"
                  className="studio-grid-bg absolute inset-0 pointer-events-none opacity-45"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 w-[280px] h-[280px] rounded-full bg-espresso/55 blur-[80px]"
                />

                <div className="relative z-10 flex flex-col gap-2.5">
                  <span className="font-mono text-[11px] md:text-xs uppercase tracking-eyebrow text-butter">
                    {copy.contactEyebrow}
                  </span>
                  <h2
                    className={cn(
                      "font-stagheiz text-cream",
                      isVi
                        ? "text-[29px] sm:text-[38px] leading-[1.18] tracking-[-0.015em]"
                        : "text-[34px] sm:text-[44px] leading-[0.98] tracking-[-0.03em]"
                    )}
                  >
                    {copy.contactTitle}
                  </h2>
                  <p className="font-sans text-[15px] leading-[1.6] text-cream/85 max-w-[540px]">
                    {copy.contactDesc}
                  </p>
                  <p className="font-sans text-[13px] leading-[1.54] text-cream/75 max-w-[560px]">
                    {copy.contactPartnerNote}
                  </p>
                </div>

                {cartItems.length > 0 && (
                  <div className="relative z-10 rounded-2xl bg-cream/[0.08] border border-cream/15 p-4 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-mono text-[10px] uppercase tracking-eyebrow text-butter">
                          {copy.readyForDm(totalCount)} · {estimatedSubtotalText}
                        </span>
                        <div className="font-sans text-[13px] text-cream/90 truncate">
                          {cartItems
                            .map(({ item, qty }) => `${item.name} x${qty}`)
                            .join(", ")}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopyList("contact")}
                          className="theme-butter-card min-h-10 inline-flex items-center gap-2 rounded-full bg-butter hover:bg-cream text-ink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
                          onClick={handleBundleNavigate}
                          className="min-h-10 inline-flex items-center gap-2 rounded-full border border-cream/30 bg-transparent hover:bg-cream text-cream hover:text-ink px-4 py-2 font-sans text-[13px] font-medium transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
                      alwaysDark
                      rows={clipboardFallback.source === "discord" ? 1 : 4}
                    />
                  </div>
                )}

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {DIRECT_CONTACTS.map((contact, idx) => {
                    const cardClass = cn(
                      "group flex items-center justify-between gap-3 rounded-2xl bg-cream/[0.07] border border-cream/15 px-4 py-3.5 min-h-14 text-left transition-colors duration-300 hover:border-butter/80 hover:bg-cream/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                      contact.spanFull && "sm:col-span-2"
                    );

                    if ("copyText" in contact && contact.copyText) {
                      return (
                        <motion.button
                          key={contact.label}
                          type="button"
                          onClick={handleCopyDiscord}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className={cn(cardClass, "cursor-pointer")}
                        >
                          <div className="min-w-0">
                            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-cream/70 mb-0.5">
                              [{contact.label}]
                            </div>
                            <div className="font-sans text-[15px] font-medium text-cream group-hover:text-butter transition-colors truncate">
                              {contact.value}
                            </div>
                          </div>
                          {copiedDiscord ? (
                            <span className="theme-butter-card inline-flex items-center gap-1 rounded-full bg-butter px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink shrink-0">
                              <Check className="w-3 h-3" />
                              {copy.copiedShort}
                            </span>
                          ) : (
                            <Copy className="w-4 h-4 text-cream/70 group-hover:text-butter transition-colors shrink-0" />
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
                          <div className="font-mono text-[10px] uppercase tracking-eyebrow text-cream/70 mb-0.5">
                            [{contact.label}]
                          </div>
                          <div className="font-sans text-[15px] font-medium text-cream group-hover:text-butter transition-colors truncate">
                            {contact.value}
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-cream/70 group-hover:text-butter group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                      </motion.a>
                    );
                  })}
                </div>

                <div className="relative z-10 pt-3 border-t border-cream/15 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 font-sans text-[13px] text-cream/80">
                    <Mail className="w-4 h-4 text-butter shrink-0" />
                    <span>{copy.emailFallbackLabel}</span>
                    <a
                      href={emailFallbackHref}
                      className="font-mono text-xs text-butter hover:underline underline-offset-4 break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter rounded"
                    >
                      FluffNii.furries@gmail.com
                    </a>
                  </div>
                  <Link
                    href={bundleHref}
                    onClick={handleBundleNavigate}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-cream hover:text-butter underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter rounded"
                  >
                    <span>{copy.bundleCta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Review Pill */}
      {totalCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden backdrop-blur-md border-t px-4 py-3 bg-cream/95 border-ink/15 shadow-[0_-8px_28px_rgba(17,22,34,0.12)] dark:bg-night-surface/95 dark:border-cream/15 dark:shadow-[0_-8px_28px_rgba(0,0,0,0.45)]">
          <div className="max-w-[680px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={scrollToEstimator}
              aria-label={copy.stickyReviewAria}
              className="min-h-11 px-2.5 py-1.5 -ml-1 rounded-xl text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 hover:bg-taupe/70 focus-visible:ring-ink dark:hover:bg-night-elevated/80 dark:focus-visible:ring-butter"
            >
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-fg/70">
                {totalCount}{" "}
                {totalCount === 1 ? copy.itemSingular : copy.itemPlural} ·{" "}
                {copy.stickyReviewLabel}
              </div>
              <div
                className={cn(
                  "font-stagheiz text-[17px] text-fg",
                  isVi ? "leading-[1.18]" : "leading-tight"
                )}
              >
                {estimatedSubtotalText}
              </div>
            </button>
            <Link
              href={bundleHref}
              onClick={handleBundleNavigate}
              className="min-h-11 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-sans text-[13px] font-semibold transition-colors no-underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-ink hover:bg-espresso text-cream focus-visible:ring-ink focus-visible:ring-offset-cream dark:bg-butter dark:hover:bg-cream dark:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface"
            >
              <span>{copy.bundleCta}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      )}

      {/* Lightbox Image Preview */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={closePreview}
            className="fixed inset-0 z-[80] backdrop-blur-md flex items-center justify-center p-4 sm:p-6 bg-ink/75 dark:bg-black/80"
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={previewItem.name}
              data-lenis-prevent=""
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-3xl border shadow-modal bg-surface text-fg border-fg/15"
            >
              <button
                ref={closeModalBtnRef}
                type="button"
                aria-label={copy.closePreviewAria}
                onClick={closePreview}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full border transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 bg-cream/90 border-ink/20 text-ink hover:bg-ink hover:text-cream focus-visible:ring-ink dark:bg-night-surface/90 dark:border-cream/20 dark:text-cream dark:hover:bg-butter dark:hover:text-ink dark:hover:border-butter dark:focus-visible:ring-butter"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[5/4] w-full overflow-hidden bg-surface-alt group">
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

                <span
                  className={cn(
                    "pointer-events-none absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-eyebrow",
                    getStatusBadgeClass(previewItem.status)
                  )}
                >
                  {previewItem.code} · {previewItem.statusBadge}
                </span>
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <span className="font-mono text-[11px] uppercase tracking-eyebrow text-fg/70">
                      [{previewItem.subtitle} · {previewItem.statusBadge}]
                    </span>
                    <h3
                      className={cn(
                        "font-stagheiz text-fg",
                        isVi
                          ? "text-2xl leading-[1.18] tracking-[-0.015em]"
                          : "text-[28px] leading-[1.02] tracking-[-0.03em]"
                      )}
                    >
                      {previewItem.name}
                    </h3>
                    <p className="font-sans text-sm leading-[1.58] max-w-[460px] text-fg/80">
                      {previewItem.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                    <span className="font-mono text-[15px] font-bold text-fg">
                      {previewItem.priceLabel}
                    </span>
                    <span className={NOTE_BADGE_CLASS}>
                      {previewItem.note}
                    </span>
                  </div>
                </div>

                {previewItem.specs.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-dashed border-fg/15">
                    {previewItem.specs.map((spec, specIdx) => (
                      <li
                        key={`${previewItem.id}-modal-spec-${specIdx}`}
                        className={SPEC_ITEM_CLASS}
                      >
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-ink dark:text-butter" />
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
                    className="w-full sm:w-auto min-h-11 rounded-full px-5 py-2.5 font-sans text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-ink hover:bg-espresso text-cream focus-visible:ring-ink focus-visible:ring-offset-cream dark:bg-butter dark:hover:bg-cream dark:text-ink dark:focus-visible:ring-butter dark:focus-visible:ring-offset-night-surface"
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

      <div className={totalCount > 0 ? "bg-ink dark:bg-night pb-[124px] lg:pb-0" : ""}>
        <Footer />
      </div>
    </div>
  );
}
