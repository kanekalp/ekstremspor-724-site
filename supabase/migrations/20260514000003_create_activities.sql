create table activities (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(id) on delete cascade,
  distance      float not null,
  vehicle_type  text not null check (
                  vehicle_type in ('bicycle','skates','skateboard')
                ),
  source        text not null check (source in ('on_site','remote')),
  evidence_url  text,
  date_range    text,
  status        text not null default 'pending'
                  check (status in ('pending','approved','rejected')),
  created_at    timestamptz default now()
);

alter table activities enable row level security;

create policy "Users read own activities"
  on activities for select using (auth.uid() = user_id);

create policy "Approved activities public"
  on activities for select using (status = 'approved');

create policy "Remote insert: own record only"
  on activities for insert
  with check (auth.uid() = user_id and source = 'remote');

create policy "On-site insert: admin only"
  on activities for insert
  with check (
    source = 'on_site' and
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Status update: admin only"
  on activities for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins read all activities"
  on activities for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
