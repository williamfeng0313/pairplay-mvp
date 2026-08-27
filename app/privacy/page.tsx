import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",

  description:
    "Learn how TwoLumi handles game data, analytics, cookies, multiplayer room information, and privacy.",

  alternates: {
    canonical: "https://twolumi.com/privacy",
  },

  openGraph: {
    title: "Privacy Policy | TwoLumi",

    description:
      "Learn how TwoLumi handles game data, analytics, cookies, multiplayer room information, and privacy.",

    url: "https://twolumi.com/privacy",

    type: "website",
  },
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="game-page-description">
            This Privacy Policy explains what information
            TwoLumi may process when you use our website,
            games, quizzes, and multiplayer features.
          </p>

          <p className="game-sub">
            Last updated: August 27, 2026
          </p>

        </header>

        <div className="game-page-content">

          {/* ==============================
              1. Overview
          ============================== */}

          <section className="content-card">

            <h2>
              1. Overview
            </h2>

            <p>
              TwoLumi provides free online games,
              questions, quizzes, and interactive
              experiences for couples.
            </p>

            <p>
              You can use most TwoLumi features without
              creating an account or providing your name,
              email address, or other profile information.
            </p>

            <p>
              We aim to collect only the information
              reasonably necessary to operate, secure,
              understand, and improve the service.
            </p>

          </section>

          {/* ==============================
              2. Information We Process
          ============================== */}

          <section className="content-card">

            <h2>
              2. Information We Process
            </h2>

            <h3>
              Multiplayer room information
            </h3>

            <p>
              When you create or join a multiplayer room,
              TwoLumi may process temporary technical and
              game information such as:
            </p>

            <ul>

              <li>
                A temporary room code
              </li>

              <li>
                Temporary participant identifiers or tokens
              </li>

              <li>
                The game being played
              </li>

              <li>
                Question or round progress
              </li>

              <li>
                Answers or choices submitted during the game
              </li>

              <li>
                Room status and timestamps
              </li>

            </ul>

            <p>
              This information is used to synchronize the
              experience between two devices and operate
              multiplayer games. Multiplayer rooms are
              designed to expire, and expired room records
              may be removed from the service.
            </p>

            <h3>
              Analytics information
            </h3>

            <p>
              TwoLumi uses Google Analytics to understand
              how visitors use the website and which games
              and features are useful.
            </p>

            <p>
              Analytics information may include information
              such as:
            </p>

            <ul>

              <li>
                Pages viewed
              </li>

              <li>
                Game or feature interactions
              </li>

              <li>
                Approximate device and browser information
              </li>

              <li>
                General geographic information
              </li>

              <li>
                Referral source
              </li>

              <li>
                Session and usage information
              </li>

            </ul>

            <p>
              We use analytics primarily in aggregated form
              to understand performance and improve the
              TwoLumi experience.
            </p>

            <h3>
              Technical information
            </h3>

            <p>
              Our hosting, infrastructure, security, and
              analytics providers may automatically process
              technical information required to deliver the
              website, such as IP address, browser type,
              request information, timestamps, and error or
              security logs.
            </p>

          </section>

          {/* ==============================
              3. How We Use Information
          ============================== */}

          <section className="content-card">

            <h2>
              3. How We Use Information
            </h2>

            <p>
              We may use information processed through
              TwoLumi to:
            </p>

            <ul>

              <li>
                Provide and operate games and website features
              </li>

              <li>
                Create, join, and synchronize multiplayer rooms
              </li>

              <li>
                Display game results and answer reveals
              </li>

              <li>
                Understand how visitors use TwoLumi
              </li>

              <li>
                Improve games, questions, quizzes, and usability
              </li>

              <li>
                Diagnose technical problems
              </li>

              <li>
                Protect the website from abuse, fraud, or
                security threats
              </li>

              <li>
                Comply with applicable legal obligations
              </li>

            </ul>

          </section>

          {/* ==============================
              4. Cookies
          ============================== */}

          <section className="content-card">

            <h2>
              4. Cookies and Similar Technologies
            </h2>

            <p>
              Third-party analytics services such as Google
              Analytics may use cookies or similar
              technologies to measure website usage and
              understand visitor activity.
            </p>

            <p>
              Your browser may allow you to block or delete
              cookies. Doing so may affect analytics or some
              website functionality.
            </p>

          </section>

          {/* ==============================
              5. Third Party Services
          ============================== */}

          <section className="content-card">

            <h2>
              5. Third-Party Service Providers
            </h2>

            <p>
              TwoLumi relies on third-party providers to
              operate parts of the service. These may
              include:
            </p>

            <ul>

              <li>
                Google Analytics for website analytics
              </li>

              <li>
                Supabase for multiplayer room infrastructure
                and game data
              </li>

              <li>
                Hosting and infrastructure providers used to
                deliver the TwoLumi website
              </li>

            </ul>

            <p>
              These providers may process information
              according to their own privacy policies and
              terms when providing services to TwoLumi.
            </p>

          </section>

          {/* ==============================
              6. Sharing
          ============================== */}

          <section className="content-card">

            <h2>
              6. How Information May Be Shared
            </h2>

            <p>
              TwoLumi does not sell your personal
              information.
            </p>

            <p>
              Information may be shared with service
              providers when necessary to host, operate,
              analyze, secure, or maintain the website.
            </p>

            <p>
              We may also disclose information when required
              by law, legal process, or when reasonably
              necessary to protect the rights, security, or
              integrity of TwoLumi, our users, or others.
            </p>

          </section>

          {/* ==============================
              7. Data Retention
          ============================== */}

          <section className="content-card">

            <h2>
              7. Data Retention
            </h2>

            <p>
              Multiplayer room information is intended to be
              temporary and rooms are designed to expire.
              Expired data may be periodically removed.
            </p>

            <p>
              Analytics and technical information may be
              retained according to our analytics,
              infrastructure, and hosting providers&apos;
              retention settings and policies.
            </p>

            <p>
              We may retain information for longer when
              reasonably necessary for security, legal, or
              operational purposes.
            </p>

          </section>

          {/* ==============================
              8. International Processing
          ============================== */}

          <section className="content-card">

            <h2>
              8. International Data Processing
            </h2>

            <p>
              TwoLumi is available online and may use
              service providers located in different
              countries.
            </p>

            <p>
              As a result, information may be processed or
              stored outside the country where you live,
              subject to applicable laws and the safeguards
              used by our service providers.
            </p>

          </section>

          {/* ==============================
              9. Rights
          ============================== */}

          <section className="content-card">

            <h2>
              9. Your Privacy Rights
            </h2>

            <p>
              Depending on where you live, applicable law
              may give you rights relating to personal
              information, including rights to request
              access, correction, deletion, restriction, or
              information about how certain data is used.
            </p>

            <p>
              Because TwoLumi currently does not require
              user accounts, we may not always be able to
              associate anonymous game or analytics data
              with a specific individual.
            </p>

          </section>

          {/* ==============================
              10. Children
          ============================== */}

          <section className="content-card">

            <h2>
              10. Children&apos;s Privacy
            </h2>

            <p>
              TwoLumi is not directed to children under the
              age of 13.
            </p>

            <p>
              If you believe that a child has provided
              personal information to TwoLumi in a way that
              requires removal under applicable law, please
              contact us so the matter can be reviewed.
            </p>

          </section>

          {/* ==============================
              11. Security
          ============================== */}

          <section className="content-card">

            <h2>
              11. Security
            </h2>

            <p>
              We use reasonable technical and organizational
              measures intended to protect the service and
              information processed through it.
            </p>

            <p>
              However, no website, network, or storage
              system can guarantee absolute security.
            </p>

          </section>

          {/* ==============================
              12. Changes
          ============================== */}

          <section className="content-card">

            <h2>
              12. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy when
              TwoLumi changes, when new features or
              providers are introduced, or when legal
              requirements change.
            </p>

            <p>
              The date at the top of this page will be
              updated when material changes are published.
            </p>

          </section>

          <section className="content-card">

            <h2>
              13. Contact Us
            </h2>

            <p>
              If you have questions about this Privacy Policy,
              privacy requests, or how TwoLumi handles information,
              you can contact us at:
            </p>

            <p>
              <a href="mailto:privacy@twolumi.com">
                privacy@twolumi.com
              </a>
            </p>

          </section>

        </div>

      </div>
    </main>
  );
}