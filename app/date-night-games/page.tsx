import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title: "Free Date Night Games for Couples",

  description:
    "Free date night games for couples to play at home or online. Try Would You Rather, This or That, couple questions, quizzes, and more.",

  alternates: {
    canonical: "https://twolumi.com/date-night-games",
  },

  openGraph: {
    title: "Free Date Night Games for Couples | TwoLumi",

    description:
      "Turn your next date night into something more playful with free couple games, questions, quizzes, and conversation starters.",

    url: "https://twolumi.com/date-night-games",

    type: "website",
  },
};

/* =========================================================
   Date Night Games
========================================================= */

const dateNightGames = [
  {
    id: "would-you-rather",

    icon: "⚖️",

    label: "Easy Starter",

    title: "Would You Rather for Couples",

    href: "/would-you-rather-questions-for-couples",

    description:
      "Choose between two fun options, compare your answers, and use the differences to start conversations you probably would not have had otherwise.",

    bestFor:
      "Breaking the ice and getting the night started",

    time:
      "10–20 minutes",

    howToPlay:
      "Take turns answering Would You Rather questions. Before revealing your choice, guess what your partner will pick and explain why you chose your answer.",
  },

  {
    id: "this-or-that",

    icon: "↔️",

    label: "Quick Game",

    title: "This or That for Couples",

    href: "/this-or-that-for-couples",

    description:
      "Compare quick preferences like beach or mountains, staying in or going out, and breakfast dates or late-night snacks.",

    bestFor:
      "Fast, low-pressure date nights",

    time:
      "5–15 minutes",

    howToPlay:
      "Pick a category and answer each This or That question together. When your answers are different, ask one follow-up question before moving on.",
  },

  {
    id: "couple-questions",

    icon: "💬",

    label: "Conversation",

    title: "Questions to Ask Your Partner",

    href: "/couple-questions",

    description:
      "Pick from fun, deep, relationship, and future questions when you want a date night that feels more like a real conversation than a game.",

    bestFor:
      "Deeper conversations and relaxed nights at home",

    time:
      "15–45 minutes",

    howToPlay:
      "Choose a category or use the random question picker. Take turns answering, and spend more time on the questions that lead somewhere interesting.",
  },

  {
    id: "couple-quiz",

    icon: "🧠",

    label: "Partner Quiz",

    title: "How Well Do You Know Your Partner?",

    href: "/couple-quiz",

    description:
      "Predict how your partner will answer 20 questions, then compare your predictions with their real answers to see how well you know each other.",

    bestFor:
      "Competitive couples and playful challenges",

    time:
      "10–20 minutes",

    howToPlay:
      "One partner predicts the other person's answers first. Then hand over the device, let your partner answer, and compare the results at the end.",
  },

  {
    id: "compatibility",

    icon: "💞",

    label: "Just for Fun",

    title: "Couple Compatibility Test",

    href: "/couple-compatibility-test",

    description:
      "Compare your preferences across everyday life, habits, future plans, and relationship choices to see where your answers match.",

    bestFor:
      "Ending the night with a fun result",

    time:
      "10–15 minutes",

    howToPlay:
      "Both partners answer the same set of questions. Your score shows how often your preferences match and gives you topics to talk about afterward.",
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqItems = [
  {
    question:
      "What are some good date night games for couples?",

    answer:
      "Good date night games include Would You Rather, This or That, couple questions, partner quizzes, and compatibility games. The best choice depends on whether you want something funny, competitive, quick, or more conversational.",
  },

  {
    question:
      "What games can couples play at home for date night?",

    answer:
      "Couples can play browser-based question games, quizzes, preference games, and conversation games at home without buying a board game or preparing special equipment.",
  },

  {
    question:
      "Can we play these date night games online?",

    answer:
      "Yes. TwoLumi games work directly in a web browser, so couples can play on a phone, tablet, laptop, or desktop without downloading an app.",
  },

  {
    question:
      "Do we need to pay to play TwoLumi date night games?",

    answer:
      "No. The games and question collections listed on this page are currently free to use.",
  },

  {
    question:
      "Which date night game is best for couples who have been together a long time?",

    answer:
      "Couple Questions and the Partner Quiz are good choices for long-term couples because they can uncover new stories, preferences, memories, and future plans even when you already know each other well.",
  },

  {
    question:
      "Can long distance couples use these date night games?",

    answer:
      "Yes. Many of the games can be played while on a video call, and TwoLumi also has a dedicated long distance couple games page for couples using separate devices.",
  },
];

/* =========================================================
   Page
========================================================= */

export default function DateNightGamesPage() {
  /* =======================================================
     Structured Data
  ======================================================= */

  const webPageSchema = {
    "@context": "https://schema.org",

    "@type": "WebPage",

    name:
      "Free Date Night Games for Couples",

    url:
      "https://twolumi.com/date-night-games",

    description:
      "Free date night games for couples to play at home or online.",

    isPartOf: {
      "@type": "WebSite",

      name: "TwoLumi",

      url: "https://twolumi.com",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",

    "@type": "ItemList",

    name:
      "Date Night Games for Couples",

    numberOfItems:
      dateNightGames.length,

    itemListElement:
      dateNightGames.map(
        (game, index) => ({
          "@type": "ListItem",

          position: index + 1,

          name: game.title,

          url:
            `https://twolumi.com${game.href}`,
        })
      ),
  };

  const faqSchema = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity:
      faqItems.map(
        (item) => ({
          "@type": "Question",

          name: item.question,

          acceptedAnswer: {
            "@type": "Answer",

            text: item.answer,
          },
        })
      ),
  };

  return (
    <main className="date-night-page">

      {/* ===================================================
          Structured Data
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              webPageSchema
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              itemListSchema
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              faqSchema
            ),
        }}
      />

      <div className="container">

        {/* =================================================
            HERO
        ================================================= */}

        <header className="date-night-hero">

          <div className="game-kicker">
            Date Night
          </div>

          <h1>
            Free Date Night Games for Couples
          </h1>

          <p className="date-night-lead">
            Free date night games for couples to play at home or
            online. Pick a quick game, test how well you know each
            other, or start a better conversation together.
          </p>

        </header>

        {/* =================================================
            PRODUCT FIRST
        ================================================= */}

        <section
          className="date-night-picker"
          aria-labelledby="date-night-picker-title"
        >

          <div className="date-night-section-heading">

            <div>

              <div className="game-kicker">
                Start Here
              </div>

              <h2 id="date-night-picker-title">
                Pick a Game for Tonight
              </h2>

              <p>
                No setup, no downloads,
                and no complicated rules.
                Choose the kind of date
                night you want and start
                playing.
              </p>

            </div>

            <span className="date-night-count">
              5 Games
            </span>

          </div>

          <div className="date-night-quick-grid">

            {dateNightGames.map(
              (game) => (
                <Link
                  key={game.id}
                  href={game.href}
                  className="date-night-quick-card"
                >

                  <span className="date-night-quick-icon">
                    {game.icon}
                  </span>

                  <span className="date-night-card-label">
                    {game.label}
                  </span>

                  <h3>
                    {game.title}
                  </h3>

                  <p>
                    {game.bestFor}
                  </p>

                  <strong>
                    Play →
                  </strong>

                </Link>
              )
            )}

          </div>

        </section>

        {/* =================================================
            SEO INTRO
        ================================================= */}

        <section className="date-night-intro">

          <div className="date-night-intro-copy">

            <div className="game-kicker">
              Couple Game Night
            </div>

            <h2>
              Date Night Games That Give
              You Something to Do Together
            </h2>

            <p>
              A date night does not need
              an expensive restaurant,
              complicated plan, or a new
              board game. Sometimes the
              easiest way to make an
              ordinary evening feel
              different is to give both
              of you something playful to
              react to.
            </p>

            <p>
              These date night games for
              couples are designed to
              work with very little
              preparation. You can play
              them on the couch, over
              dinner, during a quiet
              evening at home, or while
              talking online.
            </p>

          </div>

          <div className="date-night-benefits">

            <span>
              ✓ Free to play
            </span>

            <span>
              ✓ No signup
            </span>

            <span>
              ✓ Works in a browser
            </span>

            <span>
              ✓ Good for two people
            </span>

          </div>

        </section>

        {/* =================================================
            BEST DATE NIGHT GAMES
        ================================================= */}

        <section className="date-night-section">

          <div className="date-night-section-heading">

            <div>

              <div className="game-kicker">
                Our Picks
              </div>

              <h2>
                Best Date Night Games for Couples
              </h2>

              <p>
                Start with the mood you
                want tonight: funny,
                relaxed, competitive, or
                more meaningful.
              </p>

            </div>

          </div>

          <div className="date-night-game-list">

            {dateNightGames.map(
              (game, index) => (
                <article
                  key={game.id}
                  className="date-night-game-detail"
                >

                  <div className="date-night-game-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div className="date-night-game-detail-main">

                    <div className="date-night-game-detail-top">

                      <div>

                        <span className="date-night-card-label">
                          {game.label}
                        </span>

                        <h3>
                          {game.title}
                        </h3>

                      </div>

                      <span className="date-night-game-icon">
                        {game.icon}
                      </span>

                    </div>

                    <p className="date-night-game-description">
                      {game.description}
                    </p>

                    <div className="date-night-game-meta">

                      <span>
                        <strong>
                          Best for:
                        </strong>{" "}
                        {game.bestFor}
                      </span>

                      <span>
                        <strong>
                          Time:
                        </strong>{" "}
                        {game.time}
                      </span>

                    </div>

                    <div className="date-night-how-to">

                      <strong>
                        How to play
                      </strong>

                      <p>
                        {game.howToPlay}
                      </p>

                    </div>

                    <Link
                      href={game.href}
                      className="btn-primary"
                    >
                      Play {game.title} →
                    </Link>

                  </div>

                </article>
              )
            )}

          </div>

        </section>

        {/* =================================================
            AT HOME LONG-TAIL
        ================================================= */}

        <section className="date-night-section date-night-soft-section">

          <div className="date-night-section-heading">

            <div>

              <div className="game-kicker">
                Stay-In Date
              </div>

              <h2>
                Date Night Games to Play at Home
              </h2>

              <p>
                If you are staying in,
                you do not need much to
                turn a normal evening
                into a date. Pick one
                simple activity and make
                it the focus for twenty
                minutes.
              </p>

            </div>

          </div>

          <div className="date-night-at-home-grid">

            <article>

              <span>
                01
              </span>

              <h3>
                Start with quick choices
              </h3>

              <p>
                Use{" "}
                <Link href="/this-or-that-for-couples">
                  This or That
                </Link>{" "}
                when you want something
                easy while eating,
                relaxing on the couch,
                or having a drink
                together.
              </p>

            </article>

            <article>

              <span>
                02
              </span>

              <h3>
                Turn answers into stories
              </h3>

              <p>
                Pick a few{" "}
                <Link href="/couple-questions">
                  questions to ask your partner
                </Link>{" "}
                and do not rush to the
                next one when an answer
                becomes interesting.
              </p>

            </article>

            <article>

              <span>
                03
              </span>

              <h3>
                Add a little competition
              </h3>

              <p>
                Try the{" "}
                <Link href="/couple-quiz">
                  Couple Quiz
                </Link>{" "}
                and predict your
                partner&apos;s answers
                before they reveal what
                they actually chose.
              </p>

            </article>

            <article>

              <span>
                04
              </span>

              <h3>
                Finish with a result
              </h3>

              <p>
                End the night with the{" "}
                <Link href="/couple-compatibility-test">
                  Couple Compatibility Test
                </Link>{" "}
                and compare where your
                preferences match.
              </p>

            </article>

          </div>

        </section>

        {/* =================================================
            MAKE IT FEEL LIKE A DATE
        ================================================= */}

        <section className="date-night-section">

          <div className="date-night-section-heading">

            <div>

              <div className="game-kicker">
                Make It a Date
              </div>

              <h2>
                How to Make a Simple Game Night
                Feel Like a Date
              </h2>

            </div>

          </div>

          <div className="date-night-tips-grid">

            <article>

              <h3>
                Put away distractions
              </h3>

              <p>
                If possible, stop checking
                messages for a little
                while. The game works
                better when both people
                are actually paying
                attention to the answers.
              </p>

            </article>

            <article>

              <h3>
                Take turns choosing
              </h3>

              <p>
                Let one person choose the
                first game and the other
                choose the next. It keeps
                the night from feeling
                like one person planned
                everything.
              </p>

            </article>

            <article>

              <h3>
                Ask one follow-up question
              </h3>

              <p>
                The most interesting part
                often happens after the
                official question. When
                something surprises you,
                ask why before moving on.
              </p>

            </article>

            <article>

              <h3>
                Do not try to finish everything
              </h3>

              <p>
                Ten good questions can be
                a better date than racing
                through one hundred. Stop
                when the conversation is
                working.
              </p>

            </article>

          </div>

        </section>

        {/* =================================================
            ONLINE / LONG DISTANCE
        ================================================= */}

        <section className="date-night-long-distance">

          <div>

            <div className="game-kicker">
              Different Places?
            </div>

            <h2>
              Planning an Online Date Night?
            </h2>

            <p>
              Most TwoLumi games work
              well during a video call.
              If you and your partner are
              in different places, try
              our dedicated long distance
              couple games and question
              collections.
            </p>

          </div>

          <div className="date-night-long-distance-actions">

            <Link
              href="/long-distance-couple-games"
              className="btn-primary"
            >
              Long Distance Couple Games →
            </Link>

            <Link
              href="/questions-for-long-distance-couples"
              className="btn-secondary"
            >
              Long Distance Questions
            </Link>

          </div>

        </section>

        {/* =================================================
            RELATED / INTERNAL LINKS
        ================================================= */}

        <section className="date-night-section">

          <div className="date-night-section-heading">

            <div>

              <div className="game-kicker">
                Keep Playing
              </div>

              <h2>
                More Couple Games
              </h2>

              <p>
                Not sure what kind of
                game you want? Browse
                everything available on
                TwoLumi.
              </p>

            </div>

          </div>

          <div className="date-night-related-grid">

            <Link
              href="/games"
              className="date-night-related-card"
            >

              <span>
                🎮
              </span>

              <h3>
                All Couple Games
              </h3>

              <p>
                Browse all TwoLumi games,
                quizzes, and question
                collections.
              </p>

            </Link>

            <Link
              href="/couple-questions"
              className="date-night-related-card"
            >

              <span>
                💬
              </span>

              <h3>
                Questions to Ask Your Partner
              </h3>

              <p>
                Browse 100 fun, deep,
                relationship, and future
                questions.
              </p>

            </Link>

            <Link
              href="/would-you-rather-questions-for-couples"
              className="date-night-related-card"
            >

              <span>
                ⚖️
              </span>

              <h3>
                Would You Rather
              </h3>

              <p>
                Compare funny choices and
                discover where your
                answers match.
              </p>

            </Link>

          </div>

        </section>

        {/* =================================================
            FAQ
        ================================================= */}

        <section className="date-night-section">

          <div className="date-night-section-heading">

            <div>

              <div className="game-kicker">
                FAQ
              </div>

              <h2>
                Date Night Games FAQ
              </h2>

            </div>

          </div>

          <div className="date-night-faq">

            {faqItems.map(
              (item) => (
                <article
                  key={item.question}
                  className="date-night-faq-item"
                >

                  <h3>
                    {item.question}
                  </h3>

                  <p>
                    {item.answer}
                  </p>

                </article>
              )
            )}

          </div>

        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="date-night-final-cta">

          <div className="game-kicker">
            Tonight&apos;s Plan
          </div>

          <h2>
            Pick One Game and Start Playing
          </h2>

          <p>
            You do not need to plan the
            perfect date night. Pick one
            game, give each other your
            attention, and see where the
            conversation goes.
          </p>

          <div className="hero-actions">

            <Link
              href="/would-you-rather-questions-for-couples"
              className="btn-primary"
            >
              Start With Would You Rather →
            </Link>

            <Link
              href="/games"
              className="btn-secondary"
            >
              Browse All Games
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}