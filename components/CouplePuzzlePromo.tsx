import Link from "next/link";

type CouplePuzzlePromoProps = {
  context: "home" | "games" | "long-distance";
};

const copy = {
  home: {
    kicker: "NEW MULTIPLAYER GAME",
    title: "Couple Puzzle",
    description:
      "You and your partner get different clues to the same puzzle. Talk together, combine what you know, and solve 8 puzzles as a team.",
    cta: "Solve Together →",
    meta: "8 puzzles · Two devices · Private room · No signup",
  },
  games: {
    kicker: "CO-OP FOR COUPLES",
    title: "Solve a Puzzle Together",
    description:
      "Each partner sees a different clue. Share what you know, agree on the answer, and build one Team Score together.",
    cta: "Play Couple Puzzle →",
    meta: "Multiplayer · Live chat · Team score · Free",
  },
  "long-distance": {
    kicker: "NEW LONG DISTANCE GAME",
    title: "Couple Puzzle — Two Clues, One Answer",
    description:
      "Perfect for separate devices: you each get a different clue, talk it through, and try to solve the same answer together.",
    cta: "Start Couple Puzzle →",
    meta: "8 rounds · Separate devices · Private room · Live chat",
  },
} as const;

export default function CouplePuzzlePromo({
  context,
}: CouplePuzzlePromoProps) {
  const content = copy[context];

  return (
    <div className={`couple-puzzle-entry couple-puzzle-entry-${context}`}>
      <div className="couple-puzzle-entry-icon">🧩</div>

      <div className="couple-puzzle-entry-copy">
        <div className="game-kicker">{content.kicker}</div>

        <h2>{content.title}</h2>

        <p>{content.description}</p>

        <div className="couple-puzzle-entry-meta">
          {content.meta}
        </div>

        <Link
          href="/couple-puzzle"
          className="btn-primary couple-puzzle-entry-cta"
        >
          {content.cta}
        </Link>
      </div>
    </div>
  );
}
