import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import QuestionDeck from "@/components/QuestionDeck";
import { coupleQuestions } from "@/data/questions";

export const metadata: Metadata = {
  title: "Couple Questions — Fun, Deep & Romantic",
  description: "Free couple questions for better conversations, date nights and long-distance relationships."
};

export default function Page() {
  return (
    <GamePageLayout
      kicker="Conversation Game"
      title="Couple Questions"
      description="Skip the giant list. Pull one question at a time and actually talk."
    >
      <QuestionDeck questions={coupleQuestions} />
    </GamePageLayout>
  );
}
