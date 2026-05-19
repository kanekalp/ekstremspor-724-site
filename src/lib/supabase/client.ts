import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createMockClient } from "@/lib/mock/client";
import type { Database } from "@/lib/types";

// Strip the hostname out of the env URL and rebuild it using
// window.location.hostname. This lets any LAN device hit the Next.js
// dev server (bound to 0.0.0.0) at its own perceived host (localhost,
// 127.0.0.1, 192.168.x.y, hostname.local, …) and reach Supabase on the
// same host:port without anyone editing .env.local for each network.
//
// Server-side rendering uses the env value as-is (localhost from the
// dev box itself); only the browser swaps the host.
function resolveSupabaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  if (typeof window === "undefined") return envUrl;

  try {
    const parsed = new URL(envUrl);
    parsed.hostname = window.location.hostname;
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return envUrl;
  }
}

// Fixed cookie/storage key — overrides the URL-derived default so the
// session cookie name stays the same regardless of which hostname the
// browser is currently using. Without this, the LAN-aware hostname
// rewrite in resolveSupabaseUrl() would cause client and server to
// pick different cookie names and the server would never see the
// session that the browser just wrote.
const SESSION_COOKIE_NAME = "sb-extremspor-auth-token";

export function createClient(): SupabaseClient<Database> {
  if (process.env.NEXT_PUBLIC_MOCK_MODE === "true") {
    return createMockClient() as unknown as SupabaseClient<Database>;
  }
  return createBrowserClient<Database>(
    resolveSupabaseUrl(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookieOptions: { name: SESSION_COOKIE_NAME } },
  );
}
