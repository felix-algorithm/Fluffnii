"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang, type Lang } from "@/components/LanguageProvider";

interface LegalLocaleCopy {
  eyebrow: string;
  title: string;
  updated: string;
  sections: {
    num: string;
    title: string;
    paragraphs: string[];
  }[];
}

const LEGAL_COPY: Record<Lang, LegalLocaleCopy> = {
  en: {
    eyebrow: "[Legal & Privacy]",
    title: "Studio notice & privacy",
    updated: "Last updated: November 2026.",
    sections: [
      {
        num: "(001)",
        title: "STUDIO INFORMATION",
        paragraphs: [
          "FluffNii Studio is an independent fursuit workshop based in Vietnam, taking domestic and worldwide commissions online.",
          "Operation: Solo handmade workshop (online)\nLocation: Vietnam\nEmail: FluffNii.furries@gmail.com\nVerified channels: Instagram (@fluffnii.fur), X (@Fluffnii_FUR), TikTok (@fluffnii_fur)",
        ],
      },
      {
        num: "(002)",
        title: "WEBSITE & HOSTING",
        paragraphs: [
          "Design and development: Felix Algorithm",
          "This site runs on Cloudflare Workers so visitors anywhere can browse and send quote requests without hiccups.",
        ],
      },
      {
        num: "(003)",
        title: "INTELLECTUAL PROPERTY",
        paragraphs: [
          "Photos, text, graphics, and motion work on this site belong to FluffNii Studio or its collaborators. Please do not copy or repost them elsewhere without written permission. Every OC design shown in commission photos remains the property of its respective owner.",
        ],
      },
      {
        num: "(004)",
        title: "PERSONAL DATA & PRIVACY",
        paragraphs: [
          "When you fill out the quote form, we collect your name or handle, character species, email address, selected commission items, and project notes. If you add them, we also receive your optional phone number, social or DM handle, and ref sheet link.",
          "We use those details strictly to review your character design, put together a quote for your fursuit or bundled accessories, and reply to you. Your info is never sold or passed to outside marketers, and we only keep it while handling your request.",
          "If you want to review, update, or delete any details you sent, write to FluffNii.furries@gmail.com anytime.",
        ],
      },
      {
        num: "(005)",
        title: "COOKIES & STORAGE",
        paragraphs: [
          "There are no ad trackers or analytics cookies on this site. Browser storage is only used for basic functions: remembering your EN/VI language choice, skipping the intro screen during the same session, and keeping your in-progress quote form draft.",
        ],
      },
      {
        num: "(006)",
        title: "CONTENT ACCURACY & LINKS",
        paragraphs: [
          "We keep suit options, accessory listings, and slot status updated, though small oversights or brief delays can still slip through. External links and partner channels (such as @CrossTalk_f for standalone 3D-printed accessories) follow those platforms' own rules.",
        ],
      },
    ],
  },
  vi: {
    eyebrow: "[Thông tin & Quyền riêng tư]",
    title: "Thông tin Xưởng & Quyền riêng tư",
    updated: "Cập nhật lần cuối: Tháng 11/2026.",
    sections: [
      {
        num: "(001)",
        title: "THÔNG TIN XƯỞNG",
        paragraphs: [
          "FluffNii Studio là xưởng làm fursuit thủ công độc lập tại Việt Nam, nhận trao đổi và đặt đơn online cho cả bạn ở trong nước lẫn nước ngoài.",
          "Mô hình: Xưởng thủ công cá nhân (nhận đơn online)\nĐịa điểm: Việt Nam\nEmail: FluffNii.furries@gmail.com\nKênh chính thức: Instagram (@fluffnii.fur), X (@Fluffnii_FUR), TikTok (@fluffnii_fur)",
        ],
      },
      {
        num: "(002)",
        title: "WEBSITE & VẬN HÀNH",
        paragraphs: [
          "Thiết kế và phát triển: Felix Algorithm",
          "Website chạy trên hạ tầng Cloudflare Workers để mọi người ở Việt Nam hay nước ngoài đều vào xem và gửi form báo giá ổn định.",
        ],
      },
      {
        num: "(003)",
        title: "BẢN QUYỀN & SỞ HỮU TRÍ TUỆ",
        paragraphs: [
          "Hình ảnh, chữ viết, đồ họa và hiệu ứng trên trang web thuộc về FluffNii Studio hoặc các cộng tác viên thực hiện. Vui lòng đừng lấy lại hay sử dụng cho mục đích khác khi chưa có đồng ý bằng văn bản. Còn thiết kế nhân vật gốc (OC) trên các bộ suit trưng bày vẫn luôn thuộc về chủ nhân của nhân vật đó.",
        ],
      },
      {
        num: "(004)",
        title: "DỮ LIỆU CÁ NHÂN & QUYỀN RIÊNG TƯ",
        paragraphs: [
          "Khi bạn gửi form yêu cầu báo giá, mình sẽ nhận được tên hoặc nickname, loài nhân vật, email, các hạng mục bạn chọn và phần ghi chú dự án, kèm số điện thoại, tài khoản MXH/DM và link ref sheet nếu bạn tự điền thêm.",
          "Mình chỉ dùng những thông tin này để xem kỹ thiết kế nhân vật, tính báo giá fursuit hoặc phụ kiện gửi kèm rồi trả lời cho bạn. Xưởng không bán hay chia sẻ thông tin cho bên thứ ba, và chỉ giữ lại trong thời gian trao đổi đơn.",
          "Cần xem lại, sửa hoặc xóa bất kỳ thông tin nào đã gửi, bạn cứ nhắn về FluffNii.furries@gmail.com bất cứ lúc nào.",
        ],
      },
      {
        num: "(005)",
        title: "COOKIE & LƯU TRỮ TRÌNH DUYỆT",
        paragraphs: [
          "Trang web không gắn cookie quảng cáo hay theo dõi hành vi. Trình duyệt chỉ lưu vài thứ cơ bản: nhớ ngôn ngữ bạn chọn (EN/VI), không phát lại màn intro trong cùng phiên truy cập và giữ tạm nội dung bạn đang gõ dở trong form báo giá.",
        ],
      },
      {
        num: "(006)",
        title: "ĐỘ CHÍNH XÁC NỘI DUNG & LIÊN KẾT NGOÀI",
        paragraphs: [
          "Mình cố gắng giữ thông tin hạng mục, danh sách phụ kiện và trạng thái mở slot sát thực tế nhất, nhưng đôi lúc vẫn có thể sót chi tiết nhỏ hoặc cập nhật chậm vài nhịp. Các link sang mạng xã hội hay trang của đối tác (như @CrossTalk_f cho phụ kiện in 3D mua lẻ) sẽ áp dụng theo quy định riêng của từng nền tảng đó.",
        ],
      },
    ],
  },
};

export default function LegalContent() {
  const { lang } = useLang();
  const isVi = lang === "vi";
  const copy = LEGAL_COPY[lang];

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#111622]">
      <Navbar />

      <main className="flex-1 w-full max-w-[1120px] mx-auto px-5 md:px-10 pt-[136px] md:pt-[156px] pb-[96px] md:pb-[132px]">
        <div className="flex flex-col gap-5 pb-12 md:pb-16">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/70">
            {copy.eyebrow}
          </span>
          <h1
            className={`font-stagheiz text-[#111622] ${
              isVi
                ? "text-[40px] sm:text-[54px] md:text-[68px] leading-[1.03] tracking-[-0.025em]"
                : "text-[48px] sm:text-[64px] md:text-[80px] leading-[0.94] tracking-[-0.04em]"
            }`}
          >
            {copy.title}
          </h1>
          <p className="font-sans text-[16px] text-[#111622]/70">
            {copy.updated}
          </p>
        </div>

        <div className="flex flex-col border-t border-[#111622]/15">
          {copy.sections.map((sec) => (
            <section
              key={sec.num}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-[#111622]/15"
            >
              <div className="md:col-span-5 flex items-baseline gap-4">
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/70 shrink-0">
                  {sec.num}
                </span>
                <h2
                  className={`font-stagheiz text-[#111622] ${
                    isVi
                      ? "text-[20px] md:text-[23px] leading-[1.1] tracking-[-0.02em]"
                      : "text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.04em]"
                  }`}
                >
                  {sec.title}
                </h2>
              </div>
              <div className="md:col-span-7 flex flex-col gap-4">
                {sec.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/80 whitespace-pre-line"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
