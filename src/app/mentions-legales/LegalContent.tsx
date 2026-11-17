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
    eyebrow: "[Legal information]",
    title: "Legal notice",
    updated: "Last updated: October 2026.",
    sections: [
      {
        num: "(001)",
        title: "SITE PUBLISHER",
        paragraphs: [
          "FluffNii Studio, custom fursuit workshop.",
          "Legal form: [to be completed]\nSIRET: [to be completed]\nAddress: [to be completed]\nPublication Director: [to be completed]\nEmail: FluffNii.furries@gmail.com",
        ],
      },
      {
        num: "(002)",
        title: "WEBSITE DESIGN",
        paragraphs: ["Design and development: Felix Algorithm"],
      },
      {
        num: "(003)",
        title: "INTELLECTUAL PROPERTY",
        paragraphs: [
          "All content on this website (photographs, texts, logotype, graphics, animations) is the exclusive property of FluffNii Studio or its partners, and is protected by copyright law. Any reproduction, representation, or reuse, even partial, without prior written authorization is prohibited. Project visuals remain the property of their respective authors and owners.",
        ],
      },
      {
        num: "(004)",
        title: "PERSONAL DATA",
        paragraphs: [
          "Information submitted via the contact form (name or handle, species, email, project) is used solely to respond to your inquiry and prepare a quote. It is neither sold nor shared, and is retained only for the time necessary to follow up on your request.",
          "In accordance with the GDPR and the French Data Protection Act, you have the right to access, rectify, erase, restrict, and object to the processing of your data. To exercise this right, write to FluffNii.furries@gmail.com. In case of difficulty, you may contact the CNIL (cnil.fr).",
        ],
      },
      {
        num: "(005)",
        title: "COOKIES",
        paragraphs: [
          "This website only uses essential technical storage needed for page rendering and does not set advertising or tracking cookies.",
        ],
      },
      {
        num: "(006)",
        title: "LIABILITY",
        paragraphs: [
          "FluffNii Studio strives to provide accurate and up-to-date information, without being able to guarantee the absence of errors. Links to third-party websites do not engage its liability regarding their content.",
        ],
      },
    ],
  },
  vi: {
    eyebrow: "[Thông tin pháp lý]",
    title: "Thông tin pháp lý",
    updated: "Cập nhật lần cuối: Tháng 10/2026.",
    sections: [
      {
        num: "(001)",
        title: "ĐƠN VỊ CHỦ QUẢN",
        paragraphs: [
          "FluffNii Studio, xưởng làm fursuit thủ công theo yêu cầu.",
          "Loại hình: [đang cập nhật]\nMã số đăng ký: [đang cập nhật]\nĐịa chỉ: [đang cập nhật]\nNgười phụ trách nội dung: [đang cập nhật]\nEmail: FluffNii.furries@gmail.com",
        ],
      },
      {
        num: "(002)",
        title: "THIẾT KẾ WEBSITE",
        paragraphs: ["Thiết kế và phát triển: Felix Algorithm"],
      },
      {
        num: "(003)",
        title: "BẢN QUYỀN & SỞ HỮU TRÍ TUỆ",
        paragraphs: [
          "Toàn bộ nội dung trên trang web này (hình ảnh, văn bản, logo, đồ họa và hiệu ứng) thuộc quyền sở hữu của FluffNii Studio hoặc các đối tác liên quan và được bảo hộ theo quy định bản quyền. Mọi hành vi sao chép hoặc sử dụng lại khi chưa có sự đồng ý bằng văn bản đều bị nghiêm cấm. Thiết kế nhân vật gốc thuộc quyền sở hữu của từng chủ nhân suit tương ứng.",
        ],
      },
      {
        num: "(004)",
        title: "DỮ LIỆU CÁ NHÂN",
        paragraphs: [
          "Thông tin bạn gửi qua biểu mẫu liên hệ (tên hoặc nickname, loài nhân vật, email, mô tả đơn) chỉ được dùng để phản hồi yêu cầu và lập báo giá. Xưởng không bán hay chia sẻ dữ liệu với bên thứ ba và chỉ lưu trong thời gian trao đổi đơn hàng.",
          "Bạn có quyền yêu cầu xem lại, chỉnh sửa hoặc xóa thông tin cá nhân đã gửi bất kỳ lúc nào bằng cách nhắn về địa chỉ FluffNii.furries@gmail.com.",
        ],
      },
      {
        num: "(005)",
        title: "COOKIE & LƯU TRỮ CỤC BỘ",
        paragraphs: [
          "Trang web chỉ dùng bộ nhớ cục bộ tối thiểu để ghi nhớ ngôn ngữ hiển thị (EN/VI) và vận hành giao diện, không dùng cookie quảng cáo hay theo dõi người dùng.",
        ],
      },
      {
        num: "(006)",
        title: "TRÁCH NHIỆM NỘI DUNG",
        paragraphs: [
          "FluffNii Studio luôn cố gắng giữ thông tin giá cả và trạng thái nhận đơn chính xác và mới nhất. Các liên kết dẫn sang mạng xã hội hoặc trang bên ngoài thuộc quyền quản lý của từng nền tảng tương ứng.",
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
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/62">
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
          <p className="font-sans text-[16px] text-[#111622]/62">
            {copy.updated}
          </p>
        </div>

        <div className="flex flex-col border-t border-[#111622]/16">
          {copy.sections.map((sec) => (
            <section
              key={sec.num}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-[#111622]/16"
            >
              <div className="md:col-span-5 flex items-baseline gap-4">
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
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
                    className="font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/72 whitespace-pre-line"
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
