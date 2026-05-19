"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { EquipmentVehicleType } from "@/lib/types";

type RequestResult =
  | { ok: true; replaced?: boolean; alreadyPending?: boolean }
  | { banned: true }
  | { activeVehicle: EquipmentVehicleType }
  | { existingRequest: { id: string; vehicle_type: EquipmentVehicleType } }
  | { error: string };
export async function requestOnSiteEquipment(
  vehicle: EquipmentVehicleType,
  options: { confirmReplaceExisting?: boolean } = {},
): Promise<RequestResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Oturum bulunamadı." };

  const admin = createAdminClient();

  const { data: profile } = await admin
    .from("profiles")
    .select("is_banned")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.is_banned) return { banned: true };

  const { data: activeEquip } = await admin
    .from("equipments")
    .select("type")
    .eq("assigned_to", user.id)
    .eq("status", "in_use")
    .maybeSingle();
  if (activeEquip) {
    return { activeVehicle: activeEquip.type as EquipmentVehicleType };
  }

  const { data: existing } = await admin
    .from("activities")
    .select("id, vehicle_type")
    .eq("user_id", user.id)
    .eq("source", "on_site")
    .eq("status", "pending")
    .maybeSingle();

  if (existing) {
    if (existing.vehicle_type === vehicle) {
      return { ok: true, alreadyPending: true };
    }
    if (!options.confirmReplaceExisting) {
      return {
        existingRequest: {
          id: existing.id,
          vehicle_type: existing.vehicle_type as EquipmentVehicleType,
        },
      };
    }
    const { error: deleteErr } = await admin
      .from("activities")
      .delete()
      .eq("id", existing.id);
    if (deleteErr) {
      console.error("requestOnSiteEquipment delete old failed:", deleteErr);
      return { error: "Eski talep iptal edilemedi." };
    }
  }

  const { error: insertErr } = await admin.from("activities").insert({
    user_id: user.id,
    distance: 0,
    vehicle_type: vehicle,
    source: "on_site",
    status: "pending",
  });
  if (insertErr) {
    console.error("requestOnSiteEquipment insert failed:", insertErr);
    return { error: "Talep gönderilemedi." };
  }

  await admin
    .from("profiles")
    .update({ equipment_need: vehicle, equipment_request_status: "pending" })
    .eq("id", user.id);

  return { ok: true, replaced: !!existing };
}
export async function decideActivity(
  activityId: string,
  decision: "approved" | "rejected",
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Oturum bulunamadı." };

  const admin = createAdminClient();

  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") return { error: "Yetkin yok." };

  const { data: activity } = await admin
    .from("activities")
    .select("evidence_url, status")
    .eq("id", activityId)
    .maybeSingle();
  if (!activity) return { error: "Aktivite bulunamadı." };

  if (activity.evidence_url) {
    await admin.storage.from("evidence").remove([activity.evidence_url]);
  }

  const { error } = await admin
    .from("activities")
    .update({ status: decision, evidence_url: null })
    .eq("id", activityId);
  if (error) {
    console.error("decideActivity update failed:", error);
    return { error: "Aktivite güncellenemedi." };
  }

  return {};
}
export async function cancelActivity(
  activityId: string,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Oturum bulunamadı." };

  const { data: act } = await supabase
    .from("activities")
    .select("user_id, status")
    .eq("id", activityId)
    .maybeSingle();

  if (!act) return { error: "Talep bulunamadı." };
  if (act.user_id !== user.id)
    return { error: "Bu talebi iptal etme yetkin yok." };
  if (act.status !== "pending") {
    return { error: "Sadece bekleyen talepler iptal edilebilir." };
  }

  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", activityId);

  if (error) {
    console.error("cancelActivity error:", error);
    return { error: "Talep iptal edilemedi." };
  }
  return {};
}
