-- Allow users to insert their own activities as pending (both on_site and remote).
-- Admin can insert anything (including approved on-site entries via Stant Girişi modal).
drop policy if exists "activities_insert" on public.activities;

create policy "activities_insert" on public.activities
  for insert with check (
    ((select auth.uid()) = user_id and status = 'pending')
    or (select private.is_admin())
  );
