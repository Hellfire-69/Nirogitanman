import { GoogleGenAI } from "@google/genai";
import type { WellnessFact } from "@/lib/wellness-facts";

interface GenerateWellnessReplyArgs {
  message: string;
  facts: WellnessFact[];
}

export async function generateWellnessReplyGemini({
  message,
  facts,
}: GenerateWellnessReplyArgs): Promise<string> {
  const factsBlock = facts.length
    ? facts
        .map(
          (fact, index) =>
            `[Fact ${index + 1}] (${fact.topic} — source: ${fact.source})\n${fact.vetted_content}`
        )
        .join("\n\n")
    : "No matching vetted facts were found for this question — keep your answer to general, evergreen wellness guidance only.";

  const systemInstruction = `You are the NirogiTanman AI Ayurvedic Assistant, a scoped wellness chat assistant.

Hard rules, no exceptions:
- Ground your answer in the FACTS below wherever they are relevant. Do not invent facts beyond them.
- Give general lifestyle and wellness guidance only.
- Never give a dosage, medication name, drug/herb interaction, or diagnostic claim of any kind.
- If the user's message asks anything medical — a symptom framed as a diagnosis request, a specific disease, a medication, or a dosage — refuse to answer it and tell them to use Doctor Consult instead.
- Keep answers short and conversational, a few sentences.
- Always remember this is general wellness guidance, not medical advice.

FACTS:
${factsBlock}`;

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    config: {
      systemInstruction,
      temperature: 0.4,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty chat response.");
  }

  return text;
}
