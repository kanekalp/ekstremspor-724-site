-- =============================================================
-- Production cleanup — wipe all mock/test data from cloud.
--
-- This migration brings the cloud DB to a production-clean state:
-- no profiles, no activities, no equipments, no auth users, no
-- evidence files. The admin user is recreated lazily on first
-- sign-in via signInAdmin (see src/lib/actions/auth.ts).
--
-- Idempotent: re-running on an already-clean DB is a no-op.
-- =============================================================

-- Wipe domain tables. activities/equipments FK to profiles, but we
-- truncate them in the right order anyway for clarity.
truncate table public.activities      restart identity cascade;
truncate table public.equipments      restart identity cascade;
truncate table public.profiles        restart identity cascade;

-- Reset the single event_config row to clean defaults.
-- We don't truncate it — the row is required by the app.
update public.event_config
   set event_name  = 'Kampüs Ekstrem Sporlar Etkinliği',
       target_km   = 5000,
       active_day  = 1,
       forest_name = null;

-- Wipe auth.users — cascades to auth.identities/sessions/refresh_tokens.
-- profiles.id FK references auth.users with on delete cascade, but
-- we already truncated profiles above, so this is safe.
delete from auth.users;

-- NOTE: storage.objects cannot be deleted via SQL (Supabase blocks
-- direct writes — "Use the Storage API instead"). Evidence files are
-- wiped via scripts/clear-evidence-bucket.ts using the service role
-- key. Run it once before launch if dev test screenshots exist in
-- the bucket.
