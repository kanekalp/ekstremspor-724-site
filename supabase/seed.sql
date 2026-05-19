-- =============================================================
-- Local development seed data - comprehensive test scenarios.
-- Applied ONLY by `npx supabase db reset`.
-- NOT applied in production or Docker deployments.
--
-- Includes:
-- - 1 admin + 12 users (top 10 leaderboard + variations)
-- - Varied equipment: some types full, some empty, some damaged
-- - Activities: approved, pending, rejected, on_site, remote
-- - Edge cases: banned users, fulfilled requests, pending requests
-- =============================================================

-- ─── Auth users (password: test1234) ────────────────────────
insert into auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_user_meta_data, raw_app_meta_data,
  aud, role, is_super_admin
)
values
  -- Admin
  ('10000000-0000-0000-0000-000000000001',
   '00000000-0000-0000-0000-000000000000', 'admin@kampus.edu.tr',
   crypt('test1234', gen_salt('bf')), now(), now(), now(),
   '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  -- Active users (leaderboard)
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000',
   'ayse@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000',
   'mehmet@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000',
   'zeynep@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000',
   'can@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000',
   'elif@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000',
   'fatih@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000000',
   'gul@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000000',
   'hacer@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-00000000000a', '00000000-0000-0000-0000-000000000000',
   'ilayda@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-00000000000b', '00000000-0000-0000-0000-000000000000',
   'jale@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-00000000000c', '00000000-0000-0000-0000-000000000000',
   'kaan@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false),

  ('10000000-0000-0000-0000-00000000000d', '00000000-0000-0000-0000-000000000000',
   'levent@std.yildiz.edu.tr', crypt('test1234', gen_salt('bf')),
   now(), now(), now(), '{}', '{"provider":"email","providers":["email"]}',
   'authenticated', 'authenticated', false)

on conflict (id) do nothing;

-- ─── Auth identities ────────────────────────────────────────
insert into auth.identities (
  id, user_id, provider_id, provider,
  identity_data, created_at, updated_at, last_sign_in_at
)
values
  ('10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001',
   'admin@kampus.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000001","email":"admin@kampus.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002',
   'ayse@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000002","email":"ayse@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003',
   'mehmet@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000003","email":"mehmet@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004',
   'zeynep@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000004","email":"zeynep@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005',
   'can@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000005","email":"can@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000006',
   'elif@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000006","email":"elif@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000007',
   'fatih@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000007","email":"fatih@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000008',
   'gul@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000008","email":"gul@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000009',
   'hacer@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-000000000009","email":"hacer@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-00000000000a', '10000000-0000-0000-0000-00000000000a',
   'ilayda@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-00000000000a","email":"ilayda@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-00000000000b', '10000000-0000-0000-0000-00000000000b',
   'jale@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-00000000000b","email":"jale@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-00000000000c', '10000000-0000-0000-0000-00000000000c',
   'kaan@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-00000000000c","email":"kaan@std.yildiz.edu.tr"}',
   now(), now(), now()),

  ('10000000-0000-0000-0000-00000000000d', '10000000-0000-0000-0000-00000000000d',
   'levent@std.yildiz.edu.tr', 'email',
   '{"sub":"10000000-0000-0000-0000-00000000000d","email":"levent@std.yildiz.edu.tr"}',
   now(), now(), now())

on conflict (provider, provider_id) do nothing;

-- ─── Profiles ───────────────────────────────────────────────
insert into profiles (id, full_name, email, phone, equipment_need, equipment_request_status, is_banned, role)
values
  ('10000000-0000-0000-0000-000000000001', 'Admin', 'admin@kampus.edu.tr',
   '05001111111', 'none', 'not_needed', false, 'admin'),

  -- Top performers (leaderboard)
  ('10000000-0000-0000-0000-000000000002', 'Ayşe Yılmaz', 'ayse@std.yildiz.edu.tr',
   '05321112233', 'bicycle', 'fulfilled', false, 'user'),
  ('10000000-0000-0000-0000-000000000003', 'Mehmet Kaya', 'mehmet@std.yildiz.edu.tr',
   '05332223344', 'skates', 'pending', false, 'user'),
  ('10000000-0000-0000-0000-000000000004', 'Zeynep Demir', 'zeynep@std.yildiz.edu.tr',
   '05353334455', 'none', 'not_needed', false, 'user'),
  ('10000000-0000-0000-0000-000000000005', 'Can Özkan', 'can@std.yildiz.edu.tr',
   '05364445566', 'skateboard', 'pending', false, 'user'),
  ('10000000-0000-0000-0000-000000000006', 'Elif Şahin', 'elif@std.yildiz.edu.tr',
   '05375556677', 'none', 'not_needed', false, 'user'),
  ('10000000-0000-0000-0000-000000000007', 'Fatih Aslan', 'fatih@std.yildiz.edu.tr',
   '05386667788', 'bicycle', 'pending', false, 'user'),
  ('10000000-0000-0000-0000-000000000008', 'Gül Damir', 'gul@std.yildiz.edu.tr',
   '05397778899', 'none', 'not_needed', false, 'user'),
  ('10000000-0000-0000-0000-000000000009', 'Hacer Kaya', 'hacer@std.yildiz.edu.tr',
   '05408889900', 'skateboard', 'rejected', false, 'user'),
  ('10000000-0000-0000-0000-00000000000a', 'İlayda Çoban', 'ilayda@std.yildiz.edu.tr',
   '05419990011', 'none', 'not_needed', false, 'user'),
  ('10000000-0000-0000-0000-00000000000b', 'Jale Demirci', 'jale@std.yildiz.edu.tr',
   '05420001122', 'skates', 'fulfilled', false, 'user'),

  -- Banned user (test ban UI)
  ('10000000-0000-0000-0000-00000000000c', 'Kaan Güner', 'kaan@std.yildiz.edu.tr',
   '05431112233', 'bicycle', 'pending', true, 'user'),

  -- Low KM user
  ('10000000-0000-0000-0000-00000000000d', 'Levent Yalçın', 'levent@std.yildiz.edu.tr',
   '05442223344', 'none', 'not_needed', false, 'user')

on conflict (id) do nothing;

-- ─── Equipments (varied stock: some full, some empty) ────────
insert into equipments (type, status, code, assigned_to, assigned_at)
values
  -- Bicycles: 6 total (2 in use, 2 available, 1 damaged, 1 reserved)
  ('bicycle', 'in_use',    'BSK-001', '10000000-0000-0000-0000-000000000002', now() - interval '45 minutes'),
  ('bicycle', 'in_use',    'BSK-002', '10000000-0000-0000-0000-000000000007', now() - interval '20 minutes'),
  ('bicycle', 'available', 'BSK-003', null, null),
  ('bicycle', 'available', 'BSK-004', null, null),
  ('bicycle', 'damaged',   'BSK-005', null, null),
  ('bicycle', 'available', 'BSK-006', null, null),

  -- Skates: 5 total (1 in use, 2 available, 1 damaged, 1 available)
  ('skates', 'in_use',    'PTN-001', '10000000-0000-0000-0000-00000000000b', now() - interval '30 minutes'),
  ('skates', 'available', 'PTN-002', null, null),
  ('skates', 'available', 'PTN-003', null, null),
  ('skates', 'damaged',   'PTN-004', null, null),
  ('skates', 'available', 'PTN-005', null, null),

  -- Skateboards: 8 total (many available for high demand)
  ('skateboard', 'available', 'KYK-001', null, null),
  ('skateboard', 'available', 'KYK-002', null, null),
  ('skateboard', 'available', 'KYK-003', null, null),
  ('skateboard', 'available', 'KYK-004', null, null),
  ('skateboard', 'available', 'KYK-005', null, null),
  ('skateboard', 'available', 'KYK-006', null, null),
  ('skateboard', 'damaged',   'KYK-007', null, null),
  ('skateboard', 'available', 'KYK-008', null, null);

-- ─── Activities (diverse scenarios) ──────────────────────────
insert into activities (user_id, distance, vehicle_type, source, status, created_at)
values
  -- Approved (counted in leaderboard)
  ('10000000-0000-0000-0000-000000000002', 42.3, 'bicycle',    'remote',   'approved', now() - interval '24 hours'),
  ('10000000-0000-0000-0000-000000000002', 28.5, 'bicycle',    'on_site',  'approved', now() - interval '8 hours'),
  ('10000000-0000-0000-0000-000000000002', 15.0, 'bicycle',    'remote',   'approved', now() - interval '2 hours'),

  ('10000000-0000-0000-0000-000000000003', 35.2, 'skates',     'remote',   'approved', now() - interval '18 hours'),
  ('10000000-0000-0000-0000-000000000003', 12.0, 'skates',     'on_site',  'approved', now() - interval '6 hours'),

  ('10000000-0000-0000-0000-000000000004', 55.0, 'running',    'remote',   'approved', now() - interval '36 hours'),
  ('10000000-0000-0000-0000-000000000004', 22.0, 'running',    'remote',   'approved', now() - interval '12 hours'),

  ('10000000-0000-0000-0000-000000000005', 38.5, 'skateboard', 'remote',   'approved', now() - interval '30 hours'),
  ('10000000-0000-0000-0000-000000000005', 18.0, 'skateboard', 'on_site',  'approved', now() - interval '4 hours'),

  ('10000000-0000-0000-0000-000000000006', 48.0, 'running',    'remote',   'approved', now() - interval '48 hours'),
  ('10000000-0000-0000-0000-000000000006', 19.5, 'running',    'remote',   'approved', now() - interval '14 hours'),

  ('10000000-0000-0000-0000-000000000008', 32.0, 'running',    'remote',   'approved', now() - interval '60 hours'),
  ('10000000-0000-0000-0000-000000000008', 16.0, 'running',    'remote',   'approved', now() - interval '20 hours'),

  ('10000000-0000-0000-0000-00000000000a', 28.0, 'skates',     'remote',   'approved', now() - interval '42 hours'),
  ('10000000-0000-0000-0000-00000000000a', 12.0, 'skates',     'on_site',  'approved', now() - interval '10 hours'),

  ('10000000-0000-0000-0000-00000000000d', 5.5,  'running',    'remote',   'approved', now() - interval '72 hours'),

  -- Pending on-site (waiting for equipment)
  ('10000000-0000-0000-0000-000000000003', 0.0, 'skates',     'on_site',  'pending',  now() - interval '8 minutes'),
  ('10000000-0000-0000-0000-000000000005', 0.0, 'skateboard', 'on_site',  'pending',  now() - interval '3 minutes'),
  ('10000000-0000-0000-0000-000000000007', 0.0, 'bicycle',    'on_site',  'pending',  now() - interval '5 minutes'),

  -- Pending remote (waiting for approval)
  ('10000000-0000-0000-0000-000000000006', 21.0, 'running',   'remote',   'pending',  now() - interval '15 minutes'),
  ('10000000-0000-0000-0000-000000000009', 25.0, 'skateboard', 'remote',  'pending',  now() - interval '25 minutes'),
  ('10000000-0000-0000-0000-00000000000c', 10.0, 'bicycle',   'remote',   'pending',  now() - interval '45 minutes'),

  -- Rejected (test rejected UI in activities list)
  ('10000000-0000-0000-0000-000000000004', 0.0,  'bicycle',   'remote',   'rejected', now() - interval '6 hours'),
  ('10000000-0000-0000-0000-000000000009', 0.0,  'skateboard', 'on_site', 'rejected', now() - interval '4 hours');

-- ─── Event config ───────────────────────────────────────────
update event_config
   set event_name  = 'Kampüs Ekstrem Sporlar Etkinliği',
       start_date  = current_date,
       end_date    = current_date + interval '2 days',
       target_km   = 5000,
       active_day  = 1,
       forest_name = null;
