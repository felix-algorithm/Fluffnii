"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface PolaroidSlide {
  src: string;
  legende: string;
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
  { src: "/images/hero-01.webp", legende: "(001)" },
  { src: "/images/hero-02.webp", legende: "(002)" },
  { src: "/images/hero-03.webp", legende: "(003)" },
  { src: "/images/hero-04.webp", legende: "(004)" },
  { src: "/images/hero-05.webp", legende: "(005)" },
  { src: "/images/hero-06.webp", legende: "(006)" },
  { src: "/images/hero-07.webp", legende: "(007)" },
  { src: "/images/hero-08.webp", legende: "(008)" },
  { src: "/images/hero-09.webp", legende: "(009)" },
  { src: "/images/hero-10.webp", legende: "(010)" },
  { src: "/images/hero-11.webp", legende: "(011)" },
  { src: "/images/hero-12.webp", legende: "(012)" },
  { src: "/images/hero-13.webp", legende: "(013)" },
  { src: "/images/hero-14.webp", legende: "(014)" },
  { src: "/images/hero-15.webp", legende: "(015)" },
];

interface PolaroidCardProps {
  src: string;
  cap: string;
  width: number | string;
  rotate?: number;
  style?: React.CSSProperties;
}

function Polaroid({ src, cap, width, rotate = 0, style }: PolaroidCardProps) {
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
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
        }}
      />
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

    const markDone = (idx: number) => {
      if (seen.has(idx)) return;
      seen.add(idx);
      if (!cancelled && seen.size >= target) {
        setReady(true);
      }
    };

    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, timeout);

    const images = imgs.map((item, idx) => {
      const img = new window.Image();
      if (idx < target) {
        img.onload = () => markDone(idx);
        img.onerror = () => markDone(idx);
      }
      img.src = item.src;
      if (idx < target && img.complete) {
        markDone(idx);
      }
      return img;
    });

    // Keep decoded Image objects referenced so GC doesn't purge them mid-loop.
    cacheRef.current = images;

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      images.forEach((img) => {
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
    setStarted(false);

    let timerId: number | undefined;
    const finish = () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
      setStarted(true);
    };

    const onClic = () => {
      const win = window as Window & { __gioiaClic?: boolean };
      if (win.__gioiaClic !== false) {
        finish();
      }
    };

    window.addEventListener("gioia:clic", onClic, { once: true });

    if (delay > 0) {
      timerId = window.setTimeout(() => {
        const win = window as Window & { __gioiaClic?: boolean };
        if (win.__gioiaClic === true || win.__gioiaClic === undefined) {
          finish();
        } else {
          // Wait slightly more in case Obturateur is finishing
          timerId = window.setTimeout(finish, 300);
        }
      }, delay * 1000);
    } else {
      finish();
    }

    return () => {
      window.removeEventListener("gioia:clic", onClic);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [delay]);

  return started;
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
}

function Pile({ imgs, started, speed }: ModeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const active = useActive(containerRef);
  const [n, setN] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    if (!started || !active || imgs.length <= 1) return;

    let t: number | undefined;
    const safeSpeed = Math.max(0.1, speed);

    const schedule = () => {
      const ms = stepRef.current < imgs.length ? 110 : 1600 / safeSpeed;
      t = window.setTimeout(() => {
        stepRef.current += 1;
        setN((v) => v + 1);
        schedule();
      }, ms);
    };

    schedule();
    return () => {
      if (t !== undefined) window.clearTimeout(t);
    };
  }, [started, imgs.length, speed, active]);

  if (imgs.length === 0) return null;

  const shownCount = Math.min(n + 1, 6);
  const baseIdx = n - Math.min(n, 5);
  const shown = Array.from({ length: shownCount }, (_, k) => baseIdx + k);
  const displayIndex = (n % imgs.length) + 1;

  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (imgs.length <= 1) return;
        stepRef.current += 1;
        setN((v) => v + 1);
      }}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        cursor: imgs.length > 1 ? "pointer" : "default",
        userSelect: "none",
      }}
      aria-label={`Featured fursuit gallery ${displayIndex} of ${imgs.length}`}
    >
      {shown.map((i) => {
        const slideIndex = i % imgs.length;
        const item = imgs[slideIndex];
        const targetRotate = ((i * 37) % 14) - 7;
        return (
          <motion.div
            key={i}
            initial={{
              x: 60,
              y: -40,
              rotate: targetRotate * 2,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              rotate: targetRotate,
              opacity: 1,
            }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{
              position: "absolute",
              width: "min(88%, 420px)",
              willChange: "transform, opacity",
            }}
          >
            <Polaroid
              src={item.src}
              cap={item.legende || num(slideIndex)}
              width="100%"
            />
          </motion.div>
        );
      })}

      <span
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: "0.06em",
          color: "#111622",
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
  speed: number;
  direction?: 1 | -1;
  cardWidth?: number;
  gap?: number;
}

function Lane({
  imgs,
  started,
  active,
  speed,
  direction = 1,
  cardWidth = 220,
  gap = 20,
}: LaneProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (!started || !active || imgs.length === 0) return;

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
  }, [started, active, imgs.length, speed, direction, cardWidth, gap]);

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
            width={cardWidth}
            rotate={ROT[idx % ROT.length]}
          />
        ))}
      </div>
    </div>
  );
}

function Bande({ imgs, started, speed }: ModeProps) {
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
      <Lane imgs={imgs} started={started} active={active} speed={speed} />
    </div>
  );
}

function Diagonale({ imgs, started, speed }: ModeProps) {
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
          speed={speed}
          direction={1}
          cardWidth={190}
          gap={18}
        />
        <Lane
          imgs={imgs}
          started={started}
          active={active}
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
      return images.map((src, i) => ({ src, legende: num(i) }));
    }
    return HERO_POLAROIDS;
  }, [slides, images]);

  const started = useStart(delay);
  const ready = usePreload(imgs, 3, 6000);
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
        <Bande imgs={imgs} started={go} speed={speed} />
      ) : mode === "diagonale" ? (
        <Diagonale imgs={imgs} started={go} speed={speed} />
      ) : (
        <Pile imgs={imgs} started={go} speed={speed} />
      )}
    </div>
  );
}

export default PolaroidsDefile;
