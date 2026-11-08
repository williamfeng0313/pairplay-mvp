import ShareResultCard from "@/components/ShareResultCard";

import type {
  CompatibilityResult,
} from "@/lib/compatibilityScore";
  
  export default function CompatibilityResults({
    result,
    onRestart,
  }: {
    result:
      CompatibilityResult;
  
    onRestart:
      () => void;
  }) {
    /*
     * 找出重合度最高和最低的两块，
     * 用作分享卡上的数据块。
     */
    const strongest =
      result.categories.reduce(
        (best, current) =>
          current.score > best.score
            ? current
            : best
      );
  
    const weakest =
      result.categories.reduce(
        (gap, current) =>
          current.score < gap.score
            ? current
            : gap
      );
  
    return (
      <section className="compat-results">
  
        {/* ==============================
            Overall
        ============================== */}
  
        <div className="compat-result-hero">
  
          <div className="game-kicker">
            Your Results
          </div>
  
          <div className="compat-score">
            {result.overallScore}%
          </div>
  
          <h2>
            {result.band.emoji}{" "}
            {result.band.title}
          </h2>
  
          <p>
            {
              result.band
                .description
            }
          </p>
  
          <div className="compat-match-count">
            You chose exactly
            the same answer on{" "}
            <strong>
              {
                result.exactMatches
              }{" "}
              of{" "}
              {
                result.totalQuestions
              }
            </strong>{" "}
            questions.
          </div>
  
        </div>
  
        {/* ==============================
            Share Card
        ============================== */}
  
        <ShareResultCard
          gameSlug="couple-compatibility"
          shareText={`We scored ${result.overallScore}% on the TwoLumi couple compatibility test — ${result.band.title}.`}
          data={{
            kicker: "Couple Compatibility Test",
            score: `${result.overallScore}%`,
            title: result.band.title,
            subtitle: result.band.description,
            emoji: result.band.emoji,
            theme: "pink",
            stats: [
              {
                label: "Exact matches",
                value: `${result.exactMatches} / ${result.totalQuestions}`,
              },
              {
                label: `Best: ${strongest.label}`,
                value: `${strongest.score}%`,
              },
              {
                label: `Gap: ${weakest.label}`,
                value: `${weakest.score}%`,
              },
            ],
          }}
        />
  
        {/* ==============================
            Categories
        ============================== */}
  
        <div className="compat-category-results">
  
          <div className="compat-results-heading">
  
            <div className="game-kicker">
              Where You Match
            </div>
  
            <h3>
              Compatibility by Category
            </h3>
  
          </div>
  
          {result.categories.map(
            (category) => (
              <div
                key={
                  category.key
                }
                className="compat-category-row"
              >
  
                <div className="compat-category-header">
  
                  <div>
                    <strong>
                      {
                        category.label
                      }
                    </strong>
  
                    <span>
                      {
                        category.exactMatches
                      }{" "}
                      of{" "}
                      {
                        category.totalQuestions
                      }{" "}
                      exact matches
                    </span>
                  </div>
  
                  <strong className="compat-category-score">
                    {
                      category.score
                    }
                    %
                  </strong>
  
                </div>
  
                <div className="compat-score-track">
  
                  <div
                    className="compat-score-fill"
                    style={{
                      width:
                        `${category.score}%`,
                    }}
                  />
  
                </div>
  
              </div>
            )
          )}
  
        </div>
  
        {/* ==============================
            Disclaimer
        ============================== */}
  
        <div className="compat-disclaimer">
  
          <strong>
            Just for fun
          </strong>
  
          <p>
            This score only
            compares how similar
            your answers were.
            It is not a
            psychological test,
            relationship diagnosis,
            or prediction of whether
            a relationship will
            succeed.
          </p>
  
        </div>
  
        {/* ==============================
            Restart
        ============================== */}
  
        <div className="compat-result-actions">
  
          <button
            type="button"
            className="btn-primary"
            onClick={
              onRestart
            }
          >
            Take the Test Again →
          </button>
  
        </div>
  
      </section>
    );
  }