export type RoomGameSlug =
  | "would-you-rather"
  | "same-answer"
  | "relationship-check-in"
  | "couple-puzzle";


export const DEFAULT_ROOM_GAME_SLUG:
  RoomGameSlug =
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

  "couple-puzzle": {
    roundLimit: 8,
  },
} as const;


export function isRoomGameSlug(
  value: unknown
): value is RoomGameSlug {
  return (
    value ===
      "would-you-rather" ||
    value ===
      "same-answer" ||
    value ===
      "relationship-check-in" ||
    value ===
      "couple-puzzle"
  );
}


export function resolveRoomGameSlug(
  value: unknown
): RoomGameSlug | null {
  /*
   * Backward compatibility:
   * old rooms without game_slug remain WYR rooms.
   */
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return DEFAULT_ROOM_GAME_SLUG;
  }

  return isRoomGameSlug(
    value
  )
    ? value
    : null;
}


export function getRoomGameRoundLimit(
  gameSlug:
    RoomGameSlug
) {
  return (
    ROOM_GAME_CONFIG[
      gameSlug
    ].roundLimit
  );
}
