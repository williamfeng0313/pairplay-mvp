/*
 * ==============================
 * Days Together
 * ==============================
 *
 * 纯前端日期计算：不请求服务器、不存数据库。
 * 所有日期都固定在当地时间的正午 12:00，
 * 避免夏令时切换导致天数差一。
 */

const DAY_MS = 24 * 60 * 60 * 1000;

export const MILESTONE_DAYS = [
  100, 200, 365, 500, 520, 1000, 1500, 2000, 3000, 5000, 10000,
] as const;

export type Milestone = {
  day: number;
  date: Date;
  reached: boolean;
  daysUntil: number;
};

export type TogetherStats = {
  /* 第 N 天：在一起当天算第 1 天 */
  days: number;

  /* 从那天到今天经过的整天数 */
  elapsedDays: number;

  weeks: number;
  months: number;
  years: number;

  nextAnniversary: Date;
  daysUntilAnniversary: number;
  anniversaryNumber: number;

  milestones: Milestone[];
  nextMilestone: Milestone | null;
  reachedCount: number;
};

/* ==============================
   Date helpers
============================== */

export function parseLocalDate(
  value: string
): Date | null {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(
    year,
    month - 1,
    day,
    12,
    0,
    0,
    0
  );

  /*
   * 拒绝 2024-02-31 这类
   * 被 JS 自动进位的非法日期。
   */
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function todayLocal(): Date {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    12,
    0,
    0,
    0
  );
}

export function toDateInputValue(
  date: Date
): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatLongDate(
  date: Date
): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatNumber(
  value: number
): string {
  return value.toLocaleString("en-US");
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);

  copy.setDate(copy.getDate() + days);

  return copy;
}

function isLeapYear(year: number): boolean {
  return (
    (year % 4 === 0 && year % 100 !== 0) ||
    year % 400 === 0
  );
}

/*
 * 2 月 29 日开始的纪念日，
 * 平年落在 2 月 28 日。
 */
function anniversaryInYear(
  start: Date,
  year: number
): Date {
  const month = start.getMonth();
  const day = start.getDate();

  if (month === 1 && day === 29 && !isLeapYear(year)) {
    return new Date(year, 1, 28, 12, 0, 0, 0);
  }

  return new Date(year, month, day, 12, 0, 0, 0);
}

function wholeMonthsBetween(
  start: Date,
  today: Date
): number {
  let months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());

  if (today.getDate() < start.getDate()) {
    months -= 1;
  }

  return Math.max(0, months);
}

/* ==============================
   Main calculation
============================== */

export function calculateTogetherStats(
  start: Date,
  today: Date = todayLocal()
): TogetherStats {
  const elapsedDays = Math.max(
    0,
    Math.round(
      (today.getTime() - start.getTime()) / DAY_MS
    )
  );

  const days = elapsedDays + 1;

  /* ---------- 纪念日 ---------- */

  let anniversaryYear = start.getFullYear() + 1;
  let nextAnniversary = anniversaryInYear(
    start,
    anniversaryYear
  );

  /*
   * 理论上 +1 年一定在未来，
   * 这里留个循环兜住极端的日期情况。
   */
  while (nextAnniversary.getTime() < today.getTime()) {
    anniversaryYear += 1;

    nextAnniversary = anniversaryInYear(
      start,
      anniversaryYear
    );
  }

  const daysUntilAnniversary = Math.max(
    0,
    Math.round(
      (nextAnniversary.getTime() - today.getTime()) /
        DAY_MS
    )
  );

  /* ---------- 里程碑 ---------- */

  const milestones: Milestone[] =
    MILESTONE_DAYS.map((day) => {
      const reached = days >= day;

      return {
        day,
        date: addDays(start, day - 1),
        reached,
        daysUntil: Math.max(0, day - days),
      };
    });

  const nextMilestone =
    milestones.find(
      (milestone) => !milestone.reached
    ) ?? null;

  const months = wholeMonthsBetween(start, today);

  return {
    days,
    elapsedDays,
    weeks: Math.floor(elapsedDays / 7),
    months,
    years: Math.floor(months / 12),
    nextAnniversary,
    daysUntilAnniversary,
    anniversaryNumber:
      anniversaryYear - start.getFullYear(),
    milestones,
    nextMilestone,
    reachedCount: milestones.filter(
      (milestone) => milestone.reached
    ).length,
  };
}
