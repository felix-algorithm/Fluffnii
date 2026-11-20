"use client";

import React, { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./CircularRevealToggle";

export interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS_EN: FAQItem[] = [
  {
    question: "Mini partial, Half Body, or Fullsuit: which makes the most sense first?",
    answer:
      "If it is your first suit or you want something easy to pack and cool to wear, start with a Mini partial (Head, Paws, Tail) or a Half Body since you can pair them with everyday clothes. Go for a Fullsuit if you want the full silhouette head to toe. You can pick plantigrade legs for a straighter, lighter fit, or padded digitigrade legs for that sculpted animal leg curve.",
  },
  {
    question: "Where are you based, how long does a build take, and do you take rush orders?",
    answer:
      "My workshop is in Vietnam, and I ship both domestically and worldwide. You get a turnaround estimate right in your quote based on your design's markings and where the queue sits. I do not take rush orders because I handle every step myself, and humidity or fur shipments can shift dates a little. DMs and emails get a reply within 24 hours.",
  },
  {
    question: "Can I ask for adjustments while you are building my suit?",
    answer:
      "Yes. I share progress photos throughout the build, and you sign off on both the pattern silhouette and the finished suit before it goes in the box. Because every suit is sewn by hand, slight natural variation is normal. Minor tweaks are always welcome early on, while big changes outside your original ref sheet are not.",
  },
  {
    question: "How do the 40% deposit and 3-month balance window work?",
    answer:
      "You pay a 40% deposit upfront once we agree on the quote. That locks your slot and pays for materials, so deposits are non-refundable once sent. When your suit is finished, you have 3 months to pay the remaining 60%. Orders left unpaid past 3 months count as abandoned, forfeiting both the deposit and the suit. Once the full 100% clears, I ship right away.",
  },
  {
    question: "Can I wear my glasses inside the fursuit head?",
    answer:
      "Yes, I can carve extra clearance behind the eye blanks for most everyday frames. Just send your frame width along with your head measurements so I leave enough room.",
  },
  {
    question: "What if a seam pops later, and how do I clean the suit?",
    answer:
      "If a workshop defect like a loose seam or glue split shows up after delivery, DM me right away with clear photos so I can arrange repair support. For regular upkeep, mist the lined head interior with fursuit spray, wipe gently with a damp cloth, let a fan dry it out, and hand-wash paws or tails in cold water.",
  },
];

const DEFAULT_FAQS_VI: FAQItem[] = [
  {
    question: "Bộ đầu tiên nên chọn Mini partial, Half Body hay Fullsuit?",
    answer:
      "Nếu là bộ đầu tiên hoặc bạn thích gọn nhẹ, dễ thở khi chạy nhảy ở fes, cứ chọn Mini partial (Head, Paws, Tail) hoặc Half Body vì phối cùng đồ thường rất khỏe. Còn muốn lên trọn dáng nhân vật từ đầu đến chân thì mình làm Fullsuit, có hai kiểu chân cho bạn chọn: plantigrade (dáng đứng thẳng tự nhiên, nhẹ người) hoặc digitigrade (có đệm tạo đường cong chân thú).",
  },
  {
    question: "Xưởng mình ở đâu, có ship nước ngoài không và làm mất bao lâu?",
    answer:
      "Xưởng mình ở Việt Nam, nhận gửi hàng cả trong nước lẫn quốc tế. Thời gian hoàn thiện sẽ được ghi rõ ngay khi mình báo giá, tùy độ cầu kỳ của nhân vật và hàng chờ lúc đó. Mình không nhận đơn làm gấp vì từ rập tới may chỉ có một mình mình làm, chưa kể thời tiết ẩm hay hàng lông về chậm đôi khi cũng xê dịch vài ngày. Tin nhắn thì mình luôn trả lời trong vòng 24 giờ.",
  },
  {
    question: "Trong lúc làm mình có xin chỉnh sửa thêm được không?",
    answer:
      "Được chứ. Lúc làm mình sẽ gửi ảnh tiến độ đều để bạn kiểm tra rập, phom tổng thể rồi duyệt thành phẩm trước khi đóng gói. Nhưng vì đồ khâu tay thủ công luôn có chút sai số tự nhiên nên có chỗ nào chưa ưng bạn cứ nhắn mình sửa sớm, còn đổi hẳn chi tiết lớn ngoài ref sheet ban đầu thì mình không nhận được nha.",
  },
  {
    question: "Tiền cọc 40% và hạn thanh toán 60% còn lại tính thế nào?",
    answer:
      "Sau khi chốt báo giá, bạn chuyển trước 40% tiền cọc để mình giữ slot và nhập lông. Khoản cọc này không hoàn lại dưới mọi hình thức. Tới lúc suit hoàn thiện, bạn có tối đa 3 tháng để thanh toán nốt 60% còn lại; quá 3 tháng không tất toán thì đơn xem như hủy, mất cọc lẫn suit. Khi mình nhận đủ 100%, hàng sẽ đi ngay.",
  },
  {
    question: "Mình bị cận, đeo kính bên trong Head fursuit có cấn không?",
    answer:
      "Mình khoét thêm khoảng trống sau hốc mắt được nên hầu hết gọng kính cận bình thường đều đeo lọt thoải mái. Lúc gửi số đo vòng đầu, bạn đo giúp mình thêm bề ngang gọng kính là được.",
  },
  {
    question: "Sau này bị bung chỉ hay muốn giặt vệ sinh suit thì làm sao?",
    answer:
      "Nếu nhận hàng rồi mới phát hiện lỗi gia công như bung chỉ hay hở keo, bạn cứ nhắn riêng kèm ảnh rõ cho mình ngay để mình hỗ trợ sửa. Còn vệ sinh thường ngày thì bạn xịt khử mùi lên lớp lót trong Head, lau nhẹ bằng khăn ẩm rồi hong quạt cho khô hẳn, còn Paws và Tail cứ vò tay nhẹ bằng nước lạnh là ổn.",
  },
];

export default function FAQAccordion({ items }: { items?: FAQItem[] }) {
  const { lang } = useLang();
  const { isDark } = useTheme();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeItems =
    items ?? (lang === "vi" ? DEFAULT_FAQS_VI : DEFAULT_FAQS_EN);

  return (
    <div className="w-full flex flex-col">
      {activeItems.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${baseId}-btn-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;
        return (
          <div
            key={idx}
            className={`border-b ${
              isDark ? "border-[#f5f8fc]/[0.16]" : "border-[#111622]/[0.16]"
            }`}
          >
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className={`w-full py-[24px] md:py-[26px] flex items-center justify-between gap-6 text-left cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isDark
                    ? "focus-visible:ring-[#fff0a6] focus-visible:ring-offset-[#0b0f17]"
                    : "focus-visible:ring-[#111622] focus-visible:ring-offset-[#f5f8fc]"
                }`}
              >
                <span
                  className={`font-sans text-[20px] md:text-[22px] font-medium tracking-[-0.02em] leading-[1.3] ${
                    isDark ? "text-[#f5f8fc]" : "text-[#111622]"
                  }`}
                >
                  {item.question}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    backgroundColor: isOpen
                      ? isDark
                        ? "#fff0a6"
                        : "#111622"
                      : "rgba(0,0,0,0)",
                    borderColor: isDark
                      ? isOpen
                        ? "#fff0a6"
                        : "#f5f8fc"
                      : "#111622",
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-[44px] h-[44px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                    isDark ? "border-[#f5f8fc]" : "border-[#111622]"
                  }`}
                >
                  <Plus
                    className="w-[20px] h-[20px] transition-colors duration-300"
                    style={{
                      color: isOpen
                        ? isDark
                          ? "#111622"
                          : "#f5f8fc"
                        : isDark
                        ? "#f5f8fc"
                        : "#111622",
                    }}
                    strokeWidth={1.75}
                  />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={`pb-[26px] pr-0 md:pr-[80px] font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] ${
                      isDark ? "text-[#f5f8fc]/75" : "text-[#111622]/75"
                    }`}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
