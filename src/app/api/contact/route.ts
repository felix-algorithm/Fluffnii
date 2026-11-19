import { NextResponse } from "next/server";
import { getCommissionStatus } from "@/lib/commissionStatus";

export const runtime = "nodejs";

const DEFAULT_STUDIO_EMAIL = "FluffNii.furries@gmail.com";
const DEFAULT_RESEND_FROM = "FluffNii Studio <onboarding@resend.dev>";
const BODY_DTD_OPTIONS = new Set(["Only body", "Half-body", "Fullsuit"]);
const EMAIL_REGEX = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;
const MAX_BODY_BYTES = 16384;
const MIN_FORM_ELAPSED_MS = 2500;
const RESEND_TIMEOUT_MS = 12000;

type ContactLang = "en" | "vi";

type ContactErrorCode =
  | "PAYLOAD_TOO_LARGE"
  | "INVALID_JSON"
  | "TOO_FAST"
  | "MISSING_FIELDS"
  | "INVALID_EMAIL"
  | "MISSING_TYPES"
  | "SERVICE_UNAVAILABLE"
  | "SEND_FAILED";

interface ContactPayload {
  name: string;
  species: string;
  email: string;
  phone: string;
  facebook: string;
  refLink: string;
  commissionTypes: string[];
  message: string;
  lang: ContactLang;
}

function errorResponse(errorCode: ContactErrorCode, status: number) {
  return NextResponse.json({ ok: false, errorCode }, { status });
}

function cleanSingleLine(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLen);
}

function cleanMultiLine(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, maxLen);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isCloudflareWorkersRuntime(): boolean {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  if (ua.includes("Cloudflare-Workers")) return true;
  if (
    typeof (globalThis as Record<string, unknown>).WebSocketPair !== "undefined"
  ) {
    return true;
  }
  return Boolean(process.env.CF_PAGES || process.env.WORKERS_CI);
}

function formatCommissionList(types: string[]): string {
  return types
    .map((type) =>
      BODY_DTD_OPTIONS.has(type)
        ? `${type} (DTD required after slot approval)`
        : type
    )
    .join(", ");
}

function buildEmailContent(payload: ContactPayload, isWaitlist: boolean) {
  const commissionSummary = formatCommissionList(payload.commissionTypes);
  const statusLabel = isWaitlist ? "WAITLIST" : "OPEN";
  const langLabel = payload.lang === "vi" ? "VI" : "EN";
  const subject = isWaitlist
    ? `[FluffNii Waitlist / Future Quote] ${payload.name} — ${payload.species}`
    : `[FluffNii Quote] ${payload.name} — ${payload.species}`;

  const heading = isWaitlist
    ? "FLUFFNII STUDIO — WAITLIST / FUTURE QUOTE INQUIRY"
    : "FLUFFNII STUDIO — NEW QUOTE INQUIRY";

  const text = [
    heading,
    "----------------------------------------",
    `Status: ${statusLabel}`,
    `Language: ${langLabel}`,
    `Name / handle: ${payload.name}`,
    `Character species: ${payload.species}`,
    `Email: ${payload.email}`,
    `Phone number: ${payload.phone || "—"}`,
    `Social / DM: ${payload.facebook || "—"}`,
    `Ref sheet link: ${payload.refLink || "—"}`,
    `Commission type: ${commissionSummary}`,
    "",
    "Project notes:",
    payload.message,
  ].join("\n");

  const rows: [string, string][] = [
    ["Status", statusLabel],
    ["Language", langLabel],
    ["Name or handle", payload.name],
    ["Character species", payload.species],
    ["Email", payload.email],
    ["Phone number", payload.phone || "—"],
    ["Social / DM", payload.facebook || "—"],
    ["Ref sheet link", payload.refLink || "—"],
    ["Commission type", commissionSummary],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #d0dfee;color:#536175;font-size:13px;width:170px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #d0dfee;color:#111622;font-size:15px;font-weight:500;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const badgeTitle = isWaitlist
    ? "FluffNii Studio · Waitlist / Future Quote"
    : "FluffNii Studio · New Quote Request";

  const html = `
    <div style="background:#f5f8fc;padding:24px;font-family:system-ui,-apple-system,sans-serif;color:#111622;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d0dfee;border-radius:16px;overflow:hidden;">
        <div style="background:#111622;color:#f5f8fc;padding:20px 24px;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#fff0a6;">${escapeHtml(badgeTitle)}</div>
          <h2 style="margin:6px 0 0;font-size:20px;font-weight:600;">${escapeHtml(payload.name)} — ${escapeHtml(payload.species)}</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${htmlRows}
        </table>
        <div style="padding:18px 24px;background:#edf3fa;">
          <div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#536175;margin-bottom:8px;">Project notes</div>
          <div style="white-space:pre-wrap;font-size:15px;line-height:1.55;color:#111622;">${escapeHtml(payload.message)}</div>
        </div>
      </div>
    </div>
  `;

  return { subject, text, html };
}

async function sendViaResend({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
    signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend HTTP ${res.status}: ${body}`);
  }
}

async function sendViaSmtp({
  host,
  port,
  user,
  pass,
  to,
  replyName,
  replyEmail,
  subject,
  text,
  html,
}: {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
  replyName: string;
  replyEmail: string;
  subject: string;
  text: string;
  html: string;
}) {
  const { default: nodemailer } = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"FluffNii Studio Contact" <${user}>`,
    to,
    replyTo: replyName ? `"${replyName}" <${replyEmail}>` : replyEmail,
    subject,
    text,
    html,
  });
}

export async function POST(request: Request) {
  const headerLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(headerLength) && headerLength > MAX_BODY_BYTES) {
    return errorResponse("PAYLOAD_TOO_LARGE", 413);
  }

  let rawText: string;
  try {
    rawText = await request.text();
  } catch {
    return errorResponse("INVALID_JSON", 400);
  }

  if (new TextEncoder().encode(rawText).length > MAX_BODY_BYTES) {
    return errorResponse("PAYLOAD_TOO_LARGE", 413);
  }

  let rawBody: unknown;
  try {
    rawBody = JSON.parse(rawText);
  } catch {
    return errorResponse("INVALID_JSON", 400);
  }

  if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
    return errorResponse("INVALID_JSON", 400);
  }

  const record = rawBody as Record<string, unknown>;

  if (cleanSingleLine(record.website, 200)) {
    return NextResponse.json({ ok: true, isWaitlist: false });
  }

  if (typeof record.startedAt === "number" && Number.isFinite(record.startedAt)) {
    const elapsed = Date.now() - record.startedAt;
    if (elapsed >= 0 && elapsed < MIN_FORM_ELAPSED_MS) {
      return errorResponse("TOO_FAST", 400);
    }
  }

  const name = cleanSingleLine(record.name, 120);
  const species = cleanSingleLine(record.species, 120);
  const email = cleanSingleLine(record.email, 200);
  const phone = cleanSingleLine(record.phone, 60);
  const facebook = cleanSingleLine(record.facebook, 300);
  const refLink = cleanSingleLine(record.refLink, 500);
  const message = cleanMultiLine(record.message, 4000);
  const lang: ContactLang = record.lang === "vi" ? "vi" : "en";

  const commissionTypes = Array.isArray(record.commissionTypes)
    ? Array.from(
        new Set(
          record.commissionTypes
            .map((item) => cleanSingleLine(item, 80))
            .filter(Boolean)
        )
      ).slice(0, 20)
    : [];

  if (!name || !species || !email || !message) {
    return errorResponse("MISSING_FIELDS", 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    return errorResponse("INVALID_EMAIL", 400);
  }

  if (commissionTypes.length === 0) {
    return errorResponse("MISSING_TYPES", 400);
  }

  const payload: ContactPayload = {
    name,
    species,
    email,
    phone,
    facebook,
    refLink,
    commissionTypes,
    message,
    lang,
  };

  const studioEmail =
    process.env.STUDIO_TO_EMAIL?.trim() || DEFAULT_STUDIO_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const hasResend = Boolean(resendApiKey && !resendApiKey.startsWith("re_your_"));

  const smtpHost = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const parsedPort = Number(process.env.SMTP_PORT || 465);
  const smtpPort = Number.isFinite(parsedPort) ? parsedPort : 465;
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();
  const hasSmtp = Boolean(smtpUser && smtpPass && !smtpPass.startsWith("your_"));

  if (!hasResend) {
    if (isCloudflareWorkersRuntime()) {
      console.error(
        "[api/contact] SMTP unsupported on Cloudflare Workers; configure RESEND_API_KEY."
      );
      return errorResponse("SERVICE_UNAVAILABLE", 503);
    }

    if (!hasSmtp) {
      console.error(
        "[api/contact] Missing email provider credentials (RESEND_API_KEY or SMTP_USER/SMTP_PASS)."
      );
      return errorResponse("SERVICE_UNAVAILABLE", 503);
    }
  }

  const { open } = getCommissionStatus();
  const isWaitlist = !open;
  const { subject, text, html } = buildEmailContent(payload, isWaitlist);
  const replyName = payload.name.replace(/["<>\\\r\n]/g, "");

  try {
    if (hasResend && resendApiKey) {
      await sendViaResend({
        apiKey: resendApiKey,
        from: process.env.RESEND_FROM?.trim() || DEFAULT_RESEND_FROM,
        to: studioEmail,
        replyTo: payload.email,
        subject,
        text,
        html,
      });
    } else if (smtpUser && smtpPass) {
      await sendViaSmtp({
        host: smtpHost,
        port: smtpPort,
        user: smtpUser,
        pass: smtpPass,
        to: studioEmail,
        replyName,
        replyEmail: payload.email,
        subject,
        text,
        html,
      });
    }

    return NextResponse.json({ ok: true, isWaitlist });
  } catch (err) {
    console.error("[api/contact] Failed to send email:", err);
    return errorResponse("SEND_FAILED", 500);
  }
}
