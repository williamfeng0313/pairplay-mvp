import Link from "next/link";

const popularSearches = [
  { label: "Couple Questions", query: "couple questions" },
  { label: "Long Distance", query: "long distance" },
  { label: "Date Night", query: "date night" },
  { label: "Couple Quiz", query: "couple quiz" },
  { label: "Would You Rather", query: "would you rather" },
];

export default function HomeSearch() {
  return (
    <section className="home-search-section" aria-labelledby="home-search-title">
      <div className="container">
        <div className="home-search-card">
          <div className="home-search-copy">
            <div className="game-kicker">EXPLORE TWOLUMI</div>
            <h2 id="home-search-title">Find a game, question, or quiz</h2>
            <p>Search TwoLumi for games, questions, quizzes, and relationship activities for couples.</p>
          </div>

          <form className="home-search-form" action="/couple-search" method="get">
            <label htmlFor="home-search-input" className="sr-only">Search TwoLumi</label>
            <div className="home-search-input-wrap">
              <span className="home-search-icon" aria-hidden="true">🔍</span>
              <input
                id="home-search-input"
                name="q"
                type="search"
                placeholder="Search games, questions, quizzes..."
                autoComplete="off"
                enterKeyHint="search"
              />
              <button type="submit" className="home-search-button">Search</button>
            </div>
          </form>

          <div className="home-search-popular" aria-label="Popular searches">
            <span className="home-search-popular-label">Popular:</span>
            <div className="home-search-popular-links">
              {popularSearches.map((item) => (
                <Link key={item.query} href={`/couple-search?q=${encodeURIComponent(item.query)}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
