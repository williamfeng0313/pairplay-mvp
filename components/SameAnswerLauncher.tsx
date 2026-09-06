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

export default function SameAnswerLauncher() {
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
      if (
        busy
      ) {
        return;
      }

      setBusy(true);

      setError("");

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
                    "same-answer",
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
              "Could not create a room."
          );
        }

        trackEvent(
          "same_answer_room_create",
          {}
        );

        router.push(
          `/room/${data.code}`
        );
      } catch (
        error
      ) {
        setError(
          error instanceof
          Error
            ? error.message
            : "Could not create a room."
        );
      } finally {
        setBusy(false);
      }
    };

  return (
    <>

      <button
        className="btn-primary"
        disabled={
          busy
        }
        onClick={
          createRoom
        }
      >
        {busy
          ? "Creating room…"
          : "Create Same Answer Room →"}
      </button>

      {error ? (
        <div className="room-error">
          {error}
        </div>
      ) : null}

    </>
  );
}