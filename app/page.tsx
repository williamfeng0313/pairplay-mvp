import HomeHero from "@/components/HomeHero";
import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";
import { games } from "@/data/games";
import Link from "next/link";
import HomeGamesSection from "@/components/HomeGamesSection";
import CouplePuzzlePromo from "@/components/CouplePuzzlePromo";
import HomeSearch from "@/components/HomeSearch";
import TodayQuestion from "@/components/TodayQuestion";

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      <HomeSearch />

      <HomeGamesSection />

      {/* Today's Question */}
      <TodayQuestion />

      {/* Days Together */}
      <section className="section" aria-labelledby="days-together-home">
        <div className="container">
          <div className="content-card">
            <div className="game-kicker">DAYS TOGETHER</div>

            <h2 id="days-together-home">
              📆 How Many Days Have You Been Together?
            </h2>

            <p className="game-sub">
              Pick the day it all started and count every day
              since. See your next anniversary, upcoming 100,
              520, and 1000 day milestones, and turn the number
              into a card you can send.
            </p>

            <div className="pill-grid">
              <span className="pill">💕 Day counter</span>
              <span className="pill">🎂 Anniversary countdown</span>
              <span className="pill">🏆 Milestones</span>
              <span className="pill">🖼️ Shareable card</span>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Link
                href="/days-together"
                className="btn-primary inline-button"
              >
                Count Our Days →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Booth */}
      <section className="section" aria-labelledby="photo-booth-home">
        <div className="container">
          <div className="content-card">
            <div className="game-kicker">TWOLUMI PHOTO BOOTH</div>

            <h2 id="photo-booth-home">
              📸 Your Own Photo Booth, Right in the Browser
            </h2>

            <p className="game-sub">
              Turn one photo into a cute couple card, or shoot a classic
              four-photo strip. Cut out the background on your device, drag
              on stickers, add a retro filter and a date stamp, then download
              a JPG. No signup, no upload — everything happens in your
              browser.
            </p>

            <div className="pill-grid">
              <span className="pill">✂️ AI background cutout</span>
              <span className="pill">🎞️ 4-cut photo strip</span>
              <span className="pill">✨ Draggable stickers</span>
              <span className="pill">🔒 Nothing uploaded</span>
            </div>

            <div className="photo-booth-home-actions">
              <Link
                href="/photo-booth"
                className="btn-primary inline-button"
              >
                Make a Photo Card →
              </Link>

              <Link
                href="/photo-booth?mode=strip"
                className="btn-secondary inline-button"
              >
                Shoot a 4-Cut Strip →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Couple Puzzle */}
      <section className="section" aria-labelledby="couple-puzzle-home">
        <div className="container">
          <CouplePuzzlePromo context="home" />
        </div>
      </section>

      {/* Relationship Check-In */}
      <section
        className="section"
        aria-labelledby="relationship-check-in-home"
      >
        <div className="container">
          <div className="content-card">
            <div className="game-kicker">DEEPER CONVERSATIONS</div>

            <h2 id="relationship-check-in-home">
              💬 Relationship Check-In
            </h2>

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
              <Link
                href="/relationship-check-in"
                className="btn-primary inline-button"
              >
                Start a Private Check-In →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="section" id="popular">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">✨ Popular Games</h2>

            <Link href="/games" className="section-link">
              View all games →
            </Link>
          </div>

          <div className="game-grid">
            {games.map((game) => (
              <GameCard key={game.href} game={game} />
            ))}
          </div>

          <AdSlot label="Home page primary slot" />
        </div>
      </section>

      {/* Games for Every Couple */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">♥ Games for Every Couple</h2>
          </div>

          <div className="scenario-grid">
            <Link
              className="scenario-card"
              href="/long-distance-couple-games"
            >
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
                <p>
                  Combine different clues and solve together as a team.
                </p>
              </div>
            </Link>

            <Link className="scenario-card" href="/date-night-games">
              <span className="scenario-emoji">🕯️</span>

              <div>
                <h3>Date Night</h3>
                <p>Make any night more fun and meaningful.</p>
              </div>
            </Link>

            <Link
              className="scenario-card"
              href="/relationship-check-in"
            >
              <span className="scenario-emoji">💬</span>

              <div>
                <h3>Relationship Check-In</h3>
                <p>
                  Talk through what matters, privately and together.
                </p>
              </div>
            </Link>

            <Link
              className="scenario-card"
              href="/games-for-new-couples"
            >
              <span className="scenario-emoji">☕</span>

              <div>
                <h3>New Couples</h3>
                <p>Break the ice and get to know each other.</p>
              </div>
            </Link>

            <Link
              className="scenario-card"
              href="/games-for-married-couples"
            >
              <span className="scenario-emoji">🏠</span>

              <div>
                <h3>Married Couples</h3>
                <p>Keep the spark alive and grow closer.</p>
              </div>
            </Link>

            <Link className="scenario-card" href="/photo-booth">
              <span className="scenario-emoji">📸</span>

              <div>
                <h3>Photo Booth</h3>
                <p>Cards, cutouts, stickers and 4-cut strips.</p>
              </div>
            </Link>

            <Link
              className="scenario-card"
              href="/days-together"
            >
              <span className="scenario-emoji">📆</span>

              <div>
                <h3>Days Together</h3>
                <p>Count every day since it started.</p>
              </div>
            </Link>
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

      {/* Why couples love TwoLumi / Related games */}
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
              <Link className="pill" href="/couple-puzzle">
                Couple Puzzle
              </Link>

              <Link
                className="pill"
                href="/would-you-rather-questions-for-couples"
              >
                Would You Rather for Couples
              </Link>

              <Link className="pill" href="/couple-questions">
                Questions to Ask Your Partner
              </Link>

              <Link
                className="pill"
                href="/couple-compatibility-test"
              >
                Relationship Compatibility Test
              </Link>

              <Link
                className="pill"
                href="/relationship-check-in"
              >
                Relationship Check-In
              </Link>

              <Link
                className="pill"
                href="/long-distance-couple-games"
              >
                Long Distance Games
              </Link>

              <Link className="pill" href="/date-night-games">
                Date Night Games
              </Link>

              <Link className="pill" href="/photo-booth">
                📸 Photo Booth
              </Link>

              <Link className="pill" href="/days-together">
                📆 Days Together
              </Link>

              <Link className="pill" href="/games-for-new-couples">
                Games for New Couples
              </Link>

              <Link
                className="pill"
                href="/games-for-married-couples"
              >
                Games for Married Couples
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}