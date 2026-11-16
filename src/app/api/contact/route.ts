import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_STUDIO_EMAIL = "FluffNii.furries@gmail.com";
const DEFAULT_RESEND_FROM = "FluffNii Studio <onboarding@resend.dev>";
const BODY_DTD_OPTIONS = new Set(["Only body", "Half-body", "Fullsuit"]);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  species: string;
  email: string;
  phone: string;
  facebook: string;
  commissionTypes: string[];
  message: string;
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

function parsePayload(raw: unknown): ContactPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;

  const name = cleanSingleLine(record.name, 120);
  const species = cleanSingleLine(record.species, 120);
  const email = cleanSingleLine(record.email, 200);
  const phone = cleanSingleLine(record.phone, 60);
  const facebook = cleanSingleLine(record.facebook, 300);
  const message = cleanMultiLine(record.message, 4000);

  const commissionTypes = Array.isArray(record.commissionTypes)
    ? record.commissionTypes
        .map((item) => cleanSingleLine(item, 80))
        .filter(Boolean)
        .slice(0, 20)
    : [];

  if (!name || !species || !email || !message) return null;
  if (!EMAIL_REGEX.test(email)) return null;

  return { name, species, email, phone, facebook, commissionTypes, message };
}

function formatCommissionList(types: string[]): string {
  if (types.length === 0) return "Chưa chọn";
  return types
    .map((type) =>
      BODY_DTD_OPTIONS.has(type) ? `${type} (Yêu cầu có Duct Tape Dummy)` : type
    )
    .join(", ");
}

function buildEmailContent(payload: ContactPayload) {
  const commissionSummary = formatCommissionList(payload.commissionTypes);
  const subject = `[FluffNii Commission] ${payload.name} — ${payload.species}`;

  const text = [
    "YEU CAU COMMISSION MOI — FLUFFNII STUDIO",
    "----------------------------------------",
    `Name / handle: ${payload.name}`,
    `Character species: ${payload.species}`,
    `Email: ${payload.email}`,
    `Phone number: ${payload.phone || "Khong cung cap"}`,
    `Facebook: ${payload.facebook || "Khong cung cap"}`,
    `Commission type: ${commissionSummary}`,
    "",
    "Thong tin khac & ref link:",
    payload.message,
  ].join("\n");

  const rows: [string, string][] = [
    ["Name or handle", payload.name],
    ["Character species", payload.species],
    ["Email", payload.email],
    ["Phone number", payload.phone || "—"],
    ["Facebook", payload.facebook || "—"],
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

  const html = `
    <div style="background:#f5f8fc;padding:24px;font-family:system-ui,-apple-system,sans-serif;color:#111622;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d0dfee;border-radius:16px;overflow:hidden;">
        <div style="background:#111622;color:#f5f8fc;padding:20px 24px;">
          <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#fff0a6;">FluffNii Studio · New Commission Inquiry</div>
          <h2 style="margin:6px 0 0;font-size:20px;font-weight:600;">${escapeHtml(payload.name)} — ${escapeHtml(payload.species)}</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${htmlRows}
        </table>
        <div style="padding:18px 24px;background:#edf3fa;">
          <div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#536175;margin-bottom:8px;">Thông tin khác và ref link</div>
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
  // Dynamic import keeps local Node Gmail SMTP fallback out of Resend-only edge runs
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

/** Handles commission form submissions via Resend HTTP API (Cloudflare/prod) or Gmail SMTP (local). */
export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Dữ liệu gửi lên không hợp lệ." },
      { status: 400 }
    );
  }

  const payload = parsePayload(rawBody);
  if (!payload) {
    return NextResponse.json(
      {
        error:
          "Vui lòng điền đầy đủ Name/handle, Species, Email hợp lệ và Thông tin khác.",
      },
      { status: 400 }
    );
  }

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

  if (!hasResend && !hasSmtp) {
    console.error(
      "[api/contact] Missing email provider credentials (RESEND_API_KEY or SMTP_USER/SMTP_PASS)."
    );
    return NextResponse.json(
      {
        error:
          "Hệ thống gửi thư tạm thời chưa sẵn sàng. Bạn vui lòng liên hệ trực tiếp qua email FluffNii.furries@gmail.com hoặc Instagram @fluffnii.fur.",
      },
      { status: 503 }
    );
  }

  const { subject, text, html } = buildEmailContent(payload);
  const replyName = payload.name.replace(/["<>\\]/g, "");

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Failed to send email:", err);
    return NextResponse.json(
      {
        error:
          "Chưa thể gửi yêu cầu lúc này. Bạn vui lòng thử lại sau ít phút hoặc gửi trực tiếp tới FluffNii.furries@gmail.com.",
      },
      { status: 500 }
    );
  }
}
