/*
 * ==============================
 * Person Cutout (MediaPipe)
 * ==============================
 *
 * 浏览器本地人像抠图，供 Photo Booth 使用。
 *
 * - 使用 @mediapipe/tasks-vision 的 ImageSegmenter
 *   与官方 selfie_segmenter.tflite（约 244 KB）。
 * - WASM 与模型从公共 CDN 下载一次，之后浏览器缓存。
 * - 照片本身从不上传：推理全部在本机完成。
 * - 库代码 Apache-2.0，模型由 Google 官方 CDN 提供。
 *
 * 之所以不用 @imgly/background-removal：
 * 它是 AGPL-3.0，商用站点需要购买授权。
 */

const WASM_BASE =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.2/wasm";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/1/selfie_segmenter.tflite";

/**
 * 太大的手机照片会拖慢 CPU 推理，
 * 统一缩到这个最长边再送进模型。
 */
const MAX_INPUT_EDGE = 1024;

type ImageSegmenterType =
  import("@mediapipe/tasks-vision").ImageSegmenter;

let segmenterPromise: Promise<ImageSegmenterType> | null =
  null;

/**
 * 懒加载并复用同一个 segmenter。
 * 失败时清空缓存，允许下次重试。
 */
async function getSegmenter(): Promise<ImageSegmenterType> {
  if (!segmenterPromise) {
    segmenterPromise = (async () => {
      const {
        FilesetResolver,
        ImageSegmenter,
      } = await import(
        "@mediapipe/tasks-vision"
      );

      const fileset =
        await FilesetResolver.forVisionTasks(
          WASM_BASE
        );

      return ImageSegmenter.createFromOptions(
        fileset,
        {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            /*
             * CPU 在 Safari / 无 WebGL 的环境也能跑，
             * 244 KB 的模型足够快。
             */
            delegate: "CPU",
          },
          runningMode: "IMAGE",
          outputConfidenceMasks: true,
          outputCategoryMask: false,
        }
      );
    })().catch((error: unknown) => {
      segmenterPromise = null;
      throw error;
    });
  }

  return segmenterPromise;
}

export type CutoutResult = {
  /** 透明背景的人像，尺寸与工作图一致 */
  canvas: HTMLCanvasElement;
  /** 同尺寸的纯白剪影，用于贴纸白描边 */
  outline: HTMLCanvasElement;
  width: number;
  height: number;
};

/**
 * 判断某张置信度图是否是「人像」而不是「背景」。
 *
 * selfie_segmenter 在不同版本里可能输出 1 或 2 个通道，
 * 且通道顺序不保证。人像通常集中在画面中央，
 * 所以用「中心均值 − 四角均值」挑出差别最大的那张：
 * 正数表示前景人像，负数表示背景（需要反转）。
 */
function maskOrientationScore(
  values: Float32Array,
  width: number,
  height: number
): number {
  const cx0 = Math.floor(width * 0.35);
  const cx1 = Math.ceil(width * 0.65);
  const cy0 = Math.floor(height * 0.25);
  const cy1 = Math.ceil(height * 0.75);

  const edge = Math.max(
    1,
    Math.floor(Math.min(width, height) * 0.12)
  );

  let centerSum = 0;
  let centerCount = 0;
  let cornerSum = 0;
  let cornerCount = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const value = values[y * width + x] ?? 0;

      const inCenter =
        x >= cx0 &&
        x < cx1 &&
        y >= cy0 &&
        y < cy1;

      if (inCenter) {
        centerSum += value;
        centerCount += 1;
      }

      const inCorner =
        (x < edge || x >= width - edge) &&
        (y < edge || y >= height - edge);

      if (inCorner) {
        cornerSum += value;
        cornerCount += 1;
      }
    }
  }

  const centerMean =
    centerSum / Math.max(1, centerCount);

  const cornerMean =
    cornerSum / Math.max(1, cornerCount);

  return centerMean - cornerMean;
}

/**
 * 把置信度图转成白色 + alpha 的 canvas。
 */
function buildMaskCanvas(
  values: Float32Array,
  maskWidth: number,
  maskHeight: number,
  invert: boolean
): HTMLCanvasElement {
  const maskCanvas =
    document.createElement("canvas");

  maskCanvas.width = maskWidth;
  maskCanvas.height = maskHeight;

  const ctx = maskCanvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const imageData = ctx.createImageData(
    maskWidth,
    maskHeight
  );

  const { data } = imageData;

  for (let index = 0; index < values.length; index += 1) {
    const raw = values[index] ?? 0;

    const confidence = invert ? 1 - raw : raw;

    /*
     * 轻微收窄低置信度区间，
     * 去掉背景噪点，同时保留柔和的发丝边缘。
     */
    const alpha = Math.max(
      0,
      Math.min(1, (confidence - 0.1) / 0.8)
    );

    const offset = index * 4;

    data[offset] = 255;
    data[offset + 1] = 255;
    data[offset + 2] = 255;
    data[offset + 3] = Math.round(alpha * 255);
  }

  ctx.putImageData(imageData, 0, 0);

  return maskCanvas;
}

/**
 * 主入口：输入原始照片，返回透明人像 + 白色剪影。
 */
export async function createPersonCutout(
  image: HTMLImageElement
): Promise<CutoutResult> {
  if (typeof window === "undefined") {
    throw new Error(
      "Cutout only runs in the browser."
    );
  }

  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;

  if (!naturalWidth || !naturalHeight) {
    throw new Error("Image is not loaded yet.");
  }

  const scale = Math.min(
    1,
    MAX_INPUT_EDGE /
      Math.max(naturalWidth, naturalHeight)
  );

  const width = Math.max(
    1,
    Math.round(naturalWidth * scale)
  );

  const height = Math.max(
    1,
    Math.round(naturalHeight * scale)
  );

  /**
   * 工作图：模型输入与最终输出共用。
   */
  const workCanvas =
    document.createElement("canvas");

  workCanvas.width = width;
  workCanvas.height = height;

  const workCtx = workCanvas.getContext("2d");

  if (!workCtx) {
    throw new Error("Canvas 2D is unavailable.");
  }

  workCtx.drawImage(image, 0, 0, width, height);

  const segmenter = await getSegmenter();

  const result = segmenter.segment(workCanvas);

  const masks = result.confidenceMasks ?? [];

  if (masks.length === 0) {
    throw new Error("No segmentation mask returned.");
  }

  /**
   * 挑出最像「人像」的那张 mask。
   */
  let best: {
    values: Float32Array;
    width: number;
    height: number;
    score: number;
  } | null = null;

  for (const mask of masks) {
    try {
      const values = mask.getAsFloat32Array();
      const maskWidth = mask.width;
      const maskHeight = mask.height;

      if (!maskWidth || !maskHeight) {
        continue;
      }

      const score = maskOrientationScore(
        values,
        maskWidth,
        maskHeight
      );

      if (
        !best ||
        Math.abs(score) > Math.abs(best.score)
      ) {
        best = {
          values,
          width: maskWidth,
          height: maskHeight,
          score,
        };
      }
    } finally {
      /*
       * MediaPipe 的 MPImage 由 C++ 侧持有，
       * 转换后及时释放。
       */
      try {
        mask.close();
      } catch {
        // 某些版本没有 close，忽略即可
      }
    }
  }

  if (!best) {
    throw new Error("Segmentation mask is empty.");
  }

  const maskCanvas = buildMaskCanvas(
    best.values,
    best.width,
    best.height,
    best.score < 0
  );

  /**
   * 透明人像：原图 ⊙ mask。
   */
  const cutout = document.createElement("canvas");

  cutout.width = width;
  cutout.height = height;

  const cutoutCtx = cutout.getContext("2d");

  if (!cutoutCtx) {
    throw new Error("Canvas 2D is unavailable.");
  }

  cutoutCtx.drawImage(workCanvas, 0, 0);

  cutoutCtx.globalCompositeOperation =
    "destination-in";

  cutoutCtx.drawImage(
    maskCanvas,
    0,
    0,
    width,
    height
  );

  cutoutCtx.globalCompositeOperation =
    "source-over";

  /**
   * 白色剪影：把 mask 放大后向八个方向各偏移几像素
   * 叠成「膨胀」的白底。绘制时先画它、再画人像，
   * 边缘就自然露出贴纸式白描边。
   *
   * 在这里预合成，避免每次调整缩放/位置都重画八次。
   */
  const outline = document.createElement("canvas");

  outline.width = width;
  outline.height = height;

  const outlineCtx = outline.getContext("2d");

  if (!outlineCtx) {
    throw new Error("Canvas 2D is unavailable.");
  }

  const radius = 7;

  const offsets: ReadonlyArray<
    readonly [number, number]
  > = [
    [-radius, 0],
    [radius, 0],
    [0, -radius],
    [0, radius],
    [-radius + 2, -radius + 2],
    [radius - 2, -radius + 2],
    [-radius + 2, radius - 2],
    [radius - 2, radius - 2],
  ];

  for (const [offsetX, offsetY] of offsets) {
    outlineCtx.drawImage(
      maskCanvas,
      offsetX,
      offsetY,
      width,
      height
    );
  }

  return {
    canvas: cutout,
    outline,
    width,
    height,
  };
}
