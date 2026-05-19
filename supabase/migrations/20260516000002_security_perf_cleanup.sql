-- ════════════════════════════════════════════════════════════════════
-- Security + performance cleanup pass.
-- Addresses all warnings raised by Supabase Studio's database linter:
--   0003 auth_rls_initplan                — wrap auth.* with (select …)
--   0006 multiple_permissive_policies     — consolidate per role+action
--   0026 pg_graphql_anon_table_exposed    — hide GraphQL from public roles
--   0027 pg_graphql_authenticated_…       — same, signed-in roles
--   0028 anon_security_definer_…          — move is_admin out of public
--   0029 authenticated_security_definer_… — same
--
-- Result: the same effective policy semantics, but Postgres caches
-- auth.uid() / is_admin() once per query instead of re-evaluating per
-- row, and the function is no longer reachable via /rest/v1/rpc.
-- ════════════════════════════════════════════════════════════════════


-- ─── 1. Move is_admin() to a non-API schema ─────────────────────────
-- The `private` schema is NOT listed in [api].schemas in config.toml,
-- so PostgREST does not expose anything in it. RLS policies can still
-- call functions there because RLS evaluates inside Postgres, not via
-- the REST layer. Anon and authenticated roles still need USAGE on the
-- schema and EXECUTE on the function so the policy can call it.
create schema if not exists private;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
  returns boolean
  language sql
  security definer
  stable
  set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant execute on function private.is_admin() to anon, authenticated;


-- ─── 2. Hide GraphQL endpoint from public roles ─────────────────────
-- The app talks REST only (via supabase-js default). Revoking schema
-- USAGE silences lints 0026/0027 without touching the table grants
-- that REST + RLS rely on. service_role + postgres retain access for
-- Studio's introspection needs.
do $$
begin
  if exists (select 1 from pg_namespace where nspname = 'graphql_public') then
    execute 'revoke usage on schema graphql_public from anon, authenticated';
  end if;
end $$;


-- ─── 3. Drop every existing RLS policy on the four public tables ────
-- We're rebuilding from scratch so the multiple-permissive warnings
-- (lint 0006) go away. Drop is idempotent via `if exists`.

-- profiles
drop policy if exists "Users read own profile"            on public.profiles;
drop policy if exists "Users update own profile"          on public.profiles;
drop policy if exists "Users insert own profile"          on public.profiles;
drop policy if exists "Admins read all profiles"          on public.profiles;
drop policy if exists "Admins update profiles"            on public.profiles;
drop policy if exists "Profiles visible for leaderboard"  on public.profiles;

-- activities
drop policy if exists "Users read own activities"          on public.activities;
drop policy if exists "Approved activities public"         on public.activities;
drop policy if exists "Remote insert: own record only"     on public.activities;
drop policy if exists "On-site insert: admin only"         on public.activities;
drop policy if exists "Status update: admin only"          on public.activities;
drop policy if exists "Admins read all activities"         on public.activities;
drop policy if exists "Users delete own pending activities" on public.activities;
drop policy if exists "Admins delete activities"           on public.activities;

-- equipments
drop policy if exists "Equipment status public"     on public.equipments;
drop policy if exists "Equipment update: admin only" on public.equipments;
drop policy if exists "Equipment insert: admin only" on public.equipments;
drop policy if exists "Equipment delete: admin only" on public.equipments;

-- event_config
drop policy if exists "Config public read"          on public.event_config;
drop policy if exists "Config update: admin only"   on public.event_config;


-- ─── 4. Rebuild consolidated policies ───────────────────────────────
-- Pattern: one policy per (table, action). All auth.* and is_admin()
-- calls are wrapped in `(select …)` so Postgres treats them as a query
-- initplan instead of a per-row function call.

-- profiles ───────────────────────────────────────────────────────────
create policy "profiles_select" on public.profiles
  for select
  using (
    (select auth.uid()) = id
    or (select private.is_admin())
    or exists (
      select 1 from public.activities a
      where a.user_id = profiles.id and a.status = 'approved'
    )
  );

create policy "profiles_insert" on public.profiles
  for insert
  with check ((select auth.uid()) = id);

create policy "profiles_update" on public.profiles
  for update
  using ((select auth.uid()) = id or (select private.is_admin()));

-- activities ─────────────────────────────────────────────────────────
create policy "activities_select" on public.activities
  for select
  using (
    status = 'approved'
    or (select auth.uid()) = user_id
    or (select private.is_admin())
  );

create policy "activities_insert" on public.activities
  for insert
  with check (
    ((select auth.uid()) = user_id and source = 'remote')
    or (source = 'on_site' and (select private.is_admin()))
  );

create policy "activities_update" on public.activities
  for update
  using ((select private.is_admin()));

create policy "activities_delete" on public.activities
  for delete
  using (
    ((select auth.uid()) = user_id and status = 'pending')
    or (select private.is_admin())
  );

-- equipments ─────────────────────────────────────────────────────────
create policy "equipments_select" on public.equipments
  for select using (true);

create policy "equipments_insert" on public.equipments
  for insert with check ((select private.is_admin()));

create policy "equipments_update" on public.equipments
  for update using ((select private.is_admin()));

create policy "equipments_delete" on public.equipments
  for delete using (status <> 'in_use' and (select private.is_admin()));

-- event_config ───────────────────────────────────────────────────────
create policy "event_config_select" on public.event_config
  for select using (true);

create policy "event_config_update" on public.event_config
  for update using ((select private.is_admin()));


-- ─── 5. Storage policies on the evidence bucket ─────────────────────
-- Same initplan + is_admin migration applied to storage.objects so
-- linting stays clean if you enable it on the storage schema later.
drop policy if exists "Users upload own evidence" on storage.objects;
drop policy if exists "Users read own evidence"   on storage.objects;
drop policy if exists "Admins read all evidence"  on storage.objects;

create policy "evidence_insert_own" on storage.objects
  for insert
  with check (
    bucket_id = 'evidence'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "evidence_select" on storage.objects
  for select
  using (
    bucket_id = 'evidence'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or (select private.is_admin())
    )
  );


-- ─── 6. Drop the old public.is_admin() ──────────────────────────────
-- All policies now reference private.is_admin(); the public copy is
-- the one Supabase Studio flagged for being callable via RPC.
drop function if exists public.is_admin();
