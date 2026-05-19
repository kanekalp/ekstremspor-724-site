-- ─── Equipment request status on profile ───────────────────────
-- Tracks the lifecycle of a user's equipment request, so admins can
-- reject the request (e.g. when no equipment is available) and users
-- can see the outcome from the activities modal.
alter table profiles
  add column if not exists equipment_request_status text not null default 'pending'
    check (equipment_request_status in ('pending','fulfilled','rejected','not_needed'));

-- Seed correct status for existing rows: 'none' need => 'not_needed', else 'pending'
update profiles
   set equipment_request_status = 'not_needed'
 where equipment_need = 'none';

-- ─── Allow users to delete their own pending activities ─────────
-- Used by the "cancel my pending entry" button in the user activities modal.
create policy "Users delete own pending activities"
  on activities for delete
  using (auth.uid() = user_id and status = 'pending');

-- ─── Allow admins to delete pending activities ──────────────────
-- Admin "reject" path may delete instead of marking rejected.
create policy "Admins delete activities"
  on activities for delete
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ─── Allow admins to update profiles (for equipment_request_status) ─
create policy "Admins update profiles"
  on profiles for update
  using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );
