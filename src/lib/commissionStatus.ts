export interface CommissionStatus {
  open: boolean;
  note: string;
  noteVi: string;
  hasCustomNote: boolean;
  hasCustomNoteVi: boolean;
}

const DEFAULT_OPEN_NOTE_EN =
  "Taking custom fursuit heads, partials, and fullsuits. Reply within 24h.";
const DEFAULT_CLOSED_NOTE_EN =
  "Paused on new builds for now. You can still send your ref sheet for a future waitlist quote.";
const DEFAULT_OPEN_NOTE_VI =
  "Mình đang nhận đặt Custom Fursuit Head, Partial và Fullsuit. Phản hồi trong 24 giờ.";
const DEFAULT_CLOSED_NOTE_VI =
  "Hiện mình tạm ngưng nhận đơn mới. Bạn vẫn có thể gửi ref sheet để hẹn báo giá đợt sau nhé.";

const OPEN_FLAGS = new Set(["true", "1", "open", "yes"]);
const CLOSED_FLAGS = new Set(["false", "0", "closed", "no"]);

function cleanText(value: string | undefined, maxLen: number): string {
  if (!value) return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLen);
}

export function parseOpenFlag(raw: string | undefined): boolean {
  const normalized = cleanText(raw, 20).toLowerCase();
  if (!normalized) return true;
  if (OPEN_FLAGS.has(normalized)) return true;
  if (CLOSED_FLAGS.has(normalized)) return false;
  console.warn(
    `[commissionStatus] Unrecognized COMMISSION_OPEN value "${normalized}"; defaulting to closed.`
  );
  return false;
}

export function getCommissionStatus(): CommissionStatus {
  const open = parseOpenFlag(process.env.COMMISSION_OPEN);
  const rawNote = cleanText(process.env.COMMISSION_NOTE, 180);
  const rawNoteVi = cleanText(process.env.COMMISSION_NOTE_VI, 180);
  const hasCustomNote = rawNote.length > 0;
  const hasCustomNoteVi = rawNoteVi.length > 0;

  const defaultEn = open ? DEFAULT_OPEN_NOTE_EN : DEFAULT_CLOSED_NOTE_EN;
  const defaultVi = open ? DEFAULT_OPEN_NOTE_VI : DEFAULT_CLOSED_NOTE_VI;

  const note = rawNote || defaultEn;
  const noteVi = rawNoteVi || (hasCustomNote ? rawNote : defaultVi);

  return {
    open,
    note,
    noteVi,
    hasCustomNote,
    hasCustomNoteVi,
  };
}
