"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useDeviceTier } from "@/lib/deviceTier";
import { cn } from "@/lib/cn";

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Outer pull strength relative to cursor offset (default 0.22) */
  strength?: number;
  /** Optional subtle inner counter-shift multiplier (default 0.1) */
  innerStrength?: number;
  disabled?: boolean;
  cursorLabel?: string;
  as?: "div" | "span";
  onClick?: React.MouseEventHandler<HTMLElement>;
}

/**
 * Pointer-fine magnetic pull wrapper driven by `gsap.quickTo`.
 * Cleanly bypasses motion listeners on touch, low-tier, and reduced-motion devices.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.22,
  innerStrength = 0.1,
  disabled = false,
  cursorLabel,
  as = "div",
  onClick,
}: MagneticButtonProps) {
  const { isTouch, isReducedMotion, tier } = useDeviceTier();
  const isInteractive = !disabled && !isTouch && !isReducedMotion && tier !== "low";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    const inner = innerRef.current;
    if (!el || !isInteractive) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    const ixTo = inner
      ? gsap.quickTo(inner, "x", { duration: 0.45, ease: "power3.out" })
      : null;
    const iyTo = inner
      ? gsap.quickTo(inner, "y", { duration: 0.45, ease: "power3.out" })
      : null;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      xTo(dx * strength);
      yTo(dy * strength);
      ixTo?.(dx * innerStrength);
      iyTo?.(dy * innerStrength);
    };

    const reset = () => {
      xTo(0);
      yTo(0);
      ixTo?.(0);
      iyTo?.(0);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointercancel", reset);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointercancel", reset);
      gsap.set(el, { x: 0, y: 0 });
      if (inner) gsap.set(inner, { x: 0, y: 0 });
    };
  }, [isInteractive, strength, innerStrength]);

  const Tag = as;

  return (
    <Tag
      ref={wrapperRef as React.RefObject<HTMLDivElement>}
      data-cursor-label={cursorLabel}
      onClick={onClick}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span ref={innerRef} className="inline-flex items-center justify-center">
        {children}
      </span>
    </Tag>
  );
}
