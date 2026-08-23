import {
    NextRequest,
    NextResponse,
  } from "next/server";
  
  import { supabaseRest } from "@/lib/supabaseAdmin";
  
  export const dynamic = "force-dynamic";
  
  export async function POST(
    request: NextRequest
  ) {
    try {
      // ==============================
      // 1. 获取请求参数
      // ==============================
  
      const body = await request
        .json()
        .catch(() => ({}));
  
      const code = String(
        body.code || ""
      )
        .trim()
        .toUpperCase();
  
      const token = String(
        body.token || ""
      );
  
      const questionIndex = Number(
        body.questionIndex
      );
  
      if (
        !code ||
        !token ||
        !Number.isInteger(questionIndex)
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
      // 2. 查询房间
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
            error: "Room not found.",
          },
          {
            status: 404,
          }
        );
      }
  
      // ==============================
      // 3. 房间过期
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
      // 4. 只有 Host 能 Next
      // ==============================
  
      if (
        token !== room.host_token
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
      // 5. 防止旧页面重复Next
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
      // 6. 两个人必须都已经回答
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
      // 7. 下一题
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
            current_question:
              questionIndex + 1,
  
            host_answer: null,
  
            guest_answer: null,
  
            updated_at:
              new Date().toISOString(),
          }),
        }
      );
  
      // ==============================
      // 8. 返回新题号
      // ==============================
  
      return NextResponse.json({
        ok: true,
  
        questionIndex:
          questionIndex + 1,
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