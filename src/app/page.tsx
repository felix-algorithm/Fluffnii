"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimationFrame, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Info,
  Mail,
  Pause,
  Play,
  ZoomIn,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Obturateur from "@/components/Obturateur";
import PolaroidsDefile from "@/components/PolaroidsDefile";
import PhraseScroll from "@/components/PhraseScroll";
import Compteur from "@/components/Compteur";
import MotDefilant from "@/components/MotDefilant";
import Deroule from "@/components/Deroule";
import FAQAccordion from "@/components/FAQAccordion";
import MiseAuPoint from "@/components/MiseAuPoint";
import Bouton from "@/components/Bouton";
import Footer from "@/components/Footer";
import ShowcaseLightbox, { type ShowcaseItem } from "@/components/ShowcaseLightbox";
import { useLang } from "@/components/LanguageProvider";
import { useTheme } from "@/components/CircularRevealToggle";
import {
  CountryPhoneField209,
  LucianContactInput,
  LucianContactTextarea,
} from "@/components/LucianContactFields";
import {
  HOME_COPY,
  localizeCommissionNote,
  type ContactErrorCode,
  type GalleryFilterId,
  type GalleryPhotoCopy,
} from "@/lib/homeCopy";

interface CommissionStatusState {
  open: boolean;
  note: string;
  noteVi: string;
  loaded: boolean;
}

interface SubmittedSummary {
  name: string;
  species: string;
  email: string;
  commissionTypes: string[];
  isWaitlist: boolean;
}

const CONTACT_DRAFT_KEY = "fluffnii-contact-draft";
const INTRO_SEEN_KEY = "fluffnii-intro-seen";
const BODY_DTD_OPTIONS = new Set(["Only body", "Half-body", "Fullsuit"]);
const EMAIL_REGEX = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;
const RESULT_CELL_DELAYS = [0, 0.04, 0.08, 0.12, 0.2, 0.16, 0.28, 0.24] as const;

function darkSurfaceBg(bg: string, dark: boolean): string {
  if (!dark) return bg;
  const normalized = bg.toLowerCase();
  if (normalized === "#f5f8fc") return "#141b28";
  if (normalized === "#ffffff") return "#182234";
  if (normalized === "#dce8f5") return "#1c283d";
  return bg;
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

function galleryItemToShowcase(item: GalleryPhotoCopy): ShowcaseItem {
  return {
    id: item.id,
    src: item.src,
    alt: item.alt,
    title: item.title,
    eyebrow: item.eyebrow,
    description: item.description,
    tags: item.tags,
    partValues: item.partValues,
    objectPosition: item.objectPosition,
  };
}

function WordReveal({
  text,
  className = "",
  staggerDelay = 0.05,
  yOffset = 40,
  threshold = 0.3,
}: {
  text: string | string[];
  className?: string;
  staggerDelay?: number;
  yOffset?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const lines = Array.isArray(text) ? text : [text];

  let wordIdx = 0;

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ").filter(Boolean);
        return (
          <React.Fragment key={li}>
            {li > 0 && <br />}
            {words.map((word, wi) => {
              const delay = wordIdx * staggerDelay;
              wordIdx += 1;
              return (
                <React.Fragment key={`${li}-${wi}`}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    initial={{ opacity: 0.001, y: yOffset }}
                    animate={
                      inView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0.001, y: yOffset }
                    }
                    transition={{
                      duration: 0.9,
                      delay,
                      ease: EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < words.length - 1 ? " " : null}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </h2>
  );
}

function CharReveal({
  text,
  className = "",
  staggerDelay = 0.05,
  yOffset = 100,
  threshold = 0.3,
}: {
  text: string | string[];
  className?: string;
  staggerDelay?: number;
  yOffset?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const lines = Array.isArray(text) ? text : [text];

  let charIdx = 0;

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ").filter(Boolean);
        return (
          <React.Fragment key={li}>
            {li > 0 && <br />}
            {words.map((word, wi) => (
              <React.Fragment key={`${li}-${wi}`}>
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char, ci) => {
                    const delay = charIdx * staggerDelay;
                    charIdx += 1;
                    return (
                      <motion.span
                        key={`${li}-${wi}-${ci}`}
                        style={{ display: "inline-block" }}
                        initial={{ opacity: 0.001, y: yOffset }}
                        animate={
                          inView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0.001, y: yOffset }
                        }
                        transition={{
                          duration: 0.9,
                          delay,
                          ease: EASE,
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
                {wi < words.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </h2>
  );
}

function SmoothTicker({
  renderItems,
  velocity,
  direction = "left",
  hoverModifier = 1,
  paused = false,
  gap,
  className = "",
}: {
  renderItems: (isClone: boolean) => React.ReactNode;
  velocity: number;
  direction?: "left" | "right";
  hoverModifier?: number;
  paused?: boolean;
  gap: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isInViewRef = useRef(true);
  const isDocHiddenRef = useRef(false);
  const prefersReducedRef = useRef(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const speedMultiplierRef = useRef(1);
  const offsetRef = useRef(0);
  const groupWidthRef = useRef(0);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const measure = () => {
      groupWidthRef.current = el.getBoundingClientRect().width;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    prefersReducedRef.current = mq?.matches ?? false;
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedRef.current = e.matches;
    };
    mq?.addEventListener("change", onMotionChange);

    isDocHiddenRef.current = document.hidden;
    const onVisibilityChange = () => {
      isDocHiddenRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const container = containerRef.current;
    let observer: IntersectionObserver | undefined;
    if (container && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInViewRef.current = entry.isIntersecting;
        },
        { rootMargin: "100px" }
      );
      observer.observe(container);
    }

    return () => {
      mq?.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer?.disconnect();
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (
      pausedRef.current ||
      !isInViewRef.current ||
      isDocHiddenRef.current ||
      prefersReducedRef.current
    ) {
      return;
    }

    const dt = Math.min(delta, 64) / 1000;
    const targetMultiplier = isHoveredRef.current ? hoverModifier : 1;
    speedMultiplierRef.current +=
      (targetMultiplier - speedMultiplierRef.current) * Math.min(1, dt * 8);

    const groupWidth =
      groupWidthRef.current || groupRef.current?.getBoundingClientRect().width || 0;
    if (!groupWidth || !trackRef.current) return;

    offsetRef.current =
      (offsetRef.current + velocity * speedMultiplierRef.current * dt) %
      groupWidth;

    const x =
      direction === "left"
        ? -offsetRef.current
        : -groupWidth + offsetRef.current;

    trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
  });

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden ${className}`}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div ref={trackRef} className="flex items-center w-max">
        <div
          ref={groupRef}
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {renderItems(false)}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {renderItems(true)}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {renderItems(true)}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { lang } = useLang();
  const { isDark } = useTheme();
  const isVi = lang === "vi";
  const copy = HOME_COPY[lang];

  const [heroReady, setHeroReady] = useState(false);
  const [heroInstant, setHeroInstant] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { once: true, amount: 0.08 });
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const fanSectionRef = useRef<HTMLElement>(null);
  const fanInView = useInView(fanSectionRef, { once: false, amount: 0.2 });
  const [hoveredFanIdx, setHoveredFanIdx] = useState<number | null>(null);
  const [idleFanIdx, setIdleFanIdx] = useState<number>(1);
  const idleFanIdxRef = useRef<number>(1);
  const [idleFanLifted, setIdleFanLifted] = useState<boolean>(false);

  const [galleryFilter, setGalleryFilter] = useState<GalleryFilterId>("all");
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [lightboxState, setLightboxState] = useState<{
    source: "projects" | "gallery";
    index: number;
  } | null>(null);

  const [commissionStatus, setCommissionStatus] =
    useState<CommissionStatusState>({
      open: true,
      note: "",
      noteVi: "",
      loaded: false,
    });

  const [nameValue, setNameValue] = useState("");
  const [speciesValue, setSpeciesValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [facebookValue, setFacebookValue] = useState("");
  const [refLinkValue, setRefLinkValue] = useState("");
  const [notesValue, setNotesValue] = useState("");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [websiteTrap, setWebsiteTrap] = useState("");

  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [partsError, setPartsError] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] =
    useState<SubmittedSummary | null>(null);
  const [copiedErrorText, setCopiedErrorText] = useState(false);
  const [copyFallbackText, setCopyFallbackText] = useState<string | null>(null);
  const [showContactValidation, setShowContactValidation] = useState(false);

  const draftHydratedRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const startedAtRef = useRef<number>(Date.now());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const speciesInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const refLinkInputRef = useRef<HTMLInputElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);
  const partsGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/commission-status", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then(
        (
          data: { open?: boolean; note?: string; noteVi?: string } | null
        ) => {
          if (!active) return;
          if (data && typeof data.open === "boolean") {
            setCommissionStatus({
              open: data.open,
              note: typeof data.note === "string" ? data.note : "",
              noteVi: typeof data.noteVi === "string" ? data.noteVi : "",
              loaded: true,
            });
          } else {
            setCommissionStatus((prev) => ({ ...prev, loaded: true }));
          }
        }
      )
      .catch(() => {
        if (active) {
          setCommissionStatus((prev) => ({ ...prev, loaded: true }));
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduced || !fanInView || hoveredFanIdx !== null) {
      setIdleFanLifted(false);
      return;
    }

    const cardCount = copy.fanCards.length;
    let holdTimer: number | null = null;
    let nextTimer: number | null = null;
    let cancelled = false;

    const runCycle = (startIdx: number, initialDelay: number) => {
      nextTimer = window.setTimeout(() => {
        if (cancelled) return;
        idleFanIdxRef.current = startIdx;
        setIdleFanIdx(startIdx);
        setIdleFanLifted(true);

        holdTimer = window.setTimeout(() => {
          if (cancelled) return;
          setIdleFanLifted(false);
          const nextIdx = (startIdx + 1) % cardCount;
          idleFanIdxRef.current = nextIdx;
          runCycle(nextIdx, 650);
        }, 1400);
      }, initialDelay);
    };

    runCycle(idleFanIdxRef.current, 650);

    return () => {
      cancelled = true;
      if (holdTimer !== null) window.clearTimeout(holdTimer);
      if (nextTimer !== null) window.clearTimeout(nextTimer);
    };
  }, [fanInView, hoveredFanIdx, copy.fanCards.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const win = window as Window & { __gioiaClic?: boolean };
    let introSeen = false;
    try {
      introSeen = window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      introSeen = false;
    }

    const hasHash = Boolean(window.location.hash);
    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const skipIntro =
      win.__gioiaClic === true ||
      (win.__gioiaClic !== false && introSeen) ||
      hasHash ||
      reducedMotion;

    if (skipIntro) {
      setHeroInstant(true);
      setHeroReady(true);
      return;
    }

    setHeroReady(false);
    const onClic = () => setHeroReady(true);
    window.addEventListener("gioia:clic", onClic);
    const fallback = window.setTimeout(() => setHeroReady(true), 1500);
    return () => {
      window.removeEventListener("gioia:clic", onClic);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
          setSelectedParts(
            parsed.selectedParts.filter((v): v is string => typeof v === "string")
          );
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
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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

  const togglePart = (part: string) => {
    setPartsError(null);
    setFormError(null);
    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((item) => item !== part) : [...prev, part]
    );
  };

  const jumpToContactWithParts = useCallback((parts: string[]) => {
    setSubmittedSummary(null);
    setFormState("idle");
    setFormError(null);
    setPartsError(null);
    if (parts.length > 0) {
      setSelectedParts(parts);
    }
    const target = document.getElementById("contact");
    target?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => {
      if (!nameInputRef.current?.value.trim()) {
        nameInputRef.current?.focus({ preventScroll: true });
      }
    }, 450);
  }, []);

  const projectLightboxItems: ShowcaseItem[] = useMemo(
    () =>
      copy.projects.map((proj, idx) => ({
        id: `proj-${idx}`,
        src: proj.img,
        alt: `${proj.client} (${proj.category})`,
        title: proj.client,
        eyebrow: `[${proj.category} · ${proj.year}]`,
        description: proj.summary,
        tags: proj.tags,
        partValues: proj.partValues,
        review: proj.review,
        author: proj.author,
        role: proj.role,
        objectPosition: proj.objectPosition,
      })),
    [copy.projects]
  );

  const allGalleryPhotos = useMemo(
    () => [...copy.galleryRow1, ...copy.galleryRow2],
    [copy.galleryRow1, copy.galleryRow2]
  );

  const filteredGalleryPhotos = useMemo(() => {
    if (galleryFilter === "all") return allGalleryPhotos;
    return allGalleryPhotos.filter((item) =>
      item.filterCategories.includes(galleryFilter)
    );
  }, [allGalleryPhotos, galleryFilter]);

  const activeLightboxItems: ShowcaseItem[] = useMemo(() => {
    if (!lightboxState) return [];
    if (lightboxState.source === "projects") return projectLightboxItems;
    const sourcePhotos =
      galleryFilter === "all" ? allGalleryPhotos : filteredGalleryPhotos;
    return sourcePhotos.map(galleryItemToShowcase);
  }, [
    lightboxState,
    projectLightboxItems,
    galleryFilter,
    allGalleryPhotos,
    filteredGalleryPhotos,
  ]);

  const scrollToProjectIndex = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(copy.projects.length - 1, idx));
    const cards = el.querySelectorAll<HTMLElement>("[data-project-card]");
    const card = cards[clamped];
    if (!card) return;
    const targetLeft = card.offsetLeft - el.offsetLeft;
    el.scrollTo({
      left: Math.max(0, targetLeft - (window.innerWidth >= 768 ? 56 : 20)),
      behavior: "smooth",
    });
    setActiveProjectIdx(clamped);
  };

  const scrollCarousel = (dir: -1 | 1) => {
    scrollToProjectIndex(activeProjectIdx + dir);
  };

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cards = Array.from(
      el.querySelectorAll<HTMLElement>("[data-project-card]")
    );
    if (cards.length === 0) return;
    const pad = window.innerWidth >= 768 ? 56 : 20;
    const scrollPos = el.scrollLeft + pad + 40;
    let closestIdx = 0;
    let minDist = Number.POSITIVE_INFINITY;
    cards.forEach((card, idx) => {
      const dist = Math.abs(card.offsetLeft - scrollPos);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });
    setActiveProjectIdx(closestIdx);
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
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    isSubmittingRef.current = true;
    setFormState("sending");

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
      setSelectedParts([]);
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

  const heroStatusClass = !commissionStatus.loaded
    ? isDark
      ? "bg-[#1a2436]/80 hover:bg-[#1a2436] border-[#f5f8fc]/[0.16] text-[#f5f8fc]"
      : "bg-[#dce8f5]/80 hover:bg-[#dce8f5] border-[#111622]/[0.16] text-[#111622]"
    : commissionStatus.open
    ? "theme-butter-card bg-[#fff0a6]/85 hover:bg-[#fff0a6] border-[#111622]/[0.16] text-[#111622]"
    : isDark
    ? "bg-[#1a2436] hover:bg-[#233047] border-[#f5f8fc]/[0.16] text-[#f5f8fc]"
    : "bg-[#dce8f5] hover:bg-[#dce8f5]/80 border-[#111622]/[0.16] text-[#111622]";

  const mailtoRecoveryHref = `mailto:FluffNii.furries@gmail.com?subject=${encodeURIComponent(
    copy.errorMailSubject
  )}&body=${encodeURIComponent(buildPlainInquiryText())}`;

  return (
    <div
      id="top"
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#0b0f17] text-[#f5f8fc]" : "bg-[#f5f8fc] text-[#111622]"
      }`}
    >
      <Obturateur
        couleurFond={isDark ? "#0b0f17" : "#F5F8FC"}
        couleurEncre={isDark ? "#f5f8fc" : "#111622"}
        couleurAccent={isDark ? "#fff0a6" : "#1E3557"}
        onComplete={() => setHeroReady(true)}
      />

      <Navbar />

      <main className="flex-1">
        <section className="w-full max-w-[1440px] mx-auto px-5 md:px-[56px] pt-[124px] md:pt-[148px] pb-[72px] md:pb-[108px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[56px] lg:gap-8 items-center">
            <div
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateY(28px)",
                transition: heroInstant
                  ? "none"
                  : "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
              }}
              className="lg:col-span-6 flex flex-col items-start gap-[26px]"
            >
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isDark
                    ? "focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#0b0f17]"
                    : "focus-visible:ring-[#111622] focus-visible:ring-offset-[#f5f8fc]"
                } ${heroStatusClass}`}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  {commissionStatus.loaded && commissionStatus.open && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      !commissionStatus.loaded
                        ? "bg-[#64748b]"
                        : commissionStatus.open
                        ? "bg-[#16a34a]"
                        : "bg-[#64748b]"
                    }`}
                  />
                </span>
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.06em] ${
                    commissionStatus.loaded && commissionStatus.open
                      ? "text-[#111622]"
                      : isDark
                      ? "text-[#f5f8fc]"
                      : "text-[#111622]"
                  }`}
                >
                  {!commissionStatus.loaded
                    ? copy.heroStatusChecking
                    : commissionStatus.open
                    ? copy.heroStatusOpen
                    : copy.heroStatusClosed}
                </span>
              </a>

              <p
                className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] leading-[1.3] uppercase tracking-[0.06em] ${
                  isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                }`}
              >
                {copy.heroEyebrow}
              </p>

              <h1
                className={`font-stagheiz ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                } ${
                  isVi
                    ? "text-[clamp(38px,11.2vw,52px)] sm:text-[70px] md:text-[84px] lg:text-[clamp(56px,6vw,92px)] min-[1400px]:text-[92px] leading-[1.14] tracking-[-0.025em]"
                    : "text-[clamp(44px,13vw,58px)] sm:text-[80px] md:text-[96px] lg:text-[clamp(66px,6.8vw,105px)] min-[1400px]:text-[105px] leading-[0.92] tracking-[-0.01em]"
                }`}
              >
                <span className="block whitespace-nowrap">{copy.heroTitle[0]}</span>
                <span className="block whitespace-nowrap">{copy.heroTitle[1]}</span>
              </h1>

              <p
                className={`font-sans font-normal text-[19px] md:text-[22px] min-[1200px]:text-[26px] leading-[1.3] tracking-[-0.025em] max-w-[540px] ${
                  isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
                }`}
              >
                {copy.heroDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Bouton
                  title={copy.heroContactCta}
                  href="/#contact"
                  variant="primary"
                />
                <Bouton
                  title={copy.heroProjectsCta}
                  href="/#projets"
                  variant="secondary"
                  showArrow={false}
                />
              </div>
            </div>

            <div className="lg:col-span-6 w-full h-[380px] sm:h-[460px] lg:h-[540px]">
              <PolaroidsDefile mode="pile" delay={1.8} speed={1} />
            </div>
          </div>
        </section>

        <section
          id="studio"
          className={`scroll-mt-24 w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[88px] md:py-[140px] border-t ${
            isDark ? "border-[#f5f8fc]/[0.16]" : "border-[#111622]/[0.16]"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-10 md:mb-14"
          >
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              {copy.studioEyebrow}
            </span>
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              (001)
            </span>
          </motion.div>

          <div className="mb-16 md:mb-24 max-w-[1180px]">
            <PhraseScroll
              key={lang}
              texte={copy.phraseText}
              surlignes1={copy.phraseHighlights1}
              couleur1="#DCE8F5"
              surlignes2={copy.phraseHighlights2}
              couleur2="#FFF0A6"
              tailleMax={isVi ? 44 : 52}
            />
          </div>

          <div className="mb-20 md:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[72px] items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.1, delay: 0, ease: EASE }}
                className={`lg:col-span-6 relative rounded-[18px] overflow-hidden aspect-[9/10] ${
                  isDark ? "bg-[#1a2436]" : "bg-[#dce8f5]"
                }`}
              >
                <img
                  src="/images/formula-fursuit.webp"
                  alt={copy.formulaAlt}
                  loading="lazy"
                  decoding="async"
                  width={750}
                  height={1000}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              <div className="lg:col-span-6 flex flex-col justify-center gap-7">
                <div className="flex flex-col gap-4">
                  <span
                    className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                      isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                    }`}
                  >
                    {copy.formulaEyebrow}
                  </span>
                  <h2
                    className={`font-stagheiz ${
                      isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                    } ${
                      isVi
                        ? "text-[26px] sm:text-[30px] md:text-[34px] min-[1200px]:text-[32px] leading-[1.14] tracking-[-0.025em]"
                        : "text-[30px] sm:text-[34px] md:text-[38px] min-[1200px]:text-[36px] leading-[1] tracking-[-0.04em]"
                    }`}
                  >
                    {copy.formulaTitleLines[0]}
                    <br />
                    {copy.formulaTitleLines[1]}
                  </h2>
                  <p
                    className={`font-sans text-[19px] md:text-[22px] min-[1200px]:text-[26px] leading-[1.3] tracking-[-0.025em] max-w-[560px] ${
                      isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                    }`}
                  >
                    {copy.formulaLead}
                  </p>
                  <p
                    className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] max-w-[560px] ${
                      isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
                    }`}
                  >
                    {copy.formulaBodyBefore}
                    <strong
                      className={`font-semibold ${
                        isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                      }`}
                    >
                      {copy.formulaBodyStrong}
                    </strong>
                    {copy.formulaBodyAfter}
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 border-t ${
                    isDark ? "border-[#f5f8fc]/[0.12]" : "border-[#111622]/[0.12]"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: 0, ease: EASE }}
                    className="flex flex-col justify-between gap-2"
                  >
                    <span
                      className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      {copy.statBuilt}
                    </span>
                    <Compteur
                      valeur={120}
                      prefixe="+"
                      taille={72}
                      couleur={isDark ? "#f5f8fc" : "#111622"}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                    className="flex flex-col justify-between gap-2"
                  >
                    <span
                      className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      {copy.statSpecies}
                    </span>
                    <Compteur
                      valeur={40}
                      prefixe="+"
                      taille={72}
                      couleur={isDark ? "#f5f8fc" : "#111622"}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
                    className="flex flex-col justify-between gap-2"
                  >
                    <span
                      className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      {copy.statHandmade}
                    </span>
                    <Compteur
                      valeur={100}
                      prefixe=""
                      suffixe="%"
                      taille={72}
                      couleur={isDark ? "#f5f8fc" : "#111622"}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-8"
          >
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              {copy.pillarsEyebrow}
            </span>
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              (002)
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: idx * 0.1, ease: EASE }}
                className={`group rounded-[28px] border p-8 md:p-9 flex flex-col justify-between gap-8 hover:bg-[#fff0a6] transition-colors duration-300 ${
                  isDark
                    ? "border-[#f5f8fc]/[0.16] bg-[#141b28] hover:border-[#fff0a6]"
                    : "border-[#111622]/[0.16] bg-[#f5f8fc]"
                }`}
              >
                <span
                  className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] transition-colors ${
                    isDark
                      ? "text-[#f5f8fc]/70 group-hover:text-[#111622]/75"
                      : "text-[#111622]/70"
                  }`}
                >
                  {pillar.num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={`font-stagheiz transition-colors ${
                      isDark
                        ? "text-[#f5f8fc] group-hover:text-[#111622]"
                        : "text-[#111622]"
                    } ${
                      isVi
                        ? "text-[25px] md:text-[31px] min-[1200px]:text-[29px] leading-[1.14] tracking-[-0.025em]"
                        : "text-[30px] md:text-[38px] min-[1200px]:text-[36px] leading-[1] tracking-[-0.04em]"
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] transition-colors ${
                      isDark
                        ? "text-[#f5f8fc]/75 group-hover:text-[#111622]/80"
                        : "text-[#111622]/75"
                    }`}
                  >
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          ref={fanSectionRef}
          id="pour-qui"
          className={`scroll-mt-24 w-full border-t py-[96px] md:py-[140px] overflow-hidden ${
            isDark
              ? "bg-[#121a28] border-[#f5f8fc]/[0.16]"
              : "bg-[#dce8f5]/45 border-[#111622]/[0.16]"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px]">
            <div className="flex flex-col items-center text-center gap-4 mb-14 md:mb-20">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0, ease: EASE }}
                className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                  isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                }`}
              >
                {copy.whoEyebrow}
              </motion.span>
              <WordReveal
                text={copy.whoTitle}
                className={`font-stagheiz max-w-[900px] ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                } ${
                  isVi
                    ? "text-[36px] sm:text-[52px] md:text-[64px] leading-[1.14] tracking-[-0.025em]"
                    : "text-[44px] sm:text-[64px] md:text-[80px] leading-[0.92]"
                }`}
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0, ease: EASE }}
                className={`font-sans text-[17px] md:text-[19px] leading-[1.55] max-w-[640px] ${
                  isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
                }`}
              >
                {copy.whoDesc}
              </motion.p>
            </div>

            <div className="hidden lg:flex justify-center w-full h-[700px] overflow-visible relative">
              <div className="relative w-[1210px] h-[660px] shrink-0">
                {copy.fanCards.map((card, i) => {
                  const slotTops = [50, 12, 0, 12, 50];
                  const isButterCard = card.bg.toLowerCase() === "#fff0a6";
                  const cardTextLight = !isButterCard && (isDark || card.dark);
                  const isCardActive =
                    hoveredFanIdx !== null
                      ? hoveredFanIdx === i
                      : idleFanLifted && idleFanIdx === i;
                  return (
                    <motion.div
                      key={card.num}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{
                        duration: 0.9,
                        delay: i * 0.1,
                        ease: EASE,
                      }}
                      onMouseEnter={() => {
                        const nextIdx = (i + 1) % copy.fanCards.length;
                        idleFanIdxRef.current = nextIdx;
                        setHoveredFanIdx(i);
                        setIdleFanIdx(nextIdx);
                        setIdleFanLifted(false);
                      }}
                      onMouseLeave={() => setHoveredFanIdx(null)}
                      style={{
                        position: "absolute",
                        left: i * 228,
                        top: slotTops[i],
                        width: 300,
                        height: 560,
                        zIndex: i + 1,
                      }}
                    >
                      <motion.div
                        initial={{ rotate: card.rot, y: 0, scale: 1 }}
                        animate={
                          isCardActive
                            ? { rotate: 0, y: -36, scale: 1.03 }
                            : { rotate: card.rot, y: 0, scale: 1 }
                        }
                        transition={{ duration: 0.5, ease: EASE }}
                        style={{
                          backgroundColor: darkSurfaceBg(card.bg, isDark),
                        }}
                        className={`w-[300px] h-[560px] rounded-[20px] p-[10px_10px_20px_10px] flex flex-col justify-start overflow-hidden ${
                          isButterCard ? "theme-butter-card " : ""
                        }${
                          isDark
                            ? "border border-[#f5f8fc]/15 shadow-[-24px_30px_40px_-24px_rgba(0,0,0,0.65)]"
                            : "shadow-[-24px_30px_40px_-24px_rgba(30,53,87,0.48)]"
                        } ${cardTextLight ? "text-[#f5f8fc]" : "text-[#111622]"}`}
                      >
                        <div
                          className={`w-full h-[320px] rounded-[12px] overflow-hidden shrink-0 ${
                            cardTextLight ? "bg-white/5" : "bg-black/5"
                          }`}
                        >
                          <img
                            src={card.img}
                            alt={card.title}
                            loading="lazy"
                            decoding="async"
                            width={760}
                            height={1013}
                            style={{ objectPosition: card.objectPosition }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div
                          className={`flex flex-col items-start gap-[10px] w-full pt-[18px] pl-[10px] ${
                            i < 4 ? "pr-[88px]" : "pr-[10px]"
                          }`}
                        >
                          <span
                            className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                              cardTextLight
                                ? "text-[#f5f8fc]/75"
                                : "text-[#111622]/70"
                            }`}
                          >
                            {card.num}
                          </span>
                          <h3
                            className={`font-stagheiz uppercase ${
                              isVi
                                ? "text-[19px] md:text-[21px] leading-[1.14] tracking-[-0.02em]"
                                : "text-[22px] md:text-[24px] leading-[0.98] tracking-[-0.04em]"
                            }`}
                          >
                            {card.title}
                          </h3>
                          <p
                            className={`font-sans text-[15px] leading-[1.45] ${
                              cardTextLight
                                ? "text-[#f5f8fc]/80"
                                : "text-[#111622]/75"
                            }`}
                          >
                            {card.desc}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden pt-4 pb-8">
              {copy.fanCards.map((card, i) => {
                const isButterCard = card.bg.toLowerCase() === "#fff0a6";
                const cardTextLight = !isButterCard && (isDark || card.dark);
                const restRotate = i % 2 === 0 ? -2 : 2;
                const isMobileCardActive =
                  hoveredFanIdx === null && idleFanLifted && idleFanIdx === i;
                return (
                  <motion.div
                    key={card.num}
                    initial={{ opacity: 0, y: 60, rotate: 0 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      rotate: restRotate,
                    }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                    className="max-w-[320px] w-full mx-auto"
                  >
                    <motion.div
                      animate={
                        isMobileCardActive
                          ? { rotate: -restRotate, y: -14, scale: 1.02 }
                          : { rotate: 0, y: 0, scale: 1 }
                      }
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{ backgroundColor: darkSurfaceBg(card.bg, isDark) }}
                      className={`h-[520px] w-full rounded-[20px] p-[10px_10px_20px_10px] flex flex-col justify-start overflow-hidden ${
                        isButterCard ? "theme-butter-card " : ""
                      }${
                        isDark
                          ? "border border-[#f5f8fc]/15 shadow-[-24px_30px_40px_-24px_rgba(0,0,0,0.65)]"
                          : "shadow-[-24px_30px_40px_-24px_rgba(30,53,87,0.48)]"
                      } ${cardTextLight ? "text-[#f5f8fc]" : "text-[#111622]"}`}
                    >
                    <div
                      className={`w-full h-[300px] rounded-[12px] overflow-hidden shrink-0 ${
                        cardTextLight ? "bg-white/5" : "bg-black/5"
                      }`}
                    >
                      <img
                        src={card.img}
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        width={760}
                        height={1013}
                        style={{ objectPosition: card.objectPosition }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-[10px] w-full pt-[18px] px-[10px]">
                      <span
                        className={`font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] ${
                          cardTextLight
                            ? "text-[#f5f8fc]/75"
                            : "text-[#111622]/70"
                        }`}
                      >
                        {card.num}
                      </span>
                      <h3
                        className={`font-stagheiz uppercase ${
                          isVi
                            ? "text-[19px] sm:text-[21px] leading-[1.14] tracking-[-0.02em]"
                            : "text-[21px] sm:text-[24px] leading-[0.98] tracking-[-0.04em]"
                        }`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`font-sans text-[15px] sm:text-[16px] leading-[1.5] ${
                          cardTextLight
                            ? "text-[#f5f8fc]/80"
                            : "text-[#111622]/75"
                        }`}
                      >
                        {card.desc}
                      </p>
                    </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pourquoi" className="scroll-mt-24">
          <MotDefilant />
        </section>

        <section className="w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[96px] md:py-[140px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-8"
          >
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              {copy.resultEyebrow}
            </span>
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              (004)
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
            <WordReveal
              text={copy.resultTitle}
              className={`lg:col-span-7 font-stagheiz ${
                isDark ? "text-[#f5f8fc]" : "text-[#111622]"
              } ${
                isVi
                  ? "text-[36px] sm:text-[50px] md:text-[62px] leading-[1.14] tracking-[-0.025em]"
                  : "text-[44px] sm:text-[60px] md:text-[74px] leading-[0.92]"
              }`}
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className={`lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] ${
                isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
              }`}
            >
              {copy.resultDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[0], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`w-full h-full rounded-[16px] overflow-hidden ${
                  isDark ? "bg-[#1a2436]" : "bg-[#dce8f5]"
                }`}
              >
                <img
                  src="/images/result-01.webp"
                  alt={copy.resultAlts[0]}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover object-[50%_45%]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[1], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="theme-butter-card w-full h-full rounded-[16px] bg-[#fff0a6] border border-[#111622]/[0.14] p-6 flex flex-col justify-between"
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/70">
                  {copy.resultCards[0].num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={`font-stagheiz text-[#111622] ${
                      isVi
                        ? "text-[25px] md:text-[31px] min-[1200px]:text-[29px] leading-[1.14] tracking-[-0.025em]"
                        : "text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em]"
                    }`}
                  >
                    {copy.resultCards[0].title}
                  </h3>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/75">
                    {copy.resultCards[0].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[2], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`w-full h-full rounded-[16px] overflow-hidden ${
                  isDark ? "bg-[#1a2436]" : "bg-[#dce8f5]"
                }`}
              >
                <img
                  src="/images/result-02.webp"
                  alt={copy.resultAlts[1]}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover object-[50%_25%]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[3], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`w-full h-full rounded-[16px] border p-6 flex flex-col justify-between ${
                  isDark
                    ? "bg-[#1c283d] border-[#f5f8fc]/[0.14] text-[#f5f8fc]"
                    : "bg-[#dce8f5] border-[#111622]/[0.14] text-[#111622]"
                }`}
              >
                <span
                  className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                    isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                  }`}
                >
                  {copy.resultCards[1].num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={`font-stagheiz ${
                      isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                    } ${
                      isVi
                        ? "text-[25px] md:text-[31px] min-[1200px]:text-[29px] leading-[1.14] tracking-[-0.025em]"
                        : "text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em]"
                    }`}
                  >
                    {copy.resultCards[1].title}
                  </h3>
                  <p
                    className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] ${
                      isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/75"
                    }`}
                  >
                    {copy.resultCards[1].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[4], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`w-full h-full rounded-[16px] bg-[#1e3557] text-[#f5f8fc] p-6 flex flex-col justify-between ${
                  isDark ? "border border-[#f5f8fc]/15" : ""
                }`}
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/75">
                  {copy.resultCards[2].num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={`font-stagheiz text-[#f5f8fc] ${
                      isVi
                        ? "text-[25px] md:text-[31px] min-[1200px]:text-[29px] leading-[1.14] tracking-[-0.025em]"
                        : "text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em]"
                    }`}
                  >
                    {copy.resultCards[2].title}
                  </h3>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#f5f8fc]/85">
                    {copy.resultCards[2].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[5], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`w-full h-full rounded-[16px] overflow-hidden ${
                  isDark ? "bg-[#1a2436]" : "bg-[#dce8f5]"
                }`}
              >
                <img
                  src="/images/result-03.webp"
                  alt={copy.resultAlts[2]}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[6], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`w-full h-full rounded-[16px] border p-6 flex flex-col justify-between ${
                  isDark
                    ? "bg-[#182234] border-[#f5f8fc]/[0.14] text-[#f5f8fc]"
                    : "bg-[#ffffff] border-[#111622]/[0.14] text-[#111622]"
                }`}
              >
                <span
                  className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                    isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                  }`}
                >
                  {copy.resultCards[3].num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={`font-stagheiz ${
                      isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                    } ${
                      isVi
                        ? "text-[25px] md:text-[31px] min-[1200px]:text-[29px] leading-[1.14] tracking-[-0.025em]"
                        : "text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em]"
                    }`}
                  >
                    {copy.resultCards[3].title}
                  </h3>
                  <p
                    className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] ${
                      isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/75"
                    }`}
                  >
                    {copy.resultCards[3].desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[7], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`w-full h-full rounded-[16px] overflow-hidden ${
                  isDark ? "bg-[#1a2436]" : "bg-[#dce8f5]"
                }`}
              >
                <img
                  src="/images/result-04.webp"
                  alt={copy.resultAlts[3]}
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover object-[50%_68%]"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section
          id="methode"
          className={`scroll-mt-24 w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[96px] md:py-[140px] border-t ${
            isDark ? "border-[#f5f8fc]/[0.16]" : "border-[#111622]/[0.16]"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-8"
          >
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              {copy.methodEyebrow}
            </span>
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              (005)
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <WordReveal
              text={copy.methodTitle}
              className={`lg:col-span-7 font-stagheiz ${
                isDark ? "text-[#f5f8fc]" : "text-[#111622]"
              } ${
                isVi
                  ? "text-[36px] sm:text-[50px] md:text-[64px] leading-[1.14] tracking-[-0.025em]"
                  : "text-[44px] sm:text-[60px] md:text-[74px] leading-[0.92]"
              }`}
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className={`lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] ${
                isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
              }`}
            >
              {copy.methodDesc}
            </motion.p>
          </div>

          <div className="flex flex-col gap-10">
            {copy.methodSteps.map((step) => {
              const isButterStep = step.bg.toLowerCase() === "#fff0a6";
              const stepTextLight = !isButterStep && (isDark || step.dark);
              return (
                <div
                  key={step.counter}
                  style={{
                    backgroundColor: darkSurfaceBg(step.bg, isDark),
                    top: `${step.top}px`,
                  }}
                  className={`lg:sticky rounded-[32px] border ${
                    isButterStep ? "theme-butter-card " : ""
                  }${
                    stepTextLight
                      ? "border-[#f5f8fc]/20 text-[#f5f8fc]"
                      : "border-[#111622]/[0.16] text-[#111622]"
                  } p-7 sm:p-10 md:p-14 ${
                    isDark
                      ? "shadow-[0_-10px_40px_rgba(0,0,0,0.45)]"
                      : "shadow-[0_-10px_40px_rgba(17,22,34,0.06)]"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[12px] uppercase tracking-[0.06em] ${
                            stepTextLight
                              ? "text-[#f5f8fc]/75"
                              : "text-[#111622]/70"
                          }`}
                        >
                          {step.tag}
                        </span>
                        <span
                          className={`font-mono text-[12px] uppercase tracking-[0.06em] ${
                            stepTextLight
                              ? "text-[#f5f8fc]/75"
                              : "text-[#111622]/70"
                          }`}
                        >
                          {step.counter}
                        </span>
                      </div>

                      <div className="flex flex-col gap-4">
                        <h3
                          className={`font-stagheiz ${
                            isVi
                              ? "text-[28px] sm:text-[38px] md:text-[46px] leading-[1.14] tracking-[-0.02em]"
                              : "text-[34px] sm:text-[46px] md:text-[56px] leading-[0.95]"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`font-sans text-[17px] md:text-[19px] leading-[1.55] max-w-[540px] ${
                            stepTextLight
                              ? "text-[#f5f8fc]/85"
                              : "text-[#111622]/75"
                          }`}
                        >
                          {step.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {step.pills.map((pill) => (
                          <span
                            key={pill}
                            className={`px-4 py-1.5 rounded-full font-mono text-[12px] uppercase tracking-[0.05em] border ${
                              stepTextLight
                                ? "border-[#f5f8fc]/25 bg-[#f5f8fc]/10 text-[#f5f8fc]"
                                : isDark
                                ? "border-[#111622]/20 bg-[#f5f8fc]/75 text-[#111622]"
                                : "border-[#111622]/20 bg-white/70 text-[#111622]"
                            }`}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-black/10">
                        <img
                          src={step.img}
                          alt={step.title}
                          loading="lazy"
                          decoding="async"
                          width={960}
                          height={720}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="projets"
          className={`scroll-mt-24 w-full py-[96px] md:py-[140px] border-t overflow-hidden ${
            isDark
              ? "bg-[#101724] border-[#f5f8fc]/[0.16]"
              : "bg-[#dce8f5] border-[#111622]/[0.16]"
          }`}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              scrollCarousel(-1);
            } else if (e.key === "ArrowRight") {
              scrollCarousel(1);
            }
          }}
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="flex items-center justify-between mb-6"
            >
              <span
                className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                  isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                }`}
              >
                {copy.projectsEyebrow}
              </span>
              <span
                className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                  isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                }`}
              >
                (006)
              </span>
            </motion.div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <WordReveal
                text={copy.projectsTitle}
                className={`font-stagheiz ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                } ${
                  isVi
                    ? "text-[36px] sm:text-[52px] md:text-[66px] leading-[1.14] tracking-[-0.025em]"
                    : "text-[44px] sm:text-[64px] md:text-[80px] leading-[0.92]"
                }`}
              />
              <div className="flex items-center gap-4">
                <span
                  className={`font-mono text-[12px] uppercase tracking-[0.06em] ${
                    isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/75"
                  }`}
                >
                  {String(activeProjectIdx + 1).padStart(2, "0")} /{" "}
                  {String(copy.projects.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => scrollCarousel(-1)}
                    disabled={activeProjectIdx === 0}
                    aria-label={copy.prevProjectAria}
                    className={`w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full border-[1.5px] flex items-center justify-center transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isDark
                        ? "border-[#f5f8fc] text-[#f5f8fc] hover:bg-[#fff0a6] hover:border-[#fff0a6] hover:!text-[#111622] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#101724]"
                        : "border-[#111622] text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] focus-visible:ring-[#111622] focus-visible:ring-offset-[#dce8f5]"
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel(1)}
                    disabled={activeProjectIdx >= copy.projects.length - 1}
                    aria-label={copy.nextProjectAria}
                    className={`w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full border-[1.5px] flex items-center justify-center transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isDark
                        ? "border-[#f5f8fc] text-[#f5f8fc] hover:bg-[#fff0a6] hover:border-[#fff0a6] hover:!text-[#111622] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#101724]"
                        : "border-[#111622] text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] focus-visible:ring-[#111622] focus-visible:ring-offset-[#dce8f5]"
                    }`}
                  >
                    <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar px-5 md:px-[56px] pb-6 scroll-smooth snap-x snap-mandatory"
          >
            {copy.projects.map((proj, idx) => (
              <motion.article
                key={proj.client}
                data-project-card
                initial={{ opacity: 0.001, y: 36 }}
                animate={
                  carouselInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.001, y: 36 }
                }
                transition={{
                  duration: 0.9,
                  delay: idx * 0.08,
                  ease: EASE,
                }}
                className={`snap-start w-[320px] sm:w-[420px] md:w-[460px] shrink-0 rounded-[28px] border p-5 sm:p-6 flex flex-col justify-between gap-5 ${
                  isDark
                    ? "bg-[#182234] border-[#f5f8fc]/[0.16]"
                    : "bg-[#f5f8fc] border-[#111622]/[0.16]"
                }`}
              >
                <div className="flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxState({ source: "projects", index: idx })
                    }
                    aria-label={`${proj.client} · ${proj.inspectLabel}`}
                    className={`group relative w-full aspect-[3/4] rounded-[20px] overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isDark
                        ? "bg-[#0b0f17]/40 focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#182234]"
                        : "bg-[#111622]/10 focus-visible:ring-[#111622]"
                    }`}
                  >
                    <img
                      src={proj.img}
                      alt={`${proj.client} ${proj.category}`}
                      loading="lazy"
                      decoding="async"
                      width={960}
                      height={1280}
                      style={{ objectPosition: proj.objectPosition }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="theme-butter-card px-3 py-1 rounded-full bg-[#fff0a6]/95 border border-[#111622]/15 font-mono text-[11px] uppercase tracking-[0.05em] text-[#111622]">
                        {proj.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#111622]/85 backdrop-blur-sm font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] text-[#f5f8fc]">
                        {proj.year}
                      </span>
                    </div>

                    <span
                      className={`absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-[11px] uppercase tracking-[0.05em] opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ${
                        isDark
                          ? "bg-[#141b28]/90 border-[#f5f8fc]/20 text-[#f5f8fc]"
                          : "bg-[#f5f8fc]/90 border-[#111622]/15 text-[#111622]"
                      }`}
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>{proj.inspectLabel}</span>
                    </span>
                  </button>

                  <div className="flex flex-col gap-2">
                    <h3
                      className={`font-stagheiz text-[30px] md:text-[38px] min-[1200px]:text-[34px] ${
                        isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                      } ${
                        isVi
                          ? "leading-[1.14] tracking-[-0.02em]"
                          : "leading-[1] tracking-[-0.04em]"
                      }`}
                    >
                      {proj.client}
                    </h3>
                    <p
                      className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] ${
                        isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/75"
                      }`}
                    >
                      {proj.summary}
                    </p>
                  </div>
                </div>

                {proj.review && (
                  <div className="theme-butter-card rounded-[18px] bg-[#fff0a6] border border-[#111622]/[0.16] p-4">
                    <p className="font-sans text-[14px] leading-[1.48] text-[#111622]/90 mb-2">
                      &ldquo;{proj.review}&rdquo;
                    </p>
                    <div className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.05em] text-[#111622]/70">
                      {proj.author} · {proj.role}
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>

          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px] pt-2 flex items-center justify-center gap-1">
            {copy.projects.map((proj, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={proj.client}
                  type="button"
                  aria-label={`${copy.projectDotAria} ${idx + 1}: ${proj.client}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => scrollToProjectIndex(idx)}
                  className={`min-w-[36px] min-h-[44px] flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded-full ${
                    isDark
                      ? "focus-visible:ring-[#fff0a6]"
                      : "focus-visible:ring-[#111622]"
                  }`}
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? isDark
                          ? "w-7 bg-[#fff0a6]"
                          : "w-7 bg-[#111622]"
                        : isDark
                        ? "w-2 bg-[#f5f8fc]/30"
                        : "w-2 bg-[#111622]/30"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>

        <section
          id="galerie"
          className={`scroll-mt-24 w-full py-[96px] md:py-[140px] border-t overflow-hidden ${
            isDark ? "border-[#f5f8fc]/[0.16]" : "border-[#111622]/[0.16]"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px] mb-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="flex items-center justify-between mb-6"
            >
              <span
                className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                  isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                }`}
              >
                {copy.galleryEyebrow}
              </span>
              <span
                className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                  isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                }`}
              >
                (007)
              </span>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <WordReveal
                text={copy.galleryTitle}
                className={`font-stagheiz uppercase max-w-[820px] ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                } ${
                  isVi
                    ? "text-[36px] md:text-[56px] leading-[1.14] tracking-[-0.02em]"
                    : "text-[44px] md:text-[68px] leading-[0.95] tracking-[-0.005em]"
                }`}
              />
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] max-w-[390px] shrink-0 ${
                  isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
                }`}
              >
                {copy.galleryDesc}
              </motion.p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {copy.galleryFilters.map((chip) => {
                  const active = galleryFilter === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setGalleryFilter(chip.id)}
                      className={`min-h-[40px] px-4 py-2 rounded-full border font-mono text-[12px] uppercase tracking-[0.05em] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        isDark
                          ? active
                            ? "theme-butter-card bg-[#fff0a6] border-[#fff0a6] text-[#111622] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#0b0f17]"
                            : "bg-[#141b28] border-[#f5f8fc]/25 text-[#f5f8fc] hover:bg-[#1a2436] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#0b0f17]"
                          : active
                          ? "bg-[#111622] border-[#111622] text-[#f5f8fc] focus-visible:ring-[#111622]"
                          : "bg-[#f5f8fc] border-[#111622]/25 text-[#111622] hover:bg-[#dce8f5] focus-visible:ring-[#111622]"
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {galleryFilter === "all" && (
                <button
                  type="button"
                  aria-pressed={galleryPaused}
                  aria-label={
                    galleryPaused ? copy.galleryPlayAria : copy.galleryPauseAria
                  }
                  onClick={() => setGalleryPaused((p) => !p)}
                  className={`theme-butter-card inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-full border-[1.5px] bg-[#fff0a6]/80 hover:bg-[#fff0a6] text-[#111622] font-mono text-[12px] uppercase tracking-[0.05em] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isDark
                      ? "border-[#fff0a6] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#0b0f17]"
                      : "border-[#111622] focus-visible:ring-[#111622]"
                  }`}
                >
                  {galleryPaused ? (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Pause className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {galleryPaused
                      ? copy.galleryPlayLabel
                      : copy.galleryPauseLabel}
                  </span>
                </button>
              )}
            </div>
          </div>

          {galleryFilter === "all" ? (
            <div className="flex flex-col gap-4">
              <SmoothTicker
                velocity={40}
                direction="left"
                hoverModifier={0.2}
                paused={galleryPaused}
                gap={16}
                renderItems={(isClone) =>
                  copy.galleryRow1.map((item, idx) => (
                    <button
                      key={`${item.id}-${isClone ? "c" : "m"}`}
                      type="button"
                      tabIndex={isClone ? -1 : 0}
                      onClick={() =>
                        setLightboxState({ source: "gallery", index: idx })
                      }
                      aria-label={item.title}
                      className={`group relative ${item.widthClass} h-[312px] sm:h-[380px] rounded-[20px] overflow-hidden shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        isDark
                          ? "bg-[#1a2436] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#0b0f17]"
                          : "bg-[#dce8f5] focus-visible:ring-[#111622]"
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        width={840}
                        height={840}
                        style={
                          item.objectPosition
                            ? { objectPosition: item.objectPosition }
                            : undefined
                        }
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-3 right-3 w-9 h-9 rounded-full border flex items-center justify-center opacity-85 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ${
                          isDark
                            ? "bg-[#141b28]/90 border-[#f5f8fc]/20 text-[#f5f8fc]"
                            : "bg-[#f5f8fc]/90 border-[#111622]/15 text-[#111622]"
                        }`}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </button>
                  ))
                }
              />

              <SmoothTicker
                velocity={70}
                direction="right"
                hoverModifier={1}
                paused={galleryPaused}
                gap={40}
                className="py-[20px]"
                renderItems={() =>
                  copy.galleryWords.map((word, idx) => (
                    <React.Fragment key={idx}>
                      <span
                        className={`font-stagheiz text-[44px] md:text-[68px] uppercase whitespace-nowrap select-none shrink-0 ${
                          isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                        } ${
                          isVi
                            ? "leading-[1.14] tracking-[-0.02em]"
                            : "leading-[0.95] tracking-[-0.005em]"
                        }`}
                      >
                        {word}
                      </span>
                      <span
                        className={`w-[14px] h-[14px] rounded-full shrink-0 ${
                          isDark ? "bg-[#fff0a6]" : "bg-[#111622]"
                        }`}
                      />
                    </React.Fragment>
                  ))
                }
              />

              <SmoothTicker
                velocity={40}
                direction="right"
                hoverModifier={0.2}
                paused={galleryPaused}
                gap={16}
                renderItems={(isClone) =>
                  copy.galleryRow2.map((item, idx) => (
                    <button
                      key={`${item.id}-${isClone ? "c" : "m"}`}
                      type="button"
                      tabIndex={isClone ? -1 : 0}
                      onClick={() =>
                        setLightboxState({
                          source: "gallery",
                          index: copy.galleryRow1.length + idx,
                        })
                      }
                      aria-label={item.title}
                      className={`group relative ${item.widthClass} h-[312px] sm:h-[380px] rounded-[20px] overflow-hidden shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        isDark
                          ? "bg-[#1a2436] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#0b0f17]"
                          : "bg-[#dce8f5] focus-visible:ring-[#111622]"
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        width={840}
                        height={840}
                        style={
                          item.objectPosition
                            ? { objectPosition: item.objectPosition }
                            : undefined
                        }
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-3 right-3 w-9 h-9 rounded-full border flex items-center justify-center opacity-85 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ${
                          isDark
                            ? "bg-[#141b28]/90 border-[#f5f8fc]/20 text-[#f5f8fc]"
                            : "bg-[#f5f8fc]/90 border-[#111622]/15 text-[#111622]"
                        }`}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </button>
                  ))
                }
              />
            </div>
          ) : filteredGalleryPhotos.length > 0 ? (
            <div className="max-w-[1440px] mx-auto px-5 md:px-[56px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredGalleryPhotos.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setLightboxState({ source: "gallery", index: idx })
                  }
                  className={`group relative aspect-[4/5] rounded-[20px] overflow-hidden text-left cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isDark
                      ? "bg-[#1a2436] border-[#f5f8fc]/15 focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#0b0f17]"
                      : "bg-[#dce8f5] border-[#111622]/15 focus-visible:ring-[#111622]"
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    width={840}
                    height={840}
                    style={
                      item.objectPosition
                        ? { objectPosition: item.objectPosition }
                        : undefined
                    }
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#111622]/85 via-[#111622]/45 to-transparent text-[#f5f8fc] flex items-end justify-between gap-2">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#fff0a6]">
                        {item.eyebrow}
                      </div>
                      <div className="font-sans text-[15px] font-semibold leading-tight">
                        {item.title}
                      </div>
                    </div>
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        isDark
                          ? "bg-[#141b28]/90 text-[#f5f8fc]"
                          : "bg-[#f5f8fc]/90 text-[#111622]"
                      }`}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-w-[1440px] mx-auto px-5 md:px-[56px]">
              <div
                className={`rounded-[28px] border p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                  isDark
                    ? "bg-[#141b28] border-[#f5f8fc]/[0.16]"
                    : "bg-[#dce8f5] border-[#111622]/[0.16]"
                }`}
              >
                <div className="flex flex-col gap-3 max-w-[680px]">
                  <h3
                    className={`font-stagheiz text-[28px] sm:text-[34px] ${
                      isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                    } ${isVi ? "leading-[1.14]" : "leading-[1.02]"}`}
                  >
                    {copy.galleryEmptyFullsuit.title}
                  </h3>
                  <p
                    className={`font-sans text-[16px] leading-[1.55] ${
                      isDark ? "text-[#f5f8fc]/80" : "text-[#111622]/80"
                    }`}
                  >
                    {copy.galleryEmptyFullsuit.desc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => jumpToContactWithParts(["Fullsuit"])}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-sans text-[14px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isDark
                        ? "theme-butter-card bg-[#fff0a6] hover:!bg-[#f5f8fc] text-[#111622] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#141b28]"
                        : "bg-[#111622] hover:bg-[#1e3557] text-[#f5f8fc] focus-visible:ring-[#111622]"
                    }`}
                  >
                    <span>{copy.galleryEmptyFullsuit.ctaQuote}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#offres"
                    className={`inline-flex items-center rounded-full border-[1.5px] px-5 py-3 font-sans text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isDark
                        ? "border-[#f5f8fc] text-[#f5f8fc] hover:bg-[#f5f8fc] hover:!text-[#111622] focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#141b28]"
                        : "border-[#111622] text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] focus-visible:ring-[#111622]"
                    }`}
                  >
                    {copy.galleryEmptyFullsuit.ctaSpecs}
                  </a>
                  <button
                    type="button"
                    onClick={() => setGalleryFilter("all")}
                    className={`font-mono text-[12px] uppercase tracking-[0.05em] underline underline-offset-4 px-2 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded ${
                      isDark
                        ? "text-[#f5f8fc] focus-visible:ring-[#fff0a6]"
                        : "text-[#111622] focus-visible:ring-[#111622]"
                    }`}
                  >
                    {copy.galleryEmptyFullsuit.ctaShowAll}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section
          id="offres"
          className={`scroll-mt-24 w-full text-[#f5f8fc] py-[96px] md:py-[140px] ${
            isDark
              ? "bg-[#0e1522] border-y border-[#f5f8fc]/[0.12]"
              : "bg-[#1e3557]"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="flex items-center justify-between mb-6"
            >
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/75">
                {copy.offersEyebrow}
              </span>
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/75">
                (008)
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
              <WordReveal
                text={copy.offersTitle}
                className={`lg:col-span-7 font-stagheiz text-[#f5f8fc] ${
                  isVi
                    ? "text-[36px] sm:text-[52px] md:text-[64px] leading-[1.14] tracking-[-0.025em]"
                    : "text-[44px] sm:text-[64px] md:text-[80px] leading-[0.92]"
                }`}
              />
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] text-[#f5f8fc]/80"
              >
                {copy.offersDesc}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-8">
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0, ease: EASE }}
                className={`rounded-[32px] p-7 sm:p-10 flex flex-col justify-between gap-8 ${
                  isDark
                    ? "bg-[#141b28] text-[#f5f8fc] border border-[#f5f8fc]/[0.16]"
                    : "bg-[#f5f8fc] text-[#111622]"
                }`}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      {copy.offer1Tag}
                    </span>
                  </div>
                  <div
                    className={`w-full aspect-[5/4] rounded-[20px] overflow-hidden ${
                      isDark ? "bg-[#1a2436]" : "bg-[#dce8f5]"
                    }`}
                  >
                    <img
                      src="/images/offer-01.webp"
                      alt={copy.offer1Alt}
                      loading="lazy"
                      decoding="async"
                      width={684}
                      height={548}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3
                      className={`font-stagheiz text-[34px] md:text-[42px] ${
                        isVi ? "leading-[1.14]" : "leading-[0.96]"
                      }`}
                    >
                      {copy.offer1Title}
                    </h3>
                    <p
                      className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] ${
                        isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/75"
                      }`}
                    >
                      {copy.offer1Desc}
                    </p>
                  </div>
                  <ul
                    className={`flex flex-col gap-3 pt-2 border-t ${
                      isDark
                        ? "border-[#f5f8fc]/[0.14]"
                        : "border-[#111622]/[0.14]"
                    }`}
                  >
                    {copy.offer1Bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className={`flex items-start gap-3 font-sans text-[16px] md:text-[17px] leading-[1.5] ${
                          isDark ? "text-[#f5f8fc]/85" : "text-[#111622]/85"
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 mt-1 shrink-0 ${
                            isDark ? "text-[#fff0a6]" : "text-[#111622]"
                          }`}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`pt-6 border-t flex flex-wrap items-center justify-between gap-4 ${
                    isDark
                      ? "border-[#f5f8fc]/[0.14]"
                      : "border-[#111622]/[0.14]"
                  }`}
                >
                  <div
                    className={`font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] ${
                      isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                    }`}
                  >
                    {copy.offer1Sub}
                  </div>
                  <Bouton
                    title={copy.offer1Cta}
                    href="/#contact"
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      jumpToContactWithParts(["Head"]);
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="theme-butter-card rounded-[32px] bg-[#fff0a6] text-[#111622] p-7 sm:p-10 flex flex-col justify-between gap-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/70">
                      {copy.offer2Tag}
                    </span>
                  </div>
                  <div className="w-full aspect-[5/4] rounded-[20px] overflow-hidden bg-[#dce8f5]">
                    <img
                      src="/images/offer-02.webp"
                      alt={copy.offer2Alt}
                      loading="lazy"
                      decoding="async"
                      width={960}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3
                      className={`font-stagheiz text-[34px] md:text-[42px] ${
                        isVi ? "leading-[1.14]" : "leading-[0.96]"
                      }`}
                    >
                      {copy.offer2Title}
                    </h3>
                    <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/75">
                      {copy.offer2Desc}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-3 pt-2 border-t border-[#111622]/[0.14]">
                    {copy.offer2Bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 font-sans text-[16px] md:text-[17px] leading-[1.5] text-[#111622]/85"
                      >
                        <Check className="w-4 h-4 mt-1 shrink-0 text-[#111622]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#111622]/[0.14] flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] text-[#111622]/70">
                    {copy.offer2Sub}
                  </div>
                  <Bouton
                    title={copy.offer2Cta}
                    href="/#contact"
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      jumpToContactWithParts(["Fullsuit"]);
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <p className="font-mono text-[12px] min-[1200px]:text-[13px] text-[#f5f8fc]/75 mb-20">
              {copy.furNotice}
            </p>

            <div id="constitue-ton-offre" className="scroll-mt-24 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="mb-7"
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/75">
                  {copy.packagesEyebrow}
                </span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[130px] pt-[90px]">
                {copy.packages.map((pkg, idx) => {
                  const isButterPkg = pkg.bg.toLowerCase() === "#fff0a6";
                  const pkgTextLight = isDark && !isButterPkg;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{
                        duration: 0.9,
                        delay: (idx % 3) * 0.1,
                        ease: EASE,
                      }}
                      className="h-full"
                    >
                      <motion.div
                        whileHover={{ y: -10, scale: 1 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        style={{ backgroundColor: darkSurfaceBg(pkg.bg, isDark) }}
                        className={`relative h-full rounded-[28px] px-[26px] pb-[28px] pt-[152px] flex flex-col justify-between gap-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] ${
                          isButterPkg
                            ? "theme-butter-card text-[#111622]"
                            : pkgTextLight
                            ? "text-[#f5f8fc] border border-[#f5f8fc]/[0.14]"
                            : "text-[#111622]"
                        }`}
                      >
                        <div
                          style={{
                            transform: `translateX(-50%) rotate(${pkg.rot}deg)`,
                            backgroundColor: "#ffffff",
                            borderColor: "#ffffff",
                          }}
                          className="absolute -top-[80px] left-1/2 w-[190px] h-[210px] border-[8px] rounded-[2px] shadow-[0_18px_30px_-16px_rgba(0,0,0,0.55)] overflow-hidden"
                        >
                          <img
                            src={pkg.img}
                            alt={pkg.title}
                            loading="lazy"
                            decoding="async"
                            width={684}
                            height={684}
                            style={{ objectPosition: pkg.imgPos }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col gap-4">
                          <h3
                            className={`font-stagheiz text-[30px] lg:text-[34px] text-center ${
                              isVi ? "leading-[1.14]" : "leading-none"
                            }`}
                          >
                            {pkg.title}
                          </h3>

                          <div
                            className={`flex flex-col border-t border-dashed ${
                              pkgTextLight
                                ? "border-[#f5f8fc]/25"
                                : "border-[#111622]/30"
                            }`}
                          >
                            {pkg.rows.map((row) => (
                              <div
                                key={row.label}
                                className={`flex items-center justify-between gap-3 py-3 border-b border-dashed ${
                                  pkgTextLight
                                    ? "border-[#f5f8fc]/25"
                                    : "border-[#111622]/30"
                                }`}
                              >
                                <span
                                  className={`font-mono text-[11px] uppercase tracking-[0.05em] ${
                                    pkgTextLight
                                      ? "text-[#f5f8fc]/70"
                                      : "text-[#111622]/70"
                                  }`}
                                >
                                  {row.label}
                                </span>
                                <span
                                  className={`font-mono text-[12px] lg:text-[13px] font-bold text-right shrink-0 ${
                                    pkgTextLight
                                      ? "text-[#f5f8fc]"
                                      : "text-[#111622]"
                                  }`}
                                >
                                  {row.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          <p
                            className={`font-sans text-[13px] leading-[1.5] ${
                              pkgTextLight
                                ? "text-[#f5f8fc]/75"
                                : "text-[#111622]/75"
                            }`}
                          >
                            {pkg.note}
                          </p>
                        </div>

                        <div className="flex flex-col items-center pt-2">
                          <Bouton
                            title={copy.packageCta}
                            href="/#contact"
                            variant="primary"
                            fullWidth
                            onClick={(e) => {
                              e.preventDefault();
                              jumpToContactWithParts([pkg.optionValue]);
                            }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.75, ease: EASE }}
                  className={`rounded-[28px] p-7 sm:p-8 flex flex-col gap-5 ${
                    isDark
                      ? "bg-[#141b28] text-[#f5f8fc] border border-[#f5f8fc]/[0.14]"
                      : "bg-[#f5f8fc] text-[#111622]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.06em] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      {copy.extraOptionsEyebrow}
                    </span>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.06em] ${
                        isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
                      }`}
                    >
                      {copy.extraOptionsTag}
                    </span>
                  </div>
                  <div
                    className={`flex flex-col divide-y divide-dashed border-t border-b border-dashed ${
                      isDark
                        ? "divide-[#f5f8fc]/20 border-[#f5f8fc]/20"
                        : "divide-[#111622]/20 border-[#111622]/20"
                    }`}
                  >
                    {copy.extraOptions.map((opt) => (
                      <div
                        key={opt.label}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                      >
                        <span
                          className={`font-sans text-[15px] font-medium shrink-0 ${
                            isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                          }`}
                        >
                          {opt.label}
                        </span>
                        {opt.href ? (
                          <Link
                            href={opt.href}
                            className={`inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold underline underline-offset-4 sm:text-right focus-visible:outline-none focus-visible:ring-2 rounded ${
                              isDark
                                ? "text-[#fff0a6] hover:text-[#f5f8fc] focus-visible:ring-[#fff0a6]"
                                : "text-[#1e3557] hover:text-[#111622] focus-visible:ring-[#111622]"
                            }`}
                          >
                            <span>{opt.value}</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                        ) : (
                          <span
                            className={`font-sans text-[14px] sm:text-right ${
                              isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/75"
                            }`}
                          >
                            {opt.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
                  className="theme-butter-card rounded-[28px] bg-[#fff0a6] text-[#111622] p-7 sm:p-8 flex flex-col justify-between gap-5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/70">
                        {copy.freeGiftsEyebrow}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/70">
                        {copy.freeGiftsTag}
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {copy.freeGifts.map((gift) => (
                        <li
                          key={gift}
                          className="flex items-center gap-2.5 rounded-[14px] bg-[#f5f8fc]/75 border border-[#111622]/[0.12] px-3.5 py-2.5 font-sans text-[14px] font-medium text-[#111622]"
                        >
                          <Check className="w-4 h-4 shrink-0 text-[#111622]" />
                          <span>{gift}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[16px] bg-[#111622] text-[#f5f8fc] px-4 py-3.5 flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#fff0a6]">
                      {copy.bonusTag}
                    </span>
                    <p className="font-sans text-[14px] leading-[1.45] text-[#f5f8fc]/90">
                      {copy.bonusText}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="deroule"
          className="scroll-mt-24 w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[96px] md:py-[140px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="w-full flex items-center justify-between mb-12 md:mb-16"
          >
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              {copy.timelineEyebrow}
            </span>
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              (009)
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[96px]">
            <div className="w-full lg:w-[520px] lg:shrink-0 lg:sticky lg:top-[140px] flex flex-col items-start gap-[28px]">
              <WordReveal
                text={copy.timelineTitle}
                className={`font-stagheiz ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                } ${
                  isVi
                    ? "text-[36px] sm:text-[50px] md:text-[58px] leading-[1.14] tracking-[-0.02em]"
                    : "text-[44px] sm:text-[60px] md:text-[68px] leading-[0.95] tracking-[-0.005em]"
                }`}
              />
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] ${
                  isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
                }`}
              >
                {copy.timelineDesc}
              </motion.p>
              <div className="flex flex-wrap items-center gap-3">
                <Bouton
                  title={copy.heroContactCta}
                  href="/#contact"
                  variant="primary"
                />
                <Bouton
                  title={copy.timelineTermsCta}
                  href="/terms"
                  variant="secondary"
                  showArrow={false}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 w-full">
              <Deroule />
            </div>
          </div>
        </section>

        <section
          id="faq"
          className={`scroll-mt-24 w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[96px] md:py-[140px] border-t ${
            isDark ? "border-[#f5f8fc]/[0.16]" : "border-[#111622]/[0.16]"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="w-full flex items-center justify-between mb-12 md:mb-16"
          >
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              {copy.faqEyebrow}
            </span>
            <span
              className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                isDark ? "text-[#f5f8fc]/70" : "text-[#111622]/70"
              }`}
            >
              (010)
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[64px]">
            <div className="w-full lg:w-[480px] lg:shrink-0 lg:sticky lg:top-[120px] flex flex-col items-start gap-[28px]">
              <WordReveal
                text={copy.faqTitle}
                className={`font-stagheiz ${
                  isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                } ${
                  isVi
                    ? "text-[36px] sm:text-[50px] md:text-[58px] leading-[1.14] tracking-[-0.02em]"
                    : "text-[44px] sm:text-[60px] md:text-[68px] leading-[0.95] tracking-[-0.005em]"
                }`}
              />
              <p
                className={`font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] ${
                  isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/70"
                }`}
              >
                {copy.faqDesc}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Bouton
                  title={copy.faqAskCta}
                  href="/#contact"
                  variant="secondary"
                />
                <Bouton
                  title={copy.faqTermsCta}
                  href="/terms"
                  variant="primary"
                  showArrow={false}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 w-full">
              <FAQAccordion />
            </div>
          </div>
        </section>

        <section id="bonus" className="scroll-mt-24">
          <MiseAuPoint />
        </section>

        <section
          id="contact"
          className={`scroll-mt-24 w-full bg-[#111622] text-[#f5f8fc] py-[96px] md:py-[140px] px-5 md:px-[56px] ${
            isDark ? "border-t border-[#f5f8fc]/[0.12]" : ""
          }`}
        >
          <div className="max-w-[1328px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="flex items-center justify-between mb-8"
            >
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/75">
                {copy.contactEyebrow}
              </span>
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/75">
                (011)
              </span>
            </motion.div>

            <CharReveal
              text={copy.contactTitle}
              className={`font-stagheiz text-[#f5f8fc] mb-10 md:mb-12 ${
                isVi
                  ? "text-[36px] sm:text-[56px] lg:text-[82px] leading-[1.14] tracking-[-0.02em]"
                  : "text-[44px] sm:text-[68px] lg:text-[98px] leading-[0.92] tracking-[-0.01em]"
              }`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
              {copy.quoteInfoPills.map((pill) => (
                <div
                  key={pill.label}
                  className="rounded-[18px] bg-[#f5f8fc]/[0.06] border border-[#f5f8fc]/[0.14] px-4 py-3.5 flex flex-col gap-1"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#fff0a6]">
                    {pill.label}
                  </span>
                  <span className="font-sans text-[14px] leading-[1.4] text-[#f5f8fc]/85">
                    {pill.detail}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 flex flex-col gap-8">
                <p className="font-sans text-[19px] md:text-[22px] min-[1200px]:text-[26px] leading-[1.3] tracking-[-0.025em] text-[#f5f8fc]/80 max-w-[520px]">
                  {copy.contactIntro}
                </p>

                <div className="flex flex-col gap-5 pt-4 border-t border-[#f5f8fc]/[0.16]">
                  {copy.channels.map((channel) => (
                    <div key={channel.label}>
                      <div className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70 mb-1">
                        {channel.label}
                      </div>
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noopener noreferrer" : undefined}
                        className="font-sans text-[19px] md:text-[22px] min-[1200px]:text-[26px] font-normal leading-[1.3] tracking-[-0.025em] text-[#f5f8fc] hover:text-[#fff0a6] transition-colors break-words focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] rounded"
                      >
                        {channel.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {formState === "sent" && submittedSummary ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="lg:col-span-7 flex flex-col gap-6 bg-[#f5f8fc]/[0.06] border border-[#fff0a6]/40 rounded-[28px] p-6 sm:p-10"
                >
                  <div className="flex items-start gap-4">
                    <span className="theme-butter-card w-12 h-12 rounded-full bg-[#fff0a6] text-[#111622] flex items-center justify-center shrink-0">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3
                        className={`font-stagheiz text-[28px] sm:text-[34px] text-[#f5f8fc] ${
                          isVi ? "leading-[1.14]" : "leading-[1.02]"
                        }`}
                      >
                        {submittedSummary.isWaitlist
                          ? copy.confirmWaitlistTitle
                          : copy.confirmTitle}
                      </h3>
                      <p className="font-sans text-[15px] sm:text-[16px] leading-[1.55] text-[#f5f8fc]/85">
                        {submittedSummary.isWaitlist
                          ? copy.confirmWaitlistDesc
                          : copy.confirmDesc}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-[18px] bg-[#f5f8fc]/[0.06] border border-[#f5f8fc]/[0.14] p-5">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#f5f8fc]/70 mb-1">
                        {copy.confirmLabelName}
                      </div>
                      <div className="font-sans text-[15px] font-medium text-[#f5f8fc]">
                        {submittedSummary.name}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#f5f8fc]/70 mb-1">
                        {copy.confirmLabelSpecies}
                      </div>
                      <div className="font-sans text-[15px] font-medium text-[#f5f8fc]">
                        {submittedSummary.species}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#f5f8fc]/70 mb-1">
                        {copy.confirmLabelEmail}
                      </div>
                      <div className="font-sans text-[15px] font-medium text-[#f5f8fc] break-all">
                        {submittedSummary.email}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#f5f8fc]/70 mb-1">
                        {copy.confirmLabelParts}
                      </div>
                      <div className="font-sans text-[15px] font-medium text-[#fff0a6]">
                        {submittedSummary.commissionTypes.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleResetAfterSubmit}
                      className="inline-flex items-center justify-center gap-3 w-full sm:w-auto sm:min-w-[260px] px-[26px] py-[17px] rounded-full bg-[#f5f8fc] text-[#111622] hover:!bg-[#fff0a6] transition-colors font-sans text-[15px] font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111622]"
                    >
                      <span>{copy.submitAnother}</span>
                      <ArrowRight className="w-[18px] h-[18px] shrink-0" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, delay: 0, ease: EASE }}
                  onSubmit={handleContactSubmit}
                  noValidate
                  className="relative lg:col-span-7 flex flex-col gap-6 bg-[#f5f8fc]/[0.04] border border-[#f5f8fc]/[0.14] rounded-[28px] p-6 sm:p-10"
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

                  <div className="rounded-[16px] bg-[#f5f8fc]/[0.06] border border-[#f5f8fc]/[0.16] px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          !commissionStatus.loaded
                            ? "bg-[#94a3b8]"
                            : commissionStatus.open
                            ? "bg-[#4ade80]"
                            : "bg-[#94a3b8]"
                        }`}
                      />
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.06em] ${
                          !commissionStatus.loaded
                            ? "text-[#f5f8fc]/75"
                            : "text-[#fff0a6]"
                        }`}
                      >
                        {!commissionStatus.loaded
                          ? copy.statusChecking
                          : commissionStatus.open
                          ? copy.statusBadgeOpen
                          : copy.statusBadgeClosed}
                      </span>
                    </div>
                    {commissionStatus.loaded && (
                      <span className="font-sans text-[13px] text-[#f5f8fc]/85">
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
                      <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/80">
                        {copy.fieldName}
                      </span>
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
                      <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/80">
                        {copy.fieldSpecies}
                      </span>
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
                      <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/80">
                        {copy.fieldEmail}
                      </span>
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
                      <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/80">
                        {copy.fieldPhone}
                      </span>
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
                      <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/80">
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
                      <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/80">
                        {copy.fieldRefLink}
                      </span>
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
                          !refLinkValue.trim() ||
                          !isValidHttpUrl(refLinkValue.trim())
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
                    <span
                      id="commission-type-label"
                      className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/80"
                    >
                      {copy.fieldType}
                    </span>
                    <div className="flex flex-col gap-3">
                      {copy.commissionGroups.map((group) => (
                        <div
                          key={group.colsClass}
                          className={`grid ${group.colsClass} gap-3`}
                        >
                          {group.options.map((part) => {
                            const checked = selectedParts.includes(part.value);
                            return (
                              <label
                                key={part.value}
                                className={`flex flex-col justify-start rounded-[14px] border px-4 py-3.5 cursor-pointer select-none transition-colors focus-within:ring-2 focus-within:ring-[#fff0a6] ${
                                  checked
                                    ? "bg-[#f5f8fc]/[0.14] border-[#fff0a6] text-[#f5f8fc]"
                                    : "bg-[#f5f8fc]/[0.08] border-[#f5f8fc]/20 text-[#f5f8fc]/90 hover:border-[#f5f8fc]/45"
                                }`}
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
                                    className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                                      checked
                                        ? "theme-butter-card bg-[#fff0a6] border-[#fff0a6] text-[#111622]"
                                        : "border-[#f5f8fc]/40 bg-transparent"
                                    }`}
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
                                    className={`mt-1 pl-[30px] font-sans text-[12px] leading-[1.35] ${
                                      checked
                                        ? "text-[#fff0a6]/90"
                                        : "text-[#f5f8fc]/70"
                                    }`}
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
                        className="font-sans text-[14px] leading-[1.45] text-[#ffb4a2] pt-1"
                      >
                        {partsError}
                      </p>
                    )}

                    {hasDtdSelection && (
                      <div className="mt-1 rounded-[14px] bg-[#fff0a6]/[0.12] border border-[#fff0a6]/35 px-4 py-3 flex items-start gap-3">
                        <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#fff0a6]" />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#fff0a6]">
                            {copy.dtdCalloutTitle}
                          </span>
                          <p className="font-sans text-[13px] leading-[1.45] text-[#f5f8fc]/90">
                            {copy.dtdCalloutBody}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/80">
                      {copy.fieldNotes}
                    </span>
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
                    <p className="font-sans text-[13px] leading-[1.5] text-[#f5f8fc]/75">
                      {copy.termsNoticeBefore}
                      <Link
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#fff0a6] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] rounded"
                      >
                        {copy.termsNoticeLink}
                      </Link>
                      .
                    </p>
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="group inline-flex items-center justify-between gap-4 w-full sm:w-auto sm:min-w-[280px] px-[26px] py-[19px] rounded-full bg-[#f5f8fc] text-[#111622] hover:!bg-[#fff0a6] transition-colors font-sans text-[15px] font-semibold cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111622]"
                    >
                      <span>
                        {formState === "sending"
                          ? copy.submitSending
                          : commissionStatus.loaded && !commissionStatus.open
                          ? copy.submitWaitlist
                          : copy.submitIdle}
                      </span>
                      <ArrowRight className="w-[18px] h-[18px] shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>

                    {formError && (
                      <div
                        role="alert"
                        className="w-full rounded-[18px] bg-[#ffb4a2]/[0.12] border border-[#ffb4a2]/40 p-4 sm:p-5 flex flex-col gap-3 mt-1"
                      >
                        <p className="font-sans text-[14px] leading-[1.5] text-[#ffb4a2]">
                          {formError}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={handleCopyInquiry}
                            className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-full bg-[#f5f8fc] text-[#111622] hover:!bg-[#fff0a6] font-sans text-[13px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6]"
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

                          <span className="font-sans text-[13px] text-[#f5f8fc]/75">
                            {copy.errorDirectNote}
                          </span>

                          <a
                            href={mailtoRecoveryHref}
                            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#fff0a6] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] rounded"
                          >
                            <Mail className="w-4 h-4" />
                            <span>FluffNii.furries@gmail.com</span>
                          </a>

                          <a
                            href="https://www.instagram.com/fluffnii.fur"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#fff0a6] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6] rounded"
                          >
                            <span>IG @fluffnii.fur</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {copyFallbackText && (
                          <div className="flex flex-col gap-1.5 pt-1">
                            <span className="font-sans text-[12px] text-[#f5f8fc]/80">
                              {copy.copyInquiryFail}
                            </span>
                            <textarea
                              readOnly
                              rows={4}
                              value={copyFallbackText}
                              onFocus={(e) => e.currentTarget.select()}
                              className="w-full rounded-[12px] bg-[#111622] border border-[#f5f8fc]/25 p-3 font-mono text-[12px] text-[#f5f8fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fff0a6]"
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
      </main>

      <Footer />

      <ShowcaseLightbox
        items={activeLightboxItems}
        activeIndex={lightboxState ? lightboxState.index : null}
        onChangeIndex={(nextIdx) => {
          if (nextIdx === null) {
            setLightboxState(null);
            return;
          }
          setLightboxState((prev) =>
            prev ? { ...prev, index: nextIdx } : null
          );
        }}
        onRequestSimilar={(item) => {
          setLightboxState(null);
          jumpToContactWithParts(item.partValues);
        }}
        closeAria={copy.lightboxCloseAria}
        prevAria={copy.lightboxPrevAria}
        nextAria={copy.lightboxNextAria}
        ctaLabel={copy.lightboxCta}
      />
    </div>
  );
}
