import type { Metadata } from "next";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";

export const metadata: Metadata = {
  title: "Free Couple Games",
  description: "Browse free online games for couples, including quizzes, questions and compatibility games."
};

export default function GamesPage() {
  return (
    <main className="game-page">
      <div className="container">
        <div className="game-kicker">All Games</div>
        <h1 className="game-heading">Free Online Games for Couples</h1>
        <p className="game-sub">Start with a quick game. No signup, no download.</p>
        <div className="game-grid" style={{ marginTop: 26 }}>
          {games.map((game) => <GameCard key={game.href} game={game} />)}
        </div>
      </div>
    </main>
  );
}
