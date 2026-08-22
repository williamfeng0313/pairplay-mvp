"use client";

import { useState } from "react";

type Item = {
  question: string;
  options: string[];
};

export default function CompatibilityGame({ questions }: { questions: Item[] }) {
  const [phase, setPhase] = useState<"a" | "b" | "result">("a");
  const [index, setIndex] = useState(0);
  const [a, setA] = useState<number[]>([]);
  const [b, setB] = useState<number[]>([]);

  const answer = (choice: number) => {
    if (phase === "a") {
      const next = [...a, choice];
      setA(next);
      if (index + 1 >= questions.length) {
        setPhase("b");
        setIndex(0);
      } else setIndex(index + 1);
    } else if (phase === "b") {
      const next = [...b, choice];
      setB(next);
      if (index + 1 >= questions.length) {
        setPhase("result");
      } else setIndex(index + 1);
    }
  };

  const reset = () => {
    setPhase("a");
    setIndex(0);
    setA([]);
    setB([]);
  };

  if (phase === "result") {
    const matches = a.reduce((sum, v, i) => sum + (v === b[i] ? 1 : 0), 0);
    const score = Math.round((matches / questions.length) * 100);
    return (
      <div className="play-card result-box">
        <div className="game-kicker">Your Compatibility</div>
        <div className="result-score">{score}%</div>
        <p className="game-sub">
          A fun conversation score — not relationship advice. Compare where you matched and talk about the surprises.
        </p>
        <button className="btn-primary" onClick={reset}>Try Again</button>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div className="play-card">
      <div className="game-kicker">
        {phase === "a" ? "Partner A" : "Partner B"} · Question {index + 1}/{questions.length}
      </div>
      <div className="question">{q.question}</div>
      <div className="choice-grid">
        {q.options.map((option, i) => (
          <button className="choice" key={option} onClick={() => answer(i)}>
            {option}
          </button>
        ))}
      </div>
      <p className="small-muted">
        {phase === "a"
          ? "Answer privately, then hand the device to your partner."
          : "Now Partner B answers the same questions."}
      </p>
    </div>
  );
}
