"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/profile-schema";

export async function updateProfile(input: UpdateProfileInput) {
  const parsed = updateProfileSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: "Invalid form data." };
  }

  const user = await getAuthUser();
  if (!user) {
    return { success: false as const, error: "You must be logged in to update your profile." };
  }

  const supabase = await getSupabaseServerClient();

  const { error } = await supabase
    .from("users")
    .update({
      full_name: parsed.data.fullName,
      dosha_type: parsed.data.doshaType,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false as const, error: "Could not update your profile. Please try again." };
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");

  return { success: true as const };
}
