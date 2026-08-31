import type { Metadata } from "next";
import Link from "next/link";

import GamePageLayout from "@/components/GamePageLayout";
import CompatibilityTest from "@/components/CompatibilityTest";
import BackToGames from "@/components/BackToGames";

/* ==============================
   SEO Metadata
============================== */

export const metadata: Metadata = {
  title:
    "Couple Compatibility Test: Are You Compatible?",

  description:
    "Take a free couple compatibility test with your partner. Compare 20 answers across lifestyle, future plans, everyday habits, and connection.",

  alternates: {
    canonical:
      "https://twolumi.com/couple-compatibility-test",
  },

  openGraph: {
    title:
      "Couple Compatibility Test: Are You Compatible? | TwoLumi",

    description:
      "Take a free relationship compatibility test together and compare how closely your preferences match across 20 questions.",

    url:
      "https://twolumi.com/couple-compatibility-test",

    type:
      "website",
  },
};

/* ==============================
   FAQ Content
============================== */

const faqItems = [
  {
    question:
      "Is this couple compatibility test free?",

    answer:
      "Yes. The TwoLumi couple compatibility test is free to use in your browser. No account or download is required.",
  },

  {
    question:
      "How does the relationship compatibility test work?",

    answer:
      "Both partners answer the same 20 questions separately. TwoLumi compares how close your answers are and calculates an overall score plus four category scores for lifestyle, future plans, fun and connection, and everyday habits.",
  },

  {
    question:
      "What is a good compatibility score for couples?",

    answer:
      "There is no scientifically meaningful good or bad score in this quiz. The score only reflects how similar your answers were. Differences can be useful conversation starters rather than signs that a relationship is good or bad.",
  },

  {
    question:
      "Can a relationship compatibility quiz tell if a relationship will work?",

    answer:
      "No. A compatibility quiz cannot predict whether a relationship will succeed. TwoLumi is designed for fun, comparison, and conversation rather than psychological or relationship assessment.",
  },

  {
    question:
      "Can long distance couples take this compatibility test?",

    answer:
      "Yes. Long distance couples can take turns answering while on a video call or use the test when they are together. TwoLumi also offers online games designed specifically for couples playing from separate devices.",
  },

  {
    question:
      "What does compatibility mean in a relationship?",

    answer:
      "Compatibility usually refers to how well two people's preferences, routines, goals, and communication styles fit together. Couples do not need to agree on everything to have a strong relationship.",
  },
];

/* ==============================
   Page
============================== */

export default function Page() {
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

  const applicationSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebApplication",

    name:
      "TwoLumi Couple Compatibility Test",

    url:
      "https://twolumi.com/couple-compatibility-test",

    applicationCategory:
      "EntertainmentApplication",

    operatingSystem:
      "Any",

    description:
      "A free online couple compatibility test that compares two partners' answers across lifestyle, future plans, everyday habits, and connection.",

    offers: {
      "@type":
        "Offer",

      price:
        "0",

      priceCurrency:
        "USD",
    },
  };

  return (
    <GamePageLayout
      kicker="Couple Quiz"
      title="Couple Compatibility Test"
      description="Take this free relationship compatibility test with your partner, answer 20 questions separately, and discover where your preferences match."
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              applicationSchema
            ),
        }}
      />

      {/* ==============================
          PRODUCT FIRST
          把真正测试直接放在H1下面
      ============================== */}

      <CompatibilityTest />

      {/* ==============================
          Short SEO Intro
          测试之后再解释，不挡住Start按钮
      ============================== */}

      <section className="compat-seo-intro compat-seo-intro-after-test">

        <p>
          TwoLumi compares your
          answers across lifestyle,
          future plans, everyday
          habits, and the ways you
          like to spend time
          together.
        </p>

        <p>
          This relationship
          compatibility test is
          designed for fun and
          conversation, not as a
          psychological assessment
          or prediction of whether
          your relationship will
          succeed.
        </p>

        <div className="compat-seo-pills">

          <span>
            20 questions
          </span>

          <span>
            4 categories
          </span>

          <span>
            2 partners
          </span>

          <span>
            Free
          </span>

          <span>
            No signup
          </span>

        </div>

      </section>

      {/* ==============================
          How It Works
      ============================== */}

      <section className="compat-seo-section">

        <div className="compat-seo-heading">

          <div className="game-kicker">
            How It Works
          </div>

          <h2>
            How the Couple Compatibility Test Works
          </h2>

          <p>
            Both partners answer the
            exact same questions
            independently. Your
            answers stay hidden until
            both people finish.
          </p>

        </div>

        <div className="compat-how-grid">

          <article>

            <span>
              01
            </span>

            <h3>
              Partner A answers
            </h3>

            <p>
              The first partner
              answers all 20
              compatibility
              questions without
              seeing anyone else's
              choices.
            </p>

          </article>

          <article>

            <span>
              02
            </span>

            <h3>
              Pass the device
            </h3>

            <p>
              Partner A's answers
              are hidden before
              Partner B begins the
              same set of questions.
            </p>

          </article>

          <article>

            <span>
              03
            </span>

            <h3>
              Compare preferences
            </h3>

            <p>
              TwoLumi measures how
              close your answers are
              rather than treating
              every difference as a
              complete mismatch.
            </p>

          </article>

          <article>

            <span>
              04
            </span>

            <h3>
              Explore your results
            </h3>

            <p>
              See an overall score
              plus separate results
              for four areas of
              everyday compatibility.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          Are We Compatible
      ============================== */}

      <section className="compat-seo-section compat-seo-soft">

        <div className="compat-seo-heading">

          <div className="game-kicker">
            Are We Compatible?
          </div>

          <h2>
            Take the Relationship Compatibility Quiz Together
          </h2>

          <p>
            An "are we compatible"
            quiz is most useful when
            it gives you something
            interesting to discuss,
            rather than pretending
            that one number can
            define your relationship.
          </p>

        </div>

        <div className="compat-explain-grid">

          <article>

            <div className="compat-explain-icon">
              🎯
            </div>

            <h3>
              Similar answers
            </h3>

            <p>
              Similar choices raise
              your score because they
              represent similar
              preferences on that
              question.
            </p>

          </article>

          <article>

            <div className="compat-explain-icon">
              ↔️
            </div>

            <h3>
              Close answers
            </h3>

            <p>
              You do not need to
              choose exactly the same
              option. Answers that
              are only one step apart
              still score highly.
            </p>

          </article>

          <article>

            <div className="compat-explain-icon">
              💬
            </div>

            <h3>
              Different answers
            </h3>

            <p>
              Differences are not
              treated as relationship
              problems. They are
              simply opportunities
              for conversation.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          Categories
      ============================== */}

      <section className="compat-seo-section">

        <div className="compat-seo-heading">

          <div className="game-kicker">
            Four Areas
          </div>

          <h2>
            Relationship Compatibility by Category
          </h2>

          <p>
            Instead of reducing
            everything to one number,
            TwoLumi shows how closely
            your preferences align in
            four different parts of
            everyday life.
          </p>

        </div>

        <div className="compat-category-info-grid">

          <article>

            <div className="compat-category-info-icon">
              🏡
            </div>

            <h3>
              Lifestyle
            </h3>

            <p>
              Compare preferences
              around social life,
              travel, where you like
              living, weekends, and
              how you enjoy spending
              money.
            </p>

          </article>

          <article>

            <div className="compat-category-info-icon">
              🌱
            </div>

            <h3>
              Future Plans
            </h3>

            <p>
              Explore how similarly
              you think about
              planning, career,
              finances, stability,
              and long-term goals.
            </p>

          </article>

          <article>

            <div className="compat-category-info-icon">
              💕
            </div>

            <h3>
              Fun &amp; Connection
            </h3>

            <p>
              Compare date-night
              preferences, shared
              hobbies, surprises,
              communication, and the
              ways you spend time
              together.
            </p>

          </article>

          <article>

            <div className="compat-category-info-icon">
              ☀️
            </div>

            <h3>
              Everyday Habits
            </h3>

            <p>
              Compare daily rhythm,
              organization, meals,
              planning habits, and
              how much personal time
              each person enjoys.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          Score Explanation
      ============================== */}

      <section className="compat-seo-section">

        <div className="compat-seo-heading">

          <div className="game-kicker">
            Your Score
          </div>

          <h2>
            What Does Your Compatibility Score Mean?
          </h2>

          <p>
            Your score only measures
            how similar your answers
            were in this particular
            quiz. It is not a measure
            of relationship quality.
          </p>

        </div>

        <div className="compat-score-bands">

          <article>

            <strong>
              85–100%
            </strong>

            <h3>
              💕 Great Match
            </h3>

            <p>
              You selected very
              similar preferences
              across most questions.
            </p>

          </article>

          <article>

            <strong>
              70–84%
            </strong>

            <h3>
              ❤️ Lots in Common
            </h3>

            <p>
              You share plenty of
              preferences with a few
              interesting differences.
            </p>

          </article>

          <article>

            <strong>
              50–69%
            </strong>

            <h3>
              ✨ A Fun Mix
            </h3>

            <p>
              Some preferences match
              closely while others
              give you something new
              to discuss.
            </p>

          </article>

          <article>

            <strong>
              0–49%
            </strong>

            <h3>
              💬 Plenty to Talk About
            </h3>

            <p>
              Your preferences differ
              more often, which can
              create interesting
              conversations about
              what each of you likes.
            </p>

          </article>

        </div>

        <div className="compat-score-note">

          <strong>
            Important:
          </strong>

          <p>
            There is no scientifically
            meaningful "good" or "bad"
            result in this test.
            Compatibility in real
            relationships involves far
            more than similarity on 20
            preference questions.
          </p>

        </div>

      </section>

      {/* ==============================
          Meaning of Compatibility
      ============================== */}

      <section className="compat-seo-section compat-seo-copy">

        <div className="game-kicker">
          Beyond the Score
        </div>

        <h2>
          What Does Relationship Compatibility Mean?
        </h2>

        <p>
          Relationship compatibility
          often describes how easily
          two people's lifestyles,
          expectations, routines, and
          preferences fit together.
          That does not mean compatible
          couples agree on everything.
        </p>

        <p>
          Two people can have very
          different hobbies or habits
          and still enjoy a strong
          relationship. What often
          matters more is how those
          differences are understood,
          discussed, and handled
          together.
        </p>

        <p>
          That is why TwoLumi uses this
          compatibility quiz as a
          conversation game rather than
          a relationship diagnosis.
          Similar answers can be fun to
          discover, while different
          answers often produce the
          better conversation.
        </p>

      </section>

      {/* ==============================
          Long Distance
      ============================== */}

      <section className="compat-long-distance">

        <div>

          <div className="game-kicker">
            Long Distance Couples
          </div>

          <h2>
            Taking the Test From Different Places?
          </h2>

          <p>
            You can take turns while
            on a video call, then use
            your results as
            conversation starters.
            TwoLumi also has games
            built specifically for
            couples playing from
            separate devices.
          </p>

          <Link
            href="/long-distance-couple-games"
            className="btn-secondary"
          >
            Explore Long Distance Games →
          </Link>

        </div>

        <div className="compat-long-distance-icon">
          💞
        </div>

      </section>

{/* ==============================
    Related Games
============================== */}

<section className="compat-seo-section">

  <div className="compat-seo-heading">

    <div className="game-kicker">
      More Couple Games
    </div>

    <h2>
      Keep Playing Together
    </h2>

    <p>
      Try another TwoLumi game,
      quiz, or question collection
      after comparing your
      compatibility results.
    </p>

  </div>

  <div className="compat-related-grid">

    {/* =================================
        Couple Quiz
    ================================= */}

    <Link
      href="/couple-quiz"
      className="compat-related-card"
    >

      <span>
        🧠
      </span>

      <div>

        <h3>
          How Well Do You Know Your Partner?
        </h3>

        <p>
          Predict your partner&apos;s
          answers and see how well
          you really know each other.
        </p>

      </div>

    </Link>

    {/* =================================
        Couple Questions
    ================================= */}

    <Link
      href="/couple-questions"
      className="compat-related-card"
    >

      <span>
        💬
      </span>

      <div>

        <h3>
          Questions to Ask Your Partner
        </h3>

        <p>
          Explore fun, deep, and
          meaningful questions for
          better conversations
          together.
        </p>

      </div>

    </Link>

    {/* =================================
        Would You Rather
    ================================= */}

    <Link
      href="/would-you-rather-questions-for-couples"
      className="compat-related-card"
    >

      <span>
        ⚖️
      </span>

      <div>

        <h3>
          Would You Rather for Couples
        </h3>

        <p>
          Pick between two choices
          and compare your answers
          together.
        </p>

      </div>

    </Link>

    {/* =================================
        All Games
    ================================= */}

    <Link
      href="/games"
      className="compat-related-card"
    >

      <span>
        🎮
      </span>

      <div>

        <h3>
          All Couple Games
        </h3>

        <p>
          Browse all free games,
          quizzes, and questions
          on TwoLumi.
        </p>

      </div>

    </Link>

  </div>

</section>

<BackToGames />
      {/* ==============================
          FAQ
      ============================== */}

      <section className="compat-seo-section">

        <div className="compat-seo-heading">

          <div className="game-kicker">
            FAQ
          </div>

          <h2>
            Couple Compatibility Test FAQ
          </h2>

        </div>

        <div className="compat-faq">

          {faqItems.map(
            (item) => (
              <article
                key={
                  item.question
                }
                className="compat-faq-item"
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

    </GamePageLayout>
  );
}