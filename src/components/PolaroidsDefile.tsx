"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
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
const MONO = 'var(--font-space-mono), "Space Mono", ui-monospace, monospace';
const ROT = [-4, 3, -2, 5, -3, 2, -5, 4] as const;
const num = (i: number) => `(${String(i + 1).padStart(3, "0")})`;

const HERO_POLAROIDS: PolaroidSlide[] = [
  { src: "/images/hero-01.webp", legende: "(001)", alt: "FluffNii Studio fursuit head" },
  { src: "/images/hero-02.webp", legende: "(002)", alt: "FluffNii Studio custom fursuit photo 2" },
  { src: "/images/hero-03.webp", legende: "(003)", alt: "FluffNii Studio custom fursuit photo 3" },
  { src: "/images/hero-04.webp", legende: "(004)", alt: "FluffNii Studio custom fursuit photo 4" },
  { src: "/images/hero-05.webp", legende: "(005)", alt: "FluffNii Studio custom fursuit photo 5" },
  { src: "/images/hero-06.webp", legende: "(006)", alt: "FluffNii Studio custom fursuit photo 6" },
  { src: "/images/hero-07.webp", legende: "(007)", alt: "FluffNii Studio custom fursuit photo 7" },
  { src: "/images/hero-08.webp", legende: "(008)", alt: "FluffNii Studio custom fursuit photo 8" },
  { src: "/images/hero-09.webp", legende: "(009)", alt: "FluffNii Studio custom fursuit photo 9" },
  { src: "/images/hero-10.webp", legende: "(010)", alt: "FluffNii Studio custom fursuit photo 10" },
  { src: "/images/hero-11.webp", legende: "(011)", alt: "FluffNii Studio custom fursuit photo 11" },
  { src: "/images/hero-12.webp", legende: "(012)", alt: "FluffNii Studio custom fursuit photo 12" },
  { src: "/images/hero-13.webp", legende: "(013)", alt: "FluffNii Studio custom fursuit photo 13" },
  { src: "/images/hero-14.webp", legende: "(014)", alt: "FluffNii Studio custom fursuit photo 14" },
  { src: "/images/hero-15.webp", legende: "(015)", alt: "FluffNii Studio custom fursuit photo 15" },
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
      style={{
        flex: "none",
        width,
        background: "#fff",
        padding: "8px 8px 30px",
        borderRadius: 3,
        position: "relative",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        boxShadow:
          "0 20px 34px -18px rgba(30,53,87,0.48), 0 2px 4px rgba(30,53,87,0.12)",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1",
          backgroundColor: "#e9eff7",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <img
          src={src}
          alt={alt}
          width={840}
          height={840}
          fetchPriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          loading={priority ? "eager" : "lazy"}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 9,
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#111622",
          userSelect: "none",
        }}
      >
        {cap}
      </span>
    </div>
  );
}

function usePreload(imgs: PolaroidSlide[], need = 3, timeout = 6000): boolean {
  const [ready, setReady] = useState(false);
  const cacheRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || imgs.length === 0) {
      setReady(true);
      return;
    }

    let cancelled = false;
    const target = Math.min(need, imgs.length);
    const seen = new Set<number>();
    let idleTimer: number | undefined;

    const loadRemainingSequentially = (index: number) => {
      if (cancelled || index >= imgs.length) return;
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (!cancelled) loadRemainingSequentially(index + 1);
      };
      img.onerror = () => {
        if (!cancelled) loadRemainingSequentially(index + 1);
      };
      img.src = imgs[index].src;
      cacheRef.current.push(img);
    };

    const scheduleTail = () => {
      if (cancelled || imgs.length <= target || idleTimer !== undefined) return;
      idleTimer = window.setTimeout(() => {
        loadRemainingSequentially(target);
      }, 650);
    };

    const markDone = (idx: number) => {
      if (seen.has(idx)) return;
      seen.add(idx);
      if (!cancelled && seen.size >= target) {
        setReady(true);
        scheduleTail();
      }
    };

    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled) {
        setReady(true);
        scheduleTail();
      }
    }, timeout);

    const eagerImages = imgs.slice(0, target).map((item, idx) => {
      const img = new window.Image();
      img.onload = () => markDone(idx);
      img.onerror = () => markDone(idx);
      img.src = item.src;
      if (img.complete) {
        markDone(idx);
      }
      return img;
    });

    cacheRef.current = eagerImages;

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      if (idleTimer !== undefined) window.clearTimeout(idleTimer);
      cacheRef.current.forEach((img) => {
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

const CONTROL_BTN_CLASS =
  "w-9 h-9 min-h-[36px] min-w-[36px] rounded-full border border-[#111622]/20 bg-[#f5f8fc]/90 hover:bg-[#111622] hover:text-[#f5f8fc] text-[#111622] transition-colors inline-flex items-center justify-center cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111622] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f8fc]";

function Pile({ imgs, started, speed, reducedMotion }: ModeProps) {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const active = useActive(containerRef);
  const [paused, setPaused] = useState(false);
  const [stack, setStack] = useState<PileItem[]>([{ uid: 0, slideIdx: 0 }]);
  const uidRef = useRef(0);
  const autoStepsRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) {
      setPaused(true);
    }
  }, [reducedMotion]);

  useEffect(() => {
    uidRef.current = 0;
    autoStepsRef.current = 0;
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
    if (!started || !active || paused || imgs.length <= 1) return;

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
  }, [started, active, paused, imgs.length, speed, pushSlide]);

  if (imgs.length === 0) return null;

  const currentSlideIdx = stack[stack.length - 1]?.slideIdx ?? 0;
  const displayIndex = currentSlideIdx + 1;

  const prevLabel = lang === "vi" ? "Ảnh trước" : "Previous photo";
  const nextLabel = lang === "vi" ? "Ảnh tiếp theo" : "Next photo";
  const pausePlayLabel = paused
    ? lang === "vi"
      ? "Tiếp tục chạy ảnh"
      : "Play slideshow"
    : lang === "vi"
    ? "Tạm dừng chạy ảnh"
    : "Pause slideshow";

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

      {imgs.length > 1 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <button
            type="button"
            onClick={() => pushSlide(-1)}
            aria-label={prevLabel}
            className={CONTROL_BTN_CLASS}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={pausePlayLabel}
            aria-pressed={paused}
            className={CONTROL_BTN_CLASS}
          >
            {paused ? (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => pushSlide(1)}
            aria-label={nextLabel}
            className={CONTROL_BTN_CLASS}
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <span
        aria-live="polite"
        style={{
          position: "absolute",
          right: 0,
          bottom: 4,
          zIndex: 10,
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: "0.06em",
          color: "#111622",
          background: "rgba(245,248,252,0.85)",
          padding: "3px 8px",
          borderRadius: 999,
          pointerEvents: "none",
        }}
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
  const ready = usePreload(imgs, 3, 6000);
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
