import type { Metadata } from "next";
import GamePageLayout from "@/components/GamePageLayout";
import QuizGame from "@/components/QuizGame";
import { quizQuestions } from "@/data/questions";

export const metadata: Metadata = {
  title: "Couple Quiz — How Well Do You Know Your Partner?",
  description: "Take a quick couple quiz and compare what you know about your partner."
};

export default function Page() {
  return (
    <GamePageLayout
      kicker="Couple Quiz"
      title="How Well Do You Know Your Partner?"
      description="A lightweight MVP quiz. Phase 2 will compare both partners' answers through an invite link."
    >
      <QuizGame questions={quizQuestions} />
    </GamePageLayout>
  );
}
