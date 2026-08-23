import type { Metadata } from "next";

import GamePageLayout from "@/components/GamePageLayout";
import ChoiceGame from "@/components/ChoiceGame";
import PlayTogetherCTA from "@/components/PlayTogetherCTA";

import { wouldYouRather } from "@/data/questions";

export const metadata: Metadata = {
  title: "Would You Rather Questions for Couples | TwoLumi",

  description:
    "Play free Would You Rather questions for couples online. Play together on one device or create a private TwoLumi room to compare hidden answers with your partner.",

  alternates: {
    canonical:
      "https://twolumi.com/would-you-rather-questions-for-couples",
  },

  openGraph: {
    title:
      "Would You Rather Questions for Couples | TwoLumi",

    description:
      "Fun Would You Rather questions for couples. Play on one device or create a private room and reveal your answers together.",

    url:
      "https://twolumi.com/would-you-rather-questions-for-couples",

    type: "website",
  },
};

export default function Page() {
  return (
    <GamePageLayout
      kicker="Couple Game"
      title="Would You Rather Questions for Couples"
      description="Pick a side, compare answers, and discover the funny little differences between you."
    >
      {/* ==============================
          Multiplayer CTA
      ============================== */}

      <PlayTogetherCTA
        source="would_you_rather_page"
      />

      {/* ==============================
          Play Mode Explanation
      ============================== */}

      <div
        className="content-card"
        style={{
          marginBottom: 22,
        }}
      >
        <h2>
          Play Together or on One Device
        </h2>

        <p className="game-sub">
          Together in the same place?
          Use the game below and take
          turns choosing on one device.
        </p>

        <p className="game-sub">
          Playing long distance?
          Create a private TwoLumi room
          above. You and your partner
          will get the same questions,
          and your choices stay hidden
          until both of you answer.
        </p>
      </div>

      {/* ==============================
          Normal / Same-device Game
      ============================== */}

      <ChoiceGame
        questions={wouldYouRather}
      />
    </GamePageLayout>
  );
}