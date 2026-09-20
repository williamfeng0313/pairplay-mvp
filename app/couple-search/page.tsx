import type { Metadata } from "next";
import Link from "next/link";
import SearchPageClient from "@/components/SearchPageClient";
import { searchTwoLumi } from "@/data/searchIndex";

export const metadata: Metadata = {
  title: "Search",
  description: "Search TwoLumi for couple games, questions, quizzes, and relationship activities.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/couple-search" },
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function CoupleSearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 200) : "";
  const results = searchTwoLumi(query);

  return (
    <main className="search-page">
      <section className="section search-page-hero">
        <div className="container">
          <div className="search-page-header">
            <div className="game-kicker">TWOLUMI SEARCH</div>
            <h1>Search TwoLumi</h1>
            <p>Find games, questions, quizzes, and relationship activities for couples.</p>

            <form className="search-page-form" action="/couple-search" method="get">
              <label htmlFor="search-page-input" className="sr-only">Search TwoLumi</label>
              <div className="search-page-input-wrap">
                <span aria-hidden="true">🔍</span>
                <input
                  id="search-page-input"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Search games, questions, quizzes..."
                  autoComplete="off"
                  enterKeyHint="search"
                />
                <button type="submit" className="btn-primary">Search</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="section search-results-section">
        <div className="container">
          {!query ? (
            <div className="search-empty-state">
              <h2>What are you looking for?</h2>
              <p>Try searching for "long distance", "date night", "couple questions", or "couple quiz".</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="search-results-heading">
                <div>
                  <div className="game-kicker">SEARCH RESULTS</div>
                  <h2>Results for &quot;{query}&quot;</h2>
                </div>
                <span className="search-result-count">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </span>
              </div>

              <SearchPageClient query={query} results={results} />
            </>
          ) : (
            <>
              <SearchPageClient query={query} results={[]} />
              <div className="search-no-results">
                <div className="search-no-results-icon">🔎</div>
                <h2>No results yet</h2>
                <p>
                  We couldn&apos;t find anything matching &quot;{query}&quot;.
                  Try a different search, or explore all of our games and questions.
                </p>
                <div className="search-no-results-actions">
                  <Link href="/games" className="btn-primary inline-button">
                    Browse All Games
                  </Link>
                  <Link href="/couple-questions" className="btn-secondary inline-button">
                    Browse Questions
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
