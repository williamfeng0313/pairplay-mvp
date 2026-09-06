"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  trackEvent,
} from "@/lib/analytics";


/* =========================================================
   Types
========================================================= */

type GameSlug =
  | "would-you-rather"
  | "same-answer";


type Role =
  | "host"
  | "guest";


type ConnectionScore =
  | 1
  | 2
  | 3
  | 4;


type ConnectionOption = {
  score:
    ConnectionScore;

  emoji:
    string;

  label:
    string;

  bucket:
    string;
};


/* =========================================================
   Options
========================================================= */

const OPTIONS:
  ConnectionOption[] = [
    {
      score: 1,

      emoji:
        "😕",

      label:
        "Less connected",

      bucket:
        "less_connected",
    },

    {
      score: 2,

      emoji:
        "😐",

      label:
        "About the same",

      bucket:
        "same",
    },

    {
      score: 3,

      emoji:
        "🙂",

      label:
        "A little closer",

      bucket:
        "little_closer",
    },

    {
      score: 4,

      emoji:
        "🥰",

      label:
        "Much closer",

      bucket:
        "much_closer",
    },
  ];


/* =========================================================
   Component
========================================================= */

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

  /* =======================================================
     State
  ======================================================= */

  const [
    submittingScore,
    setSubmittingScore,
  ] =
    useState<
      ConnectionScore |
      null
    >(
      null
    );


  const [
    submittedScore,
    setSubmittedScore,
  ] =
    useState<
      ConnectionScore |
      null
    >(
      null
    );


  const [
    error,
    setError,
  ] =
    useState(
      ""
    );


  const [
    skipped,
    setSkipped,
  ] =
    useState(
      false
    );


  const viewTracked =
    useRef(
      false
    );


  /* =======================================================
     View Analytics
  ======================================================= */

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


  /* =======================================================
     Submit
  ======================================================= */

  const submitScore =
    async (
      option:
        ConnectionOption
    ) => {

      if (
        submittingScore !==
          null ||
        submittedScore !==
          null
      ) {
        return;
      }


      setSubmittingScore(
        option.score
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

                  score:
                    option.score,
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


        /* ===============================================
           Only track after Supabase accepted it.

           NEVER send room code to GA4.
        =============================================== */

        trackEvent(
          "connection_check_submit",
          {
            game_slug:
              gameSlug,

            role,

            connection_score:
              option.score,

            connection_bucket:
              option.bucket,
          }
        );


        setSubmittedScore(
          option.score
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

        setSubmittingScore(
          null
        );
      }
    };


  /* =======================================================
     Skip
  ======================================================= */

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


  /* =======================================================
     Skip State
  ======================================================= */

  if (
    skipped
  ) {
    return (
      <section
        className="connection-check connection-check-done"
        aria-label="Connection check skipped"
      >

        <div className="connection-check-done-icon">
          ♡
        </div>

        <div>
          <strong>
            No problem
          </strong>

          <p>
            You can keep playing
            without answering.
          </p>
        </div>

      </section>
    );
  }


  /* =======================================================
     Submitted
  ======================================================= */

  if (
    submittedScore !==
    null
  ) {

    const selected =
      OPTIONS.find(
        (
          option
        ) =>
          option.score ===
          submittedScore
      );


    return (
      <section
        className="connection-check connection-check-done"
        aria-label="Connection check complete"
      >

        <div className="connection-check-done-icon">
          {
            selected?.emoji ??
            "💛"
          }
        </div>


        <div>

          <strong>
            Thanks for sharing
          </strong>

          <p>
            This helps us learn
            which shared activities
            actually help couples
            feel more connected.
          </p>

        </div>

      </section>
    );
  }


  /* =======================================================
     Main UI
  ======================================================= */

  return (
    <section
      className="connection-check"
      aria-labelledby="connection-check-title"
    >

      <div className="game-kicker">
        A TINY CHECK-IN
      </div>


      <h3
        id="connection-check-title"
        className="connection-check-title"
      >
        Compared with before this game,
        how connected do you feel right now?
      </h3>


      <p className="connection-check-subtitle">
        One tap is enough.
        Your answer is private and
        your partner won&apos;t see it.
      </p>


      <div
        className="connection-check-options"
        role="group"
        aria-label="How connected do you feel after playing?"
      >

        {OPTIONS.map(
          (
            option
          ) => {

            const loading =
              submittingScore ===
              option.score;


            return (
              <button
                key={
                  option.score
                }

                type="button"

                className="connection-check-option"

                disabled={
                  submittingScore !==
                  null
                }

                onClick={() =>
                  submitScore(
                    option
                  )
                }
              >

                <span
                  className="connection-check-emoji"
                  aria-hidden="true"
                >
                  {
                    option.emoji
                  }
                </span>


                <span className="connection-check-label">
                  {loading
                    ? "Saving…"
                    : option.label}
                </span>

              </button>
            );
          }
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
          submittingScore !==
          null
        }
      >
        Not now
      </button>

    </section>
  );
}