import type { Metadata } from "next";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Long Distance Couple Games — Play Online Together",
  description: "Free online games for long-distance couples. Play questions, quizzes and choice games together."
};

export default function Page() {
  return (
    <main className="game-page">
      <div className="container">
        <div className="game-kicker">Long Distance</div>
        <h1 className="game-heading">Online Games for Long Distance Couples</h1>
        <p className="game-sub">
          Pick a game, send it to your partner, and stay connected even when you are far apart.
        </p>
        <div className="game-grid" style={{ marginTop: 28 }}>
          {games.slice(0, 4).map((game) => <GameCard key={game.href} game={game} />)}
        </div>
        <AdSlot label="Long-distance landing page slot" />
      </div>
    </main>
  );
}
