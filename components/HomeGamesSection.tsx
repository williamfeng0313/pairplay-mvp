import Link from "next/link";

export default function HomeGamesSection() {
  return (
    <section className="home-games-section">

      <div className="container">

        <div className="home-games-heading">

          <div>

            <div className="game-kicker">
              Games Made for Two
            </div>

            <h2>
              Start With a Couple Game
            </h2>

            <p>
              Play together on one device,
              or choose a multiplayer game
              when you and your partner
              are in different places.
            </p>

          </div>

          <Link
            href="/games"
            className="home-games-view-all"
          >
            View all games →
          </Link>

        </div>

        <div className="home-games-grid">

          {/* ==============================
              WYR — Primary link
          ============================== */}

          <Link
            href="/would-you-rather-questions-for-couples"
            className="home-game-card home-game-card-primary"
          >

            <div className="home-game-icon">
              ⚖️
            </div>

            <div className="home-game-label">
              Most Popular
            </div>

            <h3>
              Would You Rather
            </h3>

            <p>
              60 fun questions for
              couples, plus private
              multiplayer rooms.
            </p>

            <span>
              Play Would You Rather →
            </span>

          </Link>

          {/* Long Distance */}

          <Link
            href="/long-distance-couple-games"
            className="home-game-card"
          >

            <div className="home-game-icon">
              💞
            </div>

            <div className="home-game-label">
              Two Devices
            </div>

            <h3>
              Long Distance Games
            </h3>

            <p>
              Games made for couples
              playing from separate
              phones or computers.
            </p>

            <span>
              Play Long Distance →
            </span>

          </Link>

          {/* This or That */}

          <Link
            href="/this-or-that-for-couples"
            className="home-game-card"
          >

            <div className="home-game-icon">
              ↔️
            </div>

            <div className="home-game-label">
              Quick Game
            </div>

            <h3>
              This or That
            </h3>

            <p>
              Compare everyday
              preferences with fast
              either-or choices.
            </p>

            <span>
              Play This or That →
            </span>

          </Link>

          {/* Questions */}

          <Link
            href="/couple-questions"
            className="home-game-card"
          >

            <div className="home-game-icon">
              💬
            </div>

            <div className="home-game-label">
              Conversation
            </div>

            <h3>
              Couple Questions
            </h3>

            <p>
              Easy conversation
              starters for dates
              and quiet nights.
            </p>

            <span>
              Explore Couple Questions →
            </span>

          </Link>

        </div>

      </div>

    </section>
  );
}