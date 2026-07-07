import Groq from "groq-sdk";
import type { GeneratedPlan } from "@/lib/dashboard-data";
import type { WellnessFact } from "@/lib/wellness-facts";

const DIET_PLAN_RESPONSE_FORMAT = {
  type: "json_schema" as const,
  json_schema: {
    name: "diet_plan",
    strict: true,
    schema: {
      type: "object",
      properties: {
        summary: { type: "string" },
        days: {
          type: "array",
          minItems: 1,
          maxItems: 1,
          items: {
            type: "object",
            properties: {
              day: { type: "string" },
              meals: {
                type: "object",
                properties: {
                  breakfast: { type: "string" },
                  lunch: { type: "string" },
                  dinner: { type: "string" },
                  snacks: { type: "string" },
                },
                required: ["breakfast", "lunch", "dinner", "snacks"],
                additionalProperties: false,
              },
            },
            required: ["day", "meals"],
            additionalProperties: false,
          },
        },
        notes: { type: "array", items: { type: "string" } },
      },
      required: ["summary", "days", "notes"],
      additionalProperties: false,
    },
  },
};

interface GenerateDietPlanArgs {
  goal: string;
  doshaPreference: string;
  dietaryRestrictions: string[];
  facts: WellnessFact[];
}

export async function generateDietPlanFromFacts(
  args: GenerateDietPlanArgs
): Promise<GeneratedPlan> {
  const factsBlock = args.facts
    .map(
      (fact, index) =>
        `[Fact ${index + 1}] (${fact.topic} — source: ${fact.source})\n${fact.vetted_content}`
    )
    .join("\n\n");

  const systemPrompt = `You are a template-filling assistant for a wellness app's diet plan feature.

Hard rules, no exceptions:
- Only use information contained in the numbered FACTS below. Do not invent, assume, or draw on any dietary or medical knowledge beyond these facts.
- Never suggest dosages, supplement amounts, or drug/herb interactions of any kind.
- Never make a diagnostic or medical claim (no "this treats", "this cures", "this diagnoses", no naming or implying a disease/condition).
- This is general wellness guidance only, not medical advice.
- Paraphrase the facts into a single sample day of meals (breakfast, lunch, dinner, snacks) plus a short list of general lifestyle notes.
- If the facts don't cover something relevant, omit it rather than filling the gap from your own knowledge.

FACTS:
${factsBlock}`;

  const userPrompt = `Fill the JSON template for a one-day sample diet plan for someone with:
- Goal: ${args.goal}
- Dosha preference: ${args.doshaPreference}
- Dietary restrictions: ${args.dietaryRestrictions.length ? args.dietaryRestrictions.join(", ") : "None"}

Use only the facts provided in the system prompt.`;

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: DIET_PLAN_RESPONSE_FORMAT,
    temperature: 0.4,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Groq returned an empty diet plan response.");
  }

  return JSON.parse(content) as GeneratedPlan;
}

export async function generateChatReplyGroq(message: string): Promise<string> {
  const systemPrompt = `You are the NirogiTanman AI Ayurvedic Assistant, replying to a short greeting or small-talk message.

Hard rules, no exceptions:
- Keep your reply short, warm, and conversational (1-2 sentences).
- Never give a dosage, medication name, drug/herb interaction, or diagnostic claim of any kind.
- If the message turns out to contain anything medical, refuse to answer it and tell the user to use Doctor Consult instead.
- This is general wellness guidance only, not medical advice.`;

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    temperature: 0.4,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Groq returned an empty chat response.");
  }

  return content;
}
