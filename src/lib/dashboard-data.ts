import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth";

export interface DashboardStats {
  totalBookings: number;
  totalDietPlans: number;
  totalChatSessions: number;
  nextBookingAt: string | null;
}

export interface ActivityDay {
  date: string; // "Mon", "Tue", etc.
  bookings: number;
  chats: number;
}

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
  const user = await getAuthUser();
  if (!user) return null;

  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("users")
    .select("id, full_name, email, avatar_url, dosha_type")
    .eq("id", user.id)
    .maybeSingle();

  return data;
}

export async function getUpcomingBookings(): Promise<UpcomingBooking[]> {
  const user = await getAuthUser();
  if (!user) return [];

  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `id, status, slots ( starts_at, doctors ( full_name, specialty, photo_url ) )`
    )
    .eq("user_id", user.id);

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
  const user = await getAuthUser();
  if (!user) return null;

  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("diet_plans")
    .select("id, created_at, intake_data, generated_plan")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data as ActiveDietPlan | null;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const user = await getAuthUser();
  if (!user) {
    return { totalBookings: 0, totalDietPlans: 0, totalChatSessions: 0, nextBookingAt: null };
  }

  const supabase = await getSupabaseServerClient();

  const [bookingsRes, dietRes, chatRes, nextBookingRes] = await Promise.all([
    // Total bookings for user (RLS: public SELECT with user_id filter)
    supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),

    // Total active diet plans (RLS: user-scoped SELECT)
    supabase
      .from("diet_plans")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_active", true),

    // Total chat sessions (RLS: user-scoped SELECT auth.uid() = user_id)
    supabase
      .from("chat_logs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),

    // Next upcoming booking slot date
    supabase
      .from("bookings")
      .select("slots ( starts_at )")
      .eq("user_id", user.id)
      .eq("status", "confirmed"),
  ]);

  // Find next upcoming slot
  const now = new Date();
  let nextBookingAt: string | null = null;
  if (nextBookingRes.data) {
    const upcoming = nextBookingRes.data
      .flatMap((b) => {
        const slot = Array.isArray(b.slots) ? b.slots[0] : b.slots;
        return slot?.starts_at ? [slot.starts_at as string] : [];
      })
      .filter((d) => new Date(d) >= now)
      .sort();
    nextBookingAt = upcoming[0] ?? null;
  }

  return {
    totalBookings: bookingsRes.count ?? 0,
    totalDietPlans: dietRes.count ?? 0,
    totalChatSessions: chatRes.count ?? 0,
    nextBookingAt,
  };
}

export async function getActivityChartData(): Promise<ActivityDay[]> {
  const user = await getAuthUser();

  // Build 7-day window (today going back 6 days)
  const days: ActivityDay[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString("en-US", { weekday: "short" }),
      bookings: 0,
      chats: 0,
    };
  });

  if (!user) return days;

  const supabase = await getSupabaseServerClient();
  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setHours(0, 0, 0, 0);

  const [bookingsRes, chatRes] = await Promise.all([
    supabase
      .from("bookings")
      .select("slots ( starts_at )")
      .eq("user_id", user.id)
      .gte("created_at", since.toISOString()),
    supabase
      .from("chat_logs")
      .select("created_at")
      .eq("user_id", user.id)
      .gte("created_at", since.toISOString()),
  ]);

  // Map bookings to days using slot starts_at
  if (bookingsRes.data) {
    for (const b of bookingsRes.data) {
      const slot = Array.isArray(b.slots) ? b.slots[0] : b.slots;
      if (!slot?.starts_at) continue;
      const label = new Date(slot.starts_at as string).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const day = days.find((d) => d.date === label);
      if (day) day.bookings++;
    }
  }

  // Map chat logs to days
  if (chatRes.data) {
    for (const c of chatRes.data) {
      const label = new Date(c.created_at).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const day = days.find((d) => d.date === label);
      if (day) day.chats++;
    }
  }

  return days;
}
