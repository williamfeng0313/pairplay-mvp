import type { Metadata } from "next";
export const metadata: Metadata = { title: "About PairPlay" };
export default function Page() {
  return (
    <main className="game-page">
      <div className="container content-card">
        <h1>About PairPlay</h1>
        <p className="game-sub">PairPlay is a lightweight couple-games project focused on fast, no-signup play.</p>
      </div>
    </main>
  );
}
