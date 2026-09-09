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

function hasAnswer(
  value: unknown
) {
  return (
    typeof value ===
      "string" &&
    value.length > 0
  );
}

function safeMatchCount(
  value: unknown
) {
  const parsed =
    Number(value);

  return (
    Number.isInteger(
      parsed
    ) &&
    parsed >= 0
  )
    ? parsed
    : 0;
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
            "Invalid next-round request.",
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
        )}&select=id,status,game_slug,expires_at,host_token,current_question,host_answer,guest_answer,match_count`
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
      token !==
      room.host_token
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Only the room creator can start the next question.",
        },
        {
          status: 403,
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
      currentQuestion !==
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
            "This game has already finished.",
        },
        {
          status: 409,
        }
      );
    }

    if (
      !hasAnswer(
        room.host_answer
      ) ||
      !hasAnswer(
        room.guest_answer
      )
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Both players must answer first.",
        },
        {
          status: 409,
        }
      );
    }

    const nextQuestionIndex =
      Math.min(
        questionIndex + 1,
        roundLimit
      );

    const currentMatchCount =
      safeMatchCount(
        room.match_count
      );

    /*
     * Relationship Check-In never adds a match score.
     * Match Count belongs only to Same Answer.
     */
    const currentRoundMatched =
      gameSlug ===
        "same-answer" &&
      room.host_answer ===
        room.guest_answer;

    const nextMatchCount =
      currentMatchCount +
      (
        currentRoundMatched
          ? 1
          : 0
      );

    const updateBody:
      Record<
        string,
        unknown
      > = {
      current_question:
        nextQuestionIndex,

      host_answer:
        null,

      guest_answer:
        null,

      updated_at:
        new Date()
          .toISOString(),
    };

    if (
      gameSlug ===
      "same-answer"
    ) {
      updateBody.match_count =
        nextMatchCount;
    }

    /*
     * Only update while current_question is still
     * the round the Host is advancing from.
     */
    const update =
      await supabaseRest(
        `rooms?id=eq.${encodeURIComponent(
          room.id
        )}&current_question=eq.${questionIndex}`,
        {
          method:
            "PATCH",

          headers: {
            Prefer:
              "return=representation",
          },

          body:
            JSON.stringify(
              updateBody
            ),
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
            "This question has already moved on.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json({
      ok: true,

      gameSlug,

      completed:
        nextQuestionIndex >=
        roundLimit,

      questionIndex:
        nextQuestionIndex,

      matchCount:
        gameSlug ===
        "same-answer"
          ? nextMatchCount
          : undefined,
    });
  } catch (error) {
    console.error(
      "next room error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Could not start the next question.",
      },
      {
        status: 500,
      }
    );
  }
}
