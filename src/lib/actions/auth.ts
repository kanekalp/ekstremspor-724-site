"use server";

import { createAdminClient } from "@/lib/supabase/admin";
function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function getAllowedDomains(): string[] {
  return (process.env.ALLOWED_EMAIL_DOMAINS ?? "")
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminEmail(email: string): boolean {
  return getAdminEmails().includes(email);
}

function isAllowedStudentEmail(email: string): boolean {
  const domains = getAllowedDomains();
  if (domains.length === 0) return true; // No restriction configured
  return domains.some((d) => email.endsWith("@" + d));
}
export async function checkEmail(
  email: string,
): Promise<{ mode: "student" } | { mode: "admin" } | { error: string }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) {
    return { error: "Geçersiz e-posta adresi." };
  }

  if (isAdminEmail(normalized)) return { mode: "admin" };
  if (isAllowedStudentEmail(normalized)) return { mode: "student" };

  return {
    error:
      "Bu e-posta ile kayıt olunamıyor. Sadece @std.yildiz.edu.tr uzantılı öğrenci adresleri kabul edilir.",
  };
}
export async function signInStudent(
  email: string,
): Promise<{ tokenHash?: string; error?: string }> {
  const normalized = email.trim().toLowerCase();

  if (isAdminEmail(normalized)) {
    return { error: "Bu adres admin hesabı. Lütfen şifre ile giriş yap." };
  }
  if (!isAllowedStudentEmail(normalized)) {
    return {
      error:
        "Bu e-posta ile kayıt olunamıyor. Sadece @std.yildiz.edu.tr uzantılı öğrenci adresleri kabul edilir.",
    };
  }

  const admin = createAdminClient();

  await admin.auth.admin.createUser({
    email: normalized,
    email_confirm: true,
  });

  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: normalized,
  });

  if (error || !data?.properties?.hashed_token) {
    return { error: "Oturum oluşturulamadı. Lütfen tekrar deneyin." };
  }

  return { tokenHash: data.properties.hashed_token };
}

async function ensureAdminProfile(
  adminClient: ReturnType<typeof createAdminClient>,
  email: string,
) {
  const { data: user } = await adminClient.auth.admin.listUsers();
  const target = user?.users?.find((u) => u.email?.toLowerCase() === email);
  if (!target) return;

  await adminClient.from("profiles").upsert(
    {
      id: target.id,
      full_name: "Admin",
      email,
      phone: "-",
      equipment_need: "none",
      role: "admin",
    },
    { onConflict: "id" },
  );
}
export async function signInAdmin(
  email: string,
  password: string,
): Promise<{ tokenHash?: string; error?: string }> {
  const normalized = email.trim().toLowerCase();

  if (!isAdminEmail(normalized)) {
    return { error: "Bu adres admin yetkisine sahip değil." };
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return {
      error: "Admin şifresi yapılandırılmamış. Sistem yöneticisine başvurun.",
    };
  }
  if (password.length === 0 || password !== expected) {
    return { error: "Şifre hatalı." };
  }

  const admin = createAdminClient();

  await admin.auth.admin.createUser({
    email: normalized,
    email_confirm: true,
  });

  await ensureAdminProfile(admin, normalized);

  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: normalized,
  });

  if (error || !data?.properties?.hashed_token) {
    return { error: "Oturum oluşturulamadı. Lütfen tekrar deneyin." };
  }

  return { tokenHash: data.properties.hashed_token };
}
