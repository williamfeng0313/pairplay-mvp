import { NextResponse } from "next/server";

function cleanQuery(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 200) : "";
}

function cleanClickedPath(value: unknown) {
  if (typeof value !== "string") return null;
  const path = value.trim();
  return path && path.startsWith("/") ? path.slice(0, 500) : null;
}

function cleanResultCount(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(Math.floor(value), 1000));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = cleanQuery(body.query);

    if (!query) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const resultCount = cleanResultCount(body.resultCount);
    const clickedPath = cleanClickedPath(body.clickedPath);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secret =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !secret) {
      console.error("Missing Supabase server environment variables.");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/search_events`,
      {
        method: "POST",
        headers: {
          apikey: secret,
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          query,
          result_count: resultCount,
          clicked_path: clickedPath,
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Supabase search event error:", await response.text());
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
