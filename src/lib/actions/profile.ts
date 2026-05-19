"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { EquipmentNeed } from "@/lib/types";

function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function saveProfile(data: {
  fullName: string;
  phone: string;
  equipmentNeed: EquipmentNeed;
}): Promise<{ error?: string }> {
  if (process.env.NEXT_PUBLIC_MOCK_MODE === "true") return {};

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Oturum bulunamadı. Lütfen tekrar giriş yap." };

  const role = getAdminEmails().includes(user.email?.toLowerCase() ?? "")
    ? "admin"
    : "user";

  const admin = createAdminClient();

  const { error } = await admin.from("profiles").upsert({
    id: user.id,
    full_name: data.fullName.trim(),
    email: user.email ?? "",
    phone: data.phone.trim(),
    equipment_need: data.equipmentNeed,
    role,
  });

  if (error) {
    console.error("Profile save error:", error);
    return { error: "Profil kaydedilemedi. Bağlantıyı kontrol et." };
  }
  if (data.equipmentNeed !== "none" && role !== "admin") {
    const { data: existing } = await admin
      .from("activities")
      .select("id")
      .eq("user_id", user.id)
      .eq("source", "on_site")
      .eq("status", "pending")
      .eq("vehicle_type", data.equipmentNeed)
      .maybeSingle();

    if (!existing) {
      await admin.from("activities").insert({
        user_id: user.id,
        distance: 0,
        vehicle_type: data.equipmentNeed,
        source: "on_site",
        status: "pending",
      });
    }
  }

  revalidatePath("/");
  return {};
}
export async function adminCreateUser(input: {
  fullName: string;
  email: string;
  phone: string;
  equipmentNeed: EquipmentNeed;
}): Promise<{ userId?: string; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Oturum bulunamadı." };

  const admin = createAdminClient();
  const { data: callerProfile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (callerProfile?.role !== "admin") return { error: "Yetkin yok." };

  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();
  const phone = input.phone.trim();

  if (!fullName) return { error: "İsim zorunlu." };
  if (!email.includes("@")) return { error: "Geçerli bir e-posta gir." };
  if (!phone) return { error: "Telefon zorunlu." };

  const { data: created, error: createErr } = await admin.auth.admin.createUser(
    {
      email,
      email_confirm: true,
    },
  );

  let userId: string | undefined = created?.user?.id;

  if (createErr || !userId) {
    const { data: list } = await admin.auth.admin.listUsers();
    const match = list?.users.find((u) => u.email?.toLowerCase() === email);
    if (!match) {
      console.error("adminCreateUser failed:", createErr);
      return { error: "Kullanıcı oluşturulamadı." };
    }
    userId = match.id;
  }

  const { error: profileErr } = await admin.from("profiles").upsert(
    {
      id: userId,
      full_name: fullName,
      email,
      phone,
      equipment_need: input.equipmentNeed,
      role: "user",
    },
    { onConflict: "id" },
  );

  if (profileErr) {
    console.error("adminCreateUser profile upsert failed:", profileErr);
    return { error: "Profil oluşturulamadı." };
  }

  revalidatePath("/admin");
  return { userId };
}

export async function adminUpdateUser(
  userId: string,
  data: { fullName: string; phone: string },
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Oturum bulunamadı." };

  const admin = createAdminClient();
  const { data: callerProfile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (callerProfile?.role !== "admin") return { error: "Yetkin yok." };

  const fullName = data.fullName.trim();
  const phone = data.phone.trim();
  if (!fullName) return { error: "İsim boş bırakılamaz." };
  if (!phone) return { error: "Telefon boş bırakılamaz." };

  const { error } = await admin
    .from("profiles")
    .update({ full_name: fullName, phone })
    .eq("id", userId);

  if (error) {
    console.error("adminUpdateUser error:", error);
    return { error: "Profil güncellenemedi." };
  }
  return {};
}
