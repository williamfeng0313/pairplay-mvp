"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  trackEvent,
} from "@/lib/analytics";


type GameSlug =
  | "would-you-rather"
  | "same-answer"
  | "couple-puzzle";


type Role =
  | "host"
  | "guest";


type ConnectionScore =
  | 1
  | 2
  | 3
  | 4;


const OPTIONS = [
  {
    score: 1 as const,
    emoji: "😕",
    label:
      "Less connected",
    bucket:
      "less_connected",
  },

  {
    score: 2 as const,
    emoji: "😐",
    label:
      "About the same",
    bucket:
      "same",
  },

  {
    score: 3 as const,
    emoji: "🙂",
    label:
      "A little closer",
    bucket:
      "little_closer",
  },

  {
    score: 4 as const,
    emoji: "🥰",
    label:
      "Much closer",
    bucket:
      "much_closer",
  },
];


export default function ConnectionCheck({
  code,
  gameSlug,
  role,
}: {
  code:
    string;

  gameSlug:
    GameSlug;

  role:
    Role;
}) {
  const [
    submitting,
    setSubmitting,
  ] =
    useState<
      ConnectionScore |
      null
    >(
      null
    );


  const [
    submitted,
    setSubmitted,
  ] =
    useState<
      ConnectionScore |
      null
    >(
      null
    );


  const [
    skipped,
    setSkipped,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  const viewTracked =
    useRef(false);


  useEffect(
    () => {
      if (
        viewTracked.current
      ) {
        return;
      }


      trackEvent(
        "connection_check_view",
        {
          game_slug:
            gameSlug,

          role,
        }
      );


      viewTracked.current =
        true;
    },
    [
      gameSlug,
      role,
    ]
  );


  const submit =
    async (
      score:
        ConnectionScore,
      bucket:
        string
    ) => {
      if (
        submitting !==
          null ||
        submitted !==
          null
      ) {
        return;
      }


      setSubmitting(
        score
      );


      setError(
        ""
      );


      try {
        const response =
          await fetch(
            "/api/connection-check/submit",
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

                  gameSlug,

                  score,
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


        trackEvent(
          "connection_check_submit",
          {
            game_slug:
              gameSlug,

            role,

            connection_score:
              score,

            connection_bucket:
              bucket,
          }
        );


        setSubmitted(
          score
        );

      } catch (
        submitError
      ) {
        setError(
          submitError instanceof
            Error
            ? submitError.message
            : "Could not save your answer."
        );

      } finally {
        setSubmitting(
          null
        );
      }
    };


  const skip =
    () => {
      trackEvent(
        "connection_check_skip",
        {
          game_slug:
            gameSlug,

          role,
        }
      );


      setSkipped(
        true
      );
    };


  if (
    skipped
  ) {
    return (
      <section className="connection-check connection-check-done">

        <div className="connection-check-done-icon">
          ♡
        </div>

        <div>

          <strong>
            No problem
          </strong>

          <p>
            Thanks for playing together.
          </p>

        </div>

      </section>
    );
  }


  if (
    submitted !==
    null
  ) {
    return (
      <section className="connection-check connection-check-done">

        <div className="connection-check-done-icon">
          ♥
        </div>

        <div>

          <strong>
            Thanks for sharing
          </strong>

          <p>
            Your answer is private and
            helps us learn which shared
            activities actually feel
            meaningful.
          </p>

        </div>

      </section>
    );
  }


  return (
    <section className="connection-check">

      <div className="game-kicker">
        ONE LAST THING
      </div>


      <h3 className="connection-check-title">
        Compared with before this game,
        how connected do you feel right now?
      </h3>


      <p className="connection-check-subtitle">
        Your answer is private.
        Your partner won&apos;t see it.
      </p>


      <div className="connection-check-options">

        {OPTIONS.map(
          (
            option
          ) => (
            <button
              key={
                option.score
              }

              type="button"

              className="connection-check-option"

              disabled={
                submitting !==
                null
              }

              onClick={() =>
                submit(
                  option.score,
                  option.bucket
                )
              }
            >

              <span className="connection-check-emoji">
                {
                  option.emoji
                }
              </span>


              <span className="connection-check-label">
                {submitting ===
                option.score
                  ? "Saving…"
                  : option.label}
              </span>

            </button>
          )
        )}

      </div>


      {error ? (
        <p
          className="connection-check-error"
          role="alert"
        >
          {error}
        </p>
      ) : null}


      <button
        type="button"
        className="connection-check-skip"
        onClick={
          skip
        }
        disabled={
          submitting !==
          null
        }
      >
        Not now
      </button>

    </section>
  );
}
