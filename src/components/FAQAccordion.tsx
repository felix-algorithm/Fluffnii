"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "Partial or fullsuit: which should I pick first?",
    answer:
      "If it's your first suit or you want something easy to pack, a mini partial (head, handpaws, tail) lets you wear normal clothes and stay cooler. A fullsuit gives you the complete character silhouette from head to toe, using either straight plantigrade legs or padded digitigrade legs.",
  },
  {
    question: "How long does a custom build take?",
    answer:
      "Once your slot starts, heads and mini partials take 6 to 10 weeks, and fullsuits take 12 to 16 weeks depending on markings.",
  },
  {
    question: "Can I ask for tweaks during the build?",
    answer:
      "Yes. We send photo check-ins at the base stage, eye placement, and fur taping before anything is sewn shut. Small adjustments at those checkpoints are included so the face matches what you pictured.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. A 50% deposit holds your slot and covers fur ordering, with the other half split into monthly payments while your suit is in the queue. Your suit ships once it's paid off.",
  },
  {
    question: "Can I wear glasses inside the head?",
    answer:
      "We can carve extra clearance behind the eye blanks for most everyday frames. Just include your frame width when sending your head measurements.",
  },
  {
    question: "How do I wash and care for my fursuit?",
    answer:
      "Every head is lined so you can wipe it down with fursuit spray and a damp cloth after wearing, then dry it on a fan. Paws, tails, and bodysuits with pillows removed can be hand-washed cold in the tub and air-dried with a slicker brush.",
  },
];

export default function FAQAccordion({ items = DEFAULT_FAQS }: { items?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col">
      {items.map((item, idx) => {
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
