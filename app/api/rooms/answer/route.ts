import {
    NextRequest,
    NextResponse,
  } from "next/server";
  
  import { supabaseRest } from "@/lib/supabaseAdmin";
  import {
    getRoomTokenFromRequest,
    normalizeRoomCode,
  } from "@/lib/roomSession";
  
  export const dynamic = "force-dynamic";
  
  export async function POST(
    request: NextRequest
  ) {
    try {
      // ==============================
      // 1. 获取前端提交的数据
      // ==============================
  
      const body = await request
        .json()
        .catch(() => ({}));
  
      const code =
        normalizeRoomCode(
          body.code
        );

      const token =
        getRoomTokenFromRequest(
          request,
          code
        );
  
      const questionIndex = Number(
        body.questionIndex
      );
  
      const answer =
        body.answer === "a" ||
        body.answer === "b"
          ? body.answer
          : null;
  
      // ==============================
      // 2. 参数校验
      // ==============================
  
      if (
        code.length !== 6 ||
        !Number.isInteger(questionIndex) ||
        !answer
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
  
      // ==============================
      // 3. 查询房间
      // ==============================
  
      const response =
        await supabaseRest(
          `rooms?code=eq.${encodeURIComponent(
            code
          )}&select=id,status,expires_at,host_token,guest_token,current_question,host_answer,guest_answer`
        );
  
      const rows = await response.json();
  
      const room =
        Array.isArray(rows) &&
        rows.length > 0
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
      // 4. 检查房间过期
      // ==============================
  
      if (
        new Date(
          room.expires_at
        ).getTime() <= Date.now()
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
      // 5. Partner必须已经加入
      // ==============================
  
      if (room.status !== "ready") {
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
  
      // ==============================
      // 6. 判断玩家身份
      // ==============================
  
      let role:
        | "host"
        | "guest"
        | null = null;
  
      if (
        token === room.host_token
      ) {
        role = "host";
      }
  
      if (
        token === room.guest_token
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
      // 7. 防止旧页面提交旧题答案
      // ==============================
  
      if (
        Number(
          room.current_question || 0
        ) !== questionIndex
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
      // 8. 判断应该写哪个字段
      // ==============================
  
      const answerColumn =
        role === "host"
          ? "host_answer"
          : "guest_answer";
  
      const existingAnswer =
        role === "host"
          ? room.host_answer
          : room.guest_answer;
  
      // 防止同一个人重复回答
      if (existingAnswer) {
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
  
      // ==============================
      // 9. 写入 Supabase
      // ==============================
  
      await supabaseRest(
        `rooms?id=eq.${encodeURIComponent(
          room.id
        )}`,
        {
          method: "PATCH",
  
          headers: {
            Prefer:
              "return=minimal",
          },
  
          body: JSON.stringify({
            [answerColumn]: answer,
  
            updated_at:
              new Date().toISOString(),
          }),
        }
      );
  
      // ==============================
      // 10. 返回成功
      // ==============================
  
      return NextResponse.json({
        ok: true,
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