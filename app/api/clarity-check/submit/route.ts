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
  resolveRoomGameSlug,
  getRoomGameRoundLimit,
} from "@/lib/roomGame";

export const dynamic =
  "force-dynamic";


type ClarityScore =
  | 1
  | 2
  | 3
  | 4;


type ClarityBucket =
  | "less_clear"
  | "same"
  | "little_clearer"
  | "much_clearer";


const BUCKET_BY_SCORE:
  Record<
    ClarityScore,
    ClarityBucket
  > = {
    1: "less_clear",
    2: "same",
    3: "little_clearer",
    4: "much_clearer",
  };


type RequestBody = {
  code?: unknown;
  score?: unknown;
};


export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (
        await request
          .json()
          .catch(
            () => ({})
          )
      ) as RequestBody;


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
            "Invalid clarity score.",
        },
        {
          status: 400,
        }
      );
    }


    const score =
      scoreNumber as
        ClarityScore;


    const bucket =
      BUCKET_BY_SCORE[
        score
      ];


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


    if (
      room.status !==
      "ready"
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "This check-in has not started.",
        },
        {
          status: 409,
        }
      );
    }


    const gameSlug =
      resolveRoomGameSlug(
        room.game_slug
      );


    if (
      gameSlug !==
      "relationship-check-in"
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "This clarity check is only available after a Relationship Check-In.",
        },
        {
          status: 409,
        }
      );
    }


    const roundLimit =
      getRoomGameRoundLimit(
        gameSlug
      );


    const currentQuestion =
      Number(
        room.current_question ??
          0
      );


    if (
      currentQuestion <
      roundLimit
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Complete the Relationship Check-In before submitting this clarity check.",
        },
        {
          status: 409,
        }
      );
    }


    const now =
      new Date()
        .toISOString();


    await supabaseRest(
      [
        "relationship_clarity_checks",
        "?on_conflict=",
        "room_ref,game_slug,player_role,form_version",
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
              "relationship-check-in",

            player_role:
              role,

            clarity_score:
              score,

            clarity_bucket:
              bucket,

            form_version:
              "v1",

            updated_at:
              now,
          }),
      }
    );


    return NextResponse.json({
      ok: true,

      score,

      bucket,
    });

  } catch (
    error
  ) {
    console.error(
      "[Clarity Check API]",
      error
    );


    return NextResponse.json(
      {
        ok: false,

        error:
          "Could not save your clarity check. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
