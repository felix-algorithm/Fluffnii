"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Copy, ExternalLink, Info, Mail } from "lucide-react";
import ScrollWordReveal from "@/components/motion/ScrollWordReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import {
  CountryPhoneField209,
  LucianContactInput,
  LucianContactTextarea,
} from "@/components/LucianContactFields";
import { useDeviceTier } from "@/lib/deviceTier";
import { useSmoothScroll } from "@/lib/smoothScroll";
import {
  localizeCommissionNote,
  type ContactErrorCode,
  type HomeLocaleCopy,
} from "@/lib/homeCopy";
import { clearUrlHash } from "@/lib/sectionScroll";
import type { Lang } from "@/components/LanguageProvider";
import { cn } from "@/lib/cn";

interface SubmittedSummary {
  name: string;
  species: string;
  email: string;
  commissionTypes: string[];
  isWaitlist: boolean;
}

const CONTACT_DRAFT_KEY = "fluffnii-contact-draft";
const BODY_DTD_OPTIONS = new Set(["Only body", "Half-body", "Fullsuit"]);
const EMAIL_REGEX = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;
const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || "";
const HAS_RECAPTCHA_SITE_KEY = Boolean(
  RECAPTCHA_SITE_KEY && !RECAPTCHA_SITE_KEY.startsWith("your_")
);
const RECAPTCHA_ACTION = "contact_quote";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;

const CONTACT_EYEBROW_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-cream/75";
const FORM_LABEL_CLASS =
  "font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-cream/80";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

let recaptchaScriptPromise: Promise<void> | null = null;

function ensureRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("RECAPTCHA_NO_WINDOW"));
  }
  if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
    return Promise.resolve();
  }
  if (recaptchaScriptPromise) {
    return recaptchaScriptPromise;
  }

  recaptchaScriptPromise = new Promise<void>((resolve, reject) => {
    const src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
      siteKey
    )}`;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-recaptcha-v3="true"]'
    );
    if (existing) {
      if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
        resolve();
        return;
      }
      const onLoad = () => resolve();
      const onError = () => {
        recaptchaScriptPromise = null;
        reject(new Error("RECAPTCHA_SCRIPT_ERROR"));
      };
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-recaptcha-v3", "true");
    script.onload = () => resolve();
    script.onerror = () => {
      recaptchaScriptPromise = null;
      script.remove();
      reject(new Error("RECAPTCHA_SCRIPT_ERROR"));
    };
    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

function executeRecaptchaV3(siteKey: string, action: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let settled = false;
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error("RECAPTCHA_TIMEOUT"));
    }, 10000);

    ensureRecaptchaScript(siteKey)
      .then(() => {
        const grecaptcha = window.grecaptcha;
        if (!grecaptcha || typeof grecaptcha.ready !== "function") {
          if (!settled) {
            settled = true;
            window.clearTimeout(timer);
            reject(new Error("RECAPTCHA_NOT_READY"));
          }
          return;
        }
        grecaptcha.ready(() => {
          grecaptcha
            .execute(siteKey, { action })
            .then((token) => {
              if (settled) return;
              settled = true;
              window.clearTimeout(timer);
              resolve(typeof token === "string" ? token.trim() : "");
            })
            .catch((err) => {
              if (settled) return;
              settled = true;
              window.clearTimeout(timer);
              reject(err);
            });
        });
      })
      .catch((err) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        reject(err);
      });
  });
}

function isValidHttpUrl(raw: string): boolean {
  try {
    const parsed = new URL(raw);
    return (
      (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      Boolean(parsed.hostname && parsed.hostname.includes("."))
    );
  } catch {
    return false;
  }
}

export interface ContactQuoteSectionProps {
  copy: HomeLocaleCopy;
  lang: Lang;
  commissionStatus: {
    open: boolean;
    note: string;
    noteVi: string;
    loaded: boolean;
  };
  selectedParts: string[];
  onChangeSelectedParts: React.Dispatch<React.SetStateAction<string[]>>;
}

function ContactQuoteSection({
  copy,
  lang,
  commissionStatus,
  selectedParts,
  onChangeSelectedParts,
}: ContactQuoteSectionProps) {
  const isVi = lang === "vi";
  const { isReducedMotion } = useDeviceTier();
  const { scrollToSection } = useSmoothScroll();

  const [nameValue, setNameValue] = useState("");
  const [speciesValue, setSpeciesValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [facebookValue, setFacebookValue] = useState("");
  const [refLinkValue, setRefLinkValue] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const [websiteTrap, setWebsiteTrap] = useState("");

  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [recaptchaRunning, setRecaptchaRunning] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [partsError, setPartsError] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] =
    useState<SubmittedSummary | null>(null);
  const [copiedErrorText, setCopiedErrorText] = useState(false);
  const [copyFallbackText, setCopyFallbackText] = useState<string | null>(null);
  const [showContactValidation, setShowContactValidation] = useState(false);

  const draftHydratedRef = useRef(false);
  const hydrationStartedRef = useRef(false);
  const onChangeSelectedPartsRef = useRef(onChangeSelectedParts);
  onChangeSelectedPartsRef.current = onChangeSelectedParts;
  const scrollToSectionRef = useRef(scrollToSection);
  scrollToSectionRef.current = scrollToSection;
  const isSubmittingRef = useRef(false);
  const startedAtRef = useRef<number>(Date.now());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const speciesInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const refLinkInputRef = useRef<HTMLInputElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);
  const partsGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!HAS_RECAPTCHA_SITE_KEY || typeof window === "undefined") return;
    ensureRecaptchaScript(RECAPTCHA_SITE_KEY).catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || hydrationStartedRef.current) return;
    hydrationStartedRef.current = true;

    let restoredNotes = "";
    try {
      const rawDraft = window.sessionStorage.getItem(CONTACT_DRAFT_KEY);
      if (rawDraft) {
        const parsed = JSON.parse(rawDraft) as Partial<{
          name: string;
          species: string;
          email: string;
          phone: string;
          facebook: string;
          refLink: string;
          message: string;
          selectedParts: string[];
        }>;
        if (typeof parsed.name === "string") setNameValue(parsed.name);
        if (typeof parsed.species === "string") setSpeciesValue(parsed.species);
        if (typeof parsed.email === "string") setEmailValue(parsed.email);
        if (typeof parsed.phone === "string") setPhoneValue(parsed.phone);
        if (typeof parsed.facebook === "string")
          setFacebookValue(parsed.facebook);
        if (typeof parsed.refLink === "string") setRefLinkValue(parsed.refLink);
        if (typeof parsed.message === "string") {
          restoredNotes = parsed.message;
          setNotesValue(parsed.message);
        }
        if (Array.isArray(parsed.selectedParts)) {
          const validParts = parsed.selectedParts.filter(
            (v): v is string => typeof v === "string"
          );
          if (validParts.length > 0) {
            onChangeSelectedPartsRef.current((prev) =>
              prev.length > 0 ? prev : validParts
            );
          }
        }
      }
    } catch {
    }

    const params = new URLSearchParams(window.location.search);
    const addonsParam = params.get("addons")?.trim();
    if (addonsParam) {
      if (!restoredNotes.includes(addonsParam)) {
        const nextNotes = restoredNotes
          ? `${restoredNotes}\n\n${addonsParam}`
          : addonsParam;
        setNotesValue(nextNotes);
      }
      window.setTimeout(() => {
        scrollToSectionRef.current("contact");
        clearUrlHash();
      }, 120);
    }

    draftHydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!draftHydratedRef.current || typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(
        CONTACT_DRAFT_KEY,
        JSON.stringify({
          name: nameValue,
          species: speciesValue,
          email: emailValue,
          phone: phoneValue,
          facebook: facebookValue,
          refLink: refLinkValue,
          message: notesValue,
          selectedParts,
        })
      );
    } catch {
    }
  }, [
    nameValue,
    speciesValue,
    emailValue,
    phoneValue,
    facebookValue,
    refLinkValue,
    notesValue,
    selectedParts,
  ]);

  useEffect(() => {
    if (formState === "sent" && selectedParts.length > 0) {
      setSubmittedSummary(null);
      setFormState("idle");
      setFormError(null);
      setPartsError(null);
    }
  }, [formState, selectedParts]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPickParts = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (Array.isArray(customEvent.detail) && customEvent.detail.length > 0) {
        setSubmittedSummary(null);
        setFormState("idle");
        setFormError(null);
        setPartsError(null);
        onChangeSelectedParts(customEvent.detail);
      }
    };
    window.addEventListener("fluffnii:pick-parts", onPickParts);
    return () => window.removeEventListener("fluffnii:pick-parts", onPickParts);
  }, [onChangeSelectedParts]);

  const togglePart = (part: string) => {
    setPartsError(null);
    setFormError(null);
    onChangeSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((item) => item !== part) : [...prev, part]
    );
  };

  const hasDtdSelection = selectedParts.some((item) =>
    BODY_DTD_OPTIONS.has(item)
  );

  const buildPlainInquiryText = () => {
    const lines = [
      `Name / handle: ${nameValue.trim() || "-"}`,
      `Species: ${speciesValue.trim() || "-"}`,
      `Email: ${emailValue.trim() || "-"}`,
      phoneValue.trim() ? `Phone: ${phoneValue.trim()}` : null,
      facebookValue.trim() ? `Social / DM: ${facebookValue.trim()}` : null,
      `Ref link: ${refLinkValue.trim() || "-"}`,
      `Commission type: ${selectedParts.join(", ") || "-"}`,
      `Notes: ${notesValue.trim() || "-"}`,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleCopyInquiry = async () => {
    const text = buildPlainInquiryText();
    setCopyFallbackText(null);
    setCopiedErrorText(false);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedErrorText(true);
      window.setTimeout(() => setCopiedErrorText(false), 2600);
    } catch {
      setCopyFallbackText(text);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingRef.current || formState === "sending") return;

    const trimmedName = nameValue.trim();
    const trimmedSpecies = speciesValue.trim();
    const trimmedEmail = emailValue.trim();
    const trimmedPhone = phoneValue.trim();
    const trimmedFacebook = facebookValue.trim();
    const trimmedRefLink = refLinkValue.trim();
    const trimmedNotes = notesValue.trim();

    setFormError(null);
    setPartsError(null);
    setCopyFallbackText(null);

    if (
      !trimmedName ||
      !trimmedSpecies ||
      !trimmedEmail ||
      !trimmedRefLink ||
      !trimmedNotes
    ) {
      setShowContactValidation(true);
      setFormError(copy.contactErrors.MISSING_FIELDS);
      if (!trimmedName) nameInputRef.current?.focus();
      else if (!trimmedSpecies) speciesInputRef.current?.focus();
      else if (!trimmedEmail) emailInputRef.current?.focus();
      else if (!trimmedRefLink) refLinkInputRef.current?.focus();
      else notesInputRef.current?.focus();
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setShowContactValidation(true);
      setFormError(copy.contactErrors.INVALID_EMAIL);
      emailInputRef.current?.focus();
      return;
    }

    if (!isValidHttpUrl(trimmedRefLink)) {
      setShowContactValidation(true);
      setFormError(
        isVi
          ? "Bạn dán giúp mình link ref sheet đầy đủ (bắt đầu bằng https://) nhé."
          : "Please enter a valid ref sheet link starting with https://."
      );
      refLinkInputRef.current?.focus();
      return;
    }

    if (selectedParts.length === 0) {
      setPartsError(copy.contactErrors.MISSING_TYPES);
      setFormError(copy.contactErrors.MISSING_TYPES);
      partsGroupRef.current?.scrollIntoView({
        behavior: isReducedMotion ? "auto" : "smooth",
        block: "center",
      });
      return;
    }

    isSubmittingRef.current = true;
    setFormState("sending");

    let recaptchaToken = "";
    if (HAS_RECAPTCHA_SITE_KEY) {
      setRecaptchaRunning(true);
      try {
        recaptchaToken = await executeRecaptchaV3(
          RECAPTCHA_SITE_KEY,
          RECAPTCHA_ACTION
        );
      } catch {
        recaptchaToken = "";
      }
      if (!recaptchaToken) {
        setFormError(copy.contactErrors.RECAPTCHA_FAILED);
        setFormState("idle");
        setRecaptchaRunning(false);
        isSubmittingRef.current = false;
        return;
      }
      setRecaptchaRunning(false);
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          name: trimmedName,
          species: trimmedSpecies,
          email: trimmedEmail,
          phone: trimmedPhone,
          facebook: trimmedFacebook,
          refLink: trimmedRefLink,
          commissionTypes: selectedParts,
          message: trimmedNotes,
          lang,
          website: websiteTrap,
          startedAt: startedAtRef.current,
          recaptchaToken,
          recaptchaAction: RECAPTCHA_ACTION,
        }),
      });

      const result = (await res.json().catch(() => null)) as {
        ok?: boolean;
        isWaitlist?: boolean;
        errorCode?: ContactErrorCode;
      } | null;

      if (!res.ok || !result?.ok) {
        const code = result?.errorCode;
        const localizedMsg =
          (code && copy.contactErrors[code]) || copy.errorFallback;
        setFormError(localizedMsg);
        setFormState("idle");
        return;
      }

      setSubmittedSummary({
        name: trimmedName,
        species: trimmedSpecies,
        email: trimmedEmail,
        commissionTypes: [...selectedParts],
        isWaitlist: Boolean(result.isWaitlist),
      });
      setNameValue("");
      setSpeciesValue("");
      setEmailValue("");
      setPhoneValue("");
      setFacebookValue("");
      setRefLinkValue("");
      setNotesValue("");
      onChangeSelectedParts([]);
      setWebsiteTrap("");
      setShowContactValidation(false);
      setFormError(null);
      setPartsError(null);
      try {
        window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
      } catch {
      }
      setFormState("sent");
    } catch {
      setFormError(copy.errorNetwork);
      setFormState("idle");
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleResetAfterSubmit = () => {
    setSubmittedSummary(null);
    setFormState("idle");
    setShowContactValidation(false);
    setFormError(null);
    setPartsError(null);
    startedAtRef.current = Date.now();
  };

  const mailtoRecoveryHref = `mailto:FluffNii.furries@gmail.com?subject=${encodeURIComponent(
    copy.errorMailSubject
  )}&body=${encodeURIComponent(buildPlainInquiryText())}`;

  return (
    <section
      id="contact"
      className="scroll-mt-24 w-full bg-ink text-cream py-24 md:py-[140px] px-5 md:px-14 dark:border-t dark:border-cream/[0.12]"
    >
      <div className="max-w-[1328px] mx-auto">
        <motion.div
          initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: isReducedMotion ? 0.01 : 0.85, ease: EASE }}
          className="flex items-center justify-between mb-8"
        >
          <span className={CONTACT_EYEBROW_CLASS}>{copy.contactEyebrow}</span>
          <span className={CONTACT_EYEBROW_CLASS}>(011)</span>
        </motion.div>

        <ScrollWordReveal
          text={copy.contactTitle}
          as="h2"
          className={cn(
            "font-stagheiz text-cream mb-10 md:mb-12",
            isVi
              ? "text-4xl sm:text-[56px] lg:text-[82px] leading-[1.16] tracking-[-0.02em] py-[0.06em]"
              : "text-[44px] sm:text-[68px] lg:text-[98px] leading-[0.94] tracking-[-0.01em]"
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {copy.quoteInfoPills.map((pill) => (
            <div
              key={pill.label}
              className="rounded-card-sm bg-cream/[0.06] border border-cream/[0.14] px-4 py-3.5 flex flex-col gap-1"
            >
              <span className="font-mono text-[11px] uppercase tracking-eyebrow text-butter">
                {pill.label}
              </span>
              <span className="font-sans text-sm leading-[1.4] text-cream/85">
                {pill.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <p className="font-sans text-[19px] md:text-[22px] desktop:text-[26px] leading-[1.3] tracking-tight text-cream/80 max-w-[520px]">
              {copy.contactIntro}
            </p>

            <div className="flex flex-col gap-5 pt-4 border-t border-cream/[0.16]">
              {copy.channels.map((channel) => (
                <div key={channel.label}>
                  <div className="font-mono text-[11px] md:text-xs desktop:text-[13px] uppercase tracking-eyebrow text-cream/70 mb-1">
                    {channel.label}
                  </div>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="font-sans text-[19px] md:text-[22px] desktop:text-[26px] font-normal leading-[1.3] tracking-tight text-cream hover:text-butter transition-colors break-words focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter rounded"
                  >
                    {channel.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {formState === "sent" && submittedSummary ? (
            <motion.div
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isReducedMotion ? 0.01 : 0.4, ease: EASE }}
              className="lg:col-span-7 flex flex-col gap-6 bg-cream/[0.06] border border-butter/40 rounded-card-lg p-6 sm:p-10"
            >
              <div className="flex items-start gap-4">
                <span className="theme-butter-card w-12 h-12 rounded-full bg-butter text-ink flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </span>
                <div className="flex flex-col gap-2">
                  <h3
                    className={cn(
                      "font-stagheiz text-[28px] sm:text-[34px] text-cream py-[0.04em]",
                      isVi ? "leading-[1.16]" : "leading-[1.02]"
                    )}
                  >
                    {submittedSummary.isWaitlist
                      ? copy.confirmWaitlistTitle
                      : copy.confirmTitle}
                  </h3>
                  <p className="font-sans text-[15px] sm:text-base leading-[1.55] text-cream/85">
                    {submittedSummary.isWaitlist
                      ? copy.confirmWaitlistDesc
                      : copy.confirmDesc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-card-sm bg-cream/[0.06] border border-cream/[0.14] p-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-eyebrow text-cream/70 mb-1">
                    {copy.confirmLabelName}
                  </div>
                  <div className="font-sans text-[15px] font-medium text-cream">
                    {submittedSummary.name}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-eyebrow text-cream/70 mb-1">
                    {copy.confirmLabelSpecies}
                  </div>
                  <div className="font-sans text-[15px] font-medium text-cream">
                    {submittedSummary.species}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-eyebrow text-cream/70 mb-1">
                    {copy.confirmLabelEmail}
                  </div>
                  <div className="font-sans text-[15px] font-medium text-cream break-all">
                    {submittedSummary.email}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-eyebrow text-cream/70 mb-1">
                    {copy.confirmLabelParts}
                  </div>
                  <div className="font-sans text-[15px] font-medium text-butter">
                    {submittedSummary.commissionTypes.join(", ")}
                  </div>
                </div>
              </div>

              <div>
                <MagneticButton as="span" strength={0.16}>
                  <button
                    type="button"
                    onClick={handleResetAfterSubmit}
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto sm:min-w-[260px] px-[26px] py-[17px] rounded-full bg-cream text-ink hover:bg-butter transition-colors font-sans text-[15px] font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <span>{copy.submitAnother}</span>
                    <ArrowRight className="w-[18px] h-[18px] shrink-0" />
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: isReducedMotion ? 0.01 : 0.85, ease: EASE }}
              onSubmit={handleContactSubmit}
              noValidate
              className="relative lg:col-span-7 flex flex-col gap-6 bg-cream/[0.04] border border-cream/[0.14] rounded-card-lg p-6 sm:p-10"
            >
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
              >
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    value={websiteTrap}
                    onChange={(e) => setWebsiteTrap(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="rounded-2xl bg-cream/[0.06] border border-cream/[0.16] px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      !commissionStatus.loaded
                        ? "bg-slate-400"
                        : commissionStatus.open
                        ? "bg-green-400"
                        : "bg-slate-400"
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-eyebrow",
                      !commissionStatus.loaded
                        ? "text-cream/75"
                        : "text-butter"
                    )}
                  >
                    {!commissionStatus.loaded
                      ? copy.statusChecking
                      : commissionStatus.open
                      ? copy.statusBadgeOpen
                      : copy.statusBadgeClosed}
                  </span>
                </div>
                {commissionStatus.loaded && (
                  <span className="font-sans text-[13px] text-cream/85">
                    {localizeCommissionNote(
                      commissionStatus.note,
                      commissionStatus.open,
                      lang,
                      commissionStatus.noteVi
                    )}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className={FORM_LABEL_CLASS}>{copy.fieldName}</span>
                  <LucianContactInput
                    ref={nameInputRef}
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={nameValue}
                    onChange={setNameValue}
                    placeholder={copy.placeholderName}
                    isValid={nameValue.trim().length >= 2}
                    isInvalid={nameValue.trim().length < 2}
                    forceShowError={showContactValidation}
                    hint={
                      isVi
                        ? "Nhập tên hoặc nickname của bạn."
                        : "Add your name or handle."
                    }
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={FORM_LABEL_CLASS}>{copy.fieldSpecies}</span>
                  <LucianContactInput
                    ref={speciesInputRef}
                    type="text"
                    name="species"
                    required
                    maxLength={120}
                    value={speciesValue}
                    onChange={setSpeciesValue}
                    placeholder={copy.placeholderSpecies}
                    isValid={speciesValue.trim().length >= 2}
                    isInvalid={speciesValue.trim().length < 2}
                    forceShowError={showContactValidation}
                    hint={
                      isVi
                        ? "Nhập loài nhân vật (sói, mèo, shiba...)."
                        : "Tell us your character's species."
                    }
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className={FORM_LABEL_CLASS}>{copy.fieldEmail}</span>
                  <LucianContactInput
                    ref={emailInputRef}
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                    value={emailValue}
                    onChange={setEmailValue}
                    placeholder={copy.placeholderEmail}
                    isValid={EMAIL_REGEX.test(emailValue.trim())}
                    isInvalid={!EMAIL_REGEX.test(emailValue.trim())}
                    forceShowError={showContactValidation}
                    hint={
                      isVi
                        ? "Nhập email đúng định dạng, ví dụ ten@email.com."
                        : "Enter a valid email like name@domain.com."
                    }
                  />
                </label>
                <div className="flex flex-col gap-2">
                  <span className={FORM_LABEL_CLASS}>{copy.fieldPhone}</span>
                  <CountryPhoneField209
                    value={phoneValue}
                    onChange={setPhoneValue}
                    lang={lang}
                    label={copy.fieldPhone}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className={FORM_LABEL_CLASS}>
                    {copy.fieldFacebook}
                  </span>
                  <LucianContactInput
                    type="text"
                    name="facebook"
                    maxLength={300}
                    value={facebookValue}
                    onChange={setFacebookValue}
                    placeholder={copy.placeholderFacebook}
                    isValid={facebookValue.trim().length >= 2}
                    isInvalid={
                      facebookValue.trim().length > 0 &&
                      facebookValue.trim().length < 2
                    }
                    hint={
                      isVi
                        ? "Nhập ít nhất 2 ký tự hoặc để trống."
                        : "Add at least 2 characters or leave blank."
                    }
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={FORM_LABEL_CLASS}>{copy.fieldRefLink}</span>
                  <LucianContactInput
                    ref={refLinkInputRef}
                    type="url"
                    name="refLink"
                    required
                    maxLength={500}
                    value={refLinkValue}
                    onChange={setRefLinkValue}
                    placeholder={copy.placeholderRefLink}
                    isValid={
                      refLinkValue.trim().length > 0 &&
                      isValidHttpUrl(refLinkValue.trim())
                    }
                    isInvalid={
                      !refLinkValue.trim() || !isValidHttpUrl(refLinkValue.trim())
                    }
                    forceShowError={showContactValidation}
                    hint={
                      isVi
                        ? "Dán link ref sheet bắt đầu bằng https://."
                        : "Paste your ref sheet link starting with https://."
                    }
                  />
                </label>
              </div>

              <div
                ref={partsGroupRef}
                role="group"
                aria-labelledby="commission-type-label"
                className="flex flex-col gap-2"
              >
                <span id="commission-type-label" className={FORM_LABEL_CLASS}>
                  {copy.fieldType}
                </span>
                <div className="flex flex-col gap-3">
                  {copy.commissionGroups.map((group) => (
                    <div
                      key={group.colsClass}
                      className={cn("grid gap-3", group.colsClass)}
                    >
                      {group.options.map((part) => {
                        const checked = selectedParts.includes(part.value);
                        return (
                          <label
                            key={part.value}
                            className={cn(
                              "h-full flex flex-col rounded-[14px] border px-4 py-3.5 cursor-pointer select-none transition-colors focus-within:ring-2 focus-within:ring-butter",
                              part.note ? "justify-start" : "justify-center",
                              checked
                                ? "bg-cream/[0.14] border-butter text-cream"
                                : "bg-cream/[0.08] border-cream/20 text-cream/90 hover:border-cream/45"
                            )}
                          >
                            <input
                              type="checkbox"
                              name="commissionType"
                              value={part.value}
                              checked={checked}
                              onChange={() => togglePart(part.value)}
                              className="sr-only"
                            />
                            <span className="flex items-center gap-3">
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-colors",
                                  checked
                                    ? "theme-butter-card bg-butter border-butter text-ink"
                                    : "border-cream/40 bg-transparent"
                                )}
                              >
                                {checked && (
                                  <Check className="w-3 h-3 stroke-[3]" />
                                )}
                              </span>
                              <span className="font-sans text-[15px] leading-snug whitespace-nowrap">
                                {part.label}
                              </span>
                            </span>
                            {part.note && (
                              <span
                                className={cn(
                                  "mt-1 pl-[30px] font-sans text-xs leading-[1.35]",
                                  checked ? "text-butter/90" : "text-cream/70"
                                )}
                              >
                                {part.note}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {partsError && (
                  <p
                    role="alert"
                    className="font-sans text-sm leading-[1.45] text-coral pt-1"
                  >
                    {partsError}
                  </p>
                )}

                {hasDtdSelection && (
                  <div className="mt-1 rounded-[14px] bg-butter/[0.12] border border-butter/35 px-4 py-3 flex items-start gap-3">
                    <Info className="w-4 h-4 mt-0.5 shrink-0 text-butter" />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[11px] uppercase tracking-eyebrow text-butter">
                        {copy.dtdCalloutTitle}
                      </span>
                      <p className="font-sans text-[13px] leading-[1.45] text-cream/90">
                        {copy.dtdCalloutBody}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <label className="flex flex-col gap-2">
                <span className={FORM_LABEL_CLASS}>{copy.fieldNotes}</span>
                <LucianContactTextarea
                  ref={notesInputRef}
                  name="message"
                  rows={4}
                  required
                  maxLength={4000}
                  value={notesValue}
                  onChange={setNotesValue}
                  placeholder={copy.placeholderNotes}
                  isValid={notesValue.trim().length >= 4}
                  isInvalid={notesValue.trim().length < 4}
                  forceShowError={showContactValidation}
                  hint={
                    isVi
                      ? "Ghi vài dòng về yêu cầu hoặc ý tưởng của bạn."
                      : "Write a short note about what you'd like built."
                  }
                />
              </label>

              <div className="pt-2 flex flex-col items-start gap-3">
                <p className="font-sans text-[13px] leading-normal text-cream/75">
                  {copy.termsNoticeBefore}
                  <Link
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-butter hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter rounded"
                  >
                    {copy.termsNoticeLink}
                  </Link>
                  .
                </p>
                <p className="font-sans text-xs leading-normal text-cream/55">
                  {copy.recaptchaNoticeBefore}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/80 hover:text-butter hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter rounded"
                  >
                    {copy.recaptchaPrivacyLabel}
                  </a>
                  {copy.recaptchaNoticeMid}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/80 hover:text-butter hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter rounded"
                  >
                    {copy.recaptchaTermsLabel}
                  </a>
                  {copy.recaptchaNoticeAfter}
                </p>

                <MagneticButton
                  as="div"
                  className="w-full sm:w-auto"
                  strength={0.16}
                  disabled={formState === "sending"}
                >
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="group inline-flex items-center justify-between gap-4 w-full sm:w-auto sm:min-w-[280px] px-[26px] py-[19px] rounded-full bg-cream text-ink hover:bg-butter transition-colors font-sans text-[15px] font-semibold cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <span>
                      {recaptchaRunning
                        ? copy.recaptchaVerifying
                        : formState === "sending"
                        ? copy.submitSending
                        : commissionStatus.loaded && !commissionStatus.open
                        ? copy.submitWaitlist
                        : copy.submitIdle}
                    </span>
                    <ArrowRight className="w-[18px] h-[18px] shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                </MagneticButton>

                {formError && (
                  <div
                    role="alert"
                    className="w-full rounded-card-sm bg-coral/[0.12] border border-coral/40 p-4 sm:p-5 flex flex-col gap-3 mt-1"
                  >
                    <p className="font-sans text-sm leading-normal text-coral">
                      {formError}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopyInquiry}
                        className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-cream text-ink hover:bg-butter font-sans text-[13px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter"
                      >
                        {copiedErrorText ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span>
                          {copiedErrorText
                            ? copy.copyInquiryDone
                            : copy.copyInquiryCta}
                        </span>
                      </button>

                      <span className="font-sans text-[13px] text-cream/75">
                        {copy.errorDirectNote}
                      </span>

                      <a
                        href={mailtoRecoveryHref}
                        className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-butter hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter rounded"
                      >
                        <Mail className="w-4 h-4" />
                        <span>FluffNii.furries@gmail.com</span>
                      </a>

                      <a
                        href="https://www.instagram.com/fluffnii.fur"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-butter hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter rounded"
                      >
                        <span>IG @fluffnii.fur</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {copyFallbackText && (
                      <div className="flex flex-col gap-1.5 pt-1">
                        <span className="font-sans text-xs text-cream/80">
                          {copy.copyInquiryFail}
                        </span>
                        <textarea
                          readOnly
                          rows={4}
                          value={copyFallbackText}
                          onFocus={(e) => e.currentTarget.select()}
                          className="w-full rounded-xl bg-ink border border-cream/25 p-3 font-mono text-xs text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butter"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

const MemoContactQuoteSection = React.memo(ContactQuoteSection);
MemoContactQuoteSection.displayName = "ContactQuoteSection";

export default MemoContactQuoteSection;
