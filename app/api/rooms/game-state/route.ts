import { NextRequest, NextResponse } from "next/server";
import { supabaseRest } from "@/lib/supabaseAdmin";
import { wouldYouRather } from "@/data/questions";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // ==============================
    // 1. 获取房间参数
    // ==============================

    const code = (
      request.nextUrl.searchParams.get("code") || ""
    )
      .trim()
      .toUpperCase();

    const token =
      request.nextUrl.searchParams.get("token") || "";

    if (!code || !token) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing room credentials.",
        },
        {
          status: 400,
        }
      );
    }

    // ==============================
    // 2. 从 Supabase 查询房间
    // ==============================

    const response = await supabaseRest(
      `rooms?code=eq.${encodeURIComponent(
        code
      )}&select=id,code,status,expires_at,host_token,guest_token,current_question,host_answer,guest_answer`
    );

    const rows = await response.json();

    const room =
      Array.isArray(rows) && rows.length > 0
        ? rows[0]
        : null;

    if (!room) {
      return NextResponse.json(
        {
          ok: false,
          error: "Room not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ==============================
    // 3. 检查房间是否过期
    // ==============================

    if (
      new Date(room.expires_at).getTime() <=
      Date.now()
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Room expired.",
        },
        {
          status: 410,
        }
      );
    }

    // ==============================
    // 4. 判断当前玩家身份
    // ==============================

    let role: "host" | "guest" | null = null;

    if (token === room.host_token) {
      role = "host";
    }

    if (token === room.guest_token) {
      role = "guest";
    }

    if (!role) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid room token.",
        },
        {
          status: 403,
        }
      );
    }

    // ==============================
    // 5. Partner 还没加入
    // ==============================

    if (room.status !== "ready") {
      return NextResponse.json({
        ok: true,
        status: room.status,
        role,
        partnerConnected: false,
      });
    }

    // ==============================
    // 6. 获取当前题目
    // ==============================

    const rawQuestionIndex = Number(
      room.current_question || 0
    );

    const questionIndex = Number.isFinite(
      rawQuestionIndex
    )
      ? rawQuestionIndex
      : 0;

    const question =
      wouldYouRather[
        questionIndex % wouldYouRather.length
      ];

    // ==============================
    // 7. 判断双方答案
    // ==============================

    const hostAnswer = room.host_answer as
      | "a"
      | "b"
      | null;

    const guestAnswer = room.guest_answer as
      | "a"
      | "b"
      | null;

    const bothAnswered = Boolean(
      hostAnswer && guestAnswer
    );

    // 当前用户自己的答案
    const selfAnswer =
      role === "host"
        ? hostAnswer
        : guestAnswer;

    // 对方答案
    const partnerAnswer =
      role === "host"
        ? guestAnswer
        : hostAnswer;

    // ==============================
    // 8. 返回游戏状态
    // ==============================

    return NextResponse.json({
      ok: true,

      status: "ready",

      role,

      partnerConnected: true,

      questionIndex,

      question,

      selfAnswered: Boolean(selfAnswer),

      partnerAnswered: Boolean(partnerAnswer),

      // 只有双方都回答之后才把答案返回
      reveal: bothAnswered
        ? {
            you: selfAnswer,
            partner: partnerAnswer,

            sameChoice:
              selfAnswer === partnerAnswer,
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