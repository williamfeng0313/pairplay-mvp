import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  supabaseRest,
} from "@/lib/supabaseAdmin";

import {
  getWouldYouRatherQuestionsForRoom,
  WOULD_YOU_RATHER_ROUND_LIMIT,
} from "@/lib/wouldYouRatherGame";

export const dynamic =
  "force-dynamic";

export async function GET(
  request: NextRequest
) {
  try {
    // ==============================
    // 1. 获取Room参数
    // ==============================

    const code = (
      request.nextUrl.searchParams.get(
        "code"
      ) || ""
    )
      .trim()
      .toUpperCase();

    const token =
      request.nextUrl.searchParams.get(
        "token"
      ) || "";

    if (!code || !token) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing room credentials.",
        },
        {
          status: 400,
        }
      );
    }

    // ==============================
    // 2. 查询Room
    // ==============================

    const response =
      await supabaseRest(
        `rooms?code=eq.${encodeURIComponent(
          code
        )}&select=id,code,status,expires_at,host_token,guest_token,current_question,host_answer,guest_answer`
      );

    const rows =
      await response.json();

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

    // ==============================
    // 3. Room Expired
    // ==============================

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

    // ==============================
    // 4. 判断Role
    // ==============================

    let role:
      | "host"
      | "guest"
      | null = null;

    if (
      token ===
      room.host_token
    ) {
      role = "host";
    }

    if (
      token ===
      room.guest_token
    ) {
      role = "guest";
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

    // ==============================
    // 5. Guest还没加入
    // ==============================

    if (
      room.status !==
      "ready"
    ) {
      return NextResponse.json({
        ok: true,

        status:
          room.status,

        role,

        partnerConnected:
          false,

        completed:
          false,
      });
    }

    // ==============================
    // 6. 当前Round
    // ==============================

    const questionIndex =
      Number(
        room.current_question ||
          0
      );

    // ==============================
    // 7. Game Complete
    // ==============================

    if (
      questionIndex >=
      WOULD_YOU_RATHER_ROUND_LIMIT
    ) {
      return NextResponse.json({
        ok: true,

        status:
          "ready",

        role,

        partnerConnected:
          true,

        completed:
          true,

        roundLimit:
          WOULD_YOU_RATHER_ROUND_LIMIT,
      });
    }

    // ==============================
    // 8. 根据Room Code生成随机12题
    // ==============================

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

    // ==============================
    // 9. Answer State
    // ==============================

    const hostAnswer =
      room.host_answer as
        | "a"
        | "b"
        | null;

    const guestAnswer =
      room.guest_answer as
        | "a"
        | "b"
        | null;

    const bothAnswered =
      Boolean(
        hostAnswer &&
          guestAnswer
      );

    const selfAnswer =
      role === "host"
        ? hostAnswer
        : guestAnswer;

    const partnerAnswer =
      role === "host"
        ? guestAnswer
        : hostAnswer;

    // ==============================
    // 10. Return State
    // ==============================

    return NextResponse.json({
      ok: true,

      status:
        "ready",

      role,

      partnerConnected:
        true,

      completed:
        false,

      questionIndex,

      roundLimit:
        WOULD_YOU_RATHER_ROUND_LIMIT,

      question: {
        id: question.id,
        a: question.a,
        b: question.b,
      },

      selfAnswered:
        Boolean(
          selfAnswer
        ),

      partnerAnswered:
        Boolean(
          partnerAnswer
        ),

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