import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  supabaseRest,
} from "@/lib/supabaseAdmin";

import {
  WOULD_YOU_RATHER_ROUND_LIMIT,
} from "@/lib/wouldYouRatherGame";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request
        .json()
        .catch(() => ({}));

    const code =
      String(
        body.code || ""
      )
        .trim()
        .toUpperCase();

    const token =
      String(
        body.token || ""
      );

    const questionIndex =
      Number(
        body.questionIndex
      );

    if (
      !code ||
      !token ||
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

    // ==============================
    // Get Room
    // ==============================

    const response =
      await supabaseRest(
        `rooms?code=eq.${encodeURIComponent(
          code
        )}&select=id,status,expires_at,host_token,current_question,host_answer,guest_answer`
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
    // Expired
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
    // Only Host
    // ==============================

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

    // ==============================
    // Prevent double Next
    // ==============================

    if (
      Number(
        room.current_question ||
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

    // ==============================
    // Both must answer
    // ==============================

    if (
      !room.host_answer ||
      !room.guest_answer
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

    // ==============================
    // Round 12之后进入Completed
    // ==============================

    const nextQuestionIndex =
      Math.min(
        questionIndex + 1,
        WOULD_YOU_RATHER_ROUND_LIMIT
      );

    await supabaseRest(
      `rooms?id=eq.${encodeURIComponent(
        room.id
      )}`,
      {
        method:
          "PATCH",

        headers: {
          Prefer:
            "return=minimal",
        },

        body:
          JSON.stringify({
            current_question:
              nextQuestionIndex,

            host_answer:
              null,

            guest_answer:
              null,

            updated_at:
              new Date().toISOString(),
          }),
      }
    );

    return NextResponse.json({
      ok: true,

      completed:
        nextQuestionIndex >=
        WOULD_YOU_RATHER_ROUND_LIMIT,

      questionIndex:
        nextQuestionIndex,
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