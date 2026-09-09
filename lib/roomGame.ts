export type RoomGameSlug =
  | "would-you-rather"
  | "same-answer"
  | "relationship-check-in";

export const DEFAULT_ROOM_GAME_SLUG: RoomGameSlug =
  "would-you-rather";

export const ROOM_GAME_CONFIG = {
  "would-you-rather": {
    roundLimit: 12,
  },

  "same-answer": {
    roundLimit: 12,
  },

  "relationship-check-in": {
    roundLimit: 12,
  },
} as const;

export function isRoomGameSlug(
  value: unknown
): value is RoomGameSlug {
  return (
    value === "would-you-rather" ||
    value === "same-answer" ||
    value === "relationship-check-in"
  );
}

export function resolveRoomGameSlug(
  value: unknown
): RoomGameSlug | null {
  /*
   * Backward compatibility:
   * 老 Room 如果没有 game_slug，
   * 继续按 Would You Rather 处理。
   */
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return DEFAULT_ROOM_GAME_SLUG;
  }

  return isRoomGameSlug(value)
    ? value
    : null;
}

export function getRoomGameRoundLimit(
  gameSlug: RoomGameSlug
) {
  return ROOM_GAME_CONFIG[gameSlug]
    .roundLimit;
}
