import { NextResponse } from "next/server";
import { getCommissionStatus } from "@/lib/commissionStatus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { open, note, noteVi } = getCommissionStatus();

  return NextResponse.json(
    { open, note, noteVi },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
