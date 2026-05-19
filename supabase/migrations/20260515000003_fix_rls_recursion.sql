-- Fix infinite recursion in profiles RLS policies.
-- Policies that call `exists (select 1 from profiles ...)` from within a
-- profiles policy cause PostgreSQL to loop. Replace them with a
-- SECURITY DEFINER function — it runs as the definer (bypassing RLS)
-- so the inner profiles query doesn't re-trigger the policies.

create or replace function public.is_admin()
  returns boolean
  language sql
  security definer
  stable
  set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Re-create the two recursive policies on profiles
drop policy if exists "Admins read all profiles" on profiles;
drop policy if exists "Admins update profiles"   on profiles;

create policy "Admins read all profiles"
  on profiles for select
  using (public.is_admin());

create policy "Admins update profiles"
  on profiles for update
  using (public.is_admin());
