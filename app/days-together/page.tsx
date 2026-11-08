import type { Metadata } from "next";
import Link from "next/link";

import DaysTogetherCalculator from "@/components/DaysTogetherCalculator";
import AdSlot from "@/components/AdSlot";

/* =========================================================
   SEO Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "How Many Days Have We Been Together? Anniversary Countdown | TwoLumi",

  description:
    "Count the days you've been together, see your next anniversary countdown, and celebrate 100, 365, 520, and 1000 day milestones. Free, private, no signup.",

  alternates: {
    canonical: "https://twolumi.com/days-together",
  },

  openGraph: {
    title:
      "How Many Days Have We Been Together? | TwoLumi",

    description:
      "A free days-together counter with anniversary countdown, milestones, and a shareable card.",

    url: "https://twolumi.com/days-together",

    siteName: "TwoLumi",

    type: "website",
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
      "How do you count how many days you've been together?",

    answer:
      "Count the day you got together as day one, then add one for every day since. TwoLumi does this automatically from the date you pick, and also shows weeks, months, and years.",
  },

  {
    question:
      "When is our anniversary if we got together on February 29?",

    answer:
      "For February 29 start dates, TwoLumi places the anniversary on February 28 in non-leap years, so you always have one anniversary every year.",
  },

  {
    question:
      "What are common couple milestones?",

    answer:
      "Many couples celebrate 100 days, 200 days, one year (365 days), 500 days, 520 days, 1000 days, and each yearly anniversary after that. TwoLumi shows the date and countdown for every one of them.",
  },

  {
    question:
      "Does TwoLumi save my anniversary date?",

    answer:
      "Your date is stored only in your own browser using local storage. It is never uploaded to a server, and there is no account to create. Clearing your browser data removes it.",
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

export default function DaysTogetherPage() {
  return (
    <main className="days-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className="container">
        {/* ==============================
            Hero
        ============================== */}

        <section className="days-page-hero">
          <div className="game-kicker">
            A LITTLE COUNTER FOR TWO
          </div>

          <h1>
            How Many Days Have
            We Been Together?
          </h1>

          <p>
            Every couple has a day that started
            it all. Pick yours and we&apos;ll
            count every day since, find your
            next anniversary, and turn the
            number into a card you can send.
          </p>

          <div className="days-trust">
            <span>✓ Free</span>
            <span>✓ No signup</span>
            <span>✓ Stays on your device</span>
          </div>
        </section>

        {/* ==============================
            Calculator
        ============================== */}

        <DaysTogetherCalculator />

        <AdSlot label="Days together page slot" />

        {/* ==============================
            Ideas
        ============================== */}

        <section className="days-ideas">
          <div className="game-kicker">
            MAKE A DAY OF IT
          </div>

          <h2>
            What to do with your number
          </h2>

          <div className="days-idea-grid">
            <article className="days-idea">
              <span>💌</span>

              <h3>Send the card</h3>

              <p>
                Turn your day count into an
                image and send it to your
                partner — a tiny surprise on
                an ordinary Tuesday.
              </p>
            </article>

            <article className="days-idea">
              <span>🕯️</span>

              <h3>Plan the next milestone</h3>

              <p>
                The countdown gives you a date
                to look forward to. Pair it
                with a date night game and
                make an evening of it.
              </p>

              <Link href="/date-night-games">
                Date night games →
              </Link>
            </article>

            <article className="days-idea">
              <span>💬</span>

              <h3>Talk about the days</h3>

              <p>
                Use a question from today&apos;s
                deck to remember how it all
                started and where you want to
                go next.
              </p>

              <Link href="/couple-questions">
                Couple questions →
              </Link>
            </article>
          </div>
        </section>

        {/* ==============================
            FAQ
        ============================== */}

        <section className="days-faq">
          <div className="game-kicker">FAQ</div>

          <h2>
            Days together counter FAQ
          </h2>

          <div className="days-faq-list">
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
        </section>

        {/* ==============================
            Related
        ============================== */}

        <section className="days-related">
          <h2>More for the two of you</h2>

          <div className="pill-grid">
            <Link className="pill" href="/games">
              All couple games
            </Link>

            <Link
              className="pill"
              href="/couple-compatibility-test"
            >
              Compatibility test
            </Link>

            <Link
              className="pill"
              href="/long-distance-date-ideas"
            >
              Long distance date ideas
            </Link>

            <Link className="pill" href="/photo-booth">
              📸 Photo booth
            </Link>

            <Link
              className="pill"
              href="/questions-for-long-distance-couples"
            >
              Long distance questions
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
