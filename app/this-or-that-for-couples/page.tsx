import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import ChoiceGame from "@/components/ChoiceGame";
import { thisOrThat } from "@/data/questions";

export const metadata: Metadata = {
  title: "This or That for Couples",
  description: "Play a fast This or That game for couples. Quick choices and instant conversation starters."
};

export default function Page() {
  return (
    <GamePageLayout
      kicker="Quick Game"
      title="This or That for Couples"
      description="Fast choices. No overthinking. See how often you pick the same thing."
    >
      <ChoiceGame questions={thisOrThat} label="This or That" />
    </GamePageLayout>
  );
}
