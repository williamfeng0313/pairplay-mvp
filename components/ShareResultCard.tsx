"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  drawShareCard,
  SHARE_CARD_HEIGHT,
  SHARE_CARD_WIDTH,
  type ShareCardData,
} from "@/lib/shareCard";

import { trackEvent } from "@/lib/analytics";

type ShareResultCardProps = {
  data: ShareCardData;

  /* 用于统计和文件名，例如 "couple-compatibility" */
  gameSlug: string;

  /* 分享时附带的文案 */
  shareText?: string;
};

export default function ShareResultCard({
  data,
  gameSlug,
  shareText,
}: ShareResultCardProps) {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const blobRef = useRef<Blob | null>(null);

  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");

  const [pageUrl, setPageUrl] = useState(
    "https://twolumi.com"
  );

  /*
   * 序列化数据，避免父组件每次渲染
   * 都生成新对象导致重复重绘。
   */
  const dataKey = useMemo(
    () => JSON.stringify(data),
    [data]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  /*
   * 挂载即渲染预览，并预先导出 PNG。
   *
   * 预先生成 blob 的原因是：
   * iOS Safari 要求 navigator.share() 在
   * 用户手势的同一轮事件里触发，
   * 点击时才临时截图会被拦截。
   */
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    drawShareCard(canvas, data);

    setReady(false);
    blobRef.current = null;

    canvas.toBlob(
      (blob) => {
        blobRef.current = blob;
        setReady(Boolean(blob));
      },
      "image/png"
    );
  }, [dataKey, data]);

  const fileName = `${gameSlug}-twolumi.png`;

  const handleDownload = useCallback(() => {
    const blob = blobRef.current;

    if (!blob) {
      setStatus(
        "Image is still rendering. Try again in a second."
      );

      return;
    }

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setStatus("Saved. Send it to your partner.");

    trackEvent("share_card_save", {
      game: gameSlug,
      method: "download",
    });
  }, [fileName, gameSlug]);

  const handleShare = useCallback(async () => {
    const blob = blobRef.current;

    if (!blob) {
      setStatus(
        "Image is still rendering. Try again in a second."
      );

      return;
    }

    const text =
      shareText ??
      "Our TwoLumi result — play together and compare yours.";

    const file = new File([blob], fileName, {
      type: "image/png",
    });

    const canShareFiles =
      typeof navigator !== "undefined" &&
      typeof navigator.canShare === "function" &&
      typeof navigator.share === "function" &&
      navigator.canShare({ files: [file] });

    if (canShareFiles) {
      try {
        await navigator.share({
          files: [file],
          title: "TwoLumi",
          text,
        });

        setStatus("Shared.");

        trackEvent("share_card_share", {
          game: gameSlug,
          method: "native",
        });

        return;
      } catch (error) {
        /*
         * 用户主动取消时不要回退到下载。
         */
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }
      }
    }

    /*
     * 桌面浏览器多数不支持文件分享，
     * 退化为直接下载图片。
     */
    handleDownload();
  }, [fileName, gameSlug, handleDownload, shareText]);

  const handleCopyLink = useCallback(async () => {
    const text = `${shareText ?? "Play this with me on TwoLumi"} ${pageUrl}`;

    try {
      await navigator.clipboard.writeText(text);

      setStatus("Link copied.");

      trackEvent("share_card_share", {
        game: gameSlug,
        method: "copy_link",
      });
    } catch {
      setStatus("Could not copy. Long-press to copy instead.");
    }
  }, [gameSlug, pageUrl, shareText]);

  return (
    <section className="share-result">
      <div className="share-result-head">
        <div className="game-kicker">
          Share Your Result
        </div>

        <h3>
          Turn this into a card
        </h3>

        <p>
          Save the image and send it to your
          partner, or post it. Nothing is
          uploaded — the card is drawn in your
          browser.
        </p>
      </div>

      <div className="share-result-body">
        <canvas
          ref={canvasRef}
          className="share-result-canvas"
          width={SHARE_CARD_WIDTH}
          height={SHARE_CARD_HEIGHT}
          role="img"
          aria-label="Preview of your shareable result card"
        />

        <div className="share-result-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleShare}
            disabled={!ready}
            style={{
              opacity: ready ? 1 : 0.55,
              cursor: ready
                ? "pointer"
                : "not-allowed",
            }}
          >
            Share card
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleDownload}
            disabled={!ready}
            style={{
              opacity: ready ? 1 : 0.55,
              cursor: ready
                ? "pointer"
                : "not-allowed",
            }}
          >
            Save image
          </button>

          <button
            type="button"
            className="share-result-link"
            onClick={handleCopyLink}
          >
            Copy link instead
          </button>

          <p className="share-result-status">
            {status ||
              "1080 × 1350 PNG · perfect for stories"}
          </p>
        </div>
      </div>
    </section>
  );
}
