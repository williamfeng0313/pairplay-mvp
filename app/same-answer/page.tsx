import type {
    Metadata,
  } from "next";
  
  import Link from "next/link";
  
  import SameAnswerLauncher from "@/components/SameAnswerLauncher";
  
  export const metadata:
    Metadata = {
    title:
      "Same Answer for Couples",
  
    description:
      "See how often you and your partner pick the same answer in this private two-player couple game.",
  
    robots: {
      /*
       * V1 先测试产品，
       * 暂时不要让它承担 SEO。
       */
      index:
        false,
  
      follow:
        true,
    },
  };
  
  export default function SameAnswerPage() {
    return (
      <main className="game-page">
  
        <div className="container">
  
          <div className="play-card">
  
            <div className="game-kicker">
              Same Answer
            </div>
  
            <h1>
              How Often Do You Think Alike?
            </h1>
  
            <p className="game-sub">
              Create a private room,
              invite your partner,
              and answer 12 quick questions
              on separate devices.
              Your answers stay hidden
              until both of you choose.
            </p>
  
            <div className="hero-actions">
  
              <SameAnswerLauncher />
  
              <Link
                href="/games"
                className="btn-secondary"
              >
                Browse All Games
              </Link>
  
            </div>
  
            <div className="micro-copy">
              12 rounds
              · 4 choices each
              · Private room
              · No signup
            </div>
  
          </div>
  
        </div>
  
      </main>
    );
  }