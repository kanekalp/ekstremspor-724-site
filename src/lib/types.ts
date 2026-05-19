export type EquipmentVehicleType = "bicycle" | "skates" | "skateboard";
export type VehicleType = EquipmentVehicleType | "running";
export type EquipmentNeed = EquipmentVehicleType | "none";
export type Role = "user" | "admin";
export type ActivitySource = "on_site" | "remote";
export type ActivityStatus = "pending" | "approved" | "rejected";
export type EquipmentStatus = "available" | "in_use" | "damaged";
export type EquipmentRequestStatus =
  | "pending"
  | "fulfilled"
  | "rejected"
  | "not_needed";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  equipment_need: EquipmentNeed;
  equipment_request_status: EquipmentRequestStatus;
  is_banned: boolean;
  role: Role;
  created_at: string;
};

export type Equipment = {
  id: string;
  type: EquipmentVehicleType;
  status: EquipmentStatus;
  code: string | null;
  assigned_to: string | null;
  assigned_at: string | null;
  returned_at: string | null;
};

export type Activity = {
  id: string;
  user_id: string;
  distance: number;
  vehicle_type: VehicleType;
  source: ActivitySource;
  evidence_url: string | null;
  date_range: string | null;
  status: ActivityStatus;
  created_at: string;
};

export type EventConfig = {
  id: string;
  event_name: string;
  start_date: string;
  end_date: string;
  target_km: number;
  active_day: 1 | 2 | 3;
};

export type LeaderboardPeriod = "all" | "today" | "last_hour";
export type LeaderboardVehicleFilter = "all" | VehicleType;

export type LeaderboardEntry = {
  user_id: string;
  full_name: string;
  total_distance: number;
  dominant_vehicle: VehicleType;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<
          Profile,
          "role" | "created_at" | "is_banned" | "equipment_request_status"
        > & {
          role?: Role;
          created_at?: string;
          is_banned?: boolean;
          equipment_request_status?: EquipmentRequestStatus;
        };
        Update: Partial<Profile>;
        Relationships: [];
      };
      equipments: {
        Row: Equipment;
        Insert: Omit<Equipment, "id"> & { id?: string };
        Update: Partial<Equipment>;
        Relationships: [];
      };
      activities: {
        Row: Activity;
        Insert: Omit<
          Activity,
          "id" | "created_at" | "evidence_url" | "date_range" | "status"
        > & {
          id?: string;
          created_at?: string;
          evidence_url?: string | null;
          date_range?: string | null;
          status?: ActivityStatus;
        };
        Update: Partial<Activity>;
        Relationships: [];
      };
      event_config: {
        Row: EventConfig;
        Insert: Omit<EventConfig, "id"> & { id?: string };
        Update: Partial<EventConfig>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
