import type { Metadata } from "next";
export const metadata: Metadata = { title: "About TwoLumi" };
export default function Page() {
  return (
    <main className="game-page">
      <div className="container content-card">
        <h1>About TwoLumi</h1>
        <p className="game-sub">TwoLumi is a lightweight couple-games project focused on fast, no-signup play.</p>
      </div>
    </main>
  );
}
