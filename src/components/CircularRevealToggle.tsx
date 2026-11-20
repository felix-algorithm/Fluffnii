/* Lucian UX/UI Prompt #219 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#219 */
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { useLang } from "./LanguageProvider";
import "./lucian-219.css";
import "./lucian-021.css";

export type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: (originEl?: HTMLElement | null) => void;
  setTheme: (next: ThemeMode) => void;
}

interface ViewTransitionLike {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition?: () => void;
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const themeRef = useRef<ThemeMode>("light");
  const mountedRef = useRef(true);
  const rafIdsRef = useRef<number[]>([]);
  const timeoutIdsRef = useRef<number[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const activeTransitionRef = useRef<ViewTransitionLike | null>(null);

  const clearPendingEffects = useCallback(() => {
    if (typeof window !== "undefined") {
      for (const id of rafIdsRef.current) {
        window.cancelAnimationFrame(id);
      }
      for (const id of timeoutIdsRef.current) {
        window.clearTimeout(id);
      }
    }
    rafIdsRef.current = [];
    timeoutIdsRef.current = [];

    if (overlayRef.current) {
      overlayRef.current.remove();
      overlayRef.current = null;
    }

    if (activeTransitionRef.current?.skipTransition) {
      try {
        activeTransitionRef.current.skipTransition();
      } catch {
      }
      activeTransitionRef.current = null;
    }

    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("u219-vt");
    }
  }, []);

  useEffect(() => {
    themeRef.current = theme;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearPendingEffects();
    };
  }, [clearPendingEffects]);

  const setTheme = useCallback(
    (next: ThemeMode) => {
      clearPendingEffects();
      themeRef.current = next;
      if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = next;
      }
      setThemeState(next);
    },
    [clearPendingEffects]
  );

  const toggleTheme = useCallback(
    (originEl?: HTMLElement | null) => {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

      const root = document.documentElement;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let cx = vw - 48;
      let cy = 48;

      if (originEl) {
        const rect = originEl.getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) {
          cx = rect.left + rect.width / 2;
          cy = rect.top + rect.height / 2;
        }
      }

      const cr = Math.ceil(
        Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy))
      );

      root.style.setProperty("--cx", `${cx}px`);
      root.style.setProperty("--cy", `${cy}px`);
      root.style.setProperty("--cr", `${cr}px`);

      const nextTheme: ThemeMode = themeRef.current === "dark" ? "light" : "dark";
      const reducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
        false;

      if (reducedMotion) {
        clearPendingEffects();
        themeRef.current = nextTheme;
        root.dataset.theme = nextTheme;
        setThemeState(nextTheme);
        return;
      }

      const docWithVt = document as DocumentWithViewTransition;
      if (typeof docWithVt.startViewTransition === "function") {
        clearPendingEffects();
        root.classList.add("u219-vt");
        try {
          const transition = docWithVt.startViewTransition(() => {
            flushSync(() => {
              themeRef.current = nextTheme;
              root.dataset.theme = nextTheme;
              setThemeState(nextTheme);
            });
          });
          activeTransitionRef.current = transition;

          transition.ready
            .then(() => {
              if (!mountedRef.current) return;
              root.animate(
                {
                  clipPath: [
                    `circle(0px at ${cx}px ${cy}px)`,
                    `circle(${cr}px at ${cx}px ${cy}px)`,
                  ],
                },
                {
                  duration: 700,
                  easing: "cubic-bezier(0.65, 0, 0.35, 1)",
                  pseudoElement: "::view-transition-new(root)",
                  fill: "both",
                }
              );
            })
            .catch(() => {});

          transition.finished.finally(() => {
            if (activeTransitionRef.current === transition) {
              activeTransitionRef.current = null;
              root.classList.remove("u219-vt");
            }
          });
          return;
        } catch {
          root.classList.remove("u219-vt");
        }
      }

      clearPendingEffects();
      const overlay = document.createElement("div");
      overlay.className = "ux u219-dk";
      overlay.dataset.theme = nextTheme;
      overlay.style.setProperty(
        "--ux-page",
        nextTheme === "dark" ? "#0b0f17" : "#f5f8fc"
      );
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
      overlayRef.current = overlay;

      void overlay.offsetWidth;

      const startRaf = window.requestAnimationFrame(() => {
        if (!mountedRef.current || overlayRef.current !== overlay) return;
        overlay.classList.add("is-on");

        const finishTimer = window.setTimeout(() => {
          const swapRaf = window.requestAnimationFrame(() => {
            if (!mountedRef.current || overlayRef.current !== overlay) return;
            themeRef.current = nextTheme;
            root.dataset.theme = nextTheme;
            setThemeState(nextTheme);
            overlay.classList.add("is-done");

            const removeTimer = window.setTimeout(() => {
              if (overlayRef.current === overlay) {
                overlay.remove();
                overlayRef.current = null;
              }
            }, 220);
            timeoutIdsRef.current.push(removeTimer);
          });
          rafIdsRef.current.push(swapRaf);
        }, 700);
        timeoutIdsRef.current.push(finishTimer);
      });
      rafIdsRef.current.push(startRaf);
    },
    [clearPendingEffects]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default function CircularRevealToggle({
  className = "",
}: {
  className?: string;
}) {
  const { isDark, toggleTheme } = useTheme();
  const { lang } = useLang();
  const knobRef = useRef<HTMLSpanElement | null>(null);

  const ariaLabel =
    lang === "vi"
      ? isDark
        ? "Chuyển sang giao diện sáng"
        : "Chuyển sang giao diện tối"
      : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme(knobRef.current ?? e.currentTarget);
  };

  const rootClassName = ["ux", "u021", isDark ? "is-night" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={rootClassName}>
      <button
        type="button"
        className="u021-sw"
        role="switch"
        aria-checked={isDark}
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={handleClick}
      >
        <span className="u021-halo" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="u021-stars" aria-hidden="true">
          <i style={{ left: "30px", top: "20px" }} />
          <i
            style={{
              left: "58px",
              top: "56px",
              animationDelay: "-0.6s",
              width: "3px",
              height: "3px",
            }}
          />
          <i style={{ left: "86px", top: "26px", animationDelay: "-1.2s" }} />
          <i
            style={{
              left: "44px",
              top: "72px",
              animationDelay: "-1.8s",
              width: "3px",
              height: "3px",
            }}
          />
          <i
            style={{
              left: "110px",
              top: "60px",
              animationDelay: "-0.9s",
              width: "2px",
              height: "2px",
            }}
          />
          <i
            style={{
              left: "20px",
              top: "46px",
              animationDelay: "-1.5s",
              width: "2px",
              height: "2px",
            }}
          />
        </span>
        <span className="u021-clouds" aria-hidden="true">
          <i />
          <i />
        </span>
        <span ref={knobRef} className="u021-knob" aria-hidden="true">
          <span className="u021-moon">
            <i />
            <i />
            <i />
          </span>
        </span>
      </button>
    </span>
  );
}
