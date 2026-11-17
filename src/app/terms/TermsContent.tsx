"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Bouton from "@/components/Bouton";
import { useLang, type Lang } from "@/components/LanguageProvider";

interface TermsLocaleCopy {
  eyebrow: string;
  title: string;
  intro: string;
  highlights: { label: string; value: string }[];
  sec1Title: string;
  generalPoints: string[];
  sec2Title: string;
  processSteps: string[];
  sec3Title: string;
  rushHeadline: string;
  rushPoints: string[];
  sec4Title: string;
  depositPoints: string[];
  deadlineTag: string;
  deadlineText: string;
  sec5Title: string;
  warrantyPoints: string[];
  ctaPrimary: string;
  ctaSecondary: string;
}

const TERMS_COPY: Record<Lang, TermsLocaleCopy> = {
  en: {
    eyebrow: "[Commission Policy]",
    title: "Commission terms & policy",
    intro:
      "Placing an order means you have read and agreed to all terms and policies below. Please read everything carefully before requesting a slot.",
    highlights: [
      { label: "[Deposit]", value: "40% upfront (non-refundable)" },
      { label: "[Balance window]", value: "60% due within 3 months" },
      { label: "[Rush orders · Replies]", value: "No rush slots · Within 24h" },
    ],
    sec1Title: "GENERAL INFORMATION",
    generalPoints: [
      "Handmade fursuits cannot achieve 100% machine perfection. Keep natural hand-sewn variation in mind before ordering.",
      "Progress photos may be shared at any point during the build. If you spot any concern or question, please speak up promptly.",
      "Messages are answered within 24 hours. Please keep messages focused on studio work rather than casual small talk. Thank you for understanding.",
      "The studio reserves the right to turn down clients who ask for excessive changes unrelated to the original character design, or demand unreasonable perfectionism by nitpicking minor details.",
      "Please trust in our skills before placing your beloved OC in our hands.",
    ],
    sec2Title: "COMMISSION PROCESS",
    processSteps: [
      "Send a quote request by email.",
      "Wait for a reply by email.",
      "Pay the deposit to lock in your slot.",
      "Discuss fur colors and materials.",
      "Materials are ordered and sourced.",
      "Wait for your turn in the build queue.",
      "Receive a notice when work on your suit begins.",
      "Confirm pattern fitting and overall shape.",
      "Confirm the finished build.",
      "Pay the remaining 60% balance.",
      "Packing and shipping.",
    ],
    sec3Title: "RUSH ORDERS & SCHEDULE",
    rushHeadline: "Rush orders are not accepted.",
    rushPoints: [
      "Orders may finish ahead of schedule or face delays due to weather, humidity, and external factors.",
      "The studio is run by one solo maker. If a build takes longer than expected, thank you sincerely for your patience and understanding.",
    ],
    sec4Title: "DEPOSIT & PAYMENT",
    depositPoints: [
      "Clients must pay 40% of the total commission price upfront as a deposit.",
      "This deposit holds your commission slot and covers material purchases.",
      "Because custom fursuits are made strictly to order, deposits are non-refundable under any circumstances once paid.",
      "If a client abandons an order, the fursuit (whether unfinished or finished) may be completed and listed for sale as ready-made stock. Consider the risks carefully before backing out.",
    ],
    deadlineTag: "[Important payment deadline]",
    deadlineText:
      "After the commission is completed, you must pay the remaining 60% balance within 3 months. If full payment is not received within this 3-month window, the order will be marked as abandoned, and both the fursuit and the deposit will be forfeited. Once 100% payment is received, your order ships immediately.",
    sec5Title: "WARRANTY & REPAIRS",
    warrantyPoints: [
      "If you discover any issue related to build quality, please message privately and reach out as soon as possible.",
      "Products include post-delivery warranty coverage [exact warranty duration to be confirmed].",
    ],
    ctaPrimary: "Request a commission",
    ctaSecondary: "Browse accessories",
  },
  vi: {
    eyebrow: "[Chính sách Commission]",
    title: "Điều khoản & Chính sách Commission",
    intro:
      "Khi đặt hàng, đồng nghĩa với việc bạn đã đọc và đồng ý với tất cả điều khoản và chính sách dưới đây. Vui lòng đọc thật kỹ trước khi đặt slot.",
    highlights: [
      { label: "[Tiền đặt cọc]", value: "Đặt cọc trước 40% (không hoàn lại)" },
      { label: "[Hạn thanh toán]", value: "60% còn lại trong vòng 3 tháng" },
      { label: "[Đơn gấp · Phản hồi]", value: "Không nhận đơn gấp · Trong 24h" },
    ],
    sec1Title: "THÔNG TIN CHUNG",
    generalPoints: [
      "Sản phẩm thủ công không thể đạt độ hoàn hảo 100%. Vui lòng cân nhắc điều này trước khi đặt hàng.",
      "Trong quá trình thực hiện commission, mình có thể gửi ảnh tiến độ vào bất cứ thời điểm nào. Nếu có bất kỳ vấn đề hoặc thắc mắc nào, vui lòng trao đổi kịp thời.",
      "Tin nhắn sẽ được phản hồi trong vòng 24 giờ. Tuy nhiên, mình không nhận trò chuyện phiếm ngoài công việc. Cảm ơn sự thông cảm của các bạn.",
      "Mình có quyền từ chối những khách hàng đưa ra quá nhiều yêu cầu không liên quan đến thiết kế nhân vật gốc, hoặc theo đuổi sự hoàn hảo một cách thiếu hợp lý bằng việc soi xét, bắt bẻ những chi tiết nhỏ nhặt.",
      "Hãy tin tưởng vào tay nghề của mình trước khi giao phó OC yêu quý của bạn nhé!",
    ],
    sec2Title: "QUY TRÌNH ĐẶT COMMISSION",
    processSteps: [
      "Gửi email yêu cầu báo giá.",
      "Chờ phản hồi qua email.",
      "Thanh toán tiền đặt cọc.",
      "Trao đổi về nguyên liệu.",
      "Tiến hành mua nguyên liệu.",
      "Chờ đến lượt commission của bạn.",
      "Nhận thông báo khi bắt đầu thực hiện.",
      "Xác nhận rập và hình dáng tổng thể.",
      "Xác nhận thành phẩm.",
      "Thanh toán số tiền còn lại.",
      "Đóng gói và vận chuyển.",
    ],
    sec3Title: "ĐƠN HÀNG LÀM GẤP (RUSH ORDERS)",
    rushHeadline: "Không nhận đơn làm gấp.",
    rushPoints: [
      "Có thể trễ đơn hoặc xong sớm tùy do yếu tố môi trường, thời tiết và nguồn vật liệu.",
      "Studio chỉ duy nhất 1 người làm, nên nếu đơn có trễ hơn dự kiến thì xin lỗi và mong bạn thông cảm cho mình ạ.",
    ],
    sec4Title: "TIỀN ĐẶT CỌC VÀ THANH TOÁN",
    depositPoints: [
      "Khách hàng cần thanh toán trước 40% tổng giá trị đơn commission.",
      "Tiền cọc dùng để giữ chỗ commission và chi trả cho việc mua nguyên liệu.",
      "Do tính chất đặc thù của sản phẩm đặt làm riêng, tiền cọc sẽ không được hoàn lại dưới bất kỳ hình thức nào sau khi đã thanh toán.",
      "Nếu khách hàng bỏ đơn, bộ suit dù chưa hoàn thành hay đã hoàn thành đều có thể được hoàn thiện và đưa ra bán dưới dạng hàng có sẵn (ready-made). Vui lòng cân nhắc kỹ những rủi ro trước khi bỏ đơn.",
    ],
    deadlineTag: "[Thời hạn thanh toán quan trọng]",
    deadlineText:
      "Sau khi commission hoàn thành, khách hàng phải thanh toán 60% số tiền còn lại trong vòng 3 tháng. Nếu quá thời hạn này mà khách hàng vẫn chưa hoàn tất thanh toán, đơn hàng sẽ được xem là bị bỏ. Khi đó, cả bộ suit lẫn tiền đặt cọc đều sẽ bị tịch thu. Ngay sau khi nhận đủ 100% thanh toán, sản phẩm sẽ được gửi đi ngay!",
    sec5Title: "BẢO HÀNH VÀ SỬA CHỮA",
    warrantyPoints: [
      "Nếu phát hiện bất kỳ vấn đề nào liên quan đến chất lượng sản phẩm, vui lòng nhắn tin riêng và liên hệ với mình sớm nhất có thể.",
      "Sản phẩm được bảo hành sau khi giao [đang cập nhật thời hạn bảo hành cụ thể].",
    ],
    ctaPrimary: "Gửi yêu cầu đặt đơn",
    ctaSecondary: "Xem phụ kiện lẻ",
  },
};

export default function TermsContent() {
  const { lang } = useLang();
  const isVi = lang === "vi";
  const copy = TERMS_COPY[lang];

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#111622]">
      <Navbar />

      <main className="flex-1 w-full max-w-[1160px] mx-auto px-5 md:px-10 pt-[136px] md:pt-[156px] pb-[96px] md:pb-[132px]">
        <div className="flex flex-col gap-6 pb-12 md:pb-14">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/62">
            {copy.eyebrow}
          </span>
          <h1
            className={`font-stagheiz text-[#111622] ${
              isVi
                ? "text-[36px] sm:text-[52px] md:text-[66px] leading-[1.03] tracking-[-0.025em]"
                : "text-[44px] sm:text-[62px] md:text-[78px] leading-[0.94] tracking-[-0.04em]"
            }`}
          >
            {copy.title}
          </h1>
          <p className="font-sans text-[17px] md:text-[19px] leading-[1.55] text-[#111622]/76 max-w-[680px]">
            {copy.intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {copy.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[18px] bg-[#dce8f5] border border-[#111622]/15 px-5 py-4 flex flex-col gap-1"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/60">
                  {item.label}
                </span>
                <span className="font-sans text-[15px] font-medium text-[#111622]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col border-t border-[#111622]/16">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/16">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
                (001)
              </span>
              <h2
                className={`font-stagheiz text-[#111622] ${
                  isVi
                    ? "text-[20px] md:text-[23px] leading-[1.1] tracking-[-0.02em]"
                    : "text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.04em]"
                }`}
              >
                {copy.sec1Title}
              </h2>
            </div>
            <div className="md:col-span-7 flex flex-col gap-3.5">
              <ul className="flex flex-col gap-3">
                {copy.generalPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/78"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#111622] shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/16">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
                (002)
              </span>
              <h2
                className={`font-stagheiz text-[#111622] ${
                  isVi
                    ? "text-[20px] md:text-[23px] leading-[1.1] tracking-[-0.02em]"
                    : "text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.04em]"
                }`}
              >
                {copy.sec2Title}
              </h2>
            </div>
            <div className="md:col-span-7">
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {copy.processSteps.map((step, index) => (
                  <li
                    key={index}
                    className="rounded-[14px] bg-white/80 border border-[#111622]/12 px-4 py-3 flex items-baseline gap-3"
                  >
                    <span className="font-mono text-[12px] font-bold text-[#1e3557] shrink-0">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="font-sans text-[15px] leading-[1.45] text-[#111622]/82">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/16">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
                (003)
              </span>
              <h2
                className={`font-stagheiz text-[#111622] ${
                  isVi
                    ? "text-[20px] md:text-[23px] leading-[1.1] tracking-[-0.02em]"
                    : "text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.04em]"
                }`}
              >
                {copy.sec3Title}
              </h2>
            </div>
            <div className="md:col-span-7 flex flex-col gap-4 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/78">
              <p className="font-medium text-[#111622]">
                {copy.rushHeadline}
              </p>
              <ul className="flex flex-col gap-2.5">
                {copy.rushPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#111622] shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/16">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
                (004)
              </span>
              <h2
                className={`font-stagheiz text-[#111622] ${
                  isVi
                    ? "text-[20px] md:text-[23px] leading-[1.1] tracking-[-0.02em]"
                    : "text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.04em]"
                }`}
              >
                {copy.sec4Title}
              </h2>
            </div>
            <div className="md:col-span-7 flex flex-col gap-4">
              <ul className="flex flex-col gap-3 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/78">
                {copy.depositPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#111622] shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-[18px] bg-[#fff0a6] border border-[#111622]/20 p-5 flex flex-col gap-2 text-[#111622]">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em]">
                  {copy.deadlineTag}
                </span>
                <p className="font-sans text-[15px] md:text-[16px] leading-[1.6]">
                  {copy.deadlineText}
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/16">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/55 shrink-0">
                (005)
              </span>
              <h2
                className={`font-stagheiz text-[#111622] ${
                  isVi
                    ? "text-[20px] md:text-[23px] leading-[1.1] tracking-[-0.02em]"
                    : "text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.04em]"
                }`}
              >
                {copy.sec5Title}
              </h2>
            </div>
            <div className="md:col-span-7 flex flex-col gap-3 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/78">
              <ul className="flex flex-col gap-3">
                {copy.warrantyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#111622] shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="pt-12 flex flex-wrap items-center gap-4">
          <Bouton title={copy.ctaPrimary} href="/#contact" variant="primary" />
          <Bouton
            title={copy.ctaSecondary}
            href="/accessories"
            variant="secondary"
            showArrow={false}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
