import { getSupabaseServerClient } from "@/lib/supabase/server";

export interface Expert {
  id: string;
  full_name: string;
  specialty: string;
  bio: string | null;
  photo_url: string | null;
}

export async function getExperts(): Promise<Expert[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("experts")
    .select("id, full_name, specialty, bio, photo_url")
    .order("full_name");

  if (error || !data) return [];

  return data;
}
