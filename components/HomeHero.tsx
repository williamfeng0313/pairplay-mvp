"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

/* =========================================================
   Home Hero
========================================================= */

export default function HomeHero() {
  const router = useRouter();

  /* =======================================================
     State
  ======================================================= */

  const [
    joinCode,
    setJoinCode,
  ] = useState("");

  const [
    joinError,
    setJoinError,
  ] = useState("");

  const [
    createError,
    setCreateError,
  ] = useState("");

  const [
    busy,
    setBusy,
  ] = useState<
    "create" | "join" | null
  >(null);

  /* =======================================================
     Create Room
  ======================================================= */

  const createRoom =
    async () => {
      setBusy("create");

      setCreateError("");
      setJoinError("");

      try {
        const response =
          await fetch(
            "/api/rooms/create",
            {
              method: "POST",
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.ok
        ) {
          throw new Error(
            data.error ||
              "Could not create room."
          );
        }

        /* ===============================================
           GA4

           Do not send room code or token.
        =============================================== */

        trackEvent(
          "create_room",
          {
            source:
              "home_hero",
          }
        );

        /* ===============================================
           HttpOnly Cookie version

           Token is already stored by the server.
           Never put token into the URL.
        =============================================== */

        router.push(
          `/room/${encodeURIComponent(
            data.code
          )}`
        );
      } catch (error) {
        setCreateError(
          error instanceof Error
            ? error.message
            : "Could not create room."
        );

        setBusy(null);
      }
    };

  /* =======================================================
     Join Room
  ======================================================= */

  const joinRoom =
    async () => {
      /* ===================================================
         Only validate after the user explicitly tries
         to join.
      =================================================== */

      const normalized =
        joinCode
          .trim()
          .toUpperCase()
          .replace(
            /[^A-Z0-9]/g,
            ""
          )
          .slice(
            0,
            6
          );

      setCreateError("");

      /* ===================================================
         Invalid Length
      =================================================== */

      if (
        normalized.length !==
        6
      ) {
        trackEvent(
          "join_room_failed",
          {
            reason:
              "invalid_length",
          }
        );

        setJoinError(
          "Enter the 6-character room code."
        );

        return;
      }

      setBusy("join");
      setJoinError("");

      try {
        const response =
          await fetch(
            "/api/rooms/join",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  code:
                    normalized,
                }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.ok
        ) {
          /* =============================================
             Analytics

             Never send the actual room code.
          ============================================= */

          trackEvent(
            "join_room_failed",
            {
              reason:
                response.status ===
                404
                  ? "not_found"
                  : response.status ===
                      410
                    ? "expired"
                    : response.status ===
                        409
                      ? "full_or_race"
                      : "server",
            }
          );

          /* =============================================
             Friendly Error Messages
          ============================================= */

          if (
            response.status ===
            404
          ) {
            throw new Error(
              "Room not found. Check the code and try again."
            );
          }

          if (
            response.status ===
            410
          ) {
            throw new Error(
              "This room has expired. Ask your partner to create a new room."
            );
          }

          if (
            response.status ===
            409
          ) {
            throw new Error(
              "This room is already full or unavailable."
            );
          }

          throw new Error(
            data.error ||
              "Could not join room."
          );
        }

        /* ===============================================
           GA4
        =============================================== */

        trackEvent(
          "join_room_success",
          {
            source:
              "home_hero",
          }
        );

        /* ===============================================
           HttpOnly Cookie version

           Guest token is already stored by the server.
        =============================================== */

        router.push(
          `/room/${encodeURIComponent(
            data.code
          )}`
        );
      } catch (error) {
        setJoinError(
          error instanceof Error
            ? error.message
            : "Could not join room."
        );

        setBusy(null);
      }
    };

  /* =======================================================
     Handle Room Code Input
  ======================================================= */

  const handleCodeChange = (
    value: string
  ) => {
    const normalized =
      value
        .toUpperCase()
        .replace(
          /[^A-Z0-9]/g,
          ""
        )
        .slice(
          0,
          6
        );

    setJoinCode(
      normalized
    );

    /*
     * As soon as the user starts correcting the code,
     * remove the previous error.
     *
     * This prevents a permanent red error message while
     * the user is typing.
     */
    if (joinError) {
      setJoinError("");
    }
  };

  /* =======================================================
     Render
  ======================================================= */

  return (
    <section className="hero">

      <div className="container hero-grid">

        {/* =================================================
            Left Hero
        ================================================= */}

        <div>

          <span className="eyebrow">
            ♥ Made for Two
          </span>

          <h1>
            Online Games for Couples
            Made to{" "}

            <span className="gradient-text">
              Play Together
            </span>
          </h1>

          <p className="hero-copy">
            Fun games, questions,
            and quizzes for couples —
            no signup, no download.
            Start instantly on any
            device.
          </p>

          <div className="hero-actions">

            <Link
              href="/would-you-rather-questions-for-couples"
              className="btn-primary"
              onClick={() =>
                trackEvent(
                  "game_open",
                  {
                    game:
                      "would_you_rather",

                    source:
                      "home_hero",
                  }
                )
              }
            >
              Start a Game →
            </Link>

            <Link
              href="/games"
              className="btn-secondary"
            >
              Browse Games
            </Link>

          </div>

        </div>

        {/* =================================================
            Play Together
        ================================================= */}

        <div className="room-card">

          {/* ===============================================
              Title
          =============================================== */}

          <div className="room-title">

            <span>
              👥
            </span>

            Play Together

          </div>

          <p className="small-muted">
            Create a private room and
            invite your partner with a
            6-character room code.
          </p>

          {/* ===============================================
              3-Step Guide
          =============================================== */}

          <div
            aria-label="How multiplayer rooms work"
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",

              gap:
                "8px",

              margin:
                "16px 0 18px",
            }}
          >

            {/* Step 1 */}

            <div
              style={{
                padding:
                  "10px 8px",

                border:
                  "1px solid var(--line)",

                borderRadius:
                  "12px",

                textAlign:
                  "center",

                background:
                  "var(--soft)",
              }}
            >

              <div
                style={{
                  color:
                    "var(--pink)",

                  fontSize:
                    "0.75rem",

                  fontWeight:
                    900,

                  marginBottom:
                    "4px",
                }}
              >
                1
              </div>

              <div
                style={{
                  fontSize:
                    "0.78rem",

                  fontWeight:
                    800,

                  lineHeight:
                    1.25,
                }}
              >
                Create Room
              </div>

            </div>

            {/* Step 2 */}

            <div
              style={{
                padding:
                  "10px 8px",

                border:
                  "1px solid var(--line)",

                borderRadius:
                  "12px",

                textAlign:
                  "center",

                background:
                  "var(--soft)",
              }}
            >

              <div
                style={{
                  color:
                    "var(--pink)",

                  fontSize:
                    "0.75rem",

                  fontWeight:
                    900,

                  marginBottom:
                    "4px",
                }}
              >
                2
              </div>

              <div
                style={{
                  fontSize:
                    "0.78rem",

                  fontWeight:
                    800,

                  lineHeight:
                    1.25,
                }}
              >
                Share Code
              </div>

            </div>

            {/* Step 3 */}

            <div
              style={{
                padding:
                  "10px 8px",

                border:
                  "1px solid var(--line)",

                borderRadius:
                  "12px",

                textAlign:
                  "center",

                background:
                  "var(--soft)",
              }}
            >

              <div
                style={{
                  color:
                    "var(--pink)",

                  fontSize:
                    "0.75rem",

                  fontWeight:
                    900,

                  marginBottom:
                    "4px",
                }}
              >
                3
              </div>

              <div
                style={{
                  fontSize:
                    "0.78rem",

                  fontWeight:
                    800,

                  lineHeight:
                    1.25,
                }}
              >
                Play Together
              </div>

            </div>

          </div>

          {/* ===============================================
              Create Room
          =============================================== */}

          <button
            type="button"
            className="btn-primary"
            onClick={
              createRoom
            }
            disabled={
              busy !== null
            }
          >
            {busy ===
            "create"
              ? "Creating…"
              : "Create Room"}
          </button>

          {/* ===============================================
              Create Error

              Only appears after Create Room actually fails.
          =============================================== */}

          {createError ? (
            <div
              className="room-error"
              role="alert"
              style={{
                marginTop:
                  "10px",
              }}
            >
              {createError}
            </div>
          ) : null}

          {/* ===============================================
              Existing Room Divider
          =============================================== */}

          <div
            className="divider"
            style={{
              marginTop:
                "18px",
            }}
          >
            Already have a room code?
          </div>

          {/* ===============================================
              Join Room
          =============================================== */}

          <div className="join-row">

            <input
              className="input room-code-input"
              placeholder="Enter room code"
              value={
                joinCode
              }
              onChange={(
                event
              ) =>
                handleCodeChange(
                  event
                    .target
                    .value
                )
              }
              onKeyDown={(
                event
              ) => {
                if (
                  event.key ===
                    "Enter" &&
                  busy === null
                ) {
                  joinRoom();
                }
              }}
              maxLength={6}
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              aria-label="Room code"
              aria-invalid={
                joinError
                  ? true
                  : undefined
              }
              aria-describedby={
                joinError
                  ? "room-join-error"
                  : undefined
              }
            />

            <button
              type="button"
              className="btn-secondary"
              onClick={
                joinRoom
              }
              disabled={
                busy !== null
              }
            >
              {busy ===
              "join"
                ? "Checking…"
                : "Join Room"}
            </button>

          </div>

          {/* ===============================================
              Join Error

              Important:
              Nothing is shown here until the user
              actually tries to join.
          =============================================== */}

          {joinError ? (
            <div
              id="room-join-error"
              className="room-error"
              role="alert"
              style={{
                marginTop:
                  "9px",

                fontSize:
                  "0.82rem",
              }}
            >
              {joinError}
            </div>
          ) : null}

          {/* ===============================================
              Privacy / Expiration Note
          =============================================== */}

          <div
            className="micro-copy"
            style={{
              marginTop:
                "12px",
            }}
          >
            🔒 No account needed.
            Rooms expire automatically.
          </div>

        </div>

      </div>

    </section>
  );
}