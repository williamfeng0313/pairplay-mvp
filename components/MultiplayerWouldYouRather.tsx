"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Choice = "a" | "b";

type GameState = {
  ok: boolean;

  status?: "waiting" | "ready";

  role?: "host" | "guest";

  partnerConnected?: boolean;

  questionIndex?: number;

  question?: {
    a: string;
    b: string;
  };

  selfAnswered?: boolean;

  partnerAnswered?: boolean;

  reveal?: {
    you: Choice;
    partner: Choice;
    sameChoice: boolean;
  } | null;

  error?: string;
};

export default function MultiplayerWouldYouRather({
  code,
  token,
  role,
}: {
  code: string;
  token: string;
  role: "host" | "guest";
}) {
  // ==============================
  // State
  // ==============================

  const [state, setState] =
    useState<GameState>({
      ok: true,
      status: "ready",
      role,
    });

  const [busy, setBusy] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // 防止 Analytics 重复记录
  const startedTracked =
    useRef(false);

  const roundTracked =
    useRef<number | null>(null);

  const fiveTracked =
    useRef(false);

  // ==============================
  // Analytics - Game Start
  // ==============================

  useEffect(() => {
    if (!startedTracked.current) {
      trackEvent("wyr_start", {
        role,
      });

      startedTracked.current = true;
    }
  }, [role]);

  // ==============================
  // Polling Game State
  // ==============================

  useEffect(() => {
    let cancelled = false;

    const loadGameState =
      async () => {
        try {
          const response =
            await fetch(
              `/api/rooms/game-state?code=${encodeURIComponent(
                code
              )}&token=${encodeURIComponent(
                token
              )}`,
              {
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (cancelled) {
            return;
          }

          setState(data);

          // ==============================
          // Analytics - Round Complete
          // ==============================

          if (
            data.ok &&
            data.reveal &&
            typeof data.questionIndex ===
              "number" &&
            roundTracked.current !==
              data.questionIndex
          ) {
            trackEvent(
              "wyr_round_complete",
              {
                role,

                round_number:
                  data.questionIndex +
                  1,

                same_choice:
                  Boolean(
                    data.reveal
                      .sameChoice
                  ),
              }
            );

            roundTracked.current =
              data.questionIndex;

            // ==============================
            // Analytics - 5 rounds
            // ==============================

            if (
              data.questionIndex >=
                4 &&
              !fiveTracked.current
            ) {
              trackEvent(
                "wyr_five_round_complete",
                {
                  role,
                }
              );

              fiveTracked.current =
                true;
            }
          }
        } catch {
          if (!cancelled) {
            setMessage(
              "Connection interrupted. Retrying…"
            );
          }
        }
      };

    // 第一次立即读取
    loadGameState();

    // 每1.2秒同步一次
    const timer =
      window.setInterval(
        loadGameState,
        1200
      );

    return () => {
      cancelled = true;

      window.clearInterval(
        timer
      );
    };
  }, [code, token, role]);

  // ==============================
  // Submit Answer
  // ==============================

  const submitAnswer =
    async (answer: Choice) => {
      // 防止重复点击
      if (
        busy ||
        state.selfAnswered ||
        state.reveal
      ) {
        return;
      }

      if (
        typeof state.questionIndex !==
        "number"
      ) {
        return;
      }

      setBusy(true);
      setMessage("");

      try {
        const response =
          await fetch(
            "/api/rooms/answer",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                code,
                token,

                questionIndex:
                  state.questionIndex,

                answer,
              }),
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
              "Could not save your answer."
          );
        }

        // 立即让当前页面进入 waiting
        // 不必等 polling
        setState(
          (previous) => ({
            ...previous,
            selfAnswered: true,
          })
        );

        // Analytics
        trackEvent(
          "wyr_answer",
          {
            role,

            round_number:
              state.questionIndex +
              1,
          }
        );
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Could not save your answer."
        );
      } finally {
        setBusy(false);
      }
    };

  // ==============================
  // Next Question
  // ==============================

  const nextQuestion =
    async () => {
      // 只有Host能Next
      if (
        role !== "host" ||
        !state.reveal
      ) {
        return;
      }

      if (
        typeof state.questionIndex !==
        "number"
      ) {
        return;
      }

      setBusy(true);
      setMessage("");

      try {
        const response =
          await fetch(
            "/api/rooms/next",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                code,
                token,

                questionIndex:
                  state.questionIndex,
              }),
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
              "Could not start the next question."
          );
        }

        trackEvent(
          "wyr_next_round",
          {
            role,

            round_number:
              state.questionIndex +
              2,
          }
        );

        /*
         * 不需要自己手动改题。
         *
         * Host更新Supabase以后，
         * 两边的 polling 会自动读取
         * 新 current_question。
         */
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Could not start the next question."
        );
      } finally {
        setBusy(false);
      }
    };

  // ==============================
  // API Error
  // ==============================

  if (!state.ok) {
    return (
      <div className="play-card">

        <div className="game-kicker">
          Room problem
        </div>

        <p className="game-sub">
          {state.error ||
            "Could not load this room."}
        </p>

      </div>
    );
  }

  // ==============================
  // Loading
  // ==============================

  if (
    !state.question ||
    typeof state.questionIndex !==
      "number"
  ) {
    return (
      <div className="play-card">

        <div className="game-kicker">
          Loading game…
        </div>

      </div>
    );
  }

  // ==============================
  // Convert a/b → actual answer text
  // ==============================

  const choiceText = (
    choice:
      | Choice
      | null
      | undefined
  ) => {
    if (!choice) {
      return "—";
    }

    return choice === "a"
      ? state.question!.a
      : state.question!.b;
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="play-card">

      {/* Round */}

      <div className="game-kicker">
        Would You Rather · Round{" "}
        {state.questionIndex + 1}
      </div>

      {/* Question */}

      <div className="question">
        Would you rather…
      </div>

      {/* ==============================
          Before Reveal
      ============================== */}

      {!state.reveal ? (
        <>
          <div className="choice-grid">

            {/* Choice A */}

            <button
              className={`choice ${
                state.selfAnswered
                  ? "disabled-choice"
                  : ""
              }`}
              disabled={
                busy ||
                state.selfAnswered
              }
              onClick={() =>
                submitAnswer("a")
              }
            >
              {state.question.a}
            </button>

            {/* Choice B */}

            <button
              className={`choice ${
                state.selfAnswered
                  ? "disabled-choice"
                  : ""
              }`}
              disabled={
                busy ||
                state.selfAnswered
              }
              onClick={() =>
                submitAnswer("b")
              }
            >
              {state.question.b}
            </button>

          </div>

          {/* Waiting State */}

          <div className="answer-waiting">

            {!state.selfAnswered
              ? "Pick one. Your choice stays hidden until both of you answer."
              : state.partnerAnswered
              ? "Both answered — revealing…"
              : "Answer saved. Waiting for your partner…"}

          </div>
        </>
      ) : (

        /* ==============================
           Reveal
        ============================== */

        <div className="reveal-panel">

          {/* Result */}

          <div className="reveal-result">

            {state.reveal.sameChoice
              ? "Perfect match ❤️"
              : "Different this time 😂"}

          </div>

          {/* Compare answers */}

          <div className="reveal-grid">

            <div>

              <span>
                You
              </span>

              <strong>
                {choiceText(
                  state.reveal.you
                )}
              </strong>

            </div>

            <div>

              <span>
                Partner
              </span>

              <strong>
                {choiceText(
                  state.reveal
                    .partner
                )}
              </strong>

            </div>

          </div>

          {/* Host controls next */}

          {role === "host" ? (

            <button
              className="btn-primary"
              disabled={busy}
              onClick={
                nextQuestion
              }
            >
              {busy
                ? "Loading…"
                : "Next Question →"}
            </button>

          ) : (

            <div className="answer-waiting">

              Waiting for the room
              creator to start the
              next question…

            </div>

          )}

        </div>
      )}

      {/* Error */}

      {message ? (
        <div className="room-error">
          {message}
        </div>
      ) : null}

    </div>
  );
}