import Link from "next/link";
import type { SearchIndexItem } from "@/data/searchIndex";

export default function SearchResults({
  results,
}: {
  results: SearchIndexItem[];
}) {
  return (
    <div className="search-results-list">
      {results.map((result) => (
        <Link
          key={result.href}
          href={result.href}
          className="search-result-card"
          data-search-result={result.href}
        >
          <div className="search-result-type">{result.type}</div>
          <h2>{result.title}</h2>
          <p>{result.description}</p>
          <span className="search-result-link">Explore →</span>
        </Link>
      ))}
    </div>
  );
}
