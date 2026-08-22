import Link from "next/link";
import type { Game } from "@/data/games";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link href={game.href} className="game-card">
      <div className={`game-icon ${game.iconClass}`}>{game.emoji}</div>
      <h3>{game.title}</h3>
      <p>{game.description}</p>
    </Link>
  );
}
