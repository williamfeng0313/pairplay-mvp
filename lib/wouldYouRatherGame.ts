import {
    wouldYouRatherBank,
    type WouldYouRatherQuestion,
  } from "@/data/wouldYouRatherBank";
  
  /*
   * 每个 Room 一局固定玩 12 题
   */
  export const WOULD_YOU_RATHER_ROUND_LIMIT = 12;
  
  /*
   * 把 Room Code 转成固定数字 Seed
   */
  function hashString(value: string): number {
    let hash = 2166136261;
  
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
  
      hash = Math.imul(
        hash,
        16777619
      );
    }
  
    return hash >>> 0;
  }
  
  /*
   * Seeded pseudo-random generator
   *
   * 相同 Seed 会产生相同随机序列。
   * 这里只用于游戏抽题，不用于安全/加密。
   */
  function seededRandom(seed: number) {
    let state = seed >>> 0;
  
    return function random(): number {
      state += 0x6d2b79f5;
  
      let t = state;
  
      t = Math.imul(
        t ^ (t >>> 15),
        t | 1
      );
  
      t ^=
        t +
        Math.imul(
          t ^ (t >>> 7),
          t | 61
        );
  
      return (
        (
          t ^
          (t >>> 14)
        ) >>>
        0
      ) / 4294967296;
    };
  }
  
  /*
   * 根据 Room Code 生成固定的随机题目顺序。
   *
   * 同一个 Room：
   * Host 和 Guest 得到完全相同的 12 道题。
   *
   * 不同 Room：
   * 得到不同随机组合。
   */
  export function getWouldYouRatherQuestionsForRoom(
    roomCode: string
  ): WouldYouRatherQuestion[] {
    const normalizedCode =
      roomCode
        .trim()
        .toUpperCase();
  
    const seed =
      hashString(
        normalizedCode
      );
  
    const random =
      seededRandom(seed);
  
    const questions:
      WouldYouRatherQuestion[] = [
        ...wouldYouRatherBank,
      ];
  
    /*
     * Fisher-Yates Shuffle
     */
    for (
      let i = questions.length - 1;
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
  
    /*
     * 每局只取前 12 题
     */
    return questions.slice(
      0,
      WOULD_YOU_RATHER_ROUND_LIMIT
    );
  }