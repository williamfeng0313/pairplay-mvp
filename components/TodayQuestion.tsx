"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  coupleQuestionCategoryLabels,
} from "@/data/coupleQuestions";

import {
  advanceStreak,
  getDailyQuestion,
  localDateKey,
  readStreak,
  writeStreak,
  type DailyStreak,
} from "@/lib/dailyQuestion";

import { trackEvent } from "@/lib/analytics";

export default function TodayQuestion() {
  const [dateKey, setDateKey] = useState("");
  const [streak, setStreak] =
    useState<DailyStreak | null>(null);
  const [copied, setCopied] = useState(false);

  /*
   * 客户端按本地日期取题，
   * 避免服务端构建时被静态化，
   * 也避免时区不同导致 hydration 不一致。
   */
  useEffect(() => {
    const key = localDateKey();

    setDateKey(key);
    setStreak(readStreak());

    trackEvent("daily_question_view", {
      question_date: key,
    });
  }, []);

  const question = useMemo(
    () =>
      dateKey
        ? getDailyQuestion(dateKey)
        : null,
    [dateKey]
  );

  const answeredToday =
    streak?.lastDate === dateKey && Boolean(dateKey);

  const handleMark = useCallback(() => {
    if (!dateKey) {
      return;
    }

    const next = advanceStreak(streak, dateKey);

    setStreak(next);
    writeStreak(next);

    trackEvent("daily_question_marked", {
      streak_count: next.count,
    });
  }, [dateKey, streak]);

  const handleCopy = useCallback(async () => {
    if (!question) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `${question.question}\n\n— Today's question on TwoLumi`
      );

      setCopied(true);

      trackEvent("daily_question_copy", {
        question_id: question.id,
      });

      window.setTimeout(
        () => setCopied(false),
        2400
      );
    } catch {
      setCopied(false);
    }
  }, [question]);

  const prettyDate = useMemo(() => {
    if (!dateKey) {
      return "";
    }

    const [year, month, day] =
      dateKey.split("-").map(Number);

    return new Date(
      year,
      month - 1,
      day,
      12
    ).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, [dateKey]);

  return (
    <section className="today-section" id="today-question">
      <div className="container">
        <div className="today-card">
          {/* ---------- 左侧日期 ---------- */}

          <div className="today-side">
            <div className="game-kicker">
              Today&apos;s question
            </div>

            <div className="today-date">
              {prettyDate || "A new question every day"}
            </div>

            <p>
              One question a day. No scores,
              no timers — just something
              worth talking about tonight.
            </p>

            <div className="today-streak">
              <span>♥</span>

              {streak && streak.count > 0 ? (
                <strong>
                  {streak.count}{" "}
                  {streak.count === 1
                    ? "day"
                    : "days"}{" "}
                  in a row
                </strong>
              ) : (
                <strong>Start a streak</strong>
              )}
            </div>
          </div>

          {/* ---------- 右侧题目 ---------- */}

          <div className="today-main">
            {question ? (
              <>
                <div className="today-category">
                  {
                    coupleQuestionCategoryLabels[
                      question.category
                    ]
                  }
                </div>

                <h2 className="today-question">
                  {question.question}
                </h2>
              </>
            ) : (
              <h2 className="today-question today-loading">
                Loading today&apos;s question…
              </h2>
            )}

            <div className="today-actions">
              <button
                type="button"
                className={
                  answeredToday
                    ? "btn-secondary today-mark-done"
                    : "btn-primary"
                }
                onClick={handleMark}
                disabled={!question || answeredToday}
                style={{
                  opacity:
                    !question || answeredToday
                      ? 0.7
                      : 1,
                  cursor:
                    !question || answeredToday
                      ? "default"
                      : "pointer",
                }}
              >
                {answeredToday
                  ? "♥ Talked about it today"
                  : "We talked about it"}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleCopy}
                disabled={!question}
              >
                {copied
                  ? "Copied ✓"
                  : "Copy question"}
              </button>

              <Link
                href="/couple-questions"
                className="today-more"
              >
                Browse all 100 questions →
              </Link>
            </div>

            <p className="today-note">
              Your streak is saved only in this
              browser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
