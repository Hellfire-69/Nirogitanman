import { z } from "zod";

export const DIET_GOALS = [
  "Immunity Booster",
  "Digestive Wellness",
  "Stress & Mental Balance",
  "Weight Management",
  "Skin & Hair Care",
] as const;

export const DOSHA_PREFERENCES = ["Vata", "Pitta", "Kapha", "Not sure"] as const;

export const DIETARY_RESTRICTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Nut-free",
] as const;

export const generateDietPlanSchema = z.object({
  goal: z.enum(DIET_GOALS),
  doshaPreference: z.enum(DOSHA_PREFERENCES),
  dietaryRestrictions: z.array(z.enum(DIETARY_RESTRICTIONS)),
});

export type GenerateDietPlanInput = z.infer<typeof generateDietPlanSchema>;

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildFactTags(input: GenerateDietPlanInput): string[] {
  const tags = [`goal:${slug(input.goal)}`];

  if (input.doshaPreference !== "Not sure") {
    tags.push(`dosha:${slug(input.doshaPreference)}`);
  }

  for (const restriction of input.dietaryRestrictions) {
    tags.push(`restriction:${slug(restriction)}`);
  }

  return tags;
}
