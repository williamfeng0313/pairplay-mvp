import type {
  Metadata,
} from "next";

import Link from "next/link";

import CouplePuzzleLauncher from "@/components/CouplePuzzleLauncher";


export const metadata:
  Metadata = {
  title:
    "Couple Puzzle | Solve Together Online",

  description:
    "A private two-player puzzle game for couples. Get different clues, talk together, and solve 8 puzzles as a team.",

  alternates: {
    canonical:
      "https://twolumi.com/couple-puzzle",
  },

  /*
   * Product first.
   * We can index later if GSC begins showing
   * real puzzle-game demand.
   */
  robots: {
    index: false,
    follow: true,
  },
};


export default function CouplePuzzlePage() {
  return (
    <main className="couple-puzzle-page">

      <section className="couple-puzzle-hero">

        <div className="container couple-puzzle-hero-grid">

          <div>

            <div className="game-kicker">
              TWO CLUES · ONE ANSWER
            </div>


            <h1>
              Couple Puzzle
            </h1>


            <p className="couple-puzzle-lead">
              You and your partner get
              different clues to the same
              puzzle. Talk together, choose
              the answer, and see how many
              you can solve as a team.
            </p>


            <div className="couple-puzzle-pills">

              <span>
                8 puzzles
              </span>

              <span>
                Separate devices
              </span>

              <span>
                Private room
              </span>

              <span>
                No signup
              </span>

            </div>


            <CouplePuzzleLauncher />

          </div>


          <div className="couple-puzzle-preview">

            <div className="game-kicker">
              HOW A ROUND WORKS
            </div>


            <div className="couple-puzzle-preview-card">

              <span>
                YOUR CLUE
              </span>

              <strong>
                “I contain many tracks,
                but no trains.”
              </strong>

            </div>


            <div className="couple-puzzle-preview-plus">
              +
            </div>


            <div className="couple-puzzle-preview-card">

              <span>
                PARTNER&apos;S CLUE
              </span>

              <strong>
                Hidden on their device
                until you talk.
              </strong>

            </div>


            <p>
              Use the room chat or talk
              out loud, then both choose
              the answer.
            </p>

          </div>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="section-head">

            <h2 className="section-title">
              🧩 Built for teamwork
            </h2>

          </div>


          <div className="couple-puzzle-feature-grid">

            <article>

              <span>
                01
              </span>

              <h3>
                Different clues
              </h3>

              <p>
                Each partner sees only
                their own clue before
                the reveal.
              </p>

            </article>


            <article>

              <span>
                02
              </span>

              <h3>
                Talk it out
              </h3>

              <p>
                Combine what each of you
                knows before making a
                final choice.
              </p>

            </article>


            <article>

              <span>
                03
              </span>

              <h3>
                Solve as a team
              </h3>

              <p>
                The score belongs to both
                of you. There is no
                winner and loser.
              </p>

            </article>

          </div>


          <div className="couple-puzzle-bottom-links">

            <Link
              href="/games"
              className="btn-secondary"
            >
              Browse All Games
            </Link>


            <Link
              href="/long-distance-couple-games"
              className="btn-secondary"
            >
              Long Distance Games
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
