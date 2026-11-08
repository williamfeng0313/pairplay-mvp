/*
 * ==============================
 * Daily Question
 * ==============================
 *
 * 按「本地日期」稳定取一道题：
 * 同一天所有人看到同一题，
 * 第二天自动换，不需要后端或数据库。
 */

import {
  coupleQuestions,
  type CoupleQuestion,
} from "@/data/coupleQuestions";

const STREAK_KEY = "twolumi-daily-question-streak";

export type DailyStreak = {
  lastDate: string;
  count: number;
};

/* ==============================
   Date key
============================== */

export function localDateKey(
  date: Date = new Date()
): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function previousDateKey(
  dateKey: string
): string {
  const [year, month, day] =
    dateKey.split("-").map(Number);

  const date = new Date(year, month - 1, day, 12);

  date.setDate(date.getDate() - 1);

  return localDateKey(date);
}

/* ==============================
   Deterministic pick
============================== */

function hashString(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function getDailyQuestion(
  dateKey: string
): CoupleQuestion {
  const index =
    hashString(dateKey) % coupleQuestions.length;

  return coupleQuestions[index];
}

/* ==============================
   Streak storage
============================== */

export function readStreak(): DailyStreak | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(
      STREAK_KEY
    );

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as DailyStreak;

    if (
      typeof parsed?.lastDate !== "string" ||
      typeof parsed?.count !== "number"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeStreak(
  streak: DailyStreak
): void {
  try {
    window.localStorage.setItem(
      STREAK_KEY,
      JSON.stringify(streak)
    );
  } catch {
    // localStorage 不可用时静默降级
  }
}

/*
 * 点击「聊过了」后的连续天数：
 * - 今天已点过 → 不重复计数
 * - 昨天点过 → 连续天数 +1
 * - 断签 → 从 1 重新开始
 */
export function advanceStreak(
  streak: DailyStreak | null,
  dateKey: string
): DailyStreak {
  if (streak?.lastDate === dateKey) {
    return streak;
  }

  const count =
    streak?.lastDate === previousDateKey(dateKey)
      ? streak.count + 1
      : 1;

  return {
    lastDate: dateKey,
    count,
  };
}
