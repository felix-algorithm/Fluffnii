"use client";

import { useCallback, useEffect, useState } from "react";

export type DeviceTier = "high" | "mid" | "low" | "reduced-motion";

export interface DeviceCapabilities {
  tier: DeviceTier;
  enableWebGL: boolean;
  dpr: number;
  particleCount: number;
  enableCustomCursor: boolean;
  enableSmoothScroll: boolean;
  isTouch: boolean;
  isReducedMotion: boolean;
  viewportWidth: number;
  runtimeSteppedDown: boolean;
}

type TierOverride = "mid" | "low" | null;

const SSR_DEFAULT_CAPABILITIES: DeviceCapabilities = {
  tier: "mid",
  enableWebGL: false,
  dpr: 1,
  particleCount: 40,
  enableCustomCursor: false,
  enableSmoothScroll: false,
  isTouch: false,
  isReducedMotion: false,
  viewportWidth: 1280,
  runtimeSteppedDown: false,
};

let cachedWebGLSupport: boolean | null = null;
let runtimeOverride: TierOverride = null;
const listeners = new Set<() => void>();

let monitorActive = false;
let monitorRafId = 0;
let monitorCleanupListeners: (() => void) | null = null;

function notifyListeners() {
  listeners.forEach((cb) => cb());
}

/**
 * Probes WebGL1/2 availability once and releases the test context immediately
 * so browser WebGL context slots are never leaked.
 */
export function detectWebGLSupport(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  if (cachedWebGLSupport !== null) {
    return cachedWebGLSupport;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl", { failIfMajorPerformanceCaveat: false }) as WebGLRenderingContext | null);

    if (!gl) {
      cachedWebGLSupport = false;
      return false;
    }

    const loseExt = gl.getExtension("WEBGL_lose_context");
    loseExt?.loseContext();
    cachedWebGLSupport = true;
    return true;
  } catch {
    cachedWebGLSupport = false;
    return false;
  }
}

function computeCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return SSR_DEFAULT_CAPABILITIES;
  }

  const isReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const isCoarsePointer =
    window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const hasFinePointer =
    window.matchMedia?.("(pointer: fine)")?.matches ?? !isCoarsePointer;
  const viewportWidth = window.innerWidth || 1280;
  const isTouch =
    isCoarsePointer ||
    ((navigator.maxTouchPoints ?? 0) > 0 && viewportWidth < 1024);

  if (isReducedMotion) {
    return {
      tier: "reduced-motion",
      enableWebGL: false,
      dpr: 1,
      particleCount: 0,
      enableCustomCursor: false,
      enableSmoothScroll: false,
      isTouch,
      isReducedMotion: true,
      viewportWidth,
      runtimeSteppedDown: false,
    };
  }

  const hasWebGL = detectWebGLSupport();
  const cores = navigator.hardwareConcurrency ?? 4;
  const navWithExtras = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const memory = navWithExtras.deviceMemory ?? 4;
  const saveData = navWithExtras.connection?.saveData ?? false;
  const rawDpr = window.devicePixelRatio || 1;

  let baseTier: "high" | "mid" | "low";
  if (!hasWebGL || saveData || cores <= 2 || memory <= 2) {
    baseTier = "low";
  } else if (isTouch || viewportWidth < 768 || cores <= 4 || memory <= 4) {
    baseTier = "mid";
  } else {
    baseTier = "high";
  }

  let effectiveTier: "high" | "mid" | "low" = baseTier;
  let runtimeSteppedDown = false;

  if (runtimeOverride === "low" && baseTier !== "low") {
    effectiveTier = "low";
    runtimeSteppedDown = true;
  } else if (runtimeOverride === "mid" && baseTier === "high") {
    effectiveTier = "mid";
    runtimeSteppedDown = true;
  }

  const canDesktopCursor =
    hasFinePointer && !isTouch && viewportWidth >= 1024;
  const canSmoothScroll = !isTouch && effectiveTier !== "low";

  if (effectiveTier === "high") {
    return {
      tier: "high",
      enableWebGL: hasWebGL,
      dpr: Math.min(rawDpr, 2),
      particleCount: 96,
      enableCustomCursor: canDesktopCursor,
      enableSmoothScroll: canSmoothScroll,
      isTouch,
      isReducedMotion: false,
      viewportWidth,
      runtimeSteppedDown,
    };
  }

  if (effectiveTier === "mid") {
    return {
      tier: "mid",
      enableWebGL: hasWebGL,
      dpr: Math.min(rawDpr, 1.5),
      particleCount: 40,
      enableCustomCursor: canDesktopCursor,
      enableSmoothScroll: canSmoothScroll,
      isTouch,
      isReducedMotion: false,
      viewportWidth,
      runtimeSteppedDown,
    };
  }

  return {
    tier: "low",
    enableWebGL: false,
    dpr: 1,
    particleCount: 0,
    enableCustomCursor: false,
    enableSmoothScroll: false,
    isTouch,
    isReducedMotion: false,
    viewportWidth,
    runtimeSteppedDown,
  };
}

export function getDeviceCapabilities(): DeviceCapabilities {
  return computeCapabilities();
}

/**
 * Steps down runtime visual intensity when frame timing degrades or a WebGL context struggles.
 */
export function stepDownDeviceTier(target?: "mid" | "low"): void {
  const current = computeCapabilities();
  if (current.tier === "reduced-motion" || current.tier === "low") {
    return;
  }

  const nextOverride: TierOverride =
    target ?? (current.tier === "high" ? "mid" : "low");

  if (runtimeOverride === "low" || runtimeOverride === nextOverride) {
    return;
  }

  runtimeOverride = nextOverride;
  notifyListeners();
}

function stopFrameMonitor() {
  if (monitorRafId) {
    window.cancelAnimationFrame(monitorRafId);
    monitorRafId = 0;
  }
  monitorCleanupListeners?.();
  monitorCleanupListeners = null;
  monitorActive = false;
}

function startFrameMonitorIfNeeded() {
  if (typeof window === "undefined" || monitorActive || listeners.size === 0) {
    return;
  }

  const initial = computeCapabilities();
  if (initial.tier !== "high" && initial.tier !== "mid") {
    return;
  }

  monitorActive = true;
  let lastTime = performance.now();
  let windowStart = lastTime;
  let frames = 0;
  let totalDelta = 0;
  let slowStreak = 0;
  let stableStreak = 0;

  const onVisibility = () => {
    lastTime = performance.now();
    windowStart = lastTime;
    frames = 0;
    totalDelta = 0;
  };
  document.addEventListener("visibilitychange", onVisibility);

  monitorCleanupListeners = () => {
    document.removeEventListener("visibilitychange", onVisibility);
  };

  const sample = (now: number) => {
    if (listeners.size === 0) {
      stopFrameMonitor();
      return;
    }

    if (!document.hidden) {
      const dt = now - lastTime;
      if (dt > 0 && dt < 220) {
        totalDelta += dt;
        frames += 1;
      }

      if (now - windowStart >= 1400) {
        if (frames >= 14) {
          const avgMs = totalDelta / frames;
          const cap = computeCapabilities();
          if (avgMs > 35) {
            slowStreak += 1;
            stableStreak = 0;
            if (slowStreak >= 2) {
              slowStreak = 0;
              if (cap.tier === "high") {
                stepDownDeviceTier("mid");
              } else if (cap.tier === "mid" && avgMs > 44) {
                stepDownDeviceTier("low");
                stopFrameMonitor();
                return;
              }
            }
          } else {
            slowStreak = 0;
            stableStreak += 1;
            if (stableStreak >= 4) {
              stopFrameMonitor();
              return;
            }
          }
        }
        windowStart = now;
        frames = 0;
        totalDelta = 0;
      }
    }

    lastTime = now;
    monitorRafId = window.requestAnimationFrame(sample);
  };

  monitorRafId = window.requestAnimationFrame(sample);
}

/**
 * Evaluates hardware tier, pointer modality, WebGL capability, reduced-motion preference,
 * and a bounded runtime frame-drop safety check.
 */
export function useDeviceTier(): DeviceCapabilities & {
  stepDown: (target?: "mid" | "low") => void;
} {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(
    SSR_DEFAULT_CAPABILITIES
  );

  useEffect(() => {
    const sync = () => setCapabilities(computeCapabilities());
    sync();

    listeners.add(sync);
    startFrameMonitorIfNeeded();

    const reducedMq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const pointerMq = window.matchMedia?.("(pointer: coarse)");

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(sync, 120);
    };

    reducedMq?.addEventListener?.("change", sync);
    pointerMq?.addEventListener?.("change", sync);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      listeners.delete(sync);
      if (listeners.size === 0) {
        stopFrameMonitor();
      }
      window.clearTimeout(resizeTimer);
      reducedMq?.removeEventListener?.("change", sync);
      pointerMq?.removeEventListener?.("change", sync);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const stepDown = useCallback((target?: "mid" | "low") => {
    stepDownDeviceTier(target);
  }, []);

  return {
    ...capabilities,
    stepDown,
  };
}
