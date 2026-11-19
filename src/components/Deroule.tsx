"use client";

import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLang } from "./LanguageProvider";

export interface TimelineStep {
  num: string;
  tag: string;
  titre: string;
  desc: string;
}

const DEFAULT_ETAPES_EN: TimelineStep[] = [
  {
    num: "01",
    tag: "Quote & 40% Deposit",
    titre: "Quote form & 40% deposit",
    desc: "Send your character ref sheet through the quote form or by email. We lock in your fur tier, color count, and total quote within 24 hours before you pay the 40% non-refundable deposit to reserve your slot.",
  },
  {
    num: "02",
    tag: "Materials",
    titre: "Fur swatches & sourcing",
    desc: "Once the quote is set, we check exact fur dye-lot swatches and where any hardware sits. Then we order your materials right before your build enters the queue.",
  },
  {
    num: "03",
    tag: "Build Notice",
    titre: "Start notice & WIP updates",
    desc: "Because one maker handles every suit, I message you as soon as your turn begins and send progress photos along the way so we catch any question early.",
  },
  {
    num: "04",
    tag: "Shape Check",
    titre: "Pattern & shape check",
    desc: "You review WIP photos to approve the head silhouette, ear angle, and pattern fit before anything gets stitched down for good.",
  },
  {
    num: "05",
    tag: "Final Look",
    titre: "Finished build check",
    desc: "Once shaving, eyes, inner lining, and small details are done, I send finished photos so you can look everything over.",
  },
  {
    num: "06",
    tag: "Balance & Ship",
    titre: "60% balance & shipping",
    desc: "You have 3 months after completion to pay the remaining 60% balance. As soon as the full total clears, I pack your suit and ship it out.",
  },
];

const DEFAULT_ETAPES_VI: TimelineStep[] = [
  {
    num: "01",
    tag: "Báo giá & Cọc 40%",
    titre: "Chốt báo giá & đặt cọc",
    desc: "Bạn gửi ref nhân vật qua form trên web hoặc email cho mình. Mình sẽ báo tổng giá cùng dòng lông và số màu trong vòng 24 giờ, chốt xong hết bạn mới chuyển 40% cọc không hoàn lại để giữ slot.",
  },
  {
    num: "02",
    tag: "Nguyên liệu",
    titre: "Soi mã lông & nhập vải",
    desc: "Sau khi chốt giá, tụi mình cùng kiểm lại đúng sắc độ mã lông theo lô vải và vị trí phụ kiện rồi xưởng mình mới đặt mua vật liệu cho đơn của bạn.",
  },
  {
    num: "03",
    tag: "Vào việc",
    titre: "Báo khởi công & gửi ảnh WIP",
    desc: "Vì xưởng chỉ có một mình mình làm nên khi tới lượt trong hàng chờ, mình sẽ nhắn báo ngay và gửi ảnh tiến độ đều đặn để bạn tiện theo dõi.",
  },
  {
    num: "04",
    tag: "Duyệt phom",
    titre: "Kiểm tra rập & dáng tổng thể",
    desc: "Bạn xem ảnh WIP để duyệt trước độ cân của Head, tai, mõm và phom dáng chung trước khi mình may cố định phần lông.",
  },
  {
    num: "05",
    tag: "Hoàn thiện",
    titre: "Xem ảnh thành phẩm",
    desc: "Khi mình cạo tỉa lông, lắp mắt, may lót trong và gắn đủ phụ kiện xong xuôi, mình sẽ chụp ảnh hoàn chỉnh để bạn kiểm tra lần cuối.",
  },
  {
    num: "06",
    tag: "Thanh toán & Ship",
    titre: "Thanh toán 60% & gửi hàng",
    desc: "Khi suit làm xong, bạn có 3 tháng để thanh toán 60% phần còn lại. Nhận đủ 100% là mình đóng thùng gửi đi ngay.",
  },
];

interface StepItemProps {
  item: TimelineStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  couleurTexte: string;
  couleurAccent: string;
  couleurFondPastille: string;
  trackColor: string;
}

function StepItem({
  item,
  index,
  total,
  progress,
  couleurTexte,
  couleurAccent,
  couleurFondPastille,
  trackColor,
}: StepItemProps) {
  const at = total > 1 ? index / (total - 1) : 0;
  const on = useTransform(progress, [Math.max(0, at - 0.06), at + 0.02], [0, 1]);
  const textOpacity = useTransform(on, [0, 1], [0.28, 1]);
  const textX = useTransform(on, [0, 1], [-10, 0]);
  const dotScale = useTransform(on, [0, 1], [0.6, 1]);
  const displayNum = String(index + 1).padStart(2, "0");

  return (
    <div
      className="relative z-[1] grid items-start gap-4 md:gap-7"
      style={{
        gridTemplateColumns: "var(--node) 1fr",
      }}
    >
      <div
        style={{
          width: "var(--node)",
          height: "var(--node)",
          borderRadius: 999,
          background: couleurFondPastille,
          border: `1.5px solid ${trackColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
            fontSize: 13,
            color: "rgba(17, 22, 34, 0.72)",
            zIndex: 1,
            userSelect: "none",
          }}
        >
          {item.num.length <= 3 ? item.num : displayNum}
        </span>

        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: couleurAccent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            opacity: on,
            scale: dotScale,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
              fontSize: 13,
              color: couleurFondPastille,
              userSelect: "none",
            }}
          >
            {item.num.length <= 3 ? item.num : displayNum}
          </span>
        </motion.div>
      </div>

      <motion.div
        style={{
          opacity: textOpacity,
          x: textX,
          paddingTop: 4,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {item.tag && (
          <span
            style={{
              fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(17, 22, 34, 0.72)",
            }}
          >
            [{item.tag}]
          </span>
        )}
        <h3
          className="font-stagheiz"
          style={{
            fontSize: "clamp(22px, 2.5vw, 32px)",
            lineHeight: 1.0,
            letterSpacing: "-0.015em",
            textTransform: "uppercase",
            color: couleurTexte,
            margin: 0,
          }}
        >
          {item.titre}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
            fontWeight: 400,
            fontSize: 16.5,
            lineHeight: 1.55,
            letterSpacing: "-0.01em",
            color: "rgba(17, 22, 34, 0.72)",
            maxWidth: 540,
            margin: 0,
          }}
        >
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
}

interface DerouleProps {
  etapes?: TimelineStep[];
  couleurTexte?: string;
  couleurAccent?: string;
  couleurFondPastille?: string;
  trackColor?: string;
}

export default function Deroule({
  etapes,
  couleurTexte = "#111622",
  couleurAccent = "#111622",
  couleurFondPastille = "#F5F8FC",
  trackColor = "rgba(17, 22, 34, 0.16)",
}: DerouleProps) {
  const { lang } = useLang();
  const activeEtapes =
    etapes ?? (lang === "vi" ? DEFAULT_ETAPES_VI : DEFAULT_ETAPES_EN);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      className="relative w-full box-border [--node:44px] md:[--node:56px]"
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "calc(var(--node) / 2 - 1px)",
          top: "calc(var(--node) / 2)",
          bottom: "calc(var(--node) / 2)",
          width: 2,
          background: trackColor,
          borderRadius: 2,
        }}
      />

      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "calc(var(--node) / 2 - 1px)",
          top: "calc(var(--node) / 2)",
          bottom: "calc(var(--node) / 2)",
          width: 2,
          background: couleurAccent,
          borderRadius: 2,
          transformOrigin: "top center",
          scaleY: progress,
        }}
      />

      <div className="relative flex flex-col gap-10 md:gap-[72px]">
        {activeEtapes.map((item, index) => (
          <StepItem
            key={`${item.num}-${index}`}
            item={item}
            index={index}
            total={activeEtapes.length}
            progress={progress}
            couleurTexte={couleurTexte}
            couleurAccent={couleurAccent}
            couleurFondPastille={couleurFondPastille}
            trackColor={trackColor}
          />
        ))}
      </div>
    </div>
  );
}
