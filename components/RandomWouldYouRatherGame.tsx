"use client";

import {
  useEffect,
  useState,
} from "react";

import ChoiceGame from "@/components/ChoiceGame";

import {
  wouldYouRatherBank,
  type WouldYouRatherQuestion,
} from "@/data/wouldYouRatherBank";

import {
  trackEvent,
} from "@/lib/analytics";

/*
 * 单人 / 同设备模式
 * 每次随机抽 16 题
 */
const SOLO_QUESTION_COUNT = 16;

/*
 * Fisher-Yates shuffle
 */
function createRandomQuestions():
  WouldYouRatherQuestion[] {
  const questions = [
    ...wouldYouRatherBank,
  ];

  for (
    let i =
      questions.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() *
          (i + 1)
      );

    [
      questions[i],
      questions[j],
    ] = [
      questions[j],
      questions[i],
    ];
  }

  return questions.slice(
    0,
    SOLO_QUESTION_COUNT
  );
}

export default function RandomWouldYouRatherGame() {
  /*
   * SSR时先使用前16题，
   * 浏览器加载后立即随机一次。
   *
   * 这样不会发生 hydration error。
   */
  const [
    gameSession,
    setGameSession,
  ] =
    useState<{
      key: number;
      questions:
        WouldYouRatherQuestion[];
    }>({
      key: 0,

      questions:
        wouldYouRatherBank.slice(
          0,
          SOLO_QUESTION_COUNT
        ),
    });

  /*
   * 页面第一次打开
   * 随机生成一组题
   */
  useEffect(() => {
    setGameSession({
      key: Date.now(),

      questions:
        createRandomQuestions(),
    });

    trackEvent(
      "wyr_solo_start",
      {
        question_count:
          SOLO_QUESTION_COUNT,
      }
    );
  }, []);

  /*
   * 用户重新抽一组
   */
  const shuffleAgain = () => {
    setGameSession(
      (previous) => ({
        key:
          previous.key + 1,

        questions:
          createRandomQuestions(),
      })
    );

    trackEvent(
      "wyr_solo_shuffle",
      {
        question_count:
          SOLO_QUESTION_COUNT,
      }
    );

    /*
     * 换题以后，
     * 轻微滚回游戏顶部附近。
     */
    window.setTimeout(
      () => {
        document
          .getElementById(
            "solo-wyr-game"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "start",
          });
      },
      50
    );
  };

  return (
    <section
      id="solo-wyr-game"
      className="solo-wyr-section"
    >
      <div className="solo-wyr-heading">

        <div className="game-kicker">
          Play on One Device
        </div>

        <h2>
          Play 16 Random Would You Rather Questions
        </h2>

        <p>
          TwoLumi randomly selects
          16 questions from our
          60-question couples question
          bank every time you play.
          Take turns choosing, compare
          your answers, and shuffle a
          new set whenever you want.
        </p>

      </div>

      <ChoiceGame
        key={gameSession.key}
        questions={
          gameSession.questions
        }
      />

      <div className="solo-game-toolbar">

        <div>
          <strong>
            Want another set?
          </strong>

          <span>
            Shuffle 16 different
            questions from the full
            question bank.
          </span>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={
            shuffleAgain
          }
        >
          ↻ Shuffle Questions
        </button>

      </div>
    </section>
  );
}