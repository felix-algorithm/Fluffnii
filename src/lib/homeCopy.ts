import type { Lang } from "@/components/LanguageProvider";

export type ContactErrorCode =
  | "PAYLOAD_TOO_LARGE"
  | "INVALID_JSON"
  | "TOO_FAST"
  | "MISSING_FIELDS"
  | "INVALID_EMAIL"
  | "MISSING_TYPES"
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

export const HOME_COPY: Record<Lang, HomeLocaleCopy> = {
  en: {
    heroStatusChecking: "Checking slot status...",
    heroStatusOpen: "Commissions open",
    heroStatusClosed: "Commissions closed",
    heroEyebrow: "Custom Fursuit Workshop",
    heroTitle: ["From sketch", "to fursuit"],
    heroDesc:
      "We build custom fursuits straight from your ref sheet, with room to breathe and move.",
    heroContactCta: "Contact",
    heroProjectsCta: "View fursuits",
    studioEyebrow: "[The studio]",
    phraseText:
      "At FluffNii, we build fursuits you can wear all day on the con floor. Each head starts with plenty of airflow and clear sightlines, then we hand-pattern every marking and shave the cheeks smooth.",
    phraseHighlights1:
      "all day, hand-pattern every marking, shave the cheeks",
    phraseHighlights2: "con floor, airflow and clear sightlines",
    formulaEyebrow: "[The formula]",
    formulaAlt: "Finished FluffNii Kemono fursuit head showing smooth fur shaving",
    formulaTitleLines: ["Character Design +", "Fursuit Craft ="],
    formulaLead:
      "A suit that still looks like your OC the moment you put it on, with room inside to breathe.",
    formulaBodyBefore:
      "We pattern straight off your ref sheet so every spot, ear notch, and color break lands in place. Most of our time goes into even shaving, ",
    formulaBodyStrong: "solid seams",
    formulaBodyAfter:
      ", and carving a head you can wear for hours at a con without feeling boxed in.",
    statBuilt: "(Fursuits & parts built)",
    statSpecies: "(Species & styles)",
    statHandmade: "(Made by hand)",
    pillarsEyebrow: "[3 things we focus on]",
    pillars: [
      {
        num: "(001)",
        title: "SCULPT & PROPORTION",
        desc: "We carve foam and 3D bases around balanced cheeks and wide forward sightlines so the ears sit right from every angle.",
      },
      {
        num: "(002)",
        title: "IMPORTED FAUX FUR",
        desc: "We tape dense faux fur straight onto the shell, sew tight seams, and shave the pile down so markings read cleanly.",
      },
      {
        num: "(003)",
        title: "COMFORT & LINING",
        desc: "Sweat-wicking liner with hidden vents keeps the inside cool, plus a Velcro tongue and washable padding (magnetic add-ons optional).",
      },
    ],
    whoEyebrow: "[Who it's for]",
    whoTitle: ["Every species,", "built your way"],
    whoDesc:
      "Bears, lions, fox-cats, dogs, shibas. Every ref sheet carries its own proportions, so we shape each base to match rather than forcing one template.",
    fanCards: [
      {
        num: "(001)",
        title: "BEAR",
        desc: "Round ears and full cheeks around a soft, wide muzzle.",
        img: "/images/species-bear.webp",
        objectPosition: "50% 35%",
        bg: "#f5f8fc",
        dark: false,
        rot: -9,
      },
      {
        num: "(002)",
        title: "LION",
        desc: "Layered mane tufts over a strong brow ridge that holds up from the side.",
        img: "/images/species-lion.webp",
        objectPosition: "50% 28%",
        bg: "#ffffff",
        dark: false,
        rot: -4.5,
      },
      {
        num: "(003)",
        title: "FOX-CAT",
        desc: "Tall fox ears on a short cat muzzle for a rounded Kemono profile.",
        img: "/images/species-foxcat.webp",
        objectPosition: "50% 20%",
        bg: "#f5f8fc",
        dark: false,
        rot: 0,
      },
      {
        num: "(004)",
        title: "DOG",
        desc: "Perky ears and an upturned nose matched with a bouncy tail.",
        img: "/images/species-dog.webp",
        objectPosition: "50% 38%",
        bg: "#ffffff",
        dark: false,
        rot: 4.5,
      },
      {
        num: "(005)",
        title: "SHIBA INU",
        desc: "Sharp urajiro cheek markings under pointed ears, plus a curled tail that holds its arc.",
        img: "/images/species-shiba.webp",
        objectPosition: "50% 15%",
        bg: "#1e3557",
        dark: true,
        rot: 9,
      },
    ],
    resultEyebrow: "[The result]",
    resultTitle: ["From 2D ref sheet", "to 3D reality"],
    resultDesc:
      "Turning flat character art into a wearable head comes down to base volume, shave depth, and smart seam placement.",
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
        desc: "Every stripe, spot, and ear notch from your ref sheet gets taped right onto the base so nothing drifts.",
      },
      {
        num: "(002)",
        title: "KEMONO CHARM",
        desc: "Full rounded cheeks and deep-set 3D follow-me eyes keep their expression whether you face the camera or turn sideways.",
      },
      {
        num: "(003)",
        title: "CUSTOM EXPRESSIONS",
        desc: "Swap moods easily with our standard Velcro tongues and eyelids, posable ears, or optional magnetic upgrades.",
      },
      {
        num: "(004)",
        title: "MADE TO MOVE",
        desc: "Wide forward vision and a hidden back zipper make suiting easy, while the cooling liner holds up through long con days.",
      },
    ],
    methodEyebrow: "[How]",
    methodTitle: "In three stages",
    methodDesc:
      "Every build moves through these three shop stages. We send WIP photos at each check-in before moving on.",
    methodSteps: [
      {
        tag: "[Step 01]",
        counter: "(001) / (003)",
        title: "SCULPTED BASE & EXPRESSIVE 3D EYES",
        desc: "We shape a balanced base around wide follow-me eyes, open mouth airflow, and clear forward vision so you are not walking blind at cons.",
        pills: ["Symmetry", "Vision", "Airflow"],
        img: "/images/method-01.webp",
        bg: "#fff0a6",
        dark: false,
        top: 108,
      },
      {
        tag: "[Step 02]",
        counter: "(002) / (003)",
        title: "HAND-PATTERNED FUR & SMOOTH SHAVING",
        desc: "Dense faux fur is taped straight onto the head, sewn tight, and shaved gradually down to bring out cheek curves and markings.",
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
        desc: "We finish the inside with sweat-wicking fabric, stuff the pawpads full, and tune the padding to your head measurements.",
        pills: ["Breathable", "Fit", "Durable"],
        img: "/images/method-03.webp",
        bg: "#1e3557",
        dark: true,
        top: 164,
      },
    ],
    projectsEyebrow: "[Projects]",
    projectsTitle: ["Selected", "projects"],
    prevProjectAria: "Previous project",
    nextProjectAria: "Next project",
    projectDotAria: "Go to project",
    projects: [
      {
        client: "SY TRAY",
        year: "2026",
        category: "Mini partial",
        summary:
          "Ash-grey and cream Kemono head with bright orange cheek tufts. Oversized amber eyes and clawed four-finger paws round out the build.",
        img: "/images/project-01.webp",
        objectPosition: "50% 35%",
        tags: ["Mini partial", "Kemono", "Shaved fur", "Clawed paws"],
        partValues: ["Mini partial"],
        inspectLabel: "Inspect",
        review:
          "The shave work is super smooth and even. Every angle on the face reads cleanly, and the fur still feels soft to touch.",
        author: "Sy tray",
        role: "Suit Owner",
      },
      {
        client: "MINNY MINNIE",
        year: "2026",
        category: "Partial",
        summary:
          "Snow-white Kemono partial with red-lined cat eyes. A blue forehead diamond and puffy sky-blue paw pads finish the look.",
        img: "/images/project-02.webp",
        objectPosition: "50% 45%",
        tags: ["Partial", "Kemono cat", "Padded paws"],
        partValues: ["Partial"],
        inspectLabel: "Inspect",
      },
      {
        client: "FELIX ALGORITHM",
        year: "2026",
        category: "Partial",
        summary:
          "Teal, navy, and cream canine build with a winking left eye and yellow ear linings, matched with navy-tipped paws.",
        img: "/images/project-03.webp",
        objectPosition: "50% 50%",
        tags: ["Partial", "3D TPU base", "Multi-color seams"],
        partValues: ["Partial"],
        inspectLabel: "Inspect",
        review:
          "Thick, sturdy 3D-printed TPU base made specifically for my OC. All the tricky markings lined up properly, and both the hand and machine stitching hold up great.",
        author: "Felix",
        role: "Suit Owner",
      },
      {
        client: "HUNTER KNIGHT",
        year: "2026",
        category: "Partial",
        summary:
          "Silver-white build with thick layered cheek fluff. A red-and-black hair streak sits across the top, paired with pale blue paw pads.",
        img: "/images/project-04.webp",
        objectPosition: "50% 50%",
        tags: ["Partial", "Layered fluff", "Blue paw pads"],
        partValues: ["Partial"],
        inspectLabel: "Inspect",
      },
      {
        client: "UMBRÉON RETSQUÔT",
        year: "2026",
        category: "Mini partial",
        summary:
          "Black, white, and gold canine suit with blue eyes and a removable blep tongue. Finished with a braided ear cord and gold bell.",
        img: "/images/project-05.webp",
        objectPosition: "50% 20%",
        tags: ["Mini partial", "3D TPU base", "Removable tongue"],
        partValues: ["Mini partial"],
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
      "Finished heads, partials, and paws straight from the workbench. Filter by type, pause the scroll, or tap any photo to zoom in.",
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
    galleryWords: [
      "HEADS",
      "PARTIALS",
      "FULLSUITS",
      "PAWS & TAILS",
      "COMMISSIONS",
    ],
    galleryRow1: [
      {
        id: "g-r1-01",
        src: "/images/gallery-r1-01.webp",
        alt: "Red and orange fox fursuit partial holding a small white cake at dusk",
        title: "Red & Orange Fox",
        eyebrow: "[Partial · Kemono]",
        description: "Smooth orange-to-cream cheek shave matched with red-cuffed four-finger paws and black fabric claws.",
        tags: ["Partial", "Follow-me eyes", "Clawed paws"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "heads"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
      {
        id: "g-r1-02",
        src: "/images/gallery-r1-02.webp",
        alt: "Sy Tray and Minny Minnie fursuits sitting at classroom desks",
        title: "Sy Tray & Minny Minnie",
        eyebrow: "[Partials · Studio Shoot]",
        description: "Two Kemono partials side by side, showing how different head silhouettes, paw styles, and curled tails sit together.",
        tags: ["Partial", "Paws & Tail", "Kemono"],
        partValues: ["Partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r1-03",
        src: "/images/gallery-r1-03.webp",
        alt: "Bright orange canine fursuit partial outdoors showing soft paw pads",
        title: "Orange Canine Build",
        eyebrow: "[Mini partial · Canine]",
        description: "Bright orange and cream canine head with metal ear rings, deep brown paw pads, and heavy eyeliner.",
        tags: ["Mini partial", "Paws", "Ear accessories"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
      {
        id: "g-r1-04",
        src: "/images/gallery-r1-04.webp",
        alt: "Felix Algorithm blue fursuit head wearing white round glasses on the beach",
        title: "Felix Algorithm",
        eyebrow: "[Head · Glasses Friendly]",
        description: "Teal and cream Kemono head with extra bridge space carved behind the eyes so round glasses sit without crushing the fur.",
        tags: ["Head", "Glasses fit", "Shaved muzzle"],
        partValues: ["Head"],
        filterCategories: ["heads"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r1-05",
        src: "/images/gallery-r1-05.webp",
        alt: "Sy Tray silver and orange fursuit waving beside yellow lockers",
        title: "Sy Tray",
        eyebrow: "[Mini partial · Kemono]",
        description: "Layered grey bangs over bright orange inner ears, finished with four-finger paws and orange pads.",
        tags: ["Mini partial", "Paws", "Layered hair"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[246px] sm:w-[300px]",
        objectPosition: "center top",
      },
      {
        id: "g-r1-06",
        src: "/images/gallery-r1-06.webp",
        alt: "Black and yellow shiba fursuit head with gold ear cuff and bell",
        title: "Umbréon Retsquôt",
        eyebrow: "[Head · 3D TPU Base]",
        description: "Shiba Inu head built on a 3D TPU shell. Keeps sharp urajiro cheek markings alongside a braided ear cord and removable tongue.",
        tags: ["Head", "3D TPU base", "Urajiro markings"],
        partValues: ["Head"],
        filterCategories: ["heads"],
        widthClass: "w-[295px] sm:w-[360px]",
      },
      {
        id: "g-r1-07",
        src: "/images/gallery-r1-07.webp",
        alt: "Felix Algorithm blue fursuit waving both paws on a garden lawn",
        title: "Felix Algorithm",
        eyebrow: "[Partial · Garden Pose]",
        description: "Standing shot showing symmetrical navy-tipped paws with green pads and how the tail balances at the waist.",
        tags: ["Mini partial", "Paws", "Follow-me eyes"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
      {
        id: "g-r1-08",
        src: "/images/gallery-r1-08.webp",
        alt: "White cat fursuit with red hairclip leaning by a blue street rail",
        title: "White Cat Street Build",
        eyebrow: "[Mini partial · Feline]",
        description: "Plush white cheeks topped with a red-and-black hair streak and sky-blue paw pads.",
        tags: ["Mini partial", "Feline", "Hair accent"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "heads"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
    ],
    galleryRow2: [
      {
        id: "g-r2-01",
        src: "/images/gallery-r2-01.webp",
        alt: "White cat fursuit with blue paw pads perched on a rooftop ledge",
        title: "Rooftop Cat Partial",
        eyebrow: "[Partial · High Contrast]",
        description: "Up-close view of the stuffed blue fabric claws and two-tone pink-and-blue pads next to trimmed cheek fur.",
        tags: ["Partial", "Blue claws", "Padded paws"],
        partValues: ["Partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r2-02",
        src: "/images/gallery-r2-02.webp",
        alt: "Sky-blue horned goat fursuit wearing a straw hat in a greenhouse",
        title: "Sky-Blue Horned Kemono",
        eyebrow: "[Head · Custom Horns]",
        description: "Pale sky-blue gradient fur paired with lightweight black horns and amber follow-me eyes.",
        tags: ["Head", "Horns", "Color gradient"],
        partValues: ["Head"],
        filterCategories: ["heads", "partials"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r2-03",
        src: "/images/gallery-r2-03.webp",
        alt: "Black and yellow shiba fursuit leaning on a scooter with curled tail",
        title: "Shiba Head & Tail",
        eyebrow: "[Paws & Tails · Coastal]",
        description: "Tightly curled black-and-white tail anchored at the hip so it keeps its curve while moving.",
        tags: ["Tail", "Head", "Urajiro markings"],
        partValues: ["Head", "Tail"],
        filterCategories: ["paws", "partials"],
        widthClass: "w-[246px] sm:w-[300px]",
        objectPosition: "center top",
      },
      {
        id: "g-r2-04",
        src: "/images/gallery-r2-04.webp",
        alt: "Sy Tray and white cat fursuit holding a basketball by yellow lockers",
        title: "Locker Room Duo",
        eyebrow: "[Partials · Kemono]",
        description: "Side-by-side look at two open-mouth sculpts and reinforced pawpad stitching under prop grip.",
        tags: ["Partial", "Paws", "Blep tongue"],
        partValues: ["Partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[295px] sm:w-[360px]",
      },
      {
        id: "g-r2-05",
        src: "/images/gallery-r2-05.webp",
        alt: "Felix Algorithm reaching a blue paw toward the camera outside",
        title: "Custom Paws Detail",
        eyebrow: "[Paws & Tails · 35 cm Standard]",
        description: "Four-finger 35 cm paws with stuffed white claws and navy accent digits. A squeaker sits tucked inside the palm.",
        tags: ["Paws", "Fabric claws", "Squeaker"],
        partValues: ["Paws"],
        filterCategories: ["paws", "partials"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r2-06",
        src: "/images/gallery-r2-06.webp",
        alt: "Minny Minnie white cat fursuit reading a book under paper lanterns",
        title: "Minny Minnie Paws",
        eyebrow: "[Head & Paws · Kemono]",
        description: "Puffy pads that still bend easily to hold props, matched with red-lined cat eyes and a forehead diamond.",
        tags: ["Head", "Paws", "Blue claws"],
        partValues: ["Head", "Paws"],
        filterCategories: ["paws", "heads"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
      {
        id: "g-r2-07",
        src: "/images/gallery-r2-07.webp",
        alt: "Orange canine fursuit crouching on a painted concrete wall",
        title: "Street Canine Partial",
        eyebrow: "[Partial · Orange & Cream]",
        description: "Long-pile orange paws with black fabric claws that blend gradually into a cream neck.",
        tags: ["Partial", "Paws", "Black claws"],
        partValues: ["Partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r2-08",
        src: "/images/gallery-r2-08.webp",
        alt: "Brown-and-white horned fursuit sitting on the trunk of a vintage Datsun",
        title: "Horned Canine Partial",
        eyebrow: "[Mini partial · Heterochromia]",
        description: "Gold-and-blue follow-me eyes with one floppy ear and black horns. Paired with clawed white paws.",
        tags: ["Mini partial", "Horns", "Heterochromia"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "heads"],
        widthClass: "w-[246px] sm:w-[300px]",
        objectPosition: "center top",
      },
    ],
    galleryEmptyFullsuit: {
      title: "Custom Half Body & Fullsuit builds",
      desc: "Every Half Body and Fullsuit is patterned from your ref sheet and Duct Tape Dummy. This wall currently shows completed Heads, Partials, and Paws & Tails. Check the build specs below or ask for a Fullsuit quote.",
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
      "Order a standalone Head, or pair it with matching Paws, Feet, Tail, and a bodysuit cut from the same fur batch.",
    offer1Tag: "[Offer 01]",
    offer1Alt: "Custom Fursuit Head",
    offer1Title: "Custom Fursuit Head",
    offer1Desc:
      "Just the head, built on a rigid shell with a soft flexible muzzle. Two base fur colors are included.",
    offer1Bullets: [
      "Rigid head base with a soft muzzle (Full TPU flexible 3D-printed shell optional)",
      "Full head and neck lining with removable Velcro tongue and eyelids",
      "Includes 2 base colors in standard Asian faux fur (extra colors quoted separately)",
      "Optional add-ons: magnetic eyelids, built-in fan, or removable hair",
    ],
    offer1Sub: "2 base colors · rigid + soft muzzle",
    offer1Cta: "Request Head quote",
    offer2Tag: "[Offer 02]",
    offer2Alt: "Half Body & Full Suit",
    offer2Title: "Half Body & Full Suit",
    offer2Desc:
      "Full character suites pairing Head, Paws, Feet, and Tail with a Half Body or Fullsuit cut from one matched fur lot.",
    offer2Bullets: [
      "Includes Head, Paws, Feet, Tail, and Half or Full Body with 2 base colors",
      "Paws: 35 cm standard length with fabric claws, squeaker, and full inner lining",
      "Tail: 70 cm standard length; optional poseable frame or spring hyper-motion",
      "Feet: outdoor PETG (rigid 3D-printed) toes, foam core, one-size inner slipper",
    ],
    offer2Sub: "2 base colors · matched fur lot",
    offer2Cta: "Request Suit quote",
    furNotice:
      "Standard builds use Asian faux fur. Mofu, Cream, Limey, and imported regional furs carry an extra material fee.",
    packagesEyebrow: "[Commission options · 6 parts & suites]",
    packageCta: "Request quote",
    packages: [
      {
        title: "HEAD",
        optionValue: "Head",
        rows: [
          { label: "Base fur · Frame", value: "2 COL · RIGID+SOFT" },
          { label: "Full TPU (flex 3D shell)", value: "EXTRA FEE" },
          { label: "Magnetic eyelids", value: "ADD-ON" },
          { label: "Extra fur color", value: "EXTRA FEE" },
          { label: "Built-in fan", value: "ADD-ON" },
          { label: "Removable hair", value: "ADD-ON" },
        ],
        note: "Comes with head & neck liner, Velcro tongue, and Velcro eyelids.",
        bg: "#fff0a6",
        img: "/images/offer-01.webp",
        imgPos: "50% 35%",
        rot: -4,
      },
      {
        title: "PAWS",
        optionValue: "Paws",
        rows: [
          { label: "Base fur · Length", value: "1 COL · 35 CM" },
          { label: "Standard build", value: "CLAWS + SQUEAKER" },
          { label: "5-finger design", value: "ADD-ON" },
          { label: "Extra fur color", value: "EXTRA FEE" },
          { label: "Finger escape (wrist slit)", value: "ADD-ON" },
        ],
        note: "Includes fabric claws, palm squeaker, and full lining inside.",
        bg: "#dce8f5",
        img: "/images/gallery-r2-05.webp",
        imgPos: "50% 50%",
        rot: 3,
      },
      {
        title: "TAIL",
        optionValue: "Tail",
        rows: [
          { label: "Base fur · Length", value: "1 COL · 70 CM" },
          { label: "Fish / dragon / long", value: "BY DESIGN" },
          { label: "Extra fur color", value: "EXTRA FEE" },
          { label: "Poseable frame", value: "ADD-ON" },
          { label: "Hyper motion (bouncy core)", value: "ADD-ON" },
          { label: "Cleaning zipper", value: "ADD-ON" },
        ],
        note: "Longer tails add extra fur cost; fish or dragon tails are quoted by ref.",
        bg: "#f5f8fc",
        img: "/images/polaroid-03.webp",
        imgPos: "50% 35%",
        rot: -3,
      },
      {
        title: "FEET",
        optionValue: "Feet",
        rows: [
          { label: "Base · Inner slipper", value: "1 COL · ONE SIZE" },
          { label: "Extra fur color", value: "EXTRA FEE" },
          { label: "Indoor feet style", value: "ADD-ON" },
          { label: "Indoor/Outdoor swap", value: "ADD-ON" },
        ],
        note: "Outdoor build with rigid PETG toes, fabric claws, foam core, and full lining.",
        bg: "#f5f8fc",
        img: "/images/gallery-r2-07.webp",
        imgPos: "50% 60%",
        rot: 3,
      },
      {
        title: "HALF BODY",
        optionValue: "Half-body",
        rows: [
          { label: "Base fur colors", value: "2 COLORS" },
          { label: "Included parts", value: "HEAD · PAWS · FEET" },
          { label: "Body & tail", value: "TAIL + HALF BODY" },
          { label: "Free bonus gift", value: "TORSO LINER SET" },
        ],
        note: "Includes Head, Paws, Feet, Tail, Half Body, and adjustable padding liner.",
        bg: "#dce8f5",
        img: "/images/gallery-r2-08.webp",
        imgPos: "50% 25%",
        rot: -3,
      },
      {
        title: "FULL SUIT",
        optionValue: "Fullsuit",
        rows: [
          { label: "Base fur colors", value: "2 COLORS" },
          { label: "Included parts", value: "HEAD · PAWS · FEET" },
          { label: "Body & tail", value: "TAIL + FULL BODY" },
          { label: "Free bonus gift", value: "TORSO LINER SET" },
        ],
        note: "Includes Head, Paws, Feet, Tail, Fullsuit, and adjustable padding liner.",
        bg: "#fff0a6",
        img: "/images/project-04.webp",
        imgPos: "50% 28%",
        rot: 4,
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
      "Half Body and Full Suit orders also include a free torso padding liner set with adjustable straps.",
    timelineEyebrow: "[Project timeline]",
    timelineTitle: ["No guesswork", "on WIPs"],
    timelineDesc:
      "You get photo check-ins before we cut fur or sew seams shut, so nothing moves forward without your thumbs-up.",
    timelineTermsCta: "Commission Terms",
    faqEyebrow: "[Frequently asked questions]",
    faqTitle: ["Got a", "question?"],
    faqDesc:
      "Quick answers to what suiters ask most before booking. If yours isn't here, drop us a message and we'll clear it up.",
    faqAskCta: "Ask a question",
    faqTermsCta: "Read Commission Terms",
    contactEyebrow: "[Contact]",
    contactTitle: ["Ready to start", "a build?"],
    contactIntro:
      "Send your ref sheet and the parts you want built. Asking for a quote is free, and we usually reply within 24 hours.",
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
    channels: [
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
    ],
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
        colsClass: "grid-cols-2 sm:grid-cols-4",
        options: [
          { value: "Head", label: "Head" },
          { value: "Paws", label: "Paws" },
          { value: "Tail", label: "Tail" },
          { value: "Feet", label: "Feet" },
        ],
      },
      {
        colsClass: "grid-cols-1 sm:grid-cols-2",
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
        colsClass: "grid-cols-1 sm:grid-cols-3",
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
      "A DTD is a full-body tape shell made over an old t-shirt so we can pattern your bodysuit fit. You do NOT need one just to get a quote. We only ask for it once your slot is confirmed.",
    fieldNotes: "[Project notes *]",
    placeholderNotes:
      "Tell us about markings, preferred fur tier (Asian vs. Mofu, Cream, Limey), or add-ons like magnetic eyelids, fan, or removable hair...",
    termsNoticeBefore:
      "By sending a quote request, you confirm that you have read and agree to our ",
    termsNoticeLink: "Commission Terms & Policy",
    submitIdle: "Request a free quote",
    submitWaitlist: "Join future quote list",
    submitSending: "Sending…",
    submitSent: "Quote request sent!",
    submitAnother: "Send another inquiry",
    confirmTitle: "Quote request sent!",
    confirmWaitlistTitle: "Added to future quote list!",
    confirmDesc:
      "We reply within 24 hours from FluffNii.furries@gmail.com. Check Spam or Promotions if you do not see our email.",
    confirmWaitlistDesc:
      "Commissions are paused for now, so we saved your character details for the next opening. Expect a reply within 24 hours from FluffNii.furries@gmail.com.",
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
      "Mình dựng rập và may sát theo ref sheet OC, đội lên vẫn thoáng khí và nhìn rõ.",
    heroContactCta: "Liên hệ",
    heroProjectsCta: "Xem fursuit",
    studioEyebrow: "[Về xưởng mình]",
    phraseText:
      "Xưởng mình làm những bộ fursuit nhẹ đầu, thoáng khí để bạn mặc đi fes cả ngày. Từng mảng màu được dựng rập tay từ ref, còn phần má với mõm thì tỉa mượt để giữ đúng nét nhân vật.",
    phraseHighlights1: "dựng rập tay, tỉa mượt, giữ đúng nét",
    phraseHighlights2: "nhẹ đầu, thoáng khí, đi fes cả ngày",
    formulaEyebrow: "[Cách xưởng làm]",
    formulaAlt: "Head fursuit Kemono của FluffNii đã tỉa lông và hoàn thiện",
    formulaTitleLines: ["Thiết kế nhân vật +", "Kỹ thuật dựng suit ="],
    formulaLead:
      "Đội lên vẫn giữ đúng nét mặt và dáng OC của bạn. Lông ngoài êm tay, bên trong chừa đủ độ thoáng.",
    formulaBodyBefore:
      "Mình lên rập thẳng từ ref sheet để từng mảng đốm, dáng tai hay chỗ chuyển màu nằm đúng vị trí. Phần tốn công nhất luôn là tỉa lông cho đều tay, ",
    formulaBodyStrong: "khâu chắc từng đường nối",
    formulaBodyAfter:
      " và chừa không gian bên trong để bạn đội suốt buổi fes không bị bí.",
    statBuilt: "(Fursuit & part đã làm)",
    statSpecies: "(Loài & phong cách)",
    statHandmade: "(Làm thủ công)",
    pillarsEyebrow: "[3 phần xưởng mình giữ kỹ nhất]",
    pillars: [
      {
        num: "(001)",
        title: "FORM MẶT & TỈ LỆ",
        desc: "Mình gọt base xốp hoặc in 3D sao cho hai bên má cân nhau, dáng tai vững và chừa khe mắt nhìn rõ phía trước.",
      },
      {
        num: "(002)",
        title: "LÔNG DÀY & TỈA MƯỢT",
        desc: "Từng mảnh lông nhập dày được dán rập ngay trên base, may giấu chỉ rồi tỉa chuyển êm giữa má và mõm.",
      },
      {
        num: "(003)",
        title: "LÓT THOÁNG & ÊM ĐẦU",
        desc: "Bên trong bọc vải lót hút ẩm kèm khe thoáng khí ẩn, lưỡi Velcro dễ tháo giặt và đệm đầu êm (có bản nâng cấp nam châm).",
      },
    ],
    whoEyebrow: "[Dành cho mọi loài]",
    whoTitle: ["Mọi loài OC,", "làm đúng chất riêng"],
    whoDesc:
      "Gấu, sư tử, cáo mèo, cún, shiba... Mỗi bản vẽ có tỉ lệ mặt riêng nên xưởng mình gọt base mới cho từng OC, không ép vào một khuôn sẵn.",
    fanCards: [
      {
        num: "(001)",
        title: "GẤU",
        desc: "Tai tròn với gò má đầy đặn quanh chiếc mõm ngắn.",
        img: "/images/species-bear.webp",
        objectPosition: "50% 35%",
        bg: "#f5f8fc",
        dark: false,
        rot: -9,
      },
      {
        num: "(002)",
        title: "SƯ TỬ",
        desc: "Bờm lông xếp nhiều lớp cùng chân mày nổi khối nhìn góc nào cũng ra dáng.",
        img: "/images/species-lion.webp",
        objectPosition: "50% 28%",
        bg: "#ffffff",
        dark: false,
        rot: -4.5,
      },
      {
        num: "(003)",
        title: "CÁO MÈO",
        desc: "Tai cáo cao ghép trên mõm mèo ngắn, lên đúng nét tròn của dòng Kemono.",
        img: "/images/species-foxcat.webp",
        objectPosition: "50% 20%",
        bg: "#f5f8fc",
        dark: false,
        rot: 0,
      },
      {
        num: "(004)",
        title: "CÚN",
        desc: "Tai vểnh lanh lợi, sống mũi hơi hếch. Đi kèm chiếc đuôi nảy nhịp theo bước đi.",
        img: "/images/species-dog.webp",
        objectPosition: "50% 38%",
        bg: "#ffffff",
        dark: false,
        rot: 4.5,
      },
      {
        num: "(005)",
        title: "SHIBA INU",
        desc: "Mảng má urajiro (phần lông sáng dưới má) tách rõ dưới tai nhọn, kèm đuôi cuộn tròn giữ nếp.",
        img: "/images/species-shiba.webp",
        objectPosition: "50% 15%",
        bg: "#1e3557",
        dark: true,
        rot: 9,
      },
    ],
    resultEyebrow: "[Thành phẩm]",
    resultTitle: ["Từ bản vẽ 2D", "ra đời thực"],
    resultDesc:
      "Để bộ suit bước ra giống hệt bản vẽ, xưởng mình canh kỹ từ khối base, độ dày lông tỉa cho đến từng đường ráp trên mặt.",
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
        desc: "Từng vệt sọc, đốm màu hay vết khuyết ở tai đều được mình lên rập thẳng trên base đúng vị trí bạn vẽ.",
      },
      {
        num: "(002)",
        title: "CHUẨN DÁNG KEMONO",
        desc: "Gò má bầu bĩnh cùng đôi mắt 3D follow-me đặt sâu giúp nhìn chính diện hay góc nghiêng đều có hồn.",
      },
      {
        num: "(003)",
        title: "ĐỔI BIỂU CẢM DỄ",
        desc: "Thay nhanh tâm trạng bằng lưỡi và mí dán Velcro, tai bẻ dáng (posable ears) hoặc nâng cấp gắn nam châm.",
      },
      {
        num: "(004)",
        title: "ĐỘI LÂU KHÔNG NGỘP",
        desc: "Khe mắt nhìn rộng, khóa kéo giấu sau gáy và lớp lót mát giúp bạn mặc đi fes nhiều tiếng vẫn dễ chịu.",
      },
    ],
    methodEyebrow: "[Cách làm việc]",
    methodTitle: "3 bước tại xưởng",
    methodDesc:
      "Mỗi đơn hàng đều đi qua 3 chặng này. Làm xong chặng nào mình chụp ảnh WIP gửi bạn duyệt rồi mới làm tiếp.",
    methodSteps: [
      {
        tag: "[Bước 01]",
        counter: "(001) / (003)",
        title: "DỰNG BASE & MẮT 3D CÓ HỒN",
        desc: "Mình gọt form đầu cân hai bên, đặt mắt follow-me sâu vừa tầm nhìn và mở khoang miệng để thở thoải mái khi đi fes.",
        pills: ["Cân form", "Nhìn rõ", "Thoáng khí"],
        img: "/images/method-01.webp",
        bg: "#fff0a6",
        dark: false,
        top: 108,
      },
      {
        tag: "[Bước 02]",
        counter: "(002) / (003)",
        title: "LÊN RẬP LÔNG & TỈA CHUYỂN MƯỢT",
        desc: "Mình dán băng keo vẽ rập thẳng lên base, khâu sát mối nối rồi tỉa chuyển độ dài lông từ má xuống mõm cho ra nét mặt.",
        pills: ["Lông dày", "Chuẩn rập", "Mượt form"],
        img: "/images/method-02.webp",
        bg: "#dce8f5",
        dark: false,
        top: 136,
      },
      {
        tag: "[Bước 03]",
        counter: "(003) / (003)",
        title: "LÓT VẢI MÁT & CÂN CHỈNH FORM",
        desc: "Bước cuối mình bọc vải lót thấm mồ hôi, nhồi phồng đệm Paws và lót xốp vừa vòng đầu để đội lên ôm gọn, chắc tay.",
        pills: ["Thấm hút", "Ôm đầu", "Chắc chắn"],
        img: "/images/method-03.webp",
        bg: "#1e3557",
        dark: true,
        top: 164,
      },
    ],
    projectsEyebrow: "[Dự án đã làm]",
    projectsTitle: ["Những bộ suit", "đã hoàn thiện"],
    prevProjectAria: "Bộ trước",
    nextProjectAria: "Bộ tiếp theo",
    projectDotAria: "Xem bộ",
    projects: [
      {
        client: "SY TRAY",
        year: "2026",
        category: "Mini partial",
        summary:
          "Mini partial xám tro phối kem với chỏm má cam rực. Điểm nhấn nằm ở cặp mắt hổ phách cỡ lớn và đôi Paws trắng có móng.",
        img: "/images/project-01.webp",
        objectPosition: "50% 35%",
        tags: ["Mini partial", "Kemono", "Tỉa lông mịn", "Paws có móng"],
        partValues: ["Mini partial"],
        inspectLabel: "Xem lớn",
        review:
          "Lông tỉa rất đều và mịn tay, mấy góc gò má lên khối rõ nhưng sờ vào vẫn thấy êm tự nhiên.",
        author: "Sy tray",
        role: "Chủ suit",
      },
      {
        client: "MINNY MINNIE",
        year: "2026",
        category: "Partial",
        summary:
          "Bộ Partial mèo trắng tuyết với mắt viền đỏ và dấu kim cương xanh trên trán. Đôi Paws đi kèm nhồi đệm xanh da trời phồng êm.",
        img: "/images/project-02.webp",
        objectPosition: "50% 45%",
        tags: ["Partial", "Mèo Kemono", "Paws đệm phồng"],
        partValues: ["Partial"],
        inspectLabel: "Xem lớn",
      },
      {
        client: "FELIX ALGORITHM",
        year: "2026",
        category: "Partial",
        summary:
          "Partial cún xanh ngọc phối navy và kem, mắt trái nháy duyên. Lót tai vàng rực đi cùng đôi Paws xanh đồng màu.",
        img: "/images/project-03.webp",
        objectPosition: "50% 50%",
        tags: ["Partial", "Base in 3D TPU", "Ghép màu phức tạp"],
        partValues: ["Partial"],
        inspectLabel: "Xem lớn",
        review:
          "Base in 3D TPU dày dặn, xưởng dựng riêng sát bản vẽ OC của mình. Mấy mảng màu khó vẫn lên rập khớp nhau, đường máy lẫn khâu tay đều chắc lắm.",
        author: "Felix",
        role: "Chủ suit",
      },
      {
        client: "HUNTER KNIGHT",
        year: "2026",
        category: "Partial",
        summary:
          "Partial trắng bạc có phần lông má xếp lớp dày dặn. Đỉnh đầu điểm lọn tóc đỏ đen, còn đệm tay thì phối xanh nhạt.",
        img: "/images/project-04.webp",
        objectPosition: "50% 50%",
        tags: ["Partial", "Lông má nhiều tầng", "Đệm xanh nhạt"],
        partValues: ["Partial"],
        inspectLabel: "Xem lớn",
      },
      {
        client: "UMBRÉON RETSQUÔT",
        year: "2026",
        category: "Mini partial",
        summary:
          "Bộ canine đen trắng phối vàng ánh kim với mắt xanh và chiếc lưỡi thè tháo rời. Bên tai thắt thêm dây tết treo chuông vàng.",
        img: "/images/project-05.webp",
        objectPosition: "50% 20%",
        tags: ["Mini partial", "Base 3D TPU", "Lưỡi tháo rời"],
        partValues: ["Mini partial"],
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
      "Những mẫu Head, Partial và Paws xưởng mình mới làm xong. Bạn lọc theo loại, bấm tạm dừng hoặc chạm vào ảnh để xem cận chi tiết.",
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
    galleryWords: [
      "HEADS",
      "PARTIALS",
      "FULLSUITS",
      "PAWS & TAILS",
      "COMMISSIONS",
    ],
    galleryRow1: [
      {
        id: "g-r1-01",
        src: "/images/gallery-r1-01.webp",
        alt: "Partial cáo lông đỏ cam cầm bánh kem trắng lúc hoàng hôn",
        title: "Cáo Đỏ Cam",
        eyebrow: "[Partial · Kemono]",
        description: "Mặt cáo tỉa chuyển màu từ cam sang kem mượt, đi cùng Paws bốn ngón viền đỏ gắn móng vải đen.",
        tags: ["Partial", "Mắt follow-me", "Paws có móng"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "heads"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
      {
        id: "g-r1-02",
        src: "/images/gallery-r1-02.webp",
        alt: "Hai bộ fursuit Sy Tray và Minny Minnie ngồi cạnh bàn học lớp học",
        title: "Sy Tray & Minny Minnie",
        eyebrow: "[Partials · Ảnh Studio]",
        description: "Hai bộ Kemono chụp cạnh nhau, dễ nhìn ra sự khác biệt ở form đầu, dáng Paws và chiếc Tail cong.",
        tags: ["Partial", "Paws & Tail", "Kemono"],
        partValues: ["Partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r1-03",
        src: "/images/gallery-r1-03.webp",
        alt: "Partial cún lông cam rực ngoài trời khoe đệm Paws mềm",
        title: "Canine Lông Cam",
        eyebrow: "[Mini partial · Canine]",
        description: "Bộ cún cam phối trắng có gắn khuyên tai. Lòng bàn tay may đệm nâu êm, kết hợp viền mắt vẽ dày.",
        tags: ["Mini partial", "Paws", "Khuyên tai"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
      {
        id: "g-r1-04",
        src: "/images/gallery-r1-04.webp",
        alt: "Head fursuit Felix Algorithm xanh dương đeo kính tròn trắng trên bãi biển",
        title: "Felix Algorithm",
        eyebrow: "[Head · Đeo được kính]",
        description: "Head cún xanh ngọc phối kem có khoét khe sâu sau mắt, giúp bạn đeo gọng kính tròn thoải mái mà không cấn lông.",
        tags: ["Head", "Vừa gọng kính", "Tỉa mõm gọn"],
        partValues: ["Head"],
        filterCategories: ["heads"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r1-05",
        src: "/images/gallery-r1-05.webp",
        alt: "Fursuit Sy Tray xám cam vẫy Paws bên dãy tủ locker vàng",
        title: "Sy Tray",
        eyebrow: "[Mini partial · Kemono]",
        description: "Tóc mái xám xếp tầng phủ trên tai lót cam tươi. Đôi Paws trắng bốn ngón có đệm cam đồng bộ.",
        tags: ["Mini partial", "Paws", "Tóc xếp lớp"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[246px] sm:w-[300px]",
        objectPosition: "center top",
      },
      {
        id: "g-r1-06",
        src: "/images/gallery-r1-06.webp",
        alt: "Head Shiba Inu đen vàng gắn dây khuyên tai và chuông vàng",
        title: "Umbréon Retsquôt",
        eyebrow: "[Head · Base 3D TPU]",
        description: "Head Shiba dựng trên khung 3D TPU, giữ rõ mảng má urajiro. Bên tai buộc dây tết đỏ trắng treo chuông vàng.",
        tags: ["Head", "Base 3D TPU", "Mảng má urajiro"],
        partValues: ["Head"],
        filterCategories: ["heads"],
        widthClass: "w-[295px] sm:w-[360px]",
      },
      {
        id: "g-r1-07",
        src: "/images/gallery-r1-07.webp",
        alt: "Fursuit Felix Algorithm giơ cả hai Paws trên bãi cỏ xanh",
        title: "Felix Algorithm",
        eyebrow: "[Partial · Dáng toàn thân]",
        description: "Góc chụp đứng khoe hai chiếc Paws xanh navy cân nhau và đệm xanh lá. Phía sau là chiếc Tail ôm gọn ngang hông.",
        tags: ["Mini partial", "Paws", "Mắt follow-me"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
      {
        id: "g-r1-08",
        src: "/images/gallery-r1-08.webp",
        alt: "Fursuit mèo trắng cài lọn tóc đỏ đứng tựa lan can xanh ngoài phố",
        title: "Mèo Trắng Dạo Phố",
        eyebrow: "[Mini partial · Feline]",
        description: "Má mèo trắng tỉa tròn êm tay, gắn thêm lọn tóc đỏ đen cùng đệm Paws xanh trời.",
        tags: ["Mini partial", "Feline", "Phụ kiện tóc"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "heads"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
    ],
    galleryRow2: [
      {
        id: "g-r2-01",
        src: "/images/gallery-r2-01.webp",
        alt: "Fursuit mèo trắng khoe móng và đệm Paws xanh trên sân thượng",
        title: "Mèo Trắng Sân Thượng",
        eyebrow: "[Partial · Đệm Paws Xanh]",
        description: "Góc cận cho thấy móng vải xanh nhồi căng và đệm tay hai màu hồng xanh. Phần lông má quanh mắt được tỉa gọn hẳn.",
        tags: ["Partial", "Móng xanh", "Paws đệm phồng"],
        partValues: ["Partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r2-02",
        src: "/images/gallery-r2-02.webp",
        alt: "Fursuit có sừng màu xanh da trời đội nón cói trong nhà kính",
        title: "Kemono Xanh Có Sừng",
        eyebrow: "[Head · Sừng dựng riêng]",
        description: "Lông xanh trời chuyển màu nhẹ từ đỉnh đầu xuống má. Trên đầu gắn cặp sừng đen nhỏ cùng mắt hổ phách.",
        tags: ["Head", "Sừng", "Chuyển sắc lông"],
        partValues: ["Head"],
        filterCategories: ["heads", "partials"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r2-03",
        src: "/images/gallery-r2-03.webp",
        alt: "Fursuit Shiba đen vàng tựa xe tay ga bên biển khoe Tail cuộn",
        title: "Shiba Head & Tail",
        eyebrow: "[Paws & Tails · Ngoài trời]",
        description: "Chiếc Tail đen trắng cuộn tròn giữ nếp sẵn, đeo dây đai ngang hông khá chắc khi di chuyển.",
        tags: ["Tail", "Head", "Mảng má urajiro"],
        partValues: ["Head", "Tail"],
        filterCategories: ["paws", "partials"],
        widthClass: "w-[246px] sm:w-[300px]",
        objectPosition: "center top",
      },
      {
        id: "g-r2-04",
        src: "/images/gallery-r2-04.webp",
        alt: "Sy Tray và fursuit mèo trắng ôm bóng rổ trước tủ đồ vàng",
        title: "Bộ Đôi Tủ Đồ Vàng",
        eyebrow: "[Partials · Kemono]",
        description: "Đặt cạnh nhau để xem hai kiểu khoang miệng mở khác nhau và phần chỉ khâu đệm Paws chịu lực khi cầm đồ.",
        tags: ["Partial", "Paws", "Lưỡi thè"],
        partValues: ["Partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[295px] sm:w-[360px]",
      },
      {
        id: "g-r2-05",
        src: "/images/gallery-r2-05.webp",
        alt: "Cận cảnh Paws xanh navy của Felix Algorithm đưa về phía ống kính",
        title: "Cận Cảnh Paws",
        eyebrow: "[Paws & Tails · Tiêu chuẩn 35 cm]",
        description: "Đôi Paws bốn ngón dài chuẩn 35 cm với móng vải trắng và ngón phối xanh đậm. Lòng bàn tay có giấu sẵn còi squeaker.",
        tags: ["Paws", "Móng vải", "Squeaker"],
        partValues: ["Paws"],
        filterCategories: ["paws", "partials"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r2-06",
        src: "/images/gallery-r2-06.webp",
        alt: "Fursuit mèo trắng Minny Minnie cầm sách đọc dưới đèn lồng giấy",
        title: "Paws Minny Minnie",
        eyebrow: "[Head & Paws · Kemono]",
        description: "Đệm tay tuy phồng nhưng ngón vẫn gập cầm sách hay phụ kiện dễ dàng, đi cùng cặp mắt mèo viền đỏ.",
        tags: ["Head", "Paws", "Móng xanh"],
        partValues: ["Head", "Paws"],
        filterCategories: ["paws", "heads"],
        widthClass: "w-[246px] sm:w-[300px]",
      },
      {
        id: "g-r2-07",
        src: "/images/gallery-r2-07.webp",
        alt: "Fursuit cún vàng cam ngồi trên tường vẽ graffiti",
        title: "Partial Đường Phố",
        eyebrow: "[Partial · Cam Vàng]",
        description: "Paws lông xù cam rực gắn móng vải đen, chuyển tiếp sang phần cổ lông kem khá mượt.",
        tags: ["Partial", "Paws", "Móng đen"],
        partValues: ["Partial"],
        filterCategories: ["partials", "paws"],
        widthClass: "w-[344px] sm:w-[420px]",
      },
      {
        id: "g-r2-08",
        src: "/images/gallery-r2-08.webp",
        alt: "Fursuit có sừng nâu trắng ngồi trên cốp xe cổ Datsun",
        title: "Canine Có Sừng",
        eyebrow: "[Mini partial · Mắt hai màu]",
        description: "Đôi mắt hai màu vàng xanh dưới cặp sừng đen và một bên tai rủ lệch. Bộ đi kèm Paws trắng có móng.",
        tags: ["Mini partial", "Sừng", "Mắt hai màu"],
        partValues: ["Mini partial"],
        filterCategories: ["partials", "heads"],
        widthClass: "w-[246px] sm:w-[300px]",
        objectPosition: "center top",
      },
    ],
    galleryEmptyFullsuit: {
      title: "Đặt làm Half Body & Fullsuit",
      desc: "Mỗi bộ Half Body hay Fullsuit đều được dựng rập riêng theo ref sheet và Duct Tape Dummy của bạn. Góc ảnh hiện đang trưng bày các mẫu Head, Partial, Paws & Tail đã giao; bạn xem cấu hình bên dưới hoặc gửi form hỏi báo giá Fullsuit nhé.",
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
      "Bạn có thể đặt lẻ một chiếc Head, hoặc làm trọn bộ cùng Paws, Feet, Tail và Body cắt từ cùng một lô lông cho đồng màu.",
    offer1Tag: "[Gói 01]",
    offer1Alt: "Custom Fursuit Head",
    offer1Title: "Custom Fursuit Head",
    offer1Desc:
      "Chỉ riêng phần Head, dựng trên base cứng kết hợp mõm mềm linh hoạt, đã bao gồm 2 màu lông cơ bản.",
    offer1Bullets: [
      "Base cứng + mõm mềm dễ cử động (nâng cấp Full TPU in 3D toàn đầu có phụ phí)",
      "Lót kín bên trong Head và cổ, tặng kèm lưỡi tháo rời và mí dán Velcro",
      "Bao gồm 2 màu vải lông Châu Á tiêu chuẩn (thêm màu tính phụ phí riêng)",
      "Tùy chọn thêm: mí nam châm, quạt tản nhiệt, chỏm tóc rời tháo lắp",
    ],
    offer1Sub: "2 màu cơ bản · base cứng + mõm mềm",
    offer1Cta: "Hỏi báo giá Head",
    offer2Tag: "[Gói 02]",
    offer2Alt: "Half Body & Fullsuit",
    offer2Title: "Half Body & Fullsuit",
    offer2Desc:
      "Trọn bộ nhân vật gồm Head, Paws, Feet, Tail cùng phần Half Body hoặc Fullsuit cắt từ chung một lô lông.",
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
        title: "HEAD",
        optionValue: "Head",
        rows: [
          { label: "Lông · Khung", value: "2 MÀU · CỨNG+MỀM" },
          { label: "Full TPU (in 3D toàn đầu)", value: "PHỤ PHÍ RIÊNG" },
          { label: "Mí nam châm", value: "TÙY CHỌN" },
          { label: "Thêm màu lông", value: "PHỤ PHÍ RIÊNG" },
          { label: "Quạt tản nhiệt", value: "TÙY CHỌN" },
          { label: "Tóc rời tháo lắp", value: "TÙY CHỌN" },
        ],
        note: "Đã có sẵn lót Head/cổ, lưỡi tháo rời và mí dán Velcro.",
        bg: "#fff0a6",
        img: "/images/offer-01.webp",
        imgPos: "50% 35%",
        rot: -4,
      },
      {
        title: "PAWS",
        optionValue: "Paws",
        rows: [
          { label: "Lông · Chiều dài", value: "1 MÀU · 35 CM" },
          { label: "Tiêu chuẩn", value: "MÓNG + SQUEAKER" },
          { label: "Thiết kế 5 ngón", value: "TÙY CHỌN" },
          { label: "Thêm màu lông", value: "PHỤ PHÍ RIÊNG" },
          { label: "Finger escape (khe luồn tay)", value: "TÙY CHỌN" },
        ],
        note: "Đã gồm móng vải, còi squeaker trong lòng tay và lót kín.",
        bg: "#dce8f5",
        img: "/images/gallery-r2-05.webp",
        imgPos: "50% 50%",
        rot: 3,
      },
      {
        title: "TAIL",
        optionValue: "Tail",
        rows: [
          { label: "Lông · Chiều dài", value: "1 MÀU · 70 CM" },
          { label: "Tail cá / rồng / dài", value: "THEO THIẾT KẾ" },
          { label: "Thêm màu lông", value: "PHỤ PHÍ RIÊNG" },
          { label: "Khung tạo dáng", value: "TÙY CHỌN" },
          { label: "Hyper motion (đuôi nảy)", value: "TÙY CHỌN" },
          { label: "Khóa kéo vệ sinh", value: "TÙY CHỌN" },
        ],
        note: "Đuôi dài hơn tính thêm phụ phí; Tail cá hay rồng báo giá theo ref.",
        bg: "#f5f8fc",
        img: "/images/polaroid-03.webp",
        imgPos: "50% 35%",
        rot: -3,
      },
      {
        title: "FEET",
        optionValue: "Feet",
        rows: [
          { label: "Lông · Dép lót", value: "1 MÀU · ONE SIZE" },
          { label: "Thêm màu lông", value: "PHỤ PHÍ RIÊNG" },
          { label: "Indoor feet", value: "TÙY CHỌN" },
          { label: "Indoor / Outdoor swap", value: "TÙY CHỌN" },
        ],
        note: "Outdoor feet dùng ngón PETG cứng, móng vải, lõi xốp và lót kín.",
        bg: "#f5f8fc",
        img: "/images/gallery-r2-07.webp",
        imgPos: "50% 60%",
        rot: 3,
      },
      {
        title: "HALF BODY",
        optionValue: "Half-body",
        rows: [
          { label: "Màu lông cơ bản", value: "2 MÀU" },
          { label: "Hạng mục kèm theo", value: "HEAD · PAWS · FEET" },
          { label: "Body & Tail", value: "TAIL + HALF BODY" },
          { label: "Quà tặng kèm", value: "BỘ LÓT ĐỆM THÂN" },
        ],
        note: "Gồm Head, Paws, Feet, Tail, Half Body và tặng kèm bộ lót đệm thân.",
        bg: "#dce8f5",
        img: "/images/gallery-r2-08.webp",
        imgPos: "50% 25%",
        rot: -3,
      },
      {
        title: "FULLSUIT",
        optionValue: "Fullsuit",
        rows: [
          { label: "Màu lông cơ bản", value: "2 MÀU" },
          { label: "Hạng mục kèm theo", value: "HEAD · PAWS · FEET" },
          { label: "Body & Tail", value: "TAIL + FULL BODY" },
          { label: "Quà tặng kèm", value: "BỘ LÓT ĐỆM THÂN" },
        ],
        note: "Gồm Head, Paws, Feet, Tail, Fullsuit và tặng kèm bộ lót đệm thân.",
        bg: "#fff0a6",
        img: "/images/project-04.webp",
        imgPos: "50% 28%",
        rot: 4,
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
      "Trước khi cắt lông hay khâu chết đường may, mình đều gửi ảnh WIP để bạn xem trước rồi mới chốt bước tiếp theo.",
    timelineTermsCta: "Xem điều khoản",
    faqEyebrow: "[Giải đáp nhanh]",
    faqTitle: ["Thắc mắc", "thường gặp"],
    faqDesc:
      "Những câu tụi bạn hay hỏi nhất trước khi chốt đơn. Còn điều gì băn khoăn cứ nhắn thẳng cho xưởng mình nhé.",
    faqAskCta: "Nhắn hỏi xưởng",
    faqTermsCta: "Đọc điều khoản",
    contactEyebrow: "[Liên hệ]",
    contactTitle: ["Muốn đặt", "fursuit mới?"],
    contactIntro:
      "Gửi cho mình ref sheet nhân vật cùng các phần bạn muốn làm. Hỏi báo giá hoàn toàn miễn phí, mình sẽ rep trong vòng 24 giờ.",
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
    channels: [
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
    ],
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
        colsClass: "grid-cols-2 sm:grid-cols-4",
        options: [
          { value: "Head", label: "Head" },
          { value: "Paws", label: "Paws" },
          { value: "Tail", label: "Tail" },
          { value: "Feet", label: "Feet" },
        ],
      },
      {
        colsClass: "grid-cols-1 sm:grid-cols-2",
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
        colsClass: "grid-cols-1 sm:grid-cols-3",
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
      "DTD là phom cơ thể quấn từ áo cũ và băng keo để mình cắt rập body cho vừa dáng bạn. Khi mới hỏi báo giá thì CHƯA cần làm sẵn, chốt slot xong mình mới nhờ gửi nhé.",
    fieldNotes: "[Ghi chú đơn *]",
    placeholderNotes:
      "Ghi giúp mình chi tiết mảng màu, loại lông muốn dùng (Châu Á hay Mofu, Cream, Limey), hoặc các món thêm như mí nam châm, quạt, tóc rời...",
    termsNoticeBefore:
      "Khi gửi yêu cầu báo giá, bạn xác nhận đã đọc và đồng ý với ",
    termsNoticeLink: "Điều khoản & Chính sách Commission",
    submitIdle: "Gửi yêu cầu báo giá",
    submitWaitlist: "Gửi hẹn báo giá đợt sau",
    submitSending: "Đang gửi…",
    submitSent: "Đã gửi yêu cầu báo giá!",
    submitAnother: "Gửi thêm yêu cầu khác",
    confirmTitle: "Đã gửi yêu cầu báo giá!",
    confirmWaitlistTitle: "Đã lưu hẹn báo giá đợt sau!",
    confirmDesc:
      "Mình sẽ phản hồi trong vòng 24 giờ qua email FluffNii.furries@gmail.com. Nếu chưa thấy thư đến, bạn ngó thử mục Thư rác (Spam) hoặc Quảng cáo nhé.",
    confirmWaitlistDesc:
      "Hiện xưởng mình đang tạm ngưng nhận đơn mới nên thông tin OC của bạn được ghi lại cho đợt mở slot tiếp theo. Mình vẫn rep trong 24 giờ qua FluffNii.furries@gmail.com.",
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
