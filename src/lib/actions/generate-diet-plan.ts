"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth";
import { generateDietPlanSchema, buildFactTags, type GenerateDietPlanInput } from "@/lib/diet-plan-schema";
import { getWellnessFactsByTags } from "@/lib/wellness-facts";
import { generateDietPlanFromFacts } from "@/lib/groq";

export async function generateDietPlan(input: GenerateDietPlanInput) {
  const parsed = generateDietPlanSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false as const, error: "Invalid form data." };
  }

  const tags = buildFactTags(parsed.data);
  const facts = await getWellnessFactsByTags(tags);

  if (facts.length === 0) {
    return {
      success: false as const,
      error:
        "We don't have enough vetted wellness facts yet for this combination of goal, dosha, and restrictions. Please try different options.",
    };
  }

  let generatedPlan;
  try {
    generatedPlan = await generateDietPlanFromFacts({
      goal: parsed.data.goal,
      doshaPreference: parsed.data.doshaPreference,
      dietaryRestrictions: parsed.data.dietaryRestrictions,
      facts,
    });
  } catch {
    return {
      success: false as const,
      error: "Could not generate your diet plan right now. Please try again.",
    };
  }

  const user = await getAuthUser();
  if (!user) {
    return { success: false as const, error: "You must be logged in to generate a diet plan." };
  }

  const supabase = await getSupabaseServerClient();

  const { data: inserted, error: insertError } = await supabase
    .from("diet_plans")
    .insert({
      user_id: user.id,
      intake_data: {
        goal: parsed.data.goal,
        dosha_preference: parsed.data.doshaPreference,
        dietary_restrictions: parsed.data.dietaryRestrictions,
      },
      generated_plan: generatedPlan,
      is_active: true,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    return { success: false as const, error: "Could not save your diet plan. Please try again." };
  }

  await supabase
    .from("diet_plans")
    .update({ is_active: false })
    .eq("user_id", user.id)
    .neq("id", inserted.id);

  revalidatePath("/dashboard");
  revalidatePath("/diet-plan");

  return { success: true as const };
}
