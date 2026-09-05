import type {
  Metadata,
} from "next";

import Link from "next/link";

import GamePageLayout from "@/components/GamePageLayout";

import PlayTogetherCTA from "@/components/PlayTogetherCTA";

import BackToGames from "@/components/BackToGames";

import RandomWouldYouRatherGame from "@/components/RandomWouldYouRatherGame";

import {
  wouldYouRatherBank,
} from "@/data/wouldYouRatherBank";

/*
 * ==============================
 * SEO Metadata
 * ==============================
 */

export const metadata:
  Metadata = {
  title:
    "60 Would You Rather Questions for Couples | Free Online Game",

  description:
    "Play 60 fun Would You Rather questions for couples. Try a random online game on one device or create a private room and play together.",

  alternates: {
    canonical:
      "https://twolumi.com/would-you-rather-questions-for-couples",
  },

  openGraph: {
    title:
      "60 Would You Rather Questions for Couples | TwoLumi",

    description:
      "Fun Would You Rather questions for couples. Play on one device or create a private TwoLumi room and reveal your answers together.",

    url:
      "https://twolumi.com/would-you-rather-questions-for-couples",

    type:
      "website",
  },
};

/*
 * ==============================
 * FAQ
 * ==============================
 */

const faqItems = [
  {
    question:
      "What are good Would You Rather questions for couples?",

    answer:
      "Good Would You Rather questions for couples are easy to answer but interesting enough to start a conversation. Questions about travel, food, habits, date nights, future plans, and everyday preferences usually work well.",
  },

  {
    question:
      "How do you play Would You Rather as a couple?",

    answer:
      "Read two choices and have both partners pick one. You can take turns on one device or create a private TwoLumi room so both people answer separately and reveal their choices together.",
  },

  {
    question:
      "Can long distance couples play Would You Rather online?",

    answer:
      "Yes. TwoLumi lets one person create a private room and share a six-character code with their partner. Both people can then answer the same questions from separate devices.",
  },

  {
    question:
      "How many questions are in the TwoLumi Would You Rather game?",

    answer:
      "The current TwoLumi question bank contains 60 Would You Rather questions for couples. The solo game randomly selects 16 questions per session, while a multiplayer room uses 12 questions per game.",
  },

  {
    question:
      "Is TwoLumi free to use?",

    answer:
      "Yes. The current TwoLumi Would You Rather game and private multiplayer rooms are free to play in a web browser and do not require an account.",
  },
];

/*
 * ==============================
 * Page
 * ==============================
 */

export default function Page() {
  /*
   * FAQ structured data
   */
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
    <GamePageLayout
      kicker="Couple Game"
      title="Would You Rather Questions for Couples"
      description="Pick a side, compare answers, and discover the funny little differences between you with 60 fun Would You Rather questions made for couples."
    >

      {/* ==============================
          Structured Data
      ============================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              faqSchema
            ),
        }}
      />

      {/* ==============================
          Intro
      ============================== */}

      <section className="wyr-intro">

        <p>
          Would You Rather is one
          of the easiest couple
          games to play because
          there are no complicated
          rules. You simply choose
          between two options and
          compare your answer with
          your partner.
        </p>

        <p>
          TwoLumi gives you two
          ways to play: use one
          device together for a
          quick date-night game,
          or create a private room
          and answer from separate
          devices.
        </p>

      </section>

      {/* ==============================
          Multiplayer
      ============================== */}

      <PlayTogetherCTA
        entryPoint="would_you_rather_page"
      />

      {/* ==============================
          Two modes
      ============================== */}

      <section className="wyr-mode-grid">

        <article className="wyr-mode-card">

          <div className="wyr-mode-icon">
            📱
          </div>

          <div>
            <div className="game-kicker">
              Same Place
            </div>

            <h2>
              Play on One Device
            </h2>

            <p>
              Sitting together?
              Use the random game
              below. TwoLumi selects
              16 questions from the
              full 60-question bank
              each time you play.
            </p>
          </div>

        </article>

        <article className="wyr-mode-card">

          <div className="wyr-mode-icon">
            💞
          </div>

          <div>
            <div className="game-kicker">
              Long Distance
            </div>

            <h2>
              Play on Two Devices
            </h2>

            <p>
              Create a private room,
              send your partner the
              six-character code,
              and answer the same
              12 random questions.
              Your choices stay hidden
              until both of you answer.
            </p>
          </div>

        </article>

      </section>

      {/* ==============================
          Random Solo Game
      ============================== */}

      <RandomWouldYouRatherGame />

      {/* ==============================
          Ad-friendly separator
      ============================== */}

      <div
        className="ad-slot"
        aria-label="Advertisement"
      >
        Sponsored · Would You Rather content slot
      </div>

      {/* ==============================
          SEO Question Bank
      ============================== */}

      <section
        className="wyr-question-bank"
        id="would-you-rather-question-list"
      >

        <div className="wyr-section-heading">

          <div className="game-kicker">
            Full Question List
          </div>

          <h2>
            60 Would You Rather Questions for Couples
          </h2>

          <p>
            Want to browse the
            questions instead of
            playing the random game?
            Here is the complete
            TwoLumi Would You Rather
            question bank for couples.
            Use them during a date,
            video call, road trip,
            or quiet night at home.
          </p>

        </div>

        <ol className="wyr-question-list">

          {wouldYouRatherBank.map(
            (
              question,
              index
            ) => (
              <li
                key={
                  question.id
                }
                className="wyr-question-item"
              >

                <div className="wyr-question-number">
                  {index + 1}
                </div>

                <div className="wyr-question-copy">

                  <span>
                    Would you rather
                  </span>

                  <strong>
                    {question.a}
                  </strong>

                  <em>
                    or
                  </em>

                  <strong>
                    {question.b}?
                  </strong>

                </div>

              </li>
            )
          )}

        </ol>

      </section>

      {/* ==============================
          How to Play
      ============================== */}

      <section className="wyr-content-section">

        <div className="wyr-section-heading">

          <div className="game-kicker">
            How to Play
          </div>

          <h2>
            How to Play Would You Rather With Your Partner
          </h2>

        </div>

        <div className="wyr-how-grid">

          <article>

            <span>
              01
            </span>

            <h3>
              Read both choices
            </h3>

            <p>
              Each question gives
              you two options.
              There is no right or
              wrong answer.
            </p>

          </article>

          <article>

            <span>
              02
            </span>

            <h3>
              Pick independently
            </h3>

            <p>
              Choose the option
              that feels more true
              to you instead of
              trying to predict
              your partner.
            </p>

          </article>

          <article>

            <span>
              03
            </span>

            <h3>
              Compare answers
            </h3>

            <p>
              Find out whether you
              matched and ask why
              your partner chose
              their answer.
            </p>

          </article>

          <article>

            <span>
              04
            </span>

            <h3>
              Keep the conversation going
            </h3>

            <p>
              The best questions
              often lead to stories,
              future plans, or
              surprisingly funny
              disagreements.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          Why Couples Like It
      ============================== */}

      <section className="wyr-content-section wyr-soft-section">

        <div className="wyr-section-heading">

          <div className="game-kicker">
            Easy Couple Game
          </div>

          <h2>
            Why Would You Rather Works So Well for Couples
          </h2>

          <p>
            A good couple game does
            not need complicated
            scoring. Sometimes a
            simple choice is enough
            to reveal something you
            never thought to ask.
          </p>

        </div>

        <div className="wyr-benefit-grid">

          <article>

            <h3>
              Great for date night
            </h3>

            <p>
              Use a few questions
              between dinner,
              drinks, or a movie
              instead of planning
              an entire game night.
            </p>

          </article>

          <article>

            <h3>
              Works long distance
            </h3>

            <p>
              TwoLumi private rooms
              let both partners
              answer the same
              questions from
              different devices.
            </p>

          </article>

          <article>

            <h3>
              Starts real conversations
            </h3>

            <p>
              Questions about
              travel, habits,
              lifestyle, and future
              plans naturally create
              follow-up conversations.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          Related Games
      ============================== */}

      <section className="wyr-content-section">

        <div className="wyr-section-heading">

          <div className="game-kicker">
            More Couple Games
          </div>

          <h2>
            Try Another Game Together
          </h2>

        </div>

        <div className="wyr-related-grid">

          <Link
            href="/this-or-that-for-couples"
            className="wyr-related-card"
          >

            <span>
              ↔️
            </span>

            <div>
              <h3>
                This or That for Couples
              </h3>

              <p>
                Quick choices for
                comparing everyday
                preferences.
              </p>
            </div>

          </Link>

          <Link
            href="/couple-questions"
            className="wyr-related-card"
          >

            <span>
              💬
            </span>

            <div>
              <h3>
                Couple Questions
              </h3>

              <p>
                Fun conversation
                starters for dates
                and quiet nights.
              </p>
            </div>

          </Link>

          <Link
            href="/couple-quiz"
            className="wyr-related-card"
          >

            <span>
              🧠
            </span>

            <div>
              <h3>
                Couple Quiz
              </h3>

              <p>
                See how well you
                really know each
                other.
              </p>
            </div>

          </Link>

          <Link
            href="/long-distance-couple-games"
            className="wyr-related-card"
          >

            <span>
              💞
            </span>

            <div>
              <h3>
                Long Distance Couple Games
              </h3>

              <p>
                Games made for
                couples playing
                from separate
                devices.
              </p>
            </div>

          </Link>

        </div>

      </section>

      <BackToGames />

      {/* ==============================
          FAQ
      ============================== */}

      <section className="wyr-content-section">

        <div className="wyr-section-heading">

          <div className="game-kicker">
            FAQ
          </div>

          <h2>
            Would You Rather Questions for Couples FAQ
          </h2>

        </div>

        <div className="wyr-faq">

          {faqItems.map(
            (item) => (
              <article
                key={
                  item.question
                }
                className="wyr-faq-item"
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

      {/* ==============================
          Final CTA
      ============================== */}

      <section className="wyr-final-cta">

        <div className="game-kicker">
          Play Together
        </div>

        <h2>
          Think You and Your Partner Will Pick the Same Answers?
        </h2>

        <p>
          Create a private
          TwoLumi room, send the
          code to your partner,
          and find out.
        </p>

        <div className="hero-actions">

          <a
            href="#solo-wyr-game"
            className="btn-secondary"
          >
            Play on One Device
          </a>

          <Link
            href="/long-distance-couple-games"
            className="btn-primary"
          >
            Play Long Distance →
          </Link>

        </div>

      </section>

    </GamePageLayout>
  );
}