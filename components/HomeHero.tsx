"use client";

import { useState } from "react";
import Link from "next/link";

function makeRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function HomeHero() {
  const [code, setCode] = useState("R7K9L2");
  const [joinCode, setJoinCode] = useState("");
  const [message, setMessage] = useState("");

  const createRoom = async () => {
    const next = makeRoomCode();
    setCode(next);
    setMessage("Demo room created locally. Phase 2 will persist rooms with Supabase.");
    try {
      await navigator.clipboard.writeText(next);
    } catch {}
  };

  const joinRoom = () => {
    if (joinCode.trim().length < 4) {
      setMessage("Enter a valid room code.");
      return;
    }
    setMessage(`Local preview: joining ${joinCode.toUpperCase()}. Real-time rooms are Phase 2.`);
  };

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">♥ Made for Two</span>
          <h1>
            Online Games for Couples Made to{" "}
            <span className="gradient-text">Play Together</span>
          </h1>
          <p className="hero-copy">
            Fun games, questions, and quizzes for couples — no signup, no download.
            Start instantly on any device.
          </p>

          <div className="hero-actions">
            <Link href="/would-you-rather-questions-for-couples" className="btn-primary">
              Start a Game →
            </Link>
            <Link href="/games" className="btn-secondary">
              Browse Games
            </Link>
          </div>
        </div>

        <div className="room-card">
          <div className="room-title"><span>👥</span> Play Together</div>
          <p className="small-muted">Create a room and invite your partner.</p>

          <div className="room-code-box">
            <div className="room-label">Your room code</div>
            <div className="room-code">{code}</div>
          </div>

          <button className="btn-primary" onClick={createRoom}>Create Room</button>

          <div className="divider">or</div>

          <div className="join-row">
            <input
              className="input"
              placeholder="Enter room code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              maxLength={8}
            />
            <button className="btn-secondary" onClick={joinRoom}>Join Room</button>
          </div>

          <div className="micro-copy">
            🟢 Play together in real time — on any device.
            {message ? <><br /><strong>{message}</strong></> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
