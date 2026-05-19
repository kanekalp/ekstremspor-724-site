-- ─── Add 'running' as an activity vehicle_type ──────────────────
-- Running has no equipment, so equipments.type stays restricted to
-- bicycle/skates/skateboard. Only activities.vehicle_type expands.
alter table activities
  drop constraint if exists activities_vehicle_type_check;

alter table activities
  add constraint activities_vehicle_type_check
    check (vehicle_type in ('bicycle','skates','skateboard','running'));

-- ─── Forest name on event_config ────────────────────────────────
-- When the km target is reached, the planted saplings form a forest
-- that the community can name.
alter table event_config
  add column if not exists forest_name text;

-- ─── Enable realtime on every table the UI subscribes to ────────
-- Without this, postgres_changes subscriptions are silent and the UI
-- stays stale until manual refetch.
do $$
declare
  t text;
begin
  for t in select unnest(array['profiles','equipments','activities','event_config'])
  loop
    begin
      execute format('alter publication supabase_realtime add table %I', t);
    exception
      when duplicate_object then null;
      when undefined_object then null;  -- publication may not exist in some envs
    end;
  end loop;
end $$;
