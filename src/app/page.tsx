import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroClient } from "@/components/landing/HeroClient";
import { Leaderboard } from "@/components/landing/Leaderboard";
import { StatCards } from "@/components/landing/StatCards";
import { SaplingProgress } from "@/components/landing/SaplingProgress";
import { HowToJoin } from "@/components/landing/HowToJoin";
import { AddActivityClient } from "@/components/landing/AddActivityClient";
import { OnboardingModalClient } from "@/components/modals/OnboardingModalClient";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let needsOnboarding = false;
  let isAdmin = false;
  let isBanned = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, phone, equipment_need, role, is_banned")
      .eq("id", user.id)
      .maybeSingle();

    needsOnboarding =
      !profile?.full_name || !profile?.phone || !profile?.equipment_need;
    isAdmin = profile?.role === "admin";
    isBanned = !!profile?.is_banned;
  }

  return (
    <>
      <Header
        isAuthed={!!user}
        isAdmin={isAdmin}
        needsOnboarding={needsOnboarding}
        isBanned={isBanned}
        userId={user?.id}
      />

      {isBanned && (
        <div className="fixed inset-x-0 top-20 z-20 mx-auto w-fit max-w-[92%] rounded-full border border-red-300 bg-red-50/95 px-4 py-2 text-center text-xs font-medium text-red-700 shadow-md backdrop-blur sm:top-24 sm:text-sm">
          Hesabın askıya alındı. Yeni başvuru yapamazsın — detay için stant ekibine sor.
        </div>
      )}

      <main className="flex flex-1 flex-col">
        <HeroClient isAuthed={!!user} />
        <StatCards />
        <SaplingProgress />
        <Leaderboard userId={user?.id} />
        <HowToJoin />
      </main>

      <Footer />

      {user && needsOnboarding && (
        <OnboardingModalClient userId={user.id} email={user.email ?? ""} />
      )}
      {user && !needsOnboarding && !isBanned && (
        <AddActivityClient userId={user.id} />
      )}
    </>
  );
}
