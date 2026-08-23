"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import MultiplayerWouldYouRather from "@/components/MultiplayerWouldYouRather";
import { trackEvent } from "@/lib/analytics";

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
  // ==============================
  // Room State
  // ==============================

  const [room, setRoom] =
    useState<RoomState>({
      ok: true,
      code,
      status: "waiting",
    });

  const [copyLabel, setCopyLabel] =
    useState("Copy code");

  // 防止 pair_complete 重复埋点
  const pairedTracked =
    useRef(false);

  // ==============================
  // Share Text
  // ==============================

  const shareText =
    useMemo(
      () =>
        `Join my TwoLumi room. Code: ${code}`,
      [code]
    );

  // ==============================
  // Poll Room Status
  // ==============================

  useEffect(() => {
    let cancelled = false;

    const checkRoom =
      async () => {
        try {
          const response =
            await fetch(
              `/api/rooms/status?code=${encodeURIComponent(
                code
              )}&token=${encodeURIComponent(
                token
              )}`,
              {
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (cancelled) {
            return;
          }

          setRoom(data);

          // ==============================
          // Analytics - Pair Complete
          // ==============================

          if (
            data.ok &&
            data.partnerConnected &&
            !pairedTracked.current
          ) {
            trackEvent(
              "pair_complete",
              {
                role:
                  data.role ||
                  "unknown",
              }
            );

            pairedTracked.current =
              true;
          }
        } catch {
          if (!cancelled) {
            setRoom({
              ok: false,

              error:
                "Connection lost. We will keep trying.",
            });
          }
        }
      };

    // 进入页面马上检查一次
    checkRoom();

    // 每2秒检查 Partner 是否加入
    const timer =
      window.setInterval(
        checkRoom,
        2000
      );

    return () => {
      cancelled = true;

      window.clearInterval(
        timer
      );
    };
  }, [code, token]);

  // ==============================
  // Copy Room Code
  // ==============================

  const copyCode =
    async () => {
      try {
        await navigator.clipboard.writeText(
          code
        );

        trackEvent(
          "share_room",
          {
            method:
              "copy_code",
          }
        );

        setCopyLabel(
          "Copied!"
        );

        window.setTimeout(
          () =>
            setCopyLabel(
              "Copy code"
            ),
          1400
        );
      } catch {
        setCopyLabel(
          "Copy failed"
        );

        window.setTimeout(
          () =>
            setCopyLabel(
              "Copy code"
            ),
          1400
        );
      }
    };

  // ==============================
  // Share Invite
  // ==============================

  const share =
    async () => {
      // Mobile / supported browsers
      if (navigator.share) {
        trackEvent(
          "share_room",
          {
            method:
              "native_share",
          }
        );

        try {
          await navigator.share({
            title:
              "Join my TwoLumi room",

            text:
              shareText,

            url:
              "https://twolumi.com",
          });
        } catch {
          // 用户主动取消分享，不算错误
        }

        return;
      }

      // Desktop fallback
      trackEvent(
        "share_room",
        {
          method:
            "copy_invite",
        }
      );

      try {
        await navigator.clipboard.writeText(
          `${shareText} https://twolumi.com`
        );

        setCopyLabel(
          "Invite copied!"
        );

        window.setTimeout(
          () =>
            setCopyLabel(
              "Copy code"
            ),
          1600
        );
      } catch {
        setCopyLabel(
          "Copy failed"
        );

        window.setTimeout(
          () =>
            setCopyLabel(
              "Copy code"
            ),
          1600
        );
      }
    };

  // ==============================
  // Room Error
  // ==============================

  if (!room.ok) {
    return (
      <div className="room-live-card">

        <div className="room-state-icon">
          !
        </div>

        <h2>
          We hit a room problem
        </h2>

        <p className="game-sub">
          {room.error ||
            "This room is unavailable."}
        </p>

        <Link
          className="btn-primary inline-button"
          href="/"
        >
          Back to TwoLumi
        </Link>

      </div>
    );
  }

  // ==============================
  // Partner Connected
  // ==============================

  if (
    room.partnerConnected &&
    room.role
  ) {
    return (
      <div className="room-live-card">

        {/* Paired Status */}

        <div className="room-state-icon ready">
          ✓
        </div>

        <div className="game-kicker">
          You're paired
        </div>

        <h2 className="room-live-title">
          Play Together
        </h2>

        <p className="game-sub">
          Both players are connected.
          Your answers stay hidden
          until both of you choose.
        </p>

        {/* ==============================
            Multiplayer Game
        ============================== */}

        <MultiplayerWouldYouRather
          code={code}
          token={token}
          role={room.role}
        />

        {/* Footer Note */}

        <div className="micro-copy">
          Room expires automatically
          · No signup
          · No personal profile
        </div>

      </div>
    );
  }

  // ==============================
  // Waiting for Partner
  // ==============================

  return (
    <div className="room-live-card">

      {/* Icon */}

      <div className="room-state-icon">
        ♡
      </div>

      {/* Role */}

      <div className="game-kicker">

        {room.role === "guest"
          ? "You joined the room"
          : "Private room"}

      </div>

      {/* Title */}

      <h2 className="room-live-title">
        Waiting for your partner
      </h2>

      {/* Description */}

      <p className="game-sub">
        Send this code to your partner.
        This page checks automatically
        every 2 seconds.
      </p>

      {/* ==============================
          Room Code
      ============================== */}

      <div className="room-code-box">

        <div className="room-label">
          Room code
        </div>

        <div className="room-code">
          {code}
        </div>

      </div>

      {/* ==============================
          Invite Controls
      ============================== */}

      <div className="room-action-grid">

        <button
          className="btn-secondary"
          onClick={copyCode}
        >
          {copyLabel}
        </button>

        <button
          className="btn-primary"
          onClick={share}
        >
          Invite partner
        </button>

      </div>

      {/* Note */}

      <div className="micro-copy">
        Room expires automatically
        · No signup
        · No personal profile
      </div>

    </div>
  );
}