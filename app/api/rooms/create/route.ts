import { NextResponse } from "next/server";
import { randomBytes, randomUUID } from "crypto";
import { supabaseRest } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeCode(length = 6) {
  const bytes = randomBytes(length);
  return Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join("");
}

export async function POST() {
  try {
    // Opportunistic cleanup so the MVP does not accumulate expired rooms forever.
    const now = new Date().toISOString();
    await supabaseRest(`rooms?expires_at=lt.${encodeURIComponent(now)}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    }).catch(() => null);

    for (let attempt = 0; attempt < 6; attempt++) {
      const code = makeCode();
      const hostToken = randomUUID();

      const response = await supabaseRest("rooms", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          code,
          host_token: hostToken,
          status: "waiting",
          game_slug: "would-you-rather",
        }),
      });

      const rows = await response.json();

      if (Array.isArray(rows) && rows[0]) {
        return NextResponse.json({
          ok: true,
          code,
          token: hostToken,
          status: rows[0].status,
          expiresAt: rows[0].expires_at,
        });
      }
    }

    return NextResponse.json(
      { ok: false, error: "Could not create a unique room code." },
      { status: 503 }
    );
  } catch (error) {
    console.error("create room error", error);
    return NextResponse.json(
      { ok: false, error: "Room service is temporarily unavailable." },
      { status: 500 }
    );
  }
}
