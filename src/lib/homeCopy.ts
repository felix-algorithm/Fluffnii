import type { Lang } from "@/components/LanguageProvider";

export type ContactErrorCode =
  | "PAYLOAD_TOO_LARGE"
  | "INVALID_JSON"
  | "TOO_FAST"
  | "MISSING_FIELDS"
  | "INVALID_EMAIL"
  | "MISSING_TYPES"
  | "RECAPTCHA_FAILED"
  | "SERVICE_UNAVAILABLE"
  | "SEND_FAILED";

export type GalleryFilterId = "all" | "heads" | "partials" | "fullsuits" | "paws";

export interface GalleryPhotoCopy {
  id: string;
  src: string;
  alt: string;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  partValues: string[];
  filterCategories: Exclude<GalleryFilterId, "all">[];
  widthClass: string;
  objectPosition?: string;
}

export interface CommissionOption {
  value: string;
  label: string;
  note?: string;
}

export interface PackageCardData {
  title: string;
  optionValue: string;
  rows: { label: string; value: string }[];
  note: string;
  bg: string;
  img: string;
  imgPos: string;
  rot: number;
}

export interface ProjectCardData {
  client: string;
  year: string;
  category: string;
  summary: string;
  img: string;
  objectPosition: string;
  tags: string[];
  partValues: string[];
  inspectLabel: string;
  review?: string;
  author?: string;
  role?: string;
}

export interface HomeLocaleCopy {
  heroStatusChecking: string;
  heroStatusOpen: string;
  heroStatusClosed: string;
  heroEyebrow: string;
  heroTitle: [string, string];
  heroDesc: string;
  heroContactCta: string;
  heroProjectsCta: string;
  studioEyebrow: string;
  phraseText: string;
  phraseHighlights1: string;
  phraseHighlights2: string;
  formulaEyebrow: string;
  formulaAlt: string;
  formulaTitleLines: [string, string];
  formulaLead: string;
  formulaBodyBefore: string;
  formulaBodyStrong: string;
  formulaBodyAfter: string;
  statBuilt: string;
  statSpecies: string;
  statHandmade: string;
  pillarsEyebrow: string;
  pillars: { num: string; title: string; desc: string }[];
  whoEyebrow: string;
  whoTitle: [string, string];
  whoDesc: string;
  fanCards: {
    num: string;
    title: string;
    desc: string;
    img: string;
    objectPosition: string;
    bg: string;
    dark: boolean;
    rot: number;
  }[];
  resultEyebrow: string;
  resultTitle: [string, string];
  resultDesc: string;
  resultAlts: [string, string, string, string];
  resultCards: [
    { num: string; title: string; desc: string },
    { num: string; title: string; desc: string },
    { num: string; title: string; desc: string },
    { num: string; title: string; desc: string },
  ];
  methodEyebrow: string;
  methodTitle: string;
  methodDesc: string;
  methodSteps: {
    tag: string;
    counter: string;
    title: string;
    desc: string;
    pills: string[];
    img: string;
    bg: string;
    dark: boolean;
    top: number;
  }[];
  projectsEyebrow: string;
  projectsTitle: [string, string];
  prevProjectAria: string;
  nextProjectAria: string;
  projectDotAria: string;
  projects: ProjectCardData[];
  galleryEyebrow: string;
  galleryTitle: string;
  galleryDesc: string;
  galleryFilters: { id: GalleryFilterId; label: string }[];
  galleryPauseLabel: string;
  galleryPlayLabel: string;
  galleryPauseAria: string;
  galleryPlayAria: string;
  galleryWords: string[];
  galleryRow1: GalleryPhotoCopy[];
  galleryRow2: GalleryPhotoCopy[];
  galleryEmptyFullsuit: {
    title: string;
    desc: string;
    ctaSpecs: string;
    ctaQuote: string;
    ctaShowAll: string;
  };
  lightboxCta: string;
  lightboxCloseAria: string;
  lightboxPrevAria: string;
  lightboxNextAria: string;
  offersEyebrow: string;
  offersTitle: string;
  offersDesc: string;
  offer1Tag: string;
  offer1Alt: string;
  offer1Title: string;
  offer1Desc: string;
  offer1Bullets: string[];
  offer1Sub: string;
  offer1Cta: string;
  offer2Tag: string;
  offer2Alt: string;
  offer2Title: string;
  offer2Desc: string;
  offer2Bullets: string[];
  offer2Sub: string;
  offer2Cta: string;
  furNotice: string;
  packagesEyebrow: string;
  packageCta: string;
  packages: PackageCardData[];
  extraOptionsEyebrow: string;
  extraOptionsTag: string;
  extraOptions: { label: string; value: string; href?: string }[];
  freeGiftsEyebrow: string;
  freeGiftsTag: string;
  freeGifts: string[];
  bonusTag: string;
  bonusText: string;
  timelineEyebrow: string;
  timelineTitle: [string, string];
  timelineDesc: string;
  timelineTermsCta: string;
  faqEyebrow: string;
  faqTitle: [string, string];
  faqDesc: string;
  faqAskCta: string;
  faqTermsCta: string;
  contactEyebrow: string;
  contactTitle: [string, string];
  contactIntro: string;
  quoteInfoPills: { label: string; detail: string }[];
  channels: { label: string; value: string; href: string; external: boolean }[];
  statusChecking: string;
  statusBadgeOpen: string;
  statusBadgeClosed: string;
  fieldName: string;
  placeholderName: string;
  fieldSpecies: string;
  placeholderSpecies: string;
  fieldEmail: string;
  placeholderEmail: string;
  fieldPhone: string;
  placeholderPhone: string;
  fieldFacebook: string;
  placeholderFacebook: string;
  fieldRefLink: string;
  placeholderRefLink: string;
  fieldType: string;
  commissionGroups: { colsClass: string; options: CommissionOption[] }[];
  dtdCalloutTitle: string;
  dtdCalloutBody: string;
  fieldNotes: string;
  placeholderNotes: string;
  termsNoticeBefore: string;
  termsNoticeLink: string;
  recaptchaNoticeBefore: string;
  recaptchaPrivacyLabel: string;
  recaptchaNoticeMid: string;
  recaptchaTermsLabel: string;
  recaptchaNoticeAfter: string;
  recaptchaVerifying: string;
  submitIdle: string;
  submitWaitlist: string;
  submitSending: string;
  submitSent: string;
  submitAnother: string;
  confirmTitle: string;
  confirmWaitlistTitle: string;
  confirmDesc: string;
  confirmWaitlistDesc: string;
  confirmLabelName: string;
  confirmLabelSpecies: string;
  confirmLabelEmail: string;
  confirmLabelParts: string;
  errorFallback: string;
  errorNetwork: string;
  contactErrors: Record<ContactErrorCode, string>;
  copyInquiryCta: string;
  copyInquiryDone: string;
  copyInquiryFail: string;
  errorDirectNote: string;
  errorMailSubject: string;
}

const DEFAULT_OPEN_NOTE_EN =
  "Taking custom fursuit heads, partials, and fullsuits. Reply within 24h.";
const LEGACY_OPEN_NOTE_EN =
  "Taking custom head and mini partial builds. Reply within 24h.";
const DEFAULT_CLOSED_NOTE_EN =
  "Paused on new builds for now. You can still send your ref sheet for a future waitlist quote.";
const LEGACY_CLOSED_NOTE_EN =
  "Currently paused on new builds. Feel free to send your ref sheet for a future quote.";
const DEFAULT_OPEN_NOTE_VI =
  "Mình đang nhận đặt Custom Fursuit Head, Partial và Fullsuit. Phản hồi trong 24 giờ.";
const DEFAULT_CLOSED_NOTE_VI =
  "Hiện mình tạm ngưng nhận đơn mới. Bạn vẫn có thể gửi ref sheet để hẹn báo giá đợt sau nhé.";

export function localizeCommissionNote(
  note: string,
  open: boolean,
  lang: Lang,
  noteVi?: string
): string {
  const trimmedEn = note.trim();
  const trimmedVi = noteVi?.trim() || "";

  if (lang === "en") {
    return trimmedEn || (open ? DEFAULT_OPEN_NOTE_EN : DEFAULT_CLOSED_NOTE_EN);
  }

  if (
    !trimmedEn ||
    trimmedEn === DEFAULT_OPEN_NOTE_EN ||
    trimmedEn === LEGACY_OPEN_NOTE_EN
  ) {
    return trimmedVi && trimmedVi !== trimmedEn
      ? trimmedVi
      : DEFAULT_OPEN_NOTE_VI;
  }

  if (
    trimmedEn === DEFAULT_CLOSED_NOTE_EN ||
    trimmedEn === LEGACY_CLOSED_NOTE_EN
  ) {
    return trimmedVi && trimmedVi !== trimmedEn
      ? trimmedVi
      : DEFAULT_CLOSED_NOTE_VI;
  }

  if (trimmedVi) {
    return trimmedVi;
  }

  return trimmedEn;
}

const SURFACE_HEX = {
  cream: "#f5f8fc",
  white: "#ffffff",
  taupe: "#dce8f5",
  butter: "#fff0a6",
  espresso: "#1e3557",
} as const;

const GALLERY_WIDTH = {
  narrow: "w-[246px] sm:w-[300px]",
  medium: "w-[295px] sm:w-[360px]",
  wide: "w-[344px] sm:w-[420px]",
} as const;

const COMMISSION_COLS = [
  "grid-cols-2 sm:grid-cols-4",
  "grid-cols-1 sm:grid-cols-2",
  "grid-cols-1 sm:grid-cols-3",
] as const;

const FAN_CARDS_META: Pick<
  HomeLocaleCopy["fanCards"][number],
  "num" | "img" | "objectPosition" | "bg" | "dark" | "rot"
>[] = [
  {
    num: "(001)",
    img: "/images/species-bear.webp",
    objectPosition: "50% 35%",
    bg: SURFACE_HEX.cream,
    dark: false,
    rot: -9,
  },
  {
    num: "(002)",
    img: "/images/species-lion.webp",
    objectPosition: "50% 28%",
    bg: SURFACE_HEX.white,
    dark: false,
    rot: -4.5,
  },
  {
    num: "(003)",
    img: "/images/species-foxcat.webp",
    objectPosition: "50% 20%",
    bg: SURFACE_HEX.cream,
    dark: false,
    rot: 0,
  },
  {
    num: "(004)",
    img: "/images/species-dog.webp",
    objectPosition: "50% 38%",
    bg: SURFACE_HEX.white,
    dark: false,
    rot: 4.5,
  },
  {
    num: "(005)",
    img: "/images/species-shiba.webp",
    objectPosition: "50% 15%",
    bg: SURFACE_HEX.espresso,
    dark: true,
    rot: 9,
  },
];

const METHOD_STEPS_META: Pick<
  HomeLocaleCopy["methodSteps"][number],
  "counter" | "img" | "bg" | "dark" | "top"
>[] = [
  {
    counter: "(001) / (003)",
    img: "/images/method-01.webp",
    bg: SURFACE_HEX.butter,
    dark: false,
    top: 108,
  },
  {
    counter: "(002) / (003)",
    img: "/images/method-02.webp",
    bg: SURFACE_HEX.taupe,
    dark: false,
    top: 136,
  },
  {
    counter: "(003) / (003)",
    img: "/images/method-03.webp",
    bg: SURFACE_HEX.espresso,
    dark: true,
    top: 164,
  },
];

const PROJECTS_META: Pick<
  ProjectCardData,
  "year" | "img" | "objectPosition" | "partValues"
>[] = [
  {
    year: "2026",
    img: "/images/project-01.webp",
    objectPosition: "50% 35%",
    partValues: ["Mini partial"],
  },
  {
    year: "2026",
    img: "/images/project-02.webp",
    objectPosition: "50% 45%",
    partValues: ["Partial"],
  },
  {
    year: "2026",
    img: "/images/project-03.webp",
    objectPosition: "50% 50%",
    partValues: ["Partial"],
  },
  {
    year: "2026",
    img: "/images/project-04.webp",
    objectPosition: "50% 50%",
    partValues: ["Partial"],
  },
  {
    year: "2026",
    img: "/images/project-05.webp",
    objectPosition: "50% 20%",
    partValues: ["Mini partial"],
  },
];

const GALLERY_WORDS = [
  "HEADS",
  "PARTIALS",
  "FULLSUITS",
  "PAWS & TAILS",
  "COMMISSIONS",
];

const GALLERY_ROW1_META: Omit<
  GalleryPhotoCopy,
  "alt" | "title" | "eyebrow" | "description" | "tags"
>[] = [
  {
    id: "g-r1-01",
    src: "/images/gallery-r1-01.webp",
    partValues: ["Mini partial"],
    filterCategories: ["partials", "heads"],
    widthClass: GALLERY_WIDTH.narrow,
  },
  {
    id: "g-r1-02",
    src: "/images/gallery-r1-02.webp",
    partValues: ["Partial"],
    filterCategories: ["partials", "paws"],
    widthClass: GALLERY_WIDTH.wide,
  },
  {
    id: "g-r1-03",
    src: "/images/gallery-r1-03.webp",
    partValues: ["Mini partial"],
    filterCategories: ["partials", "paws"],
    widthClass: GALLERY_WIDTH.narrow,
  },
  {
    id: "g-r1-04",
    src: "/images/gallery-r1-04.webp",
    partValues: ["Head"],
    filterCategories: ["heads"],
    widthClass: GALLERY_WIDTH.wide,
  },
  {
    id: "g-r1-05",
    src: "/images/gallery-r1-05.webp",
    partValues: ["Mini partial"],
    filterCategories: ["partials", "paws"],
    widthClass: GALLERY_WIDTH.narrow,
    objectPosition: "center top",
  },
  {
    id: "g-r1-06",
    src: "/images/gallery-r1-06.webp",
    partValues: ["Head"],
    filterCategories: ["heads"],
    widthClass: GALLERY_WIDTH.medium,
  },
  {
    id: "g-r1-07",
    src: "/images/gallery-r1-07.webp",
    partValues: ["Mini partial"],
    filterCategories: ["partials", "paws"],
    widthClass: GALLERY_WIDTH.narrow,
  },
  {
    id: "g-r1-08",
    src: "/images/gallery-r1-08.webp",
    partValues: ["Mini partial"],
    filterCategories: ["partials", "heads"],
    widthClass: GALLERY_WIDTH.narrow,
  },
];

const GALLERY_ROW2_META: Omit<
  GalleryPhotoCopy,
  "alt" | "title" | "eyebrow" | "description" | "tags"
>[] = [
  {
    id: "g-r2-01",
    src: "/images/gallery-r2-01.webp",
    partValues: ["Partial"],
    filterCategories: ["partials", "paws"],
    widthClass: GALLERY_WIDTH.wide,
  },
  {
    id: "g-r2-02",
    src: "/images/gallery-r2-02.webp",
    partValues: ["Head"],
    filterCategories: ["heads", "partials"],
    widthClass: GALLERY_WIDTH.wide,
  },
  {
    id: "g-r2-03",
    src: "/images/gallery-r2-03.webp",
    partValues: ["Head", "Tail"],
    filterCategories: ["paws", "partials"],
    widthClass: GALLERY_WIDTH.narrow,
    objectPosition: "center top",
  },
  {
    id: "g-r2-04",
    src: "/images/gallery-r2-04.webp",
    partValues: ["Partial"],
    filterCategories: ["partials", "paws"],
    widthClass: GALLERY_WIDTH.medium,
  },
  {
    id: "g-r2-05",
    src: "/images/gallery-r2-05.webp",
    partValues: ["Paws"],
    filterCategories: ["paws", "partials"],
    widthClass: GALLERY_WIDTH.wide,
  },
  {
    id: "g-r2-06",
    src: "/images/gallery-r2-06.webp",
    partValues: ["Head", "Paws"],
    filterCategories: ["paws", "heads"],
    widthClass: GALLERY_WIDTH.narrow,
  },
  {
    id: "g-r2-07",
    src: "/images/gallery-r2-07.webp",
    partValues: ["Partial"],
    filterCategories: ["partials", "paws"],
    widthClass: GALLERY_WIDTH.wide,
  },
  {
    id: "g-r2-08",
    src: "/images/gallery-r2-08.webp",
    partValues: ["Mini partial"],
    filterCategories: ["partials", "heads"],
    widthClass: GALLERY_WIDTH.narrow,
    objectPosition: "center top",
  },
];

const PACKAGES_META: Pick<
  PackageCardData,
  "optionValue" | "bg" | "img" | "imgPos" | "rot"
>[] = [
  {
    optionValue: "Head",
    bg: SURFACE_HEX.butter,
    img: "/images/offer-01.webp",
    imgPos: "50% 35%",
    rot: -4,
  },
  {
    optionValue: "Paws",
    bg: SURFACE_HEX.taupe,
    img: "/images/gallery-r2-05.webp",
    imgPos: "50% 50%",
    rot: 3,
  },
  {
    optionValue: "Tail",
    bg: SURFACE_HEX.cream,
    img: "/images/polaroid-03.webp",
    imgPos: "50% 35%",
    rot: -3,
  },
  {
    optionValue: "Feet",
    bg: SURFACE_HEX.cream,
    img: "/images/gallery-r2-07.webp",
    imgPos: "50% 60%",
    rot: 3,
  },
  {
    optionValue: "Half-body",
    bg: SURFACE_HEX.taupe,
    img: "/images/gallery-r2-08.webp",
    imgPos: "50% 25%",
    rot: -3,
  },
  {
    optionValue: "Fullsuit",
    bg: SURFACE_HEX.butter,
    img: "/images/project-04.webp",
    imgPos: "50% 28%",
    rot: 4,
  },
];

const SHARED_CHANNELS: HomeLocaleCopy["channels"] = [
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

export const HOME_COPY: Record<Lang, HomeLocaleCopy> = {
  en: {
    heroStatusChecking: "Checking slot status...",
    heroStatusOpen: "Commissions open",
    heroStatusClosed: "Commissions closed",
    heroEyebrow: "Custom Fursuit Workshop",
    heroTitle: ["From sketch", "to fursuit"],
    heroDesc:
      "We pattern custom fursuits straight from your ref sheet, built so you can actually breathe and move in them.",
    heroContactCta: "Contact",
    heroProjectsCta: "View fursuits",
    studioEyebrow: "[The studio]",
    phraseText:
      "At FluffNii, we build fursuits meant to last all day on the con floor. Each head is shaped around real airflow and forward vision first, before we tape every marking by hand and shave the cheeks down smooth.",
    phraseHighlights1:
      "all day, tape every marking by hand, shave the cheeks",
    phraseHighlights2: "con floor, airflow and forward vision",
    formulaEyebrow: "[The formula]",
    formulaAlt: "Finished FluffNii Kemono fursuit head showing smooth cheek fur shaving",
    formulaTitleLines: ["Character Design +", "Fursuit Craft ="],
    formulaLead:
      "A suit that still reads like your OC the second you put it on, without trapping heat inside.",
    formulaBodyBefore:
      "We tape the pattern right off your ref sheet so small spots and ear notches land where you drew them. And most of our bench hours go into slow, even shaving, ",
    formulaBodyStrong: "solid seams",
    formulaBodyAfter:
      ", plus hollowing out enough breathing room for long con afternoons.",
    statBuilt: "(Fursuits & parts built)",
    statSpecies: "(Species & styles)",
    statHandmade: "(Made by hand)",
    pillarsEyebrow: "[3 things we focus on]",
    pillars: [
      {
        num: "(001)",
        title: "SCULPT & PROPORTION",
        desc: "Cheeks and ear tilt get sculpted from multiple angles on foam or 3D bases alongside muzzle depth. Forward sightlines stay open so you can see where you walk.",
      },
      {
        num: "(002)",
        title: "IMPORTED FAUX FUR",
        desc: "Dense faux fur goes straight onto the taped pattern for tight seams. Then we shave the pile down in passes until every marking edge looks crisp.",
      },
      {
        num: "(003)",
        title: "COMFORT & LINING",
        desc: "Sweat-wicking fabric and hidden vents keep air moving inside the head. You also get washable padding and a Velcro tongue, with magnetic add-ons if you want them.",
      },
    ],
    whoEyebrow: "[Who it's for]",
    whoTitle: ["Every species,", "built your way"],
    whoDesc:
      "Bears, lions, fox-cats, dogs, or shibas. One template never fits two species well, so we adjust the base proportions for each ref sheet.",
    fanCards: [
      {
        ...FAN_CARDS_META[0],
        title: "BEAR",
        desc: "Round ears set wide over soft cheeks and a broad muzzle.",
      },
      {
        ...FAN_CARDS_META[1],
        title: "LION",
        desc: "Layered mane tufts framed by a heavier brow that holds its shape in profile.",
      },
      {
        ...FAN_CARDS_META[2],
        title: "FOX-CAT",
        desc: "Tall fox ears balanced over a short cat muzzle for that soft Kemono look.",
      },
      {
        ...FAN_CARDS_META[3],
        title: "DOG",
        desc: "Upbeat ears and a slight nose tilt, usually paired with a wag-ready tail.",
      },
      {
        ...FAN_CARDS_META[4],
        title: "SHIBA INU",
        desc: "Crisp urajiro cheeks under pointed ears. The curled tail keeps its arc all day.",
      },
    ],
    resultEyebrow: "[The result]",
    resultTitle: ["From 2D ref sheet", "to 3D reality"],
    resultDesc:
      "Taking flat character art into three dimensions mostly comes down to getting the base volume right, then matching shave depth to clean seam placement.",
    resultAlts: [
      "Umbréon Retsquôt brown-and-white horned canine fursuit sitting outdoors with matching paws",
      "Felix Algorithm teal and navy Kemono canine fursuit waving from a pale blue doorway",
      "Sy Tray silver and orange Kemono fursuit holding a skateboard by yellow lockers with a removable tongue",
      "White cat fursuit with a red hair streak and blue-padded paws sitting on grass",
    ],
    resultCards: [
      {
        num: "(001)",
        title: "TRUE TO YOUR REF",
        desc: "Markings and ear notches get taped directly onto the base from your ref sheet. Nothing drifts out of place.",
      },
      {
        num: "(002)",
        title: "KEMONO CHARM",
        desc: "Deep-set 3D follow-me eyes sit tucked behind full cheeks. The face keeps its expression head-on and in side profile.",
      },
      {
        num: "(003)",
        title: "CUSTOM EXPRESSIONS",
        desc: "Velcro tongues and eyelids come standard for quick mood swaps. You can also add posable ears or magnetic parts.",
      },
      {
        num: "(004)",
        title: "MADE TO MOVE",
        desc: "A hidden back zipper makes putting the head on simple. Inside, wide vision and breathable lining hold up for hours.",
      },
    ],
    methodEyebrow: "[How]",
    methodTitle: "In three stages",
    methodDesc:
      "Every build goes through these three workbench stages. And we send WIP photos at each check-in before moving to the next.",
    methodSteps: [
      {
        ...METHOD_STEPS_META[0],
        tag: "[Step 01]",
        title: "SCULPTED BASE & EXPRESSIVE 3D EYES",
        desc: "First we carve a balanced shell around deep follow-me eyes and an open mouth vent. Forward vision stays clear so you are not guessing where the stairs are at a con.",
        pills: ["Symmetry", "Vision", "Airflow"],
      },
      {
        ...METHOD_STEPS_META[1],
        tag: "[Step 02]",
        title: "HAND-PATTERNED FUR & SMOOTH SHAVING",
        desc: "We tape dense faux fur right onto the sculpted base and stitch the seams tight. Then the cheeks and muzzle get shaved down gradually so the markings read cleanly.",
        pills: ["Softness", "Patterns", "Detail"],
      },
      {
        ...METHOD_STEPS_META[2],
        tag: "[Step 03]",
        title: "LINED INTERIOR & BALANCED SILHOUETTE",
        desc: "The inside gets lined in sweat-wicking fabric and fitted with padding tuned to your head measurements. Meanwhile, the paw pads are stuffed firm so they keep their bounce.",
        pills: ["Breathable", "Fit", "Durable"],
      },
    ],
    projectsEyebrow: "[Projects]",
    projectsTitle: ["Selected", "projects"],
    prevProjectAria: "Previous project",
    nextProjectAria: "Next project",
    projectDotAria: "Go to project",
    projects: [
      {
        ...PROJECTS_META[0],
        client: "SY TRAY",
        category: "Mini partial",
        summary:
          "Ash-grey and cream Kemono head with bright orange cheek tufts. Big amber eyes sit above four-finger paws with stuffed claws.",
        tags: ["Mini partial", "Kemono", "Shaved fur", "Clawed paws"],
        inspectLabel: "Inspect",
        review:
          "The shave work is super smooth and even. Every angle on the face reads cleanly, and the fur still feels soft to touch.",
        author: "Sy tray",
        role: "Suit Owner",
      },
      {
        ...PROJECTS_META[1],
        client: "MINNY MINNIE",
        category: "Partial",
        summary:
          "Snow-white Kemono partial with red-lined cat eyes. Built with a blue forehead diamond and puffy sky-blue paw pads.",
        tags: ["Partial", "Kemono cat", "Padded paws"],
        inspectLabel: "Inspect",
      },
      {
        ...PROJECTS_META[2],
        client: "FELIX ALGORITHM",
        category: "Partial",
        summary:
          "Teal and cream canine build with a winking left eye and bright yellow ear linings. Comes with matching navy-tipped paws.",
        tags: ["Partial", "3D TPU base", "Multi-color seams"],
        inspectLabel: "Inspect",
        review:
          "Thick, sturdy 3D-printed TPU base made specifically for my OC. All the tricky markings lined up properly, and both the hand and machine stitching hold up great.",
        author: "Felix",
        role: "Suit Owner",
      },
      {
        ...PROJECTS_META[3],
        client: "HUNTER KNIGHT",
        category: "Partial",
        summary:
          "Silver-white build with thick, layered cheek fluff. Topped with a red-and-black hair streak and pale blue paw pads.",
        tags: ["Partial", "Layered fluff", "Blue paw pads"],
        inspectLabel: "Inspect",
      },
      {
        ...PROJECTS_META[4],
        client: "UMBRÉON RETSQUÔT",
        category: "Mini partial",
        summary:
          "Black-and-white canine suit accented in gold, built with blue eyes and a removable blep tongue. A braided ear cord and gold bell sit by the ear.",
        tags: ["Mini partial", "3D TPU base", "Removable tongue"],
        inspectLabel: "Inspect",
        review:
          "Solid TPU base sculpted just for my character. Even where different fur colors meet in tight corners, the seams sit flat and barely show.",
        author: "Umbréon Retsquôt",
        role: "Suit Owner",
      },
    ],
    galleryEyebrow: "[Gallery]",
    galleryTitle: "The wall of fursuits",
    galleryDesc:
      "Completed heads and partials straight off the workbench. Pick a category filter below, or pause the scroll and tap any photo to zoom in.",
    galleryFilters: [
      { id: "all", label: "All" },
      { id: "heads", label: "Heads" },
      { id: "partials", label: "Partials" },
      { id: "fullsuits", label: "Fullsuits" },
      { id: "paws", label: "Paws & Tails" },
    ],
    galleryPauseLabel: "Pause",
    galleryPlayLabel: "Play",
    galleryPauseAria: "Pause gallery ticker",
    galleryPlayAria: "Resume gallery ticker",
    galleryWords: GALLERY_WORDS,
    galleryRow1: [
      {
        ...GALLERY_ROW1_META[0],
        alt: "Red and orange fox fursuit partial holding a small white cake at dusk",
        title: "Red & Orange Fox",
        eyebrow: "[Partial · Kemono]",
        description: "Orange fur shaves smoothly into cream across the cheeks, paired with red-cuffed four-finger paws and black cloth claws.",
        tags: ["Partial", "Follow-me eyes", "Clawed paws"],
      },
      {
        ...GALLERY_ROW1_META[1],
        alt: "Sy Tray and Minny Minnie fursuits sitting at classroom desks",
        title: "Sy Tray & Minny Minnie",
        eyebrow: "[Partials · Studio Shoot]",
        description: "Two Kemono partials side by side, showing how two different head shapes and paw styles read together in person.",
        tags: ["Partial", "Paws & Tail", "Kemono"],
      },
      {
        ...GALLERY_ROW1_META[2],
        alt: "Bright orange canine fursuit partial outdoors showing soft paw pads",
        title: "Orange Canine Build",
        eyebrow: "[Mini partial · Canine]",
        description: "Bright orange and cream canine head with heavy eyeliner and metal ear rings, paired with deep brown paw pads.",
        tags: ["Mini partial", "Paws", "Ear accessories"],
      },
      {
        ...GALLERY_ROW1_META[3],
        alt: "Felix Algorithm blue fursuit head wearing white round glasses on the beach",
        title: "Felix Algorithm",
        eyebrow: "[Head · Glasses Friendly]",
        description: "Teal and cream Kemono head with extra bridge space carved behind the eyes so round glasses sit without crushing the fur.",
        tags: ["Head", "Glasses fit", "Shaved muzzle"],
      },
      {
        ...GALLERY_ROW1_META[4],
        alt: "Sy Tray silver and orange fursuit waving beside yellow lockers",
        title: "Sy Tray",
        eyebrow: "[Mini partial · Kemono]",
        description: "Layered grey bangs over bright orange ear linings. The four-finger paws carry matching orange pads.",
        tags: ["Mini partial", "Paws", "Layered hair"],
      },
      {
        ...GALLERY_ROW1_META[5],
        alt: "Black and yellow shiba fursuit head with gold ear cuff and bell",
        title: "Umbréon Retsquôt",
        eyebrow: "[Head · 3D TPU Base]",
        description: "Shiba Inu head built on a 3D TPU shell. Keeps sharp urajiro cheek markings alongside a braided ear cord and removable tongue.",
        tags: ["Head", "3D TPU base", "Urajiro markings"],
      },
      {
        ...GALLERY_ROW1_META[6],
        alt: "Felix Algorithm blue fursuit waving both paws on a garden lawn",
        title: "Felix Algorithm",
        eyebrow: "[Partial · Garden Pose]",
        description: "Standing shot showing symmetrical navy-tipped paws with green pads and how the tail balances at the waist.",
        tags: ["Mini partial", "Paws", "Follow-me eyes"],
      },
      {
        ...GALLERY_ROW1_META[7],
        alt: "White cat fursuit with red hairclip leaning by a blue street rail",
        title: "White Cat Street Build",
        eyebrow: "[Mini partial · Feline]",
        description: "Plush white cheeks topped with a red-and-black hair streak and sky-blue paw pads.",
        tags: ["Mini partial", "Feline", "Hair accent"],
      },
    ],
    galleryRow2: [
      {
        ...GALLERY_ROW2_META[0],
        alt: "White cat fursuit with blue paw pads perched on a rooftop ledge",
        title: "Rooftop Cat Partial",
        eyebrow: "[Partial · High Contrast]",
        description: "Up-close view of the stuffed blue fabric claws and two-tone pink-and-blue pads next to trimmed cheek fur.",
        tags: ["Partial", "Blue claws", "Padded paws"],
      },
      {
        ...GALLERY_ROW2_META[1],
        alt: "Sky-blue horned goat fursuit wearing a straw hat in a greenhouse",
        title: "Sky-Blue Horned Kemono",
        eyebrow: "[Head · Custom Horns]",
        description: "Pale sky-blue gradient fur paired with lightweight black horns and amber follow-me eyes.",
        tags: ["Head", "Horns", "Color gradient"],
      },
      {
        ...GALLERY_ROW2_META[2],
        alt: "Black and yellow shiba fursuit leaning on a scooter with curled tail",
        title: "Shiba Head & Tail",
        eyebrow: "[Paws & Tails · Coastal]",
        description: "Tightly curled black-and-white tail anchored at the hip so it keeps its curve while moving.",
        tags: ["Tail", "Head", "Urajiro markings"],
      },
      {
        ...GALLERY_ROW2_META[3],
        alt: "Sy Tray and white cat fursuit holding a basketball by yellow lockers",
        title: "Locker Room Duo",
        eyebrow: "[Partials · Kemono]",
        description: "Side-by-side look at two open-mouth sculpts and reinforced pawpad stitching under prop grip.",
        tags: ["Partial", "Paws", "Blep tongue"],
      },
      {
        ...GALLERY_ROW2_META[4],
        alt: "Felix Algorithm reaching a blue paw toward the camera outside",
        title: "Custom Paws Detail",
        eyebrow: "[Paws & Tails · 35 cm Standard]",
        description: "Four-finger 35 cm paws with stuffed white claws and navy accent digits. A squeaker sits tucked inside the palm.",
        tags: ["Paws", "Fabric claws", "Squeaker"],
      },
      {
        ...GALLERY_ROW2_META[5],
        alt: "Minny Minnie white cat fursuit reading a book under paper lanterns",
        title: "Minny Minnie Paws",
        eyebrow: "[Head & Paws · Kemono]",
        description: "Puffy pads that still bend easily to hold props, matched with red-lined cat eyes and a forehead diamond.",
        tags: ["Head", "Paws", "Blue claws"],
      },
      {
        ...GALLERY_ROW2_META[6],
        alt: "Orange canine fursuit crouching on a painted concrete wall",
        title: "Street Canine Partial",
        eyebrow: "[Partial · Orange & Cream]",
        description: "Long-pile orange paws with black fabric claws that blend gradually into a cream neck.",
        tags: ["Partial", "Paws", "Black claws"],
      },
      {
        ...GALLERY_ROW2_META[7],
        alt: "Brown-and-white horned fursuit sitting on the trunk of a vintage Datsun",
        title: "Horned Canine Partial",
        eyebrow: "[Mini partial · Heterochromia]",
        description: "Gold-and-blue follow-me eyes with one floppy ear and black horns. Paired with clawed white paws.",
        tags: ["Mini partial", "Horns", "Heterochromia"],
      },
    ],
    galleryEmptyFullsuit: {
      title: "Custom Half Body & Fullsuit builds",
      desc: "Half Bodies and Fullsuits are patterned from your ref sheet and Duct Tape Dummy. Right now this wall shows finished Heads and Partials, so check the build specs below or ask us for a Fullsuit quote.",
      ctaSpecs: "View Fullsuit specs",
      ctaQuote: "Request Fullsuit quote",
      ctaShowAll: "Show all photos",
    },
    lightboxCta: "Request similar build",
    lightboxCloseAria: "Close photo preview",
    lightboxPrevAria: "Previous photo",
    lightboxNextAria: "Next photo",
    offersEyebrow: "[Offers]",
    offersTitle: "Built for your character",
    offersDesc:
      "Commission just a Head, or go for a full suite with matching Paws, Feet, Tail, and a bodysuit cut from the exact same dye lot.",
    offer1Tag: "[Offer 01]",
    offer1Alt: "Custom Fursuit Head",
    offer1Title: "Custom Fursuit Head",
    offer1Desc:
      "Just the head, built on a rigid shell with a soft, flexible muzzle and two base fur colors included.",
    offer1Bullets: [
      "Rigid head base with a soft muzzle (Full TPU flexible 3D-printed shell optional)",
      "Full head and neck lining with removable Velcro tongue and eyelids",
      "Includes 2 base colors in standard Asian faux fur (extra colors quoted separately)",
      "Optional add-ons: magnetic eyelids or built-in fan, plus removable hair",
    ],
    offer1Sub: "2 base colors · rigid + soft muzzle",
    offer1Cta: "Request Head quote",
    offer2Tag: "[Offer 02]",
    offer2Alt: "Half Body & Full Suit",
    offer2Title: "Half Body & Full Suit",
    offer2Desc:
      "Full character suites combining Head, Paws, Feet, and Tail with a Half Body or Fullsuit cut from one matched fur lot.",
    offer2Bullets: [
      "Includes Head, Paws, Feet, Tail, and Half or Full Body with 2 base colors",
      "Paws: 35 cm standard length with fabric claws, palm squeaker, and full inner lining",
      "Tail: 70 cm standard length, with optional poseable frame or spring hyper-motion",
      "Feet: outdoor PETG (rigid 3D-printed) toes, foam core, and one-size inner slipper",
    ],
    offer2Sub: "2 base colors · matched fur lot",
    offer2Cta: "Request Suit quote",
    furNotice:
      "Standard builds use Asian faux fur. Mofu, Cream, Limey, and other imported furs carry an extra material fee.",
    packagesEyebrow: "[Commission options · 6 parts & suites]",
    packageCta: "Request quote",
    packages: [
      {
        ...PACKAGES_META[0],
        title: "HEAD",
        rows: [
          { label: "Base fur · Frame", value: "2 COL · RIGID+SOFT" },
          { label: "Full TPU (flex 3D shell)", value: "EXTRA FEE" },
          { label: "Magnetic eyelids", value: "ADD-ON" },
          { label: "Extra fur color", value: "EXTRA FEE" },
          { label: "Built-in fan", value: "ADD-ON" },
          { label: "Removable hair", value: "ADD-ON" },
        ],
        note: "Includes head and neck lining with a Velcro tongue and Velcro eyelids.",
      },
      {
        ...PACKAGES_META[1],
        title: "PAWS",
        rows: [
          { label: "Base fur · Length", value: "1 COL · 35 CM" },
          { label: "Standard build", value: "CLAWS + SQUEAKER" },
          { label: "5-finger design", value: "ADD-ON" },
          { label: "Extra fur color", value: "EXTRA FEE" },
          { label: "Finger escape (wrist slit)", value: "ADD-ON" },
        ],
        note: "Includes fabric claws and a palm squeaker inside a full lining.",
      },
      {
        ...PACKAGES_META[2],
        title: "TAIL",
        rows: [
          { label: "Base fur · Length", value: "1 COL · 70 CM" },
          { label: "Fish / dragon / long", value: "BY DESIGN" },
          { label: "Extra fur color", value: "EXTRA FEE" },
          { label: "Poseable frame", value: "ADD-ON" },
          { label: "Hyper motion (bouncy core)", value: "ADD-ON" },
          { label: "Cleaning zipper", value: "ADD-ON" },
        ],
        note: "Longer tails add extra fur cost, and fish or dragon tails are quoted by ref.",
      },
      {
        ...PACKAGES_META[3],
        title: "FEET",
        rows: [
          { label: "Base · Inner slipper", value: "1 COL · ONE SIZE" },
          { label: "Extra fur color", value: "EXTRA FEE" },
          { label: "Indoor feet style", value: "ADD-ON" },
          { label: "Indoor/Outdoor swap", value: "ADD-ON" },
        ],
        note: "Outdoor build with rigid PETG toes, fabric claws, foam core, and full lining.",
      },
      {
        ...PACKAGES_META[4],
        title: "HALF BODY",
        rows: [
          { label: "Base fur colors", value: "2 COLORS" },
          { label: "Included parts", value: "HEAD · PAWS · FEET" },
          { label: "Body & tail", value: "TAIL + HALF BODY" },
          { label: "Free bonus gift", value: "TORSO LINER SET" },
        ],
        note: "Includes Head, Paws, Feet, Tail, Half Body, and adjustable padding liner.",
      },
      {
        ...PACKAGES_META[5],
        title: "FULL SUIT",
        rows: [
          { label: "Base fur colors", value: "2 COLORS" },
          { label: "Included parts", value: "HEAD · PAWS · FEET" },
          { label: "Body & tail", value: "TAIL + FULL BODY" },
          { label: "Free bonus gift", value: "TORSO LINER SET" },
        ],
        note: "Includes Head, Paws, Feet, Tail, Fullsuit, and adjustable padding liner.",
      },
    ],
    extraOptionsEyebrow: "[Additional Options & Accessories]",
    extraOptionsTag: "[Add-ons]",
    extraOptions: [
      { label: "Removable hair / wig", value: "Optional add-on · quoted by design" },
      {
        label: "Accessories (horns, wings, glasses...)",
        value: "Browse accessories catalog",
        href: "/accessories",
      },
      {
        label: "Imported faux fur upgrades",
        value: "Mofu, Cream, Limey, and imported regional furs",
      },
    ],
    freeGiftsEyebrow: "[Free Gifts Included]",
    freeGiftsTag: "[Every Head & Suit order]",
    freeGifts: [
      "Removable Velcro tongue",
      "Fur slicker brush",
      "Set of hair clips",
      "Small surprise gift",
    ],
    bonusTag: "[Half Body & Full Suit Bonus]",
    bonusText:
      "Half Body and Full Suit orders also come with a free torso padding liner set with adjustable straps.",
    timelineEyebrow: "[Project timeline]",
    timelineTitle: ["No guesswork", "on WIPs"],
    timelineDesc:
      "We send WIP photos before cutting fur or closing seams. Nothing moves to the next stage until you sign off on how it looks.",
    timelineTermsCta: "Commission Terms",
    faqEyebrow: "[Frequently asked questions]",
    faqTitle: ["Got a", "question?"],
    faqDesc:
      "Answers to what suiters usually ask before booking a slot. But if your question isn't listed here, just message us and we'll answer straight.",
    faqAskCta: "Ask a question",
    faqTermsCta: "Read Commission Terms",
    contactEyebrow: "[Contact]",
    contactTitle: ["Ready to start", "a build?"],
    contactIntro:
      "Send over your ref sheet and the parts you have in mind. Quotes are free, and we reply within 24 hours.",
    quoteInfoPills: [
      { label: "Free quote", detail: "No obligation to book" },
      {
        label: "What shapes cost",
        detail: "Species, fur colors, fur tier & add-ons",
      },
      {
        label: "Vietnam studio",
        detail: "Domestic & worldwide shipping",
      },
      {
        label: "Turnaround",
        detail: "Confirmed per design & queue",
      },
    ],
    channels: SHARED_CHANNELS,
    statusChecking: "[Checking slot status...]",
    statusBadgeOpen: "[Status: Commissions Open]",
    statusBadgeClosed: "[Status: Commissions Closed]",
    fieldName: "[Name or handle *]",
    placeholderName: "Your name or @handle",
    fieldSpecies: "[Character species *]",
    placeholderSpecies: "Wolf, Kemono cat, Shiba...",
    fieldEmail: "[Email *]",
    placeholderEmail: "you@email.com",
    fieldPhone: "[Phone number (optional)]",
    placeholderPhone: "+1 / +44 / +84 ...",
    fieldFacebook: "[Social / DM handle (FB, IG, Discord, X) (optional)]",
    placeholderFacebook: "@username or profile URL",
    fieldRefLink: "[Ref sheet link *]",
    placeholderRefLink:
      "https://drive.google.com/... (Google Drive, Toyhouse, Imgur...)",
    fieldType: "[Commission type *]",
    commissionGroups: [
      {
        colsClass: COMMISSION_COLS[0],
        options: [
          { value: "Head", label: "Head" },
          { value: "Paws", label: "Paws" },
          { value: "Tail", label: "Tail" },
          { value: "Feet", label: "Feet" },
        ],
      },
      {
        colsClass: COMMISSION_COLS[1],
        options: [
          {
            value: "Mini partial",
            label: "Mini partial",
            note: "(head, paws, tail)",
          },
          {
            value: "Partial",
            label: "Partial",
            note: "(head, paws, tail, feet)",
          },
        ],
      },
      {
        colsClass: COMMISSION_COLS[2],
        options: [
          {
            value: "Only body",
            label: "Only body",
            note: "DTD needed after approval",
          },
          {
            value: "Half-body",
            label: "Half-body",
            note: "DTD needed after approval",
          },
          {
            value: "Fullsuit",
            label: "Fullsuit",
            note: "DTD needed after approval",
          },
        ],
      },
    ],
    dtdCalloutTitle: "About the Duct Tape Dummy (DTD)",
    dtdCalloutBody:
      "A DTD is a full-body tape shell wrapped over an old t-shirt so we can pattern your bodysuit fit. You do not need one just to ask for a quote, since we only collect it after your slot is confirmed.",
    fieldNotes: "[Project notes *]",
    placeholderNotes:
      "Tell us about markings, your preferred fur tier (Asian vs. Mofu, Cream, Limey), or add-ons like magnetic eyelids, a fan, or removable hair...",
    termsNoticeBefore:
      "By sending a quote request, you confirm that you have read and agree to our ",
    termsNoticeLink: "Commission Terms & Policy",
    recaptchaNoticeBefore: "Protected by reCAPTCHA v3 (",
    recaptchaPrivacyLabel: "Google Privacy",
    recaptchaNoticeMid: " & ",
    recaptchaTermsLabel: "Terms",
    recaptchaNoticeAfter: ").",
    recaptchaVerifying: "Verifying reCAPTCHA…",
    submitIdle: "Request a free quote",
    submitWaitlist: "Join future quote list",
    submitSending: "Sending…",
    submitSent: "Quote request sent!",
    submitAnother: "Send another inquiry",
    confirmTitle: "Quote request sent!",
    confirmWaitlistTitle: "Added to future quote list!",
    confirmDesc:
      "We reply within 24 hours from FluffNii.furries@gmail.com. Check Spam or Promotions if nothing shows up in your main inbox.",
    confirmWaitlistDesc:
      "Commissions are paused right now, so we saved your character details for the next opening. You will still hear back within 24 hours from FluffNii.furries@gmail.com.",
    confirmLabelName: "Name",
    confirmLabelSpecies: "Species",
    confirmLabelEmail: "Reply email",
    confirmLabelParts: "Selected items",
    errorFallback:
      "Could not send your request. Copy your details below or email FluffNii.furries@gmail.com directly.",
    errorNetwork:
      "Connection timed out or dropped while sending. Copy your text below so nothing gets lost and reach out directly.",
    contactErrors: {
      PAYLOAD_TOO_LARGE:
        "Your notes are a bit over the size limit. Trim a little text and send again.",
      INVALID_JSON:
        "Something went wrong reading the form. Refresh the page and try sending again.",
      TOO_FAST:
        "That went through a bit fast. Wait two seconds and click send again.",
      MISSING_FIELDS:
        "Please fill in your name/handle, character species, email, ref sheet link, and project notes.",
      INVALID_EMAIL:
        "Please enter a valid email address so we know where to send your quote.",
      MISSING_TYPES:
        "Please pick at least one commission type above before sending.",
      RECAPTCHA_FAILED:
        "reCAPTCHA check did not pass. Refresh the page and try again, or copy your inquiry below to email us directly.",
      SERVICE_UNAVAILABLE:
        "Our automatic form mailer is temporarily down. Copy your inquiry below and reach out by email or Instagram.",
      SEND_FAILED:
        "We could not send your request right now. Try again in a moment, or copy the text below to email or DM us.",
    },
    copyInquiryCta: "Copy inquiry text",
    copyInquiryDone: "Copied to clipboard",
    copyInquiryFail: "Clipboard blocked by browser. Select and copy below:",
    errorDirectNote: "Or reach out directly:",
    errorMailSubject: "FluffNii Quote Request",
  },
  vi: {
    heroStatusChecking: "Đang kiểm tra slot...",
    heroStatusOpen: "Đang mở slot",
    heroStatusClosed: "Tạm đóng slot",
    heroEyebrow: "Xưởng làm Fursuit thủ công",
    heroTitle: ["Từ bản vẽ", "thành fursuit"],
    heroDesc:
      "Mình dựng rập sát theo ref sheet OC, chừa độ thoáng bên trong để bạn đội lên nhìn rõ và cử động thoải mái.",
    heroContactCta: "Liên hệ",
    heroProjectsCta: "Xem fursuit",
    studioEyebrow: "[Về xưởng mình]",
    phraseText:
      "Xưởng mình làm fursuit sao cho nhẹ đầu và thoáng khí để bạn mặc đi fes cả ngày. Mình dựng rập tay từng mảng màu theo ref, rồi tỉa mượt má với mõm để giữ đúng thần thái nhân vật.",
    phraseHighlights1: "dựng rập tay, tỉa mượt, giữ đúng thần thái",
    phraseHighlights2: "nhẹ đầu, thoáng khí, đi fes cả ngày",
    formulaEyebrow: "[Cách xưởng làm]",
    formulaAlt: "Head fursuit Kemono của FluffNii đã tỉa lông và hoàn thiện",
    formulaTitleLines: ["Thiết kế nhân vật +", "Kỹ thuật dựng suit ="],
    formulaLead:
      "Đội lên nhìn ra ngay OC của bạn, mà bên trong vẫn mát và dễ thở.",
    formulaBodyBefore:
      "Mình vẽ rập ngay trên base theo ref sheet nên mấy mảng đốm hay dáng tai đều vào đúng chỗ. Và phần tốn nhiều công nhất luôn là tỉa lông đều tay, ",
    formulaBodyStrong: "khâu chắc từng đường nối",
    formulaBodyAfter:
      ", rồi chừa đủ khoảng thở để bạn đội suốt buổi fes không bị ngộp.",
    statBuilt: "(Fursuit & part đã làm)",
    statSpecies: "(Loài & phong cách)",
    statHandmade: "(Làm thủ công)",
    pillarsEyebrow: "[3 phần xưởng mình giữ kỹ nhất]",
    pillars: [
      {
        num: "(001)",
        title: "FORM MẶT & TỈ LỆ",
        desc: "Mình gọt base xốp hoặc in 3D sao cho gò má cân hai bên và dáng tai đứng vững ở mọi góc nhìn. Khe mắt cũng chừa rộng để bạn đi lại không bị khuất tầm nhìn.",
      },
      {
        num: "(002)",
        title: "LÔNG DÀY & TỈA MƯỢT",
        desc: "Lông nhập dày được dán rập ngay trên vỏ base rồi may giấu chỉ cho chắc. Xong phần may, mình tỉa từng lớp từ má xuống mõm để các mảng màu chuyển êm.",
      },
      {
        num: "(003)",
        title: "LÓT THOÁNG & ÊM ĐẦU",
        desc: "Vải lót thấm mồ hôi cùng khe gió ẩn giúp bên trong đầu đỡ nóng. Xưởng cũng gắn sẵn đệm đầu êm và lưỡi Velcro dễ tháo giặt, hoặc nâng cấp thêm nam châm nếu bạn cần.",
      },
    ],
    whoEyebrow: "[Dành cho mọi loài]",
    whoTitle: ["Mọi loài OC,", "làm đúng chất riêng"],
    whoDesc:
      "Gấu, sư tử, cáo mèo, cún hay shiba đều có tỉ lệ mặt khác nhau. Mình làm base mới theo từng bản vẽ thay vì dùng chung một khuôn có sẵn.",
    fanCards: [
      {
        ...FAN_CARDS_META[0],
        title: "GẤU",
        desc: "Tai tròn đặt rộng cùng gò má đầy quanh chiếc mõm ngắn.",
      },
      {
        ...FAN_CARDS_META[1],
        title: "SƯ TỬ",
        desc: "Bờm lông xếp tầng ôm lấy phần chân mày nổi khối rõ nét.",
      },
      {
        ...FAN_CARDS_META[2],
        title: "CÁO MÈO",
        desc: "Tai cáo cao ghép cùng mõm mèo ngắn, giữ trọn nét tròn Kemono.",
      },
      {
        ...FAN_CARDS_META[3],
        title: "CÚN",
        desc: "Tai vểnh lanh lợi và sống mũi hơi hếch, đi cùng chiếc đuôi nảy nhịp.",
      },
      {
        ...FAN_CARDS_META[4],
        title: "SHIBA INU",
        desc: "Má urajiro tách màu sắc nét dưới tai nhọn. Đuôi cuộn giữ nếp gọn khi di chuyển.",
      },
    ],
    resultEyebrow: "[Thành phẩm]",
    resultTitle: ["Từ bản vẽ 2D", "ra đời thực"],
    resultDesc:
      "Để bản vẽ 2D bước ra ngoài đời thật, xưởng mình canh kỹ từ độ phồng khối base cho tới độ dày lông tỉa và vị trí giấu đường may.",
    resultAlts: [
      "Fursuit cún sừng nâu trắng Umbréon Retsquôt ngồi ngoài trời cùng đôi Paws đồng bộ",
      "Fursuit cún Kemono xanh ngọc navy Felix Algorithm vẫy tay bên khung cửa xanh nhạt",
      "Fursuit Kemono xám cam Sy Tray ôm ván trượt cạnh tủ locker vàng, thè lưỡi tháo rời",
      "Fursuit mèo trắng điểm lọn tóc đỏ với Paws đệm xanh ngồi trên bãi cỏ",
    ],
    resultCards: [
      {
        num: "(001)",
        title: "BÁM SÁT REF SHEET",
        desc: "Từng vệt sọc hay vết khuyết ở tai đều được lên rập thẳng trên base. Mảng màu giữ đúng vị trí bạn vẽ.",
      },
      {
        num: "(002)",
        title: "CHUẨN DÁNG KEMONO",
        desc: "Mắt 3D follow-me đặt sâu sau gò má bầu bĩnh. Nhìn chính diện hay góc nghiêng gương mặt vẫn giữ nét tươi.",
      },
      {
        num: "(003)",
        title: "ĐỔI BIỂU CẢM DỄ",
        desc: "Lưỡi và mí dán Velcro đi kèm sẵn để đổi tâm trạng nhanh. Bạn có thể chọn thêm tai bẻ dáng hoặc gắn nam châm.",
      },
      {
        num: "(004)",
        title: "ĐỘI LÂU KHÔNG NGỘP",
        desc: "Khóa kéo giấu sau gáy giúp đội lên tháo ra nhanh gọn. Bên trong lót vải mát với khe mắt rộng rãi.",
      },
    ],
    methodEyebrow: "[Cách làm việc]",
    methodTitle: "3 bước tại xưởng",
    methodDesc:
      "Mỗi bộ suit đều đi qua 3 chặng làm việc này. Làm xong chặng nào mình cũng gửi ảnh WIP để bạn xem qua trước khi làm tiếp.",
    methodSteps: [
      {
        ...METHOD_STEPS_META[0],
        tag: "[Bước 01]",
        title: "DỰNG BASE & MẮT 3D CÓ HỒN",
        desc: "Trước tiên mình gọt phom đầu cân hai bên, đặt mắt follow-me vừa tầm nhìn và mở khoang miệng thoáng khí. Nhờ vậy bạn đi fes cả buổi vẫn nhìn rõ lối đi.",
        pills: ["Cân form", "Nhìn rõ", "Thoáng khí"],
      },
      {
        ...METHOD_STEPS_META[1],
        tag: "[Bước 02]",
        title: "LÊN RẬP LÔNG & TỈA CHUYỂN MƯỢT",
        desc: "Mình dán băng keo lấy rập thẳng trên base rồi may ráp thật chắc tay. Sau đó từng mảng lông từ má xuống mõm được tỉa mượt dần cho ra đúng dáng mặt.",
        pills: ["Lông dày", "Chuẩn rập", "Mượt form"],
      },
      {
        ...METHOD_STEPS_META[2],
        tag: "[Bước 03]",
        title: "LÓT VẢI MÁT & CÂN CHỈNH FORM",
        desc: "Bước cuối mình may lót thấm hút bên trong và chỉnh đệm xốp theo đúng số đo vòng đầu của bạn. Đệm Paws cũng được nhồi căng để giữ phom êm lâu.",
        pills: ["Thấm hút", "Ôm đầu", "Chắc chắn"],
      },
    ],
    projectsEyebrow: "[Dự án đã làm]",
    projectsTitle: ["Những bộ suit", "đã hoàn thiện"],
    prevProjectAria: "Bộ trước",
    nextProjectAria: "Bộ tiếp theo",
    projectDotAria: "Xem bộ",
    projects: [
      {
        ...PROJECTS_META[0],
        client: "SY TRAY",
        category: "Mini partial",
        summary:
          "Mini partial xám tro phối kem với chỏm má cam rực. Nổi bật với đôi mắt hổ phách cỡ lớn cùng Paws bốn ngón có móng.",
        tags: ["Mini partial", "Kemono", "Tỉa lông mịn", "Paws có móng"],
        inspectLabel: "Xem lớn",
        review:
          "Lông tỉa rất đều và mịn tay, mấy góc gò má lên khối rõ nhưng sờ vào vẫn thấy êm tự nhiên.",
        author: "Sy tray",
        role: "Chủ suit",
      },
      {
        ...PROJECTS_META[1],
        client: "MINNY MINNIE",
        category: "Partial",
        summary:
          "Partial mèo trắng tuyết với mắt viền đỏ và dấu kim cương xanh trên trán. Đi kèm là đôi Paws nhồi đệm xanh da trời phồng êm.",
        tags: ["Partial", "Mèo Kemono", "Paws đệm phồng"],
        inspectLabel: "Xem lớn",
      },
      {
        ...PROJECTS_META[2],
        client: "FELIX ALGORITHM",
        category: "Partial",
        summary:
          "Partial cún xanh ngọc phối navy trên nền kem, mắt trái nháy tinh nghịch. Lót tai vàng rực đi đồng bộ với đôi Paws mũi xanh.",
        tags: ["Partial", "Base in 3D TPU", "Ghép màu phức tạp"],
        inspectLabel: "Xem lớn",
        review:
          "Base in 3D TPU dày dặn, xưởng dựng riêng sát bản vẽ OC của mình. Mấy mảng màu khó vẫn lên rập khớp nhau, đường máy lẫn khâu tay đều chắc lắm.",
        author: "Felix",
        role: "Chủ suit",
      },
      {
        ...PROJECTS_META[3],
        client: "HUNTER KNIGHT",
        category: "Partial",
        summary:
          "Partial trắng bạc có lớp lông má xếp tầng dày dặn. Trên đỉnh đầu có lọn tóc đỏ đen nổi bật, phối cùng đệm tay xanh nhạt.",
        tags: ["Partial", "Lông má nhiều tầng", "Đệm xanh nhạt"],
        inspectLabel: "Xem lớn",
      },
      {
        ...PROJECTS_META[4],
        client: "UMBRÉON RETSQUÔT",
        category: "Mini partial",
        summary:
          "Mini partial canine đen trắng điểm vàng ánh kim, mắt xanh kèm lưỡi thè tháo rời. Bên tai thắt thêm dây tết treo chuông vàng.",
        tags: ["Mini partial", "Base 3D TPU", "Lưỡi tháo rời"],
        inspectLabel: "Xem lớn",
        review:
          "Cầm vào là thấy base 3D TPU dày và dựng riêng cho form con của mình. Mấy chỗ ghép nhiều màu lông giáp nhau rất phẳng, giấu đường chỉ gọn.",
        author: "Umbréon Retsquôt",
        role: "Chủ suit",
      },
    ],
    galleryEyebrow: "[Thư viện ảnh]",
    galleryTitle: "Góc trưng bày fursuit",
    galleryDesc:
      "Những mẫu Head, Partial và Paws xưởng mình vừa hoàn thiện. Bạn chọn bộ lọc bên dưới, hoặc bấm tạm dừng và chạm vào ảnh để xem kỹ hơn.",
    galleryFilters: [
      { id: "all", label: "Tất cả" },
      { id: "heads", label: "Heads" },
      { id: "partials", label: "Partials" },
      { id: "fullsuits", label: "Fullsuits" },
      { id: "paws", label: "Paws & Tails" },
    ],
    galleryPauseLabel: "Tạm dừng",
    galleryPlayLabel: "Tiếp tục",
    galleryPauseAria: "Tạm dừng dải ảnh",
    galleryPlayAria: "Tiếp tục chạy dải ảnh",
    galleryWords: GALLERY_WORDS,
    galleryRow1: [
      {
        ...GALLERY_ROW1_META[0],
        alt: "Partial cáo lông đỏ cam cầm bánh kem trắng lúc hoàng hôn",
        title: "Cáo Đỏ Cam",
        eyebrow: "[Partial · Kemono]",
        description: "Mặt cáo tỉa chuyển màu từ cam sang kem mượt, đi cùng Paws bốn ngón viền đỏ gắn móng vải đen.",
        tags: ["Partial", "Mắt follow-me", "Paws có móng"],
      },
      {
        ...GALLERY_ROW1_META[1],
        alt: "Hai bộ fursuit Sy Tray và Minny Minnie ngồi cạnh bàn học lớp học",
        title: "Sy Tray & Minny Minnie",
        eyebrow: "[Partials · Ảnh Studio]",
        description: "Hai bộ Kemono chụp cạnh nhau, dễ nhìn ra sự khác biệt ở form đầu và dáng Paws khi mặc thật.",
        tags: ["Partial", "Paws & Tail", "Kemono"],
      },
      {
        ...GALLERY_ROW1_META[2],
        alt: "Partial cún lông cam rực ngoài trời khoe đệm Paws mềm",
        title: "Canine Lông Cam",
        eyebrow: "[Mini partial · Canine]",
        description: "Bộ cún cam phối trắng gắn khuyên tai kim loại. Lòng bàn tay may đệm nâu êm, kết hợp viền mắt vẽ dày.",
        tags: ["Mini partial", "Paws", "Khuyên tai"],
      },
      {
        ...GALLERY_ROW1_META[3],
        alt: "Head fursuit Felix Algorithm xanh dương đeo kính tròn trắng trên bãi biển",
        title: "Felix Algorithm",
        eyebrow: "[Head · Đeo được kính]",
        description: "Head cún xanh ngọc phối kem có khoét khe sâu sau mắt, giúp bạn đeo gọng kính tròn thoải mái mà không cấn lông.",
        tags: ["Head", "Vừa gọng kính", "Tỉa mõm gọn"],
      },
      {
        ...GALLERY_ROW1_META[4],
        alt: "Fursuit Sy Tray xám cam vẫy Paws bên dãy tủ locker vàng",
        title: "Sy Tray",
        eyebrow: "[Mini partial · Kemono]",
        description: "Tóc mái xám xếp tầng phủ trên tai lót cam tươi. Đôi Paws trắng bốn ngón có đệm cam đồng bộ.",
        tags: ["Mini partial", "Paws", "Tóc xếp lớp"],
      },
      {
        ...GALLERY_ROW1_META[5],
        alt: "Head Shiba Inu đen vàng gắn dây khuyên tai và chuông vàng",
        title: "Umbréon Retsquôt",
        eyebrow: "[Head · Base 3D TPU]",
        description: "Head Shiba dựng trên khung 3D TPU, giữ rõ mảng má urajiro. Bên tai buộc dây tết đỏ trắng treo chuông vàng.",
        tags: ["Head", "Base 3D TPU", "Mảng má urajiro"],
      },
      {
        ...GALLERY_ROW1_META[6],
        alt: "Fursuit Felix Algorithm giơ cả hai Paws trên bãi cỏ xanh",
        title: "Felix Algorithm",
        eyebrow: "[Partial · Dáng toàn thân]",
        description: "Góc chụp đứng khoe đôi Paws xanh navy đệm xanh lá và cách chiếc Tail ôm cân ngang hông.",
        tags: ["Mini partial", "Paws", "Mắt follow-me"],
      },
      {
        ...GALLERY_ROW1_META[7],
        alt: "Fursuit mèo trắng cài lọn tóc đỏ đứng tựa lan can xanh ngoài phố",
        title: "Mèo Trắng Dạo Phố",
        eyebrow: "[Mini partial · Feline]",
        description: "Má mèo trắng tỉa tròn êm tay, gắn thêm lọn tóc đỏ đen cùng đệm Paws xanh trời.",
        tags: ["Mini partial", "Feline", "Phụ kiện tóc"],
      },
    ],
    galleryRow2: [
      {
        ...GALLERY_ROW2_META[0],
        alt: "Fursuit mèo trắng khoe móng và đệm Paws xanh trên sân thượng",
        title: "Mèo Trắng Sân Thượng",
        eyebrow: "[Partial · Đệm Paws Xanh]",
        description: "Góc cận cho thấy móng vải xanh nhồi căng và đệm tay hai màu hồng xanh. Phần lông má quanh mắt được tỉa gọn hẳn.",
        tags: ["Partial", "Móng xanh", "Paws đệm phồng"],
      },
      {
        ...GALLERY_ROW2_META[1],
        alt: "Fursuit có sừng màu xanh da trời đội nón cói trong nhà kính",
        title: "Kemono Xanh Có Sừng",
        eyebrow: "[Head · Sừng dựng riêng]",
        description: "Lông xanh trời chuyển màu nhẹ từ đỉnh đầu xuống má. Trên đầu gắn cặp sừng đen nhỏ cùng mắt hổ phách.",
        tags: ["Head", "Sừng", "Chuyển sắc lông"],
      },
      {
        ...GALLERY_ROW2_META[2],
        alt: "Fursuit Shiba đen vàng tựa xe tay ga bên biển khoe Tail cuộn",
        title: "Shiba Head & Tail",
        eyebrow: "[Paws & Tails · Ngoài trời]",
        description: "Chiếc Tail đen trắng cuộn tròn giữ nếp sẵn, đeo dây đai ngang hông gọn và chắc khi di chuyển.",
        tags: ["Tail", "Head", "Mảng má urajiro"],
      },
      {
        ...GALLERY_ROW2_META[3],
        alt: "Sy Tray và fursuit mèo trắng ôm bóng rổ trước tủ đồ vàng",
        title: "Bộ Đôi Tủ Đồ Vàng",
        eyebrow: "[Partials · Kemono]",
        description: "Đặt cạnh nhau để xem hai kiểu khoang miệng mở khác nhau và phần chỉ khâu đệm Paws chịu lực khi cầm đồ.",
        tags: ["Partial", "Paws", "Lưỡi thè"],
      },
      {
        ...GALLERY_ROW2_META[4],
        alt: "Cận cảnh Paws xanh navy của Felix Algorithm đưa về phía ống kính",
        title: "Cận Cảnh Paws",
        eyebrow: "[Paws & Tails · Tiêu chuẩn 35 cm]",
        description: "Đôi Paws bốn ngón dài chuẩn 35 cm với móng vải trắng và ngón phối xanh đậm. Lòng bàn tay có giấu sẵn còi squeaker.",
        tags: ["Paws", "Móng vải", "Squeaker"],
      },
      {
        ...GALLERY_ROW2_META[5],
        alt: "Fursuit mèo trắng Minny Minnie cầm sách đọc dưới đèn lồng giấy",
        title: "Paws Minny Minnie",
        eyebrow: "[Head & Paws · Kemono]",
        description: "Đệm tay tuy phồng nhưng ngón vẫn gập cầm sách hay phụ kiện dễ dàng, đi cùng cặp mắt mèo viền đỏ.",
        tags: ["Head", "Paws", "Móng xanh"],
      },
      {
        ...GALLERY_ROW2_META[6],
        alt: "Fursuit cún vàng cam ngồi trên tường vẽ graffiti",
        title: "Partial Đường Phố",
        eyebrow: "[Partial · Cam Vàng]",
        description: "Paws lông xù cam rực gắn móng vải đen, chuyển tiếp sang phần cổ lông kem êm mượt.",
        tags: ["Partial", "Paws", "Móng đen"],
      },
      {
        ...GALLERY_ROW2_META[7],
        alt: "Fursuit có sừng nâu trắng ngồi trên cốp xe cổ Datsun",
        title: "Canine Có Sừng",
        eyebrow: "[Mini partial · Mắt hai màu]",
        description: "Đôi mắt hai màu vàng xanh dưới cặp sừng đen và một bên tai rủ lệch. Bộ đi kèm Paws trắng có móng.",
        tags: ["Mini partial", "Sừng", "Mắt hai màu"],
      },
    ],
    galleryEmptyFullsuit: {
      title: "Đặt làm Half Body & Fullsuit",
      desc: "Mỗi bộ Half Body hay Fullsuit đều được cắt rập riêng theo ref sheet và Duct Tape Dummy của bạn. Góc ảnh hiện mới trưng bày các mẫu Head, Partial và Paws đã làm xong, nên bạn kéo xuống xem chi tiết gói hoặc nhắn hỏi báo giá nhé.",
      ctaSpecs: "Xem chi tiết Fullsuit",
      ctaQuote: "Hỏi giá Fullsuit",
      ctaShowAll: "Xem tất cả ảnh",
    },
    lightboxCta: "Hỏi mẫu tương tự",
    lightboxCloseAria: "Đóng xem ảnh lớn",
    lightboxPrevAria: "Ảnh trước",
    lightboxNextAria: "Ảnh tiếp theo",
    offersEyebrow: "[Các gói đặt làm]",
    offersTitle: "Làm riêng theo OC của bạn",
    offersDesc:
      "Bạn có thể đặt lẻ một chiếc Head, hoặc đặt trọn bộ cùng Paws, Feet, Tail và Body cắt từ chung một lô lông cho đồng màu.",
    offer1Tag: "[Gói 01]",
    offer1Alt: "Custom Fursuit Head",
    offer1Title: "Custom Fursuit Head",
    offer1Desc:
      "Chỉ riêng phần Head, dựng trên base cứng kèm mõm mềm cử động thoải mái, đã gồm sẵn 2 màu lông cơ bản.",
    offer1Bullets: [
      "Base cứng kết hợp mõm mềm dễ cử động (có tùy chọn Full TPU in 3D toàn đầu)",
      "Lót kín bên trong Head và cổ, kèm sẵn lưỡi tháo rời và mí dán Velcro",
      "Bao gồm 2 màu vải lông Châu Á tiêu chuẩn (thêm màu tính phụ phí riêng)",
      "Tùy chọn thêm: mí nam châm, quạt tản nhiệt hoặc chỏm tóc rời tháo lắp",
    ],
    offer1Sub: "2 màu cơ bản · base cứng + mõm mềm",
    offer1Cta: "Hỏi báo giá Head",
    offer2Tag: "[Gói 02]",
    offer2Alt: "Half Body & Fullsuit",
    offer2Title: "Half Body & Fullsuit",
    offer2Desc:
      "Trọn bộ nhân vật kết hợp Head, Paws, Feet, Tail với Half Body hoặc Fullsuit cắt từ cùng một lô lông.",
    offer2Bullets: [
      "Gồm Head, Paws, Feet, Tail và Half Body hoặc Fullsuit với 2 màu lông cơ bản",
      "Paws: dài chuẩn 35 cm, có móng vải, còi squeaker và lót kín bên trong",
      "Tail: dài chuẩn 70 cm, nâng cấp được khung bẻ dáng hoặc hyper motion (đuôi nảy)",
      "Feet: Outdoor feet ngón nhựa PETG (in 3D chịu lực ngoài trời), lõi xốp, dép 1 size",
    ],
    offer2Sub: "2 màu cơ bản · cắt cùng một lô lông",
    offer2Cta: "Hỏi báo giá Fullsuit",
    furNotice:
      "Xưởng mình dùng vải lông Châu Á làm tiêu chuẩn. Lông Mofu, Cream, Limey và các dòng lông nhập khác sẽ tính thêm phí vật liệu.",
    packagesEyebrow: "[Chi tiết 6 hạng mục đặt làm]",
    packageCta: "Nhận báo giá",
    packages: [
      {
        ...PACKAGES_META[0],
        title: "HEAD",
        rows: [
          { label: "Lông · Khung", value: "2 MÀU · CỨNG+MỀM" },
          { label: "Full TPU (in 3D toàn đầu)", value: "PHỤ PHÍ RIÊNG" },
          { label: "Mí nam châm", value: "TÙY CHỌN" },
          { label: "Thêm màu lông", value: "PHỤ PHÍ RIÊNG" },
          { label: "Quạt tản nhiệt", value: "TÙY CHỌN" },
          { label: "Tóc rời tháo lắp", value: "TÙY CHỌN" },
        ],
        note: "Đã có sẵn lót Head/cổ, lưỡi tháo rời và mí dán Velcro.",
      },
      {
        ...PACKAGES_META[1],
        title: "PAWS",
        rows: [
          { label: "Lông · Chiều dài", value: "1 MÀU · 35 CM" },
          { label: "Tiêu chuẩn", value: "MÓNG + SQUEAKER" },
          { label: "Thiết kế 5 ngón", value: "TÙY CHỌN" },
          { label: "Thêm màu lông", value: "PHỤ PHÍ RIÊNG" },
          { label: "Finger escape (khe luồn tay)", value: "TÙY CHỌN" },
        ],
        note: "Đã gồm móng vải, còi squeaker trong lòng tay và lót kín.",
      },
      {
        ...PACKAGES_META[2],
        title: "TAIL",
        rows: [
          { label: "Lông · Chiều dài", value: "1 MÀU · 70 CM" },
          { label: "Tail cá / rồng / dài", value: "THEO THIẾT KẾ" },
          { label: "Thêm màu lông", value: "PHỤ PHÍ RIÊNG" },
          { label: "Khung tạo dáng", value: "TÙY CHỌN" },
          { label: "Hyper motion (đuôi nảy)", value: "TÙY CHỌN" },
          { label: "Khóa kéo vệ sinh", value: "TÙY CHỌN" },
        ],
        note: "Đuôi dài hơn tính thêm phụ phí; Tail cá hay rồng báo giá theo ref.",
      },
      {
        ...PACKAGES_META[3],
        title: "FEET",
        rows: [
          { label: "Lông · Dép lót", value: "1 MÀU · ONE SIZE" },
          { label: "Thêm màu lông", value: "PHỤ PHÍ RIÊNG" },
          { label: "Indoor feet", value: "TÙY CHỌN" },
          { label: "Indoor / Outdoor swap", value: "TÙY CHỌN" },
        ],
        note: "Outdoor feet dùng ngón PETG cứng, móng vải, lõi xốp và lót kín.",
      },
      {
        ...PACKAGES_META[4],
        title: "HALF BODY",
        rows: [
          { label: "Màu lông cơ bản", value: "2 MÀU" },
          { label: "Hạng mục kèm theo", value: "HEAD · PAWS · FEET" },
          { label: "Body & Tail", value: "TAIL + HALF BODY" },
          { label: "Quà tặng kèm", value: "BỘ LÓT ĐỆM THÂN" },
        ],
        note: "Gồm Head, Paws, Feet, Tail, Half Body và tặng kèm bộ lót đệm thân.",
      },
      {
        ...PACKAGES_META[5],
        title: "FULLSUIT",
        rows: [
          { label: "Màu lông cơ bản", value: "2 MÀU" },
          { label: "Hạng mục kèm theo", value: "HEAD · PAWS · FEET" },
          { label: "Body & Tail", value: "TAIL + FULL BODY" },
          { label: "Quà tặng kèm", value: "BỘ LÓT ĐỆM THÂN" },
        ],
        note: "Gồm Head, Paws, Feet, Tail, Fullsuit và tặng kèm bộ lót đệm thân.",
      },
    ],
    extraOptionsEyebrow: "[Tùy chọn thêm & Phụ kiện]",
    extraOptionsTag: "[Mở rộng]",
    extraOptions: [
      { label: "Tóc rời tháo lắp", value: "Tùy chọn thêm · báo giá theo mẫu" },
      {
        label: "Phụ kiện (sừng, cánh, kính...)",
        value: "Xem danh mục phụ kiện lẻ",
        href: "/accessories",
      },
      {
        label: "Nâng cấp dòng lông nhập",
        value: "Lông Mofu, Cream, Limey và lông nhập khẩu khác",
      },
    ],
    freeGiftsEyebrow: "[Quà tặng kèm đơn]",
    freeGiftsTag: "[Mọi đơn Head & Suit]",
    freeGifts: [
      "Lưỡi tháo rời gắn Velcro",
      "Lược chải lông chuyên dụng",
      "Bộ kẹp giữ tóc",
      "Quà nhỏ ngẫu nhiên từ xưởng",
    ],
    bonusTag: "[Tặng thêm cho Half Body & Fullsuit]",
    bonusText:
      "Khi đặt Half Body hoặc Fullsuit, bạn được tặng thêm một bộ lót đệm thân có dây đai chỉnh kích cỡ.",
    timelineEyebrow: "[Tiến độ thực hiện]",
    timelineTitle: ["Làm tới đâu,", "gửi ảnh tới đó"],
    timelineDesc:
      "Trước khi cắt lông hay khâu cố định, mình đều gửi ảnh WIP để bạn kiểm tra trước rồi mới chuyển sang bước tiếp theo.",
    timelineTermsCta: "Xem điều khoản",
    faqEyebrow: "[Giải đáp nhanh]",
    faqTitle: ["Thắc mắc", "thường gặp"],
    faqDesc:
      "Tổng hợp những điều các bạn thường hỏi trước khi đặt slot. Nếu còn thắc mắc riêng, bạn cứ nhắn trực tiếp cho xưởng mình nhé.",
    faqAskCta: "Nhắn hỏi xưởng",
    faqTermsCta: "Đọc điều khoản",
    contactEyebrow: "[Liên hệ]",
    contactTitle: ["Muốn đặt", "fursuit mới?"],
    contactIntro:
      "Gửi giúp mình ref sheet nhân vật cùng các món bạn muốn đặt. Hỏi báo giá miễn phí hoàn toàn, và mình thường rep trong vòng 24 giờ.",
    quoteInfoPills: [
      { label: "Báo giá miễn phí", detail: "Hỏi trước chưa cần cọc" },
      {
        label: "Yếu tố tính giá",
        detail: "Loài, số màu, loại lông & phụ kiện",
      },
      {
        label: "Xưởng tại Việt Nam",
        detail: "Ship toàn quốc & quốc tế",
      },
      {
        label: "Thời gian làm",
        detail: "Báo cụ thể theo mẫu & hàng chờ",
      },
    ],
    channels: SHARED_CHANNELS,
    statusChecking: "[Đang kiểm tra slot...]",
    statusBadgeOpen: "[Trạng thái: Đang mở slot]",
    statusBadgeClosed: "[Trạng thái: Tạm đóng slot]",
    fieldName: "[Tên hoặc nickname *]",
    placeholderName: "Tên của bạn hoặc @handle",
    fieldSpecies: "[Loài nhân vật *]",
    placeholderSpecies: "Sói, Mèo Kemono, Shiba...",
    fieldEmail: "[Email *]",
    placeholderEmail: "you@email.com",
    fieldPhone: "[Số điện thoại (không bắt buộc)]",
    placeholderPhone: "+84 9xx xxx xxx",
    fieldFacebook: "[MXH / DM liên hệ (FB, IG, Discord...) (không bắt buộc)]",
    placeholderFacebook: "Tên tài khoản hoặc link trang cá nhân",
    fieldRefLink: "[Link ref sheet *]",
    placeholderRefLink:
      "https://drive.google.com/... (Google Drive, Toyhouse, Imgur...)",
    fieldType: "[Loại đơn muốn đặt *]",
    commissionGroups: [
      {
        colsClass: COMMISSION_COLS[0],
        options: [
          { value: "Head", label: "Head" },
          { value: "Paws", label: "Paws" },
          { value: "Tail", label: "Tail" },
          { value: "Feet", label: "Feet" },
        ],
      },
      {
        colsClass: COMMISSION_COLS[1],
        options: [
          {
            value: "Mini partial",
            label: "Mini partial",
            note: "(Head, Paws, Tail)",
          },
          {
            value: "Partial",
            label: "Partial",
            note: "(Head, Paws, Tail, Feet)",
          },
        ],
      },
      {
        colsClass: COMMISSION_COLS[2],
        options: [
          {
            value: "Only body",
            label: "Only body",
            note: "Cần DTD sau khi chốt slot",
          },
          {
            value: "Half-body",
            label: "Half-body",
            note: "Cần DTD sau khi chốt slot",
          },
          {
            value: "Fullsuit",
            label: "Fullsuit",
            note: "Cần DTD sau khi chốt slot",
          },
        ],
      },
    ],
    dtdCalloutTitle: "Lưu ý về Duct Tape Dummy (DTD)",
    dtdCalloutBody:
      "DTD là phom người quấn từ áo cũ và băng keo để mình lên rập body vừa đúng dáng bạn. Lúc hỏi báo giá thì chưa cần làm trước, chốt slot xong mình mới nhờ bạn gửi sau.",
    fieldNotes: "[Ghi chú đơn *]",
    placeholderNotes:
      "Ghi giúp mình chi tiết mảng màu, loại lông muốn dùng (Châu Á hay Mofu, Cream, Limey), hoặc các món thêm như mí nam châm, quạt, tóc rời...",
    termsNoticeBefore:
      "Khi gửi yêu cầu báo giá, bạn xác nhận đã đọc và đồng ý với ",
    termsNoticeLink: "Điều khoản & Chính sách Commission",
    recaptchaNoticeBefore: "Bảo vệ bởi reCAPTCHA v3 (",
    recaptchaPrivacyLabel: "Quyền riêng tư",
    recaptchaNoticeMid: " & ",
    recaptchaTermsLabel: "Điều khoản Google",
    recaptchaNoticeAfter: ").",
    recaptchaVerifying: "Đang xác thực reCAPTCHA…",
    submitIdle: "Gửi yêu cầu báo giá",
    submitWaitlist: "Gửi hẹn báo giá đợt sau",
    submitSending: "Đang gửi…",
    submitSent: "Đã gửi yêu cầu báo giá!",
    submitAnother: "Gửi thêm yêu cầu khác",
    confirmTitle: "Đã gửi yêu cầu báo giá!",
    confirmWaitlistTitle: "Đã lưu hẹn báo giá đợt sau!",
    confirmDesc:
      "Mình sẽ phản hồi trong vòng 24 giờ qua email FluffNii.furries@gmail.com. Nếu chưa thấy thư tới, bạn kiểm tra thử mục Thư rác (Spam) hoặc Quảng cáo nhé.",
    confirmWaitlistDesc:
      "Hiện xưởng đang tạm ngưng nhận đơn mới nên thông tin OC của bạn đã được lưu lại cho đợt mở slot tới. Mình vẫn rep trong 24 giờ qua FluffNii.furries@gmail.com.",
    confirmLabelName: "Tên",
    confirmLabelSpecies: "Loài",
    confirmLabelEmail: "Email phản hồi",
    confirmLabelParts: "Hạng mục đã chọn",
    errorFallback:
      "Chưa gửi được yêu cầu. Bạn copy nội dung bên dưới rồi nhắn thẳng tới FluffNii.furries@gmail.com giúp mình nhé.",
    errorNetwork:
      "Mạng chập chờn hoặc hết thời gian chờ. Bạn copy phần chữ bên dưới kẻo mất nội dung rồi gửi thẳng cho mình nhé.",
    contactErrors: {
      PAYLOAD_TOO_LARGE:
        "Phần ghi chú hơi dài quá giới hạn. Bạn rút gọn bớt một chút rồi bấm gửi lại nhé.",
      INVALID_JSON:
        "Biểu mẫu bị lỗi đọc dữ liệu. Bạn tải lại trang rồi thử gửi lại giúp mình.",
      TOO_FAST:
        "Bạn bấm gửi hơi nhanh một chút. Đợi khoảng hai giây rồi bấm gửi lại nhé.",
      MISSING_FIELDS:
        "Bạn điền giúp mình đủ Tên/nickname, Loài nhân vật, Email, Link ref sheet và Ghi chú đơn nhé.",
      INVALID_EMAIL:
        "Bạn nhập lại email đúng định dạng để mình có địa chỉ gửi báo giá lại nhé.",
      MISSING_TYPES:
        "Bạn chọn ít nhất một hạng mục ở phần Loại đơn muốn đặt giúp mình nhé.",
      RECAPTCHA_FAILED:
        "Xác thực reCAPTCHA chưa thành công. Bạn tải lại trang rồi bấm gửi lại, hoặc copy nội dung bên dưới gửi thẳng qua email nhé.",
      SERVICE_UNAVAILABLE:
        "Hệ thống gửi mail tự động đang tạm nghỉ. Bạn copy nội dung bên dưới rồi gửi qua email hoặc Instagram cho mình nhé.",
      SEND_FAILED:
        "Hiện chưa gửi được yêu cầu qua web. Bạn thử lại sau vài phút hoặc copy nội dung bên dưới gửi email hay Instagram cho mình.",
    },
    copyInquiryCta: "Copy nội dung đã điền",
    copyInquiryDone: "Đã copy nội dung",
    copyInquiryFail: "Trình duyệt chặn copy tự động. Bạn bôi đen và copy bên dưới:",
    errorDirectNote: "Hoặc nhắn trực tiếp qua:",
    errorMailSubject: "Yêu cầu báo giá FluffNii",
  },
};
