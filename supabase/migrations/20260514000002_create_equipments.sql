create table equipments (
  id           uuid primary key default gen_random_uuid(),
  type         text not null check (type in ('bicycle','skates','skateboard')),
  status       text not null default 'available'
                 check (status in ('available','in_use')),
  assigned_to  uuid references profiles(id),
  assigned_at  timestamptz,
  returned_at  timestamptz
);

alter table equipments enable row level security;

create policy "Equipment status public"
  on equipments for select using (true);

create policy "Equipment update: admin only"
  on equipments for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
