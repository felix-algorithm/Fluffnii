"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtelierPreloader from "@/components/motion/AtelierPreloader";
import ShowcaseLightbox, { type ShowcaseItem } from "@/components/ShowcaseLightbox";
import ChapterRail from "@/components/home/ChapterRail";
import HeroSection from "@/components/home/HeroSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import SpeciesShowcaseSection from "@/components/home/SpeciesShowcaseSection";
import MethodSection from "@/components/home/MethodSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import GallerySection from "@/components/home/GallerySection";
import OffersPackagesSection from "@/components/home/OffersPackagesSection";
import TimelineFaqSection from "@/components/home/TimelineFaqSection";
import ContactQuoteSection from "@/components/home/ContactQuoteSection";
import { useLang } from "@/components/LanguageProvider";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { HOME_COPY } from "@/lib/homeCopy";
import { consumePendingSection, scrollToSection } from "@/lib/sectionScroll";

interface CommissionStatusState {
  open: boolean;
  note: string;
  noteVi: string;
  loaded: boolean;
}

interface LightboxState {
  items: ShowcaseItem[];
  index: number;
}

const INTRO_SEEN_KEY = "fluffnii-intro-seen";

export default function HomePage() {
  const { lang } = useLang();
  const copy = HOME_COPY[lang];
  const { isEnabled: smoothEnabled, scrollToSection: smoothScrollToSection } =
    useSmoothScroll();

  const [heroReady, setHeroReady] = useState(false);
  const [heroInstant, setHeroInstant] = useState(false);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [commissionStatus, setCommissionStatus] =
    useState<CommissionStatusState>({
      open: true,
      note: "",
      noteVi: "",
      loaded: false,
    });

  const handleNavigateSection = useCallback(
    (sectionId: string) => {
      if (smoothEnabled) {
        smoothScrollToSection(sectionId);
      } else {
        scrollToSection(sectionId);
      }
    },
    [smoothEnabled, smoothScrollToSection]
  );

  const navigateRef = useRef(handleNavigateSection);
  navigateRef.current = handleNavigateSection;

  const focusTimerRef = useRef<number | null>(null);
  const scrollDelayTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (focusTimerRef.current !== null) {
        window.clearTimeout(focusTimerRef.current);
      }
      if (scrollDelayTimerRef.current !== null) {
        window.clearTimeout(scrollDelayTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const pendingSection = consumePendingSection();
    if (!pendingSection) return;
    const timer = window.setTimeout(() => {
      navigateRef.current(pendingSection);
    }, 90);
    return () => window.clearTimeout(timer);
  }, []);

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

  const openLightbox = useCallback((items: ShowcaseItem[], index: number) => {
    setLightbox({ items, index });
  }, []);

  const handleChangeLightboxIndex = useCallback((nextIndex: number | null) => {
    setLightbox((prev) => {
      if (nextIndex === null || !prev) return null;
      return { ...prev, index: nextIndex };
    });
  }, []);

  const handlePickParts = useCallback((parts: string[]) => {
    if (parts.length > 0) {
      setSelectedParts(parts);
    }
  }, []);

  const handleRequestSimilar = useCallback((item: ShowcaseItem) => {
    setLightbox(null);

    if (item.partValues.length > 0) {
      setSelectedParts((prev) => {
        const merged = new Set(prev);
        item.partValues.forEach((part) => merged.add(part));
        return Array.from(merged);
      });
    }

    if (scrollDelayTimerRef.current !== null) {
      window.clearTimeout(scrollDelayTimerRef.current);
    }
    if (focusTimerRef.current !== null) {
      window.clearTimeout(focusTimerRef.current);
    }

    scrollDelayTimerRef.current = window.setTimeout(() => {
      navigateRef.current("contact");
      focusTimerRef.current = window.setTimeout(() => {
        const nameInput = document.querySelector<HTMLInputElement>(
          '#contact input[name="name"]'
        );
        if (nameInput && !nameInput.value.trim()) {
          nameInput.focus({ preventScroll: true });
        }
      }, 450);
    }, 50);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-canvas text-fg">
      <AtelierPreloader onComplete={handlePreloaderComplete} />

      <Navbar
        commissionOpen={commissionStatus.open}
        commissionStatusLoaded={commissionStatus.loaded}
      />

      <ChapterRail lang={lang} />

      <main className="flex-1">
        <HeroSection
          copy={copy}
          lang={lang}
          commissionStatus={commissionStatus}
          heroReady={heroReady}
          heroInstant={heroInstant}
          onNavigateSection={handleNavigateSection}
        />

        <ManifestoSection copy={copy} lang={lang} />

        <SpeciesShowcaseSection copy={copy} lang={lang} />

        <MethodSection copy={copy} />

        <ProjectsSection
          copy={copy}
          lang={lang}
          onOpenProject={openLightbox}
        />

        <GallerySection
          copy={copy}
          lang={lang}
          onOpenPhoto={openLightbox}
          onNavigateSection={handleNavigateSection}
        />

        <OffersPackagesSection
          copy={copy}
          lang={lang}
          onPickParts={handlePickParts}
          onNavigateSection={handleNavigateSection}
        />

        <TimelineFaqSection
          copy={copy}
          lang={lang}
          onNavigateSection={handleNavigateSection}
        />

        <ContactQuoteSection
          copy={copy}
          lang={lang}
          commissionStatus={commissionStatus}
          selectedParts={selectedParts}
          onChangeSelectedParts={setSelectedParts}
        />
      </main>

      <Footer />

      <ShowcaseLightbox
        items={lightbox?.items ?? []}
        activeIndex={lightbox ? lightbox.index : null}
        onChangeIndex={handleChangeLightboxIndex}
        onRequestSimilar={handleRequestSimilar}
        closeAria={copy.lightboxCloseAria}
        prevAria={copy.lightboxPrevAria}
        nextAria={copy.lightboxNextAria}
        ctaLabel={copy.lightboxCta}
      />
    </div>
  );
}
