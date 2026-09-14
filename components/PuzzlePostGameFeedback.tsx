"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  trackEvent,
} from "@/lib/analytics";


const TAGS = [
  {
    key:
      "more_puzzles",
    label:
      "More puzzles",
  },

  {
    key:
      "more_multiplayer_games",
    label:
      "More multiplayer games",
  },

  {
    key:
      "puzzle_too_easy",
    label:
      "Too easy",
  },

  {
    key:
      "puzzle_too_hard",
    label:
      "Too hard",
  },

  {
    key:
      "better_chat",
    label:
      "Better chat",
  },

  {
    key:
      "confusing",
    label:
      "Something was confusing",
  },

  {
    key:
      "bug",
    label:
      "I found a bug",
  },
];


const RATINGS = [
  {
    value: 1,
    emoji: "😕",
    label: "Not for me",
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
    emoji: "😍",
    label: "Loved it",
  },
];


export default function PuzzlePostGameFeedback() {
  const [
    rating,
    setRating,
  ] =
    useState<
      number |
      null
    >(
      null
    );


  const [
    selectedTags,
    setSelectedTags,
  ] =
    useState<
      string[]
    >(
      []
    );


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
    sent,
    setSent,
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
        "feedback_prompt_view",
        {
          game_slug:
            "couple_puzzle",
        }
      );


      viewTracked.current =
        true;
    },
    []
  );


  const toggleTag =
    (
      tag:
        string
    ) => {
      setSelectedTags(
        (
          previous
        ) => {
          const selected =
            previous.includes(
              tag
            );


          trackEvent(
            "feedback_tag_select",
            {
              game_slug:
                "couple_puzzle",

              feedback_tag:
                tag,

              selected:
                !selected,
            }
          );


          return selected
            ? previous.filter(
                (
                  item
                ) =>
                  item !==
                  tag
              )
            : [
                ...previous,
                tag,
              ];
        }
      );
    };


  const chooseRating =
    (
      value:
        number
    ) => {
      setRating(
        value
      );


      trackEvent(
        "feedback_rating_select",
        {
          game_slug:
            "couple_puzzle",

          rating:
            value,
        }
      );
    };


  const submit =
    async () => {
      if (
        rating ===
          null ||
        busy
      ) {
        return;
      }


      setBusy(
        true
      );


      setError(
        ""
      );


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
                  gameSlug:
                    "couple_puzzle",

                  pagePath:
                    "/room/[code]",

                  rating,

                  feedbackTags:
                    selectedTags,

                  comment,

                  allowPublic,

                  website:
                    "",
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
              "Could not send feedback."
          );
        }


        trackEvent(
          "feedback_submit",
          {
            game_slug:
              "couple_puzzle",

            rating,

            tag_count:
              selectedTags.length,

            allow_public:
              allowPublic,
          }
        );


        setSent(
          true
        );

      } catch (
        submitError
      ) {
        setError(
          submitError instanceof
            Error
            ? submitError.message
            : "Could not send feedback."
        );

      } finally {
        setBusy(
          false
        );
      }
    };


  if (
    sent
  ) {
    return (
      <section className="feedback-card feedback-success">

        <div className="feedback-heart">
          ♥
        </div>

        <h2>
          Thanks for helping us improve
        </h2>

        <p>
          Your feedback will help us decide
          what kind of multiplayer activity
          to build next.
        </p>

      </section>
    );
  }


  return (
    <section className="feedback-card">

      <div className="game-kicker">
        QUICK FEEDBACK
      </div>


      <h2>
        How was Couple Puzzle?
      </h2>


      <div className="feedback-rating-grid">

        {RATINGS.map(
          (
            item
          ) => (
            <button
              key={
                item.value
              }

              type="button"

              className={`feedback-rating ${
                rating ===
                item.value
                  ? "is-selected"
                  : ""
              }`}

              onClick={() =>
                chooseRating(
                  item.value
                )
              }
            >

              <span className="feedback-rating-emoji">
                {
                  item.emoji
                }
              </span>

              <span>
                {
                  item.label
                }
              </span>

            </button>
          )
        )}

      </div>


      <div className="feedback-block">

        <h3>
          What would make it better?
        </h3>

        <p>
          Choose any that fit.
        </p>


        <div className="feedback-tag-grid">

          {TAGS.map(
            (
              item
            ) => (
              <button
                key={
                  item.key
                }

                type="button"

                className={`feedback-tag ${
                  selectedTags.includes(
                    item.key
                  )
                    ? "is-selected"
                    : ""
                }`}

                onClick={() =>
                  toggleTag(
                    item.key
                  )
                }
              >
                {
                  item.label
                }
              </button>
            )
          )}

        </div>

      </div>


      <div className="feedback-block">

        <label className="feedback-label">
          Anything else?

          <span>
            Optional
          </span>
        </label>


        <textarea
          className="feedback-textarea"
          maxLength={
            1000
          }
          value={
            comment
          }
          onChange={
            (
              event
            ) =>
              setComment(
                event.target
                  .value
              )
          }
          placeholder="Tell us what you liked, what felt confusing, or what kind of puzzle you want next."
        />


        <div className="feedback-character-count">
          {comment.length} / 1000
        </div>

      </div>


      <label className="feedback-public-option">

        <input
          type="checkbox"
          checked={
            allowPublic
          }
          onChange={
            (
              event
            ) =>
              setAllowPublic(
                event.target
                  .checked
              )
          }
        />

        <span>
          You may quote this feedback
          publicly without identifying me.
        </span>

      </label>


      {error ? (
        <p className="feedback-error">
          {error}
        </p>
      ) : null}


      <button
        type="button"
        className="btn-primary feedback-submit"
        disabled={
          rating ===
            null ||
          busy
        }
        onClick={
          submit
        }
      >
        {busy
          ? "Sending…"
          : "Send Feedback"}
      </button>


      <p className="feedback-privacy-note">
        Your comment stays in TwoLumi&apos;s
        feedback database and is not sent
        to Google Analytics.
      </p>

    </section>
  );
}
