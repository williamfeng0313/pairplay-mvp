import type { Metadata } from "next";
import Link from "next/link";

import AdSlot from "@/components/AdSlot";

/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "Fun Games for New Couples — Icebreakers & Getting to Know You",

  description:
    "Low-pressure games for new couples. Break the ice with fun questions, Would You Rather, and This or That — free, no signup, and easy to play on one phone.",

  alternates: {
    canonical:
      "https://twolumi.com/games-for-new-couples",
  },

  openGraph: {
    title:
      "Fun Games for New Couples | TwoLumi",

    description:
      "Easy, low-pressure games and questions for couples who are just getting to know each other.",

    url:
      "https://twolumi.com/games-for-new-couples",

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

const starterGames = [
  {
    icon: "💬",
    label: "Best place to start",
    title: "Questions to Ask Your Partner",
    href: "/couple-questions",
    description:
      "100 fun, light, and thoughtful questions. Start with the Fun and Getting to Know You categories — no heavy topics required.",
  },

  {
    icon: "⚖️",
    label: "Quick and playful",
    title: "Would You Rather for Couples",
    href: "/would-you-rather-questions-for-couples",
    description:
      "Silly two-option dilemmas are the fastest way to find out how someone thinks, and they almost always turn into a story.",
  },

  {
    icon: "💗",
    label: "Two minutes",
    title: "This or That for Couples",
    href: "/this-or-that-for-couples",
    description:
      "Fast either-or choices with no right answer. Great when you are waiting for food or killing time on a call.",
  },

  {
    icon: "🕯️",
    label: "For a real date",
    title: "Date Night Games",
    href: "/date-night-games",
    description:
      "A ready-made plan for an evening in: pick a game, add a few questions, and let the conversation go somewhere.",
  },
];

const firstGameNight = [
  "Start with one Fun question each — keep it light.",
  "Play five rounds of This or That and explain one answer.",
  "Pick three deeper questions only if you both feel like it.",
  "End by saving one thing you learned about each other.",
];

const faqItems = [
  {
    question:
      "What are good games for couples who just started dating?",
    answer:
      "Choose games with no wrong answers and no pressure to share anything personal. Would You Rather, This or That, and light couple questions work well because they create stories instead of tests.",
  },

  {
    question:
      "Are these games awkward on a first or second date?",
    answer:
      "They are designed to be. TwoLumi games have no scores to defend, no accounts, and no timer. You can skip any question and switch games at any point, so it stays a conversation rather than an interview.",
  },

  {
    question:
      "Can we play on one phone together?",
    answer:
      "Yes. Couple Questions, This or That, and the compatibility test all work on a single device. Multiplayer rooms are optional and use a private six-character code if you want separate phones.",
  },

  {
    question:
      "Do new couples need to sign up?",
    answer:
      "No. Every TwoLumi game runs in the browser with no account and no download. Nothing you answer is uploaded.",
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

export default function NewCouplesPage() {
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
              JUST THE TWO OF YOU, FOR NOW
            </div>

            <h1>
              ☕ Fun Games for New Couples
            </h1>

            <p className="game-sub">
              The early part should feel easy. These
              are low-pressure games and questions
              that help you learn how the other
              person thinks — without turning date
              night into an interview or a quiz
              about feelings you are not ready to
              discuss.
            </p>

            <div className="pill-grid">
              <span className="pill">No awkward questions</span>
              <span className="pill">No signup</span>
              <span className="pill">Works on one phone</span>
              <span className="pill">Free to play</span>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Link
                href="/couple-questions"
                className="btn-primary inline-button"
              >
                Start with a Question →
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
              ✨ Where to Start
            </h2>

            <Link href="/games" className="section-link">
              All games →
            </Link>
          </div>

          <div className="content-grid">
            {starterGames.map((game) => (
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

          <AdSlot label="New couples page slot" />
        </div>
      </section>

      {/* ==============================
          Plan
      ============================== */}

      <section className="section">
        <div className="container content-grid">
          <div className="content-card">
            <div className="game-kicker">
              20 MINUTES, NO PREP
            </div>

            <h2>A first game night that flows</h2>

            <ul className="check-list">
              {firstGameNight.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="content-card">
            <h2>Keep it comfortable</h2>

            <p className="game-sub">
              You can skip any question, change
              game at any time, and stop whenever
              the conversation gets good. The
              game is a starting point, not the
              point.
            </p>

            <div className="pill-grid">
              <Link className="pill" href="/couple-questions">
                100 Couple Questions
              </Link>

              <Link
                className="pill"
                href="/this-or-that-for-couples"
              >
                This or That
              </Link>

              <Link className="pill" href="/date-night-games">
                Date Night Ideas
              </Link>
            </div>
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
              New couple games FAQ
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
            <h2>Keep exploring together</h2>

            <div className="pill-grid">
              <Link className="pill" href="/games">
                All Couple Games
              </Link>

              <Link
                className="pill"
                href="/games-for-married-couples"
              >
                Games for Married Couples
              </Link>

              <Link className="pill" href="/days-together">
                📆 Days Together
              </Link>

              <Link
                className="pill"
                href="/long-distance-couple-games"
              >
                Long Distance Games
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
