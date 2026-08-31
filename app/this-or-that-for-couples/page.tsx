import type { Metadata } from "next";
import Link from "next/link";

import GamePageLayout from "@/components/GamePageLayout";
import RandomThisOrThatGame from "@/components/RandomThisOrThatGame";
import BackToGames from "@/components/BackToGames";

import {
  thisOrThatQuestions,
  thisOrThatQuestionCount,
  thisOrThatCategoryOrder,
  thisOrThatCategoryLabels,
  thisOrThatCategoryDescriptions,
} from "@/data/thisOrThatQuestions";

/* ==============================
   SEO Metadata
============================== */

export const metadata: Metadata = {
  title:
    "This or That Questions for Couples | Fun Online Game",

  description:
    "80 fun This or That questions for couples plus a free online game. Compare choices about date nights, everyday life, relationships, and your future together.",

  alternates: {
    canonical:
      "https://twolumi.com/this-or-that-for-couples",
  },

  openGraph: {
    title:
      "This or That Questions for Couples | TwoLumi",

    description:
      "Play 18 random This or That questions or browse 80 fun choices for couples.",

    url:
      "https://twolumi.com/this-or-that-for-couples",

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
      "What are good This or That questions for couples?",

    answer:
      "Good This or That questions for couples are simple choices that reveal preferences and create conversation. Fun topics include date nights, food, travel, daily habits, communication, and future plans.",
  },

  {
    question:
      "How do you play This or That with your partner?",

    answer:
      "Read two choices and have both partners pick the option they prefer. Compare your answers before moving to the next question. There is no need to keep score unless you want to.",
  },

  {
    question:
      "Can couples play This or That online?",

    answer:
      "Yes. TwoLumi includes a free random This or That game that works in your browser. Couples can also read the questions together during a video call or while texting.",
  },

  {
    question:
      "What is the difference between This or That and Would You Rather?",

    answer:
      "This or That usually asks you to choose between two simple preferences, such as movie night or game night. Would You Rather questions often use more detailed or hypothetical situations.",
  },

  {
    question:
      "Are these This or That questions suitable for date night?",

    answer:
      "Yes. The list includes a dedicated date-night category along with fun, everyday, relationship, and future questions.",
  },
];

/* ==============================
   Related Pages
============================== */


const relatedPages = [
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
      "Explore fun, deep, and meaningful questions to ask your partner.",
  },

  {
    href:
      "/couple-quiz",

    icon:
      "🧠",

    title:
      "How Well Do You Know Your Partner?",

    description:
      "Predict your partner's answers and see how well you really know each other.",
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
     Full Question List Schema
  ============================== */

  const itemListSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "ItemList",

    name:
      "This or That Questions for Couples",

    numberOfItems:
      thisOrThatQuestions.length,

    itemListElement:
      thisOrThatQuestions.map(
        (
          question,
          index
        ) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name:
            `${question.left} or ${question.right}?`,
        })
      ),
  };

  return (
    <GamePageLayout
      kicker="Couple Questions"
      title="This or That Questions for Couples"
      description="Play a quick round together or browse 80 fun This or That questions about date nights, everyday life, relationships, and your future."
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
              itemListSchema
            ),
        }}
      />

      {/* ==============================
          INTERACTIVE GAME
          必须直接放在Hero下面
      ============================== */}

      <RandomThisOrThatGame />

      {/* ==============================
          Compact SEO Intro
          游戏之后才出现
      ============================== */}

      <section className="tot-intro tot-intro-after-game">

        <div className="tot-pills">

          <span>
            80 Questions
          </span>

          <span>
            5 Categories
          </span>

          <span>
            Random 18
          </span>

          <span>
            Free
          </span>

          <span>
            No Signup
          </span>

        </div>

        <p>
          This or That is one of the
          easiest couple games to
          play: choose between two
          options, compare answers
          with your partner, and talk
          about the choices that
          surprise you.
        </p>

        <p>
          You can play a random
          18-question round above or
          browse all{" "}
          {thisOrThatQuestionCount}{" "}
          This or That questions for
          couples below.
        </p>

      </section>

      {/* ==============================
          Quick Category Navigation
      ============================== */}

      <nav
        className="tot-category-nav"
        aria-label="This or That question categories"
      >

        <div>

          <strong>
            Browse all questions
          </strong>

          <span>
            Jump straight to a
            category.
          </span>

        </div>

        <div className="tot-category-links">

          {thisOrThatCategoryOrder.map(
            (category) => (
              <a
                key={
                  category
                }
                href={`#${category}`}
              >
                {
                  thisOrThatCategoryLabels[
                    category
                  ]
                }
              </a>
            )
          )}

        </div>

      </nav>

      {/* ==============================
          Full 80 Question List
      ============================== */}

      <section
        className="tot-all-questions"
        id="all-this-or-that-questions"
      >

        <div className="tot-section-heading">

          <div className="game-kicker">
            Full Question List
          </div>

          <h2>
            80 This or That Questions for Couples
          </h2>

          <p>
            Browse the full collection
            by category and choose the
            kind of conversation that
            fits the moment.
          </p>

        </div>

        {thisOrThatCategoryOrder.map(
          (
            category,
            categoryIndex
          ) => {
            const questions =
              thisOrThatQuestions.filter(
                (question) =>
                  question.category ===
                  category
              );

            /*
             * Calculate global numbering.
             *
             * Example:
             * Fun = 01
             * Everyday = 17
             * Date Night = 33
             */
            const previousCount =
              thisOrThatCategoryOrder
                .slice(
                  0,
                  categoryIndex
                )
                .reduce(
                  (
                    total,
                    previousCategory
                  ) =>
                    total +
                    thisOrThatQuestions.filter(
                      (question) =>
                        question.category ===
                        previousCategory
                    ).length,
                  0
                );

            return (
              <section
                key={
                  category
                }
                id={
                  category
                }
                className="tot-question-section"
              >

                <div className="tot-question-section-heading">

                  <div className="game-kicker">
                    {
                      String(
                        categoryIndex +
                          1
                      ).padStart(
                        2,
                        "0"
                      )
                    }
                  </div>

                  <h2>
                    {
                      thisOrThatCategoryLabels[
                        category
                      ]
                    }{" "}
                    This or That Questions for Couples
                  </h2>

                  <p>
                    {
                      thisOrThatCategoryDescriptions[
                        category
                      ]
                    }
                  </p>

                </div>

                <ol className="tot-question-grid">

                  {questions.map(
                    (
                      question,
                      index
                    ) => {
                      const number =
                        previousCount +
                        index +
                        1;

                      return (
                        <li
                          key={
                            question.id
                          }
                          className="tot-question-item"
                        >

                          <span className="tot-question-number">
                            {
                              String(
                                number
                              ).padStart(
                                2,
                                "0"
                              )
                            }
                          </span>

                          <div className="tot-question-text">

                            <strong>
                              {
                                question.left
                              }
                            </strong>

                            <span>
                              OR
                            </span>

                            <strong>
                              {
                                question.right
                              }
                            </strong>

                          </div>

                        </li>
                      );
                    }
                  )}

                </ol>

              </section>
            );
          }
        )}

      </section>

      {/* ==============================
          How to Play
      ============================== */}

      <section className="tot-how">

        <div className="tot-section-heading">

          <div className="game-kicker">
            How to Play
          </div>

          <h2>
            How to Play This or That as a Couple
          </h2>

          <p>
            There are no complicated
            rules. The fun part is
            comparing your choices
            and talking about the
            answers that surprise you.
          </p>

        </div>

        <div className="tot-how-grid">

          <article>

            <span>
              01
            </span>

            <h3>
              Read both choices
            </h3>

            <p>
              Pick one question and
              make sure both partners
              hear the same two
              options.
            </p>

          </article>

          <article>

            <span>
              02
            </span>

            <h3>
              Choose your answer
            </h3>

            <p>
              Each person chooses the
              option they genuinely
              prefer instead of trying
              to match their partner.
            </p>

          </article>

          <article>

            <span>
              03
            </span>

            <h3>
              Compare
            </h3>

            <p>
              Reveal your choices.
              Matching answers are
              fun, but different
              answers often create the
              better conversation.
            </p>

          </article>

          <article>

            <span>
              04
            </span>

            <h3>
              Ask why
            </h3>

            <p>
              If a choice surprises
              you, ask why before
              moving to the next
              question.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          Would You Rather CTA
      ============================== */}

      <section className="tot-wyr-cta">

        <div>

          <div className="game-kicker">
            Want Harder Choices?
          </div>

          <h2>
            Try Would You Rather for Couples
          </h2>

          <p>
            This or That focuses on
            simple preferences. If
            you want more detailed
            hypothetical choices,
            try our Would You Rather
            questions next.
          </p>

          <Link
            href="/would-you-rather-questions-for-couples"
            className="btn-primary"
          >
            Play Would You Rather →
          </Link>

        </div>

        <div
          className="tot-wyr-icon"
          aria-hidden="true"
        >
          ⚖️
        </div>

      </section>

      {/* ==============================
          Related Couple Games
      ============================== */}

      <section className="tot-related-section">

        <div className="tot-section-heading">

          <div className="game-kicker">
            More Couple Games
          </div>

          <h2>
            Keep Playing Together
          </h2>

          <p>
            Try another TwoLumi game
            or question collection.
          </p>

        </div>

        <div className="tot-related-grid">

          {relatedPages.map(
            (page) => (
              <Link
                key={
                  page.href
                }
                href={
                  page.href
                }
                className="tot-related-card"
              >

                <span
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

      <BackToGames />

      {/* ==============================
          FAQ
      ============================== */}

      <section className="tot-faq-section">

        <div className="tot-section-heading">

          <div className="game-kicker">
            FAQ
          </div>

          <h2>
            This or That Questions for Couples FAQ
          </h2>

        </div>

        <div className="tot-faq">

          {faqItems.map(
            (item) => (
              <article
                key={
                  item.question
                }
                className="tot-faq-item"
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