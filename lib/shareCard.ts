/*
 * ==============================
 * Result Share Card
 * ==============================
 *
 * 把游戏结果画成一张 1080 x 1350 的竖版图，
 * 用来发给伴侣 / 发到社交平台。
 *
 * 纯 Canvas 绘制，不依赖任何第三方库，
 * 图片只在浏览器本地生成，不上传服务器。
 */

export const SHARE_CARD_WIDTH = 1080;
export const SHARE_CARD_HEIGHT = 1350;

export type ShareCardTheme =
  | "pink"
  | "purple"
  | "blue";

export type ShareCardStat = {
  label: string;
  value: string;
};

export type ShareCardData = {
  /* 顶部小标题，例如 COUPLE COMPATIBILITY TEST */
  kicker: string;

  /* 主数字，例如 "92%" 或 "17 / 20" */
  score: string;

  /* 主标题，例如 "Great Match" */
  title: string;

  /* 一句说明 */
  subtitle: string;

  /* 可选表情 */
  emoji?: string;

  /* 最多 3 个数据块 */
  stats?: ShareCardStat[];

  theme?: ShareCardTheme;
};

type ThemeTokens = {
  bg: string;
  accent: string;
  soft: string;
  ink: string;
  muted: string;
};

const THEMES: Record<
  ShareCardTheme,
  ThemeTokens
> = {
  pink: {
    bg: "#fff8fa",
    accent: "#f64678",
    soft: "#ffe8ef",
    ink: "#2b1d24",
    muted: "#8a7680",
  },

  purple: {
    bg: "#faf8ff",
    accent: "#7658e8",
    soft: "#eee9ff",
    ink: "#241f33",
    muted: "#7b7590",
  },

  blue: {
    bg: "#f7fbff",
    accent: "#3f83f8",
    soft: "#e9f2ff",
    ink: "#1b2733",
    muted: "#6b7885",
  },
};

const FONT_STACK =
  'Inter, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif';

const EMOJI_STACK =
  '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", system-ui, sans-serif';

/* ==============================
   Public API
============================== */

export function drawShareCard(
  canvas: HTMLCanvasElement,
  data: ShareCardData
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const width = SHARE_CARD_WIDTH;
  const height = SHARE_CARD_HEIGHT;

  const theme =
    THEMES[data.theme ?? "pink"] ?? THEMES.pink;

  /*
   * 设置 canvas 真实像素尺寸，
   * CSS 只负责缩放显示。
   */
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  /* ---------- 背景 ---------- */

  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, width, height);

  drawDecorations(ctx, theme, width, height);

  /* ---------- 顶部品牌 ---------- */

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.globalAlpha = 0.65;
  ctx.fillStyle = theme.accent;
  ctx.font = `600 26px ${FONT_STACK}`;
  ctx.fillText("T W O L U M I", width / 2, 104);
  ctx.globalAlpha = 1;

  /* ---------- 小标题 ---------- */

  ctx.fillStyle = theme.muted;
  ctx.font = `600 26px ${FONT_STACK}`;
  ctx.fillText(
    data.kicker.toUpperCase(),
    width / 2,
    172
  );

  /* ---------- 主数字 ---------- */

  const scoreFont = fitFontSize(
    ctx,
    data.score,
    250,
    90,
    880,
    (size) => `700 ${size}px ${FONT_STACK}`
  );

  ctx.fillStyle = theme.accent;
  ctx.font = `700 ${scoreFont}px ${FONT_STACK}`;
  ctx.fillText(data.score, width / 2, 372);

  /* ---------- 表情 ---------- */

  if (data.emoji) {
    ctx.font = `96px ${EMOJI_STACK}`;
    ctx.fillText(data.emoji, width / 2, 540);
  }

  /* ---------- 主标题 ---------- */

  const titleFont = fitFontSize(
    ctx,
    data.title,
    62,
    34,
    900,
    (size) => `700 ${size}px ${FONT_STACK}`
  );

  ctx.fillStyle = theme.ink;
  ctx.font = `700 ${titleFont}px ${FONT_STACK}`;
  ctx.fillText(data.title, width / 2, 642);

  /* ---------- 说明文字 ---------- */

  ctx.fillStyle = theme.muted;
  ctx.font = `400 28px ${FONT_STACK}`;

  const subtitleLines = wrapText(
    ctx,
    data.subtitle,
    820,
    3
  );

  subtitleLines.forEach((line, index) => {
    ctx.fillText(
      line,
      width / 2,
      700 + index * 42
    );
  });

  /* ---------- 数据块 ---------- */

  if (data.stats?.length) {
    drawStats(
      ctx,
      theme,
      data.stats.slice(0, 3),
      width
    );
  }

  /* ---------- 页脚 ---------- */

  ctx.strokeStyle = theme.soft;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(150, 1110);
  ctx.lineTo(width - 150, 1110);
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  ctx.font = `600 34px ${FONT_STACK}`;
  ctx.fillText("twolumi.com", width / 2, 1178);

  ctx.fillStyle = theme.muted;
  ctx.font = `400 24px ${FONT_STACK}`;
  ctx.fillText(
    "Free couple games · no signup required",
    width / 2,
    1236
  );
}

/* ==============================
   Drawing helpers
============================== */

function drawDecorations(
  ctx: CanvasRenderingContext2D,
  theme: ThemeTokens,
  width: number,
  height: number
) {
  ctx.save();

  ctx.fillStyle = theme.accent;

  ctx.globalAlpha = 0.1;
  circle(ctx, width - 70, 130, 200);

  ctx.globalAlpha = 0.07;
  circle(ctx, 40, 520, 150);

  ctx.globalAlpha = 0.06;
  circle(ctx, width - 120, height - 120, 180);

  ctx.restore();
}

function drawStats(
  ctx: CanvasRenderingContext2D,
  theme: ThemeTokens,
  stats: ShareCardStat[],
  width: number
) {
  const gap = 20;
  const totalWidth = 860;
  const cardWidth =
    (totalWidth - gap * (stats.length - 1)) / stats.length;

  const startX = (width - totalWidth) / 2;
  const top = 860;
  const cardHeight = 132;

  stats.forEach((stat, index) => {
    const x = startX + index * (cardWidth + gap);

    ctx.fillStyle = theme.soft;
    roundedRect(ctx, x, top, cardWidth, cardHeight, 24);
    ctx.fill();

    ctx.textAlign = "center";

    ctx.fillStyle = theme.ink;
    ctx.font = `700 38px ${FONT_STACK}`;
    ctx.fillText(
      stat.value,
      x + cardWidth / 2,
      top + 58,
      cardWidth - 32
    );

    ctx.fillStyle = theme.muted;
    ctx.font = `400 20px ${FONT_STACK}`;
    ctx.fillText(
      stat.label,
      x + cardWidth / 2,
      top + 100,
      cardWidth - 28
    );
  });
}

/*
 * 从最大字号开始缩小，直到文字塞进 maxWidth。
 */
function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  startSize: number,
  minSize: number,
  maxWidth: number,
  fontOf: (size: number) => string
) {
  let size = startSize;

  ctx.font = fontOf(size);

  while (
    size > minSize &&
    ctx.measureText(text).width > maxWidth
  ) {
    size -= 4;
    ctx.font = fontOf(size);
  }

  return size;
}

/*
 * 按单词换行，最多 maxLines 行，超出加省略号。
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
) {
  const words = text.split(/\s+/).filter(Boolean);

  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (
      ctx.measureText(next).width > maxWidth &&
      current
    ) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (lines.length <= maxLines) {
    return lines;
  }

  const visible = lines.slice(0, maxLines);
  const last = visible[maxLines - 1];

  visible[maxLines - 1] = `${last.replace(/[.,;:]$/, "")}…`;

  return visible;
}

function circle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

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

  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + safeRadius
  );
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height
  );
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - safeRadius
  );
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);

  ctx.closePath();
}
