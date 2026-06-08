import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  return NextResponse.json({
    ok: true,
    message: "Inquiry endpoint placeholder. MVP communication is handled through WhatsApp.",
    received: payload,
  });
}
