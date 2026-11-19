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
      "Sending a commission request means you have read and agreed to everything on this page. Please look through these rules before asking for a slot.",
    highlights: [
      { label: "[Deposit]", value: "40% upfront (non-refundable)" },
      { label: "[Balance window]", value: "60% due within 3 months" },
      { label: "[Rush orders · Replies]", value: "No rush slots · Within 24h" },
    ],
    sec1Title: "GENERAL INFORMATION",
    generalPoints: [
      "Every suit is sewn and shaved by hand, so small natural variations are part of the craft. Please keep that in mind instead of expecting factory machine uniformity.",
      "I share progress photos throughout the build. If anything looks off or you have a question, speak up right away while things are still easy to adjust.",
      "Messages get a reply within 24 hours. Please keep our chats focused on your commission rather than casual small talk so I can stay on top of build time.",
      "I reserve the right to turn down orders if someone asks for constant changes unrelated to the original character design, or nitpicks minor handmade details unreasonably.",
      "Look through my finished work and make sure you trust my style before putting your OC in my hands.",
    ],
    sec2Title: "COMMISSION PROCESS",
    processSteps: [
      "Send the website quote form (or email) with your character ref sheet.",
      "Finalize your fur tier, color count, and total quote by email before paying.",
      "Pay the 40% non-refundable deposit to lock your slot.",
      "Confirm exact fur dye-lot swatches.",
      "Materials are ordered and sourced.",
      "Wait for your turn in the build queue.",
      "Get a message when work on your suit begins.",
      "Approve the pattern fit and head silhouette.",
      "Approve the finished build photos.",
      "Pay the remaining 60% balance.",
      "Packing and shipping.",
    ],
    sec3Title: "RUSH ORDERS & SCHEDULE",
    rushHeadline: "No rush orders.",
    rushPoints: [
      "A suit might wrap up a little early or take longer depending on weather, humidity, and fur delivery times.",
      "This is a one-person workshop. If your build runs past the rough estimate, thank you genuinely for your patience.",
    ],
    sec4Title: "DEPOSIT & PAYMENT",
    depositPoints: [
      "You pay 40% of the quoted price upfront as a deposit.",
      "That deposit holds your slot in the queue and goes straight toward fur and supplies.",
      "Because every fursuit is built specifically for your character, deposits are non-refundable for any reason once paid.",
      "If you walk away from an order, the suit (finished or still in progress) may be completed and sold as a premade. Think it through carefully before backing out.",
    ],
    deadlineTag: "[Important payment deadline]",
    deadlineText:
      "Once your suit is done, you have 3 months to pay the remaining 60%. If the balance is still unpaid after 3 months, the order counts as abandoned, and both the fursuit and your deposit are forfeited. Once 100% is paid, your box ships right away.",
    sec5Title: "WARRANTY & REPAIRS",
    warrantyPoints: [
      "Workshop defects (such as loose seams, glue separation, or hardware faults) are covered for repair support with no rigid cutoff date.",
      "If something goes wrong after delivery, message me privately right away with clear photos so we can sort out the repair.",
      "Regular wear over time, improper washing or heat exposure, and accidental drops or physical damage are outside free repair coverage.",
    ],
    ctaPrimary: "Request a commission",
    ctaSecondary: "Browse accessories",
  },
  vi: {
    eyebrow: "[Chính sách Commission]",
    title: "Điều khoản & Chính sách Commission",
    intro:
      "Khi gửi yêu cầu đặt đơn, nghĩa là bạn đã đọc và đồng ý với toàn bộ quy định bên dưới. Bạn đọc kỹ trước khi chốt slot giúp mình nhé.",
    highlights: [
      { label: "[Tiền đặt cọc]", value: "Cọc trước 40% (không hoàn lại)" },
      { label: "[Hạn thanh toán]", value: "60% còn lại trong vòng 3 tháng" },
      { label: "[Đơn gấp · Phản hồi]", value: "Không nhận đơn gấp · Trong 24h" },
    ],
    sec1Title: "THÔNG TIN CHUNG",
    generalPoints: [
      "Fursuit làm thủ công hoàn toàn nên không thể đều tăm tắp 100% như hàng máy công nghiệp. Bạn cân nhắc kỹ điểm này trước khi đặt đơn nhé.",
      "Trong lúc làm, mình sẽ gửi ảnh tiến độ bất cứ lúc nào khi có bước mới. Thấy chỗ nào lấn cấn hay cần hỏi, bạn nhắn mình trao đổi luôn cho kịp.",
      "Tin nhắn mình luôn trả lời trong vòng 24 giờ. Mình xin phép chỉ trao đổi chuyện công việc chứ không nhận tám chuyện phiếm ngoài lề, mong bạn thông cảm để mình tập trung làm hàng.",
      "Mình có quyền từ chối nhận đơn nếu người đặt đòi sửa quá nhiều chi tiết chẳng liên quan tới thiết kế gốc, hoặc soi xét tiểu tiết quá mức với hàng may tay.",
      "Trước khi giao OC của bạn cho mình, hãy xem kỹ các bộ mình đã làm để yên tâm với tay nghề của xưởng nhé.",
    ],
    sec2Title: "QUY TRÌNH ĐẶT COMMISSION",
    processSteps: [
      "Gửi form báo giá trên website (hoặc email) kèm ref sheet nhân vật.",
      "Chốt dòng lông, số lượng màu và tổng báo giá qua email trước khi chuyển tiền.",
      "Thanh toán 40% tiền cọc (không hoàn lại) để giữ slot.",
      "Kiểm và chốt lại mã màu lông thực tế theo lô vải.",
      "Xưởng đặt mua nguyên liệu cho đơn của bạn.",
      "Chờ tới lượt trong hàng chờ của xưởng.",
      "Nhận tin nhắn báo bắt đầu vào làm suit.",
      "Xem ảnh WIP để duyệt rập và phom dáng tổng thể.",
      "Xem ảnh chụp thành phẩm hoàn chỉnh.",
      "Thanh toán 60% số tiền còn lại.",
      "Đóng gói và vận chuyển.",
    ],
    sec3Title: "ĐƠN HÀNG LÀM GẤP (RUSH ORDERS)",
    rushHeadline: "Xưởng không nhận đơn làm gấp.",
    rushPoints: [
      "Tiến độ có thể xong sớm hơn hoặc chậm hơn đôi chút tùy thời tiết, độ ẩm và lịch hàng lông về.",
      "Xưởng chỉ có một mình mình tự làm từ đầu đến cuối, nên nếu đơn có lùi vài ngày so với dự kiến thì cho mình xin lỗi trước và mong bạn thông cảm nhé.",
    ],
    sec4Title: "TIỀN ĐẶT CỌC VÀ THANH TOÁN",
    depositPoints: [
      "Bạn cần thanh toán trước 40% tổng giá trị đơn để đặt cọc.",
      "Khoản cọc này dùng để giữ slot của bạn và mua sẵn lông cùng vật liệu.",
      "Vì fursuit làm riêng theo từng nhân vật nên sau khi đã chuyển, tiền cọc không được hoàn lại dưới bất kỳ hình thức nào.",
      "Nếu bạn tự ý bỏ đơn giữa chừng, bộ suit dù đang làm dở hay đã xong đều có thể được mình hoàn thiện lại rồi đăng bán như hàng có sẵn (ready-made). Hãy cân nhắc kỹ trước khi quyết định bỏ đơn.",
    ],
    deadlineTag: "[Thời hạn thanh toán quan trọng]",
    deadlineText:
      "Sau khi suit làm xong, bạn có 3 tháng để thanh toán 60% phần tiền còn lại. Nếu quá 3 tháng mà vẫn chưa tất toán, đơn sẽ bị tính là bỏ ngang: bạn mất toàn bộ tiền cọc lẫn quyền nhận bộ suit đó. Ngược lại, ngay khi nhận đủ 100%, mình sẽ đóng gói gửi đi liền!",
    sec5Title: "BẢO HÀNH VÀ SỬA CHỮA",
    warrantyPoints: [
      "Các lỗi do gia công tại xưởng (như bung chỉ, hở keo hay lỗi phụ kiện lắp ráp) đều được mình hỗ trợ sửa lại, không đặt hạn cứng.",
      "Khi phát hiện lỗi hoàn thiện sau lúc nhận hàng, bạn nhắn riêng ngay cho mình kèm ảnh chụp rõ chỗ hư để mình sắp xếp hỗ trợ.",
      "Hao mòn do mặc lâu ngày, hư hỏng vì giặt sai cách hoặc phơi nóng, hay rơi rớt va đập ngoài ý muốn sẽ không nằm trong diện sửa miễn phí.",
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
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/70">
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
          <p className="font-sans text-[17px] md:text-[19px] leading-[1.55] text-[#111622]/80 max-w-[680px]">
            {copy.intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {copy.highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[18px] bg-[#dce8f5] border border-[#111622]/15 px-5 py-4 flex flex-col gap-1"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#111622]/70">
                  {item.label}
                </span>
                <span className="font-sans text-[15px] font-medium text-[#111622]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col border-t border-[#111622]/15">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/15">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/70 shrink-0">
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
                    className="flex items-start gap-3 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/80"
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

          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/15">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/70 shrink-0">
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
                    className="rounded-[14px] bg-white/80 border border-[#111622]/15 px-4 py-3 flex items-baseline gap-3"
                  >
                    <span className="font-mono text-[12px] font-bold text-[#1e3557] shrink-0">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="font-sans text-[15px] leading-[1.45] text-[#111622]/85">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/15">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/70 shrink-0">
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
            <div className="md:col-span-7 flex flex-col gap-4 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/80">
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

          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/15">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/70 shrink-0">
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
              <ul className="flex flex-col gap-3 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/80">
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

          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-11 border-b border-[#111622]/15">
            <div className="md:col-span-5 flex items-baseline gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#111622]/70 shrink-0">
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
            <div className="md:col-span-7 flex flex-col gap-3 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#111622]/80">
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
