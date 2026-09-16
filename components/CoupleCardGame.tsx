"use client";
import { useMemo, useState } from "react";
import { coupleCardCategories, getCardsByCategory, type CoupleCardCategory } from "@/data/coupleCards";
import styles from "./CoupleCardGame.module.css";
function shuffle<T>(items: T[]) { const copy = [...items]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
export default function CoupleCardGame() {
  const [category, setCategory] = useState<CoupleCardCategory>("fun");
  const [index, setIndex] = useState(0); const [revealed, setRevealed] = useState(false); const [deckKey, setDeckKey] = useState(0);
  const cards = useMemo(() => shuffle(getCardsByCategory(category)), [category, deckKey]);
  const card = cards[index];
  const categoryInfo = coupleCardCategories.find((item) => item.id === category)!;
  function selectCategory(value: CoupleCardCategory) { setCategory(value); setIndex(0); setRevealed(false); setDeckKey((v) => v + 1); }
  function nextCard() { setIndex((v) => (v + 1) % cards.length); setRevealed(false); }
  return <div className={styles.wrapper}>
    <section className={styles.categorySection} aria-labelledby="choose-deck">
      <div className={styles.kicker}>CHOOSE YOUR DECK</div><h2 id="choose-deck">What kind of conversation sounds good?</h2><p className={styles.lead}>Pick a deck, reveal one card, and let the conversation go wherever it goes.</p>
      <div className={styles.categoryGrid}>{coupleCardCategories.map((item) => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => selectCategory(item.id)} className={`${styles.categoryButton} ${category === item.id ? styles.active : ""}`}><span className={styles.emoji}>{item.emoji}</span><strong>{item.label}</strong><small>{item.description}</small></button>)}</div>
    </section>
    <section className={styles.gameSection} aria-live="polite"><div className={styles.progress}><span>{category.toUpperCase()} DECK</span><span>{index + 1} / {cards.length}</span></div>
      <button type="button" className={`${styles.card} ${revealed ? styles.revealed : ""}`} onClick={() => setRevealed((v) => !v)} aria-label={revealed ? "Hide card" : "Reveal card"}><span className={styles.cardInner}><span className={styles.back}><span className={styles.heart}>♥</span><strong>TwoLumi</strong><span>Couple Cards</span><small>Tap to reveal</small></span><span className={styles.front}><span className={styles.cardCategory}>{categoryInfo.emoji} {categoryInfo.label}</span><span className={styles.prompt}>{card.prompt}</span><small>There is no right answer.</small></span></span></button>
      <div className={styles.controls}><button type="button" className={styles.secondary} onClick={() => setRevealed((v) => !v)}>{revealed ? "Hide Card" : "Reveal Card"}</button><button type="button" className={styles.primary} onClick={nextCard}>Next Card →</button></div><button type="button" className={styles.reset} onClick={() => { setIndex(0); setRevealed(false); setDeckKey((v) => v + 1); }}>Shuffle This Deck</button>
    </section>
  </div>;
}
