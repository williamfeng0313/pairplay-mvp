import type { NextRequest, NextResponse } from "next/server";

const ROOM_SESSION_PREFIX = "twolumi_room_";
const ROOM_SESSION_MAX_AGE_SECONDS = 60 * 60 * 2;

export function normalizeRoomCode(value: unknown) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
}

export function getRoomSessionCookieName(code: string) {
  return `${ROOM_SESSION_PREFIX}${normalizeRoomCode(code)}`;
}

export function getRoomTokenFromRequest(
  request: NextRequest,
  code: string
) {
  const normalizedCode = normalizeRoomCode(code);

  if (normalizedCode.length !== 6) {
    return "";
  }

  return (
    request.cookies.get(
      getRoomSessionCookieName(normalizedCode)
    )?.value || ""
  );
}

export function setRoomSessionCookie(
  response: NextResponse,
  code: string,
  token: string,
  expiresAt?: string | null
) {
  const normalizedCode = normalizeRoomCode(code);

  response.cookies.set({
    name: getRoomSessionCookieName(normalizedCode),
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(expiresAt
      ? { expires: new Date(expiresAt) }
      : { maxAge: ROOM_SESSION_MAX_AGE_SECONDS }),
  });
}
