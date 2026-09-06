"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  trackEvent,
} from "@/lib/analytics";

import PostGameFeedback from "@/components/PostGameFeedback";
import ConnectionCheck from "@/components/ConnectionCheck";


type Choice =
  | "a"
  | "b";


type GameState = {
  ok: boolean;

  status?:
    | "waiting"
    | "ready";

  role?:
    | "host"
    | "guest";

  partnerConnected?:
    boolean;

  completed?:
    boolean;

  roundLimit?:
    number;

  questionIndex?:
    number;

  question?: {
    id?: number;
    a: string;
    b: string;
  };

  selfAnswered?:
    boolean;

  partnerAnswered?:
    boolean;

  reveal?: {
    you:
      Choice;

    partner:
      Choice;

    sameChoice:
      boolean;
  } | null;

  error?: string;
};


export default function MultiplayerWouldYouRather({
  code,
  role,
}: {
  code: string;
  role:
    | "host"
    | "guest";
}) {
  const [
    state,
    setState,
  ] =
    useState<GameState>({
      ok: true,
      status:
        "ready",
      role,
      completed:
        false,
    });


  const [
    busy,
    setBusy,
  ] =
    useState(false);


  const [
    message,
    setMessage,
  ] =
    useState("");


  const startedTracked =
    useRef(false);


  const roundTracked =
    useRef<
      number | null
    >(null);


  const fiveTracked =
    useRef(false);


  const completeTracked =
    useRef(false);


  // ==============================
  // Start Analytics
  // ==============================

  useEffect(() => {
    if (
      !startedTracked.current
    ) {
      trackEvent(
        "wyr_start",
        {
          role,
        }
      );

      startedTracked.current =
        true;
    }
  }, [
    role,
  ]);


  // ==============================
  // Poll Game State
  // ==============================

  useEffect(() => {
    let cancelled =
      false;


    const loadGameState =
      async () => {
        try {
          const response =
            await fetch(
              `/api/rooms/game-state?code=${encodeURIComponent(
                code
              )}`,
              {
                cache:
                  "no-store",
              }
            );


          const data =
            await response.json();


          if (
            cancelled
          ) {
            return;
          }


          setState(
            data
          );


          // ==============================
          // Game Complete Analytics
          // ==============================

          if (
            data.ok &&
            data.completed &&
            !completeTracked.current
          ) {
            trackEvent(
              "wyr_game_complete",
              {
                role,

                rounds:
                  data.roundLimit ||
                  12,
              }
            );


            completeTracked.current =
              true;

            return;
          }


          // ==============================
          // Round Complete Analytics
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
          if (
            !cancelled
          ) {
            setMessage(
              "Connection interrupted. Retrying…"
            );
          }
        }
      };


    loadGameState();


    const timer =
      window.setInterval(
        loadGameState,
        1200
      );


    return () => {
      cancelled =
        true;


      window.clearInterval(
        timer
      );
    };
  }, [
    code,
    role,
  ]);


  // ==============================
  // Submit Answer
  // ==============================

  const submitAnswer =
    async (
      answer: Choice
    ) => {
      if (
        busy ||
        state.selfAnswered ||
        state.reveal ||
        state.completed
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
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  code,

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


        setState(
          (previous) => ({
            ...previous,

            selfAnswered:
              true,
          })
        );


        trackEvent(
          "wyr_answer",
          {
            role,

            round_number:
              state.questionIndex +
              1,
          }
        );
      } catch (
        error
      ) {
        setMessage(
          error instanceof
          Error
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
      if (
        role !==
          "host" ||
        !state.reveal ||
        state.completed
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
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  code,

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
              "Could not continue the game."
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
      } catch (
        error
      ) {
        setMessage(
          error instanceof
          Error
            ? error.message
            : "Could not continue the game."
        );
      } finally {
        setBusy(false);
      }
    };


  // ==============================
  // API Error
  // ==============================

  if (
    !state.ok
  ) {
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
  // Game Completed
  // ==============================

  if (
    state.completed
  ) {
    return (
      <>

        <div className="play-card">

          <div className="game-kicker">
            Game Complete
          </div>


          <div className="question">
            You finished all{" "}
            {state.roundLimit ||
              12}{" "}
            questions! 🎉
          </div>


          <p className="game-sub">
            Want another random set?
            Create a new room or explore
            another couple game.
          </p>


          <div className="hero-actions">

            <Link
              href="/long-distance-couple-games#create-room"
              className="btn-primary"
            >
              Create New Room →
            </Link>


            <Link
              href="/games"
              className="btn-secondary"
            >
              Explore More Games
            </Link>

          </div>

        </div>


        {/* ===============================================
            CONNECTION CHECK V1

            Important:
            - Private outcome measurement.
            - Partner does not see the answer.
            - Room code is never sent to GA4.
        =============================================== */}

        <ConnectionCheck
          code={code}
          gameSlug="would-you-rather"
          role={role}
        />


        {/* ===============================================
            POST GAME FEEDBACK

            Important:
            - Do not store real room code.
            - Do not send comment content to GA4.
        =============================================== */}

        <PostGameFeedback
          gameSlug="wyr_multiplayer"
          pagePath="/room/[code]"
        />

      </>
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


  const choiceText = (
    choice:
      | Choice
      | null
      | undefined
  ) => {
    if (
      !choice
    ) {
      return "—";
    }


    return choice ===
      "a"
      ? state.question!.a
      : state.question!.b;
  };


  const roundLimit =
    state.roundLimit ||
    12;


  const isLastRound =
    state.questionIndex ===
    roundLimit - 1;


  // ==============================
  // UI
  // ==============================

  return (
    <div className="play-card">

      <div className="game-kicker">

        Would You Rather · Round{" "}
        {state.questionIndex +
          1}{" "}
        of {roundLimit}

      </div>


      <div className="question">
        Would you rather…
      </div>


      {!state.reveal ? (
        <>

          <div className="choice-grid">

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
                submitAnswer(
                  "a"
                )
              }
            >
              {state.question.a}
            </button>


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
                submitAnswer(
                  "b"
                )
              }
            >
              {state.question.b}
            </button>

          </div>


          <div className="answer-waiting">

            {!state.selfAnswered
              ? "Pick one. Your choice stays hidden until both of you answer."
              : state.partnerAnswered
              ? "Both answered — revealing…"
              : "Answer saved. Waiting for your partner…"}

          </div>

        </>
      ) : (
        <div className="reveal-panel">

          <div className="reveal-result">

            {state.reveal.sameChoice
              ? "Perfect match ❤️"
              : "Different this time 😂"}

          </div>


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


          {role ===
          "host" ? (
            <button
              className="btn-primary"
              disabled={
                busy
              }
              onClick={
                nextQuestion
              }
            >
              {busy
                ? "Loading…"
                : isLastRound
                ? "Finish Game →"
                : "Next Question →"}
            </button>
          ) : (
            <div className="answer-waiting">

              {isLastRound
                ? "Waiting for the room creator to finish the game…"
                : "Waiting for the room creator to start the next question…"}

            </div>
          )}

        </div>
      )}


      {message ? (
        <div className="room-error">
          {message}
        </div>
      ) : null}

    </div>
  );
}