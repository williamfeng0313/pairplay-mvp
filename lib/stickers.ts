/**
 * Sticker assets and canvas helpers.
 *
 * Every sticker here is a hand-written SVG path owned by this project.
 * No third-party emoji set, icon pack or licensed artwork is used, so
 * these are safe to ship in a commercial, ad-supported product.
 *
 * Sticker positions are normalised (0..1) against the canvas size.
 * That lets the same sticker list survive a layout change between
 * the tall 4-cut strip and the square 2x2 grid.
 */

export type StickerDef = {
  id: string;
  label: string;
  svg: string;
};

const svg = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">${body}</svg>`;

const HEART_PATH =
  "M50 86C50 86 10 60 10 35 10 21 21 12 34 12c8 0 14 4 16 10 2-6 8-10 16-10 13 0 24 9 24 23 0 25-40 51-40 51z";

export const STICKERS: StickerDef[] = [
  {
    id: "heart",
    label: "Heart",
    svg: svg(
      `<path d="${HEART_PATH}" fill="#f64678"/><path d="M28 30c0-6 5-10 10-9" stroke="#ffd0de" stroke-width="5" stroke-linecap="round" fill="none"/>`
    ),
  },
  {
    id: "heart-outline",
    label: "Heart outline",
    svg: svg(
      `<path d="${HEART_PATH}" fill="#fff0f5" stroke="#e0336a" stroke-width="6" stroke-linejoin="round"/>`
    ),
  },
  {
    id: "star",
    label: "Star",
    svg: svg(
      `<path d="M50 6 62 37 95 39 69 59 78 92 50 73 22 92 31 59 5 39 38 37z" fill="#ffc53d" stroke="#efa716" stroke-width="3" stroke-linejoin="round"/>`
    ),
  },
  {
    id: "sparkle",
    label: "Sparkle",
    svg: svg(
      `<path d="M46 4c4 30 16 42 46 46-30 4-42 16-46 46-4-30-16-42-46-46 30-4 42-16 46-46z" fill="#a78bfa"/><path d="M82 10c1.5 10 5 13.5 14 15-9 1.5-12.5 5-14 15-1.5-10-5-13.5-14-15 9-1.5 12.5-5 14-15z" fill="#f9a8d4"/>`
    ),
  },
  {
    id: "bow",
    label: "Bow",
    svg: svg(
      `<path d="M48 50C28 26 8 26 8 43c0 17 22 17 40 7z" fill="#f472b6"/><path d="M52 50c20-24 40-24 40-7 0 17-22 17-40 7z" fill="#f472b6"/><path d="M44 54 30 88l16-6 8-22z" fill="#ec4899"/><path d="M56 54l14 34-16-6-8-22z" fill="#ec4899"/><circle cx="50" cy="50" r="10" fill="#db2777"/>`
    ),
  },
  {
    id: "flower",
    label: "Flower",
    svg: svg(
      `<g fill="#ff96b8"><circle cx="50" cy="24" r="16"/><circle cx="75" cy="42" r="16"/><circle cx="65" cy="71" r="16"/><circle cx="35" cy="71" r="16"/><circle cx="25" cy="42" r="16"/></g><circle cx="50" cy="50" r="14" fill="#ffd45e"/>`
    ),
  },
  {
    id: "crown",
    label: "Crown",
    svg: svg(
      `<path d="M10 74 16 28l20 20 14-26 14 26 20-20 6 46z" fill="#ffc53d" stroke="#e9a313" stroke-width="3" stroke-linejoin="round"/><rect x="14" y="76" width="72" height="12" rx="5" fill="#f5ad24"/><circle cx="50" cy="18" r="5" fill="#ff6b9a"/><circle cx="16" cy="24" r="4" fill="#ff6b9a"/><circle cx="84" cy="24" r="4" fill="#ff6b9a"/>`
    ),
  },
  {
    id: "balloon",
    label: "Balloon",
    svg: svg(
      `<path d="M50 66v28" stroke="#8b7a80" stroke-width="3" fill="none"/><ellipse cx="50" cy="38" rx="25" ry="30" fill="#7cc4ff"/><path d="M45 67h10l-5 8z" fill="#5aa8ee"/><ellipse cx="40" cy="28" rx="7" ry="10" fill="#c8e8ff" opacity=".8"/>`
    ),
  },
  {
    id: "rainbow",
    label: "Rainbow",
    svg: svg(
      `<g fill="none" stroke-linecap="round"><path d="M12 78a38 38 0 0 1 76 0" stroke="#ff7a9c" stroke-width="11"/><path d="M23 78a27 27 0 0 1 54 0" stroke="#ffd166" stroke-width="11"/><path d="M34 78a16 16 0 0 1 32 0" stroke="#7cc4ff" stroke-width="11"/></g><circle cx="12" cy="80" r="9" fill="#fff" opacity=".9"/><circle cx="88" cy="80" r="9" fill="#fff" opacity=".9"/>`
    ),
  },
  {
    id: "camera",
    label: "Camera",
    svg: svg(
      `<rect x="8" y="28" width="84" height="58" rx="12" fill="#8b7bd8"/><rect x="26" y="20" width="22" height="11" rx="4" fill="#6f5fc0"/><circle cx="50" cy="57" r="19" fill="#f6f1ff"/><circle cx="50" cy="57" r="12" fill="#8b7bd8"/><circle cx="78" cy="40" r="4" fill="#ffd166"/>`
    ),
  },
  {
    id: "lips",
    label: "Kiss",
    svg: svg(
      `<path d="M14 46c8-14 22-12 36-2 14-10 28-12 36 2-8 20-22 32-36 32S22 66 14 46z" fill="#e0336a"/><path d="M14 46c14 4 26 6 36 6s22-2 36-6" stroke="#ff9ebb" stroke-width="4" fill="none" stroke-linecap="round"/>`
    ),
  },
  {
    id: "diamond",
    label: "Diamond",
    svg: svg(
      `<path d="M50 8 90 40 50 92 10 40z" fill="#8fd8ff" stroke="#3fa9e8" stroke-width="3" stroke-linejoin="round"/><path d="M10 40h80M30 40l20 52 20-52M50 8 30 40l20-32 20 32-20-32" stroke="#e8f8ff" stroke-width="3" fill="none" stroke-linejoin="round"/>`
    ),
  },
];

export type StickerInstance = {
  id: string;
  defId: string;
  /** 0..1 relative to canvas width */
  x: number;
  /** 0..1 relative to canvas height */
  y: number;
  scale: number;
  /** radians */
  rotation: number;
};

/** Sticker base size as a fraction of the canvas width. */
export const STICKER_SIZE_RATIO = 0.17;

let imageCache: Map<string, HTMLImageElement> | null = null;

export function stickerDataUrl(def: StickerDef): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(def.svg)}`;
}

/**
 * Decode every SVG once per page load. data: URLs do not taint the
 * canvas, so the finished image can still be exported with toDataURL.
 */
export function getStickerImages(): Map<string, HTMLImageElement> {
  return imageCache ?? new Map();
}

export function preloadStickerImages(): Promise<
  Map<string, HTMLImageElement>
> {
  if (imageCache) {
    return Promise.resolve(imageCache);
  }

  const cache = new Map<string, HTMLImageElement>();

  imageCache = cache;

  const jobs = STICKERS.map(
    (def) =>
      new Promise<void>((resolve) => {
        const image = new Image();

        image.onload = () => {
          cache.set(def.id, image);
          resolve();
        };

        image.onerror = () => resolve();

        image.src = stickerDataUrl(def);
      })
  );

  return Promise.all(jobs).then(() => cache);
}

export function stickerSize(
  canvasWidth: number,
  scale: number
): number {
  return canvasWidth * STICKER_SIZE_RATIO * scale;
}

/**
 * Top-most sticker under the given canvas-space point, if any.
 */
export function hitTestSticker(
  stickers: StickerInstance[],
  pointX: number,
  pointY: number,
  canvasWidth: number,
  canvasHeight: number
): StickerInstance | null {
  for (let i = stickers.length - 1; i >= 0; i -= 1) {
    const item = stickers[i];

    const dx = pointX - item.x * canvasWidth;
    const dy = pointY - item.y * canvasHeight;

    const cos = Math.cos(-item.rotation);
    const sin = Math.sin(-item.rotation);

    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    const half =
      stickerSize(canvasWidth, item.scale) / 2 + 6;

    if (
      Math.abs(localX) <= half &&
      Math.abs(localY) <= half
    ) {
      return item;
    }
  }

  return null;
}

/**
 * Draw stickers on top of a finished composition. The dashed selection
 * box is only drawn in the on-screen preview, never into the export.
 */
export function drawStickers(
  ctx: CanvasRenderingContext2D,
  stickers: StickerInstance[],
  images: Map<string, HTMLImageElement>,
  canvasWidth: number,
  canvasHeight: number,
  selectedId: string | null
): void {
  const lineWidth = Math.max(2, canvasWidth / 300);

  stickers.forEach((item) => {
    const image = images.get(item.defId);

    if (!image) {
      return;
    }

    const size = stickerSize(
      canvasWidth,
      item.scale
    );

    const px = item.x * canvasWidth;
    const py = item.y * canvasHeight;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(item.rotation);

    ctx.drawImage(
      image,
      -size / 2,
      -size / 2,
      size,
      size
    );

    if (selectedId === item.id) {
      const pad = lineWidth * 3;

      ctx.strokeStyle = "#f64678";
      ctx.lineWidth = lineWidth;
      ctx.setLineDash([10, 8]);

      ctx.strokeRect(
        -size / 2 - pad,
        -size / 2 - pad,
        size + pad * 2,
        size + pad * 2
      );

      ctx.setLineDash([]);
      ctx.fillStyle = "#f64678";

      ctx.beginPath();
      ctx.arc(
        size / 2 + pad,
        size / 2 + pad,
        lineWidth * 4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.restore();
  });
}
