import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy" };
export default function Page() {
  return (
    <main className="game-page">
      <div className="container content-card">
        <h1>Privacy</h1>
        <p className="game-sub">MVP note: this local version stores only temporary game state in the browser. Add a production privacy policy before launch.</p>
      </div>
    </main>
  );
}
