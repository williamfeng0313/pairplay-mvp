import type { Metadata } from "next";
import Link from "next/link";

import AdSlot from "@/components/AdSlot";

/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "Games for Married Couples — Stay Curious, Stay Playful",

  description:
    "Free games for married couples to keep the conversation going: relationship check-ins, co-op puzzles, compatibility tests, date night games, and anniversary countdowns.",

  alternates: {
    canonical:
      "https://twolumi.com/games-for-married-couples",
  },

  openGraph: {
    title:
      "Games for Married Couples | TwoLumi",

    description:
      "Small, playful ways to keep being curious about each other — free, browser-based, no signup.",

    url:
      "https://twolumi.com/games-for-married-couples",

    siteName: "TwoLumi",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================================
   Content
========================================================= */

const games = [
  {
    icon: "💬",
    label: "Go a little deeper",
    title: "Relationship Check-In",
    href: "/relationship-check-in",
    description:
      "Twelve guided questions, answered separately and revealed together. No scores and no verdict — just a calmer way to talk about how things are going.",
  },

  {
    icon: "🧩",
    label: "Work as a team",
    title: "Couple Puzzle",
    href: "/couple-puzzle",
    description:
      "Each of you gets different clues on your own device. You have to combine what you know to solve eight puzzles together.",
  },

  {
    icon: "✨",
    label: "Compare notes",
    title: "Couple Compatibility Test",
    href: "/couple-compatibility-test",
    description:
      "See where your everyday preferences still line up — and where they have changed. The differences are usually the interesting part.",
  },

  {
    icon: "🕯️",
    label: "For tonight",
    title: "Date Night Games",
    href: "/date-night-games",
    description:
      "A short plan for an evening at home. Pick a game, add a question, and skip the same streaming routine.",
  },

  {
    icon: "📆",
    label: "Celebrate the years",
    title: "Days Together",
    href: "/days-together",
    description:
      "Count every day since it started, track your next anniversary, and make a card for the milestones worth keeping.",
  },

  {
    icon: "🧠",
    label: "Still surprising each other?",
    title: "How Well Do You Know Your Partner?",
    href: "/couple-quiz",
    description:
      "Predict your partner's answers across 20 questions. A good reminder that people keep changing, even after years together.",
  },
];

const weeklyRitual = [
  "Pick one ten-minute game — not a whole evening.",
  "Answer separately when the game supports a private room.",
  "Talk about the one answer that surprised you.",
  "Save the date and do it again next week.",
];

const faqItems = [
  {
    question:
      "What games do married couples actually enjoy?",
    answer:
      "Short ones. Co-op puzzles, private-answer check-ins, and compatibility questions tend to work better than competitive trivia because the fun comes from comparing answers rather than winning.",
  },

  {
    question:
      "We have been together for years — will we learn anything new?",
    answer:
      "Usually yes, and that is the point. The questions are designed around small preferences, changing habits, and future plans rather than facts you already know about each other.",
  },

  {
    question:
      "Can we play on separate devices or long distance?",
    answer:
      "Yes. Multiplayer rooms use a private six-character code, so each person can answer on their own phone or laptop. This also works when one of you is travelling.",
  },

  {
    question:
      "Is anything saved or shared?",
    answer:
      "No account is required and answers are not uploaded. Dates, streaks, and saved date ideas are stored only in your own browser.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* =========================================================
   Page
========================================================= */

export default function MarriedCouplesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* ==============================
          Hero
      ============================== */}

      <section className="section">
        <div className="container">
          <div className="content-card">
            <div className="game-kicker">
              STILL CURIOUS AFTER ALL THIS TIME
            </div>

            <h1>
              🏠 Games for Married Couples
            </h1>

            <p className="game-sub">
              Knowing someone for years does not
              mean there is nothing left to find
              out. These are small, playful ways
              to keep asking questions — a
              ten-minute check-in, a co-op
              puzzle, or a countdown to the next
              milestone.
            </p>

            <div className="pill-grid">
              <span className="pill">No signup</span>
              <span className="pill">Separate devices</span>
              <span className="pill">Ten minutes is enough</span>
              <span className="pill">Free to play</span>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Link
                href="/relationship-check-in"
                className="btn-primary inline-button"
              >
                Start a Check-In →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          Games
      ============================== */}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">
              ♥ Pick Something for Tonight
            </h2>

            <Link href="/games" className="section-link">
              All games →
            </Link>
          </div>

          <div className="content-grid">
            {games.map((game) => (
              <div key={game.href} className="content-card">
                <div className="game-kicker">
                  {game.icon} {game.label}
                </div>

                <h2 style={{ fontSize: "1.3rem" }}>
                  {game.title}
                </h2>

                <p className="game-sub">
                  {game.description}
                </p>

                <Link
                  href={game.href}
                  className="pill"
                  style={{ marginTop: "8px" }}
                >
                  Play now →
                </Link>
              </div>
            ))}
          </div>

          <AdSlot label="Married couples page slot" />
        </div>
      </section>

      {/* ==============================
          Ritual
      ============================== */}

      <section className="section">
        <div className="container content-grid">
          <div className="content-card">
            <div className="game-kicker">
              MAKE IT A RITUAL
            </div>

            <h2>Ten minutes a week beats one big date</h2>

            <ul className="check-list">
              {weeklyRitual.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="content-card">
            <h2>Mark the days</h2>

            <p className="game-sub">
              A little countdown gives you
              something to look forward to that
              is not a chore or a holiday. See
              how many days it has been, then
              send each other the card.
            </p>

            <Link
              href="/days-together"
              className="btn-primary inline-button"
            >
              Count Our Days →
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================
          FAQ
      ============================== */}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">
              Married couple games FAQ
            </h2>
          </div>

          <div className="content-card">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="days-faq-item"
              >
                <summary>{item.question}</summary>

                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          Related
      ============================== */}

      <section className="section">
        <div className="container">
          <div className="content-card">
            <h2>More for the two of you</h2>

            <div className="pill-grid">
              <Link className="pill" href="/games">
                All Couple Games
              </Link>

              <Link
                className="pill"
                href="/games-for-new-couples"
              >
                Games for New Couples
              </Link>

              <Link
                className="pill"
                href="/long-distance-date-ideas"
              >
                Long Distance Date Ideas
              </Link>

              <Link className="pill" href="/couple-questions">
                Couple Questions
              </Link>

              <Link className="pill" href="/photo-booth">
                📸 Photo Booth
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
