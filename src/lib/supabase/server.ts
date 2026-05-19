import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createMockClient } from "@/lib/mock/client";
import type { Database } from "@/lib/types";

export async function createClient(): Promise<SupabaseClient<Database>> {
  if (process.env.NEXT_PUBLIC_MOCK_MODE === "true") {
    return createMockClient() as unknown as SupabaseClient<Database>;
  }
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Must match SESSION_COOKIE_NAME in lib/supabase/client.ts.
      // The default key is derived from URL hostname, which differs
      // between server (127.0.0.1) and browser (whatever the user
      // typed). A fixed name keeps client and server reading the
      // same cookie.
      cookieOptions: { name: "sb-extremspor-auth-token" },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component — setAll is a no-op here;
            // middleware refreshes the session cookie.
          }
        },
      },
    },
  );
}
