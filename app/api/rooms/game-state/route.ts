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

import {
  getWouldYouRatherQuestionsForRoom,
} from "@/lib/wouldYouRatherGame";

import {
  getSameAnswerQuestionsForRoom,
} from "@/lib/sameAnswerGame";

import {
  relationshipCheckInQuestions,
} from "@/data/relationshipCheckInQuestions";

export const dynamic =
  "force-dynamic";

type WyrChoice =
  | "a"
  | "b";

type FourChoice =
  | "0"
  | "1"
  | "2"
  | "3";

function parseWyrChoice(
  value: unknown
): WyrChoice | null {
  return (
    value === "a" ||
    value === "b"
  )
    ? value
    : null;
}

function parseFourChoice(
  value: unknown
):
  | FourChoice
  | null {
  return (
    value === "0" ||
    value === "1" ||
    value === "2" ||
    value === "3"
  )
    ? value
    : null;
}

function safeMatchCount(
  value: unknown
) {
  const parsed =
    Number(value);

  return (
    Number.isInteger(parsed) &&
    parsed >= 0
  )
    ? parsed
    : 0;
}

export async function GET(
  request: NextRequest
) {
  try {
    const code =
      normalizeRoomCode(
        request.nextUrl.searchParams.get(
          "code"
        )
      );

    const token =
      getRoomTokenFromRequest(
        request,
        code
      );

    if (
      code.length !==
      6
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid room code.",
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
        )}&select=id,code,status,game_slug,expires_at,host_token,guest_token,current_question,host_answer,guest_answer,match_count`
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

    const gameSlug =
      resolveRoomGameSlug(
        room.game_slug
      );

    if (!gameSlug) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "This room uses an unsupported game.",
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
      return NextResponse.json({
        ok: true,

        gameSlug,

        status:
          room.status,

        role,

        partnerConnected:
          false,

        completed:
          false,
      });
    }

    const questionIndex =
      Number(
        room.current_question ??
          0
      );

    const roundLimit =
      getRoomGameRoundLimit(
        gameSlug
      );

    const persistedMatchCount =
      safeMatchCount(
        room.match_count
      );

    if (
      questionIndex >=
      roundLimit
    ) {
      return NextResponse.json({
        ok: true,

        gameSlug,

        status:
          "ready",

        role,

        partnerConnected:
          true,

        completed:
          true,

        roundLimit,

        matchCount:
          gameSlug ===
          "same-answer"
            ? persistedMatchCount
            : undefined,
      });
    }

    /*
     * ==========================================
     * WOULD YOU RATHER
     * ==========================================
     */

    if (
      gameSlug ===
      "would-you-rather"
    ) {
      const questions =
        getWouldYouRatherQuestionsForRoom(
          code
        );

      const question =
        questions[
          questionIndex
        ];

      if (!question) {
        return NextResponse.json(
          {
            ok: false,

            error:
              "Question not found.",
          },
          {
            status: 500,
          }
        );
      }

      const hostAnswer =
        parseWyrChoice(
          room.host_answer
        );

      const guestAnswer =
        parseWyrChoice(
          room.guest_answer
        );

      const bothAnswered =
        hostAnswer !==
          null &&
        guestAnswer !==
          null;

      const selfAnswer =
        role === "host"
          ? hostAnswer
          : guestAnswer;

      const partnerAnswer =
        role === "host"
          ? guestAnswer
          : hostAnswer;

      return NextResponse.json({
        ok: true,

        gameSlug,

        status:
          "ready",

        role,

        partnerConnected:
          true,

        completed:
          false,

        questionIndex,

        roundLimit,

        question: {
          id:
            question.id,

          a:
            question.a,

          b:
            question.b,
        },

        selfAnswered:
          selfAnswer !==
          null,

        partnerAnswered:
          partnerAnswer !==
          null,

        reveal:
          bothAnswered
            ? {
                you:
                  selfAnswer,

                partner:
                  partnerAnswer,

                sameChoice:
                  selfAnswer ===
                  partnerAnswer,
              }
            : null,
      });
    }

    /*
     * ==========================================
     * SAME ANSWER
     * ==========================================
     */

    if (
      gameSlug ===
      "same-answer"
    ) {
      const questions =
        getSameAnswerQuestionsForRoom(
          code
        );

      const question =
        questions[
          questionIndex
        ];

      if (!question) {
        return NextResponse.json(
          {
            ok: false,

            error:
              "Question not found.",
          },
          {
            status: 500,
          }
        );
      }

      const hostAnswer =
        parseFourChoice(
          room.host_answer
        );

      const guestAnswer =
        parseFourChoice(
          room.guest_answer
        );

      const bothAnswered =
        hostAnswer !==
          null &&
        guestAnswer !==
          null;

      const selfAnswer =
        role === "host"
          ? hostAnswer
          : guestAnswer;

      const partnerAnswer =
        role === "host"
          ? guestAnswer
          : hostAnswer;

      /*
       * 当前轮还没有在数据库持久化加分，
       * 但 Reveal 时需要让用户看到实时比分。
       */
      const currentRoundMatched =
        bothAnswered &&
        hostAnswer ===
          guestAnswer;

      const liveMatchCount =
        persistedMatchCount +
        (
          currentRoundMatched
            ? 1
            : 0
        );

      return NextResponse.json({
        ok: true,

        gameSlug,

        status:
          "ready",

        role,

        partnerConnected:
          true,

        completed:
          false,

        questionIndex,

        roundLimit,

        matchCount:
          liveMatchCount,

        question: {
          id:
            question.id,

          text:
            question.question,

          category:
            question.category,

          options:
            question.options,
        },

        selfAnswered:
          selfAnswer !==
          null,

        partnerAnswered:
          partnerAnswer !==
          null,

        reveal:
          bothAnswered
            ? {
                you:
                  selfAnswer,

                partner:
                  partnerAnswer,

                sameChoice:
                  selfAnswer ===
                  partnerAnswer,
              }
            : null,
      });
    }

    /*
     * ==========================================
     * RELATIONSHIP CHECK-IN
     * ==========================================
     *
     * Important:
     * - Fixed 12-question order.
     * - No Match Count.
     * - No "same/different" judgement in the UI.
     * - Both answers reveal only after both submit.
     * - Discussion prompt is returned only with reveal.
     */

    const question =
      relationshipCheckInQuestions[
        questionIndex
      ];

    if (!question) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Check-in question not found.",
        },
        {
          status: 500,
        }
      );
    }

    const hostAnswer =
      parseFourChoice(
        room.host_answer
      );

    const guestAnswer =
      parseFourChoice(
        room.guest_answer
      );

    const bothAnswered =
      hostAnswer !==
        null &&
      guestAnswer !==
        null;

    const selfAnswer =
      role === "host"
        ? hostAnswer
        : guestAnswer;

    const partnerAnswer =
      role === "host"
        ? guestAnswer
        : hostAnswer;

    return NextResponse.json({
      ok: true,

      gameSlug,

      status:
        "ready",

      role,

      partnerConnected:
        true,

      completed:
        false,

      questionIndex,

      roundLimit,

      question: {
        id:
          question.id,

        text:
          question.prompt,

        stage:
          question.stage,

        options:
          question.options,
      },

      selfAnswered:
        selfAnswer !==
        null,

      partnerAnswered:
        partnerAnswer !==
        null,

      reveal:
        bothAnswered
          ? {
              you:
                selfAnswer,

              partner:
                partnerAnswer,

              discussionPrompt:
                question.discussionPrompt,
            }
          : null,
    });
  } catch (error) {
    console.error(
      "game-state error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Could not load the game state.",
      },
      {
        status: 500,
      }
    );
  }
}
