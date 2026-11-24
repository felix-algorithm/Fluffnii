import type { Lang } from "@/components/LanguageProvider";

export type BlueprintVariant = "internal-fan" | "std-fan" | "plus-fan";
export type AccessoryStatus = "available" | "coming-soon" | "custom";

export interface AccessoryItem {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  status: AccessoryStatus;
  statusBadge: string;
  priceVnd: number | null;
  isStartingPrice?: boolean;
  priceLabel: string;
  note: string;
  specs: string[];
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: string;
  blueprint?: BlueprintVariant;
  imageAlt: string;
  description: string;
}

export interface AccessoriesLocaleCopy {
  eyebrow: string;
  headlineLines: [string, string];
  heroDesc: string;
  partnerNote: string;
  workshopNotes: { num: string; title: string; detail: string }[];
  catalogNum: string;
  catalogTitle: string;
  catalogSubtitle: string;
  estimatorLabel: string;
  itemSingular: string;
  itemPlural: string;
  estimatorEmpty: string;
  estimatedTotalLabel: string;
  subtotalFrom: (subtotal: string) => string;
  subtotalPlusQuoted: (subtotal: string) => string;
  subtotalFromPlusQuoted: (subtotal: string) => string;
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
  addInterestCta: string;
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
  dmSubtotalFrom: (subtotal: string) => string;
  dmSubtotalQuoted: (subtotal: string) => string;
  dmSubtotalFromQuoted: (subtotal: string) => string;
  dmSubtotalExact: (subtotal: string) => string;
  dmSubtotalByQuote: string;
  blueprintBadges: Record<BlueprintVariant, string>;
  items: AccessoryItem[];
}

export function formatVnd(amount: number, lang: Lang): string {
  return lang === "vi"
    ? `${amount.toLocaleString("vi-VN")} VNĐ`
    : `${amount.toLocaleString("en-US")} VND`;
}

export const ACCESSORIES_COPY: Record<Lang, AccessoriesLocaleCopy> = {
  en: {
    eyebrow: "[Accessories & 3D gear]",
    headlineLines: ["Cooling fans,", "glasses & shells."],
    heroDesc:
      "3D-printed cooling fans alongside oversized glasses and custom shells sized for fursuit heads. Pick what you need below, then either attach your list to a suit quote or DM @CrossTalk_f.",
    partnerNote:
      "@CrossTalk_f runs 3D printing and cooling hardware for FluffNii Studio. Message @CrossTalk_f directly if you only want accessories, or bundle your picks into a fursuit quote on the main page.",
    workshopNotes: [
      {
        num: "(001)",
        title: "Made to order",
        detail:
          "Each fan body and shell is 3D-printed in small batches, sized for your head fit and colorway.",
      },
      {
        num: "(002)",
        title: "Built for con wear",
        detail:
          "USB-C power and soft TPU nozzles keep airflow easy to live with. Wide glass bridges also clear thick faux fur without pinching.",
      },
      {
        num: "(003)",
        title: "Bundle or direct DM",
        detail:
          "Put together a quick estimate list here first, then attach it to your suit quote or send it straight to @CrossTalk_f.",
      },
    ],
    catalogNum: "01",
    catalogTitle: "Fans & Custom 3D Gear",
    catalogSubtitle:
      "Internal head fans and portable 3D-printed coolers, alongside oversized fursuit glasses and custom shells.",
    estimatorLabel: "[Price estimator]",
    itemSingular: "item",
    itemPlural: "items",
    estimatorEmpty:
      "Pick items from the catalog to estimate your list, or scroll down to message @CrossTalk_f.",
    estimatedTotalLabel: "[Estimated total]",
    subtotalFrom: (subtotal) => `From ${subtotal}`,
    subtotalPlusQuoted: (subtotal) => `${subtotal} + quoted`,
    subtotalFromPlusQuoted: (subtotal) => `From ${subtotal} + quoted`,
    currencyNote:
      "Starting prices shown in VND (USD total quoted when you DM).",
    byQuote: "By quote",
    zeroPrice: "0 VND",
    bundleCta: "Bundle with Fursuit Quote",
    bundleHeader: "Bundled accessories",
    orderCta: "Order standalone (@CrossTalk_f)",
    copiedList: "Copied item list",
    copyList: "Copy item list",
    clearList: "Clear",
    clipboardBlockedPrompt:
      "Clipboard is blocked in this browser. Copy the text below manually.",
    closeFallbackAria: "Close copy box",
    stickyReviewLabel: "View list",
    stickyReviewAria: "Scroll to price estimator",
    piecesLabel: "pieces",
    inListLabel: (qty) => `In list (${qty})`,
    pickedLabel: (qty) => `${qty} picked`,
    addToEstimate: "Add to estimate",
    addInterestCta: "Add to inquiry",
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
      "Send your item list to @CrossTalk_f through any channel below. Mention your head fit or preferred shell colors if you already picked them.",
    contactPartnerNote:
      "@CrossTalk_f builds and ships fans and 3D-printed gear separately for FluffNii Studio. If you would rather include these parts with a full suit build, use Bundle with Fursuit Quote or email us below.",
    readyForDm: (count) =>
      `[Ready to paste in DM · ${count} ${count === 1 ? "item" : "items"}]`,
    copiedShort: "Copied",
    emailFallbackLabel: "Prefer email? Write to",
    emailFallbackSubject: "Accessories Inquiry - FluffNii Studio",
    dmHeader: "FluffNii Accessories Inquiry:",
    dmSubtotalFrom: (subtotal) => `Estimated subtotal: From ${subtotal}`,
    dmSubtotalQuoted: (subtotal) => `Estimated subtotal: ${subtotal} + quoted`,
    dmSubtotalFromQuoted: (subtotal) =>
      `Estimated subtotal: From ${subtotal} + quoted`,
    dmSubtotalExact: (subtotal) => `Estimated subtotal: ${subtotal}`,
    dmSubtotalByQuote: "Estimated subtotal: By quote",
    blueprintBadges: {
      "internal-fan": "USB-C · INTERNAL FIT",
      "std-fan": "STD · 15W QC · TPU",
      "plus-fan": "PLUS · HIGH AIRFLOW",
    },
    items: [
      {
        id: "internal-fan",
        code: "01",
        name: "Custom Internal Fan",
        subtitle: "For fursuit heads",
        status: "available",
        statusBadge: "Available",
        priceVnd: 250000,
        isStartingPrice: true,
        priceLabel: "From 250,000 VND",
        note: "DM for quote",
        specs: [
          "USB-C powered",
          "Quiet airflow for extended wear",
          "Custom-fitted for fursuit heads",
        ],
        image: "/images/gallery-r2-02.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 28%",
        blueprint: "internal-fan",
        imageAlt:
          "Sky-blue horned Kemono fursuit head preview for custom internal fan fitting",
        description:
          "Internal cooling fan sized to tuck inside a fursuit head. Runs off USB-C for quiet airflow during long wears.",
      },
      {
        id: "fursuit-fan-std",
        code: "02",
        name: "「Fursuit Fan: STD Edition」",
        subtitle: "Portable 3D-printed cooling fan",
        status: "available",
        statusBadge: "Standard",
        priceVnd: 500000,
        isStartingPrice: true,
        priceLabel: "From 500,000 VND",
        note: "DM for quote",
        specs: [
          "3D-printed hard plastic shell + soft TPU air nozzle",
          "USB-C charging with 15W Qualcomm Quick Charge",
          "Variable speed, up to 2 hrs continuous use",
        ],
        image: "/images/gallery-r1-02.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 32%",
        blueprint: "std-fan",
        imageAlt:
          "Sy Tray and Minny Minnie Kemono fursuits preview for Fursuit Fan STD Edition",
        description:
          "Compact 3D-printed hard plastic shell with a soft TPU air nozzle. Built with variable speed control plus 15W Quick Charge over USB-C.",
      },
      {
        id: "fursuit-fan-plus",
        code: "03",
        name: "「Fursuit Fan: PLUS Edition」",
        subtitle: "Upgraded high-airflow model",
        status: "coming-soon",
        statusBadge: "Coming Soon",
        priceVnd: null,
        priceLabel: "Coming Soon",
        note: "DM for updates",
        specs: [
          "3D-printed hard plastic shell + soft TPU air nozzle",
          "USB-C charging support",
          "Even higher top air speed than STD",
        ],
        image: "/images/gallery-r2-01.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 26%",
        blueprint: "plus-fan",
        imageAlt:
          "White cat fursuit partial preview for upcoming Fursuit Fan PLUS Edition",
        description:
          "Upcoming high-output model keeping the same 3D-printed hard plastic body and soft TPU nozzle, tuned for stronger peak air speed.",
      },
      {
        id: "fursuit-accessories-tbd",
        code: "04",
        name: "Fursuit Accessories",
        subtitle: "Glasses, custom shells & colors",
        status: "custom",
        statusBadge: "Custom · TBD",
        priceVnd: null,
        priceLabel: "TBD · DM for quote",
        note: "Colors & options TBD",
        specs: [
          "Fursuit glasses sized for puffy muzzles",
          "Custom 3D-printed fan shells",
          "Custom colorways & details TBD",
        ],
        image: "/images/gallery-r1-04.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 22%",
        imageAlt:
          "Cyan fursuit head wearing oversized matte white round fursuit glasses",
        description:
          "Oversized fursuit glasses alongside custom 3D-printed fan shells and color swaps. Final options are still TBD, so DM to ask what is open.",
      },
    ],
  },
  vi: {
    eyebrow: "[Phụ kiện & Quạt in 3D]",
    headlineLines: ["Quạt tản nhiệt,", "kính & vỏ custom."],
    heroDesc:
      "Quạt tản nhiệt in 3D, kính gọng lớn và vỏ quạt phối màu làm vừa vặn cho đầu fursuit. Chọn những món bạn cần bên dưới để ghép chung đơn suit hoặc nhắn thẳng cho @CrossTalk_f.",
    partnerNote:
      "@CrossTalk_f phụ trách mảng in 3D và quạt tản nhiệt cho FluffNii Studio. Muốn đặt lẻ phụ kiện thì bạn nhắn trực tiếp cho @CrossTalk_f, còn đặt kèm suit thì bấm ghép vào form báo giá ở trang chủ.",
    workshopNotes: [
      {
        num: "(001)",
        title: "In theo từng đơn",
        detail:
          "Mỗi thân quạt và vỏ đều được in 3D theo từng đợt nhỏ, chỉnh theo cỡ Head và màu bạn muốn.",
      },
      {
        num: "(002)",
        title: "Đeo mát đi fes",
        detail:
          "Quạt dùng nguồn USB-C với đầu thổi TPU mềm nên đội lâu vẫn dễ chịu. Gọng kính cũng mở rộng để đeo qua lớp lông dày không bị cấn.",
      },
      {
        num: "(003)",
        title: "Mua lẻ hay ghép đơn đều được",
        detail:
          "Lên nhanh danh sách ở bảng tạm tính rồi gửi kèm form đặt suit, hoặc copy gửi thẳng cho @CrossTalk_f.",
      },
    ],
    catalogNum: "01",
    catalogTitle: "Quạt tản nhiệt & Đồ in 3D",
    catalogSubtitle:
      "Quạt gắn trong Head và quạt cầm tay in 3D, cùng kính fursuit gọng lớn và vỏ quạt phối màu riêng.",
    estimatorLabel: "[Bảng tạm tính]",
    itemSingular: "món",
    itemPlural: "món",
    estimatorEmpty:
      "Chọn vài món trong danh mục để nhẩm chi phí, hoặc kéo xuống nhắn trực tiếp cho @CrossTalk_f.",
    estimatedTotalLabel: "[Tạm tính tổng cộng]",
    subtotalFrom: (subtotal) => `Từ ${subtotal}`,
    subtotalPlusQuoted: (subtotal) => `${subtotal} + báo giá riêng`,
    subtotalFromPlusQuoted: (subtotal) => `Từ ${subtotal} + báo giá riêng`,
    currencyNote:
      "Giá khởi điểm tính theo VNĐ (đơn quốc tế sẽ báo giá quy đổi USD khi nhắn tin).",
    byQuote: "Báo giá riêng",
    zeroPrice: "0 VNĐ",
    bundleCta: "Gửi kèm form báo giá Fursuit",
    bundleHeader: "Phụ kiện gửi kèm",
    orderCta: "Đặt lẻ qua @CrossTalk_f",
    copiedList: "Đã copy danh sách",
    copyList: "Copy danh sách gửi DM",
    clearList: "Xóa hết",
    clipboardBlockedPrompt:
      "Trình duyệt đang chặn tự động copy. Bạn chọn và sao chép đoạn chữ bên dưới nhé.",
    closeFallbackAria: "Đóng khung sao chép",
    stickyReviewLabel: "Xem bảng",
    stickyReviewAria: "Cuộn lên bảng tạm tính",
    piecesLabel: "món",
    inListLabel: (qty) => `Đã chọn (${qty})`,
    pickedLabel: (qty) => `Đã chọn ${qty}`,
    addToEstimate: "Thêm vào tạm tính",
    addInterestCta: "Thêm vào hỏi giá",
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
      "Nhắn thẳng cho @CrossTalk_f qua các kênh bên dưới kèm danh sách món bạn đã chọn. Nếu có sẵn cỡ Head hay màu vỏ ưng ý thì gửi luôn để báo giá nhanh hơn.",
    contactPartnerNote:
      "@CrossTalk_f trực tiếp làm và giao quạt tản nhiệt cùng đồ in 3D cho xưởng mình. Nếu bạn muốn gộp chung vào đơn làm suit từ đầu thì bấm Gửi kèm form báo giá Fursuit hoặc gửi email bên dưới.",
    readyForDm: (count) => `[Sẵn sàng gửi DM · ${count} món]`,
    copiedShort: "Đã copy",
    emailFallbackLabel: "Muốn gửi email thì nhắn tới",
    emailFallbackSubject: "Hỏi đặt phụ kiện - FluffNii Studio",
    dmHeader: "Danh sách đặt phụ kiện FluffNii:",
    dmSubtotalFrom: (subtotal) => `Tạm tính: Từ ${subtotal}`,
    dmSubtotalQuoted: (subtotal) => `Tạm tính: ${subtotal} + báo giá riêng`,
    dmSubtotalFromQuoted: (subtotal) =>
      `Tạm tính: Từ ${subtotal} + báo giá riêng`,
    dmSubtotalExact: (subtotal) => `Tạm tính: ${subtotal}`,
    dmSubtotalByQuote: "Tạm tính: Báo giá riêng theo mẫu",
    blueprintBadges: {
      "internal-fan": "USB-C · GẮN TRONG HEAD",
      "std-fan": "STD · SẠC NHANH 15W · TPU",
      "plus-fan": "PLUS · GIÓ MẠNH HƠN",
    },
    items: [
      {
        id: "internal-fan",
        code: "01",
        name: "Quạt gắn trong Head",
        subtitle: "Làm riêng cho Head fursuit",
        status: "available",
        statusBadge: "Nhận đặt",
        priceVnd: 250000,
        isStartingPrice: true,
        priceLabel: "Từ 250.000 VNĐ",
        note: "Nhắn tin báo giá",
        specs: [
          "Cấp nguồn qua cổng USB-C",
          "Chạy êm, đủ mát khi đội lâu",
          "Chỉnh kích cỡ theo từng Head fursuit",
        ],
        image: "/images/gallery-r2-02.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 28%",
        blueprint: "internal-fan",
        imageAlt: "Ảnh minh họa Head fursuit Kemono xanh cho quạt gắn trong Head",
        description:
          "Quạt tản nhiệt gắn gọn bên trong Head fursuit. Cấp nguồn qua cổng USB-C, chạy êm và mát đều khi bạn đội liên tục nhiều giờ.",
      },
      {
        id: "fursuit-fan-std",
        code: "02",
        name: "「Fursuit Fan: STD Edition」",
        subtitle: "Quạt tản nhiệt in 3D cầm tay",
        status: "available",
        statusBadge: "Bản tiêu chuẩn",
        priceVnd: 500000,
        isStartingPrice: true,
        priceLabel: "Từ 500.000 VNĐ",
        note: "Nhắn tin báo giá",
        specs: [
          "Vỏ nhựa cứng in 3D + đầu thổi gió TPU mềm",
          "Sạc Type-C hỗ trợ sạc nhanh Qualcomm 15W",
          "Chỉnh tốc độ linh hoạt, chạy liên tục tới 2 giờ",
        ],
        image: "/images/gallery-r1-02.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 32%",
        blueprint: "std-fan",
        imageAlt:
          "Ảnh minh họa fursuit Sy Tray và Minny Minnie cho Fursuit Fan STD Edition",
        description:
          "Thân quạt nhựa cứng in 3D đi kèm đầu thổi gió TPU mềm. Hỗ trợ chỉnh tốc độ gió linh hoạt và sạc nhanh 15W qua cổng USB-C.",
      },
      {
        id: "fursuit-fan-plus",
        code: "03",
        name: "「Fursuit Fan: PLUS Edition」",
        subtitle: "Phiên bản nâng cấp gió mạnh",
        status: "coming-soon",
        statusBadge: "Sắp ra mắt",
        priceVnd: null,
        priceLabel: "Sắp ra mắt",
        note: "Nhắn để nhận tin",
        specs: [
          "Vỏ nhựa cứng in 3D + đầu thổi gió TPU mềm",
          "Hỗ trợ sạc qua cổng Type-C",
          "Tốc độ gió tối đa mạnh hơn bản STD",
        ],
        image: "/images/gallery-r2-01.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 26%",
        blueprint: "plus-fan",
        imageAlt:
          "Ảnh minh họa fursuit mèo trắng cho Fursuit Fan PLUS Edition sắp ra mắt",
        description:
          "Phiên bản nâng cấp sắp ra mắt vẫn giữ thân nhựa cứng in 3D và đầu thổi TPU mềm, nhưng đẩy lực gió tối đa mạnh hơn bản STD.",
      },
      {
        id: "fursuit-accessories-tbd",
        code: "04",
        name: "Fursuit Accessories",
        subtitle: "Kính, vỏ quạt custom & màu sắc",
        status: "custom",
        statusBadge: "Tùy chỉnh · TBD",
        priceVnd: null,
        priceLabel: "Giá theo mẫu · DM",
        note: "Màu sắc & mẫu TBD",
        specs: [
          "Kính fursuit gọng rộng vừa dáng mõm phồng",
          "Vỏ quạt in 3D thiết kế riêng",
          "Bảng màu và tùy chọn custom đang cập nhật (TBD)",
        ],
        image: "/images/gallery-r1-04.webp",
        imageWidth: 840,
        imageHeight: 672,
        imagePosition: "center 22%",
        imageAlt: "Head fursuit xanh dương đeo kính tròn trắng ngoại cỡ",
        description:
          "Kính gọng lớn cho fursuit, vỏ quạt in 3D và các lựa chọn phối màu riêng. Bảng màu chi tiết vẫn đang cập nhật (TBD), cứ nhắn mình để hỏi trước.",
      },
    ],
  },
};
