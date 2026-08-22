import HomeHero from "@/components/HomeHero";
import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";
import { games } from "@/data/games";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      <section className="section" id="popular">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">✨ Popular Games</h2>
            <Link href="/games" className="section-link">View all games →</Link>
          </div>

          <div className="game-grid">
            {games.map((game) => <GameCard key={game.href} game={game} />)}
          </div>

          <AdSlot label="Home page primary slot" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">♥ Games for Every Couple</h2>
          </div>

          <div className="scenario-grid">
            <Link className="scenario-card" href="/long-distance-couple-games">
              <span className="scenario-emoji">🌍</span>
              <div><h3>Long Distance</h3><p>Stay connected, no matter the miles.</p></div>
            </Link>
            <Link className="scenario-card" href="/date-night-games">
              <span className="scenario-emoji">🕯️</span>
              <div><h3>Date Night</h3><p>Make any night more fun and meaningful.</p></div>
            </Link>
            <div className="scenario-card">
              <span className="scenario-emoji">☕</span>
              <div><h3>New Couples</h3><p>Break the ice and get to know each other.</p></div>
            </div>
            <div className="scenario-card">
              <span className="scenario-emoji">🏠</span>
              <div><h3>Married Couples</h3><p>Keep the spark alive and grow closer.</p></div>
            </div>
          </div>

          <div className="trust-strip">
            <div className="trust-item"><span>🛡️</span><div><strong>No signup needed</strong><span>Jump in and start playing right away.</span></div></div>
            <div className="trust-item"><span>⚡</span><div><strong>Play together instantly</strong><span>Built for fast mobile sessions.</span></div></div>
            <div className="trust-item"><span>♡</span><div><strong>Built for couples</strong><span>Thoughtful, fun, and easy to share.</span></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <div className="content-card">
            <h2>Why couples love PairPlay</h2>
            <ul className="check-list">
              <li>Free games and quizzes</li>
              <li>Zero account friction</li>
              <li>Fast mobile-first experience</li>
              <li>Designed to be shared with your partner</li>
            </ul>
          </div>

          <div className="content-card">
            <h2>Related games & questions</h2>
            <div className="pill-grid">
              <Link className="pill" href="/would-you-rather-questions-for-couples">Would You Rather for Couples</Link>
              <Link className="pill" href="/couple-questions">Deep Questions for Couples</Link>
              <Link className="pill" href="/couple-compatibility-test">Relationship Compatibility Test</Link>
              <Link className="pill" href="/long-distance-couple-games">Long Distance Games</Link>
              <Link className="pill" href="/date-night-games">Date Night Games</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
