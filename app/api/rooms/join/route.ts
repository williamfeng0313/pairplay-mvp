import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseRest } from "@/lib/supabaseAdmin";
import {
  normalizeRoomCode,
  setRoomSessionCookie,
} from "@/lib/roomSession";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = normalizeRoomCode(body.code);

    if (code.length !== 6) {
      return NextResponse.json(
        {
          ok: false,
          error: "Enter the 6-character room code.",
        },
        { status: 400 }
      );
    }

    const lookup = await supabaseRest(
      `rooms?code=eq.${encodeURIComponent(
        code
      )}&select=id,code,status,expires_at,guest_token`
    );

    const rows = await lookup.json();
    const room = Array.isArray(rows) ? rows[0] : null;

    if (!room) {
      return NextResponse.json(
        {
          ok: false,
          error: "Room not found. Check the code and try again.",
        },
        { status: 404 }
      );
    }

    if (new Date(room.expires_at).getTime() <= Date.now()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "This room has expired. Ask your partner to create a new one.",
        },
        { status: 410 }
      );
    }

    if (room.status === "ready" || room.guest_token) {
      return NextResponse.json(
        {
          ok: false,
          error: "This room already has two players.",
        },
        { status: 409 }
      );
    }

    const guestToken = randomUUID();

    const update = await supabaseRest(
      `rooms?id=eq.${encodeURIComponent(room.id)}&status=eq.waiting`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          guest_token: guestToken,
          status: "ready",
          updated_at: new Date().toISOString(),
        }),
      }
    );

    const updatedRows = await update.json();
    const updated = Array.isArray(updatedRows)
      ? updatedRows[0]
      : null;

    if (!updated) {
      return NextResponse.json(
        {
          ok: false,
          error: "Someone else joined this room first.",
        },
        { status: 409 }
      );
    }

    const result = NextResponse.json({
      ok: true,
      code,
      status: "ready",
      role: "guest",
    });

    setRoomSessionCookie(
      result,
      code,
      guestToken,
      room.expires_at
    );

    result.headers.set("Cache-Control", "no-store");

    return result;
  } catch (error) {
    console.error("join room error", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Could not join the room right now.",
      },
      { status: 500 }
    );
  }
}
