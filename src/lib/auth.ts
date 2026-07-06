import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function getAuthUser() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
