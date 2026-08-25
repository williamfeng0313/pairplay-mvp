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
  // 防止服务端执行
  if (typeof window === "undefined") {
    return;
  }

  /*
   * 本地开发环境：
   * 不发送到正式 GA4，
   * 只在 Console 显示事件，
   * 避免 localhost 测试污染真实数据。
   */
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `[Analytics] ${eventName}`,
      params
    );

    return;
  }

  /*
   * Production：
   * 正式发送 GA4 Event。
   *
   * Analytics 即使发生异常，
   * 也绝不能影响游戏本身。
   */
  try {
    sendGAEvent(
      "event",
      eventName,
      params
    );
  } catch {
    // Analytics failure must never break the game.
  }
}