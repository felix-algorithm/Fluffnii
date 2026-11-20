/* Lucian UX/UI Prompt #267 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#267 */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "./LanguageProvider";
import "./lucian-267.css";

const LANGUAGES: ReadonlyArray<{
  code: "EN" | "VI";
  lang: Lang;
  name: string;
  flag: string;
}> = [
  { code: "EN", lang: "en", name: "English", flag: "🇺🇸" },
  { code: "VI", lang: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
];

export default function LucianLanguageSwitch() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusRafRef = useRef<number | null>(null);

  const current = LANGUAGES.find((item) => item.lang === lang) ?? LANGUAGES[0];

  useEffect(() => {
    return () => {
      if (focusRafRef.current !== null) {
        window.cancelAnimationFrame(focusRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const scheduleOptionFocus = (index: number) => {
    if (focusRafRef.current !== null) {
      window.cancelAnimationFrame(focusRafRef.current);
    }
    focusRafRef.current = window.requestAnimationFrame(() => {
      focusRafRef.current = null;
      optionRefs.current[index]?.focus();
    });
  };

  const handleSelect = (nextLang: Lang) => {
    setLang(nextLang);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const targetIndex = e.key === "ArrowUp" ? LANGUAGES.length - 1 : 0;
      if (!open) {
        setOpen(true);
        scheduleOptionFocus(targetIndex);
      } else {
        optionRefs.current[targetIndex]?.focus();
      }
    }
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      optionRefs.current[(index + 1) % LANGUAGES.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      optionRefs.current[
        (index - 1 + LANGUAGES.length) % LANGUAGES.length
      ]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      optionRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      optionRefs.current[LANGUAGES.length - 1]?.focus();
    }
  };

  const triggerLabel =
    lang === "vi"
      ? `Ngôn ngữ: ${current.name}. Chọn để đổi ngôn ngữ`
      : `Language: ${current.name}. Open language menu`;

  return (
    <div
      ref={rootRef}
      className={`ux u267${open ? " is-open" : ""}`}
      onBlur={(e) => {
        if (
          e.relatedTarget instanceof Node &&
          !rootRef.current?.contains(e.relatedTarget)
        ) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="u267-gb"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={triggerLabel}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        <svg viewBox="0 0 14 14" aria-hidden="true">
          <circle
            cx="7"
            cy="7"
            r="5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M1.5 7h11M7 1.5c1.8 1.6 1.8 9.4 0 11M7 1.5c-1.8 1.6-1.8 9.4 0 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
        <span className="u267-cd">{current.code}</span>
      </button>

      <div
        className="u267-dd"
        role="listbox"
        aria-label={lang === "vi" ? "Chọn ngôn ngữ" : "Choose language"}
        aria-hidden={!open}
      >
        {LANGUAGES.map((item, index) => {
          const active = item.lang === lang;
          return (
            <button
              key={item.lang}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              type="button"
              role="option"
              aria-selected={active}
              lang={item.lang}
              tabIndex={open ? 0 : -1}
              className={`u267-op${active ? " is-on" : ""}`}
              onClick={() => handleSelect(item.lang)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
            >
              <em aria-hidden="true">{item.flag}</em>
              <span>{item.name}</span>
              <svg viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M2.5 7.5l3 3 6-6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
