import type { Metadata } from "next";
import Link from "next/link";

import PlayTogetherCTA from "@/components/PlayTogetherCTA";

/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "Long Distance Couple Games Online | Play Together",

  description:
    "Play free online games for long distance couples. Create a private room, share a code with your partner, answer the same questions, and reveal your choices together.",

  alternates: {
    canonical:
      "https://twolumi.com/long-distance-couple-games",
  },

  openGraph: {
    title:
      "Long Distance Couple Games Online | TwoLumi",

    description:
      "Free games for long distance couples. Create a private TwoLumi room and play together from different devices.",

    url:
      "https://twolumi.com/long-distance-couple-games",

    type:
      "website",
  },
};

/* =========================================================
   FAQ
========================================================= */

const faqItems = [
  {
    question:
      "What games can long distance couples play online?",

    answer:
      "Long distance couples can play question games, Would You Rather, This or That, couple quizzes, compatibility games, and conversation games. TwoLumi also lets couples create a private room and answer the same questions from separate devices.",
  },

  {
    question:
      "Do both people need a TwoLumi account?",

    answer:
      "No. TwoLumi does not require an account to create or join a private game room. One partner creates a room and shares the six-character room code.",
  },

  {
    question:
      "Can we play on different phones or computers?",

    answer:
      "Yes. TwoLumi private rooms are designed for two people using separate devices. Both partners receive the same questions and the answers are revealed after both people choose.",
  },

  {
    question:
      "Are TwoLumi long distance couple games free?",

    answer:
      "Yes. The current TwoLumi couple games and private room experience are free to play in the browser.",
  },

  {
    question:
      "Do we need to install an app?",

    answer:
      "No. TwoLumi works directly in a web browser, so you can play from a phone, tablet, laptop, or desktop without installing an app.",
  },
];

/* =========================================================
   Page
========================================================= */

export default function LongDistanceCoupleGamesPage() {
  /* =======================================================
     FAQ Schema
  ======================================================= */

  const faqSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "FAQPage",

    mainEntity:
      faqItems.map(
        (item) => ({
          "@type":
            "Question",

          name:
            item.question,

          acceptedAnswer: {
            "@type":
              "Answer",

            text:
              item.answer,
          },
        })
      ),
  };

  return (
    <main className="ld-page">

      {/* ===================================================
          FAQ Structured Data
      =================================================== */}

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

        <section className="ld-hero">

          <div className="ld-hero-copy">

            <div className="game-kicker">
              Long Distance Couples
            </div>

            <h1>
              Long Distance Couple Games
              You Can Actually Play Together
            </h1>

            <p className="ld-lead">
              Looking for online games
              for long distance couples?
              TwoLumi lets you play
              together from different
              devices without
              downloading an app or
              creating an account.
            </p>

            <p className="ld-sublead">
              Create a private room,
              send the code to your
              partner, answer the same
              questions, and reveal
              your choices together.
            </p>

            <div className="ld-hero-points">

              <span>
                ✓ Two separate devices
              </span>

              <span>
                ✓ No signup
              </span>

              <span>
                ✓ Private room code
              </span>

              <span>
                ✓ Instant answer reveal
              </span>

            </div>

            <div className="hero-actions">

              <a
                href="#play-together"
                className="btn-primary"
              >
                Play Together →
              </a>

              <a
                href="#games"
                className="btn-secondary"
              >
                See Couple Games
              </a>

            </div>

          </div>

          {/* ===============================================
              Product Preview
          =============================================== */}

          <div className="ld-room-preview">

            <div className="ld-preview-icon">
              ♥
            </div>

            <div className="game-kicker">
              Made for Two
            </div>

            <h2>
              One Room.
              <br />
              Two Devices.
            </h2>

            <div className="ld-preview-flow">

              <div>
                <span>
                  1
                </span>

                Create a room
              </div>

              <div>
                <span>
                  2
                </span>

                Share the code
              </div>

              <div>
                <span>
                  3
                </span>

                Answer together
              </div>

              <div>
                <span>
                  4
                </span>

                Reveal your choices
              </div>

            </div>

            <div className="micro-copy">
              Works in your browser · No app required
            </div>

          </div>

        </section>

        {/* =================================================
            PLAY TOGETHER CTA
        ================================================= */}

        <section
          id="play-together"
          className="ld-section"
        >

          <div className="ld-section-heading">

            <div className="game-kicker">
              Start Here
            </div>

            <h2>
              Play a Long Distance Couple Game Now
            </h2>

            <p>
              Would You Rather is
              currently available as a
              synchronized TwoLumi
              multiplayer game. Both of
              you see the same random
              questions, but neither
              person can see the
              other&apos;s choice until
              both have answered.
            </p>

          </div>

          <PlayTogetherCTA
            source="long_distance_couple_games_page"
          />

        </section>

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section className="ld-section">

          <div className="ld-section-heading">

            <div className="game-kicker">
              How TwoLumi Works
            </div>

            <h2>
              A Simple Couple Game for Two Phones
            </h2>

            <p>
              You do not need to screen
              share, install an app, or
              manually count down your
              answers.
            </p>

          </div>

          <div className="ld-steps">

            <article className="ld-step-card">

              <div className="ld-step-number">
                01
              </div>

              <h3>
                Create a Private Room
              </h3>

              <p>
                One person creates a
                TwoLumi room. A
                temporary six-character
                room code is generated
                instantly.
              </p>

            </article>

            <article className="ld-step-card">

              <div className="ld-step-number">
                02
              </div>

              <h3>
                Send the Code
              </h3>

              <p>
                Share the room code
                with your partner
                through WhatsApp,
                Messenger, iMessage,
                Discord, or any chat
                app.
              </p>

            </article>

            <article className="ld-step-card">

              <div className="ld-step-number">
                03
              </div>

              <h3>
                Answer the Same Question
              </h3>

              <p>
                Both partners see the
                same question on their
                own device and choose
                an answer independently.
              </p>

            </article>

            <article className="ld-step-card">

              <div className="ld-step-number">
                04
              </div>

              <h3>
                Reveal Together
              </h3>

              <p>
                Your answers stay
                hidden until both
                people choose. Then
                TwoLumi reveals whether
                you matched.
              </p>

            </article>

          </div>

        </section>

        {/* =================================================
            GAME LIST
        ================================================= */}

        <section
          id="games"
          className="ld-section"
        >

          <div className="ld-section-heading">

            <div className="game-kicker">
              Games for Long Distance Couples
            </div>

            <h2>
              Fun Online Couple Games to Try
            </h2>

            <p>
              Some work best as a
              synchronized TwoLumi
              room, while others are
              easy to play together
              over a video call or
              chat.
            </p>

          </div>

          <div className="ld-game-grid">

            {/* ===============================================
                Game 1
            =============================================== */}

            <article className="ld-game-card ld-featured-game">

              <div className="ld-game-tag">
                Multiplayer
              </div>

              <div className="ld-game-icon">
                ⚖️
              </div>

              <h3>
                Would You Rather for Couples
              </h3>

              <p>
                Choose between two
                options and find out
                whether your partner
                picked the same one.
                TwoLumi keeps both
                answers hidden until
                you are ready to
                reveal.
              </p>

              <div className="ld-game-meta">

                <span>
                  12 questions per game
                </span>

                <span>
                  Two devices
                </span>

              </div>

              <Link
                href="/would-you-rather-questions-for-couples"
                className="ld-text-link"
              >
                Play Would You Rather →
              </Link>

            </article>

            {/* ===============================================
                Game 2
            =============================================== */}

            <article className="ld-game-card">

              <div className="ld-game-tag">
                Quick Game
              </div>

              <div className="ld-game-icon">
                ↔️
              </div>

              <h3>
                This or That for Couples
              </h3>

              <p>
                Coffee or tea? Beach or
                mountains? Movie night
                or game night? Compare
                quick choices and learn
                your partner&apos;s
                preferences.
              </p>

              <Link
                href="/this-or-that-for-couples"
                className="ld-text-link"
              >
                Play This or That →
              </Link>

            </article>

            {/* ===============================================
                Game 3
            =============================================== */}

            <article className="ld-game-card">

              <div className="ld-game-tag">
                Conversation
              </div>

              <div className="ld-game-icon">
                💬
              </div>

              <h3>
                Couple Questions
              </h3>

              <p>
                Turn a normal video
                call into a better
                conversation with fun,
                deep, and meaningful
                questions for couples.
              </p>

              <Link
                href="/couple-questions"
                className="ld-text-link"
              >
                Try Couple Questions →
              </Link>

            </article>

            {/* ===============================================
                Game 4
            =============================================== */}

            <article className="ld-game-card">

              <div className="ld-game-tag">
                Quiz
              </div>

              <div className="ld-game-icon">
                🧠
              </div>

              <h3>
                How Well Do You Know Your Partner?
              </h3>

              <p>
                Predict your
                partner&apos;s answers
                to 20 questions, then
                compare your
                predictions with their
                real choices.
              </p>

              <Link
                href="/couple-quiz"
                className="ld-text-link"
              >
                Take the Couple Quiz →
              </Link>

            </article>

            {/* ===============================================
                Game 5
            =============================================== */}

            <article className="ld-game-card">

              <div className="ld-game-tag">
                Just for Fun
              </div>

              <div className="ld-game-icon">
                💞
              </div>

              <h3>
                Couple Compatibility Test
              </h3>

              <p>
                Compare your
                preferences and see
                where you match. The
                result is designed for
                entertainment, not as a
                serious relationship
                assessment.
              </p>

              <Link
                href="/couple-compatibility-test"
                className="ld-text-link"
              >
                Try the Compatibility Test →
              </Link>

            </article>

            {/* ===============================================
                Game 6
            =============================================== */}

            <article className="ld-game-card">

              <div className="ld-game-tag">
                Date Idea
              </div>

              <div className="ld-game-icon">
                🌙
              </div>

              <h3>
                Virtual Date Night Games
              </h3>

              <p>
                Use simple browser
                games and couple
                questions to make a
                long distance date
                night feel more
                intentional.
              </p>

              <Link
                href="/date-night-games"
                className="ld-text-link"
              >
                Explore Date Night Games →
              </Link>

            </article>

          </div>

        </section>

        {/* =================================================
            NEW INTERNAL LINK CTA
            Long Distance Games
            → Long Distance Questions
        ================================================= */}

        <section className="ld-section ld-soft-section">

          <div className="ld-section-heading">

            <div className="game-kicker">
              Keep Talking
            </div>

            <h2>
              100 Questions for Long Distance Couples
            </h2>

            <p>
              Want something slower
              than a game? Try
              questions designed for
              video calls, daily
              check-ins, deeper
              conversations, funny
              moments, and future plans.
            </p>

          </div>

          <div className="hero-actions">

            <Link
              href="/questions-for-long-distance-couples"
              className="btn-primary"
            >
              Explore Long Distance Questions →
            </Link>

            <Link
              href="/couple-questions"
              className="btn-secondary"
            >
              Browse All Couple Questions
            </Link>

          </div>

        </section>

        {/* =================================================
            WHY IT WORKS
        ================================================= */}

        <section className="ld-section ld-soft-section">

          <div className="ld-section-heading">

            <div className="game-kicker">
              More Than Texting
            </div>

            <h2>
              Why Games Help Long Distance Couples
              Stay Connected
            </h2>

          </div>

          <div className="ld-benefit-grid">

            <article>

              <h3>
                Give video calls something to do
              </h3>

              <p>
                A call can become
                repetitive when every
                conversation starts
                with &quot;How was your
                day?&quot; A simple
                game gives both of you
                a shared activity.
              </p>

            </article>

            <article>

              <h3>
                Discover unexpected differences
              </h3>

              <p>
                Small questions about
                travel, routines, food,
                and future plans often
                create more interesting
                conversations than
                serious relationship
                prompts.
              </p>

            </article>

            <article>

              <h3>
                Make distance feel interactive
              </h3>

              <p>
                Synchronized games make
                both people participate
                at the same time instead
                of one person simply
                sending a list of
                questions in chat.
              </p>

            </article>

          </div>

        </section>

        {/* =================================================
            LONG DISTANCE DATE IDEAS
        ================================================= */}

        <section className="ld-section">

          <div className="ld-section-heading">

            <div className="game-kicker">
              Virtual Date Ideas
            </div>

            <h2>
              Ways to Turn TwoLumi Into a Long
              Distance Date
            </h2>

          </div>

          <div className="ld-idea-list">

            <div>

              <strong>
                Video call + Would You Rather
              </strong>

              <p>
                Keep a call open while
                you play a TwoLumi room
                and explain your choices
                after every reveal.
              </p>

            </div>

            <div>

              <strong>
                Ten-minute lunch-break game
              </strong>

              <p>
                Create a room when you
                only have a few minutes
                together. A short round
                works better than
                planning a full virtual
                date every time.
              </p>

            </div>

            <div>

              <strong>
                Weekend question night
              </strong>

              <p>
                Mix Would You Rather
                with Couple Questions
                and use interesting
                answers as conversation
                starters.
              </p>

            </div>

            <div>

              <strong>
                Compare your predictions
              </strong>

              <p>
                Before revealing, guess
                which answer your
                partner chose. It adds
                another playful layer
                to the game.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            FAQ
        ================================================= */}

        <section className="ld-section">

          <div className="ld-section-heading">

            <div className="game-kicker">
              FAQ
            </div>

            <h2>
              Long Distance Couple Games FAQ
            </h2>

          </div>

          <div className="ld-faq">

            {faqItems.map(
              (item) => (
                <article
                  key={
                    item.question
                  }
                  className="ld-faq-item"
                >

                  <h3>
                    {
                      item.question
                    }
                  </h3>

                  <p>
                    {
                      item.answer
                    }
                  </p>

                </article>
              )
            )}

          </div>

        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="ld-final-cta">

          <div className="game-kicker">
            Ready to Play?
          </div>

          <h2>
            Make Your Next Long Distance Call
            More Fun
          </h2>

          <p>
            Start with a private Would
            You Rather room, send the
            code to your partner, and
            see how often your answers
            match.
          </p>

          <div className="hero-actions">

            <a
              href="#play-together"
              className="btn-primary"
            >
              Create a Couple Room →
            </a>

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