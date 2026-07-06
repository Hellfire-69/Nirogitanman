import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_USER_ID } from "@/lib/constants";

export interface DashboardUser {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  dosha_type: string | null;
}

export interface UpcomingBooking {
  id: string;
  status: string;
  startsAt: string;
  doctorName: string;
  specialty: string;
  photoUrl: string | null;
}

export interface DietPlanMeals {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

export interface DietPlanDay {
  day: string;
  meals: DietPlanMeals;
}

export interface GeneratedPlan {
  summary: string;
  days: DietPlanDay[];
  notes: string[];
}

export interface IntakeData {
  goal: string;
  dietary_restrictions: string[];
  dosha_preference: string;
}

export interface ActiveDietPlan {
  id: string;
  created_at: string;
  intake_data: IntakeData;
  generated_plan: GeneratedPlan;
}

export async function getDashboardUser(): Promise<DashboardUser | null> {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("users")
    .select("id, full_name, email, avatar_url, dosha_type")
    .eq("id", DEMO_USER_ID)
    .maybeSingle();

  return data;
}

export async function getUpcomingBookings(): Promise<UpcomingBooking[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `id, status, slots ( starts_at, doctors ( full_name, specialty, photo_url ) )`
    )
    .eq("user_id", DEMO_USER_ID);

  if (error || !data) return [];

  const now = Date.now();

  return data
    .map((booking) => {
      const slot = Array.isArray(booking.slots) ? booking.slots[0] : booking.slots;
      const doctor = slot
        ? Array.isArray(slot.doctors)
          ? slot.doctors[0]
          : slot.doctors
        : null;

      return {
        id: booking.id as string,
        status: booking.status as string,
        startsAt: slot?.starts_at as string,
        doctorName: doctor?.full_name as string,
        specialty: doctor?.specialty as string,
        photoUrl: (doctor?.photo_url ?? null) as string | null,
      };
    })
    .filter((booking) => booking.startsAt && new Date(booking.startsAt).getTime() >= now)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

export async function getActiveDietPlan(): Promise<ActiveDietPlan | null> {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("diet_plans")
    .select("id, created_at, intake_data, generated_plan")
    .eq("user_id", DEMO_USER_ID)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data as ActiveDietPlan | null;
}
