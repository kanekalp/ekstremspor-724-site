const NOW = Date.now();
const H = 3_600_000;
const D = 24 * H;

function ts(msAgo: number) {
  return new Date(NOW - msAgo).toISOString();
}

export const MOCK_ADMIN_USER = {
  id: "admin1",
  email: "admin@kampus.edu.tr",
  aud: "authenticated",
  role: "authenticated",
  created_at: ts(10 * D),
};

export const MOCK_PROFILES = [
  { id: "admin1", full_name: "Admin Kullanıcı", email: "admin@kampus.edu.tr", phone: "05001234567", equipment_need: "none", role: "admin", created_at: ts(10 * D) },
  { id: "u1", full_name: "Ahmet Yılmaz", email: "ahmet@kampus.edu.tr", phone: "05001111111", equipment_need: "bicycle", role: "user", created_at: ts(3 * D) },
  { id: "u2", full_name: "Zeynep Kaya", email: "zeynep@kampus.edu.tr", phone: "05002222222", equipment_need: "skates", role: "user", created_at: ts(3 * D) },
  { id: "u3", full_name: "Mehmet Demir", email: "mehmet@kampus.edu.tr", phone: "05003333333", equipment_need: "none", role: "user", created_at: ts(3 * D) },
  { id: "u4", full_name: "Ayşe Çelik", email: "ayse@kampus.edu.tr", phone: "05004444444", equipment_need: "skateboard", role: "user", created_at: ts(3 * D) },
  { id: "u5", full_name: "Can Arslan", email: "can@kampus.edu.tr", phone: "05005555555", equipment_need: "bicycle", role: "user", created_at: ts(3 * D) },
  { id: "u6", full_name: "Elif Şahin", email: "elif@kampus.edu.tr", phone: "05006666666", equipment_need: "skates", role: "user", created_at: ts(3 * D) },
  { id: "u7", full_name: "Burak Öztürk", email: "burak@kampus.edu.tr", phone: "05007777777", equipment_need: "none", role: "user", created_at: ts(3 * D) },
  { id: "u8", full_name: "Selin Aydın", email: "selin@kampus.edu.tr", phone: "05008888888", equipment_need: "skateboard", role: "user", created_at: ts(3 * D) },
  { id: "u9", full_name: "Emre Koç", email: "emre@kampus.edu.tr", phone: "05009999999", equipment_need: "bicycle", role: "user", created_at: ts(3 * D) },
  { id: "u10", full_name: "Nisa Yıldız", email: "nisa@kampus.edu.tr", phone: "05001230001", equipment_need: "skates", role: "user", created_at: ts(3 * D) },
  { id: "u11", full_name: "Tarık Çakır", email: "tarik@kampus.edu.tr", phone: "05001230002", equipment_need: "bicycle", role: "user", created_at: ts(3 * D) },
  { id: "u12", full_name: "Buse Erdoğan", email: "buse@kampus.edu.tr", phone: "05001230003", equipment_need: "skateboard", role: "user", created_at: ts(3 * D) },
];

// Equipment: 5 bicycle, 4 skates, 3 skateboard
export const MOCK_EQUIPMENTS = [
  { id: "b1000000-0000-0000-0000-000000000001", type: "bicycle", status: "available", assigned_to: null, assigned_at: null, returned_at: null, profiles: null },
  { id: "b1000000-0000-0000-0000-000000000002", type: "bicycle", status: "available", assigned_to: null, assigned_at: null, returned_at: null, profiles: null },
  { id: "b1000000-0000-0000-0000-000000000003", type: "bicycle", status: "in_use", assigned_to: "u1", assigned_at: ts(3 * H), returned_at: null, profiles: { full_name: "Ahmet Yılmaz" } },
  { id: "b1000000-0000-0000-0000-000000000004", type: "bicycle", status: "in_use", assigned_to: "u5", assigned_at: ts(2 * H), returned_at: null, profiles: { full_name: "Can Arslan" } },
  { id: "b1000000-0000-0000-0000-000000000005", type: "bicycle", status: "available", assigned_to: null, assigned_at: null, returned_at: null, profiles: null },
  { id: "a1000000-0000-0000-0000-000000000001", type: "skates", status: "available", assigned_to: null, assigned_at: null, returned_at: null, profiles: null },
  { id: "a1000000-0000-0000-0000-000000000002", type: "skates", status: "in_use", assigned_to: "u2", assigned_at: ts(4 * H), returned_at: null, profiles: { full_name: "Zeynep Kaya" } },
  { id: "a1000000-0000-0000-0000-000000000003", type: "skates", status: "available", assigned_to: null, assigned_at: null, returned_at: null, profiles: null },
  { id: "a1000000-0000-0000-0000-000000000004", type: "skates", status: "in_use", assigned_to: "u6", assigned_at: ts(H), returned_at: null, profiles: { full_name: "Elif Şahin" } },
  { id: "c1000000-0000-0000-0000-000000000001", type: "skateboard", status: "available", assigned_to: null, assigned_at: null, returned_at: null, profiles: null },
  { id: "c1000000-0000-0000-0000-000000000002", type: "skateboard", status: "in_use", assigned_to: "u4", assigned_at: ts(5 * H), returned_at: null, profiles: { full_name: "Ayşe Çelik" } },
  { id: "c1000000-0000-0000-0000-000000000003", type: "skateboard", status: "available", assigned_to: null, assigned_at: null, returned_at: null, profiles: null },
];

// Activities — approved entries with embedded profiles
const P = (id: string, name: string, email: string) => ({ full_name: name, email });

export const MOCK_ACTIVITIES = [
  // ── Day 1 (2 days ago) ─────────────────────────────────────────
  { id: "a01", user_id: "u3", distance: 55, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 7 * H), profiles: P("u3", "Mehmet Demir", "mehmet@kampus.edu.tr") },
  { id: "a02", user_id: "u3", distance: 47, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 3 * H), profiles: P("u3", "Mehmet Demir", "mehmet@kampus.edu.tr") },
  { id: "a03", user_id: "u1", distance: 42, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 6 * H), profiles: P("u1", "Ahmet Yılmaz", "ahmet@kampus.edu.tr") },
  { id: "a04", user_id: "u1", distance: 38, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 2 * H), profiles: P("u1", "Ahmet Yılmaz", "ahmet@kampus.edu.tr") },
  { id: "a05", user_id: "u5", distance: 44, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 5 * H), profiles: P("u5", "Can Arslan", "can@kampus.edu.tr") },
  { id: "a06", user_id: "u5", distance: 35, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 1.5 * H), profiles: P("u5", "Can Arslan", "can@kampus.edu.tr") },
  { id: "a07", user_id: "u9", distance: 38, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 6.5 * H), profiles: P("u9", "Emre Koç", "emre@kampus.edu.tr") },
  { id: "a08", user_id: "u9", distance: 29, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 2.5 * H), profiles: P("u9", "Emre Koç", "emre@kampus.edu.tr") },
  { id: "a09", user_id: "u11", distance: 52, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 4 * H), profiles: P("u11", "Tarık Çakır", "tarik@kampus.edu.tr") },
  { id: "a10", user_id: "u7", distance: 41, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 3.5 * H), profiles: P("u7", "Burak Öztürk", "burak@kampus.edu.tr") },
  { id: "a11", user_id: "u2", distance: 28, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 5.5 * H), profiles: P("u2", "Zeynep Kaya", "zeynep@kampus.edu.tr") },
  { id: "a12", user_id: "u2", distance: 24, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 1 * H), profiles: P("u2", "Zeynep Kaya", "zeynep@kampus.edu.tr") },
  { id: "a13", user_id: "u6", distance: 32, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 4.5 * H), profiles: P("u6", "Elif Şahin", "elif@kampus.edu.tr") },
  { id: "a14", user_id: "u8", distance: 19, vehicle_type: "skateboard", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 3 * H), profiles: P("u8", "Selin Aydın", "selin@kampus.edu.tr") },
  { id: "a15", user_id: "u4", distance: 16, vehicle_type: "skateboard", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2 * D + 2 * H), profiles: P("u4", "Ayşe Çelik", "ayse@kampus.edu.tr") },

  // ── Day 2 (yesterday) ──────────────────────────────────────────
  { id: "a16", user_id: "u3", distance: 71, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 7 * H), profiles: P("u3", "Mehmet Demir", "mehmet@kampus.edu.tr") },
  { id: "a17", user_id: "u3", distance: 53, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 2.5 * H), profiles: P("u3", "Mehmet Demir", "mehmet@kampus.edu.tr") },
  { id: "a18", user_id: "u1", distance: 65, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 6 * H), profiles: P("u1", "Ahmet Yılmaz", "ahmet@kampus.edu.tr") },
  { id: "a19", user_id: "u1", distance: 48, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 2 * H), profiles: P("u1", "Ahmet Yılmaz", "ahmet@kampus.edu.tr") },
  { id: "a20", user_id: "u5", distance: 57, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 5.5 * H), profiles: P("u5", "Can Arslan", "can@kampus.edu.tr") },
  { id: "a21", user_id: "u5", distance: 49, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 1.5 * H), profiles: P("u5", "Can Arslan", "can@kampus.edu.tr") },
  { id: "a22", user_id: "u9", distance: 52, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 5 * H), profiles: P("u9", "Emre Koç", "emre@kampus.edu.tr") },
  { id: "a23", user_id: "u9", distance: 46, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 2 * H), profiles: P("u9", "Emre Koç", "emre@kampus.edu.tr") },
  { id: "a24", user_id: "u11", distance: 63, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 4 * H), profiles: P("u11", "Tarık Çakır", "tarik@kampus.edu.tr") },
  { id: "a25", user_id: "u7", distance: 44, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 3.5 * H), profiles: P("u7", "Burak Öztürk", "burak@kampus.edu.tr") },
  { id: "a26", user_id: "u2", distance: 43, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 6.5 * H), profiles: P("u2", "Zeynep Kaya", "zeynep@kampus.edu.tr") },
  { id: "a27", user_id: "u2", distance: 31, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 1 * H), profiles: P("u2", "Zeynep Kaya", "zeynep@kampus.edu.tr") },
  { id: "a28", user_id: "u6", distance: 38, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 5 * H), profiles: P("u6", "Elif Şahin", "elif@kampus.edu.tr") },
  { id: "a29", user_id: "u6", distance: 29, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 1.5 * H), profiles: P("u6", "Elif Şahin", "elif@kampus.edu.tr") },
  { id: "a30", user_id: "u10", distance: 27, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 3 * H), profiles: P("u10", "Nisa Yıldız", "nisa@kampus.edu.tr") },
  { id: "a31", user_id: "u8", distance: 24, vehicle_type: "skateboard", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 4.5 * H), profiles: P("u8", "Selin Aydın", "selin@kampus.edu.tr") },
  { id: "a32", user_id: "u8", distance: 19, vehicle_type: "skateboard", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 2 * H), profiles: P("u8", "Selin Aydın", "selin@kampus.edu.tr") },
  { id: "a33", user_id: "u4", distance: 22, vehicle_type: "skateboard", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 3 * H), profiles: P("u4", "Ayşe Çelik", "ayse@kampus.edu.tr") },
  { id: "a34", user_id: "u12", distance: 32, vehicle_type: "skateboard", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(D + 2.5 * H), profiles: P("u12", "Buse Erdoğan", "buse@kampus.edu.tr") },

  // ── Today — non–last-hour ──────────────────────────────────────
  { id: "a35", user_id: "u3", distance: 44, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(4 * H), profiles: P("u3", "Mehmet Demir", "mehmet@kampus.edu.tr") },
  { id: "a36", user_id: "u1", distance: 38, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(3 * H), profiles: P("u1", "Ahmet Yılmaz", "ahmet@kampus.edu.tr") },
  { id: "a37", user_id: "u11", distance: 41, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(3.5 * H), profiles: P("u11", "Tarık Çakır", "tarik@kampus.edu.tr") },
  { id: "a38", user_id: "u9", distance: 33, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(2.5 * H), profiles: P("u9", "Emre Koç", "emre@kampus.edu.tr") },
  { id: "a39", user_id: "u5", distance: 29, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(5 * H), profiles: P("u5", "Can Arslan", "can@kampus.edu.tr") },
  { id: "a40", user_id: "u2", distance: 18, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(4 * H), profiles: P("u2", "Zeynep Kaya", "zeynep@kampus.edu.tr") },

  // ── Last hour ─────────────────────────────────────────────────
  { id: "a41", user_id: "u1", distance: 22, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(25 * 60000), profiles: P("u1", "Ahmet Yılmaz", "ahmet@kampus.edu.tr") },
  { id: "a42", user_id: "u3", distance: 18, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(35 * 60000), profiles: P("u3", "Mehmet Demir", "mehmet@kampus.edu.tr") },
  { id: "a43", user_id: "u7", distance: 15, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "approved", created_at: ts(50 * 60000), profiles: P("u7", "Burak Öztürk", "burak@kampus.edu.tr") },

  // ── Pending on_site (riding, equipment assigned) ──────────────
  { id: "p1", user_id: "u1", distance: 0, vehicle_type: "bicycle", source: "on_site", evidence_url: null, date_range: null, status: "pending", created_at: ts(3 * H), profiles: P("u1", "Ahmet Yılmaz", "ahmet@kampus.edu.tr") },
  { id: "p2", user_id: "u2", distance: 0, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "pending", created_at: ts(4 * H), profiles: P("u2", "Zeynep Kaya", "zeynep@kampus.edu.tr") },

  // ── Pending on_site (waiting, no equipment yet) ───────────────
  { id: "p3", user_id: "u10", distance: 0, vehicle_type: "skates", source: "on_site", evidence_url: null, date_range: null, status: "pending", created_at: ts(20 * 60000), profiles: P("u10", "Nisa Yıldız", "nisa@kampus.edu.tr") },
  { id: "p4", user_id: "u12", distance: 0, vehicle_type: "skateboard", source: "on_site", evidence_url: null, date_range: null, status: "pending", created_at: ts(10 * 60000), profiles: P("u12", "Buse Erdoğan", "buse@kampus.edu.tr") },

  // ── Pending remote (awaiting approval) ───────────────────────
  { id: "p5", user_id: "u7", distance: 15, vehicle_type: "bicycle", source: "remote", evidence_url: null, date_range: "15 May 2026", status: "pending", created_at: ts(45 * 60000), profiles: P("u7", "Burak Öztürk", "burak@kampus.edu.tr") },
];

export const MOCK_EVENT_CONFIG = {
  id: "cfg1",
  event_name: "Kampüs Ekstrem Sporlar Etkinliği",
  start_date: "2026-05-13",
  end_date: "2026-05-15",
  target_km: 5000,
  active_day: 3,
};
