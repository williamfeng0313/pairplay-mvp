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
  type RoomGameSlug,
} from "@/lib/roomGame";

export const dynamic =
  "force-dynamic";

function normalizeAnswer(
  gameSlug:
    RoomGameSlug,
  value: unknown
): string | null {
  if (
    gameSlug ===
    "would-you-rather"
  ) {
    return (
      value === "a" ||
      value === "b"
    )
      ? value
      : null;
  }

  /*
   * Same Answer + Relationship Check-In
   * both use four structured options.
   */
  const stringValue =
    String(
      value ?? ""
    );

  return (
    stringValue === "0" ||
    stringValue === "1" ||
    stringValue === "2" ||
    stringValue === "3"
  )
    ? stringValue
    : null;
}

export async function POST(
  request: NextRequest
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

    const token =
      getRoomTokenFromRequest(
        request,
        code
      );

    const questionIndex =
      Number(
        body.questionIndex
      );

    if (
      code.length !==
        6 ||
      !Number.isInteger(
        questionIndex
      )
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid answer request.",
        },
        {
          status: 400,
        }
      );
    }

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

    const response =
      await supabaseRest(
        `rooms?code=eq.${encodeURIComponent(
          code
        )}&select=id,status,game_slug,expires_at,host_token,guest_token,current_question,host_answer,guest_answer`
      );

    const rows =
      await response
        .json();

    const room =
      Array.isArray(rows) &&
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

    if (
      room.status !==
      "ready"
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Your partner has not joined yet.",
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

    if (!gameSlug) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Unsupported game.",
        },
        {
          status: 409,
        }
      );
    }

    const answer =
      normalizeAnswer(
        gameSlug,
        body.answer
      );

    if (!answer) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid answer.",
        },
        {
          status: 400,
        }
      );
    }

    const roundLimit =
      getRoomGameRoundLimit(
        gameSlug
      );

    if (
      questionIndex <
        0 ||
      questionIndex >=
        roundLimit
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid question.",
        },
        {
          status: 400,
        }
      );
    }

    let role:
      | "host"
      | "guest"
      | null = null;

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
            "Invalid room token.",
        },
        {
          status: 403,
        }
      );
    }

    if (
      Number(
        room.current_question ??
          0
      ) !==
      questionIndex
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "This question has already moved on.",
        },
        {
          status: 409,
        }
      );
    }

    const answerColumn =
      role ===
      "host"
        ? "host_answer"
        : "guest_answer";

    const existingAnswer =
      role ===
      "host"
        ? room.host_answer
        : room.guest_answer;

    if (
      existingAnswer !==
        null &&
      existingAnswer !==
        undefined &&
      existingAnswer !==
        ""
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "You already answered this round.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * current_question + answer-is-null guard
     * protects against stale/double submissions.
     */
    const update =
      await supabaseRest(
        `rooms?id=eq.${encodeURIComponent(
          room.id
        )}&current_question=eq.${questionIndex}&${answerColumn}=is.null`,
        {
          method:
            "PATCH",

          headers: {
            Prefer:
              "return=representation",
          },

          body:
            JSON.stringify({
              [answerColumn]:
                answer,

              updated_at:
                new Date()
                  .toISOString(),
            }),
        }
      );

    const updatedRows =
      await update
        .json();

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
            "This answer was already submitted or the game moved on.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json({
      ok: true,

      gameSlug,

      role,

      questionIndex,
    });
  } catch (error) {
    console.error(
      "answer room error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Could not save your answer.",
      },
      {
        status: 500,
      }
    );
  }
}
