"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth";

const UUID_SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const bookSlotSchema = z.object({
  slotId: z.string().regex(UUID_SHAPE, "Invalid slot"),
});

export type BookSlotInput = z.infer<typeof bookSlotSchema>;

export async function bookSlot(input: BookSlotInput) {
  const parsed = bookSlotSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: "Invalid request." };
  }

  const user = await getAuthUser();
  if (!user) {
    return { success: false as const, error: "You must be logged in to book a slot." };
  }

  const supabase = await getSupabaseServerClient();

  // Atomic claim: this UPDATE only affects a row if is_booked is still false,
  // so under concurrent requests for the same slot exactly one succeeds — the
  // WHERE clause is evaluated against a row-locked read inside Postgres, not
  // a separate client-side check-then-write.
  const { data: claimed, error: claimError } = await supabase
    .from("slots")
    .update({ is_booked: true })
    .eq("id", parsed.data.slotId)
    .eq("is_booked", false)
    .select("id");

  if (claimError) {
    return { success: false as const, error: "Could not book this slot. Please try again." };
  }

  if (!claimed || claimed.length === 0) {
    return {
      success: false as const,
      error: "This slot was just booked by someone else. Please choose another.",
    };
  }

  const { error: insertError } = await supabase.from("bookings").insert({
    user_id: user.id,
    slot_id: parsed.data.slotId,
    status: "confirmed",
  });

  if (insertError) {
    await supabase.from("slots").update({ is_booked: false }).eq("id", parsed.data.slotId);
    return { success: false as const, error: "Could not confirm your booking. Please try again." };
  }

  revalidatePath("/consult/doctor");
  return { success: true as const };
}
