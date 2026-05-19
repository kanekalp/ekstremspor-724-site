import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types";

export type LiveStats = {
  totalKm: number;
  participants: number;
  freeEquipment: number;
  todayKm: number;
  targetKm: number;
};

export async function fetchLiveStats(
  supabase: SupabaseClient<Database>,
): Promise<LiveStats> {
  const today = new Date().toISOString().split("T")[0];

  const [approvedRes, equipRes, configRes] = await Promise.all([
    supabase
      .from("activities")
      .select("user_id, distance, created_at")
      .eq("status", "approved"),
    supabase.from("equipments").select("id").eq("status", "available"),
    supabase.from("event_config").select("target_km").limit(1).maybeSingle(),
  ]);

  let totalKm = 0;
  let todayKm = 0;
  const distinctUsers = new Set<string>();

  for (const row of approvedRes.data ?? []) {
    totalKm += row.distance;
    distinctUsers.add(row.user_id);
    if (row.created_at?.startsWith(today)) {
      todayKm += row.distance;
    }
  }

  return {
    totalKm,
    participants: distinctUsers.size,
    freeEquipment: equipRes.data?.length ?? 0,
    todayKm,
    targetKm: configRes.data?.target_km ?? 5000,
  };
}
