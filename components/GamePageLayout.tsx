import AdSlot from "@/components/AdSlot";
import Link from "next/link";

export default function GamePageLayout({
  kicker,
  title,
  description,
  children
}: {
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="game-page">
      <div className="container game-layout">
        <section className="game-shell">
          <div className="game-kicker">{kicker}</div>
          <h1 className="game-heading">{title}</h1>
          <p className="game-sub">{description}</p>

          {children}

          <AdSlot label="Game page mid-content slot" />

          <div className="content-card" style={{ marginTop: 22 }}>
            <h2>Play it your way</h2>
            <p className="game-sub">
              PairPlay is designed for fast, low-friction play: no account, no download, no setup.
              Use the game on one device now; invite-link multiplayer is the next product layer.
            </p>
          </div>
        </section>

        <aside className="side-card">
          <h3>Try another game</h3>
          <div className="pill-grid">
            <Link className="pill" href="/would-you-rather-questions-for-couples">Would You Rather</Link>
            <Link className="pill" href="/couple-questions">Couple Questions</Link>
            <Link className="pill" href="/couple-quiz">Couple Quiz</Link>
            <Link className="pill" href="/couple-compatibility-test">Compatibility</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
