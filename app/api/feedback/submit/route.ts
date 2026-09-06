import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  supabaseRest,
} from "@/lib/supabaseAdmin";

const ALLOWED_GAMES =
  new Set([
    "wyr_multiplayer",
    "same_answer",
    "this_or_that",
    "couple_quiz",
    "compatibility",
  ]);

const ALLOWED_TAGS =
  new Set([
    "more_multiplayer_games",
    "more_questions",
    "more_funny_questions",
    "more_deep_questions",
    "better_chat",
    "puzzle_game",
    "confusing",
    "bug",
  ]);

type FeedbackRequestBody = {
  gameSlug?: unknown;

  pagePath?: unknown;

  rating?: unknown;

  feedbackTags?: unknown;

  comment?: unknown;

  allowPublic?: unknown;

  website?: unknown;
};

function cleanText(
  value: unknown,
  maxLength: number
) {
  if (
    typeof value !==
    "string"
  ) {
    return "";
  }

  return value
    .trim()
    .slice(
      0,
      maxLength
    );
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (await request
        .json()) as
        FeedbackRequestBody;

    if (
      typeof body.website ===
        "string" &&
      body.website.trim()
    ) {
      return NextResponse.json({
        ok: true,
      });
    }

    const gameSlug =
      cleanText(
        body.gameSlug,
        80
      );

    if (
      !ALLOWED_GAMES.has(
        gameSlug
      )
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Invalid game.",
        },
        {
          status: 400,
        }
      );
    }

    const rating =
      Number(
        body.rating
      );

    if (
      !Number.isInteger(
        rating
      ) ||
      rating < 1 ||
      rating > 4
    ) {
      return NextResponse.json(
        {
          ok: false,

          error:
            "Please choose a rating.",
        },
        {
          status: 400,
        }
      );
    }

    const rawTags:
      unknown[] =
      Array.isArray(
        body.feedbackTags
      )
        ? body.feedbackTags
        : [];

    const feedbackTags =
      rawTags
        .filter(
          (
            item: unknown
          ): item is string =>
            typeof item ===
            "string"
        )
        .filter(
          (
            item: string
          ) =>
            ALLOWED_TAGS.has(
              item
            )
        )
        .slice(
          0,
          8
        );

    const comment =
      cleanText(
        body.comment,
        1000
      );

    let pagePath =
      cleanText(
        body.pagePath,
        200
      );

    if (
      !pagePath.startsWith(
        "/"
      )
    ) {
      pagePath =
        "/room/[code]";
    }

    const allowPublic =
      body.allowPublic ===
      true;

    await supabaseRest(
      "user_feedback",
      {
        method:
          "POST",

        headers: {
          Prefer:
            "return=minimal",
        },

        body:
          JSON.stringify({
            game_slug:
              gameSlug,

            page_path:
              pagePath,

            rating,

            feedback_tags:
              feedbackTags,

            comment:
              comment ||
              null,

            allow_public:
              allowPublic,

            status:
              "new",

            user_id:
              null,

            form_version:
              "v1",
          }),
      }
    );

    return NextResponse.json({
      ok: true,
    });
  } catch (
    error
  ) {
    console.error(
      "[Feedback API]",
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Could not send your feedback. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}