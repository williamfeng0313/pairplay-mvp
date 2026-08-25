import type { Metadata } from "next";
import Link from "next/link";

import GamePageLayout from "@/components/GamePageLayout";
import PartnerQuiz from "@/components/PartnerQuiz";

/* ==============================
   SEO Metadata
============================== */

export const metadata: Metadata = {
  title:
    "How Well Do You Know Your Partner? Quiz | TwoLumi",

  description:
    "Take this free 20-question couple quiz and see how well you really know your partner. Predict their answers, compare results, and get your score.",

  alternates: {
    canonical:
      "https://twolumi.com/couple-quiz",
  },

  openGraph: {
    title:
      "How Well Do You Know Your Partner? Quiz | TwoLumi",

    description:
      "Predict your partner's answers to 20 questions, let them answer for themselves, and see how many you got right.",

    url:
      "https://twolumi.com/couple-quiz",

    type:
      "website",
  },
};

/* ==============================
   FAQ
============================== */

const faqItems = [
  {
    question:
      "How does the How Well Do You Know Your Partner quiz work?",

    answer:
      "One person first predicts how their partner will answer 20 questions. The predictions are then hidden, and the partner answers the same questions for themselves. Every exact match earns one point, for a maximum score of 20.",
  },

  {
    question:
      "How many questions are in the partner quiz?",

    answer:
      "The TwoLumi partner quiz has 20 questions across five categories: food and drinks, everyday habits, favorites and fun, memories and relationship preferences, and future plans.",
  },

  {
    question:
      "What is a good score on this couple quiz?",

    answer:
      "There is no scientifically meaningful good or bad score. The quiz is designed for fun and conversation. A higher score simply means more of your predictions matched your partner's answers during this round.",
  },

  {
    question:
      "Can I use this as a boyfriend quiz?",

    answer:
      "Yes. If your partner is your boyfriend, predict how he will answer each question, then pass him the device so he can answer for himself.",
  },

  {
    question:
      "Can I use this as a girlfriend quiz?",

    answer:
      "Yes. The quiz works the same way for girlfriends, boyfriends, spouses, or any couple who wants to test how well they know each other.",
  },

  {
    question:
      "Can long distance couples take this quiz?",

    answer:
      "Yes. Long distance couples can use the quiz while on a video call, although the easiest version is to take turns on the same device when together. TwoLumi also has separate games designed for couples playing from different devices.",
  },
];

/* ==============================
   Related Pages
============================== */

const relatedPages = [
  {
    href:
      "/couple-compatibility-test",

    icon:
      "💕",

    title:
      "Couple Compatibility Test",

    description:
      "Compare your preferences across lifestyle, future plans, habits, and connection.",
  },

  {
    href:
      "/would-you-rather-questions-for-couples",

    icon:
      "⚖️",

    title:
      "Would You Rather for Couples",

    description:
      "Choose between fun hypothetical situations and compare your answers.",
  },

  {
    href:
      "/couple-questions",

    icon:
      "💬",

    title:
      "Couple Questions",

    description:
      "Explore more conversation starters and questions to ask your partner.",
  },

  {
    href:
      "/games",

    icon:
      "🎮",

    title:
      "All Couple Games",

    description:
      "Browse all TwoLumi games, quizzes, and question collections.",
  },
];

/* ==============================
   Page
============================== */

export default function Page() {
  /* ==============================
     FAQ Schema
  ============================== */

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

  /* ==============================
     WebApplication Schema
  ============================== */

  const applicationSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebApplication",

    name:
      "TwoLumi How Well Do You Know Your Partner Quiz",

    url:
      "https://twolumi.com/couple-quiz",

    applicationCategory:
      "EntertainmentApplication",

    operatingSystem:
      "Any",

    description:
      "A free 20-question couple quiz where one partner predicts the other's answers before comparing the real responses.",

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
      title="How Well Do You Know Your Partner? Couple Quiz"
      description="Predict your partner's answers to 20 questions, then let them answer for themselves and see how many you really know."
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
      ============================== */}

      <PartnerQuiz />

      {/* ==============================
          SEO Intro
      ============================== */}

      <section className="partner-quiz-seo-intro">

        <div className="partner-quiz-seo-pills">

          <span>
            20 Questions
          </span>

          <span>
            5 Categories
          </span>

          <span>
            2 Players
          </span>

          <span>
            Free
          </span>

          <span>
            No Signup
          </span>

        </div>

        <p>
          How well do you really know
          your partner? In this couple
          quiz, one person predicts how
          their partner will answer 20
          questions about food, habits,
          favorite activities,
          relationship preferences,
          and future plans.
        </p>

        <p>
          Then the device is passed to
          the partner, who answers the
          same questions for
          themselves. Every exact match
          earns one point, so the final
          score is based on real
          predictions rather than an
          arbitrary personality result.
        </p>

      </section>

      {/* ==============================
          How It Works
      ============================== */}

      <section className="partner-quiz-seo-section">

        <div className="partner-quiz-seo-heading">

          <div className="game-kicker">
            How It Works
          </div>

          <h2>
            How This Partner Quiz Works
          </h2>

          <p>
            The quiz separates your
            predictions from your
            partner&apos;s real
            answers, so every point has
            a clear reason behind it.
          </p>

        </div>

        <div className="partner-quiz-how-grid">

          <article>

            <span>
              01
            </span>

            <h3>
              Predict Their Answers
            </h3>

            <p>
              Answer all 20 questions
              based on what you think
              your partner would
              choose.
            </p>

          </article>

          <article>

            <span>
              02
            </span>

            <h3>
              Pass the Device
            </h3>

            <p>
              Your predictions are
              saved and hidden before
              your partner begins.
            </p>

          </article>

          <article>

            <span>
              03
            </span>

            <h3>
              Partner Answers
            </h3>

            <p>
              Your partner answers the
              same 20 questions based
              on their actual
              preferences.
            </p>

          </article>

          <article>

            <span>
              04
            </span>

            <h3>
              See Your Score
            </h3>

            <p>
              Every exact match earns
              one point. You also get
              separate results for
              each category.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          Score Meaning
      ============================== */}

      <section className="partner-quiz-seo-section">

        <div className="partner-quiz-seo-heading">

          <div className="game-kicker">
            Your Score
          </div>

          <h2>
            What Does Your Partner Quiz Score Mean?
          </h2>

          <p>
            Your score simply shows how
            many of your predictions
            matched your partner&apos;s
            answers in this round.
          </p>

        </div>

        <div className="partner-quiz-score-bands">

          <article>

            <strong>
              0–5
            </strong>

            <h3>
              💬 Still Learning
            </h3>

            <p>
              There are still plenty
              of things to discover
              about your partner,
              which means plenty of
              future conversations too.
            </p>

          </article>

          <article>

            <strong>
              6–10
            </strong>

            <h3>
              ✨ Getting to Know Them
            </h3>

            <p>
              You know quite a few
              things about your
              partner, with some
              surprises still waiting.
            </p>

          </article>

          <article>

            <strong>
              11–15
            </strong>

            <h3>
              ❤️ You Know Them Pretty Well
            </h3>

            <p>
              You predicted many of
              your partner&apos;s
              preferences correctly
              and seem to notice quite
              a few of the little
              things.
            </p>

          </article>

          <article>

            <strong>
              16–20
            </strong>

            <h3>
              💕 Partner Expert
            </h3>

            <p>
              You matched most of your
              partner&apos;s answers.
              Either you know them
              extremely well, or they
              are becoming wonderfully
              predictable.
            </p>

          </article>

        </div>

        <div className="partner-quiz-score-note">

          <strong>
            Just for fun:
          </strong>

          <p>
            This score is not a measure
            of relationship quality,
            emotional closeness, or how
            much you care about each
            other. It only measures
            whether your predictions
            matched your partner&apos;s
            answers today.
          </p>

        </div>

      </section>

      {/* ==============================
          Categories
      ============================== */}

      <section className="partner-quiz-seo-section">

        <div className="partner-quiz-seo-heading">

          <div className="game-kicker">
            Five Categories
          </div>

          <h2>
            What Does This Couple Quiz Test?
          </h2>

          <p>
            The 20 questions cover five
            parts of everyday life so
            the quiz is not based on
            one narrow type of
            preference.
          </p>

        </div>

        <div className="partner-quiz-category-info-grid">

          <article>

            <div className="partner-quiz-category-icon">
              🍳
            </div>

            <h3>
              Food &amp; Drinks
            </h3>

            <p>
              Breakfast, dinner,
              drinks, and the things
              that matter when choosing
              what to eat.
            </p>

          </article>

          <article>

            <div className="partner-quiz-category-icon">
              ☀️
            </div>

            <h3>
              Everyday Habits
            </h3>

            <p>
              Planning, routines, free
              time, organization, and
              ordinary daily
              preferences.
            </p>

          </article>

          <article>

            <div className="partner-quiz-category-icon">
              🎬
            </div>

            <h3>
              Favorites &amp; Fun
            </h3>

            <p>
              Dates, trips,
              entertainment, gifts,
              and the ways your partner
              likes to have fun.
            </p>

          </article>

          <article>

            <div className="partner-quiz-category-icon">
              💕
            </div>

            <h3>
              Memories &amp; Relationship
            </h3>

            <p>
              Connection,
              appreciation, emotional
              support, and memorable
              moments together.
            </p>

          </article>

          <article>

            <div className="partner-quiz-category-icon">
              🌱
            </div>

            <h3>
              Future &amp; Dreams
            </h3>

            <p>
              Lifestyle priorities,
              money, future plans, and
              what your partner hopes
              life might look like
              later.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          SEO Copy
      ============================== */}

      <section className="partner-quiz-seo-section partner-quiz-copy">

        <div className="game-kicker">
          Beyond the Score
        </div>

        <h2>
          How Well Do You Really Know Your Partner?
        </h2>

        <p>
          Knowing your partner is not
          about memorizing every
          favorite food, movie, or
          habit. People change,
          preferences change, and
          sometimes the most
          interesting part of a
          partner quiz is discovering
          an answer you did not expect.
        </p>

        <p>
          That surprise can be useful.
          A wrong prediction often
          creates a better conversation
          than a correct one because it
          gives you something new to
          ask about.
        </p>

        <p>
          That is why TwoLumi compares
          your real predictions with
          your partner&apos;s own
          answers instead of assigning
          an arbitrary personality
          score. The goal is simple:
          have fun, compare what you
          expected, and learn something
          new about each other.
        </p>

      </section>

      {/* ==============================
          Compatibility CTA
      ============================== */}

      <section className="partner-quiz-compat-cta">

        <div>

          <div className="game-kicker">
            Try Something Different
          </div>

          <h2>
            Want to Compare How Similar You Are?
          </h2>

          <p>
            Knowing your partner and
            being similar are two
            different things. Take the
            Couple Compatibility Test
            to compare your own answers
            across lifestyle, future
            plans, everyday habits,
            and connection.
          </p>

          <Link
            href="/couple-compatibility-test"
            className="btn-primary"
          >
            Take the Couple Compatibility Test →
          </Link>

        </div>

        <div
          className="partner-quiz-compat-icon"
          aria-hidden="true"
        >
          💞
        </div>

      </section>

      {/* ==============================
          Related Pages
      ============================== */}

      <section className="partner-quiz-seo-section">

        <div className="partner-quiz-seo-heading">

          <div className="game-kicker">
            More Couple Games
          </div>

          <h2>
            Keep Playing Together
          </h2>

          <p>
            Try another TwoLumi game,
            quiz, or conversation
            starter after you finish
            this one.
          </p>

        </div>

        <div className="partner-quiz-related-grid">

          {relatedPages.map(
            (page) => (
              <Link
                key={
                  page.href
                }
                href={
                  page.href
                }
                className="partner-quiz-related-card"
              >

                <span
                  className="partner-quiz-related-icon"
                  aria-hidden="true"
                >
                  {
                    page.icon
                  }
                </span>

                <div>

                  <h3>
                    {
                      page.title
                    }
                  </h3>

                  <p>
                    {
                      page.description
                    }
                  </p>

                </div>

              </Link>
            )
          )}

        </div>

      </section>

      {/* ==============================
          FAQ
      ============================== */}

      <section className="partner-quiz-seo-section">

        <div className="partner-quiz-seo-heading">

          <div className="game-kicker">
            FAQ
          </div>

          <h2>
            How Well Do You Know Your Partner Quiz FAQ
          </h2>

        </div>

        <div className="partner-quiz-faq">

          {faqItems.map(
            (item) => (
              <article
                key={
                  item.question
                }
                className="partner-quiz-faq-item"
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