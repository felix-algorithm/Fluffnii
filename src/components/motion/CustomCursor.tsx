"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useDeviceTier } from "@/lib/deviceTier";
import { cn } from "@/lib/cn";

export interface CustomCursorProps {
  /** Kept for compatibility; cursor labels are disabled so only the dot renders. */
  labels?: Partial<Record<"inspect" | "drag" | "open", string>>;
}

/**
 * Compact studio cursor dot active strictly on desktop `pointer: fine` devices
 * at `high` or `mid` performance tiers, hiding automatically over form inputs.
 */
export default function CustomCursor(_props: CustomCursorProps) {
  const { enableCustomCursor } = useDeviceTier();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enableCustomCursor || typeof window === "undefined") {
      setVisible(false);
      return;
    }

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    const xTo = gsap.quickTo(cursorEl, "x", {
      duration: 0.24,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursorEl, "y", {
      duration: 0.24,
      ease: "power3.out",
    });

    let activeVisible = false;
    let lastTarget: EventTarget | null = null;

    const shouldHideCursor = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          'input, textarea, select, [contenteditable="true"], [data-cursor="hide"]'
        )
      );
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        lastTarget = null;
        if (activeVisible) {
          activeVisible = false;
          setVisible(false);
        }
        return;
      }

      xTo(e.clientX);
      yTo(e.clientY);

      if (e.target !== lastTarget) {
        lastTarget = e.target;
        const nextVisible = !shouldHideCursor(e.target);
        if (nextVisible !== activeVisible) {
          activeVisible = nextVisible;
          setVisible(nextVisible);
        }
      }
    };

    const hideCursor = () => {
      lastTarget = null;
      activeVisible = false;
      setVisible(false);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, [enableCustomCursor]);

  if (!enableCustomCursor) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        "fixed top-0 left-0 z-[90] pointer-events-none select-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="w-3 h-3 rounded-full border bg-espresso/85 border-cream/70 dark:bg-butter/90 dark:border-ink/40 shadow-float" />
    </div>
  );
}
