import type { Metadata } from "next";
import Link from "next/link";

import GamePageLayout from "@/components/GamePageLayout";

import {
  longDistanceQuestionGroups,
  longDistanceQuestionCount,
} from "@/data/longDistanceQuestions";

/* ==============================
   SEO Metadata
============================== */

export const metadata: Metadata = {
  title:
    "100 Questions for Long Distance Couples | TwoLumi",

  description:
    "100 fun, deep, meaningful, and silly questions for long distance couples. Use them for texting, video calls, virtual dates, and deeper conversations.",

  alternates: {
    canonical:
      "https://twolumi.com/questions-for-long-distance-couples",
  },

  openGraph: {
    title:
      "100 Questions for Long Distance Couples | TwoLumi",

    description:
      "100 fun, deep, meaningful, and silly long distance relationship questions for texting, video calls, and virtual date nights.",

    url:
      "https://twolumi.com/questions-for-long-distance-couples",

    type:
      "article",
  },
};

/* ==============================
   FAQ
============================== */

const faqItems = [
  {
    question:
      "What are good questions for long distance couples?",

    answer:
      "Good questions for long distance couples can be fun, thoughtful, practical, or future-focused. Try mixing everyday questions with deeper conversations about your relationship, future plans, communication, and the things you want to experience together.",
  },

  {
    question:
      "What should long distance couples talk about?",

    answer:
      "Long distance couples can talk about everyday life, upcoming plans, shared memories, personal goals, feelings, relationship expectations, future visits, and simple fun topics. Ordinary conversations can be just as valuable as deep ones because they help both partners stay involved in each other's daily lives.",
  },

  {
    question:
      "How do you keep conversations interesting in a long distance relationship?",

    answer:
      "Mix different types of conversations instead of relying only on daily updates. Ask fun questions, share photos and stories, plan virtual dates, play online games together, discuss future plans, and occasionally use deeper questions to learn something new about each other.",
  },

  {
    question:
      "What are deep questions to ask your long distance partner?",

    answer:
      "Deep questions can explore trust, emotional support, communication, personal fears, future goals, relationship expectations, and what helps each partner feel understood and connected while apart.",
  },

  {
    question:
      "Can these questions be used for virtual date nights?",

    answer:
      "Yes. These questions work well during video calls, virtual dinners, movie nights, texting sessions, or any online date. You can choose one category or take turns picking random questions from the list.",
  },
];

/* ==============================
   Related Pages
============================== */

const relatedPages = [
  {
    href:
      "/long-distance-couple-games",

    icon:
      "💕",

    title:
      "Long Distance Couple Games",

    description:
      "Play together online from separate phones or computers.",
  },

  {
    href:
      "/couple-questions",

    icon:
      "💬",

    title:
      "Couple Questions",

    description:
      "Explore more conversation questions for couples.",
  },

  {
    href:
      "/would-you-rather-questions-for-couples",

    icon:
      "⚖️",

    title:
      "Would You Rather for Couples",

    description:
      "Compare choices with fun Would You Rather questions.",
  },

  {
    href:
      "/games",

    icon:
      "🎮",

    title:
      "All Couple Games",

    description:
      "Browse all TwoLumi games, quizzes, and conversation ideas.",
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
     WebPage Schema
  ============================== */

  const webPageSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebPage",

    name:
      "100 Questions for Long Distance Couples",

    url:
      "https://twolumi.com/questions-for-long-distance-couples",

    description:
      "A collection of 100 fun, deep, meaningful, daily-life, future, relationship, date-night, and silly questions for long distance couples.",

    isPartOf: {
      "@type":
        "WebSite",

      name:
        "TwoLumi",

      url:
        "https://twolumi.com",
    },
  };

  /* ==============================
     Question List Schema
  ============================== */

  const allQuestions =
    longDistanceQuestionGroups.flatMap(
      (group) =>
        group.questions
    );

  const itemListSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "ItemList",

    name:
      "100 Questions for Long Distance Couples",

    numberOfItems:
      allQuestions.length,

    itemListElement:
      allQuestions.map(
        (
          question,
          index
        ) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name:
            question,
        })
      ),
  };

  return (
    <GamePageLayout
      kicker="Long Distance Couples"
      title="100 Questions for Long Distance Couples"
      description="Keep conversations interesting even when you're miles apart. Use these fun, deep, and meaningful long distance relationship questions for texting, video calls, and virtual date nights."
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

      {/* ==============================
          Intro / Stats
      ============================== */}

      <section className="ldq-intro">

        <p>
          Being apart does not mean
          every conversation needs to
          become another version of
          &quot;How was your
          day?&quot; A good question
          can turn an ordinary text or
          video call into something
          funny, meaningful, or
          surprisingly memorable.
        </p>

        <p>
          Below you will find{" "}
          {longDistanceQuestionCount}{" "}
          questions for long distance
          couples, organized into
          seven categories so you can
          quickly choose the mood that
          fits your conversation.
        </p>

        <div className="ldq-pills">

          <span>
            100 Questions
          </span>

          <span>
            7 Categories
          </span>

          <span>
            Free
          </span>

          <span>
            No Signup
          </span>

        </div>

      </section>

      {/* ==============================
          Quick Jump
      ============================== */}

      <nav
        className="ldq-nav"
        aria-label="Long distance question categories"
      >

        <div className="ldq-nav-header">

          <strong>
            Jump to a category
          </strong>

          <span>
            Pick the kind of
            conversation you want
            right now.
          </span>

        </div>

        <div className="ldq-nav-links">

          {longDistanceQuestionGroups.map(
            (group) => (
              <a
                key={
                  group.key
                }
                href={`#${group.key}`}
              >
                {
                  group.title
                    .replace(
                      " Questions for Long Distance Couples",
                      ""
                    )
                }
              </a>
            )
          )}

        </div>

      </nav>

      {/* ==============================
          First Games CTA
      ============================== */}

      <section className="ldq-game-cta">

        <div>

          <div className="game-kicker">
            Want Something More Interactive?
          </div>

          <h2>
            Play Together, Even From Different Places
          </h2>

          <p>
            Questions are great for
            conversation. If you want
            something you can actually
            play together online,
            explore TwoLumi&apos;s
            long distance couple
            games.
          </p>

          <Link
            href="/long-distance-couple-games"
            className="btn-primary"
          >
            Explore Long Distance Couple Games →
          </Link>

        </div>

        <div
          className="ldq-game-cta-icon"
          aria-hidden="true"
        >
          💞
        </div>

      </section>

      {/* ==============================
          100 Questions
      ============================== */}

      <div className="ldq-groups">

        {longDistanceQuestionGroups.map(
          (
            group,
            groupIndex
          ) => {
            /*
             * Calculate the global
             * starting question number.
             *
             * Example:
             * Fun = 1
             * Deep = 16
             * Daily Life = 31
             */
            const startNumber =
              longDistanceQuestionGroups
                .slice(
                  0,
                  groupIndex
                )
                .reduce(
                  (
                    total,
                    previousGroup
                  ) =>
                    total +
                    previousGroup
                      .questions
                      .length,
                  0
                ) + 1;

            return (
              <section
                key={
                  group.key
                }
                id={
                  group.key
                }
                className="ldq-section"
              >

                <div className="ldq-section-heading">

                  <div className="game-kicker">

                    {groupIndex + 1}
                    {" / "}
                    {
                      longDistanceQuestionGroups.length
                    }

                  </div>

                  <h2>
                    {
                      group.title
                    }
                  </h2>

                  <p>
                    {
                      group.description
                    }
                  </p>

                </div>

                <ol
                  className="ldq-question-grid"
                  start={
                    startNumber
                  }
                >

                  {group.questions.map(
                    (
                      question,
                      questionIndex
                    ) => {
                      const number =
                        startNumber +
                        questionIndex;

                      return (
                        <li
                          key={
                            question
                          }
                          className="ldq-question"
                        >

                          <span className="ldq-question-number">
                            {
                              String(
                                number
                              ).padStart(
                                2,
                                "0"
                              )
                            }
                          </span>

                          <p>
                            {
                              question
                            }
                          </p>

                        </li>
                      );
                    }
                  )}

                </ol>

                <a
                  href="#top"
                  className="ldq-back-top"
                >
                  ↑ Back to top
                </a>

              </section>
            );
          }
        )}

      </div>

      {/* ==============================
          How to Use
      ============================== */}

      <section className="ldq-how">

        <div className="ldq-section-heading">

          <div className="game-kicker">
            Make It Easy
          </div>

          <h2>
            How to Use These Long Distance Relationship Questions
          </h2>

          <p>
            You do not need to work
            through all 100 questions
            in order. Pick a category
            that fits the moment and
            let the conversation go
            wherever it goes.
          </p>

        </div>

        <div className="ldq-how-grid">

          <article>

            <span>
              01
            </span>

            <h3>
              Pick a category
            </h3>

            <p>
              Choose fun questions
              for an easy conversation
              or deep questions when
              you have more time to
              talk.
            </p>

          </article>

          <article>

            <span>
              02
            </span>

            <h3>
              Take turns
            </h3>

            <p>
              One person answers
              first, then asks the
              same question back.
              Comparing answers often
              creates the best
              follow-up conversations.
            </p>

          </article>

          <article>

            <span>
              03
            </span>

            <h3>
              Ask follow-up questions
            </h3>

            <p>
              Do not rush to the next
              number. If an answer is
              interesting, stay with
              it and ask why.
            </p>

          </article>

          <article>

            <span>
              04
            </span>

            <h3>
              Mix serious and fun
            </h3>

            <p>
              Long distance
              conversations do not
              always need to be deep.
              Mix meaningful topics
              with silly questions
              and everyday life.
            </p>

          </article>

        </div>

      </section>

      {/* ==============================
          Long Distance SEO Copy
      ============================== */}

      <section className="ldq-copy">

        <div className="game-kicker">
          Staying Connected
        </div>

        <h2>
          What Should Long Distance Couples Talk About?
        </h2>

        <p>
          Long distance relationships
          can sometimes make
          conversation feel unusually
          important. When you cannot
          share the same room, meal,
          commute, or ordinary
          weekend, talking becomes one
          of the main ways you stay
          involved in each
          other&apos;s lives.
        </p>

        <p>
          That does not mean every
          conversation needs to be
          serious. Talking about a
          strange thing that happened
          at work, what you ate for
          lunch, a ridiculous
          hypothetical situation, or
          where you want to travel
          together can all create a
          sense of shared everyday
          life.
        </p>

        <p>
          The most useful questions
          for long distance couples
          usually create room for a
          real answer rather than a
          simple yes or no. Deep
          questions can help you
          understand each other,
          while fun and daily-life
          questions help the
          relationship feel natural
          instead of turning every
          call into a relationship
          meeting.
        </p>

      </section>

      {/* ==============================
          Second Games CTA
      ============================== */}

      <section className="ldq-game-cta ldq-game-cta-secondary">

        <div>

          <div className="game-kicker">
            Finished the List?
          </div>

          <h2>
            Turn Your Next Video Call Into a Game Night
          </h2>

          <p>
            Keep the conversation
            going with couple games
            designed for partners who
            are playing from separate
            devices.
          </p>

          <Link
            href="/long-distance-couple-games"
            className="btn-primary"
          >
            Play Long Distance Couple Games →
          </Link>

        </div>

        <div
          className="ldq-game-cta-icon"
          aria-hidden="true"
        >
          🎮
        </div>

      </section>

      {/* ==============================
          Related Content
      ============================== */}

      <section className="ldq-related-section">

        <div className="ldq-section-heading">

          <div className="game-kicker">
            More for Couples
          </div>

          <h2>
            Keep Talking and Playing Together
          </h2>

          <p>
            Try another TwoLumi game
            or question collection
            after you finish this
            list.
          </p>

        </div>

        <div className="ldq-related">

          {relatedPages.map(
            (page) => (
              <Link
                key={
                  page.href
                }
                href={
                  page.href
                }
                className="ldq-related-card"
              >

                <span
                  className="ldq-related-icon"
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

      <section className="ldq-faq-section">

        <div className="ldq-section-heading">

          <div className="game-kicker">
            FAQ
          </div>

          <h2>
            Long Distance Couple Questions FAQ
          </h2>

        </div>

        <div className="ldq-faq">

          {faqItems.map(
            (item) => (
              <article
                key={
                  item.question
                }
                className="ldq-faq-item"
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