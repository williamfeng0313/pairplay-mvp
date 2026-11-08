"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { trackEvent } from "@/lib/analytics";
import { drawStickers } from "@/lib/stickers";

import StickerPanel from "./StickerPanel";
import { useStickers } from "./useStickers";

type LayoutId = "strip" | "grid";

type Cell = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type Shot = {
  source: CanvasImageSource;
  width: number;
  height: number;
} | null;

const LAYOUTS: Record<
  LayoutId,
  {
    width: number;
    height: number;
    label: string;
    hint: string;
  }
> = {
  strip: {
    width: 420,
    height: 1440,
    label: "Classic 4-cut strip",
    hint: "The tall photo booth classic",
  },
  grid: {
    width: 900,
    height: 1080,
    label: "2 × 2 square",
    hint: "Four squares, easier to share",
  },
};

const FILTERS = [
  { id: "none", label: "Original", css: "none" },
  {
    id: "retro",
    label: "Retro film",
    css: "sepia(.32) saturate(1.35) contrast(1.06)",
  },
  {
    id: "bw",
    label: "Black & white",
    css: "grayscale(1) contrast(1.14)",
  },
  {
    id: "faded",
    label: "Faded",
    css: "sepia(.16) saturate(.7) contrast(.9) brightness(1.08)",
  },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const FRAMES = [
  {
    id: "white",
    label: "Classic white",
    value: "#ffffff",
    ink: "#4a3b41",
  },
  {
    id: "blush",
    label: "Blush",
    value: "#ffe8ef",
    ink: "#7a3b52",
  },
  {
    id: "cream",
    label: "Cream",
    value: "#fff4e6",
    ink: "#6b533a",
  },
  {
    id: "lavender",
    label: "Lavender",
    value: "#efe9ff",
    ink: "#4c3d78",
  },
  {
    id: "ink",
    label: "Midnight",
    value: "#2c2330",
    ink: "#f7edf2",
  },
];

const EMPTY_SHOTS: Shot[] = [
  null,
  null,
  null,
  null,
];

const sleep = (ms: number) =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, ms)
  );

function getCells(layoutId: LayoutId): Cell[] {
  const layout = LAYOUTS[layoutId];

  const isStrip = layoutId === "strip";

  const pad = isStrip ? 28 : 40;
  const gap = isStrip ? 16 : 22;
  const footer = isStrip ? 132 : 120;
  const cols = isStrip ? 1 : 2;
  const rows = isStrip ? 4 : 2;

  const cellW =
    (layout.width -
      pad * 2 -
      gap * (cols - 1)) /
    cols;

  const cellH =
    (layout.height -
      pad * 2 -
      gap * (rows - 1) -
      footer) /
    rows;

  const cells: Cell[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      cells.push({
        x: pad + col * (cellW + gap),
        y: pad + row * (cellH + gap),
        w: cellW,
        h: cellH,
      });
    }
  }

  return cells;
}

function loadImageFile(file: File): Promise<Shot> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(null);
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);

      resolve({
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };

    image.src = url;
  });
}

export default function PhotoStrip() {
  const canvasRef = useRef<HTMLCanvasElement | null>(
    null
  );

  const videoRef = useRef<HTMLVideoElement | null>(
    null
  );

  const streamRef = useRef<MediaStream | null>(null);
  const captureRunRef = useRef(0);

  const [shots, setShots] =
    useState<Shot[]>(EMPTY_SHOTS);

  const [layoutId, setLayoutId] =
    useState<LayoutId>("strip");

  const [filterId, setFilterId] =
    useState<FilterId>("retro");

  const [frameId, setFrameId] = useState("white");

  const [dateStamp, setDateStamp] =
    useState(true);

  const [error, setError] = useState("");
  const [cameraError, setCameraError] =
    useState("");

  const [cameraStatus, setCameraStatus] =
    useState<"off" | "starting" | "live" | "error">(
      "off"
    );

  const [capturing, setCapturing] =
    useState(false);

  const [countdown, setCountdown] = useState<
    number | null
  >(null);

  const layout = LAYOUTS[layoutId];
  const frame =
    FRAMES.find((item) => item.id === frameId) ??
    FRAMES[0];

  const filter =
    FILTERS.find((item) => item.id === filterId) ??
    FILTERS[0];

  const sticker = useStickers({
    canvasRef,
    canvasWidth: layout.width,
    canvasHeight: layout.height,
    eventName: "photo_strip_sticker",
  });

  /**
   * Render the strip. `withSelection` is false only during export,
   * so the dashed drag box never ends up in the downloaded JPG.
   */
  const renderStrip = useCallback(
    (withSelection: boolean = true) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      const w = layout.width;
      const h = layout.height;
      const footer = layoutId === "strip" ? 132 : 120;

      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = frame.value;
      ctx.fillRect(0, 0, w, h);

      const cells = getCells(layoutId);

      cells.forEach((cell, index) => {
        const shot = shots[index];

        ctx.save();

        ctx.beginPath();
        ctx.rect(cell.x, cell.y, cell.w, cell.h);
        ctx.clip();

        if (shot) {
          /** Canvas filters are progressive enhancement. */
          if (filter.css !== "none") {
            ctx.filter = filter.css;
          }

          const scale = Math.max(
            cell.w / shot.width,
            cell.h / shot.height
          );

          const drawW = shot.width * scale;
          const drawH = shot.height * scale;

          ctx.drawImage(
            shot.source,
            cell.x + (cell.w - drawW) / 2,
            cell.y + (cell.h - drawH) / 2,
            drawW,
            drawH
          );
        } else {
          ctx.filter = "none";

          ctx.fillStyle =
            frame.value === "#2c2330"
              ? "rgba(255,255,255,.10)"
              : "rgba(70,45,55,.055)";

          ctx.fillRect(
            cell.x,
            cell.y,
            cell.w,
            cell.h
          );

          ctx.globalAlpha = 0.5;
          ctx.fillStyle = frame.ink;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.font = `${Math.round(
            cell.h * 0.22
          )}px system-ui`;

          ctx.fillText(
            "📷",
            cell.x + cell.w / 2,
            cell.y + cell.h / 2 - cell.h * 0.08
          );

          ctx.font = `700 ${Math.round(
            cell.w * 0.075
          )}px system-ui`;

          ctx.fillText(
            `Photo ${index + 1}`,
            cell.x + cell.w / 2,
            cell.y + cell.h / 2 + cell.h * 0.17
          );
        }

        ctx.restore();

        /** Crisp white frame around every cell. */
        ctx.save();
        ctx.filter = "none";
        ctx.strokeStyle =
          "rgba(255,255,255,.92)";
        ctx.lineWidth = 5;
        ctx.strokeRect(
          cell.x,
          cell.y,
          cell.w,
          cell.h
        );
        ctx.restore();
      });

      /** Footer: brand line + optional date stamp. */
      ctx.save();
      ctx.filter = "none";
      ctx.fillStyle = frame.ink;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const footerY = h - footer;

      ctx.font = `800 ${Math.round(
        w * 0.048
      )}px system-ui, sans-serif`;

      ctx.fillText(
        "TWOLUMI PHOTO BOOTH",
        w / 2,
        footerY + footer * 0.33
      );

      ctx.font = `600 ${Math.round(
        w * 0.033
      )}px system-ui, sans-serif`;

      const dateLabel = new Date().toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );

      ctx.fillText(
        dateStamp
          ? `${dateLabel}  ·  two of us ♥`
          : "two of us ♥ one strip",
        w / 2,
        footerY + footer * 0.7
      );

      ctx.restore();

      drawStickers(
        ctx,
        sticker.stickers,
        sticker.images,
        w,
        h,
        withSelection ? sticker.selectedId : null
      );
    },
    [
      layout.width,
      layout.height,
      layoutId,
      frame.value,
      frame.ink,
      filter.css,
      dateStamp,
      shots,
      sticker.stickers,
      sticker.images,
      sticker.selectedId,
    ]
  );

  useEffect(() => {
    renderStrip(true);
  }, [renderStrip]);

  /** Attach the stream once the <video> element is mounted. */
  useEffect(() => {
    if (
      cameraStatus === "live" &&
      videoRef.current &&
      streamRef.current
    ) {
      videoRef.current.srcObject =
        streamRef.current;

      videoRef.current.play().catch(() => {
        /* Autoplay may be blocked; frames still work. */
      });
    }
  }, [cameraStatus]);

  /** Always release the camera on unmount. */
  useEffect(() => {
    return () => {
      captureRunRef.current += 1;

      streamRef.current
        ?.getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    };
  }, []);

  const stopCamera = useCallback(() => {
    captureRunRef.current += 1;

    streamRef.current
      ?.getTracks()
      .forEach((track) => track.stop());

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraStatus("off");
    setCapturing(false);
    setCountdown(null);
  }, []);

  const startCamera = async () => {
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraStatus("error");
      setCameraError(
        "Camera access is not available here. Uploading four photos works just as well."
      );
      return;
    }

    setCameraStatus("starting");

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: {
              facingMode: "user",
              width: { ideal: 1280 },
              height: { ideal: 960 },
            },
            audio: false,
          }
        );

      streamRef.current = stream;
      setCameraStatus("live");

      trackEvent("photo_strip_camera", {
        action: "open",
      });
    } catch {
      setCameraStatus("error");
      setCameraError(
        "Camera permission was denied, or no camera was found. You can still upload four photos."
      );
    }
  };

  const grabFrame = (): Shot => {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      return null;
    }

    const canvas = document.createElement("canvas");

    canvas.width = 720;
    canvas.height = 720;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const side = Math.min(
      video.videoWidth,
      video.videoHeight
    );

    /** Mirror the preview so text reads correctly. */
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(
      video,
      (video.videoWidth - side) / 2,
      (video.videoHeight - side) / 2,
      side,
      side,
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.restore();

    return {
      source: canvas,
      width: canvas.width,
      height: canvas.height,
    };
  };

  const runCapture = async () => {
    if (cameraStatus !== "live" || capturing) {
      return;
    }

    const runId = ++captureRunRef.current;

    setCapturing(true);
    setError("");

    const captured: Shot[] = [];

    for (let index = 0; index < 4; index += 1) {
      for (let count = 3; count >= 1; count -= 1) {
        setCountdown(count);

        await sleep(650);

        if (runId !== captureRunRef.current) {
          return;
        }
      }

      setCountdown(null);

      const frame = grabFrame();

      captured.push(frame);

      const slot = index;

      setShots((previous) => {
        const next = [...previous];
        next[slot] = frame;
        return next;
      });

      await sleep(300);

      if (runId !== captureRunRef.current) {
        return;
      }
    }

    setCapturing(false);

    trackEvent("photo_strip_capture", {
      source: "camera",
      count: captured.filter(Boolean).length,
    });

    stopCamera();
  };

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files ?? []
    ).slice(0, 4);

    event.target.value = "";

    if (!files.length) {
      return;
    }

    setError("");

    const loaded = await Promise.all(
      files.map(loadImageFile)
    );

    const valid = loaded.filter(
      (shot): shot is NonNullable<Shot> =>
        shot !== null
    );

    if (!valid.length) {
      setError(
        "Those images could not be read. Please try JPG, PNG, or WEBP files."
      );
      return;
    }

    setShots((previous) => {
      const next = [...previous];
      let cursor = 0;

      valid.forEach((shot) => {
        const emptyIndex = next.findIndex(
          (item, index) =>
            index >= cursor && !item
        );

        const target =
          emptyIndex >= 0
            ? emptyIndex
            : cursor % 4;

        next[target] = shot;
        cursor = target + 1;
      });

      return next.slice(0, 4);
    });

    trackEvent("photo_strip_upload", {
      count: valid.length,
    });
  };

  const handleDownload = () => {
    if (!shots.some(Boolean)) {
      setError(
        "Add at least one photo before downloading."
      );
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    try {
      renderStrip(false);

      const dataUrl = canvas.toDataURL(
        "image/jpeg",
        0.92
      );

      renderStrip(true);

      const link = document.createElement("a");

      link.href = dataUrl;
      link.download = `twolumi-4-cut-${layoutId}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      trackEvent("photo_strip_download", {
        layout: layoutId,
        filter: filterId,
        stickers: sticker.stickers.length,
      });
    } catch {
      renderStrip(true);

      setError(
        "The strip could not be exported. Please try again."
      );
    }
  };

  const handleReset = () => {
    stopCamera();

    setShots([...EMPTY_SHOTS]);
    setError("");
    setCameraError("");
    sticker.clearStickers();
  };

  const filledCount = shots.filter(Boolean).length;

  return (
    <section className="photo-booth-grid">
      {/* =====================================================
          LEFT: PREVIEW
      ====================================================== */}
      <div className="photo-booth-preview-card strip-preview">
        <div className="photo-booth-canvas-wrap strip-canvas-wrap">
          <canvas
            ref={canvasRef}
            className="photo-booth-canvas sticker-canvas"
            width={layout.width}
            height={layout.height}
            {...sticker.pointerHandlers}
          />
        </div>

        <div className="photo-booth-preview-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleReset}
          >
            Reset strip
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handleDownload}
          >
            Download JPG
          </button>
        </div>

        <p className="strip-preview-hint">
          💡 Drag stickers directly on the
          preview. They won&apos;t show a
          selection box in the download.
        </p>
      </div>

      {/* =====================================================
          RIGHT: CONTROLS
      ====================================================== */}
      <div className="photo-booth-controls">
        {/* ---------------------------------------------------
            STEP 1 — PHOTOS
        ---------------------------------------------------- */}
        <div className="photo-booth-control-card">
          <div className="game-kicker">
            STEP 1
          </div>

          <h2>Get four photos</h2>

          <p className="game-sub">
            Use your camera for a classic
            3-2-1 four-shot countdown, or
            upload up to four photos at once.
            Everything stays on your device.
          </p>

          <div className="photo-booth-upload-grid">
            <button
              type="button"
              className="photo-booth-upload-button"
              onClick={startCamera}
              disabled={cameraStatus === "starting"}
              style={{
                opacity:
                  cameraStatus === "starting"
                    ? 0.65
                    : 1,
              }}
            >
              <span>🎥 Start camera</span>
            </button>

            <label className="photo-booth-upload-button photo-booth-upload-secondary">
              <span>🖼️ Upload 4 photos</span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
              />
            </label>
          </div>

          {cameraStatus === "live" && (
            <div className="strip-camera">
              <video
                ref={videoRef}
                className="strip-camera-video"
                playsInline
                muted
                autoPlay
              />

              {countdown !== null && (
                <div className="strip-countdown">
                  {countdown}
                </div>
              )}

              <div className="strip-camera-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={runCapture}
                  disabled={capturing}
                >
                  {capturing
                    ? "⏳ Shooting…"
                    : "▶ Start 4-shot countdown"}
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={stopCamera}
                >
                  Close camera
                </button>
              </div>

              <p className="small-muted">
                Live preview only — the video is
                never streamed or saved.
              </p>
            </div>
          )}

          {cameraError && (
            <p className="photo-booth-error">
              {cameraError}
            </p>
          )}

          {error && (
            <p className="photo-booth-error">
              {error}
            </p>
          )}

          <div className="strip-shots">
            {shots.map((shot, index) => (
              <div
                key={index}
                className={
                  shot
                    ? "strip-shot filled"
                    : "strip-shot"
                }
              >
                <strong>{index + 1}</strong>
                <span>
                  {shot ? "✓ Ready" : "Empty"}
                </span>

                {shot && (
                  <button
                    type="button"
                    onClick={() =>
                      setShots((previous) => {
                        const next = [
                          ...previous,
                        ];
                        next[index] = null;
                        return next;
                      })
                    }
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="small-muted">
            {filledCount} of 4 slots filled
          </p>
        </div>

        {/* ---------------------------------------------------
            STEP 2 — LOOK
        ---------------------------------------------------- */}
        <div className="photo-booth-control-card">
          <div className="game-kicker">
            STEP 2
          </div>

          <h2>Choose a layout &amp; look</h2>

          <p className="game-sub">
            Classic tall strip or a square
            grid, with a retro film finish.
          </p>

          <span className="cutout-options-label">
            Layout
          </span>

          <div className="strip-choice-grid">
            {(Object.keys(LAYOUTS) as LayoutId[]).map(
              (id) => (
                <button
                  key={id}
                  type="button"
                  className={
                    layoutId === id
                      ? "strip-choice active"
                      : "strip-choice"
                  }
                  onClick={() => {
                    setLayoutId(id);

                    trackEvent(
                      "photo_strip_layout",
                      { layout: id }
                    );
                  }}
                >
                  <strong>
                    {LAYOUTS[id].label}
                  </strong>
                  <small>
                    {LAYOUTS[id].hint}
                  </small>
                </button>
              )
            )}
          </div>

          <span className="cutout-options-label strip-label-spaced">
            Photo filter
          </span>

          <div className="strip-filter-grid">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  filterId === item.id
                    ? "strip-filter active"
                    : "strip-filter"
                }
                onClick={() =>
                  setFilterId(item.id)
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <span className="cutout-options-label strip-label-spaced">
            Frame color
          </span>

          <div className="cutout-swatches">
            {FRAMES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  frameId === item.id
                    ? "cutout-swatch active"
                    : "cutout-swatch"
                }
                style={{
                  background: item.value,
                }}
                aria-label={item.label}
                title={item.label}
                onClick={() =>
                  setFrameId(item.id)
                }
              />
            ))}
          </div>

          <label className="cutout-outline-toggle">
            <input
              type="checkbox"
              checked={dateStamp}
              onChange={(event) =>
                setDateStamp(
                  event.target.checked
                )
              }
            />
            <span>Print today&apos;s date</span>
          </label>
        </div>

        {/* ---------------------------------------------------
            STEP 3 — STICKERS
        ---------------------------------------------------- */}
        <StickerPanel
          controller={sticker}
          step="STEP 3"
        />

        {/* ---------------------------------------------------
            PRIVACY NOTE
        ---------------------------------------------------- */}
        <div className="photo-booth-note">
          <strong>
            🔒 Nothing leaves your device
          </strong>

          <span>
            Camera frames, uploaded photos,
            filters and stickers are all
            handled in your browser. No
            account, no upload, no API calls.
          </span>
        </div>
      </div>
    </section>
  );
}
