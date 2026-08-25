import {
    partnerQuizQuestions,
    partnerQuizCategoryLabels,
    partnerQuizCategoryOrder,
    type PartnerQuizCategory,
    type PartnerQuizOptionValue,
  } from "@/data/partnerQuizQuestions";
  
  /* ==============================
     Types
  ============================== */
  
  export type PartnerQuizAnswers =
    PartnerQuizOptionValue[];
  
  export type PartnerQuizCategoryResult = {
    key: PartnerQuizCategory;
  
    label: string;
  
    score: number;
  
    totalQuestions: number;
  
    percentage: number;
  };
  
  export type PartnerQuizBand = {
    key:
      | "still-learning"
      | "getting-to-know"
      | "pretty-well"
      | "partner-expert";
  
    label: string;
  
    emoji: string;
  
    description: string;
  };
  
  export type PartnerQuizResult = {
    score: number;
  
    totalQuestions: number;
  
    percentage: number;
  
    categories:
      PartnerQuizCategoryResult[];
  
    band:
      PartnerQuizBand;
  };
  
  /* ==============================
     Score Band
  ============================== */
  
  export function getPartnerQuizBand(
    score: number
  ): PartnerQuizBand {
    if (score >= 16) {
      return {
        key:
          "partner-expert",
  
        label:
          "Partner Expert",
  
        emoji:
          "💕",
  
        description:
          "You matched most of your partner's answers. Either you know them extremely well — or they are becoming very predictable.",
      };
    }
  
    if (score >= 11) {
      return {
        key:
          "pretty-well",
  
        label:
          "You Know Them Pretty Well",
  
        emoji:
          "❤️",
  
        description:
          "You predicted many of your partner's preferences correctly and seem to pay attention to the little things.",
      };
    }
  
    if (score >= 6) {
      return {
        key:
          "getting-to-know",
  
        label:
          "Getting to Know Them",
  
        emoji:
          "✨",
  
        description:
          "You know quite a few things about your partner, with some surprises still waiting.",
      };
    }
  
    return {
      key:
        "still-learning",
  
      label:
        "Still Learning",
  
      emoji:
        "💬",
  
      description:
        "There are still plenty of things to discover about your partner — which means plenty of future conversations too.",
    };
  }
  
  /* ==============================
     Main Calculator
  ============================== */
  
  export function calculatePartnerQuizResult(
    predictions:
      PartnerQuizAnswers,
  
    actualAnswers:
      PartnerQuizAnswers
  ): PartnerQuizResult {
    const totalQuestions =
      partnerQuizQuestions.length;
  
    /*
     * Safety check
     */
    if (
      predictions.length !==
        totalQuestions ||
      actualAnswers.length !==
        totalQuestions
    ) {
      throw new Error(
        "Partner quiz answer count does not match the question count."
      );
    }
  
    /*
     * Total score
     *
     * Exact match only:
     *
     * Prediction === Actual
     * → 1 point
     *
     * Otherwise
     * → 0 points
     */
    let score =
      0;
  
    partnerQuizQuestions.forEach(
      (
        _question,
        index
      ) => {
        if (
          predictions[
            index
          ] ===
          actualAnswers[
            index
          ]
        ) {
          score +=
            1;
        }
      }
    );
  
    /*
     * Category scores
     */
    const categories =
      partnerQuizCategoryOrder.map(
        (
          category
        ): PartnerQuizCategoryResult => {
          const categoryIndexes =
            partnerQuizQuestions
              .map(
                (
                  question,
                  index
                ) => ({
                  question,
                  index,
                })
              )
              .filter(
                ({
                  question,
                }) =>
                  question.category ===
                  category
              );
  
          const categoryScore =
            categoryIndexes.reduce(
              (
                total,
                {
                  index,
                }
              ) => {
                return (
                  total +
                  (
                    predictions[
                      index
                    ] ===
                    actualAnswers[
                      index
                    ]
                      ? 1
                      : 0
                  )
                );
              },
              0
            );
  
          const categoryTotal =
            categoryIndexes.length;
  
          const percentage =
            categoryTotal >
            0
              ? Math.round(
                  (
                    categoryScore /
                    categoryTotal
                  ) *
                    100
                )
              : 0;
  
          return {
            key:
              category,
  
            label:
              partnerQuizCategoryLabels[
                category
              ],
  
            score:
              categoryScore,
  
            totalQuestions:
              categoryTotal,
  
            percentage,
          };
        }
      );
  
    const percentage =
      Math.round(
        (
          score /
          totalQuestions
        ) *
          100
      );
  
    return {
      score,
  
      totalQuestions,
  
      percentage,
  
      categories,
  
      band:
        getPartnerQuizBand(
          score
        ),
    };
  }