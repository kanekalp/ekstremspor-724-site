-- Equipment code + damaged status

alter table equipments
  add column if not exists code text;

-- Expand status check to include 'damaged'
alter table equipments
  drop constraint if exists equipments_status_check;

alter table equipments
  add constraint equipments_status_check
    check (status in ('available', 'in_use', 'damaged'));

-- Admin can add equipment
create policy "Equipment insert: admin only"
  on equipments for insert
  with check (public.is_admin());

-- Admin can delete equipment that is NOT in active use
create policy "Equipment delete: admin only"
  on equipments for delete
  using (status <> 'in_use' and public.is_admin());

-- ─── Leaderboard fix ───────────────────────────────────────────────
-- The leaderboard joins activities with profiles to get full_name.
-- Without this policy, unauthenticated and regular users can't read
-- other users' profiles so the inner join returns nothing.
-- The subquery is safe: it uses activities' own "Approved activities public"
-- policy, which requires no auth — no recursion risk.
create policy "Profiles visible for leaderboard"
  on profiles for select
  using (
    exists (
      select 1 from activities a
      where a.user_id = profiles.id and a.status = 'approved'
    )
  );
