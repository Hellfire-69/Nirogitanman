"use server";

import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_USER_ID } from "@/lib/constants";

const UUID_SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const requestSessionSchema = z.object({
  expertId: z.string().regex(UUID_SHAPE, "Invalid expert"),
  preferredTime: z.string().trim().min(1, "Preferred time is required"),
  message: z.string().trim().max(1000).optional(),
});

export type RequestSessionInput = z.infer<typeof requestSessionSchema>;

export async function requestExpertSession(input: RequestSessionInput) {
  const parsed = requestSessionSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: "Invalid form data." };
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("expert_session_requests").insert({
    user_id: DEMO_USER_ID,
    expert_id: parsed.data.expertId,
    preferred_time: parsed.data.preferredTime,
    message: parsed.data.message || null,
  });

  if (error) {
    return { success: false as const, error: "Could not submit your request. Please try again." };
  }

  return { success: true as const };
}
