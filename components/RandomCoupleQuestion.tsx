"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  coupleQuestions,
  coupleQuestionCategoryOrder,
  coupleQuestionCategoryLabels,
  type CoupleQuestion,
  type CoupleQuestionCategory,
} from "@/data/coupleQuestions";

import {
  trackEvent,
} from "@/lib/analytics";

/* =========================================================
   Filter Type
========================================================= */

type QuestionFilter =
  | "all"
  | CoupleQuestionCategory;

/* =========================================================
   Pick Random Question
========================================================= */

function pickRandomQuestion(
  questions: CoupleQuestion[],
  currentQuestionId?: number
) {
  if (
    questions.length ===
    0
  ) {
    return null;
  }

  /*
   * 如果只有一道题，
   * 没必要做避免重复逻辑。
   */
  if (
    questions.length ===
    1
  ) {
    return questions[0];
  }

  /*
   * 尽量避免连续出现同一道题。
   */
  const availableQuestions =
    currentQuestionId
      ? questions.filter(
          (question) =>
            question.id !==
            currentQuestionId
        )
      : questions;

  const randomIndex =
    Math.floor(
      Math.random() *
        availableQuestions.length
    );

  return (
    availableQuestions[
      randomIndex
    ] ?? null
  );
}

/* =========================================================
   Component
========================================================= */

export default function RandomCoupleQuestion() {
  /* =======================================================
     Selected Category
  ======================================================= */

  const [
    selectedCategory,
    setSelectedCategory,
  ] =
    useState<QuestionFilter>(
      "all"
    );

  /* =======================================================
     Current Question
  ======================================================= */

  const [
    currentQuestion,
    setCurrentQuestion,
  ] =
    useState<CoupleQuestion>(
      coupleQuestions[0]
    );

  /* =======================================================
     Mounted
     Avoid hydration mismatch from random selection
  ======================================================= */

  const [
    mounted,
    setMounted,
  ] =
    useState(false);

  /* =======================================================
     Filtered Questions
  ======================================================= */

  const filteredQuestions =
    useMemo(
      () => {
        if (
          selectedCategory ===
          "all"
        ) {
          return coupleQuestions;
        }

        return coupleQuestions.filter(
          (question) =>
            question.category ===
            selectedCategory
        );
      },
      [
        selectedCategory,
      ]
    );

  /* =======================================================
     Pick Initial Random Question
     Only after hydration
  ======================================================= */

  useEffect(
    () => {
      setMounted(
        true
      );

      const firstRandomQuestion =
        pickRandomQuestion(
          coupleQuestions
        );

      if (
        firstRandomQuestion
      ) {
        setCurrentQuestion(
          firstRandomQuestion
        );
      }
    },
    []
  );

  /* =======================================================
     Next Question

     Analytics:
     couple_questions_next

     Parameter:
     question_category
  ======================================================= */

  function showNextQuestion() {
    trackEvent(
      "couple_questions_next",
      {
        question_category:
          selectedCategory,
      }
    );

    const nextQuestion =
      pickRandomQuestion(
        filteredQuestions,
        currentQuestion.id
      );

    if (
      nextQuestion
    ) {
      setCurrentQuestion(
        nextQuestion
      );
    }
  }

  /* =======================================================
     Change Category

     Analytics:
     couple_questions_category

     Parameter:
     question_category
  ======================================================= */

  function changeCategory(
    category:
      QuestionFilter
  ) {
    /*
     * 如果用户点击的就是当前分类，
     * 不重复发送 Analytics。
     */
    if (
      category !==
      selectedCategory
    ) {
      trackEvent(
        "couple_questions_category",
        {
          question_category:
            category,
        }
      );
    }

    setSelectedCategory(
      category
    );

    const nextPool =
      category ===
      "all"
        ? coupleQuestions
        : coupleQuestions.filter(
            (question) =>
              question.category ===
              category
          );

    const nextQuestion =
      pickRandomQuestion(
        nextPool,
        currentQuestion.id
      );

    if (
      nextQuestion
    ) {
      setCurrentQuestion(
        nextQuestion
      );
    }
  }

  /* =======================================================
     Question Category Label
  ======================================================= */

  const currentCategoryLabel =
    coupleQuestionCategoryLabels[
      currentQuestion.category
    ];

  /* =======================================================
     Render
  ======================================================= */

  return (
    <section
      className="couple-question-game"
      aria-label="Random couple question game"
    >

      {/* ===================================================
          Compact Toolbar
      =================================================== */}

      <div className="couple-question-game-toolbar">

        <div>

          <div className="game-kicker">
            Couple Question Game
          </div>

          <span>
            Pick a category or
            surprise each other.
          </span>

        </div>

        <strong>
          100 Questions
        </strong>

      </div>

      {/* ===================================================
          Category Filters
      =================================================== */}

      <div
        className="couple-question-filters"
        aria-label="Question categories"
      >

        <button
          type="button"
          className={
            selectedCategory ===
            "all"
              ? "couple-question-filter couple-question-filter-active"
              : "couple-question-filter"
          }
          onClick={() =>
            changeCategory(
              "all"
            )
          }
        >
          All
        </button>

        {coupleQuestionCategoryOrder.map(
          (category) => (
            <button
              key={
                category
              }
              type="button"
              className={
                selectedCategory ===
                category
                  ? "couple-question-filter couple-question-filter-active"
                  : "couple-question-filter"
              }
              onClick={() =>
                changeCategory(
                  category
                )
              }
            >
              {
                coupleQuestionCategoryLabels[
                  category
                ]
              }
            </button>
          )
        )}

      </div>

      {/* ===================================================
          Question Card
      =================================================== */}

      <div className="couple-question-random-card">

        <div className="couple-question-random-meta">

          <span className="couple-question-random-category">
            {
              currentCategoryLabel
            }
          </span>

          <span>
            Question{" "}
            {
              currentQuestion.id
            }{" "}
            of 100
          </span>

        </div>

        <div
          className="couple-question-random-mark"
          aria-hidden="true"
        >
          ?
        </div>

        <p
          className="couple-question-random-text"
          aria-live={
            mounted
              ? "polite"
              : "off"
          }
        >
          {
            currentQuestion.question
          }
        </p>

        <div className="couple-question-random-actions">

          <button
            type="button"
            className="btn-primary couple-question-next-button"
            onClick={
              showNextQuestion
            }
          >
            Next Question →
          </button>

        </div>

        <p className="couple-question-random-note">
          Take turns answering. If
          something surprises you,
          ask a follow-up question
          before moving on.
        </p>

      </div>

    </section>
  );
}