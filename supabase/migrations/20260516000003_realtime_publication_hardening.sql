-- ════════════════════════════════════════════════════════════════════
-- Realtime publication hardening.
--
-- The previous attempt (20260516000001) added tables to
-- `supabase_realtime` only if the publication already existed,
-- silently doing nothing otherwise. This migration is the belt-and-
-- braces version:
--   1. Create the publication if it's missing (some local stacks come
--      up without it).
--   2. Add every table the UI subscribes to (idempotent — duplicate
--      adds are caught).
--   3. Set REPLICA IDENTITY FULL on tables where the UI listens to
--      UPDATE/DELETE events so the OLD row is shipped with the
--      payload (without this, DELETE events arrive with only the PK
--      and some filter-matching on `status` etc. breaks).
-- ════════════════════════════════════════════════════════════════════

do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
end $$;

do $$
declare
  t text;
begin
  for t in select unnest(array['profiles','equipments','activities','event_config'])
  loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception
      when duplicate_object then null;
    end;
  end loop;
end $$;

alter table public.profiles     replica identity full;
alter table public.equipments   replica identity full;
alter table public.activities   replica identity full;
alter table public.event_config replica identity full;
