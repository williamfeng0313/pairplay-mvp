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

import ConnectionCheck from "@/components/ConnectionCheck";
import PuzzlePostGameFeedback from "@/components/PuzzlePostGameFeedback";


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

  teamScore?:
    number;

  question?: {
    id?:
      string;

    category?:
      string;

    text:
      string;

    clue:
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

    correctAnswer:
      Choice;

    solved:
      boolean;

    explanation:
      string;
  } | null;

  error?:
    string;
};


function getTeamResult(
  score:
    number
) {
  if (
    score === 8
  ) {
    return {
      title:
        "Perfect Teamwork 🧩",

      description:
        "Eight out of eight. You combined your clues like a seriously good team.",
    };
  }


  if (
    score >= 6
  ) {
    return {
      title:
        "Puzzle Partners ✨",

      description:
        "You solved most of them together. Nice communication and even better teamwork.",
    };
  }


  if (
    score >= 4
  ) {
    return {
      title:
        "Strong Team 😊",

      description:
        "A solid run. You figured out plenty together and still found a few surprises.",
    };
  }


  return {
    title:
      "Warm-Up Complete 💛",

    description:
      "Some were tricky, but that is the point — the fun is in combining what each of you knows.",
  };
}


export default function MultiplayerCouplePuzzle({
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

      teamScore:
        0,
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
      number |
      null
    >(
      null
    );


  const fiveTracked =
    useRef(false);


  const completeTracked =
    useRef(false);


  useEffect(
    () => {
      if (
        startedTracked.current
      ) {
        return;
      }


      trackEvent(
        "couple_puzzle_start",
        {
          role,
        }
      );


      startedTracked.current =
        true;
    },
    [
      role,
    ]
  );


  useEffect(
    () => {
      let cancelled =
        false;


      const loadState =
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
                "couple_puzzle_game_complete",
                {
                  role,

                  rounds:
                    data.roundLimit ||
                    8,

                  team_score:
                    data.teamScore ||
                    0,
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
                "couple_puzzle_round_complete",
                {
                  role,

                  round_number:
                    data.questionIndex +
                    1,

                  solved:
                    Boolean(
                      data.reveal
                        .solved
                    ),

                  category:
                    data.question
                      ?.category ||
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
                  "couple_puzzle_five_round_complete",
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


      loadState();


      const timer =
        window.setInterval(
          loadState,
          1200
        );


      return () => {
        cancelled =
          true;


        window.clearInterval(
          timer
        );
      };
    },
    [
      code,
      role,
    ]
  );


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
          "couple_puzzle_answer",
          {
            role,

            round_number:
              state.questionIndex +
              1,

            category:
              state.question
                ?.category ||
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


  const nextPuzzle =
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
              "Could not continue the puzzle."
          );
        }


        trackEvent(
          "couple_puzzle_next_round",
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
            : "Could not continue the puzzle."
        );

      } finally {
        setBusy(
          false
        );
      }
    };


  if (
    !state.ok
  ) {
    return (
      <div className="play-card">

        <div className="game-kicker">
          Puzzle problem
        </div>

        <p className="game-sub">
          {state.error ||
            "Could not load this puzzle."}
        </p>

      </div>
    );
  }


  if (
    state.completed
  ) {
    const score =
      Number(
        state.teamScore ||
        0
      );


    const result =
      getTeamResult(
        score
      );


    return (
      <>

        <div className="play-card">

          <div className="game-kicker">
            Puzzle Complete
          </div>


          <div className="question">
            Team Score:{" "}
            {score} /{" "}
            {state.roundLimit ||
              8}
          </div>


          <h3>
            {result.title}
          </h3>


          <p className="game-sub">
            {
              result.description
            }
          </p>


          <div className="hero-actions">

            <Link
              href="/couple-puzzle"
              className="btn-primary"
              onClick={() =>
                trackEvent(
                  "couple_puzzle_restart",
                  {
                    team_score:
                      score,
                  }
                )
              }
            >
              Play Again →
            </Link>


            <Link
              href="/games"
              className="btn-secondary"
            >
              Explore More Games
            </Link>

          </div>

        </div>


        <ConnectionCheck
          code={
            code
          }
          gameSlug="couple-puzzle"
          role={
            role
          }
        />


        <PuzzlePostGameFeedback />

      </>
    );
  }


  if (
    !state.question ||
    typeof state.questionIndex !==
      "number"
  ) {
    return (
      <div className="play-card">

        <div className="game-kicker">
          Loading puzzle…
        </div>

      </div>
    );
  }


  const roundLimit =
    state.roundLimit ||
    8;


  const isLastRound =
    state.questionIndex ===
    roundLimit - 1;


  const optionText =
    (
      choice:
        Choice |
        null |
        undefined
    ) => {
      if (
        choice === null ||
        choice ===
          undefined
      ) {
        return "—";
      }


      return (
        state.question
          ?.options[
            Number(
              choice
            )
          ] ||
        "—"
      );
    };


  return (
    <div className="play-card couple-puzzle-play-card">

      <div className="game-kicker">
        {state.question.category ||
          "Couple Puzzle"} · Puzzle{" "}
        {state.questionIndex +
          1}{" "}
        of {roundLimit}
      </div>


      <div className="question">
        {
          state.question
            .text
        }
      </div>


      <div className="couple-puzzle-own-clue">

        <span>
          YOUR CLUE
        </span>

        <strong>
          {
            state.question
              .clue
          }
        </strong>

      </div>


      <p className="couple-puzzle-partner-note">
        Your partner has a different clue.
        Talk together before you choose.
      </p>


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
              ? "Combine your clues, then choose your final answer. Your choice stays hidden until both of you answer."
              : state.partnerAnswered
              ? "Both answered — revealing…"
              : "Answer saved. Waiting for your partner…"}

          </div>

        </>
      ) : (
        <div className="reveal-panel">

          <div
            className={`reveal-result ${
              state.reveal
                .solved
                ? "couple-puzzle-solved"
                : "couple-puzzle-missed"
            }`}
          >
            {state.reveal
              .solved
              ? "You solved it together! 🧩"
              : "Not quite — here is the answer"}
          </div>


          <div className="game-kicker">
            Team Score:{" "}
            {state.teamScore ||
              0} /{" "}
            {state.questionIndex +
              1}
          </div>


          <div className="reveal-grid">

            <div>

              <span>
                You
              </span>

              <strong>
                {optionText(
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
                {optionText(
                  state.reveal
                    .partner
                )}
              </strong>

            </div>

          </div>


          <div className="couple-puzzle-correct-answer">

            <span>
              CORRECT ANSWER
            </span>

            <strong>
              {optionText(
                state.reveal
                  .correctAnswer
              )}
            </strong>

            <p>
              {
                state.reveal
                  .explanation
              }
            </p>

          </div>


          {role ===
          "host" ? (
            <button
              type="button"
              className="btn-primary"
              disabled={
                busy
              }
              onClick={
                nextPuzzle
              }
            >
              {busy
                ? "Loading…"
                : isLastRound
                ? "Finish Puzzle →"
                : "Next Puzzle →"}
            </button>
          ) : (
            <div className="answer-waiting">
              {isLastRound
                ? "Wait for the room creator to finish the game."
                : "Wait for the room creator to start the next puzzle."}
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
