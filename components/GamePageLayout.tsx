import type { ReactNode } from "react";
import Link from "next/link";

type GamePageLayoutProps = {
  kicker?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function GamePageLayout({
  kicker = "Couple Game",
  title,
  description,
  children,
}: GamePageLayoutProps) {
  return (
    <main className="game-page">
      <div className="container">

        {/* ==============================
            Page Header
        ============================== */}

        <section className="game-page-header">

          <div className="game-kicker">
            {kicker}
          </div>

          <h1>
            {title}
          </h1>

          <p className="game-page-description">
            {description}
          </p>

        </section>

        {/* ==============================
            Main Game Content
        ============================== */}

        <section className="game-page-content">
          {children}
        </section>

        {/* ==============================
            Ad Slot
        ============================== */}

        <div
          className="ad-slot"
          aria-label="Advertisement"
        >
          Sponsored · Game page mid-content slot
        </div>

        {/* ==============================
            About TwoLumi
        ============================== */}

        <section className="content-card">
          <div className="game-kicker">
            Play together with TwoLumi
          </div>

          <h2>
            Couple Games Made for Two
          </h2>

          <p className="game-sub">
            TwoLumi is a collection of free online
            games, questions, and quizzes for couples.
            You can play casually on one device or
            create a private room and play together
            from different devices.
          </p>

          <p className="game-sub">
            In supported multiplayer games, both
            partners receive the same questions.
            Your choices stay hidden until both of
            you answer, then the results are revealed
            together.
          </p>

          <div className="play-together-features">
            <span>✓ No signup</span>
            <span>✓ Private room codes</span>
            <span>✓ Works on different devices</span>
            <span>✓ Free to play</span>
          </div>

          <div className="hero-actions">

            <Link
              href="/"
              className="btn-primary"
            >
              Play Together →
            </Link>

            <Link
              href="/games"
              className="btn-secondary"
            >
              Explore All Games
            </Link>

          </div>
        </section>

        {/* ==============================
            Privacy / Room Explanation
        ============================== */}

        <section className="game-info-strip">

          <div>
            <strong>
              Private by design
            </strong>

            <p>
              TwoLumi rooms use temporary room codes.
              No account or personal profile is
              required to play.
            </p>
          </div>

          <div>
            <strong>
              Made for long distance too
            </strong>

            <p>
              Create a room, share the code with your
              partner, and answer the same questions
              from separate devices.
            </p>
          </div>

          <div>
            <strong>
              Play instantly
            </strong>

            <p>
              There is nothing to install. Open
              TwoLumi in your browser and start
              playing.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}