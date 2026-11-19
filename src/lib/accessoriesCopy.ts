import type { Lang } from "@/components/LanguageProvider";

export type AccessoryChapterKey =
  | "cooling"
  | "eyewear"
  | "charms";

export type BlueprintVariant = "muzzle-fan" | "dual-fan" | "badge-clip";

export interface AccessoryItem {
  id: string;
  code: string;
  name: string;
  chapter: AccessoryChapterKey;
  chapterLabel: string;
  priceVnd: number | null;
  priceLabel: string;
  note: string;
  leadTime: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: string;
  blueprint?: BlueprintVariant;
  imageAlt: string;
  description: string;
  featured?: boolean;
}

export interface AccessoriesLocaleCopy {
  eyebrow: string;
  headlineLines: [string, string];
  heroDesc: string;
  partnerNote: string;
  workshopNotes: { num: string; title: string; detail: string }[];
  estimatorLabel: string;
  itemSingular: string;
  itemPlural: string;
  estimatorEmpty: string;
  estimatedTotalLabel: string;
  subtotalPlusQuoted: (subtotal: string) => string;
  currencyNote: string;
  byQuote: string;
  zeroPrice: string;
  bundleCta: string;
  bundleHeader: string;
  orderCta: string;
  copiedList: string;
  copyList: string;
  clearList: string;
  clipboardBlockedPrompt: string;
  closeFallbackAria: string;
  stickyReviewLabel: string;
  stickyReviewAria: string;
  piecesLabel: string;
  inListLabel: (qty: number) => string;
  pickedLabel: (qty: number) => string;
  addToEstimate: string;
  previewAria: (name: string) => string;
  removeOneAria: (name: string) => string;
  addOneAria: (name: string) => string;
  decreaseAria: (name: string) => string;
  increaseAria: (name: string) => string;
  removeItemAria: (name: string) => string;
  closePreviewAria: string;
  contactEyebrow: string;
  contactTitle: string;
  contactDesc: string;
  contactPartnerNote: string;
  readyForDm: (count: number) => string;
  copiedShort: string;
  emailFallbackLabel: string;
  emailFallbackSubject: string;
  dmHeader: string;
  dmSubtotalQuoted: (subtotal: string) => string;
  dmSubtotalExact: (subtotal: string) => string;
  dmSubtotalByQuote: string;
  blueprintBadges: Record<BlueprintVariant, string>;
  chapters: { num: string; key: AccessoryChapterKey; title: string; subtitle: string }[];
  items: AccessoryItem[];
}

export function formatVnd(amount: number, lang: Lang): string {
  return lang === "vi"
    ? `${amount.toLocaleString("vi-VN")} VNĐ`
    : `${amount.toLocaleString("en-US")} VND`;
}

export const ACCESSORIES_COPY: Record<Lang, AccessoriesLocaleCopy> = {
  en: {
    eyebrow: "[Accessories & 3D prints]",
    headlineLines: ["Cooling gear,", "glasses & props."],
    heroDesc:
      "3D-printed fans, oversized glasses, horns, and ear charms proportioned for fursuit heads. Pick what you need below, then bundle your list into a suit quote or send it straight to @CrossTalk_f.",
    partnerNote:
      "@CrossTalk_f handles 3D printing and wearable add-ons for FluffNii Studio. You can order pieces on their own by DMing @CrossTalk_f, or bundle your picks into a fursuit quote on the main page.",
    workshopNotes: [
      {
        num: "(001)",
        title: "Made to order",
        detail: "Printed in small batches with your filament colors, frame widths, and mount style.",
      },
      {
        num: "(002)",
        title: "Built for suits",
        detail:
          "Bridges and mounts leave room for thick faux fur and Kemono eye spacing so gear stays put at cons.",
      },
      {
        num: "(003)",
        title: "Bundle or direct DM",
        detail:
          "Put together a quick list here, then attach it to a fursuit quote or DM @CrossTalk_f.",
      },
    ],
    estimatorLabel: "[Price estimator]",
    itemSingular: "item",
    itemPlural: "items",
    estimatorEmpty:
      "Pick items from the catalog to estimate your list, or scroll down to message @CrossTalk_f.",
    estimatedTotalLabel: "[Estimated total]",
    subtotalPlusQuoted: (subtotal) => `${subtotal} + quoted`,
    currencyNote: "Prices shown in VND (USD total quoted when you DM).",
    byQuote: "By quote",
    zeroPrice: "0 VND",
    bundleCta: "Bundle with Fursuit Quote",
    bundleHeader: "Bundled accessories",
    orderCta: "Order standalone (@CrossTalk_f)",
    copiedList: "Copied item list",
    copyList: "Copy item list",
    clearList: "Clear",
    clipboardBlockedPrompt: "Clipboard is blocked in this browser. Copy the text below manually.",
    closeFallbackAria: "Close copy box",
    stickyReviewLabel: "View list",
    stickyReviewAria: "Scroll to price estimator",
    piecesLabel: "pieces",
    inListLabel: (qty) => `In list (${qty})`,
    pickedLabel: (qty) => `${qty} picked`,
    addToEstimate: "Add to estimate",
    previewAria: (name) => `Preview ${name}`,
    removeOneAria: (name) => `Remove one ${name}`,
    addOneAria: (name) => `Add one more ${name}`,
    decreaseAria: (name) => `Decrease quantity for ${name}`,
    increaseAria: (name) => `Increase quantity for ${name}`,
    removeItemAria: (name) => `Remove ${name}`,
    closePreviewAria: "Close preview",
    contactEyebrow: "[Contact @CrossTalk_f]",
    contactTitle: "Ready to order?",
    contactDesc:
      "Send your item list to @CrossTalk_f on any channel below. Include your head measurements or filament color notes if you already have them.",
    contactPartnerNote:
      "@CrossTalk_f prints and builds accessories separately for FluffNii Studio. Want to include these with a full suit build instead? Use Bundle with Fursuit Quote or email us below.",
    readyForDm: (count) =>
      `[Ready to paste in DM · ${count} ${count === 1 ? "item" : "items"}]`,
    copiedShort: "Copied",
    emailFallbackLabel: "Prefer email? Write to",
    emailFallbackSubject: "Accessories Inquiry - FluffNii Studio",
    dmHeader: "FluffNii Accessories Inquiry:",
    dmSubtotalQuoted: (subtotal) => `Estimated subtotal: ${subtotal} + quoted`,
    dmSubtotalExact: (subtotal) => `Estimated subtotal: ${subtotal}`,
    dmSubtotalByQuote: "Estimated subtotal: By quote",
    blueprintBadges: {
      "muzzle-fan": "5V USB-C · 40MM",
      "dual-fan": "DUAL AIRFLOW KIT",
      "badge-clip": "NO-PIN MAGNETIC",
    },
    chapters: [
      {
        num: "01",
        key: "cooling",
        title: "Cooling & 3D Prints",
        subtitle:
          "3D-printed airflow fans and hollow horns made for long con days.",
      },
      {
        num: "02",
        key: "eyewear",
        title: "Eyewear & Head Props",
        subtitle:
          "Wide-bridge glasses, magnetic eyelids, and fangs proportioned for Kemono heads.",
      },
      {
        num: "03",
        key: "charms",
        title: "Charms & Wearables",
        subtitle:
          "Braided ear cords, lightweight cuffs, and magnetic badge holders that leave fur unharmed.",
      },
    ],
    items: [
      {
        id: "muzzle-intake-fan",
        code: "01",
        name: "Muzzle Intake Fan (3D)",
        chapter: "cooling",
        chapterLabel: "Cooling & 3D Prints",
        priceVnd: null,
        priceLabel: "By quote",
        note: "USB-C · PETG / PLA+ housing",
        leadTime: "1 week",
        blueprint: "muzzle-fan",
        imageAlt:
          "Schematic drawing of a single 3D-printed fursuit muzzle cooling fan",
        description:
          "Quiet fan inside a rounded 3D-printed shroud that tucks right behind the mouth mesh, pulling fresh air in without buzzing in your face.",
        featured: true,
      },
      {
        id: "dual-neck-fan",
        code: "02",
        name: "Dual-Fan Visor Kit (3D)",
        chapter: "cooling",
        chapterLabel: "Cooling & 3D Prints",
        priceVnd: null,
        priceLabel: "By quote",
        note: "Dual rotor · custom mount",
        leadTime: "1–2 weeks",
        blueprint: "dual-fan",
        imageAlt:
          "Schematic drawing of a dual 3D-printed cooling fan kit for fursuit heads",
        description:
          "Two slim blowers angled past the eyes and cheeks to push warm air out and keep lenses from fogging up.",
      },
      {
        id: "custom-horns",
        code: "03",
        name: "Custom 3D Horns Pair",
        chapter: "cooling",
        chapterLabel: "Cooling & 3D Prints",
        priceVnd: null,
        priceLabel: "By quote",
        note: "TPU or PLA+ · magnetic or sewn",
        leadTime: "2–3 weeks",
        image: "/images/gallery-r2-02.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 20%",
        imageAlt: "Sky-blue Kemono head wearing black curved 3D printed horns",
        description:
          "Hollow 3D-printed horns scaled from your character sheet so they stay light on the forehead and do not tip the head forward.",
      },
      {
        id: "fursuit-glasses",
        code: "04",
        name: "Oversized Fursuit Glasses",
        chapter: "eyewear",
        chapterLabel: "Eyewear & Head Props",
        priceVnd: 450000,
        priceLabel: "450,000 VND",
        note: "Matte white, black, or custom",
        leadTime: "1–2 weeks",
        image: "/images/gallery-r1-04.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 22%",
        imageAlt: "Cyan fursuit head wearing oversized matte white round glasses",
        description:
          "Wide-bridge matte rims shaped to sit comfortably over fluffy Kemono cheeks without squashing or pinching the fur underneath.",
        featured: true,
      },
      {
        id: "magnetic-tongue-lids",
        code: "05",
        name: "Magnetic Tongue & Lids",
        chapter: "eyewear",
        chapterLabel: "Eyewear & Head Props",
        priceVnd: 350000,
        priceLabel: "350,000 VND",
        note: "1 blep tongue + 1 eyelid pair",
        leadTime: "1–2 weeks",
        image: "/images/result-02.webp",
        imageWidth: 960,
        imageHeight: 1280,
        imagePosition: "center 22%",
        imageAlt:
          "Cyan fursuit head wearing magnetic half-lids and a pink blep tongue",
        description:
          "Snap on sleepy half-lids or a blep tongue between con photos in seconds with hidden magnets that hold firm while you move.",
      },
      {
        id: "add-teeth-fangs",
        code: "06",
        name: "Add Teeth & Fangs",
        chapter: "eyewear",
        chapterLabel: "Eyewear & Head Props",
        priceVnd: 150000,
        priceLabel: "150,000 VND",
        note: "Base add-on rate · standalone or suit add-on",
        leadTime: "1–2 weeks",
        image: "/images/offer-01.webp",
        imageWidth: 684,
        imageHeight: 548,
        imagePosition: "center 40%",
        imageAlt: "Grey and orange Kemono fox head showing white upper fangs",
        description:
          "Felt, minky, or resin fangs shaped for Kemono mouths with sewn or magnet mounts. Order custom-sized parts for an existing suit or add them to your FluffNii head.",
      },
      {
        id: "braided-ear-cord",
        code: "07",
        name: "Braided Ear Cord & Bell",
        chapter: "charms",
        chapterLabel: "Charms & Wearables",
        priceVnd: 420000,
        priceLabel: "420,000 VND",
        note: "Cord + gold cuff + bell",
        leadTime: "1–2 weeks",
        image: "/images/gallery-r2-03.webp",
        imageWidth: 840,
        imageHeight: 1050,
        imagePosition: "center 18%",
        imageAlt:
          "Black and yellow Shiba head wearing red-white braided ear cord, gold bell, and cuff",
        description:
          "Hand-braided satin cord, jingle bell, and ear wrap that anchor snugly at the ear base without pulling or matting faux fur.",
        featured: true,
      },
      {
        id: "ear-charms-piercings",
        code: "08",
        name: "Ear Piercings & Charms",
        chapter: "charms",
        chapterLabel: "Charms & Wearables",
        priceVnd: 280000,
        priceLabel: "280,000 VND",
        note: "Clip-on, hoop, or sewn rings",
        leadTime: "1 week",
        image: "/images/polaroid-02.webp",
        imageWidth: 684,
        imageHeight: 684,
        imagePosition: "center 24%",
        imageAlt: "Orange and grey cat fursuit head with gold cross ear charms",
        description:
          "Featherweight pendants and ear cuffs balanced so decorated ears stay perked upright instead of drooping forward.",
      },
      {
        id: "magnetic-badge-clip",
        code: "09",
        name: "Magnetic Badge Holder (3D)",
        chapter: "charms",
        chapterLabel: "Charms & Wearables",
        priceVnd: null,
        priceLabel: "By quote",
        note: "Fur-safe magnet mount",
        leadTime: "1 week",
        blueprint: "badge-clip",
        imageAlt:
          "Schematic drawing of a 3D-printed magnetic badge clip for fursuits",
        description:
          "3D-printed con badge frame paired with a strong rear magnet plate so heavy badges stay put without poking pin holes in your fur.",
      },
    ],
  },
  vi: {
    eyebrow: "[Phụ kiện & In 3D]",
    headlineLines: ["Quạt tản nhiệt,", "kính & phụ kiện."],
    heroDesc:
      "Quạt làm mát in 3D, kính ngoại cỡ, sừng và khuyên tai được canh kích thước riêng cho đầu fursuit. Bạn cứ nhặt món mình cần vào danh sách, rồi gửi kèm đơn đặt suit hoặc nhắn thẳng cho @CrossTalk_f bên dưới.",
    partnerNote:
      "@CrossTalk_f là bên phụ trách in 3D và làm phụ kiện đi kèm cho xưởng mình. Nếu chỉ mua lẻ phụ kiện, bạn nhắn trực tiếp cho @CrossTalk_f, còn đặt chung với suit thì cứ ghép thẳng vào form báo giá ở trang chủ.",
    workshopNotes: [
      {
        num: "(001)",
        title: "In theo từng đơn",
        detail: "Chỉnh màu nhựa, độ rộng gọng và ngàm quạt riêng theo từng mẫu thay vì đổ khuôn đại trà.",
      },
      {
        num: "(002)",
        title: "Canh vừa đầu fursuit",
        detail:
          "Chừa sẵn độ dày lông và khoảng cách mắt Kemono để đeo cả ngày đi fes không cấn hay tuột.",
      },
      {
        num: "(003)",
        title: "Mua lẻ hay ghép đơn đều được",
        detail:
          "Chọn vài món vào bảng tạm tính, rồi gửi kèm form báo giá Fursuit hoặc nhắn thẳng cho @CrossTalk_f.",
      },
    ],
    estimatorLabel: "[Bảng tạm tính]",
    itemSingular: "món",
    itemPlural: "món",
    estimatorEmpty:
      "Chọn vài món trong danh mục để nhẩm tổng chi phí, hoặc kéo xuống nhắn trực tiếp.",
    estimatedTotalLabel: "[Tạm tính tổng cộng]",
    subtotalPlusQuoted: (subtotal) => `${subtotal} + báo giá riêng`,
    currencyNote: "Giá niêm yết theo VNĐ (đơn quốc tế sẽ báo giá quy đổi USD khi nhắn tin).",
    byQuote: "Báo giá riêng",
    zeroPrice: "0 VNĐ",
    bundleCta: "Gửi kèm form báo giá Fursuit",
    bundleHeader: "Phụ kiện gửi kèm",
    orderCta: "Đặt lẻ qua @CrossTalk_f",
    copiedList: "Đã copy danh sách",
    copyList: "Copy danh sách gửi DM",
    clearList: "Xóa hết",
    clipboardBlockedPrompt: "Trình duyệt đang chặn tự động copy. Bạn chọn và sao chép đoạn chữ bên dưới nhé.",
    closeFallbackAria: "Đóng khung sao chép",
    stickyReviewLabel: "Xem bảng",
    stickyReviewAria: "Cuộn lên bảng tạm tính",
    piecesLabel: "món",
    inListLabel: (qty) => `Đã chọn (${qty})`,
    pickedLabel: (qty) => `Đã chọn ${qty}`,
    addToEstimate: "Thêm vào tạm tính",
    previewAria: (name) => `Xem lớn ${name}`,
    removeOneAria: (name) => `Bớt một ${name}`,
    addOneAria: (name) => `Thêm một ${name}`,
    decreaseAria: (name) => `Giảm số lượng ${name}`,
    increaseAria: (name) => `Tăng số lượng ${name}`,
    removeItemAria: (name) => `Bỏ ${name}`,
    closePreviewAria: "Đóng xem trước",
    contactEyebrow: "[Liên hệ @CrossTalk_f]",
    contactTitle: "Đặt phụ kiện ngay?",
    contactDesc:
      "Nhắn trực tiếp cho @CrossTalk_f qua một trong các kênh bên dưới kèm danh sách món bạn chọn, số đo đầu hoặc màu nhựa bạn thích.",
    contactPartnerNote:
      "@CrossTalk_f là đối tác in 3D và phụ kiện của xưởng mình. Nếu muốn gộp chung với đơn làm suit thì bấm nút Gửi kèm form báo giá Fursuit, hoặc gửi mail trực tiếp bên dưới.",
    readyForDm: (count) => `[Sẵn sàng gửi DM · ${count} món]`,
    copiedShort: "Đã copy",
    emailFallbackLabel: "Muốn gửi email thì nhắn tới",
    emailFallbackSubject: "Hỏi đặt phụ kiện - FluffNii Studio",
    dmHeader: "Danh sách đặt phụ kiện FluffNii:",
    dmSubtotalQuoted: (subtotal) => `Tạm tính: ${subtotal} + báo giá riêng`,
    dmSubtotalExact: (subtotal) => `Tạm tính: ${subtotal}`,
    dmSubtotalByQuote: "Tạm tính: Báo giá riêng theo mẫu",
    blueprintBadges: {
      "muzzle-fan": "5V USB-C · 40MM",
      "dual-fan": "QUẠT KÉP TẢN NHIỆT",
      "badge-clip": "NAM CHÂM KHÔNG ĐÂM LÔNG",
    },
    chapters: [
      {
        num: "01",
        key: "cooling",
        title: "Quạt & In 3D",
        subtitle:
          "Quạt hút gió nhỏ gọn và cặp sừng nhẹ đầu, giữ cho bạn thoáng mát khi đội lâu.",
      },
      {
        num: "02",
        key: "eyewear",
        title: "Kính & Đạo cụ Head",
        subtitle:
          "Kính cầu rộng, mí mắt nam châm và răng nanh canh vừa cho phom mặt Kemono.",
      },
      {
        num: "03",
        key: "charms",
        title: "Khuyên & Phụ kiện đeo",
        subtitle:
          "Dây tết chuông đeo tai, khuyên nhẹ và kẹp bảng tên nam châm giữ lớp lông luôn nguyên vẹn.",
      },
    ],
    items: [
      {
        id: "muzzle-intake-fan",
        code: "01",
        name: "Quạt hút gió mõm (In 3D)",
        chapter: "cooling",
        chapterLabel: "Quạt & In 3D",
        priceVnd: null,
        priceLabel: "Báo giá riêng",
        note: "USB-C · Vỏ PETG / PLA+",
        leadTime: "1 tuần",
        blueprint: "muzzle-fan",
        imageAlt: "Bản vẽ quạt hút gió gắn mõm fursuit in 3D",
        description:
          "Quạt chạy êm bọc vỏ in 3D bo tròn, giấu gọn ngay sau lưới miệng để hút gió mát vào mà không kêu rè ngay trước mũi.",
        featured: true,
      },
      {
        id: "dual-neck-fan",
        code: "02",
        name: "Bộ quạt đôi hốc mắt (In 3D)",
        chapter: "cooling",
        chapterLabel: "Quạt & In 3D",
        priceVnd: null,
        priceLabel: "Báo giá riêng",
        note: "Quạt kép · Ngàm canh theo đầu",
        leadTime: "1–2 tuần",
        blueprint: "dual-fan",
        imageAlt: "Bản vẽ bộ quạt đôi làm mát in 3D cho Head fursuit",
        description:
          "Hai quạt mỏng thổi lướt qua vùng mắt và má, đẩy hơi nóng ra ngoài để tròng mắt hay kính đeo không bị đọng sương.",
      },
      {
        id: "custom-horns",
        code: "03",
        name: "Cặp sừng in 3D theo mẫu",
        chapter: "cooling",
        chapterLabel: "Quạt & In 3D",
        priceVnd: null,
        priceLabel: "Báo giá riêng",
        note: "TPU hoặc PLA+ · Nam châm / khâu",
        leadTime: "2–3 tuần",
        image: "/images/gallery-r2-02.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 20%",
        imageAlt: "Head fursuit Kemono xanh dương đeo cặp sừng cong in 3D màu đen",
        description:
          "Sừng in rỗng ruột dựng đúng tỷ lệ theo ref sheet, rất nhẹ nên gắn lên trán không bị nặng đầu hay xô lệch phom.",
      },
      {
        id: "fursuit-glasses",
        code: "04",
        name: "Kính gọng lớn Fursuit",
        chapter: "eyewear",
        chapterLabel: "Kính & Đạo cụ Head",
        priceVnd: 450000,
        priceLabel: "450.000 VNĐ",
        note: "Trắng lì, đen hoặc phối màu",
        leadTime: "1–2 tuần",
        image: "/images/gallery-r1-04.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 22%",
        imageAlt: "Head fursuit xanh dương đeo kính tròn trắng ngoại cỡ",
        description:
          "Gọng kính nhẹ với phần cầu rộng, nằm vừa vặn qua hai bên má bông phồng của dáng Kemono mà không ép bẹp hay kẹp lông.",
        featured: true,
      },
      {
        id: "magnetic-tongue-lids",
        code: "05",
        name: "Lưỡi & Mí mắt nam châm",
        chapter: "eyewear",
        chapterLabel: "Kính & Đạo cụ Head",
        priceVnd: 350000,
        priceLabel: "350.000 VNĐ",
        note: "1 lưỡi thè + 1 cặp mí mắt",
        leadTime: "1–2 tuần",
        image: "/images/result-02.webp",
        imageWidth: 960,
        imageHeight: 1280,
        imagePosition: "center 22%",
        imageAlt: "Head fursuit xanh với mí mắt nam châm và lưỡi hồng",
        description:
          "Đổi biểu cảm lười nhác hay lém lỉnh giữa buổi chụp chỉ trong vài giây nhờ nam châm ẩn hút chắc, chạy nhảy cũng không rớt.",
      },
      {
        id: "add-teeth-fangs",
        code: "06",
        name: "Gắn thêm răng nanh",
        chapter: "eyewear",
        chapterLabel: "Kính & Đạo cụ Head",
        priceVnd: 150000,
        priceLabel: "150.000 VNĐ",
        note: "Giá cơ bản · mua lẻ hoặc gắn khi làm Head",
        leadTime: "1–2 tuần",
        image: "/images/offer-01.webp",
        imageWidth: 684,
        imageHeight: 548,
        imagePosition: "center 40%",
        imageAlt: "Head cáo Kemono xám cam lộ cặp răng nanh trắng",
        description:
          "Răng nanh bằng nỉ, minky hoặc resin cắt gọt vừa khuôn miệng Kemono, khâu cố định hoặc gắn nam châm. Bạn có thể đặt lẻ cho suit có sẵn hoặc gắn luôn khi làm Head mới tại xưởng mình.",
      },
      {
        id: "braided-ear-cord",
        code: "07",
        name: "Dây tết & Chuông đeo tai",
        chapter: "charms",
        chapterLabel: "Khuyên & Phụ kiện đeo",
        priceVnd: 420000,
        priceLabel: "420.000 VNĐ",
        note: "Dây tết + vòng vàng + chuông",
        leadTime: "1–2 tuần",
        image: "/images/gallery-r2-03.webp",
        imageWidth: 840,
        imageHeight: 1050,
        imagePosition: "center 18%",
        imageAlt: "Head fursuit Shiba đen vàng đeo dây tết đỏ trắng và chuông vàng",
        description:
          "Dây satin tết tay kèm vòng vàng và chuông nhỏ, ôm gọn chân tai vừa chắc chắn vừa không làm rối hay xơ lớp lông.",
        featured: true,
      },
      {
        id: "ear-charms-piercings",
        code: "08",
        name: "Khuyên tai & Phụ kiện kẹp",
        chapter: "charms",
        chapterLabel: "Khuyên & Phụ kiện đeo",
        priceVnd: 280000,
        priceLabel: "280.000 VNĐ",
        note: "Kẹp, khoen tròn hoặc khâu",
        leadTime: "1 tuần",
        image: "/images/polaroid-02.webp",
        imageWidth: 684,
        imageHeight: 684,
        imagePosition: "center 24%",
        imageAlt: "Head mèo fursuit xám cam với khuyên tai chữ thập vàng",
        description:
          "Mặt dây và khoen kẹp trọng lượng rất nhẹ để tai fursuit vẫn đứng form thoải mái, không bị nặng trĩu kéo cụp xuống.",
      },
      {
        id: "magnetic-badge-clip",
        code: "09",
        name: "Kẹp bảng tên nam châm (In 3D)",
        chapter: "charms",
        chapterLabel: "Khuyên & Phụ kiện đeo",
        priceVnd: null,
        priceLabel: "Báo giá riêng",
        note: "Ngàm nam châm bảo vệ lông",
        leadTime: "1 tuần",
        blueprint: "badge-clip",
        imageAlt: "Bản vẽ khung đeo badge in 3D gắn nam châm cho fursuit",
        description:
          "Khung giữ badge in 3D kẹp cùng bản nam châm lực hút mạnh ở mặt sau, treo badge nặng đi fes thoải mái mà không cần đâm kim làm rách lông.",
      },
    ],
  },
};
