"use client";

import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";

import PhotoBooth from "./PhotoBooth";
import PhotoStrip from "./PhotoStrip";

type Mode = "card" | "strip";

const MODES: {
  id: Mode;
  label: string;
  hint: string;
  icon: string;
}[] = [
  {
    id: "card",
    label: "Photo card",
    hint: "One photo · templates · AI cutout",
    icon: "🖼️",
  },
  {
    id: "strip",
    label: "4-cut photo strip",
    hint: "Four shots · retro filters · date stamp",
    icon: "🎞️",
  },
];

export default function PhotoBoothStudio() {
  const [mode, setMode] = useState<Mode>("card");

  /** Deep links such as /photo-booth?mode=strip. */
  useEffect(() => {
    const param = new URLSearchParams(
      window.location.search
    ).get("mode");

    if (param === "strip") {
      setMode("strip");
    }
  }, []);

  const selectMode = (next: Mode) => {
    if (next === mode) {
      return;
    }

    setMode(next);

    const url = new URL(window.location.href);

    if (next === "strip") {
      url.searchParams.set("mode", "strip");
    } else {
      url.searchParams.delete("mode");
    }

    window.history.replaceState(
      {},
      "",
      url.toString()
    );

    trackEvent("photo_booth_mode", {
      mode: next,
    });
  };

  return (
    <>
      <div
        className="booth-mode-switch"
        role="tablist"
        aria-label="Photo booth mode"
      >
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={mode === item.id}
            className={
              mode === item.id
                ? "booth-mode active"
                : "booth-mode"
            }
            onClick={() =>
              selectMode(item.id)
            }
          >
            <span className="booth-mode-icon">
              {item.icon}
            </span>

            <span className="booth-mode-copy">
              <strong>{item.label}</strong>
              <small>{item.hint}</small>
            </span>
          </button>
        ))}
      </div>

      {mode === "card" ? (
        <PhotoBooth />
      ) : (
        <PhotoStrip />
      )}
    </>
  );
}
