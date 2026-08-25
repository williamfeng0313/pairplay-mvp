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