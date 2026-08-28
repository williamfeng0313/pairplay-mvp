import { NextRequest, NextResponse } from "next/server";
import { supabaseRest } from "@/lib/supabaseAdmin";
import {
  getRoomTokenFromRequest,
  normalizeRoomCode,
} from "@/lib/roomSession";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const code = normalizeRoomCode(
      request.nextUrl.searchParams.get("code")
    );

    const token = getRoomTokenFromRequest(request, code);

    if (code.length !== 6) {
      return NextResponse.json(
        { ok: false, error: "Invalid room code." },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        {
          ok: false,
          error: "Your room session is missing or has expired.",
        },
        { status: 401 }
      );
    }

    const response = await supabaseRest(
      `rooms?code=eq.${encodeURIComponent(
        code
      )}&select=code,status,expires_at,host_token,guest_token,game_slug`
    );

    const rows = await response.json();
    const room = Array.isArray(rows) ? rows[0] : null;

    if (!room) {
      return NextResponse.json(
        { ok: false, error: "Room not found." },
        { status: 404 }
      );
    }

    if (new Date(room.expires_at).getTime() <= Date.now()) {
      return NextResponse.json(
        { ok: false, error: "Room expired." },
        { status: 410 }
      );
    }

    let role: "host" | "guest" | null = null;

    if (token === room.host_token) {
      role = "host";
    }

    if (token === room.guest_token) {
      role = "guest";
    }

    if (!role) {
      return NextResponse.json(
        { ok: false, error: "Invalid room session." },
        { status: 403 }
      );
    }

    const result = NextResponse.json({
      ok: true,
      code: room.code,
      status: room.status,
      role,
      gameSlug: room.game_slug,
      partnerConnected: room.status === "ready",
    });

    result.headers.set("Cache-Control", "no-store");

    return result;
  } catch (error) {
    console.error("room status error", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Could not check room status.",
      },
      { status: 500 }
    );
  }
}
