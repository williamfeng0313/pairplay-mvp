import {
  couplePuzzleQuestions,
  type CouplePuzzle,
} from "@/data/couplePuzzleQuestions";


function hashString(
  value: string
) {
  let hash =
    2166136261;

  for (
    let index = 0;
    index <
      value.length;
    index++
  ) {
    hash ^=
      value.charCodeAt(
        index
      );

    hash =
      Math.imul(
        hash,
        16777619
      );
  }

  return hash >>> 0;
}


function mulberry32(
  seed: number
) {
  let current =
    seed >>> 0;

  return () => {
    current +=
      0x6d2b79f5;

    let result =
      current;

    result =
      Math.imul(
        result ^
          (result >>> 15),
        result | 1
      );

    result ^=
      result +
      Math.imul(
        result ^
          (result >>> 7),
        result | 61
      );

    return (
      (
        result ^
        (result >>> 14)
      ) >>> 0
    ) /
      4294967296;
  };
}


function seededShuffle<T>(
  values: T[],
  seed: number
) {
  const result =
    [...values];

  const random =
    mulberry32(
      seed
    );

  for (
    let index =
      result.length - 1;
    index > 0;
    index--
  ) {
    const swapIndex =
      Math.floor(
        random() *
          (index + 1)
      );

    [
      result[index],
      result[swapIndex],
    ] = [
      result[swapIndex],
      result[index],
    ];
  }

  return result;
}


export function getCouplePuzzleQuestionsForRoom(
  code: string
): CouplePuzzle[] {
  return seededShuffle(
    couplePuzzleQuestions,
    hashString(
      `couple-puzzle:${code}`
    )
  ).slice(
    0,
    8
  );
}
