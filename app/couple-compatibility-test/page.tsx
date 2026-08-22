import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import CompatibilityGame from "@/components/CompatibilityGame";
import { compatibilityQuestions } from "@/data/questions";

export const metadata: Metadata = {
  title: "Free Couple Compatibility Test",
  description: "Take a fun couple compatibility test together and compare your answers. No signup required."
};

export default function Page() {
  return (
    <GamePageLayout
      kicker="Compatibility Game"
      title="Couple Compatibility Test"
      description="Answer the same questions separately, then compare your match score. For fun and conversation — not relationship advice."
    >
      <CompatibilityGame questions={compatibilityQuestions} />
    </GamePageLayout>
  );
}
