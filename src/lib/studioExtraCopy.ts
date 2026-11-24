import type { Lang } from "@/components/LanguageProvider";

export interface TimelineStep {
  num: string;
  tag: string;
  titre: string;
  desc: string;
}

export interface TimelineMetaCopy {
  stepPrefix: string;
  progressAria: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TermsLocaleCopy {
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

export interface LegalSectionCopy {
  num: string;
  title: string;
  paragraphs: string[];
}

export interface LegalLocaleCopy {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSectionCopy[];
}

export const TIMELINE_META: Record<Lang, TimelineMetaCopy> = {
  en: {
    stepPrefix: "Step",
    progressAria: "Commission progress timeline",
  },
  vi: {
    stepPrefix: "Bước",
    progressAria: "Tiến trình thực hiện đơn đặt",
  },
};

export const TIMELINE_STEPS: Record<Lang, TimelineStep[]> = {
  en: [
    {
      num: "01",
      tag: "Quote & 40% Deposit",
      titre: "Quote form & 40% deposit",
      desc: "Send your character ref sheet through the quote form or by email. Within 24 hours, we confirm your fur tier and color count to lock in the total price before you send the 40% non-refundable deposit to hold your slot.",
    },
    {
      num: "02",
      tag: "Materials",
      titre: "Fur swatches & sourcing",
      desc: "After the deposit clears, we match exact fur dye-lot swatches and check where hardware sits. Then we order materials right before your build enters the bench queue.",
    },
    {
      num: "03",
      tag: "Build Notice",
      titre: "Start notice & WIP updates",
      desc: "One maker builds every suit from start to finish, so I message you as soon as your turn begins. You get progress photos along the way so we catch small questions early.",
    },
    {
      num: "04",
      tag: "Shape Check",
      titre: "Pattern & shape check",
      desc: "You look over WIP photos to confirm head silhouette and ear tilt, plus how the pattern balances before fur gets stitched down permanently.",
    },
    {
      num: "05",
      tag: "Final Look",
      titre: "Finished build check",
      desc: "Once the face shave is even, the eyes and inner lining are in, and trim details are set, I send full photos of the finished suit for your final check.",
    },
    {
      num: "06",
      tag: "Balance & Ship",
      titre: "60% balance & shipping",
      desc: "You have 3 months from completion to settle the remaining 60% balance. As soon as the full total clears, I box your suit up and ship it out.",
    },
  ],
  vi: [
    {
      num: "01",
      tag: "Báo giá & Cọc 40%",
      titre: "Chốt báo giá & đặt cọc",
      desc: "Bạn gửi ref nhân vật qua form trên web hoặc email cho mình. Trong vòng 24 giờ mình sẽ báo tổng giá kèm dòng lông và số màu, thống nhất hết rồi bạn mới chuyển 40% cọc không hoàn lại để giữ slot.",
    },
    {
      num: "02",
      tag: "Nguyên liệu",
      titre: "Soi mã lông & nhập vải",
      desc: "Khi chốt xong đơn, tụi mình cùng kiểm lại đúng sắc độ mã lông theo lô vải thực tế và vị trí gắn phụ kiện. Sau đó xưởng mới đặt nguyên liệu riêng cho bộ của bạn.",
    },
    {
      num: "03",
      tag: "Vào việc",
      titre: "Báo khởi công & gửi ảnh WIP",
      desc: "Vì xưởng chỉ có một mình mình làm nên khi tới lượt trong hàng chờ, mình sẽ nhắn báo ngay. Trong lúc làm mình cũng gửi ảnh tiến độ đều để bạn tiện theo dõi.",
    },
    {
      num: "04",
      tag: "Duyệt phom",
      titre: "Kiểm tra rập & dáng tổng thể",
      desc: "Bạn xem ảnh WIP để duyệt trước độ cân của Head, góc tai, dáng mõm và tổng thể rập trước khi mình may cố định phần lông.",
    },
    {
      num: "05",
      tag: "Hoàn thiện",
      titre: "Xem ảnh thành phẩm",
      desc: "Khi đã tỉa lông đều tay, lắp mắt và may hoàn chỉnh phần lót cùng phụ kiện, mình chụp lại ảnh thành phẩm để bạn kiểm tra lần cuối.",
    },
    {
      num: "06",
      tag: "Thanh toán & Ship",
      titre: "Thanh toán 60% & gửi hàng",
      desc: "Khi suit làm xong, bạn có 3 tháng để thanh toán 60% phần còn lại. Nhận đủ 100% là mình đóng thùng gửi hàng đi ngay.",
    },
  ],
};

export const DEFAULT_ETAPES_EN: TimelineStep[] = TIMELINE_STEPS.en;
export const DEFAULT_ETAPES_VI: TimelineStep[] = TIMELINE_STEPS.vi;

export const FAQ_ITEMS: Record<Lang, FAQItem[]> = {
  en: [
    {
      question:
        "Mini partial, Half Body, or Fullsuit: which makes the most sense first?",
      answer:
        "If it is your first suit or you want something cool and easy to pack, start with a Mini partial (Head, Paws, Tail) or a Half Body since both work well with normal clothes. Fullsuits make sense when you want the whole character silhouette head to toe. You can go with plantigrade legs for a lighter everyday stance, or padded digitigrade legs for an animal leg curve.",
    },
    {
      question:
        "How long does a build take from Vietnam, and do you take rush orders?",
      answer:
        "My workshop is in Vietnam, and I ship both locally and worldwide. Your quote includes a turnaround estimate based on your markings and the current queue. But I do not take rush orders because one person handles every step here, and local humidity or fur shipping can shift dates by a few days. DMs and emails get a reply within 24 hours.",
    },
    {
      question: "Can I ask for adjustments while you are building my suit?",
      answer:
        "Yes. I send WIP photos as the build moves forward, and you sign off on both the pattern silhouette and the finished suit before shipping. Handmade sewing always carries slight natural variation. Small tweaks are easy to handle early on, though major changes outside your original ref sheet are not included.",
    },
    {
      question: "How do the 40% deposit and 3-month balance window work?",
      answer:
        "Once we agree on your quote, you send a 40% deposit to lock your slot and cover fur ordering. Because materials are bought for your character, deposits are non-refundable once sent. When your build is finished, you have 3 months to pay the remaining 60% balance. Anything left unpaid past 3 months counts as abandoned, forfeiting both the deposit and the suit. Once 100% clears, I ship right away.",
    },
    {
      question: "Can I wear my glasses inside the fursuit head?",
      answer:
        "Yes, I can carve extra clearance behind the eye blanks for most everyday glasses. Just include your frame width alongside your head measurements.",
    },
    {
      question: "What if a seam pops later, and how do I clean the suit?",
      answer:
        "If a workshop defect like a loose seam or glue split shows up after delivery, DM me right away with clear photos so I can arrange repair support. For regular cleaning, mist the head liner with fursuit spray and wipe it gently with a damp cloth, then dry it with a fan. Paws and tails can be hand-washed in cold water.",
    },
  ],
  vi: [
    {
      question: "Bộ đầu tiên nên chọn Mini partial, Half Body hay Fullsuit?",
      answer:
        "Nếu đây là bộ đầu tiên hoặc bạn ưu tiên sự gọn nhẹ khi đi fes, cứ chọn Mini partial (Head, Paws, Tail) hoặc Half Body vì phối cùng quần áo thường rất thoải mái. Còn muốn lên trọn dáng nhân vật từ đầu đến chân thì chọn Fullsuit. Xưởng làm cả hai kiểu chân: plantigrade dáng đứng thẳng nhẹ người, hoặc digitigrade có đệm tạo đường cong chân thú.",
    },
    {
      question:
        "Xưởng mình ở đâu, có ship nước ngoài không và làm mất bao lâu?",
      answer:
        "Xưởng mình đặt tại Việt Nam, nhận ship cả trong nước lẫn quốc tế. Thời gian hoàn thiện sẽ được báo rõ ngay trong báo giá, tùy độ chi tiết của nhân vật và hàng chờ lúc đó. Nhưng mình không nhận đơn làm gấp vì mọi công đoạn đều do một mình mình làm, chưa kể trời ẩm hay lịch hàng lông về đôi lúc cũng xê dịch vài ngày. Tin nhắn và email thì mình luôn trả lời trong vòng 24 giờ.",
    },
    {
      question: "Trong lúc làm mình có xin chỉnh sửa thêm được không?",
      answer:
        "Được chứ. Trong quá trình làm mình sẽ gửi ảnh tiến độ đều để bạn duyệt từ phần rập phom cho tới lúc ra thành phẩm. Đồ khâu tay thủ công luôn có một chút sai số tự nhiên nhỏ. Có điểm nào cần chỉnh nhẹ bạn cứ nhắn mình sửa sớm, còn đổi hẳn chi tiết lớn ngoài ref sheet gốc thì mình không nhận được nha.",
    },
    {
      question: "Tiền cọc 40% và hạn thanh toán 60% còn lại tính thế nào?",
      answer:
        "Sau khi thống nhất báo giá, bạn chuyển trước 40% tiền cọc để giữ slot và nhập nguyên liệu riêng cho đơn của bạn. Khoản cọc này không hoàn lại dưới mọi hình thức. Tới lúc suit hoàn thiện, bạn có tối đa 3 tháng để tất toán nốt 60% còn lại; quá 3 tháng chưa thanh toán thì đơn xem như hủy, mất cả cọc lẫn suit. Khi nhận đủ 100%, mình sẽ gửi hàng đi ngay.",
    },
    {
      question: "Mình bị cận, đeo kính bên trong Head fursuit có cấn không?",
      answer:
        "Được luôn, mình có thể khoét thêm khoảng trống sau hốc mắt để hầu hết gọng kính cận bình thường đều đeo lọt thoải mái. Lúc gửi số đo vòng đầu, bạn đo kèm giúp mình bề ngang gọng kính là ổn.",
    },
    {
      question: "Sau này bị bung chỉ hay muốn giặt vệ sinh suit thì làm sao?",
      answer:
        "Nếu nhận hàng rồi mới phát hiện lỗi gia công như bung chỉ hay hở keo, bạn nhắn riêng ngay cho mình kèm ảnh chụp rõ để mình hỗ trợ sửa. Còn vệ sinh thường ngày, bạn xịt khử mùi vào lớp lót trong Head rồi lau nhẹ bằng khăn ẩm và hong quạt cho khô hẳn; Paws với Tail thì vò tay nhẹ bằng nước lạnh là được.",
    },
  ],
};

export const DEFAULT_FAQS_EN: FAQItem[] = FAQ_ITEMS.en;
export const DEFAULT_FAQS_VI: FAQItem[] = FAQ_ITEMS.vi;

export const TERMS_COPY: Record<Lang, TermsLocaleCopy> = {
  en: {
    eyebrow: "[Commission Policy]",
    title: "Commission terms & policy",
    intro:
      "Sending a commission request means you have read and agreed to the rules on this page. Please look them over before asking for a slot.",
    highlights: [
      { label: "[Deposit]", value: "40% upfront (non-refundable)" },
      { label: "[Balance window]", value: "60% due within 3 months" },
      { label: "[Rush orders · Replies]", value: "No rush slots · Within 24h" },
    ],
    sec1Title: "GENERAL INFORMATION",
    generalPoints: [
      "Every suit is sewn and shaved by hand, so slight natural variation is normal. Handmade work will never look machine-stamped like a factory product.",
      "I send progress photos as your suit moves along. If anything feels off or you want to ask about a detail, speak up early while adjustments are still simple.",
      "I reply to messages within 24 hours. Please keep our DMs centered on your build so my schedule stays focused on sewing time.",
      "I reserve the right to decline an order if a client asks for repeated changes outside their original ref sheet, or nitpicks tiny handmade quirks unreasonably.",
      "Look through my finished builds first and make sure my style fits what you want before handing over your OC.",
    ],
    sec2Title: "COMMISSION PROCESS",
    processSteps: [
      "Send the website quote form (or email) with your character ref sheet.",
      "Confirm your fur tier and color count by email to lock the total quote before paying.",
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
      "A suit can wrap up a bit early or run slightly behind depending on local humidity and fur delivery timing.",
      "This is a one-person workshop. If your build runs past the rough estimate, thank you for your patience.",
    ],
    sec4Title: "DEPOSIT & PAYMENT",
    depositPoints: [
      "You pay 40% of the quoted price upfront as a deposit.",
      "That deposit holds your slot in the queue and goes straight toward fur and supplies.",
      "Because every fursuit is built around your specific character, deposits are non-refundable once paid.",
      "If you walk away from an order, the suit (finished or still in progress) may be completed and sold as a premade. Think it over carefully before cancelling.",
    ],
    deadlineTag: "[Important payment deadline]",
    deadlineText:
      "Once your suit is done, you have 3 months to pay the remaining 60%. If the balance is still unpaid after 3 months, the order counts as abandoned, and both the fursuit and your deposit are forfeited. Once 100% is paid, your box ships right away.",
    sec5Title: "WARRANTY & REPAIRS",
    warrantyPoints: [
      "Workshop defects such as loose seams or glue separation are covered for repair support with no rigid cutoff date, alongside faulty hardware.",
      "If something goes wrong after delivery, message me privately right away with clear photos so we can sort out the repair.",
      "Normal wear over time and accidental physical damage are outside free repair coverage. The same goes for damage from improper washing or heat.",
    ],
    ctaPrimary: "Request a commission",
    ctaSecondary: "Browse accessories",
  },
  vi: {
    eyebrow: "[Chính sách Commission]",
    title: "Điều khoản & Chính sách Commission",
    intro:
      "Khi gửi yêu cầu đặt đơn, nghĩa là bạn đã đọc và đồng ý với toàn bộ quy định bên dưới. Bạn xem kỹ trước khi chốt slot giúp mình nhé.",
    highlights: [
      { label: "[Tiền đặt cọc]", value: "Cọc trước 40% (không hoàn lại)" },
      { label: "[Hạn thanh toán]", value: "60% còn lại trong vòng 3 tháng" },
      { label: "[Đơn gấp · Phản hồi]", value: "Không nhận đơn gấp · Trong 24h" },
    ],
    sec1Title: "THÔNG TIN CHUNG",
    generalPoints: [
      "Fursuit được khâu và tỉa lông hoàn toàn bằng tay nên sẽ có độ chênh nhẹ tự nhiên, không thể đều tăm tắp như hàng máy công nghiệp. Bạn cân nhắc điểm này trước khi đặt đơn nhé.",
      "Trong lúc làm, mình sẽ gửi ảnh tiến độ khi tới từng bước mới. Thấy chỗ nào chưa ổn hoặc muốn hỏi thêm, bạn cứ nhắn mình trao đổi sớm cho dễ chỉnh.",
      "Tin nhắn mình trả lời trong vòng 24 giờ. Để giữ đúng tiến độ may hàng, mình xin phép chỉ trao đổi nội dung liên quan tới đơn đặt chứ không trò chuyện phiếm ngoài lề, mong bạn thông cảm.",
      "Mình có quyền từ chối nhận đơn nếu khách yêu cầu sửa liên tục những chi tiết không có trong thiết kế gốc, hoặc soi xét quá mức các sai số nhỏ của đồ thủ công.",
      "Trước khi gửi gắm OC cho mình, bạn nhớ xem kỹ các bộ suit mình đã làm để chắc chắn hợp gu và tay nghề của xưởng nhé.",
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
      "Tiến độ có thể xong sớm hơn hoặc chậm hơn đôi chút tùy độ ẩm thời tiết và lịch hàng lông về.",
      "Xưởng chỉ có một mình mình tự làm từ đầu tới cuối, nên nếu đơn bị lùi vài ngày so với dự kiến thì mong bạn thông cảm giúp mình nhé.",
    ],
    sec4Title: "TIỀN ĐẶT CỌC VÀ THANH TOÁN",
    depositPoints: [
      "Bạn cần thanh toán trước 40% tổng giá trị đơn để đặt cọc.",
      "Khoản cọc này dùng để giữ slot của bạn và mua sẵn lông cùng vật liệu.",
      "Vì fursuit làm riêng theo từng nhân vật nên sau khi đã chuyển, tiền cọc không được hoàn lại dưới bất kỳ hình thức nào.",
      "Nếu bạn tự ý bỏ đơn giữa chừng, bộ suit dù đang làm dở hay đã xong đều có thể được mình hoàn thiện lại rồi đăng bán như hàng có sẵn (ready-made). Hãy cân nhắc kỹ trước khi quyết định hủy đơn.",
    ],
    deadlineTag: "[Thời hạn thanh toán quan trọng]",
    deadlineText:
      "Sau khi suit làm xong, bạn có 3 tháng để thanh toán 60% phần tiền còn lại. Nếu quá 3 tháng mà chưa tất toán, đơn xem như bỏ ngang và bạn mất cả tiền cọc lẫn quyền nhận bộ suit đó. Khi nhận đủ 100%, mình sẽ đóng gói gửi đi ngay.",
    sec5Title: "BẢO HÀNH VÀ SỬA CHỮA",
    warrantyPoints: [
      "Các lỗi phát sinh từ khâu gia công tại xưởng như bung chỉ hoặc hở keo, kể cả lỗi phần cứng lắp ráp, đều được mình hỗ trợ sửa mà không đặt hạn cứng.",
      "Nếu thấy lỗi hoàn thiện sau lúc nhận hàng, bạn nhắn riêng ngay cho mình kèm ảnh chụp rõ để mình sắp xếp hỗ trợ.",
      "Hao mòn do mặc lâu ngày hoặc va đập rơi rớt ngoài ý muốn không nằm trong diện sửa miễn phí. Hư hỏng do giặt sai cách hay phơi gặp nhiệt cao cũng vậy.",
    ],
    ctaPrimary: "Gửi yêu cầu đặt đơn",
    ctaSecondary: "Xem phụ kiện lẻ",
  },
};

export const LEGAL_COPY: Record<Lang, LegalLocaleCopy> = {
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
          "This site runs on Cloudflare Workers so visitors anywhere can browse and send quote requests reliably.",
        ],
      },
      {
        num: "(003)",
        title: "INTELLECTUAL PROPERTY",
        paragraphs: [
          "Site photography and written copy, along with custom graphics and motion work, belong to FluffNii Studio and its collaborators. Please do not copy or repost anything here without written permission. Every OC design shown in commission photos stays the property of its owner.",
        ],
      },
      {
        num: "(004)",
        title: "PERSONAL DATA & PRIVACY",
        paragraphs: [
          "When you fill out the quote form, we collect your name or handle, character species, email address, selected commission items, and project notes. If you add them, we also receive your optional phone number, social or DM handle, and ref sheet link.",
          "We only use those details to review your character design and send back a quote for your suit or bundled accessories. Your details are never sold or passed to outside marketers, and we only keep them while handling your inquiry.",
          "If you want to review what you sent or have us update or delete it, email FluffNii.furries@gmail.com anytime.",
        ],
      },
      {
        num: "(005)",
        title: "COOKIES & STORAGE",
        paragraphs: [
          "We do not run ad trackers or analytics cookies here. Browser storage only handles basic site state: remembering your EN/VI language choice and keeping your quote draft, plus skipping the intro shutter during the same visit.",
        ],
      },
      {
        num: "(006)",
        title: "CONTENT ACCURACY & LINKS",
        paragraphs: [
          "We keep suit options and accessory listings current alongside slot status, though small mistakes or brief update delays can still happen. Links out to social profiles or partner channels like @CrossTalk_f for standalone 3D-printed accessories follow those platforms' own policies.",
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
          "FluffNii Studio là xưởng làm fursuit thủ công độc lập tại Việt Nam, nhận trao đổi và đặt đơn online cho cả khách trong nước lẫn quốc tế.",
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
          "Hình ảnh và bài viết cùng phần đồ họa, hiệu ứng trên trang web thuộc quyền sở hữu của FluffNii Studio hoặc các cộng tác viên thực hiện. Vui lòng không sao chép hay đăng lại cho mục đích khác nếu chưa có sự đồng ý bằng văn bản. Còn thiết kế nhân vật gốc (OC) xuất hiện trên các bộ suit trưng bày luôn thuộc về chủ nhân của nhân vật đó.",
        ],
      },
      {
        num: "(004)",
        title: "DỮ LIỆU CÁ NHÂN & QUYỀN RIÊNG TƯ",
        paragraphs: [
          "Khi bạn gửi form yêu cầu báo giá, mình sẽ nhận được tên hoặc nickname, loài nhân vật, email, các hạng mục bạn chọn và phần ghi chú dự án, kèm số điện thoại, tài khoản MXH/DM và link ref sheet nếu bạn tự điền thêm.",
          "Mình chỉ dùng những thông tin này để xem kỹ thiết kế nhân vật, tính báo giá fursuit hoặc phụ kiện gửi kèm rồi trả lời cho bạn. Xưởng không bán hay chia sẻ thông tin cho bên thứ ba, và chỉ giữ lại trong thời gian trao đổi đơn.",
          "Cần xem lại thông tin đã gửi hoặc nhờ mình chỉnh sửa, xóa bỏ dữ liệu, bạn cứ nhắn tới FluffNii.furries@gmail.com bất cứ lúc nào.",
        ],
      },
      {
        num: "(005)",
        title: "COOKIE & LƯU TRỮ TRÌNH DUYỆT",
        paragraphs: [
          "Trang web không gắn cookie quảng cáo hay công cụ theo dõi hành vi. Trình duyệt chỉ lưu vài thiết lập cơ bản để nhớ ngôn ngữ EN/VI bạn chọn, giữ tạm nội dung form báo giá đang gõ dở và không chạy lại màn hình mở đầu trong cùng phiên truy cập.",
        ],
      },
      {
        num: "(006)",
        title: "ĐỘ CHÍNH XÁC NỘI DUNG & LIÊN KẾT NGOÀI",
        paragraphs: [
          "Mình cố gắng cập nhật sát thực tế các hạng mục suit, danh sách phụ kiện và trạng thái nhận đơn, nhưng đôi lúc vẫn có thể sót chi tiết nhỏ hoặc lên chậm một nhịp. Khi bạn bấm sang mạng xã hội hay kênh của đối tác như @CrossTalk_f để đặt lẻ phụ kiện in 3D, các nền tảng đó sẽ áp dụng quy định riêng của họ.",
        ],
      },
    ],
  },
};
