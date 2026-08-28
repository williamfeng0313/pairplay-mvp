"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function PlayTogetherCTA({
  source = "would_you_rather_page",
}: {
  source?: string;
}) {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const createRoom = async () => {
    if (busy) return;

    setBusy(true);
    setMessage("");

    // 用户明确点击 Play Together
    trackEvent("play_together_click", {
      game: "would_you_rather",
      source,
    });

    try {
      const response = await fetch("/api/rooms/create", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error || "Could not create room."
        );
      }

      trackEvent("create_room", {
        source,
        game: "would_you_rather",
      });

      router.push(
        `/room/${encodeURIComponent(
          data.code
        )}`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not create room."
      );

      setBusy(false);
    }
  };

  return (
    <section className="play-together-cta">
      <div className="play-together-badge">
        ♥ Play Together
      </div>

      <h2>
        Answer These Questions With Your Partner
      </h2>

      <p>
        Create a private room and answer the same
        Would You Rather questions together.
        Your choices stay hidden until both of you answer.
      </p>

      <div className="play-together-features">
        <span>✓ Same questions</span>
        <span>✓ Hidden answers</span>
        <span>✓ Instant reveal</span>
        <span>✓ No signup</span>
      </div>

      <button
        type="button"
        className="btn-primary play-together-button"
        onClick={createRoom}
        disabled={busy}
      >
        {busy
          ? "Creating Room…"
          : "Create a Room →"}
      </button>

      <div className="play-together-note">
        Send the 6-character room code to your partner.
        Rooms expire automatically.
      </div>

      {message ? (
        <div className="room-error">
          {message}
        </div>
      ) : null}
    </section>
  );
}