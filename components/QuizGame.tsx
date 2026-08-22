"use client";

import { useState } from "react";

type QuizItem = {
  question: string;
  options: string[];
};

export default function QuizGame({ questions }: { questions: QuizItem[] }) {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(0);

  if (index >= questions.length) {
    const score = Math.round((answered / questions.length) * 100);
    return (
      <div className="play-card result-box">
        <div className="game-kicker">Finished</div>
        <div className="result-score">{score}%</div>
        <p className="game-sub">
          You completed the quiz. In Phase 2, your partner can answer the matching version and compare results.
        </p>
        <button className="btn-primary" onClick={() => { setIndex(0); setAnswered(0); }}>
          Play Again
        </button>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div className="play-card">
      <div className="progress"><div style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      <div className="question">{q.question}</div>
      <div className="choice-grid">
        {q.options.map((option) => (
          <button
            className="choice"
            key={option}
            onClick={() => {
              setAnswered((v) => v + 1);
              setIndex((v) => v + 1);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
