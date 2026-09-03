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


/* =========================================================
   Types
========================================================= */

type FeedbackTag =
  | "more_multiplayer_games"
  | "more_questions"
  | "more_funny_questions"
  | "more_deep_questions"
  | "better_chat"
  | "puzzle_game"
  | "confusing"
  | "bug";


type PostGameFeedbackProps = {
  gameSlug:
    | "wyr_multiplayer"
    | "this_or_that"
    | "couple_quiz"
    | "compatibility";

  pagePath: string;
};


/* =========================================================
   Rating Options
========================================================= */

const ratingOptions = [
  {
    value: 1,
    emoji: "😕",
    label: "Not great",
  },
  {
    value: 2,
    emoji: "😐",
    label: "Okay",
  },
  {
    value: 3,
    emoji: "🙂",
    label: "Good",
  },
  {
    value: 4,
    emoji: "❤️",
    label: "Loved it",
  },
];


/* =========================================================
   Feedback Options
========================================================= */

const feedbackOptions: {
  value: FeedbackTag;
  label: string;
}[] = [
  {
    value: "more_multiplayer_games",
    label: "More multiplayer games",
  },
  {
    value: "puzzle_game",
    label: "A puzzle game",
  },
  {
    value: "more_questions",
    label: "More questions",
  },
  {
    value: "more_funny_questions",
    label: "More funny questions",
  },
  {
    value: "more_deep_questions",
    label: "More deep questions",
  },
  {
    value: "better_chat",
    label: "Better chat",
  },
  {
    value: "confusing",
    label: "Something was confusing",
  },
  {
    value: "bug",
    label: "I found a bug",
  },
];


/* =========================================================
   Component

   IMPORTANT:
   This is a DEFAULT EXPORT.

   MultiplayerWouldYouRather.tsx uses:

   import PostGameFeedback
     from "@/components/PostGameFeedback";
========================================================= */

export default function PostGameFeedback({
  gameSlug,
  pagePath,
}: PostGameFeedbackProps) {
  const [
    rating,
    setRating,
  ] =
    useState<number | null>(
      null
    );


  const [
    selectedTags,
    setSelectedTags,
  ] =
    useState<
      FeedbackTag[]
    >([]);


  const [
    comment,
    setComment,
  ] =
    useState("");


  const [
    allowPublic,
    setAllowPublic,
  ] =
    useState(false);


  const [
    busy,
    setBusy,
  ] =
    useState(false);


  const [
    submitted,
    setSubmitted,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  const promptTracked =
    useRef(false);


  /* =======================================================
     Prompt View Analytics
  ======================================================= */

  useEffect(() => {
    if (
      promptTracked.current
    ) {
      return;
    }


    trackEvent(
      "feedback_prompt_view",
      {
        game_name:
          gameSlug,
      }
    );


    promptTracked.current =
      true;
  }, [
    gameSlug,
  ]);


  /* =======================================================
     Rating
  ======================================================= */

  const selectRating = (
    value: number
  ) => {
    setRating(
      value
    );


    setError("");


    trackEvent(
      "feedback_rating_select",
      {
        game_name:
          gameSlug,

        rating:
          value,
      }
    );
  };


  /* =======================================================
     Tags
  ======================================================= */

  const toggleTag = (
    tag: FeedbackTag
  ) => {
    setSelectedTags(
      (
        previous
      ) => {
        if (
          previous.includes(
            tag
          )
        ) {
          return previous.filter(
            (item) =>
              item !== tag
          );
        }


        return [
          ...previous,
          tag,
        ];
      }
    );


    trackEvent(
      "feedback_tag_select",
      {
        game_name:
          gameSlug,

        feedback_tag:
          tag,
      }
    );
  };


  /* =======================================================
     Submit
  ======================================================= */

  const submitFeedback =
    async () => {
      if (
        rating === null
      ) {
        setError(
          "Choose a rating first."
        );

        return;
      }


      if (
        busy
      ) {
        return;
      }


      setBusy(
        true
      );


      setError("");


      try {
        const response =
          await fetch(
            "/api/feedback/submit",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  gameSlug,

                  pagePath,

                  rating,

                  feedbackTags:
                    selectedTags,

                  comment,

                  allowPublic,

                  /*
                   * Honeypot.
                   * Real users leave this empty.
                   */
                  website:
                    "",
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
              "Could not send feedback."
          );
        }


        /*
         * Do NOT send comment
         * contents to GA4.
         */
        trackEvent(
          "feedback_submit",
          {
            game_name:
              gameSlug,

            rating,

            tag_count:
              selectedTags.length,

            allow_public:
              allowPublic,
          }
        );


        setSubmitted(
          true
        );
      } catch (
        submitError
      ) {
        setError(
          submitError instanceof
          Error
            ? submitError.message
            : "Could not send feedback. Please try again."
        );
      } finally {
        setBusy(
          false
        );
      }
    };


  /* =======================================================
     Submitted
  ======================================================= */

  if (
    submitted
  ) {
    return (
      <section className="feedback-card feedback-success">

        <div className="feedback-heart">
          ♥
        </div>


        <div className="game-kicker">
          THANK YOU
        </div>


        <h2>
          You Just Helped Shape TwoLumi
        </h2>


        <p>
          We read the feedback couples
          send us and use it to decide
          what to improve or build next.
        </p>


        <div className="feedback-next-links">

          <Link
            href="/games"
            className="btn-primary"
          >
            Explore More Games
          </Link>


          <Link
            href="/long-distance-date-ideas"
            className="btn-secondary"
          >
            Try a Date Idea
          </Link>

        </div>

      </section>
    );
  }


  /* =======================================================
     Form
  ======================================================= */

  return (
    <section className="feedback-card">

      <div className="game-kicker">
        QUICK FEEDBACK
      </div>


      <h2>
        How Was This Game?
      </h2>


      <p className="feedback-intro">
        Your feedback helps us decide
        what to improve and what couple
        game to build next.
      </p>


      {/* ===================================================
          Rating
      =================================================== */}

      <div className="feedback-rating-grid">

        {ratingOptions.map(
          (
            option
          ) => {
            const selected =
              rating ===
              option.value;


            return (
              <button
                key={
                  option.value
                }
                type="button"
                className={`feedback-rating ${
                  selected
                    ? "is-selected"
                    : ""
                }`}
                aria-pressed={
                  selected
                }
                onClick={() =>
                  selectRating(
                    option.value
                  )
                }
              >

                <span
                  className="feedback-rating-emoji"
                  aria-hidden="true"
                >
                  {
                    option.emoji
                  }
                </span>


                <span>
                  {
                    option.label
                  }
                </span>

              </button>
            );
          }
        )}

      </div>


      {/* ===================================================
          Expanded Feedback
      =================================================== */}

      {rating !== null ? (
        <>

          <div className="feedback-block">

            <h3>
              What Would Make It Better?
            </h3>


            <p>
              Pick anything that applies.
            </p>


            <div className="feedback-tag-grid">

              {feedbackOptions.map(
                (
                  option
                ) => {
                  const selected =
                    selectedTags.includes(
                      option.value
                    );


                  return (
                    <button
                      key={
                        option.value
                      }
                      type="button"
                      className={`feedback-tag ${
                        selected
                          ? "is-selected"
                          : ""
                      }`}
                      aria-pressed={
                        selected
                      }
                      onClick={() =>
                        toggleTag(
                          option.value
                        )
                      }
                    >
                      {
                        option.label
                      }
                    </button>
                  );
                }
              )}

            </div>

          </div>


          {/* =================================================
              Comment
          ================================================= */}

          <div className="feedback-block">

            <label
              htmlFor="feedback-comment"
              className="feedback-label"
            >
              Anything else?

              <span>
                Optional
              </span>
            </label>


            <textarea
              id="feedback-comment"
              className="feedback-textarea"
              value={
                comment
              }
              maxLength={
                1000
              }
              rows={
                4
              }
              placeholder="Tell us what you liked, what felt confusing, or what you wish you could play together..."
              onChange={(
                event
              ) =>
                setComment(
                  event.target
                    .value
                )
              }
            />


            <div className="feedback-character-count">
              {
                comment.length
              }
              /1000
            </div>

          </div>


          {/* =================================================
              Public Permission
          ================================================= */}

          <label className="feedback-public-option">

            <input
              type="checkbox"
              checked={
                allowPublic
              }
              onChange={(
                event
              ) =>
                setAllowPublic(
                  event.target
                    .checked
                )
              }
            />


            <span>
              You may feature this
              feedback anonymously on
              TwoLumi.
            </span>

          </label>


          {/* =================================================
              Error
          ================================================= */}

          {error ? (
            <p
              className="feedback-error"
              role="alert"
            >
              {error}
            </p>
          ) : null}


          {/* =================================================
              Submit
          ================================================= */}

          <button
            type="button"
            className="btn-primary feedback-submit"
            disabled={
              busy
            }
            onClick={
              submitFeedback
            }
          >
            {busy
              ? "Sending..."
              : "Send Feedback"}
          </button>


          <p className="feedback-privacy-note">
            Please do not include
            sensitive or personally
            identifying information.{" "}

            <Link
              href="/privacy"
            >
              Privacy Policy
            </Link>
          </p>

        </>
      ) : null}

    </section>
  );
}