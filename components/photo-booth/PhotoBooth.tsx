"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  PHOTO_CANVAS_HEIGHT,
  PHOTO_CANVAS_WIDTH,
  photoBoothTemplates,
  PhotoBoothTemplate,
} from "@/data/photoBoothTemplates";

import {
  createPersonCutout,
  type CutoutResult,
} from "@/lib/personCutout";

import { drawStickers } from "@/lib/stickers";

import { trackEvent } from "@/lib/analytics";

import StickerPanel from "./StickerPanel";
import { useStickers } from "./useStickers";

type PhotoState = {
  x: number;
  y: number;
  zoom: number;
};

type CutoutStatus =
  | "off"
  | "loading"
  | "on"
  | "error";

type PhotoSource = {
  source: CanvasImageSource;
  width: number;
  height: number;
};

type PhotoDrawOptions = {
  /** 抠图模式下先铺一层底色，JPEG 导出才不会变黑 */
  background: string | null;
  outline: HTMLCanvasElement | null;
};

const DEFAULT_PHOTO_STATE: PhotoState = {
  x: 0,
  y: 0,
  zoom: 1,
};

const CUTOUT_BACKGROUNDS = [
  {
    id: "blush",
    label: "Blush",
    value: "#ffe8ef",
  },
  {
    id: "cream",
    label: "Cream",
    value: "#fff4e6",
  },
  {
    id: "lavender",
    label: "Lavender",
    value: "#efe9ff",
  },
  {
    id: "mint",
    label: "Mint",
    value: "#e3f6ee",
  },
  {
    id: "sky",
    label: "Sky",
    value: "#e4f1ff",
  },
  {
    id: "white",
    label: "White",
    value: "#ffffff",
  },
];

export default function PhotoBooth() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [selectedTemplateId, setSelectedTemplateId] = useState(
    photoBoothTemplates[0]?.id ?? ""
  );

  const [photoState, setPhotoState] = useState<PhotoState>(
    DEFAULT_PHOTO_STATE
  );

  const [hasPhoto, setHasPhoto] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const [cutoutStatus, setCutoutStatus] =
    useState<CutoutStatus>("off");

  const [cutoutResult, setCutoutResult] =
    useState<CutoutResult | null>(null);

  const [cutoutBackground, setCutoutBackground] =
    useState(CUTOUT_BACKGROUNDS[0]?.value ?? "#ffe8ef");

  const [showOutline, setShowOutline] =
    useState(true);

  const [cutoutError, setCutoutError] =
    useState("");

  /** 防止换照片后旧的异步抠图结果覆盖新照片 */
  const cutoutRequestRef = useRef(0);

  const sticker = useStickers({
    canvasRef,
    canvasWidth: PHOTO_CANVAS_WIDTH,
    canvasHeight: PHOTO_CANVAS_HEIGHT,
    eventName: "photo_booth_sticker",
  });

  const selectedTemplate =
    photoBoothTemplates.find(
      (template) => template.id === selectedTemplateId
    ) ?? photoBoothTemplates[0];

  /**
   * Clean up an old object URL.
   */
  const revokeObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  /**
   * Draw the empty canvas.
   */
  const drawEmptyCanvas = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      template: PhotoBoothTemplate
    ) => {
      ctx.clearRect(
        0,
        0,
        PHOTO_CANVAS_WIDTH,
        PHOTO_CANVAS_HEIGHT
      );

      ctx.fillStyle = template.background;
      ctx.fillRect(
        0,
        0,
        PHOTO_CANVAS_WIDTH,
        PHOTO_CANVAS_HEIGHT
      );

      // Decorative circles
      ctx.save();

      ctx.globalAlpha = 0.16;

      ctx.fillStyle = template.accent;

      ctx.beginPath();
      ctx.arc(72, 72, 34, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        PHOTO_CANVAS_WIDTH - 68,
        76,
        42,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();

      // Photo placeholder
      const {
        photoX,
        photoY,
        photoWidth,
        photoHeight,
      } = template;

      ctx.save();

      ctx.fillStyle = "#f2e9ec";

      roundedRect(
        ctx,
        photoX,
        photoY,
        photoWidth,
        photoHeight,
        26
      );

      ctx.fill();

      ctx.strokeStyle = "#dfd0d5";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 10]);

      roundedRect(
        ctx,
        photoX,
        photoY,
        photoWidth,
        photoHeight,
        26
      );

      ctx.stroke();

      ctx.setLineDash([]);

      // Camera icon
      ctx.fillStyle = "#9b8990";

      const centerX = photoX + photoWidth / 2;
      const centerY = photoY + photoHeight / 2;

      ctx.font = "72px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText("📷", centerX, centerY - 20);

      ctx.font = "700 28px system-ui";
      ctx.fillText(
        "Upload a photo",
        centerX,
        centerY + 70
      );

      ctx.restore();

      drawTemplateText(ctx, template);
    },
    []
  );

  /**
   * Draw the final canvas.
   */
  const drawCanvas = useCallback((withSelection: boolean = true) => {
    const canvas = canvasRef.current;

    if (!canvas || !selectedTemplate) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(
      0,
      0,
      PHOTO_CANVAS_WIDTH,
      PHOTO_CANVAS_HEIGHT
    );

    /**
     * Background
     */
    ctx.fillStyle = selectedTemplate.background;

    ctx.fillRect(
      0,
      0,
      PHOTO_CANVAS_WIDTH,
      PHOTO_CANVAS_HEIGHT
    );

    /**
     * Decorative background elements.
     */
    drawDecorations(ctx, selectedTemplate);

    /**
     * Photo.
     */
    const image = imageRef.current;

    if (image && hasPhoto) {
      const isCutout =
        cutoutStatus === "on" && cutoutResult;

      const photo: PhotoSource = isCutout
        ? {
            source: cutoutResult.canvas,
            width: cutoutResult.width,
            height: cutoutResult.height,
          }
        : {
            source: image,
            width: image.naturalWidth,
            height: image.naturalHeight,
          };

      const options: PhotoDrawOptions = isCutout
        ? {
            background: cutoutBackground,
            outline: showOutline
              ? cutoutResult.outline
              : null,
          }
        : {
            background: null,
            outline: null,
          };

      drawPhoto(
        ctx,
        photo,
        selectedTemplate,
        photoState,
        options
      );
    } else {
      drawPhotoPlaceholder(
        ctx,
        selectedTemplate
      );
    }

    /**
     * Template text and decoration.
     */
    drawTemplateText(
      ctx,
      selectedTemplate
    );

    /**
     * Stickers sit above the template text.
     * The selection box is preview-only.
     */
    drawStickers(
      ctx,
      sticker.stickers,
      sticker.images,
      PHOTO_CANVAS_WIDTH,
      PHOTO_CANVAS_HEIGHT,
      withSelection ? sticker.selectedId : null
    );
  }, [
    selectedTemplate,
    photoState,
    hasPhoto,
    cutoutStatus,
    cutoutResult,
    cutoutBackground,
    showOutline,
    sticker.stickers,
    sticker.images,
    sticker.selectedId,
  ]);

  /**
   * Redraw whenever the selected template,
   * uploaded photo, or adjustment changes.
   */
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  /**
   * Cleanup object URL when component unmounts.
   */
  useEffect(() => {
    return () => {
      revokeObjectUrl();
    };
  }, [revokeObjectUrl]);

  /**
   * Handle uploaded image.
   */
  const handlePhotoUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    /**
     * Basic validation.
     */
    if (!file.type.startsWith("image/")) {
      setError(
        "Please choose an image file such as JPG, PNG, or WEBP."
      );

      event.target.value = "";
      return;
    }

    /**
     * Limit extremely large files.
     */
    const maxSize = 15 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Please choose an image smaller than 15 MB."
      );

      event.target.value = "";
      return;
    }

    /**
     * Clean previous image URL.
     */
    revokeObjectUrl();

    const objectUrl = URL.createObjectURL(file);

    objectUrlRef.current = objectUrl;

    const image = new Image();

    image.onload = () => {
      imageRef.current = image;

      /**
       * 换照片时丢弃上一张的抠图结果，
       * 并让仍在进行的异步推理失效。
       */
      cutoutRequestRef.current += 1;

      setCutoutResult(null);
      setCutoutStatus("off");
      setCutoutError("");

      setHasPhoto(true);

      setPhotoState(DEFAULT_PHOTO_STATE);

      setFileName(file.name);

      /**
       * Release the object URL after the image
       * has loaded into memory.
       */
      if (objectUrlRef.current === objectUrl) {
        URL.revokeObjectURL(objectUrl);

        objectUrlRef.current = null;
      }
    };

    image.onerror = () => {
      setError(
        "This image could not be loaded. Please try another photo."
      );

      setHasPhoto(false);

      imageRef.current = null;

      URL.revokeObjectURL(objectUrl);

      objectUrlRef.current = null;
    };

    image.src = objectUrl;

    /**
     * Allow the same photo to be selected again.
     */
    event.target.value = "";
  };

  /**
   * Change template.
   */
  const handleTemplateChange = (
    templateId: string
  ) => {
    setSelectedTemplateId(templateId);

    /**
     * Reset photo position when changing template.
     * This makes the first version predictable.
     */
    setPhotoState(DEFAULT_PHOTO_STATE);
  };

  /**
   * Reset photo position.
   */
  const handleResetPosition = () => {
    setPhotoState(DEFAULT_PHOTO_STATE);
  };

  /**
   * Reset the entire Photo Booth.
   */
  const handleResetPhoto = () => {
    revokeObjectUrl();

    imageRef.current = null;

    cutoutRequestRef.current += 1;

    setCutoutResult(null);
    setCutoutStatus("off");
    setCutoutError("");

    setHasPhoto(false);
    setFileName("");
    setError("");

    setPhotoState(DEFAULT_PHOTO_STATE);

    drawCanvas();
  };

  /**
   * Toggle the local AI background cutout.
   */
  const handleToggleCutout = async () => {
    if (cutoutStatus === "loading") {
      return;
    }

    if (cutoutStatus === "on") {
      setCutoutStatus("off");
      setCutoutError("");

      trackEvent("photo_booth_cutout", {
        action: "off",
      });

      return;
    }

    const image = imageRef.current;

    if (!image || !hasPhoto) {
      setCutoutError(
        "Upload a photo first, then try the cutout."
      );

      return;
    }

    const requestId =
      ++cutoutRequestRef.current;

    setCutoutStatus("loading");
    setCutoutError("");

    try {
      const result =
        await createPersonCutout(image);

      /** 期间换了照片或重置了，就丢弃这次结果 */
      if (
        requestId !== cutoutRequestRef.current
      ) {
        return;
      }

      setCutoutResult(result);
      setCutoutStatus("on");
      setPhotoState(DEFAULT_PHOTO_STATE);

      trackEvent("photo_booth_cutout", {
        action: "on",
        outline: showOutline,
      });
    } catch {
      if (
        requestId !== cutoutRequestRef.current
      ) {
        return;
      }

      setCutoutStatus("off");

      setCutoutError(
        "Background removal could not start here. Your original photo still works — just keep the cutout off."
      );

      trackEvent("photo_booth_cutout", {
        action: "error",
      });
    }
  };

  /**
   * Download final image.
   */
  const handleDownload = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    if (!hasPhoto) {
      setError(
        "Please upload a photo before downloading."
      );

      return;
    }

    try {
      /** Export without the dashed sticker selection box. */
      drawCanvas(false);

      const dataUrl = canvas.toDataURL(
        "image/jpeg",
        0.92
      );

      drawCanvas(true);

      const link = document.createElement("a");

      const safeTemplateName =
        selectedTemplate.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

      link.href = dataUrl;

      link.download =
        `twolumi-photo-booth-${safeTemplateName || "photo"}.jpg`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch {
      drawCanvas(true);

      setError(
        "The photo could not be exported. Please try again."
      );
    }
  };

  /**
   * Update zoom.
   */
  const handleZoomChange = (
    value: number
  ) => {
    setPhotoState((previous) => ({
      ...previous,
      zoom: value,
    }));
  };

  /**
   * Update horizontal position.
   */
  const handleXChange = (
    value: number
  ) => {
    setPhotoState((previous) => ({
      ...previous,
      x: value,
    }));
  };

  /**
   * Update vertical position.
   */
  const handleYChange = (
    value: number
  ) => {
    setPhotoState((previous) => ({
      ...previous,
      y: value,
    }));
  };

  if (!selectedTemplate) {
    return null;
  }

  return (
    <section className="photo-booth-grid">
      {/* =====================================================
          LEFT: PREVIEW
      ====================================================== */}
      <div className="photo-booth-preview-card">
        <div className="photo-booth-canvas-wrap">
          <canvas
            ref={canvasRef}
            className="photo-booth-canvas sticker-canvas"
            width={PHOTO_CANVAS_WIDTH}
            height={PHOTO_CANVAS_HEIGHT}
            {...sticker.pointerHandlers}
          />
        </div>

        <div className="photo-booth-preview-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleResetPhoto}
          >
            Reset Photo
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handleDownload}
            disabled={!hasPhoto}
            style={{
              opacity: hasPhoto ? 1 : 0.55,
              cursor: hasPhoto
                ? "pointer"
                : "not-allowed",
            }}
          >
            Download JPG
          </button>
        </div>
      </div>

      {/* =====================================================
          RIGHT: CONTROLS
      ====================================================== */}
      <div className="photo-booth-controls">
        {/* ---------------------------------------------------
            STEP 1
        ---------------------------------------------------- */}
        <div className="photo-booth-control-card">
          <div className="game-kicker">
            STEP 1
          </div>

          <h2>
            Upload your photo
          </h2>

          <p className="game-sub">
            Choose a photo from your phone or
            computer. Your photo stays in your
            browser.
          </p>

          <div className="photo-booth-upload-grid">
            <label className="photo-booth-upload-button">
              <span>
                📷 Choose Photo
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </label>

            <label className="photo-booth-upload-button photo-booth-upload-secondary">
              <span>
                📱 Take Photo
              </span>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>

          {fileName && (
            <p className="small-muted" style={{ marginTop: 12 }}>
              Selected: {fileName}
            </p>
          )}

          {error && (
            <p className="photo-booth-error">
              {error}
            </p>
          )}
        </div>

        {/* ---------------------------------------------------
            STEP 2
        ---------------------------------------------------- */}
        <div className="photo-booth-control-card">
          <div className="game-kicker">
            STEP 2
          </div>

          <h2>
            Choose a template
          </h2>

          <p className="game-sub">
            Pick a style for your photo card.
          </p>

          <div className="photo-booth-template-list">
            {photoBoothTemplates.map(
              (template) => {
                const isActive =
                  template.id ===
                  selectedTemplateId;

                return (
                  <button
                    key={template.id}
                    type="button"
                    className={
                      isActive
                        ? "photo-booth-template active"
                        : "photo-booth-template"
                    }
                    onClick={() =>
                      handleTemplateChange(
                        template.id
                      )
                    }
                  >
                    <span
                      className="photo-booth-template-icon"
                      style={{
                        background:
                          template.accentSoft,
                      }}
                    >
                      {template.emoji}
                    </span>

                    <span className="photo-booth-template-copy">
                      <strong>
                        {template.name}
                      </strong>

                      <small>
                        {template.description}
                      </small>
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* ---------------------------------------------------
            STEP 3 — LOCAL AI CUTOUT
        ---------------------------------------------------- */}
        <div className="photo-booth-control-card">
          <div className="game-kicker">
            STEP 3
          </div>

          <h2>
            Cut out the background
          </h2>

          <p className="game-sub">
            Turn your photo into a sticker-style
            cutout. The model finds the people,
            removes the background, and adds a
            soft white outline.
          </p>

          <button
            type="button"
            className={
              cutoutStatus === "on"
                ? "btn-primary cutout-toggle active"
                : "btn-secondary cutout-toggle"
            }
            onClick={handleToggleCutout}
            disabled={
              !hasPhoto ||
              cutoutStatus === "loading"
            }
            style={{
              opacity:
                !hasPhoto ||
                cutoutStatus === "loading"
                  ? 0.65
                  : 1,
            }}
          >
            {cutoutStatus === "loading"
              ? "⏳ Preparing cutout…"
              : cutoutStatus === "on"
                ? "✓ Background removed — tap to undo"
                : "✂️ Remove background"}
          </button>

          {cutoutStatus === "loading" && (
            <p className="small-muted cutout-hint">
              First use downloads a tiny model
              (~600 KB). Later it&apos;s instant.
            </p>
          )}

          {cutoutError && (
            <p className="photo-booth-error">
              {cutoutError}
            </p>
          )}

          {cutoutStatus === "on" && (
            <div className="cutout-options">
              <span className="cutout-options-label">
                Background color
              </span>

              <div className="cutout-swatches">
                {CUTOUT_BACKGROUNDS.map(
                  (color) => (
                    <button
                      key={color.id}
                      type="button"
                      className={
                        color.value ===
                        cutoutBackground
                          ? "cutout-swatch active"
                          : "cutout-swatch"
                      }
                      style={{
                        background: color.value,
                      }}
                      onClick={() => {
                        setCutoutBackground(
                          color.value
                        );

                        trackEvent(
                          "photo_booth_cutout",
                          {
                            action: "background",
                            color: color.id,
                          }
                        );
                      }}
                      aria-label={color.label}
                      title={color.label}
                    />
                  )
                )}
              </div>

              <label className="cutout-outline-toggle">
                <input
                  type="checkbox"
                  checked={showOutline}
                  onChange={(event) =>
                    setShowOutline(
                      event.target.checked
                    )
                  }
                />

                <span>
                  White sticker outline
                </span>
              </label>
            </div>
          )}

          <p className="cutout-privacy">
            Runs on your device. Your photo is
            never uploaded — only the model is
            downloaded from a public CDN.
          </p>
        </div>

        {/* ---------------------------------------------------
            STEP 4
        ---------------------------------------------------- */}
        <div className="photo-booth-control-card">
          <div className="game-kicker">
            STEP 4
          </div>

          <h2>
            Adjust your photo
          </h2>

          <p className="game-sub">
            Move and zoom the photo until the
            crop looks right.
          </p>

          {/* Zoom */}
          <label className="photo-booth-range">
            <span>
              <span>Zoom</span>

              <strong>
                {photoState.zoom.toFixed(2)}×
              </strong>
            </span>

            <input
              type="range"
              min="1"
              max="2.5"
              step="0.01"
              value={photoState.zoom}
              onChange={(event) =>
                handleZoomChange(
                  Number(event.target.value)
                )
              }
            />
          </label>

          {/* Horizontal */}
          <label className="photo-booth-range">
            <span>
              <span>Left / right</span>

              <strong>
                {photoState.x}
              </strong>
            </span>

            <input
              type="range"
              min="-300"
              max="300"
              step="1"
              value={photoState.x}
              onChange={(event) =>
                handleXChange(
                  Number(event.target.value)
                )
              }
            />
          </label>

          {/* Vertical */}
          <label className="photo-booth-range">
            <span>
              <span>Up / down</span>

              <strong>
                {photoState.y}
              </strong>
            </span>

            <input
              type="range"
              min="-300"
              max="300"
              step="1"
              value={photoState.y}
              onChange={(event) =>
                handleYChange(
                  Number(event.target.value)
                )
              }
            />
          </label>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleResetPosition}
            style={{
              width: "100%",
              marginTop: 18,
            }}
          >
            Reset Position
          </button>
        </div>

        {/* ---------------------------------------------------
            STEP 5 — DRAGGABLE STICKERS
        ---------------------------------------------------- */}
        <StickerPanel
          controller={sticker}
          step="STEP 5"
        />

        {/* ---------------------------------------------------
            PRIVACY NOTE
        ---------------------------------------------------- */}
        <div className="photo-booth-note">
          <strong>
            🔒 Your photo stays on your device
          </strong>

          <span>
            Every edit and the background cutout
            happen in your browser. Your photo is
            never sent to a server. Only the
            cutout model is downloaded from a
            public CDN on first use.
          </span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CANVAS HELPERS
========================================================= */

/**
 * Draw photo inside the template's photo area.
 *
 * The image uses "cover" behavior:
 * - The photo fills the entire photo area.
 * - Excess areas are cropped.
 * - Aspect ratio is preserved.
 */
function drawPhoto(
  ctx: CanvasRenderingContext2D,
  photo: PhotoSource,
  template: PhotoBoothTemplate,
  state: PhotoState,
  options: PhotoDrawOptions
) {
  const {
    photoX,
    photoY,
    photoWidth,
    photoHeight,
  } = template;

  /**
   * Calculate cover scale.
   */
  const scale = Math.max(
    photoWidth / photo.width,
    photoHeight / photo.height
  );

  const width =
    photo.width *
    scale *
    state.zoom;

  const height =
    photo.height *
    scale *
    state.zoom;

  /**
   * Center image in the photo area.
   */
  const centeredX =
    photoX +
    (photoWidth - width) / 2;

  const centeredY =
    photoY +
    (photoHeight - height) / 2;

  /**
   * User adjustments.
   */
  const drawX =
    centeredX + state.x;

  const drawY =
    centeredY + state.y;

  /**
   * Clip image to rounded photo frame.
   */
  ctx.save();

  roundedRect(
    ctx,
    photoX,
    photoY,
    photoWidth,
    photoHeight,
    26
  );

  ctx.clip();

  /**
   * Cutout mode: lay down a solid backdrop first.
   * Otherwise transparent pixels turn black in
   * the JPEG export.
   */
  if (options.background) {
    ctx.fillStyle = options.background;

    ctx.fillRect(
      photoX,
      photoY,
      photoWidth,
      photoHeight
    );
  }

  /**
   * Sticker outline, pre-composed in personCutout.
   */
  if (options.outline) {
    ctx.drawImage(
      options.outline,
      drawX,
      drawY,
      width,
      height
    );
  }

  ctx.drawImage(
    photo.source,
    drawX,
    drawY,
    width,
    height
  );

  ctx.restore();

  /**
   * Photo border.
   */
  ctx.save();

  roundedRect(
    ctx,
    photoX,
    photoY,
    photoWidth,
    photoHeight,
    26
  );

  ctx.strokeStyle =
    "rgba(255,255,255,.92)";

  ctx.lineWidth = 8;

  ctx.stroke();

  ctx.restore();
}

/**
 * Draw placeholder before a photo is uploaded.
 */
function drawPhotoPlaceholder(
  ctx: CanvasRenderingContext2D,
  template: PhotoBoothTemplate
) {
  const {
    photoX,
    photoY,
    photoWidth,
    photoHeight,
  } = template;

  ctx.save();

  ctx.fillStyle = "#f3e9ed";

  roundedRect(
    ctx,
    photoX,
    photoY,
    photoWidth,
    photoHeight,
    26
  );

  ctx.fill();

  ctx.strokeStyle = "#d9c9cf";

  ctx.lineWidth = 3;

  ctx.setLineDash([12, 12]);

  roundedRect(
    ctx,
    photoX,
    photoY,
    photoWidth,
    photoHeight,
    26
  );

  ctx.stroke();

  ctx.setLineDash([]);

  const centerX =
    photoX + photoWidth / 2;

  const centerY =
    photoY + photoHeight / 2;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "72px system-ui";

  ctx.fillStyle = "#98858d";

  ctx.fillText(
    "📷",
    centerX,
    centerY - 28
  );

  ctx.font =
    "700 30px system-ui";

  ctx.fillText(
    "Upload a photo",
    centerX,
    centerY + 70
  );

  ctx.restore();
}

/**
 * Draw decorative elements.
 */
function drawDecorations(
  ctx: CanvasRenderingContext2D,
  template: PhotoBoothTemplate
) {
  ctx.save();

  /**
   * Top left circle.
   */
  ctx.globalAlpha = 0.12;

  ctx.fillStyle =
    template.accent;

  ctx.beginPath();

  ctx.arc(
    60,
    62,
    38,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /**
   * Top right circle.
   */
  ctx.beginPath();

  ctx.arc(
    PHOTO_CANVAS_WIDTH - 60,
    72,
    50,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /**
   * Small decorative dots.
   */
  ctx.globalAlpha = 0.2;

  for (let i = 0; i < 5; i++) {
    ctx.beginPath();

    ctx.arc(
      100 + i * 28,
      78,
      4,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();

  /**
   * Bottom decoration.
   */
  ctx.save();

  ctx.fillStyle =
    template.accentSoft;

  roundedRect(
    ctx,
    52,
    PHOTO_CANVAS_HEIGHT - 116,
    PHOTO_CANVAS_WIDTH - 104,
    52,
    26
  );

  ctx.fill();

  ctx.restore();
}

/**
 * Draw template text.
 */
function drawTemplateText(
  ctx: CanvasRenderingContext2D,
  template: PhotoBoothTemplate
) {
  ctx.save();

  const centerX =
    PHOTO_CANVAS_WIDTH / 2;

  /**
   * Main title.
   */
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle =
    template.accent;

  ctx.font =
    "900 58px system-ui, sans-serif";

  ctx.fillText(
    template.title,
    centerX,
    65
  );

  /**
   * Subtitle.
   */
  ctx.fillStyle = "#665d61";

  ctx.font =
    "600 25px system-ui, sans-serif";

  ctx.fillText(
    template.subtitle,
    centerX,
    PHOTO_CANVAS_HEIGHT - 90
  );

  /**
   * Small top label.
   */
  ctx.fillStyle =
    template.accent;

  ctx.font =
    "800 18px system-ui, sans-serif";

  ctx.fillText(
    "TWOLUMI PHOTO BOOTH",
    centerX,
    100
  );

  ctx.restore();
}

/**
 * Rounded rectangle helper.
 */
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const safeRadius = Math.min(
    radius,
    width / 2,
    height / 2
  );

  ctx.beginPath();

  ctx.moveTo(
    x + safeRadius,
    y
  );

  ctx.lineTo(
    x + width - safeRadius,
    y
  );

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + safeRadius
  );

  ctx.lineTo(
    x + width,
    y + height - safeRadius
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height
  );

  ctx.lineTo(
    x + safeRadius,
    y + height
  );

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - safeRadius
  );

  ctx.lineTo(
    x,
    y + safeRadius
  );

  ctx.quadraticCurveTo(
    x,
    y,
    x + safeRadius,
    y
  );

  ctx.closePath();
}