import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms" };
export default function Page() {
  return (
    <main className="game-page">
      <div className="container content-card">
        <h1>Terms</h1>
        <p className="game-sub">MVP note: add final legal terms before public launch.</p>
      </div>
    </main>
  );
}
