import { getSupabaseServerClient } from "@/lib/supabase/server";

export interface DoctorSlot {
  id: string;
  starts_at: string;
}

export interface DoctorWithSlots {
  id: string;
  full_name: string;
  specialty: string;
  photo_url: string | null;
  slots: DoctorSlot[];
}

export async function getDoctorsWithAvailableSlots(): Promise<DoctorWithSlots[]> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("doctors")
    .select(
      `id, full_name, specialty, photo_url, slots ( id, starts_at, is_booked )`
    )
    .order("full_name");

  if (error || !data) return [];

  const now = Date.now();

  return data.map((doctor) => {
    const slots = (doctor.slots ?? [])
      .filter((slot) => !slot.is_booked && new Date(slot.starts_at).getTime() >= now)
      .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
      .map((slot) => ({ id: slot.id, starts_at: slot.starts_at }));

    return {
      id: doctor.id,
      full_name: doctor.full_name,
      specialty: doctor.specialty,
      photo_url: doctor.photo_url,
      slots,
    };
  });
}
