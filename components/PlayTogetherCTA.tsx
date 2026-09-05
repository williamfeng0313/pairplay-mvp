"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  trackEvent,
} from "@/lib/analytics";


/* =========================================================
   Props
========================================================= */

type PlayTogetherCTAProps = {
  entryPoint?: string;
};


/* =========================================================
   Component
========================================================= */

export default function PlayTogetherCTA({
  entryPoint =
    "would_you_rather_page",
}: PlayTogetherCTAProps) {
  const router =
    useRouter();


  const [
    busy,
    setBusy,
  ] =
    useState(false);


  const [
    message,
    setMessage,
  ] =
    useState("");


  /* =======================================================
     Create Room
  ======================================================= */

  const createRoom =
    async () => {
      if (
        busy
      ) {
        return;
      }


      setBusy(
        true
      );


      setMessage(
        ""
      );


      /* ===================================================
         GA4

         IMPORTANT:
         Do NOT use event parameter name "source".

         "source" can conflict with GA4 traffic attribution.

         Use:
         entry_point

         Example:
         entry_point = long_distance_couple_games_page
      =================================================== */

      trackEvent(
        "play_together_click",
        {
          game:
            "would_you_rather",

          entry_point:
            entryPoint,
        }
      );


      try {
        const response =
          await fetch(
            "/api/rooms/create",
            {
              method:
                "POST",
            }
          );


        const data =
          await response.json();


        if (
          !response.ok ||
          !data.ok
        ) {
          throw new Error(
            data.error ||
              "Could not create room."
          );
        }


        /* =================================================
           GA4

           Do not send:
           source
           room code
           room token
        ================================================= */

        trackEvent(
          "create_room",
          {
            game:
              "would_you_rather",

            entry_point:
              entryPoint,
          }
        );


        /* =================================================
           HttpOnly Cookie Version

           Token is already stored server-side in cookie.
           Never put token into URL.
        ================================================= */

        router.push(
          `/room/${encodeURIComponent(
            data.code
          )}`
        );

      } catch (
        error
      ) {
        setMessage(
          error instanceof
          Error
            ? error.message
            : "Could not create room."
        );


        setBusy(
          false
        );
      }
    };


  /* =======================================================
     Render
  ======================================================= */

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

        <span>
          ✓ Same questions
        </span>

        <span>
          ✓ Hidden answers
        </span>

        <span>
          ✓ Instant reveal
        </span>

        <span>
          ✓ No signup
        </span>

      </div>


      <button
        type="button"
        className="btn-primary play-together-button"
        onClick={
          createRoom
        }
        disabled={
          busy
        }
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