import { createHmac } from "crypto";
import type { NextRequest } from "next/server";

import { supabaseRest } from "@/lib/supabaseAdmin";

/* =========================================================
   Types
========================================================= */

export type RateLimitResult = {
  allowed: boolean;
  count: number;
  limit: number;
  resetAt: string | null;
  retryAfter: number;
};

/* =========================================================
   Client IP

   Vercel provides x-forwarded-for for the public client IP.
========================================================= */

function getClientIp(
  request: NextRequest
) {
  const forwardedFor =
    request.headers.get(
      "x-forwarded-for"
    );

  if (forwardedFor) {
    return (
      forwardedFor
        .split(",")[0]
        ?.trim() ||
      "unknown"
    );
  }

  const realIp =
    request.headers.get(
      "x-real-ip"
    );

  if (realIp) {
    return realIp.trim();
  }

  /*
   * localhost normally reaches here.
   *
   * Rate limiting is disabled locally anyway.
   */
  return "unknown";
}

/* =========================================================
   Hash IP

   Never store raw IP addresses in Supabase.

   Example:
   103.1.2.3
        ↓ HMAC-SHA256
   f8c3d91e...
========================================================= */

function hashClientIp(
  ip: string
) {
  const secret =
    process.env.RATE_LIMIT_SECRET;

  if (!secret) {
    throw new Error(
      "RATE_LIMIT_SECRET is not configured."
    );
  }

  return createHmac(
    "sha256",
    secret
  )
    .update(ip)
    .digest("hex");
}

/* =========================================================
   Consume Rate Limit
========================================================= */

export async function consumeRateLimit(
  request: NextRequest,
  action: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {

  /* =======================================================
     Local development

     Do NOT rate-limit localhost.

     VERCEL_ENV:
     production → real website
     preview    → preview
     undefined  → localhost
  ======================================================= */

  if (
    process.env.VERCEL_ENV !==
    "production"
  ) {
    return {
      allowed: true,
      count: 0,
      limit,
      resetAt: null,
      retryAfter: 0,
    };
  }

  /* =======================================================
     Missing secret

     Fail open so a configuration mistake doesn't take
     the whole product offline.

     But log loudly so we can fix it.
  ======================================================= */

  if (
    !process.env.RATE_LIMIT_SECRET
  ) {
    console.error(
      "RATE_LIMIT_SECRET is missing. Rate limiting is disabled."
    );

    return {
      allowed: true,
      count: 0,
      limit,
      resetAt: null,
      retryAfter: 0,
    };
  }

  try {
    const ip =
      getClientIp(request);

    const ipHash =
      hashClientIp(ip);

    /*
     * Never send/store the raw IP.
     *
     * Database only sees something like:
     *
     * room_create:
     * e087349487...
     */
    const bucketKey =
      `${action}:${ipHash}`;

    const response =
      await supabaseRest(
        "rpc/consume_api_rate_limit",
        {
          method: "POST",

          body:
            JSON.stringify({
              p_bucket_key:
                bucketKey,

              p_limit:
                limit,

              p_window_seconds:
                windowSeconds,
            }),
        }
      );

    const payload =
      await response.json();

    /*
     * PostgREST normally returns the jsonb object directly.
     * This also tolerates an array response.
     */
    const data =
      Array.isArray(payload)
        ? payload[0]
        : payload;

    const resetAt =
      typeof data?.reset_at ===
      "string"
        ? data.reset_at
        : null;

    let retryAfter = 0;

    if (
      resetAt &&
      data?.allowed === false
    ) {
      retryAfter =
        Math.max(
          1,
          Math.ceil(
            (
              new Date(
                resetAt
              ).getTime() -
              Date.now()
            ) /
              1000
          )
        );
    }

    return {
      allowed:
        data?.allowed !==
        false,

      count:
        Number(
          data?.count || 0
        ),

      limit:
        Number(
          data?.limit ||
            limit
        ),

      resetAt,

      retryAfter,
    };

  } catch (error) {

    /*
     * Fail open:
     *
     * If the limiter itself has a temporary problem,
     * don't break room creation for legitimate users.
     */
    console.error(
      "rate limit error",
      error
    );

    return {
      allowed: true,
      count: 0,
      limit,
      resetAt: null,
      retryAfter: 0,
    };
  }
}