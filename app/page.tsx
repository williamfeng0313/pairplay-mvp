import HomeHero from "@/components/HomeHero";
import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";
import { games } from "@/data/games";
import Link from "next/link";
import HomeGamesSection from "@/components/HomeGamesSection";
import CouplePuzzlePromo from "@/components/CouplePuzzlePromo";
import HomeSearch from "@/components/HomeSearch";

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      <HomeSearch />

      <HomeGamesSection />

      <section className="section" aria-labelledby="couple-puzzle-home">
        <div className="container">
          <CouplePuzzlePromo context="home" />
        </div>
      </section>

      <section className="section" aria-labelledby="relationship-check-in-home">
        <div className="container">
          <div className="content-card">
            <div className="game-kicker">DEEPER CONVERSATIONS</div>
            <h2 id="relationship-check-in-home">💬 Relationship Check-In</h2>
            <p className="game-sub">
              Feeling distant, stuck, or unsure what comes next? Answer
              separately, reveal together, and talk through what matters in a
              private room — without scores, winners, or a compatibility
              verdict.
            </p>

            <div className="pill-grid">
              <span className="pill">12 guided questions</span>
              <span className="pill">Private room</span>
              <span className="pill">Separate devices</span>
              <span className="pill">No signup</span>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Link href="/relationship-check-in" className="btn-primary inline-button">
                Start a Private Check-In →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="popular">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">✨ Popular Games</h2>
            <Link href="/games" className="section-link">View all games →</Link>
          </div>

          <div className="game-grid">
            {games.map((game) => (
              <GameCard key={game.href} game={game} />
            ))}
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
              <div>
                <h3>Long Distance</h3>
                <p>Stay connected, no matter the miles.</p>
              </div>
            </Link>

            <Link className="scenario-card" href="/couple-puzzle">
              <span className="scenario-emoji">🧩</span>
              <div>
                <h3>Couple Puzzle</h3>
                <p>Combine different clues and solve together as a team.</p>
              </div>
            </Link>

            <Link className="scenario-card" href="/date-night-games">
              <span className="scenario-emoji">🕯️</span>
              <div>
                <h3>Date Night</h3>
                <p>Make any night more fun and meaningful.</p>
              </div>
            </Link>

            <Link className="scenario-card" href="/relationship-check-in">
              <span className="scenario-emoji">💬</span>
              <div>
                <h3>Relationship Check-In</h3>
                <p>Talk through what matters, privately and together.</p>
              </div>
            </Link>

            <div className="scenario-card">
              <span className="scenario-emoji">☕</span>
              <div>
                <h3>New Couples</h3>
                <p>Break the ice and get to know each other.</p>
              </div>
            </div>

            <div className="scenario-card">
              <span className="scenario-emoji">🏠</span>
              <div>
                <h3>Married Couples</h3>
                <p>Keep the spark alive and grow closer.</p>
              </div>
            </div>
          </div>

          <div className="trust-strip">
            <div className="trust-item">
              <span>🛡️</span>
              <div>
                <strong>No signup needed</strong>
                <span>Jump in and start playing right away.</span>
              </div>
            </div>

            <div className="trust-item">
              <span>⚡</span>
              <div>
                <strong>Play together instantly</strong>
                <span>Built for fast mobile sessions.</span>
              </div>
            </div>

            <div className="trust-item">
              <span>♡</span>
              <div>
                <strong>Built for couples</strong>
                <span>Thoughtful, fun, and easy to share.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <div className="content-card">
            <h2>Why couples love TwoLumi</h2>
            <ul className="check-list">
              <li>Free games and quizzes</li>
              <li>Zero account friction</li>
              <li>Fast mobile-first experience</li>
              <li>Designed to be shared with your partner</li>
            </ul>
          </div>

          <div className="content-card">
            <h2>Related games &amp; questions</h2>
            <div className="pill-grid">
              <Link className="pill" href="/couple-puzzle">Couple Puzzle</Link>
              <Link className="pill" href="/would-you-rather-questions-for-couples">Would You Rather for Couples</Link>
              <Link className="pill" href="/couple-questions">Questions to Ask Your Partner</Link>
              <Link className="pill" href="/couple-compatibility-test">Relationship Compatibility Test</Link>
              <Link className="pill" href="/relationship-check-in">Relationship Check-In</Link>
              <Link className="pill" href="/long-distance-couple-games">Long Distance Games</Link>
              <Link className="pill" href="/date-night-games">Date Night Games</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
