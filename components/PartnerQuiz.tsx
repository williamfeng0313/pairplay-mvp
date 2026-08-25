"use client";

import {
  useState,
} from "react";

import {
  partnerQuizQuestions,
  partnerQuizCategoryLabels,
  type PartnerQuizOptionValue,
} from "@/data/partnerQuizQuestions";

import {
  calculatePartnerQuizResult,
  type PartnerQuizAnswers,
  type PartnerQuizResult,
} from "@/lib/partnerQuizScore";

import PartnerQuizResults from "@/components/PartnerQuizResults";

/* ==============================
   Stages
============================== */

type QuizStage =
  | "intro"
  | "predict"
  | "handoff"
  | "partner"
  | "results";

/* ==============================
   Constants
============================== */

const QUESTION_COUNT =
  partnerQuizQuestions.length;

/* ==============================
   Empty Answers
============================== */

function createEmptyAnswers() {
  return Array<
    PartnerQuizOptionValue | null
  >(
    QUESTION_COUNT
  ).fill(
    null
  );
}

/* ==============================
   Component
============================== */

export default function PartnerQuiz() {
  /* ==============================
     Stage
  ============================== */

  const [
    stage,
    setStage,
  ] =
    useState<QuizStage>(
      "intro"
    );

  /* ==============================
     Current Question
  ============================== */

  const [
    currentIndex,
    setCurrentIndex,
  ] =
    useState(0);

  /* ==============================
     Predictions
  ============================== */

  const [
    predictions,
    setPredictions,
  ] =
    useState<
      (
        | PartnerQuizOptionValue
        | null
      )[]
    >(
      createEmptyAnswers
    );

  /* ==============================
     Partner Actual Answers
  ============================== */

  const [
    partnerAnswers,
    setPartnerAnswers,
  ] =
    useState<
      (
        | PartnerQuizOptionValue
        | null
      )[]
    >(
      createEmptyAnswers
    );

  /* ==============================
     Result
  ============================== */

  const [
    result,
    setResult,
  ] =
    useState<
      PartnerQuizResult | null
    >(
      null
    );

  /* ==============================
     Current Question
  ============================== */

  const question =
    partnerQuizQuestions[
      currentIndex
    ];

  const activeAnswers =
    stage ===
    "predict"
      ? predictions
      : partnerAnswers;

  const currentAnswer =
    activeAnswers[
      currentIndex
    ];

  const progress =
    Math.round(
      (
        (
          currentIndex +
          1
        ) /
        QUESTION_COUNT
      ) *
        100
    );

  const categoryLabel =
    question
      ? partnerQuizCategoryLabels[
          question
            .category
        ]
      : "";

  /* ==============================
     Scroll Helper
  ============================== */

  function scrollToQuiz() {
    window.setTimeout(
      () => {
        document
          .getElementById(
            "partner-quiz"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "start",
          });
      },
      50
    );
  }

  /* ==============================
     Start Quiz
  ============================== */

  function startQuiz() {
    setCurrentIndex(
      0
    );

    setStage(
      "predict"
    );

    scrollToQuiz();
  }

  /* ==============================
     Answer Question
  ============================== */

  function answerQuestion(
    value:
      PartnerQuizOptionValue
  ) {
    if (
      stage !==
        "predict" &&
      stage !==
        "partner"
    ) {
      return;
    }

    /* ==============================
       Prediction Round
    ============================== */

    if (
      stage ===
      "predict"
    ) {
      const nextPredictions =
        [
          ...predictions,
        ];

      nextPredictions[
        currentIndex
      ] =
        value;

      setPredictions(
        nextPredictions
      );

      /*
       * Not last question
       */
      if (
        currentIndex <
        QUESTION_COUNT -
          1
      ) {
        setCurrentIndex(
          (
            previous
          ) =>
            previous +
            1
        );

        return;
      }

      /*
       * Prediction round complete.
       */
      setCurrentIndex(
        0
      );

      setStage(
        "handoff"
      );

      scrollToQuiz();

      return;
    }

    /* ==============================
       Partner Answer Round
    ============================== */

    const nextPartnerAnswers =
      [
        ...partnerAnswers,
      ];

    nextPartnerAnswers[
      currentIndex
    ] =
      value;

    setPartnerAnswers(
      nextPartnerAnswers
    );

    /*
     * Not last question
     */
    if (
      currentIndex <
      QUESTION_COUNT -
        1
    ) {
      setCurrentIndex(
        (
          previous
        ) =>
          previous +
          1
      );

      return;
    }

    /*
     * Partner answered question 20.
     *
     * IMPORTANT:
     *
     * Use nextPartnerAnswers instead
     * of partnerAnswers because
     * React state updates are async.
     */

    const finalResult =
      calculatePartnerQuizResult(
        predictions as
          PartnerQuizAnswers,

        nextPartnerAnswers as
          PartnerQuizAnswers
      );

    setResult(
      finalResult
    );

    setStage(
      "results"
    );

    scrollToQuiz();
  }

  /* ==============================
     Back
  ============================== */

  function goBack() {
    if (
      currentIndex <=
      0
    ) {
      return;
    }

    setCurrentIndex(
      (
        previous
      ) =>
        previous -
        1
    );
  }

  /* ==============================
     Start Partner Round
  ============================== */

  function startPartnerRound() {
    setCurrentIndex(
      0
    );

    setStage(
      "partner"
    );

    scrollToQuiz();
  }

  /* ==============================
     Restart
  ============================== */

  function restartQuiz() {
    setStage(
      "intro"
    );

    setCurrentIndex(
      0
    );

    setPredictions(
      createEmptyAnswers()
    );

    setPartnerAnswers(
      createEmptyAnswers()
    );

    setResult(
      null
    );

    scrollToQuiz();
  }

  /* ==============================
     Intro
  ============================== */

  if (
    stage ===
    "intro"
  ) {
    return (
      <section
        id="partner-quiz"
        className="partner-quiz"
      >

        <div className="partner-quiz-intro-card">

          {/* ==============================
              Left
          ============================== */}

          <div className="partner-quiz-intro-main">

            <div className="game-kicker">
              Think You Know Them?
            </div>

            <h2>
              How Well Do You Know Your Partner?
            </h2>

            <p>
              First, predict how your
              partner will answer 20
              questions. Then pass
              them the device so they
              can answer for
              themselves.
            </p>

          </div>

          {/* ==============================
              Right
          ============================== */}

          <div className="partner-quiz-intro-action">

            <div className="partner-quiz-intro-stats">

              <span>

                <strong>
                  20
                </strong>

                Questions

              </span>

              <span>

                <strong>
                  5
                </strong>

                Categories

              </span>

              <span>

                <strong>
                  ≈5 min
                </strong>

                To finish

              </span>

              <span>

                <strong>
                  Free
                </strong>

                No signup

              </span>

            </div>

            <button
              type="button"
              className="btn-primary partner-quiz-start-button"
              onClick={
                startQuiz
              }
            >
              Start Partner Quiz →
            </button>

            <p className="partner-quiz-intro-note">
              Your predictions stay
              hidden until your
              partner finishes.
            </p>

          </div>

        </div>

      </section>
    );
  }

  /* ==============================
     Handoff
  ============================== */

  if (
    stage ===
    "handoff"
  ) {
    return (
      <section
        id="partner-quiz"
        className="partner-quiz"
      >

        <div className="partner-quiz-handoff-card">

          <div className="partner-quiz-complete-icon">
            ✓
          </div>

          <div className="game-kicker">
            Predictions Complete
          </div>

          <h2>
            Pass the Device
          </h2>

          <p>
            All 20 predictions are
            saved and hidden.
          </p>

          <div className="partner-quiz-handoff-message">

            <strong>
              Partner&apos;s turn
            </strong>

            <span>
              Answer each question
              based on what you
              genuinely prefer.
              There are no right or
              wrong answers.
            </span>

          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={
              startPartnerRound
            }
          >
            Start Partner&apos;s Answers →
          </button>

        </div>

      </section>
    );
  }

  /* ==============================
     Results
  ============================== */

  if (
    stage ===
      "results" &&
    result
  ) {
    return (
      <section
        id="partner-quiz"
        className="partner-quiz"
      >

        <PartnerQuizResults
          result={
            result
          }
          onRestart={
            restartQuiz
          }
        />

      </section>
    );
  }

  /* ==============================
     Safety
  ============================== */

  if (!question) {
    return null;
  }

  /* ==============================
     Question Mode
  ============================== */

  const isPredictionRound =
    stage ===
    "predict";

  const questionPrompt =
    isPredictionRound
      ? question
          .predictionPrompt
      : question
          .partnerPrompt;

  return (
    <section
      id="partner-quiz"
      className="partner-quiz"
    >

      <div className="partner-quiz-question-card">

        {/* ==============================
            Progress Header
        ============================== */}

        <div className="partner-quiz-progress-header">

          <div>

            <div className="game-kicker">

              {
                isPredictionRound
                  ? "Your Prediction"
                  : "Partner's Answer"
              }

            </div>

            <strong>
              Question{" "}
              {
                currentIndex +
                1
              }{" "}
              of{" "}
              {
                QUESTION_COUNT
              }
            </strong>

          </div>

          <span className="partner-quiz-category-badge">
            {
              categoryLabel
            }
          </span>

        </div>

        {/* ==============================
            Progress Bar
        ============================== */}

        <div className="partner-quiz-progress-track">

          <div
            className="partner-quiz-progress-fill"
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

        {/* ==============================
            Instruction
        ============================== */}

        <p className="partner-quiz-round-note">

          {
            isPredictionRound
              ? "Choose the answer you think your partner would pick."
              : "Choose the answer that best matches what you would really pick."
          }

        </p>

        {/* ==============================
            Question
        ============================== */}

        <h2 className="partner-quiz-question-title">
          {
            questionPrompt
          }
        </h2>

        {/* ==============================
            Options
        ============================== */}

        <div className="partner-quiz-options">

          {question.options.map(
            (
              option
            ) => (
              <button
                key={
                  option.value
                }
                type="button"
                className={`partner-quiz-option ${
                  currentAnswer ===
                  option.value
                    ? "partner-quiz-option-selected"
                    : ""
                }`}
                onClick={() =>
                  answerQuestion(
                    option.value
                  )
                }
              >

                <span className="partner-quiz-option-letter">
                  {
                    String.fromCharCode(
                      65 +
                        option.value
                    )
                  }
                </span>

                <span>
                  {
                    option.label
                  }
                </span>

              </button>
            )
          )}

        </div>

        {/* ==============================
            Footer
        ============================== */}

        <div className="partner-quiz-question-footer">

          <button
            type="button"
            className="partner-quiz-back-button"
            disabled={
              currentIndex ===
              0
            }
            onClick={
              goBack
            }
          >
            ← Back
          </button>

          <span>

            {
              isPredictionRound
                ? "Try to answer before overthinking it."
                : "Answer honestly — your partner's prediction is hidden."
            }

          </span>

        </div>

      </div>

    </section>
  );
}