"use client";

import type {
  PartnerQuizResult,
} from "@/lib/partnerQuizScore";

type PartnerQuizResultsProps = {
  result:
    PartnerQuizResult;

  onRestart:
    () => void;
};

export default function PartnerQuizResults({
  result,
  onRestart,
}: PartnerQuizResultsProps) {
  /*
   * Find best category.
   *
   * 如果并列，
   * 第一项即可。
   */
  const bestCategory =
    result.categories.reduce(
      (
        best,
        current
      ) =>
        current.score >
        best.score
          ? current
          : best
    );

  return (
    <div className="partner-quiz-results">

      {/* ==============================
          Result Hero
      ============================== */}

      <div className="partner-quiz-result-hero">

        <div className="partner-quiz-result-emoji">
          {
            result.band
              .emoji
          }
        </div>

        <div className="game-kicker">
          Your Result
        </div>

        <h2>
          {
            result.band
              .label
          }
        </h2>

        <div className="partner-quiz-score">

          <strong>
            {
              result.score
            }
          </strong>

          <span>
            /{" "}
            {
              result.totalQuestions
            }
          </span>

        </div>

        <p className="partner-quiz-score-label">
          Correct Predictions
        </p>

        <p className="partner-quiz-result-description">
          {
            result.band
              .description
          }
        </p>

      </div>

      {/* ==============================
          Category Scores
      ============================== */}

      <div className="partner-quiz-category-results">

        <div className="partner-quiz-results-heading">

          <div className="game-kicker">
            Category Results
          </div>

          <h3>
            Where Did You Know Them Best?
          </h3>

        </div>

        <div className="partner-quiz-category-list">

          {result.categories.map(
            (
              category
            ) => (
              <div
                key={
                  category.key
                }
                className="partner-quiz-category-row"
              >

                <div className="partner-quiz-category-header">

                  <strong>
                    {
                      category.label
                    }
                  </strong>

                  <span>
                    {
                      category.score
                    }
                    {" / "}
                    {
                      category.totalQuestions
                    }
                  </span>

                </div>

                <div className="partner-quiz-category-track">

                  <div
                    className="partner-quiz-category-fill"
                    style={{
                      width:
                        `${category.percentage}%`,
                    }}
                  />

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* ==============================
          Best Category
      ============================== */}

      <div className="partner-quiz-best-category">

        <span>
          Best Category
        </span>

        <strong>
          {
            bestCategory.label
          }
        </strong>

        <p>
          {
            bestCategory.score
          }
          {" / "}
          {
            bestCategory.totalQuestions
          }{" "}
          correct predictions
        </p>

      </div>

      {/* ==============================
          Disclaimer
      ============================== */}

      <div className="partner-quiz-result-note">

        <strong>
          Just for fun:
        </strong>

        <p>
          This quiz only measures
          whether your predictions
          matched your partner&apos;s
          answers today. It is not a
          measure of relationship
          quality or how much you care
          about each other.
        </p>

      </div>

      {/* ==============================
          Restart
      ============================== */}

      <div className="partner-quiz-result-actions">

        <button
          type="button"
          className="btn-primary"
          onClick={
            onRestart
          }
        >
          Switch Roles &amp; Play Again →
        </button>

        <p>
          This time, let the other
          person make the predictions.
        </p>

      </div>

    </div>
  );
}