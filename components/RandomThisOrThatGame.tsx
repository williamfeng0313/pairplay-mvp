"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  thisOrThatQuestions,
  thisOrThatCategoryLabels,
  type ThisOrThatQuestion,
} from "@/data/thisOrThatQuestions";

import {
  trackEvent,
} from "@/lib/analytics";

type Choice =
  | "left"
  | "right";

const ROUND_SIZE =
  18;

function shuffleQuestions(
  questions:
    ThisOrThatQuestion[]
) {
  const copy =
    [...questions];

  for (
    let i =
      copy.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() *
          (i + 1)
      );

    [
      copy[i],
      copy[j],
    ] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

function createRound() {
  return shuffleQuestions(
    thisOrThatQuestions
  ).slice(
    0,
    ROUND_SIZE
  );
}

export default function RandomThisOrThatGame() {
  const [
    round,
    setRound,
  ] =
    useState<
      ThisOrThatQuestion[]
    >([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] =
    useState(0);

  const [
    selected,
    setSelected,
  ] =
    useState<
      Choice | null
    >(null);

  const [
    completed,
    setCompleted,
  ] =
    useState(false);

  const [
    started,
    setStarted,
  ] =
    useState(false);

  /*
   * 客户端加载以后再随机。
   *
   * 避免服务器和浏览器
   * Math.random() 不一致造成
   * hydration mismatch。
   */
  useEffect(
    () => {
      setRound(
        createRound()
      );
    },
    []
  );

  /* ==============================
     Loading
  ============================== */

  if (
    round.length ===
    0
  ) {
    return (
      <section className="tot-game">

        <div className="tot-game-card tot-game-loading">
          Loading your questions...
        </div>

      </section>
    );
  }

  /* ==============================
     Completed
  ============================== */

  if (
    completed
  ) {
    return (
      <section
        className="tot-game"
        id="quick-this-or-that"
      >

        <div className="tot-complete-card">

          <div className="tot-complete-icon">
            ✓
          </div>

          <div className="game-kicker">
            Round Complete
          </div>

          <h2>
            You Finished 18 Questions
          </h2>

          <p>
            Found a few choices you
            disagreed on? Those are
            usually the most
            interesting ones to talk
            about.
          </p>

          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              trackEvent(
                "tot_shuffle"
              );

              setRound(
                createRound()
              );

              setCurrentIndex(
                0
              );

              setSelected(
                null
              );

              setCompleted(
                false
              );

              setStarted(
                false
              );
            }}
          >
            Play 18 New Questions →
          </button>

          <a
            href="#all-this-or-that-questions"
            className="tot-browse-link"
          >
            Browse all 80 questions
          </a>

        </div>

      </section>
    );
  }

  const question =
    round[
      currentIndex
    ];

  const progress =
    Math.round(
      (
        (
          currentIndex +
          1
        ) /
        ROUND_SIZE
      ) *
        100
    );

  function choose(
    choice:
      Choice
  ) {
    if (
      !started
    ) {
      trackEvent(
        "tot_start"
      );

      setStarted(
        true
      );
    }

    setSelected(
      choice
    );
  }

  function nextQuestion() {
    if (
      !selected
    ) {
      return;
    }

    if (
      currentIndex ===
      ROUND_SIZE - 1
    ) {
      trackEvent(
        "tot_round_complete",
        {
          questions:
            ROUND_SIZE,
        }
      );

      setCompleted(
        true
      );

      return;
    }

    setCurrentIndex(
      (
        previous
      ) =>
        previous + 1
    );

    setSelected(
      null
    );
  }

  function shuffleRound() {
    trackEvent(
      "tot_shuffle"
    );

    setRound(
      createRound()
    );

    setCurrentIndex(
      0
    );

    setSelected(
      null
    );

    setCompleted(
      false
    );

    setStarted(
      false
    );
  }

  return (
    <section
      className="tot-game"
      id="quick-this-or-that"
    >

<div className="tot-game-heading tot-game-heading-compact">

        <div>

        <div className="game-kicker">
            Quick Game
        </div>

        <h2>
            Play 18 Random This or That Questions
        </h2>

        <p>
            Pick one, compare answers,
            then move to the next question.
        </p>

        </div>

        <button
        type="button"
        className="tot-shuffle-button"
        onClick={
            shuffleRound
        }
        >
        ↻ Shuffle
        </button>

        </div>

      <div className="tot-game-card">

        <div className="tot-game-progress-header">

          <span>
            Question{" "}
            {
              currentIndex +
              1
            }{" "}
            of{" "}
            {
              ROUND_SIZE
            }
          </span>

          <span>
            {
              thisOrThatCategoryLabels[
                question
                  .category
              ]
            }
          </span>

        </div>

        <div className="tot-progress-track">

          <div
            className="tot-progress-fill"
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

        <h3>
          This or That?
        </h3>

        <div className="tot-choice-grid">

          <button
            type="button"
            className={`tot-choice ${
              selected ===
              "left"
                ? "tot-choice-selected"
                : ""
            }`}
            onClick={() =>
              choose(
                "left"
              )
            }
          >

            <span className="tot-choice-letter">
              A
            </span>

            <strong>
              {
                question.left
              }
            </strong>

          </button>

          <div className="tot-or">
            OR
          </div>

          <button
            type="button"
            className={`tot-choice ${
              selected ===
              "right"
                ? "tot-choice-selected"
                : ""
            }`}
            onClick={() =>
              choose(
                "right"
              )
            }
          >

            <span className="tot-choice-letter">
              B
            </span>

            <strong>
              {
                question.right
              }
            </strong>

          </button>

        </div>

        <div className="tot-game-footer">

          <p>
            {
              selected
                ? "Compare your choice with your partner before moving on."
                : "Choose the option that feels more like you."
            }
          </p>

          <button
            type="button"
            className="btn-primary"
            disabled={
              !selected
            }
            onClick={
              nextQuestion
            }
          >
            {
              currentIndex ===
              ROUND_SIZE - 1
                ? "Finish Round →"
                : "Next Question →"
            }
          </button>

        </div>

      </div>

    </section>
  );
}