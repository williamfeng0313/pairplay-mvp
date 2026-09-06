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

  matchCount?:
    number;

  question?: {
    id?: string;

    text:
      string;

    category?:
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

    sameChoice:
      boolean;
  } | null;

  error?: string;
};

function getMatchResult(
  matchCount: number
) {
  if (
    matchCount === 12
  ) {
    return {
      title:
        "Perfect Match ❤️",

      description:
        "Twelve out of twelve. You two were completely in sync.",
    };
  }

  if (
    matchCount >= 9
  ) {
    return {
      title:
        "Almost Mind Readers ✨",

      description:
        "You agreed on almost everything.",
    };
  }

  if (
    matchCount >= 6
  ) {
    return {
      title:
        "Pretty In Sync 😊",

      description:
        "You think alike more often than not — with a few fun surprises.",
    };
  }

  if (
    matchCount >= 3
  ) {
    return {
      title:
        "Opposites Make It Fun 😄",

      description:
        "Plenty of different answers — which gives you plenty to talk about.",
    };
  }

  return {
    title:
      "Full of Surprises 😂",

    description:
      "You picked very differently this time. That's half the fun.",
  };
}

function getMatchBucket(
  matchCount: number
) {
  if (
    matchCount === 12
  ) {
    return "12";
  }

  if (
    matchCount >= 9
  ) {
    return "9-11";
  }

  if (
    matchCount >= 6
  ) {
    return "6-8";
  }

  if (
    matchCount >= 3
  ) {
    return "3-5";
  }

  return "0-2";
}

export default function MultiplayerSameAnswer({
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

      matchCount:
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
      number | null
    >(null);

  const fiveTracked =
    useRef(false);

  const completeTracked =
    useRef(false);

  /*
   * ==========================================
   * Start Analytics
   * ==========================================
   */

  useEffect(() => {
    if (
      !startedTracked.current
    ) {
      trackEvent(
        "same_answer_start",
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

  /*
   * ==========================================
   * Poll Game State
   * ==========================================
   */

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
            const matchCount =
              Number(
                data.matchCount ||
                  0
              );

            trackEvent(
              "same_answer_game_complete",
              {
                role,

                rounds:
                  data.roundLimit ||
                  12,

                match_count:
                  matchCount,

                match_bucket:
                  getMatchBucket(
                    matchCount
                  ),
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
              "same_answer_round_complete",
              {
                role,

                round_number:
                  data.questionIndex +
                  1,

                is_match:
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
                "same_answer_five_round_complete",
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

  /*
   * ==========================================
   * Submit Answer
   * ==========================================
   */

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

  /*
   * ==========================================
   * Next Round
   * ==========================================
   */

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
          await response
            .json();

        if (
          !response.ok ||
          !data.ok
        ) {
          throw new Error(
            data.error ||
              "Could not continue the game."
          );
        }
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

  /*
   * ==========================================
   * Error
   * ==========================================
   */

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

  /*
   * ==========================================
   * Completed
   * ==========================================
   */

  if (
    state.completed
  ) {
    const matchCount =
      Number(
        state.matchCount ||
          0
      );

    const result =
      getMatchResult(
        matchCount
      );

    return (
      <>

        <div className="play-card">

          <div className="game-kicker">
            Game Complete
          </div>

          <div className="question">
            {matchCount} /{" "}
            {state.roundLimit ||
              12}{" "}
            Matches
          </div>

          <h3>
            {result.title}
          </h3>

          <p className="game-sub">
            {result.description}
          </p>

          <div className="hero-actions">

            <Link
              href="/same-answer"
              className="btn-primary"
              onClick={() =>
                trackEvent(
                  "same_answer_restart",
                  {
                    match_count:
                      matchCount,
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

        <PostGameFeedback
          gameSlug="same_answer"
          pagePath="/room/[code]"
        />

      </>
    );
  }

  /*
   * ==========================================
   * Loading
   * ==========================================
   */

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

  const roundLimit =
    state.roundLimit ||
    12;

  const isLastRound =
    state.questionIndex ===
    roundLimit - 1;

  const choiceText = (
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

  return (
    <div className="play-card">

      <div className="game-kicker">
        Same Answer · Round{" "}
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
              ? "Pick one. Your answer stays hidden until both of you choose."
              : state.partnerAnswered
              ? "Both answered — revealing…"
              : "Answer saved. Waiting for your partner…"}

          </div>

        </>
      ) : (
        <div className="reveal-panel">

          <div className="reveal-result">

            {state.reveal
              .sameChoice
              ? "Same answer ❤️"
              : "Different answers 😄"}

          </div>

          <div className="game-kicker">
            Match Count:{" "}
            {state.matchCount ||
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