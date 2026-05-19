create table event_config (
  id          uuid primary key default gen_random_uuid(),
  event_name  text not null,
  start_date  date not null,
  end_date    date not null,
  target_km   integer not null default 5000,
  active_day  integer not null default 1 check (active_day in (1,2,3))
);

insert into event_config
  (event_name, start_date, end_date, target_km, active_day)
values
  ('Kampüs Ekstrem Sporlar Etkinliği', '2026-05-14', '2026-05-16', 5000, 1);

alter table event_config enable row level security;

create policy "Config public read"
  on event_config for select using (true);

create policy "Config update: admin only"
  on event_config for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );
