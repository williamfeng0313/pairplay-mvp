import type { Metadata } from "next";
import Link from "next/link";

import GamePageLayout from "@/components/GamePageLayout";
import RandomCoupleQuestion from "@/components/RandomCoupleQuestion";
import BackToGames from "@/components/BackToGames";

import {
  coupleQuestions,
  coupleQuestionCount,
  coupleQuestionCategoryOrder,
  coupleQuestionCategoryLabels,
  coupleQuestionCategoryTitles,
  coupleQuestionCategoryDescriptions,
} from "@/data/coupleQuestions";

/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "100 Questions to Ask Your Partner",

  description:
    "Explore 100 fun, deep, and meaningful questions to ask your partner. Play a random couple question game or browse conversation starters about relationships, memories, and your future.",

  alternates: {
    canonical:
      "https://twolumi.com/couple-questions",
  },

  openGraph: {
    title:
      "100 Questions to Ask Your Partner | TwoLumi",

    description:
      "Explore 100 fun, deep, and meaningful questions to ask your partner, plus a free random couple question game.",

    url:
      "https://twolumi.com/couple-questions",

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
      "What are good questions to ask your partner?",

    answer:
      "Good questions to ask your partner are open-ended enough to create a real conversation. Try mixing fun questions, everyday preferences, deeper topics, relationship memories, and future plans instead of asking only serious questions.",
  },

  {
    question:
      "What are some fun questions for couples?",

    answer:
      "Fun questions for couples can be about travel, food, hobbies, funny memories, imaginary situations, favorite things, or small everyday preferences. The goal is to make talking together feel easy and enjoyable.",
  },

  {
    question:
      "What are good deep questions to ask your partner?",

    answer:
      "Good deep questions explore values, emotions, personal growth, meaningful experiences, and what helps someone feel understood. They work best when both partners have time and feel comfortable talking.",
  },

  {
    question:
      "How can couples use these questions as conversation starters?",

    answer:
      "Choose one question instead of trying to finish the entire list. Take turns answering, ask a follow-up question when something surprises you, and move on whenever the conversation naturally slows down.",
  },

  {
    question:
      "Can long distance couples use these questions?",

    answer:
      "Yes. Couples can use these questions during video calls, voice calls, or texting. TwoLumi also has a separate collection of questions designed specifically for long distance couples.",
  },

  {
    question:
      "Do couples need to answer all 100 questions?",

    answer:
      "No. The list is designed to give you options. You can use the random question game, choose a category that matches your mood, or simply pick one question for a date night or conversation.",
  },
];

/* =========================================================
   Related Pages
========================================================= */

const relatedPages = [
  {
    href:
      "/this-or-that-for-couples",

    icon:
      "↔️",

    title:
      "This or That for Couples",

    description:
      "Compare simple choices and discover the little preferences you share or disagree on.",
  },

  {
    href:
      "/would-you-rather-questions-for-couples",

    icon:
      "⚖️",

    title:
      "Would You Rather for Couples",

    description:
      "Try more playful hypothetical questions and compare your answers together.",
  },

  {
    href:
      "/couple-quiz",

    icon:
      "🎯",

    title:
      "How Well Do You Know Your Partner?",

    description:
      "Predict your partner's answers to 20 questions and see how many you get right.",
  },

  {
    href:
      "/couple-compatibility-test",

    icon:
      "💕",

    title:
      "Couple Compatibility Test",

    description:
      "Compare your own answers across habits, lifestyle, connection, and future plans.",
  },
];

/* =========================================================
   Page
========================================================= */

export default function Page() {
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

  /* =======================================================
     ItemList Schema
  ======================================================= */

  const itemListSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "ItemList",

    name:
      "100 Questions to Ask Your Partner",

    numberOfItems:
      coupleQuestions.length,

    itemListElement:
      coupleQuestions.map(
        (
          item,
          index
        ) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name:
            item.question,
        })
      ),
  };

  /* =======================================================
     WebPage Schema
  ======================================================= */

  const webPageSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebPage",

    name:
      "100 Questions to Ask Your Partner",

    url:
      "https://twolumi.com/couple-questions",

    description:
      "100 fun, deep, meaningful, relationship, and future questions to ask your partner, plus a random couple question game.",
  };

  return (
        <GamePageLayout
        kicker="Couple Questions"
        title="100 Questions to Ask Your Partner"
        description="Fun, deep, and meaningful questions for couples. Pick a random question and start talking, or browse all 100 conversation starters below."
      >

      {/* ===================================================
          Structured Data
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
              webPageSchema
            ),
        }}
      />

      {/* ===================================================
          PRODUCT FIRST
      =================================================== */}

      <RandomCoupleQuestion />

      {/* ===================================================
          Compact SEO Intro
      =================================================== */}

      <section className="couple-questions-intro">

        <div className="couple-questions-pills">

          <span>
            100 Questions
          </span>

          <span>
            5 Categories
          </span>

          <span>
            Random Game
          </span>

          <span>
            Free
          </span>

          <span>
            No Signup
          </span>

        </div>

        <p>
          Looking for questions to ask
          your partner without turning
          the conversation into an
          interview? This collection
          mixes fun questions,
          conversation starters, deeper
          topics, relationship
          questions, and ideas about
          your future together.
        </p>

        <p>
          Use the random couple
          question game above when you
          want a quick prompt, or browse
          all{" "}
          {coupleQuestionCount}{" "}
          questions below and choose a
          category that fits the
          moment.
        </p>

      </section>

      {/* ===================================================
          Category Navigation
      =================================================== */}

      <nav
        className="couple-questions-category-nav"
        aria-label="Couple question categories"
      >

        <div className="couple-questions-category-nav-copy">

          <div className="game-kicker">
            Browse by Category
          </div>

          <strong>
            Find the right kind of question
          </strong>

          <p>
            Start light, go deeper, talk
            about your relationship, or
            imagine what comes next.
          </p>

        </div>

        <div className="couple-questions-category-links">

          {coupleQuestionCategoryOrder.map(
            (category) => (
              <a
                key={
                  category
                }
                href={`#${category}`}
              >
                {
                  coupleQuestionCategoryLabels[
                    category
                  ]
                }
              </a>
            )
          )}

        </div>

      </nav>

      {/* ===================================================
          Full 100 Questions
      =================================================== */}

      <section className="couple-questions-full-list">

        <div className="couple-questions-section-heading">

          <div className="game-kicker">
            Full Question List
          </div>

          <h2>
            100 Questions for Couples to Ask Each Other
          </h2>

          <p>
            Browse all five categories
            below. You do not need to
            answer them in order — pick
            whichever question feels
            interesting right now.
          </p>

        </div>

        {coupleQuestionCategoryOrder.map(
          (
            category,
            categoryIndex
          ) => {
            const questions =
              coupleQuestions.filter(
                (item) =>
                  item.category ===
                  category
              );

            return (
              <section
                key={
                  category
                }
                id={
                  category
                }
                className="couple-questions-category-section"
              >

                <div className="couple-questions-category-heading">

                  <div className="couple-questions-category-number">
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

                  <div>

                    <h2>
                      {
                        coupleQuestionCategoryTitles[
                          category
                        ]
                      }
                    </h2>

                    <p>
                      {
                        coupleQuestionCategoryDescriptions[
                          category
                        ]
                      }
                    </p>

                  </div>

                </div>

                <ol className="couple-questions-grid">

                  {questions.map(
                    (item) => (
                      <li
                        key={
                          item.id
                        }
                        className="couple-questions-item"
                      >

                        <span className="couple-questions-item-number">
                          {
                            String(
                              item.id
                            ).padStart(
                              2,
                              "0"
                            )
                          }
                        </span>

                        <p>
                          {
                            item.question
                          }
                        </p>

                      </li>
                    )
                  )}

                </ol>

              </section>
            );
          }
        )}

      </section>

      {/* ===================================================
          Conversation Starters
      =================================================== */}

      <section className="couple-questions-conversation-section">

        <div className="couple-questions-section-heading">

          <div className="game-kicker">
            Better Conversations
          </div>

          <h2>
            How to Use These Questions as Conversation Starters for Couples
          </h2>

          <p>
            The best couple questions
            are not about getting
            through the biggest list.
            They are about finding one
            question that leads
            somewhere interesting.
          </p>

        </div>

        <div className="couple-questions-how-grid">

          <article>

            <span>
              01
            </span>

            <h3>
              Pick One Question
            </h3>

            <p>
              Start with a question that
              fits your mood instead of
              trying to work through the
              whole list.
            </p>

          </article>

          <article>

            <span>
              02
            </span>

            <h3>
              Take Turns
            </h3>

            <p>
              Let both partners answer
              the same question before
              moving on.
            </p>

          </article>

          <article>

            <span>
              03
            </span>

            <h3>
              Ask Why
            </h3>

            <p>
              When an answer surprises
              you, ask a natural
              follow-up question rather
              than immediately jumping
              to the next prompt.
            </p>

          </article>

          <article>

            <span>
              04
            </span>

            <h3>
              Stop When It Works
            </h3>

            <p>
              If one question turns into
              a great conversation, you
              do not need another one.
            </p>

          </article>

        </div>

      </section>

      {/* ===================================================
          Long Distance CTA
      =================================================== */}

      <section className="couple-questions-long-distance-cta">

        <div>

          <div className="game-kicker">
            Long Distance?
          </div>

          <h2>
            Questions for Long Distance Couples
          </h2>

          <p>
            If you are spending time
            apart, try our dedicated
            collection of questions
            designed for video calls,
            texting, daily check-ins,
            deeper conversations, and
            future plans.
          </p>

          <Link
            href="/questions-for-long-distance-couples"
            className="btn-primary"
          >
            Explore Long Distance Questions →
          </Link>

        </div>

        <div
          className="couple-questions-long-distance-icon"
          aria-hidden="true"
        >
          💌
        </div>

      </section>

      {/* ===================================================
          Related Question Games
      =================================================== */}

      <section className="couple-questions-related-section">

        <div className="couple-questions-section-heading">

          <div className="game-kicker">
            Keep Playing
          </div>

          <h2>
            Try Another Couple Game
          </h2>

          <p>
            Want something more
            structured than an open
            question? Try a choice game,
            quiz, or compatibility test.
          </p>

        </div>

        <div className="couple-questions-related-grid">

          {relatedPages.map(
            (page) => (
              <Link
                key={
                  page.href
                }
                href={
                  page.href
                }
                className="couple-questions-related-card"
              >

                <span
                  className="couple-questions-related-icon"
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

      {/* ===================================================
          FAQ
      =================================================== */}

      <section className="couple-questions-faq-section">

        <div className="couple-questions-section-heading">

          <div className="game-kicker">
            FAQ
          </div>

          <h2>
            Questions to Ask Your Partner FAQ
          </h2>

        </div>

        <div className="couple-questions-faq">

          {faqItems.map(
            (item) => (
              <article
                key={
                  item.question
                }
                className="couple-questions-faq-item"
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