-- Migration 20260517000002 accidentally restricted activities_insert to
-- admin-only for source='on_site'. That broke the user "Stanttayım"
-- flow: clicking it tries to insert a pending on_site row, which RLS
-- silently rejects. Restore the user path while keeping the ban check
-- and the admin escape hatch.

drop policy if exists "activities_insert" on public.activities;

create policy "activities_insert" on public.activities
  for insert with check (
    (
      (select auth.uid()) = user_id
      and status = 'pending'
      and not coalesce(
        (select is_banned from public.profiles where id = (select auth.uid())),
        false
      )
    )
    or (select private.is_admin())
  );
