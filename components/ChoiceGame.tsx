"use client";

import { useMemo, useState } from "react";

export type ChoiceQuestion = {
  a: string;
  b: string;
};

export default function ChoiceGame({
  questions,
  label = "Would You Rather"
}: {
  questions: ChoiceQuestion[];
  label?: string;
}) {
  const pool = useMemo(() => questions, [questions]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<"a" | "b" | null>(null);

  const q = pool[index % pool.length];
  const progress = Math.round(((index + 1) / pool.length) * 100);

  const next = () => {
    setSelected(null);
    setIndex((i) => (i + 1) % pool.length);
  };

  return (
    <div className="play-card">
      <div className="progress"><div style={{ width: `${progress}%` }} /></div>
      <div className="game-kicker">{label}</div>
      <div className="question">Would you rather…</div>

      <div className="choice-grid">
        <button className={`choice ${selected === "a" ? "active" : ""}`} onClick={() => setSelected("a")}>
          {q.a}
        </button>
        <button className={`choice ${selected === "b" ? "active" : ""}`} onClick={() => setSelected("b")}>
          {q.b}
        </button>
      </div>

      <div className="next-row">
        <span className="small-muted">Question {index + 1} of {pool.length}</span>
        <button className="btn-primary" onClick={next}>Next →</button>
      </div>
    </div>
  );
}
