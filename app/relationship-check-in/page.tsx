import type { Metadata } from "next";
import Link from "next/link";

import RelationshipCheckInLauncher from "@/components/RelationshipCheckInLauncher";

import {
  relationshipCheckInQuestions,
  relationshipCheckInStages,
} from "@/data/relationshipCheckInQuestions";

export const metadata: Metadata = {
  title: "Relationship Check-In for Couples",
  description:
    "A private guided relationship check-in for couples who feel distant, stuck, or unsure. Answer separately, reveal together, and talk through what matters.",
  alternates: {
    canonical: "https://twolumi.com/relationship-check-in",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Relationship Check-In for Couples | TwoLumi",
    description:
      "A private guided conversation for couples who want more clarity, understanding, and honest communication.",
    url: "https://twolumi.com/relationship-check-in",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relationship Check-In for Couples | TwoLumi",
    description:
      "Answer separately, reveal together, and talk through what matters — privately.",
  },
};

const howItWorks = [
  {
    step: "1",
    title: "Create a private room",
    text: "One person starts the check-in and shares the room code with their partner.",
  },
  {
    step: "2",
    title: "Answer separately",
    text: "Your answer stays hidden until both of you respond.",
  },
  {
    step: "3",
    title: "Reveal together",
    text: "See both answers without scores, winners, or a compatibility verdict.",
  },
  {
    step: "4",
    title: "Talk about one thing at a time",
    text: "Each reveal comes with one calm discussion prompt to help you understand each other.",
  },
];

export default function RelationshipCheckInPage() {
  return (
    <main className="relationship-check-page">
      <section className="relationship-check-hero">
        <div className="relationship-check-shell">
          <div className="game-kicker">PRIVATE COUPLE CHECK-IN</div>

          <h1>Relationship Check-In for Couples</h1>

          <p className="relationship-check-lead">
            When things feel distant, repetitive, or uncertain, it can be hard
            to start the conversation. This private check-in gives both of you
            a calmer way to answer first, reveal together, and talk through
            what matters.
          </p>

          <div className="relationship-check-note">
            <strong>This is not a compatibility score.</strong>
            <span>
              TwoLumi will not tell you whether to stay together or break up.
              The goal is understanding and clarity.
            </span>
          </div>

          <RelationshipCheckInLauncher />

          <div className="relationship-check-meta-row">
            <span>12 guided questions</span>
            <span>No signup</span>
            <span>Separate devices</span>
            <span>Private room</span>
          </div>
        </div>
      </section>

      <section className="relationship-check-section">
        <div className="relationship-check-shell">
          <div className="game-kicker">HOW IT WORKS</div>
          <h2>A difficult conversation, broken into smaller steps</h2>

          <div className="relationship-check-how-grid">
            {howItWorks.map((item) => (
              <article key={item.step} className="relationship-check-how-card">
                <span className="relationship-check-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relationship-check-section relationship-check-section-soft">
        <div className="relationship-check-shell">
          <div className="game-kicker">WHAT YOU&apos;LL TALK ABOUT</div>
          <h2>12 questions across six relationship areas</h2>

          <p className="relationship-check-section-copy">
            The questions focus on how the relationship feels right now,
            whether both of you still want to invest in it, what feels missing,
            and what would need to change.
          </p>

          <div className="relationship-check-stage-grid">
            {relationshipCheckInStages.map((stage) => {
              const questions = relationshipCheckInQuestions.filter(
                (question) => question.stage === stage.key
              );

              return (
                <article key={stage.key} className="relationship-check-stage-card">
                  <div className="relationship-check-stage-icon">
                    {stage.icon}
                  </div>

                  <div>
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>

                    <ul>
                      {questions.map((question) => (
                        <li key={question.id}>{question.preview}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relationship-check-section">
        <div className="relationship-check-shell relationship-check-example">
          <div>
            <div className="game-kicker">EXAMPLE REVEAL</div>
            <h2>No “match” score. Just a clearer conversation.</h2>

            <p>
              If you answer differently, TwoLumi does not label that as a bad
              result. You simply see both answers and get one question to talk
              about together.
            </p>
          </div>

          <div className="relationship-check-example-card">
            <div className="game-kicker">QUESTION</div>

            <h3>
              Do you still want to make an effort to improve this relationship?
            </h3>

            <div className="relationship-check-example-answers">
              <div>
                <span>You</span>
                <strong>Yes, definitely</strong>
              </div>

              <div>
                <span>Partner</span>
                <strong>I&apos;m not sure yet</strong>
              </div>
            </div>

            <div className="relationship-check-discussion">
              <span>Talk about this</span>
              <p>
                What would make trying again feel worthwhile for each of you?
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relationship-check-section relationship-check-section-soft">
        <div className="relationship-check-shell">
          <div className="game-kicker">WHAT THIS IS FOR</div>

          <div className="relationship-check-use-grid">
            <article>
              <h3>Feeling distant</h3>
              <p>
                You still care, but conversations have become shallow,
                repetitive, or easy to avoid.
              </p>
            </article>

            <article>
              <h3>Long-distance pressure</h3>
              <p>
                Distance, schedules, and missed moments are making it harder to
                feel like a team.
              </p>
            </article>

            <article>
              <h3>Thinking about whether to keep trying</h3>
              <p>
                One or both of you are unsure and want a calmer way to
                understand what each person actually wants.
              </p>
            </article>
          </div>

          <div className="relationship-check-safety">
            <strong>Important:</strong>
            <p>
              This tool is for voluntary conversations between partners. If
              there is violence, coercion, stalking, threats, or you feel
              unsafe, prioritize your safety and trusted professional or local
              support rather than using a joint conversation tool.
            </p>
          </div>
        </div>
      </section>

      <section className="relationship-check-section">
        <div className="relationship-check-shell relationship-check-bottom-cta">
          <div>
            <div className="game-kicker">START WHEN YOU&apos;RE BOTH READY</div>
            <h2>One room. Twelve questions. No verdict.</h2>
            <p>
              The goal is not to force closeness. It is to leave the
              conversation understanding each other a little better.
            </p>
          </div>

          <RelationshipCheckInLauncher />

          <Link href="/games" className="relationship-check-back-link">
            ← Explore lighter couple games
          </Link>
        </div>
      </section>
    </main>
  );
}
