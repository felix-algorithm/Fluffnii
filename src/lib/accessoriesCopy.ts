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
  workshopNotes: { num: string; title: string; detail: string }[];
  estimatorLabel: string;
  itemSingular: string;
  itemPlural: string;
  estimatorEmpty: string;
  estimatedTotalLabel: string;
  byQuote: string;
  zeroPrice: string;
  orderCta: string;
  copiedList: string;
  copyList: string;
  clearList: string;
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
  readyForDm: (count: number) => string;
  copiedNote: string;
  copyNote: string;
  copiedShort: string;
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
      "3D-printed cooling fans, oversized glasses, horns, and ear jewelry sized for fursuiters. Pick what you need on the right and message directly below.",
    workshopNotes: [
      {
        num: "(001)",
        title: "Made to order",
        detail: "Colors, frame widths, and fan mounts printed in small batches.",
      },
      {
        num: "(002)",
        title: "Built for suits",
        detail:
          "Sized around fur thickness, Kemono eye spacing, and long convention wear.",
      },
      {
        num: "(003)",
        title: "Direct DM quotes",
        detail:
          "Add parts to build an item list, then send it through the links below.",
      },
    ],
    estimatorLabel: "[Price estimator]",
    itemSingular: "item",
    itemPlural: "items",
    estimatorEmpty:
      "Tap pieces on the right to build an item list, or jump straight to direct contact.",
    estimatedTotalLabel: "[Estimated total]",
    byQuote: "By quote",
    zeroPrice: "0 VND",
    orderCta: "Order via direct contact",
    copiedList: "Copied list for DM",
    copyList: "Copy item list",
    clearList: "Clear",
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
    contactEyebrow: "[Contact]",
    contactTitle: "Ready to order?",
    contactDesc:
      "Message directly on any channel below with the pieces you want, head measurements, or preferred filament and hardware colors.",
    readyForDm: (count) =>
      `[Ready to paste in DM · ${count} ${count === 1 ? "item" : "items"}]`,
    copiedNote: "Copied note",
    copyNote: "Copy order note",
    copiedShort: "Copied",
    dmHeader: "FluffNii Accessories Inquiry:",
    dmSubtotalQuoted: (subtotal) => `Estimated subtotal: ${subtotal} + quoted pieces`,
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
          "3D-printed airflow fans, battery mounts, and lightweight horns made for warm cons.",
      },
      {
        num: "02",
        key: "eyewear",
        title: "Eyewear & Head Props",
        subtitle:
          "Wide-bridge fursuit glasses, magnetic eyelids, and fangs sized for Kemono heads.",
      },
      {
        num: "03",
        key: "charms",
        title: "Charms & Wearables",
        subtitle:
          "Braided ear cords, lightweight cuffs, and fur-safe magnetic badge holders.",
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
          "Compact low-noise fan inside a rounded 3D-printed shroud that tucks cleanly behind mouth mesh.",
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
          "Twin slim blowers angled toward the eyes and cheeks to keep lenses clear and air moving.",
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
        imagePosition: "center 20%",
        imageAlt: "Sky-blue Kemono head wearing black curved 3D printed horns",
        description:
          "Hollow 3D printed horns scaled from your character sheet in matte or painted finishes.",
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
        imagePosition: "center 22%",
        imageAlt: "Cyan fursuit head wearing oversized matte white round glasses",
        description:
          "Wide-bridge matte rims proportioned specifically so frames sit evenly across puffy muzzles.",
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
        imagePosition: "center 22%",
        imageAlt:
          "Cyan fursuit head wearing magnetic half-lids and a pink blep tongue",
        description:
          "Switch playful, sleepy, or grumpy looks between con photos in seconds with hidden magnets.",
      },
      {
        id: "add-teeth-fangs",
        code: "06",
        name: "Add Teeth & Fangs",
        chapter: "eyewear",
        chapterLabel: "Eyewear & Head Props",
        priceVnd: 150000,
        priceLabel: "150,000 VND",
        note: "Base add-on rate",
        leadTime: "1–2 weeks",
        image: "/images/offer-01.webp",
        imagePosition: "center 40%",
        imageAlt: "Grey and orange Kemono fox head showing sharp white upper fangs",
        description:
          "Crisp felt, minky, or resin fangs shaped for Kemono mouths with stitch or magnet mounts.",
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
        imagePosition: "center 18%",
        imageAlt:
          "Black and yellow Shiba head wearing red-white braided ear cord, gold bell, and cuff",
        description:
          "Hand-twisted satin cord, jingle bell, and ear wrap anchored safely without matting faux fur.",
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
        imagePosition: "center 24%",
        imageAlt: "Orange and grey cat fursuit head with gold cross ear charms",
        description:
          "Featherweight cross pendants, hoops, and ear cuffs that keep fursuit ears upright.",
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
          "3D-printed con badge frame and strong rear magnet plate so you never pierce faux fur.",
      },
    ],
  },
  vi: {
    eyebrow: "[Phụ kiện & In 3D]",
    headlineLines: ["Quạt tản nhiệt,", "kính & phụ kiện."],
    heroDesc:
      "Quạt làm mát in 3D, kính ngoại cỡ, sừng và khuyên tai làm vừa vặn cho fursuit. Chọn những món bạn cần ở bên phải rồi nhắn qua các kênh bên dưới.",
    workshopNotes: [
      {
        num: "(001)",
        title: "Làm theo yêu cầu",
        detail: "Màu sắc, bề rộng gọng kính và ngàm quạt được in lẻ theo từng đơn.",
      },
      {
        num: "(002)",
        title: "Đo chuẩn cho fursuit",
        detail:
          "Tính sẵn độ dày lông, khoảng cách mắt Kemono và sự thoải mái khi đi fes.",
      },
      {
        num: "(003)",
        title: "Báo giá qua tin nhắn",
        detail:
          "Thêm món vào bảng tạm tính rồi copy danh sách gửi thẳng qua kênh liên hệ.",
      },
    ],
    estimatorLabel: "[Bảng tạm tính]",
    itemSingular: "món",
    itemPlural: "món",
    estimatorEmpty:
      "Chọn các món ở bên phải để tạo danh sách, hoặc kéo xuống nhắn trực tiếp.",
    estimatedTotalLabel: "[Tạm tính tổng cộng]",
    byQuote: "Báo giá riêng",
    zeroPrice: "0 VNĐ",
    orderCta: "Đặt hàng qua tin nhắn",
    copiedList: "Đã copy danh sách",
    copyList: "Copy danh sách gửi DM",
    clearList: "Xóa hết",
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
    contactEyebrow: "[Liên hệ]",
    contactTitle: "Sẵn sàng đặt hàng?",
    contactDesc:
      "Nhắn trực tiếp qua bất kỳ kênh nào bên dưới kèm danh sách món bạn chọn, số đo đầu hoặc màu filament mong muốn.",
    readyForDm: (count) => `[Sẵn sàng gửi DM · ${count} món]`,
    copiedNote: "Đã copy ghi chú",
    copyNote: "Copy đơn tạm tính",
    copiedShort: "Đã copy",
    dmHeader: "Danh sách đặt phụ kiện FluffNii:",
    dmSubtotalQuoted: (subtotal) => `Tạm tính: ${subtotal} + các món báo giá riêng`,
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
          "Quạt thổi gió in 3D, ngàm pin và sừng nhẹ giúp đội fursuit lâu vẫn thoáng mát.",
      },
      {
        num: "02",
        key: "eyewear",
        title: "Kính & Đạo cụ Head",
        subtitle:
          "Kính cầu rộng cho mõm fursuit, mí mắt nam châm và răng nanh chuẩn dáng Kemono.",
      },
      {
        num: "03",
        key: "charms",
        title: "Khuyên & Phụ kiện đeo",
        subtitle:
          "Dây tết chuông đeo tai, vòng kẹp nhẹ và bảng tên nam châm không làm hỏng lông.",
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
          "Quạt chạy êm nằm gọn trong ống chụp in 3D bo tròn, giấu khéo ngay sau lưới miệng.",
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
        note: "Quạt kép · Ngàm theo mẫu",
        leadTime: "1–2 tuần",
        blueprint: "dual-fan",
        imageAlt: "Bản vẽ bộ quạt đôi làm mát in 3D cho Head fursuit",
        description:
          "Hai quạt mỏng hướng luồng gió qua tròng mắt và má để giảm đọng hơi và bí nóng.",
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
        imagePosition: "center 20%",
        imageAlt: "Head fursuit Kemono xanh dương đeo cặp sừng cong in 3D màu đen",
        description:
          "Sừng rỗng ruột nhẹ đầu, dựng theo đúng tỷ lệ ref sheet với bề mặt sơn lì hoặc bóng.",
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
        imagePosition: "center 22%",
        imageAlt: "Head fursuit xanh dương đeo kính tròn trắng ngoại cỡ",
        description:
          "Gọng kính nhẹ với phần cầu rộng được căn chỉnh riêng để nằm cân trên phần mõm phồng.",
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
        imagePosition: "center 22%",
        imageAlt: "Head fursuit xanh với mí mắt nam châm và lưỡi hồng",
        description:
          "Đổi biểu cảm tinh nghịch hoặc lim dim chỉ trong vài giây nhờ lực hít nam châm giấu kín.",
      },
      {
        id: "add-teeth-fangs",
        code: "06",
        name: "Gắn thêm răng nanh",
        chapter: "eyewear",
        chapterLabel: "Kính & Đạo cụ Head",
        priceVnd: 150000,
        priceLabel: "150.000 VNĐ",
        note: "Giá làm thêm cơ bản",
        leadTime: "1–2 tuần",
        image: "/images/offer-01.webp",
        imagePosition: "center 40%",
        imageAlt: "Head cáo Kemono xám cam với cặp răng nanh trắng sắc nét",
        description:
          "Răng nanh bằng nỉ, minky hoặc resin cắt gọt vừa khuôn miệng Kemono, khâu hoặc gắn nam châm.",
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
        imagePosition: "center 18%",
        imageAlt: "Head fursuit Shiba đen vàng đeo dây tết đỏ trắng và chuông vàng",
        description:
          "Dây satin tết tay kèm chuông vàng và vòng kẹp cố định chắc chắn mà không làm bết lông.",
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
        imagePosition: "center 24%",
        imageAlt: "Head mèo fursuit xám cam với khuyên tai chữ thập vàng",
        description:
          "Mặt dây nhẹ, khoen tròn và khuyên kẹp giữ dáng tai fursuit đứng vững khi chụp ảnh.",
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
          "Khung giữ badge in 3D kẹp bằng nam châm lực hút mạnh phía sau, không cần đâm kim qua lông.",
      },
    ],
  },
};
