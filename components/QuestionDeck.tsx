"use client";

import { useMemo, useState } from "react";

export default function QuestionDeck({ questions }: { questions: string[] }) {
  const items = useMemo(() => questions, [questions]);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const random = () => setIndex(Math.floor(Math.random() * items.length));

  return (
    <div className="play-card">
      <div className="game-kicker">Conversation Deck</div>
      <div className="question">{items[index]}</div>

      <div className="next-row">
        <button className="btn-secondary" onClick={random}>🎲 Random</button>
        <button className="btn-primary" onClick={next}>Next Question →</button>
      </div>
    </div>
  );
}
