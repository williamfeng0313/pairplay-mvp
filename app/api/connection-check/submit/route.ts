import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  supabaseRest,
} from "@/lib/supabaseAdmin";

import {
  getRoomTokenFromRequest,
  normalizeRoomCode,
} from "@/lib/roomSession";

import {
  getRoomGameRoundLimit,
  resolveRoomGameSlug,
} from "@/lib/roomGame";


export const dynamic =
  "force-dynamic";


type AllowedGameSlug =
  | "would-you-rather"
  | "same-answer"
  | "couple-puzzle";


type ConnectionScore =
  | 1
  | 2
  | 3
  | 4;


const ALLOWED_GAMES =
  new Set<
    AllowedGameSlug
  >([
    "would-you-rather",
    "same-answer",
    "couple-puzzle",
  ]);


const BUCKET_BY_SCORE:
  Record<
    ConnectionScore,
    string
  > = {
    1:
      "less_connected",

    2:
      "same",

    3:
      "little_closer",

    4:
      "much_closer",
  };


export async function POST(
  request:
    NextRequest
) {
  try {
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
      code.length !==
      6
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid room.",
        },
        {
          status: 400,
        }
      );
    }


    const requestedGameSlug =
      String(
        body.gameSlug ??
          ""
      ) as
        AllowedGameSlug;


    if (
      !ALLOWED_GAMES.has(
        requestedGameSlug
      )
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Unsupported connection check game.",
        },
        {
          status: 400,
        }
      );
    }


    const scoreNumber =
      Number(
        body.score
      );


    if (
      !Number.isInteger(
        scoreNumber
      ) ||
      scoreNumber < 1 ||
      scoreNumber > 4
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid connection score.",
        },
        {
          status: 400,
        }
      );
    }


    const score =
      scoreNumber as
        ConnectionScore;


    const token =
      getRoomTokenFromRequest(
        request,
        code
      );


    if (!token) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Your room session is missing or has expired.",
        },
        {
          status: 401,
        }
      );
    }


    const roomResponse =
      await supabaseRest(
        `rooms?code=eq.${encodeURIComponent(
          code
        )}&select=id,status,game_slug,expires_at,host_token,guest_token,current_question`
      );


    const rows =
      await roomResponse
        .json();


    const room =
      Array.isArray(
        rows
      ) &&
      rows.length > 0
        ? rows[0]
        : null;


    if (!room) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Room not found.",
        },
        {
          status: 404,
        }
      );
    }


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
            "Room expired.",
        },
        {
          status: 410,
        }
      );
    }


    let role:
      | "host"
      | "guest"
      | null =
        null;


    if (
      token ===
      room.host_token
    ) {
      role =
        "host";
    }


    if (
      token ===
      room.guest_token
    ) {
      role =
        "guest";
    }


    if (!role) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid room session.",
        },
        {
          status: 403,
        }
      );
    }


    const actualGameSlug =
      resolveRoomGameSlug(
        room.game_slug
      );


    if (
      actualGameSlug !==
      requestedGameSlug
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Game does not match this room.",
        },
        {
          status: 409,
        }
      );
    }


    if (
      room.status !==
      "ready"
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "This game has not started.",
        },
        {
          status: 409,
        }
      );
    }


    const roundLimit =
      getRoomGameRoundLimit(
        actualGameSlug
      );


    if (
      Number(
        room.current_question ??
          0
      ) <
      roundLimit
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Complete the game before submitting this connection check.",
        },
        {
          status: 409,
        }
      );
    }


    await supabaseRest(
      [
        "connection_checks",
        "?on_conflict=",
        "room_ref,game_slug,player_role,outcome_key,form_version",
      ].join(
        ""
      ),
      {
        method:
          "POST",

        headers: {
          Prefer:
            "resolution=merge-duplicates,return=minimal",
        },

        body:
          JSON.stringify({
            room_ref:
              String(
                room.id
              ),

            game_slug:
              actualGameSlug,

            player_role:
              role,

            outcome_key:
              "feel_closer",

            connection_score:
              score,

            connection_bucket:
              BUCKET_BY_SCORE[
                score
              ],

            form_version:
              "v1",

            updated_at:
              new Date()
                .toISOString(),
          }),
      }
    );


    return NextResponse.json({
      ok: true,

      score,

      bucket:
        BUCKET_BY_SCORE[
          score
        ],
    });

  } catch (
    error
  ) {
    console.error(
      "[Connection Check API]",
      error
    );


    return NextResponse.json(
      {
        ok: false,

        error:
          "Could not save your connection check.",
      },
      {
        status: 500,
      }
    );
  }
}
