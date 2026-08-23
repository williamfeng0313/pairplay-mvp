"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventParams = Record<
  string,
  string | number | boolean
>;

export function trackEvent(
  eventName: string,
  params: EventParams = {}
) {
  if (typeof window === "undefined") return;

  try {
    sendGAEvent(
      "event",
      eventName,
      params
    );
  } catch {
    // Analytics 失败绝不能影响游戏
  }
}