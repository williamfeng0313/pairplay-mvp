"use client";

import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  calculateTogetherStats,
  formatLongDate,
  formatNumber,
  parseLocalDate,
  toDateInputValue,
  todayLocal,
  type TogetherStats,
} from "@/lib/daysTogether";

import { trackEvent } from "@/lib/analytics";

import ShareResultCard from "@/components/ShareResultCard";

const STORAGE_KEY = "twolumi-days-together-start";

export default function DaysTogetherCalculator() {
  const [dateValue, setDateValue] = useState("");
  const [today, setToday] = useState<Date | null>(null);
  const [error, setError] = useState("");

  /*
   * 日期与统计都放在客户端计算，
   * 避免服务端 / 客户端时区不同导致
   * hydration 不一致。
   */
  useEffect(() => {
    const localToday = todayLocal();

    setToday(localToday);

    try {
      const saved = window.localStorage.getItem(
        STORAGE_KEY
      );

      if (saved && parseLocalDate(saved)) {
        setDateValue(saved);
      }
    } catch {
      // localStorage 不可用时静默降级
    }
  }, []);

  const startDate = useMemo(
    () => parseLocalDate(dateValue),
    [dateValue]
  );

  const stats = useMemo<TogetherStats | null>(() => {
    if (
      !startDate ||
      !today ||
      startDate.getTime() > today.getTime()
    ) {
      return null;
    }

    return calculateTogetherStats(startDate, today);
  }, [startDate, today]);

  const handleDateChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setDateValue(value);
    setError("");

    const parsed = parseLocalDate(value);
    const localToday = todayLocal();

    if (!parsed) {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }

      return;
    }

    if (parsed.getTime() > localToday.getTime()) {
      setError(
        "Pick a date in the past — your story starts there."
      );

      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }

    trackEvent("days_together_set", {
      source: "date_input",
    });
  };

  const handleReset = () => {
    setDateValue("");
    setError("");

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const maxDate = today
    ? toDateInputValue(today)
    : undefined;

  /* ---------- 里程碑进度 ---------- */

  const previousMilestoneDay = stats
    ? [
        0,
        ...stats.milestones
          .filter((item) => item.reached)
          .map((item) => item.day),
      ].slice(-1)[0]
    : 0;

  const progress = stats?.nextMilestone
    ? Math.min(
        100,
        Math.max(
          0,
          ((stats.days - previousMilestoneDay) /
            (stats.nextMilestone.day -
              previousMilestoneDay)) *
            100
        )
      )
    : 100;

  const shareData = stats
    ? {
        kicker: "Days Together",
        score: formatNumber(stats.days),
        title: "days as us",
        subtitle: `Together since ${formatLongDate(
          startDate!
        )}. Here's to all the days still to come.`,
        emoji: "💕",
        theme: "pink" as const,
        stats: [
          {
            label: "Weeks",
            value: formatNumber(stats.weeks),
          },
          {
            label: "Next anniversary",
            value: `in ${stats.daysUntilAnniversary}d`,
          },
          {
            label: "Next milestone",
            value: stats.nextMilestone
              ? `${stats.nextMilestone.day}d`
              : "all done",
          },
        ],
      }
    : null;

  return (
    <div className="days-calculator">
      {/* ==============================
          Date Input
      ============================== */}

      <div className="days-input-card">
        <label htmlFor="days-start-date">
          When did you two get together?
        </label>

        <p>
          Your date stays in this browser. Nothing
          is uploaded or shared.
        </p>

        <div className="days-input-row">
          <input
            id="days-start-date"
            type="date"
            value={dateValue}
            max={maxDate}
            onChange={handleDateChange}
            className="days-date-input"
          />

          {dateValue && (
            <button
              type="button"
              className="days-reset"
              onClick={handleReset}
            >
              Clear
            </button>
          )}
        </div>

        {error && (
          <p className="days-error">{error}</p>
        )}
      </div>

      {/* ==============================
          Empty State
      ============================== */}

      {!stats && (
        <div className="days-empty">
          <span>💗</span>

          <h2>Every day counts</h2>

          <p>
            Pick your date above and we&apos;ll
            count the days, find your next
            anniversary, and show the
            milestones worth celebrating.
          </p>
        </div>
      )}

      {/* ==============================
          Results
      ============================== */}

      {stats && startDate && (
        <>
          <div className="days-hero">
            <div className="game-kicker">
              You&apos;ve been together for
            </div>

            <div className="days-big-number">
              {formatNumber(stats.days)}
            </div>

            <h2>
              {stats.days === 1
                ? "day"
                : "days"}{" "}
              as us
            </h2>

            <p>
              Since {formatLongDate(startDate)}
            </p>
          </div>

          <div className="days-stat-grid">
            <div className="days-stat">
              <strong>
                {formatNumber(stats.weeks)}
              </strong>
              <span>Weeks</span>
            </div>

            <div className="days-stat">
              <strong>
                {formatNumber(stats.months)}
              </strong>
              <span>Months</span>
            </div>

            <div className="days-stat">
              <strong>
                {formatNumber(stats.years)}
              </strong>
              <span>Years</span>
            </div>
          </div>

          {/* ---------- 倒计时 ---------- */}

          <div className="days-countdown-grid">
            <div className="days-countdown">
              <div className="game-kicker">
                Next anniversary
              </div>

              <strong>
                {formatNumber(
                  stats.daysUntilAnniversary
                )}
              </strong>

              <span>days to go</span>

              <p>
                {stats.anniversaryNumber === 1
                  ? "1st"
                  : stats.anniversaryNumber === 2
                    ? "2nd"
                    : stats.anniversaryNumber === 3
                      ? "3rd"
                      : `${stats.anniversaryNumber}th`}{" "}
                anniversary ·{" "}
                {formatLongDate(
                  stats.nextAnniversary
                )}
              </p>
            </div>

            <div className="days-countdown">
              <div className="game-kicker">
                Next milestone
              </div>

              <strong>
                {stats.nextMilestone
                  ? formatNumber(
                      stats.nextMilestone.daysUntil
                    )
                  : "∞"}
              </strong>

              <span>days to go</span>

              <p>
                {stats.nextMilestone
                  ? `${formatNumber(
                      stats.nextMilestone.day
                    )} days · ${formatLongDate(
                      stats.nextMilestone.date
                    )}`
                  : "You've passed every milestone here."}
              </p>

              <div className="days-progress-track">
                <div
                  className="days-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* ---------- 里程碑 ---------- */}

          <div className="days-milestones">
            <div className="game-kicker">
              Milestones
            </div>

            <h3>
              Little reasons to celebrate
            </h3>

            <div className="days-milestone-list">
              {stats.milestones.map(
                (milestone) => (
                  <div
                    key={milestone.day}
                    className={`days-milestone ${
                      milestone.reached
                        ? "reached"
                        : ""
                    }`}
                    title={formatLongDate(
                      milestone.date
                    )}
                  >
                    <span>
                      {milestone.reached
                        ? "♥"
                        : "♡"}
                    </span>

                    <strong>
                      {formatNumber(
                        milestone.day
                      )}
                    </strong>

                    <small>days</small>
                  </div>
                )
              )}
            </div>

            <p className="days-milestone-note">
              {stats.reachedCount} of{" "}
              {stats.milestones.length}{" "}
              milestones reached.
            </p>
          </div>

          {/* ---------- 分享卡 ---------- */}

          {shareData && (
            <ShareResultCard
              gameSlug="days-together"
              shareText={`We've been together ${formatNumber(
                stats.days
              )} days 💕`}
              data={shareData}
            />
          )}
        </>
      )}
    </div>
  );
}
