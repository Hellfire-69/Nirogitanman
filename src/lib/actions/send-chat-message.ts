"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/auth";
import { getWellnessFactsByTags } from "@/lib/wellness-facts";
import { buildChatFactTags } from "@/lib/chat-facts";
import { isMedicalMessage, MEDICAL_REDIRECT_MESSAGE } from "@/lib/chat-safety";
import { isSmallTalk } from "@/lib/chat-router";
import { generateChatReplyGroq } from "@/lib/groq";
import { generateWellnessReplyGemini } from "@/lib/gemini";

export async function sendChatMessage(message: string) {
  const trimmed = message.trim();

  if (!trimmed) {
    return { success: false as const, error: "Message can't be empty." };
  }

  const user = await getAuthUser();
  if (!user) {
    return { success: false as const, error: "You must be logged in to chat." };
  }

  const supabase = await getSupabaseServerClient();

  if (isMedicalMessage(trimmed)) {
    await supabase.from("chat_logs").insert({
      user_id: user.id,
      message: trimmed,
      response: MEDICAL_REDIRECT_MESSAGE,
    });

    return { success: true as const, response: MEDICAL_REDIRECT_MESSAGE };
  }

  let response: string;
  try {
    if (isSmallTalk(trimmed)) {
      response = await generateChatReplyGroq(trimmed);
    } else {
      const tags = buildChatFactTags(trimmed);
      const facts = tags.length ? await getWellnessFactsByTags(tags) : [];
      response = await generateWellnessReplyGemini({ message: trimmed, facts });
    }
  } catch {
    return {
      success: false as const,
      error: "Could not get a response right now. Please try again.",
    };
  }

  const { error: insertError } = await supabase.from("chat_logs").insert({
    user_id: user.id,
    message: trimmed,
    response,
  });

  if (insertError) {
    return { success: false as const, error: "Could not save your message. Please try again." };
  }

  return { success: true as const, response };
}
