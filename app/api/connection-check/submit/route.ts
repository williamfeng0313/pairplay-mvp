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
  
  
  export const dynamic =
    "force-dynamic";
  
  
  /* =========================================================
     Allowed Games
  ========================================================= */
  
  const ALLOWED_GAMES =
    new Set([
      "would-you-rather",
      "same-answer",
    ]);
  
  
  /* =========================================================
     Types
  ========================================================= */
  
  type ConnectionScore =
    | 1
    | 2
    | 3
    | 4;
  
  
  type ConnectionBucket =
    | "less_connected"
    | "same"
    | "little_closer"
    | "much_closer";
  
  
  /* =========================================================
     Score → Bucket
  ========================================================= */
  
  const BUCKET_BY_SCORE:
    Record<
      ConnectionScore,
      ConnectionBucket
    > = {
      1: "less_connected",
  
      2: "same",
  
      3: "little_closer",
  
      4: "much_closer",
    };
  
  
  /* =========================================================
     Request Body
  ========================================================= */
  
  type RequestBody = {
    code?: unknown;
  
    gameSlug?:
      unknown;
  
    score?:
      unknown;
  };
  
  
  /* =========================================================
     POST
  ========================================================= */
  
  export async function POST(
    request: NextRequest
  ) {
    try {
  
      /* =====================================================
         Parse Body
      ===================================================== */
  
      const body =
        (
          await request
            .json()
            .catch(
              () => ({})
            )
        ) as RequestBody;
  
  
      /* =====================================================
         Room Code
  
         Used only for authentication / lookup.
  
         The public 6-character code is NOT stored
         in connection_checks.
      ===================================================== */
  
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
  
  
      /* =====================================================
         Game
      ===================================================== */
  
      const requestedGameSlug =
        typeof body.gameSlug ===
          "string"
          ? body.gameSlug
          : "";
  
  
      if (
        !ALLOWED_GAMES.has(
          requestedGameSlug
        )
      ) {
        return NextResponse.json(
          {
            ok: false,
  
            error:
              "Invalid game.",
          },
  
          {
            status: 400,
          }
        );
      }
  
  
      /* =====================================================
         Score
      ===================================================== */
  
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
  
  
      const bucket =
        BUCKET_BY_SCORE[
          score
        ];
  
  
      /* =====================================================
         HttpOnly Room Session
      ===================================================== */
  
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
  
  
      /* =====================================================
         Load Room
      ===================================================== */
  
      const roomResponse =
        await supabaseRest(
          `rooms?code=eq.${encodeURIComponent(
            code
          )}&select=id,status,expires_at,host_token,guest_token,current_question,game_slug`
        );
  
  
      const rows =
        await roomResponse.json();
  
  
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
  
  
      /* =====================================================
         Room Expired
      ===================================================== */
  
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
  
  
      /* =====================================================
         Determine Role
  
         Do NOT trust role sent by browser.
      ===================================================== */
  
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
  
  
      /* =====================================================
         Partner Must Have Joined
      ===================================================== */
  
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
  
  
      /* =====================================================
         Verify Game
  
         Browser cannot pretend that a WYR room
         was a Same Answer room.
      ===================================================== */
  
      if (
        room.game_slug !==
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
  
  
      /* =====================================================
         Verify Completed
  
         Both current games are 12 rounds in V1.
      ===================================================== */
  
      const currentQuestion =
        Number(
          room.current_question ||
            0
        );
  
  
      if (
        currentQuestion < 12
      ) {
        return NextResponse.json(
          {
            ok: false,
  
            error:
              "Complete the game before submitting this check-in.",
          },
  
          {
            status: 409,
          }
        );
      }
  
  
      /* =====================================================
         Upsert
  
         One answer per:
         Room + Game + Role + Outcome + Version
  
         Refresh / repeat submit does NOT create duplicates.
      ===================================================== */
  
      const now =
        new Date()
          .toISOString();
  
  
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
                room.game_slug,
  
              player_role:
                role,
  
              outcome_key:
                "feel_closer",
  
              connection_score:
                score,
  
              connection_bucket:
                bucket,
  
              form_version:
                "v1",
  
              updated_at:
                now,
            }),
        }
      );
  
  
      /* =====================================================
         Response
  
         Never return room internal ID.
      ===================================================== */
  
      return NextResponse.json({
        ok: true,
  
        score,
  
        bucket,
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
            "Could not save your check-in. Please try again.",
        },
  
        {
          status: 500,
        }
      );
    }
  }