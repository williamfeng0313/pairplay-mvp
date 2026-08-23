"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function HomeHero() {
  const router = useRouter();

  const [joinCode, setJoinCode] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState<"create" | "join" | null>(null);

  // ==============================
  // Create Room
  // ==============================

  const createRoom = async () => {
    setBusy("create");
    setMessage("");

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

      // GA4 event
      trackEvent("create_room", {
        source: "home_hero",
      });

      router.push(
        `/room/${encodeURIComponent(
          data.code
        )}?token=${encodeURIComponent(data.token)}`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not create room."
      );

      setBusy(null);
    }
  };

  // ==============================
  // Join Room
  // ==============================

  const joinRoom = async () => {
    const normalized = joinCode
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);

    // Wrong code length
    if (normalized.length !== 6) {
      trackEvent("join_room_failed", {
        reason: "invalid_length",
      });

      setMessage(
        "Enter the 6-character room code."
      );

      return;
    }

    setBusy("join");
    setMessage("");

    try {
      const response = await fetch(
        "/api/rooms/join",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            code: normalized,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        // Record failure reason without recording room code
        trackEvent("join_room_failed", {
          reason:
            response.status === 404
              ? "not_found"
              : response.status === 410
              ? "expired"
              : response.status === 409
              ? "full_or_race"
              : "server",
        });

        throw new Error(
          data.error || "Could not join room."
        );
      }

      // GA4 event
      trackEvent("join_room_success", {
        source: "home_hero",
      });

      router.push(
        `/room/${encodeURIComponent(
          data.code
        )}?token=${encodeURIComponent(data.token)}`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not join room."
      );

      setBusy(null);
    }
  };

  return (
    <section className="hero">
      <div className="container hero-grid">

        {/* ==============================
            Left Hero
        ============================== */}

        <div>
          <span className="eyebrow">
            ♥ Made for Two
          </span>

          <h1>
            Online Games for Couples Made to{" "}
            <span className="gradient-text">
              Play Together
            </span>
          </h1>

          <p className="hero-copy">
            Fun games, questions, and quizzes
            for couples — no signup, no download.
            Start instantly on any device.
          </p>

          <div className="hero-actions">

            <Link
              href="/would-you-rather-questions-for-couples"
              className="btn-primary"
              onClick={() =>
                trackEvent("game_open", {
                  game: "would_you_rather",
                  source: "home_hero",
                })
              }
            >
              Start a Game →
            </Link>

            <Link
              href="/games"
              className="btn-secondary"
            >
              Browse Games
            </Link>

          </div>
        </div>

        {/* ==============================
            Play Together
        ============================== */}

        <div className="room-card">

          <div className="room-title">
            <span>👥</span>
            Play Together
          </div>

          <p className="small-muted">
            Create a private room, then send
            the 6-character code to your partner.
          </p>

          {/* Create Room */}

          <button
            className="btn-primary"
            onClick={createRoom}
            disabled={busy !== null}
          >
            {busy === "create"
              ? "Creating…"
              : "Create Room"}
          </button>

          <div className="divider">
            or
          </div>

          {/* Join Room */}

          <div className="join-row">

            <input
              className="input room-code-input"
              placeholder="Enter room code"
              value={joinCode}
              onChange={(e) =>
                setJoinCode(
                  e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, 6)
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  joinRoom();
                }
              }}
              maxLength={6}
              autoCapitalize="characters"
              autoComplete="off"
              aria-label="Room code"
            />

            <button
              className="btn-secondary"
              onClick={joinRoom}
              disabled={busy !== null}
            >
              {busy === "join"
                ? "Checking…"
                : "Join Room"}
            </button>

          </div>

          <div className="micro-copy">

            🔒 No account needed.
            Rooms expire automatically.

            {message ? (
              <>
                <br />

                <strong className="room-error">
                  {message}
                </strong>
              </>
            ) : null}

          </div>

        </div>

      </div>
    </section>
  );
}