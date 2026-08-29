import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  randomBytes,
  randomUUID,
} from "crypto";

import {
  supabaseRest,
} from "@/lib/supabaseAdmin";

import {
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

const CREATE_ROOM_LIMIT = 5;
const CREATE_ROOM_WINDOW_SECONDS = 60;

/* =========================================================
   Room Code
========================================================= */

const ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeCode(
  length = 6
) {
  const bytes =
    randomBytes(length);

  return Array.from(
    bytes,
    (byte) =>
      ALPHABET[
        byte %
          ALPHABET.length
      ]
  ).join("");
}

/* =========================================================
   Create Room
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {

    /* =====================================================
       Rate Limit

       Maximum:
       5 room creates / 60 seconds / IP
    ===================================================== */

    const rateLimit =
      await consumeRateLimit(
        request,
        "room_create",
        CREATE_ROOM_LIMIT,
        CREATE_ROOM_WINDOW_SECONDS
      );

    if (
      !rateLimit.allowed
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Too many rooms created. Please wait a minute and try again.",
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
                CREATE_ROOM_LIMIT
              ),

            "X-RateLimit-Remaining":
              "0",
          },
        }
      );
    }

    /* =====================================================
       Temporary Room Cleanup

       Keep this until your separate Supabase cleanup job
       is confirmed working.
    ===================================================== */

    const now =
      new Date().toISOString();

    await supabaseRest(
      `rooms?expires_at=lt.${encodeURIComponent(
        now
      )}`,
      {
        method:
          "DELETE",

        headers: {
          Prefer:
            "return=minimal",
        },
      }
    ).catch(
      () => null
    );

    /* =====================================================
       Create unique room
    ===================================================== */

    for (
      let attempt = 0;
      attempt < 6;
      attempt++
    ) {
      const code =
        makeCode();

      const hostToken =
        randomUUID();

      const response =
        await supabaseRest(
          "rooms",
          {
            method:
              "POST",

            headers: {
              Prefer:
                "return=representation",
            },

            body:
              JSON.stringify({
                code,

                host_token:
                  hostToken,

                status:
                  "waiting",

                game_slug:
                  "would-you-rather",
              }),
          }
        );

      const rows =
        await response.json();

      if (
        Array.isArray(rows) &&
        rows[0]
      ) {
        const result =
          NextResponse.json({
            ok: true,

            code,

            status:
              rows[0].status,

            expiresAt:
              rows[0]
                .expires_at,
          });

        /* ===============================================
           Secure room session

           Token stays in HttpOnly Cookie.
        =============================================== */

        setRoomSessionCookie(
          result,
          code,
          hostToken,
          rows[0].expires_at
        );

        result.headers.set(
          "Cache-Control",
          "no-store"
        );

        result.headers.set(
          "X-RateLimit-Limit",
          String(
            CREATE_ROOM_LIMIT
          )
        );

        result.headers.set(
          "X-RateLimit-Remaining",
          String(
            Math.max(
              0,
              CREATE_ROOM_LIMIT -
                rateLimit.count
            )
          )
        );

        return result;
      }
    }

    return NextResponse.json(
      {
        ok: false,

        error:
          "Could not create a unique room code.",
      },
      {
        status: 503,
      }
    );

  } catch (error) {

    console.error(
      "create room error",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Room service is temporarily unavailable.",
      },
      {
        status: 500,
      }
    );
  }
}