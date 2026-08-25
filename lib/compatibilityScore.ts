import {
    compatibilityCategoryLabels,
    compatibilityCategoryOrder,
    compatibilityQuestions,
    type CompatibilityCategory,
    type CompatibilityOptionValue,
  } from "@/data/compatibilityQuestions";
  
  export type CompatibilityAnswers =
    CompatibilityOptionValue[];
  
  export type CompatibilityCategoryResult = {
    key:
      CompatibilityCategory;
  
    label:
      string;
  
    score:
      number;
  
    exactMatches:
      number;
  
    totalQuestions:
      number;
  };
  
  export type CompatibilityBand = {
    title:
      string;
  
    emoji:
      string;
  
    description:
      string;
  };
  
  export type CompatibilityResult = {
    overallScore:
      number;
  
    exactMatches:
      number;
  
    totalQuestions:
      number;
  
    categories:
      CompatibilityCategoryResult[];
  
    band:
      CompatibilityBand;
  };
  
  /*
   * ==============================
   * 单题评分
   * ==============================
   *
   * 两个人答案：
   *
   * 差0档 = 100
   * 差1档 = 67
   * 差2档 = 33
   * 差3档 = 0
   */
  export function calculateQuestionScore(
    answerA:
      CompatibilityOptionValue,
  
    answerB:
      CompatibilityOptionValue
  ) {
    const difference =
      Math.abs(
        answerA -
        answerB
      );
  
    if (difference === 0) {
      return 100;
    }
  
    if (difference === 1) {
      return 67;
    }
  
    if (difference === 2) {
      return 33;
    }
  
    return 0;
  }
  
  /*
   * ==============================
   * 结果等级
   * ==============================
   */
  export function getCompatibilityBand(
    score: number
  ): CompatibilityBand {
    if (score >= 85) {
      return {
        title:
          "Great Match",
  
        emoji:
          "💕",
  
        description:
          "You picked very similar answers across many parts of everyday life.",
      };
    }
  
    if (score >= 70) {
      return {
        title:
          "Lots in Common",
  
        emoji:
          "❤️",
  
        description:
          "You share plenty of preferences, with a few differences that can make things interesting.",
      };
    }
  
    if (score >= 50) {
      return {
        title:
          "A Fun Mix",
  
        emoji:
          "✨",
  
        description:
          "You agree on some things and see others differently — plenty of material for good conversations.",
      };
    }
  
    return {
      title:
        "Plenty to Talk About",
  
      emoji:
        "💬",
  
      description:
        "Your answers show a lot of different preferences. Use them as conversation starters rather than a judgment about your relationship.",
    };
  }
  
  /*
   * ==============================
   * 总结果
   * ==============================
   */
  export function calculateCompatibilityResult(
    partnerA:
      CompatibilityAnswers,
  
    partnerB:
      CompatibilityAnswers
  ): CompatibilityResult {
    if (
      partnerA.length !==
        compatibilityQuestions.length ||
      partnerB.length !==
        compatibilityQuestions.length
    ) {
      throw new Error(
        "Both partners must answer every compatibility question."
      );
    }
  
    let totalScore =
      0;
  
    let exactMatches =
      0;
  
    const categoryData:
      Record<
        CompatibilityCategory,
        {
          scores:
            number[];
  
          exactMatches:
            number;
        }
      > = {
      lifestyle: {
        scores: [],
        exactMatches: 0,
      },
  
      future: {
        scores: [],
        exactMatches: 0,
      },
  
      connection: {
        scores: [],
        exactMatches: 0,
      },
  
      habits: {
        scores: [],
        exactMatches: 0,
      },
    };
  
    compatibilityQuestions.forEach(
      (
        question,
        index
      ) => {
        const answerA =
          partnerA[
            index
          ];
  
        const answerB =
          partnerB[
            index
          ];
  
        const score =
          calculateQuestionScore(
            answerA,
            answerB
          );
  
        totalScore +=
          score;
  
        categoryData[
          question.category
        ].scores.push(
          score
        );
  
        if (
          answerA ===
          answerB
        ) {
          exactMatches +=
            1;
  
          categoryData[
            question.category
          ].exactMatches +=
            1;
        }
      }
    );
  
    const overallScore =
      Math.round(
        totalScore /
          compatibilityQuestions.length
      );
  
    const categories =
      compatibilityCategoryOrder.map(
        (category) => {
          const data =
            categoryData[
              category
            ];
  
          const categoryScore =
            Math.round(
              data.scores.reduce(
                (
                  total,
                  value
                ) =>
                  total +
                  value,
                0
              ) /
                data.scores
                  .length
            );
  
          return {
            key:
              category,
  
            label:
              compatibilityCategoryLabels[
                category
              ],
  
            score:
              categoryScore,
  
            exactMatches:
              data.exactMatches,
  
            totalQuestions:
              data.scores
                .length,
          };
        }
      );
  
    return {
      overallScore,
  
      exactMatches,
  
      totalQuestions:
        compatibilityQuestions.length,
  
      categories,
  
      band:
        getCompatibilityBand(
          overallScore
        ),
    };
  }