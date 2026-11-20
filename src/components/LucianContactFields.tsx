/* Lucian UX/UI Prompt #209 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#209 */
"use client";

import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "./LanguageProvider";
import "./lucian-209.css";

interface CountrySpec {
  iso: string;
  flag: string;
  name: string;
  nameVi: string;
  dial: string;
  groups: number[];
  altGroups?: number[];
  minDigits: number;
  maxDigits: number;
  placeholder: string;
  separator: "-" | " ";
  useParens?: boolean;
}

const COUNTRIES: ReadonlyArray<CountrySpec> = [
  {
    iso: "VN",
    flag: "🇻🇳",
    name: "Vietnam",
    nameVi: "Việt Nam",
    dial: "+84",
    groups: [3, 3, 3],
    altGroups: [4, 3, 3],
    minDigits: 9,
    maxDigits: 10,
    placeholder: "0901 234 567",
    separator: " ",
  },
  {
    iso: "US",
    flag: "🇺🇸",
    name: "United States",
    nameVi: "Hoa Kỳ",
    dial: "+1",
    groups: [3, 3, 4],
    minDigits: 10,
    maxDigits: 10,
    placeholder: "(415) 555-0132",
    separator: "-",
    useParens: true,
  },
  {
    iso: "CA",
    flag: "🇨🇦",
    name: "Canada",
    nameVi: "Canada",
    dial: "+1",
    groups: [3, 3, 4],
    minDigits: 10,
    maxDigits: 10,
    placeholder: "(416) 555-0198",
    separator: "-",
    useParens: true,
  },
  {
    iso: "GB",
    flag: "🇬🇧",
    name: "United Kingdom",
    nameVi: "Vương quốc Anh",
    dial: "+44",
    groups: [5, 6],
    minDigits: 10,
    maxDigits: 11,
    placeholder: "07700 900123",
    separator: " ",
  },
  {
    iso: "AU",
    flag: "🇦🇺",
    name: "Australia",
    nameVi: "Úc",
    dial: "+61",
    groups: [4, 3, 3],
    minDigits: 9,
    maxDigits: 10,
    placeholder: "0412 345 678",
    separator: " ",
  },
  {
    iso: "SG",
    flag: "🇸🇬",
    name: "Singapore",
    nameVi: "Singapore",
    dial: "+65",
    groups: [4, 4],
    minDigits: 8,
    maxDigits: 8,
    placeholder: "8123 4567",
    separator: " ",
  },
  {
    iso: "JP",
    flag: "🇯🇵",
    name: "Japan",
    nameVi: "Nhật Bản",
    dial: "+81",
    groups: [3, 4, 4],
    minDigits: 10,
    maxDigits: 11,
    placeholder: "090-1234-5678",
    separator: "-",
  },
  {
    iso: "KR",
    flag: "🇰🇷",
    name: "South Korea",
    nameVi: "Hàn Quốc",
    dial: "+82",
    groups: [3, 4, 4],
    minDigits: 10,
    maxDigits: 11,
    placeholder: "010-1234-5678",
    separator: "-",
  },
  {
    iso: "DE",
    flag: "🇩🇪",
    name: "Germany",
    nameVi: "Đức",
    dial: "+49",
    groups: [4, 7],
    minDigits: 10,
    maxDigits: 11,
    placeholder: "0151 2345678",
    separator: " ",
  },
  {
    iso: "FR",
    flag: "🇫🇷",
    name: "France",
    nameVi: "Pháp",
    dial: "+33",
    groups: [2, 2, 2, 2, 2],
    minDigits: 9,
    maxDigits: 10,
    placeholder: "06 12 34 56 78",
    separator: " ",
  },
  {
    iso: "TH",
    flag: "🇹🇭",
    name: "Thailand",
    nameVi: "Thái Lan",
    dial: "+66",
    groups: [3, 3, 4],
    minDigits: 9,
    maxDigits: 10,
    placeholder: "081-234-5678",
    separator: "-",
  },
  {
    iso: "MY",
    flag: "🇲🇾",
    name: "Malaysia",
    nameVi: "Malaysia",
    dial: "+60",
    groups: [3, 3, 4],
    minDigits: 9,
    maxDigits: 10,
    placeholder: "012-345-6789",
    separator: "-",
  },
  {
    iso: "TW",
    flag: "🇹🇼",
    name: "Taiwan",
    nameVi: "Đài Loan",
    dial: "+886",
    groups: [4, 3, 3],
    minDigits: 9,
    maxDigits: 10,
    placeholder: "0912-345-678",
    separator: "-",
  },
  {
    iso: "PH",
    flag: "🇵🇭",
    name: "Philippines",
    nameVi: "Philippines",
    dial: "+63",
    groups: [4, 3, 4],
    minDigits: 10,
    maxDigits: 11,
    placeholder: "0917-123-4567",
    separator: "-",
  },
  {
    iso: "ID",
    flag: "🇮🇩",
    name: "Indonesia",
    nameVi: "Indonesia",
    dial: "+62",
    groups: [4, 4, 4],
    minDigits: 10,
    maxDigits: 12,
    placeholder: "0812-3456-7890",
    separator: "-",
  },
];

function formatDigits(digits: string, country: CountrySpec): string {
  if (!digits) return "";
  const groups =
    country.altGroups && (digits.startsWith("0") || digits.length > 9)
      ? country.altGroups
      : country.groups;
  const parts: string[] = [];
  let cursor = 0;
  for (const size of groups) {
    if (cursor < digits.length) {
      parts.push(digits.slice(cursor, cursor + size));
    }
    cursor += size;
  }
  if (cursor < digits.length && parts.length > 0) {
    parts[parts.length - 1] += digits.slice(cursor);
  }
  if (country.useParens && digits.length > 3) {
    return `(${parts[0]}) ${parts.slice(1).join("-")}`;
  }
  return parts.join(country.separator);
}

function parseExternalPhone(raw: string): { countryIndex: number; digits: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { countryIndex: 0, digits: "" };
  }
  const sortedByDialLength = COUNTRIES.map((c, idx) => ({ c, idx })).sort(
    (a, b) => b.c.dial.length - a.c.dial.length
  );
  for (const { c, idx } of sortedByDialLength) {
    if (trimmed.startsWith(c.dial)) {
      const rest = trimmed.slice(c.dial.length).replace(/\D/g, "");
      return { countryIndex: idx, digits: rest };
    }
  }
  return { countryIndex: 0, digits: trimmed.replace(/\D/g, "") };
}

function useTypingPulse() {
  const [typing, setTyping] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const triggerTyping = () => {
    setTyping(true);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setTyping(false);
    }, 240);
  };

  return { typing, triggerTyping };
}

function CheckIcon209() {
  return (
    <svg className="u209-ck" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      <path d="M6 10.3l2.6 2.6L14 7.5" />
    </svg>
  );
}

export interface CountryPhoneFieldProps {
  value: string;
  onChange: (nextValue: string) => void;
  lang: Lang;
  name?: string;
  label: string;
}

export function CountryPhoneField209({
  value,
  onChange,
  lang,
  name = "phone",
  label,
}: CountryPhoneFieldProps) {
  const [countryIndex, setCountryIndex] = useState(
    () => parseExternalPhone(value).countryIndex
  );
  const [digits, setDigits] = useState(() => parseExternalPhone(value).digits);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [blurred, setBlurred] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const { typing, triggerTyping } = useTypingPulse();

  const rootRef = useRef<HTMLDivElement>(null);
  const ccBtnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const spinTimerRef = useRef<number | null>(null);
  const lastEmittedRef = useRef<string>(value);

  const country = COUNTRIES[countryIndex] ?? COUNTRIES[0];
  const formatted = formatDigits(digits, country);

  useEffect(() => {
    if (value === lastEmittedRef.current) return;
    lastEmittedRef.current = value;
    if (!value.trim()) {
      setDigits("");
      setBlurred(false);
      return;
    }
    const parsed = parseExternalPhone(value);
    setCountryIndex(parsed.countryIndex);
    setDigits(parsed.digits);
  }, [value]);

  useEffect(() => {
    return () => {
      if (spinTimerRef.current !== null) {
        window.clearTimeout(spinTimerRef.current);
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
        setOpen(false);
        ccBtnRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      searchRef.current?.focus({ preventScroll: true });
    }, 60);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const emitPhone = (nextDigits: string, nextCountry: CountrySpec) => {
    const nextFormatted = formatDigits(nextDigits, nextCountry);
    const nextCombined = nextDigits ? `${nextCountry.dial} ${nextFormatted}` : "";
    lastEmittedRef.current = nextCombined;
    onChange(nextCombined);
  };

  const handleDigitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextDigits = e.target.value.replace(/\D/g, "").slice(0, 15);
    setDigits(nextDigits);
    setBlurred(false);
    triggerTyping();
    emitPhone(nextDigits, country);
  };

  const handleSelectCountry = (idx: number) => {
    setOpen(false);
    setQuery("");
    if (idx !== countryIndex) {
      const nextCountry = COUNTRIES[idx];
      setCountryIndex(idx);
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (!reduced) {
        setSpinning(false);
        window.requestAnimationFrame(() => {
          setSpinning(true);
          if (spinTimerRef.current !== null) {
            window.clearTimeout(spinTimerRef.current);
          }
          spinTimerRef.current = window.setTimeout(() => {
            spinTimerRef.current = null;
            setSpinning(false);
          }, 460);
        });
      }
      if (digits) {
        setBlurred(true);
      }
      emitPhone(digits, nextCountry);
    }
    inputRef.current?.focus({ preventScroll: true });
  };

  const isValid =
    digits.length >= country.minDigits && digits.length <= country.maxDigits;
  const isTooLong = digits.length > country.maxDigits;
  const isBad = digits.length > 0 && !isValid && (isTooLong || blurred);

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return COUNTRIES.map((item, idx) => ({ item, idx }));
    }
    return COUNTRIES.map((item, idx) => ({ item, idx })).filter(({ item }) =>
      `${item.name} ${item.nameVi} ${item.iso} ${item.dial}`
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const digitRangeText =
    country.minDigits === country.maxDigits
      ? `${country.minDigits}`
      : `${country.minDigits}–${country.maxDigits}`;

  const hintText =
    lang === "vi"
      ? `Số ${country.nameVi} gồm ${digitRangeText} chữ số.`
      : `${country.name} numbers use ${digitRangeText} digits.`;

  const rootClassName = [
    "ux",
    "u209",
    isValid ? "is-ok" : "",
    isBad ? "is-bad" : "",
    open ? "is-open" : "",
    typing ? "is-typing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClassName}>
      <div className="u209-fd">
        <button
          ref={ccBtnRef}
          type="button"
          className="u209-cc"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={
            lang === "vi"
              ? `Chọn mã quốc gia (${country.nameVi} ${country.dial})`
              : `Choose country code (${country.name} ${country.dial})`
          }
          onClick={() => {
            setOpen((prev) => !prev);
            setQuery("");
          }}
        >
          <em className={spinning ? "is-spin" : ""} aria-hidden="true">
            {country.flag}
          </em>
          <b>{country.dial}</b>
          <svg viewBox="0 0 9 9" aria-hidden="true">
            <path
              d="M1.5 3l3 3 3-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <input
          ref={inputRef}
          type="tel"
          name={name}
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={24}
          value={formatted}
          onChange={handleDigitsChange}
          onBlur={() => setBlurred(true)}
          placeholder={country.placeholder}
          aria-label={label}
          aria-invalid={isBad}
          className="u209-in u209-in--phone"
        />

        <CheckIcon209 />
      </div>

      <div className="u209-ht" aria-live="polite">
        {isBad ? hintText : ""}
      </div>

      <div className="u209-dd" aria-hidden={!open}>
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filteredCountries.length > 0) {
              e.preventDefault();
              handleSelectCountry(filteredCountries[0].idx);
            }
          }}
          placeholder={
            lang === "vi" ? "Tìm quốc gia hoặc mã vùng" : "Search country or code"
          }
          aria-label={lang === "vi" ? "Tìm quốc gia" : "Search countries"}
          tabIndex={open ? 0 : -1}
          className="u209-sr"
        />
        <div
          className="u209-ls"
          role="listbox"
          aria-label={lang === "vi" ? "Danh sách quốc gia" : "Country list"}
        >
          {filteredCountries.length === 0 ? (
            <div className="u209-empty">
              {lang === "vi" ? "Không tìm thấy quốc gia" : "No matching country"}
            </div>
          ) : (
            filteredCountries.map(({ item, idx }) => (
              <button
                key={`${item.iso}-${item.dial}`}
                type="button"
                role="option"
                aria-selected={idx === countryIndex}
                tabIndex={open ? 0 : -1}
                className="u209-op"
                onClick={() => handleSelectCountry(idx)}
              >
                <em aria-hidden="true">{item.flag}</em>
                <span>{lang === "vi" ? item.nameVi : item.name}</span>
                <small>{item.dial}</small>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export interface LucianContactInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (nextValue: string) => void;
  isValid: boolean;
  isInvalid: boolean;
  hint?: string;
  forceShowError?: boolean;
}

export const LucianContactInput = forwardRef<
  HTMLInputElement,
  LucianContactInputProps
>(function LucianContactInput(
  {
    value,
    onChange,
    isValid,
    isInvalid,
    hint = "",
    forceShowError = false,
    onBlur,
    className = "",
    ...rest
  },
  ref
) {
  const [blurred, setBlurred] = useState(false);
  const { typing, triggerTyping } = useTypingPulse();

  useEffect(() => {
    if (!value && !forceShowError) {
      setBlurred(false);
    }
  }, [value, forceShowError]);

  const showBad = isInvalid && (blurred || forceShowError);
  const showOk = isValid && !showBad;

  const rootClassName = [
    "ux",
    "u209",
    showOk ? "is-ok" : "",
    showBad ? "is-bad" : "",
    typing ? "is-typing" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <div className="u209-fd">
        <input
          ref={ref}
          value={value}
          onChange={(e) => {
            triggerTyping();
            onChange(e.target.value);
          }}
          onBlur={(e) => {
            setBlurred(true);
            onBlur?.(e);
          }}
          aria-invalid={showBad}
          className="u209-in"
          {...rest}
        />
        <CheckIcon209 />
      </div>
      <div className="u209-ht" aria-live="polite">
        {showBad ? hint : ""}
      </div>
    </div>
  );
});

export interface LucianContactTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (nextValue: string) => void;
  isValid: boolean;
  isInvalid: boolean;
  hint?: string;
  forceShowError?: boolean;
}

export const LucianContactTextarea = forwardRef<
  HTMLTextAreaElement,
  LucianContactTextareaProps
>(function LucianContactTextarea(
  {
    value,
    onChange,
    isValid,
    isInvalid,
    hint = "",
    forceShowError = false,
    onBlur,
    className = "",
    ...rest
  },
  ref
) {
  const [blurred, setBlurred] = useState(false);
  const { typing, triggerTyping } = useTypingPulse();

  useEffect(() => {
    if (!value && !forceShowError) {
      setBlurred(false);
    }
  }, [value, forceShowError]);

  const showBad = isInvalid && (blurred || forceShowError);
  const showOk = isValid && !showBad;

  const rootClassName = [
    "ux",
    "u209",
    showOk ? "is-ok" : "",
    showBad ? "is-bad" : "",
    typing ? "is-typing" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <div className="u209-fd u209-fd--area">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => {
            triggerTyping();
            onChange(e.target.value);
          }}
          onBlur={(e) => {
            setBlurred(true);
            onBlur?.(e);
          }}
          aria-invalid={showBad}
          className="u209-in u209-in--area"
          {...rest}
        />
        <CheckIcon209 />
      </div>
      <div className="u209-ht" aria-live="polite">
        {showBad ? hint : ""}
      </div>
    </div>
  );
});
