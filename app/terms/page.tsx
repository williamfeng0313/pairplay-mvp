import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",

  description:
    "Read the terms that apply when using TwoLumi games, quizzes, questions, and multiplayer features.",

  alternates: {
    canonical: "https://twolumi.com/terms",
  },

  openGraph: {
    title: "Terms of Use | TwoLumi",

    description:
      "Read the terms that apply when using TwoLumi games, quizzes, questions, and multiplayer features.",

    url: "https://twolumi.com/terms",

    type: "website",
  },
};

export default function TermsPage() {
  return (
    <main className="game-page">
      <div className="container">

        {/* ==============================
            Header
        ============================== */}

        <header className="game-page-header">

          <div className="game-kicker">
            Legal
          </div>

          <h1>
            Terms of Use
          </h1>

          <p className="game-page-description">
            These Terms of Use apply when you access or use
            TwoLumi, including our games, questions, quizzes,
            multiplayer rooms, and related website features.
          </p>

          <p className="game-sub">
            Last updated: August 27, 2026
          </p>

        </header>

        <div className="game-page-content">

          {/* ==============================
              1. Acceptance
          ============================== */}

          <section className="content-card">

            <h2>
              1. Acceptance of These Terms
            </h2>

            <p>
              By accessing or using TwoLumi, you agree to
              these Terms of Use.
            </p>

            <p>
              If you do not agree with these terms, please
              do not use the service.
            </p>

          </section>

          {/* ==============================
              2. Service
          ============================== */}

          <section className="content-card">

            <h2>
              2. About TwoLumi
            </h2>

            <p>
              TwoLumi provides online games, question
              collections, quizzes, compatibility
              experiences, and multiplayer activities
              designed primarily for couples.
            </p>

            <p>
              Most TwoLumi features are currently available
              without creating an account or installing an
              application.
            </p>

            <p>
              Features may be added, changed, suspended, or
              removed over time as the service develops.
            </p>

          </section>

          {/* ==============================
              3. Entertainment
          ============================== */}

          <section className="content-card">

            <h2>
              3. Entertainment Purposes Only
            </h2>

            <p>
              TwoLumi quizzes, compatibility scores,
              questions, results, and game outcomes are
              provided for entertainment and conversation
              purposes only.
            </p>

            <p>
              They are not psychological assessments,
              relationship counseling, medical advice,
              professional advice, or a scientific
              determination of relationship compatibility.
            </p>

            <p>
              You are responsible for deciding how to
              interpret and use any game or quiz result.
            </p>

          </section>

          {/* ==============================
              4. Multiplayer Rooms
          ============================== */}

          <section className="content-card">

            <h2>
              4. Multiplayer Rooms
            </h2>

            <p>
              Certain TwoLumi games allow one user to create
              a temporary room and another user to join
              using a room code.
            </p>

            <p>
              Room codes and participant identifiers are
              temporary technical credentials used to
              operate the multiplayer experience.
            </p>

            <p>
              You should only share a room code with the
              person you intend to play with.
            </p>

            <p>
              TwoLumi does not guarantee that a room will
              remain available indefinitely. Rooms may
              expire or become unavailable due to technical
              issues, maintenance, or service changes.
            </p>

          </section>

          {/* ==============================
              5. Acceptable Use
          ============================== */}

          <section className="content-card">

            <h2>
              5. Acceptable Use
            </h2>

            <p>
              You may use TwoLumi for lawful personal use.
            </p>

            <p>
              You agree not to:
            </p>

            <ul>

              <li>
                Use TwoLumi for unlawful, fraudulent, or
                abusive purposes
              </li>

              <li>
                Attempt to interfere with, overload, damage,
                or disrupt the website or its infrastructure
              </li>

              <li>
                Attempt to gain unauthorized access to
                systems, databases, rooms, tokens, or other
                users&apos; sessions
              </li>

              <li>
                Use automated systems to scrape, attack,
                spam, or excessively query the service
              </li>

              <li>
                Circumvent technical limitations or security
                measures
              </li>

              <li>
                Copy or redistribute substantial portions of
                TwoLumi content in violation of applicable
                law
              </li>

              <li>
                Use the service in a way that infringes the
                rights of another person
              </li>

            </ul>

          </section>

          {/* ==============================
              6. Age
          ============================== */}

          <section className="content-card">

            <h2>
              6. Age and Eligibility
            </h2>

            <p>
              TwoLumi is not intended for children under 13.
            </p>

            <p>
              If the laws where you live require parental
              or guardian permission to use an online
              service, you should only use TwoLumi with the
              permission required by those laws.
            </p>

          </section>

          {/* ==============================
              7. IP
          ============================== */}

          <section className="content-card">

            <h2>
              7. TwoLumi Content and Intellectual Property
            </h2>

            <p>
              The TwoLumi name, branding, website design,
              original game presentation, question
              collections, written content, graphics, and
              other original materials may be protected by
              intellectual property laws.
            </p>

            <p>
              These Terms do not transfer ownership of
              TwoLumi content or intellectual property to
              users.
            </p>

            <p>
              You may use the website for ordinary personal
              use, but you may not reproduce, republish,
              sell, or commercially distribute substantial
              portions of TwoLumi content without
              permission unless applicable law allows it.
            </p>

          </section>

          {/* ==============================
              8. Third Parties
          ============================== */}

          <section className="content-card">

            <h2>
              8. Third-Party Services
            </h2>

            <p>
              TwoLumi may rely on or interact with
              third-party services for hosting, analytics,
              databases, infrastructure, security, or other
              website functions.
            </p>

            <p>
              Those services may be governed by their own
              terms and privacy policies.
            </p>

            <p>
              TwoLumi is not responsible for third-party
              websites or services that we do not control.
            </p>

          </section>

          {/* ==============================
              9. Availability
          ============================== */}

          <section className="content-card">

            <h2>
              9. Availability and Changes
            </h2>

            <p>
              We aim to keep TwoLumi available and working
              reliably, but we do not guarantee continuous
              or uninterrupted availability.
            </p>

            <p>
              The service may occasionally be unavailable
              because of maintenance, technical problems,
              provider outages, security issues, or other
              circumstances.
            </p>

            <p>
              We may modify, update, limit, or discontinue
              features when reasonably necessary.
            </p>

          </section>

          {/* ==============================
              10. No Warranty
          ============================== */}

          <section className="content-card">

            <h2>
              10. Disclaimer of Warranties
            </h2>

            <p>
              To the extent permitted by applicable law,
              TwoLumi is provided on an &quot;as is&quot;
              and &quot;as available&quot; basis.
            </p>

            <p>
              We do not guarantee that every feature will
              always be available, error-free, accurate,
              secure, or suitable for every purpose.
            </p>

          </section>

          {/* ==============================
              11. Liability
          ============================== */}

          <section className="content-card">

            <h2>
              11. Limitation of Liability
            </h2>

            <p>
              To the extent permitted by applicable law,
              TwoLumi and its operators will not be liable
              for indirect, incidental, special,
              consequential, or similar losses arising from
              your use of or inability to use the service.
            </p>

            <p>
              Nothing in these Terms excludes or limits
              liability where doing so would be prohibited
              by applicable law.
            </p>

          </section>

          {/* ==============================
              12. Suspension
          ============================== */}

          <section className="content-card">

            <h2>
              12. Misuse and Access Restrictions
            </h2>

            <p>
              We may restrict or block access to TwoLumi
              when reasonably necessary to protect the
              service, prevent abuse, investigate security
              problems, or comply with legal obligations.
            </p>

          </section>

          {/* ==============================
              13. Privacy
          ============================== */}

          <section className="content-card">

            <h2>
              13. Privacy
            </h2>

            <p>
              Our Privacy Policy explains how information
              may be processed when you use TwoLumi.
            </p>

            <p>
              By using the service, you acknowledge that
              information may be processed as described in
              the Privacy Policy and as permitted by
              applicable law.
            </p>

          </section>

          {/* ==============================
              14. Changes
          ============================== */}

          <section className="content-card">

            <h2>
              14. Changes to These Terms
            </h2>

            <p>
              We may update these Terms when TwoLumi
              changes or when legal, technical, or
              operational requirements change.
            </p>

            <p>
              Updated Terms will be published on this page
              with a revised &quot;Last updated&quot; date.
            </p>

            <p>
              Continued use of TwoLumi after updated Terms
              become effective constitutes acceptance to
              the extent permitted by applicable law.
            </p>

          </section>

        </div>

      </div>
    </main>
  );
}