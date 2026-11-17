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

const NODE = 56;
const HALF = NODE / 2;

const DEFAULT_ETAPES_EN: TimelineStep[] = [
  {
    num: "01",
    tag: "Quote & 40% Deposit",
    titre: "Email inquiry & deposit",
    desc: "Send your email quote request and wait for our reply within 24 hours. Once confirmed, pay the 40% non-refundable deposit to lock your slot.",
  },
  {
    num: "02",
    tag: "Materials",
    titre: "Fur discussion & sourcing",
    desc: "We agree on fur shades, markings, and hardware together, then purchase materials for your build before you wait your turn in the queue.",
  },
  {
    num: "03",
    tag: "Build Notice",
    titre: "Start notice & progress checks",
    desc: "When your slot begins in our solo studio queue, we notify you and share progress photos along the way so any questions come up early.",
  },
  {
    num: "04",
    tag: "Shape Check",
    titre: "Pattern & silhouette approval",
    desc: "Review WIP photos to confirm the pattern fit and overall head silhouette before fur seams are sewn permanently.",
  },
  {
    num: "05",
    tag: "Final Look",
    titre: "Finished build confirmation",
    desc: "Check completed suit photos once shaving, eyes, interior lining, and details are done so everything looks right.",
  },
  {
    num: "06",
    tag: "Balance & Ship",
    titre: "60% balance & shipping",
    desc: "Complete the remaining 60% payment within 3 months of finish. Your suit is packed and shipped immediately once 100% paid.",
  },
];

const DEFAULT_ETAPES_VI: TimelineStep[] = [
  {
    num: "01",
    tag: "Báo giá & Cọc 40%",
    titre: "Gửi mail báo giá & đặt cọc",
    desc: "Gửi email yêu cầu báo giá và chờ phản hồi trong 24 giờ. Sau khi chốt, thanh toán 40% tiền cọc không hoàn lại để giữ slot và mua nguyên liệu.",
  },
  {
    num: "02",
    tag: "Nguyên liệu",
    titre: "Trao đổi & đặt mua lông",
    desc: "Hai bên thống nhất mã màu lông, chi tiết phụ kiện và tiến hành mua vật liệu trước khi đơn của bạn vào hàng chờ.",
  },
  {
    num: "03",
    tag: "Khởi công",
    titre: "Thông báo làm & ảnh tiến độ",
    desc: "Khi đến lượt trong lịch xưởng 1 người, studio sẽ báo bắt đầu làm và cập nhật ảnh tiến độ bất cứ lúc nào để trao đổi kịp thời.",
  },
  {
    num: "04",
    tag: "Duyệt phom",
    titre: "Xác nhận rập & dáng tổng thể",
    desc: "Kiểm tra ảnh WIP để chốt tỷ lệ Head, tai, mõm và phom dáng tổng thể trước khi may ráp cố định.",
  },
  {
    num: "05",
    tag: "Thành phẩm",
    titre: "Xác nhận thành phẩm hoàn thiện",
    desc: "Xem ảnh hoàn thiện sau khi cạo lông, lắp mắt, may lót và hoàn chỉnh các chi tiết cuối cùng của fursuit.",
  },
  {
    num: "06",
    tag: "Thanh toán & Ship",
    titre: "Thanh toán 60% & giao hàng",
    desc: "Thanh toán 60% còn lại trong vòng 3 tháng sau khi xong. Fursuit sẽ được đóng gói và gửi đi ngay khi nhận đủ 100%.",
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
      style={{
        display: "grid",
        gridTemplateColumns: `${NODE}px 1fr`,
        gap: 28,
        alignItems: "flex-start",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: NODE,
          height: NODE,
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
            color: "rgba(17, 22, 34, 0.55)",
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
          gap: 10,
        }}
      >
        {item.tag && (
          <span
            style={{
              fontFamily: 'var(--font-space-mono), "Space Mono", monospace',
              fontSize: 13,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(17, 22, 34, 0.62)",
            }}
          >
            [{item.tag}]
          </span>
        )}
        <h3
          className="font-stagheiz"
          style={{
            fontSize: "clamp(24px, 2.5vw, 32px)",
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
            fontSize: 17,
            lineHeight: 1.55,
            letterSpacing: "-0.01em",
            color: "rgba(17, 22, 34, 0.62)",
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
      style={{
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: HALF - 1,
          top: HALF,
          bottom: HALF,
          width: 2,
          background: trackColor,
          borderRadius: 2,
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          left: HALF - 1,
          top: HALF,
          bottom: HALF,
          width: 2,
          background: couleurAccent,
          borderRadius: 2,
          transformOrigin: "top center",
          scaleY: progress,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 72,
          position: "relative",
        }}
      >
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
