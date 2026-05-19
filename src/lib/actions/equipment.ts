"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { EquipmentVehicleType } from "@/lib/types";

const CODE_PREFIX: Record<EquipmentVehicleType, string> = {
  bicycle: "BSK",
  skates: "PTN",
  skateboard: "KYK",
};

async function requireAdmin(): Promise<{ ok: true } | { error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Oturum bulunamadı." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") return { error: "Yetkin yok." };
  return { ok: true };
}
export async function addEquipment(
  type: EquipmentVehicleType,
  code?: string,
): Promise<{ error?: string }> {
  const auth = await requireAdmin();
  if ("error" in auth) return { error: auth.error };

  const admin = createAdminClient();

  let finalCode = code?.trim() || null;
  if (!finalCode) {
    const { count } = await admin
      .from("equipments")
      .select("id", { count: "exact", head: true })
      .eq("type", type);
    const n = (count ?? 0) + 1;
    finalCode = `${CODE_PREFIX[type]}-${String(n).padStart(3, "0")}`;
  }

  const { error } = await admin.from("equipments").insert({
    type,
    status: "available",
    code: finalCode,
    assigned_to: null,
    assigned_at: null,
    returned_at: null,
  });

  if (error) {
    console.error("addEquipment error:", error);
    return { error: "Ekipman eklenemedi." };
  }
  return {};
}
export async function deleteEquipment(id: string): Promise<{ error?: string }> {
  const auth = await requireAdmin();
  if ("error" in auth) return { error: auth.error };

  const admin = createAdminClient();

  const { data: eq } = await admin
    .from("equipments")
    .select("status")
    .eq("id", id)
    .single();

  if (eq?.status === "in_use") {
    return { error: "Kullanımda olan ekipman silinemez." };
  }

  const { error } = await admin.from("equipments").delete().eq("id", id);
  if (error) {
    console.error("deleteEquipment error:", error);
    return { error: "Ekipman silinemedi." };
  }
  return {};
}
export async function updateEquipmentCode(
  id: string,
  code: string,
): Promise<{ error?: string }> {
  const auth = await requireAdmin();
  if ("error" in auth) return { error: auth.error };

  const admin = createAdminClient();
  const { error } = await admin
    .from("equipments")
    .update({ code: code.trim() || null })
    .eq("id", id);

  if (error) {
    console.error("updateEquipmentCode error:", error);
    return { error: "Kod güncellenemedi." };
  }
  return {};
}
export async function setEquipmentStatus(
  id: string,
  status: "available" | "damaged",
): Promise<{ error?: string }> {
  const auth = await requireAdmin();
  if ("error" in auth) return { error: auth.error };

  const admin = createAdminClient();
  const { error } = await admin
    .from("equipments")
    .update({ status })
    .eq("id", id)
    .neq("status", "in_use");

  if (error) {
    console.error("setEquipmentStatus error:", error);
    return { error: "Durum güncellenemedi." };
  }
  return {};
}

export async function banUser(userId: string): Promise<{ error?: string }> {
  const auth = await requireAdmin();
  if ("error" in auth) return { error: auth.error };

  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({ is_banned: true })
    .eq("id", userId)
    .neq("role", "admin");

  if (error) return { error: "Kullanıcı banlanamadı." };
  return {};
}

export async function unbanUser(userId: string): Promise<{ error?: string }> {
  const auth = await requireAdmin();
  if ("error" in auth) return { error: auth.error };

  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({ is_banned: false })
    .eq("id", userId);

  if (error) return { error: "Ban kaldırılamadı." };
  return {};
}
