import type { Metadata } from "next";
import GameCard from "@/components/GameCard";
import { games } from "@/data/games";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Free Date Night Games for Couples",
  description: "Free date night games for couples to play at home or online. Questions, quizzes and quick games."
};

export default function Page() {
  return (
    <main className="game-page">
      <div className="container">
        <div className="game-kicker">Date Night</div>
        <h1 className="game-heading">Free Date Night Games for Couples</h1>
        <p className="game-sub">
          Turn a normal night into something more playful with fast games and conversation starters.
        </p>
        <div className="game-grid" style={{ marginTop: 28 }}>
          {games.map((game) => <GameCard key={game.href} game={game} />)}
        </div>
        <AdSlot label="Date-night landing page slot" />
      </div>
    </main>
  );
}
