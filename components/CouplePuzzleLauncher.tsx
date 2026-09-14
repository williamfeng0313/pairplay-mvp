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


export default function CouplePuzzleLauncher() {
  const router =
    useRouter();


  const [
    busy,
    setBusy,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  const createRoom =
    async () => {
      if (busy) {
        return;
      }


      setBusy(
        true
      );


      setError(
        ""
      );


      try {
        const response =
          await fetch(
            "/api/rooms/create",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  gameSlug:
                    "couple-puzzle",
                }),
            }
          );


        const data =
          await response
            .json();


        if (
          !response.ok ||
          !data.ok ||
          !data.code
        ) {
          throw new Error(
            data.error ||
              "Could not create a private room."
          );
        }


        trackEvent(
          "couple_puzzle_room_create",
          {}
        );


        router.push(
          `/room/${data.code}`
        );

      } catch (
        createError
      ) {
        setError(
          createError instanceof
            Error
            ? createError.message
            : "Could not create a private room."
        );

      } finally {
        setBusy(
          false
        );
      }
    };


  return (
    <div className="couple-puzzle-launcher">

      <button
        type="button"
        className="btn-primary"
        onClick={
          createRoom
        }
        disabled={
          busy
        }
      >
        {busy
          ? "Creating room…"
          : "Start Couple Puzzle →"}
      </button>


      <p>
        Create a private room,
        then send the 6-character code
        to your partner.
      </p>


      {error ? (
        <div
          className="room-error"
          role="alert"
        >
          {error}
        </div>
      ) : null}

    </div>
  );
}
