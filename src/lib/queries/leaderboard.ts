import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Database,
  LeaderboardEntry,
  LeaderboardPeriod,
  LeaderboardVehicleFilter,
  VehicleType,
} from "@/lib/types";

type Args = {
  period: LeaderboardPeriod;
  vehicle: LeaderboardVehicleFilter;
};

export async function fetchLeaderboard(
  supabase: SupabaseClient<Database>,
  { period, vehicle }: Args,
): Promise<LeaderboardEntry[]> {
  let query = supabase
    .from("activities")
    .select("user_id, distance, vehicle_type, profiles!inner(full_name)")
    .eq("status", "approved");

  if (vehicle !== "all") {
    query = query.eq("vehicle_type", vehicle);
  }

  if (period === "today") {
    const today = new Date().toISOString().split("T")[0];
    query = query
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`);
  } else if (period === "last_hour") {
    const oneHourAgo = new Date(Date.now() - 3_600_000).toISOString();
    query = query.gte("created_at", oneHourAgo);
  }

  const { data, error } = await query;
  if (error || !data) return [];

  type Row = {
    user_id: string;
    distance: number;
    vehicle_type: string;
    profiles: { full_name: string } | { full_name: string }[] | null;
  };
  const rows = data as unknown as Row[];

  type Accumulator = {
    user_id: string;
    full_name: string;
    total_distance: number;
    vehicle_km: Record<string, number>;
  };

  const byUser = new Map<string, Accumulator>();
  for (const row of rows) {
    const profile = Array.isArray(row.profiles)
      ? row.profiles[0]
      : row.profiles;
    const existing = byUser.get(row.user_id);
    if (existing) {
      existing.total_distance += row.distance;
      existing.vehicle_km[row.vehicle_type] =
        (existing.vehicle_km[row.vehicle_type] ?? 0) + row.distance;
    } else {
      byUser.set(row.user_id, {
        user_id: row.user_id,
        full_name: profile?.full_name ?? "—",
        total_distance: row.distance,
        vehicle_km: { [row.vehicle_type]: row.distance },
      });
    }
  }

  return Array.from(byUser.values())
    .map((u) => {
      const dominant_vehicle = (
        Object.entries(u.vehicle_km) as [VehicleType, number][]
      ).reduce<[VehicleType, number]>(
        (best, curr) => (curr[1] > best[1] ? curr : best),
        ["bicycle", 0],
      )[0];
      return {
        user_id: u.user_id,
        full_name: u.full_name,
        total_distance: u.total_distance,
        dominant_vehicle,
      };
    })
    .sort((a, b) => b.total_distance - a.total_distance);
}
