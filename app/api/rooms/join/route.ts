import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  randomUUID,
} from "crypto";

import {
  supabaseRest,
} from "@/lib/supabaseAdmin";

import {
  normalizeRoomCode,
  setRoomSessionCookie,
} from "@/lib/roomSession";

import {
  consumeRateLimit,
} from "@/lib/rateLimit";

export const dynamic =
  "force-dynamic";

/* =========================================================
   Rate Limit
========================================================= */

const JOIN_ROOM_LIMIT = 10;
const JOIN_ROOM_WINDOW_SECONDS = 60;

/* =========================================================
   Join Room
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {

    /* =====================================================
       Rate Limit

       Maximum:
       10 join attempts / 60 seconds / IP
    ===================================================== */

    const rateLimit =
      await consumeRateLimit(
        request,
        "room_join",
        JOIN_ROOM_LIMIT,
        JOIN_ROOM_WINDOW_SECONDS
      );

    if (
      !rateLimit.allowed
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Too many join attempts. Please wait a minute and try again.",
        },
        {
          status: 429,

          headers: {
            "Retry-After":
              String(
                rateLimit.retryAfter ||
                  60
              ),

            "Cache-Control":
              "no-store",

            "X-RateLimit-Limit":
              String(
                JOIN_ROOM_LIMIT
              ),

            "X-RateLimit-Remaining":
              "0",
          },
        }
      );
    }

    /* =====================================================
       Read Room Code
    ===================================================== */

    const body =
      await request
        .json()
        .catch(
          () => ({})
        );

    const code =
      normalizeRoomCode(
        body.code
      );

    if (
      code.length !== 6
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Enter the 6-character room code.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       Find Room
    ===================================================== */

    const lookup =
      await supabaseRest(
        `rooms?code=eq.${encodeURIComponent(
          code
        )}&select=id,code,status,expires_at,guest_token`
      );

    const rows =
      await lookup.json();

    const room =
      Array.isArray(rows)
        ? rows[0]
        : null;

    /* =====================================================
       Not Found
    ===================================================== */

    if (!room) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Room not found. Check the code and try again.",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       Expired
    ===================================================== */

    if (
      new Date(
        room.expires_at
      ).getTime() <=
      Date.now()
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "This room has expired. Ask your partner to create a new one.",
        },
        {
          status: 410,
        }
      );
    }

    /* =====================================================
       Already Full
    ===================================================== */

    if (
      room.status ===
        "ready" ||
      room.guest_token
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "This room already has two players.",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       Guest Token
    ===================================================== */

    const guestToken =
      randomUUID();

    /* =====================================================
       Join Atomically

       status=waiting prevents two guests from winning
       the same room at the same time.
    ===================================================== */

    const update =
      await supabaseRest(
        `rooms?id=eq.${encodeURIComponent(
          room.id
        )}&status=eq.waiting`,
        {
          method:
            "PATCH",

          headers: {
            Prefer:
              "return=representation",
          },

          body:
            JSON.stringify({
              guest_token:
                guestToken,

              status:
                "ready",

              updated_at:
                new Date()
                  .toISOString(),
            }),
        }
      );

    const updatedRows =
      await update.json();

    const updated =
      Array.isArray(
        updatedRows
      )
        ? updatedRows[0]
        : null;

    if (!updated) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Someone else joined this room first.",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       Success
    ===================================================== */

    const result =
      NextResponse.json({
        ok: true,

        code,

        status:
          "ready",

        role:
          "guest",
      });

    /* =====================================================
       Secure HttpOnly Cookie
    ===================================================== */

    setRoomSessionCookie(
      result,
      code,
      guestToken,
      room.expires_at
    );

    result.headers.set(
      "Cache-Control",
      "no-store"
    );

    result.headers.set(
      "X-RateLimit-Limit",
      String(
        JOIN_ROOM_LIMIT
      )
    );

    result.headers.set(
      "X-RateLimit-Remaining",
      String(
        Math.max(
          0,
          JOIN_ROOM_LIMIT -
            rateLimit.count
        )
      )
    );

    return result;

  } catch (error) {

    console.error(
      "join room error",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Could not join the room right now.",
      },
      {
        status: 500,
      }
    );
  }
}