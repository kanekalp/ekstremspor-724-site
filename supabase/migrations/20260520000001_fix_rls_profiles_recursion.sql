-- =============================================================
-- Fix: recursive RLS on profiles_select
--
-- Root cause: activities_insert policy checks profiles.is_banned,
-- which triggers profiles_select, which had a direct JOIN to
-- activities (approved check) — creating a cycle:
--
--   activities INSERT
--     → profiles SELECT (is_banned check)
--       → activities SELECT (approved check in profiles_select)
--         → profiles SELECT … 💀
--
-- Fix: replace the inline activities sub-select in profiles_select
-- with a SECURITY DEFINER function that bypasses RLS when querying
-- activities, breaking the cycle.
-- =============================================================

-- 1. Ensure is_admin() search_path includes private schema
create or replace function private.is_admin()
  returns boolean
  language sql stable security definer
  set search_path = public, private
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- 2. SECURITY DEFINER helper — queries activities without RLS
create or replace function private.has_approved_activity(profile_id uuid)
  returns boolean
  language sql stable security definer
  set search_path = public, private
as $$
  select exists (
    select 1 from public.activities
    where user_id = profile_id and status = 'approved'
  );
$$;

grant execute on function private.has_approved_activity(uuid) to anon, authenticated;

-- 3. Replace profiles_select: use the SECURITY DEFINER function
--    instead of a direct correlated sub-select on activities.
drop policy if exists "profiles_select" on public.profiles;

create policy "profiles_select" on public.profiles
  for select using (
    (select auth.uid()) = id
    or (select private.is_admin())
    or private.has_approved_activity(id)
  );
