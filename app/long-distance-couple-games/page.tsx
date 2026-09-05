import type {
  Metadata,
} from "next";

import Link from "next/link";

import PlayTogetherCTA from "@/components/PlayTogetherCTA";


/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "Long Distance Couple Games — Free Online Games to Play Together",

  description:
    "Play free online games for long distance couples on separate phones or laptops. Create a private room, share a code, play together, and chat — no signup required.",

  alternates: {
    canonical:
      "https://twolumi.com/long-distance-couple-games",
  },

  openGraph: {
    title:
      "Long Distance Couple Games — Free Online Games to Play Together | TwoLumi",

    description:
      "Free online games for long distance couples to play together on separate phones or laptops. Create a private room, play together, and chat — no signup required.",

    url:
      "https://twolumi.com/long-distance-couple-games",

    siteName:
      "TwoLumi",

    type:
      "website",
  },

  twitter: {
    card:
      "summary",

    title:
      "Long Distance Couple Games — Free Online Games to Play Together | TwoLumi",

    description:
      "Play free online games for long distance couples on separate phones or laptops — no signup required.",
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

const quickGames = [
  {
    href:
      "/this-or-that-for-couples",

    icon:
      "↔️",

    badge:
      "Quick Game",

    title:
      "This or That for Couples",

    description:
      "Make fast choices, compare your preferences, and turn simple answers into fun conversations.",
  },

  {
    href:
      "/couple-quiz",

    icon:
      "🧠",

    badge:
      "Partner Quiz",

    title:
      "How Well Do You Know Your Partner?",

    description:
      "Predict your partner’s answers to 20 questions and see how many you get right.",
  },

  {
    href:
      "/couple-compatibility-test",

    icon:
      "💞",

    badge:
      "Just for Fun",

    title:
      "Couple Compatibility Test",

    description:
      "Compare your preferences and see where you match. Designed for entertainment, not serious relationship assessment.",
  },
];


const conversationGames = [
  {
    href:
      "/questions-for-long-distance-couples",

    icon:
      "📱",

    title:
      "100 Questions for Long Distance Couples",

    description:
      "Pick a question for video calls, daily check-ins, deeper conversations, funny moments, and future plans.",

    cta:
      "Explore Long Distance Questions",
  },

  {
    href:
      "/couple-questions",

    icon:
      "💬",

    title:
      "Questions to Ask Your Partner",

    description:
      "Use fun, meaningful, and deeper questions when you want something slower than a game.",

    cta:
      "Browse Couple Questions",
  },
];


const moodChoices = [
  {
    href:
      "/would-you-rather-questions-for-couples",

    icon:
      "🎮",

    title:
      "Want to play?",

    description:
      "Start a private Would You Rather room and compare your answers together.",

    cta:
      "Play Together",
  },

  {
    href:
      "/questions-for-long-distance-couples",

    icon:
      "💬",

    title:
      "Want to talk?",

    description:
      "Pick one question when the call goes quiet and let the conversation go somewhere new.",

    cta:
      "Pick a Question",
  },

  {
    href:
      "/couple-quiz",

    icon:
      "🧠",

    title:
      "Want to test each other?",

    description:
      "Predict your partner’s answers and see how well you know the little things about each other.",

    cta:
      "Take the Quiz",
  },

  {
    href:
      "/long-distance-date-ideas",

    icon:
      "✨",

    title:
      "Want a date idea?",

    description:
      "Pick a game, walk, shared meal, puzzle, or simple activity when you want the call to feel different.",

    cta:
      "Explore Date Ideas",
  },
];


/* =========================================================
   FAQ
========================================================= */

const faqItems = [
  {
    question:
      "What games can long distance couples play online?",

    answer:
      "Long distance couples can play Would You Rather, This or That, couple quizzes, compatibility games, and conversation games. TwoLumi also supports a private multiplayer room so both partners can play from separate devices.",
  },

  {
    question:
      "Can we play on separate phones or computers?",

    answer:
      "Yes. TwoLumi multiplayer rooms are designed for two people using separate phones, tablets, laptops, or desktop computers. Both partners see the same game while using their own device.",
  },

  {
    question:
      "Do both people need a TwoLumi account?",

    answer:
      "No. TwoLumi does not require an account to create or join a private game room. One partner creates a room and shares the six-character room code.",
  },

  {
    question:
      "Can we chat while we play?",

    answer:
      "Yes. TwoLumi multiplayer rooms include live chat so you can keep talking while you play. Chat messages are temporary and are not kept as a permanent chat history.",
  },

  {
    question:
      "Are TwoLumi long distance couple games free?",

    answer:
      "Yes. The current TwoLumi couple games, quizzes, question collections, and private room experience are free to use in the browser.",
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
    "Free Online Games for Long Distance Couples",

  url:
    "https://twolumi.com/long-distance-couple-games",

  description:
    "Free online games for long distance couples to play together on separate phones or laptops.",

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
    "Online Games for Long Distance Couples",

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
        "This or That for Couples",

      url:
        "https://twolumi.com/this-or-that-for-couples",
    },

    {
      "@type":
        "ListItem",

      position:
        3,

      name:
        "How Well Do You Know Your Partner?",

      url:
        "https://twolumi.com/couple-quiz",
    },

    {
      "@type":
        "ListItem",

      position:
        4,

      name:
        "Couple Compatibility Test",

      url:
        "https://twolumi.com/couple-compatibility-test",
    },

    {
      "@type":
        "ListItem",

      position:
        5,

      name:
        "100 Questions for Long Distance Couples",

      url:
        "https://twolumi.com/questions-for-long-distance-couples",
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
      (
        item
      ) => ({
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

export default function LongDistanceCoupleGamesPage() {
  return (
    <main className="ldg-page">

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


      <div className="ldg-container">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="ldg-hero">

          <div className="ldg-hero-copy">

            <div className="ldg-kicker">
              LONG DISTANCE, STILL TOGETHER
            </div>


            <h1>
              Free Online Games for
              Long Distance Couples
            </h1>


            <p className="ldg-hero-lead">
              Play together from separate
              phones or laptops. Create a
              private room, share the
              six-character code, and keep
              talking while you play —
              no signup required.
            </p>


            <div className="ldg-trust-row">

              <span>
                ✓ Separate devices
              </span>

              <span>
                ✓ Private room
              </span>

              <span>
                ✓ Live chat
              </span>

              <span>
                ✓ No signup
              </span>

            </div>


            <div className="ldg-actions">

              <a
                href="#create-room"
                className="ldg-btn-primary"
              >
                Play Together
              </a>


              <a
                href="#long-distance-games"
                className="ldg-btn-secondary"
              >
                Browse Games
              </a>

            </div>

          </div>


          {/* ===============================================
              HERO INFO CARD
          =============================================== */}

          <div className="ldg-hero-card">

            <div className="ldg-hero-card-icon">
              ♥
            </div>


            <div className="ldg-kicker">
              3 SIMPLE STEPS
            </div>


            <h2>
              One Room.
              <br />
              Two Devices.
            </h2>


            <p className="ldg-card-intro">
              Start together in less than a minute.
            </p>


            <div className="ldg-mini-flow">

              <div className="ldg-flow-step">

                <span>
                  1
                </span>


                <div>

                  <strong>
                    Create a private room
                  </strong>


                  <small>
                    One person starts the game.
                  </small>

                </div>

              </div>


              <div className="ldg-flow-arrow">
                ↓
              </div>


              <div className="ldg-flow-step">

                <span>
                  2
                </span>


                <div>

                  <strong>
                    Share the code
                  </strong>


                  <small>
                    Send the 6-character code
                    to your partner.
                  </small>

                </div>

              </div>


              <div className="ldg-flow-arrow">
                ↓
              </div>


              <div className="ldg-flow-step">

                <span>
                  3
                </span>


                <div>

                  <strong>
                    Play &amp; chat
                  </strong>


                  <small>
                    Join from separate devices
                    and play together.
                  </small>

                </div>

              </div>

            </div>


            <p className="ldg-micro">
              Browser-based · No app · No signup
            </p>

          </div>

        </section>


        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section className="ldg-section">

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              HOW IT WORKS
            </div>


            <h2>
              Start a Couple Game in Three Steps
            </h2>


            <p>
              No screen sharing, app install,
              or account setup. Each partner
              can use their own device.
            </p>

          </div>


          <div className="ldg-step-grid">

            <article className="ldg-step-card">

              <div className="ldg-step-number">
                01
              </div>


              <h3>
                Create a Private Room
              </h3>


              <p>
                Start a multiplayer game and
                TwoLumi generates a temporary
                six-character room code.
              </p>

            </article>


            <article className="ldg-step-card">

              <div className="ldg-step-number">
                02
              </div>


              <h3>
                Share the Code
              </h3>


              <p>
                Send the code to your partner.
                They can join from another
                phone, tablet, or computer.
              </p>

            </article>


            <article className="ldg-step-card">

              <div className="ldg-step-number">
                03
              </div>


              <h3>
                Play &amp; Chat Together
              </h3>


              <p>
                Answer on your own devices,
                reveal the results together,
                and use live chat while you play.
              </p>

            </article>

          </div>

        </section>


        {/* =================================================
            MULTIPLAYER
        ================================================= */}

        <section
          id="long-distance-games"
          className="ldg-section"
        >

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              PLAY TOGETHER NOW
            </div>


            <h2>
              Multiplayer Games for
              Long Distance Couples
            </h2>


            <p>
              Would You Rather is currently
              available as a synchronized
              TwoLumi multiplayer game.
              Your answers stay hidden until
              both of you choose.
            </p>

          </div>


          <div className="ldg-featured-game">

            <div className="ldg-featured-copy">

              <div className="ldg-game-label">
                Multiplayer
              </div>


              <div className="ldg-game-icon">
                ⚖️
              </div>


              <h3>
                Would You Rather for Couples
              </h3>


              <p>
                Both partners get the same
                question on separate devices.
                Pick privately, reveal together,
                and talk about the choices
                that surprise you.
              </p>


              <div className="ldg-game-meta">

                <span>
                  12 rounds
                </span>

                <span>
                  Two devices
                </span>

                <span>
                  Private room
                </span>

                <span>
                  Live chat
                </span>

              </div>


              <Link
                href="/would-you-rather-questions-for-couples"
                className="ldg-text-link"
              >
                Learn About Would You Rather →
              </Link>

            </div>


            <div
              id="create-room"
              className="ldg-featured-cta"
            >

              <PlayTogetherCTA
                entryPoint="long_distance_couple_games_page"
              />

            </div>

          </div>

        </section>


        {/* =================================================
            QUICK GAMES
        ================================================= */}

        <section
          id="quick-games"
          className="ldg-section"
        >

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              QUICK GAMES
            </div>


            <h2>
              Quick Online Games for
              Long Distance Couples
            </h2>


            <p>
              Switch between different kinds
              of games depending on your mood,
              energy, and how much time you have.
              These are useful when you only
              have a few minutes together.
            </p>

          </div>


          <div className="ldg-card-grid">

            {quickGames.map(
              (
                game
              ) => (

                <Link
                  key={
                    game.href
                  }
                  href={
                    game.href
                  }
                  className="ldg-game-card"
                >

                  <div className="ldg-game-card-top">

                    <div className="ldg-game-icon">
                      {game.icon}
                    </div>


                    <div className="ldg-game-label">
                      {game.badge}
                    </div>

                  </div>


                  <h3>
                    {game.title}
                  </h3>


                  <p>
                    {game.description}
                  </p>


                  <div className="ldg-card-link">
                    Play Now →
                  </div>

                </Link>

              )
            )}

          </div>

        </section>


        {/* =================================================
            CONVERSATION GAMES
        ================================================= */}

        <section className="ldg-section">

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              KEEP TALKING
            </div>


            <h2>
              Conversation Games for
              Long Distance Couples
            </h2>


            <p>
              Sometimes you do not need a
              competitive game. One good
              question is enough to make a
              normal call feel different.
            </p>

          </div>


          <div className="ldg-card-grid ldg-card-grid-two">

            {conversationGames.map(
              (
                game
              ) => (

                <Link
                  key={
                    game.href
                  }
                  href={
                    game.href
                  }
                  className="ldg-game-card"
                >

                  <div className="ldg-game-icon">
                    {game.icon}
                  </div>


                  <h3>
                    {game.title}
                  </h3>


                  <p>
                    {game.description}
                  </p>


                  <div className="ldg-card-link">
                    {game.cta} →
                  </div>

                </Link>

              )
            )}

          </div>

        </section>


        {/* =================================================
            PICK BY MOOD
        ================================================= */}

        <section className="ldg-section ldg-soft-section">

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              PICK YOUR VIBE
            </div>


            <h2>
              What Do You Feel Like Doing Tonight?
            </h2>


            <p>
              Long-distance time together
              feels less repetitive when you
              have different kinds of small
              activities to switch between.
            </p>

          </div>


          <div className="ldg-mood-grid">

            {moodChoices.map(
              (
                item
              ) => (

                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className="ldg-mood-card"
                >

                  <div className="ldg-mood-icon">
                    {item.icon}
                  </div>


                  <h3>
                    {item.title}
                  </h3>


                  <p>
                    {item.description}
                  </p>


                  <span>
                    {item.cta} →
                  </span>

                </Link>

              )
            )}

          </div>

        </section>


        {/* =================================================
            WHY TWOLUMI
        ================================================= */}

        <section className="ldg-section">

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              BUILT FOR DISTANCE
            </div>


            <h2>
              Why TwoLumi Works for
              Long Distance Couples
            </h2>

          </div>


          <div className="ldg-benefit-grid">

            <article>

              <div className="ldg-benefit-icon">
                📱
              </div>


              <h3>
                Separate Devices
              </h3>


              <p>
                You do not need to share one
                screen. Both partners can play
                from their own phone or laptop.
              </p>

            </article>


            <article>

              <div className="ldg-benefit-icon">
                🔒
              </div>


              <h3>
                Private Rooms, No Signup
              </h3>


              <p>
                Create a temporary private room,
                share the six-character code,
                and start playing without creating
                an account or personal profile.
              </p>

            </article>


            <article>

              <div className="ldg-benefit-icon">
                💬
              </div>


              <h3>
                Live Chat
              </h3>


              <p>
                Keep talking inside the room
                while you play. Chat messages
                are temporary and are not kept
                as permanent chat history.
              </p>

            </article>


            <article>

              <div className="ldg-benefit-icon">
                🌐
              </div>


              <h3>
                Browser-Based
              </h3>


              <p>
                TwoLumi works directly in the
                browser, so there is nothing to
                install before your date starts.
              </p>

            </article>

          </div>

        </section>


        {/* =================================================
            SEO SUPPORTING CONTENT
        ================================================= */}

        <section className="ldg-section ldg-soft-section">

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              PLAY YOUR WAY
            </div>


            <h2>
              Games That Make Long Distance
              Feel a Little Closer
            </h2>

          </div>


          <div className="ldg-copy-grid">

            <p>
              The best long distance couple games
              do more than fill silence on a video
              call. They give both people something
              small to focus on together. A quick
              choice, a surprising answer, or a
              shared result can make an ordinary
              call feel more interactive without
              turning it into a complicated event.
            </p>


            <p>
              That is why TwoLumi mixes different
              kinds of online games for long distance
              couples. You can start with a private
              multiplayer room when you both want to
              play at the same time, switch to a quick
              This or That round when you only have a
              few minutes, or use couple questions
              when you would rather talk than compete.
            </p>


            <p>
              You do not need to find one perfect game
              and repeat it every night. Switching
              between games, questions, quizzes,
              puzzles, and simple date activities can
              make time together feel less repetitive,
              especially when your usual routine is
              another video call or movie night.
            </p>


            <p>
              The multiplayer experience is designed
              for separate devices, so one partner can
              be on a phone while the other uses a
              laptop somewhere else. There is no app
              to install and no account to create.
              For couples looking for free online games
              for long distance relationships, the goal
              is simple: open the browser, choose
              something that fits your mood, and spend
              a little time doing the same thing
              together.
            </p>

          </div>

        </section>


        {/* =================================================
            MORE LONG DISTANCE CONTENT
        ================================================= */}

        <section className="ldg-section">

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              MORE TO DO TOGETHER
            </div>


            <h2>
              Make the Next Call Feel Different
            </h2>


            <p>
              Mix games, questions, and simple
              date-night activities instead of
              relying on one activity every time.
            </p>

          </div>


          <div className="ldg-support-links">

            <Link
              href="/questions-for-long-distance-couples"
            >

              <span>
                📱
              </span>


              <div>

                <strong>
                  100 Questions for Long Distance Couples
                </strong>


                <p>
                  Better prompts for video calls,
                  daily check-ins, and future plans.
                </p>

              </div>


              <b>
                →
              </b>

            </Link>


            <Link
              href="/long-distance-date-ideas"
            >

              <span>
                ✨
              </span>


              <div>

                <strong>
                  56 Long Distance Date Ideas
                </strong>


                <p>
                  Games, puzzles, walks, food,
                  shared routines, and simple
                  virtual date ideas for your
                  next call.
                </p>

              </div>


              <b>
                →
              </b>

            </Link>


            <Link
              href="/date-night-games"
            >

              <span>
                🌙
              </span>


              <div>

                <strong>
                  Date Night Games for Couples
                </strong>


                <p>
                  Pick something light and interactive
                  for your next virtual date night.
                </p>

              </div>


              <b>
                →
              </b>

            </Link>


            <Link
              href="/games"
            >

              <span>
                🎮
              </span>


              <div>

                <strong>
                  Browse All Online Games for Couples
                </strong>


                <p>
                  Explore all TwoLumi games,
                  quizzes, and question activities
                  in one place.
                </p>

              </div>


              <b>
                →
              </b>

            </Link>

          </div>

        </section>


        {/* =================================================
            FAQ
        ================================================= */}

        <section className="ldg-section">

          <div className="ldg-section-heading">

            <div className="ldg-kicker">
              FAQ
            </div>


            <h2>
              Long Distance Couple Games FAQ
            </h2>

          </div>


          <div className="ldg-faq-list">

            {faqItems.map(
              (
                item
              ) => (

                <details
                  key={
                    item.question
                  }
                  className="ldg-faq-item"
                >

                  <summary>
                    {item.question}
                  </summary>


                  <p>
                    {item.answer}
                  </p>

                </details>

              )
            )}

          </div>

        </section>


        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="ldg-final-cta">

          <div>

            <div className="ldg-kicker">
              READY TO PLAY?
            </div>


            <h2>
              Make Your Next Long Distance Call
              More Fun
            </h2>


            <p>
              Start with a private Would You Rather
              room, send the code to your partner,
              and see where your answers match.
            </p>

          </div>


          <div className="ldg-final-actions">

            <a
              href="#create-room"
              className="ldg-btn-primary"
            >
              Create a Couple Room
            </a>


            <Link
              href="/games"
              className="ldg-btn-secondary"
            >
              Browse All Games
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}