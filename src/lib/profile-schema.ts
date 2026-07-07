import { z } from "zod";
import { DOSHA_PREFERENCES } from "@/lib/diet-plan-schema";

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100),
  doshaType: z.enum(DOSHA_PREFERENCES).nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
