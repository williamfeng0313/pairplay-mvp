import type { Metadata } from "next";
import Link from "next/link";

import RandomDateIdea from "@/components/RandomDateIdea";

import {
  longDistanceDateCategories,
  longDistanceDateIdeas,
  longDistanceDateIdeaCount,
} from "@/data/longDistanceDateIdeas";

/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "56 Long Distance Date Ideas for Couples",

  description:
    "56 long distance date ideas for couples, including free virtual dates, games, puzzles, walks, food ideas, conversation prompts, and everyday activities.",

  alternates: {
    canonical:
      "https://twolumi.com/long-distance-date-ideas",
  },

  openGraph: {
    title:
      "56 Long Distance Date Ideas for Couples | TwoLumi",

    description:
      "Find fun, free, and meaningful long distance date ideas for couples, plus a random date idea generator for your next virtual date.",

    url:
      "https://twolumi.com/long-distance-date-ideas",

    siteName:
      "TwoLumi",

    type:
      "article",
  },

  twitter: {
    card:
      "summary",

    title:
      "56 Long Distance Date Ideas for Couples | TwoLumi",

    description:
      "Games, puzzles, walks, food ideas, questions, and simple things to do together when you are long distance.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================================
   FAQ
========================================================= */

const faqItems = [
  {
    question:
      "What are good long distance date ideas?",
    answer:
      "Good long distance date ideas give both people something to do together instead of relying only on conversation. Try a two-device game, shared puzzle, walk-and-talk, cooking the same recipe, watching something short, looking at the same sky, or using a thoughtful question.",
  },
  {
    question:
      "What can long distance couples do online besides watching movies?",
    answer:
      "Long distance couples can play browser games, solve the same puzzle, take quizzes, cook together, do a walking call, compare photos, work quietly together, plan a future trip, or use question prompts. Switching between different types of small activities can make calls feel less repetitive.",
  },
  {
    question:
      "What are free long distance date ideas?",
    answer:
      "Free long distance date ideas include Would You Rather, This or That, couple questions, shared word puzzles, walk-and-talk dates, photo challenges, quiet co-working, sky watching, voice-note swaps, and planning a future trip with a pretend budget.",
  },
  {
    question:
      "Can long distance dates work on separate phones or laptops?",
    answer:
      "Yes. Many long distance date ideas work best when each person uses their own phone or computer. TwoLumi multiplayer rooms are designed for two separate devices and do not require an account.",
  },
  {
    question:
      "How long should a virtual date be?",
    answer:
      "There is no required length. A ten-minute game can be enough on a busy day, while cooking, walking, solving a puzzle, or watching something together may take thirty minutes or longer. The generator on this page lets you filter ideas by time.",
  },
  {
    question:
      "Do long distance date ideas have to use video calls?",
    answer:
      "No. Some ideas work well with audio calls, texting, shared photos, voice notes, or simply doing the same activity at roughly the same time. Use the format that feels easiest for both of you.",
  },
];

/* =========================================================
   Structured Data
========================================================= */

const webPageSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "WebPage",

  name:
    "56 Long Distance Date Ideas for Couples",

  url:
    "https://twolumi.com/long-distance-date-ideas",

  description:
    "A collection of long distance date ideas, virtual date activities, and things long distance couples can do together.",

  isPartOf: {
    "@type":
      "WebSite",

    name:
      "TwoLumi",

    url:
      "https://twolumi.com",
  },
};

const itemListSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "ItemList",

  name:
    "Long Distance Date Ideas for Couples",

  numberOfItems:
    longDistanceDateIdeas.length,

  itemListElement:
    longDistanceDateIdeas.map(
      (idea, index) => ({
        "@type":
          "ListItem",

        position:
          index + 1,

        name:
          idea.title,

        url:
          `https://twolumi.com/long-distance-date-ideas#${idea.id}`,
      })
    ),
};

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

/* =========================================================
   Page
========================================================= */

export default function LongDistanceDateIdeasPage() {
  return (
    <main className="lddi-page">
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

        <section className="lddi-hero">
          <div>
            <div className="eyebrow">
              LONG DISTANCE DATE IDEAS
            </div>

            <h1>
              56 Long Distance Date
              Ideas for Couples
            </h1>

            <p className="lddi-hero-lead">
              Games, puzzles, walks,
              food, shared routines,
              conversation prompts,
              and simple virtual date
              ideas for couples who
              want to do more than
              watch another movie.
            </p>

            <div className="lddi-hero-pills">
              <span>
                {
                  longDistanceDateIdeaCount
                }{" "}
                ideas
              </span>

              <span>
                8 categories
              </span>

              <span>
                Free ideas included
              </span>

              <span>
                No signup
              </span>
            </div>

            <div className="lddi-hero-actions">
              <a
                href="#date-idea-generator"
                className="btn-primary"
              >
                Surprise Us
              </a>

              <Link
                href="/long-distance-couple-games"
                className="btn-secondary"
              >
                Play Long Distance Games
              </Link>
            </div>
          </div>

          <aside className="lddi-hero-card">
            <div
              className="lddi-hero-card-icon"
              aria-hidden="true"
            >
              ✨
            </div>

            <div className="game-kicker">
              PICK BY HOW YOU FEEL
            </div>

            <h2>
              Not Every Date Needs a Big Plan
            </h2>

            <p>
              A ten-minute game, a
              shared walk, a puzzle,
              or even doing chores on
              the same call can feel
              more natural than trying
              to make every video call
              a major event.
            </p>
          </aside>
        </section>

        {/* =================================================
            RANDOM GENERATOR
        ================================================= */}

        <RandomDateIdea />

        {/* =================================================
            CATEGORY NAV
        ================================================= */}

        <nav
          className="lddi-category-nav"
          aria-label="Long distance date idea categories"
        >
          <div>
            <strong>
              Browse all ideas
            </strong>

            <span>
              Jump to the kind of date
              you want.
            </span>
          </div>

          <div className="lddi-category-links">
            {longDistanceDateCategories.map(
              (category) => (
                <a
                  key={category.key}
                  href={`#${category.key}`}
                >
                  {category.icon}{" "}
                  {category.shortTitle}
                </a>
              )
            )}
          </div>
        </nav>

        {/* =================================================
            INTRO / SEO COPY
        ================================================= */}

        <section className="lddi-section lddi-intro">
          <div className="lddi-section-heading">
            <div className="game-kicker">
              MORE THAN A MOVIE NIGHT
            </div>

            <h2>
              Long Distance Date Ideas
              That Give You Something
              to Do Together
            </h2>
          </div>

          <div className="lddi-copy-grid">
            <p>
              The hardest part of a
              long distance date is
              often not finding time
              to call. It is finding
              something that makes the
              call feel different from
              the last one. That is why
              this list focuses on
              shared activities rather
              than another generic list
              of conversation topics.
            </p>

            <p>
              Some ideas are playful,
              some are quiet, and some
              feel almost like ordinary
              everyday life. Use the
              random generator when you
              do not want to decide, or
              jump directly to one of
              the eight categories
              below.
            </p>
          </div>
        </section>

        {/* =================================================
            ALL 56 IDEAS
        ================================================= */}

        {longDistanceDateCategories.map(
          (
            category,
            categoryIndex
          ) => {
            const ideas =
              longDistanceDateIdeas.filter(
                (idea) =>
                  idea.category ===
                  category.key
              );

            return (
              <section
                key={category.key}
                id={category.key}
                className="lddi-section lddi-category-section"
              >
                <div className="lddi-category-heading">
                  <div className="lddi-category-number">
                    {String(
                      categoryIndex + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div>
                    <div className="game-kicker">
                      {
                        category.shortTitle
                      }
                    </div>

                    <h2>
                      {category.icon}{" "}
                      {category.title}
                    </h2>

                    <p>
                      {
                        category.description
                      }
                    </p>
                  </div>
                </div>

                <div className="lddi-idea-grid">
                  {ideas.map(
                    (
                      idea,
                      ideaIndex
                    ) => (
                      <article
                        key={idea.id}
                        id={idea.id}
                        className="lddi-idea-card"
                      >
                        <div className="lddi-idea-card-top">
                          <span
                            className="lddi-idea-icon"
                            aria-hidden="true"
                          >
                            {
                              idea.icon
                            }
                          </span>

                          <span className="lddi-idea-number">
                            {
                              String(
                                categoryIndex *
                                  7 +
                                  ideaIndex +
                                  1
                              ).padStart(
                                2,
                                "0"
                              )
                            }
                          </span>
                        </div>

                        <h3>
                          {
                            idea.title
                          }
                        </h3>

                        <p>
                          {
                            idea.description
                          }
                        </p>

                        <div className="lddi-idea-meta">
                          <span>
                            {
                              idea.mood
                            }
                          </span>

                          <span>
                            {
                              idea.durationLabel
                            }
                          </span>

                          <span>
                            {
                              idea.budget
                            }
                          </span>
                        </div>

                        {idea.href ? (
                          <Link
                            href={idea.href}
                            className="lddi-idea-link"
                          >
                            {
                              idea.cta ??
                              "Try This Idea"
                            }{" "}
                            →
                          </Link>
                        ) : null}
                      </article>
                    )
                  )}
                </div>
              </section>
            );
          }
        )}

        {/* =================================================
            BROADER LONG DISTANCE INTENT
        ================================================= */}

        <section className="lddi-section lddi-soft-section">
          <div className="lddi-section-heading">
            <div className="game-kicker">
              EVERYDAY CONNECTION
            </div>

            <h2>
              Things to Do in a Long
              Distance Relationship
            </h2>

            <p>
              The best long distance
              relationship activities
              are not always elaborate.
              Small shared routines can
              make two separate lives
              feel more connected.
            </p>
          </div>

          <div className="lddi-principle-grid">
            <article>
              <span>
                01
              </span>

              <h3>
                Switch formats
              </h3>

              <p>
                Rotate between games,
                puzzles, movement,
                food, conversation, and
                quiet company so every
                date does not have the
                same rhythm.
              </p>
            </article>

            <article>
              <span>
                02
              </span>

              <h3>
                Keep some dates short
              </h3>

              <p>
                A quick ten-minute
                activity can be easier
                to repeat than waiting
                for the perfect
                two-hour virtual date.
              </p>
            </article>

            <article>
              <span>
                03
              </span>

              <h3>
                Share normal life
              </h3>

              <p>
                Walking, cooking,
                studying, errands, and
                chores can create the
                feeling of everyday
                presence that distance
                often removes.
              </p>
            </article>

            <article>
              <span>
                04
              </span>

              <h3>
                Leave room to talk
              </h3>

              <p>
                The activity should
                give you something to
                react to together, not
                become another task you
                have to complete.
              </p>
            </article>
          </div>
        </section>

        {/* =================================================
            RELATED LONG DISTANCE CLUSTER
        ================================================= */}

        <section className="lddi-section">
          <div className="lddi-section-heading">
            <div className="game-kicker">
              KEEP THE DATE GOING
            </div>

            <h2>
              More Things to Do With
              Your Long Distance Partner
            </h2>

            <p>
              Use these pages when you
              want a ready-to-play game,
              a question, or a more
              structured virtual date
              night.
            </p>
          </div>

          <div className="lddi-related-grid">
            <Link
              href="/long-distance-couple-games"
              className="lddi-related-card"
            >
              <span>
                🎮
              </span>

              <h3>
                Long Distance Couple Games
              </h3>

              <p>
                Play together from
                separate phones or
                laptops, including a
                private two-device room.
              </p>
            </Link>

            <Link
              href="/questions-for-long-distance-couples"
              className="lddi-related-card"
            >
              <span>
                📱
              </span>

              <h3>
                100 Questions for Long Distance Couples
              </h3>

              <p>
                Use fun, deep, silly,
                and future-focused
                prompts for your next
                call.
              </p>
            </Link>

            <Link
              href="/date-night-games"
              className="lddi-related-card"
            >
              <span>
                🌙
              </span>

              <h3>
                Date Night Games for Couples
              </h3>

              <p>
                Pick a browser-based
                game when you want
                something more
                interactive.
              </p>
            </Link>

            <Link
              href="/games"
              className="lddi-related-card"
            >
              <span>
                ✨
              </span>

              <h3>
                All Online Games for Couples
              </h3>

              <p>
                Browse TwoLumi games,
                quizzes, questions, and
                couple activities.
              </p>
            </Link>
          </div>
        </section>

        {/* =================================================
            FAQ
        ================================================= */}

        <section className="lddi-section">
          <div className="lddi-section-heading">
            <div className="game-kicker">
              FAQ
            </div>

            <h2>
              Long Distance Date Ideas FAQ
            </h2>
          </div>

          <div className="lddi-faq">
            {faqItems.map(
              (item) => (
                <details
                  key={
                    item.question
                  }
                  className="lddi-faq-item"
                >
                  <summary>
                    {
                      item.question
                    }
                  </summary>

                  <p>
                    {
                      item.answer
                    }
                  </p>
                </details>
              )
            )}
          </div>
        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="lddi-final-cta">
          <div>
            <div className="game-kicker">
              WANT SOMETHING YOU CAN PLAY RIGHT NOW?
            </div>

            <h2>
              Start With a Free Long
              Distance Couple Game
            </h2>

            <p>
              Create a private room,
              share the code with your
              partner, and play from
              two separate devices.
            </p>
          </div>

          <div className="lddi-final-actions">
            <Link
              href="/long-distance-couple-games"
              className="btn-primary"
            >
              Play Together
            </Link>

            <a
              href="#date-idea-generator"
              className="btn-secondary"
            >
              Pick Another Date Idea
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
