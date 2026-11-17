"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "./LanguageProvider";

export interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS_EN: FAQItem[] = [
  {
    question: "Partial or fullsuit: which should I pick first?",
    answer:
      "If it's your first suit or you want something easy to pack, a mini partial (head, handpaws, tail) lets you wear normal clothes and stay cooler. A fullsuit gives you the complete character silhouette from head to toe, using either straight plantigrade legs or padded digitigrade legs.",
  },
  {
    question: "How long does a build take, and do you take rush orders?",
    answer:
      "Rush orders are not accepted. Because FluffNii Studio is operated by one solo maker, completion times can move slightly earlier or later depending on weather and material deliveries. Messages are answered within 24 hours.",
  },
  {
    question: "Can I ask for tweaks during the build?",
    answer:
      "Yes. Progress photos may be shared during the build, and you confirm both the pattern fitting/overall silhouette and the finished suit before final shipping. Please keep in mind that handmade items have natural variation, and excessive unrelated changes outside your original ref cannot be accepted.",
  },
  {
    question: "How do deposits and final payments work?",
    answer:
      "A 40% upfront deposit secures your slot and covers materials, and deposits are non-refundable once paid. Once finished, the remaining 60% balance is due within 3 months (overdue orders are considered abandoned). Your suit ships right after 100% payment is received.",
  },
  {
    question: "Can I wear glasses inside the head?",
    answer:
      "We can carve extra clearance behind the eye blanks for most everyday frames. Just include your frame width when sending your head measurements.",
  },
  {
    question: "What if there is a quality issue or wash question later?",
    answer:
      "Message privately as soon as possible if any build-quality issue appears after delivery for warranty support. For cleaning, wipe the lined head interior with fursuit spray and a damp cloth, air-dry on a fan, and hand-wash paws or tails cold.",
  },
];

const DEFAULT_FAQS_VI: FAQItem[] = [
  {
    question: "Nên chọn Mini Partial, Half Body hay Fullsuit cho bộ đầu tiên?",
    answer:
      "Nếu đây là fursuit đầu tiên hoặc bạn ưu tiên mặc gọn nhẹ, thoáng mát khi đi fes, Mini Partial (Head, Paws, Tail) hoặc Half Body rất dễ mặc cùng đồ thường. Fullsuit cho trọn vẹn phom nhân vật từ đầu đến chân.",
  },
  {
    question: "Thời gian làm mất bao lâu và có nhận đơn gấp (Rush Order) không?",
    answer:
      "Studio không nhận đơn làm gấp. Vì chỉ có 1 người trực tiếp thực hiện nên tiến độ có thể sớm hoặc trễ hơn dự kiến tuỳ yếu tố môi trường và nguồn lông. Tin nhắn công việc sẽ được trả lời trong vòng 24 giờ.",
  },
  {
    question: "Trong quá trình làm có được chỉnh sửa không?",
    answer:
      "Có. Studio gửi ảnh tiến độ trong lúc làm để bạn kiểm tra rập, hình dáng tổng thể và xác nhận thành phẩm trước khi đóng gói. Lưu ý hàng thủ công không thể hoàn hảo 100% và studio không nhận chỉnh sửa quá nhiều chi tiết ngoài thiết kế gốc.",
  },
  {
    question: "Tiền cọc và hạn thanh toán sau khi hoàn thành như thế nào?",
    answer:
      "Bạn cần thanh toán trước 40% tiền cọc (không hoàn lại) để giữ slot và mua nguyên liệu. Sau khi fursuit hoàn tất, 60% còn lại cần thanh toán trong vòng 3 tháng; hàng sẽ gửi đi ngay khi nhận đủ 100%.",
  },
  {
    question: "Có đeo kính cận bên trong Head fursuit được không?",
    answer:
      "Studio có thể khoét rộng khoảng trống sau mắt để vừa hầu hết gọng kính cận thông thường. Chỉ cần báo kèm kích thước gọng khi gửi số đo vòng đầu.",
  },
  {
    question: "Bảo hành chất lượng và vệ sinh fursuit như thế nào?",
    answer:
      "Nếu phát hiện lỗi chất lượng sau khi nhận hàng, hãy nhắn riêng ngay cho studio để được hỗ trợ bảo hành. Khi vệ sinh, lau lớp lót bên trong Head bằng dung dịch khử mùi và phơi quạt mát; Paws và Tail có thể giặt nhẹ bằng nước lạnh.",
  },
];

export default function FAQAccordion({ items }: { items?: FAQItem[] }) {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeItems =
    items ?? (lang === "vi" ? DEFAULT_FAQS_VI : DEFAULT_FAQS_EN);

  return (
    <div className="w-full flex flex-col">
      {activeItems.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            onClick={() => setOpenIndex(isOpen ? null : idx)}
            className="cursor-pointer border-b border-[#111622]/16 py-[26px] select-none"
          >
            <div className="flex items-center justify-between gap-6">
              <h3 className="font-sans text-[20px] md:text-[22px] font-medium tracking-[-0.02em] leading-[1.3] text-[#111622]">
                {item.question}
              </h3>
              <motion.div
                animate={{
                  rotate: isOpen ? 45 : 0,
                  backgroundColor: isOpen ? "#111622" : "rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-[44px] h-[44px] rounded-full border-[1.5px] border-[#111622] flex items-center justify-center shrink-0"
              >
                <Plus
                  className="w-[20px] h-[20px] transition-colors duration-300"
                  style={{ color: isOpen ? "#f5f8fc" : "#111622" }}
                  strokeWidth={1.75}
                />
              </motion.div>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-[18px] pr-0 md:pr-[80px] font-sans text-[16px] md:text-[17px] leading-[1.55] tracking-[-0.01em] text-[#111622]/62">
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
