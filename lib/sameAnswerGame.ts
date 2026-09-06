import {
    sameAnswerBank,
    type SameAnswerQuestion,
  } from "@/data/sameAnswerBank";
  
  export const SAME_ANSWER_ROUND_LIMIT =
    12;
  
  function hashString(
    value: string
  ): number {
    let hash =
      2166136261;
  
    for (
      let i = 0;
      i < value.length;
      i++
    ) {
      hash ^=
        value.charCodeAt(i);
  
      hash =
        Math.imul(
          hash,
          16777619
        );
    }
  
    return hash >>> 0;
  }
  
  function seededRandom(
    seed: number
  ) {
    let state =
      seed >>> 0;
  
    return function random():
      number {
      state +=
        0x6d2b79f5;
  
      let t =
        state;
  
      t =
        Math.imul(
          t ^
            (t >>> 15),
          t | 1
        );
  
      t ^=
        t +
        Math.imul(
          t ^
            (t >>> 7),
          t | 61
        );
  
      return (
        (
          t ^
          (t >>> 14)
        ) >>>
        0
      ) /
        4294967296;
    };
  }
  
  export function getSameAnswerQuestionsForRoom(
    roomCode: string
  ): SameAnswerQuestion[] {
    const normalizedCode =
      roomCode
        .trim()
        .toUpperCase();
  
    /*
     * 加 game-specific salt，
     * 避免不同游戏复用相同随机序列。
     */
    const seed =
      hashString(
        `${normalizedCode}:same-answer:v1`
      );
  
    const random =
      seededRandom(seed);
  
    const questions:
      SameAnswerQuestion[] = [
        ...sameAnswerBank,
      ];
  
    for (
      let i =
        questions.length - 1;
      i > 0;
      i--
    ) {
      const j =
        Math.floor(
          random() *
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
      SAME_ANSWER_ROUND_LIMIT
    );
  }