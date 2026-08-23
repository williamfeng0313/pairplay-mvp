"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type RoomState = {
  ok: boolean;
  code?: string;
  status?: "waiting" | "ready";
  role?: "host" | "guest";
  partnerConnected?: boolean;
  error?: string;
};

export default function RoomWaitingClient({
  code,
  token,
}: {
  code: string;
  token: string;
}) {
  const [room, setRoom] = useState<RoomState>({
    ok: true,
    code,
    status: "waiting",
  });
  const [copyLabel, setCopyLabel] = useState("Copy code");

  const shareText = useMemo(
    () => `Join my TwoLumi room. Code: ${code}`,
    [code]
  );

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const response = await fetch(
          `/api/rooms/status?code=${encodeURIComponent(code)}&token=${encodeURIComponent(token)}`,
          { cache: "no-store" }
        );
        const data = await response.json();

        if (!cancelled) {
          setRoom(data);
        }
      } catch {
        if (!cancelled) {
          setRoom({
            ok: false,
            error: "Connection lost. We will keep trying.",
          });
        }
      }
    };

    check();
    const timer = window.setInterval(check, 2000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [code, token]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code).catch(() => null);
    setCopyLabel("Copied!");
    window.setTimeout(() => setCopyLabel("Copy code"), 1400);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join my TwoLumi room",
        text: shareText,
        url: "https://twolumi.com",
      }).catch(() => null);
      return;
    }

    await navigator.clipboard.writeText(`${shareText} https://twolumi.com`).catch(() => null);
    setCopyLabel("Invite copied!");
    window.setTimeout(() => setCopyLabel("Copy code"), 1600);
  };

  if (!room.ok) {
    return (
      <div className="room-live-card">
        <div className="room-state-icon">!</div>
        <h2>We hit a room problem</h2>
        <p>{room.error || "This room is unavailable."}</p>
        <Link className="btn-primary inline-button" href="/">
          Back to TwoLumi
        </Link>
      </div>
    );
  }

  return (
    <div className="room-live-card">
      <div className={`room-state-icon ${room.partnerConnected ? "ready" : ""}`}>
        {room.partnerConnected ? "✓" : "♡"}
      </div>

      <div className="game-kicker">
        {room.role === "guest" ? "You joined the room" : "Private room"}
      </div>

      <h2 className="room-live-title">
        {room.partnerConnected ? "You're paired!" : "Waiting for your partner"}
      </h2>

      <p className="game-sub">
        {room.partnerConnected
          ? "Both players are connected. The room-code layer is working."
          : "Send this code to your partner. This page checks automatically every 2 seconds."}
      </p>

      <div className="room-code-box">
        <div className="room-label">Room code</div>
        <div className="room-code">{code}</div>
      </div>

      {!room.partnerConnected ? (
        <div className="room-action-grid">
          <button className="btn-secondary" onClick={copyCode}>{copyLabel}</button>
          <button className="btn-primary" onClick={share}>Invite partner</button>
        </div>
      ) : (
        <div className="paired-panel">
          <div>
            <strong>Pairing validated.</strong>
            <span> Next milestone: synchronize the first game inside this room.</span>
          </div>
          <Link
            href="/would-you-rather-questions-for-couples"
            className="btn-primary inline-button"
          >
            Play Would You Rather →
          </Link>
        </div>
      )}

      <div className="micro-copy">
        Room expires automatically after 2 hours · No signup · No personal profile
      </div>
    </div>
  );
}
