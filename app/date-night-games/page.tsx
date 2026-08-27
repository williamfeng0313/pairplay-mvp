import type { Metadata } from "next";

import GameCard from "@/components/GameCard";
import { games } from "@/data/games";

/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "Free Date Night Games for Couples",

  description:
    "Free date night games for couples to play at home or online. Try fun questions, quizzes, conversation games, and quick couple games together.",

  alternates: {
    canonical:
      "https://twolumi.com/date-night-games",
  },

  openGraph: {
    title:
      "Free Date Night Games for Couples | TwoLumi",

    description:
      "Turn your next date night into something more playful with free couple games, questions, quizzes, and conversation starters.",

    url:
      "https://twolumi.com/date-night-games",

    type:
      "website",
  },
};

/* =========================================================
   Page
========================================================= */

export default function Page() {
  return (
    <main className="game-page">

      <div className="container">

        {/* =================================================
            HERO
        ================================================= */}

        <div className="game-kicker">
          Date Night
        </div>

        <h1 className="game-heading">
          Free Date Night Games for Couples
        </h1>

        <p className="game-sub">
          Turn a normal night into something more playful
          with fun games, quizzes, questions, and
          conversation starters you can enjoy together.
        </p>

        {/* =================================================
            GAME GRID
        ================================================= */}

        <div
          className="game-grid"
          style={{
            marginTop: 28,
          }}
        >

          {games.map(
            (game) => (
              <GameCard
                key={game.href}
                game={game}
              />
            )
          )}

        </div>

      </div>

    </main>
  );
}