"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import MultiplayerWouldYouRather from "@/components/MultiplayerWouldYouRather";
import MultiplayerSameAnswer from "@/components/MultiplayerSameAnswer";
import MultiplayerRelationshipCheckIn from "@/components/MultiplayerRelationshipCheckIn";
import MultiplayerCouplePuzzle from "@/components/MultiplayerCouplePuzzle";
import RoomChat from "@/components/RoomChat";

import {
  trackEvent,
} from "@/lib/analytics";


type RoomState = {
  ok:
    boolean;

  code?:
    string;

  status?:
    | "waiting"
    | "ready";

  role?:
    | "host"
    | "guest";

  gameSlug?:
    string;

  partnerConnected?:
    boolean;

  error?:
    string;
};


export default function RoomWaitingClient({
  code,
}: {
  code:
    string;
}) {
  const [
    room,
    setRoom,
  ] =
    useState<RoomState>({
      ok: true,

      code,

      status:
        "waiting",
    });


  const [
    copyLabel,
    setCopyLabel,
  ] =
    useState(
      "Copy code"
    );


  const pairedTracked =
    useRef(false);


  const shareText =
    useMemo(
      () =>
        `Join my TwoLumi room. Code: ${code}`,
      [
        code,
      ]
    );


  useEffect(
    () => {
      let cancelled =
        false;


      const checkRoom =
        async () => {
          try {
            const response =
              await fetch(
                `/api/rooms/status?code=${encodeURIComponent(
                  code
                )}`,
                {
                  cache:
                    "no-store",
                }
              );


            const data =
              await response
                .json();


            if (
              cancelled
            ) {
              return;
            }


            setRoom(
              data
            );


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

                  game_name:
                    data.gameSlug ||
                    "would-you-rather",
                }
              );


              pairedTracked.current =
                true;
            }

          } catch {
            if (
              !cancelled
            ) {
              setRoom({
                ok: false,

                error:
                  "Connection lost. We will keep trying.",
              });
            }
          }
        };


      checkRoom();


      const timer =
        window.setInterval(
          checkRoom,
          2000
        );


      return () => {
        cancelled =
          true;


        window.clearInterval(
          timer
        );
      };
    },
    [
      code,
    ]
  );


  const copyCode =
    async () => {
      try {
        await navigator
          .clipboard
          .writeText(
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


  const share =
    async () => {
      if (
        navigator.share
      ) {
        trackEvent(
          "share_room",
          {
            method:
              "native_share",
          }
        );


        try {
          await navigator
            .share({
              title:
                "Join my TwoLumi room",

              text:
                shareText,

              url:
                "https://twolumi.com",
            });

        } catch {
          /*
           * User cancelling share is not an error.
           */
        }


        return;
      }


      trackEvent(
        "share_room",
        {
          method:
            "copy_invite",
        }
      );


      try {
        await navigator
          .clipboard
          .writeText(
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


  if (
    !room.ok
  ) {
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


  if (
    room.partnerConnected &&
    room.role
  ) {
    const gameSlug =
      room.gameSlug ||
      "would-you-rather";


    const heading =
      gameSlug ===
      "relationship-check-in"
        ? "Talk Together"
        : gameSlug ===
          "couple-puzzle"
        ? "Solve Together"
        : "Play Together";


    const description =
      gameSlug ===
      "relationship-check-in"
        ? "Both of you are connected. Answer privately, reveal together, then talk through one question at a time."
        : gameSlug ===
          "couple-puzzle"
        ? "Both of you are connected. You will get different clues — combine them before choosing your answer."
        : "Both players are connected. Your answers stay hidden until both of you choose.";


    return (
      <div className="room-live-card room-live-card-playing">

        <div className="room-game-status">

          <div className="room-state-icon ready">
            ✓
          </div>


          <div>

            <div className="game-kicker">
              You&apos;re paired
            </div>


            <h2 className="room-live-title">
              {heading}
            </h2>


            <p className="game-sub room-game-status-copy">
              {description}
            </p>

          </div>

        </div>


        <div className="room-game-area">

          {gameSlug ===
          "couple-puzzle" ? (
            <MultiplayerCouplePuzzle
              code={
                code
              }
              role={
                room.role
              }
            />
          ) : gameSlug ===
          "relationship-check-in" ? (
            <MultiplayerRelationshipCheckIn
              code={
                code
              }
              role={
                room.role
              }
            />
          ) : gameSlug ===
          "same-answer" ? (
            <MultiplayerSameAnswer
              code={
                code
              }
              role={
                room.role
              }
            />
          ) : (
            <MultiplayerWouldYouRather
              code={
                code
              }
              role={
                room.role
              }
            />
          )}

        </div>


        <RoomChat
          code={
            code
          }
        />


        <div className="micro-copy room-security-copy">
          Private temporary room
          · Live chat
          · No signup
          · No personal profile
        </div>

      </div>
    );
  }


  return (
    <div className="room-live-card">

      <div className="room-state-icon">
        ♡
      </div>


      <div className="game-kicker">
        {room.role ===
        "guest"
          ? "You joined the room"
          : "Private room"}
      </div>


      <h2 className="room-live-title">
        Waiting for your partner
      </h2>


      <p className="game-sub">
        Send this code to your partner.
        This page checks automatically
        every 2 seconds.
      </p>


      <div className="room-code-box">

        <div className="room-label">
          Room code
        </div>


        <div className="room-code">
          {code}
        </div>

      </div>


      <div className="room-action-grid">

        <button
          type="button"
          className="btn-secondary"
          onClick={
            copyCode
          }
        >
          {copyLabel}
        </button>


        <button
          type="button"
          className="btn-primary"
          onClick={
            share
          }
        >
          Invite partner
        </button>

      </div>


      <div className="micro-copy">
        Room expires automatically
        · No signup
        · No personal profile
      </div>

    </div>
  );
}
