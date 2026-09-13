"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  trackEvent,
} from "@/lib/analytics";


type Role =
  | "host"
  | "guest";


type ClarityScore =
  | 1
  | 2
  | 3
  | 4;


type ClarityOption = {
  score:
    ClarityScore;

  emoji:
    string;

  label:
    string;

  bucket:
    string;
};


const OPTIONS:
  ClarityOption[] = [
    {
      score: 1,

      emoji:
        "😕",

      label:
        "Less clear",

      bucket:
        "less_clear",
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
        "A little clearer",

      bucket:
        "little_clearer",
    },

    {
      score: 4,

      emoji:
        "✨",

      label:
        "Much clearer",

      bucket:
        "much_clearer",
    },
  ];


export default function ClarityCheck({
  code,
  role,
}: {
  code:
    string;

  role:
    Role;
}) {
  const [
    submittingScore,
    setSubmittingScore,
  ] =
    useState<
      ClarityScore |
      null
    >(
      null
    );


  const [
    submittedScore,
    setSubmittedScore,
  ] =
    useState<
      ClarityScore |
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


  useEffect(
    () => {
      if (
        viewTracked.current
      ) {
        return;
      }


      trackEvent(
        "clarity_check_view",
        {
          game_slug:
            "relationship-check-in",

          role,
        }
      );


      viewTracked.current =
        true;
    },

    [
      role,
    ]
  );


  const submitScore =
    async (
      option:
        ClarityOption
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
            "/api/clarity-check/submit",
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


        /*
         * GA4 only receives structured outcome data.
         * Never send room code or private answers.
         */
        trackEvent(
          "clarity_check_submit",
          {
            game_slug:
              "relationship-check-in",

            role,

            clarity_score:
              option.score,

            clarity_bucket:
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


  const skip =
    () => {
      trackEvent(
        "clarity_check_skip",
        {
          game_slug:
            "relationship-check-in",

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
      <section
        className="clarity-check clarity-check-done"
        aria-label="Clarity check skipped"
      >
        <div className="clarity-check-done-icon">
          ♡
        </div>

        <div>
          <strong>
            No problem
          </strong>

          <p>
            You can leave the check-in
            without answering.
          </p>
        </div>
      </section>
    );
  }


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
        className="clarity-check clarity-check-done"
        aria-label="Clarity check complete"
      >
        <div className="clarity-check-done-icon">
          {
            selected?.emoji ??
            "✨"
          }
        </div>

        <div>
          <strong>
            Thanks for sharing
          </strong>

          <p>
            This helps us learn whether
            the check-in actually gives
            couples more clarity.
          </p>
        </div>
      </section>
    );
  }


  return (
    <section
      className="clarity-check"
      aria-labelledby="clarity-check-title"
    >
      <div className="game-kicker">
        ONE LAST CHECK-IN
      </div>


      <h3
        id="clarity-check-title"
        className="clarity-check-title"
      >
        Compared with before this check-in,
        how clear do you feel about what you
        need from this relationship?
      </h3>


      <p className="clarity-check-subtitle">
        One tap is enough.
        Your answer is private and
        your partner won&apos;t see it.
      </p>


      <div
        className="clarity-check-options"
        role="group"
        aria-label="How clear do you feel after this relationship check-in?"
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

                className="clarity-check-option"

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
                  className="clarity-check-emoji"
                  aria-hidden="true"
                >
                  {
                    option.emoji
                  }
                </span>

                <span className="clarity-check-label">
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
          className="clarity-check-error"
          role="alert"
        >
          {error}
        </p>
      ) : null}


      <button
        type="button"
        className="clarity-check-skip"
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
