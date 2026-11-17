import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_OPEN_NOTE =
  "Taking custom head and mini partial builds. Reply within 24h.";
const DEFAULT_CLOSED_NOTE =
  "Currently paused on new builds. Feel free to send your ref sheet for a future quote.";

function cleanText(value: string | undefined, maxLen: number): string {
  if (!value) return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLen);
}

function parseOpenFlag(raw: string | undefined): boolean {
  const normalized = cleanText(raw, 20).toLowerCase();
  if (!normalized) return true;
  if (
    normalized === "false" ||
    normalized === "0" ||
    normalized === "closed" ||
    normalized === "no"
  ) {
    return false;
  }
  return true;
}

export async function GET() {
  const open = parseOpenFlag(process.env.COMMISSION_OPEN);
  const rawNote = cleanText(process.env.COMMISSION_NOTE, 180);
  const note = rawNote || (open ? DEFAULT_OPEN_NOTE : DEFAULT_CLOSED_NOTE);

  return NextResponse.json(
    { open, note },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
