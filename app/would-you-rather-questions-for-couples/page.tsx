import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import ChoiceGame from "@/components/ChoiceGame";
import { wouldYouRather } from "@/data/questions";

export const metadata: Metadata = {
  title: "Would You Rather Questions for Couples",
  description: "Play free Would You Rather questions for couples online. Fun choices, no signup."
};

export default function Page() {
  return (
    <GamePageLayout
      kicker="Couple Game"
      title="Would You Rather Questions for Couples"
      description="Pick a side, compare answers, and discover the funny little differences between you."
    >
      <ChoiceGame questions={wouldYouRather} />
    </GamePageLayout>
  );
}
