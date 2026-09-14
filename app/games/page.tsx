import type { Metadata } from "next";
import Link from "next/link";

import CouplePuzzlePromo from "@/components/CouplePuzzlePromo";
import styles from "./games.module.css";


/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "Online Games for Couples — Free Games to Play Together",

  description:
    "Play free online games for couples on separate phones or laptops. Try multiplayer games, couple questions, quizzes, and fun games for long-distance couples — no signup required.",

  alternates: {
    canonical:
      "https://twolumi.com/games",
  },

  openGraph: {
    title:
      "Online Games for Couples — Free Games to Play Together | TwoLumi",

    description:
      "Play free online games for couples on separate phones or laptops. Try multiplayer games, couple questions, quizzes, and fun games for long-distance couples — no signup required.",

    url:
      "https://twolumi.com/games",

    siteName:
      "TwoLumi",

    type:
      "website",
  },

  twitter: {
    card:
      "summary",

    title:
      "Online Games for Couples — Free Games to Play Together | TwoLumi",

    description:
      "Free online games for couples to play together on separate phones or laptops. No signup required.",
  },

  robots: {
    index:
      true,

    follow:
      true,

    googleBot: {
      index:
        true,

      follow:
        true,
    },
  },
};


/* =========================================================
   Game Data
========================================================= */

const multiplayerGames = [
  {
    href:
      "/would-you-rather-questions-for-couples",

    icon:
      "⚖️",

    title:
      "Would You Rather for Couples",

    description:
      "Answer privately, reveal together, and see where you agree — or completely disagree.",

    badge:
      "Multiplayer",

    cta:
      "Play Together",
  },

  {
    href:
      "/couple-puzzle",

    icon:
      "🧩",

    title:
      "Couple Puzzle",

    description:
      "Get different clues on separate devices, combine what you know, and solve 8 puzzles together as one team.",

    badge:
      "Co-op",

    cta:
      "Solve Together",
  },
];


const questionGames = [
  {
    href:
      "/couple-questions",

    icon:
      "💬",

    title:
      "Questions to Ask Your Partner",

    description:
      "Explore fun, deep, and meaningful questions for better conversations together.",

    badge:
      "100 Questions",

    cta:
      "Start Asking",
  },

  {
    href:
      "/this-or-that-for-couples",

    icon:
      "💗",

    title:
      "This or That for Couples",

    description:
      "Choose between two options and compare what you and your partner would pick.",

    badge:
      "Quick Game",

    cta:
      "Play Now",
  },
];


const coupleQuizzes = [
  {
    href:
      "/couple-quiz",

    icon:
      "🧠",

    title:
      "How Well Do You Know Your Partner?",

    description:
      "Predict your partner’s answers and see how well you really know each other.",

    badge:
      "20 Questions",

    cta:
      "Take the Quiz",
  },

  {
    href:
      "/couple-compatibility-test",

    icon:
      "✨",

    title:
      "Couple Compatibility Test",

    description:
      "Compare your answers and discover how closely your preferences and personalities match.",

    badge:
      "Compatibility",

    cta:
      "Take the Test",
  },
];


const quickChoices = [
  {
    time:
      "5 minutes",

    icon:
      "⚡",

    title:
      "Quick & Easy",

    description:
      "Perfect when you want something fun without starting a long game.",

    links: [
      {
        label:
          "Would You Rather",

        href:
          "/would-you-rather-questions-for-couples",
      },

      {
        label:
          "This or That",

        href:
          "/this-or-that-for-couples",
      },
    ],
  },

  {
    time:
      "10–15 minutes",

    icon:
      "🎮",

    title:
      "Play Together",

    description:
      "Choose something interactive when you have a little more time together.",

    links: [
      {
        label:
          "Couple Puzzle",

        href:
          "/couple-puzzle",
      },

      {
        label:
          "Partner Quiz",

        href:
          "/couple-quiz",
      },
    ],
  },

  {
    time:
      "Just want to talk?",

    icon:
      "💬",

    title:
      "Start a Conversation",

    description:
      "Skip the competition and use a question to start a better conversation.",

    links: [
      {
        label:
          "Couple Questions",

        href:
          "/couple-questions",
      },

      {
        label:
          "Long Distance Questions",

        href:
          "/questions-for-long-distance-couples",
      },
    ],
  },
];


const faqItems = [
  {
    question:
      "What are good online games for couples?",

    answer:
      "Good online games for couples are easy to start, work well on separate devices, and give both partners something to react to together. TwoLumi includes Would You Rather, Couple Puzzle, This or That, partner quizzes, compatibility tests, and conversation games.",
  },

  {
    question:
      "Can long-distance couples play TwoLumi together?",

    answer:
      "Yes. Long-distance couples can use TwoLumi on separate phones or laptops. Multiplayer rooms use a private six-character room code, so both partners can join the same game without creating an account.",
  },

  {
    question:
      "Do we need to download anything?",

    answer:
      "No. TwoLumi games run directly in your web browser. There is no app download or account required to start playing.",
  },

  {
    question:
      "Are TwoLumi couple games free?",

    answer:
      "Yes. The couple games, quizzes, and question collections currently available on TwoLumi are free to use.",
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
    "Free Online Games for Couples",

  url:
    "https://twolumi.com/games",

  description:
    "Free online games for couples to play together on separate phones or laptops.",

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
    "Online Games for Couples",

  itemListElement: [
    {
      "@type":
        "ListItem",

      position:
        1,

      name:
        "Would You Rather for Couples",

      url:
        "https://twolumi.com/would-you-rather-questions-for-couples",
    },

    {
      "@type":
        "ListItem",

      position:
        2,

      name:
        "Couple Puzzle",

      url:
        "https://twolumi.com/couple-puzzle",
    },

    {
      "@type":
        "ListItem",

      position:
        3,

      name:
        "This or That for Couples",

      url:
        "https://twolumi.com/this-or-that-for-couples",
    },

    {
      "@type":
        "ListItem",

      position:
        4,

      name:
        "Questions to Ask Your Partner",

      url:
        "https://twolumi.com/couple-questions",
    },

    {
      "@type":
        "ListItem",

      position:
        5,

      name:
        "How Well Do You Know Your Partner?",

      url:
        "https://twolumi.com/couple-quiz",
    },

    {
      "@type":
        "ListItem",

      position:
        6,

      name:
        "Couple Compatibility Test",

      url:
        "https://twolumi.com/couple-compatibility-test",
    },

    {
      "@type":
        "ListItem",

      position:
        7,

      name:
        "Long Distance Couple Games",

      url:
        "https://twolumi.com/long-distance-couple-games",
    },
  ],
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

export default function GamesPage() {
  return (
    <main className={styles.page}>

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


      {/* ===================================================
          Hero
      =================================================== */}

      <section
        className={
          styles.hero
        }
      >

        <div
          className={
            styles.eyebrow
          }
        >
          PLAY TOGETHER
        </div>

        <h1>
          Free Online Games
          for Couples
        </h1>

        <p
          className={
            styles.heroLead
          }
        >
          Play fun online games
          with your partner on
          the same couch or miles
          apart. Choose a quick
          game, start a private
          room, or find something
          fun to do together —
          no signup required.
        </p>

        <div
          className={
            styles.heroActions
          }
        >

          <Link
            href="/would-you-rather-questions-for-couples"
            className={
              styles.primaryButton
            }
          >
            Start Playing
          </Link>

          <a
            href="#couple-games"
            className={
              styles.secondaryButton
            }
          >
            Browse Games
          </a>

        </div>

        <div
          className={
            styles.heroTrust
          }
        >

          <span>
            ✓ Free to play
          </span>

          <span>
            ✓ No signup
          </span>

          <span>
            ✓ Works on phones
          </span>

          <span>
            ✓ Long-distance friendly
          </span>

        </div>

      </section>


      {/* ===================================================
          Couple Puzzle Spotlight
      =================================================== */}

      <CouplePuzzlePromo context="games" />


      {/* ===================================================
          Time Picker
      =================================================== */}

      <section
        className={
          styles.section
        }
      >

        <div
          className={
            styles.sectionHeading
          }
        >

          <div
            className={
              styles.kicker
            }
          >
            PICK YOUR VIBE
          </div>

          <h2>
            How Much Time Do You Have?
          </h2>

          <p>
            Sometimes you want a
            full game. Sometimes
            you just have ten
            minutes before bed.
            Pick what fits tonight.
          </p>

        </div>


        <div
          className={
            styles.timeGrid
          }
        >

          {quickChoices.map(
            (item) => (

              <article
                key={
                  item.time
                }
                className={
                  styles.timeCard
                }
              >

                <div
                  className={
                    styles.timeIcon
                  }
                >
                  {item.icon}
                </div>

                <div
                  className={
                    styles.timeLabel
                  }
                >
                  {item.time}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {
                    item.description
                  }
                </p>

                <div
                  className={
                    styles.timeLinks
                  }
                >

                  {item.links.map(
                    (link) => (

                      <Link
                        key={
                          link.href
                        }
                        href={
                          link.href
                        }
                      >
                        {link.label}
                        {" "}
                        →
                      </Link>

                    )
                  )}

                </div>

              </article>

            )
          )}

        </div>

      </section>


      {/* ===================================================
          Games
      =================================================== */}

      <section
        id="couple-games"
        className={
          styles.section
        }
      >

        <div
          className={
            styles.sectionHeading
          }
        >

          <div
            className={
              styles.kicker
            }
          >
            PLAY NOW
          </div>

          <h2>
            Play Online Couple Games
          </h2>

          <p>
            Choose a game based
            on how you want to
            spend time together:
            play, talk, compare,
            or test how well you
            know each other.
          </p>

        </div>


        {/* ===============================================
            Multiplayer
        =============================================== */}

        <div
          className={
            styles.category
          }
        >

          <div
            className={
              styles.categoryHeading
            }
          >

            <div>

              <div
                className={
                  styles.categoryIcon
                }
              >
                🎮
              </div>

              <div>

                <h2>
                  Multiplayer Games
                  for Couples
                </h2>

                <p>
                  Play together on
                  separate phones or
                  laptops. Create a
                  private room, share
                  the six-character
                  code, and start
                  playing instantly.
                </p>

              </div>

            </div>

          </div>


          <div
            className={
              styles.gameGrid
            }
          >

            {multiplayerGames.map(
              (game) => (

                <GameCard
                  key={
                    game.href
                  }
                  game={
                    game
                  }
                  featured
                />

              )
            )}

          </div>

        </div>


        {/* ===============================================
            Questions
        =============================================== */}

        <div
          className={
            styles.category
          }
        >

          <div
            className={
              styles.categoryHeading
            }
          >

            <div>

              <div
                className={
                  styles.categoryIcon
                }
              >
                💬
              </div>

              <div>

                <h2>
                  Question Games
                  for Couples
                </h2>

                <p>
                  Use quick choices
                  or meaningful
                  questions when the
                  best part of the
                  game is where the
                  conversation goes.
                </p>

              </div>

            </div>

          </div>


          <div
            className={
              styles.gameGrid
            }
          >

            {questionGames.map(
              (game) => (

                <GameCard
                  key={
                    game.href
                  }
                  game={
                    game
                  }
                />

              )
            )}

          </div>

        </div>


        {/* ===============================================
            Quizzes
        =============================================== */}

        <div
          className={
            styles.category
          }
        >

          <div
            className={
              styles.categoryHeading
            }
          >

            <div>

              <div
                className={
                  styles.categoryIcon
                }
              >
                🧠
              </div>

              <div>

                <h2>
                  Couple Quizzes
                </h2>

                <p>
                  Test how well you
                  know your partner
                  or compare your
                  answers and see
                  where you match.
                </p>

              </div>

            </div>

          </div>


          <div
            className={
              styles.gameGrid
            }
          >

            {coupleQuizzes.map(
              (game) => (

                <GameCard
                  key={
                    game.href
                  }
                  game={
                    game
                  }
                />

              )
            )}

          </div>

        </div>

      </section>


      {/* ===================================================
          Long Distance
      =================================================== */}

      <section
        className={
          styles.longDistance
        }
      >

        <div
          className={
            styles.longDistanceContent
          }
        >

          <div
            className={
              styles.kicker
            }
          >
            MILES APART?
          </div>

          <h2>
            Online Games for
            Long Distance Couples
          </h2>

          <p>
            Being in different
            places does not mean
            every date has to be
            another movie call.
            Play browser-based
            couple games on
            separate phones or
            laptops, use a private
            room, and keep talking
            while you play.
          </p>

          <div
            className={
              styles.longDistanceActions
            }
          >

            <Link
              href="/long-distance-couple-games"
              className={
                styles.primaryButton
              }
            >
              Explore Long Distance Games
            </Link>

            <Link
              href="/questions-for-long-distance-couples"
              className={
                styles.textLink
              }
            >
              100 Long Distance Questions
              {" "}
              →
            </Link>

          </div>

        </div>


        <div
          className={
            styles.longDistanceVisual
          }
          aria-hidden="true"
        >
          <span>
            📱
          </span>

          <div
            className={
              styles.connectionLine
            }
          >
            · · · ♥ · · ·
          </div>

          <span>
            💻
          </span>
        </div>

      </section>


      {/* ===================================================
          SEO Support
      =================================================== */}

      <section
        className={
          styles.seoSection
        }
      >

        <div
          className={
            styles.sectionHeading
          }
        >

          <div
            className={
              styles.kicker
            }
          >
            EASY TO START
          </div>

          <h2>
            Couple Games You Can
            Play Right in Your Browser
          </h2>

        </div>


        <div
          className={
            styles.seoGrid
          }
        >

          <div
            className={
              styles.seoCard
            }
          >

            <h3>
              No download required
            </h3>

            <p>
              TwoLumi games run
              directly in your
              browser. Open a game
              on your phone, tablet,
              or laptop and start
              playing without
              installing an app.
            </p>

          </div>


          <div
            className={
              styles.seoCard
            }
          >

            <h3>
              Play on separate devices
            </h3>

            <p>
              Multiplayer rooms let
              couples use separate
              devices while staying
              in the same game. This
              works especially well
              for long-distance
              couples.
            </p>

          </div>


          <div
            className={
              styles.seoCard
            }
          >

            <h3>
              Pick the right kind of game
            </h3>

            <p>
              Choose something fast
              when you only have a
              few minutes, solve a
              puzzle together when
              you want teamwork, or
              pick couple questions
              when you just want to
              talk.
            </p>

          </div>

        </div>

      </section>


      {/* ===================================================
          FAQ
      =================================================== */}

      <section
        className={
          styles.faqSection
        }
      >

        <div
          className={
            styles.sectionHeading
          }
        >

          <div
            className={
              styles.kicker
            }
          >
            FAQ
          </div>

          <h2>
            Online Couple Games FAQ
          </h2>

        </div>


        <div
          className={
            styles.faqList
          }
        >

          {faqItems.map(
            (item) => (

              <details
                key={
                  item.question
                }
                className={
                  styles.faqItem
                }
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


      {/* ===================================================
          Final CTA
      =================================================== */}

      <section
        className={
          styles.finalCta
        }
      >

        <div>
          <div
            className={
              styles.kicker
            }
          >
            READY?
          </div>

          <h2>
            Pick a Game and
            Play Together
          </h2>

          <p>
            No account, no download,
            no complicated setup.
          </p>
        </div>


        <Link
          href="/couple-puzzle"
          className={
            styles.primaryButton
          }
        >
          Try Couple Puzzle
        </Link>

      </section>

    </main>
  );
}


/* =========================================================
   Game Card
========================================================= */

function GameCard({
  game,
  featured = false,
}: {
  game: {
    href: string;
    icon: string;
    title: string;
    description: string;
    badge: string;
    cta: string;
  };

  featured?: boolean;
}) {
  return (
    <Link
      href={
        game.href
      }
      className={`${styles.gameCard} ${
        featured
          ? styles.featuredGame
          : ""
      }`}
    >

      <div
        className={
          styles.gameCardTop
        }
      >

        <div
          className={
            styles.gameIcon
          }
        >
          {game.icon}
        </div>

        <div
          className={
            styles.badge
          }
        >
          {game.badge}
        </div>

      </div>


      <h3>
        {game.title}
      </h3>

      <p>
        {game.description}
      </p>


      <div
        className={
          styles.cardCta
        }
      >
        {game.cta}
        {" "}
        →
      </div>

    </Link>
  );
}
