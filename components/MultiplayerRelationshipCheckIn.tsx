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

import ClarityCheck from "@/components/ClarityCheck";


type Choice =
  | "0"
  | "1"
  | "2"
  | "3";


type GameState = {
  ok: boolean;

  gameSlug?:
    string;

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
    id?:
      string;

    text:
      string;

    stage?:
      string;

    options:
      string[];
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

    discussionPrompt:
      string;
  } | null;

  error?:
    string;
};


const STAGE_LABELS:
  Record<
    string,
    string
  > = {
    connection:
      "Connection",

    communication:
      "Communication",

    effort:
      "Effort",

    needs:
      "Needs",

    future:
      "Future",

    repair:
      "Repair",
  };


export default function MultiplayerRelationshipCheckIn({
  code,
  role,
}: {
  code:
    string;

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


  /* =========================================================
     Start Analytics
  ========================================================= */

  useEffect(() => {
    if (
      !startedTracked.current
    ) {
      trackEvent(
        "relationship_check_in_start",
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


  /* =========================================================
     Poll Game State
  ========================================================= */

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
            await response
              .json();


          if (
            cancelled
          ) {
            return;
          }


          setState(
            data
          );


          if (
            data.ok &&
            data.completed &&
            !completeTracked.current
          ) {
            trackEvent(
              "relationship_check_in_game_complete",
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


          if (
            data.ok &&
            data.reveal &&
            typeof data.questionIndex ===
              "number" &&
            roundTracked.current !==
              data.questionIndex
          ) {
            trackEvent(
              "relationship_check_in_round_complete",
              {
                role,

                round_number:
                  data.questionIndex +
                  1,

                stage:
                  data.question
                    ?.stage ||
                  "unknown",
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
                "relationship_check_in_five_round_complete",
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


  /* =========================================================
     Submit Answer
  ========================================================= */

  const submitAnswer =
    async (
      answer:
        Choice
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


      setBusy(
        true
      );


      setMessage(
        ""
      );


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
          await response
            .json();


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
          (
            previous
          ) => ({
            ...previous,

            selfAnswered:
              true,
          })
        );


        trackEvent(
          "relationship_check_in_answer",
          {
            role,

            round_number:
              state.questionIndex +
              1,

            stage:
              state.question
                ?.stage ||
              "unknown",
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
        setBusy(
          false
        );
      }
    };


  /* =========================================================
     Next Question
  ========================================================= */

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


      setBusy(
        true
      );


      setMessage(
        ""
      );


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
          await response
            .json();


        if (
          !response.ok ||
          !data.ok
        ) {
          throw new Error(
            data.error ||
              "Could not continue the check-in."
          );
        }


        trackEvent(
          "relationship_check_in_next_round",
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
            : "Could not continue the check-in."
        );

      } finally {
        setBusy(
          false
        );
      }
    };


  /* =========================================================
     API Error
  ========================================================= */

  if (
    !state.ok
  ) {
    return (
      <div className="play-card">

        <div className="game-kicker">
          Check-in problem
        </div>

        <p className="game-sub">
          {state.error ||
            "Could not load this check-in."}
        </p>

      </div>
    );
  }


  /* =========================================================
     Complete
  ========================================================= */

  if (
    state.completed
  ) {
    return (
      <>

        <div className="play-card">

          <div className="game-kicker">
            Check-In Complete
          </div>


          <div className="question">
            You made it through all{" "}
            {state.roundLimit ||
              12}{" "}
            questions.
          </div>


          <p className="game-sub">
            There is no score to compare.
            What matters is what you understand
            about each other now that you did
            not understand before.
          </p>


          <div className="relationship-check-complete-note">

            <strong>
              Before you leave
            </strong>

            <p>
              Talk about one answer that surprised
              you, one thing you understand better,
              and one realistic next step you both
              feel comfortable with.
            </p>

          </div>


          <div className="hero-actions">

            <Link
              href="/relationship-check-in"
              className="btn-primary"
              onClick={() =>
                trackEvent(
                  "relationship_check_in_restart",
                  {
                    role,
                  }
                )
              }
            >
              Start Another Check-In →
            </Link>


            <Link
              href="/games"
              className="btn-secondary"
            >
              Explore Lighter Games
            </Link>

          </div>

        </div>


        {/* ===============================================
            CLARITY OUTCOME CHECK

            - Private
            - Partner does not see the answer
            - Saved server-side only after completion
            - No room code/private answer sent to GA4
        =============================================== */}

        <ClarityCheck
          code={code}
          role={role}
        />

      </>
    );
  }


  /* =========================================================
     Loading
  ========================================================= */

  if (
    !state.question ||
    typeof state.questionIndex !==
      "number"
  ) {
    return (
      <div className="play-card">

        <div className="game-kicker">
          Loading check-in…
        </div>

      </div>
    );
  }


  const roundLimit =
    state.roundLimit ||
    12;


  const isLastRound =
    state.questionIndex ===
    roundLimit - 1;


  const stageLabel =
    STAGE_LABELS[
      state.question.stage ||
      ""
    ] ||
    "Relationship Check-In";


  const choiceText =
    (
      choice:
        | Choice
        | null
        | undefined
    ) => {
      if (
        choice ===
          null ||
        choice ===
          undefined
      ) {
        return "—";
      }


      const index =
        Number(
          choice
        );


      return (
        state.question
          ?.options[
            index
          ] ||
        "—"
      );
    };


  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="play-card">

      <div className="game-kicker">
        {stageLabel} · Question{" "}
        {state.questionIndex +
          1}{" "}
        of {roundLimit}
      </div>


      <div className="question">
        {state.question.text}
      </div>


      {!state.reveal ? (
        <>

          <div className="choice-grid">

            {state.question.options.map(
              (
                option,
                index
              ) => {
                const choice =
                  String(
                    index
                  ) as
                    Choice;


                return (
                  <button
                    key={
                      choice
                    }

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
                        choice
                      )
                    }
                  >
                    {option}
                  </button>
                );
              }
            )}

          </div>


          <div className="answer-waiting">

            {!state.selfAnswered
              ? "Choose the answer that feels closest to where you are right now. Your answer stays hidden until both of you respond."
              : state.partnerAnswered
              ? "Both answered — revealing…"
              : "Answer saved. Waiting for your partner…"}

          </div>

        </>
      ) : (
        <div className="reveal-panel">

          <div className="reveal-result">
            Here&apos;s how you both see it
          </div>


          <div className="reveal-grid">

            <div>

              <span>
                You
              </span>

              <strong>
                {choiceText(
                  state.reveal
                    .you
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


          <div className="relationship-check-discussion-prompt">

            <span>
              TALK ABOUT THIS
            </span>

            <p>
              {
                state.reveal
                  .discussionPrompt
              }
            </p>

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
                ? "Finish Check-In →"
                : "Next Question →"}
            </button>
          ) : (
            <div className="answer-waiting">

              {isLastRound
                ? "Take a moment to talk, then wait for the room creator to finish the check-in."
                : "Take a moment to talk, then wait for the room creator to continue."}

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
