import { NextRequest, NextResponse } from "next/server";
import { supabaseRest } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const code = (request.nextUrl.searchParams.get("code") || "").toUpperCase();
    const token = request.nextUrl.searchParams.get("token") || "";

    if (!code || !token) {
      return NextResponse.json(
        { ok: false, error: "Missing room credentials." },
        { status: 400 }
      );
    }

    const response = await supabaseRest(
      `rooms?code=eq.${encodeURIComponent(code)}&select=code,status,expires_at,host_token,guest_token,game_slug`
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
    if (token === room.host_token) role = "host";
    if (token === room.guest_token) role = "guest";

    if (!role) {
      return NextResponse.json(
        { ok: false, error: "Invalid room token." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      ok: true,
      code: room.code,
      status: room.status,
      role,
      gameSlug: room.game_slug,
      partnerConnected: room.status === "ready",
    });
  } catch (error) {
    console.error("room status error", error);
    return NextResponse.json(
      { ok: false, error: "Could not check room status." },
      { status: 500 }
    );
  }
}
