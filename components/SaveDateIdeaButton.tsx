"use client";

import {
  trackEvent,
} from "@/lib/analytics";

import {
  useSavedDateIdeas,
} from "@/lib/useSavedDateIdeas";

type SaveSource =
  | "idea_card"
  | "generator"
  | "saved_panel";

type Props = {
  ideaId: string;

  source?:
    SaveSource;

  variant?:
    | "default"
    | "remove";
};


export default function SaveDateIdeaButton({
  ideaId,

  source =
    "idea_card",

  variant =
    "default",
}: Props) {
  const {
    hydrated,

    isSaved,

    toggleSaved,
  } =
    useSavedDateIdeas();


  const saved =
    hydrated &&
    isSaved(
      ideaId
    );


  const handleClick =
    () => {
      const nowSaved =
        toggleSaved(
          ideaId
        );


      if (
        nowSaved
      ) {
        trackEvent(
          "ld_date_save",
          {
            idea_id:
              ideaId,

            source,
          }
        );
      } else {
        trackEvent(
          "ld_date_unsave",
          {
            idea_id:
              ideaId,

            source,
          }
        );
      }
    };


  if (
    variant ===
    "remove"
  ) {
    return (
      <button
        type="button"
        className="lddi-saved-remove"
        onClick={
          handleClick
        }
      >
        Remove
      </button>
    );
  }


  return (
    <button
      type="button"

      className={
        saved
          ? "lddi-save-button lddi-save-button-active"
          : "lddi-save-button"
      }

      onClick={
        handleClick
      }

      aria-pressed={
        saved
      }

      aria-label={
        saved
          ? "Remove this date idea from saved ideas"
          : "Save this date idea"
      }
    >
      <span
        aria-hidden="true"
      >
        {saved
          ? "♥"
          : "♡"}
      </span>

      {saved
        ? "Saved"
        : "Save"}
    </button>
  );
}