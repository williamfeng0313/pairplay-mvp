import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseRest } from "@/lib/supabaseAdmin";
import {
  getRoomTokenFromRequest,
  normalizeRoomCode,
} from "@/lib/roomSession";

export const dynamic = "force-dynamic";

type RoomRow = {
  id: string;
  code: string;
  status: string;
  expires_at: string;
  host_token: string;
  guest_token: string | null;
};

function safeTokenEqual(left: string, right: string | null) {
  if (!left || !right) return false;

  const a = Buffer.from(left);
  const b = Buffer.from(right);

  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function makeRealtimeTopic(room: RoomRow) {
  const secret = process.env.CHAT_TOPIC_SECRET;

  if (!secret) {
    throw new Error("CHAT_TOPIC_SECRET is not configured.");
  }

  const digest = createHmac("sha256", secret)
    .update(`${room.id}:${room.code}:${room.expires_at}`)
    .digest("hex");

  return `twolumi-chat-${digest}`;
}

export async function GET(request: NextRequest) {
  try {
    const code = normalizeRoomCode(
      request.nextUrl.searchParams.get("code")
    );

    if (code.length !== 6) {
      return NextResponse.json(
        { ok: false, error: "Invalid room code." },
        {
          status: 400,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const roomToken = getRoomTokenFromRequest(request, code);

    if (!roomToken) {
      return NextResponse.json(
        { ok: false, error: "Room session not found." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const lookup = await supabaseRest(
      `rooms?code=eq.${encodeURIComponent(
        code
      )}&select=id,code,status,expires_at,host_token,guest_token&limit=1`
    );

    const rows = (await lookup.json()) as RoomRow[];
    const room = Array.isArray(rows) ? rows[0] : null;

    if (!room) {
      return NextResponse.json(
        { ok: false, error: "Room not found." },
        {
          status: 404,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    if (new Date(room.expires_at).getTime() <= Date.now()) {
      return NextResponse.json(
        { ok: false, error: "Room expired." },
        {
          status: 410,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    let role: "host" | "guest" | null = null;

    if (safeTokenEqual(roomToken, room.host_token)) {
      role = "host";
    } else if (safeTokenEqual(roomToken, room.guest_token)) {
      role = "guest";
    }

    if (!role) {
      return NextResponse.json(
        { ok: false, error: "Invalid room session." },
        {
          status: 403,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    if (!room.guest_token || room.status === "waiting") {
      return NextResponse.json(
        { ok: false, error: "Waiting for partner." },
        {
          status: 409,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const response = NextResponse.json({
      ok: true,
      topic: makeRealtimeTopic(room),
      role,
      expiresAt: room.expires_at,
    });

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("realtime session error", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Realtime chat is temporarily unavailable.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
