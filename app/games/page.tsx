import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Online Couple Games | Free Games for Couples | TwoLumi",

  description:
    "Play free online couple games on TwoLumi. Try Would You Rather, This or That, couple questions, quizzes, compatibility games, and games for long distance couples.",

  alternates: {
    canonical:
      "https://twolumi.com/games",
  },

  openGraph: {
    title:
      "Online Couple Games | TwoLumi",

    description:
      "Free online games, questions, and quizzes made for couples. Play together on one device or from separate devices.",

    url:
      "https://twolumi.com/games",

    type: "website",
  },
};

const games = [
  {
    href:
      "/would-you-rather-questions-for-couples",

    icon: "⚖️",

    badge: "Most Popular",

    title:
      "Would You Rather for Couples",

    description:
      "Choose between two options, compare your answers, and discover the funny little differences between you.",

    meta:
      "60-question bank · Multiplayer available",

    featured: true,
  },

  {
    href:
      "/long-distance-couple-games",

    icon: "💞",

    badge: "Play Together",

    title:
      "Long Distance Couple Games",

    description:
      "Games and activities for couples using separate phones or computers. Create a private room and play together.",

    meta:
      "Two devices · No signup",

    featured: true,
  },

  {
    href:
      "/this-or-that-for-couples",

    icon: "↔️",

    badge: "Quick Game",

    title:
      "This or That for Couples",

    description:
      "Coffee or tea? Beach or mountains? Compare quick choices and learn more about each other's preferences.",

    meta:
      "Fast · Easy · One device",
  },

  {
    href:
      "/couple-questions",

    icon: "💬",

    badge: "Conversation",

    title:
      "Couple Questions",

    description:
      "Fun and thoughtful conversation starters for date nights, long distance calls, and quiet evenings together.",

    meta:
      "Questions · Conversation",
  },

  {
    href:
      "/couple-quiz",

    icon: "🧠",

    badge: "Quiz",

    title:
      "Couple Quiz",

    description:
      "Test how well you know each other with simple couple quiz questions and compare your answers.",

    meta:
      "Quiz · Just for fun",
  },

  {
    href:
      "/couple-compatibility-test",

    icon: "💕",

    badge: "Just for Fun",

    title:
      "Couple Compatibility Test",

    description:
      "Compare your preferences and see where you match. Designed for entertainment rather than relationship diagnosis.",

    meta:
      "Compatibility · Entertainment",
  },

  {
    href:
      "/date-night-games",

    icon: "🌙",

    badge: "Date Idea",

    title:
      "Date Night Games",

    description:
      "Simple games and questions that make an at-home or virtual date night more interactive.",

    meta:
      "Date night · Couples",
  },
];

export default function GamesPage() {
  return (
    <main className="games-hub-page">
      <div className="container">

        {/* ==============================
            Hero
        ============================== */}

        <section className="games-hub-hero">

          <div className="game-kicker">
            Games Made for Two
          </div>

          <h1>
            Online Couple Games
            You Can Play Together
          </h1>

          <p>
            Play free games, questions,
            and quizzes made for couples.
            Use one device together or
            create a private TwoLumi room
            when you are playing from
            different places.
          </p>

          <div className="games-hub-actions">

            <Link
              href="/would-you-rather-questions-for-couples"
              className="btn-primary"
            >
              Play Would You Rather →
            </Link>

            <Link
              href="/long-distance-couple-games"
              className="btn-secondary"
            >
              Long Distance Games
            </Link>

          </div>

        </section>

        {/* ==============================
            Primary Cluster
        ============================== */}

        <section className="games-hub-section">

          <div className="games-hub-heading">

            <div className="game-kicker">
              Start Playing
            </div>

            <h2>
              Popular Couple Games
            </h2>

            <p>
              Start with our most popular
              games or choose something
              based on how you want to
              spend time together.
            </p>

          </div>

          <div className="games-hub-grid">

            {games.map(
              (game) => (
                <article
                  key={game.href}
                  className={`games-hub-card ${
                    game.featured
                      ? "games-hub-card-featured"
                      : ""
                  }`}
                >

                  <div className="games-hub-card-top">

                    <div className="games-hub-icon">
                      {game.icon}
                    </div>

                    <span className="games-hub-badge">
                      {game.badge}
                    </span>

                  </div>

                  <h2>
                    <Link href={game.href}>
                      {game.title}
                    </Link>
                  </h2>

                  <p>
                    {game.description}
                  </p>

                  <div className="games-hub-meta">
                    {game.meta}
                  </div>

                  <Link
                    href={game.href}
                    className="games-hub-link"
                  >
                    Play {game.title} →
                  </Link>

                </article>
              )
            )}

          </div>

        </section>

        {/* ==============================
            Ad Slot
        ============================== */}

        <div
          className="ad-slot"
          aria-label="Advertisement"
        >
          Sponsored · Games hub content slot
        </div>

        {/* ==============================
            Play Together Feature
        ============================== */}

        <section className="games-together-section">

          <div>

            <div className="game-kicker">
              Two Devices
            </div>

            <h2>
              Playing Long Distance?
              Play the Same Game Together.
            </h2>

            <p>
              TwoLumi private rooms let two
              people play from separate
              devices. One person creates a
              room, shares the six-character
              code, and both partners receive
              the same questions.
            </p>

            <p>
              In supported multiplayer games,
              your choices stay hidden until
              both people answer.
            </p>

            <div className="hero-actions">

              <Link
                href="/would-you-rather-questions-for-couples"
                className="btn-primary"
              >
                Play Would You Rather →
              </Link>

              <Link
                href="/long-distance-couple-games"
                className="btn-secondary"
              >
                Explore Long Distance Games
              </Link>

            </div>

          </div>

          <div className="games-together-flow">

            <div>
              <span>1</span>

              <strong>
                Create a Room
              </strong>
            </div>

            <div>
              <span>2</span>

              <strong>
                Share the Code
              </strong>
            </div>

            <div>
              <span>3</span>

              <strong>
                Answer Together
              </strong>
            </div>

            <div>
              <span>4</span>

              <strong>
                Reveal Together
              </strong>
            </div>

          </div>

        </section>

        {/* ==============================
            Browse by situation
        ============================== */}

        <section className="games-hub-section">

          <div className="games-hub-heading">

            <div className="game-kicker">
              Find Your Game
            </div>

            <h2>
              Couple Games for Different Moments
            </h2>

          </div>

          <div className="games-situation-grid">

            <Link
              href="/long-distance-couple-games"
              className="games-situation-card"
            >
              <span>📱</span>

              <div>
                <h3>
                  Long Distance
                </h3>

                <p>
                  Games for two phones
                  or computers.
                </p>
              </div>
            </Link>

            <Link
              href="/date-night-games"
              className="games-situation-card"
            >
              <span>🌙</span>

              <div>
                <h3>
                  Date Night
                </h3>

                <p>
                  Easy games for a
                  relaxed evening.
                </p>
              </div>
            </Link>

            <Link
              href="/couple-questions"
              className="games-situation-card"
            >
              <span>💬</span>

              <div>
                <h3>
                  Better Conversations
                </h3>

                <p>
                  Questions that create
                  something to talk about.
                </p>
              </div>
            </Link>

            <Link
              href="/couple-quiz"
              className="games-situation-card"
            >
              <span>🧠</span>

              <div>
                <h3>
                  Test Each Other
                </h3>

                <p>
                  Quick quizzes and
                  playful challenges.
                </p>
              </div>
            </Link>

          </div>

        </section>

        {/* ==============================
            SEO text
        ============================== */}

        <section className="games-hub-copy">

          <div className="game-kicker">
            Free Online Couple Games
          </div>

          <h2>
            What Can Couples Play Online?
          </h2>

          <p>
            Online couple games can be as
            simple as choosing between two
            options or asking each other
            interesting questions. Games
            like Would You Rather and This
            or That work especially well
            because there are no complicated
            rules and you can start playing
            immediately.
          </p>

          <p>
            Long distance couples can also
            use games to make video calls
            more interactive. Instead of
            only talking about your day,
            you can answer the same
            questions, compare preferences,
            take a couple quiz, or use the
            answers as conversation starters.
          </p>

          <p>
            TwoLumi is designed around that
            idea: simple browser games made
            for two people. No download is
            required, and supported games
            can be played through private
            rooms on separate devices.
          </p>

        </section>

      </div>
    </main>
  );
}