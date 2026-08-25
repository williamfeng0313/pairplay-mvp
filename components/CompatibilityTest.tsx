"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  compatibilityQuestions,
  compatibilityCategoryLabels,
  type CompatibilityOptionValue,
} from "@/data/compatibilityQuestions";

import {
  calculateCompatibilityResult,
  type CompatibilityAnswers,
  type CompatibilityResult,
} from "@/lib/compatibilityScore";

import CompatibilityResults from "@/components/CompatibilityResults";

type TestStage =
  | "intro"
  | "partnerA"
  | "handoff"
  | "partnerB"
  | "results";

const QUESTION_COUNT =
  compatibilityQuestions.length;

function createEmptyAnswers() {
  return Array<
    CompatibilityOptionValue | null
  >(
    QUESTION_COUNT
  ).fill(
    null
  );
}

export default function CompatibilityTest() {
  const [
    stage,
    setStage,
  ] =
    useState<TestStage>(
      "intro"
    );

  const [
    currentIndex,
    setCurrentIndex,
  ] =
    useState(0);

  const [
    partnerAAnswers,
    setPartnerAAnswers,
  ] =
    useState<
      (
        | CompatibilityOptionValue
        | null
      )[]
    >(
      createEmptyAnswers
    );

  const [
    partnerBAnswers,
    setPartnerBAnswers,
  ] =
    useState<
      (
        | CompatibilityOptionValue
        | null
      )[]
    >(
      createEmptyAnswers
    );

  const [
    result,
    setResult,
  ] =
    useState<
      CompatibilityResult | null
    >(null);

  const question =
    compatibilityQuestions[
      currentIndex
    ];

  const activeAnswers =
    stage ===
    "partnerA"
      ? partnerAAnswers
      : partnerBAnswers;

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

  const partnerLabel =
    stage ===
    "partnerA"
      ? "Partner A"
      : "Partner B";

  /*
   * 当前分类名称
   */
  const categoryLabel =
    useMemo(
      () =>
        question
          ? compatibilityCategoryLabels[
              question
                .category
            ]
          : "",
      [
        question,
      ]
    );

  // ==============================
  // Start Partner A
  // ==============================

  const startTest =
    () => {
      setCurrentIndex(
        0
      );

      setStage(
        "partnerA"
      );
    };

  // ==============================
  // Answer Question
  // ==============================

  const answerQuestion =
    (
      value:
        CompatibilityOptionValue
    ) => {
      if (
        stage !==
          "partnerA" &&
        stage !==
          "partnerB"
      ) {
        return;
      }

      /*
       * Partner A
       */
      if (
        stage ===
        "partnerA"
      ) {
        const nextAnswers =
          [
            ...partnerAAnswers,
          ];

        nextAnswers[
          currentIndex
        ] =
          value;

        setPartnerAAnswers(
          nextAnswers
        );

        /*
         * 不是最后一题
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
         * Partner A完成
         */
        setCurrentIndex(
          0
        );

        setStage(
          "handoff"
        );

        return;
      }

      /*
       * Partner B
       */
      const nextAnswers =
        [
          ...partnerBAnswers,
        ];

      nextAnswers[
        currentIndex
      ] =
        value;

      setPartnerBAnswers(
        nextAnswers
      );

      /*
       * 不是最后一题
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
       * Partner B完成
       *
       * 注意必须使用 nextAnswers，
       * 不能直接使用旧的
       * partnerBAnswers state，
       * 否则最后一题还没写进去。
       */
      const finalResult =
        calculateCompatibilityResult(
          partnerAAnswers as
            CompatibilityAnswers,

          nextAnswers as
            CompatibilityAnswers
        );

      setResult(
        finalResult
      );

      setStage(
        "results"
      );

      window.setTimeout(
        () => {
          document
            .getElementById(
              "compatibility-test"
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
    };

  // ==============================
  // Back
  // ==============================

  const goBack =
    () => {
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
    };

  // ==============================
  // Start Partner B
  // ==============================

  const startPartnerB =
    () => {
      setCurrentIndex(
        0
      );

      setStage(
        "partnerB"
      );

      window.setTimeout(
        () => {
          document
            .getElementById(
              "compatibility-test"
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
    };

  // ==============================
  // Restart
  // ==============================

  const restart =
    () => {
      setStage(
        "intro"
      );

      setCurrentIndex(
        0
      );

      setPartnerAAnswers(
        createEmptyAnswers()
      );

      setPartnerBAnswers(
        createEmptyAnswers()
      );

      setResult(
        null
      );

      window.setTimeout(
        () => {
          document
            .getElementById(
              "compatibility-test"
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
    };

  // ==============================
  // Intro
  // ==============================

  if (
    stage ===
    "intro"
  ) {
    return (
      <section
        id="compatibility-test"
        className="compat-test"
      >
       <div className="compat-intro-card compat-intro-card-compact">

{/* Left side */}

<div className="compat-intro-main">

  <div className="game-kicker">
    Ready to Compare?
  </div>

  <h2>
    Are We Compatible?
  </h2>

  <p>
    Answer the same 20 questions separately,
    then compare how closely your preferences
    match across everyday life, future plans,
    habits, and connection.
  </p>

</div>

{/* Right side */}

<div className="compat-intro-action">

  <div className="compat-intro-stats">

    <span>
      <strong>20</strong>
      Questions
    </span>

    <span>
      <strong>4</strong>
      Categories
    </span>

    <span>
      <strong>≈5 min</strong>
      To finish
    </span>

    <span>
      <strong>Free</strong>
      No signup
    </span>

  </div>

  <button
    type="button"
    className="btn-primary compat-start-button"
    onClick={startTest}
  >
    Start Compatibility Test →
  </button>

  <p className="compat-intro-privacy">
    Partner A answers first.
    Answers stay hidden until Partner B finishes.
  </p>

</div>

</div>
</section>
);
}
 

  // ==============================
  // Handoff
  // ==============================

  if (
    stage ===
    "handoff"
  ) {
    return (
      <section
        id="compatibility-test"
        className="compat-test"
      >

        <div className="compat-handoff-card">

          <div className="compat-complete-icon">
            ✓
          </div>

          <div className="game-kicker">
            Partner A Complete
          </div>

          <h2>
            Pass the Device
          </h2>

          <p>
            Partner A has answered
            all 20 questions.
            Their answers are now
            hidden.
          </p>

          <div className="compat-handoff-message">

            <strong>
              Partner B:
            </strong>

            <span>
              When you are ready,
              start the same 20
              questions. You will
              not see Partner A's
              answers until the end.
            </span>

          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={
              startPartnerB
            }
          >
            Start Partner B →
          </button>

        </div>

      </section>
    );
  }

  // ==============================
  // Results
  // ==============================

  if (
    stage ===
      "results" &&
    result
  ) {
    return (
      <div
        id="compatibility-test"
        className="compat-test"
      >

        <CompatibilityResults
          result={
            result
          }
          onRestart={
            restart
          }
        />

      </div>
    );
  }

  // ==============================
  // Question Screen
  // ==============================

  if (!question) {
    return null;
  }

  return (
    <section
      id="compatibility-test"
      className="compat-test"
    >

      <div className="compat-question-card">

        {/* Progress */}

        <div className="compat-progress-header">

          <div>

            <div className="game-kicker">
              {partnerLabel}
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

          <span>
            {
              categoryLabel
            }
          </span>

        </div>

        <div className="compat-progress-track">

          <div
            className="compat-progress-fill"
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

        {/* Question */}

        <h2 className="compat-question-title">
          {
            question.prompt
          }
        </h2>

        {/* Options */}

        <div className="compat-options">

          {question.options.map(
            (option) => (
              <button
                key={
                  option.value
                }
                type="button"
                className={`compat-option ${
                  currentAnswer ===
                  option.value
                    ? "compat-option-selected"
                    : ""
                }`}
                onClick={() =>
                  answerQuestion(
                    option.value
                  )
                }
              >

                <span className="compat-option-letter">
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

        {/* Navigation */}

        <div className="compat-question-footer">

          <button
            type="button"
            className="compat-back-button"
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
            Choose the answer
            that feels most
            natural to you.
          </span>

        </div>

      </div>

    </section>
  );
}