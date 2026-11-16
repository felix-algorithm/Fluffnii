"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Obturateur from "@/components/Obturateur";
import PolaroidsDefile from "@/components/PolaroidsDefile";
import PhraseScroll from "@/components/PhraseScroll";
import Compteur from "@/components/Compteur";
import MotDefilant from "@/components/MotDefilant";
import Deroule from "@/components/Deroule";
import FAQAccordion from "@/components/FAQAccordion";
import MiseAuPoint from "@/components/MiseAuPoint";
import Bouton from "@/components/Bouton";
import Footer from "@/components/Footer";

const PILLARS = [
  {
    num: "(001)",
    title: "SCULPT & PROPORTION",
    desc: "Foam and 3D-printed bases shaped for clean symmetry, a balanced profile, and wide forward vision.",
  },
  {
    num: "(002)",
    title: "LUXURY FAUX FUR",
    desc: "Dense imported faux fur patterned by hand, sewn with tight seams, and shaved down for sharp markings.",
  },
  {
    num: "(003)",
    title: "COMFORT & LINING",
    desc: "Sweat-wicking interior lining with hidden vents, removable magnetic tongues, and washable padding.",
  },
];

const FAN_CARDS = [
  {
    num: "(001)",
    title: "BEAR",
    desc: "Round ears, full cheeks, and a soft muzzle shaped for a warm, heavy silhouette.",
    img: "/images/species-bear.jpg",
    objectPosition: "50% 35%",
    bg: "#f5f8fc",
    dark: false,
    rot: -9,
  },
  {
    num: "(002)",
    title: "LION",
    desc: "Layered mane tufts and sculpted brows that hold a bold look from every angle.",
    img: "/images/species-lion.jpg",
    objectPosition: "50% 28%",
    bg: "#ffffff",
    dark: false,
    rot: -4.5,
  },
  {
    num: "(003)",
    title: "FOX-CAT",
    desc: "Large fox ears paired with a short feline muzzle for a clean Kemono profile.",
    img: "/images/species-foxcat.jpg",
    objectPosition: "50% 20%",
    bg: "#f5f8fc",
    dark: false,
    rot: 0,
  },
  {
    num: "(004)",
    title: "DOG",
    desc: "Perky ears, upturned muzzles, and bouncy tails built for high-energy canine OCs.",
    img: "/images/species-dog.jpg",
    objectPosition: "50% 38%",
    bg: "#ffffff",
    dark: false,
    rot: 4.5,
  },
  {
    num: "(005)",
    title: "SHIBA INU",
    desc: "Sharp urajiro cheek markings, pointed ears, and a tightly curled tail that holds shape.",
    img: "/images/species-shiba.jpg",
    objectPosition: "50% 15%",
    bg: "#1e3557",
    dark: true,
    rot: 9,
  },
];

const METHOD_STEPS = [
  {
    tag: "[Step 01]",
    counter: "(001) / (003)",
    title: "SCULPTED BASE & EXPRESSIVE 3D EYES",
    desc: "We shape a symmetrical head base with wide follow-me eyes, clear forward sightlines, and open mouth airflow.",
    pills: ["Symmetry", "Vision", "Airflow"],
    img: "/images/method-01.webp",
    bg: "#fff0a6",
    dark: false,
    top: 108,
  },
  {
    tag: "[Step 02]",
    counter: "(002) / (003)",
    title: "HAND-PICKED FAUX FUR & CLEAN SHAVING",
    desc: "Dense faux furs are taped on the base, hand-patterned, sewn with tight seams, and shaved down to show every cheek curve.",
    pills: ["Softness", "Patterns", "Detail"],
    img: "/images/method-02.webp",
    bg: "#dce8f5",
    dark: false,
    top: 136,
  },
  {
    tag: "[Step 03]",
    counter: "(003) / (003)",
    title: "LINED INTERIOR & BALANCED SILHOUETTE",
    desc: "Finished with a sweat-wicking head liner, stuffed pawpads, and secure padding fitted to your exact measurements.",
    pills: ["Breathable", "Fit", "Durable"],
    img: "/images/method-03.webp",
    bg: "#1e3557",
    dark: true,
    top: 164,
  },
];

const PROJECTS = [
  {
    client: "SY TRAY",
    year: "2026",
    summary:
      "Ash-grey and cream Kemono partial with fiery orange cheek tufts, oversized amber eyes, and clawed four-finger white paws.",
    img: "/images/project-01.jpg",
    objectPosition: "50% 35%",
    review:
      "The fur shaving is super smooth and even. It keeps all the facial angles sharp without losing that soft, natural look.",
    author: "Sy tray",
    role: "Suit Owner",
  },
  {
    client: "MINNY MINNIE",
    year: "2026",
    summary:
      "Snow-white Kemono partial with red-lined cat eyes, a blue diamond forehead marking, and puffy sky-blue padded paws.",
    img: "/images/project-02.jpg",
    objectPosition: "50% 45%",
  },
  {
    client: "FELIX ALGORITHM",
    year: "2026",
    summary:
      "Teal, navy, and cream canine partial featuring a winking left eye, bright yellow ear linings, and matching navy-blue paws.",
    img: "/images/project-03.jpg",
    objectPosition: "50% 50%",
    review:
      "Thick, sturdy custom 3D-printed TPU base sculpted specifically for my OC. Even complex markings came out clean, with tight seams and crisp hand and machine stitching.",
    author: "Felix",
    role: "Suit Owner",
  },
  {
    client: "HUNTER KNIGHT",
    year: "2026",
    summary:
      "Silver-white partial with fluffy layered cheek fur, a red-and-black hair streak on top, and pale-blue paw pads.",
    img: "/images/project-04.jpg",
    objectPosition: "50% 50%",
  },
  {
    client: "UMBRÉON RETSQUÔT",
    year: "2026",
    summary:
      "Black, white, and gold canine build with a playful blep tongue, blue eyes, and a braided red-white ear cord with a gold bell.",
    img: "/images/project-05.jpg",
    objectPosition: "50% 20%",
    review:
      "You can tell the 3D-printed TPU base is thick and built from scratch for each character. Tricky multi-color fur joins sit flat and tidy thanks to spot-on stitching.",
    author: "Umbréon Retsquôt",
    role: "Suit Owner",
  },
];

interface GalleryPhoto {
  src: string;
  alt: string;
  widthClass: string;
  objectPosition?: string;
}

const GALLERY_ROW_1: GalleryPhoto[] = [
  {
    src: "/images/gallery-r1-01.webp",
    alt: "Red and orange fox fursuit partial holding a small white cake at dusk",
    widthClass: "w-[246px] sm:w-[300px]",
  },
  {
    src: "/images/gallery-r1-02.webp",
    alt: "Sy Tray and Minny Minnie fursuits sitting at classroom desks",
    widthClass: "w-[344px] sm:w-[420px]",
  },
  {
    src: "/images/gallery-r1-03.webp",
    alt: "Hunter Knight orange canine fursuit partial outdoors against a city skyline",
    widthClass: "w-[246px] sm:w-[300px]",
  },
  {
    src: "/images/gallery-r1-04.webp",
    alt: "Felix Algorithm blue fursuit head wearing white round glasses on the beach",
    widthClass: "w-[344px] sm:w-[420px]",
  },
  {
    src: "/images/gallery-r1-05.webp",
    alt: "Sy Tray silver and orange fursuit waving beside yellow lockers",
    widthClass: "w-[246px] sm:w-[300px]",
    objectPosition: "center top",
  },
  {
    src: "/images/gallery-r1-06.webp",
    alt: "Black and yellow shiba fursuit head with gold ear cuff and bell",
    widthClass: "w-[295px] sm:w-[360px]",
  },
  {
    src: "/images/gallery-r1-07.webp",
    alt: "Felix Algorithm blue fursuit waving both paws on a garden lawn",
    widthClass: "w-[246px] sm:w-[300px]",
  },
  {
    src: "/images/gallery-r1-08.webp",
    alt: "White cat fursuit with red hairclip leaning by a blue street rail",
    widthClass: "w-[246px] sm:w-[300px]",
  },
];

const GALLERY_ROW_2: GalleryPhoto[] = [
  {
    src: "/images/gallery-r2-01.webp",
    alt: "White cat fursuit with blue paw pads perched on a rooftop ledge",
    widthClass: "w-[344px] sm:w-[420px]",
  },
  {
    src: "/images/gallery-r2-02.webp",
    alt: "Sky-blue horned goat fursuit wearing a straw hat in a greenhouse",
    widthClass: "w-[344px] sm:w-[420px]",
  },
  {
    src: "/images/gallery-r2-03.webp",
    alt: "Black and yellow shiba fursuit leaning on a scooter by the coast",
    widthClass: "w-[246px] sm:w-[300px]",
    objectPosition: "center top",
  },
  {
    src: "/images/gallery-r2-04.webp",
    alt: "Sy Tray and white cat fursuit holding a basketball by yellow lockers",
    widthClass: "w-[295px] sm:w-[360px]",
  },
  {
    src: "/images/gallery-r2-05.webp",
    alt: "Felix Algorithm reaching a blue paw toward the camera outside",
    widthClass: "w-[344px] sm:w-[420px]",
  },
  {
    src: "/images/gallery-r2-06.webp",
    alt: "Minny Minnie white cat fursuit reading a book under paper lanterns",
    widthClass: "w-[246px] sm:w-[300px]",
  },
  {
    src: "/images/gallery-r2-07.webp",
    alt: "Hunter Knight crouching on a painted concrete wall in street clothes",
    widthClass: "w-[344px] sm:w-[420px]",
  },
  {
    src: "/images/gallery-r2-08.webp",
    alt: "Umbréon Retsquôt horned fursuit sitting on the trunk of a vintage Datsun",
    widthClass: "w-[246px] sm:w-[300px]",
    objectPosition: "center top",
  },
];

const GALLERY_WORDS = [
  "HEADS",
  "PARTIALS",
  "FULLSUITS",
  "PAWS & TAILS",
  "COMMISSIONS",
];

const PACKAGES = [
  {
    title: "BASE HEAD",
    rows: [
      { label: "Base fur", value: "1 COLOR" },
      { label: "Extra fur color", value: "+500K VND" },
      { label: "Add teeth", value: "+150K VND" },
    ],
    price: "7,200,000 VND",
    bg: "#fff0a6",
    img: "/images/polaroid-01.webp",
    rot: -6,
  },
  {
    title: "HEAD & JEWELRY",
    rows: [
      { label: "Head (1 color)", value: "7,200K VND" },
      { label: "Extra fur / teeth", value: "+500K / +150K" },
      { label: "Jewelry & accessories", value: "BY QUOTE" },
    ],
    price: "7,200,000+ VND",
    bg: "#dce8f5",
    img: "/images/polaroid-02.webp",
    rot: 4,
  },
  {
    title: "MINI PARTIAL",
    rows: [
      { label: "Head (+500K/col)", value: "7,200K VND" },
      { label: "Paws (+350K/col)", value: "1,500K VND" },
      { label: "Tail (+400K/col)", value: "1,300K VND" },
    ],
    price: "10,000,000 VND",
    bg: "#f5f8fc",
    img: "/images/polaroid-03.webp",
    rot: -3,
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.15 } as const;
const RESULT_CELL_DELAYS = [0, 0.04, 0.08, 0.12, 0.2, 0.16, 0.28, 0.24] as const;

function WordReveal({
  text,
  className = "",
  staggerDelay = 0.05,
  yOffset = 40,
  threshold = 0.3,
}: {
  text: string | string[];
  className?: string;
  staggerDelay?: number;
  yOffset?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const lines = Array.isArray(text) ? text : [text];

  let wordIdx = 0;

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ").filter(Boolean);
        return (
          <React.Fragment key={li}>
            {li > 0 && <br />}
            {words.map((word, wi) => {
              const delay = wordIdx * staggerDelay;
              wordIdx += 1;
              return (
                <React.Fragment key={`${li}-${wi}`}>
                  <motion.span
                    style={{ display: "inline-block", willChange: "transform, opacity" }}
                    initial={{ opacity: 0.001, y: yOffset }}
                    animate={
                      inView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0.001, y: yOffset }
                    }
                    transition={{
                      duration: 0.9,
                      delay,
                      ease: EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < words.length - 1 ? " " : null}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </h2>
  );
}

function CharReveal({
  text,
  className = "",
  staggerDelay = 0.05,
  yOffset = 100,
  threshold = 0.3,
}: {
  text: string | string[];
  className?: string;
  staggerDelay?: number;
  yOffset?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const lines = Array.isArray(text) ? text : [text];

  let charIdx = 0;

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, li) => {
        const words = line.split(" ").filter(Boolean);
        return (
          <React.Fragment key={li}>
            {li > 0 && <br />}
            {words.map((word, wi) => (
              <React.Fragment key={`${li}-${wi}`}>
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((char, ci) => {
                    const delay = charIdx * staggerDelay;
                    charIdx += 1;
                    return (
                      <motion.span
                        key={`${li}-${wi}-${ci}`}
                        style={{
                          display: "inline-block",
                          willChange: "transform, opacity",
                        }}
                        initial={{ opacity: 0.001, y: yOffset }}
                        animate={
                          inView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0.001, y: yOffset }
                        }
                        transition={{
                          duration: 0.9,
                          delay,
                          ease: EASE,
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
                {wi < words.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </h2>
  );
}

function SmoothTicker({
  children,
  velocity,
  direction = "left",
  hoverModifier = 1,
  gap,
  className = "",
}: {
  children: React.ReactNode;
  velocity: number;
  direction?: "left" | "right";
  hoverModifier?: number;
  gap: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const speedMultiplierRef = useRef(1);
  const offsetRef = useRef(0);
  const groupWidthRef = useRef(0);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const measure = () => {
      groupWidthRef.current = el.getBoundingClientRect().width;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 64) / 1000;
    const targetMultiplier = isHoveredRef.current ? hoverModifier : 1;
    speedMultiplierRef.current +=
      (targetMultiplier - speedMultiplierRef.current) * Math.min(1, dt * 8);

    const groupWidth =
      groupWidthRef.current || groupRef.current?.getBoundingClientRect().width || 0;
    if (!groupWidth || !trackRef.current) return;

    offsetRef.current =
      (offsetRef.current + velocity * speedMultiplierRef.current * dt) %
      groupWidth;

    const x =
      direction === "left"
        ? -offsetRef.current
        : -groupWidth + offsetRef.current;

    trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
  });

  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="flex items-center w-max will-change-transform"
      >
        <div
          ref={groupRef}
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center shrink-0"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

interface CommissionOption {
  value: string;
  label: string;
  note?: string;
}

const COMMISSION_GROUPS: { colsClass: string; options: CommissionOption[] }[] = [
  {
    colsClass: "grid-cols-2 sm:grid-cols-4",
    options: [
      { value: "Head", label: "Head" },
      { value: "Hand", label: "Hand" },
      { value: "Tail", label: "Tail" },
      { value: "Paws", label: "Paws" },
    ],
  },
  {
    colsClass: "grid-cols-1 sm:grid-cols-2",
    options: [
      {
        value: "Half-partial",
        label: "Half-partial",
        note: "(đầu, tay, đuôi)",
      },
      {
        value: "Partial",
        label: "Partial",
        note: "(đầu, tay, đuôi, chân)",
      },
    ],
  },
  {
    colsClass: "grid-cols-1 sm:grid-cols-3",
    options: [
      {
        value: "Only body",
        label: "Only body",
        note: "Note: Yêu cầu có Duct Tape Dummy",
      },
      {
        value: "Half-body",
        label: "Half-body",
        note: "Note: Yêu cầu có Duct Tape Dummy",
      },
      {
        value: "Fullsuit",
        label: "Fullsuit",
        note: "Note: Yêu cầu có Duct Tape Dummy",
      },
    ],
  },
];

const STUDIO_CHANNELS = [
  {
    label: "[Email]",
    value: "FluffNii.furries@gmail.com",
    href: "mailto:FluffNii.furries@gmail.com",
    external: false,
  },
  {
    label: "[Instagram]",
    value: "@fluffnii.fur",
    href: "https://www.instagram.com/fluffnii.fur",
    external: true,
  },
  {
    label: "[X / Twitter]",
    value: "@Fluffnii_FUR",
    href: "https://x.com/Fluffnii_FUR",
    external: true,
  },
  {
    label: "[TikTok]",
    value: "@fluffnii_fur",
    href: "https://www.tiktok.com/@fluffnii_fur",
    external: true,
  },
];

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { once: true, amount: 0.08 });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const togglePart = (part: string) => {
    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((item) => item !== part) : [...prev, part]
    );
  };

  useEffect(() => {
    setHeroReady(false);
    const onClic = () => setHeroReady(true);
    window.addEventListener("gioia:clic", onClic);
    const fallback = window.setTimeout(() => setHeroReady(true), 1900);
    return () => {
      window.removeEventListener("gioia:clic", onClic);
      window.clearTimeout(fallback);
    };
  }, []);

  const scrollCarousel = (dir: -1 | 1) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector("[data-project-card]") as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 24 : 440;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState !== "idle") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      species: String(data.get("species") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      facebook: String(data.get("facebook") || "").trim(),
      commissionTypes: selectedParts,
      message: String(data.get("message") || "").trim(),
    };

    setFormState("sending");
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!res.ok) {
        setFormError(
          result?.error ||
            "Không gửi được yêu cầu. Vui lòng thử lại hoặc gửi thẳng tới FluffNii.furries@gmail.com."
        );
        setFormState("idle");
        return;
      }

      form.reset();
      setSelectedParts([]);
      setFormState("sent");
    } catch {
      setFormError(
        "Lỗi kết nối khi gửi biểu mẫu. Vui lòng kiểm tra mạng hoặc gửi trực tiếp tới FluffNii.furries@gmail.com."
      );
      setFormState("idle");
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#111622]">
      <Obturateur />

      <Navbar />

      <main className="flex-1">
        <section className="w-full max-w-[1440px] mx-auto px-5 md:px-[56px] pt-[124px] md:pt-[148px] pb-[72px] md:pb-[108px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[56px] lg:gap-8 items-center">
            <div
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateY(28px)",
                transition:
                  "opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
              }}
              className="lg:col-span-6 flex flex-col items-start gap-[26px]"
            >
              <p className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] leading-[1.3] uppercase tracking-[0.06em] text-[#111622]/62">
                Custom Fursuit Workshop
              </p>

              <h1 className="font-stagheiz text-[58px] sm:text-[80px] md:text-[96px] lg:text-[clamp(66px,6.8vw,105px)] min-[1400px]:text-[105px] leading-[0.92] tracking-[-0.01em] text-[#111622]">
                <span className="block whitespace-nowrap">From sketch</span>
                <span className="block whitespace-nowrap">to fursuit</span>
              </h1>

              <p className="font-sans font-normal text-[19px] md:text-[22px] min-[1200px]:text-[26px] leading-[1.3] tracking-[-0.025em] text-[#111622]/62 max-w-[540px]">
                Custom fursuits sculpted, patterned, and sewn straight from your
                ref sheet
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Bouton title="Contact" href="/#contact" variant="primary" />
                <Bouton
                  title="View fursuits"
                  href="/#projets"
                  variant="secondary"
                  showArrow={false}
                />
              </div>
            </div>

            <div className="lg:col-span-6 w-full h-[380px] sm:h-[460px] lg:h-[540px]">
              <PolaroidsDefile mode="pile" delay={1.8} speed={1} />
            </div>
          </div>
        </section>

        <section
          id="studio"
          className="w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[88px] md:py-[140px] border-t border-[#111622]/16"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-10 md:mb-14"
          >
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              [The studio]
            </span>
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              (001)
            </span>
          </motion.div>

          <div className="mb-16 md:mb-24 max-w-[1180px]">
            <PhraseScroll
              texte="FluffNii builds custom fursuits you can actually breathe and move in. We pattern every marking by hand, trim the pile to show the sculpt, and line the inside for long days on the convention floor."
              surlignes1="breathe and move in, pattern every marking, trim the pile"
              couleur1="#DCE8F5"
              surlignes2="line the inside, convention floor"
              couleur2="#FFF0A6"
              tailleMax={52}
            />
          </div>

          <div className="mb-20 md:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[72px] items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.1, delay: 0, ease: EASE }}
                className="lg:col-span-6 relative rounded-[18px] overflow-hidden aspect-[9/10] bg-[#dce8f5]"
              >
                <img
                  src="/images/formula-fursuit.jpg"
                  alt="FluffNii — The Formula"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              <div className="lg:col-span-6 flex flex-col justify-center gap-7">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
                    [The formula]
                  </span>
                  <h2 className="font-stagheiz text-[30px] sm:text-[34px] md:text-[38px] min-[1200px]:text-[36px] leading-[1] tracking-[-0.04em] text-[#111622]">
                    Character Design +
                    <br />
                    Fursuit Craft =
                  </h2>
                  <p className="font-sans text-[19px] md:text-[22px] min-[1200px]:text-[26px] leading-[1.3] tracking-[-0.025em] text-[#111622] max-w-[560px]">
                    Suits that keep your character&apos;s face and silhouette
                    intact once you put them on. Soft outside, breathable
                    inside.
                  </p>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/62 max-w-[560px]">
                    We work straight from your ref sheet so every spot, ear
                    shape, and color break lands where it should. Our{" "}
                    <strong className="font-semibold text-[#111622]">
                      focus
                    </strong>{" "}
                    is clean shaving, solid seams, and a head you can wear for
                    hours without overheating.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-[#111622]/12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: 0, ease: EASE }}
                    className="flex flex-col justify-between gap-2"
                  >
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
                      (Fursuits &amp; parts built)
                    </span>
                    <Compteur valeur={120} prefixe="+" taille={72} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                    className="flex flex-col justify-between gap-2"
                  >
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
                      (Species &amp; styles)
                    </span>
                    <Compteur valeur={40} prefixe="+" taille={72} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
                    className="flex flex-col justify-between gap-2"
                  >
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
                      (Made by hand)
                    </span>
                    <Compteur valeur={100} prefixe="" suffixe="%" taille={72} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-8"
          >
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              [3 areas of expertise in the same frame]
            </span>
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              (002)
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: idx * 0.1, ease: EASE }}
                className="rounded-[28px] border border-[#111622]/16 bg-[#f5f8fc] p-8 md:p-9 flex flex-col justify-between gap-8 hover:bg-[#fff0a6] transition-colors duration-300"
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/55">
                  {pillar.num}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-stagheiz text-[30px] md:text-[38px] min-[1200px]:text-[36px] leading-[1] tracking-[-0.04em] text-[#111622]">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/62">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="pour-qui"
          className="w-full bg-[#dce8f5]/45 border-t border-[#111622]/16 py-[96px] md:py-[140px] overflow-hidden"
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px]">
            <div className="flex flex-col items-center text-center gap-4 mb-14 md:mb-20">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0, ease: EASE }}
                className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62"
              >
                [Who it&apos;s for]
              </motion.span>
              <WordReveal
                text={["Every species,", "built your way"]}
                className="font-stagheiz text-[44px] sm:text-[64px] md:text-[80px] leading-[0.92] text-[#111622] max-w-[900px]"
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0, ease: EASE }}
                className="font-sans text-[17px] md:text-[19px] leading-[1.55] text-[#111622]/68 max-w-[640px]"
              >
                Bears, lions, fox-cats, dogs, shibas… Every ref sheet has its
                own proportions, so we shape each base from scratch instead of
                reusing one mold.
              </motion.p>
            </div>

            <div className="hidden lg:flex justify-center w-full h-[700px] overflow-visible relative">
              <div className="relative w-[1210px] h-[660px] shrink-0">
                {FAN_CARDS.map((card, i) => {
                  const slotTops = [50, 12, 0, 12, 50];
                  return (
                    <motion.div
                      key={card.num}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{
                        duration: 0.9,
                        delay: i * 0.1,
                        ease: EASE,
                      }}
                      style={{
                        position: "absolute",
                        left: i * 228,
                        top: slotTops[i],
                        width: 300,
                        height: 560,
                        zIndex: i + 1,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.03, y: -36 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        style={{ backgroundColor: card.bg, rotate: card.rot }}
                        className={`w-[300px] h-[560px] rounded-[20px] p-[10px_10px_20px_10px] shadow-[-24px_30px_40px_-24px_rgba(30,53,87,0.48)] flex flex-col justify-start overflow-hidden cursor-pointer ${
                          card.dark ? "text-[#f5f8fc]" : "text-[#111622]"
                        }`}
                      >
                        <div className="w-full h-[320px] rounded-[12px] overflow-hidden shrink-0 bg-black/5">
                          <img
                            src={card.img}
                            alt={card.title}
                            style={{ objectPosition: card.objectPosition }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div
                          className={`flex flex-col items-start gap-[10px] w-full pt-[18px] pl-[10px] ${
                            i < 4 ? "pr-[88px]" : "pr-[10px]"
                          }`}
                        >
                          <span
                            className={`font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] ${
                              card.dark
                                ? "text-[#f5f8fc]/65"
                                : "text-[#111622]/55"
                            }`}
                          >
                            {card.num}
                          </span>
                          <h3 className="font-stagheiz text-[22px] md:text-[24px] leading-[0.98] tracking-[-0.04em] uppercase">
                            {card.title}
                          </h3>
                          <p
                            className={`font-sans text-[15px] leading-[1.45] ${
                              card.dark
                                ? "text-[#f5f8fc]/78"
                                : "text-[#111622]/68"
                            }`}
                          >
                            {card.desc}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden pt-4 pb-8">
              {FAN_CARDS.map((card, i) => (
                <motion.div
                  key={card.num}
                  initial={{ opacity: 0, y: 60, rotate: 0 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: i % 2 === 0 ? -2 : 2,
                  }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                  style={{ backgroundColor: card.bg }}
                  className={`h-[520px] max-w-[320px] w-full mx-auto rounded-[20px] p-[10px_10px_20px_10px] shadow-[-24px_30px_40px_-24px_rgba(30,53,87,0.48)] flex flex-col justify-start overflow-hidden ${
                    card.dark ? "text-[#f5f8fc]" : "text-[#111622]"
                  }`}
                >
                  <div className="w-full h-[300px] rounded-[12px] overflow-hidden shrink-0 bg-black/5">
                    <img
                      src={card.img}
                      alt={card.title}
                      style={{ objectPosition: card.objectPosition }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-[10px] w-full pt-[18px] px-[10px]">
                    <span
                      className={`font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] ${
                        card.dark ? "text-[#f5f8fc]/65" : "text-[#111622]/55"
                      }`}
                    >
                      {card.num}
                    </span>
                    <h3 className="font-stagheiz text-[21px] sm:text-[24px] leading-[0.98] tracking-[-0.04em] uppercase">
                      {card.title}
                    </h3>
                    <p
                      className={`font-sans text-[15px] sm:text-[16px] leading-[1.5] ${
                        card.dark ? "text-[#f5f8fc]/78" : "text-[#111622]/68"
                      }`}
                    >
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pourquoi">
          <MotDefilant />
        </section>

        <section className="w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[96px] md:py-[140px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-8"
          >
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              [The result]
            </span>
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              (004)
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
            <WordReveal
              text={["From 2D ref sheet", "to 3D reality"]}
              className="lg:col-span-7 font-stagheiz text-[44px] sm:text-[60px] md:text-[74px] leading-[0.92] text-[#111622]"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] text-[#111622]/68"
            >
              Getting a suit to look like your art sheet comes down to base
              proportions, shave depth, and where every seam sits on the face.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[0], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full h-full rounded-[16px] overflow-hidden bg-[#dce8f5]"
              >
                <img
                  src="/images/result-01.webp"
                  alt="FluffNii fursuit detail 1"
                  className="w-full h-full object-cover object-[50%_45%]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[1], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full h-full rounded-[16px] bg-[#fff0a6] border border-[#111622]/14 p-6 flex flex-col justify-between"
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/60">
                  (001)
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-stagheiz text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em] text-[#111622]">
                    TRUE TO YOUR REF
                  </h3>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/68">
                    Every stripe, spot, ear notch, and color break on your ref
                    sheet is taped and sewn right where you drew it.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[2], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full h-full rounded-[16px] overflow-hidden bg-[#dce8f5]"
              >
                <img
                  src="/images/result-02.webp"
                  alt="FluffNii fursuit detail 2"
                  className="w-full h-full object-cover object-[50%_25%]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[3], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full h-full rounded-[16px] bg-[#dce8f5] border border-[#111622]/14 p-6 flex flex-col justify-between"
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/60">
                  (002)
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-stagheiz text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em] text-[#111622]">
                    KEMONO CHARM
                  </h3>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/68">
                    Round plush cheeks and deep-set 3D follow-me eyes that keep
                    their expression from the front and side angles.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[4], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full h-full rounded-[16px] bg-[#1e3557] text-[#f5f8fc] p-6 flex flex-col justify-between"
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/65">
                  (003)
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-stagheiz text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em] text-[#f5f8fc]">
                    MAGNETIC EXTRAS
                  </h3>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#f5f8fc]/75">
                    Switch expressions in seconds with magnetic tongues, clip-on
                    eyelids, posable ears, and hair tufts.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[5], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full h-full rounded-[16px] overflow-hidden bg-[#dce8f5]"
              >
                <img
                  src="/images/result-03.webp"
                  alt="FluffNii fursuit detail 3"
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[6], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full h-full rounded-[16px] bg-[#ffffff] border border-[#111622]/14 p-6 flex flex-col justify-between"
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/60">
                  (004)
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-stagheiz text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em] text-[#111622]">
                    MADE TO MOVE
                  </h3>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/68">
                    Wide field of view, hidden back zippers, and a cooling liner
                    built for full days at a con, not just quick photos.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: RESULT_CELL_DELAYS[7], ease: EASE }}
              className="h-[340px]"
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full h-full rounded-[16px] overflow-hidden bg-[#dce8f5]"
              >
                <img
                  src="/images/result-04.webp"
                  alt="FluffNii fursuit detail 4"
                  className="w-full h-full object-cover object-[50%_68%]"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section
          id="methode"
          className="w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[96px] md:py-[140px] border-t border-[#111622]/16"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="flex items-center justify-between mb-8"
          >
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              [How]
            </span>
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              (005)
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <WordReveal
              text="In three stages"
              className="lg:col-span-7 font-stagheiz text-[44px] sm:text-[60px] md:text-[74px] leading-[0.92] text-[#111622]"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] text-[#111622]/68"
            >
              Every commission goes through the same three workshop stages, with
              photo check-ins before we move to the next.
            </motion.p>
          </div>

          <div className="flex flex-col gap-10">
            {METHOD_STEPS.map((step) => (
              <div
                key={step.tag}
                style={{
                  backgroundColor: step.bg,
                  top: `${step.top}px`,
                }}
                className={`sticky rounded-[32px] border ${
                  step.dark
                    ? "border-[#f5f8fc]/20 text-[#f5f8fc]"
                    : "border-[#111622]/16 text-[#111622]"
                } p-7 sm:p-10 md:p-14 shadow-[0_-10px_40px_rgba(17,22,34,0.06)]`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 flex flex-col justify-between gap-8">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[12px] uppercase tracking-[0.06em] ${
                          step.dark ? "text-[#f5f8fc]/65" : "text-[#111622]/62"
                        }`}
                      >
                        {step.tag}
                      </span>
                      <span
                        className={`font-mono text-[12px] uppercase tracking-[0.06em] ${
                          step.dark ? "text-[#f5f8fc]/65" : "text-[#111622]/62"
                        }`}
                      >
                        {step.counter}
                      </span>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="font-stagheiz text-[34px] sm:text-[46px] md:text-[56px] leading-[0.95]">
                        {step.title}
                      </h3>
                      <p
                        className={`font-sans text-[17px] md:text-[19px] leading-[1.55] max-w-[540px] ${
                          step.dark ? "text-[#f5f8fc]/78" : "text-[#111622]/72"
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {step.pills.map((pill) => (
                        <span
                          key={pill}
                          className={`px-4 py-1.5 rounded-full font-mono text-[12px] uppercase tracking-[0.05em] border ${
                            step.dark
                              ? "border-[#f5f8fc]/25 bg-[#f5f8fc]/10 text-[#f5f8fc]"
                              : "border-[#111622]/20 bg-white/60 text-[#111622]"
                          }`}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-black/10">
                      <img
                        src={step.img}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projets"
          className="w-full bg-[#dce8f5] py-[96px] md:py-[140px] border-t border-[#111622]/16 overflow-hidden"
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="flex items-center justify-between mb-6"
            >
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
                [Projects]
              </span>
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
                (006)
              </span>
            </motion.div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <WordReveal
                text={["Selected", "projects"]}
                className="font-stagheiz text-[44px] sm:text-[64px] md:text-[80px] leading-[0.92] text-[#111622]"
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollCarousel(-1)}
                  aria-label="Previous project"
                  className="w-[56px] h-[56px] rounded-full border-[1.5px] border-[#111622] flex items-center justify-center text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(1)}
                  aria-label="Next project"
                  className="w-[56px] h-[56px] rounded-full border-[1.5px] border-[#111622] flex items-center justify-center text-[#111622] hover:bg-[#111622] hover:text-[#f5f8fc] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto no-scrollbar px-5 md:px-[56px] pb-6 scroll-smooth"
          >
            {PROJECTS.map((proj, idx) => (
              <motion.article
                key={proj.client}
                data-project-card
                initial={{ opacity: 0.001, y: 36 }}
                animate={
                  carouselInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0.001, y: 36 }
                }
                transition={{
                  duration: 0.9,
                  delay: idx * 0.08,
                  ease: EASE,
                }}
                style={{ willChange: "transform, opacity" }}
                className="w-[340px] sm:w-[420px] md:w-[460px] shrink-0 rounded-[28px] bg-[#f5f8fc] border border-[#111622]/16 p-6 flex flex-col justify-between gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden bg-[#111622]/10"
                >
                  <img
                    src={proj.img}
                    alt={proj.client}
                    decoding="async"
                    style={{ objectPosition: proj.objectPosition }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-end gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#111622]/80 backdrop-blur-sm font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] text-[#f5f8fc]">
                      {proj.year}
                    </span>
                  </div>

                  {proj.review && (
                    <div className="absolute bottom-4 left-4 right-4 rounded-[18px] bg-[#fff0a6] border border-[#111622]/16 p-4 shadow-lg -rotate-1">
                      <p className="font-sans text-[14px] leading-[1.45] text-[#111622]/85 mb-2">
                        &ldquo;{proj.review}&rdquo;
                      </p>
                      <div className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.05em] text-[#111622]/65">
                        {proj.author} · {proj.role}
                      </div>
                    </div>
                  )}
                </motion.div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-stagheiz text-[30px] md:text-[38px] min-[1200px]:text-[34px] leading-[1] tracking-[-0.04em] text-[#111622]">
                    {proj.client}
                  </h3>
                  <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/68">
                    {proj.summary}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="galerie"
          className="w-full py-[96px] md:py-[140px] border-t border-[#111622]/16 overflow-hidden"
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px] mb-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: 0, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between mb-6"
            >
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
                [Gallery]
              </span>
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
                (007)
              </span>
            </motion.div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <WordReveal
                text="The wall of fursuits"
                className="font-stagheiz text-[44px] md:text-[68px] leading-[0.95] tracking-[-0.005em] uppercase text-[#111622] max-w-[820px]"
              />
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/65 max-w-[380px] shrink-0"
              >
                Finished heads, partials, paws, and workshop WIPs. Hover a row
                to slow down the scroll.
              </motion.p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SmoothTicker
              velocity={40}
              direction="left"
              hoverModifier={0.2}
              gap={16}
            >
              {GALLERY_ROW_1.map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.widthClass} h-[312px] sm:h-[380px] rounded-[20px] overflow-hidden shrink-0 bg-[#dce8f5]`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={
                      item.objectPosition
                        ? { objectPosition: item.objectPosition }
                        : undefined
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </SmoothTicker>

            <SmoothTicker
              velocity={70}
              direction="right"
              hoverModifier={1}
              gap={40}
              className="py-[20px]"
            >
              {GALLERY_WORDS.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span className="font-stagheiz text-[44px] md:text-[68px] leading-[0.95] tracking-[-0.005em] uppercase text-[#111622] whitespace-nowrap select-none shrink-0">
                    {word}
                  </span>
                  <span className="w-[14px] h-[14px] rounded-full bg-[#111622] shrink-0" />
                </React.Fragment>
              ))}
            </SmoothTicker>

            <SmoothTicker
              velocity={40}
              direction="right"
              hoverModifier={0.2}
              gap={16}
            >
              {GALLERY_ROW_2.map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.widthClass} h-[312px] sm:h-[380px] rounded-[20px] overflow-hidden shrink-0 bg-[#dce8f5]`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={
                      item.objectPosition
                        ? { objectPosition: item.objectPosition }
                        : undefined
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </SmoothTicker>
          </div>
        </section>

        <section
          id="offres"
          className="w-full bg-[#1e3557] text-[#f5f8fc] py-[96px] md:py-[140px]"
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-[56px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="flex items-center justify-between mb-6"
            >
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/65">
                [Offers]
              </span>
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/65">
                (008)
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
              <WordReveal
                text="Built for your character"
                className="lg:col-span-7 font-stagheiz text-[44px] sm:text-[64px] md:text-[80px] leading-[0.92] text-[#f5f8fc]"
              />
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="lg:col-span-5 font-sans text-[17px] md:text-[18px] leading-[1.6] text-[#f5f8fc]/75"
              >
                Start with a custom head, or pair it with matching paws and a
                tail cut from the same fur roll.
              </motion.p>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-8">
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0, ease: EASE }}
                className="rounded-[32px] bg-[#f5f8fc] text-[#111622] p-7 sm:p-10 flex flex-col justify-between gap-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/60">
                      [Offer 01]
                    </span>
                  </div>
                  <div className="w-full aspect-[5/4] rounded-[20px] overflow-hidden bg-[#dce8f5]">
                    <img
                      src="/images/offer-01.webp"
                      alt="Custom Fursuit Head"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-stagheiz text-[34px] md:text-[42px] leading-[0.96]">
                      Custom Fursuit Head
                    </h3>
                    <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/72">
                      Just the head, built on a custom 3D-printed TPU base from
                      your ref sheet. Base price covers one fur color.
                    </p>
                  </div>
                  <ul className="flex flex-col gap-3 pt-2 border-t border-[#111622]/14">
                    {[
                      "3D-printed TPU base shaped specifically for your OC's silhouette",
                      "3D follow-me eyes and breathable interior lining for long wear",
                      "Base price (7,200,000 VND) covers 1 fur color with smooth shaving",
                      "Extra fur colors are +500,000 VND each; teeth add +150,000 VND",
                      "Includes one magnetic tongue and a breathable storage bag",
                    ].map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 font-sans text-[16px] md:text-[17px] leading-[1.5] text-[#111622]/80"
                      >
                        <Check className="w-4 h-4 mt-1 shrink-0 text-[#111622]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#111622]/14 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="font-stagheiz text-[28px] xl:text-[32px] leading-none">
                      From 7,200,000 VND
                    </div>
                    <div className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] text-[#111622]/60 mt-1">
                      1 base color · +500k/color · +150k teeth
                    </div>
                  </div>
                  <Bouton title="Contact" href="/#contact" variant="primary" />
                </div>
              </motion.div>

              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[68px] h-[68px] rounded-full bg-[#111622] text-[#f5f8fc] border-4 border-[#1e3557] items-center justify-center font-stagheiz text-[32px]">
                +
              </div>

              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="rounded-[32px] bg-[#fff0a6] text-[#111622] p-7 sm:p-10 flex flex-col justify-between gap-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/60">
                      [Offer 02]
                    </span>
                  </div>
                  <div className="w-full aspect-[5/4] rounded-[20px] overflow-hidden bg-[#dce8f5]">
                    <img
                      src="/images/offer-02.webp"
                      alt="Head and Matching Parts"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-stagheiz text-[34px] md:text-[42px] leading-[0.96]">
                      Head + Matching Parts
                    </h3>
                    <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/72">
                      Your custom head paired with matching handpaws and a tail
                      cut from the exact same dye lot of fur.
                    </p>
                  </div>
                  <ul className="flex flex-col gap-3 pt-2 border-t border-[#111622]/14">
                    {[
                      "Base Head starts at 7,200,000 VND (+500K/extra color, +150K teeth)",
                      "Handpaws start at 1,500,000 VND for 1 base color (+350K per color)",
                      "Belt-loop tail starts at 1,300,000 VND for 1 base color (+400K per color)",
                      "Optional TPU horns or layered wig styling matched to your ref",
                      "WIP photo checks on the TPU base and fur trim before seams close",
                    ].map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 font-sans text-[16px] md:text-[17px] leading-[1.5] text-[#111622]/80"
                      >
                        <Check className="w-4 h-4 mt-1 shrink-0 text-[#111622]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#111622]/14 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="font-stagheiz text-[28px] xl:text-[32px] leading-none">
                      From 10,000,000 VND
                    </div>
                    <div className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.06em] text-[#111622]/60 mt-1">
                      Head + Paws + Tail (1 base color)
                    </div>
                  </div>
                  <Bouton
                    title="Contact"
                    href="/#contact"
                    variant="primary"
                  />
                </div>
              </motion.div>
            </div>

            <p className="font-mono text-[12px] min-[1200px]:text-[13px] text-[#f5f8fc]/65 mb-20">
              All base prices cover 1 primary fur color. Extra colors and add-ons like teeth are priced cleanly below.
            </p>

            <div id="constitue-ton-offre" className="pt-4">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="mb-7"
              >
                <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/65">
                  [Pricing &amp; add-on examples]
                </span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[28px] gap-y-[130px] lg:gap-[28px] pt-[90px]">
                {PACKAGES.map((pkg, idx) => (
                  <motion.div
                    key={pkg.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, delay: idx * 0.1, ease: EASE }}
                    className="h-full"
                  >
                    <motion.div
                      whileHover={{ y: -10, scale: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{ backgroundColor: pkg.bg }}
                      className="relative h-full rounded-[28px] text-[#111622] px-[28px] pb-[28px] pt-[152px] flex flex-col justify-between gap-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
                    >
                      <div
                        style={{ transform: `translateX(-50%) rotate(${pkg.rot}deg)` }}
                        className="absolute -top-[80px] left-1/2 w-[190px] h-[210px] bg-white border-[8px] border-white rounded-[2px] shadow-[0_18px_30px_-16px_rgba(0,0,0,0.55)] overflow-hidden"
                      >
                        <img
                          src={pkg.img}
                          alt={pkg.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-col gap-5">
                        <h3 className="font-stagheiz text-[30px] lg:text-[34px] leading-none text-center">
                          {pkg.title}
                        </h3>

                        <div className="flex flex-col border-t border-dashed border-[#111622]/30">
                          {pkg.rows.map((row) => (
                            <div
                              key={row.label}
                              className="flex items-center justify-between gap-2 py-4 border-b border-dashed border-[#111622]/30"
                            >
                              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/65">
                                {row.label}
                              </span>
                              <span className="font-stagheiz text-[20px] lg:text-[22px] whitespace-nowrap">
                                {row.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4 pt-2">
                        <div className="font-stagheiz text-[30px] lg:text-[34px] leading-none whitespace-nowrap">
                          {pkg.price}
                        </div>
                        <Bouton
                          title="Contact"
                          href="/#contact"
                          variant="primary"
                          fullWidth
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="deroule"
          className="w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[96px] md:py-[140px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="w-full flex items-center justify-between mb-12 md:mb-16"
          >
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              [Project timeline]
            </span>
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              (009)
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[96px]">
            <div className="w-full lg:w-[520px] lg:shrink-0 lg:sticky lg:top-[140px] flex flex-col items-start gap-[28px]">
              <WordReveal
                text={["No guesswork", "on WIPs"]}
                className="font-stagheiz text-[44px] sm:text-[60px] md:text-[68px] leading-[0.95] tracking-[-0.005em] text-[#111622]"
              />
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/62"
              >
                You get photo updates at every milestone before we cut fur or
                close a seam, so nothing moves forward without your okay.
              </motion.p>
              <Bouton title="Contact" href="/#contact" variant="primary" />
            </div>

            <div className="flex-1 min-w-0 w-full">
              <Deroule />
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="w-full max-w-[1440px] mx-auto px-5 md:px-[56px] py-[96px] md:py-[140px] border-t border-[#111622]/16"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0, ease: EASE }}
            className="w-full flex items-center justify-between mb-12 md:mb-16"
          >
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              [Frequently asked questions]
            </span>
            <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#111622]/62">
              (010)
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[64px]">
            <div className="w-full lg:w-[480px] lg:shrink-0 lg:sticky lg:top-[120px] flex flex-col items-start gap-[28px]">
              <WordReveal
                text={["Got a", "question?"]}
                className="font-stagheiz text-[44px] sm:text-[60px] md:text-[68px] leading-[0.95] tracking-[-0.005em] text-[#111622]"
              />
              <p className="font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/62">
                Answers to the questions we get asked the most. And if yours
                isn&apos;t here, write to us: we reply fast.
              </p>
              <Bouton
                title="Ask a question"
                href="/#contact"
                variant="secondary"
              />
            </div>

            <div className="flex-1 min-w-0 w-full">
              <FAQAccordion />
            </div>
          </div>
        </section>

        <section id="bonus">
          <MiseAuPoint />
        </section>

        <section
          id="contact"
          className="w-full bg-[#111622] text-[#f5f8fc] py-[96px] md:py-[140px] px-5 md:px-[56px]"
        >
          <div className="max-w-[1328px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="flex items-center justify-between mb-8"
            >
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/65">
                [Contact]
              </span>
              <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/65">
                (011)
              </span>
            </motion.div>

            <CharReveal
              text={["Ready to start", "a build?"]}
              className="font-stagheiz text-[44px] sm:text-[68px] lg:text-[98px] leading-[0.92] tracking-[-0.01em] text-[#f5f8fc] mb-12 md:mb-16"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 flex flex-col gap-8">
                <p className="font-sans text-[19px] md:text-[22px] min-[1200px]:text-[26px] leading-[1.3] tracking-[-0.025em] text-[#f5f8fc]/72 max-w-[520px]">
                  Send over your character ref sheet and the parts you have in
                  mind. We reply within 48h.
                </p>

                <div className="flex flex-col gap-5 pt-4 border-t border-[#f5f8fc]/16">
                  {STUDIO_CHANNELS.map((channel) => (
                    <div key={channel.label}>
                      <div className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/55 mb-1">
                        {channel.label}
                      </div>
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noopener noreferrer" : undefined}
                        className="font-sans text-[19px] md:text-[22px] min-[1200px]:text-[26px] font-normal leading-[1.3] tracking-[-0.025em] text-[#f5f8fc] hover:text-[#fff0a6] transition-colors break-words"
                      >
                        {channel.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <motion.form
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0, ease: EASE }}
                onSubmit={handleContactSubmit}
                className="lg:col-span-7 flex flex-col gap-6 bg-[#f5f8fc]/[0.04] border border-[#f5f8fc]/14 rounded-[28px] p-6 sm:p-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70">
                      [Name or handle]
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={120}
                      placeholder="Your name or @handle"
                      className="w-full rounded-[14px] bg-[#f5f8fc]/8 border border-[#f5f8fc]/20 px-4 py-3.5 font-sans text-[15px] text-[#f5f8fc] placeholder:text-[#f5f8fc]/35 focus:outline-none focus:border-[#fff0a6]"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70">
                      [Character species]
                    </span>
                    <input
                      type="text"
                      name="species"
                      required
                      maxLength={120}
                      placeholder="Wolf, Kemono cat, Shiba..."
                      className="w-full rounded-[14px] bg-[#f5f8fc]/8 border border-[#f5f8fc]/20 px-4 py-3.5 font-sans text-[15px] text-[#f5f8fc] placeholder:text-[#f5f8fc]/35 focus:outline-none focus:border-[#fff0a6]"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70">
                      [Email]
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@email.com"
                      className="w-full rounded-[14px] bg-[#f5f8fc]/8 border border-[#f5f8fc]/20 px-4 py-3.5 font-sans text-[15px] text-[#f5f8fc] placeholder:text-[#f5f8fc]/35 focus:outline-none focus:border-[#fff0a6]"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70">
                      [Phone number]
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+84 9xx xxx xxx"
                      className="w-full rounded-[14px] bg-[#f5f8fc]/8 border border-[#f5f8fc]/20 px-4 py-3.5 font-sans text-[15px] text-[#f5f8fc] placeholder:text-[#f5f8fc]/35 focus:outline-none focus:border-[#fff0a6]"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70">
                    [Facebook name or link]
                  </span>
                  <input
                    type="text"
                    name="facebook"
                    placeholder="Your Facebook name or https://facebook.com/..."
                    className="w-full rounded-[14px] bg-[#f5f8fc]/8 border border-[#f5f8fc]/20 px-4 py-3.5 font-sans text-[15px] text-[#f5f8fc] placeholder:text-[#f5f8fc]/35 focus:outline-none focus:border-[#fff0a6]"
                  />
                </label>

                <div
                  role="group"
                  aria-labelledby="commission-type-label"
                  className="flex flex-col gap-2"
                >
                  <span
                    id="commission-type-label"
                    className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70"
                  >
                    [Commission type]
                  </span>
                  <div className="flex flex-col gap-3">
                    {COMMISSION_GROUPS.map((group) => (
                      <div
                        key={group.colsClass}
                        className={`grid ${group.colsClass} gap-3`}
                      >
                        {group.options.map((part) => {
                          const checked = selectedParts.includes(part.value);
                          return (
                            <label
                              key={part.value}
                              className={`flex flex-col justify-start rounded-[14px] border px-4 py-3.5 cursor-pointer select-none transition-colors focus-within:border-[#fff0a6] ${
                                checked
                                  ? "bg-[#f5f8fc]/14 border-[#fff0a6] text-[#f5f8fc]"
                                  : "bg-[#f5f8fc]/8 border-[#f5f8fc]/20 text-[#f5f8fc]/85 hover:border-[#f5f8fc]/45"
                              }`}
                            >
                              <input
                                type="checkbox"
                                name="commissionType"
                                value={part.value}
                                checked={checked}
                                onChange={() => togglePart(part.value)}
                                className="sr-only"
                              />
                              <span className="flex items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                                    checked
                                      ? "bg-[#fff0a6] border-[#fff0a6] text-[#111622]"
                                      : "border-[#f5f8fc]/35 bg-transparent"
                                  }`}
                                >
                                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                                </span>
                                <span className="font-sans text-[15px] leading-snug whitespace-nowrap">
                                  {part.label}
                                </span>
                              </span>
                              {part.note && (
                                <span
                                  className={`mt-1 pl-[30px] font-sans text-[12px] leading-[1.35] ${
                                    checked
                                      ? "text-[#fff0a6]/85"
                                      : "text-[#f5f8fc]/55"
                                  }`}
                                >
                                  {part.note}
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] md:text-[12px] min-[1200px]:text-[13px] uppercase tracking-[0.06em] text-[#f5f8fc]/70">
                    [Thông tin khác và ref link]
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={4000}
                    placeholder="Gửi link ref sheet, ghi chú màu lông hoặc phụ kiện, và thời gian dự kiến nhận suit..."
                    className="w-full rounded-[14px] bg-[#f5f8fc]/8 border border-[#f5f8fc]/20 px-4 py-3.5 font-sans text-[15px] text-[#f5f8fc] placeholder:text-[#f5f8fc]/35 focus:outline-none focus:border-[#fff0a6]"
                  />
                </label>

                <div className="pt-2 flex flex-col items-start gap-3">
                  <button
                    type="submit"
                    disabled={formState !== "idle"}
                    className="group inline-flex items-center justify-between gap-4 min-w-[280px] px-[26px] py-[19px] rounded-full bg-[#f5f8fc] text-[#111622] hover:bg-[#fff0a6] transition-colors font-sans text-[15px] font-medium cursor-pointer disabled:opacity-75"
                  >
                    <span>
                      {formState === "idle" && "Send my request"}
                      {formState === "sending" && "Sending…"}
                      {formState === "sent" &&
                        "Thank you! We'll reply within 48h."}
                    </span>
                    {formState === "sent" ? (
                      <Check className="w-[18px] h-[18px] shrink-0" />
                    ) : (
                      <ArrowRight className="w-[18px] h-[18px] shrink-0 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                  {formState === "sent" && (
                    <button
                      type="button"
                      onClick={() => setFormState("idle")}
                      className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#f5f8fc]/65 hover:text-[#fff0a6] transition-colors underline underline-offset-4"
                    >
                      Send another request
                    </button>
                  )}
                  {formError && (
                    <p
                      role="alert"
                      className="font-sans text-[14px] leading-[1.45] text-[#ffb4a2]"
                    >
                      {formError}
                    </p>
                  )}
                </div>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
