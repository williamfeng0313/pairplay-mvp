const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

function assertConfigured() {
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SECRET_KEY."
    );
  }
}

export async function supabaseRest(
  path: string,
  init: RequestInit = {}
) {
  assertConfigured();

  const headers = new Headers(init.headers);

  // New Supabase secret keys use the apikey header.
  // Do NOT send sb_secret_... as Authorization: Bearer.
  headers.set("apikey", supabaseSecretKey!);
  headers.set("Content-Type", "application/json");

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${path}`,
    {
      ...init,
      headers,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `Supabase request failed: ${response.status} ${body}`
    );
  }

  return response;
}