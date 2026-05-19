-- is_banned column on profiles
alter table profiles
  add column if not exists is_banned boolean not null default false;

-- Rebuild activities_insert: banned users cannot add remote activities
drop policy if exists "activities_insert" on activities;
create policy "activities_insert" on activities for insert with check (
  (
    (select auth.uid()) = user_id
    and source = 'remote'
    and not (select is_banned from public.profiles where id = (select auth.uid()))
  )
  or (source = 'on_site' and (select private.is_admin()))
);
