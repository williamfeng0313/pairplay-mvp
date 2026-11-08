"use client";

import {
  STICKERS,
  stickerDataUrl,
} from "@/lib/stickers";

import type { StickerController } from "./useStickers";

export default function StickerPanel({
  controller,
  step,
}: {
  controller: StickerController;
  step: string;
}) {
  const {
    stickers,
    selectedId,
    addSticker,
    updateSticker,
    removeSticker,
    clearStickers,
  } = controller;

  const selected =
    stickers.find(
      (item) => item.id === selectedId
    ) ?? null;

  return (
    <div className="photo-booth-control-card">
      <div className="game-kicker">
        {step}
      </div>

      <h2>Add stickers</h2>

      <p className="game-sub">
        Tap a sticker to add it, then drag it
        around on the preview. All stickers
        are drawn by us, so your finished
        image stays yours.
      </p>

      <div className="sticker-grid">
        {STICKERS.map((def) => (
          <button
            key={def.id}
            type="button"
            className="sticker-choice"
            onClick={() => addSticker(def.id)}
            aria-label={`Add ${def.label} sticker`}
            title={def.label}
          >
            <img
              src={stickerDataUrl(def)}
              alt=""
              draggable={false}
            />
          </button>
        ))}
      </div>

      <p className="sticker-hint">
        💡 Tap to add · drag on the preview
        to move · tap an empty area to
        deselect
      </p>

      {selected && (
        <div className="sticker-controls">
          <span className="cutout-options-label">
            Selected sticker
          </span>

          <label className="photo-booth-range">
            <span>
              <span>Size</span>

              <strong>
                {Math.round(
                  selected.scale * 100
                )}
                %
              </strong>
            </span>

            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.05"
              value={selected.scale}
              onChange={(event) =>
                updateSticker(selected.id, {
                  scale: Number(
                    event.target.value
                  ),
                })
              }
            />
          </label>

          <label className="photo-booth-range">
            <span>
              <span>Rotation</span>

              <strong>
                {Math.round(
                  (selected.rotation *
                    180) /
                    Math.PI
                )}
                °
              </strong>
            </span>

            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={Math.round(
                (selected.rotation * 180) /
                  Math.PI
              )}
              onChange={(event) =>
                updateSticker(selected.id, {
                  rotation:
                    (Number(
                      event.target.value
                    ) *
                      Math.PI) /
                    180,
                })
              }
            />
          </label>

          <button
            type="button"
            className="btn-secondary sticker-delete"
            onClick={() =>
              removeSticker(selected.id)
            }
          >
            Remove this sticker
          </button>
        </div>
      )}

      {stickers.length > 0 && (
        <button
          type="button"
          className="share-result-link sticker-clear"
          onClick={clearStickers}
        >
          Clear all {stickers.length} sticker
          {stickers.length === 1 ? "" : "s"}
        </button>
      )}
    </div>
  );
}
