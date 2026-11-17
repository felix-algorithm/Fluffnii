import type { Lang } from "@/components/LanguageProvider";

export interface CommissionOption {
  value: string;
  label: string;
  note?: string;
}

export interface PackageCardData {
  title: string;
  rows: { label: string; value: string }[];
  note: string;
  price: string;
  usdPrice: string;
  bg: string;
  img: string;
  imgPos: string;
  rot: number;
}

export interface ProjectCardData {
  client: string;
  year: string;
  summary: string;
  img: string;
  objectPosition: string;
  review?: string;
  author?: string;
  role?: string;
}

export interface HomeLocaleCopy {
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
  projects: ProjectCardData[];
  galleryEyebrow: string;
  galleryTitle: string;
  galleryDesc: string;
  galleryWords: string[];
  offersEyebrow: string;
  offersTitle: string;
  offersDesc: string;
  offer1Tag: string;
  offer1Alt: string;
  offer1Title: string;
  offer1Desc: string;
  offer1Bullets: string[];
  offer1Price: string;
  offer1Usd: string;
  offer1Sub: string;
  offer2Tag: string;
  offer2Alt: string;
  offer2Title: string;
  offer2Desc: string;
  offer2Bullets: string[];
  offer2Price: string;
  offer2Usd: string;
  offer2Sub: string;
  furNotice: string;
  priceSheetEyebrow: string;
  packages: PackageCardData[];
  extraOptionsEyebrow: string;
  extraOptionsTag: string;
  extraOptions: { label: string; value: string }[];
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
  channels: { label: string; value: string; href: string; external: boolean }[];
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
  fieldType: string;
  commissionGroups: { colsClass: string; options: CommissionOption[] }[];
  fieldNotes: string;
  placeholderNotes: string;
  termsNoticeBefore: string;
  termsNoticeLink: string;
  submitIdle: string;
  submitSending: string;
  submitSent: string;
  submitAnother: string;
  errorFallback: string;
  errorNetwork: string;
}

const DEFAULT_OPEN_NOTE_EN =
  "Taking custom head and mini partial builds. Reply within 24h.";
const DEFAULT_CLOSED_NOTE_EN =
  "Currently paused on new builds. Feel free to send your ref sheet for a future quote.";

export function localizeCommissionNote(note: string, open: boolean, lang: Lang): string {
  if (lang === "en") return note;
  const trimmed = note.trim();
  if (!trimmed || trimmed === DEFAULT_OPEN_NOTE_EN) {
    return "Đang nhận làm head và mini partial theo yêu cầu. Phản hồi trong 24 giờ.";
  }
  if (trimmed === DEFAULT_CLOSED_NOTE_EN) {
    return "Hiện đang tạm ngưng nhận đơn mới. Bạn vẫn có thể gửi ref sheet để hẹn lịch trước.";
  }
  if (open && trimmed.toLowerCase().includes("reply within 24h")) {
    return "Đang nhận đơn mới. Nhắn mình để nhận báo giá trong 24 giờ.";
  }
  return trimmed;
}

export const HOME_COPY: Record<Lang, HomeLocaleCopy> = {
  en: {
    heroStatusOpen: "Commissions open",
    heroStatusClosed: "Commissions closed",
    heroEyebrow: "Custom Fursuit Workshop",
    heroTitle: ["From sketch", "to fursuit"],
    heroDesc:
      "Custom fursuits sculpted, patterned, and sewn straight from your ref sheet",
    heroContactCta: "Contact",
    heroProjectsCta: "View fursuits",
    studioEyebrow: "[The studio]",
    phraseText:
      "FluffNii builds custom fursuits you can actually breathe and move in. We pattern every marking by hand, trim the pile to show the sculpt, and line the inside for long days on the convention floor.",
    phraseHighlights1:
      "breathe and move in, pattern every marking, trim the pile",
    phraseHighlights2: "line the inside, convention floor",
    formulaEyebrow: "[The formula]",
    formulaAlt: "FluffNii fursuit craft formula",
    formulaTitleLines: ["Character Design +", "Fursuit Craft ="],
    formulaLead:
      "Suits that keep your character's face and silhouette intact once you put them on. Soft outside, breathable inside.",
    formulaBodyBefore:
      "We work straight from your ref sheet so every spot, ear shape, and color break lands where it should. Our ",
    formulaBodyStrong: "focus",
    formulaBodyAfter:
      " is clean shaving, solid seams, and a head you can wear for hours without overheating.",
    statBuilt: "(Fursuits & parts built)",
    statSpecies: "(Species & styles)",
    statHandmade: "(Made by hand)",
    pillarsEyebrow: "[3 areas of expertise in the same frame]",
    pillars: [
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
    ],
    whoEyebrow: "[Who it's for]",
    whoTitle: ["Every species,", "built your way"],
    whoDesc:
      "Bears, lions, fox-cats, dogs, shibas… Every ref sheet has its own proportions, so we shape each base from scratch instead of reusing one mold.",
    fanCards: [
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
    ],
    resultEyebrow: "[The result]",
    resultTitle: ["From 2D ref sheet", "to 3D reality"],
    resultDesc:
      "Getting a suit to look like your art sheet comes down to base proportions, shave depth, and where every seam sits on the face.",
    resultCards: [
      {
        num: "(001)",
        title: "TRUE TO YOUR REF",
        desc: "Every stripe, spot, ear notch, and color break on your ref sheet is taped and sewn right where you drew it.",
      },
      {
        num: "(002)",
        title: "KEMONO CHARM",
        desc: "Round plush cheeks and deep-set 3D follow-me eyes that keep their expression from the front and side angles.",
      },
      {
        num: "(003)",
        title: "MAGNETIC EXTRAS",
        desc: "Switch expressions in seconds with magnetic tongues, clip-on eyelids, posable ears, and hair tufts.",
      },
      {
        num: "(004)",
        title: "MADE TO MOVE",
        desc: "Wide field of view, hidden back zippers, and a cooling liner built for full days at a con, not just quick photos.",
      },
    ],
    methodEyebrow: "[How]",
    methodTitle: "In three stages",
    methodDesc:
      "Every commission goes through the same three workshop stages, with photo check-ins before we move to the next.",
    methodSteps: [
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
    ],
    projectsEyebrow: "[Projects]",
    projectsTitle: ["Selected", "projects"],
    prevProjectAria: "Previous project",
    nextProjectAria: "Next project",
    projects: [
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
    ],
    galleryEyebrow: "[Gallery]",
    galleryTitle: "The wall of fursuits",
    galleryDesc:
      "Finished heads, partials, paws, and workshop WIPs. Hover a row to slow down the scroll.",
    galleryWords: [
      "HEADS",
      "PARTIALS",
      "FULLSUITS",
      "PAWS & TAILS",
      "COMMISSIONS",
    ],
    offersEyebrow: "[Offers]",
    offersTitle: "Built for your character",
    offersDesc:
      "Start with a custom head, or pair it with matching paws and a tail cut from the same fur roll.",
    offer1Tag: "[Offer 01]",
    offer1Alt: "Custom Fursuit Head",
    offer1Title: "Custom Fursuit Head",
    offer1Desc:
      "Just the head, built on a rigid base with a soft, flexible muzzle. Two base fur colors are included.",
    offer1Bullets: [
      "Rigid head base with a soft, flexible muzzle (Full TPU extra fee)",
      "Head & neck lining, removable Velcro tongue, and Velcro eyelids",
      "Covers 2 base fur colors (+$35 / 600K VND per extra color)",
      "Add-ons: magnetic eyelids (+$15), internal fan (+$30), wig (+$70)",
      "Free gifts: Velcro tongue, brush, hair clips & souvenir item",
    ],
    offer1Price: "From 8,400,000+ VND",
    offer1Usd: "$480+ USD",
    offer1Sub: "2 base colors · rigid + soft muzzle",
    offer2Tag: "[Offer 02]",
    offer2Alt: "Half Body & Full Suit",
    offer2Title: "Half Body & Full Suit",
    offer2Desc:
      "Complete character suites combining Head, Paws, Feet, Tail, and a Half Body or Full Body cut from the same fur lot.",
    offer2Bullets: [
      "Includes Head, Paws, Feet, Tail, and Half or Full Body with 2 base colors",
      "Paws ($100+ / 1,750K+): 35 cm, fabric claws, squeaker, full lining",
      "Tail ($90+ / 1,500K+): 70 cm base, frame & hyper-motion optional",
      "Feet ($150 / 2,600K): outdoor PETG toes, foam core, 1-size slipper",
      "Half & Full Suits include a free adjustable torso padding liner",
    ],
    offer2Price: "From 26,200,000 VND",
    offer2Usd: "$1,500 USD (Full Suit $2,000 / 35M VND)",
    offer2Sub: "Full Suit extra fur color +$100 / 1,750K VND",
    furNotice:
      "Standard builds use Asian faux fur. Mofu, Cream, Limey, and imported regional furs carry an extra fee.",
    priceSheetEyebrow: "[Full commission price sheet · 6 parts & suites]",
    packages: [
      {
        title: "HEAD",
        rows: [
          { label: "Base fur · Frame", value: "2 COL · RIGID+SOFT" },
          { label: "Full TPU base", value: "EXTRA FEE" },
          { label: "Magnetic eyelids", value: "+$15 / 200K" },
          { label: "Extra fur color", value: "+$35 / 600K" },
          { label: "Built-in fan (each)", value: "+$30 / 525K" },
          { label: "Removable hair", value: "+$70 / 1,200K" },
        ],
        note: "Includes head & neck lining, Velcro tongue, and Velcro eyelids.",
        price: "8,400,000+ VND",
        usdPrice: "$480+ USD",
        bg: "#fff0a6",
        img: "/images/offer-01.webp",
        imgPos: "50% 35%",
        rot: -4,
      },
      {
        title: "PAWS",
        rows: [
          { label: "Base fur · Length", value: "1 COL · 35 CM" },
          { label: "Standard build", value: "CLAWS + SQUEAKER" },
          { label: "5-finger design", value: "+$15 / 250K" },
          { label: "Extra fur color", value: "+$20 / 350K" },
          { label: "Finger escape", value: "+$20 / 350K" },
        ],
        note: "Includes fabric claws, squeaker, and full inner lining.",
        price: "1,750,000+ VND",
        usdPrice: "$100+ USD",
        bg: "#dce8f5",
        img: "/images/gallery-r2-05.webp",
        imgPos: "50% 50%",
        rot: 3,
      },
      {
        title: "TAIL",
        rows: [
          { label: "Base fur · Length", value: "1 COL · 70 CM" },
          { label: "Fish / dragon / long", value: "EXTRA / QUOTE" },
          { label: "Extra fur color", value: "+$25 / 400K" },
          { label: "Poseable frame", value: "+$15 / 300K" },
          { label: "Hyper motion", value: "+$20–50 / 350–850K" },
          { label: "Cleaning zipper", value: "+$10 / 175K" },
        ],
        note: "Longer tails carry an extra fee; fish or dragon tails quoted by design.",
        price: "1,500,000+ VND",
        usdPrice: "$90+ USD",
        bg: "#f5f8fc",
        img: "/images/polaroid-03.webp",
        imgPos: "50% 35%",
        rot: -3,
      },
      {
        title: "FEET",
        rows: [
          { label: "Base · Inner slipper", value: "1 COL · ONE SIZE" },
          { label: "Extra fur color", value: "+$30 / 500K" },
          { label: "Indoor feet style", value: "+$20 / 350K" },
          { label: "Indoor/Outdoor swap", value: "+$85 / 1,450K" },
        ],
        note: "Outdoor feet with PETG toes, fabric claws, sculpted foam, and full lining.",
        price: "2,600,000 VND",
        usdPrice: "$150 USD",
        bg: "#f5f8fc",
        img: "/images/gallery-r2-07.webp",
        imgPos: "50% 60%",
        rot: 3,
      },
      {
        title: "HALF BODY",
        rows: [
          { label: "Base fur colors", value: "2 COLORS" },
          { label: "Included parts", value: "HEAD · PAWS · FEET" },
          { label: "Body & tail", value: "TAIL + HALF BODY" },
          { label: "Free bonus gift", value: "TORSO LINER SET" },
        ],
        note: "Includes Head, Paws, Feet, Tail, Half Body, and adjustable padding liner.",
        price: "26,200,000 VND",
        usdPrice: "$1,500 USD",
        bg: "#dce8f5",
        img: "/images/gallery-r2-08.webp",
        imgPos: "50% 25%",
        rot: -3,
      },
      {
        title: "FULL SUIT",
        rows: [
          { label: "Base fur colors", value: "2 COLORS" },
          { label: "Included parts", value: "HEAD · PAWS · FEET" },
          { label: "Body & tail", value: "TAIL + FULL BODY" },
          { label: "Extra fur color", value: "+$100 / 1,750K" },
        ],
        note: "Includes Head, Paws, Feet, Tail, Full Body, and adjustable padding liner.",
        price: "35,000,000 VND",
        usdPrice: "$2,000 USD",
        bg: "#fff0a6",
        img: "/images/project-04.jpg",
        imgPos: "50% 28%",
        rot: 4,
      },
    ],
    extraOptionsEyebrow: "[Additional Options & Fur]",
    extraOptionsTag: "[Add-ons]",
    extraOptions: [
      { label: "Removable hair / wig", value: "+$70 / 1,200,000 VND" },
      { label: "Accessories (horns, wings, etc.)", value: "Contact for quote" },
      {
        label: "Standard vs. imported faux fur",
        value:
          "Studio uses Asian faux fur as standard. Mofu, Cream, Limey, and imported regional furs carry an extra fee.",
      },
    ],
    freeGiftsEyebrow: "[Free Gifts Included]",
    freeGiftsTag: "[Every order]",
    freeGifts: [
      "Removable Velcro tongue",
      "Fur slicker brush",
      "Set of hair clips",
      "Random souvenir gift",
    ],
    bonusTag: "[Half Body & Full Suit Bonus]",
    bonusText:
      "Half Body and Full Suit orders also receive one free torso padding liner set with adjustable straps.",
    timelineEyebrow: "[Project timeline]",
    timelineTitle: ["No guesswork", "on WIPs"],
    timelineDesc:
      "You get photo updates at every milestone before we cut fur or close a seam, so nothing moves forward without your okay.",
    timelineTermsCta: "Commission Terms",
    faqEyebrow: "[Frequently asked questions]",
    faqTitle: ["Got a", "question?"],
    faqDesc:
      "Answers to the questions we get asked the most. And if yours isn't here, write to us: we reply fast.",
    faqAskCta: "Ask a question",
    faqTermsCta: "Read Commission Terms",
    contactEyebrow: "[Contact]",
    contactTitle: ["Ready to start", "a build?"],
    contactIntro:
      "Send over your character ref sheet and the parts you have in mind. Replies arrive within 24h.",
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
    statusBadgeOpen: "[Status: Commissions Open]",
    statusBadgeClosed: "[Status: Commissions Closed]",
    fieldName: "[Name or handle]",
    placeholderName: "Your name or @handle",
    fieldSpecies: "[Character species]",
    placeholderSpecies: "Wolf, Kemono cat, Shiba...",
    fieldEmail: "[Email]",
    placeholderEmail: "you@email.com",
    fieldPhone: "[Phone number]",
    placeholderPhone: "+84 9xx xxx xxx",
    fieldFacebook: "[Facebook name or link]",
    placeholderFacebook: "Your Facebook name or https://facebook.com/...",
    fieldType: "[Commission type]",
    commissionGroups: [
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
          { value: "Half-partial", label: "Half-partial", note: "(head, paws, tail)" },
          { value: "Partial", label: "Partial", note: "(head, paws, tail, feet)" },
        ],
      },
      {
        colsClass: "grid-cols-1 sm:grid-cols-3",
        options: [
          { value: "Only body", label: "Only body", note: "Note: Duct Tape Dummy required" },
          { value: "Half-body", label: "Half-body", note: "Note: Duct Tape Dummy required" },
          { value: "Fullsuit", label: "Fullsuit", note: "Note: Duct Tape Dummy required" },
        ],
      },
    ],
    fieldNotes: "[Ref link & project notes]",
    placeholderNotes:
      "Share your ref sheet link, fur color or add-on notes, and your target timeline...",
    termsNoticeBefore:
      "By sending a commission request, you confirm that you have read and agree to our ",
    termsNoticeLink: "Commission Terms & Policy",
    submitIdle: "Send my request",
    submitSending: "Sending…",
    submitSent: "Thank you! Reply within 24h.",
    submitAnother: "Send another request",
    errorFallback:
      "Could not send your request. Please try again or email FluffNii.furries@gmail.com directly.",
    errorNetwork:
      "Connection error while sending. Please check your network or email FluffNii.furries@gmail.com.",
  },
  vi: {
    heroStatusOpen: "Đang mở slot",
    heroStatusClosed: "Tạm đóng slot",
    heroEyebrow: "Xưởng làm Fursuit thủ công",
    heroTitle: ["Từ bản vẽ", "thành fursuit"],
    heroDesc:
      "Dựng rập, tỉa lông và khâu tay từng chi tiết đúng theo bản vẽ OC của bạn",
    heroContactCta: "Liên hệ",
    heroProjectsCta: "Xem fursuit",
    studioEyebrow: "[Giới thiệu xưởng]",
    phraseText:
      "FluffNii làm những bộ fursuit thoáng khí để bạn thoải mái chạy nhảy cả ngày. Từng mảng màu đều được dựng rập tay, tỉa lông sắc nét theo form mặt và lót vải êm mát bên trong.",
    phraseHighlights1: "thoáng khí, dựng rập tay, tỉa lông sắc nét",
    phraseHighlights2: "thoải mái chạy nhảy, lót vải êm mát",
    formulaEyebrow: "[Công thức của xưởng]",
    formulaAlt: "Quy trình dựng fursuit của FluffNii",
    formulaTitleLines: ["Thiết kế nhân vật +", "Kỹ thuật làm fursuit ="],
    formulaLead:
      "Fursuit giữ trọn nét mặt và dáng OC ngay khi bạn đội lên. Lông ngoài mềm mịn, bên trong luôn thoáng mát.",
    formulaBodyBefore:
      "Mình làm sát theo ref sheet để từng mảng đốm, dáng tai và nếp chuyển màu đều nằm đúng chỗ. Trọng tâm là tỉa lông đều tay, ",
    formulaBodyStrong: "chắc chắn",
    formulaBodyAfter:
      " từng đường khâu và Head đội lâu nhiều giờ mà không bị bí nóng.",
    statBuilt: "(Fursuit & part đã làm)",
    statSpecies: "(Loài & phong cách)",
    statHandmade: "(Làm thủ công)",
    pillarsEyebrow: "[3 thế mạnh cốt lõi trong từng bộ suit]",
    pillars: [
      {
        num: "(001)",
        title: "FORM DÁNG & TỈ LỆ",
        desc: "Base xốp và in 3D được tạo hình cân đối, giữ dáng mặt chuẩn và góc nhìn phía trước rộng thoáng.",
      },
      {
        num: "(002)",
        title: "LÔNG NHẬP CAO CẤP",
        desc: "Lông nhân tạo dày dặn, cắt rập thủ công, may giấu đường chỉ và tỉa sát để lộ rõ mảng màu.",
      },
      {
        num: "(003)",
        title: "LÓT THOÁNG & ÊM ÁI",
        desc: "Vải lót thấm hút mồ hôi kèm khe thông khí ẩn, lưỡi nam châm tháo rời và lớp đệm dễ vệ sinh.",
      },
    ],
    whoEyebrow: "[Dành cho mọi loài]",
    whoTitle: ["Mọi loài vật,", "theo đúng ý bạn"],
    whoDesc:
      "Gấu, sư tử, cáo mèo, cún, shiba... Mỗi bản vẽ có một tỉ lệ riêng, nên xưởng tự dựng từng base thay vì dùng chung một khuôn.",
    fanCards: [
      {
        num: "(001)",
        title: "GẤU",
        desc: "Tai tròn, má bầu và phần mõm mềm tạo dáng đầu ấm áp, đầy đặn.",
        img: "/images/species-bear.jpg",
        objectPosition: "50% 35%",
        bg: "#f5f8fc",
        dark: false,
        rot: -9,
      },
      {
        num: "(002)",
        title: "SƯ TỬ",
        desc: "Chỏm bờm xếp lớp cùng phần chân mày nổi khối tạo vẻ oai vệ ở mọi góc.",
        img: "/images/species-lion.jpg",
        objectPosition: "50% 28%",
        bg: "#ffffff",
        dark: false,
        rot: -4.5,
      },
      {
        num: "(003)",
        title: "CÁO MÈO",
        desc: "Đôi tai cáo lớn ghép cùng mõm mèo ngắn, giữ trọn nét dễ thương chuẩn Kemono.",
        img: "/images/species-foxcat.jpg",
        objectPosition: "50% 20%",
        bg: "#f5f8fc",
        dark: false,
        rot: 0,
      },
      {
        num: "(004)",
        title: "CÚN",
        desc: "Đôi tai vểnh, mõm hếch tinh nghịch cùng chiếc đuôi nảy hợp với OC năng động.",
        img: "/images/species-dog.jpg",
        objectPosition: "50% 38%",
        bg: "#ffffff",
        dark: false,
        rot: 4.5,
      },
      {
        num: "(005)",
        title: "SHIBA INU",
        desc: "Mảng má urajiro rõ nét, tai nhọn và chiếc đuôi cuộn tròn giữ form cực chuẩn.",
        img: "/images/species-shiba.jpg",
        objectPosition: "50% 15%",
        bg: "#1e3557",
        dark: true,
        rot: 9,
      },
    ],
    resultEyebrow: "[Thành phẩm]",
    resultTitle: ["Từ bản vẽ 2D", "bước ra đời thực"],
    resultDesc:
      "Để bộ suit giống hệt bản vẽ, xưởng chăm chút từ tỉ lệ base, độ dày lông tỉa đến từng đường khâu trên mặt.",
    resultCards: [
      {
        num: "(001)",
        title: "CHUẨN SÁT REF",
        desc: "Từng sọc màu, đốm lông hay vết khuyết tai trên ref đều được lên rập và may đúng vị trí.",
      },
      {
        num: "(002)",
        title: "CHẤT KEMONO",
        desc: "Gò má tròn phúng phính cùng đôi mắt 3D follow-me giữ nguyên biểu cảm từ nhiều góc.",
      },
      {
        num: "(003)",
        title: "PHỤ KIỆN NAM CHÂM",
        desc: "Đổi biểu cảm trong vài giây với lưỡi hít nam châm, mí mắt tháo rời và chỏm tóc gắn thêm.",
      },
      {
        num: "(004)",
        title: "THOẢI MÁI VẬN ĐỘNG",
        desc: "Tầm nhìn rộng, khóa kéo ẩn phía sau và lớp lót mát giúp bạn diện thoải mái cả ngày đi fes.",
      },
    ],
    methodEyebrow: "[Quy trình]",
    methodTitle: "Qua ba giai đoạn",
    methodDesc:
      "Mỗi đơn hàng đều đi qua đủ ba công đoạn tại xưởng, luôn gửi ảnh kiểm tra cùng bạn trước khi chuyển bước.",
    methodSteps: [
      {
        tag: "[Bước 01]",
        counter: "(001) / (003)",
        title: "DỰNG BASE & MẮT 3D CÓ HỒN",
        desc: "Tạo hình đầu đối xứng kèm đôi mắt follow-me rộng thoáng, tầm nhìn rõ phía trước và miệng mở lưu thông khí.",
        pills: ["Đối xứng", "Tầm nhìn", "Thoáng khí"],
        img: "/images/method-01.webp",
        bg: "#fff0a6",
        dark: false,
        top: 108,
      },
      {
        tag: "[Bước 02]",
        counter: "(002) / (003)",
        title: "CHỌN LÔNG XỊN & TỈA LÔNG MỊN",
        desc: "Dán rập trực tiếp lên base, cắt rập thủ công từng mảnh lông dày, may kín mối nối và tỉa lộ đường nét khuôn mặt.",
        pills: ["Mềm mịn", "Chuẩn rập", "Sắc nét"],
        img: "/images/method-02.webp",
        bg: "#dce8f5",
        dark: false,
        top: 136,
      },
      {
        tag: "[Bước 03]",
        counter: "(003) / (003)",
        title: "LÓT TRONG ÊM & CÂN FORM CHUẨN",
        desc: "Hoàn thiện lớp lót thấm mồ hôi bên trong đầu, nhồi đệm bàn tay phồng êm và cân chỉnh form vừa khít số đo.",
        pills: ["Thoáng mát", "Vừa vặn", "Bền bỉ"],
        img: "/images/method-03.webp",
        bg: "#1e3557",
        dark: true,
        top: 164,
      },
    ],
    projectsEyebrow: "[Dự án nổi bật]",
    projectsTitle: ["Các dự án", "tiêu biểu"],
    prevProjectAria: "Dự án trước",
    nextProjectAria: "Dự án tiếp theo",
    projects: [
      {
        client: "SY TRAY",
        year: "2026",
        summary:
          "Mini partial Kemono xám tro phối kem với chỏm má cam rực, mắt hổ phách cỡ lớn và Paws trắng bốn ngón có móng.",
        img: "/images/project-01.jpg",
        objectPosition: "50% 35%",
        review:
          "Lông được tỉa rất mịn và đều tay, giữ trọn các góc cạnh trên khuôn mặt mà vẫn mềm mại tự nhiên.",
        author: "Sy tray",
        role: "Chủ sở hữu fursuit",
      },
      {
        client: "MINNY MINNIE",
        year: "2026",
        summary:
          "Partial Kemono trắng tuyết với mắt mèo viền đỏ, dấu kim cương xanh trên trán và Paws phồng đệm xanh da trời.",
        img: "/images/project-02.jpg",
        objectPosition: "50% 45%",
      },
      {
        client: "FELIX ALGORITHM",
        year: "2026",
        summary:
          "Partial cún xanh ngọc phối xanh navy và kem, nổi bật với mắt trái nháy tinh nghịch, lót tai vàng và Paws đồng bộ.",
        img: "/images/project-03.jpg",
        objectPosition: "50% 50%",
        review:
          "Base in 3D TPU dày dặn, dựng riêng đúng theo tạo hình OC của mình. Các mảng màu khó vẫn lên rập chuẩn, đường may máy lẫn khâu tay đều chắc và sắc nét.",
        author: "Felix",
        role: "Chủ sở hữu fursuit",
      },
      {
        client: "HUNTER KNIGHT",
        year: "2026",
        summary:
          "Partial trắng bạc với lớp lông má bồng bềnh nhiều tầng, lọn tóc đỏ đen nổi bật trên đỉnh đầu và đệm Paws xanh nhạt.",
        img: "/images/project-04.jpg",
        objectPosition: "50% 50%",
      },
      {
        client: "UMBRÉON RETSQUÔT",
        year: "2026",
        summary:
          "Canine fursuit đen trắng phối vàng ánh kim với chiếc lưỡi thè tinh nghịch, mắt xanh và dây tết chuông vàng ở tai.",
        img: "/images/project-05.jpg",
        objectPosition: "50% 20%",
        review:
          "Base 3D TPU dày và được dựng thủ công riêng cho từng nhân vật. Những chỗ ghép nhiều màu lông vẫn phẳng và gọn nhờ đường khâu rất chỉn chu.",
        author: "Umbréon Retsquôt",
        role: "Chủ sở hữu fursuit",
      },
    ],
    galleryEyebrow: "[Thư viện ảnh]",
    galleryTitle: "Góc trưng bày fursuit",
    galleryDesc:
      "Những mẫu Head, Partial, Fullsuit, Paws hoàn thiện và ảnh WIP tại xưởng. Rê chuột vào hàng để xem chậm hơn.",
    galleryWords: [
      "HEADS",
      "PARTIALS",
      "FULLSUITS",
      "PAWS & TAILS",
      "COMMISSIONS",
    ],
    offersEyebrow: "[Bảng giá & Gói]",
    offersTitle: "Làm riêng cho OC của bạn",
    offersDesc:
      "Bạn có thể đặt riêng một chiếc Head, hoặc ghép Paws và Tail cắt từ cùng cuộn lông đồng màu.",
    offer1Tag: "[Gói 01]",
    offer1Alt: "Custom Fursuit Head",
    offer1Title: "Custom Fursuit Head",
    offer1Desc:
      "Chỉ riêng phần Head, dựng trên base cứng và mõm mềm linh hoạt, đã bao gồm 2 màu lông cơ bản.",
    offer1Bullets: [
      "Base cứng + mõm mềm linh hoạt (Full TPU tính phụ phí riêng)",
      "Gồm lớp lót Head/cổ, lưỡi tháo rời và mí mắt dán Velcro",
      "Bao gồm 2 màu lông cơ bản (+$35 / 600K VNĐ mỗi màu thêm)",
      "Tùy chọn thêm: mí nam châm (+$15), quạt (+$30), tóc rời (+$70)",
      "Quà tặng kèm: lưỡi Velcro, lược chải lông, kẹp tóc & quà lưu niệm",
    ],
    offer1Price: "Từ 8.400.000+ VNĐ",
    offer1Usd: "$480+ USD",
    offer1Sub: "2 màu cơ bản · base cứng + mõm mềm",
    offer2Tag: "[Gói 02]",
    offer2Alt: "Half Body & Fullsuit",
    offer2Title: "Half Body & Fullsuit",
    offer2Desc:
      "Trọn bộ nhân vật gồm Head, Paws, Feet, Tail cùng phần Half Body hoặc Fullsuit cắt từ cùng một lô lông.",
    offer2Bullets: [
      "Gồm Head, Paws, Feet, Tail và Half Body hoặc Fullsuit với 2 màu cơ bản",
      "Paws ($100+ / 1,750K+): dài 35 cm, móng vải, squeaker, lót kín",
      "Tail ($90+ / 1,500K+): dài 70 cm, tùy chọn khung & hyper motion",
      "Feet ($150 / 2,600K): Outdoor feet ngón PETG, xốp định hình, dép 1 size",
      "Đơn Half Body & Fullsuit tặng thêm bộ lót đệm thân có dây đai chỉnh",
    ],
    offer2Price: "Từ 26.200.000 VNĐ",
    offer2Usd: "$1,500 USD (Fullsuit $2,000 / 35M VNĐ)",
    offer2Sub: "Fullsuit thêm màu lông +$100 / 1,750K VNĐ",
    furNotice:
      "Studio sử dụng vải lông Châu Á làm tiêu chuẩn. Lông Mofu, lông kem, Limey và các loại lông Châu lục khác tính thêm phí.",
    priceSheetEyebrow: "[Bảng giá chi tiết · 6 hạng mục đặt làm]",
    packages: [
      {
        title: "HEAD",
        rows: [
          { label: "Lông · Khung", value: "2 MÀU · CỨNG+MỀM" },
          { label: "Full TPU", value: "PHỤ PHÍ RIÊNG" },
          { label: "Mí nam châm", value: "+$15 / 200K" },
          { label: "Thêm màu lông", value: "+$35 / 600K" },
          { label: "Quạt tản nhiệt", value: "+$30 / 525K" },
          { label: "Tóc rời tháo lắp", value: "+$70 / 1.200K" },
        ],
        note: "Bao gồm lớp lót Head/cổ, lưỡi tháo rời và mí mắt gắn Velcro.",
        price: "8.400.000+ VNĐ",
        usdPrice: "$480+ USD",
        bg: "#fff0a6",
        img: "/images/offer-01.webp",
        imgPos: "50% 35%",
        rot: -4,
      },
      {
        title: "PAWS",
        rows: [
          { label: "Lông · Chiều dài", value: "1 MÀU · 35 CM" },
          { label: "Tiêu chuẩn", value: "MÓNG + SQUEAKER" },
          { label: "Thiết kế 5 ngón", value: "+$15 / 250K" },
          { label: "Thêm màu lông", value: "+$20 / 350K" },
          { label: "Khe thoát ngón", value: "+$20 / 350K" },
        ],
        note: "Bao gồm móng bằng vải, còi phát tiếng kêu (squeaker) và lót toàn bộ bên trong.",
        price: "1.750.000+ VNĐ",
        usdPrice: "$100+ USD",
        bg: "#dce8f5",
        img: "/images/gallery-r2-05.webp",
        imgPos: "50% 50%",
        rot: 3,
      },
      {
        title: "TAIL",
        rows: [
          { label: "Lông · Chiều dài", value: "1 MÀU · 70 CM" },
          { label: "Tail cá / rồng / dài", value: "BÁO GIÁ RIÊNG" },
          { label: "Thêm màu lông", value: "+$25 / 400K" },
          { label: "Khung tạo dáng", value: "+$15 / 300K" },
          { label: "Hyper motion", value: "+$20–50 / 350–850K" },
          { label: "Khóa kéo vệ sinh", value: "+$10 / 175K" },
        ],
        note: "Tăng chiều dài tính phụ phí riêng; Tail cá hoặc Tail rồng báo giá theo thiết kế.",
        price: "1.500.000+ VNĐ",
        usdPrice: "$90+ USD",
        bg: "#f5f8fc",
        img: "/images/polaroid-03.webp",
        imgPos: "50% 35%",
        rot: -3,
      },
      {
        title: "FEET",
        rows: [
          { label: "Lông · Dép lót", value: "1 MÀU · ONE SIZE" },
          { label: "Thêm màu lông", value: "+$30 / 500K" },
          { label: "Indoor feet", value: "+$20 / 350K" },
          { label: "Indoor / Outdoor swap", value: "+$85 / 1.450K" },
        ],
        note: "Outdoor feet có ngón PETG, móng vải, xốp định hình và lót kín.",
        price: "2.600.000 VNĐ",
        usdPrice: "$150 USD",
        bg: "#f5f8fc",
        img: "/images/gallery-r2-07.webp",
        imgPos: "50% 60%",
        rot: 3,
      },
      {
        title: "HALF BODY",
        rows: [
          { label: "Màu lông cơ bản", value: "2 MÀU" },
          { label: "Hạng mục kèm theo", value: "HEAD · PAWS · FEET" },
          { label: "Body & Tail", value: "TAIL + HALF BODY" },
          { label: "Quà tặng kèm", value: "BỘ LÓT ĐỆM THÂN" },
        ],
        note: "Gồm Head, Paws, Feet, Tail, Half Body và tặng kèm bộ lót đệm dây đai.",
        price: "26.200.000 VNĐ",
        usdPrice: "$1,500 USD",
        bg: "#dce8f5",
        img: "/images/gallery-r2-08.webp",
        imgPos: "50% 25%",
        rot: -3,
      },
      {
        title: "FULLSUIT",
        rows: [
          { label: "Màu lông cơ bản", value: "2 MÀU" },
          { label: "Hạng mục kèm theo", value: "HEAD · PAWS · FEET" },
          { label: "Body & Tail", value: "TAIL + FULLSUIT" },
          { label: "Thêm màu lông", value: "+$100 / 1.750K" },
        ],
        note: "Gồm Head, Paws, Feet, Tail, Fullsuit và tặng bộ lót đệm dây đai.",
        price: "35.000.000 VNĐ",
        usdPrice: "$2,000 USD",
        bg: "#fff0a6",
        img: "/images/project-04.jpg",
        imgPos: "50% 28%",
        rot: 4,
      },
    ],
    extraOptionsEyebrow: "[Các lựa chọn bổ sung & Vải lông]",
    extraOptionsTag: "[Mở rộng]",
    extraOptions: [
      { label: "Tóc rời có thể tháo ra", value: "+$70 / 1.200.000 VNĐ" },
      { label: "Phụ kiện (sừng, cánh, v.v.)", value: "Liên hệ để được báo giá" },
      {
        label: "Vải lông Châu Á & nhập khẩu",
        value:
          "Studio dùng vải lông Châu Á. Lông Mofu, lông kem, Limey và lông khu vực khác đều tính thêm phí.",
      },
    ],
    freeGiftsEyebrow: "[Quà tặng miễn phí]",
    freeGiftsTag: "[Mỗi đơn hàng]",
    freeGifts: [
      "Lưỡi tháo rời gắn Velcro",
      "Lược chải lông",
      "Một bộ kẹp tóc",
      "Quà lưu niệm ngẫu nhiên",
    ],
    bonusTag: "[Tặng thêm cho Half Body & Fullsuit]",
    bonusText:
      "Đối với đơn Half Body và Fullsuit, khách hàng được tặng thêm một bộ lót đệm thân có dây đai điều chỉnh để đeo.",
    timelineEyebrow: "[Tiến độ thực hiện]",
    timelineTitle: ["Cập nhật rõ", "từng bước làm"],
    timelineDesc:
      "Xưởng luôn gửi ảnh tiến độ qua từng mốc trước khi cắt lông hay khâu kín, nên mọi bước đều có xác nhận từ bạn.",
    timelineTermsCta: "Điều khoản",
    faqEyebrow: "[Câu hỏi thường gặp]",
    faqTitle: ["Bạn cần", "hỏi thêm?"],
    faqDesc:
      "Tổng hợp những thắc mắc hay gặp trước khi đặt đơn. Nếu câu hỏi của bạn chưa có ở đây, cứ nhắn thẳng cho xưởng nhé.",
    faqAskCta: "Đặt câu hỏi",
    faqTermsCta: "Xem điều khoản",
    contactEyebrow: "[Liên hệ]",
    contactTitle: ["Sẵn sàng đặt", "fursuit mới?"],
    contactIntro:
      "Gửi giúp mình ảnh ref sheet nhân vật cùng các hạng mục bạn muốn đặt. Tin nhắn được phản hồi trong vòng 24 giờ.",
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
    statusBadgeOpen: "[Trạng thái: Đang mở slot]",
    statusBadgeClosed: "[Trạng thái: Tạm đóng slot]",
    fieldName: "[Tên hoặc nickname]",
    placeholderName: "Tên của bạn hoặc @handle",
    fieldSpecies: "[Loài nhân vật]",
    placeholderSpecies: "Sói, Mèo Kemono, Shiba...",
    fieldEmail: "[Email]",
    placeholderEmail: "you@email.com",
    fieldPhone: "[Số điện thoại]",
    placeholderPhone: "+84 9xx xxx xxx",
    fieldFacebook: "[Tên hoặc link Facebook]",
    placeholderFacebook: "Tên Facebook hoặc https://facebook.com/...",
    fieldType: "[Loại đơn muốn đặt]",
    commissionGroups: [
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
          { value: "Half-partial", label: "Half-partial", note: "(đầu, tay, đuôi)" },
          { value: "Partial", label: "Partial", note: "(đầu, tay, đuôi, chân)" },
        ],
      },
      {
        colsClass: "grid-cols-1 sm:grid-cols-3",
        options: [
          { value: "Only body", label: "Only body", note: "Lưu ý: Cần có Duct Tape Dummy" },
          { value: "Half-body", label: "Half-body", note: "Lưu ý: Cần có Duct Tape Dummy" },
          { value: "Fullsuit", label: "Fullsuit", note: "Lưu ý: Cần có Duct Tape Dummy" },
        ],
      },
    ],
    fieldNotes: "[Thông tin khác và ref link]",
    placeholderNotes:
      "Gửi link ref sheet, ghi chú màu lông hoặc phụ kiện, và thời gian dự kiến nhận fursuit...",
    termsNoticeBefore:
      "Khi gửi yêu cầu báo giá, bạn xác nhận đã đọc và đồng ý với ",
    termsNoticeLink: "Điều khoản & Chính sách Commission",
    submitIdle: "Gửi yêu cầu báo giá",
    submitSending: "Đang gửi…",
    submitSent: "Đã nhận đơn! Phản hồi trong 24h.",
    submitAnother: "Gửi thêm yêu cầu khác",
    errorFallback:
      "Không gửi được yêu cầu. Vui lòng thử lại hoặc gửi thẳng tới FluffNii.furries@gmail.com.",
    errorNetwork:
      "Lỗi kết nối khi gửi biểu mẫu. Vui lòng kiểm tra mạng hoặc gửi trực tiếp tới FluffNii.furries@gmail.com.",
  },
};
