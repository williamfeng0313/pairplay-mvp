 "use client";

import { useEffect } from "react";
import type { SearchIndexItem } from "@/data/searchIndex";
import SearchResults from "@/components/SearchResults";

function recordSearchEvent(query: string, resultCount: number, clickedPath: string | null = null) {
  if (!query.trim()) return;

  void fetch("/api/search-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, resultCount, clickedPath }),
    keepalive: true,
  }).catch(() => {});
}

export default function SearchPageClient({
  query,
  results,
}: {
  query: string;
  results: SearchIndexItem[];
}) {
  useEffect(() => {
    recordSearchEvent(query, results.length);
  }, [query, results.length]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const resultLink = target?.closest("[data-search-result]") as HTMLElement | null;
      if (!resultLink) return;

      recordSearchEvent(
        query,
        results.length,
        resultLink.getAttribute("href")
      );
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [query, results.length]);

  return <SearchResults results={results} />;
}
