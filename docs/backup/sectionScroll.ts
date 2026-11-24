import type React from "react";

const PENDING_SECTION_KEY = "fluffnii-scroll-target";
const INTRO_SEEN_KEY = "fluffnii-intro-seen";

export function extractHomeSection(href?: string): string | null {
  if (!href) return null;
  const match = href.match(/^\/?#([a-zA-Z0-9_-]+)$/);
  return match ? match[1] : null;
}

export function isModifiedClick(e: React.MouseEvent): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

export function clearUrlHash() {
  if (typeof window === "undefined") return;
  if (window.location.hash) {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`
    );
  }
}

export function scrollToSection(sectionId: string) {
  if (typeof window === "undefined") return;
  const reduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

  if (sectionId === "top") {
    window.scrollTo({ top: 0, behavior });
  } else {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior, block: "start" });
    }
  }

  clearUrlHash();
}

export function navigateToHomeSection(
  sectionId: string,
  pathname: string | null,
  router: { push: (href: string) => void }
) {
  if (pathname === "/") {
    scrollToSection(sectionId);
    return;
  }
  try {
    window.sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
  }
  router.push("/");
}

export function consumePendingSection(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const pending = window.sessionStorage.getItem(PENDING_SECTION_KEY);
    if (pending) {
      window.sessionStorage.removeItem(PENDING_SECTION_KEY);
      return pending;
    }
  } catch {
  }
  return null;
}
