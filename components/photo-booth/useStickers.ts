"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import { trackEvent } from "@/lib/analytics";

import {
  getStickerImages,
  hitTestSticker,
  preloadStickerImages,
  type StickerInstance,
} from "@/lib/stickers";

type UseStickersArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  canvasWidth: number;
  canvasHeight: number;
  eventName: string;
};

type DragState = {
  id: string;
  offsetX: number;
  offsetY: number;
} | null;

export type StickerController = ReturnType<
  typeof useStickers
>;

/**
 * Owns the sticker list plus pointer-based drag interaction.
 *
 * Handles are deliberately driven from a side panel instead of
 * canvas-drawn controls: it keeps hit testing to a single rotated
 * bounding box and works identically with mouse, pen and touch.
 */
export function useStickers({
  canvasRef,
  canvasWidth,
  canvasHeight,
  eventName,
}: UseStickersArgs) {
  const [stickers, setStickers] = useState<
    StickerInstance[]
  >([]);

  const [selectedId, setSelectedId] = useState<
    string | null
  >(null);

  const [images, setImages] = useState<
    Map<string, HTMLImageElement>
  >(getStickerImages);

  /** Always-current list for synchronous pointer handlers. */
  const stickersRef = useRef(stickers);
  stickersRef.current = stickers;

  const dragRef = useRef<DragState>(null);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;

    preloadStickerImages().then((cache) => {
      if (aliveRef.current) {
        setImages(new Map(cache));
      }
    });

    return () => {
      aliveRef.current = false;
    };
  }, []);

  const toCanvasPoint = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return null;
      }

      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return null;
      }

      return {
        x:
          (event.clientX - rect.left) *
          (canvasWidth / rect.width),
        y:
          (event.clientY - rect.top) *
          (canvasHeight / rect.height),
      };
    },
    [canvasRef, canvasWidth, canvasHeight]
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      const point = toCanvasPoint(event);

      if (!point) {
        return;
      }

      const hit = hitTestSticker(
        stickersRef.current,
        point.x,
        point.y,
        canvasWidth,
        canvasHeight
      );

      if (!hit) {
        setSelectedId(null);
        return;
      }

      setSelectedId(hit.id);

      dragRef.current = {
        id: hit.id,
        offsetX: point.x - hit.x * canvasWidth,
        offsetY: point.y - hit.y * canvasHeight,
      };

      /** Bring the grabbed sticker to the front. */
      setStickers((previous) => {
        const target = previous.find(
          (item) => item.id === hit.id
        );

        return target
          ? [
              ...previous.filter(
                (item) => item.id !== hit.id
              ),
              target,
            ]
          : previous;
      });

      try {
        event.currentTarget.setPointerCapture(
          event.pointerId
        );
      } catch {
        /* Pointer capture is a progressive enhancement. */
      }

      event.preventDefault();
    },
    [toCanvasPoint, canvasWidth, canvasHeight]
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      const drag = dragRef.current;

      if (!drag) {
        return;
      }

      const point = toCanvasPoint(event);

      if (!point) {
        return;
      }

      const x = Math.min(
        1,
        Math.max(
          0,
          (point.x - drag.offsetX) / canvasWidth
        )
      );

      const y = Math.min(
        1,
        Math.max(
          0,
          (point.y - drag.offsetY) / canvasHeight
        )
      );

      setStickers((previous) =>
        previous.map((item) =>
          item.id === drag.id
            ? { ...item, x, y }
            : item
        )
      );
    },
    [toCanvasPoint, canvasWidth, canvasHeight]
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>) => {
      dragRef.current = null;

      try {
        event.currentTarget.releasePointerCapture(
          event.pointerId
        );
      } catch {
        /* Not captured, nothing to release. */
      }
    },
    []
  );

  const addSticker = useCallback(
    (defId: string) => {
      const count = stickersRef.current.length;
      const jitter = ((count % 5) - 2) * 0.035;

      const item: StickerInstance = {
        id: `${defId}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 7)}`,
        defId,
        x: 0.5 + jitter,
        y: 0.46 + jitter,
        scale: 1,
        rotation: 0,
      };

      setStickers((previous) => [
        ...previous,
        item,
      ]);

      setSelectedId(item.id);

      trackEvent(eventName, {
        action: "add",
        sticker: defId,
      });
    },
    [eventName]
  );

  const updateSticker = useCallback(
    (
      id: string,
      patch: Partial<
        Pick<
          StickerInstance,
          "scale" | "rotation"
        >
      >
    ) => {
      setStickers((previous) =>
        previous.map((item) =>
          item.id === id
            ? { ...item, ...patch }
            : item
        )
      );
    },
    []
  );

  const removeSticker = useCallback(
    (id: string) => {
      setStickers((previous) =>
        previous.filter((item) => item.id !== id)
      );

      setSelectedId((current) =>
        current === id ? null : current
      );

      trackEvent(eventName, {
        action: "remove",
      });
    },
    [eventName]
  );

  const clearStickers = useCallback(() => {
    setStickers([]);
    setSelectedId(null);

    trackEvent(eventName, {
      action: "clear",
    });
  }, [eventName]);

  return {
    stickers,
    images,
    selectedId,
    setSelectedId,
    addSticker,
    updateSticker,
    removeSticker,
    clearStickers,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
