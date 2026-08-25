import type {
  Metadata,
} from "next";

import GamePageLayout from "@/components/GamePageLayout";

import CompatibilityTest from "@/components/CompatibilityTest";

export const metadata:
  Metadata = {
  title:
    "Couple Compatibility Test: Are You Compatible? | TwoLumi",

  description:
    "Take a free couple compatibility test with your partner and compare your answers across lifestyle, future plans, everyday habits, and connection.",

  alternates: {
    canonical:
      "https://twolumi.com/couple-compatibility-test",
  },
};

export default function Page() {
  return (
    <GamePageLayout
      kicker="Couple Quiz"
      title="Couple Compatibility Test"
      description="Answer separately, compare your preferences, and see where you and your partner match."
    >

      <CompatibilityTest />

    </GamePageLayout>
  );
}