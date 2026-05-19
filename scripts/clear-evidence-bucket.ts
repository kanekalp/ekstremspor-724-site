import { createClient } from "@supabase/supabase-js";

// One-shot bucket cleaner. Run via:
//   node --env-file=.env.local --import tsx scripts/clear-evidence-bucket.ts
//
// Uses SUPABASE_SERVICE_ROLE_KEY so it bypasses RLS and can delete
// any object in the `evidence` bucket. Reads URL/key from .env.local
// via Node's built-in --env-file flag (no dotenv dependency).

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function clearBucket(name: string) {
  let cursor: string | undefined;
  let total = 0;

  while (true) {
    const { data, error } = await supabase.storage
      .from(name)
      .list("", { limit: 1000, offset: 0, sortBy: { column: "name", order: "asc" } });

    if (error) {
      console.error(`List failed for bucket "${name}":`, error.message);
      return;
    }
    if (!data || data.length === 0) break;

    // Recurse into folders (user_id/file.jpg layout)
    const paths: string[] = [];
    for (const item of data) {
      if (item.id === null) {
        // folder — list contents
        const { data: inner } = await supabase.storage.from(name).list(item.name, { limit: 1000 });
        if (inner) for (const f of inner) paths.push(`${item.name}/${f.name}`);
      } else {
        paths.push(item.name);
      }
    }

    if (paths.length === 0) break;

    const { error: rmErr } = await supabase.storage.from(name).remove(paths);
    if (rmErr) {
      console.error("Remove failed:", rmErr.message);
      return;
    }
    total += paths.length;
    if (paths.length < 1000) break;
    cursor = paths[paths.length - 1];
  }

  console.log(`Removed ${total} object(s) from "${name}".`);
}

await clearBucket("evidence");
