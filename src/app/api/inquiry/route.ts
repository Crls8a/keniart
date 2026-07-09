import { NextResponse } from "next/server";
import { artworks } from "@/data/artworks";

const MAX_BODY_BYTES = 16 * 1024;
const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2_000;
const allowedKeys = new Set(["name", "artwork", "message"]);
const artworkSlugs = new Set(artworks.map((artwork) => artwork.slug));

function errorResponse(status: 400 | 413) {
  return NextResponse.json({ ok: false }, { status });
}

async function readBodyWithinLimit(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let body = "";
  let bytesRead = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return body + decoder.decode();

      bytesRead += value.byteLength;
      if (bytesRead > MAX_BODY_BYTES) {
        await reader.cancel("Request body exceeds the allowed size.").catch(() => undefined);
        return null;
      }

      body += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

function isRequiredString(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function isValidInquiry(payload: Record<string, unknown>) {
  if (Object.keys(payload).some((key) => !allowedKeys.has(key))) return false;
  if (!isRequiredString(payload.name, MAX_NAME_LENGTH)) return false;
  if (!isRequiredString(payload.message, MAX_MESSAGE_LENGTH)) return false;

  const artwork = payload.artwork;
  return artwork === undefined || (typeof artwork === "string" && (artwork === "" || artworkSlugs.has(artwork)));
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    await request.body?.cancel().catch(() => undefined);
    return errorResponse(413);
  }

  const body = await readBodyWithinLimit(request).catch(() => undefined);
  if (body === null) return errorResponse(413);
  if (body === undefined) return errorResponse(400);

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return errorResponse(400);
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return errorResponse(400);
  }
  if (!isValidInquiry(payload as Record<string, unknown>)) return errorResponse(400);

  return NextResponse.json({ ok: true });
}
