export type DayTheme =
  | "dawn"
  | "morning"
  | "noon"
  | "afternoon"
  | "evening"
  | "night"
  | "midnight";

export function getDayTheme(hour: number): DayTheme {
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 11) return "morning";
  if (hour >= 11 && hour < 15) return "noon";
  if (hour >= 15 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 20) return "evening";
  if (hour >= 20 && hour < 23) return "night";
  return "midnight";
}
