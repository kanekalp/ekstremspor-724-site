/**
 * Local-only admin bootstrap.
 *
 * Run with:
 *   npx tsx --env-file=.env.local scripts/seed-admin.ts
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local. Service role bypasses RLS,
 * so this script must never run against production with a real email.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const ADMIN_EMAIL = "admin@kampus.edu.tr";
const ADMIN_PASSWORD = "test1234";

const supabase = createClient(url, serviceKey);

async function seedAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    email_confirm: true,
    password: ADMIN_PASSWORD,
  });

  if (error || !data.user) {
    console.error("Failed to create auth user:", error?.message);
    process.exit(1);
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    full_name: "Admin Kullanıcı",
    email: ADMIN_EMAIL,
    phone: "05001234567",
    equipment_need: "none",
    role: "admin",
  });

  if (profileError) {
    console.error("Failed to insert profile:", profileError.message);
    process.exit(1);
  }

  console.log(`✓ Admin created — ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

seedAdmin();
