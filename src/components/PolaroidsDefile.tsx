"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";

export interface PolaroidSlide {
  src: string;
  legende: string;
  alt?: string;
}

export type PolaroidMode = "pile" | "bande" | "diagonale";

export interface PolaroidsDefileProps {
  slides?: PolaroidSlide[];
  images?: string[];
  mode?: PolaroidMode;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const ROT = [-4, 3, -2, 5, -3, 2, -5, 4] as const;
const num = (i: number) => `(${String(i + 1).padStart(3, "0")})`;

const HERO_POLAROIDS: PolaroidSlide[] = [
  { src: "/images/hero-01.webp", legende: "(001)", alt: "FluffNii Studio fursuit head" },
  { src: "/images/hero-02.webp", legende: "(002)", alt: "FluffNii Studio custom fursuit photo 2" },
];

interface PolaroidCardProps {
  src: string;
  cap: string;
  alt: string;
  width: number | string;
  rotate?: number;
  priority?: boolean;
  style?: React.CSSProperties;
}

function Polaroid({
  src,
  cap,
  alt,
  width,
  rotate = 0,
  priority = false,
  style,
}: PolaroidCardProps) {
  return (
    <div
      className="flex-none bg-white pt-2 px-2 pb-[30px] rounded-[3px] relative shadow-[0_20px_34px_-18px_rgba(30,53,87,0.48),0_2px_4px_rgba(30,53,87,0.12)]"
      style={{
        width,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      <div className="w-full aspect-square bg-taupe rounded-[2px] overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={840}
          height={840}
          fetchPriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          loading={priority ? "eager" : "lazy"}
          draggable={false}
          className="w-full h-full object-cover object-center block"
        />
      </div>
      <span className="absolute left-0 right-0 bottom-[9px] text-center font-mono text-[10px] tracking-wider uppercase text-ink select-none">
        {cap}
      </span>
    </div>
  );
}

function usePreload(imgs: PolaroidSlide[], need = 2, timeout = 6000): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || imgs.length === 0) {
      setReady(true);
      return;
    }

    let cancelled = false;
    const target = Math.min(need, imgs.length);
    if (target === 0) {
      setReady(true);
      return;
    }

    const seen = new Set<number>();

    const markDone = (idx: number) => {
      if (seen.has(idx)) return;
      seen.add(idx);
      if (!cancelled && seen.size >= target) {
        setReady(true);
      }
    };

    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled) {
        setReady(true);
      }
    }, timeout);

    const eagerImages = imgs.slice(0, target).map((item, idx) => {
      const img = new window.Image();
      img.decoding = idx === 0 ? "sync" : "async";
      img.onload = () => markDone(idx);
      img.onerror = () => markDone(idx);
      img.src = item.src;
      if (img.complete) {
        markDone(idx);
      }
      return img;
    });

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      eagerImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imgs, need, timeout]);

  return ready;
}

function useStart(delay: number): boolean {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const win = window as Window & { __gioiaClic?: boolean };
    const hasHash = Boolean(window.location.hash);
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("fluffnii-intro-seen") === "1";
    } catch {
      seen = false;
    }

    const introRunning = win.__gioiaClic === false;
    if (
      delay <= 0 ||
      (!introRunning && (hasHash || reduced || seen || win.__gioiaClic === true))
    ) {
      setStarted(true);
      return;
    }

    setStarted(false);
    let timerId: number | undefined;

    const finish = () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
      setStarted(true);
    };

    const onClic = () => {
      if (win.__gioiaClic !== false) {
        finish();
      }
    };

    window.addEventListener("gioia:clic", onClic, { once: true });

    timerId = window.setTimeout(() => {
      if (win.__gioiaClic === true || win.__gioiaClic === undefined) {
        finish();
      } else {
        timerId = window.setTimeout(finish, 300);
      }
    }, delay * 1000);

    return () => {
      window.removeEventListener("gioia:clic", onClic);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [delay]);

  return started;
}

function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function useActive(ref: React.RefObject<HTMLElement | null>): boolean {
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisibilityChange = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return inView && tabVisible;
}

interface ModeProps {
  imgs: PolaroidSlide[];
  started: boolean;
  speed: number;
  reducedMotion: boolean;
}

interface PileItem {
  uid: number;
  slideIdx: number;
}

function Pile({ imgs, started, speed, reducedMotion }: ModeProps) {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const active = useActive(containerRef);
  const [stack, setStack] = useState<PileItem[]>([{ uid: 0, slideIdx: 0 }]);
  const uidRef = useRef(0);
  const autoStepsRef = useRef(0);
  const prefetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    uidRef.current = 0;
    autoStepsRef.current = 0;
    prefetchedRef.current.clear();
    setStack([{ uid: 0, slideIdx: 0 }]);
  }, [imgs]);

  const pushSlide = useCallback(
    (delta: 1 | -1) => {
      if (imgs.length <= 1) return;
      setStack((prev) => {
        const top = prev[prev.length - 1] ?? { uid: 0, slideIdx: 0 };
        const nextUid = uidRef.current + 1;
        uidRef.current = nextUid;
        const nextIdx = (top.slideIdx + delta + imgs.length) % imgs.length;
        return [...prev.slice(-5), { uid: nextUid, slideIdx: nextIdx }];
      });
    },
    [imgs.length]
  );

  useEffect(() => {
    if (!started || !active || reducedMotion || imgs.length <= 1) return;

    let t: number | undefined;
    const safeSpeed = Math.max(0.1, speed);

    const schedule = () => {
      const ms = autoStepsRef.current < imgs.length ? 110 : 1600 / safeSpeed;
      t = window.setTimeout(() => {
        autoStepsRef.current += 1;
        pushSlide(1);
        schedule();
      }, ms);
    };

    schedule();
    return () => {
      if (t !== undefined) window.clearTimeout(t);
    };
  }, [started, active, reducedMotion, imgs.length, speed, pushSlide]);

  const currentSlideIdx = stack[stack.length - 1]?.slideIdx ?? 0;

  useEffect(() => {
    if (!started || !active || imgs.length <= 2 || typeof window === "undefined") {
      return;
    }
    if (reducedMotion && currentSlideIdx === 0) return;

    const nextIdx = (currentSlideIdx + 1) % imgs.length;
    if (currentSlideIdx === 0 && nextIdx < 2 && autoStepsRef.current === 0) {
      return;
    }

    const nextSrc = imgs[nextIdx]?.src;
    if (!nextSrc || prefetchedRef.current.has(nextSrc)) return;

    let cancelled = false;
    const img = new window.Image();
    img.decoding = "async";
    const clearListeners = () => {
      img.onload = null;
      img.onerror = null;
    };
    img.onload = () => {
      if (!cancelled) {
        prefetchedRef.current.add(nextSrc);
      }
      clearListeners();
    };
    img.onerror = clearListeners;
    img.src = nextSrc;

    return () => {
      cancelled = true;
      clearListeners();
    };
  }, [started, active, reducedMotion, currentSlideIdx, imgs]);

  if (imgs.length === 0) return null;

  const displayIndex = currentSlideIdx + 1;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={
        lang === "vi" ? "Thư viện ảnh fursuit nổi bật" : "Featured fursuit gallery"
      }
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        userSelect: "none",
      }}
    >
      <div
        onClick={() => pushSlide(1)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
          cursor: imgs.length > 1 ? "pointer" : "default",
        }}
      >
        {stack.map((entry) => {
          const item = imgs[entry.slideIdx] ?? imgs[0];
          const targetRotate = ((entry.uid * 37) % 14) - 7;
          const isInitial = entry.uid === 0;
          const cardAlt =
            item.alt ??
            (entry.slideIdx === 0
              ? "FluffNii Studio fursuit head"
              : `FluffNii Studio fursuit ${item.legende || num(entry.slideIdx)}`);

          return (
            <motion.div
              key={entry.uid}
              initial={
                isInitial || reducedMotion
                  ? false
                  : {
                      x: 60,
                      y: -40,
                      rotate: targetRotate * 2,
                      opacity: 0,
                    }
              }
              animate={{
                x: 0,
                y: 0,
                rotate: targetRotate,
                opacity: 1,
              }}
              transition={{ duration: reducedMotion ? 0 : 0.45, ease: EASE }}
              style={{
                position: "absolute",
                width: "min(88%, 420px)",
                willChange: "transform, opacity",
              }}
            >
              <Polaroid
                src={item.src}
                cap={item.legende || num(entry.slideIdx)}
                alt={cardAlt}
                width="100%"
                priority={entry.slideIdx === 0}
              />
            </motion.div>
          );
        })}
      </div>

      <span
        aria-live="polite"
        className="absolute right-0 bottom-1 z-10 font-mono text-xs tracking-eyebrow text-ink bg-cream/85 border border-transparent dark:text-cream dark:bg-night-surface/90 dark:border-cream/15 px-2 py-[3px] rounded-full pointer-events-none"
      >
        {String(displayIndex).padStart(2, "0")} /{" "}
        {String(imgs.length).padStart(2, "0")}
      </span>
    </div>
  );
}

interface LaneProps {
  imgs: PolaroidSlide[];
  started: boolean;
  active: boolean;
  reducedMotion: boolean;
  speed: number;
  direction?: 1 | -1;
  cardWidth?: number;
  gap?: number;
}

function Lane({
  imgs,
  started,
  active,
  reducedMotion,
  speed,
  direction = 1,
  cardWidth = 220,
  gap = 20,
}: LaneProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (!started || !active || reducedMotion || imgs.length === 0) return;

    const span = imgs.length * (cardWidth + gap);
    let rafId = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      offsetRef.current = (offsetRef.current + dt * 48 * speed) % span;
      const x = direction === 1 ? -offsetRef.current : offsetRef.current - span;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [started, active, reducedMotion, imgs.length, speed, direction, cardWidth, gap]);

  const doubled = useMemo(() => [...imgs, ...imgs], [imgs]);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap,
          willChange: "transform",
          padding: "16px 0",
        }}
      >
        {doubled.map((item, idx) => (
          <Polaroid
            key={`${item.src}-${idx}`}
            src={item.src}
            cap={item.legende || num(idx % imgs.length)}
            alt={item.alt ?? `FluffNii Studio fursuit ${item.legende || num(idx % imgs.length)}`}
            width={cardWidth}
            rotate={ROT[idx % ROT.length]}
          />
        ))}
      </div>
    </div>
  );
}

function Bande({ imgs, started, speed, reducedMotion }: ModeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive(ref);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Lane
        imgs={imgs}
        started={started}
        active={active}
        reducedMotion={reducedMotion}
        speed={speed}
      />
    </div>
  );
}

function Diagonale({ imgs, started, speed, reducedMotion }: ModeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useActive(ref);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <div style={{ transform: "rotate(-6deg)", transformOrigin: "center" }}>
        <Lane
          imgs={imgs}
          started={started}
          active={active}
          reducedMotion={reducedMotion}
          speed={speed}
          direction={1}
          cardWidth={190}
          gap={18}
        />
        <Lane
          imgs={imgs}
          started={started}
          active={active}
          reducedMotion={reducedMotion}
          speed={speed * 0.85}
          direction={-1}
          cardWidth={190}
          gap={18}
        />
      </div>
    </div>
  );
}

export function PolaroidsDefile({
  slides,
  images,
  mode = "pile",
  delay = 1.8,
  speed = 1,
  className,
  style,
}: PolaroidsDefileProps) {
  const imgs = useMemo<PolaroidSlide[]>(() => {
    if (slides && slides.length > 0) return slides;
    if (images && images.length > 0) {
      return images.map((src, i) => ({
        src,
        legende: num(i),
        alt: i === 0 ? "FluffNii Studio fursuit head" : `FluffNii Studio fursuit ${num(i)}`,
      }));
    }
    return HERO_POLAROIDS;
  }, [slides, images]);

  const started = useStart(delay);
  const ready = usePreload(imgs, 2, 6000);
  const reducedMotion = useReducedMotionPref();
  const go = started && ready;

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        ...style,
      }}
    >
      {mode === "bande" ? (
        <Bande
          imgs={imgs}
          started={go}
          speed={speed}
          reducedMotion={reducedMotion}
        />
      ) : mode === "diagonale" ? (
        <Diagonale
          imgs={imgs}
          started={go}
          speed={speed}
          reducedMotion={reducedMotion}
        />
      ) : (
        <Pile
          imgs={imgs}
          started={go}
          speed={speed}
          reducedMotion={reducedMotion}
        />
      )}
    </div>
  );
}

export default PolaroidsDefile;
